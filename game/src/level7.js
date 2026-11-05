// Level 7 – Về nhà thôi, Mun! (G7-1..12). Bản chơi thử bằng khối (QUY-TRINH bước 2). Luồng theo levels/levels-01-10.md và
// levels/states-01-10.md (Level 7). Đêm mưa bão, Mun tự tìm đường về nhà nhân vật qua 3 cảnh nối nhau, đi từ phải sang trái:
// góc hẻm (nền l7_bg_alley) → trước quán nước → trước nhà nhân vật (nền khối). Người chơi kéo / vuốt đồ có sẵn trong cảnh
// vào ô sáng (objects.js litSlot) để dọn đường; Mun đi theo chặng (trail.js), chướng ngại chưa dọn thì ngồi chờ trên nền khô. Mun ra
// mép trái thì khung trượt sang cảnh sau (0,8 giây). Cuối màn: kê 2 bậc cạnh nhau (hộp bé, thùng gỗ) → Mun lên bậu; chạm mở cửa sổ;
// treo chuông gió (lấy từ hộp) vào móc giữa cửa sổ → Mun khều chuông → nhân vật cầm khăn to giang tay → Mun lộ diện → người chơi
// chạm Mun → cảnh bế chung (khăn to lót dưới, vòng lên sau lưng, giọt nước).
// G7-5: mọi chướng ngại chắn kín lối hẹp. G7-7: Mun luôn quay mặt theo hướng đi (trái) khi di chuyển; chỉ ngoái lại khi ngồi chờ bị
// chạm hoặc lúc gợi ý. G7-9: chỗ ngồi chờ luôn trên nền khô, trước chướng ngại ~40px. G7-12: tỉ lệ cảnh 2, 3; thắng bằng chạm Mun
// khi lộ diện. G7-14: cảnh 1 trả về bản G7-11 (tôn, chổi, đoạn ngập + ván, cành cây).
// G7-15: bỏ chổi, thay bằng thùng xốp trắng kê dưới mép tôn. G7-16: thùng xốp đổi thành cành chạc chữ Y đỡ mép tôn.
// G7-16: vũng nước + cành gãy trang trí cả 3 cảnh, lá bay dày gấp đôi; chuông gió đặt sẵn trên nắp hộp bé, kéo thẳng vào móc.
// G7-17: cảnh 1 Mun nấp/chờ cách đoạn ngập ≥ 60 px; cành chạc → thang gỗ chữ A gập/bung; thêm 2 cành nhỏ (kéo cả 3 cành mới mở lối);
// cảnh 2 xe đạp ảnh l5_bike (đổ = nằm dẹt), mưa xối sân quán tự nhiên hơn; cảnh 3 chuông nằm ngang trên nắp; bong bóng nhớ chỉ mặt.
// G7-18: thang 2 bậc thấp (tôn sụp thấp xuống gác đỉnh thang); đống 3 cành to chồng nhau; ván ngắn 300, vùng chạm ±40; xe đạp ghép
// bánh trước l5_bike_wheel; cảnh 3 cửa chính thấp 2/3, rộng 1,15; cửa sổ 4/5.
// G7-19: thang bung sẵn từ đầu; ô sáng chỉ hiện cho món đang cầm (và lúc gợi ý); 3 cành vào ô nào cũng được; món bám sát tay.
// G7-20: mái cảnh 1 = bạt l5_awning_down (đổ sụp lệch, kê thang dựng phẳng như L5); xe đạp đổ dựng dọc nghiêng, đúng tỉ lệ;
// chuông lúc đầu treo cạnh góc trên trái cửa chính (móc vẫn ở cửa sổ).
import { D, CAT_ARROW } from './base.js';
import { RoomsLevel, ROOM_W } from './rooms.js';
import { Trail } from './trail.js';
import { PAL, rr, el, label, block } from './blocks.js';

// Phòng xếp trái → phải: cảnh 3, cảnh 2, cảnh 1 (Mun đi sang trái nên khung trượt sang trái). Toạ độ dưới đây là toạ độ trong cảnh
// (khung 1024x1536), at(phòng, x, y) đổi sang thế giới.
const S3 = 0, S2 = 1, S1 = 2;
const at = (room, x, y) => [x + room * ROOM_W, y];
const WALK = 0.2;                                     // Mun chạy 200 px/giây
const RUN_FRAME = 120;                                // G7-9: chạy 2 khung mun_run ↔ mun_run_b, 0,12 giây/khung
const NIGHT = D.fx - 0.5;                             // mốc lớp: chớp, mưa, ô sáng vẽ trên mốc này (lớp đêm phủ màn đã bỏ)
// G7 tách asset (GD 1, chọn b): bỏ lớp đêm phủ toàn màn; nền và đồ L7 mới đã vẽ sẵn tông đêm nhạt như demo đã duyệt. Riêng đồ dùng
// lại (vẽ ban ngày) và Mun: tint thật nhẹ cho khớp tông đồ cùng loại trong demo, không tối hơn demo. Chỉnh mức sau khi chồng ảnh game
// lên demo (compare).
const REUSE_TINT = 0xf2f1f8;                          // nhân màu: hạ sáng ≈ 5 %, ngả xanh tím rất nhẹ (GD 1: bằng nửa mức cũ 0xe6e4f2)
const ALLEY_TINT = [0x3c3878, 0.1], ALLEY_SKY = [0x3c3878, 0.38]; // G7-4: thêm riêng cho nền hẻm ban ngày (cả cảnh / vùng trời)
const ALLEY_SKY_Y = 292;                              // mép trên tường hẻm (toạ độ cảnh)
// Mun ngồi quay trái: thân trải từ x − 114 tới x + 51 (dáng ngồi rộng ≈ 165, cao ≈ 215). Chỗ chờ đặt sao cho mép thân cách chướng
// ngại ~40. Mọi đồ tương tác nằm trong khung 1024 giữa.

// Cảnh 1 – góc hẻm (chân tường y ≈ 860), bố cục G7-9/G7-11 (G7-14). Xe ba gác bên phải; tấm tôn sụp che miệng khe xe–tường; đoạn
// ngập (x 360–520) chắn từ tường tới mép trước; cành cây gãy rất to (rơi lúc mở màn) chắn lối hẹp sát mép trái.
const C1 = {
  // G7-17: khe, tôn, ô thang dời phải 30; Mun nấp/chờ ở x 720: thân x 606–771, cách mép phải đoạn ngập (≈ 518) ≈ 88 px.
  // G7-20: mái = ảnh bạt l5_awning_down, một cỡ ở mọi dáng (G7-21: rộng 540, cao ≈ 107). Dáng [x, y, góc], neo đỉnh giữa.
  // G7-22: đầu màn gắn cao sát mép trên tường như bạt L5 (nền l7_bg_alley: mép trên tường y ≈ 292); mở màn tuột cả tấm, rơi nằm chéo dưới đất che miệng khe
  // (đầu trái ≈ x 475, y 1085–1180); kê thang: mép dưới gác đỉnh thang (x 630, y 937) thành mái chéo che lối, không về chỗ cao.
  tinHigh: [650, 295, 0], tinFall: [737, 905, -28], tinCart: [764, 740, 0],  /* G7-35: mái sụp, xe, mắt, ô mái trên xe cùng lên 50 */  /* G7-26: nằm ngang trên thùng xe; G7-28: phải 40; G7-29: phải thêm 20; G7-31, G7-33, G7-34: phải thêm 7 + 7 + 10 */
  // G7-25: bỏ thang; người chơi kéo mái sụp đặt lên xe ba gác: tinCart = mái gác trên thành xe (đầu phải tựa thành xe), che miệng gầm.
  // G7-23: chỗ nấp sâu vào trong gầm xe (sang phải 80, lùi vào 20); mắt vẫn hiện dưới mép mái sụp.
  // G7-37: mặt Mun ló ra đúng chỗ đôi mắt (mắt trên ảnh mun_peek_out trùng tâm mắt eyes), rồi đi hơi chéo xuống tới chỗ chờ wait1.
  cart: [700, 1060], eyes: [800, 1000], peek: [800, 1103],
  flood: [440, 1210],                                 // demo: x 345–535, y 855–1536
  plankHome: [260, 688], plank: [440, 1122],          // G7-25 … G7-34: mặt ván (dày ≈ 58) trùng đường Mun y 1093          // ván dựng tường → bắc ngang đoạn ngập (G7-18: ván 300, x 290–590), hai đầu gác chỗ khô
  // G7-18: đống 3 cành to chồng nhau chắn kín lối cuối hẻm (cành chính mép phải x ≈ 146; 2 cành kia lệch, xoay khác nhau, không che ván,
  // không chạm chỗ Mun chờ x 186–351). Mỗi cành một ô ở bãi trống bên lề, xếp chồng xoè (x −110 … 360, trước tường). [x, y, góc]
  // Demo: đống cành x 0–225, y 740–1285 (cành dựng cao 431).
  branch: [110, 1285], branchSpot: [140, 935, 0],
  brA: [50, 1265, -10], brB: [170, 1250, 8], brASpot: [40, 965, -6], brBSpot: [215, 985, 5],
  // G7-25: cả đường Mun cảnh 1 → 2 một đường ngang y 1110 (cảnh 2 cũng y 1110): bò ra gầm xe → chờ → chạy thẳng qua ván → ra mép trái.
  wait1: [720, 1103], wait2: [300, 1103], exit: [40, 1103],     // G7-35: đường ngang y 1103 từ lúc ló ra khỏi gầm tới mép trái (ván giữ [440,1122])
};
const PLANK_LEAN = -80, BRANCHES = ['branch', 'brA', 'brB'];  // ván dựng tường; 3 cành to (G7-19: kéo bám sát tay, ô nào cũng được)
const PLANK_PAD = 40;                                // G7-18: vùng chạm ván rộng hơn hình ván 40 mỗi phía
// Cảnh 2 – trước quán nước. Phải: sân quán không mái (mưa xối x 430–760), gốc cây đầu sân; bàn có lỗ cắm ô; ô gập lăn lóc.
// Trái: hiên quán (cửa cuốn đóng, lối hiên hẹp); chó lạ sợ sấm co ro chắn lối; thùng các-tông dựa tường; xe đạp đổ chắn lối ra.
// G7-12: chó cao ≈ 1,6 lần Mun ngồi; thùng to hơn chó (chó chui lọt).
const C2 = {
  // Ráp ảnh thật: đặt theo demo (art/design-art-level7.md mục 3), nền l7_bg_shop_street: cửa cuốn x 60–460, y 400–820, hiên lát
  // x 0–540 tới mép y ≈ 1130; Mun đi ở y 1110 (trước đây 1240).
  tree: [887, 1100], table: [637, 1075], umbrellaHome: [725, 1185], umbrella: [639, 1045],  /* G7-30: neo mũi cán; x = tâm lỗ bàn, hạ 80 để mũi cán lộ dưới gầm bàn */
  dog: [347, 1065], boxHome: [390, 875], box: [200, 900],  /* G7-29: lên 10; G7-35: lên 100; G7-36: xuống 35; G7-37: xuống 40 */ bikeFallen: [250, 1100], bike: [100, 1210],
  // G7-15: ô thùng cao hơn, sát chân tường (y 870): góc trong của hiên, ngay trên chỗ chó.
  wait3: [800, 1110], wait4: [640, 1110], wait5: [440, 1110], exit: [20, 1110],
  rain: [430, 760], shutter: [60, 400, 460, 820],     // vùng mưa xối (x0, x1); cửa cuốn (x0, y0, x1, y1)
};
// G7-30: tâm lỗ bàn trên ảnh l7_shop_table 354x206 (neo 177,198; ×1/1,5): (179,5; 49) → cảnh (638,7; 975,7). Mặt bàn trước lỗ
// (từ tâm lỗ xuống) vẽ lại đè lên cán ô, nên cán đi thẳng vào tâm lỗ; dưới mặt bàn khuất, mũi cán lộ giữa các chân bàn.
const TABLE_HOLE_Y = 49;
const DOG_IN_K = 1.2, DOG_IN_LIP = 35;               // G7-27, G7-29: ảnh Lu nằm cả người trong thùng, neo đáy; đáy ảnh trên neo thùng 35. G7-31: ×1,2
const UMBRELLA_ABOVE = 240;                           // G7-15: vùng khớp ô kéo lên trên mặt bàn 240 px
// G7-16: vũng nước (ngoài lối Mun đi và chỗ chờ) và cành gãy trang trí (ngoài đồ cần dùng, ô sáng). Toạ độ cảnh, [x, y, cỡ].
// G7-23: cảnh 1, 2 thêm nhiều vũng ngập ở vùng đất phía dưới lối đi: chỉ còn một lối đi ngang.
const PUDDLES = [
  [[440, 1426], [700, 1476], [300, 1446], [960, 1396]],             // cảnh 3 (trước nhà; G7-27 lên 4)
  [[520, 1430], [830, 1450], [300, 1460], [960, 1400],              // cảnh 2 (trước quán)
    [260, 1235, 1.3], [430, 1260, 1.5], [700, 1290, 1.4], [930, 1240, 1.2], [180, 1360, 1.6], [620, 1370, 1.5], [880, 1520, 1.4], [60, 1500, 1.3]],
  [[150, 1430], [660, 1450], [880, 1340], [975, 1200],              // cảnh 1 (góc hẻm)
    [120, 1330, 1.2], [610, 1310, 1.3], [800, 1390, 1.5], [960, 1290, 1.1], [600, 1200, 1.2], [880, 1190, 1.1], [270, 1500, 1.4], [700, 1520, 1.6], [930, 1480, 1.3], [470, 1360, 1.2]],
];
const DEBRIS = [
  [[170, 1476, 15], [980, 1166, -20]],
  [[660, 1500, -10], [985, 1320, 25]],
  [[930, 1460, 12], [270, 1320, -15]],
];
// G7-29: cảnh 1 sau khi Mun ló ra khỏi gầm: lớp Mun cố định = xe + MUN_OVER_CART (xe Y(1110) = 16,1, mái trên xe 16,12, Mun 16,2),
// dưới đống 3 cành (Y(1250…1285) = 17,5…17,85). Lớp theo chân không dùng được: đường Mun y 1105 < neo đáy xe y 1110 → Mun sau xe.
const MUN_OVER_CART = 0.1;
const PEEK_EYE = [99.5, 87];                          // G7-37: tâm đôi mắt trên ảnh mun_peek_out (175x141, px ảnh)
const RAIN_LOOK = 1700;                               // G7-35: ngồi nhìn mưa trước khi thò chân khều
const S3_DY = -4, OVANG_UP = 3;                       // G7-27: cảnh 3 dịch lên 4; ô văng (vẽ trong nền) nâng thêm 3
const END_PLAYER_K = 0.7, END_PLAYER_DY = 40, ARMS_DY = 140, ARMS_DX = -50; // dáng giơ tay: G7-34 thấp thêm 40; G7-36 trái 50, xuống thêm 100          // G7-32: nhân vật ở cửa sổ cảnh cuối (quay lại → giang tay): ×0,7, thấp xuống 40
const ARMS_SCALE = 1.3, ARMS_DROP = -4;              // G7-16: nhân vật giang tay ở cửa sổ ×1,3, đáy hạ 22 px, vẫn khuất sau bậu (bậu cao 28)
const BIKE_LEAN = -78;  /* G7-25: gần dọc để xe to vẫn trọn khung (x ≈ 12–311) */                               // G7-20: xe đổ dựng dọc nghiêng (xoay quanh đáy bánh sau, bánh trước chổng lên), đúng tỉ lệ ảnh; dựng lên thì về đứng
const CHIME_GUST = 3200;                             // G7-20: chuông cạnh cửa chính (ngoài hốc cửa sổ) bị gió quật mỗi 3,2 giây
// G7-17: mưa xối sân quán: hạt mảnh dài ngắn, đậm nhạt khác nhau, nghiêng gió, rơi tới nền ở độ sâu ngẫu nhiên thì bắn tung toé + gợn nước.
const YARD = { n: 64, top: 440, ground: [1040, 1200], wind: 0.22, splash: 280 };
const BIKE_SWIPE = [0, -60], BIKE_SNAP = 180;
// G7-18: bánh trước l5_bike_wheel ghép vào thân như L5 (bánh (780, 880) so với chân xe (564, 940) khi xe rộng 353), co theo xe rộng 300.
const BIKE_W = 375;                                  // G7-25: xe to ×1,25 (trước 300)
const WHEEL_AT = [216 * BIKE_W / 353, -60 * BIKE_W / 353];
const RIPPLES = 6, LEAVES = 10;                      // gợn vũng nước, lá bay: số đối tượng dùng lại (không tạo mới mỗi lần)         // G7-11: vuốt lên ≥ 60 px là xe đứng dậy tại chỗ; kéo-thả thì khớp trong 180 px
// Cảnh 3 – trước nhà nhân vật (chân tường y ≈ 1005). G7-12: cửa sổ to (500 × 540 ≈ 3 × 2,5 lần Mun ngồi), bậu giữ ở y 700; ô văng,
// móc giữa khung trên. Cửa chính cao ≈ 4 lần Mun ngồi. 2 bậc cạnh nhau thấp dần về phía Mun: hộp bé (bậc 1) → thùng gỗ (bậc 2).
const C3 = {
  // G7-18: cửa sổ 400 × 432 (4/5), đáy giữ ở bậu (y 718), khung trên y ≈ 286; móc giữa khung trên, chuông treo dưới móc.
  // G7-20 (sửa): móc vẫn giữa khung trên cửa sổ; chuông lúc đầu treo lủng lẳng trên đinh ở tường sát cạnh trái cửa chính, ngang mép
  // trên cửa (cửa x 668–1012, đỉnh y 432; chuông x 600–660, không đè ô cửa / tay nắm), gió quật đung đưa; kéo vào móc cửa sổ.
  // G7-27: cả cảnh dịch lên 4 (nền, đồ, đường Mun). Cửa sổ ×1,05 quanh tâm khung (cao 482 → 506: đáy xuống 12, đỉnh y ≈ 278 ngay dưới
  // ô văng đã nâng 3, đáy 276); phòng trong, nhân vật, móc theo tỉ lệ đó. Thùng gỗ, hộp đồ nghề ×1,15 (cả ô đặt) rồi xuống 2.
  // G7-29: cửa sổ về cỡ cũ (bỏ ×1,05; vẫn dịch lên 4): khung, phòng trong, nhân vật, móc, chuông, bậu như trước G7-27. Thùng, hộp xuống 10.
  window: [300, 772], tvPlayer: [405, 686], hook: [304, 296], chime: [304, 336], chimeNail: [590, 436], chimeStart: [590, 476],  /* G7-32 … G7-35: trái 6 + 6 + 10 + 18 */ door: [818, 1001],
  // G7-31 … G7-34: ô thùng, hộp thấp xuống 6 + 6 + 14; chỗ Mun chờ trước cửa thấp xuống 6 + 6 + 6.
  toolboxHome: [740, 1228], toolbox: [470, 1119], crateHome: [120, 1248], crate: [300, 1119],  // G7-35: ô thấp thêm 40; G7-36: lên 17
  wait5: [716, 1124],  /* G7-35: thấp thêm 25 */ sill: [325, 754],  /* G7-37: điểm đáp cú nhảy cuối lên bậu sang phải 25 */
};

// Ảnh tạm (khối có nhãn, cỡ = cỡ hiển thị).
const sky = (c, w, top) => { c.fillStyle = '#c9d4ee'; c.fillRect(0, 0, w, top); };
const FB = {
  l7_bg_shop_street: [1024, 1536, 'bg', (c, w, h) => {
    sky(c, w, 400);
    c.fillStyle = '#efd9bf'; c.fillRect(0, 400, 450, 470);                     // nhà quán (bên trái)
    for (let x = -4, i = 0; x < 450; x += 46, i++) { c.fillStyle = i % 2 ? '#f6ead6' : '#e9a99c'; c.fillRect(x, 400, Math.min(46, 450 - x), 80); }
    c.lineWidth = 4; c.strokeStyle = PAL.brown; c.strokeRect(-4, 400, 454, 80);
    rr(c, 60, 500, 380, 372, '#d3cec8', 6);                                      // cửa cuốn
    c.lineWidth = 2; c.strokeStyle = '#aaa49d';
    for (let y = 522; y < 866; y += 22) { c.beginPath(); c.moveTo(64, y); c.lineTo(436, y); c.stroke(); }
    c.fillStyle = '#c9c2b6'; c.fillRect(450, 640, w - 450, 230);               // tường rào sân quán
    c.fillStyle = '#d6d0c8'; c.fillRect(0, 870, w, h - 870); c.fillStyle = '#c4bdb4'; c.fillRect(0, 870, w, 14);
    c.fillStyle = '#cfc8be'; c.fillRect(0, 870, 450, 420);                     // nền hiên (lối hiên hẹp)
    c.fillStyle = '#b9b2a8'; c.fillRect(0, 1290, w, 18);
    label(c, 'CỬA CUỐN ĐÓNG', 250, 640, 24); label(c, 'HIÊN QUÁN', 225, 1010, 18); label(c, 'SÂN QUÁN\n(không mái)', 700, 760, 20);
  }],
  // G7-12: tường cao hơn để chứa cửa sổ to (bậu giữ ở y 700) và cửa chính cao.
  l7_bg_house_front: [1024, 1536, 'bg', (c, w, h) => {
    sky(c, w, 80);
    c.fillStyle = '#f6e6cc'; c.fillRect(0, 80, w, 925);
    rr(c, -10, 60, w + 20, 40, '#b98a6a', 6);
    rr(c, 86, 274, 428, 452, '#8e8597', 6);                                     // hốc cửa sổ (G7-18: cửa sổ 4/5)
    rr(c, 60, 244, 480, 34, '#a06f52', 6);                                      // ô văng trên cửa sổ
    c.fillStyle = '#d6d0c8'; c.fillRect(0, 1005, w, h - 1005);
    rr(c, 680, 1000, 350, 48, '#dcc6a6', 6);
    label(c, 'Ô VĂNG', 300, 261, 14, PAL.white);
  }],
  // G7-20: mái như L5 (bạt sọc, neo đỉnh); chỉ dùng khi chưa tải được ảnh l5_awning_down.
  l5_awning_down: [540, 107, 'đỉnh', (c, w, h) => {
    rr(c, 2, 2, w - 4, h - 4, '#e98a7a', 6);
    c.fillStyle = 'rgba(255,255,255,0.4)'; for (let x = 18; x < w; x += 45) c.fillRect(x, 2, 21, h - 4);
  }],
  // G7-16: vũng nước (trang trí, không chặn đường) và cành gãy nằm rải rác (không kéo được).
  l7_puddle: [170, 48, 'tâm', (c, w, h) => el(c, w / 2, h / 2, w / 2 - 3, h / 2 - 3, 'rgba(159,208,239,0.55)', '#8fb4cc', 2)],
  l7_branch_debris: [150, 54, 'tâm', (c, w, h) => {
    c.lineCap = 'round'; c.strokeStyle = PAL.woodDark; c.lineWidth = 8;
    c.beginPath(); c.moveTo(8, h * 0.7); c.lineTo(w - 10, h * 0.45); c.moveTo(w * 0.45, h * 0.6); c.lineTo(w * 0.62, 8); c.moveTo(w * 0.7, h * 0.5); c.lineTo(w * 0.86, h * 0.9); c.stroke();
    for (const [x, y] of [[0.62, 0.15], [0.9, 0.4]]) el(c, w * x, h * y, 10, 6, PAL.green, null);
  }],
  // Đoạn ngập chắn từ chân tường tới mép trước hẻm (cả bề sâu lối đi).
  l7_flood_strip: [160, 700, 'tâm', (c, w, h) => {
    rr(c, 4, 4, w - 8, h - 8, '#a9c6d8', 40, '#7f9db0', 3);
    c.lineWidth = 2; c.strokeStyle = '#eef6fb';
    for (let y = 80; y < h; y += 110) { c.beginPath(); c.ellipse(w / 2, y, 44, 9, 0, 0, Math.PI * 2); c.stroke(); }
    label(c, 'ĐOẠN\nNGẬP', w / 2, h * 0.3, 20);
  }],
  // G7-9: ván gác hai đầu lên chỗ khô; bản rộng gần gấp đôi thân Mun. G7-18: ngắn còn 300 (đoạn ngập rộng ≈ 152).
  l7_plank: block(300, 56, PAL.wood, 'TẤM VÁN', { r: 8, size: 18, draw: (c, w, h) => {
    c.lineWidth = 2; c.strokeStyle = PAL.woodDark; c.beginPath(); c.moveTo(10, h * 0.5); c.lineTo(w - 10, h * 0.5); c.stroke();
  } }),
  // G7-9: cành gãy rất to: cao ≈ 2 lần Mun ngồi, nhiều nhánh lá rậm.
  l7_branch: [300, 420, 'đáy', (c, w, h) => {
    c.lineWidth = 22; c.strokeStyle = PAL.woodDark; c.lineCap = 'round';
    c.beginPath(); c.moveTo(w * 0.3, h - 10); c.lineTo(w * 0.55, h * 0.1);
    c.moveTo(w * 0.42, h * 0.55); c.lineTo(w * 0.12, h * 0.3); c.moveTo(w * 0.48, h * 0.4); c.lineTo(w * 0.88, h * 0.22);
    c.moveTo(w * 0.36, h * 0.75); c.lineTo(w * 0.85, h * 0.62); c.stroke();
    for (const [x, y, r] of [[0.55, 0.12, 60], [0.15, 0.3, 52], [0.85, 0.22, 54], [0.45, 0.38, 58], [0.85, 0.6, 50], [0.2, 0.62, 48], [0.6, 0.72, 46]]) el(c, w * x, h * y, r, r * 0.8, PAL.green);
    label(c, 'CÀNH GÃY\nRẤT TO', w / 2, h * 0.5, 20);
  }],
  // Trang trí thời tiết: lá bay, cành nhỏ rơi.
  l7_leaf: [30, 18, 'tâm', (c, w, h) => el(c, w / 2, h / 2, w / 2 - 2, h / 2 - 2, PAL.green, PAL.brown, 2)],
  l7_twig: [60, 14, 'tâm', (c, w, h) => { c.lineWidth = 5; c.strokeStyle = PAL.woodDark; c.lineCap = 'round';
    c.beginPath(); c.moveTo(4, h / 2); c.lineTo(w - 4, h / 2); c.moveTo(w * 0.6, h / 2); c.lineTo(w * 0.75, 2); c.stroke(); }],
  // Cảnh 2: gốc cây đầu sân (tán che), bàn có lỗ cắm ô, ô gập / ô bung, chó sợ sấm, thùng các-tông, xe đạp đổ.
  l7_tree_shop: [260, 760, 'đáy', (c, w, h) => {
    rr(c, w / 2 - 30, h * 0.3, 60, h * 0.7 - 2, PAL.woodDark, 10);
    el(c, w / 2, h * 0.2, w / 2 - 4, h * 0.19, PAL.green);
    label(c, 'GỐC CÂY\n(tán che)', w / 2, h * 0.62, 16, PAL.white);
  }],
  l7_shop_table: [200, 140, 'đáy', (c, w, h) => {
    c.lineWidth = 8; c.strokeStyle = '#d9d3c8'; c.lineCap = 'round';
    c.beginPath(); c.moveTo(30, 30); c.lineTo(20, h - 4); c.moveTo(w - 30, 30); c.lineTo(w - 20, h - 4); c.stroke();
    rr(c, 4, 10, w - 8, 30, '#f2efe8', 10); el(c, w / 2, 24, 10, 6, '#6b6f78', null);
    label(c, 'BÀN (lỗ cắm ô)', w / 2, h * 0.6, 14);
  }],
  l7_umbrella_closed: [300, 70, 'tâm', (c, w, h) => {
    c.beginPath(); c.moveTo(6, h / 2); c.lineTo(w * 0.75, 6); c.lineTo(w * 0.75, h - 6); c.closePath();
    c.fillStyle = '#e98a7a'; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    rr(c, w * 0.72, h / 2 - 6, w * 0.27, 12, '#6b6f78', 4);
    label(c, 'Ô GẬP', w * 0.42, h / 2, 15);
  }],
  // Ô bung: neo ở chân cán (cắm vào lỗ giữa bàn).
  l7_umbrella_open: [460, 400, 'đáy', (c, w, h) => {
    rr(c, w / 2 - 6, 60, 12, h - 62, '#6b6f78', 4);
    c.beginPath(); c.moveTo(6, 100); c.quadraticCurveTo(w / 2, -30, w - 6, 100);
    for (let x = w - 6; x > 6; x -= 76) c.quadraticCurveTo(x - 38, 124, x - 76, 100);
    c.closePath(); c.fillStyle = '#e98a7a'; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    label(c, 'Ô BUNG', w / 2, 62, 18);
  }],
  // G7-12: chó ngồi co ro, cao ≈ 1,6 lần Mun ngồi (≈ 340).
  l7_stray_dog_scared: [300, 340, 'đáy', (c, w, h) => {
    el(c, w * 0.5, h * 0.68, w * 0.44, h * 0.3, '#a89a8c'); el(c, w * 0.42, h * 0.32, w * 0.24, h * 0.2, '#a89a8c');
    el(c, w * 0.26, h * 0.2, 18, 30, '#8c7f72'); el(c, w * 0.58, h * 0.2, 18, 30, '#8c7f72');
    label(c, 'CHÓ LẠ\nsợ sấm', w * 0.5, h * 0.68, 18);
  }],
  l7_stray_dog_inbox: [110, 70, 'tâm', (c, w, h) => {
    el(c, w * 0.5, h * 0.5, w * 0.42, h * 0.4, '#a89a8c'); el(c, w * 0.88, h * 0.5, 8, 7, PAL.black, null);
    label(c, 'mũi chó', w / 2, h * 0.5, 12);
  }],
  // G7-15: thùng các-tông lúc đầu mở nắp, đặt ngửa (miệng hướng lên, như hộp của mèo ở L3).
  l7_box_carton_open: [380, 340, 'đáy', (c, w, h) => {
    rr(c, 20, 90, w - 40, h - 94, '#d6a472', 6);
    c.fillStyle = '#6e5038'; c.fillRect(34, 90, w - 68, 26);                  // miệng thùng nhìn từ trên
    for (const [x0, x1] of [[20, -10], [w - 20, w + 10]]) {                   // hai nắp mở bật sang hai bên
      c.beginPath(); c.moveTo(x0, 92); c.lineTo(x1 + (x0 < w / 2 ? 30 : -30), 20); c.lineTo(x0 + (x0 < w / 2 ? 70 : -70), 30); c.lineTo(x0 + (x0 < w / 2 ? 70 : -70), 92);
      c.closePath(); c.fillStyle = '#e2b885'; c.fill(); c.lineWidth = 3; c.strokeStyle = PAL.brown; c.stroke();
    }
    label(c, 'THÙNG MỞ\n(ngửa)', w / 2, h * 0.64, 17);
  }],
  // Thùng rất to nằm ngang (to hơn chó), miệng mở quay sang phải (về phía chó).
  l7_box_carton_side: [380, 360, 'đáy', (c, w, h) => {
    rr(c, 4, 10, w - 8, h - 14, '#d6a472', 6); rr(c, w * 0.5, 30, w * 0.44, h - 56, '#6e5038', 6);
    label(c, 'THÙNG\nnằm ngang', w * 0.26, h * 0.55, 17);
  }],
  // Phòng trong qua cửa sổ: ánh ti vi, sofa (nhân vật là khối riêng player_back_tv). Vẽ theo tỉ lệ khung.
  l7_window_inside: [400, 432, 'đáy', (c, w, h) => {
    c.fillStyle = '#f7e2b6'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.08, h * 0.3, w * 0.32, h * 0.26, '#3b3f55', 8); rr(c, w * 0.2, h * 0.56, w * 0.08, h * 0.12, '#6b4a3a', 2, null);
    rr(c, w * 0.42, h * 0.62, w * 0.52, h * 0.32, '#e9a99c', 18);
    label(c, 'TI VI', w * 0.24, h * 0.26, 16);
  }],
  player_back_tv: [144, 184, 'đáy', (c, w, h) => {
    rr(c, 10, h * 0.48, w - 20, h * 0.52, PAL.yellow, 40);
    el(c, w / 2, h * 0.3, 50, 56, '#6b4a3a');
    label(c, 'NHÂN VẬT\nquay lưng', w / 2, h * 0.76, 15);
  }],
  l7_window_closed: [400, 432, 'đáy', (c, w, h) => {
    c.fillStyle = 'rgba(205,228,246,0.42)'; c.fillRect(16, 16, w - 32, h - 42);
    c.lineWidth = 4; c.strokeStyle = 'rgba(255,255,255,0.8)';
    for (const x of [70, 300]) { c.beginPath(); c.moveTo(x, 60); c.lineTo(x + 80, 180); c.stroke(); }
    c.lineWidth = 16; c.strokeStyle = PAL.wood; c.strokeRect(10, 10, w - 20, h - 32); c.beginPath(); c.moveTo(w / 2, 10); c.lineTo(w / 2, h - 22); c.stroke();
    rr(c, 0, h - 28, w, 28, '#c58f5c', 6);
    label(c, 'CỬA SỔ ĐÓNG', w / 2, h * 0.86, 16);
  }],
  l7_window_open: [400, 432, 'đáy', (c, w, h) => {
    const pane = (x0, x1) => {
      c.beginPath(); c.moveTo(x0, 16); c.lineTo(x1, 50); c.lineTo(x1, h - 64); c.lineTo(x0, h - 28); c.closePath();
      c.fillStyle = 'rgba(205,228,246,0.6)'; c.fill(); c.lineWidth = 7; c.strokeStyle = PAL.wood; c.stroke();
    };
    pane(16, 90); pane(w - 16, w - 90);
    c.lineWidth = 16; c.strokeStyle = PAL.wood; c.strokeRect(10, 10, w - 20, h - 32);
    rr(c, 0, h - 28, w, 28, '#c58f5c', 6);
    label(c, 'CỬA SỔ MỞ', w / 2, h * 0.86, 16);
  }],
  l7_window_hook: [30, 44, 'đỉnh', (c, w, h) => {
    c.lineWidth = 5; c.strokeStyle = '#7d848c'; c.lineCap = 'round';
    c.beginPath(); c.moveTo(w / 2, 2); c.lineTo(w / 2, h * 0.55); c.arc(w / 2 + 7, h * 0.62, 7, Math.PI, 0, true); c.stroke();
  }],
  // G7-12: cửa chính cao ≈ 4 lần Mun ngồi. G7-18: thấp còn 2/3 (573), rộng ×1,15 (345).
  l7_front_door: block(345, 573, '#c58f5c', 'CỬA CHÍNH', { r: 10, size: 22, ly: 0.3, draw: (c, w, h) => {
    rr(c, 30, 40, w - 60, h * 0.4, '#b47c4b', 8); rr(c, 30, h * 0.5, w - 60, h * 0.44, '#b47c4b', 8);
    el(c, w - 46, h * 0.55, 12, 12, PAL.gold);
  } }),
};

export class Level7 extends RoomsLevel {
  constructor() { super('Level7'); }

  get levelNo() { return 7; }
  get fallbacks() { return FB; }
  get fallbackCanvas() { return true; }
  get roomBgs() { return ['l7_bg_house_front', 'l7_bg_shop_street', 'l7_bg_alley']; } // nền riêng L7 1366x2304 (vùng chơi ở 171, 384)
  get roomSlideMs() { return 800; }                          // Mun ra mép trái: khung trượt 0,8 giây
  // Cỡ Mun như L6 (dáng bay, đáp theo mun_step_down); mắt, mặt ló trong khe như L5 thu theo tỉ lệ. Khung chạy thứ 2 cùng cỡ mun_run.
  get fitHead() { return { mun_hop_down: 'mun_step_down', mun_land: 'mun_step_down', mun_run_b: 'mun_run', l5_bike_wheel: 'l5_bike' }; }
  get fitDefaults() {
    return { mun_run: 282, mun_pounce: 185, mun_step_down: 236, mun_peek_out: 94, mun_eyes_dark: 48, l5_cart: 536, l5_wind_chime: 60, l5_bike: BIKE_W, l5_awning_down: 540,
      l6_crate: 231, l6_toolbox: 213, // G7-27 (cửa sổ ×1,05 bỏ ở G7-29)
      l7_plank: 406 }; // ván dài như demo (dựa tường y 495–880, chéo ≈ 406)
  }
  get rewardFish() { return 50; }
  get suaHand() { return false; }
  get introCallLater() { return true; }                      // không có nhân vật gọi: bong bóng bật ra từ chỗ Mun
  get introLockMax() { return 12000; }
  get introBubbleAt() { return this.bubbleAt; }
  get litDepth() { return NIGHT + 0.1; }                      // ô sáng sáng trên lớp đêm
  get litHeldOnly() { return true; }                          // G7-19: ô sáng chỉ hiện khi đang cầm món / lúc gợi ý
  // Cảnh bế chung: Mun ướt trên khăn (chưa có ảnh thì mun_held + khăn khối, startEnding).
  get heldKey() { return this.realKey('mun_held_towel') ? 'mun_held_towel' : 'mun_held'; }

  resetLevel() {
    Object.assign(this, { room: S1, moving: false, placed: {}, slotUsed: {}, winArrow: null, rainPawT: null, tinTw: null, inCart: true, dogIn: false, windowOpen: false, waitWhy: null,
      chimeHung: false, onSill: false, homeRun: false, sillLoop: null, scared: false,
      bubbleAt: null, endTowel: null, endLip: null, chimeSway: null, drops: [] });
  }

  realKey(k) { return !!(this.A.entries[k] || {}).real && this.has(k); }

  // G7-27: nền cảnh 3 dịch lên 4. Ô văng trên cửa sổ là một phần nền: cắt đúng dải ô văng (x 30–590, y 232–288 vùng chơi, cả mép tường
  // trên/dưới) đè lên nền, cao hơn OVANG_UP; mép viền cũ phía dưới bị dải tường kèm theo che.
  shiftHouseBg() {
    const rb = this.roomBg && this.roomBg[S3];
    if (!rb) return;
    rb.b.y += S3_DY;
    if (!this.realKey('l7_bg_house_front') || rb.b.displayWidth < 1300) return; // nền khối tạm: không cắt
    const tex = this.textures.get('l7_bg_house_front');
    if (!tex.has('ovang')) tex.add('ovang', 0, 171 + 30, 384 + 232, 560, 56);
    this.add.image(...at(S3, 30, 232 + S3_DY - OVANG_UP), 'l7_bg_house_front', 'ovang').setOrigin(0).setDepth(D.bg + 0.02);
  }

  // Nền rộng 1366 chờm sang phòng bên 171 px mỗi phía: nền phòng đang đứng (cả lúc trượt tới) nằm trên nền phòng bên.
  bgFront(r) {
    (this.roomBg || []).forEach((k, i) => {
      const d = D.bg + (i === r ? 0.01 : 0);
      for (const p of [k.b, k.top, k.bottom, k.left, k.right, k.tl, k.tr, k.bl, k.br]) if (p) p.setDepth(d);
    });
  }

  goRoom(r) {
    const from = this.room;
    super.goRoom(r);
    if (this.room !== from) this.bgFront(this.room);
  }

  // ---------- dựng cảnh ----------
  buildRoom() {
    this.buildRoomBgs();
    this.bgFront(this.room);
    this.shiftHouseBg();
    const A1 = (k) => at(S1, ...C1[k]), A2 = (k) => at(S2, ...C2[k]), A3 = (k) => at(S3, ...C3[k]), Y = (y) => this.yDepth(y);
    const item = (p) => this.itemTap(p);
    this.addProps([
      // Cảnh 1 – góc hẻm
      { name: 'flood', key: 'l7_flood_strip', at: A1('flood'), depth: 9, tap: () => this.floodTap() },
      { name: 'cart', key: 'l5_cart', at: A1('cart'), depth: Y(1110), zone: false },
      { name: 'tin', key: 'l5_awning_down', at: A1('tinFall'), depth: Y(1110) + 0.05, zone: D.zone + 2, tap: () => this.tinTap() },
      { name: 'branch', key: 'l7_branch', at: A1('branch'), depth: Y(1285), zone: D.zone + 5, tap: () => this.branchTap('branch') },
      ...['brA', 'brB'].map((name) => ({ name, key: 'l7_branch', at: A1(name), depth: Y(C1[name][1]), zone: D.zone + 5, tap: () => this.branchTap(name) })),
      { name: 'plank', key: 'l7_plank', at: A1('plankHome'), depth: Y(880), zone: D.zone + 5, tap: item },
      // Cảnh 2 – trước quán nước
      { name: 'tree', key: 'l7_tree_shop', at: A2('tree'), depth: Y(1100) - 0.1, /* G7-23: dưới lớp Mun ở mọi chỗ chờ */ tap: 'wiggle', wiggle: [1, 2, 260], sfx: 'sfx_leaves' },
      { name: 'table', key: 'l7_shop_table', at: A2('table'), depth: Y(1075), tap: () => this.tableTap() },
      { name: 'umbrella', key: 'l7_umbrella_closed', at: A2('umbrellaHome'), depth: Y(1185), zone: D.zone + 5, tap: item },
      { name: 'dog', key: 'l7_stray_dog_scared', at: A2('dog'), depth: Y(1065), zone: D.zone + 2, tap: () => this.dogTap() },
      { name: 'box', key: 'l7_box_carton_open', at: A2('boxHome'), depth: Y(875), zone: D.zone + 5, tap: item },
      { name: 'bike', key: 'l5_bike', at: A2('bikeFallen'), depth: Y(1150), zone: D.zone + 5, tap: item },
      // Cảnh 3 – trước nhà nhân vật
      { name: 'inside', key: 'l7_window_inside', at: A3('window'), depth: 3, zone: false },
      { name: 'tvPlayer', key: 'player_back_tv', at: A3('tvPlayer'), depth: 3.2, zone: false },
      // Cửa sổ còn đóng: vùng chạm trên Mun ở bậu (Mun ngồi che một phần kính); mở rồi thì xuống dưới (chạm Mun, ti vi).
      { name: 'window', key: 'l7_window_closed', at: A3('window'), depth: 4, zone: D.zone + 4, tap: () => this.windowTap() },
      { name: 'hook', key: 'l7_window_hook', at: A3('hook'), depth: 4.2, zone: false },
      { name: 'chimeNail', key: 'l7_window_hook', at: A3('chimeNail'), depth: 4.2, zone: false }, // G7-20: đinh treo tạm cạnh cửa chính
      { name: 'door', key: 'l7_front_door', at: A3('door'), depth: 5, tap: () => this.doorTap() },
      { name: 'crate', key: 'l6_crate', at: A3('crateHome'), depth: Y(1248), zone: D.zone + 5, tap: item },
      { name: 'toolbox', key: 'l6_toolbox', at: A3('toolboxHome'), depth: Y(1228), zone: D.zone + 5, tap: () => this.toolboxTap() },
    ]);
    this.plank.setAngle(PLANK_LEAN);
    this.tinPose(C1.tinFall);
    this.zoneTo('tin', this.tin);
    for (const n of ['brA', 'brB']) this[n].setAngle(C1[n][2]);
    this.bike.setAngle(BIKE_LEAN); // G7-20: xe đổ dựng dọc nghiêng, không ép dẹt
    this.wheel = this.img('l5_bike_wheel', ...A2('bikeFallen'), this.bike.depth + 0.01);
    this.syncWheel();
    for (const n of ['plank', 'brA', 'brB', 'bike']) this.zoneTo(n, this[n]);
    // G7-20: chuông gió treo sẵn cạnh góc trên trái cửa chính, gió quật đung đưa kêu khẽ; kéo vào móc giữa cửa sổ.
    this.chime = this.img('l5_wind_chime', ...A3('chimeStart'), 4.3);
    this.zone('chime', this.artRect(this.chime), D.zone + 6);
    this.time.addEvent({ delay: CHIME_GUST, loop: true, callback: () => this.chimeGust() });
    const [sx0, sy0, sx1, sy1] = C2.shutter, [zx] = at(S2, sx0, 0);
    this.zone('shutter', new Phaser.Geom.Rectangle(zx, sy0, sx1 - sx0, sy1 - sy0), D.zone); // ✨ cửa cuốn (vẽ trong nền)
    this.tvWindow();

    // Chỗ đặt (vị trí sprite) và ô sáng (hình món ở tư thế đặt: cành chạc dựng dưới mép tôn, ô đã bung trên bàn, xe đứng).
    this.SPOT = { tin: A1('tinCart'), plank: A1('plank'), branch: A1('branchSpot'), brA: A1('brASpot'), brB: A1('brBSpot'),
      umbrella: A2('umbrella'), box: A2('box'), bike: A2('bike'), crate: A3('crate'), toolbox: A3('toolbox'), chime: A3('chime') };
    const LOOK = { tin: { angle: C1.tinCart[2] }, plank: { angle: 0 }, branch: { angle: C1.branchSpot[2] }, brA: { angle: C1.brASpot[2] },
      brB: { angle: C1.brBSpot[2] }, umbrella: { key: 'l7_umbrella_open' }, box: { key: 'l7_box_carton_side' }, bike: { key: 'l5_bike' } };
    for (const id of Object.keys(this.SPOT)) this.litSlot(id, id, this.SPOT[id], LOOK[id]);
    const SFX = { tin: 'l7_sfx_tin_rattle', plank: 'l7_sfx_wood_wet', branch: 'l7_sfx_leaves_drag', brA: 'l7_sfx_leaves_drag', brB: 'l7_sfx_leaves_drag',
      umbrella: 'l7_sfx_umbrella_open',
      box: 'l7_sfx_box', bike: 'l7_sfx_bike_stand', crate: 'l6_sfx_wood_clack', toolbox: 'l6_sfx_wood_clack', chime: 'l5_sfx_chime' };
    // Vùng khớp riêng: ô (cả bàn + phía trên, G7-15), chuông (quanh móc giữa cửa sổ).
    const AREA = { umbrella: () => this.umbrellaArea(), chime: () => this.hookArea(), tin: () => this.cartArea() };
    // Dáng lúc kéo: ván, thang dựng thẳng; cành nhỏ thẳng ngang; chuông về dáng treo (G7-17).
    const DRAG_LOOK = { plank: { angle: 0 }, tin: { angle: C1.tinCart[2] }, chime: { angle: 0 } };
    for (const name of Object.keys(SFX)) {
      this.sceneDraggable(name, { lit: true, sfx: SFX[name],
        spots: () => (this.placed[name] ? [] : BRANCHES.includes(name) ? this.freeBranchSlots().map((id) => ({ id, at: this.SPOT[id] }))
          : [{ id: name, at: this.SPOT[name], area: AREA[name] && AREA[name]() }]),
        look: DRAG_LOOK[name],
        litIds: BRANCHES.includes(name) ? (spots) => spots.slice(0, 1).map((o) => o.id) : undefined, // G7-23: cành chỉ sáng 1 ô trống kế tiếp
        swipe: name === 'bike' ? BIKE_SWIPE : undefined, snap: name === 'bike' ? BIKE_SNAP : 110,
        when: () => !this.placed[name],
        place: (spot) => this.itemPlaced(name, spot) });
    }

    // Mun: đôi mắt trong khe (mở màn), thân (ẩn tới lúc bò ra).
    this.eyes = this.img('mun_eyes_dark', ...A1('eyes'), this.tin.depth + 0.01).setVisible(false);
    this.mun = this.img('mun_run', 0, 0, 20).setVisible(false);
    for (const s of [this.cart, this.tin, this.bike, this.wheel, this.crate, this.toolbox, this.chime, this.eyes, this.mun]) s.setTint(REUSE_TINT);
    this.zone('mun', this.artRect(this.mun), D.zone + 3).disableInteractive();
    this.player = this.img('player_call', 0, 0, D.player).setVisible(false); // màn không có nhân vật gọi (giữ cho phần chung)
    this.buildTrail();
    this.buildGround();
    this.buildWeather();
    this.time.addEvent({ delay: 380, loop: true, callback: () => this.munDrip() });
    this.time.addEvent({ delay: 3600, loop: true, callback: () => this.munShiver() });
  }

  // G7-15: vùng khớp ô = cả cái bàn và phần ngay trên bàn (thả trong vùng là ô tự hút vào lỗ).
  umbrellaArea() {
    const r = this.artRect(this.table);
    return new Phaser.Geom.Rectangle(r.x - 30, r.y - UMBRELLA_ABOVE, r.width + 60, r.height + UMBRELLA_ABOVE + 20);
  }

  // Bong bóng nhiệm vụ (G7-15, G7-17): chỉ khuôn mặt nhân vật (player_face_icon; chưa có ảnh thì cắt phần đầu của player_call).
  buildUI() {
    super.buildUI();
    const B = this.bubble;
    for (const o of [B.dark, B.face, B.q, B.heart]) o.setVisible(false);
    let mk = 'player_face_icon', fr = this.iconFrame(mk);
    if (!this.realKey(mk)) {
      mk = 'player_call';
      const t = this.textures.get(mk), src = t.getSourceImage(), W = src.width, H = src.height;
      if (!t.has('face')) t.add('face', 0, Math.round(W * 0.11), Math.round(H * 0.005), Math.round(W * 0.82), Math.round(H * 0.36));
      fr = 'face';
    }
    const mem = this.add.image(0, 0, mk, fr).setOrigin(0.5);
    mem.setScale(Math.min(180 / mem.width, 165 / mem.height));
    B.ct.add(mem);
  }

  // G7-17: bong bóng mở màn nhỏ ≈ 70% (thu về góc vẫn cỡ cũ).
  get bubblePop() { return { peak: 0.8, up: 230, rest: 0.7, down: 120 }; }

  // Ti vi nhấp nháy sau kính (phòng trong, nhân vật vừa trong khung cửa sổ). Vị trí màn ti vi theo tỉ lệ khối l7_window_inside.
  tvWindow() {
    const r = this.artRect(this.inside);
    this.tvGlow = this.add.rectangle(r.x + r.width * 0.1, r.y + r.height * 0.32, r.width * 0.28, r.height * 0.22, 0xbfe6ff, 0.75)
      .setOrigin(0, 0).setDepth(3.1);
    this.windowMask();
    this.tvColors = [0xbfe6ff, 0xf8c6cc, 0xfce39a, 0xb9ddbe];
    this.time.addEvent({ delay: 520, loop: true, callback: () => {
      if (Math.random() < 0.6) this.tvGlow.setFillStyle(Phaser.Utils.Array.GetRandom(this.tvColors), 0.55 + Math.random() * 0.3);
    } });
  }

  // ---------- lớp trước sau ----------
  yDepth(y) { return 5 + y / 100; }
  ySort(s, off = 0) { return s.setDepth(this.yDepth(s.y) + off); }

  // ---------- đêm mưa bão: lớp đêm, mưa, chớp + tia sét xa + sấm, lá bay, cành nhỏ rơi ----------
  buildWeather() {
    // G7-4: nền hẻm L5 vẽ ban ngày: thêm lớp đêm riêng cảnh 1 ngay trên nền (dưới đồ vật): trời hạ sâu hơn, tường hạ nhẹ.
    // Chỉ khi cảnh 1 còn dùng l5_bg_alley; nền hẻm đêm riêng của L7 (vẽ sẵn tông đêm) thì không phủ.
    if (this.roomBgs[S1] === 'l5_bg_alley') {
      const [ax] = at(S1, -260, 0);
      this.add.rectangle(ax, -600, 1544, 2400, ...ALLEY_TINT).setOrigin(0).setDepth(D.bg + 0.5);
      this.add.rectangle(ax, -600, 1544, 600 + ALLEY_SKY_Y, ...ALLEY_SKY).setOrigin(0).setDepth(D.bg + 0.6);
    }
    this.flash = this.add.rectangle(0, 0, 8, 8, 0xffffff).setOrigin(0).setScrollFactor(0).setDepth(NIGHT + 0.05).setAlpha(0);
    this.boltG = this.add.graphics().setScrollFactor(0).setDepth(NIGHT + 0.06);
    this.rainG = this.add.graphics().setScrollFactor(0).setDepth(NIGHT + 0.2);
    this.yardG = this.add.graphics().setDepth(NIGHT + 0.15);
    this.drops = Array.from({ length: 150 }, () => ({ x: Math.random() * 1400, y: Math.random() * 2400, l: 26 + Math.random() * 22, v: 1.3 + Math.random() * 0.6 }));
    const next = () => this.time.delayedCall(Phaser.Math.Between(9000, 15000), () => { this.lightning(); next(); });
    next();
    this.time.addEvent({ delay: 325, loop: true, callback: () => this.leafFly() }); // G7-16: dày gấp đôi (650 → 325)
    this.time.addEvent({ delay: 260, loop: true, callback: () => this.puddleRipple() });
    this.time.addEvent({ delay: 3800, loop: true, callback: () => this.twigFall() });
  }

  layout() {
    super.layout();
    for (const r of [this.flash]) if (r) r.setSize(this.scale.width, this.scale.height);
  }

  rainStep(dt) {
    const W = this.scale.width, H = this.scale.height, g = this.rainG.clear();
    g.lineStyle(3, 0xeef3ff, 0.45);
    for (const d of this.drops) {
      d.y += d.v * dt; d.x -= d.v * dt * 0.18;
      if (d.y > H + 40) { d.y = -60 - Math.random() * 200; d.x = Math.random() * (W + 200); }
      if (d.x < -40) d.x += W + 80;
      g.lineBetween(d.x, d.y, d.x + d.l * 0.18, d.y - d.l);
    }
  }

  // G7-9: sân quán không mái: mưa xối dày (vùng x 430–760) tới khi cắm ô; ô bung thì vùng dưới ô hết mưa xối.
  // G7-17: hạt mảnh, dài ngắn, đậm nhạt khác nhau, nghiêng theo gió, vị trí ngẫu nhiên; chạm nền (độ sâu ngẫu nhiên) thì một nửa số hạt
  // bắn tung toé 2 tia nhỏ + gợn nước elip loang. Một lớp graphics, ≈ 64 nét + ≈ 20 vệt bắn mỗi khung.
  yardRain(dt) {
    const g = this.yardG.clear();
    if (this.placed.umbrella || this.room !== S2) return;
    const Y = YARD, [x0, x1] = C2.rain, rnd = Phaser.Math.FloatBetween;
    const reset = (d, first) => {
      d.gy = rnd(...Y.ground); d.l = rnd(16, 50); d.v = rnd(1.4, 2.0); d.a = rnd(0.22, 0.65); d.w = rnd(1.1, 2.3);
      d.y = first ? rnd(Y.top - 200, d.gy) : Y.top - rnd(0, 220);
      d.x = at(S2, rnd(x0, x1), 0)[0] + (d.gy - d.y) * Y.wind; // gió thổi sang trái: xuất phát lệch phải để rơi đúng vùng mưa
      return d;
    };
    if (!this.yardDrops) { this.yardDrops = Array.from({ length: Y.n }, () => reset({}, true)); this.splashes = []; }
    for (const d of this.yardDrops) {
      d.y += d.v * dt; d.x -= d.v * dt * Y.wind;
      if (d.y >= d.gy) {
        if (Math.random() < 0.5) this.splashes.push({ x: d.x, y: d.gy, t: 0, s: rnd(0.7, 1.2), dx: [rnd(-14, -4), rnd(4, 14)], h: [rnd(8, 18), rnd(8, 18)] });
        reset(d);
      }
      g.lineStyle(d.w, 0xf4f8ff, d.a).lineBetween(d.x, d.y, d.x + d.l * Y.wind, d.y - d.l);
    }
    this.splashes = this.splashes.filter((p) => {
      p.t += dt;
      const k = p.t / Y.splash;
      if (k >= 1) return false;
      g.lineStyle(1.4, 0xeef6ff, 0.5 * (1 - k)).strokeEllipse(p.x, p.y, (10 + 30 * k) * p.s, (4 + 9 * k) * p.s);
      if (k < 0.7) for (let j = 0; j < 2; j++) {
        g.fillStyle(0xf4f8ff, 0.75 * (1 - k)).fillCircle(p.x + p.dx[j] * k * 1.6, p.y - Math.sin(k / 0.7 * Math.PI) * p.h[j] * p.s, 1.7);
      }
      return true;
    });
  }

  // Chớp nhẹ (không gắt) + tia sét xa trên trời, sấm rền sau nửa giây. Chó lạ (cảnh 2) sợ sấm: run bần bật, ư ử, rúc đầu.
  lightning(big = false) {
    if (this.phase === 'ending' || this.phase === 'reward') return;
    this.tweens.chain({ targets: this.flash, tweens: [
      { alpha: big ? 0.3 : 0.2, duration: 60 }, { alpha: 0.04, duration: 70 }, { alpha: big ? 0.22 : 0.14, duration: 50 }, { alpha: 0, duration: 140 },
    ] });
    this.bolt();
    this.time.delayedCall(big ? 250 : 550, () => {
      this.sfx('l7_sfx_thunder', big ? 1 : 0.7);
      this.time.delayedCall(450, () => this.sfx('l7_sfx_thunder', 0.4));
      this.dogFear();
    });
  }

  bolt() {
    const W = this.scale.width, g = this.boltG.clear().setAlpha(1);
    let x = Phaser.Math.Between(W * 0.15, W * 0.85), y = this.Y0 * 0.2 + 20;
    const pts = [[x, y]];
    for (let i = 0; i < 6; i++) { x += Phaser.Math.Between(-40, 40); y += Phaser.Math.Between(35, 60); pts.push([x, y]); }
    g.lineStyle(6, 0xfffbe8, 0.9);
    g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.strokePath();
    this.tweens.add({ targets: g, alpha: 0, duration: 260, delay: 80 });
  }

  // G7-16: vũng nước và cành gãy nằm trên nền (dưới mọi đồ vật), không nhận chạm.
  buildGround() {
    this.puddles = [];
    PUDDLES.forEach((list, room) => list.forEach(([x, y, k = 1]) => {
      const p = this.img('l7_puddle', ...at(room, x, y), 8.5);
      this.puddles.push(p.setScale(p.base * k, (p.baseY || p.base) * k));
    }));
    DEBRIS.forEach((list, room) => list.forEach(([x, y, a]) => this.img('l7_branch_debris', ...at(room, x, y), 8.6).setAngle(a)));
  }

  // Mưa rơi xuống vũng: gợn vòng loang ra rồi tan (vũng ở cảnh đang đứng; sân quán có ô thì vẫn gợn ở vũng ngoài ô).
  puddleRipple() {
    if (this.phase === 'ending' || this.phase === 'reward' || !this.puddles) return;
    const x0 = this.camX - 40, x1 = x0 + this.scale.width + 80, list = this.puddles.filter((p) => p.x > x0 && p.x < x1);
    const p = list.length && Phaser.Utils.Array.GetRandom(list);
    if (!p) return;
    const r = this.artRect(p), x = Phaser.Math.Between(r.x + r.width * 0.2, r.right - r.width * 0.2), y = r.centerY + Phaser.Math.Between(-4, 4);
    // Dùng lại vòng gợn có sẵn (tối đa RIPPLES cùng lúc), không tạo đối tượng mới.
    this.ripples = this.ripples || Array.from({ length: RIPPLES }, () => this.add.ellipse(0, 0, 16, 6).setStrokeStyle(2, 0xeef6ff, 0.8).setDepth(8.55).setVisible(false));
    const ring = this.ripples.find((o) => !o.visible);
    if (!ring) return;
    ring.setPosition(x, y).setScale(1).setAlpha(1).setVisible(true);
    this.tweens.add({ targets: ring, scaleX: 3.2, scaleY: 3.2, alpha: 0, duration: 650, ease: 'Quad.out', onComplete: () => ring.setVisible(false) });
  }

  // Lá bay ngang qua màn (trang trí).
  leafFly() {
    if (this.phase === 'ending' || this.phase === 'reward') return;
    const W = this.scale.width, H = this.scale.height, y = Phaser.Math.Between(H * 0.15, H * 0.6);
    this.leaves = this.leaves || Array.from({ length: LEAVES }, () => this.add.image(0, 0, 'l7_leaf').setScrollFactor(0).setDepth(NIGHT + 0.15).setVisible(false));
    const l = this.leaves.find((o) => !o.visible);
    if (!l) return;
    l.setPosition(-30, y).setAngle(Phaser.Math.Between(0, 360)).setVisible(true);
    this.tweens.add({ targets: l, x: W + 40, y: y + Phaser.Math.Between(-60, 120), angle: l.angle + 540, duration: Phaser.Math.Between(1800, 2800),
      onComplete: () => l.setVisible(false) });
  }

  // Cành nhỏ rơi lác đác, rơi xa Mun, không chặn đường (trang trí).
  twigFall() {
    if (this.phase === 'ending' || this.phase === 'reward' || Math.random() < 0.4) return;
    const W = this.scale.width, H = this.scale.height, mx = this.mun.visible ? this.mun.x - this.camX : W / 2;
    let x = Phaser.Math.Between(60, W - 60);
    if (Math.abs(x - mx) < 300) x = mx < W / 2 ? Math.min(W - 60, mx + 320) : Math.max(60, mx - 320);
    const t = this.add.image(x, -20, 'l7_twig').setScrollFactor(0).setDepth(NIGHT + 0.15);
    this.tweens.add({ targets: t, y: H * 0.72, angle: Phaser.Math.Between(-200, 200), duration: 1100, ease: 'Quad.in', onComplete: () =>
      this.tweens.add({ targets: t, alpha: 0, duration: 500, delay: 300, onComplete: () => t.destroy() }) });
  }

  // ---------- Mun đi theo chặng (trail.js) ----------
  buildTrail() {
    const A1 = (k) => at(S1, ...C1[k]), A2 = (k) => at(S2, ...C2[k]), A3 = (k) => at(S3, ...C3[k]), P = this.placed;
    this.trail = new Trail([
      // Cảnh 1: cành chạc đỡ tôn → bò ra dưới mái che, tới mép đoạn ngập; ván → đi trên ván tới trước cành cây; cành ra bãi trống → ra mép trái.
      { to: null, open: () => P.tin, cross: (done) => this.crawlOut(done) },
      { to: A1('wait1'), open: () => P.plank, wait: () => this.munWait('flood'), cross: (done) => this.crossPlank(done) },
      { to: null, open: () => P.branch && P.brA && P.brB, cross: (done) => this.leave(A1('exit'), S2, done) },
      // Cảnh 2: dưới gốc cây (sân mưa xối) → cắm ô thì chạy dưới ô vào hiên; chó sợ sấm chắn lối → thùng làm hang, chó chui vào thì
      // rón rén qua; xe đạp đổ chắn lối ra → dựng xe lên thì ra mép trái.
      { to: A2('wait3'), open: () => P.umbrella, wait: () => this.munWait('rain'), cross: (done) => this.walkTo(A2('wait4'), done) },
      { to: null, open: () => this.dogIn, wait: () => this.munWait('dog'), cross: (done) => { this.scared = false; this.walkTo(A2('wait5'), done); } }, // G7-25: chạy 2 khung như cảnh 1 (bỏ rón rén)
      { to: null, open: () => P.bike, cross: (done) => this.leave(A2('exit'), S3, done) },
      // Cảnh 3: (lần đầu nhảy thử bậu, tuột) đủ 2 bậc cạnh nhau → hộp bé → thùng gỗ → bậu cửa sổ.
      // G7-16: đủ 2 bậc mà chuông chưa treo vào móc: Mun ngồi chờ dưới chân bậc (G7-20: bỏ khều chuông trên nắp).
      // G7-27: tới chỗ chờ thì ngồi chờ (bỏ nhảy thử tuột); đủ 2 bậc là lên bậu, không cần chuông (chuông chỉ cần cho đoạn về nhà).
      { id: 'steps', to: A3('wait5'), open: () => P.crate && P.toolbox, wait: () => this.munWait(), cross: (done) => this.climbSill(done) },
    ], { walk: (to, done) => this.walkTo(to, done), wait: () => this.munWait(), done: () => this.reachSill() });
  }

  // Đổi dáng Mun (ảnh Art có thì dùng, chưa có thì dáng cũ gần nhất), left: quay trái (bỏ trống: giữ hướng).
  munPose(key, fallback, left) {
    const m = this.mun, k = this.realKey(key) ? key : fallback;
    if (left === undefined) left = m.faceLeft;
    this.applyKey(m, k);
    this.face(m, !!left);
    // Dáng bay neo tâm ảnh: đặt neo ở đáy phần vẽ (vị trí sprite vẫn là chỗ chân), như L6.
    if (k === 'mun_hop_down') { const fr = this.textures.get(k).get(this.iconFrame(k)); m.setOrigin(m.originX, (fr.cutY + fr.cutHeight) / m.height); }
    return m;
  }

  // Mun di chuyển tới (x, y) trong ms (arc: nhảy vồng). G7-7: giữ nguyên hướng mặt (Mun luôn quay trái khi đi), kể cả lúc lùi,
  // trượt, nhích ngang; không dùng moveTo chung vì moveTo tự quay mặt theo hướng đi.
  munMove([x, y], ms, { ease = 'Linear', arc = 0, onUpdate, onComplete } = {}) {
    const m = this.mun, x0 = m.x, y0 = m.y;
    return this.tweens.addCounter({ from: 0, to: 1, duration: ms, ease, onUpdate: (tw) => {
      const k = tw.getValue();
      m.setPosition(x0 + (x - x0) * k, y0 + (y - y0) * k - arc * Math.sin(Math.PI * k));
      if (onUpdate) onUpdate();
    }, onComplete });
  }

  // Chạy tới (x, y): 2 khung chạy xen kẽ 0,12 giây (G7-9), nhún nhẹ theo bước, lớp theo chân. Chưa có mun_run_b: khung 2 là mun_run
  // nén thấp, nghiêng nhẹ (khác nhịp). depth: lớp cố định (chạy trên sàn xe), bỏ trống thì theo chân.
  walkTo([x, y], done, depth) {
    const m = this.mun, dist = Math.hypot(x - m.x, y - m.y);
    if (depth === undefined) depth = this.munS1Depth();
    if (dist < 2) { done(); return; }
    m.setAngle(0);
    this.munPose('mun_run', 'mun_run', true);
    m.runF = 0;
    this.munMove([x, y], dist / WALK, { onUpdate: () => {
      const f = this.runFrame();
      if (depth === undefined) this.ySort(m, 0.05); else m.setDepth(depth); // G7-26: lớp theo chân (trước lúc nhún), nhún không tụt lớp
      m.y -= f ? 0 : 6;                                // nhún theo bước
    }, onComplete: () => { m.setScale(m.base, m.baseY).setAngle(0); done(); } });
  }

  // G7-29: lớp Mun ở cảnh 1 từ lúc ló ra khỏi gầm tới mép trái (trên xe và mái, dưới đống cành); nơi khác: theo chân.
  munS1Depth() { return this.room === S1 && !this.inCart ? this.cart.depth + MUN_OVER_CART : undefined; }

  // Khung chạy luân phiên mun_run / mun_run_b mỗi RUN_FRAME (G7-9, G7-23); chưa có mun_run_b: khung 2 là mun_run nén thấp, nghiêng nhẹ.
  runFrame() {
    const m = this.mun, f = Math.floor(this.time.now / RUN_FRAME) % 2;
    if (f !== m.runF) {
      m.runF = f;
      if (this.realKey('mun_run_b')) this.munPose(f ? 'mun_run_b' : 'mun_run', 'mun_run', true);
      else m.setScale(m.base, m.baseY * (f ? 0.93 : 1)).setAngle(f ? -2 : 0);
    }
    return f;
  }

  // Nhảy tới (x, y): dáng bay (lên cao: dáng vồ), đáp mun_land; depth: lớp sau khi đáp (bỏ trống: theo chân).
  hopTo2([x, y], { up = false, arc = 60, ms = 460, depth } = {}, done) {
    const m = this.mun;
    m.setAngle(0).setDepth(D.player - 1);
    this.munPose(up && this.realKey('mun_pounce') ? 'mun_pounce' : 'mun_hop_down', 'mun_step_down', true);
    this.sfx('sfx_whoosh', 0.35);
    this.munMove([x, y], ms, { ease: 'Sine.inOut', arc, onComplete: () => this.munLand(() => {
      if (depth === undefined) this.ySort(m, 0.05); else m.setDepth(depth);
      done();
    }) });
  }

  munLand(done) {
    const m = this.mun;
    this.munPose('mun_land', m.key, true);
    this.sfx('l4_sfx_land_tap', 0.6);
    this.tweens.add({ targets: m, scaleY: m.baseY * 0.9, scaleX: m.base * 1.05, duration: 75, yoyo: true, ease: 'Quad.out',
      onComplete: () => { m.setScale(m.base, m.baseY); done(); } });
  }

  // Ngồi chờ trên nền khô trước chướng ngại: ướt, run (munShiver), quay về phía nhà (trái).
  // why: 'flood' thò chân chạm dòng nước rồi rụt lại; 'rain' thò chân bị mưa xối quất, rụt lại (lặp); 'dog' lông dựng, run nhìn chó.
  munWait(why) {
    if (this.inCart) return;
    const m = this.mun;
    this.munPose('mun_sit_wet', 'mun_sit_look', true);
    this.waitWhy = why || null;
    this.scared = why === 'dog';
    if (why === 'flood') this.pawOut(why);
    else if (why === 'rain') this.rainPaw();
    if (why === 'dog') this.tweens.add({ targets: m, scaleY: m.baseY * 1.06, duration: 120, yoyo: true, repeat: 2 });
  }

  // G7-35: dưới gốc cây: ngồi nhìn mưa (mun_sit_wet) RAIN_LOOK ms rồi mới thò chân khều mưa; mỗi lần lặp đều ngồi nhìn xen giữa.
  rainPaw() {
    if (this.rainPawT) return;
    this.munPose('mun_sit_wet', 'mun_sit_look', true);
    this.rainPawT = this.time.delayedCall(RAIN_LOOK, () => {
      this.rainPawT = null;
      if (this.trail.state === 'wait' && this.waitWhy === 'rain' && !this.busy.mun) this.pawOut('rain');
    });
  }

  // Thò chân ra (nhích về phía chướng ngại), bị nước / mưa quất, rụt lại.
  pawOut(why) {
    const m = this.mun, x = m.x;
    if (why === 'rain') this.munPose('mun_paw_rain', 'mun_sit_look', true);
    this.tweens.add({ targets: m, x: x - 18, duration: 200, yoyo: true, hold: 150, onComplete: () => {
      if (why === 'rain') this.munPose('mun_sit_wet', 'mun_sit_look', true);
    } });
    this.time.delayedCall(250, () => {
      const r = this.artRect(m);
      if (why === 'flood') this.splashAt(this.artRect(this.flood).right - 12, m.y, m.depth);
      else for (let i = 0; i < 5; i++) this.drop(r.x + 10, r.y + r.height * 0.6, { dx: Phaser.Math.Between(10, 40), dy: Phaser.Math.Between(-20, 20), r: 5 });
    });
  }

  // Chổi chống tôn: mắt tắt, Mun ló mặt ra khỏi khe, giũ nước, đi tiếp.
  crawlOut(done) {
    const m = this.mun;
    this.inCart = false;
    this.tweens.killTweensOf(this.eyes);
    this.eyes.setVisible(false);
    this.applyKey(m, 'mun_peek_out');
    this.face(m, true).setPosition(...at(S1, ...C1.peek)).setVisible(true).setDepth(this.munS1Depth()); // G7-29: ló ra trên lớp xe, mái
    if (this.realKey('mun_peek_out')) { // G7-37: đặt sao cho mắt trên mặt trùng tâm đôi mắt trong gầm (tính cả lật trái)
      m.setScale(m.base);
      const ex = (m.flipX ? m.width - PEEK_EYE[0] : PEEK_EYE[0]) - m.displayOriginX, ey = PEEK_EYE[1] - m.displayOriginY, [tx, ty] = at(S1, ...C1.eyes);
      m.setPosition(tx - ex * m.scaleX, ty - ey * m.scaleY);
    }
    m.setScale(m.base * 0.6);
    this.sfx('mun_sfx_meow', 0.4);
    this.tweens.add({ targets: m, scale: m.base, duration: 350, ease: 'Back.out', onComplete: () => {
      this.time.delayedCall(250, () => {
        this.munPose('mun_sit_wet', 'mun_sit_look', true);
        m.setDepth(this.munS1Depth()); // G7-29: không ySort (y 1105 < đáy xe 1110 sẽ tụt sau xe)
        this.munShake(() => done());
      });
    } });
  }

  // Giũ nước: lắc nhanh, nước văng.
  munShake(done) {
    const m = this.mun, r = this.artRect(m);
    this.sfx('sfx_cloth', 0.6);
    for (let i = 0; i < 8; i++) this.drop(r.centerX, r.centerY, { dx: Phaser.Math.Between(-90, 90), dy: Phaser.Math.Between(-60, 20), r: 5 });
    this.tweens.add({ targets: m, angle: { from: -7, to: 7 }, duration: 60, yoyo: true, repeat: 3, onComplete: () => { m.setAngle(0); done && done(); } });
  }

  // Trên ván: bước lên đầu phải, chạy thẳng sang trái (mặt luôn hướng trái), bước xuống chỗ khô bên kia, dừng trước cành cây ~40px.
  crossPlank(done) {
    this.time.delayedCall(500, () => this.squash(this.plank)); // G7-25: chạy thẳng qua trên ván (không nhảy), ván nhún khi Mun ở giữa
    this.walkTo(at(S1, ...C1.wait2), done);
  }

  // Ra mép trái: khung trượt sang cảnh sau trong lúc Mun đi tiếp vào cảnh mới.
  leave(to, room, done) {
    this.walkTo(to, () => { this.goRoom(room); done(); });
  }

  // 2 bậc cạnh nhau: hộp bé (bậc 1) → thùng gỗ (bậc 2) → bậu cửa sổ.
  climbSill(done) {
    const tb = this.toolbox, cr = this.crate;
    this.hopTo2([tb.x, this.artRect(tb).top + 18], { up: true, arc: 40, depth: tb.depth + 0.02 }, () => this.time.delayedCall(150, () =>
      this.hopTo2([cr.x, this.artRect(cr).top + 13], { up: true, arc: 50, depth: cr.depth + 0.02 }, () => this.time.delayedCall(150, () =>
        this.hopTo2(at(S3, ...C3.sill), { up: true, arc: 60, depth: this.window.depth + 0.5 }, done)))));
  }

  // ---------- trên bậu cửa sổ ----------
  reachSill() {
    this.onSill = true;
    this.munPose('mun_sit_wet', 'mun_sit_look', true);
    this.sillLoop = this.time.addEvent({ delay: 3000, loop: true, callback: () => this.sillAct() });
    this.sillAct();
    this.tryHome();
  }

  // Cửa đóng: khều kính, meo, cửa sổ nhấp nháy (gợi ý). Cửa mở: rụt rè (nhìn vào, nhìn xuống người ướt, nhấc chân trước rồi rụt).
  sillAct() {
    const m = this.mun;
    if (!this.onSill || this.homeRun || this.busy.mun) return;
    const y = m.y;
    if (!this.windowOpen) {
      this.munPose('mun_paw_glass', 'mun_sit_look', true);
      this.tweens.killTweensOf(m);
      m.setAngle(0);
      this.tweens.add({ targets: m, angle: -6, duration: 110, yoyo: true, repeat: 2, onComplete: () => { // G7-31: khều xong về ngồi thẳng
        m.setAngle(0);
        if (this.onSill && !this.homeRun) this.munPose('mun_sit_wet', 'mun_sit_look', true);
      } });
      if (!this.winArrow) this.time.delayedCall(1000, () => this.winArrowOn()); // G7-31: khều 1 giây thì mũi tên chỉ cửa sổ
      this.sfx('l5_sfx_glass_ting', 0.4);
      this.time.delayedCall(450, () => this.sfx('mun_sfx_meow', 0.3));
      this.tweens.add({ targets: this.window, alpha: 0.6, duration: 160, yoyo: true, repeat: 1 });
      return;
    }
    this.munPose('mun_shy_sill', 'mun_sit_look', true);
    this.tweens.chain({ targets: m, tweens: [
      { angle: 4, duration: 350, hold: 200 },
      { angle: -5, y: y - 8, duration: 300, hold: 250 },
      { angle: 0, y, duration: 300 },
    ] });
  }

  // G7-9: đủ 3 điều kiện: chuông treo + cửa sổ mở + Mun ở bậu.
  tryHome() {
    if (this.chimeHung && this.windowOpen && this.onSill && !this.homeRun) this.homecoming();
  }

  // G7-29 (tạm, chờ Art vẽ lại khung): ti vi, nội thất của lớp phòng trong lộ ra ngoài mép khung. Cắt lớp phòng trong, ánh ti vi, nhân vật
  // theo lòng khung cửa sổ (đo trên ảnh l7_window_open 706x743: lòng khung x 90–618, y 69–655; lấn vào khung 4 px cho kín mép).
  windowMask() {
    const w = this.window;
    if (!this.realKey('l7_window_open')) return;
    const k = w.scaleX, ox = w.x - w.width * w.originX * k, oy = w.y - w.height * w.originY * k;
    const g = this.make.graphics({ add: false }).fillStyle(0xffffff).fillRect(ox + 86 * k, oy + 65 * k, (622 - 86) * k, (659 - 65) * k);
    const mask = g.createGeometryMask();
    for (const s of [this.inside, this.tvGlow, this.tvPlayer]) s.setMask(mask);
  }

  // ---------- chuông gió: kéo từ cạnh cửa chính vào móc giữa cửa sổ (G7-16, G7-20) ----------
  hookArea() {
    const r = this.artRect(this.hook);
    return new Phaser.Geom.Rectangle(r.x - 130, r.y - 90, r.width + 260, r.height + 300);
  }

  // G7-20: chuông chưa treo, không đang kéo: treo cạnh cửa chính ngoài hốc gió, gió quật đung đưa mạnh, kêu khẽ.
  chimeGust() {
    const c = this.chime, sd = this.sdrag;
    if (this.chimeHung || (sd && sd.name === 'chime') || this.tweens.isTweening(c)) return;
    this.wiggle(c, 7, 2, 700);
    this.sfx('l5_sfx_chime', 0.12);
  }

  // G7-18: vùng chạm ván theo hình đã xoay (dựng tường / bắc ngang), rộng hơn 40 mỗi phía cho dễ chọn.
  zoneRect(s) {
    if (s === this.bike || s === this.tin) return this.rotRect(s); // xe dựng dọc nghiêng, mái sụp lệch: vùng chạm theo hình đã xoay // G7-20: xe dựng dọc nghiêng: vùng chạm theo hình đã xoay
    if (s !== this.plank) return super.zoneRect(s);
    const r = this.rotRect(s);
    return new Phaser.Geom.Rectangle(r.x - PLANK_PAD, r.y - PLANK_PAD, r.width + 2 * PLANK_PAD, r.height + 2 * PLANK_PAD);
  }

  // Khung phần vẽ đã tính góc xoay (artRect không tính góc): ván dựng tường, xe dựng dọc nghiêng.
  rotRect(s) {
    const r = this.artRect(s), a = s.rotation;
    if (!a) return r;
    const cs = Math.cos(a), sn = Math.sin(a), xs = [], ys = [];
    for (const [x, y] of [[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]]) {
      const dx = x - s.x, dy = y - s.y;
      xs.push(s.x + dx * cs - dy * sn); ys.push(s.y + dx * sn + dy * cs);
    }
    const x0 = Math.min(...xs), y0 = Math.min(...ys);
    return new Phaser.Geom.Rectangle(x0, y0, Math.max(...xs) - x0, Math.max(...ys) - y0);
  }

  // Hốc cửa sổ khuất gió (ô văng): chuông treo giữa cửa sổ, chỉ đung đưa rất khẽ, gần như không kêu.
  hangChime() {
    this.chimeHung = true;
    this.tweens.killTweensOf(this.chime); // G7-20: dừng nhịp gió quật
    const c = this.chime.setAngle(0).setDepth(4.3);
    this.zones.chime.disableInteractive();
    this.chimeSway = this.tweens.add({ targets: c, angle: { from: -1.5, to: 1.5 }, duration: 1400, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    this.touch();
    this.tryHome();
  }

  // ---------- kịch bản về nhà ----------
  // Mun ngước nhìn chuông, khều mạnh → chuông kêu to → nhân vật quay lại, tim → tới cửa sổ cầm khăn to, giang tay → Mun ngẩng nhìn,
  // viền sáng = LỘ DIỆN; người chơi chạm Mun mới thắng (G7-12).
  homecoming() {
    this.homeRun = true;
    this.phase = 'home';
    this.handHide(); this.handHide('paw');
    if (this.sillLoop) this.sillLoop.remove();
    const m = this.mun, c = this.chime, p = this.tvPlayer, T = (ms, fn) => this.time.delayedCall(ms, fn), B = this.bubble;
    B.home = 'gone'; // về tới nhà: bong bóng nhiệm vụ xong việc
    this.zones.bubble.disableInteractive();
    this.tweens.add({ targets: B.ct, alpha: 0, duration: 300, onComplete: () => B.ct.setVisible(false) });
    this.tweens.killTweensOf(m);
    this.munPose('mun_sit_wet', 'mun_sit_look', true).setAngle(0); // ngước nhìn chuông (ngay trên đầu)
    this.tweens.add({ targets: m, angle: 6, duration: 300 });
    T(600, () => { // khều mạnh
      this.munPose('mun_paw_chime', 'mun_sit_look', true);
      this.tweens.add({ targets: m, angle: 10, scaleY: m.baseY * 1.1, duration: 180, yoyo: true, hold: 120, onComplete: () => {
        this.munPose('mun_sit_wet', 'mun_sit_look', true);
        this.tweens.add({ targets: m, angle: 0, duration: 200 }); // G7-31: khều chuông xong về thẳng
      } });
      if (this.chimeSway) this.chimeSway.remove();
      this.tweens.chain({ targets: c, tweens: [
        { angle: 22, duration: 140 }, { angle: -18, duration: 200 }, { angle: 12, duration: 200 }, { angle: -6, duration: 200 }, { angle: 0, duration: 200 },
      ] });
      this.sfx('l5_sfx_chime', 1);
      T(250, () => this.sfx('l5_sfx_chime', 1));
    });
    T(1500, () => { // nhân vật giật mình quay lại, bong bóng trái tim
      const k = this.realKey('player_turn_surprised') ? 'player_turn_surprised' : 'player_surprised';
      this.applyKey(p, k);
      const w = this.artRect(this.window);
      p.base = p.baseY = ((w.height - 40) * 0.8 * END_PLAYER_K) / p.height; // G7-32: ×0,7, thấp xuống 40
      p.setScale(p.base).setPosition(w.right - 110, w.bottom - 26 + END_PLAYER_DY);
      this.hop(p, 16, 260);
      this.sfx('sfx_heart');
      this.thinkBubble('ui_heart', w.right + 20, w.top + 20, { w: 150, iconK: 0.45, hold: 1600 });
      this.thoughtB.setDepth(NIGHT + 0.3);
      this.thoughtIcon.setDepth(NIGHT + 0.31);
    });
    T(2600, () => { // G7-15: nhân vật tới cửa sổ giang tay đón Mun (không cầm khăn; khăn chỉ có ở cảnh bế)
      const w = this.artRect(this.window);
      if (this.realKey('player_arms_open')) { // applyKey đặt lại cỡ gốc của ảnh (cao ≈ 668); G7-32: ×END_PLAYER_K so với cỡ đang hiện
        const shown = p.displayHeight;
        this.applyKey(p, 'player_arms_open');
        p.base *= END_PLAYER_K; p.baseY = p.base;
        p.setScale(shown / p.height);
      }
      // G7-16: to hơn và thấp xuống một chút, sát sau khung cửa sổ (chân khuất sau bậu).
      this.tweens.add({ targets: p, scale: p.base * ARMS_SCALE, x: w.centerX + 40 + ARMS_DX, y: w.bottom + ARMS_DROP + END_PLAYER_DY + ARMS_DY, duration: 350, ease: 'Quad.out' });
    });
    T(3300, () => { // Mun ngẩng nhìn nhân vật: lộ diện, chờ người chơi chạm
      this.munPose('mun_sit_look', 'mun_sit_look', true);
      this.tweens.killTweensOf(m);
      m.setAngle(0).setScale(m.base, m.baseY); // G7-31: ngồi thẳng (bỏ nghiêng 5°)
      this.phase = 'found';
      this.sua = m;
      this.sfx(this.catMeow);
      this.glowOn(m);
      const r = this.artRect(m);
      this.armSua(new Phaser.Geom.Rectangle(r.x - 30, r.y - 30, r.width + 60, r.height + 50));
      this.touch();
    });
  }

  beforeEnding() { if (this.sillLoop) this.sillLoop.remove(); }

  endingHide() {
    this.mun.setVisible(false);
  }

  // Cảnh bế chung (G7-12): khăn to lót dưới và vòng lên che sau lưng Mun (như ổ khăn): tấm khăn sau Mun + mép khăn trước bụng;
  // giọt nước. Có ảnh mun_held_towel thì dùng ảnh đó.
  startEnding() {
    super.startEnding();
    if (!this.endCt) return;
    if (!this.realKey('mun_held_towel')) {
      const ct = this.endCt.ct;
      // Chưa có ảnh: tấm khăn hồng khối (hình elip) thay cho khăn vẽ.
      this.endTowel = this.add.ellipse(0, 0, 100, 60, 0xf8c6cc).setStrokeStyle(4, 0x6b4a3a).setVisible(false);
      ct.addAt(this.endTowel, ct.getIndex(this.endCt.held));
      this.endLip = this.add.ellipse(0, 0, 100, 20, 0xf8c6cc).setStrokeStyle(4, 0x6b4a3a).setVisible(false);
      ct.add(this.endLip);
    }
    this.time.addEvent({ delay: 240, repeat: 14, callback: () => {
      const h = this.endCt && this.endCt.held;
      if (!h || !h.visible) return;
      const d = this.add.circle(h.x + Phaser.Math.FloatBetween(-0.3, 0.3) * h.displayWidth, h.y + h.displayHeight * 0.45, 7, 0x9fd0ef, 0.9);
      this.endCt.ct.add(d);
      this.tweens.add({ targets: d, y: d.y + 60, alpha: 0, duration: 500, onComplete: () => d.destroy() });
    } });
  }

  syncEndTowel() {
    const t = this.endTowel, h = this.endCt && this.endCt.held;
    if (!t || !h) return;
    // Tấm sau lưng: phủ từ ngang vai xuống dưới thân Mun, rộng 1,5 lần Mun.
    t.setVisible(h.visible).setAngle(h.angle).setPosition(h.x, h.y + h.displayHeight * 0.22);
    t.setScale((h.displayWidth * 1.5) / t.width, (h.displayHeight * 0.95) / t.height);
    // Mép khăn trước bụng (lót dưới): dải dẹt ngang dưới thân.
    this.endLip.setVisible(h.visible).setAngle(h.angle).setPosition(h.x, h.y + h.displayHeight * 0.55)
      .setScale((h.displayWidth * 1.3) / 100, (h.displayHeight * 0.16) / 20);
  }

  // ---------- chạm ----------
  handleLevel(name) {
    if (name === 'mun') this.munTap();
    else if (name === 'shutter') this.shutterTap();
    else if (name === 'chime' && !this.chimeHung) { if (!this.tweens.isTweening(this.chime)) this.wiggle(this.chime, 5, 2, 300); this.sfx('l5_sfx_chime', 0.35); }
  }

  // Chạm Mun (chưa lộ diện, không thắng): meo nhỏ, ngoái nhìn người chơi rồi ngóng về bên trái (phía nhà). Trong khe: mắt liếc trái.
  munTap() {
    if (this.phase !== 'search' || this.busy.mun) return;
    const m = this.mun, free = () => (this.busy.mun = false);
    this.busy.mun = true;
    if (this.inCart) {
      this.sfx('mun_sfx_meow', 0.3);
      this.tweens.add({ targets: this.eyes, x: this.eyes.x - 8, duration: 200, yoyo: true, hold: 500, onComplete: free });
      return;
    }
    if (this.trail.busy) { free(); return; }
    if (this.onSill) { // trên bậu: cúi đầu, run
      this.sfx('mun_sfx_meow', 0.3);
      this.tweens.add({ targets: m, angle: 8, duration: 220, yoyo: true, hold: 500, onComplete: free });
      return;
    }
    if (this.scared) { this.sfx('mun_sfx_meow', 0.15); this.time.delayedCall(300, free); return; } // chờ con chó: meo rất nhỏ
    this.sfx('mun_sfx_meow', 0.45);
    this.face(m, false);
    this.time.delayedCall(550, () => { this.face(m, true); this.hop(m, 10, 240); this.time.delayedCall(300, free); });
  }

  itemTap(p) { this.wiggle(p.s, 2, 2, 220); this.sfx('sfx_tap'); }

  // Tôn rung loảng xoảng, mắt Mun trong khe chớp.
  tinTap() {
    this.sfx('l7_sfx_tin_rattle');
    if (!this.tinTw) this.tinSwing(1.5, 60, 1); // G7-20: rung quanh dáng đang nằm
    if (this.inCart && !this.busy.mun) this.tweens.add({ targets: this.eyes, scaleY: this.eyes.baseY * 0.15, duration: 90, yoyo: true, repeat: 1 });
  }

  // G7-19: 3 ô cành ở bãi trống (id = tên ô gốc branch / brA / brB): ô chưa có cành; góc nằm của từng ô.
  freeBranchSlots() { return BRANCHES.filter((id) => !this.slotUsed[id]); }
  branchSlotAngle(id) { return C1[id === 'branch' ? 'branchSpot' : id + 'Spot'][2]; }

  // Cành chưa kéo: lá rung, nước rơi.
  branchTap(name) {
    const b = this[name], a = b.angle;
    this.tweens.add({ targets: b, angle: { from: a - 2, to: a + 2 }, duration: 65, yoyo: true, repeat: 1, onComplete: () => b.setAngle(a) });
    this.sfx('sfx_leaves');
    this.branchDrip(b);
  }

  branchDrip(b = this.branch) {
    const r = this.artRect(b);
    for (let i = 0; i < 5; i++) this.drop(r.x + r.width * Math.random(), r.y + r.height * 0.5, { dy: 40, r: 4, depth: b.depth + 0.01 });
  }

  floodTap() {
    const r = this.artRect(this.flood);
    this.splashAt(r.centerX, C1.wait1[1], this.flood.depth + 0.01);
    if (this.trail.i === 1 && this.trail.state === 'wait' && !this.busy.mun) this.pawOut('flood'); // Mun thò chân chạm nước, rụt lại
  }

  splashAt(x, y, depth) {
    this.sfx('l7_sfx_splash');
    this.ring(x, y, 50, depth);
    for (let i = 0; i < 6; i++) this.drop(x, y, { dx: Phaser.Math.Between(-60, 60), dy: -Phaser.Math.Between(30, 70), r: 6, depth: depth + 0.01 });
  }

  ring(x, y, rx, depth) {
    const g = this.add.ellipse(x, y, 30, 10).setStrokeStyle(4, 0xffffff, 0.8).setDepth(depth);
    this.tweens.add({ targets: g, scaleX: rx / 15, scaleY: rx / 15, alpha: 0, duration: 500, onComplete: () => g.destroy() });
  }

  // Bàn nhựa: rung, nước đọng trên mặt bàn toé.
  tableTap() {
    this.wiggle(this.table, 1.5, 2, 220);
    this.sfx('l7_sfx_table');
    const r = this.artRect(this.table);
    this.splashAt(r.centerX, r.top + 10, this.table.depth + 0.01);
  }

  // Chó lạ (chưa có hang): ngẩng lên nhìn, ư ử, rúc đầu lại; Mun đang chờ thì dựng lông, lùi lại.
  dogTap() {
    const d = this.dog;
    if (this.dogIn) { this.wiggle(d, 3, 1, 200); return; }
    this.sfx('l7_sfx_dog_whimper', 0.8);
    this.tweens.add({ targets: d, scaleY: d.baseY * 1.08, duration: 160, yoyo: true, hold: 200 });
    this.munBristle();
  }

  // Mỗi lần sấm: chó run bần bật, ư ử, rúc đầu (đã trong thùng thì thôi run).
  dogFear() {
    const d = this.dog;
    if (!d || this.dogIn || this.busy.dog) return;
    this.busy.dog = true;
    this.sfx('l7_sfx_dog_whimper', 0.6);
    const x = d.x;
    this.tweens.add({ targets: d, x: x + 4, duration: 45, yoyo: true, repeat: 7, onComplete: () => {
      d.x = x;
      this.tweens.add({ targets: d, scaleY: d.baseY * 0.9, duration: 200, yoyo: true, hold: 300, onComplete: () => (this.busy.dog = false) });
    } });
  }

  munBristle() {
    const m = this.mun;
    if (!this.scared || this.trail.state !== 'wait' || this.busy.mun) return;
    this.tweens.add({ targets: m, x: m.x + 20, scaleY: m.baseY * 1.07, duration: 150, yoyo: true, hold: 400 });
  }

  // ✨ Cửa cuốn: rung rầm rầm nhẹ, chó giật mình.
  shutterTap() {
    this.sfx('l7_sfx_shutter');
    this.cameras.main.shake(120, 0.002);
    if (!this.dogIn) { this.hop(this.dog, 10, 200); this.munBristle(); }
  }

  // 🔑 Cửa sổ: chạm mở 2 cánh vào trong (giữ). Đã mở: chạm ti vi / nhân vật (ánh ti vi đổi màu, vai rung cười).
  windowTap() {
    if (this.homeRun) return;
    if (this.windowOpen) { this.tvTap(); return; }
    this.windowOpen = true;
    this.winArrowOff();
    this.sfx('l7_sfx_window');
    this.swap(this.window, 'l7_window_open', () => this.propZone('window'));
    this.zones.window.setDepth(D.zone + 1);
    this.time.delayedCall(300, () => this.sfx('l7_sfx_tv', 0.6));
    this.touch();
    this.tryHome();
  }

  // G7-31: Mun khều ở bậu (cửa đóng) được 1 giây: mũi tên chỉ dẫn như mũi tên chỉ mèo các màn (ảnh ui_room_arrow chỉ xuống, màu ấm,
  // nảy 1,2 nhịp/giây, phồng nhẹ) chỉ vào khung kính phải của cửa sổ; chạm mở cửa sổ thì tắt.
  winArrowOn() {
    if (this.winArrow || this.windowOpen || !this.onSill || this.homeRun || !this.textures.exists('ui_room_arrow')) return;
    const a = this.winArrow = this.add.image(0, 0, 'ui_room_arrow').setOrigin(0.5, 0.5).setAngle(90).setDepth(D.hint).setAlpha(0);
    a.base = CAT_ARROW / a.width;
    a.setScale(a.base).setTint(0xffd27a);
    const r = this.artRect(this.window), tip = [r.x + r.width * 0.72, r.y + r.height * 0.42];
    a.follow = () => {
      const t = this.time.now / 1000, bob = Math.abs(Math.sin(t * Math.PI * 1.2));
      a.setPosition(tip[0], tip[1] - CAT_ARROW * 0.5 - bob * 18).setScale(a.base * (1 + 0.06 * Math.sin(t * Math.PI * 2.4)));
    };
    a.follow();
    this.tweens.add({ targets: a, alpha: 1, duration: 250 });
    this.events.on('update', a.follow);
    this.events.once('shutdown', () => this.winArrowOff());
  }

  winArrowOff() {
    const a = this.winArrow;
    if (!a) return;
    this.events.off('update', a.follow);
    a.destroy();
    this.winArrow = null;
  }

  tvTap() {
    if (this.homeRun) return;
    this.sfx('l7_sfx_tv');
    this.tvGlow.setFillStyle(Phaser.Utils.Array.GetRandom(this.tvColors), 0.9);
    const p = this.tvPlayer, y = p.y;
    this.tweens.add({ targets: p, y: y - 5, duration: 90, yoyo: true, repeat: 3, onComplete: () => (p.y = y) });
  }

  doorTap() {
    this.wiggle(this.door, 0.5, 2, 200);
    this.sfx('l7_sfx_knock');
    this.time.delayedCall(180, () => this.sfx('l7_sfx_knock'));
  }

  // Hộp bé: chạm (không kéo) thì lắc nhẹ.
  toolboxTap() {
    this.wiggle(this.toolbox, 2, 1, 200);
    this.sfx('sfx_tap');
  }

  // ---------- đặt đồ vào ô sáng ----------
  itemPlaced(name, spot) {
    const s = this[name];
    this.placed[name] = true;
    this.litOff(spot.id);
    if (name === 'tin') { this.tinPose(C1.tinCart); s.setDepth(this.cart.depth + 0.02); this.zoneTo('tin', s); } // G7-26: mái ngay trên lớp xe, dưới lớp Mun // G7-25: mái gác lên xe ba gác
    else if (name === 'plank') s.setDepth(this.flood.depth + 0.01);
    else if (BRANCHES.includes(name)) { // G7-18, G7-19: cành vào ô trống bất kỳ, nằm theo góc ô đó
      this.slotUsed[spot.id] = true;
      this.tweens.add({ targets: s, angle: this.branchSlotAngle(spot.id), duration: 160 });
      this.ySort(s); this.branchDrip(s); // G7-31: cành dựng tường lớp theo ô (14,35…14,85), dưới Mun 16,2
    }
    else if (name === 'umbrella') this.openUmbrella();
    else if (name === 'box') { this.ySort(s); this.flipBox(); this.dogToBox(); }
    else if (name === 'bike') this.standBike();
    else if (name === 'chime') this.hangChime();
    else this.ySort(s);
    this.touch();
    if (!this.busy.mun) this.trail.poke();
  }

  // G7-25: vùng thả mái lên xe ba gác (vị trí sprite mái, neo đỉnh giữa) quanh dáng tinCart.
  cartArea() {
    const [x, y] = at(S1, ...C1.tinCart);
    return new Phaser.Geom.Rectangle(x - 230, y - 170, 460, 340);
  }

  // G7-22: mái một cỡ, đặt theo dáng [x, y, góc] (toạ độ cảnh 1).
  tinPose([x, y, a]) { this.tin.setPosition(...at(S1, x, y)).setAngle(a); }

  tinTo([x, y, a], ms, ease, done) {
    if (this.tinTw) this.tinTw.remove();
    const [wx, wy] = at(S1, x, y);
    this.tinTw = this.tweens.add({ targets: this.tin, x: wx, y: wy, angle: a, duration: ms, ease, onComplete: () => { this.tinTw = null; if (done) done(); } });
  }

  // Mái rung ±d độ quanh góc đang nằm, n lần.
  tinSwing(d, ms, n) {
    if (this.tinTw) return;
    const t = this.tin, a = t.angle;
    this.tinTw = this.tweens.add({ targets: t, angle: { from: a - d, to: a + d }, duration: ms, yoyo: true, repeat: n,
      onComplete: () => { this.tinTw = null; t.setAngle(a); } });
  }

  // Cán ô cắm vào lỗ giữa bàn, ô bung tròn 0,3 giây; vùng dưới ô hết mưa xối (yardRain tắt).
  openUmbrella() {
    const u = this.umbrella;
    this.applyKey(u, 'l7_umbrella_open');
    u.setPosition(...this.SPOT.umbrella).setDepth(this.table.depth + 0.3); // G7-30: trên cây (cây Y(1100) − 0,1 = 15,9; ô 16,05)
    u.scaleX = u.base * 0.15;
    this.tweens.add({ targets: u, scaleX: u.base, duration: 300, ease: 'Back.out' });
    this.zoneTo('umbrella', u);
    // G7-30: phần bàn từ tâm lỗ trở xuống (mép trước lỗ, mặt bàn, chân) vẽ lại đè lên cán ô.
    const t = this.table;
    if (this.realKey('l7_shop_table')) {
      this.add.image(t.x, t.y, t.texture.key, t.frame.name).setOrigin(t.originX, t.originY).setScale(t.scaleX, t.scaleY).setTint(t.tintTopLeft)
        .setCrop(0, TABLE_HOLE_Y, t.width, t.height - TABLE_HOLE_Y).setDepth(u.depth + 0.01);
    }
  }

  // G7-15: thùng ngửa lật nghiêng 0,3 giây (xoay quanh mép đáy) thành thùng nằm ngang, miệng quay ra phía chó.
  flipBox() {
    const b = this.box;
    this.tweens.add({ targets: b, angle: 40, duration: 150, ease: 'Quad.in', onComplete: () => {
      this.applyKey(b, 'l7_box_carton_side');
      b.setScale(b.base).setAngle(-12);
      this.tweens.add({ targets: b, angle: 0, duration: 150, ease: 'Back.out', onComplete: () => this.zoneTo('box', b) });
    } });
  }

  // Chó ngó vào thùng, chui tọt vào (0,6 giây), chỉ thò mũi ra, thôi run. Lối hiên thông.
  // G7-23: chó đứng dậy, nhìn quanh, chạy tới miệng thùng, cúi đầu chui vào (co, xẹp dần), thùng nảy nhẹ, rồi mặt chó thò ra ở miệng.
  dogToBox() {
    const d = this.dog, b = this.box, by = d.baseY || d.base, T = (ms, fn) => this.time.delayedCall(ms, fn);
    this.tweens.killTweensOf(d);
    this.busy.dog = true; // không run sợ sấm giữa chừng
    d.setScale(d.base, by).setAngle(0);
    T(300, () => { // đứng dậy (thùng đã lật nằm ngang, flipBox)
      this.tweens.add({ targets: d, scaleY: by * 1.12, duration: 220, ease: 'Back.out' });
      this.sfx('l7_sfx_dog_whimper', 0.3);
    });
    T(650, () => this.face(d, false));   // nhìn quanh
    T(900, () => this.face(d, true));
    T(1150, () => this.face(d, false));
    T(1400, () => { // chạy lon ton tới miệng thùng
      const r = this.artRect(b), mouth = [r.centerX, b.y - DOG_IN_LIP], x0 = d.x, y0 = d.y, tx = r.right - 40, ty = b.y + 4; // G7-25: chui vào lòng thùng
      this.face(d, x0 > tx);
      this.tweens.addCounter({ from: 0, to: 1, duration: 520, ease: 'Sine.inOut', onUpdate: (tw) => {
        const k = tw.getValue();
        d.setPosition(x0 + (tx - x0) * k, y0 + (ty - y0) * k - Math.abs(Math.sin(k * Math.PI * 3)) * 10);
        this.ySort(d);
      }, onComplete: () => { // cúi đầu chui vào: thấp, hẹp dần, mờ đi ở miệng thùng
        this.face(d, true);
        this.tweens.add({ targets: d, x: mouth[0], y: mouth[1] + 20, angle: -12, scaleX: d.base * 0.35, scaleY: by * 0.3, alpha: 0, duration: 420, ease: 'Quad.in',
          onComplete: () => {
            this.tweens.add({ targets: b, scaleY: (b.baseY || b.base) * 0.94, duration: 110, yoyo: true, ease: 'Quad.out' }); // thùng nảy nhẹ
            this.sfx('l7_sfx_box', 0.5);
            T(380, () => { // mặt chó thò ra ở miệng thùng
              this.applyKey(d, 'l7_stray_dog_inbox');
              d.base *= DOG_IN_K; d.baseY = d.base; // G7-25: mặt chó to (DOG_IN_K), cân với chó nằm
              this.face(d, false).setPosition(...mouth).setDepth(b.depth + 0.01).setAngle(0).setAlpha(1).setScale(d.base * 0.2, d.baseY * 0.2);
              this.tweens.add({ targets: d, scaleX: d.base, scaleY: d.baseY, duration: 260, ease: 'Back.out', onComplete: () => {
                this.zoneTo('dog', d);
                this.sfx('l6_sfx_dog_happy', 0.4); // thở phào
                this.busy.dog = false;
                this.dogIn = true;
                if (!this.busy.mun) this.trail.poke();
              } });
            });
          } });
      } });
    });
  }

  // Dựng xe tại chỗ đổ (G7-11): xoay đứng dậy 0,3 giây, chân chống "cạch", chuông xe kêu nhỏ. Xe đứng sát mép vỉa hè
  // (trước lối Mun đi), lối hiên thông.
  standBike() {
    const k = this.bike;
    this.tweens.killTweensOf(k);
    k.setPosition(...this.SPOT.bike).setScale(k.base).setAngle(BIKE_LEAN); // G7-20: từ dáng dựng dọc nghiêng xoay về đứng như L5
    this.ySort(k);
    this.tweens.add({ targets: k, angle: 0, duration: 300, ease: 'Back.out', onComplete: () => {
      this.sfx('l7_sfx_bike_stand');
      this.time.delayedCall(150, () => this.sfx('l5_sfx_bike_bell', 0.3));
      this.zoneTo('bike', k);
    } });
  }

  // G7-18: bánh trước đi theo thân xe (vị trí, góc), lớp ngay trên thân.
  syncWheel() {
    const k = this.bike, w = this.wheel;
    if (!w) return;
    const sy = k.scaleY / k.base, a = k.rotation, [ox, oy] = WHEEL_AT, cs = Math.cos(a), sn = Math.sin(a);
    const dx = ox * (k.scaleX / k.base), dy = oy * sy;
    w.setPosition(k.x + dx * cs - dy * sn, k.y + dx * sn + dy * cs).setScale(w.base, w.base * sy).setAngle(k.angle).setDepth(k.depth + 0.01);
  }

  // ---------- Mun ướt: giọt nước, run ----------
  drop(x, y, { dx = 0, dy = 30, r = 4, depth } = {}) {
    const d = this.add.circle(x, y, r, 0x9fd0ef, 0.9).setDepth(depth ?? this.mun.depth + 0.01);
    this.tweens.add({ targets: d, x: x + dx, y: y + dy, alpha: 0, duration: 450, ease: 'Quad.in', onComplete: () => d.destroy() });
  }

  munDrip() {
    const m = this.mun;
    if (!m.visible || this.inCart || this.homeRun || this.phase === 'ending' || this.phase === 'reward') return;
    const r = this.artRect(m);
    this.drop(r.x + r.width * (0.2 + Math.random() * 0.6), r.y + r.height * (0.55 + Math.random() * 0.35));
  }

  // Ngồi chờ thỉnh thoảng run, đôi khi giũ nước; dưới gốc cây thì lặp thò chân bị mưa quất.
  munShiver() {
    const m = this.mun;
    if (this.phase !== 'search' || this.busy.mun || this.onSill) return;
    if (this.inCart) { this.wiggle(this.eyes, 3, 2, 200); return; }
    if (!this.trail || this.trail.state !== 'wait') return;
    if (this.waitWhy === 'rain' && this.trail.i === 3) { this.rainPaw(); return; }
    if (Math.random() < 0.3 && !this.scared) this.munShake();
    else this.tweens.add({ targets: m, angle: { from: -2, to: 2 }, duration: 60, yoyo: true, repeat: 3, onComplete: () => m.setAngle(0) });
  }

  // Vùng chạm Mun theo Mun (trong khe: theo đôi mắt); chỉ nhận chạm khi Mun đứng chờ / ở bậu.
  munZone() {
    const z = this.zones.mun, s = this.inCart ? this.eyes : this.mun;
    if (!z || !this.trail) return;
    const on = this.phase === 'search' && s.visible && (this.inCart || this.trail.state === 'wait' || this.onSill);
    if (on) { this.zoneTo('mun', s); if (!z.input.enabled) z.setInteractive(); } else if (z.input && z.input.enabled) z.disableInteractive();
  }

  // ---------- mở màn (0–6 giây, khoá chạm) ----------
  // Bố cục G7-11 (G7-14): chỉ ở hẻm. Sấm sét, gió quật, tấm tôn mái hiên bật khỏi khung, sụp chéo; Mun đang đi giật mình phóng vào khe
  // giữa xe ba gác và tường; tôn chặn kín miệng khe. Cùng lúc tia sét + cành cây gãy rơi xuống chắn lối cuối hẻm. Bong bóng nhớ bật ra
  // từ chỗ Mun.
  onIntro() {
    const m = this.mun, t = this.tin, br = this.branch, T = (ms, fn) => this.time.delayedCall(ms, fn);
    const brHome = at(S1, ...C1.branch);
    this.tinPose(C1.tinHigh);                                         // G7-22: mái còn gắn cao sát mép trên tường như L5
    br.setPosition(brHome[0] + 40, -300).setAngle(-30);             // cành còn trên cây (ngoài khung)
    this.zones.tin.disableInteractive();
    this.zones.branch.disableInteractive();
    const twigs = ['brA', 'brB'].map((n) => ({ n, s: this[n], home: at(S1, C1[n][0], C1[n][1]), a: C1[n][2] })); // 2 cành to cùng rơi thành đống
    for (const b of twigs) { b.s.setPosition(b.home[0] + 40, -300).setAngle(-30); this.zones[b.n].disableInteractive(); }
    // G7-17: Mun chạy vào từ mép phải (hướng hành trình phải → trái), dừng giật mình trên nền khô bên phải khe (thân x 706–871),
    // không chạm dải nước (x 360–520) lúc nào.
    m.setPosition(...at(S1, 1110, 1215)).setVisible(true);
    this.munPose('mun_run', 'mun_run', true);
    this.ySort(m, 0.05);
    m.runF = 0;
    this.munMove(at(S1, 820, 1215), 900, { onUpdate: () => { this.runFrame(); m.y -= Math.abs(Math.sin(this.time.now / 110)) * 5; } });
    T(150, () => this.lightning(true));
    T(200, () => { this.tinSwing(2, 90, 5); this.sfx('l7_sfx_tin_rattle'); });
    T(950, () => { // tôn bật khỏi khung; Mun giật mình
      this.sfx('l7_sfx_wind', 0.8);
      m.setScale(m.base, m.baseY).setAngle(0);
      this.munPose('mun_sit_wet', 'mun_sit_look', true);
      this.hop(m, 34, 260);
      this.sfx('mun_sfx_meow', 0.6);
    });
    // G7-23: Mun đứng lại lâu hơn, sét chớp một cái (chớp màn + sấm), Mun co rúm lại rồi mới chạy vào gầm xe.
    T(1500, () => {
      this.lightning(true);
      this.tweens.add({ targets: m, scaleY: m.baseY * 0.9, duration: 120, yoyo: true, hold: 200 });
    });
    T(2000, () => { // phóng vào trú sâu dưới gầm xe
      this.munPose('mun_run', 'mun_run', true);
      m.runF = 0;
      this.munMove(at(S1, ...C1.eyes), 420, { ease: 'Quad.in', onUpdate: () => { this.runFrame(); this.ySort(m, 0.05); }, onComplete: () => {
        this.tweens.add({ targets: m, alpha: 0, scale: m.base * 0.6, duration: 120, onComplete: () => {
          m.setVisible(false).setAlpha(1).setScale(m.base).setAngle(0);
          this.eyes.setVisible(true);
        } });
      } });
    });
    T(2400, () => { // mái sụp lệch che miệng khe (G7-20)
      this.tinTo(C1.tinFall, 600, 'Bounce.out', () => { // G7-22: cả tấm tuột khỏi tường, rơi nằm chéo dưới đất
        this.dust(...at(S1, 480, 1120)); // G7-35: theo mái sụp lên 50
        this.sfx('l7_sfx_tin_rattle', 1);
        this.zoneTo('tin', t);
      });
    });
    T(2650, () => { // tia sét + cành cây gãy rơi chắn lối cuối hẻm
      this.lightning(true);
      this.tweens.add({ targets: br, x: brHome[0], y: brHome[1], angle: 0, duration: 520, ease: 'Bounce.out', onComplete: () => {
        this.dust(brHome[0] + 60, brHome[1] - 10);
        this.sfx('l7_sfx_leaves_drag', 1);
        this.branchDrip();
        this.zoneTo('branch', br);
      } });
      twigs.forEach((b, i) => this.tweens.add({ targets: b.s, x: b.home[0], y: b.home[1], angle: b.a, duration: 480, delay: 90 + i * 80, ease: 'Bounce.out',
        onComplete: () => this.zoneTo(b.n, b.s) }));
    });
    T(3350, () => this.wiggle(this.eyes, 3, 3, 300));
    T(3650, () => {
      // G7-17: góc trên bên phải chỗ Mun nấp; đuôi bong bóng (dưới trái) chỉ về Mun.
      this.bubbleAt = [this.bandX(this.eyes.x) + 110, this.eyes.y - 170 + this.Y0];
      this.bubbleIntro();
      this.locked = false;
      this.phase = 'search';
      this.zones.tin.setInteractive();
      this.zones.branch.setInteractive();
      this.zones.brA.setInteractive();
      this.zones.brB.setInteractive();
      this.touch();
      this.trail.start();
    });
  }

  // ---------- gợi ý ----------
  // Món kế tiếp trong cảnh đang đứng: cảnh 1 cành chạc → ván → cành; cảnh 2 ô → thùng → xe; cảnh 3 thùng gỗ → hộp bé →
  // mở cửa sổ → kéo chuông vào móc. Lộ diện: chỉ vào Mun.
  hintStep() {
    if (this.phase === 'found') return { sprite: this.mun };
    if (this.phase !== 'search' || this.moving) return null;
    const P = this.placed, d = (n, slot = BRANCHES.includes(n) ? this.freeBranchSlots()[0] : n) => ({ drag: n, slot, to: this.sceneSpotCenter(n, this.SPOT[slot]) });
    if (this.room === S1) { const n = ['tin', 'plank', 'branch', 'brA', 'brB'].find((k) => !P[k]); return n ? d(n) : null; }
    if (this.room === S2) { const n = ['umbrella', 'box', 'bike'].find((k) => !P[k]); return n ? d(n) : null; }
    if (!P.crate) return d('crate');
    if (!P.toolbox) return d('toolbox');
    if (!this.windowOpen) return { sprite: this.window };
    if (!this.chimeHung) return d('chime');
    return null;
  }

  hintTarget(h) { return h.drag ? this[h.drag] : h.sprite || this.hook; }

  // 8 giây: Mun nhìn về món cần đặt tiếp theo, meo nhỏ (trong thùng: mắt liếc theo).
  hint1() {
    const h = this.hintStep();
    if (!h || this.busy.mun || this.phase === 'found') return;
    const t = this.hintTarget(h);
    this.sfx('mun_sfx_meow', 0.3);
    if (this.inCart) { this.tweens.add({ targets: this.eyes, x: this.eyes.x + Math.sign(t.x - this.eyes.x) * 8, duration: 200, yoyo: true, hold: 700 }); return; }
    if (this.trail.state !== 'wait' && !this.onSill) return;
    const m = this.mun, left = m.faceLeft;
    this.faceToward(m, t.x);
    this.time.delayedCall(1100, () => { if (!this.homeRun && !this.trail.busy) this.face(m, left); });
  }

  // 16 giây: món cần đặt lấp lánh, ô sáng của nó sáng rõ hơn (chuông trong túi nảy lên, móc lấp lánh).
  idleSparkle() {
    const h = this.hintStep();
    if (!h) return;
    if (h.item) { this.hop(h.item.s, 22, 300); this.sparkle(this.hook); return; }
    this.sparkle(this.hintTarget(h));
    if (h.slot) this.litFlash(h.slot);
  }

  // 💡 bàn chân làm mẫu: kéo / vuốt (xe đạp) món vào ô, kéo chuông từ túi vào móc, hoặc chạm (hộp, cửa sổ, Mun lộ diện).
  strongHint() {
    this.pressBulb();
    const h = this.hintStep();
    if (!h) return;
    if (h.item) this.handDrag(this.slotPos(h.item.i), h.to, 'hint', 'paw', 2);
    else if (h.drag) { this.handDrag(this.tipOf(this[h.drag]), h.to, 'hint', 'paw', 2); this.litFlash(h.slot, 2600); }
    else this.pawAt(this.tipOf(h.sprite));
  }

  update(time, delta) {
    this.rainStep(delta || 16);
    this.yardRain(delta || 16);
    this.munZone();
    this.syncWheel();
    this.syncEndTowel();
    this.idleHints(time);
  }
}
