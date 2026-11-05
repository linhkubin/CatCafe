// Đồ vật khai báo bằng dữ liệu. Level mới chỉ cần liệt kê đồ vật (key ảnh, vị trí, lớp, kiểu chạm, có phải chỗ trốn không)
// và viết code cho luật riêng. Gọi this.addProps([...]) trong buildRoom.
//
//   { name: 'pillow',                    // tên đồ = tên vùng chạm; sprite nằm ở this.pillow
//     key: 'l1_pillow_white_idle',       // ảnh ban đầu; vị trí lấy từ bảng vị trí design-art (P(key)) nếu không có `at`
//     at: [x, y], depth: 31,             // tuỳ chọn: vị trí, lớp vẽ (mặc định D.box)
//     zone: D.zone + 4,                  // lớp vùng chạm (mặc định D.zone + 1); false = không có vùng chạm
//     hit: (s) => s.getBounds(),         // khung vùng chạm (mặc định phần vẽ thật, artRect)
//     visible: false, off: true,         // ẩn sprite / tắt vùng chạm lúc đầu; flipX: true lật ngang; attach: 'chair' bám theo đồ khác
//     tap: 'flip',                       // kiểu chạm, xem TAPS bên dưới; hoặc hàm (p, g) => {...} viết riêng
//     sfx: 'sfx_cushion_soft',           // tiếng mỗi lần chạm
//     to: 'l1_pillow_white_flipped',     // flip: ảnh sau khi lật
//     states: ['l2_curtain_closed', 'l2_curtain_open'], // toggle: hai ảnh luân phiên
//     wiggle: [3, 2, 240],               // wiggle / flip đã lật: lắc (độ, số nhịp, ms)
//     secret: 5,                         // flip: 🎁 lần đầu bung n cá khô, +1 bí mật (this.secrets)
//     react: 'player_scratch_head',      // nhân vật trồi lên phản ứng sau khi chạm
//     item: 'l4_pillow',                 // pickup: key món trong túi (mặc định = key)
//     cat: 'sua_sit_stare', catAt: [x, y], open: 'l1_box_open', // hide: mèo trốn ở đây, ảnh mèo, chỗ mèo, ảnh đồ khi mở
//     onChange(p, state), onFlip(p), onPick(p) // móc thêm luật riêng
//   }
//
// Thả đồ từ túi vào cảnh: khai báo get dropSpots() → [{ when?, rect, want, place(it), wrong?(it) }] (xem onBagDrop).
// Kéo đồ có sẵn trong cảnh tới chỗ đặt (không qua túi đồ): sceneDraggable(name, {...}) (xem bên dưới).
// Ô sáng hiện sẵn ở chỗ đặt (L7): litSlot(id, name, at, look) + sceneDraggable(..., { lit: true }).
import { BaseLevel, D, MIN_HIT } from './base.js';

// Các kiểu chạm có sẵn. `this` là màn chơi, p = { def, s, name, state, done }.
const TAPS = {
  // Lắc nhẹ tại chỗ (đồ trang trí).
  wiggle(p) {
    this.wiggle(p.s, ...(p.def.wiggle || [3, 2, 240]));
    if (p.def.sfx) this.sfx(p.def.sfx);
  },

  // Nhún (đệm, sofa…).
  squash(p) {
    this.squash(p.s);
    if (p.def.sfx) this.sfx(p.def.sfx);
  },

  // Hai trạng thái luân phiên mỗi lần chạm (rèm mở/đóng…).
  toggle(p) {
    if (this.busy[p.name]) return;
    this.busy[p.name] = true;
    if (p.def.sfx) this.sfx(p.def.sfx);
    p.state ^= 1;
    this.swap(p.s, p.def.states[p.state], () => (this.busy[p.name] = false));
    if (p.def.onChange) p.def.onChange.call(this, p, p.state);
  },

  // Lật một lần: nhún rồi đổi sang ảnh `to`; đã lật thì chỉ lắc. Có thể kèm 🎁 cá khô và nhân vật phản ứng.
  flip(p) {
    if (this.busy[p.name]) return;
    this.busy[p.name] = true;
    if (p.def.sfx) this.sfx(p.def.sfx);
    if (p.done) {
      this.wiggle(p.s, ...(p.def.wiggle || [3, 2, 240]));
      this.time.delayedCall(260, () => (this.busy[p.name] = false));
      return;
    }
    p.done = true;
    this.squash(p.s, () => this.swap(p.s, p.def.to, () => { this.busy[p.name] = false; this.propZone(p.name); }));
    if (p.def.secret) {
      this.secrets = (this.secrets || 0) + 1;
      const b = p.s.getBounds();
      this.fishBurst(b.centerX, b.top + 20, p.def.secret);
    }
    if (p.def.react) this.react(p.def.react, this.bandX(p.s.x));
    if (p.def.onFlip) p.def.onFlip.call(this, p);
  },

  // Nhặt vào túi đồ.
  pickup(p) {
    this.pickUp(p.def.item || p.def.key, p.s, p.name, { before: () => {
      if (p.def.sfx) this.sfx(p.def.sfx);
      if (p.def.onPick) p.def.onPick.call(this, p);
    } });
  },

  // Chỗ trốn: chạm thì mèo lộ diện (revealFrom); màn có luật riêng thì override revealFrom.
  hide(p) {
    if (p.def.sfx) this.sfx(p.def.sfx);
    this.revealFrom(p);
  },
};

export class ObjectLevel extends BaseLevel {
  create() {
    this.props = {};
    this.got = {}; // món đã nhặt (resetLevel của màn có thể đặt lại)
    this.sceneDrags = {};
    this.sdrag = null;
    this.lit = {}; // ô sáng (litSlot)
    super.create();
    this.input.on('gameobjectdown', (p, obj) => this.sceneDragStart(obj.zoneName, p));
    this.input.on('pointermove', (p) => this.sceneDragMove(p));
    this.input.on('pointerup', () => this.sceneDragEnd());
  }

  // ---------- dựng đồ vật từ khai báo ----------
  addProps(defs) { return defs.map((d) => this.addProp(d)); }

  addProp(def) {
    const s = this.img(def.key, ...(def.at || this.P(def.key)), def.depth ?? D.box);
    if (def.flipX) s.setFlipX(true);
    if (def.visible === false) s.setVisible(false);
    if (def.attach) this.attachTo(s, this[def.attach]);
    const p = { def, s, name: def.name, state: 0, done: false };
    this.props[def.name] = p;
    this[def.name] = s;
    if (def.zone !== false) {
      const z = this.zone(def.name, this.propRect(p), def.zone ?? D.zone + 1);
      if (def.off || def.visible === false) z.disableInteractive();
    }
    return s;
  }

  propRect(p) { return p.def.hit ? p.def.hit.call(this, p.s) : this.artRect(p.s); }

  // Đặt lại vùng chạm của đồ theo ảnh hiện tại (sau khi đổi trạng thái).
  propZone(name) {
    const p = this.props[name], z = this.zones[name], b = this.propRect(p);
    z.setPosition(b.centerX, b.centerY).setSize(Math.max(MIN_HIT, b.width), Math.max(MIN_HIT, b.height));
    z.input && z.input.hitArea.setSize(z.width, z.height);
  }

  // Gọi từ BaseLevel.handle trước handleLevel: true = đồ khai báo đã xử lý cú chạm.
  tapProp(name, g) {
    const p = this.props[name];
    if (!p) return false;
    if (this.moving) return true;
    const t = p.def.tap || 'wiggle';
    if (typeof t === 'function') t.call(this, p, g); else TAPS[t].call(this, p, g);
    return true;
  }

  // ---------- nhặt vào túi đồ ----------
  // Món bay từ sprite vào ô trống đầu tiên; mỗi món nhặt một lần, tắt vùng chạm. opts.before chạy ngay lúc nhặt
  // (tiếng, hiệu ứng), opts.done khi món đã nằm trong ô.
  pickUp(key, s, zoneName, opts = {}) {
    if (this.got[key] || this.busy.pick) return;
    this.got[key] = true;
    this.busy.pick = true;
    this.zones[zoneName].disableInteractive();
    if (opts.before) opts.before();
    this.bagShow(() => {
      this.bagAdd(key, s, () => { this.busy.pick = false; this.touch(); opts.done && opts.done(); });
      s.setVisible(false);
    });
  }

  bagItem(key) { return this.bag && this.bag.items.find((o) => o && o.key === key); }

  // ---------- thả đồ từ túi vào cảnh ----------
  // dropSpots: [{ when() (đang nhận đồ không), rect() (vùng thả), want() (key cần), place(it), wrong(it) }].
  // Thả trúng vùng: đúng món → place, sai → wrong (mặc định bay về túi). Không trúng vùng nào: base xử lý (về túi).
  get dropSpots() { return []; }

  onBagDrop(it, x, y) {
    for (const d of this.dropSpots) {
      if ((d.when && !d.when()) || !d.rect().contains(x, y)) continue;
      if (it.key === d.want()) d.place(it);
      else if (d.wrong) d.wrong(it);
      else this.bagReturn(it);
      return true;
    }
    return false;
  }

  // ---------- kéo đồ có sẵn trong cảnh tới chỗ đặt (G6-1, dùng chung) ----------
  // sceneDraggable(name, opts): sprite this[name] (vùng chạm cùng tên) kéo được trong cảnh.
  //   opts.spots(): [{ id, at: [x, y] }] chỗ đang nhận món này (toạ độ đặt sprite); trống = không chỗ nào nhận.
  //   opts.when(): còn cho kéo không (mặc định luôn); opts.snap: thả cách chỗ đặt ≤ snap px là khớp (mặc định 110;
  //   spot.area: Rectangle thì thả trong vùng đó là khớp, thay cho snap);
  //   opts.place(spot, s): đã khớp vào chỗ; opts.sfx: tiếng khi khớp; opts.depth: lớp sau khi khớp (mặc định lớp cũ).
  //   opts.lit: chỗ đặt là ô sáng hiện sẵn (litSlot, id = spot.id): đang kéo thì ô sáng rõ hơn, không vẽ viền mờ tạm.
  //   opts.litIds(spots): chỉ sáng các ô này khi kéo (mặc định mọi chỗ nhận); thả vào chỗ nhận khác vẫn khớp.
  //   opts.swipe: [dx, dy] thao tác tại chỗ (L7: dựng xe đạp, xoay đầu ống máng, gạt then cổng): chạm giữ rồi vuốt theo hướng
  //   (dx, dy) đủ dài |(dx, dy)| là khớp ngay vào chỗ đầu tiên. opts.fixed: món đứng yên khi vuốt (không theo tay); không đặt
  //   fixed thì vẫn kéo-thả được như thường.
  //   opts.lag: 0–1, món nặng lết theo tay chậm hơn (mỗi lần di tay chỉ đi được phần lag quãng còn lại; L7 cành cây).
  //   opts.look: { angle, sy } dáng món khi đặt (ván dựng tường → nằm ngang, nắp cống dựng → nằm dẹt): món đổi sang dáng này
  //   ngay khi bắt đầu kéo, thả sai thì về dáng cũ.
  // Đang kéo: chỗ hợp lệ hiện viền mờ đúng cỡ món. Thả ngoài: món trượt về chỗ cũ, lắc một nhịp, "sai".
  // Chạm không kéo vẫn là chạm thường (tapProp / handleLevel).
  sceneDraggable(name, opts) { this.sceneDrags[name] = opts; }

  sceneDragStart(name, p) {
    const d = name && this.sceneDrags[name], s = d && this[name];
    if (!s || this.locked || this.introBusy || this.phase !== 'search' || this.drag || this.sdrag || (d.when && !d.when())) return;
    this.sdrag = { name, d, s, x0: p.worldX, y0: p.worldY, dx: s.x - p.worldX, dy: s.y - p.worldY, home: [s.x, s.y], depth: s.depth, moved: false };
  }

  sceneDragMove(p) {
    const sd = this.sdrag;
    if (!sd) return;
    if (!sd.moved) {
      if (Math.hypot(p.worldX - sd.x0, p.worldY - sd.y0) < 12) return;
      sd.moved = true;
      this.press = null; // kéo thì không tính là chạm
      this.touch();
      this.handHide();
      this.handHide('paw');
      sd.s.setDepth(D.fx - 1);
      sd.spots = sd.d.spots();
      sd.litIds = sd.d.litIds ? sd.d.litIds(sd.spots) : sd.spots.map((o) => o.id);
      if (sd.d.lit) this.litFocus(sd.litIds, true);
      else sd.ghost = this.sceneGhosts(sd.s, sd.spots);
      if (sd.d.look) {
        const s = sd.s, by = s.baseY || s.base;
        sd.rest = { angle: s.angle, baseY: by };
        s.baseY = by * (sd.d.look.sy ?? 1);
        this.tweens.add({ targets: s, angle: sd.d.look.angle ?? 0, scaleY: s.baseY, duration: 150, ease: 'Quad.out' });
      }
    }
    const sw = sd.d.swipe;
    if (sw && sd.spots.length) { // thao tác tại chỗ: vuốt đủ dài theo hướng là khớp
      const len = Math.hypot(sw[0], sw[1]), along = ((p.worldX - sd.x0) * sw[0] + (p.worldY - sd.y0) * sw[1]) / len;
      if (along >= len) { this.sceneDragEnd(sd.spots[0]); return; }
    }
    if (sd.d.fixed) return;
    const tx = p.worldX + sd.dx, ty = p.worldY + sd.dy, k = sd.d.lag || 1;
    sd.s.setPosition(sd.s.x + (tx - sd.s.x) * k, sd.s.y + (ty - sd.s.y) * k);
  }

  // Viền mờ đúng cỡ phần vẽ của món, đặt ở từng chỗ hợp lệ; nhấp nháy nhẹ.
  sceneGhosts(s, spots) {
    const r = this.artRect(s), ox = r.x - s.x, oy = r.y - s.y, g = this.add.graphics().setDepth(D.fx - 2);
    for (const { at: [x, y] } of spots) {
      g.fillStyle(0xffffff, 0.18).fillRoundedRect(x + ox, y + oy, r.width, r.height, 14);
      g.lineStyle(4, 0xffffff, 0.8).strokeRoundedRect(x + ox, y + oy, r.width, r.height, 14);
    }
    this.tweens.add({ targets: g, alpha: 0.45, duration: 450, yoyo: true, repeat: -1 });
    return g;
  }

  // force: chỗ đặt khớp luôn (thao tác vuốt tại chỗ, opts.swipe).
  sceneDragEnd(force) {
    const sd = this.sdrag;
    if (!sd) return;
    this.sdrag = null;
    if (!sd.moved) return;
    if (sd.ghost) { this.tweens.killTweensOf(sd.ghost); sd.ghost.destroy(); }
    if (sd.d.lit) this.litFocus(sd.litIds, false);
    const { s, d, name } = sd, snap = d.snap || 110;
    // Món đứng yên (opts.fixed) chỉ khớp bằng thao tác vuốt (force); thả tay chưa vuốt đủ: lắc, "sai".
    const spot = force || (!d.fixed && sd.spots.find(({ at: [x, y], area }) => (area ? area.contains(s.x, s.y) : Math.hypot(s.x - x, s.y - y) <= snap)));
    if (spot) {
      this.tweens.add({ targets: s, x: spot.at[0], y: spot.at[1], duration: 160, ease: 'Quad.out', onComplete: () => {
        s.setDepth(d.depth ?? sd.depth);
        this.squash(s);
        if (d.sfx) this.sfx(d.sfx);
        if (this.zones[name]) this.zoneTo(name, s);
        d.place(spot, s);
      } });
      return;
    }
    this.sfx('sfx_wrong');
    const back = sd.rest ? { angle: sd.rest.angle, scaleY: (s.baseY = sd.rest.baseY) } : {};
    this.tweens.add({ targets: s, x: sd.home[0], y: sd.home[1], ...back, duration: 250, ease: 'Quad.out', onComplete: () => {
      s.setDepth(sd.depth);
      if (!sd.rest) this.wiggle(s, 4, 1, 240);
      else this.tweens.add({ targets: s, angle: sd.rest.angle + 4, duration: 80, yoyo: true }); // món dựng nghiêng: lắc quanh dáng cũ
    } });
  }

  // ---------- ô sáng (L7, dùng chung): chỗ đặt hiện sẵn từ đầu cảnh ----------
  // Hình món `name` (cùng ảnh, cỡ, hướng; look = { angle, sy, key } dáng / ảnh lúc đặt) ở `at`, tô trắng mờ, nhịp sáng chậm
  // 1,5 giây; hiện tới khi gọi litOff(id). Lớp: this.litDepth (mặc định dưới món đang kéo). Không dùng preFX (nhiều ô một lúc).
  // Tuỳ chọn màn: litHeldOnly = true thì ô ẩn hẳn lúc thường, chỉ hiện khi đang cầm đúng món / lúc gợi ý (litFocus, litFlash).
  litSlot(id, name, at, look = {}) {
    const s = this[name], g = this.add.image(at[0], at[1], '__WHITE');
    this.applyKey(g, look.key || s.key);
    if (s.faceLeft) this.face(g, true);
    g.setScale(g.base, (g.baseY || g.base) * (look.sy ?? 1)).setAngle(look.angle ?? 0).setDepth(this.litDepth ?? D.fx - 2)
      .setTintFill(0xfff8e0).setAlpha(0.1);
    // litHeldOnly: nhịp sáng tạo sẵn ở trạng thái dừng (pause() ngay sau add có lúc vẫn chạy khung đầu) và ẩn hẳn ô.
    g.pulse = this.tweens.add({ targets: g, alpha: 0.26, duration: 750, yoyo: true, repeat: -1, ease: 'Sine.inOut', paused: !!this.litHeldOnly });
    if (this.litHeldOnly) g.setAlpha(0).setVisible(false);
    this.lit[id] = g;
    return g;
  }

  // Ô sáng rõ hơn (đang kéo đúng món / gợi ý) hoặc về nhịp thường.
  litFocus(ids, on) {
    for (const id of ids) {
      const g = this.lit[id];
      if (!g) continue;
      if (on) { g.pulse.pause(); g.setAlpha(0.55).setVisible(true); } else if (this.litHeldOnly) g.setAlpha(0).setVisible(false); else { g.setAlpha(0.1); g.pulse.restart(); }
    }
  }

  // Gợi ý: ô sáng rõ lên một lúc rồi về nhịp thường.
  litFlash(id, ms = 1400) {
    if (!this.lit[id]) return;
    this.litFocus([id], true);
    this.time.delayedCall(ms, () => { if (!this.sdrag) this.litFocus([id], false); });
  }

  litOff(id) {
    const g = this.lit[id];
    if (!g) return;
    delete this.lit[id];
    g.pulse.remove();
    this.tweens.add({ targets: g, alpha: 0, duration: 250, onComplete: () => g.destroy() });
  }

  // Điểm giữa phần vẽ của món name nếu đặt ở `at` (cho bàn chân 💡 kéo mẫu tới chỗ đặt).
  sceneSpotCenter(name, at) {
    const s = this[name], r = this.artRect(s);
    return [at[0] + r.centerX - s.x, at[1] + r.centerY - s.y];
  }

  // ---------- chỗ trốn: lộ diện mặc định ----------
  // Đồ đổi sang ảnh `open` (nếu có), mèo (`cat`) nảy ra tại `catAt` (mặc định giữa đáy đồ), bong bóng nhiệm vụ đổi mặt mèo,
  // mèo phát sáng; chạm mèo để bế (startEnding chung).
  revealFrom(p) {
    if (this.phase !== 'search') return;
    this.phase = 'found';
    this.handHide();
    this.handHide('paw');
    if (p.def.open) this.swap(p.s, p.def.open);
    const b = this.artRect(p.s);
    const cat = this.sua = this.img(p.def.cat || 'sua_sit_stare', ...(p.def.catAt || [b.centerX, b.bottom]), (p.def.depth ?? D.box) + 0.5);
    const k = cat.base;
    cat.setScale(0);
    this.tweens.add({ targets: cat, scale: k, duration: 300, ease: 'Back.out' });
    this.sfx(this.catMeow);
    this.bubbleFound();
    this.time.delayedCall(600, () => {
      this.glowOn(cat);
      const r = this.artRect(cat);
      this.armSua(new Phaser.Geom.Rectangle(r.x - 20, r.y - 20, r.width + 40, r.height + 30));
    });
  }
}
