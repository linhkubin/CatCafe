// Level 9 – Súp thưởng (chủ dự án chốt 2026-11-02). Bản chơi thử bằng khối (QUY-TRINH bước 1): mọi đồ là khối (blocks.js), tên đồ
// là nhãn chữ đi theo khối (chỉ bản khối). Luồng theo levels/levels-01-10.md mục Level 9. Một góc bếp cố định, máy quay đứng yên,
// G9-2: đồ trong bếp nhìn 3/4 từ trên xuống (thấy mặt trên lẫn mặt trước; mặt bàn lùi xa, mép bàn dày); cảnh kết nhìn ngang như L1.
// Không khay đồ: mặt bàn chỉ có đồ của bước hiện tại và món đang làm dở. 15 bước nấu (G9-3, G9-8), mỗi bước một cử chỉ.
// Chuyển bước: chớp sáng 3 nhịp + "ting" → đồ không dùng bay ra → món làm dở ở lại → đồ bước sau bay vào, nảy nhẹ → vòng gợi ý mới.
// Mỗi bước có dấu hiệu cử chỉ (mũi tên) ngay từ đầu bước (G9-1). Không thua, không sai dụng cụ.
// Chân mèo thò lên từ mép bàn 3 lần cố định (sau bước 3, trong bước 7, trong bước 13).
// Kết màn: bàn mờ rồi ẩn, chuyển sang sàn bếp nhìn ngang → 2 bát bay xuống sàn → Mun (trái), Sữa (phải) đi vào, ngạc nhiên, cúi ăn → màn thưởng.
// Ngoại lệ: không mũi tên trên đầu mèo, không chạm mèo, không cảnh bế (không gọi glowOn / catArrowOn / startEnding).
// Tên key theo ảnh sau này: đồ l9_*, dáng mèo mun_soup_* / sua_soup_*. Vòng gợi ý cam, vòng tiến độ, chớp xong bước dùng lại của L8.
import { BaseLevel, D } from './base.js';
import { PAL, rr, el } from './blocks.js';

// ---------- bố cục (toạ độ vùng chơi 1024x1536; khung 9:16 thấy y −142 … 1678, dải banner từ y ≈ 1528) ----------
// G9-2: nhìn 3/4 từ trên xuống: thấy mặt trên (lòng nồi, lòng bát: elip dẹt 0,5) lẫn mặt trước (thành nồi, thân máy xay, mép bàn dày).
// Đồ có lòng (nồi, chậu, máy xay, rây, tô, bát, muôi) neo ở tâm miệng; đồ khác neo tâm mặt trên.
const WALL_Y = 260, EDGE_Y = 1440, EDGE_T = 80;          // mép sau mặt bàn (trên là tường), mép trước mặt bàn, bề dày mép bàn
const FLAT = 0.5;                                         // miệng tròn nhìn 3/4: cao = 0,5 rộng
const STOVE = [620, 470], KNOB = [717, 568];              // bếp ga (tâm ảnh: mặt trên + mặt trước), núm bếp lớn đặt đúng đế tròn trong ảnh bếp
const BURNER = [715, 405], POT_HOME = [715, 275], POT_R = 112, FLAME_DY = 25;   // FLAME_DY: tâm vòng lửa ảnh thấp hơn tâm họng, ngang chân nồi // bếp lớn (đo trên ảnh bếp); miệng nồi đặt trên bếp lớn; nửa rộng lòng nồi
const RING_AT = [950, 720], RING_R = 60;                 // vòng tiến độ chung của bước (như L8)
const HINT_C = 0xff8a1e, HINT_CORE = 0xffffff, RING_FILL = 0x2fcf6a, RING_EDGE = 0x5a3a2a;
const PLATE = [290, 900], CHICKEN0 = [290, 885];         // đĩa, ức gà trên đĩa (mở màn)
const BASIN = [730, 880], BASIN_E = [730, 880, 145, 72]; // chậu nước (miệng); lòng nước để chà gà
const BOARD = [470, 1040], CHICKEN_B = [470, 1035];      // thớt (tâm mặt trên), gà trên thớt
const TOOL_REST = [800, 1300];                            // dao, dao gọt nằm dưới thớt bên phải
const PUMPKIN = [565, 1030];
const STRIP_DY = 22, STRIP_W = [0.75, 0.95, 1, 0.95, 0.75]; // G9-4: gà thành 5 dải ngang xếp trước sau (cách nhau, độ rộng từng dải)
const PILE = [[330, 985], [330, 1011], [330, 1037], [330, 1063], [330, 1089]];   // gà dải dồn sang trái thớt (sau bước 3)
// G9-14: bí (ảnh 347x329): nửa rộng / nửa cao thân quả, tâm quả = điểm neo. 10 miếng vỏ cắt từ chính quả (l9_pumpkin_rind_0..9),
// đặt tại tâm quả + RIND_ON[i] (px hiển thị, theo on_d trong anchors.json); đủ 10 miếng là trùng quả nguyên.
const PUMP_RX = 110, PUMP_RY = 104;
const RIND_ON = [[-63.3, -48.3], [-37.3, -47.3], [-2.7, -46], [34, -47.3], [60.3, -48.3], [-67, 52], [-39.7, 55.3], [-2.7, 56], [32.7, 55.7], [60.3, 52]];   // theo neo mới (178,167)
const RIND_X = [-72, -36, 0, 36, 72];                    // 5 cột vỏ bí (lệch từ tâm quả), mỗi cột 2 miếng (G9-3)
const CUT5 = [-45, 0, 45];                               // 3 vạch cắt ngang bí mỗi lượt (lệch dọc từ tâm quả); G9-6: 2 lượt, giữa hai lượt quả xoay 90°
const CH_CUTS = [-29, -7, 15, 37];   // (neo ảnh gà mới cao hơn tâm hình ~4px: hạ theo)                      // G9-6: 4 vết cắt trên tảng gà (lệch dọc từ tâm), trùng khe giữa 5 dải
// G9-4: dao nằm ngang bên phải món (cán phải, lưỡi chĩa trái, mép lưỡi quay xuống): lúc nằm phẳng tâm dao lệch phải KNIFE_DX so với tâm món.
// G9-5 (chỉnh): chặt bập bênh quanh điểm tựa ở 1/3 chiều dài dao tính từ cán (gần chỗ cán nối lưỡi, trên mép lưỡi), đặt ngay mép
// phải món: điểm tựa lệch PIV so với [tâm món x, đường cắt y]; lưỡi phía mũi nâng lên / hạ xuống, phía cán gần như đứng yên.
// KNIFE_PIV = tâm dao trừ điểm tựa lúc dao nằm phẳng; ROCK: góc nâng phía mũi (độ). Đầu dao gọt cách tâm PEEL_TIP.
const KNIFE_DX = 172, PIV = [110, 8], KNIFE_PIV = [-63, -23], ROCK = 22, PEEL_TIP = 112;
const POUR_B = [390, 170], POUR_P = [440, 600], POUR_BL = [560, 760]; // thớt tự nghiêng ở đây; giữ nồi / cối máy xay ở đây thì nghiêng đổ
const TILT_B = 26, TILT_P = 40, TILT_BL = 35, POUR_GAP = 47;   // G9-6 chỉnh: 21 miếng rời thớt mỗi 47 ms (~1,3 giây cả lượt)            // góc nghiêng đổ thật (độ): thớt, nồi, máy xay
const LADLE_R7 = [260, 1300], LADLE_R13 = [150, 700];    // chỗ muôi nằm (bước 7; bước 13), neo ở lòng muôi
// G9-9, G9-10: bật lửa xong (bước 7) máy quay zoom ZOOM lần, tâm khung ở ZOOM_AT (nồi giữa màn), giữ tới hết bước 8;
// khung hạ thấp (nồi cao hơn giữa màn, thấy mặt bàn dưới bếp); muôi nằm trên mặt bàn ngay dưới mép trước bếp LADLE_Z, vòng tiến độ ở RING_Z.
const ZOOM = 1.4, ZOOM_AT = [720, 470], ZOOM_MS = 600, LADLE_Z = [590, 740], RING_Z = [930, 560];
// G9-11: bước 13–15 máy quay zoom FOCUS lần vào cụm tô súp, khay, 2 bát, muôi (tâm FOCUS_AT); vòng tiến độ ở RING_F.
// Múc: điểm chạm là lòng muôi (điểm neo muôi), chạm miệng tô / khay / bát trong HEAD_R px quanh miệng là múc / đổ.
const FOCUS = 1.2, FOCUS_AT = [512, 1000], RING_F = [870, 720], HEAD_R = 75;
const BLENDER = [300, 820], JAR = [300, 820], BTN = [300, 1108]; // máy xay neo ở miệng cối; nút xay ở mặt trước đế (đo trên ảnh)
const JAR_TOP = 98, JAR_BOT = 74, JAR_D = 190, LID_DY = 6;   // LID_DY: tâm nắp cao hơn miệng cối            // lòng cối thuỷ tinh: nửa rộng ở miệng / đáy, sâu từ miệng xuống đáy
const TUREEN = [720, 1000], SIEVE = [720, 975], TUREEN_MID = [512, 900];
const SIEVE_E = [720, 975, 125, 62];
const BOWLS = [[200, 1240], [824, 1240]];                // 2 bát nông
const TRAY = [790, 1170], LADLE_R14 = LADLE_R13;          // G9-8: khay hộp đựng súp (neo tâm miệng khay) đặt cạnh tô; muôi nằm như bước múc bát
// Cảnh kết nhìn ngang hơi trực diện (như sofa L1): sàn bếp từ y 1000, bát và mèo đứng trên sàn (neo đáy) ở y 1150.
// G9-3: 2 bát xa nhau thêm khoảng 1 bề rộng bát. Mèo giữ cỡ cũ (chủ dự án): đứng hơi chồng phía sau mép bát (lớp dưới bát, lùi
// vào trong một chút) để trọn trong khung cả đuôi; cúi ăn thì mặt lộ trên mép bát.
const FLOOR_Y = 1000, FLOOR_BOWLS = [[290, 1150], [734, 1150]], END_BOWL_K = 1, MUN_END = [90, 1112.5], SUA_END = [940, 1112.5], END_CAT_D = 40.5, END_CAT_K = 1.12;   // G9-13: mèo nằm lớp trên 2 bát (bát 40), dưới khói cá (41) và tim   // chủ dự án: Mun trái 1,5 ô (75), Sữa phải 2,2 ô (110); cả 2 lên 0,25 ô (12,5)
const GRAB = 60;                                          // muôi nằm trên ngón tay một đoạn (như dụng cụ L8)
const PAW_OFF = 515, PAW_HIDE = EDGE_Y + 620;             // chân mèo (neo đáy, dài ~571): đệm chân ở y − 515
// Lượng cần làm của từng bước.
const NEED = { rub: 2000, skin: 140, cuts3: 4, rinds: 10, cuts5: 6, knob: 270, boil: 3500, stirPot: 1080, pour: 2200, blend: 3000, stir: 900, taps: 10, scoops: 3 };
const PAW_WAIT = 3000;                                    // chân mèo: để mặc 3 giây thì lấy mất đồ
const STAGE_END = { 5: 1, 8: 2, 12: 3 };                  // xong chặng → bong bóng nhiệm vụ tô thêm 1/4

const SOUP_EDGE = 0xc9772e;                                // G9-12: viền tối nhẹ mép mặt súp
const SOUP = '#f0a95a', SOUP_C = 0xf0a95a, WATER_C = 0x9fd0e8, BROTH_C = 0xf2c98a, FOAM_C = 0xb9b2a8;
const BLACK = '#2a2626', WHITE_FUR = '#fbf7ef';

// Âm thanh chưa có file: mượn tiếng tổng hợp có sẵn (như L8; có file thật cùng tên trong game/audio/ thì dùng file thật).
const SFX9 = {
  l9_sfx_wash: 'l3_sfx_pompom', l9_sfx_skin: 'l3_sfx_paper_rip', l9_sfx_chop: 'l3_sfx_box_tap', l9_sfx_peel: 'l3_sfx_scissors_cut',
  l9_sfx_plop: 'sfx_drop', l9_sfx_click: 'l3_sfx_clack', l9_sfx_ignite: 'sfx_pop_can', l9_sfx_boil: 'sua_sfx_blep',
  l9_sfx_skim: 'l3_sfx_scratch', l9_sfx_pour: 'sfx_wind', l9_sfx_blend: 'l7_sfx_tin_rattle', l9_sfx_sieve: 'l3_sfx_scratch',
  l9_sfx_blow: 'sfx_wind', l9_sfx_scoop: 'l4_sfx_duck', l9_sfx_serve: 'sfx_drop', l9_sfx_land: 'l4_sfx_land_tap',
  l9_sfx_ting: 'sfx_sparkle', l9_sfx_ting_big: 'sfx_merge', l9_sfx_chew: 'l6_sfx_dog_chew', l9_sfx_paw_meow: 'sua_sfx_meow_short',
  l9_sfx_lick: 'sua_sfx_blep', l9_sfx_surprise: 'sua_sfx_chirp', l9_sfx_scratch: 'l3_sfx_scratch',
};

// ---------- ảnh tạm (khối, cỡ = cỡ hiển thị; tên đồ là nhãn chữ trong code, không vẽ trong khối) ----------
// Đồ trong bếp nhìn 3/4 (G9-2). Thân đồ có lòng: nửa elip dưới miệng (bowlBody), miệng elip dẹt 0,5.
function bowlBody(c, cx, cy, rx, dy, fill) {
  c.beginPath(); c.ellipse(cx, cy, rx, dy, 0, 0, Math.PI); c.closePath();
  c.fillStyle = fill; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
}

// Mèo nhìn ngang (cảnh kết theo góc cũ, như sofa L1), đầu quay sang phải (Sữa quay trái bằng face()), neo đáy dưới chân.
// G9-3: đầu to, tai có lòng hồng, mắt, mũi, má rõ ở cả 3 dáng.
// pose: walk | surprise | eat.
function catBlock(fur, eye, pose) {
  const inner = fur === BLACK ? '#e9a3ad' : PAL.pink, line = fur === BLACK ? '#8a7a70' : PAL.brown;
  return [320, 250, 'đáy', (c) => {
    const tail = (pts, w) => {
      c.lineCap = 'round'; c.lineWidth = w + 8; c.strokeStyle = PAL.brown;
      c.beginPath(); c.moveTo(...pts[0]); c.quadraticCurveTo(...pts[1], ...pts[2]); c.stroke();
      c.lineWidth = w; c.strokeStyle = fur; c.stroke();
    };
    const ear = (x, y, h) => {
      c.beginPath(); c.moveTo(x - 20, y); c.lineTo(x - 4, y - h); c.lineTo(x + 16, y); c.closePath();
      c.fillStyle = fur; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
      c.beginPath(); c.moveTo(x - 11, y - 2); c.lineTo(x - 4, y - h * 0.62); c.lineTo(x + 7, y - 2); c.closePath(); c.fillStyle = inner; c.fill();
    };
    // Đầu nhìn nghiêng: mặt quay phải; open: mắt mở / 'big': mắt tròn xoe / false: mắt híp.
    const head = (x, y, r, open) => {
      ear(x - 18, y - r * 0.62, r * 0.95); ear(x + 20, y - r * 0.66, r * 0.95);
      el(c, x, y, r * 1.08, r, fur);
      el(c, x + r * 0.78, y + r * 0.28, r * 0.36, r * 0.28, fur === BLACK ? '#3a3434' : '#ffffff', line, 3); // mõm
      el(c, x + r * 1.02, y + r * 0.14, 7, 5, PAL.pink, null);                                              // mũi
      el(c, x + r * 0.2, y + r * 0.42, 10, 6, 'rgba(248,166,180,0.7)', null);                                // má
      if (open === 'big') { el(c, x + r * 0.42, y - r * 0.12, 16, 18, '#ffffff', line, 3); el(c, x + r * 0.5, y - r * 0.12, 8, 10, eye, null); }
      else if (open) { el(c, x + r * 0.45, y - r * 0.1, 10, 12, eye, line, 2); el(c, x + r * 0.5, y - r * 0.14, 4, 5, '#ffffff', null); }
      else { c.lineWidth = 4; c.strokeStyle = fur === BLACK ? eye : PAL.brown; c.beginPath(); c.arc(x + r * 0.45, y - r * 0.12, 10, Math.PI * 0.1, Math.PI * 0.9); c.stroke(); }
      c.strokeStyle = line; c.lineWidth = 2;                                                                // ria
      for (const d of [-6, 4]) { c.beginPath(); c.moveTo(x + r * 0.8, y + r * 0.3 + d); c.lineTo(x + r * 1.5, y + r * 0.2 + d * 2); c.stroke(); }
    };
    const legs = (xs, top) => xs.forEach((x) => rr(c, x - 13, top, 26, 245 - top, fur, 12));
    if (pose === 'walk') {
      tail([[60, 150], [10, 120], [26, 60]], 20);
      legs([90, 122, 190, 220], 170);
      el(c, 150, 152, 96, 50, fur);
      head(250, 104, 56, true);
    } else if (pose === 'surprise') {
      tail([[64, 130], [0, 90], [30, 20]], 36);                  // đuôi phồng dựng
      legs([96, 126, 186, 216], 150);                             // chân duỗi thẳng: lưng cao
      el(c, 152, 132, 88, 52, fur);
      head(248, 82, 60, 'big');                                   // đầu ngẩng, mắt tròn xoe
    } else {
      tail([[60, 150], [0, 140], [16, 80]], 20);
      legs([90, 122, 190, 220], 175);
      el(c, 146, 160, 96, 46, fur);
      head(258, 150, 54, false);                                  // cúi xuống bát, mặt vẫn lộ trên mép bát
    }
  }];
}

// Bàn chân mèo thò lên từ mép trước của bàn (neo đáy, đệm chân ở đỉnh, tay dài để với tới đồ trên bàn).
function pawBlock(fur) {
  return [120, 560, 'đáy', (c) => {
    rr(c, 24, 50, 72, 508, fur, 30);
    el(c, 60, 60, 50, 44, fur);
    el(c, 60, 74, 18, 14, PAL.pink, null);
    for (const [x, y] of [[30, 46], [48, 30], [72, 30], [90, 46]]) el(c, x, y, 9, 9, PAL.pink, null);
  }];
}

const FB = {
  // Tường gạch men sau bàn, tủ bếp dưới mép bàn.
  l9_bg_kitchen: [1366, 2304, 'bg', (c, w, h) => {
    const wy = WALL_Y + 384, ey = EDGE_Y + EDGE_T + 384;
    c.fillStyle = '#f4ead8'; c.fillRect(0, 0, w, wy + 40);
    c.strokeStyle = '#e0d0b6'; c.lineWidth = 3;
    for (let x = 0; x <= w; x += 80) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, wy); c.stroke(); }
    for (let y = wy; y > 0; y -= 80) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    c.fillStyle = '#c99a6a'; c.fillRect(0, ey, w, h - ey);
    c.strokeStyle = '#a97c50'; c.lineWidth = 5;
    for (let x = 40; x < w; x += 330) c.strokeRect(x, ey + 30, 290, h - ey);
  }],
  // Cảnh kết nhìn ngang: tường, chân tường, sàn gỗ lùi xa (ván dày dần về phía trước).
  l9_bg_end: [1366, 2304, 'bg', (c, w, h) => {
    const fy = FLOOR_Y + 384;
    c.fillStyle = '#f4ead8'; c.fillRect(0, 0, w, fy);
    c.strokeStyle = '#e0d0b6'; c.lineWidth = 3;
    for (let x = 0; x <= w; x += 80) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, fy); c.stroke(); }
    for (let y = fy; y > 0; y -= 80) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    rr(c, -10, fy - 120, w + 20, 120, '#c99a6a', 0);                    // tủ bếp thấp sau lưng
    c.fillStyle = '#d2a878'; c.fillRect(0, fy, w, h - fy);
    c.fillStyle = '#b9875a'; c.fillRect(0, fy, w, 10);
    c.strokeStyle = '#b98f62'; c.lineWidth = 4;
    for (let y = fy + 30, d = 30; y < h; d *= 1.25, y += d) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
  }],
  // Mặt bàn lùi xa (G9-2): xa tối hơn, vân gỗ chụm về điểm xa phía trên; mép trước dày EDGE_T.
  l9_counter: [1366, EDGE_Y - WALL_Y + EDGE_T, 'đỉnh', (c, w) => {
    const top = EDGE_Y - WALL_Y, gr = c.createLinearGradient(0, 0, 0, top);
    gr.addColorStop(0, '#d9b688'); gr.addColorStop(1, '#ecd0a6');
    c.fillStyle = gr; c.fillRect(0, 0, w, top);
    c.strokeStyle = '#d4ad7c'; c.lineWidth = 3;
    for (let x = -400; x <= w + 400; x += 190) { c.beginPath(); c.moveTo(w / 2 + (x - w / 2) * 0.72, 0); c.lineTo(x, top); c.stroke(); }
    c.fillStyle = '#b9875a'; c.fillRect(0, top, w, EDGE_T);
    c.fillStyle = '#f3dcb6'; c.fillRect(0, top, w, 8);
    c.fillStyle = PAL.brown; c.fillRect(0, top + EDGE_T - 6, w, 6); c.fillRect(0, 0, w, 5);
  }],
  // Bếp ga nhìn 3/4: mặt trên (bếp lớn bên phải, nồi đặt lên; bếp nhỏ bên trái), mặt trước có núm (núm lớn là khối riêng).
  l9_stove: [520, 400, 'tâm', (c) => {
    rr(c, 4, 244, 512, 150, '#c5cacf', 18);
    rr(c, 4, 4, 512, 250, '#e4e8eb', 22);
    for (const [x, y, r] of [[360, 125, 100], [130, 125, 70]]) {
      el(c, x, y, r, r * 0.46, '#6f7378');
      el(c, x, y, r * 0.6, r * 0.6 * 0.46, '#4a4a50', '#8a8f96', 3);
      c.strokeStyle = '#8a8f96'; c.lineWidth = 6;
      for (let a = 0; a < 6; a++) { const q = (a / 6) * Math.PI * 2; c.beginPath(); c.moveTo(x + Math.cos(q) * r * 0.3, y + Math.sin(q) * r * 0.14); c.lineTo(x + Math.cos(q) * r * 0.95, y + Math.sin(q) * r * 0.44); c.stroke(); }
    }
    el(c, 130, 320, 32, 32, '#4a4a50'); rr(c, 126, 292, 8, 28, '#f3d58a', 3, null);
  }],
  l9_knob: [96, 96, 'tâm', (c) => {
    el(c, 48, 48, 42, 42, '#4a4a50');
    rr(c, 42, 10, 12, 40, '#f3d58a', 5, null);                        // vạch chỉ
  }],
  l9_plate: [300, 170, [150, 75], (c) => { el(c, 150, 90, 142, 64, '#e8e2d8'); el(c, 150, 75, 142, 64, '#ffffff'); el(c, 150, 78, 100, 44, '#f6f2ea', '#d8d0c4', 3); }],
  l9_basin: [360, 260, [180, 90], (c) => {
    bowlBody(c, 180, 90, 172, 160, '#c9d3dc');
    el(c, 180, 90, 172, 84, '#dfe6ec');
    el(c, 180, 94, 148, 70, '#9fd0e8', '#7fb3cf', 3);
  }],
  l9_chicken_raw: [230, 130, 'tâm', (c) => {
    el(c, 115, 74, 110, 50, '#e9a39c');
    el(c, 115, 60, 110, 50, '#f6b7b0');
    el(c, 115, 56, 90, 36, '#f3dca0', PAL.brown, 3);
  }],
  l9_chicken_peeled: [230, 130, 'tâm', (c) => { el(c, 115, 74, 110, 50, '#e9a39c'); el(c, 115, 60, 110, 50, '#f8c2bb'); }],
  l9_chicken_skin: [200, 90, 'tâm', (c) => {
    el(c, 100, 45, 96, 40, '#f3dca0');
    for (const [x, y] of [[60, 30], [120, 24], [150, 50], [80, 60]]) el(c, x, y, 11, 6, '#ffffff', null);   // bóng nước
  }],
  l9_chicken_piece: [210, 40, 'tâm', (c, w) => { rr(c, 3, 14, w - 6, 23, '#e9a39c', 10); rr(c, 3, 3, w - 6, 25, '#f8c2bb', 10); }], // một dải ngang
  // Thớt: mặt trên phẳng lùi xa + mép thớt dày phía trước; neo tâm mặt trên.
  l9_board: [500, 240, [250, 105], (c) => {
    rr(c, 4, 40, 492, 196, '#b9875a', 28);
    rr(c, 4, 4, 492, 200, '#d6a472', 28);
    c.strokeStyle = '#c4935f'; c.lineWidth = 3;
    for (let y = 44; y < 190; y += 36) { c.beginPath(); c.moveTo(30, y); c.lineTo(470, y + 4); c.stroke(); }
    el(c, 462, 104, 14, 8, '#b9875a', PAL.brown, 3);                   // lỗ treo thớt
  }],
  // Dao bếp nhìn nghiêng: lưỡi bên trái (sống trên, mép lưỡi phẳng ở dưới), cán bên phải; lưỡi dài hơn bề ngang món.
  l9_knife: [380, 70, 'tâm', (c) => {
    c.beginPath(); c.moveTo(8, 44); c.lineTo(260, 10); c.lineTo(260, 60); c.lineTo(20, 60); c.closePath();
    c.fillStyle = '#d7dde3'; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    c.strokeStyle = '#ffffff'; c.lineWidth = 3; c.beginPath(); c.moveTo(30, 54); c.lineTo(250, 54); c.stroke();   // mép lưỡi sáng
    rr(c, 256, 18, 118, 38, PAL.brown, 14, PAL.brown);
  }],
  l9_peeler: [220, 60, 'tâm', (c) => {
    rr(c, 6, 14, 80, 34, '#d7dde3', 14);
    rr(c, 84, 20, 130, 22, PAL.green, 10);
  }],
  l9_pumpkin: [220, 200, 'tâm', (c) => {
    el(c, 110, 108, 104, 88, '#f5a54a');
    // G9-10: cuống vẽ bằng code (drawCuts) để xoay theo quả ở bước 5.
  }],
  l9_pumpkin_rind: [40, 84, 'tâm', (c, w, h) => rr(c, 3, 3, w - 6, h - 6, '#6f9a52', 14, '#4f7a3a', 3)],
  l9_pumpkin_stem: [40, 55, 'đáy', (c, w, h) => rr(c, 12, 3, 16, h - 6, '#8cae6a', 6)],   // cuống bí, neo gốc cuống (G9-10)
  l9_pumpkin_dice: [42, 42, 'tâm', (c, w) => { rr(c, 3, 14, w - 6, 25, '#e08a35', 6); rr(c, 3, 3, w - 6, 18, '#f5a54a', 6); }],
  // Nồi 3/4: thân nồi (thành trước), miệng elip, lòng nồi (nước / súp do code vẽ), hai quai; neo tâm miệng.
  l9_pot: [300, 290, [150, 70], (c) => {
    rr(c, 0, 66, 36, 26, '#8a8f96', 10); rr(c, 264, 66, 36, 26, '#8a8f96', 10);
    c.beginPath(); c.moveTo(25, 70); c.lineTo(30, 200); c.ellipse(150, 200, 120, 60, 0, Math.PI, 0, true); c.lineTo(275, 70); c.closePath();
    c.fillStyle = '#b8c0c8'; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    el(c, 150, 70, 125, 62, '#d7dde3');
    el(c, 150, 72, POT_R, POT_R * FLAT, '#8a8f96', PAL.brown, 3);
  }],
  l9_ladle: [300, 90, [45, 45], (c) => {
    c.beginPath(); c.moveTo(80, 40); c.lineTo(296, 20); c.lineTo(296, 36); c.lineTo(80, 56); c.closePath();
    c.fillStyle = '#c5cacf'; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    bowlBody(c, 45, 45, 40, 38, '#c5cacf');
    el(c, 45, 45, 40, 20, '#d7dde3');
    el(c, 45, 46, 30, 14, '#b8c0c8', null);
  }],
  // Máy xay 3/4: cối thuỷ tinh (thấy súp trong cối, code vẽ), miệng elip; đế có mặt trước, nút xay là khối riêng. Neo miệng cối.
  l9_blender: [240, 400, [120, 60], (c) => {
    rr(c, 10, 262, 220, 132, '#6f7378', 22);
    rr(c, 10, 238, 220, 40, '#8a8f96', 16);
    c.beginPath(); c.moveTo(34, 60); c.lineTo(52, 240); c.lineTo(188, 240); c.lineTo(206, 60); c.closePath();
    c.fillStyle = 'rgba(214,236,246,0.85)'; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    el(c, 120, 60, 88, 40, 'rgba(238,246,250,0.95)');
  }],
  // Nắp cối máy xay (khối tạm tới khi có ảnh): nắp elip có núm cầm, neo tâm mặt nắp.
  l9_blender_lid: [210, 70, 'tâm', (c) => { el(c, 105, 44, 100, 22, '#d9d0c4'); el(c, 105, 34, 100, 26, '#f1ece2'); rr(c, 88, 6, 34, 22, '#c9b9a6', 8); }],
  l9_blender_btn: [90, 90, 'tâm', (c, w) => el(c, w / 2, w / 2, 38, 38, '#e98a7a')],
  // Rây: lòng lưới (nửa dưới), vành elip, cán; neo tâm vành.
  l9_sieve: [360, 200, [130, 70], (c) => {
    rr(c, 240, 58, 116, 22, PAL.brown, 10);
    c.save(); c.beginPath(); c.ellipse(130, 70, 122, 120, 0, 0, Math.PI); c.closePath(); c.fillStyle = '#e3e7ea'; c.fill(); c.clip();
    c.strokeStyle = '#b8c0c8'; c.lineWidth = 2;
    for (let d = -120; d <= 120; d += 18) { c.beginPath(); c.moveTo(130 + d, 60); c.lineTo(130 + d, 200); c.stroke(); c.beginPath(); c.moveTo(0, 80 + d * 0.6 + 60); c.lineTo(260, 80 + d * 0.6 + 60); c.stroke(); }
    c.restore();
    c.beginPath(); c.ellipse(130, 70, 122, 120, 0, 0, Math.PI); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    el(c, 130, 70, 125, 60, 'rgba(238,241,243,0.6)');
    el(c, 130, 72, 112, 52, '#d0d6da', '#b8c0c8', 2);
  }],
  l9_tureen: [360, 260, [180, 80], (c) => { bowlBody(c, 180, 80, 170, 172, '#ffffff'); el(c, 180, 80, 170, 78, '#ffffff'); el(c, 180, 82, 146, 66, '#f1ece2', '#d8d0c4', 3); }],
  // G9-8: khay hộp giấy nhìn 3/4 (miệng chữ nhật, lòng khay, mặt trước), neo tâm miệng; nắp hộp (mặt trên + mép nắp), neo tâm mặt nắp.
  l9_tray: [280, 200, [140, 65], (c) => {
    rr(c, 10, 60, 260, 132, '#e9cfa4', 14);
    rr(c, 10, 8, 260, 114, '#fbefd9', 16);
    rr(c, 28, 22, 224, 86, '#efe0c6', 10, '#d8c4a2', 3);
  }],
  l9_tray_lid: [292, 150, [146, 62], (c) => {
    rr(c, 4, 64, 284, 80, '#e8c48e', 14);
    rr(c, 4, 6, 284, 116, '#f7d9a8', 16);
  }],
  l9_bowl: [240, 170, [120, 55], (c) => { bowlBody(c, 120, 55, 112, 108, '#fdf6e8'); el(c, 120, 55, 112, 50, '#fdf6e8'); el(c, 120, 57, 96, 42, '#f1ece2', '#d8d0c4', 3); }],
  // Bát đầy súp trên sàn (cảnh kết nhìn ngang), neo đáy.
  l9_end_bowl: [240, 130, 'đáy', (c) => {
    bowlBody(c, 120, 40, 112, 86, '#fdf6e8');
    el(c, 120, 40, 112, 24, '#fdf6e8');
    el(c, 120, 42, 96, 17, SOUP, null);
    for (const [x, y] of [[90, 40], [130, 46], [158, 38]]) el(c, x, y, 9, 4, '#f8c2bb', null);
  }],
  l9_paw_black: pawBlock(BLACK),
  l9_paw_white: pawBlock(WHITE_FUR),
  // Bong bóng nhiệm vụ (không chữ, G9-1): 1 bát súp đã hoàn thiện, khói thơm hình cá bốc lên.
  l9_icon_soup: [300, 220, 'tâm', (c) => {
    const fish = (x, y, k) => {
      c.beginPath(); c.ellipse(x, y, 30 * k, 15 * k, 0, 0, Math.PI * 2); c.moveTo(x + 25 * k, y); c.lineTo(x + 48 * k, y - 14 * k); c.lineTo(x + 48 * k, y + 14 * k); c.closePath();
      c.fillStyle = 'rgba(255,255,255,0.95)'; c.fill(); c.lineWidth = 3; c.strokeStyle = '#b8b2aa'; c.stroke();
    };
    fish(120, 70, 1.1); fish(170, 30, 0.8);
    c.beginPath(); c.moveTo(40, 130); c.quadraticCurveTo(150, 250, 260, 130); c.closePath();
    c.fillStyle = '#fdf6e8'; c.fill(); c.lineWidth = 5; c.strokeStyle = PAL.brown; c.stroke();
    el(c, 150, 130, 110, 22, SOUP);
    for (const [x, y] of [[110, 128], [160, 134], [196, 126]]) el(c, x, y, 9, 5, '#f8c2bb', null);
  }],
  mun_soup_walk: catBlock(BLACK, '#f3d58a', 'walk'),
  mun_soup_surprise: catBlock(BLACK, '#f3d58a', 'surprise'),
  mun_soup_eat: catBlock(BLACK, '#f3d58a', 'eat'),
  sua_soup_walk: catBlock(WHITE_FUR, '#8fc3e8', 'walk'),
  sua_soup_surprise: catBlock(WHITE_FUR, '#8fc3e8', 'surprise'),
  sua_soup_eat: catBlock(WHITE_FUR, '#8fc3e8', 'eat'),
};

const R = Phaser.Math.DegToRad;
// Nhãn tên đồ (G9-1, chỉ bản khối): mặc định hiện; ?nolabel=1 tắt để chụp khối sạch.
const NOLABEL = new URLSearchParams(location.search).get('label') !== '1';   // G9-14: mặc định không chữ; ?label=1 hiện nhãn để debug
const wrapA = (a) => Math.atan2(Math.sin(a), Math.cos(a));

export class Level9 extends BaseLevel {
  constructor() { super('Level9'); }

  get levelNo() { return 9; }
  get fallbacks() { return FB; }
  get fallbackCanvas() { return true; }
  get rewardFish() { return 30; }
  get endFaces() { return ['mun_face_icon', 'sua_face_icon']; } // G9-12: màn thưởng hiện đầu Mun và Sữa cạnh nhau (như L10)
  get introCallLater() { return true; }                    // mở màn riêng: không có nhân vật gọi
  get introLockMax() { return 7000; }
  get bubbleHold() { return 900; }                          // chủ dự án: bong bóng giữa màn 0,9 giây rồi tự bay lên góc
  get suaHand() { return false; }

  // Ảnh thật neo ở tâm ảnh (anchors.json); đồ cần neo khác thì đặt lại gốc theo số đo trên ảnh:
  // thớt: tâm mặt thớt (45% chiều cao ảnh); đĩa: tâm lòng đĩa (47%). Hạt lựu ảnh to hơn khối: co về bề ngang 44.
  applyKey(s, key) {
    super.applyKey(s, key);
    const e = this.A.entries[key];
    if (!e || !e.real) return s;
    // Số đo trên ảnh (tỉ lệ khung): tâm mặt thớt, lòng đĩa, miệng nồi / chậu / cối / rây / tô / bát / khay, mặt nắp, lòng muôi.
    const fix = { l9_board: [0.5, 0.454], l9_plate: [0.5, 0.47], l9_pot: [0.5, 0.263], l9_basin: [0.5, 0.37], l9_blender: [0.5, 0.112],
      l9_basin_full: [0.5, 0.37], l9_basin_ripple: [0.5, 0.37], l9_blender_lid: [0.5, 0.112],   // cối, nắp cùng khung 378x624: miệng cối ở 11,2% chiều cao
      l9_sieve: [0.345, 0.385], l9_tureen: [0.5, 0.336], l9_bowl: [0.5, 0.43], l9_tray: [0.5, 0.415], l9_tray_lid: [0.5, 0.36],
      l9_tray_ribbon: [0.5, 0.36], l9_ladle: [0.186, 0.36] }[key];
    if (fix) s.setOrigin(...fix);
    if (key === 'l9_counter') { s.setOrigin(0.5, 0); s.base = s.baseY = 1; s.setScale(1); }   // lớp bàn 1366 rộng, đỉnh giữa ở (512, 260)
    if (key === 'l9_pumpkin_dice') { this.fitWidth(s, 44); s.setTint(0xffb050); }   // cam đậm hơn, khỏi lẫn màu thớt
    return s;
  }

  sfx(key, gain = 1) { super.sfx(this.cache.audio.exists(key) ? key : SFX9[key] || key, gain); }

  resetLevel() {
    Object.assign(this, { step: 0, done: 0, p: 0, g: null, trans: true, cl: [], fxAt: {}, loopAt: 0, clockMs: 0,
      ringOn: false, ringA: 0, ringS: { k: 0 }, ringTouchAt: 0, autoRing: false, flashUntil: 0, hintHoldUntil: 0,
      fill: 0, pawEv: null, trayF: 0, box: { rib: 0, bow: 0, on: false }, zoomed: false, knifeSet: false, chopping: false, potStir: 0, swirl: 0, swirlAt: -1e9, tinkAt: 0, tiltBl: 0, pieces: [], dice: [], rinds: [], cuts: [], rub: 0, inBasin: false, poured: 0, pourAt: 0, tiltB: 0, tiltP: 0,
      scoopN: 0, fv: { b0: 0, b1: 0, tray: 0, tu: 0 }, knobAcc: 0, offKnob: false, flame: false, flameK: 0, boil: 0, foam: [], potL: 1, potFood: 0, bl: 0, blStage: 0, holdMs: 0,
      sieveL: 0, tureenL: 0, stirAcc: 0, heat: 0, taps: 0, bowlF: [0, 0], ladleFull: false, stream: null, cutLines: null, cutLines2: [], pumpRot: 0, turning: false,
      fishOn: false, fishI: 0, ladleFree: false, munE: null, suaE: null });
  }

  // ---------- dựng cảnh ----------
  buildRoom() {
    this.buildBg('l9_bg_kitchen');
    this.counter = this.img('l9_counter', 512, WALL_Y, 5);
    this.stove = this.img('l9_stove', ...STOVE, 6);
    this.flameG = this.add.graphics().setDepth(8.4);
    this.flames = ['l9_flame_a', 'l9_flame_b'].map((k) => this.img(k, ...BURNER, 8.05).setVisible(false));   // G9-14: lửa ảnh quanh chân nồi (lớp ngay trên nồi)            // lửa liếm trước thân nồi
    this.knob = this.img('l9_knob', ...KNOB, 7);
    this.pot = this.img('l9_pot', ...POT_HOME, 8).setVisible(false);
    this.potG = this.add.graphics().setDepth(8.5);
    this.board = this.img('l9_board', ...BOARD, 9).setVisible(false);
    this.plate = this.img('l9_plate', ...PLATE, 10);
    this.basin = this.img(this.isReal('l9_basin_full') ? 'l9_basin_full' : 'l9_basin', ...BASIN, 10);   // G9-14: chậu có nước (ảnh)
    this.blender = this.img('l9_blender', ...BLENDER, 11).setVisible(false);
    this.blendG = this.add.graphics().setDepth(11.5);
    this.btn = this.img('l9_blender_btn', ...BTN, 12).setVisible(false);
    this.lid = this.img('l9_blender_lid', JAR[0], -300, 12.2).setVisible(false);   // G9-14: nắp cối
    this.tureen = this.img('l9_tureen', ...TUREEN, 11).setVisible(false);
    this.tureenG = this.add.graphics().setDepth(11.5);
    this.sieve = this.img('l9_sieve', ...SIEVE, 12).setVisible(false);
    this.sieveG = this.add.graphics().setDepth(12.5);
    this.bowls = BOWLS.map((p) => this.img('l9_bowl', ...p, 11).setVisible(false));
    this.tray = this.img('l9_tray', ...TRAY, 11).setVisible(false);
    this.trayG = this.add.graphics().setDepth(11.5);             // súp trong khay, vạch đầy
    this.trayLid = this.img('l9_tray_lid', TRAY[0], -300, 12).setVisible(false);
    this.boxG = this.add.graphics().setDepth(12.5);              // ruy băng, nơ trên nắp (khối: vẽ bằng code)
    this.ribV = this.img('l9_tray_ribbon', 0, 0, 12.6).setVisible(false);   // ảnh thật: dải dọc
    this.ribH = this.img('l9_tray_ribbon', 0, 0, 12.6).setVisible(false);   // ảnh thật: dải ngang
    this.bow = this.img('l9_tray_bow', 0, 0, 12.7).setVisible(false);
    this.bowlG = this.add.graphics().setDepth(11.5);
    this.glowG = this.add.graphics().setDepth(11.7);             // G9-11: miệng tô / khay / bát sáng khi lòng muôi lướt vào
    this.pumpkin = this.img('l9_pumpkin', ...PUMPKIN, 13).setVisible(false);
    this.stem = this.img('l9_pumpkin_stem', ...PUMPKIN, 16.5).setVisible(false);  // cuống: đặt và xoay theo quả trong drawCuts
    this.cutG = this.add.graphics().setDepth(16);              // vết dao trên tảng gà (bước 3), trên bí (bước 5): vẽ lại mỗi khung
    this.chicken = this.img('l9_chicken_raw', ...CHICKEN0, 14);
    this.skin = this.img('l9_chicken_skin', 0, 0, 15).setVisible(false);
    this.knife = this.img('l9_knife', ...TOOL_REST, 22).setVisible(false);
    this.peeler = this.img('l9_peeler', ...TOOL_REST, 22).setVisible(false);
    this.ladle = this.img('l9_ladle', ...LADLE_R7, 24).setVisible(false);
    this.ladleG = this.add.graphics().setDepth(24.5);
    this.streamG = this.add.graphics().setDepth(20);
    // Chân mèo thò lên từ mép trước của bàn: chỉ thấy phần trên mép bàn.
    const m = this.make.graphics({ x: 0, y: 0 }, false);
    m.fillStyle(0xffffff).fillRect(-700, -1200, 2500, 1200 + EDGE_Y);
    const mask = m.createGeometryMask();
    this.pawS = { black: this.img('l9_paw_black', 0, PAW_HIDE, 26), white: this.img('l9_paw_white', 0, PAW_HIDE, 26) };
    Object.values(this.pawS).forEach((s) => s.setMask(mask).setVisible(false));
    this.hl = this.add.graphics().setDepth(29);                 // vòng gợi ý cam
    this.ringG = this.add.graphics().setDepth(D.fx + 1);        // vòng tiến độ
    // Cảnh kết nhìn ngang (G9-2): nền sàn bếp, hiện khi bàn ẩn; 2 bát đầy tạo lúc kết màn.
    this.bgEnd = this.img('l9_bg_end', 0, 0, 39).setOrigin(171 / 1366, 384 / 2304).setAlpha(0).setVisible(false);
    this.endB = null;
    this.player = this.img('player_call', 0, 0, D.player).setVisible(false); // không xuất hiện; BaseLevel và bộ chơi thử cần có
    this.tableParts = [this.counter, this.stove, this.flameG, this.knob, this.pot, this.potG, this.board, this.plate, this.basin,
      this.blender, this.blendG, this.btn, this.tureen, this.tureenG, this.sieve, this.sieveG, this.pumpkin, this.stem, this.cutG, this.chicken,
      this.skin, this.knife, this.peeler, this.ladle, this.ladleG, this.streamG, this.lid, this.tray, this.trayG, this.trayLid, this.boxG, this.ribV, this.ribH, this.bow];
    this.cueG = this.add.graphics().setDepth(D.fx + 3);         // dấu hiệu cử chỉ của bước (G9-1)
    this.cueS = {};                                              // G9-14: mũi tên ảnh (thẳng, cong, vòng, chạm)
    for (const k of ['straight', 'curve', 'circle', 'tap']) this.cueS[k] = this.img(k === 'tap' ? 'l9_hint_tap' : 'l9_hint_arrow_' + k, 0, 0, D.fx + 3).setVisible(false);
    this.buildTags();
  }

  // ---------- nhãn tên đồ (G9-1, bản khối) ----------
  // Chữ nâu đậm viền trắng, ngay trên (hoặc dưới) phần vẽ của đồ, đi theo đồ; đồ ẩn thì nhãn ẩn.
  // get: sprite hoặc mảng sprite (nhãn đặt trên khung bao chung); where: 'trên' | 'dưới' | điểm [x, y] | hàm trả về một trong hai.
  buildTags() {
    this.tags = [];
    const T = this.tag = (text, get, where = 'trên') => {
      if (NOLABEL) return;
      const t = this.add.text(0, 0, text, { fontFamily: 'Arial, sans-serif', fontSize: '36px', fontStyle: 'bold', color: '#4a2f22',
        stroke: '#ffffff', strokeThickness: 8 }).setDepth(D.ui - 6).setVisible(false);
      this.tags.push({ t, get: typeof get === 'function' ? get : () => get, where });
    };
    T('Bếp ga', this.stove, () => [STOVE[0] - 360, STOVE[1] + 120]);  // cạnh trái mặt trước bếp: không bị thớt, nồi che
    T('Núm bếp', this.knob, 'dưới');
    T('Nồi', this.pot);
    T('Đĩa', this.plate, 'dưới');
    T('Chậu nước', this.basin, 'dưới');
    T('Gà', this.chicken, () => (this.skin.visible ? 'dưới' : 'trên'));
    T('Da gà', this.skin);
    T('Gà miếng', () => this.pieces);
    T('Bí đỏ', this.pumpkin, () => (this.step === 5 ? [PUMPKIN[0] + 40, PUMPKIN[1] + 130] : [PUMPKIN[0] + 205, PUMPKIN[1] + 10])); // gọt: bên phải (không đè mũi tên); cắt: dưới quả (không đè cán dao)
    T('Bí hạt lựu', () => this.dice);
    T('Thớt', this.board, 'dưới');
    T('Dao', this.knife, () => (this.knifeSet ? [this.knife.x + 250, this.knife.y] : 'trên'));  // dao trên thớt: nhãn bên phải cán
    T('Dao gọt', this.peeler);
    T('Muôi', this.ladle, () => (this.zoomed ? 'dưới' : 'trên'));  // lúc zoom (bước 7–8): dưới muôi, không chạm nhãn nồi / chân mèo
    T('Máy xay', this.blender, () => (this.step === 9 ? [BLENDER[0] - 175, BLENDER[1] + 70] : 'trên'));  // bước 9: bên trái cối, không chạm dòng súp
    T('Nút xay', this.btn, 'dưới');
    T('Rây', this.sieve);
    T('Tô', this.tureen, 'dưới');
    T('Khay', this.tray, 'dưới');
    T('Bát 1', this.bowls[0], 'dưới');
    T('Bát 2', this.bowls[1], 'dưới');
    const pawTag = (s) => () => [s.x + 150, s.y - PAW_OFF + 10];  // bên phải đệm chân: không đè nhãn đồ chân đang nghịch
    T('Chân Mun', this.pawS.black, pawTag(this.pawS.black));
    T('Chân Sữa', this.pawS.white, pawTag(this.pawS.white));
  }

  tagStep() {
    for (const { t, get, where } of this.tags) {
      // Đồ đang bay ra (hoặc nằm trên đồ đang bay ra) thì tắt nhãn ngay lúc bắt đầu bay.
      const list = [].concat(get() || []).filter((s) => s && s.visible && s.alpha > 0.3 && s.active && !s.flying && !(s.cr && s.cr.p.flying));
      if (!list.length || this.phase === 'reward') { t.setVisible(false); continue; }
      const w = typeof where === 'function' ? where() : where;
      if (Array.isArray(w)) { t.setOrigin(0.5, 0.5).setPosition(...w).setVisible(true); continue; }
      let l = 1e9, r = -1e9, top = 1e9, bot = -1e9;
      for (const s of list) { const b = s.getBounds(); l = Math.min(l, b.left); r = Math.max(r, b.right); top = Math.min(top, b.top); bot = Math.max(bot, b.bottom); }
      if (w === 'dưới') t.setOrigin(0.5, 0).setPosition((l + r) / 2, bot + 4);
      else t.setOrigin(0.5, 1).setPosition((l + r) / 2, top - 4);
      t.setVisible(true);
    }
  }

  // Bong bóng nhiệm vụ: ảnh 1 bát súp (không chữ). Ở góc: bản xám, phần màu tô dần từ dưới lên theo chặng (fill 0..1).
  buildUI() {
    super.buildUI();
    const B = this.bubble;
    B.dark.setVisible(false); B.q.setVisible(false); B.face.setVisible(false);
    const gk = 'l9_icon_soup_gray';
    if (!this.textures.exists(gk)) {
      const src = this.textures.get('l9_icon_soup').getSourceImage(), t = this.textures.createCanvas(gk, src.width, src.height), c = t.getContext();
      c.filter = 'grayscale(1) opacity(0.55)';
      c.drawImage(src, 0, 0);
      t.refresh();
    }
    const k = 220 / this.textures.get('l9_icon_soup').getSourceImage().width;
    this.iconG = this.add.image(0, 6, gk).setScale(k);
    this.iconC = this.add.image(0, 6, 'l9_icon_soup').setScale(k);
    B.ct.add([this.iconG, this.iconC]);
    this.setFill(1);
  }

  setFill(f) {
    const t = this.iconC, h = t.height;
    t.setVisible(f > 0.001);
    if (f > 0.001) t.setCrop(0, h * (1 - f), t.width, h * f);
  }

  bubbleIntro() { super.bubbleIntro(); this.setFill(1); }               // giữa màn hình: đủ màu cho rõ nhiệm vụ
  bubbleToCorner() { super.bubbleToCorner(); this.setFill(this.fill); this.zones.bubble.disableInteractive(); } // ở góc: tô theo chặng đã xong; chủ dự án: không chạm vào bong bóng

  // Xong một chặng: bong bóng tô thêm 1/4 (tô dần), nảy nhẹ.
  stageFill(k) {
    const o = { f: this.fill };
    this.fill = k / 4;
    this.tweens.add({ targets: o, f: this.fill, duration: 500, onUpdate: () => this.setFill(o.f) });
    const B = this.bubble;
    if (B.home === 'corner') this.tweens.add({ targets: B.ct, scale: B.ct.scale * 1.25, duration: 160, yoyo: true });
    this.sfx('l9_sfx_ting', 0.6);
  }

  // ---------- mở màn (khoá tương tác ~2 giây): bếp hiện dần, gà trên đĩa và chậu nước bày sẵn, bong bóng nhiệm vụ ----------
  onIntro() {
    this.time.delayedCall(800, () => {
      this.bubbleIntro();
      this.locked = false;
      this.phase = 'search';
      this.beginStep(1);
    });
  }

  // ---------- nhập liệu ----------
  setupInput() {
    super.setupInput();
    this.input.on('pointerdown', (p, over) => this.gDown(p, over));
    this.input.on('pointermove', (p) => this.gMove(p));
    this.input.on('pointerup', () => this.gUp());
  }

  canAct() { return !this.locked && !this.introBusy && !this.trans && this.phase === 'search' && !this.frozen; }
  hitS(s, x, y, m = 30) { if (!s.visible) return false; const b = s.getBounds(); return x > b.left - m && x < b.right + m && y > b.top - m && y < b.bottom + m; }
  inEll([cx, cy, rx, ry], x, y, m = 20) { return ((x - cx) / (rx + m)) ** 2 + ((y - cy) / (ry + m)) ** 2 <= 1; }

  gDown(p, over) {
    if (!this.canAct() || this.g) return;
    if (over && over.some((o) => o.zoneName)) return;         // nút 💡, ⏸, bong bóng
    const x = p.worldX, y = p.worldY, n = this.step;
    if (this.pawTap(x, y)) return;
    const grab = (s, extra = {}) => ({ s, off: [s.x - x, s.y - y], tx: s.x, ty: s.y, ...extra });
    let g = null;
    if (n === 1 && this.hitS(this.chicken, x, y)) g = grab(this.chicken, { k: 'chicken' });
    else if (n === 2 && this.hitS(this.skin, x, y, 40)) { g = { k: 'skin', x0: x, y0: y, ox: this.skin.x, oy: this.skin.y }; this.drop(this.skin); }
    else if ((n === 3 || n === 5) && !this.knifeSet && this.hitS(this.knife, x, y, 50)) g = { k: 'knife', s: this.knife, tool: true };
    else if ((n === 3 || n === 5) && this.knifeSet && (this.hitS(this.board, x, y, 80) || this.hitS(this.knife, x, y, 40))) { this.chop(); return; }
    else if (n === 4 && (this.hitS(this.peeler, x, y, 50) || this.hitS(this.pumpkin, x, y, 40))) g = { k: 'peel', s: this.peeler, tool: true };
    else if (n === 6 && this.hitS(this.board, x, y, 10)) g = grab(this.board, { k: 'board' });
    else if (n === 7 && !this.flame && Math.hypot(x - KNOB[0], y - KNOB[1]) < 120) g = { k: 'knob', a: Math.atan2(y - KNOB[1], x - KNOB[0]) };
    else if (n === 8 && this.offKnob && Math.hypot(x - KNOB[0], y - KNOB[1]) < 120) g = { k: 'knoboff', a: Math.atan2(y - KNOB[1], x - KNOB[0]) };
    else if ((n === 8 && !this.offKnob || n === 7 && this.flame && this.ladleFree && !this.pawEv || n === 14 || n === 15) && this.hitS(this.ladle, x, y, n <= 8 ? 80 : 40)) {   // bước khuấy: cầm cả cán, vùng chạm rộng; G9-15: bước 7 cầm được ngay khi chân Sữa rụt (kể cả muôi đang lăn)   // bước khuấy: cầm cả cán, vùng chạm rộng
      if (this.pawEv && this.pawEv.n === 2) this.pawCancel();
      this.tweens.killTweensOf(this.ladle); this.ladle.setAngle(0);   // muôi đang lăn lóc / nảy: cầm lên là thôi
      g = { k: n <= 8 ? 'stirpot' : 'serve', s: this.ladle, off: [0, -GRAB], dwell: 0, a: null };
    } else if (n === 9 && this.hitS(this.pot, x, y, 20)) g = grab(this.pot, { k: 'pot' });
    else if (n === 10 && Math.hypot(x - this.btn.x, y - this.btn.y) < 95) { g = { k: 'btn' }; this.btn.setScale(this.btn.base * 0.85); }
    else if (n === 11 && this.hitS(this.blender, x, y, 20)) g = grab(this.blender, { k: 'bl' });
    else if (n === 12 && this.inEll(SIEVE_E, x, y, 40)) g = { k: 'stir', a: Math.atan2(y - SIEVE_E[1], x - SIEVE_E[0]) };
    else if (n === 13 && this.hitS(this.tureen, x, y, 40)) { this.blowTap(x, y); return; }
    if (!g) return;
    Object.assign(g, { px: x, py: y, moveAt: 0, lo: y, hi: y });   // điểm đặt tay cũng tính vào nét vuốt
    // Món cầm lên nằm trên cùng; riêng thớt giữ lớp để gà, bí trên thớt vẫn nằm trên thớt.
    if (g.s && g.k !== 'board') { g.s.depth0 = g.s.depth; g.s.setDepth(30); if (g.tool) { g.s.setAngle(g.s === this.knife ? 0 : -90); this.toolTo(g, x, y); g.s.setPosition(g.tx, g.ty); } }
    if (g.k === 'stirpot' || g.k === 'serve') this.toolTo(g, x, y);
    this.g = g;
    this.touch();
    this.handHide('paw');
  }

  // Dao, dao gọt cầm dựng dọc, lưỡi chĩa xuống: mũi dao ở ngón tay; đầu dao gọt nhô trên ngón tay để thấy chỗ chạm vỏ (G9-3).
  // Muôi: lòng muôi trên ngón tay một đoạn.
  toolTo(g, x, y) {
    if (g.tool) { g.tx = x + (g.s === this.knife ? 40 : 0); g.ty = y - (g.s === this.knife ? 50 : 180); return; }
    if (g.off) { g.tx = x + g.off[0]; g.ty = y + g.off[1]; }
  }

  gMove(p) {
    const g = this.g;
    if (!g || !p.isDown) return;
    const x = p.worldX, y = p.worldY, now = this.time.now;
    if (Math.hypot(x - g.px, y - g.py) > 2) g.moveAt = now;
    if (g.s) this.toolTo(g, x, y);
    if (g.k === 'skin') this.skinPull(x, y);
    else if (g.k === 'knob') this.knobTurn(x, y);
    else if (g.k === 'knoboff') this.knobOffTurn(x, y);
    else if (g.k === 'stir') this.stirTurn(x, y);
    g.px = x; g.py = y;
  }

  gUp() {
    const g = this.g;
    if (!g) return;
    this.g = null;
    if (g.s && g.s.depth0 !== undefined) { g.s.setDepth(g.s.depth0); g.s.depth0 = undefined; }
    if (g.k === 'stirpot' && this.step === 7) { this.slideTo(this.ladle, ...LADLE_Z, 0); return; }   // G9-15: thả muôi khuấy sớm
    if (this.done >= this.step) return;                        // bước vừa xong: đồ do stepDone xếp
    if (g.k === 'chicken') {
      this.inBasin = this.inEll(BASIN_E, this.chicken.x, this.chicken.y, 10);
      if (!this.inBasin) this.slideTo(this.chicken, ...CHICKEN0);
    } else if (g.k === 'skin') { this.skin.setPosition(g.ox, g.oy).setAngle(0).setScale(this.skin.base); this.hold(this.chicken, this.skin); }
    else if (g.k === 'knife' && this.hitS(this.board, g.px, g.py, 60)) this.setKnife();
    else if (g.tool) this.slideTo(g.s, ...TOOL_REST, 0);
    else if (g.k === 'board') { if (this.nearPot(this.board)) this.autoBoard(); else this.slideTo(this.board, ...BOARD); }
    else if (g.k === 'pot') { this.stream = null; this.slideTo(this.pot, ...POT_HOME); }
    else if (g.k === 'bl') { this.stream = null; this.slideTo(this.blender, ...BLENDER); }
    else if (g.k === 'stirpot') this.slideTo(this.ladle, ...LADLE_Z, 0);  // về chỗ sát nồi
    else if (g.k === 'serve') this.slideTo(this.ladle, ...LADLE_R13, 0);
    else if (g.k === 'btn') { this.btn.setScale(this.btn.base); this.blender.setX(BLENDER[0]); }
  }

  // Bay vồng tới (x, y), đỉnh vồng h px (không quay mặt như moveTo: khối đồ ăn không lật).
  arcTo(s, x, y, ms, h, done) {
    const x0 = s.x, y0 = s.y;
    this.tweens.addCounter({ from: 0, to: 1, duration: ms, ease: 'Sine.inOut', onUpdate: (tw) => {
      const k = tw.getValue();
      s.setPosition(x0 + (x - x0) * k, y0 + (y - y0) * k - h * Math.sin(Math.PI * k));
    }, onComplete: done });
  }

  slideTo(s, x, y, angle) {
    this.tweens.add({ targets: s, x, y, ...(angle !== undefined ? { angle } : {}), duration: 260, ease: 'Quad.out' });
  }

  // Nghiêng đổ thật (G9-2, k 0..1): xoay quanh điểm neo tới max độ; dir +1 đổ sang phải, −1 sang trái.
  tiltSet(s, k, dir, max) {
    s.setScale(s.base, s.baseY || s.base).setAngle(dir * max * k);
  }

  // Điểm (lx, ly) trên đồ (px so với điểm neo, chưa xoay) ra toạ độ vùng chơi.
  local(s, lx, ly) {
    const r = R(s.angle);
    return [s.x + lx * Math.cos(r) - ly * Math.sin(r), s.y + lx * Math.sin(r) + ly * Math.cos(r)];
  }

  // ---------- vật con: đồ nằm trên thớt / máy xay / tô đi theo vật đỡ (vị trí, góc) ----------
  hold(p, s) {
    s.cr = { p, rx: s.x - p.x, ry: s.y - p.y, ra: s.angle - p.angle };
    if (!this.cl.includes(s)) this.cl.push(s);
    return s;
  }

  drop(s) { s.cr = null; this.cl = this.cl.filter((o) => o !== s); return s; }

  carryStep() {
    for (const s of this.cl) {
      const { p, rx, ry, ra } = s.cr, r = R(p.angle), kx = p.scaleX / p.base;
      s.setPosition(p.x + rx * kx * Math.cos(r) - ry * Math.sin(r), p.y + rx * kx * Math.sin(r) + ry * Math.cos(r)).setAngle(p.angle + ra);
      s.setVisible(p.visible).setAlpha(p.alpha);
    }
  }

  // ---------- bay ra / bay vào ----------
  flyOut(list, delay = 0) {
    list.filter((s) => s && s.visible).forEach((s, i) => {
      const dir = s.x < 512 ? -1 : 1;
      this.tweens.add({ targets: s, x: s.x + dir * 900, y: s.y - 260, angle: dir * 35, duration: 460, delay: delay + i * 60, ease: 'Quad.in',
        onStart: () => { s.flying = true; }, onComplete: () => { s.flying = false; if (!s.cr) s.setVisible(false).setAngle(0); } });
    });
    this.time.delayedCall(delay, () => this.sfx('sfx_whoosh', 0.5));
  }

  // Bay vào từ phía trên cạnh màn hình, đáp đúng chỗ, nảy nhẹ. Đồ con (hold) đi theo.
  flyIn(s, x, y, delay = 0, done) {
    const dir = x < 512 ? -1 : 1;
    s.flying = false;
    s.setVisible(true).setAlpha(1).setScale(s.base, s.baseY || s.base).setPosition(x + dir * 760, y - 520).setAngle(dir * -25);
    this.tweens.add({ targets: s, x, y, angle: 0, duration: 520, delay, ease: 'Cubic.out', onComplete: () => {
      this.squash(s); this.sfx('l9_sfx_land', 0.5); done && done();
    } });
  }

  // Đặt đồ con ở chỗ cuối rồi gắn vào vật đỡ (trước khi vật đỡ bay vào).
  kit(p, x, y, parts) { p.setPosition(x, y).setAngle(0); parts.forEach(([s, sx, sy]) => { s.setPosition(sx, sy).setAngle(0); this.hold(p, s); }); }

  // ---------- bước ----------
  beginStep(n) {
    this.step = n;
    this.p = 0;
    this.trans = false;
    this.hintHoldUntil = this.time.now;
    this.touch();
    if (n === 3 || n === 5) { this.knifeSet = false; this.chopping = false; }
    if (n === 4) this.time.delayedCall(1200, () => { if (this.step === 4) this.pawStart(1); });
    if (n === 13) { this.heat = 1; this.time.delayedCall(1500, () => { if (this.step === 13) this.pawStart(3); }); }
    if (n === 13) this.camZoom(true, null, FOCUS, FOCUS_AT);     // G9-11: tập trung vào tô súp và đồ mới bay vào tới hết bước 15
    if (n === 8 && !this.zoomed) this.camZoom(true);
    if (n === 8) { this.p = this.potStir / NEED.stirPot; if (this.potStir >= NEED.stirPot) this.time.delayedCall(50, () => this.stirDone()); }   // G9-15: khuấy sớm đã đủ              // G9-10: thường đã zoom từ lúc bật lửa (bước 7)
  }

  // G9-9: máy quay zoom vào nồi (on) / zoom ra về khung cũ. HUD, bong bóng (scrollFactor 0) vẽ bằng máy quay phụ không zoom.
  // z, at: mức zoom và tâm khung (mặc định: nồi ở bước 7–8; G9-11 dùng FOCUS, FOCUS_AT cho tô súp ở bước 13–15).
  camZoom(on, done, z = ZOOM, at = ZOOM_AT) {
    const cam = this.cameras.main;
    if (on) {
      if (!this.zoomed) this.cam0 = { x: cam.scrollX, y: cam.scrollY, mx: cam.scrollX + cam.width / 2, my: cam.scrollY + cam.height / 2 };
      this.uiCamOn();
      this.zoomed = z === ZOOM ? 'pot' : 'focus';
      cam.pan(...at, ZOOM_MS, 'Sine.easeInOut', true);
      cam.zoomTo(z, ZOOM_MS, 'Sine.easeInOut', true);
    } else {
      const c0 = this.cam0;
      cam.pan(c0.mx, c0.my, ZOOM_MS, 'Sine.easeInOut', true);
      cam.zoomTo(1, ZOOM_MS, 'Sine.easeInOut', true);
    }
    this.time.delayedCall(ZOOM_MS + 30, () => {
      if (!on) { cam.setZoom(1).setScroll(this.cam0.x, this.cam0.y); this.zoomed = false; this.uiCamOff(); }
      if (done) done();
    });
  }

  // Máy quay phụ cho HUD: máy chính bỏ qua mọi đồ scrollFactor 0, máy phụ chỉ vẽ chúng (cả đồ tạo thêm trong lúc zoom).
  uiCamOn() {
    if (this.uiCam) return;
    const main = this.cameras.main, ui = this.uiCam = this.cameras.add(main.x, main.y, main.width, main.height);
    ui.setScroll(main.scrollX, main.scrollY);
    const sort = (o) => { if (o.scrollFactorX === 0) { main.ignore(o); (this.mainIgn = this.mainIgn || []).push(o); } else ui.ignore(o); };
    this.children.list.forEach(sort);
    this.onAdd = (o) => sort(o);
    this.sys.events.on(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAdd);
  }

  uiCamOff() {
    if (!this.uiCam) return;
    this.sys.events.off(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAdd);
    const id = this.cameras.main.id;
    (this.mainIgn || []).forEach((o) => { o.cameraFilter &= ~id; });
    this.mainIgn = [];
    this.cameras.remove(this.uiCam);
    this.uiCam = null;
  }

  stepDone(n) {
    if (this.done >= n) return;
    this.done = n;
    this.p = 1;
    this.trans = true;
    const g = this.g, keep = n === 7 && g && g.k === 'stirpot';  // G9-15: đang khuấy sớm thì giữ muôi trên tay sang bước 8
    if (!keep && g && g.s && g.s.depth0 !== undefined) { g.s.setDepth(g.s.depth0); g.s.depth0 = undefined; }
    if (!keep) this.g = null;
    this.autoRing = false;
    this.flashUntil = 0;
    this.doneBlink(this.blinkAreas(n));
    this.ringPop();
    this.sfx('l9_sfx_ting_big');
    this.vibrate(30);
    this.touch();
    if (STAGE_END[n]) this.stageFill(STAGE_END[n]);
    const T = (ms, fn) => this.time.delayedCall(ms, fn), next = (ms) => T(ms, () => this.beginStep(n + 1));
    if (n === 1) {             // chậu, đĩa bay ra; thớt bay vào; gà nhảy lên thớt (bóng nước, da bóng)
      this.applyKey(this.chicken, 'l9_chicken_peeled');
      this.skin.setVisible(true).setPosition(this.chicken.x, this.chicken.y - 6).setAngle(0);
      this.hold(this.chicken, this.skin);
      this.chicken.setDepth(30); this.skin.setDepth(31);
      this.tweens.add({ targets: this.chicken, y: this.chicken.y - 120, angle: 0, duration: 300, delay: 250, ease: 'Quad.out' });
      this.flyOut([this.plate, this.basin], 650);
      T(850, () => this.flyIn(this.board, ...BOARD));
      T(1450, () => this.arcTo(this.chicken, ...CHICKEN_B, 380, 90, () => { this.chicken.setDepth(14); this.skin.setDepth(15); this.squash(this.chicken); this.hold(this.board, this.chicken); }));
      next(2000);
    } else if (n === 2) {      // da bay ra; ức gà thành 5 miếng liền (sẵn để cắt); dao bay vào
      this.flyOut([this.skin], 450);
      T(700, () => this.makePieces());
      T(800, () => this.flyIn(this.knife, ...TOOL_REST));
      next(1400);
    } else if (n === 3) {      // dao bay ra; gà miếng dồn sang trái thớt; bí và dao gọt bay vào
      this.flyOut([this.knife], 500);
      T(700, () => this.pieces.forEach((s, i) => { this.drop(s); this.tweens.add({ targets: s, x: PILE[i][0], y: PILE[i][1], duration: 380, delay: i * 50, ease: 'Quad.inOut', onComplete: () => this.hold(this.board, s) }); }));
      T(1200, () => {
        this.rinds = [];
        if (this.isReal('l9_pumpkin_rind_0')) {                   // G9-14: quả đã gọt + 10 miếng vỏ cắt từ chính quả, đặt đúng chỗ
          this.applyKey(this.pumpkin, 'l9_pumpkin_peeled');
          RIND_ON.forEach(([dx, dy], i) => this.rinds.push(this.img('l9_pumpkin_rind_' + i, PUMPKIN[0] + dx, PUMPKIN[1] + dy, 14)));
        } else for (const dx of RIND_X) {                        // khối: 5 cột x 2 hàng, cột ngắn dần về hai mép quả
          const k = Math.sqrt(1 - (dx / 112) ** 2);
          for (const r of [-1, 1]) {
            const s = this.img('l9_pumpkin_rind', PUMPKIN[0] + dx, PUMPKIN[1] + r * 40 * k, 14);
            s.baseY = s.base * k; s.setScale(s.base, s.baseY);
            this.rinds.push(s);
          }
        }
        this.kit(this.pumpkin, ...PUMPKIN, this.rinds.map((s) => [s, s.x, s.y]));
        this.flyIn(this.pumpkin, ...PUMPKIN);
        this.flyIn(this.peeler, ...TOOL_REST, 150);
      });
      next(1900);
    } else if (n === 4) {      // dao gọt bay ra; dao bay vào
      this.flyOut([this.peeler], 450);
      T(800, () => this.flyIn(this.knife, ...TOOL_REST));
      next(1400);
    } else if (n === 5) {      // bí thành hạt lựu; dao bay ra; nồi nước bay lên bếp
      T(250, () => {
        this.pumpkin.setVisible(false); this.cutG.clear();
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {          // G9-6: hạt lựu 4x4 tách ra, nảy nhẹ
          const s = this.img('l9_pumpkin_dice', PUMPKIN[0] + (c - 1.5) * 46, PUMPKIN[1] + (r - 1.5) * 32, 14 + r * 0.01);
          this.dice.push(this.hold(this.board, s));
          this.tweens.add({ targets: s.cr, ry: s.cr.ry - 10, duration: 90, delay: (r + c) * 25, yoyo: true, ease: 'Quad.out' });
        }
        this.sfx('l9_sfx_chop', 0.6);
      });
      this.flyOut([this.knife], 550);
      T(950, () => { this.potL = 1; this.flyIn(this.pot, ...POT_HOME); });
      next(1600);
    } else if (n === 6) {      // thớt trống (đang nghiêng) bay ra
      this.flyOut([this.board], 300);
      next(1100);
    } else if (n === 7) {      // nồi sôi: chuyển sang khuấy (G9-3 bỏ hớt bọt)
      next(900);
    } else if (n === 8) {      // đã tắt bếp (G9-14: người chơi xoay núm về 0); sau chớp sáng zoom ra về khung cũ (G9-9); máy xay bay vào
      this.flame = false; this.flameK = 0; this.knob.setAngle(0);
      T(1100, () => this.camZoom(false));
      T(1100 + ZOOM_MS + 100, () => { this.kit(this.blender, ...BLENDER, [[this.btn, ...BTN]]); this.btn.setVisible(true); this.flyIn(this.blender, ...BLENDER); });
      next(1100 + ZOOM_MS + 750);
    } else if (n === 9) {      // nồi về bếp; nắp bay xuống đóng khít miệng cối (nảy, "cạch") (G9-14)
      this.stream = null;
      this.tiltP = 0; this.tiltSet(this.pot, 0, -1, TILT_P);
      this.slideTo(this.pot, ...POT_HOME);
      T(350, () => {
        const L = this.lid;
        L.flying = false;
        L.setVisible(true).setAlpha(1).setAngle(0).setPosition(JAR[0], JAR[1] - 360);
        this.tweens.add({ targets: L, y: JAR[1] - (this.isReal('l9_blender_lid') ? 0 : LID_DY), duration: 420, ease: 'Bounce.out', onComplete: () => { this.sfx('l3_sfx_clack', 0.8); this.hold(this.blender, L); } });
      });
      next(1100);
    } else if (n === 10) {     // mở nắp cối: nắp nhấc lên bay ra (G9-14); rây trên tô bay vào (người chơi tự đổ cối vào rây ở bước 11)
      this.btn.setScale(this.btn.base); this.blender.setX(BLENDER[0]);
      T(250, () => {
        const L = this.drop(this.lid);
        this.tweens.chain({ targets: L, tweens: [
          { y: L.y - 40, duration: 180, ease: 'Quad.out' },
          { x: L.x - 700, y: L.y - 400, angle: -30, duration: 450, ease: 'Quad.in', onStart: () => { L.flying = true; this.sfx('sfx_whoosh', 0.5); } },
        ], onComplete: () => { L.flying = false; L.setVisible(false); } });
      });
      T(450, () => { this.kit(this.tureen, ...TUREEN, [[this.sieve, ...SIEVE]]); this.sieve.setVisible(true); this.flyIn(this.tureen, ...TUREEN); });
      next(1200);
    } else if (n === 11) {     // cối rỗng (đang nghiêng) bay ra
      this.stream = null;
      this.blender.setDepth(13); this.btn.setDepth(13.1);        // bay ra nằm trên rây
      this.flyOut([this.blender], 350);
      next(1000);
    } else if (n === 12) {     // rây, nồi bay ra; tô súp ra giữa bàn
      this.drop(this.sieve);
      this.flyOut([this.sieve, this.pot, this.stove, this.knob], 500);   // G9-11: bếp (cả núm) bay ra luôn
      T(1050, () => this.arcTo(this.tureen, ...TUREEN_MID, 450, 0));
      next(1700);
    } else if (n === 13) {     // G9-8: khay hộp rỗng và muôi bay vào
      this.heat = 0;
      T(500, () => { this.flyIn(this.tray, ...TRAY); this.ladleFull = false; this.flyIn(this.ladle, ...LADLE_R14, 160); });
      next(1300);
    } else if (n === 14) {     // hộp đã tự đóng, thắt nơ, bay đi (autoBox); 2 bát bay vào, muôi giữ chỗ
      T(200, () => { this.flyIn(this.bowls[0], ...BOWLS[0]); this.flyIn(this.bowls[1], ...BOWLS[1], 120); });
      next(1000);
    } else if (n === 15) this.finale();
  }

  // G9-6: sau khi gỡ da, gà vẫn là một tảng nguyên; cắt đủ 4 vết mới tách thành 5 dải (splitChicken).
  makePieces() {
    this.cuts = [false, false, false, false];
  }

  splitChicken() {
    this.drop(this.chicken);
    this.chicken.setVisible(false);
    const [cx, cy] = [this.chicken.x, this.chicken.y];
    this.pieces = STRIP_W.map((w, i) => {                        // 5 dải ngang liền nhau (sau trước), dải sau nằm lớp dưới
      const s = this.img('l9_chicken_piece', cx, cy + 4 + (i - 2) * STRIP_DY, 14 + i * 0.01);
      s.setScale(s.base * w, s.base);
      return this.hold(this.board, s);
    });
    this.pieces.forEach((s, i) => {                              // hé khe, nảy nhẹ
      this.tweens.add({ targets: s.cr, ry: s.cr.ry + (i - 2) * 6, duration: 260, delay: i * 30, ease: 'Back.out' });
    });
    this.sfx('l9_sfx_skin', 0.5);
  }

  // Vùng nhấp nháy khi xong bước (elip x, y, rx, ry).
  blinkAreas(n) {
    const pot = [POT_HOME[0], POT_HOME[1] + 60, 140, 120], bl = [JAR[0], JAR[1] + 90, 110, 130], tu = [this.tureen.x, this.tureen.y + 40, 175, 110];
    return {
      1: [[BASIN[0], BASIN[1] + 40, 180, 120]], 2: [[...CHICKEN_B, 125, 60]], 3: [[...CHICKEN_B, 125, 60]], 4: [[...PUMPKIN, 115, 100]], 5: [[...PUMPKIN, 115, 100]],
      6: [pot], 7: [pot], 8: [pot], 9: [bl], 10: [bl], 11: [[SIEVE[0], SIEVE[1] + 30, 140, 90]], 12: [tu], 13: [tu], 14: [[TRAY[0], TRAY[1] - 40, 160, 120]], 15: this.bowls.map((b) => [b.x, b.y + 25, 120, 80]),
    }[n];
  }

  // ---------- từng cử chỉ ----------
  // Bước 1: gà chà qua lại trong chậu (đang trong lòng nước và vừa di chuyển trong 150 ms).
  // G9-14: đang chà thì nước gợn (l9_basin_ripple), ngừng 0,3 giây thì phẳng lại (l9_basin_full).
  basinWater(time) {
    if (!this.isReal('l9_basin_ripple') || !this.basin.visible) return;
    const want = time - (this.rubAt || -1e9) < 300 ? 'l9_basin_ripple' : 'l9_basin_full';
    if (this.basin.key !== want) this.applyKey(this.basin, want);
  }

  washTick(time, dt) {
    const g = this.g;
    if (!g || g.k !== 'chicken') return;
    const c = this.chicken;
    if (!this.inEll(BASIN_E, c.x, c.y, 10) || time - g.moveAt > 150) return;
    this.rub += dt;
    this.rubAt = time;
    this.p = Math.min(1, this.rub / NEED.rub);
    this.ringTouchAt = time;
    this.loopSfx(time, 'l9_sfx_wash');
    this.every(time, 'ripple', 220, () => this.ripple(c.x + Phaser.Math.Between(-70, 70), c.y + Phaser.Math.Between(-50, 50)));
    this.every(time, 'bub', 160, () => this.bubbleUp(c.x + Phaser.Math.Between(-80, 80), c.y + Phaser.Math.Between(-50, 50)));
    if (this.p >= 1) this.stepDone(1);
  }

  // Bước 2: kéo da: dính theo tay (giãn, lệch nhẹ) rồi mới rời ra.
  skinPull(x, y) {
    const g = this.g, s = this.skin, dx = x - g.x0, dy = y - g.y0, d = Math.hypot(dx, dy);
    if (d < NEED.skin) {
      s.setPosition(g.ox + dx * 0.35, g.oy + dy * 0.35).setAngle(Phaser.Math.Clamp(dx / 8, -14, 14)).setScale(s.base * (1 + d / 600), s.base * (1 - d / 900));
      this.p = Math.min(0.9, (d / NEED.skin) * 0.9);
      this.ringTouchAt = this.time.now;
      return;
    }
    s.setPosition(x, y).setScale(s.base).setAngle(dx / 10);
    this.sfx('l9_sfx_skin');
    this.hop(s, 16, 200);
    this.stepDone(2);
  }

  // ---------- bước 3, 5 (G9-3 → G9-6): kéo dao thả lên thớt, rồi mỗi lần chạm là một nhát chặt ----------
  // Dao nằm ngang bên phải món, chặt bập bênh theo đường ngang; các nhát đi từ trên xuống dưới.
  // Gà: tảng nguyên, mỗi nhát để một vết, đủ 4 vết mới tách miếng. Bí: lượt 1 cắt ngang 3 vết, quả xoay 90° (vết thành dọc),
  // lượt 2 cắt ngang 3 vết nữa (thành lưới), xong mới tách hạt lựu 4x4.
  // Đường cắt kế tiếp [tâm món x, y đường cắt]. null: hết (hoặc đang xoay bí).
  cutLine() {
    if (this.step === 3) { const i = this.cuts.findIndex((c) => !c); return i < 0 ? null : [CHICKEN_B[0], CHICKEN_B[1] + CH_CUTS[i]]; }
    const list = (this.cutLines || []).length < CUT5.length ? this.cutLines || [] : this.cutLines2;
    const l = CUT5.find((v) => !list.includes(v));
    return l === undefined ? null : [PUMPKIN[0], PUMPKIN[1] + l];
  }

  // Dao bập bênh: điểm tựa (mép lưỡi, 1/3 dao từ cán) đặt ở piv, k 0 = nằm phẳng ép qua món, 1 = phía mũi nâng ROCK độ.
  knifePose([px, py], k) {
    const a = ROCK * k, r = R(a), [vx, vy] = KNIFE_PIV;
    this.knife.setAngle(a).setPosition(px + vx * Math.cos(r) - vy * Math.sin(r), py + vx * Math.sin(r) + vy * Math.cos(r));
  }

  pivAt(L) { return [L[0] + PIV[0], L[1] + PIV[1]]; }

  // Thả dao lên thớt: điểm tựa ở mép phải món, phía mũi nâng sẵn trên đường cắt kế tiếp.
  setKnife() {
    const L = this.cutLine();
    if (!L) return;
    this.knifeSet = true;
    this.knife.setDepth(22);
    const K = this.knife, x0 = K.x, y0 = K.y, a0 = K.angle, o = { t: 0 };
    this.tweens.add({ targets: o, t: 1, duration: 220, ease: 'Quad.out', onUpdate: () => {
      this.knifePose(this.pivAt(L), 1);
      K.setPosition(x0 + (K.x - x0) * o.t, y0 + (K.y - y0) * o.t).setAngle(a0 + (K.angle - a0) * o.t);
    } });
    this.sfx('l9_sfx_land', 0.4);
  }

  // Một lần chạm (G9-5): phía mũi hạ xuống quanh điểm tựa, lưỡi ép qua món ("cộp"), tách một dải gà / thêm một vết trên bí;
  // phía mũi nâng lên lại, điểm tựa trượt xuống đường cắt kế tiếp. Cả nhát ~0,21 giây.
  chop() {
    const L = this.cutLine();
    if (!L || this.chopping || this.turning) return;
    this.chopping = true;
    this.touch();
    this.handHide('paw');
    this.tweens.killTweensOf(this.knife);
    const piv = this.pivAt(L), o = { k: 1 };
    this.knifePose(piv, 1);
    this.tweens.add({ targets: o, k: 0, duration: 90, ease: 'Quad.in', onUpdate: () => this.knifePose(piv, o.k), onComplete: () => {
      this.cut(L[1]);
      if (this.done >= this.step) { this.chopping = false; return; }
      const p2 = this.pivAt(this.cutLine() || L), q = { k: 0 };
      this.tweens.add({ targets: q, k: 1, duration: 120, ease: 'Quad.out',
        onUpdate: () => this.knifePose([piv[0] + (p2[0] - piv[0]) * q.k, piv[1] + (p2[1] - piv[1]) * q.k], q.k),
        onComplete: () => { this.chopping = false; } });
    } });
  }

  // Một nhát dao ở đường ngang y: để lại một vết (gà / bí). Gà đủ 4 vết thì tách miếng; bí xong lượt 1 thì xoay, xong lượt 2 thì xong.
  cut(y) {
    this.ringTouchAt = this.time.now;
    this.sfx('l9_sfx_chop');
    this.vibrate(15);
    if (this.step === 3) {
      const i = this.cuts.findIndex((c) => !c);
      if (i < 0) return;
      this.cuts[i] = true;
      this.cutFlash(CHICKEN_B[0], CHICKEN_B[1] + CH_CUTS[i], 220);
      this.wiggle(this.chicken, 2, 2, 140);
      const k = this.cuts.filter(Boolean).length;
      this.p = k / NEED.cuts3;
      if (k >= NEED.cuts3) { this.time.delayedCall(120, () => this.splitChicken()); this.time.delayedCall(520, () => this.stepDone(3)); }
      return;
    }
    const pass1 = (this.cutLines = this.cutLines || []).length < CUT5.length, used = pass1 ? this.cutLines : this.cutLines2;
    const l = CUT5.find((v) => !used.includes(v));
    if (l === undefined) return;
    used.push(l);
    const py = PUMPKIN[1], hw = PUMP_RX * Math.sqrt(1 - (l / PUMP_RY) ** 2);
    this.cutFlash(PUMPKIN[0], py + l, 2 * hw);
    this.wiggle(this.pumpkin, 2, 2, 160);
    const k = this.cutLines.length + this.cutLines2.length;
    this.p = k / NEED.cuts5;
    if (k >= NEED.cuts5) { this.stepDone(5); return; }
    if (pass1 && this.cutLines.length >= CUT5.length) this.turnPumpkin();
  }

  // Xong lượt 1: quả bí tự xoay 90° trên thớt (vết ngang thành dọc, quả nhún nhẹ), dao chờ giơ sẵn; xoay xong mới chặt tiếp.
  turnPumpkin() {
    this.turning = true;
    this.time.delayedCall(220, () => {
      this.sfx('sfx_whoosh', 0.4);
      this.tweens.add({ targets: this, pumpRot: 1, duration: 450, ease: 'Sine.inOut', onComplete: () => { this.turning = false; this.squash(this.pumpkin); } });
      this.tweens.add({ targets: this.pumpkin, scaleX: this.pumpkin.base * 0.9, duration: 225, yoyo: true, ease: 'Sine.inOut' });
    });
  }

  // Vết dao trên tảng gà / quả bí, vẽ lại mỗi khung (vết lượt 1 của bí xoay theo quả).
  drawCuts() {
    const g = this.cutG.clear();
    if (this.step === 3 && this.chicken.visible && this.cuts) {
      const [cx, cy] = [this.chicken.x, this.chicken.y];
      this.cuts.forEach((c, i) => {
        if (!c) return;
        const dy = CH_CUTS[i] - 4, hw = 104 * Math.sqrt(Math.max(0, 1 - (dy / 50) ** 2));   // so với tâm hình gà (thấp hơn neo ~4px)
        g.lineStyle(3, 0xffffff, 0.8).lineBetween(cx - hw, cy + CH_CUTS[i] + 3, cx + hw, cy + CH_CUTS[i] + 3);  // mép sáng
        g.lineStyle(5, 0x9a4f45, 1).lineBetween(cx - hw, cy + CH_CUTS[i], cx + hw, cy + CH_CUTS[i]);
      });
    }
    const pk = this.pumpkin;
    this.stem.setVisible(false);                                 // chủ dự án: bỏ cuống bí
    if (!pk.visible) return;
    // G9-14: bí xoay 90° là xoay cả quả (ảnh) quanh tâm; cuống và vết cắt lượt 1 xoay theo.
    if (this.pumpRot > 0) pk.setAngle(-90 * this.pumpRot);
    const cx = pk.x, cy = pk.y, K = PUMP_RY / PUMP_RX;
    // Cuống (G9-10): gốc cuống ở mép trên quả, hướng ra ngoài; xoay cùng quả quanh cùng tâm (và theo góc quả lúc bay vào).
    const th0 = R(pk.angle), sn = Math.sin(th0), cs = Math.cos(th0) * K;
    this.stem.setPosition(cx + (PUMP_RX - 6) * sn, cy - (PUMP_RX - 6) * cs).setRotation(Math.atan2(sn, cs)).setAlpha(pk.alpha);
    if (!this.cutLines) return;
    const line = (l, th) => {                                    // vạch ngang ở l (px màn hình) trên mặt quả, xoay th
      const v = l / K, u = Math.sqrt(Math.max(0, PUMP_RX ** 2 - v * v)), c = Math.cos(th), s = Math.sin(th);
      const P = (a) => [cx + a * c - v * s, cy + (a * s + v * c) * K];
      g.lineStyle(5, 0x8a5a2a, pk.alpha).lineBetween(...P(-u), ...P(u));
    };
    this.cutLines.forEach((l) => line(l, R(pk.angle)));   // xoay ngược kim đồng hồ: cuống sang trái, không bị dao bên phải che
    this.cutLines2.forEach((l) => line(l, 0));
  }

  // Vệt sáng ngang dọc theo đường cắt (rộng w).
  cutFlash(x, y, w) {
    const g = this.add.graphics().setDepth(D.fx);
    g.lineStyle(6, 0xffffff, 1).lineBetween(x - w / 2, y, x + w / 2, y);
    this.tweens.add({ targets: g, alpha: 0, duration: 300, onComplete: () => g.destroy() });
  }

  // Bước 4 (G9-3): đầu dao gọt chạm miếng vỏ nào thì miếng đó bong ra rơi xuống (tính ở đầu dao, không ở ngón tay).
  peelTick() {
    const g = this.g;
    if (!g || g.k !== 'peel') return;
    const [tx, ty] = this.local(this.peeler, -PEEL_TIP, 0);
    for (const s of this.rinds) if (s.cr && this.hitS(s, tx, ty, 6)) this.peel(s);
  }

  peel(s) {
    this.drop(s);
    s.setDepth(23);
    const dir = s.x < PUMPKIN[0] ? -1 : 1;
    this.tweens.add({ targets: s, x: s.x + dir * 70, y: s.y + 260, angle: dir * 220, scaleY: s.baseY * 0.45, alpha: 0, duration: 650, ease: 'Quad.in', onComplete: () => s.setVisible(false) });
    this.sfx('l9_sfx_peel');
    this.ringTouchAt = this.time.now;
    const k = this.rinds.filter((o) => !o.cr).length;
    this.p = k / NEED.rinds;
    if (k >= NEED.rinds) this.stepDone(4);
  }

  // Bước 6 (G9-3): thả thớt vào vùng nồi thì thớt tự nghiêng, gà và bí lần lượt nhảy từng miếng vào nồi (tõm, nước bắn nhẹ).
  nearPot(b) { return Math.min(Math.hypot(b.x - POT_HOME[0], b.y - POT_HOME[1]), Math.hypot(b.x - POUR_B[0], b.y - POUR_B[1])) < 300; }

  autoBoard() {
    const b = this.board;
    this.trans = true;                                            // tự diễn: khoá chạm, ẩn gợi ý
    this.autoRing = true;
    this.tweens.add({ targets: b, x: POUR_B[0], y: POUR_B[1], duration: 280, ease: 'Quad.out' });
    const o = { k: 0 };
    this.tweens.add({ targets: o, k: 1, delay: 260, duration: 350, ease: 'Quad.out', onUpdate: () => this.tiltSet(b, o.k, 1, TILT_B) });
    const kids = [...this.pieces, ...this.dice].filter((s) => s.cr && s.cr.p === b && s.visible).sort((p, q) => q.cr.rx - p.cr.rx);
    // G9-5: miếng bay ở lớp trên thớt; gần tới miệng nồi thì xuống dưới lớp nồi (chìm sau mép nồi). Nối nhau mỗi POUR_GAP ms;
    // tiếng tõm / nước bắn chỉ mỗi miếng thứ ba cho đỡ rối.
    kids.forEach((s, i) => this.time.delayedCall(700 + i * POUR_GAP, () => {
      this.drop(s);
      s.setDepth(14.5);
      const a = Math.random() * Math.PI * 2, r = Math.random() * 70, tx = POT_HOME[0] + Math.cos(a) * r, ty = POT_HOME[1] + Math.sin(a) * r * FLAT;
      const x0 = s.x, y0 = s.y;
      this.tweens.addCounter({ from: 0, to: 1, duration: 300, ease: 'Sine.inOut', onUpdate: (tw) => {
        const k = tw.getValue();
        s.setPosition(x0 + (tx - x0) * k, y0 + (ty - y0) * k - 80 * Math.sin(Math.PI * k));
        if (k > 0.8 && s.depth > 8) s.setDepth(7.9);
      }, onComplete: () => {
        s.setVisible(false); this.potFood++;
        if (i % 3 === 0) { this.sfx('l9_sfx_plop', 0.5); this.splashAt(tx, ty, WATER_C, 3); }
        this.poured++; this.p = this.poured / kids.length; this.ringTouchAt = this.time.now;
      } });
    }));
    this.time.delayedCall(700 + kids.length * POUR_GAP + 600, () => this.stepDone(6));
  }

  // Bước 7: xoay núm theo vòng 270° thì lửa xanh bùng; nồi sôi dần (tự chạy), muôi bay vào lúc chờ sôi.
  // G9-14: khuấy xong là xong một bước (chớp sáng, ting, vòng tiến độ nổ) rồi sang bước tắt bếp: xoay núm ngược chiều lúc bật về 0.
  stirDone() {
    if (this.offKnob) return;
    this.offKnob = true;
    const g = this.g;
    if (g && g.s && g.s.depth0 !== undefined) { g.s.setDepth(g.s.depth0); g.s.depth0 = undefined; }
    this.g = null;
    this.trans = true;
    this.p = 1;
    this.doneBlink([[POT_HOME[0], POT_HOME[1] + 60, 140, 120]]);
    this.ringPop();
    this.sfx('l9_sfx_ting_big');
    this.vibrate(30);
    this.flyOut([this.ladle], 400);
    this.time.delayedCall(900, () => { this.p = 0; this.trans = false; this.hintHoldUntil = this.time.now; this.touch(); });
  }

  // Xoay núm ngược chiều kim đồng hồ: lửa nhỏ dần theo góc núm, về 0 thì tắt hẳn, nồi hết sôi.
  knobOffTurn(x, y) {
    const g = this.g, a = Math.atan2(y - KNOB[1], x - KNOB[0]);
    if (Math.hypot(x - KNOB[0], y - KNOB[1]) < 18) { g.a = a; return; }
    const d = wrapA(a - g.a);
    g.a = a;
    if (d >= 0) return;                                          // chỉ tính chiều ngược (về tắt)
    const prev = this.knobAcc;
    this.knobAcc = Math.max(0, this.knobAcc + Phaser.Math.RadToDeg(d));
    this.knob.setAngle(this.knobAcc);
    this.flameK = this.knobAcc / NEED.knob;
    if (Math.floor(this.knobAcc / 45) < Math.floor(prev / 45)) this.sfx('l9_sfx_click', 0.4);
    this.p = 1 - this.knobAcc / NEED.knob;
    this.ringTouchAt = this.time.now;
    if (this.knobAcc <= 0) { this.flame = false; this.flameK = 0; this.sfx('l9_sfx_click'); this.stepDone(8); }
  }

  knobTurn(x, y) {
    const g = this.g, a = Math.atan2(y - KNOB[1], x - KNOB[0]);
    if (Math.hypot(x - KNOB[0], y - KNOB[1]) < 18) { g.a = a; return; }
    const d = wrapA(a - g.a);
    g.a = a;
    const prev = this.knobAcc;
    this.knobAcc = Math.min(NEED.knob, this.knobAcc + Math.abs(Phaser.Math.RadToDeg(d)));
    this.knob.setAngle(this.knobAcc);
    if (Math.floor(this.knobAcc / 45) > Math.floor(prev / 45)) this.sfx('l9_sfx_click', 0.4);
    this.p = 0.5 * (this.knobAcc / NEED.knob);
    this.ringTouchAt = this.time.now;
    if (this.knobAcc >= NEED.knob && !this.flame) this.ignite();
  }

  ignite() {
    this.flame = true;
    this.g = null;
    this.autoRing = true;
    this.sfx('l9_sfx_ignite');
    this.tweens.chain({ targets: this, tweens: [{ flameK: 1.3, duration: 180, ease: 'Quad.out' }, { flameK: 1, duration: 220 }] });
    this.camZoom(true);                                          // G9-10: zoom vào nồi ngay khi lửa bùng, giữ qua chờ sôi và khuấy
    this.time.delayedCall(300, () => { this.flyIn(this.ladle, ...LADLE_Z); });
    this.time.delayedCall(900, () => { if (this.step === 7) this.pawStart(2); }); // chân thò lên từ mép dưới khung zoom
  }

  boilTick(time, dt) {
    if (this.step !== 7 || !this.flame) return;
    this.boil += dt;
    const k = Math.min(1, this.boil / NEED.boil);
    this.p = 0.5 + 0.5 * k;
    this.ringTouchAt = time;
    this.every(time, 'boilB', 420 - 300 * k, () => this.potBubble());
    if (k > 0.5) this.every(time, 'steam', 360, () => this.steamPuff(POT_HOME[0] + Phaser.Math.Between(-70, 70), POT_HOME[1] + Phaser.Math.Between(-30, 20), 0.5 * k));
    if (k > 0.6) this.loopSfx(time, 'l9_sfx_boil', 0.35);
    if (k > 0.4) this.potFish(time);                            // khói thơm hình cá bay lên từ nồi (như demo nấu)
    if (k >= 1) this.stepDone(7);
  }

  // Bước 8 (G9-3): kéo muôi vòng tròn trong nồi: súp xoáy theo, gà và bí trôi vòng theo muôi, chìm nổi;
  // muôi chạm thành nồi kêu nhẹ. Khoảng 3 vòng thì đầy vòng tiến độ.
  stirPotTick(time) {
    const g = this.g;
    if (!g || g.k !== 'stirpot') return;
    const L = this.ladle, dx = L.x - POT_HOME[0], dy = (L.y - POT_HOME[1]) / FLAT, nr = Math.hypot(dx, dy) / POT_R;
    if (nr > 1.3) { g.a = null; return; }
    this.ringTouchAt = time;
    const a = Math.atan2(dy, dx);
    if (g.a !== null && nr > 0.12) {
      const d = wrapA(a - g.a);
      this.potStir = Math.min(NEED.stirPot, this.potStir + Math.abs(Phaser.Math.RadToDeg(d)));
      if (Math.abs(d) > 0.005) { this.swirl += d; this.swirlAt = time; this.loopSfx(time, 'l9_sfx_boil', 0.3); }
    }
    g.a = a;
    if (nr > 0.8 && time - g.moveAt < 100 && time - this.tinkAt > 450) { this.tinkAt = time; this.sfx('l9_sfx_click', 0.35); }
    if (this.step !== 8 || this.trans) return;                  // bước 7: vòng tiến độ vẫn là chờ sôi
    this.p = this.potStir / NEED.stirPot;
    if (this.potStir >= NEED.stirPot) this.stirDone();
  }

  // Bước 9: giữ nồi cạnh máy xay thì nồi nghiêng xoay thật về phía máy xay, súp chảy từ miệng nồi thành dòng vào cối.
  potTick(time, dt) {
    const g = this.g, pot = this.pot;
    const over = g && g.k === 'pot' && Math.hypot(pot.x - POUR_P[0], pot.y - POUR_P[1]) < 200;
    this.tiltP += ((over ? 1 : 0) - this.tiltP) * Math.min(1, dt / 110);
    this.tiltSet(pot, this.tiltP, -1, TILT_P);
    this.stream = null;
    if (!over) return;
    this.ringTouchAt = time;
    if (this.tiltP < 0.7) return;
    this.pourFlow(pot, 125, 62, -1, [JAR[0] + 6, JAR[1] + 2], [JAR[0], JAR[1] + 178 - 160 * this.bl], this.tiltP, this.potL);
    this.potL = Math.max(0, this.potL - dt / NEED.pour);
    this.bl = 1 - this.potL;
    this.p = this.bl;
    this.loopSfx(time, 'l9_sfx_pour', 0.4);
    if (this.potL <= 0) this.stepDone(9);
  }

  // G9-7: dòng đổ ra từ điểm thấp nhất của miệng (elip rx, ry quanh điểm neo, xoay theo góc nghiêng), tới đích to (miệng cối / rây);
  // surf: chỗ mặt súp gợn và bắn giọt. Dòng to dần theo độ nghiêng (≥ 0,7 mới chảy), nhỏ dần khi gần cạn rồi đứt thành giọt.
  pourFlow(s, rx, ry, dir, to, surf, tilt, level) {
    const th = R(s.angle), a = rx * Math.sin(th), b = ry * Math.cos(th), t = Math.atan2(b, a);
    const k = Phaser.Math.Clamp((tilt - 0.7) / 0.3, 0, 1) * Math.min(1, level / 0.15);
    this.stream = { p0: this.local(s, rx * Math.cos(t), ry * Math.sin(t)), p1: to, surf, dir, k };
  }

  // Bước 10: giữ nút: máy xay rung, súp lợn cợn → sánh → mịn; thả tay thì dừng, giữ lại xay tiếp.
  blendTick(time, dt) {
    const g = this.g;
    if (!g || g.k !== 'btn') return;
    this.holdMs += dt;
    this.p = Math.min(1, this.holdMs / NEED.blend);
    this.blStage = Math.min(2, Math.floor(this.p * 3));
    this.blender.setX(BLENDER[0] + Math.sin(time / 18) * 3);
    this.ringTouchAt = time;
    this.loopSfx(time, 'l9_sfx_blend', 0.5);
    if (this.p >= 1) this.stepDone(10);
  }

  // Bước 11 (G9-3): giữ cối máy xay cạnh rây thì cối nghiêng xoay thật, súp chảy từ miệng cối vào rây (như đổ nồi ở bước 9).
  blPourTick(time, dt) {
    const g = this.g, B = this.blender;
    const over = g && g.k === 'bl' && Math.hypot(B.x - POUR_BL[0], B.y - POUR_BL[1]) < 200;
    this.tiltBl += ((over ? 1 : 0) - this.tiltBl) * Math.min(1, dt / 110);
    this.tiltSet(B, this.tiltBl, 1, TILT_BL);
    this.stream = null;
    if (!over) return;
    this.ringTouchAt = time;
    if (this.tiltBl < 0.7) return;
    this.pourFlow(B, 100, 33, 1, [SIEVE[0] - 30, SIEVE[1] + 4], [SIEVE[0] - 20, SIEVE[1] + 6], this.tiltBl, this.bl);
    this.bl = Math.max(0, this.bl - dt / NEED.pour);
    this.sieveL = 1 - this.bl;
    this.p = this.sieveL;
    this.loopSfx(time, 'l9_sfx_pour', 0.4);
    if (this.bl <= 0) this.stepDone(11);
  }

  // Bước 12: khuấy vòng trên rây: súp mịn lọt xuống tô.
  stirTurn(x, y) {
    const g = this.g, a = Math.atan2(y - SIEVE_E[1], x - SIEVE_E[0]);
    if (Math.hypot(x - SIEVE_E[0], y - SIEVE_E[1]) < 25) { g.a = a; return; }
    const d = wrapA(a - g.a);
    g.a = a;
    this.stirAcc = Math.min(NEED.stir, this.stirAcc + Math.abs(Phaser.Math.RadToDeg(d)));
    this.p = this.stirAcc / NEED.stir;
    this.sieveL = 1 - this.p; this.tureenL = this.p; this.fv.tu = this.p;
    this.ringTouchAt = this.time.now;
    const t = this.time.now;
    this.loopSfx(t, 'l9_sfx_sieve', 0.5);
    this.every(t, 'swirl', 90, () => this.swirlDot(x, y));
    if (this.p >= 1) this.stepDone(12);
  }

  // Bước 13: mỗi lần chạm vào tô là một hơi thổi: hơi nóng nhỏ dần rồi tắt.
  blowTap(x, y) {
    this.touch();
    this.handHide('paw');
    this.taps++;
    this.heat = Math.max(0, 1 - this.taps / NEED.taps);
    this.p = this.taps / NEED.taps;
    this.ringTouchAt = this.time.now;
    this.sfx('l9_sfx_blow', 0.6);
    this.puff(x, y);
    this.tweens.add({ targets: this.tureen, scaleX: this.tureen.base * 1.03, duration: 70, yoyo: true });
    if (this.taps >= NEED.taps) this.stepDone(13);
  }

  // Bước 14 (G9-8): muôi nhúng vào tô (đầy muôi), đưa qua khay thì đổ: 3 muôi đầy khay, rồi hộp tự đóng (autoBox).
  // Bước 15: như trên nhưng đổ vào bát: mỗi bát 3 muôi tới vạch chân mèo. Tô đủ súp cho cả hai bước (mỗi muôi hạ 0,09).
  serveTick(time, dt) {
    const g = this.g;
    this.glow = null;
    if (!g || g.k !== 'serve') return;
    const lx = this.ladle.x, ly = this.ladle.y, t = this.tureen;                 // lòng muôi (điểm neo muôi, trên ngón tay GRAB px)
    const TE = [t.x, t.y, 150, 75], inT = this.inEll(TE, lx, ly, HEAD_R);
    if (inT || this.ladleFull) this.ringTouchAt = time;
    if (!this.ladleFull && inT) {
      this.glow = TE;
      g.dwell += dt;
      if (g.dwell > 120) { this.ladleFull = true; g.dwell = 0; this.scoopN++; this.tureenL = this.scoopN >= NEED.scoops * 3 ? 0 : Math.max(0.12, this.tureenL - 0.09); this.fvTo('tu', this.tureenL); this.sfx('l9_sfx_scoop', 0.7); }   // muôi cuối: tô cạn hẳn
      return;
    }
    g.dwell = 0;
    if (!this.ladleFull) return;
    if (this.step === 14) {
      const T = this.tray, E = [T.x, T.y, 115, 45];
      if (!this.inEll(E, lx, ly, HEAD_R)) return;
      this.glow = E;
      this.ladleFull = false;
      this.trayF++;
      this.fvTo('tray', this.trayF / NEED.scoops);
      this.sfx('l9_sfx_serve', 0.8);
      this.splashAt(T.x, T.y, SOUP_C, 5);
      this.p = this.trayF / NEED.scoops;
      if (this.trayF >= NEED.scoops) { this.sparkleAt(T.x, T.y, 60); this.autoBox(); }
      return;
    }
    this.bowls.forEach((b, i) => {
      const E = [b.x, b.y, 110, 55];
      if (!this.ladleFull || this.bowlF[i] >= NEED.scoops || !this.inEll(E, lx, ly, HEAD_R)) return;
      this.glow = E;
      this.ladleFull = false;
      this.bowlF[i]++;
      this.fvTo('b' + i, this.bowlF[i] / NEED.scoops);
      this.sfx('l9_sfx_serve', 0.8);
      this.splashAt(b.x, b.y, SOUP_C, 5);
      if (this.bowlF[i] >= NEED.scoops) { this.sparkleAt(b.x, b.y, 60); this.sfx('l9_sfx_ting', 0.6); }
      const k = this.bowlF[0] + this.bowlF[1];
      this.p = k / (NEED.scoops * 2);
      if (this.p >= 1) this.stepDone(15);
    });
  }

  // G9-11: miệng tô / khay / bát sáng nhẹ khi lòng muôi lướt vào vùng múc / đổ (giữ sáng ~250 ms cho mắt kịp thấy).
  drawGlow(time) {
    const g = this.glowG.clear();
    if (this.glow) { this.glowAt = time; this.glowE = this.glow; }
    const k = 1 - (time - (this.glowAt || -1e9)) / 250;
    if (k <= 0 || !this.glowE || this.phase !== 'search') return;
    const [x, y, rx, ry] = this.glowE;
    g.fillStyle(0xffffff, 0.22 * k).fillEllipse(x, y, rx * 2, ry * 2);
    g.lineStyle(5, 0xfff3c4, 0.8 * k).strokeEllipse(x, y, rx * 2 + 8, ry * 2 + 8);
  }

  // G9-8: khay đầy thì tự diễn ~2 giây: nắp hạ đậy kín → ruy băng quấn quanh hộp → thắt nơ trên nắp → hộp nảy, "ting" → bay đi.
  autoBox() {
    this.trans = true;                                            // tự diễn: khoá chạm, ẩn gợi ý
    const g = this.g;
    if (g && g.s && g.s.depth0 !== undefined) { g.s.setDepth(g.s.depth0); g.s.depth0 = undefined; }
    this.g = null;
    this.slideTo(this.ladle, ...LADLE_R14, 0);
    const T = this.tray, L = this.trayLid, B = this.box, at = (ms, fn) => this.time.delayedCall(ms, fn);
    Object.assign(B, { rib: 0, bow: 0, on: true });
    L.setVisible(true).setAlpha(1).setAngle(0).setPosition(T.x, T.y - 320);
    at(150, () => this.tweens.add({ targets: L, y: T.y - 18, duration: 380, ease: 'Bounce.out', onComplete: () => {   // G9-14: nắp cao hơn 12px, khít miệng khay
      this.sfx('l9_sfx_land', 0.6); this.hold(T, L);
    } }));
    at(600, () => { this.sfx('l9_sfx_skin', 0.4); this.tweens.add({ targets: B, rib: 1, duration: 650, ease: 'Sine.inOut' }); });
    at(1300, () => this.tweens.add({ targets: B, bow: 1, duration: 280, ease: 'Back.out' }));
    at(1600, () => { this.sfx('l9_sfx_ting', 0.8); this.tweens.add({ targets: T, y: T.y - 26, duration: 120, yoyo: true, ease: 'Quad.out' }); this.sparkleAt(T.x, T.y - 70, 70); });
    at(1900, () => { this.sfx('sfx_whoosh', 0.6); T.flying = true; this.tweens.add({ targets: T, x: T.x + 700, y: T.y - 900, angle: 20, duration: 550, ease: 'Quad.in',
      onComplete: () => { T.flying = false; T.setVisible(false); L.setVisible(false); B.on = false; } }); });
    at(2350, () => this.stepDone(14));
  }

  // ---------- chân mèo thò lên nghịch đồ (3 lần cố định) ----------
  // 1: chân đen khều một miếng gà ra mép bàn; 2: chân trắng vỗ cái muôi; 3: chân đen thò về phía tô súp (bước 13).
  // Chạm chân: rụt lại thật nhanh, "meo" nhỏ. Để mặc 3 giây: lấy mất miếng gà / muôi lăn rồi tự về chỗ / chấm một chút súp.
  pawStart(n) {
    if (this.pawEv || this.phase !== 'search') return;
    const s = n === 2 ? this.pawS.white : this.pawS.black;
    const E = this.pawEv = { n, s, t: 0, live: false };
    if (n === 1) {
      const left = this.pieces.filter((o) => o.visible && o.cr);
      if (!left.length) { this.pawEv = null; return; }
      E.item = left.reduce((a, b) => (b.y > a.y || (b.y === a.y && b.x > a.x) ? b : a));
      E.home = [E.item.x, E.item.y];
      E.at = [E.item.x + 12, E.item.y + PAW_OFF];
    } else if (n === 2) {
      E.at = [this.ladle.x - 10, this.ladle.y + PAW_OFF + 20];
    } else {
      E.at = [this.tureen.x + 130, this.tureen.y + 60 + PAW_OFF];
      s.setAngle(-12);
    }
    s.setVisible(true).setPosition(E.at[0], PAW_HIDE);
    this.sfx('l9_sfx_scratch', 0.4);
    this.tweens.add({ targets: s, y: E.at[1], duration: 420, ease: 'Back.out', onComplete: () => {
      if (this.pawEv !== E) return;
      E.live = true;
      if (n === 1) { this.drop(E.item); E.item.setDepth(25); }
    } });
  }

  pawTick(time, dt) {
    const E = this.pawEv;
    if (!E || !E.live || this.frozen) return;
    E.t += dt;
    const k = Math.min(1, E.t / PAW_WAIT), s = E.s;
    if (E.n === 1) {                                             // khều miếng gà trượt dần ra mép bàn
      E.item.setPosition(E.home[0] + 14 * k, E.home[1] + (EDGE_Y - 50 - E.home[1]) * k);
      s.setPosition(E.item.x + 12, E.item.y + PAW_OFF + Math.sin(E.t / 90) * 6);
    } else if (E.n === 2) {                                      // vỗ vỗ cái muôi
      const ph = (E.t % 450) / 450;
      s.y = E.at[1] - Math.max(0, Math.sin(ph * Math.PI)) * 26;
      if (ph < 0.06 && E.lastPat !== Math.floor(E.t / 450)) { E.lastPat = Math.floor(E.t / 450); this.hop(this.ladle, 8, 160); this.sfx('l9_sfx_click', 0.3); }
    } else {                                                     // thò dần về phía tô
      s.y = E.at[1] - 50 * k + Math.sin(E.t / 120) * 5;
    }
    if (E.t >= PAW_WAIT) this.pawSteal();
  }

  pawTap(x, y) {
    const E = this.pawEv;
    if (!E || !this.hitS(E.s, x, y, 35) || y > EDGE_Y + 30) return false;
    this.touch();
    this.pawEv = null;
    if (E.n === 2) this.ladleFree = true;                       // G9-15: chân bắt đầu rụt là cầm muôi được
    this.tweens.killTweensOf(E.s);
    this.tweens.add({ targets: E.s, y: PAW_HIDE, duration: 160, ease: 'Quad.in', onComplete: () => E.s.setVisible(false).setAngle(0) });
    this.time.delayedCall(180, () => this.sfx('l9_sfx_paw_meow', 0.5));
    if (E.n === 1 && E.item) this.tweens.add({ targets: E.item, x: E.home[0], y: E.home[1], duration: 280, onComplete: () => { E.item.setDepth(14); this.hold(this.board, E.item); } });
    return true;
  }

  // Bỏ ngang (người chơi cầm muôi lúc chân đang vỗ, hoặc vào kết màn): chân rụt, muôi về chỗ.
  pawCancel() {
    const E = this.pawEv;
    if (!E) return;
    this.pawEv = null;
    this.tweens.killTweensOf(E.s);
    this.tweens.add({ targets: E.s, y: PAW_HIDE, duration: 160, onComplete: () => E.s.setVisible(false).setAngle(0) });
    this.tweens.killTweensOf(this.ladle);
    this.ladle.setAngle(0);
  }

  pawSteal() {
    const E = this.pawEv;
    this.pawEv = null;
    const s = E.s, chew = () => { this.sfx('l9_sfx_chew', 0.6); this.time.delayedCall(350, () => this.sfx('l9_sfx_chew', 0.6)); };
    if (E.n === 1) {                                             // lấy mất miếng gà (không mất bước)
      const it = E.item;
      this.tweens.add({ targets: [s, it], y: '+=360', duration: 280, ease: 'Quad.in', onComplete: () => { it.setVisible(false); s.setVisible(false); } });
      this.pieces = this.pieces.filter((o) => o !== it);
      this.time.delayedCall(350, chew);
    } else if (E.n === 2) {                                      // muôi lăn lóc rồi tự về chỗ
      this.ladleFree = true;                                     // G9-15: cầm được ngay, bắt muôi giữa lúc lăn
      this.tweens.add({ targets: s, y: PAW_HIDE, duration: 220, onComplete: () => s.setVisible(false) });
      const L = this.ladle, [hx, hy] = [L.x, L.y];
      this.sfx('l1_sfx_can_roll', 0.5);
      this.tweens.chain({ targets: L, tweens: [
        { x: hx + 90, angle: 300, duration: 600, ease: 'Quad.out' }, { x: hx, y: hy, angle: 0, duration: 600, delay: 200, ease: 'Quad.inOut' },
      ] });
    } else {                                                     // chấm một chút súp rồi rụt
      const dot = this.add.circle(0, 0, 9, SOUP_C).setDepth(27).setVisible(false);
      this.tweens.chain({ targets: s, tweens: [
        { y: s.y - 50, duration: 180, ease: 'Quad.out', onComplete: () => dot.setVisible(true) },
        { y: PAW_HIDE, duration: 300, ease: 'Quad.in', onUpdate: () => dot.setPosition(s.x + 4, s.y - PAW_OFF) },
      ], onComplete: () => { s.setVisible(false).setAngle(0); dot.destroy(); } });
      this.time.delayedCall(450, chew);
    }
  }

  // ---------- cảnh kết (không chạm mèo, tự thắng) ----------
  finale() {
    this.phase = 'ending';
    this.locked = true;
    this.handHide('paw');
    if (this.pawEv) this.pawCancel();
    this.tweens.add({ targets: this.bulb, alpha: 0, duration: 300 });  // cảnh kết không cần 💡 (đè lên Sữa)
    this.zones.bulb.disableInteractive();
    const H = this.scale.height;
    this.dim = this.add.rectangle(this.scale.width / 2, H / 2, this.scale.width, H, 0x000000, 1).setScrollFactor(0).setDepth(D.end).setAlpha(0);
    console.info(`[L9] Xong 13 bước sau ${(this.clockMs / 1000).toFixed(1)} giây chơi (khung 150 giây)`);
    const T = (ms, fn) => this.time.delayedCall(ms, () => { if (this.phase === 'ending') fn(); });
    // Bàn và mọi đồ trên bàn mờ đi rồi ẩn hẳn; cảnh chuyển sang sàn bếp nhìn ngang (góc cũ như các màn khác).
    // G9-9: 2 bát đầy nhẹ nhàng bay lên ra khỏi màn (0,8 giây, ease-in) trước khi bàn mờ đi.
    if (this.zoomed) T(250, () => this.camZoom(false));            // G9-11: lúc 2 bát bay lên thì zoom về bình thường
    T(300, () => this.bowls.forEach((b, i) => this.tweens.add({ targets: b, y: -420, duration: 800, delay: i * 60, ease: 'Sine.easeIn', onStart: () => { b.flying = true; },
      onComplete: () => b.setVisible(false) })));
    T(900, () => {
      this.tweens.add({ targets: [...this.tableParts, ...this.pieces, ...this.dice], alpha: 0, duration: 600,
        onComplete: () => [...this.tableParts, this.bowlG].forEach((o) => o.setVisible(false)) });
      this.bgEnd.setVisible(true);
      this.tweens.add({ targets: this.bgEnd, alpha: 1, duration: 600 });
    });
    // 2 bát đầy bay nhẹ từ trên xuống, đáp êm đúng chỗ bát của 2 mèo (ease-out ~0,9 giây, nảy rất khẽ); khói thơm hình cá bay lên.
    T(1600, () => {
      this.endB = FLOOR_BOWLS.map(([x, y], i) => {
        const b = this.img('l9_end_bowl', x, -300, 40);
        b.setScale(b.base * END_BOWL_K);
        this.tweens.chain({ targets: b, tweens: [
          { y, duration: 900, delay: i * 120, ease: 'Sine.easeOut', onComplete: () => this.sfx('l9_sfx_land', 0.3) },
          { y: y - 5, duration: 90, yoyo: true, ease: 'Quad.easeOut' },
        ] });
        return b;
      });
      this.fishOn = true;
    });
    T(2300, () => this.bubbleDone());
    // Mun vào từ mép trái, Sữa từ mép phải, mỗi con đi thẳng tới một bát.
    T(2300, () => {
      this.munE = this.img('mun_soup_walk', this.camX - 200, MUN_END[1], END_CAT_D - 0.9);   // đi vào: cả con dưới bát                       // ngoài mép trái màn thật
      this.suaE = this.img('sua_soup_walk', this.camX + this.scale.width + 200, SUA_END[1], END_CAT_D - 0.9);
      for (const s of [this.munE, this.suaE]) s.setScale(s.base * END_CAT_K);      // ngoài mép phải màn thật
      this.tag('Mun', this.munE); this.tag('Sữa', this.suaE);
      if (!this.isReal('sua_soup_walk')) this.face(this.suaE, true);   // ảnh thật của Sữa đã nhìn sang trái
      for (const [s, [x, y]] of [[this.munE, MUN_END], [this.suaE, SUA_END]]) {
        // Chủ dự án: dáng bước đi bằng code (chưa có khung vẽ bước): mỗi bước nảy lên, nghiêng lắc, nhún thân;
        // nhịp bước theo quãng đã đi (chậm dần khi tới bát), tới nơi thì đứng yên đúng cỡ.
        // Có 4 khung bước (…_walk_0..3: sải, giữa, sải ngược, giữa; chung neo chân) thì đổi khung theo quãng đi, nảy và lắc nhẹ hơn.
        const cat = s === this.munE ? 'mun' : 'sua', wk = this.isReal(`${cat}_soup_walk_0`) ? `${cat}_soup_walk_` : null;
        if (wk) this.applyKey(s, wk + 0);
        const x0 = s.x, k = s.base * END_CAT_K, STRIDE = 70, BOB = wk ? 5 : 9, SWAY = wk ? 1.2 : 3.5;
        let fi = 0;
        s.setScale(k);
        this.tweens.add({ targets: s, x, duration: 1300, ease: 'Sine.out', onUpdate: () => {
          const d = Math.abs(s.x - x0), ph = (d / STRIDE) * Math.PI, up = Math.abs(Math.sin(ph));
          const f = Math.floor((d + STRIDE / 4) / (STRIDE / 2)) % 4;   // khung giữa bước (1, 3) trùng đỉnh nảy
          if (wk && f !== fi) { fi = f; this.applyKey(s, wk + f); }
          s.setY(y - up * BOB).setAngle(Math.sin(ph) * SWAY).setScale(k * (1 + 0.025 * up), k * (1 - 0.035 * (1 - up)));
        }, onComplete: () => { if (wk) this.applyKey(s, wk + 0); s.setY(y).setAngle(0).setScale(k); } });
      }
      this.sfx('mun_sfx_scamper', 0.5);
    });
    // Tới bát: cùng ngẩng lên nhìn nhau ngạc nhiên ~1 giây (lần đầu gặp nhau).
    T(3700, () => {
      this.catPose('surprise');
      for (const s of [this.munE, this.suaE]) {                  // G9-15: nhún theo cỡ cảnh kết (squash chung về s.base làm mèo co lại rồi bật to)
        const k = s.base * END_CAT_K;
        this.tweens.chain({ targets: s, tweens: [{ scaleY: k * 0.92, scaleX: k * 1.03, duration: 80 }, { scaleY: k * 1.04, scaleX: k * 0.99, duration: 90 }, { scaleY: k, scaleX: k, duration: 80 }] });
      }
      this.sfx('l9_sfx_surprise');
      this.surpriseMarks(this.munE, 1); this.surpriseMarks(this.suaE, -1);
    });
    // Liếc xuống bát rồi cúi đầu ăn trong hạnh phúc 1,5 giây: mắt híp, đuôi vẫy chậm, trái tim nhỏ, tiếng liếm chóp chép.
    T(4700, () => {
      this.catPose('eat');
      for (const s of [this.munE, this.suaE]) this.tweens.add({ targets: s, scaleX: s.base * END_CAT_K * 0.97, duration: 300, yoyo: true, repeat: 2 });
    });
    for (let i = 0; i < 4; i++) T(4800 + i * 380, () => {
      this.sfx('l9_sfx_lick', 0.6);
      this.hearts(this.munE.x + 100, this.munE.y - 170, 1);
      this.hearts(this.suaE.x - 100, this.suaE.y - 170, 1);
    });
    T(6200, () => { this.fishOn = false; this.reward(); });
  }

  // G9-14: dáng ngạc nhiên, ăn: thân (…_body) lớp dưới bát, đầu (…_head) lớp trên bát, cùng khung, cùng neo; chưa có ảnh tách thì dùng ảnh nguyên con.
  catPose(pose) {
    for (const [s, cat] of [[this.munE, 'mun'], [this.suaE, 'sua']]) {
      const hk = `${cat}_soup_${pose}_head`;
      if (!this.isReal(hk)) { this.applyKey(s, `${cat}_soup_${pose}`); s.setScale(s.base * END_CAT_K); continue; }
      this.applyKey(s, `${cat}_soup_${pose}_body`);
      s.setScale(s.base * END_CAT_K);
      s.setDepth(END_CAT_D - 0.9);
      const h = s.head = s.head || this.img(hk, s.x, s.y, END_CAT_D);
      this.applyKey(h, hk);
    }
  }

  reward() { this.fishOn = false; super.reward(); }

  // Bong bóng nhiệm vụ đầy màu lúc 2 bát xuống sàn, nảy rồi tắt.
  bubbleDone() {
    const B = this.bubble;
    B.home = 'gone';
    this.zones.bubble.disableInteractive();
    this.tweens.killTweensOf(B.ct);
    const o = { f: this.fill };
    this.tweens.add({ targets: o, f: 1, duration: 350, onUpdate: () => this.setFill(o.f), onComplete: () => {
      this.sfx('sfx_heart');
      this.tweens.chain({ targets: B.ct, tweens: [
        { scale: B.ct.scale * 1.4, duration: 200, ease: 'Quad.out' }, { scale: B.ct.scale * 1.8, alpha: 0, duration: 260 },
      ], onComplete: () => B.ct.setVisible(false) });
    } });
  }

  // Vạch "giật mình" nảy ra quanh đầu mèo (phía bát, không chữ).
  surpriseMarks(s, dir) {
    const g = this.add.graphics().setDepth(43).setPosition(s.x + dir * 100, s.y - 250);
    g.lineStyle(7, 0x6b4a3a, 1);
    for (const a of [-0.5, 0, 0.5]) g.lineBetween(Math.sin(a) * 30, -Math.cos(a) * 30, Math.sin(a) * 58, -Math.cos(a) * 58);
    g.setScale(0);
    this.tweens.chain({ targets: g, tweens: [{ scale: 1, duration: 150, ease: 'Back.out' }, { alpha: 0, duration: 300, delay: 600 }], onComplete: () => g.destroy() });
  }

  // ---------- hiệu ứng ----------
  every(time, key, ms, fn) { if (time - (this.fxAt[key] || 0) >= ms) { this.fxAt[key] = time; fn(); } }
  loopSfx(time, key, gain = 0.5) { if (time - this.loopAt > 420) { this.loopAt = time; this.sfx(key, gain); } }
  vibrate(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* bỏ qua */ } }
  flash(ms = 600) { this.flashUntil = this.time.now + ms; }

  sparkleAt(x, y, w = 44) {
    const s = this.img('ui_sparkle', x, y, D.fx).setOrigin(0.5, 0.5);
    this.fitWidth(s, w);
    const b = s.base;
    s.setScale(0);
    this.tweens.chain({ targets: s, tweens: [{ scale: b, angle: 45, duration: 200 }, { scale: 0, angle: 90, duration: 300 }], onComplete: () => s.destroy() });
  }

  splashAt(x, y, color, n = 6) {
    for (let i = 0; i < n; i++) {
      const d = this.add.circle(x + Phaser.Math.Between(-30, 30), y + Phaser.Math.Between(-30, 30), Phaser.Math.Between(4, 7), color, 0.9).setDepth(D.fx);
      const a = Phaser.Math.FloatBetween(0, Math.PI * 2), r = Phaser.Math.Between(40, 90);
      this.tweens.add({ targets: d, x: d.x + Math.cos(a) * r, y: d.y + Math.sin(a) * r, alpha: 0, duration: 420, ease: 'Quad.out', onComplete: () => d.destroy() });
    }
  }

  ripple(x, y) {
    const g = this.add.graphics().setDepth(13), o = { r: 10, a: 0.8 };
    this.tweens.add({ targets: o, r: 60, a: 0, duration: 500, onUpdate: () => g.clear().lineStyle(3, 0xffffff, o.a).strokeCircle(x, y, o.r), onComplete: () => g.destroy() });
  }

  bubbleUp(x, y) {
    const b = this.add.circle(x, y, Phaser.Math.Between(5, 9), 0xffffff, 0.8).setStrokeStyle(2, 0x9fbfd0).setDepth(31);
    this.tweens.add({ targets: b, scale: 1.6, alpha: 0, duration: 600, onComplete: () => b.destroy() });
  }

  potBubble() {
    const a = Math.random() * Math.PI * 2, r = Math.random() * 95;
    const b = this.add.circle(POT_HOME[0] + Math.cos(a) * r, POT_HOME[1] + Math.sin(a) * r * FLAT, 3, 0xffffff, 0.9).setDepth(8.7);
    this.tweens.add({ targets: b, radius: Phaser.Math.Between(7, 12), alpha: 0, duration: 380, onComplete: () => b.destroy() });
  }

  steamPuff(x, y, a = 0.6) {
    const s = this.add.ellipse(x, y, 44, 34, 0xffffff, a).setDepth(D.fx - 2);
    this.tweens.add({ targets: s, y: y - 70, scaleX: 2, scaleY: 1.8, alpha: 0, duration: 1100, ease: 'Sine.out', onComplete: () => s.destroy() });
  }

  // Nồi sôi (bước 7–8): mỗi 0,65 giây một làn khói hình cá bay lên từ miệng nồi (dùng lại khói cá cảnh kết), 2–3 làn cùng lúc.
  potFish(time) { this.every(time, 'potfish', 650, () => this.fishPuff(POT_HOME[0] + Phaser.Math.Between(-45, 45), POT_HOME[1] - 30)); }

  // Khói thơm hình cá bay lên từ bát (cảnh kết).
  fishPuff(x, y, d = 41) {
    const g = this.add.graphics().setDepth(d).setPosition(x, y);
    g.fillStyle(0xffffff, 0.85).fillEllipse(0, 0, 40, 20).fillTriangle(16, 0, 32, -12, 32, 12);
    g.lineStyle(3, 0xb8b2aa, 0.9).strokeEllipse(0, 0, 40, 20);
    this.tweens.add({ targets: g, y: y - 170, x: x + Phaser.Math.Between(-20, 20), alpha: 0, duration: 1500, ease: 'Sine.out', onComplete: () => g.destroy() });
  }

  puff(x, y) {
    for (let i = 0; i < 3; i++) {
      const s = this.add.ellipse(x + (i - 1) * 22, y + 50, 26, 14, 0xffffff, 0.8).setStrokeStyle(2, 0xb8c6d0).setDepth(D.fx);
      this.tweens.add({ targets: s, y: y - 30, scaleX: 1.6, alpha: 0, duration: 450, delay: i * 40, onComplete: () => s.destroy() });
    }
  }

  swirlDot(x, y) {
    const d = this.add.circle(x, y, 8, 0xffffff, 0.7).setDepth(D.fx);
    this.tweens.add({ targets: d, scale: 0.2, alpha: 0, duration: 350, onComplete: () => d.destroy() });
  }

  // ---------- vẽ món đang làm dở nhìn 3/4 (lòng nồi, súp trong cối, rây, tô, bát, muôi, lửa, dòng đổ) ----------
  drawAll(time) {
    const fl = this.flameG.clear();
    const realFlame = this.isReal('l9_flame_a'), fk = this.flameK, fi = Math.floor(time / 130) % 2;
    this.flames.forEach((f, i) => f.setVisible(realFlame && fk > 0.01 && i === fi).setPosition(BURNER[0], BURNER[1] + FLAME_DY)
      .setScale(f.base * (0.55 + 0.45 * Math.min(1, fk)), f.base * (0.45 + 0.55 * Math.min(1, fk))).setAlpha(Math.min(1, fk * 1.5)));
    if (!realFlame && this.flameK > 0.01) for (let i = 0; i < 16; i++) {                            // lửa xanh liếm lên quanh đáy nồi (nửa trước)
      const q = (i / 16) * Math.PI * 2;
      if (Math.sin(q) < -0.15) continue;
      const h = 34 * this.flameK * (0.8 + 0.2 * Math.sin(time / 60 + i * 1.7));
      const bx = BURNER[0] + Math.cos(q) * 128, by = BURNER[1] + Math.sin(q) * 54;
      fl.fillStyle(0x5aa9f0, 0.9).fillTriangle(bx - 11, by, bx + 11, by, bx + Math.cos(q) * 6, by - h);
      fl.fillStyle(0xd6ecff, 0.9).fillTriangle(bx - 5, by, bx + 5, by, bx + Math.cos(q) * 3, by - h * 0.55);
    }
    const pot = this.pot, pg = this.potG.clear();
    if (pot.visible) {
      pg.setPosition(pot.x, pot.y).setAngle(pot.angle).setAlpha(pot.alpha).setDepth(pot.depth + 0.5);
      const boilK = Math.min(1, this.boil / NEED.boil), c = this.done >= 6 ? (boilK > 0.3 ? SOUP_C : BROTH_C) : WATER_C;
      if (this.potL > 0) {
        const rx = (POT_R - 6) * (0.75 + 0.25 * this.potL);
        pg.fillStyle(c, 0.35 + 0.6 * this.potL).fillEllipse(0, 2, rx * 2, rx * 2 * FLAT);
        const stir = time - this.swirlAt < 700;                                                 // đang khuấy: xoáy, chìm nổi
        for (let i = 0; i < Math.min(this.potFood, 14) * this.potL; i++) {                  // gà, bí trong nồi trôi vòng theo muôi
          const q = i * 2.4 + this.swirl * (0.6 + 0.04 * (i % 5)), r = 20 + ((i * 37) % 70);
          const b = stir ? 0.5 + 0.5 * Math.sin(time / 170 + i * 1.3) : 1, w = 14 * (0.7 + 0.3 * b), h = 8 * (0.7 + 0.3 * b);
          pg.fillStyle(i % 2 ? 0xf8c2bb : 0xf5a54a, 0.45 + 0.55 * b).fillRect(Math.cos(q) * r - w / 2, Math.sin(q) * r * FLAT - h / 2, w, h);
        }
        if (stir) for (let j = 0; j < 3; j++) {                                               // vệt xoáy trên mặt súp
          const r = 35 + 25 * j, a0 = this.swirl + j * 2.1, pts = [];
          for (let i = 0; i <= 10; i++) { const q = a0 + i * 0.12; pts.push({ x: Math.cos(q) * r, y: Math.sin(q) * r * FLAT }); }
          pg.lineStyle(3, 0xffffff, 0.55).strokePoints(pts);
        }
      }
      for (const f of this.foam) if (!f.t) pg.fillStyle(FOAM_C, 1).fillEllipse(f.x, f.y, 32, 20).fillStyle(0xd9d3ca, 1).fillEllipse(f.x - 4, f.y - 3, 14, 9);
    }
    const bl = this.blender, bg = this.blendG.clear();
    if (bl.visible && this.bl > 0.01) {                                                 // súp trong cối thuỷ tinh: dâng từ đáy lên
      bg.setPosition(bl.x, bl.y).setAngle(bl.angle).setAlpha(bl.alpha).setDepth(bl.depth + 0.05);   // trên kính, hơi trong, có vệt sáng kính
      const hw = (y) => JAR_TOP - 10 - (JAR_TOP - JAR_BOT) * (y / JAR_D), yl = JAR_D - (JAR_D - 18) * this.bl;
      bg.fillStyle(SOUP_C, 0.85).fillPoints([{ x: -hw(yl), y: yl }, { x: hw(yl), y: yl }, { x: JAR_BOT - 10, y: JAR_D - 6 }, { x: 10 - JAR_BOT, y: JAR_D - 6 }], true);
      bg.fillEllipse(0, JAR_D - 6, (JAR_BOT - 10) * 2, (JAR_BOT - 10) * 0.45);            // đáy cối cong
      bg.fillStyle(0xf6c07c, 0.95).fillEllipse(0, yl, hw(yl) * 2, hw(yl) * 0.7);
      bg.lineStyle(3, SOUP_EDGE, 0.9).strokeEllipse(0, yl, hw(yl) * 2, hw(yl) * 0.7);
      const n = [12, 5, 0][this.blStage];                                                   // lợn cợn → sánh → mịn
      for (let i = 0; i < n; i++) { const q = i * 2.4, r2 = (i * 23) % 50; bg.fillStyle(i % 2 ? 0xf3a29a : 0xd98a3e, 1).fillEllipse(Math.cos(q) * r2, yl + 14 + ((i * 31) % Math.max(10, JAR_D - yl - 20)), 11, 8); }
      const hy = yl + 12, hh = JAR_D - yl - 28;                                            // vệt sáng kính dọc thành trái
      if (hh > 10) bg.fillStyle(0xffffff, 0.35).fillRoundedRect(-hw(yl) + 12, hy, 9, hh, 4);
    }
    const sv = this.sieve, sg = this.sieveG.clear();
    if (sv.visible && this.sieveL > 0.01) {
      sg.setPosition(sv.x, sv.y).setAlpha(sv.alpha);
      // G9-14: mặt súp là elip nằm trong lòng rây (tâm lòng +8,+2; nửa rộng 102, nửa cao 47), vơi thì nhỏ và thấp xuống lòng lưới.
      const k = Math.sqrt(this.sieveL), cy = 6 + (1 - k) * 18;
      sg.fillStyle(SOUP_C, 1).fillEllipse(8, cy, 186 * k, 84 * k);
      sg.lineStyle(3, SOUP_EDGE, 1).strokeEllipse(8, cy, 186 * k, 84 * k);
    }
    const tu = this.tureen, tg = this.tureenG.clear();
    if (tu.visible && this.fv.tu > 0.005) {
      tg.setPosition(tu.x, tu.y).setAlpha(tu.alpha);
      const L = this.fv.tu, k = (0.55 + 0.45 * L) * Math.min(1, L / 0.12);                                       // G9-12: súp đặc (alpha 1), mặt súp hẹp dần khi vơi (G9-14: mượt)
      tg.fillStyle(SOUP_C, 1).fillEllipse(0, 3 + (1 - L) * 16, 320 * k, 150 * k);
      tg.lineStyle(3, SOUP_EDGE, 1).strokeEllipse(0, 3 + (1 - L) * 16, 320 * k, 150 * k);
    }
    if (this.step === 13 && !this.trans && this.heat > 0.02) this.every(time, 'tsteam', 260, () => this.steamPuff(tu.x + Phaser.Math.Between(-100, 100), tu.y + Phaser.Math.Between(-40, 30), 0.7 * this.heat));
    const fb = this.endB || this.bowls;
    if (this.fishOn) this.every(time, 'fish', 380, () => { const b = fb[(this.fishI = ((this.fishI || 0) + 1) % 2)]; this.fishPuff(b.x + Phaser.Math.Between(-30, 30), b.y - 130, END_CAT_D - 1); });   // G9-15: khói cá nằm sau mèo, khỏi đè lên mặt
    this.drawBowls();
    for (const s of [this.munE, this.suaE]) if (s && s.head) s.head.setPosition(s.x, s.y).setScale(s.scaleX, s.scaleY).setAlpha(s.alpha);
    this.drawTray();
    this.drawGlow(time);
    const L = this.ladle, lg = this.ladleG.clear();
    if (L.visible) {
      lg.setPosition(L.x, L.y).setAngle(L.angle).setAlpha(L.alpha).setDepth(L.depth + 0.5);
      if (this.ladleFull) lg.fillStyle(SOUP_C, 1).fillEllipse(0, 2, 84, 30);
      for (const f of this.foam) if (f.t) lg.fillStyle(FOAM_C, 1).fillEllipse(f.ox, f.oy * 0.5, 20, 12);
    }
    this.drawStream(time);
  }

  // G9-7: dòng súp cong theo trọng lực (Bezier bậc 2: ra gần ngang theo hướng nghiêng rồi cong xuống đích), to ở chỗ ra, thon dần,
  // mép gợn, vệt sáng nhạt dọc dòng; chỗ rơi bắn giọt nhỏ, mặt súp gợn vòng. Gần cạn: đứt thành vài giọt.
  drawStream(time) {
    const st = this.streamG.clear(), S = this.stream;
    if (!S || S.k <= 0.01) return;
    const [x0, y0] = S.p0, [x1, y1] = S.p1, dir = S.dir;
    const cx = x0 + dir * Math.max(30, dir * (x1 - x0)) * 0.85, cy = y0 - 6;
    const B = (t) => { const u = 1 - t; return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1]; };
    if (S.k < 0.3) {                                                                                     // gần cạn: giọt rơi
      for (let i = 0; i < 3; i++) { const [x, y] = B(((time / 380) + i / 3) % 1); st.fillStyle(SOUP_C, 0.95).fillEllipse(x, y, 9, 12); }
      return;
    }
    const N = 18, Lp = [], Rp = [], Hp = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, [x, y] = B(t), [xa, ya] = B(Math.max(0, t - 0.02)), [xb, yb] = B(Math.min(1, t + 0.02));
      const d = Math.hypot(xb - xa, yb - ya) || 1, nx = -(yb - ya) / d, ny = (xb - xa) / d;
      const w = ((22 - 12 * t) * S.k + Math.sin(time / 45 + i * 1.3) * 1.6 * S.k) / 2;
      Lp.push({ x: x + nx * w, y: y + ny * w }); Rp.push({ x: x - nx * w, y: y - ny * w });
      if (t > 0.04 && t < 0.85) Hp.push({ x: x + nx * w * 0.35, y: y + ny * w * 0.35 });
    }
    st.fillStyle(SOUP_C, 1).fillPoints([...Lp, ...Rp.reverse()], true);
    st.lineStyle(3, 0xffffff, 0.35).strokePoints(Hp);
    const [sx, sy] = S.surf;
    this.every(time, 'pdrop', 130, () => this.dropSplash(sx, sy));
    this.every(time, 'pring', 260, () => this.ringFx(sx, sy));
  }

  // Giọt nhỏ bắn lên chỗ dòng rơi; vòng gợn elip trên mặt súp.
  dropSplash(x, y) {
    for (let i = 0; i < 2; i++) {
      const d = this.add.circle(x + Phaser.Math.Between(-10, 10), y, Phaser.Math.Between(3, 4), SOUP_C, 0.95).setDepth(20.5);
      this.tweens.add({ targets: d, x: d.x + Phaser.Math.Between(-28, 28), y: y - Phaser.Math.Between(14, 30), alpha: 0, duration: 260, ease: 'Quad.out', onComplete: () => d.destroy() });
    }
  }

  ringFx(x, y) {
    const g = this.add.graphics().setDepth(20.4), o = { k: 0 };
    this.tweens.add({ targets: o, k: 1, duration: 420, onUpdate: () => g.clear().lineStyle(2, 0xffffff, 0.6 * (1 - o.k)).strokeEllipse(x, y, 20 + 70 * o.k, 8 + 26 * o.k), onComplete: () => g.destroy() });
  }

  // Khay 3/4 (G9-8): vạch đầy trong lòng khay, súp dâng theo số muôi; ruy băng và nơ vẽ trên nắp theo tiến độ tự diễn.
  drawTray() {
    const T = this.tray, g = this.trayG.clear(), b = this.boxG.clear();
    if (!T.visible) return;
    g.setPosition(T.x, T.y).setAngle(T.angle).setAlpha(T.alpha);
    g.lineStyle(3, 0x6b4a3a, 0.45).strokeRoundedRect(-112, -52, 224, 104, 10);                        // vạch đầy
    const f = this.fv.tray;
    if (f > 0) { const i = (1 - f) * 30; g.fillStyle(SOUP_C, 0.7 + 0.3 * f).fillRoundedRect(-118 + i, -58 + i, 236 - 2 * i, 118 - 2 * i, 10); }
    const L = this.trayLid, B = this.box;
    const on = B.on && L.visible, real = this.isReal('l9_tray_ribbon');
    for (const o of [this.ribV, this.ribH, this.bow]) o.setVisible(on && real);
    if (!on) return;
    if (real) {                                                  // ruy băng 454x257 (ảnh): dải dọc x 205–248, dải ngang y 101–143; chéo nhau ở (0, +20) so với gốc nắp
      const v = Math.min(1, B.rib * 2), h = Math.max(0, B.rib * 2 - 1), fw = 454, fh = 257;
      for (const o of [this.ribV, this.ribH]) o.setPosition(L.x, L.y).setAngle(L.angle).setAlpha(L.alpha);
      this.ribV.setCrop(203, 0, 47, fh * v).setVisible(v > 0);
      this.ribH.setCrop(fw / 2 - (fw / 2) * h, 99, fw * h, 46).setVisible(h > 0);
      const [bx, by] = this.local(L, 0, 20);
      this.bow.setPosition(bx, by).setAngle(L.angle).setAlpha(L.alpha).setScale(this.bow.base * B.bow).setVisible(B.bow > 0.01);
      return;
    }
    b.setPosition(L.x, L.y).setAngle(L.angle).setAlpha(L.alpha);
    const RC = 0xe0566b, RD = 0xb83a50;
    if (B.rib > 0) {                                                                                    // dải dọc (mặt nắp rồi mặt trước), rồi dải ngang
      const v = Math.min(1, B.rib * 2), h = Math.max(0, B.rib * 2 - 1);
      b.fillStyle(RC, 1).fillRect(-14, -56, 28, 172 * v);
      if (h > 0) b.fillStyle(RC, 1).fillRect(-142 * h, -12, 284 * h, 26);
      b.lineStyle(2, RD, 1).strokeRect(-14, -56, 28, 172 * v);
    }
    if (B.bow > 0) {                                                                                    // nơ trên nắp: 2 tai nơ, 2 đuôi, nút
      const k = B.bow;
      b.fillStyle(RC, 1).fillEllipse(-30 * k, -8, 52 * k, 30 * k).fillEllipse(30 * k, -8, 52 * k, 30 * k);
      b.lineStyle(3, RD, 1).strokeEllipse(-30 * k, -8, 52 * k, 30 * k).strokeEllipse(30 * k, -8, 52 * k, 30 * k);
      b.fillStyle(RC, 1).fillTriangle(-6, 0, -26 * k, 34 * k, -10 * k, 36 * k).fillTriangle(6, 0, 26 * k, 34 * k, 10 * k, 36 * k);
      b.fillStyle(RD, 1).fillCircle(0, -6, 11 * k);
    }
  }

  // Bát 3/4: dấu chân mèo trên thành trong phía sau là vạch đầy; súp dâng từ đáy lòng bát lên, phủ dấu chân lúc đầy.
  drawBowls() {
    const g = this.bowlG.clear();
    this.bowls.forEach((b, i) => {
      if (!b.visible) return;
      const x = b.x, y = b.y, f = this.fv['b' + i];
      if (!this.isReal('l9_bowl')) {                                                         // khối: tự vẽ vạch đầy và dấu chân (ảnh thật đã có sẵn)
        g.lineStyle(3, 0x6b4a3a, 0.5 * b.alpha).strokeEllipse(x, y + 2, 184, 80);
        const px = x, py = y - 22;
        g.fillStyle(0x6b4a3a, 0.45 * b.alpha).fillEllipse(px, py + 4, 22, 10);
        for (const [dx, dy] of [[-12, -4], [-4, -7], [4, -7], [12, -4]]) g.fillEllipse(px + dx, py + dy, 7, 5);
      }
      if (f > 0) { const w = f >= 1 ? 206 : 70 + 126 * f; g.fillStyle(SOUP_C, b.alpha).fillEllipse(x, y + 2 + (1 - f) * 20, w, w * 0.48); }
    });
  }

  // ---------- vòng gợi ý, vòng tiến độ (như L8) ----------
  spot() {
    const n = this.step, g = this.g;
    if (n === 1) return g || this.inBasin ? [...BASIN, 180, 92] : [this.chicken.x, this.chicken.y, 125, 70];
    if (n === 2) return [this.skin.x, this.skin.y, 110, 50];
    if (n === 3 || n === 5) {
      const L = this.cutLine();
      if (!L) return null;
      if (this.knifeSet) return [L[0], L[1], 125, 40];
      return g ? [...(n === 3 ? CHICKEN_B : PUMPKIN), 140, 90] : [this.knife.x, this.knife.y, 160, 45];
    }
    if (n === 4) return g ? [PUMPKIN[0], PUMPKIN[1], 120, 110] : [this.peeler.x, this.peeler.y, 120, 45];
    if (n === 6) return g ? [...POT_HOME, 140, 75] : [this.board.x, this.board.y + 10, 265, 125];
    if (n === 7) return this.flame ? null : [...KNOB, 55, 55];
    if (n === 8 && this.offKnob) return [...KNOB, 55, 55];
    if (n === 8) return g ? [...POT_HOME, 130, 68] : [this.ladle.x + 110, this.ladle.y, 150, 50];
    if (n === 9) return g ? [...JAR, 100, 50] : [this.pot.x, this.pot.y + 60, 150, 120];
    if (n === 10) return [...BTN, 55, 55];
    if (n === 11) return g ? [SIEVE[0], SIEVE[1], 135, 68] : [this.blender.x, this.blender.y + 120, 120, 170];
    if (n === 12) return SIEVE_E;
    if (n === 13) return [this.tureen.x, this.tureen.y, 175, 88];
    if (n === 14 || n === 15) {
      if (!g) return [this.ladle.x + 110, this.ladle.y, 150, 50];
      if (!this.ladleFull) return [this.tureen.x, this.tureen.y, 160, 80];
      const b = n === 14 ? this.tray : this.bowls[this.bowlTarget()];
      return [b.x, b.y, 130, 60];
    }
    return null;
  }

  // Bát nên đổ tiếp: bát chưa đầy gần muôi hơn.
  bowlTarget() {
    const L = this.ladle;
    return this.bowlF[0] < NEED.scoops && (this.bowlF[1] >= NEED.scoops || Math.abs(L.x - this.bowls[0].x) <= Math.abs(L.x - this.bowls[1].x)) ? 0 : 1;
  }

  drawHighlight(time) {
    const g = this.hl.clear();
    this.ringG.clear();
    if (this.phase !== 'search') return;
    if (this.ringA > 0) { this.drawRing([0, 0], this.p); this.ringG.setPosition(...this.ringAt()).setScale(this.ringS.k / this.cameras.main.zoom).setAlpha(this.ringA); }
    if (this.trans) return;
    const fadeIn = Phaser.Math.Clamp((time - (this.hintHoldUntil || 0)) / 300, 0, 1), sp = this.spot();
    if (!fadeIn || !sp) return;
    const strong = time < this.flashUntil, k = 0.5 + 0.5 * Math.sin((time / 1500) * Math.PI * 2);
    const [x, y, rx, ry] = sp, a = Math.min(1, fadeIn * (strong ? 1 : (0.25 + 0.5 * k) * (1 - 0.6 * this.p) * (this.hints.h2 ? 1.4 : 1)));
    const W = 2 * (rx + 6), H = 2 * (ry + 6);                                       // vòng elip theo mặt bàn 3/4
    g.lineStyle(16, HINT_C, a * 0.35).strokeEllipse(x, y, W + 12, H + 12);
    g.lineStyle(strong ? 12 : 8, HINT_C, a).strokeEllipse(x, y, W, H);
    g.lineStyle(strong ? 4 : 3, HINT_CORE, a).strokeEllipse(x, y, W, H);
  }

  // G9-14: mặt súp hiển thị đổi cỡ mượt (0,3 giây) thay vì nhảy.
  fvTo(k, v) { this.tweens.add({ targets: this.fv, [k]: v, duration: 300, ease: 'Sine.out' }); }

  isReal(key) { const e = this.A.entries[key]; return !!(e && e.real); }

  ringAt() { return this.zoomed === 'pot' ? RING_Z : this.zoomed === 'focus' ? RING_F : RING_AT; }

  drawRing([x, y], p, g = this.ringG) {
    g.fillStyle(0xffffff, 0.95).fillCircle(x, y, RING_R);
    if (p > 0) g.fillStyle(RING_FILL, 1).slice(x, y, RING_R - 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, p), false).fillPath();
    g.lineStyle(7, RING_EDGE, 1).strokeCircle(x, y, RING_R);
  }

  // Đang làm bước (đang cầm / vuốt / giữ, hoặc nồi đang sôi): vòng tiến độ nảy ra; rời quá 1 giây thì mờ dần.
  ringStep(time, dt) {
    const touching = this.phase === 'search' && !this.trans && (this.autoRing || time - this.ringTouchAt < 60);
    if (touching) {
      if (!this.ringOn || this.ringA < 0.5) {
        this.ringOn = true;
        this.tweens.killTweensOf(this.ringS);
        this.ringS.k = 0;
        this.tweens.add({ targets: this.ringS, k: 1, duration: 220, ease: 'Back.out' });
      }
      this.ringA = 1;
    } else if (this.ringOn && time - this.ringTouchAt > 1000 && !this.autoRing) {
      this.ringA = Math.max(0, this.ringA - dt / 300);
      if (!this.ringA) this.ringOn = false;
    }
  }

  ringPop() {
    this.ringOn = false;
    this.ringA = 0;
    const [x, y] = this.ringAt(), g = this.add.graphics().setDepth(D.fx + 2).setPosition(x, y).setScale(1 / this.cameras.main.zoom);
    this.drawRing([0, 0], 1, g);
    this.sfx('l9_sfx_ting', 0.8);
    this.tweens.chain({ targets: g, tweens: [
      { scale: 1.25 * g.scaleX, duration: 130, ease: 'Quad.out', yoyo: true, repeat: 2 },
      { scale: 1.5 * g.scaleX, alpha: 0, duration: 260, ease: 'Quad.out' },
    ], onComplete: () => g.destroy() });
  }

  // Xong bước: vùng vừa làm nhấp nháy sáng 3 nhịp (như L8 G8-11); vòng gợi ý bước mới chờ hiệu ứng tắt (G8-12).
  doneBlink(es) {
    const g = this.add.graphics().setDepth(D.fx - 1).setAlpha(0);
    for (const [x, y, rx, ry] of es) {
      g.fillStyle(0xffffff, 0.22).fillEllipse(x, y, rx * 2 + 30, ry * 2 + 30);
      g.fillStyle(0xffffff, 0.3).fillEllipse(x, y, rx * 2, ry * 2);
      g.lineStyle(8, HINT_C, 0.9).strokeEllipse(x, y, rx * 2 + 16, ry * 2 + 16);
      g.lineStyle(3, HINT_CORE, 1).strokeEllipse(x, y, rx * 2 + 16, ry * 2 + 16);
    }
    es.forEach(([x, y]) => this.sparkleAt(x, y, 40));
    this.hintHoldUntil = this.time.now + 3 * 300 + 2 * 80;
    this.tweens.add({ targets: g, alpha: 1, duration: 120, yoyo: true, hold: 60, repeat: 2, repeatDelay: 80, ease: 'Sine.inOut',
      onRepeat: () => es.forEach(([x, y]) => this.sparkleAt(x, y, 40)), onComplete: () => g.destroy() });
  }

  // ---------- dấu hiệu cử chỉ (G9-1): hiện ngay khi bước bắt đầu, chỉ rõ phải làm gì (kéo, vuốt, nghiêng, xoay, giữ, chạm liên tục) ----------
  // Mũi tên cam viền trắng có chấm trắng chạy theo hướng làm; xoay: mũi tên vòng; giữ: vòng co lại; chạm liên tục: vòng gợn nhanh.
  arrowHead(g, x, y, ang, a) {
    const pts = (L, W) => [{ x, y }, { x: x - Math.cos(ang) * L + Math.sin(ang) * W, y: y - Math.sin(ang) * L - Math.cos(ang) * W },
      { x: x - Math.cos(ang) * L - Math.sin(ang) * W, y: y - Math.sin(ang) * L + Math.cos(ang) * W }];
    g.fillStyle(0xffffff, a).fillPoints(pts(46, 30), true);
    g.fillStyle(HINT_C, a).fillPoints(pts(36, 21), true);
  }

  cuePath(g, pts, t, a, two = false) {
    const n = pts.length - 1, end = pts[n], pre = pts[n - 1];
    for (const [w, c] of [[18, 0xffffff], [9, HINT_C]]) {
      g.lineStyle(w, c, a).beginPath().moveTo(pts[0].x, pts[0].y);
      for (const q of pts.slice(1)) g.lineTo(q.x, q.y);
      g.strokePath();
    }
    this.arrowHead(g, end.x, end.y, Math.atan2(end.y - pre.y, end.x - pre.x), a);
    if (two) this.arrowHead(g, pts[0].x, pts[0].y, Math.atan2(pts[0].y - pts[1].y, pts[0].x - pts[1].x), a);
    const k = (t % 1) * n, i = Math.min(n - 1, Math.floor(k)), f = k - i;          // chấm chạy theo hướng làm
    const x = pts[i].x + (pts[i + 1].x - pts[i].x) * f, y = pts[i].y + (pts[i + 1].y - pts[i].y) * f;
    g.fillStyle(0xffffff, a).fillCircle(x, y, 11);
    g.lineStyle(4, HINT_C, a).strokeCircle(x, y, 11);
  }

  // Ảnh mũi tên: thẳng (chỉ phải) đặt giữa đoạn, xoay theo hướng, trượt dần về đích; hai chiều thì đưa qua lại.
  cueImgArrow(x0, y0, x1, y1, t, a, two) {
    const s = this.cueS.straight, len = Math.hypot(x1 - x0, y1 - y0), ang = Math.atan2(y1 - y0, x1 - x0);
    const k = Phaser.Math.Clamp((len * 0.7) / (s.width * s.base), 0.55, 1.2), slide = len * 0.15;
    const ph = two ? Math.sin(t * Math.PI * 2) : (t % 1) * 2 - 1, dir = two && Math.cos(t * Math.PI * 2) < 0 ? Math.PI : 0;
    s.setVisible(true).setAlpha(a).setScale(s.base * k).setRotation(ang + dir)
      .setPosition((x0 + x1) / 2 + Math.cos(ang) * slide * ph, (y0 + y1) / 2 + Math.sin(ang) * slide * ph);
  }

  cueArrow(g, x0, y0, x1, y1, t, a, two = false) {
    if (this.cueReal) { this.cueImgArrow(x0, y0, x1, y1, t, a, two); return; }
    const pts = [];
    for (let i = 0; i <= 8; i++) pts.push({ x: x0 + ((x1 - x0) * i) / 8, y: y0 + ((y1 - y0) * i) / 8 });
    this.cuePath(g, pts, t, a, two);
  }

  // Mũi tên vòng theo elip từ góc a0 tới a1 (radian; a1 > a0: chiều kim đồng hồ trên màn hình).
  cueArc(g, cx, cy, rx, ry, a0, a1, t, a) {
    if (this.cueReal && Math.abs(a1 - a0) <= Math.PI * 1.4) {   // G9-15: khuấy nồi, khuấy rây, vặn núm (cung dài) dùng cung vẽ code; chỉ nghiêng/đổ dùng ảnh
      const cw = a1 > a0;
      {                                                          // nghiêng, đổ: mũi tên cong đặt giữa cung, xoay theo hướng cung
        const s = this.cueS.curve, m = (a0 + a1) / 2, x = cx + Math.cos(m) * rx, y = cy + Math.sin(m) * ry;
        const tan = Math.atan2(Math.cos(m) * ry * (cw ? 1 : -1), -Math.sin(m) * rx * (cw ? 1 : -1));
        s.setVisible(true).setAlpha(a).setPosition(x, y).setScale(s.base).setFlipX(!cw).setRotation(tan + (cw ? -0.6 : 0.6) + Math.sin(t * Math.PI * 2) * 0.08);
      }
      return;
    }
    const pts = [];
    for (let i = 0; i <= 24; i++) { const q = a0 + ((a1 - a0) * i) / 24; pts.push({ x: cx + Math.cos(q) * rx, y: cy + Math.sin(q) * ry }); }
    this.cuePath(g, pts, t, a);
  }

  drawCue(time) {
    const g = this.cueG.clear();
    this.cueReal = this.isReal('l9_hint_arrow_straight');
    for (const k in this.cueS) this.cueS[k].setVisible(false).setFlipX(false);
    if (this.phase !== 'search' || this.trans || this.frozen) return;
    const fade = Phaser.Math.Clamp((time - (this.hintHoldUntil || 0)) / 300, 0, 1);
    if (!fade) return;
    const n = this.step, G = this.g, t = time / 1100, a = fade * (G ? 0.55 : 0.95);
    const taps = (x, y, slow = false) => {                                                                // chạm (liên tục): gợn nhanh
      if (this.cueReal) {
        const s = this.cueS.tap, k = 0.9 + 0.12 * Math.sin((time / (slow ? 300 : 140)));
        s.setVisible(true).setAlpha(a).setPosition(x, y).setScale(s.base * k);
        return;
      }
      for (const o of [0, 0.5]) {
        const k = ((time / 450) + o) % 1;
        g.lineStyle(8, 0xffffff, a * (1 - k)).strokeEllipse(x, y, 40 + 200 * k, 20 + 100 * k);
        g.lineStyle(4, HINT_C, a * (1 - k)).strokeEllipse(x, y, 40 + 200 * k, 20 + 100 * k);
      }
      g.fillStyle(0xffffff, a * 0.85).fillCircle(x, y, 14);
    };
    if (n === 1) {
      const c = this.chicken;
      if (!this.inBasin && !(G && this.inEll(BASIN_E, c.x, c.y, 10))) this.cueArrow(g, c.x + 70, c.y - 40, BASIN[0] - 60, BASIN[1] - 40, t, a);
      else this.cueArrow(g, BASIN[0] - 130, BASIN[1] - 130, BASIN[0] + 130, BASIN[1] - 130, t * 2, a, true);   // chà qua lại
    } else if (n === 2) {
      const s = this.skin;
      if (!G) this.cueArrow(g, s.x + 60, s.y - 50, s.x + 90, s.y - 230, t, a);                                // kéo da ra
    } else if (n === 3 || n === 5) {
      const L = this.cutLine();
      if (!L) return;
      if (!this.knifeSet) { if (!G) this.cueArrow(g, this.knife.x - 40, this.knife.y - 40, L[0] + KNIFE_DX + 40, L[1] - 60, t, a); }  // kéo dao lên thớt
      else taps(L[0], L[1]);                                                                              // chạm để chặt
    } else if (n === 4) {
      const left = this.rinds.filter((o) => o.cr);
      if (!left.length) return;
      if (!G) this.cueArrow(g, this.peeler.x - 50, this.peeler.y - 30, left[0].x + 20, left[0].y + 20, t, a);   // kéo dao gọt lên bí
      else this.cueArrow(g, PUMPKIN[0] - 110, PUMPKIN[1] - 130, PUMPKIN[0] + 110, PUMPKIN[1] - 130, t * 2, a, true); // rê qua lại trên vỏ
    } else if (n === 6) {
      const s = this.board;
      this.cueArrow(g, s.x, s.y, POT_HOME[0] - 170, POT_HOME[1] + 100, t, a);                             // kéo thớt tới nồi
    } else if (n === 9 || n === 11) {
      const s = n === 9 ? this.pot : this.blender, P = n === 9 ? POUR_P : POUR_BL, far = !G || Math.hypot(s.x - P[0], s.y - P[1]) > 200;
      if (far) this.cueArrow(g, s.x, s.y + 60, P[0] + 20, P[1] + 40, t, a);
      else if (n === 9) this.cueArc(g, s.x - 40, s.y + 40, 170, 170, -Math.PI * 0.45, -Math.PI * 0.95, t, a);   // nghiêng nồi xuống phía máy xay
      else this.cueArc(g, s.x + 40, s.y + 40, 170, 170, -Math.PI * 0.55, -Math.PI * 0.05, t, a);              // nghiêng cối xuống phía rây
    } else if (n === 7) {
      if (!this.flame) this.cueArc(g, KNOB[0], KNOB[1], 82, 82, -Math.PI / 2, Math.PI, t, a);
    } else if (n === 8 && this.offKnob) {                                                                // xoay núm ngược chiều về tắt
      this.cueArc(g, KNOB[0], KNOB[1], 82, 82, Math.PI, -Math.PI / 2, t, a);
    } else if (n === 8) {
      const L = this.ladle;
      if (!G) this.cueArrow(g, L.x + 20, L.y - 50, POT_HOME[0] - 40, POT_HOME[1] + 60, t, a);
      else this.cueArc(g, POT_HOME[0], POT_HOME[1], 150, 72, -Math.PI / 2, Math.PI * 1.15, t, a);              // khuấy vòng
    } else if (n === 10 && this.cueReal) {
      taps(...BTN, true);                                                                                   // giữ nút: chấm nhịp chậm
    } else if (n === 10) {                                                                                  // giữ: vòng co lại vào nút
      const k = (time / 1200) % 1;
      g.lineStyle(10, 0xffffff, a * (1 - k)).strokeCircle(...BTN, 110 - 55 * k);
      g.lineStyle(6, HINT_C, a * (1 - k)).strokeCircle(...BTN, 110 - 55 * k);
      g.fillStyle(0xffffff, a * 0.85).fillCircle(...BTN, 16).lineStyle(4, HINT_C, a).strokeCircle(...BTN, 16);
    } else if (n === 12) {
      this.cueArc(g, SIEVE_E[0] + 8, SIEVE_E[1], 140, 66, -Math.PI / 2, Math.PI * 1.15, t, a);
    } else if (n === 13) {
      taps(this.tureen.x, this.tureen.y);
    } else if (n === 14 || n === 15) {
      const L = this.ladle, tu = this.tureen;
      if (!this.ladleFull) this.cueArrow(g, L.x + (G ? 0 : 40), L.y + 30, tu.x - 30, tu.y - 30, t, a);
      else { const b = n === 14 ? this.tray : this.bowls[this.bowlTarget()]; this.cueArrow(g, L.x, L.y + 30, b.x + (b.x < L.x ? 40 : -40), b.y - 40, t, a); }
    }
  }

  // ---------- gợi ý ----------
  // Đồ cần dùng của bước (lắc nhẹ ở gợi ý 8 giây).
  hintSprite() {
    if (this.step === 8 && this.offKnob) return this.knob;
    return [null, this.chicken, this.skin, this.knife, this.peeler, this.knife, this.board, this.knob, this.ladle, this.pot, this.btn,
      this.blender, this.sieve, this.tureen, this.ladle, this.ladle][this.step];
  }

  // 8 giây: đồ cần dùng lắc nhẹ, vòng gợi ý cam nhấp nháy mạnh một nhịp.
  hint1() {
    if (this.trans || this.phase !== 'search') return;
    const s = this.hintSprite();
    if (s && s.visible && !s.cr && !this.tweens.isTweening(s)) this.wiggle(s, 5, 3, 360);
    this.flash(700);
  }

  // 16 giây (lặp): bàn chân làm mẫu cử chỉ của bước.
  idleSparkle() { if (!this.trans && this.phase === 'search') { this.hints.h2 = true; this.demo(); } }

  strongHint() {
    this.pressBulb();
    if (this.trans || this.phase !== 'search') return;
    this.flash(1200);
    this.demo();
  }

  idleHints(time) { super.idleHints(time, 4500); }

  // Bàn chân gợi ý đi qua các điểm; hold: nhấn giữ (ms) ở điểm cuối; taps: số lần nhấp ở điểm đầu.
  pawPath(pts, { seg = 320, loops = 2, hold = 0, taps = 0 } = {}) {
    this.handHide('paw');
    const s = this.paw, b = s.base;
    s.depth0 = s.depth;
    s.setDepth(D.ui + 30).setVisible(true).setAlpha(0).setScale(b).setPosition(...pts[0]);
    const tw = [{ alpha: 1, scale: b * 0.9, duration: 200 }];
    for (let L = 0; L < loops; L++) {
      if (L && pts.length > 1) tw.push({ x: pts[0][0], y: pts[0][1], duration: 220 });
      for (const [x, y] of pts.slice(1)) tw.push({ x, y, duration: seg, ease: 'Sine.inOut' });
      for (let i = 0; i < taps; i++) tw.push({ scale: b * 0.75, duration: 90, yoyo: true });
      if (hold) tw.push({ scale: b * 0.75, duration: 150 }, { scale: b * 0.75, duration: hold }, { scale: b * 0.9, duration: 150 });
    }
    tw.push({ alpha: 0, duration: 250 });
    this.tweens.chain({ targets: s, tweens: tw, onComplete: () => this.handHide('paw') });
  }

  circlePts([cx, cy], rx, ry, turns = 2) {
    const pts = [];
    for (let i = 0; i <= turns * 12; i++) { const a = (i / 12) * Math.PI * 2; pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
    return pts;
  }

  demo() {
    const n = this.step;
    if (n === 1) this.pawPath([[this.chicken.x, this.chicken.y], [...BASIN], [BASIN[0] - 80, BASIN[1]], [BASIN[0] + 80, BASIN[1]], [BASIN[0] - 80, BASIN[1]]], { loops: 1 });
    else if (n === 2) this.pawPath([[this.skin.x, this.skin.y], [this.skin.x + 40, this.skin.y - 190]], { seg: 700 });
    else if (n === 3 || n === 5) {
      const L = this.cutLine();
      if (!L) return;
      if (!this.knifeSet) this.pawPath([[this.knife.x, this.knife.y], [L[0] + KNIFE_DX, L[1] - 40]], { seg: 700 });
      else this.pawPath([[L[0], L[1]]], { taps: 3, loops: 1 });
    } else if (n === 4) this.pawPath([[this.peeler.x, this.peeler.y], [PUMPKIN[0] - 80, PUMPKIN[1] + 100], [PUMPKIN[0] + 80, PUMPKIN[1] + 100], [PUMPKIN[0] - 80, PUMPKIN[1] + 180]], { loops: 1 });
    else if (n === 6) this.pawPath([[this.board.x, this.board.y], [POT_HOME[0] - 150, POT_HOME[1] + 80]], { seg: 700 });
    else if (n === 7) this.pawPath(this.circlePts(KNOB, 70, 70, 1.5), { seg: 90, loops: 1 });
    else if (n === 8 && this.offKnob) this.pawPath(this.circlePts(KNOB, 70, 70, 1.5).reverse(), { seg: 90, loops: 1 });
    else if (n === 8) this.pawPath([[this.ladle.x, this.ladle.y + GRAB], ...this.circlePts([POT_HOME[0], POT_HOME[1] + GRAB], 80, 40, 2)], { seg: 80, loops: 1 });
    else if (n === 9) this.pawPath([[this.pot.x, this.pot.y], POUR_P], { seg: 700 });
    else if (n === 10) this.pawPath([BTN], { hold: 1000 });
    else if (n === 11) this.pawPath([[this.blender.x, this.blender.y + 100], [POUR_BL[0], POUR_BL[1] + 100]], { seg: 700 });
    else if (n === 12) this.pawPath(this.circlePts([SIEVE_E[0], SIEVE_E[1]], 90, 45, 2), { seg: 80, loops: 1 });
    else if (n === 13) this.pawPath([[this.tureen.x + 40, this.tureen.y]], { taps: 4, loops: 1 });
    else if (n === 14 || n === 15) {
      const b = n === 14 ? this.tray : this.bowls[this.bowlF[0] < NEED.scoops ? 0 : 1];
      this.pawPath([[this.ladle.x, this.ladle.y + GRAB], [this.tureen.x, this.tureen.y + GRAB], [b.x, b.y + GRAB]], { seg: 600, loops: 1 });
    }
  }

  pauseGame() {
    if (this.g && !this.pausedState && this.phase === 'search') this.gUp();
    super.pauseGame();
  }

  update(time, delta) {
    if (this.frozen) return;
    const dt = Math.min(delta || 16, 50);
    if (this.phase === 'search' && !this.introBusy) this.clockMs += dt;
    const g = this.g;
    if (g && g.s && g.tx !== undefined) {                       // món đang cầm bám ngón tay (mượt)
      const k = 1 - Math.exp(-dt / 25), s = g.s;
      s.setPosition(s.x + (g.tx - s.x) * k, s.y + (g.ty - s.y) * k);
    }
    if (this.phase === 'search' && this.step === 7 && g && g.k === 'stirpot') this.stirPotTick(time);   // G9-15: khuấy sớm (chưa tính tiến độ bước 8)
    if (this.phase === 'search' && !this.trans) {
      if (this.step === 1) { this.washTick(time, dt); this.basinWater(time); }
      else if (this.step === 4) this.peelTick();
      else if (this.step === 8) this.stirPotTick(time);
      else if (this.step === 9) this.potTick(time, dt);
      else if (this.step === 10) this.blendTick(time, dt);
      else if (this.step === 11) this.blPourTick(time, dt);
      else if (this.step === 14 || this.step === 15) this.serveTick(time, dt);
    }
    this.boilTick(time, dt);
    if (this.flame && this.step === 8 && this.flameK > 0.35) { this.every(time, 'boilB', 200 + 400 * (1 - this.flameK), () => this.potBubble()); if (this.flameK > 0.6) this.potFish(time); }
    this.pawTick(time, dt);
    this.carryStep();
    this.drawAll(time);
    this.drawCuts();
    this.ringStep(time, dt);
    this.drawHighlight(time);
    this.drawCue(time);
    this.tagStep();
    if (!this.g && !this.trans) this.idleHints(time);
  }
}
