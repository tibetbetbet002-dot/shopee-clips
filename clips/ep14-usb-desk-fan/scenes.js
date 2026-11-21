// EP.14 พยากรณ์อากาศโต๊ะคอม — แนวรายงานอากาศทีวี (พัดลม USB ตั้งโต๊ะ)
OL = '#0d2240'; LW = 6;
const P = {sky:'#5ec8ff',sky2:'#1f7ae0',navy:'#0d2240',orange:'#ff7a1a',sun:'#ffd23f',hot:'#ff4b3e',cool:'#3ad1ff',skin:'#f2c6a2',hair:'#2a1a10',desk:'#d9a066'};

function caster(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);
  ell(10,10,130,160);fs(P.hair);
  poly([-140,140,140,140,160,520,-160,520]);fs('#ff7a8a');poly([-50,140,0,190,50,140]);fs('#fff',5);
  if(o.point){line([140,200,280,120,380,60],32,OL);line([140,200,280,120,380,60],20,'#ff7a8a');circ(392,52,24);fs(P.skin,5);line([400,48,520,-30],8,'#555');}
  else{line([140,200,190,330],32,OL);line([140,200,190,330],20,'#ff7a8a');}
  line([-140,200,-190,330],32,OL);line([-140,200,-190,330],20,'#ff7a8a');
  rr(-22,92,44,56,10);fs(P.skin);ell(0,0,92,106);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-96,30);ctx.quadraticCurveTo(-110,-120,10,-112);ctx.quadraticCurveTo(110,-104,96,0);ctx.quadraticCurveTo(30,-70,-96,30);fs(P.hair);
  for(const ex of[-34,34]){ell(ex,2,13,15);fs('#fff',4);circ(ex,4,6);ctx.fillStyle=OL;ctx.fill();}
  line([-52,-30,-16,-34],5);line([16,-34,52,-30],5);
  ctx.beginPath();ctx.arc(0,44,24,0.15*Math.PI,0.85*Math.PI);ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.stroke();ell(0,56,12+m*6,2+m*14);fs('#c0304a',4);
  ctx.restore();}

function officeGuy(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);
  const melt=o.melt||0;
  ctx.beginPath();ctx.moveTo(-140,140);ctx.lineTo(140,140);ctx.lineTo(160,480);for(let i=0;i<=6;i++)ctx.lineTo(160-i*53,480+(i%2?40*melt:0));ctx.closePath();fs('#9ad0ff');
  rr(-24,92,48,56,10);fs(P.skin);ctx.save();ctx.scale(1+melt*0.06,1-melt*0.05);ell(0,0,96,108);fs(P.skin);ctx.restore();
  const wind=o.wind||0;
  ctx.beginPath();ctx.moveTo(-96,0);for(let i=0;i<7;i++){const a=Math.PI*(1+i/6);ctx.lineTo(Math.cos(a)*100-wind*(i*8+Math.sin(T*12+i)*10),-30+Math.sin(a)*100);}ctx.closePath();fs(P.hair);
  for(const ex of[-34,34]){if(o.happy){ctx.beginPath();ctx.arc(ex,4,14,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}
    ell(ex,4,13,melt?9:15);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}
  ell(0,58,14+m*6,4+m*14);fs('#a0303e',4);
  if(o.sweat)for(let i=0;i<4;i++){const ph=(T*1.3+i/4)%1;const sx=[-90,90,-60,70][i];circ(sx,-40+ph*120,8);ctx.fillStyle='#8fd8ff';ctx.fill();}
  ctx.restore();}

function fan(x,y,s,spin){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-70,140,140,30,12);fs('#e9edf2');rr(-14,60,28,90,8);fs('#e9edf2');
  circ(0,0,130);fs('#f7f9fc');ctx.save();ctx.rotate(spin);for(let i=0;i<5;i++){ctx.rotate(Math.PI*2/5);ell(65,0,58,24);fs(P.cool,4);}ctx.restore();
  circ(0,0,28);fs('#c9d3dc',5);circ(0,0,130);fs(null,7);for(let i=0;i<8;i++){ctx.save();ctx.rotate(i*Math.PI/4);line([30,0,128,0],3,'#9aa');ctx.restore();}
  ctx.restore();}
function windLines(x,y,n=6,dir=1){for(let i=0;i<n;i++){const ph=(T*1.5+i/n)%1;ctx.save();ctx.globalAlpha=1-ph;const yy=y-120+i*48;
  curve([x+dir*ph*500,yy,x+dir*(ph*500+80),yy-14,x+dir*(ph*500+170),yy],8,'#ffffff');ctx.restore();}}
function deskMap(){ctx.save();rr(90,380,900,900,40);fs(P.desk,8);
  rr(200,700,520,190,20);fs('#5a6470',6);for(let r=0;r<3;r++)for(let c=0;c<8;c++)rr(225+c*60,725+r*55,48,42,6),fs('#9aa3b1',0);
  ell(840,780,70,100);fs('#e8edf2',6);circ(300,500,70);fs('#fff',6);circ(300,500,48);fs('#7a4a2a',0);
  rr(500,420,300,200,14);fs('#1a1d33',6);rr(516,436,268,168,8);fs('#7ec8f0',0);ctx.restore();}
function tempBadge(x,y,t,k,col=P.hot){if(k<=0)return;ctx.save();ctx.translate(x,y);const s=E.back(k);ctx.scale(s,s);circ(0,0,70);fs(col,6,'#fff');txt(t+'°',0,4,58,'#fff',{f:'Bai'});ctx.restore();}
function sunIcon(x,y,r){ctx.save();ctx.translate(x,y);ctx.rotate(T*0.8);for(let i=0;i<10;i++){ctx.rotate(Math.PI/5);line([r*1.2,0,r*1.6,0],10,P.sun);}ctx.restore();circ(x,y,r);fs(P.sun,6,'#fff');}

const SCENES={
 map(lt){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.sky2);g.addColorStop(1,P.sky);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  deskMap();sunIcon(900,450,50);
  tempBadge(300,820,38,prog(lt,0.3,0.6));tempBadge(780,560,40,prog(lt,0.6,0.9));tempBadge(860,1000,39,prog(lt,0.9,1.2));
  for(let i=0;i<5;i++){const x=200+i*170;ctx.save();ctx.globalAlpha=0.5;curve([x,1250,x+20,1200+Math.sin(T*6+i)*10,x,1150,x+20,1100],6,P.hot);ctx.restore();}
  caster(160,1200,0.6,{mouth:mouthFor('wx'),point:1});},
 sweat(lt,ln){bgFill('#ffcf8a');for(let i=0;i<8;i++){ctx.save();ctx.globalAlpha=0.3;curve([i*140,1400,i*140+30,1300+Math.sin(T*5+i)*20,i*140,1200,i*140+30,1100],8,'#ff7a1a');ctx.restore();}
  sunIcon(860,480,80);
  officeGuy(480,860,1.2,{mouth:mouthFor('man'),sweat:1,melt:prog(lt,0,ln.dur)});
  rr(-20,1260,1120,700,0);fs(P.desk);
  rr(860,700,50,360,25);fs('#fff',6);circ(885,1080,50);fs(P.hot,6);rr(872,lerp(1000,730,prog(lt,0,ln.dur)),26,300,13);fs(P.hot,0);},
 science(lt,ln){bgFill('#eaf6ff');
  rr(80,1050,920,200,30);fs('#f2c6a2',8);txt('ผิว',140,1150,48,OL,{f:'Bai',align:'left'});
  const k=prog(lt,0.3,ln.dur);
  for(let i=0;i<7;i++){const x=200+i*110;const r=lerp(30,4,clamp(k*1.2-i*0.05));ctx.beginPath();ctx.arc(x,1050-r*0.5,r,Math.PI,0);ctx.closePath();fs('#8fd8ff',5);
    for(let j=0;j<2;j++){const ph=(T*0.8+j*0.5+i*0.13)%1;ctx.save();ctx.globalAlpha=(1-ph)*k;curve([x,1020-ph*300,x+16,980-ph*300,x,940-ph*300],6,'#9ab');ctx.restore();}}
  windLines(80,820,7,1);txt('ลม →',150,660,56,P.sky2,{f:'Bai'});
  const c=E.back(prog(lt,ln.dur*0.55,ln.dur*0.8));if(c>0){ctx.save();ctx.translate(540,500);ctx.scale(c,c);rr(-320,-60,640,120,60);fs(P.cool,6);txt('เหงื่อระเหย = รู้สึกเย็นลง',0,4,50,'#fff',{f:'Bai',maxW:600});ctx.restore();}},
 forecast(lt,ln){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.sky2);g.addColorStop(1,P.sky);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  deskMap();const p=E.inOut(prog(lt,0,ln.dur));const sx=lerp(-150,560,p),sy=lerp(1500,850,p);
  ctx.save();ctx.translate(sx,sy);ctx.rotate(T*3);for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.beginPath();ctx.arc(60,0,90,Math.PI,Math.PI*1.8);ctx.lineWidth=26;ctx.strokeStyle=P.cool;ctx.stroke();}ctx.restore();
  circ(sx,sy,40);fs('#fff',6);
  ctx.setLineDash([20,14]);curve([-150,1500,200,1300,560,850],8,'#ffffff');ctx.setLineDash([]);
  txt('พายุลมเย็น',sx+40,sy-170,60,'#fff',{f:'Bai',sw:10,stroke:P.navy});},
 product(lt,ln){bgFill('#d8f3ff');for(let i=0;i<12;i++){const a=i/12*Math.PI*2+T*0.3;ctx.fillStyle=i%2?'#c2ecff':'#d8f3ff';ctx.beginPath();ctx.moveTo(540,950);ctx.arc(540,950,1500,a,a+Math.PI/12);ctx.fill();}
  const k=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,960);ctx.scale(k,k);fan(0,0,1.7,T*25);ctx.restore();
  rr(700,1220,260,150,16);fs('#2b2f3a');rr(714,1234,232,110,8);fs('#7ec8f0',0);curve([540,1250,600,1330,700,1300],10,'#333');
  windLines(780,900,6,1);
  const t2=E.back(prog(lt,ln.dur*0.6,ln.dur*0.85));if(t2>0){ctx.save();ctx.translate(300,560);ctx.scale(t2,t2);rr(-200,-55,400,110,55);fs(P.orange,6);txt('เสียบ USB ได้',0,4,52,'#fff',{f:'Bai'});ctx.restore();}},
 cool(lt,ln){bgFill('#bdeaff');rr(-20,1260,1120,700,0);fs(P.desk);
  officeGuy(400,880,1.1,{mouth:mouthFor('man'),happy:1,wind:1});fan(820,1100,0.8,T*25);windLines(720,860,6,-1);
  const d=ln.dur;[[0.05,'เย็นสบาย',780,470],[0.35,'เสียงเบา',300,470],[0.65,'ไม่กินที่',540,1380]].forEach(([f,t,x,y])=>{const kk=E.back(prog(lt,d*f,d*f+0.3));if(kk<=0)return;
    ctx.save();ctx.translate(x,y);ctx.scale(kk,kk);rr(-170,-50,340,100,50);fs(P.cool,6,'#fff');txt(t,0,4,52,'#fff',{f:'Bai'});ctx.restore();});},
 cta(lt){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.sky2);g.addColorStop(1,P.sky);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  const days=['จ','อ','พ','พฤ','ศ'];days.forEach((d,i)=>{const x=150+i*195;rr(x-80,420,160,220,20);fs('#ffffff33',4,'#fff');txt(d,x,465,40,'#fff',{f:'Bai'});
    ctx.save();ctx.translate(x,560);ctx.rotate(T*3);for(let j=0;j<3;j++){ctx.rotate(Math.PI*2/3);ell(30,0,28,12);ctx.fillStyle=P.cool;ctx.fill();}ctx.restore();});
  txt('ลมเย็นทั้งสัปดาห์',540,710,64,'#fff',{f:'Bai',sw:10,stroke:P.navy});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1040);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#fff';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs(P.orange);for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  txt('กดตะกร้าด้านล่าง',540,1250,76,P.sun,{f:'Bai',sw:12,stroke:P.navy});
  const ay=1350+Math.abs(Math.sin(T*6))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+50,460,ay,500,ay]);fs(P.sun,6);},
};

window.EP={font:'Bai',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.04*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Bai',size:58,col:'#ffffff',hl:'#ffd23f',sw:0,box:'#0d2240ee',boxR:0,boxPad:28,pop:'back',y:1600,lh:1.35},
  intro(t){bgFill(P.sky2);const k=E.back(prog(t,0,0.6));ctx.save();ctx.translate(540,880);ctx.scale(k,k);sunIcon(0,-60,90);ctx.restore();
    txt('รายงานอากาศ',540,1080,90,'#fff',{f:'Bai',sw:10,stroke:P.navy});},
  overlay(t){rr(0,110,W,120,0);fs('#0d2240dd',0);rr(0,110,230,120,0);fs(P.orange,0);txt('อากาศ',115,172,54,'#fff',{f:'Bai'});
    txt(TL.title,260,150,50,'#fff',{f:'Bai',align:'left',maxW:600});txt(TL.series,260,200,30,'#9fd8ff',{f:'Bai',align:'left'});
    rr(870,125,180,90,14);fs('#ffffff22',0);txt((38+Math.round(Math.sin(T)*1))+'°C',960,172,52,P.sun,{f:'Bai'});},
  outroGap:0.55,
  outro(k){ctx.save();ctx.globalAlpha=E.inOut(k);bgFill(P.sky2);ctx.restore();},
  endCard(k){bgFill(P.sky2);ctx.save();ctx.globalAlpha=k;sunIcon(540,640,70);txt('รายงานอากาศประจำโต๊ะ',540,820,70,'#fff',{f:'Bai'});
    txt('พัดลม USB ตั้งโต๊ะ',540,960,84,P.sun,{f:'Bai'});txt('อยู่ในตะกร้าด้านล่าง',540,1060,58,'#fff',{f:'Bai'});ctx.restore();},
};
