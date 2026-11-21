// EP.47 หมาแสนรู้วัดอากาศ — แนวรายการสัตว์เลี้ยงแสนรู้ (นาฬิกาวัดอุณหภูมิและความชื้น)
OL = '#2a1e14'; LW = 7;
const P = {studio:'#ffe7c2',studio2:'#ffd59a',teal:'#1fb5a6',pink:'#ff7aa2',dog:'#e0a060',dog2:'#b8783a',skin:'#f1c6a2',blue:'#5ab3ff',hot:'#ff6b3d',lcd:'#cfe8c8'};

function studio(){bgFill(P.studio);for(let i=0;i<14;i++){const a=i/14*Math.PI*2+T*0.15;ctx.fillStyle=i%2?P.studio2:P.studio;ctx.beginPath();ctx.moveTo(540,900);ctx.arc(540,900,1500,a,a+Math.PI/14);ctx.fill();}
  for(let i=0;i<10;i++){const x=hash(i)*W,y=360+hash(i*2)*800;txt('🐾',x,y,40,'#e8b87a',{f:'Mali'});}ctx.fillStyle='#e8b87a';ctx.fillRect(-300,1300,W+600,800);}
function dog(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.4),y+boil(2,1.4));ctx.scale(s,s);
  ell(0,180,150,130);fs(P.dog);curve([130,200,220,150,230,80+Math.sin(T*12)*20],22,P.dog);rr(-60,260,40,90,16);fs(P.dog);rr(20,260,40,90,16);fs(P.dog);
  ell(0,0,120,110);fs(P.dog);for(const sd of[-1,1]){ell(sd*110,10,40,80,sd*0.3);fs(P.dog2);}ell(0,50,60,44);fs('#f5d0a0',0);circ(0,30,18);fs('#2a1a10',0);
  for(const ex of[-40,40]){circ(ex,-20,o.big?22:16);fs('#2a1a10',0);circ(ex+5,-26,6);ctx.fillStyle='#fff';ctx.fill();}
  ell(0,80,16+m*8,4+m*16);fs('#c0405a',4);if(o.tongue)ell(0,100,14,22),fs(P.pink,4);rr(-60,110,120,24,10);fs(P.teal,4);circ(0,140,14);fs('#f2c14e',3);
  if(o.dry){for(let i=0;i<3;i++)line([-24+i*24,10,-20+i*24,24],3,'#fff');}ctx.restore();}
function mc(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);poly([-130,120,130,120,150,430,-150,430]);fs(P.pink);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,84,94);fs(P.skin);ctx.beginPath();ctx.moveTo(-90,40);ctx.quadraticCurveTo(-92,-110,0,-104);ctx.quadraticCurveTo(92,-110,90,40);ctx.lineTo(70,0);ctx.quadraticCurveTo(0,-60,-70,0);ctx.closePath();fs('#3a2010');
  for(const ex of[-28,28]){ell(ex,4,11,13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,50,12+m*6,3+m*12);fs('#c0405a',4);line([120,200,180,120],18,OL);rr(160,60,40,60,10);fs('#333',4);ctx.restore();}
function lcdClock(x,y,s,t,h){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-220,-150,440,300,30);fs('#fafafa');rr(-190,-120,380,240,14);fs(P.lcd,5);
  txt(String(t)+'°C',-60,-40,80,'#1a2a1a',{f:'Mali'});txt(String(h)+'%',-60,60,70,'#1a2a1a',{f:'Mali'});txt('🌡',120,-40,60,'#000',{f:'Mali'});txt('💧',120,60,56,'#000',{f:'Mali'});ctx.restore();}
function room(){bgFill('#eaf2f8');rr(100,420,300,260,10);fs('#bfe6ff',6);rr(-20,330,1120,100,0);fs('#ddd',0);rr(720,350,280,90,16);fs('#fff',5);for(let i=0;i<4;i++)line([740,400+i*10,980,400+i*10],3,'#bbb');
  for(let i=0;i<5;i++){const ph=(T*0.8+i/5)%1;ctx.save();ctx.globalAlpha=1-ph;line([760+i*50,450+ph*200,760+i*50,480+ph*200],5,P.blue);ctx.restore();}ctx.fillStyle='#d9c7a8';ctx.fillRect(-300,1300,W+600,800);}
function card(t,y,k,col=P.teal){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.scale(E.back(k),E.back(k));rr(-380,-56,760,112,56);fs(col,6,'#fff');txt(t,0,6,48,'#fff',{f:'Mali',maxW:720});ctx.restore();}

const SCENES={
 show(lt){studio();mc(280,880,0.85,{mouth:mouthFor('mc')});dog(720,1000,1.0,{tongue:1});card('🐶 น้องโบ้ หมาแสนรู้',560,prog(lt,0.3,0.6),P.pink);},
 guess(lt){room();dog(540,1000,1.3,{mouth:mouthFor('dog'),dry:1,big:1});for(let i=0;i<6;i++){const a=T*2+i;star(540+Math.cos(a)*280,820+Math.sin(a)*120,14,5,6,0,'#bfe6ff');}},
 fact(lt){room();ctx.save();ctx.translate(540,920);circ(0,-60,70);fs(P.skin,5);rr(-60,10,120,220,40);fs('#7bd3ea',5);ctx.restore();txt('🤷',760,760,90,'#000',{f:'Mali'});card('ไม่รู้ตัวว่าห้องแห้ง/ร้อนไป',560,prog(lt,0.3,0.6));},
 why(lt,ln){room();const k=prog(lt,0,ln.dur);ctx.save();ctx.translate(540,900);rr(-260,-80,520,160,80);fs('#fff',6);rr(-250,-70,500*(1-k)+20,140,70);fs(P.hot,0);txt(k<0.6?'รู้สึก: หนาวนะ':'รู้สึก: ...ชินแล้ว',0,6,48,OL,{f:'Mali'});ctx.restore();
  card('นั่งนาน = ร่างกายชินกับห้อง',1240,prog(lt,0.3,0.6));},
 clock(lt){studio();const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,920);ctx.scale(k*1.3,k*1.3);lcdClock(0,0,1,22,31);ctx.restore();dog(880,1230,0.5,{mouth:mouthFor('dog'),tongue:1});},
 adjust(lt,ln){room();const t=Math.round(lerp(22,25,prog(lt,0.4,ln.dur))),h=Math.round(lerp(31,48,prog(lt,0.4,ln.dur)));lcdClock(540,900,1.1,t,h);card('เห็นตัวเลข → ปรับแอร์ได้พอดี',1250,prog(lt,0.3,0.6));},
 tip(lt){bgFill('#eaf2f8');ctx.save();ctx.translate(540,900);rr(-400,-60,800,120,60);fs('#ddd',5);rr(-400+800*0.4,-60,800*0.2,120,0);fs('#2fd47a',0);rr(-400,-60,800,120,60);fs(null,5);
  txt('0%',-380,110,36,OL,{f:'Mali'});txt('40%',-80,110,40,'#1a8a4a',{f:'Mali'});txt('60%',80,110,40,'#1a8a4a',{f:'Mali'});txt('100%',360,110,36,OL,{f:'Mali'});ctx.restore();
  card('ความชื้นที่สบาย ราว 40–60%',560,prog(lt,0.2,0.5));},
 bonus(lt){room();ctx.save();ctx.translate(540,920);rr(-220,-130,440,260,20);fs('#fff',6);txt('25°C',0,10,140,P.teal,{f:'Mali'});ctx.restore();card('ตั้งแอร์ ~25°C สบาย + ประหยัดไฟ',1250,prog(lt,0.3,0.6));},
 price(lt){studio();dog(540,1000,1.1,{mouth:mouthFor('dog'),tongue:1});lcdClock(860,600,0.5,25,50);card('ราคาไม่แพง โฮ่ง!',560,prog(lt,0.3,0.6),P.pink);},
 cta(lt){studio();mc(260,900,0.7,{mouth:mouthFor('mc')});const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(720,1050);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.teal;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();card('ขนมรางวัล: ตะกร้าด้านล่าง',560,prog(lt,0.3,0.6),P.pink);},
};

window.EP={font:'Mali',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mali',size:58,col:'#2a1e14',hl:'#ff3d7f',sw:0,box:'#fffaf0f2',boxLine:6,boxLineCol:'#1fb5a6',boxR:40,boxPad:28,pop:'back',y:1600,lh:1.35},
  intro(t){studio();const k=E.back(prog(t,0,0.6));ctx.save();ctx.translate(540,900);ctx.scale(k,k);dog(0,0,1.2,{tongue:1});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,88);fs(P.teal,6,'#fff');txt(TL.title,0,-6,66,'#fff',{f:'Mali',maxW:840});txt('🐾 '+TL.series,0,56,30,'#fff3c4',{f:'Mali'});ctx.restore();},
  outroGap:0.55,
  outro(k){for(let i=0;i<20;i++){txt('🐾',hash(i)*W,H-E.inOut(k)*H*1.2+hash(i*3)*400,120,'#000',{f:'Mali'});}ctx.fillStyle=`rgba(31,181,166,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill(P.teal);ctx.save();ctx.globalAlpha=k;txt('เก่งมากน้องโบ้!',540,780,90,'#fff',{f:'Mali'});txt('นาฬิกาวัดอุณหภูมิและความชื้น',540,930,56,'#fff3c4',{f:'Mali',maxW:960});txt('อยู่ในตะกร้าด้านล่าง',540,1030,56,'#fff',{f:'Mali'});ctx.restore();},
};
