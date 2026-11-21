// EP.30 ใต้ทะเลลึกบนโต๊ะ — แนวดำน้ำใต้ทะเล (ที่รองแก้วกันลื่น)
OL = '#06213a'; LW = 6;
const P = {sea1:'#0a5aa8',sea2:'#04294f',sand:'#e9d29b',weed:'#2fa86a',brass:'#d4a23a',suit:'#f2a541',fish:'#ff8c42',fish2:'#ffd166',wood:'#a8734a',cork:'#c99a6b',ring:'#ffffffaa'};

function sea(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.sea1);g.addColorStop(1,P.sea2);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<5;i++){ctx.globalAlpha=0.08+0.04*Math.sin(T+i);ctx.fillStyle='#bfe9ff';poly([100+i*220,300,180+i*220,300,320+i*220+Math.sin(T*0.5)*40,1500,-20+i*220,1500]);ctx.fill();}ctx.restore();
  for(let i=0;i<30;i++){const ph=(T*0.25+hash(i))%1;circ(hash(i*3)*W+Math.sin(T*2+i)*10,1500-ph*1200,3+hash(i)*8);ctx.fillStyle='rgba(220,245,255,0.6)';ctx.fill();}
  ctx.fillStyle=P.sand;ctx.beginPath();ctx.moveTo(-50,1400);for(let x=0;x<=W+50;x+=40)ctx.lineTo(x,1380+Math.sin(x*0.02)*20);ctx.lineTo(W+50,H);ctx.lineTo(-50,H);ctx.fill();
  for(let i=0;i<6;i++){const x=60+i*200;curve([x,1400,x+Math.sin(T*2+i)*30,1250,x-10+Math.sin(T*2+i)*50,1100],14,P.weed);}}
function diver(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+Math.sin(T*1.5)*10,y+Math.cos(T*1.2)*10);ctx.scale(s,s);
  rr(-130,100,260,300,80);fs(P.suit);rr(-170,130,60,200,30);fs('#777');
  circ(0,0,150);fs(P.brass);circ(0,10,92);fs('#9fd8ff',8,'#8a6a1a');for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5])circ(Math.cos(a)*128,Math.sin(a)*128,16),fs('#b8862a',4);
  ctx.save();circ(0,10,86);ctx.clip();ell(0,40,60,70);fs('#f0c39c',4);for(const ex of[-22,22]){circ(ex,30,7);ctx.fillStyle=OL;ctx.fill();}ell(0,70,10+m*6,3+m*10);fs('#a03040',3);ctx.restore();
  for(let i=0;i<3;i++){const ph=(T*1.2+i/3)%1;circ(40+Math.sin(i)*20,-150-ph*200,8+ph*8);ctx.fillStyle='rgba(220,245,255,0.7)';ctx.fill();}ctx.restore();}
function fish(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+Math.sin(T*2)*20,y+Math.cos(T*3)*10);ctx.scale(s*(o.flip?-1:1),s);
  poly([110,0,190,-70,190,70]);fs(P.fish2);ell(0,0,130,90);fs(P.fish);for(let i=0;i<3;i++)curve([-30+i*40,-80,-10+i*40,0,-30+i*40,80],6,P.fish2);
  circ(-60,-20,28);fs('#fff',5);circ(-66,-18,12);ctx.fillStyle=OL;ctx.fill();ell(-120,20,12+m*6,4+m*10);fs('#a03040',4);ctx.restore();}
function table(y,o={}){rr(-50,y,W+100,60,10);fs(P.wood);ctx.fillStyle='#8a5a3a';ctx.fillRect(-50,y+60,W+100,600);
  if(o.rings)for(let i=0;i<3;i++){ell(260+i*240,y+28,70,18);ctx.lineWidth=6;ctx.strokeStyle='#ffffff55';ctx.stroke();}}
function glass(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([-70,-200,70,-200,55,0,-55,0]);fs('#cfefffaa',6);ctx.save();poly([-70,-200,70,-200,55,0,-55,0]);ctx.clip();ctx.fillStyle='#7ccfff88';ctx.fillRect(-80,-140,160,140);ctx.restore();
  for(let i=0;i<(o.drops||0);i++){const ph=(T*0.4+i/6)%1;circ(-60+hash(i)*120,-180+ph*190,7);fs('#e9f8ff',3);}for(let i=0;i<4;i++)rr(-40+i*20,-120+i*20,22,22,4),fs('#ffffffcc',2);ctx.restore();}
function coaster(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,130,34);fs('#5a3a2a');ell(0,-10,130,34);fs(P.cork,5);ctx.save();ell(0,-10,110,26);ctx.clip();for(let i=0;i<20;i++){circ(-100+hash(i)*200,-30+hash(i*2)*40,4);ctx.fillStyle='#a87a4a';ctx.fill();}ctx.restore();ctx.restore();}
function chest(x,y,s,open){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-180,-60,360,160,10);fs('#8a5a2a');rr(-180,-60,360,30,6);fs(P.brass,4);
  ctx.save();ctx.translate(0,-60);ctx.rotate(-open*1.2);ctx.beginPath();ctx.moveTo(-180,0);ctx.quadraticCurveTo(0,-120,180,0);ctx.closePath();fs('#9a6a3a');ctx.restore();
  if(open>0.5){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=open;const g=ctx.createRadialGradient(0,-80,10,0,-80,300);g.addColorStop(0,'rgba(255,230,120,0.9)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-300,-400,600,500);ctx.restore();}ctx.restore();}
function bubbleLabel(t,x,y,k){if(k<=0)return;ctx.save();ctx.translate(x,y+(1-k)*40);ctx.globalAlpha=Math.min(1,k*2);rr(-280,-54,560,108,54);fs('#e9f8ffee',5);txt(t,0,6,50,OL,{f:'Sri',maxW:520});ctx.restore();}

const SCENES={
 dive(lt){sea();diver(540,900,1.0,{mouth:mouthFor('diver')});},
 ring(lt){sea();table(1150,{rings:1});glass(540,1150,0.9,{drops:4});fish(820,720,0.8,{mouth:mouthFor('fish'),flip:1});bubbleLabel('วงน้ำ = รอยบนโต๊ะไม้',540,520,prog(lt,0.4,0.8));},
 fact(lt,ln){sea();table(1200);glass(540,1200,1.3,{drops:6});const k=prog(lt,0.5,ln.dur);ell(540,1228,lerp(40,110,k),lerp(10,26,k));ctx.fillStyle='#ffffff66';ctx.fill();bubbleLabel('หยดน้ำเกาะ → ไหลลงโต๊ะ',540,520,prog(lt,0.3,0.7));},
 why(lt,ln){bgFill('#eaf7ff');glass(540,1100,1.4);
  for(let i=0;i<16;i++){const a=hash(i)*Math.PI*2,r=lerp(480,180,(T*0.5+hash(i*3))%1);const x=540+Math.cos(a)*r,y=900+Math.sin(a)*r*0.8;txt('💧',x,y,34,'#000',{f:'Sri'});}
  bubbleLabel('ไอน้ำในอากาศร้อน + แก้วเย็น = หยดน้ำ',540,500,prog(lt,0.3,0.7));txt('ร้อนชื้น',200,1300,52,'#ff7a3d',{f:'Sri'});txt('เย็น',540,1300,52,'#1f8fff',{f:'Sri'});},
 treasure(lt){sea();const o=E.out(prog(lt,0.2,0.8));chest(540,1250,1.1,o);if(o>0.6){const k=E.back(prog(lt,0.6,1.1));ctx.save();ctx.translate(540,lerp(1180,860,k));coaster(0,0,1.3*k);ctx.restore();}fish(220,700,0.6,{mouth:mouthFor('fish')});},
 absorb(lt,ln){sea();table(1200);coaster(540,1200,1.1);glass(540,1188,1.0,{drops:3});
  const s=Math.sin(lt*3)*0.5;ctx.save();ctx.translate(540,0);ctx.rotate(0);ctx.restore();
  bubbleLabel('ซับน้ำ · กันลื่น',540,520,prog(lt,0.2,0.5));bubbleLabel('ไม่ไถลไปโดนคีย์บอร์ด',540,660,prog(lt,ln.dur*0.5,ln.dur*0.7));},
 tip(lt){bgFill('#eaf7ff');rr(80,700,920,520,30);fs('#c98b5a',6);rr(220,880,420,160,16);fs('#555',5);ell(760,980,50,70);fs('#ddd',5);
  coaster(330,1130,0.7);glass(330,1120,0.6);line([630,1120,820,1120],6,'#2fbf71');txt('มือถนัด →',780,820,44,OL,{f:'Sri'});
  bubbleLabel('วางแก้วฝั่งมือที่ไม่ถนัด ห่างเมาส์',540,520,prog(lt,0.2,0.5));},
 bonus(lt){sea();ctx.save();ctx.translate(540,1000);rr(-260,-160,520,320,30);fs('#cfefff',6);for(let i=0;i<5;i++){const ph=(T+i/5)%1;circ(-200+i*100,140-ph*260,14);fs('#ffffffaa',3);}coaster(0,40,0.9);ctx.restore();
  bubbleLabel('ล้างที่รองแก้วเป็นระยะ กันเชื้อรา',540,560,prog(lt,0.2,0.5));},
 price(lt,ln){sea();fish(540,800,1.0,{mouth:mouthFor('fish')});coaster(300,1250,0.6);coaster(780,1260,0.6);bubbleLabel('ราคาหลักสิบ · หลายลาย',540,520,prog(lt,0.3,0.6));},
 cta(lt){sea();diver(780,760,0.6,{});const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(400,1060);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.brass;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();bubbleLabel('ขึ้นฝั่ง → ตะกร้าด้านล่าง',540,560,prog(lt,0.2,0.5));},
};

window.EP={font:'Sri',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.04*prog(lt,0,ln.dur);ctx.translate(540+Math.sin(T*0.8)*6,960+Math.cos(T*0.6)*6);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Sri',size:64,col:'#ffffff',hl:'#ffd166',stroke:'#06213a',sw:14,pop:'fade',y:1590,lh:1.3},
  intro(t){sea();const k=prog(t,0,1.2);ctx.save();ctx.globalAlpha=k;txt('ดำน้ำ...',540,880,120,'#e9f8ff',{f:'Sri',sw:10,stroke:OL});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-440,-88,880,176,88);fs('#06213add',6,'#9fd8ff');txt(TL.title,0,-6,70,'#ffd166',{f:'Sri',maxW:820});txt('🤿 '+TL.series,0,56,32,'#e9f8ff',{f:'Sri'});ctx.restore();
    txt('ลึก '+Math.floor(10+T*2)+' ม.',980,1440,30,'#bfe9ff',{f:'Sri',align:'right'});},
  outroGap:0.6,
  outro(k){ctx.fillStyle=`rgba(4,41,79,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){sea();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,40);fs('#06213aee',8,'#9fd8ff');txt('ขึ้นฝั่งแล้ว!',540,760,96,'#ffd166',{f:'Sri'});txt('ที่รองแก้วกันลื่น',540,900,74,'#fff',{f:'Sri'});txt('อยู่ในตะกร้าด้านล่าง',540,1010,56,'#bfe9ff',{f:'Sri'});ctx.restore();},
};
