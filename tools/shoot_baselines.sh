#!/usr/bin/env bash
# Capture the reference baselines from the offline copy.
set -u
cd "$(dirname "$0")/.." || exit 1
RT=../replkit/tools
OUT=reference/screenshots
mkdir -p "$OUT"
shoot () {  # page width theme name
  timeout 900 python3 "$RT/shoot.py" --root reference/site --path "$1" \
    --width "$2" --theme "$3" --variant '' --out "$OUT/$4.png" --absolute-bg --freeze 2>&1 | tail -2
}
shoot /index.html        1440 light desktop_1440_light
shoot /index.html        375  light mobile_375_light
shoot /index.html        1440 dark  desktop_1440_dark
shoot /index.html        375  dark  mobile_375_dark
ls -la "$OUT"
python3 - <<'PY'
from PIL import Image
import glob, os
for f in sorted(glob.glob('reference/screenshots/*.png')):
    im = Image.open(f)
    print('%-42s %s  %.1f MB' % (os.path.basename(f), im.size, os.path.getsize(f)/1048576))
PY
df -h / | tail -1
