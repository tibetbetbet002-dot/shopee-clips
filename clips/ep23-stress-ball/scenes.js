// EP.23 แร็ปคลายเครียด — แนวแร็ปแบตเทิล กำแพงกราฟฟิตี (ลูกบอลบีบคลายเครียด)
OL = '#0c0c12'; LW = 8;
const P = {brick:'#6b2f2a',brick2:'#5a2622',neon:'#39ff14',pink:'#ff2bd6',cyan:'#22e3ff',yellow:'#ffe600',skin1:'#8d5a3b',skin2:'#f1c39d',ball:'#ff4f9a'};
const BEAT=60/92;
const beat=()=>Math.pow(1-((T%BEAT)/BEAT),3);

function wall(){bgFill(P.brick);for(let r=0;r<30;r++)for(let c=0;c<10;c++){ctx.fillStyle=(r+c)%3?P.brick2:'#7a3530';ctx.fillRect(c*120+(r%2)*60-60,300+r*48,114,42);}
  ctx.save();ctx.globalAlpha=0.85;[['CHILL',180,520,P.cyan,-0.2],['MC',860,480,P.pink,0.15],['บีบ!',300,760,P.neon,0.1]].forEach(([t,x,y,c,r])=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);txt(t,0,0,110,c,{f:'K',w:800,sw:14,stroke:OL});ctx.restore();});ctx.restore();
  ctx.fillStyle='#1a1a22';ctx.fillRect(-300,1320,W+600,800);}
function mc(x,y,s,o={}){const m=o.mouth||0,b=beat();ctx.save();ctx.translate(x,y+b*14);ctx.scale(s,s);ctx.rotate((o.lean||0)+Math.sin(T*6.5)*0.03);
  poly([-160,140,160,140,190,480,-190,480]);fs(o.f?'#7b2cbf':'#111');txt(o.f?'MC2':'MC1',0,300,70,o.f?P.yellow:P.neon,{f:'K',w:800});
  ctx.beginPath();ctx.arc(0,150,90,0.2,Math.PI-0.2);ctx.lineWidth=10;ctx.strokeStyle=P.yellow;ctx.stroke();
  line([150,200,240,120,250,40],30,OL);line([150,200,240,120,250,40],20,o.f?'#7b2cbf':'#111');rr(220,-40,50,80,20);fs('#333',5);circ(245,-50,32);fs('#888',5);
  rr(-22,92,44,56,10);fs(o.f?P.skin2:P.skin1);ell(0,0,92,104);fs(o.f?P.skin2:P.skin1);
  if(o.f){for(const sx of[-1,1]){ctx.beginPath();ctx.arc(sx*70,-60,50,0,Math.PI*2);fs('#2a1a10');}}
  ctx.beginPath();ctx.arc(0,-30,96,Math.PI*1.05,Math.PI*1.95);ctx.closePath();fs(o.f?'#2a1a10':P.cyan);if(!o.f){rr(-20,-60,180,30,12);fs(P.cyan);}
  rr(-80,-24,70,30,8);fs(OL,0);rr(10,-24,70,30,8);fs(OL,0);line([-10,-10,10,-10],6);
  ell(0,56,18+m*8,4+m*16);fs('#7a1030',5);ctx.restore();}
function boombox(x,y,s){const b=beat();ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-220,-110,440,220,20);fs('#222');rr(-180,-160,360,50,10);fs('#333');
  for(const cx of[-120,120]){circ(cx,10,70+b*8);fs('#111',6);circ(cx,10,30);fs('#555',4);}rr(-40,-70,80,40,6);fs(P.cyan,3);ctx.restore();}
function ball(x,y,r,sq,face){ctx.save();ctx.translate(x,y);ctx.scale(1+sq*0.35,1-sq*0.35);circ(0,0,r);fs(P.ball,7);for(let i=0;i<10;i++){const a=i*0.63;circ(Math.cos(a)*r*0.6,Math.sin(a)*r*0.6,r*0.08);ctx.fillStyle='#ff8fbf';ctx.fill();}
  if(face){circ(-r*0.25,-r*0.1,r*0.08);ctx.fillStyle=OL;ctx.fill();circ(r*0.25,-r*0.1,r*0.08);ctx.fill();ctx.beginPath();ctx.arc(0,r*0.1,r*0.2,0.1*Math.PI,0.9*Math.PI);ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.stroke();}ctx.restore();}
function tag(t,x,y,k,col){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(-0.06);ctx.scale(E.back(k),E.back(k));txt(t,0,0,76,col,{f:'K',w:800,sw:12,maxW:900});ctx.restore();}
function handSq(x,y,sq){ctx.save();ctx.translate(x,y);rr(-110,-60,220,200,80);fs(P.skin2,7);for(let i=0;i<4;i++){rr(-100+i*52,-80+sq*40,46,110-sq*30,22);fs(P.skin2,6);}ctx.restore();}

const SCENES={
 stage(lt){wall();boombox(540,1240,0.9);mc(330,880,0.85,{mouth:mouthFor('mc1'),lean:-0.08});mc(780,900,0.8,{f:1,lean:0.06});
  for(let i=0;i<3;i++){const ph=(T*2+i/3)%1;ctx.save();ctx.globalAlpha=1-ph;ctx.strokeStyle=P.neon;ctx.lineWidth=6;circ(540,1240,120+ph*200);ctx.stroke();ctx.restore();}},
 answer(lt){wall();mc(560,900,1.1,{f:1,mouth:mouthFor('mc2')});tag('พักมือ!',300,560,prog(lt,0.4,0.7),P.yellow);},
 fact(lt,ln){wall();ctx.save();ctx.translate(540,950);const sh=Math.sin(T*30)*4;ctx.translate(sh,0);
  rr(-300,-60,600,300,40);fs('#ddd',7);for(let r=0;r<3;r++)for(let c=0;c<8;c++)rr(-270+c*68,-30+r*68,56,56,8),fs('#999',0);
  handSq(-150,-40,0.2);handSq(150,-40,0.2);ctx.restore();
  for(let i=0;i<6;i++){const a=T*8+i;line([390+Math.cos(a)*100,880+Math.sin(a)*60,390+Math.cos(a)*140,880+Math.sin(a)*90],6,P.pink);}
  tag('มือเกร็ง!',540,560,prog(lt,0.3,0.6),P.pink);},
 why(lt,ln){bgFill('#14081f');const k=prog(lt,0,ln.dur);
  ctx.save();ctx.translate(540,920);rr(-380,-90,760,180,90);fs('#5a1f3a',7);
  const flow=lerp(1,0.25,k);for(let i=0;i<12;i++){const ph=(T*flow*0.8+i/12)%1;circ(-360+ph*720,Math.sin(ph*12)*30,14);ctx.fillStyle='#ff4d6d';ctx.fill();}
  for(let i=0;i<5;i++){const x=-300+i*150;line([x,-90,x+20,-110-k*30],6,P.yellow);}ctx.restore();
  tag('เกร็งค้าง = เลือดไหลน้อย',540,620,prog(lt,0.2,0.5),P.cyan);tag('ล้าเร็ว!',540,1200,prog(lt,ln.dur*0.6,ln.dur*0.75),P.pink);},
 drop(lt){wall();const b=beat();ball(540,920,180+b*20,(Math.sin(lt*7)+1)/2*0.6,true);tag('ลูกบอลบีบ!',540,580,prog(lt,0.1,0.4),P.neon);
  for(let i=0;i<10;i++){const a=i*0.63+T;star(540+Math.cos(a)*330,920+Math.sin(a)*260,22,8,4,T*3,P.yellow);}},
 rhythm(lt){wall();const sq=(Math.sin(lt*7)+1)/2;ball(540,900,150,sq*0.7,false);handSq(540,980,sq);
  const n=Math.min(10,Math.floor(lt*7/(Math.PI*2))+1);txt(n+'/10',540,620,130,P.neon,{f:'K',w:800,sw:14});},
 tip(lt){wall();const k=(Math.sin(lt*4)+1)/2;
  ctx.save();ctx.translate(540,930);for(let i=0;i<5;i++){const a=-0.9+i*0.45;ctx.save();ctx.rotate(a*lerp(0.2,1,k));rr(-24,-220,48,200,24);fs(P.skin2,7);ctx.restore();}circ(0,0,130);fs(P.skin2,7);ctx.restore();
  tag('กางนิ้ว ↔ กำมือ',540,600,prog(lt,0.2,0.5),P.yellow);tag('ทุกชั่วโมง × 10',540,1250,prog(lt,1.0,1.3),P.cyan);},
 bonus(lt){wall();const a=Math.sin(T*3)*0.5;
  ctx.save();ctx.translate(540,1000);circ(0,-260,70);fs(P.skin2,6);line([0,-190,0,60],16);line([0,-150,Math.cos(a-1.6)*160,-150+Math.sin(a-1.6)*160],14);line([0,-150,-Math.cos(-a-1.6)*160,-150+Math.sin(-a-1.6)*160],14);
  line([0,60,-60,240],14);line([0,60,60,240],14);ctx.restore();tag('หมุนข้อมือ · ยืดแขน · ลุกเดิน',540,620,prog(lt,0.2,0.5),P.neon);},
 win(lt,ln){wall();mc(330,900,0.8,{mouth:mouthFor('mc2'),f:1});ball(780,1050,110,0.2,true);
  const c=E.back(prog(lt,0.3,0.6));ctx.save();ctx.translate(780,820);ctx.rotate(0.1);ctx.scale(c,c);rr(-170,-55,340,110,14);fs(P.yellow,7);txt('หลักสิบ',0,4,62,OL,{f:'K',w:800});ctx.restore();},
 cta(lt){wall();boombox(540,1240,0.7);const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,880);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.neon;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  tag('ตะกร้าด้านล่าง ↓',540,600,prog(lt,0.2,0.5),P.neon);},
};

window.EP={font:'K',scenes:SCENES,
  camera(name,lt){const s=1+0.025*beat();ctx.translate(540,960);ctx.scale(s,s);ctx.rotate(Math.sin(T*1.5)*0.01);ctx.translate(-540,-960);},
  sub:{f:'K',w:800,size:62,col:'#ffffff',hl:'#39ff14',stroke:'#0c0c12',sw:16,pop:'back',y:1580,lh:1.3},
  intro(t){wall();const k=E.back(prog(t,0,0.5));ctx.save();ctx.translate(540,900);ctx.rotate(-0.08);ctx.scale(k,k);txt('VS',0,0,300,P.yellow,{f:'K',w:800,sw:20});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,190);ctx.rotate(-0.03);rr(-450,-85,900,170,12);fs('#0c0c12ee',6,P.neon);txt(TL.title,0,-6,80,P.neon,{f:'K',w:800,maxW:840});txt(TL.series,0,56,32,'#fff',{f:'K',w:600});ctx.restore();},
  outroGap:0.5,
  outro(k){ctx.fillStyle='#0c0c12';const h=E.inOut(k)*H;ctx.fillRect(0,0,W,h/2);ctx.fillRect(0,H-h/2,W,h/2);},
  endCard(k){bgFill('#0c0c12');ctx.save();ctx.globalAlpha=k;txt('MIC DROP!',540,780,130,P.neon,{f:'K',w:800});txt('ลูกบอลบีบคลายเครียด',540,940,72,'#fff',{f:'K',w:800});txt('อยู่ในตะกร้าด้านล่าง',540,1040,58,P.pink,{f:'K',w:800});ctx.restore();},
};
