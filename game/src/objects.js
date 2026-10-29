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
    if (p.def.react) this.react(p.def.react, p.s.x - this.camX);
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
    super.create();
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
