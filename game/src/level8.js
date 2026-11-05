// Level 8 – Tắm cho Mun. Bản chơi thử bằng khối (QUY-TRINH bước 2). Luồng theo levels/levels-01-10.md và levels/states-01-10.md
// (Level 8). Một cảnh cố định: Mun ngồi trên ghế nhựa giữa phòng tắm; vòi sen, khăn bông treo sẵn; khay dụng cụ ở đáy màn hình đổi theo 3 chặng.
// Kéo tự do nhưng ép thứ tự 10 bước: chỉ dụng cụ của bước hiện tại có tác dụng. Dụng cụ "vuốt": giữ trên chỗ cần làm và di qua lại,
// chỗ cần làm nhạt dần (thả tay giữ tiến độ). Mỗi bước một vòng tiến độ chung cạnh trên bên phải Mun, đầy là xong bước (G8-5).
// Dụng cụ "thả" (khăn bông): thả lên Mun thì Mun quấn khăn, vòng đầy dần 2,5 giây rồi khăn tự tuột về thanh treo (G8-5).
// Bước 1 kéo lá bằng tay. Bong bóng mặt Mun trên đầu báo đúng / sai (G8-4).
// Xong bước 10: Mun liếm lại lông, lè lưỡi, rồi Lộ diện (viền sáng) → chạm Mun → cảnh bế chung.
// Mun, chậu, khay, dụng cụ đều là khối có nhãn (blocks.js); key ảnh, lớp và chỗ đặt theo đặc tả để sau thay bằng ảnh thật.
import { BaseLevel, D, BAG } from './base.js';
import { PAL, rr, el, label } from './blocks.js';

// Toạ độ thế giới (khung 1024x1536), đặt theo demo đã duyệt `art/out/demo/l8_demo_stage<N>_play.png` (A8-7, A8-8: demo dồn đồ cao hơn bản khối).
// Mun neo giữa đáy (512, 1060), mọi dáng `mun_bath_*` cùng đường đáy. MUN_W, MUN_H: khung khối tạm (khi thiếu ảnh thật).
const MUN_AT = [512, 1060], MUN_W = 440, MUN_H = 520;
// Chủ dự án (2026-10-31): không có chậu. Mun ngồi trên ghế nhựa giữa phòng; vòi sen treo sẵn trên móc tường phải (ống mềm nối
// xuống van trộn), khăn bông treo sẵn trên thanh treo tường trái. Kéo hai món treo từ chỗ treo, thả ra thì về lại móc.
const STOOL = [512, 1300];                                // ghế nhựa neo đáy, mặt ghế y 1020–1060 ngay dưới Mun
const FLOOR_Y = 1300, PUDDLE = [512, 1318];               // nước chảy xuống sàn thành vũng quanh chân ghế
const DRAIN = [830, 1340], DUCK = [185, 1390];            // lỗ thoát nước (tâm), vịt (giữa đáy)
const HOOK = [917, 370], MIXER = [900, 898], RACK = [172, 438], MIRROR = [512, 328];
const HANG = { l8_tool_shower: [897, 508], l8_tool_towel: [166, 590] }; // chỗ treo (tâm món)
// Điểm phụ trong file ảnh đã cắt (px file, design-art-level8 mục 4.6). Ảnh khối tạm không có: dùng lệch dự phòng (px hiển thị).
const SHOWER_NOZZLE = [91, 123], SHOWER_TAIL = [206, 378], MIXER_JOINT = [118, 155];
const SHOWER_NOZZLE_FB = [-25, -45], SHOWER_TAIL_FB = [35, 25], MIXER_JOINT_FB = [0, 0];
const SPRAY_HIT = 50;                                     // G8-12: điểm tương tác của vòi sen = chỗ nước xả ra, dưới mặt sen một đoạn theo hướng tia (tia rơi thẳng xuống)
const SHOWER_TILT = -25;                                  // kéo vòi sen: nghiêng cho mặt sen chĩa về phía Mun
// Bước 1 (G8-4b): 4 lá khô (đỉnh đầu giữa hai tai, lưng, hông, chân sau) + 2 cành nhỏ vướng lông (lưng, đuôi). Cành nặng hơn lá.
const LEAF = { l8_leaf_a: [492, 537], l8_leaf_b: [622, 820], l8_leaf_c: [363, 925], l8_leaf_d: [630, 1022],
  l8_twig_a: [415, 822], l8_twig_b: [725, 885] };
const TWIG = { l8_twig_a: true, l8_twig_b: true };
const LEAF_FREE = 130, TWIG_FREE = 200;                  // kéo xa bao nhiêu thì rời khỏi lông (cành phải kéo xa hơn)
const BURR = [752, 940];                                                                  // chùm ké ở đuôi
// Bước 2: 2 chùm ké `l8_burr` (chung một hình): đuôi và đỉnh đầu, dưới lá. GD 2 chốt sau demo: chùm trên đầu cỡ 100% như demo.
const COMB = { burr: BURR, burr_head: [531, 580] };
const COMB_SCALE = { burr: 1, burr_head: 1 };
const MUD = { l8_mud_patch_a: [542, 862], l8_mud_patch_b: [447, 975], l8_mud_patch_c: [612, 975] }; // ngực, chân trước trái, chân phải
const MUD_R = { l8_mud_patch_a: [70, 62], l8_mud_patch_b: [62, 50], l8_mud_patch_c: [55, 45] };      // vùng xả từng mảng (bán trục)
const OIL = [512, 880];                                   // giữa lưng (gợn hương bay lên)
// G8-8, G8-9: dầu tắm là 5 vết nhỏ `l8_oil_drop` rơi vào 5 chỗ đặt sẵn. G8-11: 2 hàng, 3 vết trên, 2 vết dưới so le vào giữa
// 3 vết trên (lưng, hông dáng `wet`). Di chai qua chỗ nào còn trống thì giọt rơi vào chỗ trống gần chai nhất.
const OIL_SLOTS = [[460, 858, 0], [512, 858, 0], [564, 858, 0], [486, 900, 0], [538, 900, 0]]; // x, y, góc
const OIL_N = OIL_SLOTS.length, OIL_W = 30;               // số vết; bề rộng một vết (giọt dựng đứng)
const OIL_HIT = [45, 70];                                 // giọt rơi xuống chỗ trống nằm dưới chai trong khoảng này (ngang, dọc)
const EMOTE_AT = [668, 520];                              // bong bóng mặt Mun (neo đáy, trên đầu bên phải)
const RING_AT = [823, 590], RING_R = 60;                  // vòng tiến độ chung của bước: chỗ cố định cạnh trên bên phải Mun (G8-11: to gấp đôi)
// G8-11: màu nổi trên lông đen và nền phòng tắm sáng: vòng gợi ý cam đậm có lõi trắng; vòng tiến độ xanh lá tươi trên nền trắng.
const HINT_C = 0xff8a1e, HINT_CORE = 0xffffff, RING_FILL = 0x2fcf6a, RING_EDGE = 0x5a3a2a;
const FOAM_GAP = 44, FOAM_REACH = 78;                     // bọt nhỏ: lưới điểm phủ thân Mun; bông tắm / vòi sen tác dụng trong bán kính này
// Chỗ cần làm (elip: tâm x, y, bán trục rx, ry).
// Đo trên demo (A8-7 mục c): bước 5–7 trên dáng `wet` gầy, bước 8–10 trên dáng `fluffy` to.
const AREA = {
  burr: [...BURR, 80, 80], burr_head: [...COMB.burr_head, 80, 70], back: [512, 880, 165, 85], oil: [512, 875, 130, 60], body: [512, 915, 185, 165], face: [512, 780, 100, 72],
  mud: (k) => [...MUD[k], ...MUD_R[k]],
};
const FOAM_E = [512, 935, 150, 130], FOAM_FACE = [512, 775, 100, 80]; // lưới bọt phủ thân `wet`, chừa mặt
const MUN_SIL = [512, 840, 160, 220];                    // G8-11: elip bao dáng Mun (thân + đầu), hạt nước văng ra từ mép
const MUN_RECT = [252, 480, 520, 580];                   // vùng Mun (thả dụng cụ "lên Mun"): x, y, w, h
// Khay dụng cụ dùng lại thanh và ô túi đồ (G8-1): cùng cỡ ô, cùng khoảng cách ô, cùng độ cao như túi đồ (BAG), chỉ hiện 2–4 ô căn giữa.
const SLOT_DX = BAG.slotX[1] - BAG.slotX[0], TOOL_W = 116; // dụng cụ to gần kín ô (như icon túi đồ)
const MOVE_MS = 150;                                      // vuốt: dụng cụ phải vừa di chuyển trong 150 ms thì mới tính tiến độ
const GRAB = 70;                                          // dụng cụ nằm trên ngón tay một đoạn (như túi đồ, G3-3)

// 10 bước (states-01-10 "Dụng cụ và bước"). need: ms vuốt cần (bước 3: mỗi mảng bùn).
const STEPS = [
  null,
  { tool: null, kind: 'leaf', area: 'leaf' },
  { tool: 'l8_tool_comb_wide', kind: 'swipe', area: 'comb', need: 1500 }, // 2 chỗ: chùm ké ở đuôi và trên đầu, mỗi chỗ ~1,5 giây
  { tool: 'l8_tool_shower', kind: 'swipe', area: 'mud', need: 1500 },
  { tool: 'l8_tool_shampoo', kind: 'swipe', area: 'oil' }, // G8-8: di chai trên lưng, hông: 5 vết dầu nhỏ, mỗi vết 1/5 vòng
  { tool: 'l8_tool_sponge', kind: 'swipe', area: 'body', need: 3000 },
  { tool: 'l8_tool_facecloth', kind: 'swipe', area: 'face', need: 1500 },
  { tool: 'l8_tool_shower', kind: 'swipe', area: 'body', need: 2000 },
  { tool: 'l8_tool_towel', kind: 'drop', area: 'body', need: 2500 }, // thả lên Mun, rồi quấn 2,5 giây
  { tool: 'l8_tool_dryer', kind: 'swipe', area: 'body', need: 2500 },
  { tool: 'l8_tool_brush', kind: 'swipe', area: 'back', need: 2000 },
];
// Khay theo chặng: ô trái → phải, cố ý không theo thứ tự tắm (vòi sen, khăn bông treo sẵn, không nằm trong khay).
// Món khay dùng xong bước cuối của nó trong chặng thì mờ 50%; món treo dùng xong (bước cuối cả màn) vẫn giữ màu (G8-9).
const STAGES = [
  null,
  { steps: [1, 3], tools: ['l8_tool_comb_wide'] },
  { steps: [4, 7], tools: ['l8_tool_facecloth', 'l8_tool_sponge', 'l8_tool_shampoo'] },
  { steps: [8, 10], tools: ['l8_tool_dryer', 'l8_tool_brush'] },
];
// Trộn hai màu 0xRRGGBB theo t (0..1).
const lerpC = (a, b, t) => {
  const ch = (v, k) => (v >> k) & 255, m = (k) => Math.round(ch(a, k) + (ch(b, k) - ch(a, k)) * Phaser.Math.Clamp(t, 0, 1));
  return (m(16) << 16) | (m(8) << 8) | m(0);
};
const W_CLEAR = 0x9fd0e8, W_MUD = 0xa88a62, W_FOAM = 0xd8dfe2;
const stageOf = (n) => (n <= 3 ? 1 : n <= 7 ? 2 : 3);
const lastAll = (key) => { let l = 0; for (let n = 1; n <= 10; n++) if (STEPS[n].tool === key) l = n; return l; };
const lastUse = (stage, key) => { const [a, b] = STAGES[stage].steps; let l = 0; for (let n = a; n <= b; n++) if (STEPS[n].tool === key) l = n; return l; };

// Âm thanh chưa có file: mượn tiếng tổng hợp có sẵn trong sfx.js (không sửa sfx.js dùng chung; có file thật thì dùng file thật).
const SFX8 = {
  l8_sfx_leaf: 'sfx_leaves', l8_sfx_burr_pop: 'l4_sfx_land_tap', l8_sfx_twig: 'l3_sfx_clack', l8_sfx_shower: 'sfx_wind', l8_sfx_squirt: 'sua_sfx_blep',
  l8_sfx_foam: 'l3_sfx_pompom', mun_sfx_sneeze: 'sfx_sneeze', l8_sfx_dryer: 'sfx_wind', mun_sfx_purr: 'sua_sfx_snore',
  l8_sfx_squeak: 'l4_sfx_duck', mun_sfx_shake: 'sfx_cloth', l7_sfx_cloth: 'sfx_cloth', l8_sfx_ting: 'sfx_sparkle', l8_sfx_ting_big: 'sfx_merge',
  mun_sfx_tongue: 'sua_sfx_blep', l8_sfx_pop: 'sfx_pop_can',
};

// ---------- ảnh tạm (khối có nhãn, cỡ = cỡ hiển thị) ----------
const BLACK = '#2a2626', EYE = '#f3d58a';
// Mun ngồi trong chậu: thân elip, đầu tròn, hai tai, đuôi bên phải. o: thân (rx, ry, cy), đầu (r, cy), mắt, tai, nhãn, vẽ thêm.
function munBlock(o) {
  return [MUN_W, MUN_H, 'đáy', (c, w, h) => {
    const cx = w / 2, br = o.body || [165, 170, 340], hr = o.head || [105, 150], hx = cx + (o.headDx || 0);
    if (o.under) o.under(c, w, h);
    // đuôi
    c.lineCap = 'round'; c.lineWidth = o.tailW || 34; c.strokeStyle = PAL.brown;
    c.beginPath(); c.moveTo(cx + br[0] * 0.7, br[2] + br[1] * 0.6); c.quadraticCurveTo(cx + br[0] + 70, br[2] + 40, cx + br[0] + 30, br[2] - 70); c.stroke();
    c.lineWidth = (o.tailW || 34) - 8; c.strokeStyle = BLACK; c.stroke();
    el(c, cx, br[2], br[0], br[1], BLACK);
    if (o.spiky) { // lông xù rối
      c.fillStyle = BLACK; c.strokeStyle = PAL.brown; c.lineWidth = 3;
      for (let a = -2.6; a < 2.7; a += 0.38) {
        const x0 = cx + Math.cos(a - 0.12) * br[0], y0 = br[2] + Math.sin(a - 0.12) * br[1];
        const x1 = cx + Math.cos(a + 0.12) * br[0], y1 = br[2] + Math.sin(a + 0.12) * br[1];
        const xt = cx + Math.cos(a) * (br[0] + 26), yt = br[2] + Math.sin(a) * (br[1] + 22);
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(xt, yt); c.lineTo(x1, y1); c.fill(); c.stroke();
      }
    }
    // tai + đầu
    const ear = (s) => {
      c.beginPath();
      if (o.earsDown) { c.moveTo(hx + s * hr[0] * 0.35, hr[1] - hr[0] * 0.8); c.lineTo(hx + s * hr[0] * 1.15, hr[1] - hr[0] * 0.35); c.lineTo(hx + s * hr[0] * 0.8, hr[1] - hr[0] * 0.95); }
      else { c.moveTo(hx + s * hr[0] * 0.2, hr[1] - hr[0] * 0.85); c.lineTo(hx + s * hr[0] * 0.75, hr[1] - hr[0] * 1.45); c.lineTo(hx + s * hr[0] * 0.95, hr[1] - hr[0] * 0.4); }
      c.closePath(); c.fillStyle = BLACK; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    };
    ear(-1); ear(1);
    el(c, hx, hr[1], hr[0], hr[0] * 0.92, BLACK);
    // mắt
    const ey = hr[1] - 6, ex = hr[0] * 0.38, er = o.eyeR || 15;
    if (o.eyes === 'closed') {
      c.lineWidth = 5; c.strokeStyle = EYE;
      for (const s of [-1, 1]) { c.beginPath(); c.moveTo(hx + s * ex - 14, ey - 8); c.lineTo(hx + s * ex + 4 * s, ey); c.lineTo(hx + s * ex - 14, ey + 8); c.stroke(); }
    } else if (o.eyes === 'squint') {
      c.lineWidth = 5; c.strokeStyle = EYE;
      for (const s of [-1, 1]) { c.beginPath(); c.arc(hx + s * ex, ey + 6, 14, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); }
    } else for (const s of [-1, 1]) { el(c, hx + s * ex, ey, er, er * 1.15, EYE, PAL.brown, 3); el(c, hx + s * ex, ey + 2, er * 0.35, er * 0.7, BLACK, null); }
    if (o.tongue) { el(c, hx + 6, hr[1] + hr[0] * 0.55, 13, 18, PAL.pink, PAL.brown, 3); }
    if (o.over) o.over(c, w, h);
    label(c, o.text, cx, br[2] + 10, 26, PAL.white);
  }];
}
const lines = (c, pts, color = 'rgba(255,255,255,0.75)', lw = 5) => {
  c.lineWidth = lw; c.strokeStyle = color; c.lineCap = 'round';
  for (const [x0, y0, x1, y1] of pts) { c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); }
};
const WET = { body: [108, 162, 352], head: [86, 178], tailW: 18, eyeR: 19 };   // lông bết sát: gầy hẳn, mắt to tròn
// Dáng từng ảnh `mun_bath_*` (thân, đầu, đuôi, mắt mở tròn hay không, tai cụp) để code vẽ đuôi vẫy, chớp mắt, tai giật đúng chỗ.
const NORMAL = { body: [165, 170, 340], head: [105, 150], tailW: 34, eyeR: 15 };
const SLEEK = { body: [150, 178, 335], head: [100, 148], tailW: 34, eyeR: 15 };
const POSE = {
  mun_bath_dirty: { ...NORMAL, open: true, earsDown: true }, mun_bath_wet: { ...WET, open: true }, mun_bath_foam: { ...WET },
  mun_bath_sneeze: { ...WET }, mun_bath_towel: { ...WET },
  mun_bath_fluffy: { body: [205, 192, 318], head: [120, 140], tailW: 46, eyeR: 13, open: true }, mun_bath_sleek: { ...SLEEK, open: true },
};
// Ảnh thật (A8-8): đuôi tách riêng, xoay quanh gốc đuôi; mí mắt một ảnh chung. Điểm trong file ảnh dáng (px file, mục 4.6):
// mắt trái, mắt phải (để chớp mắt, dấu động tai), gốc đuôi (đặt neo ảnh đuôi). open: dáng mắt mở tròn thì chớp mắt.
const PTS = {
  mun_bath_dirty: { eyes: [[216, 220], [422, 224]], tail: [542, 653], tk: 'mun_bath_tail_dirty', open: true },
  mun_bath_towel: { eyes: [[216, 220], [422, 224]] },
  mun_bath_wet: { eyes: [[152, 265], [374, 265]], tail: [422, 612], tk: 'mun_bath_tail_wet', open: true },
  mun_bath_foam: { eyes: [[152, 265], [374, 265]], tail: [422, 612], tk: 'mun_bath_tail_wet' },
  mun_bath_sneeze: { eyes: [[152, 265], [374, 265]], tail: [429, 612], tk: 'mun_bath_tail_wet' },
  mun_bath_fluffy: { eyes: [[254, 255], [480, 247]], tail: [617, 617], tk: 'mun_bath_tail_fluffy', open: true },
  // G8-11: nhóm mun_bath_c đổi khung 581x723 neo (297, 715); lick liếm chân sau, mắt nhắm (không chớp); tongue đầu ngẩng, mắt tròn, chớp được.
  mun_bath_sleek: { eyes: [[183, 236], [391, 240]], tail: [475, 618], tk: 'mun_bath_tail_sleek', open: true },
  mun_bath_lick: { eyes: [[183, 236], [391, 240]], tail: [470, 640], tk: 'mun_bath_tail_sleek' },
  mun_bath_tongue: { eyes: [[212, 288], [379, 341]], tail: [470, 640], tk: 'mun_bath_tail_sleek', open: true },
};
// Ảnh đuôi vẽ dựng đứng: xoay 25° theo chiều kim đồng hồ quanh gốc thì khớp demo (Art ghi "−25°"; đo lại trên demo: góc Phaser +25).
// Mí riêng từng dáng (G8-11, Art): cùng khung, cùng neo với ảnh dáng, nên đặt chồng khít lên Mun (chép vị trí, cỡ, góc, lật).
const BLINK_KEY = { mun_bath_dirty: 'mun_bath_blink_dirty', mun_bath_wet: 'mun_bath_blink_wet', mun_bath_fluffy: 'mun_bath_blink_fluffy',
  mun_bath_sleek: 'mun_bath_blink_sleek', mun_bath_tongue: 'mun_bath_blink_tongue' };
const TAIL_REST = 25, BLINK_EYE = 208;                    // khoảng cách hai mắt (px file) mà ảnh mí mắt vẽ cho
const drips = (c) => { c.fillStyle = '#9ccbe6'; for (const [x, y] of [[150, 300], [300, 380], [190, 450], [262, 250], [330, 470]]) { c.beginPath(); c.ellipse(x, y, 6, 10, 0, 0, Math.PI * 2); c.fill(); } };

// Bọt xà phòng nhỏ (3 cỡ): tròn trắng viền xám, có chấm sáng.
const bubbleBlock = (d) => [d, d, 'tâm', (c) => { el(c, d / 2, d / 2, d / 2 - 2, d / 2 - 2, 'rgba(255,255,255,0.92)', '#b8c6d0', 2); el(c, d * 0.36, d * 0.34, d * 0.1, d * 0.07, '#ffffff', null); }];

function emoteBubble(c, w, h) {
  rr(c, 6, 6, w - 12, h - 34, PAL.cream, 30);
  c.beginPath(); c.moveTo(40, h - 30); c.lineTo(30, h - 4); c.lineTo(64, h - 30); c.closePath();
  c.fillStyle = PAL.cream; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
}
// Mặt mèo đen nhỏ trong bong bóng: vui (mắt cong ^ ^, miệng cười) hoặc nhăn (mắt > <, miệng méo, giọt mồ hôi).
function emoteFace(c, happy) {
  const cx = 75, cy = 56;
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(cx + s * 10, cy - 24); c.lineTo(cx + s * 30, cy - 46); c.lineTo(cx + s * 36, cy - 12); c.closePath(); c.fillStyle = BLACK; c.fill(); }
  el(c, cx, cy, 38, 32, BLACK, PAL.brown, 3);
  c.lineWidth = 5; c.strokeStyle = EYE; c.lineCap = 'round';
  if (happy) {
    for (const s of [-1, 1]) { c.beginPath(); c.arc(cx + s * 15, cy + 2, 8, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); }
    c.strokeStyle = PAL.pink; c.beginPath(); c.arc(cx, cy + 10, 10, Math.PI * 0.15, Math.PI * 0.85); c.stroke();
  } else {
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(cx + s * 22, cy - 8); c.lineTo(cx + s * 10, cy - 2); c.lineTo(cx + s * 22, cy + 4); c.stroke(); }
    c.strokeStyle = PAL.pink; c.beginPath(); c.arc(cx, cy + 24, 9, Math.PI * 1.15, Math.PI * 1.85); c.stroke();
    el(c, cx + 46, cy - 18, 6, 9, PAL.sky, PAL.brown, 2);
  }
}

// Khối tạm cho đuôi, mí mắt (chỉ dùng khi thiếu ảnh thật).
const tailBlock = [60, 150, 'đáy', (c, w, h) => { c.lineCap = 'round'; lines(c, [[w / 2, h - 10, w / 2, 14]], PAL.brown, 34); lines(c, [[w / 2, h - 10, w / 2, 14]], BLACK, 26); }];
const toolBlock = (w, h, text, draw) => [w, h, 'tâm', (c) => { draw(c, w, h); label(c, text, w / 2, h - 30, 20); }];

const FB = {
  l8_bg_bathroom: [1024, 1536, 'bg', (c, w, h) => {
    c.fillStyle = '#dcefeb'; c.fillRect(0, 0, w, h);
    c.lineWidth = 2; c.strokeStyle = '#c3dcd6';
    for (let y = 0; y < 1250; y += 96) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    for (let x = 0; x < w; x += 96) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1250); c.stroke(); }
    c.fillStyle = '#f2e2cc'; c.fillRect(0, 1250, w, h - 1250); c.fillStyle = '#e4cfb2'; c.fillRect(0, 1250, w, 16);
    rr(c, 120, 230, 220, 280, '#eef7fb', 14);                 // cửa sổ nhỏ, nắng sáng
    rr(c, 700, 300, 200, 40, PAL.wood, 8);                     // kệ
    label(c, 'PHÒNG TẮM (sáng)', 512, 170, 26);
  }],
  l8_mirror: [296, 256, 'tâm', (c, w, h) => { rr(c, 6, 6, w - 12, h - 12, PAL.wood, 14); rr(c, 26, 26, w - 52, h - 52, '#eef7fb', 8); }],
  mun_bath_tail_dirty: tailBlock, mun_bath_tail_wet: tailBlock, mun_bath_tail_fluffy: tailBlock, mun_bath_tail_sleek: tailBlock,
  mun_bath_blink: [100, 46, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 2, h / 2 - 2, BLACK, null); lines(c, [[14, h / 2, 40, h / 2], [w - 40, h / 2, w - 14, h / 2]], EYE, 5); }],
  l8_stool_plastic: [260, 200, 'đáy', (c, w, h) => {
    rr(c, 10, 6, w - 20, 34, '#8fc6e6', 14);                              // mặt ghế
    c.lineWidth = 16; c.lineCap = 'round'; c.strokeStyle = '#6faed2';
    for (const [x0, x1] of [[40, 22], [w - 40, w - 22], [96, 90], [w - 96, w - 90]]) { c.beginPath(); c.moveTo(x0, 40); c.lineTo(x1, h - 8); c.stroke(); }
    label(c, 'GHẾ NHỰA', w / 2, 110, 20);
  }],
  l8_shower_hook: [70, 60, 'tâm', (c) => { rr(c, 14, 6, 42, 18, PAL.gray, 6); lines(c, [[35, 22, 35, 44], [35, 44, 48, 52]], PAL.brown, 6); }],
  l8_shower_mixer: [120, 80, 'tâm', (c, w) => { rr(c, 6, 18, w - 12, 44, PAL.tin, 14); el(c, w / 2, 40, 16, 16, PAL.gray); label(c, 'VAN', w / 2, 72, 14); }],
  l8_towel_rack: [220, 40, 'tâm', (c, w) => { rr(c, 4, 12, w - 8, 16, PAL.woodDark, 8); el(c, 10, 20, 9, 14, PAL.wood); el(c, w - 10, 20, 9, 14, PAL.wood); }],
  l8_floor_drain: [90, 40, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 3, h / 2 - 3, PAL.gray); lines(c, [[22, 20, 68, 20], [30, 12, 60, 12], [30, 28, 60, 28]], '#8d877f', 3); }],
  l8_duck: [110, 92, 'đáy', (c, w, h) => {
    el(c, 52, 62, 46, 26, PAL.gold); el(c, 76, 30, 22, 22, PAL.gold);
    c.beginPath(); c.moveTo(94, 30); c.lineTo(108, 36); c.lineTo(94, 40); c.closePath(); c.fillStyle = '#f0a24a'; c.fill();
    el(c, 80, 26, 3, 3, BLACK, null); label(c, 'VỊT', 50, 66, 16);
  }],
  l8_leaf_a: [86, 56, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 4, h / 2 - 6, '#d9a35a'); lines(c, [[10, h / 2, w - 10, h / 2]], PAL.brown, 3); }],
  l8_leaf_b: [80, 60, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 4, h / 2 - 8, '#c97f4a'); lines(c, [[10, h / 2 + 6, w - 10, h / 2 - 6]], PAL.brown, 3); }],
  l8_leaf_c: [90, 54, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 4, h / 2 - 6, '#e0b56a'); lines(c, [[10, h / 2 - 4, w - 10, h / 2 + 4]], PAL.brown, 3); }],
  l8_leaf_d: [76, 52, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 4, h / 2 - 6, '#d18f52'); lines(c, [[10, h / 2 + 4, w - 10, h / 2 - 4]], PAL.brown, 3); }],
  l8_twig_a: [130, 60, 'tâm', (c, w, h) => { c.lineCap = 'round'; lines(c, [[10, 44, 120, 18], [70, 30, 92, 50]], PAL.brown, 12); lines(c, [[10, 44, 120, 18], [70, 30, 92, 50]], PAL.woodDark, 7); label(c, 'CÀNH', w / 2, h / 2 - 4, 13); }],
  l8_twig_b: [110, 80, 'tâm', (c, w, h) => { c.lineCap = 'round'; lines(c, [[12, 66, 96, 14], [52, 42, 30, 16]], PAL.brown, 12); lines(c, [[12, 66, 96, 14], [52, 42, 30, 16]], PAL.woodDark, 7); label(c, 'CÀNH', w / 2, h / 2, 13); }],
  l8_burr: [124, 104, 'tâm', (c) => {
    for (const [x, y] of [[36, 36], [78, 30], [56, 64], [96, 66], [30, 76]]) {
      c.fillStyle = '#9a8a4a'; c.strokeStyle = PAL.brown; c.lineWidth = 3;
      c.beginPath(); for (let a = 0; a < Math.PI * 2; a += Math.PI / 7) { const r = a % (Math.PI / 3.5) < 0.1 ? 26 : 19; c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
      c.closePath(); c.fill(); c.stroke();
    }
    label(c, 'KÉ', 62, 54, 16);
  }],
  l8_mud_patch_a: [140, 92, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 6, h / 2 - 6, '#8a6a45', '#6b4a2a', 3); lines(c, [[30, 40, 60, 52], [60, 52, 90, 36], [70, 60, 100, 66]], '#5e4026', 3); label(c, 'BÙN', w / 2, h / 2, 16, PAL.cream); }],
  l8_mud_patch_b: [108, 74, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 6, h / 2 - 6, '#8a6a45', '#6b4a2a', 3); lines(c, [[24, 30, 54, 42], [54, 42, 80, 30]], '#5e4026', 3); label(c, 'BÙN', w / 2, h / 2, 15, PAL.cream); }],
  l8_mud_patch_c: [118, 80, 'tâm', (c, w, h) => { el(c, w / 2, h / 2, w / 2 - 6, h / 2 - 6, '#8a6a45', '#6b4a2a', 3); lines(c, [[26, 34, 58, 46], [58, 46, 92, 40]], '#5e4026', 3); label(c, 'BÙN', w / 2, h / 2, 15, PAL.cream); }],
  // Một vết dầu nhỏ dáng giọt dầu (G8-10): đầu nhọn hướng lên, đáy tròn ở dưới, vàng nhạt trong, có chấm sáng. Code đặt 5 lần.
  l8_oil_drop: [36, 52, 'tâm', (c, w, h) => {
    const r = w / 2 - 3, cy = h - r - 3;
    c.beginPath(); c.moveTo(w / 2, 3);
    c.bezierCurveTo(w / 2 + r * 0.4, h * 0.25, w / 2 + r, cy - r * 0.5, w / 2 + r, cy);
    c.arc(w / 2, cy, r, 0, Math.PI, false);
    c.bezierCurveTo(w / 2 - r, cy - r * 0.5, w / 2 - r * 0.4, h * 0.25, w / 2, 3);
    c.closePath(); c.fillStyle = 'rgba(247,226,150,0.9)'; c.fill(); c.lineWidth = 3; c.strokeStyle = '#c99a4a'; c.stroke();
    el(c, w * 0.38, cy - 2, 4, 6, '#ffffff', null);
  }],
  l8_foam_bubble_a: bubbleBlock(30),
  l8_foam_bubble_b: bubbleBlock(44),
  l8_foam_bubble_c: bubbleBlock(60),
  l8_tool_comb_wide: toolBlock(150, 150, 'LƯỢC\nTHƯA', (c) => {
    rr(c, 18, 26, 114, 30, PAL.woodDark, 10);
    for (let x = 28; x < 128; x += 20) rr(c, x, 52, 10, 50, PAL.wood, 4, PAL.brown, 3);
  }),
  // Đầu vòi quay sang trái (về phía Mun) cả lúc treo lẫn lúc kéo (G8-4); đuôi tay cầm bên phải nối ống mềm.
  l8_tool_shower: toolBlock(150, 150, 'VÒI\nSEN', (c) => {
    c.lineCap = 'round'; c.lineWidth = 20; c.strokeStyle = PAL.brown; c.beginPath(); c.moveTo(110, 100); c.lineTo(62, 48); c.stroke();
    c.lineWidth = 13; c.strokeStyle = PAL.gray; c.stroke();
    el(c, 50, 40, 32, 24, PAL.tin); for (const [x, y] of [[58, 36], [46, 32], [50, 46], [38, 42]]) el(c, x, y, 3, 3, PAL.brown, null);
  }),
  l8_tool_shampoo: toolBlock(150, 150, 'DẦU\nTẮM', (c) => {
    rr(c, 50, 14, 50, 22, PAL.white, 6); rr(c, 38, 32, 74, 74, PAL.pink, 16);
    el(c, 66, 64, 10, 10, PAL.white, PAL.brown, 2); el(c, 86, 56, 7, 7, PAL.white, PAL.brown, 2); el(c, 80, 78, 6, 6, PAL.white, PAL.brown, 2);
  }),
  l8_tool_sponge: toolBlock(150, 150, 'BÔNG\nTẮM', (c) => {
    for (const [x, y, r] of [[56, 52, 28], [92, 48, 28], [74, 74, 30], [48, 82, 22], [102, 80, 22]]) el(c, x, y, r, r, '#f7c9a8');
  }),
  l8_tool_facecloth: toolBlock(150, 150, 'KHĂN\nMẶT', (c) => { rr(c, 34, 22, 82, 76, PAL.sky, 10); lines(c, [[34, 60, 116, 60]], '#8fb6d0', 3); }),
  // Khăn bông to vắt trên thanh treo (cũng là dáng khi kéo đi).
  l8_tool_towel: toolBlock(170, 230, 'KHĂN\nBÔNG', (c, w, h) => {
    rr(c, 14, 8, w - 28, h - 16, PAL.pink, 14); rr(c, 14, 8, w - 28, 40, '#f3b0b9', 14);
    lines(c, [[24, h - 80, w - 24, h - 80], [24, h - 60, w - 24, h - 60]], '#e3909b', 3);
  }),
  l8_tool_dryer: toolBlock(150, 150, 'MÁY\nSẤY', (c) => {
    rr(c, 50, 70, 24, 40, PAL.mint, 8); el(c, 62, 54, 34, 30, PAL.mint); rr(c, 90, 42, 44, 24, '#a5cfac', 8);
    lines(c, [[138, 46, 146, 40], [138, 56, 148, 56]], PAL.gray, 3);
  }),
  l8_tool_brush: toolBlock(150, 150, 'LƯỢC\nCHẢI', (c) => {
    rr(c, 20, 60, 50, 22, PAL.woodDark, 10); el(c, 96, 60, 40, 28, PAL.wood);
    for (let x = 70; x < 124; x += 8) lines(c, [[x, 84, x, 96]], PAL.brown, 2);
  }),
  // Mun – mọi dáng cùng khung 440x520, cùng đường đáy.
  mun_bath_dirty: munBlock({ spiky: true, earsDown: true, text: 'MUN\nbẩn, co ro' }),
  mun_bath_wet: munBlock({ ...WET, text: 'MUN ướt\ngầy nhẳng', over: drips }),
  // Bọt là nhiều bọt nhỏ `l8_foam_bubble_a/b/c` riêng (nở ở bước 5, vỡ ở bước 7); dáng này chỉ là thân bết nước, mắt híp dễ chịu.
  mun_bath_foam: munBlock({ ...WET, eyes: 'squint', text: 'MUN\n(trong bọt)' }),
  mun_bath_sneeze: munBlock({ ...WET, eyes: 'closed', text: 'HẮT XÌ!' }),
  mun_bath_towel: munBlock({ ...WET, eyes: 'squint', text: '', over: (c, w) => {
    c.beginPath(); c.moveTo(w / 2 - 175, 520 - 6); c.lineTo(w / 2 - 150, 238); c.quadraticCurveTo(w / 2, 180, w / 2 + 150, 238); c.lineTo(w / 2 + 175, 514); c.closePath();
    c.fillStyle = PAL.pink; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    lines(c, [[w / 2 - 140, 330, w / 2 + 140, 330], [w / 2 - 150, 420, w / 2 + 150, 420]], '#e3909b', 3);
    label(c, 'QUẤN KHĂN', w / 2, 380, 26);
  } }),
  mun_bath_fluffy: munBlock({ body: [205, 192, 318], head: [120, 140], tailW: 46, eyeR: 13, text: 'CỤC BÔNG\nđen tròn xoe', over: (c, w) => {
    c.strokeStyle = PAL.brown; c.lineWidth = 3; c.fillStyle = BLACK;
    for (let a = 0; a < Math.PI * 2; a += 0.33) { c.beginPath(); c.arc(w / 2 + Math.cos(a) * 205, 318 + Math.sin(a) * 192, 18, 0, Math.PI * 2); c.fill(); c.stroke(); }
  } }),
  mun_bath_sleek: munBlock({ body: [150, 178, 335], head: [100, 148], text: 'MUN\nmượt bóng', over: (c, w) => {
    lines(c, [[w / 2 - 90, 260, w / 2 - 40, 230], [w / 2 + 40, 300, w / 2 + 100, 270], [w / 2 - 110, 400, w / 2 - 60, 380]]);
  } }),
  mun_bath_lick: munBlock({ body: [150, 178, 335], head: [96, 262], headDx: 70, eyes: 'closed', text: 'LIẾM\nlông' }),
  mun_bath_tongue: munBlock({ body: [150, 178, 335], head: [96, 230], headDx: 50, eyes: 'round', tongue: true, text: 'LÈ\nLƯỠI' }),
  // Bong bóng biểu cảm trên đầu Mun (G8-4, key tạm): mặt mèo đen vui (làm đúng) / nhăn (dùng sai). Không chữ.
  ui_emote_mun_happy: [150, 130, 'đáy', (c, w, h) => { emoteBubble(c, w, h); emoteFace(c, true); }],
  ui_emote_mun_no: [150, 130, 'đáy', (c, w, h) => { emoteBubble(c, w, h); emoteFace(c, false); }],
  // Bong bóng nhiệm vụ L8: Mun lấm bùn → mũi tên → Mun sạch lấp lánh (đặc tả chưa có key riêng, xem art/review/level8-thread.md).
  l8_icon_mun_clean: [120, 120, 'tâm', (c) => {
    el(c, 60, 66, 46, 42, BLACK);
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(60 + s * 12, 34); c.lineTo(60 + s * 38, 8); c.lineTo(60 + s * 44, 46); c.closePath(); c.fillStyle = BLACK; c.fill(); c.lineWidth = 3; c.strokeStyle = PAL.brown; c.stroke(); }
    lines(c, [[36, 52, 50, 44], [70, 84, 86, 76]]);
    el(c, 46, 64, 6, 7, EYE, null); el(c, 74, 64, 6, 7, EYE, null);
    c.fillStyle = PAL.gold; for (const [x, y] of [[104, 22], [14, 30], [108, 96]]) { c.beginPath(); c.moveTo(x, y - 10); c.lineTo(x + 4, y); c.lineTo(x, y + 10); c.lineTo(x - 4, y); c.closePath(); c.fill(); }
  }],
};

export class Level8 extends BaseLevel {
  constructor() { super('Level8'); }

  get levelNo() { return 8; }
  get fallbacks() { return FB; }
  get fallbackCanvas() { return true; }
  get rewardFish() { return 30; }
  get introCallLater() { return true; }                    // mở màn riêng: không có nhân vật gọi
  get introLockMax() { return 9000; }
  get introBubbleAt() { return [720, 420 + this.Y0]; }      // bong bóng bật ra từ đầu Mun (toạ độ màn hình)
  get suaHand() { return false; }

  sfx(key, gain = 1) { super.sfx(this.cache.audio.exists(key) ? key : SFX8[key] || key, gain); }

  resetLevel() {
    Object.assign(this, { emoteS: null, step: 1, done: 0, prog: {}, leaves: {}, tools: [], stage: 0, trayBusy: false, tdrag: null, ldrag: null,
      munKey: 'mun_bath_dirty', munSX: 1, puddleR: 0, duckSpinAt: 0, sprayShakeAt: 0, hangTools: null, flashUntil: 0, clockMs: 0, sprayAt: 0, loopSfxAt: 0, bubbleAtT: 0, oilS: [], oilSlot: [], towelOn: false, nuzzleAt: 0, foamB: [], foamFill: [], foamPopAt: 0,
      ringOn: false, ringA: 0, ringS: { k: 0 }, ringTouchAt: 0, streak: 0, airB: [], fxAt: {}, blinkAt: 0, blinkUntil: 0, earAt: 0, drying: false,
      secretDuck: false, finale: false, water: { c: W_CLEAR }, clockText: null });
  }

  // ---------- dựng cảnh ----------
  buildRoom() {
    this.buildBg('l8_bg_bathroom');
    this.img('l8_mirror', ...MIRROR, 1);                         // gương nhỏ trên tường sau (tách khỏi nền, A8-7)
    this.drain = this.img('l8_floor_drain', ...DRAIN, 2);
    this.waterG = this.add.graphics().setDepth(3);               // vũng nước trên sàn
    this.stool = this.img('l8_stool_plastic', ...STOOL, 18);
    this.rack = this.img('l8_towel_rack', ...RACK, 6);
    this.img('l8_shower_hook', ...HOOK, 6);
    this.mixer = this.img('l8_shower_mixer', ...MIXER, 6);
    this.hose = this.add.graphics().setDepth(7);                 // ống mềm từ van tới tay vòi sen
    this.mun = this.img('mun_bath_dirty', ...MUN_AT, 20).setVisible(false);
    this.tail = this.img('mun_bath_tail_dirty', ...MUN_AT, 19.5).setVisible(false); // đuôi tách riêng, dưới thân (aliveStep đặt, xoay)
    this.blink = this.img('mun_bath_blink', ...MUN_AT, 20.5).setVisible(false);     // mí mắt chớp đè lên mắt
    this.sua = this.mun; // cảnh bế chung, viền sáng dùng this.sua
    // Lớp phủ trên Mun (bám theo Mun khi Mun nhún, lắc).
    this.mud = {}; this.leafS = {};
    for (const [k, p] of Object.entries(MUD)) this.mud[k] = this.img(k, ...p, 21);
    this.burr = this.img('l8_burr', ...BURR, 22);
    this.combS = { burr: this.burr };
    this.combS.burr_head = this.img('l8_burr', ...COMB.burr_head, 22);
    this.combS.burr_head.base *= COMB_SCALE.burr_head; this.combS.burr_head.baseY = this.combS.burr_head.base;
    this.combS.burr_head.setScale(this.combS.burr_head.base);
    // Lưới điểm bọt phủ thân Mun (chừa mặt): bông tắm đi tới đâu, bọt nhỏ nở ở điểm đó.
    this.foamPts = [];
    const [bx, by, brx, bry] = FOAM_E;
    for (let y = by - bry; y <= by + bry; y += FOAM_GAP) for (let x = bx - brx; x <= bx + brx; x += FOAM_GAP) {
      const ox = ((y / FOAM_GAP) % 2) * FOAM_GAP / 2;
      if (((x + ox - bx) / brx) ** 2 + ((y - by) / bry) ** 2 <= 0.92 && !this.inEll(FOAM_FACE, x + ox, y, 0)) this.foamPts.push([x + ox, y]);
    }
    for (const [k, p] of Object.entries(LEAF)) this.leafS[k] = this.img(k, ...p, 25);
    this.over = [...Object.values(this.mud), ...Object.values(this.combS), ...Object.values(this.leafS)];
    this.over.forEach((s) => s.setVisible(false));
    this.duck = this.img('l8_duck', ...DUCK, 8);
    // Món treo sẵn: luôn có mặt cả màn, kéo ra từ chỗ treo, thả ra thì về móc (đung đưa).
    this.hangTools = Object.entries(HANG).map(([key, home]) => {
      const s = this.img(key, ...home, 9);
      return { key, s, home: [...home], hang: true, faded: false, last: lastAll(key), depth0: 9 };
    });
    this.zone('duck', this.artRect(this.duck), D.zone + 5);
    this.hl = this.add.graphics().setDepth(29);                    // viền sáng chỗ cần làm
    this.ringG = this.add.graphics().setDepth(D.fx + 1);           // vòng tiến độ cạnh chỗ cần làm (G8-4)
    this.fxG = this.add.graphics().setDepth(D.fx);
    this.aliveG = this.add.graphics().setDepth(20.5);              // đuôi vẫy, chớp mắt (vẽ đè lên ảnh Mun, dưới lớp phủ)
    this.zone('mun', new Phaser.Geom.Rectangle(...MUN_RECT), D.zone + 3).disableInteractive();
    this.player = this.img('player_call', 0, 0, D.player).setVisible(false); // không xuất hiện (G8-1); BaseLevel và bộ chơi thử cần có
    this.bar = this.img('ui_bag_bar', 512, 2400, D.ui - 3).setInteractive(); // chạm khay: không ra vòng chạm trống
    this.barK = BAG.barW / this.trimWidth('ui_bag_bar');
    this.drawWater();
    this.time.addEvent({ delay: 4200, loop: true, callback: () => this.munIdle() });
    if (new URLSearchParams(location.search).get('clock') === '1') {
      this.clockText = this.add.text(512, 120, '', { fontFamily: 'Arial', fontSize: '28px', color: '#6b4a3a' }).setOrigin(0.5).setScrollFactor(0).setDepth(D.ui + 40);
    }
  }

  // Bong bóng nhiệm vụ: Mun lấm bùn → mũi tên → Mun sạch lấp lánh, quanh có vài bọt xà phòng.
  buildUI() {
    super.buildUI();
    const B = this.bubble;
    B.dark.setVisible(false); B.q.setVisible(false);
    const clean = this.add.image(0, 2, 'l8_icon_mun_clean'); clean.setScale(150 / clean.width); // G8-7: chỉ mặt Mun lúc sạch
    const suds = [[-120, -50, 10], [120, -56, 12], [0, -60, 8], [-30, 58, 9], [44, 60, 7]].map(([x, y, r]) =>
      this.add.circle(x, y, r, 0xffffff, 1).setStrokeStyle(3, 0xb8c6d0));
    B.icons = [clean, ...suds];
    B.ct.add(B.icons);
  }

  bubbleFound() {
    super.bubbleFound();
    this.tweens.add({ targets: this.bubble.icons, alpha: 0, delay: 200, duration: 250 });
  }

  layout() {
    super.layout();
    if (!this.bar) return;
    this.trayY = this.bagY() - 90; // tâm ô, như túi đồ
    if (!this.tools.length || this.trayBusy) return;
    this.bar.y = this.bagY();
    this.tools.forEach((t) => {
      t.home[1] = this.trayY;
      t.slot.y = this.trayY;
      if (t !== (this.tdrag && this.tdrag.t) && !t.back) t.s.setPosition(...t.home);
    });
  }

  // ---------- khay theo chặng ----------
  slotX(i, n) { return 512 + (i - (n - 1) / 2) * SLOT_DX; }

  // Dựng khay chặng n ở dưới mép màn hình rồi trượt lên (0,25 giây, ease-out). Khoá kéo trong lúc trượt.
  trayIn(n, done) {
    this.stage = n;
    const keys = STAGES[n].tools, off = 330;
    // G8-12: khay riêng 1 ô, 2 ô (ui_bag_bar_1, _2) co cùng hệ số với khay 4 ô, không kéo giãn; 3 ô dùng khay 4 ô nguyên cỡ.
    // Thiếu ảnh khay riêng thì quay về thanh túi đồ co theo số ô như trước.
    const barKey = { 1: 'ui_bag_bar_1', 2: 'ui_bag_bar_2' }[keys.length] || 'ui_bag_bar';
    if (this.realKey(barKey)) this.applyKey(this.bar, barKey);
    if (this.bar.texture.key === barKey && (barKey !== 'ui_bag_bar' || keys.length === 3)) this.bar.setScale(this.barK);
    else this.bar.setScale(this.barK * (BAG.barW - (4 - keys.length) * SLOT_DX) / BAG.barW, this.barK);
    this.bar.setY(this.bagY() + off).setVisible(true);
    this.tools = keys.map((key, i) => {
      const home = [this.slotX(i, keys.length), this.trayY];
      const slot = this.img('ui_bag_slot', home[0], home[1] + off, D.ui - 2).setOrigin(0.5, 0.5);
      this.fitWidth(slot, BAG.slotW);
      const s = this.img(key, home[0], home[1] + off, D.ui - 1);
      s.base = s.baseY = TOOL_W / Math.max(s.width, s.height);
      s.setScale(s.base);
      return { key, i, s, slot, home, faded: false, last: lastUse(n, key), depth0: D.ui - 1 };
    });
    this.trayBusy = true;
    this.tweens.add({ targets: this.trayParts(), y: `-=${off}`, duration: 250, ease: 'Quad.out', onComplete: () => {
      this.trayBusy = false;
      done && done();
    } });
  }

  trayOut(done) {
    this.trayBusy = true;
    const off = 330;
    // Xong bước cuối chặng khi còn đang giữ dụng cụ: món khay theo khay trượt xuống, món treo về móc.
    if (this.tdrag) { const t = this.tdrag.t; this.tdrag = null; if (t.hang) this.returnTool(t, false); }
    this.tools.forEach((t) => { this.tweens.killTweensOf(t.s); t.s.setPosition(...t.home).setAngle(0); });
    this.tweens.add({ targets: this.trayParts(), y: `+=${off}`, duration: 250, ease: 'Quad.in', onComplete: () => {
      this.tools.forEach((t) => { t.s.destroy(); t.slot.destroy(); });
      this.tools = [];
      done && done();
    } });
  }

  allTools() { return [...this.tools, ...this.hangTools]; }

  trayParts() { return [this.bar, ...this.tools.flatMap((t) => [t.slot, t.s])]; }

  nextStage(n) {
    this.streak = 0;
    this.trayOut(() => this.trayIn(n, () => { this.musicLayer(n); this.touch(); }));
  }

  // Móc sẵn: nhạc thêm một lớp khi vào chặng 2, 3. Game chưa có nhạc nền nên bản khối để trống (G8-2).
  musicLayer() {}

  // ---------- Mun ----------
  applyMun(key) {
    this.applyKey(this.mun, key);
    this.mun.setScale(this.mun.base * this.munSX, this.mun.baseY * this.munSX);
  }

  setMun(key) {
    this.munKey = key;
    if (!this.busy.mun) this.swap(this.mun, key, () => this.applyMun(key));
  }

  // Dáng tạm (lắc đầu, hắt xì…) rồi về dáng hiện tại của bước.
  pose(key, ms, done) {
    this.busy.mun = true;
    this.applyMun(key);
    this.time.delayedCall(ms, () => { this.busy.mun = false; this.applyMun(this.munKey); done && done(); });
  }

  // Thở nhẹ; bước 1–3 thỉnh thoảng run.
  munIdle() {
    if (this.phase !== 'search' || this.busy.mun || this.frozen || this.tweens.isTweening(this.mun)) return;
    if (this.step <= 3) this.tweens.add({ targets: this.mun, x: { from: MUN_AT[0] - 3, to: MUN_AT[0] + 3 }, duration: 50, yoyo: true, repeat: 3, onComplete: () => this.mun.setX(MUN_AT[0]) });
    else this.squash(this.mun);
  }

  overlaysOn() {
    for (const s of this.over) this.attachTo(s, this.mun);
    Object.values(this.mud).forEach((s) => s.setVisible(true));
    Object.values(this.combS).forEach((s) => s.setVisible(true));
    Object.values(this.leafS).forEach((s) => s.setVisible(true));
  }

  // ---------- mở màn (khoá tương tác) ----------
  // G8-1: không có cảnh nhân vật bế vào. Cảnh hiện dần, Mun đã ngồi sẵn trong chậu, lắc mình rơi vụn bùn, rồi bong bóng nhiệm vụ.
  onIntro() {
    this.mun.setVisible(true);
    this.overlaysOn();
    const T = (ms, fn) => this.time.delayedCall(ms, fn);
    T(600, () => { // lắc mình một cái, vụn bùn rơi
      this.smoothShake(5, 3, 560);
      this.sfx('mun_sfx_shake');
      this.splash(MUN_AT[0], 900, 0x8a6a45, 10);
    });
    T(1000, () => this.trayIn(1));
    T(1500, () => {
      this.bubbleIntro();
      this.locked = false;
      this.phase = 'search';
      this.zones.mun.setInteractive();
      this.touch();
    });
  }

  // ---------- nhập liệu: kéo dụng cụ từ khay, kéo lá khỏi Mun ----------
  setupInput() {
    super.setupInput();
    this.input.on('pointerdown', (p) => this.dragStart(p));
    this.input.on('pointermove', (p) => this.dragMove(p));
    this.input.on('pointerup', (p) => this.dragEnd(p));
  }

  canDrag() { return !this.locked && !this.introBusy && !this.trayBusy && this.phase === 'search' && !this.frozen; }

  dragStart(p) {
    if (!this.canDrag() || this.tdrag || this.ldrag) return;
    const x = p.worldX, y = p.worldY;
    // Nhấc được cả món đang bay về ô (bấm vào chỗ món đang ở, hoặc vào ô của nó).
    const t = this.allTools().find((o) => !o.using && this.toolHit(o, x, y));
    if (t) {
      if (t.back) { this.tweens.killTweensOf(t.s); t.back = false; t.s.setAlpha(1); }
      this.press = null; // không tính là chạm đồ trong cảnh
      this.touch(); this.handHide('paw');
      // G8-5: nhấc lên là món tới ngay dưới ngón tay (update nội suy nhanh tới đích tx, ty), không chờ kéo đủ xa mới nhảy.
      this.tdrag = { t, x0: x, y0: y, moved: false, lastMove: 0, wiggleAt: 0, tx: x, ty: y - GRAB, px: x, py: y };
      t.s.setDepth(D.ui + 20);
      this.brushFace(t, true); // G8-12: lược nhấc lên thì úp mặt lông xuống
      // Món khay to hơn ô 1,3 lần như túi đồ; vòi sen 105%, nghiêng cho mặt sen chĩa về phía Mun; khăn đã to nên giữ cỡ.
      const up = t.hang ? (t.key === 'l8_tool_towel' ? 1 : 1.05) : 1.3;
      this.tweens.add({ targets: t.s, scale: t.s.base * up, angle: t.key === 'l8_tool_shower' ? SHOWER_TILT : 0, duration: 120, ease: 'Quad.out' });
      return;
    }
    if (this.step === 1) {
      const k = Object.keys(LEAF).find((k) => !this.leaves[k] && Math.hypot(x - this.leafS[k].x, y - this.leafS[k].y) < 62);
      if (k) {
        this.press = null;
        this.touch(); this.handHide('paw');
        const s = this.leafS[k];
        this.detach(s);
        this.ldrag = { k, s, ox: s.x, oy: s.y, free: false, heavy: !!TWIG[k], tx: s.x, ty: s.y };
      }
    }
  }

  dragMove(p) {
    const x = p.worldX, y = p.worldY;
    if (this.ldrag) {
      const L = this.ldrag, d = Math.hypot(x - L.ox, y - L.oy);
      if (!L.free && d > (L.heavy ? TWIG_FREE : LEAF_FREE)) { // rời khỏi lông: Mun lắc người nhẹ (±4°, 0,3 giây), giật tai
        L.free = true;
        this.sfx(L.heavy ? 'l8_sfx_twig' : 'l8_sfx_leaf', 0.6);
        if (!this.busy.mun) this.smoothShake(4, 2, 420);
        this.earFx(0);
      }
      // Lá níu theo lông một chút rồi mới rời ra; cành vướng chặt hơn và theo tay chậm hơn (update kéo dần tới chỗ ngón tay).
      L.tx = x; L.ty = y;
      if (L.free) { if (!L.heavy) L.s.setPosition(x, y); }
      else { const k = L.heavy ? 0.18 : 0.3; L.s.setPosition(L.ox + (x - L.ox) * k, L.oy + (y - L.oy) * k).setAngle((x - L.ox) * 0.08); }
      return;
    }
    const D0 = this.tdrag;
    if (!D0) return;
    D0.tx = x; D0.ty = y - GRAB;
    const now = this.time.now, dist = Math.hypot(x - D0.px, y - D0.py);
    if (dist > 2) {
      const sp = dist / Math.max(8, now - D0.lastMove);                                    // px/ms
      D0.speed = (D0.speed || 0) * 0.7 + Math.min(sp, 3) * 0.3;
      D0.lastMove = now; D0.px = x; D0.py = y;
    }
    if (!D0.moved && Math.hypot(x - D0.x0, y - D0.y0) >= 12) D0.moved = true;
  }

  // Điểm tác dụng của dụng cụ đang kéo: vòi sen là chỗ nước xả ra (G8-12), món khác là chính dụng cụ.
  toolPt(D0) {
    if (D0.t.key !== 'l8_tool_shower') return [D0.tx, D0.ty];
    const [x, y] = this.spritePt(D0.t.s, SHOWER_NOZZLE, SHOWER_NOZZLE_FB);
    return [x, y + SPRAY_HIT];
  }

  dragEnd() {
    if (this.ldrag) { this.leafRelease(); return; }
    const D0 = this.tdrag;
    if (!D0) return;
    this.tdrag = null;
    const t = D0.t, s = t.s, [px, py] = this.toolPt(D0); // vòi sen: thả sai bước tính theo chỗ nước xả ra (G8-12)
    s.setAngle(0);
    this.brushFace(t, false); // thả tay: lược lại mở
    if (!D0.moved) { this.sfx('sfx_tap'); this.returnTool(t, false, 150); return; } // chạm món: nhấc lên rồi về chỗ
    s.setPosition(D0.tx, D0.ty);
    if (D0.doneStep) { this.returnTool(t, false); return; } // vừa làm xong bước trong chính lần kéo này: chỉ về khay / móc, không tính sai
    this.toolDrop(t, px, py);
  }

  // Dụng cụ bay về ô khay (return_to_bag); wrong: kèm shake_no.
  // G8-12: lược chải lông nằm trong khay dạng mở (l8_tool_brush); đang chọn / kéo thì dạng úp (l8_tool_brush_down), cùng khung và tâm.
  brushFace(t, down) {
    if (t.key !== 'l8_tool_brush' || !this.realKey('l8_tool_brush_down')) return;
    const k = down ? 'l8_tool_brush_down' : 'l8_tool_brush';
    if (t.s.texture.key !== k) t.s.setTexture(k);
  }

  realKey(key) { const e = this.A.entries[key]; return !!(e && e.real && this.textures.exists(key)); }

  returnTool(t, wrong, ms = 300) {
    const s = t.s;
    this.brushFace(t, false);
    t.back = true;
    this.tweens.killTweensOf(s);
    this.tweens.add({ targets: s, x: t.home[0], y: t.home[1], scale: s.base, angle: 0, duration: ms, ease: 'Quad.out', onComplete: () => {
      t.back = t.using = false;
      s.setDepth(t.depth0).setAlpha(t.faded && !t.hang ? 0.5 : 1); // G8-9: món treo dùng xong vẫn giữ màu
      if (wrong) this.shakeNo(s);
      else if (t.hang && ms) this.tweens.add({ targets: s, angle: { from: 9, to: 0 }, duration: 700, ease: 'Elastic.out' }); // đung đưa trên móc
    } });
  }

  // Chạm trúng dụng cụ: món khay theo ô (bán kính 85 quanh ô hoặc quanh món); món treo theo khung ảnh nới 20 px
  // (vòi sen chỉ nhận nửa dưới, chỗ tay cầm, cho khỏi lẫn với đế giữ vòi).
  toolHit(o, x, y) {
    if (!o.hang) return Math.min(Math.hypot(x - o.home[0], y - o.home[1]), Math.hypot(x - o.s.x, y - o.s.y)) < 85;
    const b = o.s.getBounds();
    const top = o.key === 'l8_tool_shower' ? b.y + b.height * 0.35 : b.y;
    return x > b.x - 20 && x < b.right + 20 && y > top - 20 && y < b.bottom + 20;
  }

  // Điểm (fx, fy) tính theo px file ảnh của sprite s → toạ độ thế giới (theo vị trí, cỡ, góc hiện tại của s).
  // Ảnh khối tạm (chưa có ảnh thật): dùng lệch dự phòng fb (px hiển thị so với neo).
  spritePt(s, [fx, fy], fb = [0, 0]) {
    const e = this.A.entries[s.key];
    let dx, dy;
    if (e && e.real) { dx = (fx - s.displayOriginX) * s.scaleX; dy = (fy - s.displayOriginY) * s.scaleY; }
    else { dx = fb[0] * s.scaleX / (s.base || 1); dy = fb[1] * s.scaleY / (s.baseY || s.base || 1); }
    const c = Math.cos(s.rotation), sn = Math.sin(s.rotation);
    return [s.x + dx * c - dy * sn, s.y + dx * sn + dy * c];
  }

  inMun(x, y) { const [rx, ry, rw, rh] = MUN_RECT; return x > rx && x < rx + rw && y > ry && y < ry + rh; }
  inEll([cx, cy, rx, ry], x, y, m = 20) { return ((x - cx) / (rx + m)) ** 2 + ((y - cy) / (ry + m)) ** 2 <= 1; }

  // Chỗ cần làm của bước hiện tại: [{ id, e: elip, p: tiến độ 0..1 }].
  spots() {
    const n = this.step, S = STEPS[n];
    if (!S || this.finale || this.towelOn) return [];
    if (S.area === 'leaf') return Object.keys(LEAF).filter((k) => !this.leaves[k]).map((k) => ({ id: k, e: [this.leafS[k].x, this.leafS[k].y, 50, 40], p: 0 }));
    if (S.area === 'comb') return Object.keys(COMB).map((k) => ({ id: k, e: AREA[k], p: this.prog[k] || 0 })).filter((o) => o.p < 1);
    if (S.area === 'mud') return Object.keys(MUD).map((k) => ({ id: k, e: AREA.mud(k), p: this.prog[k] || 0 })).filter((o) => o.p < 1);
    if (S.area === 'oil') return [{ id: 'oil', e: AREA.oil, p: this.oilCount() / OIL_N }];
    return [{ id: S.area, e: AREA[S.area], p: this.prog[n] || 0 }];
  }

  toolDrop(t, x, y) {
    const n = this.step, S = STEPS[n];
    const right = S && S.tool === t.key && !t.faded;
    if (right && S.kind === 'drop') {
      if (this.inEll(AREA[S.area], x, y, 30)) { this.dropUse(t, n); return; }
      if (this.inMun(x, y)) { this.flash(); this.returnTool(t, false); return; } // trên Mun nhưng chưa đúng chỗ
      this.returnTool(t, false); return;
    }
    if (right) { this.returnTool(t, false); return; }           // dụng cụ vuốt đúng bước: thả tay giữ tiến độ
    if (!this.inMun(x, y)) { this.returnTool(t, false); return; } // thả ngoài Mun: về khay, không phạt
    this.wrongTool(t);
  }

  // Dụng cụ sai bước / đã dùng xong thả lên Mun: lắc đầu (2 phản ứng riêng), liếc về dụng cụ đúng, chỗ cần làm nhấp nháy mạnh.
  wrongTool(t) {
    const n = this.step;
    this.sfx('sfx_wrong');
    this.returnTool(t, true);
    this.flash();
    this.emote('no');
    this.streak = 0; // G8-6: chuỗi làm đúng liên tục trong chặng bị ngắt
    this.wrongs = (this.wrongs || 0) + 1;
    const glance = () => {
      const right = this.allTools().find((o) => o.key === STEPS[n].tool && !o.faded);
      const tx = right ? right.home[0] : (this.spots()[0] || { e: [512] }).e[0];
      this.tweens.add({ targets: this.mun, angle: Phaser.Math.Clamp((tx - MUN_AT[0]) / 40, -6, 6), duration: 200, yoyo: true, hold: 500 });
      if (right) this.time.delayedCall(250, () => this.hop(right.s, 10, 260));
    };
    if (this.busy.mun) return;
    if (t.key === 'l8_tool_shower' && n >= 4 && n <= 6) { // vòi sen khi chưa chà bọt xong: lắc nhẹ hai bên, bắn nước
      this.lastWrong = 'shake';
      this.sfx('mun_sfx_shake');
      this.lightShake(glance, n >= 5 ? 0xffffff : W_CLEAR);
      return;
    }
    if (t.key === 'l8_tool_dryer' && n === 8) { // máy sấy khi chưa lau khô: nước trên lông bắn tung toé, Mun nheo mắt
      this.lastWrong = 'dryer';
      this.sfx('l8_sfx_dryer', 0.6);
      this.splash(MUN_AT[0], 860, 0x9fd0e8, 16, true);
      this.shakeHead(glance);
      return;
    }
    this.lastWrong = 'headshake';
    this.shakeHead(glance);
  }

  // Lắc nhẹ sang hai bên trên ảnh dáng hiện tại (G8-9: 2 nhịp, không đổi ảnh). color: nước văng ra từ thân theo nhịp lắc.
  lightShake(done, color) {
    this.busy.mun = true;
    this.smoothShake(5, 2, 620, color);
    this.time.delayedCall(640, () => { this.busy.mun = false; done && done(); });
  }

  // Lắc đầu (G8-1): không có dáng riêng, lắc dáng Mun hiện tại.
  shakeHead(done, color) {
    this.busy.mun = true;
    this.smoothShake(7, 3, 760, color);
    this.time.delayedCall(780, () => { this.busy.mun = false; done && done(); });
  }

  // G8-11: lắc mượt thay `wiggle` (giật): góc = biên độ × sin(nhịp) × sin(πt), nên vào êm, mạnh ở giữa, ra êm (góc và tốc độ
  // ở hai đầu đều bằng 0). Đuôi, mí mắt đi theo góc Mun như cũ. color: mỗi lần đổi chiều, nước văng ra từ thân về phía đang vung.
  smoothShake(deg, n, dur, color, many = 1) {
    const m = this.mun, o = { t: 0 };
    let half = 0;
    this.tweens.add({ targets: o, t: 1, duration: dur, ease: 'Linear', onUpdate: () => {
      const env = Math.sin(Math.PI * o.t), ph = o.t * n * Math.PI * 2;
      m.setAngle(deg * env * Math.sin(ph));
      const k = Math.floor((ph + Math.PI / 2) / Math.PI); // qua đỉnh mỗi nửa nhịp (đổi chiều)
      if (color != null && k !== half) { half = k; this.bodyDrops(color, Math.round((4 + 8 * env) * many), Math.cos(ph) < 0 ? 1 : -1); }
    }, onComplete: () => m.setAngle(0) });
  }

  // Hạt nước văng ra từ mép thân Mun (vai, lưng, hông, đỉnh đầu; không lấy phần ngồi trên ghế): bay ra ngoài theo pháp tuyến,
  // thêm đà sang phía dir (đang vung), rồi rơi theo trọng lực. Hạt dẹt theo hướng bay.
  bodyDrops(color, n, dir) {
    const [cx, cy, rx, ry] = MUN_SIL;
    for (let i = 0; i < n; i++) {
      const th = Phaser.Math.FloatBetween(-Math.PI - 0.35, 0.35), px = cx + Math.cos(th) * rx, py = cy + Math.sin(th) * ry;
      const sp = Phaser.Math.FloatBetween(0.35, 0.7), vx = Math.cos(th) * sp + dir * 0.35, vy = Math.sin(th) * sp * 0.8 - 0.25;
      const r = Phaser.Math.Between(4, 8), d = this.add.ellipse(px, py, r * 2.4, r * 1.5, color, 0.95).setDepth(D.fx);
      if (color !== 0xffffff) d.setStrokeStyle(1.5, 0xffffff, 0.7);
      const o = { t: 0 }, life = Phaser.Math.Between(520, 760);
      this.tweens.add({ targets: o, t: life, duration: life, ease: 'Linear', onUpdate: () => {
        const tt = o.t, x = px + vx * tt, y = py + vy * tt + 0.0011 * tt * tt;
        d.setPosition(x, y).setRotation(Math.atan2(vy + 0.0022 * tt, vx)).setAlpha(0.95 * (1 - (tt / life) ** 2));
      }, onComplete: () => d.destroy() });
    }
  }

  // Mun quấn khăn: dụi mặt, lim dim; vòng chung đầy dần trong 2,5 giây, đầy thì xong bước 8 (khăn tự tuột ra).
  towelStep(time, dt) {
    if (!this.towelOn || this.phase !== 'search') return;
    this.prog[8] = Math.min(1, (this.prog[8] || 0) + dt / STEPS[8].need);
    if (time - this.nuzzleAt > 900 && !this.busy.mun) {
      this.nuzzleAt = time;
      this.tweens.add({ targets: this.mun, angle: 5, duration: 220, yoyo: true });
    }
    if (this.prog[8] >= 1) { this.towelOn = false; this.stepDone(8); }
  }

  // Dụng cụ thả (khăn bông).
  dropUse(t, n) {
    const s = t.s;
    this.tdrag = null;
    t.back = t.using = true; // đang diễn dùng dụng cụ: chưa nhấc lại được
    // Bước 8: khăn rơi vào Mun, quấn kín (drop_in), Mun dụi mặt.
    s.setDepth(30);
    const q = 170 / s.width;                                    // khăn thật rộng 230: giữ cỡ bung như khăn khối rộng 170 đã duyệt
    this.tweens.chain({ targets: s, tweens: [
      { x: MUN_AT[0], y: 600, scaleX: q * 2.6, scaleY: q * 1.2, angle: 0, duration: 220, ease: 'Sine.out' },                     // bung phồng như dù
      { y: 840, scaleX: q * 2, scaleY: q * 1.6, angle: { from: 8, to: -6 }, duration: 320, ease: 'Quad.in' },                      // lả lướt hạ xuống
      { angle: 0, alpha: 0, scaleX: q * 1.7, duration: 150 },                                                                   // quấn lại
    ], onComplete: () => {
      this.sfx('l7_sfx_cloth');
      this.smoothShake(3, 2, 420); // khăn xoay nhẹ quanh Mun
      s.setVisible(false).setAlpha(1).setAngle(0).setScale(s.base).setPosition(...t.home).setDepth(t.depth0); // khăn đang quấn trên Mun
      this.setMun('mun_bath_towel');
      this.towelOn = true; // G8-5: quấn 2,5 giây (towelStep), vòng chung đầy dần, rồi khăn tự tuột về thanh treo
    } });
  }

  leafRelease() {
    const L = this.ldrag;
    this.ldrag = null;
    const s = L.s;
    if (L.free && L.heavy) s.setPosition(L.tx, L.ty); // cành đang theo tay chậm: thả ở đúng chỗ ngón tay
    if (L.free && !this.inMun(s.x, s.y)) {
      this.sfx('l8_sfx_ting', 0.7); // gỡ ra: vòng chung đầy thêm 1/6
      this.leaves[L.k] = true;
      this.emote('happy');
      this.partOk(L.ox, L.oy);
      if (L.heavy) { // cành rơi "cạch" xuống sàn, nảy 2 lần, lăn một chút rồi nằm lại
        this.twigFall(s);
        this.vibrate(20);
        if (Object.keys(LEAF).every((k) => this.leaves[k])) this.stepDone(1);
        return;
      }
      this.leafFall(s); // bay xoay theo đường cong, rơi lắc lư như lá thật, kèm vụn bụi
      this.vibrate(15);
      if (Object.keys(LEAF).every((k) => this.leaves[k])) this.stepDone(1);
      return;
    }
    // Chưa kéo ra khỏi Mun: lá dính lại chỗ cũ.
    this.tweens.add({ targets: s, x: L.ox, y: L.oy, angle: 0, duration: 200, ease: 'Back.out', onComplete: () => this.attachTo(s, this.mun) });
  }

  // ---------- vuốt: tiến độ theo thời gian dụng cụ nằm trên chỗ cần làm và đang di chuyển ----------
  swipeStep(time, dt) {
    const D0 = this.tdrag;
    if (!D0 || !D0.moved) return;
    const n = this.step, S = STEPS[n], t = D0.t, s = t.s;
    // Vòi sen lúc nào kéo ra cũng xịt nước (xịt xuống sàn thành vũng), kể cả khi chưa tới bước dùng nó.
    if (t.key === 'l8_tool_shower' && time - D0.lastMove < MOVE_MS) {
      this.spray(time, ...this.spritePt(s, SHOWER_NOZZLE, SHOWER_NOZZLE_FB), W_CLEAR); // tia ra từ đầu vòi (mặt sen)
      this.loopSfx(time, 'l8_sfx_shower');
      this.every(time, 'steam', 380, () => this.steam());                       // hơi nước ấm mờ bốc lên nhè nhẹ
      const [hx, hy] = this.toolPt(D0);                                          // chỗ nước xả ra (G8-12)
      if (this.inMun(hx, hy)) this.showerOnMun(time, hx, hy);
      // G8-3, G8-9: tia nước chạm Mun ngoài bước 3 và 7 thì Mun lắc nhẹ hai bên, bắn nước, mặt không vui (tối đa 1,5 giây một lần).
      if (n !== 3 && n !== 7 && !D0.doneStep && this.inMun(hx, hy) && !this.busy.mun && time - (this.sprayShakeAt || 0) > 1500) {
        this.sprayShakeAt = time;
        this.emote('no');
        this.streak = 0;
        this.sfx('mun_sfx_shake');
        this.lightShake(null, n >= 5 && n <= 7 ? 0xffffff : W_CLEAR);
      }
    }
    if (!S || S.kind !== 'swipe' || S.tool !== t.key || t.faded || this.busy.step) return;
    if (time - D0.lastMove > MOVE_MS) return;
    const [x, y] = this.toolPt(D0);
    // Dụng cụ có chuyển động riêng khi đang dùng.
    if (time - D0.wiggleAt > 90) { D0.wiggleAt = time; s.setAngle(Phaser.Math.Between(-6, 6)); }
    if (S.area === 'oil') { // di chai dọc lưng: chai đi qua chỗ đặt nào còn trống thì giọt rơi đúng vào chỗ đó
      if (!this.inEll(AREA.oil, x, y, 60) || this.oilCount() >= OIL_N) return;
      this.every(time, 'scent', 520, () => this.scent());                       // gợn hương bay lên khỏi lưng
      this.loopSfx(time, null);
      let i = -1, best = Infinity;
      OIL_SLOTS.forEach(([sx, sy], k) => {
        const dx = Math.abs(sx - x), dy = Math.abs(sy - (y + 40)), d = dx * dx + dy * dy;
        if (!this.oilSlot[k] && dx < OIL_HIT[0] && dy < OIL_HIT[1] && d < best) { best = d; i = k; }
      });
      if (i >= 0) this.oilDrop(i, x, y);
      return;
    }
    if (S.area === 'comb') { // 2 chùm ké (đuôi, đầu): làm chỗ nào trước cũng được
      const k = Object.keys(COMB).find((k) => (this.prog[k] || 0) < 1 && this.inEll(AREA[k], x, y));
      if (!k) return;
      const p0 = this.prog[k] || 0, p = this.prog[k] = Math.min(1, p0 + dt / S.need), spr = this.combS[k];
      spr.setAlpha(1 - p * 0.9);
      if (Math.floor(p0 * 5) < Math.floor(p * 5)) { this.sfx('l8_sfx_burr_pop'); this.popBurr(COMB[k], COMB_SCALE[k]); this.vibrate(10); } // bật ra từng quả
      if (p >= 1) {
        spr.setVisible(false);
        this.sfx('l8_sfx_ting', 0.7); this.partOk(spr.x, spr.y);
        if (k === 'burr') this.tailFlick = time; // đuôi vẫy một cái nhẹ nhõm
        this.emote('happy');
        if (Object.keys(COMB).every((m) => this.prog[m] >= 1)) this.stepDone(2);
      }
      return;
    }
    if (S.area === 'mud') {
      const k = Object.keys(MUD).find((k) => (this.prog[k] || 0) < 1 && this.inEll(AREA.mud(k), x, y));
      if (!k) return;
      const p = this.prog[k] = Math.min(1, (this.prog[k] || 0) + dt / S.need);
      this.mud[k].setAlpha(1 - p);
      this.water.c = lerpC(W_CLEAR, W_MUD, this.muddy()); // nước chậu đục dần
      this.dribble(this.mud[k].x, this.mud[k].y, 0x8a6a45);
      this.loopSfx(time, 'l8_sfx_shower');
      if (p >= 1) {
        this.mud[k].setVisible(false);
        this.sfx('l8_sfx_ting', 0.7); this.partOk(this.mud[k].x, this.mud[k].y);
        this.emote('happy');
        if (Object.keys(MUD).every((m) => this.prog[m] >= 1)) this.stepDone(3);
      }
      return;
    }
    const inArea = this.inEll(AREA[S.area], x, y);
    if (n === 9) { this.wind(time, x, y); this.dryFx(time, x, y); }
    if (!inArea) return;
    const p0 = this.prog[n] || 0, p = this.prog[n] = Math.min(1, p0 + dt / S.need);
    this.swipeFx(n, p0, p, time, x, y);
    if (p >= 1) this.stepDone(n);
  }

  muddy() { const ks = Object.keys(MUD); return ks.reduce((a, k) => a + (this.prog[k] || 0), 0) / ks.length; }

  // Kết quả thấy ngay dưới dụng cụ, theo từng bước.
  swipeFx(n, p0, p, time, x, y) {
    if (n === 5) { // bọt nở từ chỗ các vết dầu rồi lan ra theo bông tắm; vết dầu bông tắm đi qua thì mờ đi
      this.oilWipe(x, y);
      const fast = Math.min(3, Math.floor((this.tdrag ? this.tdrag.speed : 0) * 2.5)); // chà nhanh thì bọt nở nhiều hơn
      this.foamGrow(x, y, 1 + fast);
      this.water.c = lerpC(W_MUD, W_FOAM, p);
      if (time - this.bubbleAtT > 450 - fast * 90) { this.bubbleAtT = time; for (let i = 0; i < 3; i++) this.flyBubble(x + (i - 1) * 24, y - 30, i === 1 ? 16 : 10); } // vài bọt nhỏ bay lên phòng
      this.loopSfx(time, 'l8_sfx_foam');
    } else if (n === 6) { // khăn mặt: mặt Mun nhăn theo khăn
      if (!this.busy.mun) this.mun.setScale(this.mun.base * this.munSX, this.mun.baseY * this.munSX * (0.98 + 0.02 * Math.sin(time / 60)));
      this.loopSfx(time, null);
    } else if (n === 7) { // bọt tan theo vòi sen, nước chậu trong lại
      this.foamWash(time, x, y);
      this.water.c = lerpC(W_FOAM, W_CLEAR, p);
      this.loopSfx(time, 'l8_sfx_shower');
    } else if (n === 9) { // lông phồng dần trong gió
      this.munSX = 1 + 0.14 * p;
      if (!this.busy.mun) this.applyMun(this.munKey);
      this.loopSfx(time, 'l8_sfx_dryer');
    } else if (n === 10) { // lược đi tới đâu lông mượt tới đó, để lại vệt bóng
      this.munSX = 1 - 0.08 * p;
      if (!this.busy.mun) this.applyMun(this.munKey);
      this.every(time, 'brush', 40, () => this.brushTrail(x, y));               // vệt sáng chạy theo lược
      if (time - this.bubbleAtT > 260) { this.bubbleAtT = time; this.sparkleAt(x + Phaser.Math.Between(-40, 40), y + Phaser.Math.Between(0, 40), 24); }
      this.loopSfx(time, null);
    }
  }

  // Số vết dầu đã nhỏ (kể cả vết đang rơi).
  oilCount() { return this.oilSlot.filter(Boolean).length; }

  // Chai bóp ra một giọt: rơi từ miệng chai xuống chỗ đặt i ngay dưới chai, đáp thành vết dầu tròn bẹt lấp lánh.
  oilDrop(i, x, y) {
    const [tx, ty, ang] = OIL_SLOTS[i];
    this.oilSlot[i] = true;
    this.sfx('l8_sfx_squirt', 0.6);
    const d = this.add.circle(x - 30, y - 40, 7, 0xf7e296, 0.95).setStrokeStyle(2, 0xc99a4a).setDepth(D.fx);
    this.tweens.add({ targets: d, x: tx, y: ty, duration: 200, ease: 'Quad.in', onComplete: () => {
      d.destroy();
      const o = this.img('l8_oil_drop', tx, ty, 23).setAngle(ang);
      this.fitWidth(o, OIL_W);
      const b = o.base;
      o.setScale(b * 0.3);
      this.tweens.add({ targets: o, scale: b, duration: 160, ease: 'Back.out', onComplete: () => this.attachTo(o, this.mun) });
      this.oilS.push(o);
      this.sparkleAt(tx, ty, 26);                                                // vết dầu lấp lánh
      this.sfx('l8_sfx_ting', 0.5);                                              // vòng chung đầy thêm 1/5
      if (this.oilS.length >= OIL_N && this.step === 4) this.stepDone(4);
    } });
  }

  // Bước 5: vết dầu nào bông tắm đi qua thì mờ đi, bọt nở bung ra từ chỗ vết đó (nhiều hơn chỗ khác) rồi lan ra theo bông tắm.
  oilWipe(x, y) {
    for (const o of this.oilS) {
      if (o.wiped || Math.hypot(o.x - x, o.y - y) > FOAM_REACH) continue;
      o.wiped = true;
      this.tweens.add({ targets: o, alpha: 0, duration: 400 });
      this.foamGrow(o.x, o.y, 4);
    }
  }

  // Quấn khăn xong (bước 8): khăn tự tuột ra, bay vòng về thanh treo.
  towelFly() {
    this.setMun('mun_bath_wet');
    // Khăn tuột khỏi Mun, bay vòng về vắt lại lên thanh treo (mờ: đã dùng xong).
    const ht = this.hangTools.find((o) => o.key === 'l8_tool_towel'), f = this.img('l8_tool_towel', MUN_AT[0], 860, 30);
    const q = 170 / f.width;                                    // như khăn khối rộng 170 (bản đã duyệt)
    f.setScale(q * 1.6);
    this.sfx('l7_sfx_cloth');
    this.tweens.chain({ targets: f, tweens: [
      { y: 520, x: MUN_AT[0] - 40, angle: -40, scale: q * 1.9, duration: 280, ease: 'Quad.out' },                             // bị hất tung lên
      { x: ht.home[0], y: ht.home[1], scale: f.base, angle: -360, duration: 520, ease: 'Sine.inOut' },                        // bay vòng về thanh
    ], onComplete: () => {
      f.destroy();
      ht.using = ht.back = false;
      ht.s.setVisible(true).setAlpha(1);
      this.tweens.add({ targets: ht.s, angle: { from: 9, to: 0 }, duration: 700, ease: 'Elastic.out' });
    } });
  }

  // ---------- xong bước ----------
  stepDone(n) {
    if (this.done >= n) return;
    this.done = n;
    this.step = n + 1;
    this.prog[n] = 1;
    // Dụng cụ đang cầm vừa làm xong bước này: lúc thả không bị tính là dụng cụ sai / đã dùng xong (chỉ tính sai ở lần nhấc mới).
    if (this.tdrag && this.tdrag.t.key === STEPS[n].tool) this.tdrag.doneStep = true;
    this.flashUntil = 0;
    this.doneBlink(n); // G8-11: vùng vừa làm xong nhấp nháy sáng 3 nhịp
    this.ringPop(); // vòng chung đầy: ting, nảy 3 nhịp rồi tắt; bước sau bắt đầu vòng mới từ 0
    this.emote('happy');
    this.streak++;
    this.sfx('l8_sfx_ting_big');
    this.vibrate(30);
    this.touch();
    // Dụng cụ dùng xong bước cuối trong chặng: mờ 50% trong khay.
    const st = stageOf(n);
    // Món trong khay dùng xong mờ 50%; món treo (vòi sen, khăn) vẫn giữ màu (G8-9), chỉ không còn tác dụng.
    for (const t of this.allTools()) if (t.last === n) { t.faded = true; if (!t.back && !t.hang) t.s.setAlpha(0.5); }
    const T = (ms, fn) => this.time.delayedCall(ms, fn);
    if (n === 1) {
      this.sparkle(this.mun);
    } else if (n === 4) {
      this.smoothShake(4, 3, 420); // rùng mình (lạnh), quay ngửi vệt dầu
    } else if (n === 2) {
      Object.values(this.combS).forEach((o) => o.setVisible(false));
    } else if (n === 3) {
      this.setMun('mun_bath_wet'); // lông bết sát người: gầy hẳn
      this.sparkle(this.mun);
      this.stageShake(W_CLEAR, () => this.nextStage(2)); // xong chặng: lắc mình bắn nước, chớp mắt, rồi khay mới trượt lên
    } else if (n === 5) {
      this.oilS.forEach((o) => { this.detach(o); this.tweens.add({ targets: o, alpha: 0, duration: 300, onComplete: () => o.destroy() }); });
      this.oilS = [];
      this.setMun('mun_bath_foam');
      this.foamGrow(0, 0, 0, true); // phủ kín nốt chỗ bông tắm chưa đi qua
    } else if (n === 6) {
      this.busy.step = true;
      this.sfx('mun_sfx_sneeze');
      this.pose('mun_bath_sneeze', 600, () => { this.busy.step = false; });
      T(250, () => { this.flyBubble(MUN_AT[0], 760, 34, true); this.sneezeBurst(); }); // bọt quanh mặt bắn tung ra một chùm
    } else if (n === 7) {
      this.foamClear();
      this.water.c = W_CLEAR;
      this.setMun('mun_bath_wet');
      this.stageShake(W_CLEAR, () => this.nextStage(3));
    } else if (n === 8) {
      this.sfx('mun_sfx_purr', 0.5);
      this.towelFly(); // khăn tự tuột ra, bay về vắt lại trên thanh
    } else if (n === 9) {
      this.munSX = 1;
      this.setMun('mun_bath_fluffy');
      this.hop(this.mun, 14, 300);
    } else if (n === 10) {
      this.munSX = 1;
      this.setMun('mun_bath_sleek');
      this.sfx('mun_sfx_purr');
      this.sparkle(this.mun);
      this.stageShake(null); // xong chặng 3: lắc mình, lông phồng rồi xẹp mượt (scale nhẹ), chớp mắt; trong nhịp đầu khoảnh khắc kết
      this.finaleRun();
    }
  }

  // Khoảnh khắc kết: ngồi thẳng nhìn người chơi 1 giây → liếm 2 giây → lè lưỡi 0,8 giây (ngắt nhịp) → liếm 1 giây → Lộ diện.
  finaleRun() {
    this.finale = true;
    this.locked = true;
    this.phase = 'finale';
    this.hl.clear();
    this.handHide('paw');
    this.time.delayedCall(300, () => this.trayOut(() => this.bar.setVisible(false)));
    const T = (ms, fn) => this.time.delayedCall(ms, fn);
    T(1000, () => { this.munKey = 'mun_bath_lick'; this.applyMun('mun_bath_lick'); });
    T(1000, () => this.tweens.add({ targets: this.mun, angle: 3, duration: 250, yoyo: true, repeat: 3 }));
    T(3000, () => { this.applyMun('mun_bath_tongue'); this.sfx('mun_sfx_tongue'); this.hop(this.mun, 6, 160); });
    T(3450, () => { this.blinkUntil = this.time.now + 130; }); // G8-11: bị bắt quả tang, chớp mắt một cái
    T(3800, () => this.applyMun('mun_bath_lick'));
    T(4800, () => {
      this.munKey = 'mun_bath_sleek';
      this.applyMun('mun_bath_sleek');
      this.mun.setAngle(0);
      this.phase = 'found';
      this.locked = false;
      this.foundAt = this.clockMs;
      console.info(`[L8] Lộ diện sau ${(this.clockMs / 1000).toFixed(1)} giây chơi (khung 150 giây), chạm sai: ${this.wrongs || 0}`);
      this.glowOn(this.mun);
      this.bubbleFound();
      this.zones.mun.setInteractive();
    });
  }

  startEnding() {
    super.startEnding();
    // Cảnh bế: vài bong bóng nhỏ bay quanh Mun lông mượt.
    const { ct } = this.endCt;
    for (let i = 0; i < 6; i++) this.time.delayedCall(300 + i * 250, () => {
      if (this.phase !== 'ending') return;
      const b = this.add.circle(ct.x + Phaser.Math.Between(-160, 160), ct.y + Phaser.Math.Between(-60, 200), Phaser.Math.Between(10, 18), 0xffffff, 0.7)
        .setStrokeStyle(3, 0xb8c6d0).setDepth(D.end + 8);
      this.tweens.add({ targets: b, y: b.y - 220, alpha: 0, duration: 1200, ease: 'Sine.out', onComplete: () => b.destroy() });
    });
  }

  endingHide() {
    this.mun.setVisible(false);
    this.aliveG.clear(); this.tail.setVisible(false); this.blink.setVisible(false);
    this.over.forEach((s) => s.setVisible(false));
  }

  // ---------- chạm ----------
  handleLevel(name) {
    if (name === 'duck') { this.duckTap(); return; }
    if (name !== 'mun') return;
    if (this.phase === 'found') { this.sfx(this.catTapSfx); this.startEnding(); return; }
    if (this.busy.mun || this.phase !== 'search') return;
    if (this.done < 8) { // Mun còn ướt: lắc mượt hai bên (không đổi ảnh), nước (bọt) văng ra từ chính thân Mun (G8-11)
      this.sfx('mun_sfx_shake');
      this.lightShake(null, this.done >= 5 ? 0xffffff : W_CLEAR);
      this.funTaps = (this.funTaps || 0) + 1;
      return;
    }
    // Mun khô: dụi đầu về phía tay, rừ rừ.
    this.sfx('mun_sfx_purr');
    this.hop(this.mun, 10, 260);
    this.tweens.add({ targets: this.mun, angle: 8, duration: 200, yoyo: true, hold: 300 });
    this.funTaps = (this.funTaps || 0) + 1;
  }

  duckTap() {
    this.hop(this.duck, 30, 360);
    this.sfx('l8_sfx_squeak');
    if (this.secretDuck) return;
    this.secretDuck = true;
    this.secrets = (this.secrets || 0) + 1;
    this.fishBurst(this.duck.x, this.duck.y - 60, 5);
  }

  // ---------- hiệu ứng ----------
  // Gọi fn nhiều nhất mỗi ms một lần (theo khoá key).
  every(time, key, ms, fn) { if (time - (this.fxAt[key] || 0) >= ms) { this.fxAt[key] = time; fn(); } }

  // Xong một phần (một lá, một mảng bùn, một chỗ chải): lấp lánh; làm đúng liên tục trong chặng thì to và nhiều hơn (G8-6).
  partOk(x, y) {
    this.streak++;
    const k = Math.min(this.streak, 5);
    for (let i = 0; i < 1 + Math.floor(k / 2); i++) this.sparkleAt(x + Phaser.Math.Between(-30, 30) * (i > 0), y + Phaser.Math.Between(-24, 24) * (i > 0), 36 + k * 6);
  }

  // Lá rơi: bay theo đường cong, lắc lư qua lại như lá thật, xoay nhẹ, rơi khỏi màn hình; 2–3 vụn bụi rơi theo.
  leafFall(s) {
    const x0 = s.x, y0 = s.y, dir = x0 < 512 ? -1 : 1, bottom = this.worldBottom + 80, a0 = s.angle;
    this.tweens.addCounter({ from: 0, to: 1, duration: 1500, ease: 'Linear', onUpdate: (tw) => {
      const t = tw.getValue();
      s.setPosition(x0 + dir * 220 * t + Math.sin(t * 9) * 42, y0 - 60 * Math.sin(Math.PI * Math.min(1, t * 2.5)) + (bottom - y0) * t ** 1.5);
      s.setAngle(a0 + Math.sin(t * 8) * 35 + dir * 80 * t);
    }, onComplete: () => s.setVisible(false) });
    for (let i = 0; i < 3; i++) {
      const d = this.add.circle(x0 + Phaser.Math.Between(-20, 20), y0 + Phaser.Math.Between(-10, 10), Phaser.Math.Between(3, 5), 0xd9c3a0, 0.9).setDepth(D.fx);
      this.tweens.add({ targets: d, x: d.x + dir * Phaser.Math.Between(20, 60), y: FLOOR_Y, alpha: 0.2, duration: Phaser.Math.Between(600, 900), ease: 'Quad.in', onComplete: () => d.destroy() });
    }
  }

  // Cành rơi "cạch" xuống sàn, nảy 2 lần, lăn một chút rồi nằm lại.
  twigFall(s) {
    const dir = s.x < 512 ? -1 : 1, fy = FLOOR_Y + 10;
    this.tweens.chain({ targets: s, tweens: [
      { y: fy, x: s.x + dir * 30, angle: s.angle + dir * 70, duration: 320, ease: 'Quad.in', onComplete: () => { this.sfx('l8_sfx_twig'); this.ripple(s.x, FLOOR_Y); } },
      { y: fy - 26, duration: 120, ease: 'Quad.out' }, { y: fy, duration: 120, ease: 'Quad.in', onComplete: () => this.sfx('l8_sfx_twig', 0.5) },
      { y: fy - 10, duration: 80, ease: 'Quad.out' }, { y: fy, duration: 80, ease: 'Quad.in' },
      { x: `+=${dir * 34}`, angle: `+=${dir * 60}`, duration: 320, ease: 'Quad.out' },
    ], onComplete: () => s.setDepth(4) });
  }

  // Tai giật: hai vạch chuyển động nhỏ cạnh tai (side −1 trái, 1 phải, 0 cả hai). Tai thật là ảnh dáng Mun nên chỉ vẽ dấu động.
  earFx(side) {
    const ears = this.earPts();
    if (!ears) return;
    const g = this.add.graphics().setDepth(D.fx);
    for (const sd of side ? [side] : [-1, 1]) {
      const [tx, ty] = ears[sd < 0 ? 0 : 1];
      g.lineStyle(4, 0x6b4a3a, 0.9).lineBetween(tx + sd * 14, ty - 4, tx + sd * 26, ty - 12).lineBetween(tx + sd * 16, ty + 8, tx + sd * 30, ty + 4);
    }
    this.tweens.add({ targets: g, alpha: 0, duration: 220, delay: 80, onComplete: () => g.destroy() });
  }

  // Vòi sen xịt lên người Mun: giọt bắn tung quanh chỗ xịt, lông vừa xịt sẫm bóng lên, thỉnh thoảng giọt bắn lên màn hình.
  showerOnMun(time, x, y) {
    this.every(time, 'splashAround', 90, () => {
      for (let i = 0; i < 2; i++) {
        const a = Phaser.Math.FloatBetween(-Math.PI, 0), r = Phaser.Math.Between(40, 90);
        const d = this.add.circle(x, y, Phaser.Math.Between(3, 5), 0xcfe8f5, 0.95).setDepth(D.fx);
        this.tweens.add({ targets: d, x: x + Math.cos(a) * r, y: y + Math.sin(a) * r * 0.7 + 30, alpha: 0, duration: 320, ease: 'Quad.out', onComplete: () => d.destroy() });
      }
    });
    this.every(time, 'shine', 120, () => {
      const g = this.add.graphics().setDepth(23.8);
      g.fillStyle(0x120e0e, 0.22).fillCircle(x, y, 34).lineStyle(3, 0xffffff, 0.55).beginPath().arc(x - 8, y - 8, 20, Math.PI * 1.1, Math.PI * 1.6).strokePath();
      this.tweens.add({ targets: g, alpha: 0, duration: 900, onComplete: () => g.destroy() });
    });
    if (time - (this.fxAt.screenDrop || 0) > 2200 && Math.random() < 0.03) {
      this.fxAt.screenDrop = time;
      for (let i = 0; i < Phaser.Math.Between(1, 2); i++) {
        const d = this.add.circle(Phaser.Math.Between(120, this.scale.width - 120), Phaser.Math.Between(260, this.scale.height - 500), Phaser.Math.Between(18, 28), 0x9fd0e8, 0.4)
          .setStrokeStyle(3, 0xffffff, 0.8).setScrollFactor(0).setDepth(D.ui + 6);
        this.tweens.add({ targets: d, y: d.y + 70, scaleY: 1.3, alpha: 0, delay: 1000, duration: 500, ease: 'Quad.in', onComplete: () => d.destroy() }); // đọng 1 giây rồi chảy xuống
      }
    }
  }

  // Hơi nước ấm: đốm trắng rất mờ bốc lên quanh Mun, nở to rồi tan.
  steam() {
    const c = this.add.circle(Phaser.Math.Between(400, 640), Phaser.Math.Between(760, 980), Phaser.Math.Between(20, 32), 0xffffff, 0.14).setDepth(D.fx);
    this.tweens.add({ targets: c, y: c.y - 170, x: c.x + Phaser.Math.Between(-30, 30), scale: 2, alpha: 0, duration: 1600, ease: 'Sine.out', onComplete: () => c.destroy() });
  }

  // Gợn tròn trên vũng nước nơi giọt rơi; vịt (đang nổi) nhún theo gợn gần nó.
  ripple(x, y) {
    if (this.puddleR < 4 || Math.abs(x - PUDDLE[0]) > 80 + this.puddleR || this.time.now - (this.fxAt.ripple || 0) < 60) return;
    this.fxAt.ripple = this.time.now;
    const g = this.add.graphics().setDepth(3.5), o = { r: 6 };
    this.tweens.add({ targets: o, r: 42, duration: 520, ease: 'Quad.out', onUpdate: () => {
      g.clear().lineStyle(2, 0xffffff, 0.7 * (1 - o.r / 42)).strokeEllipse(x, y + 4, o.r * 2, o.r * 0.5);
    }, onComplete: () => g.destroy() });
    const wet = this.duckWet();
    if (wet && Math.abs(x - this.duck.x) < 140 && !this.tweens.isTweening(this.duck)) this.tweens.add({ targets: this.duck, y: DUCK[1] - 7, duration: 140, yoyo: true, ease: 'Sine.inOut' });
  }

  // Gợn hương dầu tắm bay lên khỏi lưng: xen kẽ bông hoa nhỏ pastel và đường cong mờ.
  scent() {
    const g = this.add.graphics().setDepth(D.fx), x = OIL[0] + Phaser.Math.Between(-70, 70), y = OIL[1] - 30;
    this.scentN = (this.scentN || 0) + 1;
    if (this.scentN % 2) {
      g.fillStyle(0xf8c6cc, 0.9); for (let i = 0; i < 5; i++) g.fillCircle(Math.cos(i * 1.256) * 8, Math.sin(i * 1.256) * 8, 6);
      g.fillStyle(0xfce39a, 1).fillCircle(0, 0, 5);
    } else {
      g.lineStyle(4, 0xf3d58a, 0.6).beginPath();
      for (let i = 0; i <= 12; i++) g.lineTo(Math.sin(i * 0.9) * 10, -i * 5);
      g.strokePath();
    }
    g.setPosition(x, y);
    this.tweens.add({ targets: g, y: y - 190, x: x + Phaser.Math.Between(-40, 40), angle: Phaser.Math.Between(-40, 40), alpha: 0, duration: 1500, ease: 'Sine.out', onComplete: () => g.destroy() });
  }

  // Hắt xì: bọt quanh mặt bắn tung ra một chùm.
  sneezeBurst() {
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI + (i / 9) * Math.PI, r = Phaser.Math.Between(120, 220);
      const b = this.img(i % 2 ? 'l8_foam_bubble_a' : 'l8_foam_bubble_b', MUN_AT[0], 770, D.fx);
      this.tweens.add({ targets: b, x: b.x + Math.cos(a) * r, y: b.y + Math.sin(a) * r * 0.8, alpha: 0, duration: 650, ease: 'Quad.out', onComplete: () => b.destroy() });
    }
    this.foamB = this.foamB.filter((b) => { // bọt sát mặt văng ra theo
      if (b.y > 840) return true;
      this.detach(b);
      this.tweens.add({ targets: b, x: b.x + (b.x - MUN_AT[0]) * 1.5, y: b.y - 60, alpha: 0, duration: 500, ease: 'Quad.out', onComplete: () => b.destroy() });
      return false;
    });
  }

  // Máy sấy: lông Mun và khăn trên thanh rung phần phật theo gió (thổi sang trái); sợi lông nhỏ, giọt nước cuối, bọt sót bay theo gió.
  dryFx(time, x, y) {
    this.drying = time;
    if (!this.busy.mun) this.mun.x = MUN_AT[0] + Math.sin(time / 24) * 2.5;
    const ht = this.hangTools.find((o) => o.key === 'l8_tool_towel');
    if (ht && !ht.back && !this.tweens.isTweening(ht.s)) ht.s.setAngle(-6 + Math.sin(time / 40) * 5);
    this.every(time, 'fur', 120, () => {
      const wet = (this.prog[9] || 0) < 0.5;
      const o = wet ? this.add.circle(x - 30, y + Phaser.Math.Between(-30, 30), 4, 0x9fd0e8, 0.9) : this.add.rectangle(x - 30, y + Phaser.Math.Between(-30, 30), 14, 3, 0x2a2626, 0.9);
      o.setDepth(D.fx);
      this.tweens.add({ targets: o, x: o.x - Phaser.Math.Between(160, 260), y: o.y + Phaser.Math.Between(-40, 30), angle: 200, alpha: 0, duration: 600, ease: 'Quad.out', onComplete: () => o.destroy() });
    });
    for (const b of this.airB) if (b.active && !b.blown) { // bọt sót lại trong phòng bị thổi bay
      b.blown = true;
      this.tweens.killTweensOf(b);
      this.tweens.add({ targets: b, x: b.x - 420, y: b.y - 60, alpha: 0, duration: 450, ease: 'Quad.in', onComplete: () => b.destroy() });
    }
    this.airB = this.airB.filter((b) => b.active && !b.blown);
  }

  // Hết sấy: lông và khăn về yên.
  dryStop(time) {
    if (!this.drying || time - this.drying < 150) return;
    this.drying = false;
    this.mun.x = MUN_AT[0];
    const ht = this.hangTools.find((o) => o.key === 'l8_tool_towel');
    if (ht && !ht.back) this.tweens.add({ targets: ht.s, angle: 0, duration: 500, ease: 'Elastic.out' });
  }

  // Vệt sáng chạy theo lược chải.
  brushTrail(x, y) {
    const r = this.add.rectangle(x, y + 24, 30, 7, 0xffffff, 0.75).setDepth(23.9).setAngle(Phaser.Math.Between(-12, 12));
    this.tweens.add({ targets: r, alpha: 0, scaleX: 1.6, duration: 420, onComplete: () => r.destroy() });
  }

  // Xong chặng 1, 2: Mun lắc mình cả người một cái thật đã, nước bắn tung toé ra xung quanh (0,7 giây).
  // G8-7: chỉ là animation trên ảnh dáng hiện tại (không đổi ảnh): lắc qua lại, nước bắn bằng hạt (color null: chặng 3,
  // lông khô phồng lên rồi xẹp mượt bằng scale nhẹ); lắc xong Mun chớp mắt một cái rồi mới gọi done (khay mới trượt lên).
  // G8-11: lắc mượt (smoothShake), nước văng ra từ thân Mun, không còn giọt đọng trên màn hình.
  stageShake(color, done) {
    this.time.delayedCall(160, () => {
      const m = this.mun;
      this.sfx('mun_sfx_shake');
      this.smoothShake(8, 3, 680, color || null, 2);
      this.time.delayedCall(700, () => {
        this.blinkUntil = this.time.now + 150; this.blinkAt = this.time.now + 3000; // chớp mắt (mí mắt, aliveReal)
        this.time.delayedCall(170, () => done && done());
      });
      if (!color) {
        this.tweens.chain({ targets: m, tweens: [
          { scaleX: m.base * 1.12, scaleY: m.baseY * 1.1, duration: 240, ease: 'Quad.out' },
          { scaleX: m.base, scaleY: m.baseY, duration: 300, ease: 'Back.out' },
        ] });
        return;
      }
      this.puddleR = Math.min(260, this.puddleR + 20);
    });
  }

  // Chỗ tai (cạnh ngoài, trên mắt) theo dáng hiện tại: [trái, phải] toạ độ thế giới. Ảnh thật: suy từ tâm hai mắt (mục 4.6).
  earPts() {
    const m = this.mun, Q = PTS[m.key], e = this.A.entries[m.key];
    if (Q && e && e.real) {
      const [l, r] = Q.eyes.map((pt) => this.spritePt(m, pt)), d = Math.hypot(r[0] - l[0], r[1] - l[1]);
      return [[l[0] - d * 0.45, l[1] - d * 0.7], [r[0] + d * 0.45, r[1] - d * 0.7]];
    }
    const P = POSE[this.munKey];
    if (!P) return null;
    const [r, cy] = P.head, k = this.munSX;
    return [-1, 1].map((sd) => [MUN_AT[0] + sd * r * (P.earsDown ? 1.15 : 0.75) * k, MUN_AT[1] - (MUN_H - cy + r * (P.earsDown ? 0.35 : 1.45)) * k]);
  }

  // Ảnh thật: đuôi `mun_bath_tail_*` gắn ở gốc đuôi của dáng, xoay quanh gốc (vẫy chậm ±6° theo nhịp thở, vẫy mạnh ±18° khi ké bung hết),
  // đi theo Mun khi Mun lắc, nhún; mí mắt `mun_bath_blink` hiện 0,13 giây ở giữa hai mắt, co theo khoảng cách mắt. Trả về false nếu
  // dáng hiện tại là khối tạm (aliveStep vẽ đuôi, mí bằng code như bản khối).
  aliveReal(time) {
    const m = this.mun, Q = PTS[m.key], e = this.A.entries[m.key];
    if (!e || !e.real) { this.tail.setVisible(false); this.blink.setVisible(false); return false; }
    const show = m.visible && this.phase !== 'ending' && this.phase !== 'reward';
    const k = m.scaleX / (m.base || 1);                                  // co giãn hiện tại của Mun (nhún, phồng)
    if (show && Q && Q.tail) {
      if (this.tail.key !== Q.tk) this.applyKey(this.tail, Q.tk);
      const flick = this.tailFlick && time - this.tailFlick < 600 ? Math.sin((time - this.tailFlick) / 50) * 18 : 0;
      this.tail.setPosition(...this.spritePt(m, Q.tail)).setScale(this.tail.base * k, this.tail.baseY * m.scaleY / (m.baseY || 1))
        .setAngle(m.angle + TAIL_REST + Math.sin(time / 800) * 6 + flick).setAlpha(m.alpha).setVisible(true);
    } else this.tail.setVisible(false);
    if (time > this.blinkAt) { this.blinkAt = time + Phaser.Math.Between(3000, 5500); this.blinkUntil = time + 130; }
    const bk = BLINK_KEY[m.key];
    if (show && Q && Q.open && !this.busy.mun && time < this.blinkUntil && bk && this.realKey(bk)) {
      if (this.blink.texture.key !== bk) this.applyKey(this.blink, bk);
      this.blink.setPosition(m.x, m.y).setScale(m.scaleX, m.scaleY).setAngle(m.angle).setFlipX(m.flipX).setAlpha(m.alpha).setVisible(true);
    } else if (show && Q && Q.open && !this.busy.mun && time < this.blinkUntil) { // thiếu mí riêng: mí chung co theo khoảng cách mắt
      if (this.blink.texture.key !== 'mun_bath_blink') this.applyKey(this.blink, 'mun_bath_blink');
      const [l, r] = Q.eyes, [x, y] = this.spritePt(m, [(l[0] + r[0]) / 2, (l[1] + r[1]) / 2]);
      const f = Math.hypot(r[0] - l[0], r[1] - l[1]) / BLINK_EYE;
      this.blink.setPosition(x, y).setScale(this.blink.base * f * k).setAngle(m.angle + Phaser.Math.RadToDeg(Math.atan2(r[1] - l[1], r[0] - l[0]))).setVisible(true);
    } else this.blink.setVisible(false);
    return true;
  }

  // Mun sống động: đuôi vẫy chậm theo nhịp thở, thỉnh thoảng chớp mắt, tai xoay về dụng cụ đang tới gần.
  // Bản khối: đoạn chóp đuôi và mí mắt vẽ bằng code đè lên khối Mun.
  aliveStep(time) {
    const g = this.aliveG.clear(), m = this.mun, P = POSE[m.key];
    const D1 = this.tdrag;
    if (this.aliveReal(time)) {
      if (D1 && D1.moved && this.phase === 'search' && time - this.earAt > 1500 && Math.hypot(D1.tx - MUN_AT[0], D1.ty - 720) < 280) { this.earAt = time; this.earFx(D1.tx < MUN_AT[0] ? -1 : 1); }
      return;
    }
    if (!m.visible || !P || this.busy.mun || Math.abs(m.angle) > 0.5 || this.phase === 'ending' || this.phase === 'reward') return;
    const k = this.munSX, X = (cx) => MUN_AT[0] + (cx - MUN_W / 2) * k, Y = (cy) => MUN_AT[1] - (MUN_H - cy) * k;
    const [br0, , br2] = P.body;
    const tx = X(MUN_W / 2 + br0 + 30), ty = Y(br2 - 70);
    const flick = this.tailFlick && time - this.tailFlick < 600 ? Math.sin((time - this.tailFlick) / 50) * 0.6 : 0;
    const ang = Math.atan2(-110, -40) + Math.sin(time / 800) * 0.45 + flick, L = 40 * k;
    const ex = tx + Math.cos(ang) * L, ey = ty + Math.sin(ang) * L;
    g.lineStyle(P.tailW * k, 0x6b4a3a, 1).lineBetween(tx, ty, ex, ey);
    g.lineStyle((P.tailW - 8) * k, 0x2a2626, 1).lineBetween(tx, ty, ex, ey);
    // chớp mắt (chỉ dáng mắt mở tròn)
    if (time > this.blinkAt) { this.blinkAt = time + Phaser.Math.Between(3000, 5500); this.blinkUntil = time + 130; }
    if (P.open && time < this.blinkUntil) {
      const [hr, hcy] = P.head, eyY = Y(hcy - 6), er = (P.eyeR || 15) * k;
      for (const sd of [-1, 1]) {
        const eyX = X(MUN_W / 2 + sd * hr * 0.38);
        g.fillStyle(0x2a2626, 1).fillEllipse(eyX, eyY, er * 2.6, er * 2.8);
        g.lineStyle(4, 0xf3d58a, 1).lineBetween(eyX - er, eyY + 2, eyX + er, eyY + 2);
      }
    }
    // tai xoay về phía dụng cụ đang tới gần
    const D0 = this.tdrag;
    if (D0 && D0.moved && time - this.earAt > 1500) {
      const [px, py] = this.toolPt(D0);
      if (Math.hypot(px - MUN_AT[0], py - 760) < 280) { this.earAt = time; this.earFx(px < MUN_AT[0] ? -1 : 1); }
    }
  }

  vibrate(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* bỏ qua */ } }

  loopSfx(time, key) { if (key && time - this.loopSfxAt > 420) { this.loopSfxAt = time; this.sfx(key, 0.5); } }

  flash(ms = 600) { this.flashUntil = this.time.now + ms; }

  sparkleAt(x, y, w = 44) {
    const s = this.img('ui_sparkle', x, y, D.fx).setOrigin(0.5, 0.5);
    this.fitWidth(s, w);
    const b = s.base;
    s.setScale(0);
    this.tweens.chain({ targets: s, tweens: [{ scale: b, angle: 45, duration: 200 }, { scale: 0, angle: 90, duration: 300 }], onComplete: () => s.destroy() });
  }

  // Giọt / vụn bắn ra quanh (x, y). far: bắn xa (máy sấy thổi nước).
  splash(x, y, color, n = 10, far = false) {
    for (let i = 0; i < n; i++) {
      const d = this.add.circle(x + Phaser.Math.Between(-60, 60), y + Phaser.Math.Between(-40, 40), Phaser.Math.Between(5, 9), color, 0.9).setDepth(D.fx);
      const a = Phaser.Math.FloatBetween(-Math.PI, 0), r = far ? Phaser.Math.Between(220, 380) : Phaser.Math.Between(90, 200);
      this.tweens.add({ targets: d, x: d.x + Math.cos(a) * r, y: d.y + Math.sin(a) * r * 0.6 + 120, alpha: 0, duration: 650, ease: 'Quad.out', onComplete: () => d.destroy() });
    }
  }

  // Tia nước dưới vòi sen.
  spray(time, x, y, color) {
    if (time - this.sprayAt < 60) return;
    this.sprayAt = time;
    for (let i = 0; i < 2; i++) {
      const d = this.add.circle(x + Phaser.Math.Between(-30, 30), y + 30, 4, color, 0.9).setDepth(D.fx);
      const fy = Math.max(d.y + 60, FLOOR_Y + Phaser.Math.Between(-8, 14));
      this.tweens.add({ targets: d, y: fy, alpha: 0.4, duration: Math.max(200, (fy - d.y) * 1.1), ease: 'Quad.in', onComplete: () => { if (Math.random() < 0.35) this.ripple(d.x, FLOOR_Y); d.destroy(); } });
    }
    this.puddleR = Math.min(260, this.puddleR + 0.6); // vũng nước loang dần
  }

  // Nước bùn nâu chảy từ người Mun xuống sàn.
  dribble(x, y, color) {
    if (Math.random() > 0.45) return;
    const d = this.add.ellipse(x + Phaser.Math.Between(-20, 20), y, 10, 22, color, 0.9).setDepth(23.5);
    const off = d.x < MUN_AT[0] ? -1 : 1;
    this.tweens.chain({ targets: d, tweens: [
      { y: MUN_AT[1] - 6, x: d.x + Phaser.Math.Between(-6, 6), scaleY: 1.8, duration: 450, ease: 'Sine.in' },                // chảy dọc người xuống ghế
      { x: MUN_AT[0] + off * 190, duration: 160, ease: 'Linear' },                                                       // ra mép ghế
      { y: FLOOR_Y + 6, scaleY: 1, alpha: 0.5, duration: 260, ease: 'Quad.in' },                                         // xuống sàn
    ], onComplete: () => { this.ripple(d.x, FLOOR_Y); this.puddleR = Math.min(260, this.puddleR + 0.8); d.destroy(); } });
  }

  // Vệt gió máy sấy, lông bay phần phật.
  wind(time, x, y) {
    if (time - this.sprayAt < 90) return;
    this.sprayAt = time;
    const l = this.add.rectangle(x - 40, y + Phaser.Math.Between(-20, 20), 40, 4, 0xffffff, 0.8).setDepth(D.fx);
    this.tweens.add({ targets: l, x: l.x - 120, alpha: 0, duration: 300, onComplete: () => l.destroy() });
  }

  // Một quả ké bật ra từ chùm ở (bx, by) như bị bắn, rơi xuống sàn nảy lách tách 2 lần rồi lăn, mờ dần.
  // Chùm ở đuôi bắn sang phải (phía ngoài); chùm trên đầu bắn sang hai bên.
  popBurr([bx, by] = BURR, k = 1) {
    const b = this.add.circle(bx + Phaser.Math.Between(-30, 30) * k, by, 14 * k, 0x9a8a4a, 1).setStrokeStyle(3, 0x6b4a3a).setDepth(D.fx);
    const side = bx === BURR[0] ? 1 : Phaser.Math.RND.sign();
    const dx = side * Phaser.Math.Between(60, 150), fy = FLOOR_Y + Phaser.Math.Between(0, 14);
    this.tweens.chain({ targets: b, tweens: [
      { x: b.x + dx * 0.5, y: b.y - Phaser.Math.Between(60, 110), angle: 180, duration: 160, ease: 'Quad.out' },
      { x: b.x + dx, y: fy, angle: 360, duration: 300, ease: 'Quad.in', onComplete: () => { this.sfx('sfx_tap', 0.5); this.ripple(b.x, FLOOR_Y); } },
      { y: fy - 22, duration: 110, ease: 'Quad.out' }, { y: fy, duration: 110, ease: 'Quad.in', onComplete: () => this.sfx('sfx_tap', 0.35) },
      { y: fy - 8, duration: 70, ease: 'Quad.out' }, { y: fy, duration: 70, ease: 'Quad.in' },
      { x: `+=${Phaser.Math.Between(20, 40)}`, angle: '+=200', duration: 360, ease: 'Quad.out' },
      { alpha: 0, duration: 400, delay: 500 },
    ], onComplete: () => b.destroy() });
  }

  // Bọt nhỏ nở ở các điểm lưới trong bán kính FOAM_REACH quanh bông tắm (tối đa n điểm mỗi lần); all: phủ kín mọi điểm còn trống.
  foamGrow(x, y, n, all = false) {
    const keys = ['l8_foam_bubble_a', 'l8_foam_bubble_b', 'l8_foam_bubble_c'];
    let made = 0;
    this.foamPts.forEach((pt, i) => {
      if (this.foamFill[i] || (!all && (made >= n || Math.hypot(pt[0] - x, pt[1] - y) > FOAM_REACH))) return;
      this.foamFill[i] = true;
      made++;
      const b = this.img(keys[(i * 7) % 3], pt[0] + Phaser.Math.Between(-8, 8), pt[1] + Phaser.Math.Between(-8, 8), 24 + (i % 5) * 0.01);
      const k = b.base;
      b.setScale(0);
      b.big = keys[(i * 7) % 3] === 'l8_foam_bubble_c';
      this.tweens.chain({ targets: b, tweens: [ // nở ra, nảy nhẹ
        { scale: k * 1.18, delay: all ? made * 12 : 0, duration: 150, ease: 'Quad.out' }, { scale: k, duration: 160, ease: 'Back.out' },
      ], onComplete: () => this.attachTo(b, this.mun) });
      this.foamB.push(b);
    });
  }

  // Xả bọt: bọt trong tầm tia nước vỡ "póc" hoặc trôi theo nước xuống sàn.
  foamWash(time, x, y) {
    this.foamB = this.foamB.filter((b) => {
      if (Math.hypot(b.x - x, b.y - y) > FOAM_REACH) return true;
      this.foamOff(b, Math.random() < 0.5);
      if (time - this.foamPopAt > 160) { this.foamPopAt = time; this.sfx('l8_sfx_pop', 0.25); }
      return false;
    });
  }

  foamOff(b, slide, delay = 0) {
    this.detach(b);
    this.tweens.killTweensOf(b);
    const tw = slide ? { y: FLOOR_Y, alpha: 0, duration: 520, ease: 'Quad.in' } : { scale: b.scale * 1.5, alpha: 0, duration: 140 };
    this.tweens.add({ targets: b, ...tw, delay, onComplete: () => b.destroy() });
  }

  // Ánh cầu vồng pastel thoáng qua trên một bọt to.
  foamShimmer(time) {
    this.every(time, 'shimmer', 900, () => {
      const bigs = this.foamB.filter((b) => b.big && b.active);
      if (!bigs.length) return;
      const b = Phaser.Utils.Array.GetRandom(bigs), hues = [0xf8c6cc, 0xfce39a, 0xb9ddbe, 0xb8daf2];
      this.tweens.addCounter({ from: 0, to: 3, duration: 600, onUpdate: (tw) => {
        const v = tw.getValue(), i = Math.floor(v);
        if (b.active) b.setTint(lerpC(hues[i], hues[Math.min(3, i + 1)], v - i));
      }, onComplete: () => { if (b.active) b.clearTint(); } });
    });
  }

  foamClear() { this.foamB.forEach((b, i) => this.foamOff(b, i % 2 === 0, i * 10)); this.foamB = []; }

  // Bọt nhỏ bay lên phòng (big: bọt hắt xì, vỡ "póc").
  flyBubble(x, y, r = 16, big = false) {
    const b = this.img(big ? 'l8_foam_bubble_c' : r > 14 ? 'l8_foam_bubble_b' : 'l8_foam_bubble_a', x, y, D.fx);
    this.airB.push(b);
    if (big) b.setScale(b.base * 1.4);
    this.tweens.add({ targets: b, x: x + Phaser.Math.Between(-80, 80), y: y - (big ? 360 : 260), duration: big ? 1400 : 1600, ease: 'Sine.out', onComplete: () => {
      if (big) this.sfx('l8_sfx_pop', 0.5);
      this.tweens.add({ targets: b, scale: 1.4, alpha: 0, duration: 120, onComplete: () => b.destroy() });
    } });
  }

  duckWet() { return 80 + this.puddleR > Math.abs(DUCK[0] - PUDDLE[0]) - 40; } // vũng loang tới vịt

  // Vũng nước trên sàn (màu theo nước: trong → nâu bùn → trắng bọt → trong) và ống mềm vòi sen.
  drawWater() {
    const g = this.waterG.clear(), r = this.puddleR;
    if (r > 3) {
      const [x, y] = PUDDLE, rx = 80 + r, ry = 16 + r * 0.2;
      g.fillStyle(this.water.c, 0.7).fillEllipse(x, y, rx * 2, ry * 2).lineStyle(3, 0xffffff, 0.6).strokeEllipse(x - 20, y - 3, rx * 1.2, ry * 0.9);
    }
    const sh = this.hangTools && this.hangTools[0].s;
    if (!sh) return;
    const [hx, hy] = this.spritePt(sh, SHOWER_TAIL, SHOWER_TAIL_FB);       // đuôi tay cầm vòi sen (khâu nối ống)
    const [jx, jy] = this.spritePt(this.mixer, MIXER_JOINT, MIXER_JOINT_FB); // chỗ nối ống ở van (đáy tay gạt)
    const mx = (jx + hx) / 2, my = Math.max(jy, hy) + 120;                  // ống mềm võng xuống
    const curve = new Phaser.Curves.QuadraticBezier(new Phaser.Math.Vector2(jx, jy), new Phaser.Math.Vector2(mx, my), new Phaser.Math.Vector2(hx, hy));
    this.hose.clear().lineStyle(13, 0x8a7a6a, 1);                          // ống bạc nét chì nâu như demo
    curve.draw(this.hose, 24);
    this.hose.lineStyle(8, 0xd4d0ca, 1);
    curve.draw(this.hose, 24);
    this.hose.setDepth(this.tdrag && this.tdrag.t === this.hangTools[0] ? D.ui + 19 : 7);
  }

  // Vịt nổi bập bềnh khi vũng nước loang tới; vòi sen xịt gần thì vịt nhảy nhảy, kêu chít.
  duckStep(time) {
    const wet = this.duckWet();
    if (!this.tweens.isTweening(this.duck)) {
      this.duck.y = DUCK[1] + (wet ? Math.sin(time / 280) * 4 : 0);
      this.duck.angle = wet ? Math.sin(time / 400) * 6 : 0;
    }
    const D0 = this.tdrag;
    if (D0 && D0.t.key === 'l8_tool_shower' && time - D0.lastMove < MOVE_MS && Math.abs(D0.t.s.x - this.duck.x) < 110 &&
      D0.t.s.y > this.duck.y - 360 && time - this.duckSpinAt > 1200) {
      this.duckSpinAt = time;
      this.sfx('l8_sfx_squeak', 0.7);
      this.duck.setPosition(DUCK[0], DUCK[1]).setAngle(0);
      const hop = [{ y: DUCK[1] - 30, duration: 130, ease: 'Quad.out' }, { y: DUCK[1], duration: 130, ease: 'Quad.in' }];
      this.tweens.chain({ targets: this.duck, tweens: [...hop, ...hop, ...hop] }); // G8-4: nhảy nhảy, không xoay
    }
  }

  // Viền sáng chỗ cần làm, nhịp 1,5 giây; nhạt dần theo tiến độ; nhấp nháy mạnh một nhịp khi chọn sai.
  drawHighlight(time) {
    const g = this.hl.clear();
    this.ringG.clear();
    if (this.phase !== 'search') return;
    // Vòng tiến độ chung của bước (G8-5) ở chỗ cố định; G8-6: chỉ hiện khi đang chạm Mun (ringStep), rời quá 1 giây thì mờ.
    if (STEPS[this.step] && this.ringA > 0) {
      this.drawRing([0, 0], this.stepProg());
      this.ringG.setPosition(...RING_AT).setScale(this.ringS.k).setAlpha(this.ringA);
    }
    // Chỗ cần làm sáng lên bằng vòng tròn (G8-5: mọi gợi ý đều hình tròn, kể cả gợi ý 16 giây và 💡).
    const strong = time < this.flashUntil, k = 0.5 + 0.5 * Math.sin((time / 1500) * Math.PI * 2);
    // G8-12: vừa xong bước thì chờ vùng cũ nhấp nháy xong mới hiện vòng của bước mới, hiện dần 0,3 giây.
    const fadeIn = Phaser.Math.Clamp((time - (this.hintHoldUntil || 0)) / 300, 0, 1);
    if (!fadeIn) return;
    for (const o of this.spots()) {
      const [x, y, rx, ry] = o.e, r = Math.max(rx, ry) + 6, a = fadeIn * (strong ? 1 : (0.25 + 0.5 * k) * (1 - 0.7 * o.p) * (this.hints.h2 ? 1.4 : 1));
      g.lineStyle(16, HINT_C, Math.min(1, a) * 0.35).strokeCircle(x, y, r + 6);       // quầng cam
      g.lineStyle(strong ? 12 : 8, HINT_C, Math.min(1, a)).strokeCircle(x, y, r);
      g.lineStyle(strong ? 4 : 3, HINT_CORE, Math.min(1, a)).strokeCircle(x, y, r);   // lõi trắng: nổi cả trên lông đen lẫn nền sáng
    }
  }

  // Tiến độ chung của bước hiện tại 0..1: bước 1 theo số thứ đã gỡ (6), bước 2 và 3 trung bình các chỗ, còn lại theo bước.
  stepProg() {
    const n = this.step, S = STEPS[n];
    if (!S) return 0;
    if (S.area === 'leaf') return Object.keys(LEAF).filter((k) => this.leaves[k]).length / Object.keys(LEAF).length;
    if (S.area === 'comb') return Object.keys(COMB).reduce((a, k) => a + (this.prog[k] || 0), 0) / Object.keys(COMB).length;
    if (S.area === 'mud') return this.muddy();
    if (S.area === 'oil') return this.oilCount() / OIL_N;
    return this.prog[n] || 0;
  }

  drawRing([x, y], p, g = this.ringG) {
    g.fillStyle(0xffffff, 0.95).fillCircle(x, y, RING_R);
    if (p > 0) g.fillStyle(RING_FILL, 1).slice(x, y, RING_R - 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, p), false).fillPath();
    g.lineStyle(7, RING_EDGE, 1).strokeCircle(x, y, RING_R);
  }

  // Đang chạm Mun: dụng cụ đúng bước đè lên người Mun, tay đang gỡ lá / cành, hoặc khăn đang quấn. Lần đầu chạm vòng nảy ra (pop)
  // với phần đã làm; rời quá 1 giây thì mờ dần, chạm lại thì hiện lại.
  ringStep(time, dt) {
    const D0 = this.tdrag, S = STEPS[this.step];
    const touching = this.phase === 'search' && S && (!!this.ldrag || this.towelOn ||
      (D0 && D0.moved && S.tool === D0.t.key && !D0.t.faded && this.inMun(...this.toolPt(D0))));
    if (touching) {
      this.ringTouchAt = time;
      if (!this.ringOn || this.ringA < 0.5) {
        this.ringOn = true;
        this.tweens.killTweensOf(this.ringS);
        this.ringS.k = 0;
        this.tweens.add({ targets: this.ringS, k: 1, duration: 220, ease: 'Back.out' });
      }
      this.ringA = 1;
    } else if (this.ringOn && time - this.ringTouchAt > 1000) {
      this.ringA = Math.max(0, this.ringA - dt / 300);
      if (!this.ringA) this.ringOn = false;
    }
  }

  // Vòng chung đầy: "ting", nảy to rồi biến mất.
  ringPop() {
    this.ringOn = false;
    this.ringA = 0;
    const [x, y] = RING_AT, g = this.add.graphics().setDepth(D.fx + 2).setPosition(x, y);
    this.drawRing([0, 0], 1, g);
    this.sfx('l8_sfx_ting', 0.8);
    this.tweens.chain({ targets: g, tweens: [
      { scale: 1.25, duration: 130, ease: 'Quad.out', yoyo: true, repeat: 2 },     // 3 nhịp nảy sáng
      { scale: 1.5, alpha: 0, duration: 260, ease: 'Quad.out' },
    ], onComplete: () => g.destroy() });
  }

  // Vùng của bước n (elip) để nhấp nháy khi xong: lá, 2 chùm ké, 3 mảng bùn, hoặc vùng của bước.
  doneAreas(n) {
    const a = STEPS[n].area;
    if (a === 'leaf') return Object.values(LEAF).map(([x, y]) => [x, y, 50, 40]);
    if (a === 'comb') return Object.keys(COMB).map((k) => AREA[k]);
    if (a === 'mud') return Object.keys(MUD).map((k) => AREA.mud(k));
    return [AREA[a]];
  }

  // G8-11: xong bước, vùng vừa làm nhấp nháy sáng 3 nhịp (mảng trắng mờ + vòng cam), mỗi nhịp lấp lánh một lần.
  doneBlink(n) {
    const g = this.add.graphics().setDepth(D.fx - 1).setAlpha(0), es = this.doneAreas(n);
    for (const [x, y, rx, ry] of es) {
      g.fillStyle(0xffffff, 0.22).fillEllipse(x, y, rx * 2 + 30, ry * 2 + 30);
      g.fillStyle(0xffffff, 0.3).fillEllipse(x, y, rx * 2, ry * 2);
      g.lineStyle(8, HINT_C, 0.9).strokeEllipse(x, y, rx * 2 + 16, ry * 2 + 16);
      g.lineStyle(3, HINT_CORE, 1).strokeEllipse(x, y, rx * 2 + 16, ry * 2 + 16);
    }
    es.forEach(([x, y]) => this.sparkleAt(x, y, 40));
    this.hintHoldUntil = this.time.now + 3 * 300 + 2 * 80; // G8-12: vòng gợi ý bước mới chờ nhấp nháy chạy xong
    this.tweens.add({ targets: g, alpha: 1, duration: 120, yoyo: true, hold: 60, repeat: 2, repeatDelay: 80, ease: 'Sine.inOut',
      onRepeat: () => es.forEach(([x, y]) => this.sparkleAt(x, y, 40)), onComplete: () => g.destroy() });
  }

  // Bong bóng mặt Mun trên đầu: 'happy' (xong một phần / cả bước) hoặc 'no' (dùng sai), hiện 0,8 giây rồi tắt.
  emote(kind) {
    if (this.emoteS) { this.tweens.killTweensOf(this.emoteS); this.emoteS.destroy(); }
    const s = this.emoteS = this.img(kind === 'happy' ? 'ui_emote_mun_happy' : 'ui_emote_mun_no', ...EMOTE_AT, D.fx + 5);
    const b = s.base;
    s.setScale(0);
    this.tweens.chain({ targets: s, tweens: [
      { scale: b, duration: 160, ease: 'Back.out' }, { scale: b, duration: 480 }, { alpha: 0, scale: b * 0.8, duration: 160 },
    ], onComplete: () => { s.destroy(); if (this.emoteS === s) this.emoteS = null; } });
  }

  // ---------- gợi ý ----------
  // Bước hiện tại: dụng cụ cần dùng trong khay (null ở bước nhặt lá) và chỗ cần làm.
  hintInfo() {
    if (this.phase !== 'search' || this.trayBusy) return null;
    const S = STEPS[this.step], sp = this.spots()[0];
    if (!S || !sp) return null;
    const tool = S.tool ? this.allTools().find((t) => t.key === S.tool && !t.faded) : null;
    return { S, tool, to: [sp.e[0], sp.e[1]], spot: sp };
  }

  // 8 giây: Mun nhìn xuống dụng cụ cần dùng (bước 1: nhìn chiếc lá), meo nhỏ.
  hint1() {
    const h = this.hintInfo();
    if (!h || this.busy.mun) return;
    this.sfx('mun_sfx_meow', 0.3);
    const tx = h.tool ? h.tool.home[0] : h.to[0];
    this.tweens.add({ targets: this.mun, angle: Phaser.Math.Clamp((tx - MUN_AT[0]) / 40, -6, 6), duration: 250, yoyo: true, hold: 800 });
    if (!h.tool) this.wiggle(this.leafS[h.spot.id], 8, 2, 300);
  }

  // 16 giây: dụng cụ đó lấp lánh, chỗ cần làm sáng rõ hơn (drawHighlight đọc hints.h2).
  idleSparkle() {
    const h = this.hintInfo();
    if (!h) return;
    this.hints.h2 = true;
    this.sparkle(h.tool ? h.tool.s : this.leafS[h.spot.id]);
  }

  // 💡 bàn chân làm mẫu kéo dụng cụ lên đúng chỗ (dụng cụ vuốt: làm mẫu một đường vuốt; bước 1: kéo lá ra ngoài chậu).
  strongHint() {
    this.pressBulb();
    const h = this.hintInfo();
    if (!h) return;
    this.flash(1200);
    if (!h.tool) { this.handDrag(h.to, [h.to[0] < 512 ? 150 : 870, 1180], 'hint', 'paw', 2); return; }
    if (h.S.kind === 'drop') { this.handDrag(h.tool.home, h.to, 'hint', 'paw', 2); return; }
    this.pawSwipe(h.tool.home, h.to);
  }

  pawSwipe(from, [x, y]) {
    this.handHide('paw');
    const s = this.paw;
    s.depth0 = s.depth;
    s.setDepth(D.ui + 30).setVisible(true).setPosition(...from).setAlpha(0).setScale(s.base);
    this.tweens.chain({ targets: s, tweens: [
      { alpha: 1, scale: s.base * 0.88, duration: 200 },
      { x, y, duration: 700, ease: 'Sine.inOut' },
      { x: x - 70, duration: 220 }, { x: x + 70, duration: 300 }, { x: x - 70, duration: 300 }, { x, duration: 220 },
      { alpha: 0, duration: 250 },
    ], onComplete: () => this.handHide('paw') });
  }

  pauseGame() {
    if (this.tdrag && !this.pausedState && this.phase === 'search') { const t = this.tdrag.t; this.tdrag = null; this.returnTool(t, false, 0); }
    if (this.ldrag && !this.pausedState && this.phase === 'search') { const L = this.ldrag; this.ldrag = null; L.free = false; L.s.setPosition(L.ox, L.oy).setAngle(0); this.attachTo(L.s, this.mun); }
    super.pauseGame();
  }

  update(time, delta) {
    if (this.frozen) return;
    const dt = Math.min(delta || 16, 50);
    if (this.phase === 'search' && !this.introBusy) this.clockMs += dt;
    if (this.clockText) this.clockText.setText(Math.floor(this.clockMs / 1000) + ' / 150');
    const T0 = this.tdrag;
    if (T0 && !T0.t.using) { const k = 1 - Math.exp(-dt / 25), s = T0.t.s; s.setPosition(s.x + (T0.tx - s.x) * k, s.y + (T0.ty - s.y) * k); }
    this.swipeStep(time, dt);
    this.towelStep(time, dt);
    this.ringStep(time, dt);
    this.dryStop(time);
    if (this.step >= 5 && this.step <= 7) this.foamShimmer(time);
    const L = this.ldrag;
    if (L && L.free && L.heavy) L.s.setPosition(L.s.x + (L.tx - L.s.x) * 0.25, L.s.y + (L.ty - L.s.y) * 0.25);
    this.followKids();
    this.drawWater();
    this.duckStep(time);
    this.drawHighlight(time);
    this.aliveStep(time);
    if (!this.tdrag && !this.ldrag) this.idleHints(time);
  }
}
