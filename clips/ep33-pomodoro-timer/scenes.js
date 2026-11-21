// EP.33 การ์ดใบสุดท้าย: โฟกัส — แนวดวลเกมการ์ดสะสม (นาฬิกาจับเวลาโพโมโดโร)
OL = '#0d0a14'; LW = 6;
const P = {table:'#1d3b2a',table2:'#16301f',gold:'#e8c15a',red:'#e63946',blue:'#3a86ff',purple:'#7b2cbf',tomato:'#ff4d3d',leaf:'#2fbf71',card:'#f6ecd2'};

function field(){bgFill(P.table);ctx.save();ctx.globalAlpha=0.15;for(let i=0;i<20;i++)line([0,300+i*80,W,300+i*80],2,'#fff');ctx.restore();
  ctx.strokeStyle=P.gold;ctx.lineWidth=4;for(let i=0;i<3;i++){rr(130+i*290,1120,240,320,14);ctx.stroke();rr(130+i*290,420,240,320,14);ctx.stroke();}line([60,930,1020,930],4,P.gold);}
function card(x,y,s,o){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);if(o.glow){ctx.save();ctx.shadowColor=o.col;ctx.shadowBlur=50;rr(-150,-210,300,420,18);fs(o.col,0);ctx.restore();}
  rr(-150,-210,300,420,18);fs(P.card,6);rr(-136,-196,272,40,8);fs(o.col,0);txt(o.name,0,-176,26,'#fff',{f:'Kod',maxW:250});
  rr(-130,-146,260,190,8);fs('#22223a',4);ctx.save();ctx.translate(0,-50);o.art&&o.art();ctx.restore();
  rr(-130,60,260,100,6);fs('#fffaf0',3);txt(o.text||'',0,108,22,OL,{f:'Kod',maxW:240});txt('ATK '+(o.atk||0),-70,184,22,P.red,{f:'Kod'});txt('DEF '+(o.def||0),70,184,22,P.blue,{f:'Kod'});ctx.restore();}
function demonArt(){circ(0,0,70);fs('#5a189a',4);for(const ex of[-24,24]){circ(ex,-10,12);fs('#ff4d6d',0);}poly([-50,-50,-30,-100,-10,-55]);fs('#5a189a',3);poly([50,-50,30,-100,10,-55]);fs('#5a189a',3);
  rr(30,10,40,60,8);fs('#ddd',3);circ(66,4,12);fs(P.red,0);txt('99+',66,6,12,'#fff',{f:'Kod'});}
function tomatoArt(){circ(0,10,70);fs(P.tomato,5);for(let i=0;i<5;i++){ctx.save();ctx.rotate(i*1.25);ell(0,-70,10,24);fs(P.leaf,3);ctx.restore();}circ(0,10,40);fs('#fff8',3);line([0,10,0,-16],5);line([0,10,20,18],5);}
function tomatoTimer(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);circ(0,0,150);fs(P.tomato,8);for(let i=0;i<5;i++){ctx.save();ctx.rotate(i*1.25);ell(0,-150,18,40);fs(P.leaf,5);ctx.restore();}
  for(let i=0;i<12;i++){ctx.save();ctx.rotate(i*Math.PI/6);line([0,-120,0,-100],5,'#fff');ctx.restore();}ctx.save();ctx.rotate(t);line([0,0,0,-90],10,'#fff');ctx.restore();circ(0,0,16);fs('#fff',4);ctx.restore();}
function hpBar(x,y,v,col,label){rr(x,y,360,40,20);fs('#000',4);rr(x+4,y+4,352*clamp(v),32,16);fs(col,0);txt(label,x+180,y+22,24,'#fff',{f:'Kod'});}
function banner(t,y,k,col=P.gold){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.scale(E.back(k),E.back(k));rr(-400,-56,800,112,10);fs('#0d0a14ee',5,col);txt(t,0,6,48,col,{f:'Kod',maxW:760});ctx.restore();}
function phone(x,y,s,buzz){ctx.save();ctx.translate(x+(buzz?Math.sin(T*60)*5:0),y);ctx.scale(s,s);rr(-70,-130,140,260,20);fs('#222');rr(-58,-112,116,210,10);fs('#3a86ff',0);circ(40,-90,20);fs(P.red,0);txt('9',40,-88,20,'#fff',{f:'Kod'});ctx.restore();}

const SCENES={
 draw(lt){field();hpBar(60,340,1,P.red,'คู่แข่ง');const k=E.back(prog(lt,0.2,0.7));card(540,700,0.9*k,{name:'ปีศาจแจ้งเตือน',col:P.purple,art:demonArt,text:'ทำลายสมาธิทั้งหมด',atk:9999,def:0,glow:1});},
 hit(lt,ln){field();hpBar(60,1460,lerp(1,0.2,prog(lt,0.3,ln.dur)),P.leaf,'สมาธิของเรา');phone(540,900,1.4,true);
  for(let i=0;i<6;i++){const a=T*6+i;txt('-'+Math.floor(10+hash(i)*30),540+Math.cos(a)*300,900+Math.sin(a)*200,48,P.red,{f:'Kod',sw:6});}},
 fact(lt,ln){field();const p=(lt*0.8)%1;tomatoTimer(540,880,1.2,p*Math.PI*2);banner('โฟกัส 25 นาที',520,prog(lt,0.2,0.5),P.tomato);banner('พัก 5 นาที',1240,prog(lt,ln.dur*0.5,ln.dur*0.7),P.leaf);},
 why(lt,ln){bgFill('#0d0a14');const tasks=['งาน','แชท','งาน','โซเชียล','งาน'];tasks.forEach((t,i)=>{const x=150+i*195;rr(x-80,800,160,100,14);fs(i%2?P.purple:P.blue,4);txt(t,x,856,34,'#fff',{f:'Kod'});
    if(i<4){line([x+80,850,x+115,850],6,P.red);txt('⟳',x+98,800,40,P.red,{f:'Kod'});}});
  banner('สลับงาน = สมองต้องเริ่มโฟกัสใหม่',560,prog(lt,0.2,0.5),P.red);banner('เสียเวลาสะสมไปเรื่อยๆ',1150,prog(lt,ln.dur*0.5,ln.dur*0.7));},
 summon(lt){field();const k=E.back(prog(lt,0.2,0.7));for(let i=0;i<12;i++){const a=i/12*Math.PI*2+T;line([540,880,540+Math.cos(a)*500*k,880+Math.sin(a)*500*k],6,P.gold);}
  card(540,880,1.0*k,{name:'นาฬิกาโพโมโดโร',col:P.tomato,art:tomatoArt,text:'ปัดสมาธิหลุดทิ้ง',atk:2500,def:3000,glow:1});},
 effect(lt,ln){field();tomatoTimer(540,850,1.0,lt*2);phone(840,1200,0.6,false);ctx.save();ctx.strokeStyle=P.red;ctx.lineWidth=10;circ(840,1200,110);ctx.stroke();line([760,1120,920,1280],10,P.red);ctx.restore();
  banner('พลิกตั้งเวลา ไม่ต้องจับมือถือ',520,prog(lt,0.2,0.5));},
 tip(lt,ln){field();const ok=[['ลุกยืน',P.leaf],['ดื่มน้ำ',P.blue],['มองไกล',P.gold]];ok.forEach(([t,c],i)=>{card(220+i*320,880,0.7,{name:t,col:c,art:()=>{txt(['🧍','💧','🌳'][i],0,10,90,'#fff',{f:'Kod'});},text:'การ์ดพักที่ถูกต้อง',atk:0,def:999});});
  banner('ช่วงพัก ห้ามเลื่อนโซเชียล!',1300,prog(lt,0.3,0.6),P.red);},
 bonus(lt){field();for(let i=0;i<4;i++){const on=lt>0.3+i*0.35;tomatoTimer(200+i*230,760,0.45,on?Math.PI*2:0);if(on)txt('✓',200+i*230,600,60,P.leaf,{f:'Kod'});}
  banner('ครบ 4 รอบ → พักยาว 15–30 นาที',1150,prog(lt,1.6,1.9),P.leaf);},
 lose(lt,ln){field();hpBar(60,340,lerp(1,0,prog(lt,0,ln.dur*0.6)),P.red,'คู่แข่ง');ctx.save();ctx.translate(540,880);ctx.rotate(lt*2);ctx.globalAlpha=1-prog(lt,0.5,ln.dur);card(0,0,0.8,{name:'ปีศาจแจ้งเตือน',col:P.purple,art:demonArt});ctx.restore();
  banner('ราคาไม่แพง',1250,prog(lt,ln.dur*0.5,ln.dur*0.7));},
 cta(lt){field();const b=E.back(prog(lt,0.1,0.5));card(540,860,1.0*b,{name:'การ์ดหายาก',col:P.gold,art:()=>{ctx.save();ctx.scale(0.6,0.6);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=20;ctx.strokeStyle=OL;ctx.stroke();poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');ctx.restore();},text:'อยู่ในตะกร้าด้านล่าง',atk:0,def:0,glow:1});},
};

window.EP={font:'Kod',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.06*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Kod',size:54,col:'#fff7df',hl:'#e8c15a',sw:0,box:'#0d0a14e6',boxLine:5,boxLineCol:'#e8c15a',boxR:10,boxPad:28,pop:'back',y:1600,lh:1.4},
  intro(t){field();const k=E.back(prog(t,0,0.6));ctx.save();ctx.translate(540,900);ctx.rotate((1-k)*6);ctx.scale(k,k);card(0,0,1,{name:'DUEL!',col:P.red,art:()=>{txt('⚔',0,10,120,'#fff',{f:'Kod'});},text:'เริ่มการดวล',atk:0,def:0});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,12);fs('#0d0a14ee',6,P.gold);txt(TL.title,0,-6,68,P.gold,{f:'Kod',maxW:840});txt(TL.series,0,56,30,'#fff',{f:'Kod'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.save();ctx.translate(540,960);ctx.scale(1,1-E.inOut(k));ctx.restore();ctx.fillStyle=`rgba(13,10,20,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){field();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,20);fs('#0d0a14ee',8,P.gold);txt('YOU WIN!',540,770,100,P.gold,{f:'Kod'});txt('นาฬิกาจับเวลาโพโมโดโร',540,910,62,'#fff',{f:'Kod'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.gold,{f:'Kod'});ctx.restore();},
};
