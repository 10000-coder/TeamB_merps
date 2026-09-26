# TeamB_merps

High-fidelity offline replica of <https://www.merps.co/> — Next.js + Tailwind v4 ported
to React/Vite, generated from the captured DOM and verified by measurement, not by
inspection.

- **Repo**: <https://github.com/10000-coder/TeamB_merps>
- **Production**: <https://teamb-merps.vercel.app>

## Docs

| Doc | What it answers |
|---|---|
| [`docs/SOP.md`](docs/SOP.md) | **The process.** Replication SOP (Part A), how to reuse it for a greenfield build from assets + `design.md` (Part B), when multi-agent collaboration pays off (Part C), checklists and anti-patterns (Part D). |
| [`docs/GATE0.md`](docs/GATE0.md) | What the reference package is, and the baseline defect the gate caught. |
| [`docs/SCOPE.md`](docs/SCOPE.md) | Per-route state policy: what is pixel-comparable, what is structure-only, what is copied from the original's own gated states. |
| [`docs/PORT.md`](docs/PORT.md) | How the port is built: generated markup, hand-written seams, deliberate differences. |
| [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) | Where each surface's data actually comes from (GMGN is a chart embed, not the data source) and what is mocked. |
| [`docs/MOTION.md`](docs/MOTION.md) | The scroll motion, its constants read out of the reference's own bundle, and the parity boundary it costs. |
| [`docs/VERIFICATION.md`](docs/VERIFICATION.md) | Every measured number, plus an explicit list of what is **not** verified. |

## Reproduce

```bash
git clone https://github.com/10000-coder/TeamB_merps
cd TeamB_merps
python3 tools/audit_assets.py                       # expect: TOTAL MISSING 0
python3 tools/build_offline.py --ref reference --out reference/site
bash tools/shoot_baselines.sh
python3 tools/gen_markets.py && python3 tools/gen_app.py
python3 tools/copy_public.py
cd app && npm install && npm run build && cd ..
python3 tools/replkit/sweep.py --config replkit.json --mode geom  --all
python3 tools/replkit/sweep.py --config replkit.json --mode pixel /:1440 /:375
python3 tools/replkit/sweep.py --config replkit.json --mode text  /:1440
python3 tools/verify_settled.py
python3 tools/verify_motion.py && python3 tools/verify_counters.py
```

The reusable, site-agnostic half of the tooling lives in `tools/replkit/`
(mirrored in `shared/replkit/` for the next project).
