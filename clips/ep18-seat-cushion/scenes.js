// EP.18 ทดลองก้นไม่ชา — แนวห้องแล็บวิทยาศาสตร์ (เบาะรองนั่งเมมโมรีโฟม)
OL = '#14213d'; LW = 7;
const P = {lab:'#e8fff7',tile:'#cdeee4',teal:'#00b3a4',purple:'#9b5de5',pink:'#f15bb5',yellow:'#fee440',coat:'#ffffff',skin:'#f1c9a5',foam:'#7aa6c2',foam2:'#5d8aa8',navy:'#14213d'};

function labBg(){bgFill(P.lab);for(let y=330;y<1250;y+=80)for(let x=0;x<W;x+=80){ctx.fillStyle=P.tile;ctx.fillRect(x+2,y+2,76,76);}
  rr(-20,1250,1120,700,0);fs('#bfd7ea',0);line([-20,1250,1100,1250],8);
  for(let i=0;i<3;i++){const x=140+i*130,y=520;flask(x,y,0.7,[P.purple,P.pink,P.teal][i]);}}
function flask(x,y,s,col){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([-20,-120,20,-120,20,-40,80,80,-80,80,-20,-40]);fs('#ffffffaa');
  ctx.save();poly([-20,-120,20,-120,20,-40,80,80,-80,80,-20,-40]);ctx.clip();ctx.fillStyle=col;ctx.fillRect(-90,10+Math.sin(T*3)*6,180,80);ctx.restore();poly([-20,-120,20,-120,20,-40,80,80,-80,80,-20,-40]);fs(null);
  for(let i=0;i<3;i++){const ph=(T*0.9+i/3)%1;circ(Math.sin(i*3)*20,-120-ph*120,8+ph*10);ctx.save();ctx.globalAlpha=1-ph;ctx.fillStyle=col;ctx.fill();ctx.restore();}ctx.restore();}
function scientist(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1),y+boil(2));ctx.scale(s,s);
  poly([-160,140,160,140,190,520,-190,520]);fs(P.coat);line([0,150,0,520],5);circ(-40,260,8);fs('#ccc',3);
  rr(-24,92,48,56,10);fs(P.skin);ell(0,0,94,106);fs(P.skin);
  for(let i=0;i<11;i++){const a=Math.PI*(0.95+i*0.11);const r=120+Math.sin(T*6+i)*8;circ(Math.cos(a)*r*0.9,Math.sin(a)*r*0.8-10,36);fs('#f4f4f4',5);}
  rr(-90,-34,180,56,26);fs('#7fdbff88',6);circ(-40,-6,22);fs('#e8fbff',5);circ(40,-6,22);fs('#e8fbff',5);
  for(const ex of[-40,40]){circ(ex+(o.look||0)*6,-4,7);ctx.fillStyle=OL;ctx.fill();}
  ell(0,58,18+m*8,4+m*18);fs('#9a2a3a',5);
  if(o.flask){flask(220,200,0.8,P.purple);}
  ctx.restore();}
function assistant(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3),y+boil(4));ctx.scale(s,s);
  ell(0,20,120,150);fs('#3a2a20');poly([-140,140,140,140,170,480,-170,480]);fs(P.coat);
  rr(-22,92,44,56,10);fs(P.skin);ell(0,0,90,104);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-92,20);ctx.quadraticCurveTo(-90,-110,0,-104);ctx.quadraticCurveTo(90,-110,92,20);ctx.quadraticCurveTo(30,-60,-92,20);fs('#3a2a20');
  for(const ex of[-34,34]){circ(ex,0,26);fs('#ffffff66',5);circ(ex,2,6);ctx.fillStyle=OL;ctx.fill();}line([-8,0,8,0],5);
  ell(0,56,12+m*6,3+m*14);fs('#a0303e',4);
  if(o.board){rr(110,160,150,200,10);fs('#c98b5a',5);rr(122,180,126,170,4);fs('#fff',0);for(let i=0;i<5;i++)line([135,200+i*28,230,200+i*28],3,'#9ab');}
  ctx.restore();}
function heatmap(x,y,s,spread){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-260,-220,520,440,60);fs('#1b2a4a',6);
  const spots=spread<0.5?[[-90,60],[90,60]]:[[-90,60],[90,60],[0,-40],[-150,-60],[150,-60],[0,120]];
  ctx.save();rr(-250,-210,500,420,56);ctx.clip();
  for(const[sx,sy]of spots){const R=lerp(110,190,spread);const g=ctx.createRadialGradient(sx,sy,0,sx,sy,R);
    const hot=spread<0.5;g.addColorStop(0,hot?'rgba(255,40,40,1)':'rgba(255,230,80,0.9)');g.addColorStop(0.45,hot?'rgba(255,170,0,0.9)':'rgba(120,230,120,0.7)');g.addColorStop(1,'rgba(40,80,200,0)');
    ctx.fillStyle=g;ctx.fillRect(-260,-220,520,440);}ctx.restore();
  ctx.restore();}
function cushion(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.beginPath();ctx.moveTo(-220,-40);ctx.quadraticCurveTo(-230,-160,-60,-170);ctx.lineTo(60,-170);ctx.quadraticCurveTo(230,-160,220,-40);ctx.quadraticCurveTo(220,90,120,110);ctx.lineTo(40,110);ctx.lineTo(40,30);ctx.lineTo(-40,30);ctx.lineTo(-40,110);ctx.lineTo(-120,110);ctx.quadraticCurveTo(-220,90,-220,-40);ctx.closePath();fs(P.foam);
  for(let i=0;i<30;i++){circ(-180+hash(i)*360,-140+hash(i*3)*220,4);ctx.fillStyle=P.foam2;ctx.fill();}ctx.restore();}

const SCENES={
 lab(lt){labBg();scientist(620,880,1.05,{mouth:mouthFor('doc'),flask:1});
  rr(700,430,320,90,10);fs('#14213d',0);txt('การทดลองที่ 42',860,476,42,P.yellow,{f:'Itim'});},
 sensor(lt,ln){bgFill('#0e1a33');for(let i=0;i<30;i++)line([0,330+i*42,W,330+i*42],1,'#1e2d55');
  const k=prog(lt,0.2,0.9);heatmap(540,900,1.25,0);ctx.save();ctx.globalAlpha=1-k;ctx.fillStyle='#0e1a33';ctx.fillRect(200,600,680,600);ctx.restore();
  if(k>0.9){for(const sx of[-90,90]){ctx.save();ctx.strokeStyle='#fff';ctx.lineWidth=5;circ(540+sx*1.25,900+60*1.25,70);ctx.stroke();ctx.restore();}
    txt('แรงกดสูง 2 จุด!',540,560,70,'#ff6b6b',{f:'Itim',sw:10,stroke:'#0e1a33'});}
  assistant(160,1300,0.45,{mouth:mouthFor('asst'),board:1});},
 map(lt,ln){labBg();
  rr(260,1000,560,60,10);fs('#6b4f3a',6);line([300,1060,300,1240],16);line([780,1060,780,1240],16);
  ell(540,960,220,90);fs('#7bb0ff',6);
  for(let i=0;i<5;i++){const x=380+i*80;line([x,700,x,880],8,'#ff4d6d');poly([x-16,870,x+16,870,x,900]);fs('#ff4d6d',0);}
  for(const sx of[460,620]){for(let j=0;j<5;j++){const a=T*8+j*1.3;line([sx+Math.cos(a)*30,990+Math.sin(a)*14,sx+Math.cos(a)*60,990+Math.sin(a)*28],5,P.yellow);}}
  txt('เบาะแข็ง = แรงกดกระจุก',540,690,62,P.navy,{f:'Itim',sw:10,stroke:'#fff'});},
 sample(lt){bgFill('#14213d');for(let i=0;i<4;i++){ctx.save();ctx.globalAlpha=0.12;ctx.fillStyle='#fff';poly([220+i*200,330,280+i*200,330,420+i*200,1300,80+i*200,1300]);ctx.fill();ctx.restore();}
  rr(160,1130,760,40,10);fs('#c0c8d8',6);const k=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,980);ctx.scale(k,k);cushion(0,0,1.3);ctx.restore();
  ctx.save();ctx.translate(820,700);ctx.rotate(-0.4);circ(0,0,90);fs('#bfe9ff66',12);line([0,90,0,240],22);ctx.restore();
  rr(300,500,480,100,12);fs(P.yellow,6);txt('ตัวอย่าง: เมมโมรีโฟม',540,552,48,P.navy,{f:'Itim'});},
 result(lt,ln){bgFill('#0e1a33');
  heatmap(300,860,0.62,0);heatmap(780,860,0.62,1);txt('ก่อน',300,620,56,'#ff6b6b',{f:'Itim'});txt('หลัง',780,620,56,'#7dff9a',{f:'Itim'});
  const k=E.out(prog(lt,0.4,1.4));rr(180,1240,240,-lerp(0,200,k),10);fs('#ff6b6b',5);rr(660,1240,240,-lerp(0,80,k),10);fs('#7dff9a',5);
  txt('แรงกดสูงสุด',540,1290,40,'#fff',{f:'Itim'});
  const c=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));if(c>0){ctx.save();ctx.translate(540,1110);ctx.scale(c,c);rr(-200,-44,400,88,44);fs(P.teal,5);txt('กระจายแรงกด',0,4,46,'#fff',{f:'Itim'});ctx.restore();}},
 note(lt){labBg();assistant(300,880,0.95,{mouth:mouthFor('asst'),board:1});
  circ(800,600,130);fs('#fff',8);line([800,600,800,510],10);line([800,600,860,600],10);txt('1 ชม.',800,780,50,P.navy,{f:'Itim'});
  const a=Math.sin(T*4)*0.6;ctx.save();ctx.translate(800,1080);circ(0,-150,30);fs(P.skin,5);line([0,-120,0,0],10);line([0,-100,Math.cos(a-1.6)*80,-100+Math.sin(a-1.6)*80],10);line([0,-100,Math.cos(-a-1.6)*-80,-100+Math.sin(-a-1.6)*80],10);
  line([0,0,-40,100],10);line([0,0,40,100],10);ctx.restore();txt('ลุกยืดเส้น!',800,1240,56,P.teal,{f:'Itim',sw:8,stroke:'#fff'});},
 conclude(lt,ln){labBg();scientist(300,900,0.85,{mouth:mouthFor('doc')});
  ctx.save();ctx.translate(760,820);ctx.rotate(0.05);rr(-220,-280,440,560,12);fs('#fff',6);txt('รายงานผล',0,-220,52,P.navy,{f:'Itim'});
  for(let i=0;i<5;i++)line([-170,-140+i*50,lerp(60,170,hash(i)),-140+i*50],5,'#bcd');
  const s=prog(lt,0.3,0.6);if(s>0){ctx.save();ctx.rotate(-0.25);const sc=lerp(2.5,1,E.out(s));ctx.scale(sc,sc);rr(-140,60,280,110,14);ctx.lineWidth=10;ctx.strokeStyle='#2fbf71';ctx.stroke();txt('ผ่าน!',0,118,80,'#2fbf71',{f:'Itim'});ctx.restore();}ctx.restore();
  const c=E.back(prog(lt,ln.dur*0.6,ln.dur*0.8));if(c>0){ctx.save();ctx.translate(760,1290);ctx.scale(c,c);rr(-200,-50,400,100,50);fs(P.pink,5);txt('ราคาไม่แพง',0,4,50,'#fff',{f:'Itim'});ctx.restore();}},
 cta(lt){labBg();
  rr(200,450,680,320,16);fs('#fff',6);txt('ใบสั่งตัวอย่าง',540,520,56,P.navy,{f:'Itim'});txt('เบาะรองนั่งเมมโมรีโฟม ×1',540,610,46,P.teal,{f:'Itim'});txt('ส่งที่: ตะกร้าด้านล่าง',540,690,46,P.pink,{f:'Itim'});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,1030);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.teal;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  const ay=1230+Math.abs(Math.sin(T*6))*20;poly([500,ay-40,580,ay-40,580,ay,620,ay,540,ay+50,460,ay,500,ay]);fs(P.pink,6);},
};

window.EP={font:'Itim',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.06*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Itim',size:64,col:'#14213d',hl:'#f15bb5',stroke:'#ffffff',sw:14,pop:'back',y:1590,lh:1.3},
  intro(t){labBg();const k=E.back(prog(t,0,0.5));ctx.save();ctx.translate(540,880);ctx.scale(k,k);flask(0,0,2.2,P.purple);ctx.restore();},
  overlay(t){ctx.save();ctx.translate(540,195);rr(-440,-95,880,190,20);fs('#ffffffee',7,P.teal);
    for(let i=0;i<8;i++){circ(-400+i*114,-95,10);fs(P.teal,0);}
    txt(TL.series,0,-36,36,P.teal,{f:'Itim'});txt(TL.title,0,34,82,P.navy,{f:'Itim'});ctx.restore();},
  outroGap:0.55,
  outro(k){for(let i=0;i<12;i++){circ(hash(i)*W,H-k*H*1.4+hash(i*3)*400,lerp(0,260,k)*(0.5+hash(i)));ctx.fillStyle=[P.purple,P.pink,P.teal][i%3];ctx.fill();}},
  endCard(k){bgFill(P.lab);ctx.save();ctx.globalAlpha=k;flask(540,620,1.3,P.teal);txt('การทดลองสำเร็จ',540,820,90,P.navy,{f:'Itim'});
    txt('เบาะรองนั่งเมมโมรีโฟม',540,960,70,P.teal,{f:'Itim'});txt('อยู่ในตะกร้าด้านล่าง',540,1060,58,P.pink,{f:'Itim'});ctx.restore();},
};
