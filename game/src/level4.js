// Level 4 – Quả chuối trên rèm. Luồng theo levels/levels-01-10.md, levels/states-01-10.md (Level 4) và các quyết định
// G4-9…G4-14, D4-12…D4-20, A4-9…A4-13 trong art/review/level4-thread.md. Lần đầu có ba phòng (ngủ ◄ khách ► làm việc),
// camera trượt ngang; túi đồ của L3 đi theo camera; xếp tháp kéo-thả theo hình dáng (đệm → vali → sách → gối).
// KHUNG ẢNH TẠM: chưa có ảnh thật, mọi key mới tự vẽ bằng makeFallback; vị trí theo bảng design-art-level4.md mục 6.
import { BaseLevel, D, MIN_HIT, SUN, BROWN } from './base.js';

const ROOM_W = 1024;
const BED = 0, LIVING = 1, STUDY = 2;               // phòng ngủ x 0–1024, khách 1024–2048 (bắt đầu), làm việc 2048–3072
// Vị trí dự phòng (= bảng vị trí design-art-level4.md mục 6, toạ độ đúng demo G4-27), toạ độ trong khung phòng; ROOM cho biết key ở phòng nào.
const DEF = {
  l4_window: [518, 640], l4_curtain: [355, 148], sua_curtain_banana: [265, 165], l4_sofa: [734, 1080], l4_stack_mattress: [318, 1140],
  player_reach_up: [340, 857], sua_lick_paw: [470, 1170], player_call: [560, 1250],
  l4_mattress_standing: [128, 975], l4_mattress_fallen: [245, 1075], l4_bedside_lamp: [318, 985], l4_sock_stuck: [320, 682], l4_sock_flat: [760, 850],
  l4_bed: [700, 1035], l4_pillow: [522, 835], l4_teddy: [760, 1165],
  l4_bookshelf_full: [297, 890], l4_book_stack: [160, 1110], l4_desk: [758, 895], l4_suitcase_full: [348, 1190], l4_yoga_ball: [806, 1018],
  l4_spill_duck_ring: [605, 1172], l4_spill_goggles: [230, 1000], l4_spill_slipper: [530, 1030], l4_spill_shirt: [390, 1010], // Art Vòng 8
};
const ROOM = {
  l4_window: LIVING, l4_curtain: LIVING, sua_curtain_banana: LIVING, l4_sofa: LIVING, l4_stack_mattress: LIVING, player_reach_up: LIVING,
  sua_lick_paw: LIVING, player_call: LIVING,
  l4_mattress_standing: BED, l4_mattress_fallen: BED, l4_bedside_lamp: BED, l4_sock_stuck: BED, l4_sock_flat: BED, l4_bed: BED, l4_pillow: BED, l4_teddy: BED,
  l4_bookshelf_full: STUDY, l4_book_stack: STUDY, l4_desk: STUDY, l4_suitcase_full: STUDY, l4_yoga_ball: STUDY,
  l4_spill_duck_ring: STUDY, l4_spill_goggles: STUDY, l4_spill_slipper: STUDY, l4_spill_shirt: STUDY,
};
// Bề rộng dự phòng (= cột "Rộng demo") khi không đọc được design-art.
const FIT = {
  l4_window: 230, l4_curtain: 610, l4_sofa: 560, l4_stack_mattress: 295, l4_mattress_standing: 258, l4_mattress_fallen: 460,
  l4_bedside_lamp: 160, l4_sock_stuck: 80, l4_sock_flat: 170, l4_bed: 600, l4_pillow: 175, l4_teddy: 220, l4_bookshelf_full: 400, l4_book_stack: 200,
  l4_desk: 487, l4_suitcase_full: 435, l4_yoga_ball: 357,
};
// Trạng thái cùng nhóm co cùng tỉ lệ với key đầu nhóm.
const FIT_HEAD = {
  l4_stack_suitcase: 'l4_stack_mattress', l4_stack_books: 'l4_stack_mattress', l4_stack_pillow: 'l4_stack_mattress',
  l4_bookshelf_after: 'l4_bookshelf_full', l4_suitcase_folded: 'l4_suitcase_full',
};
const ORDER = ['l4_mattress_fallen', 'l4_suitcase_folded', 'l4_book_stack', 'l4_pillow'];   // đệm → vali → sách → gối
const STACK = { l4_mattress_fallen: 'l4_stack_mattress', l4_suitcase_folded: 'l4_stack_suitcase', l4_book_stack: 'l4_stack_books', l4_pillow: 'l4_stack_pillow' };
const HOME = { l4_mattress_fallen: BED, l4_pillow: BED, l4_book_stack: STUDY, l4_suitcase_folded: STUDY };
// Xếp tháp (A4-28): món sau đặt đáy = đỉnh phần vẽ món trước + chồng mép; nhân vật đứng lún vào gối 8px.
const OVERLAP = [14, 14, 10], FEET_SINK = 8;
// Bong bóng nhiệm vụ lúc mở màn (G4-31, chủ dự án: nhỏ hơn và cao hơn): tâm (toạ độ màn hình) và cỡ so với bản chung.
const BUBBLE = { x: 700, y: 560, k: 0.8 };
const SOFA = { left: 470, width: 620 };              // G4-24: sofa theo demo phòng khách
const WINDOW_BOX = { right: 640, bottom: 710, height: 530 }; // cửa sổ đo trên l4_demo_living (khung + bậu; mép trái khuất sau rèm)
const POSES = ['sua_curtain_banana', 'sua_curtain_one_paw', 'sua_curtain_upside', 'sua_curtain_sleep']; // đổi mỗi lần về phòng khách
// Chỉ hàng sách tầng dưới cùng rơi (G4-18).
const LOW_ROW = [0.7, 0.95];                          // dải hàng sách dưới cùng (tỉ lệ chiều cao khung kệ), vùng chạm ưu tiên
const GAP = [0.07, 0.77, 0.347, 0.934];               // chỗ trống dự phòng (x0, y0, x1, y1 tỉ lệ khung phần vẽ kệ); ảnh thật thì so pixel _full/_after
// 3 cuốn rơi = 3 cuốn trái hàng trên cùng = chồng sách = sách trên tháp (G4-23, G4-30, Art Vòng 8).
// key theo thứ tự trong chồng sách TỪ DƯỚI LÊN; slot = vị trí cuốn đó trong chỗ trống trên kệ (trái → phải: hồng, bạc hà, vàng).
const FALL_BOOKS = [{ key: 'l4_book_single_yellow', slot: 2 }, { key: 'l4_book_single_mint', slot: 1 }, { key: 'l4_book_single', slot: 0 }];
// Tầng của từng cuốn trong ảnh l4_book_stack (tỉ lệ chiều cao phần vẽ, từ dưới lên: vàng, bạc hà, hồng; đo trên ảnh 301x139).
// Sách rơi đổi dần sang đúng lát cắt này của ảnh chồng sách nên đáp khít, đổi sang ảnh chồng không nhảy hình (G4-37, D4-35).
const SOCK_BED_X = 760;                               // tâm tất nằm trên chăn, bên phải gối (toạ độ phòng ngủ, G4-36)
const SOCK_BED_DROP = 35;                            // G4-42: điểm đáp hạ thấp hơn mép trên chăn, vẫn nằm trọn trên mặt chăn
const BOOK_LAYERS = [[0.69, 1], [0.385, 0.71], [0, 0.405]];
const ARROW = { right: [960, 760], left: [64, 760] }; // mũi tên chuyển phòng (A4-4), toạ độ màn hình (y cộng Y0)

const WHITE = 0xfffaf0, WOOD = 0xd6a472, MINT = 0xb9ddbe, PINK = 0xf8c6cc, SKY = 0xb8daf2, CREAM = 0xfcf1dd, CORAL = 0xee8a7a,
  BUTTER = 0xfce39a, PEACH = 0xf7b9a3, LILAC = 0xd6c8ee, RUST = 0xd98a5a;

// Ảnh tạm: [rộng, cao, neo ('bg' | 'đáy' | 'đỉnh' | 'tâm' | [ax, ay] px), hàm vẽ (g, w, h)]. Cỡ = cỡ hiển thị.
const bg = (wall) => [1024, 1536, 'bg', (g) => {
  g.fillStyle(wall).fillRect(0, 0, 1024, 1000);
  g.fillStyle(0xe8c48c).fillRect(0, 1000, 1024, 536);
  g.lineStyle(3, 0xd9ab78, 0.7);
  for (let y = 1060; y < 1536; y += 80) g.lineBetween(0, y, 1024, y);
  g.fillStyle(0xf3e6d0).fillRect(0, 975, 1024, 25);   // len chân tường y≈1000 (A4-11)
}];
const box = (fill, r = 12) => (g, w, h) => g.lineStyle(4, BROWN).fillStyle(fill).fillRoundedRect(3, 3, w - 6, h - 6, r).strokeRoundedRect(3, 3, w - 6, h - 6, r);
function puff(g, w, h, flip) {
  const B = [[0.5, 0.56, 0.3], [0.28, 0.62, 0.22], [0.72, 0.62, 0.22], [0.38, 0.38, 0.2], [0.62, 0.36, 0.21]];
  const X = (x) => w * (flip ? 1 - x : x), Y = (y) => h * (flip ? y * 0.9 + 0.08 : y);
  g.fillStyle(0xd9c3a5); B.forEach(([x, y, r]) => g.fillCircle(X(x), Y(y), w * r + 3));
  g.fillStyle(0xfffaf0); B.forEach(([x, y, r]) => g.fillCircle(X(x), Y(y), w * r));
}

const FB = {
  l4_bg_living: bg(CREAM), l4_bg_bedroom: bg(0xfbe8ea), l4_bg_study: bg(0xe4f2ea),
  l4_window: [400, 420, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(SKY).fillRect(4, 4, w - 8, h - 8).strokeRect(4, 4, w - 8, h - 8);
    g.lineBetween(w / 2, 4, w / 2, h - 4).lineBetween(4, h / 2, w - 4, h / 2);
  }],
  // Rèm dồn một bên, thanh rèm dài; điểm bám Sữa (305, 200) = ảnh (160, 50).
  l4_curtain: [440, 1000, 'đỉnh', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(RUST);
    g.fillRect(70, 10, 190, h - 14).strokeRect(70, 10, 190, h - 14);
    g.lineStyle(3, 0xb8683e);
    for (let x = 100; x < 260; x += 32) g.lineBetween(x, 20, x, h - 10);
    g.lineStyle(10, WOOD).lineBetween(0, 6, w, 6);
    g.fillStyle(WOOD).fillCircle(6, 6, 12).fillCircle(w - 6, 6, 12);
  }],
  l4_sofa: [360, 200, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(MINT);
    g.fillRoundedRect(10, 10, w - 20, 110, 30).strokeRoundedRect(10, 10, w - 20, 110, 30);
    g.fillRoundedRect(4, 90, w - 8, 90, 24).strokeRoundedRect(4, 90, w - 8, 90, 24);
  }],
  // Tháp: cao 100 / 115 / 90 / 65 để mặt trên rơi đúng 1040 / 925 / 835 / 770 (A4-12).
  l4_stack_mattress: [340, 100, 'đáy', box(WHITE, 26)],
  l4_stack_suitcase: [260, 115, 'đáy', (g, w, h) => { box(CORAL, 16)(g, w, h); g.lineStyle(4, BROWN).strokeRect(w / 2 - 30, 4, 60, 18); }],
  l4_stack_books: [180, 90, 'đáy', (g, w, h) => {
    const c = [SKY, BUTTER, MINT, PINK];
    for (let i = 0; i < 4; i++) g.lineStyle(3, BROWN).fillStyle(c[i]).fillRect(4 + (i % 2) * 6, 2 + i * 22, w - 14, 21).strokeRect(4 + (i % 2) * 6, 2 + i * 22, w - 14, 21);
  }],
  l4_stack_pillow: [150, 65, 'đáy', box(WHITE, 30)],
  l4_bed: [520, 260, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(WOOD).fillRect(4, 4, 40, h - 8).strokeRect(4, 4, 40, h - 8);
    g.fillStyle(LILAC).fillRoundedRect(40, 120, w - 50, 90, 16).strokeRoundedRect(40, 120, w - 50, 90, 16);
    g.fillStyle(WOOD).fillRect(40, 200, w - 50, 30).strokeRect(40, 200, w - 50, 30);
  }],
  l4_pillow: [150, 70, 'đáy', box(WHITE, 30)],
  l4_bedside_lamp: [130, 310, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(BUTTER).fillTriangle(20, 90, w - 20, 90, w / 2, 4).strokeTriangle(20, 90, w - 20, 90, w / 2, 4);
    g.fillStyle(WOOD).fillRect(w / 2 - 8, 90, 16, h - 120).strokeRect(w / 2 - 8, 90, 16, h - 120);
    g.fillRoundedRect(10, h - 34, w - 20, 30, 8).strokeRoundedRect(10, h - 34, w - 20, 30, 8);
  }],
  l4_sock_stuck: [70, 90, 'đỉnh', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(PINK).fillRoundedRect(16, 2, 30, 64, 10).strokeRoundedRect(16, 2, 30, 64, 10);
    g.fillRoundedRect(16, 50, 50, 34, 14).strokeRoundedRect(16, 50, 50, 34, 14);
  }],
  l4_mattress_standing: [230, 420, 'đáy', (g, w, h) => { box(WHITE, 30)(g, w, h); g.lineStyle(2, 0xd8d0c4); for (let y = 60; y < h; y += 60) g.lineBetween(20, y, w - 20, y); }],
  l4_mattress_fallen: [400, 110, 'đáy', (g, w, h) => { box(WHITE, 30)(g, w, h); g.lineStyle(2, 0xd8d0c4); for (let x = 60; x < w; x += 60) g.lineBetween(x, 14, x, h - 14); }],
  l4_teddy: [150, 170, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(WHITE);
    g.fillCircle(42, 22, 18).strokeCircle(42, 22, 18).fillCircle(w - 42, 22, 18).strokeCircle(w - 42, 22, 18);
    g.fillEllipse(w / 2, h - 50, w - 20, 96).strokeEllipse(w / 2, h - 50, w - 20, 96);
    g.fillCircle(w / 2, 56, 46).strokeCircle(w / 2, 56, 46);
    g.fillStyle(BROWN).fillCircle(w / 2 - 16, 52, 5).fillCircle(w / 2 + 16, 52, 5).fillCircle(w / 2, 68, 6);
  }],
  // Kệ 4 ngăn, đáy sách ngăn ở ảnh y 80 / 240 / 400 / 560 (= phòng 440 / 600 / 760 / 920).
  l4_bookshelf_full: [340, 640, 'đáy', (g, w, h) => shelf(g, w, h, true)],
  l4_bookshelf_after: [340, 640, 'đáy', (g, w, h) => shelf(g, w, h, false)], // tầng trên vẫn đầy, tầng dưới trống một khoảng
  l4_book_single: [26, 70, 'tâm', (g, w, h) => box(PINK, 4)(g, w, h)],
  l4_book_single_yellow: [26, 70, 'tâm', (g, w, h) => box(BUTTER, 4)(g, w, h)],
  l4_book_single_mint: [26, 70, 'tâm', (g, w, h) => box(MINT, 4)(g, w, h)],
  l4_book_stack: [180, 150, 'đáy', (g, w, h) => {
    const c = [SKY, BUTTER, MINT, PINK, LILAC, PEACH];
    for (let i = 0; i < 6; i++) g.lineStyle(3, BROWN).fillStyle(c[i]).fillRect(4, 2 + i * 24, w - 8, 23).strokeRect(4, 2 + i * 24, w - 8, 23);
  }],
  l4_desk: [380, 300, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(WOOD).fillRect(4, 10, w - 8, 30).strokeRect(4, 10, w - 8, 30);
    g.fillRect(20, 40, 24, h - 44).strokeRect(20, 40, 24, h - 44).fillRect(w - 44, 40, 24, h - 44).strokeRect(w - 44, 40, 24, h - 44);
    g.fillStyle(SKY).fillRect(w - 90, 0, 60, 12).strokeRect(w - 90, 0, 60, 12); // cây bút (930, 715)
  }],
  l4_suitcase_full: [260, 200, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(CORAL).fillRoundedRect(4, 20, w - 8, h - 24, 40).strokeRoundedRect(4, 20, w - 8, h - 24, 40);
    g.strokeRoundedRect(w / 2 - 34, 2, 68, 24, 8);
    g.lineStyle(3, 0xb85a4a).lineBetween(14, h / 2 + 10, w - 14, h / 2 + 10);
  }],
  l4_suitcase_folded: [260, 200, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(CORAL).fillRoundedRect(4, h - 120, w - 8, 116, 16).strokeRoundedRect(4, h - 120, w - 8, 116, 16);
    g.strokeRoundedRect(w / 2 - 34, h - 140, 68, 24, 8);
  }],
  l4_spill_duck_ring: [130, 70, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(BUTTER).fillEllipse(w / 2, h / 2 + 4, w - 8, h - 14).strokeEllipse(w / 2, h / 2 + 4, w - 8, h - 14);
    g.fillStyle(0xe8c48c).fillEllipse(w / 2, h / 2 + 4, w / 2, h / 3);
    g.fillStyle(BUTTER).fillCircle(w - 22, 18, 16).strokeCircle(w - 22, 18, 16);
  }],
  l4_spill_goggles: [90, 40, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(SKY).fillCircle(26, h / 2, 16).strokeCircle(26, h / 2, 16).fillCircle(w - 26, h / 2, 16).strokeCircle(w - 26, h / 2, 16);
  }],
  l4_spill_slipper: [80, 40, 'đáy', (g, w, h) => g.lineStyle(4, BROWN).fillStyle(PINK).fillEllipse(w / 2, h / 2, w - 6, h - 6).strokeEllipse(w / 2, h / 2, w - 6, h - 6)],
  l4_spill_shirt: [130, 70, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(MINT).fillRect(30, 6, w - 60, h - 10).strokeRect(30, 6, w - 60, h - 10);
    g.fillTriangle(30, 6, 4, 30, 30, 34).strokeTriangle(30, 6, 4, 30, 30, 34).fillTriangle(w - 30, 6, w - 4, 30, w - 30, 34).strokeTriangle(w - 30, 6, w - 4, 30, w - 30, 34);
  }],
  l4_yoga_ball: [220, 220, 'tâm', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(LILAC).fillCircle(w / 2, h / 2, w / 2 - 4).strokeCircle(w / 2, h / 2, w / 2 - 4);
    g.lineStyle(3, 0xa996d6).strokeEllipse(w / 2, h / 2, w - 30, 60).lineBetween(w / 2, 6, w / 2, h - 6);
  }],
  // Sữa treo rèm: cùng khung 150x230, neo = điểm bám (giữa hai bàn chân trước) ở (75, 12).
  sua_curtain_banana: [150, 230, [75, 12], (g) => hang(g, 'banana')],
  sua_curtain_one_paw: [150, 230, [75, 12], (g) => hang(g, 'one')],
  sua_curtain_upside: [150, 230, [75, 12], (g) => hang(g, 'upside')],
  sua_curtain_sleep: [150, 230, [75, 12], (g) => hang(g, 'sleep')],
  sua_curtain_sulk: [150, 230, [75, 12], (g) => hang(g, 'sulk')],
  sua_curl_spin: [140, 140, 'tâm', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(WHITE).fillCircle(w / 2, h / 2, w / 2 - 6).strokeCircle(w / 2, h / 2, w / 2 - 6);
    g.lineStyle(3, 0xe0d6c8).beginPath(); g.arc(w / 2, h / 2, 30, 0, 4.5); g.strokePath();
    g.fillStyle(0x6ab0e0).fillCircle(w / 2 + 26, h / 2 - 22, 6);
  }],
  sua_land: [190, 130, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(WHITE).fillEllipse(w / 2, h - 50, w - 30, 70).strokeEllipse(w / 2, h - 50, w - 30, 70);
    g.fillCircle(w - 40, 46, 34).strokeCircle(w - 40, 46, 34);
    for (const x of [30, 60, w - 70, w - 40]) g.fillRect(x, h - 26, 16, 24).strokeRect(x, h - 26, 16, 24);
  }],
  sua_lick_paw: [150, 175, 'đáy', (g, w, h) => {
    g.lineStyle(4, BROWN).fillStyle(WHITE).fillEllipse(w / 2, h - 50, w - 30, 96).strokeEllipse(w / 2, h - 50, w - 30, 96);
    g.fillTriangle(40, 40, 50, 2, 72, 30).strokeTriangle(40, 40, 50, 2, 72, 30).fillTriangle(78, 30, 100, 2, 110, 40).strokeTriangle(78, 30, 100, 2, 110, 40);
    g.fillCircle(w / 2, 52, 40).strokeCircle(w / 2, 52, 40);
    g.fillStyle(0xf09aaa).fillEllipse(w / 2 + 6, 82, 12, 16);
    g.fillStyle(WHITE).fillEllipse(w / 2 + 20, 92, 30, 44).strokeEllipse(w / 2 + 20, 92, 30, 44);
    g.lineStyle(3, BROWN).lineBetween(w / 2 - 22, 50, w / 2 - 8, 50).lineBetween(w / 2 + 8, 50, w / 2 + 22, 50); // mắt nhắm thản nhiên
  }],
  player_reach_up: [200, 440, 'đáy', (g, w, h) => kid(g, w, h, true)],
  player_silly_laugh: [200, 440, 'đáy', (g, w, h) => kid(g, w, h, false)],
  ui_thought_bubble: [250, 250, [50, 250], (g, w, h) => {
    g.fillStyle(0xffffff).lineStyle(4, BROWN);
    g.fillEllipse(w * 0.55, h * 0.36, w * 0.88, h * 0.62).strokeEllipse(w * 0.55, h * 0.36, w * 0.88, h * 0.62);
    g.fillCircle(w * 0.3, h * 0.8, 14).strokeCircle(w * 0.3, h * 0.8, 14);
    g.fillCircle(w * 0.2, h * 0.94, 9).strokeCircle(w * 0.2, h * 0.94, 9);
  }],
  // Cụm khói bụi (G4-44): các bướu tròn kem chồng nhau, viền nâu nhạt chỉ ở mép ngoài.
  fx_dust_puff: [300, 220, 'tâm', (g, w, h) => puff(g, w, h, false)],
  fx_dust_puff_b: [300, 220, 'tâm', (g, w, h) => puff(g, w, h, true)],
  ui_room_arrow: [110, 150, 'tâm', (g, w, h) => {
    g.fillStyle(0xfdf6e8).lineStyle(6, BROWN);
    g.fillTriangle(10, 10, w - 8, h / 2, 10, h - 10).strokeTriangle(10, 10, w - 8, h / 2, 10, h - 10);
  }],
};

function shelf(g, w, h, full) {
  g.lineStyle(4, BROWN).fillStyle(WOOD).fillRect(4, 4, w - 8, h - 8).strokeRect(4, 4, w - 8, h - 8);
  g.fillStyle(0xb98a5c).fillRect(20, 20, w - 40, h - 40);
  const c = [SKY, BUTTER, MINT, PINK, LILAC, PEACH, CORAL];
  for (const y of [80, 240, 400, 560]) {
    g.fillStyle(WOOD).fillRect(20, y, w - 40, 14).strokeRect(20, y, w - 40, 14);
    for (let i = 0; i < 9; i++) if (full || y < 560 || i >= 6) g.fillStyle(c[(i + y) % c.length]).fillRect(28 + i * 31, y - 110, 26, 110).strokeRect(28 + i * 31, y - 110, 26, 110);
  }
}
// Sữa treo: điểm bám (75, 12) ở đỉnh ảnh; thân duỗi xuống. upside: đầu dưới, đuôi chĩa lên; sulk: quay lưng.
function hang(g, pose) {
  g.lineStyle(4, BROWN).fillStyle(WHITE);
  const bodyY = pose === 'one' ? 130 : 120;
  if (pose === 'one') g.fillRoundedRect(66, 4, 18, 70, 8).strokeRoundedRect(66, 4, 18, 70, 8);
  else { g.fillRoundedRect(52, 4, 18, 70, 8).strokeRoundedRect(52, 4, 18, 70, 8); g.fillRoundedRect(80, 4, 18, 70, 8).strokeRoundedRect(80, 4, 18, 70, 8); }
  g.fillEllipse(75, bodyY, 70, 120).strokeEllipse(75, bodyY, 70, 120);
  if (pose === 'banana' || pose === 'sleep') { // bốn chân dang kiểu quả chuối
    g.fillRoundedRect(20, 160, 18, 60, 8).strokeRoundedRect(20, 160, 18, 60, 8).fillRoundedRect(112, 160, 18, 60, 8).strokeRoundedRect(112, 160, 18, 60, 8);
  }
  if (pose === 'upside') { // đầu ở dưới, đuôi chĩa lên
    g.fillCircle(75, 200, 32).strokeCircle(75, 200, 32);
    g.fillEllipse(118, 60, 22, 90).strokeEllipse(118, 60, 22, 90);
    g.fillStyle(0x6ab0e0).fillCircle(64, 206, 5).fillCircle(86, 206, 5);
    return;
  }
  const hy = pose === 'one' ? 80 : 70;
  g.fillStyle(WHITE).fillCircle(75, hy, 34).strokeCircle(75, hy, 34);
  g.fillTriangle(48, hy - 20, 52, hy - 50, 68, hy - 30).strokeTriangle(48, hy - 20, 52, hy - 50, 68, hy - 30);
  g.fillTriangle(82, hy - 30, 98, hy - 50, 102, hy - 20).strokeTriangle(82, hy - 30, 98, hy - 50, 102, hy - 20);
  if (pose === 'sulk') return; // quay lưng: không có mặt
  if (pose === 'sleep') g.lineStyle(3, BROWN).lineBetween(58, hy, 70, hy).lineBetween(80, hy, 92, hy);
  else g.fillStyle(0x6ab0e0).fillCircle(64, hy, pose === 'one' ? 4 : 6).fillCircle(86, hy, pose === 'one' ? 4 : 6);
}
// Nhân vật trên đỉnh tháp: reach = kiễng chân, hai tay vươn thẳng lên (đầu ngón tay ở đỉnh ảnh); không thì gãi đầu cười.
function kid(g, w, h, reach) {
  const cx = w / 2, top = 120;
  g.lineStyle(4, BROWN);
  g.fillStyle(SKY).fillRect(cx - 40, h - 140, 80, 130).strokeRect(cx - 40, h - 140, 80, 130);
  g.fillStyle(BUTTER).fillRoundedRect(cx - 55, top + 90, 110, h - 140 - top - 80, 26).strokeRoundedRect(cx - 55, top + 90, 110, h - 140 - top - 80, 26);
  if (reach) g.fillRoundedRect(cx - 50, 4, 26, top + 110, 12).strokeRoundedRect(cx - 50, 4, 26, top + 110, 12).fillRoundedRect(cx + 24, 4, 26, top + 110, 12).strokeRoundedRect(cx + 24, 4, 26, top + 110, 12);
  else g.fillRoundedRect(cx + 30, top - 10, 26, 130, 12).strokeRoundedRect(cx + 30, top - 10, 26, 130, 12);
  g.fillStyle(0xfde3cf).fillCircle(cx, top + 45, 48).strokeCircle(cx, top + 45, 48);
  g.fillStyle(0x9b6a45).fillEllipse(cx, top + 10, 96, 40);
  if (reach) g.fillStyle(BROWN).fillCircle(cx - 16, top + 50, 5).fillCircle(cx + 16, top + 50, 5);
  else { g.lineStyle(3, BROWN).lineBetween(cx - 22, top + 48, cx - 10, top + 48).lineBetween(cx + 10, top + 48, cx + 22, top + 48); g.beginPath(); g.arc(cx, top + 62, 14, 0.2, Math.PI - 0.2); g.strokePath(); }
}

export class Level4 extends BaseLevel {
  constructor() { super('Level4'); }

  get levelNo() { return 4; }
  get nextLevel() { return 'Level5'; } // G5-4: thắng L4 sang L5
  get rewardFish() { return 30 + 5 * this.secrets; }
  get defaultPos() { return DEF; }
  get fitHead() { return FIT_HEAD; }
  get bagTapFeedback() { return false; } // G4-31: chạm món trong túi không phản ứng gì (vẫn kéo-thả được)
  get bagLandHop() { return false; }     // G4-31: món bay vào ô dừng êm, không nảy

  // Toạ độ trong khung phòng → thế giới (D4-12).
  P(key) { const p = super.P(key); return [p[0] + (ROOM[key] || 0) * ROOM_W, p[1]]; }
  W(room, [x, y]) { return [x + room * ROOM_W, y]; }
  get camX() { return this.cameras.main.scrollX; }

  resetLevel() {
    const A = this.A;
    A.fit = A.fit || {};
    if (!A.fit[4] || !Object.keys(A.fit[4]).length) A.fit[4] = { ...FIT };
    Object.assign(this, { room: LIVING, moving: false, poseIdx: 0, stack: [],
      got: {}, secrets: 0, sockState: 'hidden', duckDone: false, taught: {}, arrowPulse: null, meowEv: null, climax: false,
      kbgs: [], sleepEv: null });
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
    if (neo === 'bg') { ax = 0; ay = 0; }
    else if (neo === 'đỉnh') ay = 0;
    else if (neo === 'tâm') ay = h / 2;
    else if (Array.isArray(neo)) [ax, ay] = neo;
    this.A.entries[key] = { url: null, real: false, ax, ay, res: 1 };
  }

  // ---------- túi đồ đi theo camera (D4-13) ----------
  get bagSlotX() { return super.bagSlotX.map((x) => x + this.camX); }
  bagX() { return super.bagX() + this.camX; }
  bagLayout() { super.bagLayout(); this.bag.bar.setX(this.bagX()); }

  // ---------- dựng ba phòng ----------
  buildRoom() {
    this.buildBg('l4_bg_bedroom');
    // Hai nền còn lại đặt bên phải, cũng kéo dài trên/dưới như nền đầu.
    this.kbgs = ['l4_bg_living', 'l4_bg_study'].map((key, i) => {
      const x = (i + 1) * ROOM_W, b = this.img(key, x, 0, D.bg).setOrigin(0, 0);
      const tex = this.textures.get(key), src = tex.getSourceImage(), strip = Math.round(src.height * 0.05);
      if (!tex.has('top')) tex.add('top', 0, 0, 0, src.width, strip);
      if (!tex.has('bottom')) tex.add('bottom', 0, 0, src.height - strip, src.width, strip);
      return { b, top: this.add.image(x, 0, key, 'top').setOrigin(0, 1).setDepth(D.bg), bottom: this.add.image(x, 1536, key, 'bottom').setOrigin(0, 0).setDepth(D.bg) };
    });
    const P = (k) => this.P(k);

    // Phòng khách: nền → cửa sổ → rèm → Sữa trên rèm → sofa → tháp → nhân vật → Sữa dưới sàn.
    this.fitBox(this.img('l4_window', ...P('l4_window'), 5), WINDOW_BOX);
    this.curtain = this.img('l4_curtain', ...P('l4_curtain'), 10);
    this.hangCat = this.img(POSES[0], ...P('sua_curtain_banana'), 11);
    this.attachTo(this.hangCat, this.curtain); // Sữa đung đưa theo rèm (D4-14)
    this.sofa = this.img('l4_sofa', ...P('l4_sofa'), 20);
    this.placeSofa();
    this.climber = this.img('player_reach_up', ...P('player_reach_up'), 40).setVisible(false);
    this.cat = this.img('sua_curl_spin', 0, 0, 45).setVisible(false);
    this.player = this.img('player_call', ...P('player_call'), D.player).setVisible(false); // cùng cỡ L1–L3 (G4-25, A4-18)

    // Phòng ngủ.
    this.bed = this.img('l4_bed', ...P('l4_bed'), 10);
    this.pillow = this.img('l4_pillow', ...P('l4_pillow'), 11);
    this.restOnBed(this.pillow);
    this.lamp = this.img('l4_bedside_lamp', ...P('l4_bedside_lamp'), 12);
    this.sock = this.img('l4_sock_stuck', ...P('l4_sock_stuck'), 13).setVisible(false);
    // Đệm dựng nằm sau tủ đầu giường (G4-31); đệm đổ là sprite riêng nằm trước, hiện dần khi đệm dựng đổ xuống.
    this.mattress = this.img('l4_mattress_standing', ...P('l4_mattress_standing'), 11.5);
    this.matFallen = this.img('l4_mattress_fallen', ...P('l4_mattress_fallen'), 14).setVisible(false);
    this.teddy = this.img('l4_teddy', ...P('l4_teddy'), 15);

    // Phòng làm việc.
    this.shelf = this.img('l4_bookshelf_full', ...P('l4_bookshelf_full'), 10);
    this.desk = this.img('l4_desk', ...P('l4_desk'), 11);
    this.bookStack = this.img('l4_book_stack', ...P('l4_book_stack'), 13.5).setVisible(false); // trên vali (13), Art Vòng 8
    this.suitcase = this.img('l4_suitcase_full', ...P('l4_suitcase_full'), 13);
    this.spills = ['l4_spill_duck_ring', 'l4_spill_goggles', 'l4_spill_slipper', 'l4_spill_shirt'].map((k) => this.img(k, ...P(k), 17).setVisible(false)); // đồ rơi nằm gần hơn bóng (đáy y lớn hơn): vẽ trên bóng
    this.ball = this.img('l4_yoga_ball', ...P('l4_yoga_ball'), 18); // G4-31: trên vali và đồ bung
    this.centerOnArt(this.ball); // xoay quanh tâm hình tròn của quả bóng (G4-18)
    this.ballHome = [this.ball.x, this.ball.y];

    // Mũi tên chuyển phòng (giao diện, D4-12).
    this.arrowR = this.img('ui_room_arrow', 0, 0, D.ui, true).setOrigin(0.5, 0.5);
    this.arrowL = this.img('ui_room_arrow', 0, 0, D.ui, true).setOrigin(0.5, 0.5).setFlipX(true);

    // Vùng chạm.
    this.zone('curtain', this.artRect(this.curtain), D.zone + 1);
    this.zone('suaHang', this.artRect(this.hangCat), D.zone + 2);
    const sr = this.artRect(this.sofa); // vùng chạm sofa không lố sang phòng làm việc
    this.zone('sofa', new Phaser.Geom.Rectangle(sr.x, sr.y, Math.min(sr.right, (LIVING + 1) * ROOM_W) - sr.x, sr.height), D.zone + 1);
    this.zone('mattress', this.artRect(this.mattress), D.zone + 2);
    this.zone('pillow', this.artRect(this.pillow), D.zone + 3);
    this.zone('teddy', this.artRect(this.teddy), D.zone + 2);
    this.zone('sock', this.artRect(this.sock), D.zone + 4).disableInteractive();
    this.zone('shelf', this.artRect(this.shelf), D.zone + 1);
    // Hàng sách thấp nhất ("chạm cuốn thấp nhất"): ưu tiên hơn vali đứng trước kệ (G4-18 chơi thử).
    this.zone('shelfLow', this.shelfLowRect(), D.zone + 6);
    this.zone('desk', this.artRect(this.desk), D.zone + 1);
    this.zone('books', this.artRect(this.bookStack), D.zone + 4).disableInteractive(); // chồng sách đè góc vali: ưu tiên hơn vali
    this.zone('suitcase', this.artRect(this.suitcase), D.zone + 3);
    this.spills.forEach((s, i) => this.zone('spill' + i, this.artRect(s), D.zone + 4).disableInteractive());
    this.zone('ball', this.artRect(this.ball), D.zone + 5);
    this.zone('arrowR', new Phaser.Geom.Rectangle(0, 0, 140, 200), D.uiZone, true);
    this.zone('arrowL', new Phaser.Geom.Rectangle(0, 0, 140, 200), D.uiZone, true);
    this.showArrows();
  }

  layout() {
    super.layout();
    this.bubbleCenter = [BUBBLE.x, BUBBLE.y + this.Y0]; // G4-31: bong bóng nhiệm vụ cao hơn
    if (this.bubble.home === 'center') this.bubble.ct.setPosition(...this.bubbleCenter);
    this.cameras.main.setScroll(this.room * ROOM_W, -this.Y0);
    for (const k of this.kbgs) {
      const s = k.b.scaleX;
      k.top.setScale(s, Math.max(0.001, (this.Y0 + 2) / k.top.height)).setVisible(this.Y0 > 0);
      k.bottom.setScale(s, Math.max(0.001, (this.Y0 + 2) / k.bottom.height)).setVisible(this.Y0 > 0);
    }
    const ay = ARROW.right[1] + this.Y0;
    this.arrowR.setPosition(ARROW.right[0], ay);
    this.arrowL.setPosition(ARROW.left[0], ay);
    this.fitWidth(this.arrowR, 110);
    this.fitWidth(this.arrowL, 110);
    this.zones.arrowR.setPosition(ARROW.right[0], ay);
    this.zones.arrowL.setPosition(ARROW.left[0], ay);
    if (this.bag) this.bagLayout();
  }

  // Phòng khách có cả ◄ ►, phòng ngủ chỉ ►, phòng làm việc chỉ ◄.
  showArrows() {
    const r = this.room, on = (z, v) => this.zones[z][v ? 'setInteractive' : 'disableInteractive']();
    this.arrowL.setVisible(r > BED);
    this.arrowR.setVisible(r < STUDY);
    on('arrowL', r > BED);
    on('arrowR', r < STUDY);
  }

  // Khung phần vẽ thật của sprite (bỏ lề trong suốt), toạ độ thế giới; vùng chạm ôm đúng hình đồ vật.
  artRect(s) {
    const f = this.textures.get(s.key).get(this.iconFrame(s.key));
    const left = s.x - s.originX * s.width * s.scaleX, top = s.y - s.originY * s.height * s.scaleY;
    return new Phaser.Geom.Rectangle(left + f.cutX * s.scaleX, top + f.cutY * s.scaleY, f.cutWidth * s.scaleX, f.cutHeight * s.scaleY);
  }

  // Dải hàng sách dưới cùng của kệ; xr = khoảng x (tỉ lệ bề rộng kệ), mặc định cả hàng.
  shelfLowRect(xr = [0.06, 0.94]) {
    const r = this.artRect(this.shelf);
    return new Phaser.Geom.Rectangle(r.x + r.width * xr[0], r.y + r.height * LOW_ROW[0], r.width * (xr[1] - xr[0]), r.height * (LOW_ROW[1] - LOW_ROW[0]));
  }

  // Gối nằm trên mặt nệm (G4-22, chủ dự án: gối lơ lửng): dò mép trên của giường ở cột giữa gối,
  // đặt đáy gối thấp hơn mép đó 0,67 chiều cao gối như demo (đáy gối 835, mép sau nệm 768, gối cao 100).
  restOnBed(s, sink = 0.67) {
    const r = this.artRect(s), top = this.bedTopAt(r.centerX);
    if (top !== null) s.y += top + r.height * sink - r.bottom;
  }

  // Mép trên phần vẽ của giường ở cột x (toạ độ thế giới); null nếu x ngoài giường.
  bedTopAt(wx) {
    const b = this.bed, src = b.texture.getSourceImage();
    const px = Math.round((wx - (b.x - b.originX * b.width * b.scaleX)) / b.scaleX);
    if (px < 0 || px >= src.width) return null;
    const c = document.createElement('canvas');
    c.width = 1; c.height = src.height;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(src, px, 0, 1, src.height, 0, 0, 1, src.height);
    const d = x.getImageData(0, 0, 1, src.height).data;
    let y = 0;
    while (y < src.height && d[y * 4 + 3] < 128) y++;
    if (y >= src.height) return null;
    return b.y - b.originY * b.height * b.scaleY + y * b.scaleY;
  }

  // Co và đặt sprite cho phần vẽ thật khớp khung đo trên demo (mép phải, mép dưới, chiều cao; toạ độ phòng khách).
  fitBox(s, { right, bottom, height }) {
    const k = height / this.artRect(s).height;
    s.setScale(s.scaleX * k, s.scaleY * k);
    s.base = s.scaleX; s.baseY = s.scaleY;
    const r = this.artRect(s);
    s.x += LIVING * ROOM_W + right - r.right;
    s.y += bottom - r.bottom;
    return s;
  }

  // Sofa đúng demo (G4-24): mép trái phần vẽ ≈ 470, rộng ≈ 620, không thu nhỏ; phần lố mép phải cắt theo biên phòng khách
  // để khi trượt sang phòng làm việc không thấy mẩu sofa.
  placeSofa() {
    const s = this.sofa, r = this.artRect(s), k = SOFA.width / r.width;
    s.setScale(s.scaleX * k, s.scaleY * k);
    s.base = s.scaleX; s.baseY = s.scaleY;
    s.x += LIVING * ROOM_W + SOFA.left - this.artRect(s).x;
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0xffffff).fillRect(LIVING * ROOM_W, -2000, ROOM_W, 6000);
    s.setMask(g.createGeometryMask());
  }

  // Chỗ trống trên kệ sau khi đổ (toạ độ thế giới): `_after` dựng từ chính `_full` nên so pixel hai ảnh, khung bao vùng khác
  // nhau là chỗ 3 cuốn đã rơi (hàng nào cũng được). Không so được (ảnh tạm, khác khung) thì lấy tỉ lệ dự phòng GAP.
  shelfGap() {
    const r = this.artRect(this.shelf);
    let g = [...GAP];
    try {
      const a = this.textures.get('l4_bookshelf_full').getSourceImage(), b = this.textures.get('l4_bookshelf_after').getSourceImage();
      if (this.A.entries.l4_bookshelf_after.real && a.width === b.width && a.height === b.height) {
        const w = a.width, h = a.height, read = (img) => {
          const c = document.createElement('canvas'); c.width = w; c.height = h;
          const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data;
        };
        const A = read(a), B = read(b);
        let l = w, t = h, rr = -1, bb = -1;
        for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
          const i = (y * w + x) * 4;
          if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) + Math.abs(A[i + 3] - B[i + 3]) > 90) {
            if (x < l) l = x; if (x > rr) rr = x; if (y < t) t = y; if (y > bb) bb = y;
          }
        }
        // Chỉ nhận khi vùng khác nhau nhỏ (đúng một cụm sách), không phải hai ảnh vẽ khác nhau toàn bộ.
        if (rr > l && (rr - l) * (bb - t) < w * h * 0.15) {
          // khung ảnh → khung phần vẽ (artRect) của kệ
          const f = this.textures.get('l4_bookshelf_full').get(this.iconFrame('l4_bookshelf_full'));
          g = [(l - f.cutX) / f.cutWidth, (t - f.cutY) / f.cutHeight, (rr - f.cutX) / f.cutWidth, (bb - f.cutY) / f.cutHeight];
        }
      }
    } catch { /* giữ GAP */ }
    return new Phaser.Geom.Rectangle(r.x + r.width * g[0], r.y + r.height * g[1], r.width * (g[2] - g[0]), r.height * (g[3] - g[1]));
  }

  zoneTo(name, s) {
    const z = this.zones[name], b = this.artRect(s);
    z.setPosition(b.centerX, b.centerY).setSize(Math.max(MIN_HIT, b.width), Math.max(MIN_HIT, b.height));
    z.input && z.input.hitArea.setSize(z.width, z.height);
  }

  // Cảnh lộ diện: không có bàn tay chỉ vào mèo (như level 3); nút 💡 vẫn chỉ được.
  armSua(rect) {
    if (this.phase !== 'found' || this.ending || !rect) return;
    this.zone('sua', rect, D.zone + 10);
  }

  // ---------- mở màn: "xoẹt xoẹt… phựt!", rèm đung đưa, Sữa treo sẵn trên đỉnh rèm (G4-14) ----------
  intro() {
    super.intro();
    this.player.setX(this.camX - 260); // nhân vật đi vào từ mép trái phòng khách
  }

  onIntro() {
    this.sfx('l3_sfx_scratch');
    this.time.delayedCall(500, () => this.sfx('sfx_cloth'));
    this.swingCurtain(3, 1.2);
    this.meowEv = this.time.addEvent({ delay: 3200, loop: true, callback: () => {
      if (this.room === LIVING && !this.climax) { this.sfx('sua_sfx_meow', 0.35); this.swingCurtain(1.2, 0.6); }
    } });
    // Lần đầu chuyển phòng: mũi tên ◄ nhấp nháy (không có bàn tay hướng dẫn từ level 4, G4-19).
    this.time.delayedCall(4200, () => {
      if (this.taught.arrow) return;
      this.arrowPulse = this.tweens.add({ targets: this.arrowL, scale: this.arrowL.base * 1.18, duration: 450, yoyo: true, repeat: -1 });
    });
  }

  // Rèm đung đưa quanh thanh treo; Sữa (vật con) đung đưa theo.
  swingCurtain(deg = 2, k = 1) {
    const c = this.curtain;
    this.tweens.killTweensOf(c);
    this.tweens.addCounter({ from: 0, to: 1, duration: 1400 * k, onUpdate: (tw) => {
      const t = tw.getValue();
      c.angle = deg * Math.exp(-t * 2.5) * Math.sin(2 * Math.PI * t * 2);
    }, onComplete: () => (c.angle = 0) });
  }

  // Bong bóng nhiệm vụ mở màn nhỏ hơn bản chung (G4-31).
  bubbleIntro() {
    const B = this.bubble, k = BUBBLE.k;
    B.home = 'center';
    B.ct.setVisible(true).setPosition(...this.bubbleCenter).setScale(0);
    this.sfx('sfx_meow_question');
    this.tweens.chain({ targets: B.ct, tweens: [{ scale: k * 1.15, duration: 230, ease: 'Quad.out' }, { scale: k, duration: 120 }] });
    this.qHop = this.time.addEvent({ delay: 700, repeat: 1, callback: () => this.hop(B.q, 14, 300) });
    this.time.delayedCall(1900, () => this.bubbleToCorner());
  }

  // ---------- nhập liệu ----------
  handleLevel(name) {
    if (this.moving) return;
    if (name.startsWith('spill')) { this.spillTap(Number(name.slice(5))); return; }
    switch (name) {
      case 'arrowR': this.goRoom(this.room + 1); break;
      case 'arrowL': this.goRoom(this.room - 1); break;
      case 'curtain': case 'suaHang': this.curtainTap(); break;
      case 'sofa': this.squash(this.sofa); this.sfx('sfx_cushion_soft'); break;
      case 'mattress': this.mattressTap(); break;
      case 'pillow': this.pickUp('l4_pillow', this.pillow, 'pillow'); break;
      case 'teddy': this.teddyTap(); break;
      case 'sock': this.sockTap(); break;
      case 'shelf': case 'shelfLow': this.shelfTap(); break;
      case 'books': this.pickUp('l4_book_stack', this.bookStack, 'books'); break;
      case 'suitcase': this.suitcaseTap(); break;
      case 'ball': this.ballTap(); break;
      case 'desk': this.deskTap(); break;
    }
  }

  // ---------- chuyển phòng: camera trượt 0,4 giây; về phòng khách thì Sữa đổi tư thế treo ----------
  goRoom(r) {
    if (r < BED || r > STUDY || r === this.room || this.moving) return;
    this.moving = true;
    this.handHide();
    if (this.arrowPulse) { this.arrowPulse.stop(); this.arrowPulse = null; this.fitWidth(this.arrowL, 110); }
    this.taught.arrow = true;
    this.room = r;
    this.sfx('sfx_tap');
    this.showArrows();
    this.tweens.add({ targets: this.cameras.main, scrollX: r * ROOM_W, duration: 400, ease: 'Sine.inOut',
      onUpdate: () => { if (this.bag) this.bagLayout(); },
      onComplete: () => { this.moving = false; if (this.bag) this.bagLayout(); this.touch(); } });
  }

  nextPose() {
    this.poseIdx = (this.poseIdx + 1) % POSES.length;
    this.applyKey(this.hangCat, POSES[this.poseIdx]);
    this.setSleep(POSES[this.poseIdx] === 'sua_curtain_sleep');
  }

  // Bong bóng ngủ (code vẽ): vòng tròn nở dần bay lên khi Sữa ngủ gật trên rèm.
  setSleep(on) {
    if (this.sleepEv) { this.sleepEv.remove(); this.sleepEv = null; }
    if (!on) return;
    this.sleepEv = this.time.addEvent({ delay: 900, loop: true, callback: () => {
      const b = this.hangCat.getBounds();
      const c = this.add.circle(b.right - 10, b.top + 40, 8, 0xffffff, 0.85).setStrokeStyle(3, BROWN, 0.6).setDepth(12);
      this.tweens.add({ targets: c, x: c.x + 30, y: c.y - 90, scale: 2.4, alpha: 0, duration: 1500, onComplete: () => c.destroy() });
    } });
  }

  // Chạm rèm / Sữa (Lẩn tránh, G4-29): rèm đung đưa, Sữa kêu và đổi sang tư thế treo kế tiếp (1 → 2 → 3 → 4 → 1).
  curtainTap() {
    if (this.climax) return;
    this.swingCurtain(3, 1);
    this.sfx('sfx_cloth');
    this.sfx('sua_sfx_meow_short');
    this.nextPose();
  }

  // ---------- nhặt đồ ----------
  pickUp(key, s, zoneName) {
    if (this.got[key] || this.busy.pick) return;
    this.got[key] = true;
    this.busy.pick = true;
    this.zones[zoneName].disableInteractive();
    this.bagShow(() => {
      this.bagAdd(key, s, () => { this.busy.pick = false; this.touch(); });
      s.setVisible(false);
    });
  }

  // Đệm dựng: chạm thì đổ "phịch" (không rung, không bụi), một chiếc tất văng lên dính vào đèn ngủ. Đệm nằm: chạm thì vào túi.
  mattressTap() {
    const m = this.mattress;
    if (m.key === 'l4_mattress_fallen') { this.pickUp('l4_mattress_fallen', m, 'mattress'); return; }
    if (this.busy.mattress) return;
    this.busy.mattress = true;
    // Đổ mượt (G4-31, G4-38): đệm dựng đứng yên ở sau tủ đầu giường; chạm vào là lên lớp TRƯỚC tủ rồi ngả xuống, khung phần vẽ
    // co giãn dần từ khung đệm dựng sang đúng khung đệm nằm; chạm sàn thì đổi sang ảnh đệm nằm (cùng khung: không chớp, không mờ).
    const f = this.matFallen, r0 = this.artRect(m), r1 = this.artRect(f);
    const sx = m.scaleX, sy = m.scaleY;
    m.setDepth(f.depth); // G4-38: vừa bắt đầu đổ là đệm đã ở lớp trước tủ đầu giường
    this.tweens.addCounter({ from: 0, to: 1, duration: 360, ease: 'Quad.in', onUpdate: (tw) => {
      const k = tw.getValue(), w = r0.width + (r1.width - r0.width) * k, h = r0.height + (r1.height - r0.height) * k;
      m.setScale(sx * w / r0.width, sy * h / r0.height);
      const r = this.artRect(m);
      m.x += r0.x + (r1.x - r0.x) * k - r.x;
      m.y += r0.bottom + (r1.bottom - r0.bottom) * k - r.bottom;
    }, onComplete: () => {
      m.destroy();
      f.setVisible(true).setAlpha(1);
      this.squash(f);
      this.mattress = f;
      this.sfx('l4_sfx_mattress_thud');
      this.zoneTo('mattress', f);
      const b = this.artRect(f);
      this.flySock(b.centerX, b.top);
      this.busy.mattress = false;
    } });
  }

  // Tất bay cung từ đệm lên dính mép chao đèn.
  flySock(x0, y0) {
    // Móc tất (neo đỉnh = nếp gập) vắt trên mép chao đèn, toạ độ Art đo trên demo (bảng mục 6).
    const s = this.sock, [x1, y1] = this.P('l4_sock_stuck');
    s.setVisible(true).setPosition(x0, y0);
    this.tweens.addCounter({ from: 0, to: 1, duration: 500, onUpdate: (tw) => {
      const k = tw.getValue();
      s.setPosition(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k - 160 * Math.sin(Math.PI * k)).setAngle(540 * k);
    }, onComplete: () => {
      s.setAngle(0);
      this.sockState = 'stuck';
      this.zoneTo('sock', s);
      this.zones.sock.setInteractive();
    } });
  }

  // 🎁 Tất trên đèn (G4-36, G4-39): nhún nhẹ, nhảy theo đường cong lên mặt chăn, giữ nguyên ảnh tất và xoay vòng liên tục lúc bay,
  // đáp thì dừng xoay ở góc ban đầu, nảy nhẹ, nằm lại trên giường; 5 cá khô (một lần).
  sockTap() {
    if (this.sockState !== 'stuck') return;
    this.sockState = 'bed';
    this.zones.sock.disableInteractive();
    const s = this.sock, b0 = s.getBounds();
    this.secrets++;
    this.fishBurst(b0.centerX, b0.top, 5);
    this.squash(s, () => {
      // Xoay quanh tâm phần vẽ (giữ chỗ đứng), đích: tâm tất ở SOCK_BED_X, đáy phần vẽ lún nhẹ vào mép trên của chăn.
      this.centerOnArt(s);
      const r = this.artRect(s), bx = this.W(BED, [SOCK_BED_X, 0])[0], top = this.bedTopAt(bx);
      const x0 = s.x, y0 = s.y, x1 = bx, y1 = (top === null ? 850 : top) + r.height * 0.25 - r.height / 2 + SOCK_BED_DROP;
      this.sfx('sfx_cloth');
      this.tweens.addCounter({ from: 0, to: 1, duration: 700, ease: 'Sine.inOut', onUpdate: (tw) => {
        const k = tw.getValue();
        s.setPosition(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k - 170 * Math.sin(Math.PI * k)).setAngle(720 * k);
      }, onComplete: () => {
        s.setPosition(x1, y1).setAngle(0).setDepth(this.bed.depth + 0.5); // nằm trên chăn như vật con của giường
        this.sfx('sfx_cloth_drop', 0.7);
        this.hop(s, 12, 220);
      } });
    });
  }

  // 🎭 Gấu bông: nhún, bật nhẹ rồi ngồi lại (G4-13). Không vào túi.
  teddyTap() {
    if (this.busy.teddy) return;
    this.busy.teddy = true;
    this.sfx('l4_sfx_teddy_flop');
    this.squash(this.teddy, () => this.hop(this.teddy, 26, 320));
    this.time.delayedCall(600, () => (this.busy.teddy = false));
  }

  // Kệ sách: chỉ hàng sách tầng dưới cùng đổ domino (G4-18), rơi lần lượt rồi tự xếp thành một chồng vuông vức dưới sàn;
  // các tầng trên vẫn đầy sách.
  shelfTap() {
    const sh = this.shelf;
    if (sh.key !== 'l4_bookshelf_full') { this.wiggle(sh, 1, 2, 240); return; }
    if (this.busy.shelf) return;
    if (!this.got.l4_suitcase_folded) { this.shelfLocked(); return; } // G4-34: vali vào túi rồi mới rơi sách
    this.busy.shelf = true;
    this.zones.shelf.disableInteractive();
    this.zones.shelfLow.disableInteractive();
    this.wiggle(sh, 2.5, 3, 360);
    // G4-30, G4-37: 3 cuốn ở chỗ trống (ảnh `_after` = `_full` bỏ 3 cuốn) bật ra lần lượt, vừa rơi vừa xoay từ dựng sang nằm;
    // quá nửa đường thì đổi dần sang lát cắt đúng tầng của cuốn đó trong ảnh `l4_book_stack` và đáp đúng chỗ tầng đó
    // (cuốn đầu dưới cùng). Đủ 3 cuốn thì hiện ảnh chồng sách — cùng pixel nên không nhảy hình.
    const n = FALL_BOOKS.length, gap = this.shelfGap(), bs = this.bookStack, sprites = [];
    const T0 = 150, DT = 220, FLY = 520;
    for (let i = 0; i < n; i++) this.time.delayedCall(T0 + i * DT, () => {
      if (i === 0) this.applyKey(sh, 'l4_bookshelf_after'); // cuốn đầu bật ra là chỗ trống hiện luôn
      const x0 = gap.x + (FALL_BOOKS[i].slot + 0.5) * (gap.width / n), y0 = gap.centerY;
      const d = bs.depth + 0.1 + i * 0.01; // cùng lớp chồng sách: đáp xong không nhảy lớp
      const b = this.img(FALL_BOOKS[i].key, x0, y0, d).setOrigin(0.5, 0.5);
      const L = this.bookLayer(i, d + 0.005).setAlpha(0);
      sprites.push(b, L);
      const x1 = L.x, y1 = L.y;
      // Sách đứng xoay 0 → 90°, dài ra bằng bề rộng tầng; lát tầng xoay -90 → 0° (cùng trục). Đổi thẳng ảnh trong một khung
      // ở chỗ xoay 45° (G4-37, D4-36): lúc nào cũng đặc 100%, không có khung nửa trong suốt.
      const k0 = b.scaleX, k1 = L.displayWidth / this.textures.get(b.texture.key).get(this.iconFrame(b.texture.key)).cutHeight;
      this.tweens.addCounter({ from: 0, to: 1, duration: FLY, ease: 'Quad.in', onUpdate: (tw) => {
        const k = tw.getValue(), x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k - 70 * Math.sin(Math.PI * k);
        const flat = k >= 0.5;
        b.setPosition(x, y).setAngle(90 * k).setScale(k0 + (k1 - k0) * k).setVisible(!flat);
        L.setPosition(x, y).setAngle(90 * k - 90).setAlpha(flat ? 1 : 0);
      }, onComplete: () => {
        b.setVisible(false);
        L.setPosition(x1, y1).setAngle(0).setAlpha(1);
        this.sfx(i % 2 ? 'l4_sfx_books_land' : 'l4_sfx_books_domino');
      } });
    });
    this.time.delayedCall(T0 + (n - 1) * DT + FLY + 60, () => {
      sprites.forEach((o) => o.destroy());
      bs.setVisible(true);
      this.zoneTo('books', bs);
      this.zones.books.setInteractive();
      this.busy.shelf = false;
    });
  }

  // Lát cắt tầng i (từ dưới lên) của ảnh chồng sách, đặt đúng chỗ tầng đó trong chồng sách (toạ độ thế giới).
  bookLayer(i, depth) {
    const bs = this.bookStack, key = bs.texture.key, tex = this.textures.get(key), f = tex.get(this.iconFrame(key));
    const name = 'layer' + i, [a, b] = BOOK_LAYERS[i];
    const y0 = Math.round(f.cutY + a * f.cutHeight), y1 = Math.round(f.cutY + b * f.cutHeight);
    if (!tex.has(name)) tex.add(name, 0, f.cutX, y0, f.cutWidth, y1 - y0);
    const left = bs.x - bs.originX * bs.width * bs.scaleX, top = bs.y - bs.originY * bs.height * bs.scaleY;
    return this.add.image(left + (f.cutX + f.cutWidth / 2) * bs.scaleX, top + (y0 + y1) / 2 * bs.scaleY, key, name)
      .setScale(bs.scaleX, bs.scaleY).setDepth(depth);
  }

  // Chưa có vali trong túi (G4-34): kệ lung lay khẽ, bong bóng suy nghĩ nhỏ hình vali hiện trên kệ rồi tắt; sách không rơi.
  shelfLocked() {
    this.wiggle(this.shelf, 1, 2, 240);
    this.sfx('sfx_tap');
    if (this.busy.think) return;
    this.busy.think = true;
    if (!this.think) {
      this.think = this.img('ui_thought_bubble', 0, 0, D.player + 1).setVisible(false);
      this.thinkIcon = this.add.image(0, 0, 'l4_suitcase_folded', this.iconFrame('l4_suitcase_folded')).setDepth(D.player + 2).setVisible(false);
    }
    const t = this.think, ic = this.thinkIcon, r = this.artRect(this.shelf);
    this.fitWidth(t, 170);
    const base = t.base;
    t.setPosition(r.right - 70, r.top + 150).setVisible(true).setAlpha(1).setScale(0);
    ic.setVisible(false);
    this.sfx('sfx_meow_question', 0.6);
    this.tweens.add({ targets: t, scale: base, duration: 260, ease: 'Back.out', onComplete: () => {
      const tb = t.getBounds();
      ic.setPosition(tb.x + tb.width * 0.55, tb.y + tb.height * 0.36).setVisible(true).setAlpha(1);
      this.fitWidth(ic, tb.width * 0.5);
    } });
    this.time.delayedCall(1500, () => this.tweens.add({ targets: [t, ic], alpha: 0, duration: 220, onComplete: () => {
      t.setVisible(false); ic.setVisible(false); this.busy.think = false;
    } }));
  }

  // Vali: chạm lần 1 bung nắp, đồ bay ra rơi khắp phòng, vali tự gấp lại; chạm lần 2 vào túi.
  suitcaseTap() {
    const s = this.suitcase;
    if (s.key === 'l4_suitcase_folded') { this.pickUp('l4_suitcase_folded', s, 'suitcase'); return; }
    if (this.busy.suitcase) return;
    this.busy.suitcase = true;
    this.wiggle(s, 6, 3, 300);
    this.time.delayedCall(300, () => {
      this.sfx('l4_sfx_suitcase_burst');
      const b = s.getBounds();
      this.dustPuff(this.artRect(s));
      this.spills.forEach((sp, i) => {
        const [x1, y1] = [sp.x, sp.y], x0 = b.centerX, y0 = b.top + 40;
        sp.setVisible(true).setPosition(x0, y0);
        this.tweens.addCounter({ from: 0, to: 1, duration: 520 + i * 60, ease: 'Sine.inOut', onUpdate: (tw) => {
          const k = tw.getValue();
          sp.setPosition(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k - (220 + i * 30) * Math.sin(Math.PI * k)).setAngle(360 * k);
        }, onComplete: () => {
          sp.setAngle(0);
          this.sfx('sfx_drop', 0.6);
          this.zoneTo('spill' + i, sp);
          this.zones['spill' + i].setInteractive();
        } });
      });
      this.time.delayedCall(250, () => this.swap(s, 'l4_suitcase_folded', () => { this.zoneTo('suitcase', s); this.busy.suitcase = false; }));
    });
  }

  // G4-44: cụm khói bụi phụt ra quanh vali lúc nắp bung (trên vali, dưới đồ bay ra), nở rồi tan ~0,6 giây,
  // che chỗ đổi ảnh vali đầy → gấp. Chỉ vali dùng; đệm không bụi (G4-21).
  dustPuff(r) {
    const n = 7;
    for (let i = 0; i < n; i++) {
      const a = Math.PI * (1.05 + (0.9 * i) / (n - 1)) + Phaser.Math.FloatBetween(-0.15, 0.15); // toả nửa trên vali
      const x = r.centerX + Math.cos(a) * r.width * 0.42, y = r.centerY + 20 + Math.sin(a) * r.height * 0.5;
      const key = i % 2 ? 'fx_dust_puff_b' : 'fx_dust_puff'; // xen kẽ 2 dáng khói
      const p = this.add.image(r.centerX + (x - r.centerX) * 0.4, r.centerY + (y - r.centerY) * 0.4, key)
        .setOrigin(0.5, 0.5).setDepth(15).setAngle(Phaser.Math.Between(-30, 30));
      const aw = this.textures.get(key).get(this.iconFrame(key)).cutWidth; // bề rộng phần vẽ (ảnh thật có lề)
      const k = (Phaser.Math.FloatBetween(0.45, 0.65) * r.width) / aw;
      p.setScale(k * 0.4).setAlpha(0.95);
      this.tweens.add({ targets: p, x, y: y - 30, scale: k * 1.2, duration: 600, delay: i * 25, ease: 'Quad.out' });
      this.tweens.add({ targets: p, alpha: 0, duration: 380, delay: 220 + i * 25, ease: 'Sine.in', onComplete: () => p.destroy() });
    }
  }

  // Đồ rơi từ vali: nảy nhẹ. 🎁 Phao vịt: "chít", 5 cá khô (một lần).
  spillTap(i) {
    const s = this.spills[i];
    this.hop(s, 20, 260);
    if (i !== 0) { this.sfx('sfx_tap'); return; }
    this.sfx('l4_sfx_duck');
    if (this.duckDone) return;
    this.duckDone = true;
    this.secrets++;
    const b = s.getBounds();
    this.fishBurst(b.centerX, b.top, 5);
  }

  // Gốc xoay = tâm phần vẽ thật của ảnh (bỏ lề trong suốt lệch), giữ nguyên chỗ đang đứng của tâm đó.
  centerOnArt(s) {
    const f = this.textures.get(s.key).get(this.iconFrame(s.key));
    const cx = f.cutX + f.cutWidth / 2, cy = f.cutY + f.cutHeight / 2;
    const b = s.getBounds(), wx = b.x + cx * s.scaleX, wy = b.y + cy * s.scaleY;
    s.setOrigin(cx / s.width, cy / s.height).setPosition(wx, wy);
  }

  // 🎭 Bóng yoga: nảy "boing", lăn một vòng trên sàn rồi về đúng chỗ cũ. Xoay quanh tâm bóng, góc = quãng lăn ngang ÷ bán kính
  // (lăn sang trái thì quay ngược chiều kim đồng hồ). Không vào túi.
  ballTap() {
    const s = this.ball;
    if (this.busy.ball) return;
    this.busy.ball = true;
    this.sfx('l4_sfx_ball_boing');
    const [hx, hy] = this.ballHome, rx = 200, ry = 50, r = this.textures.get(s.key).get('trim').cutWidth * s.scaleX / 2;
    const cx = hx - rx, cy = hy; // vòng lăn bắt đầu từ chỗ đứng (mép phải elip), đi về phía trước rồi vòng lại
    this.tweens.add({ targets: s, y: hy - 70, duration: 200, yoyo: true, ease: 'Quad.out', onComplete: () => {
      let px = hx, rot = 0;
      this.tweens.addCounter({ from: 0, to: Math.PI * 2, duration: 1600, ease: 'Sine.inOut', onUpdate: (tw) => {
        const t = tw.getValue(), x = cx + rx * Math.cos(t), y = cy + ry * Math.sin(t);
        rot += (x - px) / r;
        px = x;
        s.setPosition(x, y).setRotation(rot);
      }, onComplete: () => { s.setPosition(hx, hy).setAngle(0); this.busy.ball = false; } });
    } });
  }

  // Bàn làm việc: chỉ rung nhẹ (G4-21), không có hạt bay ra.
  deskTap() {
    this.wiggle(this.desk, 1, 2, 240);
    this.sfx('l4_sfx_pen_drop');
  }

  fishBurst(x, y, n) {
    this.sfx('sfx_clink');
    const tx = this.camX + 1024 - 80, ty = 62 - this.Y0;
    for (let i = 0; i < n; i++) {
      const f = this.img('ui_dried_fish', x, y, D.fx).setOrigin(0.5, 0.5);
      this.fitWidth(f, 56);
      const dx = (i - (n - 1) / 2) * 34;
      this.tweens.chain({ targets: f, tweens: [
        { x: x + dx, y: y - 110 - (i % 2) * 30, angle: dx / 2, duration: 280, ease: 'Quad.out' },
        { x: tx, y: ty, scale: f.base * 0.6, duration: 520, delay: 120 + i * 70, ease: 'Quad.in' },
        { alpha: 0, duration: 120 },
      ], onComplete: () => { f.destroy(); this.sfx('sfx_pickup', 0.6); } });
    }
  }

  // ---------- xếp tháp (12): kéo đồ từ túi thả dưới rèm ----------
  // Vùng thả: khung tháp đã xếp (rộng ~300, cao ~400 trên đáy tháp) nới 100px mỗi phía.
  towerRect() {
    const [x, y] = this.P('l4_stack_mattress');
    return new Phaser.Geom.Rectangle(x - 150 - 100, y - 400 - 100, 300 + 200, 400 + 200);
  }

  // Chỗ đặt đáy món kế tiếp (toạ độ thế giới): đỉnh phần vẽ thật của tầng trên cùng + chồng mép (A4-28);
  // 4 tầng chung một khung ảnh nên phải lấy đỉnh phần vẽ, không lấy khung.
  towerTop() {
    const n = this.stack.length, top = this.stack[n - 1];
    if (!top) return this.P('l4_stack_mattress');
    return [top.x, this.artRect(top).top + (n < 4 ? OVERLAP[n - 1] : FEET_SINK)];
  }

  onBagDrop(it, x, y) {
    if (this.room !== LIVING || this.climax || !this.towerRect().contains(x, y)) return false;
    if (it.key === ORDER[this.stack.length]) { this.placeLayer(it); return true; }
    this.wrongLayer(it);
    return true;
  }


  // Đúng món kế tiếp: rơi vào đỉnh tháp, nảy nhẹ (drop_in), "cộp".
  placeLayer(it) {
    const [x, y] = this.towerTop(), key = STACK[it.key], i = this.stack.length;
    this.bagRemove(it, false);
    const s = this.img(key, x, y - 90, 30 + i);
    this.stack.push(s);
    this.tweens.add({ targets: s, y, duration: 220, ease: 'Quad.in', onComplete: () => {
      this.squash(s);
      this.sfx('sfx_drop');
      if (this.stack.length === ORDER.length) this.time.delayedCall(250, () => this.startClimax());
    } });
    this.handHide();
    this.touch();
  }

  // Sai thứ tự (G4-43): không chao ở tháp; món bay thẳng về ô của nó, về tới ô thì lắc một nhịp ngắn ("sfx_wrong");
  // Sữa trên rèm nghiêng đầu theo.
  wrongLayer(it) {
    it.s.setAngle(0);
    this.bagReturn(it);
    this.wiggle(this.hangCat, 8, 1, 400);
  }

  // Bàn tay / bàn chân làm mẫu kéo món kế tiếp từ túi lên tháp.
  guideDrag(it, times = 2, which = 'hand') {
    if (!it) return;
    const [x, y] = this.towerTop();
    this.handDrag(this.slotPos(it.i), [x, y - 30], 'hint', which, times);
  }

  // ---------- cao trào (kịch bản lộ diện) ----------
  startClimax() {
    this.climax = true;
    this.locked = true;
    this.handHide();
    this.handHide('paw');
    this.setSleep(false);
    if (this.meowEv) this.meowEv.remove();
    this.zones.curtain.disableInteractive();
    this.zones.suaHang.disableInteractive();
    this.applyKey(this.hangCat, 'sua_curtain_banana');
    // 1. Tháp lóe sáng, nhân vật hiện ngay trên mặt gối.
    for (const s of this.stack) this.sparkle(s);
    const p = this.climber, [, ty] = this.towerTop();
    this.applyKey(p, 'player_reach_up');
    p.setPosition(this.P('player_reach_up')[0], ty).setVisible(true).setAlpha(0); // chân lệch phải tâm tháp như demo
    this.tweens.add({ targets: p, alpha: 1, duration: 200 });
    // 2. Tay vươn sát Sữa: Sữa giật mình.
    this.time.delayedCall(900, () => {
      this.hop(p, 14, 260);
      this.detach(this.hangCat);
      this.hop(this.hangCat, 16, 240);
      this.sfx('sua_sfx_meow');
    });
    // 3. Lộn vòng 2–3 vòng theo cung, có vệt xoáy; 4. tiếp đất "tạch" thật nhẹ.
    this.time.delayedCall(1400, () => this.spinDown());
  }

  spinDown() {
    const h = this.hangCat, c = this.cat, b = h.getBounds();
    const x0 = b.centerX, y0 = b.centerY, [x1, y1] = this.P('sua_lick_paw');
    h.setVisible(false);
    this.applyKey(c, 'sua_curl_spin');
    c.setVisible(true).setPosition(x0, y0);
    const yEnd = y1 - c.displayHeight / 2;
    this.sfx('sfx_cloth');
    let last = 0;
    this.tweens.addCounter({ from: 0, to: 1, duration: 600, ease: 'Sine.in', onUpdate: (tw) => {
      const k = tw.getValue();
      c.setPosition(x0 + (x1 - x0) * k, y0 + (yEnd - y0) * k - 160 * Math.sin(Math.PI * k)).setAngle(1000 * k);
      if (k - last > 0.08) { last = k; this.swirl(c.x, c.y); }
    }, onComplete: () => this.land(x1, y1) });
  }

  swirl(x, y) {
    const g = this.add.circle(x, y, 26, 0xffffff, 0).setStrokeStyle(4, 0xffffff, 0.7).setDepth(44);
    this.tweens.add({ targets: g, scale: 1.8, alpha: 0, duration: 350, onComplete: () => g.destroy() });
  }

  land(x, y) {
    const c = this.cat;
    c.setAngle(0);
    this.applyKey(c, 'sua_land');
    c.setPosition(x, y);
    this.squash(c);
    this.sfx('l4_sfx_land_tap');
    this.time.delayedCall(300, () => {
      // 5. Sữa liếm chân thản nhiên; nhân vật cười ngốc nghếch; bong bóng nhiệm vụ tô màu mặt Sữa.
      this.applyKey(c, 'sua_lick_paw');
      this.swap(this.climber, 'player_silly_laugh');
      this.phase = 'found';
      this.locked = false;
      this.sua = c;
      this.bubbleFound();
      // G4-40: chỉ lắc lư nhẹ, chậm (bỏ nhịp rung nhanh).
      this.tweens.addCounter({ from: 0, to: Math.PI * 2, duration: 2600, repeat: -1, onUpdate: (tw) => (c.angle = 2 * Math.sin(tw.getValue())) });
      this.time.delayedCall(900, () => {
        if (this.phase !== 'found') return;
        this.glowOn();
        const b = c.getBounds();
        this.armSua(new Phaser.Geom.Rectangle(b.x - 20, b.y - 20, b.width + 40, b.height + 30));
      });
    });
  }

  glowOn() {
    if (this.renderer.type !== Phaser.WEBGL || !this.cat.preFX) return;
    this.glow = this.cat.preFX.addGlow(SUN, 0, 0, false, 0.1, 14);
    this.tweens.add({ targets: this.glow, outerStrength: 4, duration: 700, onComplete: () => {
      this.glowTw = this.tweens.add({ targets: this.glow, outerStrength: 1.5, duration: 1000, yoyo: true, repeat: -1 });
    } });
  }

  // Sữa được bế ra; tháp và nhân vật ở lại cảnh nền.
  endingHide() { this.cat.setVisible(false); }

  // ---------- gợi ý (thang gợi ý Level 4) ----------
  bagItem(key) { return this.bag && this.bag.items.find((o) => o && o.key === key); }

  // Bước cần làm theo món xếp kế tiếp. Có trong túi → kéo lên tháp (ở phòng khách) hoặc về phòng khách;
  // chưa có → sang phòng của nó và chạm đúng đồ (đệm dựng, kệ sách, vali…).
  hintStep() {
    if (this.phase === 'found') return { sprite: this.cat };
    const next = ORDER[this.stack.length];
    if (!next) return null;
    const it = this.bagItem(next);
    if (it) return this.room === LIVING ? { item: it } : { arrow: this.room > LIVING ? 'left' : 'right' };
    const home = HOME[next];
    if (this.room !== home) return { arrow: home < this.room ? 'left' : 'right' };
    const sprite = { l4_mattress_fallen: this.mattress, l4_pillow: this.pillow, l4_suitcase_folded: this.suitcase,
      l4_book_stack: this.shelf.key === 'l4_bookshelf_full' ? this.shelf : this.bookStack }[next];
    return { sprite };
  }

  arrowWorld(side) { return this.W(this.room, ARROW[side]); }

  hint1() {
    const h = this.hintStep();
    if (!h) return;
    if (h.arrow) {
      // Ở phòng khách: Sữa kêu "meo" dài, duỗi chân về phía phòng còn đồ.
      if (this.room === LIVING) { this.sfx('sua_sfx_meow_long'); this.wiggle(this.hangCat, 6, 2, 500); }
      const a = h.arrow === 'left' ? this.arrowL : this.arrowR;
      this.tweens.add({ targets: a, x: a.x + (h.arrow === 'right' ? 14 : -14), duration: 160, yoyo: true, repeat: 2 });
    } else if (h.item) this.hop(h.item.s, 16, 260);
    else if (h.sprite && !String(h.sprite.key).startsWith('l4_mattress')) this.wiggle(h.sprite, 3, 3, 300); // đệm: không rung (G4-31)
  }

  strongHint() {
    this.tweens.add({ targets: this.bulb, scale: this.bulb.base * 0.9, duration: 90, yoyo: true });
    const h = this.hintStep();
    if (!h) return;
    const paw = (pt) => { this.handTap(pt, 'hint', 'paw'); this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw')); };
    if (h.arrow) paw(this.arrowWorld(h.arrow));
    else if (h.item) this.guideDrag(h.item, 2, 'paw');
    else if (h.sprite) paw(this.tipOf(h.sprite));
  }

  update(time) {
    this.followKids();
    if (this.frozen || this.locked || this.moving || this.phase !== 'search' || this.drag || (this.bag && this.bag.busy)) return;
    const idle = (time - this.lastTouch) / 1000, H = this.hints;
    if (idle >= 8 && !H.h1) { H.h1 = true; this.hint1(); }
    if (idle >= 16 && time - H.sparkleAt > 2000) {
      H.sparkleAt = time;
      const h = this.hintStep();
      if (!h) return;
      if (h.arrow) { const [x, y] = this.arrowWorld(h.arrow); this.sparkle({ getBounds: () => new Phaser.Geom.Rectangle(x - 50, y - 70, 100, 140) }); }
      else if (h.item) this.hop(h.item.s, 22, 300); // đủ đồ: icon món cần xếp kế tiếp nảy lên
      else if (h.sprite) this.sparkle(h.sprite);
    }
  }
}
