"""พิมพ์ file reference สำหรับอัปโหลดขึ้น Google Drive ผ่าน connector
ใช้: python upload_refs.py <โฟลเดอร์ที่มีไฟล์>  -> บรรทัดละ: ชื่อไฟล์<TAB>sha256:<hex>:<path>"""
import hashlib, os, sys
d = os.path.abspath(sys.argv[1])
for f in sorted(os.listdir(d)):
    p = os.path.join(d, f)
    if not os.path.isfile(p):
        continue
    h = hashlib.sha256(open(p, "rb").read()).hexdigest()
    print(f"{f}\tsha256:{h}:{p.replace(os.sep, '/')}")
