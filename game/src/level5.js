// Level 5 – Đốm sáng. BẢN KHỐI (QUY-TRINH bước 2, G5-1): chưa có ảnh, mọi key tự vẽ khối màu phẳng có nhãn (makeFallback);
// tên key, lớp và luồng theo levels/levels-01-10.md và levels/states-01-10.md (Level 5). Có ảnh thật thì game tự dùng ảnh.
// Hai phòng: sân sau (x 0–1024, bắt đầu) ⇄ con hẻm (x 1024–2048), camera trượt ngang, túi đồ đi theo camera như L4.
// Mèo là Mun (♥ 1/6): thanh ♥ 6 ô riêng, mặt Mun trong bong bóng nhiệm vụ, Mun trong cảnh bế.
// Vòng 2 (G5-5, G5-6): nối tia nắng. Hẻm tối tới khi kéo bạt (dây kéo, chấm nắng li ti); 3 đồ sáng (gương, nắp thiếc, đĩa CD)
// thả lần lượt vào đốm sáng ở A → B → C, mỗi lần tia phản chiếu bật sang điểm kế, gần Mun hơn; tới trước gầm thì Mun phóng ra.
// ?level=5&debug=1: đánh dấu 3 điểm A, B, C và điểm trước gầm xe.
import { D } from './base.js';
import { RoomsLevel, ROOM_W } from './rooms.js';

const YARD = 0, ALLEY = 1;
// Vị trí (toạ độ trong khung phòng, khung 1024x1536). ROOM cho biết key ở phòng nào.
// D5-15: đo trên demo duyệt (G5-22) `l5_demo_yard_frame.png`, `l5_demo_alley_frame.png` (khung 1024x1820, vùng chơi y 142–1678:
// toạ độ dưới đây = toạ độ trên demo trừ 142). Bảng vị trí design-art-level5 mục 6 (khi Art ghi) thắng DEF.
const DEF = {
  // Sân sau: chân hàng rào y 872.
  // D5-17: món đã có ảnh thật chỉnh theo so-demo (match trong play_harness, sai lệch ≤ 2px).
  l5_cafe_window: [257, 774], l5_cafe_window_back: [257, 774], l5_cafe_window_frame: [257, 774], sua_press_window: [248, 747], // chân trước tì lên bậu (mặt bậu y 731), như demo
  l5_vanity_table: [711, 1029], l5_mirror_small: [720, 821], l5_trash_bag_idle: [207, 1059], l5_cardboard_box: [471, 1244],
  l5_tin_lid: [729, 1277], l5_slippers: [186, 1270], player_call: [720, 1250],
  l5_clothesline: [733, 292], l5_shirt: [687, 311], l5_clothespin: [714, 297], l5_wind_chime: [489, 382],
  l5_doorstep: [950, 1100], l5_cactus_pot: [942, 1035],
  // Hẻm: chân tường y 860.
  l5_crow_idle: [322, 270], l5_crow_far: [760, 258], l5_awning_down: [508, 269], l5_awning_cord: [856, 448],
  l5_sunbeam: [218, 1040], l5_cd_hanging: [145, 535], l5_gecko: [334, 528], l5_milk_can: [716, 607],
  // Ảnh xe ba gác và xe đạp neo ở đáy bánh sau (A5-12), không ở giữa khung.
  l5_cart: [467, 1132], mun_eyes_dark: [690, 1078], mun_peek_out: [698, 1135], l5_drain_pipe: [972, 1098],
  l5_puddle: [167, 1106],
  // G5-22 (chủ dự án): xe đạp nhỏ lại ×0,85 so với demo quanh điểm giữa đáy cũ (667, 940), vẫn đứng sau xe ba gác:
  // neo bánh sau = 667 − 353/2 + 73 (phần vẽ rộng 353, neo cách mép trái 73).
  l5_bike: [564, 940], l5_bike_wheel: [780, 880],
};
const ROOM = {
  l5_crow_idle: ALLEY, l5_crow_far: ALLEY, l5_awning_down: ALLEY, l5_awning_cord: ALLEY, l5_sunbeam: ALLEY, l5_cart: ALLEY,
  l5_cd_hanging: ALLEY, mun_eyes_dark: ALLEY, mun_peek_out: ALLEY, l5_drain_pipe: ALLEY,
  l5_bike: ALLEY, l5_bike_wheel: ALLEY, l5_puddle: ALLEY, l5_gecko: ALLEY, l5_milk_can: ALLEY,
};
// Bề rộng phần vẽ đo trên demo (dự phòng cột "Rộng demo" của bảng vị trí); trạng thái cùng nhóm co theo key đầu nhóm.
const FIT = {
  l5_vanity_table: 368, l5_mirror_small: 157, l5_trash_bag_idle: 282, l5_cardboard_box: 337, l5_tin_lid: 174,
  l5_slippers: 218, l5_cactus_pot: 107, l5_shirt: 150, l5_wind_chime: 60, l5_clothespin: 12,
  l5_crow_idle: 98, l5_puddle: 165, l5_gecko: 57, l5_milk_can: 72, l5_cd_hanging: 80,
  l5_tin_lid_placed: 130, l5_mirror_placed: 90, l5_cd_placed: 92, l5_light_spot: 106,
  // A5-13: cỡ Mun chọn để mắt bằng nhau ở mọi tư thế.
  mun_peek_out: 106, mun_pin_light: 160, mun_eyes_dark: 57, mun_paw_reach: 150, mun_run: 240, mun_pounce: 220, mun_look_paw: 194,
  sua_press_window: 205, l5_cafe_window: 386, l5_cafe_window_back: 386, l5_awning_down: 757, l5_cart: 536,
  l5_bike: 353, // G5-22: Art vẽ xe đạp đúng cỡ demo (rộng 415), game thu ×0,85; bánh trước co cùng tỉ lệ (FIT_HEAD)
};
// Món co theo chiều cao phần vẽ đo trên demo (A5-12: ống nước cao 936).
const FIT_H = { l5_drain_pipe: 936, l5_sunbeam: 700 }; // mun_held: không co riêng, cắt cùng cỡ sua_held (A5-15) // dải nắng cao 700 từ mép bạt xuống A (A5-13)
const SUNBEAM_ALPHA = 0.6;                            // A5-13: ảnh dải nắng đặc, code cho trong
// Chỗ đốm sáng trên mu bàn chân trái giơ lên của `mun_look_paw` (px trên ảnh thật 307x301, A5-13).
const LOOK_PAW_SPOT = [170, 182];
const HELD_PIT = 0.43;                                // nách Mun trên ảnh `mun_held` (tỉ lệ chiều cao), như `sua_held` neo ở nách
const FIT_HEAD = { l5_trash_bag_after: 'l5_trash_bag_idle', l5_slippers_flipped: 'l5_slippers', l5_crow_far: 'l5_crow_idle',
  l5_bike_wheel: 'l5_bike', l5_awning_rolled: 'l5_awning_down', l5_awning_cord: 'l5_awning_down', l5_cafe_window_frame: 'l5_cafe_window_back' };
const GECKO_UP = [333, 400];                          // thạch sùng chạy vụt lên đây (sát dưới bạt)
// Nối tia (G5-5), toạ độ phòng hẻm (demo): A đất trong vệt nắng dưới đầu trái bạt; B bậu tường giữa hẻm (gương đứng trên bậu);
// C giỏ xe đạp (đĩa gác trong giỏ, đáy ảnh = miệng giỏ); F ngay trước gầm xe ba gác, dưới khung xanh bên phải.
// Tia A→B, B→C không cắt gì; tia từ đĩa (C) vẽ SAU thùng xe ba gác (G5-17).
const PTS = [[220, 978], [511, 586], [794, 722]]; // D5-19: A, B chỉnh theo so-demo ảnh thật nắp thiếc, gương
const PLACE_Y = [1040, 645, 760];                     // đáy đồ đặt ở A (đất), B (mặt bậu), C (miệng giỏ)
const FRONT = [800, 1122];
const LEDGE = { x: 388, y: 640, w: 232, h: 32 };       // bậu tường (vẽ trong nền hẻm), đồ đặt ở B đứng trên bậu
const HIT = 110;                                      // thả đồ cách đốm sáng ≤ 110px là trúng
const GAP = { x: 520, y: 1050, w: 270, h: 55 };       // vùng tối dưới thùng xe ba gác (Mun nấp ở đây)
const SPECKS = [[150, 930], [320, 960], [280, 1080], [110, 1190], [430, 1190], [880, 1180]]; // chấm nắng li ti lọt qua lỗ bạt
// Cảnh lộ diện (G5-22, chủ dự án: "ánh sáng chạy quanh phía dưới khu vực map còn trống hơn, bên dưới xe ba gác"):
// đốm sáng từ F xuống khoảng sàn trống dưới xe ba gác, chạy đúng 2 vòng elip (x 370–830, y 1175–1255), Mun đuổi; hết vòng 2
// là vồ đè luôn ở điểm thấp nhất (600, 1255), đáy Mun y 1295 (khung 9:16: thanh túi đồ bắt đầu ≈ y 1300).
// Mỗi vòng 1 giây; Mun ra tới lúc đè ≈ 2,7 giây.
const LOOP = { x: 600, y: 1215, rx: 230, ry: 40, ms: 2000, lead: 450 };
const MUN_FOOT = 40;                                  // đáy Mun thấp hơn đốm sáng (Mun chạy trên mặt đất, đốm sáng dưới chân)
// Đồ sáng: key trong túi → key lúc đặt (dựng nghiêng ở điểm nối tia).
const SHINY = { l5_mirror_small: 'l5_mirror_placed', l5_tin_lid: 'l5_tin_lid_placed', l5_cd_hanging: 'l5_cd_placed' };
const SHINY_ROOM = { l5_mirror_small: YARD, l5_tin_lid: YARD, l5_cd_hanging: ALLEY };
const ORDER = ['l5_tin_lid', 'l5_mirror_small', 'l5_cd_hanging']; // G5-12: A chỉ nhận nắp thiếc, B gương, C đĩa CD
// Âm thanh chưa có: mượn tiếng gần giống có sẵn.
const SFX_ALIAS = {
  mun_sfx_scamper: 'sfx_cloth', l5_sfx_glass_ting: 'sfx_clink', l5_sfx_plastic: 'sfx_leaves', l5_sfx_canvas_flap: 'sfx_cloth_drop',
  mun_sfx_hiss_tiny: 'sua_sfx_chirp', l5_sfx_crow: 'l1_sfx_cuckoo', mun_sfx_meow: 'sua_sfx_meow', mun_sfx_meow_cute: 'sua_sfx_meow_cute',
  l5_sfx_pop: 'sfx_pop_can', l5_sfx_wind: 'sfx_cloth', l5_sfx_chime: 'sfx_sparkle', l5_sfx_flop: 'sfx_cushion_soft',
  l5_sfx_bike_bell: 'l3_sfx_doorbell', l5_sfx_splash: 'sfx_drop', l5_sfx_gecko: 'sua_sfx_blep', l5_sfx_can_clunk: 'l3_sfx_clack',
};

// ---------- khối có nhãn (canvas) ----------
const C = { brown: '#6b4a3a', cream: '#fdf6e8', kraft: '#d9a86c', wood: '#d6a472', black: '#2a2626', dark: '#3d3838', gold: '#f7d23e',
  sky: '#b8daf2', pink: '#f8c6cc', mint: '#b9ddbe', gray: '#b8b2aa', canvas: '#e98a7a', sun: 'rgba(255,236,150,0.55)', white: '#ffffff',
  tin: '#c9d3dc', glass: '#e6f4fb' };
function rr(c, x, y, w, h, fill, r = 12, stroke = C.brown, lw = 4) {
  c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = fill; c.fill();
  if (stroke) { c.lineWidth = lw; c.strokeStyle = stroke; c.stroke(); }
}
function el(c, cx, cy, rx, ry, fill, stroke = C.brown, lw = 4) {
  c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = fill; c.fill();
  if (stroke) { c.lineWidth = lw; c.strokeStyle = stroke; c.stroke(); }
}
// Mèo đen khối: thân elip, đầu tròn, tai tam giác, mắt vàng.
function blackCat(c, cx, cy, s, eyes = true) {
  el(c, cx, cy + 40 * s, 80 * s, 50 * s, C.black, null);
  el(c, cx, cy - 25 * s, 48 * s, 42 * s, C.black, null);
  c.fillStyle = C.black; c.beginPath();
  c.moveTo(cx - 44 * s, cy - 40 * s); c.lineTo(cx - 34 * s, cy - 90 * s); c.lineTo(cx - 10 * s, cy - 60 * s);
  c.moveTo(cx + 44 * s, cy - 40 * s); c.lineTo(cx + 34 * s, cy - 90 * s); c.lineTo(cx + 10 * s, cy - 60 * s); c.fill();
  if (eyes) { el(c, cx - 18 * s, cy - 28 * s, 11 * s, 13 * s, C.gold, null); el(c, cx + 18 * s, cy - 28 * s, 11 * s, 13 * s, C.gold, null); }
}
// Đồ sáng dựng nghiêng (lúc đặt ở điểm nối tia).
const placed = (name, draw) => [124, 120, 'đáy', (c, w, h) => {
  c.save(); c.translate(w / 2, h - 8); c.rotate(-0.35); draw(c); c.restore();
}];
const kid = (name, color) => [300, 440, 'đáy', (c, w, h) => {
  rr(c, w / 2 - 70, 170, 140, 190, color, 30); rr(c, w / 2 - 60, 350, 120, 86, C.sky, 16);
  el(c, w / 2, 110, 70, 72, '#f6dcc4');
}];
const bg = (wall, ground, groundY, extra) => [1024, 1536, 'bg', (c) => {
  c.fillStyle = wall; c.fillRect(0, 0, 1024, groundY);
  c.fillStyle = ground; c.fillRect(0, groundY, 1024, 1536 - groundY);
  c.strokeStyle = 'rgba(107,74,58,0.25)'; c.lineWidth = 3;
  for (let y = groundY + 70; y < 1536; y += 90) { c.beginPath(); c.moveTo(0, y); c.lineTo(1024, y); c.stroke(); }
  if (extra) extra(c);
}];

// Ảnh tạm: [rộng, cao, neo ('bg' | 'đáy' | 'đỉnh' | 'tâm' | [ax, ay] px), hàm vẽ (ctx, w, h)]. Cỡ = cỡ hiển thị.
const FB = {
  l5_bg_backyard: bg('#f6e3cf', '#e8d2b0', 872, (c) => {
    c.fillStyle = '#dbe9f3'; c.fillRect(0, 0, 1024, 355);                                    // trời
    c.fillStyle = '#f2e0b8'; c.fillRect(0, 355, 1024, 517);                                  // hàng rào gỗ
    c.strokeStyle = 'rgba(107,74,58,0.35)'; c.lineWidth = 3;
    for (let x = 0; x < 1024; x += 64) { c.beginPath(); c.moveTo(x, 355); c.lineTo(x, 872); c.stroke(); }
    c.fillStyle = '#9a6a3e'; c.fillRect(480, 262, 20, 610); c.fillRect(965, 262, 20, 610);    // hai cột dây phơi
    rr(c, 890, 362, 140, 488, '#d6a472', 4); // cửa sau quán
    rr(c, 880, 850, 150, 40, '#e9dfd2', 4);                                                    // bậc cửa trên
  }),
  l5_bg_alley: bg('#f7e3c8', '#cfc8bf', 860, (c) => {
    c.fillStyle = '#cfe6f5'; c.fillRect(0, 0, 1024, 285);                                    // trời
    c.strokeStyle = C.dark; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 220); c.quadraticCurveTo(512, 320, 1024, 222); c.stroke(); // dây điện
    c.fillStyle = 'rgba(232,150,150,0.35)';                                                  // gạch rải rác
    [[30, 380], [80, 420], [120, 620], [80, 650], [0, 760], [390, 400], [430, 430], [240, 700], [300, 740], [810, 490], [850, 460], [990, 660]]
      .forEach(([x, y]) => c.fillRect(x, y, 70, 26));
    c.fillStyle = '#d8cfc4'; c.fillRect(0, 860, 1024, 52);                                    // bờ chân tường
    c.strokeStyle = C.dark; c.lineWidth = 6; c.beginPath(); c.arc(145, 512, 14, Math.PI, 0, true); c.stroke(); // móc treo CD
    rr(c, LEDGE.x, LEDGE.y, LEDGE.w, LEDGE.h, '#e8c89a', 4);                                 // bậu tường (điểm B)
    rr(c, 605, 440, 192, 153, '#bcdcf2', 6); c.fillStyle = C.wood; c.fillRect(698, 440, 6, 153); c.fillRect(605, 520, 192, 6); // cửa sổ hẻm
    rr(c, 598, 590, 210, 25, '#e8c89a', 4);                                                   // bậu cửa sổ (ống bơ đứng ở đây)
  }),
  // Cửa sổ quán tách 2 lớp (Art, design-art-level5 mục 2): kính + trong quán (sau Sữa), khung + bậu + thanh ngang (trước Sữa).
  l5_cafe_window_back: [386, 396, 'đáy', (c, w, h) => {
    rr(c, 26, 22, w - 52, h - 56, '#cfe6f5', 6, null);
    c.fillStyle = 'rgba(214,170,120,0.3)'; c.fillRect(26, h * 0.45, w - 52, h * 0.55 - 34);   // trong quán hơi tối ấm
  }],
  l5_cafe_window_frame: [386, 396, 'đáy', (c, w, h) => {
    c.fillStyle = C.wood; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 12); c.rect(32, 27, w - 64, 335); c.fill('evenodd');
    c.lineWidth = 4; c.strokeStyle = C.brown; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 12); c.stroke(); c.strokeRect(32, 27, w - 64, 335);
    rr(c, 32, 162, w - 64, 12, C.wood, 2);                                               // thanh ngang (y ≈ 578), trên đầu Sữa
  }],
  sua_press_window: [205, 160, 'đáy', (c, w, h) => { // cỡ theo demo: đầu và hai chân áp lên bậu cửa sổ
    el(c, w / 2, 72, 78, 64, C.cream); el(c, w / 2 - 50, h - 14, 24, 12, C.cream); el(c, w / 2 + 50, h - 14, 24, 12, C.cream);
    el(c, w / 2 - 26, 72, 8, 10, C.brown, null); el(c, w / 2 + 26, 72, 8, 10, C.brown, null);
  }],
  l5_vanity_table: [320, 250, 'đáy', (c, w, h) => {
    rr(c, 6, 6, w - 12, 50, C.pink, 10); rr(c, 24, 50, 30, h - 56, C.wood, 6); rr(c, w - 54, 50, 30, h - 56, C.wood, 6);
    rr(c, 60, 60, w - 120, 90, '#f3d9cf', 8);
  }],
  l5_mirror_small: [110, 150, 'đáy', (c, w, h) => {
    el(c, w / 2, 58, 46, 54, C.glass); rr(c, w / 2 - 8, 110, 16, 30, C.wood, 4); rr(c, 20, h - 14, w - 40, 12, C.wood, 4);
  }],
  l5_tin_lid: [110, 110, 'đáy', (c, w, h) => {
    c.save(); c.translate(w / 2, h - 6); c.rotate(-0.25); el(c, 0, -50, 46, 50, C.tin); el(c, 0, -50, 30, 33, '#dfe7ee', 'rgba(107,74,58,0.4)', 2); c.restore();
  }],
  l5_cd_hanging: [80, 110, 'đỉnh', (c, w, h) => { // G5-7: treo trên móc tường bên trái hẻm
    c.strokeStyle = C.dark; c.lineWidth = 6; c.beginPath(); c.arc(w / 2, 10, 8, Math.PI, 0, true); c.stroke();  // móc
    c.strokeStyle = C.brown; c.lineWidth = 3; c.beginPath(); c.moveTo(w / 2, 10); c.lineTo(w / 2, 34); c.stroke();
    el(c, w / 2, 70, 34, 34, '#e9eef7'); el(c, w / 2, 70, 9, 9, '#c4cbd6', C.brown, 2);
  }],
  l5_mirror_placed: placed('Gương', (c) => el(c, 0, -52, 34, 44, C.glass)),
  l5_tin_lid_placed: placed('Nắp', (c) => el(c, 0, -46, 40, 42, C.tin)),
  l5_cd_placed: placed('CD', (c) => { el(c, 0, -46, 38, 38, '#e9eef7'); el(c, 0, -46, 9, 9, '#c4cbd6', C.brown, 2); }),
  l5_cardboard_box: [270, 200, 'đáy', (c, w, h) => {
    rr(c, 6, 40, w - 12, h - 46, C.kraft, 8);
    c.fillStyle = '#c99358'; c.beginPath(); c.moveTo(6, 40); c.lineTo(40, 6); c.lineTo(130, 40); c.fill();
    c.beginPath(); c.moveTo(w - 6, 40); c.lineTo(w - 40, 6); c.lineTo(w - 130, 40); c.fill();
  }],
  l5_trash_bag_idle: [210, 190, 'đáy', (c, w, h) => {
    el(c, w / 2, h / 2 + 15, w / 2 - 8, h / 2 - 22, C.dark); el(c, w / 2, 22, 22, 16, C.dark);
  }],
  l5_trash_bag_after: [220, 130, 'đáy', (c, w, h) => {
    el(c, w / 2, h / 2 + 10, w / 2 - 8, h / 2 - 16, C.dark); el(c, w / 2, 26, 40, 14, '#5a5454');
  }],
  l5_awning_down: [757, 170, 'đỉnh', (c, w, h) => {
    rr(c, 4, 4, w - 8, h - 8, C.canvas, 6);
    c.fillStyle = 'rgba(255,255,255,0.4)'; for (let x = 40; x < w; x += 100) c.fillRect(x, 4, 46, h - 8);
    c.fillStyle = '#fff6c8'; [[110, 120], [260, 60], [420, 130], [580, 80], [190, 40]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 6, 0, Math.PI * 2); c.fill(); }); // lỗ thủng
  }],
  l5_awning_rolled: [757, 140, 'đỉnh', (c, w, h) => { // A5-11: bạt cuộn có luôn đoạn dây ngắn có vòng ở đầu phải (như demo)
    rr(c, 4, 4, w - 8, 50, C.canvas, 24);
    c.strokeStyle = '#8a6a4a'; c.lineWidth = 4; c.beginPath(); c.moveTo(728, 54); c.lineTo(728, 112); c.stroke();
    c.beginPath(); c.arc(728, 124, 11, 0, Math.PI * 2); c.lineWidth = 6; c.strokeStyle = '#c98a3a'; c.stroke();
  }],
  l5_awning_cord: [44, 96, 'đỉnh', (c, w, h) => {
    c.strokeStyle = '#8a6a4a'; c.lineWidth = 4; c.beginPath(); c.moveTo(w / 2, 0); c.lineTo(w / 2, h - 30); c.stroke();
    c.beginPath(); c.arc(w / 2, h - 16, 12, 0, Math.PI * 2); c.lineWidth = 6; c.strokeStyle = '#c98a3a'; c.stroke();
  }],
  l5_sunbeam: [160, 702, 'đáy', (c, w, h) => { // G5-9: dải hẹp từ mép bạt xuống A
    c.fillStyle = 'rgba(255,236,150,0.42)'; c.beginPath();
    c.moveTo(w / 2 - 22, 0); c.lineTo(w / 2 + 22, 0); c.lineTo(w - 4, h - 34); c.lineTo(4, h - 34); c.fill();
    el(c, w / 2, h - 34, w / 2 - 4, 30, C.sun, 'rgba(230,190,90,0.9)', 3);
  }],
  l5_light_spot: [96, 96, 'tâm', (c, w, h) => {
    const g = c.createRadialGradient(w / 2, h / 2, 6, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,240,1)'); g.addColorStop(0.42, 'rgba(255,246,190,0.95)'); g.addColorStop(1, 'rgba(255,240,170,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  }],
  l5_cart: [537, 245, 'đáy', (c, w, h) => {
    c.fillStyle = '#3a2e28'; c.fillRect(152, 150, 270, 62);                                   // gầm tối (nâu than)
    c.strokeStyle = '#4f86c6'; c.lineWidth = 9; c.beginPath(); c.moveTo(10, 154); c.lineTo(440, 154); c.lineTo(490, 169); c.moveTo(440, 154);
    c.lineTo(407, 70); c.moveTo(490, 169); c.lineTo(510, 30); c.lineTo(527, 20); c.stroke();                          // khung xanh, ghi đông
    rr(c, 380, 52, 56, 16, '#8a5a3a', 8, null);                                                // yên
    rr(c, 2, 2, 364, 157, '#e2b277', 8);                                                       // thùng gỗ
    c.strokeStyle = 'rgba(107,74,58,0.45)'; c.lineWidth = 3; [52, 104].forEach((y) => { c.beginPath(); c.moveTo(4, y); c.lineTo(364, y); c.stroke(); });
    el(c, 104, 179, 63, 63, 'rgba(0,0,0,0)', C.dark, 9); el(c, 104, 179, 8, 8, C.dark, null);  // bánh lớn
    el(c, 490, 169, 43, 43, 'rgba(0,0,0,0)', C.dark, 7); el(c, 490, 169, 6, 6, C.dark, null);  // bánh nhỏ
  }],
  l5_crow_idle: [110, 100, 'đáy', (c, w, h) => {
    el(c, w / 2, h / 2 + 8, 44, 38, C.black, null); el(c, w / 2 + 30, 26, 20, 18, C.black, null);
    c.fillStyle = C.gold; c.beginPath(); c.moveTo(w / 2 + 48, 24); c.lineTo(w - 2, 30); c.lineTo(w / 2 + 48, 34); c.fill();
  }],
  l5_crow_far: [90, 85, 'đáy', (c, w, h) => {
    el(c, w / 2, h / 2 + 6, 36, 32, C.black, null); el(c, w / 2 - 24, 22, 17, 15, C.black, null);
  }],
  l5_drain_pipe: [56, 935, 'đáy', (c, w, h) => {
    rr(c, 8, 4, w - 16, h - 50, '#a9c6d8', 8); rr(c, 2, h - 60, w - 4, 56, '#a9c6d8', 8);
  }],
  mun_eyes_dark: [130, 56, 'tâm', (c, w, h) => {
    el(c, w / 2 - 28, h / 2, 16, 18, C.gold, null); el(c, w / 2 + 28, h / 2, 16, 18, C.gold, null);
    el(c, w / 2 - 28, h / 2, 5, 13, C.black, null); el(c, w / 2 + 28, h / 2, 5, 13, C.black, null);
  }],
  mun_paw_reach: [150, 54, [0, 27], (c, w, h) => {
    rr(c, 0, 12, w - 40, 30, C.black, 14, null); el(c, w - 34, h / 2, 30, 24, C.black, null);
  }],
  mun_peek_out: [150, 110, 'đáy', (c, w, h) => {
    el(c, w / 2, h - 40, 58, 46, C.black, null);
    c.fillStyle = C.black; c.beginPath();
    c.moveTo(w / 2 - 54, h - 60); c.lineTo(w / 2 - 44, 4); c.lineTo(w / 2 - 14, h - 80);
    c.moveTo(w / 2 + 54, h - 60); c.lineTo(w / 2 + 44, 4); c.lineTo(w / 2 + 14, h - 80); c.fill();
    el(c, w / 2 - 22, h - 46, 13, 15, C.gold, null); el(c, w / 2 + 22, h - 46, 13, 15, C.gold, null);
  }],
  mun_run: [220, 130, 'đáy', (c, w, h) => {
    el(c, w / 2 - 10, h - 50, 80, 36, C.black, null); el(c, w - 50, h - 78, 38, 34, C.black, null);
    rr(c, 4, h - 70, 60, 12, C.black, 6, null);
    el(c, w - 40, h - 82, 7, 8, C.gold, null); el(c, w - 22, h - 82, 7, 8, C.gold, null); // không nhãn: ảnh bị lật khi chạy sang trái
  }],
  mun_pounce: [220, 160, 'đáy', (c, w, h) => {
    c.save(); c.translate(w / 2, h - 60); c.rotate(-0.35); el(c, 0, 0, 82, 40, C.black, null); el(c, 70, -26, 36, 32, C.black, null);
    el(c, 76, -30, 7, 8, C.gold, null); el(c, 92, -30, 7, 8, C.gold, null); c.restore();
  }],
  mun_pin_light: [200, 160, 'đáy', (c, w, h) => {
    blackCat(c, w / 2, h / 2, 0.85); rr(c, w / 2 - 50, h - 22, 100, 18, C.black, 9, null);
  }],
  mun_look_paw: [190, 210, 'đáy', (c, w, h) => {
    blackCat(c, w / 2, h / 2 + 10, 0.95); rr(c, w / 2 + 30, h / 2 - 10, 26, 60, C.black, 12, null);
  }],
  mun_held: [260, 320, [130, 134], (c, w, h) => {
    blackCat(c, w / 2, h / 2 - 20, 1.25); rr(c, w / 2 - 60, h - 110, 120, 100, C.black, 40, null);
  }],
  mun_face_icon: [300, 300, 'tâm', (c, w, h) => { // chỉ phần đầu: đầu tròn, tai to, mắt vàng to
    el(c, w / 2, h / 2 + 30, 120, 105, C.black, null);
    c.fillStyle = C.black; c.beginPath();
    c.moveTo(w / 2 - 115, h / 2); c.lineTo(w / 2 - 95, 10); c.lineTo(w / 2 - 25, h / 2 - 60);
    c.moveTo(w / 2 + 115, h / 2); c.lineTo(w / 2 + 95, 10); c.lineTo(w / 2 + 25, h / 2 - 60); c.fill();
    el(c, w / 2 - 45, h / 2 + 20, 26, 30, C.gold, null); el(c, w / 2 + 45, h / 2 + 20, 26, 30, C.gold, null);
    el(c, w / 2 - 45, h / 2 + 20, 8, 22, C.black, null); el(c, w / 2 + 45, h / 2 + 20, 8, 22, C.black, null);
  }],
  // Bong bóng nhân vật: mặt trời bị mây che (chỉ code, không có ảnh riêng trong đặc tả).
  l5_icon_sun_covered: [120, 100, 'tâm', (c, w, h) => {
    el(c, 46, 42, 30, 30, C.gold, '#d9a520', 3);
    for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; c.strokeStyle = '#d9a520'; c.lineWidth = 4; c.beginPath(); c.moveTo(46 + 38 * Math.cos(a), 42 + 38 * Math.sin(a)); c.lineTo(46 + 46 * Math.cos(a), 42 + 46 * Math.sin(a)); c.stroke(); }
    el(c, 70, 70, 40, 22, '#cfd6de', '#8a96a3', 3); el(c, 52, 64, 22, 18, '#cfd6de', null); el(c, 84, 58, 22, 18, '#cfd6de', null);
  }],
  player_cover_nose: kid('bịt mũi', '#fde3a7'),
  // ---------- đồ thêm (G5-11) ----------
  l5_doorstep: [150, 80, 'đáy', (c, w, h) => { rr(c, 2, 2, w - 4, h - 4, '#e9dfd2', 6); }],
  l5_cactus_pot: [90, 130, 'đáy', (c, w, h) => {
    rr(c, 32, 10, 26, 80, '#8fc28a', 12); rr(c, 14, 36, 18, 30, '#8fc28a', 9); rr(c, 58, 30, 18, 30, '#8fc28a', 9);
    rr(c, 14, 84, w - 28, 44, '#d98a5a', 6);
  }],
  l5_cactus_flower: [34, 30, 'đáy', (c, w, h) => { el(c, w / 2, h / 2, 14, 12, '#f59ab8', '#c75a80', 2); el(c, w / 2, h / 2, 5, 5, C.gold, null); }],
  l5_clothesline: [485, 24, 'tâm', (c, w, h) => { c.strokeStyle = '#8a6a4a'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 4); c.quadraticCurveTo(w / 2, 22, w, 4); c.stroke(); }],
  l5_shirt: [150, 140, 'đỉnh', (c, w, h) => {
    c.fillStyle = '#b9ddbe'; c.strokeStyle = C.brown; c.lineWidth = 4; c.beginPath();
    c.moveTo(40, 4); c.lineTo(110, 4); c.lineTo(146, 34); c.lineTo(124, 56); c.lineTo(112, 46); c.lineTo(112, 136); c.lineTo(38, 136);
    c.lineTo(38, 46); c.lineTo(26, 56); c.lineTo(4, 34); c.closePath(); c.fill(); c.stroke();
  }],
  l5_clothespin: [16, 34, 'đỉnh', (c, w, h) => { rr(c, 2, 2, w - 4, h - 4, '#d6a472', 4, C.brown, 2); }],
  l5_wind_chime: [70, 150, 'đỉnh', (c, w, h) => {
    c.strokeStyle = C.brown; c.lineWidth = 3; c.beginPath(); c.moveTo(w / 2, 0); c.lineTo(w / 2, 24); c.stroke();
    el(c, w / 2, 30, 28, 9, '#d6a472', C.brown, 2);
    [14, 28, 42, 56].forEach((x, i) => { c.beginPath(); c.moveTo(x, 34); c.lineTo(x, 60 + (i % 2) * 12); c.stroke(); rr(c, x - 4, 60 + (i % 2) * 12, 8, 46, '#c9d3dc', 3, C.brown, 2); });
  }],
  l5_slippers: [120, 50, 'đáy', (c, w, h) => {
    rr(c, 4, 10, 52, 36, '#7fb3d5', 16); rr(c, 62, 8, 52, 38, '#7fb3d5', 16);
  }],
  l5_slippers_flipped: [130, 60, 'đáy', (c, w, h) => {
    rr(c, 2, 26, 46, 30, '#5d93b8', 14); rr(c, 52, 14, 46, 30, '#5d93b8', 14); rr(c, 80, 30, 46, 26, '#e8d2a8', 6);
  }],
  l5_bike: [353, 213, 'đáy', (c, w, h) => {
    c.strokeStyle = '#ef9aa0'; c.lineWidth = 9; c.beginPath();
    c.moveTo(68, 143); c.lineTo(132, 150); c.lineTo(110, 52); c.moveTo(132, 150); c.lineTo(230, 70); c.lineTo(289, 153); c.moveTo(110, 70); c.lineTo(230, 70); c.stroke();
    c.lineWidth = 7; c.strokeStyle = C.dark; c.beginPath(); c.arc(68, 143, 61, 0, Math.PI * 2); c.stroke();                 // bánh sau
    el(c, 289, 153, 6, 6, C.dark, null);                                                                                   // trục bánh trước
    c.strokeStyle = '#9aa3ad'; c.lineWidth = 6; c.beginPath(); c.moveTo(230, 70); c.lineTo(240, 18); c.lineTo(200, 10); c.stroke(); // ghi đông
    el(c, 244, 16, 8, 8, C.gold, C.brown, 2);                                                                              // chuông
    rr(c, 80, 32, 64, 18, '#7a4a32', 9, null);                                                                             // yên
    rr(c, 257, 31, 94, 61, '#d9b98a', 6, C.brown, 3);                                                                      // giỏ mây (điểm C)
    c.strokeStyle = C.brown; c.lineWidth = 1.5; for (let x = 267; x < 350; x += 10) { c.beginPath(); c.moveTo(x, 33); c.lineTo(x, 90); c.stroke(); }
  }],
  l5_bike_wheel: [124, 124, 'tâm', (c, w, h) => {
    c.strokeStyle = C.dark; c.lineWidth = 7; c.beginPath(); c.arc(w / 2, h / 2, 58, 0, Math.PI * 2); c.stroke();
    c.lineWidth = 2; for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; c.beginPath(); c.moveTo(w / 2, h / 2); c.lineTo(w / 2 + 56 * Math.cos(a), h / 2 + 56 * Math.sin(a)); c.stroke(); }
    c.strokeStyle = '#c75a50'; c.lineWidth = 6; c.beginPath(); c.moveTo(w / 2, h / 2); c.lineTo(w / 2 + 56, h / 2); c.stroke(); // nan đỏ để thấy bánh quay
  }],
  l5_puddle: [150, 44, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 4, h / 2 - 4, '#a9c6d8', '#7f9db0', 3); }],
  l5_gecko: [60, 120, 'tâm', (c, w, h) => {
    c.strokeStyle = '#4a3a30'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(w / 2, 58); c.quadraticCurveTo(w - 4, 92, w / 2 - 6, h - 6); c.stroke();
    el(c, w / 2, 40, 13, 24, '#4a3a30', null); el(c, w / 2, 14, 10, 11, '#4a3a30', null);
    [[16, 30], [44, 30], [16, 54], [44, 54]].forEach(([x, y]) => el(c, x, y, 6, 4, '#4a3a30', null));
  }],
  l5_milk_can: [50, 70, 'đáy', (c, w, h) => { rr(c, 4, 6, w - 8, h - 8, '#e8eef2', 8); rr(c, 4, 20, w - 8, 26, '#f2b8a0', 2, null); }],
};

export class Level5 extends RoomsLevel {
  constructor() { super('Level5'); }

  get levelNo() { return 5; }
  get rewardFish() { return 50 + 5 * this.secrets; }
  get defaultPos() { return DEF; }
  get fitHead() { return FIT_HEAD; }
  get bagTapFeedback() { return false; }
  get bagLandHop() { return false; }

  get fallbacks() { return FB; }
  get fallbackCanvas() { return true; } // khối màu (bản khối): vẽ bằng canvas 2D
  get roomBgs() { return ['l5_bg_backyard', 'l5_bg_alley']; } // sân sau ⇄ hẻm
  get roomOf() { return ROOM; }
  // Bản đồ mini: sân = bàn trang điểm, hẻm = xe ba gác (tạm, tới khi Art vẽ ui_map_yard / ui_map_alley).
  get roomIcons() { return [['ui_map_yard', 'l5_vanity_table'], ['ui_map_alley', 'l5_cart']]; }
  get suaHand() { return false; }
  // Bong bóng nhiệm vụ mở màn nảy mạnh hơn (0 → 1,3 → 1).
  get bubblePop() { return { peak: 1.3, up: 260, rest: 1, down: 160 }; }

  sfx(key, gain = 1) { super.sfx(this.cache.audio.exists(key) ? key : SFX_ALIAS[key] || key, gain); }

  resetLevel() {
    const A = this.A;
    A.fit = A.fit || {};
    if (!A.fit[5] || !Object.keys(A.fit[5]).length) A.fit[5] = { ...FIT }; // chưa có cột "Rộng demo" trong design-art: dùng số đo demo
    Object.assign(this, { room: YARD, moving: false, secrets: 0, taught: {}, arrowPulse: null, got: {},
      boxDone: false, metMun: false, rolled: false, step: 0, chased: false, trashDone: false, pipeDone: false, crowFar: false, slipDone: false, canDone: false, geckoUp: false,
      eyesAway: false, munStage: 'eyes', pawOut: false, trail: [], chaseOn: false, rays: [], spotAt: null, cordAmp: 4, spotAmp: 3,
      blinkEv: null, eyesEv: null, thinkB: null, thinkIcon: null, specks: [], dark: null, pawDone: null });
    this.debug = new URLSearchParams(location.search).get('debug') === '1';
    // Ảnh `mun_held` neo đỉnh (A5-13); cảnh bế chung cần neo ở nách (điểm hai tay nắm), như `sua_held`.
    const he = A.entries.mun_held;
    if (he && he.real && this.textures.exists('mun_held') && he.ay < 30) {
      const src = this.textures.get('mun_held').getSourceImage();
      Object.assign(he, { ax: src.width / 2, ay: Math.round(src.height * HELD_PIT) });
    }
  }

  // Như base, thêm co theo chiều cao phần vẽ cho món trong FIT_H.
  applyKey(s, key) {
    super.applyKey(s, key);
    const fh = FIT_H[key];
    if (fh && this.textures.exists(key) && s.key === key) {
      s.base = s.baseY = fh / this.textures.get(key).get(this.iconFrame(key)).cutHeight;
      s.setScale(s.base);
    }
    return s;
  }

  shinyInBag() { return this.bag ? this.bag.items.filter((o) => o && SHINY[o.key]) : []; }

  // ---------- dựng hai phòng ----------
  buildRoom() {
    this.buildRoomBgs(); // nền thật cao 1024x2304 (G5-21): rooms.js đặt lệch cho vùng chơi khớp y 0–1536
    this.makeFallback('l5_icon_sun_covered');
    const P = (k) => this.P(k);

    // Sân sau: nền → cửa sổ quán (+ Sữa) → bàn trang điểm + gương → thùng giấy + nắp thiếc → túi rác → giao diện.
    // A5-12: tạm thời Art giao cửa sổ một ảnh `l5_cafe_window` (khung + kính + trong quán), nằm dưới Sữa; có _back/_frame thì dùng 2 lớp.
    const real = (k) => (this.A.entries[k] || {}).real;
    const oneWindow = real('l5_cafe_window') && !real('l5_cafe_window_back');
    this.window = this.img(oneWindow ? 'l5_cafe_window' : 'l5_cafe_window_back', ...P('l5_cafe_window_back'), 5);
    this.suaWin = this.img('sua_press_window', ...P('sua_press_window'), 6);
    this.windowFrame = this.img('l5_cafe_window_frame', ...P('l5_cafe_window_frame'), 6.5).setVisible(!oneWindow); // trên Sữa: bậu che đáy Sữa
    this.table = this.img('l5_vanity_table', ...P('l5_vanity_table'), 10);
    this.mirror = this.img('l5_mirror_small', ...P('l5_mirror_small'), 11);
    this.box = this.img('l5_cardboard_box', ...P('l5_cardboard_box'), 14);
    this.lid = this.img('l5_tin_lid', ...P('l5_tin_lid'), 13);
    this.trash = this.img('l5_trash_bag_idle', ...P('l5_trash_bag_idle'), 12);
    // Dây phơi, bậc cửa: Art vẽ vào nền thật (design-art-level5 mục 1); chỉ dựng khối khi nền còn là ảnh tạm.
    const yardBgReal = (this.A.entries.l5_bg_backyard || {}).real;
    if (!yardBgReal) this.img('l5_clothesline', ...P('l5_clothesline'), 7);
    this.shirt = this.img('l5_shirt', ...P('l5_shirt'), 8);
    this.pin = this.img('l5_clothespin', ...P('l5_clothespin'), 9);
    this.chime = this.img('l5_wind_chime', ...P('l5_wind_chime'), 8);
    if (!yardBgReal) this.img('l5_doorstep', ...P('l5_doorstep'), 9);
    this.cactus = this.img('l5_cactus_pot', ...P('l5_cactus_pot'), 10);
    this.flower = this.img('l5_cactus_flower', 0, 0, 10.5).setVisible(false);
    this.slippers = this.img('l5_slippers', ...P('l5_slippers'), 13);
    this.shadow = this.img('mun_run', 0, 0, 15).setVisible(false);
    this.player = this.img('player_call', ...P('player_call'), D.player).setVisible(false);

    // Hẻm: nền → chấm nắng → vệt nắng → xe (+ gầm) → đồ đặt ở A/B/C, tia, đốm sáng (trên xe, G5-14) → Mun → ống nước → bạt → quạ.
    // Lớp tối (bóng râm) phủ cả hẻm tới khi cuộn bạt; mắt Mun, dây kéo, chấm nắng nằm trên lớp tối để vẫn nổi.
    this.sunbeam = this.img('l5_sunbeam', ...P('l5_sunbeam'), 10).setAlpha(0);
    this.rayG = this.add.graphics().setDepth(21);
    // G5-17: tia từ đĩa trong giỏ xe đạp (sát tường, xa hơn xe ba gác) vẽ SAU thùng xe ba gác (trên xe đạp, dưới xe ba gác):
    // lúc đốm sáng ở đất bên trái xe, tia đi sau thùng xe rồi ló ra ở mép trái.
    this.rayBack = this.add.graphics().setDepth(19);
    this.halo = this.add.circle(0, 0, 58, 0xfff3b0, 0.35).setDepth(21.2).setVisible(false);
    this.spot = this.img('l5_light_spot', 0, 0, 21.4).setVisible(false);
    this.cart = this.img('l5_cart', ...P('l5_cart'), 20);
    this.cd = this.img('l5_cd_hanging', ...P('l5_cd_hanging'), 21);
    this.pipe = this.img('l5_drain_pipe', ...P('l5_drain_pipe'), 24);
    this.awning = this.img('l5_awning_down', ...P('l5_awning_down'), 25);
    this.crow = this.img('l5_crow_idle', ...P('l5_crow_idle'), 26);
    this.puddle = this.img('l5_puddle', ...P('l5_puddle'), 9);
    this.gecko = this.img('l5_gecko', ...P('l5_gecko'), 11);
    this.milkCan = this.img('l5_milk_can', ...P('l5_milk_can'), 11);
    this.bike = this.img('l5_bike', ...P('l5_bike'), 15);
    this.wheel = this.img('l5_bike_wheel', ...P('l5_bike_wheel'), 15.5);
    this.dark = this.add.rectangle(ROOM_W, -1200, ROOM_W, 4000, 0x1c2230, 0.42).setOrigin(0, 0).setDepth(27);
    this.specks = SPECKS.map(([x, y], i) => {
      const s = this.add.circle(x + ROOM_W, y, 7, 0xfff3b0, 0.9).setDepth(28);
      this.tweens.add({ targets: s, alpha: 0.25, scale: 0.6, duration: 600 + i * 90, yoyo: true, repeat: -1, delay: i * 140 });
      return s;
    });
    this.cord = this.img('l5_awning_cord', ...P('l5_awning_cord'), 28);
    { // Dây dài treo ở mép dưới bạt thả, đầu phải (theo phần vẽ thật của bạt, A5-12), lệch vào trong như dây ngắn của bạt cuộn.
      const ar = this.artRect(this.awning);
      this.cord.setPosition(ar.right - (this.P('l5_awning_down')[0] + 378 - this.P('l5_awning_cord')[0]), ar.bottom - 10);
    }
    this.eyes = this.img('mun_eyes_dark', ...P('mun_eyes_dark'), 28).setVisible(false);
    this.eyesHome = [this.eyes.x, this.eyes.y];
    this.peek = this.img('mun_peek_out', ...P('mun_peek_out'), 28).setVisible(false);
    this.munPaw = this.img('mun_paw_reach', 0, 0, 28).setVisible(false); // 'paw' của base là bàn chân gợi ý 💡
    this.mun = this.img('mun_run', 0, 0, 30).setVisible(false);
    this.placedS = [];

    this.buildArrows(); // kèm bản đồ mini

    // Vùng chạm.
    this.zone('window', this.artRect(this.windowFrame.visible ? this.windowFrame : this.window), D.zone + 1);
    this.zone('table', this.artRect(this.table), D.zone + 1);
    this.zone('mirror', this.artRect(this.mirror), D.zone + 3);
    this.zone('trash', this.artRect(this.trash), D.zone + 2);
    this.zone('box', this.artRect(this.box), D.zone + 3);
    this.zone('lid', this.artRect(this.lid), D.zone + 4);
    this.zone('awning', this.artRect(this.awning), D.zone + 2);
    const cr = this.artRect(this.cord);
    this.zone('cord', new Phaser.Geom.Rectangle(cr.centerX - 70, cr.y + 40, 140, cr.height + 20), D.zone + 4);
    this.zone('crow', this.artRect(this.crow), D.zone + 3);
    this.zone('shirt', this.artRect(this.shirt), D.zone + 1);
    this.zone('chime', this.artRect(this.chime), D.zone + 3);
    this.zone('cactus', this.artRect(this.cactus), D.zone + 2);
    this.zone('slippers', this.artRect(this.slippers), D.zone + 4);
    this.zone('puddle', this.artRect(this.puddle), D.zone + 1);
    this.zone('gecko', this.artRect(this.gecko), D.zone + 3);
    this.zone('milkCan', this.artRect(this.milkCan), D.zone + 3);
    this.zone('bike', this.artRect(this.bike), D.zone + 2);
    this.zone('pipe', this.artRect(this.pipe), D.zone + 2);
    this.zone('cart', this.artRect(this.cart), D.zone + 1);
    this.zone('cd', this.artRect(this.cd), D.zone + 4);
    this.zone('eyes', this.R(ALLEY, GAP), D.zone + 3);
    this.zone('munPaw', new Phaser.Geom.Rectangle(0, 0, 120, 120), D.zone + 5).disableInteractive();
    this.arrowZones();
    if (this.debug) this.buildDebug();
  }

  // Bong bóng ở góc nảy mạnh một nhịp (thùng giấy: sắp gặp mèo mới).
  bubbleBump() {
    const B = this.bubble;
    if (B.home !== 'corner') return;
    this.tweens.chain({ targets: B.ct, tweens: [{ scale: 0.55, duration: 160, ease: 'Quad.out' }, { scale: 0.35, duration: 220, ease: 'Back.out' }] });
    this.hop(B.q, 16, 300);
    this.sfx('sfx_meow_question', 0.8);
  }

  // ---------- nhập liệu ----------
  handleLevel(name, g) {
    if (this.moving) return;
    switch (name) {
      case 'box': this.boxTap(); break;
      case 'mirror': this.pickShiny('l5_mirror_small', this.mirror, 'mirror', 'l5_sfx_glass_ting'); break;
      case 'lid': this.pickShiny('l5_tin_lid', this.lid, 'lid', 'sfx_clink'); break;
      case 'cd': this.cdTap(); break;
      case 'table': this.wiggle(this.table, 1.5, 2, 240); this.sfx('sfx_tap'); break;
      case 'trash': this.trashTap(); break;
      case 'window': this.windowTap(); break;
      case 'awning': this.awningTap(g, -1); break;
      case 'cord': this.awningTap(g, 1); break;
      case 'crow': this.crowTap(); break;
      case 'pipe': this.pipeTap(); break;
      case 'cactus': this.cactusTap(); break;
      case 'shirt': this.shirtTap(); break;
      case 'chime': this.chimeTap(); break;
      case 'slippers': this.slippersTap(); break;
      case 'bike': this.bikeTap(); break;
      case 'puddle': this.puddleTap(); break;
      case 'gecko': this.geckoTap(); break;
      case 'milkCan': this.milkCanTap(); break;
      case 'cart': case 'eyes': this.cartTap(); break;
      case 'munPaw': this.pawTapped(); break;
    }
  }

  // Lần đầu sang hẻm sau khi bóng đen chạy ra: ô Hẻm trên bản đồ nhấp nháy.
  goRoom(r) {
    if (r === this.room || this.moving) return;
    this.firstAlley = r === ALLEY && this.boxDone && !this.taught.alley;
    if (this.firstAlley) this.taught.alley = true;
    super.goRoom(r);
  }

  mapBlinkOnEnter() { return this.firstAlley; }

  onRoomEnter(r) {
    if (r === ALLEY) this.sunThought();
  }

  // (1) Thùng giấy: lần đầu rung mạnh, bóng đen vụt ra chạy sang phải (sang hẻm), mũi tên ► nhấp nháy; Mun nấp dưới gầm xe.
  boxTap() {
    if (this.boxDone) { this.wiggle(this.box, 3, 2, 240); this.sfx('sfx_tap'); return; }
    this.boxDone = true;
    this.wiggle(this.box, 9, 4, 420);
    this.time.delayedCall(250, () => {
      const r = this.artRect(this.box), s = this.shadow;
      s.setVisible(true).setPosition(r.centerX, r.bottom - 10).setAlpha(1);
      this.sfx('mun_sfx_scamper');
      this.tweens.add({ targets: s, x: ROOM_W + 120, duration: 500, ease: 'Quad.in', onComplete: () => s.setVisible(false) });
      this.tweens.add({ targets: s, y: s.y - 14, duration: 90, yoyo: true, repeat: 2 });
      this.bubbleBump();
      this.showEyes();
    });
    this.time.delayedCall(800, () => {
      if (this.room !== YARD) return;
      this.pulseArrow('right', 1.2, 420);
    });
  }

  // Mun nấp dưới gầm xe: đôi mắt vàng, chớp mỗi 2–3 giây. Tia đã nối tới trước gầm (người chơi nối trước khi gặp Mun) thì Mun ra ngay.
  showEyes() {
    this.applyMunStage();
    const blink = () => {
      if (this.chased) return;
      const e = this.munStage === 'peek' ? this.peek : this.eyes;
      if (!this.eyesAway) this.tweens.add({ targets: e, scaleY: e.baseY * 0.85, duration: 80, yoyo: true });
      this.blinkEv = this.time.delayedCall(Phaser.Math.Between(2000, 3000), blink);
    };
    this.blinkEv = this.time.delayedCall(1500, blink);
    if (this.step >= 3) this.time.delayedCall(1200, () => this.startChase());
  }

  // Hiện Mun dưới gầm theo giai đoạn: mắt ('eyes'), mắt mở to ('wide'), ló mặt ('peek').
  applyMunStage() {
    if (!this.boxDone || this.chased) return;
    const peek = this.munStage === 'peek';
    this.eyes.setVisible(!peek).setAlpha(1).setScale(this.eyes.base * (this.munStage === 'wide' ? 1.35 : 1));
    this.peek.setVisible(peek).setAlpha(1).setScale(this.peek.base);
  }

  // ---------- đồ sáng (G5-5): gương, nắp thiếc (sân sau), đĩa CD (hẻm) ----------
  pickShiny(key, s, zoneName, sfx) {
    this.pickUp(key, s, zoneName, { before: () => {
      this.sfx(sfx);
      const r = this.artRect(s);
      this.flash(r.centerX, r.centerY);
    } });
  }


  // Đĩa CD (G5-7): treo trên móc tường bên trái hẻm, xa gầm xe; chạm thì vào túi (Mun không phản ứng).
  cdTap() {
    if (this.got.l5_cd_hanging) return;
    this.pickShiny('l5_cd_hanging', this.cd, 'cd', 'l5_sfx_glass_ting');
  }

  flash(x, y, r = 24) {
    const f = this.add.star(x, y, 4, r * 0.35, r * 2.2, 0xffffff, 1).setDepth(D.fx);
    this.tweens.add({ targets: f, scale: 1.4, angle: 45, alpha: 0, duration: 380, onComplete: () => f.destroy() });
  }

  // (3) Túi rác 🎭: nhún, xẹp xuống; nhân vật bịt mũi 1 giây.
  trashTap() {
    this.sfx('l5_sfx_plastic');
    if (this.trashDone) { this.squash(this.trash); return; }
    this.trashDone = true;
    this.squash(this.trash, () => this.swap(this.trash, 'l5_trash_bag_after', () => this.zoneTo('trash', this.trash)));
    this.react('player_cover_nose', this.artRect(this.trash).centerX - this.camX + 120, 1000);
  }

  // (4) Cửa sổ quán ✨: Sữa nảy nhỏ, "Meo?".
  windowTap() {
    if (this.busy.win) return;
    this.busy.win = true;
    this.hop(this.suaWin, 18, 320);
    this.sfx('sua_sfx_meow_question');
    this.time.delayedCall(400, () => (this.busy.win = false));
  }

  // (6) Bạt + dây kéo: vuốt xuống trên dây (dir 1) hoặc vuốt lên trên bạt (dir -1) thì bạt cuộn, hẻm sáng, nắng rơi xuống A.
  // Chạm (không vuốt): dây đung đưa mạnh một nhịp.
  awningTap(g, dir) {
    if (this.rolled) return;
    const ok = g && g.swipe && g.dy * dir > 20 && Math.abs(g.dy) >= Math.abs(g.dx) * 0.6;
    if (!ok) { this.cordKick(10); this.sfx('sfx_cloth', 0.5); return; }
    this.rollAwning();
  }

  cordKick(amp) { this.cordAmp = Math.max(this.cordAmp, amp); }

  rollAwning() {
    this.rolled = true;
    this.zones.cord.disableInteractive();
    this.sfx('l5_sfx_canvas_flap');
    // Dây dài giật xuống rồi ẩn; ảnh bạt cuộn có sẵn đoạn dây ngắn treo ở đầu phải (A5-11, như demo).
    const c = this.cord;
    c.setAngle(0);
    this.tweens.chain({ targets: c, tweens: [{ y: c.y + 40, duration: 120, ease: 'Quad.out' }, { alpha: 0, duration: 100 }], onComplete: () => c.setVisible(false) });
    this.time.delayedCall(140, () => this.swap(this.awning, 'l5_awning_rolled', () => this.zoneTo('awning', this.awning)));
    this.tweens.add({ targets: this.dark, alpha: 0, duration: 500, delay: 150 });
    this.tweens.add({ targets: this.specks, alpha: 0, duration: 300, onComplete: () => this.specks.forEach((s) => { this.tweens.killTweensOf(s); s.setVisible(false); }) });
    this.tweens.add({ targets: this.sunbeam, alpha: SUNBEAM_ALPHA, duration: 500, delay: 150, onComplete: () => this.showSpot(this.W(ALLEY, PTS[0])) });
  }

  // Có đồ sáng trong túi mà hẻm còn tối: lúc sang hẻm, bong bóng nhân vật hình mặt trời bị che (một lần).
  sunThought() {
    if (this.rolled || this.taught.sun || !this.shinyInBag().length) return;
    this.taught.sun = true;
    const r = this.artRect(this.cord);
    this.think('l5_icon_sun_covered', r.centerX - 150, r.y + 140, 1.0);
  }

  // Bong bóng suy nghĩ của nhân vật có hình (icon) bên trong.
  think(icon, x, y, k = 1) {
    if (this.busy.think) return;
    this.busy.think = true;
    if (!this.thinkB) this.thinkB = this.img('ui_thought_bubble', 0, 0, D.player + 1).setVisible(false);
    if (this.thinkIcon) this.thinkIcon.destroy();
    const t = this.thinkB, ic = this.thinkIcon = this.add.image(0, 0, icon).setDepth(D.player + 2).setVisible(false);
    this.fitWidth(t, 190);
    const base = t.base;
    t.setPosition(x, y).setVisible(true).setAlpha(1).setScale(0);
    this.tweens.add({ targets: t, scale: base, duration: 260, ease: 'Back.out', onComplete: () => {
      const tb = t.getBounds();
      ic.setPosition(tb.x + tb.width * 0.55, tb.y + tb.height * 0.36).setVisible(true).setAlpha(1);
      this.fitWidth(ic, tb.width * 0.45 * k); // ảnh thật và khối cùng cỡ trong bong bóng
    } });
    this.time.delayedCall(1700, () => this.tweens.add({ targets: [t, ic], alpha: 0, duration: 220, onComplete: () => {
      t.setVisible(false); ic.setVisible(false); this.busy.think = false;
    } }));
  }

  // (10) Quạ 🎭: bay cong sang chỗ kia trên dây rồi đậu lại.
  crowTap() {
    if (this.busy.crow) return;
    this.busy.crow = true;
    this.sfx('l5_sfx_crow');
    const c = this.crow, to = this.P(this.crowFar ? 'l5_crow_idle' : 'l5_crow_far'), x0 = c.x, y0 = c.y;
    this.crowFar = !this.crowFar;
    this.tweens.addCounter({ from: 0, to: 1, duration: 600, ease: 'Sine.inOut', onUpdate: (tw) => {
      const k = tw.getValue();
      c.setPosition(x0 + (to[0] - x0) * k, y0 + (to[1] - y0) * k - 120 * Math.sin(Math.PI * k)).setAngle(8 * Math.sin(Math.PI * 4 * k));
    }, onComplete: () => {
      c.setAngle(0);
      this.applyKey(c, this.crowFar ? 'l5_crow_far' : 'l5_crow_idle');
      this.squash(c);
      this.zoneTo('crow', c);
      this.busy.crow = false;
    } });
  }

  // ---------- đồ thêm (G5-11) ----------
  // ✨ Chậu xương rồng: lắc lư, một bông hoa nhỏ bật nở rồi khép lại.
  cactusTap() {
    if (this.busy.cactus) return;
    this.busy.cactus = true;
    this.wiggle(this.cactus, 6, 2, 360);
    this.sfx('l5_sfx_pop');
    const r = this.artRect(this.cactus), f = this.flower;
    f.setPosition(r.centerX, r.top + 6).setVisible(true).setScale(0);
    this.tweens.chain({ targets: f, tweens: [{ scale: f.base * 1.2, duration: 200, ease: 'Back.out' }, { scale: f.base, duration: 120 },
      { scale: 0, duration: 220, delay: 700, ease: 'Quad.in' }], onComplete: () => { f.setVisible(false); this.busy.cactus = false; } });
  }

  // ✨ Dây phơi áo: áo phồng gió bay phấp phới, cái kẹp bật ra; hai tay nhân vật (player_hands_lift, G5-18) trồi lên rồi kẹp lại.
  shirtTap() {
    if (this.busy.shirt) return;
    this.busy.shirt = true;
    this.sfx('l5_sfx_wind');
    const sh = this.shirt, pin = this.pin, px = pin.x, py = pin.y;
    this.tweens.addCounter({ from: 0, to: 1, duration: 1100, onUpdate: (tw) => {
      const k = tw.getValue(), d = 1 - k, w = Math.sin(k * Math.PI * 6);
      sh.setAngle(-14 * d * w).setScale(sh.base * (1 + 0.12 * d * Math.abs(w)), sh.baseY);
    }, onComplete: () => sh.setAngle(0).setScale(sh.base, sh.baseY) });
    this.tweens.addCounter({ from: 0, to: 1, duration: 450, onUpdate: (tw) => {
      const k = tw.getValue();
      pin.setPosition(px + 70 * k, py - 90 * Math.sin(Math.PI * k) + 60 * k * k).setAngle(300 * k);
    } });
    this.time.delayedCall(600, () => this.react('player_hands_lift', 512, 500, () => {
      this.tweens.add({ targets: pin, x: px, y: py, angle: 0, duration: 220, ease: 'Quad.out', onComplete: () => { this.sfx('sfx_tap'); this.busy.shirt = false; } });
    }));
  }

  // ✨ Chuông gió cửa quán: đung đưa leng keng; Sữa trong cửa sổ ngóc đầu nhìn theo.
  chimeTap() {
    const c = this.chime;
    this.sfx('l5_sfx_chime');
    this.tweens.killTweensOf(c);
    this.tweens.addCounter({ from: 0, to: 1, duration: 1300, onUpdate: (tw) => {
      const k = tw.getValue();
      c.angle = 14 * Math.exp(-k * 3) * Math.sin(k * Math.PI * 7);
    }, onComplete: () => (c.angle = 0) });
    if (this.busy.suaLook) return;
    this.busy.suaLook = true;
    const s = this.suaWin, y = s.y;
    this.tweens.chain({ targets: s, tweens: [{ y: y - 16, angle: 10, duration: 220, ease: 'Quad.out' }, { y: y - 16, duration: 700 },
      { y, angle: 0, duration: 220 }], onComplete: () => (this.busy.suaLook = false) });
  }

  // 🎁 Dép tổ ong: lật lên, bên dưới có túi cá khô: 5 cá khô (một lần).
  slippersTap() {
    const s = this.slippers;
    if (this.slipDone) { this.squash(s); this.sfx('l5_sfx_flop'); return; }
    this.slipDone = true;
    this.secrets++;
    this.sfx('l5_sfx_flop');
    this.tweens.add({ targets: s, scaleY: 0.05, duration: 140, ease: 'Quad.in', onComplete: () => {
      this.applyKey(s, 'l5_slippers_flipped');
      s.scaleY = 0.05;
      this.tweens.add({ targets: s, scaleY: s.baseY, duration: 160, ease: 'Back.out', onComplete: () => {
        this.zoneTo('slippers', s);
        const r = this.artRect(s);
        this.fishBurst(r.right - 30, r.top, 5);
      } });
    } });
  }

  // ✨ Xe đạp cũ: chuông kêu, bánh xe quay vài vòng.
  bikeTap() {
    this.sfx('l5_sfx_bike_bell');
    this.nudge(this.bike);
    this.tweens.killTweensOf(this.wheel);
    this.tweens.add({ targets: this.wheel, angle: this.wheel.angle + 1080, duration: 1600, ease: 'Cubic.out' });
  }

  // ✨ Vũng nước: gợn sóng tròn, bắn vài giọt.
  puddleTap() {
    this.sfx('l5_sfx_splash', 0.6);
    const r = this.artRect(this.puddle), x = r.centerX, y = r.centerY;
    for (let i = 0; i < 2; i++) {
      const g = this.add.ellipse(x, y, 30, 10).setStrokeStyle(3, 0xffffff, 0.9).setDepth(9.5);
      this.tweens.add({ targets: g, scaleX: 4.5, scaleY: 3.2, alpha: 0, duration: 700, delay: i * 220, onComplete: () => g.destroy() });
    }
    for (let i = 0; i < 4; i++) {
      const d = this.add.circle(x, y, 6, 0xa9c6d8, 1).setStrokeStyle(2, 0x7f9db0).setDepth(9.6), dx = (i - 1.5) * 34;
      this.tweens.addCounter({ from: 0, to: 1, duration: 420, onUpdate: (tw) => {
        const k = tw.getValue();
        d.setPosition(x + dx * k, y - (70 + i * 10) * Math.sin(Math.PI * k));
      }, onComplete: () => d.destroy() });
    }
  }

  // 🎭 Thạch sùng: trông như đuôi mèo trên tường; chạm thì chạy vụt lên cao (chạm lần nữa thì bò xuống chỗ cũ).
  geckoTap() {
    if (this.busy.gecko) return;
    this.busy.gecko = true;
    this.sfx('l5_sfx_gecko');
    const g = this.gecko, to = this.W(ALLEY, this.geckoUp ? DEF.l5_gecko : GECKO_UP);
    this.geckoUp = !this.geckoUp;
    g.setAngle(this.geckoUp ? 0 : 180);
    this.tweens.add({ targets: g, x: to[0], y: to[1], duration: 260, ease: 'Quad.in', onComplete: () => {
      g.setAngle(0);
      this.zoneTo('gecko', g);
      this.busy.gecko = false;
    } });
  }

  // 🎁 Ống bơ sữa trên bậu cửa sổ hẻm: nghiêng, cá khô rơi ra: 5 cá khô (một lần).
  milkCanTap() {
    const c = this.milkCan;
    if (this.canDone) { this.wiggle(c, 4, 2, 240); this.sfx('sfx_tap'); return; }
    this.canDone = true;
    this.secrets++;
    this.sfx('l5_sfx_can_clunk');
    this.tweens.add({ targets: c, angle: -55, duration: 220, ease: 'Quad.out', onComplete: () => {
      const r = this.artRect(c);
      this.fishBurst(r.left, r.centerY, 5);
      this.tweens.add({ targets: c, angle: 0, duration: 260, delay: 500, ease: 'Back.out' });
    } });
  }

  // (11) Ống thoát nước 🎁: rung, 5 cá khô (một lần).
  pipeTap() {
    this.wiggle(this.pipe, 2, 2, 260);
    if (this.pipeDone) { this.sfx('sfx_tap'); return; }
    this.pipeDone = true;
    this.secrets++;
    const r = this.artRect(this.pipe);
    this.fishBurst(r.centerX - 40, r.bottom - 120, 5);
  }

  // (8a) Gầm xe: chưa có Mun thì chỉ rung xe. Có Mun: lùi sâu (hiện lại sau 2 giây), "khè" rất nhỏ,
  // bong bóng suy nghĩ của nhân vật vẽ đốm sáng. Đang ló mặt: rụt vào 1 giây rồi ló lại.
  cartTap() {
    if (!this.boxDone || this.chased) { this.wiggle(this.cart, 1.5, 2, 240); this.sfx('sfx_tap'); return; }
    this.metMun = true;
    this.sfx('mun_sfx_hiss_tiny', 0.6);
    this.eyesBack(this.munStage === 'peek' ? 1000 : 2000);
    const r = this.artRect(this.cart);
    this.think('l5_light_spot', r.x + 40, r.top - 20, 1.1);
  }

  eyesBack(ms = 2000) {
    if (this.pawOut) this.pawIn(true);
    this.eyesAway = true;
    const e = this.munStage === 'peek' ? this.peek : this.eyes;
    this.tweens.killTweensOf(e);
    this.tweens.add({ targets: e, scale: e.scale * 0.6, alpha: 0, duration: 260 });
    if (this.eyesEv) this.eyesEv.remove();
    this.eyesEv = this.time.delayedCall(ms, () => {
      if (this.chased) return;
      this.applyMunStage();
      e.setAlpha(0);
      this.tweens.add({ targets: e, alpha: 1, duration: 300, onComplete: () => (this.eyesAway = false) });
    });
  }

  // ---------- (7) nối tia: thả đồ sáng vào đốm sáng ----------
  onBagDrop(it, x, y) {
    if (!SHINY[it.key] || this.room !== ALLEY) return false;
    if (!this.rolled) { // hẻm còn tối: đồ về túi, dây kéo giật nhẹ và lấp lánh
      this.bagReturn(it);
      this.cordKick(12);
      this.sparkle(this.cord);
      return true;
    }
    // Trượt đốm sáng, hoặc sai đồ (G5-12: A chỉ nhận nắp thiếc, B gương, C đĩa CD): đồ bay thẳng về ô trong túi rồi lắc,
    // "sai" (bagReturn chung, như G4-43); đốm sáng nháy 2 lần.
    if (!this.spotAt || this.step >= 3 || it.key !== ORDER[this.step] || Math.hypot(x - this.spotAt[0], y - this.spotAt[1]) > HIT) {
      it.s.setAngle(0);
      this.bagReturn(it);
      this.tweens.add({ targets: [this.spot, this.halo], alpha: 0.2, duration: 110, yoyo: true, repeat: 1, onComplete: () => { this.spot.setAlpha(1); this.halo.setAlpha(1); } });
      return true;
    }
    this.bagRemove(it, false);
    this.placeShiny(it.key);
    return true;
  }

  // Đồ dựng nghiêng ở điểm hiện tại, tia phản chiếu vẽ dần 0,3 giây tới điểm kế, đốm sáng bật ra ở đó; Mun phản ứng.
  placeShiny(key) {
    const i = this.step, [px, py] = this.W(ALLEY, PTS[i]);
    this.step++;
    this.spotAt = null;
    this.hideSpot();
    const s = this.img(SHINY[key], px, py - 60, 21.1); // trên lớp xe: đĩa CD nằm trên nóc xe (G5-14)
    this.placedS.push(s);
    this.tweens.add({ targets: s, y: PLACE_Y[i], duration: 200, ease: 'Quad.in', onComplete: () => {
      this.squash(s);
      this.sfx('l5_sfx_glass_ting');
      const r = this.artRect(s), from = [r.centerX, r.centerY - 6], to = this.step < 3 ? this.W(ALLEY, PTS[this.step]) : this.W(ALLEY, FRONT);
      this.flash(...from, 30);
      const ray = { from, to, k: 0 };
      this.rays.push(ray);
      this.tweens.add({ targets: ray, k: 1, duration: 300, onUpdate: () => this.drawRays(), onComplete: () => {
        this.drawRays();
        this.showSpot(to);
        this.munReact(this.step);
      } });
    } });
    this.touch();
  }

  // Tia phản chiếu (code): ba nét chồng nhau cho có quầng sáng.
  drawRays() {
    this.rayG.clear();
    this.rayBack.clear();
    this.rays.forEach((r, i) => {
      const g = i === 2 ? this.rayBack : this.rayG;
      const [x0, y0] = r.from, x1 = x0 + (r.to[0] - x0) * r.k, y1 = y0 + (r.to[1] - y0) * r.k;
      g.lineStyle(26, 0xfff3b0, 0.18).lineBetween(x0, y0, x1, y1);
      g.lineStyle(12, 0xfff3b0, 0.4).lineBetween(x0, y0, x1, y1);
      g.lineStyle(4, 0xffffff, 0.9).lineBetween(x0, y0, x1, y1);
    });
  }

  showSpot([x, y]) {
    const s = this.spot;
    this.spotAt = [x, y];
    s.setVisible(true).setPosition(x, y).setScale(0).setAlpha(1);
    this.halo.setVisible(true).setPosition(x, y).setScale(0).setAlpha(1);
    this.tweens.add({ targets: s, scale: s.base, duration: 300, ease: 'Back.out' });
    this.tweens.add({ targets: this.halo, scale: 1, duration: 300, ease: 'Back.out', onComplete: () => {
      this.tweens.add({ targets: this.halo, scale: 1.25, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    } });
    this.sfx('sfx_sparkle', 0.6);
  }

  hideSpot() {
    this.tweens.killTweensOf(this.halo);
    this.spot.setVisible(false);
    this.halo.setVisible(false);
  }

  // A → B: mắt mở to nhìn theo. B → C: chân vồ hụt 1 lần rồi ló cả mặt. C → trước gầm: đốm sáng tự lượn, Mun phóng ra.
  munReact(step) {
    if (!this.boxDone || this.chased) return;
    if (step === 1) { this.munStage = 'wide'; this.applyMunStage(); this.tweens.add({ targets: this.eyes, scale: this.eyes.base * 1.5, duration: 140, yoyo: true }); }
    else if (step === 2) {
      this.pawReach(this.W(ALLEY, PTS[2]), () => {
        if (this.chased) return;
        this.munStage = 'peek';
        this.eyesAway = false;
        this.applyMunStage();
        const p = this.peek, y = p.y;
        p.setY(y + 30);
        this.tweens.add({ targets: p, y, duration: 260, ease: 'Back.out' });
      });
    } else if (step === 3) this.time.delayedCall(1200, () => this.startChase());
  }

  // Bàn chân đen thò ra vồ hụt về phía (x, y) (0,4 giây) rồi rụt.
  pawReach([x, y], done) {
    this.pawOut = true;
    const g = this.R(ALLEY, GAP);
    const x0 = x > g.centerX ? g.right - 10 : g.left + 10, y0 = g.centerY; // vồ từ phía gầm gần đốm sáng hơn
    const p = this.munPaw, ang = Phaser.Math.RadToDeg(Math.atan2(y - y0, x - x0));
    const reach = Math.min(1, Math.max(0.55, (Math.hypot(x - x0, y - y0) - 30) / 150));
    p.setPosition(x0, y0).setAngle(ang).setVisible(true).setScale(0.1, p.base);
    this.sfx('sfx_cloth', 0.4);
    this.tweens.chain({ targets: p, tweens: [
      { scaleX: p.base * reach, duration: 200, ease: 'Quad.out' },
      { scaleX: p.base * reach, duration: 120 },
      { scaleX: 0.1, duration: 200, ease: 'Quad.in' },
    ], onComplete: () => { this.pawIn(); this.pawFinish(); } });
    this.time.delayedCall(60, () => {
      if (!this.pawOut) return;
      const z = this.zones.munPaw, b = p.getBounds();
      z.setPosition(b.centerX, b.centerY).setInteractive();
    });
    this.pawDone = done;
  }

  // Sau cú vồ (rụt bình thường hoặc bị chạm): chạy tiếp một lần duy nhất.
  pawFinish(delay = 0) {
    const d = this.pawDone;
    this.pawDone = null;
    if (d) this.time.delayedCall(delay, d);
  }

  pawIn(now = false) {
    const p = this.munPaw;
    this.pawOut = false;
    this.zones.munPaw.disableInteractive();
    if (now) { this.tweens.killTweensOf(p); this.tweens.add({ targets: p, scaleX: 0.1, duration: 90, onComplete: () => p.setVisible(false) }); }
    else p.setVisible(false);
  }

  // Chạm chân Mun lúc đang vồ: rụt lại ngay (Lẩn tránh), không mất gì; Mun vẫn ló mặt sau đó.
  pawTapped() {
    if (!this.pawOut) return;
    this.pawIn(true);
    this.sfx('mun_sfx_hiss_tiny', 0.5);
    this.pawFinish(500);
  }

  // ---------- lộ diện: đốm sáng nhảy nhót trước gầm rồi lượn 2 vòng giữa hẻm, Mun đuổi, đè chân, nhìn chân ----------
  startChase() {
    if (this.chased || !this.boxDone) return;
    this.chased = true;
    this.handHide('paw');
    if (this.pawOut) this.pawIn(true);
    this.tweens.killTweensOf([this.eyes, this.peek, this.halo]);
    this.eyes.setVisible(false);
    this.peek.setVisible(false);
    this.halo.setVisible(false);
    const m = this.mun, g = this.R(ALLEY, GAP);
    this.applyKey(m, 'mun_run');
    m.setVisible(true).setPosition(g.right - 40, g.bottom).setFlipX(true); // ra ở phía gầm gần F (bên phải)
    this.sua = m;
    // Lộ diện: ẩn mũi tên ◄ (không cần rời hẻm; chạm quanh Mun luôn trúng Mun chứ không đổi phòng).
    this.arrowL.setVisible(false);
    this.zones.arrowL.disableInteractive();
    this.phase = 'found';
    this.locked = false;
    this.sfx('mun_sfx_meow');
    this.bubbleFound();
    this.trail = [];
    this.spotAt = null;
    const s = this.spot, c = this.W(ALLEY, [LOOP.x, LOOP.y]);
    s.setDepth(29);
    this.tweens.add({ targets: s, x: c[0], y: c[1] + LOOP.ry, duration: LOOP.lead, ease: 'Sine.inOut', onComplete: () => {
      this.tweens.addCounter({ from: 0, to: 1, duration: LOOP.ms, onUpdate: (tw) => {
        const a = Math.PI / 2 + tw.getValue() * Math.PI * 4;
        s.setPosition(c[0] + LOOP.rx * Math.cos(a), c[1] + LOOP.ry * Math.sin(a));
      }, onComplete: () => this.pounce() });
    } });
    this.chaseOn = true;
  }

  // Mỗi khung khi đang đuổi: ghi vết đốm sáng, Mun chạy tới vị trí 0,5 giây trước; vùng chạm Mun đi theo.
  chaseStep() {
    const now = this.time.now, s = this.spot, m = this.mun;
    this.trail.push([now, s.x, s.y]);
    while (this.trail.length > 2 && this.trail[1][0] <= now - 500) this.trail.shift();
    const [, tx, ty] = this.trail[0];
    const nx = m.x + (tx - m.x) * 0.25, ny = m.y + (ty + MUN_FOOT - m.y) * 0.25;
    if (Math.abs(nx - m.x) > 0.5) m.setFlipX(nx < m.x);
    m.setPosition(nx, ny);
    const b = m.getBounds();
    this.armSua(new Phaser.Geom.Rectangle(b.x - 20, b.y - 20, b.width + 40, b.height + 40));
  }

  pounce() {
    this.chaseOn = false;
    const m = this.mun, s = this.spot, x0 = m.x, y0 = m.y, x1 = s.x, y1 = s.y + MUN_FOOT;
    this.applyKey(m, 'mun_pounce');
    m.setFlipX(x1 < x0);
    this.tweens.addCounter({ from: 0, to: 1, duration: 280, onUpdate: (tw) => {
      const k = tw.getValue();
      m.setPosition(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k - 70 * Math.sin(Math.PI * k));
    }, onComplete: () => {
      if (this.phase !== 'found') return;
      this.applyKey(m, 'mun_pin_light');
      m.setFlipX(false).setPosition(x1, y1);
      this.squash(m);
      this.sfx('sfx_drop', 0.6);
      s.setDepth(28); // đốm sáng nằm dưới hai chân trước
      this.armMun();
      this.time.delayedCall(800, () => {
        if (this.phase !== 'found') return;
        this.applyKey(m, 'mun_look_paw');
        this.squash(m);
        // Nhấc chân lên xem: đốm sáng lại hiện ngay trên lưng chân.
        const r = this.artRect(m), real = (this.A.entries.mun_look_paw || {}).real;
        const [px, py] = real ? [m.x + (LOOK_PAW_SPOT[0] - m.originX * m.width) * m.scaleX, m.y + (LOOK_PAW_SPOT[1] - m.originY * m.height) * m.scaleY]
          : [r.centerX + 40, r.centerY - 5];
        s.setDepth(31).setPosition(px, py).setScale(s.base * 0.55);
        this.armMun();
        this.glowOn(this.mun);
      });
    } });
  }

  armMun() {
    const b = this.artRect(this.mun);
    this.armSua(new Phaser.Geom.Rectangle(b.x - 20, b.y - 20, b.width + 40, b.height + 30));
  }

  // Chạm Mun lúc đang đuổi: thắng ngay, dừng cảnh đuổi.
  beforeEnding() {
    this.chaseOn = false;
    this.tweens.killTweensOf([this.mun, this.spot]);
    this.tweens.getTweens().forEach((t) => { if (t.targets && t.targets.includes && t.targets.includes(this.spot)) t.stop(); });
    this.mun.setFlipX(false);
  }

  endingHide() { this.mun.setVisible(false); }

  // ---------- gợi ý ----------
  // Bước kế tiếp: thùng giấy → đồ sáng ở phòng đang đứng → kéo dây bạt → thả đồ sáng vào đốm sáng → sang phòng còn việc.
  hintStep() {
    if (this.phase === 'found') return { sprite: this.mun };
    if (this.step >= 3) return null;
    const room = this.room, arrow = (r) => ({ arrow: r === ALLEY ? 'right' : 'left' });
    if (!this.boxDone) return room === YARD ? { sprite: this.box } : arrow(YARD);
    const sprites = { l5_mirror_small: this.mirror, l5_tin_lid: this.lid, l5_cd_hanging: this.cd };
    const left = Object.keys(SHINY).filter((k) => !this.got[k]);
    const here = left.find((k) => SHINY_ROOM[k] === room);
    const inBag = this.shinyInBag();
    // Đã có nắng: chỉ đúng đồ kế tiếp theo thứ tự nắp thiếc → gương → đĩa CD (G5-12).
    if (this.rolled) {
      const need = ORDER[this.step], it = this.bagItem(need);
      if (it) return room === ALLEY ? (this.spotAt ? { item: it, spot: true } : null) : arrow(ALLEY);
      return room === SHINY_ROOM[need] ? { sprite: sprites[need] } : arrow(SHINY_ROOM[need]);
    }
    // Hẻm còn tối, có đồ sáng trong túi: kéo dây trước, đồ còn lại lấy sau.
    if (room === ALLEY && inBag.length) return { sprite: this.cord, cord: true };
    if (here) return { sprite: sprites[here] };
    if (inBag.length && room !== ALLEY) return arrow(ALLEY);
    if (left.length) return arrow(SHINY_ROOM[left[0]]);
    return null;
  }


  // 8 giây: mắt vàng chớp chớp; hẻm còn tối thì dây đung đưa mạnh hơn; đã có nắng thì đốm sáng nhảy mạnh hơn. Còn lại rung nhẹ đồ cần chạm.
  hint1() {
    const h = this.hintStep();
    if (this.boxDone && this.room === ALLEY && !this.eyesAway && !this.chased) {
      const e = this.munStage === 'peek' ? this.peek : this.eyes;
      this.tweens.add({ targets: e, scaleY: e.scaleY * 0.15, duration: 80, yoyo: true, repeat: 1, repeatDelay: 120 });
    }
    if (this.room === ALLEY && !this.rolled) this.cordKick(12);
    if (this.room === ALLEY && this.spotAt) this.spotAmp = 10;
    if (!h) return;
    if (h.arrow) this.nudgeArrow(h.arrow);
    else if (h.sprite && !h.cord) this.wiggle(h.sprite, 3, 3, 300);
  }

  // 💡 dây bạt: bàn chân làm mẫu kéo dây xuống; đồ sáng trong túi: kéo vào đốm sáng (mũi tên, đồ cần chạm: strongHint chung).
  strongHintStep(h) {
    if (h.arrow) return false;
    if (h.cord) { const r = this.artRect(this.cord); this.handDrag([r.centerX, r.y + 60], [r.centerX, r.bottom + 40], 'hint', 'paw', 2); return true; }
    if (h.item) { this.handDrag(this.slotPos(h.item.i), this.spotAt, 'hint', 'paw', 2); return true; }
    return false;
  }

  buildDebug() {
    const g = this.add.graphics().setDepth(D.hint - 2);
    [...PTS, FRONT].forEach(([x, y], i) => {
      g.lineStyle(3, 0xff4060, 0.8).strokeCircle(x + ROOM_W, y, HIT);
      for (let k = 0; k <= i; k++) g.fillStyle(0xff4060, 0.9).fillCircle(x + ROOM_W - i * 9 + k * 18, y - HIT - 16, 6); // A, B, C, F = 1–4 chấm
    });
    const gap = this.R(ALLEY, GAP);
    g.lineStyle(3, 0x3070ff, 0.8).strokeRect(gap.x, gap.y, gap.width, gap.height);
  }

  update(time, delta) {
    if (this.frozen) return;
    // Dây kéo đung đưa liên tục (đồ duy nhất trong hẻm tự chuyển động); gợi ý làm dây đung đưa mạnh hơn rồi dịu dần.
    if (this.cord.visible && !this.rolled) {
      this.cordAmp += (4 - this.cordAmp) * Math.min(1, delta / 1500);
      this.cord.angle = this.cordAmp * Math.sin(time / 420);
    }
    // Đốm sáng nhảy nhót nhẹ ±3px ở chỗ đặt kế tiếp (gợi ý 8 giây: mạnh hơn rồi dịu dần).
    if (this.spotAt && !this.chased) {
      this.spotAmp += (3 - this.spotAmp) * Math.min(1, delta / 1500);
      const [x, y] = this.spotAt, a = this.spotAmp;
      this.spot.setPosition(x + a * Math.sin(time / 170), y + a * Math.cos(time / 230));
      if (this.step >= 3) this.spot.setPosition(x + 16 * Math.sin(time / 260), y + 8 * Math.cos(time / 180)); // trước gầm: tự lượn qua lại (giữa bánh xe và ống nước)
      this.halo.setPosition(this.spot.x, this.spot.y);
    }
    // Mắt / mặt Mun dõi theo đốm sáng.
    if (this.boxDone && !this.chased && !this.eyesAway && this.spot.visible && this.munStage !== 'peek') {
      const s = this.spot, dx = Phaser.Math.Clamp((s.x - this.eyesHome[0]) * 0.03, -10, 10), dy = Phaser.Math.Clamp((s.y - this.eyesHome[1]) * 0.02, -5, 4);
      this.eyes.x += (this.eyesHome[0] + dx - this.eyes.x) * 0.2;
      this.eyes.y += (this.eyesHome[1] + dy - this.eyes.y) * 0.2;
    }
    if (this.chaseOn) this.chaseStep();
    // G5-8: đặt xong ở C thì tia từ C bám theo đốm sáng mỗi khung (lượn trước gầm, Mun đuổi, Mun đè chân, nhìn chân).
    const last = this.rays[2];
    if (last && last.k >= 1 && this.spot.visible) { last.to = [this.spot.x, this.spot.y]; this.drawRays(); }
    if (this.locked || this.moving || this.phase !== 'search' || this.drag || (this.bag && this.bag.busy)) return;
    const idle = (time - this.lastTouch) / 1000, H = this.hints;
    if (idle >= 8 && !H.h1) { H.h1 = true; this.hint1(); }
    if (idle >= 16 && time - H.sparkleAt > 3000) {
      H.sparkleAt = time;
      const h = this.hintStep();
      if (!h) return;
      if (h.arrow) { const [x, y] = this.arrowWorld(h.arrow); this.sparkle({ getBounds: () => new Phaser.Geom.Rectangle(x - 50, y - 70, 100, 140) }); }
      else if (h.item) this.hop(h.item.s, 22, 300); // đã có nắng: icon đồ sáng trong túi nảy lên
      else if (h.sprite) this.sparkle(h.sprite);
    }
  }
}
