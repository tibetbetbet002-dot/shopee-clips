// EP.37 ยาวิเศษของแม่มด — แนวแม่มดปรุงยา (ขวดน้ำบอกเวลา)
OL = '#120a1c'; LW = 7;
const P = {hut:'#2a1840',hut2:'#3a2258',potion:'#7dff6a',purple:'#9b5de5',candle:'#ffd27a',skin:'#c9e4b4',hat:'#1a1028',cat:'#1a1a22',water:'#6cc6ff',gold:'#f2c14e'};

function hut(){bgFill(P.hut);for(let i=0;i<9;i++){ctx.fillStyle=i%2?P.hut:P.hut2;ctx.fillRect(i*120,320,120,1000);}
  for(let i=0;i<4;i++){const x=120+i*260;rr(x-14,440,28,70,4);fs('#f3e6c8',4);ell(x,430+Math.sin(T*10+i)*2,8,16);ctx.fillStyle=P.candle;ctx.fill();ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(x,430,0,x,430,160);g.addColorStop(0,'rgba(255,210,122,0.35)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-160,270,320,320);ctx.restore();}
  for(let i=0;i<5;i++){rr(100+i*190,600,60,90,10);fs([P.purple,P.potion,'#ff6b6b',P.water,P.gold][i]+'cc',4);}ctx.fillStyle='#1a1028';ctx.fillRect(-300,1300,W+600,800);}
function cauldron(x,y,s,col=P.potion){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,260,70);fs(col,6);for(let i=0;i<6;i++){const ph=(T*1.2+i/6)%1;circ(-160+i*64,-20-ph*160,16+ph*20);ctx.save();ctx.globalAlpha=1-ph;fs(col,3);ctx.restore();}
  ctx.beginPath();ctx.moveTo(-260,0);ctx.quadraticCurveTo(-280,260,0,280);ctx.quadraticCurveTo(280,260,260,0);ctx.closePath();fs('#2b2b33');for(let i=0;i<5;i++){ell(-120+i*60,300,30,16);ctx.fillStyle=['#ff7b00','#ffd23f'][i%2];ctx.fill();}ctx.restore();}
function witch(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.3),y+boil(2,1.3));ctx.scale(s,s);
  poly([-160,130,160,130,220,520,-220,520]);fs('#3a2258');ell(0,10,140,170);fs('#5a2a7a');
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,86,98);fs(P.skin);
  ell(0,-70,190,40);fs(P.hat);poly([-90,-80,90,-80,30,-300]);fs(P.hat);rr(-90,-100,180,24,6);fs(P.purple,0);
  for(const ex of[-30,30]){ell(ex,4,13,15);fs('#fff',4);circ(ex,6,6);ctx.fillStyle='#7b2cbf';ctx.fill();}poly([0,10,20,50,-6,44]);fs(P.skin,4);
  ctx.beginPath();ctx.moveTo(-40,62);ctx.quadraticCurveTo(0,80+m*30,40,62);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();
  if(o.wand){line([150,200,300,40],10,'#6b4a2a');star(310,30,30,12,5,T*4,P.gold,4);}ctx.restore();}
function cat(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x,y+Math.sin(T*3)*4);ctx.scale(s,s);ell(0,100,90,80);fs(P.cat);curve([80,140,160,100,140,20],16,P.cat);
  ell(0,0,80,70);fs(P.cat);poly([-70,-30,-50,-100,-20,-50]);fs(P.cat);poly([70,-30,50,-100,20,-50]);fs(P.cat);
  for(const ex of[-28,28]){ell(ex,-4,16,18);fs('#c6ff4d',3);ell(ex,-4,4,14);ctx.fillStyle='#000';ctx.fill();}ell(0,30,8+m*6,2+m*10);fs('#ff6b9a',3);
  for(const sd of[-1,1])for(let k=0;k<2;k++)line([sd*30,20+k*10,sd*90,14+k*16],3,'#888');ctx.restore();}
function bottle(x,y,s,level,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-80,-300,160,420,40);fs('#e9f7ffcc',6);ctx.save();rr(-80,-300,160,420,40);ctx.clip();ctx.fillStyle=P.water+'cc';ctx.fillRect(-80,120-420*level,160,420*level);ctx.restore();
  rr(-50,-340,100,50,14);fs(P.purple,5);const marks=['8:00','10:00','12:00','14:00','16:00','18:00'];marks.forEach((t,i)=>{const yy=80-i*68;line([30,yy,70,yy],4,OL);if(o.labels)txt(t,-14,yy,22,OL,{f:'Trirong'});});
  if(o.glow){ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(0,-80,10,0,-80,300);g.addColorStop(0,'rgba(125,255,106,0.5)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-300,-400,600,600);ctx.restore();}ctx.restore();}
function rune(t,x,y,k,col=P.potion){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);ctx.translate(x,y);rr(-300,-56,600,112,56);fs('#120a1cdd',5,col);txt(t,0,6,48,col,{f:'Trirong',maxW:560});ctx.restore();}

const SCENES={
 cauldron(lt){hut();cauldron(540,1120,1.0);witch(540,760,0.75,{mouth:mouthFor('witch'),wand:1});},
 answer(lt){hut();cat(540,980,1.6,{mouth:mouthFor('cat')});rr(700,760,120,180,10);fs('#e9f7ffcc',5);},
 fact(lt,ln){hut();witch(300,900,0.7,{mouth:mouthFor('witch')});const k=prog(lt,0,ln.dur);ctx.save();ctx.translate(780,900);rr(-90,-200,180,400,30);fs('#333',6);rr(-70,-180+360*k,140,360-360*k,20);fs(P.water,0);txt('น้ำในร่างกาย',0,240,36,'#fff',{f:'Trirong'});ctx.restore();
  rune('ขาดน้ำเล็กน้อย → เพลีย + ปวดหัว',540,560,prog(lt,0.4,0.7),'#ff9f9f');},
 why(lt,ln){hut();ctx.save();ctx.translate(540,880);ell(0,0,300,220);fs('#ffb3c6',6);for(let i=0;i<6;i++)curve([-260+i*90,-180,-240+i*90,-40,-280+i*90,60,-250+i*90,180],6,'#e07a9a');
  const fade=1-prog(lt,0.3,ln.dur*0.8);ctx.save();ctx.globalAlpha=fade;rr(60,-120,200,80,40);fs(P.water,4);txt('กระหายน้ำ!',160,-80,30,'#fff',{f:'Trirong'});ctx.restore();ctx.restore();
  rune('ทำงานเพลิน → ลืมสัญญาณกระหาย',540,1260,prog(lt,0.3,0.6));},
 bottle(lt){hut();const k=E.back(prog(lt,0.2,0.6));for(let i=0;i<10;i++){const a=i*0.63+T*1.5;star(540+Math.cos(a)*300*k,900+Math.sin(a)*300*k,20,7,4,T*3,P.gold);}ctx.save();ctx.translate(540,1000);ctx.scale(k,k);bottle(0,0,1.2,0.8,{glow:1});ctx.restore();rune('ขวดน้ำบอกเวลา',540,520,prog(lt,0.3,0.6));},
 marks(lt,ln){hut();const lvl=lerp(1,0.35,prog(lt,0.2,ln.dur));bottle(400,1000,1.3,lvl,{labels:1});cat(820,1120,0.8,{mouth:mouthFor('cat')});rune('ดื่มตามขีด เห็นชัดว่าดื่มไปแค่ไหน',540,520,prog(lt,0.3,0.6));},
 tip(lt){bgFill('#1a1028');[['#fff7b0','เหลืองใส = พอดี ✓','#7dff6a'],['#e0a030','เหลืองเข้ม = ดื่มน้อยไป','#ff9f9f']].forEach(([c,t,tc],i)=>{const x=300+i*480;ctx.save();ctx.translate(x,900);
    rr(-90,-160,180,320,40);fs('#e9f7ff',6);rr(-80,-60,160,210,30);fs(c,0);ctx.restore();txt(t,x,1150,40,tc,{f:'Trirong',maxW:440});});rune('ดูสีปัสสาวะ',540,560,prog(lt,0.2,0.5));},
 bonus(lt){hut();bottle(540,1000,1.1,0.2,{});for(let i=0;i<8;i++){const ph=(T+i/8)%1;circ(540+Math.sin(i*2)*60,820-ph*220,8);fs('#e9f7ff',3);}rune('ล้างขวดทุกวัน · ไม่เติมทับของเก่า',540,560,prog(lt,0.2,0.5));},
 price(lt){hut();witch(380,880,0.75,{mouth:mouthFor('witch'),wand:1});bottle(820,1100,0.8,0.7,{glow:1});rune('ราคาไม่แพง',540,560,prog(lt,0.3,0.6),P.gold);},
 cta(lt){hut();cat(260,1200,0.7,{mouth:mouthFor('cat')});cauldron(640,1160,0.7,P.purple);const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(640,lerp(1100,800,b));ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.potion;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();rune('ตะกร้าด้านล่าง เมี้ยว!',540,520,prog(lt,0.3,0.6));},
};

window.EP={font:'Trirong',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Trirong',size:60,col:'#e9ffe0',hl:'#7dff6a',stroke:'#120a1c',sw:12,pop:'fade',y:1590,lh:1.35},
  intro(t){hut();cauldron(540,1100,1.1);const k=prog(t,0.3,1.2);ctx.save();ctx.globalAlpha=k;txt('ห้องปรุงยา',540,760,110,P.potion,{f:'Trirong',sw:10});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,20);fs('#120a1cee',6,P.purple);txt(TL.title,0,-6,70,P.potion,{f:'Trirong',maxW:840});txt('🧪 '+TL.series,0,56,32,'#e0c8ff',{f:'Trirong'});ctx.restore();},
  post(){grain(0.03);},
  outroGap:0.6,
  outro(k){for(let i=0;i<14;i++){circ(hash(i)*W,H-k*H*1.3+hash(i*3)*300,E.inOut(k)*300);ctx.fillStyle=i%2?P.purple:P.potion;ctx.fill();}},
  endCard(k){bgFill(P.hut);ctx.save();ctx.globalAlpha=k;txt('ยาวิเศษพร้อมแล้ว',540,780,86,P.potion,{f:'Trirong'});txt('ขวดน้ำบอกเวลา',540,930,80,'#fff',{f:'Trirong'});txt('อยู่ในตะกร้าด้านล่าง',540,1030,56,P.gold,{f:'Trirong'});ctx.restore();},
};
