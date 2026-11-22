// เรื่องยาว #02 ภูมิ นอนไม่หลับ 5 คืน — กลางคืนสีม่วง ฝูงแกะประท้วง (แว่นกรองแสงสีฟ้า)
const PHUM = {outfit: '#7b5cff', hair: 'beanie', capCol: '#ff5fa2', collar: false, belt: false, pattern: 'stripe'};
const MOM = {outfit: '#ff8fab', hair: 'curly', hairCol: '#5a3a2a', pattern: 'check', belt: false};
const P = (b, o) => Object.assign({}, b, o);
const talk = (ln, who) => (ln.who === who ? 0.3 + 0.7 * Math.abs(Math.sin(T * 17)) : 0);

function nightSky(top = '#1a1446', bot = '#4b2e83') { ctx.fillStyle = RH.g(0, H, top, bot); ctx.fillRect(-300, -300, W + 600, H + 600);
  for (let i = 0; i < 70; i++) { const tw = (Math.sin(T * 2 + i * 1.3) + 1) / 2; ctx.beginPath(); ctx.arc(hash(i) * W, hash(i * 2.1) * 1300, 2 + tw * 2.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${0.35 + tw * 0.6})`; ctx.fill(); } }
function moon(x, y, r) { ctx.save(); ctx.shadowColor = 'rgba(255,240,180,0.8)'; ctx.shadowBlur = 60; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = '#fff2b8'; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.arc(x + r * 0.45, y - r * 0.2, r * 0.85, 0, Math.PI * 2); ctx.fillStyle = 'rgba(40,30,90,0.0)'; ctx.fill(); for (const [a, b, c] of [[-0.3, 0.2, 0.18], [0.3, -0.3, 0.12], [0.2, 0.4, 0.1]]) { ctx.beginPath(); ctx.arc(x + a * r, y + b * r, c * r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(220,200,140,0.5)'; ctx.fill(); } }
function bedroom(dim = 0) { ctx.fillStyle = '#2c2a63'; ctx.fillRect(-300, -300, W + 600, H + 600); for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fillRect(i * 100, 0, 50, 1180); }
  ctx.save(); ctx.beginPath(); ctx.roundRect(560, 330, 360, 400, 24); ctx.clip(); nightSky(); moon(800, 450, 70); ctx.restore(); ctx.beginPath(); ctx.roundRect(560, 330, 360, 400, 24); ctx.lineWidth = 10; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(740, 330); ctx.lineTo(740, 730); ctx.lineWidth = 8; ctx.stroke(); ctx.fillStyle = '#1d1b45'; ctx.fillRect(-300, 1180, W + 600, 900);
  if (dim) { ctx.fillStyle = `rgba(5,5,20,${dim})`; ctx.fillRect(0, 0, W, H); } }
function clock(x, y, r, txt1, col = '#ff5f5f') { ctx.save(); ctx.translate(x, y); ctx.beginPath(); ctx.roundRect(-r * 1.4, -r * 0.7, r * 2.8, r * 1.4, 24); RH.shade(() => { ctx.fillStyle = '#222'; ctx.fill(); }); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.font = `800 ${r * 0.9}px K`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = col; ctx.shadowBlur = 20; ctx.fillStyle = col; ctx.fillText(txt1, 0, 6); ctx.restore(); }
function bed(x, y, sleeper) { ctx.save(); ctx.translate(x, y); ctx.beginPath(); ctx.roundRect(-380, -260, 60, 360, 20); RH.shade(() => { ctx.fillStyle = '#8b5a3c'; ctx.fill(); }); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); ctx.roundRect(-360, -40, 740, 110, 20); ctx.fillStyle = '#a46a46'; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-230, -70, 120, 50, 0, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.stroke();
  if (sleeper) sleeper(); ctx.beginPath(); ctx.moveTo(-120, -110); ctx.quadraticCurveTo(100, -150, 380, -90); ctx.lineTo(380, 0); ctx.lineTo(-130, 0); ctx.closePath(); ctx.fillStyle = '#5ec8ff'; ctx.fill(); ctx.stroke();
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-40 + i * 110, -60, 16, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill(); } ctx.restore(); }
function sheep(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s); if (o.rot) ctx.rotate(o.rot);
  for (const sd of [-60, -20, 30, 70]) { ctx.beginPath(); ctx.moveTo(sd, 40); ctx.lineTo(sd + (o.leap ? 20 : 0), 120); ctx.lineWidth = 12; ctx.strokeStyle = RH.K; ctx.stroke(); }
  const puffs = [[-80, 0], [-40, -40], [10, -50], [60, -30], [80, 10], [40, 40], [-20, 45], [-70, 35], [0, 0]];
  for (const [a, b] of puffs) { ctx.beginPath(); ctx.arc(a, b, 46, 0, Math.PI * 2); ctx.fillStyle = RH.K; ctx.fill(); } for (const [a, b] of puffs) { ctx.beginPath(); ctx.arc(a, b, 40, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); }
  ctx.save(); ctx.translate(110, -40); ctx.beginPath(); ctx.ellipse(0, 0, 52, 62, 0.2, 0, Math.PI * 2); ctx.fillStyle = '#4a4458'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = RH.K; ctx.stroke();
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 46, -30, 26, 12, sd * 0.5, 0, Math.PI * 2); ctx.fillStyle = '#4a4458'; ctx.fill(); ctx.stroke(); }
  const f = o.face || 'happy'; for (const sd of [-1, 1]) { ctx.beginPath(); if (f === 'tired') { ctx.moveTo(sd * 18 - 9, -6); ctx.lineTo(sd * 18 + 9, -6); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.stroke(); } else if (f === 'cry') { ctx.arc(sd * 18, -6, 9, 1.1 * Math.PI, 1.9 * Math.PI); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.stroke(); const ph = (T * 1.5 + sd) % 1; ctx.beginPath(); ctx.ellipse(sd * 18, 6 + ph * 40, 5, 8, 0, 0, Math.PI * 2); ctx.fillStyle = '#7cc8ff'; ctx.fill(); } else { ctx.arc(sd * 18, -6, 7, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); } }
  const m = o.mouth || 0; ctx.beginPath(); if (m > 0.1) ctx.ellipse(0, 26, 10, 4 + m * 12, 0, 0, Math.PI * 2); else ctx.arc(0, 18, 12, 0.15 * Math.PI, 0.85 * Math.PI); ctx.fillStyle = '#7a1f2a'; m > 0.1 ? ctx.fill() : (ctx.lineWidth = 5, ctx.strokeStyle = '#fff', ctx.stroke()); ctx.restore(); ctx.restore(); }
function fence(y) { ctx.fillStyle = '#7a4a2a'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.roundRect(330 + i * 120, y - 150, 34, 190, 8); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = RH.K; ctx.stroke(); }
  for (const yy of [y - 110, y - 40]) { ctx.beginPath(); ctx.roundRect(300, yy, 450, 30, 8); ctx.fillStyle = '#9a6238'; ctx.fill(); ctx.stroke(); } }
function phone(x, y, s, col = '#4fb3ff', inner) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-110, -200, 220, 400, 34); RH.shade(() => { ctx.fillStyle = '#222'; ctx.fill(); }); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.beginPath(); ctx.roundRect(-94, -180, 188, 360, 22); ctx.fillStyle = col; ctx.fill(); if (inner) { ctx.save(); ctx.clip(); inner(); ctx.restore(); } ctx.restore(); }
function specs(x, y, s, tint = 'rgba(255,190,80,0.45)') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.roundRect(sd * 95 - 75, -50, 150, 100, 36); ctx.fillStyle = tint; ctx.fill(); ctx.lineWidth = 14; ctx.strokeStyle = RH.K; ctx.stroke();
  ctx.save(); ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.moveTo(sd * 95 - 40, -30); ctx.lineTo(sd * 95 - 10, -30); ctx.lineWidth = 8; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-20, -10); ctx.quadraticCurveTo(0, -30, 20, -10); ctx.lineWidth = 12; ctx.strokeStyle = RH.K; ctx.stroke(); ctx.restore(); }
function blueRays(x0, y0, x1, y1, n = 5, k = 1) { for (let i = 0; i < n; i++) { const ph = (T * 1.2 + i / n) % 1; const x = lerp(x0, x1, ph * k), y = lerp(y0, y1, ph * k) + Math.sin(ph * 12 + i) * 18; ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fillStyle = '#4fb3ff'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.stroke(); } }
function roomWithBanner(t, lt) { bedroom(); bed(540, 1260, () => RH.head(-230, -150, 0.6, P(PHUM, {face: 'neutral'}))); RH.scroll(t, prog(lt, 0.05, 0.6), 460); }

const SCENES = {
  night1(lt, ln) { bedroom(); RH.person(420, 950, 1.1, P(PHUM, {face: lt < ln.dur * 0.6 ? 'determined' : 'happy', pose: lt < ln.dur * 0.6 ? 'type' : 'cheer'}));
    RH.desk(470, 1190, 760, {lx: 250, screen: lt < ln.dur * 0.8 ? '#ff6fd8' : '#111'}); clock(800, 840, 70, '01:00'); if (lt < ln.dur * 0.8) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(720, 1080, 0, 720, 1080, 500); g.addColorStop(0, 'rgba(255,100,220,0.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 500, W, 1100); ctx.restore(); }
    RH.scroll('คืนที่ 1', prog(lt, 0, 0.5), 440); },
  bed_awake(lt, ln) { bedroom(0.15); bed(540, 1260, () => RH.head(-230, -150, 0.7, P(PHUM, {face: 'shock', mouth: talk(ln, 'phum')}))); clock(260, 560, 80, lt < ln.dur * 0.5 ? '01:15' : '02:40');
    RH.bubble('ตาสว่าง!?', 360, 760, prog(lt, ln.dur * 0.5, ln.dur * 0.7), {size: 60, tail: -1}); },
  sheep_count(lt, ln) { nightSky('#24195a', '#7a4fb0'); RH.clouds(1250, 4, 6); ctx.fillStyle = '#6a58b8'; ctx.fillRect(-300, 1180, W + 600, 900); fence(1180);
    const big = ln.who === 'sheep'; if (!big) { for (let i = 0; i < 3; i++) { const ph = (T * 0.55 + i / 3) % 1; sheep(lerp(120, 920, ph), 1040 - Math.sin(ph * Math.PI) * 260, 0.7, {leap: true, rot: (ph - 0.5) * 0.5}); }
      RH.bigText('แกะตัวที่ ' + (200 + Math.floor(lt * 18)), 510, 480, 84, '#fff', prog(lt, 0.1, 0.5)); }
    else { sheep(480, 960, 2.1, {face: 'tired', mouth: talk(ln, 'sheep')}); RH.bubble('พักบ้าง!', 520, 470, prog(T - ln.start, 0.1, 0.4), {size: 70, fill: '#ffd23f'}); } },
  panda(lt, ln) { RH.bg.meadow(); RH.person(lerp(160, 600, E.inOut(prog(lt, 0, ln.dur))), 1040, 0.95, P(PHUM, {face: 'tired', panda: true, pose: 'walk'}));
    RH.bubble('สาย 30 นาที', 620, 520, prog(lt, ln.dur * 0.3, ln.dur * 0.5), {size: 60, fill: '#ff6b6b', col: '#fff'}); },
  kitchen(lt, ln) { RH.bg.room({wall: '#d6f5e3', floor: '#e8c9a0'}); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.roundRect(120 + i * 140, 380, 110, 110, 12); ctx.fillStyle = '#bfe9d3'; ctx.fill(); }
    const momTalk = ln.who === 'mom'; RH.person(300, 960, 1.05, P(MOM, {face: momTalk ? 'angry' : 'neutral', pose: momTalk ? 'point' : 'stand', mouth: talk(ln, 'mom')}));
    RH.person(720, 1000, 0.95, P(PHUM, {face: momTalk ? 'shock' : 'smug', panda: true, pose: 'shrug', flip: true, mouth: talk(ln, 'phum')})); },
  brain_fact(lt, ln) { RH.bg.studio('#bde4ff', '#9fd4ff'); RH.bigText('ทำไมนอนไม่หลับ?', 510, 380, 92, '#ffd23f', prog(lt, 0, 0.4));
    phone(240, 860, 0.9, '#4fb3ff', () => { ctx.beginPath(); ctx.arc(0, -40, 60, 0, Math.PI * 2); ctx.fillStyle = '#fff6b0'; ctx.fill(); }); blueRays(300, 860, 620, 800, 6);
    RH.head(720, 780, 0.9, P(PHUM, {face: 'shock', hair: 'tuft'})); RH.bubble('ยังกลางวันอยู่?', 720, 560, prog(lt, ln.dur * 0.2, ln.dur * 0.35), {size: 50});
    const k = prog(lt, ln.dur * 0.5, ln.dur * 0.9), lvl = lerp(0.85, 0.25, k); ctx.save(); ctx.translate(510, 1150); ctx.beginPath(); ctx.roundRect(-300, -40, 600, 80, 40); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = RH.K; ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-292, -32, 584 * lvl, 64, 32); ctx.fillStyle = '#9b7bff'; ctx.fill(); ctx.restore(); RH.bigText('ฮอร์โมนง่วงลดลง', 510, 1050, 56, '#fff', prog(lt, ln.dur * 0.45, ln.dur * 0.6)); },
  night3(lt, ln) { roomWithBanner('คืนที่ 3', lt); },
  tip_night(lt, ln) { bedroom(); const k = E.inOut(prog(lt, ln.dur * 0.35, ln.dur * 0.7)); const col = k < 0.5 ? '#4fb3ff' : '#ffa94d';
    phone(510, 820, 1.4, `rgb(${Math.round(lerp(79, 255, k))},${Math.round(lerp(179, 169, k))},${Math.round(lerp(255, 77, k))})`, () => { ctx.beginPath(); ctx.roundRect(-60, -30, 120, 60, 30); ctx.fillStyle = '#fff'; ctx.fill(); ctx.beginPath(); ctx.arc(lerp(-30, 30, k), 0, 24, 0, Math.PI * 2); ctx.fillStyle = k > 0.5 ? '#ff7a1a' : '#888'; ctx.fill(); });
    RH.bigText('ข้อ 1', 510, 400, 100, '#ffd23f', prog(lt, 0, 0.3)); RH.bigText('โหมดกลางคืน', 510, 1200, 76, col === '#ffa94d' ? '#ffa94d' : '#fff', prog(lt, 0.2, 0.5)); },
  tip_glasses(lt, ln) { RH.bg.studio('#ffe7a8', '#ffd36b'); RH.bigText('ข้อ 2', 510, 400, 100, '#ff6b6b', prog(lt, 0, 0.3));
    RH.person(510, 980, 1.2, P(PHUM, {face: 'smug', mouth: talk(ln, 'phum')})); const k = E.out(prog(lt, ln.dur * 0.2, ln.dur * 0.45)); specs(510, lerp(300, 884, k), 0.62);
    if (k >= 1) { RH.sparkle(510, 870, 230, 8); for (let i = 0; i < 4; i++) { const ph = (T + i / 4) % 1; ctx.beginPath(); ctx.arc(900 - ph * 260, 700 + i * 60 - ph * 40 + (ph > 0.5 ? (ph - 0.5) * 200 : 0), 12, 0, Math.PI * 2); ctx.fillStyle = '#4fb3ff'; ctx.fill(); } } },
  tip_hour(lt, ln) { const k = prog(lt, ln.dur * 0.5, ln.dur * 0.95); bedroom(lerp(0, 0.45, k)); RH.bigText('ข้อ 3', 510, 400, 100, '#7bd389', prog(lt, 0, 0.3));
    ctx.save(); ctx.translate(510, 820); ctx.beginPath(); ctx.arc(0, 0, 190, 0, Math.PI * 2); RH.shade(() => { ctx.fillStyle = '#fff'; ctx.fill(); }); ctx.lineWidth = 12; ctx.strokeStyle = RH.K; ctx.stroke();
    const a = prog(lt, 0.3, ln.dur * 0.6) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 170, -Math.PI / 2, -Math.PI / 2 + a); ctx.closePath(); ctx.fillStyle = 'rgba(123,211,137,0.7)'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a - Math.PI / 2) * 150, Math.sin(a - Math.PI / 2) * 150); ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); RH.bigText('1 ชั่วโมง', 510, 1110, 90, '#fff', prog(lt, ln.dur * 0.35, ln.dur * 0.5)); },
  night5(lt, ln) { bedroom(0.2); bed(540, 1260, () => RH.head(-230, -150, 0.7, P(PHUM, {face: 'sleepy'}))); RH.zzz(380, 900);
    if (lt > 1.2) { for (let i = 0; i < 3; i++) sheep(220 + i * 280, 560 + Math.abs(Math.sin(T * 6 + i)) * -40, 0.6, {face: 'cry', mouth: talk(ln, 'sheep')}); if (ln.who === 'sheep') RH.confetti(40); }
    else RH.scroll('คืนที่ 5', prog(lt, 0.05, 0.6), 460); clock(780, 860, 60, '23:00', '#7bd389'); },
  morning(lt, ln) { RH.bg.meadow(); RH.person(510, 1020, 1.1, P(PHUM, {face: 'happy', pose: 'cheer', mouth: talk(ln, 'phum')})); RH.sparkle(510, 850, 260, 8, '#fff'); clock(510, 470, 80, '06:00', '#ffd23f'); },
  cta(lt, ln) { RH.bg.studio('#c9b8ff', '#a891ff'); const k = E.back(prog(lt, 0, 0.5)); specs(510, 820, 1.3 * k); RH.sparkle(510, 820, 340, 10);
    RH.bigText('แว่นกรองแสงสีฟ้า', 510, 420, 96, '#fff', prog(lt, 0.2, 0.6)); const b = prog(lt, ln.dur * 0.5, ln.dur * 0.75); if (b > 0) { ctx.save(); ctx.translate(510, 1180); ctx.scale(E.back(b), E.back(b)); RH.basket(0, 0, 0.6); ctx.restore(); } },
};

window.EP = {font: 'K', scenes: SCENES, sceneTime: true, xfade: 0.25,
  sub: {mode: 'words', y: 1330, size: 104, chunk: 5},
  camera(name, lt, ln) { const s = 1 + 0.05 * E.out(prog(lt, 0, ln.dur)); const pk = 1 + 0.04 * (1 - E.out(prog(lt, 0, 0.25))); ctx.translate(540, 960); ctx.scale(s * pk, s * pk); ctx.translate(-540, -960); },
  intro(t) { nightSky(); moon(510, 700, 120); RH.bigText('นอนไม่หลับ 5 คืน', 510, 1000, 110, '#fff', prog(t, 0, 0.3)); },
  overlay(t, ln) { if (ln && ln.scene === 'cta') return; ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.roundRect(150, 200, 720, 96, 48); ctx.fill(); ctx.restore(); txt('ภูมิ นอนไม่หลับ 5 คืน', 510, 250, 50, '#fff', {f: 'K', w: 800}); },
  outroGap: 0.5,
  outro(k) { ctx.fillStyle = `rgba(168,145,255,${E.inOut(k)})`; ctx.fillRect(0, 0, W, H); },
  endCard(k) { RH.bg.studio('#c9b8ff', '#a891ff'); ctx.save(); ctx.globalAlpha = k; specs(510, 760, 1.1); RH.bigText('แว่นกรองแสงสีฟ้า', 510, 1000, 90, '#fff'); RH.bigText('อยู่ในตะกร้าด้านล่าง', 510, 1130, 70, '#ff6b6b'); RH.basket(510, 1330, 0.6); ctx.restore(); },
};
