// EP.7 สูตรลับเชฟ: คอไม่พัง — แนวรายการทำอาหาร (ขาตั้งมือถือ)
OL = '#3d2c1e'; LW = 8;
const P = {cream:'#fff1d6',tile:'#ffffff',grout:'#9cc9e8',wood:'#c98b5a',woodD:'#9c6438',coral:'#ff6b6b',butter:'#ffd166',teal:'#06d6a0',
  skin:'#f3c3a0',skin2:'#e9b48c',hair:'#3a2316',chalk:'#22302a',steel:'#c9d3dc'};

function chef(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1),y+boil(2));ctx.scale(s,s);
  poly([-150,140,150,140,180,500,-180,500]);fs('#fff');
  for(const by of[200,270,340])circ(-40,by,10),fs('#ccc',4),circ(40,by,10),fs('#ccc',4);
  poly([-60,130,0,180,60,130,40,110,-40,110]);fs(P.coral,6);
  if(o.point){line([140,200,250,150,330,120],28,OL);line([140,200,250,150,330,120],18,'#fff');line([330,120,430,80],12,'#888');rr(420,50,70,60,10);fs(P.steel,5);}
  else{line([140,200,200,300,160,380],28,OL);line([140,200,200,300,160,380],18,'#fff');circ(160,390,24);fs(P.skin,6);}
  line([-140,200,-200,300,-160,380],28,OL);line([-140,200,-200,300,-160,380],18,'#fff');circ(-160,390,24);fs(P.skin,6);
  rr(-24,90,48,56,10);fs(P.skin);ell(0,0,98,112);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-100,10);ctx.quadraticCurveTo(-100,-100,0,-100);ctx.quadraticCurveTo(100,-100,100,10);ctx.quadraticCurveTo(60,-50,0,-50);ctx.quadraticCurveTo(-60,-50,-100,10);fs(P.hair);
  // หมวกเชฟ
  rr(-90,-140,180,60,10);fs('#fff');for(const[cx,cy,rr2]of[[-60,-180,60],[0,-210,70],[60,-180,60]]){circ(cx,cy,rr2);fs('#fff');}
  rr(-88,-138,176,56,8);fs('#fff',0);line([-90,-82,90,-82],7);
  for(const ex of[-36,36]){if(o.wink&&ex>0){line([ex-14,0,ex+14,-4],7);continue;}ell(ex,0,15,17);fs('#fff',5);circ(ex,2,6);ctx.fillStyle=OL;ctx.fill();}
  line([-54,-30,-20,-34],6);line([20,-34,54,-30],6);
  ell(0,56,16+m*6,4+m*16);fs('#c0392b',5);ell(-58,32,16,8);ctx.fillStyle='#ff9f9f99';ctx.fill();ell(58,32,16,8);ctx.fill();
  ctx.restore();}

function helper(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(3),y+boil(4));ctx.scale(s,s);
  ell(0,300,190,200);fs(P.teal);rr(-60,180,120,150,20);fs('#fff',6);
  rr(-24,96,48,50,10);fs(P.skin2);ell(0,0,112,112);fs(P.skin2);
  ctx.beginPath();ctx.arc(0,-20,112,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs(P.coral);for(let i=0;i<6;i++)circ(-70+i*28,-70,6),ctx.fillStyle='#fff',ctx.fill();
  poly([100,-40,150,-60,140,-10]);fs(P.coral,6);
  for(const ex of[-38,38]){if(o.stars){star(ex,4,26,11,5,T*3,P.butter,5);continue;}ell(ex,4,16,18);fs('#fff',5);circ(ex+(o.look||0)*6,6,6);ctx.fillStyle=OL;ctx.fill();}
  if(o.confused){line([-56,-26,-20,-38],6);line([20,-30,56,-22],6);}
  ell(0,60,18+m*6,4+m*18);fs('#c0392b',5);
  if(o.spoon){line([120,160,180,40],12,'#888');ell(190,20,26,18,-0.5);fs(P.steel,5);}
  ctx.restore();}

function kitchen(){bgFill(P.cream);
  for(let y=330;y<1150;y+=90)for(let x=0;x<W;x+=90){ctx.fillStyle=P.tile;ctx.fillRect(x+3,y+3,84,84);}
  ctx.fillStyle=P.grout;for(let y=330;y<1150;y+=90)ctx.fillRect(0,y,W,3);for(let x=0;x<W;x+=90)ctx.fillRect(x,330,3,820);
  for(const x of[150,930]){line([x,330,x,420],5);ell(x,450,70,40);fs('#ffe7a8',6);}
  rr(-20,1150,1120,60,10);fs(P.woodD);ctx.fillStyle=P.wood;ctx.fillRect(-300,1210,W+600,800);
  for(let i=0;i<10;i++)line([i*120,1210,i*120,1920],4,P.woodD);}
function gingham(x,y,w,h){ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.fillStyle='#fff';ctx.fillRect(x,y,w,h);ctx.fillStyle='#ff6b6b88';
  for(let i=0;i<w;i+=50)ctx.fillRect(x+i,y,25,h);for(let j=0;j<h;j+=50)ctx.fillRect(x,y+j,w,25);ctx.restore();}
function phoneFlat(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,130,40);fs('#2b2d42');ell(0,-6,112,30);fs('#5bc0eb',4);ctx.restore();}
function standPhone(x,y,s,k=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  rr(-90,-10,180,24,10);fs('#ef8354');line([-30,0,20,-150],18,OL);line([-30,0,20,-150],10,'#ef8354');
  ctx.save();ctx.translate(30,-120);ctx.rotate(0.18*k);rr(-60,-200,120,230,20);fs('#2b2d42');rr(-48,-186,96,196,10);fs('#5bc0eb',4);
  rr(-30,-150,60,40,6);fs('#ffffff88',0);ctx.restore();ctx.restore();}
function steam(x,y,n=3){for(let i=0;i<n;i++){const ph=(T*0.8+i/n)%1;ctx.save();ctx.globalAlpha=1-ph;curve([x+i*30-30,y,x+i*30-20+Math.sin(T*3+i)*20,y-60-ph*80,x+i*30-30,y-140-ph*120],10,'#ffffff');ctx.restore();}}
function basket(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.butter;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');line([-126,20,126,20],6,'#b35500');
  poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();}
function recipe(lines,x,y,k){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(-0.04);ctx.globalAlpha=Math.min(1,k*2);
  rr(-300,-40,600,60+lines.length*70,10);fs('#fffdf5',6);line([-300,30,300,30],3,P.coral);
  lines.forEach(([t,c],i)=>{txt(t,-260,70+i*70,48,c||OL,{f:'Sri',align:'left',maxW:520});});ctx.restore();}

const SCENES={
 kitchen(lt){kitchen();
  chef(540,860,1.15,{mouth:mouthFor('chef')});
  rr(150,1120,780,40,10);fs(P.woodD);gingham(-20,1160,1120,120);
  const chop=[0.4,0.6,0.8].some(s=>lt>s&&lt<s+0.12);
  rr(560,1080,300,50,10);fs('#e0b07a');for(let i=0;i<4;i++){circ(600+i*40,1070,16);fs(['#ff6b6b','#06d6a0','#ffd166','#ff9f1c'][i],5);}
  ctx.save();ctx.translate(780,chop?1060:960);rr(-10,-120,24,120,6);fs(P.steel,5);rr(-14,0,30,60,8);fs(P.woodD,5);ctx.restore();
  rr(130,1020,200,110,14);fs('#555');steam(230,1010);ctx.fillStyle=P.wood;ctx.fillRect(-300,1280,W+600,800);for(let i=0;i<10;i++)line([i*120,1280,i*120,1920],4,P.woodD);},
 bad(lt,ln){kitchen();gingham(-20,1100,1120,200);
  ell(540,1090,300,70);fs('#fff');ell(540,1080,250,50);fs('#f0f0f0',5);
  phoneFlat(540,1060,1.2);
  const k=E.back(prog(lt,0.2,0.5));ctx.save();ctx.translate(540,1060);ctx.scale(k,k);circ(0,0,260);ctx.lineWidth=34;ctx.strokeStyle='#e63946';ctx.stroke();line([-180,-180,180,180],34,'#e63946');ctx.restore();
  rr(250,520,580,140,20);fs('#e63946',6);txt('ห้ามใส่!',540,590,100,'#fff',{f:'Sri'});
  chef(170,820,0.7,{mouth:mouthFor('chef'),point:1});},
 why(lt){kitchen();helper(540,950,1.6,{mouth:mouthFor('helper'),confused:1,look:-1});
  for(let i=0;i<3;i++){const k=prog(lt,i*0.15,i*0.15+0.3);txt('?',780+i*70,640-i*50+Math.sin(T*5+i)*10,110*E.back(k),P.coral,{f:'Sri',sw:10});}},
 explain(lt,ln){bgFill('#fde8c8');
  rr(-20,1150,1120,40,6);fs(P.woodD);ctx.fillStyle=P.wood;ctx.fillRect(-300,1190,W+600,800);
  phoneFlat(560,1130,0.9);
  const dings=[0.5,1.0,1.5,2.0,2.5].filter(s=>lt>s);const last=dings.length?dings[dings.length-1]:-9;const dip=Math.exp(-(lt-last)*5)*(lt>last?1:0);
  ctx.save();ctx.translate(380,760);ctx.rotate(dip*0.6);
  rr(-100,140,200,300,60);fs('#7ec8f0');rr(-26,90,52,70,10);fs(P.skin);ell(10,0,100,110);fs(P.skin);
  ctx.beginPath();ctx.moveTo(-90,-20);ctx.quadraticCurveTo(-60,-130,40,-110);ctx.quadraticCurveTo(110,-90,108,-10);ctx.quadraticCurveTo(40,-60,-90,-20);fs(P.hair);
  ell(55,-5,14,16);fs('#fff',5);circ(60,4,6);ctx.fillStyle=OL;ctx.fill();ctx.restore();
  if(lt>last&&lt<last+0.4){const k=(lt-last)/0.4;ctx.save();ctx.globalAlpha=1-k;rr(600,960-k*40,240,80,40);fs('#ffd166',6);txt('🔔 แจ้งเตือน',720,1000-k*40,36,OL,{f:'Itim'});ctx.restore();}
  rr(250,450,580,160,20);fs('#fff',6);txt('ก้มดู ×'+dings.length,540,520,90,'#e63946',{f:'Sri'});
  if(lt>ln.dur*0.75)txt('หลายสิบครั้งต่อวัน!',540,690,70,OL,{f:'Sri',sw:0});},
 ingredient(lt){kitchen();gingham(-20,1180,1120,200);
  const drop=E.out(prog(lt,0.2,0.8));ell(540,1150,280,70);fs('#f4a261');ell(540,1130,240,50);fs('#ffe8cc',5);
  standPhone(540,lerp(500,1110,drop),0.9,drop);
  if(drop>0.98){for(let i=0;i<8;i++){const a=i*0.8+T;star(540+Math.cos(a)*300,950+Math.sin(a)*150,24,8,4,T*3,P.butter,4);}}
  recipe([['วัตถุดิบ',P.coral],['• ขาตั้งมือถือ ×1'],['• ปรับมุมให้จอตั้งขึ้น']],540,470,prog(lt,0.6,1.0));},
 plate(lt,ln){bgFill('#2b2d42');for(let i=0;i<4;i++){ctx.save();ctx.globalAlpha=0.12;ctx.fillStyle='#fff';poly([200+i*220,330,260+i*220,330,380+i*220,1300,80+i*220,1300]);ctx.fill();ctx.restore();}
  ell(540,1200,380,80);fs('#c9d3dc');ell(540,1185,330,60);fs('#e9eef2',5);
  standPhone(540,1170,1.0,1);
  const up=E.out(prog(lt,0,0.5));ctx.save();ctx.translate(540,1150-up*700);ctx.beginPath();ctx.arc(0,0,320,Math.PI,0);ctx.closePath();fs(P.steel);circ(0,-330,30);fs(P.steel,6);ctx.restore();
  if(up>0.6)steam(540,900,4);
  const d=ln.dur;[[0.05,'เหลือบมองได้'],[0.35,'ไม่ต้องหยิบ'],[0.65,'ดูคลิปสบาย']].forEach(([f,t],i)=>{const k=E.back(prog(lt,d*f,d*f+0.3));if(k<=0)return;
    ctx.save();ctx.translate(i===1?780:300,450+i*130);ctx.scale(k,k);rr(-190,-50,380,100,50);fs(P.butter,6);txt(t,0,4,50,OL,{f:'Sri'});ctx.restore();});},
 taste(lt,ln){kitchen();
  const yum=lt>0.3;helper(540,950,1.5,{mouth:mouthFor('helper'),stars:yum&&lt<ln.dur*0.55,spoon:1});
  if(yum){const k=E.back(prog(lt,0.3,0.6));ctx.save();ctx.translate(540,540);ctx.scale(k,k);ctx.rotate(-0.1);txt('อร่อย!',0,0,150,P.coral,{f:'Sri',sw:14});ctx.restore();}
  if(lt>ln.dur*0.55){line([360,520,720,560],18,'#2b2d42');txt('สบายคอ!',540,700,110,P.teal,{f:'Sri',sw:14});}},
 cta(lt){kitchen();gingham(-20,1180,1120,200);
  chef(260,880,0.85,{mouth:mouthFor('chef'),wink:1});ctx.fillStyle=P.wood;ctx.fillRect(-300,1280,W+600,800);gingham(-20,1180,1120,110);
  const b=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(760,1090);ctx.scale(b,b);basket(0,0,1.05);ctx.restore();
  recipe([['วัตถุดิบหาได้ที่',P.coral],['ตะกร้าด้านล่าง ↓']],680,560,prog(lt,0.2,0.6));},
};

window.EP={font:'Sri',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.06*(1-E.out(prog(lt,0,0.3)));if(name==='why'||name==='taste')s=1+0.08*prog(lt,0,ln.dur);
    ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Sri',size:66,col:'#ffffff',hl:'#ffd166',stroke:'#3d2c1e',sw:16,pop:'back',y:1570,lh:1.3},
  intro(t){kitchen();const k=E.back(prog(t,0.1,0.6));ctx.save();ctx.translate(540,800);ctx.scale(k,k);ctx.rotate(-0.05);
    rr(-380,-150,760,300,30);fs(P.chalk,10,P.woodD);txt('ครัวโต๊ะคอม',0,-20,110,'#fff',{f:'Sri'});txt('เมนูวันนี้: คอไม่พัง',0,80,56,P.butter,{f:'Sri'});ctx.restore();steam(540,1100,4);},
  overlay(t){ctx.save();ctx.translate(540,195);ctx.rotate(Math.sin(T*1.5)*0.01);rr(-420,-100,840,200,16);fs(P.chalk,10,P.woodD);
    txt(TL.series,0,-48,40,'#e9e9e9',{f:'Sri'});txt(TL.title,0,28,78,P.butter,{f:'Sri',maxW:780});ctx.restore();},
  outroGap:0.6,
  outro(k){for(let i=0;i<14;i++){circ(hash(i)*W,hash(i*3)*H,E.inOut(k)*700*(0.5+hash(i*7)));ctx.fillStyle='#fff1d6';ctx.fill();}},
  endCard(k){bgFill(P.cream);ctx.save();ctx.globalAlpha=k;rr(140,620,800,560,30);fs(P.chalk,12,P.woodD);
    txt('ครัวโต๊ะคอม',540,760,110,'#fff',{f:'Sri'});txt('ขาตั้งมือถือ',540,920,80,P.butter,{f:'Sri'});txt('อยู่ในตะกร้าด้านล่าง',540,1040,60,'#fff',{f:'Sri'});ctx.restore();},
};
