// EP.46 ยุค 80 พิมพ์ไทยไม่ได้! — แนวหนังตลกยุค 80 VHS นีออน (สติกเกอร์แป้นพิมพ์ภาษาไทย)
OL = '#1a0f2e'; LW = 7;
const P = {sun1:'#ff6ec7',sun2:'#ffd166',grid:'#ff2bd6',sky:'#2b0f54',teal:'#00e5d0',skin:'#f1c39d',jacket:'#00b4ff',jacket2:'#ff4fa0',key:'#e9e4f2'};

function retro(){const g=ctx.createLinearGradient(0,0,0,1100);g.addColorStop(0,P.sky);g.addColorStop(1,'#7a1fa2');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  ctx.save();circ(540,900,280);ctx.clip();const g2=ctx.createLinearGradient(0,620,0,1180);g2.addColorStop(0,P.sun2);g2.addColorStop(1,P.sun1);ctx.fillStyle=g2;ctx.fillRect(200,600,700,600);for(let i=0;i<6;i++){ctx.fillStyle=P.sky;ctx.fillRect(200,920+i*36,700,8+i*3);}ctx.restore();
  ctx.fillStyle='#120826';ctx.fillRect(-300,1100,W+600,900);ctx.strokeStyle=P.grid;ctx.lineWidth=3;for(let i=0;i<14;i++){const y=1100+Math.pow(i/14,2)*820+((T*40)%60)*(i/14);line([-100,y,W+100,y],3,P.grid);}
  for(let i=-10;i<=10;i++)line([540+i*30,1100,540+i*180,1920],3,P.grid);}
function vhs(){ctx.save();ctx.globalAlpha=0.08;for(let y=0;y<H;y+=4){ctx.fillStyle='#000';ctx.fillRect(0,y,W,2);}ctx.restore();if(hash(Math.floor(T*10))>0.85){const y=hash(Math.floor(T*30))*H;ctx.drawImage(cv,0,y,W,30,12,y,W,30);}
  txt('PLAY ▶',100,1460,32,'#fff',{f:'Bai',align:'left'});txt('SP 0:'+String(Math.floor(T)).padStart(2,'0'),980,1460,32,'#fff',{f:'Bai',align:'right'});}
function dude(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.4),y+boil(2,1.4));ctx.scale(s,s);poly([-160,130,160,130,190,460,-190,460]);fs(o.f?P.jacket2:P.jacket);poly([-60,130,0,220,60,130]);fs(o.f?P.teal:P.sun2,4);
  for(const sd of[-1,1])poly([sd*160,130,sd*220,200,sd*150,240]);fs(o.f?P.jacket2:P.jacket,5);
  rr(-22,88,44,56,10);fs(P.skin);ell(0,0,90,100);fs(P.skin);
  if(o.f){ctx.beginPath();for(let i=0;i<12;i++){const a=Math.PI*(0.9+i*0.1);circ(Math.cos(a)*110,-20+Math.sin(a)*110,40);}fs('#6a2a10');}else{ctx.beginPath();ctx.moveTo(-90,0);ctx.lineTo(-80,-140);ctx.lineTo(80,-140);ctx.lineTo(90,0);ctx.closePath();fs('#2a1a10');}
  rr(-80,-24,70,34,10);fs(o.f?P.sun1:'#111',4);rr(10,-24,70,34,10);fs(o.f?P.sun1:'#111',4);line([-10,-8,10,-8],6);
  if(o.cool){ctx.beginPath();ctx.moveTo(-40,48);ctx.quadraticCurveTo(10,70,46,40);ctx.lineWidth=7;ctx.strokeStyle=OL;ctx.stroke();}else{ell(0,54,14+m*6,3+m*14);fs('#9a3040',4);}ctx.restore();}
function keyboard(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-420,-150,840,300,24);fs('#2b2b3a');const en='QWERTYUIOPASDFGHJKLZXCVBNM';const th='ๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอ';
  for(let r=0;r<3;r++)for(let c=0;c<10-r;c++){const kx=-380+c*76+r*30,ky=-120+r*82;const idx=r*10+c;rr(kx,ky,66,70,10);fs(P.key,4);
    txt(en[idx]||'',kx+18,ky+24,22,OL,{f:'Bai'});if(o.thai&&idx/26<o.thai)txt(th[idx]||'',kx+46,ky+50,26,'#c2185b',{f:'Bai'});}ctx.restore();}
function screenTxt(t,x,y,s,col){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-300,-160,600,320,16);fs('#111',8);rr(-280,-140,560,260,8);fs('#0a1a3a',0);txt(t,0,-10,52,col,{f:'Bai',maxW:520});ctx.restore();}
function neon(t,y,k,col=P.teal){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2)*(0.85+0.15*Math.sin(T*18));ctx.shadowColor=col;ctx.shadowBlur=30;txt(t,540,y,58,col,{f:'Bai',sw:6,stroke:OL,maxW:960});ctx.restore();}

const SCENES={
 retro(lt){retro();dude(540,880,1.0,{mouth:mouthFor('dude'),cool:1});keyboard(540,1300,0.8);},
 problem(lt){retro();keyboard(540,1150,1.0);dude(860,800,0.5,{f:1,mouth:mouthFor('pal')});neon('ไม่มีตัวอักษรไทย!',560,prog(lt,0.3,0.6),P.sun1);},
 fail(lt,ln){retro();screenTxt(lt<ln.dur*0.4?'sbfy\'u':'สวัสดี = sbfy\'u ??',540,820,1.3,P.teal);dude(540,1250,0.5,{mouth:mouthFor('dude')});},
 fact(lt){retro();const flags=['US','JP','EU','TH?'];flags.forEach((f,i)=>{ctx.save();ctx.translate(200+i*230,850);rr(-90,-60,180,120,10);fs(i===3?P.sun1:'#2b2b3a',6,P.teal);txt(f,0,8,48,'#fff',{f:'Bai'});ctx.restore();});
  keyboard(540,1200,0.7);neon('คีย์บอร์ดนำเข้า = อังกฤษอย่างเดียว',560,prog(lt,0.3,0.6));},
 why(lt,ln){retro();ctx.save();ctx.translate(540,880);circ(0,0,260);fs('#1a4a8a',8,P.teal);for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*Math.PI/3+T*0.5);line([0,0,0,-250],4,P.teal);ctx.restore();}ell(0,0,260,90);ctx.lineWidth=4;ctx.strokeStyle=P.teal;ctx.stroke();ctx.restore();
  for(let i=0;i<6;i++){const a=T*0.8+i*1.05;ctx.save();ctx.translate(540+Math.cos(a)*340,880+Math.sin(a)*200);rr(-60,-30,120,60,8);fs('#2b2b3a',4,P.sun2);txt('⌨',0,6,34,'#fff',{f:'Bai'});ctx.restore();}
  neon('ผลิตขายทั่วโลก → ใส่แค่อังกฤษ',1300,prog(lt,0.3,0.6),P.sun2);},
 sticker(lt,ln){retro();keyboard(540,1050,1.1,{thai:prog(lt,0.3,ln.dur*0.9)});neon('แปะสติกเกอร์แป้นพิมพ์ไทย!',560,prog(lt,0.1,0.4),P.sun1);},
 tip(lt){retro();keyboard(540,1050,1.0,{thai:1});const k=prog(lt,0.2,1.2);ctx.save();ctx.translate(lerp(160,920,k),900);rr(-60,-30,120,60,16);fs('#bfe9ff',5);ctx.restore();neon('แปะตอนสะอาด + แห้ง · กดให้แนบ',560,prog(lt,0.2,0.5));},
 bonus(lt,ln){retro();keyboard(540,1150,0.9,{thai:1});ctx.save();ctx.translate(540,760);rr(-240,-90,480,180,20);fs('#111',6,P.teal);const t=Math.max(0,600-Math.floor(lt*90));txt('⏱ '+Math.floor(t/60)+':'+String(t%60).padStart(2,'0'),0,10,90,P.teal,{f:'Bai'});ctx.restore();
  neon('ฝึกพิมพ์สัมผัส วันละ 10 นาที',1380,prog(lt,0.3,0.6),P.sun2);},
 type(lt,ln){retro();const s='สวัสดีครับ!';const n=Math.floor(prog(lt,0,ln.dur*0.6)*s.length);screenTxt(s.slice(0,n)+(Math.floor(T*3)%2?'|':''),540,800,1.3,P.teal);dude(540,1250,0.5,{mouth:mouthFor('dude'),cool:1});neon('ราคาหลักสิบ!',1080,prog(lt,ln.dur*0.6,ln.dur*0.8),P.sun1);},
 cta(lt){retro();const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,880);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.teal;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();neon('ไปที่ตะกร้าด้านล่าง แบบเท่ๆ!',1250,prog(lt,0.3,0.6),P.sun1);},
};

window.EP={font:'Bai',scenes:SCENES,
  camera(name,lt,ln){const s=1+0.05*(1-E.out(prog(lt,0,0.3)));ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Bai',size:58,col:'#ffffff',hl:'#ff6ec7',stroke:'#1a0f2e',sw:14,pop:'back',y:1590,lh:1.35,skew:-0.12},
  intro(t){retro();const k=E.back(prog(t,0,0.6));ctx.save();ctx.translate(540,880);ctx.scale(k,k);ctx.shadowColor=P.sun1;ctx.shadowBlur=40;txt('RADICAL!',0,0,140,P.sun1,{f:'Bai',sw:10,stroke:OL});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-460,-88,920,176,14);fs('#1a0f2ee6',5,P.teal);ctx.shadowColor=P.sun1;ctx.shadowBlur=20;txt(TL.title,0,-6,66,P.sun1,{f:'Bai',maxW:860});ctx.shadowBlur=0;txt(TL.series,0,56,30,P.teal,{f:'Bai'});ctx.restore();},
  post(){vhs();},
  outroGap:0.5,
  outro(k){ctx.fillStyle=`rgba(0,0,0,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);for(let i=0;i<8;i++){ctx.fillStyle=`rgba(255,255,255,${0.2*k})`;ctx.fillRect(0,hash(i+Math.floor(T*20))*H,W,6);}},
  endCard(k){retro();ctx.save();ctx.globalAlpha=k;rr(140,640,800,500,14);fs('#1a0f2eee',6,P.teal);txt('TOTALLY AWESOME',540,760,70,P.sun1,{f:'Bai'});txt('สติกเกอร์แป้นพิมพ์ไทย',540,910,68,'#fff',{f:'Bai'});txt('อยู่ในตะกร้าด้านล่าง',540,1020,56,P.teal,{f:'Bai'});ctx.restore();},
};
