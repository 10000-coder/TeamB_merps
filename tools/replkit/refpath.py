"""Locate the shared reference package regardless of where a script sits.

Site-agnostic: any directory under shared/ whose name ends in `_reference`
(optionally narrowed by REPLKIT_REF) counts as the reference package.

Resolution order:
  1. REPLKIT_REF env var (absolute path or path relative to CWD)
  2. <ancestor>/shared/<name>_reference   for each ancestor, walking up
  3. <ancestor>/shared/*_reference        (first alphabetically if several)
  4. shared/<name>_reference relative to CWD

Set REPLKIT_REF when a project has more than one reference package.
"""
import os

SUFFIX = '_reference'


def _candidates_under(root):
    sh = os.path.join(root, 'shared')
    if not os.path.isdir(sh):
        return []
    hits = []
    for name in sorted(os.listdir(sh)):
        p = os.path.join(sh, name)
        if name.endswith(SUFFIX) and os.path.isdir(p):
            hits.append(p)
    return hits


def find_ref(start=None, name=None):
    env = os.environ.get('REPLKIT_REF')
    if env:
        return os.path.abspath(env)

    wanted = (name or '').strip()
    d = os.path.abspath(start or __file__)
    for _ in range(8):
        d = os.path.dirname(d)
        if not d or d == '/':
            break
        hits = _candidates_under(d)
        if wanted:
            for h in hits:
                if os.path.basename(h) == wanted or os.path.basename(h) == wanted + SUFFIX:
                    return h
        elif hits:
            return hits[0]

    tail = (wanted or 'target') + SUFFIX
    return os.path.abspath(os.path.join('shared', tail))


REF = find_ref()

if __name__ == '__main__':
    print(REF)
