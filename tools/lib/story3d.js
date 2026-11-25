// เครื่องเล่าเรื่องแบบ 3 มิติ: ใช้ script.json เดิม แปลงตำแหน่ง 2 มิติ (x,y,s) -> โลก 3 มิติอัตโนมัติ
// ฉาก + ตัวละคร + ของหลัก = โมเดล 3 มิติ / ของเฉพาะตอน = ป้ายภาพ (วาดจากโค้ด 2 มิติเดิม) ตั้งในฉาก
const S3 = (() => {
  const T3 = window.THREE, { mat, INK, canvasTex, geo, shadowy } = R3;
  const FOV = 32, BASE = { pos: new T3.Vector3(0, 7, 24), look: new T3.Vector3(0, 3.2, 0) }, WALLZ = -6;
  let renderer, glc, baseCam, rc = new T3.Raycaster();
  function init() {
    glc = document.createElement('canvas'); glc.width = W; glc.height = H;
    renderer = new T3.WebGLRenderer({ canvas: glc, antialias: true, preserveDrawingBuffer: true, alpha: false });
    renderer.setPixelRatio(1); renderer.setSize(W, H, false);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T3.PCFSoftShadowMap;
    renderer.toneMapping = T3.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; renderer.outputColorSpace = T3.SRGBColorSpace;
    baseCam = new T3.PerspectiveCamera(FOV, W / H, 0.1, 400); baseCam.position.copy(BASE.pos); baseCam.lookAt(BASE.look); baseCam.updateMatrixWorld();
  }
  const fwd = () => new T3.Vector3(0, 0, -1).applyQuaternion(baseCam.quaternion);
  const ppu = (P) => (H / 2) / (Math.tan(FOV / 2 * Math.PI / 180) * Math.max(0.5, P.clone().sub(BASE.pos).dot(fwd())));
  const ray = (x, y) => { rc.setFromCamera(new T3.Vector2(x / W * 2 - 1, -(y / H * 2 - 1)), baseCam); return rc; };
  const onPlane = (x, y, plane) => { const p = new T3.Vector3(); return ray(x, y).ray.intersectPlane(plane, p) ? p : null; };
  const FLOOR = new T3.Plane(new T3.Vector3(0, 1, 0), 0), WALL = new T3.Plane(new T3.Vector3(0, 0, 1), -WALLZ + 0.2), MID = (z) => new T3.Plane(new T3.Vector3(0, 0, 1), -z);
  const wallPt = (x, y, z = WALLZ + 0.25) => onPlane(x, y, MID(z));

  // ---------- พื้นผิว ----------
  const TX = {};
  const tex = (k, w, h, f, rep) => { if (!TX[k]) { TX[k] = canvasTex(w, h, f); if (rep) { TX[k].wrapS = TX[k].wrapT = T3.RepeatWrapping; TX[k].repeat.set(rep[0], rep[1]); } } return TX[k]; };
  const shade = (c, k) => { const n = parseInt(c.slice(1), 16); let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; r = Math.max(0, Math.min(255, r * k)) | 0; g = Math.max(0, Math.min(255, g * k)) | 0; b = Math.max(0, Math.min(255, b * k)) | 0; return `rgb(${r},${g},${b})`; };
  const woodTex = (c = '#c99a6b') => tex('wood' + c, 1024, 1024, (x, w, h) => { x.fillStyle = c; x.fillRect(0, 0, w, h); for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? 'rgba(90,50,20,0.10)' : 'rgba(255,230,190,0.08)'; x.fillRect(0, i * 64, w, 62); x.fillStyle = 'rgba(60,30,10,0.35)'; x.fillRect(0, i * 64 + 62, w, 2); x.fillRect((i * 397) % 1024, i * 64, 2, 64); x.fillRect((i * 613 + 500) % 1024, i * 64, 2, 64); } }, [4, 4]);
  const tileTex = (c = '#dfe3ea', a = '#c5cad3') => tex('tile' + c, 512, 512, (x, w, h) => { x.fillStyle = c; x.fillRect(0, 0, w, h); x.strokeStyle = a; x.lineWidth = 6; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); } }, [8, 8]);
  const carpetTex = (c) => tex('carpet' + c, 256, 256, (x, w, h) => { x.fillStyle = c; x.fillRect(0, 0, w, h); for (let i = 0; i < 2500; i++) { x.fillStyle = `rgba(${hash(i) > 0.5 ? '255,255,255' : '0,0,0'},0.05)`; x.fillRect(hash(i * 3) * w, hash(i * 7) * h, 2, 2); } }, [10, 10]);
  const wallTex = (c, kind) => tex('wall' + c + kind, 512, 512, (x, w, h) => { x.fillStyle = c; x.fillRect(0, 0, w, h);
    if (kind === 'stripe') for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(0,0,0,0.035)'; x.fillRect(i * 64, 0, 32, h); }
    if (kind === 'brick') { x.fillStyle = 'rgba(0,0,0,0.06)'; for (let r = 0; r < 16; r++) for (let i = 0; i < 9; i++) x.fillRect(i * 64 - (r % 2) * 32, r * 32, 60, 28); }
    if (kind === 'dots') for (let i = 0; i < 120; i++) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.arc((i % 12) * 44 + (Math.floor(i / 12) % 2) * 22, Math.floor(i / 12) * 52, 6, 0, 7); x.fill(); } }, [6, 3]);
  const skyTex = (a, b, stars, sun) => tex('sky' + a + b + stars + sun, 512, 1024, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, 0, w, h);
    if (stars) for (let i = 0; i < stars; i++) { x.fillStyle = `rgba(255,255,255,${0.4 + hash(i * 3) * 0.6})`; x.beginPath(); x.arc(hash(i) * w, hash(i * 2.3) * h * 0.8, 0.8 + hash(i * 5) * 1.8, 0, 7); x.fill(); } });
  const cityTex = (night) => tex('city' + night, 1024, 512, (x, w, h) => { x.fillStyle = night ? '#141a44' : '#a8d4ff'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) { const bh = 150 + hash(i * 7) * 300, bx = i * 40 - 10; x.fillStyle = night ? ['#1d2450', '#232b5c', '#18204a'][i % 3] : ['#8fb3d1', '#a3c2dc', '#7ea3c4'][i % 3]; x.fillRect(bx, h - bh, 38, bh);
      for (let r = 0; r < bh / 24; r++) for (let c = 0; c < 2; c++) if (!night || hash(i * 11 + r * 3 + c) > 0.55) { x.fillStyle = night ? '#ffd87a' : 'rgba(255,255,255,0.35)'; x.fillRect(bx + 6 + c * 16, h - bh + 8 + r * 24, 10, 12); } } });

  // ---------- ของประกอบฉากในห้อง ----------
  const box = (w, h, d, c, o) => new T3.Mesh(new T3.BoxGeometry(w, h, d), typeof c === 'string' ? mat(c, o || { roughness: 0.6 }) : c);
  const rbox = (w, h, d, r, c, o) => { const s = new T3.Shape(); const x = -w / 2, y = -h / 2; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const g = new T3.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: Math.min(0.06, d / 4), bevelSize: Math.min(0.06, r / 2), bevelSegments: 3, curveSegments: 8 }); g.translate(0, 0, -d / 2); return new T3.Mesh(g, typeof c === 'string' ? mat(c, o) : c); };
  const cyl = (rt, rb, h, c, o, seg = 32) => new T3.Mesh(new T3.CylinderGeometry(rt, rb, h, seg), mat(c, o));
  const sph = (r, c, o) => new T3.Mesh(geo('sph' + r, () => new T3.SphereGeometry(r, 32, 20)), mat(c, o));
  const textTex = (t, bg, fg, w = 512, h = 320, size = 90) => canvasTex(w, h, (x) => { x.fillStyle = bg; x.fillRect(0, 0, w, h); if (t) { x.font = `800 ${size}px K`; let s = size; while (x.measureText(t).width > w * 0.88 && s > 20) { s -= 4; x.font = `800 ${s}px K`; } x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = fg; x.fillText(t, w / 2, h / 2 + 4); } });
  const glowPlane = (w, h, t) => new T3.Mesh(new T3.PlaneGeometry(w, h), new T3.MeshBasicMaterial({ map: t, toneMapped: false }));

  function frameOnWall(g, x, y, w, h, inner, frameCol = '#2b2b2b') { // หน้าต่าง/รูปบนผนัง ตามพิกัด 2 มิติ
    const a = wallPt(x, y), b = wallPt(x + w, y + h); if (!a || !b) return; const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2, ww = Math.abs(b.x - a.x), hh = Math.abs(a.y - b.y);
    const gl = glowPlane(ww, hh, inner); gl.position.set(cx, cy, WALLZ + 0.22); g.add(gl); const fm = mat(frameCol, { roughness: 0.4 });
    for (const [fw, fh, fx, fy] of [[ww + 0.35, 0.22, cx, cy + hh / 2], [ww + 0.35, 0.22, cx, cy - hh / 2], [0.22, hh, cx - ww / 2, cy], [0.22, hh, cx + ww / 2, cy]]) { const f = box(fw, fh, 0.25, fm); f.position.set(fx, fy, WALLZ + 0.3); f.castShadow = true; g.add(f); }
    return { cx, cy, ww, hh };
  }
  function room(g, o) { // พื้น + ผนัง + บัว
    const fl = new T3.Mesh(new T3.PlaneGeometry(80, 60), new T3.MeshStandardMaterial({ map: o.floorMap, color: o.floorMap ? '#fff' : o.floor, roughness: o.floorRough ?? 0.4 })); fl.rotation.x = -Math.PI / 2; fl.position.z = 10; fl.receiveShadow = true; fl.userData.support = 'floor'; g.add(fl);
    const wl = new T3.Mesh(new T3.PlaneGeometry(80, 40), new T3.MeshStandardMaterial({ map: o.wallMap, color: o.wallMap ? '#fff' : o.wall, roughness: 0.9 })); wl.position.set(0, 20, WALLZ); wl.receiveShadow = true; wl.userData.support = 'wall'; g.add(wl);
    const bb = box(80, 0.45, 0.2, o.base || '#8a5a3c'); bb.position.set(0, 0.22, WALLZ + 0.1); g.add(bb);
    if (o.side !== false) for (const sd of [-1, 1]) { const s = new T3.Mesh(new T3.PlaneGeometry(40, 40), new T3.MeshStandardMaterial({ color: shade(o.wall || '#eee', 0.86), roughness: 0.9 })); s.position.set(sd * 13, 20, 14); s.rotation.y = -sd * Math.PI / 2; s.receiveShadow = true; g.add(s); }
  }
  function sunburst(g, a, b) { // ฉากสตูดิโอ: โค้งต่อเนื่อง + ลายรัศมีหมุนช้า ๆ
    const t = canvasTex(1024, 1024, (x, w, h) => { x.fillStyle = a; x.fillRect(0, 0, w, h); x.fillStyle = b; for (let i = 0; i < 18; i++) { const an = i / 18 * Math.PI * 2; x.beginPath(); x.moveTo(w / 2, h / 2); x.arc(w / 2, h / 2, w, an, an + Math.PI / 18); x.fill(); }
      const r = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,0.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = r; x.fillRect(0, 0, w, h); });
    const disc = new T3.Mesh(new T3.CircleGeometry(40, 72), new T3.MeshBasicMaterial({ map: t, toneMapped: false })); disc.position.set(0, 3, -12); g.add(disc); g.userData.spin = disc;
    const fl = new T3.Mesh(new T3.PlaneGeometry(90, 52), new T3.MeshStandardMaterial({ color: b, roughness: 0.55 })); fl.rotation.x = -Math.PI / 2; fl.position.z = 14; fl.receiveShadow = true; fl.userData.support = 'floor'; g.add(fl);
    const wl = new T3.Mesh(new T3.PlaneGeometry(90, 60), new T3.MeshBasicMaterial({ visible: false })); wl.position.set(0, 20, WALLZ); wl.userData.support = 'wall'; g.add(wl);
    const lip = new T3.Mesh(new T3.PlaneGeometry(90, 3), new T3.MeshBasicMaterial({ map: canvasTex(4, 64, (x, w, h) => { const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, b); x.fillStyle = gr; x.fillRect(0, 0, w, h); }), transparent: true, toneMapped: false })); lip.position.set(0, 1.4, -11.9); g.add(lip);
  }
  const skyDome = (g, t) => { const s = new T3.Mesh(new T3.SphereGeometry(180, 32, 16), new T3.MeshBasicMaterial({ map: t, side: T3.BackSide, toneMapped: false })); g.add(s); };
  const tree3 = (g, x, z, s = 1, col = '#5cb85c') => { const t = new T3.Group(); const tr = cyl(0.25, 0.35, 2.4, '#7a4a2a'); tr.position.y = 1.2; t.add(tr); for (const [a, b, c, r] of [[0, 3.6, 0, 1.6], [-1, 3, 0.3, 1.2], [1, 3.1, -0.2, 1.25], [0.3, 4.6, 0.2, 1.1]]) { const l = sph(r, col, { roughness: 0.6, clearcoat: 0.2 }); l.position.set(a, b, c); t.add(l); } t.position.set(x, 0, z); t.scale.setScalar(s); g.add(shadowy(t)); };
  const ground = (g, c, map) => { const fl = new T3.Mesh(new T3.PlaneGeometry(400, 400), new T3.MeshStandardMaterial({ color: map ? '#fff' : c, map, roughness: 0.9 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; fl.userData.support = 'floor'; g.add(fl); return fl; };
  const skyline3 = (g, night, z0 = -30) => { for (let i = 0; i < 30; i++) { const h = 8 + hash(i * 3.3) * 22, w = 4 + hash(i * 1.7) * 4, x = -60 + i * 4.2; const t = tex('bld' + night + (i % 4), 128, 256, (c, ww, hh) => { c.fillStyle = night ? ['#1d2450', '#232b5c', '#2a2f5e', '#18204a'][i % 4] : ['#9fbfdc', '#b5cde3', '#8fb0cf', '#c3d6e8'][i % 4]; c.fillRect(0, 0, ww, hh); for (let r = 0; r < 20; r++) for (let k = 0; k < 4; k++) if (!night || hash(i * 31 + r * 7 + k) > 0.5) { c.fillStyle = night ? '#ffd87a' : 'rgba(255,255,255,0.45)'; c.fillRect(10 + k * 30, 8 + r * 12.4, 16, 7); } });
    const b = new T3.Mesh(new T3.BoxGeometry(w, h, 4), new T3.MeshStandardMaterial({ map: t, emissive: night ? '#ffffff' : '#000', emissiveMap: night ? t : null, emissiveIntensity: night ? 0.6 : 0, roughness: 0.8 })); b.position.set(x, h / 2, z0 - hash(i * 9) * 14); g.add(b); } };
  const pendant = (g, x, y, z, col = '#ffd66b') => { const c = cyl(0.02, 0.02, 3, '#333'); c.position.set(x, y + 1.5, z); g.add(c); const sh = new T3.Mesh(new T3.ConeGeometry(0.6, 0.6, 24, 1, true), mat(col, { side: T3.DoubleSide })); sh.position.set(x, y, z); g.add(sh); const b = sph(0.2, '#fff6c0', { emissive: '#ffe9a0', emissiveIntensity: 2 }); b.position.set(x, y - 0.25, z); g.add(b); const l = new T3.PointLight('#ffd9a0', 18, 9); l.position.set(x, y - 0.5, z); g.add(l); };
  const shelf = (g, x, y, n = 4, cols = ['#ff6b6b', '#3ec1d3', '#ffd23f', '#7bd389', '#7b5cff']) => { const p = wallPt(x, y); if (!p) return; const s = box(3.6, 0.14, 0.7, '#8b5a3c', { roughness: 0.5 }); s.position.set(p.x, p.y, WALLZ + 0.4); s.castShadow = true; g.add(s); for (let i = 0; i < n; i++) { const b = rbox(0.45, 0.8 + hash(i + x) * 0.4, 0.4, 0.08, cols[(i + Math.round(x)) % cols.length], { clearcoat: 0.6 }); b.position.set(p.x - 1.3 + i * 0.85, p.y + 0.5, WALLZ + 0.4); b.castShadow = true; g.add(b); } };
  const picture = (g, x, y, w, h, c) => frameOnWall(g, x, y, w, h, tex('pic' + c, 256, 256, (k, ww, hh) => { k.fillStyle = c; k.fillRect(0, 0, ww, hh); k.fillStyle = 'rgba(255,255,255,0.5)'; k.beginPath(); k.arc(ww * 0.35, hh * 0.4, 40, 0, 7); k.fill(); k.fillStyle = 'rgba(0,0,0,0.15)'; k.beginPath(); k.moveTo(0, hh); k.lineTo(ww * 0.4, hh * 0.5); k.lineTo(ww * 0.7, hh * 0.75); k.lineTo(ww, hh * 0.45); k.lineTo(ww, hh); k.fill(); }), '#f4f4f4');
  const wallClock = (g, x, y) => { const p = wallPt(x, y); if (!p) return; const c = cyl(0.75, 0.75, 0.15, '#ffffff', { clearcoat: 1 }); c.rotation.x = Math.PI / 2; c.position.set(p.x, p.y, WALLZ + 0.3); g.add(c); const rim = new T3.Mesh(new T3.TorusGeometry(0.75, 0.07, 8, 32), INK()); rim.position.copy(c.position); rim.position.z += 0.06; g.add(rim);
    const h1 = R3.stick(0.35, 0.04); h1.position.set(p.x + 0.12, p.y + 0.1, WALLZ + 0.42); h1.rotation.z = -0.9; g.add(h1); const h2 = R3.stick(0.5, 0.03); h2.position.set(p.x - 0.05, p.y + 0.24, WALLZ + 0.43); h2.rotation.z = 0.25; g.add(h2); };

  const LIGHT = {
    day: { hemi: ['#fff6e8', '#b08a66', 1.1], key: ['#fff1dc', 2.4, [-5, 11, 9]], rim: ['#bfe0ff', 1.2], front: 1.3, fog: null, exp: 1.05 },
    warm: { hemi: ['#ffe7c4', '#a0704a', 1.0], key: ['#ffd9a8', 2.2, [-6, 10, 8]], rim: ['#ffd0a0', 1.0], front: 1.2, exp: 1.05 },
    night: { hemi: ['#6f7cc9', '#20183a', 0.55], key: ['#9fb6ff', 1.1, [6, 11, 6]], rim: ['#7f9cff', 1.4], front: 0.55, exp: 1.1 },
    dark: { hemi: ['#5a5f9a', '#141428', 0.45], key: ['#c8d0ff', 0.9, [-4, 12, 8]], rim: ['#6f8cff', 1.6], front: 0.45, exp: 1.1 },
    studio: { hemi: ['#ffffff', '#c9b7a0', 1.25], key: ['#ffffff', 2.0, [-6, 12, 10]], rim: ['#ffffff', 1.0], front: 1.4, exp: 1.0 },
    out: { hemi: ['#d8ecff', '#6a8a4a', 1.2], key: ['#fff3d6', 2.8, [-8, 14, 6]], rim: ['#ffffff', 0.8], front: 1.0, exp: 1.0 },
  };
  // ---------- ฉากหลังทั้งหมด ----------
  const SETS = {
    office: (g, night) => { room(g, { floorMap: night ? carpetTex('#3a3f5e') : woodTex('#c9a27a'), wallMap: wallTex(night ? '#3a4066' : '#efe6d6', 'stripe'), wall: night ? '#3a4066' : '#efe6d6', base: '#6b4a32' });
      frameOnWall(g, 80, 340, 920, 520, cityTex(!!night)); shelf(g, 140, 250, 3); wallClock(g, 930, 230); return night ? 'night' : 'day'; },
    officeNight: (g) => SETS.office(g, true),
    room: (g, w = '#ffe7c4', f = '#d39a66') => { room(g, { floorMap: woodTex(f), wallMap: wallTex(w, 'stripe'), wall: w }); picture(g, 160, 380, 230, 180, '#8fd3ff'); picture(g, 700, 330, 180, 240, '#ffb3c7'); return 'warm'; },
    studio: (g, a = '#ffd166', b = '#ffb703') => { sunburst(g, a, b); return 'studio'; },
    dark: (g) => { room(g, { floor: '#0f1024', wallMap: wallTex('#191b3a', 'stripe'), wall: '#191b3a', base: '#0b0c1d' }); return 'dark'; },
    bedroom: (g) => { room(g, { floorMap: carpetTex('#2a2860'), wallMap: wallTex('#2c2a63', 'dots'), wall: '#2c2a63', base: '#1d1b45' });
      const m = frameOnWall(g, 560, 330, 360, 400, tex('nightwin', 512, 512, (x, w, h) => { const gg = x.createLinearGradient(0, 0, 0, h); gg.addColorStop(0, '#1a1446'); gg.addColorStop(1, '#4b2e83'); x.fillStyle = gg; x.fillRect(0, 0, w, h); for (let i = 0; i < 40; i++) { x.fillStyle = '#fff'; x.beginPath(); x.arc(hash(i) * w, hash(i * 2) * h * 0.7, 1 + hash(i * 3) * 2, 0, 7); x.fill(); } x.shadowColor = '#fff2b8'; x.shadowBlur = 40; x.fillStyle = '#fff2b8'; x.beginPath(); x.arc(w * 0.65, h * 0.3, 60, 0, 7); x.fill(); }), '#e8e0ff');
      if (m) { const l = new T3.SpotLight('#b9c6ff', 30, 30, 0.6, 0.6); l.position.set(m.cx, m.cy + 1, WALLZ + 1); l.target.position.set(m.cx - 2, 0, 3); g.add(l, l.target); } return 'night'; },
    storm: (g) => { skyDome(g, skyTex('#1b1030', '#3b2160')); ground(g, '#2a2440'); skyline3(g, true, -40); return 'dark'; },
    stage: (g) => { room(g, { floorMap: woodTex('#8a5a3c'), wall: '#2a1630', side: false });
      for (let i = 0; i < 14; i++) { const c = cyl(0.9, 0.9, 16, i % 2 ? '#b0213a' : '#8c1830', { roughness: 0.7, sheen: 1, sheenColor: '#ff8090' }, 16); c.scale.z = 0.4; c.position.set(-13 + i * 2, 8, WALLZ + 0.6); g.add(c); }
      const sp = new T3.SpotLight('#fff0c0', 120, 40, 0.35, 0.5); sp.position.set(0, 16, 6); sp.target.position.set(0, 0, 0); sp.castShadow = true; g.add(sp, sp.target); return 'dark'; },
    street: (g, night) => { night = night === 'night' || night === true; skyDome(g, skyTex(night ? '#141a44' : '#6fb8ff', night ? '#3a3f7a' : '#d8efff', night ? 150 : 0)); ground(g, '#8d939e');
      const road = box(200, 0.05, 8, '#4a4f5a'); road.position.set(0, 0.02, 6); road.receiveShadow = true; g.add(road); for (let i = 0; i < 20; i++) { const d = box(2.4, 0.06, 0.3, '#ffffff'); d.position.set(-40 + i * 4.5, 0.05, 6); g.add(d); }
      const walk = box(200, 0.3, 10, '#b8bcc4'); walk.position.set(0, 0.15, -3); walk.receiveShadow = true; walk.userData.support = 'top'; g.add(walk); skyline3(g, night, -14);
      for (const x of [-7, 7]) { const p = cyl(0.12, 0.15, 9, '#555', { metalness: 0.6 }); p.position.set(x, 4.5, -2); g.add(p); const b = sph(0.5, night ? '#fff6c0' : '#dddddd', night ? { emissive: '#fff0b0', emissiveIntensity: 2 } : {}); b.position.set(x, 9, -2); g.add(b); if (night) { const l = new T3.PointLight('#ffe7a8', 40, 16); l.position.set(x, 8.5, -1.5); g.add(l); } }
      tree3(g, -10, -6, 1.2); tree3(g, 11, -7, 1.1); return night ? 'night' : 'out'; },
    cafe: (g) => { room(g, { floorMap: woodTex('#8a5a3c'), wallMap: wallTex('#f3e1c7', 'brick'), wall: '#f3e1c7' });
      const p = wallPt(120, 420), q = wallPt(900, 570); if (p && q) { const mb = new T3.Mesh(new T3.PlaneGeometry(q.x - p.x, p.y - q.y), new T3.MeshStandardMaterial({ map: canvasTex(1024, 200, (x, w, h) => { x.fillStyle = '#2f3b33'; x.fillRect(0, 0, w, h); x.font = '800 54px K'; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; ['ลาเต้ 55', 'อเมริกาโน่ 45', 'ชาเย็น 40'].forEach((t, i) => x.fillText(t, 180 + i * 340, 104)); }), roughness: 0.8 })); mb.position.set((p.x + q.x) / 2, (p.y + q.y) / 2, WALLZ + 0.25); g.add(mb); }
      for (const x of [-4.5, 0, 4.5]) pendant(g, x, 9.5, -2); shelf(g, 860, 700, 3, ['#ffffff', '#f4d4b0', '#8a5a3c']); return 'warm'; },
    classroom: (g) => { room(g, { floorMap: woodTex('#c9a27a'), wallMap: wallTex('#e8f4e0', 'stripe'), wall: '#e8f4e0' });
      const p = wallPt(110, 330), q = wallPt(910, 770); if (p && q) { const b = new T3.Mesh(new T3.PlaneGeometry(q.x - p.x, p.y - q.y), new T3.MeshStandardMaterial({ map: canvasTex(1024, 560, (x, w, h) => { x.fillStyle = '#2f5d46'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = 8; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(90, 100 + i * 85); x.lineTo(90 + 250 + hash(i) * 500, 100 + i * 85); x.stroke(); } }), roughness: 0.9 })); b.position.set((p.x + q.x) / 2, (p.y + q.y) / 2, WALLZ + 0.25); g.add(b); const tr = box(q.x - p.x, 0.15, 0.4, '#8b5a3c'); tr.position.set((p.x + q.x) / 2, q.y - 0.1, WALLZ + 0.4); g.add(tr); } return 'day'; },
    kitchen: (g) => { room(g, { floorMap: tileTex('#f1e3c6', '#d9c7a3'), wallMap: tileTex('#d6f5e3', '#b8e3cb'), wall: '#d6f5e3' });
      for (let i = 0; i < 4; i++) { const c = rbox(2.4, 2, 0.8, 0.1, '#ffffff', { clearcoat: 0.6 }); const p = wallPt(170 + i * 230, 420); if (p) { c.position.set(p.x, p.y, WALLZ + 0.5); c.castShadow = true; g.add(c); } }
      const ct = rbox(16, 2.6, 2, 0.1, '#f4f4f4', { clearcoat: 0.4 }); ct.position.set(0, 1.3, WALLZ + 1.1); ct.castShadow = ct.receiveShadow = true; g.add(ct); const top = box(16.2, 0.2, 2.2, '#9aa7b8', { roughness: 0.3, clearcoat: 1 }); top.position.set(0, 2.7, WALLZ + 1.1); top.userData.support = 'top'; g.add(top); return 'day'; },
    shop: (g) => { room(g, { floorMap: tileTex('#c9d3e0', '#aebacb'), wall: '#cfe9ff' }); for (let r = 0; r < 3; r++) shelf(g, 280, 470 + r * 170, 4), shelf(g, 740, 470 + r * 170, 4); return 'day'; },
    beach: (g) => { skyDome(g, skyTex('#3fb1ff', '#d8f3ff')); const sand = ground(g, '#f4dc9c'); const sea = new T3.Mesh(new T3.PlaneGeometry(400, 160), new T3.MeshPhysicalMaterial({ color: '#2fa4e7', roughness: 0.15, clearcoat: 1 })); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.05, -90); g.add(sea);
      const sun = sph(6, '#fff2a0', { emissive: '#ffe066', emissiveIntensity: 1.5 }); sun.position.set(30, 40, -150); g.add(sun); tree3(g, -9, -5, 1.4, '#3fae5a'); return 'out'; },
    beachNight: (g) => { skyDome(g, skyTex('#0f1a44', '#3c3a7a', 200)); ground(g, '#5a5248'); const sea = new T3.Mesh(new T3.PlaneGeometry(400, 160), new T3.MeshPhysicalMaterial({ color: '#1d3d7a', roughness: 0.2, clearcoat: 1 })); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.05, -90); g.add(sea);
      const moon = sph(5, '#fff6d6', { emissive: '#fff2c0', emissiveIntensity: 1.2 }); moon.position.set(25, 40, -150); g.add(moon); return 'night'; },
    cityNight: (g) => { skyDome(g, skyTex('#0f1a44', '#3c3a7a', 160)); ground(g, '#232742'); skyline3(g, true, -16); const moon = sph(4, '#fff6d6', { emissive: '#fff2c0', emissiveIntensity: 1.2 }); moon.position.set(22, 45, -140); g.add(moon); return 'night'; },
    meadow: (g) => { skyDome(g, skyTex('#4aa3f0', '#d6ecff')); ground(g, '#6cc04a'); for (const [x, z, s] of [[-30, -60, 30], [20, -70, 36], [60, -80, 28]]) { const h = sph(1, '#7cc96a', { roughness: 0.9 }); h.scale.set(s, s * 0.35, s * 0.6); h.position.set(x, 0, z); g.add(h); }
      tree3(g, -8, -6, 1.3); tree3(g, 9, -8, 1.5); tree3(g, -14, -14, 1.6, '#4fa84a'); for (let i = 0; i < 40; i++) { const f = sph(0.12, ['#fff', '#ffd23f', '#ff8fc1'][i % 3]); f.position.set(-12 + hash(i) * 24, 0.1, -4 + hash(i * 3) * 12); g.add(f); } return 'out'; },
    dream: (g) => { skyDome(g, skyTex('#3a2a7a', '#ff9ad5', 260)); const fl = ground(g, '#c9a8ff'); fl.material.transparent = true; fl.material.opacity = 0.55;
      for (let i = 0; i < 10; i++) { const c = new T3.Group(); for (let k = 0; k < 4; k++) { const s = sph(0.9 + hash(i * 4 + k) * 0.6, '#ffffff', { roughness: 0.9, transparent: true, opacity: 0.85 }); s.position.set(k * 0.9, Math.sin(k) * 0.3, 0); c.add(s); } c.position.set(-14 + (i % 5) * 7, 3 + Math.floor(i / 5) * 7 + hash(i) * 2, -12 - hash(i * 2) * 10); c.userData.float = i; g.add(c); } return 'warm'; },
    space: (g) => { skyDome(g, skyTex('#070b22', '#141a44', 400)); const p = sph(12, '#5b6cff', { roughness: 0.6 }); p.position.set(-22, -6, -40); g.add(p); const ring = new T3.Mesh(new T3.TorusGeometry(18, 1.2, 8, 64), mat('#9fb0ff')); ring.position.copy(p.position); ring.rotation.x = 1.2; g.add(ring);
      const fl = ground(g, '#0b0f2a'); fl.visible = false; return 'dark'; },
  };
  SETS.park = SETS.meadow; SETS.sunset = (g) => { SETS.meadow(g); return 'warm'; };

  function lights(scene, kind) {
    const L = LIGHT[kind] || LIGHT.day;
    scene.add(new T3.HemisphereLight(...L.hemi));
    const key = new T3.DirectionalLight(L.key[0], L.key[1]); key.position.set(...L.key[2]); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -14, right: 14, top: 14, bottom: -4, near: 1, far: 60 }); key.shadow.radius = 6; key.shadow.bias = -0.0004; key.target.position.set(0, 2, 0); scene.add(key, key.target);
    const rim = new T3.DirectionalLight(L.rim[0], L.rim[1]); rim.position.set(6, 6, -6); scene.add(rim);
    const fr = new T3.DirectionalLight('#ffffff', L.front); fr.position.set(1, 5, 20); scene.add(fr);
    return L;
  }

  // ---------- ของหลักแบบ 3 มิติ ----------
  // แต่ละตัว: build(o) -> Group (ฐานอยู่ที่ y=0), w = ความกว้างโลก, px(s,o) = [ความกว้างพิกเซล, ระยะจาก y ถึงฐาน(พิกเซล)]
  const P3 = {
    desk: { w: 5.2, px: (s, o) => [(o.w || 760) * s, 274 * s], build: (o) => { const g = new T3.Group(), W5 = 5.2, wood = mat('#b77b4b', { roughness: 0.45, clearcoat: 0.5 });
      const top = rbox(W5, 0.2, 2.2, 0.08, wood); top.position.y = 2.3; top.userData.support = 'top'; g.add(top);
      for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const l = cyl(0.08, 0.08, 2.2, '#3a3a3a', { metalness: 0.6, roughness: 0.3 }, 12); l.position.set(x * (W5 / 2 - 0.25), 1.1, z * 0.85); g.add(l); }
      if (o.laptop !== false) { const lap = new T3.Group(); lap.position.set((o.lx ?? 230) / 760 * W5 * (760 / (o.w || 760)), 2.42, 0.1); g.add(lap); const bm = mat('#cfd5de', { metalness: 0.5, roughness: 0.3 });
        const kb = box(1.8, 0.06, 1.15, bm); lap.add(kb); const sc = rbox(1.8, 1.2, 0.05, 0.04, bm); sc.position.set(0, 0.6, -0.6); sc.rotation.x = -0.22; lap.add(sc);
        const pn = glowPlane(1.62, 1.02, textTex(o.text || '', o.screen || '#bfe6ff', '#223344', 512, 320, 70)); pn.position.set(0, 0.6, -0.565); pn.rotation.x = -0.22; lap.add(pn); }
      return g; } },
    table: { w: 3.6, px: (s) => [520 * s, 250 * s], build: (o) => { const g = new T3.Group(); const top = rbox(3.6, 0.18, 1.8, 0.08, o.col || '#a8703f', { roughness: 0.45, clearcoat: 0.5 }); top.position.y = 1.8; top.userData.support = 'top'; g.add(top);
      for (const x of [-1.5, 1.5]) for (const z of [-0.7, 0.7]) { const l = cyl(0.07, 0.07, 1.8, '#3a3a3a', { metalness: 0.5 }, 12); l.position.set(x, 0.9, z); g.add(l); } return g; } },
    chair: { w: 1.6, px: (s) => [220 * s, 80 * s], build: () => { const g = new T3.Group(), c = mat('#3a3f4e', { roughness: 0.5, clearcoat: 0.3 }); const seat = rbox(1.6, 0.3, 1.5, 0.12, c); seat.position.y = 1.4; g.add(seat); const back = rbox(1.4, 1.6, 0.25, 0.25, c); back.position.set(0, 2.4, -0.65); g.add(back);
      const p = cyl(0.08, 0.08, 1.2, '#888', { metalness: 0.7 }, 12); p.position.y = 0.7; g.add(p); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2, l = box(0.9, 0.08, 0.12, '#666', { metalness: 0.6 }); l.position.set(Math.cos(a) * 0.4, 0.12, Math.sin(a) * 0.4); l.rotation.y = -a; g.add(l); } return g; } },
    cup: { w: 0.55, px: (s) => [72 * s, 10 * s], build: (o) => { const g = new T3.Group(); const c = cyl(0.27, 0.23, 0.6, o.col || '#ffffff', { clearcoat: 1, roughness: 0.2 }); c.position.y = 0.3; g.add(c); const h = new T3.Mesh(new T3.TorusGeometry(0.14, 0.04, 8, 16), mat(o.col || '#ffffff', { clearcoat: 1 })); h.position.set(0.3, 0.32, 0); g.add(h); const cf = cyl(0.25, 0.25, 0.02, '#6b3e26'); cf.position.y = 0.55; g.add(cf); return g; } },
    plant: { w: 1.4, px: (s) => [150 * s, 90 * s], build: () => { const g = new T3.Group(); const pot = cyl(0.62, 0.45, 1.0, '#e07a5f', { clearcoat: 0.6 }); pot.position.y = 0.5; g.add(pot); const lm = mat('#4caf50', { roughness: 0.5, clearcoat: 0.4 });
      for (let i = 0; i < 9; i++) { const l = new T3.Mesh(geo('leaf', () => new T3.SphereGeometry(0.3, 16, 12)), lm); l.scale.set(0.6, 2.0, 0.25); const a = i / 9 * Math.PI * 2; l.position.set(Math.cos(a) * 0.32, 1.6 + (i % 3) * 0.16, Math.sin(a) * 0.32); l.rotation.set(Math.sin(a) * 0.5, -a, Math.cos(a) * 0.5); g.add(l); } return g; } },
    bed: { w: 5.6, px: (s) => [760 * s, 70 * s], build: (o, env) => { const g = new T3.Group(); const fr = rbox(5.6, 0.7, 3, 0.15, '#a46a46', { roughness: 0.5, clearcoat: 0.4 }); fr.position.y = 0.6; g.add(fr); const hb = rbox(0.4, 2.6, 3, 0.15, '#8b5a3c', { clearcoat: 0.4 }); hb.position.set(-2.8, 1.5, 0); g.add(hb);
      const mt = rbox(5.2, 0.5, 2.8, 0.2, '#ffffff', { roughness: 0.8, sheen: 1 }); mt.position.y = 1.15; g.add(mt); const pl = sph(1, '#ffffff', { roughness: 0.9, sheen: 1 }); pl.scale.set(0.8, 0.35, 1.1); pl.position.set(-1.9, 1.6, 0); g.add(pl);
      if (o.who && env.LOOKS[o.who]) { const hd = R3.person(Object.assign({}, env.LOOKS[o.who])); const u = hd.userData; R3.pose(hd, 'stand', o.face || 'sleepy', 0, 0, {}); for (const c of [...u.body.children]) if (c !== u.head) u.body.remove(c); u.head.position.set(-1.7, 1.9, 0.1); u.head.rotation.z = 0.25; u.head.scale.setScalar(0.62); g.add(hd); g.userData.sleeper = hd; }
      const bl = rbox(3.6, 0.6, 2.95, 0.28, o.col || '#5ec8ff', { roughness: 0.8, sheen: 1, sheenColor: '#ffffff' }); bl.position.set(0.7, 1.45, 0); g.add(bl); return g; } },
    sofa: { w: 6, px: (s) => [800 * s, 80 * s], build: (o) => { const g = new T3.Group(), c = mat(o.col || '#5b7cfa', { roughness: 0.8, sheen: 1, sheenColor: '#ffffff' }); const base = rbox(6, 1.2, 2.4, 0.35, c); base.position.y = 0.9; base.userData.support = 'top'; g.add(base); const back = rbox(6, 1.8, 0.6, 0.3, c); back.position.set(0, 2.0, -0.9); g.add(back);
      for (const sd of [-1, 1]) { const a = rbox(0.7, 1.5, 2.4, 0.3, c); a.position.set(sd * 3, 1.4, 0); g.add(a); } return g; } },
    box: { w: 2.4, px: (s) => [300 * s, 110 * s], build: (o) => { const g = new T3.Group(); const t = textTex(o.text || '', o.col || '#f4c27a', '#151515', 512, 380, 80); const m = new T3.MeshStandardMaterial({ color: '#fff', map: t, roughness: 0.8 }); const side = mat(o.col || '#f4c27a', { roughness: 0.8 }); const b = new T3.Mesh(new T3.BoxGeometry(2.4, 1.75, 1.8), [side, side, side, side, m, side]); b.position.y = 0.88; g.add(b);
      const tp = box(0.35, 0.02, 1.82, 'rgba(0,0,0,0)'); tp.material = mat('#c9a063'); tp.position.y = 1.76; g.add(tp); return g; } },
    bin: { w: 1.8, px: (s) => [220 * s, 120 * s], build: () => { const g = new T3.Group(); const b = cyl(0.9, 0.7, 2, '#7d8597', { metalness: 0.4, roughness: 0.4 }); b.position.y = 1; g.add(b); return g; } },
    monitor: { w: 3.8, px: (s) => [520 * s, 254 * s], build: (o) => { const g = new T3.Group(); const st = cyl(0.12, 0.12, 1.2, '#555', { metalness: 0.6 }, 12); st.position.y = 0.6; g.add(st); const ft = rbox(1.6, 0.12, 0.8, 0.06, '#555', { metalness: 0.6 }); ft.position.y = 0.06; g.add(ft);
      const sc = rbox(3.8, 2.45, 0.18, 0.12, '#2b2b2b', { roughness: 0.3, clearcoat: 1 }); sc.position.y = 2.35; g.add(sc); const pn = glowPlane(3.5, 2.15, textTex(o.text || '', o.screen || '#c9ecff', o.tc || '#223344', 640, 400, 90)); pn.position.set(0, 2.35, 0.13); g.add(pn); return g; } },
    tv: { w: 4.4, px: (s) => [600 * s, 210 * s], build: (o) => { const g = new T3.Group(); const sc = rbox(4.4, 2.8, 0.2, 0.12, '#222', { clearcoat: 1 }); sc.position.y = 1.9; g.add(sc); const pn = glowPlane(4.1, 2.5, textTex(o.text || '', o.screen || '#7fd3ff', '#ffffff', 640, 400, 90)); pn.position.set(0, 1.9, 0.12); g.add(pn); const st = box(1.6, 0.4, 0.6, '#444'); st.position.y = 0.2; g.add(st); return g; } },
    alarm: { w: 2.2, px: (s) => [300 * s, 130 * s], build: () => { const g = new T3.Group(); const b = cyl(0.95, 0.95, 0.6, '#e63946', { clearcoat: 1, roughness: 0.25 }); b.rotation.x = Math.PI / 2; b.position.y = 1.05; g.add(b); const f = cyl(0.78, 0.78, 0.05, '#ffffff'); f.rotation.x = Math.PI / 2; f.position.set(0, 1.05, 0.32); g.add(f);
      for (const sd of [-1, 1]) { const bell = sph(0.36, '#ffd23f', { metalness: 0.6, roughness: 0.25 }); bell.position.set(sd * 0.62, 1.95, 0); g.add(bell); const lg = R3.stick(0.3, 0.06); lg.position.set(sd * 0.55, 0.15, 0); lg.rotation.z = sd * 0.4; g.add(lg); }
      const h1 = R3.stick(0.4, 0.045); h1.position.set(0, 1.25, 0.36); g.add(h1); const h2 = R3.stick(0.3, 0.045); h2.position.set(0.16, 1.05, 0.36); h2.rotation.z = Math.PI / 2; g.add(h2); g.userData.ring = true; return g; } },
    trophy: { w: 1.6, px: (s) => [200 * s, 110 * s], build: () => { const g = new T3.Group(), gold = mat('#ffd23f', { metalness: 0.9, roughness: 0.2 }); const cup = new T3.Mesh(new T3.CylinderGeometry(0.75, 0.25, 1.3, 32, 1, true), gold); cup.material.side = T3.DoubleSide; cup.position.y = 2.0; g.add(cup);
      for (const sd of [-1, 1]) { const h = new T3.Mesh(new T3.TorusGeometry(0.3, 0.07, 8, 24), gold); h.position.set(sd * 0.8, 2.1, 0); h.rotation.y = Math.PI / 2; g.add(h); } const st = cyl(0.12, 0.12, 0.6, '#d4a017', { metalness: 0.9, roughness: 0.2 }); st.position.y = 1.1; g.add(st); const bs = box(1.3, 0.55, 0.9, '#8b5a3c'); bs.position.y = 0.55; g.add(bs); return g; } },
  };
  const BIG = ['desk', 'table', 'bed', 'sofa', 'chair'];

  // ---------- ป้ายภาพจากโค้ด 2 มิติ ----------
  const scratch = document.createElement('canvas'); scratch.width = W; scratch.height = H; const sctx = scratch.getContext('2d', { willReadFrequently: true });
  function bbox2D(fn) { const saved = ctx; ctx = sctx; const T0 = T; let x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (const tt of [0, 0.7, 1.9]) { T = tt; sctx.setTransform(1, 0, 0, 1, 0, 0); sctx.clearRect(0, 0, W, H); try { fn(); } catch (e) { } const d = sctx.getImageData(0, 0, W, H).data;
      for (let y = 0; y < H; y += 4) for (let x = 0; x < W; x += 4) if (d[(y * W + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    T = T0; ctx = saved; if (x1 <= x0) return null; return [x0 - 30, y0 - 30, x1 + 30, y1 + 30]; }
  function card(fn, front, sh) {
    const bb = bbox2D(fn); if (!bb) return null; const [x0, y0, x1, y1] = bb, cw = Math.ceil(x1 - x0), chh = Math.ceil(y1 - y0);
    const c = document.createElement('canvas'); c.width = cw; c.height = chh; const cx = c.getContext('2d'); const t = new T3.CanvasTexture(c); t.colorSpace = T3.SRGBColorSpace;
    const m = new T3.MeshBasicMaterial({ map: t, transparent: true, alphaTest: 0.04, side: T3.DoubleSide, toneMapped: false });
    const mesh = new T3.Mesh(new T3.PlaneGeometry(1, 1), m); mesh.renderOrder = front ? 5 : 1;
    const px = (x0 + x1) / 2, bottom = y1 - 30;
    let P = support(px, bottom, sh, front);
    const k = ppu(P), wW = cw / k, wH = chh / k; mesh.scale.set(wW, wH, 1); mesh.position.set(P.x, P.y + wH / 2 - 30 / k, P.z);
    const look = BASE.pos.clone(); look.y = mesh.position.y; mesh.lookAt(look);
    mesh.castShadow = P.onFloor; mesh.customDepthMaterial = new T3.MeshDepthMaterial({ depthPacking: T3.RGBADepthPacking, map: t, alphaTest: 0.5 });
    mesh.userData.draw = () => { const saved = ctx; ctx = cx; cx.setTransform(1, 0, 0, 1, -x0, -y0); cx.clearRect(x0, y0, cw, chh); try { fn(); } catch (e) { } ctx = saved; t.needsUpdate = true; };
    return mesh;
  }
  // หาจุดวางจากพิกเซลฐาน: โต๊ะ/พื้น/ผนัง
  function support(x, y, sh, front) { const r = ray(x, y); const hits = r.intersectObjects(sh.supports, false);
    for (const h of hits) { const ty = h.object.userData.support; if (ty === 'wall') { const p = h.point.clone(); p.z += 0.3; if (front) { const q = onPlane(x, y, MID(3)); if (q) { q.onFloor = false; return q; } } p.onFloor = false; return p; } const p = h.point.clone(); p.onFloor = ty === 'floor'; if (ty === 'top') p.y += 0.01; if (p.z < WALLZ + 0.6) p.z = WALLZ + 0.6; return p; }
    const q = onPlane(x, y, MID(front ? 3 : WALLZ + 0.5)) || new T3.Vector3(0, 0, 0); q.onFloor = false; return q; }

  // ---------- ประกอบช็อต ----------
  function build(sh, idx, env) {
    const scene = new T3.Scene(), g = new T3.Group(); scene.add(g);
    const [n, ...a] = String(sh.bg || 'studio').split(':'); const lk = (SETS[n] || SETS.studio)(g, ...a); const L = lights(scene, lk);
    scene.background = new T3.Color(n === 'studio' ? (a[1] || '#ffb703') : '#000');
    const shot = { scene, set: g, exp: L.exp, cast: [], cards: [], props: [], idx, supports: [] };
    scene.updateMatrixWorld(true); g.traverse(o => { if (o.userData.support) shot.supports.push(o); });
    // ของชิ้นใหญ่ 3 มิติก่อน (เป็นที่วางของ)
    const list = (sh.props || []).map(p => { const [nm, x, y, s = 1, o = {}] = p; return { nm, x, y, s, o }; });
    const order = list.filter(p => BIG.includes(p.nm) && P3[p.nm]).concat(list.filter(p => !(BIG.includes(p.nm) && P3[p.nm])));
    for (const p of order) {
      const d = P3[p.nm];
      if (d) { const m = shadowy(d.build(p.o, env)); const [pw, foot] = d.px(p.s, p.o); const P = support(p.x, p.y + foot, shot, !!p.o.front); const sc = pw / (d.w * ppu(P)); m.scale.setScalar(sc); m.position.copy(P); if (p.o.flip) m.rotation.y = Math.PI;
        m.rotation.y += (540 - p.x) / 540 * 0.25; scene.add(m); scene.updateMatrixWorld(true); m.traverse(o => { if (o.userData.support) shot.supports.push(o); }); shot.props.push(m); }
      else { const fn = env.PROPS[p.nm]; if (!fn) continue; const c = card(() => fn(p.x, p.y, p.s, p.o), !!p.o.front, shot); if (c) { scene.add(c); shot.cards.push(c); } }
    }
    for (const c of sh.cast || []) { const [id, x, y, s = 1, ps, fc, o = {}] = c; const look = env.LOOKS[id] || {}; let m;
      if (look.kind === 'sheep') m = R3.sheep(); else if (look.kind === 'fish') m = R3.fishbowl(); else m = R3.person(look);
      scene.add(m); shot.cast.push({ id, x, y, s, ps, fc, o, m, look }); }
    return shot;
  }
  function placeChar(c, x, y, s) { const fy = y + 402 * s; let P = onPlane(x, Math.max(fy, 1000), FLOOR) || new T3.Vector3(0, 0, 0); if (P.z < WALLZ + 1.4) P.z = WALLZ + 1.4; const k = ppu(P);
    const hgt = c.look.kind === 'sheep' ? 2.6 : c.look.kind === 'fish' ? 2.8 : 4.75, px = c.look.kind === 'sheep' ? 280 * s : c.look.kind === 'fish' ? 360 * s : 614 * s; c.m.scale.setScalar(px / (hgt * k)); c.m.position.set(P.x, 0, P.z); }

  // กล้องต่อช็อต: ส่าย/สูงต่ำต่างกัน + การเคลื่อนตามบท
  const VAR = [[0, 0], [-0.14, 0.4], [0.12, -0.3], [-0.06, 0.8], [0.16, 0.2], [-0.18, -0.2], [0.08, 0.6]];
  const cam = new T3.PerspectiveCamera(FOV, W / H, 0.1, 400);
  function setCam(shot, mode, lt, dur) { const [yaw, dh] = VAR[shot.idx % VAR.length]; const look = BASE.look.clone(); const off = BASE.pos.clone().sub(look); off.applyAxisAngle(new T3.Vector3(0, 1, 0), yaw); off.y += dh;
    const k = E.out(prog(lt, 0, Math.max(dur, 3))), pk = 1 - 0.05 * (1 - E.out(prog(lt, 0, 0.3)));
    let dist = 1, dx = 0, target = look.clone();
    if (mode === 'push') dist = 1 - 0.1 * k; else if (mode === 'pull') dist = 0.88 + 0.12 * k; else if (mode === 'panL') dx = 1.6 - 3.2 * k; else if (mode === 'panR') dx = -1.6 + 3.2 * k;
    else if (String(mode).startsWith('zoom')) { const [, zx, zy, zs] = mode.split(':'); const P = onPlane(+zx, +zy, MID(0.5)); const z = E.inOut(prog(lt, 0, 0.6)) * Math.min(0.75, (+zs || 0.5) * 1.6); if (P) { target.lerp(P, z); dist = 1 - z * 0.55; } }
    const p = target.clone().add(off.multiplyScalar(dist * pk)); p.x += dx; target.x += dx * 0.6;
    if (mode === 'shake') { p.x += Math.sin(T * 47) * 0.12; p.y += Math.cos(T * 39) * 0.09; }
    cam.position.copy(p); cam.lookAt(target); }

  function render(shot, lt, ln, env) {
    const acts = ln.act || {};
    for (const c of shot.cast) { let ps = c.ps || 'stand', fc = c.fc || 'neutral'; if (acts[c.id]) { const [a, b] = acts[c.id].split('/'); ps = a || ps; fc = b || fc; }
      let x = c.x; if (c.o.walk) x = lerp(c.o.walk[0], c.o.walk[1], E.inOut(prog(lt, c.o.walkAt || 0, (c.o.walkAt || 0) + (c.o.walkDur || 2.5)))); if (c.o.enter) x = lerp(c.o.enter === 'left' ? -250 : 1330, c.x, E.out(prog(lt, 0, 0.6)));
      placeChar(c, x, c.y, c.s); c.m.rotation.y = Math.max(-0.5, Math.min(0.5, (540 - x) / 540 * 0.5)) + (c.o.flip && Math.abs(540 - x) < 120 ? -0.3 : 0);
      const mo = env.talk(ln, c.id);
      if (c.look.kind === 'sheep' || c.look.kind === 'fish') { c.m.userData.open.scale.y = 0.01 + mo * 0.9; if (c.m.userData.fish) { c.m.userData.fish.position.x = Math.sin(T * 1.4) * 0.4; c.m.userData.fish.position.y = 1.3 + (c.o.jump ? Math.abs(Math.sin(T * 6)) * 0.5 : 0); } }
      else R3.pose(c.m, (c.o.walk && prog(lt, c.o.walkAt || 0, (c.o.walkAt || 0) + (c.o.walkDur || 2.5)) < 1) ? 'walk' : ps, fc, T, mo, c.o); }
    for (const m of shot.props) { if (m.userData.ring) m.rotation.z = Math.sin(T * 60) * 0.06; }
    for (const c of shot.cards) c.userData.draw();
    if (shot.set.userData.spin) shot.set.userData.spin.rotation.z = T * 0.12;
    shot.set.traverse(o => { if (o.userData.float !== undefined) o.position.y += Math.sin(T * 0.8 + o.userData.float) * 0.004; });
    renderer.toneMappingExposure = shot.exp;
    setCam(shot, ln.cam || shot.camMode || 'push', lt, ln.dur);
    renderer.render(shot.scene, cam); return glc;
  }
  // ฉากท้าย: สตูดิโอสีสินค้า
  function endShot(a, b) { const scene = new T3.Scene(), g = new T3.Group(); scene.add(g); SETS.studio(g, a, b); lights(scene, 'studio'); scene.background = new T3.Color(b); return { scene, set: g, exp: 1.0, cast: [], cards: [], props: [], idx: 0, supports: [] }; }
  function renderEnd(shot) { shot.set.userData.spin.rotation.z = T * 0.12; renderer.toneMappingExposure = 1; const off = BASE.pos.clone().sub(BASE.look); cam.position.copy(BASE.look.clone().add(off.multiplyScalar(0.95))); cam.lookAt(BASE.look); renderer.render(shot.scene, cam); return glc; }
  return { init, build, render, endShot, renderEnd };
})();
