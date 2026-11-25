// ตัวเล่าเรื่องแบบเขียนใน script.json อย่างเดียว (โหลดอัตโนมัติจาก core.html หลัง roundhead.js)
// scenes.js ของตอนเขียนแค่:  window.EP = STORY.make({ props: { ...ของเฉพาะตอน } });
// บรรทัดใน script.json:
//   "shot": {"bg":"office", "cast":[["ton",300,1000,1,"stand","happy",{...}]], "props":[["lamp",200,1180,1]], "fx":["confetti"], "cam":"push"}
//     -> ขึ้นฉากใหม่ (ไม่มี shot = ใช้ฉากเดิมต่อ)
//   "act": {"ton":"cheer/happy"}    เปลี่ยนท่า/หน้าในฉากเดิม
//   "pop": [["bubble","ข้อความ",x,y,0.2,{..}], ["big","ข้อความ",x,y,0.5,{col}], ["mark","ok",x,y,0.6], ["note","#ff8fc1","ข้อความ",x,y,0.3]]
//   "banner": ["scroll","วันที่ 1"] | ["stamp","ครั้งที่ 2"] | ["calendar","7"] | ["tag","3 ชั่วโมงต่อมา"]
//   "fx": [...] เพิ่มเอฟเฟกต์เฉพาะประโยค
const STORY = (() => {
  const K = '#151515', P = (b, o) => Object.assign({}, b, o);
  const lw = (w, c = K) => { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; };
  const fs = (fill, w = 7) => { if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (w) { lw(w); ctx.stroke(); } };
  const rect = (x, y, w, h, r, fill, w2 = 7) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); fs(fill, w2); };
  const dot = (x, y, r, fill, w2 = 0) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); fs(fill, w2); };
  const glow = (x, y, r, col) => { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); };
  const sky = (a, b) => { ctx.fillStyle = RH.g(0, H, a, b); ctx.fillRect(-300, -300, W + 600, H + 600); };
  const stars = (n = 60, h = 1200) => { for (let i = 0; i < n; i++) { const tw = (Math.sin(T * 2 + i * 1.3) + 1) / 2; dot(hash(i) * W, hash(i * 2.1) * h, 2 + tw * 2.5, `rgba(255,255,255,${0.35 + tw * 0.6})`); } };
  const moon = (x, y, r) => { ctx.save(); ctx.shadowColor = 'rgba(255,240,180,0.8)'; ctx.shadowBlur = 60; dot(x, y, r, '#fff2b8'); ctx.restore(); dot(x - r * 0.3, y + r * 0.2, r * 0.18, 'rgba(220,200,140,0.5)'); dot(x + r * 0.3, y - r * 0.3, r * 0.12, 'rgba(220,200,140,0.5)'); };
  const floor = (y, col) => { ctx.fillStyle = col; ctx.fillRect(-300, y, W + 600, H - y + 400); };
  const win = (x, y, w, h, inner) => { ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.clip(); inner(); ctx.restore(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); lw(10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); lw(8); ctx.stroke(); };
  const skyline = (y, col, lit) => { for (let i = 0; i < 14; i++) { const h = 160 + hash(i * 3.3) * 380, x = i * 82 - 30; ctx.fillStyle = col; ctx.fillRect(x, y - h, 74, h); if (lit) for (let r = 0; r < h / 40; r++) for (let c = 0; c < 2; c++) if (hash(i * 9 + r * 3 + c) > 0.55) { ctx.fillStyle = '#ffd87a'; ctx.fillRect(x + 12 + c * 30, y - h + 14 + r * 40, 16, 20); } } };

  // ---------------- ฉากหลัง ----------------
  const BG = {
    office: () => RH.bg.office({}), officeNight: () => RH.bg.office({night: true}), meadow: () => RH.bg.meadow(), park: () => RH.bg.meadow(),
    sunset: () => { RH.bg.meadow(); ctx.fillStyle = 'rgba(255,120,60,0.3)'; ctx.fillRect(0, 0, W, H); },
    room: (w = '#ffe7c4', f = '#d39a66') => RH.bg.room({wall: w, floor: f}),
    studio: (a = '#ffd166', b = '#ffb703') => RH.bg.studio(a, b),
    beachNight: () => RH.bg.beachNight(),
    dark: () => { bgFill('#12142b'); for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(255,255,255,0.025)'; ctx.fillRect(i * 140, 0, 70, 1160); } floor(1160, '#0b0c1d'); },
    bedroom: () => { ctx.fillStyle = '#2c2a63'; ctx.fillRect(-300, -300, W + 600, H + 600); for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fillRect(i * 100, 0, 50, 1180); }
      win(560, 330, 360, 400, () => { sky('#1a1446', '#4b2e83'); stars(30, 800); moon(800, 450, 70); }); floor(1180, '#1d1b45'); },
    storm: () => { sky('#1b1030', '#3b2160'); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(((i * 300 + T * 25) % 1500) - 200, 380 + (i % 2) * 90, 220, 70, 0, 0, Math.PI * 2); ctx.fillStyle = '#2b1a4a'; ctx.fill(); }
      if ((T % 3.2) < 0.12) { ctx.fillStyle = 'rgba(230,220,255,0.6)'; ctx.fillRect(0, 0, W, H); } },
    stage: () => { bgFill('#2a1630'); for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#b0213a' : '#8c1830'; ctx.fillRect(i * 140 - 20, 0, 140, 1200); } floor(1180, '#6b3e26');
      ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.beginPath(); ctx.moveTo(470, 0); ctx.lineTo(200, 1250); ctx.lineTo(800, 1250); ctx.lineTo(570, 0); ctx.fillStyle = 'rgba(255,240,180,0.3)'; ctx.fill(); ctx.restore();
      for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(80 + i * 130, 1470, 70, Math.PI, 0); ctx.fillStyle = '#140a18'; ctx.fill(); } },
    street: (night) => { sky(night ? '#141a44' : '#7fc4ff', night ? '#3a3f7a' : '#d8efff'); if (night) stars(40, 700); else RH.clouds(300, 4, 10); skyline(1080, night ? '#1f2550' : '#a9c4dc', night);
      floor(1080, '#9aa0ab'); ctx.fillStyle = '#4a4f5a'; ctx.fillRect(-300, 1180, W + 600, 300); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#fff'; ctx.fillRect(((i * 220 - T * 40) % 1320) - 120, 1320, 120, 16); } floor(1480, '#b8bcc4');
      for (const x of [140, 900]) { ctx.fillStyle = '#555'; ctx.fillRect(x - 8, 760, 16, 330); dot(x, 760, 26, night ? '#fff6c0' : '#ddd', 6); if (night) glow(x, 780, 260, 'rgba(255,240,170,0.35)'); } },
    cafe: () => { RH.bg.room({wall: '#f3e1c7', floor: '#8a5a3c'}); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(180 + i * 240, 0); ctx.lineTo(180 + i * 240, 260); lw(4); ctx.stroke(); dot(180 + i * 240, 290, 34, '#ffd66b', 6); glow(180 + i * 240, 300, 220, 'rgba(255,220,140,0.3)'); }
      rect(120, 420, 780, 150, 16, '#2f3b33', 8); ['ลาเต้ 55', 'อเมริกาโน่ 45', 'ชาเย็น 40'].forEach((t, i) => txt(t, 250 + i * 260, 495, 34, '#fff', {f: 'K', w: 700})); },
    classroom: () => { RH.bg.room({wall: '#e8f4e0', floor: '#c9a27a'}); rect(110, 330, 800, 440, 12, '#2f5d46', 12); ctx.fillStyle = '#8b5a3c'; ctx.fillRect(110, 770, 800, 22);
      for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(180, 410 + i * 70); ctx.lineTo(180 + 200 + hash(i) * 400, 410 + i * 70); lw(6, 'rgba(255,255,255,0.6)'); ctx.stroke(); } },
    kitchen: () => { RH.bg.room({wall: '#d6f5e3', floor: '#e8c9a0'}); for (let i = 0; i < 6; i++) rect(120 + i * 140, 380, 110, 110, 12, '#bfe9d3', 0); rect(80, 980, 860, 200, 10, '#f4f4f4', 8); },
    shop: () => { RH.bg.room({wall: '#cfe9ff', floor: '#9aa7b8'}); for (let r = 0; r < 3; r++) { ctx.fillStyle = '#8b5a3c'; ctx.fillRect(120, 470 + r * 170, 780, 16); for (let i = 0; i < 7; i++) rect(140 + i * 108, 370 + r * 170, 60, 100, 10, ['#ff6b6b', '#3ec1d3', '#ffd23f', '#7bd389', '#7b5cff'][(i + r) % 5], 5); } },
    beach: () => { sky('#5ec8ff', '#d8f3ff'); RH.clouds(320, 4, 8); const s = ctx.createRadialGradient(820, 260, 10, 820, 260, 260); s.addColorStop(0, '#fff6b0'); s.addColorStop(1, 'rgba(255,246,176,0)'); ctx.fillStyle = s; ctx.fillRect(500, 0, 600, 600); dot(820, 260, 80, '#ffe066');
      ctx.fillStyle = RH.g(980, 1200, '#2fa4e7', '#1f7fc2'); ctx.fillRect(-300, 980, W + 600, 220); for (let i = 0; i < 4; i++) { ctx.beginPath(); for (let x = -50; x <= W + 50; x += 20) ctx.lineTo(x, 1010 + i * 45 + Math.sin(x * 0.02 + T * 2 + i) * 6); lw(4, 'rgba(255,255,255,0.5)'); ctx.stroke(); } floor(1180, '#f4dc9c'); },
    cityNight: () => { sky('#0f1a44', '#3c3a7a'); stars(50, 800); moon(820, 300, 70); skyline(1200, '#1a2148', true); floor(1200, '#232742'); },
    dream: () => { sky('#3a2a7a', '#ff9ad5'); stars(80, 1900); for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = 0.4; dot(((i * 260 + T * 20) % 1300) - 100, 400 + (i % 3) * 400, 90, '#fff'); ctx.restore(); } },
    space: () => { bgFill('#070b22'); stars(120, 1920); dot(260, 1500, 300, '#5b6cff', 0); dot(220, 1450, 300, '#7b8cff', 0); },
  };
  function bg(spec) { const [n, ...a] = String(spec || 'studio').split(':'); (BG[n] || BG.studio)(...a); }

  // ---------------- ของประกอบฉาก ----------------
  const PROPS = {
    desk: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); RH.desk(0, 0, o.w || 760, {lx: o.lx ?? 230, screen: o.screen || '#bfe6ff', laptop: o.laptop, text: o.text}); ctx.restore(); },
    table: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(-260, 0, 520, 30, 8, o.col || '#a8703f'); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 220, 30); ctx.lineTo(sd * 220, 220); lw(10); ctx.stroke(); } ctx.restore(); },
    chair: (x, y, s) => RH.chair(x, y, s),
    cup: (x, y, s, o) => RH.cup(x, y, s, o.steam !== false),
    lamp: (x, y, s, o) => { const on = o.on !== false; ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
      if (on) { ctx.save(); ctx.globalAlpha = 0.5; const g = ctx.createRadialGradient(150, -250, 10, 150, 0, 520); g.addColorStop(0, 'rgba(255,236,160,0.95)'); g.addColorStop(1, 'rgba(255,236,160,0)'); ctx.beginPath(); ctx.moveTo(110, -250); ctx.lineTo(-120, 120); ctx.lineTo(560, 120); ctx.lineTo(210, -250); ctx.closePath(); ctx.fillStyle = g; ctx.fill(); ctx.restore(); }
      ctx.beginPath(); ctx.ellipse(0, 0, 90, 22, 0, 0, Math.PI * 2); fs(o.col || '#ff6b6b'); ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(-40, -200); ctx.lineTo(120, -300); lw(16); ctx.stroke(); lw(8, o.col || '#ff6b6b'); ctx.stroke();
      ctx.save(); ctx.translate(120, -300); ctx.rotate(0.5); ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(50, 0); ctx.lineTo(90, 90); ctx.lineTo(-90, 90); ctx.closePath(); fs(o.col || '#ff6b6b'); ctx.beginPath(); ctx.ellipse(0, 92, 88, 14, 0, 0, Math.PI * 2); fs(on ? '#fff6c0' : '#bbb', 6); ctx.restore(); ctx.restore(); },
    phone: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0); rect(-110, -200, 220, 400, 34, '#222', 8); rect(-94, -180, 188, 360, 22, o.col || '#4fb3ff', 0);
      if (o.icon === 'heart') { ctx.save(); ctx.translate(0, -10); ctx.scale(3, 3); heartPath(); ctx.fillStyle = '#ff3b6b'; ctx.fill(); ctx.restore(); } if (o.text) txt(o.text, 0, 0, o.ts || 46, o.tc || '#fff', {f: 'K', w: 800}); if (o.glow) glow(0, 0, 420, 'rgba(120,200,255,0.35)'); ctx.restore(); },
    clock: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(-130, -64, 260, 128, 24, '#222', 8); ctx.font = '800 84px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = o.col || '#ff5f5f'; ctx.shadowBlur = 20; ctx.fillStyle = o.col || '#ff5f5f'; ctx.fillText(o.text || '00:00', 0, 6); ctx.restore(); },
    alarm: (x, y, s, o) => { const ring = o.ring; ctx.save(); ctx.translate(x + (ring ? Math.sin(T * 60) * 6 : 0), y); ctx.scale(s, s); for (const sd of [-1, 1]) dot(sd * 80, -100, 40, '#ffd23f', 8); dot(0, 0, 130, '#e63946', 8); dot(0, 0, 100, '#fff', 8);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -70); ctx.moveTo(0, 0); ctx.lineTo(50, 0); lw(10); ctx.stroke(); ctx.restore(); },
    battery: (x, y, s, o) => { const pct = o.pct ?? 50, col = o.col || (pct < 20 ? '#e74c3c' : '#2ecc71'); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(-110, -55, 220, 110, 18, '#fff', 10); rect(112, -22, 20, 44, 6, K, 0); rect(-98, -43, Math.max(8, 196 * pct / 100), 86, 10, col, 0);
      ctx.font = '800 56px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; lw(10); ctx.strokeText(pct + '%', 0, 4); ctx.fillStyle = '#fff'; ctx.fillText(pct + '%', 0, 4); ctx.restore(); },
    note: (x, y, s, o) => note(x, y, s, o.col || '#ffe15c', o.text || '', o.rot || 0, 1),
    monitor: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#555'; ctx.fillRect(-20, 150, 40, 90); rect(-110, 230, 220, 24, 10, '#555', 0); rect(-260, -170, 520, 330, 20, '#333', 9); rect(-240, -150, 480, 290, 12, o.screen || '#c9ecff', 0); if (o.text) txt(o.text, 0, 0, o.ts || 44, o.tc || '#234', {f: 'K', w: 800}); ctx.restore(); },
    bed: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(-380, -260, 60, 360, 20, '#8b5a3c', 8); rect(-360, -40, 740, 110, 20, '#a46a46', 8); ctx.beginPath(); ctx.ellipse(-230, -70, 120, 50, 0, 0, Math.PI * 2); fs('#fff', 8);
      if (o.who && LOOKS[o.who]) RH.head(-230, -150, 0.6, P(LOOKS[o.who], {face: o.face || 'sleepy'})); ctx.beginPath(); ctx.moveTo(-120, -110); ctx.quadraticCurveTo(100, -150, 380, -90); ctx.lineTo(380, 0); ctx.lineTo(-130, 0); ctx.closePath(); fs(o.col || '#5ec8ff', 8); ctx.restore(); },
    plant: (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = -2; i <= 2; i++) { ctx.save(); ctx.rotate(i * 0.35 + Math.sin(T * 1.5 + i) * 0.04); ctx.beginPath(); ctx.ellipse(0, -110, 26, 90, 0, 0, Math.PI * 2); fs('#5cb85c', 6); ctx.restore(); } ctx.beginPath(); ctx.moveTo(-70, -20); ctx.lineTo(70, -20); ctx.lineTo(50, 90); ctx.lineTo(-50, 90); ctx.closePath(); fs('#e07a5f', 7); ctx.restore(); },
    box: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(-150, -110, 300, 220, 14, o.col || '#f4c27a', 8); ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(-20, -110, 40, 220); if (o.text) txt(o.text, 0, 30, o.ts || 40, K, {f: 'K', w: 800}); ctx.restore(); },
    bin: (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-110, -130); ctx.lineTo(110, -130); ctx.lineTo(80, 120); ctx.lineTo(-80, 120); ctx.closePath(); fs('#7d8597', 8); ctx.restore(); },
    sofa: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(-320, -200, 640, 180, 50, o.col || '#5b7cfa', 8); rect(-360, -60, 720, 140, 40, o.col || '#5b7cfa', 8); for (const sd of [-1, 1]) rect(sd * 340 - 50, -140, 100, 220, 40, o.col || '#5b7cfa', 8); ctx.restore(); },
    tv: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(-300, -190, 600, 380, 20, '#222', 9); rect(-280, -170, 560, 340, 10, o.screen || '#7fd3ff', 0); if (o.text) txt(o.text, 0, 0, 56, '#fff', {f: 'K', w: 800}); ctx.fillStyle = '#444'; ctx.fillRect(-100, 190, 200, 20); ctx.restore(); },
    coin: (x, y, s) => { ctx.save(); ctx.translate(x, y + Math.sin(T * 4 + x) * 10); ctx.scale(s * Math.abs(Math.cos(T * 3 + x)) + 0.1, s); dot(0, 0, 60, '#ffd23f', 8); txt('฿', 0, 4, 64, '#b8860b', {f: 'K', w: 800}); ctx.restore(); },
    trophy: (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-90, -160); ctx.lineTo(90, -160); ctx.quadraticCurveTo(90, 0, 0, 10); ctx.quadraticCurveTo(-90, 0, -90, -160); fs('#ffd23f', 8); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 100, -110, 36, sd > 0 ? -1.5 : 1.6, sd > 0 ? 1.5 : 4.7, sd < 0); lw(10); ctx.stroke(); } rect(-20, 10, 40, 60, 4, '#d4a017', 6); rect(-80, 70, 160, 40, 8, '#8b5a3c', 7); ctx.restore(); },
    bag: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, -90, 50, Math.PI, 0); lw(12); ctx.stroke(); rect(-110, -90, 220, 200, 24, o.col || '#c0703a', 8); ctx.restore(); },
    window: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); win(-200, -220, 400, 440, () => { o.night ? (sky('#1a1446', '#4b2e83'), stars(20, 600)) : (sky('#7fc4ff', '#d8efff'), RH.clouds(-60, 2, 8)); if (o.rain) rain(0.6); }); ctx.restore(); },
    sheep: (x, y, s, o) => sheep(x, y, s, o),
    bowl: (x, y, s, o) => bowl(x, y, s, o),
    basket: (x, y, s) => RH.basket(x, y, s),
    band: (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 150, 90, 0.3, 0, Math.PI * 2); lw(46); ctx.stroke(); lw(34, '#ff7a1a'); ctx.stroke(); ctx.restore(); },
    specs: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.roundRect(sd * 95 - 75, -50, 150, 100, 36); fs(o.tint || 'rgba(255,190,80,0.45)', 14); } ctx.beginPath(); ctx.moveTo(-20, -10); ctx.quadraticCurveTo(0, -30, 20, -10); lw(12); ctx.stroke(); ctx.restore(); },
  };
  function heartPath() { ctx.beginPath(); ctx.moveTo(0, 12); ctx.bezierCurveTo(-30, -8, -14, -30, 0, -14); ctx.bezierCurveTo(14, -30, 30, -8, 0, 12); }
  function note(x, y, s, col, label, rot = 0, k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * E.back(k), s * E.back(k)); RH.shade(() => { ctx.fillStyle = col; ctx.fillRect(-90, -90, 180, 180); }, 16, 0.25, 8);
    lw(6); ctx.strokeRect(-90, -90, 180, 180); ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(-90, -90, 180, 34); if (label) { ctx.font = `800 ${label.length > 6 ? 30 : 40}px K`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = K; ctx.fillText(label, 0, 14); } ctx.restore(); }
  function sheep(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s); for (const sd of [-60, -20, 30, 70]) { ctx.beginPath(); ctx.moveTo(sd, 40); ctx.lineTo(sd, 120); lw(12); ctx.stroke(); }
    const pf = [[-80, 0], [-40, -40], [10, -50], [60, -30], [80, 10], [40, 40], [-20, 45], [-70, 35], [0, 0]]; for (const [a, b] of pf) dot(a, b, 46, K); for (const [a, b] of pf) dot(a, b, 40, '#fff');
    ctx.save(); ctx.translate(110, -40); ctx.beginPath(); ctx.ellipse(0, 0, 52, 62, 0.2, 0, Math.PI * 2); fs('#4a4458'); for (const sd of [-1, 1]) dot(sd * 18, -6, 7, '#fff'); if ((o.mouth || 0) > 0.1) { ctx.beginPath(); ctx.ellipse(0, 26, 10, 4 + o.mouth * 12, 0, 0, Math.PI * 2); fs('#7a1f2a', 0); } ctx.restore(); ctx.restore(); }
  function bowl(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, 0, 170, -2.6, -0.54, true); ctx.closePath(); ctx.fillStyle = 'rgba(140,210,255,0.45)'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, 170, -2.4, -0.74, true); lw(9); ctx.stroke();
    ctx.save(); ctx.translate(Math.sin(T * 1.4) * 30, 10 - (o.jump ? Math.abs(Math.sin(T * 6)) * 60 : 0)); ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(120, -40); ctx.lineTo(120, 40); ctx.closePath(); fs('#ff8c1a', 6); ctx.beginPath(); ctx.ellipse(0, 0, 76, 56, 0, 0, Math.PI * 2); fs('#ff9f1c', 6);
    dot(-34, -8, 14, '#fff', 4); dot(-38, -8, 7, K); if ((o.mouth || 0) > 0.1) { ctx.beginPath(); ctx.ellipse(-56, 18, 8, 3 + o.mouth * 10, 0, 0, Math.PI * 2); fs('#7a1f2a', 0); } ctx.restore(); ctx.beginPath(); ctx.ellipse(0, 150, 110, 22, 0, 0, Math.PI * 2); fs('#c9a26b', 5); ctx.restore(); }
  // สัตว์หัวกลม: แมว / หมา (ใช้ร่างคนแต่ใส่หู)
  function animal(x, y, s, look, o) { RH.person(x, y, s, P(look, o)); const ears = look.kind === 'cat' ? 'cat' : 'dog'; ctx.save(); ctx.translate(x, y - 80 * s); ctx.scale(s * (o.flip ? -1 : 1), s);
    for (const sd of [-1, 1]) { ctx.beginPath(); if (ears === 'cat') { ctx.moveTo(sd * 60, -110); ctx.lineTo(sd * 110, -190); ctx.lineTo(sd * 120, -70); } else ctx.ellipse(sd * 120, -40, 34, 80, sd * 0.4, 0, Math.PI * 2); ctx.closePath(); fs(look.earCol || look.skin || '#fff', 8); }
    ctx.restore(); }

  // ---------------- เอฟเฟกต์ ----------------
  function rain(a = 1) { ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < 90; i++) { const x = (hash(i) * 1200 + T * 80) % 1200 - 60, y = (hash(i * 3) * 2000 + T * 1400) % 2000 - 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + 40); lw(3, 'rgba(200,225,255,0.7)'); ctx.stroke(); } ctx.restore(); }
  const FX = {
    confetti: () => RH.confetti(60), rain: () => rain(), snow: () => { for (let i = 0; i < 70; i++) dot((hash(i) * W + Math.sin(T + i) * 40) % W, (hash(i * 2) * 2000 + T * 120) % 2000 - 40, 4 + hash(i * 5) * 6, 'rgba(255,255,255,0.9)'); },
    zzz: (x = 600, y = 800) => RH.zzz(+x, +y), sparkle: (x = 540, y = 800, r = 220) => RH.sparkle(+x, +y, +r, 8),
    hearts: (x = 540, y = 800) => { for (let i = 0; i < 6; i++) { const ph = (T * 0.6 + i / 6) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; ctx.translate(+x + Math.sin(i * 2 + T * 2) * 120, +y - ph * 400); ctx.scale(2, 2); heartPath(); ctx.fillStyle = '#ff5f8f'; ctx.fill(); ctx.restore(); } },
    dim: (a = 0.4) => { ctx.fillStyle = `rgba(5,5,20,${a})`; ctx.fillRect(0, 0, W, H); }, tint: (c = '#ff7a3c', a = 0.25) => { ctx.save(); ctx.globalAlpha = +a; ctx.fillStyle = c; ctx.fillRect(0, 0, W, H); ctx.restore(); },
    speed: () => { for (let i = 0; i < 26; i++) { const a = hash(i) * Math.PI * 2, r0 = 520 + ((T * 900 + hash(i * 3) * 600) % 600); ctx.beginPath(); ctx.moveTo(540 + Math.cos(a) * r0, 900 + Math.sin(a) * r0); ctx.lineTo(540 + Math.cos(a) * (r0 + 200), 900 + Math.sin(a) * (r0 + 200)); lw(6, 'rgba(255,255,255,0.7)'); ctx.stroke(); } },
    lightning: () => { if ((T % 2.6) < 0.15) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.moveTo(700, 250); ctx.lineTo(640, 470); ctx.lineTo(700, 470); ctx.lineTo(620, 720); lw(12, '#fff'); ctx.stroke(); } },
    screenglow: (x = 760, y = 1050) => glow(+x, +y, 600, 'rgba(120,200,255,0.5)'), warm: (x = 300, y = 1000) => glow(+x, +y, 700, 'rgba(255,214,140,0.45)'),
    coins: () => { for (let i = 0; i < 8; i++) PROPS.coin(120 + i * 120, ((hash(i) * 1500 + T * 420) % 1500) + 200, 0.5); },
    sweat: (x = 540, y = 700) => { for (let i = 0; i < 3; i++) { const ph = (T * 1.2 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; ctx.translate(+x + (i - 1) * 90, +y + ph * 80); ctx.beginPath(); ctx.moveTo(0, -20); ctx.quadraticCurveTo(16, 10, 0, 16); ctx.quadraticCurveTo(-16, 10, 0, -20); fs('#9fe3ff', 5); ctx.restore(); } },
    vignette: () => vignette(0.5),
  };
  function doFx(list) { for (const f of list || []) { const [n, ...a] = String(f).split(':'); if (FX[n]) FX[n](...a); } }

  // ---------------- ป้าย/ข้อความเด้ง ----------------
  function mark(x, y, ok, k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(E.back(k), E.back(k)); dot(0, 0, 54, ok ? '#2ecc71' : '#e74c3c', 8); ctx.beginPath(); if (ok) { ctx.moveTo(-24, 0); ctx.lineTo(-6, 20); ctx.lineTo(26, -18); } else { ctx.moveTo(-20, -20); ctx.lineTo(20, 20); ctx.moveTo(20, -20); ctx.lineTo(-20, 20); } lw(12, '#fff'); ctx.stroke(); ctx.restore(); }
  function stamp(t, k, x = 510, y = 470) { if (k <= 0) return; const s = lerp(2.6, 1, E.out(k)); ctx.save(); ctx.translate(x, y); ctx.rotate(-0.12); ctx.scale(s, s); ctx.globalAlpha = Math.min(1, k * 2);
    ctx.font = '800 96px K'; const w = Math.max(380, ctx.measureText(t).width + 100); rect(-w / 2, -85, w, 170, 24, 'rgba(255,255,255,0.92)', 0); ctx.beginPath(); ctx.roundRect(-w / 2, -85, w, 170, 24); lw(14, '#d62828'); ctx.stroke();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#d62828'; ctx.fillText(t, 0, 8); ctx.restore(); }
  function calendar(n, lt, x = 510, y = 560) { const k = prog(lt, 0.05, 0.5); if (k <= 0) return; const flip = E.out(prog(lt, 0.3, 0.8)); ctx.save(); ctx.translate(x, y); ctx.scale(E.back(k), E.back(k)); ctx.rotate(0.04);
    rect(-200, -200, 400, 400, 30, '#fff', 10); ctx.save(); ctx.beginPath(); ctx.roundRect(-200, -200, 400, 400, 30); ctx.clip(); ctx.fillStyle = '#e63946'; ctx.fillRect(-200, -200, 400, 110); ctx.restore(); ctx.beginPath(); ctx.roundRect(-200, -200, 400, 400, 30); lw(10); ctx.stroke();
    for (const sd of [-1, 1]) rect(sd * 110 - 14, -230, 28, 70, 14, '#555', 7); txt('วันที่', 0, -142, 56, '#fff', {f: 'K', w: 800}); ctx.font = '800 170px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = K; ctx.fillText(String(n), 0, 70);
    if (flip < 1) { ctx.save(); ctx.beginPath(); ctx.rect(-200, -90, 400, 290); ctx.clip(); ctx.translate(0, -90); ctx.scale(1, 1 - flip); ctx.fillStyle = '#f4f4f4'; ctx.fillRect(-200, 0, 400, 290); lw(6); ctx.strokeRect(-200, 0, 400, 290); ctx.restore(); } ctx.restore(); }
  function banner(b, lt) { if (!b || lt > 1.9) return; const out = 1 - prog(lt, 1.5, 1.9); ctx.save(); ctx.globalAlpha = out; const [type, t] = b;
    if (type === 'scroll') RH.scroll(t, prog(lt, 0.05, 0.6), 460); else if (type === 'stamp') stamp(t, prog(lt, 0.05, 0.35)); else if (type === 'calendar') calendar(t, lt);
    else RH.bubble(t, 510, 470, prog(lt, 0.05, 0.3), {size: 64, fill: '#ffe15c'}); ctx.restore(); }
  function pops(list, t, dur) { for (const p of list || []) { const [type, a, x, y, at = 0, o = {}] = p; const k = prog(t, dur * at, dur * at + 0.3); if (k <= 0) continue;
    if (type === 'bubble') RH.bubble(a, x, y, k, Object.assign({size: 52}, o)); else if (type === 'big') { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); let sz = o.size || 110; ctx.font = `800 ${sz}px K`; sz = Math.min(sz, sz * 740 / ctx.measureText(a).width); RH.bigText(a, 0, 0, sz, o.col || '#ffd23f', k); ctx.restore(); }
    else if (type === 'mark') mark(x, y, a === 'ok', k); else if (type === 'note') note(x, y, o.s || 1, a, o.text || '', o.rot || 0, k);
    else if (type === 'prop') { const fn = PROPS[a]; if (fn) { ctx.save(); ctx.translate(x, y); ctx.scale(E.back(k), E.back(k)); fn(0, 0, o.s || 1, o); ctx.restore(); } } } }

  // ---------------- ประกอบฉาก ----------------
  let LOOKS = {};
  const talk = (ln, id) => (ln.who === id ? 0.3 + 0.7 * Math.abs(Math.sin(T * 17)) : 0);
  function drawCast(list, ln, acts, lt) {
    for (const c of list || []) { const [id, x0, y, s = 1, pose = 'stand', face = 'neutral', o = {}] = c; const look = LOOKS[id] || {};
      let [ps, fc] = [pose, face]; if (acts[id]) { const [a, b] = acts[id].split('/'); ps = a || ps; fc = b || fc; }
      let x = x0; if (o.walk) { x = lerp(o.walk[0], o.walk[1], E.inOut(prog(lt, o.walkAt || 0, (o.walkAt || 0) + (o.walkDur || 2.5)))); }
      if (o.enter) x = lerp(o.enter === 'left' ? -250 : 1330, x0, E.out(prog(lt, 0, 0.6)));
      const opt = P(look, P(o, {pose: ps, face: fc, mouth: talk(ln, id)})); delete opt.walk; delete opt.enter;
      if (look.kind === 'sheep') sheep(x, y, s, opt); else if (look.kind === 'fish') bowl(x, y, s, opt); else if (look.kind === 'cat' || look.kind === 'dog') animal(x, y, s, look, opt); else RH.person(x, y, s, opt); } }
  function drawProps(list, layer) { for (const p of list || []) { const [n, x, y, s = 1, o = {}] = p; if ((o.front ? 'front' : 'back') !== layer) continue; const fn = PROPS[n]; if (fn) fn(x, y, s, o); } }

  function make(extra = {}) {
    Object.assign(PROPS, extra.props || {}); Object.assign(BG, extra.bgs || {}); LOOKS = TL.looks || {}; const th = TL.theme || {};
    const scenes = {}, shotOf = {}; let cur = null;
    const bad3 = {}; let use3d = typeof S3 !== 'undefined' && TL.style !== '2d', shots3 = {}, env = {PROPS, LOOKS, talk}; let end3 = null; if (use3d) try { S3.init(); } catch (e) { console.error('3D init fail -> 2D', e && e.message); use3d = false; }
    TL.lines.forEach((ln, i) => { if (ln.shot || !cur) { cur = 's' + i; shotOf[cur] = ln.shot || {bg: 'studio'}; } ln.scene = cur; });
    for (const name in shotOf) { const sh = shotOf[name];
      scenes[name] = (lt, ln) => { const t = T - ln.start;
        if (use3d && !bad3[name]) try { if (!shots3[name]) { shots3[name] = S3.build(sh, Object.keys(shotOf).indexOf(name), env); shots3[name].camMode = sh.cam; }
          ctx.save(); ctx.drawImage(S3.render(shots3[name], lt, ln, env), 0, 0); doFx(sh.under); if (extra.draw) extra.draw(name, lt, ln);
          doFx(sh.fx); doFx((ln.fx || []).filter(f => f !== 'shake')); pops(ln.pop, t, ln.dur); banner(ln.banner, t); ctx.restore(); return; } catch (e) { console.error('3D scene fail -> 2D', name, e && e.message); bad3[name] = 1; ctx.restore(); }
        ctx.save(); const cam = ln.cam || sh.cam || 'push';
        if (cam === 'shake' || (ln.fx || []).includes('shake')) ctx.translate(Math.sin(T * 47) * 8, Math.cos(T * 39) * 6);
        bg(sh.bg); drawProps(sh.props, 'back'); doFx(sh.under); drawCast(sh.cast, ln, ln.act || {}, lt); drawProps(sh.props, 'front'); if (extra.draw) extra.draw(name, lt, ln);
        doFx(sh.fx); doFx((ln.fx || []).filter(f => f !== 'shake')); pops(ln.pop, t, ln.dur); banner(ln.banner, t); ctx.restore(); }; }
    const endBg = th.endBg || ['#ffe08a', '#ffc94a'];
    const productArt = (x, y, s) => { const n = th.productProp; if (n && PROPS[n]) PROPS[n](x, y, s, th.productOpt || {}); else PROPS.box(x, y, s, {text: TL.product, ts: 34}); };
    return {font: 'K', scenes, sceneTime: true, xfade: 0.25,
      sub: Object.assign({mode: 'words', y: 1330, size: 104, chunk: 5, hl: th.hl || '#ffd23f'}, th.sub || {}),
      camera(name, lt, ln) { if (use3d) return; const sh = shotOf[name] || {}, cam = ln.cam || sh.cam || 'push', k = E.out(prog(lt, 0, Math.max(ln.dur, 3))), pk = 1 + 0.04 * (1 - E.out(prog(lt, 0, 0.25)));
        let s = 1, dx = 0; if (cam === 'push') s = 1 + 0.06 * k; else if (cam === 'pull') s = 1.1 - 0.08 * k; else if (cam === 'panL') { s = 1.08; dx = lerp(40, -40, k); } else if (cam === 'panR') { s = 1.08; dx = lerp(-40, 40, k); }
        else if (String(cam).startsWith('zoom')) { const [, zx, zy, zs] = cam.split(':'); const z = 1 + (+zs || 0.5) * E.inOut(prog(lt, 0, 0.6)); ctx.translate(+zx, +zy); ctx.scale(z, z); ctx.translate(-zx, -zy); return; }
        ctx.translate(540 + dx, 960); ctx.scale(s * pk, s * pk); ctx.translate(-540, -960); },
      intro(t) { const first = Object.keys(shotOf)[0]; if (use3d) { scenes[first](0, Object.assign({}, TL.lines[0], {act: {}, pop: [], banner: null, dur: 3})); return; } bg(th.introBg || (TL.lines[0].shot || {}).bg); },
      // หัวเรื่องดึงดูด: โชว์เฉพาะ 3 วินาทีแรก แล้วหายไป (ไม่มีแถบชื่อค้างทั้งคลิป)
      overlay(t, ln) { const hk = th.hook || {}, top = hk.top || th.intro || TL.title, big = hk.big || '', kin = prog(t, 0.1, 0.45), kout = prog(t, 3.0, 3.4); if (kin <= 0 || kout >= 1) return;
        ctx.save(); ctx.globalAlpha = 1 - kout; const sh = t < 0.7 ? Math.sin(t * 30) * 6 : 0, y0 = big ? 430 : 560;
        ctx.save(); ctx.translate(510 + sh, y0); ctx.rotate(-0.05); const sc = E.back(kin); ctx.scale(sc, sc); let sz = big ? 74 : 92; ctx.font = `800 ${sz}px K`; const tw = ctx.measureText(top).width; if (tw > 640) { sz *= 640 / tw; ctx.font = `800 ${sz}px K`; } const bw = Math.min(720, ctx.measureText(top).width + 90), bh = sz * 1.9;
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.roundRect(-bw / 2 + 8, -bh / 2 + 12, bw, bh, 28); ctx.fill(); ctx.fillStyle = hk.col || '#e63946'; ctx.beginPath(); ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 28); ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#141414'; ctx.stroke();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff'; ctx.fillText(top, 0, 6); ctx.restore();
        if (big) { const kb = prog(t, 0.45, 0.85); if (kb > 0) { ctx.save(); ctx.translate(510, y0 + 175); ctx.rotate(0.03); let s2 = 130; ctx.font = `800 ${s2}px K`; s2 = Math.min(s2, s2 * 740 / ctx.measureText(big).width); RH.bigText(big, 0, 0, s2, hk.bigCol || '#7fe0ff', kb); ctx.restore(); } }
        ctx.restore(); },
      outroGap: 0.5, outro(k) { ctx.fillStyle = endBg[1]; ctx.globalAlpha = E.inOut(k); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; },
      endCard(k) { if (use3d) { end3 = end3 || S3.endShot(endBg[0], endBg[1]); ctx.drawImage(S3.renderEnd(end3), 0, 0); } else RH.bg.studio(endBg[0], endBg[1]); ctx.save(); ctx.globalAlpha = k; productArt(510, 760, th.endScale || 1); RH.bigText(th.endTitle || TL.product, 510, 1010, th.endSize || 84, '#fff'); RH.bigText('อยู่ในตะกร้าด้านล่าง', 510, 1130, 68, th.endCol || '#e63946'); RH.basket(510, 1330, 0.6); ctx.restore(); },
    };
  }
  return {make, PROPS, BG, FX, note, mark, stamp, calendar, sheep, bowl, rain, glow, heartPath, rect, dot};
})();
