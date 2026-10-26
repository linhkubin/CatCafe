// Level 3 – Quà xịn, hộp còn xịn hơn. Luồng theo levels/levels-01-10.md, levels/states-01-10.md (Level 3) và các quyết định
// G3-x, D3-x trong art/review/level3-thread.md. Lần đầu có túi đồ: nhặt kéo, cắt băng dính, ghép cột cào, đặt lên thảm, lật hộp úp.
// Vị trí và bề rộng theo bảng D3-22 (design-art-level3.md mục 6, đo trên tranh demo đã duyệt). Phần chung ở base.js.
import { BaseLevel, D, MIN_HIT, SUN, BROWN } from './base.js';

// Vị trí và bề rộng dự phòng (= bảng vị trí design-art-level3.md mục 6, bản D3-29) khi không đọc được design-art.
const DEF = {
  l3_curtain_closed: [318, 246], l3_sofa_front: [677, 851], l3_table: [44, 668], l3_vase: [815, 388], l3_scissors: [140, 711], l1_pillow_white_idle: [535, 742],
  l3_gift_box_taped: [224, 1140], l3_box_upside_down: [224, 1140], l3_sua_in_box: [224, 1140], l3_cat_tree: [790, 1145],
  player_point_think: [649, 1124], ui_thought_bubble: [771, 606], player_sad: [511, 1107], sua_pounce: [540, 1140],
  sua_scratch_post: [630, 1140], ui_bag_bar: [409, 1380], l3_pompom: [705, 746],
};
const FIT = {
  l3_curtain_closed: 378, l3_sofa_front: 670, l3_vase: 170, l3_scissors: 170, l1_pillow_white_idle: 162, l3_gift_box_taped: 368,
  l3_cat_tree: 352, player_point_think: 390, ui_thought_bubble: 260, player_sad: 245, ui_bag_bar: 688, l3_pompom: 68,
};
// Trạng thái cùng nhóm co cùng tỉ lệ với key đầu nhóm (D3-17).
const FIT_HEAD = {
  l3_tree_p1: 'l3_cat_tree', l3_tree_p2: 'l3_cat_tree', l3_tree_p3: 'l3_cat_tree',
  l3_gift_box_open: 'l3_gift_box_taped', l3_box_upside_down: 'l3_gift_box_taped', l3_sua_in_box: 'l3_gift_box_taped',
  l1_pillow_white_flipped: 'l1_pillow_white_idle', player_sad: 'player_point_think',
};
const SHADOW_X = [214, 439], SHADOW_Y = 632;       // bóng Sữa: góc trái / góc phải rèm, chân trên gấu rèm (D3-29, G3-12)
const HOOK = [-85, -415];                           // móc quả bông so với neo đáy cột cào, đo trên demo (737, 815) (ảnh tạm)
const HOOK_PX = [90, 225];                          // móc quả bông trong ảnh l3_cat_tree.png xuất (Art, Vòng 4c)
// Cột cào 4 mảnh, lắp từ dưới lên (levels-01-10 Level 3, chủ dự án chốt): (1) bục xanh + cột, (2) bục hồng + cột,
// (3) bục trắng có móc, (4) quả cầu lông treo vào móc (chính sprite l3_pompom). Mảnh 1–3 cùng khung, cùng neo với l3_cat_tree.
const PARTS = ['l3_tree_p1', 'l3_tree_p2', 'l3_tree_p3', 'l3_pompom'];
// Chưa có file mảnh thì cắt tạm từ l3_cat_tree theo dải ngang (toạ độ y trên ảnh 518x856).
const PART_BANDS = { l3_tree_p1: [500, 856], l3_tree_p2: [212, 500], l3_tree_p3: [0, 215] };
const BAG_ORDER = ['l3_tree_p2', 'l3_tree_p1', 'l3_pompom', 'l3_tree_p3']; // thứ tự 4 mảnh trong túi (xáo nhẹ)
const PHASE1 = ['scissors', 'cut', 'cutting', 'build'];
const GHOST_A = 0.25, GHOST_HI = 0.45; // hình mờ cột cào: nâu viền chung, mờ 25%; mảnh tới lượt nhấp nháy lên 45% (GD chốt)
// Quả cầu lông nhỏ, hình mờ chỗ treo phải đậm hơn mới thấy (GD).
const ghostA = (k) => (k === 'l3_pompom' ? 0.45 : GHOST_A), ghostHi = (k) => (k === 'l3_pompom' ? 0.75 : GHOST_HI);
const floorD = (y) => D.sua + (y - 1000) / 1000;    // D3-18: đồ trên sàn xếp lớp theo đường đáy

const WHITE = 0xfffaf0, WOOD = 0xd6a472, HONEY = 0xf2c796, MINT = 0xb9ddbe, PINK = 0xf8c6cc, SKY = 0xb8daf2,
  VOILE = 0xe3f0f8, CORAL = 0xee8a7a, PEACH = 0xf7b9a3, BUTTER = 0xfce39a, CREAM = 0xfcf1dd;

// Ảnh tạm: [rộng, cao, neo ('bg' | 'đáy' | 'đỉnh' | 'tâm' | [ax, ay] px), hàm vẽ (g, w, h)].
const BOX = [440, 400, [201, 394]];
const FB = {
  l3_bg_living_room_afternoon: [1024, 1536, 'bg', (g) => {
    g.fillStyle(CREAM).fillRect(0, 0, 1024, 1536);
    g.fillStyle(HONEY).fillRect(0, 780, 1024, 756);
    g.lineStyle(3, 0xd9ab78, 0.7);
    for (let y = 860; y < 1536; y += 90) g.lineBetween(0, y, 1024, y);
    g.lineStyle(4, BROWN).fillStyle(SKY).fillRect(70, 175, 435, 455).strokeRect(70, 175, 435, 455);
    g.lineStyle(10, WOOD).lineBetween(40, 162, 540, 162);
    g.fillStyle(WOOD).lineStyle(3, BROWN).fillRect(610, 388, 360, 20).strokeRect(610, 388, 360, 20);
    g.fillStyle(WOOD).fillEllipse(178, 700, 265, 44).strokeEllipse(178, 700, 265, 44);
    g.fillRect(166, 712, 24, 140).strokeRect(166, 712, 24, 140);
    g.fillEllipse(178, 855, 130, 24).strokeEllipse(178, 855, 130, 24);
    g.fillStyle(MINT).fillRoundedRect(430, 530, 594, 180, 40).strokeRoundedRect(430, 530, 594, 180, 40);
    g.fillRoundedRect(360, 680, 664, 130, 30).strokeRoundedRect(360, 680, 664, 130, 30);
    g.fillRoundedRect(350, 620, 100, 190, 40).strokeRoundedRect(350, 620, 100, 190, 40);
    g.fillStyle(PINK).fillEllipse(790, 1175, 470, 200).strokeEllipse(790, 1175, 470, 200); // thảm tròn
  }],
  l3_curtain_closed: [445, 455, 'đỉnh', (g, w, h) => {
    g.fillStyle(VOILE, 0.9).lineStyle(3, BROWN);
    g.fillRect(2, 2, w / 2 - 3, h - 4).strokeRect(2, 2, w / 2 - 3, h - 4);
    g.fillRect(w / 2 + 1, 2, w / 2 - 3, h - 4).strokeRect(w / 2 + 1, 2, w / 2 - 3, h - 4);
    g.lineStyle(2, 0xb9d3e6);
    for (let x = 40; x < w; x += 55) g.lineBetween(x, 12, x, h - 12);
  }],
  l3_vase: [170, 210, 'đáy', (g, w, h) => {
    g.lineStyle(3, BROWN).fillStyle(0x9dc283);
    g.fillEllipse(w * 0.3, h * 0.3, 40, 18).fillEllipse(w * 0.7, h * 0.3, 40, 18);
    g.fillStyle(PINK).fillCircle(w * 0.32, h * 0.14, 24).strokeCircle(w * 0.32, h * 0.14, 24);
    g.fillStyle(BUTTER).fillCircle(w * 0.55, h * 0.2, 22).strokeCircle(w * 0.55, h * 0.2, 22);
    g.fillStyle(PINK).fillCircle(w * 0.75, h * 0.3, 22).strokeCircle(w * 0.75, h * 0.3, 22);
    g.fillStyle(SKY).fillEllipse(w / 2, h * 0.75, 90, 100).strokeEllipse(w / 2, h * 0.75, 90, 100);
    g.fillRect(w / 2 - 18, h * 0.42, 36, 30).strokeRect(w / 2 - 18, h * 0.42, 36, 30);
  }],
  l3_scissors: [120, 32, 'đáy', (g, w, h) => {
    g.lineStyle(3, BROWN).fillStyle(0xd8d8de);
    g.fillTriangle(w * 0.42, h * 0.38, w - 4, h * 0.5, w * 0.42, h * 0.62).strokeTriangle(w * 0.42, h * 0.38, w - 4, h * 0.5, w * 0.42, h * 0.62);
    g.fillStyle(PEACH).fillCircle(w * 0.18, h * 0.3, 14).strokeCircle(w * 0.18, h * 0.3, 14);
    g.fillCircle(w * 0.18, h * 0.72, 14).strokeCircle(w * 0.18, h * 0.72, 14);
  }],
  l3_gift_box_taped: [...BOX, (g) => box(g, 'taped')],
  l3_gift_box_open: [...BOX, (g) => box(g, 'open')],
  l3_box_upside_down: [...BOX, (g) => box(g, 'down')],
  l3_sua_in_box: [...BOX, (g) => box(g, 'sua')],
  l3_cat_tree: [335, 535, 'đáy', (g, w, h) => catTree(g, w, h, true)],
  l3_pompom: [44, 150, 'đỉnh', (g, w, h) => {
    g.lineStyle(3, 0xd9cbb0).lineBetween(w / 2, 0, w / 2, h - 40);
    g.fillStyle(CORAL).lineStyle(3, BROWN).fillCircle(w / 2, h - 21, 19).strokeCircle(w / 2, h - 21, 19);
  }],
  sua_peek_tongue: [130, 150, [0, 75], (g, w, h) => {
    g.fillStyle(WHITE).lineStyle(4, BROWN);
    g.fillTriangle(30, 40, 50, 4, 70, 36).strokeTriangle(30, 40, 50, 4, 70, 36);
    g.fillTriangle(80, 36, 104, 6, 116, 44).strokeTriangle(80, 36, 104, 6, 116, 44);
    g.fillEllipse(68, 78, 120, 96).strokeEllipse(68, 78, 120, 96);
    g.fillStyle(0x6ab0e0).fillCircle(55, 72, 8).fillCircle(90, 72, 8);
    g.fillStyle(0xf09aaa).fillEllipse(74, 108, 14, 18);
    g.fillStyle(WHITE).fillEllipse(70, 138, 36, 22).strokeEllipse(70, 138, 36, 22);
  }],
  sua_pounce: [300, 330, 'đáy', (g, w, h) => cat(g, w, h, 'pounce')],
  sua_scratch_post: [220, 340, 'đáy', (g, w, h) => cat(g, w, h, 'scratch')],
  player_point_think: [390, 572, 'đáy', (g, w, h) => kid(g, w, h, true)],
  player_sad: [245, 547, 'đáy', (g, w, h) => kid(g, w, h, false)],
  ui_bag_bar: [655, 210, 'đáy', (g, w, h) => {
    g.lineStyle(10, WOOD).strokeCircle(70, 50, 34);
    g.fillStyle(0xfdf6e8).lineStyle(8, WOOD).fillRoundedRect(4, 40, w - 8, h - 44, 60).strokeRoundedRect(4, 40, w - 8, h - 44, 60);
  }],
  ui_bag_slot: [125, 125, 'tâm', (g, w, h) => { g.fillStyle(0xfffaf0).lineStyle(3, 0xb89a80).fillRoundedRect(4, 4, w - 8, h - 8, 20).strokeRoundedRect(4, 4, w - 8, h - 8, 20); }],
  ui_thought_bubble: [250, 250, [50, 250], (g, w, h) => {
    g.fillStyle(0xffffff).lineStyle(4, BROWN);
    g.fillEllipse(w * 0.55, h * 0.36, w * 0.88, h * 0.62).strokeEllipse(w * 0.55, h * 0.36, w * 0.88, h * 0.62);
    g.fillCircle(w * 0.3, h * 0.8, 14).strokeCircle(w * 0.3, h * 0.8, 14);
    g.fillCircle(w * 0.2, h * 0.94, 9).strokeCircle(w * 0.2, h * 0.94, 9);
  }],
};

function box(g, mode) {
  const L = 36, R = 366, T = 139, B = 394, S = 38;     // mặt trước, dải hông phải S
  const card = 0xd6a472, side = 0xc4935f;
  g.lineStyle(4, BROWN);
  if (mode === 'open' || mode === 'sua') {
    g.fillStyle(card);
    g.fillTriangle(L, T, L - 30, T - 110, L + 120, T - 40).strokeTriangle(L, T, L - 30, T - 110, L + 120, T - 40);
    g.fillTriangle(R, T, R + 50, T - 100, R - 110, T - 40).strokeTriangle(R, T, R + 50, T - 100, R - 110, T - 40);
  }
  if (mode === 'sua') {
    g.fillStyle(WHITE);
    g.fillTriangle(110, 90, 130, 30, 160, 80).strokeTriangle(110, 90, 130, 30, 160, 80);
    g.fillTriangle(240, 80, 270, 30, 290, 90).strokeTriangle(240, 80, 270, 30, 290, 90);
    g.fillEllipse(200, 130, 220, 140).strokeEllipse(200, 130, 220, 140);
    g.fillStyle(0x6ab0e0).fillCircle(165, 125, 12).fillCircle(235, 125, 12);
    g.fillStyle(0xf7b9a3).fillCircle(200, 150, 6);
    g.fillStyle(WHITE).fillEllipse(400, 230, 50, 110).strokeEllipse(400, 230, 50, 110); // đuôi vắt mép phải
  }
  if (mode === 'open') {
    g.fillStyle(0xe8c48c).fillRect(120, T - 70, 60, 80).strokeRect(120, T - 70, 60, 80);
    g.fillStyle(MINT).fillRect(210, T - 30, 110, 40).strokeRect(210, T - 30, 110, 40);
  }
  g.fillStyle(card).fillRect(L, T - 30, R - L, 30).strokeRect(L, T - 30, R - L, 30);
  g.fillStyle(side).fillRect(R, T - 30, S, B - T + 30).strokeRect(R, T - 30, S, B - T + 30);
  g.fillStyle(card).fillRect(L, T, R - L, B - T).strokeRect(L, T, R - L, B - T);
  if (mode === 'taped') {
    g.fillStyle(MINT).fillRect(L + 140, T - 30, 50, B - T + 30).fillRect(L, T + 90, R - L + S, 40);
  }
  if (mode === 'down') { g.lineStyle(3, 0xa77b4a).lineBetween(L + 20, T - 15, R - 20, T - 15); }
}
// Ảnh tạm vẽ kín đúng khung bao đo trên demo (rộng × cao), để co theo "Rộng demo" ra đúng cả chiều cao.
function catTree(g, w, h, withBase) {
  g.lineStyle(4, BROWN);
  const cx = w / 2, bh = withBase ? h * 0.19 : 0, top = h - bh, rest = top;
  if (withBase) g.fillStyle(MINT).fillRoundedRect(cx - w * 0.38, top, w * 0.76, bh - 3, 14).strokeRoundedRect(cx - w * 0.38, top, w * 0.76, bh - 3, 14);
  g.fillStyle(0xe8c48c).fillRect(cx - w * 0.1, top - rest * 0.42, w * 0.2, rest * 0.42).strokeRect(cx - w * 0.1, top - rest * 0.42, w * 0.2, rest * 0.42);
  g.fillStyle(PINK).fillEllipse(cx - w * 0.06, top - rest * 0.45, w * 0.86, rest * 0.16).strokeEllipse(cx - w * 0.06, top - rest * 0.45, w * 0.86, rest * 0.16);
  g.fillStyle(0xe8c48c).fillRect(cx - w * 0.09, top - rest * 0.8, w * 0.18, rest * 0.3).strokeRect(cx - w * 0.09, top - rest * 0.8, w * 0.18, rest * 0.3);
  g.fillStyle(WHITE).fillEllipse(cx, rest * 0.12, w - 4, rest * 0.22).strokeEllipse(cx, rest * 0.12, w - 4, rest * 0.22);
}
function cat(g, w, h, pose) {
  g.fillStyle(WHITE).lineStyle(4, BROWN);
  if (pose === 'pounce') {
    g.fillEllipse(w * 0.45, h * 0.7, w * 0.6, h * 0.35).strokeEllipse(w * 0.45, h * 0.7, w * 0.6, h * 0.35);
    g.fillEllipse(w * 0.72, h * 0.42, w * 0.4, h * 0.32).strokeEllipse(w * 0.72, h * 0.42, w * 0.4, h * 0.32);
    g.fillEllipse(w * 0.85, h * 0.12, 30, 60).strokeEllipse(w * 0.85, h * 0.12, 30, 60);
  } else {
    g.fillEllipse(w * 0.4, h * 0.65, w * 0.5, h * 0.6).strokeEllipse(w * 0.4, h * 0.65, w * 0.5, h * 0.6);
    g.fillEllipse(w * 0.45, h * 0.25, w * 0.55, h * 0.3).strokeEllipse(w * 0.45, h * 0.25, w * 0.55, h * 0.3);
    g.fillEllipse(w * 0.82, h * 0.42, 70, 26).strokeEllipse(w * 0.82, h * 0.42, 70, 26);
  }
}
// Thân người rộng 245 (như player_sad trên demo); tư thế chỉ tay thêm cánh tay vươn sang trái tới mép khung.
function kid(g, w, h, point) {
  const fw = Math.min(w, 245), cx = w - fw / 2, r = fw * 0.4;
  g.lineStyle(4, BROWN);
  g.fillStyle(SKY).fillRect(cx - fw * 0.25, h * 0.6, fw * 0.5, h * 0.36).strokeRect(cx - fw * 0.25, h * 0.6, fw * 0.5, h * 0.36);
  g.fillStyle(BUTTER).fillRoundedRect(cx - fw * 0.36, 2 * r, fw * 0.72, h * 0.6 - 2 * r + 10, 30).strokeRoundedRect(cx - fw * 0.36, 2 * r, fw * 0.72, h * 0.6 - 2 * r + 10, 30);
  if (point) g.fillRoundedRect(2, 2 * r + 30, w - fw + fw * 0.2, 40, 18).strokeRoundedRect(2, 2 * r + 30, w - fw + fw * 0.2, 40, 18);
  g.fillStyle(0xfde3cf).fillCircle(cx, r + 2, r - 2).strokeCircle(cx, r + 2, r - 2);
  g.fillStyle(0x9b6a45).fillEllipse(cx, r * 0.55, fw - 6, r);
  g.fillStyle(BROWN).fillCircle(cx - r * 0.3, r * 1.1, 6).fillCircle(cx + r * 0.3, r * 1.1, 6);
  g.fillStyle(WHITE).fillEllipse(cx - fw * 0.2, h - 14, fw * 0.32, 26).fillEllipse(cx + fw * 0.2, h - 14, fw * 0.32, 26);
}

export class Level3 extends BaseLevel {
  constructor() { super('Level3'); }

  get levelNo() { return 3; }
  get nextLevel() { return 'Level1'; } // G3-8: chưa có level 4
  get rewardFish() { return 20 + 5 * this.secrets; } // +5 mỗi bí mật (gối, lọ hoa)
  get defaultPos() { return DEF; }
  get introPose() { return 'player_point_think'; } // G3-11
  get fitHead() { return FIT_HEAD; }

  resetLevel() {
    const A = this.A;
    A.fit = A.fit || {};
    if (!A.fit[3] || !Object.keys(A.fit[3]).length) A.fit[3] = { ...FIT };
    Object.assign(this, { stage: 'scissors', shadowAt: 0, curtainTaps: 0, peeking: false, vaseDone: false, pillowDone: false, secrets: 0,
      playTimers: [], taught: {}, kids: [], hoverT: null, boxHi: null, glowFx: null, meowLoop: null, boxBreath: null, think: null,
      buildIdx: 0, ghosts: [], placed: [] });
  }

  makeFallback(key) {
    const spec = FB[key];
    if (!spec) return;
    const [w, h, neo, draw] = spec;
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    draw(g, w, h);
    g.generateTexture(key, w, h);
    g.destroy();
    let ax = w / 2, ay = h;
    if (neo === 'bg' ) { ax = 0; ay = 0; }
    else if (neo === 'đỉnh') ay = 0;
    else if (neo === 'tâm') ay = h / 2;
    else if (Array.isArray(neo)) [ax, ay] = neo;
    this.A.entries[key] = { url: null, real: false, ax, ay, res: 1 };
  }

  // ---------- dựng phòng ----------
  buildRoom() {
    this.buildBg('l3_bg_living_room_afternoon');
    const P = (k) => this.P(k);

    this.vase = this.img('l3_vase', ...P('l3_vase'), D.plant);
    this.pillow = this.img('l1_pillow_white_idle', ...P('l1_pillow_white_idle'), D.curtain + 1); // gối nằm trên sofa_front
    this.scissors = this.img('l3_scissors', ...P('l3_scissors'), D.curtain + 1.1); // kéo nằm trên bàn, trên rèm
    this.curtain = this.img('l3_curtain_closed', ...P('l3_curtain_closed'), D.curtain);
    const cb = this.curtain.getBounds();
    this.curtainB = cb;

    // G3-4: bóng Sữa vẽ trên rèm voan, mờ 35%, cắt theo hình rèm.
    this.shadow = this.img('sua_sit_stare', SHADOW_X[0], SHADOW_Y, D.curtain + 0.5).setTintFill(0x6b6190).setAlpha(0); // màu bóng lấy theo demo (tím xám nhạt)
    this.fitWidth(this.shadow, 160);
    const mg = this.make.graphics({ x: 0, y: 0 }, false);
    mg.fillStyle(0xffffff).fillRect(cb.x, cb.y, cb.width, cb.height);
    this.shadow.setMask(mg.createGeometryMask());
    this.tweens.add({ targets: this.shadow, scaleY: this.shadow.base * 1.03, duration: 1600, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    this.peek = this.img('sua_peek_tongue', 0, 0, D.curtain - 0.5).setVisible(false);
    // Rèm nằm sau sofa: Art tách mặt trước sofa thành sprite riêng, vẽ trên rèm và bóng Sữa (neo góc trên trái).
    this.propImg('l3_sofa_front', D.curtain + 0.8);
    // Bàn tròn (sprite riêng, Art) nằm trên rèm; kéo nằm trên bàn.
    this.propImg('l3_table', D.curtain + 0.9);

    const [bx, by] = P('l3_gift_box_taped');
    this.box = this.img('l3_gift_box_taped', bx, by, floorD(by)).setVisible(false);
    const [tx, ty] = P('l3_cat_tree');
    this.tree = this.img('l3_cat_tree', tx, ty, floorD(ty)).setVisible(false);
    // Quả cầu lông (dây ngắn, Art Vòng 7) vẽ trước cột cào và trước Sữa lúc vồ, để luôn thấy quả cầu.
    this.pompom = this.img('l3_pompom', ...this.hookPos(), this.tree.depth + 0.003).setVisible(false);
    // Quả bông co cùng tỉ lệ với cột cào (Art, Vòng 4c).
    // Bảng có dòng `l3_pompom` (Rộng demo) thì co riêng theo dòng đó (Art Vòng 4e).
    if (this.A.entries.l3_cat_tree.real && !this.pos('l3_pompom')) this.pompom.setScale(this.pompom.base = this.pompom.baseY = this.tree.scaleX);
    this.makeParts();
    // Hình mờ 4 mảnh trên thảm (nâu viền, mờ 25%) và 4 mảnh đã lắp: cùng chỗ, cùng cỡ với cột cào.
    // Quả cầu lông: hình mờ là chỗ treo dưới móc, mảnh đã lắp chính là sprite quả bông.
    this.ghosts = PARTS.map((k) => {
      const g = k === 'l3_pompom' ? this.img(k, this.pompom.x, this.pompom.y, this.pompom.depth).setScale(this.pompom.scaleX)
        : this.img(k, tx, ty, this.tree.depth - 0.0005);
      return g.setTintFill(BROWN).setAlpha(ghostA(k)).setVisible(false);
    });
    this.placed = PARTS.map((k, i) => (k === 'l3_pompom' ? this.pompom : this.img(k, tx, ty, this.tree.depth + i * 0.0001).setVisible(false)));
    this.cat = this.img('sua_run', 0, 0, floorD(1225)).setVisible(false);
    const [sx, sy] = P('player_sad');
    this.sadPlayer = this.img('player_sad', sx, sy, floorD(sy)).setVisible(false);
    this.player = this.img('player_point_think', ...P('player_point_think'), D.player).setVisible(false);
    this.think = this.img('ui_thought_bubble', ...P('ui_thought_bubble'), D.player + 1).setVisible(false);
    this.thinkIcon = this.img('l3_scissors', 0, 0, D.player + 2).setOrigin(0.5, 0.5).setVisible(false);

    this.zone('curtain', cb);
    this.zone('vase', this.vase.getBounds(), D.zone + 2);
    this.zone('pillow', this.pillow.getBounds(), D.zone + 2);
    this.zone('scissors', this.scissors.getBounds(), D.zone + 3);
    this.zone('box', this.box.getBounds(), D.zone + 3);
  }

  // Điểm móc quả bông: ảnh thật lấy theo toạ độ móc trong ảnh cột cào; ảnh tạm lấy theo demo.
  hookPos() {
    const t = this.tree;
    if (this.pos('l3_pompom')) return this.pos('l3_pompom');
    if (!this.A.entries.l3_cat_tree.real) return [t.x + HOOK[0], t.y + HOOK[1]];
    return [t.x + (HOOK_PX[0] - t.originX * t.width) * t.scaleX, t.y + (HOOK_PX[1] - t.originY * t.height) * t.scaleY];
  }

  // Đồ cắt từ nền (sofa, bàn): ảnh chưa có dòng trong anchors.json thì là ảnh đúng cỡ nền, neo góc trên trái, không co;
  // ảnh cắt bằng công cụ (có neo, Rộng demo) thì đặt như mọi sprite.
  propImg(key, depth) {
    if (!this.has(key) || !this.pos(key)) return null;
    const s = this.img(key, ...this.pos(key), depth);
    if (this.A.entries[key].auto) s.setOrigin(0, 0).setScale(1);
    return s;
  }

  // Cảnh lộ diện: bật vùng chạm Sữa nhưng không có bàn tay chỉ vào mèo (chủ dự án); nút 💡 vẫn chỉ được.
  armSua(rect) {
    if (this.phase !== 'found' || this.ending || !rect) return;
    this.zone('sua', rect, D.zone + 10);
  }

  // Chưa có file 4 mảnh: cắt tạm từ ảnh cột cào thành 4 dải ngang, giữ nguyên khung và neo (lắp lại ra đúng ảnh cây).
  makeParts() {
    const tree = this.textures.get('l3_cat_tree').getSourceImage(), e = this.A.entries.l3_cat_tree;
    const w = tree.width, h = tree.height;
    for (const k of Object.keys(PART_BANDS)) {
      if (this.textures.exists(k)) continue;
      const [a, b] = PART_BANDS[k].map((v) => Math.round((v / 856) * h));
      const ct = this.textures.createCanvas(k, w, h);
      ct.getContext().drawImage(tree, 0, a, w, b - a, 0, a, w, b - a);
      ct.refresh();
      this.A.entries[k] = { url: null, real: false, ax: e.ax, ay: e.ay, res: e.res };
    }
  }

  // G3-1: chuông cửa, hộp quà rơi từ mép trên xuống "bộp"; Sữa chạy vụt ra sau rèm (bóng). G3-11: bong bóng suy nghĩ hình cây kéo.
  onIntro() {
    this.sfx('l3_sfx_doorbell');
    const b = this.box, y = b.y;
    b.setVisible(true).setY(-this.Y0 - 260);
    this.tweens.add({ targets: b, y, delay: 350, duration: 450, ease: 'Quad.in', onComplete: () => {
      this.sfx('l3_sfx_box_thud'); this.squash(b); this.dust(b.x - 120, y); this.dust(b.x + 120, y);
    } });
    this.time.delayedCall(900, () => { this.shadow.setX(SHADOW_X[1]).setAlpha(0.35); this.shadowAt = 1; this.shadowRun(0, false); });
    this.time.delayedCall(1300, () => this.showThink(true));
    this.time.delayedCall(4000, () => { if (this.stage === 'scissors') this.handTap(this.tipOf(this.scissors), 'guide'); });
  }

  onIntroLeave() { this.showThink(false); }

  showThink(on) {
    const t = this.think, ic = this.thinkIcon;
    if (!on) { this.tweens.add({ targets: [t, ic], alpha: 0, duration: 200, onComplete: () => { t.setVisible(false); ic.setVisible(false); } }); return; }
    t.setVisible(true).setAlpha(1).setScale(0);
    this.tweens.add({ targets: t, scale: t.base, duration: 300, ease: 'Back.out', onComplete: () => {
      const tb = t.getBounds();
      ic.setVisible(true).setAlpha(1).setPosition(tb.x + tb.width * 0.58, tb.y + tb.height * 0.36);
      this.fitWidth(ic, tb.width * 0.6);
    } });
    this.sfx('sfx_meow_question');
  }

  // Bong bóng nhiệm vụ không bật ra giữa màn (đã có bong bóng suy nghĩ); hiện thẳng ở góc như demo reveal.
  bubbleIntro() {
    const B = this.bubble;
    B.home = 'corner';
    B.ct.setVisible(true).setPosition(455, 62).setScale(0.35).setAlpha(0);
    this.tweens.add({ targets: B.ct, alpha: 1, delay: 1600, duration: 300 });
    this.time.delayedCall(1600, () => this.bubbleToCorner());
  }

  handleLevel(name) {
    switch (name) {
      case 'curtain': this.curtainTap(); break;
      case 'vase': this.vaseTap(); break;
      case 'pillow': this.pillowTap(); break;
      case 'scissors': this.scissorsTap(); break;
      case 'box': this.boxTap(); break;
      case 'tree': this.swingPompom(); break;
      case 'suaPlay': if (this.stage === 'play') this.vanish(); break;
    }
  }

  zoneTo(name, s) {
    const z = this.zones[name], b = s.getBounds();
    z.setPosition(b.centerX, b.centerY).setSize(Math.max(MIN_HIT, b.width), Math.max(MIN_HIT, b.height));
    z.input.hitArea.setSize(z.width, z.height);
  }

  // ---------- giai đoạn 1: bóng Sữa sau rèm (Lẩn tránh) ----------
  curtainTap() {
    this.wiggle(this.curtain, 1.2, 2, 300);
    this.sfx('sfx_cloth');
    if (!PHASE1.includes(this.stage)) return; // sau khi Sữa ra chơi: rèm trống
    if (this.peeking) { this.endPeek(); this.shadowRun(1 - this.shadowAt); return; }
    this.curtainTaps++;
    if (this.curtainTaps % 3 === 0) this.peekOut(); else this.shadowRun(1 - this.shadowAt);
  }

  shadowRun(to, sfx = true) {
    if (this.busy.shadow) return;
    this.busy.shadow = true;
    const s = this.shadow;
    if (sfx) this.sfx('sua_sfx_meow_playful');
    this.face(s, SHADOW_X[to] < s.x); // chạy: quay mặt theo hướng chạy
    this.tweens.add({ targets: s, x: SHADOW_X[to], duration: 300, ease: 'Quad.inOut', onComplete: () => {
      // Đứng ở góc phải thì quay đầu sang trái, về góc trái thì quay lại như cũ (chủ dự án).
      this.shadowAt = to; this.busy.shadow = false; this.face(s, to === 1);
    } });
  }

  // Chạm rèm lần 3, 6, 9…: Sữa thò đầu lè lưỡi ở mép rèm gần chỗ đang nấp, 0,8 giây.
  peekOut(side = this.shadowAt, hold = 800) {
    const cb = this.curtainB, p = this.peek;
    this.peeking = true;
    this.shadow.setAlpha(0);
    this.applyKey(p, 'sua_peek_tongue');
    this.face(p, side === 0);
    const x = side ? cb.right - 14 : cb.left + 14, y = SHADOW_Y - 110;
    p.setVisible(true).setPosition(x - (side ? 30 : -30), y);
    this.tweens.add({ targets: p, x, duration: 150, ease: 'Back.out' });
    this.sfx('sua_sfx_blep');
    if (this.peekTimer) this.peekTimer.remove();
    this.peekTimer = this.time.delayedCall(hold, () => this.endPeek());
  }

  endPeek(showShadow = true) {
    if (this.peekTimer) { this.peekTimer.remove(); this.peekTimer = null; }
    this.peek.setVisible(false);
    this.peeking = false;
    if (showShadow && PHASE1.includes(this.stage)) this.shadow.setAlpha(0.35);
  }

  // ---------- đồ vật ----------
  vaseTap() {
    if (this.busy.vase) return;
    this.busy.vase = true;
    this.sfx('sfx_clink');
    this.tweens.add({ targets: this.vase, angle: 15, duration: 200, yoyo: true, ease: 'Sine.out', onComplete: () => (this.busy.vase = false) });
    if (this.vaseDone) return;
    this.vaseDone = true; // 🎁 bí mật: 5 cá khô, chỉ lần đầu
    this.secrets++;
    const vb = this.vase.getBounds();
    this.fishBurst(vb.centerX, vb.top + 30, 5, true);
  }

  // 🎁 Bí mật: gối nhún rồi lật mặt như bản trước, thêm 5 cá khô bay ra (lần đầu).
  pillowTap() {
    const p = this.pillow;
    if (this.busy.pillow) return;
    this.busy.pillow = true;
    this.sfx('sfx_cushion_soft');
    // Chuyển động giữ như bản trước (nhún rồi lật mặt; đã lật thì chỉ lắc), chỉ thêm 5 cá lần đầu.
    if (this.pillowDone) { this.wiggle(p, 3, 2, 240); this.time.delayedCall(260, () => (this.busy.pillow = false)); return; }
    this.pillowDone = true;
    this.secrets++;
    this.squash(p, () => this.swap(p, 'l1_pillow_white_flipped', () => { this.busy.pillow = false; this.zoneTo('pillow', p); }));
    const pb = p.getBounds();
    this.fishBurst(pb.centerX, pb.top + 20, 5, false);
  }

  // n con cá khô bung ra từ (x, y) rồi bay về góc phải trên (như màn thưởng). drop: rơi ra thấp (lọ hoa nghiêng).
  fishBurst(x, y, n, drop) {
    this.sfx('sfx_clink');
    const tx = 1024 - 80, ty = 62 - this.Y0;
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

  swingPompom() {
    const s = this.pompom;
    if (!s.visible) return;
    this.tweens.killTweensOf(s);
    this.sfx('l3_sfx_pompom');
    this.tweens.addCounter({ from: 0, to: 1.2, duration: 1200, onUpdate: (tw) => {
      const t = tw.getValue();
      s.angle = 14 * Math.exp(-t / 0.45) * Math.sin(2 * Math.PI * t * 1.5);
    }, onComplete: () => (s.angle = 0) });
  }

  // ---------- bước 1: nhặt kéo, túi đồ trượt lên lần đầu ----------
  scissorsTap() {
    if (this.stage !== 'scissors') return;
    this.stage = 'cut';
    this.handHide();
    this.zones.scissors.disableInteractive();
    this.bagShow(() => {
      this.bagAdd('l3_scissors', this.scissors, () => this.guide());
      this.scissors.setVisible(false);
    });
  }

  boxTap() {
    const b = this.box;
    if (this.stage === 'scissors' || this.stage === 'cut') {
      // Hộp rung, băng dính chắc quá.
      if (this.busy.box) return;
      this.busy.box = true;
      this.sfx('l3_sfx_box_thud', 0.6);
      this.wiggle(b, 2.5, 3, 300);
      this.time.delayedCall(320, () => (this.busy.box = false));
      if (this.stage === 'cut') this.guide(true);
      return;
    }
    if (this.stage === 'hidden') { this.reveal(); return; }
    if (this.stage === 'found') this.hop(b, 8, 200);
    // build / play: hộp úp chưa nhận chạm (disabled): không phản ứng gì.
  }

  // Bàn tay hướng dẫn làm mẫu kéo-thả cho bước hiện tại (lần đầu mỗi bước; `again` = nhắc lại khi chạm ô túi).
  guide(again = false) {
    if (!this.bag || this.phase !== 'search') return;
    const st = this.stage;
    if (this.taught[st] && !again) return;
    const it = (k) => this.bag.items.find((o) => o && o.key === k);
    const bc = this.box.getCenter();
    let from = null, to = null;
    if (st === 'cut' && it('l3_scissors')) { from = this.slotPos(it('l3_scissors').i); to = [bc.x, bc.y]; }
    // Lắp cột cào: bàn tay chỉ làm mẫu mảnh đầu (bục xanh + cột); các mảnh sau chỉ nhắc khi chạm ô túi.
    if (st === 'build' && it(PARTS[this.buildIdx]) && (this.buildIdx === 0 || again)) { from = this.slotPos(it(PARTS[this.buildIdx]).i); to = this.partCenter(this.buildIdx); }
    if (!from) return;
    this.handDrag(from, to, again ? 'hint' : 'guide', 'hand', again ? 2 : -1);
  }

  // ---------- kéo-thả ----------
  // Vùng của mảnh i trên hình mờ (toạ độ thế giới, ôm phần vẽ thật của mảnh).
  partRect(i) {
    const g = this.ghosts[i], f = this.textures.get(PARTS[i]).get(this.iconFrame(PARTS[i]));
    const left = g.x - g.originX * g.width * g.scaleX, top = g.y - g.originY * g.height * g.scaleY;
    return new Phaser.Geom.Rectangle(left + f.cutX * g.scaleX, top + f.cutY * g.scaleY, f.cutWidth * g.scaleX, f.cutHeight * g.scaleY);
  }

  // Icon và vùng thả của quả cầu lông: chỉ lấy phần quả cầu ở cuối dây (khung vuông ôm đáy phần vẽ), bỏ sợi dây.
  iconFrame(key) {
    const name = super.iconFrame(key);
    if (key !== 'l3_pompom') return name;
    const tex = this.textures.get(key);
    if (!tex.has('ball')) {
      const f = tex.get(name), side = Math.min(f.cutWidth, f.cutHeight);
      tex.add('ball', 0, f.cutX, f.cutY + f.cutHeight - side, f.cutWidth, side);
    }
    return 'ball';
  }

  partCenter(i) { const r = this.partRect(i); return [r.centerX, r.centerY]; }

  dropTarget(it, x, y) {
    if (it.key === 'l3_scissors' && this.stage === 'cut') {
      const r = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(this.box.getBounds()), 100, 100); // G3-3: nới ≥ 200px
      if (r.contains(x, y)) return 'box';
    }
    if (this.stage === 'build' && it.key === PARTS[this.buildIdx]) {
      if (Phaser.Geom.Rectangle.Inflate(this.partRect(this.buildIdx), 60, 60).contains(x, y)) return 'part';
    }
    return null;
  }

  onBagHover(it, x, y) {
    const t = it ? this.dropTarget(it, x, y) : null;
    if (t === this.hoverT) return;
    this.highlight(this.hoverT, false);
    this.hoverT = t;
    this.highlight(t, true);
  }

  highlight(t, on) {
    if (t === 'part' && this.buildIdx === 0) { this.pulseGhost(!on); if (on) this.ghosts[0].setAlpha(0.6); }
    if (t === 'box' && this.renderer.type === Phaser.WEBGL && this.box.preFX) {
      if (on && !this.boxHi) this.boxHi = this.box.preFX.addGlow(SUN, 4, 0, false, 0.1, 12);
      if (!on && this.boxHi) { this.box.preFX.remove(this.boxHi); this.boxHi = null; }
    }
  }

  onBagDrop(it, x, y) {
    const t = this.dropTarget(it, x, y);
    if (t === 'box') { this.cutBox(it); return true; }
    if (t === 'part') { this.placePart(it); return true; }
    if (this.stage === 'build') this.ghostFlash(); // sai thứ tự / sai chỗ: vùng đang tới lượt nhấp nháy
    this.time.delayedCall(450, () => this.guide());
    return false;
  }

  onBagTap() { this.guide(true); }

  // Màn này không ghép trong túi: thả món lên món khác thì hai món nảy ra, về chỗ cũ (base lo phần lắc).
  onBagCombine() { return false; }

  // Vùng đang tới lượt trên hình mờ nhấp nháy.
  ghostFlash() {
    const g = this.ghosts[this.buildIdx];
    if (!g || this.buildIdx > 0) return; // chỉ mảnh 1 có hình mờ
    this.tweens.killTweensOf(g);
    g.setAlpha(ghostA(PARTS[this.buildIdx]));
    this.tweens.add({ targets: g, alpha: 0.85, duration: 160, yoyo: true, repeat: 2, onComplete: () => this.pulseGhost(true) });
  }

  // Mảnh đang tới lượt trên hình mờ nhấp nháy nhẹ liên tục (25% ↔ 45%).
  pulseGhost(on) {
    const g = this.ghosts[this.buildIdx];
    if (!g || this.stage !== 'build' || this.buildIdx > 0) return;
    this.tweens.killTweensOf(g);
    g.setAlpha(ghostA(PARTS[this.buildIdx]));
    if (on) this.tweens.add({ targets: g, alpha: ghostHi(PARTS[this.buildIdx]), duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
  }

  // ---------- bước 2: kéo cắt băng dính, hai mảnh cột cào vào túi, hộp rỗng lộn nhào úp xuống ----------
  cutBox(it) {
    this.stage = 'cutting';
    this.taught.cut = true;
    this.locked = true;
    this.handHide();
    const b = this.box, bb = b.getBounds(), s = it.s;
    const ty = bb.top + bb.height * 0.5;
    this.tweens.chain({ targets: s, tweens: [
      { x: bb.left + 30, y: ty, scale: this.bagIconScale(s) * 1.2, angle: 0, duration: 180 },
      { x: bb.right - 30, duration: 300, onStart: () => this.sfx('l3_sfx_scissors_cut') },
    ], onComplete: () => {
      this.bag.items[it.i] = null;
      this.tweens.add({ targets: s, alpha: 0, duration: 150, onComplete: () => s.destroy() });
      this.sfx('l3_sfx_paper_rip');
      this.swap(b, 'l3_gift_box_open');
      BAG_ORDER.forEach((k, i) => this.time.delayedCall(150 + i * 130, () => this.bagAdd(k, [bb.centerX - 60 + i * 40, bb.top + 20])));
      this.time.delayedCall(900, () => this.flipBox('l3_box_upside_down', () => {
        this.stage = 'build';
        this.buildIdx = 0;
        this.showGhosts();
        this.locked = false;
        this.touch();
        this.guide();
      }));
    } });
  }

  // `hop` + lật 180° quanh tâm thân hộp (D3-4): bẹp dọc tới 0, đổi ảnh, nở lại; bốn ảnh cùng khung nên không nhảy chỗ.
  // Tạm đổi gốc về tâm thân hộp (Art Vòng 4g: tâm thân = neo − 162 px ảnh xuất; ảnh tạm: thân cao 285); trả về hàm khôi phục.
  boxPivot() {
    const b = this.box, e = this.A.entries[b.key];
    const py = e.real ? e.ay - 162 : e.ay - 142;
    const { originX: ox, originY: oy, x, y } = b;
    b.setOrigin(e.ax / b.width, py / b.height).setPosition(x, y + (py - e.ay) * b.scaleY);
    return () => { b.setOrigin(ox, oy).setPosition(x, y); };
  }

  flipBox(key, done) {
    const b = this.box;
    const restore = this.boxPivot(), y = b.y;
    this.tweens.add({ targets: b, y: y - 70, scaleY: 0, angle: 8, duration: 175, ease: 'Quad.out', onComplete: () => {
      restore();
      b.setAngle(0);
      this.applyKey(b, key);
      const r2 = this.boxPivot(), yc = b.y;
      b.setScale(b.base, 0).setY(yc - 70).setAngle(-8);
      this.tweens.add({ targets: b, y: yc, scaleY: b.baseY || b.base, angle: 0, duration: 175, ease: 'Quad.in', onComplete: () => {
        r2();
        this.sfx('l3_sfx_box_thud');
        this.squash(b);
        this.zoneTo('box', b);
        done && done();
      } });
    } });
  }

  // ---------- bước 3: lắp cột cào 4 mảnh theo hình mờ trên thảm, từ dưới lên ----------
  showGhosts() {
    // Chỉ mảnh 1 (bục xanh + cột) có hình mờ gợi ý; các mảnh sau người chơi tự lắp, không hiện hình mờ (chủ dự án).
    const g = this.ghosts[0];
    g.setVisible(true).setAlpha(0);
    this.tweens.add({ targets: g, alpha: ghostA(PARTS[0]), duration: 400 });
    this.time.delayedCall(720, () => this.pulseGhost(true));
    this.sfx('sfx_sparkle');
  }

  placePart(it) {
    const i = this.buildIdx, s = it.s, p = this.placed[i], g = this.ghosts[i];
    this.taught.build = true;
    this.handHide();
    this.bag.items[it.i] = null;
    const [cx, cy] = this.partCenter(i);
    this.tweens.add({ targets: s, x: cx, y: cy, alpha: 0, duration: 150, onComplete: () => s.destroy() });
    this.tweens.killTweensOf(g);
    g.setVisible(false);
    p.setVisible(true).setAlpha(1);
    this.squash(p);
    this.sfx('l3_sfx_clack');
    this.flashAt(cx, cy);
    this.buildIdx++;
    this.touch();
    if (this.buildIdx < PARTS.length) { this.pulseGhost(true); return; }
    // Mảnh cuối: cả cột cào lóe sáng, quả bông đung đưa, Sữa ra chơi.
    this.stage = 'play';
    const t = this.tree;
    this.time.delayedCall(250, () => {
      this.placed.forEach((q) => q.setVisible(false));
      t.setVisible(true);
      t.restX = t.x; t.restY = t.y; // quả bông là vật con của cột cào (D3-19)
      this.attachTo(this.pompom, t);
      this.pompom.setVisible(true);
      this.sparkle(t);
      this.sfx('sfx_merge');
      this.swingPompom();
      this.zone('tree', t.getBounds(), D.zone + 2);
      this.startPlay();
    });
  }

  // Lóe sáng nhỏ ở (x, y) khi một mảnh khớp.
  flashAt(x, y) {
    const c = this.add.circle(x, y, 18, 0xfffbe6, 0.9).setDepth(D.fx);
    this.tweens.add({ targets: c, scale: 4, alpha: 0, duration: 260, onComplete: () => c.destroy() });
  }

  startPlay() {
    const T = (ms, fn) => this.playTimers.push(this.time.delayedCall(ms, () => { if (this.stage === 'play') fn(); }));
    const c = this.cat, cb = this.curtainB;
    const [px, py] = this.P('sua_pounce'), [kx, ky] = this.P('sua_scratch_post');
    T(300, () => { this.endPeek(false); this.shadow.setAlpha(0); this.peekOut(1, 600); });
    T(900, () => {
      this.endPeek(false);
      this.shadow.setAlpha(0);
      this.applyKey(c, 'sua_run');
      this.face(c, false);
      const x0 = cb.right - 30, y0 = SHADOW_Y;
      c.setVisible(true).setAlpha(1).setPosition(x0, y0).setDepth(this.tree.depth + 0.002);
      this.tweens.addCounter({ from: 0, to: 1, duration: 600, onUpdate: (tw) => {
        const k = tw.getValue();
        c.setPosition(x0 + (px - x0) * k, y0 + (py - y0) * k - 120 * Math.sin(Math.PI * k));
      } });
      this.dust(x0, y0);
    });
    // Vùng chạm Sữa trong lúc chơi: chạm thì Sữa giật mình biến mất ngay.
    T(1000, () => { this.zone('suaPlay', new Phaser.Geom.Rectangle(px - 130, py - 330, 260 + kx - px, 330), D.zone + 8); });
    const pounce = (ms) => T(ms, () => {
      this.applyKey(c, 'sua_pounce');
      this.face(c, false);
      c.setPosition(px, py);
      this.hop(c, 40, 380);
      this.time.delayedCall(170, () => this.swingPompom());
      this.sfx('sua_sfx_chirp');
    });
    pounce(1500);
    pounce(1900);
    T(2300, () => {
      this.applyKey(c, 'sua_scratch_post');
      this.face(c, false);
      c.setPosition(kx, ky);
      this.wiggle(c, 2, 3, 450);
      this.sfx('l3_sfx_scratch');
    });
    T(2800, () => this.vanish());
  }

  // Sữa chạy vòng ra sau cột cào rồi khuất. Hộp úp nằm im hoàn toàn nhưng bắt đầu nhận chạm.
  vanish() {
    for (const t of this.playTimers) t.remove();
    this.playTimers = [];
    this.stage = 'hidden';
    if (this.zones.suaPlay) this.zones.suaPlay.disableInteractive();
    this.endPeek(false);
    this.shadow.setAlpha(0);
    const c = this.cat;
    this.tweens.killTweensOf(c);
    this.applyKey(c, 'sua_run');
    this.face(c, false);
    c.setVisible(true).setAngle(0).setDepth(this.tree.depth + 0.004); // chạy đi nằm trên cột cào (chủ dự án)
    this.sfx('sua_sfx_meow');
    this.tweens.add({ targets: c, x: this.tree.x + 60, alpha: 0, duration: 350, ease: 'Quad.in', onComplete: () => c.setVisible(false) });
    // G3-5: tay hướng dẫn tắt hết, nhân vật gãi đầu 1 giây, rồi bong bóng nhiệm vụ bật ra giữa màn nhắc tìm mèo và thu về góc.
    this.handHide();
    this.handHide('paw');
    this.time.delayedCall(600, () => this.react('player_scratch_head', 560, 1000, () => { this.touch(); this.bubbleRemind(); }));
    // Không gợi ý tự động (hộp không nhúc nhích, không đuôi, không lấp lánh); chỉ thỉnh thoảng một tiếng "meo" rất nhỏ.
    this.meowLoop = this.time.addEvent({ delay: 7000, loop: true, callback: () => { if (this.stage === 'hidden') this.sfx('sua_sfx_meow', 0.15); } });
  }

  // ---------- lộ diện: chạm hộp úp, hộp lật ngửa, Sữa nằm gọn bên trong ----------
  reveal() {
    this.stage = 'found';
    this.phase = 'found';
    this.locked = true;
    this.handHide();
    this.handHide('paw');
    if (this.meowLoop) { this.meowLoop.remove(); this.meowLoop = null; }
    this.flipBox('l3_sua_in_box', () => {
      this.locked = false;
      const bb = this.box.getBounds();
      // Sữa "ảo" (không vẽ) để cảnh bế chung lấy chỗ và cỡ.
      this.sua = this.add.image(bb.centerX, bb.top + bb.height * 0.45, 'sua_face_icon').setVisible(false);
      this.fitWidth(this.sua, 200);
      this.sfx('sua_sfx_meow_question');
      this.bubbleFound();
      const p = this.sadPlayer;
      p.setVisible(true).setAlpha(0);
      this.tweens.add({ targets: p, alpha: 1, duration: 300 });
      this.time.delayedCall(300, () => this.hop(p, 10, 300));
      this.boxBreath = this.tweens.add({ targets: this.box, scaleY: (this.box.baseY || this.box.base) * 1.02, duration: 1600, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      this.time.delayedCall(750, () => {
        if (this.phase !== 'found') return;
        if (this.renderer.type === Phaser.WEBGL && this.box.preFX) {
          this.glowFx = this.box.preFX.addGlow(SUN, 0, 0, false, 0.1, 14);
          this.tweens.add({ targets: this.glowFx, outerStrength: 4, duration: 700, onComplete: () => {
            this.glowTw = this.tweens.add({ targets: this.glowFx, outerStrength: 1.5, duration: 1000, yoyo: true, repeat: -1 });
          } });
        }
        this.armSua(new Phaser.Geom.Rectangle(bb.x + bb.width * 0.1, bb.y, bb.width * 0.8, bb.height * 0.55));
      });
    });
  }

  suaPoint() { const b = this.box.getBounds(); return [b.centerX - 40, b.top + b.height * 0.3]; }

  beforeEnding() {
    if (this.meowLoop) this.meowLoop.remove();
    if (this.boxBreath) this.boxBreath.stop();
    if (this.glowTw) this.glowTw.stop();
    if (this.glowFx) { this.box.preFX.remove(this.glowFx); this.glowFx = null; }
    this.glow = null;
  }

  // Sữa được bế ra; hộp rỗng ngửa ở lại cảnh nền, cạnh cột cào (ảnh hộp úp xoay 180°).
  endingHide() {
    const b = this.box;
    this.applyKey(b, 'l3_box_upside_down');
    this.boxPivot();
    b.setAngle(180);
  }

  // ---------- gợi ý (G3-10, sửa theo chơi thử): sau khi Sữa biến mất không có gợi ý tự động, chỉ 💡 ----------
  // Cỡ món khi kéo khỏi túi = cỡ nó có trong cảnh (kéo trên bàn, mảnh cột cào, quả cầu).
  dragScale(it) {
    if (it.key === 'l3_scissors') return this.scissors.base;
    const i = PARTS.indexOf(it.key);
    return i >= 0 ? this.placed[i].base : null;
  }

  partItem() { return this.bag && this.bag.items.find((o) => o && o.key === PARTS[this.buildIdx]); }

  hintTarget() {
    switch (this.stage) {
      case 'scissors': return this.scissors;
      case 'cut': return this.box;
      case 'build': return (this.partItem() || {}).s;
    }
    return null;
  }

  hint1() {
    const it = (k) => this.bag && this.bag.items.find((o) => o && o.key === k);
    switch (this.stage) {
      case 'scissors': this.wiggle(this.scissors, 4, 3, 300); break;
      case 'cut': this.wiggle(this.box, 2, 3, 300); if (it('l3_scissors')) this.hop(it('l3_scissors').s, 14, 260); break;
      case 'build': if (this.partItem()) this.hop(this.partItem().s, 14, 260); this.ghostFlash(); break;
    }
  }

  strongHint() {
    this.tweens.add({ targets: this.bulb, scale: this.bulb.base * 0.9, duration: 90, yoyo: true });
    const paw = (pt) => { this.handTap(pt, 'hint', 'paw'); this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw')); };
    const it = (k) => this.bag && this.bag.items.find((o) => o && o.key === k);
    const bc = this.box.getCenter();
    if (this.phase === 'found') { paw(this.suaPoint()); return; }
    switch (this.stage) {
      case 'scissors': paw(this.tipOf(this.scissors)); break;
      case 'cut': if (it('l3_scissors')) this.handDrag(this.slotPos(it('l3_scissors').i), [bc.x, bc.y], 'hint', 'paw', 2); break;
      case 'build': if (this.partItem()) this.handDrag(this.slotPos(this.partItem().i), this.partCenter(this.buildIdx), 'hint', 'paw', 2); break;
      case 'hidden': paw([bc.x, bc.y]); break; // cách duy nhất để được chỉ hộp úp
    }
  }

  update(time) {
    this.followKids();
    if (this.frozen || this.locked || this.phase !== 'search' || this.drag || (this.bag && this.bag.busy)) return;
    if (!['scissors', 'cut', 'build'].includes(this.stage)) return; // 'hidden': không gợi ý tự động
    const idle = (time - this.lastTouch) / 1000, H = this.hints;
    if (idle >= 8 && !H.h1) { H.h1 = true; this.hint1(); }
    if (idle >= 16 && time - H.sparkleAt > 2000) {
      H.sparkleAt = time;
      const t = this.hintTarget();
      if (t) this.sparkle(t);
    }
  }
}
