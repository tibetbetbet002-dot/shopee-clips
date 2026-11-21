// EP.28 โอลิมปิกยกแขน — แนวถ่ายทอดกีฬา สนามกีฬา โพเดียม (ที่รองแขนติดโต๊ะ)
OL = '#101828'; LW = 7;
const P = {sky:'#4aa8ff',sky2:'#9fd4ff',track:'#d9583b',lane:'#ffffff',gold:'#ffcc33',silver:'#c9d3dc',bronze:'#cd7f32',jersey:'#1f6feb',skin:'#f0c39c',desk:'#c98b5a',grass:'#3fae5a'};

function stadium(){const g=ctx.createLinearGradient(0,0,0,900);g.addColorStop(0,P.sky);g.addColorStop(1,P.sky2);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ctx.fillStyle='#2b3a55';ctx.fillRect(-300,620,W+600,320);for(let i=0;i<120;i++){circ((i%24)*46+((i/24|0)%2)*23,650+(i/24|0)*56+(Math.sin(T*8+i)>0.7?-8:0),16);ctx.fillStyle=['#ffcc33','#ff5a5a','#5ad1ff','#fff'][i%4];ctx.fill();}
  ctx.fillStyle=P.grass;ctx.fillRect(-300,940,W+600,120);ctx.fillStyle=P.track;ctx.fillRect(-300,1060,W+600,900);for(let i=0;i<6;i++)line([-50,1100+i*70,W+50,1100+i*70],5,P.lane);
  for(const x of[100,980]){line([x,330,x,620],10,'#555');rr(x-60,300,120,40,6);fs('#fff8c4',4);}}
function athlete(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(o.seed||1,1.3),y+boil((o.seed||1)+1,1.3));ctx.scale(s,s);
  poly([-130,130,130,130,150,400,-150,400]);fs(P.jersey);txt('28',0,260,80,'#fff',{f:'Mitr'});
  const up=o.armsUp?1:0;for(const sd of[-1,1]){const pts=up?[sd*130,170,sd*220,60,sd*230,-60]:[sd*130,170,sd*210,250,sd*180,360];line(pts,30,OL);line(pts,20,P.skin);circ(pts[4],pts[5],22);fs(P.skin,5);}
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,86,98);fs(P.skin);ctx.beginPath();ctx.moveTo(-90,0);ctx.quadraticCurveTo(-80,-120,10,-110);ctx.quadraticCurveTo(110,-100,90,0);ctx.quadraticCurveTo(80,-60,0,-62);ctx.quadraticCurveTo(-60,-60,-90,0);fs('#2a1a10');
  rr(-92,-50,184,24,8);fs(P.gold,4);
  for(const ex of[-30,30]){if(o.happy){ctx.beginPath();ctx.arc(ex,4,13,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}ell(ex,2,12,o.strain?8:14);fs('#fff',4);circ(ex,4,5);ctx.fillStyle=OL;ctx.fill();}
  if(o.strain){for(const sx of[-80,80]){const ph=(T*1.4+sx)%1;circ(sx,-40+ph*60,7);ctx.fillStyle='#8fd8ff';ctx.fill();}}
  ell(0,50,12+m*6+(o.strain?6:0),3+m*14);fs('#9a3040',4);
  if(o.medal){line([-40,120,0,190,40,120],6,P.red);circ(0,210,34);fs(P.gold,5);}ctx.restore();}
function seated(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-40,-20,560,30,8);fs(P.desk,5);
  rr(-240,-340,140,300,40);fs(P.jersey);circ(-170,-410,70);fs(P.skin,5);ctx.beginPath();ctx.arc(-170,-430,72,Math.PI,0);ctx.closePath();fs('#2a1a10');
  const ay=o.rest?-30:-90-Math.sin(T*6)*6;line([-120,-300,-30,ay+40,200,ay],30,OL);line([-120,-300,-30,ay+40,200,ay],20,P.skin);
  if(o.rest){rr(-80,-30,180,24,10);fs('#333',4);rr(-80,-44,180,18,8);fs('#5a5a6a',3);}
  if(o.tense){for(let i=0;i<4;i++){const a=T*8+i;line([-150+Math.cos(a)*40,-320+Math.sin(a)*20,-150+Math.cos(a)*70,-320+Math.sin(a)*35],5,'#ff5a5a');}}
  ctx.restore();}
function armRest(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-260,-40,520,40,14);fs('#2b2b33');rr(-250,-56,500,20,10);fs('#4a4a55',4);
  rr(-40,0,80,90,8);fs('#555');rr(-60,90,120,24,6);fs('#777',4);ctx.save();ctx.translate(0,140);line([0,-30,0,30],10,'#999');rr(-40,30,80,20,6);fs('#999',3);ctx.restore();ctx.restore();}
function scoreboard(t,sub,k,col=P.gold){if(k<=0)return;ctx.save();ctx.translate(540,520);ctx.scale(E.back(k),E.back(k));rr(-380,-80,760,160,10);fs('#101828',6,col);txt(t,0,-14,56,col,{f:'Mitr',maxW:720});if(sub)txt(sub,0,46,38,'#fff',{f:'Mitr',maxW:720});ctx.restore();}
function podium(){rr(340,1100,400,240,0);fs(P.gold,6);rr(40,1180,300,160,0);fs(P.silver,6);rr(740,1220,300,120,0);fs(P.bronze,6);txt('1',540,1240,90,OL,{f:'Mitr'});}

const SCENES={
 arena(lt){stadium();athlete(540,880,1.0,{mouth:0,armsUp:1,seed:3});scoreboard('ยกแขนพิมพ์งาน','ประเภทใหม่!',prog(lt,0.3,0.6));},
 strain(lt){stadium();athlete(540,900,1.15,{mouth:mouthFor('athlete'),strain:1,armsUp:1,seed:3});},
 fact(lt,ln){bgFill('#eef5ff');seated(420,1250,1.2,{tense:1});ctx.save();ctx.strokeStyle='#ff5a5a';ctx.lineWidth=8;circ(240,880,90);ctx.stroke();ctx.restore();
  scoreboard('แขนไม่มีที่วาง','บ่า + ไหล่ ออกแรงค้าง',prog(lt,0.3,0.6),'#ff5a5a');},
 why(lt,ln){bgFill('#101828');ctx.save();ctx.translate(540,920);
  rr(-60,-300,120,600,20);fs('#2b3a55',5);rr(-50,lerp(280,-290,E.out(prog(lt,0.2,1.4))),100,lerp(0,570,E.out(prog(lt,0.2,1.4))),14);fs(P.gold,0);
  txt('~5%',0,-360,110,P.gold,{f:'Mitr'});txt('ของน้ำหนักตัว / แขนหนึ่งข้าง',0,380,46,'#fff',{f:'Mitr'});ctx.restore();
  ctx.save();ctx.translate(200,900);for(let i=0;i<3;i++){rr(-50,-40+i*-60,100,50,8);fs('#888',4);}ctx.restore();txt('*ค่าโดยประมาณ',540,1400,30,'#8fa3c0',{f:'Mitr'});},
 gear(lt){stadium();const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,900);ctx.scale(k*1.3,k*1.3);armRest(0,0,1);ctx.restore();
  for(let i=0;i<10;i++){const a=i*0.63+T;star(540+Math.cos(a)*360,900+Math.sin(a)*200,22,8,4,T*3,'#fff');}scoreboard('อุปกรณ์ช่วย: ที่รองแขน',null,prog(lt,0.1,0.4));},
 clamp(lt,ln){bgFill('#eef5ff');const k=E.out(prog(lt,0.2,1.0));ctx.save();ctx.translate(780,1230);armRest(0,lerp(-200,0,k),0.8);ctx.restore();seated(420,1250,1.2,{rest:k>0.95});
  if(k>0.95)scoreboard('ไหล่ได้พัก ✓','ขยายพื้นที่วางแขน',prog(lt,1.0,1.3),'#2fbf71');},
 tip(lt){bgFill('#eef5ff');seated(420,1250,1.2,{rest:1});ctx.save();ctx.beginPath();ctx.arc(350,1000,90,Math.PI*1.5,Math.PI*2);ctx.lineWidth=10;ctx.strokeStyle=P.jersey;ctx.stroke();ctx.restore();
  txt('90°',470,920,64,P.jersey,{f:'Mitr'});scoreboard('ศอกงอ ~90°','ไหล่ไม่ยก ไม่ห่อ',prog(lt,0.2,0.5));},
 bonus(lt){stadium();const up=Math.sin(lt*4)>0;athlete(540,900,1.0,{mouth:0,seed:3});ctx.save();ctx.translate(540,900);for(const sd of[-1,1]){line([sd*90,up?60:120,sd*90,up?-10:60],10,P.gold);poly([sd*90-16,up?0:50,sd*90+16,up?0:50,sd*90,up?-30:80]);fs(P.gold,0);}ctx.restore();
  scoreboard('ยกไหล่ ↑ ปล่อยลง ↓','ทุกชั่วโมง 10 ครั้ง',prog(lt,0.2,0.5));},
 medal(lt,ln){stadium();podium();athlete(540,880,0.85,{mouth:mouthFor('athlete'),happy:1,medal:1,armsUp:1,seed:3});
  for(let i=0;i<50;i++){const x=hash(i)*W,y=((hash(i*3)*1800+T*350)%1800)+200;ctx.save();ctx.translate(x,y);ctx.rotate(T*4+i);ctx.fillStyle=['#ffcc33','#ff5a5a','#5ad1ff','#fff'][i%4];ctx.fillRect(-9,-4,18,8);ctx.restore();}
  scoreboard('ราคาไม่แพง',null,prog(lt,ln.dur*0.5,ln.dur*0.7));},
 cta(lt){stadium();podium();const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1000);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();scoreboard('รับเหรียญที่ตะกร้าด้านล่าง',null,prog(lt,0.2,0.5));},
};

window.EP={font:'Mitr',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.06*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mitr',size:56,col:'#ffffff',hl:'#ffcc33',sw:0,box:'#101828ee',boxR:30,boxPad:28,pop:'back',y:1600,lh:1.35},
  intro(t){stadium();const k=E.back(prog(t,0,0.5));ctx.save();ctx.translate(540,880);ctx.scale(k,k);circ(0,0,160);fs(P.gold,10);txt('GO!',0,10,120,OL,{f:'Mitr'});ctx.restore();},
  overlay(){rr(0,110,W,150,0);fs('#101828e6',0);rr(40,130,190,110,10);fs(P.gold,0);txt('LIVE',135,186,50,OL,{f:'Mitr'});txt(TL.title,260,166,58,'#fff',{f:'Mitr',align:'left',maxW:770});txt(TL.series,262,226,32,P.gold,{f:'Mitr',align:'left'});},
  outroGap:0.55,
  outro(k){ctx.fillStyle=P.track;ctx.fillRect(0,0,W*E.inOut(k),H);},
  endCard(k){bgFill(P.track);for(let i=0;i<8;i++)line([0,200+i*220,W,200+i*220],6,P.lane);ctx.save();ctx.globalAlpha=k;rr(140,640,800,520,20);fs('#101828ee',8,P.gold);
    txt('เหรียญทอง!',540,760,100,P.gold,{f:'Mitr'});txt('ที่รองแขนติดโต๊ะ',540,910,70,'#fff',{f:'Mitr'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.gold,{f:'Mitr'});ctx.restore();},
};
