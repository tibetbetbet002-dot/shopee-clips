// EP.19 จอมยุทธ์ปิดกล้อง — แนวอนิเมะต่อสู้ (ที่ปิดกล้องเว็บแคม)
OL = '#101018'; LW = 8;
const P = {sky1:'#ff9ecd',sky2:'#7b5cff',aura:'#ffe14d',aura2:'#ff7b00',hero:'#2b2d42',jacket:'#ef233c',skin:'#f8d1b0',sensei:'#3a0ca3',hair2:'#e0e0ff',red:'#ff1e3c',sakura:'#ffc4dd'};

function sakura(n=30){for(let i=0;i<n;i++){const x=(hash(i)*W+T*80*(0.5+hash(i*2)))%W,y=((hash(i*3)*2200+T*(120+hash(i)*120))%2200)-200;ctx.save();ctx.translate(x,y);ctx.rotate(T*2+i);ell(0,0,14,8);ctx.fillStyle=P.sakura;ctx.fill();ctx.restore();}}
function animeSky(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,P.sky2);g.addColorStop(1,P.sky1);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);}
function focusLines(col='#ffffff',n=60){ctx.strokeStyle=col;for(let i=0;i<n;i++){const a=hash(i+Math.floor(T*12)*5)*Math.PI*2,r1=380+hash(i)*120;ctx.lineWidth=3+hash(i*2)*10;ctx.beginPath();ctx.moveTo(540+Math.cos(a)*r1,960+Math.sin(a)*r1);ctx.lineTo(540+Math.cos(a)*1600,960+Math.sin(a)*1600);ctx.stroke();}}
function hero(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,2),y+boil(2,2));ctx.scale(s,s);
  if(o.aura){for(let k=0;k<3;k++){ctx.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,r=(280-k*40)*(1+0.12*Math.sin(a*6+T*20+k));ctx.lineTo(Math.cos(a)*r*0.9,Math.sin(a)*r*1.2+100);}ctx.closePath();ctx.fillStyle=[P.aura2,P.aura,'#fff7c2'][k]+'aa';ctx.fill();}}
  poly([-150,140,150,140,180,480,-180,480]);fs(P.jacket);poly([-50,140,0,220,50,140]);fs('#fff',5);
  if(o.slash){line([140,200,300,60,400,-60],34,OL);line([140,200,300,60,400,-60],22,P.jacket);circ(410,-70,30);fs(P.skin,6);}
  rr(-24,92,48,56,10);fs(P.skin);ell(0,0,92,104);fs(P.skin);
  ctx.beginPath();for(let i=0;i<=9;i++){const a=Math.PI*(1+i/9);const r=i%2?130:96;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r-30);}ctx.closePath();fs(P.hero);
  rr(-96,-50,192,26,6);fs(P.red);poly([90,-44,160,-70+Math.sin(T*10)*10,150,-20]);fs(P.red,5);
  const intense=o.intense;for(const ex of[-34,34]){ctx.beginPath();ctx.moveTo(ex-24,2);ctx.lineTo(ex+24,-6);ctx.lineTo(ex+18,16);ctx.lineTo(ex-20,16);ctx.closePath();fs('#fff',4);
    circ(ex,6,intense?5:9);ctx.fillStyle=intense?'#ff1e3c':'#2b6cff';ctx.fill();circ(ex+3,3,3);ctx.fillStyle='#fff';ctx.fill();}
  line([-60,-26,-12,-16],8);line([12,-16,60,-26],8);
  if(o.shout){ctx.beginPath();ctx.moveTo(-30,44);ctx.lineTo(30,44);ctx.lineTo(18,90);ctx.lineTo(-18,90);ctx.closePath();fs('#7a1020',5);}else{ell(0,56,12+m*6,3+m*16);fs('#7a1020',4);}
  ctx.restore();}
function sensei(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,2),y+boil(4,2));ctx.scale(s,s);
  const w=Math.sin(T*3)*20;poly([-170,140,170,140,240+w,520,-240+w,520]);fs(P.sensei);
  ctx.save();ctx.translate(60,-60);ctx.rotate(0.3+Math.sin(T*2)*0.1);ell(60,120,40,180,0.3);fs(P.hair2);ctx.restore();
  rr(-24,92,48,56,10);fs(P.skin);ell(0,0,90,104);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-94,20);ctx.quadraticCurveTo(-96,-110,0,-110);ctx.quadraticCurveTo(96,-110,94,20);ctx.lineTo(60,-40);ctx.lineTo(30,0);ctx.lineTo(0,-50);ctx.lineTo(-40,0);ctx.lineTo(-60,-40);ctx.closePath();fs(P.hair2);
  for(const ex of[-32,32]){ctx.beginPath();ctx.moveTo(ex-22,6);ctx.lineTo(ex+22,-2);ctx.lineTo(ex+16,12);ctx.closePath();fs('#fff',4);circ(ex,6,6);ctx.fillStyle='#7b2cbf';ctx.fill();}
  ell(0,54,10+m*6,2+m*14);fs('#7a1020',4);
  ctx.restore();}
function laptop(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-300,0,600,40,10);fs('#9aa3b1');ctx.save();ctx.rotate(-0.05);rr(-280,-380,560,380,20);fs('#2b2d42');rr(-256,-350,512,330,10);fs('#3d5a80',4);
  const cover=o.cover||0;circ(0,-366,14);fs('#111',3);
  if(o.evil&&cover<1){ctx.save();ctx.shadowColor=P.red;ctx.shadowBlur=40;circ(0,-366,10);ctx.fillStyle=P.red;ctx.fill();ctx.restore();}
  if(o.slider){rr(-50+cover*0,-380,100,28,10);fs('#e9ecef',4);rr(lerp(-46,-6,cover),-374,lerp(40,48,cover)+cover*0,16,6);fs('#333',0);}
  ctx.restore();ctx.restore();}
function malware(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,70,50);fs('#5b0f8a');for(let i=0;i<6;i++){const a=(i<3?-1:1)*(0.4+(i%3)*0.4);line([Math.cos(a)*(i<3?-60:60),20,Math.cos(a)*(i<3?-100:100),60+Math.sin(T*10+i)*10],8);}
  circ(-20,-10,12);fs(P.red,3);circ(20,-10,12);fs(P.red,3);ctx.restore();}

const SCENES={
 eye(lt,ln){bgFill('#1a0b2e');focusLines('#ffffff22',50);
  ctx.save();ctx.globalAlpha=0.5+0.2*Math.sin(T*4);ell(540,620,360,160);ctx.fillStyle='#3a0b2e';ctx.fill();circ(540,620,110);ctx.fillStyle=P.red;ctx.fill();circ(540,620,40);ctx.fillStyle='#000';ctx.fill();ctx.restore();
  laptop(540,1200,0.95,{evil:1});hero(540,1140,0.75,{mouth:mouthFor('hero'),intense:1});
  txt('ครืน…',880,900,90,'#fff',{f:'Pattaya',sw:10,stroke:OL});},
 truth(lt,ln){animeSky();sakura();
  sensei(260,900,0.85,{mouth:mouthFor('sensei')});
  laptop(760,1150,0.65,{evil:lt>ln.dur*0.5});const k=E.inOut(prog(lt,0.2,ln.dur*0.5));malware(lerp(1100,760,k),lerp(500,900,k),0.8);
  if(lt>ln.dur*0.5){const c=E.back(prog(lt,ln.dur*0.5,ln.dur*0.7));ctx.save();ctx.translate(760,560);ctx.scale(c,c);rr(-230,-50,460,100,10);fs(P.red,6);txt('กล้องเปิดเอง!',0,4,54,'#fff',{f:'Mali'});ctx.restore();}},
 power(lt){bgFill('#120018');focusLines(P.aura+'66',70);hero(540,960,1.2,{mouth:mouthFor('hero'),aura:1,shout:1,intense:1});},
 item(lt,ln){animeSky();sakura(20);
  const k=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,900);ctx.scale(k*2.6,k*2.6);
  rr(-110,-40,220,80,30);fs('#e9ecef',4);const c=(Math.sin(lt*3)+1)/2;rr(lerp(-96,-6,c),-26,96,52,20);fs('#333',0);circ(lerp(-48,40,c),0,10);fs('#555',0);ctx.restore();
  sensei(200,1250,0.45,{mouth:mouthFor('sensei')});
  [['แปะครั้งเดียว',780,560,0.2],['เลื่อนเปิดปิดได้',540,1290,ln.dur*0.55]].forEach(([t,x,y,s])=>{const kk=E.back(prog(lt,s,s+0.3));if(kk<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(kk,kk);rr(-210,-50,420,100,50);fs(P.sensei,5,'#fff');txt(t,0,4,48,'#fff',{f:'Mali'});ctx.restore();});},
 attack(lt,ln){const imp=lt>ln.dur*0.55;
  if(imp&&lt<ln.dur*0.55+0.12){bgFill('#fff');}else bgFill(imp?'#000':'#1a0b2e');
  focusLines(imp?'#ffffff':'#ff7b0066',70);
  const cov=E.out(prog(lt,ln.dur*0.55,ln.dur*0.7));laptop(540,1250,1.05,{evil:1,slider:1,cover:cov});
  hero(380,880,0.9,{mouth:mouthFor('hero'),slash:1,shout:1,intense:1});
  if(imp){line([80,1500,1000,300],30,'#fff');for(let i=0;i<10;i++){const a=i*0.63;poly([540,880,540+Math.cos(a)*120,880+Math.sin(a)*120,540+Math.cos(a+0.2)*60,880+Math.sin(a+0.2)*60]);fs(P.red,0);}
    const c=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));ctx.save();ctx.translate(540,560);ctx.rotate(-0.1);ctx.scale(c,c);txt('ปิด!',0,0,200,P.aura,{f:'Pattaya',sw:16,stroke:OL});ctx.restore();}},
 win(lt,ln){animeSky();sakura(30);
  ctx.save();ctx.translate(540,1000);rr(-360,0,720,30,10);fs('#9aa3b1',6);rr(-350,-26,700,26,10);fs('#2b2d42',6);rr(-40,-36,80,12,4);fs('#e9ecef',3);ctx.restore();
  txt('ปิดจอได้สนิท',540,880,64,'#fff',{f:'Mali',sw:10,stroke:OL});
  const c=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));if(c>0){ctx.save();ctx.translate(540,1250);ctx.scale(c,c);circ(0,0,120);fs(P.aura,8);txt('หลักสิบ',0,6,58,OL,{f:'Pattaya'});ctx.restore();}
  hero(860,700,0.5,{mouth:0});},
 cta(lt){animeSky();sakura(40);focusLines('#ffffff44',40);
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1000);ctx.scale(b*1.1,b*1.1);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.aura;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  hero(220,700,0.55,{mouth:mouthFor('hero')});
  txt('ไอเท็มอยู่ที่ตะกร้าด้านล่าง!',540,1280,64,'#fff',{f:'Mali',sw:12,stroke:OL});
  const ay=1370+Math.abs(Math.sin(T*6))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+50,460,ay,500,ay]);fs(P.aura,6);},
};

window.EP={font:'Mali',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.1*(1-E.out(prog(lt,0,0.2)));if(name==='power'){const sh=8;ctx.translate(Math.sin(T*50)*sh,Math.cos(T*43)*sh);}ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mali',size:62,col:'#ffffff',hl:'#ffe14d',stroke:'#101018',sw:16,pop:'back',y:1590,lh:1.3},
  intro(t){bgFill('#fff');const k=E.back(prog(t,0,0.4));ctx.save();ctx.translate(540,900);ctx.rotate(-0.1);ctx.scale(k,k);txt('ศึกโต๊ะคอม!',0,0,150,P.red,{f:'Pattaya',sw:16,stroke:OL});ctx.restore();},
  overlay(t){ctx.save();ctx.translate(540,200);ctx.rotate(-0.03);poly([-470,-80,470,-90,450,90,-460,80]);fs('#101018ee',6,P.aura);
    txt(TL.title,0,-10,80,P.aura,{f:'Pattaya',maxW:860});txt(TL.series,0,56,32,'#fff',{f:'Mali'});ctx.restore();},
  outroGap:0.5,
  outro(k){ctx.save();ctx.translate(540,960);ctx.rotate(0.4);ctx.fillStyle='#101018';const h=E.inOut(k)*1500;ctx.fillRect(-1500,-h,3000,h*2);ctx.restore();},
  endCard(k){bgFill('#101018');ctx.save();ctx.globalAlpha=k;txt('ชนะแล้ว!',540,780,140,P.aura,{f:'Pattaya'});
    txt('ที่ปิดกล้องเว็บแคม',540,950,72,'#fff',{f:'Mali'});txt('อยู่ในตะกร้าด้านล่าง',540,1060,58,P.sakura,{f:'Mali'});ctx.restore();},
};
