// Tìm asset: ảnh thật trong art/out/ (theo danh sách file của thư mục và art/out/anchors.json),
// thiếu thì dùng ảnh tạm trong game/placeholders/. Vị trí và cỡ hiển thị đọc từ art/design-art-level1.md.
// Server tĩnh phải liệt kê được thư mục (python -m http.server làm được), nhờ vậy không có lỗi 404 khi dò file.
// Bản build (game/tools/build_web.py -> game/dist/) đổi BUILT thành true: khi đó mọi thứ đọc từ manifest.json cạnh trang,
// không dò thư mục (dùng cho trang tĩnh như Artifact).
export const BUILT = false;

const ROOT = new URL('../', location.href).href;          // gốc dự án (game/ nằm ngay dưới)
const ART_OUT = ROOT + 'art/out/';
const PH = new URL('placeholders/', location.href).href;
const SPEC = ROOT + 'art/design-art-level1.md';

// Dự phòng nếu không đọc được design-art (giá trị ở vòng 5).
const DEFAULT_POS = {
  l1_wall_clock_pendulum: [866, 470], l1_wall_clock_closed: [866, 182], l1_wall_clock_bird: [866, 320],
  l1_plant: [890, 1345], prop_butterfly: [960, 1080], l1_rug_flat: [512, 1055], l1_box_closed: [220, 1285],
  l1_pate_can_closed: [800, 893], l1_pate_can_open: [650, 1305], l1_pate_can_steam: [640, 1228],
  l1_sofa_cushion_bulge: [710, 900], l1_sofa_cushion_lifted: [710, 885], l1_pillow_white_idle: [308, 875],
  l1_curtain_closed: [285, 185], sua_sit_stare: [480, 1290], player_call: [490, 1445],
};

// Mọi key Level 1 dùng trong bản chơi thử: [key, thư mục].
export const KEYS = [
  ['l1_bg_living_room', 'level1'],
  ['l1_curtain_closed', 'level1'], ['l1_curtain_open', 'level1'],
  ['l1_wall_clock_closed', 'level1'], ['l1_wall_clock_open', 'level1'], ['l1_wall_clock_bird', 'level1'], ['l1_wall_clock_pendulum', 'level1'],
  ['l1_sofa_cushion_flat', 'level1'], ['l1_sofa_cushion_bulge', 'level1'], ['l1_sofa_cushion_lifted', 'level1'],
  ['l1_pate_can_closed', 'level1'], ['l1_pate_can_open', 'level1'], ['l1_pate_can_steam', 'level1'],
  ['l1_pillow_white_idle', 'level1'], ['l1_pillow_white_flipped', 'level1'],
  ['l1_box_closed', 'level1'], ['l1_box_open_empty', 'level1'],
  ['l1_plant', 'level1'], ['prop_butterfly', 'common'],
  ['l1_rug_flat', 'level1'], ['l1_rug_curled', 'level1'],
  ['sua_sit_stare', 'cats'], ['sua_meow_up', 'cats'], ['sua_eat', 'cats'], ['sua_eat_f2', 'cats'], ['sua_held', 'cats'], ['sua_face_icon', 'cats'], ['sua_tail_peek', 'cats'], ['sua_run', 'cats'],
  ['player_call', 'player'], ['player_scratch_head', 'player'], ['player_surprised', 'player'], ['player_shrug', 'player'],
  ['player_hands_lift', 'player'], ['player_box_on_head', 'player'],
  ['ui_speech_bubble', 'common'], ['ui_cat_head_dark', 'common'], ['ui_question_mark', 'common'], ['ui_question_mark_white', 'common'],
  ['ui_heart', 'common'], ['ui_hand_pointer', 'common'], ['ui_hint_paw', 'common'], ['ui_sparkle', 'common'],
  ['ui_bulb_button', 'common'], ['ui_dried_fish', 'common'], ['fx_pop', 'common'],
];

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

function parseSpec(text) {
  const pos = {}, info = {};
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    let m = line.match(/^\|\s*([a-z0-9_]+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([^|]*)\|/);
    if (m) { pos[m[1]] = [Number(m[2]), Number(m[3])]; continue; }
    m = line.match(/^\|\s*`([a-z0-9_]+)`\s*\|\s*(\w+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/);
    if (m) {
      const d = m[3].trim().match(/(rộng|cao)\s*(\d+)/);
      info[m[1]] = { folder: m[2], display: d ? { dim: d[1] === 'cao' ? 'h' : 'w', val: Number(d[2]) } : null, neo: m[5].trim() };
    }
  }
  return { pos, info };
}

// Bản build: manifest.json đã có sẵn entries (url tương đối), pos, info, audio, phMeta.
async function fromManifest() {
  const m = await json(new URL('manifest.json', location.href).href);
  if (!m) throw new Error('Không đọc được manifest.json');
  const base = new URL('./', location.href).href;
  for (const e of Object.values(m.entries)) e.url = base + e.url;
  return { pos: { ...DEFAULT_POS, ...m.pos }, info: m.info, entries: m.entries, audio: new Set(m.audio), phMeta: m.phMeta || {} };
}

// Trả về { pos, info, entries: {key: {url, real, ax, ay, res, auto}}, audio: Set }
export async function discover() {
  if (BUILT) return fromManifest();
  const [outList, ph, specText, audioList] = await Promise.all([
    listing(ART_OUT), json(PH + 'placeholders.json'),
    fetch(SPEC, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : '')).catch(() => ''),
    listing(new URL('audio/', location.href).href),
  ]);
  const anchors = outList.has('anchors.json') ? await json(ART_OUT + 'anchors.json') : null;
  const spec = specText ? parseSpec(specText) : { pos: {}, info: {} };
  const pos = { ...DEFAULT_POS, ...spec.pos };
  const folders = {};
  for (const f of ['level1', 'cats', 'common', 'player']) {
    folders[f] = outList.has(f + '/') ? await listing(ART_OUT + f + '/') : new Set();
  }
  const bust = '?v=' + Date.now();
  const entries = {};
  for (const [key, folder] of KEYS) {
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
  return { pos, info: spec.info, entries, audio: audioList, phMeta: ph || {} };
}

export function phUrl(key) {
  return BUILT ? new URL('assets/placeholders/' + key + '.png', location.href).href : PH + key + '.png';
}
