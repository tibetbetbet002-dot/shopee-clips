// EP.40 รถไฟสายไฟเดินทาง — แนวรถไฟของเล่นบนโต๊ะ (กล่องเก็บปลั๊กพ่วง)
OL = '#1d1d2b'; LW = 7;
const P = {sky:'#bfe6ff',grass:'#8fd16a',rail:'#7a5a3a',train:'#e63946',train2:'#1d3557',yel:'#ffd23f',white:'#fff',box:'#f1f1f1',dust:'#b9b2a6',skin:'#f1c6a2'};

function tableTop(){bgFill(P.sky);ctx.fillStyle='#d9a066';ctx.fillRect(-300,900,W+600,1100);ctx.fillStyle=P.grass;rr(60,940,960,420,40);ctx.fill();
  for(let i=0;i<5;i++){circ(130+i*210,980+hash(i)*300,30);ctx.fillStyle='#6fb84a';ctx.fill();}}
function track(y){for(let i=-1;i<14;i++){rr(i*80+((T*120)%80),y-10,20,50,4);fs(P.rail,0);}line([-50,y,W+50,y],8,'#555');line([-50,y+30,W+50,y+30],8,'#555');}
function train(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-160,-160,220,160,14);fs(P.train);rr(-150,-230,110,80,10);fs(P.train2);rr(40,-110,120,110,10);fs(P.train);rr(120,-170,30,60,6);fs('#333');
  for(let i=0;i<3;i++){const ph=(T*1.5+i/3)%1;circ(135,-180-ph*140,20+ph*20);ctx.save();ctx.globalAlpha=1-ph;ctx.fillStyle='#ddd';ctx.fill();ctx.restore();}
  rr(-140,-140,60,50,6);fs(P.sky,4);for(const wx of[-110,0,110]){circ(wx,10,34);fs('#333',5);ctx.save();ctx.translate(wx,10);ctx.rotate(T*6);line([-20,0,20,0],5,P.yel);ctx.restore();}
  rr(-240,-90,70,90,10);fs(P.yel);ctx.restore();}
function conductor(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);poly([-120,120,120,120,140,420,-140,420]);fs(P.train2);for(const by of[200,280])circ(0,by,10),fs(P.yel,3);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,84,94);fs(P.skin);rr(-96,-80,192,50,14);fs(P.train2);rr(-110,-40,220,20,8);fs('#111');rr(-20,-74,40,30,4);fs(P.yel,3);
  for(const ex of[-28,28]){ell(ex,6,11,13);fs('#fff',4);circ(ex,8,5);ctx.fillStyle=OL;ctx.fill();}ctx.beginPath();ctx.moveTo(-36,34);ctx.quadraticCurveTo(0,20,36,34);ctx.lineWidth=8;ctx.strokeStyle='#5a3a1a';ctx.stroke();
  ell(0,52,12+m*6,3+m*12);fs('#9a3040',4);if(o.whistle){rr(30,40,50,24,8);fs('#ccc',4);}ctx.restore();}
function strip(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-240,-50,480,100,22);fs('#f5f5f5');for(let i=0;i<4;i++){rr(-200+i*110,-30,70,60,10);fs('#e3e3e3',4);rr(-180+i*110,-18,10,24,3);fs(OL,0);rr(-150+i*110,-18,10,24,3);fs(OL,0);}
  if(o.dust)for(let i=0;i<14;i++){const dx=-220+hash(i)*440,dy=-40+hash(i*2)*80;circ(dx,dy,6+hash(i*3)*10);ctx.fillStyle=P.dust;ctx.fill();}
  if(o.plugs)for(let i=0;i<3;i++){rr(-200+i*110,-80,70,60,10);fs(['#333','#fff','#e63946'][i],4);curve([-165+i*110,-80,-165+i*110,-160,-100+i*60,-240],10,['#333','#ddd','#e63946'][i]);}ctx.restore();}
function stripBox(x,y,s,open,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-300,-130,600,260,30);fs(P.box);for(const hx of[-310,290])rr(hx,-40,20,80,8),fs('#ccc',3);
  for(let i=0;i<8;i++)rr(-200+i*50,90,30,10,4),fs('#bbb',0);
  if(open>0){ctx.save();rr(-280,-110,560,220,20);ctx.clip();rr(-280,-110,560,220,0);fs('#e6e6e6',0);strip(0,10,0.9,{plugs:o.plugs});ctx.restore();}
  if(open<1){ctx.save();ctx.translate(0,-130);ctx.scale(1,1-open);rr(-300,0,600,80,24);fs('#fafafa',6);ctx.restore();}
  if(o.cables)for(const sd of[-1,1])curve([sd*300,0,sd*380,30,sd*420,-60],10,'#333');ctx.restore();}
function sign(t,x,y,k,col=P.train2){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(E.back(k),E.back(k));line([0,60,0,140],10,'#555');rr(-260,-56,520,116,14);fs(col,6,'#fff');txt(t,0,6,46,'#fff',{f:'Mali',maxW:480});ctx.restore();}

const SCENES={
 depart(lt){tableTop();track(1180);train(lerp(-300,560,E.out(prog(lt,0,1.2))),1180,1.0);conductor(260,800,0.6,{mouth:mouthFor('conductor'),whistle:1});},
 station(lt){tableTop();track(1250);strip(540,1100,1.1,{dust:1,plugs:1});curve([200,1000,300,920,420,1010,520,930,640,1010,760,930],10,'#333');sign('สถานี: ปลั๊กพ่วง',540,520,prog(lt,0.2,0.5));},
 fact(lt,ln){tableTop();strip(540,1140,1.0,{plugs:1});ctx.save();ctx.translate(lerp(1100,700,prog(lt,0.2,1.2)),1040);ell(0,0,90,60);fs('#f4a261',5);circ(-60,-50,40);fs('#f4a261',5);poly([-90,-80,-80,-120,-60,-84]);fs('#f4a261',4);circ(-70,-56,6);ctx.fillStyle=OL;ctx.fill();curve([80,0,140,-40,120,-90],10,'#f4a261');ctx.restore();
  sign('วางโล่ง = เด็ก/สัตว์เลี้ยงเล่นได้',540,520,prog(lt,0.4,0.7),P.train);},
 why(lt,ln){bgFill('#2b2b3a');strip(540,880,1.4,{dust:1});const k=prog(lt,0.3,ln.dur);for(let i=0;i<10;i++){const ph=(T*0.8+i/10)%1;circ(300+hash(i)*480,700+ph*160,5);ctx.fillStyle='#9fe3ff';ctx.globalAlpha=k;ctx.fill();ctx.globalAlpha=1;}
  if(k>0.6&&hash(Math.floor(T*14))>0.4)star(520,860,40,14,6,T*8,'#fff27a',0);sign('ฝุ่น + ความชื้น → ไฟรั่วได้',540,1240,prog(lt,0.3,0.6),P.train);},
 box(lt){tableTop();track(1300);const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,1080);ctx.scale(k,k);stripBox(0,0,1.0,0,{cables:1});ctx.restore();sign('กล่องเก็บปลั๊กพ่วง',540,520,prog(lt,0.1,0.4),P.train);},
 inside(lt,ln){tableTop();const o=E.inOut((Math.sin(lt*1.4-1.5)+1)/2);stripBox(540,1060,1.1,o,{plugs:1,cables:1});sign('ปลั๊กอยู่ในกล่อง · ฝุ่นเข้าน้อยลง',540,520,prog(lt,0.3,0.6));},
 tip(lt){tableTop();stripBox(540,1060,1.1,0,{cables:1});for(let i=0;i<4;i++){const ph=(T*0.8+i/4)%1;ctx.save();ctx.globalAlpha=1-ph;curve([380+i*100,980-ph*120,400+i*100,940-ph*160,380+i*100,900-ph*200],6,'#ff9f43');ctx.restore();}
  sign('เลือกแบบมีช่องระบายอากาศ',540,520,prog(lt,0.2,0.5));},
 bonus(lt,ln){tableTop();strip(540,1120,1.1,{plugs:1});const k=E.out(prog(lt,0.3,1.0));ctx.save();ctx.translate(320,1040-k*200);rr(-40,-30,80,60,10);fs('#333',4);ctx.restore();
  sign('ถอดปลั๊กที่ไม่ใช้ = ประหยัด + ปลอดภัย',540,520,prog(lt,0.2,0.5),P.train);},
 price(lt){tableTop();track(1300);train(560,1300,0.7);stripBox(540,1000,0.8,0,{});sign('ราคาไม่แพง · ดูเรียบร้อย',540,520,prog(lt,0.3,0.6));},
 cta(lt){tableTop();track(1250);train(lerp(560,1400,prog(lt,0.8,2.2)),1250,0.8);sign('สถานีปลายทาง: ตะกร้าด้านล่าง',540,520,prog(lt,0.1,0.4),P.train);
  const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,920);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.yel;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();},
};

window.EP={font:'Mali',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.04*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mali',size:58,col:'#ffffff',hl:'#ffd23f',sw:0,box:'#1d3557ee',boxLine:5,boxLineCol:'#e63946',boxR:30,boxPad:28,pop:'back',y:1600,lh:1.35},
  intro(t){tableTop();track(1180);train(lerp(1400,560,E.out(prog(t,0,1.2))),1180,1.0);},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,20);fs(P.train,6,'#fff');txt(TL.title,0,-6,66,'#fff',{f:'Mali',maxW:840});txt('🚂 '+TL.series,0,56,32,P.yel,{f:'Mali'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.fillStyle=`rgba(29,53,87,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill(P.train2);ctx.save();ctx.globalAlpha=k;txt('ถึงปลายทางแล้ว!',540,780,90,P.yel,{f:'Mali'});txt('กล่องเก็บปลั๊กพ่วง',540,930,74,'#fff',{f:'Mali'});txt('อยู่ในตะกร้าด้านล่าง',540,1030,56,P.yel,{f:'Mali'});ctx.restore();},
};
