// เรื่องยาว #12 มนุษย์เต่าออฟฟิศ — ของเฉพาะตอน: เต่าทวดพูดได้ ไม้นวดคอบ่า แผนภาพน้ำหนักหัว
const INK = '#151515';
const lw12 = (w, c = INK) => { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; };
const talking = (id) => TL.lines.some(l => l.who === id && T >= l.start && T < l.start + l.dur) ? 0.3 + 0.7 * Math.abs(Math.sin(T * 17)) : 0;
window.EP = STORY.make({ props: {
  turtle: (x, y, s, o) => { const m = talking('turtle'); ctx.save(); ctx.translate(x, y + Math.sin(T * 2) * 6); ctx.scale(s * (o.flip ? -1 : 1), s);
    for (const lx of [-150, 150]) { ctx.beginPath(); ctx.ellipse(lx, 150, 60, 40, 0, 0, Math.PI * 2); ctx.fillStyle = '#8bc34a'; ctx.fill(); lw12(8); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(0, 60, 240, 160, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = '#6b8e23'; ctx.fill(); lw12(9); ctx.stroke();
    for (const [hx, hy] of [[-110, -10], [0, -60], [110, -10], [-50, 30], [60, 30]]) { ctx.beginPath(); ctx.ellipse(hx, hy, 48, 34, 0, 0, Math.PI * 2); ctx.fillStyle = '#9ccc65'; ctx.fill(); lw12(6); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(0, 70, 250, 30, 0, 0, Math.PI * 2); ctx.fillStyle = '#c5a35a'; ctx.fill(); lw12(8); ctx.stroke();
    ctx.save(); ctx.translate(260, -40); ctx.beginPath(); ctx.ellipse(0, 0, 100, 90, 0, 0, Math.PI * 2); ctx.fillStyle = '#8bc34a'; ctx.fill(); lw12(8); ctx.stroke();
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 32, -18, 14, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); lw12(5); ctx.stroke(); ctx.beginPath(); ctx.arc(sd * 32 + 3, -16, 7, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill(); ctx.beginPath(); ctx.moveTo(sd * 32 - 22, -40); ctx.lineTo(sd * 32 + 18, -36); lw12(6); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(-40, 40); ctx.quadraticCurveTo(0, 90, 40, 40); ctx.lineTo(20, 110); ctx.lineTo(-20, 110); ctx.closePath(); ctx.fillStyle = '#eee'; ctx.fill(); lw12(5); ctx.stroke();
    ctx.beginPath(); if (m > 0.1) { ctx.ellipse(0, 28, 18, 6 + m * 14, 0, 0, Math.PI * 2); ctx.fillStyle = '#7a1f2a'; ctx.fill(); } else { ctx.moveTo(-24, 26); ctx.lineTo(24, 26); lw12(6); ctx.stroke(); } ctx.restore();
    if (o.cane) { ctx.save(); ctx.translate(420, -60); ctx.rotate(0.3); ctx.beginPath(); ctx.moveTo(0, 220); ctx.lineTo(0, -80); ctx.arc(-50, -80, 50, 0, Math.PI, true); lw12(26); ctx.stroke(); lw12(14, '#8d5a3b'); ctx.stroke(); ctx.restore(); }
    ctx.restore(); },
  massager: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0); ctx.beginPath(); ctx.moveTo(0, 260); ctx.lineTo(0, -60); ctx.bezierCurveTo(0, -220, -220, -220, -200, -40); lw12(40); ctx.stroke(); lw12(26, o.col || '#3ec1d3'); ctx.stroke();
    for (const [kx, ky] of [[-200, -40], [0, 60], [0, 160]]) { ctx.beginPath(); ctx.arc(kx + (kx ? 0 : 26), ky, 22, 0, Math.PI * 2); ctx.fillStyle = '#ff8fab'; ctx.fill(); lw12(6); ctx.stroke(); } ctx.restore(); },
  heads: (x, y, s, o) => { const data = [[0, '5 กก.'], [15, '12 กก.'], [30, '18 กก.'], [60, '27 กก.']]; const k = o.k ?? 1;
    data.forEach(([deg, kg], i) => { const cx = x - 330 * s + i * 220 * s, cy = y; ctx.save(); ctx.translate(cx, cy); ctx.scale(s * 0.9, s * 0.9); ctx.beginPath(); ctx.moveTo(0, 150); ctx.lineTo(0, 40); lw12(14); ctx.stroke(); ctx.save(); ctx.translate(0, 40); ctx.rotate(deg * Math.PI / 180); ctx.beginPath(); ctx.arc(0, -70, 62, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); lw12(7); ctx.stroke(); ctx.restore();
      txt(deg + ' องศา', 0, 210, 34, INK, {f: 'K', w: 800}); ctx.restore(); RH.bubble(kg, cx, cy - 190 * s, 1, {size: 34, fill: i === 3 ? '#ff8a8a' : i ? '#ffe15c' : '#c9f7c9'}); }); },
  eyeline: (x, y, s) => { ctx.save(); ctx.setLineDash([18, 14]); ctx.beginPath(); ctx.moveTo(x - 360 * s, y); ctx.lineTo(x + 360 * s, y); ctx.lineWidth = 6; ctx.strokeStyle = '#e63946'; ctx.stroke(); ctx.restore(); },
  arrow: (x, y, s, o) => { ctx.save(); ctx.translate(x + Math.sin(T * 4) * 14 * (o.anim ? 1 : 0), y); ctx.scale(s * (o.flip ? -1 : 1), s); ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(60, 0); lw12(22); ctx.stroke(); ctx.beginPath(); ctx.moveTo(40, -40); ctx.lineTo(100, 0); ctx.lineTo(40, 40); ctx.closePath(); ctx.fillStyle = INK; ctx.fill(); ctx.restore(); },
} });
