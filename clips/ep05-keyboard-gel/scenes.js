// EP.5 อะไรสกปรกกว่า? — แนวเกมโชว์ (เจลทำความสะอาดคีย์บอร์ด)
OL = '#14052e'; LW = 8;
const P = {stage:'#3a0ca3',deep:'#240046',pink:'#f72585',cyan:'#4cc9f0',gold:'#ffd60a',skin:'#f0c29e',skin2:'#f6d1b4',hair:'#2b1a10',gel:'#b8f35a'};

function host(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1),y+boil(2));ctx.scale(s,s);
  poly([-160,140,160,140,200,520,-200,520]);fs('#1a1a2e');
  for(let i=0;i<14;i++){circ(-150+hash(i)*300,170+hash(i*3)*330,4);ctx.fillStyle='#ffd60a99';ctx.fill();}
  poly([-36,140,0,230,36,140]);fs('#fff',5);poly([-36,170,0,190,36,170,36,200,0,185,-36,200]);fs(P.pink,4);
  if(o.arm==='sweep'){line([150,200,300,120,380,90],26,OL);line([150,200,300,120,380,90],16,'#1a1a2e');circ(392,86,26);fs(P.skin,6);}
  else{line([150,200,230,300,200,380],26,OL);line([150,200,230,300,200,380],16,'#1a1a2e');rr(150,330,110,140,8);fs('#fff',5);line([170,370,240,370],4);line([170,400,230,400],4);}
  line([-150,200,-230,120,-250,40],26,OL);line([-150,200,-230,120,-250,40],16,'#1a1a2e');rr(-275,-40,50,90,20);fs('#333',5);circ(-250,-50,30);fs('#888',5);
  rr(-24,90,48,60,10);fs(P.skin);
  ell(0,0,108,118);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-108,-10);ctx.quadraticCurveTo(-120,-150,20,-170);ctx.quadraticCurveTo(140,-160,108,-10);ctx.quadraticCurveTo(90,-80,0,-90);ctx.quadraticCurveTo(-60,-90,-108,-10);fs(P.hair);
  for(const ex of[-40,40]){ell(ex,-10,18,20);fs('#fff',5);circ(ex+(o.look||0)*6,-8,7);ctx.fillStyle=OL;ctx.fill();}
  line([-62,-48,-20,-54],8);line([20,-54,62,-48],8);
  ctx.beginPath();ctx.moveTo(-60,40);ctx.quadraticCurveTo(0,100+m*30,60,40);ctx.closePath();fs('#7a1f2e',6);
  rr(-44,42,88,14,4);fs('#fff',0);
  ctx.restore();}

function ploy(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3),y+boil(4));ctx.scale(s,s);
  const sw=Math.sin(T*4)*0.2;ctx.save();ctx.translate(90,-80);ctx.rotate(sw);ell(40,40,40,110,0.4);fs(P.hair);ctx.restore();
  poly([-140,140,140,140,170,440,-170,440]);fs(P.cyan);
  rr(-22,92,44,56,10);fs(P.skin2);ell(0,0,96,110);fs(P.skin2);
  ctx.beginPath();ctx.moveTo(-98,10);ctx.quadraticCurveTo(-100,-130,10,-118);ctx.quadraticCurveTo(105,-110,98,0);ctx.quadraticCurveTo(60,-70,-30,-60);ctx.closePath();fs(P.hair);
  circ(70,-100,22);fs(P.pink,5);
  const e=o.eye||1;
  for(const ex of[-36,36]){
    if(o.puppy){ell(ex,0,22,26);fs('#fff',5);circ(ex,4,15);ctx.fillStyle=OL;ctx.fill();circ(ex+5,-3,5);ctx.fillStyle='#fff';ctx.fill();continue;}
    ell(ex,0,15*e,17*e);fs('#fff',5);circ(ex,2,6);ctx.fillStyle=OL;ctx.fill();}
  line([-56,-34-(o.shock?14:0),-20,-38-(o.shock?10:0)],6);line([20,-38-(o.shock?10:0),56,-34-(o.shock?14:0)],6);
  if(o.smug&&m<0.1){ctx.beginPath();ctx.arc(0,48,26,0.2*Math.PI,0.8*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();}
  else ell(0,58,14+m*6+(o.shock?8:0),3+m*16+(o.shock?14:0)),fs('#b0303e',5);
  ell(-60,36,16,8);ctx.fillStyle='#ff8fa399';ctx.fill();ell(60,36,16,8);ctx.fill();
  ctx.restore();}

function podium(x,y,s,name,press){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  poly([-200,0,200,0,170,360,-170,360]);fs(P.pink);rr(-150,60,300,90,14);fs('#fff',6);txt(name,0,106,58,P.stage,{f:'Pattaya'});
  ell(0,-10+press*8,70,20);fs('#c1121f');ell(0,-26+press*16,62,24);fs('#ff4d6d');
  ctx.restore();}

function marquee(x,y,w,h,col){rr(x,y,w,h,30);fs(null,14,col);
  const n=Math.floor((w+h)*2/60);for(let i=0;i<n;i++){const u=i/n;let px,py;const per=2*(w+h),d=u*per;
    if(d<w){px=x+d;py=y;}else if(d<w+h){px=x+w;py=y+d-w;}else if(d<2*w+h){px=x+w-(d-w-h);py=y+h;}else{px=x;py=y+h-(d-2*w-h);}
    const on=(i+Math.floor(T*10))%3===0;circ(px,py,10);ctx.fillStyle=on?'#fff8c4':'#a07a10';ctx.fill();}}

function stageBg(){const g=ctx.createRadialGradient(540,900,100,540,900,1300);g.addColorStop(0,'#7209b7');g.addColorStop(1,P.deep);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  for(let i=0;i<4;i++){const a=Math.sin(T*1.2+i*1.7)*0.5;ctx.save();ctx.translate(150+i*260,320);ctx.rotate(a);ctx.globalAlpha=0.16;ctx.fillStyle=i%2?P.cyan:P.pink;poly([-40,0,40,0,260,1300,-260,1300]);ctx.fill();ctx.restore();}
  ctx.fillStyle='#1a0536';ctx.fillRect(-300,1320,W+600,800);for(let i=0;i<12;i++)line([i*100,1320,i*140-300,1920],3,'#3c096c');}

function keyboard(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-380,-130,760,260,26);fs('#2d2f3a');
  for(let r=0;r<4;r++)for(let c=0;c<10;c++){const kx=-340+c*68,ky=-100+r*56;rr(kx,ky,58,46,8);fs(o.clean?'#f4f4f8':'#d9d4c4',4);
    if(!o.clean&&hash(r*10+c)>0.6){circ(kx+10+hash(c)*36,ky+40,5);ctx.fillStyle='#8a6a3a';ctx.fill();}}
  if(o.clean){for(let i=0;i<5;i++)star(-300+i*150,-150+Math.sin(T*4+i)*10,22,8,4,T*2,'#fff')}
  ctx.restore();}

function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');
  poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();}

function confetti(n=80){for(let i=0;i<n;i++){const x=(hash(i)*W+Math.sin(T*2+i)*40),y=((hash(i*3.3)*2200+T*(300+hash(i)*300))%2200)-200;
  ctx.save();ctx.translate(x,y);ctx.rotate(T*4+i);ctx.fillStyle=[P.pink,P.cyan,P.gold,'#fff','#80ffdb'][i%5];ctx.fillRect(-10,-5,20,10);ctx.restore();}}

function panel(x,y,w,label,letter,state,k){if(k<=0)return;ctx.save();ctx.translate(x,y);const s=E.back(k);ctx.scale(s,s);
  const col=state==='sel'?(Math.floor(T*6)%2?P.gold:'#fff3b0'):state==='right'?'#2dc653':state==='wrong'?'#6c757d':'#240046';
  ctx.beginPath();ctx.moveTo(-w/2-40,0);ctx.lineTo(-w/2,-70);ctx.lineTo(w/2,-70);ctx.lineTo(w/2+40,0);ctx.lineTo(w/2,70);ctx.lineTo(-w/2,70);ctx.closePath();fs(col,8,P.cyan);
  txt(letter+':',-w/2+40,4,60,state==='sel'?OL:P.gold,{f:'Pattaya'});txt(label,30,4,56,state==='sel'?OL:'#fff',{f:'Mali',maxW:w-140});ctx.restore();}

const SCENES={
 stage(lt){stageBg();marquee(70,350,940,960,P.gold);
  const k=E.back(prog(lt,0.05,0.5));ctx.save();ctx.translate(540,560);ctx.scale(k,k);ctx.rotate(Math.sin(T*3)*0.04);
  txt('ชิงล้าน!',0,0,180,P.gold,{f:'Pattaya',sw:16});ctx.restore();
  txt('1,000,000',540,730,80,'#fff',{f:'Pattaya',sw:10});
  host(540,1000,1.05,{mouth:mouthFor('host')});
  for(let i=0;i<8;i++)star(120+i*120,1270+Math.sin(T*5+i)*10,20,8,5,T,'#fff8c4');},
 choices(lt,ln){stageBg();
  const ka=prog(lt,0.1,0.4),kb=prog(lt,ln.dur*0.55,ln.dur*0.55+0.3);
  rr(120,400,840,300,24);fs('#10002b',8,P.cyan);txt('อะไรสกปรกกว่ากัน?',540,550,84,'#fff',{f:'Mali'});
  panel(540,850,700,'ฝารองชักโครก','A','',ka);panel(540,1050,700,'คีย์บอร์ดของคุณ','B','',kb);
  const tm=1-prog(lt,0,ln.dur+1.5);ctx.beginPath();ctx.moveTo(540,1260);ctx.arc(540,1260,70,-Math.PI/2,-Math.PI/2+tm*Math.PI*2);ctx.closePath();fs(P.pink,6);circ(540,1260,70);fs(null,6);},
 answer(lt){stageBg();
  ploy(540,860,1.1,{mouth:mouthFor('ploy'),smug:1});
  podium(540,1180,1.1,'พลอย',lt>0.1&&lt<0.35?1:0);
  panel(540,470,700,'ฝารองชักโครก','A','sel',1);},
 wrong(lt,ln){stageBg();
  const x=E.back(prog(lt,0,0.3));
  panel(540,470,700,'ฝารองชักโครก','A','wrong',1);panel(540,640,700,'คีย์บอร์ดของคุณ','B',lt>0.8?'right':'',1);
  ploy(540,1060,1.1,{mouth:0,shock:1,eye:1.5});
  if(x>0){ctx.save();ctx.translate(540,1000);ctx.scale(x,x);ctx.globalAlpha=lt<1.4?1:clamp(1-(lt-1.4)*2);line([-260,-260,260,260],60,'#d00000');line([260,-260,-260,260],60,'#d00000');ctx.restore();}
  rr(220,735,640,50,25);fs('#10002bcc',0);txt('*จากการสุ่มตรวจในงานวิจัยบางชิ้น',540,760,30,'#d7b8ff',{f:'Mali'});},
 micro(lt,ln){bgFill('#10002b');
  ctx.save();circ(540,950,470);ctx.clip();bgFill('#cfe9d9');
  for(let i=0;i<10;i++){const kx=80+(i%5)*200,ky=560+Math.floor(i/5)*420;rr(kx,ky,170,150,20);fs('#f1ecdf',8);}
  ctx.fillStyle='#e0dccd';ctx.fillRect(0,760,W,200);
  for(let i=0;i<14;i++){const x=120+hash(i)*840,y=780+hash(i*2)*160;poly([x,y,x+30,y-10,x+40,y+16,x+8,y+24]);fs('#c48a3a',4);}
  for(let i=0;i<7;i++){const x=150+hash(i*7)*780+Math.sin(T*3+i)*20,y=820+hash(i*5)*120+Math.cos(T*4+i)*14;
    ctx.beginPath();for(let j=0;j<16;j++){const a=j/16*Math.PI*2,r=34+(j%2)*10;ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}ctx.closePath();fs(['#80ffdb','#b8f35a','#ff99c8'][i%3],5);
    circ(x-10,y-6,8);fs('#fff',3);circ(x+10,y-6,8);fs('#fff',3);circ(x-10,y-4,3);ctx.fillStyle=OL;ctx.fill();circ(x+10,y-4,3);ctx.fill();}
  ctx.restore();circ(540,950,470);fs(null,30,'#2b2d42');
  const d=ln.dur,labels=[[0.2,'เศษขนม',220,520],[0.42,'ฝุ่น',860,560],[0.62,'คราบมือ',540,1400]];
  for(const[f,t,x,y]of labels){const k=E.back(prog(lt,d*f,d*f+0.25));if(k<=0)continue;ctx.save();ctx.translate(x,y);ctx.scale(k,k);rr(-150,-50,300,100,50);fs(P.gold,6);txt(t,0,4,52,OL,{f:'Mali'});ctx.restore();}},
 ask(lt){stageBg();speedLines(540,1000,'#ffffff22',30);
  ploy(540,1000,2.0,{mouth:mouthFor('ploy'),puppy:1});},
 product(lt,ln){stageBg();
  const cyc=prog(lt,0.3,ln.dur*0.85);
  const down=cyc<0.4?E.inOut(cyc/0.4):cyc<0.6?1:1-E.inOut((cyc-0.6)/0.4);
  keyboard(540,1150,1.15,{clean:cyc>0.7});
  const gy=lerp(780,1070,down),sq=down>0.95?0.25:0;
  ctx.save();ctx.translate(540,gy);ctx.scale(1+sq,1-sq*0.8);ctx.beginPath();
  for(let j=0;j<24;j++){const a=j/24*Math.PI*2,r=170+Math.sin(T*6+j)*8;ctx.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*0.75);}ctx.closePath();
  ctx.globalAlpha=0.9;fs(P.gel,8,'#3a7d0a');ctx.globalAlpha=1;
  if(cyc>0.6)for(let i=0;i<10;i++){circ(-150+hash(i)*300,30+hash(i*2)*60,6);ctx.fillStyle='#8a6a3a';ctx.fill();}
  ell(-60,-60,50,18);ctx.fillStyle='#ffffff88';ctx.fill();circ(-40,-10,10);fs('#fff',4);circ(40,-10,10);fs('#fff',4);
  ctx.restore();
  const steps=['กด','ดึง','สะอาด!'];steps.forEach((t,i)=>{const on=cyc>=[0,0.45,0.75][i];rr(130+i*290,460,240,110,55);fs(on?P.gold:'#ffffff30',6);txt(t,250+i*290,516,62,on?OL:'#fff',{f:'Mali'});});
  txt('เจลทำความสะอาดคีย์บอร์ด',540,660,64,'#fff',{f:'Mali',sw:10});},
 cta(lt){stageBg();marquee(70,350,940,960,P.gold);confetti(90);
  host(260,1080,0.85,{mouth:mouthFor('host'),arm:'sweep'});
  rr(560,1150,380,60,10);fs(P.gold,6);rr(600,1210,300,180,10);fs('#b8860b',6);
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(750,1060);ctx.scale(b,b);basket(0,0,1);ctx.restore();
  txt('รางวัลของคุณ!',540,540,110,P.gold,{f:'Pattaya',sw:14});
  txt('กดตะกร้าด้านล่าง',540,700,72,'#fff',{f:'Mali',sw:10});},
};

window.EP={font:'Mali',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.07*(1-E.out(prog(lt,0,0.3)));if(name==='ask')s=1+0.1*prog(lt,0,ln.dur);
    if(name==='wrong'&&lt<0.4){const sh=(1-lt/0.4)*20;ctx.translate(hash(Math.floor(T*60))*sh-sh/2,hash(Math.floor(T*60)+3)*sh-sh/2);}
    ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mali',size:62,col:'#ffffff',hl:'#ffd60a',stroke:'#240046',sw:16,pop:'back',y:1570,lh:1.3},
  intro(t){stageBg();marquee(70,350,940,960,P.gold);const k=E.elastic(prog(t,0.1,1.0));ctx.save();ctx.translate(540,800);ctx.scale(k,k);
    txt('ทายซิ!',0,0,200,P.gold,{f:'Pattaya',sw:16});ctx.restore();txt('โชว์ทายเรื่องโต๊ะคอม',540,1000,64,'#fff',{f:'Mali',sw:10});},
  overlay(t,ln){rr(30,100,1020,190,30);fs('#10002bdd',6,P.gold);txt(TL.title,540,170,84,P.gold,{f:'Pattaya'});txt(TL.series,540,245,40,'#fff',{f:'Mali'});},
  outroGap:0.6,
  outro(k){const w=E.inOut(k)*W/2;ctx.fillStyle='#9d0208';ctx.fillRect(0,0,w,H);ctx.fillRect(W-w,0,w,H);
    ctx.strokeStyle='#6a040f';ctx.lineWidth=10;for(let i=0;i<8;i++){const x=w*i/8;line([x,0,x,H],10,'#6a040f');line([W-x,0,W-x,H],10,'#6a040f');}},
  endCard(k){bgFill('#9d0208');for(let i=0;i<16;i++)line([i*70,0,i*70,H],10,'#6a040f');ctx.save();ctx.globalAlpha=k;
    txt('ทายซิ!',540,780,170,P.gold,{f:'Pattaya',sw:14});txt('เจลทำความสะอาดคีย์บอร์ด',540,960,62,'#fff',{f:'Mali',sw:8});
    txt('อยู่ในตะกร้าด้านล่าง',540,1050,58,P.gold,{f:'Mali',sw:8});ctx.restore();},
};
