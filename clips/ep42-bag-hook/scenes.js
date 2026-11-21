// EP.42 คาวบอยไม่วางกระเป๋ากับพื้น — แนวตะวันตก ทะเลทราย ซาลูน (ตะขอแขวนกระเป๋าข้างโต๊ะ)
OL = '#2b1a0e'; LW = 7;
const P = {sand:'#e8c48a',sand2:'#d4a865',sky1:'#ffb26b',sky2:'#ffe1a8',wood:'#8b5a2b',wood2:'#6b4220',hat:'#7a4a24',skin:'#e7b48c',badge:'#f2c14e',bag:'#3d5a80',dirt:'#7a5a3a'};

function desert(){const g=ctx.createLinearGradient(0,0,0,1100);g.addColorStop(0,P.sky1);g.addColorStop(1,P.sky2);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);circ(800,620,120);fs('#fff3c4',0);
  poly([-50,1100,200,820,420,1100]);fs('#c98b5a',0);poly([600,1100,820,760,1100,1100]);fs('#b77a4a',0);ctx.fillStyle=P.sand;ctx.fillRect(-300,1100,W+600,900);
  for(const cx of[150,930]){rr(cx-24,900,48,260,24);fs('#4f8a4b',5);rr(cx-80,960,40,100,20);fs('#4f8a4b',5);}
  const tx=((T*80)%1400)-200;ctx.save();ctx.translate(tx,1240);ctx.rotate(T*3);circ(0,0,40);ctx.lineWidth=5;ctx.strokeStyle='#a07a4a';ctx.stroke();ctx.restore();}
function saloon(){bgFill(P.wood);for(let i=0;i<10;i++){ctx.fillStyle=i%2?P.wood:P.wood2;ctx.fillRect(i*110,330,110,1000);}rr(100,400,300,200,10);fs('#f3e2c0',6);txt('WANTED',250,460,50,'#7a1a1a',{f:'Chon'});
  ctx.fillStyle='#5a3418';ctx.fillRect(-300,1300,W+600,800);}
function cowboy(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.3),y+boil(2,1.3));ctx.scale(s,s);
  poly([-150,130,150,130,170,460,-170,460]);fs('#b5651d');poly([-40,130,0,200,40,130]);fs('#c0392b',4);line([-150,330,150,330],14,'#3a2410');
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,88,100);fs(P.skin);ell(0,-60,190,36);fs(P.hat);ctx.beginPath();ctx.moveTo(-90,-60);ctx.quadraticCurveTo(-100,-190,0,-170);ctx.quadraticCurveTo(100,-190,90,-60);ctx.closePath();fs(P.hat);rr(-90,-90,180,22,4);fs('#3a2410',0);
  for(const ex of[-32,32]){line([ex-16,0,ex+16,0],7);}ctx.beginPath();ctx.moveTo(-50,36);ctx.quadraticCurveTo(0,20,50,36);ctx.lineWidth=12;ctx.strokeStyle='#5a3a1a';ctx.stroke();ell(0,58,12+m*6,3+m*14);fs('#8a2a2a',4);
  if(o.bag){line([150,200,220,300],22,OL);line([150,200,220,300],14,'#b5651d');rr(180,300,140,120,14);fs(P.bag);}ctx.restore();}
function sheriff(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.3),y+boil(4,1.3));ctx.scale(s,s);poly([-130,120,130,120,150,440,-150,440]);fs('#5a4a3a');star(-60,220,36,16,5,0,P.badge,5);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,82,92);fs(P.skin);ctx.beginPath();ctx.moveTo(-86,30);ctx.quadraticCurveTo(-90,-110,0,-104);ctx.quadraticCurveTo(90,-110,86,30);ctx.quadraticCurveTo(40,-40,-86,30);fs('#8a4a1a');
  ell(0,-56,170,30);fs('#e9d8b4');ctx.beginPath();ctx.moveTo(-80,-56);ctx.quadraticCurveTo(-90,-170,0,-150);ctx.quadraticCurveTo(90,-170,80,-56);ctx.closePath();fs('#e9d8b4');
  for(const ex of[-28,28]){ell(ex,4,11,13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,46,10+m*6,3+m*12);fs('#a03040',4);ctx.restore();}
function desk(y){rr(160,y,760,40,8);fs(P.wood);line([200,y+40,200,y+330],18);line([880,y+40,880,y+330],18);}
function bag(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();ctx.arc(0,-90,60,Math.PI,0);ctx.lineWidth=14;ctx.strokeStyle=OL;ctx.stroke();rr(-120,-90,240,200,24);fs(P.bag);rr(-120,-90,240,50,20);fs('#2b4560',0);
  if(o.dirty){ctx.save();rr(-120,60,240,50,10);ctx.clip();for(let i=0;i<20;i++){circ(-110+hash(i)*220,70+hash(i*2)*36,6);ctx.fillStyle=P.dirt;ctx.fill();}ctx.restore();}ctx.restore();}
function hook(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-30,-60,60,80,10);fs('#bbb');rr(-40,-70,80,24,8);fs('#999');ctx.beginPath();ctx.moveTo(0,20);ctx.lineTo(0,90);ctx.arc(-30,90,30,0,Math.PI);ctx.lineWidth=14;ctx.strokeStyle='#888';ctx.stroke();ctx.restore();}
function wanted(t,y,k){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.rotate(-0.03);ctx.scale(E.back(k),E.back(k));rr(-380,-58,760,116,6);fs('#f3e2c0',7);txt(t,0,6,48,'#5a1a1a',{f:'Chon',maxW:720});ctx.restore();}

const SCENES={
 saloon(lt){saloon();desk(1120);const k=prog(lt,0.4,1.0);bag(lerp(500,780,k),lerp(900,1350,E.out(k)),0.9);cowboy(380,880,0.85,{mouth:mouthFor('cowboy')});},
 dirt(lt){desert();sheriff(540,900,1.0,{mouth:mouthFor('sheriff')});for(let i=0;i<14;i++){const ph=(T*0.6+i/14)%1;circ(hash(i)*W,1300-ph*80,6+hash(i)*8);ctx.fillStyle='#c4a070aa';ctx.fill();}},
 fact(lt,ln){saloon();bag(540,1000,1.6,{dirty:1});const k=prog(lt,0.3,ln.dur);for(let i=0;i<8;i++){const x=400+hash(i)*280,y=lerp(1180,860,clamp(k*1.3-i*0.08));ctx.save();ctx.translate(x,y);ctx.rotate(T*3+i);for(let j=0;j<6;j++){ctx.rotate(Math.PI/3);ell(14,0,10,4);ctx.fillStyle='#7bc96f';ctx.fill();}circ(0,0,8);fs('#4f8a4b',3);ctx.restore();}
  wanted('ก้นกระเป๋า → พาเชื้อโรคขึ้นโต๊ะ',560,prog(lt,0.3,0.6));},
 why(lt,ln){desert();const spots=['🚻 ห้องน้ำ','🚗 พื้นรถ','🏪 พื้นร้าน'];spots.forEach((t,i)=>{const k=prog(lt,i*0.5,i*0.5+0.3);if(k<=0)return;ctx.save();ctx.translate(220+i*320,980);ctx.scale(E.back(k),E.back(k));rr(-140,-100,280,200,14);fs('#f3e2c0',6);txt(t,0,6,40,OL,{f:'Chon'});ctx.restore();});
  wanted('กระเป๋าไปวางมาหมดแล้ว!',1280,prog(lt,ln.dur*0.6,ln.dur*0.8));},
 hook(lt){saloon();const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,960);ctx.scale(k*2.2,k*2.2);hook(0,0,1);ctx.restore();cowboy(220,1050,0.55,{mouth:mouthFor('cowboy')});wanted('ตะขอแขวนกระเป๋าข้างโต๊ะ',560,prog(lt,0.1,0.4));},
 hang(lt){saloon();desk(1000);hook(900,1000,0.9);const k=E.out(prog(lt,0.3,1.0));bag(lerp(600,870,k),lerp(800,1180,k),0.8);ctx.save();ctx.setLineDash([16,10]);line([500,1400,1000,1400],5,'#2fbf71');ctx.setLineDash([]);ctx.restore();txt('ทางเดินโล่ง ✓',740,1460,44,'#b8ffcb',{f:'Chon'});},
 tip(lt){saloon();desk(1000);hook(900,1000,0.9);ctx.save();ctx.translate(540,700);rr(-200,-70,400,140,14);fs('#2b2b33',5);txt('รับได้ ≥ 5 กก.',0,8,52,P.badge,{f:'Chon'});ctx.restore();bag(870,1200,0.9);wanted('เช็กน้ำหนักที่ตะขอรับได้',1300,prog(lt,0.2,0.5));},
 bonus(lt,ln){saloon();bag(540,1000,1.5,{dirty:lt<ln.dur*0.6});const k=prog(lt,0.3,ln.dur*0.6);ctx.save();ctx.translate(lerp(340,740,k),1090);rr(-70,-40,140,80,20);fs('#bfe9ff',5);ctx.restore();wanted('เช็ดก้นกระเป๋าด้วยผ้าชื้นบ้าง',560,prog(lt,0.2,0.5));},
 price(lt){desert();cowboy(540,900,0.9,{mouth:mouthFor('cowboy'),bag:1});ctx.save();ctx.translate(840,640);for(let i=0;i<5;i++){circ(i*20,-i*14,30);fs(P.badge,4);}ctx.restore();wanted('ราคาหลักสิบ',560,prog(lt,0.3,0.6));},
 cta(lt){saloon();ctx.save();ctx.translate(540,880);rr(-300,-360,600,720,8);fs('#f3e2c0',8);txt('WANTED',0,-280,80,'#7a1a1a',{f:'Chon'});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.badge;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  txt('ค่าหัว: ตะกร้าด้านล่าง',0,260,48,'#5a1a1a',{f:'Chon'});ctx.restore();},
};

window.EP={font:'Chon',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Chon',size:54,col:'#fff3dd',hl:'#f2c14e',stroke:'#2b1a0e',sw:14,pop:'back',y:1590,lh:1.4},
  intro(t){desert();const k=prog(t,0.2,1.2);ctx.save();ctx.globalAlpha=k;txt('ณ ดินแดนตะวันตก...',540,880,80,'#5a1a1a',{f:'Chon'});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,8);fs(P.wood2,8,P.badge);txt(TL.title,0,-6,62,P.badge,{f:'Chon',maxW:840});txt('🤠 '+TL.series,0,56,30,'#f3e2c0',{f:'Chon'});ctx.restore();},
  post(){ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle='rgba(255,220,170,0.15)';ctx.fillRect(0,0,W,H);ctx.restore();grain(0.03);},
  outroGap:0.55,
  outro(k){const r=lerp(1300,0,E.inOut(k));ctx.save();ctx.fillStyle='#000';ctx.beginPath();ctx.rect(0,0,W,H);ctx.arc(540,960,r,0,Math.PI*2,true);ctx.fill('evenodd');ctx.restore();},
  endCard(k){desert();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,8);fs('#f3e2c0ee',8,OL);txt('THE END',540,770,100,'#7a1a1a',{f:'Chon'});txt('ตะขอแขวนกระเป๋าข้างโต๊ะ',540,910,62,OL,{f:'Chon'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,54,'#7a4a24',{f:'Chon'});ctx.restore();},
};
