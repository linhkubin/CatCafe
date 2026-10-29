// Phần dùng chung cho mọi màn: tiện ích sprite, vùng chạm, giao diện (♥, bong bóng nhiệm vụ, nút 💡, tay hướng dẫn),
// nhân vật phản ứng, mở màn, cảnh bế, màn thưởng, nạp asset theo màn.
// Thứ bậc: BaseLevel (file này) → ObjectLevel (objects.js: đồ vật khai báo bằng dữ liệu, nhặt / thả túi đồ)
// → RoomsLevel (rooms.js: nhiều phòng, camera trượt ngang). Màn một phòng kế thừa ObjectLevel, màn nhiều phòng RoomsLevel.
// Mỗi màn cài: levelNo, resetLevel(), buildRoom(), handleLevel(name, g) (cú chạm đồ vật viết riêng), strongHint(),
// update(time); tuỳ chọn: onIntro(), blockInput(name), beforeEnding(), endingHide(),
// fallbacks (bảng ảnh tạm vẽ bằng code, xem makeFallback), defaultPos, rewardFish, callSfx, introPose (tư thế mở màn),
// bubblePop (cỡ bong bóng nhiệm vụ lúc bật ra), suaHand (tay chỉ vào mèo khi lộ diện),
// fitHead (trạng thái → key đầu nhóm, co cùng tỉ lệ), túi đồ: onBagDrop(item, x, y), onBagCombine(a, b), onBagTap(item).
// Toạ độ "thế giới" là khung 1024x1536; máy dài hơn 2:3 thì camera lùi lên (Y0) và nền được kéo dài.
import { playSfx } from './sfx.js';
import { KEYS, phUrl } from './assets.js';
import { Progress, LEVELS } from './progress.js';
import { catOf } from './cats.js';

export const D = {
  bg: 0, pend: 9, clock: 10, bird: 11, rug: 12, plant: 13, fly: 14, box: 20, canHidden: 25, cushion: 30, pillow: 31,
  curtain: 35, beam: 36, sua: 40, can: 45, steam: 46, player: 50, fx: 60, hint: 70, zone: 80, ui: 100, uiZone: 150, end: 200,
};
export const MIN_HIT = 115;            // vùng chạm tối thiểu (P6)
export const BANNER = 150;             // dải banner quảng cáo ở đáy màn hình: không đặt UI hay đồ chạm được (leveldesign, quy ước chung)
export const SWIPE = 40;               // px: dài hơn là vuốt
// Túi đồ dùng chung mọi level (G4-33: giống hệt L3, đo trên l3_demo_reveal): thanh neo đáy x 409, phần vẽ rộng 688;
// tâm 4 ô x 205/348/492/635, ô rộng 136. Không đọc từ bảng vị trí từng level.
export const BAG = { barX: 409, barW: 688, slotX: [205, 348, 492, 635], slotW: 136 };
export const CREAM = 0xfffcf4, BROWN = 0x6b4a3a, SUN = 0xfce39a;
export const BUBBLE_CORNER = 0.27;     // cỡ bong bóng mèo "?" khi nằm ở góc trên (so với cỡ giữa màn hình)

// Ảnh thật chưa có điểm neo trong anchors.json: suy neo từ cột Neo, tỉ lệ từ cột Hiển thị của design-art.
export function finalizeEntries(scene, keys) {
  const A = scene.registry.get('assets');
  for (const key of keys) {
    const e = A.entries[key];
    if (!e || !e.auto || e.done || !scene.textures.exists(key)) continue;
    const src = scene.textures.get(key).getSourceImage();
    e.done = true;
    if (/_bg_/.test(key)) { Object.assign(e, { ax: 0, ay: 0, res: src.width / 1024 }); continue; }
    const info = A.info[key] || {};
    const neo = info.neo || 'đáy';
    // Neo "x,y ..." chưa ghi tay: Sữa bế lấy nách ở 42% chiều cao, còn lại lấy giữa đáy.
    const ox = 0.5, oy = neo.startsWith('đỉnh') ? 0 : neo.startsWith('tâm') ? 0.5 : key === 'sua_held' ? 0.42 : 1;
    const d = info.display;
    const res = d ? (d.dim === 'w' ? src.width / d.val : src.height / d.val) : 1.5;
    Object.assign(e, { ax: src.width * ox, ay: src.height * oy, res });
  }
}

export class BaseLevel extends Phaser.Scene {
  constructor(key) { super(key); }

  // ---------- nạp asset theo màn: chỉ tải ảnh của màn này (ảnh chung đã tải ở Boot) ----------
  preload() {
    const A = this.A;
    this.levelKeys = (KEYS[this.levelNo] || []).map(([k]) => k);
    for (const k of this.levelKeys) {
      const e = A.entries[k];
      if (e && !this.textures.exists(k)) this.load.image(k, e.url);
    }
    this.load.on('loaderror', (file) => {
      const e = A.entries[file.key];
      if (file.type === 'image' && e && e.real && A.phMeta[file.key]) {
        Object.assign(e, { real: false, auto: false, ...A.phMeta[file.key] });
        this.load.image(file.key, phUrl(file.key));
      }
    });
    // Cảnh chuyển màn trong lúc tải: nền tối, không chữ.
    this.cameras.main.setBackgroundColor('#2b2420');
  }

  // Sau khi tải: tính neo tự động; key nào vẫn thiếu ảnh thì màn tự vẽ ảnh tạm (makeFallback).
  prepareAssets() {
    finalizeEntries(this, this.levelKeys);
    for (const k of this.levelKeys) {
      if (!this.textures.exists(k)) this.makeFallback(k);
    }
  }

  // Ảnh tạm vẽ bằng code cho key chưa có ảnh thật: this.fallbacks[key] = [rộng, cao, neo, draw(g, w, h)].
  // neo: 'bg' (góc trên trái), 'đỉnh', 'tâm', [x, y] hoặc bỏ trống (giữa đáy). fallbackCanvas = true: draw nhận
  // context canvas 2D thay vì Phaser Graphics (level 5).
  makeFallback(key) {
    const spec = this.fallbacks && this.fallbacks[key];
    if (!spec || this.textures.exists(key)) return;
    const [w, h, neo, draw] = spec;
    if (this.fallbackCanvas) {
      const t = this.textures.createCanvas(key, w, h);
      draw(t.getContext(), w, h);
      t.refresh();
    } else {
      const g = this.make.graphics({ x: 0, y: 0 }, false);
      draw(g, w, h);
      g.generateTexture(key, w, h);
      g.destroy();
    }
    let ax = w / 2, ay = h;
    if (neo === 'bg') { ax = 0; ay = 0; }
    else if (neo === 'đỉnh') ay = 0;
    else if (neo === 'tâm') ay = h / 2;
    else if (Array.isArray(neo)) [ax, ay] = neo;
    this.A.entries[key] = { url: null, real: false, ax, ay, res: 1 };
  }

  // Màn kế tiếp trong LEVELS (null nếu là màn cuối hiện có).
  get nextLevelNo() { const i = LEVELS.indexOf(this.levelNo); return i >= 0 && i < LEVELS.length - 1 ? LEVELS[i + 1] : null; }

  // Màn kết: nút ▶ sang màn kế, nút nhà về menu (tiến độ đã lưu lúc vào màn thưởng).
  goNext() {
    const n = this.nextLevelNo;
    this.scene.start(n ? 'Level' + n : 'Menu');
  }

  endingHide() { if (this.sua) this.sua.setVisible(false); }

  // Nền đặt ở x (màn nhiều phòng: mỗi phòng một nền), kèm dải trên/dưới kéo dài khi máy dài hơn 2:3.
  // Nền đầu tiên (x = 0) gán vào this.bg / bgTop / bgBottom.
  buildBg(key, x = 0) {
    const bg = this.img(key, x, 0, D.bg);
    bg.setOrigin(0, 0);
    const tex = this.textures.get(key);
    const src = tex.getSourceImage();
    const strip = Math.round(src.height * 0.05);
    if (!tex.has('top')) tex.add('top', 0, 0, 0, src.width, strip);
    if (!tex.has('bottom')) tex.add('bottom', 0, 0, src.height - strip, src.width, strip);
    const top = this.add.image(x, 0, key, 'top').setOrigin(0, 1).setDepth(D.bg);
    const bottom = this.add.image(x, 1536, key, 'bottom').setOrigin(0, 0).setDepth(D.bg);
    if (x === 0) Object.assign(this, { bg, bgTop: top, bgBottom: bottom });
    return { b: bg, top, bottom };
  }

  // ---------- tiện ích ----------
  get A() { return this.registry.get('assets'); }

  P(key) { const p = this.A.pos[this.levelNo] || {}; return p[key] || this.defaultPos?.[key] || [512, 768]; }
  pos(key) { return (this.A.pos[this.levelNo] || {})[key] || this.defaultPos?.[key]; }

  has(key) { return this.textures.exists(key) && !!this.A.entries[key]; }

  applyKey(s, key) {
    const e = this.A.entries[key];
    if (!e || !this.textures.exists(key)) return s;
    s.setTexture(key, '__BASE'); // khung gốc (nền có thêm khung 'top'/'bottom' để kéo dài)
    s.setOrigin(e.ax / s.width, e.ay / s.height);
    s.base = 1 / (e.res || 1);
    // D3-17: có "Rộng demo" thì co cho phần vẽ thật rộng đúng như trong tranh demo; trạng thái cùng nhóm co theo key đầu nhóm.
    const head = (this.fitHead && this.fitHead[key]) || key;
    const fw = ((this.A.fit || {})[this.levelNo] || {})[head];
    if (fw && this.textures.exists(head)) s.base = fw / this.trimWidth(head);
    // Đệm lật: ảnh hiện vẽ dẹt như cái khay. Kéo cao cho tấm đệm dựng nghiêng tựa lưng sofa như tranh l1_demo_reveal
    // (cao ≈ 0,47 bề ngang, mép dưới giữ ở mặt ghế). Ảnh đã đủ cao thì không kéo.
    let sy = 1;
    if (key === 'l1_sofa_cushion_lifted' && s.height / s.width < 0.4) sy = 0.47 / (s.height / s.width);
    s.baseY = s.base * sy;
    s.setScale(s.base, s.baseY);
    s.key = key;
    return s;
  }

  img(key, x, y, depth, ui = false) {
    const s = this.add.image(x, y, '__WHITE').setDepth(depth);
    this.applyKey(s, key);
    if (ui) s.setScrollFactor(0);
    return s;
  }

  fitWidth(s, w) { s.base = s.baseY = w / s.width; s.setScale(s.base); return s; }

  // Bề rộng phần vẽ thật (bỏ cột trong suốt hai bên) của texture, px ảnh; đọc pixel một lần rồi nhớ.
  trimWidth(key) {
    const e = this.A.entries[key] || {};
    if (e.trimW) return e.trimW;
    const src = this.textures.get(key).getSourceImage();
    const w = src.width, h = src.height;
    let left = 0, right = w - 1;
    try {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(src, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      const solid = (x) => { for (let y = 0; y < h; y += 2) if (d[(y * w + x) * 4 + 3] > 24) return true; return false; };
      while (left < right && !solid(left)) left++;
      while (right > left && !solid(right)) right--;
    } catch { left = 0; right = w - 1; }
    e.trimW = Math.max(1, right - left + 1);
    return e.trimW;
  }

  // Khung 'trim' ôm sát phần vẽ thật (bỏ lề trong suốt bốn phía) của texture, để icon túi đồ co kín ô.
  iconFrame(key) {
    const tex = this.textures.get(key);
    if (tex.has('trim')) return 'trim';
    const src = tex.getSourceImage(), w = src.width, h = src.height;
    let l = 0, t = 0, r = w - 1, b = h - 1;
    try {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(src, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      l = w; t = h; r = 0; b = 0;
      for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
        if (d[(y * w + x) * 4 + 3] > 24) { if (x < l) l = x; if (x > r) r = x; if (y < t) t = y; if (y > b) b = y; }
      }
      if (r < l) { l = 0; t = 0; r = w - 1; b = h - 1; }
    } catch { /* giữ cả khung */ }
    tex.add('trim', 0, l, t, Math.min(w - l, r - l + 2), Math.min(h - t, b - t + 2));
    return 'trim';
  }

  bagIcon(key, x, y) { return this.add.image(x, y, key, this.iconFrame(key)).setDepth(D.ui + 3).setOrigin(0.5, 0.5); }

  squash(s, done) {
    const b = s.base, by = s.baseY || b;
    this.tweens.chain({ targets: s, tweens: [
      { scaleY: by * 0.88, scaleX: b * 1.04, duration: 80 },
      { scaleY: by * 1.06, scaleX: b * 0.98, duration: 90 },
      { scaleY: by, scaleX: b, duration: 80 },
    ], onComplete: done });
  }

  swap(s, key, done) {
    const b = s.baseY || s.base;
    this.tweens.add({ targets: s, scaleY: b * 0.9, duration: 75, onComplete: () => {
      this.applyKey(s, key);
      const nb = s.baseY;
      s.scaleY = nb * 0.9;
      this.tweens.add({ targets: s, scaleY: nb, duration: 75, onComplete: done });
    } });
  }

  wiggle(s, deg = 4, n = 3, dur = 300) {
    const step = dur / (n * 2);
    const tw = [];
    for (let i = 0; i < n; i++) tw.push({ angle: deg, duration: step }, { angle: -deg, duration: step });
    tw.push({ angle: 0, duration: step });
    this.tweens.chain({ targets: s, tweens: tw });
  }

  hop(s, h = 24, dur = 350) {
    const y = s.y;
    this.tweens.add({ targets: s, y: y - h, duration: dur / 2, yoyo: true, ease: 'Quad.out', onComplete: () => (s.y = y) });
  }

  nudge(s) {
    const x = s.x;
    this.tweens.add({ targets: s, x: x + 4, angle: 2, duration: 100, yoyo: true, onComplete: () => { s.x = x; s.angle = 0; } });
  }

  // ---------- vật con (O2-18/19): vật nằm trên vật đỡ nhún, co giãn, xoay, nảy theo vật đỡ ----------
  // Ghi vị trí của con so với điểm neo của vật đỡ lúc vật đỡ đứng yên; mỗi khung (followKids) khi vật đỡ đang động
  // thì đặt con theo cùng điểm neo, cùng tỉ lệ co giãn và cùng góc. Vật đỡ đứng yên thì con tự do (có thể tự nhún).
  attachTo(child, parent) {
    this.detach(child);
    if (!parent) return child;
    if (parent.restX === undefined) { parent.restX = parent.x; parent.restY = parent.y; }
    child.parentObj = parent;
    child.rel = { x: child.x - parent.restX, y: child.y - parent.restY, a: child.angle };
    (this.kids || (this.kids = [])).push(child);
    return child;
  }

  detach(child) {
    if (!child.parentObj) return;
    child.parentObj = null;
    child.driven = false;
    this.kids = (this.kids || []).filter((c) => c !== child);
  }

  followKids() {
    for (const c of this.kids || []) {
      const p = c.parentObj;
      if (!p || !p.active || !c.active) continue;
      const sx = p.scaleX / p.base, sy = p.scaleY / (p.baseY || p.base), a = p.angle;
      const dx = p.x - p.restX, dy = p.y - p.restY;
      const moving = Math.abs(sx - 1) > 1e-3 || Math.abs(sy - 1) > 1e-3 || Math.abs(a) > 0.01 || Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01;
      if (!moving && !c.driven) continue;
      const r = Phaser.Math.DegToRad(a), ox = c.rel.x * sx, oy = c.rel.y * sy;
      c.x = p.x + ox * Math.cos(r) - oy * Math.sin(r);
      c.y = p.y + ox * Math.sin(r) + oy * Math.cos(r);
      c.setScale(c.base * sx, (c.baseY || c.base) * sy);
      c.angle = c.rel.a + a;
      c.driven = moving;
    }
  }

  // Đổi tạm gốc về tâm để xoay quanh tâm; trả về hàm khôi phục.
  // Khung phần vẽ thật của sprite (bỏ lề trong suốt), toạ độ thế giới; vùng chạm ôm đúng hình đồ vật.
  artRect(s) {
    const f = this.textures.get(s.key).get(this.iconFrame(s.key));
    const left = s.x - s.originX * s.width * s.scaleX, top = s.y - s.originY * s.height * s.scaleY;
    return new Phaser.Geom.Rectangle(left + f.cutX * s.scaleX, top + f.cutY * s.scaleY, f.cutWidth * s.scaleX, f.cutHeight * s.scaleY);
  }

  // Khung dùng khi đặt lại vùng chạm theo sprite (zoneTo): L1–L3 theo khung ảnh, màn nhiều phòng theo phần vẽ (artRect).
  zoneRect(s) { return s.getBounds(); }

  // Đặt lại vùng chạm `name` ôm sprite s (sau khi sprite đổi ảnh / đổi chỗ), không nhỏ hơn MIN_HIT.
  zoneTo(name, s) {
    const z = this.zones[name], b = this.zoneRect(s);
    z.setPosition(b.centerX, b.centerY).setSize(Math.max(MIN_HIT, b.width), Math.max(MIN_HIT, b.height));
    z.input && z.input.hitArea.setSize(z.width, z.height);
  }

  centerOrigin(s) {
    const { originX: ox, originY: oy, x, y } = s;
    const c = s.getCenter();
    s.setOrigin(0.5, 0.5).setPosition(c.x, c.y);
    return () => { s.setOrigin(ox, oy).setPosition(x, y); };
  }

  zone(name, rect, depth = D.zone, ui = false) {
    const w = Math.max(MIN_HIT, rect.width), h = Math.max(MIN_HIT, rect.height);
    const z = this.add.zone(rect.centerX, rect.centerY, w, h).setDepth(depth).setInteractive();
    if (ui) z.setScrollFactor(0);
    z.zoneName = name;
    this.zones[name] = z;
    return z;
  }

  sfx(key, gain = 1) { playSfx(this, key, gain); }

  // Camera đang ở đâu theo chiều ngang (màn một phòng luôn 0).
  get camX() { return this.cameras.main.scrollX; }

  // ---------- dựng cảnh ----------
  create() {
    this.prepareAssets();
    this.time.paused = false; // đồng hồ của Scene giữ trạng thái qua lần khởi động lại: vào màn luôn chạy
    // Khoá mở màn (leveldesign "Mở màn chung"): từ lúc vào màn tới khi bong bóng nhiệm vụ thu về góc xong, mọi cú chạm
    // (đồ vật, mèo, túi đồ, mũi tên, 💡, ⏸) bị bỏ qua, không phản hồi, không tính gợi ý. Dự phòng: tự mở sau 8 giây.
    this.introBusy = true;
    this.time.delayedCall(8000, () => this.endIntroLock());
    this.zones = {};
    this.phase = 'intro';
    this.locked = true;
    this.frozen = false;
    this.lastTouch = this.time.now;
    this.hints = { h1: false, h2: false, sparkleAt: 0 };
    this.busy = {};
    // scene.restart() dùng lại cùng đối tượng Scene: xoá trạng thái của lượt trước.
    Object.assign(this, { qHopLoop: null, glow: null, glowTw: null, endCt: null,
      handMode: null, press: null, handTimer: null, pawTimer: null, sua: null, dim: null, endButtons: null, bag: null, drag: null,
      pausedState: null, pauseUI: null, reactMask: null });
    this.resetLevel();

    this.buildRoom();
    this.buildUI();
    this.layout();
    this.scale.on('resize', this.layout, this);
    // Tự tạm dừng khi chuyển tab / khoá màn hình; quay lại thấy lớp phủ tạm dừng.
    this.game.events.on('hidden', this.onHidden, this);
    this.events.once('shutdown', () => {
      this.scale.off('resize', this.layout, this);
      this.game.events.off('hidden', this.onHidden, this);
    });
    this.setupInput();
    this.intro();
  }

  // Lật ngang quanh điểm neo (giữ chân đứng đúng chỗ): đổi flipX và lấy đối xứng gốc theo chiều ngang.
  face(s, left) {
    const e = this.A.entries[s.key];
    const ox = e ? e.ax / s.width : 0.5;
    s.setFlipX(left).setOrigin(left ? 1 - ox : ox, s.originY);
  }

  dust(x, y) {
    for (let i = 0; i < 4; i++) {
      const g = this.add.circle(x + Phaser.Math.Between(-30, 30), y - Phaser.Math.Between(0, 20), Phaser.Math.Between(8, 14), 0xfffaf0, 0.8).setDepth(D.fx);
      this.tweens.add({ targets: g, scale: 1.8, alpha: 0, y: g.y - 20, duration: 400, delay: i * 40, onComplete: () => g.destroy() });
    }
  }

  // Thanh ♥ của mèo đang tìm: Sữa 4 ô (L1–L4), mèo khác có thể nhiều ô hơn (Mun 6 ô, L5). idx = ô được tô khi thắng màn này.
  // Mèo của màn này và thanh ♥ của nó (cats.js): n ô = số level của mèo, idx = vị trí màn trong nhóm (0 = màn đầu).
  // Vào màn có idx tim, thắng thì tô ô idx. Không phụ thuộc thứ tự chơi.
  get catInfo() { return catOf(this.levelNo); }
  get heartBar() { const c = this.catInfo; return { n: c.levels.length, idx: c.levels.indexOf(this.levelNo), ...c.bar }; }
  get catFace() { return this.catInfo.face; }      // mặt mèo trong bong bóng nhiệm vụ và màn thưởng
  get heldKey() { return this.catInfo.held; }      // mèo trong cảnh bế
  get catMeow() { return this.catInfo.meow; }      // tiếng kêu trong cảnh bế
  get catTapSfx() { return this.catInfo.tapSfx; }  // chạm mèo đã lộ diện

  buildUI() {
    // Thanh ♥ (biểu tượng mèo + các ô tiến độ), bong bóng nhiệm vụ, nút gợi ý, tay hướng dẫn, chân gợi ý.
    const HB = this.heartBar;
    this.heartIcon = this.img('ui_heart', 72, 60, D.ui, true);
    this.fitWidth(this.heartIcon, 56);
    this.slots = this.add.graphics().setScrollFactor(0).setDepth(D.ui);
    this.drawSlots(HB.idx);
    this.heartFills = [];
    for (let i = 0; i < Math.max(0, HB.idx); i++) {
      const h = this.img('ui_heart', HB.x0 + i * HB.step, 60, D.ui + 1, true).setOrigin(0.5, 0.5);
      this.heartFills.push(this.fitWidth(h, HB.heart));
    }
    this.heartBadge = null; // icon nhỏ dưới tim (Mun)
    if (this.catInfo.badge) this.heartBadge = this.fitWidth(this.img(this.catInfo.badge, 72, 108, D.ui, true).setOrigin(0.5, 0.5), 46);

    const ct = this.add.container(512, 640).setScrollFactor(0).setDepth(D.ui + 5).setVisible(false);
    const bub = this.add.image(0, 0, 'ui_speech_bubble');
    const inner = this.A.entries.ui_speech_bubble && this.A.entries.ui_speech_bubble.inner;
    if (inner) bub.setOrigin(inner[0] / bub.width, inner[1] / bub.height); else bub.setOrigin(0.5, 0.42);
    bub.setScale(330 / bub.width);
    const dark = this.add.image(0, 4, 'ui_cat_head_dark');
    dark.setScale(165 / dark.width);
    const face = this.add.image(0, 4, this.catFace).setAlpha(0);
    face.setScale(165 / face.width);
    const q = this.add.image(0, 10, this.textures.exists('ui_question_mark_white') ? 'ui_question_mark_white' : 'ui_question_mark');
    q.setScale(55 / q.width);
    q.base = q.scale;
    const heart = this.add.image(0, 10, 'ui_heart').setAlpha(0);
    heart.setScale(60 / heart.width);
    ct.add([bub, dark, face, q, heart]);
    this.bubble = { ct, bub, dark, face, q, heart, home: 'center' };

    // Nút tạm dừng (leveldesign "Tạm dừng chung"): góc trên phải, tâm (951, 66), rộng 88.
    this.ensureButtons();
    this.pauseBtn = this.img('ui_pause_button', 951, 66, D.ui, true).setOrigin(0.5, 0.5);
    this.fitWidth(this.pauseBtn, 88);
    this.zone('pause', new Phaser.Geom.Rectangle(951 - 60, 66 - 60, 120, 120), D.uiZone, true);

    this.bulb = this.img('ui_bulb_button', 0, 0, D.ui, true);
    this.fitWidth(this.bulb, 130);
    this.bulb.setOrigin(0.5, 0.5);

    this.hand = this.img('ui_hand_pointer', 0, 0, D.hint).setVisible(false);
    this.paw = this.img('ui_hint_paw', 0, 0, D.hint).setVisible(false);
    if (!this.A.entries.ui_hint_paw || this.A.entries.ui_hint_paw.real) this.paw.setOrigin(0.5, 0.1);
  }

  // Vòng tròn rỗng cho các ô chưa có tim (ô 0 … filled − 1 đã có tim: không vẽ vòng).
  drawSlots(filled) {
    const HB = this.heartBar, g = this.slots.clear();
    g.lineStyle(4, BROWN, 1).fillStyle(CREAM, 1);
    for (let i = Math.max(0, filled); i < HB.n; i++) { g.fillCircle(HB.x0 + i * HB.step, 60, HB.r); g.strokeCircle(HB.x0 + i * HB.step, 60, HB.r); }
  }

  layout() {
    const H = this.scale.height;
    this.Y0 = (H - 1536) / 2;
    this.worldBottom = 1536 + this.Y0;
    this.cameras.main.setScroll(0, -this.Y0);
    const s = this.bg.scaleX;
    this.bgTop.setScale(s, Math.max(0.001, (this.Y0 + 2) / this.bgTop.height));
    this.bgBottom.setScale(s, Math.max(0.001, (this.Y0 + 2) / this.bgBottom.height));
    this.bgTop.setVisible(this.Y0 > 0);
    this.bgBottom.setVisible(this.Y0 > 0);
    this.bulb.setPosition(1024 - 90, H - BANNER - 80); // ngay trên dải banner
    if (this.zones.bulb) this.zones.bulb.setPosition(this.bulb.x, this.bulb.y);
    else this.zone('bulb', this.bulb.getBounds(), D.uiZone, true);
    if (!this.zones.bubble) this.zone('bubble', new Phaser.Geom.Rectangle(380, 10, 150, 110), D.uiZone, true).disableInteractive();
    // Bong bóng như lời nhân vật đang gọi: phía trên bên phải đầu nhân vật, đuôi chĩa xuống trái về phía đầu (toạ độ màn hình).
    this.bubbleCenter = [700, 760 + this.Y0];
    if (this.bubble.home === 'center') this.bubble.ct.setPosition(...this.bubbleCenter);
    if (this.bag && this.bag.shown) this.bagLayout();
    if (this.pauseUI) {
      const [dim, ...btns] = this.pauseUI;
      dim.setPosition(512, H / 2).setSize(1024, H);
      btns.forEach((b) => b.setY(H / 2));
    }
  }

  // ---------- nhập liệu ----------
  setupInput() {
    this.input.on('gameobjectdown', (p, obj) => {
      if (obj.zoneName && !this.introBusy) this.press = { name: obj.zoneName, x: p.x, y: p.y };
    });
    this.input.on('pointerdown', (p, over) => {
      if (this.phase === 'ending') { this.skipEnding(); return; }
      if (this.phase === 'reward') return; // màn thưởng: chỉ hai nút nhà / ▶ điều hướng
      if (!over.length && !this.locked && !this.introBusy) this.tapRing(p.worldX, p.worldY);
    });
    this.input.on('pointermove', (p) => this.bagMove(p));
    this.input.on('pointerup', (p) => {
      if (this.drag) { this.bagRelease(p); return; }
      if (!this.press) return;
      const { name, x, y } = this.press;
      this.press = null;
      // khoảng cách theo toạ độ thế giới (độc lập cỡ hiển thị)
      const k = this.cameras.main.zoom || 1;
      const dx = (p.x - x) / k, dy = (p.y - y) / k;
      this.handle(name, Math.hypot(dx, dy) > SWIPE ? { swipe: true, dx, dy } : { swipe: false });
    });
  }

  tapRing(x, y) {
    const g = this.add.graphics().setDepth(D.fx);
    const o = { r: 10, a: 0.6 };
    this.tweens.add({ targets: o, r: 42, a: 0, duration: 250, onUpdate: () => {
      g.clear().lineStyle(4, 0xffffff, o.a).strokeCircle(x, y, o.r);
    }, onComplete: () => g.destroy() });
    this.sfx('sfx_tap');
  }

  touch() {
    this.lastTouch = this.time.now;
    this.hints.h1 = this.hints.h2 = false;
  }

  handle(name, g) {
    if (this.introBusy) return;
    if (name === 'pause') { this.pauseGame(); return; }
    if (this.locked) return;
    if (this.blockInput && this.blockInput(name)) return;
    if (name === 'bulb') { this.touch(); this.strongHint(); return; }
    if (name === 'bubble') { this.bubbleRemind(); return; }
    this.touch();
    if (this.handMode === 'hint') this.handHide();
    if (name === 'sua') { this.suaTap(); return; }
    if (!this.tapProp(name, g)) this.handleLevel(name, g);
  }

  // Đồ vật khai báo bằng dữ liệu (objects.js) xử lý cú chạm trước; true = đã xử lý.
  tapProp() { return false; }

  tipOf(s) { const b = s.getBounds(); return [b.centerX, b.centerY]; }

  // Điểm chỉ vào Sữa: mép trái thân mèo ở khoảng 72% chiều cao ảnh (hông/lưng), xa mặt (Sữa quay mặt sang phải).
  suaPoint() {
    const s = this.sua, key = s.key, w = s.width, h = s.height;
    const py = Math.round(h * 0.72);
    let xl = Math.round(w * 0.25);
    for (let px = 0; px < w; px += 2) {
      if (this.textures.getPixelAlpha(px, py, key, '__BASE') > 128) { xl = px; break; }
    }
    return [s.x + (xl + 8 - s.originX * w) * s.scaleX, s.y + (py - s.originY * h) * s.scaleY];
  }

  // Bật vùng chạm mèo khi cảnh lộ diện xong; gọi lại thì dời vùng chạm sang rect mới (mèo chạy chỗ khác, L5).
  // Tay hướng dẫn chỉ vào mèo tới lần chạm kế tiếp (suaHand: L1, L2; từ L3 không chỉ, nút 💡 vẫn chỉ được).
  get suaHand() { return true; }

  armSua(rect) {
    if (this.phase !== 'found' || this.ending || !rect) return;
    if (this.zones.sua) { this.zones.sua.setPosition(rect.centerX, rect.centerY).setSize(rect.width, rect.height); return; }
    this.zone('sua', rect, D.zone + 10);
    if (this.suaHand) this.handTap(this.suaPoint(), 'hint');
  }

  // Mèo lộ diện phát sáng nhẹ (sáng lên rồi thở đều) tới khi được bế.
  glowOn(s = this.sua) {
    if (this.renderer.type !== Phaser.WEBGL || !s.preFX || this.glow) return;
    this.glow = s.preFX.addGlow(SUN, 0, 0, false, 0.1, 14);
    this.tweens.add({ targets: this.glow, outerStrength: 4, duration: 700, onComplete: () => {
      this.glowTw = this.tweens.add({ targets: this.glow, outerStrength: 1.5, duration: 1000, yoyo: true, repeat: -1 });
    } });
  }

  // 🎁 n con cá khô bung ra từ (x, y) rồi bay về góc phải trên (như màn thưởng). drop: rơi ra thấp (lọ hoa nghiêng, L3).
  fishBurst(x, y, n, drop = false) {
    this.sfx('sfx_clink');
    const tx = this.camX + 1024 - 80, ty = 62 - this.Y0;
    for (let i = 0; i < n; i++) {
      const f = this.img('ui_dried_fish', x, y, D.fx).setOrigin(0.5, 0.5);
      this.fitWidth(f, 56);
      const dx = (i - (n - 1) / 2) * 34, up = drop ? 40 : 110 + (i % 2) * 30;
      this.tweens.chain({ targets: f, tweens: [
        { x: x + dx, y: y - up, angle: dx / 2, duration: 280, ease: 'Quad.out' },
        { x: tx, y: ty, scale: f.base * 0.6, duration: 520, delay: 120 + i * 70, ease: 'Quad.in' },
        { alpha: 0, duration: 120 },
      ], onComplete: () => { f.destroy(); this.sfx('sfx_pickup', 0.6); } });
    }
  }

  suaTap() {
    if (this.phase !== 'found' || this.ending) return;
    this.sfx(this.catTapSfx); // O2-20
    this.startEnding();
  }

  // ---------- nhân vật ----------
  intro() {
    this.cameras.main.fadeIn(300, 0, 0, 0);
    const pose = this.introPose || 'player_call';
    const p = this.player, [x, y] = this.P(pose);
    this.applyKey(p, pose);
    p.setVisible(true).setPosition(-260, y);
    this.time.delayedCall(300, () => {
      this.tweens.add({ targets: p, x, duration: 900, ease: 'Sine.out' });
      this.tweens.add({ targets: p, y: y - 14, angle: 3, duration: 150, yoyo: true, repeat: 2 });
    });
    this.time.delayedCall(1150, () => { this.sfx(this.callSfx || 'l1_sfx_player_call'); this.hop(p, 10, 300); });
    if (this.onIntro) this.onIntro();
    this.time.delayedCall(2300, () => { if (this.phase === 'search' && p.key === pose) this.hop(p, 10, 300); });
    // Nhân vật đứng gọi tới khi bong bóng nhiệm vụ thu về góc rồi mới lui xuống mép dưới,
    // để lúc bong bóng bật ra (2 giây) vẫn thấy người đang gọi.
    this.time.delayedCall(3600, () => {
      if (p.key !== pose || !p.visible) return;
      if (this.onIntroLeave) this.onIntroLeave();
      this.tweens.add({ targets: p, y: this.worldBottom + p.displayHeight, duration: 400, ease: 'Quad.in', onComplete: () => p.setVisible(false).setAngle(0) });
    });
    this.time.delayedCall(2000, () => {
      this.bubbleIntro();
      this.locked = false;
      this.phase = 'search';
      this.touch();
    });
  }

  // Nhân vật trồi lên từ mép dưới ~1 giây rồi lặn (G3).
  react(key, x, hold = 700, done) {
    if (!this.has(key)) { done && done(); return; }
    const p = this.player;
    this.tweens.killTweensOf(p);
    this.applyKey(p, key);
    p.setScale(p.base * 1.2, (p.baseY || p.base) * 1.2); // to hơn cỡ đứng trong cảnh một chút (chủ dự án)
    const h = p.displayHeight;
    const px = Phaser.Math.Clamp(x, 200, 824);
    // Trồi lên từ mép trên dải banner (không lấn vào dải banner), nằm trên túi đồ và các nút (chủ dự án).
    const floor = this.worldBottom - BANNER;
    const hidden = floor + h * (1 - p.originY) + h * p.originY + 10;
    const shown = floor + h * 0.45;
    if (!this.reactMask) this.reactMask = this.make.graphics({ x: 0, y: 0 }, false);
    this.reactMask.clear().fillStyle(0xffffff).fillRect(0, floor - 4000, 1024, 4000);
    p.setMask(this.reactMask.createGeometryMask());
    p.setVisible(true).setAngle(0).setPosition(px, hidden).setDepth(D.ui + 8);
    this.tweens.chain({ targets: p, tweens: [
      { y: shown, duration: 250, ease: 'Back.out' },
      { y: shown, duration: hold },
      { y: hidden, duration: 250, ease: 'Quad.in' },
    ], onComplete: () => { p.setVisible(false).setDepth(D.player).setScale(p.base, p.baseY || p.base).clearMask(true); done && done(); } });
  }

  // ---------- bong bóng nhiệm vụ ----------
  // Bong bóng bật ra: phóng tới `peak` trong `up` ms rồi về `rest` trong `down` ms.
  get bubblePop() { return { peak: 1.15, up: 230, rest: 1, down: 120 }; }

  bubbleIntro() {
    const B = this.bubble, k = this.bubblePop;
    B.home = 'center';
    B.ct.setVisible(true).setPosition(...this.bubbleCenter).setScale(0);
    this.sfx('sfx_meow_question');
    this.tweens.chain({ targets: B.ct, tweens: [
      { scale: k.peak, duration: k.up, ease: 'Quad.out' }, { scale: k.rest, duration: k.down },
    ] });
    this.qHop = this.time.addEvent({ delay: 700, repeat: 1, callback: () => this.hop(B.q, 14, 300) });
    this.time.delayedCall(1900, () => this.bubbleToCorner());
  }

  bubbleToCorner() {
    const B = this.bubble;
    if (B.home === 'gone') return;
    B.home = 'corner';
    this.tweens.add({ targets: B.ct, x: 455, y: 62, scale: BUBBLE_CORNER, duration: 400, ease: 'Quad.inOut', onComplete: () => this.endIntroLock() });
    this.zones.bubble.setInteractive();
    if (!this.qHopLoop) this.qHopLoop = this.time.addEvent({ delay: 4000, loop: true, callback: () => {
      if (this.bubble.home === 'corner' && !this.frozen) this.hop(this.bubble.q, 12, 300);
    } });
  }

  // Bong bóng thu về góc xong lần đầu: mở khoá mở màn, bắt đầu đếm gợi ý từ đây.
  endIntroLock() {
    if (!this.introBusy) return;
    this.introBusy = false;
    this.press = null;
    this.touch();
  }

  bubbleRemind() {
    const B = this.bubble;
    if (B.home !== 'corner' || this.busy.bubble) return;
    this.busy.bubble = true;
    B.home = 'center';
    this.sfx('sfx_meow_question');
    this.tweens.add({ targets: B.ct, x: this.bubbleCenter[0], y: this.bubbleCenter[1], scale: 1, duration: 300, ease: 'Quad.out' });
    this.time.delayedCall(1300, () => { this.busy.bubble = false; this.bubbleToCorner(); });
  }

  bubbleFound() {
    const B = this.bubble;
    B.home = 'gone';
    this.zones.bubble.disableInteractive();
    this.tweens.killTweensOf(B.ct);
    this.tweens.add({ targets: B.ct, x: this.bubbleCenter[0] + 60, y: this.bubbleCenter[1] - 120, scale: 1, duration: 300, ease: 'Quad.out' });
    this.tweens.add({ targets: B.dark, alpha: 0, delay: 250, duration: 300 });
    this.tweens.add({ targets: B.face, alpha: 1, delay: 250, duration: 300 });
    this.tweens.add({ targets: B.q, alpha: 0, delay: 350, duration: 150 });
    this.tweens.add({ targets: B.heart, alpha: 1, delay: 450, duration: 150, onComplete: () => this.sfx('sfx_heart') });
    this.time.delayedCall(800, () => {
      this.hearts(this.bubbleCenter[0] + 60, this.bubbleCenter[1] - 120, 5, true); // lệch lên phải một chút để không che hộp đang ở giữa màn hình
      this.tweens.add({ targets: B.ct, scale: 1.3, alpha: 0, duration: 250, onComplete: () => B.ct.setVisible(false) });
    });
  }

  hearts(x, y, n = 3, screen = false) {
    for (let i = 0; i < n; i++) {
      const h = this.img('ui_heart', x, y, D.end + 20, screen);
      h.setOrigin(0.5, 0.5);
      this.fitWidth(h, 44);
      const ang = -Math.PI / 2 + (i - (n - 1) / 2) * 0.45;
      this.tweens.add({ targets: h, x: x + Math.cos(ang) * 140, y: y + Math.sin(ang) * 160, alpha: 0, scale: h.base * 1.3,
        duration: 800, ease: 'Quad.out', onComplete: () => h.destroy() });
    }
  }

  // ---------- tay hướng dẫn, gợi ý ----------
  handHide(which = 'hand') {
    const s = this[which];
    this.tweens.killTweensOf(s);
    if (this[which + 'Timer']) { this[which + 'Timer'].remove(); this[which + 'Timer'] = null; }
    s.setVisible(false).setAlpha(1).setScale(s.base).setFlipX(false);
    if (s.ox0 !== undefined) s.setOrigin(s.ox0, s.originY);
    if (s.depth0 !== undefined) { s.setDepth(s.depth0); s.depth0 = undefined; }
    if (which === 'hand') this.handMode = null;
  }

  // Làm mẫu kéo-thả: đầu ngón đi từ `from` tới `to` (toạ độ thế giới), nằm trên túi đồ; lặp `times` lần (-1: mãi).
  handDrag(from, to, mode = 'guide', which = 'hand', times = -1) {
    if (which === 'hand' && !this.showHand) return;
    this.handHide(which);
    const s = this[which];
    if (which === 'hand') this.handMode = mode;
    s.depth0 = s.depth;
    s.setDepth(D.ui + 30).setVisible(true);
    const once = { n: 0 };
    const run = () => {
      if (!s.visible || (times >= 0 && once.n++ >= times)) { this.handHide(which); return; }
      s.setPosition(from[0], from[1]).setAlpha(0).setScale(s.base);
      this.tweens.chain({ targets: s, tweens: [
        { alpha: 1, scale: s.base * 0.88, duration: 200 },
        { x: to[0], y: to[1], duration: 800, ease: 'Sine.inOut' },
        { scale: s.base, duration: 150 },
        { alpha: 0, duration: 250, delay: 150 },
        { alpha: 0, duration: 350 },
      ], onComplete: run });
    };
    run();
  }

  // ---------- túi đồ (D3-1, G3-2, G3-3): dải bám mép dưới, 4 ô; kéo món từ ô thả vào cảnh hoặc lên món khác ----------
  // Bộ số chung BAG (G4-33): mọi level cùng chỗ, cùng cỡ như level 3; tâm ô cao hơn đáy dải 90.
  get bagSlotX() { return BAG.slotX; }
  bagX() { return BAG.barX; }
  // Đáy dải túi ngay trên dải banner (cách mép dưới màn hình BANNER + 6).
  bagY() { return this.worldBottom - BANNER - 6; }
  slotPos(i) { return [this.bagSlotX[i], this.bagY() - 90]; }

  bagShow(done) {
    if (this.bag) { done && done(); return; }
    const bar = this.img('ui_bag_bar', this.bagX(), this.bagY(), D.ui - 2);
    bar.setScale(bar.base = bar.baseY = BAG.barW / this.trimWidth('ui_bag_bar'));
    const slots = this.bagSlotX.map((x, i) => {
      const s = this.img('ui_bag_slot', ...this.slotPos(i), D.ui - 1).setOrigin(0.5, 0.5);
      this.fitWidth(s, BAG.slotW);
      const z = this.add.zone(...this.slotPos(i), 135, 135).setDepth(D.ui + 4).setInteractive();
      z.on('pointerdown', (p) => this.bagPress(i, p));
      return { s, z };
    });
    this.bag = { bar, slots, items: [null, null, null, null], shown: true };
    const parts = [bar, ...slots.map((o) => o.s)];
    for (const o of parts) { o.y0 = o.y; o.y += 260; }
    this.sfx('sfx_bag_up');
    this.tweens.add({ targets: parts, y: (o) => o.y0, duration: 500, ease: 'Back.out', onComplete: () => done && done() });
  }

  bagLayout() {
    const B = this.bag;
    B.bar.setY(this.bagY());
    B.slots.forEach((o, i) => { o.s.setPosition(...this.slotPos(i)); o.z.setPosition(...this.slotPos(i)); });
    B.items.forEach((it) => { if (it && it !== (this.drag && this.drag.item)) it.s.setPosition(...this.slotPos(it.i)); });
  }

  bagIconScale(s) { return 116 / Math.max(s.width, s.height); } // icon to gần kín ô 136

  // Món bay theo đường cong từ (x, y) (hoặc từ sprite đang có trong cảnh) vào ô trống đầu tiên.
  bagAdd(key, from, done) {
    const i = this.bag.items.indexOf(null);
    if (i < 0) return null;
    // Icon (khung cắt sát phần vẽ) bắt đầu đúng chỗ và đúng cỡ phần vẽ của sprite trong cảnh, rồi co liên tục về cỡ ô:
    // tâm lấy theo khung cắt sát của chính sprite đó (không theo khung ảnh có lề), scaleX/scaleY nội suy riêng (G4-31).
    let fx, fy;
    if (Array.isArray(from)) [fx, fy] = from;
    else {
      const f = this.textures.get(from.texture.key).get(this.iconFrame(from.texture.key));
      const left = from.x - from.originX * from.width * from.scaleX, top = from.y - from.originY * from.height * from.scaleY;
      fx = left + (f.cutX + f.cutWidth / 2) * from.scaleX;
      fy = top + (f.cutY + f.cutHeight / 2) * from.scaleY;
    }
    const s = this.bagIcon(key, fx, fy);
    if (!Array.isArray(from)) s.setScale(from.scaleX, from.scaleY);
    const it = { key, s, i };
    this.bag.items[i] = it;
    const k = this.bagIconScale(s), [tx, ty] = this.slotPos(i), sx0 = s.scaleX, sy0 = s.scaleY;
    this.tweens.addCounter({ from: 0, to: 1, duration: 500, ease: 'Sine.inOut', onUpdate: (tw) => {
      const t = tw.getValue();
      s.setPosition(fx + (tx - fx) * t, fy + (ty - fy) * t - 180 * Math.sin(Math.PI * t)).setScale(sx0 + (k - sx0) * t, sy0 + (k - sy0) * t);
    }, onComplete: () => {
      s.setPosition(tx, ty).setScale(k);
      if (this.bagLandHop !== false) this.hop(s, 12, 220);
      this.sfx('sfx_pickup');
      done && done(it);
    } });
    return it;
  }

  bagRemove(it, fade = true) {
    if (!it) return;
    this.bag.items[it.i] = null;
    if (fade) this.tweens.add({ targets: it.s, alpha: 0, scale: it.s.scale * 0.6, duration: 200, onComplete: () => it.s.destroy() });
    else it.s.destroy();
  }

  bagReturn(it, wrong = true) {
    const [tx, ty] = this.slotPos(it.i), s = it.s;
    s.setDepth(D.ui + 3);
    this.tweens.add({ targets: s, x: tx, y: ty, scale: this.bagIconScale(s), duration: 300, ease: 'Quad.out', onComplete: () => {
      if (wrong) this.shakeNo(s);
    } });
    if (wrong) this.sfx('sfx_wrong');
  }

  shakeNo(s) {
    const x = s.x;
    this.tweens.chain({ targets: s, tweens: [
      { x: x - 6, duration: 50 }, { x: x + 6, duration: 50 }, { x: x - 6, duration: 50 },
      { x: x + 6, duration: 50 }, { x, duration: 50 },
    ] });
  }

  bagPress(i, p) {
    const it = this.bag && this.bag.items[i];
    if (!it || this.locked || this.introBusy || this.bag.busy || this.phase !== 'search') return;
    this.drag = { item: it, x0: p.worldX, y0: p.worldY, moved: false };
  }

  bagMove(p) {
    const d = this.drag;
    if (!d) return;
    if (!d.moved && Math.hypot(p.worldX - d.x0, p.worldY - d.y0) < 12) return;
    const s = d.item.s;
    if (!d.moved) {
      d.moved = true;
      this.touch();
      if (this.handMode) this.handHide();
      this.handHide('paw');
      s.setDepth(D.ui + 20);
      // Món đang kéo to dần lên đúng cỡ nó sẽ có khi đặt vào cảnh (màn cho biết qua dragScale), không có thì to hơn icon 1,3 lần.
      const target = (this.dragScale && this.dragScale(d.item)) || this.bagIconScale(s) * 1.3;
      this.tweens.add({ targets: s, scale: target, duration: 200, ease: 'Quad.out' });
    }
    s.setPosition(p.worldX, p.worldY - 70); // G3-3: món nằm trên ngón tay một đoạn
    if (this.onBagHover) this.onBagHover(d.item, s.x, s.y);
  }

  bagRelease() {
    const d = this.drag;
    this.drag = null;
    if (this.onBagHover) this.onBagHover(null);
    const it = d.item, s = it.s;
    if (!d.moved) {
      if (this.bagTapFeedback === false) return; // màn tắt phản hồi khi chạm món trong túi (L4, G4-31)
      this.hop(s, 12, 220); this.sfx('sfx_tap'); if (this.onBagTap) this.onBagTap(it); return;
    }
    // Thả lên ô khác có món: ghép.
    const other = this.bag.items.find((o) => o && o !== it && Math.hypot(s.x - this.slotPos(o.i)[0], s.y - this.slotPos(o.i)[1]) < 80);
    if (other) {
      if (this.onBagCombine && this.onBagCombine(it, other)) return;
      this.bagReturn(it);
      this.shakeNo(other.s);
      return;
    }
    if (this.onBagDrop && this.onBagDrop(it, s.x, s.y)) return;
    this.bagReturn(it);
  }

  // Ghép (leveldesign 5.2 `merge`): hai món xoay vào nhau ở giữa, lóe sáng, món mới bật ra ở ô của `b`.
  bagMerge(a, b, key, done) {
    this.bag.busy = true;
    const [mx, my] = [(this.slotPos(a.i)[0] + this.slotPos(b.i)[0]) / 2, this.slotPos(b.i)[1] - 40];
    this.tweens.add({ targets: [a.s, b.s], x: mx, y: my, angle: 360, scale: (s) => s.scale * 0.8, duration: 400, ease: 'Quad.in', onComplete: () => {
      this.bag.items[a.i] = null;
      this.bag.items[b.i] = null;
      a.s.destroy(); b.s.destroy();
      const flash = this.add.circle(mx, my, 20, 0xfffbe6, 1).setDepth(D.ui + 6);
      this.tweens.add({ targets: flash, scale: 5, alpha: 0, duration: 250, onComplete: () => flash.destroy() });
      this.sfx('sfx_merge');
      const s = this.bagIcon(key, mx, my);
      const k = this.bagIconScale(s), it = { key, s, i: b.i };
      this.bag.items[b.i] = it;
      s.setScale(0);
      this.tweens.add({ targets: s, x: this.slotPos(b.i)[0], y: this.slotPos(b.i)[1], scale: k, duration: 300, ease: 'Back.out', onComplete: () => {
        this.bag.busy = false;
        done && done(it);
      } });
    } });
  }

  // flip: lật ngang bàn tay (ngón trỏ chỉ chéo xuống phải), dùng khi chỉ vào mép trái của vật để tay không che vật.
  // Từ level 4 không hiện bàn tay hướng dẫn `ui_hand_pointer` (G4-19, leveldesign 6.4); bàn chân 💡 vẫn dùng.
  get showHand() { return this.levelNo < 4; }

  handTap([x, y], mode = 'hint', which = 'hand', flip = false) {
    if (which === 'hand' && !this.showHand) return;
    this.handHide(which);
    const s = this[which];
    if (which === 'hand') this.handMode = mode;
    if (s.ox0 === undefined) s.ox0 = s.originX;
    s.setFlipX(flip).setOrigin(flip ? 1 - s.ox0 : s.ox0, s.originY);
    s.setVisible(true).setPosition(x, y);
    this.tweens.add({ targets: s, scale: s.base * 0.88, duration: 220, yoyo: true, hold: 120, repeatDelay: 450, repeat: -1 });
  }

  sparkle(target) {
    const b = target.getBounds();
    this.sfx('sfx_sparkle');
    for (let i = 0; i < 3; i++) {
      const s = this.img('ui_sparkle', Phaser.Math.Between(b.left, b.right), Phaser.Math.Between(b.top, b.bottom), D.fx);
      s.setOrigin(0.5, 0.5);
      this.fitWidth(s, 56);
      const sb = s.base;
      s.setScale(0);
      this.tweens.chain({ targets: s, tweens: [
        { scale: sb, angle: 45, duration: 300, delay: i * 120 }, { scale: 0, angle: 90, duration: 400 },
      ], onComplete: () => s.destroy() });
    }
  }

  // ---------- tạm dừng chung (leveldesign "Tạm dừng chung (mọi level)") ----------
  // Ảnh tạm cho 4 nút khi chưa có ảnh thật: nút tròn kem viền nâu, ký hiệu nâu ở giữa.
  ensureButtons() {
    const mk = (key, draw) => {
      if (this.textures.exists(key)) return;
      const g = this.make.graphics({ x: 0, y: 0 }, false);
      g.fillStyle(0xfdf6e8).lineStyle(8, BROWN).fillCircle(100, 100, 90).strokeCircle(100, 100, 90);
      g.fillStyle(BROWN).lineStyle(14, BROWN);
      draw(g);
      g.generateTexture(key, 200, 200);
      g.destroy();
      this.A.entries[key] = { url: null, real: false, ax: 100, ay: 100, res: 1 };
    };
    mk('ui_pause_button', (g) => g.fillRoundedRect(68, 55, 22, 90, 8).fillRoundedRect(110, 55, 22, 90, 8));
    mk('ui_play_button', (g) => g.fillTriangle(78, 52, 78, 148, 150, 100));
    mk('ui_restart_button', (g) => {
      g.beginPath(); g.arc(100, 100, 46, Phaser.Math.DegToRad(-60), Phaser.Math.DegToRad(250), false); g.strokePath();
      g.fillTriangle(118, 40, 150, 66, 112, 78);
    });
    mk('ui_home_button', (g) => {
      g.fillTriangle(48, 100, 100, 52, 152, 100).fillRect(64, 98, 72, 52);
      g.fillStyle(0xfdf6e8).fillRect(90, 118, 20, 32);
    });
  }

  pauseGame() {
    if (this.pausedState || this.phase === 'ending' || this.phase === 'reward') return;
    if (this.drag) { // đang kéo món túi đồ: món về ô
      const it = this.drag.item;
      this.drag = null;
      if (this.onBagHover) this.onBagHover(null);
      it.s.setPosition(...this.slotPos(it.i)).setScale(this.bagIconScale(it.s)).setDepth(D.ui + 3);
    }
    this.press = null;
    // Chỉ dừng các tween đang chạy, để lúc chơi tiếp không bật nhầm tween màn đã tự dừng.
    const running = this.tweens.getTweens().filter((t) => !t.paused);
    running.forEach((t) => t.pause());
    this.pausedState = { locked: this.locked, frozen: this.frozen, at: this.time.now, running };
    this.locked = true;
    this.frozen = true;
    this.time.paused = true;
    this.sound.pauseAll();
    const ctx = this.sound.context;
    if (ctx && ctx.state === 'running') ctx.suspend();

    const H = this.scale.height, d = D.end + 30;
    const dim = this.add.rectangle(512, H / 2, 1024, H, 0x000000, 0.45).setScrollFactor(0).setDepth(d).setInteractive(); // chạm ngoài 3 nút: không làm gì
    const btn = (key, x, fn) => {
      const b = this.img(key, x, H / 2, d + 1, true).setOrigin(0.5, 0.5);
      this.fitWidth(b, 180);
      b.setInteractive().on('pointerup', fn);
      const k = b.base;
      b.setScale(0);
      this.tweens.add({ targets: b, scale: k, duration: 220, ease: 'Back.out' });
      return b;
    };
    // Về menu (trái) · chơi tiếp (giữa) · chơi lại (phải).
    this.pauseUI = [dim, btn('ui_home_button', 252, () => this.goMenu()), btn('ui_play_button', 512, () => this.resumeGame()),
      btn('ui_restart_button', 772, () => this.restartLevel())];
  }

  resumeGame() {
    const s = this.pausedState;
    if (!s) return;
    this.pausedState = null;
    (this.pauseUI || []).forEach((o) => o.destroy());
    this.pauseUI = null;
    // Đồng hồ gợi ý chạy tiếp từ chỗ đã dừng, không đếm lại từ đầu.
    const shift = this.time.now - s.at;
    this.lastTouch += shift;
    if (this.hints.sparkleAt) this.hints.sparkleAt += shift;
    this.time.paused = false;
    s.running.forEach((t) => t.resume());
    const ctx = this.sound.context;
    if (ctx && ctx.state === 'suspended') ctx.resume();
    this.sound.resumeAll();
    this.locked = s.locked;
    this.frozen = s.frozen;
  }

  // Bỏ tạm dừng trước khi rời màn (chơi lại / về menu).
  unfreeze() {
    this.pausedState = null;
    this.time.paused = false;
    const ctx = this.sound.context;
    if (ctx && ctx.state === 'suspended') ctx.resume();
    this.sound.resumeAll();
  }

  // Chơi lại màn từ đầu: túi đồ trống, giữ phần thưởng đã có (registry không đổi).
  restartLevel() {
    this.unfreeze();
    this.scene.restart();
  }

  // Thoát màn về menu chọn level (không tính là qua màn).
  goMenu() {
    this.unfreeze();
    this.sound.stopAll();
    this.scene.start('Menu');
  }

  onHidden() { this.pauseGame(); }

  // ---------- kết màn: cảnh bế chung, màn thưởng ----------
  startEnding() {
    this.phase = 'ending';
    this.locked = true;
    this.handHide();
    this.handHide('paw');
    if (this.beforeEnding) this.beforeEnding();
    if (this.glowTw) this.glowTw.stop();
    if (this.glow) this.sua.preFX.remove(this.glow);
    this.sua.setAngle(0);

    const H = this.scale.height;
    this.dim = this.add.rectangle(512, H / 2, 1024, H, 0x000000, 1).setScrollFactor(0).setDepth(D.end).setAlpha(0);
    this.tweens.add({ targets: this.dim, alpha: 0.4, duration: 300 });

    // Cảnh bế (leveldesign 6.2). Ảnh tay mới: cẳng tay ngắn chéo vào từ hai góc dưới, ống tay chạm mép dưới và hai mép
    // bên của ảnh. Vì vậy cả cụm tay + Sữa được phóng to cùng hệ số k sao cho: ảnh tay rộng hơn màn hình (mép cắt hai bên
    // nằm ngoài màn), đáy ảnh tay nằm dưới mép dưới màn hình thật, và Sữa nằm quanh 55% chiều cao màn hình nếu được.
    const sb = this.sua.getBounds();
    const pit = [this.sua.x, this.sua.y - Math.min(this.sua.displayHeight, 320) * 0.55];
    const wb = this.worldBottom, wt = wb - H;
    const hk = 'player_hands_lift', he = this.A.entries[hk] || {};
    const hands = this.img(hk, 0, 0, 0);
    const held = this.img(this.heldKey, 0, 0, 0).setVisible(false);
    const gy = he.grip ? he.grip[1] / hands.height : 0.25;           // điểm nắm (giữa hai lòng bàn tay), tính từ đỉnh ảnh
    const L = (hands.originY - gy) * hands.displayHeight;             // từ điểm nắm tới đáy ảnh tay (k = 1)
    const c = (0.5 - held.originY) * held.displayHeight;              // tâm Sữa nằm dưới nách bao nhiêu (k = 1)
    const bottom = wb + 24;
    let k = (bottom - (wt + 0.55 * H)) / Math.max(1, L - c);
    // Không phóng quá 1,6 lần (màn dài thì Sữa nằm thấp hơn giữa một chút, thay vì tay và mèo to quá khổ).
    k = Phaser.Math.Clamp(k, 1060 / hands.displayWidth, 1.6);
    const A = bottom - L * k;                                        // toạ độ nách = điểm nắm
    const cx = this.cameras.main.scrollX + 512;                       // giữa màn hình theo camera (màn nhiều phòng trượt ngang)
    const ct = this.add.container(cx, A).setDepth(D.end + 5);
    hands.setScale(hands.base * k).setPosition(0, L * k + hands.displayHeight + 60);
    const hb = held.base, sitScale = Math.min(1, sb.height / held.displayHeight);
    held.setPosition(pit[0] - cx, pit[1] - A).setScale(hb * sitScale);
    ct.add([hands, held]); // O10: tay nằm dưới, Sữa vẽ đè lên tay
    this.endCt = { ct, held, hands };
    const T = (ms, fn) => this.time.delayedCall(ms, () => { if (this.phase === 'ending') fn(); });
    this.tweens.add({ targets: hands, y: L * k, duration: 300, ease: 'Quad.out' });
    T(300, () => {
      this.endingHide();
      held.setVisible(true);
      this.tweens.add({ targets: held, x: 0, y: 0, scaleX: hb * k, scaleY: hb * k, duration: 500, ease: 'Sine.inOut',
        onComplete: () => this.tweens.chain({ targets: held, tweens: [
          { scaleY: hb * k * 1.12, duration: 200 }, { scaleY: hb * k * 1.06, duration: 150 }] }) });
    });
    T(1100, () => {
      // Chỉ Sữa đung đưa quanh nách; tay đứng yên để mép dưới ảnh tay không lộ lên.
      this.tweens.chain({ targets: held, tweens: [
        { angle: 5, duration: 200 }, { angle: -5, duration: 400 }, { angle: 5, duration: 400 }, { angle: 0, duration: 200 },
      ] });
      this.hearts(cx, A - held.originY * held.displayHeight - 10, 3);
      this.sfx(this.catMeow);
      this.sfx('sfx_heart');
    });
    T(1900, () => this.tweens.add({ targets: ct, scale: 1.1, duration: 300 }));
    T(2200, () => this.reward());
  }

  skipEnding() {
    if (this.phase !== 'ending') return;
    this.reward();
  }

  reward() {
    this.phase = 'reward';
    Progress.markDone(this.levelNo); // mở màn kế ngay khi thắng
    const H = this.scale.height;
    if (this.endCt) this.tweens.killTweensOf([this.endCt.ct, this.endCt.held, this.endCt.hands]);
    this.tweens.add({ targets: this.dim, alpha: 0.55, duration: 300 });
    if (this.endCt) this.tweens.add({ targets: this.endCt.ct, alpha: 0, duration: 300 });
    this.sfx('sfx_win');

    const face = this.img(this.catFace, 512, H * 0.38, D.end + 10, true).setOrigin(0.5, 0.5);
    this.fitWidth(face, 300);
    const fb = face.base;
    face.setScale(0);
    this.tweens.add({ targets: face, scale: fb, duration: 400, ease: 'Back.out' });

    // Thanh ♥ góc trên trái nổi lên trên lớp tối; một trái tim bật ra ở mặt mèo, bay vào ô idx, đáp xuống thì nảy nhẹ.
    const HB = this.heartBar, sx = HB.x0 + HB.idx * HB.step;
    this.heartIcon.setDepth(D.end + 10);
    this.slots.setDepth(D.end + 9);
    for (const h of this.heartFills) h.setDepth(D.end + 10);
    if (this.heartBadge) this.heartBadge.setDepth(D.end + 10);
    const slot = this.img('ui_heart', 512, H * 0.38, D.end + 12, true).setOrigin(0.5, 0.5);
    this.fitWidth(slot, HB.heart);
    const sb = slot.base;
    slot.setScale(0);
    this.tweens.chain({ targets: slot, tweens: [
      { scale: sb * 2.6, duration: 250, delay: 450, ease: 'Back.out', onStart: () => this.sfx('sfx_heart') },
      { x: sx, y: 60, scale: sb, duration: 550, ease: 'Quad.in' },
      // Tim đáp xuống: vòng tròn của ô đó tắt, chỉ còn trái tim.
      { scale: sb * 1.35, duration: 120, ease: 'Quad.out', onStart: () => { this.sfx('sfx_heart'); this.drawSlots(HB.idx + 1); } },
      { scale: sb, duration: 180, ease: 'Back.out' },
    ] });

    // Cá khô (level 1: 10, level 2: 15) bay vào góc phải trên.
    const pile = this.img('ui_dried_fish', 1024 - 80, 62, D.end + 10, true).setOrigin(0.5, 0.5);
    this.fitWidth(pile, 90);
    for (let i = 0; i < (this.rewardFish || 10); i++) {
      const f = this.img('ui_dried_fish', 512 + Phaser.Math.Between(-60, 60), H * 0.38 + Phaser.Math.Between(-40, 60), D.end + 11, true).setOrigin(0.5, 0.5);
      this.fitWidth(f, 60);
      f.setAlpha(0);
      this.tweens.add({ targets: f, alpha: 1, x: pile.x, y: pile.y, scale: f.base * 0.6, delay: 700 + i * 90, duration: 500, ease: 'Quad.in',
        onComplete: () => { f.destroy(); this.sfx('sfx_pickup'); this.tweens.add({ targets: pile, scale: pile.base * 1.15, duration: 60, yoyo: true }); } });
    }
    // Sau 2 giây: nút nhà (về menu) và nút ▶ (màn kế), nảy nhẹ khi hiện. Màn cuối hiện có: chỉ nút nhà.
    this.time.delayedCall(2000, () => {
      if (this.phase !== 'reward') return;
      const y = H * 0.38 + 290, next = this.nextLevelNo;
      const btn = (key, x, fn, i) => {
        const b = this.img(key, x, y, D.end + 13, true).setOrigin(0.5, 0.5);
        this.fitWidth(b, 180);
        b.setInteractive().on('pointerup', () => { if (this.endButtons) { this.endButtons = null; this.sfx('sfx_tap'); fn(); } });
        const k = b.base;
        b.setScale(0);
        this.tweens.chain({ targets: b, tweens: [
          { scale: k * 1.12, duration: 240, delay: i * 120, ease: 'Back.out' }, { scale: k, duration: 140, ease: 'Quad.out' },
        ] });
        return b;
      };
      this.endButtons = next
        ? [btn('ui_home_button', 362, () => this.goMenu(), 0), btn('ui_play_button', 662, () => this.goNext(), 1)]
        : [btn('ui_home_button', 512, () => this.goMenu(), 0)];
    });
  }
}
