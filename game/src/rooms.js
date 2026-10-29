// Màn nhiều phòng (L4, L5): các phòng xếp ngang, mỗi phòng rộng 1024; camera trượt ngang khi bấm mũi tên ◄ ►.
// Màn con khai báo:
//   get roomBgs()  – ảnh nền từng phòng theo thứ tự trái → phải, ví dụ ['l4_bg_bedroom', 'l4_bg_living', 'l4_bg_study'];
//   get roomOf()   – { key: số phòng } cho P(key) (key không có trong bảng nằm ở phòng 0);
//   resetLevel()   – đặt this.room (phòng bắt đầu) và this.moving = false.
// Trong buildRoom: buildRoomBgs() thay cho buildBg, buildArrows() chỗ dựng mũi tên, arrowZones() sau cùng các vùng chạm.
// Tuỳ chọn: onRoomEnter(r) chạy khi camera trượt xong.
// Gợi ý: màn khai báo hintStep() → { arrow: 'left'|'right' } | { sprite } | { item } … ; nút 💡 (strongHint) chung chỉ
// bàn chân vào mũi tên hoặc đồ cần chạm; kiểu khác (kéo-thả…) xử lý trong strongHintStep(h) (trả true nếu đã xử lý).
import { D } from './base.js';
import { ObjectLevel } from './objects.js';

export const ROOM_W = 1024;
const ARROW = { right: [960, 760], left: [64, 760] }; // mũi tên chuyển phòng (A4-4), toạ độ màn hình (y cộng Y0)
const ARROW_W = 110;

export class RoomsLevel extends ObjectLevel {
  get roomOf() { return {}; }
  get roomCount() { return this.roomBgs.length; }

  // Toạ độ trong khung phòng → thế giới (D4-12).
  P(key) { const p = super.P(key); return [p[0] + (this.roomOf[key] || 0) * ROOM_W, p[1]]; }
  W(room, [x, y]) { return [x + room * ROOM_W, y]; }
  R(room, r) { return new Phaser.Geom.Rectangle(r.x + room * ROOM_W, r.y, r.w, r.h); }

  // Vùng chạm đặt lại theo phần vẽ thật của sprite.
  zoneRect(s) { return this.artRect(s); }

  // Nhân vật đi vào từ mép trái phòng đang đứng.
  intro() {
    super.intro();
    this.player.setX(this.camX - 260);
  }

  // ---------- túi đồ đi theo camera (D4-13) ----------
  get bagSlotX() { return super.bagSlotX.map((x) => x + this.camX); }
  bagX() { return super.bagX() + this.camX; }
  bagLayout() { super.bagLayout(); this.bag.bar.setX(this.bagX()); }

  // ---------- nền các phòng ----------
  // Nền thật cao (G5-21: 1024x2304, vùng chơi 1536 ở giữa): đặt lệch lên cho vùng chơi khớp y 0–1536, không kéo giãn dải mép.
  buildRoomBgs() {
    this.roomBg = this.roomBgs.map((key, i) => this.buildBg(key, i * ROOM_W));
    this.tallBg = {};
    this.roomBgs.forEach((key, i) => {
      const src = this.textures.get(key).getSourceImage(), h = (src.height * 1024) / src.width;
      if (h > 1536 + 100) { this.roomBg[i].b.setOrigin(0, (h - 1536) / 2 / h); this.tallBg[key] = true; }
    });
  }

  // ---------- mũi tên chuyển phòng ----------
  buildArrows() {
    this.arrowR = this.img('ui_room_arrow', 0, 0, D.ui, true).setOrigin(0.5, 0.5);
    this.arrowL = this.img('ui_room_arrow', 0, 0, D.ui, true).setOrigin(0.5, 0.5).setFlipX(true);
  }

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
  }

  arrowWorld(side) { return this.W(this.room, ARROW[side]); }

  // ---------- gợi ý ----------
  // Mũi tên rung ngang ba nhịp về phía phòng cần sang (gợi ý 8 giây).
  nudgeArrow(side) {
    const a = side === 'left' ? this.arrowL : this.arrowR;
    this.tweens.add({ targets: a, x: a.x + (side === 'right' ? 14 : -14), duration: 160, yoyo: true, repeat: 2 });
  }

  // Bàn chân 💡 nhấp vào điểm pt trong 2,5 giây (không có bàn tay hướng dẫn từ L4).
  pawAt(pt) {
    this.handTap(pt, 'hint', 'paw');
    this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw'));
  }

  strongHint() {
    this.tweens.add({ targets: this.bulb, scale: this.bulb.base * 0.9, duration: 90, yoyo: true });
    const h = this.hintStep();
    if (!h || (this.strongHintStep && this.strongHintStep(h))) return;
    if (h.arrow) this.pawAt(this.arrowWorld(h.arrow));
    else if (h.sprite) this.pawAt(this.tipOf(h.sprite));
  }

  // Mũi tên nhấp nháy mời chuyển phòng (side 'left' | 'right'); tắt khi chuyển phòng.
  pulseArrow(side, k = 1.18, duration = 450) {
    const a = side === 'left' ? this.arrowL : this.arrowR;
    this.arrowPulse = this.tweens.add({ targets: a, scale: a.base * k, duration, yoyo: true, repeat: -1 });
  }

  layout() {
    super.layout();
    this.cameras.main.setScroll(this.room * ROOM_W, -this.Y0);
    this.roomBg.forEach((k, i) => {
      const s = k.b.scaleX, show = this.Y0 > 0 && !this.tallBg[this.roomBgs[i]];
      k.top.setScale(s, Math.max(0.001, (this.Y0 + 2) / k.top.height)).setVisible(show);
      k.bottom.setScale(s, Math.max(0.001, (this.Y0 + 2) / k.bottom.height)).setVisible(show);
    });
    const ay = ARROW.right[1] + this.Y0;
    this.arrowR.setPosition(ARROW.right[0], ay);
    this.arrowL.setPosition(ARROW.left[0], ay);
    this.fitWidth(this.arrowR, ARROW_W);
    this.fitWidth(this.arrowL, ARROW_W);
    this.zones.arrowR.setPosition(ARROW.right[0], ay);
    this.zones.arrowL.setPosition(ARROW.left[0], ay);
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
    this.tweens.add({ targets: this.cameras.main, scrollX: r * ROOM_W, duration: 400, ease: 'Sine.inOut',
      onUpdate: () => { if (this.bag) this.bagLayout(); },
      onComplete: () => {
        this.moving = false;
        if (this.bag) this.bagLayout();
        this.touch();
        if (this.onRoomEnter) this.onRoomEnter(r);
      } });
  }
}
