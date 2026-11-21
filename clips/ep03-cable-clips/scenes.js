// EP.3 สารคดี: ใต้โต๊ะคอม — แนวสารคดีสัตว์ป่า (คลิปจัดสายไฟ)
OL = '#17170f'; LW = 8;
const P = {deep:'#10261c',jungle:'#1e3d2f',moss:'#2f5d3a',leaf:'#7fb069',sand:'#e6c79c',wood:'#6b4a2f',woodD:'#4a321f',
  cream:'#f6f0e1',gold:'#ffe08a',red:'#e4572e',dust:'#b9b2a6'};
const SNK = ['#2b2b2b','#f2f2f2','#e4572e','#3d7dd8','#8a8f98'];

// ---------- งูสายไฟ ----------
function wave(x0,y0,x1,y1,amp,freq,ph,n=24){const pts=[],dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;
  for(let i=0;i<=n;i++){const u=i/n,o=Math.sin(u*freq*Math.PI*2+ph)*amp;pts.push(x0+dx*u+nx*o,y0+dy*u+ny*o);}return pts;}
function plug(x,y,ang,col,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(ang);
  line([62,-13,92,-13],10,OL);line([62,13,92,13],10,OL);line([62,-13,90,-13],5,'#d9d9d9');line([62,13,90,13],5,'#d9d9d9');
  rr(-6,-30,72,60,14);fs(col);rr(4,-30,52,10,5);fs('#ffffff33',0);
  ctx.rotate(-ang);
  const lk=o.look||[0,0.3];
  for(const ex of[-14,14]){const px=ex+Math.cos(ang)*14,py=-34+Math.sin(ang)*14;
    if(o.happy){ctx.beginPath();ctx.arc(px,py,11,Math.PI*1.1,Math.PI*1.9);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}
    circ(px,py,14);fs('#fff',5);circ(px+lk[0]*5,py+lk[1]*5,5);ctx.fillStyle=OL;ctx.fill();
    if(o.angry)line([px-14,py-18,px+12,py-10],5);}
  ctx.restore();}
function snake(pts,col,o={}){
  curve(pts,36,OL);curve(pts,25,col);curve(pts.map((v,i)=>i%2?v-5:v),6,'#ffffff40');
  const n=pts.length,ang=Math.atan2(pts[n-1]-pts[n-3],pts[n-2]-pts[n-4]);
  plug(pts[n-2],pts[n-1],ang,col===SNK[1]?'#e8e8e8':col,o);}

function dustBunny(x,y,r,seed){ctx.save();ctx.translate(x+boil(seed,2),y);
  ctx.beginPath();for(let i=0;i<22;i++){const a=i/22*Math.PI*2,rad=r*(0.75+0.35*hash(seed+i));ctx.lineTo(Math.cos(a)*rad,Math.sin(a)*rad*0.75);}
  ctx.closePath();fs(P.dust,5);circ(-r*0.25,-r*0.1,4);ctx.fillStyle=OL;ctx.fill();circ(r*0.2,-r*0.1,4);ctx.fill();ctx.restore();}

function underDesk(light=0.3){
  const g=ctx.createLinearGradient(0,300,0,1500);g.addColorStop(0,P.deep);g.addColorStop(1,P.jungle);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ctx.save();ctx.globalAlpha=light;ctx.fillStyle='#fff4c2';poly([-100,300,120,300,700,1500,300,1500]);ctx.fill();ctx.restore();
  rr(-60,300,1200,90,10);fs(P.woodD);rr(-60,300,1200,30,6);fs(P.wood,0);
  rr(90,380,90,1000,8);fs(P.wood);rr(900,380,90,1000,8);fs(P.wood);
  ctx.fillStyle=P.moss;ctx.fillRect(-300,1300,W+600,800);
  for(let i=0;i<40;i++){const x=hash(i*4.1)*W,y=1300+hash(i*2.7)*160;line([x,y,x-8,y-26],5,P.leaf);line([x,y,x+8,y-22],5,P.leaf);}
  for(let i=0;i<26;i++){const x=(hash(i*1.9)*W+T*20*(hash(i)-.5))%W,y=600+hash(i*7.3)*700+Math.sin(T+i)*20;circ(x,y,3);ctx.fillStyle='#fff8cc99';ctx.fill();}}

// ---------- HUD กล้องสารคดี ----------
function hud(){const c='#ffffffd0';
  for(const[x,y,sx,sy]of[[50,320,1,1],[1030,320,-1,1],[50,1460,1,-1],[1030,1460,-1,-1]])line([x,y+60*sy,x,y,x+60*sx,y],6,c);
  if(Math.floor(T*1.6)%2===0){circ(96,370,13);ctx.fillStyle='#ff3b30';ctx.fill();}
  txt('REC',122,372,34,'#fff',{f:'Bai',align:'left'});
  const f=Math.floor(T*24)%24,s=Math.floor(T)%60;txt(`00:13:${String(s).padStart(2,'0')}:${String(f).padStart(2,'0')}`,1000,372,32,'#fff',{f:'Bai',align:'right'});
  rr(930,1400,70,32,6);fs(null,4,'#fff');rr(936,1406,44,20,3);fs('#7dff9a',0);}
function header(){
  ctx.save();ctx.fillStyle='#0b1a12cc';rr(0,110,780,150,0);ctx.fill();ctx.fillStyle=P.gold;ctx.fillRect(0,110,14,150);ctx.restore();
  txt('สารคดีโต๊ะคอม',50,170,74,P.gold,{f:'Charm',align:'left'});
  txt('ตอน: งูสายไฟ — นักล่าใต้โต๊ะ',52,234,38,'#fff',{f:'Itim',align:'left'});}
function specCard(lines,x,y,k){if(k<=0)return;ctx.save();ctx.globalAlpha=k;ctx.translate(x,y+(1-E.out(k))*30);
  rr(0,0,560,40+lines.length*58,10);fs('#0b1a12dd',3,P.gold);
  lines.forEach((l,i)=>txt(l,28,44+i*58,i?40:44,i?'#fff':P.gold,{f:i?'Itim':'Charm',align:'left',maxW:510}));ctx.restore();}

const SCENES={
 jungle(lt,ln){const t=lt+TL.lines[0].start;
  ctx.save();ctx.translate(-60*prog(t,0,6),0);
  underDesk(0.22);
  dustBunny(300,1290,55,3);dustBunny(760,1310,40,9);dustBunny(1060,1280,60,4);
  // ดวงตาในความมืด
  const eyes=[[420,1080,0.4],[700,940,1.3],[860,1150,2.1],[260,880,2.8],[600,1200,3.3]];
  for(const[x,y,st]of eyes){const k=prog(t,st,st+0.3);if(k<=0)continue;const b=blink(x)?0.1:1;
    for(const dx of[-26,26]){ctx.save();ctx.shadowColor='#e9ff8a';ctx.shadowBlur=30;ell(x+dx,y,20,20*b*k);ctx.fillStyle='#e9ff8a';ctx.fill();ctx.restore();ell(x+dx,y,6,14*b*k);ctx.fillStyle='#000';ctx.fill();}}
  ctx.restore();
  ctx.save();ctx.globalAlpha=0.12;ctx.fillStyle='#000';ctx.fillRect(-300,-300,W+600,H+600);ctx.restore();
 },
 nest(lt,ln){underDesk(0.45);
  const cx=540,cy=1060;
  for(let k=0;k<5;k++){const pts=[];const a=1+k%3,b=2+(k+1)%3,ph=k*1.3+T*0.6;
    for(let i=0;i<=60;i++){const u=i/60*Math.PI*2;pts.push(cx+Math.sin(a*u+ph)*230+Math.sin(T*2+k)*6,cy+Math.sin(b*u)*150);}
    curve(pts,34,OL);curve(pts,24,SNK[k]);}
  const heads=[[cx-320,cy-160,-2.4,0],[cx+330,cy-140,-0.6,1],[cx-200,cy+210,2.2,2],[cx+250,cy+200,0.9,3],[cx,cy-260,-1.57,4]];
  heads.forEach(([hx,hy,ang,k],i)=>{const w=Math.sin(T*6+i)*0.25;const L=110;
    const bx=hx-Math.cos(ang)*L,by=hy-Math.sin(ang)*L;snake(wave(cx+(bx-cx)*0.5,cy+(by-cy)*0.5,hx,hy,14,1,T*5+i,10),SNK[k],{look:[-Math.cos(ang)*0.3,0.5]});});
  dustBunny(200,1330,45,2);dustBunny(880,1320,50,6);
  specCard(['Cablus tanglus','สถานะ: พบได้ทุกบ้าน','นิสัย: ชอบพันกันเป็นก้อน'],60,420,prog(lt,0.6,1.0));
 },
 dust(lt,ln){bgFill('#2a2418');
  const shake=lt>ln.dur*0.65?hash(Math.floor(T*40))*4:0;ctx.save();ctx.translate(shake,0);
  ctx.fillStyle='#3e5e3a';ctx.fillRect(-300,1180,W+600,800);
  rr(110,980,860,220,40);fs('#f3f1ea');rr(110,980,860,40,20);fs('#ffffff',0);
  for(let i=0;i<4;i++){const x=230+i*200;rr(x-55,1040,110,110,20);fs('#d9d6cc',5);rr(x-30,1070,14,40,4);fs(OL,0);rr(x+16,1070,14,40,4);fs(OL,0);}
  rr(860,1030,70,50,10);fs('#e4572e',5);
  for(let i=0;i<3;i++){const x=230+i*200;rr(x-48,990,96,90,16);fs(SNK[i%3+1===1?0:i]);line([x,990,x+(i-1)*80,820,x+(i-1)*120,600],30,OL);line([x,990,x+(i-1)*80,820,x+(i-1)*120,600],20,SNK[i===1?1:i]);}
  const pile=prog(lt,0,ln.dur*0.6);
  for(let i=0;i<9;i++){if(i/9>pile)break;dustBunny(150+hash(i*3)*780,1000+hash(i*5)*180,26+hash(i)*30,i*3);}
  // ประกายไฟ
  if(lt>ln.dur*0.62&&hash(Math.floor(T*20))>0.35){const sx=430+hash(Math.floor(T*20))*60,sy=1060;
    star(sx,sy,46,12,6,T*9,'#fff27a',0);star(sx,sy,26,8,6,-T*7,'#ffffff',0);}
  ctx.restore();
  const wk=prog(lt,ln.dur*0.55,ln.dur*0.55+0.3);
  if(wk>0){ctx.save();ctx.translate(540,620);const s=E.back(wk)*(1+0.05*Math.sin(T*10));ctx.scale(s,s);
    poly([0,-150,170,140,-170,140]);fs('#ffcc00',10);txt('!',0,40,200,OL,{f:'Mitr'});ctx.restore();
    txt('ฝุ่นสะสมรอบปลั๊ก = เสี่ยงไฟลุก',540,860,52,'#fff',{f:'Itim',sw:10,maxW:960});}
  vignette(0.5,'120,20,0');
 },
 trap(lt,ln){underDesk(0.5);
  const loop=wave(200,1300,900,1300,40,2,T*3,30);snake(loop,SNK[2],{angry:lt<1.2,happy:lt>1.4,look:[1,0]});
  const slow=prog(lt,0.4,1.05);
  const fx=lerp(1250,700,prog(lt,0,0.45))-slow*60;
  ctx.save();ctx.translate(fx,1290);ctx.rotate(-slow*1.2);
  rr(-40,-700,90,690,30);fs('#3d4a6b');rr(-70,-40,150,50,20);fs('#ffffff');ell(-60,-15,30,25);fs('#ffffff');
  ctx.restore();
  if(slow>0.2){const k=prog(lt,0.55,1.1);const mx=lerp(760,320,k),my=lerp(800,1180,k*k)-Math.sin(k*Math.PI)*260;
    ctx.save();ctx.translate(mx,my);ctx.rotate(k*5);rr(-45,-50,90,100,12);fs('#fff');ctx.beginPath();ctx.arc(52,0,28,-1.2,1.2);ctx.lineWidth=12;ctx.strokeStyle=OL;ctx.stroke();
    ell(0,-50,45,12);fs('#6b3e26',5);ctx.restore();
    for(let i=0;i<8;i++){const kk=clamp(k-i*0.04);circ(lerp(760,330,kk)+i*14,lerp(800,1180,kk*kk)-Math.sin(kk*Math.PI)*260-20,10-i);ctx.fillStyle='#6b3e26';ctx.fill();}}
  if(lt>0.4&&lt<1.1){rr(640,430,380,80,8);fs('#000000aa',0);txt('▶ สโลว์โมชัน',830,472,44,'#fff',{f:'Itim'});}
  if(lt>1.05){const k=prog(lt,1.05,1.25);star(340,1200,140*E.back(k),70*E.back(k),10,0,'#fff27a',6);txt('โครม!',340,1205,64,OL,{f:'Mitr'});}
 },
 tool(lt,ln){const g=ctx.createRadialGradient(540,1000,50,540,1000,900);g.addColorStop(0,'#fffaf0');g.addColorStop(1,'#d8cfb8');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ell(540,1270,380,40);ctx.fillStyle='#00000022';ctx.fill();
  const k=E.back(prog(lt,0.1,0.6));ctx.save();ctx.translate(540,1050);ctx.scale(k,k);
  // คลิปแปะ 6 ตัว
  for(let i=0;i<6;i++){const x=-270+(i%3)*270,y=-150+Math.floor(i/3)*230+Math.sin(T*2+i)*6;
    const c=i%2?'#ffffff':'#3a3a3a';rr(x-75,y-55,150,120,30);fs(c);
    ctx.beginPath();ctx.arc(x,y-5,36,-Math.PI*0.32,Math.PI*1.32);ctx.lineWidth=16;ctx.strokeStyle=i%2?'#cfcfcf':'#222';ctx.stroke();
    circ(x,y-5,22);fs(i%2?'#e9e9e9':'#2b2b2b',5);rr(x-14,y-60,28,22,4);fs(c,0);
    rr(x-70,y+24,140,16,6);fs('#e8d79a',3);}
  // สายรัดตีนตุ๊กแก
  for(let i=0;i<3;i++){rr(-330+i*240,250,200,44,22);fs(['#3d7dd8','#e4572e','#7fb069'][i]);for(let j=0;j<8;j++)line([-320+i*240+j*24,258,-312+i*240+j*24,286],3,'#ffffff55');}
  ctx.restore();
  if(lt>0.9)for(let i=0;i<7;i++){const a=i*0.9+T;star(540+Math.cos(a)*420,1050+Math.sin(a)*330,26,8,4,T*3+i,'#ffd84a',3);}
  txt('อุปกรณ์จับงู',540,560,104,'#2f5d3a',{f:'Charm'});
  txt('คลิปจัดสาย + สายรัดตีนตุ๊กแก',540,670,50,'#4a321f',{f:'Itim'});
 },
 tamed(lt,ln){bgFill('#2f5d3a');
  rr(-60,330,1200,240,10);fs(P.wood);for(let i=0;i<6;i++)line([-60,360+i*36,1140,370+i*36],3,'#7d5a3a');
  const cl=[0.4,0.65,0.9,1.15],xs=[180,420,660,900];
  for(let r=0;r<3;r++){const y=470+r*40-40;const pts=[];for(let i=0;i<=24;i++){const x=-80+i*52;
      let dy=0;for(let c=0;c<4;c++){const done=prog(lt,cl[c],cl[c]+0.15);if(x>xs[c]-120)dy=lerp(Math.sin(i*1.3+r+T*3)*120*(1-done)+r*20,0,done)*(1-0);}
      const settled=xs.filter((cx,c)=>lt>cl[c]+0.15).length/4;pts.push(x,y+lerp(160+Math.sin(i*0.9+r*2+T*4)*130,0,settled));}
    curve(pts,34,OL);curve(pts,24,SNK[r+1]);}
  xs.forEach((x,c)=>{const sh=prog(lt,cl[c],cl[c]+0.12);rr(x-60,420,120,130,22);fs(sh>0?'#f2f2f2':'#c8c8c8');
    if(sh>0)star(x,560,40*E.back(sh),14,6,0,'#fff27a');});
  plug(1060,470,0,SNK[1],{happy:lt>1.3});plug(1060,510,0,SNK[2],{happy:lt>1.3});plug(1060,550,0,SNK[3],{happy:lt>1.3});
  // พื้นสะอาด + ไม้กวาด
  ctx.fillStyle='#4e7a45';ctx.fillRect(-300,1250,W+600,800);
  const sw=Math.sin(T*6)*0.3;ctx.save();ctx.translate(540,1120);ctx.rotate(sw);line([0,-300,0,80],18,'#c79a5b');poly([-80,80,80,80,110,200,-110,200]);fs('#e8c66a');ctx.restore();
  txt('ใต้โต๊ะโล่ง กวาดง่าย',540,850,64,'#fff',{f:'Itim',sw:10});
 },
 compare(lt,ln){const wipe=E.inOut(prog(lt,0.2,1.0));
  ctx.save();ctx.beginPath();ctx.rect(0,0,W,960);ctx.clip();bgFill('#3a2f22');
  for(let k=0;k<4;k++){const pts=[];for(let i=0;i<=40;i++){const u=i/40*Math.PI*2;pts.push(540+Math.sin((k+1)*u+T)*260,700+Math.sin((k+2)*u)*160);}curve(pts,30,OL);curve(pts,20,SNK[k]);}
  dustBunny(250,850,40,1);dustBunny(820,860,46,2);
  rr(40,430,200,80,10);fs('#e4572e',5);txt('ก่อน',140,472,52,'#fff',{f:'Mitr'});ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(0,960,W,960);ctx.clip();bgFill('#cfe8c4');
  rr(-60,1000,1200,80,10);fs(P.wood);
  for(let r=0;r<3;r++)line([-60,1110+r*34,1140,1110+r*34],22,SNK[r+1]);
  for(const x of[200,540,880]){rr(x-50,1080,100,120,18);fs('#f2f2f2');}
  rr(40,1260,200,80,10);fs('#2f9e5b',5);txt('หลัง',140,1302,52,'#fff',{f:'Mitr'});ctx.restore();
  line([0,960,W,960],10,'#fff');
  const tk=prog(lt,ln.dur*0.15,ln.dur*0.15+0.35);
  if(tk>0){ctx.save();ctx.translate(800,960);ctx.rotate(Math.sin(T*3)*0.12);ctx.scale(E.back(tk),E.back(tk));line([0,-170,0,-90],5,'#fff');
    poly([-130,-90,130,-90,130,60,-130,60]);fs(P.gold);circ(0,-60,12);fs('#fff',4);txt('หลักสิบ',0,0,70,OL,{f:'Mitr'});ctx.restore();}
 },
 cta(lt,ln){underDesk(0.6);
  const lock=E.inOut(prog(lt,0.1,0.7));const r=lerp(380,170,lock);
  const bx=540+Math.sin(T*2)*lerp(60,0,lock),by=1000;
  const b=E.back(prog(lt,0,0.4));ctx.save();ctx.translate(bx,by);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');
  poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  const col=lock>0.95?'#ff3b30':'#ffffff';ctx.save();ctx.translate(bx,by);ctx.rotate((1-lock)*1.5);
  circ(0,0,r);ctx.lineWidth=7;ctx.strokeStyle=col;ctx.stroke();
  for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);line([r-40,0,r+40,0],8,col);}ctx.restore();
  if(lock>0.95){rr(290,700,500,80,8);fs('#ff3b30',0);txt('ล็อกเป้าหมายแล้ว',540,742,50,'#fff',{f:'Itim'});}
  txt('กดตะกร้าด้านล่าง',540,1290,84,P.gold,{f:'Mitr',sw:12});
  const ay=1380+Math.abs(Math.sin(T*6))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+55,460,ay,500,ay]);fs(P.gold,7);
 },
};

function camera(name,lt,ln){const d=ln?ln.dur:3;
  if(name==='nest'){const s=1.15-0.15*E.out(prog(lt,0,1.2));ctx.translate(540,1060);ctx.scale(s,s);ctx.translate(-540,-1060);return;}
  if(name==='trap'&&lt>0.4&&lt<1.05){const s=1.08;ctx.translate(700,1100);ctx.scale(s,s);ctx.translate(-700,-1100);return;}
  const s=1+0.04*prog(lt,0,d);ctx.translate(540+Math.sin(T*0.7)*6,960+Math.sin(T*0.9)*5);ctx.scale(s,s);ctx.translate(-540,-960);}

window.EP={font:'Itim',scenes:SCENES,camera,
  sub:{f:'Itim',size:64,col:'#ffffff',hl:'#ffe08a',sw:0,shadow:4,pop:'fade',y:1590,lh:1.3},
  intro(t){SCENES.jungle(t-TL.lines[0].start,TL.lines[0]);},
  overlay(t,ln){const g=ctx.createLinearGradient(0,1420,0,1800);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.65)');ctx.fillStyle=g;ctx.fillRect(0,1420,W,500);
    hud();header();},
  post(){grain(0.035);},
  outroGap:0.6,
  outro(k){ctx.fillStyle=`rgba(0,0,0,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill('#0b1a12');ctx.save();ctx.globalAlpha=k;
    txt('สารคดีโต๊ะคอม',540,820,120,P.gold,{f:'Charm'});
    txt('คลิปจัดสายไฟ อยู่ในตะกร้าด้านล่าง',540,980,58,'#fff',{f:'Itim'});
    txt('กดติดตาม ไม่พลาดสัตว์ตัวใหม่',540,1080,48,'#9fc7a4',{f:'Itim'});
    plug(470,1300,-0.3,SNK[2],{happy:1});plug(610,1300,-2.84,SNK[3],{happy:1});ctx.restore();}
};
