// Level 1 – Hộp pate thần kỳ. Luồng theo levels/levels-01-10.md, levels/states-01-10.md (Level 1), leveldesign.md mục 1, 5, 6.
// Phần chung (giao diện, mở màn, cảnh bế, thưởng…) ở base.js. Không có chữ trên màn hình.
import { BaseLevel, D, MIN_HIT, SWIPE, SUN } from './base.js';

export class Level1 extends BaseLevel {
  constructor() { super('Level1'); }

  get levelNo() { return 1; }
  get nextLevel() { return 'Level2'; }
  get rewardFish() { return 10; }

  resetLevel() {
    this.boxTaps = 0;
    Object.assign(this, { canBob: null, curtainPuff: null, eatTimer: null, eatNod: null, steam: null });
  }

  // Hộp đang lơ lửng giữa màn hình: chỉ hộp và nút 💡 nhận chạm.
  blockInput(name) { return this.phase === 'canCenter' && name !== 'can' && name !== 'bulb'; }

  beforeEnding() {
    if (this.eatTimer) this.eatTimer.remove();
    if (this.eatNod) this.eatNod.stop();
  }

  handleLevel(name, g) {
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
    }
  }

  buildRoom() {
    this.buildBg('l1_bg_living_room');

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
    this.canHome = this.pos('l1_pate_can_sill') || [300, 632];
    this.can = this.img('l1_pate_can_closed', ...this.canHome, D.canHidden).setVisible(false);
    this.canShown = false;
    // O8/G9: đệm phải là đệm ngồi bình thường (l1_sofa_cushion_flat), không phồng, không thở, không gợi ý.
    // Chưa có ảnh mới thì dùng l1_sofa_cushion_bulge.
    const ck = this.has('l1_sofa_cushion_flat') ? 'l1_sofa_cushion_flat' : 'l1_sofa_cushion_bulge';
    const cpos = this.pos('l1_sofa_cushion_flat') || this.P('l1_sofa_cushion_bulge');
    this.cushion = this.img(ck, ...cpos, D.cushion); // G10: đệm phải chỉ là đệm tĩnh, không tương tác
    this.pillow = this.img('l1_pillow_white_idle', ...this.P('l1_pillow_white_idle'), D.pillow);
    // Gối phải: cùng gối trắng, lật ngang, đặt đối xứng trên đệm phải.
    const [plx, ply] = this.P('l1_pillow_white_idle');
    this.pillowR = this.img('l1_pillow_white_idle', ...(this.pos('l1_pillow_white_right') || [1025 - plx, ply]), D.pillow).setFlipX(true);
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

  canTap() {
    if (this.phase === 'can') return this.canToCenter();
    if (this.phase === 'canCenter') return this.popCan();
    if (this.phase === 'found') this.hop(this.can, 8, 200); // sau khi mở: hộp chỉ nảy nhẹ
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
    // Sữa xuất hiện và meo xong mới chạm được (tay hướng dẫn chỉ vào Sữa).
    this.time.delayedCall(1800, () => this.armSua(this.suaRect));
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
    // Vùng chạm ôm sát thân Sữa (không phủ hộp), tính theo cỡ mèo chứ không theo khung ảnh; bật sau khi Sữa meo (showSua → armSua).
    const w = Math.min(this.sua.displayWidth, 300), h = Math.min(this.sua.displayHeight, 320);
    this.suaRect = new Phaser.Geom.Rectangle(x - w / 2, y - h * 0.95, w, h);
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
}
