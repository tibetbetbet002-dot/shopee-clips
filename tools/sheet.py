"""รวมภาพตัวอย่างใน stills/ เป็นแผ่นเดียว: python sheet.py <โฟลเดอร์คลิป> <ไฟล์ผลลัพธ์>"""
import glob, os, sys
from PIL import Image
fs = sorted(glob.glob(os.path.join(sys.argv[1], 'stills', 't*.jpg')), key=lambda f: float(os.path.basename(f)[1:-4]))
W, H, cols = 360, 640, 6
s = Image.new('RGB', (W * cols, H * ((len(fs) + cols - 1) // cols)))
for i, f in enumerate(fs):
    s.paste(Image.open(f).resize((W, H)), ((i % cols) * W, (i // cols) * H))
s.save(sys.argv[2], quality=88)
