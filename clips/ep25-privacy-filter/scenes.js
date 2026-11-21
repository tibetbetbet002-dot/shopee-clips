// EP.25 NEO-BKK 2077 — แนวเมืองไซเบอร์พังก์ นีออน ฝน กลิตช์ (แผ่นกรองจอกันแอบมอง)
OL = '#07030f'; LW = 5;
const P = {bg:'#0b0620',bg2:'#1a0b3a',mag:'#ff2bd6',cyan:'#00f0ff',yel:'#fff200',skin:'#e8b9a0',jacket:'#2a1f4a',red:'#ff3355'};

function city(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.bg);g.addColorStop(1,P.bg2);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  for(const[x,w,h,c]of[[-20,200,900,P.mag],[170,160,1100,P.cyan],[330,220,800,P.mag],[560,180,1050,P.yel],[740,200,900,P.cyan],[930,200,1000,P.mag]]){
    ctx.fillStyle='#0d0a24';ctx.fillRect(x,1400-h,w,h);for(let r=0;r<h/60;r++)for(let k=0;k<w/50;k++){if(hash(x+r*7+k)>0.7){ctx.fillStyle=c+'66';ctx.fillRect(x+10+k*50,1400-h+20+r*60,24,30);}}}
  ['ราเมน','24H','NEO'].forEach((t,i)=>{const on=hash(Math.floor(T*6)+i)>0.15;const x=180+i*340,y=640+i*80;ctx.save();ctx.shadowColor=on?[P.mag,P.cyan,P.yel][i]:'transparent';ctx.shadowBlur=30;
    rr(x-90,y-40,180,80,10);fs(null,5,on?[P.mag,P.cyan,P.yel][i]:'#333');txt(t,x,y+4,44,on?[P.mag,P.cyan,P.yel][i]:'#333',{f:'Kod'});ctx.restore();});
  ctx.fillStyle='#05030c';ctx.fillRect(-300,1400,W+600,800);rain();}
function rain(){ctx.strokeStyle='rgba(0,240,255,0.25)';ctx.lineWidth=2;for(let i=0;i<120;i++){const x=hash(i)*W,y=(hash(i*3)*2200+T*1600)%2200-200;line([x,y,x-8,y+50],2,'rgba(0,240,255,0.25)');}}
function glitch(a=0.6){if(hash(Math.floor(T*12))>a)return;for(let i=0;i<5;i++){const y=hash(i+Math.floor(T*24))*H;ctx.drawImage(cv,0,y,W,20,(hash(i*7+T)-0.5)*60,y,W,20);}}
function hacker(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);
  poly([-150,130,150,130,180,480,-180,480]);fs(P.jacket);line([-150,200,150,200],6,P.cyan);line([0,140,0,480],4,P.mag);
  rr(-22,90,44,56,10);fs(P.skin);ell(0,0,88,100);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-90,30);ctx.lineTo(-100,-60);ctx.quadraticCurveTo(0,-140,100,-60);ctx.lineTo(70,-20);ctx.lineTo(-40,-60);ctx.closePath();fs(P.mag);
  ctx.save();ctx.shadowColor=P.cyan;ctx.shadowBlur=20;rr(-80,-24,160,36,18);fs('#0ff7',3,P.cyan);ctx.restore();
  ell(0,52,12+m*6,3+m*12);fs('#8a1040',4);ctx.restore();}
function drone(x,y,s){ctx.save();ctx.translate(x,y+Math.sin(T*3)*12);ctx.scale(s,s);for(const sd of[-1,1]){line([sd*40,0,sd*130,-30],8,'#555');ell(sd*130,-34,60,10);ctx.fillStyle=hash(Math.floor(T*30))>.5?'#aaa8':'#6668';ctx.fill();}
  rr(-60,-30,120,60,20);fs('#222',4,P.cyan);circ(0,0,18);ctx.save();ctx.shadowColor=P.red;ctx.shadowBlur=20;fs(P.red,0);ctx.restore();ctx.restore();}
function laptop(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-260,0,520,30,8);fs('#333');rr(-240,-320,480,320,14);fs('#111',4,P.cyan);
  rr(-220,-300,440,280,6);fs(o.dark?'#050505':'#102a4a',0);if(!o.dark){for(let i=0;i<7;i++)rr(-200,-280+i*36,lerp(200,380,hash(i)),16,4),fs(P.cyan+'aa',0);txt('PASSWORD: ••••••',0,-40,26,P.yel,{f:'Kod'});}
  if(o.filter)rr(-230,-310,460,300,8),fs('#00000030',3,'#666');ctx.restore();}
function eyeLook(x,y,s,angle){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,80,40);fs('#fff',5);circ(angle*30,0,22);ctx.fillStyle='#000';ctx.fill();ctx.restore();}
function holo(t,x,y,k,col=P.cyan){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2)*(0.85+0.15*Math.sin(T*20));rr(x-300,y-50,600,100,6);fs(col+'22',3,col);txt(t,x,y+4,46,col,{f:'Kod',maxW:560});ctx.restore();}

const SCENES={
 city(lt){city();hacker(540,1080,0.9,{mouth:mouthFor('hacker')});glitch(0.85);},
 peek(lt){city();laptop(540,1200,0.8);ctx.save();ctx.globalAlpha=0.85;ctx.fillStyle='#0d0a24';ell(880,900,110,260);ctx.fill();circ(880,640,80);ctx.fill();ctx.restore();eyeLook(870,640,0.5,-1);
  drone(300,560,0.9);ctx.save();ctx.globalAlpha=0.35;ctx.fillStyle=P.red;poly([300,580,760,560,960,1100]);ctx.fill();ctx.restore();holo('⚠ ตรวจพบผู้แอบมอง',540,420,prog(lt,0.3,0.6),P.red);glitch(0.7);},
 fact(lt){city();holo('ข้อมูลรั่ว = แฮกเกอร์ + สายตาคนข้างๆ',540,560,prog(lt,0.2,0.5));
  [['💻',300,900],['👀',780,900]].forEach(([e,x,y],i)=>{circ(x,y,140);fs('#1a0b3a',5,i?P.mag:P.cyan);txt(e,x,y+10,120,'#fff',{f:'Kod'});});line([440,900,640,900],8,P.yel);},
 why(lt,ln){bgFill(P.bg);const k=prog(lt,0,ln.dur);laptop(540,1000,0.7);
  ctx.save();ctx.globalAlpha=0.25;ctx.fillStyle=P.cyan;ctx.beginPath();ctx.moveTo(540,880);ctx.arc(540,880,900,-Math.PI+0.15,-0.15);ctx.closePath();ctx.fill();ctx.restore();
  for(let i=0;i<3;i++){const x=150+i*380;circ(x,560,50);fs('#333',4);eyeLook(x,560,0.35,i===1?0:(i?-1:1));}
  holo('มุมมองจอทั่วไป กว้างเกือบ 180°',540,1250,prog(lt,0.3,0.7));holo('ห่าง 2–3 เมตร ยังอ่านได้',540,1360,prog(lt,ln.dur*0.5,ln.dur*0.7),P.yel);},
 install(lt,ln){city();const k=E.out(prog(lt,0.2,ln.dur*0.7));laptop(540,1150,0.9);ctx.save();ctx.translate(540,lerp(600,1150,k));ctx.scale(0.9,0.9);rr(-230,-310,460,300,8);fs('#00000055',4,P.mag);ctx.restore();
  holo('แผ่นกรองจอกันแอบมอง',540,500,prog(lt,0.1,0.4),P.mag);},
 angle(lt,ln){bgFill(P.bg);const a=Math.sin(lt*1.5);laptop(540,1000,0.75,{filter:1,dark:Math.abs(a)>0.45});eyeLook(540+a*380,560,0.7,-a);
  holo(Math.abs(a)>0.45?'มองจากข้าง: มืดสนิท':'มองตรง: ชัดปกติ',540,1250,1,Math.abs(a)>0.45?P.red:P.cyan);},
 tip(lt){city();ctx.save();ctx.translate(540,920);rr(-300,-200,600,360,12);fs('#0d0a24',5,P.cyan);line([-300,160,300,-200],5,P.yel);txt('14" · 15.6" · 24"',0,-260,50,P.yel,{f:'Kod'});ctx.restore();
  holo('วัดขนาดจอ (นิ้ว) + สัดส่วนให้ตรงรุ่น',540,1250,prog(lt,0.2,0.6));},
 bonus(lt){city();laptop(540,1100,0.8,{dark:1});ctx.save();ctx.translate(540,930);circ(0,0,90);fs('#0d0a24',6,P.cyan);rr(-40,-10,80,70,10);fs(P.cyan,0);ctx.beginPath();ctx.arc(0,-10,30,Math.PI,0);ctx.lineWidth=12;ctx.strokeStyle=P.cyan;ctx.stroke();ctx.restore();
  holo('ลุกจากโต๊ะ = ล็อกจอ (Win + L)',540,600,prog(lt,0.2,0.5),P.yel);},
 safe(lt,ln){city();hacker(300,1050,0.7,{mouth:mouthFor('hacker')});laptop(760,1200,0.6,{filter:1});holo('ทำงานคาเฟ่ได้สบายใจ',540,560,prog(lt,0.2,0.5));holo('ราคาไม่แพง',540,690,prog(lt,ln.dur*0.5,ln.dur*0.7),P.yel);},
 cta(lt){city();drone(540,560,1.1);const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,980);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.cyan;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  holo('>> ตะกร้าด้านล่าง',540,1230,prog(lt,0.3,0.6),P.mag);glitch(0.8);},
};

window.EP={font:'Kod',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.04*prog(lt,0,ln.dur);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Kod',size:54,col:'#e8fbff',hl:'#ff2bd6',sw:0,box:'#07030fe6',boxLine:3,boxLineCol:'#00f0ff',boxR:0,boxPad:28,pop:'type',y:1600,lh:1.4},
  intro(t){city();const k=prog(t,0.2,1.0);ctx.save();ctx.globalAlpha=k;txt('NEO-BKK',540,860,140,P.mag,{f:'Kod'});txt('2077',540,1000,110,P.cyan,{f:'Kod'});ctx.restore();glitch(0.5);},
  overlay(){ctx.save();ctx.translate(540,195);rr(-460,-90,920,180,0);fs('#07030fdd',3,P.mag);txt(TL.title,0,-10,80,P.cyan,{f:'Kod',maxW:860});txt('// '+TL.series,0,56,32,P.mag,{f:'Kod'});ctx.restore();},
  post(){grain(0.04);},
  outroGap:0.5,
  outro(k){for(let i=0;i<20;i++){ctx.fillStyle=i%2?P.mag:P.cyan;ctx.globalAlpha=k;ctx.fillRect(0,hash(i+Math.floor(T*20))*H,W,10+k*80);}ctx.globalAlpha=1;ctx.fillStyle=`rgba(7,3,15,${k})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill(P.bg);ctx.save();ctx.globalAlpha=k;txt('ACCESS GRANTED',540,780,90,P.cyan,{f:'Kod'});txt('แผ่นกรองจอกันแอบมอง',540,940,70,'#fff',{f:'Kod'});txt('อยู่ในตะกร้าด้านล่าง',540,1040,56,P.mag,{f:'Kod'});ctx.restore();},
};
