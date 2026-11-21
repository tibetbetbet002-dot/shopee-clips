// EP.13 ไลฟ์สดของมันต้องมี! — แนวไลฟ์ขายของ (ที่วางเอกสารข้างจอ)
OL = '#2a0a1a'; LW = 7;
const P = {pink:'#ff2e63',orange:'#ff9a3c',purple:'#6a2c70',purple2:'#b83b5e',cream:'#fff5e4',skin:'#f6cfb0',hair:'#3a1c12',shelf:'#e8b4a0'};
const COMMENTS=['สวัสดีค่าแม่ค้า','มาแล้วจ้า','ของเด็ดอะไรคะ','เอาค่ะ!','CF 1','ส่งไวไหม','ปวดคอเหมือนกันเลย','น่ารักมาก','สนใจค่ะ','ขอดูใกล้ๆ'];

function jane(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1),y+boil(2));ctx.scale(s,s);
  ell(0,20,140,170);fs(P.hair);
  poly([-150,140,150,140,180,470,-180,470]);fs(P.pink);poly([-50,140,0,200,50,140]);fs('#fff',5);
  if(o.wave){const w=Math.sin(T*10)*0.4;ctx.save();ctx.translate(150,180);ctx.rotate(-1.2+w);line([0,0,0,-170],34,OL);line([0,0,0,-170],22,P.skin);circ(0,-180,30);fs(P.skin,6);ctx.restore();}
  else if(o.hold){line([150,180,230,90,250,20],34,OL);line([150,180,230,90,250,20],22,P.skin);line([-150,180,-230,90,-250,20],34,OL);line([-150,180,-230,90,-250,20],22,P.skin);}
  else{line([150,180,200,320],34,OL);line([150,180,200,320],22,P.skin);}
  rr(-24,92,48,56,10);fs(P.skin);ell(0,0,96,110);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-100,20);ctx.quadraticCurveTo(-100,-120,0,-116);ctx.quadraticCurveTo(100,-120,100,20);ctx.quadraticCurveTo(60,-60,-20,-56);ctx.quadraticCurveTo(-70,-50,-100,20);fs(P.hair);
  for(const ex of[-36,36]){if(o.wink&&ex>0){line([ex-14,2,ex+14,-2],7);continue;}ell(ex,2,15,17);fs('#fff',5);circ(ex,4,7);ctx.fillStyle=OL;ctx.fill();circ(ex+3,0,2.5);ctx.fillStyle='#fff';ctx.fill();}
  line([-56,-32,-18,-36],6);line([18,-36,56,-32],6);
  ell(0,58,18+m*8,5+m*18);fs('#c0304a',5);ell(-62,36,18,9);ctx.fillStyle='#ff8fa3aa';ctx.fill();ell(62,36,18,9);ctx.fill();
  ctx.restore();}

function holder(x,y,s,paper=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-120,-20,240,30,10);fs('#ddd');line([0,-10,0,-300],16);line([-100,0,-20,-260],12);
  ctx.save();ctx.translate(0,-310);ctx.rotate(-0.08);rr(-150,-200,300,330,12);fs('#f2f2f2');rr(-130,120,260,30,6);fs('#bbb');
  if(paper){rr(-130,-185,260,300,4);fs('#fff',4);for(let i=0;i<7;i++)line([-105,-150+i*38,lerp(60,105,hash(i)),-150+i*38],5,'#9aa');}
  rr(-40,-215,80,30,6);fs(P.pink,5);ctx.restore();ctx.restore();}

function monitorFront(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-70,-20,140,24,8);fs('#333');rr(-16,-140,32,120,6);fs('#333');
  rr(-260,-460,520,330,16);fs('#222');rr(-240,-440,480,290,8);fs('#7ec8f0',4);ctx.restore();}

function studio(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#ffd1dc');g.addColorStop(1,'#ffb5c5');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ctx.save();ctx.globalAlpha=0.5;circ(540,820,380);ctx.lineWidth=46;ctx.strokeStyle='#fff';ctx.stroke();ctx.restore();
  for(const y of[520,760]){rr(-20,y,260,18,6);fs(P.shelf);rr(840,y,260,18,6);fs(P.shelf);
    for(let i=0;i<3;i++){rr(20+i*70,y-80,52,80,10);fs(['#7bd3ea','#ffd166','#a1eebd'][i],5);rr(870+i*70,y-70,52,70,10);fs(['#f6a6ff','#7bd3ea','#ffd166'][i],5);}}}
function comment(name,text,x,y,k,big){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);ctx.translate(x,y);const s=big?1.3:1;ctx.scale(s,s);
  ctx.font='40px Mitr';const w=Math.max(ctx.measureText(text).width,ctx.measureText(name).width*0.8)+120;
  rr(0,-50,w,100,50);fs('#00000066',0);circ(46,0,30);fs(['#ffd166','#7bd3ea','#a1eebd'][name.length%3],0);
  txt(name,90,-18,28,'#ffe1ea',{f:'Mitr',align:'left'});txt(text,90,18,36,'#fff',{f:'Mitr',align:'left'});ctx.restore();}
function hearts(n=10,rate=1){for(let i=0;i<n;i++){const ph=(T*0.5*rate+i/n)%1;const x=960+Math.sin(ph*8+i)*40,y=1420-ph*700;
  ctx.save();ctx.globalAlpha=1-ph;ctx.translate(x,y);ctx.scale(0.9+hash(i)*0.6,0.9+hash(i)*0.6);ctx.beginPath();ctx.moveTo(0,12);ctx.bezierCurveTo(-30,-10,-14,-34,0,-18);ctx.bezierCurveTo(14,-34,30,-10,0,12);
  ctx.fillStyle=['#ff2e63','#ff9a3c','#f6a6ff','#ffd166'][i%4];ctx.fill();ctx.restore();}}

const SCENES={
 live(lt){studio();jane(540,860,1.15,{mouth:mouthFor('jane'),wave:1});rr(-20,1250,1120,700,0);fs('#c96b7e');
  for(let i=0;i<3;i++)comment(COMMENTS[i].length>6?'มายด์':'แพร',COMMENTS[i],60,1170-i*0,prog(lt,0.3+i*0.6,0.5+i*0.6)*(lt<0.9+i*0.6?1:0),0);},
 comment(lt){studio();jane(540,900,0.95,{mouth:0});rr(-20,1250,1120,700,0);fs('#c96b7e');
  const k=E.back(prog(lt,0,0.3));ctx.save();ctx.translate(540,560);ctx.scale(k,k);ctx.translate(-480,0);comment('ต้นออฟฟิศ','พิมพ์งานจากกระดาษ ปวดคอทุกที!',0,0,1,1);ctx.restore();},
 explain(lt,ln){bgFill('#fff5e4');
  rr(-20,1150,1120,60,6);fs('#c98b5a');ctx.fillStyle='#e0a36f';ctx.fillRect(-300,1210,W+600,800);
  monitorFront(720,1150,0.9);rr(380,1120,220,30,4);fs('#fff',4);
  const ph=(lt*1.6)%2<1?1:0;
  ctx.save();ctx.translate(300,860);ctx.rotate(ph?0.45:-0.1);rr(-26,90,52,70,10);fs(P.skin);ell(0,0,90,100);fs(P.skin);ctx.beginPath();ctx.arc(0,-20,90,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs(P.hair);
  ell(40,0,12,14);fs('#fff',4);circ(44,ph?8:-4,5);ctx.fillStyle=OL;ctx.fill();ctx.restore();
  rr(180,960,240,280,80);fs('#7bd3ea');
  const n=Math.floor(lt*1.6);txt('ก้ม ↓ เงย ↑ ×'+n,540,520,80,P.pink,{f:'Mitr',sw:10,stroke:'#fff'});
  for(let i=0;i<3;i++){const a=T*8+i*2;line([300+Math.cos(a)*120,740+Math.sin(a)*30,300+Math.cos(a)*150,740+Math.sin(a)*40],6,P.pink);}},
 reveal(lt){studio();jane(540,900,1.0,{mouth:mouthFor('jane'),hold:1});rr(-20,1250,1120,700,0);fs('#c96b7e');
  const k=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,830);ctx.scale(k*0.8,k*0.8);holder(0,0,1);ctx.restore();
  for(let i=0;i<10;i++){const a=i*0.63+T*2;star(540+Math.cos(a)*360,620+Math.sin(a)*240,26,9,4,T*3,'#fff');}
  const s=E.back(prog(lt,0.4,0.7));if(s>0){ctx.save();ctx.translate(820,420);ctx.rotate(0.15);ctx.scale(s,s);star(0,0,130,90,12,0,'#ffd166',6);txt('ของเด็ด!',0,6,50,OL,{f:'Mitr'});ctx.restore();}},
 demo(lt){bgFill('#fff5e4');rr(-20,1200,1120,60,6);fs('#c98b5a');ctx.fillStyle='#e0a36f';ctx.fillRect(-300,1260,W+600,800);
  monitorFront(400,1200,0.85);holder(860,1200,0.8);
  ctx.setLineDash([22,14]);line([120,880,1020,880],7,'#2fbf71');ctx.setLineDash([]);
  const k=E.back(prog(lt,0.4,0.7));if(k>0){ctx.save();ctx.translate(540,560);ctx.scale(k,k);rr(-300,-60,600,120,60);fs('#2fbf71',6);txt('ระดับเดียวกับจอ',0,4,58,'#fff',{f:'Mitr'});ctx.restore();}},
 buy(lt){studio();jane(540,900,1.0,{mouth:0,wink:1});rr(-20,1250,1120,700,0);fs('#c96b7e');hearts(26,3);
  const cs=['เอาครับแม่ค้า!','เอา 2','CF ค่ะ','เอาด้วย!','ของหมดยัง','เอา 1'];
  cs.forEach((c,i)=>{const k=prog(lt,i*0.18,i*0.18+0.2);comment(['บอส','แอน','ต้น','นุ่น','ปอ','บี'][i],c,40+(i%2)*120,560+i*120,k,0);});},
 price(lt,ln){bgFill(P.purple);for(let i=0;i<16;i++){const a=i/16*Math.PI*2+T*0.4;ctx.fillStyle=i%2?P.purple2:P.purple;ctx.beginPath();ctx.moveTo(540,900);ctx.arc(540,900,1500,a,a+Math.PI/16);ctx.fill();}
  const k=E.elastic(prog(lt,0,0.8));ctx.save();ctx.translate(540,860);ctx.rotate(-0.08);ctx.scale(k,k);rr(-340,-140,680,280,30);fs('#ffd166',10);txt('หลักร้อย',0,10,150,P.pink,{f:'Mitr',sw:12,stroke:'#fff'});ctx.restore();
  const left=Math.max(0,9-Math.floor(lt*3));rr(290,1140,500,100,50);fs(P.pink,6,'#fff');txt('ของมีจำกัด! เหลือ '+left,540,1192,48,'#fff',{f:'Mitr'});},
 cta(lt){studio();hearts(16,2);
  rr(140,560,800,300,30);fs('#fff',6);holder(300,840,0.5);txt('ที่วางเอกสารข้างจอ',650,660,48,OL,{f:'Mitr'});txt('ราคาหลักร้อย',650,740,52,P.pink,{f:'Mitr'});
  rr(470,780,360,60,30);fs(P.pink,0);txt('ปักตะกร้าแล้ว!',650,812,36,'#fff',{f:'Mitr'});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1120);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#fff';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs(P.orange);for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  const ay=1330+Math.abs(Math.sin(T*6))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+50,460,ay,500,ay]);fs(P.pink,6);},
};

window.EP={font:'Mitr',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*(1-E.out(prog(lt,0,0.25)))+(name==='live'?0.03*Math.sin(T*2):0);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mitr',size:56,col:'#2a0a1a',hl:'#ff2e63',sw:0,box:'#ffffffee',boxLine:6,boxLineCol:'#ff2e63',boxR:40,boxPad:30,pop:'back',y:1600,lh:1.35},
  intro(t){studio();const k=E.back(prog(t,0,0.5));ctx.save();ctx.translate(540,900);ctx.scale(k,k);rr(-260,-90,520,180,90);fs(P.pink,8,'#fff');txt('● LIVE',0,6,100,'#fff',{f:'Mitr'});ctx.restore();},
  overlay(t){rr(30,100,560,96,48);fs('#00000055',0);circ(80,148,38);fs('#ffd166',5,'#fff');txt('เจน',80,150,30,OL,{f:'Mitr'});
    txt('เจนรีวิวโต๊ะคอม',135,128,34,'#fff',{f:'Mitr',align:'left'});rr(135,152,110,34,8);fs(P.pink,0);txt('LIVE',190,170,26,'#fff',{f:'Mitr'});
    txt('👁 '+(1200+Math.floor(T*53)).toLocaleString(),260,170,28,'#fff',{f:'Mitr',align:'left'});
    rr(30,215,1020,80,20);fs('#00000044',0);txt(TL.title+' · '+TL.series,540,256,40,'#fff',{f:'Mitr',maxW:980});hearts(8,1);},
  outroGap:0.55,
  outro(k){ctx.fillStyle=`rgba(0,0,0,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);txt('ไลฟ์จบแล้ว',540,960,90,`rgba(255,255,255,${k})`,{f:'Mitr'});},
  endCard(k){bgFill('#1a0a14');ctx.save();ctx.globalAlpha=k;txt('ไลฟ์จบแล้ว ขอบคุณค่ะ',540,780,80,'#fff',{f:'Mitr'});
    txt('ที่วางเอกสารข้างจอ',540,950,80,P.pink,{f:'Mitr'});txt('อยู่ในตะกร้าด้านล่าง',540,1050,58,'#ffd166',{f:'Mitr'});ctx.restore();},
};
