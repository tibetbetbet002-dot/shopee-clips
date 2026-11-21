// EP.35 ดาบสายเมาส์ — แนวซามูไร ภาพพิมพ์ไม้ญี่ปุ่น (ที่แขวนสายเมาส์)
OL = '#1a1a2e'; LW = 8;
const P = {cream:'#f3e6c8',indigo:'#26408b',indigo2:'#0f2557',red:'#c8102e',skin:'#f0c8a0',wood:'#8b5e3c',gray:'#555b6e',white:'#ffffff'};

function ukiyo(){bgFill(P.cream);ctx.save();ctx.globalAlpha=0.12;for(let i=0;i<200;i++){ctx.fillStyle='#8a7a5a';ctx.fillRect(hash(i)*W,hash(i*2)*H,3,1);}ctx.restore();
  circ(820,560,150);fs(P.red,0);for(let r=0;r<3;r++){ctx.beginPath();for(let x=-50;x<=W+50;x+=20)ctx.lineTo(x,1250+r*60+Math.sin(x*0.02+T+r)*20);ctx.lineTo(W+50,H);ctx.lineTo(-50,H);ctx.closePath();fs(r%2?P.indigo:P.indigo2,0);}
  for(let i=0;i<8;i++){const x=i*150+((T*20)%150);ctx.beginPath();ctx.arc(x,1240,40,Math.PI,0);ctx.lineWidth=6;ctx.strokeStyle=P.white;ctx.stroke();}
  for(const[x,y]of[[150,520],[400,460]]){for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(x+k*40,y,30,Math.PI,0);ctx.lineWidth=5;ctx.strokeStyle=P.indigo;ctx.stroke();}}}
function samurai(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2));ctx.scale(s,s);ctx.rotate(o.rot||0);
  poly([-170,130,170,130,220,520,-220,520]);fs(P.indigo);poly([-170,130,-60,130,-120,300]);fs(P.gray,5);poly([170,130,60,130,120,300]);fs(P.gray,5);line([-200,330,200,330],18,P.red);
  if(o.sword){ctx.save();ctx.translate(150,220);ctx.rotate(o.swing?-1.2+Math.sin(T*10)*0.3:-0.5);rr(-10,-360,20,320,6);fs('#e8eef5',4);rr(-26,-40,52,14,4);fs(P.gold||'#c9a227',3);rr(-10,-26,20,90,6);fs('#222',3);ctx.restore();}
  rr(-24,88,48,56,10);fs(P.skin);ell(0,0,88,100);fs(P.skin);ctx.beginPath();ctx.arc(0,-24,90,Math.PI*1.05,Math.PI*1.95);ctx.closePath();fs('#111');rr(-16,-150,32,60,10);fs('#111');
  for(const ex of[-32,32]){line([ex-20,-6,ex+20,-2],7);}line([-56,-34,-12,-24],8);line([12,-24,56,-34],8);
  if(!o.f){ctx.beginPath();ctx.moveTo(-40,60);ctx.quadraticCurveTo(0,80,40,60);ctx.lineWidth=6;ctx.strokeStyle='#333';ctx.stroke();}
  ell(0,48,10+m*6,2+m*12);fs('#7a2a2a',4);ctx.restore();}
function student(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3,1.2),y+boil(4,1.2));ctx.scale(s,s);poly([-130,120,130,120,160,440,-160,440]);fs('#d98c8c');line([-150,300,150,300],14,P.indigo);
  rr(-20,84,40,50,8);fs(P.skin);ell(0,0,82,92);fs(P.skin);ctx.beginPath();ctx.arc(0,-20,84,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#111');circ(0,-110,30);fs('#111');
  for(const ex of[-28,28]){ell(ex,4,10,12);fs('#fff',4);circ(ex,6,5);ctx.fillStyle=OL;ctx.fill();}ell(0,46,10+m*6,3+m*12);fs('#a03040',4);ctx.restore();}
function deskTop(y){rr(60,y,960,40,6);fs(P.wood);ctx.fillStyle='#6b4a2a';ctx.fillRect(60,y+40,960,300);}
function mouse(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,46,70);fs('#e9eef5');line([0,-70,0,-20],4);ctx.restore();}
function bungee(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-60,-20,120,40,16);fs('#222');curve([0,-20,10,-120,-10,-220],14,'#333');rr(-30,-240,60,30,10);fs(P.red,4);ctx.restore();}
function banner(t,x,y,k){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(1,E.out(k));rr(-60,-260,120,520,6);fs(P.cream,6);rr(-60,-260,120,40,4);fs(P.red,0);
  ctx.font='52px Sri';ctx.fillStyle=OL;ctx.textAlign='center';[...t].forEach((c,i)=>{ctx.fillText(c,0,-180+i*58);});ctx.restore();}
function scrollTxt(t,y,k){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);rr(100,y-56,880,112,8);fs(P.cream,6);rr(100,y-56,880,16,0);fs(P.red,0);txt(t,540,y+8,50,OL,{f:'Sri',maxW:840});ctx.restore();}

const SCENES={
 dojo(lt){ukiyo();samurai(400,880,0.95,{mouth:mouthFor('samurai'),sword:1});student(820,980,0.6,{});},
 drag(lt,ln){ukiyo();deskTop(1100);rr(160,1020,140,80,6);fs('#a0522d',4);
  const k=(Math.sin(lt*2.5)+1)/2;const mx=lerp(560,800,k);mouse(mx,1060,0.9);curve([mx,1000,mx-60,960,300,1000,180,1100],8,'#333');
  if(k>0.85)star(300,1010,40,16,8,T*5,P.red,4);scrollTxt('สายลากถูขอบโต๊ะ · ติดหนังสือ',600,prog(lt,0.3,0.6));},
 fact(lt){ukiyo();ctx.save();ctx.translate(540,920);curve([-360,0,-120,0,0,0,360,0],22,'#333');for(let i=0;i<8;i++){const x=-60+i*14;line([x,-14,x+8,-26],4,'#c9a227');}
  ctx.strokeStyle=P.red;ctx.lineWidth=8;circ(-20,0,90);ctx.stroke();ctx.restore();scrollTxt('ถูไปมาทุกวัน = สายเสื่อมเร็ว',600,prog(lt,0.2,0.5));},
 why(lt,ln){ukiyo();deskTop(1100);ctx.save();ctx.translate(560,1060);mouse(0,0,1.0);line([-40,-40,-220,-60],8,'#333');poly([-240,-60,-210,-78,-210,-42]);fs(P.red,0);ctx.restore();
  ctx.save();ctx.translate(620,930);line([0,0,200,-20],10,'#2fbf71');poly([210,-20,180,-40,184,0]);fs('#2fbf71',0);ctx.restore();scrollTxt('แรงดึงจากสาย → มือออกแรงชดเชย',600,prog(lt,0.3,0.6));},
 tool(lt){ukiyo();const k=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,1000);ctx.scale(k*2,k*2);bungee(0,0,1);ctx.restore();banner('ที่แขวนสาย',180,820,prog(lt,0.1,0.5));samurai(860,980,0.5,{mouth:mouthFor('samurai')});},
 tip(lt){ukiyo();deskTop(1100);bungee(300,1080,1.0);mouse(640,1060,0.9);curve([290,840,420,900,560,960,640,990],8,'#333');
  ctx.save();ctx.setLineDash([10,8]);line([420,880,420,940],4,P.red);ctx.restore();scrollTxt('ให้สายหย่อนเล็กน้อย ไม่ตึง',600,prog(lt,0.2,0.5));},
 bonus(lt){ukiyo();deskTop(1100);rr(200,1040,680,60,12);fs('#2b2b33',5);mouse(540,1060,0.9);scrollTxt('แผ่นรองเมาส์ใหญ่พอ เมาส์ไม่ตกขอบ',600,prog(lt,0.2,0.5));},
 slash(lt){ukiyo();for(let i=0;i<5;i++){ctx.save();ctx.globalAlpha=0.6-i*0.1;line([100+i*20,1300-i*40,980-i*20,500+i*40],14-i*2,P.white);ctx.restore();}
  student(540,880,0.9,{mouth:mouthFor('student')});mouse(820,1180,0.8);ctx.save();ctx.globalAlpha=0.5;for(let i=1;i<4;i++)mouse(820-i*60,1180,0.8);ctx.restore();},
 price(lt){ukiyo();samurai(540,900,0.85,{mouth:mouthFor('samurai'),sword:1});banner('ราคาย่อมเยา',180,820,prog(lt,0.2,0.6));},
 cta(lt){ukiyo();banner('ตะกร้าด้านล่าง',160,820,prog(lt,0.1,0.5));const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(600,960);ctx.scale(b,b);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.red;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();},
};

window.EP={font:'Sri',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.04*prog(lt,0,ln.dur);if(name==='slash')s=1.06;ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Sri',size:62,col:'#f3e6c8',hl:'#ff6b6b',sw:0,box:'#1a1a2eee',boxR:0,boxPad:28,pop:'fade',y:1600,lh:1.3},
  intro(t){ukiyo();const k=E.out(prog(t,0,0.8));for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=k;line([100,1200-i*200,980,400-i*200+i*100],10,P.white);ctx.restore();}txt('ซามูไร',540,880,140,P.red,{f:'Sri',sw:12,stroke:P.cream});},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,6);fs(P.cream,8,OL);rr(-450,-88,30,176,0);fs(P.red,0);txt(TL.title,10,-6,70,OL,{f:'Sri',maxW:820});txt(TL.series,10,56,32,P.indigo,{f:'Sri'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.save();ctx.beginPath();ctx.rect(0,0,W,H);ctx.clip();ctx.translate(540,960);ctx.rotate(-0.6);ctx.fillStyle=P.indigo2;ctx.fillRect(-1500,-1500+3000*(1-E.inOut(k)),3000,3000);ctx.restore();},
  endCard(k){ukiyo();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,6);fs(P.cream,8,OL);txt('จบการฝึก',540,770,96,P.red,{f:'Sri'});txt('ที่แขวนสายเมาส์',540,910,74,OL,{f:'Sri'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.indigo,{f:'Sri'});ctx.restore();},
};
