// EP.8 คืนที่โน้ตบุ๊กร้อน — แนวหนังสยองขวัญ (พัดลมรองโน้ตบุ๊ก)
OL = '#000000'; LW = 6;
const P = {black:'#07070a',night:'#0c1424',moon:'#9fd3ff',blood:'#b3001b',red:'#ff2a2a',skin:'#e8c4a8',hair:'#140c0c',pj:'#6c5ce7',cyan:'#5ff5ff',warm:'#ffcf8a'};

function mai(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,3.5),y+boil(2,3.5));ctx.scale(s,s);
  ell(0,40,140,170);fs(P.hair);
  rr(-150,140,300,320,90);fs(P.pj);for(let i=0;i<6;i++)star(-100+i*40,220+(i%2)*80,12,5,5,0,'#ffeaa7',0);
  rr(-24,90,48,60,10);fs(P.skin);ell(0,0,96,112);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-100,40);ctx.quadraticCurveTo(-110,-120,0,-118);ctx.quadraticCurveTo(110,-120,100,40);ctx.quadraticCurveTo(70,-60,0,-60);ctx.quadraticCurveTo(-70,-60,-100,40);fs(P.hair);
  const e=o.eye||1;
  for(const ex of[-36,36]){if(o.relaxed){ctx.beginPath();ctx.arc(ex,0,16,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}
    ell(ex,0,16*e,18*e);fs('#fff',5);circ(ex,2,o.scream?3:6);ctx.fillStyle=OL;ctx.fill();}
  if(o.scream){ell(0,70,40,60);fs('#3a0008',6);}else if(o.relaxed&&m<0.1){ctx.beginPath();ctx.arc(0,48,24,0.2*Math.PI,0.8*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();}
  else{ell(0,58,14+m*6,3+m*16);fs('#8a2a3a',5);}
  if(o.scream){line([-60,-50,-14,-36],6);line([14,-36,60,-50],6);}
  ctx.restore();}

function laptop(x,y,s,o={}){ctx.save();ctx.translate(x+(o.shake?hash(Math.floor(T*40))*8-4:0),y);ctx.scale(s,s);
  rr(-230,-10,460,40,10);fs('#3a3f4a');for(let i=0;i<7;i++)rr(-120+i*36,6,20,14,3),fs(o.blocked?'#5a0000':'#111',0);
  ctx.save();ctx.translate(0,-10);ctx.rotate(-0.08);rr(-210,-300,420,300,16);fs('#2b2f3a');
  const scr=o.mood==='evil'?'#3a0000':o.mood==='happy'?'#0e3b5c':'#0b1e3a';rr(-190,-282,380,262,8);fs(scr,4);
  if(o.mood==='evil'){ctx.save();ctx.shadowColor=P.red;ctx.shadowBlur=40;
    poly([-130,-200,-40,-170,-120,-150]);fs(P.red,0);poly([130,-200,40,-170,120,-150]);fs(P.red,0);
    ctx.beginPath();ctx.moveTo(-110,-90);for(let i=0;i<=8;i++)ctx.lineTo(-110+i*27.5,-90+(i%2?-24:10));ctx.lineWidth=8;ctx.strokeStyle=P.red;ctx.stroke();ctx.restore();}
  else if(o.mood==='happy'){circ(-70,-170,22);fs(P.cyan,0);circ(70,-170,22);fs(P.cyan,0);ctx.beginPath();ctx.arc(0,-130,70,0.2*Math.PI,0.8*Math.PI);ctx.lineWidth=10;ctx.strokeStyle=P.cyan;ctx.stroke();}
  else if(o.mood==='load'){ctx.save();ctx.translate(0,-150);ctx.rotate(T*6);for(let i=0;i<8;i++){ctx.rotate(Math.PI/4);circ(50,0,10);ctx.fillStyle=`rgba(159,211,255,${i/8})`;ctx.fill();}ctx.restore();}
  ctx.restore();
  if(o.heat){for(let i=0;i<5;i++){const ph=(T*0.9+i/5)%1;ctx.save();ctx.globalAlpha=(1-ph)*o.heat;curve([-160+i*80,-20,-150+i*80+Math.sin(T*5+i)*20,-120-ph*120,-160+i*80,-220-ph*200],8,'#ff6b3d');ctx.restore();}}
  ctx.restore();}

function coolPad(x,y,s,spin){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  poly([-260,0,260,0,240,-60,-240,-50]);fs('#1f2533');
  for(const fx of[-120,120]){ell(fx,-28,90,20);fs('#0b0e15',4);ctx.save();ctx.translate(fx,-28);ctx.scale(1,0.22);
    for(let i=0;i<5;i++){ctx.rotate(Math.PI*2/5);poly([0,0,80,-20,80,20]);fs(P.cyan,0);}ctx.restore();ctx.rotate(0);}
  rr(-260,0,520,24,8);fs('#2b3245');ctx.save();ctx.shadowColor=P.cyan;ctx.shadowBlur=30;line([-240,12,240,12],5,P.cyan);ctx.restore();
  ctx.restore();}

function bedroom(lightOn){bgFill(lightOn?'#3d2f4f':P.night);
  rr(110,400,300,380,8);fs(lightOn?'#1d2b4a':'#0a1020',6);circ(320,500,46);fs('#e8f4ff',0);
  if(!lightOn){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.25;ctx.fillStyle=P.moon;poly([110,400,410,400,800,1400,250,1400]);ctx.fill();ctx.restore();}
  line([260,400,260,780],6);line([110,590,410,590],6);
  rr(-40,1050,1160,300,30);fs(lightOn?'#7a5c9e':'#2a2347');rr(-40,1000,1160,100,30);fs(lightOn?'#cdb4db':'#3b3361');
  ctx.fillStyle=lightOn?'#2d2440':'#05070d';ctx.fillRect(-300,1350,W+600,800);
  circ(860,560,70);fs(lightOn?'#f1f1f1':'#9aa6b8');txt('03:13',860,566,40,OL,{f:'Trirong'});}
function thermo(x,y,v){rr(x-24,y-300,48,300,24);fs('#eee',5);circ(x,y+10,46);fs(v>0.6?P.red:v>0.3?'#ffb347':'#2fbf71',5);
  rr(x-12,y-290+(1-v)*280,24,290-(1-v)*280,12);fs(v>0.6?P.red:v>0.3?'#ffb347':'#2fbf71',0);}
function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#ddd';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');
  poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();}

const SCENES={
 night(lt,ln){bedroom(false);
  laptop(600,1040,0.9,{mood:'load',heat:0.5});
  for(let i=0;i<4;i++){const ph=(T*0.7+i/4)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.5;ctx.strokeStyle='#9fd3ff';ctx.lineWidth=4;ell(600,980,80+ph*400,30+ph*150);ctx.stroke();ctx.restore();}
  ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(600,860,10,600,860,400);g.addColorStop(0,'rgba(80,140,255,0.5)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,400,W,1000);ctx.restore();},
 lag(lt,ln){bgFill('#020306');
  mai(540,920,1.6,{mouth:mouthFor('mai'),eye:1.2});
  ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle='#4a5a8a';ctx.fillRect(0,0,W,H);ctx.restore();
  ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createLinearGradient(0,1400,0,700);g.addColorStop(0,'rgba(120,180,255,0.75)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,700,W,700);ctx.restore();
  rr(190,1300,700,50,25);fs('#111',5,'#9fd3ff');const v=Math.min(0.99,prog(lt,0,0.8));rr(196,1306,688*v,38,19);fs('#5aa9ff',0);
  txt(Math.floor(v*100)+'%  กำลังโหลด...',540,1400,44,'#9fd3ff',{f:'Trirong'});},
 heat(lt,ln){bgFill('#120202');
  const v=E.inOut(prog(lt,0,ln.dur*0.8));
  ctx.save();ctx.translate(480,980);const sw=Math.sin(T*30)*v*4;ctx.translate(sw,0);
  rr(-220,-220,440,440,30);fs('#2a2a2a');rr(-160,-160,320,320,20);fs(`rgb(${80+v*170},${60-v*40},${40-v*20})`,6);
  for(let i=0;i<8;i++){line([-220-30,-180+i*50,-220,-180+i*50],10,'#c9a227');line([220,-180+i*50,250,-180+i*50],10,'#c9a227');}
  txt('CPU',0,-60,70,'#fff',{f:'Trirong'});circ(-50,30,16);fs('#fff',4);circ(50,30,16);fs('#fff',4);
  ctx.beginPath();ctx.arc(0,100,40,1.2*Math.PI,1.8*Math.PI);ctx.lineWidth=6;ctx.strokeStyle='#fff';ctx.stroke();
  for(const[sx,sy]of[[150,-120],[-150,-100]]){const d=(T*1.5+sx)%1;ctx.beginPath();ctx.moveTo(sx,sy+d*40-22);ctx.quadraticCurveTo(sx+16,sy+d*40+10,sx,sy+d*40+14);ctx.quadraticCurveTo(sx-16,sy+d*40+10,sx,sy+d*40-22);fs('#9fe3ff',4);}
  ctx.restore();
  thermo(900,1150,0.2+v*0.8);
  ctx.save();ctx.translate(540,520);ctx.beginPath();ctx.arc(0,80,170,Math.PI,0);ctx.lineWidth=20;ctx.strokeStyle='#333';ctx.stroke();
  const a=Math.PI+lerp(0.85,0.12,v)*Math.PI;line([0,80,Math.cos(a)*150,80+Math.sin(a)*150],10,P.red);txt('ความเร็ว ↓',0,140,50,'#fff',{f:'Trirong'});ctx.restore();},
 bed(lt,ln){bedroom(false);
  const sink=E.out(prog(lt,0,1.0));
  ctx.save();ctx.translate(560,1000+sink*30);ell(0,40,420,110);fs('#cfc6e8');ell(0,20,380,80);fs('#e6defa',4);ctx.restore();
  laptop(560,1010+sink*40,0.85,{mood:'evil',heat:0.4+sink*0.6,blocked:1});
  ctx.save();ctx.translate(560,1050);ell(0,20,400,90);ctx.fillStyle='#cfc6e8';ctx.globalAlpha=0.85;ctx.fill();ctx.restore();
  const k=E.back(prog(lt,ln.dur*0.55,ln.dur*0.55+0.3));if(k>0){ctx.save();ctx.translate(560,1180);ctx.scale(k,k);rr(-260,-50,520,100,10);fs(P.blood,5);txt('ช่องระบายลมถูกปิด!',0,4,48,'#fff',{f:'Trirong'});ctx.restore();}
  ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(560,900,10,560,900,500);g.addColorStop(0,`rgba(255,40,20,${0.3+sink*0.4})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,300,W,1200);ctx.restore();},
 scream(lt){bgFill('#000');
  mai(540,560,0.75,{scream:1,eye:1.7});
  const k=E.out(prog(lt,0,0.15));laptop(540,1200,lerp(0.9,1.5,k),{mood:'evil',heat:1,shake:1});
  if(lt<0.12){ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);}
  ctx.save();ctx.globalCompositeOperation='screen';ctx.fillStyle=`rgba(255,0,0,${0.25+0.15*Math.sin(T*30)})`;ctx.fillRect(0,0,W,H);ctx.restore();},
 savior(lt,ln){bgFill('#05070d');
  const o=E.out(prog(lt,0.2,1.2));
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=o;const g=ctx.createLinearGradient(0,300,0,1400);g.addColorStop(0,'rgba(170,250,255,0.9)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;poly([380,300,700,300,1000,1400,80,1400]);ctx.fill();ctx.restore();
  rr(380,300,320,30,0);fs('#fff',0);
  coolPad(540,lerp(600,1050,E.inOut(prog(lt,0.4,ln.dur))),1.4,1);
  for(let i=0;i<10;i++){const a=T+i;star(540+Math.cos(a*0.7)*300,800+Math.sin(a)*300,14,5,4,T*2,'#e8ffff');}},
 cool(lt,ln){bgFill('#0b1626');
  coolPad(540,1150,1.5,1);laptop(540,1060,0.95,{mood:'happy'});
  for(let i=0;i<9;i++){const ph=(T*1.2+i/9)%1,x=200+(i%3)*340+ph*40;ctx.save();ctx.globalAlpha=1-ph;line([x,1080-ph*80,x+120,1040-ph*300],10,P.cyan);ctx.restore();}
  for(let i=0;i<8;i++){const ph=(T*0.8+i/8)%1;circ(540+(i-4)*60+ph*500*(i%2?1:-1),900-ph*400,10*(1-ph));ctx.fillStyle='#ff6b3d';ctx.fill();}
  thermo(940,780,lerp(0.95,0.25,E.inOut(prog(lt,0.3,ln.dur))));
  txt('ยกเครื่อง + เป่าลม',540,560,70,P.cyan,{f:'Trirong',sw:8});},
 relief(lt,ln){bedroom(true);
  ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(800,700,10,800,700,900);g.addColorStop(0,'rgba(255,207,138,0.6)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
  mai(330,880,1.0,{mouth:mouthFor('mai'),relaxed:1});
  coolPad(720,1130,0.8,1);laptop(720,1090,0.55,{mood:'happy'});
  const k=E.back(prog(lt,ln.dur*0.5,ln.dur*0.5+0.3));if(k>0){ctx.save();ctx.translate(780,600);ctx.rotate(0.1);ctx.scale(k,k);rr(-200,-60,400,120,14);fs(P.warm,6);txt('ราคาไม่แพง',0,4,58,OL,{f:'Trirong'});ctx.restore();}},
 cta(lt){bgFill('#030305');
  const fl=hash(Math.floor(T*14))>0.15?1:0.3;
  ctx.save();ctx.globalAlpha=0.35*fl;ctx.fillStyle='#fff7d6';poly([470,300,610,300,820,1300,260,1300]);ctx.fill();ctx.restore();
  const b=E.out(prog(lt,0.1,0.6));ctx.save();ctx.globalAlpha=fl;basket(540,1150,1.1*b);ctx.restore();
  txt('ตะกร้าอยู่ด้านล่าง...',540,700,80,P.red,{f:'Trirong',sw:6,stroke:'#000'});
  for(let i=0;i<6;i++){const x=260+i*110,l=40+((T*60+i*37)%120);line([x,740,x,740+l],6,P.blood);circ(x,740+l,7);ctx.fillStyle=P.blood;ctx.fill();}
  const ay=1350+Math.abs(Math.sin(T*4))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+50,460,ay,500,ay]);fs(P.blood,6);},
};

function header(){ctx.save();ctx.translate(540,200);
  txt(TL.title,0,0,96,P.red,{f:'Trirong',sw:8,stroke:'#000'});
  for(let i=0;i<9;i++){const x=-380+i*95,l=20+hash(i)*50+Math.sin(T+i)*6;line([x,40,x,40+l],7,P.blood);circ(x,40+l,8);ctx.fillStyle=P.blood;ctx.fill();}
  txt(TL.series,0,-80,36,'#cfcfcf',{f:'Trirong'});ctx.restore();}

window.EP={font:'Trirong',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.08*prog(lt,0,ln.dur+0.5);if(name==='scream'){s=1.12;const sh=20*Math.exp(-lt*3);ctx.translate(hash(Math.floor(T*60))*sh-sh/2,hash(Math.floor(T*60)+9)*sh-sh/2);}
    ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Trirong',size:60,col:'#f2f2f2',hl:'#ff4040',stroke:'#000',sw:12,pop:'fade',y:1580,lh:1.35},
  intro(t){bgFill('#000');const k=prog(t,0.3,1.4);ctx.save();ctx.globalAlpha=k*(hash(Math.floor(T*14))>0.2?1:0.4);
    txt('เรื่องสยองโต๊ะคอม',540,900,80,P.red,{f:'Trirong'});txt('เรื่องนี้... อิงจากโต๊ะของคุณ',540,1020,46,'#bbb',{f:'Trirong'});ctx.restore();},
  overlay(t,ln){vignette(0.75);header();},
  post(t){grain(0.09);if(hash(Math.floor(T*24)*3)>0.93){ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fillRect(0,0,W,H);}
    for(let i=0;i<2;i++){const x=hash(Math.floor(T*12)*5+i)*W;line([x,0,x+10,H],2,'rgba(255,255,255,0.12)');}},
  outroGap:0.6,
  outro(k){for(let i=0;i<20;i++){const y=hash(i*3+Math.floor(T*30))*H;ctx.fillStyle=`rgba(0,0,0,${k})`;ctx.fillRect(0,y,W,60+k*200);}ctx.fillStyle=`rgba(0,0,0,${k*k})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill('#000');ctx.save();ctx.globalAlpha=k;txt('คืนที่โน้ตบุ๊กร้อน',540,800,96,P.red,{f:'Trirong'});
    txt('พัดลมรองโน้ตบุ๊ก',540,970,70,'#fff',{f:'Trirong'});txt('อยู่ในตะกร้าด้านล่าง',540,1070,56,'#bbb',{f:'Trirong'});ctx.restore();},
};
