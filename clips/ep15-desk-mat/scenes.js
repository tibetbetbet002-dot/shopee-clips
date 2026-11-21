// EP.15 ยิงงงง! เมาส์ไม่สะดุด — แนวถ่ายทอดสดฟุตบอล (แผ่นรองโต๊ะขนาดใหญ่)
OL = '#0b1a0e'; LW = 7;
const P = {grass:'#2e8b3e',grass2:'#277a35',line:'#f4fff4',desk:'#c98b5a',desk2:'#a86f42',mat:'#26303f',mat2:'#33415a',skin:'#e9b48c',skin2:'#f3c9a8',red:'#e63946',gold:'#ffd23f',crowd:['#e63946','#ffd23f','#4cc9f0','#ffffff','#2a9d8f']};

function pitch(){for(let i=0;i<12;i++){ctx.fillStyle=i%2?P.grass:P.grass2;ctx.fillRect(-300,i*170-100,W+600,170);}
  ctx.strokeStyle=P.line;ctx.lineWidth=8;rr(80,380,920,1080,0);ctx.stroke();line([80,920,1000,920],8,P.line);circ(540,920,130);ctx.stroke();}
function crowd(y){for(let i=0;i<70;i++){const x=(i%14)*80+((i/14|0)%2)*40,yy=y+(i/14|0)*46+(Math.sin(T*8+i)>0.6?-10:0);circ(x,yy,18);ctx.fillStyle=P.crowd[i%5];ctx.fill();}}
function commentator(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(o.f?3:1,1.5),y+boil(o.f?4:2,1.5));ctx.scale(s,s);
  if(o.f){ell(0,10,120,150);fs('#2a1a10');}
  poly([-140,140,140,140,160,420,-160,420]);fs(o.f?'#4cc9f0':'#264653');
  rr(-22,92,44,56,10);fs(o.f?P.skin2:P.skin);ell(0,0,92,104);fs(o.f?P.skin2:P.skin);
  if(!o.f){ctx.beginPath();ctx.arc(0,-20,92,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#1a1a1a');}
  else{ctx.beginPath();ctx.moveTo(-94,20);ctx.quadraticCurveTo(-96,-110,0,-104);ctx.quadraticCurveTo(96,-110,94,20);ctx.quadraticCurveTo(40,-50,-94,20);fs('#2a1a10');}
  ctx.beginPath();ctx.arc(0,-10,104,Math.PI*1.05,Math.PI*1.95);ctx.lineWidth=12;ctx.strokeStyle='#222';ctx.stroke();ell(-104,-4,22,34);fs('#333');ell(104,-4,22,34);fs('#333');
  line([-104,20,-60,70,-10,72],7,'#333');circ(-6,72,12);fs('#555',4);
  const ex=o.excited?1.4:1;for(const e of[-34,34]){ell(e,0,13*ex,15*ex);fs('#fff',4);circ(e,2,5);ctx.fillStyle=OL;ctx.fill();}
  ell(0,56,14+m*8+(o.excited?10:0),4+m*18+(o.excited?14:0));fs('#8a2030',4);
  ctx.restore();}
function mouse(x,y,s,rot=0,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);
  ell(0,0,60,90);fs('#e9edf2');line([0,-90,0,-20],5);line([-58,-25,58,-25],4,'#9aa');
  if(o.face){for(const ex of[-20,20]){circ(ex,15,10);fs('#fff',4);circ(ex,o.dizzy?15:18,4);ctx.fillStyle=OL;ctx.fill();}if(o.dizzy){star(0,-120,30,12,5,T*5,P.gold,4);}}
  curve([0,-90,10,-160,-20,-230],6,'#333');ctx.restore();}
function scoreboard(a,b){rr(40,320,420,80,10);fs('#0b1a0e',4,'#fff');txt('โต๊ะ',110,362,36,'#fff',{f:'K',w:800});rr(170,335,120,50,8);fs(P.gold,0);
  txt(a+' - '+b,230,362,40,OL,{f:'K',w:800});txt('เมาส์',360,362,36,'#fff',{f:'K',w:800});
  const mm=String(Math.floor(T*3)%90).padStart(2,'0');rr(470,320,130,80,10);fs(P.red,0);txt(mm+"'",535,362,40,'#fff',{f:'K',w:800});}

const SCENES={
 kickoff(lt){bgFill('#0b3d1a');crowd(330);rr(-20,640,1120,40,0);fs('#ffffff22',0);
  rr(60,760,960,520,30);fs('#1b263b',8);rr(60,760,960,90,30);fs(P.red,0);txt('ห้องพากย์ ศึกโต๊ะคอม',540,806,48,'#fff',{f:'K',w:800});
  commentator(330,1000,0.85,{mouth:mouthFor('cast1')});commentator(750,1000,0.85,{mouth:mouthFor('cast2'),f:1});
  rr(60,1200,960,90,0);fs('#2a3550',6);},
 foul(lt,ln){bgFill(P.desk);for(let i=0;i<9;i++)line([0,380+i*130,W,390+i*130],3,P.desk2);
  for(let i=0;i<6;i++){line([200+i*120,700+i*40,320+i*120,760+i*30],6,'#7a4a2a');}
  const k=prog(lt,0,ln.dur*0.5),trip=lt>ln.dur*0.45;
  mouse(lerp(150,520,k)+(trip?hash(Math.floor(T*30))*14:0),lerp(1200,900,k),1.3,trip?0.6:0.1,{face:1,dizzy:trip});
  rr(640,420,360,220,14);fs('#1a1d33',6);rr(656,436,328,188,8);fs('#7ec8f0',0);
  const cx=820+(trip?Math.sin(T*60)*30:0),cy=530+(trip?Math.cos(T*47)*20:0);poly([cx,cy,cx,cy+50,cx+14,cy+38,cx+34,cy+40]);fs('#fff',4);
  if(trip){const c=E.back(prog(lt,ln.dur*0.5,ln.dur*0.7));ctx.save();ctx.translate(300,560);ctx.rotate(-0.15);ctx.scale(c,c);rr(-70,-100,140,200,10);fs(P.gold,6);txt('สะดุด!',0,0,40,OL,{f:'K',w:800});ctx.restore();}},
 replay(lt,ln){bgFill('#dfe6ee');
  ctx.save();ctx.strokeStyle=P.gold;ctx.lineWidth=14;rr(40,330,1000,1100,20);ctx.stroke();ctx.restore();
  rr(60,350,260,70,10);fs(P.gold,0);txt('◀◀ REPLAY',190,386,40,OL,{f:'K',w:800});
  rr(-20,1000,700,400,10);fs('#cfd8e3',8);for(let i=0;i<6;i++)star(100+i*100,1080+(i%2)*60,16,6,6,0,'#a8e1ff',3);txt('โต๊ะแข็ง + เย็น',320,1260,56,'#5a7a9a',{f:'K',w:800});
  rr(200,860,760,150,75);fs(P.skin);ell(960,900,90,70);fs(P.skin);
  const k=prog(lt,0.3,ln.dur);ctx.save();ctx.globalAlpha=0.5+0.3*Math.sin(T*8);ell(640,1000,90*k+30,30);ctx.fillStyle=P.red;ctx.fill();ctx.restore();
  ctx.save();ctx.strokeStyle=P.red;ctx.lineWidth=8;circ(640,995,120);ctx.stroke();ctx.restore();},
 sub(lt,ln){pitch();
  rr(240,460,600,360,20);fs('#111',8);txt('เปลี่ยนตัว',540,520,56,'#fff',{f:'K',w:800});
  const blink=Math.floor(T*4)%2;txt('IN  ▲ แผ่นรองโต๊ะ',540,630,52,blink?'#2fff6a':'#1a9a40',{f:'K',w:800});txt('OUT ▼ โต๊ะเปล่า',540,730,52,blink?'#ff4040':'#9a1a1a',{f:'K',w:800});
  const u=E.out(prog(lt,ln.dur*0.4,ln.dur));rr(80,1000,lerp(80,920,u),360,24);fs(P.mat);if(u<0.98){ell(80+lerp(80,920,u),1180,40,180);fs(P.mat2);}},
 run(lt,ln){bgFill(P.desk);rr(60,560,960,760,30);fs(P.mat);rr(76,576,928,728,24);fs(null,4,P.mat2);
  rr(140,700,520,200,16);fs('#5a6470',5);for(let r=0;r<3;r++)for(let c=0;c<8;c++)rr(160+c*62,720+r*58,50,44,6),fs('#9aa3b1',0);
  const mx=760+Math.sin(T*3)*120,my=1050+Math.cos(T*2.4)*120;for(let i=1;i<5;i++){ctx.save();ctx.globalAlpha=0.15*i;mouse(mx-Math.cos(T*3)*i*30,my+Math.sin(T*2.4)*i*30,1.0,0);ctx.restore();}mouse(mx,my,1.0,0,{face:1});
  rr(120,1150,500,120,60);fs(P.skin,6);ell(620,1180,70,60);fs(P.skin,6);
  [['เลื่อนลื่น',300,470,0.15],['แขนวางนุ่ม',780,470,ln.dur*0.5]].forEach(([t,x,y,s])=>{const k=E.back(prog(lt,s,s+0.3));if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(k,k);rr(-180,-50,360,100,14);fs(P.gold,6);txt(t,0,4,50,OL,{f:'K',w:800});ctx.restore();});},
 goal(lt,ln){bgFill(P.desk);rr(60,600,960,700,30);fs(P.mat);
  const tip=E.out(prog(lt,0.2,0.6));ctx.save();ctx.translate(780,820);ctx.rotate(tip*1.4);rr(-60,-90,120,150,14);fs('#e9f6ff',6);ctx.restore();
  if(tip>0.5)for(let i=0;i<12;i++){const k=prog(lt,0.5,1.2);const x=700-k*300+hash(i)*200,y=900+hash(i*2)*200;circ(x,y,10+hash(i*3)*14);fs('#9fe3ff',3);}
  const c=E.back(prog(lt,ln.dur*0.45,ln.dur*0.7));if(c>0){ctx.save();ctx.translate(540,470);ctx.scale(c,c);rr(-320,-60,640,120,14);fs('#2fbf71',6);txt('กันน้ำ กันรอย',0,4,58,'#fff',{f:'K',w:800});ctx.restore();}},
 score(lt,ln){pitch();
  ctx.save();ctx.translate(540,700);rr(-300,-160,600,260,0);fs(null,10,'#fff');for(let i=-5;i<=5;i++)line([i*60,-160,i*60,100],3,'#ffffff88');for(let j=0;j<5;j++)line([-300,-160+j*60,300,-160+j*60],3,'#ffffff88');ctx.restore();
  const b=E.out(prog(lt,0,0.5));circ(lerp(540,600,b),lerp(1400,660,b),40);fs('#fff',6);
  const g=E.elastic(prog(lt,0.4,1.2));ctx.save();ctx.translate(540,1050);ctx.rotate(-0.08);ctx.scale(g,g);txt('ยิงงงง!',0,0,200,P.gold,{f:'K',w:800,sw:18});ctx.restore();
  for(let i=0;i<60;i++){const x=hash(i)*W,y=((hash(i*3)*2000+T*400)%2000)-100;ctx.save();ctx.translate(x,y);ctx.rotate(T*5+i);ctx.fillStyle=P.crowd[i%5];ctx.fillRect(-10,-5,20,10);ctx.restore();}
  const k=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));if(k>0){ctx.save();ctx.translate(540,1300);ctx.scale(k,k);rr(-230,-50,460,100,10);fs(P.red,6);txt('ราคาไม่แพง',0,4,54,'#fff',{f:'K',w:800});ctx.restore();}},
 cta(lt){bgFill('#0b3d1a');crowd(330);
  ctx.save();ctx.translate(540,960);ctx.rotate(-0.05);rr(-380,-200,760,400,20);fs('#fff8e1',8);line([140,-200,140,200],5,'#999');
  txt('ตั๋วเข้าชม',-120,-120,56,P.red,{f:'K',w:800});txt('แผ่นรองโต๊ะ',-120,-30,52,OL,{f:'K',w:800});txt('ขนาดใหญ่',-120,40,52,OL,{f:'K',w:800});
  ctx.save();ctx.translate(260,0);ctx.scale(0.75,0.75);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();ctx.restore();
  txt('ซื้อตั๋วที่ตะกร้าด้านล่าง',540,1290,66,P.gold,{f:'K',w:800,sw:12});
  const ay=1380+Math.abs(Math.sin(T*6))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+50,460,ay,500,ay]);fs(P.gold,6);},
};

window.EP={font:'K',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.08*(1-E.out(prog(lt,0,0.25)));if(name==='replay')s=1.04+0.04*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'K',w:800,size:58,col:'#ffffff',hl:'#ffd23f',sw:0,box:'#0b1a0eee',boxLine:6,boxLineCol:'#ffd23f',boxR:8,boxPad:28,pop:'back',y:1600,lh:1.35},
  intro(t){pitch();const k=E.back(prog(t,0,0.5));ctx.save();ctx.translate(540,920);ctx.scale(k,k);circ(0,0,120);fs('#fff',8);
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2-Math.PI/2;poly([Math.cos(a)*50,Math.sin(a)*50,Math.cos(a+0.4)*90,Math.sin(a+0.4)*90,Math.cos(a-0.4)*90,Math.sin(a-0.4)*90]);fs('#111',0);}ctx.restore();
    txt('ถ่ายทอดสด!',540,1150,100,P.gold,{f:'K',w:800,sw:14});},
  overlay(t){scoreboard(0,T>TL.lines[6].start+0.6?1:0);rr(620,320,420,80,10);fs(P.red,0);txt('● สด',690,362,36,'#fff',{f:'K',w:800});txt(TL.series,880,362,24,'#fff',{f:'K',w:600,maxW:250});
    rr(40,110,1000,180,20);fs('#0b1a0edd',0);txt(TL.title,540,200,84,'#fff',{f:'K',w:800,maxW:960});},
  outroGap:0.55,
  outro(k){const w=E.inOut(k)*W;ctx.fillStyle=P.grass2;ctx.fillRect(0,0,w,H);for(let i=0;i<6;i++){ctx.fillStyle=P.grass;ctx.fillRect(0,i*340,w,170);}},
  endCard(k){pitch();ctx.save();ctx.globalAlpha=k;rr(140,640,800,520,30);fs('#0b1a0eee',8,P.gold);txt('จบเกม!',540,750,100,P.gold,{f:'K',w:800});
    txt('แผ่นรองโต๊ะขนาดใหญ่',540,900,64,'#fff',{f:'K',w:800});txt('อยู่ในตะกร้าด้านล่าง',540,1010,56,P.gold,{f:'K',w:800});ctx.restore();},
};
