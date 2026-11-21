"""อัปโหลดไฟล์ทั้งโฟลเดอร์ขึ้น Google Drive ผ่าน Apps Script เว็บแอป
ใช้: python upload_drive.py <โฟลเดอร์ในเครื่อง> <ชื่อโฟลเดอร์บนไดรฟ์ เช่น 21.11.2026>
ต้องมีตัวแปร DRIVE_UPLOAD_URL และ DRIVE_UPLOAD_KEY (หรือไฟล์ ตั้งค่า/ค่าที่ต้องใส่บนคลาวด์.txt ในเครื่อง)"""
import base64, json, mimetypes, os, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def cfg():
    url, key = os.environ.get("DRIVE_UPLOAD_URL"), os.environ.get("DRIVE_UPLOAD_KEY")
    local = os.path.join(ROOT, "ตั้งค่า", "ค่าที่ต้องใส่บนคลาวด์.txt")
    if (not url or not key) and os.path.exists(local):
        for ln in open(local, encoding="utf-8"):
            k, _, v = ln.strip().partition("=")
            if k == "DRIVE_UPLOAD_URL" and not url and v.startswith("http"):
                url = v
            if k == "DRIVE_UPLOAD_KEY" and not key:
                key = v
    if not url or not key:
        sys.exit("ไม่มี DRIVE_UPLOAD_URL / DRIVE_UPLOAD_KEY")
    return url, key


def post(url, payload, tries=4):
    body = json.dumps(payload).encode()
    for i in range(tries):
        try:
            req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=300) as r:
                res = json.loads(r.read().decode())
            if res.get("ok"):
                return res
            raise RuntimeError(res)
        except Exception as e:
            if i == tries - 1:
                raise
            print("  ลองใหม่:", e); time.sleep(5 * (i + 1))


def main():
    src, folder = sys.argv[1], sys.argv[2]
    url, key = cfg()
    res = post(url, {"key": key, "folder": folder, "ping": True})
    print("โฟลเดอร์:", res["folderUrl"])
    for f in sorted(os.listdir(src)):
        p = os.path.join(src, f)
        if not os.path.isfile(p):
            continue
        mime = mimetypes.guess_type(f)[0] or ("video/mp4" if f.endswith(".mp4") else "text/plain")
        data = base64.b64encode(open(p, "rb").read()).decode()
        post(url, {"key": key, "folder": folder, "name": f, "mime": mime, "data": data})
        print("  อัปแล้ว:", f)
    print("เสร็จ", res["folderUrl"])


if __name__ == "__main__":
    main()
