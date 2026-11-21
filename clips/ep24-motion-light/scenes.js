// EP.24 นิทานเรื่อง ไฟใต้โต๊ะ — แนวนิทานก่อนนอน หนังสือภาพกลางคืน (ไฟเซ็นเซอร์ใต้โต๊ะ)
OL = '#2b2350'; LW = 6;
const P = {night:'#1d1b4a',night2:'#2c2a6a',moon:'#fff4c2',page:'#f7efd9',page2:'#eadcb8',kid:'#ffcfa8',pj:'#8fd3ff',wood:'#a9744f',glow:'#fff3a8',fairy:'#ffb3e6'};

function bookFrame(){ctx.save();rr(40,320,1000,1140,30);ctx.lineWidth=22;ctx.strokeStyle=P.page2;ctx.stroke();ctx.lineWidth=6;ctx.strokeStyle=OL;rr(30,310,1020,1160,34);ctx.stroke();ctx.restore();
  line([540,320,540,1460],4,'#00000022');}
function nightRoom(lit=0){const g=ctx.createLinearGradient(0,300,0,1460);g.addColorStop(0,P.night);g.addColorStop(1,P.night2);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  for(let i=0;i<40;i++){const tw=0.5+0.5*Math.sin(T*3+i);circ(hash(i)*W,340+hash(i*2)*500,2+tw*2);ctx.fillStyle=`rgba(255,255,220,${0.4+tw*0.5})`;ctx.fill();}
  circ(860,480,70);fs(P.moon,0);circ(890,460,60);ctx.fillStyle=P.night;ctx.fill();
  rr(120,980,840,40,10);fs(P.wood);line([170,1020,170,1400],18);line([910,1020,910,1400],18);
  ctx.fillStyle='#14123a';ctx.fillRect(-300,1400,W+600,800);
  if(lit>0){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=lit;const g2=ctx.createLinearGradient(0,1020,0,1400);g2.addColorStop(0,'rgba(255,240,160,0.9)');g2.addColorStop(1,'rgba(255,240,160,0.15)');ctx.fillStyle=g2;poly([200,1020,880,1020,980,1400,100,1400]);ctx.fill();ctx.restore();rr(380,1022,320,16,8);fs(P.glow,3);}}
function kid(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.5),y+boil(2,1.5));ctx.scale(s,s);ctx.rotate(o.rot||0);
  rr(-90,100,180,200,60);fs(P.pj);for(let i=0;i<5;i++)star(-50+i*25,160+(i%2)*60,10,4,5,0,'#fff',0);
  ell(0,0,90,86);fs(P.kid);ctx.beginPath();ctx.arc(0,-20,90,Math.PI*1.05,Math.PI*1.95);ctx.closePath();fs('#5a3a2a');
  if(o.cap){poly([-60,-70,60,-70,90,-170]);fs('#7b6cf6',5);circ(90,-170,14);fs('#fff',4);}
  for(const ex of[-30,30]){if(o.happy){ctx.beginPath();ctx.arc(ex,4,12,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}ell(ex,4,o.big?16:10,o.big?18:12);fs('#fff',4);circ(ex+(o.look||0)*4,6,5);ctx.fillStyle=OL;ctx.fill();}
  ell(0,46,10+m*6,3+m*12);fs('#c0405a',4);ell(-50,30,14,7);ctx.fillStyle='#ff9fb0aa';ctx.fill();ell(50,30,14,7);ctx.fill();
  if(o.bump){star(70,-90,30,12,5,T*4,'#ffe066',4);}ctx.restore();}
function fairy(x,y,s){ctx.save();ctx.translate(x,y+Math.sin(T*3)*12);ctx.scale(s,s);for(const sd of[-1,1]){ell(sd*60,-10,60,90,sd*0.5);ctx.fillStyle='#ffffffaa';ctx.fill();}
  ell(0,40,40,70);fs(P.fairy,5);circ(0,-40,40);fs(P.kid,5);for(const ex of[-14,14]){circ(ex,-40,5);ctx.fillStyle=OL;ctx.fill();}line([50,20,130,-60],6,'#c9a227');star(140,-70,26,10,5,T*3,'#ffe066',4);
  for(let i=0;i<8;i++){const ph=(T+i/8)%1;circ(140-ph*80+Math.sin(i)*30,-70+ph*160,4*(1-ph));ctx.fillStyle='#fff7a8';ctx.fill();}ctx.restore();}
function sensorLight(x,y,s,on){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-200,-24,400,48,24);fs('#eee');rr(-180,-14,360,28,14);fs(on?P.glow:'#ccc',0);circ(170,0,14);fs('#555',3);
  if(on){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.6;poly([-190,24,190,24,300,400,-300,400]);ctx.fillStyle='#fff3a8';ctx.fill();ctx.restore();}ctx.restore();}
function pageText(t,y,k){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);txt(t,540,y,54,P.moon,{f:'Mali',sw:8,stroke:OL,maxW:920});ctx.restore();}

const SCENES={
 book(lt,ln){nightRoom(0);kid(540,860,1.0,{mouth:0,look:1});ctx.save();ctx.translate(700,1300);ctx.rotate(lt*3);rr(-40,-6,80,12,6);fs('#e74c3c',3);ctx.restore();
  pageText('กาลครั้งหนึ่ง...',560,prog(lt,0.2,0.8));},
 dark(lt){bgFill('#06051a');for(let i=0;i<2;i++){const ex=470+i*140;ell(ex,900,36,40);ctx.fillStyle='#fff';ctx.fill();circ(ex+Math.sin(T*2)*10,904,12);ctx.fillStyle='#000';ctx.fill();}
  ctx.save();ctx.globalAlpha=0.2;kid(540,900,1.1,{big:1});ctx.restore();},
 bump(lt,ln){nightRoom(0);const hit=lt>ln.dur*0.6;kid(540,hit?1080:1180,0.8,{mouth:mouthFor('teller'),bump:hit,rot:hit?-0.2:0.1,big:hit});
  if(hit)txt('โป๊ก!',800,880,110,'#ffe066',{f:'Mali',sw:12,stroke:OL});},
 why(lt,ln){nightRoom(0);ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.5;poly([520,300,560,300,800,980,280,980]);ctx.fillStyle='#fff3a8';ctx.fill();ctx.restore();
  circ(540,320,30);fs(P.glow,5);
  ctx.save();ctx.fillStyle='rgba(0,0,0,0.55)';poly([120,1020,960,1020,1000,1400,80,1400]);ctx.fill();ctx.restore();
  txt('มุมอับแสง',540,1210,70,'#ff9a9a',{f:'Mali',sw:10,stroke:OL});pageText('ไฟเพดานส่องไม่ถึงใต้โต๊ะ',620,prog(lt,0.3,0.9));},
 fairy(lt){nightRoom(0);fairy(560,700,1.2);const k=E.back(prog(lt,0.6,1.1));if(k>0){ctx.save();ctx.translate(540,1020);ctx.scale(k,k);sensorLight(0,0,0.9,false);ctx.restore();}},
 glow(lt,ln){const on=prog(lt,0.6,0.9);nightRoom(on);kid(300,1180,0.6,{mouth:0,happy:on>0.5});
  ctx.save();ctx.strokeStyle='#8fd3ff';ctx.lineWidth=4;for(let i=0;i<3;i++){const r=(T*120+i*60)%180;ctx.globalAlpha=1-r/180;ctx.beginPath();ctx.arc(700,1030,r,0.2*Math.PI,0.8*Math.PI);ctx.stroke();}ctx.restore();
  pageText('ขยับ = ไฟติดเอง · ไม่ขยับ = ดับเอง',560,prog(lt,0.4,1.0));},
 tip(lt){nightRoom(0.8);ctx.save();ctx.translate(540,840);rr(-380,-40,760,60,10);fs(P.wood);sensorLight(0,40,0.8,true);
  line([200,60,200,300],6,'#2fbf71');poly([180,280,220,280,200,320]);fs('#2fbf71',0);ctx.restore();
  txt('✓ ติดใต้ขอบโต๊ะ หันแสงลงพื้น',540,600,52,'#b8ffcb',{f:'Mali',sw:8,stroke:OL,maxW:960});txt('✗ หันเข้าหน้า แสงแยงตา',540,1280,50,'#ff9a9a',{f:'Mali',sw:8,stroke:OL});},
 bonus(lt){nightRoom(0.6);ctx.save();ctx.translate(540,900);sensorLight(0,0,1.1,true);curve([-200,0,-300,120,-200,260],10,'#ddd');rr(-230,250,60,40,6);fs('#888',4);ctx.restore();
  txt('ชาร์จ USB ได้',540,600,68,P.moon,{f:'Mali',sw:8,stroke:OL});txt('ไม่ต้องเปลี่ยนถ่าน',540,1200,56,'#b8ffcb',{f:'Mali',sw:8,stroke:OL});},
 found(lt,ln){nightRoom(1);kid(540,880,1.0,{mouth:mouthFor('kid'),happy:1});ctx.save();ctx.translate(700,700);ctx.rotate(-0.4);rr(-60,-8,120,16,8);fs('#e74c3c',3);ctx.restore();
  const k=E.back(prog(lt,ln.dur*0.5,ln.dur*0.7));if(k>0){ctx.save();ctx.translate(800,560);ctx.scale(k,k);rr(-170,-50,340,100,50);fs(P.fairy,5);txt('ราคาไม่แพง',0,4,48,OL,{f:'Mali'});ctx.restore();}},
 cta(lt){nightRoom(0.7);fairy(300,640,0.8);const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(680,900);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.glow;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  pageText('ฝันดีนะ · ตะกร้าด้านล่าง',1240,prog(lt,0.4,1.0));},
};

window.EP={font:'Mali',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,900);ctx.scale(s,s);ctx.translate(-540,-900);},
  sub:{f:'Mali',size:58,col:'#2b2350',hl:'#7b3fe4',sw:0,box:'#f7efd9f2',boxLine:5,boxLineCol:'#2b2350',boxR:26,boxPad:28,pop:'fade',y:1600,lh:1.35},
  intro(t){bgFill(P.night);const k=E.inOut(prog(t,0,1.2));ctx.save();ctx.translate(540,900);ctx.scale(lerp(0.3,1,k),1);rr(-380,-280,760,560,20);fs(P.page,8);txt('นิทานก่อนนอน',0,-40,90,OL,{f:'Mali'});txt('🌙',0,90,90,OL,{f:'Mali'});ctx.restore();},
  overlay(){bookFrame();ctx.save();ctx.translate(540,195);rr(-430,-90,860,180,90);fs(P.page,6);txt(TL.series,0,-40,34,'#7b6cf6',{f:'Mali'});txt(TL.title,0,30,70,OL,{f:'Mali',maxW:800});ctx.restore();},
  outroGap:0.7,
  outro(k){ctx.save();ctx.translate(540,960);ctx.scale(lerp(1,0,E.inOut(k)),1);ctx.restore();ctx.fillStyle=`rgba(29,27,74,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill(P.night);ctx.save();ctx.globalAlpha=k;rr(140,620,800,540,30);fs(P.page,8);txt('จบแล้วจ้า ฝันดีนะ',540,760,70,OL,{f:'Mali'});
    txt('ไฟเซ็นเซอร์ใต้โต๊ะ',540,900,74,'#7b3fe4',{f:'Mali'});txt('อยู่ในตะกร้าด้านล่าง',540,1010,56,OL,{f:'Mali'});ctx.restore();},
};
