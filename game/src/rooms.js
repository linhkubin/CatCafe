// Màn nhiều phòng (L4, L5): các phòng xếp ngang, mỗi phòng rộng 1024, cách nhau ROOM_W (chừa chỗ dư hai bên khi màn rộng,
// G-SCREEN); camera trượt ngang khi bấm mũi tên ◄ ►.
// Màn con khai báo:
//   get roomBgs()  – ảnh nền từng phòng theo thứ tự trái → phải, ví dụ ['l4_bg_bedroom', 'l4_bg_living', 'l4_bg_study'];
//   get roomOf()   – { key: số phòng } cho P(key) (key không có trong bảng nằm ở phòng 0);
//   get roomIcons() – icon từng phòng trên bản đồ mini: [[key Art vẽ (ui_map_<phòng>), key tạm có sẵn], …];
//   resetLevel()   – đặt this.room (phòng bắt đầu) và this.moving = false.
// Trong buildRoom: buildRoomBgs() thay cho buildBg, buildArrows() chỗ dựng mũi tên, arrowZones() sau cùng các vùng chạm.
// Tuỳ chọn: onRoomEnter(r) chạy khi camera trượt xong; mapBlinkOnEnter(r) quyết định ô bản đồ có nhấp nháy không
// (mặc định: lần đầu vào phòng đó).
// Gợi ý: màn khai báo hintStep() → { arrow: 'left'|'right' } | { sprite } | { item } … ; nút 💡 (strongHint) chung chỉ
// bàn chân vào mũi tên hoặc đồ cần chạm; kiểu khác (kéo-thả…) xử lý trong strongHintStep(h) (trả true nếu đã xử lý).
import { D, BROWN } from './base.js';
import { ObjectLevel } from './objects.js';

// Khoảng cách giữa hai phòng: rộng 1024 + dư tối đa mỗi bên khi màn rộng 3:4 (1365 − 1024) / 2 ≈ 171, để phần dư của phòng
// này (nền kéo giãn) không chồng lên phòng bên cạnh.
export const ROOM_PAD = 171;
export const ROOM_W = 1024 + 2 * ROOM_PAD;
const ARROW = { right: 64, left: 64, y: 760 };       // mũi tên chuyển phòng (A4-4): cách mép màn thật 64, y màn hình (cộng Y0)
const ARROW_W = 110;
// Bản đồ mini góc trên (giữa thanh ♥ và nút ⏸): mỗi phòng một ô x0 + i·step, ô rộng w cao h; icon gói trong iw × ih.
// x0 tính từ mép phải màn thật (bám nút ⏸): ô đầu cách mép phải 464.
const MAP = { right: 464, y: 62, step: 84, w: 76, h: 48, iw: 64, ih: 36 };

export class RoomsLevel extends ObjectLevel {
  get roomOf() { return {}; }
  get roomCount() { return this.roomBgs.length; }

  // Toạ độ trong khung phòng → thế giới (D4-12).
  P(key) { const p = super.P(key); return [p[0] + (this.roomOf[key] || 0) * ROOM_W, p[1]]; }
  W(room, [x, y]) { return [x + room * ROOM_W, y]; }
  R(room, r) { return new Phaser.Geom.Rectangle(r.x + room * ROOM_W, r.y, r.w, r.h); }

  // Vùng chạm đặt lại theo phần vẽ thật của sprite.
  zoneRect(s) { return this.artRect(s); }

  // ---------- nền các phòng ----------
  // Nền cao 2304 (G5-21) đặt lệch trong buildBg chung.
  buildRoomBgs() {
    this.roomBg = this.roomBgs.map((key, i) => this.buildBg(key, i * ROOM_W));
  }

  // ---------- mũi tên chuyển phòng ----------
  buildArrows() {
    this.arrowR = this.img('ui_room_arrow', 0, 0, D.ui, true).setOrigin(0.5, 0.5);
    this.arrowL = this.img('ui_room_arrow', 0, 0, D.ui, true).setOrigin(0.5, 0.5).setFlipX(true);
    this.buildMap();
  }

  // ---------- bản đồ mini (không chữ) ----------
  // Ô đang đứng: khung vàng, icon rõ; ô khác: khung kem, icon mờ. Chưa có ảnh ui_map_<phòng> thì dùng icon tạm.
  buildMap() {
    const g = this.add.graphics().setScrollFactor(0).setDepth(D.ui);
    const cells = this.roomIcons.map(([key, stand], i) => {
      const k = this.has(key) ? key : stand, t = this.add.image(0, MAP.y, k, this.iconFrame(k));
      return t.setScale(Math.min(MAP.iw / t.width, MAP.ih / t.height)).setScrollFactor(0).setDepth(D.ui + 1);
    });
    this.map = { g, cells, blink: null, blinkRoom: -1 };
    this.visited = { [this.room]: true };
    this.drawMap();
  }

  drawMap(flash = 0) {
    const g = this.map.g.clear();
    const x0 = this.scale.width - MAP.right;
    this.map.cells.forEach((c, r) => {
      const x = x0 + r * MAP.step, on = r === this.room, lit = flash && r === this.map.blinkRoom;
      c.setX(x + MAP.w / 2);
      g.fillStyle(lit ? 0xffd36b : on ? 0xfce39a : 0xfffcf4, 1).lineStyle(4, BROWN, 1);
      g.fillRoundedRect(x, MAP.y - MAP.h / 2, MAP.w, MAP.h, 10).strokeRoundedRect(x, MAP.y - MAP.h / 2, MAP.w, MAP.h, 10);
      c.setAlpha(on || lit ? 1 : 0.45);
    });
  }

  // Ô phòng r nhấp nháy ba nhịp.
  blinkMap(r = this.room) {
    let n = 0;
    if (this.map.blink) this.map.blink.remove();
    this.map.blinkRoom = r;
    this.map.blink = this.time.addEvent({ delay: 180, repeat: 5, callback: () => this.drawMap(++n % 2) });
  }

  mapBlinkOnEnter(r) { return !this.visited[r]; }

  arrowZones() {
    this.zone('arrowR', new Phaser.Geom.Rectangle(0, 0, 140, 200), D.uiZone, true);
    this.zone('arrowL', new Phaser.Geom.Rectangle(0, 0, 140, 200), D.uiZone, true);
    this.showArrows();
  }

  // Phòng giữa có cả ◄ ►, phòng đầu chỉ ►, phòng cuối chỉ ◄.
  showArrows() {
    const r = this.room, on = (z, v) => this.zones[z][v ? 'setInteractive' : 'disableInteractive']();
    this.arrowL.setVisible(r > 0);
    this.arrowR.setVisible(r < this.roomCount - 1);
    on('arrowL', r > 0);
    on('arrowR', r < this.roomCount - 1);
    if (this.map) this.drawMap();
  }

  // Chỗ mũi tên trong toạ độ thế giới (bàn chân 💡, lấp lánh).
  arrowWorld(side) { return [this.camX + (side === 'right' ? this.scale.width - ARROW.right : ARROW.left), ARROW.y]; }

  // ---------- gợi ý ----------
  // Mũi tên rung ngang ba nhịp về phía phòng cần sang (gợi ý 8 giây).
  nudgeArrow(side) {
    const a = side === 'left' ? this.arrowL : this.arrowR;
    this.tweens.add({ targets: a, x: a.x + (side === 'right' ? 14 : -14), duration: 160, yoyo: true, repeat: 2 });
  }

  strongHint() {
    this.pressBulb();
    const h = this.hintStep();
    if (!h || (this.strongHintStep && this.strongHintStep(h))) return;
    if (h.arrow) this.pawAt(this.arrowWorld(h.arrow));
    else if (h.sprite) this.pawAt(this.tipOf(h.sprite));
  }

  // Gợi ý 16 giây (idleHints): lấp lánh ở mũi tên phòng cần sang, hoặc icon món kế tiếp trong túi nảy lên, hoặc đồ cần chạm.
  idleSparkle() {
    const h = this.hintStep();
    if (!h) return;
    if (h.arrow) { const [x, y] = this.arrowWorld(h.arrow); this.sparkle({ getBounds: () => new Phaser.Geom.Rectangle(x - 50, y - 70, 100, 140) }); }
    else if (h.item) this.hop(h.item.s, 22, 300);
    else if (h.sprite) this.sparkle(h.sprite);
  }

  // Mũi tên nhấp nháy mời chuyển phòng (side 'left' | 'right'); tắt khi chuyển phòng.
  pulseArrow(side, k = 1.18, duration = 450) {
    const a = side === 'left' ? this.arrowL : this.arrowR;
    this.arrowPulse = this.tweens.add({ targets: a, scale: a.base * k, duration, yoyo: true, repeat: -1 });
  }

  layout() {
    super.layout();
    this.cameras.main.setScroll(this.room * ROOM_W - this.X0, -this.Y0);
    const ay = ARROW.y + this.Y0, rx = this.scale.width - ARROW.right;
    this.arrowR.setPosition(rx, ay);
    this.arrowL.setPosition(ARROW.left, ay);
    this.fitWidth(this.arrowR, ARROW_W);
    this.fitWidth(this.arrowL, ARROW_W);
    this.zones.arrowR.setPosition(rx, ay);
    this.zones.arrowL.setPosition(ARROW.left, ay);
    if (this.map) this.drawMap();
    if (this.bag) this.bagLayout();
  }

  // Chạm mũi tên: sang phòng bên trái / phải (đang trượt thì bỏ qua). Còn lại: đồ vật khai báo, rồi handleLevel.
  tapProp(name, g) {
    if (name === 'arrowR' || name === 'arrowL') {
      if (!this.moving) this.goRoom(this.room + (name === 'arrowR' ? 1 : -1));
      return true;
    }
    return super.tapProp(name, g);
  }

  // ---------- chuyển phòng: camera trượt 0,4 giây ----------
  goRoom(r) {
    if (r < 0 || r >= this.roomCount || r === this.room || this.moving) return;
    this.moving = true;
    this.handHide();
    if (this.arrowPulse) {
      this.arrowPulse.stop();
      this.arrowPulse = null;
      this.fitWidth(this.arrowL, ARROW_W);
      this.fitWidth(this.arrowR, ARROW_W);
    }
    this.taught.arrow = true;
    this.room = r;
    this.sfx('sfx_tap');
    this.showArrows();
    this.tweens.add({ targets: this.cameras.main, scrollX: r * ROOM_W - this.X0, duration: 400, ease: 'Sine.inOut',
      onUpdate: () => { if (this.bag) this.bagLayout(); },
      onComplete: () => {
        this.moving = false;
        if (this.bag) this.bagLayout();
        this.touch();
        if (this.mapBlinkOnEnter(r)) this.blinkMap(r);
        this.visited[r] = true;
        if (this.onRoomEnter) this.onRoomEnter(r);
      } });
  }
}
