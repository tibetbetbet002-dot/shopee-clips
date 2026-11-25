// ตัวละครหัวกลมแบบ 3 มิติ (three.js) — ใช้ THREE จาก window (core.html โหลดให้)
// R3.person(look) -> Group ; R3.pose(p, pose, face, t, mouth, opts)
const R3 = (() => {
  const T3 = window.THREE;
  const M = {};
  const mat = (c, o = {}) => { const k = c + JSON.stringify(o); if (!M[k]) M[k] = new T3.MeshPhysicalMaterial(Object.assign({ color: c, roughness: 0.45, clearcoat: 0.35, clearcoatRoughness: 0.4 }, o)); return M[k]; };
  const INK = () => mat('#141414', { roughness: 0.3, clearcoat: 0.8 });
  const OUTM = new T3.MeshBasicMaterial({ color: '#141414', side: T3.BackSide });
  const G = {}; const geo = (k, f) => G[k] || (G[k] = f());
  const shadowy = m => { m.traverse(o => { if (o.isMesh && o.material !== OUTM) { o.castShadow = true; o.receiveShadow = true; } }); return m; };
  const outline = (g, s = 1.035) => { const m = new T3.Mesh(g, OUTM); m.scale.setScalar(s); return m; };
  const onHead = (yaw, pitch, r = 1.0) => new T3.Vector3(Math.sin(yaw) * Math.cos(pitch) * r, Math.sin(pitch) * r, Math.cos(yaw) * Math.cos(pitch) * r);
  const face2 = (m, p) => { m.position.copy(p); m.lookAt(p.clone().multiplyScalar(2)); return m; };
  const stick = (len, w = 0.06) => new T3.Mesh(geo('st' + len + w, () => new T3.CapsuleGeometry(w, len, 6, 12)), INK());
  function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T3.CanvasTexture(c); t.colorSpace = T3.SRGBColorSpace; t.anisotropy = 8; return t; }

  function person(o = {}) {
    const root = new T3.Group(), body = new T3.Group(); root.add(body); root.userData.body = body;
    // ลำตัว
    const tg = geo('torso', () => new T3.SphereGeometry(0.95, 48, 32));
    let tm = mat(o.outfit || '#7a7f8c', { sheen: 0.6, sheenColor: '#ffffff', roughness: 0.6 });
    if (o.pattern === 'stripe' || o.pattern === 'check') { tm = tm.clone(); tm.map = canvasTex(512, 256, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(0,0,0,0.22)'; for (let i = 0; i < 24; i++) c.fillRect(i * 22, 0, o.pattern === 'check' ? 9 : 4, h); if (o.pattern === 'check') for (let i = 0; i < 12; i++) c.fillRect(0, i * 22, w, 9); }); }
    const torso = new T3.Mesh(tg, tm); torso.scale.set(1, 1.05, 0.82); torso.position.y = 1.85; body.add(torso);
    const tOut = outline(tg, 1.03); tOut.scale.multiply(torso.scale); tOut.position.copy(torso.position); body.add(tOut);
    if (o.belt !== false) { const b = new T3.Mesh(geo('belt', () => new T3.TorusGeometry(0.79, 0.065, 12, 64)), mat('#3a2a1e')); b.rotation.x = Math.PI / 2; b.scale.set(1, 0.82, 1); b.position.y = 1.25; body.add(b);
      const bk = new T3.Mesh(geo('buckle', () => new T3.BoxGeometry(0.2, 0.15, 0.08)), mat('#e0b04a', { metalness: 0.7, roughness: 0.25 })); bk.position.set(0, 1.25, 0.66); body.add(bk); }
    if (o.collar) for (const sd of [-1, 1]) { const c = new T3.Mesh(geo('collar', () => new T3.ConeGeometry(0.2, 0.36, 3)), mat('#ffffff')); c.position.set(sd * 0.16, 2.72, 0.5); c.rotation.set(1.9, 0, sd * 0.6); body.add(c); }
    if (o.tie) { const t = new T3.Mesh(geo('tie', () => new T3.ConeGeometry(0.13, 0.75, 4)), mat(o.tie)); t.position.set(0, 2.28, 0.76); t.rotation.set(-0.3, Math.PI / 4, Math.PI); body.add(t); }
    if (o.badge) { const b = new T3.Mesh(geo('badge', () => new T3.CylinderGeometry(0.13, 0.13, 0.05, 24)), mat(o.badge, { metalness: 0.5, roughness: 0.3 })); b.rotation.x = Math.PI / 2 - 0.3; b.position.set(-0.42, 2.25, 0.74); body.add(b); }
    if (o.sash) { const s = new T3.Mesh(geo('sash', () => new T3.TorusGeometry(0.92, 0.09, 8, 48)), mat(o.sash)); s.scale.set(1, 1.05, 0.85); s.rotation.set(0, Math.PI / 2, 0.75); s.position.y = 1.85; body.add(s); }
    // ขา
    const limb = geo('limb', () => new T3.CapsuleGeometry(0.075, 1.0, 8, 16));
    root.userData.legs = [];
    for (const sd of [-1, 1]) { const g = new T3.Group(); g.position.set(sd * 0.34, 1.05, 0); const l = new T3.Mesh(limb, INK()); l.position.y = -0.55; g.add(l);
      const f = new T3.Mesh(geo('foot', () => new T3.SphereGeometry(0.2, 24, 16)), INK()); f.scale.set(1, 0.55, 1.5); f.position.set(sd * 0.04, -1.1, 0.12); g.add(f); body.add(g); root.userData.legs.push(g); }
    // แขน
    root.userData.arms = [];
    for (const sd of [-1, 1]) { const g = new T3.Group(); g.position.set(sd * 0.98, 2.3, 0.12); const a = new T3.Mesh(limb, INK()); a.position.y = -0.55; g.add(a);
      const hg = geo('hand', () => new T3.SphereGeometry(0.15, 24, 16)); const h = new T3.Mesh(hg, mat('#ffffff')); h.position.y = -1.15; g.add(h); const ho = outline(hg, 1.12); ho.position.copy(h.position); g.add(ho);
      body.add(g); root.userData.arms.push(g); }
    // หัว
    const head = new T3.Group(); head.position.y = 3.65; body.add(head); root.userData.head = head;
    const hg = geo('head', () => new T3.SphereGeometry(1, 64, 48));
    head.add(new T3.Mesh(hg, mat(o.skin || '#ffffff', { roughness: 0.35, clearcoat: 0.6, sheen: 0.3, emissive: '#3a3a3a' })), outline(hg, 1.025));
    if (o.kind === 'cat' || o.kind === 'dog') ears(head, o);
    hair(head, o); extras(head, o);
    root.userData.faces = {}; root.userData.look = o;
    shadowy(root); return root;
  }

  function ears(head, o) { const m = mat(o.earCol || o.skin || '#ffffff', { roughness: 0.4, clearcoat: 0.5 });
    for (const sd of [-1, 1]) { let e; if (o.kind === 'cat') { e = new T3.Mesh(geo('catear', () => new T3.ConeGeometry(0.32, 0.7, 4)), m); e.position.copy(onHead(sd * 0.55, 0.85, 0.95)); e.rotation.z = -sd * 0.45; }
      else { e = new T3.Mesh(geo('dogear', () => new T3.SphereGeometry(0.3, 24, 16)), m); e.scale.set(0.6, 1.4, 0.4); e.position.copy(onHead(sd * 1.35, 0.25, 1.0)); e.rotation.z = sd * 0.35; }
      head.add(e); const ol = outline(e.geometry, 1); ol.position.copy(e.position); ol.rotation.copy(e.rotation); ol.scale.copy(e.scale).multiplyScalar(1.06); head.add(ol); } }

  function hair(head, o) {
    const hc = mat(o.hairCol || '#2a1f1a', { roughness: 0.55, clearcoat: 0.5 });
    const cap = (rot, th = 1.05, m = hc, r = 1.04) => { const c = new T3.Mesh(new T3.SphereGeometry(r, 48, 24, 0, Math.PI * 2, 0, th), m); c.rotation.x = rot; head.add(c); return c; };
    const h = o.hair;
    if (h === 'spiky') { for (let i = 0; i < 11; i++) { const yaw = -1.5 + i * 0.3, pitch = 0.75 + Math.sin(i * 1.7) * 0.12; const c = new T3.Mesh(geo('spike', () => new T3.ConeGeometry(0.22, 0.7, 12)), hc); const p = onHead(yaw, pitch, 0.92); c.position.copy(p); c.quaternion.setFromUnitVectors(new T3.Vector3(0, 1, 0), p.clone().normalize()); head.add(c); } cap(-0.25, 0.95, hc, 1.03); }
    if (h === 'bow' || h === 'neat' || h === 'pony') { cap(-0.12); const fr = new T3.Mesh(geo('fringe', () => new T3.SphereGeometry(0.42, 24, 16)), hc); fr.scale.set(1.4, 0.55, 0.7); fr.position.copy(onHead(-0.35, 0.62, 0.86)); fr.rotation.z = 0.4; head.add(fr); }
    if (h === 'bow') { const bc = mat(o.bowCol || '#ff5fa2', { clearcoat: 1, roughness: 0.25 }); const g = new T3.Group(); for (const sd of [-1, 1]) { const l = new T3.Mesh(geo('bowl', () => new T3.SphereGeometry(0.24, 24, 16)), bc); l.scale.set(1.2, 0.75, 0.5); l.position.x = sd * 0.25; l.rotation.z = sd * 0.35; g.add(l); }
      g.add(new T3.Mesh(geo('bowc', () => new T3.SphereGeometry(0.11, 16, 12)), bc)); face2(g, onHead(0.55, 0.78, 1.06)); head.add(g); }
    if (h === 'pony') { const t = new T3.Mesh(geo('pony', () => new T3.SphereGeometry(0.3, 24, 16)), hc); t.scale.set(0.8, 1.6, 0.8); t.position.set(0.3, 0.1, -1.0); head.add(t); }
    if (h === 'tuft') for (let i = -1; i <= 1; i++) { const c = new T3.Mesh(geo('tuft', () => new T3.ConeGeometry(0.07, 0.5, 8)), hc); const p = onHead(i * 0.18, 1.35, 1.0); c.position.copy(p); c.rotation.z = -i * 0.4 - 0.2; head.add(c); }
    if (h === 'cap') { const cm = mat(o.capCol || '#e74c3c', { roughness: 0.6 }); cap(-0.1, 1.25, cm, 1.05); const br = new T3.Mesh(geo('brim', () => new T3.CylinderGeometry(0.75, 0.75, 0.06, 32, 1, false, -Math.PI / 2, Math.PI)), cm); br.position.set(0, 0.45, 0.85); br.rotation.x = 0.15; head.add(br); }
    if (h === 'beanie') { const cm = mat(o.capCol || '#3a86ff', { roughness: 0.9, sheen: 1, sheenColor: '#ffffff' }); cap(0, 1.2, cm, 1.06); const ri = new T3.Mesh(geo('beanrim', () => new T3.TorusGeometry(0.95, 0.12, 12, 48)), cm); ri.rotation.x = Math.PI / 2; ri.position.y = 0.36; head.add(ri);
      const pp = new T3.Mesh(geo('pom', () => new T3.SphereGeometry(0.25, 24, 16)), mat('#ffffff', { roughness: 1, sheen: 1 })); pp.position.y = 1.18; head.add(pp); }
    if (h === 'bald') for (const sd of [-1, 1]) { const t = new T3.Mesh(geo('baldt', () => new T3.SphereGeometry(0.22, 16, 12)), mat('#8a8a8a', { roughness: 0.8 })); t.scale.set(0.6, 1, 1); t.position.copy(onHead(sd * 1.45, 0.1, 0.96)); head.add(t); }
    if (h === 'curly') for (let i = 0; i < 14; i++) { const s = new T3.Mesh(geo('curl', () => new T3.SphereGeometry(0.33, 20, 14)), hc); s.position.copy(onHead(-2.2 + i * 0.34, 0.55 + (i % 2) * 0.25, 1.0)); head.add(s); }
  }

  function extras(head, o) {
    if (o.glasses) { for (const sd of [-1, 1]) { const r = new T3.Mesh(geo('lens', () => new T3.TorusGeometry(0.2, 0.03, 8, 32)), INK()); face2(r, onHead(sd * 0.36, 0.02, 1.06)); head.add(r); } const br = stick(0.18, 0.025); br.rotation.z = Math.PI / 2; br.position.copy(onHead(0, 0.02, 1.08)); head.add(br); }
    if (o.mustache) { const m = new T3.Mesh(geo('stache', () => new T3.SphereGeometry(0.2, 24, 16)), mat(o.hairCol || '#2a1f1a')); for (const sd of [-1, 1]) { const c = m.clone(); c.scale.set(1.2, 0.45, 0.5); face2(c, onHead(sd * 0.17, -0.3, 1.0)); c.rotateZ(sd * 0.25); head.add(c); } }
    if (o.goatee) { const g = new T3.Mesh(geo('goat', () => new T3.ConeGeometry(0.08, 0.25, 8)), INK()); g.position.copy(onHead(0, -0.82, 1.0)); g.rotation.x = Math.PI; head.add(g); }
    if (o.panda) for (const sd of [-1, 1]) { const c = new T3.Mesh(geo('pandaR', () => new T3.CircleGeometry(0.2, 24)), new T3.MeshBasicMaterial({ color: '#46325a', transparent: true, opacity: 0.55 })); face2(c, onHead(sd * 0.36, -0.02, 1.004)); head.add(c); }
  }

  // หน้า: สร้างครั้งเดียวต่อแบบ แล้วสลับ
  function buildFace(kind, o = {}) {
    const face = new T3.Group(), ex = 0.36;
    const eye = (sd) => { const p = onHead(sd * ex, 0.02, 0.97);
      if (kind === 'happy' || (kind === 'smug' && sd > 0)) { const e = new T3.Mesh(geo('arcEye', () => new T3.TorusGeometry(0.11, 0.035, 8, 24, Math.PI)), INK()); face2(e, p); e.position.y -= 0.03; face.add(e); }
      else if (kind === 'sleepy' || kind === 'tired') { const e = stick(0.16, 0.03); face2(e, p); e.rotateZ(Math.PI / 2); face.add(e); }
      else if (kind === 'shock') { const w = new T3.Mesh(geo('shockW', () => new T3.SphereGeometry(0.16, 24, 16)), mat('#fff')); w.scale.z = 0.4; face2(w, p); face.add(w); const pu = new T3.Mesh(geo('pupil', () => new T3.SphereGeometry(0.07, 16, 12)), INK()); pu.position.copy(onHead(sd * ex, 0.02, 1.03)); face.add(pu); }
      else { const e = new T3.Mesh(geo('eye', () => new T3.SphereGeometry(0.085, 24, 16)), INK()); e.scale.set(0.85, 1.3, 0.45); face2(e, p); face.add(e);
        const sp = new T3.Mesh(geo('spec', () => new T3.SphereGeometry(0.025, 8, 8)), new T3.MeshBasicMaterial({ color: '#fff' })); sp.position.copy(onHead(sd * ex - 0.03, 0.07, 1.01)); face.add(sp); }
      const bt = { angry: -0.45, determined: -0.35, sad: 0.4, cry: 0.45, tired: 0.2, smug: -0.15 }[kind] || 0, by = kind === 'shock' ? 0.38 : (kind === 'angry' || kind === 'determined') ? 0.24 : 0.3;
      const b = stick(0.2, 0.04); face2(b, onHead(sd * ex, by, 0.99)); b.rotateZ(Math.PI / 2 - sd * bt); face.add(b);
      if (kind === 'cry') { const d = new T3.Mesh(geo('tear', () => new T3.SphereGeometry(0.07, 16, 12)), mat('#7cc8ff', { transmission: 0.3, roughness: 0.1 })); d.scale.y = 1.4; d.position.copy(onHead(sd * ex, -0.15, 1.02)); d.userData.tear = sd; face.add(d); }
      if (kind === 'tired') { const r = new T3.Mesh(geo('bag', () => new T3.TorusGeometry(0.11, 0.02, 6, 16, Math.PI)), mat('#8a7aa8')); face2(r, onHead(sd * ex, -0.12, 1.0)); r.rotateZ(Math.PI); face.add(r); }
    };
    eye(-1); eye(1);
    const mouth = new T3.Group(); face2(mouth, onHead(0, -0.38, 0.95)); face.add(mouth);
    if (kind === 'happy' || kind === 'smug') { const m = new T3.Mesh(geo('smile', () => new T3.TorusGeometry(0.17, 0.035, 8, 24, Math.PI)), INK()); m.rotation.z = Math.PI; m.position.y = 0.06; if (kind === 'smug') { m.rotation.z = Math.PI + 0.3; m.scale.setScalar(0.8); } mouth.add(m); }
    else if (kind === 'sad' || kind === 'cry' || kind === 'tired') { const m = new T3.Mesh(geo('frown', () => new T3.TorusGeometry(0.14, 0.035, 8, 24, Math.PI)), INK()); m.position.y = -0.1; mouth.add(m); }
    else if (kind === 'angry') { for (const sd of [-1, 1]) { const m = stick(0.14, 0.033); m.rotation.z = Math.PI / 2 + sd * 0.35; m.position.set(sd * 0.09, 0, 0); mouth.add(m); } }
    else if (kind !== 'shock') { const m = stick(0.16, 0.035); m.rotation.z = Math.PI / 2; mouth.add(m); }
    const open = new T3.Mesh(geo('open', () => new T3.SphereGeometry(0.12, 24, 16)), mat('#7a1f2a', { roughness: 0.6 })); open.scale.set(1.1, kind === 'shock' ? 1.3 : 0.01, 0.3); mouth.add(open); face.userData.open = open; face.userData.shock = kind === 'shock';
    if (kind === 'happy' || o.blush) for (const sd of [-1, 1]) { const c = new T3.Mesh(geo('blush', () => new T3.CircleGeometry(0.13, 24)), new T3.MeshBasicMaterial({ color: '#ff8aa0', transparent: true, opacity: 0.45 })); c.scale.y = 0.55; face2(c, onHead(sd * 0.58, -0.2, 1.005)); face.add(c); }
    if (kind === 'angry') { const v = new T3.Group(); for (let i = 0; i < 4; i++) { const s = new T3.Mesh(geo('vein', () => new T3.TorusGeometry(0.07, 0.025, 6, 12, Math.PI * 0.8)), mat('#e63946')); s.rotation.z = i * Math.PI / 2; s.position.set(Math.cos(i * Math.PI / 2 + 0.8) * 0.08, Math.sin(i * Math.PI / 2 + 0.8) * 0.08, 0); v.add(s); } face2(v, onHead(0.62, 0.55, 1.02)); face.add(v); }
    if (o.sweat || kind === 'shock') { const d = new T3.Mesh(geo('sweat', () => new T3.SphereGeometry(0.11, 16, 12)), mat('#9fe3ff', { roughness: 0.1, clearcoat: 1 })); d.scale.y = 1.5; d.position.copy(onHead(1.0, 0.45, 1.02)); face.add(d); }
    shadowy(face); return face;
  }

  // ท่าจากระบบ 2 มิติ (มุมแขน: ค่าบวก = กางออก)
  const ARMS = { stand: [0.15, 0.15], walk: [0.15, 0.15], run: [0.6, 0.6], sit: [-0.3, -0.3], point: [0.15, 2.0], wave: [0.15, 2.6], cheer: [2.7, 2.7], shrug: [1.3, 1.3], hold: [0.15, 0.5], type: [-0.35, -0.35], facepalm: [0.15, 2.5], lie: [0.2, 0.2] };
  const FWD = { hold: [0, -1.1], type: [-1.25, -1.25], facepalm: [0, -0.9], shrug: [-0.5, -0.5], point: [0, -0.4], sit: [-0.4, -0.4] };
  function pose(p, ps, fc, t, mouth, o = {}) {
    const u = p.userData, look = u.look; ps = ps || 'stand'; fc = fc || 'neutral';
    const key = fc + (o.sweat ? 's' : ''); if (u.faceKey !== key) { if (u.face) u.head.remove(u.face); if (!u.faces[key]) u.faces[key] = buildFace(fc, Object.assign({}, look, o)); u.face = u.faces[key]; u.head.add(u.face); u.faceKey = key; }
    const [aL, aR] = u.arms, [lL, lR] = u.legs, sw = ps === 'walk' ? Math.sin(t * 8) * 0.45 : ps === 'run' ? Math.sin(t * 14) * 0.8 : 0;
    let A = (ARMS[ps] || ARMS.stand).slice(); if (o.arms) A = [o.arms[0], -o.arms[1]];
    const F = FWD[ps] || [0, 0];
    if (ps === 'wave') A[1] += Math.sin(t * 9) * 0.35; if (ps === 'cheer') { A[0] += Math.sin(t * 10) * 0.15; A[1] += Math.sin(t * 10) * 0.15; }
    const jit = ps === 'type' ? Math.sin(t * 18) * 0.12 : 0;
    aL.rotation.set(F[0] + sw + jit, 0, -A[0] - Math.sin(t * 2.2) * 0.03); aR.rotation.set(F[1] - sw - jit, 0, A[1] + Math.sin(t * 2.2) * 0.03);
    lL.rotation.set(-sw, 0, 0); lR.rotation.set(sw - (o.kick || 0), 0, 0);
    const b = u.body; b.position.set(0, 0, 0); b.rotation.set(0, 0, 0);
    if (ps === 'sit') { lL.rotation.x = lR.rotation.x = -1.45; b.position.y = -0.95; }
    if (ps === 'lie') { b.rotation.z = Math.PI / 2; b.position.set(2.3, 0.95, 0); }
    if (ps === 'run' || ps === 'walk') b.position.y = Math.abs(Math.sin(t * (ps === 'run' ? 14 : 8))) * 0.12;
    else if (o.bob !== false) b.position.y += Math.abs(Math.sin(t * 3 + p.position.x)) * 0.03;
    if (o.rot) { b.rotation.z = -o.rot * 0.6; b.rotation.x = o.rot * 0.5; }
    u.head.rotation.set(fc === 'angry' ? 0.12 : 0, 0, Math.sin(t * 1.3 + p.position.x) * 0.05 + (o.headTilt ? -o.headTilt : 0));
    const f = u.face, op = f.userData.open; const m = Math.max(0, Math.min(1, mouth || 0)); op.scale.y = f.userData.shock ? 1.0 + m * 0.5 : 0.01 + m * 0.9;
    f.traverse(c => { if (c.userData.tear) { const ph = (t * 1.5 + (c.userData.tear > 0 ? 0.5 : 0)) % 1; c.position.copy(onHead(c.userData.tear * 0.36, -0.15 - ph * 0.6, 1.02)); } });
  }

  // แกะ / ปลาในโหล
  function sheep() { const g = new T3.Group(), w = mat('#ffffff', { roughness: 0.9, sheen: 1, sheenColor: '#fff' });
    for (const [x, y, z] of [[-0.8, 1.6, 0], [-0.3, 2.0, 0.2], [0.3, 2.0, 0], [0.8, 1.7, 0.1], [0, 1.5, 0.5], [-0.4, 1.4, -0.4], [0.4, 1.5, -0.4], [0, 1.9, -0.3]]) { const s = new T3.Mesh(geo('wool', () => new T3.SphereGeometry(0.6, 24, 16)), w); s.position.set(x, y, z); g.add(s); }
    for (const [x, z] of [[-0.6, 0.3], [0.6, 0.3], [-0.6, -0.3], [0.6, -0.3]]) { const l = stick(0.8, 0.1); l.position.set(x, 0.5, z); g.add(l); }
    const hd = new T3.Group(); hd.position.set(1.3, 1.9, 0.3); g.add(hd); const hm = new T3.Mesh(geo('sheepH', () => new T3.SphereGeometry(0.5, 24, 16)), mat('#4a4458')); hm.scale.set(0.9, 1.1, 0.9); hd.add(hm);
    for (const sd of [-1, 1]) { const e = new T3.Mesh(geo('seye', () => new T3.SphereGeometry(0.08, 12, 8)), mat('#fff')); e.position.set(0.25, 0.1, sd * 0.2 + 0.25); hd.add(e); }
    const op = new T3.Mesh(geo('open', () => new T3.SphereGeometry(0.12, 24, 16)), mat('#7a1f2a')); op.position.set(0.35, -0.25, 0.3); op.scale.set(1, 0.01, 0.5); hd.add(op); g.userData.open = op; return shadowy(g); }
  function fishbowl() { const g = new T3.Group(); const glass = new T3.Mesh(geo('bowlG', () => new T3.SphereGeometry(1.4, 48, 32, 0, Math.PI * 2, 0.5, 2.4)), new T3.MeshPhysicalMaterial({ color: '#bfe6ff', transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.35, side: T3.DoubleSide })); glass.position.y = 1.4; g.add(glass);
    const water = new T3.Mesh(geo('water', () => new T3.SphereGeometry(1.3, 32, 24, 0, Math.PI * 2, 0.9, 2.2)), new T3.MeshPhysicalMaterial({ color: '#5ab8ff', transparent: true, opacity: 0.35, roughness: 0.1 })); water.position.y = 1.4; g.add(water);
    const fish = new T3.Group(); fish.position.y = 1.3; g.add(fish); g.userData.fish = fish; const fm = mat('#ff9f1c', { clearcoat: 1, roughness: 0.25 });
    const fb = new T3.Mesh(geo('fishB', () => new T3.SphereGeometry(0.5, 24, 16)), fm); fb.scale.set(1.2, 0.85, 0.6); fish.add(fb); const tl = new T3.Mesh(geo('fishT', () => new T3.ConeGeometry(0.35, 0.5, 4)), fm); tl.rotation.z = Math.PI / 2; tl.position.x = 0.75; fish.add(tl);
    const e = new T3.Mesh(geo('eye', () => new T3.SphereGeometry(0.085, 24, 16)), INK()); e.position.set(-0.35, 0.1, 0.28); fish.add(e);
    const op = new T3.Mesh(geo('open', () => new T3.SphereGeometry(0.12, 24, 16)), mat('#7a1f2a')); op.position.set(-0.58, -0.08, 0.15); op.scale.set(0.5, 0.01, 0.5); fish.add(op); g.userData.open = op;
    const base = new T3.Mesh(geo('bowlBase', () => new T3.CylinderGeometry(0.7, 0.8, 0.15, 32)), mat('#c9a26b')); base.position.y = 0.07; g.add(base); return shadowy(g); }

  return { person, pose, sheep, fishbowl, mat, INK, outline, OUTM, shadowy, canvasTex, geo, stick, onHead };
})();
