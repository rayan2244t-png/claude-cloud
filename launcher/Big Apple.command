#!/bin/bash
# macOS / Linux: двойной клик запускает игру в браузере.
cd "$(dirname "$0")/.." || exit 1
command -v node >/dev/null || { echo "Нужен Node.js: https://nodejs.org"; read -r; exit 1; }
[ -d node_modules ] || npm install
[ -f dist/index.html ] || npm run build
npx vite preview --port 4173 --strictPort &
sleep 3
if [ "$(uname)" = "Darwin" ]; then open "http://localhost:4173"; else xdg-open "http://localhost:4173"; fi
wait
