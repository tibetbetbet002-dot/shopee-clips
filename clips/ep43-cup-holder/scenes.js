// EP.43 โจรสลัดกับสมบัติเปียก — แนวโจรสลัดล่าสมบัติ (ที่วางแก้วหนีบโต๊ะ)
OL = '#1a120a'; LW = 7;
const P = {sea:'#1e6f9f',sea2:'#145079',deck:'#a8743f',deck2:'#8a5a2b',sail:'#f3e6c8',red:'#c0392b',gold:'#f2c14e',skin:'#e7b48c',parrot:'#2fbf71',parrot2:'#ff4d3d',map:'#f0dfb4',coffee:'#6b3e26'};

function shipDeck(){const g=ctx.createLinearGradient(0,0,0,900);g.addColorStop(0,'#8fd3ff');g.addColorStop(1,P.sea);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  for(let r=0;r<3;r++){ctx.beginPath();for(let x=-50;x<=W+50;x+=20)ctx.lineTo(x,820+r*40+Math.sin(x*0.02+T*2+r)*14);ctx.lineTo(W+50,H);ctx.lineTo(-50,H);ctx.closePath();fs(r%2?P.sea:P.sea2,0);}
  line([880,330,880,900],22,P.deck2);poly([880,360,1060,420,880,700]);fs(P.sail,6);txt('☠',960,540,70,OL,{f:'Pattaya'});
  ctx.fillStyle=P.deck;ctx.fillRect(-300,950,W+600,1000);for(let i=0;i<10;i++)line([0,980+i*70,W,980+i*70],5,P.deck2);}
function captain(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.3),y+boil(2,1.3)+Math.sin(T*1.5)*6);ctx.scale(s,s);ctx.rotate(Math.sin(T*1.5)*0.03);
  poly([-160,130,160,130,180,470,-180,470]);fs(P.red);for(const by of[200,280,360])circ(-40,by,10),fs(P.gold,3),circ(40,by,10),fs(P.gold,3);line([-160,330,160,330],16,'#2b1a0e');
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,90,100);fs(P.skin);ctx.beginPath();ctx.moveTo(-70,30);ctx.quadraticCurveTo(0,180,70,30);ctx.closePath();fs('#3a2410');
  ell(0,-60,170,40);fs('#1a1a22');poly([-150,-60,0,-170,150,-60]);fs('#1a1a22');txt('☠',0,-90,40,'#fff',{f:'Pattaya'});
  circ(-34,-4,24);fs('#111',0);line([-60,-24,40,-40],6);circ(34,-4,14);fs('#fff',4);circ(34,-2,6);ctx.fillStyle=OL;ctx.fill();ell(0,46,12+m*6,3+m*12);fs('#7a2a2a',4);ctx.restore();}
function parrot(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x,y+Math.sin(T*6)*6);ctx.scale(s,s);ell(0,60,60,90);fs(P.parrot);ell(0,0,56,56);fs(P.parrot);poly([30,-10,90,10,30,30]);fs(P.gold,5);
  ctx.save();ctx.translate(20,10);ctx.rotate(m*0.5);poly([10,10,70,20,10,26]);fs('#d9a020',4);ctx.restore();circ(-10,-14,14);fs('#fff',4);circ(-6,-12,6);ctx.fillStyle=OL;ctx.fill();
  for(let i=0;i<3;i++)ell(-50,40+i*30,20,46,0.6),fs([P.parrot2,'#3a86ff',P.gold][i],4);ctx.restore();}
function cup(x,y,s,rot=0,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);rr(-60,-90,120,160,16);fs('#fff');if(o.lid){rr(-66,-108,132,26,10);fs('#333');}else{ell(0,-90,60,12);fs(P.coffee,4);}
  ctx.beginPath();ctx.arc(62,-10,30,-1.2,1.2);ctx.lineWidth=14;ctx.strokeStyle=OL;ctx.stroke();ctx.restore();}
function holder(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-30,-40,60,140,8);fs('#555');rr(-30,90,140,30,8);fs('#555');ctx.save();ctx.translate(40,120);line([0,0,0,40],10,'#888');ctx.restore();
  rr(-150,-40,140,30,10);fs('#333');ctx.beginPath();ctx.ellipse(-80,-40,80,20,0,0,Math.PI*2);fs('#444',5);ctx.restore();}
function mapDesk(y,o={}){rr(60,y,960,40,8);fs('#7a4a24');rr(160,y-120,420,120,6);fs(P.map,5);curve([180,y-40,260,y-90,340,y-60,420,y-100],5,P.red);txt('X',430,y-100,30,P.red,{f:'Pattaya'});
  if(o.wet){ctx.save();ctx.globalAlpha=0.7;ell(360,y-60,150,50);ctx.fillStyle=P.coffee;ctx.fill();ctx.restore();}rr(620,y-60,300,50,10);fs('#555',4);}
function sign(t,y,k,col=P.map){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.rotate(-0.03);ctx.scale(E.back(k),E.back(k));rr(-380,-58,760,116,10);fs(col,7);txt(t,0,6,48,OL,{f:'Pattaya',maxW:720});ctx.restore();}

const SCENES={
 ship(lt){shipDeck();captain(400,900,0.85,{mouth:mouthFor('captain')});parrot(640,640,0.8,{});mapDesk(1300);cup(700,1240,0.7);},
 spill(lt,ln){shipDeck();const k=E.out(prog(lt,0.2,0.8));mapDesk(1200,{wet:k>0.6});cup(lerp(680,560,k),lerp(1140,1150,k),0.8,k*1.7);parrot(820,760,1.0,{mouth:mouthFor('parrot')});
  if(k>0.6){for(let i=0;i<8;i++){circ(400+hash(i)*240,1150+hash(i*2)*30,10);fs(P.coffee,0);}}},
 fact(lt){shipDeck();mapDesk(1200);cup(700,1140,0.8);ctx.save();ctx.strokeStyle=P.red;ctx.lineWidth=8;ctx.setLineDash([16,10]);circ(720,1120,140);ctx.stroke();ctx.restore();sign('แก้วชิดคีย์บอร์ด/เอกสาร = หกบ่อย',560,prog(lt,0.3,0.6));},
 why(lt,ln){bgFill(P.deck);mapDesk(1200);const r=Math.sin(lt*3)*0.4;ctx.save();ctx.translate(300,1000);ctx.rotate(r);rr(0,-30,400,60,30);fs(P.skin,6);circ(400,0,44);fs(P.skin,6);ctx.restore();
  cup(700,1140,0.8,r>0.3?1.2:0);txt('ข้อศอกปัด!',540,560,100,P.red,{f:'Pattaya',sw:10,stroke:'#fff'});parrot(880,820,0.6,{mouth:mouthFor('parrot')});},
 holder(lt){shipDeck();const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,1050);ctx.scale(k*1.6,k*1.6);holder(0,0,1);ctx.restore();parrot(260,760,0.8,{mouth:mouthFor('parrot')});sign('ที่วางแก้วหนีบโต๊ะ',560,prog(lt,0.1,0.4),P.gold);},
 clamp(lt){bgFill('#eadbc0');rr(60,1000,800,40,8);fs('#7a4a24');rr(300,940,300,60,10);fs('#555',4);holder(930,1000,1.0);cup(850,940,0.7,0,{lid:1});
  ctx.save();ctx.setLineDash([14,10]);line([600,970,780,970],5,'#2fbf71');ctx.setLineDash([]);ctx.restore();sign('อยู่ขอบโต๊ะ · ห่างของสำคัญ',560,prog(lt,0.3,0.6));},
 tip(lt){bgFill('#eadbc0');rr(60,1000,960,40,8);fs('#7a4a24');rr(380,940,320,60,10);fs('#555',4);holder(150,1000,1.0);cup(80,940,0.7,0,{lid:1});ell(800,970,40,22);fs('#ddd',4);
  txt('มือไม่ถนัด ←',220,800,44,OL,{f:'Pattaya'});sign('ฝั่งมือไม่ถนัด + แก้วมีฝาปิด',560,prog(lt,0.2,0.5));},
 bonus(lt){bgFill('#eadbc0');rr(200,1150,680,90,20);fs('#f5f5f5',6);for(let i=0;i<4;i++)rr(240+i*150,1170,80,50,8),fs('#ddd',4);cup(540,1040,0.8);
  ctx.save();ctx.strokeStyle=P.red;ctx.lineWidth=14;circ(540,1080,220);ctx.stroke();line([380,920,700,1240],14,P.red);ctx.restore();sign('ห้ามวางเครื่องดื่มเหนือปลั๊กพ่วง!',560,prog(lt,0.2,0.5),'#ffb3b3');},
 price(lt){shipDeck();parrot(540,900,1.3,{mouth:mouthFor('parrot')});sign('ราคาไม่แพง!',560,prog(lt,0.2,0.5),P.gold);},
 cta(lt){shipDeck();const o=E.out(prog(lt,0.2,0.8));ctx.save();ctx.translate(540,1150);rr(-200,-60,400,170,10);fs('#8a5a2a',6);ctx.save();ctx.translate(0,-60);ctx.rotate(-o*1.1);ctx.beginPath();ctx.moveTo(-200,0);ctx.quadraticCurveTo(0,-120,200,0);ctx.closePath();fs('#9a6a3a',6);ctx.restore();
  if(o>0.5){ctx.save();ctx.translate(0,-140);ctx.scale(0.7,0.7);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();}ctx.restore();
  captain(260,760,0.55,{mouth:mouthFor('captain')});sign('สมบัติ: ตะกร้าด้านล่าง',560,prog(lt,0.3,0.6),P.gold);},
};

window.EP={font:'Pattaya',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.04*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.rotate(Math.sin(T*1.2)*0.012);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Pattaya',size:62,col:'#ffffff',hl:'#f2c14e',stroke:'#1a120a',sw:14,pop:'back',y:1590,lh:1.3},
  intro(t){shipDeck();const k=E.back(prog(t,0,0.6));ctx.save();ctx.translate(540,800);ctx.scale(k,k);txt('☠',0,0,220,OL,{f:'Pattaya'});ctx.restore();txt('โย่ โฮ่!',540,1050,100,P.gold,{f:'Pattaya',sw:12});},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,10);fs(P.map,8,'#6b4220');txt(TL.title,0,-6,64,OL,{f:'Pattaya',maxW:840});txt('🏴‍☠️ '+TL.series,0,56,30,P.red,{f:'Pattaya'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.save();ctx.fillStyle=P.sea2;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=20)ctx.lineTo(x,H-E.inOut(k)*H*1.1+Math.sin(x*0.03+T*4)*20);ctx.lineTo(W,H);ctx.closePath();ctx.fill();ctx.restore();},
  endCard(k){bgFill(P.sea2);ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,10);fs(P.map,8,'#6b4220');txt('เจอสมบัติแล้ว!',540,770,90,P.red,{f:'Pattaya'});txt('ที่วางแก้วหนีบโต๊ะ',540,910,70,OL,{f:'Pattaya'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,'#6b4220',{f:'Pattaya'});ctx.restore();},
};
