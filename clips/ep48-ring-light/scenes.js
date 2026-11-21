// EP.48 มายากลหน้าสว่าง — แนวมายากลบนเวที (ไฟวงแหวน)
OL = '#160a14'; LW = 7;
const P = {curtain:'#8a0f2e',curtain2:'#5c0a1f',gold:'#f2c14e',stage:'#3a1a10',skin:'#f1c39d',suit:'#111',white:'#fff',ring:'#fff8e0',win:'#cfe9ff'};

function stage(){bgFill('#160a14');for(let i=0;i<10;i++){ctx.fillStyle=i%2?P.curtain:P.curtain2;poly([i*108,300,i*108+108,300,i*108+100+Math.sin(T+i)*6,1320,i*108-8+Math.sin(T+i)*6,1320]);ctx.fill();}
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.35;ctx.fillStyle='#fff3c4';poly([470,300,610,300,860,1320,220,1320]);ctx.fill();ctx.restore();
  ctx.fillStyle=P.stage;ctx.fillRect(-300,1300,W+600,800);for(let i=0;i<8;i++){circ(70+i*135,1320,14);fs(P.gold,3);}rr(-20,300,1120,60,0);fs(P.curtain2,0);for(let i=0;i<20;i++){circ(30+i*56,360,16);fs(P.gold,0);}}
function magician(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);
  const w=Math.sin(T*3)*20;poly([-160,130,160,130,230+w,500,-230+w,500]);fs(P.curtain2);poly([-140,130,140,130,160,460,-160,460]);fs(P.suit);poly([-36,130,0,220,36,130]);fs('#fff',4);poly([-30,150,0,170,30,150,30,175,0,160,-30,175]);fs(P.red||'#c8102e',3);
  if(o.wand){line([140,190,290,60],12,OL);line([280,70,300,50],12,'#fff');star(310,40,30,12,5,T*4,P.gold,4);}
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,86,98);fs(P.skin);rr(-80,-200,160,150,8);fs(P.suit);ell(0,-50,130,24);fs(P.suit);rr(-80,-80,160,20,0);fs(P.curtain,0);
  for(const ex of[-30,30]){ell(ex,0,12,14);fs('#fff',4);circ(ex,2,5);ctx.fillStyle=OL;ctx.fill();}ctx.beginPath();ctx.moveTo(-40,36);ctx.quadraticCurveTo(-20,28,0,36);ctx.quadraticCurveTo(20,28,40,36);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();
  ell(0,56,12+m*6,3+m*12);fs('#8a2a2a',4);ctx.restore();}
function assistant(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);poly([-120,120,120,120,150,430,-150,430]);fs('#c8102e');for(let i=0;i<10;i++)circ(-90+hash(i)*180,180+hash(i*2)*220,6),ctx.fillStyle=P.gold,ctx.fill();
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,84,94);fs(P.skin);ctx.beginPath();ctx.moveTo(-90,40);ctx.quadraticCurveTo(-92,-110,0,-104);ctx.quadraticCurveTo(92,-110,90,40);ctx.quadraticCurveTo(40,-50,-90,40);fs('#2a1a10');
  for(const ex of[-28,28]){ell(ex,4,11,13);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,50,12+m*6,3+m*12);fs('#c0405a',4);
  if(o.shade!=null){ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle=`rgba(40,40,60,${o.shade})`;ell(0,0,90,100);ctx.fill();ctx.restore();}ctx.restore();}
function callFrame(x,y,s,o){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-320,-240,640,480,20);fs('#222',8);ctx.save();rr(-300,-220,600,400,10);ctx.clip();
  bgFill('#efe4d2');if(o.window){rr(-160,-200,320,300,8);fs(P.win,0);ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(0,-60,10,0,-60,320);g.addColorStop(0,'rgba(255,255,255,0.9)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(-300,-220,600,400);ctx.restore();}
  assistant(0,90,0.75,{shade:o.shade});ctx.restore();for(let i=0;i<3;i++)circ(-60+i*60,210,16),fs(i===1?'#c8102e':'#555',3);ctx.restore();}
function ringLight(x,y,s,on){ctx.save();ctx.translate(x,y);ctx.scale(s,s);line([0,140,0,420],12,'#333');line([-80,420,80,420],10,'#333');if(on){ctx.save();ctx.shadowColor=P.ring;ctx.shadowBlur=60;circ(0,0,130);ctx.lineWidth=40;ctx.strokeStyle=P.ring;ctx.stroke();ctx.restore();}
  circ(0,0,130);ctx.lineWidth=46;ctx.strokeStyle=OL;ctx.stroke();circ(0,0,130);ctx.lineWidth=34;ctx.strokeStyle=on?P.ring:'#666';ctx.stroke();rr(-40,-40,80,80,14);fs('#222',4);ctx.restore();}
function scrollCard(t,y,k,col=P.gold){if(k<=0)return;ctx.save();ctx.translate(540,y);ctx.scale(E.back(k),E.back(k));rr(-390,-56,780,112,56);fs('#160a14ee',5,col);txt(t,0,6,50,col,{f:'Charm',maxW:740});ctx.restore();}

const SCENES={
 stage(lt){stage();magician(540,860,0.95,{mouth:mouthFor('magician'),wand:1});},
 dark(lt){stage();callFrame(540,880,1.2,{window:1,shade:0.75});},
 fact(lt,ln){stage();const k=prog(lt,0.3,ln.dur);callFrame(540,820,1.0,{window:1,shade:0.75});ctx.save();ctx.translate(540,820);line([0,-260,0,-160],8,P.gold);poly([-20,-170,20,-170,0,-140]);fs(P.gold,0);ctx.restore();
  scrollCard('แสงจากหลัง → หน้ามืด',1260,prog(lt,0.2,0.5),'#ffb3b3');scrollCard('เติมแสงด้านหน้า!',1380,prog(lt,ln.dur*0.6,ln.dur*0.8));},
 why(lt,ln){bgFill('#160a14');ctx.save();ctx.translate(540,880);rr(-300,-220,600,440,20);fs('#222',8);ctx.save();rr(-280,-200,560,400,10);ctx.clip();
  const b=prog(lt,0.2,ln.dur);for(let i=0;i<20;i++){for(let j=0;j<14;j++){const v=Math.min(1,(i>6&&i<14&&j<8)?1:lerp(0.6,0.2,b));ctx.fillStyle=`rgba(${Math.floor(v*255)},${Math.floor(v*240)},${Math.floor(v*220)},1)`;ctx.fillRect(-280+i*28,-200+j*29,26,27);}}ctx.restore();ctx.restore();
  txt('📷 เฉลี่ยแสงทั้งภาพ',540,560,56,P.gold,{f:'Charm'});scrollCard('หน้าต่างสว่าง → กล้องลดแสง → หน้ามืด',1250,prog(lt,0.3,0.6));},
 spell(lt){stage();magician(320,880,0.75,{mouth:mouthFor('magician'),wand:1});const k=E.back(prog(lt,0.4,0.9));ctx.save();ctx.translate(760,820);ctx.scale(k,k);ringLight(0,0,0.9,true);ctx.restore();
  for(let i=0;i<12;i++){const a=i*0.52+T*2;star(760+Math.cos(a)*260*k,820+Math.sin(a)*260*k,18,7,4,T*3,P.gold);}},
 bright(lt,ln){stage();callFrame(540,820,1.0,{window:1,shade:lerp(0.75,0,prog(lt,0.2,1.0))});ringLight(540,1260,0.45,true);scrollCard('หน้าสว่าง · สีผิวธรรมชาติ',560,prog(lt,0.4,0.7));},
 tip(lt){bgFill('#2a1a24');ctx.save();ctx.translate(540,900);circ(0,-120,80);fs(P.skin,6);rr(-90,-40,180,240,50);fs('#c8102e',6);ringLight(0,-380,0.6,true);
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.4;poly([-60,-360,60,-360,160,-60,-160,-60]);ctx.fillStyle=P.ring;ctx.fill();ctx.restore();ctx.restore();
  scrollCard('ไฟหลังกล้อง · ระดับสายตา',1300,prog(lt,0.2,0.5));},
 bonus(lt,ln){stage();const w=prog(lt,0.3,ln.dur*0.7);callFrame(540,840,1.0,{window:0});ctx.save();ctx.globalCompositeOperation='overlay';ctx.fillStyle=`rgba(255,${lerp(255,190,w)},${lerp(255,120,w)},0.35)`;ctx.fillRect(220,600,640,420);ctx.restore();
  scrollCard('ปรับไฟอุ่นนิดๆ สีผิวดูธรรมชาติ',1300,prog(lt,0.3,0.6));},
 price(lt){stage();assistant(540,900,1.0,{mouth:mouthFor('magician')});ringLight(860,980,0.5,true);scrollCard('ราคาไม่แพง ไม่ต้องใช้เวทมนตร์จริง',560,prog(lt,0.3,0.6));},
 cta(lt){stage();ctx.save();ctx.translate(540,1150);rr(-160,-40,320,200,10);fs(P.suit,6);ell(0,-40,200,40);fs(P.suit);ctx.restore();const b=E.back(prog(lt,0.3,0.8));ctx.save();ctx.translate(540,lerp(1100,880,b));ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();scrollCard('ความลับอยู่ที่ตะกร้าด้านล่าง',560,prog(lt,0.4,0.7));},
};

window.EP={font:'Charm',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Charm',size:64,col:'#fff3c4',hl:'#f2c14e',stroke:'#160a14',sw:14,pop:'fade',y:1590,lh:1.3},
  intro(t){stage();const o=E.inOut(prog(t,0,1.2));ctx.fillStyle=P.curtain;ctx.fillRect(0,0,W/2*(1-o),H);ctx.fillRect(W/2+W/2*o,0,W/2,H);txt('✨ เปิดม่าน ✨',540,900,90,P.gold,{f:'Charm',sw:10,stroke:OL});},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,88);fs('#160a14ee',6,P.gold);txt(TL.title,0,-6,72,P.gold,{f:'Charm',maxW:840});txt('🎩 '+TL.series,0,56,32,'#fff3c4',{f:'Charm'});ctx.restore();},
  outroGap:0.6,
  outro(k){const o=E.inOut(k);ctx.fillStyle=P.curtain;ctx.fillRect(0,0,W/2*o,H);ctx.fillRect(W-W/2*o,0,W/2*o+1,H);},
  endCard(k){bgFill(P.curtain);for(let i=0;i<10;i++)line([i*108,0,i*108,H],10,P.curtain2);ctx.save();ctx.globalAlpha=k;txt('ปรบมือ!',540,780,110,P.gold,{f:'Charm'});txt('ไฟวงแหวน',540,930,90,'#fff',{f:'Charm'});txt('อยู่ในตะกร้าด้านล่าง',540,1040,58,P.gold,{f:'Charm'});ctx.restore();},
};
