// Màn chọn level (chủ dự án): chỉ một lưới ô vuông nhỏ đánh số 1, 2, 3…, 4 cột, cuộn dọc khi nhiều màn.
// Trạng thái: đã qua (ô xanh), đang mở (ô nhún nhẹ), chưa mở (ô tối, chạm thì lắc).
import { BANNER, SWIPE, CREAM, BROWN } from './base.js';
import { playSfx } from './sfx.js';
import { Progress, LEVELS } from './progress.js';
import { attachFrame916 } from './frame916.js';

export { LEVELS }; // danh sách màn ở progress.js

const COLS = 4, CARD_W = 170, CARD_H = 170, GAP_X = 210, GAP_Y = 210, TOP = 260;
const BG = 0xf6ead6, DONE = 0xcfe6b8, LOCKED = 0xb9aca2;

export class Menu extends Phaser.Scene {
  constructor() { super('Menu'); }

  create() {
    const H = this.scale.height;
    this.X0 = (this.scale.width - 1024) / 2; // G-SCREEN: màn rộng hơn 9:16 thì lưới vẫn ở giữa
    this.leaving = false; // scene.start('Menu') dùng lại cùng đối tượng Scene
    this.cameras.main.setBackgroundColor(BG);
    this.cameras.main.setScroll(-this.X0, 0);

    this.cards = LEVELS.map((n, i) => this.card(n, 512 + ((i % COLS) - (COLS - 1) / 2) * GAP_X, TOP + Math.floor(i / COLS) * GAP_Y + CARD_H / 2));
    const rows = Math.ceil(LEVELS.length / COLS);
    this.contentBottom = TOP + (rows - 1) * GAP_Y + CARD_H + 60;
    this.maxScroll = Math.max(0, this.contentBottom - (H - BANNER));
    // Cuộn tới hàng có màn đang mở.
    const cur = this.cards.find((c) => c.open && !c.done) || this.cards[this.cards.length - 1];
    this.cameras.main.setScroll(-this.X0, Phaser.Math.Clamp(cur.y - H / 2, 0, this.maxScroll));
    this.setupInput();
    attachFrame916(this); // xem trước khung 9:16 (?frame916=1, phím G)
  }

  card(n, x, y) {
    const open = Progress.isOpen(n), done = Progress.isDone(n);
    const ct = this.add.container(x, y);
    const frame = this.add.graphics();
    frame.fillStyle(!open ? LOCKED : done ? DONE : CREAM, 1).fillRoundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 28);
    frame.lineStyle(6, BROWN, 1).strokeRoundedRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 28);
    ct.add(frame);
    ct.add(this.add.text(0, 4, String(n), { fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif', fontSize: '84px', fontStyle: 'bold',
      color: '#6b4a3a' }).setOrigin(0.5).setAlpha(open ? 1 : 0.5));
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
      if (this.press.moved) this.cameras.main.setScroll(-this.X0, Phaser.Math.Clamp(this.press.sy - dy, 0, this.maxScroll));
    });
    this.input.on('pointerup', (p) => {
      const pr = this.press;
      this.press = null;
      if (!pr || pr.moved) return;
      const c = this.cards.find((c) => Math.abs(p.worldX - c.x) < CARD_W / 2 && Math.abs(p.worldY - c.y) < CARD_H / 2);
      if (c) this.pick(c);
    });
    this.input.on('wheel', (p, over, dx, dy) => {
      this.cameras.main.setScroll(-this.X0, Phaser.Math.Clamp(this.cameras.main.scrollY + dy, 0, this.maxScroll));
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
}

// Vào màn n (thanh ♥ tự tính theo số level trong cats.js).
export function startLevel(scene, n) {
  scene.scene.start('Level' + n);
}
