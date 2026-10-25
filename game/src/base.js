// Phần dùng chung cho mọi màn: tiện ích sprite, vùng chạm, giao diện (♥, bong bóng nhiệm vụ, nút 💡, tay hướng dẫn),
// nhân vật phản ứng, mở màn, cảnh bế, màn thưởng, nạp asset theo màn.
// Mỗi màn (Level1, Level2…) kế thừa BaseLevel và cài: levelNo, keys (asset riêng), resetLevel(), buildRoom(),
// handleLevel(name, g), strongHint(), update(time); tuỳ chọn: onIntro(), blockInput(name), beforeEnding(), endingHide(),
// makeFallback(key) (ảnh tạm khi chưa có ảnh thật), defaultPos, rewardFish, nextLevel, callSfx.
// Toạ độ "thế giới" là khung 1024x1536; máy dài hơn 2:3 thì camera lùi lên (Y0) và nền được kéo dài.
import { playSfx } from './sfx.js';
import { KEYS, phUrl } from './assets.js';

export const D = {
  bg: 0, pend: 9, clock: 10, bird: 11, rug: 12, plant: 13, fly: 14, box: 20, canHidden: 25, cushion: 30, pillow: 31,
  curtain: 35, beam: 36, sua: 40, can: 45, steam: 46, player: 50, fx: 60, hint: 70, zone: 80, ui: 100, uiZone: 150, end: 200,
};
export const MIN_HIT = 115;            // vùng chạm tối thiểu (P6)
export const SWIPE = 40;               // px: dài hơn là vuốt
export const CREAM = 0xfffcf4, BROWN = 0x6b4a3a, SUN = 0xfce39a;

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
      if (!this.textures.exists(k) && this.makeFallback) this.makeFallback(k);
    }
  }

  goNext() {
    if (this.nextLevel === 'Level1') this.registry.set('hearts', 0);
    this.scene.start(this.nextLevel || this.scene.key);
  }

  endingHide() { if (this.sua) this.sua.setVisible(false); }

  buildBg(key) {
    const bg = this.img(key, 0, 0, D.bg);
    bg.setOrigin(0, 0);
    this.bg = bg;
    const tex = this.textures.get(key);
    const src = tex.getSourceImage();
    const strip = Math.round(src.height * 0.05);
    if (!tex.has('top')) tex.add('top', 0, 0, 0, src.width, strip);
    if (!tex.has('bottom')) tex.add('bottom', 0, 0, src.height - strip, src.width, strip);
    this.bgTop = this.add.image(0, 0, key, 'top').setOrigin(0, 1).setDepth(D.bg);
    this.bgBottom = this.add.image(0, 1536, key, 'bottom').setOrigin(0, 0).setDepth(D.bg);
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

  // Đổi tạm gốc về tâm để xoay quanh tâm; trả về hàm khôi phục.
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

  // ---------- dựng cảnh ----------
  create() {
    this.prepareAssets();
    this.zones = {};
    this.phase = 'intro';
    this.locked = true;
    this.frozen = false;
    this.lastTouch = this.time.now;
    this.hints = { h1: false, h2: false, sparkleAt: 0 };
    this.busy = {};
    // scene.restart() dùng lại cùng đối tượng Scene: xoá trạng thái của lượt trước.
    Object.assign(this, { qHopLoop: null, glow: null, glowTw: null, endCt: null,
      handMode: null, press: null, handTimer: null, pawTimer: null, sua: null, dim: null, rewardReadyAt: 0 });
    this.resetLevel();

    this.buildRoom();
    this.buildUI();
    this.layout();
    this.scale.on('resize', this.layout, this);
    this.events.once('shutdown', () => this.scale.off('resize', this.layout, this));
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

  buildUI() {
    // Thanh ♥ (biểu tượng Sữa + 4 ô tiến độ), bong bóng nhiệm vụ, nút gợi ý, tay hướng dẫn, chân gợi ý.
    this.heartIcon = this.img('ui_heart', 72, 60, D.ui, true);
    this.fitWidth(this.heartIcon, 56);
    this.slots = this.add.graphics().setScrollFactor(0).setDepth(D.ui);
    this.slots.lineStyle(4, BROWN, 1).fillStyle(CREAM, 1);
    for (let i = 0; i < 4; i++) { this.slots.fillCircle(145 + i * 62, 60, 22); this.slots.strokeCircle(145 + i * 62, 60, 22); }
    const done = this.levelNo === 1 ? 0 : (this.registry.get('hearts') || 0);
    for (let i = 0; i < Math.min(done, 4); i++) { const h = this.img('ui_heart', 145 + i * 62, 60, D.ui + 1, true).setOrigin(0.5, 0.5); this.fitWidth(h, 40); }

    const ct = this.add.container(512, 640).setScrollFactor(0).setDepth(D.ui + 5).setVisible(false);
    const bub = this.add.image(0, 0, 'ui_speech_bubble');
    const inner = this.A.entries.ui_speech_bubble && this.A.entries.ui_speech_bubble.inner;
    if (inner) bub.setOrigin(inner[0] / bub.width, inner[1] / bub.height); else bub.setOrigin(0.5, 0.42);
    bub.setScale(330 / bub.width);
    const dark = this.add.image(0, 4, 'ui_cat_head_dark');
    dark.setScale(165 / dark.width);
    const face = this.add.image(0, 4, 'sua_face_icon').setAlpha(0);
    face.setScale(165 / face.width);
    const q = this.add.image(0, 10, this.textures.exists('ui_question_mark_white') ? 'ui_question_mark_white' : 'ui_question_mark');
    q.setScale(55 / q.width);
    q.base = q.scale;
    const heart = this.add.image(0, 10, 'ui_heart').setAlpha(0);
    heart.setScale(60 / heart.width);
    ct.add([bub, dark, face, q, heart]);
    this.bubble = { ct, bub, dark, face, q, heart, home: 'center' };

    this.bulb = this.img('ui_bulb_button', 0, 0, D.ui, true);
    this.fitWidth(this.bulb, 130);
    this.bulb.setOrigin(0.5, 0.5);

    this.hand = this.img('ui_hand_pointer', 0, 0, D.hint).setVisible(false);
    this.paw = this.img('ui_hint_paw', 0, 0, D.hint).setVisible(false);
    if (!this.A.entries.ui_hint_paw || this.A.entries.ui_hint_paw.real) this.paw.setOrigin(0.5, 0.1);
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
    this.bulb.setPosition(1024 - 90, H - 90);
    if (this.zones.bulb) this.zones.bulb.setPosition(this.bulb.x, this.bulb.y);
    else this.zone('bulb', this.bulb.getBounds(), D.uiZone, true);
    if (!this.zones.bubble) this.zone('bubble', new Phaser.Geom.Rectangle(380, 10, 150, 110), D.uiZone, true).disableInteractive();
    // Bong bóng như lời nhân vật đang gọi: phía trên bên phải đầu nhân vật, đuôi chĩa xuống trái về phía đầu (toạ độ màn hình).
    this.bubbleCenter = [700, 760 + this.Y0];
    if (this.bubble.home === 'center') this.bubble.ct.setPosition(...this.bubbleCenter);
  }

  // ---------- nhập liệu ----------
  setupInput() {
    this.input.on('gameobjectdown', (p, obj) => {
      if (obj.zoneName) this.press = { name: obj.zoneName, x: p.x, y: p.y };
    });
    this.input.on('pointerdown', (p, over) => {
      if (this.phase === 'ending') { this.skipEnding(); return; }
      if (this.phase === 'reward') { if (this.time.now > this.rewardReadyAt) this.goNext(); return; }
      if (!over.length && !this.locked) this.tapRing(p.worldX, p.worldY);
    });
    this.input.on('pointerup', (p) => {
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
    if (this.locked) return;
    if (this.blockInput && this.blockInput(name)) return;
    if (name === 'bulb') { this.touch(); this.strongHint(); return; }
    if (name === 'bubble') { this.bubbleRemind(); return; }
    this.touch();
    if (this.handMode === 'hint') this.handHide();
    if (name === 'sua') { this.suaTap(); return; }
    this.handleLevel(name, g);
  }

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

  suaTap() {
    if (this.phase !== 'found' || this.ending) return;
    this.startEnding();
  }

  // ---------- nhân vật ----------
  intro() {
    this.cameras.main.fadeIn(300, 0, 0, 0);
    const p = this.player, [x, y] = this.P('player_call');
    this.applyKey(p, 'player_call');
    p.setVisible(true).setPosition(-260, y);
    this.time.delayedCall(300, () => {
      this.tweens.add({ targets: p, x, duration: 900, ease: 'Sine.out' });
      this.tweens.add({ targets: p, y: y - 14, angle: 3, duration: 150, yoyo: true, repeat: 2 });
    });
    this.time.delayedCall(1150, () => { this.sfx(this.callSfx || 'l1_sfx_player_call'); this.hop(p, 10, 300); });
    if (this.onIntro) this.onIntro();
    this.time.delayedCall(2300, () => { if (this.phase === 'search' && p.key === 'player_call') this.hop(p, 10, 300); });
    // Nhân vật đứng gọi tới khi bong bóng nhiệm vụ thu về góc rồi mới lui xuống mép dưới,
    // để lúc bong bóng bật ra (2 giây) vẫn thấy người đang gọi.
    this.time.delayedCall(3600, () => {
      if (p.key !== 'player_call' || !p.visible) return;
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
    const h = p.displayHeight;
    const px = Phaser.Math.Clamp(x, 200, 824);
    const hidden = this.worldBottom + h * (1 - p.originY) + h * p.originY + 10;
    const shown = this.worldBottom + h * 0.45;
    p.setVisible(true).setAngle(0).setPosition(px, hidden);
    this.tweens.chain({ targets: p, tweens: [
      { y: shown, duration: 250, ease: 'Back.out' },
      { y: shown, duration: hold },
      { y: hidden, duration: 250, ease: 'Quad.in' },
    ], onComplete: () => { p.setVisible(false); done && done(); } });
  }

  // ---------- bong bóng nhiệm vụ ----------
  bubbleIntro() {
    const B = this.bubble;
    B.home = 'center';
    B.ct.setVisible(true).setPosition(...this.bubbleCenter).setScale(0);
    this.sfx('sfx_meow_question');
    this.tweens.chain({ targets: B.ct, tweens: [
      { scale: 1.15, duration: 230, ease: 'Quad.out' }, { scale: 1, duration: 120 },
    ] });
    this.qHop = this.time.addEvent({ delay: 700, repeat: 1, callback: () => this.hop(B.q, 14, 300) });
    this.time.delayedCall(1900, () => this.bubbleToCorner());
  }

  bubbleToCorner() {
    const B = this.bubble;
    if (B.home === 'gone') return;
    B.home = 'corner';
    this.tweens.add({ targets: B.ct, x: 455, y: 62, scale: 0.35, duration: 400, ease: 'Quad.inOut' });
    this.zones.bubble.setInteractive();
    if (!this.qHopLoop) this.qHopLoop = this.time.addEvent({ delay: 4000, loop: true, callback: () => {
      if (this.bubble.home === 'corner' && !this.frozen) this.hop(this.bubble.q, 12, 300);
    } });
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
    if (which === 'hand') this.handMode = null;
  }

  // flip: lật ngang bàn tay (ngón trỏ chỉ chéo xuống phải), dùng khi chỉ vào mép trái của vật để tay không che vật.
  handTap([x, y], mode = 'hint', which = 'hand', flip = false) {
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
    const held = this.img('sua_held', 0, 0, 0).setVisible(false);
    const gy = he.grip ? he.grip[1] / hands.height : 0.25;           // điểm nắm (giữa hai lòng bàn tay), tính từ đỉnh ảnh
    const L = (hands.originY - gy) * hands.displayHeight;             // từ điểm nắm tới đáy ảnh tay (k = 1)
    const c = (0.5 - held.originY) * held.displayHeight;              // tâm Sữa nằm dưới nách bao nhiêu (k = 1)
    const bottom = wb + 24;
    let k = (bottom - (wt + 0.55 * H)) / Math.max(1, L - c);
    // Không phóng quá 1,6 lần (màn dài thì Sữa nằm thấp hơn giữa một chút, thay vì tay và mèo to quá khổ).
    k = Phaser.Math.Clamp(k, 1060 / hands.displayWidth, 1.6);
    const A = bottom - L * k;                                        // toạ độ nách = điểm nắm
    const ct = this.add.container(512, A).setDepth(D.end + 5);
    hands.setScale(hands.base * k).setPosition(0, L * k + hands.displayHeight + 60);
    const hb = held.base, sitScale = Math.min(1, sb.height / held.displayHeight);
    held.setPosition(pit[0] - 512, pit[1] - A).setScale(hb * sitScale);
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
      this.hearts(512, A - held.originY * held.displayHeight - 10, 3);
      this.sfx('sua_sfx_meow');
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
    this.rewardReadyAt = this.time.now + 900;
    const H = this.scale.height;
    if (this.endCt) this.tweens.killTweensOf([this.endCt.ct, this.endCt.held, this.endCt.hands]);
    this.tweens.add({ targets: this.dim, alpha: 0.55, duration: 300 });
    if (this.endCt) this.tweens.add({ targets: this.endCt.ct, alpha: 0, duration: 300 });
    this.sfx('sfx_win');

    const face = this.img('sua_face_icon', 512, H * 0.38, D.end + 10, true).setOrigin(0.5, 0.5);
    this.fitWidth(face, 300);
    const fb = face.base;
    face.setScale(0);
    this.tweens.add({ targets: face, scale: fb, duration: 400, ease: 'Back.out' });

    // ♥ N/4: ô thứ N của thanh tiến độ được tô trái tim.
    this.registry.set('hearts', Math.max(this.registry.get('hearts') || 0, this.levelNo));
    const slot = this.img('ui_heart', 145 + (this.levelNo - 1) * 62, 60, D.end + 10, true).setOrigin(0.5, 0.5);
    this.fitWidth(slot, 40);
    const sb = slot.base;
    slot.setScale(0);
    this.heartIcon.setDepth(D.end + 10);
    this.slots.setDepth(D.end + 9);
    this.tweens.add({ targets: slot, scale: sb, duration: 350, delay: 500, ease: 'Back.out', onStart: () => this.sfx('sfx_heart') });

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
    // Chạm bất kỳ đâu để sang màn kế (G2-6).
    this.time.delayedCall(2000, () => {
      if (this.phase !== 'reward') return;
      this.hand.setDepth(D.end + 12).setScrollFactor(0);
      this.handTap([512, H * 0.7], 'guide');
    });
  }
}
