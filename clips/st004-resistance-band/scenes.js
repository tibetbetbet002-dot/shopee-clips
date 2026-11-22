// เรื่องยาว #04 หนุ่มหลังพัง VS ป้าจิตสายแข็ง — สวนสาธารณะ ปฏิทินพลิก "วันที่ N" (ยางยืดออกกำลังกาย)
const KENG = {outfit: '#3a86ff', hair: 'neat', hairCol: '#222', glasses: true, collar: true, tie: '#1d3557'};
const JIT = {outfit: '#ff5fa2', hair: 'curly', hairCol: '#c9c9c9', pattern: 'stripe', belt: false, blush: true};
const P = (b, o) => Object.assign({}, b, o);
const talk = (ln, who) => (ln.who === who ? 0.3 + 0.7 * Math.abs(Math.sin(T * 17)) : 0);
const BAND = '#ff7a1a';

function calendar(n, lt, x = 510, y = 560) { const k = prog(lt, 0.05, 0.5); if (k <= 0) return; const flip = E.out(prog(lt, 0.3, 0.8)); ctx.save(); ctx.translate(x, y); ctx.scale(E.back(k), E.back(k)); ctx.rotate(0.04);
  ctx.beginPath(); ctx.roundRect(-200, -200, 400, 400, 30); RH.shade(() => { ctx.fillStyle = '#fff'; ctx.fill(); }); ctx.lineWidth = 10; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.roundRect(-200, -200, 400, 400, 30); ctx.clip(); ctx.fillStyle = '#e63946'; ctx.fillRect(-200, -200, 400, 110); ctx.restore(); ctx.beginPath(); ctx.moveTo(-200, -90); ctx.lineTo(200, -90); ctx.stroke();
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.roundRect(sd * 110 - 14, -230, 28, 70, 14); ctx.fillStyle = '#555'; ctx.fill(); ctx.stroke(); }
  txt('วันที่', 0, -142, 56, '#fff', {f: 'K', w: 800}); ctx.font = '800 190px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = RH.K; ctx.fillText(String(n), 0, 70);
  if (flip < 1) { ctx.save(); ctx.beginPath(); ctx.rect(-200, -90, 400, 290); ctx.clip(); ctx.translate(0, -90); ctx.scale(1, 1 - flip); ctx.fillStyle = '#f4f4f4'; ctx.fillRect(-200, 0, 400, 290); ctx.lineWidth = 6; ctx.strokeRect(-200, 0, 400, 290); ctx.restore(); }
  ctx.restore(); }
function park() { RH.bg.meadow(); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(200 + i * 330, 1480, 110, 26, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.06)'; ctx.fill(); } }
function band(x1, y1, x2, y2, tension = 0) { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + lerp(60, 0, tension); ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2);
  ctx.lineWidth = lerp(30, 18, tension) + 10; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.lineWidth = lerp(30, 18, tension); ctx.strokeStyle = BAND; ctx.stroke(); ctx.restore(); }
function bandLoop(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 150, 90, 0.3, 0, Math.PI * 2); ctx.lineWidth = 46; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.lineWidth = 34; ctx.strokeStyle = BAND; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 150, 90, 0.3, 3.6, 4.4); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.stroke(); ctx.restore(); }
function hands(x, y, s, a0, a1) { const L = 156; return [x + s * (-112 - L * Math.sin(a0)), y + s * (60 + L * Math.cos(a0)), x + s * (112 - L * Math.sin(a1)), y + s * (60 + L * Math.cos(a1))]; }
function painDot(x, y, lab, k) { if (k <= 0) return; const r = 40 + Math.sin(T * 8) * 8; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,40,40,0.45)'; ctx.fill(); ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fillStyle = '#e63946'; ctx.fill(); RH.bubble(lab, x + 190, y, k, {size: 40, fill: '#ffd6d6'}); }
function alarmClock(x, y, s, ring) { ctx.save(); ctx.translate(x + (ring ? Math.sin(T * 60) * 6 : 0), y); ctx.scale(s, s); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 80, -100, 40, 0, Math.PI * 2); ctx.fillStyle = '#ffd23f'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, 0, 130, 0, Math.PI * 2); RH.shade(() => { ctx.fillStyle = '#e63946'; ctx.fill(); }); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 100, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -70); ctx.moveTo(0, 0); ctx.lineTo(50, 0); ctx.lineWidth = 10; ctx.stroke(); if (ring) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(0, 0, 170, sd > 0 ? -0.6 : Math.PI - 0.4, sd > 0 ? 0.4 : Math.PI + 0.6); ctx.lineWidth = 8; ctx.stroke(); } ctx.restore(); }

const SCENES = {
  intro_keng(lt, ln) { RH.bg.office({}); RH.chair(430, 1330, 1.1); RH.person(430, 960, 1.05, P(KENG, {face: 'tired', pose: 'type', rot: 0.18})); RH.desk(500, 1190, 760, {lx: 240});
    RH.bubble('นั่ง 10 ชม./วัน', 510, 470, prog(lt, ln.dur * 0.25, ln.dur * 0.45), {size: 56, fill: '#ffd23f'}); RH.bigText('อายุหลัง 70', 760, 720, 70, '#ff6b6b', prog(lt, ln.dur * 0.7, ln.dur * 0.85)); },
  pen(lt, ln) { RH.bg.office({}); const k = E.inOut(prog(lt, 0, ln.dur * 0.6)); RH.person(500, 1000, 1.05, P(KENG, {face: k > 0.9 ? 'shock' : 'neutral', pose: 'point', rot: lerp(0, 0.85, k), mouth: talk(ln, 'keng'), bob: false}));
    ctx.save(); ctx.translate(720, 1420); ctx.rotate(0.3); ctx.beginPath(); ctx.roundRect(-70, -10, 140, 20, 10); ctx.fillStyle = '#3a86ff'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.restore();
    const c = prog(lt, ln.dur * 0.6, ln.dur * 0.75); if (c > 0) { RH.bigText('กร๊อบ!', 520, 560, 140, '#ff3b3b', c); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(560 + i * 40, 800); ctx.lineTo(590 + i * 40, 760); ctx.lineTo(570 + i * 40, 740); ctx.lineTo(600 + i * 40, 700); ctx.lineWidth = 8; ctx.strokeStyle = '#ff3b3b'; ctx.stroke(); } } },
  intro_jit(lt, ln) { park(); const kick = Math.max(0, Math.sin(T * 3)) * 2.1; RH.person(500, 980, 1.05, P(JIT, {face: 'happy', pose: 'cheer', kick, bob: false})); if (kick > 1.8) RH.sparkle(700, 900, 120, 6);
    RH.bubble('อายุ 60', 760, 520, prog(lt, ln.dur * 0.2, ln.dur * 0.4), {size: 60, fill: '#ff5fa2', col: '#fff'}); },
  meet(lt, ln) { park(); RH.person(300, 1010, 0.95, P(KENG, {face: 'sad', pose: 'walk', rot: 0.3})); RH.person(760, 1000, 0.95, P(JIT, {face: 'smug', pose: 'point', flip: true, mouth: talk(ln, 'jit')}));
    RH.bubble('กุ้งแห้ง!', 300, 560, prog(lt, ln.dur * 0.65, ln.dur * 0.8), {size: 64, fill: '#ffb38a'}); },
  posture(lt, ln) { RH.bg.studio('#ffe1e1', '#ffc9c9'); RH.bigText('นั่งนานเกิน 1 ชม.', 510, 400, 84, '#ff3b3b', prog(lt, 0, 0.4)); RH.chair(330, 1290, 1.0); RH.person(380, 950, 1.0, P(KENG, {face: 'tired', pose: 'sit', rot: 0.3, bob: false}));
    painDot(450, 820, 'ไหล่ห่อ', prog(lt, ln.dur * 0.55, ln.dur * 0.7)); painDot(350, 950, 'หลังตึง', prog(lt, ln.dur * 0.2, ln.dur * 0.35)); painDot(300, 1150, 'สะโพกตึง', prog(lt, ln.dur * 0.3, ln.dur * 0.45)); },
  gift(lt, ln) { RH.bg.studio('#fff0a8', '#ffd866'); RH.person(330, 1000, 1.0, P(JIT, {face: 'happy', pose: 'hold', mouth: talk(ln, 'jit'), prop: () => bandLoop(40, 40, 0.6)}));
    RH.person(780, 1020, 0.95, P(KENG, {face: 'shock', pose: 'stand', flip: true})); RH.sparkle(430, 1010, 120, 6); RH.bigText('ยางยืด', 510, 440, 110, BAND, prog(lt, ln.dur * 0.2, ln.dur * 0.4)); },
  day1(lt, ln) { park(); calendar(1, lt); RH.person(330, 1120, 0.7, P(JIT, {face: 'happy', pose: 'wave'})); RH.person(700, 1120, 0.7, P(KENG, {face: 'determined', pose: 'stand', flip: true})); },
  demo(lt, ln) { park(); const ph = (Math.sin(T * 2.4) + 1) / 2; const a0 = lerp(2.75, 1.57, ph), a1 = -a0; const x = 510, y = 980, s = 1.1;
    RH.person(x, y, s, P(JIT, {face: ph > 0.8 ? 'determined' : 'happy', arms: [a0, a1], mouth: talk(ln, 'jit'), bob: false})); const [x1, y1, x2, y2] = hands(x, y, s, a0, a1); band(x1, y1, x2, y2, ph);
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sd * 50 * s, y + 80 * s, 20 * ph, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.0)'; ctx.fill(); }
    const reps = Math.min(15, Math.floor((T * 2.4 + Math.PI / 2) / (Math.PI * 2)) % 16); RH.bubble(`${Math.max(1, reps)}/15`, 820, 560, 1, {size: 64, fill: '#7bd389'}); RH.bigText('บีบสะบัก', 510, 430, 96, '#fff', prog(lt, ln.dur * 0.45, ln.dur * 0.6)); },
  timer(lt, ln) { RH.bg.office({}); const up = lt > ln.dur * 0.55; RH.chair(560, 1340, 1.1); RH.person(560, up ? 950 : 1010, 1.0, P(KENG, {face: up ? 'happy' : 'neutral', pose: up ? 'cheer' : 'type'}));
    alarmClock(240, 640, 0.8, lt > ln.dur * 0.25 && lt < ln.dur * 0.6); RH.bubble('ทุก 1 ชม. ลุก 2-3 นาที', 560, 430, prog(lt, ln.dur * 0.3, ln.dur * 0.45), {size: 48, fill: '#fff6c0'}); },
  day10(lt, ln) { RH.bg.office({}); if (lt < 1.4) { calendar(10, lt); return; } const k = E.inOut(prog(lt, 1.4, ln.dur * 0.7)); RH.person(500, 1000, 1.05, P(KENG, {face: 'happy', pose: 'point', rot: lerp(0, 0.5, Math.sin(k * Math.PI)), bob: false})); mark(); function mark() { RH.bubble('ไม่ปวด!', 760, 560, prog(lt, ln.dur * 0.6, ln.dur * 0.75), {size: 64, fill: '#7bd389'}); } },
  day30(lt, ln) { park(); if (lt < 1.4) { calendar(30, lt); return; } RH.person(300, 1000, 0.95, P(KENG, {face: 'determined', pose: 'point'})); RH.person(760, 1000, 0.95, P(JIT, {face: 'smug', pose: 'stand', flip: true}));
    ctx.save(); ctx.translate(530, 760); ctx.rotate(-0.12); RH.bigText('VS', 0, 0, 150, '#ff3b3b', prog(lt, 1.6, 2.0)); ctx.restore(); },
  duel(lt, ln) { park(); const kk = ln.who === 'keng' && lt < 4 ? Math.max(0, Math.sin(T * 3)) * 1.0 : 0.2, kj = ln.who !== 'keng' || lt > 4 ? Math.max(0, Math.sin(T * 3 + 1)) * 2.2 : 0;
    RH.person(300, 990, 0.95, P(KENG, {face: ln.scene && T - ln.start > 0 && ln.who === 'keng' && lt > 4 ? 'happy' : 'determined', pose: 'cheer', kick: kk, mouth: talk(ln, 'keng'), bob: false}));
    RH.person(760, 990, 0.95, P(JIT, {face: 'happy', pose: 'cheer', kick: kj, flip: true, mouth: talk(ln, 'jit'), bob: false})); if (lt > 4) RH.confetti(40); },
  cta(lt, ln) { RH.bg.studio('#ffd9b3', '#ffb37a'); const k = E.back(prog(lt, 0, 0.5)); bandLoop(510, 800, 1.6 * k); RH.sparkle(510, 800, 340, 10);
    RH.bigText('ยางยืดออกกำลังกาย', 510, 420, 90, '#fff', prog(lt, 0.2, 0.6)); const b = prog(lt, ln.dur * 0.3, ln.dur * 0.45); if (b > 0) { ctx.save(); ctx.translate(510, 1150); ctx.scale(E.back(b), E.back(b)); RH.basket(0, 0, 0.6); ctx.restore(); } },
};

window.EP = {font: 'K', scenes: SCENES, sceneTime: true, xfade: 0.25,
  sub: {mode: 'words', y: 1330, size: 104, chunk: 5, hl: '#ffd23f'},
  camera(name, lt, ln) { const s = 1 + 0.05 * E.out(prog(lt, 0, ln.dur)); const pk = 1 + 0.04 * (1 - E.out(prog(lt, 0, 0.25))); ctx.translate(540, 960); ctx.scale(s * pk, s * pk); ctx.translate(-540, -960); },
  intro(t) { park(); RH.bigText('หลังพัง VS ป้าจิต', 510, 900, 110, '#fff', prog(t, 0, 0.3)); },
  overlay(t, ln) { if (ln && ln.scene === 'cta') return; ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.roundRect(150, 200, 720, 96, 48); ctx.fill(); ctx.restore(); txt('หนุ่มหลังพัง VS ป้าจิต', 510, 250, 50, '#fff', {f: 'K', w: 800}); },
  outroGap: 0.5,
  outro(k) { ctx.fillStyle = `rgba(255,179,122,${E.inOut(k)})`; ctx.fillRect(0, 0, W, H); },
  endCard(k) { RH.bg.studio('#ffd9b3', '#ffb37a'); ctx.save(); ctx.globalAlpha = k; bandLoop(510, 760, 1.2); RH.bigText('ยางยืดออกกำลังกาย', 510, 1000, 86, '#fff'); RH.bigText('อยู่ในตะกร้าด้านล่าง', 510, 1130, 70, '#e63946'); RH.basket(510, 1330, 0.6); ctx.restore(); },
};
