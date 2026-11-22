// เรื่องยาว #01 คืนที่มิวหลับบนคีย์บอร์ด — แนวเรื่องเล่าอบอุ่น แสงเงาแบบภาพยนตร์ (หมอนงีบบนโต๊ะ)
OL = '#3a2620'; LW = 4;
const C = {skin:'#f6d2b8',skinS:'#e8b494',hair:'#3b2420',hairH:'#6a4436',cardi:'#f2b6a0',cardiS:'#d9907a',tee:'#fffaf3',
  navy:'#2b3a67',navyS:'#1f2b4d',gold:'#e8b84a',gray:'#c9c9c9',shirt:'#bcd7f0',tie:'#c0392b',wood:'#b98458',woodS:'#94643e',
  pillow:'#8fa7c4',pillowS:'#6f88a8',screen:'#9fd4ff'};

// ---------- แสงและบรรยากาศ ----------
function grad(y0,y1,stops){const g=ctx.createLinearGradient(0,y0,0,y1);stops.forEach(([o,c])=>g.addColorStop(o,c));return g;}
function glowAt(x,y,r,col,a=1,mode='screen'){ctx.save();ctx.globalCompositeOperation=mode;ctx.globalAlpha*=a;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();}
function tint(col,mode='multiply'){ctx.save();ctx.globalCompositeOperation=mode;ctx.fillStyle=col;ctx.fillRect(-300,-300,W+600,H+600);ctx.restore();}
function soft(fn,blur=28,col='rgba(40,20,10,0.28)',oy=14){ctx.save();ctx.shadowColor=col;ctx.shadowBlur=blur;ctx.shadowOffsetY=oy;fn();ctx.restore();}
function blurred(px,fn){ctx.save();ctx.filter=`blur(${px}px)`;fn();ctx.restore();}
function skyFill(k){// k: 0 = กลางคืน, 0.5 = รุ่งเช้า, 1 = กลางวัน
  const top=k<0.5?mix('#0b1030','#ff9f7a',k*2):mix('#ff9f7a','#bfe3ff',(k-0.5)*2), bot=k<0.5?mix('#1d2c5c','#ffe0a8',k*2):mix('#ffe0a8','#f3f9ff',(k-0.5)*2);
  return grad(300,1200,[[0,top],[1,bot]]);}
function mix(a,b,k){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);const r=Math.round(lerp(pa>>16,pb>>16,k)),g=Math.round(lerp((pa>>8)&255,(pb>>8)&255,k)),bl=Math.round(lerp(pa&255,pb&255,k));return `rgb(${r},${g},${bl})`;}
function city(k,y=1050){for(let i=0;i<16;i++){const x=i*72-20,h=160+hash(i*3.1)*360;ctx.fillStyle=k<0.4?'#141c3d':mix('#5a4a6a','#9fb3c8',k);ctx.fillRect(x,y-h,66,h);
  if(k<0.6)for(let r=0;r<h/34;r++)for(let c=0;c<3;c++)if(hash(i*17+r*5+c)>0.62){ctx.fillStyle=`rgba(255,214,140,${0.85*(1-k)})`;ctx.fillRect(x+8+c*20,y-h+10+r*34,10,16);}}}
function bokeh(n,a){for(let i=0;i<n;i++){const x=hash(i*7.7)*W,y=420+hash(i*3.3)*700,r=14+hash(i)*40;ctx.save();ctx.globalAlpha=a*(0.25+0.25*Math.sin(T*0.8+i));circ(x,y,r);ctx.fillStyle=['#ffd58a','#ff9fb0','#9fd4ff'][i%3];ctx.fill();ctx.restore();}}
function dust(n=30,col='255,240,210'){for(let i=0;i<n;i++){const x=(hash(i)*W+T*12*(hash(i*2)-0.5))%W,y=(hash(i*5)*H+Math.sin(T*0.5+i)*30);ctx.save();ctx.globalAlpha=0.25+0.25*Math.sin(T*2+i);circ(x,y,1.5+hash(i*9)*2.5);ctx.fillStyle=`rgb(${col})`;ctx.fill();ctx.restore();}}

// ---------- ออฟฟิศ ----------
function office(k,o={}){// k = เวลาของวัน
  ctx.fillStyle=skyFill(k);ctx.fillRect(-300,-300,W+600,H+600);
  blurred(o.blur??3,()=>{
    rr(60,330,960,640,6);ctx.fillStyle=skyFill(k);ctx.fill();ctx.save();rr(60,330,960,640,6);ctx.clip();city(k,980);if(k<0.4)bokeh(18,0.9);
    if(k>0.3&&k<0.75){glowAt(820,640,420,'rgba(255,200,140,0.9)',1);circ(820,640,70);ctx.fillStyle='rgba(255,236,200,0.95)';ctx.fill();}ctx.restore();
    for(let i=0;i<5;i++){rr(60+i*192,330,8,640,0);ctx.fillStyle='#2a2f45';ctx.fill();}rr(60,640,960,10,0);ctx.fillStyle='#2a2f45';ctx.fill();
    ctx.fillStyle=k<0.4?'#1b2140':mix('#7a6a7a','#e9e4dc',k);ctx.fillRect(-300,970,W+600,240);
    for(let i=0;i<3;i++){rr(40+i*360,1000,320,180,10);ctx.fillStyle=k<0.4?'#232a4d':mix('#8a7a8a','#d7d0c6',k);ctx.fill();}
    circ(940,420,54);ctx.fillStyle=k<0.4?'#d9d4c6':'#fff';ctx.fill();ctx.lineWidth=6;ctx.strokeStyle='#555';ctx.stroke();});
  const hh=o.clock??(k<0.4?3:9);ctx.save();ctx.translate(940,420);line([0,0,Math.cos(-Math.PI/2+hh/12*Math.PI*2)*26,Math.sin(-Math.PI/2+hh/12*Math.PI*2)*26],6,'#333');line([0,0,0,-38],4,'#333');ctx.restore();}
function desk(y,k,o={}){soft(()=>{rr(-40,y,1160,60,14);ctx.fillStyle=grad(y,y+60,[[0,C.wood],[1,C.woodS]]);ctx.fill();});ctx.fillStyle=k<0.4?'#2a2238':'#6a4a36';ctx.fillRect(-40,y+60,1160,800);
  if(o.monitor!==false){soft(()=>{rr(80,y-370,420,300,16);ctx.fillStyle='#1d2030';ctx.fill();});rr(98,y-352,384,262,8);ctx.fillStyle=o.screenCol||C.screen;ctx.fill();
    if(o.lines!==false){for(let i=0;i<7;i++){const w=lerp(160,330,hash(i+3)),jit=o.wobble?Math.sin(T*9+i)*o.wobble*14:0;rr(120+jit,y-330+i*34,w,12,6);ctx.fillStyle='rgba(30,50,90,0.45)';ctx.fill();if(o.wobble){rr(120-jit*1.6,y-326+i*34,w,12,6);ctx.fillStyle='rgba(30,50,90,0.2)';ctx.fill();}}}
    rr(260,y-70,60,70,6);ctx.fillStyle='#1d2030';ctx.fill();}
  if(o.keyboard!==false){soft(()=>{rr(150,y-26,420,34,10);ctx.fillStyle='#e9e9ee';ctx.fill();},14);for(let i=0;i<12;i++)rr(162+i*34,y-20,26,10,3),ctx.fillStyle='#c7c9d2',ctx.fill();}}

// ---------- ตัวละคร ----------
function mew(x,y,s,o={}){const m=o.mouth||0,lid=o.lid||0;ctx.save();ctx.translate(x,y+Math.sin(T*1.6)*3);ctx.scale(s,s);ctx.rotate(o.tilt||0);
  // ลำตัว
  soft(()=>{ctx.beginPath();ctx.moveTo(-170,520);ctx.quadraticCurveTo(-190,250,-110,170);ctx.lineTo(110,170);ctx.quadraticCurveTo(190,250,170,520);ctx.closePath();ctx.fillStyle=grad(170,520,[[0,C.cardi],[1,C.cardiS]]);ctx.fill();});
  ctx.beginPath();ctx.moveTo(-56,170);ctx.lineTo(0,300);ctx.lineTo(56,170);ctx.closePath();ctx.fillStyle=C.tee;ctx.fill();
  for(let i=0;i<3;i++){circ(-10,330+i*50,7);ctx.fillStyle='#e9d2c0';ctx.fill();}
  // แขน
  const arm=(sd,pose)=>{ctx.save();ctx.translate(sd*130,210);let pts;
    if(pose==='up')pts=[0,0,sd*40,-160,sd*20,-300];else if(pose==='type')pts=[0,0,sd*-10,170,sd*-90+Math.sin(T*(o.fast?30:12)+sd)*8,250];else if(pose==='wave'&&sd>0)pts=[0,0,70,-90,90,-210+Math.sin(T*8)*20];else pts=[0,0,sd*20,170,sd*10,290];
    curve(pts,62,C.cardiS);curve(pts,52,C.cardi);circ(pts[4],pts[5],26);ctx.fillStyle=C.skin;ctx.fill();ctx.restore();};
  arm(-1,o.armL||o.arms||'rest');arm(1,o.armR||o.arms||'rest');
  // คอ+หัว
  rr(-26,110,52,80,20);ctx.fillStyle=C.skinS;ctx.fill();
  ctx.save();ctx.rotate(o.headTilt||0);
  ctx.beginPath();ctx.ellipse(0,-10,150,158,0,Math.PI*0.95,Math.PI*2.05);ctx.lineTo(150,90);ctx.quadraticCurveTo(140,150,92,150);ctx.lineTo(-92,150);ctx.quadraticCurveTo(-140,150,-150,90);ctx.closePath();ctx.fillStyle=C.hair;ctx.fill();
  const fg=ctx.createRadialGradient(-20,-10,20,0,10,140);fg.addColorStop(0,'#fde3cf');fg.addColorStop(1,C.skin);ell(0,10,112,128);ctx.fillStyle=fg;ctx.fill();
  if(o.imprint){ctx.save();ell(0,10,112,128);ctx.clip();for(let r=0;r<3;r++)for(let c=0;c<4;c++){rr(-100+c*26,30+r*24,20,18,4);ctx.fillStyle='rgba(220,90,90,0.35)';ctx.fill();}ctx.restore();}
  ell(-62,52,22,11);ctx.fillStyle=`rgba(255,140,150,${0.35+(o.blush||0)*0.3})`;ctx.fill();ell(62,52,22,11);ctx.fill();
  // ตา
  const lk=o.look||[0,0];for(const ex of[-44,44]){ctx.save();ctx.translate(ex,0);
    if(o.happy){ctx.beginPath();ctx.arc(0,8,22,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=7;ctx.strokeStyle=OL;ctx.stroke();ctx.restore();continue;}
    ctx.beginPath();ctx.ellipse(0,4,26,o.wide?34:28,0,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
    ctx.save();ctx.beginPath();ctx.ellipse(0,4,26,o.wide?34:28,0,0,Math.PI*2);ctx.clip();
    const ig=ctx.createRadialGradient(lk[0]*8,6+lk[1]*8,2,lk[0]*8,6+lk[1]*8,20);ig.addColorStop(0,'#c08a5a');ig.addColorStop(1,'#4a2c1c');circ(lk[0]*8,6+lk[1]*8,o.tired?17:19);ctx.fillStyle=ig;ctx.fill();
    circ(lk[0]*8,6+lk[1]*8,8);ctx.fillStyle='#1a0e08';ctx.fill();circ(lk[0]*8+7,lk[1]*8-2,6);ctx.fillStyle='#fff';ctx.fill();circ(lk[0]*8-6,lk[1]*8+12,3);ctx.fill();
    if(lid>0){ctx.fillStyle=C.skin;ctx.fillRect(-30,-30,60,64*lid);}ctx.restore();
    ctx.beginPath();ctx.ellipse(0,4,27,o.wide?35:29,0,Math.PI*1.05,Math.PI*1.95);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();
    if(lid>0){line([-27,-26+62*lid,27,-26+62*lid],5,OL);}
    for(let l=0;l<3;l++)line([ex>0?18+l*5:-18-l*5,-20+l*4,ex>0?26+l*6:-26-l*6,-28+l*4],3,OL);
    if(o.tired){ctx.beginPath();ctx.arc(0,30,20,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=4;ctx.strokeStyle='rgba(120,80,140,0.5)';ctx.stroke();}
    ctx.restore();}
  const bu=o.brow||0;line([-70,-44-bu*10,-22,-50-bu*6],6,C.hair);line([22,-50-bu*6,70,-44-bu*10],6,C.hair);
  ctx.beginPath();ctx.moveTo(-2,30);ctx.quadraticCurveTo(6,44,-4,48);ctx.lineWidth=4;ctx.strokeStyle=C.skinS;ctx.stroke();
  if(o.smile&&m<0.1){ctx.beginPath();ctx.arc(0,66,24,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=6;ctx.strokeStyle='#a0464a';ctx.stroke();}
  else{ell(0,78,12+m*8+(o.shock?8:0),3+m*14+(o.shock?12:0));ctx.fillStyle='#b8505a';ctx.fill();}
  // แว่น
  ctx.save();ctx.rotate(o.glassTilt||0);for(const ex of[-44,44]){circ(ex,4,38);ctx.lineWidth=5;ctx.strokeStyle='#6a4a3a';ctx.stroke();}line([-6,0,6,0],5,'#6a4a3a');ctx.restore();
  // ผมหน้าม้า
  ctx.beginPath();ctx.moveTo(-118,-10);ctx.quadraticCurveTo(-120,-140,0,-140);ctx.quadraticCurveTo(120,-140,118,-10);ctx.quadraticCurveTo(80,-70,30,-66);ctx.quadraticCurveTo(10,-40,-10,-66);ctx.quadraticCurveTo(-70,-70,-118,-10);ctx.fillStyle=C.hair;ctx.fill();
  ctx.save();ctx.globalAlpha=0.5;ctx.beginPath();ctx.arc(-30,-80,70,1.2*Math.PI,1.6*Math.PI);ctx.lineWidth=10;ctx.strokeStyle=C.hairH;ctx.stroke();ctx.restore();
  if(o.messy)for(let i=0;i<5;i++)curve([-60+i*30,-130,-50+i*30,-170-hash(i)*30,-70+i*30,-190],6,C.hair);
  ctx.restore();ctx.restore();}

function uncle(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x,y+Math.sin(T*1.3)*3);ctx.scale(s,s);
  soft(()=>{ctx.beginPath();ctx.moveTo(-180,540);ctx.quadraticCurveTo(-200,240,-120,170);ctx.lineTo(120,170);ctx.quadraticCurveTo(200,240,180,540);ctx.closePath();ctx.fillStyle=grad(170,540,[[0,C.navy],[1,C.navyS]]);ctx.fill();});
  star(-80,260,22,10,5,0,C.gold,0);rr(40,240,80,16,4);ctx.fillStyle='#c9cfe0';ctx.fill();
  if(o.flash){ctx.save();ctx.translate(150,330);ctx.rotate(-0.3);rr(-16,-70,32,110,10);ctx.fillStyle='#333';ctx.fill();ctx.restore();glowAt(240,260,260,'rgba(255,240,190,0.6)',1);}
  if(o.give){curve([130,220,230,170,300,120],60,C.navyS);circ(300,116,28);ctx.fillStyle='#e0b394';ctx.fill();}
  rr(-28,110,56,80,20);ctx.fillStyle='#d9a885';ctx.fill();
  const fg=ctx.createRadialGradient(-20,-10,20,0,10,140);fg.addColorStop(0,'#f0c7a6');fg.addColorStop(1,'#d9a885');ell(0,10,114,128);ctx.fillStyle=fg;ctx.fill();
  ell(-110,20,26,36);ctx.fillStyle='#d9a885';ctx.fill();ell(110,20,26,36);ctx.fill();ell(-104,-30,30,40);ctx.fillStyle='#bdbdbd';ctx.fill();ell(104,-30,30,40);ctx.fill();
  for(const ex of[-42,42]){if(o.wink&&ex>0){line([ex-18,6,ex+18,2],6,OL);continue;}ctx.beginPath();ctx.arc(ex,4,16,1.05*Math.PI,1.95*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();circ(ex,8,6);ctx.fillStyle=OL;ctx.fill();
    for(let l=0;l<2;l++)line([ex+(ex>0?22:-22),8+l*10,ex+(ex>0?36:-36),4+l*14],3,'#b07a5a');}
  line([-64,-36,-22,-30],7,'#9a9a9a');line([22,-30,64,-36],7,'#9a9a9a');
  ctx.beginPath();ctx.moveTo(-60,58);ctx.quadraticCurveTo(-30,40,0,54);ctx.quadraticCurveTo(30,40,60,58);ctx.quadraticCurveTo(30,72,0,64);ctx.quadraticCurveTo(-30,72,-60,58);ctx.fillStyle='#bdbdbd';ctx.fill();
  ell(0,86,12+m*8,2+m*12);ctx.fillStyle='#8a3a3a';ctx.fill();
  ell(0,-70,150,34);ctx.fillStyle=C.navyS;ctx.fill();ctx.beginPath();ctx.ellipse(0,-90,118,70,0,Math.PI,0);ctx.closePath();ctx.fillStyle=C.navy;ctx.fill();circ(0,-110,20);ctx.fillStyle=C.gold;ctx.fill();
  ctx.restore();}

function boss(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  soft(()=>{ctx.beginPath();ctx.moveTo(-170,520);ctx.quadraticCurveTo(-190,240,-110,170);ctx.lineTo(110,170);ctx.quadraticCurveTo(190,240,170,520);ctx.closePath();ctx.fillStyle=grad(170,520,[[0,C.shirt],[1,'#9fbcd8']]);ctx.fill();});
  poly([-14,180,14,180,24,360,0,390,-24,360]);ctx.fillStyle=C.tie;ctx.fill();
  if(o.paper){ctx.save();ctx.translate(150,300);ctx.rotate(o.angry?-0.2+Math.sin(T*14)*0.05:-0.1);soft(()=>{rr(-90,-120,180,240,6);ctx.fillStyle='#fff';ctx.fill();},16);
    for(let i=0;i<6;i++)txt(o.approved?'':'ฟฟฟฟฟฟฟฟ',0,-86+i*32,24,'#999',{f:'Mitr'});if(o.approved){circ(0,0,60);ctx.lineWidth=10;ctx.strokeStyle='#2fbf71';ctx.stroke();line([-26,0,-6,22,30,-24],12,'#2fbf71');}ctx.restore();}
  if(o.thumb){curve([-130,220,-200,140,-200,40],56,'#9fbcd8');circ(-200,30,30);ctx.fillStyle='#f0c7a6';ctx.fill();rr(-212,-30,24,40,10);ctx.fill();}
  rr(-26,110,52,80,20);ctx.fillStyle='#e8b494';ctx.fill();
  const fg=ctx.createRadialGradient(-20,-10,20,0,10,140);fg.addColorStop(0,'#fde3cf');fg.addColorStop(1,'#efc2a2');ell(0,10,110,124);ctx.fillStyle=fg;ctx.fill();
  ctx.beginPath();ctx.moveTo(-112,0);ctx.quadraticCurveTo(-120,-130,10,-128);ctx.quadraticCurveTo(120,-128,112,0);ctx.quadraticCurveTo(100,-70,30,-80);ctx.quadraticCurveTo(-60,-90,-112,0);ctx.fillStyle='#2a2a30';ctx.fill();
  for(const ex of[-42,42]){rr(ex-34,-22,68,48,10);ctx.lineWidth=5;ctx.strokeStyle='#333';ctx.stroke();ell(ex,2,12,o.angry?8:13);ctx.fillStyle='#fff';ctx.fill();circ(ex,3,6);ctx.fillStyle=OL;ctx.fill();}
  line([-72,-40-(o.angry?-8:6),-22,-30],7,'#2a2a30');line([22,-30,72,-40-(o.angry?-8:6)],7,'#2a2a30');
  if(o.smile&&m<0.1){ctx.beginPath();ctx.arc(0,62,26,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=6;ctx.strokeStyle='#8a3a3a';ctx.stroke();}else{ell(0,72,14+m*8,3+m*14);ctx.fillStyle='#8a3a3a';ctx.fill();}
  if(o.angry){for(let i=0;i<3;i++){const a=-0.6+i*0.3;line([150+Math.cos(a)*10,-120+Math.sin(a)*10,150+Math.cos(a)*50,-120+Math.sin(a)*50],8,'#e74c3c');}}ctx.restore();}

function napPillow(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.rot||0);
  soft(()=>{ctx.beginPath();ctx.moveTo(-260,60);ctx.quadraticCurveTo(-280,-120,-120,-150);ctx.lineTo(120,-150);ctx.quadraticCurveTo(280,-120,260,60);ctx.quadraticCurveTo(0,110,-260,60);ctx.closePath();ctx.fillStyle=grad(-150,90,[[0,'#b4c6dc'],[1,C.pillowS]]);ctx.fill();},40,'rgba(20,30,60,0.35)',24);
  ell(0,-70,96,54);ctx.fillStyle='#4e6488';ctx.fill();ell(0,-74,84,42);ctx.fillStyle='#3a4c6c';ctx.fill();
  for(const sd of[-1,1]){ctx.save();ctx.translate(sd*200,30);ell(0,0,56,34);ctx.fillStyle='#4e6488';ctx.fill();ctx.restore();}
  ctx.save();ctx.globalAlpha=0.35;for(let i=0;i<60;i++){circ(-230+hash(i)*460,-130+hash(i*2)*200,2);ctx.fillStyle='#fff';ctx.fill();}ctx.restore();
  ctx.save();ctx.globalAlpha=0.45;ell(-120,-110,90,18,-0.2);ctx.fillStyle='#fff';ctx.fill();ctx.restore();ctx.restore();}

// ---------- องค์ประกอบ ----------
function cup(x,y,s,empty,steam){ctx.save();ctx.translate(x,y);ctx.scale(s,s);soft(()=>{rr(-60,-110,120,140,18);ctx.fillStyle='#fff';ctx.fill();},18);ctx.beginPath();ctx.arc(64,-40,28,-1.2,1.2);ctx.lineWidth=12;ctx.strokeStyle='#eee';ctx.stroke();
  if(!empty){ell(0,-110,60,12);ctx.fillStyle='#6b3e26';ctx.fill();}if(steam)for(let i=0;i<3;i++){const ph=(T*0.6+i/3)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.7;curve([-20+i*20,-130-ph*60,-10+i*20,-170-ph*80,-20+i*20,-210-ph*100],6,'#fff');ctx.restore();}ctx.restore();}
function phoneTimer(x,y,s,sec){ctx.save();ctx.translate(x,y);ctx.scale(s,s);soft(()=>{rr(-90,-170,180,340,26);ctx.fillStyle='#1d1f2b';ctx.fill();});rr(-76,-150,152,300,16);ctx.fillStyle='#2b2f45';ctx.fill();
  const mm=Math.floor(sec/60),ss=Math.floor(sec%60);ctx.beginPath();ctx.arc(0,-10,58,-Math.PI/2,-Math.PI/2+Math.PI*2*(sec/1200));ctx.lineWidth=8;ctx.strokeStyle='#8fd3ff';ctx.stroke();
  txt(String(mm).padStart(2,'0')+':'+String(ss).padStart(2,'0'),0,-6,40,'#fff',{f:'Mitr'});ctx.restore();}
function zzz(x,y){for(let i=0;i<3;i++){const ph=(T*0.5+i/3)%1;ctx.save();ctx.globalAlpha=1-ph;txt('z',x+ph*80+i*10,y-ph*160,40+ph*30,'#fff',{f:'Charm'});ctx.restore();}}
function caption(t,x,y,k,size=50,col='#fff'){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*1.6);soft(()=>{ctx.font=`${size}px Mitr`;const w=ctx.measureText(t).width+70;rr(x-w/2,y-size*0.9,w,size*1.8,size*0.9);ctx.fillStyle='rgba(20,16,30,0.62)';ctx.fill();},20,'rgba(0,0,0,0.3)',8);
  txt(t,x,y+4,size,col,{f:'Mitr',maxW:900});ctx.restore();}
function label(t,x,y,tx,ty,k){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);line([x,y,lerp(x,tx,E.out(k)),lerp(y,ty,E.out(k))],4,'#fff');circ(x,y,9);ctx.fillStyle='#fff';ctx.fill();caption(t,tx,ty,k,44);ctx.restore();}

// ---------- ฉาก ----------
const SCENES={
 office_night(lt,ln){office(0);desk(1180,0,{});mew(700,860,0.9,{lid:0.3,tired:1,look:[-1,0.3],arms:'type'});
  glowAt(300,960,620,'rgba(140,200,255,0.55)');tint('rgba(80,90,160,0.35)');glowAt(560,820,360,'rgba(160,210,255,0.35)');dust(24,'190,210,255');},
 mew_close(lt,ln){office(0,{blur:8});ctx.save();ctx.translate(540,980);ctx.scale(1.6,1.6);ctx.translate(-540,-980);mew(560,900,1,{lid:0.38+0.08*Math.sin(T*2),tired:1,look:[-1,0.2],mouth:mouthFor('mew'),brow:1});ctx.restore();
  tint('rgba(80,90,160,0.35)');glowAt(200,900,700,'rgba(140,200,255,0.6)');},
 coffee(lt,ln){const h=ln.dur/2;if(lt<h){office(0,{blur:10});tint('rgba(60,70,130,0.45)');const n=Math.min(4,1+Math.floor(lt/h*4));for(let i=0;i<4;i++){ctx.save();ctx.globalAlpha=i<n?1:0.15;cup(220+i*210,1100,0.9,i<n-1,i===n-1);ctx.restore();}
    caption('แก้วที่ '+n,540,700,1,64);glowAt(540,900,500,'rgba(255,200,140,0.25)');}
  else{bgFill('#0b0f1e');desk(1500,0,{wobble:prog(lt,h,ln.dur)*1.6,screenCol:'#bfe4ff'});ctx.save();ctx.translate(290,1290);ctx.scale(2,2);ctx.translate(-290,-1290);ctx.restore();
    ctx.save();ctx.filter=`blur(${prog(lt,h,ln.dur)*4}px)`;ctx.translate(290,1300);ctx.scale(2.2,2.2);ctx.translate(-290,-1300);desk(1500,0,{wobble:1.6,screenCol:'#bfe4ff',keyboard:false});ctx.restore();glowAt(540,900,600,'rgba(140,200,255,0.4)');}},
 faceplant(lt,ln){office(0);const k=E.inOut(prog(lt,ln.dur*0.35,ln.dur*0.8));desk(1180,0,{});
  mew(700,860+k*120,0.9,{lid:lerp(0.5,1,k),tired:1,look:[-1,0.6],headTilt:lerp(0,0.9,k),tilt:k*0.15,arms:k>0.6?'rest':'type'});
  tint('rgba(70,80,150,0.4)');glowAt(300,960,620,'rgba(140,200,255,0.5)');if(lt>ln.dur*0.85){ctx.fillStyle=`rgba(0,0,0,${prog(lt,ln.dur*0.85,ln.dur)})`;ctx.fillRect(0,0,W,H);}},
 morning_boss(lt,ln){office(0.62);desk(1180,0.62,{lines:false,screenCol:'#f2f2f2'});ctx.save();ctx.beginPath();ctx.rect(98,828,384,262);ctx.clip();for(let i=0;i<8;i++)txt('ฟฟฟฟฟฟฟฟฟฟฟ',290,850+i*32,26,'#666',{f:'Mitr'});ctx.restore();
  mew(720,980,0.8,{lid:1,headTilt:0.9,tilt:0.15});boss(330,760,0.75,{mouth:mouthFor('boss'),angry:1,paper:1});glowAt(820,600,800,'rgba(255,210,150,0.45)');
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.15;for(let i=0;i<4;i++){ctx.fillStyle='#fff3d0';poly([700+i*90,330,760+i*90,330,500+i*90,1400,380+i*90,1400]);ctx.fill();}ctx.restore();},
 imprint(lt,ln){office(0.65,{blur:8});ctx.save();ctx.translate(540,960);ctx.scale(1.5,1.5);ctx.translate(-540,-960);
  mew(560,900,1,{wide:1,shock:lt<0.6,imprint:1,messy:1,glassTilt:0.15,mouth:mouthFor('mew'),brow:1,look:[0.4,-0.3]});ctx.restore();glowAt(840,500,800,'rgba(255,214,160,0.45)');
  if(lt<0.4){ctx.fillStyle=`rgba(255,255,255,${0.6*(1-lt/0.4)})`;ctx.fillRect(0,0,W,H);}},
 zombie(lt,ln){office(0.8,{blur:6});tint('rgba(150,150,160,0.5)','saturation');
  const pics=[['คอเคล็ด',{headTilt:0.4,lid:0.5,tired:1}],['แขนชา',{lid:0.5,tired:1,armL:'up'}],['หาวทั้งวัน',{lid:0.6,tired:1,mouth:1}]];
  pics.forEach(([t,o],i)=>{const k=E.back(prog(lt,i*ln.dur*0.28,i*ln.dur*0.28+0.5));if(k<=0)return;ctx.save();ctx.translate(250+i*290,620+i*240);ctx.rotate((i-1)*0.08);ctx.scale(k,k);
    soft(()=>{rr(-170,-210,340,420,8);ctx.fillStyle='#fff';ctx.fill();},30);ctx.save();rr(-150,-190,300,320,4);ctx.clip();ctx.fillStyle='#c7cbd6';ctx.fillRect(-150,-190,300,320);mew(0,-20,0.55,o);
    if(i===1)for(let s=0;s<6;s++)star(-60+hash(s+Math.floor(T*10))*120,40+hash(s*3)*80,12,4,4,0,'#ffe066',0);ctx.restore();txt(t,0,170,40,'#333',{f:'Mitr'});ctx.restore();});},
 guard(lt,ln){office(0.12,{clock:20});desk(1180,0.12,{});const sp=ln.who;mew(760,860,0.85,{lid:0.25,tired:1,look:[-1,0],mouth:mouthFor('mew'),arms:'rest'});
  uncle(250,820,0.85,{mouth:mouthFor('uncle'),flash:1});tint('rgba(90,80,140,0.3)');glowAt(300,960,500,'rgba(140,200,255,0.35)');glowAt(250,700,500,'rgba(255,200,140,0.35)');dust(18);},
 uncle_story(lt,ln){bgFill('#2b2030');rr(140,420,800,800,20);ctx.fillStyle=grad(420,1220,[[0,'#3a3050'],[1,'#1e1828']]);ctx.fill();
  rr(220,520,640,300,10);ctx.fillStyle='#14102a';ctx.fill();for(let i=0;i<30;i++){circ(240+hash(i)*600,540+hash(i*2)*260,2);ctx.fillStyle='#fff';ctx.fill();}
  ctx.save();ctx.translate(540,1000);uncle(0,0,0.75,{mouth:mouthFor('uncle'),wink:lt>ln.dur*0.6});ctx.restore();
  ctx.save();ctx.translate(820,700);circ(0,0,80);ctx.fillStyle='#f3e6c8';ctx.fill();ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,70,-Math.PI/2,-Math.PI/2+Math.PI*2*(20/60)*prog(lt,0.5,ln.dur));ctx.closePath();ctx.fillStyle='rgba(120,200,140,0.8)';ctx.fill();txt('20 นาที',0,120,36,'#f3e6c8',{f:'Mitr'});ctx.restore();
  caption('ยามกะดึก 20 ปี',300,620,prog(lt,0.2,0.6),44);tint('rgba(255,200,140,0.35)','overlay');vignette(0.7,'40,20,10');},
 science(lt,ln){bgFill('#f6f1ea');ctx.save();ctx.translate(140,560);const w=800,h=520;
  soft(()=>{rr(-40,-80,w+80,h+200,30);ctx.fillStyle='#fff';ctx.fill();},40,'rgba(60,40,20,0.15)');
  txt('ความลึกของการหลับ',w/2,-30,40,'#555',{f:'Mitr'});line([0,0,0,h],4,'#999');line([0,h,w,h],4,'#999');
  const k=prog(lt,0.2,ln.dur*0.55);ctx.save();ctx.beginPath();ctx.rect(0,-10,w*k,h+20);ctx.clip();
  ctx.beginPath();ctx.moveTo(0,40);for(let x=0;x<=w;x+=8){const m=x/w*60;const d=m<30?40+m*6:220+(m-30)*9;ctx.lineTo(x,Math.min(h-20,d));}ctx.lineWidth=10;ctx.strokeStyle='#5a7bd6';ctx.stroke();ctx.restore();
  ctx.save();ctx.globalAlpha=0.22;ctx.fillStyle='#2fbf71';ctx.fillRect(w*20/60,0,w*10/60,h);ctx.restore();
  const red=prog(lt,ln.dur*0.55,ln.dur*0.7);if(red>0){ctx.save();ctx.globalAlpha=0.22*red;ctx.fillStyle='#e74c3c';ctx.fillRect(w*30/60,0,w*30/60,h);ctx.restore();caption('หลับลึก → ตื่นมางง',w*0.76,h*0.75,red,38,'#ffd0d0');}
  caption('20–30 นาที ✓',w*25/60,h*0.25,prog(lt,0.4,0.8),40,'#c8ffd9');['0','20','30','60 นาที'].forEach((t,i)=>txt(t,[0,w/3,w/2,w][i],h+36,30,'#777',{f:'Mitr'}));ctx.restore();
  txt('*มีงานวิจัยพบ',540,1290,32,'#8a7f72',{f:'Mitr'});},
 reveal(lt,ln){office(0.15,{blur:5});desk(1180,0.15,{});mew(780,860,0.8,{look:[-1,0.2],wide:1,brow:1});uncle(300,820,0.85,{mouth:mouthFor('uncle'),give:1});
  const k=E.back(prog(lt,ln.dur*0.4,ln.dur*0.9));if(k>0){ctx.save();ctx.translate(560,640);ctx.scale(k*0.55,k*0.55);napPillow(0,0,1);ctx.restore();glowAt(560,640,300*k,'rgba(255,230,170,0.6)');}
  tint('rgba(90,80,140,0.25)');},
 product(lt,ln){bgFill('#1c2033');glowAt(540,900,700,'rgba(140,170,230,0.6)');ell(540,1220,380,60);ctx.fillStyle='#2b3150';ctx.fill();
  napPillow(540,1050,1.25+0.02*Math.sin(T*1.5),{rot:Math.sin(T*0.8)*0.04});dust(30,'220,230,255');const d=ln.dur;
  label('ช่องใบหน้า',540,960,540,560,prog(lt,d*0.2,d*0.35));label('ช่องสอดแขน',300,1090,250,1340,prog(lt,d*0.4,d*0.55));label('คอไม่บิด แขนไม่ถูกทับ',800,1000,760,1420,prog(lt,d*0.65,d*0.8));},
 nap(lt,ln){office(0.02,{blur:6});desk(1180,0.02,{lines:false,screenCol:'#2a3a5a'});napPillow(400,1120,0.6);
  ctx.save();ctx.translate(400,1010);ctx.scale(0.62,0.62);ctx.rotate(0.05);ctx.beginPath();ctx.ellipse(0,0,150,120,0,Math.PI,0);ctx.fillStyle=C.hair;ctx.fill();ctx.restore();
  ctx.save();ctx.translate(400,1150);rr(-300,-40,600,140,60);ctx.fillStyle=grad(-40,100,[[0,C.cardi],[1,C.cardiS]]);ctx.fill();ctx.restore();
  phoneTimer(820,1010,0.8,1200-Math.min(1199,lt*(1200/ln.dur)));zzz(480,880);tint('rgba(90,70,170,0.35)');
  for(let i=0;i<20;i++){circ(hash(i)*W,380+hash(i*2)*500,2+Math.sin(T*3+i)*1.5);ctx.fillStyle='rgba(255,255,230,0.8)';ctx.fill();}},
 wake(lt,ln){office(0.08+prog(lt,0,ln.dur)*0.1,{blur:5});desk(1180,0.1,{});const k=E.out(prog(lt,0,0.8));
  mew(600,lerp(980,860,k),0.95,{happy:lt>0.8,mouth:mouthFor('mew'),arms:k<0.95?'rest':'up',smile:1,blush:1});phoneTimer(860,1060,0.55,0);
  for(let i=0;i<10;i++){const a=i*0.63+T;star(600+Math.cos(a)*300*k,760+Math.sin(a)*200*k,16,6,4,T*2,'#fff6c8');}glowAt(600,800,500,'rgba(255,240,200,0.35)');},
 timelapse(lt,ln){const k=prog(lt,0,ln.dur);office(lerp(0.05,0.5,k),{clock:3+k*3});desk(1180,lerp(0.05,0.5,k),{});mew(720,860,0.9,{arms:'type',fast:1,look:[-1,0.3],brow:0.5});
  ctx.save();ctx.translate(300,1000);rr(-180,-20,360,40,20);ctx.fillStyle='rgba(0,0,0,0.4)';ctx.fill();rr(-176,-16,352*k,32,16);ctx.fillStyle='#2fbf71';ctx.fill();txt(Math.round(k*100)+'%',0,60,40,'#fff',{f:'Mitr'});ctx.restore();
  ctx.save();ctx.translate(940,420);ctx.rotate(T*12);line([0,0,0,-38],4,'#333');ctx.restore();tint(`rgba(80,90,160,${0.35*(1-k)})`);},
 success(lt,ln){office(0.9);desk(1180,0.9,{});mew(760,860,0.85,{smile:1,happy:lt>1.2,blush:1,look:[-1,-0.2]});boss(320,760,0.75,{mouth:mouthFor('boss'),paper:1,approved:1,smile:1});
  glowAt(820,500,900,'rgba(255,240,210,0.4)');dust(20);},
 thanks(lt,ln){const g=grad(0,H,[[0,'#ffcf9a'],[1,'#ffefd6']]);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  blurred(4,()=>{for(let i=0;i<6;i++){rr(i*190-40,330,150,960,10);ctx.fillStyle=i%2?'#f2d4b0':'#e8c49c';ctx.fill();}});ctx.fillStyle='#d9b48a';ctx.fillRect(-300,1300,W+600,800);
  uncle(280,900,0.8,{mouth:mouthFor('uncle'),flash:0});mew(780,900,0.8,{mouth:mouthFor('mew'),smile:1,armR:'wave',blush:1,happy:lt>0.6});
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.3;for(let i=0;i<5;i++){ctx.fillStyle='#fff3d0';poly([600+i*110,300,660+i*110,300,300+i*110,1500,200+i*110,1500]);ctx.fill();}ctx.restore();dust(30);},
 sunrise(lt,ln){ctx.fillStyle=skyFill(0.42+prog(lt,0,ln.dur)*0.1);ctx.fillRect(-300,-300,W+600,H+600);const sy=lerp(1000,820,prog(lt,0,ln.dur));
  glowAt(540,sy,700,'rgba(255,190,120,0.9)');circ(540,sy,110);ctx.fillStyle='#fff1d0';ctx.fill();city(0.5,1150);ctx.fillStyle='#2a1e2a';ctx.fillRect(-300,1150,W+600,800);
  ctx.save();ctx.translate(540,1150);ctx.fillStyle='#2a1e2a';ell(0,-90,70,80);ctx.fill();ctx.beginPath();ctx.ellipse(0,-170,64,70,0,Math.PI*0.9,Math.PI*2.1);ctx.fill();rr(-90,-30,180,40,20);ctx.fill();ctx.restore();
  for(let i=0;i<5;i++){const x=(i*230+T*30)%1300-100;ctx.save();ctx.translate(x,560+i*40);curve([-20,0,0,-12,20,0],4,'#3a2a3a');ctx.restore();}},
 cta(lt,ln){bgFill('#f6efe6');glowAt(540,800,700,'rgba(255,220,170,0.7)');ell(540,1180,400,60);ctx.fillStyle='#e8dccb';ctx.fill();napPillow(540,1040,1.1);
  const b=E.back(prog(lt,ln.dur*0.35,ln.dur*0.6));if(b>0){ctx.save();ctx.translate(540,1360);ctx.scale(b,b);soft(()=>{rr(-260,-60,520,120,60);ctx.fillStyle='#ff7a1a';ctx.fill();},24);
    txt('🛒 ดูที่ตะกร้าด้านล่าง',0,6,48,'#fff',{f:'Mitr'});ctx.restore();}caption('หมอนงีบบนโต๊ะ',540,640,prog(lt,0.1,0.5),60);},
};

window.EP={font:'Mitr',scenes:SCENES,sceneTime:true,xfade:0.6,
  camera(name,lt,ln){const k=prog(lt,0,ln.dur);let s=1+0.06*k,dx=0;if(name==='office_night'){s=1+0.18*E.inOut(k);}if(name==='zombie')s=1;
    ctx.translate(540+dx,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mitr',size:54,col:'#ffffff',hl:'#ffd58a',sw:0,shadow:3,pop:'fade',y:1620,lh:1.4,box:'rgba(18,14,28,0.55)',boxR:28,boxPad:26},
  intro(t){bgFill('#08070f');const k=prog(t,0.2,1.4);ctx.save();ctx.globalAlpha=k*(1-prog(t,1.5,1.8));txt('คืนที่มิว',540,860,96,'#f6e7d0',{f:'Charm'});txt('หลับบนคีย์บอร์ด',540,980,96,'#f6e7d0',{f:'Charm'});txt(TL.series,540,1090,36,'#a99',{f:'Mitr'});ctx.restore();},
  overlay(t,ln){const g=ctx.createLinearGradient(0,1440,0,1920);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.55)');ctx.fillStyle=g;ctx.fillRect(0,1440,W,480);
    ctx.save();ctx.globalAlpha=0.85;txt(TL.series,60,150,32,'#fff',{f:'Mitr',align:'left',shadow:2});ctx.restore();vignette(0.4);},
  post(){grain(0.03);},
  outroGap:0.7,
  outro(k){ctx.fillStyle=`rgba(8,7,15,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill('#08070f');ctx.save();ctx.globalAlpha=k;napPillow(540,820,0.7);txt('หมอนงีบบนโต๊ะ',540,1080,76,'#f6e7d0',{f:'Charm'});txt('อยู่ในตะกร้าด้านล่าง',540,1180,50,'#ffd58a',{f:'Mitr'});ctx.restore();},
};
