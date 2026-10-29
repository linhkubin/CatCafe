// Màn chọn level (bản khối, chưa có art riêng): lưới thẻ 3 cột, cuộn dọc khi nhiều màn. Không chữ, không chữ số.
// Mỗi thẻ: ảnh nền của màn làm thumbnail, dưới là số dấu chân = thứ tự màn (5 dấu một hàng).
// Trạng thái: đã qua (dấu tick xanh), đang mở (thẻ nhún nhẹ), chưa mở (tối, ổ khoá, chạm thì lắc).
import { KEYS } from './assets.js';
import { BANNER, SWIPE, CREAM, BROWN } from './base.js';
import { playSfx } from './sfx.js';
import { Progress, LEVELS } from './progress.js';

export { LEVELS }; // danh sách màn ở progress.js

const COLS = 3, CARD_W = 280, CARD_H = 430, GAP_X = 310, GAP_Y = 470, TOP = 300;
const THUMB_W = 256, THUMB_H = 336;
const BG = 0xf6ead6, DONE = 0x8fbf6a;

// Thumbnail = ảnh nền đầu tiên của màn trong KEYS.
const thumbKey = (n) => ((KEYS[n] || []).find(([k]) => /_bg_/.test(k)) || [])[0];

export class Menu extends Phaser.Scene {
  constructor() { super('Menu'); }

  get A() { return this.registry.get('assets'); }

  preload() {
    this.cameras.main.setBackgroundColor('#2b2420');
    for (const n of LEVELS) {
      const k = thumbKey(n), e = k && this.A.entries[k];
      if (e && e.url && !this.textures.exists(k)) this.load.image(k, e.url);
    }
  }

  create() {
    const H = this.scale.height;
    this.leaving = false; // scene.start('Menu') dùng lại cùng đối tượng Scene
    this.cameras.main.setBackgroundColor(BG);
    this.cameras.main.setScroll(0, 0);
    this.ensureIcons();

    // Đầu trang: mặt Sữa trên nền dải kem (đứng yên khi cuộn).
    const head = this.add.graphics().setScrollFactor(0).setDepth(10);
    head.fillStyle(CREAM, 1).fillRect(0, 0, 1024, 190).lineStyle(6, BROWN, 0.35).lineBetween(0, 190, 1024, 190);
    const face = this.add.image(512, 100, 'sua_face_icon').setScrollFactor(0).setDepth(11);
    face.setScale(140 / face.width);
    this.tweens.add({ targets: face, angle: { from: -4, to: 4 }, duration: 1400, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    this.cards = LEVELS.map((n, i) => this.card(n, 512 + ((i % COLS) - 1) * GAP_X, TOP + Math.floor(i / COLS) * GAP_Y + CARD_H / 2));
    const rows = Math.ceil(LEVELS.length / COLS);
    this.contentBottom = TOP + (rows - 1) * GAP_Y + CARD_H + 60;
    this.maxScroll = Math.max(0, this.contentBottom - (H - BANNER));
    // Cuộn tới hàng có màn đang mở.
    const cur = this.cards.find((c) => c.open && !c.done) || this.cards[this.cards.length - 1];
    this.cameras.main.setScroll(0, Phaser.Math.Clamp(cur.y - H / 2, 0, this.maxScroll));
    this.setupInput();
  }

  card(n, x, y) {
    const open = Progress.isOpen(n), done = Progress.isDone(n);
    const ct = this.add.container(x, y);
    const frame = this.add.graphics();
    frame.fillStyle(CREAM, 1).fillRoundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 28);
    frame.lineStyle(6, BROWN, 1).strokeRoundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 28);
    ct.add(frame);

    // Thumbnail: cắt giữa ảnh nền theo tỉ lệ ô; chưa có ảnh thì ô màu.
    const ty = -CARD_H / 2 + 12 + THUMB_H / 2;
    const k = thumbKey(n);
    if (k && this.textures.exists(k)) {
      const t = this.add.image(0, ty, k, '__BASE'); // màn đã chơi có thêm frame 'top'/'bottom' trên cùng texture (buildBg)
      const sw = t.width, sh = t.height, a = THUMB_W / THUMB_H;
      const cw = Math.min(sw, sh * a), ch = cw / a;
      t.setCrop((sw - cw) / 2, (sh - ch) / 2, cw, ch).setScale(THUMB_W / cw);
      if (!open) t.setTint(0x7a6a60);
      ct.add(t);
    } else {
      ct.add(this.add.rectangle(0, ty, THUMB_W, THUMB_H, open ? 0xe9d3b0 : 0x8a7a70));
    }
    const edge = this.add.graphics().lineStyle(4, BROWN, 0.6).strokeRoundedRect(-THUMB_W / 2, ty - THUMB_H / 2, THUMB_W, THUMB_H, 14);
    ct.add(edge);

    // Thứ tự màn: n dấu chân, tối đa 5 một hàng.
    const per = 5, rows = Math.ceil(n / per), sz = rows > 1 ? 0.7 : 1, py0 = CARD_H / 2 - 44 - (rows - 1) * 16;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / per), inRow = Math.min(per, n - r * per), c = i % per;
      const p = this.add.image((c - (inRow - 1) / 2) * 46 * sz, py0 + r * 34, 'ui_menu_paw').setScale(0.42 * sz).setAlpha(open ? 1 : 0.45);
      ct.add(p);
    }

    if (!open) {
      const lock = this.add.image(0, ty, 'ui_menu_lock').setScale(0.9);
      ct.add(lock);
      ct.setAlpha(0.85);
    }
    if (done) {
      const tick = this.add.image(CARD_W / 2 - 30, -CARD_H / 2 + 30, 'ui_menu_done').setScale(0.55);
      ct.add(tick);
    }
    if (open && !done) {
      this.tweens.add({ targets: ct, scale: 1.05, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }
    return { n, x, y, ct, open, done };
  }

  setupInput() {
    this.press = null;
    this.input.on('pointerdown', (p) => { this.press = { x: p.x, y: p.y, sy: this.cameras.main.scrollY, moved: false }; });
    this.input.on('pointermove', (p) => {
      if (!this.press || !p.isDown) return;
      const k = this.cameras.main.zoom || 1, dy = (p.y - this.press.y) / k;
      if (Math.abs(dy) > SWIPE) this.press.moved = true;
      if (this.press.moved) this.cameras.main.setScroll(0, Phaser.Math.Clamp(this.press.sy - dy, 0, this.maxScroll));
    });
    this.input.on('pointerup', (p) => {
      const pr = this.press;
      this.press = null;
      if (!pr || pr.moved) return;
      const c = this.cards.find((c) => Math.abs(p.worldX - c.x) < CARD_W / 2 && Math.abs(p.worldY - c.y) < CARD_H / 2);
      if (c) this.pick(c);
    });
    this.input.on('wheel', (p, over, dx, dy) => {
      this.cameras.main.setScroll(0, Phaser.Math.Clamp(this.cameras.main.scrollY + dy, 0, this.maxScroll));
    });
  }

  pick(c) {
    if (this.leaving) return;
    if (!c.open) {
      playSfx(this, 'sfx_tap');
      this.tweens.add({ targets: c.ct, x: { from: c.x - 14, to: c.x }, duration: 70, repeat: 3, yoyo: true,
        onComplete: () => c.ct.setX(c.x) });
      return;
    }
    this.leaving = true;
    playSfx(this, 'sfx_tap');
    this.tweens.killTweensOf(c.ct);
    this.tweens.add({ targets: c.ct, scale: 0.92, duration: 90, yoyo: true, onComplete: () => startLevel(this, c.n) });
  }

  // Ảnh tạm cho icon menu (Art 2D vẽ sau): dấu chân, ổ khoá, dấu tick. Nút về menu (ui_home_button) ở base.js.
  ensureIcons() {
    const mk = (key, w, h, draw) => {
      if (this.textures.exists(key)) return;
      const g = this.make.graphics({ x: 0, y: 0 }, false);
      draw(g);
      g.generateTexture(key, w, h);
      g.destroy();
    };
    mk('ui_menu_paw', 100, 100, (g) => {
      g.fillStyle(BROWN, 1).fillEllipse(50, 64, 46, 38);
      [[22, 38], [40, 24], [60, 24], [78, 38]].forEach(([x, y]) => g.fillEllipse(x, y, 18, 22));
    });
    mk('ui_menu_lock', 160, 180, (g) => {
      g.lineStyle(18, CREAM, 1).beginPath().arc(80, 78, 38, Math.PI, 0, false).strokePath();
      g.fillStyle(CREAM, 1).fillRoundedRect(20, 74, 120, 96, 18);
      g.lineStyle(6, BROWN, 1).strokeRoundedRect(20, 74, 120, 96, 18);
      g.fillStyle(BROWN, 1).fillCircle(80, 112, 13).fillRect(74, 112, 12, 32);
    });
    mk('ui_menu_done', 120, 120, (g) => {
      g.fillStyle(DONE, 1).fillCircle(60, 60, 54).lineStyle(6, BROWN, 1).strokeCircle(60, 60, 54);
      g.lineStyle(14, CREAM, 1).beginPath().moveTo(32, 62).lineTo(52, 82).lineTo(88, 40).strokePath();
    });
  }
}

// Vào màn n (thanh ♥ tự tính theo số level trong cats.js).
export function startLevel(scene, n) {
  scene.scene.start('Level' + n);
}
