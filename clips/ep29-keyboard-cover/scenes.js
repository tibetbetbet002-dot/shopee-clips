// EP.29 วันสูญพันธุ์ของคีย์บอร์ด — แนวยุคไดโนเสาร์ (ซิลิโคนคลุมคีย์บอร์ด)
OL = '#1f140a'; LW = 7;
const P = {sky1:'#ff9a5a',sky2:'#ffd08a',jungle:'#3f7d3a',jungle2:'#2d5e2a',lava:'#ff5a1f',dino:'#7bc96f',dino2:'#5aa850',key:'#e9e4d8',key2:'#b9b2a2',coffee:'#6b3e26',sil:'#9fe3ffaa',fossil:'#d9c9a3'};

function prehistoric(){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,P.sky1);g.addColorStop(1,P.sky2);ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600);
  poly([620,1000,820,560,1020,1000]);fs('#6b4a3a',6);poly([780,600,860,600,840,560,800,560]);fs(P.lava,0);for(let i=0;i<4;i++){const ph=(T*0.5+i/4)%1;circ(820+Math.sin(i)*30,540-ph*200,20+ph*40);ctx.save();ctx.globalAlpha=1-ph;ctx.fillStyle='#777';ctx.fill();ctx.restore();}
  for(let i=0;i<6;i++){const x=40+i*190;line([x,1000,x+10,760],20,'#6b4a2a');for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*0.5;ell(x+10+Math.cos(a)*70,760+Math.sin(a)*40,80,18,a);fs(P.jungle,4);}}
  ctx.fillStyle=P.jungle2;ctx.fillRect(-300,1000,W+600,900);}
function keyboardLand(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-420,-140,840,280,30);fs('#4a4a52');
  for(let r=0;r<4;r++)for(let c=0;c<11;c++){const kx=-390+c*72,ky=-115+r*62;const wet=o.wet&&hash(r*11+c)<o.wet;rr(kx,ky,60,52,10);fs(wet?'#8a5a3a':P.key,4);}
  if(o.cover){ctx.save();ctx.globalAlpha=0.8;rr(-410,-130,820,260,26);fs(P.sil,5,'#5ac8ff');ctx.restore();ell(-200,-90,140,20);ctx.fillStyle='#ffffff88';ctx.fill();}
  if(o.drops){for(let i=0;i<10;i++){const dx=-300+hash(i)*600,dy=-100+hash(i*3)*200;circ(dx,dy,14);fs('#9fe3ff',3);}}ctx.restore();}
function dino(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.5),y+boil(2,1.5));ctx.scale(s*(o.flip?-1:1),s);
  ell(0,120,120,140);fs(P.dino);ell(0,150,70,100);fs('#c9f0a8',0);poly([90,160,240,220,110,240]);fs(P.dino);
  for(let i=0;i<4;i++)poly([-40+i*30,-10,-25+i*30,-50,-10+i*30,-10]);fs(P.dino2,4);
  ell(10,-50,100,80);fs(P.dino);ell(80,-20,60,40);fs(P.dino);
  for(const ex of[-10,50]){ell(ex,-70,o.scared?22:16,o.scared?24:18);fs('#fff',4);circ(ex+4,-68,7);ctx.fillStyle=OL;ctx.fill();}
  ell(90,10,20+m*8,4+m*14);fs('#a02040',4);line([-80,140,-110,190],16,P.dino2);line([60,140,80,190],16,P.dino2);
  if(o.happy){ell(-40,-20,16,8);ctx.fillStyle='#ff9fb0aa';ctx.fill();}ctx.restore();}
function meteor(x,y,s){ctx.save();ctx.translate(x,y);ctx.rotate(0.4);ctx.scale(s,s);for(let i=0;i<5;i++){ctx.save();ctx.globalAlpha=0.5-i*0.08;ell(-60-i*60,-60-i*60,60-i*6,30);ctx.fillStyle=P.lava;ctx.fill();ctx.restore();}
  rr(-60,-80,120,160,16);fs('#f5f5f5');rr(-60,-80,120,30,8);fs(P.coffee,0);ctx.beginPath();ctx.arc(60,0,34,-1.2,1.2);ctx.lineWidth=14;ctx.strokeStyle=OL;ctx.stroke();ctx.restore();}
function fossilCard(t,x,y,k){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(-0.03);ctx.scale(E.back(k),E.back(k));rr(-300,-60,600,120,18);fs(P.fossil,6);txt(t,0,6,48,OL,{f:'Chon',maxW:560});ctx.restore();}

const SCENES={
 era(lt){prehistoric();keyboardLand(540,1180,1.0);dino(330,920,0.85,{mouth:0});dino(800,900,0.6,{flip:1});},
 meteor(lt,ln){prehistoric();const k=E.inOut(prog(lt,0,ln.dur));keyboardLand(540,1200,1.0);meteor(lerp(-200,540,k),lerp(300,1080,k),1.2);
  dino(840,920,0.8,{mouth:mouthFor('dino'),scared:1,flip:1});if(k>0.95){ctx.fillStyle='rgba(255,255,255,0.6)';ctx.fillRect(0,0,W,H);}},
 fact(lt,ln){prehistoric();keyboardLand(540,1100,1.05,{wet:prog(lt,0,ln.dur)*0.7});ctx.save();ctx.translate(540,820);ctx.rotate(1.6);rr(-60,-80,120,160,16);fs('#f5f5f5');ctx.restore();
  fossilCard('น้ำหก = สาเหตุเครื่องเสียที่พบบ่อย',540,560,prog(lt,0.3,0.6));},
 why(lt,ln){bgFill('#1f140a');ctx.save();ctx.translate(540,900);
  rr(-360,-140,720,90,14);fs(P.key,5);rr(-360,-40,720,40,6);fs('#888',4);rr(-360,10,720,30,6);fs('#2a7a3a',4);for(let i=0;i<8;i++){rr(-320+i*90,14,40,22,3);fs('#c9a227',0);}
  const k=prog(lt,0.2,ln.dur);for(let i=0;i<6;i++){const y=lerp(-200,20,clamp(k*1.4-i*0.08));circ(-250+i*100,y,12);fs(i<3?'#c48a3a':'#9fe3ff',3);}ctx.restore();
  txt('ปุ่มกด',540,690,44,'#fff',{f:'Chon'});txt('แผงวงจร',540,1010,44,'#9fe3a8',{f:'Chon'});
  fossilCard('น้ำหวาน → เหนียวใต้ปุ่ม',300,1230,prog(lt,0.4,0.7));fossilCard('น้ำ → ซึมถึงวงจร',780,1360,prog(lt,ln.dur*0.55,ln.dur*0.75));},
 shield(lt){prehistoric();const k=E.out(prog(lt,0.2,0.9));keyboardLand(540,1150,1.0,{cover:k>0.98});if(k<0.98){ctx.save();ctx.translate(540,lerp(500,1150,k));ctx.globalAlpha=0.8;rr(-410,-130,820,260,26);fs(P.sil,5,'#5ac8ff');ctx.restore();}
  dino(200,860,0.6,{mouth:mouthFor('dino'),happy:1});fossilCard('ซิลิโคนคลุมคีย์บอร์ด',540,560,prog(lt,0.1,0.4));},
 save(lt){prehistoric();keyboardLand(540,1100,1.0,{cover:1,drops:1});const k=prog(lt,0.6,1.6);ctx.save();ctx.translate(lerp(160,920,k),1000);rr(-70,-40,140,80,20);fs('#fff',5);ctx.restore();
  fossilCard('น้ำ+ฝุ่น ค้างบนแผ่น → เช็ดออก',540,600,prog(lt,0.2,0.5));},
 tip(lt,ln){bgFill('#fff6e6');const steps=['ปิดเครื่อง','ถอดปลั๊ก','คว่ำคีย์บอร์ด'];steps.forEach((s,i)=>{const k=prog(lt,i*ln.dur*0.28,i*ln.dur*0.28+0.3);if(k<=0)return;
    ctx.save();ctx.translate(540,560+i*260);ctx.scale(E.back(k),E.back(k));circ(-320,0,70);fs(P.lava,6);txt(String(i+1),-320,8,70,'#fff',{f:'Chon'});rr(-220,-60,520,120,20);fs(P.fossil,5);txt(s,40,6,58,OL,{f:'Chon'});ctx.restore();});
  dino(900,1320,0.4,{flip:1});},
 bonus(lt,ln){bgFill('#fff6e6');ctx.save();ctx.translate(540,880);ctx.rotate(Math.PI);keyboardLand(0,0,0.8);ctx.restore();for(let i=0;i<6;i++){const ph=(T+i/6)%1;circ(300+i*90,980+ph*200,8);fs('#9fe3ff',3);}
  ctx.save();ctx.translate(820,600);rr(-90,-50,180,100,20);fs('#ddd',5);line([-60,-80,60,80],14,'#ff3b30');line([60,-80,-60,80],14,'#ff3b30');ctx.restore();
  fossilCard('รอแห้งสนิทค่อยเปิด',540,1250,prog(lt,0.2,0.5));fossilCard('ห้ามเป่าลมร้อนจัด!',540,1380,prog(lt,ln.dur*0.5,ln.dur*0.7));},
 live(lt){prehistoric();keyboardLand(540,1180,1.0,{cover:1});dino(330,900,0.8,{mouth:mouthFor('dino'),happy:1});dino(780,920,0.6,{happy:1,flip:1});fossilCard('ราคาหลักสิบ',540,580,prog(lt,0.3,0.6));},
 cta(lt){bgFill('#d9c9a3');for(let i=0;i<30;i++){circ(hash(i)*W,hash(i*2)*H,4+hash(i*3)*10);ctx.fillStyle='#c4b28a';ctx.fill();}
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,900);ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle='#fff';ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();fossilCard('ขุดฟอสซิลที่ตะกร้าด้านล่าง',540,1200,prog(lt,0.2,0.5));},
};

window.EP={font:'Chon',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.04*prog(lt,0,ln.dur);if(name==='meteor'){const sh=prog(lt,ln.dur*0.8,ln.dur)*14;ctx.translate(Math.sin(T*50)*sh,Math.cos(T*41)*sh);}ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Chon',size:56,col:'#fff6e6',hl:'#ffd23f',stroke:'#1f140a',sw:14,pop:'back',y:1590,lh:1.4},
  intro(t){prehistoric();const k=prog(t,0.2,1.2);ctx.save();ctx.globalAlpha=k;txt('65 ล้านปีก่อน...',540,880,90,'#fff6e6',{f:'Chon',sw:12});ctx.restore();},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-90,900,180,20);fs('#1f140aee',6,'#ffd23f');txt(TL.title,0,-8,68,'#ffd23f',{f:'Chon',maxW:840});txt(TL.series,0,56,32,'#fff6e6',{f:'Chon'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.fillStyle=`rgba(255,120,40,${E.inOut(k)})`;ctx.fillRect(0,0,W,H);},
  endCard(k){bgFill('#ff9a5a');ctx.save();ctx.globalAlpha=k;txt('คีย์บอร์ดรอดแล้ว!',540,780,96,'#1f140a',{f:'Chon'});txt('ซิลิโคนคลุมคีย์บอร์ด',540,940,70,'#fff',{f:'Chon',sw:8,stroke:'#1f140a'});txt('อยู่ในตะกร้าด้านล่าง',540,1040,56,'#1f140a',{f:'Chon'});ctx.restore();},
};
