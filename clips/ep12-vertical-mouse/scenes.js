// EP.12 วิชาจับเมาส์ไร้เทียมทาน — แนวหนังจีนกำลังภายใน ภาพหมึกจีน (เมาส์แนวตั้ง)
OL = '#1a1410'; LW = 7;
const P = {paper:'#efe6d2',paper2:'#e4d8bd',ink:'#1a1410',ink2:'#5a5048',mist:'#ffffffaa',red:'#c0392b',gold:'#c9a227',robe:'#e9e3d6',robe2:'#6b8f71',skin:'#f0d2b4',hair:'#1a1410'};

function paperBg(){bgFill(P.paper);ctx.save();ctx.globalAlpha=0.08;for(let i=0;i<300;i++){ctx.fillStyle=hash(i)>.5?'#8a7a5a':'#fff';ctx.fillRect(hash(i*3)*W,hash(i*7)*H,2+hash(i)*6,1+hash(i*2)*3);}ctx.restore();}
function mountains(layer,col,y,amp,seed){ctx.beginPath();ctx.moveTo(-50,H);for(let x=-50;x<=W+50;x+=30){const h=Math.sin(x*0.006+seed)*amp+Math.sin(x*0.017+seed*2)*amp*0.4;ctx.lineTo(x,y-h);}ctx.lineTo(W+50,H);ctx.closePath();ctx.fillStyle=col;ctx.fill();}
function mist(y){for(let i=0;i<6;i++){const x=((i*260+T*25)%1500)-200;ell(x,y+Math.sin(i)*30,220,40);ctx.fillStyle=P.mist;ctx.fill();}}
function seal(x,y,s,t,rot=-0.08){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);rr(-90,-90,180,180,14);fs(P.red,0);rr(-76,-76,152,152,10);fs(null,5,'#f7e6d0');
  txt(t,0,6,t.length>3?44:62,'#f7e6d0',{f:'Sri',maxW:150});ctx.restore();}
function brush(pts,w,col){ctx.save();for(let k=0;k<3;k++){ctx.globalAlpha=0.35+k*0.25;curve(pts.map((v,i)=>v+(hash(i+k*9)-0.5)*w*0.25),w*(1-k*0.25),col);}ctx.restore();}

function master(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.3),y+boil(2,1.3));ctx.scale(s,s);
  const fl=Math.sin(T*3)*20;
  ctx.beginPath();ctx.moveTo(-150,130);ctx.quadraticCurveTo(-230-fl,420,-200-fl,560);ctx.lineTo(200,560);ctx.quadraticCurveTo(230,400,150,130);ctx.closePath();fs(P.robe);
  line([0,140,-40,560],6);line([-150,300,150,300],12,P.robe2);
  ell(0,0,95,108);fs(P.skin);
  ctx.beginPath();ctx.arc(0,-40,96,Math.PI*1.05,Math.PI*1.95);ctx.closePath();fs('#ddd');circ(0,-140,32);fs('#ddd');line([0,-110,0,-175],10,'#8a6a3a');
  line([-60,-30,-18,-24],8,'#fff');line([18,-24,60,-30],8,'#fff');
  for(const ex of[-36,36]){ctx.beginPath();ctx.arc(ex,0,14,0.1*Math.PI,0.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();}
  ctx.beginPath();ctx.moveTo(-60,40);ctx.quadraticCurveTo(0,280+Math.sin(T*2)*10,60,40);ctx.closePath();fs('#f4f4f4');
  ell(0,58,12+m*6,2+m*10);fs('#7a3a3a',4);
  line([-90,40,-140,60+Math.sin(T*2)*6],5,'#eee');line([90,40,140,60-Math.sin(T*2)*6],5,'#eee');
  ctx.restore();}

function disciple(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.3),y+boil(4,1.3));ctx.scale(s,s);ctx.rotate(o.tilt||0);
  poly([-140,130,140,130,180,480,-180,480]);fs('#d98c8c');poly([-40,130,0,200,40,130]);fs(P.robe,5);line([-160,300,160,300],12,P.gold);
  rr(-24,92,48,50,10);fs(P.skin);ell(0,0,92,104);fs(P.skin);
  for(const bx of[-80,80]){circ(bx,-90,40);fs(P.hair);rr(bx-6,-60,12,40,4);fs(P.red,0);}
  ctx.beginPath();ctx.moveTo(-94,10);ctx.quadraticCurveTo(-90,-110,0,-104);ctx.quadraticCurveTo(90,-110,94,10);ctx.quadraticCurveTo(50,-50,-94,10);fs(P.hair);
  for(const ex of[-34,34]){if(o.happy){ctx.beginPath();ctx.arc(ex,6,14,1.1*Math.PI,1.9*Math.PI);ctx.lineWidth=6;ctx.strokeStyle=OL;ctx.stroke();continue;}
    ell(ex,4,12,14);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}
  if(o.pain){line([-54,-28,-18,-18],5);line([18,-18,54,-28],5);}
  ell(0,56,12+m*6,3+m*14);fs('#a03a3a',4);
  ctx.restore();}

function vmouse(x,y,s,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);
  ctx.beginPath();ctx.moveTo(-90,120);ctx.quadraticCurveTo(-110,-40,-20,-150);ctx.quadraticCurveTo(80,-170,100,-20);ctx.quadraticCurveTo(110,80,90,120);ctx.closePath();fs('#2b2b2b');
  ctx.beginPath();ctx.moveTo(60,-130);ctx.quadraticCurveTo(110,-60,100,20);ctx.lineTo(70,20);ctx.quadraticCurveTo(80,-50,40,-120);ctx.closePath();fs('#555',4);
  line([70,-60,98,-55],4,'#888');circ(-30,-40,14);fs('#c9a227',4);rr(-95,110,190,22,8);fs('#1a1a1a');
  ctx.restore();}

function forearm(x,y,s,twist){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-400,-80,800,160,80);fs('#f3dcc4',6);
  const c=twist; // 0 = กระดูกขนาน (ท่าจับมือ), 1 = ไขว้ (คว่ำมือ)
  curve([-360,-30,-120,-30+c*30,120,-30+c*60,360,lerp(-30,30,c)],22,P.ink2);
  curve([-360,30,-120,30-c*30,120,30-c*60,360,lerp(30,-30,c)],18,'#8a8070');
  ell(430,0,70,lerp(90,50,c));fs('#f3dcc4',6);
  ctx.restore();}

const SCENES={
 peak(lt){paperBg();mountains(0,'#cfc6b2',900,120,1);mist(820);mountains(1,'#a39a86',1050,90,3);mist(1000);mountains(2,'#5a5048',1250,70,5);
  for(let i=0;i<4;i++){const bx=((T*60+i*220)%1300)-100,by=520+i*40+Math.sin(T*4+i)*10;curve([bx-20,by,bx,by-12,bx+20,by],5,P.ink);}
  poly([380,1250,700,1250,640,1150,450,1140]);fs(P.ink2,0);
  master(540,800,0.8,{mouth:mouthFor('master')});
  seal(900,1300,0.6,'ศิษย์');},
 pain(lt){paperBg();brush([0,1250,540,1240,1080,1260],40,'#8a6a3a');rr(80,1210,920,40,6);fs('#8a5a3a');
  disciple(500,900,1.05,{mouth:mouthFor('disc'),pain:1});
  ctx.save();ctx.translate(800,1180);rr(-60,-40,120,70,30);fs('#ddd');line([-140,0,-60,-10],34,OL);line([-140,0,-60,-10],22,P.skin);ctx.restore();
  for(let i=0;i<4;i++){const a=T*6+i*1.6;line([700+Math.cos(a)*60,1100+Math.sin(a)*40,700+Math.cos(a)*110,1100+Math.sin(a)*70],8,P.red);}
  txt('ปวด!',740,1000,70,P.red,{f:'Sri'});},
 twist(lt,ln){paperBg();
  const tw=E.inOut(prog(lt,0.2,1.4));forearm(480,950,1.05,tw);
  txt(tw>0.5?'คว่ำมือ = กระดูกไขว้':'ท่าปกติ',540,620,72,tw>0.5?P.red:P.ink,{f:'Sri'});
  if(tw>0.9){seal(860,1230,0.7,'บิด!',0.1);}
  txt('*ภาพประกอบเพื่อความเข้าใจ',540,1350,30,P.ink2,{f:'Sri'});},
 scroll(lt,ln){bgFill('#3a2a1a');
  const u=E.out(prog(lt,0,0.8));const w=lerp(40,900,u);
  rr(540-w/2,420,w,900,8);fs('#f3e9d0',6);rr(540-w/2-30,400,30,940,12);fs('#8a5a3a');rr(540+w/2,400,30,940,12);fs('#8a5a3a');
  if(u>0.9){ctx.save();ctx.globalAlpha=prog(lt,0.8,1.2);
    txt('เคล็ดวิชา',540,520,90,P.red,{f:'Sri'});
    forearm(500,880,0.75,0);vmouse(860,880,0.8,0.15);
    txt('ท่าจับมือทักทาย',540,1100,70,P.ink,{f:'Sri'});txt('แขนไม่ต้องบิด',540,1200,60,P.ink2,{f:'Sri'});ctx.restore();}},
 reveal(lt){paperBg();
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2+T*0.3;ctx.save();ctx.globalAlpha=0.25;ctx.fillStyle=P.gold;ctx.beginPath();ctx.moveTo(540,950);ctx.arc(540,950,1200,a,a+0.12);ctx.fill();ctx.restore();}
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;ell(540+Math.cos(a)*120,1150+Math.sin(a)*30,90,30,a);fs('#f4a7b9',4);}
  const k=E.back(prog(lt,0.1,0.6));ctx.save();ctx.translate(540,960+Math.sin(T*2)*10);ctx.scale(k,k);vmouse(0,0,1.6,0.08);ctx.restore();
  for(let i=0;i<10;i++){const a=hash(i)*6.28;circ(540+Math.cos(a)*(300+hash(i*2)*200)*k,950+Math.sin(a)*(240+hash(i*3)*150)*k,6+hash(i)*14);ctx.fillStyle=P.ink;ctx.fill();}},
 train(lt,ln){paperBg();mountains(0,'#d6cdb8',1150,60,2);
  const pose=Math.floor(lt*2.5)%3;
  for(let g=3;g>=0;g--){ctx.save();ctx.globalAlpha=g?0.15:1;ctx.translate(-g*40,0);disciple(540,880,1.0,{mouth:g?0:mouthFor('master'),tilt:[-0.15,0.1,0][pose]});ctx.restore();}
  vmouse(770,1050,0.6,[-0.3,0.4,0][pose]);
  [['ปุ่มครบ',300,520,0.2],['ใช้ง่าย',780,600,ln.dur*0.35],['ฝึกไม่กี่วัน',540,1320,ln.dur*0.65]].forEach(([t,x,y,s])=>{const k=E.back(prog(lt,s,s+0.3));if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(k,k);brush([-160,0,0,-6,160,0],80,P.ink);txt(t,0,4,52,'#fff',{f:'Sri'});ctx.restore();});},
 win(lt,ln){paperBg();mountains(0,'#cfc6b2',1100,80,4);mist(1050);
  disciple(540,880,1.05,{mouth:mouthFor('disc'),happy:1});vmouse(800,1150,0.55,0.1);
  const k=prog(lt,ln.dur*0.5,ln.dur*0.65);if(k>0){const s=lerp(2.5,0.8,E.out(k));seal(820,560,s,'ย่อมเยา');}},
 cta(lt){paperBg();
  rr(160,430,760,920,8);fs('#f3e9d0',6);rr(130,410,30,960,12);fs('#8a5a3a');rr(920,410,30,960,12);fs('#8a5a3a');
  txt('คัมภีร์ลับ',540,540,90,P.red,{f:'Sri'});
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,880);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.gold;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();
  brush([540,1040,545,1150,540,1240],30,P.ink);poly([490,1220,590,1220,540,1290]);fs(P.ink,0);
  seal(800,1250,0.55,'ตะกร้า');},
};

window.EP={font:'Sri',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*prog(lt,0,ln.dur);ctx.translate(540,960+Math.sin(T*0.6)*6);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Sri',size:64,col:'#1a1410',hl:'#c0392b',sw:12,stroke:'#efe6d2',pop:'fade',y:1580,lh:1.3},
  intro(t){paperBg();const k=prog(t,0.1,1.0);brush([200,900,540,880,880,910],lerp(0,200,k),P.ink);if(k>0.5)txt('ยุทธภพโต๊ะคอม',540,900,84,'#efe6d2',{f:'Sri2'});},
  overlay(){ctx.save();ctx.translate(540,200);brush([-420,0,0,-8,420,0],150,P.ink);txt(TL.title,0,-8,70,'#efe6d2',{f:'Sri2',maxW:780});
    txt(TL.series,0,62,34,P.ink2,{f:'Sri'});ctx.restore();seal(990,150,0.45,'ยุทธ');},
  outroGap:0.6,
  outro(k){ctx.save();ctx.globalAlpha=E.inOut(k);brush([-100,960,540,950,1180,970],lerp(0,2200,E.inOut(k)),P.ink);ctx.restore();},
  endCard(k){paperBg();ctx.save();ctx.globalAlpha=k;txt('ยุทธภพโต๊ะคอม',540,780,100,P.ink,{f:'Sri2'});
    txt('เมาส์แนวตั้ง',540,950,84,P.red,{f:'Sri'});txt('อยู่ในตะกร้าด้านล่าง',540,1060,60,P.ink2,{f:'Sri'});seal(540,1280,0.8,'ไร้เทียมทาน');ctx.restore();},
};
