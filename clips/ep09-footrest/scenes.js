// EP.9 เท้าลอย = ขาชา! — แนวโค้ชฟิตเนส (ที่วางเท้า)
OL = '#111111'; LW = 9;
const P = {black:'#111111',lime:'#c6ff00',orange:'#ff6d00',blue:'#00b0ff',skin:'#d9a07a',skin2:'#f2c9a6',hair:'#1a1a1a',office:'#7b8cde',pink:'#ff4f8b'};

function sk(fn){ctx.save();ctx.transform(1,0,-0.18,1,0,0);fn();ctx.restore();}
function bigTxt(s,x,y,size,fill,o={}){ctx.save();ctx.translate(x,y);ctx.transform(1,0,-0.2,1,0,0);txt(s,0,0,size,fill,{f:'K',sw:o.sw??14,stroke:o.stroke||OL,maxW:o.maxW||0});ctx.restore();}

function coach(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1),y+boil(2));ctx.scale(s,s);
  // แขนกล้าม
  const flex=o.flex?1:0;
  for(const sd of[-1,1]){const pt=o.point&&sd===1;
    if(pt){line([sd*150,170,sd*300,120,sd*420,40],56,OL);line([sd*150,170,sd*300,120,sd*420,40],42,P.skin);circ(sd*440,30,36);fs(P.skin);}
    else if(flex){line([sd*150,170,sd*280,200,sd*270,60],60,OL);line([sd*150,170,sd*280,200,sd*270,60],46,P.skin);ell(sd*270,150,46,40);fs(P.skin);circ(sd*270,40,38);fs(P.skin);}
    else{line([sd*150,170,sd*220,330,sd*190,440],56,OL);line([sd*150,170,sd*220,330,sd*190,440],42,P.skin);circ(sd*190,450,36);fs(P.skin);}}
  poly([-170,130,170,130,140,520,-140,520]);fs(P.orange);poly([-80,130,0,200,80,130]);fs(P.skin,0);
  line([-60,140,30,330],6,'#eee');circ(30,350,22);fs('#bbb',6);
  rr(-40,80,80,70,10);fs(P.skin);
  ell(0,0,108,120);fs(P.skin);
  rr(-112,-70,224,44,10);fs(P.lime);
  ctx.beginPath();ctx.arc(0,-60,108,Math.PI*1.08,Math.PI*1.92);ctx.lineTo(80,-80);ctx.lineTo(-80,-80);ctx.closePath();fs(P.hair);
  for(const ex of[-40,40]){ell(ex,0,17,15);fs('#fff',5);circ(ex,2,7);ctx.fillStyle=OL;ctx.fill();}
  line([-64,-24,-18,-14],10);line([18,-14,64,-24],10);
  ctx.beginPath();ctx.moveTo(-56,46);ctx.quadraticCurveTo(0,96+m*30,56,46);ctx.closePath();fs('#7a1f2e',6);rr(-40,48,80,12,4);fs('#fff',0);
  if(o.whistle){line([0,60,20,90],5);rr(10,80,60,30,10);fs('#ddd',5);}
  ctx.restore();}

function nam(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3),y+boil(4));ctx.scale(s,s);
  ell(0,-10,118,130);fs(P.hair);
  rr(-22,92,44,56,10);fs(P.skin2);ell(0,0,94,108);fs(P.skin2);
  ctx.beginPath();ctx.moveTo(-96,0);ctx.quadraticCurveTo(-90,-120,0,-112);ctx.quadraticCurveTo(90,-120,96,0);ctx.quadraticCurveTo(40,-70,-96,0);fs(P.hair);
  for(const ex of[-34,34]){if(o.happy){ctx.beginPath();ctx.arc(ex,4,16,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=7;ctx.strokeStyle=OL;ctx.stroke();continue;}
    ell(ex,0,14,16);fs('#fff',5);circ(ex+(o.look||0)*5,2,6);ctx.fillStyle=OL;ctx.fill();}
  if(o.happy&&m<0.1){ctx.beginPath();ctx.arc(0,44,28,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=7;ctx.strokeStyle=OL;ctx.stroke();}
  else{ell(0,56,14+m*6,3+m*16);fs('#b0303e',5);}
  ctx.restore();}

// คนนั่งเก้าอี้ มุมข้าง หันขวา  footY = ระดับเท้า, dangle = ห้อยแกว่ง
function sitter(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const chairH=o.chairH??300;
  rr(-140,-20,240,36,12);fs('#333');line([-20,16,-20,chairH],16);line([-120,chairH,80,chairH],14);circ(-120,chairH+14,12);fs('#555',5);circ(80,chairH+14,12);fs('#555',5);
  line([-140,-10,-150,-300],16);rr(-180,-320,60,200,20);fs('#333');
  // ต้นขา ขา เท้า
  const sw=o.dangle?Math.sin(T*5)*0.25:0,shin=o.shin??0;
  rr(-80,-60,200,70,34);fs('#3d4a6b');
  ctx.save();ctx.translate(110,-25);ctx.rotate(sw+shin);rr(-30,0,60,o.legLen||230,28);fs('#3d4a6b');rr(-30,(o.legLen||230)-10,110,40,18);fs('#222');ctx.restore();
  rr(-110,-330,160,280,60);fs(P.office);
  line([0,-260,90,-170,170,-190],30,OL);line([0,-260,90,-170,170,-190],20,P.skin2);
  ctx.save();ctx.translate(-20,-360);nam(0,-60,0.75,{mouth:o.mouth,happy:o.happy,look:1});ctx.restore();
  ctx.restore();}

function footrest(x,y,s,tilt){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-200,-10,400,30,10);fs('#333');
  ctx.save();ctx.translate(0,-30);ctx.rotate(-tilt);rr(-220,-30,440,50,16);fs(P.lime);for(let i=0;i<9;i++){circ(-180+i*45,-30,10);fs('#9ccc00',4);}ctx.restore();
  line([-120,0,-80,-30],14);line([120,0,80,-30],14);ctx.restore();}

function gymBg(){bgFill('#161616');
  for(let i=-4;i<16;i++){ctx.save();ctx.translate(i*120+((T*80)%120),0);ctx.transform(1,0,-0.4,1,0,0);ctx.fillStyle=i%2?'#1e1e1e':'#141414';ctx.fillRect(0,0,60,H);ctx.restore();}
  rr(60,420,960,24,6);fs(P.lime,0);rr(60,1260,960,24,6);fs(P.orange,0);
  for(let i=0;i<5;i++){const x=150+i*190;line([x-50,520,x+50,520],12,'#666');rr(x-70,490,30,60,6);fs('#333',5);rr(x+40,490,30,60,6);fs('#333',5);}
  ctx.fillStyle='#0d0d0d';ctx.fillRect(-300,1300,W+600,800);}
function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.lime;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');
  poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();}

const SCENES={
 gym(lt){gymBg();speedLines(540,900,'#c6ff0033',36);
  const k=E.back(prog(lt,0,0.35));ctx.save();ctx.translate(540,960);ctx.scale(k,k);ctx.translate(-540,-960);coach(540,880,1.15,{mouth:mouthFor('coach'),point:1,whistle:1});ctx.restore();
  const s=E.back(prog(lt,0.5,0.8));if(s>0){ctx.save();ctx.translate(780,560);ctx.rotate(0.12);ctx.scale(s,s);rr(-210,-70,420,140,10);fs(P.pink,8);bigTxt('เท้าลอย?!',0,6,84,'#fff',{sw:10});ctx.restore();}},
 dangle(lt){bgFill('#e9ecf5');ctx.fillStyle='#d5dae8';ctx.fillRect(0,0,W,1300);ctx.fillStyle='#b9c0d4';ctx.fillRect(-300,1300,W+600,800);line([-50,1300,W+50,1300],8);
  sitter(420,980,1.0,{dangle:1,chairH:320,mouth:mouthFor('nam')});
  const fy=980+(-25+230+30)*1;ctx.setLineDash([16,12]);line([620,1210,620,1290],7,P.pink);ctx.setLineDash([]);
  poly([605,1220,635,1220,620,1200]);fs(P.pink,0);poly([605,1280,635,1280,620,1300]);fs(P.pink,0);
  bigTxt('ห่างพื้น!',800,1250,64,P.pink,{sw:10});},
 press(lt,ln){bgFill('#1a1030');
  const k=E.inOut(prog(lt,0.2,1.2));
  ctx.save();ctx.translate(540,980);rr(-420,-140,840,280,140);fs('#d9a07a',10);
  ctx.save();rr(-420,-140,840,280,140);ctx.clip();rr(-420,-140,840,280,0);fs('#e8b896',0);
  line([-420,20,420,20],34-k*18,'#c0392b');
  for(let i=0;i<10;i++){const ph=(T*lerp(0.9,0.25,k)+i/10)%1;circ(-420+ph*840,20,8);ctx.fillStyle='#ff8080';ctx.fill();}
  ctx.restore();
  rr(-80,140-k*40,520,120,20);fs('#333');ctx.restore();
  ctx.save();ctx.globalAlpha=k;rr(150,540,780,110,10);fs(P.pink,6);bigTxt('ขอบเก้าอี้กดใต้ต้นขา',540,596,58,'#fff',{sw:8});ctx.restore();
  if(lt>ln.dur*0.7){for(let i=0;i<12;i++){const x=200+hash(i+Math.floor(T*12))*700,y=1250+hash(i*3+Math.floor(T*12))*120;star(x,y,22,6,4,0,P.lime);}bigTxt('ขาชา!',540,1280,110,P.lime,{sw:12});}},
 rule(lt){bgFill('#f5f7ff');for(let i=0;i<20;i++)line([0,i*100,W,i*100],2,'#e3e7f5');
  ctx.fillStyle='#d9deeb';ctx.fillRect(-300,1300,W+600,800);line([-50,1300,W+50,1300],8);
  sitter(380,1030,1.0,{chairH:270,shin:0,legLen:240,mouth:0,happy:1});
  ctx.beginPath();ctx.arc(490,1005,90,0,Math.PI/2);ctx.lineWidth=12;ctx.strokeStyle=P.orange;ctx.stroke();bigTxt('90°',650,1110,80,P.orange,{sw:10});
  line([520,1300,780,1300],16,'#2fbf71');bigTxt('เท้าวางราบ',800,1380,60,'#2fbf71',{sw:8});
  const c=E.back(prog(lt,0.3,0.6));circ(880,500,80*c);fs('#2fbf71',8);line([845,500,870,530,915,470],16,'#fff');},
 q(lt){bgFill('#e9ecf5');ctx.fillStyle='#b9c0d4';ctx.fillRect(-300,1300,W+600,800);
  sitter(480,980,1.15,{dangle:1,chairH:300,mouth:mouthFor('nam')});
  for(let i=0;i<3;i++){const k=prog(lt,i*0.15,i*0.15+0.3);txt('?',760+i*80,560-i*40,120*E.back(k),P.pink,{f:'K',sw:12});}},
 product(lt,ln){gymBg();
  const d=ln.dur,tilt=0.25*Math.sin(prog(lt,d*0.45,d*0.9)*Math.PI*2);
  ctx.save();ctx.translate(540,1150);const k=E.back(prog(lt,0.05,0.4));ctx.scale(k,k);footrest(0,0,1.5,tilt);ctx.restore();
  for(let i=0;i<10;i++){const a=i*0.63+T*2;line([540+Math.cos(a)*380,1100+Math.sin(a)*220,540+Math.cos(a)*460,1100+Math.sin(a)*270],8,P.lime);}
  bigTxt('ที่วางเท้า',540,560,130,P.lime,{sw:14});
  [[0.45,'ปรับมุมได้'],[0.75,'เท้าได้พักทั้งวัน']].forEach(([f,t],i)=>{const kk=E.back(prog(lt,d*f,d*f+0.3));if(kk<=0)return;ctx.save();ctx.translate(540,720+i*120);ctx.scale(kk,kk);
    rr(-260,-48,520,96,0);fs(P.orange,6);bigTxt(t,0,4,54,'#fff',{sw:0});ctx.restore();});},
 happy(lt,ln){bgFill('#fff6d6');for(let i=0;i<14;i++){const a=i/14*Math.PI*2+T*0.2;ctx.fillStyle=i%2?'#ffeaa0':'#fff6d6';ctx.beginPath();ctx.moveTo(540,900);ctx.arc(540,900,1500,a,a+Math.PI/14);ctx.fill();}
  ctx.fillStyle='#e8d9a8';ctx.fillRect(-300,1300,W+600,800);
  footrest(660,1290,0.8,0.12);sitter(420,990,1.0,{chairH:300,shin:-0.08,legLen:250,mouth:mouthFor('nam'),happy:1});
  const k=E.back(prog(lt,ln.dur*0.55,ln.dur*0.55+0.3));if(k>0){ctx.save();ctx.translate(800,560);ctx.rotate(0.1);ctx.scale(k,k);rr(-200,-60,400,120,0);fs(P.lime,8);bigTxt('ราคาสบายๆ',0,4,58,OL,{sw:0});ctx.restore();}},
 cta(lt){gymBg();
  coach(300,900,0.8,{mouth:mouthFor('coach'),flex:1});
  const b=E.back(prog(lt,0.2,0.5));ctx.save();ctx.translate(780,1060);ctx.scale(b,b);basket(0,0,1.1);ctx.restore();
  const rep=Math.min(10,Math.floor(lt*4)+1);bigTxt('+1 เซ็ต!',780,820,110,P.lime,{sw:14});
  bigTxt('กดตะกร้าด้านล่าง',540,1420,80,'#fff',{sw:12});},
};

window.EP={font:'K',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.1*(1-E.out(prog(lt,0,0.22)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'K',w:800,size:60,col:'#111111',hl:'#ff3d00',sw:0,box:'#c6ff00',boxR:0,boxPad:30,pop:'back',y:1600,lh:1.3,skew:-0.18},
  intro(t){gymBg();const k=E.back(prog(t,0,0.4));ctx.save();ctx.translate(540,900);ctx.scale(k,k);bigTxt('3',0,0,360,P.lime,{sw:20});ctx.restore();},
  overlay(t){ctx.save();ctx.translate(60,110);ctx.transform(1,0,-0.2,1,0,0);rr(0,0,560,64,0);fs(P.lime,0);txt(TL.series,280,34,40,OL,{f:'K'});ctx.restore();
    bigTxt(TL.title,540,250,88,'#fff',{sw:14,maxW:960});
    const bpm=110+Math.round(20*Math.abs(Math.sin(T*2)));rr(800,100,240,70,35);fs('#00000099',4,P.pink);txt('♥ '+bpm+' BPM',920,136,36,P.pink,{f:'K'});},
  outroGap:0.5,
  outro(k){ctx.save();ctx.fillStyle=P.lime;ctx.beginPath();const x=lerp(-1400,0,E.inOut(k));ctx.moveTo(x,0);ctx.lineTo(x+1400+400,0);ctx.lineTo(x+1400,H);ctx.lineTo(x-400,H);ctx.closePath();ctx.fill();ctx.restore();},
  endCard(k){bgFill(P.lime);ctx.save();ctx.globalAlpha=k;bigTxt('โค้ชออฟฟิศฟิต',540,780,96,OL,{sw:0});
    bigTxt('ที่วางเท้า',540,950,110,'#fff',{sw:12});bigTxt('อยู่ในตะกร้าด้านล่าง',540,1080,64,OL,{sw:0});ctx.restore();},
};
