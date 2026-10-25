// Level 1 – Hộp pate thần kỳ. Luồng theo levels/levels-01-10.md, levels/states-01-10.md (Level 1), leveldesign.md mục 1, 5, 6.
// Toạ độ "thế giới" là khung 1024x1536 của design-art; máy dài hơn 2:3 thì camera lùi lên (Y0) và nền được kéo dài.
// Không có chữ trên màn hình.
import { playSfx } from './sfx.js';

const D = {
  bg: 0, pend: 9, clock: 10, bird: 11, rug: 12, plant: 13, fly: 14, box: 20, canHidden: 25, cushion: 30, pillow: 31,
  curtain: 35, beam: 36, sua: 40, can: 45, steam: 46, player: 50, fx: 60, hint: 70, zone: 80, ui: 100, uiZone: 150, end: 200,
};
const MIN_HIT = 115;            // vùng chạm tối thiểu (P6)
const SWIPE = 40;               // px: dài hơn là vuốt
const CREAM = 0xfffcf4, BROWN = 0x6b4a3a, SUN = 0xfce39a;

export class Level1 extends Phaser.Scene {
  constructor() { super('Level1'); }

  // ---------- tiện ích ----------
  get A() { return this.registry.get('assets'); }
  P(key) { return this.A.pos[key] || [512, 768]; }
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

  sfx(key) { playSfx(this, key); }

  // ---------- dựng cảnh ----------
  create() {
    this.zones = {};
    this.phase = 'intro';
    this.locked = true;
    this.frozen = false;
    this.lastTouch = this.time.now;
    this.hints = { h1: false, h2: false, sparkleAt: 0 };
    this.busy = {};
    this.boxTaps = 0;
    // scene.restart() dùng lại cùng đối tượng Scene: xoá trạng thái của lượt trước.
    Object.assign(this, { canBob: null, curtainPuff: null, qHopLoop: null, glow: null, glowTw: null, eatTimer: null, eatNod: null, endCt: null,
      handMode: null, press: null, handTimer: null, pawTimer: null, sua: null, steam: null, dim: null, rewardReadyAt: 0 });

    this.buildRoom();
    this.buildUI();
    this.layout();
    this.scale.on('resize', this.layout, this);
    this.events.once('shutdown', () => this.scale.off('resize', this.layout, this));
    this.setupInput();
    this.intro();
  }

  buildRoom() {
    const bg = this.img('l1_bg_living_room', 0, 0, D.bg);
    bg.setOrigin(0, 0);
    this.bg = bg;
    const tex = this.textures.get('l1_bg_living_room');
    const src = tex.getSourceImage();
    const strip = Math.round(src.height * 0.05);
    if (!tex.has('top')) tex.add('top', 0, 0, 0, src.width, strip);
    if (!tex.has('bottom')) tex.add('bottom', 0, 0, src.height - strip, src.width, strip);
    this.bgTop = this.add.image(0, 0, 'l1_bg_living_room', 'top').setOrigin(0, 1).setDepth(D.bg);
    this.bgBottom = this.add.image(0, 1536, 'l1_bg_living_room', 'bottom').setOrigin(0, 0).setDepth(D.bg);

    // Rèm + hai nửa để kéo, dải nắng.
    const [cx, cy] = this.P('l1_curtain_closed');
    this.curtain = this.img('l1_curtain_closed', cx, cy, D.curtain);
    this.curtainOpen = false;
    this.halves = ['L', 'R'].map((side) => {
      const h = this.img('l1_curtain_closed', cx, cy, D.curtain).setVisible(false);
      const left = cx - this.curtain.originX * this.curtain.displayWidth;
      const fw = h.width;
      if (side === 'L') h.setOrigin(0, h.originY).setX(left).setCrop(0, 0, fw / 2, h.height);
      else h.setOrigin(1, h.originY).setX(left + this.curtain.displayWidth).setCrop(fw / 2, 0, fw / 2, h.height);
      return h;
    });
    this.beam = this.add.graphics().setDepth(D.beam).setAlpha(0);
    this.beam.fillStyle(SUN, 0.32);
    this.beam.fillPoints([{ x: 95, y: 600 }, { x: 480, y: 600 }, { x: 900, y: 1430 }, { x: 330, y: 1430 }], true);
    this.beam.setBlendMode(Phaser.BlendModes.SCREEN);

    // Đồng hồ.
    const [px, py] = this.P('l1_wall_clock_pendulum');
    this.pend = this.img('l1_wall_clock_pendulum', px, py, D.pend);
    const [kx, ky] = this.P('l1_wall_clock_closed');
    this.clock = this.img('l1_wall_clock_closed', kx, ky, D.clock);
    const [bx, by] = this.P('l1_wall_clock_bird');
    this.bird = this.img('l1_wall_clock_bird', bx, by, D.bird).setVisible(false);
    this.pendIdle = this.tweens.add({ targets: this.pend, angle: { from: -6, to: 6 }, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // Chậu cây, bướm, thảm, hộp, hộp pate (ẩn), đệm, gối.
    this.plant = this.img('l1_plant', ...this.P('l1_plant'), D.plant);
    this.fly = this.img('prop_butterfly', ...this.P('prop_butterfly'), D.fly);
    this.flyHome = [this.fly.x, this.fly.y];
    this.time.addEvent({ delay: 3200, loop: true, callback: () => {
      if (this.busy.fly || this.frozen) return;
      this.tweens.add({ targets: this.fly, scaleX: this.fly.base * 0.55, duration: 140, yoyo: true, repeat: 1 });
    } });
    this.rug = this.img('l1_rug_flat', ...this.P('l1_rug_flat'), D.rug);
    this.box = this.img('l1_box_closed', ...this.P('l1_box_closed'), D.box);
    // G10: hộp pate nằm trên bệ cửa sổ, sau rèm (lớp dưới rèm), lộ ra khi mở rèm.
    this.canHome = this.A.pos.l1_pate_can_sill || [300, 632];
    this.can = this.img('l1_pate_can_closed', ...this.canHome, D.canHidden).setVisible(false);
    this.canShown = false;
    // O8/G9: đệm phải là đệm ngồi bình thường (l1_sofa_cushion_flat), không phồng, không thở, không gợi ý.
    // Chưa có ảnh mới thì dùng l1_sofa_cushion_bulge.
    const ck = this.has('l1_sofa_cushion_flat') ? 'l1_sofa_cushion_flat' : 'l1_sofa_cushion_bulge';
    const cpos = this.A.pos.l1_sofa_cushion_flat || this.P('l1_sofa_cushion_bulge');
    this.cushion = this.img(ck, ...cpos, D.cushion); // G10: đệm phải chỉ là đệm tĩnh, không tương tác
    this.pillow = this.img('l1_pillow_white_idle', ...this.P('l1_pillow_white_idle'), D.pillow);
    // Gối phải: cùng gối trắng, lật ngang, đặt đối xứng trên đệm phải.
    const [plx, ply] = this.P('l1_pillow_white_idle');
    this.pillowR = this.img('l1_pillow_white_idle', ...(this.A.pos.l1_pillow_white_right || [1025 - plx, ply]), D.pillow).setFlipX(true);
    // Đuôi Sữa thò ra (ve vẩy) ở chỗ đang trốn; lớp ngay dưới gối / rèm.
    this.tail = this.img(this.has('sua_tail_peek') ? 'sua_tail_peek' : 'sua_sit_stare', 0, 0, D.pillow - 0.5);
    this.runner = this.img('sua_sit_stare', 0, 0, D.sua).setVisible(false);
    this.hideAt = 'pillowL';

    // Nhân vật (mở màn và phản ứng), Sữa tạo sau.
    this.player = this.img('player_call', ...this.P('player_call'), D.player).setVisible(false);

    // Vùng chạm.
    this.zone('curtain', this.curtain.getBounds());
    const cb = this.clock.getBounds();
    this.zone('clock', new Phaser.Geom.Rectangle(cb.x, cb.y, cb.width, cb.height + 110));
    this.zone('plant', this.plant.getBounds(), D.zone + 2);
    const rugB = this.rug.width > 8 ? this.rug.getBounds() : new Phaser.Geom.Rectangle(20, 1060, 984, 300);
    this.zone('rug', new Phaser.Geom.Rectangle(rugB.x + 30, rugB.y + 20, rugB.width - 60, rugB.height - 30), D.zone + 1);
    this.zone('box', this.box.getBounds(), D.zone + 3);
    this.zone('pillow', this.pillow.getBounds(), D.zone + 4);
    this.zone('pillowR', this.pillowR.getBounds(), D.zone + 4);
    this.showTail('pillowL');
  }

  // ---------- G10: Sữa né tránh, trốn lần lượt: gối trái → gối phải → sau rèm → biến mất ----------
  tailPose(where) {
    if (where === 'pillowL') { const b = this.pillow.getBounds(); return { x: b.left + 35, y: b.top + b.height * 0.6, angle: -40, mirror: false, depth: D.pillow - 0.5 }; }
    if (where === 'pillowR') { const b = this.pillowR.getBounds(); return { x: b.right - 35, y: b.top + b.height * 0.6, angle: 40, mirror: true, depth: D.pillow - 0.5 }; }
    const b = this.curtain.getBounds();
    return { x: b.centerX + 70, y: b.bottom - 30, angle: 165, mirror: true, depth: D.curtain - 0.5 }; // thò xuống dưới mép rèm
  }

  showTail(where) {
    const tl = this.tail, p = this.tailPose(where);
    this.tweens.killTweensOf(tl);
    tl.setVisible(true).setPosition(p.x, p.y).setDepth(p.depth).setAngle(p.angle);
    tl.setScale(p.mirror ? -tl.base : tl.base, tl.baseY);
    this.tweens.add({ targets: tl, angle: p.angle + (p.mirror ? -12 : 12), duration: 600, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    const b = tl.getBounds();
    if (this.zones.tail) {
      const z = this.zones.tail;
      z.setPosition(b.centerX, b.centerY).setSize(Math.max(MIN_HIT, b.width), Math.max(MIN_HIT, b.height));
      z.input.hitArea.setSize(z.width, z.height);
      z.setInteractive();
    } else this.zone('tail', b, D.zone + 8);
    if (where === 'curtain') {
      // Rèm phồng nhẹ khi Sữa nấp sau.
      this.curtainPuff = this.tweens.add({ targets: this.curtain, scaleX: this.curtain.base * 1.025, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }
  }

  hideTail() {
    this.tweens.killTweensOf(this.tail);
    this.tail.setVisible(false);
    if (this.zones.tail) this.zones.tail.disableInteractive();
    if (this.curtainPuff) { this.curtainPuff.stop(); this.curtainPuff = null; this.curtain.setScale(this.curtain.base, this.curtain.baseY); }
  }

  spotOpen(where) {
    if (where === 'pillowR') return this.pillowR.key === 'l1_pillow_white_flipped' || this.busy.pillowR;
    if (where === 'curtain') return this.curtainOpen;
    return true;
  }

  suaSpot(where) {
    if (where === 'pillowL') return [this.pillow.x, this.pillow.y];
    if (where === 'pillowR') return [this.pillowR.x, this.pillowR.y];
    return [this.canHome[0] + 40, this.canHome[1]]; // trên bệ cửa sổ, sau rèm
  }

  // Sữa bật ra 0,2 giây (giật mình) rồi vụt chạy sang chỗ trốn kế tiếp; chỗ đó đã mở thì chạy ra khỏi màn hình, biến mất.
  flee(from) {
    if (this.hideAt !== from) return;
    this.hideTail();
    const next = { pillowL: 'pillowR', pillowR: 'curtain', curtain: null }[from];
    const to = next && !this.spotOpen(next) ? next : null;
    this.hideAt = to ? 'running' : 'gone';
    const r = this.runner, [x, y] = this.suaSpot(from);
    const [tx, ty] = to ? this.suaSpot(to) : [x < 512 ? -260 : 1284, y + 40];
    const left = tx < x; // ảnh sua_sit_stare và sua_run đều vẽ mặt nhìn sang phải: chạy sang trái thì lật ngang
    this.applyKey(r, 'sua_sit_stare');
    this.face(r, left);
    r.setVisible(true).setPosition(x, y).setAngle(0).setDepth(from === 'curtain' ? D.curtain + 0.5 : D.sua);
    this.squash(r);
    this.sfx('sua_sfx_meow');
    this.time.delayedCall(200, () => {
      this.applyKey(r, this.has('sua_run') ? 'sua_run' : 'sua_sit_stare');
      this.face(r, left);
      r.setDepth(D.sua);
      this.dust(x, y);
      this.sfx('sfx_cloth');
      this.tweens.add({ targets: r, x: tx, y: ty, duration: to ? 380 : 450, ease: 'Quad.in', onComplete: () => {
        r.setVisible(false);
        if (to && this.hideAt === 'running') { if (this.spotOpen(to)) this.hideAt = 'gone'; else { this.hideAt = to; this.showTail(to); } }
      } });
    });
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
      if (this.phase === 'reward') { if (this.time.now > this.rewardReadyAt) this.scene.restart(); return; }
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
    // Hộp đang lơ lửng giữa màn hình: chỉ hộp và nút 💡 nhận chạm.
    if (this.phase === 'canCenter' && name !== 'can' && name !== 'bulb') return;
    if (name === 'bulb') { this.touch(); this.strongHint(); return; }
    if (name === 'bubble') { this.bubbleRemind(); return; }
    this.touch();
    if (this.handMode === 'hint') this.handHide();
    switch (name) {
      case 'curtain': this.toggleCurtain(); break;
      case 'clock': this.clockTap(); break;
      case 'plant': this.plantTap(); break;
      case 'rug': if (g.swipe) this.rugSwipe(); else this.tapRing(this.zones.rug.x, this.zones.rug.y); break;
      case 'box': this.boxTap(); break;
      case 'pillow': this.pillowTap(this.pillow, 'pillow', 'pillowL'); break;
      case 'pillowR': this.pillowTap(this.pillowR, 'pillowR', 'pillowR'); break;
      case 'tail':
        if (this.hideAt === 'curtain') this.toggleCurtain();
        else if (this.hideAt === 'pillowL') this.pillowTap(this.pillow, 'pillow', 'pillowL');
        else if (this.hideAt === 'pillowR') this.pillowTap(this.pillowR, 'pillowR', 'pillowR');
        break;
      case 'can': this.canTap(); break;
      case 'sua': this.suaTap(); break;
    }
  }

  // ---------- đồ vật ----------
  toggleCurtain() {
    if (this.busy.curtain) return;
    // Rèm đóng mở thoải mái; khi hộp còn trên bệ, đóng rèm thì che hộp (tắt vùng chạm, ẩn tay hướng dẫn), mở lại thì lộ hộp.
    if (this.curtainOpen && this.phase === 'can') this.canCovered(true);
    if (!this.curtainOpen) {
      this.time.delayedCall(260, () => {
        if (this.hideAt === 'curtain') this.flee('curtain');
        if (this.phase === 'search') this.showCan();
        else if (this.phase === 'can') this.canCovered(false);
      });
    }
    this.busy.curtain = true;
    this.sfx('sfx_cloth');
    const [L, R] = this.halves;
    const b = this.curtain.base;
    if (!this.curtainOpen) {
      this.curtain.setVisible(false);
      L.setVisible(true).setScale(b);
      R.setVisible(true).setScale(b);
      this.tweens.add({ targets: [L, R], scaleX: b * 0.3, duration: 250, ease: 'Quad.in', onComplete: () => {
        L.setVisible(false); R.setVisible(false);
        this.applyKey(this.curtain, 'l1_curtain_open');
        this.curtain.setVisible(true);
        this.squash(this.curtain, () => (this.busy.curtain = false));
      } });
      this.tweens.add({ targets: this.beam, alpha: 1, duration: 600, delay: 150 });
    } else {
      this.curtain.setVisible(false);
      L.setVisible(true).setScale(b * 0.3, b);
      R.setVisible(true).setScale(b * 0.3, b);
      this.tweens.add({ targets: [L, R], scaleX: b, duration: 250, ease: 'Quad.out', onComplete: () => {
        L.setVisible(false); R.setVisible(false);
        this.applyKey(this.curtain, 'l1_curtain_closed');
        this.curtain.setVisible(true);
        this.busy.curtain = false;
      } });
      this.tweens.add({ targets: this.beam, alpha: 0, duration: 300 });
    }
    this.curtainOpen = !this.curtainOpen;
  }

  clockTap() {
    if (this.busy.clock) return;
    this.busy.clock = true;
    this.sfx('l1_sfx_cuckoo');
    this.pendIdle.pause();
    const a0 = this.pend.angle;
    this.tweens.addCounter({ from: 0, to: 1.6, duration: 1600, onUpdate: (tw) => {
      const t = tw.getValue();
      this.pend.angle = a0 * Math.exp(-t * 3) + 14 * Math.exp(-t / 0.6) * Math.sin(2 * Math.PI * t);
    }, onComplete: () => this.pendIdle.resume() });
    this.applyKey(this.clock, 'l1_wall_clock_open');
    const bird = this.bird, b = bird.base, y0 = this.P('l1_wall_clock_bird')[1];
    bird.setVisible(true).setScale(b * 0.4).setAngle(0).setY(y0 + 8);
    this.tweens.chain({ targets: bird, tweens: [
      { scale: b * 1.1, y: y0 - 12, duration: 150, ease: 'Back.out' },
      { scale: b, duration: 80 },
      { angle: -16, duration: 100 }, { angle: 0, duration: 100 },
      { angle: -16, duration: 100 }, { angle: 0, duration: 100 },
      { scale: b * 0.4, y: y0 + 8, duration: 150, ease: 'Quad.in' },
    ], onComplete: () => {
      bird.setVisible(false);
      this.applyKey(this.clock, 'l1_wall_clock_closed');
      this.busy.clock = false;
    } });
  }

  plantTap() {
    if (this.busy.plant) return;
    this.busy.plant = true;
    this.sfx('sfx_leaves');
    this.wiggle(this.plant, 4, 3, 300);
    this.flyLoop(() => (this.busy.plant = false));
  }

  flyLoop(done) {
    this.busy.fly = true;
    const [hx, hy] = this.flyHome, f = this.fly, b = f.base;
    this.tweens.addCounter({ from: 0, to: 1, duration: 1000, onUpdate: (tw) => {
      const t = tw.getValue();
      f.x = hx - 90 * Math.sin(2 * Math.PI * t);
      f.y = hy - 110 * Math.sin(Math.PI * t) + 25 * Math.sin(2 * Math.PI * t);
      f.scaleX = b * (0.3 + 0.7 * Math.abs(Math.cos(9 * Math.PI * t)));
      f.angle = 15 * Math.sin(2 * Math.PI * t);
    }, onComplete: () => { f.setPosition(hx, hy).setScale(b).setAngle(0); this.busy.fly = false; done && done(); } });
  }

  rugSwipe() {
    if (this.busy.rug) return;
    this.busy.rug = true;
    this.sfx('sfx_cloth');
    this.swap(this.rug, 'l1_rug_curled', () => this.time.delayedCall(500, () =>
      this.swap(this.rug, 'l1_rug_flat', () => (this.busy.rug = false))));
  }

  boxTap() {
    if (this.busy.box) return;
    this.boxTaps++;
    if (this.boxTaps === 1) {
      this.busy.box = true;
      this.sfx('l1_sfx_box_flaps');
      this.swap(this.box, 'l1_box_open_empty', () => (this.busy.box = false));
      this.react('player_shrug', this.box.x);
      return;
    }
    if (this.boxTaps === 3 && this.has('player_box_on_head') && this.A.entries.player_box_on_head.real) {
      this.busy.box = true;
      this.sfx('l1_sfx_box_flaps');
      this.box.setVisible(false);
      this.react('player_box_on_head', this.box.x, 1500, () => { this.box.setVisible(true); this.busy.box = false; });
      return;
    }
    // Lần 2 trở đi: hộp tự lật úp, lắc 3 nhịp rồi về.
    this.busy.box = true;
    this.sfx('l1_sfx_box_shake');
    const restore = this.centerOrigin(this.box);
    const x = this.box.x;
    this.tweens.chain({ targets: this.box, tweens: [
      { angle: 180, y: this.box.y - 30, duration: 250, ease: 'Quad.out' },
      { x: x - 8, duration: 60 }, { x: x + 8, duration: 60 }, { x: x - 8, duration: 60 },
      { x: x + 8, duration: 60 }, { x: x - 8, duration: 60 }, { x, duration: 60 },
      { angle: 360, y: this.box.y, duration: 250, ease: 'Quad.in' },
    ], onComplete: () => { this.box.angle = 0; restore(); this.busy.box = false; } });
  }

  pillowTap(p, zoneName, spot) {
    if (this.busy[zoneName]) return;
    if (p.key === 'l1_pillow_white_flipped') { this.wiggle(p, 3, 2, 240); return; }
    this.busy[zoneName] = true;
    this.sfx('sfx_cushion_soft');
    const suaHere = this.hideAt === spot;
    if (suaHere) this.flee(spot); // Sữa bật ra rồi vụt chạy
    this.squash(p, () => this.swap(p, 'l1_pillow_white_flipped', () => {
      this.busy[zoneName] = false;
      const z = this.zones[zoneName], b = p.getBounds();
      z.setPosition(b.centerX, b.centerY).setSize(Math.max(MIN_HIT, b.width), Math.max(MIN_HIT, b.height));
      z.input.hitArea.setSize(z.width, z.height);
    }));
    if (!suaHere) this.react('player_scratch_head', p.x);
  }

  // ---------- hộp pate trên bệ cửa sổ (G10) ----------
  showCan() {
    if (this.canShown) return;
    this.canShown = true;
    this.can.setVisible(true).setPosition(...this.canHome);
    this.phase = 'can';
    this.touch();
    this.zone('can', this.can.getBounds(), D.zone + 9);
    this.time.delayedCall(700, () => { if (this.phase === 'can') this.handTap(this.tipOf(this.can), 'guide'); });
  }

  canCovered(covered) {
    const z = this.zones.can;
    if (covered) {
      if (z) z.disableInteractive();
      if (this.handMode === 'guide') this.handHide();
      this.handHide('paw');
    } else {
      if (z) z.setInteractive();
      this.touch();
      this.handTap(this.tipOf(this.can), 'guide');
    }
  }

  tipOf(s) { const b = s.getBounds(); return [b.centerX, b.centerY]; }

  canTap() {
    if (this.phase === 'can') return this.canToCenter();
    if (this.phase === 'canCenter') return this.popCan();
  }

  // Chạm lần 1: hộp bay ra giữa màn hình, phóng to ~280px, lơ lửng nhún nhẹ, tay hướng dẫn chỉ vào.
  canToCenter() {
    this.phase = 'canCenter';
    this.handHide();
    this.handHide('paw');
    // Sữa đang trốn ở đâu thì biến mất, rồi sẽ hiện cạnh hộp (chạm hộp lúc nào cũng thắng).
    if (this.hideAt !== 'gone') { this.hideTail(); this.hideAt = 'gone'; }
    const c = this.can, k = 280 / c.displayWidth;
    this.canK = k;
    const cx = 512, cy = (this.scale.height / 2 - this.Y0) + 0.5 * c.displayHeight * k; // neo đáy, tâm hộp ở giữa màn hình
    c.setDepth(D.player + 5);
    this.sfx('sfx_pickup');
    this.tweens.add({ targets: c, x: cx, y: cy, scaleX: c.base * k, scaleY: c.baseY * k, duration: 450, ease: 'Back.out', onComplete: () => {
      this.canBob = this.tweens.add({ targets: c, y: cy - 14, duration: 650, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      const z = this.zones.can, bb = c.getBounds();
      z.setPosition(bb.centerX, bb.centerY).setSize(bb.width, bb.height);
      z.input.hitArea.setSize(z.width, z.height);
      z.setDepth(D.uiZone - 1).setInteractive();
      this.touch();
      this.handTap(this.tipOf(c), 'guide');
    } });
    if (this.zones.can) this.zones.can.disableInteractive();
  }

  popCan() {
    this.phase = 'reveal';
    this.locked = true;
    this.handHide();
    if (this.zones.can) this.zones.can.disableInteractive();
    if (this.canBob) { this.canBob.stop(); this.canBob = null; }
    const c = this.can, b = c.getBounds();
    // 0: tia nổ + TÁCH
    const pop = this.img('fx_pop', b.centerX, b.top + 10, D.fx).setOrigin(0.5, 0.5);
    this.fitWidth(pop, 200);
    const pb = pop.base;
    pop.setScale(0);
    this.tweens.add({ targets: pop, scale: pb * 1.2, angle: 30, duration: 220, ease: 'Back.out' });
    this.tweens.add({ targets: pop, alpha: 0, delay: 220, duration: 200, onComplete: () => pop.destroy() });
    this.sfx('sfx_pop_can');
    // 0,1: đổi sang hộp mở, rồi khựng tới 0,6 giây
    this.time.delayedCall(100, () => {
      this.applyKey(c, 'l1_pate_can_open');
      // Giữ đúng cỡ đang phóng to (hai ảnh cùng khung nên thân hộp rộng bằng nhau), không nhảy cỡ khi đổi ảnh.
      if (this.canK) c.setScale(c.base * this.canK, c.baseY * this.canK);
      this.frozen = true;
      this.tweens.pauseAll();
    });
    this.time.delayedCall(600, () => {
      this.frozen = false;
      this.tweens.resumeAll();
      this.locked = false;
      this.phase = 'found';
      this.showSua();
      // Hộp mở bay dần xuống, thu nhỏ về chỗ cạnh Sữa; hơi thơm bắt đầu khi hộp đáp xuống.
      const [ox, oy] = this.P('l1_pate_can_open');
      this.tweens.add({ targets: c, x: ox, y: oy, scaleX: c.base, scaleY: c.baseY, duration: 650, ease: 'Sine.inOut',
        onComplete: () => { c.setDepth(D.can); this.startSteam(); } });
      this.react('player_surprised', 820);
      this.bubbleFound();
    });
    this.time.delayedCall(1400, () => {
      if (this.phase !== 'found') return;
      this.applyKey(this.sua, 'sua_meow_up');
      this.hop(this.sua, 22, 350);
      this.sfx('sua_sfx_meow_long');
    });
    this.time.delayedCall(2200, () => { if (this.phase === 'found') this.startEating(); });
  }

  startSteam() {
    const [sx, sy] = this.P('l1_pate_can_steam');
    this.steam = [0, 1, 2].map((i) => {
      const s = this.img('l1_pate_can_steam', sx + (i - 1) * 14, sy, D.steam).setAlpha(0);
      const loop = () => {
        if (!s.active) return;
        s.setPosition(sx + (i - 1) * 14 + Phaser.Math.Between(-4, 4), sy).setAlpha(0).setFlipX(Math.random() < 0.5);
        this.tweens.add({ targets: s, y: sy - 70, duration: 1600, ease: 'Sine.out' });
        this.tweens.add({ targets: s, x: s.x + Phaser.Math.Between(-10, 10), duration: 800, yoyo: true, ease: 'Sine.inOut' });
        this.tweens.chain({ targets: s, tweens: [{ alpha: 0.9, duration: 500 }, { alpha: 0, duration: 1100 }], onComplete: loop });
      };
      this.time.delayedCall(i * 530, loop);
      return s;
    });
  }

  showSua() {
    const [x, y] = this.P('sua_sit_stare');
    this.sua = this.img('sua_sit_stare', x, y, D.sua);
    // Vùng chạm to hơn mèo ~20% (leveldesign 6.1), tính theo cỡ mèo chứ không theo khung ảnh (ảnh tạm có lề rộng).
    const w = Math.min(this.sua.displayWidth, 300) * 1.2, h = Math.min(this.sua.displayHeight, 320) * 1.2;
    this.zone('sua', new Phaser.Geom.Rectangle(x - w / 2, y - h * 0.95, w, h), D.zone + 10);
  }

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

  startEating() {
    const s = this.sua;
    this.applyKey(s, 'sua_eat');
    let f = 0;
    this.eatTimer = this.time.addEvent({ delay: 250, loop: true, callback: () => {
      f ^= 1;
      const key = f && this.has('sua_eat_f2') ? 'sua_eat_f2' : 'sua_eat';
      this.applyKey(s, key);
    } });
    this.eatNod = this.tweens.add({ targets: s, angle: 3, duration: 250, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    if (this.renderer.type === Phaser.WEBGL && s.preFX) {
      this.glow = s.preFX.addGlow(SUN, 2, 0, false, 0.1, 14);
      this.glowTw = this.tweens.add({ targets: this.glow, outerStrength: 6, duration: 1000, yoyo: true, repeat: -1 });
    }
    this.handTap(this.suaPoint(), 'guide', 'hand', true);
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
    this.time.delayedCall(1150, () => { this.sfx('l1_sfx_player_call'); this.hop(p, 10, 300); });
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

  showSwipeGuide(which = 'hand', times = 1) {
    this.handHide(which);
    // G10: đường vuốt ngang trên rèm (từ giữa ra mép trái).
    const s = this[which], b = this.curtain.getBounds();
    const x0 = b.centerX + 60, x1 = b.left + 40, y = b.centerY;
    if (which === 'hand') this.handMode = 'hint';
    let n = 0;
    const once = () => {
      if (n++ >= times) { this.handHide(which); return; }
      s.setVisible(true).setAlpha(1).setPosition(x0, y);
      this.tweens.chain({ targets: s, tweens: [
        { x: x1, duration: 600, ease: 'Quad.inOut' }, { alpha: 0, duration: 200 }, { alpha: 0, duration: 300 },
      ], onComplete: once });
    };
    once();
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

  strongHint() {
    // Nút 💡: bàn chân mèo làm mẫu đúng thao tác của bước hiện tại.
    this.tweens.add({ targets: this.bulb, scale: this.bulb.base * 0.9, duration: 90, yoyo: true });
    if (this.phase === 'search') {
      // G10: chỉ vào đuôi chỗ Sữa đang trốn (gối), hoặc vẽ đường vuốt trên rèm nếu Sữa ở sau rèm / đã biến mất.
      if ((this.hideAt === 'pillowL' || this.hideAt === 'pillowR') && this.tail.visible) {
        this.handTap(this.tipOf(this.tail), 'hint', 'paw');
        this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw'));
      } else this.showSwipeGuide('paw', 2);
    }
    else if (this.phase === 'can' && !this.curtainOpen) this.showSwipeGuide('paw', 2);
    else if (this.phase === 'canCenter') { this.handTap(this.tipOf(this.can), 'hint', 'paw'); this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw')); }
    else if (this.phase === 'can') { this.handTap(this.tipOf(this.can), 'hint', 'paw'); this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw')); }
    else if (this.phase === 'found') { this.handTap(this.suaPoint(), 'hint', 'paw'); this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw')); }
  }

  update(time) {
    if (this.frozen || this.locked) return;
    const idle = (time - this.lastTouch) / 1000;
    const H = this.hints;
    if (this.phase === 'search') {
      // G9: không có gợi ý tự động gắn với đệm; chỉ nút 💡 khi người chơi bấm.
    } else if (this.phase === 'can' && this.curtainOpen) {
      if (idle >= 8 && !H.h1) { H.h1 = true; this.hop(this.can, 16, 300); }
      if (idle >= 16 && time - H.sparkleAt > 2000) { H.sparkleAt = time; this.sparkle(this.can); }
    }
  }

  // ---------- kết màn: cảnh bế chung, màn thưởng ----------
  startEnding() {
    this.phase = 'ending';
    this.locked = true;
    this.handHide();
    this.handHide('paw');
    if (this.eatTimer) this.eatTimer.remove();
    if (this.eatNod) this.eatNod.stop();
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
      this.sua.setVisible(false);
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

    // ♥ 1/4: ô đầu tiên của thanh tiến độ được tô trái tim.
    const slot = this.img('ui_heart', 145, 60, D.end + 10, true).setOrigin(0.5, 0.5);
    this.fitWidth(slot, 40);
    const sb = slot.base;
    slot.setScale(0);
    this.heartIcon.setDepth(D.end + 10);
    this.slots.setDepth(D.end + 9);
    this.tweens.add({ targets: slot, scale: sb, duration: 350, delay: 500, ease: 'Back.out', onStart: () => this.sfx('sfx_heart') });

    // 10 cá khô bay vào góc phải trên.
    const pile = this.img('ui_dried_fish', 1024 - 80, 62, D.end + 10, true).setOrigin(0.5, 0.5);
    this.fitWidth(pile, 90);
    for (let i = 0; i < 10; i++) {
      const f = this.img('ui_dried_fish', 512 + Phaser.Math.Between(-60, 60), H * 0.38 + Phaser.Math.Between(-40, 60), D.end + 11, true).setOrigin(0.5, 0.5);
      this.fitWidth(f, 60);
      f.setAlpha(0);
      this.tweens.add({ targets: f, alpha: 1, x: pile.x, y: pile.y, scale: f.base * 0.6, delay: 700 + i * 90, duration: 500, ease: 'Quad.in',
        onComplete: () => { f.destroy(); this.sfx('sfx_pickup'); this.tweens.add({ targets: pile, scale: pile.base * 1.15, duration: 60, yoyo: true }); } });
    }
    // Chạm bất kỳ đâu để chơi lại (chưa có level 2).
    this.time.delayedCall(2000, () => {
      if (this.phase !== 'reward') return;
      this.hand.setDepth(D.end + 12).setScrollFactor(0);
      this.handTap([512, H * 0.7], 'guide');
    });
  }
}
