// เรื่องยาว #09 กองทัพมดบุกโต๊ะ — ของเฉพาะตอน: มด แถวมด ถุงขนม โหลสุญญากาศ สเปรย์
const INK = '#151515';
const lw9 = (w, c = INK) => { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; };
const talking = (id) => TL.lines.some(l => l.who === id && T >= l.start && T < l.start + l.dur) ? 0.3 + 0.7 * Math.abs(Math.sin(T * 17)) : 0;
function antBody(s, face, mouth, walk) { const lg = walk ? Math.sin(T * 18) * 0.4 : 0;
  for (let i = -1; i <= 1; i++) for (const sd of [-1, 1]) { ctx.save(); ctx.translate(i * 46, 20); ctx.rotate(sd * (0.5 + (i % 2 ? lg : -lg))); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 80); lw9(8); ctx.stroke(); ctx.restore(); }
  for (const [x, r] of [[-90, 52], [0, 40], [100, 60]]) { ctx.beginPath(); ctx.arc(x, 0, r, 0, Math.PI * 2); ctx.fillStyle = '#5a2f1d'; ctx.fill(); lw9(7); ctx.stroke(); }
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(110 + sd * 20, -50); ctx.quadraticCurveTo(140 + sd * 40, -130, 170 + sd * 50, -120); lw9(6); ctx.stroke(); }
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(100 + sd * 22, -8, 13, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.beginPath(); ctx.arc(100 + sd * 22 + 3, -8, 6, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill(); }
  if (face === 'angry') for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(100 + sd * 34, -32); ctx.lineTo(100 + sd * 8, -22); lw9(6); ctx.stroke(); }
  ctx.beginPath(); if (mouth > 0.1) { ctx.ellipse(100, 26, 10, 4 + mouth * 10, 0, 0, Math.PI * 2); ctx.fillStyle = '#7a1f2a'; ctx.fill(); } else { ctx.arc(100, 16, 12, 0.2 * Math.PI, 0.8 * Math.PI); lw9(5, '#fff'); ctx.stroke(); } }
window.EP = STORY.make({ props: {
  ant: (x, y, s, o) => { ctx.save(); ctx.translate(x, y + (o.bob !== false ? Math.abs(Math.sin(T * 6)) * -8 : 0)); ctx.scale(s * (o.flip ? -1 : 1), s); if (o.helmet) { ctx.beginPath(); ctx.arc(100, -40, 50, Math.PI, 0); ctx.fillStyle = '#4a7a3a'; ctx.fill(); lw9(7); ctx.stroke(); }
    antBody(s, o.face, talking(o.id || ''), o.walk); ctx.restore(); },
  antline: (x, y, s, o) => { const n = o.n || 14, len = o.len || 900, ang = o.ang || 0; ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    if (o.trail) { ctx.setLineDash([14, 14]); ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(len, 30); lw9(6, 'rgba(255,120,200,0.7)'); ctx.stroke(); ctx.setLineDash([]); }
    for (let i = 0; i < n; i++) { const p = ((i / n + T * (o.speed || 0.06)) % 1) * len; ctx.save(); ctx.translate(p, Math.sin(T * 9 + i) * 3); ctx.scale(0.22 * s, 0.22 * s); antBody(1, '', 0, true); ctx.restore(); } ctx.restore(); },
  chips: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0); ctx.beginPath(); ctx.moveTo(-110, -150); ctx.lineTo(110, -150); ctx.lineTo(130, 150); ctx.lineTo(-130, 150); ctx.closePath(); ctx.fillStyle = o.col || '#e63946'; ctx.fill(); lw9(8); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0, 20, 70, 50, 0, 0, Math.PI * 2); ctx.fillStyle = '#ffd23f'; ctx.fill(); lw9(5); ctx.stroke(); txt('กรอบ', 0, 24, 44, INK, {f: 'K', w: 800}); if (o.open) for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(-100 + i * 34, 175 + (i % 2) * 14, 14, 8, i, 0, Math.PI * 2); ctx.fillStyle = '#f2c14e'; ctx.fill(); } ctx.restore(); },
  jar: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-140, -170, 280, 330, 50); ctx.fillStyle = 'rgba(200,235,255,0.55)'; ctx.fill(); lw9(9); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.roundRect(-130, -80, 260, 230, 40); ctx.clip(); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(-110 + (i % 5) * 55, 140 - Math.floor(i / 5) * 50, 30, 18, i, 0, Math.PI * 2); ctx.fillStyle = o.fill || '#f2c14e'; ctx.fill(); lw9(4); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.roundRect(-150, -215, 300, 60, 20); ctx.fillStyle = o.lid || '#ff7a1a'; ctx.fill(); lw9(8); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-30, -240, 60, 34, 10); ctx.fillStyle = '#fff'; ctx.fill(); lw9(6); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-70, -40, 20, 60, 0.2, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fill(); ctx.restore(); },
  spray: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0); ctx.beginPath(); ctx.roundRect(-60, -130, 120, 260, 24); ctx.fillStyle = '#7bd389'; ctx.fill(); lw9(8); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-34, -180, 68, 54, 10); ctx.fillStyle = '#ddd'; ctx.fill(); lw9(7); ctx.stroke(); txt('ฆ่าแมลง', 0, 0, 30, INK, {f: 'K', w: 800}); ctx.restore(); },
  crumbs: (x, y, s) => { for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(x + (hash(i) - 0.5) * 300 * s, y + (hash(i * 3) - 0.5) * 60 * s, 10 * s, 6 * s, i, 0, Math.PI * 2); ctx.fillStyle = '#e0a93b'; ctx.fill(); } },
} });
