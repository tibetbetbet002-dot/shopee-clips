"""เรนเดอร์ภาพตัวอย่างกลางทุกฉาก + ท้ายคลิป แล้วรวมเป็นแผ่นเดียว
ใช้: python preview.py <โฟลเดอร์คลิป> <ไฟล์ผลลัพธ์.jpg>"""
import json, os, shutil, subprocess, sys
d, out = sys.argv[1], sys.argv[2]
tl = json.load(open(os.path.join(d, "timeline.json"), encoding="utf-8"))
ts = [0.5] + [round(l["start"] + l["dur"] * 0.7, 2) for l in tl["lines"]] + [round(tl["total"] - 0.2, 2)]
shutil.rmtree(os.path.join(d, "stills"), ignore_errors=True)
here = os.path.dirname(os.path.abspath(__file__))
r = subprocess.run(["node", os.path.join(here, "render.js"), d, "--stills", ",".join(map(str, ts))], capture_output=True, text=True, encoding="utf-8")
if r.stderr.strip():
    print(r.stderr)
subprocess.run([sys.executable, os.path.join(here, "sheet.py"), d, out], check=True)
print("ok", out)
