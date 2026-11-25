# Daily run: 10 Shopee cartoon clips → Google Drive

This runbook is for an unattended daily run. Nobody is watching, so don't ask questions. Make sensible choices, finish the work, and report at the end in Thai.

Project root: the repository root (`E:\คลิปลงปักตระกร้า` on the user's PC; the git checkout in the cloud).

**Cloud setup (Linux):** before anything else, run `bash tools/setup_cloud.sh`. It installs the Python packages, the npm packages and Chrome. In the cloud use `python3`.

**Saving state:** when the day is finished, commit `tools/registry.json`, the new `clips/*/script.json` and `clips/*/scenes.js`, and `tools/voice.py` if you changed it, then push to the default branch (`main`). That way the next day knows which formats and products were already used. Never commit mp4/wav files. `.gitignore` handles this. Read `วิธีใช้.md`, `tools/registry.json`, and at least two existing episodes before you start. Use their `clips/*/script.json` and `clips/*/scenes.js`, for example `clips/ep04-wrist-mousepad` and `clips/ep06-lumbar-cushion`, to learn the drawing API in `tools/core.html` and how the scripts are built.

## Hard rules (from the user)
1. **Every episode is fully unique.** Each one gets a new story format, new characters, new scenes, palette, header, subtitle style, intro, outro and end card.
   - Never reuse a format listed in `registry.formats_used`. Pick from `registry.format_ideas` or invent a new one.
   - Within one day, all 10 episodes must differ from each other in music style and subtitle font.
2. **Products:** cheap computer-desk items, mostly under ฿500. Never repeat anything in `registry.products_used`. Pick from `registry.product_ideas` or add similar cheap desk items.
3. **Language:** all narration, subtitles and on-screen text are in Thai.
4. **Format:** vertical 1080x1920, about **35–50 s**. The user found 20–30 s clips too thin.
5. **Structure:**
   - A hook in the first 2 s.
   - **Three knowledge beats:** (a) one real, modest fact, (b) WHY it happens (the mechanism), (c) a practical how-to tip plus a bonus habit tip. The clip should feel genuinely informative, not just an ad.
   - The fact uses Use hedged wording such as "บางงานวิจัย…" or "ช่วยให้…". Make no medical cure claims, and add a small source line when citing a study.
   - A product reveal with 2–3 benefit chips.
   - A clear CTA to the basket: "ตะกร้าด้านล่าง".
6. **End card:** show the product name plus "อยู่ในตะกร้าด้านล่าง". **Never tease a next episode.**
7. **Price wording:** keep it vague and safe, such as "ราคาหลักร้อย", "ราคาไม่แพง" or "ราคาสบายกระเป๋า". Never state exact prices.
8. **Audio:** narration must be clearly louder than the music. `voice.py` prints "ตอนพูด: เสียงพูดดังกว่าเพลง X dB", and X must be ≥ 18. Keep the default mix settings.
9. **Layout:** subtitles sit at about y=1560–1640. Keep scene text out of y > 1450 and away from the subtitles. The Shopee UI covers the bottom ~250 px and the right edge.

## Steps
1. Get today's date and set `D` to it in DD.MM.YYYY format, for example `21.11.2026`. If `registry.days[D]` already has 10 entries, stop and report that today is already done. If it has fewer, continue from where it left off.
2. Plan 10 episodes: format, product, fact, cast and music style. Numbers continue from `registry.next_ep`. Folder name: `clips/epNN-<english-slug>`.
3. For each episode, do the following. A subagent per episode helps keep context small; run at most 2 at a time because rendering is CPU-heavy.
   a. Write `script.json`. Follow the schema of the existing files: `title`, `series`, `product`, `intro`, `gap`, `outro`, `cast`, `music`, `lines[who, scene, text, hl]` and `sfx`.
      - Use 10–12 lines.
      - Voices: `th-TH-NiwatNeural` (male) and `th-TH-PremwadeeNeural` (female). Vary them with rate, pitch and fx.
      - Music styles: scifi, noir, doc, news, quiz, chip, funk, horror, workout, drama. You may add a new style function to `tools/voice.py`, but don't change the existing ones.
      - Sfx kinds are listed in `voice.py` `sfx()`.
   b. Run `python tools/voice.py clips/<ep>` from the project root.
      - If it says "สร้างเสียงไม่ได้ (ลองเปลี่ยนคำ)", reword that line, delete that line's wav in `voice/`, and rerun.
      - Never give one character two different voices.
   c. Write `scenes.js` from scratch for this episode. Set `window.EP = {font, scenes, camera, sub, intro, overlay, post?, outro, outroGap, endCard}`.
      - Each line's `scene` key needs a function.
      - Draw everything with canvas. Use the core helpers: rr, circ, ell, poly, fs, line, curve, txt, star, rays, speedLines, grain, vignette, mouthFor, blink, boil, prog, E, lerp, hash, bgFill.
      - Fonts: K (Kanit), Sri, Chon, Itim, Mitr, Bai, Charm, Pattaya, Mali, Trirong, Kod, Sri2.
   d. Run `python tools/preview.py clips/<ep> <scratch>.jpg`, then **look at the image**.
      - Fix overlaps, characters drawn behind props, empty scenes, text over subtitles, and anything off-screen.
      - Repeat until it looks clean.
   e. Run `node tools/render.js clips/<ep>`. It produces `clips/<ep>/<ep>.mp4`.
4. Copy all 10 mp4s to `พร้อมโพสต์/D/`. Also write `พร้อมโพสต์/D/แคปชั่น.txt` with one block per clip:
   - the file name,
   - a 1–2 line Thai caption with a hook and the product,
   - 5–8 hashtags, such as #โต๊ะคอม #ของมันต้องมี #shopee #ป้ายยา.
5. Upload to Google Drive. **Preferred:** run `python3 tools/upload_drive.py พร้อมโพสต์/D D` (use `python` on Windows).
   - It posts each file to the user's Apps Script web app.
   - It needs the env vars `DRIVE_UPLOAD_URL` and `DRIVE_UPLOAD_KEY`.
   - The network must allow `script.google.com` and `script.googleusercontent.com`.
   - It prints the Drive folder link; put that link in the report.

   **Fallback**, only if those env vars are missing, use the Google Drive connector (`create_file`):
   - Find or create a folder titled `D` inside parent `registry.drive_parent_folder_id`. Use `search_files` with `parentId = '<id>' and title = 'D'`. If it doesn't exist, create it with `contentMimeType: application/vnd.google-apps.folder`.
   - Run `python tools/upload_refs.py พร้อมโพสต์/D` to get the file references.
   - Upload each mp4 with `base64Content` set to that reference, `contentMimeType: video/mp4`, `disableConversionToGoogleType: true` and `parentId` set to the day folder.
   - Upload `แคปชั่น.txt` as `text/plain` the same way.
   - If Drive refuses with a permission error or the folder can't be written, keep the local files and say so clearly in the report. That folder belongs to another account and must be shared to this one as Editor.
6. Update `tools/registry.json`:
   - append the formats and products you used,
   - remove used items from the idea pools and add a few fresh ideas,
   - set `days[D]` to the episode list,
   - bump `next_ep`.
7. Final report in Thai: list the 10 clips (format → product), give the Drive folder link, and note anything that failed.

## แนวใหม่ (ตั้งแต่ 23.11.2026): เรื่องยาวสไตล์หัวกลม วันละ 5 คลิป
- โฟลเดอร์ชื่อ `clips/stNNN-<สินค้า>/` — daily_run หยิบ `st*` ก่อนเสมอ ถ้าหมดจึงใช้คลิปสั้นแบบเก่าที่ค้างคิว
- ใช้คลัง `tools/lib/roundhead.js` (RH.person / RH.bg.* / RH.scroll / RH.bubble / RH.bigText / RH.basket ...)
- ซับ `sub:{mode:'words', y:1330}` ขึ้นทีละคำตามเสียง (voice.py เก็บจังหวะคำใน timeline)
- เรื่อง 13-17 ประโยค ยาว ~50-75 วิ: ปมปัญหา → ความรู้ (ทำไม) → เคล็ดลับ 2-3 ข้อ → คลี่คลาย → "<สินค้า> อยู่ในตะกร้าด้านล่าง"
- ทุกตอนต้องมีเรื่อง ตัวละคร ฉาก และลูกเล่นป้ายบอกเวลาไม่ซ้ำกัน
- ข้อความ/ของสำคัญอยู่ในโซน x 140-880, y 200-1450 (กันปุ่มของแอปบัง) ห้ามใช้อีโมจิ/สัญลักษณ์พิเศษ (คลาวด์ไม่มีฟอนต์)

## อัปเดต 25.11.2026: เรื่องยาว 80-120 วิ วันละ 3 คลิป + ตัวเล่าเรื่องแบบ JSON
- ตอนใหม่เขียนฉากทั้งหมดใน `script.json` (shot / act / pop / banner / fx) แล้ว `scenes.js` มีแค่ `window.EP = STORY.make({props:{...ของเฉพาะตอน}})` — ดูวิธีใช้หัวไฟล์ `tools/lib/story.js`
- เสียงพากย์: ใช้ชื่อเล่นใน cast (`@narrator`, `@male2`, `@male3`, `@female`, `@female2`, `@female3`) จริง ๆ กำหนดใน `tools/voices.json` ที่เดียว
- เสียงไทยผู้หญิง th-TH-PremwadeeNeural ถูกปิดแล้ว (ไม่มีเสียงออก) — voices.json แมปไปเป็น en-US-EmmaMultilingualNeural ที่อ่านไทยได้
- ห้ามดัดเสียง (pitch จำกัด ±6Hz, rate ±10%) เพราะฟังเป็น AI
- daily_run: ถ้าตอนไหนพัง จะหยิบตอนถัดไปมาแทนให้ครบจำนวน; บิตเรตวิดีโอจำกัด 2.2M ให้ไฟล์เล็กพออัปผ่าน Apps Script
- ในฉากห้ามตั้งชื่อตัวแปรระดับบนสุดว่า OL (ชนกับ core.html) ใช้ INK แทน
