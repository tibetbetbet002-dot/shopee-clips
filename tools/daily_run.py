"""รันรายวันแบบไม่ใช้ AI: หยิบตอนที่ยังไม่เคยลงจากคิว -> ทำเสียง -> เรนเดอร์ -> เขียนแคปชั่น -> อัปไดรฟ์ -> บันทึก
ใช้: python daily_run.py [--count 10] [--date 21.11.2026] [--no-upload] [--only epXX,...]
คิว = โฟลเดอร์ใน clips/ ที่มี script.json + scenes.js และยังไม่อยู่ใน registry.days"""
import argparse, datetime, json, os, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = os.path.join(ROOT, "tools")
PY = sys.executable
REG = os.path.join(T, "registry.json")
TAGS = "#โต๊ะคอม #ของมันต้องมี #shopee #ป้ายยา #แต่งโต๊ะคอม #workfromhome #ของดีบอกต่อ"


def run(cmd, timeout=None):
    print("$", " ".join(cmd), flush=True)
    subprocess.run(cmd, check=True, cwd=ROOT, timeout=timeout)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=None)
    ap.add_argument("--date", default=None)
    ap.add_argument("--no-upload", action="store_true")
    ap.add_argument("--only", default="")
    a = ap.parse_args()
    reg = json.load(open(REG, encoding="utf-8"))
    tz = datetime.timezone(datetime.timedelta(hours=7))
    day = a.date or datetime.datetime.now(tz).strftime("%d.%m.%Y")
    count = a.count or reg.get("clips_per_day", 10)
    used = {e for eps in reg["days"].values() for e in eps}
    if day in reg["days"] and not a.only:
        print("วันนี้ทำไปแล้ว:", day); return
    queue = sorted(d for d in os.listdir(os.path.join(ROOT, "clips"))
                   if os.path.exists(os.path.join(ROOT, "clips", d, "scenes.js")) and d not in used and not d.startswith("draft-"))
    # เรื่องยาว (st...) มาก่อนเสมอ ถ้าหมดค่อยใช้คลิปสั้นแบบเก่าที่ค้างคิว ระบบจะได้ไม่หยุด
    queue = [q for q in queue if q.startswith("st")] + [q for q in queue if not q.startswith("st")]
    if a.only:
        queue = a.only.split(",")
    todo = queue[:count]
    spare = queue[count:count + 3]  # ถ้าตอนไหนพัง ใช้ตอนถัดไปแทน จะได้ครบจำนวน
    print(f"วันที่ {day}: ทำ {len(todo)} ตอน, คิวเหลือหลังวันนี้ {max(0, len(queue) - len(todo))} ตอน")
    if not todo:
        print("คิวว่าง — ต้องเติมตอนใหม่"); sys.exit(2)

    out = os.path.join(ROOT, "พร้อมโพสต์", day); os.makedirs(out, exist_ok=True)
    caps, done = [], []
    for ep in todo:
        if len(done) >= count:
            break
        d = os.path.join("clips", ep)
        try:
            run([PY, os.path.join(T, "voice.py"), d])
            run(["node", os.path.join(T, "render.js"), d], timeout=100 * 60)  # เกิน 100 นาที = ถือว่าค้าง ข้ามไปตอนถัดไป
            shutil.copy(os.path.join(ROOT, d, ep + ".mp4"), out)
            sc = json.load(open(os.path.join(ROOT, d, "script.json"), encoding="utf-8"))
            caps.append(f"{ep}.mp4\n{sc['title']} 🤯 {sc['lines'][0]['text']}\n{sc['product']} กดตะกร้าด้านล่างเลย 🛒\n{TAGS}\n")
            done.append(ep)
        except Exception as e:
            print("!! พลาด", ep, e)
            if spare:
                todo.append(spare.pop(0))
    open(os.path.join(out, "แคปชั่น.txt"), "w", encoding="utf-8").write("\n".join(caps))

    if not a.no_upload and done:
        run([PY, os.path.join(T, "upload_drive.py"), out, day])
    if not a.only:
        reg["days"][day] = done
        json.dump(reg, open(REG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"เสร็จ {len(done)}/{count} ตอน")
    if len(done) < min(count, len(queue)):
        sys.exit(1)


if __name__ == "__main__":
    main()
