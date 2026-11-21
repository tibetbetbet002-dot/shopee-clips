// EP.10 รักนี้...หาปากกาไม่เจอ — แนวละครหลังข่าว (ชั้นจัดระเบียบโต๊ะ)
OL = '#4a1c2c'; LW = 6;
const P = {pink:'#ffd6e0',rose:'#ff8fab',wine:'#6d2e46',gold:'#e9c46a',lav:'#cdb4db',skin:'#f6d0b6',skin2:'#eebd9c',hairR:'#3b1f2b',hairP:'#2a1a12',dress:'#ff8fab',shirt:'#fdfdfd',wood:'#b07d62'};

function rin(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.4),y+boil(2,1.4));ctx.scale(s,s);
  const wind=Math.sin(T*3)*20;
  ctx.beginPath();ctx.moveTo(-110,-40);ctx.quadraticCurveTo(-200-wind,200,-150-wind*1.5,420);ctx.lineTo(150+wind*0.5,420);ctx.quadraticCurveTo(200,200,110,-40);ctx.closePath();fs(P.hairR);
  poly([-140,140,140,140,190,480,-190,480]);fs(P.dress);ctx.beginPath();ctx.arc(0,140,60,0,Math.PI);fs('#fff',5);
  rr(-22,92,44,56,10);fs(P.skin);ell(0,0,94,110);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-98,20);ctx.quadraticCurveTo(-100,-125,0,-118);ctx.quadraticCurveTo(100,-125,98,20);ctx.quadraticCurveTo(70,-70,10,-60);ctx.quadraticCurveTo(-50,-60,-98,20);fs(P.hairR);
  circ(70,-80,18);fs(P.gold,4);
  for(const ex of[-36,36]){
    if(o.wink&&ex>0){ctx.beginPath();ctx.arc(ex,4,16,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}
    ell(ex,2,22,26);fs('#fff',4);circ(ex,6,15);ctx.fillStyle='#5a2a40';ctx.fill();circ(ex+6,-2,6);ctx.fillStyle='#fff';ctx.fill();circ(ex-6,12,3);ctx.fill();
    line([ex-22,-14,ex-30,-22],4);line([ex+22,-14,ex+30,-22],4);}
  if(o.cry){for(const ex of[-36,36]){const ph=(T*1.4+(ex>0?0.5:0))%1;ctx.beginPath();ctx.moveTo(ex,30+ph*80);ctx.quadraticCurveTo(ex+12,52+ph*80,ex,60+ph*80);ctx.quadraticCurveTo(ex-12,52+ph*80,ex,30+ph*80);fs('#a8dfff',3);
    line([ex,28,ex-4,30+ph*80],8,'#a8dfff88');}}
  if(o.blush){ell(-60,40,20,10);ctx.fillStyle='#ff6b8bbb';ctx.fill();ell(60,40,20,10);ctx.fill();for(let i=0;i<3;i++)line([-74+i*10,34,-70+i*10,46],3,'#e05577');}
  if(o.gasp){ell(0,60,16,22);fs('#8a2a3a',5);ell(30,80,40,30);fs(P.skin,5);}
  else ell(0,58,12+m*6,3+m*14),fs('#c0405a',4);
  ctx.restore();}

function phop(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.4),y+boil(4,1.4));ctx.scale(s,s);ctx.rotate(o.turn||0);
  poly([-160,140,160,140,190,500,-190,500]);fs(P.shirt);poly([-30,140,0,220,30,140]);fs(P.skin2,5);
  rr(-24,90,48,60,10);fs(P.skin2);ell(0,0,96,114);fs(P.skin2);
  const wind=Math.sin(T*2.5)*14;
  ctx.beginPath();ctx.moveTo(-100,0);ctx.quadraticCurveTo(-120,-150,20,-150);ctx.quadraticCurveTo(150,-150,110,-20);ctx.quadraticCurveTo(100,-70,60,-80);
  ctx.quadraticCurveTo(80+wind,-10,30,20);ctx.quadraticCurveTo(10,-60,-30,-70);ctx.quadraticCurveTo(-70,-60,-100,0);fs(P.hairP);
  for(const ex of[-36,36]){ell(ex,4,18,14);fs('#fff',4);circ(ex,5,9);ctx.fillStyle='#2a1a12';ctx.fill();circ(ex+4,1,3);ctx.fillStyle='#fff';ctx.fill();line([ex-22,-18,ex+20,-22],6);}
  if(o.slapped){ell(50,30,34,24);ctx.fillStyle='#ff6b6b66';ctx.fill();rr(-10,-40,110,90,6);fs('#fff59d',4);}
  ctx.beginPath();ctx.moveTo(-26,56);ctx.quadraticCurveTo(0,62+m*24,26,56);ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.stroke();
  if(m>0.1)ell(0,62,12,4+m*10),fs('#9a3a4a',4);
  if(o.sparkle)for(let i=0;i<6;i++){const a=i+T*1.5;star(Math.cos(a)*200,Math.sin(a)*170-40,20,6,4,T*3,'#fff6c8');}
  ctx.restore();}

function organizer(x,y,s,fill){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-230,-180,140,200,10);fs('#f4e1d2');rr(-80,-110,180,130,10);fs('#f4e1d2');rr(110,-250,120,270,10);fs('#f4e1d2');rr(-250,10,500,40,12);fs('#e8cbb5');
  if(fill>0){for(let i=0;i<3;i++){line([-200+i*35,-180,-210+i*35,-300],12,['#ff6b6b','#4361ee','#2a9d8f'][i]);}}
  if(fill>1){rr(-60,-200,140,100,4);fs('#fff',4);line([-40,-170,60,-170],3);line([-40,-140,40,-140],3);}
  if(fill>2){rr(125,-380,90,160,12);fs('#2b2d42',4);rr(133,-370,74,140,8);fs('#90e0ef',0);}
  ctx.restore();}

function messyDesk(clean){rr(-40,1150,1160,40,8);fs(P.wood);ctx.fillStyle='#8a5a44';ctx.fillRect(-300,1190,W+600,800);
  if(!clean){for(let i=0;i<9;i++){ctx.save();ctx.translate(140+i*95,1130-hash(i)*40);ctx.rotate((hash(i*3)-0.5)*0.8);rr(-60,-40,120,80,4);fs('#fff',4);ctx.restore();}
    ell(860,1110,40,50);fs('#c0e0ff',5);ell(200,1120,40,40);fs('#d4a373',5);
    curve([100,1150,300,1100,420,1160,600,1090,800,1150],10,'#333');}}
function bokeh(){for(let i=0;i<16;i++){const x=hash(i)*W,y=hash(i*2)*H,r=30+hash(i*3)*70;ctx.save();ctx.globalAlpha=0.18+0.1*Math.sin(T*2+i);circ(x+Math.sin(T*0.5+i)*20,y,r);ctx.fillStyle=i%2?'#fff':P.gold;ctx.fill();ctx.restore();}}
function petals(n=24){for(let i=0;i<n;i++){const x=(hash(i)*W+T*60+Math.sin(T+i)*60)%W,y=((hash(i*5)*2200+T*(140+hash(i)*120))%2200)-200;
  ctx.save();ctx.translate(x,y);ctx.rotate(T*2+i);ell(0,0,18,10);ctx.fillStyle='#ff5d8f';ctx.fill();ctx.restore();}}
function heartPath(cx,cy,s){ctx.moveTo(cx,cy+s*0.35);ctx.bezierCurveTo(cx-s*1.1,cy-s*0.45,cx-s*0.45,cy-s*1.2,cx,cy-s*0.55);ctx.bezierCurveTo(cx+s*0.45,cy-s*1.2,cx+s*1.1,cy-s*0.45,cx,cy+s*0.35);}
function roomBg(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#ffe5ec');g.addColorStop(1,'#ffc2d1');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  rr(720,420,280,360,140);fs('#fff8f0',6);line([860,420,860,780],5);}
function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');
  poly([-140,-50,140,-50,108,96,-108,96]);fs(null);
  ctx.beginPath();heartPath(110,-70,60);fs('#ff5d8f',5);ctx.restore();}

const SCENES={
 cry(lt){roomBg();
  rin(540,850,1.2,{mouth:mouthFor('rin'),cry:1});messyDesk(false);
  for(let i=0;i<7;i++){const k=prog(lt,0.2+i*0.04,1.6+i*0.1);if(k<=0)continue;ctx.save();ctx.translate(540+Math.cos(i*0.9)*k*500,1100-Math.sin(k*Math.PI)*600-k*100);ctx.rotate(k*6+i);rr(-60,-40,120,80,4);fs('#fff',4);ctx.restore();}},
 turn(lt){bgFill(P.wine);bokeh();
  const k=E.inOut(prog(lt,0,1.2));phop(540,880,1.35,{mouth:mouthFor('phop'),turn:lerp(-0.25,0,k),sparkle:1});petals(30);},
 shock(lt,ln){roomBg();
  rin(330,880,0.95,{gasp:1});
  const hit=lt>ln.dur*0.85;
  phop(770,880,0.95,{slapped:hit,turn:hit?0.15:0});
  if(!hit){const k=prog(lt,ln.dur*0.5,ln.dur*0.85);if(k>0){ctx.save();ctx.translate(lerp(330,800,k),lerp(900,880,k)-Math.sin(k*Math.PI)*200);ctx.rotate(k*10);rr(-50,-40,100,80,4);fs('#fff59d',4);ctx.restore();}}
  if(hit){star(820,880,120*E.back(prog(lt,ln.dur*0.85,ln.dur*0.95)),60,8,0,'#fff',6);txt('ปั๊บ!',820,885,56,OL,{f:'Mitr'});}},
 science(lt,ln){bgFill('#2d1b2e');bokeh();
  ctx.save();ctx.translate(540,900);const pulse=1+0.03*Math.sin(T*6);ctx.scale(pulse,pulse);
  ctx.beginPath();ctx.ellipse(0,0,260,200,0,0,Math.PI*2);fs('#ffb3c6',8);
  for(let i=0;i<6;i++)curve([-220+i*80,-150,-200+i*80,-40,-240+i*80,60,-210+i*80,150],6,'#e07a9a');ctx.restore();
  const items=[[160,560,'📄'],[920,600,'☕'],[150,1110,'🔌'],[930,1110,'📦']];
  items.forEach(([x,y,e],i)=>{const k=prog(lt,0.2+i*0.25,0.5+i*0.25);if(k<=0)return;line([x,y,lerp(x,540,0.6),lerp(y,900,0.6)],6,'#ff5d8f');
    circ(x,y,70);fs('#fff',5);txt(e,x,y+4,60,'#000',{f:'Mitr'});});
  txt('ของรกในสายตา = แย่งความสนใจ',540,1260,54,P.gold,{f:'Charm',sw:8,maxW:960});
  txt('อ้างอิง: McMains & Kastner (2011)',540,1330,28,'#e9c4d4',{f:'Mitr'});},
 gift(lt,ln){bgFill(P.wine);bokeh();
  const op=E.out(prog(lt,ln.dur*0.45,ln.dur*0.75));
  phop(540,560,0.7,{mouth:mouthFor('phop'),sparkle:1});
  ctx.save();ctx.translate(540,1250);rr(-200,-120,400,240,10);fs('#ff5d8f');rr(-24,-120,48,240,0);fs(P.gold,0);
  ctx.save();ctx.translate(0,-120-op*260);ctx.rotate(-op*0.6);rr(-220,-40,440,60,10);fs('#ff8fab');rr(-24,-40,48,60,0);fs(P.gold,0);
  ell(-50,-50,50,26,-0.4);fs(P.gold,5);ell(50,-50,50,26,0.4);fs(P.gold,5);ctx.restore();ctx.restore();
  if(op>0.5){ctx.save();ctx.globalAlpha=(op-0.5)*2;organizer(540,1150,0.7,3);ctx.restore();for(let i=0;i<8;i++){const a=i*0.8+T;star(540+Math.cos(a)*280,1080+Math.sin(a)*130,20,6,4,T*3,'#fff6c8');}}},
 organize(lt,ln){roomBg();
  const d=ln.dur;const fills=[0.15,0.45,0.75].filter(f=>lt>d*f+0.25).length;
  messyDesk(fills>=3);organizer(540,1150,1.25,fills);
  const fly=[[0.15,'pen'],[0.45,'paper'],[0.75,'phone']];
  fly.forEach(([f,t],i)=>{const k=prog(lt,d*f-0.1,d*f+0.25);if(k<=0||k>=1)return;const sx=[100,980,100][i],sy=[700,700,1500][i],ex=[290,560,760][i],ey=[870,950,800][i];
    ctx.save();ctx.translate(lerp(sx,ex,E.inOut(k)),lerp(sy,ey,E.inOut(k))-Math.sin(k*Math.PI)*200);ctx.rotate(k*6);
    if(t==='pen'){line([-60,0,60,0],14,'#4361ee');}else if(t==='paper'){rr(-60,-45,120,90,4);fs('#fff',4);}else{rr(-40,-70,80,140,12);fs('#2b2d42',4);}ctx.restore();});
  if(fills>=3)for(let i=0;i<8;i++)star(200+i*100,560+Math.sin(T*4+i)*20,20,6,4,T*2,P.gold);
  txt(['','ปากกา ✓','กระดาษ ✓','มือถือ ✓ เข้าที่!'][fills],540,520,72,P.wine,{f:'Charm',sw:0});},
 kneel(lt,ln){bgFill('#ffc2d1');bokeh();
  rin(300,700,0.8,{blush:1});
  ctx.save();ctx.translate(720,1000);phop(0,0,0.85,{mouth:mouthFor('phop'),sparkle:1});ctx.restore();
  organizer(560,1250,0.55,3);
  for(let i=0;i<6;i++){const ph=(T*0.6+i/6)%1;ctx.save();ctx.globalAlpha=1-ph;ctx.beginPath();heartPath(400+i*60,1100-ph*500,30+ph*20);ctx.fillStyle='#ff5d8f';ctx.fill();ctx.restore();}
  const k=E.back(prog(lt,ln.dur*0.1,ln.dur*0.1+0.3));if(k>0){ctx.save();ctx.translate(780,520);ctx.rotate(0.08);ctx.scale(k,k);rr(-200,-60,400,120,60);fs(P.gold,6);txt('ราคาไม่แพง',0,4,58,P.wine,{f:'Charm'});ctx.restore();}},
 cta(lt){bgFill(P.wine);bokeh();petals(26);
  rin(320,900,0.95,{mouth:mouthFor('rin'),wink:1});
  const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(780,1080);ctx.scale(b,b);basket(0,0,1.05);ctx.restore();
  txt('ตามไปที่ตะกร้าด้านล่าง',540,560,76,P.gold,{f:'Charm',sw:8});},
};

function camera(name,lt,ln){let s=1;
  if(name==='turn'){s=1+[0,0.12,0.28][Math.min(2,Math.floor(lt/0.45))];}       // ซูม 3 จังหวะแบบละคร
  else if(name==='cry'){s=1+0.06*prog(lt,0,ln.dur);}
  else s=1+0.04*prog(lt,0,ln.dur);
  ctx.translate(540,900);ctx.scale(s,s);ctx.translate(-540,-900);}

window.EP={font:'Charm',scenes:SCENES,camera,
  sub:{f:'Charm',size:68,col:'#ffffff',hl:'#ffd166',stroke:'#6d2e46',sw:12,pop:'fade',y:1580,lh:1.25},
  intro(t){bgFill(P.wine);bokeh();petals(20);const k=prog(t,0.1,1.0);ctx.save();ctx.globalAlpha=k;
    txt('ละครหลังข่าวโต๊ะคอม',540,820,64,'#ffd6e0',{f:'Charm'});txt('รักนี้...',540,960,150,P.gold,{f:'Sri2'});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-440,-95,880,190,95);fs('#6d2e46e6',4,P.gold);
    txt(TL.series,0,-44,38,'#ffd6e0',{f:'Charm'});txt(TL.title,0,30,78,P.gold,{f:'Sri2',maxW:820});
    star(-400,0,18,6,4,T,P.gold);star(400,0,18,6,4,-T,P.gold);ctx.restore();vignette(0.35,'109,46,70');},
  outroGap:0.65,
  outro(k){ctx.save();ctx.fillStyle=P.wine;ctx.beginPath();ctx.rect(0,0,W,H);heartPath(540,1000,lerp(1600,0,E.inOut(k)));ctx.fill('evenodd');ctx.restore();},
  endCard(k){bgFill(P.wine);bokeh();ctx.save();ctx.globalAlpha=k;txt('จบบริบูรณ์',540,800,130,P.gold,{f:'Sri2'});
    txt('ชั้นจัดระเบียบโต๊ะ',540,980,72,'#fff',{f:'Charm'});txt('อยู่ในตะกร้าด้านล่าง',540,1080,58,'#ffd6e0',{f:'Charm'});ctx.restore();},
};
