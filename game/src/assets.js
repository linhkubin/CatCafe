// Tìm asset: ảnh thật trong art/out/ (theo danh sách file của thư mục và art/out/anchors.json),
// thiếu thì dùng ảnh tạm trong game/placeholders/ (level 1) hoặc ảnh tạm vẽ bằng code (level 2).
// Vị trí và cỡ hiển thị đọc từ art/design-art-level<N>.md (bảng vị trí: | key | x | y | ... |).
// Server tĩnh phải liệt kê được thư mục (python -m http.server làm được), nhờ vậy không có lỗi 404 khi dò file.
// Bản build (game/tools/build_web.py -> game/dist/) đổi BUILT thành true: khi đó mọi thứ đọc từ manifest.json cạnh trang,
// không dò thư mục (dùng cho trang tĩnh như Artifact).
export const BUILT = false;

const ROOT = new URL('../', location.href).href;          // gốc dự án (game/ nằm ngay dưới)
const ART_OUT = ROOT + 'art/out/';
const PH = new URL('placeholders/', location.href).href;
const SPECS = { 1: ROOT + 'art/design-art-level1.md', 2: ROOT + 'art/design-art-level2.md', 3: ROOT + 'art/design-art-level3.md',
  4: ROOT + 'art/design-art-level4.md', 5: ROOT + 'art/design-art-level5.md' }; // L5: chưa có file (bản khối, QUY-TRINH bước 2)
const LEVELS = Object.keys(SPECS).map(Number);

// Dự phòng nếu không đọc được design-art level 1 (giá trị ở vòng 5). Level 2 có vị trí dự phòng trong level2.js.
const DEFAULT_POS = {
  l1_wall_clock_pendulum: [866, 470], l1_wall_clock_closed: [866, 182], l1_wall_clock_bird: [866, 320],
  l1_plant: [890, 1345], prop_butterfly: [960, 1080], l1_rug_flat: [512, 1055], l1_box_closed: [220, 1285],
  l1_pate_can_closed: [800, 893], l1_pate_can_open: [650, 1305], l1_pate_can_steam: [640, 1228],
  l1_sofa_cushion_bulge: [710, 900], l1_sofa_cushion_lifted: [710, 885], l1_pillow_white_idle: [308, 875],
  l1_curtain_closed: [285, 185], sua_sit_stare: [480, 1290], player_call: [490, 1445],
};

// Key theo màn: [key, thư mục]. 'common' tải ở Boot; mỗi màn chỉ tải phần của mình khi vào màn.
export const KEYS = {
  common: [
    ['sua_held', 'cats'], ['sua_face_icon', 'cats'], ['sua_run', 'cats'],
    ['player_call', 'player'], ['player_scratch_head', 'player'], ['player_surprised', 'player'], ['player_shrug', 'player'],
    ['player_hands_lift', 'player'],
    ['ui_speech_bubble', 'common'], ['ui_cat_head_dark', 'common'], ['ui_question_mark', 'common'], ['ui_question_mark_white', 'common'],
    ['ui_heart', 'common'], ['ui_hand_pointer', 'common'], ['ui_hint_paw', 'common'], ['ui_sparkle', 'common'],
    ['ui_bulb_button', 'common'], ['ui_dried_fish', 'common'], ['fx_pop', 'common'],
    ['ui_pause_button', 'common'], ['ui_play_button', 'common'], ['ui_restart_button', 'common'],
  ],
  1: [
    ['l1_bg_living_room', 'level1'],
    ['l1_curtain_closed', 'level1'], ['l1_curtain_open', 'level1'],
    ['l1_wall_clock_closed', 'level1'], ['l1_wall_clock_open', 'level1'], ['l1_wall_clock_bird', 'level1'], ['l1_wall_clock_pendulum', 'level1'],
    ['l1_sofa_cushion_flat', 'level1'], ['l1_sofa_cushion_bulge', 'level1'],
    ['l1_pate_can_closed', 'level1'], ['l1_pate_can_open', 'level1'], ['l1_pate_can_steam', 'level1'],
    ['l1_pillow_white_idle', 'level1'], ['l1_pillow_white_flipped', 'level1'],
    ['l1_box_closed', 'level1'], ['l1_box_open_empty', 'level1'],
    ['l1_plant', 'level1'], ['prop_butterfly', 'common'],
    ['l1_rug_flat', 'level1'], ['l1_rug_curled', 'level1'],
    ['sua_sit_stare', 'cats'], ['sua_meow_up', 'cats'], ['sua_eat', 'cats'], ['sua_eat_f2', 'cats'], ['sua_tail_peek', 'cats'],
    ['player_box_on_head', 'player'],
  ],
  2: [
    ['l2_bg_bedroom', 'level2'],
    ['l2_sock_basket_full', 'level2'], ['l2_sock_basket_2', 'level2'], ['l2_sock_basket_3', 'level2'], ['l2_sock_basket_reveal', 'level2'],
    ['l2_sock_striped', 'level2'], ['l2_sock_dotted', 'level2'], ['l2_sock_white_big', 'level2'], ['l2_sock_star', 'level2'], ['l2_sock_baby', 'level2'], ['l2_sock_long', 'level2'],
    ['l2_bed_blanket_flat', 'level2'], ['l2_bed_blanket_flipped', 'level2'], ['l2_duster_peek', 'level2'], ['l2_duster', 'level2'],
    ['l2_wardrobe_closed', 'level2'], ['l2_wardrobe_open', 'level2'], ['l2_shoebox_ears', 'level2'], ['l2_shoebox_open', 'level2'], ['l2_beanie_pink_cat', 'level2'], ['l2_curtain_tie', 'level2'],
    ['l2_curtain_closed', 'level2'], ['l2_curtain_open', 'level2'],
    ['l2_plush_cat', 'level2'], ['l2_plush_cat_fallen', 'level2'],
    ['l2_ceiling_lamp', 'level2'], ['l2_coat_hook', 'level2'], ['l2_beanie_white_idle', 'level2'], ['l2_beanie_white_floor', 'level2'],

    ['l2_slippers_cat_idle', 'level2'], ['l2_slippers_cat_after', 'level2'],
    ['l2_chair', 'level2'], ['l2_sweater_rolled', 'level2'], ['l2_sweater_unrolled', 'level2'],
    ['l2_sock_basket_one_eye', 'level2'], ['l2_sock_basket_yawn', 'level2'], ['player_wear_beanie', 'player'],
  ],
  3: [
    ['l3_bg_living_room_afternoon', 'level3'], ['l3_curtain_closed', 'level3'], ['l3_vase', 'level3'], ['l3_scissors', 'level3'],
    ['l3_gift_box_taped', 'level3'], ['l3_gift_box_open', 'level3'], ['l3_box_upside_down', 'level3'], ['l3_sua_in_box', 'level3'],
    ['l3_cat_tree', 'level3'], ['l3_pompom', 'level3'], ['l3_sofa_front', 'level3'], ['l3_table', 'level3'],
    ['l3_tree_p1', 'level3'], ['l3_tree_p2', 'level3'], ['l3_tree_p3', 'level3'],
    ['sua_peek_tongue', 'cats'], ['sua_pounce', 'cats'], ['sua_scratch_post', 'cats'], ['sua_sit_stare', 'cats'], ['sua_tail_peek', 'cats'],
    ['l1_pillow_white_idle', 'level1'], ['l1_pillow_white_flipped', 'level1'],
    ['player_point_think', 'player'], ['player_sad', 'player'],
    ['ui_bag_bar', 'common'], ['ui_bag_slot', 'common'], ['ui_thought_bubble', 'common'],
  ],
  4: [
    ['l4_bg_living', 'level4'], ['ui_map_bedroom', 'common'], ['ui_map_living', 'common'], ['ui_map_study', 'common'], ['l4_bg_bedroom', 'level4'], ['l4_bg_study', 'level4'],
    ['l4_window', 'level4'], ['l4_curtain', 'level4'], ['l4_sofa', 'level4'],
    ['l4_stack_mattress', 'level4'], ['l4_stack_suitcase', 'level4'], ['l4_stack_books', 'level4'], ['l4_stack_pillow', 'level4'],
    ['l4_bed', 'level4'], ['l4_pillow', 'level4'], ['l4_bedside_lamp', 'level4'], ['l4_sock_stuck', 'level4'], ['l4_sock_flat', 'level4'],
    ['l4_mattress_standing', 'level4'], ['l4_mattress_fallen', 'level4'], ['l4_teddy', 'level4'],
    ['l4_bookshelf_full', 'level4'], ['l4_bookshelf_after', 'level4'], ['l4_book_single', 'level4'], ['l4_book_single_yellow', 'level4'], ['l4_book_single_mint', 'level4'], ['l4_book_stack', 'level4'],
    ['l4_desk', 'level4'], ['l4_yoga_ball', 'level4'], ['l4_suitcase_full', 'level4'], ['l4_suitcase_folded', 'level4'],
    ['l4_spill_duck_ring', 'level4'], ['l4_spill_goggles', 'level4'], ['l4_spill_slipper', 'level4'], ['l4_spill_shirt', 'level4'],
    ['sua_curtain_banana', 'cats'], ['sua_curtain_one_paw', 'cats'], ['sua_curtain_upside', 'cats'], ['sua_curtain_sleep', 'cats'],
    ['sua_curtain_sulk', 'cats'], ['sua_curl_spin', 'cats'], ['sua_land', 'cats'], ['sua_lick_paw', 'cats'],
    ['player_reach_up', 'player'], ['player_silly_laugh', 'player'],
    ['ui_bag_bar', 'common'], ['ui_bag_slot', 'common'], ['ui_room_arrow', 'common'], ['ui_thought_bubble', 'common'],
    ['fx_dust_puff', 'common'], ['fx_dust_puff_b', 'common'],
  ],
  // Level 5: bản khối (chưa có ảnh), mọi key tự vẽ khối có nhãn trong level5.js; tên key theo states-01-10.md.
  5: [
    ['l5_bg_backyard', 'level5'], ['l5_bg_alley', 'level5'], ['ui_map_yard', 'common'], ['ui_map_alley', 'common'], ['l5_cafe_window', 'level5'], ['l5_cafe_window_back', 'level5'], ['l5_cafe_window_frame', 'level5'], ['l5_vanity_table', 'level5'],
    ['l5_mirror_small', 'level5'], ['l5_mirror_placed', 'level5'], ['l5_cardboard_box', 'level5'],
    ['l5_trash_bag_idle', 'level5'], ['l5_trash_bag_after', 'level5'], ['l5_awning_down', 'level5'], ['l5_awning_rolled', 'level5'],
    ['l5_sunbeam', 'level5'], ['l5_light_spot', 'level5'], ['l5_cart', 'level5'], ['l5_crow_idle', 'level5'], ['l5_crow_far', 'level5'],
    ['l5_drain_pipe', 'level5'], ['l5_tin_lid', 'level5'], ['l5_tin_lid_placed', 'level5'], ['l5_cd_hanging', 'level5'],
    ['l5_cd_placed', 'level5'], ['l5_awning_cord', 'level5'],
    ['l5_doorstep', 'level5'], ['l5_cactus_pot', 'level5'], ['l5_cactus_flower', 'level5'], ['l5_clothesline', 'level5'], ['l5_shirt', 'level5'],
    ['l5_clothespin', 'level5'], ['l5_wind_chime', 'level5'], ['l5_slippers', 'level5'], ['l5_slippers_flipped', 'level5'],
    ['l5_bike', 'level5'], ['l5_bike_wheel', 'level5'], ['l5_puddle', 'level5'], ['l5_gecko', 'level5'], ['l5_milk_can', 'level5'],
    ['mun_eyes_dark', 'cats'], ['mun_peek_out', 'cats'], ['mun_paw_reach', 'cats'], ['mun_run', 'cats'], ['mun_pounce', 'cats'], ['mun_pin_light', 'cats'],
    ['mun_look_paw', 'cats'], ['mun_held', 'cats'], ['mun_face_icon', 'cats'], ['sua_press_window', 'cats'],
    ['player_cover_nose', 'player'],
    ['ui_bag_bar', 'common'], ['ui_bag_slot', 'common'], ['ui_room_arrow', 'common'], ['ui_thought_bubble', 'common'],
  ],
};
export const ALL_KEYS = Object.values(KEYS).flat();

async function listing(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return new Set();
    const html = await res.text();
    return new Set([...html.matchAll(/href="([^"?#]+)"/g)].map((m) => decodeURIComponent(m[1])));
  } catch {
    return new Set();
  }
}

async function json(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

// Bảng vị trí: | Key | X | Y | Cảnh | Rộng demo |. Cột "Rộng demo" (từ level 3, D3-17) = bề rộng phần vẽ thật trong tranh demo;
// code co ảnh cho khớp bề rộng đó (fit).
function parseSpec(text) {
  const pos = {}, info = {}, fit = {};
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    let m = line.match(/^\|\s*([a-z0-9_]+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([^|]*)\|\s*(\d+)?/);
    if (m) {
      pos[m[1]] = [Number(m[2]), Number(m[3])];
      if (m[5]) fit[m[1]] = Number(m[5]);
      continue;
    }
    m = line.match(/^\|\s*`([a-z0-9_]+)`\s*\|\s*(\w+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/);
    if (m) {
      const d = m[3].trim().match(/(rộng|cao)\s*(\d+)/);
      info[m[1]] = { folder: m[2], display: d ? { dim: d[1] === 'cao' ? 'h' : 'w', val: Number(d[2]) } : null, neo: m[5].trim() };
    }
  }
  return { pos, info, fit };
}

// Bản build: manifest.json đã có sẵn entries (url tương đối), pos, info, audio, phMeta.
async function fromManifest() {
  const m = await json(new URL('manifest.json', location.href).href);
  if (!m) throw new Error('Không đọc được manifest.json');
  const base = new URL('./', location.href).href;
  for (const e of Object.values(m.entries)) e.url = base + e.url;
  const pos = { ...m.pos, 1: { ...DEFAULT_POS, ...(m.pos[1] || {}) } };
  return { pos, info: m.info, fit: m.fit || {}, entries: m.entries, audio: new Set(m.audio), phMeta: m.phMeta || {} };
}

// Trả về { pos, info, fit, entries: {key: {url, real, ax, ay, res, auto}}, audio: Set }
export async function discover() {
  if (BUILT) return fromManifest();
  const text = (u) => fetch(u, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : '')).catch(() => '');
  const [outList, ph, audioList, ...specs] = await Promise.all([
    listing(ART_OUT), json(PH + 'placeholders.json'), listing(new URL('audio/', location.href).href),
    ...LEVELS.map((n) => text(SPECS[n])),
  ]);
  const anchors = outList.has('anchors.json') ? await json(ART_OUT + 'anchors.json') : null;
  const pos = {}, fit = {};
  let info = {};
  LEVELS.forEach((n, i) => {
    const s = parseSpec(specs[i]);
    pos[n] = s.pos;
    fit[n] = s.fit;
    info = { ...s.info, ...info }; // level trước thắng khi trùng key (đồ dùng lại)
  });
  pos[1] = { ...DEFAULT_POS, ...pos[1] };
  const folders = {};
  for (const f of [...LEVELS.map((n) => 'level' + n), 'cats', 'common', 'player']) {
    folders[f] = outList.has(f + '/') ? await listing(ART_OUT + f + '/') : new Set();
  }
  const bust = '?v=' + Date.now();
  const entries = {};
  for (const [key, folder] of ALL_KEYS) {
    const file = key + '.png';
    if (folders[folder].has(file)) {
      const a = anchors && anchors[key];
      entries[key] = a
        ? { url: ART_OUT + folder + '/' + file + bust, real: true, ax: a.ax, ay: a.ay, res: a.res || 1.5 }
        : { url: ART_OUT + folder + '/' + file + bust, real: true, auto: true };
    } else if (ph && ph[key]) {
      entries[key] = { url: PH + file + bust, real: false, ...ph[key] };
    }
  }
  return { pos, info, fit, entries, audio: audioList, phMeta: ph || {} };
}

export function phUrl(key) {
  return BUILT ? new URL('assets/placeholders/' + key + '.png', location.href).href : PH + key + '.png';
}
