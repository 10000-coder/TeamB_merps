#!/usr/bin/env python3
"""Transfer bytes across a lossy text channel without losing a character.

Written after an 8000-char slice silently wrote 7998 characters. Every slice is
md5-checked on arrival and the reassembled payload is checked against the whole
file's sha256, so a dropped character is caught immediately instead of becoming a
corrupt binary in the delivery.

  pack     PAYLOAD -> slices.txt (base64) + manifest.json (per-slice md5 + final sha256)
  manifest slices.txt -> print the manifest (and per-slice hashes)
  verify   PAYLOAD manifest.json -> reassemble from slices.txt and check everything

Usage:
  python3 xfer.py pack --in payload.tar.xz --slices slices.txt --manifest xfer.json --size 8000
  python3 xfer.py manifest --slices slices.txt --manifest xfer.json --size 8000
  python3 xfer.py verify --in payload.tar.xz --slices slices.txt --manifest xfer.json
"""
import argparse
import base64
import hashlib
import json
import os
import sys


def md5(b):
    return hashlib.md5(b).hexdigest()


def sha256(b):
    return hashlib.sha256(b).hexdigest()


def cmd_pack(a):
    raw = open(a.input, 'rb').read()
    b64 = base64.b64encode(raw).decode('ascii')
    size = a.size
    slices = [b64[i:i + size] for i in range(0, len(b64), size)] or ['']
    with open(a.slices, 'w', encoding='utf-8') as f:
        f.write('\n'.join(slices))
    man = {
        'input': os.path.basename(a.input),
        'raw_bytes': len(raw),
        'b64_chars': len(b64),
        'slice_size': size,
        'slice_count': len(slices),
        'final_sha256': sha256(raw),
        'final_md5': md5(raw),
        'slices': [{'i': i, 'chars': len(s), 'md5': md5(s.encode('utf-8'))}
                   for i, s in enumerate(slices)],
    }
    if a.manifest:
        json.dump(man, open(a.manifest, 'w', encoding='utf-8'), indent=2)
    print('packed %s: %d raw bytes -> %d b64 chars -> %d slices of <=%d chars'
          % (a.input, len(raw), len(b64), len(slices), size))
    print('final sha256: %s' % man['final_sha256'])
    print('per-slice md5s written to %s' % (a.manifest or a.slices + '.manifest.json'))
    if not a.manifest:
        json.dump(man, open(a.slices + '.manifest.json', 'w', encoding='utf-8'), indent=2)
    return 0


def cmd_manifest(a):
    slices = open(a.slices, encoding='utf-8').read().split('\n')
    man = {'slice_count': len(slices),
           'slices': [{'i': i, 'chars': len(s), 'md5': md5(s.encode('utf-8'))}
                      for i, s in enumerate(slices)]}
    if a.manifest:
        json.dump(man, open(a.manifest, 'w', encoding='utf-8'), indent=2)
    for s in man['slices']:
        print('slice %02d  chars=%d  md5=%s' % (s['i'], s['chars'], s['md5']))
    print('total b64 chars:', sum(s['chars'] for s in man['slices']))
    return 0


def cmd_verify(a):
    man = json.load(open(a.manifest, encoding='utf-8'))
    slices = open(a.slices, encoding='utf-8').read().split('\n')
    if len(slices) != man['slice_count']:
        print('FAIL slice count: got %d want %d' % (len(slices), man['slice_count']))
        return 1
    bad = []
    for i, s in enumerate(slices):
        want = man['slices'][i]
        if len(s) != want['chars']:
            bad.append('slice %d: %d chars, expected %d' % (i, len(s), want['chars']))
        elif md5(s.encode('utf-8')) != want['md5']:
            bad.append('slice %d: md5 mismatch' % i)
    if bad:
        print('FAIL per-slice:\n  ' + '\n  '.join(bad))
        return 1
    raw = base64.b64decode(''.join(slices).encode('ascii'))
    got = sha256(raw)
    ok = got == man['final_sha256']
    print('per-slice: %d/%d ok' % (len(slices), len(slices)))
    print('final sha256: %s' % got)
    print('expected    : %s' % man['final_sha256'])
    if os.path.exists(a.input):
        disk = sha256(open(a.input, 'rb').read())
        print('on-disk     : %s  %s' % (disk, 'MATCH' if disk == got else 'MISMATCH'))
        ok = ok and disk == got
    print('TRANSFER ' + ('VERIFIED — byte-identical' if ok else 'CORRUPTED'))
    return 0 if ok else 1


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest='cmd', required=True)
    p = sub.add_parser('pack')
    p.add_argument('--in', dest='input', required=True)
    p.add_argument('--slices', required=True)
    p.add_argument('--manifest', default='')
    p.add_argument('--size', type=int, default=8000)
    p.set_defaults(func=cmd_pack)

    m = sub.add_parser('manifest')
    m.add_argument('--slices', required=True)
    m.add_argument('--manifest', default='')
    m.set_defaults(func=cmd_manifest)

    v = sub.add_parser('verify')
    v.add_argument('--in', dest='input', required=True)
    v.add_argument('--slices', required=True)
    v.add_argument('--manifest', required=True)
    v.set_defaults(func=cmd_verify)
    a = ap.parse_args()
    sys.exit(a.func(a))


if __name__ == '__main__':
    main()
