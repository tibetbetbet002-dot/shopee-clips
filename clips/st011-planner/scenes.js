// เรื่องยาว #11 ลิสต์ร้อยข้อของจูน — ของเฉพาะตอน: สมุดแพลนเนอร์ มือถือรายการยาว ฟองงานลอยวน
const INK = '#151515';
window.EP = STORY.make({ props: {
  planner: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0); ctx.beginPath(); ctx.roundRect(-210, -270, 420, 540, 22); ctx.fillStyle = o.col || '#2a9d8f'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-180, -240, 360, 480, 12); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.lineWidth = 5; ctx.stroke(); for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-210, -220 + i * 72, 14, 0, Math.PI * 2); ctx.fillStyle = '#ccc'; ctx.fill(); ctx.lineWidth = 5; ctx.stroke(); }
    const items = o.items || ['1', '2', '3', '4', '5', '6'], done = o.done ?? 0; ctx.font = '800 36px K'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    items.forEach((t, i) => { const yy = -180 + i * 72; ctx.fillStyle = INK; ctx.fillText((i + 1) + '. ' + t, -150, yy); ctx.beginPath(); ctx.moveTo(-150, yy + 24); ctx.lineTo(150, yy + 24); ctx.lineWidth = 2; ctx.strokeStyle = '#c9d6e8'; ctx.stroke();
      if (i < done) { ctx.beginPath(); ctx.moveTo(-160, yy); ctx.lineTo(160, yy); ctx.lineWidth = 7; ctx.strokeStyle = '#e63946'; ctx.stroke(); } });
    if (o.cover) { ctx.beginPath(); ctx.roundRect(-210, -270, 420, 540, 22); ctx.fillStyle = o.col || '#2a9d8f'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke(); ctx.beginPath(); ctx.roundRect(-120, -120, 240, 90, 14); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.lineWidth = 6; ctx.stroke(); txt('PLANNER', 0, -74, 44, INK, {f: 'K', w: 800}); }
    ctx.restore(); },
  longlist: (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-140, -260, 280, 520, 36); ctx.fillStyle = '#222'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke(); ctx.beginPath(); ctx.roundRect(-120, -236, 240, 472, 22); ctx.fillStyle = '#fff'; ctx.fill(); ctx.save(); ctx.clip();
    const off = (T * 160) % 60; for (let i = 0; i < 12; i++) { const yy = -230 + i * 60 - off; ctx.fillStyle = '#ffd6d6'; ctx.fillRect(-110, yy, 220, 46); txt('ด่วน ข้อ ' + (Math.floor(T * 2.7) + i + 1), 0, yy + 24, 26, '#c0392b', {f: 'K', w: 800}); } ctx.restore(); ctx.restore(); },
  orbit: (x, y, s, o) => { const n = (o.items || []).length; (o.items || []).forEach((t, i) => { const a = T * 0.9 + i * Math.PI * 2 / n; RH.bubble(t, x + Math.cos(a) * 300 * s, y + Math.sin(a) * 110 * s, 1, {size: 38, fill: '#ffd6d6'}); }); },
  pen: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot ?? -0.6); ctx.beginPath(); ctx.roundRect(-16, -150, 32, 260, 12); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-16, 110); ctx.lineTo(16, 110); ctx.lineTo(0, 160); ctx.closePath(); ctx.fillStyle = '#f2d0a4'; ctx.fill(); ctx.stroke(); ctx.restore(); },
} });
