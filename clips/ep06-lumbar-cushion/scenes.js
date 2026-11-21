// EP.6 ด่านปวดหลัง — แนวเกมพิกเซล 8 บิต (เบาะรองหลัง)
// วาดบนผืนเล็ก 180x320 แล้วขยาย 6 เท่าแบบไม่เบลอ = พิกเซลแท้
OL = '#000000'; LW = 6;
const pc = document.createElement('canvas'); pc.width = 180; pc.height = 320; const p = pc.getContext('2d');
const PAL = {'.':null,H:'#6b3a1e',S:'#f5c08b',E:'#111111',M:'#c0392b',R:'#e74c3c',B:'#2e5fd6',K:'#3b2a1a',W:'#ffffff',
  G:'#3cb043',g:'#2a7d2e',Y:'#ffd23f',O:'#ff8a1f',N:'#2b3a8c',n:'#4a5fd0',P:'#7b2cbf',p:'#5a189a',D:'#222222',C:'#8a8a8a',c:'#bdbdbd',L:'#9be564',X:'#ff5c5c'};
const SPR = {
 hero:["..HHHHHH..",".HHHHHHHH.",".HSSSSSSH.",".SSESSESS.",".SSSSSSSS.","..SSMMSS..","...SSSS...",".RRRRRRRR.","RRRRRRRRRR","SRRRRRRRRS","..RRRRRR..","..BB..BB..","..BB..BB..",".KKK..KKK."],
 heroJump:["..HHHHHH..",".HHHHHHHH.",".HSSSSSSH.",".SSESSESS.",".SSSSSSSS.","..SSMMSS..","S..SSSS..S","SRRRRRRRRS",".RRRRRRRR.","..RRRRRR..","..RRRRRR..",".BB....BB.","KK......KK"],
 sitBad:["....HHHH....","...HHHHHH...","...HSSSSH...","....SSESS...","....SSSSS...","..RRRSSS....",".RRRRRR.....","RRRRRRRSSS..","RRRRRR...S..","RRRRRBBBBBB.","RRRRBBBBBBB.","........BB..","........BB..","........KKK."],
 sitGood:["...HHHH.....","..HHHHHH....","..HSSSSH....","..SSESSS....","..SSSSSS....","...SSSS.....","..RRRRRR....","..RRRRRRSSS.","..RRRRR...S.","..RRRRBBBBBB","..RRRBBBBBBB","........BB..","........BB..","........KKK."],
 coin:[".YYY.","YYWYY","YYWYY","YYWYY",".YYY."],
 heart:[".XX.XX.","XXXXXXX","XXXXXXX",".XXXXX.","..XXX..","...X..."],
 heartE:[".DD.DD.","D..D..D","D.....D",".D...D.","..D.D..","...D..."],
 cloud:["...WWW......","..WWWWW.WW..",".WWWWWWWWWW.","WWWWWWWWWWWW"],
 chest:["KKKKKKKKKK","KOOOOOOOOK","KOOOYYOOOK","KKKKYYKKKK","KOOOOOOOOK","KOOOOOOOOK","KKKKKKKKKK"],
 cushion:["..NNNNNNNN..",".NnnnnnnnnN.","NnnnnnnnnnnN","NnnnnnnnnnnN","NnnnnnnnnnnN",".NNNNNNNNNN."],
 basket:["....YYYY....","...Y....Y...","..Y......Y..","OOOOOOOOOOOO",".OKOKOKOKOO.",".OOOOOOOOOO.","..OKOKOKOO..","..OOOOOOOO.."],
 arrow:["..YYY..","..YYY..","..YYY..","YYYYYYY",".YYYYY.","..YYY..","...Y..."],
};
function r(x,y,w,h,c){p.fillStyle=c;p.fillRect(Math.round(x),Math.round(y),w,h);}
function spr(name,x,y,sc=1,flip=false){const s=SPR[name];for(let j=0;j<s.length;j++)for(let i=0;i<s[j].length;i++){const c=PAL[s[j][i]];if(!c)continue;
  const ii=flip?s[j].length-1-i:i;p.fillStyle=c;p.fillRect(Math.round(x+ii*sc),Math.round(y+j*sc),sc,sc);}}
function pbegin(bg){p.setTransform(1,0,0,1,0,0);p.fillStyle=bg;p.fillRect(0,0,180,320);}
function pend(){ctx.imageSmoothingEnabled=false;ctx.drawImage(pc,0,0,W,H);ctx.imageSmoothingEnabled=true;}
function ground(y,col='#c8743a'){for(let x=0;x<180;x+=10){r(x,y,10,8,col);r(x,y,10,1,'#f0a868');r(x+9,y,1,8,'#7a3e14');r(x,y+8,10,40,'#a85a26');}}
function sky(){pbegin('#5c94fc');spr('cloud',20+((T*6)%200)-40,70,2);spr('cloud',110-((T*4)%200)+40,100,2);}
function hearts(n){for(let i=0;i<5;i++)spr(i<n?'heart':'heartE',8+i*9,58,1);}
function pixText(s,x,y,size,col,o={}){txt(s,x+6,y+6,size,'#000',{f:'Kod',...o});txt(s,x,y,size,col,{f:'Kod',...o});}
function box(x,y,w,h){rr(x,y,w,h,0);fs('#1b1b5e',8,'#ffffff');}
function chair(x,y,sc,angry){ // บอสเก้าอี้
  r(x+4*sc,y,14*sc,18*sc,'#222');r(x+5*sc,y+sc,12*sc,16*sc,'#3d3d3d');r(x+2*sc,y+18*sc,20*sc,4*sc,'#222');r(x+10*sc,y+22*sc,4*sc,8*sc,'#555');
  r(x+2*sc,y+30*sc,20*sc,2*sc,'#555');r(x+2*sc,y+32*sc,3*sc,3*sc,'#111');r(x+19*sc,y+32*sc,3*sc,3*sc,'#111');
  if(angry){r(x+7*sc,y+5*sc,3*sc,3*sc,'#fff');r(x+13*sc,y+5*sc,3*sc,3*sc,'#fff');r(x+8*sc,y+6*sc,sc,sc,'#f00');r(x+14*sc,y+6*sc,sc,sc,'#f00');
    r(x+6*sc,y+4*sc,4*sc,sc,'#000');r(x+13*sc,y+4*sc,4*sc,sc,'#000');r(x+8*sc,y+11*sc,7*sc,sc,'#000');}}
function inset(good){r(98,88,74,116,'#ffffff');r(100,90,70,112,good?'#0b3d2e':'#2a0b0b');
  for(let i=0;i<=24;i++){const u=i/24;const off=good?Math.sin(u*Math.PI*1.7+0.3)*9:-(u*u)*22+u*6;
    r(130+off,100+u*90,9,3,good?'#9be564':(Math.floor(T*6)%2?'#ff5c5c':'#ffaaaa'));}
  r(118,170,40,3,good?'#9be564':'#ff5c5c');}
function spine(x,y,good,k=1){const pts=[];for(let i=0;i<=14;i++){const u=i/14;const off=good?Math.sin(u*Math.PI*1.6+0.6)*4:-u*u*9+u*2;pts.push([x+off,y+u*44]);}
  for(const[sx,sy]of pts)r(sx,sy,3,2,good?'#9be564':(Math.floor(T*6)%2?'#ff5c5c':'#ffaaaa'));}

const SCENES={
 title(lt){sky();ground(250);spr('hero',80,222,2);
  for(let i=0;i<4;i++)r(30+i*30,150,10,10,'#c8743a'),r(31+i*30,151,8,8,'#f0a868');r(60,150,10,10,'#ffd23f');
  pend();
  pixText('WORLD 1-1',540,640,110,'#fff');pixText('ด่านปวดหลัง',540,800,110,'#ffd23f');
  if(Math.floor(T*2.5)%2)pixText('PRESS START',540,1050,56,'#fff');},
 boss(lt){pbegin('#1a0b2e');for(let i=0;i<18;i++)r(i*10,200-((i*37)%40),8,120,'#2d1650');ground(250,'#5a189a');
  const sh=Math.floor(T*10)%2;chair(95,145+sh,3,true);spr('hero',25,222,2);
  pend();
  rr(140,430,800,70,0);fs('#000',6,'#fff');rr(150,440,780,50,0);fs('#e63946',0);pixText('BOSS: เก้าอี้ทำงาน',540,560,64,'#fff');
  if(lt>0.2){pixText('!',300,1180,140,'#ffd23f');}},
 hit(lt,ln){pbegin('#0b1e3f');ground(260,'#3a3a5a');
  chair(10,190,2,false);spr('sitBad',22,215,3);inset(false);
  const hp=5-[0.5,1.4,2.3].filter(s=>lt>s).length;hearts(hp);
  pend();
  [0.5,1.4,2.3].forEach(s=>{if(lt>s&&lt<s+0.8){const k=(lt-s)/0.8;pixText('-1',720,900-k*200,90,'#ff5c5c');}});
  box(90,410,900,120);pixText('หลังค่อม = แรงกดเพิ่ม',540,472,58,'#ffd23f');
  if(lt<2.5&&Math.floor(T*8)%2){ctx.fillStyle='rgba(255,0,0,0.12)';ctx.fillRect(0,0,W,H);}},
 info(lt){pbegin('#203a43');for(let y=0;y<320;y+=8)r(0,y,180,1,'#2c5364');
  const k=prog(lt,0.2,1.2);
  for(let i=0;i<=30;i++){const u=i/30,off=Math.sin(u*Math.PI*1.7+0.3)*14;r(84+off,110+u*150,14,4,u>0.62?'#9be564':'#c0d6df');}
  pend();
  box(80,420,920,170);pixText('TIPS',190,470,50,'#ffd23f',{align:'left'});pixText('หลังส่วนล่างมีส่วนโค้ง',540,535,58,'#fff');
  ctx.save();ctx.globalAlpha=k;rr(640,1250,360,90,0);fs('#2a7d2e',6,'#fff');pixText('ส่วนโค้งเว้า',820,1298,52,'#fff');line([640,1295,600,1295],8,'#9be564');ctx.restore();},
 item(lt){sky();ground(250);
  const op=prog(lt,0.2,0.5);spr('chest',75,229,3);if(op>0)r(75,226-op*10,30,4,'#7a3e14');
  const up=E.out(prog(lt,0.4,1.1));spr('cushion',72,215-up*70,3);
  if(up>0)for(let i=0;i<8;i++){const a=T*4+i;r(90+Math.cos(a)*30,160-up*20+Math.sin(a)*18,3,3,'#fff');}
  spr('hero',20,222,2);
  pend();
  if(up>0.5){pixText('ITEM GET!',540,560,110,'#ffd23f');pixText('เบาะรองหลัง',540,720,80,'#fff');}},
 powerup(lt){pbegin('#0b3d2e');ground(260,'#2a7d2e');
  chair(10,190,2,false);spr('sitGood',18,215,3);spr('cushion',14,233,1.5);inset(true);
  const hp=2+Math.min(3,Math.floor(prog(lt,0.3,1.6)*3.99));hearts(hp);
  if(Math.floor(T*10)%3===0)for(let i=0;i<8;i++)r(60+hash(i+Math.floor(T*10))*60,150+hash(i*3+Math.floor(T*10))*100,2,2,'#ffd23f');
  pend();
  box(90,410,900,120);pixText('ท่านั่ง',260,472,58,'#fff');
  const st=Math.min(5,1+Math.floor(prog(lt,0.3,1.8)*5));pixText('★'.repeat(st)+'☆'.repeat(5-st),660,472,58,'#ffd23f');},
 win(lt){sky();ground(250);
  r(150,120,2,130,'#ddd');r(132,120+Math.min(100,lt*80),18,12,'#3cb043');
  const j=Math.abs(Math.sin(T*6))*30;spr('heroJump',60,224-j,2);
  for(let i=0;i<5;i++){const cy=150+Math.sin(T*5+i)*6;spr('coin',20+i*28,cy,1);}
  pend();
  pixText('STAGE CLEAR!',540,600,100,'#fff');
  box(170,730,740,120);pixText('ราคาไม่แพง',540,792,64,'#ffd23f');},
 cta(lt){pbegin('#3a0ca3');for(let i=0;i<20;i++)r(hash(i)*180,hash(i*2)*320,2,2,'#ffffff55');
  spr('basket',66,150,4);const ay=Math.floor(T*4)%2*4;spr('arrow',76,205+ay,4);
  pend();
  pixText('SHOP',540,620,110,'#ffd23f');pixText('รับไอเท็มที่',540,1420,70,'#fff');pixText('ตะกร้าด้านล่าง',540,1510,70,'#ffd23f');},
};

window.EP={font:'Kod',scenes:SCENES,
  camera(){},
  sub:{f:'Kod',size:54,col:'#ffffff',hl:'#ffd23f',sw:0,box:'#1b1b5e',boxLine:8,boxLineCol:'#ffffff',boxR:0,boxPad:32,pop:'type',y:1640,lh:1.4},
  intro(t){SCENES.title(t);},
  overlay(t){ctx.fillStyle='#000000aa';ctx.fillRect(0,90,W,120);
    txt('SCORE 002099',40,125,36,'#fff',{f:'Kod',align:'left'});txt('COIN ×'+String(Math.floor(T*2)).padStart(2,'0'),540,125,36,'#fff',{f:'Kod'});
    txt('TIME '+Math.max(0,300-Math.floor(T*4)),1040,125,36,'#fff',{f:'Kod',align:'right'});
    txt(TL.series,540,178,36,'#ffd23f',{f:'Kod'});},
  post(){ctx.fillStyle='rgba(0,0,0,0.12)';for(let y=0;y<H;y+=6)ctx.fillRect(0,y,W,2);},
  outroGap:0.5,
  outro(k){const n=12,s=W/n;ctx.fillStyle='#000';for(let i=0;i<n;i++)for(let j=0;j<Math.ceil(H/s);j++){if(hash(i*31+j*7)<k*1.2)ctx.fillRect(i*s,j*s,s+1,s+1);}},
  endCard(k){bgFill('#000');ctx.save();ctx.globalAlpha=k;pixText('GAME CLEAR',540,780,110,'#fff');
    pixText('เบาะรองหลัง',540,960,80,'#ffd23f');pixText('อยู่ในตะกร้าด้านล่าง',540,1060,60,'#fff');ctx.restore();},
};
