#!/usr/bin/env bash
# Verify the working tree matches origin/main byte-for-byte (blob SHA-1 per file).
set -eu
cd "$(dirname "$0")/.." || exit 1
python3 - <<'PY'
import subprocess, hashlib, os

def git_blob_sha(path):
    raw = open(path, 'rb').read()
    h = hashlib.sha1()
    h.update(b'blob %d\0' % len(raw))
    h.update(raw)
    return h.hexdigest()

out = subprocess.run(['git', 'ls-tree', '-r', 'origin/main'], capture_output=True, text=True).stdout
remote = {}
for line in out.splitlines():
    meta, path = line.split('\t', 1)
    mode, typ, sha = meta.split()
    if typ == 'blob':
        remote[path] = sha

missing, mismatch, checked = [], [], 0
for path, sha in sorted(remote.items()):
    if not os.path.exists(path):
        missing.append(path)
        continue
    checked += 1
    if git_blob_sha(path) != sha:
        mismatch.append(path)

print('remote blobs      : %d' % len(remote))
print('checked on disk   : %d' % checked)
print('missing locally   : %d %s' % (len(missing), missing[:6]))
print('content mismatch  : %d %s' % (len(mismatch), mismatch[:6]))
print('VERDICT:', 'WORKING TREE == origin/main (byte-identical)'
      if not missing and not mismatch else 'DIVERGENCE')
PY
