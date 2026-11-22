// เรื่องยาว #03 สายชาร์จต้องสาป — โทนลึกลับขำ ๆ ตราประทับ "ครั้งที่ N" (สายชาร์จแบบถัก)
const NOK = {outfit: '#ffd23f', hair: 'bow', bowCol: '#ff5fa2', hairCol: '#2a1f1a', collar: true, belt: false};
const TECH = {outfit: '#4a6b8a', hair: 'cap', capCol: '#2ecc71', mustache: true, hairCol: '#3a2a1a', pattern: 'check'};
const GUEST = {outfit: '#9aa3b5', hair: 'neat', hairCol: '#333', tie: '#3a86ff', collar: true};
const P = (b, o) => Object.assign({}, b, o);
const talk = (ln, who) => (ln.who === who ? 0.3 + 0.7 * Math.abs(Math.sin(T * 17)) : 0);

function stamp(t, lt, x = 510, y = 470) { const k = prog(lt, 0.05, 0.35); if (k <= 0) return; const s = lerp(2.6, 1, E.out(k)); ctx.save(); ctx.translate(x, y); ctx.rotate(-0.12); ctx.scale(s, s); ctx.globalAlpha = Math.min(1, k * 2);
  ctx.beginPath(); ctx.roundRect(-250, -85, 500, 170, 24); ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill(); ctx.lineWidth = 14; ctx.strokeStyle = '#d62828'; ctx.stroke(); ctx.beginPath(); ctx.roundRect(-226, -62, 452, 124, 14); ctx.lineWidth = 5; ctx.stroke();
  ctx.font = '800 100px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#d62828'; ctx.fillText(t, 0, 8); ctx.restore(); }
function storm() { ctx.fillStyle = RH.g(0, H, '#1b1030', '#3b2160'); ctx.fillRect(-300, -300, W + 600, H + 600); const fl = (T % 3.2) < 0.12 ? 0.6 : 0;
  for (let i = 0; i < 5; i++) { const x = ((i * 300 + T * 25) % 1500) - 200; ctx.beginPath(); ctx.ellipse(x, 380 + (i % 2) * 90, 220, 70, 0, 0, Math.PI * 2); ctx.fillStyle = '#2b1a4a'; ctx.fill(); }
  if (fl) { ctx.fillStyle = `rgba(230,220,255,${fl})`; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.moveTo(760, 300); ctx.lineTo(700, 520); ctx.lineTo(760, 520); ctx.lineTo(680, 760); ctx.lineWidth = 12; ctx.strokeStyle = '#fff'; ctx.stroke(); } }
function plug(x, y, s, rot = 0, face) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-40, -70, 80, 110, 14); RH.shade(() => { ctx.fillStyle = '#f2f2f2'; ctx.fill(); }); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); ctx.roundRect(-22, -110, 44, 44, 6); ctx.fillStyle = '#c9ced8'; ctx.fill(); ctx.stroke(); if (face) { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 16, -26, 8, 0, Math.PI * 2); ctx.fillStyle = '#d62828'; ctx.fill(); } ctx.beginPath(); ctx.arc(0, 8, 14, 1.1 * Math.PI, 1.9 * Math.PI); ctx.lineWidth = 5; ctx.stroke(); } ctx.restore(); }
function wire(pts, w = 22, col = '#f2f2f2', braid = false) { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 4) ctx.quadraticCurveTo(pts[i], pts[i + 1], pts[i + 2], pts[i + 3]);
  ctx.lineWidth = w + 12; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke(); if (braid) { ctx.setLineDash([10, 12]); ctx.lineDashOffset = 0; ctx.lineWidth = w * 0.7; ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.stroke(); } ctx.restore(); }
function battery(x, y, s, pct, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-110, -55, 220, 110, 18); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.beginPath(); ctx.roundRect(112, -22, 20, 44, 6); ctx.fillStyle = RH.K; ctx.fill();
  ctx.beginPath(); ctx.roundRect(-98, -43, Math.max(8, 196 * pct / 100), 86, 10); ctx.fillStyle = col; ctx.fill(); ctx.font = '800 56px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 10; ctx.strokeText(pct + '%', 0, 4); ctx.fillStyle = '#fff'; ctx.fillText(pct + '%', 0, 4); ctx.restore(); }
function screenBoard(on) { ctx.beginPath(); ctx.roundRect(150, 340, 720, 420, 16); ctx.fillStyle = on ? '#fff' : '#111'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = RH.K; ctx.stroke();
  if (on) { for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.roundRect(250 + i * 110, 700 - (60 + i * 50), 70, 60 + i * 50, 6); ctx.fillStyle = ['#ff6b6b', '#ffd23f', '#7bd389', '#3ec1d3', '#7b5cff'][i]; ctx.fill(); } txt('ยอดขายปีนี้', 510, 400, 44, '#333', {f: 'K'}); } }
function mark(x, y, ok, k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(E.back(k), E.back(k)); ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2); ctx.fillStyle = ok ? '#2ecc71' : '#e74c3c'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); if (ok) { ctx.moveTo(-24, 0); ctx.lineTo(-6, 20); ctx.lineTo(26, -18); } else { ctx.moveTo(-20, -20); ctx.lineTo(20, 20); ctx.moveTo(20, -20); ctx.lineTo(-20, 20); } ctx.lineWidth = 12; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.restore(); }
function sparks(x, y, n = 8) { for (let i = 0; i < n; i++) { const a = hash(i) * 6.28 + T * 8, r = 30 + ((T * 4 + hash(i * 3)) % 1) * 70; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 0.5, y + Math.sin(a) * r * 0.5); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.lineWidth = 6; ctx.strokeStyle = i % 2 ? '#ffd23f' : '#fff'; ctx.stroke(); } }

const SCENES = {
  title(lt, ln) { storm(); const bob = Math.sin(T * 2) * 20; wire([150, 1150 + bob, 400, 900, 520, 1050 + bob, 640, 1200, 820, 900 + bob]); plug(830, 860 + bob, 1.6, 0.6, true);
    RH.bigText('สายชาร์จ', 510, 560, 130, '#c6ff7a', prog(lt, 0.4, 0.8)); RH.bigText('ต้องสาป', 510, 720, 150, '#ff5f5f', prog(lt, 0.7, 1.1)); },
  meeting(lt, ln) { RH.bg.office({}); screenBoard(true); RH.person(760, 1040, 0.95, P(NOK, {face: ln.who === 'nok' ? 'shock' : 'happy', pose: ln.who === 'nok' ? 'hold' : 'point', flip: true, mouth: talk(ln, 'nok')}));
    for (let i = 0; i < 2; i++) RH.head(180 + i * 220, 1260, 0.6, P(GUEST, {face: 'neutral', hairCol: i ? '#7a4a2a' : '#222'}));
    const blink = (T * 2) % 1 < 0.6; battery(300, 860, 0.9, 3, blink ? '#e74c3c' : '#ff9b9b'); if (ln.who === 'nok') { wire([600, 1200, 520, 1260, 420, 1180]); plug(420, 1160, 0.7, -1.2); mark(420, 1020, false, prog(T - ln.start, ln.dur * 0.6, ln.dur * 0.8)); }
    if (T - ln.start < 1.6 && ln.who === 'narr') stamp('ครั้งที่ 1', T - ln.start); },
  blackout(lt, ln) { bgFill('#05050a'); const pos = [[220, 1000], [440, 1000], [760, 900], [640, 1100]]; pos.forEach(([x, y], i) => { const bl = ((T + i * 0.37) % 2.2) < 0.12; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sd * 30, y, 16, bl ? 2 : 22, 0, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); } });
    RH.bigText('. . . . .', 510, 700, 120, '#fff', prog(lt, 0.4, 0.8)); ctx.beginPath(); ctx.moveTo(840, 860); ctx.quadraticCurveTo(856, 890, 840, 900); ctx.quadraticCurveTo(824, 890, 840, 860); ctx.fillStyle = '#9fe3ff'; ctx.fill(); },
  park(lt, ln) { RH.bg.meadow(); ctx.fillStyle = 'rgba(255,140,80,0.28)'; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.roundRect(200, 1180, 640, 40, 10); ctx.fillStyle = '#9a6238'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke();
    const sad = ln.who === 'nok'; RH.person(420, 960, 1.05, P(NOK, {face: sad ? 'cry' : 'happy', pose: 'hold', mouth: talk(ln, 'nok'), blush: !sad}));
    ctx.save(); ctx.translate(700, 820); ctx.beginPath(); ctx.roundRect(-80, -140, 160, 280, 26); ctx.fillStyle = '#222'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.beginPath(); ctx.roundRect(-66, -124, 132, 248, 16); ctx.fillStyle = sad && (T % 0.5 < 0.25) ? '#333' : '#ffb3c7'; ctx.fill();
    if (!sad) { ctx.save(); ctx.translate(0, -10); ctx.scale(2.2, 2.2); ctx.beginPath(); ctx.moveTo(0, 12); ctx.bezierCurveTo(-30, -8, -14, -30, 0, -14); ctx.bezierCurveTo(14, -30, 30, -8, 0, 12); ctx.fillStyle = '#ff3b6b'; ctx.fill(); ctx.restore(); } ctx.restore();
    wire([700, 960, 720, 1100, 640, 1160]); if (sad) sparks(700, 960); if (T - ln.start < 1.6 && ln.who === 'narr') stamp('ครั้งที่ 2', T - ln.start); },
  shop(lt, ln) { RH.bg.room({wall: '#cfe9ff', floor: '#9aa7b8'}); for (let r = 0; r < 3; r++) { ctx.fillStyle = '#8b5a3c'; ctx.fillRect(120, 470 + r * 170, 780, 16); for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.roundRect(140 + i * 108, 370 + r * 170, 60, 100, 10); ctx.fillStyle = ['#ff6b6b', '#3ec1d3', '#ffd23f', '#7bd389', '#7b5cff'][(i + r) % 5]; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = RH.K; ctx.stroke(); } }
    RH.person(330, 1000, 1.0, P(TECH, {face: ln.who === 'tech' ? 'smug' : 'neutral', pose: ln.who === 'tech' ? 'shrug' : 'stand', mouth: talk(ln, 'tech')})); ctx.beginPath(); ctx.roundRect(80, 1150, 520, 260, 10); ctx.fillStyle = '#e9e2d4'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
    RH.person(760, 1040, 0.95, P(NOK, {face: 'sad', pose: 'hold', flip: true})); if (T - ln.start < 1.6 && ln.who === 'narr') stamp('ครั้งที่ 3', T - ln.start); },
  wire_fact(lt, ln) { RH.bg.studio('#2b2a4a', '#3a3966'); RH.bigText('ข้างในสายเป็นยังไง?', 510, 400, 76, '#ffd23f', prog(lt, 0, 0.4));
    ctx.save(); ctx.translate(0, 820); ctx.beginPath(); ctx.roundRect(120, -70, 520, 140, 70); ctx.fillStyle = '#f2f2f2'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
    const broken = Math.floor(prog(lt, ln.dur * 0.45, ln.dur * 0.95) * 7); for (let i = 0; i < 7; i++) { const y = -48 + i * 16; ctx.beginPath(); ctx.moveTo(300, y); if (i < broken) { ctx.lineTo(600, y + Math.sin(i) * 4); ctx.moveTo(640, y + 10); } else ctx.lineTo(640, y); ctx.lineTo(760, y); ctx.lineWidth = 8; ctx.strokeStyle = '#e08a3c'; ctx.stroke(); }
    ctx.restore(); plug(830, 820, 1.4, Math.PI / 2 + Math.sin(T * 5) * 0.25); RH.bigText('ทองแดง', 300, 660, 60, '#e08a3c', prog(lt, ln.dur * 0.3, ln.dur * 0.45)); RH.bigText(`ขาดแล้ว ${broken}/7 เส้น`, 510, 1060, 70, '#ff6b6b', prog(lt, ln.dur * 0.5, ln.dur * 0.6)); },
  do_dont(lt, ln) { RH.bg.room({wall: '#fff4d6', floor: '#e2c28f'}); RH.bigText('ทำแบบนี้', 510, 380, 90, '#7bd389', prog(lt, 0, 0.3));
    const k1 = prog(lt, ln.dur * 0.05, ln.dur * 0.2), k2 = prog(lt, ln.dur * 0.3, ln.dur * 0.45), k3 = prog(lt, ln.dur * 0.6, ln.dur * 0.75);
    wire([200, 640, 260, 560, 320, 600]); plug(320, 560, 0.8, 0.3); RH.bubble('จับหัวปลั๊ก', 300, 760, k1, {size: 40}); mark(450, 560, true, k1);
    ctx.save(); ctx.translate(720, 620); ctx.beginPath(); ctx.ellipse(0, 0, 110, 80, 0, 0, Math.PI * 2); ctx.lineWidth = 30; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.lineWidth = 18; ctx.strokeStyle = '#f2f2f2'; ctx.stroke(); ctx.restore(); RH.bubble('ม้วนหลวม ๆ', 720, 760, k2, {size: 40}); mark(850, 540, true, k2);
    wire([250, 1000, 420, 1000, 420, 1080]); ctx.save(); ctx.translate(420, 1080); ctx.rotate(0.3); ctx.beginPath(); ctx.moveTo(-60, -60); ctx.lineTo(0, 0); ctx.lineWidth = 14; ctx.strokeStyle = '#e74c3c'; ctx.stroke(); ctx.restore(); RH.bubble('พับ / มัดแน่น', 330, 1170, k3, {size: 40, fill: '#ffd6d6'}); mark(560, 1000, false, k3);
    ctx.save(); ctx.translate(760, 1050); ctx.rotate(Math.sin(T * 6) * 0.1); ctx.beginPath(); ctx.roundRect(-60, -110, 120, 220, 20); ctx.fillStyle = '#222'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.restore(); wire([760, 1160, 760, 1230, 700, 1240]); RH.bubble('ใช้ไปชาร์จไป', 760, 1260, k3, {size: 40, fill: '#ffd6d6'}); mark(880, 960, false, k3); },
  braided(lt, ln) { RH.bg.studio('#c6ff7a', '#9be15d'); RH.bigText('สายถัก', 510, 400, 120, '#fff', prog(lt, 0, 0.35)); const b = Math.sin(T * 3) * 120;
    wire([150, 900, 400, 900 + b, 640, 860], 34, '#ff5fa2', true); ctx.save(); ctx.translate(640, 860); ctx.rotate(-0.1); ctx.beginPath(); ctx.roundRect(0, -26, 90, 52, 14); ctx.fillStyle = '#333'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.restore();
    plug(780, 850, 1.1, Math.PI / 2 - 0.1); const k = prog(lt, ln.dur * 0.45, ln.dur * 0.6); RH.bubble('ปลอกกันหัก', 690, 1010, k, {size: 50, tail: 0}); if (k >= 1) RH.sparkle(690, 860, 140, 6); },
  stage(lt, ln) { bgFill('#2a1630'); for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#b0213a' : '#8c1830'; ctx.fillRect(i * 140 - 20, 0, 140, 1200); } ctx.fillStyle = '#6b3e26'; ctx.fillRect(-300, 1180, W + 600, 900);
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.beginPath(); ctx.moveTo(470, 0); ctx.lineTo(200, 1250); ctx.lineTo(800, 1250); ctx.lineTo(570, 0); ctx.fillStyle = 'rgba(255,240,180,0.3)'; ctx.fill(); ctx.restore();
    RH.person(500, 980, 1.05, P(NOK, {face: 'happy', pose: ln.who === 'nok' ? 'cheer' : 'point', mouth: talk(ln, 'nok')})); battery(760, 640, 0.9, 100, '#2ecc71');
    for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(80 + i * 130, 1450 + Math.abs(Math.sin(T * 7 + i)) * -16, 70, Math.PI, 0); ctx.fillStyle = '#140a18'; ctx.fill(); } if (ln.who === 'nok') RH.confetti(40); },
  cta(lt, ln) { RH.bg.studio('#ffd1e3', '#ffa8c9'); const k = E.back(prog(lt, 0, 0.5)); ctx.save(); ctx.translate(510, 820); ctx.scale(k, k); wire([-320, 60, -100, -120, 60, 40, 160, 160, 260, 0], 34, '#ff5fa2', true); plug(300, -40, 1.1, 1.0); ctx.restore(); RH.sparkle(510, 820, 320, 10);
    RH.bigText('สายชาร์จแบบถัก', 510, 420, 96, '#fff', prog(lt, 0.2, 0.6)); const b = prog(lt, ln.dur * 0.5, ln.dur * 0.75); if (b > 0) { ctx.save(); ctx.translate(510, 1180); ctx.scale(E.back(b), E.back(b)); RH.basket(0, 0, 0.6); ctx.restore(); } },
};

window.EP = {font: 'K', scenes: SCENES, sceneTime: true, xfade: 0.25,
  sub: {mode: 'words', y: 1330, size: 104, chunk: 5, hl: '#c6ff7a'},
  camera(name, lt, ln) { let sx = 0; if (name === 'meeting' && ln.who === 'nok') sx = Math.sin(T * 50) * 4 * prog(T - ln.start, ln.dur * 0.6, ln.dur * 0.7); const s = 1 + 0.05 * E.out(prog(lt, 0, ln.dur)); ctx.translate(540 + sx, 960); ctx.scale(s, s); ctx.translate(-540, -960); },
  intro(t) { storm(); RH.bigText('สายชาร์จต้องสาป', 510, 900, 110, '#c6ff7a', prog(t, 0, 0.3)); },
  overlay(t, ln) { if (ln && (ln.scene === 'cta' || ln.scene === 'title')) return; ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.beginPath(); ctx.roundRect(150, 200, 720, 96, 48); ctx.fill(); ctx.restore(); txt('สายชาร์จต้องสาป', 510, 250, 50, '#c6ff7a', {f: 'K', w: 800}); },
  outroGap: 0.5,
  outro(k) { ctx.fillStyle = `rgba(255,168,201,${E.inOut(k)})`; ctx.fillRect(0, 0, W, H); },
  endCard(k) { RH.bg.studio('#ffd1e3', '#ffa8c9'); ctx.save(); ctx.globalAlpha = k; wire([180, 800, 360, 640, 520, 780, 640, 900, 760, 720], 34, '#ff5fa2', true); plug(790, 690, 1.0, 1.0); RH.bigText('สายชาร์จแบบถัก', 510, 1000, 90, '#fff'); RH.bigText('อยู่ในตะกร้าด้านล่าง', 510, 1130, 70, '#d62828'); RH.basket(510, 1330, 0.6); ctx.restore(); },
};
