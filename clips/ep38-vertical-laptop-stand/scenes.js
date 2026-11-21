// EP.38 แปลงร่าง! โน้ตบุ๊กยืน — แนวหุ่นยนต์ยักษ์ (ที่วางโน้ตบุ๊กแนวตั้ง)
OL = '#0e1116'; LW = 7;
const P = {steel:'#5b6573',steel2:'#3b4350',orange:'#ff7a1a',yel:'#ffd000',cyan:'#3de0ff',red:'#ff3b30',skin:'#f0c39c',desk:'#8a6a4a',lap:'#c9d1dc'};

function hangar(){bgFill(P.steel2);for(let i=0;i<10;i++){line([i*120,320,i*120,1320],6,'#2b313b');}for(let j=0;j<6;j++)line([0,360+j*170,W,360+j*170],4,'#2b313b');
  for(let i=0;i<12;i++){ctx.fillStyle=i%2?P.yel:'#111';poly([i*100,1300,i*100+50,1300,i*100+20,1340,i*100-30,1340]);ctx.fill();}ctx.fillStyle='#22272f';ctx.fillRect(-300,1340,W+600,800);
  const on=Math.floor(T*3)%2;for(const x of[100,980]){circ(x,380,26);fs(on?P.red:'#5a1a1a',5);}}
function cockpit(){bgFill('#0b0f16');ctx.save();ctx.globalAlpha=0.3;for(let i=0;i<30;i++)line([0,330+i*40,W,330+i*40],1,P.cyan);ctx.restore();
  poly([0,1500,140,900,940,900,1080,1500]);fs('#1b222c',8,P.cyan);for(let i=0;i<6;i++){circ(240+i*120,1100,26);fs(i%2?P.orange:P.cyan,4);}rr(300,1200,480,120,14);fs('#0b0f16',5,P.cyan);}
function pilot(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.4),y+boil(2,1.4));ctx.scale(s,s);poly([-140,130,140,130,160,430,-160,430]);fs(P.orange);rr(-60,180,120,40,8);fs(P.steel,4);
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,88,100);fs(P.skin);ctx.beginPath();ctx.arc(0,-10,110,Math.PI*1.0,Math.PI*2);ctx.closePath();fs('#e9edf2');rr(-80,-40,160,50,20);fs('#3de0ff88',4);
  for(const ex of[-30,30]){ell(ex,-14,10,12);fs('#fff',3);circ(ex,-12,5);ctx.fillStyle=OL;ctx.fill();}ell(0,50,14+m*6,3+m*14);fs('#9a3040',4);ctx.restore();}
function laptopFlat(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([-320,0,320,0,260,-110,-260,-110]);fs(P.lap);poly([-260,-110,260,-110,240,-300,-240,-300]);fs('#2b2f3a');rr(-220,-280,440,160,6);fs('#3d5a80',0);ctx.restore();}
function laptopStand(x,y,s,k){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-120,-20,240,40,10);fs('#1b1f26');rr(-90,-80,30,80,6);fs('#333');rr(60,-80,30,80,6);fs('#333');
  ctx.save();ctx.translate(0,-20);ctx.rotate(lerp(-Math.PI/2,0,k));rr(-30,-420,60,420,10);fs(P.lap,6);line([-30,-400,-30,-20],4,'#8a94a4');ctx.restore();ctx.restore();}
function monitor(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-70,-20,140,30,8);fs('#333');rr(-16,-140,32,120,6);fs('#333');rr(-260,-440,520,310,14);fs('#1a1d26');rr(-240,-420,480,270,6);fs('#3d5a80',0);ctx.restore();}
function deskTop(y){rr(40,y,1000,40,8);fs(P.desk);ctx.fillStyle='#6a4a2a';ctx.fillRect(40,y+40,1000,500);}
function hud(t,y,k,col=P.cyan){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);rr(90,y-54,900,108,6);fs('#0b0f16dd',4,col);for(const x of[90,990])line([x,y-54,x,y+54],10,col);txt(t,540,y+6,48,col,{f:'K',w:800,maxW:840});ctx.restore();}

const SCENES={
 cockpit(lt){cockpit();pilot(540,860,0.9,{mouth:mouthFor('pilot')});hud('⚠ โน้ตบุ๊กกินที่ครึ่งโต๊ะ',520,prog(lt,0.4,0.7),P.red);},
 analyze(lt){hangar();deskTop(1150);monitor(360,1150,0.7);laptopFlat(760,1150,0.6);
  const sx=lerp(500,1000,(lt*0.8)%1);ctx.save();ctx.globalAlpha=0.3;ctx.fillStyle=P.cyan;ctx.fillRect(sx-20,700,40,460);ctx.restore();hud('ใช้จอแยกอยู่แล้ว',520,prog(lt,0.3,0.6));},
 fact(lt){hangar();deskTop(1150);monitor(360,1150,0.7);laptopStand(800,1150,0.7,1);rr(260,1110,380,30,8);fs('#555a61',3);hud('จอแยก + คีย์บอร์ดนอก → พับโน้ตบุ๊กตั้งได้',520,prog(lt,0.3,0.6));},
 why(lt,ln){bgFill('#0b0f16');const k=prog(lt,0.3,ln.dur*0.8);
  ctx.save();ctx.translate(320,900);rr(-180,-120,360,240,10);fs(P.orange+'66',5,P.orange);txt('วางราบ',0,0,52,'#fff',{f:'K',w:800});ctx.restore();
  ctx.save();ctx.translate(780,900);rr(-lerp(180,30,k),-120,lerp(360,60,k),240,10);fs(P.cyan+'66',5,P.cyan);ctx.restore();txt('ตั้งตรง',780,1100,52,P.cyan,{f:'K',w:800});
  hud('ใช้พื้นที่เหลือไม่ถึง 1/5',1300,prog(lt,ln.dur*0.6,ln.dur*0.8),P.yel);},
 transform(lt,ln){hangar();const k=E.inOut(prog(lt,0.2,ln.dur*0.8));for(let i=0;i<10;i++){const a=i*0.63+T*2;line([540,1000,540+Math.cos(a)*600*k,1000+Math.sin(a)*600*k],6,P.yel);}
  laptopStand(540,1200,1.4,k);txt('แปลงร่าง!',540,560,150,P.orange,{f:'K',w:800,sw:16});},
 space(lt){hangar();deskTop(1150);monitor(380,1150,0.7);laptopStand(820,1150,0.65,1);rr(270,1110,380,30,8);fs('#555a61',3);ctx.save();ctx.globalAlpha=0.3+0.2*Math.sin(T*5);ctx.fillStyle='#2fbf71';ctx.fillRect(120,1080,180,60);ctx.restore();
  for(let i=0;i<5;i++){const ph=(T*1.2+i/5)%1;ctx.save();ctx.globalAlpha=1-ph;line([860+ph*120,900-i*40,920+ph*120,900-i*40],6,P.cyan);ctx.restore();}hud('โต๊ะว่างขึ้น · ลมระบายรอบเครื่อง',520,prog(lt,0.3,0.6));},
 tip(lt){hangar();deskTop(1150);rr(900,500,140,650,6);fs('#d9dde3',5);laptopStand(700,1150,0.75,1);ctx.save();ctx.translate(780,900);for(let i=0;i<4;i++){line([0,i*40,80,i*40],6,P.cyan);}ctx.restore();
  hud('ช่องระบายลม ห้ามชิดผนัง/ห้ามบัง',520,prog(lt,0.2,0.5));},
 bonus(lt){cockpit();ctx.save();ctx.translate(540,820);rr(-320,-220,640,440,20);fs('#1b222c',6,P.cyan);txt('⚙ ตั้งค่าพลังงาน',0,-150,44,P.cyan,{f:'K',w:800});
  txt('เมื่อปิดฝา:',-140,-40,40,'#fff',{f:'K',w:600});rr(20,-70,260,60,30);fs(P.orange,4);txt('ไม่ทำอะไร',150,-38,36,'#fff',{f:'K',w:800});ctx.restore();hud('ปิดฝาแล้วเครื่องไม่หลับ',1180,prog(lt,0.3,0.6),P.yel);},
 price(lt){hangar();laptopStand(540,1200,1.2,1);const s=(Math.sin(T*2)+1)/2;ctx.save();ctx.translate(540,1180);line([-130-s*40,0,-60,0],8,P.yel);line([130+s*40,0,60,0],8,P.yel);ctx.restore();hud('ปรับความกว้างได้ · ราคาไม่แพง',520,prog(lt,0.3,0.6),P.yel);},
 cta(lt){hangar();const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,920);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.yel;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();hud('อาวุธลับ → ตะกร้าด้านล่าง',1200,prog(lt,0.3,0.6),P.orange);},
};

window.EP={font:'K',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.06*(1-E.out(prog(lt,0,0.25)));if(name==='transform')ctx.translate(Math.sin(T*40)*5,0);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'K',w:800,size:58,col:'#ffffff',hl:'#ff7a1a',sw:0,box:'#0e1116e6',boxLine:5,boxLineCol:'#ffd000',boxR:0,boxPad:28,pop:'back',y:1600,lh:1.35,skew:-0.1},
  intro(t){hangar();const k=E.back(prog(t,0,0.6));ctx.save();ctx.translate(540,900);ctx.scale(k,k);txt('LAUNCH',0,0,160,P.orange,{f:'K',w:800,sw:16});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);poly([-460,-88,460,-88,430,88,-430,88]);fs('#0e1116ee',6,P.orange);txt(TL.title,0,-6,68,P.yel,{f:'K',w:800,maxW:840});txt(TL.series,0,56,30,'#fff',{f:'K',w:600});ctx.restore();},
  outroGap:0.5,
  outro(k){const h=E.inOut(k)*H/2;ctx.fillStyle=P.steel2;ctx.fillRect(0,0,W,h);ctx.fillRect(0,H-h,W,h);for(let i=0;i<12;i++){ctx.fillStyle=i%2?P.yel:'#111';ctx.fillRect(i*90,h-30,90,30);}},
  endCard(k){bgFill(P.steel2);ctx.save();ctx.globalAlpha=k;txt('MISSION CLEAR',540,780,100,P.orange,{f:'K',w:800});txt('ที่วางโน้ตบุ๊กแนวตั้ง',540,940,70,'#fff',{f:'K',w:800});txt('อยู่ในตะกร้าด้านล่าง',540,1040,56,P.yel,{f:'K',w:800});ctx.restore();},
};
