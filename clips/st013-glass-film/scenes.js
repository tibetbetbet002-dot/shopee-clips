// เรื่องยาว #13 จอแตกวันเงินเดือนออก — ของเฉพาะตอน: มือถือจอแตก แผนภาพชั้นฟิล์ม มือถือเคสอิฐ
const INK = '#151515';
const lw13 = (w, c = INK) => { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; };
function phoneBody(o) { ctx.beginPath(); ctx.roundRect(-120, -230, 240, 460, 38); ctx.fillStyle = o.body || '#c9b6ff'; ctx.fill(); lw13(9); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-104, -212, 208, 424, 26); ctx.fillStyle = o.screen || '#7fd3ff'; ctx.fill();
  const g = ctx.createLinearGradient(-100, -200, 100, 200); g.addColorStop(0, 'rgba(255,255,255,0.35)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fill(); ctx.beginPath(); ctx.roundRect(-30, -204, 60, 16, 8); ctx.fillStyle = INK; ctx.fill(); }
function crack(cx, cy, r, col) { ctx.save(); lw13(4, col); for (let i = 0; i < 9; i++) { const a = i * 0.7 + 0.3; ctx.beginPath(); ctx.moveTo(cx, cy); let px = cx, py = cy; for (let k = 1; k <= 4; k++) { px = cx + Math.cos(a + (hash(i * 7 + k) - 0.5) * 0.5) * r * k / 4; py = cy + Math.sin(a + (hash(i * 3 + k) - 0.5) * 0.5) * r * k / 4; ctx.lineTo(px, py); } ctx.stroke(); }
  for (const rr of [r * 0.25, r * 0.5]) { ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke(); } ctx.restore(); }
window.EP = STORY.make({ props: {
  mphone: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0); phoneBody(o); if (o.film) { ctx.beginPath(); ctx.roundRect(-108, -216, 216, 432, 28); lw13(4, 'rgba(255,255,255,0.9)'); ctx.stroke(); }
    if (o.cracked) { ctx.save(); ctx.beginPath(); ctx.roundRect(-104, -212, 208, 424, 26); ctx.clip(); crack(60, 120, 260, o.film ? 'rgba(255,255,255,0.95)' : INK); ctx.restore(); }
    if (o.shine) RH.sparkle(0, 0, 260, 8); ctx.restore(); },
  brick: (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-200, -320, 400, 640, 70); ctx.fillStyle = '#556b2f'; ctx.fill(); lw13(10); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-160, -280, 320, 560, 50); ctx.fillStyle = '#3d4f22'; ctx.fill(); lw13(7); ctx.stroke();
    for (const [cx, cy] of [[-170, -290], [170, -290], [-170, 290], [170, 290]]) { ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fillStyle = '#222'; ctx.fill(); lw13(7); ctx.stroke(); } ctx.scale(0.55, 0.55); phoneBody({}); ctx.restore(); },
  layers: (x, y, s, o) => { const k = o.k ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const L = [['ฟิล์มกระจก', '#bde9ff', -150], ['กาว', '#fff3b0', -60], ['จอจริง', '#7b5cff', 30], ['ตัวเครื่อง', '#c9b6ff', 120]];
    L.forEach(([t, c, yy], i) => { ctx.save(); ctx.translate(0, yy + Math.sin(T * 2 + i) * 6); ctx.transform(1, 0, -0.5, 0.5, 0, 0); ctx.beginPath(); ctx.roundRect(-220, -60, 440, 120, 20); ctx.fillStyle = c; ctx.fill(); lw13(7); ctx.stroke(); ctx.restore(); RH.bubble(t, 330, yy, 1, {size: 34}); });
    if (o.hit) { const h = (T * 1.3) % 1; ctx.save(); ctx.translate(-60, -260 + h * 90); ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, 40); lw13(14, '#e63946'); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-30, 10); ctx.lineTo(0, 50); ctx.lineTo(30, 10); ctx.closePath(); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.restore(); if (h > 0.8) crack(-60, -150, 120, '#fff'); }
    ctx.restore(); },
} });
