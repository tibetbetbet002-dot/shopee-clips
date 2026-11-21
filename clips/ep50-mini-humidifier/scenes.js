// EP.50 นางงามผิวไม่แห้ง — แนวประกวดนางงาม (เครื่องเพิ่มความชื้นมินิ)
OL = '#2a1030'; LW = 6;
const P = {stage:'#3a0f4a',stage2:'#5a1a6a',gold:'#f6c945',pink:'#ff8fc8',sash:'#ffffff',skin:'#f3caa8',gown:'#ff5fa2',mist:'#e8f6ff',blue:'#7fd3ff'};

function pageant(){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#14051c');g.addColorStop(1,P.stage);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  for(let i=0;i<5;i++){const a=Math.sin(T*0.8+i*1.3)*0.4;ctx.save();ctx.translate(120+i*210,320);ctx.rotate(a);ctx.globalAlpha=0.16;ctx.fillStyle=i%2?P.pink:P.gold;poly([-40,0,40,0,240,1100,-240,1100]);ctx.fill();ctx.restore();}
  for(let i=0;i<30;i++){const tw=(Math.sin(T*4+i)+1)/2;circ(hash(i)*W,340+hash(i*2)*500,2+tw*3);ctx.fillStyle=`rgba(255,240,200,${tw})`;ctx.fill();}
  ctx.fillStyle=P.stage2;ell(540,1360,640,140);ctx.fill();ctx.fillStyle='#1c0824';ctx.fillRect(-300,1380,W+600,800);}
function queen(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);
  poly([-130,130,130,130,220,600,-220,600]);fs(P.gown);for(let i=0;i<20;i++){circ(-180+hash(i)*360,200+hash(i*2)*380,5);ctx.fillStyle='#fff';ctx.fill();}
  line([-110,140,110,420],34,OL);line([-110,140,110,420],26,P.sash);ctx.save();ctx.translate(0,280);ctx.rotate(0.62);txt('Miss โต๊ะคอม',0,0,22,P.gown,{f:'Itim'});ctx.restore();
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,84,96);fs(P.skin);ell(0,-10,120,140);ctx.save();ctx.globalCompositeOperation='destination-over';ctx.restore();
  ctx.beginPath();ctx.moveTo(-96,60);ctx.quadraticCurveTo(-110,-120,0,-110);ctx.quadraticCurveTo(110,-120,96,60);ctx.quadraticCurveTo(60,-60,0,-56);ctx.quadraticCurveTo(-60,-60,-96,60);fs('#4a2010');
  if(o.crown){poly([-60,-100,-40,-150,-20,-110,0,-170,20,-110,40,-150,60,-100]);fs(P.gold,5);circ(0,-150,8);fs(P.pink,0);}
  for(const ex of[-30,30]){if(o.wink&&ex>0){ctx.beginPath();ctx.arc(ex,4,12,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}ell(ex,2,13,15);fs('#fff',4);circ(ex,4,7);ctx.fillStyle='#5a2a40';ctx.fill();line([ex-14,-14,ex-20,-22],3);line([ex+14,-14,ex+20,-22],3);}
  ell(0,50,12+m*6,3+m*12);fs('#d0306a',4);ell(-56,30,14,7);ctx.fillStyle='#ff8fa3aa';ctx.fill();ell(56,30,14,7);ctx.fill();
  if(o.dry){ctx.save();ctx.globalAlpha=0.6;for(let i=0;i<8;i++)line([-60+hash(i)*120,-40+hash(i*2)*90,-50+hash(i)*120,-34+hash(i*2)*90],3,'#c9a080');ctx.restore();}ctx.restore();}
function host(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);poly([-130,120,130,120,150,440,-150,440]);fs('#111');poly([-30,120,0,190,30,120]);fs('#fff',4);poly([-24,140,0,156,24,140,24,162,0,150,-24,162]);fs(P.gold,3);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,82,92);fs(P.skin);ctx.beginPath();ctx.arc(0,-24,84,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#222');
  for(const ex of[-28,28]){ell(ex,4,11,13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,48,10+m*6,3+m*12);fs('#9a3040',4);line([120,180,180,100],16,OL);rr(160,40,40,70,10);fs('#c0c0c0',4);ctx.restore();}
function humidifier(x,y,s,on){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,100,110,24);fs('#ccc');rr(-100,-140,200,240,60);fs('#fdfdff');rr(-100,-20,200,120,40);fs(P.blue+'88',0);circ(0,40,14);fs(on?P.blue:'#999',3);
  if(on)for(let i=0;i<10;i++){const ph=(T*0.5+i/10)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.7;circ(Math.sin(i*2+T)*30*ph,-150-ph*320,18+ph*50);ctx.fillStyle=P.mist;ctx.fill();ctx.restore();}ctx.restore();}
function ac(x,y){rr(x-220,y-60,440,120,20);fs('#fff',6);for(let i=0;i<4;i++)line([x-190,y+20+i*8,x+190,y+20+i*8],3,'#bbb');for(let i=0;i<6;i++){const ph=(T*0.8+i/6)%1;ctx.save();ctx.globalAlpha=1-ph;line([x-160+i*60,y+70+ph*200,x-160+i*60,y+100+ph*200],5,P.blue);ctx.restore();}}
function card(t,y,k,col=P.gold){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.scale(E.back(k),E.back(k));rr(-390,-56,780,112,56);fs('#2a1030ee',5,col);txt(t,0,6,50,col,{f:'Itim',maxW:740});ctx.restore();}

const SCENES={
 stage(lt){pageant();host(300,920,0.8,{mouth:mouthFor('host')});queen(760,860,0.8,{});},
 answer(lt){pageant();queen(540,820,1.0,{mouth:mouthFor('queen'),dry:1});ac(540,520);},
 fact(lt,ln){pageant();ctx.save();ctx.translate(540,900);rr(-360,-60,720,120,60);fs('#ffffff22',5,'#fff');const v=lerp(0.25,0.5,E.inOut(prog(lt,0.3,ln.dur)));rr(-354,-54,708*v,108,54);fs(P.blue,0);txt('ความชื้น '+Math.round(v*100)+'%',0,8,56,'#fff',{f:'Itim'});ctx.restore();
  card('ความชื้นพอดี = สบายผิว สบายตา',560,prog(lt,0.3,0.6));},
 why(lt,ln){pageant();ac(540,640);ctx.save();ctx.translate(540,1050);for(let i=0;i<12;i++){const ph=(T*0.6+i/12)%1;const x=-300+hash(i)*600,y=200-ph*500;ctx.save();ctx.globalAlpha=1-ph;txt('💧',x,y,40,'#000',{f:'Itim'});ctx.restore();}ctx.restore();
  ctx.save();ctx.translate(540,640);line([0,70,0,-110],8,P.pink);poly([-20,-100,20,-100,0,-130]);fs(P.pink,0);ctx.restore();card('แอร์ดึงความชื้นออก พร้อมความร้อน',1300,prog(lt,0.3,0.6),P.pink);},
 gift(lt){pageant();queen(320,880,0.75,{mouth:mouthFor('queen')});const k=E.back(prog(lt,0.3,0.7));ctx.save();ctx.translate(780,1120);ctx.scale(k,k);humidifier(0,0,1,true);ctx.restore();
  for(let i=0;i<10;i++){const a=i*0.63+T;star(780+Math.cos(a)*220*k,1020+Math.sin(a)*160*k,16,6,4,T*3,P.gold);}},
 mist(lt,ln){pageant();rr(140,1220,800,40,8);fs('#c98b5a');humidifier(700,1160,0.9,true);ctx.save();ctx.translate(320,1170);rr(-160,-100,320,100,10);fs('#2b2d42',5);curve([160,-40,260,-20,380,-60],8,'#ddd');ctx.restore();
  card('ไอเย็นละเอียด · เสียบ USB · เงียบ',560,prog(lt,0.3,0.6));},
 tip(lt,ln){pageant();humidifier(540,1080,1.2,lt>1.0);const k=prog(lt,0.2,1.0);ctx.save();ctx.translate(lerp(900,640,k),lerp(700,900,k));rr(-40,-80,80,160,20);fs(P.blue+'cc',5);ctx.restore();card('ใช้น้ำสะอาด เปลี่ยนน้ำทุกวัน',560,prog(lt,0.2,0.5));},
 bonus(lt){pageant();rr(140,1220,800,40,8);fs('#c98b5a');humidifier(300,1160,0.8,true);ctx.save();ctx.translate(760,1170);rr(-160,-120,320,120,10);fs('#2b2d42',5);ctx.restore();
  ctx.save();ctx.setLineDash([14,10]);line([420,1080,600,1080],6,P.pink);ctx.setLineDash([]);ctx.restore();txt('↔ ห่างอุปกรณ์ไฟฟ้า',540,960,48,P.pink,{f:'Itim'});card('อย่าพ่นใส่คอม/เอกสารตรงๆ',560,prog(lt,0.2,0.5),P.pink);},
 crown(lt,ln){pageant();queen(540,860,0.95,{mouth:mouthFor('queen'),crown:lt>0.4});for(let i=0;i<40;i++){const x=hash(i)*W,y=((hash(i*3)*1600+T*300)%1600)+300;ctx.save();ctx.translate(x,y);ctx.rotate(T*4+i);ctx.fillStyle=[P.gold,P.pink,'#fff'][i%3];ctx.fillRect(-8,-4,16,8);ctx.restore();}
  card('และราคาไม่แพงค่ะ!',1300,prog(lt,0.3,0.6));},
 cta(lt){pageant();host(260,900,0.7,{mouth:mouthFor('host')});const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(720,1000);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);
  poly([-60,-150,-40,-200,-20,-160,0,-220,20,-160,40,-200,60,-150]);fs(P.gold,5);ctx.restore();card('มงกุฎของคุณ: ตะกร้าด้านล่าง',560,prog(lt,0.3,0.6));},
};

window.EP={font:'Itim',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Itim',size:60,col:'#ffffff',hl:'#f6c945',stroke:'#2a1030',sw:14,pop:'fade',y:1590,lh:1.3},
  intro(t){pageant();const k=prog(t,0.2,1.2);ctx.save();ctx.globalAlpha=k;txt('Miss โต๊ะคอม',540,860,110,P.gold,{f:'Sri2',sw:8,stroke:OL});txt('2026',540,990,80,P.pink,{f:'Sri2'});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,88);fs('#2a1030ee',6,P.gold);txt(TL.title,0,-6,70,P.gold,{f:'Sri2',maxW:840});txt('👑 '+TL.series,0,56,32,'#ffd6ec',{f:'Itim'});ctx.restore();},
  outroGap:0.6,
  outro(k){for(let i=0;i<20;i++){circ(hash(i)*W,hash(i*2)*H,E.inOut(k)*400*(0.5+hash(i*3)));ctx.fillStyle=i%2?P.gold:P.pink;ctx.fill();}},
  endCard(k){pageant();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,40);fs('#2a1030ee',8,P.gold);txt('มงลงแล้ว!',540,770,100,P.gold,{f:'Sri2'});txt('เครื่องเพิ่มความชื้นมินิ',540,910,64,'#fff',{f:'Itim'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.pink,{f:'Itim'});ctx.restore();},
};
