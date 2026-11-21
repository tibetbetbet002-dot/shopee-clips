// EP.49 พิตสต็อป 3 วินาที — แนวรถแข่งฟอร์มูล่า (ที่ตั้งหนังสือ)
OL = '#0c0c10'; LW = 7;
const P = {asphalt:'#2b2d33',line:'#ffffff',red:'#e10600',yel:'#ffd000',teal:'#00d2be',skin:'#f0c39c',kerb1:'#e10600',kerb2:'#fff',book:'#3a86ff',wood:'#c98b5a'};

function track(){bgFill('#7fbf5a');ctx.fillStyle=P.asphalt;poly([380,300,700,300,1100,1920,-20,1920]);ctx.fill();
  for(let i=0;i<20;i++){const t=((i*0.05+T*0.6)%1);const y=lerp(300,1920,t*t),w=lerp(10,60,t);ctx.fillStyle=P.line;ctx.fillRect(540-w/2,y,w,lerp(20,120,t));}
  for(let i=0;i<14;i++){const t=i/14;const y=lerp(300,1920,t*t);ctx.fillStyle=i%2?P.kerb1:P.kerb2;poly([lerp(380,-20,t*t)-20,y,lerp(380,-20,t*t)+10,y,lerp(380,-20,(t+0.07)**2)+10,lerp(300,1920,(t+0.07)**2),lerp(380,-20,(t+0.07)**2)-20,lerp(300,1920,(t+0.07)**2)]);ctx.fill();}}
function car(x,y,s){ctx.save();ctx.translate(x+Math.sin(T*20)*2,y);ctx.scale(s,s);rr(-60,-260,120,420,40);fs(P.red);rr(-200,-300,400,40,8);fs('#111');rr(-180,140,360,50,8);fs('#111');
  for(const[wx,wy]of[[-130,-180],[130,-180],[-140,100],[140,100]])rr(wx-40,wy-60,80,120,20),fs('#111');circ(0,-40,50);fs('#222',5);rr(-30,-90,60,30,10);fs(P.yel,4);txt('49',0,40,50,'#fff',{f:'Mitr'});ctx.restore();}
function helmetHead(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);poly([-150,130,150,130,170,450,-170,450]);fs(P.red);rr(-60,200,120,40,8);fs(P.yel,4);
  circ(0,0,130);fs('#fff');rr(-110,-30,220,70,30);fs('#111',5);ctx.save();rr(-100,-22,200,54,26);ctx.clip();rr(-100,-22,200,54,0);fs('#2b2d33',0);for(const ex of[-40,40]){ell(ex,6,14,o.strain?8:12);fs('#fff',3);circ(ex,8,5);ctx.fillStyle=OL;ctx.fill();}ctx.restore();
  line([-130,-20,-90,-110,0,-130,90,-110,130,-20],10,P.red);ell(0,80,14+m*6,3+m*10);fs('#8a2a2a',4);ctx.restore();}
function engineer(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);poly([-130,120,130,120,150,430,-150,430]);fs('#111');rr(-60,180,120,40,8);fs(P.teal,4);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,82,92);fs(P.skin);ctx.beginPath();ctx.moveTo(-86,30);ctx.quadraticCurveTo(-90,-110,0,-104);ctx.quadraticCurveTo(90,-110,86,30);ctx.quadraticCurveTo(40,-50,-86,30);fs('#3a2010');
  ctx.beginPath();ctx.arc(0,-10,92,Math.PI*1.05,Math.PI*1.95);ctx.lineWidth=12;ctx.strokeStyle='#333';ctx.stroke();ell(-92,0,20,32);fs('#333');line([-92,20,-40,64],6,'#333');
  for(const ex of[-28,28]){ell(ex,4,11,13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,50,10+m*6,3+m*12);fs('#a03040',4);ctx.restore();}
function radio(t,y,k,col=P.teal){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.scale(1,E.out(k));rr(-400,-56,800,112,6);fs('#0c0c10ee',5,col);rr(-400,-56,90,112,6);fs(col,0);txt('📻',-355,6,46,'#000',{f:'Mitr'});txt(t,45,6,46,'#fff',{f:'Mitr',maxW:680});ctx.restore();}
function readerSide(x,y,s,ang,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-40,-20,500,40,8);fs(P.wood);rr(-260,-320,160,300,50);fs(P.red);
  ctx.save();ctx.translate(-180,-320);ctx.rotate(ang*Math.PI/180);rr(-20,-60,40,70,10);fs(P.skin);circ(0,-130,80);fs('#fff');rr(20,-160,70,50,20);fs('#111',4);ctx.restore();
  if(o.stand){ctx.save();ctx.translate(250,-20);rr(-60,-10,120,20,6);fs('#8a5a2a');line([-20,-10,40,-260],12,'#8a5a2a');ctx.save();ctx.translate(40,-140);ctx.rotate(-0.25);rr(-110,-120,220,240,10);fs(P.book,6);rr(-100,-110,200,220,6);fs('#fff',0);for(let i=0;i<6;i++)line([-80,-90+i*34,80,-90+i*34],4,'#aab');ctx.restore();ctx.restore();}
  else{rr(140,-36,240,20,4);fs(P.book,5);rr(150,-46,220,14,3);fs('#fff',3);}ctx.restore();}
function telemetry(v,label){ctx.save();ctx.translate(540,900);rr(-400,-200,800,400,14);fs('#0c0c10',6,P.teal);ctx.beginPath();for(let i=0;i<=80;i++){const x=-380+i*9.5;const y=100-Math.min(1,v)*200*(0.6+0.4*Math.sin(i*0.4+T*4));i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.lineWidth=6;ctx.strokeStyle=v>0.6?P.red:P.teal;ctx.stroke();
  txt(label,-360,-160,36,P.teal,{f:'Mitr',align:'left'});ctx.restore();}

const SCENES={
 race(lt){track();car(540,1450,0.9);helmetHead(540,760,0.6,{mouth:mouthFor('driver'),strain:1});},
 data(lt,ln){bgFill('#0c0c10');telemetry(0.85,'แรงที่คอ');engineer(860,1250,0.5,{mouth:mouthFor('engineer')});radio('หนังสือวางราบ → ก้มคอตลอด',1300,prog(lt,0.3,0.6));},
 fact(lt,ln){bgFill('#eef1f4');readerSide(380,1250,1.0,lerp(0,45,prog(lt,0,ln.dur*0.6)));radio('ยิ่งก้ม คอยิ่งรับแรงมากขึ้น',560,prog(lt,0.3,0.6),P.red);},
 why(lt){bgFill('#0c0c10');helmetHead(540,880,1.1,{mouth:mouthFor('driver')});txt('?',830,620,180,P.yel,{f:'Mitr',sw:10,stroke:'#fff'});},
 why2(lt,ln){bgFill('#eef1f4');ctx.save();ctx.translate(540,920);circ(0,-80,110);fs(P.skin,6);txt('~5 กก.',0,-80,50,OL,{f:'Mitr'});const a=lerp(0,0.8,prog(lt,0.3,ln.dur*0.6));ctx.save();ctx.translate(0,40);ctx.rotate(a);line([0,0,0,-60],18,OL);ctx.restore();
  const f=lerp(1,3.5,prog(lt,0.3,ln.dur*0.6));line([140,-200,140,-200+f*80],14,P.red);poly([120,-200+f*80,160,-200+f*80,140,-170+f*80]);fs(P.red,0);txt('×'+f.toFixed(1),240,-60,56,P.red,{f:'Mitr'});ctx.restore();
  radio('ก้มไปข้างหน้า = คอดึงแรงขึ้นหลายเท่า',1300,prog(lt,0.3,0.6),P.red);},
 pit(lt,ln){track();const k=prog(lt,0,ln.dur);car(540,1450,0.9);for(let i=0;i<4;i++){ctx.save();ctx.translate(300+i*160,1150);ctx.rotate(Math.sin(T*20+i)*0.2);circ(0,-60,40);fs(P.skin,5);rr(-40,-20,80,120,20);fs(P.teal,5);ctx.restore();}
  ctx.save();ctx.translate(540,760);rr(-220,-70,440,140,14);fs('#0c0c10',6,P.yel);txt((3-k*3).toFixed(1)+' วิ',0,8,80,P.yel,{f:'Mitr'});ctx.restore();},
 result(lt){bgFill('#eef1f4');readerSide(380,1250,1.0,5,{stand:1});ctx.save();ctx.setLineDash([16,10]);line([320,880,900,880],6,'#2fbf71');ctx.setLineDash([]);ctx.restore();radio('อ่านได้ไม่ต้องก้ม · มือว่างจดโน้ต',560,prog(lt,0.3,0.6));},
 tip(lt){bgFill('#eef1f4');rr(80,1150,920,40,8);fs(P.wood);ctx.save();ctx.translate(420,1150);rr(-60,-20,120,30,8);fs('#333');rr(-14,-140,28,120,6);fs('#333');rr(-220,-440,440,300,14);fs('#1a1d26');rr(-200,-420,400,260,6);fs('#3d5a80',0);ctx.restore();
  ctx.save();ctx.translate(820,1150);rr(-50,-10,100,20,6);fs('#8a5a2a');line([0,-10,30,-300],10,'#8a5a2a');ctx.save();ctx.translate(30,-330);rr(-110,-130,220,260,10);fs(P.book,6);ctx.restore();ctx.restore();
  ctx.save();ctx.setLineDash([16,10]);line([200,820,960,820],5,P.teal);ctx.setLineDash([]);ctx.restore();radio('ระดับเดียวกับจอ วางข้างจอ',560,prog(lt,0.2,0.5));},
 bonus(lt){bgFill('#eef1f4');const up=Math.sin(lt*3)>0;readerSide(380,1250,1.0,up?-15:20,{stand:1});ctx.save();ctx.translate(840,640);circ(0,0,90);fs('#fff',6);txt('30',0,-6,60,P.red,{f:'Mitr'});txt('นาที',0,44,30,OL,{f:'Mitr'});ctx.restore();radio('ทุก 30 นาที เงยหน้า ยืดคอ',1380,prog(lt,0.2,0.5));},
 win(lt,ln){track();car(540,1300,0.8);ctx.save();ctx.translate(540,640);for(let r=0;r<4;r++)for(let c=0;c<8;c++){ctx.fillStyle=(r+c)%2?'#111':'#fff';ctx.fillRect(-240+c*60,-120+r*60,60,60);}ctx.rotate(Math.sin(T*6)*0.05);ctx.restore();
  for(let i=0;i<40;i++){const x=hash(i)*W,y=((hash(i*3)*1600+T*400)%1600)+300;ctx.save();ctx.translate(x,y);ctx.rotate(T*5+i);ctx.fillStyle=[P.red,P.yel,P.teal,'#fff'][i%4];ctx.fillRect(-9,-4,18,8);ctx.restore();}
  radio('ทำเวลาดีที่สุด! ราคาไม่แพง',1000,prog(lt,0.3,0.6),P.yel);},
 cta(lt){track();const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,900);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.yel;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();radio('BOX BOX → ตะกร้าด้านล่าง!',1250,prog(lt,0.3,0.6),P.red);},
};

window.EP={font:'Mitr',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.06*(1-E.out(prog(lt,0,0.2)));if(name==='race'||name==='pit')ctx.translate(Math.sin(T*30)*3,0);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mitr',size:56,col:'#ffffff',hl:'#ffd000',sw:0,box:'#0c0c10ee',boxLine:4,boxLineCol:'#e10600',boxR:0,boxPad:28,pop:'back',y:1600,lh:1.35,skew:-0.1},
  intro(t){track();const lights=Math.min(5,Math.floor(t*4));ctx.save();ctx.translate(540,700);rr(-330,-80,660,160,20);fs('#111',6);for(let i=0;i<5;i++){circ(-260+i*130,0,50);fs(i<lights?P.red:'#333',5);}ctx.restore();},
  overlay(){rr(0,110,W,150,0);fs('#0c0c10ee',0);rr(0,110,26,150,0);fs(P.red,0);txt(TL.title,60,166,62,'#fff',{f:'Mitr',align:'left',maxW:700});txt(TL.series,62,226,30,P.teal,{f:'Mitr',align:'left'});
    rr(800,140,230,90,10);fs(P.red,0);txt('LAP '+(1+Math.floor(T/8))+'/3',915,186,40,'#fff',{f:'Mitr'});},
  outroGap:0.5,
  outro(k){ctx.save();ctx.beginPath();ctx.rect(0,0,W*E.inOut(k),H);ctx.clip();for(let r=0;r<30;r++)for(let c=0;c<14;c++){ctx.fillStyle=(r+c)%2?'#111':'#fff';ctx.fillRect(c*80,r*70,80,70);}ctx.restore();},
  endCard(k){bgFill('#111');ctx.save();ctx.globalAlpha=k;txt('🏁 เข้าเส้นชัย!',540,780,96,P.yel,{f:'Mitr'});txt('ที่ตั้งหนังสือ',540,930,86,'#fff',{f:'Mitr'});txt('อยู่ในตะกร้าด้านล่าง',540,1040,56,P.red,{f:'Mitr'});ctx.restore();},
};
