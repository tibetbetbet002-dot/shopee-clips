// EP.34 รีโนเวตโต๊ะใน 30 วิ — แนวเรียลลิตี้แปลงโฉมบ้าน (ลิ้นชักติดใต้โต๊ะ)
OL = '#1b1b1b'; LW = 7;
const P = {yel:'#ffd000',blk:'#1b1b1b',wall:'#f4efe6',wall2:'#e6dccb',wood:'#c98b5a',wood2:'#a86f42',teal:'#1aa6a0',coral:'#ff6f59',skin:'#f0c39c',drawer:'#f2f2f2'};

function hazard(y,h){ctx.save();ctx.beginPath();ctx.rect(0,y,W,h);ctx.clip();for(let i=-4;i<30;i++){ctx.fillStyle=i%2?P.yel:P.blk;poly([i*60,y,i*60+60,y,i*60+60-h,y+h,i*60-h,y+h]);ctx.fill();}ctx.restore();}
function room(){bgFill(P.wall);for(let i=0;i<10;i++){ctx.fillStyle=i%2?P.wall:P.wall2;ctx.fillRect(i*110,330,110,980);}ctx.fillStyle='#d9c7a8';ctx.fillRect(-300,1300,W+600,800);}
function desk(y,o={}){rr(120,y,840,40,8);fs(P.wood);line([160,y+40,160,y+340],18);line([920,y+40,920,y+340],18);
  if(o.mess){for(let i=0;i<10;i++){ctx.save();ctx.translate(180+i*75,y-16-hash(i)*30);ctx.rotate((hash(i*3)-0.5)*0.9);rr(-34,-18,68,36,6);fs(['#ff6b6b','#ffd166','#7bd3ea','#fff','#bde0fe'][i%5],4);ctx.restore();}curve([200,y,350,y-30,520,y+5,700,y-25,860,y],8,'#333');}
  if(o.drawer>0){const d=o.drawer;ctx.save();ctx.globalAlpha=Math.min(1,d*1.5);rr(360,y+40,360,lerp(0,90,d),8);fs(P.drawer,6);rr(510,y+90,60,14,6);fs('#999',3);ctx.restore();}
  if(o.clean){rr(300,y-120,300,120,10);fs('#2b2d42',5);rr(316,y-108,268,96,6);fs('#7ec8f0',0);ell(760,y-16,40,18);fs('#ddd',4);}}
function host(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);poly([-140,130,140,130,160,450,-160,450]);fs(P.teal);
  rr(-80,300,160,90,10);fs(P.yel,5);for(let i=0;i<4;i++)rr(-70+i*40,310,24,30,4),fs('#888',0);
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,88,100);fs(P.skin);ctx.beginPath();ctx.moveTo(-92,30);ctx.quadraticCurveTo(-100,-120,0,-112);ctx.quadraticCurveTo(100,-120,92,30);ctx.quadraticCurveTo(50,-60,-92,30);fs('#7a3a1a');
  rr(-96,-62,192,26,10);fs(P.yel,4);for(const ex of[-32,32]){ell(ex,2,13,15);fs('#fff',4);circ(ex,4,5);ctx.fillStyle=OL;ctx.fill();}ell(0,52,14+m*6,3+m*14);fs('#a0303e',4);
  if(o.tape){line([140,200,240,140],26,OL);line([140,200,240,140],16,P.teal);rr(220,90,80,80,14);fs(P.yel,5);}ctx.restore();}
function owner(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);poly([-130,130,130,130,150,430,-150,430]);fs(P.coral);
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,86,96);fs(P.skin);ctx.beginPath();ctx.arc(0,-20,88,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#222');
  for(const ex of[-30,30]){if(o.wow){circ(ex,2,18);fs('#fff',4);circ(ex,2,8);ctx.fillStyle=OL;ctx.fill();continue;}ell(ex,4,11,o.sad?7:13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}
  if(o.wow){ell(0,56,20,26);fs('#7a1a2a',5);}else ell(0,52,12+m*6,3+m*14),fs('#9a3040',4);ctx.restore();}
function tag(t,x,y,col,k){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(-0.05);ctx.scale(E.back(k),E.back(k));rr(-170,-50,340,100,8);fs(col,6);txt(t,0,6,56,col===P.yel?OL:'#fff',{f:'Mitr'});ctx.restore();}
function caption(t,y,k){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);rr(80,y-54,920,108,10);fs('#1b1b1bee',0);rr(80,y-54,20,108,0);fs(P.yel,0);txt(t,560,y+6,48,'#fff',{f:'Mitr',maxW:860});ctx.restore();}

const SCENES={
 before(lt){room();desk(1050,{mess:1});tag('BEFORE',260,560,P.coral,prog(lt,0.1,0.4));host(820,820,0.6,{mouth:mouthFor('designer'),tape:1});},
 sad(lt){room();desk(1100,{mess:1});owner(540,850,0.9,{mouth:mouthFor('owner'),sad:1});},
 fact(lt,ln){room();desk(950);ctx.save();ctx.globalAlpha=0.35+0.2*Math.sin(T*4);ctx.fillStyle=P.yel;ctx.fillRect(180,990,720,300);ctx.restore();
  txt('พื้นที่ว่างใต้โต๊ะ!',540,1150,70,OL,{f:'Mitr'});host(860,760,0.5,{mouth:mouthFor('designer')});},
 why(lt,ln){room();desk(1100,{mess:1});const k=prog(lt,0.2,ln.dur);ctx.save();ctx.translate(540,1060);line([-200,0,-60,-30],34,OL);line([-200,0,-60,-30],22,P.skin);
  for(let i=0;i<3;i++)star(-60+i*40,-80,20,8,5,T*4,'#ff6b6b',0);ctx.restore();caption('ของเยอะ = วางแขนไม่ถนัด + หาของนาน',560,prog(lt,0.2,0.5));
  const n=Math.floor(k*12);txt('⏱ '+n+' วิ',840,620,70,P.coral,{f:'Mitr'});},
 install(lt,ln){room();const d=E.out(prog(lt,0.3,ln.dur*0.8));desk(950,{drawer:d});
  ctx.save();ctx.translate(lerp(900,700,d),1060);rr(-10,-80,20,80,6);fs('#888',4);ctx.rotate(T*12);line([-20,0,20,0],6,'#555');ctx.restore();
  tag('แปะ / ขันน็อต',540,560,P.yel,prog(lt,0.4,0.7));},
 tip(lt){room();desk(950);ctx.save();ctx.translate(540,0);line([-200,990,-200,1300],8,P.teal);line([-220,990,-180,990],8,P.teal);line([-220,1300,-180,1300],8,P.teal);ctx.restore();
  rr(300,1040,240,60,30);fs(P.skin,5);txt('↕ เข่าขยับได้ ≥ 1 ฝ่ามือ',540,620,52,OL,{f:'Mitr'});host(860,760,0.5,{mouth:mouthFor('designer'),tape:1});},
 bonus(lt){room();desk(1000,{drawer:1,clean:1});tag('ใช้ทุกวัน → บนโต๊ะ',540,560,P.teal,prog(lt,0.2,0.5));tag('นานๆ ใช้ → ลิ้นชัก',540,1250,P.coral,prog(lt,0.8,1.1));
  line([540,1110,540,1190],6,P.coral);},
 reveal(lt,ln){room();const w=E.inOut(prog(lt,0.2,1.2));ctx.save();ctx.beginPath();ctx.rect(0,0,W*w,H);ctx.clip();desk(1050,{drawer:1,clean:1});ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(W*w,0,W,H);ctx.clip();desk(1050,{mess:1});ctx.restore();line([W*w,320,W*w,1500],10,P.yel);tag('AFTER',820,560,P.teal,prog(lt,1.0,1.3));
  owner(540,780,0.45,{wow:1});},
 price(lt){room();desk(1050,{drawer:1,clean:1});tag('งบไม่ถึงพัน',540,580,P.yel,prog(lt,0.2,0.5));host(220,880,0.55,{mouth:mouthFor('designer')});},
 cta(lt){bgFill(P.yel);hazard(330,60);hazard(1400,60);const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,880);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#fff';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  txt('กดตะกร้าด้านล่าง!',540,1150,80,OL,{f:'Mitr'});},
};

window.EP={font:'Mitr',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.06*(1-E.out(prog(lt,0,0.25)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mitr',size:56,col:'#1b1b1b',hl:'#1aa6a0',sw:0,box:'#ffd000',boxR:4,boxPad:28,pop:'back',y:1610,lh:1.35},
  intro(t){bgFill(P.blk);hazard(800,120);const k=E.back(prog(t,0,0.5));ctx.save();ctx.translate(540,1100);ctx.scale(k,k);txt('แปลงโฉม!',0,0,140,P.yel,{f:'Mitr'});ctx.restore();},
  overlay(){hazard(100,24);rr(0,124,W,140,0);fs('#1b1b1bee',0);txt(TL.title,540,176,64,P.yel,{f:'Mitr',maxW:980});txt(TL.series,540,236,30,'#fff',{f:'Mitr'});hazard(264,24);},
  outroGap:0.5,
  outro(k){ctx.save();ctx.beginPath();ctx.rect(0,0,W,H*E.inOut(k));ctx.clip();bgFill(P.yel);hazard(0,H);ctx.restore();},
  endCard(k){bgFill(P.yel);ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,10);fs(P.blk,0);txt('แปลงโฉมสำเร็จ!',540,770,86,P.yel,{f:'Mitr'});txt('ลิ้นชักติดใต้โต๊ะ',540,910,70,'#fff',{f:'Mitr'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.yel,{f:'Mitr'});ctx.restore();},
};
