"""สร้างเสียงพากย์ไทย + เพลง + เอฟเฟกต์ แล้วเขียน timeline.json
ใช้: python voice.py <โฟลเดอร์คลิป>
ทุกอย่างกำหนดใน script.json ของแต่ละตอน: cast (เสียงพากย์), music (แนวเพลง), sfx (เอฟเฟกต์)"""
import asyncio, json, os, subprocess, sys, time
import numpy as np
import edge_tts, imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
SR = 48000
FPS = 30
rng = np.random.default_rng(7)
VOICE_POLISH = ("highpass=f=75,equalizer=f=200:t=q:w=1:g=2.5,equalizer=f=3200:t=q:w=1.2:g=-2.5,"
                "equalizer=f=7500:t=q:w=1.5:g=-4,lowpass=f=12500,"
                "acompressor=threshold=0.1:ratio=2.5:attack=8:release=120:makeup=1.6,"
                "aecho=0.9:0.6:22|37:0.07|0.05")
VOICES = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "voices.json"), encoding="utf-8"))
VOICE_RMS = 0.16   # ความดังเสียงพูด (ทุกประโยคเท่ากัน)
MUSIC_DB = -15     # เพลงเบากว่าเสียงพูดกี่ dB (ปรับต่อตอนได้ด้วย music.db)
DUCK_DB = 9        # ตอนมีคนพูด เพลงหลบลงอีกกี่ dB


# ---------------- เสียงพากย์ ----------------
def decode(path, fx=None):
    cmd = [FF, "-loglevel", "error", "-i", path]
    if fx:
        cmd += ["-af", fx]
    cmd += ["-f", "s16le", "-ac", "1", "-ar", str(SR), "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def save_wav(x, path):
    subprocess.run([FF, "-loglevel", "error", "-y", "-f", "f32le", "-ac", "1", "-ar", str(SR), "-i", "-", path],
                   input=x.astype(np.float32).tobytes(), check=True)


def trim(x, th=0.012):
    idx = np.where(np.abs(x) > th)[0]
    if len(idx) == 0:
        return x
    return x[max(idx[0] - 600, 0): min(idx[-1] + 2400, len(x))]


def lead_of(x, th=0.012):
    idx = np.where(np.abs(x) > th)[0]
    return max(idx[0] - 600, 0) if len(idx) else 0


async def _tts_stream(text, voice, rate, pitch, out):
    c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary="WordBoundary")
    words = []
    with open(out, "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append([ch["offset"] / 1e7, (ch["offset"] + ch["duration"]) / 1e7, ch["text"]])
    return words


def tts_try(text, voice, rate, pitch, out, tries):
    for _ in range(tries):
        try:
            w = asyncio.run(_tts_stream(text, voice, rate, pitch, out))
            if os.path.getsize(out) > 1000:
                return w
        except Exception:
            time.sleep(min(20, 2 + 2 * _))
    return None


def synth_line(text, cfg, cache):
    """คืน (เสียงก่อนใส่เอฟเฟกต์, คำพร้อมเวลา) — ถ้าทั้งประโยคไม่ผ่าน จะหั่นเป็นท่อนตามช่องว่างแล้วต่อกัน"""
    wj = cache + ".words.json"
    tmp = cache + ".mp3"
    v, r, p = cfg["voice"], cfg.get("rate", "+0%"), cfg.get("pitch", "+0Hz")
    v = VOICES.get(v, v)  # ชื่อเล่น/เสียงที่ถูกเลิกใช้ -> เสียงจริง
    key = f"{text}|{v}|{r}|{p}|{cfg.get('keepPitch')}"
    mk = cache + ".key"
    if os.path.exists(cache) and os.path.exists(wj) and os.path.exists(mk) and open(mk, encoding="utf-8").read() == key:
        return decode(cache), json.load(open(wj, encoding="utf-8"))
    if not cfg.get("keepPitch"):
        hz = max(-6, min(6, int(p.replace("Hz", "") or 0))); p = f"{hz:+d}Hz"
        pr = max(-10, min(10, int(r.replace("%", "") or 0))); r = f"{pr:+d}%"
    w = tts_try(text, v, r, p, tmp, 10)
    if w is not None:
        raw = decode(tmp); lead = lead_of(raw) / SR
        x = trim(raw); words = [[a - lead, b - lead, t] for a, b, t in w]
    else:
        parts, words, pos = [], [], 0.0
        for chunk in text.split(" "):
            w = tts_try(chunk, v, r, p, tmp, 14)
            if w is None and len(chunk) > 12:  # หั่นครึ่งอีกรอบ
                h = len(chunk) // 2
                for sub in (chunk[:h], chunk[h:]):
                    w2 = tts_try(sub, v, r, p, tmp, 14)
                    if w2 is None:
                        raise RuntimeError(f"สร้างเสียงไม่ได้: {sub}")
                    raw = decode(tmp); lead = lead_of(raw) / SR; seg = trim(raw)
                    words += [[pos + a - lead, pos + b - lead, t] for a, b, t in w2]
                    parts += [seg, np.zeros(int(0.03 * SR), np.float32)]; pos += (len(seg) + int(0.03 * SR)) / SR
                continue
            if w is None:
                raise RuntimeError(f"สร้างเสียงไม่ได้ (ลองเปลี่ยนคำ): {chunk}")
            raw = decode(tmp); lead = lead_of(raw) / SR; seg = trim(raw)
            words += [[pos + a - lead, pos + b - lead, t] for a, b, t in w]
            parts += [seg, np.zeros(int(0.07 * SR), np.float32)]; pos += (len(seg) + int(0.07 * SR)) / SR
        x = np.concatenate(parts[:-1])
    os.remove(tmp) if os.path.exists(tmp) else None
    save_wav(x, cache)
    json.dump(words, open(wj, "w", encoding="utf-8"), ensure_ascii=False)
    open(mk, "w", encoding="utf-8").write(key)
    return x, words


def apply_fx(x, fx):
    if not fx:
        return x
    p = subprocess.run([FF, "-loglevel", "error", "-f", "f32le", "-ac", "1", "-ar", str(SR), "-i", "-", "-af", fx,
                        "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], input=x.astype(np.float32).tobytes(),
                       capture_output=True, check=True)
    return np.frombuffer(p.stdout, np.float32).copy()


# ---------------- เครื่องดนตรีสังเคราะห์ ----------------
def note(m):
    return 440 * 2 ** ((m - 69) / 12)


def lowpass(x, k):
    return np.convolve(x, np.ones(k) / k, mode="same")


def add(out, seg, at):
    s = int(at * SR)
    if s >= len(out):
        return
    n = min(len(seg), len(out) - s)
    out[s:s + n] += seg[:n]


def tone(f, dur, kind="sine", dec=6.0, att=0.005, vib=0.0):
    L = int(dur * SR); t = np.arange(L) / SR
    fr = f * (1 + vib * np.sin(2 * np.pi * 5.2 * t))
    ph = 2 * np.pi * np.cumsum(fr) / SR
    if kind == "sine":
        w = np.sin(ph)
    elif kind == "square":
        w = np.sign(np.sin(ph))
    elif kind == "marimba":
        w = np.sin(ph) + 0.35 * np.sin(4 * ph) * np.exp(-t * 25)
    elif kind == "bass":
        w = np.sin(ph) + 0.3 * np.sin(2 * ph) + 0.1 * np.sin(3 * ph)
    elif kind == "horn":
        w = sum(np.sin(h * ph) / h ** 1.6 for h in range(1, 7))
    elif kind == "pad":
        w = np.sin(ph) + 0.4 * np.sin(ph * 1.005) + 0.2 * np.sin(2 * ph)
    env = np.minimum(1, t / max(att, 1e-4)) * np.exp(-t * dec)
    return (w * env).astype(np.float32)


def noise(dur, dec=40, k=1):
    L = int(dur * SR); t = np.arange(L) / SR
    n = rng.standard_normal(L).astype(np.float32)
    if k > 1:
        n = lowpass(n, k) * np.sqrt(k)
    return n * np.exp(-t * dec)


def music_scifi(dur, bpm=112):
    out = np.zeros(int(dur * SR), np.float32); beat = 60 / bpm; st = beat / 2
    prog = [(45, [57, 60, 64]), (41, [57, 60, 65]), (43, [55, 59, 62]), (40, [55, 59, 64])]
    for i in range(int(dur / st) + 1):
        root, ch = prog[int(i * st / (beat * 4)) % 4]; at = i * st
        if i % 2 == 0:
            f = note(root - 12 if i % 4 == 0 else root)
            add(out, (tone(f, st, "square", 9) * 0.5 + tone(f, st, "sine", 9)) * 0.16, at)
        add(out, tone(note(ch[i % 3] + 12), st, "square", 18) * 0.045, at)
        if i % 2:
            add(out, noise(0.04, 90) * 0.035, at)
    mel = [69, 72, 76, 74, 72, 69, 67, 69]
    for k, m in enumerate(mel * 8):
        if (k // 8) % 2 == 0:
            add(out, tone(note(m), beat * 2, "sine", 0.8, 0.08, 0.012) * 0.05, k * beat * 2)
    return out


def music_noir(dur, bpm=76):
    """แจ๊สนักสืบ: เบสเดินไลน์ + แปรงกลอง + คอร์ดไมเนอร์ + ทรัมเป็ตอุดเสียง"""
    out = np.zeros(int(dur * SR), np.float32); beat = 60 / bpm
    chords = [[50, 53, 57, 60], [43, 47, 50, 53], [48, 52, 55, 59], [45, 49, 52, 55]]  # Dm7 G7 Cmaj7 A7
    walk = [[38, 41, 45, 44], [43, 41, 40, 38], [36, 40, 43, 42], [45, 43, 41, 40]]
    for i in range(int(dur / beat) + 1):
        bar = (i // 4) % 4; at = i * beat
        add(out, tone(note(walk[bar][i % 4]), beat, "bass", 4.5, 0.01) * 0.22, at)
        if i % 4 == 0:
            for m in chords[bar]:
                add(out, tone(note(m + 12), beat * 4, "pad", 0.6, 0.25) * 0.022, at)
        if i % 2 == 1:
            add(out, noise(0.18, 14, 3) * 0.05, at)  # แปรง
        add(out, noise(0.06, 60, 2) * 0.018, at + beat * 0.66)  # สวิง
    lick = [(62, 1.5), (65, .5), (64, 1), (62, 1), (60, 2), (57, 2)]
    t0 = beat * 8
    while t0 < dur - 4:
        tt = t0
        for m, d in lick:
            add(out, tone(note(m + 12), beat * d * 0.95, "horn", 1.2, 0.04, 0.008) * 0.045, tt); tt += beat * d
        t0 += beat * 16
    return out


def music_doc(dur, bpm=96):
    """สารคดีธรรมชาติ: มาริมบาเพนทาโทนิก + แพดนุ่ม + เชคเกอร์"""
    out = np.zeros(int(dur * SR), np.float32); beat = 60 / bpm; st = beat / 2
    scale = [60, 62, 64, 67, 69, 72, 74, 76]
    pat = [0, 2, 4, 2, 5, 4, 2, 1, 0, 2, 4, 6, 5, 4, 3, 2]
    roots = [48, 45, 41, 43]
    for i in range(int(dur / st) + 1):
        at = i * st; bar = int(at / (beat * 4)) % 4
        add(out, tone(note(scale[pat[i % 16]]), st * 2, "marimba", 7) * 0.07, at)
        if i % 8 == 0:
            r = roots[bar]
            for m in (r, r + 7, r + 16):
                add(out, tone(note(m), beat * 4, "pad", 0.5, 0.4) * 0.03, at)
            add(out, tone(note(r - 12), beat * 2, "bass", 2.5, 0.02) * 0.12, at)
        add(out, noise(0.05, 70, 1) * (0.02 if i % 2 else 0.012), at)
    return out


def music_news(dur, bpm=120):
    """ข่าวด่วน: สแตบซินธ์ + ทิมปานี + ติ๊กนาฬิกา"""
    out = np.zeros(int(dur * SR), np.float32); beat = 60 / bpm
    ch = [[50, 57, 62, 65], [46, 53, 58, 62], [48, 55, 60, 64], [45, 52, 57, 61]]
    for i in range(int(dur / beat) + 1):
        at = i * beat; c = ch[(i // 8) % 4]
        add(out, noise(0.03, 120) * 0.05, at); add(out, noise(0.03, 120) * 0.03, at + beat / 2)
        if i % 8 in (0, 3, 6):
            for m in c:
                add(out, tone(note(m), beat * 0.9, "square", 7) * 0.03, at)
        if i % 4 == 0:
            add(out, tone(note(c[0] - 12), beat, "sine", 5) * 0.3, at)
        add(out, tone(note(c[1] + 12), beat * 0.25, "sine", 30) * 0.05, at + beat * 0.5)
    return out


def music_quiz(dur, bpm=128):
    """เกมโชว์: เบสเด้ง + แตรสังเคราะห์ + ปรบมือ"""
    out = np.zeros(int(dur * SR), np.float32); beat = 60 / bpm
    roots = [48, 53, 55, 53]; mel = [72, 76, 79, 76, 77, 74, 72, 74]
    for i in range(int(dur / beat) + 1):
        at = i * beat; r = roots[(i // 4) % 4]
        add(out, tone(note(r - 12 + (7 if i % 2 else 0)), beat * 0.8, "bass", 6) * 0.2, at)
        if i % 2 == 1:
            add(out, noise(0.08, 30, 2) * 0.09, at)
        add(out, noise(0.03, 120) * 0.025, at + beat / 2)
        if (i // 8) % 2 == 0:
            add(out, tone(note(mel[i % 8]), beat * 0.8, "horn", 5, 0.02) * 0.05, at)
    return out


def music_chip(dur, bpm=140):
    """ชิปทูน 8 บิต"""
    out = np.zeros(int(dur * SR), np.float32); st = 60 / bpm / 4
    prog = [[60, 64, 67, 72], [57, 60, 64, 69], [53, 57, 60, 65], [55, 59, 62, 67]]
    lead = [72, 0, 76, 79, 0, 76, 72, 74, 0, 74, 77, 0, 76, 74, 72, 0]
    for i in range(int(dur / st) + 1):
        at = i * st; c = prog[(i // 16) % 4]
        add(out, tone(note(c[i % 4] + 12), st, "square", 25) * 0.035, at)
        if i % 4 == 0:
            add(out, tone(note(c[0] - 12), st * 3, "square", 3) * 0.07, at)
        if i % 8 == 4:
            add(out, noise(0.05, 60) * 0.06, at)
        m = lead[i % 16]
        if m and (i // 32) % 2 == 0:
            add(out, tone(note(m), st * 1.8, "square", 6) * 0.04, at)
    return out


def music_funk(dur, bpm=104):
    """ฟังก์ทำอาหาร: เบสสแลป + ไฮแฮต + คอร์ดสั้น"""
    out = np.zeros(int(dur * SR), np.float32); st = 60 / bpm / 4
    bass = [40, 0, 0, 40, 0, 52, 0, 40, 43, 0, 45, 0, 47, 0, 50, 52]
    for i in range(int(dur / st) + 1):
        at = i * st
        if bass[i % 16]:
            add(out, tone(note(bass[i % 16]), st * 1.5, "bass", 12) * 0.25, at)
        if i % 8 == 4:
            add(out, noise(0.1, 25, 2) * 0.1, at)
        if i % 2 == 0:
            add(out, noise(0.02, 200) * 0.03, at)
        if i % 16 in (2, 10):
            for m in (64, 67, 71):
                add(out, tone(note(m), st, "square", 30) * 0.025, at)
    return out


def music_horror(dur, bpm=60):
    """สยองขวัญ: โดรนต่ำ + หัวใจเต้น + กล่องดนตรีเพี้ยน"""
    out = np.zeros(int(dur * SR), np.float32); t = np.arange(len(out)) / SR
    out += ((np.sin(2 * np.pi * 55 * t) + 0.5 * np.sin(2 * np.pi * 58.3 * t)) * 0.08 * (0.6 + 0.4 * np.sin(t * 0.7))).astype(np.float32)
    beat = 60 / 72
    for i in range(int(dur / beat) + 1):
        add(out, tone(48, 0.15, "sine", 20) * 0.5, i * beat); add(out, tone(44, 0.15, "sine", 22) * 0.35, i * beat + 0.22)
    box = [84, 83, 79, 80, 84, 87, 86, 79]
    for k in range(int(dur / 0.9)):
        add(out, tone(note(box[k % 8]) * (1 + 0.01 * np.sin(k)), 0.8, "sine", 5) * 0.03, k * 0.9)
    return out


def music_workout(dur, bpm=128):
    """ฟิตเนส: กลองสี่จังหวะ + ซินธ์ออฟบีต"""
    out = np.zeros(int(dur * SR), np.float32); beat = 60 / bpm
    ch = [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 55, 59]]
    L = int(0.25 * SR); tt = np.arange(L) / SR
    kick = (np.sin(2 * np.pi * (50 + 120 * np.exp(-tt * 30)) * tt) * np.exp(-tt * 9) * 0.35).astype(np.float32)
    for i in range(int(dur / beat) + 1):
        at = i * beat; c = ch[(i // 4) % 4]
        add(out, kick, at)
        add(out, noise(0.04, 90) * 0.04, at + beat / 2)
        for m in c:
            add(out, tone(note(m), beat * 0.4, "square", 9) * 0.02, at + beat / 2)
        add(out, tone(note(c[0] - 24), beat * 0.45, "bass", 6) * 0.15, at + beat / 2)
        if i % 2:
            add(out, noise(0.1, 25, 2) * 0.07, at)
    return out


def music_drama(dur, bpm=70):
    """ละคร: เปียโนอาร์เพจจิโอ + สตริงแพด"""
    out = np.zeros(int(dur * SR), np.float32); st = 60 / bpm / 2
    prog = [[45, 52, 57, 60, 64], [41, 48, 53, 57, 60], [43, 50, 55, 59, 62], [40, 47, 52, 56, 59]]
    for i in range(int(dur / st) + 1):
        at = i * st; c = prog[(i // 8) % 4]
        add(out, tone(note(c[[0, 2, 3, 4, 3, 2, 1, 2][i % 8]] + 12), st * 3, "marimba", 2.5) * 0.06, at)
        if i % 8 == 0:
            for m in c[1:]:
                add(out, tone(note(m), st * 8, "pad", 0.25, 0.6) * 0.025, at)
            add(out, tone(note(c[0]), st * 6, "bass", 1.2) * 0.12, at)
    return out


MUSIC = {"scifi": music_scifi, "noir": music_noir, "doc": music_doc, "news": music_news, "quiz": music_quiz,
         "chip": music_chip, "funk": music_funk, "horror": music_horror, "workout": music_workout, "drama": music_drama}


# ---------------- เอฟเฟกต์เสียง ----------------
def sfx(kind, dur=None):
    t = lambda d: np.arange(int(d * SR)) / SR
    if kind == "portal":
        tt = t(1.0); f = 200 + 1400 * tt ** 1.5
        return (np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25 + rng.standard_normal(len(tt)) * 0.06) * np.sin(np.pi * tt) * 0.9
    if kind == "close":
        return sfx("portal")[::-1].copy()
    if kind == "pop":
        tt = t(0.12); return np.sin(2 * np.pi * (600 + 900 * tt / 0.12) * tt) * np.exp(-tt * 30) * 0.35
    if kind == "boing":
        tt = t(0.5); f = 180 * (1 + 0.4 * np.sin(2 * np.pi * 9 * tt) * np.exp(-tt * 4))
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 5) * 0.4
    if kind == "ding":
        tt = t(1.0); return (np.sin(2 * np.pi * 1318 * tt) + 0.5 * np.sin(2 * np.pi * 1976 * tt)) * np.exp(-tt * 4) * 0.25
    if kind == "whoosh":
        tt = t(0.35); return lowpass(rng.standard_normal(len(tt)), 4) * np.sin(np.pi * tt / 0.35) * 0.25
    if kind == "rain":
        d = dur or 8; tt = t(d)
        x = lowpass(rng.standard_normal(len(tt)), 6) * 0.10
        drops = (rng.random(len(tt)) > 0.9993) * rng.random(len(tt))
        x += lowpass(drops, 3) * 2.0
        fade = np.minimum(1, np.minimum(tt / 0.6, (d - tt) / 0.8))
        return x * fade
    if kind == "thunder":
        tt = t(2.5); x = lowpass(rng.standard_normal(len(tt)), 60) * 6
        return x * (np.exp(-tt * 1.6) * (0.4 + 0.6 * np.abs(np.sin(tt * 7)))) * 0.5
    if kind == "stamp":
        tt = t(0.4); return (np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 14) + lowpass(rng.standard_normal(len(tt)), 3) * np.exp(-tt * 40) * .5) * 0.8
    if kind == "type":
        out = np.zeros(int((dur or 1.2) * SR), np.float32)
        for k in range(int((dur or 1.2) / 0.085)):
            c = noise(0.025, 200) * 0.35 + tone(2200 + rng.random() * 600, 0.025, "sine", 200) * 0.15
            add(out, c, k * 0.085 + rng.random() * 0.02)
        return out
    if kind == "sting":  # คอร์ดดราม่า
        tt = t(1.6); x = sum(np.sin(2 * np.pi * note(m) * tt) for m in (38, 41, 44, 50, 56))
        return x * np.minimum(1, tt / 0.01) * np.exp(-tt * 2.2) * 0.12
    if kind == "squeak":
        tt = t(0.22); f = 1400 + 900 * np.sin(np.pi * tt / 0.22)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / 0.22) * 0.18
    if kind == "spark":
        out = np.zeros(int(0.6 * SR), np.float32)
        for k in range(14):
            add(out, noise(0.015, 300) * (0.6 * rng.random()), rng.random() * 0.55)
        return out
    if kind == "slide":  # สไลด์วิสเซิลลง
        tt = t(0.7); f = 1600 * np.exp(-tt * 2.5)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / 0.7) * 0.2
    if kind == "crash":
        tt = t(0.8); return lowpass(rng.standard_normal(len(tt)), 2) * np.exp(-tt * 6) * 0.45
    if kind == "shutter":
        out = np.zeros(int(0.2 * SR), np.float32)
        add(out, noise(0.02, 200) * 0.5, 0); add(out, noise(0.03, 150) * 0.4, 0.08); return out
    if kind == "shimmer":
        out = np.zeros(int(1.4 * SR), np.float32)
        for k, m in enumerate([84, 88, 91, 96, 100]):
            add(out, tone(note(m), 1.0, "sine", 4, 0.01) * 0.06, k * 0.06)
        return out
    if kind == "click":
        return noise(0.02, 250) * 0.4
    if kind == "buzzer":
        tt = t(0.6); return np.sign(np.sin(2 * np.pi * 110 * tt)) * 0.25 * (tt < 0.55)
    if kind == "correct":
        out = np.zeros(int(0.7 * SR), np.float32); add(out, tone(note(84), 0.3, "sine", 6) * 0.3, 0); add(out, tone(note(88), 0.4, "sine", 5) * 0.3, 0.12); return out
    if kind == "applause":
        d = dur or 1.5; out = np.zeros(int(d * SR), np.float32)
        for k in range(int(d * 60)):
            add(out, noise(0.02, 150) * rng.random() * 0.25, rng.random() * d)
        return out * np.minimum(1, (d - np.arange(len(out)) / SR) * 2)
    if kind == "whistle":
        tt = t(0.5); return np.sin(2 * np.pi * 2800 * tt + 3 * np.sin(2 * np.pi * 40 * tt)) * 0.18 * np.minimum(1, tt * 40)
    if kind == "heartbeat":
        out = np.zeros(int(0.6 * SR), np.float32); add(out, tone(55, 0.15, "sine", 18) * 0.7, 0); add(out, tone(50, 0.15, "sine", 20) * 0.5, 0.2); return out
    if kind == "sizzle":
        d = dur or 1.0; tt = t(d); return rng.standard_normal(len(tt)) * 0.06 * np.minimum(1, np.minimum(tt * 8, (d - tt) * 4))
    if kind == "coin":
        out = np.zeros(int(0.35 * SR), np.float32); add(out, tone(note(83), 0.08, "square", 5) * 0.12, 0); add(out, tone(note(88), 0.25, "square", 8) * 0.12, 0.08); return out
    if kind == "jump":
        tt = t(0.25); f = 300 + 900 * tt / 0.25; return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.1 * (1 - tt / 0.25)
    if kind == "powerup":
        out = np.zeros(int(0.8 * SR), np.float32)
        for k, m in enumerate([60, 64, 67, 72, 76, 79, 84]):
            add(out, tone(note(m), 0.1, "square", 10) * 0.1, k * 0.08)
        return out
    if kind == "hurt":
        tt = t(0.4); f = 600 * np.exp(-tt * 6); return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.12
    if kind == "news":
        out = np.zeros(int(1.6 * SR), np.float32)
        for m in (50, 57, 62, 66, 69):
            add(out, tone(note(m), 1.5, "horn", 2.5, 0.01) * 0.06, 0)
        add(out, tone(41, 1.2, "sine", 3) * 0.5, 0); return out
    if kind == "drumroll":
        d = dur or 1.2; out = np.zeros(int(d * SR), np.float32)
        for k in range(int(d / 0.04)):
            add(out, noise(0.04, 60, 2) * 0.12 * (0.5 + 0.5 * k * 0.04 / d), k * 0.04)
        return out
    if kind == "chop":
        return noise(0.06, 80) * 0.4 + np.pad(tone(180, 0.06, "sine", 40) * 0.4, (0, 0))
    if kind == "scream":
        tt = t(1.0); f = 900 + 500 * np.sin(2 * np.pi * 7 * tt)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.18 * np.exp(-tt * 2) + lowpass(rng.standard_normal(len(tt)), 2) * 0.05 * np.exp(-tt * 3)
    if kind == "riser":
        d = dur or 1.2; tt = t(d); f = 200 + 1500 * (tt / d) ** 2
        return (np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.08 + lowpass(rng.standard_normal(len(tt)), 3) * 0.08) * (tt / d)
    if kind == "drill":  # สว่านเจาะผนัง: หึ่งความถี่สูง + กระแทกเป็นจังหวะ
        d = dur or 1.6; tt = t(d); f = 520 + 40 * np.sin(2 * np.pi * 3 * tt)
        x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.12 + rng.standard_normal(len(tt)) * 0.08
        x *= 0.6 + 0.4 * (np.sin(2 * np.pi * 14 * tt) > 0)
        return lowpass(x, 3) * np.minimum(1, tt * 20) * np.minimum(1, (d - tt) * 8)
    if kind == "knock":
        out = np.zeros(int(0.9 * SR))
        for k in range(3):
            tt = t(0.12); add(out, (np.sin(2 * np.pi * 140 * tt) * 0.6 + rng.standard_normal(len(tt)) * 0.2) * np.exp(-tt * 40), k * 0.25)
        return out
    if kind == "rainloop":
        d = dur or 4; tt = t(d); return lowpass(rng.standard_normal(len(tt)) * 0.12, 6) * np.minimum(1, tt * 2) * np.minimum(1, (d - tt) * 2)
    if kind == "meow":
        tt = t(0.6); f = 700 + 300 * np.sin(np.pi * tt / 0.6); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / 0.6) * 0.3
    if kind == "fan":
        d = dur or 2.0; tt = t(d); return lowpass(rng.standard_normal(len(tt)), 20) * 0.5 * np.minimum(1, tt * 2) * np.minimum(1, (d - tt) * 3)
    if kind == "gasp":
        tt = t(0.4); return lowpass(rng.standard_normal(len(tt)), 3) * np.sin(np.pi * tt / 0.4) * 0.15
    if kind == "slap":
        return noise(0.1, 40) * 0.6
    if kind == "alarm":
        out = np.zeros(int(1.6 * SR), np.float32)
        for k in range(6):
            add(out, tone(note(88), 0.1, "square", 4) * 0.12, k * 0.25)
        return out
    if kind == "birds":
        d = dur or 3.0; out = np.zeros(int(d * SR), np.float32)
        for k in range(int(d * 3)):
            tt = t(0.12); f = 3000 + 1500 * np.sin(np.pi * tt / 0.12) + rng.random() * 800
            add(out, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / 0.12) * 0.06, rng.random() * (d - 0.2))
        return out
    raise ValueError(kind)


DEFAULT_CAST = {
    "robot": dict(voice="th-TH-NiwatNeural", rate="+4%", pitch="-14Hz",
                  fx="aecho=0.8:0.6:5|10:0.45|0.35,flanger=delay=1.5:depth=2:speed=0.6,highpass=f=140"),
    "human": dict(voice="th-TH-NiwatNeural", rate="+14%", pitch="+10Hz"),
}


def main(folder):
    sc = json.load(open(os.path.join(folder, "script.json"), encoding="utf-8"))
    cast = sc.get("cast", DEFAULT_CAST)
    intro, gap, outro = sc.get("intro", 1.1), sc.get("gap", 0.28), sc.get("outro", 1.6)
    vdir = os.path.join(folder, "voice"); os.makedirs(vdir, exist_ok=True)
    clips = []
    for i, ln in enumerate(sc["lines"]):
        cfg = cast[ln["who"]]
        x, words = synth_line(ln["text"], cfg, os.path.join(vdir, f"{i:02d}_{ln['who']}.wav"))
        fxd = apply_fx(x, cfg.get("fx")); lead2 = lead_of(fxd) / SR
        c = trim(fxd)
        ln["words"] = [[round(a - lead2, 3), round(b - lead2, 3), t] for a, b, t in words]
        # บีบเสียงพูดให้สม่ำเสมอ แล้วปรับทุกประโยคให้ดังเท่ากัน
        c = apply_fx(c, VOICE_POLISH)
        speech = c[np.abs(c) > 0.02]
        rms = float(np.sqrt(np.mean(speech ** 2))) if len(speech) else 0.1
        c = c * (VOICE_RMS / max(rms, 1e-4)) * cfg.get("gain", 1.0)
        clips.append(np.clip(c, -0.98, 0.98))

    t = intro
    for ln, c in zip(sc["lines"], clips):
        ln["start"] = round(t, 3); ln["dur"] = round(len(c) / SR, 3)
        hop = SR // FPS
        rms = [float(np.sqrt(np.mean(c[k:k + hop] ** 2))) for k in range(0, len(c), hop)]
        mx = max(rms) or 1
        ln["env"] = [round(min(1, r / mx * 1.3), 2) for r in rms]
        j = sc["lines"].index(ln); nx = sc["lines"][j + 1] if j + 1 < len(sc["lines"]) else None
        auto = gap
        if nx is not None and sc.get("naturalGaps", True):
            auto = gap * (0.7 if nx["who"] == ln["who"] else 1.0) + (0.25 if nx.get("shot") or nx.get("scene") != ln.get("scene") else 0)
        ln["pause"] = ln.get("pause", round(auto, 3))
        t += len(c) / SR + ln["pause"]
    total = t - sc["lines"][-1].get("pause", gap) + outro

    voice = np.zeros(int(total * SR) + SR, np.float32)
    for ln, c in zip(sc["lines"], clips):
        add(voice, c * 0.95, ln["start"])
    fx = np.zeros_like(voice)
    for s in sc.get("sfx", []):
        if s.get("line") == "end":
            at = total - outro + s.get("at", 0)
        else:
            ln = sc["lines"][s.get("line", 0)]
            at = ln["start"] + s.get("at", 0) + s.get("atDur", 0) * ln["dur"]
        add(fx, sfx(s["k"], s.get("dur")) * s.get("g", 1.0), max(0, at))

    m = sc.get("music", {"style": "scifi"})
    music = MUSIC[m["style"]](len(voice) / SR, **({"bpm": m["bpm"]} if "bpm" in m else {}))
    music = np.resize(music, len(voice)) if len(music) >= len(voice) else np.pad(music, (0, len(voice) - len(music)))
    fade = int(1.2 * SR); music[-fade:] *= np.linspace(1, 0, fade)
    # เพลงเบากว่าเสียงพูด MUSIC_DB dB และหลบลงอีก DUCK_DB dB ตอนมีคนพูด
    mrms = float(np.sqrt(np.mean(music ** 2))) or 1e-4
    music *= VOICE_RMS * 10 ** (m.get("db", MUSIC_DB) / 20) / mrms
    talk = (np.convolve(np.abs(voice), np.ones(2400) / 2400, mode="same") > 0.01).astype(np.float32)
    talk = np.convolve(talk, np.ones(9600) / 9600, mode="same")  # ค่อย ๆ หลบ/คืน ~0.2 วิ
    duck = 1 - (1 - 10 ** (-DUCK_DB / 20)) * np.clip(talk * 1.5, 0, 1)
    fpk = np.max(np.abs(fx))
    if fpk > 0:
        fx *= min(1.0, VOICE_RMS * 3.2 / fpk)  # เอฟเฟกต์ไม่ดังเกินเสียงพูด
    on = np.convolve(np.abs(voice), np.ones(2400) / 2400, mode="same") > 0.03
    db = lambda v: 20 * np.log10(np.sqrt(np.mean(v ** 2)) + 1e-9)
    print(f"ตอนพูด: เสียงพูดดังกว่าเพลง {db(voice[on]) - db((music * duck)[on]):.1f} dB, "
          f"ดังกว่าเอฟเฟกต์ {db(voice[on]) - db(fx[on]):.1f} dB")
    mix = (voice + fx + music * duck)[: int(total * SR)]
    mix = np.tanh(mix * 1.4) / 1.4  # กันพีคแตก
    mix = mix / max(1e-6, np.max(np.abs(mix))) * 0.89
    tmp = os.path.join(folder, "audio.wav")
    subprocess.run([FF, "-loglevel", "error", "-y", "-f", "f32le", "-ac", "1", "-ar", str(SR), "-i", "-", "-ac", "2", tmp],
                   input=mix.astype(np.float32).tobytes(), check=True)
    sc["total"] = round(total, 3)
    json.dump(sc, open(os.path.join(folder, "timeline.json"), "w", encoding="utf-8"), ensure_ascii=False)
    print(f"รวม {total:.1f} วินาที")
    for ln in sc["lines"]:
        print(f'{ln["start"]:6.2f} +{ln["dur"]:.2f} {ln["who"]:7} {ln["text"]}')


if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    main(sys.argv[1])
