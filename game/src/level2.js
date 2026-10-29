// Level 2 – Giỏ tất. Luồng theo levels/levels-01-10.md và levels/states-01-10.md (Level 2), chốt G2-1…G2-6
// (art/review/level2-thread.md). Phần chung ở base.js. Không có chữ trên màn hình.
// Chưa có ảnh thật thì dùng ảnh tạm vẽ bằng hình khối (makeFallback); có ảnh trong art/out/ thì tự dùng ảnh thật.
import { BaseLevel, D, MIN_HIT, SWIPE, SUN, BROWN } from './base.js';

// Vị trí dự phòng (điểm neo, khung 1024x1536) theo phác thảo bố cục Level 2; bảng vị trí trong design-art-level2.md ghi đè.
const DEF = {
  l2_coat_hook: [130, 290], l2_beanie_white_idle: [130, 300], l2_beanie_white_floor: [90, 1350],
  l2_ceiling_lamp: [512, 0], // neo đỉnh (trần)
  l2_curtain_closed: [330, 330],
  l2_shelf: [170, 840], l2_plush_cat: [170, 842], l2_plush_cat_fallen: [210, 1120],
  l2_wardrobe_closed: [840, 1060], l2_shoebox: [840, 442],
  l2_bed_blanket_flat: [300, 1262], l2_slipper: [260, 1240],
  l2_chair: [700, 1250], // áo len: tính theo mặt ghế (O2-7)
  l2_slippers_cat_idle: [200, 1440],
  l2_sock_basket_full: [600, 1450],
  player_call: [470, 1445],
};

// Thu/phóng cỡ hiển thị trong game so với cỡ trong design-art (nhân vào cỡ ảnh, nên ảnh vẽ lại cùng cỡ vẫn đúng).
// Đo theo tranh demo đã duyệt `l2_demo_start.png` (vòng 5): mỗi đồ hiển thị đúng bề rộng như trong tranh.
const SIZE_K = {
  l2_curtain_closed: 420 / 470, l2_curtain_open: 420 / 470,
  l2_wardrobe_closed: 1.14, l2_wardrobe_open: 1.14,
  l2_ceiling_lamp: 0.7,
  l2_coat_hook: 1.14, l2_beanie_white_idle: 0.65, l2_beanie_white_floor: 0.65,
  l2_shoebox_ears: 1.14, l2_shoebox_open: 1.14,
  l2_plush_cat: 0.75, l2_plush_cat_fallen: 0.75,
  l2_bed_blanket_flat: 1.11, l2_bed_blanket_flipped: 1.11,
  l2_chair: 0.95,
  l2_slippers_cat_idle: 1.19, l2_slippers_cat_after: 1.19,
  l2_sock_basket_full: 1.39, l2_sock_basket_2: 1.39, l2_sock_basket_3: 1.39, l2_sock_basket_reveal: 1.39,
  l2_sock_basket_one_eye: 1.39, l2_sock_basket_yawn: 1.39,
  // O2-19: tất nhỏ lại cho đúng cỡ thật so với giường.
  l2_sock_striped: 0.6, l2_sock_dotted: 0.6, l2_sock_white_big: 0.6, l2_sock_star: 0.6, l2_sock_baby: 0.6, l2_sock_long: 0.6,
};
// Nén chiều cao (rèm trong demo thấp và rộng: kết thúc trên gáy sách y≈570, không che sách trên kệ).
const SIZE_Y = { l2_curtain_closed: 0.83, l2_curtain_open: 0.83 };
// Góc nằm của từng chiếc tất sau khi đáp (tất em bé nằm ngang trên kệ).
// O2-19: tất đáp nằm ngang ở chỗ đỡ được: 1 mặt giường, 2 sàn cạnh chân giường, 3 thảm cạnh dép, 4 kệ trái, 5 mặt ghế, 6 kệ cạnh chậu cây.
const SOCK_ANGLE = [-80, 75, 80, -80, -80, -75];
const SOCK_ON = ['bed', null, null, null, 'chair', null]; // vật đỡ (vật con nhún theo); null = sàn/kệ trong nền
const SOCKS = ['l2_sock_striped', 'l2_sock_dotted', 'l2_sock_white_big', 'l2_sock_star', 'l2_sock_baby', 'l2_sock_long'];
const WHITE = 0xfffdf8, WOOD = 0xd6a472, PINK = 0xf8c6cc, SKY = 0xb8daf2, MINT = 0xb9ddbe, BUTTER = 0xfce39a;

// Ảnh tạm: [rộng, cao, neo ('đáy' | 'đỉnh' | 'tâm'), hàm vẽ (g, w, h)].
const FB = {
  l2_bg_bedroom: [1024, 1536, 'bg', (g) => {
    g.fillStyle(0xf6eedf).fillRect(0, 0, 1024, 1536);
    g.fillStyle(0xefe2f2).fillRect(0, 0, 1024, 40);
    g.fillStyle(0xe8c08f).fillRect(0, 1010, 1024, 526);
    g.lineStyle(3, 0xc99a66, 0.6);
    for (let y = 1060; y < 1536; y += 70) g.lineBetween(0, y, 1024, y);
    g.lineStyle(4, BROWN).fillStyle(SKY).fillRect(160, 340, 340, 400).strokeRect(160, 340, 340, 400);
    g.lineStyle(10, WOOD).lineBetween(330, 340, 330, 740).lineBetween(160, 540, 500, 540);
    g.fillStyle(WOOD).fillRect(140, 735, 380, 24);
    g.lineStyle(6, WOOD).lineBetween(140, 326, 520, 326);
  }],
  l2_curtain_closed: [360, 430, 'đỉnh', (g, w, h) => panels(g, w, h, 0.5)],
  l2_curtain_open: [360, 430, 'đỉnh', (g, w, h) => panels(g, w, h, 0.18)],
  l2_ceiling_lamp: [170, 330, 'đỉnh', (g, w, h) => {
    g.lineStyle(4, BROWN).lineBetween(w / 2, 0, w / 2, h - 90);
    g.fillStyle(BUTTER).lineStyle(4, BROWN);
    g.beginPath(); g.moveTo(40, h - 90); g.lineTo(w - 40, h - 90); g.lineTo(w - 6, h - 6); g.lineTo(6, h - 6); g.closePath(); g.fillPath(); g.strokePath();
  }],
  l2_coat_hook: [70, 40, 'tâm', (g, w, h) => { g.fillStyle(WOOD).lineStyle(3, BROWN).fillRoundedRect(4, 4, w - 8, h - 8, 8).strokeRoundedRect(4, 4, w - 8, h - 8, 8); }],
  l2_beanie_white_idle: [160, 150, 'đỉnh', (g, w, h) => beanie(g, w, h, false)],
  l2_beanie_white_floor: [170, 120, 'đáy', (g, w, h) => beanie(g, w, h, true)],
  l2_shelf: [280, 26, 'đỉnh', (g, w, h) => { g.fillStyle(WOOD).lineStyle(3, BROWN).fillRect(0, 0, w, h).strokeRect(0, 0, w, h); }],
  l2_plush_cat: [180, 160, 'đáy', (g, w, h) => whiteCat(g, w, h, false)],
  l2_plush_cat_fallen: [200, 120, 'đáy', (g, w, h) => whiteCat(g, w, h, true)],
  l2_wardrobe_closed: [320, 620, 'đáy', (g, w, h) => wardrobe(g, w, h, false)],
  l2_wardrobe_open: [320, 620, 'đáy', (g, w, h) => wardrobe(g, w, h, true)],
  l2_shoebox: [180, 90, 'đáy', (g, w, h) => { g.fillStyle(0xe7a98f).lineStyle(4, BROWN).fillRect(4, 14, w - 8, h - 18).strokeRect(4, 14, w - 8, h - 18); g.fillStyle(0xf1c0a8).fillRect(0, 4, w, 18).strokeRect(0, 4, w, 18); }],
  l2_bed_blanket_flat: [520, 300, 'đáy', (g, w, h) => bed(g, w, h, false)],
  l2_bed_blanket_flipped: [520, 300, 'đáy', (g, w, h) => bed(g, w, h, true)],
  // G2-9: túm lông trắng cong như đuôi mèo thò ra dưới gầm giường (gốc ở mép trên, khuất sau giường).
  l2_duster_peek: [150, 110, 'đỉnh', (g, w, h) => {
    g.fillStyle(WHITE).lineStyle(4, BROWN);
    g.fillEllipse(w * 0.4, h * 0.3, w * 0.36, h * 0.6).strokeEllipse(w * 0.4, h * 0.3, w * 0.36, h * 0.6);
    g.fillEllipse(w * 0.62, h * 0.72, w * 0.5, h * 0.4).strokeEllipse(w * 0.62, h * 0.72, w * 0.5, h * 0.4);
  }],
  // Cả cây chổi lông quét bụi nằm ngang trên sàn: cán gỗ, đầu lông trắng bông.
  l2_duster: [300, 90, 'đáy', (g, w, h) => {
    g.fillStyle(WOOD).lineStyle(4, BROWN).fillRect(8, h * 0.55, w * 0.5, 14).strokeRect(8, h * 0.55, w * 0.5, 14);
    g.fillStyle(WHITE).fillEllipse(w * 0.74, h * 0.55, w * 0.5, h * 0.85).strokeEllipse(w * 0.74, h * 0.55, w * 0.5, h * 0.85);
  }],
  l2_shoebox_ears: [180, 120, 'đáy', (g, w, h) => shoebox(g, w, h, 'ears')],
  l2_shoebox_open: [180, 140, 'đáy', (g, w, h) => shoebox(g, w, h, 'open')],
  l2_beanie_pink_cat: [150, 120, 'tâm', (g, w, h) => {
    g.fillStyle(PINK).lineStyle(4, BROWN);
    g.slice(w / 2, h * 0.75, w * 0.42, Math.PI, 0, false).fillPath().strokePath();
    g.fillTriangle(w * 0.14, h * 0.55, w * 0.22, h * 0.08, w * 0.4, h * 0.42).strokeTriangle(w * 0.14, h * 0.55, w * 0.22, h * 0.08, w * 0.4, h * 0.42);
    g.fillTriangle(w * 0.6, h * 0.42, w * 0.78, h * 0.08, w * 0.86, h * 0.55).strokeTriangle(w * 0.6, h * 0.42, w * 0.78, h * 0.08, w * 0.86, h * 0.55);
    g.fillRect(w * 0.08, h * 0.75, w * 0.84, h * 0.18).strokeRect(w * 0.08, h * 0.75, w * 0.84, h * 0.18);
  }],
  l2_curtain_tie: [44, 180, 'đỉnh', (g, w, h) => {
    g.lineStyle(14, BROWN).lineBetween(w / 2, 6, w / 2, h - 30);
    g.lineStyle(9, WHITE).lineBetween(w / 2, 6, w / 2, h - 30);
    blob(g, w / 2, h - 22, 18, 18);
  }],
  l2_slipper: [120, 55, 'đáy', (g, w, h) => { g.fillStyle(PINK).lineStyle(3, BROWN).fillEllipse(w / 2, h / 2 + 4, w - 6, h - 12).strokeEllipse(w / 2, h / 2 + 4, w - 6, h - 12); }],
  l2_chair: [190, 340, 'đáy', (g, w, h) => {
    g.fillStyle(WOOD).lineStyle(4, BROWN);
    g.fillRect(20, 0, 22, h).strokeRect(20, 0, 22, h); g.fillRect(w - 42, 0, 22, h).strokeRect(w - 42, 0, 22, h);
    g.fillRect(10, h * 0.45, w - 20, 26).strokeRect(10, h * 0.45, w - 20, 26);
    g.fillRect(20, 30, w - 40, 60).strokeRect(20, 30, w - 40, 60);
  }],
  l2_sweater_rolled: [170, 120, 'đáy', (g, w, h) => { blob(g, w / 2, h * 0.55, w * 0.46, h * 0.42); g.lineStyle(3, 0xd9cfc0).lineBetween(w * 0.25, h * 0.5, w * 0.75, h * 0.5); }],
  l2_sweater_unrolled: [220, 190, 'đáy', (g, w, h) => {
    blob(g, w / 2, h * 0.3, w * 0.42, h * 0.26);
    g.fillStyle(WHITE).lineStyle(4, BROWN);
    g.fillRoundedRect(10, h * 0.3, 40, h * 0.68, 16).strokeRoundedRect(10, h * 0.3, 40, h * 0.68, 16);
    g.fillRoundedRect(w - 50, h * 0.3, 40, h * 0.68, 16).strokeRoundedRect(w - 50, h * 0.3, 40, h * 0.68, 16);
  }],
  l2_slippers_cat_idle: [230, 100, 'đáy', (g, w, h) => slippers(g, w, h, false)],
  l2_slippers_cat_after: [240, 110, 'đáy', (g, w, h) => slippers(g, w, h, true)],
  l2_sock_striped: [150, 70, 'tâm', (g, w, h) => sock(g, w, h, WHITE, 'stripe')],
  l2_sock_dotted: [150, 70, 'tâm', (g, w, h) => sock(g, w, h, 0xfdeff2, 'dot')],
  l2_sock_white_big: [180, 85, 'tâm', (g, w, h) => sock(g, w, h, WHITE, null)],
  l2_sock_star: [150, 70, 'tâm', (g, w, h) => sock(g, w, h, BUTTER, 'star')],
  l2_sock_baby: [96, 50, 'tâm', (g, w, h) => sock(g, w, h, MINT, null)],
  l2_sock_long: [210, 70, 'tâm', (g, w, h) => sock(g, w, h, 0xd8ccf0, 'stripe')],
  l2_sock_basket_full: [320, 280, 'đáy', (g, w, h) => basket(g, w, h, 4, false)],
  l2_sock_basket_2: [320, 280, 'đáy', (g, w, h) => basket(g, w, h, 3, false)],
  l2_sock_basket_3: [320, 280, 'đáy', (g, w, h) => basket(g, w, h, 2, false)],
  l2_sock_basket_reveal: [320, 280, 'đáy', (g, w, h) => basket(g, w, h, 1, true)],
  l2_sock_basket_one_eye: [320, 280, 'đáy', (g, w, h) => basket(g, w, h, 1, 'eye')],
  l2_sock_basket_yawn: [320, 280, 'đáy', (g, w, h) => basket(g, w, h, 1, 'yawn')],
};

function blob(g, x, y, rx, ry) { g.fillStyle(WHITE).lineStyle(4, BROWN).fillEllipse(x, y, rx * 2, ry * 2).strokeEllipse(x, y, rx * 2, ry * 2); }
function panels(g, w, h, frac) {
  g.fillStyle(PINK).lineStyle(4, BROWN);
  const pw = w * frac;
  g.fillRect(0, 0, pw, h).strokeRect(0, 0, pw, h);
  g.fillRect(w - pw, 0, pw, h).strokeRect(w - pw, 0, pw, h);
  g.lineStyle(2, 0xd99aa4);
  for (let x = 20; x < pw; x += 34) { g.lineBetween(x, 10, x, h - 10); g.lineBetween(w - x, 10, w - x, h - 10); }
}
function beanie(g, w, h, floor) {
  const cy = floor ? h * 0.62 : h * 0.6;
  g.fillStyle(WHITE).lineStyle(4, BROWN);
  g.slice(w / 2, cy, w * 0.42, Math.PI, 0, false).fillPath().strokePath();
  g.fillRect(w * 0.08, cy, w * 0.84, h * 0.16).strokeRect(w * 0.08, cy, w * 0.84, h * 0.16);
  for (const px of [0.25, 0.75]) g.fillCircle(w * px, cy - w * 0.36, 16).strokeCircle(w * px, cy - w * 0.36, 16);
}
function whiteCat(g, w, h, fallen) {
  if (fallen) { blob(g, w / 2, h * 0.6, w * 0.45, h * 0.35); g.fillStyle(BROWN).fillCircle(w * 0.4, h * 0.5, 6).fillCircle(w * 0.6, h * 0.5, 6); return; }
  blob(g, w / 2, h * 0.62, w * 0.44, h * 0.36);
  g.fillStyle(WHITE).lineStyle(4, BROWN);
  g.fillTriangle(w * 0.2, h * 0.38, w * 0.3, h * 0.08, w * 0.42, h * 0.32).strokeTriangle(w * 0.2, h * 0.38, w * 0.3, h * 0.08, w * 0.42, h * 0.32);
  g.fillTriangle(w * 0.58, h * 0.32, w * 0.7, h * 0.08, w * 0.8, h * 0.38).strokeTriangle(w * 0.58, h * 0.32, w * 0.7, h * 0.08, w * 0.8, h * 0.38);
  g.fillStyle(BROWN).fillCircle(w * 0.4, h * 0.55, 7).fillCircle(w * 0.6, h * 0.55, 7);
}
function shoebox(g, w, h, mode) {
  const top = mode === 'open' ? h - 80 : h - 70;
  g.fillStyle(0xbfe3cf).lineStyle(4, BROWN).fillRect(6, top, w - 12, h - top - 4).strokeRect(6, top, w - 12, h - top - 4);
  if (mode === 'ears') {
    g.fillStyle(WHITE);
    g.fillTriangle(w * 0.3, top + 4, w * 0.36, top - 34, w * 0.46, top + 4).strokeTriangle(w * 0.3, top + 4, w * 0.36, top - 34, w * 0.46, top + 4);
    g.fillTriangle(w * 0.54, top + 4, w * 0.64, top - 34, w * 0.7, top + 4).strokeTriangle(w * 0.54, top + 4, w * 0.64, top - 34, w * 0.7, top + 4);
    g.fillStyle(0xfdf3e6).fillRect(0, top - 16, w, 18).strokeRect(0, top - 16, w, 18); // nắp hé
  } else {
    g.fillStyle(0xfdf3e6).fillRect(w - 30, 4, 22, top - 2).strokeRect(w - 30, 4, 22, top - 2); // nắp bật dựng
  }
}
function wardrobe(g, w, h, open) {
  g.fillStyle(WOOD).lineStyle(5, BROWN).fillRect(4, 4, w - 8, h - 8).strokeRect(4, 4, w - 8, h - 8);
  if (open) {
    // G2-7: quần áo gấp ngăn nắp từng ngăn (không treo).
    g.fillStyle(0x8a6a52).fillRect(18, 18, w - 36, h - 60);
    g.lineStyle(4, BROWN);
    for (let r = 0; r < 4; r++) {
      const y = 50 + r * 130;
      g.lineBetween(18, y + 70, w - 18, y + 70);
      [0xf8c6cc, SKY, BUTTER, MINT].forEach((c, i) => { if ((i + r) % 4 < 3) g.fillStyle(c).fillRoundedRect(28 + i * 70, y + 30, 60, 38, 8).strokeRoundedRect(28 + i * 70, y + 30, 60, 38, 8); });
    }
  } else {
    g.lineBetween(w / 2, 10, w / 2, h - 30);
    g.fillStyle(BROWN).fillCircle(w / 2 - 24, h * 0.5, 7).fillCircle(w / 2 + 24, h * 0.5, 7);
  }
}
function bed(g, w, h, flipped) {
  g.fillStyle(WOOD).lineStyle(5, BROWN);
  g.fillRect(0, 0, 40, h).strokeRect(0, 0, 40, h);
  g.fillRect(0, h * 0.55, w, h * 0.3).strokeRect(0, h * 0.55, w, h * 0.3);
  g.fillRect(10, h - 30, 24, 30).fillRect(w - 34, h - 30, 24, 30);
  if (flipped) {
    g.fillStyle(SKY).fillRect(w * 0.6, h * 0.32, w * 0.4, h * 0.3).strokeRect(w * 0.6, h * 0.32, w * 0.4, h * 0.3);
    blob(g, w * 0.35, h * 0.45, w * 0.17, h * 0.13);
  } else {
    g.fillStyle(SKY).lineStyle(5, BROWN);
    g.beginPath(); g.moveTo(40, h * 0.6); g.lineTo(40, h * 0.4); g.lineTo(w * 0.25, h * 0.4);
    g.arc(w * 0.38, h * 0.4, w * 0.13, Math.PI, 0, false); g.lineTo(w, h * 0.4); g.lineTo(w, h * 0.6); g.closePath(); g.fillPath(); g.strokePath();
    g.fillStyle(WHITE).fillEllipse(w * 0.38, h * 0.36, w * 0.18, h * 0.12);
  }
}
function slippers(g, w, h, after) {
  const one = (x, y, tilt) => {
    blob(g, x, y, 50, 26);
    g.fillStyle(WHITE).lineStyle(3, BROWN);
    const ex = tilt ? 14 : 0;
    g.fillTriangle(x - 30, y - 18, x - 22 - ex, y - 48 + ex, x - 10, y - 22).strokeTriangle(x - 30, y - 18, x - 22 - ex, y - 48 + ex, x - 10, y - 22);
    g.fillTriangle(x + 10, y - 22, x + 22 + ex, y - 48 + ex, x + 30, y - 18).strokeTriangle(x + 10, y - 22, x + 22 + ex, y - 48 + ex, x + 30, y - 18);
  };
  one(w * 0.28, h * 0.68, after);
  one(w * 0.72, h * (after ? 0.55 : 0.68), after);
}
function sock(g, w, h, color, pattern) {
  g.fillStyle(color).lineStyle(4, BROWN);
  g.fillRoundedRect(6, 6, w * 0.7, h * 0.45, 14).strokeRoundedRect(6, 6, w * 0.7, h * 0.45, 14);
  g.fillRoundedRect(w * 0.55, 6, w * 0.4, h - 12, 18).strokeRoundedRect(w * 0.55, 6, w * 0.4, h - 12, 18);
  if (pattern === 'stripe') { g.lineStyle(6, 0x9cc8e8); for (let x = 20; x < w * 0.7; x += 22) g.lineBetween(x, 10, x, h * 0.45); }
  if (pattern === 'star') { g.fillStyle(0xf2b84b); for (let x = 26; x < w * 0.68; x += 34) g.fillTriangle(x, h * 0.12, x - 8, h * 0.42, x + 8, h * 0.42); }
  if (pattern === 'dot') { g.fillStyle(0xf09aaa); for (let x = 22; x < w * 0.68; x += 26) g.fillCircle(x, h * 0.28, 6); }
}
function basket(g, w, h, socks, reveal) {
  const top = h * 0.42;
  if (reveal) curledCat(g, w, h * 0.7, reveal === true ? 'sleep' : reveal, w * 0.08, -6);
  for (let i = 0; i < socks; i++) blob(g, w * (0.25 + i * 0.17), top + 4 - (i % 2) * 14, 46, 30);
  g.fillStyle(0xd9a86c).lineStyle(5, BROWN);
  g.beginPath(); g.moveTo(10, top); g.lineTo(w - 10, top); g.lineTo(w - 36, h - 4); g.lineTo(36, h - 4); g.closePath(); g.fillPath(); g.strokePath();
  g.lineStyle(3, 0xb5824a);
  for (let y = top + 26; y < h - 10; y += 26) g.lineBetween(20, y, w - 20, y);
}
function curledCat(g, w, h, mode, ox = 0, oy = 0) {
  const cx = w / 2 + ox, cy = h * 0.6 + oy;
  blob(g, cx, cy, w * 0.4, h * 0.34);
  g.fillStyle(WHITE).lineStyle(4, BROWN);
  g.fillTriangle(cx - 60, cy - 40, cx - 50, cy - 80, cx - 30, cy - 46).strokeTriangle(cx - 60, cy - 40, cx - 50, cy - 80, cx - 30, cy - 46);
  g.fillTriangle(cx - 10, cy - 48, cx + 4, cy - 86, cx + 20, cy - 44).strokeTriangle(cx - 10, cy - 48, cx + 4, cy - 86, cx + 20, cy - 44);
  g.lineStyle(3, BROWN);
  if (mode === 'eye') { g.lineBetween(cx - 46, cy - 14, cx - 30, cy - 14); g.fillStyle(0x6ab0e0).fillCircle(cx - 2, cy - 14, 8); }
  else { g.lineBetween(cx - 46, cy - 14, cx - 30, cy - 14); g.lineBetween(cx - 10, cy - 14, cx + 6, cy - 14); }
  if (mode === 'yawn') g.fillStyle(0xf09aaa).fillEllipse(cx - 20, cy + 8, 22, 26);
  g.fillStyle(0xf7b9a3).fillCircle(cx - 20, cy - 2, 5);
}

// Lớp của tất sau khi đáp (theo SOCK_ON).
// Lớp tủ và ghế: cánh tủ mở nằm trên giường (và đồ trên giường) nhưng dưới ghế, áo len, tất trên ghế.
const WARDROBE_D = D.pillow + 2.5, CHAIR_D = WARDROBE_D + 1;
const SOCK_DEPTH = [D.cushion + 1, D.cushion + 2, D.pillow, D.curtain + 2, CHAIR_D + 2, D.curtain + 2];

export class Level2 extends BaseLevel {
  constructor() { super('Level2'); }

  get levelNo() { return 2; }
  get rewardFish() { return 15; }
  get defaultPos() { return DEF; }

  resetLevel() {
    Object.assign(this, { shoeOpened: false, snore: null, kids: [], socks: 0, lastBasket: 0, basketBreath: null, zzz: null, glowFx: null, shoeMoved: false, underTaps: 0, sockTargets: [] });
  }

  // Ảnh tạm vẽ bằng hình khối cho key chưa có ảnh thật.
  makeFallback(key) {
    const spec = FB[key];
    if (!spec) return;
    const [w, h, neo, draw] = spec;
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    draw(g, w, h);
    g.generateTexture(key, w, h);
    g.destroy();
    const ax = neo === 'bg' ? 0 : w / 2, ay = neo === 'bg' ? 0 : neo === 'đỉnh' ? 0 : neo === 'tâm' ? h / 2 : h;
    this.A.entries[key] = { url: null, real: false, ax, ay, res: 1 };
  }

  // ---------- dựng phòng ----------
  buildRoom() {
    this.buildBg('l2_bg_bedroom');
    const P = (k) => this.P(k);

    // Rèm + nắng chiếu đúng vào giỏ tất (gợi ý ngầm).
    this.fitSizes();
    this.curtain = this.img('l2_curtain_closed', ...P('l2_curtain_closed'), D.curtain);
    this.curtainOpen = false;
    const bb = P('l2_sock_basket_full');
    this.beam = this.add.graphics().setDepth(D.beam).setAlpha(0).setBlendMode(Phaser.BlendModes.SCREEN);
    const cw = this.curtain.getBounds();
    this.beam.fillStyle(SUN, 0.35).fillPoints([{ x: cw.left + 40, y: cw.bottom }, { x: cw.right - 40, y: cw.bottom }, { x: bb[0] + 170, y: bb[1] }, { x: bb[0] - 170, y: bb[1] }], true);

    this.lamp = this.img('l2_ceiling_lamp', ...P('l2_ceiling_lamp'), D.clock);
    // Dây đèn nối từ mép trên màn hình (trần kéo dài khi máy dài) xuống đầu dây của ảnh đèn.
    const cord = this.add.graphics().setDepth(D.clock - 1);
    cord.fillStyle(0x8a5a3a).fillRect(this.lamp.x - 6, -1200, 12, 1210);
    cord.fillStyle(0xd8955a).fillRect(this.lamp.x - 4, -1200, 8, 1210);
    const hk = P('l2_coat_hook');
    this.hook = this.img('l2_coat_hook', hk[0], hk[1], D.clock);
    const bn = P('l2_beanie_white_idle');
    this.beanie = this.img('l2_beanie_white_idle', bn[0], bn[1], D.clock + 1);
    // Kệ nằm trong ảnh nền thật; chỉ vẽ kệ tạm khi nền cũng là ảnh tạm.
    if (!(this.A.entries.l2_bg_bedroom || {}).real) { if (!this.textures.exists('l2_shelf')) this.makeFallback('l2_shelf'); this.img('l2_shelf', this.P('l2_plush_cat')[0], this.P('l2_plush_cat')[1], D.plant); }
    // Mèo bông ngồi trên kệ, trước gấu rèm (rèm kết thúc trên gáy sách).
    this.plush = this.img('l2_plush_cat', ...P('l2_plush_cat'), D.curtain + 1);
    this.wardrobe = this.img('l2_wardrobe_closed', ...P('l2_wardrobe_closed'), WARDROBE_D);
    // G2-7: hộp giày nắp hé, hai tai mèo thò lên (hoá ra mũ len hồng tai mèo).
    const wb0 = this.wardrobe.getBounds();
    this.shoebox = this.img('l2_shoebox_ears', ...(this.pos('l2_shoebox_ears') || [this.wardrobe.x - 1, this.wardrobe.y - 553 * this.wardrobe.scaleY / (1.14 / 1.5)]) /* Vòng 5e: mặt nóc 543–562px trên neo đáy tủ ở cỡ trong game (tủ ×1,14) */, WARDROBE_D + 0.2);
    this.attachTo(this.shoebox, this.wardrobe); // O2-18: hộp nằm trên nóc tủ nhún theo tủ
    this.pinkBeanie = this.img('l2_beanie_pink_cat', this.shoebox.x, this.shoebox.y - 40, WARDROBE_D + 0.1).setVisible(false);
    this.bed = this.img('l2_bed_blanket_flat', ...P('l2_bed_blanket_flat'), D.cushion);
    // G2-9: chổi lông thò ra dưới gầm giường như đuôi mèo (gốc khuất sau khung giường), ve vẩy nhẹ.
    const bdb0 = this.bed.getBounds();
    const pk = this.pos('l2_duster_peek') || [bdb0.left + bdb0.width * 0.35, bdb0.bottom - 45];
    this.dusterPeek = this.img('l2_duster_peek', ...pk, D.cushion - 1);
    this.duster = this.img('l2_duster', pk[0], pk[1] + 40, D.cushion - 1).setVisible(false);
    this.wagDuster();
    this.chair = this.img('l2_chair', ...P('l2_chair'), CHAIR_D);
    const chb = this.chair.getBounds();
    this.sweater = this.img('l2_sweater_rolled', ...(this.pos('l2_sweater_rolled') || [chb.left + chb.width * 0.48, chb.top + chb.height * 0.6]), CHAIR_D + 1); // O2-7: giữa mặt ghế
    this.attachTo(this.sweater, this.chair);
    this.slippersCat = this.img('l2_slippers_cat_idle', ...P('l2_slippers_cat_idle'), D.pillow);
    this.basket = this.img('l2_sock_basket_full', ...bb, CHAIR_D + 1.5); // giỏ nằm trên ghế và áo len (chủ dự án), dưới tất rơi trên ghế
    // G2-8: giỏ tĩnh hoàn toàn (bỏ phập phồng của G2-2).
    this.player = this.img('player_call', ...P('player_call'), D.player).setVisible(false);

    // Vùng chạm.
    this.zone('curtain', this.curtain.getBounds());
    // G2-7: dây buộc rèm bông trắng thò xuống như đuôi mèo.
    const cbb = this.curtain.getBounds();
    this.tie = this.img('l2_curtain_tie', ...(this.pos('l2_curtain_tie') || [cbb.left + 70, cbb.bottom - 100]), D.curtain - 1); // O2-6: sau rèm, thò ra dưới gấu rèm trái như demo
    this.zone('tie', this.tie.getBounds(), D.zone + 3);
    const lb = this.lamp.getBounds();
    this.zone('lamp', new Phaser.Geom.Rectangle(lb.x, lb.bottom - 140, lb.width, 140));
    this.zone('beanie', this.beanie.getBounds(), D.zone + 2);
    this.zone('plush', this.plush.getBounds(), D.zone + 2);
    const wb = this.wardrobe.getBounds();
    this.zone('wardrobe', new Phaser.Geom.Rectangle(wb.x, wb.y + 60, wb.width, wb.height - 60));
    this.zone('shoebox', this.shoebox.getBounds(), D.zone + 3);
    const bdb = this.bed.getBounds();
    this.zone('bed', new Phaser.Geom.Rectangle(bdb.x, bdb.y, bdb.width, bdb.height * 0.75), D.zone + 1);
    this.zone('underbed', Phaser.Geom.Rectangle.Union(new Phaser.Geom.Rectangle(bdb.x + 60, bdb.bottom - 70, bdb.width - 120, 70), this.dusterPeek.getBounds()), D.zone + 2);
    this.zone('sweater', this.sweater.getBounds(), D.zone + 3);
    this.zone('slippersCat', this.slippersCat.getBounds(), D.zone + 3);
    this.zone('basket', this.basket.getBounds(), D.zone + 5);
  }

  applyKey(s, key) {
    super.applyKey(s, key);
    const k = SIZE_Y[key];
    if (k && this.textures.exists(key)) { s.baseY = s.base * k; s.setScale(s.base, s.baseY); }
    return s;
  }

  fitSizes() {
    for (const [k, f] of Object.entries(SIZE_K)) {
      const e = this.A.entries[k];
      if (!e || e.fitK) continue;
      e.res = (e.res || 1) / f;
      e.fitK = true;
    }
  }

  // Chỗ 6 chiếc tất rơi đáp (O2-19): chỉ chỗ đỡ được (sàn, kệ, mặt giường, mặt ghế); bảng vị trí `sock_target_N` ghi đè.
  sockTarget(n) {
    if (this.pos('sock_target_' + n)) return this.pos('sock_target_' + n);
    const bd = this.bed.getBounds(), ch = this.chair.getBounds(), [px, py] = this.P('l2_plush_cat');
    return [
      [bd.left + bd.width * 0.52, bd.top + bd.height * 0.33], // mặt giường
      [bd.right - 70, bd.bottom + 50], // sàn cạnh chân giường
      [380, 1250], // thảm cạnh dép
      [px - 150, py - 15], // kệ trái
      [ch.left + ch.width * 0.8, ch.top + ch.height * 0.58], // mặt ghế, cạnh áo len
      [px + 140, py - 15], // kệ cạnh chậu cây
    ][n - 1];
  }

  breathe(on) {
    if (this.basketBreath) { this.basketBreath.stop(); this.basketBreath = null; }
    this.basket.setScale(this.basket.base, this.basket.baseY);
    if (on) this.basketBreath = this.tweens.add({ targets: this.basket, scaleY: this.basket.baseY * 1.025, duration: 1600, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
  }

  // G2-3 / VL2-2: Sữa chạy vụt từ trái sang phải dọc phía sau phòng (quay mặt sang phải), khuất sau ghế (ghế ngay trên giỏ),
  // không hiện ra nữa; giỏ khẽ nhún một cái. Không cho thấy Sữa vào giỏ (sẽ lộ đáp án).
  // O2-4: bỏ cảnh Sữa chạy lướt qua lúc mở màn; chỉ còn tiếng ngáy rất nhỏ.
  onIntro() {
    // VL2-4: tiếng ngáy rất nhỏ, lặp, to dần sau mỗi chiếc tất bay ra.
    this.snore = this.time.addEvent({ delay: 2600, startAt: 400, loop: true, callback: () => {
      if (this.phase === 'ending' || this.phase === 'reward' || this.frozen) return;
      this.sfx('sua_sfx_snore', 0.2 + 0.8 * Math.min(this.socks, 6) / 6); // 6 nấc theo số tất đã bay ra
    } });
  }

  handleLevel(name, g) {
    switch (name) {
      case 'curtain': this.toggleCurtain(); break;
      case 'lamp': this.swingLamp(); this.sfx('l1_sfx_box_shake'); break;
      case 'beanie': this.beanieTap(); break;
      case 'plush': this.plushTap(); break;
      case 'wardrobe': this.wardrobeTap(); break;
      case 'shoebox': this.shoeboxTap(); break;
      case 'tie': this.tieTap(); break;
      case 'bed': if (g.swipe) this.blanketSwipe(); else this.squash(this.bed); break;
      case 'underbed': this.underBedTap(); break;
      case 'sweater': this.sweaterTap(); break;
      case 'slippersCat': this.slippersTap(); break;
      case 'basket': this.basketTap(); break;
    }
  }

  // ---------- đồ vật ----------
  toggleCurtain() {
    if (this.busy.curtain) return;
    this.busy.curtain = true;
    this.sfx('sfx_cloth');
    this.curtainOpen = !this.curtainOpen;
    this.swap(this.curtain, this.curtainOpen ? 'l2_curtain_open' : 'l2_curtain_closed', () => (this.busy.curtain = false));
    this.tweens.add({ targets: this.beam, alpha: this.curtainOpen ? 1 : 0, duration: 500 });
  }

  swingLamp() {
    const l = this.lamp;
    this.tweens.killTweensOf(l);
    this.tweens.addCounter({ from: 0, to: 1.2, duration: 1200, onUpdate: (tw) => {
      const t = tw.getValue();
      l.angle = 10 * Math.exp(-t / 0.45) * Math.sin(2 * Math.PI * t * 1.4);
    }, onComplete: () => (l.angle = 0) });
  }

  // Bay theo đường cong (fly_arc).
  flyArc(s, tx, ty, dur = 600, lift = 160, spin = 360, done) {
    const x0 = s.x, y0 = s.y;
    this.tweens.addCounter({ from: 0, to: 1, duration: dur, onUpdate: (tw) => {
      const t = tw.getValue();
      s.x = x0 + (tx - x0) * t;
      s.y = y0 + (ty - y0) * t - lift * Math.sin(Math.PI * t);
      s.angle = spin * t;
    }, onComplete: () => { s.angle = 0; done && done(); } });
  }

  beanieTap() {
    if (this.busy.beanie || this.beanie.key === 'l2_beanie_white_floor') { if (this.beanie.key === 'l2_beanie_white_floor') this.wiggle(this.beanie, 2, 2, 200); return; }
    this.busy.beanie = true;
    this.sfx('sfx_cushion_soft');
    const [tx, ty] = this.P('l2_beanie_white_floor');
    this.applyKey(this.beanie, 'l2_beanie_white_floor');
    this.beanie.setDepth(D.pillow + 2).setY(this.beanie.y + this.beanie.displayHeight);
    this.flyArc(this.beanie, tx, ty, 600, 60, 200, () => { this.busy.beanie = false; this.zoneTo('beanie', this.beanie); });
    this.react(this.has('player_wear_beanie') ? 'player_wear_beanie' : 'player_surprised', 200, 1200);
  }

  plushTap() {
    if (this.busy.plush || this.plush.key === 'l2_plush_cat_fallen') { if (this.plush.key === 'l2_plush_cat_fallen') this.wiggle(this.plush, 2, 2, 200); return; }
    this.busy.plush = true;
    const pl = this.plush, [tx, ty] = this.P('l2_plush_cat_fallen');
    // Tâm ảnh nằm khi đã đáp đúng điểm neo trong bảng vị trí.
    const tmp = this.img('l2_plush_cat_fallen', tx, ty, 0).setVisible(false);
    const tc = tmp.getCenter();
    tmp.destroy();
    const c0 = pl.getCenter();
    pl.setOrigin(0.5, 0.5).setPosition(c0.x, c0.y).setDepth(D.pillow + 2);
    let swapped = false;
    this.flyArc(pl, tc.x, tc.y, 600, 60, 360, () => {
      this.applyKey(pl, 'l2_plush_cat_fallen');
      pl.setPosition(tx, ty);
      this.squash(pl);
      this.sfx('sfx_pickup');
      this.attachTo(pl, this.bed);
      this.busy.plush = false;
      this.zoneTo('plush', pl);
    });
    // Đổi sang ảnh nằm lúc đang bay (giữa đường), giữ đúng tâm nên không giật.
    this.time.delayedCall(300, () => {
      if (swapped) return;
      swapped = true;
      const { x, y, angle } = pl;
      this.applyKey(pl, 'l2_plush_cat_fallen');
      pl.setOrigin(0.5, 0.5).setPosition(x, y).setAngle(angle);
    });
  }


  wardrobeTap() {
    if (this.busy.wardrobe) return;
    this.busy.wardrobe = true;
    this.sfx('l1_sfx_box_flaps');
    const open = this.wardrobe.key !== 'l2_wardrobe_open';
    this.swap(this.wardrobe, open ? 'l2_wardrobe_open' : 'l2_wardrobe_closed', () => (this.busy.wardrobe = false));
  }

  // G2-7: hộp bật nắp, hoá ra mũ len hồng tai mèo; mũ nảy lên rồi rơi lại vào hộp.
  shoeboxTap() {
    if (this.busy.shoe) return;
    if (this.shoeOpened) { this.hop(this.shoebox, 10, 250); this.sfx('sfx_tap'); return; }
    this.shoeOpened = true;
    this.busy.shoe = true;
    this.sfx('l1_sfx_box_flaps');
    this.swap(this.shoebox, 'l2_shoebox_open');
    const m = this.pinkBeanie, y0 = this.shoebox.y - 30;
    m.setVisible(true).setPosition(this.shoebox.x, y0).setDepth(WARDROBE_D + 0.3);
    this.tweens.chain({ targets: m, tweens: [
      { y: y0 - 150, angle: 20, duration: 300, ease: 'Quad.out' },
      { y: y0 - 150, duration: 150 },
      { y: y0, angle: 0, duration: 300, ease: 'Quad.in' },
    ], onComplete: () => { m.setDepth(WARDROBE_D + 0.1).setVisible(false); this.squash(this.shoebox); this.busy.shoe = false; } });
    this.sfx('sfx_pickup');
  }

  // G2-7: dây buộc rèm như đuôi mèo: đung đưa, rèm khẽ lay.
  tieTap() {
    const s = this.tie;
    this.tweens.killTweensOf(s);
    this.sfx('sfx_cloth');
    this.tweens.addCounter({ from: 0, to: 1.2, duration: 1200, onUpdate: (tw) => {
      const tt = tw.getValue();
      s.angle = 22 * Math.exp(-tt / 0.4) * Math.sin(2 * Math.PI * tt * 1.6);
    }, onComplete: () => (s.angle = 0) });
    this.wiggle(this.curtain, 1.2, 2, 300);
  }

  blanketSwipe() {
    if (this.bed.key === 'l2_bed_blanket_flipped' || this.busy.bed) return;
    this.busy.bed = true;
    this.sfx('sfx_cloth');
    this.swap(this.bed, 'l2_bed_blanket_flipped', () => (this.busy.bed = false));
    this.react('player_shrug', this.bed.x); // G2-7: lật ra không có gì
  }

  // G2-9: túm lông ve vẩy như đuôi mèo: xoay ±8° quanh gốc, nhịp chậm; thỉnh thoảng giật nhẹ.
  wagDuster() {
    const s = this.dusterPeek;
    s.angle = -8;
    this.tweens.add({ targets: s, angle: 8, duration: 1300, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    this.dusterTwitch = this.time.addEvent({ delay: 3600, loop: true, callback: () => {
      if (!s.visible || Math.random() < 0.35) return;
      const k = this.tweens.add({ targets: s, scaleY: s.baseY * 1.08, duration: 90, yoyo: true, repeat: 1 });
      return k;
    } });
  }

  // G2-9: chạm gầm giường: phần lông thò ra biến mất, cây chổi lông trượt ra nằm trên sàn cạnh giường; nhân vật gãi đầu.
  underBedTap() {
    this.underTaps++;
    if (this.underTaps === 1) {
      this.sfx('sfx_cloth');
      const r = this.duster, [tx, ty] = this.P('l2_duster');
      this.tweens.killTweensOf(this.dusterPeek);
      if (this.dusterTwitch) this.dusterTwitch.remove();
      this.dusterPeek.setVisible(false);
      r.setVisible(true);
      this.tweens.add({ targets: r, x: tx, y: ty, duration: 380, ease: 'Quad.out', onComplete: () => {
        r.setDepth(D.cushion + 1);
        this.dust(r.x, r.y);
        this.zoneTo('underbed', r);
        this.react('player_scratch_head', r.x);
      } });
    } else { this.wiggle(this.bed, 1.5, 2, 200); this.sfx('sfx_tap'); }
  }

  sweaterTap() {
    if (this.sweater.key === 'l2_sweater_unrolled' || this.busy.sweater) { this.wiggle(this.sweater, 2, 2, 200); return; }
    this.busy.sweater = true;
    this.sfx('sfx_cloth');
    // Áo bung vắt về phía phải mặt ghế, thõng xuống bên phải giỏ (không chạm giỏ).
    this.squash(this.sweater, () => this.sweater.setPosition(this.sweater.x + 35, this.sweater.y - 20) && this.swap(this.sweater, 'l2_sweater_unrolled', () => { this.busy.sweater = false; this.zoneTo('sweater', this.sweater); }));
  }

  slippersTap() {
    if (this.slippersCat.key === 'l2_slippers_cat_after' || this.busy.slip) { this.wiggle(this.slippersCat, 2, 2, 200); return; }
    this.busy.slip = true;
    this.sfx('sfx_pickup');
    this.time.delayedCall(180, () => this.sfx('sfx_pickup'));
    this.squash(this.slippersCat, () => this.squash(this.slippersCat, () => this.swap(this.slippersCat, 'l2_slippers_cat_after', () => (this.busy.slip = false))));
  }

  zoneTo(name, s) {
    const z = this.zones[name], b = s.getBounds();
    z.setPosition(b.centerX, b.centerY).setSize(Math.max(MIN_HIT, b.width), Math.max(MIN_HIT, b.height));
    z.input.hitArea.setSize(z.width, z.height);
  }

  // ---------- giỏ tất: chạm 3 lần, mỗi lần một chiếc tất bay ra; lần 3 lộ Sữa ----------
  // G2-8: chạm giỏ 6 lần, mỗi lần một chiếc tất bay tới một chỗ và nằm yên; ảnh giỏ đổi ở lần 2, 4, 6.
  basketTap() {
    if (this.phase !== 'search') { this.hop(this.basket, 8, 200); return; } // sau lần 6: giỏ chỉ nảy nhẹ
    if (this.time.now - this.lastBasket < 400) return; // mỗi lần cách nhau ≥ 0,4 giây
    this.lastBasket = this.time.now;
    this.socks++;
    const n = this.socks;
    const sockKey = SOCKS[n - 1];
    const b = this.basket.getBounds();
    const sock = this.img(sockKey, b.centerX, b.top + 40, D.fx);
    const [tx, ty] = this.sockTarget(n);
    this.sfx('sfx_cloth');
    const basketKey = { 2: 'l2_sock_basket_2', 4: 'l2_sock_basket_3', 6: 'l2_sock_basket_reveal' }[n];
    if (basketKey) this.swap(this.basket, basketKey); else this.hop(this.basket, 8, 200);
    this.flyArc(sock, tx, ty, 650, 260, (n % 2 ? 360 : -360) + SOCK_ANGLE[n - 1], () => {
      sock.setDepth(SOCK_DEPTH[n - 1]).setAngle(SOCK_ANGLE[n - 1]);
      this.sfx('sfx_cushion_soft', 0.6);
      // Nảy nhẹ khi đáp rồi nằm yên; sau đó là vật con của vật đỡ (giường, ghế).
      this.tweens.chain({ targets: sock, tweens: [
        { y: ty - 16, duration: 110, ease: 'Quad.out' },
        { y: ty, duration: 160, ease: 'Bounce.out' },
      ], onComplete: () => this.attachTo(sock, SOCK_ON[n - 1] && this[SOCK_ON[n - 1]]) });
    });
    if (n === 6) this.reveal();
  }

  // G2-4: giỏ lộ Sữa cuộn tròn ngủ; giật tai, hé một mắt, ngáp, rúc ngủ tiếp.
  reveal() {
    this.phase = 'found';
    const b = this.basket;
    const bb = b.getBounds();
    // Sữa "ảo" (không vẽ) để cảnh bế chung lấy chỗ và cỡ.
    this.sua = this.add.image(bb.centerX, bb.top + bb.height * 0.55, 'sua_face_icon').setVisible(false);
    this.fitWidth(this.sua, 200);
    this.time.delayedCall(300, () => {
      if (this.renderer.type === Phaser.WEBGL && b.preFX) {
        this.glowFx = b.preFX.addGlow(SUN, 0, 0, false, 0.1, 14);
        this.tweens.add({ targets: this.glowFx, outerStrength: 4, duration: 700, onComplete: () => {
          this.glowTw = this.tweens.add({ targets: this.glowFx, outerStrength: 1.5, duration: 1000, yoyo: true, repeat: -1 });
        } });
      }
    });
    this.time.delayedCall(1000, () => { if (this.phase === 'found') this.bubbleFound(); });
    // Sữa vẽ liền trong giỏ (A2-4): hé mắt, ngáp bằng cách đổi ảnh giỏ cùng khung với _reveal.
    const pose = (key, at, dur, sfx) => this.time.delayedCall(at, () => {
      if (this.phase !== 'found') return;
      this.applyKey(b, key);
      if (sfx) this.sfx(sfx);
      this.time.delayedCall(dur, () => { if (this.phase === 'found') this.applyKey(b, 'l2_sock_basket_reveal'); });
    });
    // Vùng chạm Sữa bật khi lộ diện xong (~1,5 giây), ôm sát thân Sữa trong miệng giỏ (không phủ cả giỏ).
    this.time.delayedCall(1500, () => this.armSua(new Phaser.Geom.Rectangle(bb.x + bb.width * 0.15, bb.y, bb.width * 0.8, bb.height * 0.5)));
    pose('l2_sock_basket_one_eye', 1500, 800);
    pose('l2_sock_basket_yawn', 2300, 800, 'sua_sfx_meow');
    this.time.delayedCall(3100, () => { if (this.phase === 'found') this.startZzz(); });
  }

  startZzz() {
    const b = this.basket.getBounds();
    this.zzz = this.time.addEvent({ delay: 700, loop: true, callback: () => {
      const c = this.add.circle(b.centerX + 40, b.top + 10, 8, 0xffffff, 0.9).setStrokeStyle(2, BROWN).setDepth(D.fx);
      this.tweens.add({ targets: c, y: c.y - 90, x: c.x + 30, scale: 1.8, alpha: 0, duration: 2000, onComplete: () => c.destroy() });
    } });
  }

  beforeEnding() {
    if (this.zzz) this.zzz.remove();
    if (this.snore) this.snore.remove();
    if (this.glowTw) this.glowTw.stop();
    if (this.glowFx) { this.basket.preFX.remove(this.glowFx); this.glowFx = null; }
    this.glow = null;
  }

  // Sữa được bế ra khỏi giỏ; giỏ còn tất ở lại cảnh nền.
  endingHide() { this.applyKey(this.basket, 'l2_sock_basket_3'); }

  suaPoint() { const b = this.basket.getBounds(); return [b.centerX - 60, b.top + 30]; }

  strongHint() {
    this.tweens.add({ targets: this.bulb, scale: this.bulb.base * 0.9, duration: 90, yoyo: true });
    const pt = this.phase === 'found' ? this.suaPoint() : this.tipOf(this.basket);
    this.handTap(pt, 'hint', 'paw');
    this.pawTimer = this.time.delayedCall(2500, () => this.handHide('paw'));
  }

  // G2-2: không có gợi ý tự động theo giờ.
  update() { this.followKids(); }
}
