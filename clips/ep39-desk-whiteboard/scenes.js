// EP.39 คาถาจำได้ทุกงาน — แนวโรงเรียนเวทมนตร์ (ไวท์บอร์ดตั้งโต๊ะ)
OL = '#170f26'; LW = 7;
const P = {stone:'#3d3458',stone2:'#2e2745',robe:'#3a1f5c',robe2:'#7a1f2e',gold:'#f2c14e',spark:'#fff3a8',skin:'#f1c9a5',board:'#ffffff',chalk:'#2b2b33',owl:'#8a6a4a'};

function castle(){bgFill(P.stone);for(let r=0;r<14;r++)for(let c=0;c<8;c++){ctx.fillStyle=(r+c)%2?P.stone:P.stone2;ctx.fillRect(c*140+(r%2)*70-70,320+r*72,136,68);}
  for(let i=0;i<5;i++){const x=150+i*200,y=440+Math.sin(T*1.5+i)*14;rr(x-12,y,24,60,4);fs('#f3e6c8',3);ell(x,y-8,7,14);ctx.fillStyle=P.spark;ctx.fill();
    ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(x,y,0,x,y,120);g.addColorStop(0,'rgba(255,243,168,0.35)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-120,y-120,240,240);ctx.restore();}
  ctx.fillStyle='#22192f';ctx.fillRect(-300,1300,W+600,800);}
function sparkles(x,y,r,n=10){for(let i=0;i<n;i++){const a=i/n*Math.PI*2+T*1.5;star(x+Math.cos(a)*r,y+Math.sin(a)*r*0.6,16,6,4,T*3,P.spark);}}
function wizard(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.3),y+boil(2,1.3));ctx.scale(s,s);
  poly([-170,130,170,130,230,520,-230,520]);fs(P.robe);for(let i=0;i<8;i++)star(-120+i*35,250+(i%2)*120,12,5,5,0,P.gold,0);
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,86,98);fs(P.skin);ctx.beginPath();ctx.moveTo(-60,40);ctx.quadraticCurveTo(0,240,60,40);ctx.closePath();fs('#ddd');
  ell(0,-70,180,36);fs(P.robe);poly([-90,-76,90,-76,20,-320]);fs(P.robe);star(20,-200,20,8,5,0,P.gold,0);
  for(const ex of[-30,30]){circ(ex,-4,22);fs('#fff8',4);circ(ex,-2,6);ctx.fillStyle=OL;ctx.fill();}line([-8,-4,8,-4],4);
  ell(0,46,10+m*6,2+m*10);fs('#7a2a2a',4);if(o.wand){line([160,200,300,40],10,'#6b4a2a');star(310,30,30,12,5,T*4,P.spark,4);}ctx.restore();}
function pupil(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.3),y+boil(4,1.3));ctx.scale(s,s);poly([-130,120,130,120,160,440,-160,440]);fs('#22192f');poly([-40,120,0,190,40,120]);fs(P.robe2,4);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,82,92);fs(P.skin);ctx.beginPath();ctx.moveTo(-86,30);ctx.quadraticCurveTo(-90,-110,0,-104);ctx.quadraticCurveTo(90,-110,86,30);ctx.quadraticCurveTo(40,-50,-86,30);fs('#7a3a1a');
  for(const ex of[-28,28]){if(o.happy){ctx.beginPath();ctx.arc(ex,4,12,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}ell(ex,4,11,o.panic?16:13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}
  ell(0,48,10+m*6+(o.panic?6:0),3+m*12+(o.panic?8:0));fs('#a03040',4);ctx.restore();}
function owl(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,60,80);fs(P.owl);for(const ex of[-22,22]){circ(ex,-20,20);fs('#fff',4);circ(ex,-20,8);ctx.fillStyle='#000';ctx.fill();}poly([-8,0,8,0,0,14]);fs(P.gold,3);ctx.restore();}
function wb(x,y,s,items,done=0,draw=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-260,-180,520,340,14);fs(P.board,8,'#888');line([-200,160,-240,260],10,'#888');line([200,160,240,260],10,'#888');
  items.forEach((t,i)=>{const k=clamp(draw*items.length-i);if(k<=0)return;ctx.save();ctx.beginPath();ctx.rect(-230,-150+i*90,460*k,80);ctx.clip();txt('□ '+t,-220,-110+i*90,46,P.chalk,{f:'Pattaya',align:'left'});ctx.restore();
    if(i<done){line([-180,-110+i*90,200,-110+i*90],8,'#e63946');}});ctx.restore();}
function scroll(t,y,k,col=P.gold){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);rr(90,y-56,900,112,14);fs('#170f26dd',5,col);txt(t,540,y+6,48,col,{f:'Pattaya',maxW:860});ctx.restore();}

const SCENES={
 class(lt){castle();owl(900,600,0.8);pupil(540,900,1.0,{mouth:mouthFor('pupil'),panic:1});},
 brain(lt,ln){castle();ctx.save();ctx.translate(540,880);ell(0,0,300,220);fs('#ffb3c6',6);ctx.save();ell(0,0,296,216);ctx.clip();
  const n=Math.floor(prog(lt,0,ln.dur)*14);for(let i=0;i<n;i++){rr(-260+hash(i)*420,-180+hash(i*2)*300,110,50,8);fs(['#ffd166','#7bd3ea','#a1eebd','#f6a6ff'][i%4],3);}ctx.restore();ctx.restore();
  wizard(860,1200,0.45,{mouth:mouthFor('prof')});scroll('จำหลายเรื่อง = วอกแวก',1260,prog(lt,0.3,0.6));},
 fact(lt,ln){castle();ctx.save();ctx.translate(540,880);ell(0,0,260,190);fs('#ffb3c6',6);ctx.restore();const k=E.out(prog(lt,0.3,ln.dur*0.7));
  ctx.save();ctx.translate(lerp(540,820,k),lerp(880,820,k));rr(-80,-50,160,100,10);fs('#ffd166',4);txt('งาน',0,6,34,OL,{f:'Pattaya'});ctx.restore();wb(820,820,0.5,['งาน A','งาน B'],0,k);
  scroll('เขียนแผนงาน → ใจไม่ค้าง',1250,prog(lt,0.4,0.7));txt('*บางงานวิจัยพบ',540,1350,30,'#c9b8e0',{f:'Pattaya'});},
 why(lt,ln){castle();pupil(540,900,1.0,{mouth:mouthFor('pupil'),happy:1});ctx.save();ctx.globalAlpha=prog(lt,0.3,1.0);ctx.translate(540,560);rr(-250,-50,500,100,50);fs('#fff',5);txt('ปล่อยวาง → โฟกัส',0,6,46,OL,{f:'Pattaya'});ctx.restore();},
 ask(lt){castle();pupil(540,900,1.2,{mouth:mouthFor('pupil'),panic:1});sparkles(540,800,300,8);},
 spell(lt){castle();wizard(320,880,0.8,{mouth:mouthFor('prof'),wand:1});pupil(880,1180,0.45,{mouth:mouthFor('pupil'),panic:1});const k=E.back(prog(lt,0.3,0.8));ctx.save();ctx.translate(760,960);ctx.scale(k,k);wb(0,0,0.6,['…'],0,1);ctx.restore();sparkles(760,960,260,12);},
 board(lt,ln){castle();wb(540,920,1.3,['รายงาน','ตอบอีเมล','ประชุม 3 โมง'],0,prog(lt,0.2,ln.dur*0.9));scroll('จดงาน · ลบได้ · วางข้างจอ',1350,prog(lt,0.4,0.7));},
 tip(lt,ln){castle();wb(540,880,1.3,['งานสำคัญ 1','งานสำคัญ 2','งานสำคัญ 3'],0,1);txt('3',880,560,160,P.gold,{f:'Pattaya',sw:10});scroll('แค่ 3 งานสำคัญ ทำทีละงาน',1300,prog(lt,0.3,0.6));},
 bonus(lt,ln){castle();const night=prog(lt,0,ln.dur*0.5);ctx.save();ctx.globalAlpha=0.5*night;ctx.fillStyle='#0b0820';ctx.fillRect(0,0,W,H);ctx.restore();wb(540,880,1.2,['พรุ่งนี้: …','…','…'],0,prog(lt,0.4,ln.dur));
  circ(880,560,60);fs('#fff3c4',0);scroll('ก่อนเลิกงาน จดงานพรุ่งนี้ไว้',1300,prog(lt,0.3,0.6));},
 done(lt,ln){castle();wb(540,820,1.1,['รายงาน','ตอบอีเมล','ประชุม'],Math.min(3,Math.floor(lt*2)),1);pupil(260,1200,0.55,{mouth:mouthFor('pupil'),happy:1});scroll('ขีดฆ่าแล้วสะใจ · ราคาไม่แพง',1350,prog(lt,ln.dur*0.4,ln.dur*0.6));},
 cta(lt){castle();owl(260,700,0.9);const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(640,940);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();sparkles(640,900,260,10);scroll('ตำราอยู่ในตะกร้าด้านล่าง',1260,prog(lt,0.3,0.6));},
};
SCENES.spell=SCENES.spell;

window.EP={font:'Pattaya',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Pattaya',size:60,col:'#fff3c4',hl:'#f2c14e',stroke:'#170f26',sw:14,pop:'fade',y:1590,lh:1.3},
  intro(t){castle();sparkles(540,900,300*prog(t,0,1),16);const k=prog(t,0.3,1.2);ctx.save();ctx.globalAlpha=k;txt('โรงเรียนเวทมนตร์',540,900,100,P.gold,{f:'Pattaya',sw:10});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,88);fs('#170f26ee',6,P.gold);txt(TL.title,0,-6,70,P.gold,{f:'Pattaya',maxW:840});txt('✨ '+TL.series,0,56,32,'#e0c8ff',{f:'Pattaya'});ctx.restore();},
  outroGap:0.6,
  outro(k){sparkles(540,960,800*(1-k),30);ctx.fillStyle=`rgba(23,15,38,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){castle();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,30);fs('#170f26ee',8,P.gold);txt('สอบผ่าน!',540,770,100,P.gold,{f:'Pattaya'});txt('ไวท์บอร์ดตั้งโต๊ะ',540,910,74,'#fff',{f:'Pattaya'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.gold,{f:'Pattaya'});ctx.restore();},
};
