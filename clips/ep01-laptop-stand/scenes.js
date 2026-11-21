// EP.1 แท่นวางโน้ตบุ๊ก — ฉากเฉพาะตอนนี้ (ไซไฟซิทคอม)
const C={skin:'#f4c49e',hair:'#3b2418',shirt:'#7ec8f0',tie:'#e8434f',pants:'#3d4a6b',
  metal:'#b7c7d3',metalD:'#8aa0b0',face:'#22163a',glow:'#b9f53b',stand:'#ff8a3d',white:'#fffdf6',yellow:'#ffd23f'};
function office(){bgFill('#a9d4b5');
  ctx.fillStyle='#93c4a1';for(let i=0;i<7;i++){ctx.fillRect(i*170-20,0,70,1300);}
  // หน้าต่างไซไฟ
  rr(90,420,330,260,30);fs('#d9f2ff',7);line([255,425,255,676],6);line([95,550,415,550],6);
  ctx.fillStyle='#ffffff99';ctx.beginPath();ctx.moveTo(120,660);ctx.lineTo(200,440);ctx.lineTo(240,440);ctx.lineTo(160,660);ctx.fill();
  // ต้นไม้ประหลาด
  rr(880,560,120,140,18);fs('#e86a4f',7);
  for(let i=0;i<3;i++){ell(905+i*35,520-i*12,26,60+i*10,(i-1)*.4);fs('#5fbf2a',6);}
  ctx.fillStyle='#6d8b6a';ctx.fillRect(-200,1300,W+400,800);line([-50,1300,W+50,1300],8);}

// ---------- ตัวละคร ----------
function robot(x,y,s,o={}){
  const m=o.mouth||0, lid=o.lid??0.42, look=o.look||[0,0];
  ctx.save();ctx.translate(x+boil(1),y+boil(2));ctx.scale(s,s);
  // ไอพ่น
  const fl=0.8+0.3*hash(Math.floor(T*24));
  ctx.beginPath();ctx.moveTo(-40,215);ctx.quadraticCurveTo(0,215+170*fl,40,215);ctx.closePath();fs('#ffb13b',6);
  ctx.beginPath();ctx.moveTo(-20,215);ctx.quadraticCurveTo(0,215+90*fl,20,215);ctx.closePath();fs('#fff3a0',0);
  // แขน
  const sw=Math.sin(T*5)*10;
  if(o.arm==='point'){line([75,140,170,210,220,300],16,OL);line([75,140,170,210,220,300],8,C.metal);circ(225,312,24);fs(C.metal,7);}
  else if(o.arm==='wave'){line([75,140,160,90,190,10+sw],16,OL);line([75,140,160,90,190,10+sw],8,C.metal);circ(192,0+sw,24);fs(C.metal,7);}
  else{line([75,140,130,200+sw,120,260],16,OL);line([75,140,130,200+sw,120,260],8,C.metal);circ(118,268,22);fs(C.metal,7);}
  line([-75,140,-130,200-sw,-120,260],16,OL);line([-75,140,-130,200-sw,-120,260],8,C.metal);circ(-118,268,22);fs(C.metal,7);
  rr(-80,95,160,130,44);fs(C.metalD);
  rr(-30,130,60,40,10);fs(o.chest||'#ff6b8b',6);
  // หัว
  line([0,-100,0,-165],9);circ(0,-180,22+3*Math.sin(T*8));fs(C.glow,7);
  circ(-140,0,24);fs(C.metalD,7);circ(140,0,24);fs(C.metalD,7);
  rr(-130,-105,260,205,56);fs(C.metal);
  rr(-102,-75,204,146,36);fs(C.face,6);
  // ตา
  const b=blink(3), L=Math.max(lid,b);
  for(const ex of[-46,46]){circ(ex,-18,34);fs(C.white,0);
    circ(ex+look[0]*14,-18+look[1]*14,7);ctx.fillStyle=OL;ctx.fill();
    if(L>0){ctx.save();circ(ex,-18,35);ctx.clip();ctx.fillStyle=C.metalD;ctx.fillRect(ex-40,-56,80,72*L);
      line([ex-38,-56+72*L,ex+38,-56+72*L],6);ctx.restore();}
    circ(ex,-18,34);fs(null,5);}
  // ปาก LED
  for(let i=0;i<5;i++){const h=7+m*40*(0.55+0.45*Math.sin(i*1.9+T*22));
    ctx.fillStyle=C.glow;ctx.beginPath();ctx.roundRect(-58+i*24,40-h/2,16,h,4);ctx.fill();}
  ctx.restore();}

function human(x,y,s,o={}){
  const m=o.mouth||0, hunch=o.hunch||0, es=o.eye||1, sq=o.squash||0;
  ctx.save();ctx.translate(x+boil(4),y+boil(5));ctx.scale(s*(1+sq*0.12),s*(1-sq*0.12));
  // ลำตัว
  rr(-125,130,250,280,70);fs(C.shirt);
  ctx.beginPath();ctx.moveTo(-40,135);ctx.lineTo(0,175);ctx.lineTo(40,135);fs('#ffffff',7);
  ctx.beginPath();ctx.moveTo(0,170);ctx.lineTo(-18,190);ctx.lineTo(0,300);ctx.lineTo(18,190);ctx.closePath();fs(C.tie,6);
  rr(-28,90+hunch*30,56,60,10);fs(C.skin,7);
  // หัว
  ctx.save();ctx.translate(0,hunch*55);ctx.rotate(o.tilt||0);
  ell(-112,5,22,30);fs(C.skin,7);ell(112,5,22,30);fs(C.skin,7);
  ell(0,0,112,122);fs(C.skin);
  // ผม
  ctx.beginPath();ctx.moveTo(-112,-20);ctx.quadraticCurveTo(-120,-120,-40,-128);ctx.lineTo(-30,-170);ctx.lineTo(0,-125);
  ctx.lineTo(25,-175);ctx.lineTo(40,-122);ctx.quadraticCurveTo(118,-115,112,-20);ctx.quadraticCurveTo(60,-80,-112,-20);ctx.closePath();fs(C.hair);
  // ตา
  const b=blink(1), lk=o.look||[0,hunch*0.8];
  for(const ex of[-42,42]){const r=30*es;
    if(b&&es<1.2){line([ex-24,0,ex+24,0],7);continue;}
    circ(ex,-4,r);fs(C.white,7);circ(ex+lk[0]*r*.45,-4+lk[1]*r*.45,6);ctx.fillStyle=OL;ctx.fill();}
  const br=o.brow||0;
  line([-70,-50-br*22,-18,-46-br*14],8);line([18,-46-br*14,70,-50-br*22],8);
  ctx.beginPath();ctx.arc(0,30,12,0.2,Math.PI-0.2);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();
  // ปาก
  ell(0,72,24+m*10+(o.shout?16:0),5+m*30+(o.shout?14:0));fs('#7a1f2e',7);
  if(o.sweat){for(const[sx,sy]of[[95,-70],[-100,-60]]){const d=(T*1.4+sx)%1;
    ctx.beginPath();ctx.moveTo(sx,sy+d*40-22);ctx.quadraticCurveTo(sx+16,sy+d*40+10,sx,sy+d*40+14);ctx.quadraticCurveTo(sx-16,sy+d*40+10,sx,sy+d*40-22);fs('#9fe3ff',5);}}
  ctx.restore();ctx.restore();}

// มุมมองด้านข้าง หันขวา  a = องศาที่ก้ม
function side(x,y,s,a,o={}){
  const xr=o.xray, F=xr?'#3a0f2c':null, S=xr?C.glow:OL;
  const f=(c)=>xr?F:c;
  ctx.save();ctx.translate(x+boil(6),y+boil(7));ctx.scale(s,s);
  rr(-95,0,150,300,56);fs(f(C.shirt),LW,S);
  // แขน
  line([0,60,90,170,190,170],30,S);line([0,60,90,170,190,170],18,f(C.skin));
  if(xr){for(let i=0;i<7;i++){circ(-40,40+i*38,11);fs(C.glow,0);}}
  ctx.save();ctx.translate(20,0);ctx.rotate(a*Math.PI/180);
  rr(-24,-80,48,92,14);fs(f(C.skin),LW,S);
  if(xr){for(let i=0;i<4;i++){circ(-2,-10-i*22,10);fs(C.glow,0);}}
  ell(10,-160,100,96);fs(f(C.skin),LW,S);
  ctx.beginPath();ctx.moveTo(100,-175);ctx.quadraticCurveTo(140,-150,104,-130);fs(f(C.skin),LW,S);
  if(!xr){ctx.beginPath();ctx.moveTo(-90,-140);ctx.quadraticCurveTo(-80,-262,40,-255);ctx.lineTo(60,-290);ctx.lineTo(70,-245);
    ctx.quadraticCurveTo(115,-230,105,-195);ctx.quadraticCurveTo(10,-215,-50,-120);ctx.closePath();fs(C.hair);}
  else{ell(10,-160,70,66);fs(null,5,C.glow);}
  ell(-15,-150,18,26);fs(f(C.skin),7,S);
  if(!xr){circ(62,-172,20);fs(C.white,6);circ(74,-166,6);ctx.fillStyle=OL;ctx.fill();
    line([70,-115,92,-112],6);}
  if(o.phone){rr(70,-60,40,70,8);fs('#333a55',6);}
  ctx.restore();ctx.restore();}

function portal(x,y,r,rot){if(r<2)return;
  ctx.save();ctx.translate(x,y);circ(0,0,r+18);fs('#e9ff9a',0);circ(0,0,r);fs('#7fdc2e',LW);
  ctx.save();circ(0,0,r);ctx.clip();
  for(let k=0;k<4;k++){ctx.beginPath();for(let i=0;i<80;i++){const a=rot+k*Math.PI/2+i*0.09,rr2=r*(1-i/80);
    i?ctx.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2):ctx.moveTo(Math.cos(a)*rr2,Math.sin(a)*rr2);}
    ctx.lineWidth=r*0.12;ctx.strokeStyle='#c6ff4d';ctx.stroke();}
  circ(0,0,r*0.22);fs('#ffffff',0);ctx.restore();ctx.restore();}

function jug(x,y,s,full=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-30,-215,60,40,10);fs('#3a7bd5',7);
  ctx.beginPath();ctx.moveTo(-40,-180);ctx.lineTo(40,-180);ctx.quadraticCurveTo(100,-150,100,-110);ctx.lineTo(100,0);ctx.lineTo(-100,0);ctx.lineTo(-100,-110);ctx.quadraticCurveTo(-100,-150,-40,-180);ctx.closePath();
  fs('#cfefff');ctx.save();ctx.clip();ctx.fillStyle='#6cc6ff';ctx.fillRect(-110,-180+180*(1-full),220,200);ctx.restore();
  ctx.beginPath();ctx.moveTo(-40,-180);ctx.lineTo(40,-180);ctx.quadraticCurveTo(100,-150,100,-110);ctx.lineTo(100,0);ctx.lineTo(-100,0);ctx.lineTo(-100,-110);ctx.quadraticCurveTo(-100,-150,-40,-180);ctx.closePath();fs(null);
  line([-100,-70,100,-70],6);line([-100,-35,100,-35],6);
  ctx.restore();}

function laptopSide(x,deskY,h,s=1){ // x = ปลายฐานด้านขวา, h = ความสูงแท่น
  ctx.save();ctx.translate(x,deskY);ctx.scale(s,s);
  if(h>2){const tilt=0.12;
    line([-210,0,-150,-h*0.35-6,-10,-h],14,OL);line([-210,0,-150,-h*0.35-6,-10,-h],7,C.stand);
    line([-40,0,-10,-h],14,OL);line([-40,0,-10,-h],7,C.stand);
    rr(-230,-h-14,240,14,6);fs(C.stand,6);}
  rr(-220,-h-30,230,18,6);fs('#c9d1dc',6);
  ctx.save();ctx.translate(0,-h-28);ctx.rotate(0.16);rr(-14,-200,16,200,6);fs('#9aa6b5',6);
  rr(-24,-192,10,184,3);fs('#7fe0ff',3);ctx.restore();
  ctx.restore();}

function standHero(x,y,s,fold){ // fold 0 = กาง, 1 = พับ
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const h=lerp(240,22,fold);
  ell(0,18,260,22);ctx.fillStyle='#00000033';ctx.fill();
  line([-200,0,-120,-h*0.45,-20,-h],22,OL);line([-200,0,-120,-h*0.45,-20,-h],11,C.stand);
  line([150,0,120,-h*0.5,40,-h],22,OL);line([150,0,120,-h*0.5,40,-h],11,C.stand);
  ctx.save();ctx.translate(10,-h);ctx.rotate(-0.14*(1-fold));
  rr(-230,-24,460,26,10);fs(C.stand);
  rr(-230,-24,460,9,6);fs('#ffb067',0);
  for(let i=0;i<6;i++){rr(-170+i*62,-18,30,10,4);fs('#c95e1f',0);}
  rr(205,-58,26,40,6);fs(C.stand,7);
  ctx.restore();ctx.restore();}

function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.beginPath();ctx.arc(0,-60,80,Math.PI,0);ctx.lineWidth=26;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#ffe28a';ctx.stroke();
  ctx.beginPath();ctx.moveTo(-150,-60);ctx.lineTo(150,-60);ctx.lineTo(115,110);ctx.lineTo(-115,110);ctx.closePath();fs('#ff7a1a');
  for(let i=-2;i<=2;i++)line([i*50,-40,i*42,90],7,'#c94f00');
  line([-138,0,138,0],7,'#c94f00');line([-125,55,125,55],7,'#c94f00');
  ctx.beginPath();ctx.moveTo(-150,-60);ctx.lineTo(150,-60);ctx.lineTo(115,110);ctx.lineTo(-115,110);ctx.closePath();fs(null);
  ctx.restore();}

function chip(label,x,y,k,col='#ffffff'){if(k<=0)return;const sc=E.back(k);
  ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);ctx.font='800 64px K';const w=ctx.measureText(label).width+130;
  rr(-w/2,-58,w,116,58);fs(col);circ(-w/2+62,0,34);fs('#2fbf71',6);line([-w/2+46,0,-w/2+58,14,-w/2+80,-14],9,'#fff');
  txt(label,30,4,64,OL);ctx.restore();}

function burst(x,y,r,col,label,size,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.beginPath();
  for(let i=0;i<24;i++){const a=i*Math.PI/12,rad=i%2?r*0.8:r;ctx.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);}ctx.closePath();fs(col);
  txt(label,0,6,size,OL,{maxW:r*1.5});ctx.restore();}

// ---------- ฉาก ----------
const KG=[[0,5],[15,12],[30,18],[45,22],[60,27]];
function kgAt(a){for(let i=1;i<KG.length;i++)if(a<=KG[i][0]){const k=(a-KG[i-1][0])/15;return lerp(KG[i-1][1],KG[i][1],k);}return 27;}

const SCENES={
 portal(lt,ln){office();
  const t=T, pr=E.back(prog(t,0.1,0.75))*230;
  portal(290,880,pr,t*4);
  const e=prog(t,0.65,1.15), up=prog(t,1.4,1.8);
  human(720,960,1,{hunch:1-up*0.8,mouth:mouthFor('human'),eye:1+up*0.5,brow:up,look:[-up*0.8,1-up]});
  rr(400,1180,640,240,16);fs('#c98b5a');rr(380,1160,680,40,14);fs('#e0a36f');
  rr(600,1040,250,128,12);fs('#9aa6b5');circ(725,1104,16);fs('#dfe6ee',5);rr(570,1160,310,16,6);fs('#c9d1dc',6);
  if(e>0)robot(lerp(290,330,E.out(e)),lerp(880,860,e)+Math.sin(t*3)*10,0.85*E.back(e),{mouth:mouthFor('robot'),arm:'wave',look:[1,0]});
 },
 react(lt,ln){rays(540,1000,'#ffd96a','#ffe9a6',18,T*0.3);speedLines(540,1000,'#fff6d1');
  human(540,980,2.1,{mouth:mouthFor('human'),eye:1.45,brow:1,shout:1,sweat:1,look:[-0.6,-0.4]});},
 neck(lt,ln){bgFill('#c8327d');
  ctx.fillStyle='#b02a6c';for(let i=0;i<12;i++){ctx.fillRect(0,330+i*140,W,60);}
  const a=60*E.inOut(prog(lt,0.35,2.4));
  side(330,1000,1.25,a,{xray:1});
  // มาตรวัดองศา
  const px=330+20*1.25,py=1000;
  ctx.beginPath();ctx.arc(px,py,250,-Math.PI/2,-Math.PI/2+a*Math.PI/180);ctx.lineWidth=16;ctx.strokeStyle=C.yellow;ctx.lineCap='round';ctx.stroke();
  line([px,py,px,py-270],5,'#ffffff88');
  txt(Math.round(a)+'°',px-90,py-300,70,C.yellow,{sw:12});
  // ตัวเลขน้ำหนัก
  const kg=kgAt(a);
  txt('คอแบก',800,470,58,'#fff',{sw:12});
  txt(Math.round(kg)+'',780,640,230,C.glow,{sw:16});
  txt('กก.',960,700,64,C.glow,{sw:12});
  // กราฟแท่ง
  const bx=610,by=1330,bw=70;
  for(let i=0;i<5;i++){const[dg,k]=KG[i];const hh=k*11;const on=a>=dg-0.5;
    rr(bx+i*86,by-hh,bw,hh,10);fs(on?C.glow:'#7a1f52',6);
    txt(dg+'°',bx+i*86+bw/2,by+40,40,'#fff',{sw:8});
    if(on)txt(k+'',bx+i*86+bw/2,by-hh-34,44,'#fff',{sw:9});}
  txt('อ้างอิง: Hansraj (2014) Surgical Technology International',540,356,26,'#ffffffcc',{w:600});
 },
 jugs(lt,ln){bgFill('#7fd6b9');speedLines(540,900,'#a6e8d1');
  const l1=prog(lt,0.05,0.35), l2=prog(lt,0.55,0.85);
  const sq=Math.max(Math.exp(-(lt-0.35)*8)*(lt>0.35),Math.exp(-(lt-0.85)*8)*(lt>0.85)*0.8);
  const hy=1050, top=hy-122*1.55*(1-sq*0.12);
  human(540,hy,1.55,{mouth:mouthFor('human'),eye:1.5,brow:1,sweat:1,squash:sq,look:[0,-0.9],shout:1});
  const wob=Math.sin(T*7)*0.06;
  if(l1>0){ctx.save();ctx.translate(540,lerp(-200,top+25,E.out(l1))+sq*10);ctx.rotate(wob);jug(0,0,0.8,1);ctx.restore();}
  if(l2>0){ctx.save();ctx.translate(540,top+25);ctx.rotate(wob);ctx.translate(30,lerp(-1300,-160,E.out(l2)));ctx.rotate(0.22-wob*2);jug(0,0,0.8,0.5);
    txt('ครึ่งถัง',0,-60,40,OL,{sw:0});ctx.restore();}
  txt('ถังเต็ม',540+150,top-70,44,OL,{sw:0});
  burst(860,560,140,C.yellow,'≈ 27 กก.',56,Math.sin(T*6)*0.1);
 },
 fix(lt,ln){bgFill('#bfe9c9');ctx.fillStyle='#a7dcb4';ctx.fillRect(0,0,W,1150);
  const rise=E.inOut(prog(lt,0.3,1.4));
  const a=lerp(50,0,rise);
  // เก้าอี้
  rr(170,1180,230,30,12);fs('#4b5d7a',7);line([285,1210,285,1330],14);line([200,1340,370,1340],12);
  line([170,1190,150,900],14);
  side(330,960,1.2,a);
  // โต๊ะ
  rr(500,1150,560,28,10);fs('#e0a36f');line([540,1178,540,1460],14);line([1010,1178,1010,1460],14);
  laptopSide(860,1150,175*rise);
  const ok=prog(lt,1.45,1.7);
  if(ok>0){ctx.setLineDash([22,16]);line([430,762,lerp(430,880,ok),762],7,'#2fbf71');ctx.setLineDash([]);
    txt('ขอบบนจอ = ระดับสายตา',720,690,50,'#fff',{sw:12});}
  const kg=Math.round(kgAt(a));
  txt('คอแบก '+kg+' กก.',540,560,78,ok>0?'#2fbf71':'#e8434f',{sw:14});
  if(ok>0){circ(880,520,52*E.back(ok));fs('#2fbf71',7);line([856,522,874,540,906,500],12,'#fff');}
 },
 product(lt,ln){rays(540,1160,'#13807f','#1a9796',16,T*0.25);
  const d=ln.dur, k=[0.9,0.9+d*0.27,0.9+d*0.54].map(s=>prog(lt,s,s+0.35));
  const fold=k[1]>0&&k[2]<=0?Math.sin(prog(lt,0.9+d*0.27,0.9+d*0.54)*Math.PI):0;
  ctx.globalAlpha=1;
  standHero(540,1330+Math.sin(T*2)*8,1.6,fold);
  for(let i=0;i<8;i++){const a=i*0.8+T*0.6,r=380+40*Math.sin(T*3+i);const sx=540+Math.cos(a)*r,sy=1150+Math.sin(a)*r*0.5;
    ctx.save();ctx.translate(sx,sy);ctx.rotate(T*2+i);ctx.beginPath();for(let j=0;j<8;j++){const rad=j%2?6:20;ctx.lineTo(Math.cos(j*Math.PI/4)*rad,Math.sin(j*Math.PI/4)*rad);}ctx.closePath();fs('#fff7c2',0);ctx.restore();}
  const t0=prog(lt,0,0.3);
  if(t0>0){ctx.save();ctx.translate(540,470);ctx.scale(E.back(t0),E.back(t0));rr(-380,-70,760,140,30);fs(C.stand);txt('แท่นวางโน้ตบุ๊ก',0,4,82,'#fff',{sw:12});ctx.restore();}
  chip('ปรับระดับได้',540,640,k[0]);chip('พับเก็บได้',540,790,k[1]);
  if(k[2]>0)burst(540,930,lerp(0,150,E.back(k[2])),C.yellow,'หลักร้อย!',60,-0.15+Math.sin(T*5)*0.06);
 },
 cta(lt,ln){bgFill('#4a2bc4');ctx.fillStyle='#5a3ad6';
  for(let i=0;i<9;i++)for(let j=0;j<16;j++){circ(i*130+(j%2)*65,j*130-((T*60)%130),10);ctx.fill();}
  robot(540,590+Math.sin(T*3)*12,0.95,{mouth:mouthFor('robot'),arm:'point',look:[0.3,1],lid:0.35});
  const p=E.back(prog(lt,0.2,0.6));
  ctx.save();ctx.translate(540,1080);ctx.scale(p,p);ctx.rotate(Math.sin(T*8)*0.05);basket(0,0,1.1);ctx.restore();
  txt('กดตะกร้าด้านล่าง',540,1250,92,C.yellow,{sw:16});
  const by=1345+Math.abs(Math.sin(T*6))*22;
  ctx.beginPath();ctx.moveTo(500,by-60);ctx.lineTo(580,by-60);ctx.lineTo(580,by);ctx.lineTo(620,by);ctx.lineTo(540,by+60);ctx.lineTo(460,by);ctx.lineTo(500,by);ctx.closePath();
  fs(C.yellow,8);
 },
 joke(lt,ln){bgFill('#d8c9a8');ctx.fillStyle='#ccbb96';ctx.fillRect(0,1180,W,800);line([-20,1180,W+20,1180],8);
  rr(80,420,300,120,20);fs('#bfae8a',7);txt('ปี 2099',230,484,70,OL);
  for(let i=0;i<5;i++){const bob=Math.sin(T*2+i)*4;side(120+i*190,1180+bob,0.48,88,{phone:1});}
  const z=1+prog(lt,0,ln.dur)*0.06;
  robot(760,760,1.0*z,{mouth:mouthFor('robot'),lid:0.62,look:[-0.8,0.2]});
 },
};

function banner(){
  rr(40,96,1000,220,40);fs('#24142eee',0);
  rr(60,70,560,64,32);fs(C.glow,6);txt(TL.series,340,104,38,OL,{maxW:520});
  ctx.font='800 84px K';
  const s=TL.title, rs=runs(s,['27 กิโล']);let tw=rs.reduce((a,r)=>a+ctx.measureText(r[0]).width,0);
  const sc=Math.min(1,940/tw);ctx.save();ctx.translate(540,222);ctx.scale(sc,sc);let x=-tw/2;
  for(const[t,h]of rs){ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillStyle=h?C.yellow:'#fff';ctx.fillText(t,x,0);x+=ctx.measureText(t).width;}
  ctx.restore();}

function endCard(k){ctx.fillStyle='#120a1c';ctx.fillRect(0,0,W,H);
  portal(540,820,180*E.back(k),T*5);
  txt('ZORP จากปี 2099',540,1130,96,C.glow,{sw:0});
  txt('แท่นวางโน้ตบุ๊ก อยู่ในตะกร้าด้านล่าง',540,1250,58,'#fff',{w:600,maxW:960});
  txt('กดติดตามไว้ ไม่พลาดตอนใหม่',540,1340,50,C.yellow,{w:600});}

function camera(name,lt){ // ซูมกระแทกตอนตัดเข้าฉาก
  let s=1+0.09*(1-E.out(prog(lt,0,0.28)));
  if(name==='react')s=1+0.05*prog(lt,0,1.5);
  if(name==='portal')s=1;
  ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);}


window.EP={font:'K',scenes:SCENES,camera,endCard,
  overlay(){banner();},
  outro(k){ctx.fillStyle='#120a1c';ctx.beginPath();ctx.rect(0,0,W,H);ctx.arc(760,760,lerp(1500,0,E.inOut(k)),0,Math.PI*2,true);ctx.fill('evenodd');}};
