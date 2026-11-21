// EP.26 ห้องฉุกเฉิน: ข้อมือ — แนวซีรีส์หมอ ER (แผ่นรองข้อมือคีย์บอร์ด)
OL = '#0b2230'; LW = 6;
const P = {wall:'#dff3f1',wall2:'#c7e8e4',teal:'#13a89e',scrub:'#3ab0c9',coat:'#ffffff',red:'#e63946',ecg:'#39ff88',skin:'#f0c4a0',skin2:'#d89c74',dark:'#0b2230',gel:'#4cc3ff'};

function hospital(){bgFill(P.wall);ctx.fillStyle=P.wall2;ctx.fillRect(0,330,W,90);for(let i=0;i<6;i++){rr(60+i*170,450,120,180,8);fs('#ffffff',4);}
  ctx.save();ctx.translate(900,520);rr(-30,-90,60,180,6);fs(P.red,0);rr(-90,-30,180,60,6);fs(P.red,0);ctx.restore();ctx.fillStyle='#b9dcd8';ctx.fillRect(-300,1300,W+600,800);}
function ecg(x,y,w,h,bpm,col=P.ecg){rr(x,y,w,h,14);fs('#082028',5);ctx.save();ctx.beginPath();ctx.rect(x+10,y+10,w-20,h-20);ctx.clip();ctx.beginPath();
  for(let i=0;i<=w;i+=4){const t=(i/w*3+T*bpm/60)%1;const v=t<0.1?0:t<0.13?-0.9:t<0.16?0.6:t<0.2?-0.1:0;const yy=y+h/2+v*h*0.4;i?ctx.lineTo(x+i,yy):ctx.moveTo(x+i,yy);}
  ctx.lineWidth=5;ctx.strokeStyle=col;ctx.stroke();ctx.restore();txt('♥ '+bpm,x+w-70,y+30,28,col,{f:'Bai'});}
function person(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(o.seed||1,1.2),y+boil((o.seed||1)+1,1.2));ctx.scale(s,s);
  poly([-140,130,140,130,170,470,-170,470]);fs(o.coat?P.coat:P.scrub);if(o.coat){line([-20,140,-40,470],4);rr(30,200,70,40,6);fs(P.red,0);}
  if(o.steth){ctx.beginPath();ctx.arc(0,150,70,0.1,Math.PI-0.1);ctx.lineWidth=7;ctx.strokeStyle='#333';ctx.stroke();circ(-50,220,14);fs('#aaa',4);}
  rr(-22,88,44,56,10);fs(o.dark?P.skin2:P.skin);ell(0,0,88,100);fs(o.dark?P.skin2:P.skin);
  if(o.cap){ctx.beginPath();ctx.arc(0,-24,92,Math.PI,0);ctx.closePath();fs(P.teal);}else{ctx.beginPath();ctx.arc(0,-24,90,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs(o.f?'#3a2016':'#1a1a1a');if(o.f){rr(50,-60,40,140,20);fs('#3a2016');}}
  for(const ex of[-32,32]){ell(ex,0,13,o.shock?17:13);fs('#fff',4);circ(ex,2,5);ctx.fillStyle=OL;ctx.fill();}
  line([-50,-28,-14,o.serious?-24:-32],5);line([14,o.serious?-24:-32,50,-28],5);
  if(o.mask){rr(-60,20,120,70,20);fs('#bfe8ff',4);}else{ell(0,52,12+m*6,3+m*14);fs('#9a3040',4);}ctx.restore();}
function gurney(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-300,-30,600,60,20);fs('#e9eef2');line([-260,30,-260,140],10);line([260,30,260,140],10);circ(-260,150,20);fs('#555',4);circ(260,150,20);fs('#555',4);
  rr(-280,-80,200,60,24);fs('#fff',4);ctx.restore();}
function forearm(x,y,s,ang,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-420,-44,420,88,44);fs(o.xray?'#0e2a40':P.skin,5,o.xray?'#8fd3ff':OL);
  if(o.xray){line([-400,-10,0,-10],12,'#e8f4ff');line([-400,16,0,16],10,'#e8f4ff');}
  ctx.save();ctx.rotate(-ang*Math.PI/180);rr(-10,-46,220,92,40);fs(o.xray?'#0e2a40':P.skin,5,o.xray?'#8fd3ff':OL);if(o.xray){for(let i=0;i<4;i++)rr(30+i*44,-28,34,56,12),fs('#e8f4ff',0);}ctx.restore();
  if(o.xray){const p=o.press||0;ctx.save();ctx.strokeStyle=`rgba(255,80,80,${p})`;ctx.lineWidth=8;circ(0,0,70);ctx.stroke();ctx.restore();line([-380,4,0,4,140,4-ang*1.6],8-p*4,'#ffd34d');}
  ctx.restore();}
function edge(x,y,w){rr(x,y,w,30,4);fs('#c98b5a',5);rr(x,y+30,w,400,0);fs('#a86f42',0);}
function rest(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();ctx.moveTo(-220,0);ctx.quadraticCurveTo(-220,-70,-140,-70);ctx.lineTo(140,-70);ctx.quadraticCurveTo(220,-70,220,0);ctx.closePath();fs(P.gel,5);
  ell(-60,-46,90,12);ctx.fillStyle='#ffffff66';ctx.fill();rr(-230,0,460,20,8);fs('#333',4);ctx.restore();}
function chip(t,x,y,k,col=P.teal){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(E.back(k),E.back(k));rr(-260,-50,520,100,10);fs(col,5);txt(t,0,4,48,'#fff',{f:'Bai',maxW:500});ctx.restore();}

const SCENES={
 rush(lt){hospital();const x=lerp(1300,560,E.out(prog(lt,0,0.8)));gurney(x,1150,1);person(x-120,1060,0.6,{seed:9,shock:1});person(x+380,880,0.8,{mouth:mouthFor('nurse'),cap:1,seed:3});
  ecg(80,380,420,180,128,P.red);},
 scan(lt){hospital();person(260,880,0.85,{mouth:mouthFor('doc'),coat:1,f:1,steth:1,serious:1,seed:5});
  ctx.save();ctx.translate(560,0);edge(0,1150,600);forearm(380,1100,0.8,25);rr(560,1140,140,26,8);fs('#555',4);ctx.restore();
  ctx.save();ctx.strokeStyle=P.red;ctx.lineWidth=8;circ(940,1120,80);ctx.stroke();ctx.restore();chip('กระดก + กดขอบโต๊ะ',700,560,prog(lt,0.6,0.9),P.red);},
 explain(lt,ln){bgFill('#061722');rr(140,420,800,760,20);fs('#0a2030',6,'#8fd3ff');const p=E.inOut(prog(lt,0.3,ln.dur));forearm(620,800,1.0,28,{xray:1,press:p});
  chip('กดทับบริเวณข้อมือ',540,1260,prog(lt,0.4,0.7),P.red);chip('นานๆ → ชา + ปวด',540,1380,prog(lt,ln.dur*0.6,ln.dur*0.8),P.red);},
 why(lt,ln){bgFill('#061722');ctx.save();ctx.translate(540,900);ell(0,0,320,200);fs('#f0c4a0',6);ell(0,40,180,90);fs('#fbe3cc',5);
  const sq=E.inOut(prog(lt,0.4,ln.dur));for(let i=0;i<5;i++){circ(-90+i*45,30+Math.sin(i)*6,lerp(18,12,sq));fs('#f6f0e0',4);}circ(0,70-sq*20,lerp(26,14,sq));fs('#ffd34d',4);
  ctx.beginPath();ctx.arc(0,40,200,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=12;ctx.strokeStyle='#c98b5a';ctx.stroke();ctx.restore();
  txt('ภาพตัดขวางข้อมือ',540,620,52,'#8fd3ff',{f:'Bai'});txt('เส้นเอ็น + เส้นประสาท ผ่านช่องแคบ',540,1180,48,'#fff',{f:'Bai'});txt('*ภาพประกอบเพื่อความเข้าใจ',540,1260,30,'#8fb3c7',{f:'Bai'});},
 ask(lt){hospital();person(540,900,1.3,{mouth:mouthFor('nurse'),cap:1,shock:1,seed:3});ecg(640,380,400,160,140,P.red);},
 treat(lt){hospital();person(260,880,0.8,{mouth:mouthFor('doc'),coat:1,f:1,steth:1,seed:5});
  ctx.save();ctx.translate(700,1000);rr(-300,-200,600,400,10);fs('#fff',6);txt('Rx',-220,-130,70,P.red,{f:'Bai'});txt('แผ่นรองข้อมือ',40,-130,52,OL,{f:'Bai'});
  rest(0,60,0.9);ctx.restore();},
 tip(lt,ln){bgFill('#eaf7f5');edge(100,1180,880);ctx.save();ctx.translate(-40,0);rr(560,1130,360,50,8);fs('#555',4);ctx.restore();rest(340,1180,0.8);
  const typing=Math.floor(lt*2)%2===0;forearm(560,typing?1080:1110,0.85,typing?3:0);
  chip(typing?'พิมพ์: ข้อมือลอยนิดๆ':'หยุดพิมพ์: วางพักเบาๆ',540,620,1,typing?P.teal:'#2a9d8f');},
 bonus(lt,ln){bgFill('#eaf7f5');const k=E.inOut(prog(lt,0.3,ln.dur*0.7));
  ctx.save();ctx.translate(540,1000);ctx.rotate(-lerp(0.18,0,k));rr(-360,-40,720,80,14);fs('#555',5);for(let i=0;i<10;i++)rr(-330+i*66,-26,54,30,6),fs('#999',0);ctx.restore();
  ctx.save();ctx.translate(880,1040);ctx.rotate(lerp(0,1.5,k));rr(-10,0,20,lerp(60,0,k),4);fs('#333',0);ctx.restore();chip('พับขาคีย์บอร์ดลง',540,600,prog(lt,0.2,0.5));chip('คีย์บอร์ดราบ = ข้อมือกระดกน้อยลง',540,1280,prog(lt,ln.dur*0.6,ln.dur*0.8),'#2a9d8f');},
 stable(lt,ln){hospital();ecg(140,420,800,260,72,P.ecg);person(540,1100,0.7,{mouth:mouthFor('nurse'),cap:1,seed:3});chip('อาการคงที่ ✓ ราคาไม่แพง',540,780,prog(lt,0.3,0.6));},
 cta(lt){hospital();ctx.save();ctx.translate(540,880);rr(-320,-300,640,600,14);fs('#fff',6);txt('ใบสั่งยา',0,-230,60,P.red,{f:'Bai'});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.teal;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  txt('รับยาที่ตะกร้าด้านล่าง',0,200,50,OL,{f:'Bai'});ctx.restore();},
};

window.EP={font:'Bai',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.05*(1-E.out(prog(lt,0,0.25)));if(name==='rush')ctx.translate(Math.sin(T*25)*3,0);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Bai',size:56,col:'#ffffff',hl:'#7dffb0',sw:0,box:'#0b2230ee',boxLine:4,boxLineCol:'#e63946',boxR:6,boxPad:28,pop:'back',y:1600,lh:1.4},
  intro(t){bgFill('#061722');ecg(140,780,800,260,150,P.red);txt('ER',540,640,160,P.red,{f:'Bai'});},
  overlay(){rr(0,110,W,160,0);fs('#0b2230ee',0);rr(0,110,26,160,0);fs(P.red,0);txt(TL.title,60,170,68,'#fff',{f:'Bai',align:'left',maxW:780});txt(TL.series+' · ห้องฉุกเฉิน',62,235,32,'#7dffb0',{f:'Bai',align:'left'});
    if(Math.floor(T*2)%2)circ(1010,190,14),ctx.fillStyle=P.red,ctx.fill();},
  outroGap:0.55,
  outro(k){ctx.fillStyle=`rgba(6,23,34,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill('#061722');ctx.save();ctx.globalAlpha=k;ecg(140,560,800,160,72);txt('ผู้ป่วยปลอดภัย',540,860,90,'#7dffb0',{f:'Bai'});txt('แผ่นรองข้อมือคีย์บอร์ด',540,1000,66,'#fff',{f:'Bai'});txt('อยู่ในตะกร้าด้านล่าง',540,1090,54,'#8fd3ff',{f:'Bai'});ctx.restore();},
};
