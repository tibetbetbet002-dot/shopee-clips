// EP.2 คดีตาล้า — แนวนักสืบฟิล์มนัวร์ (ไฟแขวนจอ)
OL = '#0a0f18'; LW = 7;
const P = {night:'#0d1b2a',navy:'#1b263b',slate:'#2c4a5e',amber:'#ffb347',amberD:'#c97b1a',blue:'#7fd6ff',
  pink:'#ff4f9a',cream:'#f4ead5',red:'#d7263d',grey:'#8d99ae',coat:'#c8a978',hat:'#3b2f2a',skin:'#f1c7a5',hair:'#1d1a2b',hood:'#7b5ea7'};

// ---------- ตัวละคร ----------
function cat(x,y,s,o={}){const m=o.mouth||0;
  ctx.save();ctx.translate(x+boil(11,1.6),y+boil(12,1.6));ctx.scale(s,s);
  // เสื้อโค้ต
  poly([-150,118,150,118,200,540,-200,540]);fs(P.coat);
  poly([-150,118,-40,150,-70,330,-190,520]);fs('#b8975f',5);poly([150,118,40,150,70,330,190,520]);fs('#b8975f',5);
  line([-185,340,185,340],12,'#8a6a3c');rr(-24,326,48,30,6);fs('#6b5230',4);
  for(const by of[400,460])circ(-14,by,9),fs('#6b5230',3);
  poly([-90,110,-150,40,-30,120]);fs(P.coat,5);poly([90,110,150,40,30,120]);fs(P.coat,5);
  // หู
  poly([-112,-50,-92,-150,-30,-100]);fs(P.grey);poly([112,-50,92,-150,30,-100]);fs(P.grey);
  poly([-98,-70,-88,-125,-55,-98]);fs('#e8a0b4',0);poly([98,-70,88,-125,55,-98]);fs('#e8a0b4',0);
  ell(0,0,122,112);fs(P.grey);
  ell(0,52,70,48);fs('#c3cad6',0);
  // ตา
  const lid=o.lid??0.38, dil=o.dil??1, b=blink(5);
  for(const ex of[-46,46]){
    if(o.glow){ctx.save();ctx.shadowColor='#ffd23f';ctx.shadowBlur=40;ell(ex,-8,32,36);fs('#ffe066',0);ctx.restore();}
    ell(ex,-8,32,36);fs('#ffd23f',5);
    ell(ex+(o.look||0)*10,-8,5*dil,28);ctx.fillStyle=OL;ctx.fill();
    const L=Math.max(lid,b);if(L>0){ctx.save();ell(ex,-8,33,37);ctx.clip();ctx.fillStyle=P.grey;ctx.fillRect(ex-40,-50,80,76*L);ctx.restore();
      line([ex-32,-46+76*L,ex+32,-46+76*L],5);}}
  poly([-12,30,12,30,0,44]);fs('#e88aa6',4);
  ell(0,62,10+m*10,2+m*18);fs('#5a1d2a',5);
  line([-12,46,-24,54],4);line([12,46,24,54],4);
  for(const sy of[38,54])line([-60,sy,-150,sy-8+sy*0.1],3,'#e9edf2'),line([60,sy,150,sy-8+sy*0.1],3,'#e9edf2');
  // หมวก
  ell(0,-92,178,30);fs(P.hat);rr(-108,-205,216,118,34);fs(P.hat);rr(-108,-122,216,26,4);fs('#8b5e3c',5);
  if(o.glass){line([150,300,250,180],22,OL);line([150,300,250,180],12,'#6b4f3a');circ(290,135,70);fs('#bfe9ff66',12);
    ctx.save();circ(290,135,62);ctx.clip();line([250,100,275,90],8,'#ffffffaa');ctx.restore();}
  ctx.restore();}

function fon(x,y,s,o={}){const m=o.mouth||0,tired=o.tired||0,happy=o.happy||0;
  ctx.save();ctx.translate(x+boil(21,1.6),y+boil(22,1.6));ctx.scale(s,s);ctx.rotate(Math.sin(T*1.3)*0.03*tired);
  ell(0,40,150,175);fs(P.hair);
  rr(-165,150,330,330,100);fs(P.hood);poly([-60,150,0,215,60,150]);fs('#634a8a',5);
  line([-40,190,-48,290],6,'#e9e0f5');line([40,190,48,290],6,'#e9e0f5');
  rr(-30,100,60,70,12);fs(P.skin);
  ell(0,0,105,122);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-112,10);ctx.quadraticCurveTo(-120,-135,0,-132);ctx.quadraticCurveTo(120,-135,112,10);
  ctx.quadraticCurveTo(80,-60,10,-62);ctx.quadraticCurveTo(-60,-70,-112,10);ctx.closePath();fs(P.hair);
  for(const ex of[-42,42]){
    if(happy>0.5){ctx.beginPath();ctx.arc(ex,0,22,Math.PI*1.1,Math.PI*1.9);ctx.lineWidth=8;ctx.strokeStyle=OL;ctx.stroke();continue;}
    ell(ex,0,27,24);fs('#fff',6);
    if(tired){for(let v=0;v<3;v++)line([ex-24+v*4,-4+v*8,ex-10,0+v*3],2.5,'#e0414f');}
    circ(ex,4,9);ctx.fillStyle=OL;ctx.fill();
    const L=0.15+tired*0.4;ctx.save();ell(ex,0,28,25);ctx.clip();ctx.fillStyle=P.skin;ctx.fillRect(ex-30,-26,60,50*L);ctx.restore();
    line([ex-27,-26+50*L,ex+27,-26+50*L],6);
    if(tired){ctx.beginPath();ctx.arc(ex,22,22,0.2*Math.PI,0.8*Math.PI);ctx.lineWidth=5;ctx.strokeStyle='#8a5a9a';ctx.stroke();}}
  line([-62,-40-happy*10,-24,-38-happy*6],6);line([24,-38-happy*6,62,-40-happy*10],6);
  if(happy>0.5&&m<0.1){ctx.beginPath();ctx.arc(0,52,32,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=7;ctx.strokeStyle=OL;ctx.stroke();}
  else{ell(0,64,16+m*8,3+m*20);fs('#7a1f2e',6);}
  if(happy){ell(-70,40,20,10);ctx.fillStyle='#ff8fa3aa';ctx.fill();ell(70,40,20,10);ctx.fill();}
  ctx.restore();}

function monitorFront(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-90,190,180,24,10);fs('#2b303c');rr(-20,140,40,60,6);fs('#2b303c');
  rr(-240,-160,480,310,20);fs('#1a1f2b');
  if(o.glare){ctx.save();ctx.shadowColor='#bfeaff';ctx.shadowBlur=90;rr(-218,-138,436,266,8);fs('#f2fbff',0);ctx.restore();}
  rr(-218,-138,436,266,8);fs(o.screen||'#cdeeff',5);
  if(o.face){line([-120,-50,-40,-20],12);line([120,-50,40,-20],12);circ(-75,-5,14);ctx.fillStyle=OL;ctx.fill();circ(75,-5,14);ctx.fill();
    ctx.beginPath();ctx.arc(0,80,60,1.15*Math.PI,1.85*Math.PI);ctx.lineWidth=10;ctx.strokeStyle=OL;ctx.stroke();}
  if(o.bar){rr(-180,-190,360,30,12);fs('#151820');rr(-30,-166,60,40,6);fs('#151820');
    if(o.on){ctx.save();ctx.globalAlpha=0.9*o.on;rr(-170,-170,340,8,4);fs('#fff1c9',0);ctx.restore();}}
  ctx.restore();}

function rain(alpha=0.5,n=140,len=60){ctx.save();ctx.strokeStyle=`rgba(200,225,255,${alpha})`;ctx.lineWidth=3;ctx.lineCap='round';
  for(let i=0;i<n;i++){const sp=1400+hash(i)*700,x0=hash(i*3.7)*1300-100,y0=((hash(i*9.1)*2400+T*sp)%2400)-200;
    ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0-len*0.18,y0+len);ctx.stroke();}ctx.restore();}
function blinds(a=0.25){ctx.save();ctx.fillStyle=`rgba(0,0,0,${a})`;ctx.translate(540,960);ctx.rotate(-0.18);
  for(let i=-14;i<14;i++)ctx.fillRect(-1200,i*110,2400,46);ctx.restore();}
function darkRoom(col='#33416b'){ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle=col;ctx.fillRect(-300,-300,W+600,H+600);ctx.restore();}
function glow(x,y,r,col,a=0.8){ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();}
function card(label,x,y,k,rot){if(k<=0)return;const sc=lerp(1.8,1,E.out(k));ctx.save();ctx.globalAlpha=Math.min(1,k*2);ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);
  ctx.font='60px Bai';const w=ctx.measureText(label).width+90;rr(-w/2,-62,w,124,6);fs('#f7f1e3',5);
  line([-w/2,-30,w/2,-30],3,'#e07a8a');rr(-50,-80,100,34,4);fs('#e8dcb0aa',0);
  txt(label,0,12,60,'#1b1b1b',{f:'Bai'});ctx.restore();}

// ---------- ฉาก ----------
function roomBack(warm){bgFill(warm?'#e9b872':'#1b263b');
  ctx.fillStyle=warm?'#dda862':'#18213a';for(let i=0;i<9;i++)ctx.fillRect(i*130,0,60,1400);
  rr(90,380,300,380,10);fs(warm?'#22305a':'#0d1b2a',7);
  if(warm){circ(300,480,46);fs('#fff5cc',0);}else{ctx.save();rr(90,380,300,380,10);ctx.clip();rain(0.7,40,50);ctx.restore();}
  line([240,385,240,755],6);line([95,570,385,570],6);
  circ(840,520,80);fs(warm?'#f7f1e3':'#c9d1dc');line([840,520,840,470],7);line([840,520,800,520],7);
  ctx.fillStyle=warm?'#b8834a':'#0f1626';ctx.fillRect(-300,1380,W+600,800);}

const SCENES={
 city(lt){const t=lt+TL.lines[0].start;
  const g=ctx.createLinearGradient(0,0,0,1600);g.addColorStop(0,'#0b1020');g.addColorStop(1,'#24324f');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  circ(860,330,90);fs('#e7e3cf',0);ell(800,360,180,40);ctx.fillStyle='#1b263bcc';ctx.fill();
  const bl=[[-40,900,220],[160,700,200],[330,560,380],[690,780,190],[860,640,260]];
  for(const[bx,by,bw]of bl){ctx.fillStyle='#0a101c';ctx.fillRect(bx,by,bw,1500);
    for(let r=0;r<12;r++)for(let c=0;c<Math.floor(bw/60);c++){const h=hash(bx+r*13+c*7);if(h>0.78){ctx.fillStyle=h>0.93?P.amber:'#7a5a2a';ctx.fillRect(bx+20+c*60,by+40+r*80,30,44);}}}
  // หน้าต่างเป้าหมาย (แสงจอฟ้า กะพริบ)
  const fl=0.75+0.25*Math.sin(t*23)*Math.sin(t*7);
  ctx.save();ctx.shadowColor=P.blue;ctx.shadowBlur=60*fl;ctx.fillStyle=`rgba(160,225,255,${fl})`;ctx.fillRect(500,740,80,100);ctx.restore();
  line([540,740,540,840],5,'#0a101c');
  // ป้ายนีออน
  const on=hash(Math.floor(t*8))>0.12;rr(700,900,300,100,14);fs('#0a101c',6,on?P.pink:'#5a2040');
  txt('เปิด 24 ชม.',850,952,54,on?P.pink:'#5a2040',{f:'Mitr'});if(on)glow(850,950,240,'rgba(255,79,154,0.5)',0.6);
  // ถนน + เสาไฟ + แมว
  ctx.fillStyle='#070b14';ctx.fillRect(-300,1380,W+600,800);
  ctx.save();ctx.globalAlpha=0.25;ctx.fillStyle=P.amber;poly([170,820,110,820,-60,1420,380,1420]);ctx.fill();ctx.restore();
  line([140,1420,140,800,190,780],14,'#2a2f3a');ell(170,810,36,14);fs(P.amber,5);
  cat(260,1180,0.62,{mouth:mouthFor('cat'),look:1});
  rain(0.45,160,70);
  const fla=Math.exp(-Math.max(0,t-0.15)*7)*(t>0.15?1:0)+Math.exp(-Math.max(0,t-0.45)*9)*(t>0.45?0.7:0);
  if(fla>0.01){ctx.fillStyle=`rgba(230,240,255,${fla*0.7})`;ctx.fillRect(-300,-300,W+600,H+600);}
 },
 victim(lt){roomBack(false);
  fon(540,900,1.45,{tired:1,mouth:mouthFor('fon')});
  rr(240,1040,600,360,22);fs('#11151f');ctx.save();ctx.strokeStyle='#7fd6ff';ctx.lineWidth=4;rr(250,1050,580,340,18);ctx.stroke();ctx.restore();
  rr(-40,1380,1160,700,10);fs('#3a2a22');
  darkRoom('#6a7bb0');
  glow(540,880,520,'rgba(127,214,255,0.9)',0.75);glow(540,1060,260,'rgba(220,245,255,0.8)',0.5);
  txt('02:00',840,640,44,'#c9d1dc',{f:'Bai'});
 },
 lineup(lt){bgFill('#4b5563');
  for(let i=0;i<9;i++){const y=520+i*110;line([0,y,W,y],4,'#9aa3b1');txt((200-i*10)+'',60,y-26,36,'#cfd5de',{f:'Bai'});}
  const spot=prog(lt,0.85,1.0);
  // ผู้ต้องสงสัย 3 ราย
  ctx.save();ctx.translate(200,1150);rr(-90,-140,180,200,30);fs('#f7f1e3');ctx.beginPath();ctx.arc(95,-40,50,-1.2,1.2);ctx.lineWidth=20;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=10;ctx.strokeStyle='#f7f1e3';ctx.stroke();
  ell(0,-140,90,20);fs('#6b3e26',6);ctx.restore();
  ctx.save();ctx.translate(880,1110);rr(-75,-160,150,280,26);fs('#2b303c');rr(-60,-140,120,230,12);fs('#3d5a80',4);ctx.restore();
  monitorFront(540,990,0.95,{glare:spot>0,face:1,screen:spot>0?'#f7fdff':'#9fbfd6'});
  for(const[px,n]of[[200,1],[540,2],[880,3]]){rr(px-70,1290,140,80,8);fs('#111',5);txt('No.'+n,px,1332,42,'#fff',{f:'Bai'});}
  darkRoom(spot>0?'#9aa0ad':'#5a6170');
  if(spot>0){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.55*spot;ctx.fillStyle='#fff3c4';poly([470,300,610,300,860,1420,220,1420]);ctx.fill();ctx.restore();
    const k=E.back(prog(lt,1.0,1.3));ctx.save();ctx.translate(540,520);ctx.scale(k,k);ctx.rotate(-0.06);rr(-330,-60,660,120,10);fs(P.red,6);
    txt('ผู้ต้องสงสัย: จอสว่างจ้า',0,6,58,'#fff',{f:'Mitr',maxW:620});ctx.restore();}
  const fl=Math.exp(-Math.max(0,lt-0.95)*10)*(lt>0.95);if(fl>0.01){ctx.fillStyle=`rgba(255,255,255,${fl*0.8})`;ctx.fillRect(-300,-300,W+600,H+600);}
 },
 iris(lt,ln){const side=Math.floor(lt/0.62)%2;
  ctx.fillStyle='#dff4ff';ctx.fillRect(-300,-300,840,H+600);ctx.fillStyle='#04060b';ctx.fillRect(540,-300,900,H+600);
  glow(200,700,400,'rgba(255,255,255,0.9)',0.6);
  txt('จอสว่าง',250,560,70,'#1b263b',{f:'Chon'});txt('โต๊ะมืด',830,560,70,'#c9d1dc',{f:'Chon'});
  const ph=(lt%0.62)/0.62, tgt=side?1:0, k=E.out(clamp(ph*2.2));
  const dark=side?lerp(0,1,k):lerp(1,0,k);
  const gx=lerp(side?-1:1,side?1:-1,k)*95;
  ctx.save();ctx.translate(540,970);
  ctx.beginPath();ctx.moveTo(-420,0);ctx.quadraticCurveTo(0,-330,420,0);ctx.quadraticCurveTo(0,330,-420,0);ctx.closePath();fs('#fffaf2',12);
  ctx.save();ctx.clip();
  const fat=prog(lt,0,ln.dur);for(let v=0;v<8;v++){const a=v*0.8;curve([Math.cos(a)*420,Math.sin(a)*200,Math.cos(a)*300,Math.sin(a)*150+20,Math.cos(a)*210*lerp(1.4,1,fat),Math.sin(a)*120],4,`rgba(220,40,60,${fat})`);}
  circ(gx,0,160);fs('#7a4b2a',8);for(let r=0;r<24;r++){const a=r*Math.PI/12;line([gx+Math.cos(a)*60,Math.sin(a)*60,gx+Math.cos(a)*150,Math.sin(a)*150],4,'#5a3518');}
  circ(gx,0,lerp(38,118,dark));ctx.fillStyle='#050505';ctx.fill();circ(gx+50,-55,24);ctx.fillStyle='#fff';ctx.fill();
  ctx.restore();
  ctx.beginPath();ctx.moveTo(-420,0);ctx.quadraticCurveTo(0,-330,420,0);ctx.lineWidth=16;ctx.strokeStyle=OL;ctx.stroke();
  for(let i=0;i<9;i++){const u=-0.8+i*0.2,px=u*420,py=-(1-u*u)*165;line([px,py,px*1.12,py-60],8);}
  ctx.restore();
  txt(side?'รูม่านตาขยาย':'รูม่านตาหด',540,1250,56,P.amber,{f:'Mitr',sw:10});
  rr(190,1340,700,44,22);fs('#222',5);rr(196,1346,688*clamp(0.15+fat*0.85),32,16);fs(P.red,0);
  txt('ความล้า',540,1418,40,'#fff',{f:'Bai',sw:8});
 },
 evidence(lt){
  if(lt<1.05){const z=1+E.inOut(prog(lt,0,1.05))*0.35;ctx.save();ctx.translate(540,960);ctx.scale(z,z);ctx.translate(-540,-960);
    bgFill('#6b4f3a');for(let i=0;i<220;i++){circ(hash(i)*W,hash(i*2.3)*H,3+hash(i*5)*4);ctx.fillStyle='#5d4331';ctx.fill();}
    const pins=[[220,620,-0.1,'eye'],[860,640,0.08,'mon'],[240,1260,0.06,'clock']];
    for(const[px,py,r,k]of pins){ctx.save();ctx.translate(px,py);ctx.rotate(r);rr(-130,-150,260,300,6);fs('#f7f1e3',5);rr(-110,-130,220,200,4);fs('#2c3e50',4);
      if(k==='eye'){ell(0,-30,70,40);fs('#fff',5);circ(0,-30,22);ctx.fillStyle='#7a4b2a';ctx.fill();line([-60,-30,-20,-20],3,P.red);}
      if(k==='mon'){rr(-70,-80,140,100,6);fs('#e8fbff',5);}
      if(k==='clock'){circ(0,-30,60);fs('#fff',5);line([0,-30,0,-75],6);line([0,-30,30,-30],6);}
      txt(k==='eye'?'ผู้เสียหาย':k==='mon'?'ผู้ต้องสงสัย':'เวลา 02:00',0,110,34,'#1b1b1b',{f:'Sri'});circ(0,-140,12);fs(P.red,4);ctx.restore();}
    for(const[px,py]of pins)line([px,py-140,540,960],5,P.red);
    ctx.save();ctx.translate(540,980);ctx.rotate(-0.04);rr(-300,-130,600,260,16);fs('#ffffff40',6,'#dfe6ee');
    rr(-240,-30,480,44,14);fs('#151820');rr(-60,14,120,50,8);fs('#151820');
    rr(-160,-120,320,60,8);fs(P.red,4);txt('หลักฐาน A: ไฟแขวนจอ',0,-88,32,'#fff',{f:'Bai'});ctx.restore();
    ctx.restore();return;}
  // สาธิต: มุมข้าง
  const on=prog(lt,1.05,1.3);
  bgFill('#141b2b');
  ctx.fillStyle='#3a2a22';ctx.fillRect(-300,1300,W+600,600);line([-50,1300,W+50,1300],8);
  rr(660,1270,160,30,8);fs('#2b303c');rr(726,1100,28,180,6);fs('#2b303c');
  rr(720,820,36,340,10);fs('#1a1f2b');rr(712,830,10,320,4);fs(P.blue,3);
  rr(610,790,160,32,10);fs('#151820');rr(740,810,40,40,6);fs('#151820');
  if(on>0){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.75*on;const g=ctx.createLinearGradient(0,820,0,1300);
    g.addColorStop(0,'#ffe2a8');g.addColorStop(1,'rgba(255,179,71,0.25)');ctx.fillStyle=g;poly([615,822,700,822,620,1300,180,1300]);ctx.fill();ctx.restore();
    ell(400,1300,240,26);ctx.fillStyle=`rgba(255,210,140,${0.5*on})`;ctx.fill();}
  rr(200,1262,300,30,8);fs('#c9d1dc',5);
  const k1=prog(lt,1.4,1.7),k2=prog(lt,lt>0?1.9:9,2.2);
  if(k1>0){ctx.save();ctx.globalAlpha=k1;ctx.setLineDash([18,12]);line([640,830,380,1240],8,'#7dffa8');ctx.setLineDash([]);
    txt('✓ ส่องลงโต๊ะ',300,1110,56,'#7dffa8',{f:'Mitr',sw:10});ctx.restore();}
  if(k2>0){ctx.save();ctx.globalAlpha=k2;line([660,830,712,900],8,'#ff6b6b');line([665,860,705,840],0);
    line([660,880,720,850],10,'#ff6b6b');txt('✗ ไม่แยงจอ',860,700,56,'#ff8a8a',{f:'Mitr',sw:10});ctx.restore();}
  txt('ไฟแขวนจอ',540,560,96,P.amber,{f:'Chon',sw:12});
  vignette(0.5);
 },
 lit(lt,ln){roomBack(true);
  glow(540,820,700,'rgba(255,200,120,0.6)',0.5);
  fon(540,900,1.45,{happy:1,mouth:mouthFor('fon')});
  monitorFront(540,1140,0.9,{bar:1,on:1,screen:'#2e4a7a'});
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.45;ctx.fillStyle='#ffd9a0';poly([400,980,680,980,900,1400,180,1400]);ctx.fill();ctx.restore();
  rr(-40,1380,1160,700,10);fs('#7a4a2a');
  const d=ln.dur;
  card('โต๊ะสว่าง',270,560,prog(lt,0.05,0.3),-0.08);card('ไม่กินที่',810,690,prog(lt,d*0.33,d*0.33+0.25),0.07);
  card('ราคาสบายกระเป๋า',540,1240,prog(lt,d*0.62,d*0.62+0.25),-0.03);
  for(let i=0;i<6;i++){const a=T*1.5+i;star(540+Math.cos(a)*330,820+Math.sin(a*1.3)*220,18,6,4,T*2+i,'#fff7c2');}
 },
 tip(lt,ln){bgFill('#1b263b');
  ctx.save();ctx.translate(540,1000);ctx.rotate(-0.025);rr(-430,-560,860,1060,10);fs('#fdf6e3',7);
  for(let i=0;i<14;i++)line([-430,-420+i*70,430,-420+i*70],3,'#9cc3e8');line([-330,-560,-330,500],4,'#e07a8a');
  for(let i=0;i<5;i++){circ(-390,-470+i*220,16);fs('#1b263b',0);}
  txt('ทิปจากสารวัตร',60,-480,62,P.red,{f:'Sri'});txt('กฎ 20-20-20',60,-380,104,'#1b263b',{f:'Sri'});
  const d=ln.dur,rows=[[0.18,'ทุก 20 นาที','clock'],[0.45,'มองไกล 20 ฟุต (~6 เมตร)','far'],[0.72,'นาน 20 วินาที','watch']];
  rows.forEach(([f,label,ic],i)=>{const k=prog(lt,d*f,d*f+0.25);if(k<=0)return;const y=-200+i*210;
    ctx.save();ctx.globalAlpha=k;ctx.translate(-240,y);ctx.scale(E.back(k),E.back(k));
    if(ic==='clock'){circ(0,0,60);fs('#fff',6);line([0,0,0,-40],7);line([0,0,30,10],7);}
    if(ic==='far'){poly([-70,40,-20,-40,20,10,40,-20,80,40]);fs('#7fbf7f',6);circ(40,-50,16);fs(P.amber,4);}
    if(ic==='watch'){circ(0,8,56);fs('#fff',6);rr(-14,-70,28,22,4);fs('#1b263b',0);line([0,8,22,-20],7);}
    ctx.restore();ctx.globalAlpha=k;txt(label,-140,y+6,58,'#1b263b',{f:'Sri',align:'left',maxW:540});ctx.globalAlpha=1;});
  ctx.restore();
 },
 closed(lt){bgFill('#2a1f1a');
  const sh=Math.exp(-Math.max(0,lt-0.3)*12)*(lt>0.3)*18;ctx.save();ctx.translate(hash(Math.floor(T*60))*sh-sh/2,hash(Math.floor(T*60)+5)*sh-sh/2);
  ctx.save();ctx.translate(540,800);ctx.rotate(0.03);rr(-420,-380,840,760,14);fs('#d9b779',7);rr(-420,-440,300,80,14);fs('#d9b779',7);
  txt('คดีตาล้า',-270,-398,44,'#5a3e1b',{f:'Bai'});
  for(let i=0;i<6;i++)line([-340,-260+i*70,lerp(200,340,hash(i)),-260+i*70],8,'#b89755');
  const k=prog(lt,0.1,0.3);if(k>0){ctx.save();ctx.rotate(-0.2);const s=lerp(2.6,1,E.out(k));ctx.scale(s,s);ctx.globalAlpha=Math.min(1,k*1.5);
    rr(-300,-110,600,220,20);ctx.lineWidth=16;ctx.strokeStyle=P.red;ctx.stroke();txt('ปิดคดี',0,10,150,P.red,{f:'Chon'});ctx.restore();}
  ctx.restore();ctx.restore();
  const b=E.back(prog(lt,0.6,0.95));
  ctx.save();ctx.translate(540,1290);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,70,Math.PI,0);ctx.lineWidth=22;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=10;ctx.strokeStyle='#ffd27a';ctx.stroke();
  poly([-130,-50,130,-50,100,90,-100,90]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*44,-34,i*36,76],6,'#b35500');line([-118,20,118,20],6,'#b35500');
  poly([-130,-50,130,-50,100,90,-100,90]);fs(null);ctx.restore();
  txt('กดตะกร้าด้านล่าง',540,1440,70,P.amber,{f:'Chon',sw:12});
 },
 gag(lt){bgFill('#030407');
  ctx.save();ctx.globalAlpha=0.18;cat(540,960,1.6,{mouth:0});ctx.restore();
  ctx.save();ctx.translate(540,960);ctx.scale(1.6,1.6);
  const b=lt>1.0&&lt<1.12;
  for(const ex of[-46,46]){if(b){line([ex-30,-8,ex+30,-8],6,'#ffd23f');continue;}
    ctx.save();ctx.shadowColor='#ffd23f';ctx.shadowBlur=50;ell(ex,-8,32,36);fs('#ffe066',0);ctx.restore();
    ell(ex,-8,lerp(5,22,prog(lt,0,0.8)),28);ctx.fillStyle='#000';ctx.fill();}
  ctx.restore();
 },
};

function camera(name,lt,ln){const d=ln?ln.dur:3;
  if(name==='city'){const k=E.inOut(prog(lt+TL.lines[0].start,0,TL.lines[0].start+d));const s=1+0.32*k;
    ctx.translate(540,790);ctx.scale(s,s);ctx.translate(-540,-790);return;}
  if(name==='lineup'){ctx.translate(540,960);ctx.rotate(-0.05);ctx.scale(1.08,1.08);ctx.translate(-540,-960);return;}
  if(name==='gag'){const s=1+prog(lt,0,d)*0.12;ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);return;}
  const s=1+0.05*prog(lt,0,d+0.5);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);}

function header(){
  ctx.save();ctx.translate(540,190);ctx.rotate(-0.015);
  rr(-300,-95,600,190,6);fs('#f7f1e3ee',6);
  rr(-360,-112,120,40,4);ctx.save();ctx.rotate(-0.3);ctx.restore();
  ctx.fillStyle='#e8dcb0cc';ctx.save();ctx.rotate(-0.5);ctx.fillRect(-260,-210,120,36);ctx.restore();ctx.save();ctx.rotate(0.5);ctx.fillRect(140,-210,120,36);ctx.restore();
  txt(TL.series,0,-48,36,'#5a3e1b',{f:'Bai'});
  txt(TL.title,0,28,104,P.red,{f:'Chon'});
  ctx.restore();}

window.EP={font:'Bai',scenes:SCENES,camera,
  sub:{f:'Bai',size:58,col:'#f4ead5',hl:'#ffb347',sw:0,box:'#000000d9',boxPad:30,boxR:4,pop:'type',y:1580,lh:1.4},
  intro(t){SCENES.city(t-TL.lines[0].start,TL.lines[0]);},
  overlay(t,ln){if(ln.scene!=='gag'&&ln.scene!=='closed')vignette(0.55);header();},
  post(){grain(0.05);},
  outroGap:0.6,
  outro(k){ctx.fillStyle='#000';for(let i=0;i<12;i++){const h=160*E.inOut(k);ctx.fillRect(0,i*160,W,h);}},
  endCard(k){bgFill('#050608');ctx.save();ctx.globalAlpha=k;blinds(0);
    ctx.fillStyle='rgba(255,179,71,0.08)';ctx.save();ctx.translate(540,960);ctx.rotate(-0.18);for(let i=-14;i<14;i++)ctx.fillRect(-1200,i*110,2400,46);ctx.restore();
    txt('แฟ้มคดีโต๊ะคอม',540,800,96,P.amber,{f:'Chon'});
    txt('ไฟแขวนจอ อยู่ในตะกร้าด้านล่าง',540,960,58,'#f4ead5',{f:'Bai'});
    txt('กดติดตาม ไม่พลาดทุกคดี',540,1070,50,'#9aa3b1',{f:'Bai'});
    cat(540,1420,0.55,{lid:0.5});ctx.restore();}
};
