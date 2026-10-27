// Bộ chơi thử tự động trong trình duyệt (dùng khi khung trình duyệt bị ẩn, requestAnimationFrame không chạy).
// Nạp trong console của trang game: await import('/game/tools/play_harness.js')
// - Dừng vòng lặp thật, tự đẩy khung hình: adv(ms). Tween đi theo thời gian giả (không theo Date.now).
// - go('Level3'): vào thẳng màn. tap(x, y), drag(x0, y0, x1, y1): toạ độ thế giới 1024x1536.
// - compare('start' | 'reveal'): trái = game chồng demo 50%, phải = demo chồng game 55% (đè lên trang để chụp). hideCmp().
// - tb(sprite): khung bao phần vẽ thật của sprite (toạ độ thế giới).
// - Màn nhiều phòng (level 4): compare/match so với phòng camera đang đứng (toạ độ x trừ camera.scrollX).
const g = window.__meoGame;
g.loop.sleep();
Phaser.Tweens.TweenManager.prototype.getDelta = function () { return 16.67; };
const mc = new MessageChannel();
const tick = () => new Promise((r) => { mc.port1.onmessage = () => r(); mc.port2.postMessage(0); });
let T = performance.now();
const adv = (ms) => { const n = Math.ceil(ms / 16.67); for (let i = 0; i < n; i++) { T += 16.67; g.step(T, 16.67); } };
const scene = () => g.scene.getScenes(false).find((s) => s.scene.key.startsWith('Level') && s.sys.settings.status === 5);
const go = async (k) => {
  // Chờ Boot nạp xong ảnh chung (Boot tự chuyển sang màn đầu).
  for (let i = 0; i < 2000 && g.scene.getScene('Boot').sys.settings.status <= 5; i++) { adv(17); await tick(); }
  const target = g.scene.getScene(k);
  for (const s of g.scene.getScenes(true)) if (s !== target) s.scene.stop();
  if (target.sys.settings.status === 5) target.scene.restart(); else g.scene.start(k);
  for (let i = 0; i < 3; i++) { adv(17); await tick(); }
  const t0 = performance.now(); // ảnh màn nạp thật (bất đồng bộ): chờ tối đa 30 giây
  while (performance.now() - t0 < 30000) { adv(17); await tick(); if (target.sys.settings.status === 5 && target.player) break; }
};
const ptr = (type, wx, wy) => {
  const cv = g.canvas, r = cv.getBoundingClientRect(), Y0 = scene().Y0 || 0;
  const cx = r.left + (wx * r.width) / g.scale.width, cy = r.top + ((wy + Y0) * r.height) / g.scale.height;
  cv.dispatchEvent(new MouseEvent(type, { clientX: cx, clientY: cy, bubbles: true, button: 0, buttons: type === 'mouseup' ? 0 : 1 }));
};
const tap = (x, y) => { ptr('mousedown', x, y); adv(50); ptr('mouseup', x, y); adv(50); };
const drag = (x0, y0, x1, y1) => {
  ptr('mousedown', x0, y0); adv(30);
  for (let k = 1; k <= 10; k++) { ptr('mousemove', x0 + ((x1 - x0) * k) / 10, y0 + ((y1 - y0) * k) / 10); adv(20); }
  ptr('mouseup', x1, y1); adv(50);
};
// Tên demo: 'start' | 'reveal' (level 3) hoặc tên file đầy đủ như 'l4_demo_living'.
const demoUrl = (w) => '/art/out/demo/' + (w.includes('_demo_') ? w : 'l3_demo_' + w) + '.png';
const load = (u) => new Promise((r) => { const im = new Image(); im.onload = () => r(im); im.src = u; });
const demo = {};
const compare = async (which) => {
  demo[which] = demo[which] || await load(demoUrl(which));
  let c = document.getElementById('cmp');
  if (!c) {
    c = document.createElement('canvas'); c.id = 'cmp'; c.width = 1024; c.height = 768;
    c.style.cssText = 'position:fixed;left:0;top:0;width:1024px;height:768px;z-index:99;background:#222';
    document.body.appendChild(c);
  }
  const x = c.getContext('2d');
  const img = await new Promise((res) => { g.renderer.snapshot((im) => (im.complete ? res(im) : (im.onload = () => res(im)))); adv(17); });
  x.clearRect(0, 0, 1024, 768);
  x.globalAlpha = 1; x.drawImage(img, 0, 0, 512, 768);
  x.globalAlpha = 0.5; x.drawImage(demo[which], 0, 0, 512, 768);
  x.globalAlpha = 1; x.drawImage(demo[which], 512, 0, 512, 768);
  x.globalAlpha = 0.55; x.drawImage(img, 512, 0, 512, 768);
  x.globalAlpha = 1;
  c.style.display = 'block';
};
// zoomCmp(which, x, y, w, h): phóng một vùng (toạ độ thế giới): game + demo 50% | game | demo, lưới 20px (số mỗi 100px).
const zoomCmp = async (which, rx, ry, rw, rh) => {
  demo[which] = demo[which] || await load(demoUrl(which));
  let c = document.getElementById('cmp');
  if (!c) { await compare(which); c = document.getElementById('cmp'); }
  const img = await new Promise((res) => { g.renderer.snapshot((im) => (im.complete ? res(im) : (im.onload = () => res(im)))); adv(17); });
  const x = c.getContext('2d'), k = Math.min(340 / rw, 768 / rh), Y0 = scene().Y0 || 0;
  x.clearRect(0, 0, 1024, 768);
  x.drawImage(img, rx, ry + Y0, rw, rh, 0, 0, rw * k, rh * k);
  x.globalAlpha = 0.5; x.drawImage(demo[which], rx, ry, rw, rh, 0, 0, rw * k, rh * k); x.globalAlpha = 1;
  x.drawImage(img, rx, ry + Y0, rw, rh, 342, 0, rw * k, rh * k);
  x.drawImage(demo[which], rx, ry, rw, rh, 684, 0, rw * k, rh * k);
  x.strokeStyle = 'rgba(255,0,0,0.6)'; x.fillStyle = 'red'; x.font = '14px monospace';
  for (let gy = Math.ceil(ry / 20) * 20; gy < ry + rh; gy += 20) for (const ox of [0, 342, 684]) {
    const py = (gy - ry) * k; x.beginPath(); x.moveTo(ox, py); x.lineTo(ox + rw * k, py); x.stroke(); if (gy % 100 === 0) x.fillText(gy, ox + 2, py - 2);
  }
  for (let gx = Math.ceil(rx / 20) * 20; gx < rx + rw; gx += 20) for (const ox of [0, 342, 684]) {
    const px = ox + (gx - rx) * k; x.beginPath(); x.moveTo(px, 0); x.lineTo(px, rh * k); x.stroke(); if (gx % 100 === 0) x.fillText(gx, px + 2, 14);
  }
  c.style.display = 'block';
};
// sideBySide(which): trái = game, phải = tranh demo (không chồng).
const sideBySide = async (which) => {
  demo[which] = demo[which] || await load(demoUrl(which));
  if (!document.getElementById('cmp')) await compare(which);
  const c = document.getElementById('cmp'), x = c.getContext('2d');
  const img = await new Promise((res) => { g.renderer.snapshot((im) => (im.complete ? res(im) : (im.onload = () => res(im)))); adv(17); });
  x.clearRect(0, 0, 1024, 768); x.drawImage(img, 0, 0, 512, 768); x.drawImage(demo[which], 512, 0, 512, 768);
  c.style.display = 'block';
};
const hideCmp = () => { const c = document.getElementById('cmp'); if (c) c.style.display = 'none'; };
const tb = (s) => {
  const src = s.texture.getSourceImage(), c = document.createElement('canvas');
  c.width = src.width; c.height = src.height;
  const x = c.getContext('2d'); x.drawImage(src, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  let l = c.width, t = c.height, r = 0, b = 0;
  for (let y = 0; y < c.height; y += 2) for (let xx = 0; xx < c.width; xx += 2) {
    if (d[(y * c.width + xx) * 4 + 3] > 24) { l = Math.min(l, xx); r = Math.max(r, xx); t = Math.min(t, y); b = Math.max(b, y); }
  }
  const sx = s.flipX ? -s.scaleX : s.scaleX;
  const ox = s.x - s.originX * s.width * s.scaleX, oy = s.y - s.originY * s.height * s.scaleY;
  const xs = [ox + l * s.scaleX, ox + r * s.scaleX].map(Math.round);
  return sx < 0 ? null : [xs[0], Math.round(oy + t * s.scaleY), xs[1], Math.round(oy + b * s.scaleY)];
};
// match(sprite, 'start'|'reveal'): dò dịch (dx, dy) và hệ số co k (quanh neo) để sprite khớp tranh demo nhất.
// err0 = sai số ở chỗ hiện tại, err = sai số sau khi dời; dx, dy là số cần cộng vào X, Y trong bảng vị trí.
const dpx = {};
const match = async (s, which, R = 60) => {
  if (!dpx[which]) {
    const im = await load(demoUrl(which)), c = document.createElement('canvas');
    c.width = 1024; c.height = 1536;
    const x = c.getContext('2d'); x.drawImage(im, 0, 0, 1024, 1536);
    dpx[which] = x.getImageData(0, 0, 1024, 1536).data;
  }
  const D = dpx[which], src = s.texture.getSourceImage(), c = document.createElement('canvas');
  c.width = src.width; c.height = src.height;
  const cx = c.getContext('2d'); cx.drawImage(src, 0, 0);
  const P = cx.getImageData(0, 0, c.width, c.height).data, pts = [];
  const st = Math.max(2, Math.round(Math.max(src.width, src.height) / 120));
  for (let y = 0; y < src.height; y += st) for (let x = 0; x < src.width; x += st) {
    const i = (y * src.width + x) * 4;
    if (P[i + 3] > 200) pts.push([x - s.originX * src.width, y - s.originY * src.height, P[i], P[i + 1], P[i + 2]]);
  }
  const sc = Math.abs(s.scaleX), sy = s.scaleY, fl = s.flipX ? -1 : 1, ox = scene().cameras.main.scrollX;
  const err = (dx, dy, k) => {
    let e = 0;
    for (const p of pts) {
      const X = Math.round(s.x - ox + dx + fl * p[0] * sc * k), Y = Math.round(s.y + dy + p[1] * sy * k);
      if (X < 0 || Y < 0 || X >= 1024 || Y >= 1536) { e += 300; continue; }
      const i = (Y * 1024 + X) * 4;
      e += Math.abs(D[i] - p[2]) + Math.abs(D[i + 1] - p[3]) + Math.abs(D[i + 2] - p[4]);
    }
    return e / pts.length;
  };
  let best = null;
  for (let k = 0.8; k <= 1.3; k += 0.05) for (let dy = -R; dy <= R; dy += 4) for (let dx = -R; dx <= R; dx += 4) {
    const e = err(dx, dy, k); if (!best || e < best.e) best = { dx, dy, k, e };
  }
  const b0 = best;
  for (let k = b0.k - 0.04; k <= b0.k + 0.04; k += 0.01) for (let dy = b0.dy - 4; dy <= b0.dy + 4; dy++) for (let dx = b0.dx - 4; dx <= b0.dx + 4; dx++) {
    const e = err(dx, dy, k); if (e < best.e) best = { dx, dy, k, e };
  }
  return { dx: best.dx, dy: best.dy, k: +best.k.toFixed(2), err: Math.round(best.e), err0: Math.round(err(0, 0, 1)) };
};
// Chơi Level 3 tới lúc lộ diện (hộp lật ngửa, Sữa trong hộp).
const playToFound = async () => {
  await go('Level3'); adv(4500);
  const L = scene();
  tap(...L.tipOf(L.scissors)); adv(1500);
  drag(...L.slotPos(0), L.box.x, L.box.y - 80); adv(2600);
  // Lắp 4 mảnh cột cào theo thứ tự từ dưới lên vào hình mờ trên thảm.
  for (let n = 0; n < 6 && L.stage === 'build'; n++) {
    drag(...L.slotPos(L.partItem().i), ...L.partCenter(L.buildIdx)); adv(300);
  }
  adv(4500);
  tap(L.box.x, L.box.y - 80); adv(2500);
  return L.stage;
};
// shot('art/review/x.jpg', demo?): lưu ảnh game (có demo thì game | demo cạnh nhau) qua dev_server POST /save (chỉ ghi art/review/).
const shot = async (path, which) => {
  let c;
  if (which) { await sideBySide(which); c = document.getElementById('cmp'); hideCmp(); }
  else {
    const img = await new Promise((res) => { g.renderer.snapshot((im) => (im.complete ? res(im) : (im.onload = () => res(im)))); adv(17); });
    c = document.createElement('canvas'); c.width = 512; c.height = 768; c.getContext('2d').drawImage(img, 0, 0, 512, 768);
  }
  const r = await fetch('/save?' + path, { method: 'POST', body: c.toDataURL('image/jpeg', 0.85) });
  return r.status;
};
Object.assign(window, { adv, go, tap, drag, compare, zoomCmp, sideBySide, hideCmp, tb, scene, match, playToFound, shot });
export default true;
