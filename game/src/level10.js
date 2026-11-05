// Level 10 – Đại chiến quái thú (chủ dự án chốt 2026-11-02, bản 5 / G10-5). Bản chơi thử bằng khối (QUY-TRINH bước 2): mọi đồ là khối có nhãn.
// Luồng theo levels/levels-01-10.md mục Level 10 (bố cục G10-4 theo phác thảo art/review/l10_layout_g10-4.png).
// Một cảnh: phòng khách nhìn sát sàn, đồ đạc đóng vai thành phố. Mun (bộ khỉ đột, trái) và Sữa (bộ thằn lằn gai lưng, phải)
// đứng yên trước sofa, đánh nhau theo vòng 4 nhịp; bàn trà (đấu trường) trước chân hai con. Hai nhánh độc lập:
//   máy bay (trên sàn phải) + pin (điều khiển TV) → ghép trong túi → máy bay tự bay ~6 giây: vòng qua đầu hai mèo
//   (Mun vồ trượt, Sữa khè trượt, vòng đánh nhau tạm dừng) → móc cây kéo trên kệ trái → hạ cánh lại chỗ cũ trên sàn phải → chạm kéo;
//   bóng (trên sàn trái) → thả lên Mun → Mun đấm sang Sữa → Sữa khè bóng ngược về → Mun đấm → bóng trúng hộp súp trên kệ phải
//   → hộp rơi giữa bàn trà (G10-14).
// Thả kéo lên hộp súp trên bàn → cắt ruy băng, hộp mở, khói cá → hai con cùng ăn, thu nhỏ 5 nấc tự chạy (khối mặc đồ mờ dần,
// mèo thật hiện dần, cùng neo chân) → hai mèo liếm lông cho nhau 1,5 giây → tự vào màn thưởng (G10-16, G10-17: không chạm, không cảnh bế).
// Đồ phụ thành phố (chồng sách, hộp bánh, chậu cây, dây sạc, bát nước + vịt, ô tô) phản ứng khi chạm và theo nhịp đánh nhau.
// Tên key theo ảnh sau này: đồ l10_*, dáng mèo mặc đồ mun_gorilla_* / sua_lizard_*; mèo thật cảnh kết mun_l10_eat, sua_l10_eat, mun_l10_groom, sua_l10_groom.
import { D } from './base.js';
import { ObjectLevel } from './objects.js';
import { PAL, rr, el, label, block } from './blocks.js';

// ---------- bố cục (toạ độ vùng chơi 1024x1536, neo giữa đáy trừ khi ghi khác) ----------
// Tường tới y ≈ 880, sàn bên dưới. Túi đồ chiếm từ y ≈ 1360 (khung 9:16), mọi đồ chạm được ở trên đó.
// G10-4: hàng trên hai kệ treo tường (trái: cây kéo; phải: hộp súp buộc ruy băng); sofa to phía sau hai mèo (lưng sofa lộ trên đầu);
// bàn trà trước chân hai mèo, điều khiển trên mép bàn phía Sữa; hàng dưới: bóng (sàn trái), thảm, máy bay (sàn phải).
// G10-6: ba kệ cùng độ cao (kệ giữa có chồng sách); trên sofa chỉ có gối; chậu cây mép phải sau vai Sữa; bàn trà: hộp bánh mép trái,
// lọ hoa + điều khiển mép phải, giữa bàn trống cho hộp súp rơi; thảm (quảng trường): đường ray + tàu hỏa, 2 tòa khối xếp hình, cột đèn,
// ô tô / xe tăng / xe cứu hỏa (kéo thẳng trong cảnh thả lên mèo). Xếp lớp: sofa < mèo < bàn trà.
const DEF = {
  player_call: [512, 1500],
  // G10-7: kệ trái thấp hơn kệ phải 1 bậc, kệ giữa thấp 2 bậc; chồng sách (đáy y 360) không chạm lưng sofa (y 460).
  // Ghép ảnh thật: kệ có giá đỡ dưới tấm ván (mặt ván cao hơn neo đáy ~44 / ~35): neo kệ hạ xuống, đồ trên kệ giữ chỗ.
  l10_shelf_left: [170, 324], l10_scissors: [170, 280],
  l10_shelf_mid: [470, 395], l10_book_stack: [470, 360],
  l10_shelf_right: [770, 244], l10_soup_box: [770, 200],
  // G10-9: gối to như gối L1 (245x200), nằm trên sofa giữa hai mèo, không lòi ra ngoài mép sofa.
  // G10-10: hai gối ở hai góc trên sofa (trong mép sofa), phần trên lộ ngoài đầu mèo: gối trái 🎁, gối phải ✨ (PILLOW_R).
  l10_sofa: [490, 860], l10_pillow: [165, 610], l10_plant: [975, 880],
  // G10-8, G10-9: hộp bánh, lọ hoa thấp xuống 60; điều khiển nằm phẳng trên mặt bàn, cùng đường mặt bàn.
  l10_table_arena: [490, 1060], l10_vase: [490, 900], l10_remote: [660, 920], // G10-21: bỏ hộp bánh
  // G10-8: mọi thứ dưới bàn trà dịch lên 50. G10-9: thảm + đường ray to 1,3 lần; đồ chơi ngoài đường tàu chạy
  // (ô tô, xe cứu hỏa trong lòng vòng ray; xe tăng sau mép ray); bỏ hai hộp đồ chơi: bóng, máy bay nằm thẳng trên sàn.
  // G10-10: thảm cao hơn (598x275, mép trên ngay dưới bàn, mép dưới trên dải túi); ray ở nửa sau thảm (TRACK).
  // Ô tô trong lòng vòng ray; xe tăng, xe cứu hỏa ở dải trước ray; khối xếp hình hai bên mép thảm; cột đèn mép trái thảm, lớp trên bàn.
  // Đo số: hình bao tàu (70x36, lề 4) không chồng hình bao đồ chơi, khối xếp hình, cột đèn ở mọi điểm trên vòng chạy.
  l10_rug_loop: [500, 1212], l10_blocks_a: [160, 1170], l10_blocks_b: [800, 1175],
  // G10-21: bỏ ô tô, xe tăng, tàu, cột đèn; xe cứu hỏa (🔑, nhặt vào túi) nằm sàn trái cạnh thảm, trên quả bóng.
  l10_toy_firetruck: [100, 1216],
};
const TRACK = { cx: 500, cy: 1167, rx: 230, ry: 74, lap: 6000 }; // đường ray elip trên thảm, tàu chạy 6 giây một vòng
const MUN_AT = [220, 1010], SUA_AT = [740, 1020];     // chân hai mèo (đứng yên suốt màn)
// Ảnh thật (Art 2D 1 đo trên lưới theo anchors.json): tay Mun đỡ chụm trước miệng = đích lửa; nắm tay đấm = chỗ bóng chạm.
const MUN_HANDS = [335, 755], MUN_FIST = [410, 770];
const SUA_MOUTH = [675, 765], SUA_MOUTH_UP = [660, 735]; // miệng Sữa khè ngang / ngửa cổ khè máy bay
const BEATS = [1200, 800, 800, 1200];                  // vòng đánh nhau 4 nhịp (ms)
const MUN_PAD = 60, SUA_PAD = 40;                      // vùng nhận bóng phủ cả thân mèo (nới thêm), không chồng nhau; Mun rộng hơn (bước đúng, G10-14)
const PLANE_HOME = [900, 1300];                         // máy bay đậu trên sàn phải, ngoài thảm (G10-13)
const BACK_DY = -34;                                   // kéo xách về nằm trên lưng máy bay: đáy kéo cách tâm máy bay (G10-13)
const PILLOW_R = [815, 610];                          // gối phải (G10-10)
const BALL_HOME = [95, 1300];                          // quả bóng nằm trên sàn trái, ngoài thảm (G10-13)
const HOOK_DY = 119;                                   // kéo treo dưới càng máy bay (đáy kéo cách tâm máy bay; máy bay x1,4, G10-12)
const rugDepth = (y) => 6.2 + y / 10000;               // lớp đồ trên thảm theo chiều sâu (tàu, đồ chơi, khối xếp hình; G10-12)
// G10-13: đường bay là hai đường cong Catmull-Rom liền (Phaser.Curves.Spline) qua các điểm mốc, đi theo độ dài cung, ease vào/ra:
// FLY_A chỗ đậu → lăn bánh ngắn → cất cánh → qua Sữa → qua Mun → chậm dần tới kệ trái (tâm máy bay đúng chỗ móc kéo);
// dừng một nhịp móc kéo; FLY_B tăng tốc dần → vòng qua phải → hạ cánh, lăn bánh về chỗ đậu. Mốc 'sua' / 'mun': lúc đi qua thì Sữa khè / Mun vồ.
const HOOK_AT = [170, 280 - HOOK_DY];                   // tâm máy bay lúc móc: đáy kéo trên kệ trái (y 280)
const FLY_A = [[...PLANE_HOME], [845, 1300], [790, 1240], [760, 1050], [745, 760], [700, 470, 'sua'], [480, 420], [250, 440, 'mun'],
  [300, 260], [HOOK_AT[0], HOOK_AT[1]]];
const FLY_B = [[HOOK_AT[0], HOOK_AT[1]], [300, 120], [560, 130], [720, 380], [880, 780], [990, 1140], [960, 1292], [930, 1300], [...PLANE_HOME]];
const FLY_MS = 6300, HOOK_HOLD = 350;                  // tổng thời gian bay (chia theo độ dài hai đoạn) + nhịp dừng móc kéo
const SWING_L = HOOK_DY - 49;                           // dây treo: từ bụng máy bay tới đáy kéo
// G10-21: 3 đám cháy (gốc lửa): góc trái thảm, góc phải thảm, trên điều khiển TV. Xe cứu hỏa ghép xong chạy lần lượt xịt tắt:
// [chỗ đỗ, hướng mặt (1 phải), điểm vòi] cho từng đám, rồi đỗ góc phải thảm.
const FIRE_AT = [[255, 1305], [745, 1305], [660, 885]];
const TRUCK_RUN = [{ at: [140, 1305], fire: 0 }, { at: [630, 1305], fire: 1 }, { at: [600, 1110], fire: 2, up: true }];
const TRUCK_PARK = [680, 1300];                         // đỗ góc phải thảm, lệch trái: không chạm máy bay đậu (795–1005)
const BOX_TABLE = [490, 945];                          // hộp súp rơi giữa bàn trà, ngay trước lọ hoa (G10-7)
const BOX_FLOOR = [482, 1020];                         // mở hộp: hộp bay nhẹ lên rồi hạ xuống sàn giữa hai mèo (G10-14)
const EAT_MS = 10000;                                  // cùng ăn: thu nhỏ đều liền một mạch 10 giây (G10-15)
// Mèo thật: dáng ăn mun_l10_eat / sua_l10_eat giữ cỡ ảnh (cùng tỉ lệ cặp liếm lông); dáng liếm lông rộng 190.
const REAL_W = { mun_l10_groom: 190, sua_l10_groom: 190 };
const EAT_SLIDE = { mun: 95, sua: -87 };  // cuối tween: đầu mỗi con lấn mép hộp mở (412–552) đúng 10px, hai bên bằng nhau
const GROOM_AT = { mun: [384, 1050], sua: [564, 1060] }; // liếm lông: hai con trượt vào giữa, trước hộp, chạm nhau (mép 487 / 477)               // trong lúc nhỏ dần, neo chân trượt về phía hộp súp trên sàn (Mun sang phải, Sữa sang trái)

// ---------- khối tạm ----------
const suit = (fill, who, pose, extra) => block(who === 'mun' ? 300 : 290, who === 'mun' ? 470 : 450, fill,
  `${who === 'mun' ? 'MUN\nKHỈ ĐỘT' : 'SỮA\nTHẰN LẰN'}\n\n${pose}`, { r: 40, size: 24, ly: 0.42, color: who === 'mun' ? PAL.white : PAL.brown,
    draw: (c, w, h) => {
      el(c, w / 2, h * 0.17, w * 0.24, h * 0.11, who === 'mun' ? '#3a3030' : '#fdf6e8');           // mặt mèo lộ trong mũ trùm
      if (who === 'sua') for (let i = 0; i < 5; i++) { c.fillStyle = '#8cc48a'; c.beginPath(); c.moveTo(w - 30, 70 + i * 60); c.lineTo(w - 4, 95 + i * 60); c.lineTo(w - 30, 120 + i * 60); c.fill(); }
      if (extra) extra(c, w, h);
    } });
const MUN_FILL = '#7a5a48', SUA_FILL = '#bfe3c4';
const arms = (pose) => (c, w, h) => {
  c.strokeStyle = '#4a3428'; c.lineWidth = 26; c.lineCap = 'round';
  if (pose === 'block') { c.beginPath(); c.moveTo(60, 300); c.lineTo(w - 50, 130); c.moveTo(w - 60, 300); c.lineTo(50, 130); c.stroke(); }
  if (pose === 'punch') { c.beginPath(); c.moveTo(w - 80, 260); c.lineTo(w + 0, 230); c.stroke(); }
  if (pose === 'reach') { c.beginPath(); c.moveTo(w - 70, 240); c.lineTo(w - 10, 20); c.stroke(); }
};
const FB = {
  l10_bg_living_kitchen: [1024, 1536, 'bg', (c, w, h) => {
    c.fillStyle = '#f3e3cf'; c.fillRect(0, 0, w, 880);                                            // tường phòng khách
    c.fillStyle = '#d9c3a5'; c.fillRect(0, 880, w, h - 880);                                       // sàn gỗ
    c.strokeStyle = 'rgba(107,74,58,0.25)'; c.lineWidth = 3;
    for (let y = 920; y < h; y += 70) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
  }],
  l10_shelf_left: block(240, 30, PAL.woodDark, 'KỆ TRÁI', { r: 6, size: 14, color: PAL.white }),
  l10_shelf_right: block(240, 30, PAL.woodDark, 'KỆ PHẢI (cao)', { r: 6, size: 14, color: PAL.white }),
  l10_scissors: block(110, 60, '#9fb4c8', 'KÉO', { r: 14, size: 16 }),
  l10_soup_box: block(130, 90, '#f0a078', 'HỘP SÚP\nRUY BĂNG', { r: 12, size: 14, draw: (c, w, h) => {
    rr(c, w / 2 - 8, 0, 16, h, PAL.red, 4); rr(c, 0, h / 2 - 8, w, 16, PAL.red, 4);
  } }),
  l10_soup_box_open: block(130, 70, '#f0a078', 'HỘP SÚP\nĐÃ MỞ', { r: 12, size: 14, draw: (c, w) => rr(c, 6, 4, w - 12, 14, '#fff3e0', 4) }),
  l10_shelf_mid: block(200, 30, PAL.woodDark, 'KỆ GIỮA', { r: 6, size: 14, color: PAL.white }),
  l10_book_stack: block(100, 150, '#b9c8e8', 'CHỒNG\nSÁCH', { r: 6, size: 15, ly: 0.3, draw: (c, w, h) => {
    for (let y = 26; y < h; y += 30) rr(c, 4, y, w - 8, 4, 'rgba(107,74,58,0.4)', 2);
  } }),
  l10_cake_box: block(120, 120, '#f6d6a8', 'HỘP\nBÁNH', { r: 8, size: 14, ly: 0.2, draw: (c, w, h) => {
    for (const [x, y] of [[0.3, 0.45], [0.7, 0.45], [0.5, 0.75]]) el(c, w * x, h * y, 16, 16, '#fff8ea', 'rgba(107,74,58,0.5)', 2);
  } }),
  l10_plant: block(170, 400, '#a8d49a', 'CHẬU\nCÂY', { r: 50, size: 18, ly: 0.3, draw: (c, w, h) => rr(c, 30, h - 110, w - 60, 110, PAL.woodDark, 12) }),
  l10_vase: block(70, 130, '#e6b8d8', 'LỌ\nHOA', { r: 18, size: 13, ly: 0.65, draw: (c, w) => {
    for (const x of [0.25, 0.5, 0.75]) el(c, w * x, 22, 14, 14, PAL.pink, 'rgba(107,74,58,0.5)', 2);
  } }),
  l10_blocks_a: block(60, 90, '#f4d27a', 'KHỐI', { r: 4, size: 12, ly: 0.7, draw: (c, w) => rr(c, 8, 4, w - 16, 26, '#9fd0ef', 3) }),
  l10_blocks_b: block(60, 110, '#a8d49a', 'KHỐI', { r: 4, size: 12, ly: 0.75, draw: (c, w) => rr(c, 8, 4, w - 16, 26, '#f2a6c8', 3) }),
  l10_lamp_post: block(30, 110, '#6b6b74', '', { r: 6, draw: (c, w) => el(c, w / 2, 14, 13, 13, '#fff8ea', '#4a4a52', 2) }),
  l10_train: block(98, 50, '#4f7fb8', 'TÀU', { r: 14, neo: 'tâm', size: 17, color: PAL.white }),
  l10_toy_car: block(158, 78, PAL.red, 'Ô TÔ', { r: 22, neo: 'tâm', size: 20, color: PAL.white }),
  l10_toy_tank: block(168, 88, '#7c8a5a', 'XE TĂNG', { r: 18, neo: 'tâm', size: 20, color: PAL.white }),
  l10_toy_firetruck: block(183, 84, '#e05a4a', 'CỨU HỎA', { r: 18, neo: 'tâm', size: 20, color: PAL.white }),
  l10_sofa: block(880, 400, '#c9a7d8', 'SOFA', { r: 40, size: 30, ly: 0.5, draw: (c, w) => rr(c, 20, 10, w - 40, 90, '#d9bfe5', 30) }),
  l10_pillow: block(220, 150, PAL.pink, 'GỐI', { r: 46, size: 24 }),
  l10_remote: block(154, 48, '#4a4a52', 'ĐIỀU KHIỂN', { r: 14, size: 15, color: PAL.white }),
  l10_remote_open: block(154, 48, '#4a4a52', 'HẾT PIN', { r: 14, size: 15, color: PAL.white, draw: (c, w, h) => rr(c, w - 46, 8, 38, h - 16, '#2a2a30', 6) }),
  l10_table_arena: block(510, 230, PAL.wood, 'BÀN TRÀ\nĐẤU TRƯỜNG', { r: 16, size: 20, ly: 0.6 }),
  l10_rug_loop: [598, 275, 'tâm', (c, w, h) => {
    rr(c, 4, 4, w - 8, h - 8, '#f2c9a0', 18);
    c.setLineDash([10, 8]); el(c, w / 2, h / 2 + TRACK.cy - DEF.l10_rug_loop[1], TRACK.rx, TRACK.ry, null, 'rgba(90,70,60,0.7)', 6); c.setLineDash([]); // đường ray
  }],
  l10_ball: block(78, 78, PAL.red, 'BÓNG', { shape: 'ellipse', neo: 'tâm', size: 18, color: PAL.white }),
  l10_plane: block(210, 98, PAL.sky, 'MÁY BAY', { r: 42, neo: 'tâm', size: 21 }),
  l10_battery: block(90, 60, PAL.gold, 'PIN', { r: 10, size: 18, neo: 'tâm' }),
  l10_fire: [300, 60, [0, 30], (c, w, h) => {
    c.beginPath(); c.ellipse(w / 2, h / 2, w / 2 - 2, h / 2 - 4, 0, 0, Math.PI * 2); c.fillStyle = 'rgba(150,215,255,0.85)'; c.fill();
    c.beginPath(); c.ellipse(w / 2, h / 2, w / 2 - 40, h / 2 - 16, 0, 0, Math.PI * 2); c.fillStyle = 'rgba(235,250,255,0.9)'; c.fill();
  }],
  // Dáng mèo mặc đồ (đổi theo nhịp đánh nhau; cùng cỡ, cùng neo chân).
  mun_gorilla_idle: suit(MUN_FILL, 'mun', 'THỦ THẾ'),
  mun_gorilla_block: suit(MUN_FILL, 'mun', 'ĐỠ CHÉO', arms('block')),
  mun_gorilla_punch: suit(MUN_FILL, 'mun', 'ĐẤM', arms('punch')),
  mun_gorilla_chest: suit(MUN_FILL, 'mun', 'ĐẤM NGỰC'),
  mun_gorilla_reach: suit(MUN_FILL, 'mun', 'VỒ\nMÁY BAY', arms('reach')),
  mun_gorilla_look: suit(MUN_FILL, 'mun', 'NGỬA CỔ\nNHÌN'),
  mun_gorilla_sniff: suit(MUN_FILL, 'mun', 'NGỬI'),
  mun_gorilla_lick: suit(MUN_FILL, 'mun', 'CÚI ĂN'),
  mun_gorilla_roar: suit(MUN_FILL, 'mun', 'GẦM'),
  sua_lizard_idle: suit(SUA_FILL, 'sua', 'THỦ THẾ'),
  sua_lizard_fire: suit(SUA_FILL, 'sua', 'KHÈ LỬA'),
  sua_lizard_fire_up: suit(SUA_FILL, 'sua', 'NGỬA CỔ\nKHÈ'),
  sua_lizard_look: suit(SUA_FILL, 'sua', 'NGỬA CỔ\nNHÌN'),
  sua_lizard_dodge: suit(SUA_FILL, 'sua', 'NÉ\nQUẤT ĐUÔI'),
  sua_lizard_roar: suit(SUA_FILL, 'sua', 'GẦM'),
  sua_lizard_sniff: suit(SUA_FILL, 'sua', 'NGỬI'),
  sua_lizard_lick: suit(SUA_FILL, 'sua', 'CÚI ĂN'),
};

export class Level10 extends ObjectLevel {
  constructor() { super('Level10'); }

  get levelNo() { return 10; }
  get fallbacks() { return FB; }
  get fallbackCanvas() { return true; }
  get defaultPos() { return DEF; }
  get fitDefaults() { return { ...REAL_W }; }
  get rewardFish() { return 50; }
  get suaHand() { return false; }
  get introCallLater() { return true; }                      // không có nhân vật gọi: vào thẳng cảnh đánh nhau
  get introLockMax() { return 9000; }
  get endFaces() { return ['mun_face_icon', 'sua_face_icon']; } // G10-16: màn thưởng hiện đầu Mun và Sữa cạnh nhau

  resetLevel() {
    Object.assign(this, { secrets: 0, mode: 'fight', beat: 0, beatT: null, boxState: 'shelf', planeState: 'floor', scissorsState: 'shelf',
      carry: false, ballOut: false, fires: [], firesOut: 0, vaseState: 'table', truckState: 'floor', truckCarry: false, eatT: null, eatN: 0, lickT: null, groomLoop: null, flight: null });
  }

  // ---------- dựng cảnh ----------
  buildRoom() {
    this.buildBg('l10_bg_living_kitchen');
    this.addProps([
      { name: 'shelfL', key: 'l10_shelf_left', depth: 5.5, zone: false },
      { name: 'shelfR', key: 'l10_shelf_right', depth: 5.5, zone: false },
      { name: 'shelfM', key: 'l10_shelf_mid', depth: 5.5, zone: false },
      { name: 'soupBox', key: 'l10_soup_box', depth: 5.6, zone: D.zone + 2, tap: () => this.soupBoxTap() },
      // G10-21: sofa, hai gối, chậu cây, chồng sách, khối xếp hình, thảm chỉ là cảnh (không vùng chạm).
      { name: 'books', key: 'l10_book_stack', depth: 5.6, zone: false },
      { name: 'plant', key: 'l10_plant', depth: this.yDepth(880), zone: false },
      { name: 'sofa', key: 'l10_sofa', depth: this.yDepth(860), zone: false },
      { name: 'pillow', key: 'l10_pillow', depth: this.yDepth(860) + 0.01, zone: false },
      { name: 'pillowR', key: 'l10_pillow', at: PILLOW_R, depth: this.yDepth(860) + 0.01, zone: false },
      { name: 'rug', key: 'l10_rug_loop', depth: 6, zone: false },
      { name: 'blocksA', key: 'l10_blocks_a', depth: rugDepth(DEF.l10_blocks_a[1]), zone: false },
      { name: 'blocksB', key: 'l10_blocks_b', depth: rugDepth(DEF.l10_blocks_b[1]), zone: false },
      { name: 'truck', key: 'l10_toy_firetruck', depth: this.yDepth(1216), zone: D.zone + 4, tap: () => this.truckTap() },
      { name: 'table', key: 'l10_table_arena', depth: this.yDepth(1060), tap: 'wiggle', wiggle: [1, 2, 220], sfx: 'sfx_tap' },
      { name: 'vase', key: 'l10_vase', depth: this.yDepth(1060) + 0.005, zone: D.zone + 4, tap: () => this.vaseTap() },
      { name: 'remote', key: 'l10_remote', depth: this.yDepth(1060) + 0.02, zone: D.zone + 4, tap: () => this.remoteTap() },
    ]);
    // Hai mèo mặc đồ (đứng yên) và mèo thật (ẩn, cùng neo chân; hiện dần lúc thu nhỏ).
    this.munSuit = this.img('mun_gorilla_idle', ...MUN_AT, this.yDepth(MUN_AT[1]));
    this.suaSuit = this.img('sua_lizard_idle', ...SUA_AT, this.yDepth(SUA_AT[1])); // ảnh thật quay trái sẵn
    this.zone('munSuit', this.artRect(this.munSuit), D.zone + 3);
    this.zone('suaSuit', this.artRect(this.suaSuit), D.zone + 3);
    this.munReal = this.img('mun_l10_eat', ...MUN_AT, this.munSuit.depth + 0.01).setVisible(false).setAlpha(0);
    this.suaReal = this.img('sua_l10_eat', ...SUA_AT, this.suaSuit.depth + 0.01).setVisible(false).setAlpha(0); // quay trái sẵn
    // Lửa (dải elip xanh nhạt, neo ở miệng Sữa), bóng (sàn trái), máy bay (sàn phải), cây kéo (trên kệ trái).
    this.fire = this.img('l10_fire', ...SUA_MOUTH, D.fx - 5).setVisible(false).setOrigin(0, 0.5); // gốc lửa ở miệng Sữa (mép trái ảnh)
    this.ballS = this.ySort(this.img('l10_ball', ...BALL_HOME, 0));
    this.zone('ball', this.artRect(this.ballS), D.zone + 4);
    this.plane = this.ySort(this.img('l10_plane', ...PLANE_HOME, 0));
    this.zone('plane', this.artRect(this.plane), D.zone + 4);
    this.scissors = this.img('l10_scissors', ...this.P('l10_scissors'), 5.7);
    this.zone('scissors', this.artRect(this.scissors), D.zone + 5);
    this.player = this.img('player_call', ...this.P('player_call'), D.player).setVisible(false); // màn không có nhân vật gọi (phần chung)
    this.blueFlash = this.add.rectangle(0, 0, 8, 8, 0xbfe6ff, 1).setOrigin(0).setScrollFactor(0).setDepth(D.fx - 6).setAlpha(0);
  }

  yDepth(y) { return 5 + y / 100; }
  ySort(s, off = 0) { return s.setDepth(this.yDepth(s.y) + off); }
  padRect(r, p) { return new Phaser.Geom.Rectangle(r.x - p, r.y - p, r.width + 2 * p, r.height + 2 * p); }

  layout() {
    super.layout();
    if (this.blueFlash) this.blueFlash.setSize(this.scale.width, this.scale.height);
  }

  // ---------- mở màn: vào thẳng cảnh đánh nhau, bong bóng nhiệm vụ mặt Mun ----------
  onIntro() {
    this.fightStep(0);
    this.sfx('l10_sfx_brass', 0.8);
    this.time.delayedCall(1500, () => {
      this.bubbleIntro();
      this.locked = false;
      this.phase = 'search';
      this.touch();
      this.time.delayedCall(2000, () => this.fireballIntro()); // G10-21: bong bóng xong thì quả cầu lửa
    });
  }

  // ---------- vòng đánh nhau 4 nhịp (mode 'fight') ----------
  fightStep(i) {
    if (this.beatT) this.beatT.remove();
    this.beatT = null;
    if (this.mode !== 'fight') return;
    this.beat = i;
    const M = this.munSuit, S = this.suaSuit;
    if (!this.busy.munSuit) this.applyKey(M, ['mun_gorilla_block', 'mun_gorilla_punch', 'mun_gorilla_idle', 'mun_gorilla_chest'][i]);
    if (!this.busy.suaSuit) this.applyKey(S, ['sua_lizard_fire', 'sua_lizard_idle', 'sua_lizard_dodge', 'sua_lizard_roar'][i]);
    if (i === 0) { // Sữa khè lửa ngang về phía Mun, Mun đỡ chéo; ánh xanh rọi cảnh
      this.fireBeam(SUA_MOUTH, MUN_HANDS, BEATS[0] - 200);
      this.tweens.add({ targets: this.blueFlash, alpha: 0.18, duration: 120, yoyo: true, hold: 200 });
      this.sfx('l10_sfx_fire_whoosh', 0.6);
    } else if (i === 1) { // Mun đấm, màn rung nhẹ
      this.cameras.main.shake(160, 0.004);
      this.sfx('l10_sfx_punch', 0.5);
      if (this.hints.h1 && this.scissorsState === 'bag' && this.boxState === 'shelf') this.sparkle(this.soupBox); // gợi ý 8 giây
    } else if (i === 2) { // Sữa né, quất đuôi gạt
      this.tweens.add({ targets: S, angle: -6, duration: 200, yoyo: true });
      this.sfx('l10_sfx_tail_swish', 0.5);
    } else { // gầm, đấm ngực
      this.squash(M); this.squash(S);
      this.sfx('l10_sfx_roar', 0.5);
    }
    this.beatT = this.time.delayedCall(BEATS[i], () => this.fightStep((i + 1) % 4));
  }

  // Dừng vòng đánh nhau (máy bay bay, chuỗi bóng, ăn); resumeFight đánh tiếp từ nhịp đầu.
  pauseFight(mode) {
    this.mode = mode;
    if (this.beatT) { this.beatT.remove(); this.beatT = null; }
    this.fire.setVisible(false);
  }
  resumeFight() {
    if (this.mode === 'eat' || this.mode === 'done') return;
    this.mode = 'fight';
    this.fire.setVisible(false);
    this.fightStep(0);
  }

  // Luồng lửa từ miệng Sữa tới điểm `to`; ms > 0: tắt sau ms.
  fireBeam(from, to, ms = 0) {
    const f = this.fire, d = Math.hypot(to[0] - from[0], to[1] - from[1]);
    f.setVisible(true).setPosition(...from).setAngle(Phaser.Math.RadToDeg(Math.atan2(to[1] - from[1], to[0] - from[0])))
      .setScale(d / f.width, (f.baseY || f.base) * 60 / 49).setAlpha(1); // ảnh cao 49, giãn lên 60
    if (ms) this.time.delayedCall(ms, () => { if (this.mode !== 'eat') f.setVisible(false); });
  }

  // ---------- chạm ----------
  handleLevel(name) {
    if (name === 'munSuit') this.suitTap('mun');
    else if (name === 'suaSuit') this.suitTap('sua');
    else if (name === 'plane') this.planeTap();
    else if (name === 'ball') this.ballTap();
    else if (name === 'scissors') this.scissorsTap();
  }

  // Mèo còn mặc đồ (Lẩn tránh): quay sang gầm, cú vung tay (Mun) / luồng gió (Sữa) thổi bàn tay người chơi bật ra rồi trở lại.
  suitTap(who) {
    if (this.phase !== 'search' || this.mode === 'eat' || this.mode === 'done' || this.busy[who + 'Suit']) return;
    this.catRoar(who);
    const s = who === 'mun' ? this.munSuit : this.suaSuit;
    const [x, y] = this.tipOf(s), dir = who === 'mun' ? 1 : -1;
    const h = this.img('ui_hand_pointer', x + dir * 60, y, D.hint).setOrigin(0.5, 0.5);
    this.fitWidth(h, 110);
    this.tweens.chain({ targets: h, tweens: [
      { x: x + dir * 700, y: y - 260, angle: dir * 200, duration: 380, ease: 'Quad.out' },
      { x: x + dir * 60, y, angle: 0, duration: 420, delay: 250, ease: 'Back.out' },
      { alpha: 0, duration: 200 },
    ], onComplete: () => h.destroy() });
  }

  // Con `who` quay sang gầm, gió "vù" (dùng chung: chạm mèo, thả kéo lên mèo).
  catRoar(who) {
    const s = who === 'mun' ? this.munSuit : this.suaSuit, k = `${who}Suit`;
    this.busy[k] = true;
    this.applyKey(s, who === 'mun' ? 'mun_gorilla_roar' : 'sua_lizard_roar');
    this.squash(s);
    this.sfx('l10_sfx_roar', 0.8);
    this.time.delayedCall(120, () => this.sfx('l10_sfx_gust', 0.7));
    this.time.delayedCall(900, () => { this.busy[k] = false; this.poseNow(); });
  }

  // Đặt lại dáng hai mèo theo chế độ hiện tại (sau một phản ứng riêng).
  poseNow() {
    if (this.mode !== 'fly') return; // đánh nhau: nhịp kế tự đổi dáng
    if (!this.busy.munSuit) this.applyKey(this.munSuit, 'mun_gorilla_look');
    if (!this.busy.suaSuit) this.applyKey(this.suaSuit, 'sua_lizard_look');
  }

  // Không nhặt được lúc này: đang nhặt món khác, hoặc túi đã đủ 4 món (nhặt món thứ 5 thì túi lắc).
  cantPick() {
    if (this.busy.pick) return true;
    if (this.bag && !this.bag.items.includes(null)) { this.bag.items.forEach((o) => o && this.shakeNo(o.s)); this.sfx('sfx_wrong'); return true; }
    return false;
  }

  // ---------- nhánh máy bay → cây kéo ----------

  remoteTap() {
    if (!this.remoteSafe) { this.remoteHot(); return; } // G10-21: còn cháy (hoặc sắp cháy lúc mở màn): tay giật lại
    if (this.cantPick()) return;
    if (this.got.l10_battery) { this.wiggle(this.remote, 3, 2, 200); return; }
    this.sfx('l10_sfx_battery_pop');
    this.swap(this.remote, 'l10_remote_open');
    const [x, y] = this.tipOf(this.remote);
    const b = this.img('l10_battery', x, y - 30, D.fx - 4);
    this.pickUp('l10_battery', b, 'remote', { done: () => { b.destroy(); this.zones.remote.setInteractive(); } });
  }

  // Ghép trong túi: pin lên máy bay (hay máy bay lên pin) → máy bay có pin, đáp xuống chỗ đậu trên sàn rồi cất cánh.
  onBagCombine(a, b) {
    if ([a.key, b.key].sort().join() === 'l10_toy_firetruck,l10_vase') { // G10-21: xe cứu hỏa chở lọ hoa làm bồn nước
      const t = a.key === 'l10_toy_firetruck' ? a : b, v = t === a ? b : a;
      this.bagMerge(v, t, 'l10_toy_firetruck', (it) => this.launchTruck(it));
      return true;
    }
    if ([a.key, b.key].sort().join() !== 'l10_battery,l10_plane') return false;
    const p = a.key === 'l10_plane' ? a : b, bat = p === a ? b : a;
    this.bagMerge(bat, p, 'l10_plane', (it) => this.launchPlane(it));
    return true;
  }

  launchPlane(it) {
    const [x, y] = [it.s.x, it.s.y];
    this.bagRemove(it, false);
    this.planeState = 'fly';
    const P = this.plane;
    P.setVisible(true).setAlpha(1).setAngle(0).setPosition(x, y).setScale(P.base, P.baseY || P.base).setDepth(D.fx - 4);
    this.moveTo(P, ...PLANE_HOME, 500, { arc: 80, onComplete: () => {
      this.sfx('l10_sfx_motor', 0.8);
      this.wiggle(P, 3, 4, 400); // cánh quạt quay, máy rung
      this.time.delayedCall(450, () => this.startFlight());
    } });
    this.touch();
  }

  // Máy bay tự bay theo FLY_A → móc kéo → FLY_B (stepFlight trong update); vòng đánh nhau tạm dừng, hai con ngửa cổ nhìn theo
  // (chờ chuỗi bóng xong nếu đang chạy).
  startFlight() {
    if (this.mode === 'ball' || this.mode === 'intro') { this.time.delayedCall(300, () => this.startFlight()); return; }
    this.pauseFight('fly');
    this.poseNow();
    this.zones.plane.setInteractive();
    this.applyKey(this.plane, 'l10_plane_fly'); // cánh quạt quay
    const mk = (pts) => {
      const c = new Phaser.Curves.Spline(pts.map(([x, y]) => new Phaser.Math.Vector2(x, y)));
      // vị trí (0–1 theo độ dài cung) của các mốc có sự kiện
      const ev = [];
      pts.forEach(([x, y, e]) => {
        if (!e) return;
        let best = 0, bd = 1e9;
        for (let i = 0; i <= 400; i++) { const p = c.getPointAt(i / 400), d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = i / 400; } }
        ev.push({ u: best, e, done: false });
      });
      return { c, len: c.getLength(), ev };
    };
    const A = mk(FLY_A), B = mk(FLY_B), move = FLY_MS - HOOK_HOLD;
    this.flight = { A, B, t: 0, dA: move * A.len / (A.len + B.len), dB: move * B.len / (A.len + B.len), ang: 0, wob: 0,
      swing: { a: 0, v: 0 }, vx: 0, lastX: this.plane.x, hooked: false };
    this.sfx('l10_sfx_motor', 0.8);
  }

  // Một khung bay: đoạn A (ease vào/ra theo độ dài cung) → dừng móc kéo → đoạn B; thân nghiêng theo hướng bay + nghiêng nhẹ khi rẽ;
  // kéo treo đung đưa theo quán tính, gần hạ cánh thì kéo gập lên nằm trên lưng.
  stepFlight(dt) {
    const F = this.flight, P = this.plane;
    if (!F) return;
    F.t += dt;
    const ease = (k) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, k)));
    let seg, u;
    if (F.t < F.dA) { seg = F.A; u = ease(F.t / F.dA); }
    else if (F.t < F.dA + HOOK_HOLD) { seg = F.A; u = 1; }
    else { seg = F.B; u = ease((F.t - F.dA - HOOK_HOLD) / F.dB); }
    const p = seg.c.getPointAt(u), tg = seg.c.getTangentAt(Math.min(0.999, Math.max(0.001, u)));
    P.setPosition(p.x, p.y);
    for (const e of seg.ev) if (!e.done && u >= e.u) { e.done = true; this.flightEvent(e.e, p.x, p.y, tg); }
    if (!F.hooked && F.t >= F.dA) { F.hooked = true; this.flightEvent('hook'); }
    // hướng: quay mặt theo chiều ngang (có ngưỡng, không lật qua lại); thân nghiêng theo dốc đường bay + nghiêng khi rẽ
    if (Math.abs(tg.x) > 0.25 && (tg.x < 0) !== !!P.faceLeft) this.face(P, tg.x < 0);
    const dir = P.faceLeft ? -1 : 1, pitch = Phaser.Math.RadToDeg(Math.atan2(tg.y, Math.abs(tg.x))) * dir;
    const vx = (p.x - F.lastX) / Math.max(1, dt);
    const ax = (vx - F.vx) / Math.max(1, dt);
    F.lastX = p.x; F.vx = vx;
    const onGround = p.y > PLANE_HOME[1] - 12;
    const target = onGround ? 0 : Phaser.Math.Clamp(pitch * 0.6, -28, 28) + Phaser.Math.Clamp(-ax * 900, -8, 8) * dir;
    F.ang += (target - F.ang) * Math.min(1, dt / 140);
    if (F.wob > 0) F.wob = Math.max(0, F.wob - dt);
    P.setAngle(F.ang + (F.wob > 0 ? 14 * Math.sin((F.wob / 400) * Math.PI * 4) : 0));
    this.zoneTo('plane', P);
    if (this.carry) this.swingScissors(F, seg, u, p, ax, dt, ease);
    if (seg === F.B && u >= 1) this.landPlane();
  }

  swingScissors(F, seg, u, p, ax, dt, ease) {
    // kéo treo: con lắc giảm chấn, lệch ngược chiều gia tốc ngang
    const S = F.swing, want = Phaser.Math.Clamp(-ax * 4000, -25, 25);
    S.v += (-(S.a - want) * 0.0006 - S.v * 0.012) * dt;
    S.a += S.v * dt;
    const r = Phaser.Math.DegToRad(S.a), px = p.x, py = p.y + 49;
    let bx = px - SWING_L * Math.sin(r), by = py + SWING_L * Math.cos(r), ba = S.a;
    if (seg === F.B && u > 0.8) { // gần hạ cánh: kéo gập lên nằm trên lưng
      const k = ease((u - 0.8) / 0.15);
      bx += (p.x - bx) * k; by += (p.y + BACK_DY - by) * k; ba *= 1 - k;
    }
    this.scissors.setPosition(bx, by).setAngle(ba);
  }

  flightEvent(ev, x, y, tg) {
    if (ev === 'sua') { // Sữa ngửa cổ khè, lửa luôn trượt sau đuôi máy bay
      this.busy.suaSuit = true;
      this.applyKey(this.suaSuit, 'sua_lizard_fire_up');
      this.fireBeam(SUA_MOUTH_UP, [x - tg.x * 150, y - tg.y * 150 + 30], 450);
      this.sfx('l10_sfx_fire_whoosh', 0.7);
      this.flight.wob = 400; // máy bay lắc né
      this.time.delayedCall(600, () => { this.busy.suaSuit = false; this.poseNow(); });
    } else if (ev === 'mun') { // Mun với tay vồ trượt
      this.busy.munSuit = true;
      this.applyKey(this.munSuit, 'mun_gorilla_reach');
      this.sfx('l10_sfx_swipe', 0.7);
      this.flight.wob = 400;
      this.time.delayedCall(600, () => { this.busy.munSuit = false; this.poseNow(); });
    } else if (ev === 'hook') { // tới kệ trái (đã chậm hẳn): móc kéo bằng càng đáp
      this.carry = true;
      this.scissorsState = 'fly';
      this.zones.scissors.disableInteractive();
      this.scissors.setDepth(D.fx - 3);
      this.sfx('l10_sfx_hook', 0.8);
      this.wiggle(this.shelfL, 2, 2, 200);
    }
  }

  // Hạ cánh lại chỗ đậu trên sàn phải: kéo nằm trên lưng máy bay, chạm được (vùng chạm kéo trên vùng máy bay); đánh nhau tiếp.
  landPlane() {
    this.flight = null;
    this.carry = false;
    this.planeState = 'landed';
    const P = this.plane;
    this.applyKey(P, 'l10_plane').setAngle(0); // cánh quạt đứng
    this.ySort(P); // giữ hướng lúc lăn bánh về (không lật đột ngột)
    this.zoneTo('plane', P);
    this.sfx('l10_sfx_land', 0.7);
    this.squash(P);
    this.scissors.setPosition(P.x, P.y + BACK_DY).setAngle(0).setDepth(P.depth + 0.01);
    this.scissorsState = 'landed';
    this.zoneTo('scissors', this.scissors);
    this.zones.scissors.setInteractive();
    this.resumeFight();
    this.touch();
  }

  // Máy bay trên sàn (G10-9): chạm vào túi. Đang bay: lắc cánh chào, bay tiếp. Đã đậu: cánh quạt quay chậm (lắc nhẹ).
  planeTap() {
    if (this.planeState === 'floor') {
      if (this.cantPick()) return;
      this.planeState = 'bag';
      this.sfx('l10_sfx_plastic');
      this.pickUp('l10_plane', this.plane, 'plane');
      return;
    }
    this.sfx('l10_sfx_motor', 0.4);
    if (this.flight) this.flight.wob = 400;
    else this.tweens.add({ targets: this.plane, angle: 6, duration: 140, yoyo: true, repeat: 1 });
  }

  // Kéo trên kệ: tay với không tới, kệ rung, bong bóng máy bay. Kéo trên máy bay đã về: vào túi.
  scissorsTap() {
    if (this.scissorsState === 'shelf') {
      this.sfx('l10_sfx_miss_reach', 0.6);
      this.wiggle(this.shelfL, 2, 3, 300);
      this.wiggle(this.scissors, 3, 3, 300);
      const r = this.artRect(this.scissors);
      this.thinkBubble('l10_plane', r.right + 90, r.bottom + 110, { w: 150, iconK: 0.5 });
      return;
    }
    if (this.scissorsState !== 'landed' || this.cantPick()) return;
    this.scissorsState = 'bag';
    this.sfx('l10_sfx_snip', 0.5);
    this.pickUp('l10_scissors', this.scissors, 'scissors', { done: () => this.wiggle(this.plane, 2, 3, 600) });
  }

  // ---------- nhánh bóng → hộp súp rơi ----------
  // Quả bóng nằm thẳng trên sàn bên trái (G10-9): chạm vào túi.
  ballTap() {
    if (this.got.l10_ball || this.ballOut || this.cantPick()) return;
    this.sfx('l10_sfx_plastic');
    this.pickUp('l10_ball', this.ballS, 'ball');
  }

  // Hộp súp trên kệ: tay với không tới, bong bóng quả bóng. Trên bàn (còn buộc): rung, bong bóng cây kéo.
  soupBoxTap() {
    if (this.boxState === 'shelf') {
      this.sfx('l10_sfx_miss_reach', 0.6);
      this.wiggle(this.soupBox, 4, 3, 300);
      const r = this.artRect(this.soupBox);
      this.thinkBubble('l10_ball', r.x - 60, r.bottom + 110, { w: 150, iconK: 0.5 });
    } else if (this.boxState === 'table') {
      this.sfx('l10_sfx_rustle', 0.7);
      this.wiggle(this.soupBox, 4, 3, 300);
      const r = this.artRect(this.soupBox);
      this.thinkBubble('l10_scissors', r.centerX + 60, r.y - 120, { w: 150, iconK: 0.5 });
    }
  }

  // Bóng thả lên Mun (đúng, G10-14) hoặc Sữa (Sữa gạt về); kéo thả lên mèo: con đó gầm, kéo bay về túi.
  onBagDrop(it, x, y) {
    const onMun = (p) => this.padRect(this.artRect(this.munSuit), p).contains(x, y);
    const onSua = (p) => this.padRect(this.artRect(this.suaSuit), p).contains(x, y);
    if (it.key === 'l10_ball') {
      if (!onMun(MUN_PAD) && !onSua(SUA_PAD)) return super.onBagDrop(it, x, y);
      if (this.mode !== 'fight') { this.bagReturn(it); return true; } // máy bay đang bay: hai con mải nhìn
      this.throwBall(it, onMun(MUN_PAD) ? 'mun' : 'sua');
      return true;
    }
    if (super.onBagDrop(it, x, y)) return true;
    if (it.key === 'l10_scissors' && (onMun(0) || onSua(0)) && this.mode !== 'eat' && this.mode !== 'done') {
      if (!this.busy[(onMun(0) ? 'mun' : 'sua') + 'Suit']) this.catRoar(onMun(0) ? 'mun' : 'sua');
      this.bagReturn(it);
      return true;
    }
    return false;
  }

  throwBall(it, who) {
    const [sx, sy] = [it.s.x, it.s.y];
    this.bagRemove(it, false);
    this.got.l10_ball = false;
    this.ballOut = true;
    const ball = this.ballS.setVisible(true).setPosition(sx, sy).setScale(this.ballS.base).setDepth(D.fx - 4);
    this.touch();
    if (who === 'sua') { this.ballToSua(ball); return; }
    // Mun đang giữa nhịp: bóng nảy nhẹ trước mặt Mun, xong nhịp mới đấm.
    const wait = this.beatT ? this.beatT.getRemaining() : 0;
    this.moveTo(ball, MUN_FIST[0] + 40, MUN_FIST[1] - 20, 300, { ease: 'Quad.out', onComplete: () => {
      if (wait > 300) this.hop(ball, 25, Math.max(200, wait - 300));
    } });
    this.time.delayedCall(Math.max(320, wait + 20), () => this.ballChain(ball));
  }

  // G10-14: Mun đấm bóng sang Sữa → Sữa khè lửa vào bóng, bóng bay ngược về Mun → Mun đấm bóng vòng cung trúng hộp súp (còn trên kệ)
  // → hộp rơi giữa bàn trà. Hộp đã rơi: cú cuối bóng bay về sàn trái.
  ballChain(ball) {
    if (this.mode === 'fly') { this.time.delayedCall(300, () => this.ballChain(ball)); return; } // máy bay vừa cất cánh: chờ hạ cánh
    this.pauseFight('ball');
    const M = this.munSuit, S = this.suaSuit;
    const punch = () => { this.applyKey(M, 'mun_gorilla_punch'); this.cameras.main.shake(140, 0.005); this.sfx('l10_sfx_punch', 1); };
    this.applyKey(S, 'sua_lizard_idle');
    punch();
    this.moveTo(ball, SUA_MOUTH[0] - 40, SUA_MOUTH[1] + 10, 380, { ease: 'Quad.out', onComplete: () => {
      this.applyKey(M, 'mun_gorilla_idle');
      this.applyKey(S, 'sua_lizard_fire');
      this.fireBeam(SUA_MOUTH, MUN_HANDS, 400);
      this.sfx('l10_sfx_fire_whoosh', 0.9);
      this.moveTo(ball, ...MUN_FIST, 450, { ease: 'Quad.in', onComplete: () => {
        punch();
        if (this.boxState !== 'shelf') { this.ballHome(ball); this.time.delayedCall(600, () => this.resumeFight()); return; }
        const [bx, by] = this.tipOf(this.soupBox);
        this.moveTo(ball, bx, by, 650, { arc: 260, ease: 'Sine.inOut', onComplete: () => {
          this.sfx('l10_sfx_box_hit', 1);
          this.ballHome(ball);
          this.dropBox();
        } });
      } });
    } });
  }

  // Thả bóng lên Sữa: Sữa quất đuôi gạt bóng về chỗ cũ trên sàn trái; bong bóng mặt Mun.
  ballToSua(ball) {
    const [sx, sy] = this.tipOf(this.suaSuit), S = this.suaSuit;
    this.moveTo(ball, sx, sy - 40, 360, { ease: 'Quad.in', onComplete: () => {
      this.busy.suaSuit = true;
      this.applyKey(S, 'sua_lizard_dodge');
      this.tweens.add({ targets: S, angle: -8, duration: 180, yoyo: true });
      this.sfx('l10_sfx_bop', 0.7);
      this.thinkBubble('mun_face_icon', sx - 160, sy - 300, { w: 150, iconK: 0.5 });
      this.ballHome(ball);
      this.time.delayedCall(500, () => { this.busy.suaSuit = false; this.poseNow(); });
    } });
  }

  // Bóng nảy rồi lăn về chỗ cũ trên sàn trái, chạm lấy lại được.
  ballHome(ball) {
    this.moveTo(ball, ...BALL_HOME, 800, { arc: 180, ease: 'Sine.inOut', onComplete: () => {
      this.ySort(ball);
      this.ballOut = false;
      this.hop(ball, 14, 220);
      this.sfx('l10_sfx_plastic', 0.6);
      this.zoneTo('ball', ball);
      this.zones.ball.setInteractive();
    } });
  }

  // Bóng trúng hộp: hộp chao, rơi đúng xuống giữa bàn trà; hai con cúi nhìn cái hộp lạ, gầm gừ, đánh tiếp.
  dropBox() {
    this.boxState = 'fall';
    this.zones.soupBox.disableInteractive();
    const b = this.soupBox;
    this.tweens.add({ targets: b, angle: 12, duration: 120, yoyo: true, repeat: 1, onComplete: () => {
      b.setDepth(D.fx - 5);
      this.tweens.add({ targets: b, angle: -20, duration: 300, yoyo: true });
      this.moveTo(b, ...BOX_TABLE, 600, { ease: 'Quad.in', onComplete: () => {
        b.setAngle(0).setDepth(this.table.depth + 0.03);
        this.sfx('l10_sfx_box_thud', 1);
        this.dust(...BOX_TABLE);
        this.squash(b);
        this.boxState = 'table';
        this.propZone('soupBox');
        this.zones.soupBox.setInteractive();
        this.applyKey(this.munSuit, 'mun_gorilla_sniff');
        this.applyKey(this.suaSuit, 'sua_lizard_sniff');
        this.time.delayedCall(700, () => this.sfx('l10_sfx_growl', 0.6));
        this.time.delayedCall(1300, () => this.resumeFight());
      } });
    } });
    this.touch();
  }

  // ---------- thả kéo lên hộp súp ----------
  get dropSpots() {
    return [
      { when: () => this.boxState === 'table' && this.mode !== 'eat' && this.mode !== 'done', rect: () => this.padRect(this.artRect(this.soupBox), 70),
        want: () => 'l10_scissors', place: (it) => this.cutRibbon(it) },
      { when: () => this.boxState === 'shelf', rect: () => this.padRect(this.artRect(this.soupBox), 60), want: () => null,
        wrong: (it) => { this.sfx('l10_sfx_miss_reach', 0.6); this.wiggle(this.soupBox, 3, 2, 260); this.bagReturn(it); } },
      ...FIRE_AT.map((_, i) => ({ when: () => !!this.fires[i], rect: () => this.fireRect(i), want: () => null, wrong: (it) => this.fireWrong(it, i) })),
    ];
  }

  // Kéo tự cắt ruy băng, nắp mở, khói cá; hai con khựng, nhạc kèn tắt, cùng cúi ăn → 5 nấc thu nhỏ tự chạy.
  cutRibbon(it) {
    this.bagRemove(it, false);
    this.pauseFight('eat');
    this.blueFlash.setAlpha(0);
    const b = this.soupBox, r = this.artRect(b);
    const sc = this.scissors.setVisible(true).setAlpha(1).setPosition(r.centerX + 20, r.centerY + 30).setScale(this.scissors.base).setDepth(D.fx - 4);
    this.tweens.add({ targets: sc, angle: 18, duration: 120, yoyo: true, repeat: 2, onComplete: () => {
      sc.setVisible(false);
      this.sfx('l10_sfx_snip', 1);
      this.applyKey(b, 'l10_soup_box_open');
      this.squash(b);
      this.zones.soupBox.disableInteractive();
      this.sfx('l10_sfx_music_stop', 1); // nhạc kèn tắt phụt
      this.fishSmoke(r.centerX, r.y - 20);
      this.applyKey(this.munSuit, 'mun_gorilla_sniff');
      this.applyKey(this.suaSuit, 'sua_lizard_sniff');
      // G10-14: hộp bay nhẹ lên ~60 rồi từ từ hạ xuống sàn giữa hai mèo; bàn trà, lọ hoa, hộp bánh, điều khiển mờ dần 1 giây rồi biến mất.
      b.setDepth(D.fx - 5);
      this.tweens.chain({ targets: b, tweens: [
        { y: b.y - 60, duration: 350, ease: 'Quad.out' },
        { x: BOX_FLOOR[0], y: BOX_FLOOR[1], duration: 1000, ease: 'Sine.inOut' },
      ], onComplete: () => { this.ySort(b, 0.05); this.squash(b); this.sfx('l10_sfx_box_thud', 0.4); } });
      for (const n of ['table', 'remote', ...(this.vaseState === 'table' ? ['vase'] : [])]) {
        if (this.zones[n]) this.zones[n].disableInteractive();
        this.tweens.add({ targets: this[n], alpha: 0, duration: 1000, onComplete: () => this[n].setVisible(false) });
      }
      this.time.delayedCall(1450, () => this.startEat());
    } });
    this.touch();
  }

  // Khói thơm hình cá (ảnh l10_fish_smoke): 3 làn bay lên, lượn, tan.
  fishSmoke(x, y) {
    for (let i = 0; i < 3; i++) {
      const g = this.img('l10_fish_smoke', x + (i - 1) * 30, y, D.fx - 3).setAlpha(0.9);
      if (i === 1) this.face(g, true);
      this.tweens.add({ targets: g, y: y - 220 - i * 40, x: g.x + (i - 1) * 50, alpha: 0, scale: g.base * 1.4, duration: 1400, delay: i * 180,
        onComplete: () => g.destroy() });
    }
  }

  // G10-15: một tween liên tục EAT_MS (Sine.inOut): mèo mặc đồ và mèo thật cùng thu nhỏ theo một tỉ lệ trên cùng điểm neo chân,
  // mặc đồ mờ dần, mèo thật hiện dần; neo chân trượt dần về hai bên hộp súp; đầu cúi liếm lắc nhẹ (chỉ góc, không đổi cỡ).
  startEat() {
    this.applyKey(this.munSuit, 'mun_gorilla_lick');
    this.applyKey(this.suaSuit, 'sua_lizard_lick');
    const cats = [[this.munSuit, this.munReal, EAT_SLIDE.mun], [this.suaSuit, this.suaReal, EAT_SLIDE.sua]].map(([suitS, real, dx]) => {
      real.setVisible(true).setAlpha(0);
      return { suitS, real, dx, x0: suitS.x, R: (suitS.height * (suitS.baseY || suitS.base)) / (real.height * (real.baseY || real.base)) };
    });
    this.eatT = this.tweens.addCounter({ from: 0, to: 1, duration: EAT_MS, ease: 'Sine.inOut', onUpdate: (tw) => {
      const p = tw.getValue(), lick = 3 * Math.sin(this.time.now / 140);
      cats.forEach(({ suitS, real, dx, x0, R }, i) => {
        const k = 1 - p * (1 - 1 / R), x = x0 + dx * p, a = i ? -lick : lick;
        suitS.setPosition(x, suitS.y).setScale(suitS.base * k, (suitS.baseY || suitS.base) * k).setAlpha(1 - p).setAngle(a);
        real.setPosition(x, real.y).setScale(real.base * R * k, (real.baseY || real.base) * R * k).setAlpha(p).setAngle(a * 0.5);
      });
    }, onComplete: () => {
      cats.forEach(({ suitS, real }) => { suitS.setAngle(0); real.setAngle(0); });
      this.reunion();
    } });
    this.lickT = this.time.addEvent({ delay: 450, loop: true, callback: () => { if (this.mode === 'eat') this.sfx('l10_sfx_lick', 0.4); } });
  }

  // Sau tween: hai mèo thật ở ngay chỗ cuối tween (hai bên hộp súp), thay nhau liếm tai và cổ; nhạc hộp dịu.
  // G10-16: không cần chạm mèo, không mũi tên: liếm lông 1,5 giây rồi tự vào màn thưởng (G10-17: bỏ cảnh bế; tiến độ tính cho Mun).
  reunion() {
    this.mode = 'done';
    if (this.lickT) { this.lickT.remove(); this.lickT = null; }
    const M = this.munReal, S = this.suaReal;
    this.munSuit.setVisible(false); this.suaSuit.setVisible(false);
    this.zones.munSuit.disableInteractive(); this.zones.suaSuit.disableInteractive();
    this.sfx('l10_sfx_music_box', 0.8);
    this.applyKey(M, 'mun_l10_groom'); this.applyKey(S, 'sua_l10_groom'); // ảnh liếm lông: Sữa quay trái sẵn
    M.setScale(M.base, M.baseY || M.base).setAlpha(1); S.setScale(S.base, S.baseY || S.base).setAlpha(1);
    // Nối tiếp từ chỗ cuối tween (không nhảy): trượt êm vào giữa, ra trước hộp, hai con chạm nhau rồi liếm lông.
    this.moveTo(M, ...GROOM_AT.mun, 600, { ease: 'Sine.inOut', onUpdate: () => this.ySort(M, 0.02) });
    this.moveTo(S, ...GROOM_AT.sua, 600, { ease: 'Sine.inOut', onUpdate: () => this.ySort(S, 0.01) });
    this.time.delayedCall(800, () => {
      // Thay nhau liếm: nghiêng đầu về phía nhau, tim nhỏ.
      let turn = 0;
      this.groomLoop = this.time.addEvent({ delay: 900, loop: true, callback: () => {
        const who = turn++ % 2 ? S : M;
        this.tweens.add({ targets: who, angle: who === M ? 8 : -8, duration: 300, yoyo: true });
        this.sfx('l10_sfx_lick', 0.3);
      } });
      this.hearts(M.x + 60, M.y - 200, 3);
      this.phase = 'found';
      this.sua = M;
      this.bubbleFound();
      this.time.delayedCall(1500, () => { if (this.phase === 'found' && !this.ending) this.startEnding(); });
    });
  }

  // G10-16: bong bóng lúc tìm thấy hiện đầu Mun và đầu Sữa cạnh nhau (thay vì một đầu Mun).
  bubbleFound() {
    const B = this.bubble, f = B.face;
    f.setScale(f.scale * 0.72).setX(-48);
    const s2 = this.add.image(48, f.y, 'sua_face_icon').setAlpha(0);
    s2.setScale(f.displayWidth / s2.width);
    B.ct.add(s2);
    this.tweens.add({ targets: s2, alpha: 1, delay: 250, duration: 300 });
    super.bubbleFound();
  }

  beforeEnding() {
    if (this.groomLoop) { this.groomLoop.remove(); this.groomLoop = null; }
    this.munReal.setAngle(0); this.suaReal.setAngle(0);
  }

  // G10-17: L10 bỏ cảnh bế chung: liếm lông 1,5 giây là kết thúc, đi thẳng vào màn thưởng (hai đầu mèo); hai mèo ở nguyên trong cảnh nền.
  startEnding() {
    this.phase = 'ending';
    this.locked = true;
    this.handHide();
    this.handHide('paw');
    this.bagHide();
    this.beforeEnding();
    const W = this.scale.width, H = this.scale.height;
    this.dim = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 1).setScrollFactor(0).setDepth(D.end).setAlpha(0);
    this.reward();
  }

  // ---------- G10-21: quả cầu lửa mở màn, 3 đám cháy, lọ hoa + xe cứu hỏa dập lửa ----------
  // Mở màn (một lần, sau bong bóng nhiệm vụ): Sữa khè quả cầu lửa → Mun giơ tay đỡ → quả cầu dội lên, tách 3, bay vòng cung
  // rơi xuống góc trái thảm, góc phải thảm, điều khiển TV → 3 đám lửa nhỏ lập lòe mãi. Rồi đánh nhau tiếp.
  fireballIntro() {
    if (this.mode !== 'fight') { this.time.delayedCall(300, () => this.fireballIntro()); return; }
    this.pauseFight('intro');
    const M = this.munSuit, S = this.suaSuit;
    this.applyKey(S, 'sua_lizard_fire');
    this.sfx('l10_sfx_fire_whoosh', 0.9);
    const orb = this.fireOrb(...SUA_MOUTH, 1);
    this.flyTo(orb, ...MUN_HANDS, 600, { ease: 'Quad.in', onComplete: () => {
      this.applyKey(M, 'mun_gorilla_block');
      this.cameras.main.shake(140, 0.005);
      this.sfx('l10_sfx_punch', 0.8);
      this.flyTo(orb, 480, 430, 380, { ease: 'Quad.out', onComplete: () => {
        orb.destroy();
        this.sfx('l10_sfx_pop', 0.8);
        FIRE_AT.forEach(([x, y], i) => {
          const b = this.fireOrb(480, 430, 0.55);
          this.flyTo(b, x, y - 20, 650 + i * 80, { arc: 160, ease: 'Sine.in', onComplete: () => { b.destroy(); this.lightFire(i); } });
        });
        this.time.delayedCall(1000, () => this.resumeFight());
      } });
    } });
  }

  // Như moveTo nhưng không quay mặt (moveTo gọi faceToward → setFlipX, Container / Graphics không có): dùng cho quả cầu lửa.
  flyTo(o, x, y, ms, { ease = 'Sine.inOut', arc = 0, onComplete } = {}) {
    const x0 = o.x, y0 = o.y;
    return this.tweens.addCounter({ from: 0, to: 1, duration: ms, ease, onUpdate: (tw) => {
      const k = tw.getValue();
      o.setPosition(x0 + (x - x0) * k, y0 + (y - y0) * k - arc * Math.sin(Math.PI * k));
    }, onComplete });
  }

  // Quả cầu lửa xanh nhạt (vẽ bằng code): lõi trắng, viền xanh, phập phồng.
  fireOrb(x, y, k) {
    const c = this.add.container(x, y).setDepth(D.fx - 4);
    c.add([this.add.circle(0, 0, 30 * k, 0x9fd8ff, 0.9).setStrokeStyle(4, 0xd8f2ff), this.add.circle(0, 0, 15 * k, 0xf2fbff, 1)]);
    this.tweens.add({ targets: c, scale: 1.15, duration: 120, yoyo: true, repeat: -1 });
    return c;
  }

  // Đám lửa nhỏ: hai lớp ảnh l10_fire đặt đứng (gốc ở dưới), xoay lệch nhau cho ra hình ngọn lửa, cao ~95, đặc (alpha 0,95),
  // lập lòe scale 0,9–1,1 lệch nhịp nhau.
  lightFire(i) {
    const [x, y] = FIRE_AT[i], d = i === 2 ? this.remote.depth + 0.01 : rugDepth(y) + 0.05;
    const f = [[-90, 0.32, 1.7, 0], [-78, 0.25, 1.3, 0.001], [-102, 0.22, 1.2, 0.002]].map(([a, kx, ky, dd]) => {
      const s = this.img('l10_fire', x, y, d + dd).setOrigin(0, 0.5).setAngle(a).setAlpha(0.95);
      return s.setScale(s.base * kx, (s.baseY || s.base) * ky);
    });
    const tw = f.map((s, k) => this.tweens.addCounter({ from: 0, to: Math.PI * 2, duration: 420 + k * 90, repeat: -1, onUpdate: (t) => {
      const v = 1 + 0.1 * Math.sin(t.getValue()), b = s.base;
      s.scaleX = b * [0.32, 0.25, 0.22][k] * v;
    } }));
    const sx = f[0].base * 0.32, sy = (f[0].baseY || f[0].base) * 1.7;
    this.fires[i] = { f, tw, sx, sy };
    this.dust(x, y);
    this.sfx('l10_sfx_fire_whoosh', 0.5);
  }

  get remoteSafe() { return this.firesOut >= 3 || (this.fires.length === 3 && !this.fires[2]); } // điều khiển đã tắt lửa
  get burning() { return this.firesOut < 3; }                        // còn đám cháy (kể cả trước lúc quả cầu rơi)

  fireRect(i) { const [x, y] = FIRE_AT[i]; return new Phaser.Geom.Rectangle(x - 60, y - 120, 120, 140); }

  // Điều khiển còn cháy: tay với tới thì giật lại "nóng", bong bóng xe cứu hỏa.
  remoteHot() {
    const [x, y] = this.tipOf(this.remote);
    this.sfx('l10_sfx_sizzle', 0.7);
    this.wiggle(this.remote, 3, 2, 200);
    const h = this.img('ui_hand_pointer', x + 30, y + 60, D.hint).setOrigin(0.5, 0.5);
    this.fitWidth(h, 100);
    this.tweens.chain({ targets: h, tweens: [
      { y: y + 20, duration: 140, ease: 'Quad.out' }, { y: y + 160, x: x + 70, angle: 20, duration: 220, ease: 'Quad.in' }, { alpha: 0, duration: 150 },
    ], onComplete: () => h.destroy() });
    this.thinkBubble('l10_toy_firetruck', x - 120, y - 200, { w: 150, iconK: 0.5 });
  }

  // Lọ hoa trên bàn: vào túi.
  vaseTap() {
    if (this.vaseState !== 'table' || this.cantPick()) return;
    this.vaseState = 'bag';
    this.sfx('l10_sfx_chime', 0.6);
    this.pickUp('l10_vase', this.vase, 'vase');
  }

  // Xe cứu hỏa: trên sàn → vào túi; đã dập lửa xong, đỗ góc thảm → hú còi.
  truckTap() {
    if (this.truckState === 'parked') { this.sfx('l10_sfx_siren', 0.7); this.hop(this.truck, 14, 240); return; }
    if (this.truckState !== 'floor' || this.cantPick()) return;
    this.truckState = 'bag';
    this.sfx('l10_sfx_plastic');
    this.pickUp('l10_toy_firetruck', this.truck, 'truck');
  }

  // Ghép xong: xe (lọ hoa trên nóc) hiện trên sàn, hú còi, chạy lần lượt xịt tắt 3 đám cháy (~5 giây), rồi đỗ góc phải thảm.
  launchTruck(it) {
    const [x, y] = [it.s.x, it.s.y];
    this.bagRemove(it, false);
    this.truckState = 'run';
    const T = this.truck;
    T.setVisible(true).setAlpha(1).setAngle(0).setPosition(x, y).setScale(T.base, T.baseY || T.base).setDepth(D.fx - 4);
    this.vase.setVisible(true).setAlpha(1).setAngle(0).setScale(this.vase.base * 0.55, (this.vase.baseY || this.vase.base) * 0.55).setDepth(D.fx - 3);
    this.truckCarry = true;
    this.sfx('l10_sfx_siren', 0.8);
    this.touch();
    const go = (k) => {
      if (k >= TRUCK_RUN.length) { this.parkTruck(); return; }
      const st = TRUCK_RUN[k];
      this.face(T, st.at[0] < T.x);
      this.moveTo(T, ...st.at, k ? 650 : 500, { ease: 'Sine.inOut', onUpdate: () => this.ySort(T, 0.3), onComplete: () => {
        this.face(T, false); // quay vòi về phía đám cháy (bên phải)
        const nz = st.up ? [T.x + 30, T.y - 60] : [T.x + 96, T.y - 20];
        const [fx, fy] = FIRE_AT[st.fire];
        this.spray(nz, [fx, fy - 30], 650, () => { this.putOut(st.fire); go(k + 1); });
      } });
    };
    go(0);
  }

  parkTruck() {
    const T = this.truck;
    this.face(T, TRUCK_PARK[0] < T.x);
    this.moveTo(T, ...TRUCK_PARK, 500, { ease: 'Sine.inOut', onUpdate: () => this.ySort(T, 0.3), onComplete: () => {
      this.ySort(T, 0.3);
      this.truckState = 'parked';
      this.zoneTo('truck', T);
      this.zones.truck.setInteractive();
      this.sfx('l10_sfx_siren', 0.5);
    } });
  }

  // Tia nước (vẽ bằng code) từ vòi tới đích trong ms, rồi done.
  spray(from, to, ms, done) {
    const g = this.add.graphics().setDepth(D.fx - 3);
    let t = 0;
    this.sfx('l10_sfx_sizzle', 0.7);
    const ev = this.time.addEvent({ delay: 30, loop: true, callback: () => {
      t += 30;
      g.clear().lineStyle(9, 0x9fd0ef, 0.9).lineBetween(...from, ...to);
      for (let k = 0; k < 5; k++) {
        const u = Math.random();
        g.fillStyle(0xe8f6ff, 1).fillCircle(from[0] + (to[0] - from[0]) * u, from[1] + (to[1] - from[1]) * u + (Math.random() - 0.5) * 14, 4);
      }
      if (t >= ms) { ev.remove(); g.destroy(); done(); }
    } });
  }

  // Đám cháy i tắt: lửa xẹp, hơi nước bốc lên. Hết cả 3: điều khiển hơi ám khói, lấy được pin.
  putOut(i) {
    const F = this.fires[i];
    if (!F) return;
    this.fires[i] = null;
    F.tw.forEach((t) => t.stop());
    this.tweens.add({ targets: F.f, scaleX: 0, scaleY: 0, alpha: 0, duration: 300, onComplete: () => F.f.forEach((o) => o.destroy()) });
    const [x, y] = FIRE_AT[i];
    for (let k = 0; k < 3; k++) {
      const p = this.add.circle(x + (k - 1) * 20, y - 20, 14, 0xffffff, 0.8).setDepth(D.fx - 3);
      this.tweens.add({ targets: p, y: y - 140 - k * 20, alpha: 0, scale: 1.8, duration: 800, delay: k * 90, onComplete: () => p.destroy() });
    }
    this.firesOut++;
    if (i === 2) this.remote.setTint(0xd8d2cc); // điều khiển hơi ám khói
  }

  // Chạm sai: lọ hoa thả lên đám cháy → nước tóe, lửa xẹp rồi bùng lại, bong bóng xe cứu hỏa; xe chưa ghép → vài giọt, bong bóng lọ hoa.
  fireWrong(it, i) {
    const F = this.fires[i], [x, y] = FIRE_AT[i];
    this.bagReturn(it);
    if (it.key !== 'l10_vase' && it.key !== 'l10_toy_firetruck') return;
    const n = it.key === 'l10_vase' ? 6 : 3;
    for (let k = 0; k < n; k++) {
      const d = this.add.circle(x, y - 60, 6, 0x9fd0ef, 1).setDepth(D.fx - 3);
      this.tweens.add({ targets: d, x: x + (k - n / 2) * 18, y: y + 10, alpha: 0, duration: 450, delay: k * 40, onComplete: () => d.destroy() });
    }
    this.sfx('l10_sfx_sizzle', 0.6);
    if (F && it.key === 'l10_vase') F.f.forEach((o) => this.tweens.add({ targets: o, scaleY: o.scaleY * 0.35, duration: 200, yoyo: true, hold: 350, ease: 'Quad.out' }));
    this.thinkBubble(it.key === 'l10_vase' ? 'l10_toy_firetruck' : 'l10_vase', x + (x > 500 ? -120 : 120), y - 230, { w: 150, iconK: 0.5 });
  }

  // ---------- gợi ý ----------
  // Bước kế tiếp: kéo + hộp trên bàn → thả kéo lên hộp; món đang dở trước (kéo trên máy bay, ghép pin, bóng trong túi);
  // rồi nhánh máy bay (máy bay trên sàn, điều khiển) khi chưa có kéo, nhánh bóng (bóng trên sàn) khi hộp súp còn trên kệ.
  hintStep() {
    if (this.phase !== 'search' || this.mode === 'eat' || this.mode === 'done' || this.mode === 'fly') return null;
    const it = (k) => this.bagItem(k);
    if (it('l10_scissors') && this.boxState === 'table') return { item: it('l10_scissors'), to: this.tipOf(this.soupBox) };
    if (this.scissorsState === 'landed') return { sprite: this.scissors };
    if (it('l10_plane') && it('l10_battery')) return { item: it('l10_battery'), to: this.slotPos(it('l10_plane').i) };
    if (it('l10_ball') && this.boxState === 'shelf') return { item: it('l10_ball'), to: this.tipOf(this.munSuit) };
    if (this.scissorsState === 'shelf') {
      if (this.burning) { // G10-21: còn cháy: ghép lọ hoa với xe cứu hỏa
        const v = it('l10_vase'), t = it('l10_toy_firetruck');
        if (v && t) return { item: v, to: this.slotPos(t.i) };
        if (this.vaseState === 'table') return { sprite: this.vase };
        if (this.truckState === 'floor') return { sprite: this.truck };
        return null;
      }
      if (this.planeState === 'floor') return { sprite: this.plane };
      if (!this.got.l10_battery) return { sprite: this.remote };
    }
    if (this.boxState === 'shelf' && !this.ballOut && !this.got.l10_ball) return { sprite: this.ballS };
    return null;
  }

  // 8 giây: còn cháy: các đám lửa bùng to một nhịp, lọ hoa và xe cứu hỏa nảy nhẹ. Hết cháy, chưa có kéo: máy bay lắc, điều khiển nháy. Có kéo, hộp còn trên kệ: hộp súp lóe mỗi lần
  // Mun đấm (fightStep), quả bóng nảy. Hộp đã rơi: ruy băng lấp lánh.
  hint1() {
    if (this.scissorsState === 'shelf' && this.burning) {
      this.fires.forEach((F) => F && F.f.forEach((o) => this.tweens.add({ targets: o, scaleY: o.scaleY * 1.35, duration: 220, yoyo: true })));
      if (this.vaseState === 'table') this.hop(this.vase, 12, 260);
      if (this.truckState === 'floor') this.hop(this.truck, 12, 260);
    } else if (this.scissorsState === 'shelf') {
      if (this.planeState === 'floor') this.wiggle(this.plane, 4, 2, 260);
      if (!this.got.l10_battery) this.tweens.add({ targets: this.remote, alpha: 0.4, duration: 150, yoyo: true, repeat: 2 });
    } else if (this.boxState === 'shelf') { if (!this.ballOut && !this.got.l10_ball) this.hop(this.ballS, 14, 260); }
    else if (this.boxState === 'table') this.sparkle(this.soupBox);
  }

  // 16 giây: đồ cần chạm tiếp lấp lánh; icon trong túi nảy lên.
  idleSparkle() {
    const h = this.hintStep();
    if (!h) return;
    if (h.item) this.hop(h.item.s, 22, 300);
    else this.sparkle(h.sprite);
  }

  // 💡 bàn chân làm mẫu bước đang thiếu (ghép lọ hoa với xe cứu hỏa; ghép pin vào máy bay; kéo bóng thả lên Mun; kéo kéo thả lên hộp súp).
  strongHint() {
    this.pressBulb();
    const h = this.hintStep();
    if (!h) return;
    if (h.item) { this.handDrag(this.slotPos(h.item.i), h.to, 'hint', 'paw', 2); return; }
    this.pawAt(this.tipOf(h.sprite));
  }

  update(time, delta) {
    if (this.truckCarry && this.truck) { // lọ hoa nằm trên nóc xe cứu hỏa
      const T = this.truck;
      this.vase.setPosition(T.x + (T.faceLeft ? 12 : -12), T.y - 38).setDepth(T.depth + 0.01);
    }
    if (!this.frozen && this.planeState === 'fly') this.stepFlight(Math.min(50, delta || 16));
    this.idleHints(time);
  }
}
