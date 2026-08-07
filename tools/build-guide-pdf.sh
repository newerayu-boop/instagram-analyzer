#!/bin/bash
# public/guide/index.html -> public/guide/claude-qollanma-uz.pdf (A4, 23 bet)
# Chromium kerak. Lokalda: `bash tools/build-guide-pdf.sh`
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/guide/index.html"
OUT="$ROOT/public/guide/claude-qollanma-uz.pdf"
CH="${CHROME:-$(command -v chromium || command -v chromium-browser || command -v google-chrome || ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1)}"
[ -x "$CH" ] || { echo "Chromium topilmadi. CHROME=/path/to/chrome bilan ishga tushiring."; exit 1; }
"$CH" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --print-to-pdf="$OUT" --no-pdf-header-footer --virtual-time-budget=12000 "file://$SRC"
echo "OK -> $OUT"
