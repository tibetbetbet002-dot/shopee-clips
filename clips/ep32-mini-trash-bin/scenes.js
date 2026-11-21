// EP.32 ยักษ์วัดแจ้งปะทะขยะ — แนวตำนานยักษ์ไทย (ถังขยะจิ๋วตั้งโต๊ะ)
OL = '#1e1208'; LW = 7;
const P = {dusk1:'#ff8c5a',dusk2:'#5b2a6e',temple:'#e8d7b0',tile:'#d4a23a',giant:'#3fae6a',giant2:'#2d8a52',gold:'#f2c14e',red:'#c0392b',skin:'#f6cfae',desk:'#b07a4f',bin:'#7fd1c3'};

function templeBg(){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,P.dusk2);g.addColorStop(1,P.dusk1);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ctx.save();ctx.translate(540,1150);poly([-260,0,260,0,140,-300,60,-560,0,-760,-60,-560,-140,-300]);fs('#4a2a3a',0);for(let i=0;i<5;i++){rr(-220+i*30,-100-i*120,440-i*60,24,6);fs('#6a3a4a',0);}ctx.restore();
  ctx.fillStyle='#3a1f2a';ctx.fillRect(-300,1150,W+600,800);}
function giant(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.4),y+boil(2,1.4));ctx.scale(s,s);
  poly([-200,160,200,160,240,640,-240,640]);fs(P.red);for(let i=0;i<10;i++){circ(-180+i*40,200+Math.abs(Math.sin(i))*40,10);fs(P.gold,3);}rr(-220,160,440,60,20);fs(P.gold,5);
  ell(0,0,170,180);fs(P.giant);
  poly([-160,-120,160,-120,120,-200,0,-420,-120,-200]);fs(P.gold,6);for(let i=0;i<4;i++)rr(-120+i*16,-160-i*60,240-i*32,24,6),fs('#ffe08a',3);
  for(const ex of[-60,60]){ell(ex,-20,42,36);fs('#fff',6);circ(ex,-18,o.angry?14:18);ctx.fillStyle='#c0392b';ctx.fill();line([ex-50,-74,ex+40,o.angry?-54:-70],12);}
  ctx.beginPath();ctx.moveTo(-90,70);ctx.quadraticCurveTo(0,120+m*40,90,70);ctx.closePath();fs('#7a1a2a',6);
  for(const tx of[-70,70]){poly([tx-14,72,tx+14,72,tx,o.angry?150:130]);fs('#fff',5);}ctx.restore();}
function kid(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);rr(-90,90,180,200,60);fs('#ff9fb0');rr(-18,70,36,30,8);fs(P.skin);
  ell(0,0,80,78);fs(P.skin);ctx.beginPath();ctx.arc(0,-14,82,Math.PI*0.95,Math.PI*2.05);ctx.closePath();fs('#2a1a10');circ(-70,-40,26);fs('#2a1a10');circ(70,-40,26);fs('#2a1a10');
  for(const ex of[-28,28]){ell(ex,6,10,o.sad?6:12);fs('#fff',4);circ(ex,8,5);ctx.fillStyle=OL;ctx.fill();}ell(0,44,10+m*6,3+m*10);fs('#b0303e',4);ctx.restore();}
function messyDesk(y){rr(80,y,920,40,10);fs(P.desk);ctx.fillStyle='#8a5a3a';ctx.fillRect(80,y+40,920,400);
  for(let i=0;i<8;i++){ctx.save();ctx.translate(140+i*110,y-14-hash(i)*20);ctx.rotate((hash(i*3)-0.5)*0.8);rr(-40,-20,80,40,6);fs(['#ff6b6b','#ffd166','#7bd3ea','#fff'][i%4],4);ctx.restore();}}
function ants(n,y,k){for(let i=0;i<n;i++){const x=((i*60+T*80)%1300)-100;if(i/n>k)continue;ctx.save();ctx.translate(x,y+Math.sin(i)*20);for(let j=0;j<3;j++){circ(j*14,0,7);ctx.fillStyle='#1a0e06';ctx.fill();}for(let l=0;l<3;l++){line([8+l*8,0,4+l*8,12],3,'#1a0e06');line([8+l*8,0,4+l*8,-12],3,'#1a0e06');}ctx.restore();}}
function bin(x,y,s,lidOpen){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([-110,-150,110,-150,90,120,-90,120]);fs(P.bin);for(let i=-2;i<=2;i++)line([i*36,-120,i*30,100],5,'#5ab3a5');
  ctx.save();ctx.translate(-120,-150);ctx.rotate(-lidOpen*1.2);rr(0,-24,240,30,12);fs('#5ab3a5');rr(100,-40,40,18,8);fs('#5ab3a5',4);ctx.restore();ctx.restore();}
function scroll(t,x,y,k){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(E.back(k),E.back(k));rr(-300,-56,600,112,10);fs('#f3e2c0',6);rr(-320,-66,24,132,8);fs(P.gold,4);rr(296,-66,24,132,8);fs(P.gold,4);
  txt(t,0,6,48,OL,{f:'Charm',maxW:560});ctx.restore();}

const SCENES={
 awake(lt){templeBg();const k=E.out(prog(lt,0,0.6));giant(540,lerp(1300,780,k),1.0,{mouth:mouthFor('giant'),angry:1});},
 sorry(lt){templeBg();messyDesk(1200);kid(540,1030,0.9,{mouth:mouthFor('kid'),sad:1});},
 ants(lt,ln){templeBg();messyDesk(1200);ants(18,1180,prog(lt,0,ln.dur));giant(860,640,0.5,{mouth:mouthFor('giant'),angry:1});scroll('เศษอาหาร → มด + แมลง',540,560,prog(lt,0.3,0.6));},
 why(lt,ln){bgFill('#f3e2c0');ctx.save();ctx.translate(540,1000);rr(-60,-30,120,60,10);fs('#ffd166',5);txt('ขนม',0,6,34,OL,{f:'Charm'});ctx.restore();
  for(let r=1;r<5;r++){ctx.save();ctx.globalAlpha=0.5-r*0.08+0.2*Math.sin(T*3-r);ctx.strokeStyle='#ff9f43';ctx.lineWidth=6;circ(540,1000,r*110+((T*60)%110));ctx.stroke();ctx.restore();}
  ants(14,1000,1);scroll('มดตามกลิ่นน้ำตาลได้ไกลมาก',540,620,prog(lt,0.3,0.6));},
 bin(lt){templeBg();const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,1050);ctx.scale(k,k);bin(0,0,1.4,0);ctx.restore();kid(240,1100,0.6,{mouth:mouthFor('kid')});scroll('ถังขยะจิ๋วตั้งโต๊ะ',540,560,prog(lt,0.1,0.4));},
 lid(lt){bgFill('#f3e2c0');rr(80,1150,920,40,10);fs(P.desk);const o=(Math.sin(lt*3)+1)/2;bin(700,1050,1.0,o);
  const k=prog(lt,0.4,1.0);ctx.save();ctx.translate(lerp(300,690,k),lerp(900,950,k)-Math.sin(k*Math.PI)*200);rr(-30,-20,60,40,6);fs('#ff6b6b',4);ctx.restore();scroll('มีฝาปิด · ไม่ต้องลุก',540,560,prog(lt,0.2,0.5));},
 tip(lt,ln){bgFill('#f3e2c0');bin(540,1000,1.2,1);ctx.save();ctx.translate(540,800);ctx.globalAlpha=0.8;poly([-140,0,140,0,120,260,-120,260]);fs('#ffffffcc',4);ctx.restore();
  scroll('ใส่ถุงทุกครั้ง',540,560,prog(lt,0.2,0.5));scroll('เททิ้งทุกวัน ไม่ค้างคืน',540,1300,prog(lt,ln.dur*0.5,ln.dur*0.7));},
 bonus(lt){bgFill('#f3e2c0');rr(80,1050,920,40,10);fs(P.desk);const k=prog(lt,0.3,1.4);ctx.save();ctx.translate(lerp(200,880,k),1000);rr(-80,-40,160,80,20);fs('#bfe9ff',5);ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(lerp(200,880,k),900,1000,200);ctx.clip();for(let i=0;i<6;i++){circ(300+i*100,1030,10);ctx.fillStyle='#c48a3a';ctx.fill();}ctx.restore();scroll('กินขนมเสร็จ เช็ดโต๊ะ',540,600,prog(lt,0.2,0.5));},
 clean(lt,ln){templeBg();rr(80,1200,920,40,10);fs(P.desk);bin(860,1160,0.6,0);kid(400,1030,0.8,{mouth:mouthFor('kid')});giant(860,600,0.45,{});scroll('ราคาไม่แพง',540,540,prog(lt,ln.dur*0.4,ln.dur*0.6));},
 cta(lt){templeBg();giant(540,760,0.6,{mouth:mouthFor('giant')});const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,1180);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();},
};

window.EP={font:'Charm',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.05*prog(lt,0,ln.dur);if(name==='awake'&&lt<0.8)ctx.translate(Math.sin(T*40)*8,0);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Charm',size:64,col:'#ffffff',hl:'#f2c14e',stroke:'#1e1208',sw:14,pop:'fade',y:1590,lh:1.3},
  intro(t){templeBg();const k=prog(t,0.2,1.2);ctx.save();ctx.globalAlpha=k;txt('ตำนาน',540,820,110,P.gold,{f:'Sri2',sw:10,stroke:OL});txt('ยักษ์เฝ้าโต๊ะ',540,960,100,'#fff',{f:'Sri2',sw:10,stroke:OL});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,20);fs('#1e1208e6',6,P.gold);txt(TL.title,0,-6,70,P.gold,{f:'Sri2',maxW:840});txt(TL.series,0,58,34,'#f3e2c0',{f:'Charm'});ctx.restore();},
  outroGap:0.6,
  outro(k){ctx.fillStyle=`rgba(30,18,8,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){templeBg();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,20);fs('#1e1208ee',8,P.gold);txt('โต๊ะสะอาดแล้ว',540,770,90,P.gold,{f:'Sri2'});txt('ถังขยะจิ๋วตั้งโต๊ะ',540,910,70,'#fff',{f:'Charm'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.gold,{f:'Charm'});ctx.restore();},
};
