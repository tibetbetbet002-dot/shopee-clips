// EP.22 แกะกล่องเงียบๆ — แนว ASMR มุมมองจากด้านบน โทนพาสเทลนุ่ม (กล่องเก็บสายชาร์จ)
OL = '#8a7f72'; LW = 4;
const P = {desk:'#eadfce',desk2:'#e2d4bf',sage:'#b7c9a8',box:'#f6f1e8',box2:'#d9cbb5',cable:'#ffffff',cable2:'#9fb4c7',skin:'#f1cfb4',copper:'#d08a4c',text:'#5b5147',candle:'#f4e3c3'};

function deskTop(){bgFill(P.desk);ctx.save();ctx.globalAlpha=0.35;for(let i=0;i<22;i++)line([0,300+i*80+Math.sin(i)*10,W,320+i*80],2,P.desk2);ctx.restore();
  ctx.save();ctx.globalAlpha=0.25;const g=ctx.createRadialGradient(300,500,50,300,500,900);g.addColorStop(0,'#fff8e8');g.addColorStop(1,'rgba(255,248,232,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();}
function shadowed(fn){ctx.save();ctx.shadowColor='rgba(80,60,40,0.25)';ctx.shadowBlur=30;ctx.shadowOffsetY=14;fn();ctx.restore();}
function hand(x,y,rot,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);shadowed(()=>{rr(-70,0,140,260,60);fs(P.skin,3);});
  for(let i=0;i<4;i++){rr(-64+i*34,-90+Math.abs(i-1.5)*12,28,110,14);fs(P.skin,3);}rr(60,40,30,90,14);fs(P.skin,3);ctx.restore();}
function candle(x,y){shadowed(()=>{circ(x,y,70);fs(P.candle,3);});circ(x,y,10);fs('#555',0);const f=1+0.1*Math.sin(T*9);ell(x,y-20*f,10,22*f);ctx.fillStyle='#ffb74d';ctx.fill();}
function plant(x,y){shadowed(()=>{circ(x,y,60);fs('#d9c2a6',3);});for(let i=0;i<7;i++){const a=i/7*Math.PI*2+Math.sin(T+i)*0.05;ell(x+Math.cos(a)*55,y+Math.sin(a)*55,40,16,a);fs(P.sage,3);}}
function tangle(cx,cy,r,seed){for(let k=0;k<4;k++){const pts=[];for(let i=0;i<=50;i++){const u=i/50*Math.PI*2;pts.push(cx+Math.sin((k+1)*u+seed)*r,cy+Math.cos((k+2)*u+seed*2)*r*0.7);}curve(pts,14,'#cfc6b8');curve(pts,9,k%2?P.cable:P.cable2);}}
function coil(x,y,r,col){for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(x,y,r-i*7,r*0.75-i*6,0,0,Math.PI*2);ctx.lineWidth=9;ctx.strokeStyle=col;ctx.stroke();}rr(x+r-10,y-14,40,28,8);fs('#ddd',3);}
function cableBox(x,y,s,open,fill){ctx.save();ctx.translate(x,y);ctx.scale(s,s);shadowed(()=>{rr(-300,-200,600,400,30);fs(P.box,3);});
  if(open>0){ctx.save();rr(-280,-180,560,360,20);ctx.clip();rr(-280,-180,560,360,0);fs('#efe7da',0);line([-90,-180,-90,180],6,P.box2);line([90,-180,90,180],6,P.box2);
    if(fill){coil(-185,-40,70,P.cable);coil(0,40,70,P.cable2);coil(185,-20,70,'#f2b5a0');}ctx.restore();}
  if(open<1){ctx.save();ctx.translate(0,-200);ctx.scale(1,1-open);rr(-300,0,600,400,30);fs(P.box2,3);txt('cable box',0,200,50,P.text,{f:'Itim'});ctx.restore();}
  ctx.restore();}
function label(t,x,y,k){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*1.5);txt(t,x,y+(1-k)*14,52,P.text,{f:'Itim'});ctx.restore();}
function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=16;ctx.strokeStyle='#e6a15c';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#f6b26b',3);for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],5,'#d98a3c');ctx.restore();}

const SCENES={
 desk(lt){deskTop();candle(220,520);plant(860,560);cableBox(540,1050,1.0,0,false);hand(820,1300,-0.5+Math.sin(T)*0.03,0.9);},
 mess(lt){deskTop();tangle(540,950,300,T*0.2);candle(180,480);hand(360,1300,0.4,0.85);label('หาเส้นไหนเส้นนั้น...',540,560,prog(lt,0.4,1.0));},
 fact(lt,ln){deskTop();
  ctx.save();ctx.translate(540,940);ctx.rotate(-0.3);rr(-160,-60,220,120,20);fs('#fff',3);rr(60,-24,80,48,6);fs('#cfcfcf',3);
  const b=E.inOut((Math.sin(lt*3)+1)/2);ctx.save();ctx.translate(-160,0);ctx.rotate(-b*1.2);rr(-360,-16,360,32,16);fs(P.cable,3);ctx.restore();
  ctx.save();ctx.globalAlpha=prog(lt,0.6,ln.dur);for(let i=0;i<4;i++)line([-170,-20+i*12,-190-i*6,-30+i*14],3,'#c0392b');ctx.restore();ctx.restore();
  label('ตรงหัวต่อ = จุดที่พับบ่อยที่สุด',540,560,prog(lt,0.3,0.8));},
 why(lt,ln){bgFill('#f3ece1');
  ctx.save();ctx.translate(540,920);circ(0,0,300);fs('#fff',3);ctx.save();circ(0,0,296);ctx.clip();
  for(let i=0;i<9;i++){const y=-160+i*40;const k=clamp(prog(lt,0,ln.dur)*1.2-i*0.04);const pts=[];for(let j=0;j<=20;j++){const x=-300+j*30;pts.push(x,y+Math.sin(j*0.6+lt*4)*k*18);}
    curve(pts,10,P.copper);if(i===4&&k>0.8){line([-10,y-10,10,y+10],5,'#c0392b');}}
  ctx.restore();ctx.restore();label('พับซ้ำๆ → ลวดทองแดงล้า → ขาด',540,1320,prog(lt,0.4,0.9));},
 open(lt,ln){deskTop();const o=E.inOut(prog(lt,0.3,ln.dur*0.9));cableBox(540,960,1.15,o,false);hand(380,780-o*100,0.2,0.85);hand(720,780-o*100,-0.2,0.85);
  for(let i=0;i<6;i++){const ph=(T*0.4+i/6)%1;ctx.save();ctx.globalAlpha=(1-ph)*o*0.6;circ(540+Math.sin(i*2+T)*200,900-ph*400,4);ctx.fillStyle='#fff';ctx.fill();ctx.restore();}},
 sort(lt){deskTop();cableBox(540,960,1.15,1,true);hand(800,1250,-0.4,0.85);label('ช่องแยก · ม้วนหลวมๆ',540,560,prog(lt,0.3,0.8));},
 tip(lt){deskTop();
  ctx.save();ctx.translate(300,900);coil(0,0,120,P.cable);ctx.restore();txt('✓ วงกว้าง',300,1110,52,'#6a9c5a',{f:'Itim'});
  ctx.save();ctx.translate(780,900);for(let i=0;i<8;i++){ctx.beginPath();ctx.ellipse(0,0,40+i*2,30+i*2,0.3*i,0,Math.PI*2);ctx.lineWidth=7;ctx.strokeStyle=P.cable2;ctx.stroke();}rr(-30,-20,60,40,8);fs('#ddd',3);ctx.restore();
  txt('✗ พันแน่น',780,1110,52,'#c0392b',{f:'Itim'});},
 bonus(lt){deskTop();rr(380,820,320,220,30);fs('#fff',3);for(const dx of[-60,60])rr(540+dx-14,880,28,70,8),fs('#555',0);
  const k=(Math.sin(lt*3)+1)/2;ctx.save();ctx.translate(540,1060+k*40);rr(-80,0,160,110,20);fs('#eee',3);line([0,110,0,320],16,P.cable);ctx.restore();hand(540,1120+k*40,0,0.75);
  txt('จับที่หัวปลั๊ก',540,620,60,P.text,{f:'Itim'});txt('ไม่ดึงที่สาย',540,700,52,'#c0392b',{f:'Itim'});},
 calm(lt){deskTop();candle(220,520);plant(860,560);cableBox(540,1000,0.9,1,true);
  ctx.save();ctx.globalAlpha=0.5;for(let i=0;i<3;i++){const ph=(T*0.3+i/3)%1;curve([220,480-ph*200,240+Math.sin(T+i)*20,400-ph*200,220,320-ph*200],6,'#fff');}ctx.restore();
  label('ราคาไม่แพง',540,1380,prog(lt,0.5,1.2));},
 cta(lt){deskTop();cableBox(540,880,0.7,1,true);const b=E.out(prog(lt,0.2,0.8));ctx.save();ctx.globalAlpha=b;basket(540,1240,0.8);ctx.restore();label('อยู่ในตะกร้าด้านล่าง',540,560,prog(lt,0.3,0.9));},
};

window.EP={font:'Itim',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.06*prog(lt,0,ln.dur);ctx.translate(540,960+Math.sin(T*0.4)*4);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Itim',size:58,col:'#5b5147',hl:'#c97b4a',sw:0,box:'#fffaf2d9',boxR:40,boxPad:26,pop:'fade',y:1600,lh:1.35},
  intro(t){deskTop();ctx.save();ctx.globalAlpha=prog(t,0.2,1.2);txt('ASMR',540,860,140,P.text,{f:'Itim'});txt('แกะกล่องเงียบๆ',540,1000,60,P.text,{f:'Itim'});ctx.restore();},
  overlay(){ctx.save();ctx.globalAlpha=0.9;txt(TL.title,540,170,70,P.text,{f:'Itim'});txt('🎧 '+TL.series,540,240,36,'#9a8f82',{f:'Itim'});ctx.restore();},
  outroGap:0.7,
  outro(k){ctx.fillStyle=`rgba(234,223,206,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){deskTop();ctx.save();ctx.globalAlpha=k;txt('ขอบคุณที่ฟังจนจบนะคะ',540,800,64,P.text,{f:'Itim'});txt('กล่องเก็บสายชาร์จ',540,940,80,'#c97b4a',{f:'Itim'});txt('อยู่ในตะกร้าด้านล่าง',540,1040,56,P.text,{f:'Itim'});ctx.restore();},
};
