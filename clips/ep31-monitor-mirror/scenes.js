// EP.31 มนุษย์ต่างดาวยืนข้างหลัง! — แนว UFO/มนุษย์ต่างดาวบุก (กระจกส่องหลังติดจอ)
OL = '#0d0a1f'; LW = 7;
const P = {night:'#120d2e',office:'#2a2550',ufo:'#9aa6c4',beam:'#b8ff6a',alien:'#8ee36b',alien2:'#5fbf44',skin:'#f0c39c',shirt:'#ff9f43',desk:'#7a5a8a',mirror:'#cfe9ff'};

function office(){bgFill(P.office);rr(80,380,360,300,10);fs('#0b0a20',6);for(let i=0;i<30;i++){circ(90+hash(i)*340,390+hash(i*2)*280,2);ctx.fillStyle='#fff';ctx.fill();}
  rr(820,520,180,780,8);fs('#3a3466',6);circ(970,920,12);fs('#c9a227',3);ctx.fillStyle='#1d1a3a';ctx.fillRect(-300,1300,W+600,800);rr(120,1100,840,40,8);fs(P.desk);}
function worker(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x+boil(1,1.2),y+boil(2,1.2)+(o.jump?-Math.abs(Math.sin(T*14))*30:0));ctx.scale(s,s);ctx.rotate(o.rot||0);
  rr(-120,120,240,280,70);fs(P.shirt);rr(-22,88,44,50,10);fs(P.skin);ell(0,0,86,96);fs(P.skin);ctx.beginPath();ctx.arc(0,-20,88,Math.PI*1.02,Math.PI*1.98);ctx.closePath();fs('#2a1a10');
  const e=o.shock?1.6:1;for(const ex of[-30,30]){ell(ex+(o.look||0)*6,2,12*e,14*e);fs('#fff',4);circ(ex+(o.look||0)*10,4,5);ctx.fillStyle=OL;ctx.fill();}
  if(o.shock){for(const sx of[-70,70]){line([sx,-100,sx*1.3,-150],6);}ell(0,52,22,30);fs('#7a1a2a',5);}else ell(0,50,12+m*6,3+m*14),fs('#9a3040',4);ctx.restore();}
function alien(x,y,s,o={}){const m=o.mouth||0;ctx.save();ctx.translate(x,y+Math.sin(T*2)*8);ctx.scale(s,s);ctx.globalAlpha=o.a??1;
  rr(-70,100,140,220,60);fs(P.alien2);line([-70,160,-140,240],18,OL);line([-70,160,-140,240],10,P.alien);line([70,160,140,120],18,OL);line([70,160,140,120],10,P.alien);
  ell(0,0,110,130);fs(P.alien);for(const sx of[-1,1]){line([sx*40,-120,sx*70,-200],6);circ(sx*70,-206,14);fs(P.beam,4);}
  for(const ex of[-44,44]){ell(ex,-10,38,52,ex>0?0.3:-0.3);fs('#0b0a20',4);ell(ex-8,-30,8,12);ctx.fillStyle='#fff';ctx.fill();}
  ell(0,70,12+m*6,3+m*10);fs('#2a4a1a',4);ctx.restore();}
function ufo(x,y,s,beam){ctx.save();ctx.translate(x,y+Math.sin(T*2)*10);ctx.scale(s,s);if(beam){ctx.save();ctx.globalAlpha=0.3;poly([-80,30,80,30,260,700,-260,700]);ctx.fillStyle=P.beam;ctx.fill();ctx.restore();}
  ell(0,0,260,60);fs(P.ufo);ell(0,-30,120,80);fs('#bfe9ffaa',6);for(let i=0;i<6;i++){circ(-200+i*80,10,12);ctx.fillStyle=Math.floor(T*6+i)%2?'#ffe066':'#ff6b6b';ctx.fill();}ctx.restore();}
function monitor(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-60,-10,120,20,6);fs('#333');rr(-14,-100,28,90,4);fs('#333');rr(-220,-360,440,270,14);fs('#1a1a2e');rr(-204,-344,408,238,6);fs('#4a6fd9',0);
  if(o.mirror){ctx.save();ctx.translate(-240,-330);rr(-70,-50,140,100,30);fs('#555',5);ell(0,0,60,40);fs(P.mirror,4);if(o.reflect){ctx.save();ell(0,0,58,38);ctx.clip();alien(0,30,0.25,{});ctx.restore();}ctx.restore();}ctx.restore();}
function hud(t,x,y,k,col=P.beam){if(k<=0)return;ctx.save();ctx.globalAlpha=Math.min(1,k*2);ctx.translate(x,y);rr(-300,-52,600,104,14);fs('#0d0a1fdd',4,col);txt(t,0,6,48,col,{f:'Bai',maxW:560});ctx.restore();}

const SCENES={
 focus(lt){office();monitor(560,1100,1);worker(560,900,0.9,{mouth:mouthFor('worker'),look:0});alien(860,860,0.9,{a:prog(lt,0.6,1.6)*0.9});},
 behind(lt){office();ufo(540,420,0.9,true);alien(540,900,1.3,{mouth:mouthFor('alien')});hud('ยืนดูมา 10 นาทีแล้ว...',540,1300,prog(lt,0.5,0.8));},
 jump(lt){office();monitor(560,1100,1);worker(560,880,0.95,{shock:1,jump:1,rot:-0.1});alien(880,860,0.8,{});txt('เฮ้ย!',300,600,120,'#ffe066',{f:'Bai',sw:12});},
 fact(lt){bgFill(P.night);ctx.save();ctx.translate(540,920);rr(-360,-300,720,600,10);fs('#2a2550',6);rr(160,-300,200,600,4);fs('#3a3466',6);txt('ประตู',260,-330,40,'#fff',{f:'Bai'});
  rr(-280,40,260,40,6);fs(P.desk);circ(-150,-40,60);fs(P.skin,5);rr(-200,10,100,140,30);fs(P.shirt,5);line([-60,-40,140,-40],6,'#ff6b6b');poly([140,-56,140,-24,170,-40]);fs('#ff6b6b',0);ctx.restore();
  hud('หันหลังให้ประตู = มองไม่เห็นคนเข้ามา',540,1300,prog(lt,0.3,0.6));},
 why(lt,ln){bgFill('#0b0a20');ctx.save();ctx.translate(540,880);ell(0,0,300,240);fs('#ffb3c6',6);for(let i=0;i<6;i++)curve([-260+i*90,-180,-240+i*90,-40,-280+i*90,60,-250+i*90,180],6,'#e07a9a');
  const p=0.5+0.5*Math.sin(T*8);ctx.save();ctx.globalAlpha=p;circ(180,-60,60);ctx.fillStyle='#ff3b30';ctx.fill();ctx.restore();txt('!',180,-50,90,'#fff',{f:'Bai'});ctx.restore();
  hud('สมองระแวงสิ่งที่มองไม่เห็นข้างหลัง',540,1240,prog(lt,0.3,0.6));hud('→ โฟกัสงานได้ไม่เต็มที่',540,1370,prog(lt,ln.dur*0.55,ln.dur*0.75),'#ffb3c6');},
 mirror(lt){office();const k=E.back(prog(lt,0.2,0.6));monitor(560,1100,1,{mirror:k>0.5,reflect:lt>1.0});alien(900,860,0.7,{a:0.9});
  ctx.save();ctx.strokeStyle=P.beam;ctx.lineWidth=5;ctx.setLineDash([16,12]);line([320,770,900,800],5,P.beam);ctx.setLineDash([]);ctx.restore();hud('กระจกส่องหลังติดจอ',540,520,prog(lt,0.2,0.5));},
 tip(lt){bgFill(P.night);ctx.save();ctx.translate(540,900);rr(-360,-300,720,600,10);fs('#2a2550',6);rr(160,-300,200,600,4);fs('#3a3466',6);
  monitor(-120,180,0.6,{mirror:1});ctx.save();ctx.strokeStyle=P.beam;ctx.setLineDash([14,10]);line([-260,-20,240,-200],5,P.beam);ctx.setLineDash([]);ctx.restore();ctx.restore();
  hud('ติดมุมจอฝั่งที่หันไปทางประตู',540,1300,prog(lt,0.2,0.5));},
 bonus(lt){bgFill(P.night);ctx.save();ctx.translate(540,920);rr(-360,-300,720,600,10);fs('#2a2550',6);rr(-360,-300,200,600,4);fs('#3a3466',6);txt('ประตู',-260,-330,40,'#fff',{f:'Bai'});
  rr(60,40,260,40,6);fs(P.desk);circ(190,-40,60);fs(P.skin,5);rr(140,10,100,140,30);fs(P.shirt,5);line([130,-40,-140,-40],6,'#2fbf71');poly([-140,-56,-140,-24,-170,-40]);fs('#2fbf71',0);ctx.restore();
  hud('ดีที่สุด: หันหน้าเข้าหาประตู',540,1300,prog(lt,0.2,0.5),'#7dff9a');},
 small(lt){office();const k=E.back(prog(lt,0.1,0.5));ctx.save();ctx.translate(540,880);ctx.scale(k*2.2,k*2.2);rr(-70,-50,140,100,30);fs('#555',5);ell(0,0,60,40);fs(P.mirror,4);ctx.restore();
  alien(860,1150,0.6,{mouth:mouthFor('alien')});hud('ชิ้นเล็ก · แปะง่าย · หลักสิบ',540,1300,prog(lt,0.4,0.7));},
 cta(lt){bgFill(P.night);for(let i=0;i<40;i++){circ(hash(i)*W,hash(i*2)*H,2);ctx.fillStyle='#fff';ctx.fill();}ufo(540,520,0.8,true);
  const b=E.back(prog(lt,0.2,0.6));ctx.save();ctx.translate(540,lerp(600,1050,b));ctx.scale(b,b);ctx.beginPath();ctx.arc(0,-50,74,Math.PI,0);ctx.lineWidth=24;ctx.strokeStyle=OL;ctx.stroke();ctx.lineWidth=12;ctx.strokeStyle=P.beam;ctx.stroke();
  poly([-140,-50,140,-50,108,96,-108,96]);fs('#ff8a1f');for(let i=-2;i<=2;i++)line([i*48,-34,i*38,82],6,'#b35500');poly([-140,-50,140,-50,108,96,-108,96]);fs(null);ctx.restore();hud('ลงจอดที่ตะกร้าด้านล่าง',540,1300,prog(lt,0.4,0.7));},
};

window.EP={font:'Bai',scenes:SCENES,
  camera(name,lt,ln){let s=1+0.05*prog(lt,0,ln.dur);if(name==='jump')ctx.translate(Math.sin(T*40)*6,0);ctx.translate(540,960);ctx.scale(s,s);ctx.translate(-540,-960);},
  sub:{f:'Bai',size:56,col:'#e9ffe0',hl:'#b8ff6a',sw:0,box:'#0d0a1fe6',boxLine:4,boxLineCol:'#b8ff6a',boxR:40,boxPad:28,pop:'back',y:1600,lh:1.4},
  intro(t){bgFill(P.night);ufo(540,lerp(-200,700,E.out(prog(t,0,1.0))),1.1,t>0.9);},
  overlay(){ctx.save();ctx.translate(540,195);rr(-450,-88,900,176,88);fs('#0d0a1fdd',5,P.beam);txt(TL.title,0,-6,66,P.beam,{f:'Bai',maxW:840});txt('👽 '+TL.series,0,56,32,'#fff',{f:'Bai'});ctx.restore();},
  outroGap:0.55,
  outro(k){ctx.save();ctx.globalAlpha=E.inOut(k);bgFill(P.beam);ctx.restore();},
  endCard(k){bgFill(P.night);ctx.save();ctx.globalAlpha=k;ufo(540,560,0.7,false);txt('ภารกิจยุติ',540,800,96,P.beam,{f:'Bai'});txt('กระจกส่องหลังติดจอ',540,950,70,'#fff',{f:'Bai'});txt('อยู่ในตะกร้าด้านล่าง',540,1050,56,P.beam,{f:'Bai'});ctx.restore();},
};
