#!/usr/bin/env bash
# ติดตั้งเครื่องมือบนเครื่อง Linux บนคลาวด์ (รันจากโฟลเดอร์รากของโปรเจกต์)
set -e
cd "$(dirname "$0")"
python3 -m pip install -q -r requirements.txt
npm ci --silent || npm install --silent
if ! ls /usr/bin/google-chrome* /usr/bin/chromium* >/dev/null 2>&1; then
  npx --yes @puppeteer/browsers install chrome@stable --path "$(pwd)/.chrome" >/dev/null
  # ไลบรารีที่ Chrome ต้องใช้ (ถ้ามีสิทธิ์ติดตั้ง)
  (sudo apt-get install -y -q libnss3 libatk-bridge2.0-0 libgbm1 libxkbcommon0 libasound2t64 2>/dev/null || sudo apt-get install -y -q libnss3 libatk-bridge2.0-0 libgbm1 libxkbcommon0 libasound2 2>/dev/null || true) >/dev/null
fi
echo "setup ok"
