// EP.20 ปฏิบัติการปลั๊กขาด — แนวสายลับปล้นตึก (ฮับ USB)
OL = '#05080c'; LW = 6;
const P = {night:'#0a1f2c',night2:'#123247',laser:'#ff2b4a',bp:'#1b4f8a',bp2:'#cfe6ff',green:'#39ff88',suit:'#16181d',skin:'#e2b48f',gold:'#f2c14e',hub:'#c9ced6'};

function vault(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.night);g.addColorStop(1,P.night2);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  for(let i=0;i<10;i++)line([i*120,300,i*120,1400],2,'#ffffff10');ctx.fillStyle='#0c1820';ctx.fillRect(-300,1320,W+600,800);}
function lasers(t){for(let i=0;i<6;i++){const y=520+i*130+Math.sin(t*1.5+i)*30;ctx.save();ctx.shadowColor=P.laser;ctx.shadowBlur=20;line([-20,y,1100,y+Math.sin(i)*80],4,P.laser);ctx.restore();}}
function agent(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);ctx.rotate(o.rot||0);
  poly([-150,140,150,140,170,500,-170,500]);fs(P.suit);poly([-30,140,0,230,30,140]);fs('#fff',4);poly([-10,160,10,160,6,240,-6,240]);fs('#111',0);
  rr(-22,92,44,56,10);fs(P.skin);ell(0,0,90,104);fs(P.skin);ctx.beginPath();ctx.arc(0,-30,92,Math.PI*1.05,Math.PI*1.95);ctx.closePath();fs('#111');
  rr(-78,-22,70,36,12);fs('#0a0a0a');rr(8,-22,70,36,12);fs('#0a0a0a');line([-8,-6,8,-6],6,'#0a0a0a');line([-50,-16,-30,-16],4,'#ffffff66');
  ctx.beginPath();ctx.moveTo(-24,54);ctx.quadraticCurveTo(0,62+m*20,24,54);ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.stroke();
  curve([94,0,110,40,90,80],4,'#ddd');circ(94,0,8);fs('#ddd',3);
  if(o.rope)line([0,-120,0,-900],8,'#bbb');
  ctx.restore();}
function laptopSide(x,y,s,ports=2,plugged=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-360,-30,720,60,14);fs('#9aa3b1');rr(-340,-330,30,300,10);fs('#2b2d42');
  for(let i=0;i<ports;i++){rr(300-i*70,-14,44,22,4);fs(i<plugged?P.green:'#111',3);}ctx.restore();}
function hub(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-160,-50,320,100,30);fs(P.hub);for(let i=0;i<4;i++){rr(-120+i*64,-14,44,24,4);fs('#222',3);}circ(130,0,8);ctx.fillStyle=P.green;ctx.fill();
  curve([-160,0,-240,0,-280,60],14,'#333');rr(-310,50,60,40,6);fs('#888',4);ctx.restore();}
function device(kind,x,y,s,ok){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(kind==='mouse'){ell(0,0,50,70);fs('#ddd');line([0,-70,0,-20],4);}
  if(kind==='kb'){rr(-90,-40,180,80,10);fs('#555');for(let i=0;i<6;i++)rr(-80+i*28,-28,22,16,3),fs('#999',0);}
  if(kind==='drive'){rr(-50,-70,100,140,14);fs('#e63946');}
  if(kind==='cam'){circ(0,0,50);fs('#333');circ(0,0,22);fs('#4cc9f0',4);}
  if(kind==='phone'){rr(-40,-80,80,160,14);fs('#222');rr(-32,-70,64,130,8);fs('#7ec8f0',0);}
  if(ok){circ(56,-60,26);fs(P.green,4);line([44,-60,54,-50,70,-72],6,'#fff');}ctx.restore();}
function stamp(x,y,t,k,col=P.laser){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(-0.2);const s=lerp(2.5,1,E.out(k));ctx.scale(s,s);ctx.globalAlpha=Math.min(1,k*2);
  rr(-230,-60,460,120,12);ctx.lineWidth=10;ctx.strokeStyle=col;ctx.stroke();txt(t,0,8,64,col,{f:'Trirong'});ctx.restore();}

const SCENES={
 infil(lt,ln){vault();lasers(T);
  rr(390,1080,300,240,10);fs('#1e3344',6);laptopSide(540,1060,0.4,2);
  const d=E.out(prog(lt,0,ln.dur*0.7));agent(540,lerp(300,760,d),0.75,{mouth:mouthFor('agent'),rope:1,rot:Math.sin(T*2)*0.05});
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.25;ctx.fillStyle='#bfe0ff';poly([500,300,580,300,760,1320,320,1320]);ctx.fill();ctx.restore();},
 brief(lt,ln){bgFill(P.bp);for(let i=0;i<40;i++){line([0,i*50,W,i*50],1,'#ffffff22');line([i*50,0,i*50,H],1,'#ffffff22');}
  ctx.save();ctx.strokeStyle=P.bp2;ctx.lineWidth=4;rr(140,900,800,60,10);ctx.stroke();ctx.restore();for(let i=0;i<2;i++){rr(780-i*80,915,50,26,4);fs(null,4,P.bp2);}
  txt('ช่อง USB: 2',540,1020,56,P.bp2,{f:'Trirong'});
  ['mouse','kb','drive','cam','phone'].forEach((k,i)=>{const kk=prog(lt,0.3+i*0.2,0.5+i*0.2);if(kk>0){ctx.save();ctx.globalAlpha=kk;device(k,170+i*185,640,0.9,false);ctx.restore();}});
  if(lt>ln.dur*0.6){const c=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));ctx.save();ctx.translate(540,1220);ctx.scale(c,c);rr(-260,-55,520,110,10);fs(P.laser,0);txt('อุปกรณ์ 5 > ช่อง 2',0,6,54,'#fff',{f:'Trirong'});ctx.restore();}},
 problem(lt,ln){vault();laptopSide(540,1050,1.1,2,1);
  const c=(lt*1.6)%1,inP=c<0.5;const px=lerp(1000,900,inP?E.out(c*2):1-E.out((c-0.5)*2));
  rr(px-20,1032,140,36,8);fs('#555');rr(px-60,1036,44,28,4);fs('#bbb',3);
  for(let i=0;i<4;i++){const a=T*20+i;line([870+Math.cos(a)*30,1040+Math.sin(a)*30,870+Math.cos(a)*55,1040+Math.sin(a)*55],5,P.gold);}
  txt('ถอด… เสียบ… ถอด… เสียบ…',540,700,58,'#fff',{f:'Trirong'});
  const k=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));if(k>0){ctx.save();ctx.translate(780,880);ctx.scale(k,k);rr(-180,-50,360,100,10);fs(P.laser,0);txt('ช่องหลวม!',0,6,52,'#fff',{f:'Trirong'});ctx.restore();}},
 gadget(lt,ln){vault();
  const o=E.out(prog(lt,0.2,0.8));ctx.save();ctx.translate(540,1150);rr(-340,-40,680,260,20);fs('#2b2b2b',8);rr(-340,-40,680,40,10);fs('#3a3a3a',0);rr(-40,-60,80,30,8);fs(P.gold,4);
  ctx.save();ctx.translate(0,-40);ctx.scale(1,lerp(1,-0.15,o));rr(-340,-260,680,260,20);fs('#222',8);ctx.restore();
  if(o>0.5){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=o;const g=ctx.createRadialGradient(0,40,10,0,40,500);g.addColorStop(0,'rgba(120,255,200,0.7)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-600,-500,1200,800);ctx.restore();hub(0,80,1.1);}
  ctx.restore();if(o>0.8)txt('อุปกรณ์ลับ: ฮับ USB',540,700,70,P.green,{f:'Trirong',sw:8});},
 plug(lt,ln){bgFill('#06140c');for(let i=0;i<40;i++)line([0,330+i*30,W,330+i*30],1,'#39ff8812');
  laptopSide(420,1150,0.7,2,1);hub(800,1100,0.8);curve([600,1150,660,1180,560,1100],12,'#333');
  ['mouse','kb','drive','cam'].forEach((k,i)=>{const on=lt>0.3+i*0.22;device(k,180+i*240,700,0.95,on);if(on){line([180+i*240,780,720+i*40,1080],4,P.green);}});
  txt('ใช้ได้ครบทุกชิ้น',540,470,66,P.green,{f:'Trirong'});},
 price(lt,ln){vault();
  ctx.save();ctx.translate(540,1000);ell(0,60,300,160);fs(P.skin,6);for(let i=0;i<4;i++){rr(-260+i*120,-120,90,200,40);fs(P.skin,6);}hub(0,0,0.9);ctx.restore();
  stamp(540,600,'ขนาดพกพา',prog(lt,0.1,0.4),P.green);stamp(540,1350,'ไม่แพง',prog(lt,ln.dur*0.5,ln.dur*0.7),P.gold);},
 cta(lt,ln){vault();
  ctx.save();ctx.translate(540,960);ctx.rotate(0.03);rr(-380,-430,760,860,10);fs('#c9a86a',8);rr(-380,-500,260,90,10);fs('#c9a86a',8);txt('ลับเฉพาะ',-250,-455,40,'#5a3e1b',{f:'Trirong'});
  txt('ภารกิจ: ปลั๊กขาด',0,-330,56,'#3a2a10',{f:'Trirong'});
  ctx.save();ctx.translate(0,-40);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  txt('รับอุปกรณ์ที่ตะกร้าด้านล่าง',0,200,52,'#3a2a10',{f:'Trirong'});ctx.restore();
  stamp(560,1250,'ภารกิจจบ',prog(lt,ln.dur*0.75,ln.dur*0.95));},
};

window.EP={font:'Trirong',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Trirong',size:58,col:'#ffffff',hl:'#39ff88',sw:0,box:'#05080ce6',boxLine:3,boxLineCol:'#ff2b4a',boxR:0,boxPad:30,pop:'type',y:1600,lh:1.4},
  intro(t){vault();lasers(T);const k=prog(t,0.2,1.0);ctx.save();ctx.globalAlpha=k;txt('ลับสุดยอด',540,900,120,P.laser,{f:'Trirong'});ctx.restore();},
  overlay(t){ctx.save();ctx.translate(540,195);rr(-460,-90,920,180,4);fs('#05080cdd',4,P.laser);
    rr(-460,-90,190,40,0);fs(P.laser,0);txt('CLASSIFIED',-365,-70,24,'#fff',{f:'Trirong'});
    txt(TL.title,0,0,76,'#fff',{f:'Trirong',maxW:860});txt(TL.series,0,60,30,P.green,{f:'Trirong'});ctx.restore();
    const n=Math.floor(T*4)%2;circ(1010,370,10);ctx.fillStyle=n?P.laser:'#550000';ctx.fill();},
  post(){grain(0.04);},
  outroGap:0.55,
  outro(k){ctx.save();ctx.fillStyle='#000';ctx.beginPath();ctx.rect(0,0,W,H);ctx.arc(540,960,lerp(1300,0,E.inOut(k)),0,Math.PI*2,true);ctx.fill('evenodd');ctx.restore();},
  endCard(k){bgFill('#05080c');ctx.save();ctx.globalAlpha=k;txt('ภารกิจสำเร็จ',540,780,110,P.green,{f:'Trirong'});
    txt('ฮับ USB',540,950,96,'#fff',{f:'Trirong'});txt('อยู่ในตะกร้าด้านล่าง',540,1060,58,P.gold,{f:'Trirong'});ctx.restore();},
};
