"""รันรายวันแบบไม่ใช้ AI: หยิบตอนที่ยังไม่เคยลงจากคิว -> ทำเสียง -> เรนเดอร์ -> เขียนแคปชั่น -> อัปไดรฟ์ -> บันทึก
ใช้: python daily_run.py [--count 10] [--date 21.11.2026] [--no-upload] [--only epXX,...]
บนคลาวด์แยกเป็น 3 ขั้น (ทำหลายคลิปพร้อมกันคนละเครื่อง):
  --plan            พิมพ์ชุดงานเป็น JSON (แต่ละเครื่องได้ "ตอนหลัก,ตอนสำรอง")
  --one ep1,ep2     ทำตอนแรก ถ้าพังใช้ตอนถัดไป แล้วอัปไดรฟ์ทันที
  --record ep1,...  บันทึกลง registry ว่าวันนั้นลงตอนไหนไปแล้ว
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


def caption(ep, sc):
    return f"{ep}.mp4\n{sc['title']} 🤯 {sc['lines'][0]['text']}\n{sc['product']} กดตะกร้าด้านล่างเลย 🛒\n{TAGS}\n"


def one(eps, day, no_upload):
    """ทำ 1 คลิปบนเครื่องนี้ (ตอนแรกในรายการ ถ้าพังใช้ตอนถัดไป) แล้วอัปไดรฟ์ทันที"""
    out = os.path.join(ROOT, "พร้อมโพสต์", day); os.makedirs(out, exist_ok=True)
    for ep in eps:
        d = os.path.join("clips", ep)
        try:
            run([PY, os.path.join(T, "voice.py"), d])
            run(["node", os.path.join(T, "render.js"), d], timeout=100 * 60)
            mp4 = os.path.join(out, ep + ".mp4"); shutil.copy(os.path.join(ROOT, d, ep + ".mp4"), mp4)
            sc = json.load(open(os.path.join(ROOT, d, "script.json"), encoding="utf-8"))
            cap = os.path.join(out, ep + "-แคปชั่น.txt"); open(cap, "w", encoding="utf-8").write(caption(ep, sc))
            if not no_upload:
                run([PY, os.path.join(T, "upload_drive.py"), mp4, day])
                run([PY, os.path.join(T, "upload_drive.py"), cap, day])
            open(os.path.join(ROOT, "done.txt"), "w").write(ep)  # บอกขั้นบันทึกว่าตอนนี้สำเร็จ
            print("เสร็จ", ep); return
        except Exception as e:
            print("!! พลาด", ep, e)
    sys.exit(1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=None)
    ap.add_argument("--date", default=None)
    ap.add_argument("--no-upload", action="store_true")
    ap.add_argument("--only", default="")
    ap.add_argument("--plan", action="store_true")
    ap.add_argument("--one", default="")
    ap.add_argument("--record", default=None)
    a = ap.parse_args()
    reg = json.load(open(REG, encoding="utf-8"))
    tz = datetime.timezone(datetime.timedelta(hours=7))
    day = a.date or datetime.datetime.now(tz).strftime("%d.%m.%Y")
    count = a.count or reg.get("clips_per_day", 10)
    used = {e for eps in reg["days"].values() for e in eps}
    if a.one:
        return one(a.one.split(","), day, a.no_upload)
    if a.record is not None:
        eps = [e for e in a.record.split(",") if e]
        reg["days"][day] = sorted(set(reg["days"].get(day, []) + eps))
        json.dump(reg, open(REG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print("บันทึก", day, reg["days"][day]); return
    if day in reg["days"] and not a.only:
        if a.plan:
            print("[]"); return
        print("วันนี้ทำไปแล้ว:", day); return
    queue = sorted(d for d in os.listdir(os.path.join(ROOT, "clips"))
                   if os.path.exists(os.path.join(ROOT, "clips", d, "scenes.js")) and d not in used and not d.startswith("draft-"))
    # เรื่องยาว (st...) มาก่อนเสมอ ถ้าหมดค่อยใช้คลิปสั้นแบบเก่าที่ค้างคิว ระบบจะได้ไม่หยุด
    queue = [q for q in queue if q.startswith("st")] + [q for q in queue if not q.startswith("st")]
    if a.only:
        queue = a.only.split(",")
    todo = queue[:count]
    spare = queue[count:count + 3]  # ถ้าตอนไหนพัง ใช้ตอนถัดไปแทน จะได้ครบจำนวน
    if a.plan:  # เครื่องที่ i ได้ตอนหลัก i และตอนสำรอง i
        print(json.dumps([",".join([t] + spare[i:i + 1]) for i, t in enumerate(todo)])); return
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
            caps.append(caption(ep, sc))
            if not a.no_upload:  # อัปทันทีที่คลิปนี้เสร็จ ไม่ต้องรอครบทุกคลิป
                run([PY, os.path.join(T, "upload_drive.py"), os.path.join(out, ep + ".mp4"), day])
            done.append(ep)
        except Exception as e:
            print("!! พลาด", ep, e)
            if spare:
                todo.append(spare.pop(0))
    open(os.path.join(out, "แคปชั่น.txt"), "w", encoding="utf-8").write("\n".join(caps))

    if not a.no_upload and done:
        run([PY, os.path.join(T, "upload_drive.py"), os.path.join(out, "แคปชั่น.txt"), day])
    if not a.only:
        reg["days"][day] = done
        json.dump(reg, open(REG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"เสร็จ {len(done)}/{count} ตอน")
    if len(done) < min(count, len(queue)):
        sys.exit(1)


if __name__ == "__main__":
    main()
