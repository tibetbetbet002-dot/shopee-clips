// เรื่องยาว #02 ต้น VS ฟ้า แข่งชิงตำแหน่ง 7 วัน — สไตล์หัวกลม ฉากสดใส ซับใหญ่ทีละคำ (โคมไฟตั้งโต๊ะ)
const TON = {outfit:'#ff9f43', hair:'spiky', hairCol:'#1d1d1d', badge:'#3ec1d3', collar:true};
const FAH = {outfit:'#6fd6c6', hair:'pony', hairCol:'#3b2418', collar:true, badge:'#ffd23f'};
const BOSS = {outfit:'#2b3a67', hair:'bald', mustache:true, hairCol:'#555', tie:'#e74c3c', collar:true};
const P = (base, o) => Object.assign({}, base, o);
const talk = (ln, who) => (ln.who === who ? (0.3 + 0.7 * Math.abs(Math.sin(T * 17))) * (T - ln.start < ln.dur ? 1 : 0) : 0);

function lamp(x, y, s = 1, on = true, glow = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (on) { ctx.save(); ctx.globalAlpha = 0.55 * glow; const g = ctx.createRadialGradient(150, -250, 10, 150, 0, 520); g.addColorStop(0, 'rgba(255,236,160,0.95)'); g.addColorStop(1, 'rgba(255,236,160,0)');
    ctx.beginPath(); ctx.moveTo(110, -250); ctx.lineTo(-120, 120); ctx.lineTo(560, 120); ctx.lineTo(210, -250); ctx.closePath(); ctx.fillStyle = g; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 0, 90, 22, 0, 0, Math.PI * 2); RH.shade(() => { ctx.fillStyle = '#ff6b6b'; ctx.fill(); }); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(-40, -200); ctx.lineTo(120, -300); ctx.lineWidth = 16; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#ff6b6b'; ctx.stroke();
  for (const [a, b] of [[0, -10], [-40, -200]]) { ctx.beginPath(); ctx.arc(a, b, 14, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = RH.K; ctx.stroke(); }
  ctx.save(); ctx.translate(120, -300); ctx.rotate(0.5); ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(50, 0); ctx.lineTo(90, 90); ctx.lineTo(-90, 90); ctx.closePath(); ctx.fillStyle = '#ff6b6b'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 92, 88, 14, 0, 0, Math.PI * 2); ctx.fillStyle = on ? '#fff6c0' : '#bbb'; ctx.fill(); ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  ctx.restore();
}
function darkRoom() { bgFill('#12142b'); for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(255,255,255,0.025)'; ctx.fillRect(i * 140, 0, 70, 1160); } ctx.fillStyle = '#0b0c1d'; ctx.fillRect(-300, 1160, W + 600, 900); }
function screenGlow(x, y, r = 520, col = 'rgba(120,200,255,0.55)') { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
function warmRoom() { RH.bg.room({wall: '#ffe7c4', floor: '#d39a66'}); ctx.save(); ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.roundRect(120, 300, 300, 380, 20); ctx.fillStyle = '#9ad0ff'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.restore();
  ctx.beginPath(); ctx.moveTo(270, 300); ctx.lineTo(270, 680); ctx.moveTo(120, 490); ctx.lineTo(420, 490); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke(); }
function nightOffice(k) { RH.bg.office({night: true}); RH.desk(300, 1180, 420, {screen: '#7fb8ff'}); RH.desk(800, 1180, 420, {screen: '#7fb8ff'}); RH.scroll(SC_DAY, k, 620); }
let SC_DAY = '';
function dayCard(t, lt, ln) { SC_DAY = t; nightOffice(prog(lt, 0.05, 0.6)); }
function eye(x, y, r, pupil, label, col) { ctx.save(); ctx.translate(x, y); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.62, 0, 0, Math.PI * 2); RH.shade(() => { ctx.fillStyle = '#fff'; ctx.fill(); }); ctx.lineWidth = 9; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2); ctx.fillStyle = '#6b8e4e'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, r * 0.5 * pupil, 0, Math.PI * 2); ctx.fillStyle = RH.K; ctx.fill(); ctx.beginPath(); ctx.arc(-r * 0.16, -r * 0.16, r * 0.08, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
  ctx.restore(); RH.bigText(label, x, y + r * 0.62 + 80, 58, col); }

const SCENES = {
  versus(lt, ln) { RH.split(() => RH.bg.studio('#ffb36b', '#ff9f43'), () => RH.bg.studio('#9ae6db', '#6fd6c6'));
    const k1 = E.out(prog(lt, 0, 0.6)), k2 = E.out(prog(lt, 0.3, 0.9));
    RH.person(lerp(-200, 270, k1), 980, 1.0, P(TON, {face: 'determined', pose: 'point', mouth: 0}));
    RH.person(lerp(1280, 810, k2), 980, 1.0, P(FAH, {face: 'smug', pose: 'wave', flip: true}));
    RH.bigText('ต้น', 270, 560, 110, '#fff', prog(lt, 0.5, 0.9)); RH.bigText('ฟ้า', 810, 560, 110, '#fff', prog(lt, 0.7, 1.1));
    const v = prog(lt, 1.0, 1.4); ctx.save(); ctx.translate(540, 900); ctx.rotate(-0.12 + Math.sin(T * 6) * 0.03); RH.bigText('VS', 0, 0, 220, '#ff3b3b', v); ctx.restore(); },
  boss(lt, ln) { RH.bg.office({}); RH.person(540, 1000, 1.15, P(BOSS, {face: 'determined', pose: 'point', mouth: talk(ln, 'boss')}));
    RH.bubble('บรรจุ 1 ตำแหน่ง!', 510, 470, prog(lt, 0.3, 0.8), {size: 60, fill: '#ffd23f', tail: 0});
    const k = prog(lt, ln.dur * 0.55, ln.dur * 0.75); if (k > 0) { ctx.save(); ctx.translate(780, 700); ctx.rotate(-0.25); RH.bigText('7 วัน', 0, 0, 120, '#ff3b3b', k); ctx.restore(); } },
  day1(lt, ln) { dayCard('วันที่ 1', lt, ln); },
  ton_dark(lt, ln) { darkRoom(); RH.person(450, 940, 1.15, P(TON, {face: 'smug', pose: 'type', mouth: talk(ln, 'ton')}));
    RH.desk(540, 1180, 760, {lx: 230, screen: '#bfe6ff'}); screenGlow(770, 1060, 620); screenGlow(450, 860, 300, 'rgba(120,200,255,0.25)');
    RH.bubble('สมาธิ 100%', 620, 560, prog(lt, 0.8, 1.2), {size: 48, tail: -1}); },
  fah_lamp(lt, ln) { warmRoom(); const on = lt > 0.5; RH.person(560, 940, 1.15, P(FAH, {face: 'happy', pose: 'type', mouth: talk(ln, 'fah')}));
    RH.desk(540, 1180, 760, {lx: 230, screen: '#d8f3ff'}); lamp(210, 1180, 1.0, on); if (lt > 0.5 && lt < 0.8) { ctx.fillStyle = 'rgba(255,250,210,0.5)'; ctx.fillRect(0, 0, W, H); } },
  day3(lt, ln) { dayCard('วันที่ 3', lt, ln); },
  ton_blur(lt, ln) { darkRoom(); ctx.save(); ctx.translate(Math.sin(T * 40) * 3, 0);
    RH.person(450, 940, 1.15, P(TON, {face: 'tired', redEyes: true, sweat: true, pose: lt > ln.dur * 0.5 ? 'facepalm' : 'type', mouth: talk(ln, 'ton')})); ctx.restore();
    RH.desk(540, 1180, 760, {lx: 230, screen: '#bfe6ff'}); screenGlow(770, 1060, 620);
    ctx.save(); ctx.filter = `blur(${4 + Math.sin(T * 3) * 3}px)`; for (let r = 0; r < 4; r++) txt(['1,250', '3,870', '9,4?1', '7,0?8'][r], 770, 1010 + r * 36, 30, '#123', {f: 'K'}); ctx.restore();
    for (let i = 0; i < 3; i++) { const a = -0.6 + i * 0.6; ctx.save(); ctx.translate(450 + Math.sin(a) * 220, 760 - Math.cos(a) * 220); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(14, -30); ctx.lineTo(-6, -40); ctx.lineTo(10, -76); ctx.lineWidth = 8; ctx.strokeStyle = '#ffd23f'; ctx.stroke(); ctx.restore(); } },
  eye_fact(lt, ln) { RH.bg.studio('#c9f0ff', '#a8e4ff'); const ph = (Math.sin(T * 2.6) + 1) / 2;
    RH.bigText('ทำไมตาล้า?', 510, 400, 110, '#ffd23f', prog(lt, 0, 0.4));
    eye(300, 760, 200, 0.85, 'ห้องมืด', '#9ab0ff'); eye(780, 760, 200, 0.3, 'จอสว่าง', '#ffffff');
    ctx.save(); ctx.translate(540, 760); ctx.rotate(T * 2); for (let i = 0; i < 2; i++) { ctx.rotate(Math.PI); ctx.beginPath(); ctx.arc(0, 0, 60, 0.3, 2.4); ctx.lineWidth = 12; ctx.strokeStyle = '#ff6b6b'; ctx.stroke(); } ctx.restore();
    eye(540, 1180, 150, lerp(0.3, 0.85, ph), 'สลับไปมาทั้งวัน = ล้า', '#ff6b6b'); },
  day5(lt, ln) { if (lt < 1.4) { dayCard('วันที่ 5', lt, ln); return; }
    RH.split(() => { darkRoom(); RH.person(270, 1000, 0.8, P(TON, {face: 'sleepy', pose: 'sit', headTilt: 0.5, bob: false})); RH.desk(270, 1160, 480, {lx: 90, screen: '#bfe6ff'}); RH.zzz(330, 760); screenGlow(360, 1080, 300); },
      () => { warmRoom(); RH.person(810, 1000, 0.8, P(FAH, {face: 'happy', pose: 'type'})); RH.desk(810, 1160, 480, {lx: 90, screen: '#d8f3ff'}); lamp(640, 1160, 0.7, true); }, 'หลับ', 'ตาใส'); },
  ton_ask(lt, ln) { RH.bg.office({}); RH.person(330, 1000, 1.05, P(TON, {face: 'shock', pose: 'point', mouth: talk(ln, 'ton')}));
    RH.person(820, 1020, 0.95, P(FAH, {face: 'neutral', pose: 'shrug', flip: true})); RH.bubble('?!', 330, 560, prog(lt, 0.2, 0.5), {size: 90}); },
  reveal(lt, ln) { RH.bg.studio('#fff0a8', '#ffd866'); const k = E.back(prog(lt, 0.5, 1.1));
    RH.person(360, 1000, 1.05, P(FAH, {face: 'smug', pose: 'point', mouth: talk(ln, 'fah')}));
    ctx.save(); ctx.translate(780, 1150); ctx.scale(k, k); lamp(0, 0, 1.25, true); ctx.restore(); if (k > 0.5) RH.sparkle(830, 860, 260, 8);
    RH.bigText('ความลับ!', 510, 420, 120, '#ff6b6b', prog(lt, ln.dur * 0.3, ln.dur * 0.5)); },
  tip_light(lt, ln) { warmRoom(); ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(0, 0, W, H);
    RH.bigText('เคล็ดลับ', 510, 400, 110, '#ffd23f', prog(lt, 0, 0.4));
    RH.person(600, 960, 1.0, P(FAH, {face: 'happy', pose: 'type', mouth: talk(ln, 'fah')})); RH.desk(540, 1180, 820, {laptop: false}); lamp(170, 1180, 1.0, true);
    ctx.save(); ctx.translate(700, 1166); ctx.rotate(-0.05); ctx.fillStyle = '#fff'; ctx.fillRect(-100, -14, 200, 14); ctx.restore();
    const k1 = prog(lt, ln.dur * 0.15, ln.dur * 0.35), k2 = prog(lt, ln.dur * 0.55, ln.dur * 0.75);
    RH.bubble('รอบจอสว่างพอ ๆ กับจอ', 510, 540, k1, {size: 50, fill: '#fff6c0'});
    RH.bubble('เขียนมือขวา วางโคมซ้าย', 510, 680, k2, {size: 46, fill: '#c9f7ef'}); },
  tip_2020(lt, ln) { RH.bg.meadow(); RH.person(540, 1060, 0.95, P(TON, {face: 'happy', pose: 'stand', flip: true}));
    const items = [['20 นาที', 0.18, '#ff6b6b'], ['20 ฟุต', 0.42, '#3ec1d3'], ['20 วินาที', 0.66, '#ffd23f']];
    items.forEach(([t, a, c], i) => { RH.bubble(t, 510, 420 + i * 150, prog(lt, ln.dur * a, ln.dur * a + 0.35), {size: 64, fill: c}); }); },
  day6(lt, ln) { if (lt < 1.3) { dayCard('วันที่ 6', lt, ln); return; }
    darkRoom(); ctx.fillStyle = 'rgba(255,220,150,0.12)'; ctx.fillRect(0, 0, W, H);
    RH.person(560, 940, 1.15, P(TON, {face: 'determined', pose: 'type'})); RH.desk(540, 1180, 760, {lx: 230, screen: '#d8f3ff'}); lamp(210, 1180, 1.0, true); },
  day7(lt, ln) { RH.bg.office({}); RH.scroll('วันที่ 7', prog(lt, 0, 0.5), 420);
    const happy = lt > 0.6; RH.person(540, 980, 1.0, P(BOSS, {face: 'happy', pose: happy ? 'cheer' : 'stand', mouth: talk(ln, 'boss')}));
    RH.person(230, 1080, 0.85, P(TON, {face: 'happy', pose: happy ? 'cheer' : 'stand', mouth: talk(ln, 'ton')}));
    RH.person(850, 1080, 0.85, P(FAH, {face: 'happy', pose: happy ? 'cheer' : 'stand', flip: true}));
    if (happy) RH.confetti(); },
  cta(lt, ln) { RH.bg.studio('#ffe08a', '#ffc94a'); const k = E.back(prog(lt, 0, 0.5));
    ctx.save(); ctx.translate(470, 1020); ctx.scale(k, k); lamp(0, 0, 1.4, true); ctx.restore(); RH.sparkle(560, 760, 300, 10);
    RH.bigText('โคมไฟตั้งโต๊ะ', 510, 330, 100, '#fff', prog(lt, 0.2, 0.6)); RH.bigText('ถนอมสายตา', 510, 450, 92, '#ff6b6b', prog(lt, 0.4, 0.8));
    const b = prog(lt, ln.dur * 0.5, ln.dur * 0.75); if (b > 0) { ctx.save(); ctx.translate(250, 1180); ctx.scale(E.back(b), E.back(b)); RH.basket(0, 0, 0.6); ctx.restore(); } },
};

window.EP = {font: 'K', scenes: SCENES, sceneTime: true, xfade: 0.25,
  sub: {mode: 'words', y: 1330, size: 104, chunk: 5},
  camera(name, lt, ln) { const s = 1 + 0.05 * E.out(prog(lt, 0, ln.dur)); const pk = 1 + 0.04 * (1 - E.out(prog(lt, 0, 0.25)));
    ctx.translate(540, 960); ctx.scale(s * pk, s * pk); ctx.translate(-540, -960); },
  intro(t) { RH.bg.studio('#ffd166', '#ffb703'); RH.bigText('ต้น VS ฟ้า', 510, 900, 140, '#fff', prog(t, 0, 0.3)); },
  overlay(t, ln) { if (ln && ln.scene === 'cta') return; ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.roundRect(150, 200, 720, 96, 48); ctx.fill(); ctx.restore();
    txt('ต้น VS ฟ้า ชิงตำแหน่ง 7 วัน', 510, 250, 50, '#fff', {f: 'K', w: 800}); },
  outroGap: 0.5,
  outro(k) { ctx.fillStyle = `rgba(255,201,74,${E.inOut(k)})`; ctx.fillRect(0, 0, W, H); },
  endCard(k) { RH.bg.studio('#ffe08a', '#ffc94a'); ctx.save(); ctx.globalAlpha = k; lamp(440, 800, 1.0, true);
    RH.bigText('โคมไฟตั้งโต๊ะ', 510, 960, 92, '#fff'); RH.bigText('ถนอมสายตา', 510, 1080, 92, '#fff'); RH.bigText('อยู่ในตะกร้าด้านล่าง', 510, 1210, 70, '#ff6b6b'); RH.basket(510, 1380, 0.6); ctx.restore(); },
};
