// EP.41 ศึกซูโม่ล้อเก้าอี้ — แนวซูโม่ญี่ปุ่น เวทีดิน (แผ่นรองเก้าอี้กันรอยพื้น)
OL = '#2a1a10'; LW = 8;
const P = {clay:'#d9b07a',clay2:'#c49660',roof:'#3a2a1a',purple:'#5a2a7a',white:'#fff8ec',skin:'#f2c5a0',mawashi:'#2b3a8a',floor:'#c98b5a',floor2:'#a86f42',mat:'#dfe9f2',red:'#c8102e'};

function dohyo(){bgFill('#1c1410');poly([-50,330,W+50,330,W-80,520,80,520]);fs(P.roof,0);for(let i=0;i<4;i++){rr(80+i*280,520,40,60,6);fs([P.red,'#2b8a3a','#fff','#2b3a8a'][i],0);}
  ctx.fillStyle=P.clay;ell(540,1300,620,180);ctx.fill();ell(540,1260,520,140);ctx.fillStyle=P.clay2;ctx.fill();ctx.lineWidth=14;ctx.strokeStyle=P.white;ell(540,1260,380,100);ctx.stroke();line([480,1250,480,1280],8,P.white);line([600,1250,600,1280],8,P.white);}
function floorWood(){bgFill(P.floor);for(let i=0;i<12;i++){line([0,330+i*140,W,330+i*140],4,P.floor2);for(let j=0;j<4;j++)line([((i*137+j*260)%1200),330+i*140,((i*137+j*260)%1200),470+i*140],3,P.floor2);}}
function wrestler(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.4),y+boil(2,1.4));ctx.scale(s,s);ctx.rotate(o.lean||0);
  ell(0,250,230,220);fs(P.skin);rr(-230,300,460,110,30);fs(P.mawashi);rr(-40,300,80,190,10);fs(P.mawashi);
  for(const sd of[-1,1]){line([sd*200,180,sd*300,o.push?120:260],70,OL);line([sd*200,180,sd*300,o.push?120:260],56,P.skin);}
  ell(0,0,110,110);fs(P.skin);ctx.beginPath();ctx.arc(0,-30,110,Math.PI,0);ctx.closePath();fs('#111');ell(0,-140,40,30);fs('#111');
  for(const ex of[-36,36]){line([ex-18,0,ex+18,0],7);}line([-60,-34,-16,-24],9);line([16,-24,60,-34],9);ell(0,60,18+m*8,4+m*16);fs('#8a2a2a',5);ctx.restore();}
function referee(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([-120,120,120,120,160,440,-160,440]);fs(P.purple);for(let i=0;i<6;i++)circ(-80+i*32,250,10),fs('#f2c14e',0);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,80,90);fs(P.skin);poly([-70,-40,70,-40,40,-150,-40,-150]);fs('#111');for(const ex of[-28,28]){ell(ex,4,10,12);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}
  ell(0,46,10+m*6,3+m*12);fs('#8a2a2a',4);line([120,200,220,120],14,OL);rr(200,60,80,90,10);fs('#d9b07a',5);ctx.restore();}
function chair(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-140,-260,280,200,40);fs('#2b2d42');rr(-150,-60,300,50,20);fs('#2b2d42');line([0,-10,0,90],22,'#444');
  for(let i=0;i<5;i++){const a=i/5*Math.PI*2+(o.spin||0);const wx=Math.cos(a)*150,wy=110+Math.sin(a)*30;line([0,90,wx,wy],12,'#444');circ(wx,wy+20,22);fs('#111',5);}ctx.restore();}
function scratches(n,k){ctx.save();ctx.globalAlpha=k;for(let i=0;i<n;i++){const x=200+hash(i)*680,y=1180+hash(i*2)*240;curve([x,y,x+60,y+10,x+120,y-4],4,'#6b4024');}ctx.restore();}
function mat(x,y,w,h){rr(x,y,w,h,20);fs(P.mat+'dd',6,'#9ab');for(let i=0;i<8;i++){circ(x+40+i*(w-80)/7,y+h-20,6);ctx.fillStyle='#b8c8d8';ctx.fill();}}
function banzuke(t,y,k,col=P.red){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.scale(E.back(k),E.back(k));rr(-380,-56,760,112,6);fs(P.white,6);rr(-380,-56,24,112,0);fs(col,0);txt(t,10,6,48,OL,{f:'Kod',maxW:700});ctx.restore();}

const SCENES={
 ring(lt){dohyo();referee(540,720,0.7,{mouth:mouthFor('ref')});wrestler(260,1080,0.55,{lean:0.1});ctx.save();ctx.translate(820,1160);chair(0,0,0.9,{});ctx.restore();txt('VS',540,1080,110,'#ffd23f',{f:'Kod',sw:10});},
 push(lt,ln){floorWood();const x=540+Math.sin(lt*4)*200;chair(x,1180,1.0,{spin:lt*3});scratches(18,prog(lt,0,ln.dur));wrestler(x-260,960,0.5,{mouth:mouthFor('wrestler'),push:1,lean:0.2});},
 fact(lt,ln){floorWood();ctx.save();ctx.translate(540,1100);circ(0,0,260);fs(null,8,'#fff');ctx.save();circ(0,0,256);ctx.clip();ctx.scale(2,2);ctx.translate(-540,-1180);floorWood();scratches(30,1);ctx.restore();ctx.restore();
  banzuke('ล้อวิ่งซ้ำจุดเดิม → พื้นสึก',560,prog(lt,0.3,0.6));},
 why(lt,ln){bgFill('#1c1410');ctx.save();ctx.translate(540,920);circ(0,0,200);fs('#111',8);ctx.save();ctx.rotate(T*3);for(let i=0;i<12;i++){const a=i*0.52;circ(Math.cos(a)*190,Math.sin(a)*190,12);fs('#e9d29b',3);}ctx.restore();
  rr(-400,200,800,40,6);fs(P.floor,5);for(let i=0;i<6;i++)line([-300+i*110,210,-260+i*110,230],4,'#6b4024');ctx.restore();banzuke('ทราย+ฝุ่นติดล้อ = กระดาษทรายขัดพื้น',560,prog(lt,0.3,0.6));},
 mat(lt){floorWood();scratches(20,0.6);const k=E.out(prog(lt,0.2,1.0));ctx.save();ctx.beginPath();ctx.rect(0,0,W*k,H);ctx.clip();mat(140,1000,800,420);ctx.restore();chair(540,1180,0.9,{});banzuke('แผ่นรองเก้าอี้ขึ้นเวที!',560,prog(lt,0.2,0.5));},
 glide(lt){floorWood();mat(140,1000,800,420);const x=540+Math.sin(lt*3)*220;chair(x,1180,0.9,{spin:lt*4});for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=0.3-i*0.08;line([x-200-i*30,1300,x-120-i*30,1300],6,'#fff');ctx.restore();}banzuke('ลื่น · เบา · พื้นไม่เป็นรอย',560,prog(lt,0.3,0.6),'#2b8a3a');},
 tip(lt){floorWood();mat(160,980,760,460);ctx.save();ctx.setLineDash([18,12]);ctx.strokeStyle=P.red;ctx.lineWidth=6;ell(540,1210,280,160);ctx.stroke();ctx.restore();chair(540,1200,0.7,{});
  banzuke('ขนาดใหญ่กว่าระยะที่เลื่อนเก้าอี้',560,prog(lt,0.2,0.5));},
 bonus(lt,ln){bgFill('#f2e6d6');ctx.save();ctx.translate(540,920);circ(0,0,180);fs('#111',8);const k=prog(lt,0.3,ln.dur*0.8);ctx.save();ctx.globalAlpha=1-k;for(let i=0;i<10;i++){curve([-160,-60+i*14,0,-40+i*14+Math.sin(i)*20,160,-50+i*14],4,'#8a6a4a');}ctx.restore();ctx.restore();
  banzuke('ดึงผม/ฝุ่นที่พันล้อออก',560,prog(lt,0.2,0.5));},
 price(lt){dohyo();wrestler(540,1000,0.6,{mouth:mouthFor('wrestler')});banzuke('ราคาไม่แพง · ยอมใจ',560,prog(lt,0.3,0.6),'#2b8a3a');},
 cta(lt){dohyo();referee(540,760,0.6,{mouth:mouthFor('ref')});const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,1230);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.white;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();},
};

window.EP={font:'Kod',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Kod',size:56,col:'#2a1a10',hl:'#c8102e',sw:0,box:'#fff8ecf2',boxLine:6,boxLineCol:'#2a1a10',boxR:0,boxPad:28,pop:'back',y:1600,lh:1.4},
  intro(t){dohyo();for(let i=0;i<20;i++){const ph=(t*0.8+i/20)%1;circ(540+(hash(i)-0.5)*600,1200-ph*600,6);ctx.fillStyle='#fff';ctx.fill();}txt('ฮักเคโยอิ!',540,880,120,'#ffd23f',{f:'Kod',sw:12});},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,6);fs(P.white,8,OL);rr(-450,-88,900,30,0);fs(P.purple,0);txt(TL.title,0,4,66,OL,{f:'Kod',maxW:840});txt(TL.series,0,60,30,P.red,{f:'Kod'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.fillStyle=`rgba(28,20,16,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){dohyo();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,6);fs(P.white,8,OL);txt('ผู้ชนะ!',540,770,100,P.red,{f:'Kod'});txt('แผ่นรองเก้าอี้กันรอยพื้น',540,910,62,OL,{f:'Kod'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.purple,{f:'Kod'});ctx.restore();},
};
