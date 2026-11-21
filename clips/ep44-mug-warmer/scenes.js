// EP.44 คดีกาแฟเย็นชืด — แนวศาลพิจารณาคดี (ที่อุ่นแก้วกาแฟ)
OL = '#1a1410'; LW = 7;
const P = {wood:'#6b3f22',wood2:'#4e2c16',wall:'#e9dcc4',green:'#2e5d4a',robe:'#1a1a22',skin:'#efc29c',gold:'#c9a227',coffee:'#6b3e26',hot:'#ff6b3d',cold:'#5ab3ff',paper:'#fdf8ee'};

function court(){bgFill(P.wall);for(let i=0;i<8;i++)rr(80+i*120,340,60,600,8),fs('#dccdb0',0);rr(380,360,320,320,10);fs(P.green,6);circ(540,500,90);fs(P.gold,6);txt('⚖',540,520,100,OL,{f:'Trirong'});
  ctx.fillStyle=P.wood;ctx.fillRect(-300,900,W+600,1000);for(let i=0;i<10;i++)line([i*110,900,i*110,1920],4,P.wood2);}
function bench(){rr(140,860,800,260,10);fs(P.wood2,8);rr(140,860,800,50,10);fs(P.wood,0);rr(420,960,240,60,6);fs(P.gold,4);txt('ศาลโต๊ะคอม',540,994,34,OL,{f:'Trirong'});}
function judge(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);poly([-160,130,160,130,180,420,-180,420]);fs(P.robe);poly([-40,130,0,200,40,130]);fs('#fff',4);
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,88,100);fs(P.skin);for(const sd of[-1,1]){for(let i=0;i<4;i++)circ(sd*(80+i*6),-20+i*36,30),fs('#f4f4f4',4);}ctx.beginPath();ctx.arc(0,-30,90,Math.PI,0);ctx.closePath();fs('#f4f4f4');
  for(const ex of[-30,30]){circ(ex,0,18);fs('#fff8',4);circ(ex,2,5);ctx.fillStyle=OL;ctx.fill();}line([-12,0,12,0],4);ell(0,50,12+m*6,3+m*12);fs('#7a2a2a',4);
  if(o.gavel){ctx.save();ctx.translate(200,100);ctx.rotate(o.bang?-0.8:0.2);rr(-10,-120,20,140,6);fs('#8a5a2a',4);rr(-50,-160,100,50,10);fs('#6b3f22',5);ctx.restore();}ctx.restore();}
function lawyer(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);poly([-130,120,130,120,150,440,-150,440]);fs('#22223a');poly([-30,120,0,200,30,120]);fs('#fff',4);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,82,92);fs(P.skin);ctx.beginPath();ctx.moveTo(-86,40);ctx.quadraticCurveTo(-90,-110,0,-104);ctx.quadraticCurveTo(90,-110,86,40);ctx.lineTo(60,40);ctx.quadraticCurveTo(40,-50,-60,40);ctx.closePath();fs('#3a2010');
  for(const ex of[-28,28]){ell(ex,4,11,13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,48,10+m*6,3+m*12);fs('#a03040',4);
  if(o.point){line([120,180,240,80],22,OL);line([120,180,240,80],14,'#22223a');circ(250,70,18);fs(P.skin,4);}ctx.restore();}
function mug(x,y,s,temp,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-80,-110,160,180,20);fs('#f5f5f5');ell(0,-110,80,16);fs(P.coffee,4);ctx.beginPath();ctx.arc(84,-20,36,-1.2,1.2);ctx.lineWidth=16;ctx.strokeStyle=OL;ctx.stroke();
  if(temp>0.3)for(let i=0;i<3;i++){const ph=(T*0.8+i/3)%1;ctx.save();ctx.globalAlpha=(1-ph)*temp;curve([-30+i*30,-130-ph*60,-20+i*30,-170-ph*80,-30+i*30,-210-ph*100],7,'#fff');ctx.restore();}
  if(o.label)rr(-50,-60,100,60,8),fs('#fff',3),txt('A',0,-28,40,OL,{f:'Trirong'});ctx.restore();}
function warmer(x,y,s,on){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-130,-20,260,50,20);fs('#2b2b33');ell(0,-20,100,22);fs(on?'#ff8a5a':'#555',4);circ(110,5,8);ctx.fillStyle=on?'#ff3b30':'#333';ctx.fill();ctx.restore();}
function thermo(x,y,v){rr(x-20,y-260,40,260,20);fs('#fff',5);circ(x,y+10,40);fs(v>0.5?P.hot:P.cold,5);rr(x-10,y-250+(1-v)*240,20,250-(1-v)*240,10);fs(v>0.5?P.hot:P.cold,0);}
function doc(t,y,k,col=P.paper){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.scale(E.back(k),E.back(k));rr(-380,-58,760,116,6);fs(col,6);txt(t,0,6,48,OL,{f:'Trirong',maxW:720});ctx.restore();}

const SCENES={
 court(lt){court();judge(540,700,0.75,{mouth:mouthFor('judge'),gavel:1,bang:Math.floor(T*3)%2===0&&lt<1});bench();},
 evidence(lt){court();lawyer(300,960,0.85,{mouth:mouthFor('lawyer'),point:1});ctx.save();ctx.translate(780,1000);rr(-180,-200,360,400,10);fs('#ffffff22',6,'#fff');mug(0,60,1.1,0.2,{label:1});ctx.restore();
  doc('หลักฐาน A: ชงร้อน → ประชุม 1 ชม.',560,prog(lt,0.4,0.7));},
 fact(lt,ln){court();const v=lerp(1,0.25,prog(lt,0.2,ln.dur));mug(440,1150,1.2,v);thermo(800,1180,v);txt(Math.round(lerp(25,85,v))+'°C',800,860,60,v>0.5?P.hot:P.cold,{f:'Trirong'});doc('ห้องแอร์ → กาแฟเย็นลงเรื่อยๆ',560,prog(lt,0.3,0.6));},
 why(lt,ln){bgFill('#1a1410');mug(540,1050,1.4,0.6);for(let i=0;i<16;i++){const a=i/16*Math.PI*2,ph=(T*0.6+i/16)%1;const r=lerp(160,460,ph);ctx.save();ctx.globalAlpha=1-ph;line([540+Math.cos(a)*r,980+Math.sin(a)*r,540+Math.cos(a)*(r+50),980+Math.sin(a)*(r+50)],6,P.hot);ctx.restore();}
  doc('ความร้อนถ่ายเทจากแก้ว → อากาศเย็นรอบๆ',560,prog(lt,0.3,0.6),'#ffd8c8');},
 verdict(lt){court();judge(540,700,0.75,{mouth:mouthFor('judge'),gavel:1,bang:lt>0.5&&lt<0.7});bench();const s=prog(lt,0.6,0.9);if(s>0){ctx.save();ctx.translate(540,1280);ctx.rotate(-0.15);const sc=lerp(2.5,1,E.out(s));ctx.scale(sc,sc);rr(-260,-60,520,120,10);ctx.lineWidth=10;ctx.strokeStyle='#c0392b';ctx.stroke();txt('ใช้ที่อุ่นแก้ว!',0,8,64,'#c0392b',{f:'Trirong'});ctx.restore();}},
 warm(lt,ln){court();warmer(540,1200,1.3,true);mug(540,1170,1.1,0.9);thermo(860,1220,lerp(0.4,0.85,prog(lt,0,ln.dur*0.5)));doc('วางแก้วไว้ = อุ่นตลอดการประชุม',560,prog(lt,0.3,0.6));},
 tip(lt){bgFill(P.wall);[['✓ ก้นแบนเรียบ',300,'#2fbf71',0],['✗ ก้นเว้า/นูน',780,'#c0392b',1]].forEach(([t,x,c,bad])=>{ctx.save();ctx.translate(x,1050);warmer(0,100,0.9,true);rr(-80,-110,160,190,bad?40:16);fs('#f5f5f5');if(bad){ell(0,80,60,24);fs(P.wall,0);}ctx.restore();txt(t,x,1300,48,c,{f:'Trirong'});});
  doc('แก้วแนบแผ่นอุ่น ความร้อนส่งดีที่สุด',560,prog(lt,0.2,0.5));},
 bonus(lt){court();warmer(540,1150,1.3,lt<1.0);ctx.save();ctx.translate(820,1100);rr(-60,-80,120,160,10);fs('#f3e6c8',5);txt('กระดาษ',0,0,30,OL,{f:'Trirong'});ctx.restore();
  ctx.save();ctx.strokeStyle='#c0392b';ctx.lineWidth=10;line([740,1000,900,1200],10,'#c0392b');ctx.restore();doc('ปิดเครื่องทุกครั้ง · ห่างของไวไฟ',560,prog(lt,0.2,0.5),'#ffd8c8');},
 price(lt){court();judge(540,700,0.75,{mouth:mouthFor('judge'),gavel:1,bang:lt>0.8&&lt<1.0});bench();doc('ราคาไม่แพง · ปิดคดี!',1300,prog(lt,0.3,0.6));},
 cta(lt){court();ctx.save();ctx.translate(540,920);rr(-300,-340,600,680,6);fs(P.paper,8);txt('คำพิพากษา',0,-270,60,OL,{f:'Trirong'});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();txt('หลักฐาน: ตะกร้าด้านล่าง',0,230,46,OL,{f:'Trirong'});ctx.restore();},
};

window.EP={font:'Trirong',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.04*prog(lt,0,ln.dur);if(name==='verdict'&&lt>0.5&&lt<0.8)ctx.translate(Math.sin(T*50)*6,0);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Trirong',size:58,col:'#fdf8ee',hl:'#ffb46b',sw:0,box:'#1a1410ee',boxLine:4,boxLineCol:'#c9a227',boxR:4,boxPad:28,pop:'fade',y:1600,lh:1.4},
  intro(t){court();const k=prog(t,0.2,1.0);ctx.save();ctx.globalAlpha=k;txt('ศาลเปิดพิจารณา',540,880,90,OL,{f:'Trirong'});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,6);fs('#1a1410ee',6,P.gold);txt(TL.title,0,-6,68,P.gold,{f:'Trirong',maxW:840});txt('⚖ '+TL.series,0,56,30,'#e9dcc4',{f:'Trirong'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.fillStyle=`rgba(26,20,16,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){court();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,6);fs('#1a1410ee',8,P.gold);txt('ปิดคดี',540,770,110,P.gold,{f:'Trirong'});txt('ที่อุ่นแก้วกาแฟ',540,910,76,'#fff',{f:'Trirong'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.gold,{f:'Trirong'});ctx.restore();},
};
