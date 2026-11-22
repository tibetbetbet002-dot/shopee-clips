// เรื่องยาว #05 มายด์ ปลาทองประจำออฟฟิศ — ออฟฟิศพาสเทล ปลาทองพูดได้ (กระดาษโน้ตกาวสีสด)
const MIND = {outfit: '#b38cff', hair: 'bow', bowCol: '#ffd23f', hairCol: '#3b2418', collar: true, belt: false};
const PUM = {outfit: '#e63946', hair: 'neat', hairCol: '#111', glasses: true, collar: true};
const P = (b, o) => Object.assign({}, b, o);
const talk = (ln, who) => (ln.who === who ? 0.3 + 0.7 * Math.abs(Math.sin(T * 17)) : 0);
const NC = {pink: '#ff8fc1', yel: '#ffe15c', blue: '#8fd3ff', grn: '#9be7a0'};

function pastel() { RH.bg.office({}); ctx.fillStyle = 'rgba(255,200,230,0.25)'; ctx.fillRect(0, 0, W, H); }
function note(x, y, s, col, label, rot = 0, k = 1) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * E.back(k), s * E.back(k)); RH.shade(() => { ctx.fillStyle = col; ctx.fillRect(-90, -90, 180, 180); }, 16, 0.25, 8);
  ctx.lineWidth = 6; ctx.strokeStyle = RH.K; ctx.strokeRect(-90, -90, 180, 180); ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(-90, -90, 180, 34); ctx.beginPath(); ctx.moveTo(60, 90); ctx.lineTo(90, 60); ctx.lineTo(90, 90); ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fill();
  if (label) { ctx.font = `800 ${label.length > 6 ? 30 : 40}px K`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = RH.K; ctx.fillText(label, 0, 14); } ctx.restore(); }
function bowl(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.arc(0, 0, 170, -2.6, -0.54, true); ctx.closePath(); ctx.fillStyle = 'rgba(140,210,255,0.45)'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, 170, -2.4, -0.74, true); ctx.lineWidth = 9; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -110, 128, 18, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(190,235,255,0.7)'; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  const jump = o.jump ? Math.abs(Math.sin(T * 6)) * 60 : 0; ctx.save(); ctx.translate(Math.sin(T * 1.4) * 30, 10 - jump); if (o.flip) ctx.scale(-1, 1);
  ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(120, -40 + Math.sin(T * 8) * 10); ctx.lineTo(120, 40 + Math.sin(T * 8) * 10); ctx.closePath(); ctx.fillStyle = '#ff8c1a'; ctx.fill(); ctx.lineWidth = 6; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 76, 56, 0, 0, Math.PI * 2); ctx.fillStyle = '#ff9f1c'; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-20, -20, 26, 12, -0.4, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill();
  const f = o.face || 'happy'; ctx.beginPath(); ctx.arc(-34, -8, 14, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); ctx.beginPath(); ctx.arc(-38, -8, 7, 0, Math.PI * 2); ctx.fillStyle = RH.K; ctx.fill();
  if (f === 'angry') { ctx.beginPath(); ctx.moveTo(-54, -30); ctx.lineTo(-18, -20); ctx.lineWidth = 7; ctx.stroke(); }
  const m = o.mouth || 0; ctx.beginPath(); if (m > 0.1) { ctx.ellipse(-56, 18, 8, 3 + m * 10, 0, 0, Math.PI * 2); ctx.fillStyle = '#7a1f2a'; ctx.fill(); } else { ctx.arc(-50, 12, 10, 0.2 * Math.PI, 0.9 * Math.PI); ctx.lineWidth = 5; ctx.stroke(); } ctx.restore();
  for (let i = 0; i < 3; i++) { const ph = (T * 0.6 + i / 3) % 1; ctx.beginPath(); ctx.arc(-60 + i * 50, 60 - ph * 160, 8 + i * 2, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 150, 110, 22, 0, 0, Math.PI * 2); ctx.fillStyle = '#c9a26b'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.restore(); }
function monitor(x, y, s, notes = []) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#555'; ctx.fillRect(-20, 150, 40, 90); ctx.beginPath(); ctx.roundRect(-110, 230, 220, 24, 10); ctx.fill();
  ctx.beginPath(); ctx.roundRect(-260, -170, 520, 330, 20); RH.shade(() => { ctx.fillStyle = '#333'; ctx.fill(); }); ctx.lineWidth = 9; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.beginPath(); ctx.roundRect(-240, -150, 480, 290, 12); ctx.fillStyle = '#c9ecff'; ctx.fill();
  notes.forEach(([nx, ny, c, l, r, k]) => note(nx, ny, 0.55, c, l, r, k)); ctx.restore(); }
function task(t, x, y, k, col = '#fff') { RH.bubble(t, x, y, k, {size: 44, fill: col}); }

const SCENES = {
  title(lt, ln) { RH.bg.studio('#ffd6ea', '#ffb8d9'); for (let i = 0; i < 12; i++) { const y = ((hash(i) * 2000 + T * 140) % 2100) - 100; note(hash(i * 3) * W, y, 0.5, Object.values(NC)[i % 4], '', T + i, 1); }
    RH.person(330, 1010, 1.0, P(MIND, {face: 'happy', pose: 'wave'})); bowl(780, 1080, 0.9, {flip: true}); RH.bigText('ปลาทอง', 510, 470, 140, '#ff9f1c', prog(lt, 0.4, 0.8)); RH.bigText('ประจำออฟฟิศ', 510, 620, 90, '#fff', prog(lt, 0.7, 1.1)); },
  orders(lt, ln) { pastel(); const pumT = ln.who === 'pum'; RH.person(250, 1000, 0.95, P(PUM, {face: 'determined', pose: pumT ? 'point' : 'stand', mouth: talk(ln, 'pum')}));
    RH.person(780, 1010, 0.95, P(MIND, {face: 'happy', pose: pumT ? 'stand' : 'cheer', flip: true, mouth: talk(ln, 'mind')})); const d = pumT ? ln.dur : 99, t0 = pumT ? T - ln.start : 99;
    task('ส่งอีเมลลูกค้า', 510, 420, prog(t0, d * 0.15, d * 0.3)); task('โทรฝ่ายบัญชี', 510, 530, prog(t0, d * 0.4, d * 0.55)); task('จองห้อง 14:00', 510, 640, prog(t0, d * 0.65, d * 0.8)); },
  forget(lt, ln) { pastel(); const confused = ln.who === 'mind'; RH.person(510, 980, 1.05, P(MIND, {face: confused ? 'shock' : 'neutral', pose: confused ? 'shrug' : 'type', mouth: talk(ln, 'mind')}));
    const items = ['อีเมล', 'บัญชี', 'ห้อง 14:00']; items.forEach((t, i) => { const go = prog(lt, 1.0 + i * 1.0, 2.2 + i * 1.0); if (go >= 1) return; const a = T * 1.5 + i * 2.1; ctx.save(); ctx.globalAlpha = 1 - go; task(t, 510 + Math.cos(a) * 280 + go * 600 * (i % 2 ? 1 : -1), 600 + Math.sin(a) * 80 - go * 250, 1); ctx.restore(); });
    for (let i = 0; i < 3; i++) { const k = prog(lt, 0.6 + i * 0.9, 0.9 + i * 0.9); RH.bubble(['แชตใหม่ (3)', 'กินข้าวไหน?', 'ด่วน!!'][i], [230, 800, 260][i], [1250, 1150, 520][i], k * (lt < 4.5 ? 1 : 0), {size: 36, fill: '#e6f7ff'}); }
    if (confused) RH.bigText('???', 510, 520, 130, '#b38cff', prog(T - ln.start, 0.1, 0.4)); },
  fish_talk(lt, ln) { RH.bg.studio('#bde4ff', '#8fd3ff'); bowl(510, 830, 2.1, {face: 'angry', mouth: talk(ln, 'fish')}); RH.bigText('จำได้เป็นเดือน!', 510, 1150, 90, '#ff9f1c', prog(lt, ln.dur * 0.6, ln.dur * 0.75)); },
  brain(lt, ln) { RH.bg.studio('#efe3ff', '#dcc8ff'); RH.bigText('สมองจำชั่วคราว', 510, 400, 84, '#b38cff', prog(lt, 0, 0.4)); ctx.save(); ctx.translate(510, 830);
    for (const [a, b, r] of [[-150, -40, 120], [-40, -100, 130], [100, -70, 120], [170, 40, 100], [-140, 80, 100], [20, 60, 130]]) { ctx.beginPath(); ctx.arc(a, b, r, 0, Math.PI * 2); ctx.fillStyle = RH.K; ctx.fill(); }
    for (const [a, b, r] of [[-150, -40, 112], [-40, -100, 122], [100, -70, 112], [170, 40, 92], [-140, 80, 92], [20, 60, 122]]) { ctx.beginPath(); ctx.arc(a, b, r, 0, Math.PI * 2); ctx.fillStyle = '#ffb3cf'; ctx.fill(); }
    const cols = [NC.pink, NC.yel, NC.blue, NC.grn]; for (let i = 0; i < 4; i++) note(-150 + i * 100, -20 + (i % 2) * 70, 0.5, cols[i], String(i + 1), (i - 1.5) * 0.1, prog(lt, 0.6 + i * 0.4, 0.9 + i * 0.4)); ctx.restore();
    const k = prog(lt, ln.dur * 0.55, ln.dur * 0.7), out = prog(lt, ln.dur * 0.7, ln.dur * 0.95); note(lerp(1000, 760, k), 700, 0.5, '#ff6b6b', 'ใหม่!', 0.2, k);
    if (out > 0) { ctx.save(); ctx.globalAlpha = 1 - out; note(360 - out * 400, 810 + out * 300, 0.5, NC.pink, '1', -out * 3, 1); ctx.restore(); } },
  tip_write(lt, ln) { pastel(); RH.bigText('จดออกจากหัว', 510, 400, 96, '#ff8fc1', prog(lt, 0, 0.4)); const n = [[-300, -120, NC.yel, 'อีเมล', -0.1], [-300, 60, NC.blue, 'บัญชี', 0.08], [300, -120, NC.pink, 'ห้องประชุม', 0.1]];
    monitor(510, 830, 1.0, n.map((v, i) => [...v, prog(lt, ln.dur * (0.5 + i * 0.12), ln.dur * (0.58 + i * 0.12))])); RH.bubble('1 แผ่น = 1 งาน', 510, 1180, prog(lt, ln.dur * 0.3, ln.dur * 0.45), {size: 56, fill: '#fff6c0'}); },
  tip_color(lt, ln) { RH.bg.studio('#fff7d1', '#ffeaa0'); RH.bigText('แยกสีตามความด่วน', 510, 400, 84, '#ff6b6b', prog(lt, 0, 0.4));
    [[NC.pink, 'ด่วนมาก', 0.22], [NC.yel, 'ทำวันนี้', 0.5], [NC.blue, 'สัปดาห์นี้', 0.78]].forEach(([c, l, a], i) => note(250 + i * 260, 800 + (i % 2) * 60, 1.15, c, l, (i - 1) * 0.08, prog(lt, ln.dur * (a - 0.1), ln.dur * a))); },
  tip_done(lt, ln) { pastel(); RH.bigText('เสร็จแล้ว ขยำทิ้ง!', 510, 400, 90, '#7bd389', prog(lt, 0, 0.4)); const k = prog(lt, ln.dur * 0.3, ln.dur * 0.55), fly = prog(lt, ln.dur * 0.6, ln.dur * 0.85);
    ctx.beginPath(); ctx.moveTo(700, 1050); ctx.lineTo(920, 1050); ctx.lineTo(890, 1300); ctx.lineTo(730, 1300); ctx.closePath(); ctx.fillStyle = '#7d8597'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
    if (fly <= 0) { ctx.save(); ctx.translate(330, 820); ctx.scale(lerp(1.2, 0.35, k), lerp(1.2, 0.35, k)); ctx.rotate(k * 3); note(0, 0, 1, NC.yel, k > 0.3 ? '' : 'อีเมล เสร็จ', 0, 1); if (k > 0.3) for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-80 + i * 30, -80); ctx.lineTo(-60 + i * 25, 80); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.stroke(); } ctx.restore(); }
    else if (fly < 1) { const x = lerp(330, 810, fly), y = 820 - Math.sin(fly * Math.PI) * 380 + fly * 230; ctx.beginPath(); ctx.arc(x, y, 50, 0, Math.PI * 2); ctx.fillStyle = NC.yel; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = RH.K; ctx.stroke(); }
    else { RH.bigText('ลงถัง!', 810, 900, 80, '#fff', prog(lt, ln.dur * 0.85, ln.dur * 0.95)); RH.sparkle(810, 1100, 150, 6); } },
  week(lt, ln) { pastel(); const base = [[-300, -120, NC.yel, '', -0.1], [-300, 60, NC.blue, '', 0.08], [300, -120, NC.pink, '', 0.1], [300, 60, NC.grn, '', -0.06], [-120, -150, NC.yel, '', 0.05], [120, -150, NC.blue, '', -0.05]];
    monitor(510, 760, 0.85, base.map((v, i) => [...v, 1 - prog(lt, ln.dur * (0.35 + i * 0.09), ln.dur * (0.4 + i * 0.09))])); RH.person(510, 1080, 0.75, P(MIND, {face: 'happy', pose: 'type'}));
    RH.bubble('7 วันต่อมา', 510, 420, prog(lt, 0, 0.4), {size: 60, fill: '#ffe15c'}); },
  praise(lt, ln) { pastel(); RH.person(260, 990, 0.95, P(PUM, {face: 'happy', pose: ln.who === 'pum' ? 'point' : 'cheer', mouth: talk(ln, 'pum')}));
    RH.person(620, 1000, 0.95, P(MIND, {face: ln.who === 'fish' ? 'shock' : 'happy', pose: 'cheer', flip: true, mouth: talk(ln, 'mind')})); bowl(870, 1250, 0.6, {flip: true, jump: ln.who === 'fish', face: ln.who === 'fish' ? 'angry' : 'happy', mouth: talk(ln, 'fish')});
    if (ln.who !== 'pum') RH.confetti(40); if (ln.who === 'fish') RH.bigText('เฮ้ย!', 760, 520, 120, '#ff9f1c', prog(T - ln.start, 0, 0.3)); },
  cta(lt, ln) { RH.bg.studio('#ffd6ea', '#ffb8d9'); const k = E.back(prog(lt, 0, 0.5)); ctx.save(); ctx.translate(510, 820); ctx.scale(k, k); [NC.blue, NC.grn, NC.yel, NC.pink].forEach((c, i) => note(-150 + i * 100, -i * 30, 1.0, c, i === 3 ? 'เตือนความจำ' : '', (i - 1.5) * 0.15, 1)); ctx.restore(); RH.sparkle(510, 820, 340, 10);
    RH.bigText('กระดาษโน้ตกาว', 510, 420, 96, '#fff', prog(lt, 0.2, 0.6)); const b = prog(lt, ln.dur * 0.5, ln.dur * 0.75); if (b > 0) { ctx.save(); ctx.translate(510, 1180); ctx.scale(E.back(b), E.back(b)); RH.basket(0, 0, 0.6); ctx.restore(); } },
};

window.EP = {font: 'K', scenes: SCENES, sceneTime: true, xfade: 0.25,
  sub: {mode: 'words', y: 1330, size: 104, chunk: 5, hl: '#ffe15c'},
  camera(name, lt, ln) { const s = 1 + 0.05 * E.out(prog(lt, 0, ln.dur)); const pk = 1 + 0.04 * (1 - E.out(prog(lt, 0, 0.25))); ctx.translate(540, 960); ctx.scale(s * pk, s * pk); ctx.translate(-540, -960); },
  intro(t) { RH.bg.studio('#ffd6ea', '#ffb8d9'); RH.bigText('ปลาทองประจำออฟฟิศ', 510, 900, 100, '#ff9f1c', prog(t, 0, 0.3)); },
  overlay(t, ln) { if (ln && (ln.scene === 'cta' || ln.scene === 'title')) return; ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.roundRect(150, 200, 720, 96, 48); ctx.fill(); ctx.restore(); txt('มายด์ ปลาทองประจำออฟฟิศ', 510, 250, 50, '#fff', {f: 'K', w: 800}); },
  outroGap: 0.5,
  outro(k) { ctx.fillStyle = `rgba(255,184,217,${E.inOut(k)})`; ctx.fillRect(0, 0, W, H); },
  endCard(k) { RH.bg.studio('#ffd6ea', '#ffb8d9'); ctx.save(); ctx.globalAlpha = k; [NC.blue, NC.yel, NC.pink].forEach((c, i) => note(380 + i * 130, 760 - i * 20, 0.9, c, '', (i - 1) * 0.15, 1)); RH.bigText('กระดาษโน้ตกาวสีสด', 510, 1000, 86, '#fff'); RH.bigText('อยู่ในตะกร้าด้านล่าง', 510, 1130, 70, '#e63946'); RH.basket(510, 1330, 0.6); ctx.restore(); },
};
