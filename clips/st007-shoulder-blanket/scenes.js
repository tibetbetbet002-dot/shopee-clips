// เรื่องยาว #07 สงครามรีโมทแอร์ — ของเฉพาะตอน: แอร์ รีโมท ผ้าห่มคลุมไหล่
const INK = '#151515';
window.EP = STORY.make({ props: {
  ac: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.roundRect(-300, -90, 600, 180, 40); ctx.fillStyle = '#f7f9fc'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke();
    ctx.fillStyle = '#d6dde8'; ctx.fillRect(-260, 40, 520, 24); ctx.beginPath(); ctx.roundRect(120, -60, 150, 70, 14); ctx.fillStyle = '#123'; ctx.fill(); ctx.font = '800 48px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.cold === false ? '#ff8a5c' : '#7fdcff'; ctx.fillText(o.text || '25', 195, -24);
    for (let i = 0; i < 5; i++) { const ph = (T * 1.2 + i / 5) % 1; ctx.save(); ctx.globalAlpha = (1 - ph) * 0.8; ctx.beginPath(); ctx.moveTo(-200 + i * 100, 90 + ph * 260); ctx.quadraticCurveTo(-180 + i * 100, 130 + ph * 260, -200 + i * 100, 170 + ph * 260); ctx.lineWidth = 8; ctx.strokeStyle = o.cold === false ? '#ffb38a' : '#9fe3ff'; ctx.stroke(); ctx.restore(); }
    ctx.restore(); },
  remote: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0); ctx.beginPath(); ctx.roundRect(-55, -150, 110, 300, 40); ctx.fillStyle = '#f4f4f4'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-38, -125, 76, 50, 10); ctx.fillStyle = '#123'; ctx.fill(); ctx.font = '800 30px K'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#7fdcff'; ctx.fillText(o.text || '25', 0, -98);
    for (const [bx, by, c] of [[0, -30, '#e63946'], [-22, 30, '#ccc'], [22, 30, '#ccc'], [-22, 80, '#ccc'], [22, 80, '#ccc']]) { ctx.beginPath(); ctx.arc(bx, by, 16, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); ctx.lineWidth = 5; ctx.stroke(); } ctx.restore(); },
  shawl: (x, y, s, o) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-150, 10); ctx.quadraticCurveTo(0, -40, 150, 10); ctx.lineTo(170, 190); ctx.quadraticCurveTo(0, 230, -170, 190); ctx.closePath(); ctx.fillStyle = o.col || '#ff8fab'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
    ctx.save(); ctx.clip(); ctx.globalAlpha = 0.25; for (let i = -5; i < 6; i++) { ctx.fillStyle = '#fff'; ctx.fillRect(i * 40, -60, 14, 300); ctx.fillRect(-200, i * 40 + 40, 400, 14); } ctx.restore(); ctx.restore(); },
} });
