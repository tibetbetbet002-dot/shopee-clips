// EP.4 ข่าวด่วน: ข้อมือพัง — แนวรายการข่าวทีวี (แผ่นรองเมาส์เจลรองข้อมือ)
OL = '#0a1530'; LW = 6;
const P = {blue:'#0b3d91',blue2:'#1565c0',sky:'#5aa9ff',red:'#e31b23',white:'#ffffff',yellow:'#ffe14d',
  suit:'#1f2a44',skin:'#e8b796',skin2:'#f3c9a8',hair:'#20140c',gel:'#38b6ff',pad:'#2b2f3a'};

function anchor(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);
  poly([-170,140,170,140,210,460,-210,460]);fs(P.suit);
  poly([-40,140,0,250,40,140]);fs('#fff',5);poly([0,160,-16,180,0,300,16,180]);fs(o.loose?'#c0392b':P.red,5);
  if(o.loose){ctx.save();ctx.rotate(0.3);poly([0,160,-16,180,0,300,16,180]);fs(P.red,5);ctx.restore();}
  poly([-40,140,-110,150,-60,330]);fs('#2a3758',5);poly([40,140,110,150,60,330]);fs('#2a3758',5);
  rr(-26,90,52,60,10);fs(P.skin);
  ell(-104,0,18,28);fs(P.skin);ell(104,0,18,28);fs(P.skin);
  rr(-100,-120,200,230,90);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-104,-10);ctx.quadraticCurveTo(-110,-140,10,-135);ctx.quadraticCurveTo(110,-130,104,-20);ctx.quadraticCurveTo(70,-90,-20,-80);ctx.quadraticCurveTo(-70,-60,-104,-10);fs(P.hair);
  const b=blink(2),eo=o.eye||1;
  for(const ex of[-38,38]){if(b){line([ex-16,-10,ex+16,-10],6);continue;}ell(ex,-10,16*eo,18*eo);fs('#fff',5);circ(ex+(o.look||0)*6,-8,6);ctx.fillStyle=OL;ctx.fill();}
  line([-58,-42,-20,-46],7);line([20,-46,58,-42],7);
  line([0,0,-8,30,6,32],5);
  if(o.smile&&m<0.1){ctx.beginPath();ctx.arc(0,52,30,0.2*Math.PI,0.8*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();}
  else{ell(0,62,22+m*6,4+m*18);fs('#7a1f2e',5);}
  ctx.restore();}

function reporter(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);
  ell(0,10,135,150);fs(P.hair);
  poly([-150,140,150,140,180,460,-180,460]);fs(P.red);poly([-40,140,0,220,40,140]);fs('#fff',5);
  rr(-24,90,48,60,10);fs(P.skin2);
  ell(0,0,96,112);fs(P.skin2);
  ctx.beginPath();ctx.moveTo(-100,20);ctx.quadraticCurveTo(-110,-120,0,-118);ctx.quadraticCurveTo(110,-120,100,20);ctx.lineTo(80,-30);ctx.quadraticCurveTo(0,-70,-60,-40);ctx.closePath();fs(P.hair);
  for(const ex of[-36,36]){ell(ex,0,15,17);fs('#fff',5);circ(ex,2,6);ctx.fillStyle=OL;ctx.fill();line([ex-14,-14,ex+18,-20],4);}
  ell(0,58,16+m*6,3+m*16);fs('#b0303e',5);
  // ไมค์
  line([120,250,150,120],16,'#222');rr(120,60,70,50,8);fs(P.blue,4);txt('24',155,86,30,'#fff',{f:'Mitr'});ell(155,40,36,40);fs('#333',5);
  ell(110,260,34,26);fs(P.skin2,5);
  ctx.restore();}

function hand(x,y,s,ang,o={}){ // แขนข้าง หันขวา ang = องศาข้อมือกระดก
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-420,-46,420,92,46);fs(o.xray?'#0e2a4a':P.skin,o.xray?6:LW,o.xray?P.sky:OL);
  if(o.xray){line([-400,-12,0,-12],14,'#dfefff');line([-400,16,0,16],12,'#dfefff');}
  ctx.save();ctx.rotate(-ang*Math.PI/180);
  rr(-10,-50,230,100,46);fs(o.xray?'#0e2a4a':P.skin,o.xray?6:LW,o.xray?P.sky:OL);
  if(o.xray){for(let i=0;i<4;i++)rr(20+i*48,-30,38,60,14),fs('#dfefff',0);}
  if(o.mouse){ell(150,70,120,52);fs('#d9dde6');line([150,20,150,70],4);}
  ctx.restore();
  if(o.xray){const sq=o.squeeze||0;line([-380,4,0,4,140,4-ang*1.5],10-sq*6,'#ffd34d');
    ctx.save();ctx.strokeStyle=`rgba(255,80,80,${sq})`;ctx.lineWidth=6;circ(0,4,60+sq*10);ctx.stroke();ctx.restore();}
  ctx.restore();}

function gelPad(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ell(0,40,330,40);ctx.fillStyle='#00000030';ctx.fill();
  rr(-300,-20,600,50,24);fs(P.pad);
  ctx.beginPath();ctx.moveTo(-300,-10);ctx.quadraticCurveTo(-300,-120,-150,-120);ctx.lineTo(-60,-120);ctx.quadraticCurveTo(0,-120,0,-20);ctx.lineTo(-300,-20);ctx.closePath();fs(P.gel);
  ell(-180,-90,60,14);ctx.fillStyle='#ffffff66';ctx.fill();
  ell(160,-40,70,40);fs('#d9dde6');line([160,-80,160,-40],4);
  ctx.restore();}

function studioBg(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0a2a66');g.addColorStop(1,'#1565c0');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ctx.save();ctx.globalAlpha=0.18;ctx.strokeStyle='#bfe0ff';ctx.lineWidth=3;
  for(let i=0;i<8;i++){ell(540,820,120+i*70,60+i*35);ctx.stroke();}for(let i=0;i<12;i++){line([i*100,330,i*100,1400],2,'#bfe0ff');}ctx.restore();
  for(const[x,w]of[[60,260],[760,260]]){rr(x,420,w,170,10);fs('#0d1f3f',6);rr(x+14,434,w-28,142,6);fs(P.blue2,0);txt('24',x+w/2,505,70,'#ffffff55',{f:'Mitr'});}}

const SCENES={
 studio(lt){studioBg();
  anchor(540,900,1.4,{mouth:mouthFor('anchor')});
  poly([60,1180,1020,1180,1080,1460,0,1460]);fs('#0d1f3f');rr(330,1240,420,130,16);fs(P.red,6);txt('ข่าวโต๊ะคอม 24',540,1306,52,'#fff',{f:'Mitr'});
  rr(820,1150,120,40,6);fs('#fff',4);},
 field(lt){bgFill('#cfd8e3');ctx.fillStyle='#b7c3d1';ctx.fillRect(0,0,W,1200);
  rr(560,960,460,26,8);fs('#c98b5a');line([590,986,590,1300],12);line([990,986,990,1300],12);
  rr(650,700,300,220,12);fs('#2b303c');rr(666,716,268,188,6);fs('#9fd0ff',4);rr(770,920,60,40,4);fs('#2b303c');
  ell(900,950,34,16);fs('#d9dde6',5);
  ctx.save();ctx.globalAlpha=0.35+0.15*Math.sin(T*6);ctx.fillStyle='#fff7b0';poly([860,300,940,300,1000,960,800,960]);ctx.fill();ctx.restore();
  for(const[y,r]of[[880,-0.08],[1080,0.05]]){ctx.save();ctx.translate(540,y);ctx.rotate(r);rr(-700,-34,1400,68,0);fs('#ffd400',5);
    for(let i=-7;i<7;i++)txt('จุดเกิดเหตุ',i*200+((T*60)%200),4,34,OL,{f:'Mitr'});ctx.restore();}
  ctx.fillStyle='#8a97a8';ctx.fillRect(-300,1300,W+600,800);
  reporter(300,960,1.35,{mouth:mouthFor('rep')});},
 graphic(lt){bgFill('#0b3d91');for(let i=0;i<30;i++){line([0,330+i*44,W,330+i*44],1,'#ffffff12');}
  const a=30*E.inOut(prog(lt,0.3,1.4));
  hand(560,1000,1.25,a,{mouse:1});
  ctx.beginPath();ctx.arc(560,1000,170,-a*Math.PI/180,0);ctx.lineWidth=12;ctx.strokeStyle=P.yellow;ctx.stroke();
  txt(Math.round(a)+'°',800,880,90,P.yellow,{f:'Mitr',sw:10});
  rr(160,520,760,110,12);fs(P.red,6);txt('ข้อมือกระดกขึ้น ทั้งวัน',540,578,62,'#fff',{f:'Mitr'});
  if(a>25){circ(860,640,60);fs('#fff',6);line([830,610,890,670],12,P.red);line([890,610,830,670],12,P.red);}},
 xray(lt,ln){bgFill('#04101f');for(let i=0;i<40;i++){line([0,i*50,W,i*50],1,'#1e4a7a40');}
  const a=30, sq=E.inOut(prog(lt,0.3,1.3));
  hand(600,980,1.25,a,{xray:1,squeeze:sq});
  txt('อุโมงค์ข้อมือ',360,820,52,P.yellow,{f:'Mitr',sw:8});line([450,850,560,960],5,P.yellow);
  rr(180,1180,720,44,22);fs('#122b4a',5);rr(186,1186,708*sq,32,16);fs(P.red,0);txt('แรงกดเส้นประสาท',540,1268,44,'#fff',{f:'Mitr'});
  if(sq>0.6)for(let i=0;i<3;i++){const x=860+i*40,y=780+Math.sin(T*20+i)*10;line([x,y,x+20,y+30,x-5,y+45,x+15,y+80],7,P.yellow);}
  txt('*ภาพประกอบเพื่อความเข้าใจ',540,1340,28,'#9fb7d6',{f:'Mitr'});},
 solution(lt){studioBg();
  const k=E.back(prog(lt,0.1,0.6));
  ell(540,1220,380,60);fs('#0d1f3f',6);ell(540,1200,380,60);fs('#16305e',6);
  for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=0.18;ctx.fillStyle='#fff';const x=300+i*240;poly([x-30,330,x+30,330,x+120,1200,x-120,1200]);ctx.fill();ctx.restore();}
  ctx.save();ctx.translate(540,1120+Math.sin(T*2)*8);ctx.scale(k,k);gelPad(0,0,1.15);ctx.restore();
  for(let i=0;i<6;i++){const a=T*1.2+i;star(540+Math.cos(a)*420,1000+Math.sin(a)*200,22,7,4,T*3,'#fff7c2');}
  rr(140,560,800,170,14);fs('#fff',6);txt('แผ่นรองเมาส์',540,620,70,P.blue,{f:'Mitr'});txt('+ เจลรองข้อมือ',540,690,56,P.red,{f:'Mitr'});},
 demo(lt,ln){bgFill('#e8eef6');ctx.fillStyle='#c98b5a';ctx.fillRect(-300,1150,W+600,800);
  gelPad(470,1150,1.3);
  ctx.save();ctx.translate(-30,0);hand(560,1000,1.2,0,{mouse:1});ctx.restore();
  ctx.setLineDash([24,14]);line([60,1000,980,1000],8,'#2fbf71');ctx.setLineDash([]);
  const d=ln.dur,bars=[[0.02,'ข้อมืออยู่แนวตรง'],[0.38,'นุ่ม ไม่ลื่น'],[0.68,'ราคาหลักร้อย']];
  bars.forEach(([f,t],i)=>{const k=E.out(prog(lt,d*f,d*f+0.3));if(k<=0)return;const y=430+i*130;ctx.save();ctx.translate(lerp(-900,0,k),0);
    rr(80,y,140,100,0);fs(P.red,0);txt('✓',150,y+52,64,'#fff',{f:'Mitr'});rr(220,y,640,100,0);fs(P.blue,0);txt(t,250,y+52,58,'#fff',{f:'Mitr',align:'left'});ctx.restore();});},
 cta(lt){studioBg();
  const p=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1060);ctx.scale(p,p);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#fff';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');
  poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  const py=820+Math.sin(T*5)*14;ctx.save();ctx.translate(540,py);ctx.beginPath();ctx.arc(0,-60,60,Math.PI*0.85,Math.PI*2.15);ctx.lineTo(0,40);ctx.closePath();fs(P.red,7);circ(0,-60,24);fs('#fff',0);ctx.restore();
  txt('พิกัดสินค้า',540,620,90,'#fff',{f:'Mitr',sw:12});
  txt('กดตะกร้าด้านล่าง',540,1250,76,P.yellow,{f:'Mitr',sw:12});
  const ay=1350+Math.abs(Math.sin(T*6))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+50,460,ay,500,ay]);fs(P.yellow,7);},
 blooper(lt,ln){studioBg();
  const caught=lt>ln.dur*0.55;
  anchor(540,900,1.4,{mouth:mouthFor('anchor'),loose:1,eye:caught?1.6:1,look:caught?0:-1});
  poly([60,1180,1020,1180,1080,1460,0,1460]);fs('#0d1f3f');
  rr(700,1080,170,110,14);fs('#fff');ell(785,1080,85,20);fs('#f7d07a',5);line([760,1080,820,980],6,'#8a5a2a');line([780,1080,840,985],6,'#8a5a2a');
  if(caught){for(const[sx,sy]of[[400,700],[690,700]]){ctx.beginPath();ctx.moveTo(sx,sy-30);ctx.quadraticCurveTo(sx+16,sy+5,sx,sy+10);ctx.quadraticCurveTo(sx-16,sy+5,sx,sy-30);fs('#9fe3ff',5);}}
  const on=Math.floor(T*3)%2===0;rr(820,350,200,70,10);fs(on?P.red:'#5a1015',5);txt('ON AIR',920,388,40,'#fff',{f:'Mitr'});},
};

function overlay(t,ln){
  // หัวข่าว
  ctx.save();ctx.translate(0,110);rr(40,0,330,90,0);fs(P.red,0);txt('ข่าวด่วน',205,48,62,'#fff',{f:'Mitr'});
  rr(370,0,670,90,0);fs('#ffffff',0);txt(TL.title,705,48,58,P.blue,{f:'Mitr',maxW:620});
  rr(40,90,1000,56,0);fs(P.blue,0);txt(TL.series,70,120,34,'#fff',{f:'Kod',align:'left'});
  if(Math.floor(T*2)%2===0){circ(900,120,12);ctx.fillStyle=P.red;ctx.fill();}txt('LIVE',990,121,34,'#fff',{f:'Kod'});ctx.restore();
  // แถบข่าววิ่ง
  rr(0,1440,W,70,0);fs(P.red,0);rr(0,1440,180,70,0);fs(P.yellow,0);txt('ล่าสุด',90,1477,40,P.blue,{f:'Mitr'});
  ctx.save();ctx.beginPath();ctx.rect(180,1440,W-180,70);ctx.clip();
  const tick='•  แผ่นรองเมาส์เจลรองข้อมือ ช่วยให้ข้อมืออยู่แนวตรง   •   ราคาหลักร้อย   •   พิกัดสินค้า: ตะกร้าด้านล่าง   ';
  ctx.font='40px Mitr';const tw=ctx.measureText(tick).width,x0=W-((T*180)%tw);
  for(let k=-1;k<2;k++)txt(tick,x0+k*tw,1477,40,'#fff',{f:'Mitr',align:'left'});ctx.restore();}

window.EP={font:'Mitr',scenes:SCENES,
  camera(name,lt,ln){const s=name==='studio'||name==='blooper'?1+0.04*prog(lt,0,ln.dur):1+0.06*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Mitr',size:56,col:'#ffffff',hl:'#ffe14d',sw:0,box:'#0b3d91f2',boxR:0,boxPad:26,pop:'back',y:1625,lh:1.35},
  intro(t){const k=prog(t,0,0.6);studioBg();ctx.save();ctx.translate(540,960);ctx.scale(lerp(0.2,1,E.back(k)),lerp(0.2,1,E.back(k)));ctx.rotate((1-k)*3);
    rr(-360,-120,720,240,20);fs(P.red,8);txt('ข่าวด่วน',0,10,150,'#fff',{f:'Mitr'});ctx.restore();},
  overlay,
  outroGap:0.55,
  outro(k){const h=lerp(H,6,E.inOut(clamp(k*1.6))),w=lerp(W,0,E.inOut(clamp(k*1.6-0.6)));ctx.fillStyle='#000';
    ctx.fillRect(0,0,W,(H-h)/2);ctx.fillRect(0,(H+h)/2,W,H);ctx.fillRect(0,0,(W-w)/2,H);ctx.fillRect((W+w)/2,0,W,H);},
  endCard(k){bgFill('#000');ctx.save();ctx.globalAlpha=k;
    rr(240,700,600,200,20);fs(P.red,8);txt('ข่าวโต๊ะคอม 24',540,800,76,'#fff',{f:'Mitr'});
    txt('แผ่นรองเมาส์เจลรองข้อมือ',540,1000,60,'#fff',{f:'Mitr'});txt('อยู่ในตะกร้าด้านล่าง',540,1080,56,P.yellow,{f:'Mitr'});ctx.restore();},
};
