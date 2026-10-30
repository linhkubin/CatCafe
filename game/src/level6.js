// Level 6 – Xuống đây nào, Mun! (G6-1). Bản chơi thử bằng khối (QUY-TRINH bước 2): nền sân sau L5 thật, đồ là khối có nhãn.
// Luồng theo levels/levels-01-10.md và levels/states-01-10.md (Level 6). Một phòng: sân sau nhà hàng xóm.
// Mun kẹt trên mái nhà kho, chó Lu sủa dưới. Xương (bụi rau) → Lu về chuồng gặm → xúc xích (giỏ picnic) → kéo 4 món trong cảnh
// thành đường xuống (phuy → A, hộp dụng cụ đậy phuy, thùng gỗ → B, ghế đẩu → C) → thả xúc xích lên bàn → Mun xuống từng bậc, nhảy lên bàn ăn → chạm thắng (G6-5).
import { D } from './base.js';
import { ObjectLevel } from './objects.js';
import { PAL, rr, el, label, block } from './blocks.js';

// Vị trí (toạ độ khung 1024x1536, neo theo ảnh tạm: đa số giữa đáy). Sân: hàng rào tới y ≈ 872, đất bên dưới.
const DEF = {
  player_call: [260, 1385],
  // QUY-TRINH bước 5: đồ đứng yên đo trên demo đã duyệt (G6-21, l6_demo_path_play.png, khung 1024x1536), neo theo anchors.json.
  // G6-21: gốc cây chạm nền sân (chân rào y ≈ 870), ổ chim theo cành.
  l6_tree: [19, 905], l6_bird_nest: [132, 537],
  l5_wind_chime: [330, 380], l6_glove_black_idle: [418, 342], // găng vắt đỉnh rào: neo đỉnh
  // G6-18: bố cục như G6-16, đồ to theo G6-17 tại chỗ (neo giữa đáy). Kho 560 × 541 (G6-17) để mặt mái y 475, 4 bậc hụt đều 120;
  // mép mái trái x ≈ 580. Mun nằm mái và ống khói hạ theo mặt mái (−66).
  // Ghép ảnh thật: kho vẽ lại (A6-11) đặt cho đỉnh mái trùng demo (y 447), mép trái 522; Mun nằm mái như demo.
  l6_shed: [802, 906], l6_shed_chimney: [965, 455], mun_roof_crouch: [720, 474],
  // G6-5: bàn sát cạnh trái ghế đẩu ở chỗ C, giỏ ở mép trái mặt bàn, chỗ trống bên phải đặt xúc xích.
  // G6-18: bàn rộng 320 nhích phải 30 (khỏi lọt mép trái). G6-19: bàn thấp 228 (1,2 Hm), chân bàn xuống 23 (1040 → 1063) để
  // mặt bàn 835 ngang mặt ghế ở C; ghế vẫn đứng trước bàn (chân ghế 1065).
  // Bàn Art vẽ thấp hơn bàn trong demo: đặt theo mặt bàn (y ≈ 810 như demo), giỏ trên mặt bàn như demo.
  l6_table: [140, 966], l6_picnic_basket_closed: [123, 848], l6_picnic_basket_open: [123, 848],
  // G6-13/16: Lu ngồi sủa trước kho, bên phải chỗ A. G6-18: nhích phải 55 (phuy rộng 170 ở chỗ đầu che Lu).
  l6_dog_bark: [700, 975], l6_dog_house: [856, 1167], l6_dog_house_front: [856, 1167], l6_dog_chew: [856, 1152], // đầu Lu thò cửa chuồng, đáy ở ngưỡng cửa
  l6_dog_belly: [856, 1270], // G6-16: lăn ra nằm ngay trước cửa chuồng
  // G6-4, G6-5: chỗ đầu các món rải rác. Hàng trước sân đáy y 1290 (túi đồ từ y ≈ 1298). Ghế đẩu dưới bàn bên trái.
  // G6-18: hàng trước to lên không đủ 1024 cho 5 món cạnh nhau: hộp dụng cụ nhích trái 20, bụi rau lùi 28 (phuy che nhẹ mép phải),
  // phuy nhích phải 25, bình tưới nhích phải 42.
  l6_stool: [230, 1110], // trước mép bàn, sau bụi rau; cách chỗ C hơn tầm hút 110
  // Ghép ảnh thật: bụi rau (343, 1242) và bình tưới (705, 1275) theo demo. Phuy đứng hàng trước bên trái (trước bụi rau).
  // Hộp dụng cụ thấp (cao 103) đứng ngoài vùng túi đồ (khung 3:4 túi đồ phủ x 65–753, y ≈ 1210–1380), dưới chuồng, không che cửa.
  l6_toolbox: [865, 1300], // G6-21: thấp xuống, lệch phải; khung 3:4 nằm ngoài túi đồ (x ≤ 753), không che cửa chuồng
  l6_veggie_bed: [343, 1242], l6_barrel: [80, 1296], l6_watering_can: [705, 1275],
  // G6-6, G6-21: thùng gỗ đứng riêng cạnh hàng rào, sau bàn (mở màn Mun nhảy thùng gỗ → mái).
  l6_crate: [275, 880],
};
// Chỗ đặt xếp đường (vị trí đặt sprite): A sát tường kho (phuy, rồi hộp dụng cụ đậy miệng phuy), B thùng gỗ, C ghế đẩu.
// G6-2, G6-18: bậc đều, mỗi nấc hụt 120 (dưới Hm ≈ 190): mặt mái 475 → mặt hộp dụng cụ 595 → mặt thùng gỗ 715 → mặt ghế 835
// → nhảy lên mặt bàn 755. Phuy cao 350, hộp dụng cụ 95, thùng gỗ 255, ghế 230.
// Nhích so với G6-16 (chỉ theo y cho bậc đều): A xuống 30 (1010 → 1040), B lùi 65 (1035 → 970), C giữ nguyên.
// Đồ to nên bậc thấp đứng trước che nhẹ chân bậc cao (lớp theo y chân), mặt mỗi bậc vẫn lộ cho Mun đứng.
// Ghép ảnh thật (G6-21): chỗ đặt đo trên demo xếp xong đường (l6_demo_path_play.png), neo giữa đáy.
const SPOT = { barrel: [535, 968], toolbox: [528, 680], crate: [395, 982], stool: [323, 1024] };
// Chỗ Mun đứng trên mặt mỗi bậc = đỉnh phần vẽ + độ sâu mặt trên (hộp dụng cụ: dưới quai, trên nắp phẳng).
const STAND = { toolbox: 18, crate: 13, stool: 22, table: 13 };
const STEPS = ['barrel', 'toolbox', 'crate', 'stool']; // thứ tự gợi ý; đặt tự do, trừ hộp dụng cụ phải sau phuy
// Đường Mun xuống: mép mái → mặt hộp dụng cụ (A) → mặt thùng gỗ (B) → mặt ghế (C) → nhảy lên bàn ăn.
const ROOF_EDGE = [598, 480];
// G6-6, G6-21: vòng chạy mở màn (đáy Mun). Đồ trên sân xếp thành hàng chắn ngang, thân chạy rộng ≈ 300: chỉ chạy các đoạn
// NGANG (y chân không đổi nên không đổi lớp giữa chừng, không xuyên qua đồ), đổi dải ở ngoài mép màn (x < −400, kể cả khung 3:4).
// Vào từ phải ở dải trước (y 1430, trước mọi đồ) chạy sang trái, ra khỏi màn, vòng lên dải sau (y 1000: trước bàn, sau ghế đẩu,
// phuy, bụi rau; trước kho) chạy sang phải tới khoảng trống trước kho.
const INTRO_LOOP = [[1450, 1430], [-420, 1430], [-420, 1000], [450, 1000]];
const LU_BRAKE = [480, 1005];                        // G6-14: Lu phanh trên dải sau, ngẩng nhìn Mun nhảy lên thùng gỗ
const DOG_DOOR = [[1180, 990], [1180, 1255], [856, 1255]]; // G6-21: Lu ngậm xương đi sau chuồng, xuống ngoài mép phải, vòng ra trước cửa
const TREAT_DX = 85;
const EAT_DX = 20, EAT_MOUTH = [62, -16];               // Mun ăn đứng lùi trái chỗ xúc xích; xúc xích ngay trước miệng (dáng nhìn phải)                                  // G6-5: xúc xích trên mặt bàn, bên phải tâm bàn (bên phải giỏ); G6-19: Mun từ ghế bước ngang sang ăn
const STEP_ARC = 40;                                   // G6-2, G6-21: mỗi bậc nhảy vồng mềm (cung thấp, ease in-out), đáp nhún nhẹ
const BEHIND_CHIMNEY = [960, 477];
const GLOVE_FALLEN = [418, 905];                     // găng rơi xuống đất ngay dưới chỗ vắt trên hàng rào, nằm yên ở đó
const GLOVE_DOG = [540, 960];                         // chỗ Lu đứng ngửi găng: chân trên mặt sân cạnh găng (găng nằm yên)
const DOG_BEG = [380, 1110];                           // Lu chồm tới bàn đòi xúc xích

const dogBody = (txt, pose) => (c, w, h) => {          // Lu khối: thân + đầu + tai, nhãn tư thế
  if (pose === 'lie') { el(c, w * 0.45, h * 0.62, w * 0.42, h * 0.32, PAL.dog); el(c, w * 0.82, h * 0.42, h * 0.3, h * 0.3, PAL.dog); }
  else { el(c, w * 0.42, h * 0.65, w * 0.36, h * 0.3, PAL.dog); el(c, w * 0.68, h * 0.32, w * 0.24, h * 0.26, PAL.dog);
    el(c, w * 0.56, h * 0.18, w * 0.07, h * 0.14, '#c9944a'); }
  label(c, txt, w / 2, h * 0.62, 20);
};
const munBody = (txt) => (c, w, h) => {               // Mun khối: thân đen, đầu tròn, mắt vàng
  // Đuôi bên trái, mắt lệch phải: khối mặc định nhìn sang phải, lật (face) thấy rõ hướng (G6-15).
  c.beginPath(); c.moveTo(w * 0.14, h * 0.74); c.quadraticCurveTo(-w * 0.02, h * 0.6, w * 0.06, h * 0.3);
  c.lineWidth = Math.max(8, w * 0.06); c.lineCap = 'round'; c.strokeStyle = PAL.black; c.stroke();
  el(c, w * 0.5, h * 0.68, w * 0.42, h * 0.28, PAL.black, null); el(c, w * 0.5, h * 0.36, w * 0.28, h * 0.3, PAL.black, null);
  el(c, w * 0.48, h * 0.34, w * 0.06, h * 0.07, PAL.gold, null); el(c, w * 0.66, h * 0.34, w * 0.06, h * 0.07, PAL.gold, null);
  label(c, txt, w / 2, h * 0.78, 18, PAL.white);
};

// Ảnh tạm (khối có nhãn, cỡ = cỡ hiển thị).
const FB = {
  l6_tree: block(240, 520, null, '', { draw: (c, w, h) => {
    rr(c, w / 2 - 22, h * 0.45, 44, h * 0.55, PAL.woodDark, 8); el(c, w / 2, h * 0.3, w / 2 - 6, h * 0.28, PAL.green);
    label(c, 'CÂY', w / 2, h * 0.75, 22); } }),
  l6_bird_nest: block(90, 46, PAL.woodDark, 'Ổ CHIM', { shape: 'ellipse', size: 16 }),
  l6_glove_black_idle: block(110, 140, PAL.black, 'GĂNG\nTAY', { r: 30, size: 16, color: PAL.white, draw: (c, w) => {
    el(c, w * 0.32, 14, 9, 14, PAL.black, null); el(c, w * 0.68, 14, 9, 14, PAL.black, null); } }),
  l6_glove_black_fallen: block(140, 60, PAL.black, 'GĂNG RƠI', { size: 14, color: PAL.white }),
  l6_shed: block(560, 541, null, '', { draw: (c, w, h) => {      // G6-17: kho 560 × 541 (mặt mái y 6, mép mái y 85)
    rr(c, 18, 74, w - 36, h - 78, PAL.wood, 8); rr(c, w / 2 + 60, h - 250, 130, 246, PAL.woodDark, 6);
    c.beginPath(); c.moveTo(-2, 85); c.lineTo(40, 6); c.lineTo(w - 14, 6); c.lineTo(w, 85); c.closePath();
    c.fillStyle = PAL.tin; c.fill(); c.lineWidth = 4; c.strokeStyle = PAL.brown; c.stroke();
    label(c, 'MÁI KHO', w / 2, 46, 26); label(c, 'NHÀ KHO GỖ', w / 2 - 90, h * 0.55, 26); } }),
  l6_shed_chimney: block(92, 184, PAL.red, 'ỐNG\nKHÓI', { r: 6, size: 19 }),
  // G6-9: dáng Mun mới rộng 200–220 (cùng tỉ lệ bộ Mun mặt tròn).
  mun_roof_crouch: block(210, 130, null, '', { draw: munBody('MUN rạp') }),
  mun_roof_crouch_ears_up: block(210, 130, null, '', { draw: munBody('MUN rạp, tai dựng') }),
  mun_roof_edge: block(210, 160, null, '', { draw: munBody('MUN ló mép') }),
  mun_step_down: block(210, 190, null, '', { draw: munBody('MUN bước') }),
  mun_jump_up: block(200, 230, null, '', { draw: munBody('MUN nhảy lên') }),
  mun_eat: block(210, 170, null, '', { draw: munBody('MUN ăn') }),
  mun_sit_look: block(200, 236, null, '', { draw: munBody('MUN nhìn') }),
  l6_table: block(320, 228, PAL.wood, 'BÀN', { r: 8, ly: 0.4, draw: (c, w, h) => rr(c, 3, 3, w - 6, 50, PAL.woodDark, 8) }),
  l6_picnic_basket_closed: block(140, 115, PAL.yellow, 'GIỎ\nPICNIC', { size: 16 }),
  l6_picnic_basket_open: block(140, 130, PAL.yellow, 'GIỎ MỞ', { size: 16, draw: (c, w) => rr(c, 6, 0, w - 12, 18, PAL.cream, 6) }),
  l6_bone: block(110, 48, PAL.cream, 'XƯƠNG', { r: 18, size: 15 }),
  l6_sausage: block(110, 44, PAL.red, 'XÚC XÍCH', { r: 16, size: 13 }),
  // G6-9: Lu ngồi rộng ≈ 300 (to hơn Mun rõ), chuồng to theo.
  // A6-2: chuồng 340 × 300, cửa rộng ≈ 220 cho Lu chui vừa.
  // G6-13: chuồng 250 × 220 (vừa đủ Lu chui), cửa ≈ 160.
  l6_dog_house: block(265, 235, PAL.red, 'CHUỒNG LU', { size: 20, draw: (c, w, h) => el(c, w / 2, h * 0.66, 85, 72, PAL.black, null), ly: 0.18 }),
  l6_dog_house_front: block(265, 235, null, '', { draw: (c, w, h) => {   // khung vòm cửa chuồng, lớp trên đầu Lu (A6-1)
    c.beginPath(); c.ellipse(w / 2, h * 0.66, 91, 78, 0, Math.PI, 0); c.lineWidth = 11; c.strokeStyle = '#c86a5c'; c.stroke(); } }),
  // G6-16: Lu ngồi rộng 230 (≈1,1 lần Mun), các dáng khác co cùng tỉ lệ (×1,07 so với G6-13). Chuồng 265×235.
  l6_dog_bark: block(230, 201, null, '', { draw: dogBody('LU sủa') }),
  l6_dog_run: block(288, 202, null, '', { draw: dogBody('LU chạy') }),
  l6_dog_run_bone: block(245, 172, null, '', { draw: dogBody('LU ngậm xương') }),
  l6_dog_chew: block(172, 121, null, '', { draw: (c, w, h) => {   // G6-3: chỉ đầu Lu thò ra cửa chuồng, ngậm xương
    el(c, w / 2, h * 0.5, w * 0.36, h * 0.4, PAL.dog); el(c, w * 0.22, h * 0.25, w * 0.1, h * 0.2, '#c9944a');
    el(c, w * 0.78, h * 0.25, w * 0.1, h * 0.2, '#c9944a'); rr(c, w * 0.2, h * 0.72, w * 0.6, h * 0.2, PAL.cream, 8);
    label(c, 'LU gặm', w / 2, h * 0.48, 17); } }),
  l6_dog_beg: block(216, 244, null, '', { draw: dogBody('LU chồm') }),
  l6_dog_belly: block(259, 129, null, '', { draw: dogBody('LU khoe bụng', 'lie') }),
  l6_veggie_bed: block(330, 170, PAL.green, 'BỤI RAU', { r: 30 }),
  l6_watering_can: block(110, 120, PAL.sky, 'BÌNH\nTƯỚI', { size: 15 }),
  l6_barrel: block(170, 350, PAL.sky, 'PHUY\nNƯỚC', { r: 18, size: 20 }),
  l6_toolbox: block(170, 95, PAL.red, 'HỘP DỤNG CỤ', { r: 6, size: 14, draw: (c, w) => rr(c, w / 2 - 22, -2, 44, 12, PAL.gray, 4) }),
  l6_crate: block(190, 255, PAL.wood, 'THÙNG\nGỖ', { r: 6, size: 19 }),
  l6_stool: block(132, 230, PAL.woodDark, 'GHẾ\nĐẨU', { r: 6, size: 18 }),
};

export class Level6 extends ObjectLevel {
  constructor() { super('Level6'); }

  get levelNo() { return 6; }
  get fallbacks() { return FB; }
  get fallbackCanvas() { return true; }
  get defaultPos() { return DEF; }
  // mun_run, chuông gió: ảnh dùng lại từ L5, cùng cỡ L5. Cây (A6-11) phóng như demo: ngọn y ≈ 120, ổ chim nằm trên cành ngang phải.
  // G6-21: Mun trên mái và lúc xuống ×0,85 (cùng cỡ Mun lúc chạy, lúc ăn; khớp demo).
  get fitDefaults() {
    return { mun_run: 320, mun_pounce: 185, l5_wind_chime: 60, l6_tree: 430,
      mun_roof_crouch: 214, mun_roof_crouch_ears_up: 218, mun_roof_edge: 256, mun_step_down: 246 };
  }
  get rewardFish() { return 30 + 5 * this.secrets; }         // +5 mỗi bí mật (ổ chim, bình tưới)
  get suaHand() { return false; }
  get bubblePop() { return { peak: 0.9, up: 260, rest: 0.7, down: 160 }; }
  get introBubbleAt() { return [380, 700 + this.Y0]; }       // G6-7: trên đầu nhân vật, lệch trái, không che mái kho
  get introCallLater() { return true; }                      // G6-7: diễn Mun leo lên mái xong mới tới nhân vật gọi
  get introRise() { return true; }                           // nhân vật trồi lên từ mép dưới
  get introLockMax() { return 12000; }                        // dự phòng mở khoá: cảnh diễn ≈ 3,9 giây + nhân vật gọi ≈ 4,7 giây

  resetLevel() {
    Object.assign(this, { secrets: 0, dogState: 'bark', placed: {}, sausageOn: false, munHidden: false, nestDone: false, canDone: false,
      gloveDown: false, introT0: 0 });
  }

  // Mun nằm rạp trên mái: tai cụp khi Lu còn sủa, tai dựng khi Lu đã gặm (G6-9).
  get crouchKey() { return this.dogState === 'chew' ? 'mun_roof_crouch_ears_up' : 'mun_roof_crouch'; }

  buildRoom() {
    this.buildBg('l6_bg_backyard'); // nền riêng L6 (A6-12): sân L5 bỏ cửa quán, bậc thềm, dư hai bên cho khung 3:4 (1366x2304)
    const P = (k) => this.P(k);
    this.addProps([
      { name: 'tree', key: 'l6_tree', depth: 2, tap: 'wiggle', wiggle: [1.5, 2, 300], sfx: 'sfx_leaves' },
      { name: 'nest', key: 'l6_bird_nest', depth: 2.5, zone: D.zone + 3, tap: () => this.nestTap() },
      { name: 'chime', key: 'l5_wind_chime', depth: 3, zone: D.zone + 3, tap: () => this.chimeTap() },
      { name: 'glove', key: 'l6_glove_black_idle', depth: 4, zone: D.zone + 3, tap: () => this.gloveTap() },
      { name: 'shed', key: 'l6_shed', depth: 5, tap: 'wiggle', wiggle: [0.6, 2, 240], sfx: 'sfx_tap' },
      { name: 'chimney', key: 'l6_shed_chimney', depth: 7, zone: false },
      { name: 'house', key: 'l6_dog_house', depth: 8, zone: D.zone + 2, tap: () => this.houseTap() },
      { name: 'houseFront', key: 'l6_dog_house_front', depth: 14.2, zone: false }, // khung cửa chuồng trên đầu Lu (A6-1)
      { name: 'table', key: 'l6_table', depth: 9, tap: 'wiggle', wiggle: [1.5, 2, 240], sfx: 'sfx_tap' },
      { name: 'basket', key: 'l6_picnic_basket_closed', depth: 9.5, zone: D.zone + 3, tap: () => this.basketTap() },
      { name: 'veggie', key: 'l6_veggie_bed', depth: 10, zone: D.zone + 2, tap: () => this.veggieTap() },
      { name: 'can', key: 'l6_watering_can', depth: 10.5, zone: D.zone + 3, tap: () => this.canTap() },
      { name: 'barrel', key: 'l6_barrel', depth: 11, zone: D.zone + 4, tap: (p) => this.stepTap(p) },
      { name: 'toolbox', key: 'l6_toolbox', depth: 11.6, zone: D.zone + 5, tap: (p) => this.stepTap(p) },
      { name: 'crate', key: 'l6_crate', depth: 12, zone: D.zone + 4, tap: (p) => this.stepTap(p) },
      { name: 'stool', key: 'l6_stool', depth: 13, zone: D.zone + 4, tap: (p) => this.stepTap(p) },
    ]);
    this.groundDepths();
    // Mun trên mái (lớp dưới ống khói để lùi ra sau), Lu, món nhặt, xúc xích trên bàn.
    this.mun = this.img('mun_roof_crouch', ...P('mun_roof_crouch'), this.shed.depth + 0.01).setVisible(false);
    this.zone('mun', this.artRect(this.mun), D.zone + 5).disableInteractive();
    this.dog = this.img('l6_dog_bark', -300, P('l6_dog_bark')[1], 14);
    this.zone('dog', this.artRect(this.dog), D.zone + 4).disableInteractive();
    this.bone = this.img('l6_bone', 0, 0, this.veggie.depth + 0.01).setVisible(false);
    this.sausage = this.img('l6_sausage', 0, 0, this.basket.depth + 0.01).setVisible(false);
    this.treat = this.img('l6_sausage', 0, 0, this.table.depth + 0.02).setVisible(false); // xúc xích đặt trên bàn (G6-5)
    this.player = this.img('player_call', ...P('player_call'), D.player).setVisible(false);

    // 4 món xếp đường: kéo trong cảnh (hàm chung sceneDraggable, objects.js). Mỗi chỗ chỉ nhận đúng món; hộp dụng cụ sau phuy.
    for (const name of STEPS) {
      this.sceneDraggable(name, {
        when: () => !this.placed[name],
        spots: () => (this.placed[name] || (name === 'toolbox' && !this.placed.barrel) ? [] : [{ id: name, at: SPOT[name] }]),
        sfx: { barrel: 'l6_sfx_barrel_roll', toolbox: 'l6_sfx_wood_clack', crate: 'l6_sfx_wood_clack', stool: 'l6_sfx_stool' }[name],
        place: () => this.stepPlaced(name),
      });
    }
  }

  // Chỗ đứng trên mặt bậc / mặt bàn (toạ độ thế giới), đo theo phần vẽ thật của sprite.
  standOn(name) { const s = this[name]; return [s.x, this.artRect(s).top + STAND[name]]; }
  get tableTreat() { const [x, y] = this.standOn('table'); return [x + TREAT_DX, y]; }

  // ---------- lớp trước sau theo chiều sâu (G6-13) ----------
  // Đồ đứng trên mặt sân và con vật đang đi trên mặt sân: lớp theo y chân (y-sort), chân thấp hơn (gần người chơi) vẽ trước.
  // Đồ nằm trên đồ khác theo lớp đồ đỡ nó (giỏ, xúc xích trên bàn; hộp dụng cụ trên phuy; Mun trên mái, trên bậc, trên bàn).
  yDepth(y) { return 5 + y / 100; }

  ySort(s, off = 0) { return s.setDepth(this.yDepth(s.y) + off); }

  groundDepths() {
    this.shed.setDepth(this.yDepth(900));                  // phuy ở A (chân 968, demo G6-21) và Lu sủa trước kho vẽ trước kho
    this.chimney.setDepth(this.shed.depth + 0.02);         // ống khói trên Mun nằm mái (Mun = kho + 0,01)
    for (const n of ['table', 'veggie', 'can', 'barrel', 'toolbox', 'crate', 'stool', 'house']) this.ySort(this[n]);
    this.basket.setDepth(this.table.depth + 0.01);
    this.houseFront.setDepth(this.house.depth + 0.03);     // khung cửa trên đầu Lu (Lu gặm = chuồng + 0,01)
  }

  // ---------- mở màn (G6-6, G6-7): chưa có nhân vật; Lu đuổi Mun chạy một vòng quanh sân (2,5 giây); hết vòng Mun nhảy
  // liên tiếp bàn → thùng gỗ → cột điện (cột dây phơi có sẵn trong nền, bám leo) → mép mái, mỗi nhịp 0,35 giây; Lu chạy tới
  // dưới mái ngồi sủa. Mun nằm rạp trên mái rồi nhân vật mới trồi lên gọi, bong bóng bật ra (introCall); khoá chạm tới hết.
  onIntro() {
    const m = this.mun, d = this.dog, loop = new Phaser.Curves.Path(...INTRO_LOOP[0]);
    for (const [x, y] of INTRO_LOOP.slice(1)) loop.lineTo(x, y);
    this.introT0 = this.time.now;
    this.applyKey(m, 'mun_run');
    this.applyKey(d, 'l6_dog_run'); // G6-9: dáng chạy đuổi
    m.setVisible(true);
    const along = (s, k) => { const p = loop.getPoint(Phaser.Math.Clamp(k, 0, 1)); this.faceToward(s, p.x); this.ySort(s.setPosition(p.x, p.y)); };
    along(m, 0);
    this.tweens.addCounter({ from: 0, to: 1, duration: 2500, onUpdate: (tw) => {
      const k = tw.getValue();
      along(m, k);
      along(d, k - 0.14); // Lu đuổi sát sau
    }, onComplete: () => {
      // G6-21: bỏ dáng bám cột. Mun vồ lên mặt thùng gỗ rồi vọt theo đường cong lên mép mái (dáng vồ L5, chưa có thì dáng chạy).
      const cr = this.artRect(this.crate), top = [this.crate.x, cr.top + STAND.crate];
      const jump = this.has('mun_pounce') ? 'mun_pounce' : 'mun_run';
      m.setDepth(D.player - 1); // nhảy lên đồ: vẽ trên mọi đồ trong sân
      this.dogBrake();
      this.applyKey(m, jump);
      this.moveTo(m, ...top, 380, { ease: 'Sine.inOut', arc: 120, onComplete: () => {
        this.squash(m);
        this.dogTurnTo(ROOF_EDGE[0], true); // Mun vọt qua phía trên đầu Lu: Lu quay theo, sủa
        this.time.delayedCall(120, () => this.moveTo(m, ...ROOF_EDGE, 420, { ease: 'Sine.inOut', arc: 140, onComplete: () => this.introLanded() }));
      } });
    } });
  }

  // G6-14: Mun bắt đầu nhảy lên bàn thì Lu phanh lại ở chân bàn, trượt nhẹ, đứng ngẩng nhìn lên (dáng sủa).
  dogBrake() {
    const d = this.dog;
    this.tweens.killTweensOf(d);
    this.moveTo(d, ...LU_BRAKE, 280, { ease: 'Quad.out', onUpdate: () => this.ySort(d), onComplete: () => {
      this.applyKey(d, 'l6_dog_bark');
      this.dogTurnTo(this.mun.x);
      this.squash(d);
    } });
  }

  // Lu quay mặt theo Mun (x), ngẩng nhìn; bark = sủa một tiếng, nảy nhẹ.
  dogTurnTo(x, bark = false) {
    const d = this.dog;
    this.faceToward(d, x); // đứng yên quay đầu nhìn theo Mun (ngoại lệ có chủ ý, G6-14)
    if (bark) { this.sfx('l6_sfx_dog_bark', 0.7); this.hop(d, 14, 220); }
  }

  // Mun nằm rạp trên mái; rồi Lu mới chạy tới chỗ ngồi sủa dưới mái (G6-14), ngồi sủa xong nhân vật mới trồi lên gọi.
  introLanded() {
    const m = this.mun, d = this.dog;
    this.applyKey(m, this.crouchKey);
    this.face(m.setAngle(0), false).setDepth(this.shed.depth + 0.01).setPosition(...this.P('mun_roof_crouch'));
    this.squash(m);
    this.zoneTo('mun', m);
    this.zones.mun.setInteractive();
    const [sx, sy] = this.P('l6_dog_bark');
    this.tweens.killTweensOf(d);
    this.applyKey(d, 'l6_dog_run');
    this.moveTo(d, sx, sy, 650, { onUpdate: () => this.ySort(d), onComplete: () => {
      this.applyKey(d, 'l6_dog_bark');
      this.ySort(this.faceToward(d, ROOF_EDGE[0])); // ngồi ngẩng nhìn lên mép mái
      this.sfx('l6_sfx_dog_bark');
      this.hop(d, 18, 260);
      this.zoneTo('dog', d);
      this.zones.dog.setInteractive();
      this.fidget(d, { min: 2400, max: 3800, sfx: 'l6_sfx_dog_bark', gain: 0.5, until: () => this.dogState !== 'bark' });
      this.time.delayedCall(300, () => this.introCall()); // G6-7: giờ nhân vật mới trồi lên gọi
    } });
  }

  // Xuống một bậc (G6-2, G6-21): quay mặt theo hướng đi, ra mép bậc, dừng nhìn xuống một nhịp, nhảy vồng mềm (cung thấp,
  // ease in-out), đáp nhún nhẹ, chân đúng mặt bậc. Cùng một dáng, một cỡ suốt đoạn.
  stepDown(s, [x, y], done) {
    this.faceToward(s, x);
    const dir = x < s.x ? -1 : 1, look = dir * 7;
    this.moveTo(s, s.x + dir * 18, s.y, 180, { ease: 'Sine.out', onComplete: () => {
      this.tweens.add({ targets: s, angle: look, duration: 160, yoyo: true, hold: 220, ease: 'Sine.inOut', onComplete: () => {
        s.setAngle(0);
        this.moveTo(s, x, y, 460, { ease: 'Sine.inOut', arc: STEP_ARC, onComplete: () => {
          this.tweens.add({ targets: s, scaleY: s.baseY * 0.9, scaleX: s.base * 1.05, duration: 90, yoyo: true, ease: 'Quad.out',
            onComplete: () => { s.setScale(s.base, s.baseY); done(); } });
          this.sfx('l4_sfx_land_tap', 0.6);
        } });
      } });
    } });
  }

  // ---------- chạm ----------
  handleLevel(name) {
    if (name === 'mun') this.munTap();
    else if (name === 'dog') this.dogTap();
  }

  // Mun Lẩn tránh: trượt ra sau ống khói, 2 giây sau ló lại.
  munTap() {
    if (this.phase !== 'search' || this.busy.mun) return;
    this.busy.mun = true;
    const m = this.mun, home = this.P('mun_roof_crouch');
    this.sfx('mun_sfx_meow', 0.4);
    this.moveTo(m, ...BEHIND_CHIMNEY, 300, { ease: 'Quad.in', onComplete: () => {
      m.setVisible(false);
      this.time.delayedCall(2000, () => {
        if (this.phase !== 'search') return; // đang xuống ăn: revealDown đã đặt lại Mun
        m.setVisible(true);
        this.moveTo(m, ...home, 300, { ease: 'Quad.out', onComplete: () => (this.busy.mun = false) });
      });
    } });
  }

  // Lu còn rảnh: vẫy đuôi sủa to hơn, Mun nằm rạp; bong bóng khúc xương. Đang gặm: lăn khoe bụng.
  dogTap() {
    if (this.dogState === 'chew') { this.houseTap(); return; }
    if (this.dogState !== 'bark' || this.busy.dog) return;
    this.hop(this.dog, 22, 280);
    this.sfx('l6_sfx_dog_bark');
    if (!this.busy.mun) this.squash(this.mun);
    this.thinkBone();
  }

  thinkBone() {
    const r = this.artRect(this.dog);
    this.thinkBubble('l6_bone', r.right + 30, r.top - 40, { w: 170, iconK: 0.55 });
  }

  // Lu đang gặm trong chuồng (G6-3): lăn ra trước chuồng khoe bụng 1 giây rồi chui lại vào, thò đầu gặm tiếp.
  houseTap() {
    if (this.dogState !== 'chew' || this.busy.dog) { this.wiggle(this.house, 2, 2, 240); this.sfx('sfx_tap'); return; }
    this.busy.dog = true;
    this.sfx('l6_sfx_dog_whine');
    const d = this.dog, door = this.P('l6_dog_chew');
    this.applyKey(d, 'l6_dog_belly');
    d.setPosition(...door);
    this.ySort(d, 0.02);
    this.moveTo(d, ...this.P('l6_dog_belly'), 250, { ease: 'Quad.out', onUpdate: () => this.ySort(d, 0.02), onComplete: () => {
      this.squash(d);
      this.time.delayedCall(1000, () => this.moveTo(d, ...door, 250, { ease: 'Quad.in', onComplete: () => {
        this.applyKey(d, 'l6_dog_chew');
        d.setPosition(...door).setDepth(this.house.depth + 0.01);
        this.zoneTo('dog', d);
        this.busy.dog = false;
      } }));
    } });
  }

  // 🔑 Bụi rau: lá rẽ ra, khúc xương bay vào túi. Lấy rồi thì chỉ lắc.
  veggieTap() {
    this.wiggle(this.veggie, 3, 2, 280);
    this.sfx('sfx_leaves');
    if (this.got.l6_bone) return;
    const r = this.artRect(this.veggie);
    this.bone.setPosition(r.centerX, r.top + 20).setVisible(true);
    this.pickUp('l6_bone', this.bone, 'veggie');
    this.zones.veggie.setInteractive(); // vẫn lắc khi chạm lại
  }

  // 🔑 Giỏ picnic: nắp bật, xúc xích bay vào túi.
  basketTap() {
    if (this.got.l6_sausage) { this.wiggle(this.basket, 2, 2, 240); this.sfx('sfx_tap'); return; }
    this.sfx('l6_sfx_basket');
    this.swap(this.basket, 'l6_picnic_basket_open');
    const r = this.artRect(this.basket);
    this.sausage.setPosition(r.centerX, r.top + 10).setVisible(true);
    this.pickUp('l6_sausage', this.sausage, 'basket');
    this.zones.basket.setInteractive();
  }

  // 🎭 Găng tay đen trên hàng rào: rơi xuống; Lu rảnh thì chạy ra ngậm rồi bỏ lại.
  gloveTap() {
    if (this.gloveDown || this.busy.glove) { this.wiggle(this.glove, 3, 1, 200); return; }
    this.busy.glove = true;
    this.gloveDown = true;
    this.sfx('l6_sfx_glove_flop');
    this.tweens.add({ targets: this.glove, y: GLOVE_FALLEN[1], duration: 450, ease: 'Bounce.out', onComplete: () => {
      this.applyKey(this.glove, 'l6_glove_black_fallen');
      this.glove.setPosition(...GLOVE_FALLEN);
      this.zoneTo('glove', this.glove);
      this.busy.glove = false;
      this.dogFetchGlove();
    } });
  }

  // G6-4, G6-21: Lu rảnh chạy tới chỗ găng, cúi ngửi ngửi (đầu nhấp, khịt khịt, đuôi vẫy) khoảng 1 giây rồi chạy về chỗ cũ.
  // Găng nằm yên. Lu đang gặm trong chuồng thì chỉ ngẩng đầu nhìn.
  dogFetchGlove() {
    const d = this.dog;
    if (this.dogState === 'chew') { if (!this.busy.dog) this.hop(d, 14, 260); return; }
    if (this.dogState !== 'bark' || this.busy.dog) return;
    this.busy.dog = true;
    this.tweens.killTweensOf(d);
    const home = this.P('l6_dog_bark');
    d.setAngle(0);
    this.applyKey(d, 'l6_dog_run');
    this.moveTo(d, ...GLOVE_DOG, 550, { onUpdate: () => this.ySort(d), onComplete: () => {
      this.applyKey(d, 'l6_dog_bark');
      this.faceToward(d, GLOVE_FALLEN[0]);
      this.sfx('l6_sfx_dog_sniff');
      // Cúi ngửi: đầu nhấp xuống (nghiêng về phía găng, co dọc nhẹ) 4 nhịp; vẫy đuôi = lắc mông nhẹ.
      const lean = d.flipX ? -6 : 6;
      this.tweens.add({ targets: d, angle: lean, scaleY: d.baseY * 0.94, duration: 120, yoyo: true, repeat: 3, ease: 'Sine.inOut',
        onComplete: () => d.setAngle(0).setScale(d.base, d.baseY) });
      this.time.delayedCall(1050, () => {
        this.applyKey(d, 'l6_dog_run');
        this.moveTo(d, ...home, 550, { onUpdate: () => this.ySort(d), onComplete: () => {
          this.applyKey(d, 'l6_dog_bark');
          this.faceToward(d, this.mun.x); // về chỗ: đứng yên ngẩng nhìn Mun
          this.zoneTo('dog', d);
          this.busy.dog = false;
        } });
      });
    } });
  }

  // 🎁 Ổ chim: lắc, 5 cá khô (một lần).
  nestTap() {
    this.wiggle(this.nest, 6, 2, 300);
    this.sfx('l6_sfx_bird');
    if (this.nestDone) return;
    this.nestDone = true;
    this.secrets++;
    const r = this.artRect(this.nest);
    this.fishBurst(r.centerX, r.top, 5);
  }

  // 🎁 Bình tưới: nghiêng, nước chảy cùng 5 cá khô (một lần).
  canTap() {
    if (this.busy.can) return;
    this.busy.can = true;
    this.sfx('l6_sfx_water');
    const c = this.can, r = this.artRect(c);
    this.tweens.add({ targets: c, angle: -35, duration: 220, yoyo: true, hold: 500, onComplete: () => (this.busy.can = false) });
    for (let i = 0; i < 5; i++) {
      const drop = this.add.circle(r.left + 6, r.top + 20, 5, 0x9fd0ef).setDepth(c.depth + 0.01);
      this.tweens.add({ targets: drop, x: drop.x - 40 - i * 6, y: r.bottom - 4, alpha: 0, delay: 150 + i * 70, duration: 380, onComplete: () => drop.destroy() });
    }
    if (this.canDone) return;
    this.canDone = true;
    this.secrets++;
    this.fishBurst(r.centerX, r.top, 5);
  }

  // ✨ Chuông gió: đung đưa leng keng; Mun trên mái vểnh tai.
  chimeTap() {
    if (this.busy.chime) return;
    this.busy.chime = true;
    this.sfx('l5_sfx_chime');
    this.tweens.chain({ targets: this.chime, tweens: [
      { angle: 14, duration: 160 }, { angle: -10, duration: 220 }, { angle: 6, duration: 200 }, { angle: 0, duration: 160 },
    ], onComplete: () => (this.busy.chime = false) });
    if (this.phase === 'search' && this.mun.visible && !this.busy.mun) this.hop(this.mun, 10, 240);
  }

  // Chạm món xếp đường (không kéo): lắc nhẹ.
  stepTap(p) {
    this.wiggle(p.s, 2, 2, 220);
    this.sfx('sfx_tap');
  }

  // ---------- xếp đường ----------
  stepPlaced(name) {
    this.placed[name] = true;
    // Lớp ở chỗ đặt (G6-13): theo y chân; hộp dụng cụ nằm trên phuy.
    if (name === 'toolbox') this.toolbox.setDepth(this.barrel.depth + 0.01); else this.ySort(this[name]);
    this.munPeek(name === 'barrel' ? 'water' : 'look');
    this.touch();
    if (this.allSteps() && this.sausageOn) this.time.delayedCall(700, () => this.revealDown());
  }

  allSteps() { return STEPS.every((k) => this.placed[k]); }

  // Mỗi bậc mới: Mun bò ra mép mái nhìn xuống, run, rồi lùi vào (Lu còn sủa thì Mun chỉ nằm rạp, không ra mép).
  munPeek(why = 'look', ms = 1200) {
    const m = this.mun;
    if (this.phase !== 'search' || this.busy.mun || !m.visible) return;
    if (this.dogState === 'bark') { this.squash(m); return; }
    this.busy.mun = true;
    const home = [m.x, m.y];
    this.applyKey(m, 'mun_roof_edge');
    m.setPosition(...ROOF_EDGE);
    this.tweens.add({ targets: m, angle: { from: -3, to: 3 }, duration: 70, yoyo: true, repeat: Math.round(ms / 140) - 1, onComplete: () => {
      m.setAngle(0);
      if (why === 'water') this.hop(m, 14, 200); // thấy nước sóng sánh: giật mình lùi
      this.applyKey(m, this.crouchKey);
      m.setPosition(...home);
      this.busy.mun = false;
    } });
    if (why === 'meow') this.sfx('mun_sfx_meow', 0.6);
  }

  // ---------- thả đồ từ túi ----------
  get dropSpots() {
    return [
      { when: () => this.dogState === 'bark', rect: () => this.padRect(this.artRect(this.dog), 40), want: () => 'l6_bone',
        place: (it) => this.giveBone(it) },
      // Món kéo nằm trên ngón tay 70px: vùng bàn kéo dài lên trên 70 và gộp cả ghế đẩu ở chỗ C (đứng sát mép phải bàn).
      { when: () => !this.sausageOn, rect: () => this.tableDropRect(), want: () => 'l6_sausage',
        place: (it) => this.sausageToTable(it) },
    ];
  }

  tableDropRect() {
    let r = this.padRect(this.artRect(this.table), 40);
    if (this.placed.stool) r = Phaser.Geom.Rectangle.Union(r, this.padRect(this.artRect(this.stool), 20));
    return new Phaser.Geom.Rectangle(r.x, r.y - 70, r.width, r.height + 70);
  }

  padRect(r, p) { return new Phaser.Geom.Rectangle(r.x - p, r.y - p, r.width + 2 * p, r.height + 2 * p); }

  // Xúc xích thả chỗ khác (đất, thùng gỗ, ghế…): bay về túi, bàn lấp lánh.
  onBagDrop(it, x, y) {
    if (super.onBagDrop(it, x, y)) return true;
    if (it.key !== 'l6_sausage') return false;
    this.bagReturn(it);
    this.sparkle(this.table);
    return true;
  }

  // Lu ngậm xương chạy về chuồng, nằm gặm, thôi sủa. Mun ngóc đầu.
  giveBone(it) {
    this.bagRemove(it, false);
    this.dogState = 'run';
    this.zones.dog.disableInteractive();
    this.tweens.killTweensOf(this.dog);
    this.sfx('l6_sfx_dog_happy');
    this.applyKey(this.dog, 'l6_dog_run_bone');
    this.dog.setAngle(0);
    const [cx, cy] = this.P('l6_dog_chew'), d = this.dog;
    // G6-21: đi sau chuồng, xuống ngoài mép phải chuồng, vòng ra trước cửa (đoạn ngang / dọc không chồng thân chuồng), chui vào.
    this.walkPath(d, DOG_DOOR, 0.9, () => {
      this.faceToward(d, cx);
      this.tweens.add({ targets: d, y: cy + 30, scaleX: d.base * 0.85, scaleY: d.baseY * 0.85, alpha: 0.4, duration: 220, ease: 'Quad.in', onComplete: () => {
      d.setAlpha(1);
      d.setPosition(cx, cy);
      this.applyKey(this.dog, 'l6_dog_chew');
      this.dog.setDepth(this.house.depth + 0.01); // đầu Lu trong cửa chuồng, dưới khung cửa
      this.dogState = 'chew';
      if (!this.busy.mun) this.applyKey(this.mun, this.crouchKey); // Mun dựng tai
      this.zoneTo('dog', this.dog);
      this.zones.dog.setInteractive();
      this.chewLoop = this.time.addEvent({ delay: 1600, loop: true, callback: () => { if (!this.frozen) this.sfx('l6_sfx_dog_chew', 0.5); } });
      this.time.delayedCall(300, () => this.munPeek('look', 1000));
      } });
    });
    this.touch();
  }

  // Đi theo các điểm (đáy), tốc độ px/ms, quay mặt theo hướng đi, lớp theo chân.
  walkPath(s, pts, speed, done) {
    const [p, ...rest] = pts;
    if (!p) { done && done(); return; }
    const ms = Math.max(120, Math.hypot(p[0] - s.x, p[1] - s.y) / speed);
    this.moveTo(s, p[0], p[1], ms, { ease: 'Linear', onUpdate: () => this.ySort(s), onComplete: () => this.walkPath(s, rest, speed, done) });
  }

  // Thả xúc xích lên bàn (G6-5). Lu rảnh: Lu chồm đòi, xúc xích về túi. Đủ 4 bậc: Mun xuống ăn. Thiếu: Mun ra mép kêu, xúc xích ở lại.
  sausageToTable(it) {
    if (this.dogState !== 'chew') { this.dogBeg(it); return; }
    this.bagRemove(it, false);
    this.sausageOn = true;
    this.treat.setPosition(...this.tableTreat).setVisible(true);
    this.squash(this.treat);
    this.sfx('l6_sfx_sausage_drop');
    if (this.allSteps()) this.time.delayedCall(400, () => this.revealDown());
    else this.time.delayedCall(300, () => this.munPeek('meow', 1400));
  }

  dogBeg(it) {
    this.bagReturn(it);
    if (this.busy.dog) return;
    this.busy.dog = true;
    const d = this.dog, home = [d.x, d.y];
    this.tweens.killTweensOf(d);
    this.moveTo(d.setAngle(0), ...DOG_BEG, 350, { ease: 'Quad.out', onUpdate: () => this.ySort(d), onComplete: () => {
      this.applyKey(d, 'l6_dog_beg');
      this.sfx('l6_sfx_dog_bark');
      this.hop(d, 16, 240);
      this.thinkBone();
      this.time.delayedCall(1100, () => {
        this.applyKey(d, 'l6_dog_bark');
        this.moveTo(d, ...home, 400, { onUpdate: () => this.ySort(d), onComplete: () => {
          this.faceToward(d, this.mun.x);
          this.busy.dog = false;
        } });
      });
    } });
  }

  // ---------- lộ diện: Mun xuống từng bậc tới ghế ăn ----------
  revealDown() {
    if (this.phase !== 'search') return;
    this.phase = 'descend'; // đang xuống: không nhận chạm Mun, không gợi ý
    this.handHide();
    this.handHide('paw');
    this.zones.mun.disableInteractive();
    this.tweens.killTweensOf(this.mun);
    const m = this.mun.setVisible(true).setAngle(0);
    this.applyKey(m, this.crouchKey);
    m.setPosition(...this.P('mun_roof_crouch')).setDepth(D.player - 1); // đang xuống: vẽ trên mọi đồ
    // Mũi khịt khịt (0,5 giây) rồi bò ra mép mái.
    this.tweens.add({ targets: m, scaleY: m.baseY * 1.08, duration: 120, yoyo: true, repeat: 1, onComplete: () => {
      this.applyKey(m, 'mun_roof_edge');
      this.moveTo(m, ...ROOF_EDGE, 400, { onComplete: () => {
        this.applyKey(m, 'mun_step_down');
        this.stepDown(m, this.standOn('toolbox'), () => {
          // Ở bậc A ngoái lại nhìn người chơi 0,5 giây.
          this.face(m, !m.faceLeft); // quay lại phía vừa đi
          this.sfx('mun_sfx_meow', 0.5);
          this.time.delayedCall(500, () => {
            this.stepDown(m, this.standOn('crate'), () => this.stepDown(m, this.standOn('stool'), () => this.jumpToTable()));
          });
        });
      } });
    } });
  }

  // G6-5, G6-19: từ ghế bước ngang sang mặt bàn (ngang mặt ghế), đáp cạnh giỏ. Lộ diện ngay khi Mun lên bàn.
  jumpToTable() {
    const m = this.mun;
    this.tweens.add({ targets: m, scaleY: m.baseY * 0.92, duration: 120, yoyo: true, onComplete: () => {
      // G6-19: mặt bàn ngang mặt ghế: bước ngang sang (vồng thấp như xuống bậc), không nhảy phốc.
      const [tx, ty] = this.tableTreat;
      this.hopTo(m, tx - EAT_DX, ty, 380, () => {
        this.sfx('l4_sfx_land_tap', 0.6);
        this.squash(m);
        m.setDepth(this.table.depth + 0.03); // ngồi trên bàn: trên bàn, giỏ, xúc xích
        this.phase = 'found';
        this.sua = m;
        this.sfx(this.catMeow);
        this.bubbleFound();
        this.glowOn(m);
        this.armMun();
        this.munEat();
      }, STEP_ARC);
    } });
  }

  // Ngấu nghiến xúc xích cạnh giỏ, liếm mép, ngẩng nhìn. Lu ngẩng đầu khỏi khúc xương (G6-3): Mun xù lông 0,5 giây rồi ngồi yên.
  munEat() {
    const m = this.mun;
    this.applyKey(m, 'mun_eat');
    this.face(m, false); // quay mặt về phía mặt bàn trống bên phải (giỏ ở bên trái)
    // Xúc xích ngay trước miệng, nằm trước Mun (không bị thân che) để thấy rõ đang ăn.
    this.treat.setPosition(m.x + EAT_MOUTH[0], m.y + EAT_MOUTH[1]).setDepth(m.depth + 0.01).setVisible(true);
    this.tweens.add({ targets: this.treat, scaleX: this.treat.base * 0.6, duration: 1500, ease: 'Sine.in' }); // ăn dần
    this.tweens.add({ targets: m, angle: { from: -4, to: 4 }, duration: 150, yoyo: true, repeat: 4, onComplete: () => {
      m.setAngle(0);
      this.treat.setVisible(false);
      this.applyKey(m, 'mun_sit_look');
      this.armMun();
      this.time.delayedCall(900, () => {
        if (this.phase !== 'found') return;
        this.hop(this.dog, 20, 300);
        this.sfx('l6_sfx_dog_happy', 0.6);
        this.tweens.add({ targets: m, scaleX: m.base * 1.2, scaleY: m.baseY * 1.2, duration: 120, yoyo: true, hold: 260 });
      });
    } });
  }

  armMun() {
    const b = this.artRect(this.mun);
    this.armSua(new Phaser.Geom.Rectangle(b.x - 30, b.y - 30, b.width + 60, b.height + 50));
  }

  beforeEnding() {
    if (this.chewLoop) this.chewLoop.remove();
  }

  // ---------- gợi ý ----------
  // Bước kế tiếp: bụi rau → cho Lu xương → giỏ picnic → món xếp đường còn thiếu (theo thứ tự) → xúc xích lên bàn.
  hintStep() {
    if (this.phase === 'found') return { sprite: this.mun };
    if (this.phase !== 'search') return null;
    if (!this.got.l6_bone) return { sprite: this.veggie };
    if (this.dogState === 'bark') { const it = this.bagItem('l6_bone'); return it ? { item: it, to: this.tipOf(this.dog) } : null; }
    if (!this.got.l6_sausage) return { sprite: this.basket };
    const k = STEPS.find((n) => !this.placed[n]);
    if (k) return { drag: k, to: this.sceneSpotCenter(k, SPOT[k]) };
    const it = this.bagItem('l6_sausage');
    return it ? { item: it, to: this.tableTreat } : null;
  }

  // 8 giây: chưa có xương thì Lu ngoái nhìn bụi rau; đã cho xương thì Mun nhìn xuống chỗ còn thiếu bậc.
  hint1() {
    if (this.dogState === 'bark' && !this.got.l6_bone && !this.busy.dog) {
      const d = this.dog;
      const left = d.faceLeft;
      this.faceToward(d, this.veggie.x); // đứng yên ngoái nhìn bụi rau rồi quay lại
      this.wiggle(d, 4, 2, 300);
      this.time.delayedCall(1000, () => this.face(d, left));
    } else if (this.dogState === 'chew') this.munPeek('look', 1000);
  }

  // 16 giây: đồ cần làm tiếp lấp lánh (icon trong túi thì nảy lên).
  idleSparkle() {
    const h = this.hintStep();
    if (!h) return;
    if (h.item) this.hop(h.item.s, 22, 300);
    else this.sparkle(h.drag ? this[h.drag] : h.sprite);
  }

  // 💡 bàn chân làm mẫu bước kế tiếp: chạm, kéo món trong túi, hoặc kéo món trong cảnh tới chỗ đặt.
  strongHint() {
    this.pressBulb();
    const h = this.hintStep();
    if (!h) return;
    if (h.item) this.handDrag(this.slotPos(h.item.i), h.to, 'hint', 'paw', 2);
    else if (h.drag) this.handDrag(this.tipOf(this[h.drag]), h.to, 'hint', 'paw', 2);
    else this.pawAt(this.tipOf(h.sprite));
  }

  update(time) { this.idleHints(time); }
}
