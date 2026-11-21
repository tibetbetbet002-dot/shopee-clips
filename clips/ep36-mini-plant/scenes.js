// EP.36 ตามหาความเขียวในป่าออฟฟิศ — แนวนักผจญภัย (ต้นไม้ปลอมจิ๋ว)
OL = '#2a2116'; LW = 7;
const P = {khaki:'#c8a96b',khaki2:'#a8894f',grey:'#9aa0a6',grey2:'#7b8187',green:'#3fae5a',green2:'#2d8a44',sky:'#cfe8d8',skin:'#e7b48c',pot:'#d97b4a',map:'#f0dfb4'};

function concrete(){bgFill('#b8bcc2');for(let i=0;i<8;i++){const x=i*150,h=500+hash(i)*500;ctx.fillStyle=i%2?P.grey:P.grey2;ctx.fillRect(x,1300-h,140,h);for(let r=0;r<h/70;r++){ctx.fillStyle='#6b7177';ctx.fillRect(x+20,1300-h+20+r*70,100,30);}}
  ctx.fillStyle='#8a9096';ctx.fillRect(-300,1300,W+600,800);for(let i=0;i<6;i++){curve([i*200,300,i*200+40,500+Math.sin(T+i)*20,i*200-20,700],12,'#6b7177');}}
function jungleFrame(){for(const sd of[-1,1]){ctx.save();ctx.translate(sd<0?0:W,0);ctx.scale(sd,1);for(let i=0;i<7;i++){ell(40,380+i*160,140,50,0.6+Math.sin(T+i)*0.05);fs(i%2?P.green:P.green2,5);}ctx.restore();}}
function explorer(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.3),y+boil(2,1.3));ctx.scale(s,s);
  poly([-140,130,140,130,160,450,-160,450]);fs(P.khaki);for(const px of[-70,70])rr(px-34,200,68,60,8),fs(P.khaki2,4);line([-130,150,130,420],12,'#6b4a2a');
  if(o.bino){rr(-80,-30,70,60,14);fs('#333');rr(10,-30,70,60,14);fs('#333');}
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,86,98);fs(P.skin);
  ell(0,-60,150,40);fs(P.khaki);ctx.beginPath();ctx.arc(0,-60,96,Math.PI,0);ctx.closePath();fs(P.khaki);rr(-96,-74,192,18,6);fs('#6b4a2a',0);
  if(!o.bino)for(const ex of[-30,30]){ell(ex,4,12,o.wow?18:14);fs('#fff',4);circ(ex,6,6);ctx.fillStyle=OL;ctx.fill();}
  ctx.beginPath();ctx.moveTo(-40,40);ctx.quadraticCurveTo(-20,30,0,40);ctx.quadraticCurveTo(20,30,40,40);ctx.lineWidth=8;ctx.strokeStyle='#5a3a1a';ctx.stroke();
  ell(0,62,12+m*6,3+m*14);fs('#9a3040',4);if(o.map){rr(120,180,200,140,6);fs(P.map,5);curve([140,280,200,220,260,260,300,200],5,'#c0392b');txt('X',300,200,30,'#c0392b',{f:'Itim'});}ctx.restore();}
function guide(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.3),y+boil(4,1.3));ctx.scale(s,s);poly([-120,120,120,120,140,420,-140,420]);fs(P.green2);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,82,92);fs(P.skin);ctx.beginPath();ctx.moveTo(-86,30);ctx.quadraticCurveTo(-90,-110,0,-104);ctx.quadraticCurveTo(90,-110,86,30);ctx.quadraticCurveTo(40,-50,-86,30);fs('#3a2010');rr(60,-40,30,140,14);fs('#3a2010');
  for(const ex of[-28,28]){ell(ex,4,11,13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,48,10+m*6,3+m*12);fs('#a03040',4);ctx.restore();}
function plant(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([-70,0,70,0,52,110,-52,110]);fs(P.pot);rr(-80,-10,160,24,8);fs('#c96a3a',4);
  for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*0.32+Math.sin(T*1.5+i)*0.04;ctx.save();ctx.rotate(a+Math.PI/2);ell(0,-90,22,80);fs(i%2?P.green:P.green2,4);ctx.restore();}
  if(o.face){circ(-24,60,7);ctx.fillStyle=OL;ctx.fill();circ(24,60,7);ctx.fill();ctx.beginPath();ctx.arc(0,74,14,0.1*Math.PI,0.9*Math.PI);ctx.lineWidth=4;ctx.strokeStyle=OL;ctx.stroke();}ctx.restore();}
function deskScene(){bgFill('#eef1f4');rr(-20,1100,1120,40,6);fs('#bfc5cc');ctx.fillStyle='#d5dae0';ctx.fillRect(-300,1140,W+600,800);
  rr(300,700,480,320,16);fs('#2b2d33');rr(318,718,444,284,8);fs('#9aa0a6',0);rr(500,1020,80,80,6);fs('#2b2d33');rr(320,1110,440,40,8);fs('#555a61');}
function note(t,x,y,k,col=P.map){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(-0.04);ctx.scale(E.back(k),E.back(k));rr(-300,-56,600,112,10);fs(col,6);txt(t,0,6,48,OL,{f:'Itim',maxW:560});ctx.restore();}

const SCENES={
 jungle(lt){concrete();jungleFrame();explorer(540,880,1.0,{mouth:mouthFor('explorer'),map:1});},
 grey(lt){deskScene();ctx.save();ctx.globalCompositeOperation='saturation';ctx.fillStyle='#888';ctx.fillRect(0,0,W,H);ctx.restore();guide(860,980,0.55,{mouth:mouthFor('guide')});note('มีแต่ เทา ดำ ขาว',540,520,prog(lt,0.3,0.6),'#e0e0e0');},
 fact(lt,ln){bgFill('#eaf5ee');ctx.save();ctx.translate(540,880);rr(-360,-240,720,480,20);fs('#fff',6);ctx.save();rr(-340,-220,680,440,14);ctx.clip();
  const g=ctx.createLinearGradient(0,-220,0,220);g.addColorStop(0,'#bfe7ff');g.addColorStop(1,'#7fd18b');ctx.fillStyle=g;ctx.fillRect(-340,-220,680,440);
  poly([-340,220,-200,40,-60,220]);fs(P.green2,0);poly([-100,220,80,-20,260,220]);fs(P.green,0);circ(220,-140,50);fs('#fff3a8',0);ctx.restore();ctx.restore();
  note('มองภาพธรรมชาติสั้นๆ = สมองได้พัก',540,1240,prog(lt,0.3,0.6));txt('*บางงานวิจัยพบ',540,1340,32,'#6b7177',{f:'Itim'});},
 why(lt,ln){bgFill('#eaf5ee');ctx.save();ctx.translate(540,880);ell(0,0,300,220);fs('#ffd6e0',6);const calm=prog(lt,0.2,ln.dur);
  for(let i=0;i<6;i++){const amp=lerp(40,6,calm);ctx.beginPath();for(let x=-240;x<=240;x+=10)ctx.lineTo(x,-100+i*40+Math.sin(x*0.05+T*6)*amp);ctx.lineWidth=5;ctx.strokeStyle=lerp(0,1,calm)>0.5?'#2fbf71':'#e07a9a';ctx.stroke();}ctx.restore();
  note('สีเขียว → ตาและสมองผ่อนคลาย',540,1260,prog(lt,0.3,0.6));},
 find(lt){concrete();jungleFrame();const k=E.back(prog(lt,0.3,0.8));ctx.save();ctx.translate(700,1150);ctx.scale(k,k);plant(0,0,1.2,{face:1});ctx.restore();
  for(let i=0;i<8;i++){const a=i*0.8+T;star(700+Math.cos(a)*220,1100+Math.sin(a)*160,20,7,4,T*3,'#fff7a8');}explorer(300,880,0.75,{mouth:mouthFor('explorer'),wow:1});note('ไม่ต้องรดน้ำ!',700,640,prog(lt,0.8,1.1));},
 place(lt){deskScene();plant(860,1100,0.7,{});ctx.save();ctx.setLineDash([16,10]);line([540,860,830,980],5,'#2fbf71');ctx.setLineDash([]);ctx.restore();note('วางข้างจอ เหลือบมองตอนพักตา',540,520,prog(lt,0.2,0.5));},
 tip(lt,ln){bgFill('#eaf5ee');[['20','นาที'],['20','ฟุต (~6 ม.)'],['20','วินาที']].forEach(([n,u],i)=>{const k=prog(lt,i*ln.dur*0.25,i*ln.dur*0.25+0.3);if(k<=0)return;ctx.save();ctx.translate(540,560+i*270);ctx.scale(E.back(k),E.back(k));
    circ(-260,0,100);fs(P.green,6);txt(n,-260,8,90,'#fff',{f:'Itim'});rr(-140,-60,460,120,20);fs('#fff',5);txt(['ทุก','มองไกล','นาน'][i]+' '+u,90,6,48,OL,{f:'Itim',maxW:420});ctx.restore();});},
 bonus(lt){deskScene();plant(540,1080,1.0,{});const k=prog(lt,0.3,1.3);ctx.save();ctx.translate(lerp(380,700,k),880);rr(-60,-30,120,60,16);fs('#ffe9b0',5);ctx.restore();
  for(let i=0;i<8;i++){const ph=(T*0.6+i/8)%1;circ(420+hash(i)*240,860+ph*200,4);ctx.fillStyle='#aaa';ctx.fill();}note('เช็ดฝุ่นที่ใบ เดือนละครั้ง',540,520,prog(lt,0.2,0.5));},
 price(lt){concrete();jungleFrame();plant(540,1150,1.1,{face:1});note('ราคาหลักสิบ · ไม่ตายแน่นอน',540,560,prog(lt,0.3,0.6));},
 cta(lt){concrete();jungleFrame();ctx.save();ctx.translate(540,880);rr(-340,-260,680,520,10);fs(P.map,8);curve([-280,180,-120,40,40,120,200,-60],8,'#c0392b');ctx.setLineDash([16,10]);ctx.restore();
  const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(740,800);ctx.scale(b*0.8,b*0.8);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.green;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();note('แผนที่สมบัติ: ตะกร้าด้านล่าง',540,1240,prog(lt,0.3,0.6));},
};

window.EP={font:'Itim',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Itim',size:62,col:'#ffffff',hl:'#b8f35a',stroke:'#2a2116',sw:14,pop:'back',y:1590,lh:1.3},
  intro(t){concrete();jungleFrame();const k=prog(t,0.2,1.0);ctx.save();ctx.globalAlpha=k;rr(240,780,600,220,20);fs(P.map,8);txt('ภารกิจตามหา',540,850,60,OL,{f:'Itim'});txt('สีเขียว',540,940,90,P.green2,{f:'Itim'});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,20);fs(P.map,6,'#6b4a2a');txt(TL.title,0,-6,64,OL,{f:'Itim',maxW:840});txt('🧭 '+TL.series,0,56,32,P.green2,{f:'Itim'});ctx.restore();},
  outroGap:0.55,
  outro(k){for(let i=0;i<14;i++){ell(hash(i)*W,hash(i*2)*H,E.inOut(k)*500,E.inOut(k)*200,hash(i)*3);ctx.fillStyle=i%2?P.green:P.green2;ctx.fill();}},
  endCard(k){bgFill(P.green2);ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,20);fs(P.map,8);txt('ภารกิจสำเร็จ!',540,770,90,P.green2,{f:'Itim'});txt('ต้นไม้ปลอมจิ๋ว',540,910,76,OL,{f:'Itim'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,'#6b4a2a',{f:'Itim'});ctx.restore();},
};
