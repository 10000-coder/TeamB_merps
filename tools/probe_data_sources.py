#!/usr/bin/env python3
"""Probe merps.co's data surfaces.

Needs outbound egress. The local Daytona box has none (allowlist), so run this
inside the Composio sandbox or anywhere with a normal network.

    python3 tools/probe_data_sources.py [--out reference/data_sources.json]

Prints a table and, with --out, writes a machine-readable copy. Findings are
summarised in docs/DATA_SOURCES.md.
"""
import argparse
import json
import urllib.error
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (compatible; replica-recon)"}
MERPS_API = [
    "https://www.merps.co/api/markets",
    "https://www.merps.co/api/pairs",
    "https://www.merps.co/api/session",
]
FIXED = [
    "https://www.gmgn.cc/kline/robinhood/0xc6911796042b15d7Fa4F6CDe69e245DdCd3d9c31",
    "https://rpc.mainnet.chain.robinhood.com",
]


def get(url, timeout=25, data=None):
    req = urllib.request.Request(url, headers=UA, data=data)
    if data:
        req.add_header("Content-Type", "application/json")
    try:
        r = urllib.request.urlopen(req, timeout=timeout)
        return {"status": r.status, "headers": dict(r.headers), "body": r.read()}
    except urllib.error.HTTPError as e:
        return {"status": e.code, "headers": dict(e.headers), "body": e.read()}
    except Exception as e:  # noqa: BLE001 - report, don't crash
        return {"status": None, "error": f"{type(e).__name__}: {e}", "body": b""}


def show(label, res, note=""):
    hdrs = res.get("headers") or {}
    framing = {
        "x_frame_options": hdrs.get("X-Frame-Options"),
        "frame_ancestors": [
            s.strip() for s in (hdrs.get("Content-Security-Policy") or "").split(";")
            if "frame-ancestors" in s
        ],
    }
    print(f"{label:<52} status={res.get('status')} bytes={len(res.get('body') or b'')}"
          f" framing_headers={framing} {note}")
    return framing


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out")
    args = ap.parse_args()
    report = {}

    print("== merps.co own API (server routes) ==")
    markets = None
    for u in MERPS_API:
        res = get(u)
        report[u] = {"status": res["status"], "bytes": len(res["body"])}
        print(f"{u:<52} status={res['status']} bytes={len(res['body'])}")
        if res["body"]:
            print(f"    head: {res['body'][:160].decode('utf-8', 'replace')}")
        if u.endswith("/api/markets") and res["status"] == 200:
            markets = json.loads(res["body"])
            report["markets_schema"] = {k: (len(v) if isinstance(v, list) else v)
                                        for k, v in markets.items()}

    print("\n== third-party surfaces ==")
    for u in FIXED:
        res = get(u)
        note = ""
        if "gmgn" in u:
            note = "<- no XFO/frame-ancestors => framing is ALLOWED; 403 is a bot challenge"
        show(u[:52], res, note)
        report[u] = {"status": res["status"], "bytes": len(res["body"])}

    # DexScreener coverage of the market universe
    if markets and markets.get("memecoins"):
        print("\n== DexScreener coverage of merps' memecoins ==")
        covered, missing = 0, []
        for m in markets["memecoins"]:
            u = f"https://api.dexscreener.com/latest/dex/tokens/{m['address']}"
            res = get(u)
            pairs = []
            if res["status"] == 200:
                try:
                    pairs = json.loads(res["body"]).get("pairs") or []
                except Exception:  # noqa: BLE001
                    pairs = []
            if pairs:
                covered += 1
            else:
                missing.append({"symbol": m["symbol"], "address": m["address"],
                                "status": res["status"]})
        print(f"covered {covered}/{len(markets['memecoins'])}")
        if missing:
            print("missing:", json.dumps(missing, indent=1))
        report["dexscreener"] = {"covered": covered,
                                 "total": len(markets["memecoins"]),
                                 "missing": missing}

    if args.out:
        with open(args.out, "w") as fh:
            json.dump(report, fh, indent=2, sort_keys=True)
        print(f"\nwrote {args.out}")


if __name__ == "__main__":
    main()
