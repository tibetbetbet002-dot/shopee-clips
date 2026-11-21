// EP.16 ซอมบี้คราบนิ้วบุก! — แนววันสิ้นโลก/ซอมบี้ (ชุดทำความสะอาดหน้าจอ)
OL = '#0f140c'; LW = 7;
const P = {dusk:'#ff7b54',dusk2:'#3d1f3a',zombie:'#9bbf6b',zombie2:'#6f8f45',screen:'#1d2a3a',screen2:'#3a5a7a',clean:'#9fe3ff',skin:'#d9a47a',band:'#c0392b',cloth:'#ffcc4d',spray:'#4cc9f0'};

function sky(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.dusk2);g.addColorStop(0.7,P.dusk);g.addColorStop(1,'#ffb38a');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);}
function ruins(){ctx.fillStyle='#24131f';for(const[x,w,h]of[[-20,180,500],[150,140,380],[300,200,620],[760,160,460],[900,220,560]]){ctx.fillRect(x,1300-h,w,h);for(let i=0;i<4;i++){ctx.fillStyle='#3a2030';ctx.fillRect(x+20,1300-h+30+i*90,30,40);ctx.fillStyle='#24131f';}}
  ctx.fillStyle='#1a0e16';ctx.fillRect(-300,1300,W+600,800);}
function zombie(x,y,s,seed,o={}){ctx.save();ctx.translate(x+Math.sin(T*3+seed)*8,y+Math.cos(T*2.5+seed)*6);ctx.scale(s,s);ctx.rotate(Math.sin(T*2+seed)*0.1);
  ctx.globalAlpha=o.alpha??1;
  ctx.beginPath();for(let i=0;i<20;i++){const a=i/20*Math.PI*2,r=80+Math.sin(a*5+seed)*10;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r*1.2);}ctx.closePath();fs(P.zombie,6);
  ctx.save();ctx.beginPath();ctx.ellipse(0,0,78,94,0,0,Math.PI*2);ctx.clip();for(let i=1;i<7;i++){ell(4,6,i*13,i*15);ctx.lineWidth=4;ctx.strokeStyle=P.zombie2;ctx.stroke();}ctx.restore();
  for(const ex of[-24,24]){circ(ex,-20,15);fs('#fffbd0',4);circ(ex+4,-18,5);ctx.fillStyle='#c0392b';ctx.fill();}
  ctx.beginPath();ctx.moveTo(-30,30);for(let i=0;i<=6;i++)ctx.lineTo(-30+i*10,30+(i%2?12:0));ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.stroke();
  const r=Math.sin(T*4+seed)*20;line([-70,10,-130,-20+r,-150,-30+r],14,OL);line([-70,10,-130,-20+r,-150,-30+r],8,P.zombie);line([70,10,130,-20-r,150,-30-r],14,OL);line([70,10,130,-20-r,150,-30-r],8,P.zombie);
  ctx.restore();}
function survivor(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,2),y+boil(2,2));ctx.scale(s,s);
  poly([-150,140,150,140,170,470,-170,470]);fs('#5a6b3a');line([-120,150,120,440],18,'#3a2a1a');
  rr(-24,92,48,56,10);fs(P.skin);ell(0,0,94,106);fs(P.skin);
  ctx.beginPath();ctx.arc(0,-24,94,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#2a1a10');rr(-96,-60,192,30,8);fs(P.band);poly([90,-50,150,-80,140,-30]);fs(P.band,5);
  const e=o.scared?1.5:1;for(const ex of[-34,34]){ell(ex,2,13*e,15*e);fs('#fff',4);circ(ex,4,5);ctx.fillStyle=OL;ctx.fill();}
  line([-52,-26-(o.scared?10:0),-16,-30],6);line([16,-30,52,-26-(o.scared?10:0)],6);line([-40,36,-20,48],4,'#7a4a2a');
  ell(0,58,14+m*6+(o.scared?8:0),4+m*16+(o.scared?10:0));fs('#7a2030',4);
  if(o.armed){line([140,200,230,110],30,OL);line([140,200,230,110],20,'#5a6b3a');rr(200,0,70,130,14);fs(P.spray);rr(215,-40,40,44,6);fs('#ddd');line([255,-30,300,-30],8,'#ddd');
    line([-140,200,-230,120],30,OL);line([-140,200,-230,120],20,'#5a6b3a');poly([-300,80,-180,60,-170,190,-290,210]);fs(P.cloth);}
  ctx.restore();}
function bigScreen(x,y,w,h,col){rr(x-20,y-20,w+40,h+40,24);fs('#111',8);rr(x,y,w,h,10);fs(col||P.screen,0);}
function walkie(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-90,-200,180,380,30);fs('#2b2f2a');rr(40,-290,20,100,8);fs('#2b2f2a');
  for(let i=0;i<6;i++)line([-60,-150+i*24,60,-150+i*24],8,'#555');rr(-60,10,120,70,10);fs(mouthFor('radio')>0.1?'#7dff9a':'#1d3a24',4);
  circ(-40,130,18);fs('#c0392b',4);circ(40,130,18);fs('#888',4);ctx.restore();}
function sprayBottle(x,y,s,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);rr(-50,-40,100,180,20);fs(P.spray);rr(-36,-90,72,54,8);fs('#ddd');poly([36,-80,90,-80,90,-60,36,-60]);fs('#ddd');
  rr(-34,10,68,60,6);fs('#fff',3);txt('CLEAN',0,40,22,OL,{f:'Chon'});ctx.restore();}

const SCENES={
 attack(lt,ln){sky();ruins();bigScreen(140,420,800,560);
  const n=Math.min(7,1+Math.floor(lt*3));for(let i=0;i<n;i++){zombie(230+(i%4)*200,520+Math.floor(i/4)*240+((i*37)%60),0.7,i*3.1);}
  survivor(540,1150,0.9,{mouth:mouthFor('surv'),scared:1});},
 radio(lt,ln){bgFill('#1a2018');
  walkie(260,980,1.1);
  bigScreen(480,520,520,520,P.screen2);
  ctx.save();rr(480,520,520,520,10);ctx.clip();const k=prog(lt,0.3,ln.dur);
  for(let i=0;i<16;i++){ctx.save();ctx.globalAlpha=k;ctx.strokeStyle='#ffffff88';ctx.lineWidth=2;ctx.beginPath();ctx.arc(740+hash(i)*60-30,780+hash(i*2)*60-30,40+i*12,hash(i*3)*6,hash(i*3)*6+1.5);ctx.stroke();ctx.restore();}
  ctx.save();ctx.translate(lerp(560,900,(lt*0.8)%1),780);rr(-80,-60,160,120,10);fs('#ffffff',4);ctx.restore();ctx.restore();
  const c=E.back(prog(lt,ln.dur*0.55,ln.dur*0.8));if(c>0){ctx.save();ctx.translate(740,1180);ctx.scale(c,c);rr(-230,-50,460,100,10);fs('#c0392b',6);txt('รอยขนแมว!',0,4,54,'#fff',{f:'Chon'});ctx.restore();}},
 rule(lt,ln){bgFill('#20281c');
  rr(60,420,440,760,20);fs('#2e3a28',6);rr(580,420,440,760,20);fs('#2e3a28',6);
  sprayBottle(200,680,0.9,0.2);poly([390,780,470,740,470,820]);fs('#9fe3ff88',0);rr(330,880,140,120,10);fs(P.screen,6);for(let i=0;i<4;i++){line([360+i*25,1000,360+i*25,1040+i*10],6,'#9fe3ff');}
  txt('✗ ฉีดใส่จอ',280,1110,52,'#ff6b6b',{f:'Chon'});
  sprayBottle(700,680,0.9,0.2);poly([880,760,960,760,920,840]);fs(P.cloth,5);
  const w=Math.sin(T*6)*30;rr(780+w,900,180,110,10);fs(P.screen,6);poly([800+w,930,900+w,920,910+w,990,810+w,1000]);fs(P.cloth,4);
  txt('✓ ฉีดลงผ้า',800,1110,52,'#7dff9a',{f:'Chon'});},
 weapon(lt){sky();for(let i=0;i<14;i++){const a=i/14*Math.PI*2+T*0.3;ctx.save();ctx.globalAlpha=0.2;ctx.fillStyle='#fff3b0';ctx.beginPath();ctx.moveTo(540,950);ctx.arc(540,950,1400,a,a+0.12);ctx.fill();ctx.restore();}
  const k=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1000);ctx.scale(k,k);ctx.translate(-540,-1000);survivor(540,900,1.0,{mouth:mouthFor('surv'),armed:1});ctx.restore();
  txt('อาวุธลับ',540,560,110,'#fff',{f:'Chon',sw:14,stroke:'#3d1f3a'});},
 fight(lt,ln){sky();ruins();bigScreen(140,420,800,620);
  const wx=lerp(100,1000,E.inOut(prog(lt,0.3,ln.dur)));
  for(let i=0;i<7;i++){const zx=230+(i%4)*200;const gone=zx<wx-60;zombie(zx,520+Math.floor(i/4)*260+((i*37)%60),0.7,i*3.1,{alpha:gone?0:1});
    if(zx<wx&&zx>wx-200){for(let j=0;j<6;j++){circ(zx+Math.cos(j)*60*(1-(wx-zx)/200),600+Math.sin(j)*60,14);ctx.fillStyle='#ffffffaa';ctx.fill();}}}
  ctx.save();rr(140,420,Math.max(0,wx-140),620,10);ctx.clip();rr(140,420,800,620,10);fs('#cfeeff',0);line([200,460,400,1000],30,'#ffffffaa');ctx.restore();
  poly([wx-60,400,wx+60,400,wx+70,1060,wx-50,1060]);fs(P.cloth,6);
  for(let i=0;i<4;i++)star(wx-120-i*90,480+i*150,26,9,4,T*4,'#fff');},
 safe(lt){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#ffd6a5');g.addColorStop(1,'#fffbe6');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  circ(540,1250,260);fs('#ffe066',0);ruins();
  bigScreen(190,440,700,480,'#cfeeff');line([260,470,420,900],34,'#ffffffcc');line([380,470,480,700],16,'#ffffffcc');
  for(let i=0;i<6;i++)star(220+i*120,420+Math.sin(T*3+i)*16,22,8,4,T*2,'#fff');
  survivor(540,1180,0.7,{mouth:0});txt('จอใสเหมือนใหม่',540,1020,72,'#2a6a3a',{f:'Chon',sw:10,stroke:'#fff'});},
 cta(lt){sky();ruins();
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1000);ctx.scale(b,b);ctx.rotate(-0.03);
  rr(-320,-220,640,420,16);fs('#8a6a3a',8);for(let i=0;i<4;i++)line([-320,-220+i*140,320,-220+i*140],6,OL);line([-320,-220,320,200],10,'#6b4f2a');
  rr(-220,-120,440,120,10);fs('#e8d9b0',6);txt('เสบียงจำเป็น',0,-58,54,'#3a2a1a',{f:'Chon'});
  ctx.save();ctx.translate(0,90);ctx.scale(0.6,0.6);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#ffd23f';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();ctx.restore();
  txt('รีบไปที่ตะกร้าด้านล่าง!',540,1330,66,'#fff',{f:'Chon',sw:12,stroke:'#3d1f3a'});
  const ay=1410+Math.abs(Math.sin(T*6))*16;poly([500,ay-36,580,ay-36,580,ay,620,ay,540,ay+44,460,ay,500,ay]);fs('#ffd23f',6);},
};

window.EP={font:'Chon',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.05*prog(lt,0,ln.dur);if(name==='attack'){const sh=4;ctx.translate(Math.sin(T*30)*sh,Math.cos(T*27)*sh);}ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Chon',size:56,col:'#ffffff',hl:'#b8f35a',stroke:'#0f140c',sw:14,pop:'back',y:1580,lh:1.45},
  intro(t){sky();ruins();const k=prog(t,0.2,1.2);ctx.save();ctx.globalAlpha=k;txt('วันสิ้นโลก',540,800,130,'#b8f35a',{f:'Chon',sw:14,stroke:'#0f140c'});txt('บนโต๊ะคอม',540,960,90,'#fff',{f:'Chon',sw:12,stroke:'#0f140c'});ctx.restore();},
  overlay(t){ctx.save();ctx.translate(540,200);ctx.rotate(-0.02);rr(-460,-90,920,180,6);fs('#0f140cdd',6,'#b8f35a');
    txt(TL.title,0,-10,76,'#b8f35a',{f:'Chon',maxW:860});txt(TL.series,0,58,32,'#e0e0d0',{f:'Chon'});ctx.restore();
    ctx.save();ctx.globalAlpha=0.5;for(let i=0;i<6;i++){circ(hash(i)*W,320+hash(i*2)*100,4);ctx.fillStyle='#b8f35a';ctx.fill();}ctx.restore();},
  post(){grain(0.05);},
  outroGap:0.6,
  outro(k){ctx.fillStyle=`rgba(15,20,12,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill('#0f140c');ctx.save();ctx.globalAlpha=k;txt('รอดแล้ว!',540,780,130,'#b8f35a',{f:'Chon'});
    txt('ชุดทำความสะอาดหน้าจอ',540,950,72,'#fff',{f:'Chon',maxW:960});txt('อยู่ในตะกร้าด้านล่าง',540,1060,58,'#b8f35a',{f:'Chon'});ctx.restore();},
};
