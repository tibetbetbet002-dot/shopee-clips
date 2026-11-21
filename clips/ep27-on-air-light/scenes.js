// EP.27 ทอล์กห้องนอนกลายเป็นออฟฟิศ — แนวทอล์กโชว์ดึก (ไฟแจ้งสถานะกำลังประชุม)
OL = '#151025'; LW = 7;
const P = {night:'#14123a',city:'#252a6a',gold:'#ffc94d',red:'#ff3b4e',sofa:'#e2725b',desk:'#6b3fa0',skin:'#f1c6a2',skin2:'#c98d67',green:'#2fd47a',wall:'#f6e7cf'};

function set(){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,P.night);g.addColorStop(1,P.city);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  for(let i=0;i<14;i++){const x=i*80,h=200+hash(i)*400;ctx.fillStyle='#0d0c2a';ctx.fillRect(x,1100-h,70,h);for(let r=0;r<h/40;r++)if(hash(i*9+r)>0.6){ctx.fillStyle='#ffd86b88';ctx.fillRect(x+15+(r%2)*25,1100-h+10+r*40,14,20);}}
  ctx.fillStyle='#3a2a5a';ctx.fillRect(-300,1100,W+600,900);for(let i=0;i<12;i++)line([i*100,1100,i*130-120,1920],3,'#4a3a6a');}
function applause(on){rr(380,330,320,70,12);fs(on?P.red:'#5a1a2a',5);txt('APPLAUSE',540,368,40,on?'#fff':'#a06070',{f:'Pattaya'});}
function talker(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(o.seed||1,1.2),y+boil((o.seed||1)+1,1.2));ctx.scale(s,s);
  poly([-140,130,140,130,160,430,-160,430]);fs(o.f?'#2fbfb0':'#1f2a5a');if(!o.f){poly([-30,130,0,220,30,130]);fs('#fff',4);poly([-8,150,8,150,4,230,-4,230]);fs(P.red,0);}
  if(o.laugh){line([140,180,220,100],26,OL);line([140,180,220,100],16,o.f?'#2fbfb0':'#1f2a5a');circ(226,94,22);fs(P.skin,5);}
  rr(-22,88,44,56,10);fs(o.f?P.skin:P.skin2);ell(0,0,88,100);fs(o.f?P.skin:P.skin2);
  if(o.f){ell(0,-10,104,112);ctx.save();ctx.globalCompositeOperation='destination-over';ctx.restore();ctx.beginPath();ctx.arc(0,-20,96,Math.PI*0.95,Math.PI*2.05);ctx.closePath();fs('#5a2a1a');}
  else{ctx.beginPath();ctx.arc(0,-26,90,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#222');}
  for(const ex of[-32,32]){if(o.laugh){ctx.beginPath();ctx.arc(ex,2,14,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}ell(ex,0,13,15);fs('#fff',4);circ(ex,2,5);ctx.fillStyle=OL;ctx.fill();}
  if(o.laugh){ctx.beginPath();ctx.moveTo(-40,40);ctx.quadraticCurveTo(0,110,40,40);ctx.closePath();fs('#7a1a2a',5);}else{ell(0,52,12+m*6,3+m*14);fs('#9a3040',4);}ctx.restore();}
function sofa(x,y){rr(x-260,y-120,520,160,40);fs(P.sofa,7);rr(x-280,y-40,560,140,40);fs('#c9584a',7);}
function hostDesk(x,y){poly([x-260,y,x+260,y,x+230,y+300,x-230,y+300]);fs(P.desk,7);rr(x-80,y+80,160,90,10);fs(P.gold,5);txt('TALK',x,y+128,40,OL,{f:'Pattaya'});
  rr(x+120,y-70,70,70,10);fs('#fff',5);}
function onAirLamp(x,y,s,on,col){ctx.save();ctx.translate(x,y);ctx.scale(s,s);if(on){ctx.save();ctx.shadowColor=col;ctx.shadowBlur=60;rr(-180,-70,360,140,20);fs(col,0);ctx.restore();}
  rr(-180,-70,360,140,20);fs(on?col:'#3a3a4a',8);txt(col===P.green?'ว่าง คุยได้':'กำลังประชุม',0,6,46,'#fff',{f:'Pattaya',maxW:320});ctx.restore();}
function videoCall(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-300,-200,600,400,20);fs('#222',6);rr(-280,-180,560,330,10);fs(P.wall,0);
  ctx.save();rr(-280,-180,560,330,10);ctx.clip();talker(-40,40,0.55,{f:1,mouth:0});if(o.mom){talker(160+Math.sin(T*2)*10,60,0.5,{seed:7,laugh:0});}ctx.restore();
  for(let i=0;i<3;i++)circ(-60+i*60,180,16),fs(i===1?P.red:'#555',3);ctx.restore();}
function card(t,x,y,k,col=P.gold){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(-0.04);ctx.scale(E.back(k),E.back(k));rr(-250,-56,500,112,20);fs(col,6);txt(t,0,6,50,OL,{f:'Pattaya',maxW:470});ctx.restore();}

const SCENES={
 sofa(lt){set();applause(Math.floor(T*3)%2===0);hostDesk(330,1050);talker(330,880,0.75,{mouth:mouthFor('host')});sofa(800,1150);talker(800,960,0.7,{f:1,seed:4});},
 story(lt,ln){set();videoCall(540,820,1.3,{mom:lt>ln.dur*0.5});if(lt>ln.dur*0.55)card('แม่เดินเข้ากล้อง!',540,1250,prog(lt,ln.dur*0.55,ln.dur*0.7),P.red);},
 laugh(lt){set();applause(true);hostDesk(540,1100);talker(540,920,1.0,{laugh:1});txt('555+',820,620,110,P.gold,{f:'Pattaya',sw:10});},
 light(lt){bgFill(P.wall);rr(330,500,420,820,14);fs('#c9a27a',8);circ(700,920,16);fs(P.gold,4);
  const on=lt>0.5;onAirLamp(540,420,1,on,P.red);if(on)txt('↑ ติดหน้าห้อง',540,580,46,OL,{f:'Pattaya'});talker(860,1100,0.5,{f:1,mouth:mouthFor('guest'),seed:4});},
 fact(lt){bgFill(P.wall);rr(330,500,420,820,14);fs('#c9a27a',8);onAirLamp(540,420,1,true,P.red);
  const st=lt>1.2;talker(st?160:300,1100,0.55,{seed:7});if(st)txt('โอเค ไม่กวน!',180,820,48,OL,{f:'Pattaya'});card('รู้ทันที ไม่ต้องตะโกนบอก',540,1350,prog(lt,0.4,0.7));},
 why(lt,ln){bgFill(P.wall);ctx.save();ctx.translate(540,880);rr(-360,-240,720,480,20);fs('#fff',6);
  talker(-160,40,0.45,{f:1});rr(-100,60,200,120,10);fs('#333',4);ctx.restore();
  txt('?',830,620,160,P.red,{f:'Pattaya',sw:10});talker(830,1150,0.55,{seed:7});card('ประชุมอยู่ หรือแค่เล่นคอม?',540,1360,prog(lt,0.4,0.7),P.red);},
 tip(lt){bgFill(P.night);const g=Math.floor(lt*1.2)%2===0;onAirLamp(540,640,1.1,g,P.red);onAirLamp(540,960,1.1,!g,P.green);
  card('ไฟแดง = ห้ามเข้า',540,1220,prog(lt,0.2,0.5),P.red);card('ไฟเขียว = คุยได้',540,1360,prog(lt,0.8,1.1),P.green);},
 bonus(lt,ln){set();ctx.save();ctx.translate(320,880);rr(-130,-240,260,480,30);fs('#222',6);rr(-112,-210,224,400,14);fs('#3d5a80',0);txt('เข้าประชุม',0,-30,36,'#fff',{f:'Pattaya'});ctx.restore();
  const k=prog(lt,0.5,1.0);line([460,880,600,880],8,P.gold);onAirLamp(800,880,0.8,k>0.5,P.red);card('เชื่อมแอป เปิดเองอัตโนมัติ',540,1260,prog(lt,0.8,1.1));},
 price(lt){set();applause(true);sofa(540,1150);talker(540,960,0.8,{f:1,mouth:mouthFor('guest'),seed:4});card('ราคาไม่แพง · ติดตั้งง่าย',540,620,prog(lt,0.2,0.5));},
 cta(lt){set();applause(Math.floor(T*4)%2===0);hostDesk(540,1100);talker(540,920,0.8,{mouth:mouthFor('host')});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,620);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();},
};

window.EP={font:'Pattaya',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Pattaya',size:62,col:'#ffffff',hl:'#ffc94d',stroke:'#151025',sw:14,pop:'back',y:1590,lh:1.3},
  intro(t){set();const k=E.back(prog(t,0,0.5));ctx.save();ctx.translate(540,880);ctx.scale(k,k);txt('Friday Night',0,-60,110,P.gold,{f:'Pattaya',sw:12});txt('TALK',0,80,140,'#fff',{f:'Pattaya',sw:12});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,200);rr(-450,-90,900,180,90);fs('#151025ee',6,P.gold);txt(TL.title,0,-6,66,P.gold,{f:'Pattaya',maxW:840});txt(TL.series,0,56,32,'#fff',{f:'Pattaya'});ctx.restore();},
  outroGap:0.55,
  outro(k){const r=lerp(1400,0,E.inOut(k));ctx.save();ctx.fillStyle='#000';ctx.beginPath();ctx.rect(0,0,W,H);ctx.arc(540,960,r,0,Math.PI*2,true);ctx.fill('evenodd');ctx.restore();},
  endCard(k){bgFill(P.night);ctx.save();ctx.globalAlpha=k;txt('ราตรีสวัสดิ์!',540,780,110,P.gold,{f:'Pattaya'});txt('ไฟแจ้งสถานะกำลังประชุม',540,940,64,'#fff',{f:'Pattaya'});txt('อยู่ในตะกร้าด้านล่าง',540,1040,56,P.gold,{f:'Pattaya'});ctx.restore();},
};
