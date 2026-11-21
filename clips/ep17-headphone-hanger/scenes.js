// EP.17 ลิเกหูฟังพลัดถิ่น — แนวลิเกไทย (ที่แขวนหูฟัง)
OL = '#2a0a10'; LW = 6;
const P = {red:'#9b1b30',red2:'#c8102e',gold:'#e6b422',gold2:'#ffd966',purple:'#5b2a86',teal:'#1b6b6b',face:'#fbeee6',skin:'#f0c9a8',cream:'#fff4d6',sky:'#2a3f7a'};

function sparkle(n=30){for(let i=0;i<n;i++){const x=hash(i)*W,y=hash(i*2)*H,t=(T*2+hash(i*3)*6)%2;if(t<0.4){star(x,y,10*(1-Math.abs(t-0.2)*5),3,4,0,'#fff8c4');}}}
function backdrop(){bgFill(P.sky);
  for(let i=0;i<3;i++){const x=200+i*340,b=980;poly([x-150,b,x+150,b,x+110,b-200,x-110,b-200]);fs('#c9a86a',5);
    for(let k=0;k<3;k++){poly([x-120+k*20,b-200-k*80,x+120-k*20,b-200-k*80,x,b-330-k*90]);fs(k%2?P.red2:'#3a6b9a',5);}
    line([x,b-500,x,b-600],8,P.gold);}
  ctx.fillStyle='#6b4f2a';ctx.fillRect(-300,1260,W+600,800);for(let i=0;i<12;i++)line([i*100,1260,i*100,1920],3,'#5a3f20');
  for(const sd of[-1,1]){ctx.save();ctx.translate(sd<0?0:W,0);ctx.scale(sd,1);for(let i=0;i<5;i++){poly([0,300,170-i*10,300,120+Math.sin(T+i)*6-i*20,1300,0,1300]);fs(i%2?P.red:P.red2,0);}ctx.restore();}
  rr(-20,300,1120,60,0);fs(P.red,0);for(let i=0;i<20;i++){circ(30+i*56,360,22);fs(P.gold,3);}}

function crown(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([-70,0,70,0,50,-60,0,-260,-50,-60]);fs(P.gold,5);
  for(let i=0;i<4;i++){rr(-60+i*8,-30-i*55,120-i*16,20,6);fs(P.gold2,3);}circ(0,-270,16);fs(P.red2,4);ctx.restore();}
function likayKing(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.3),y+boil(2,1.3));ctx.scale(s,s);
  poly([-170,140,170,140,210,520,-210,520]);fs(P.purple);for(let i=0;i<40;i++){circ(-160+hash(i)*320,170+hash(i*2)*330,5);ctx.fillStyle=hash(i+Math.floor(T*6))>0.5?'#fff8c4':P.gold;ctx.fill();}
  poly([-80,140,80,140,60,240,-60,240]);fs(P.gold,5);rr(-190,140,60,40,10);fs(P.gold,4);rr(130,140,60,40,10);fs(P.gold,4);
  if(o.garland){ctx.beginPath();ctx.arc(0,160,130,0.1*Math.PI,0.9*Math.PI);ctx.lineWidth=18;ctx.strokeStyle='#7fd18b';ctx.stroke();for(let i=0;i<9;i++){const a=(0.12+i*0.09)*Math.PI;rr(Math.cos(a)*130-26,160+Math.sin(a)*130-14,52,28,4);fs(i%2?'#e6eef7':'#c8e6c9',3);}}
  const g=o.gesture?Math.sin(T*4)*0.3:0;ctx.save();ctx.translate(170,200);ctx.rotate(-1.0+g);line([0,0,0,-150],30,OL);line([0,0,0,-150],20,P.purple);circ(0,-160,22);fs(P.skin,5);line([0,-180,-14,-206],6,P.skin);ctx.restore();
  rr(-22,92,44,56,10);fs(P.skin);ell(0,0,90,104);fs(P.face);
  for(const ex of[-34,34]){ctx.beginPath();ctx.moveTo(ex-22,0);ctx.quadraticCurveTo(ex,-14,ex+22,-4);ctx.quadraticCurveTo(ex,10,ex-22,0);fs('#fff',4);circ(ex,-2,6);ctx.fillStyle=OL;ctx.fill();line([ex-26,-24,ex+24,-30],6);}
  ell(0,58,14+m*6,4+m*12);fs(P.red2,4);ell(-60,30,16,8);ctx.fillStyle='#ff8fa3aa';ctx.fill();ell(60,30,16,8);ctx.fill();
  crown(0,-80,0.9);ctx.restore();}
function likayQueen(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.3),y+boil(4,1.3));ctx.scale(s,s);
  poly([-150,140,150,140,200,520,-200,520]);fs(P.red2);for(let i=0;i<30;i++){circ(-140+hash(i+9)*280,170+hash(i*5)*330,5);ctx.fillStyle=P.gold;ctx.fill();}
  poly([-150,140,150,140,0,260]);fs(P.gold,5);
  if(o.tray){rr(-200,150,400,40,20);fs(P.gold,6);ell(0,150,200,26);fs(P.gold2,5);}
  rr(-22,92,44,56,10);fs(P.skin);ell(0,0,88,102);fs(P.face);
  for(const ex of[-32,32]){ctx.beginPath();ctx.moveTo(ex-20,0);ctx.quadraticCurveTo(ex,-12,ex+20,-4);ctx.quadraticCurveTo(ex,10,ex-20,0);fs('#fff',4);circ(ex,-2,6);ctx.fillStyle=OL;ctx.fill();}
  line([-54,-26-(o.worry?6:0),-14,-30+(o.worry?6:0)],5);line([14,-30+(o.worry?6:0),54,-26-(o.worry?6:0)],5);
  ell(0,56,12+m*6,3+m*12);fs(P.red2,4);crown(0,-80,0.7);ctx.restore();}
function headphones(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);
  ctx.beginPath();ctx.arc(0,0,120,Math.PI*(o.bent?1.15:1),Math.PI*(o.bent?1.75:2));ctx.lineWidth=26;ctx.strokeStyle='#2b2b33';ctx.stroke();
  rr(-150,-10,60,110,24);fs('#3a3a46');rr(90,-10,60,110,24);fs('#3a3a46');
  for(const ex of[-30,30]){if(o.happy){ctx.beginPath();ctx.arc(ex,-40,12,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=5;ctx.strokeStyle='#fff';ctx.stroke();}else{circ(ex,-40,9);ctx.fillStyle='#fff';ctx.fill();}}
  if(!o.happy){ctx.beginPath();ctx.arc(0,-6,20,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=5;ctx.strokeStyle='#fff';ctx.stroke();const ph=(T*1.2)%1;circ(30,-30+ph*40,6);ctx.fillStyle='#9fe3ff';ctx.fill();}
  else{ctx.beginPath();ctx.arc(0,-24,20,0.1*Math.PI,0.9*Math.PI);ctx.lineWidth=5;ctx.strokeStyle='#fff';ctx.stroke();}
  if(o.cable)curve([150,90,230,160,160,220,260,260,200,300],8,'#2b2b33');
  ctx.restore();}
function hanger(x,y,s,screwT=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-40,-80,80,180,10);fs('#c9ced6');rr(-60,-90,40,30,6);fs('#c9ced6');rr(-60,70,40,30,6);fs('#c9ced6');
  ctx.save();ctx.translate(-40,110);ctx.rotate(screwT*6);line([-20,0,20,0],8,'#666');ctx.restore();line([-40,90,-40,130],10,'#888');
  line([40,-40,140,-40,160,-80],16,'#c9ced6');ctx.restore();}
function frame(){ctx.save();ctx.strokeStyle=P.gold;ctx.lineWidth=10;rr(30,320,1020,1130,30);ctx.stroke();for(const[x,y]of[[30,320],[1050,320],[30,1450],[1050,1450]]){star(x,y,30,12,4,T,P.gold2,4);}ctx.restore();}

const SCENES={
 stage(lt){backdrop();likayKing(560,820,0.95,{mouth:mouthFor('king'),gesture:1});rr(560,1230,360,30,6);fs('#8a5a3a');headphones(740,1200,0.6,{cable:1});sparkle(40);},
 worry(lt,ln){backdrop();likayQueen(300,860,0.85,{mouth:mouthFor('queen'),worry:1});
  circ(760,860,270);fs(P.cream,8,P.gold);ctx.save();circ(760,860,262);ctx.clip();rr(500,1000,520,200,0);fs('#c98b5a',0);
  headphones(740,940,0.8,{bent:lt>ln.dur*0.5,cable:1,rot:0.2});rr(800,780,90,130,10);fs('#cfe8ff',6);ell(845,780,45,12);fs('#9fd0ff',4);ctx.restore();sparkle(20);},
 pile(lt){backdrop();rr(80,1060,920,40,6);fs('#8a5a3a');
  const items=[[220,1000,'#e76f51',140,100],[400,980,'#2a9d8f',120,140],[600,990,'#f4a261',140,120],[800,960,'#264653',130,160]];
  for(const[x,y,c,w,h]of items){rr(x-w/2,y-h+60,w,h,10);fs(c,5);}headphones(520,880,0.65,{rot:-0.2});
  likayKing(560,600,0.5,{mouth:mouthFor('king')});
  const sq=Math.sin(T*10)*6;line([90+sq,1150,90+sq,1000],10,'#ff6b6b');line([990-sq,1150,990-sq,1000],10,'#ff6b6b');txt('คับแคบ!',540,1180,64,P.gold2,{f:'Charm',sw:10,stroke:OL});},
 gift(lt){backdrop();sparkle(60);
  const k=E.back(prog(lt,0.1,0.6));likayQueen(540,860,0.95,{mouth:mouthFor('queen'),tray:1});
  ctx.save();ctx.translate(540,960);ctx.scale(k,k);hanger(0,0,1.0);ctx.restore();
  for(let i=0;i<8;i++){const a=i*0.8+T;star(540+Math.cos(a)*240,940+Math.sin(a)*140,22,8,4,T*3,P.gold2,3);}},
 hang(lt,ln){bgFill(P.cream);for(let i=0;i<12;i++)line([0,350+i*100,W,350+i*100],2,'#f0e0b8');
  rr(-20,980,900,90,8);fs('#8a5a3a');rr(-20,1070,900,500,0);fs('#6b4a2a',0);
  const sc=prog(lt,0.2,0.9);hanger(640,1020,1.4,sc);
  const hk=E.out(prog(lt,0.9,1.5));headphones(lerp(400,850,hk),lerp(600,905,hk),0.9,{happy:hk>0.9});
  if(hk>0.9){const c=E.back(prog(lt,1.5,1.8));ctx.save();ctx.translate(420,600);ctx.scale(c,c);rr(-260,-60,520,120,60);fs(P.red2,6,P.gold);txt('หูฟังมีบ้านแล้ว',0,4,56,P.gold2,{f:'Charm'});ctx.restore();}},
 price(lt){backdrop();likayKing(540,860,0.95,{mouth:0,garland:1,gesture:1});
  for(let i=0;i<18;i++){const x=hash(i)*W,y=((hash(i*3)*1600+T*260)%1600)+300;ctx.save();ctx.translate(x,y);ctx.rotate(T*3+i);rr(-24,-12,48,24,3);fs('#c8e6c9',3);ctx.restore();}
  likayQueen(860,1060,0.5,{mouth:mouthFor('queen')});
  const k=E.back(prog(lt,0.2,0.5));ctx.save();ctx.translate(540,520);ctx.scale(k,k);rr(-260,-60,520,120,20);fs(P.gold,6);txt('ราคาย่อมเยา',0,4,62,P.red,{f:'Charm'});ctx.restore();},
 cta(lt){backdrop();sparkle(50);
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1000);ctx.scale(b,b);rr(-220,80,440,40,20);fs(P.gold,6);ell(0,80,220,26);fs(P.gold2,5);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold2;ctx.stroke();
  poly([-140,-50,140,-50,108,76,-108,76]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,66],6,'#b35500');poly([-140,-50,140,-50,108,76,-108,76]);fs(null);ctx.restore();
  likayKing(220,1080,0.45,{gesture:1,mouth:mouthFor('king')});
  txt('เสด็จไปที่ตะกร้าด้านล่าง',600,1300,62,P.gold2,{f:'Charm',sw:10,stroke:OL});},
};

window.EP={font:'Charm',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.04*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Charm',size:66,col:'#ffd966',hl:'#ffffff',sw:0,box:'#9b1b30ee',boxLine:6,boxLineCol:'#e6b422',boxR:30,boxPad:30,pop:'fade',y:1600,lh:1.3},
  intro(t){backdrop();const o=E.inOut(prog(t,0,1.2));ctx.fillStyle=P.red;ctx.fillRect(0,0,W/2*(1-o),H);ctx.fillRect(W/2+W/2*o,0,W/2,H);
    txt('ลิเกโต๊ะคอม',540,900,110,P.gold2,{f:'Charm',sw:10,stroke:OL});},
  overlay(t){frame();ctx.save();ctx.translate(540,195);rr(-440,-90,880,180,90);fs('#2a0a10e6',6,P.gold);
    txt(TL.series,0,-52,32,'#f0d9a0',{f:'Charm'});txt(TL.title,0,34,72,P.gold2,{f:'Charm',maxW:820});ctx.restore();},
  outroGap:0.6,
  outro(k){const o=E.inOut(k);ctx.fillStyle=P.red;ctx.fillRect(0,0,W/2*o,H);ctx.fillRect(W-W/2*o,0,W/2*o+1,H);},
  endCard(k){bgFill(P.red);for(let i=0;i<12;i++)line([i*100,0,i*100,H],8,'#7a1426');ctx.save();ctx.globalAlpha=k;
    txt('จบการแสดง',540,780,110,P.gold2,{f:'Charm'});txt('ที่แขวนหูฟัง',540,950,84,'#fff',{f:'Charm'});txt('อยู่ในตะกร้าด้านล่าง',540,1060,60,P.gold2,{f:'Charm'});ctx.restore();},
};
