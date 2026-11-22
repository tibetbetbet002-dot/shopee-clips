// คลังภาพสไตล์ "หัวกลม" — ใช้ร่วมกันทุกตอนแนวเล่าเรื่อง (โหลดอัตโนมัติจาก core.html)
// ใช้: RH.person(x,y,s,{...}), RH.bg.meadow(), RH.scroll('วันที่ 1',k) ฯลฯ
const RH = (() => {
  const K = '#151515';
  const lw = (w) => { ctx.lineWidth = w; ctx.strokeStyle = K; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; };
  const fillStroke = (fill, w = 8) => { if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (w) { lw(w); ctx.stroke(); } };
  const g = (y0, y1, a, b) => { const gr = ctx.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };
  const shade = (fn, blur = 22, a = 0.22, oy = 12) => { ctx.save(); ctx.shadowColor = `rgba(0,0,0,${a})`; ctx.shadowBlur = blur; ctx.shadowOffsetY = oy; fn(); ctx.restore(); };

  // ---------------- ตัวละคร ----------------
  // o: {outfit:'#hex', pattern:'stripe'|'plain'|'check', hair:'tuft'|'neat'|'bald'|'bow'|'pony'|'spiky'|'cap'|'beanie'|'curly',
  //     hairCol, face:'neutral'|'happy'|'angry'|'sad'|'shock'|'sleepy'|'smug'|'cry'|'determined'|'tired', mouth(0..1),
  //     pose:'stand'|'walk'|'run'|'sit'|'point'|'wave'|'cheer'|'shrug'|'hold'|'type'|'facepalm', glasses, mustache, blush, sweat,
  //     tie:'#hex', belt, flip, prop(fn), bob}
  function person(x, y, s, o = {}) {
    const m = o.mouth || 0, pose = o.pose || 'stand', out = o.outfit || '#7a7f8c';
    ctx.save(); ctx.translate(x, y + (o.bob !== false ? Math.sin(T * 3 + x) * 3 : 0)); ctx.scale(s * (o.flip ? -1 : 1), s); if (o.rot) ctx.rotate(o.rot);
    // ขา
    const sw = pose === 'walk' ? Math.sin(T * 8) * 0.35 : pose === 'run' ? Math.sin(T * 14) * 0.6 : 0;
    if (pose === 'sit') { ctx.beginPath(); ctx.moveTo(-40, 230); ctx.lineTo(-40, 300); ctx.lineTo(40, 300); ctx.moveTo(40, 230); ctx.lineTo(70, 300); ctx.lineTo(130, 300); lw(9); ctx.stroke(); }
    else if (pose !== 'lie') {
      for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 38, 230); ctx.rotate(sd * sw + (o.kick && sd > 0 ? -o.kick : 0)); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 170); lw(9); ctx.stroke(); ctx.beginPath(); ctx.ellipse(sd * 8, 172, 18, 9, 0, 0, Math.PI * 2); fillStroke('#151515', 0); ctx.restore(); }
    }
    // แขน
    const arm = (sd, ang, len = 150, hold) => { ctx.save(); ctx.translate(sd * 112, 60); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, len); lw(9); ctx.stroke(); ctx.beginPath(); ctx.arc(0, len + 6, 13, 0, Math.PI * 2); fillStroke('#fff', 6); if (hold) { ctx.translate(0, len); hold(); } ctx.restore(); };
    const A = {
      stand: [0.15, -0.15], walk: [0.15 + sw * 0.6, -0.15 - sw * 0.6], run: [0.6 + sw, -0.6 - sw], sit: [-0.6, 0.6], point: [0.15, -2.0],
      wave: [0.15, -2.6 + Math.sin(T * 9) * 0.35], cheer: [2.7 + Math.sin(T * 10) * 0.15, -2.7 - Math.sin(T * 10) * 0.15], shrug: [1.9, -1.9],
      hold: [0.15, -0.9], type: [-0.9 + Math.sin(T * 18) * 0.12, 0.9 + Math.cos(T * 16) * 0.12], facepalm: [0.15, -2.9], lie: [0, 0]
    }[pose] || [0.15, -0.15];
    if (o.arms) { A[0] = o.arms[0]; A[1] = o.arms[1]; }
    if (pose !== 'lie') { arm(-1, A[0]); arm(1, A[1], 150, pose === 'hold' || pose === 'point' ? o.prop : null); if (o.between) o.between(-112 - 156 * Math.sin(A[0]), 60 + 156 * Math.cos(A[0]), 112 - 156 * Math.sin(A[1]), 60 + 156 * Math.cos(A[1])); }
    // ลำตัว
    shade(() => { ctx.beginPath(); ctx.ellipse(0, 130, 120, 128, 0, 0, Math.PI * 2); ctx.fillStyle = out; ctx.fill(); });
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 130, 120, 128, 0, 0, Math.PI * 2); ctx.clip();
    if (o.pattern === 'stripe') { ctx.globalAlpha = 0.25; for (let i = -6; i < 7; i++) { ctx.fillStyle = '#000'; ctx.fillRect(i * 20, 0, 3, 260); } ctx.globalAlpha = 1; }
    if (o.pattern === 'check') { ctx.globalAlpha = 0.18; for (let i = -6; i < 7; i++) { ctx.fillStyle = '#000'; ctx.fillRect(i * 36, 0, 14, 260); ctx.fillRect(-130, 10 + i * 36, 260, 14); } ctx.globalAlpha = 1; }
    const hl = ctx.createRadialGradient(-50, 70, 10, -30, 100, 150); hl.addColorStop(0, 'rgba(255,255,255,0.35)'); hl.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = hl; ctx.fillRect(-130, 0, 260, 260);
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(-130, 190, 260, 80);
    if (o.belt !== false) { ctx.fillStyle = '#3a2a1e'; ctx.fillRect(-130, 196, 260, 18); ctx.fillStyle = '#d9a441'; ctx.fillRect(-12, 196, 24, 18); }
    if (o.tie) { ctx.beginPath(); ctx.moveTo(-14, 10); ctx.lineTo(14, 10); ctx.lineTo(20, 120); ctx.lineTo(0, 140); ctx.lineTo(-20, 120); ctx.closePath(); fillStroke(o.tie, 4); }
    if (o.collar) { ctx.beginPath(); ctx.moveTo(-50, 4); ctx.lineTo(0, 50); ctx.lineTo(50, 4); fillStroke('#fff', 5); }
    if (o.sash) { ctx.save(); ctx.rotate(-0.6); ctx.fillStyle = o.sash; ctx.fillRect(-160, 40, 320, 26); ctx.restore(); }
    if (o.badge) { ctx.beginPath(); ctx.arc(-50, 70, 16, 0, Math.PI * 2); fillStroke(o.badge, 4); }
    ctx.restore();
    ctx.beginPath(); ctx.ellipse(0, 130, 120, 128, 0, 0, Math.PI * 2); lw(8); ctx.stroke();
    // หัว
    head(0, -80, 1, o);
    ctx.restore();
  }

  function head(x, y, s, o = {}) {
    const m = o.mouth || 0, face = o.face || 'neutral', R = 132;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.headTilt) ctx.rotate(o.headTilt);
    // ทรงผมด้านหลัง
    const hc = o.hairCol || '#2a1f1a';
    if (o.hair === 'pony') { ctx.beginPath(); ctx.ellipse(110, -40, 40, 90, 0.5 + Math.sin(T * 3) * 0.05, 0, Math.PI * 2); fillStroke(hc, 7); }
    if (o.hair === 'curly') { for (let i = 0; i < 10; i++) { const a = Math.PI * (0.95 + i * 0.12); ctx.beginPath(); ctx.arc(Math.cos(a) * 128, Math.sin(a) * 128, 36, 0, Math.PI * 2); fillStroke(hc, 6); } }
    shade(() => { ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = o.skin || '#ffffff'; ctx.fill(); }, 24, 0.2, 10);
    const sh = ctx.createRadialGradient(-40, -50, 20, 0, 0, R); sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(0.75, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(150,160,180,0.35)');
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = sh; ctx.fill(); lw(8); ctx.stroke();
    ctx.save(); ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.ellipse(-62, -62, 26, 14, -0.7, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
    // ผม
    if (o.hair === 'tuft') { for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 16, -R + 4); ctx.quadraticCurveTo(i * 30 + 10, -R - 40, i * 26 + 20, -R - 54); lw(7); ctx.stroke(); } }
    if (o.hair === 'neat' || o.hair === 'pony' || o.hair === 'bow') { ctx.beginPath(); ctx.arc(0, 0, R, Math.PI * 1.08, Math.PI * 1.92); ctx.quadraticCurveTo(40, -70, -10, -78); ctx.quadraticCurveTo(-80, -70, -126, -36); ctx.closePath(); fillStroke(hc, 7); }
    if (o.hair === 'bow') { ctx.save(); ctx.translate(70, -110); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 28, 0, 30, 18, sd * 0.3, 0, Math.PI * 2); fillStroke(o.bowCol || '#ff5fa2', 6); } ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); fillStroke(o.bowCol || '#ff5fa2', 6); ctx.restore(); }
    if (o.hair === 'spiky') { ctx.beginPath(); ctx.moveTo(-120, -50); for (let i = 0; i <= 6; i++) { const a = Math.PI * (1.1 + i * 0.13); ctx.lineTo(Math.cos(a) * 170, Math.sin(a) * 170); ctx.lineTo(Math.cos(a + 0.065) * 120, Math.sin(a + 0.065) * 120); } ctx.closePath(); fillStroke(hc, 7); }
    if (o.hair === 'cap') { ctx.beginPath(); ctx.arc(0, -20, R + 4, Math.PI * 1.02, Math.PI * 1.98); ctx.closePath(); fillStroke(o.capCol || '#e74c3c', 7); ctx.beginPath(); ctx.ellipse(70, -36, 90, 18, 0.1, 0, Math.PI * 2); fillStroke(o.capCol || '#e74c3c', 7); }
    if (o.hair === 'beanie') { ctx.beginPath(); ctx.arc(0, -30, R + 2, Math.PI * 1.05, Math.PI * 1.95); ctx.closePath(); fillStroke(o.capCol || '#3a86ff', 7); ctx.beginPath(); ctx.arc(0, -R - 40, 22, 0, Math.PI * 2); fillStroke('#fff', 6); }
    if (o.hair === 'bald') { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 118, -20, 22, Math.PI * (sd > 0 ? 1.4 : -0.4), Math.PI * (sd > 0 ? 2.4 : 0.6)); lw(10); ctx.strokeStyle = '#888'; ctx.stroke(); } }
    // หน้า
    const ex = 44, ey = -4;
    if (o.panda) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * ex, ey + 4, 30, 26, sd * 0.3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(70,50,90,0.55)'; ctx.fill(); }
    const brow = { neutral: [0, 0], happy: [-6, 0], angry: [14, -0.35], sad: [-8, 0.35], shock: [-22, 0], sleepy: [4, 0], smug: [6, -0.15], cry: [-10, 0.4], determined: [10, -0.3], tired: [2, 0.2] }[face] || [0, 0];
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * ex, ey - 42 + brow[0] * 0.5); ctx.rotate(sd * brow[1]); ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); lw(11); ctx.stroke(); ctx.restore(); }
    for (const sd of [-1, 1]) {
      ctx.save(); ctx.translate(sd * ex, ey);
      if (face === 'happy' || face === 'smug' && sd > 0) { ctx.beginPath(); ctx.arc(0, 8, 16, 1.1 * Math.PI, 1.9 * Math.PI); lw(8); ctx.stroke(); }
      else if (face === 'sleepy' || (face === 'tired' && blinkish())) { ctx.beginPath(); ctx.moveTo(-14, 4); ctx.lineTo(14, 4); lw(8); ctx.stroke(); }
      else if (face === 'shock') { ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); fillStroke('#fff', 6); ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fillStyle = K; ctx.fill(); }
      else { ctx.beginPath(); ctx.ellipse(0, 0, 9, 13, 0, 0, Math.PI * 2); ctx.fillStyle = K; ctx.fill(); ctx.beginPath(); ctx.arc(-3, -5, 3, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        if (face === 'tired') { ctx.beginPath(); ctx.arc(0, 20, 14, 0.15 * Math.PI, 0.85 * Math.PI); lw(4); ctx.strokeStyle = '#8a7aa8'; ctx.stroke(); } }
      if (face === 'cry') { const ph = (T * 1.5 + (sd > 0 ? 0.5 : 0)) % 1; ctx.beginPath(); ctx.ellipse(0, 24 + ph * 60, 8, 12, 0, 0, Math.PI * 2); ctx.fillStyle = '#7cc8ff'; ctx.fill(); }
      ctx.restore();
    }
    if (o.glasses) { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * ex, ey, 28, 0, Math.PI * 2); lw(6); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-16, ey); ctx.lineTo(16, ey); lw(6); ctx.stroke(); }
    if (o.blush || face === 'happy') { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 74, 34, 20, 10, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,120,140,0.35)'; ctx.fill(); } }
    if (o.redEyes) { for (const sd of [-1, 1]) for (let v = 0; v < 3; v++) { ctx.beginPath(); ctx.moveTo(sd * ex - 14, ey + 4 + v * 4); ctx.lineTo(sd * ex - 2, ey + v * 3); ctx.lineWidth = 2; ctx.strokeStyle = '#e74c3c'; ctx.stroke(); } }
    // ปาก
    ctx.save(); ctx.translate(0, 56);
    if (m > 0.12 || face === 'shock') { ctx.beginPath(); ctx.ellipse(0, 4, 14 + m * 10 + (face === 'shock' ? 8 : 0), 5 + m * 18 + (face === 'shock' ? 14 : 0), 0, 0, Math.PI * 2); fillStroke('#7a1f2a', 5); }
    else if (face === 'happy' || face === 'smug') { ctx.beginPath(); ctx.arc(0, -8, 26, 0.15 * Math.PI, 0.85 * Math.PI); lw(7); ctx.stroke(); }
    else if (face === 'sad' || face === 'cry' || face === 'tired') { ctx.beginPath(); ctx.arc(0, 18, 20, 1.15 * Math.PI, 1.85 * Math.PI); lw(7); ctx.stroke(); }
    else if (face === 'angry') { ctx.beginPath(); ctx.moveTo(-22, 6); ctx.lineTo(0, -2); ctx.lineTo(22, 6); lw(7); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(18, 0); lw(7); ctx.stroke(); }
    ctx.restore();
    if (o.mustache) { ctx.beginPath(); ctx.moveTo(-40, 44); ctx.quadraticCurveTo(-20, 30, 0, 42); ctx.quadraticCurveTo(20, 30, 40, 44); ctx.quadraticCurveTo(20, 54, 0, 48); ctx.quadraticCurveTo(-20, 54, -40, 44); fillStroke(o.hairCol || '#2a1f1a', 4); }
    if (o.goatee) { ctx.beginPath(); ctx.moveTo(-8, 90); ctx.lineTo(0, 110); ctx.lineTo(8, 90); fillStroke(K, 3); }
    if (o.sweat || face === 'shock') { ctx.beginPath(); ctx.moveTo(110, -60); ctx.quadraticCurveTo(128, -30, 110, -20); ctx.quadraticCurveTo(92, -30, 110, -60); fillStroke('#9fe3ff', 5); }
    if (face === 'angry') { ctx.save(); ctx.translate(96, -96); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.beginPath(); ctx.moveTo(6, 6); ctx.quadraticCurveTo(18, 2, 22, 16); lw(7); ctx.strokeStyle = '#e74c3c'; ctx.stroke(); } ctx.restore(); }
    ctx.restore();
  }
  const blinkish = () => (T % 2.4) < 0.9;

  // ---------------- ฉากหลัง ----------------
  function clouds(y, n = 4, drift = 10) { for (let i = 0; i < n; i++) { const x = ((i * 330 + T * drift) % 1500) - 200, yy = y + (i % 2) * 70, s = 0.8 + hash(i) * 0.6;
      ctx.save(); ctx.translate(x, yy); ctx.scale(s, s); const bl = [[0, 0, 70], [70, -20, 80], [150, 0, 66], [60, 30, 70]];
      for (const [cx, cy, r] of bl) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = '#dfe9f5'; ctx.fill(); }
      for (const [cx, cy, r] of bl) { ctx.beginPath(); ctx.arc(cx, cy - 8, r - 6, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill(); } ctx.restore(); } }
  function tree(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#7a4a2a'; ctx.fillRect(-14, 0, 28, 120); lw(6); ctx.strokeRect(-14, 0, 28, 120);
    for (const [cx, cy, r] of [[-50, -20, 60], [50, -20, 60], [0, -70, 70], [0, 0, 60]]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); fillStroke('#5cb85c', 6); }
    for (const [cx, cy, r] of [[-60, -30, 30], [30, -90, 34]]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fill(); } ctx.restore(); }
  function grass(y0, col = '#6cc04a') {
    ctx.fillStyle = g(y0, H, col, '#4f9e36'); ctx.fillRect(-300, y0, W + 600, H - y0 + 300);
    for (let i = 0; i < 26; i++) { const x = hash(i * 3) * W, yy = y0 + 40 + hash(i * 7) * (H - y0 - 60); ctx.beginPath(); ctx.ellipse(x, yy, 80, 18, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fill(); }
    for (let i = 0; i < 140; i++) { const x = hash(i * 1.7) * W, yy = y0 + 10 + hash(i * 2.3) * (H - y0); const h = 18 + hash(i) * 18; ctx.beginPath(); ctx.moveTo(x - 6, yy); ctx.lineTo(x - 10, yy - h); ctx.moveTo(x, yy); ctx.lineTo(x + 2, yy - h * 1.2); ctx.moveTo(x + 6, yy); ctx.lineTo(x + 12, yy - h * 0.9); ctx.lineWidth = 3; ctx.strokeStyle = '#3d8a2a'; ctx.stroke(); }
    for (let i = 0; i < 26; i++) { const x = hash(i * 5.1) * W, yy = y0 + 40 + hash(i * 6.3) * (H - y0 - 40); for (let p = 0; p < 5; p++) { ctx.beginPath(); ctx.arc(x + Math.cos(p * 1.26) * 7, yy + Math.sin(p * 1.26) * 7, 5, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); } ctx.beginPath(); ctx.arc(x, yy, 4, 0, Math.PI * 2); ctx.fillStyle = '#ffcf3a'; ctx.fill(); }
  }
  const bg = {
    meadow(o = {}) { ctx.fillStyle = g(0, 1100, '#5aa9ef', '#cfe8ff'); ctx.fillRect(-300, -300, W + 600, H + 600);
      const sg = ctx.createRadialGradient(160, 220, 10, 160, 220, 420); sg.addColorStop(0, 'rgba(255,250,210,0.9)'); sg.addColorStop(1, 'rgba(255,250,210,0)'); ctx.fillStyle = sg; ctx.fillRect(-300, -200, 900, 900);
      clouds(300, 5, 12);
      ctx.beginPath(); ctx.moveTo(520, 1000); ctx.lineTo(820, 620); ctx.lineTo(1150, 1000); ctx.closePath(); fillStroke('#b9b4ad', 6); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(820, 630); ctx.lineTo(600 + i * 90, 1000); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.stroke(); }
      ctx.fillStyle = '#8fc98a'; ctx.beginPath(); ctx.moveTo(-50, 1000); for (let x = -50; x <= W + 50; x += 40) ctx.lineTo(x, 930 + Math.sin(x * 0.01) * 30); ctx.lineTo(W + 50, 1050); ctx.lineTo(-50, 1050); ctx.fill();
      tree(70, 930, 0.9); tree(1010, 930, 0.9); grass(1000); },
    beachNight(o = {}) { ctx.fillStyle = g(0, 1000, '#0f1a44', '#3c3a7a'); ctx.fillRect(-300, -300, W + 600, H + 600);
      for (let i = 0; i < 60; i++) { const tw = (Math.sin(T * 2 + i) + 1) / 2; ctx.beginPath(); ctx.arc(hash(i) * W, hash(i * 2) * 900, 2 + tw * 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${0.4 + tw * 0.6})`; ctx.fill(); }
      ctx.beginPath(); ctx.arc(780, 260, 80, 0, Math.PI * 2); ctx.fillStyle = '#fff6d6'; ctx.fill();
      ctx.fillStyle = g(1000, 1200, '#1d3d7a', '#163060'); ctx.fillRect(-300, 1000, W + 600, 200); for (let i = 0; i < 4; i++) { ctx.beginPath(); for (let x = -50; x <= W + 50; x += 20) ctx.lineTo(x, 1040 + i * 40 + Math.sin(x * 0.02 + T * 2 + i) * 6); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.stroke(); }
      ctx.fillStyle = g(1180, H, '#5a5248', '#3e3832'); ctx.fillRect(-300, 1180, W + 600, H); },
    office(o = {}) { const night = o.night; ctx.fillStyle = night ? '#2b3150' : '#f4efe4'; ctx.fillRect(-300, -300, W + 600, H + 600);
      ctx.save(); ctx.beginPath(); ctx.rect(80, 340, 920, 520); ctx.clip(); ctx.fillStyle = night ? g(340, 860, '#0f1a44', '#2c3a7a') : g(340, 860, '#7fc4ff', '#d8efff'); ctx.fillRect(80, 340, 920, 520);
      for (let i = 0; i < 12; i++) { const h = 160 + hash(i * 3) * 260; ctx.fillStyle = night ? '#1a2148' : '#a9c4dc'; ctx.fillRect(80 + i * 80, 860 - h, 70, h); if (night) for (let r = 0; r < h / 40; r++) if (hash(i * 9 + r) > 0.6) { ctx.fillStyle = '#ffd87a'; ctx.fillRect(92 + i * 80, 870 - h + r * 40, 14, 18); } }
      if (!night) clouds(420, 3, 8); ctx.restore(); ctx.beginPath(); ctx.rect(80, 340, 920, 520); lw(10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(540, 340); ctx.lineTo(540, 860); lw(8); ctx.stroke();
      ctx.fillStyle = night ? '#3a3f5e' : '#e3d6c0'; ctx.fillRect(-300, 860, W + 600, 300); ctx.fillStyle = night ? '#232742' : '#c9b18e'; ctx.fillRect(-300, 1160, W + 600, 800); },
    room(o = {}) { ctx.fillStyle = o.wall || '#ffe3c2'; ctx.fillRect(-300, -300, W + 600, H + 600); for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(0,0,0,0.04)'; ctx.fillRect(i * 100, 0, 50, 1160); }
      ctx.fillStyle = o.floor || '#c98b5a'; ctx.fillRect(-300, 1160, W + 600, 800); for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(0, 1160 + i * 80); ctx.lineTo(W, 1160 + i * 80); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.stroke(); } },
    studio(c1 = '#ffd166', c2 = '#ffb703') { for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2 + T * 0.15; ctx.fillStyle = i % 2 ? c1 : c2; ctx.beginPath(); ctx.moveTo(540, 900); ctx.arc(540, 900, 1600, a, a + Math.PI / 9 + 0.01); ctx.fill(); } },
  };

  // ---------------- พร็อพ ----------------
  function desk(x, y, w = 620, o = {}) { shade(() => { ctx.fillStyle = '#a8703f'; ctx.fillRect(x - w / 2, y, w, 34); }); ctx.beginPath(); ctx.rect(x - w / 2, y, w, 34); lw(7); ctx.stroke();
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sd * (w / 2 - 30), y + 34); ctx.lineTo(x + sd * (w / 2 - 30), y + 240); lw(10); ctx.stroke(); }
    if (o.laptop !== false) { ctx.save(); ctx.translate(x + (o.lx || 0), y); ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(130, 0); ctx.lineTo(110, -18); ctx.lineTo(-110, -18); ctx.closePath(); fillStroke('#cfd5de', 6);
      ctx.beginPath(); ctx.moveTo(-110, -18); ctx.lineTo(-96, -190); ctx.lineTo(96, -190); ctx.lineTo(110, -18); ctx.closePath(); fillStroke('#3a3f4e', 6); ctx.beginPath(); ctx.moveTo(-94, -30); ctx.lineTo(-84, -176); ctx.lineTo(84, -176); ctx.lineTo(94, -30); ctx.closePath(); ctx.fillStyle = o.screen || '#8fd3ff'; ctx.fill();
      if (o.text) { ctx.save(); ctx.clip(); txt(o.text, 0, -100, 30, '#334', { f: 'K', w: 800 }); ctx.restore(); } ctx.restore(); } }
  function chair(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-90, -260, 180, 200, 30); fillStroke('#3a3f4e', 7); ctx.beginPath(); ctx.roundRect(-110, -60, 220, 40, 14); fillStroke('#3a3f4e', 7);
    ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(0, 70); lw(12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-80, 80); ctx.lineTo(80, 80); lw(10); ctx.stroke(); ctx.restore(); }
  function cup(x, y, s = 1, steam = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-36, -70, 72, 80, 10); fillStroke('#fff', 6); ctx.beginPath(); ctx.arc(40, -30, 18, -1.3, 1.3); lw(8); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0, -70, 34, 8, 0, 0, Math.PI * 2); fillStroke('#6b3e26', 4); if (steam) for (let i = 0; i < 3; i++) { const ph = (T * 0.7 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; ctx.beginPath(); ctx.moveTo(-14 + i * 14, -84 - ph * 50); ctx.quadraticCurveTo(-4 + i * 14, -110 - ph * 60, -14 + i * 14, -130 - ph * 70); lw(5); ctx.strokeStyle = '#bbb'; ctx.stroke(); ctx.restore(); } ctx.restore(); }
  function zzz(x, y, n = 3) { for (let i = 0; i < n; i++) { const ph = (T * 0.45 + i / n) % 1; ctx.save(); ctx.globalAlpha = 1 - ph * 0.8; ctx.translate(x + ph * 60 + i * 20, y - ph * 220); ctx.rotate(-0.15); ctx.scale(0.7 + ph * 0.6, 0.7 + ph * 0.6);
      ctx.beginPath(); ctx.roundRect(-36, -36, 72, 72, 10); fillStroke('#fff', 7); ctx.font = '800 56px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = K; ctx.fillText('Z', 0, 4); ctx.restore(); } }
  function sparkle(x, y, r = 200, n = 8, col = '#fff6b0') { for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + T * 1.5; star(x + Math.cos(a) * r, y + Math.sin(a) * r * 0.7, 22, 8, 4, T * 3, col, 5); } }
  function confetti(n = 70) { for (let i = 0; i < n; i++) { const x = hash(i) * W + Math.sin(T * 2 + i) * 30, y = ((hash(i * 3.3) * 2200 + T * (300 + hash(i) * 260)) % 2200) - 200; ctx.save(); ctx.translate(x, y); ctx.rotate(T * 4 + i); ctx.fillStyle = ['#ff5a5f', '#ffd23f', '#3ec1d3', '#7bd389', '#fff'][i % 5]; ctx.fillRect(-11, -5, 22, 10); ctx.restore(); } }
  function bubble(t, x, y, k = 1, o = {}) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(E.back(k), E.back(k)); ctx.font = `800 ${o.size || 52}px K`; const w = ctx.measureText(t).width + 70, h = (o.size || 52) * 1.7;
    shade(() => { ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2); ctx.fillStyle = o.fill || '#fff'; ctx.fill(); }); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2); lw(7); ctx.stroke();
    if (o.tail) { ctx.beginPath(); ctx.moveTo(o.tail * 30 - 20, h / 2 - 4); ctx.lineTo(o.tail * 70, h / 2 + 40); ctx.lineTo(o.tail * 30 + 20, h / 2 - 4); fillStroke(o.fill || '#fff', 7); ctx.beginPath(); ctx.moveTo(o.tail * 30 - 16, h / 2 - 6); ctx.lineTo(o.tail * 30 + 16, h / 2 - 6); ctx.lineWidth = 10; ctx.strokeStyle = o.fill || '#fff'; ctx.stroke(); }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.col || K; ctx.fillText(t, 0, 4); ctx.restore(); }
  function bigText(t, x, y, size, col = '#ffd23f', k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(E.back(k), E.back(k)); ctx.font = `800 ${size}px K`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.28; ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.strokeText(t, 6, 10); ctx.lineWidth = size * 0.2; ctx.strokeStyle = K; ctx.strokeText(t, 0, 0); ctx.fillStyle = col; ctx.fillText(t, 0, 0); ctx.restore(); }
  // ป้ายม้วนกระดาษ "วันที่ 4"
  function scroll(t, k = 1, y = 280) { if (k <= 0) return; const w = lerp(60, 620, E.out(k)); ctx.save(); ctx.translate(540, y); ctx.rotate(-0.03);
    shade(() => { ctx.beginPath(); ctx.rect(-w / 2, -90, w, 180); ctx.fillStyle = '#f4e6c4'; ctx.fill(); }); ctx.beginPath(); ctx.rect(-w / 2, -90, w, 180); lw(8); ctx.stroke();
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * (w / 2 + 6), 0); ctx.beginPath(); ctx.roundRect(-24, -120, 48, 240, 14); ctx.fillStyle = g(-120, 120, '#d4532b', '#9c3216'); ctx.fill(); lw(7); ctx.stroke();
      for (const yy of [-130, 130]) { ctx.beginPath(); ctx.ellipse(0, yy, 30, 14, 0, 0, Math.PI * 2); fillStroke('#f2c14e', 6); } ctx.restore(); }
    if (k > 0.6) { ctx.globalAlpha = (k - 0.6) / 0.4; bigText(t, 0, 6, 120, '#ffd23f', 1); } ctx.restore(); }
  function basket(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, -50, 74, Math.PI, 0); lw(24); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -50, 74, Math.PI, 0); ctx.lineWidth = 12; ctx.strokeStyle = '#ffd23f'; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-140, -50); ctx.lineTo(140, -50); ctx.lineTo(108, 96); ctx.lineTo(-108, 96); ctx.closePath(); fillStroke('#ff7a1a', 8); for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 48, -34); ctx.lineTo(i * 38, 82); ctx.lineWidth = 6; ctx.strokeStyle = '#b35500'; ctx.stroke(); } ctx.restore(); }
  function split(fnL, fnR, labelL, labelR) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W / 2, H); ctx.clip(); fnL(); ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(W / 2, 0, W / 2, H); ctx.clip(); fnR(); ctx.restore();
    ctx.beginPath(); ctx.moveTo(540, 0); ctx.lineTo(540, H); lw(12); ctx.stroke(); if (labelL) bigText(labelL, 270, 420, 80, '#ff6b6b'); if (labelR) bigText(labelR, 810, 420, 80, '#7bd389'); }
  return { person, head, bg, clouds, tree, grass, desk, chair, cup, zzz, sparkle, confetti, bubble, bigText, scroll, basket, split, shade, K, g };
})();
