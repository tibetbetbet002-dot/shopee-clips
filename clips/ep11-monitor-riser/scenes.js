// EP.11 ภารกิจกู้คอ — แนวภารกิจอวกาศในห้องนักบิน (ชั้นวางจอ)
OL = '#0b0f2a'; LW = 7;
const P = {space:'#070b24',deep:'#121a4a',hud:'#4df3ff',hud2:'#ff4fd8',orange:'#ff9f1c',suit:'#e8ecf5',visor:'#2a3f8f',wood:'#3a2f5a',stand:'#d8dde8',skin:'#f0c4a0'};

function stars(n=90,sp=20){for(let i=0;i<n;i++){const x=(hash(i)*W+T*sp*(0.3+hash(i*2)))%W,y=hash(i*3)*H;circ(x,y,1+hash(i*5)*2.5);ctx.fillStyle=`rgba(255,255,255,${0.4+0.6*hash(i*7)})`;ctx.fill();}}
function planet(x,y,r){circ(x,y,r);fs('#ff6f91',0);ctx.save();circ(x,y,r);ctx.clip();for(let i=0;i<5;i++){ctx.fillStyle='#ff9671';ctx.fillRect(x-r,y-r+i*r*0.45,r*2,r*0.18);}ctx.restore();
  ell(x,y,r*1.6,r*0.3,-0.3);ctx.lineWidth=8;ctx.strokeStyle='#ffc75f';ctx.stroke();}
function hudFrame(){ctx.strokeStyle=P.hud;ctx.lineWidth=4;for(const[x,y,sx,sy]of[[40,330,1,1],[1040,330,-1,1],[40,1460,1,-1],[1040,1460,-1,-1]])line([x,y+70*sy,x,y,x+70*sx,y],5,P.hud);}

function astro(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.5),y+boil(2,1.5));ctx.scale(s,s);ctx.rotate(o.tilt||0);
  rr(-150,120,300,330,90);fs(P.suit);rr(-60,180,120,90,14);fs('#c5cbe0',5);for(let i=0;i<3;i++){circ(-30+i*30,225,10);fs(['#ff4f6d','#4df3ff','#ffd23f'][i],3);}
  line([-140,200,-220,320,-200,400],46,OL);line([-140,200,-220,320,-200,400],34,P.suit);line([140,200,220,320,200,400],46,OL);line([140,200,220,320,200,400],34,P.suit);
  circ(0,0,150);fs(P.suit);circ(0,8,118);fs(P.visor,6);
  ctx.save();circ(0,8,112);ctx.clip();ell(0,40,80,90);fs(P.skin,5);
  for(const ex of[-30,30]){ell(ex,30,12,14);fs('#fff',4);circ(ex,32,5);ctx.fillStyle=OL;ctx.fill();}
  ell(0,82,12+m*6,3+m*14);fs('#8a2a3a',4);
  ell(-50,-40,40,20,-0.5);ctx.fillStyle='#ffffff55';ctx.fill();ctx.restore();
  rr(-30,-170,60,30,8);fs(P.orange);
  if(o.sweat){ctx.save();ctx.translate(0,8);for(let i=0;i<2;i++){const ph=(T*1.5+i*0.5)%1;circ(60,-10+ph*60,7);ctx.fillStyle='#9fe3ff';ctx.fill();}ctx.restore();}
  ctx.restore();}

function aiCore(x,y,r){const p=1+0.06*Math.sin(T*6)+mouthFor('ai')*0.15;
  for(let i=3;i>0;i--){circ(x,y,r*p*(0.5+i*0.25));ctx.fillStyle=`rgba(77,243,255,${0.12*i})`;ctx.fill();}
  circ(x,y,r*0.45*p);fs(P.hud,6,'#fff');ctx.save();ctx.translate(x,y);ctx.rotate(T);for(let i=0;i<3;i++){ctx.rotate(Math.PI*2/3);ell(r*0.75,0,r*0.12,r*0.04);ctx.fillStyle=P.hud;ctx.fill();}ctx.restore();}

function monitor(x,y,s,lift,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(lift>0){rr(-260,-lift,520,26,8);fs(P.stand);line([-230,-lift+26,-230,0],18);line([230,-lift+26,230,0],18);
    if(o.kb){rr(-200,-60,400,50,8);fs('#555a70',5);for(let i=0;i<10;i++)rr(-188+i*38,-50,30,12,3),fs('#9aa0b8',0);}}
  rr(-60,-lift-40,120,40,6);fs('#2b2f45');rr(-18,-lift-150,36,120,6);fs('#2b2f45');
  rr(-240,-lift-420,480,290,16);fs('#1a1d33');rr(-222,-lift-404,444,256,8);fs(o.screen||'#3a5bd9',4);
  ctx.restore();}

function eyeLine(x1,x2,y,col){ctx.setLineDash([22,14]);line([x1,y,x2,y],6,col);ctx.setLineDash([]);}

const SCENES={
 launch(lt,ln){bgFill(P.space);stars(110,40);planet(860,560,110);
  rr(60,1050,960,500,40);fs('#1c2257',7);for(let i=0;i<6;i++){rr(110+i*150,1100,110,60,10);fs(i%2?P.hud2:P.hud,4);}
  const shake=Math.sin(T*40)*6*(1-prog(lt,0,ln.dur));astro(540+shake,820,1.15,{mouth:mouthFor('cap'),tilt:Math.sin(T*3)*0.08,sweat:1});
  const al=Math.floor(T*4)%2;rr(260,1220,560,90,12);fs(al?'#ff2d55':'#7a1028',6);txt('⚠ คอตกวงโคจร',540,1268,54,'#fff',{f:'Kod'});},
 scan(lt){bgFill(P.deep);stars(60,10);
  rr(-20,1180,1120,500,0);fs(P.wood);monitor(560,1180,1.15,0);
  ctx.save();ctx.translate(200,0);astro(-30,880,0.55,{});ctx.restore();
  const sy=lerp(560,1150,(lt*0.7)%1);line([300,sy,900,sy],6,P.hud);ctx.save();ctx.globalAlpha=0.15;ctx.fillStyle=P.hud;ctx.fillRect(300,sy-40,600,40);ctx.restore();
  eyeLine(240,960,735,P.hud2);txt('ระดับสายตา',840,700,40,P.hud2,{f:'Kod'});
  const k=E.back(prog(lt,0.6,0.9));if(k>0){ctx.save();ctx.translate(560,500);ctx.scale(k,k);rr(-260,-50,520,100,12);fs('#ff2d55',5);txt('จอต่ำเกินไป!',0,4,56,'#fff',{f:'Kod'});ctx.restore();}},
 data(lt,ln){bgFill('#0a1030');for(let i=0;i<22;i++)line([0,330+i*52,W,330+i*52],1,'#1c2a6a');
  rr(-20,1250,1120,500,0);fs(P.wood);const k=E.inOut(prog(lt,0.3,1.4));monitor(640,1250,1.0,k*170);
  ctx.save();ctx.translate(-80,0);
  rr(170,820,120,280,50);fs('#7f8bd6');circ(230,760,70);fs(P.skin);ctx.restore();
  const ey=760-60;eyeLine(160,960,ey+2,P.hud2);
  const top=1250-170*k-420*1.0;line([400,top,900,top],6,'#ffd23f');
  txt('ขอบบนจอ',960,top-30,38,'#ffd23f',{f:'Kod',align:'right'});txt('สายตา',160,ey-40,38,P.hud2,{f:'Kod',align:'left'});
  if(k>0.95){circ(880,520,60);fs('#2fbf71',6);line([852,520,872,540,906,500],12,'#fff');}},
 ask(lt){bgFill(P.space);stars(80,60);speedLines(540,950,'#4df3ff33',30);astro(540,900,1.6,{mouth:mouthFor('cap'),sweat:1});},
 dock(lt,ln){bgFill(P.space);stars(90,15);
  rr(-20,1230,1120,500,0);fs(P.wood);
  const d=E.inOut(prog(lt,0.1,ln.dur*0.6)),up=E.out(prog(lt,ln.dur*0.6,ln.dur*0.85));
  if(d<1){monitor(540,1230,1.0,0);ctx.save();ctx.translate(lerp(-400,540,d),lerp(500,1100,d));ctx.rotate((1-d)*0.6);
    rr(-260,-26,520,26,8);fs(P.stand);line([-230,0,-230,90],18);line([230,0,230,90],18);
    for(let i=0;i<3;i++){const ph=(T*3+i/3)%1;ctx.save();ctx.globalAlpha=(1-ph)*(1-d);ell(-300-ph*120,0,40,12);ctx.fillStyle=P.orange;ctx.fill();ctx.restore();}ctx.restore();}
  else monitor(540,1230,1.0,20+up*160);
  if(d>0.98){const k=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));ctx.save();ctx.translate(540,500);ctx.scale(k,k);rr(-280,-55,560,110,14);fs(P.hud,5);txt('เทียบท่าสำเร็จ',0,4,58,OL,{f:'Kod'});ctx.restore();}},
 bonus(lt,ln){bgFill(P.deep);stars(50,8);rr(-20,1250,1120,500,0);fs(P.wood);
  monitor(540,1250,1.05,200,{kb:prog(lt,0.3,0.5)>0});
  const k=E.out(prog(lt,0.2,0.6));if(k<1){rr(lerp(-500,340,k),1180,400,50,8);fs('#555a70',5);}
  [['ยกจอ',300,520,0.1],['เก็บของใต้ชั้น',740,620,ln.dur*0.45]].forEach(([t,x,y,s])=>{const kk=E.back(prog(lt,s,s+0.3));if(kk<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(kk,kk);rr(-200,-50,400,100,50);fs(P.hud2,5);txt(t,0,4,50,'#fff',{f:'Kod'});ctx.restore();});},
 land(lt,ln){bgFill('#1b2a5c');stars(40,5);planet(200,560,90);
  rr(-20,1250,1120,500,0);fs('#4a3f7a');
  astro(330,1000,0.8,{mouth:mouthFor('cap')});monitor(800,1250,0.75,160,{screen:'#2fbf71'});
  for(let i=0;i<20;i++){const x=(hash(i)*W),y=((hash(i*2)*1500+T*300)%1500)+300;ctx.save();ctx.translate(x,y);ctx.rotate(T*4+i);ctx.fillStyle=[P.hud,P.hud2,'#ffd23f'][i%3];ctx.fillRect(-8,-4,16,8);ctx.restore();}
  const k=E.back(prog(lt,ln.dur*0.55,ln.dur*0.75));if(k>0){ctx.save();ctx.translate(780,620);ctx.rotate(-0.08);ctx.scale(k,k);rr(-190,-55,380,110,14);fs('#ffd23f',6);txt('ราคาไม่แพง',0,4,52,OL,{f:'Kod'});ctx.restore();}},
 cta(lt){bgFill(P.space);stars(100,30);aiCore(540,620,140);
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1080);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.hud;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  ctx.save();ctx.strokeStyle=P.hud;ctx.lineWidth=5;circ(540,1080,lerp(400,190,E.inOut(prog(lt,0,0.8))));ctx.stroke();ctx.restore();
  txt('พิกัดลงจอด: ตะกร้าด้านล่าง',540,1340,60,P.hud,{f:'Kod',sw:8});},
};

window.EP={font:'Kod',scenes:SCENES,
  camera(name,lt,ln){const s=name==='ask'?1+0.12*prog(lt,0,ln.dur):1+0.05*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Kod',size:56,col:'#e8fbff',hl:'#ff4fd8',sw:0,box:'#070b24e6',boxLine:4,boxLineCol:'#4df3ff',boxR:24,boxPad:28,pop:'back',y:1600,lh:1.4},
  intro(t){bgFill(P.space);stars(120,200);const n=Math.max(1,3-Math.floor(t/0.45));txt(String(n),540,860,320,P.hud,{f:'Kod'});txt('เตรียมปล่อยยาน',540,1080,60,'#fff',{f:'Kod'});},
  overlay(t){hudFrame();rr(140,110,800,150,75);fs('#070b24cc',4,P.hud);txt(TL.series,540,150,34,P.hud,{f:'Kod'});txt(TL.title,540,212,72,'#fff',{f:'Kod'});
    txt('O₂ 98%',80,1420,30,P.hud,{f:'Kod',align:'left'});txt('ALT '+(4000+Math.floor(T*37)),1000,1420,30,P.hud,{f:'Kod',align:'right'});},
  outroGap:0.55,
  outro(k){bgFill2(k);},
  endCard(k){bgFill(P.space);stars(120,60);ctx.save();ctx.globalAlpha=k;txt('ภารกิจสำเร็จ',540,800,110,P.hud,{f:'Kod'});
    txt('ชั้นวางจอ',540,960,80,'#fff',{f:'Kod'});txt('อยู่ในตะกร้าด้านล่าง',540,1060,56,P.hud2,{f:'Kod'});ctx.restore();},
};
function bgFill2(k){ctx.fillStyle='#000';const r=lerp(0,1400,E.inOut(k));ctx.fillRect(0,960-r,W,r*2>H?H:r*2);ctx.fillRect(0,0,W,(960-r)>0?0:0);ctx.save();ctx.globalAlpha=k;ctx.fillStyle='#fff';ctx.fillRect(0,955,W,10);ctx.restore();}
