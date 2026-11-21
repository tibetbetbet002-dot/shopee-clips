// EP.45 แบตเตอรี่แมน — แนวซูเปอร์ฮีโร่การ์ตูนช่อง (แท่นชาร์จมือถือแบบตั้ง)
OL = '#111111'; LW = 9;
const P = {yel:'#ffe14d',red:'#ff3b30',blue:'#1e66ff',cyan:'#3de0ff',skin:'#f1c39d',cape:'#ff3b30',suit:'#1e66ff',paper:'#fffdf2',green:'#2fd47a'};

function halftone(col,bg){bgFill(bg);ctx.fillStyle=col;for(let y=0;y<H;y+=28)for(let x=(y/28%2)*14;x<W;x+=28){circ(x,y,6+4*Math.sin((x+y)*0.01));ctx.fill();}}
function panel(x,y,w,h,fn){ctx.save();rr(x,y,w,h,6);ctx.clip();fn();ctx.restore();rr(x,y,w,h,6);fs(null,12,OL);}
function burstTxt(t,x,y,size,col=P.yel,rot=-0.1){ctx.save();ctx.translate(x,y);ctx.rotate(rot);star(0,0,size*1.6,size*1.1,12,0,col,8);txt(t,0,8,size,OL,{f:'K',w:800});ctx.restore();}
function hero(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.6),y+boil(2,1.6));ctx.scale(s,s);
  const w=Math.sin(T*6)*30;poly([-150,130,150,130,240+w,600,-240+w,600]);fs(P.cape);
  poly([-150,130,150,130,170,470,-170,470]);fs(P.suit);rr(-70,190,140,100,14);fs(P.yel,6);rr(-50,210,90,60,8);fs(P.green,4);rr(40,225,14,30,4);fs(P.green,0);
  if(o.fly){line([150,180,260,60,300,-60],40,OL);line([150,180,260,60,300,-60],28,P.suit);circ(306,-72,30);fs(P.skin,6);}else{line([150,180,230,330],40,OL);line([150,180,230,330],28,P.suit);}
  line([-150,180,-230,330],40,OL);line([-150,180,-230,330],28,P.suit);
  rr(-24,88,48,56,10);fs(P.skin);ell(0,0,90,102);fs(P.skin);ctx.beginPath();ctx.arc(0,-26,92,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#111');
  rr(-88,-24,176,44,20);fs(P.yel,6);for(const ex of[-34,34]){ell(ex,-2,16,10);fs('#fff',4);}
  ctx.beginPath();ctx.moveTo(-40,48);ctx.quadraticCurveTo(0,80+m*30,40,48);ctx.closePath();fs('#7a1a2a',5);ctx.restore();}
function citizen(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.6),y+boil(4,1.6));ctx.scale(s,s);poly([-130,120,130,120,150,440,-150,440]);fs('#ff9fb0');
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,84,94);fs(P.skin);ctx.beginPath();ctx.moveTo(-88,30);ctx.quadraticCurveTo(-92,-110,0,-104);ctx.quadraticCurveTo(92,-110,88,30);ctx.quadraticCurveTo(40,-50,-88,30);fs('#5a2a1a');
  for(const ex of[-28,28]){ell(ex,4,o.scared?16:11,o.scared?18:13);fs('#fff',5);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,50,12+m*6+(o.scared?6:0),3+m*12+(o.scared?8:0));fs('#a03040',5);ctx.restore();}
function phone(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);rr(-70,-140,140,280,20);fs('#222');rr(-58,-124,116,240,10);fs(o.dead?'#333':'#3d8bff',0);
  if(o.dead){rr(-30,-20,50,26,4);fs(null,5,P.red);rr(-26,-16,8,18,2);fs(P.red,0);}if(o.notif){rr(-50,-110,100,40,8);fs('#fff',3);}ctx.restore();}
function stand(x,y,s,charging){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-120,-20,240,40,14);fs('#2b2b33');poly([-90,-20,90,-20,60,-300,-60,-300]);fs('#3a3a46');ctx.save();ctx.translate(0,-180);ctx.rotate(-0.12);phone(0,0,1,{});ctx.restore();
  if(charging){ctx.save();ctx.shadowColor=P.cyan;ctx.shadowBlur=30;line([-40,-10,40,-10],6,P.cyan);ctx.restore();}ctx.restore();}
function caption(t,y,k){if(k<=0)return;ctx.save();ctx.translate(540,y);rr(-420,-52,840,104,0);fs(P.yel,8);txt(t,0,6,46,OL,{f:'K',w:800,maxW:800});ctx.restore();}

const SCENES={
 help(lt){halftone('#ffd0d0',P.paper);panel(60,340,960,1120,()=>{halftone('#ffcf9a','#fff3e0');rr(120,1120,840,40,8);fs('#c98b5a',7);for(let i=0;i<5;i++){ctx.save();ctx.translate(300+i*100,1100-i*12);ctx.rotate((hash(i)-0.5));rr(-60,-40,120,80,6);fs('#fff',5);ctx.restore();}
  phone(760,1040,0.6,{dead:1,rot:0.4});citizen(360,800,0.9,{mouth:mouthFor('citizen'),scared:1});});burstTxt('ช่วยด้วย!',800,560,60,P.yel);},
 arrive(lt){halftone(P.cyan+'55','#e9f8ff');for(let i=0;i<30;i++){const a=hash(i)*Math.PI*2;line([540+Math.cos(a)*200,900+Math.sin(a)*200,540+Math.cos(a)*900,900+Math.sin(a)*900],6+hash(i)*10,P.yel);}
  hero(540,lerp(-200,820,E.out(prog(lt,0,0.6))),1.0,{mouth:mouthFor('hero'),fly:1});burstTxt('ฟิ้ววว!',260,600,50,P.red,0.15);},
 fact(lt,ln){halftone('#dde6ff',P.paper);panel(60,340,960,1120,()=>{bgFill('#fff');rr(160,1150,760,40,8);fs('#c98b5a',7);phone(540,1120,0.7,{notif:1,rot:Math.PI/2});
  const n=Math.floor(lt*1.4);for(let i=0;i<n&&i<5;i++){ctx.save();ctx.translate(320+i*120,780);rr(-50,-50,100,100,12);fs(P.red,5);txt('🔔',0,6,44,'#fff',{f:'K'});ctx.restore();}
  ctx.save();ctx.translate(540,900);line([0,60,-20,200],30,OL);line([0,60,-20,200],20,P.skin);ctx.restore();});caption('วางราบ = ต้องหยิบมาดูทุกแจ้งเตือน',1380,prog(lt,0.3,0.6));},
 why(lt,ln){halftone('#ffe9a8','#fffbe8');ctx.save();ctx.translate(540,880);ell(0,0,300,220);fs('#ffb3c6',8);for(let i=0;i<6;i++)curve([-260+i*90,-180,-240+i*90,-40,-280+i*90,60,-250+i*90,180],7,'#e07a9a');
  const k=prog(lt,0.3,ln.dur);for(let i=0;i<4;i++){const a=T*3+i*1.5;star(Math.cos(a)*200*k,Math.sin(a)*140*k,30,12,5,a,P.yel,5);}ctx.restore();caption('หยิบมือถือบ่อย → หลุดโฟกัสงาน',1300,prog(lt,0.3,0.6));},
 weapon(lt){halftone('#c8d8ff','#eef3ff');citizen(540,900,1.1,{mouth:mouthFor('citizen')});txt('?',820,620,160,P.blue,{f:'K',w:800,sw:12,stroke:'#fff'});},
 stand(lt){halftone(P.yel+'88','#fffbe0');for(let i=0;i<16;i++){const a=i/16*Math.PI*2+T*0.3;ctx.save();ctx.globalAlpha=0.4;ctx.fillStyle=P.yel;ctx.beginPath();ctx.moveTo(540,960);ctx.arc(540,960,1400,a,a+0.12);ctx.fill();ctx.restore();}
  const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,1200);ctx.scale(k*1.5,k*1.5);stand(0,0,1,true);ctx.restore();burstTxt('แท่นชาร์จ!',540,520,60,P.red,-0.05);},
 tip(lt){halftone('#d8ffe0','#f4fff6');panel(80,360,440,600,()=>{bgFill('#fff');rr(150,620,300,160,20);fs('#ddd',6);txt('มาตรฐาน ✓',300,880,44,'#1a8a4a',{f:'K',w:800});});
  panel(560,360,440,600,()=>{bgFill('#fff');rr(620,560,320,240,40);fs('#e9e0ff',6);phone(780,700,0.4,{});txt('ใต้หมอน ✗',780,880,44,P.red,{f:'K',w:800});});caption('หัวชาร์จมาตรฐาน · ไม่ชาร์จใต้หมอน',1200,prog(lt,0.3,0.6));},
 bonus(lt){halftone('#dde6ff',P.paper);panel(60,340,960,1000,()=>{bgFill('#fff');rr(160,1100,760,40,8);fs('#c98b5a',7);stand(700,1100,0.9,true);circ(320,800,80);fs(P.skin,6);
  ctx.save();ctx.setLineDash([16,10]);line([380,790,640,860],6,P.blue);ctx.setLineDash([]);ctx.restore();});caption('จอหันมาทางเรา เห็นแต่ไม่ต้องหยิบ',1400,prog(lt,0.3,0.6));},
 saved(lt,ln){halftone(P.green+'55','#f0fff4');citizen(300,940,0.8,{mouth:mouthFor('citizen')});hero(780,880,0.7,{});burstTxt('ราคาไม่แพง!',540,540,52,P.yel,0.08);},
 cta(lt){halftone('#ffd0d0',P.paper);hero(270,820,0.6,{mouth:mouthFor('hero'),fly:1});const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(720,1050);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.yel;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();caption('ภารกิจต่อไป: ตะกร้าด้านล่าง!',1350,prog(lt,0.3,0.6));},
};

window.EP={font:'K',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.06*(1-E.out(prog(lt,0,0.25)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'K',w:800,size:56,col:'#111111',hl:'#ff3b30',sw:0,box:'#ffffff',boxLine:9,boxLineCol:'#111111',boxR:30,boxPad:28,pop:'back',y:1600,lh:1.35},
  intro(t){halftone(P.yel,'#fff3a8');const k=E.back(prog(t,0,0.6));ctx.save();ctx.translate(540,900);ctx.scale(k,k);burstTxt('ปัง!',0,0,120,P.red,-0.1);ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-460,-90,920,180,0);fs(P.yel,10,OL);txt(TL.title,0,-8,76,P.red,{f:'K',w:800,sw:8,stroke:OL,maxW:860});txt(TL.series,0,58,30,OL,{f:'K',w:800});ctx.restore();},
  outroGap:0.5,
  outro(k){ctx.save();ctx.translate(540,960);ctx.rotate(0.3);ctx.fillStyle=OL;ctx.fillRect(-1500,-1500,3000*E.inOut(k),3000);ctx.restore();},
  endCard(k){halftone(P.yel+'99','#fffbe0');ctx.save();ctx.globalAlpha=k;burstTxt('จบตอน!',540,720,80,P.red,-0.06);txt('แท่นชาร์จมือถือแบบตั้ง',540,960,66,OL,{f:'K',w:800});txt('อยู่ในตะกร้าด้านล่าง',540,1060,56,P.blue,{f:'K',w:800});ctx.restore();},
};
