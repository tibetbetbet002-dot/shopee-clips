// EP.21 ศึกเพลิงไหม้กรุงศรี — แนวพงศาวดาร ภาพจิตรกรรมฝาผนังไทย (ปลั๊กพ่วงมาตรฐาน มอก.)
OL = '#2a0f05'; LW = 6;
const P = {wall:'#8c2f1b',wall2:'#a8432a',gold:'#e0b13a',gold2:'#f6d77a',cream:'#f3e2c0',green:'#2f5d50',skin:'#f0c89a',black:'#1c120c',red:'#c0392b',fire:'#ff7b00'};

function mural(){bgFill(P.wall);ctx.save();ctx.globalAlpha=0.18;for(let i=0;i<40;i++){const x=hash(i)*W,y=300+hash(i*2)*1200;
  ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+30,y-50,x+10,y-90);ctx.quadraticCurveTo(x-10,y-50,x,y);ctx.fillStyle=P.gold2;ctx.fill();}ctx.restore();
  for(let i=0;i<14;i++){poly([i*80,330,i*80+40,300,i*80+80,330]);fs(P.gold,3);}rr(0,330,W,18,0);fs(P.gold,0);
  ctx.fillStyle=P.wall2;ctx.fillRect(-300,1300,W+600,800);for(let i=0;i<14;i++){circ(i*80+40,1300,14);fs(P.gold,3);}}
function thaiPerson(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(o.f?3:1,1.2),y+boil(o.f?4:2,1.2));ctx.scale(s,s);
  if(o.f){poly([-120,120,120,120,150,460,-150,460]);fs(P.green);poly([-120,120,0,200,120,120,80,250,-80,250]);fs(P.gold,4);}
  else{poly([-130,120,130,120,140,300,-140,300]);fs(P.gold);rr(-140,300,280,160,20);fs(P.red);line([-140,380,140,380],6,P.gold);}
  rr(-20,80,40,50,8);fs(P.skin);ell(0,0,78,92);fs(P.skin);
  ctx.beginPath();ctx.arc(0,-24,80,Math.PI,0);ctx.closePath();fs(P.black);
  poly([-60,-60,60,-60,40,-120,0,-260,-40,-120]);fs(P.gold,4);for(let i=0;i<4;i++)rr(-46+i*8,-80-i*40,92-i*16,14,4),fs(P.gold2,2);
  for(const ex of[-28,28]){ctx.beginPath();ctx.moveTo(ex-18,0);ctx.quadraticCurveTo(ex,-10,ex+18,-2);ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.stroke();
    circ(ex,o.shock?-2:2,o.shock?7:4);ctx.fillStyle=OL;ctx.fill();}
  line([-46,-26,-12,-30],4);line([12,-30,46,-26],4);ell(0,46,10+m*6,2+m*12);fs('#8a2a2a',4);
  if(o.point){line([120,160,230,80],22,OL);line([120,160,230,80],14,P.skin);}
  ctx.restore();}
function strip(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-260,-50,520,100,22);fs(o.cheap?'#ddd':'#fafafa');
  for(let i=0;i<4;i++){rr(-200+i*110,-28,70,56,10);fs('#e6e6e6',4);rr(-180+i*110,-18,10,22,3);fs(OL,0);rr(-150+i*110,-18,10,22,3);fs(OL,0);if(!o.cheap){circ(-165+i*110,-40,8);fs('#2ecc71',3);}}
  if(!o.cheap){rr(180,-30,60,60,10);fs(P.red,4);rr(-250,-46,90,30,6);fs('#1565c0',3);txt('มอก.',-205,-30,22,'#fff',{f:'Mitr'});}
  curve([-260,0,-330,30,-380,90],10,'#555');ctx.restore();}
function smoke(x,y,k){for(let i=0;i<6;i++){const ph=(T*0.7+i/6)%1;ctx.save();ctx.globalAlpha=(1-ph)*k;circ(x+Math.sin(T*2+i)*30,y-ph*300,30+ph*60);ctx.fillStyle='#555';ctx.fill();ctx.restore();}}
function flames(x,y,k){for(let i=0;i<5;i++){const h=(60+hash(i+Math.floor(T*12))*60)*k;ctx.beginPath();ctx.moveTo(x-60+i*30,y);ctx.quadraticCurveTo(x-70+i*30,y-h,x-50+i*30,y-h*1.3);ctx.quadraticCurveTo(x-30+i*30,y-h,x-40+i*30,y);ctx.fillStyle=i%2?P.fire:'#ffd23f';ctx.fill();}}
function scroll(x,y,w,h,k){const ww=w*E.out(k);rr(x-ww/2,y,ww,h,6);fs(P.cream,5);rr(x-ww/2-20,y-10,20,h+20,8);fs(P.gold,4);rr(x+ww/2,y-10,20,h+20,8);fs(P.gold,4);}
function badge(t,x,y,k,col=P.gold){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(E.back(k),E.back(k));rr(-230,-52,460,104,52);fs(col,6,OL);txt(t,0,4,48,OL,{f:'Charm',maxW:420});ctx.restore();}
function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold2;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();}

const SCENES={
 palace(lt){mural();thaiPerson(300,900,1.0,{mouth:mouthFor('lord'),shock:1,point:1});strip(720,1200,0.7,{cheap:1});smoke(720,1150,1);flames(720,1180,0.6+0.4*Math.sin(T*8));},
 cause(lt,ln){mural();thaiPerson(800,900,0.9,{f:1,mouth:mouthFor('lady')});strip(420,1100,0.8,{cheap:1});
  ['หม้อหุงข้าว','กาต้มน้ำ','ไดร์เป่าผม'].forEach((t,i)=>{const k=prog(lt,0.3+i*0.5,0.6+i*0.5);if(k<=0)return;ctx.save();ctx.translate(200+i*220,720);ctx.scale(E.back(k),E.back(k));rr(-100,-50,200,100,14);fs(P.cream,5);txt(t,0,4,34,OL,{f:'Charm'});ctx.restore();line([200+i*220,770,300+i*60,1060],5,P.gold2);});
  const ov=prog(lt,1.5,ln.dur);if(ov>0){rr(240,1220,360,40,20);fs('#333',4);rr(246,1226,348*ov,28,14);fs(P.red,0);txt('โหลดเกิน!',420,1300,44,P.gold2,{f:'Charm'});}},
 law(lt){mural();scroll(540,560,760,520,prog(lt,0,0.6));if(lt>0.5){txt('ราชโองการ',540,650,72,P.red,{f:'Sri2'});txt('๑. ต้องมี มอก.',540,780,52,OL,{f:'Charm'});txt('๒. มีฟิวส์/เบรกเกอร์ตัดไฟ',540,860,52,OL,{f:'Charm',maxW:680});txt('๓. สายไฟหนา แข็งแรง',540,940,52,OL,{f:'Charm'});}
  thaiPerson(540,1280,0.45,{mouth:mouthFor('lord')});},
 why(lt,ln){bgFill('#2a0f05');const k=prog(lt,0,ln.dur);
  ctx.save();ctx.translate(540,900);rr(-420,-60,840,120,60);fs('#7a5a3a',8);rr(-400,-40,800,80,40);fs(`rgb(${180+k*75},${120-k*60},${60-k*40})`,0);
  for(let i=0;i<6;i++){const ph=(T*1.5+i/6)%1;circ(-380+ph*760,0,10);ctx.fillStyle='#ffe066';ctx.fill();}
  if(k>0.5){for(let i=0;i<4;i++)star(-200+i*130+hash(i+Math.floor(T*10))*40,-70,30,10,6,T*6,'#fff27a',0);}ctx.restore();
  txt('กระแสเกิน → สายร้อน',540,640,64,P.gold2,{f:'Charm'});txt('ฉนวนละลาย → ประกายไฟ',540,1120,60,P.fire,{f:'Charm'});},
 gift(lt){mural();thaiPerson(300,880,0.9,{f:1,mouth:mouthFor('lady')});
  const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(720,1050);ctx.scale(k,k);rr(-300,40,600,40,20);fs(P.gold,5);strip(0,0,0.9);ctx.restore();
  for(let i=0;i<8;i++){const a=T+i*0.8;star(720+Math.cos(a)*300,1040+Math.sin(a)*140,20,7,4,T*2,P.gold2);}
  badge('สวิตช์แยก',780,600,prog(lt,1.2,1.5));badge('ตัดไฟอัตโนมัติ',780,730,prog(lt,1.8,2.1));},
 check(lt,ln){mural();
  ctx.save();ctx.translate(540,800);ctx.beginPath();ctx.arc(0,0,260,Math.PI,0);ctx.lineWidth=30;ctx.strokeStyle='#5a3a2a';ctx.stroke();
  const v=lerp(0.1,0.92,E.inOut(prog(lt,0.2,ln.dur*0.7)));const a=Math.PI+v*Math.PI;
  for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(0,0,260,Math.PI+i*Math.PI/3,Math.PI+(i+1)*Math.PI/3);ctx.strokeStyle=['#2ecc71','#f1c40f','#e74c3c'][i];ctx.lineWidth=22;ctx.stroke();}
  line([0,0,Math.cos(a)*220,Math.sin(a)*220],12,OL);circ(0,0,24);fs(P.gold,5);ctx.restore();
  txt('รวมวัตต์ ≤ ที่ปลั๊กรองรับ',540,960,58,P.gold2,{f:'Charm'});txt('(ดูตัวเลขบนฉลากปลั๊ก)',540,1040,42,P.cream,{f:'Charm'});
  thaiPerson(540,1300,0.4,{mouth:mouthFor('lord')});},
 tip(lt){mural();
  const x=[[300,'ต่อหลายทอด'],[780,'วางใต้พรม']];x.forEach(([cx,t],i)=>{ctx.save();ctx.translate(cx,850);rr(-200,-200,400,400,20);fs('#5a2010',6,P.gold);
    if(i===0){strip(-60,-60,0.35,{cheap:1});strip(20,40,0.35,{cheap:1});strip(100,140,0.35,{cheap:1});}else{strip(0,40,0.4,{cheap:1});ctx.fillStyle='#7a5a9a';ctx.fillRect(-180,-20,360,120);}
    line([-160,-160,160,160],18,P.red);line([160,-160,-160,160],18,P.red);ctx.restore();txt(t,cx,1110,48,P.gold2,{f:'Charm'});});},
 bonus(lt){mural();strip(540,950,0.9,{cheap:1});const k=prog(lt,0.2,1);smoke(540,900,k*0.7);
  ctx.save();ctx.globalAlpha=0.3+0.3*Math.sin(T*10);circ(540,950,260);ctx.fillStyle=P.fire;ctx.fill();ctx.restore();
  badge('อุ่นผิดปกติ / กลิ่นไหม้ = หยุดใช้!',540,620,prog(lt,0.3,0.6),'#ff6b4a');},
 peace(lt){mural();thaiPerson(330,900,0.8,{mouth:0});thaiPerson(760,900,0.8,{f:1,mouth:mouthFor('lady')});
  for(let i=0;i<10;i++){const a=i*0.63+T*0.4;star(540+Math.cos(a)*420,700+Math.sin(a)*120,18,6,4,T,P.gold2);}badge('ราคาไม่แพง',540,560,prog(lt,0.4,0.7));},
 cta(lt){mural();scroll(540,520,760,700,1);txt('ประกาศ',540,620,80,P.red,{f:'Sri2'});const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,900);ctx.scale(b,b);basket(0,0,1.1);ctx.restore();
  txt('ไปที่ตะกร้าด้านล่าง',540,1110,62,OL,{f:'Charm'});const ay=1250+Math.abs(Math.sin(T*5))*18;poly([500,ay-36,580,ay-36,580,ay,620,ay,540,ay+44,460,ay,500,ay]);fs(P.gold,6);},
};

window.EP={font:'Charm',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.04*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Charm',size:62,col:'#f6d77a',hl:'#ffffff',sw:0,box:'#2a0f05e6',boxLine:5,boxLineCol:'#e0b13a',boxR:12,boxPad:30,pop:'fade',y:1600,lh:1.3},
  intro(t){mural();const k=prog(t,0.1,1.0);ctx.save();ctx.globalAlpha=k;txt('พงศาวดาร',540,860,120,P.gold2,{f:'Sri2'});txt('โต๊ะคอม',540,1000,90,P.cream,{f:'Sri2'});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-92,900,184,10);fs('#2a0f05ee',6,P.gold);txt(TL.series,0,-44,36,P.gold,{f:'Charm'});txt(TL.title,0,30,80,P.gold2,{f:'Sri2',maxW:840});ctx.restore();},
  outroGap:0.6,
  outro(k){ctx.fillStyle=`rgba(42,15,5,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){mural();ctx.save();ctx.globalAlpha=k;rr(140,640,800,520,20);fs('#2a0f05ee',8,P.gold);txt('จบพงศาวดาร',540,760,90,P.gold2,{f:'Sri2'});
    txt('ปลั๊กพ่วงมาตรฐาน มอก.',540,920,62,P.cream,{f:'Charm'});txt('อยู่ในตะกร้าด้านล่าง',540,1030,58,P.gold,{f:'Charm'});ctx.restore();},
};
