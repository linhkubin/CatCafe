// Âm thanh: nếu game/audio/<key>.mp3|.ogg|.wav có thì phát file đó (nạp trong Boot), không thì phát tiếng tổng hợp WebAudio tạm.
// Key đúng theo levels/states-01-10.md, để sau này chỉ cần thả file cùng tên vào game/audio/.
// O9: tiếng kiểu đồ chơi / hộp nhạc: sine/triangle, attack mềm, vibrato nhẹ, cao, tròn, ngắn; gần như không dùng tiếng ồn trắng.

const MASTER = 0.55; // âm lượng chung vừa phải

// Dùng chung AudioContext của Phaser (Phaser tự mở khoá sau lần chạm đầu tiên).
const audioCtx = (scene) => {
  const c = scene && scene.sound && scene.sound.context;
  return c && c.state === 'running' ? c : null;
};

let master = null;
function out(c) {
  if (!master || master.context !== c) {
    master = c.createGain();
    master.gain.value = MASTER;
    const lp = c.createBiquadFilter(); // cắt bớt phần chói
    lp.type = 'lowpass';
    lp.frequency.value = 5200;
    master.connect(lp).connect(c.destination);
  }
  return master;
}

// Một nốt tròn: attack mềm, tắt dần, vibrato nhẹ. glide: [[tần số, giây], ...]
function note(c, { f = 880, t = 0.18, type = 'sine', vol = 0.16, at = 0, attack = 0.015, glide = null, vib = 6, vibDepth = 0.012 }) {
  const t0 = c.currentTime + at;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t0);
  if (glide) glide.forEach(([fr, dt]) => o.frequency.exponentialRampToValueAtTime(fr, t0 + dt));
  if (vib) {
    const l = c.createOscillator();
    const lg = c.createGain();
    l.frequency.value = vib;
    lg.gain.value = f * vibDepth;
    l.connect(lg).connect(o.frequency);
    l.start(t0);
    l.stop(t0 + t + 0.05);
  }
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + t);
  o.connect(g).connect(out(c));
  o.start(t0);
  o.stop(t0 + t + 0.05);
}

// Tiếng hộp nhạc: nốt chính + bội âm quãng tám nhỏ.
const bell = (c, f, at = 0, vol = 0.12, t = 0.35) => {
  note(c, { f, t, vol, at, attack: 0.005, vib: 0 });
  note(c, { f: f * 2, t: t * 0.6, vol: vol * 0.3, at, attack: 0.005, vib: 0 });
};

// Tiếng sột soạt rất nhẹ (vải, lá): ồn đã lọc thấp, âm lượng nhỏ.
function rustle(c, { t = 0.18, vol = 0.03, at = 0, f = 2400 }) {
  const t0 = c.currentTime + at;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * t), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / d.length);
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = f;
  bp.Q.value = 0.8;
  const g = c.createGain();
  g.gain.value = vol;
  src.connect(bp).connect(g).connect(out(c));
  src.start(t0);
}

// Ồn ngắn đã lọc, tắt nhanh theo hàm mũ (tiếng "tách", tiếng xì hơi). type: 'highpass' | 'bandpass'.
function hiss(c, { t = 0.2, vol = 0.05, at = 0, f = 3000, type = 'highpass', q = 0.7 }) {
  const t0 = c.currentTime + at;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * t), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp((-5 * i) / d.length);
  const src = c.createBufferSource();
  src.buffer = buf;
  const fl = c.createBiquadFilter();
  fl.type = type;
  fl.frequency.value = f;
  fl.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + t);
  src.connect(fl).connect(g).connect(out(c));
  src.start(t0);
}

// Meo dễ thương: cao, ngắn, triangle, lên rồi xuống, vibrato nhẹ.
const meow = (c, len, base, at = 0) => note(c, { type: 'triangle', f: base, t: len, vol: 0.13, at, attack: 0.04, vib: 7, vibDepth: 0.02,
  glide: [[base * 1.45, len * 0.35], [base * 1.2, len * 0.75], [base * 0.95, len]] });

// Tiếng "meooooo" dài: sawtooth + triangle trộn, qua lọc cho mềm.
// "m": lowpass mở dần ~600 → 2500 Hz trong 0,12 giây; "e" cao ~900 Hz; "oooo" trượt xuống chậm ~900 → 600 Hz,
// formant đóng dần ~2500 → 900 Hz (e → o); vibrato nhẹ tăng dần ở đuôi; tắt mờ dần.
function longMeow(c, { at = 0, len = 1.2, vol = 0.16 } = {}) {
  const t0 = c.currentTime + at, t1 = t0 + len;
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 2.5;
  lp.frequency.setValueAtTime(600, t0);
  lp.frequency.exponentialRampToValueAtTime(2500, t0 + 0.12);
  lp.frequency.setValueAtTime(2500, t0 + 0.25);
  lp.frequency.exponentialRampToValueAtTime(900, t0 + len * 0.85);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.1);
  g.gain.setValueAtTime(vol, t0 + len * 0.45);
  g.gain.exponentialRampToValueAtTime(vol * 0.5, t0 + len * 0.8);
  g.gain.exponentialRampToValueAtTime(0.0001, t1);
  // Vibrato: 6 Hz, độ sâu tăng dần ở nửa sau.
  const lfo = c.createOscillator(), lg = c.createGain();
  lfo.frequency.value = 6;
  lg.gain.setValueAtTime(0.001, t0);
  lg.gain.setValueAtTime(2, t0 + len * 0.4);
  lg.gain.linearRampToValueAtTime(18, t1);
  lfo.connect(lg);
  const mix = [['sawtooth', 0.45], ['triangle', 0.8]].map(([type, v]) => {
    const o = c.createOscillator(), og = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(820, t0);
    o.frequency.exponentialRampToValueAtTime(900, t0 + 0.15);
    o.frequency.setValueAtTime(900, t0 + 0.3);
    o.frequency.exponentialRampToValueAtTime(600, t1);
    lg.connect(o.frequency);
    og.gain.value = v;
    o.connect(og).connect(lp);
    o.start(t0);
    o.stop(t1 + 0.05);
    return o;
  });
  lp.connect(g).connect(out(c));
  lfo.start(t0);
  lfo.stop(t1 + 0.05);
  return mix;
}

const RECIPES = {
  sfx_tap: (c) => note(c, { f: 1568, t: 0.06, vol: 0.05, vib: 0, attack: 0.004 }),
  sfx_cloth: (c) => { rustle(c, { t: 0.22, vol: 0.035 }); note(c, { f: 988, t: 0.12, vol: 0.05, glide: [[1318, 0.1]] }); },
  l1_sfx_cuckoo: (c) => { note(c, { f: 1175, t: 0.2, vol: 0.13, attack: 0.02 }); note(c, { f: 932, t: 0.26, vol: 0.13, at: 0.22, attack: 0.02 }); },
  l1_sfx_cushion_flip: (c) => note(c, { f: 330, t: 0.18, vol: 0.14, glide: [[660, 0.15]], vib: 0 }),
  l1_sfx_can_roll: (c) => { [1047, 1175, 1319, 1175, 1047].forEach((f, i) => bell(c, f, i * 0.09, 0.06, 0.12)); note(c, { f: 523, t: 0.14, vol: 0.1, at: 0.55, glide: [[392, 0.12]], vib: 0 }); },
  sfx_cushion_soft: (c) => note(c, { f: 392, t: 0.14, vol: 0.12, glide: [[294, 0.12]], vib: 0, attack: 0.01 }),
  // TÁCH: giòn nhưng nhỏ, kiểu "pốp" tròn (sine bật xuống nhanh) + tiếng chuông nhỏ.
  // O2-21: mở lon nước ngọt: "tách" khoen kim loại giòn (tiếng gõ ngắn + ồn dải cao) rồi xì hơi ngắn (ồn lọc cao, tắt nhanh).
  sfx_pop_can: (c) => {
    hiss(c, { t: 0.025, vol: 0.22, f: 4200, type: 'bandpass', q: 3 });
    note(c, { f: 2900, t: 0.04, vol: 0.12, glide: [[2100, 0.035]], vib: 0, attack: 0.001 });
    note(c, { f: 1800, t: 0.05, vol: 0.06, at: 0.012, vib: 0, attack: 0.001 });
    hiss(c, { t: 0.32, vol: 0.09, at: 0.035, f: 3800 });
  },
  l1_sfx_box_flaps: (c) => { note(c, { f: 587, t: 0.1, vol: 0.09, vib: 0 }); note(c, { f: 784, t: 0.12, vol: 0.09, at: 0.08, vib: 0 }); rustle(c, { t: 0.12, vol: 0.025, f: 1500 }); },
  l1_sfx_box_shake: (c) => { for (let i = 0; i < 3; i++) note(c, { f: 659 + (i % 2) * 120, t: 0.08, vol: 0.08, at: i * 0.13, vib: 0 }); },
  sfx_leaves: (c) => { rustle(c, { t: 0.25, vol: 0.03, f: 3000 }); [1319, 1568, 1760].forEach((f, i) => bell(c, f, i * 0.06, 0.04, 0.15)); },
  l1_sfx_player_call: (c) => { note(c, { type: 'triangle', f: 784, t: 0.22, vol: 0.11, glide: [[880, 0.2]] }); note(c, { type: 'triangle', f: 880, t: 0.3, vol: 0.11, at: 0.28, glide: [[740, 0.28]] }); },
  sfx_meow_question: (c) => meow(c, 0.28, 880),
  sua_sfx_meow_long: (c) => meow(c, 0.55, 800),
  sua_sfx_meow: (c) => meow(c, 0.25, 940),
  // O2-20: chạm Sữa (mọi level): một tiếng "meooooo" dài ~1,2 giây, giọng mèo con mềm.
  sua_sfx_meow_cute: (c) => longMeow(c),
  sfx_heart: (c) => { bell(c, 1319, 0, 0.09); bell(c, 1760, 0.09, 0.08); },
  sfx_sparkle: (c) => { bell(c, 2093, 0, 0.04, 0.2); bell(c, 2637, 0.07, 0.035, 0.2); },
  sfx_win: (c) => [1047, 1319, 1568, 2093].forEach((f, i) => bell(c, f, i * 0.11, 0.09, 0.4)),
  sfx_pickup: (c) => note(c, { f: 1319, t: 0.08, vol: 0.06, glide: [[1760, 0.07]], vib: 0 }),
  // Túi đồ và kéo-thả (leveldesign 5.2, level 3).
  sfx_bag_up: (c) => note(c, { f: 392, t: 0.22, vol: 0.12, glide: [[784, 0.12], [698, 0.2]], vib: 0 }), // "tưng"
  sfx_drop: (c) => { note(c, { f: 330, t: 0.12, vol: 0.12, glide: [[220, 0.1]], vib: 0 }); bell(c, 1047, 0.06, 0.05, 0.15); },
  sfx_merge: (c) => [1047, 1319, 1568].forEach((f, i) => bell(c, f, i * 0.05, 0.07, 0.25)),
  sfx_wrong: (c) => { note(c, { f: 440, t: 0.1, vol: 0.08, vib: 0 }); note(c, { f: 370, t: 0.14, vol: 0.08, at: 0.11, vib: 0 }); },
  sfx_clink: (c) => { bell(c, 1760, 0, 0.06, 0.2); bell(c, 2093, 0.08, 0.05, 0.25); },
  l3_sfx_doorbell: (c) => { bell(c, 1319, 0, 0.1, 0.5); bell(c, 1047, 0.32, 0.1, 0.6); }, // "ting-tong"
  l3_sfx_box_thud: (c) => { note(c, { f: 165, t: 0.16, vol: 0.18, glide: [[110, 0.14]], vib: 0, attack: 0.004 }); rustle(c, { t: 0.1, vol: 0.03, f: 900 }); },
  l3_sfx_scissors_cut: (c) => { for (let i = 0; i < 3; i++) hiss(c, { t: 0.06, vol: 0.06, at: i * 0.09, f: 3600, type: 'bandpass', q: 2 }); },
  l3_sfx_paper_rip: (c) => rustle(c, { t: 0.3, vol: 0.05, f: 2000 }),
  l3_sfx_pompom: (c) => { note(c, { f: 660, t: 0.12, vol: 0.08, vib: 0 }); note(c, { f: 587, t: 0.14, vol: 0.07, at: 0.13, vib: 0 }); },
  l3_sfx_scratch: (c) => { for (let i = 0; i < 4; i++) rustle(c, { t: 0.07, vol: 0.04, at: i * 0.1, f: 1500 }); },
  l3_sfx_clack: (c) => { note(c, { f: 523, t: 0.07, vol: 0.12, vib: 0, attack: 0.002 }); bell(c, 1568, 0.05, 0.05, 0.18); }, // "cạch" mảnh cột cào khớp
  l3_sfx_box_tap: (c) => note(c, { f: 220, t: 0.08, vol: 0.06, vib: 0, attack: 0.004 }),
  sua_sfx_meow_playful: (c) => meow(c, 0.22, 1040),
  sua_sfx_blep: (c) => note(c, { f: 1568, t: 0.1, vol: 0.06, glide: [[1175, 0.09]], vib: 0 }),
  sua_sfx_chirp: (c) => { meow(c, 0.1, 1200); meow(c, 0.1, 1300, 0.12); },
  sua_sfx_meow_question: (c) => meow(c, 0.3, 900),
  // Tiếng ngáy dễ thương của Sữa (VL2-4): hít vào "khò" trầm rồi thở ra "phì" cao, rất nhỏ; g = độ to (0..1).
  sua_sfx_snore: (c, g = 0.3) => {
    note(c, { type: 'triangle', f: 196, t: 0.7, vol: 0.06 * g, attack: 0.25, glide: [[220, 0.6]], vib: 9, vibDepth: 0.04 });
    note(c, { f: 988, t: 0.35, vol: 0.035 * g, at: 0.85, attack: 0.08, glide: [[1319, 0.3]], vib: 0 });
  },
  // Level 4 (tiếng tạm).
  sua_sfx_meow_short: (c) => meow(c, 0.15, 1000),
  sfx_hinge: (c) => note(c, { type: 'triangle', f: 440, t: 0.28, vol: 0.06, glide: [[620, 0.14], [520, 0.26]], vib: 0 }), // bản lề "kẹt"
  sfx_lid: (c) => { note(c, { f: 392, t: 0.08, vol: 0.12, vib: 0, attack: 0.003 }); bell(c, 1175, 0.04, 0.04, 0.12); }, // "cộp"
  sfx_cloth_drop: (c) => { rustle(c, { t: 0.2, vol: 0.04, f: 1200 }); note(c, { f: 196, t: 0.14, vol: 0.1, at: 0.12, glide: [[147, 0.12]], vib: 0 }); }, // "phịch"
  l4_sfx_mattress_thud: (c) => { note(c, { f: 147, t: 0.2, vol: 0.16, glide: [[98, 0.18]], vib: 0, attack: 0.004 }); rustle(c, { t: 0.35, vol: 0.04, at: 0.05, f: 900 }); }, // "phịch" + "phù"
  l4_sfx_teddy_flop: (c) => note(c, { f: 262, t: 0.12, vol: 0.1, glide: [[196, 0.1]], vib: 0 }), // "bịch"
  l4_sfx_books_domino: (c) => { note(c, { f: 220, t: 0.08, vol: 0.12, vib: 0, attack: 0.003 }); rustle(c, { t: 0.08, vol: 0.03, f: 1400 }); }, // "rầm"
  l4_sfx_books_land: (c) => note(c, { f: 392, t: 0.07, vol: 0.1, vib: 0, attack: 0.003 }), // "cộp"
  l4_sfx_suitcase_burst: (c) => { note(c, { f: 196, t: 0.12, vol: 0.14, glide: [[392, 0.1]], vib: 0 }); for (let i = 0; i < 5; i++) note(c, { f: 523 + i * 60, t: 0.06, vol: 0.06, at: 0.25 + i * 0.09, vib: 0 }); }, // "bụp" + lộp bộp
  l4_sfx_duck: (c) => { note(c, { f: 1568, t: 0.09, vol: 0.08, glide: [[1976, 0.08]], vib: 0 }); note(c, { f: 1568, t: 0.09, vol: 0.08, at: 0.14, glide: [[1976, 0.08]], vib: 0 }); }, // "chít"
  l4_sfx_ball_boing: (c) => note(c, { type: 'triangle', f: 220, t: 0.4, vol: 0.12, glide: [[440, 0.08], [180, 0.38]], vib: 0 }), // "boing"
  l4_sfx_pen_drop: (c) => [1319, 1175, 1047].forEach((f, i) => note(c, { f, t: 0.05, vol: 0.06, at: i * 0.08, vib: 0, attack: 0.002 })), // "lạch cạch"
  l4_sfx_land_tap: (c) => note(c, { f: 1760, t: 0.04, vol: 0.05, vib: 0, attack: 0.002 }), // "tạch" thật nhẹ
  // G1-30, G2-30, G3-30 (tạm, tới khi có file thật):
  sfx_whoosh: (c) => { hiss(c, { t: 0.28, vol: 0.12, f: 1800, type: 'bandpass', q: 1.2 }); note(c, { f: 660, t: 0.22, vol: 0.05, glide: [[1320, 0.2]], vib: 0 }); }, // "vút"
  sfx_skid: (c) => { hiss(c, { t: 0.12, vol: 0.07, f: 2600 }); note(c, { f: 330, t: 0.08, vol: 0.06, glide: [[220, 0.07]], vib: 0 }); }, // phanh gấp
  sfx_wind: (c) => { hiss(c, { t: 0.9, vol: 0.05, f: 700, type: 'bandpass', q: 0.8 }); hiss(c, { t: 0.6, vol: 0.03, at: 0.25, f: 1100, type: 'bandpass', q: 1 }); }, // gió lùa nhẹ
  sfx_sneeze: (c) => { hiss(c, { t: 0.18, vol: 0.03, f: 1500, type: 'bandpass', q: 1 }); note(c, { type: 'triangle', f: 520, t: 0.12, vol: 0.12, at: 0.2, glide: [[300, 0.1]], vib: 0, attack: 0.004 }); hiss(c, { t: 0.15, vol: 0.12, at: 0.2, f: 3000 }); }, // "hắt xì"
  sua_sfx_yawn: (c) => note(c, { f: 700, t: 0.6, vol: 0.08, glide: [[900, 0.2], [500, 0.58]], vibDepth: 0.02 }), // ngáp
  // G6-1 bản khối (tạm, tới khi có file thật): chó Lu.
  l6_sfx_dog_bark: (c) => [0, 0.2].forEach((at) => note(c, { type: 'triangle', f: 330, t: 0.11, vol: 0.13, at, glide: [[220, 0.1]], vib: 0, attack: 0.005 })), // "gâu gâu"
  l6_sfx_dog_happy: (c) => note(c, { type: 'triangle', f: 392, t: 0.16, vol: 0.12, glide: [[587, 0.14]], vib: 0, attack: 0.005 }), // "gâu!" vui
  l6_sfx_dog_chew: (c) => [0, 0.14, 0.28].forEach((at) => rustle(c, { t: 0.06, vol: 0.03, at, f: 1200 })), // gặm rộp rộp
  l6_sfx_dog_whine: (c) => note(c, { f: 740, t: 0.32, vol: 0.08, glide: [[520, 0.3]], vibDepth: 0.02 }), // "ư ử"
  l6_sfx_dog_sniff: (c) => [0, 0.16, 0.3, 0.52, 0.66].forEach((at) => hiss(c, { t: 0.07, vol: 0.06, at, f: 2200, type: 'bandpass', q: 1.5 })), // khịt khịt
  l3_sfx_creak: (c) => { for (let i = 0; i < 2; i++) note(c, { type: 'sawtooth', f: 180 + i * 30, t: 0.18, vol: 0.03, at: i * 0.25, glide: [[260 + i * 30, 0.16]], vib: 0 }); }, // cót két
};

export const SOUND_KEYS = Object.keys(RECIPES);

// Âm thanh chưa có file: mượn tiếng gần giống có sẵn (mọi màn; trước ở level5.js). Có file thật thì dùng file thật.
export const SFX_ALIAS = {
  mun_sfx_scamper: 'sfx_cloth', l5_sfx_glass_ting: 'sfx_clink', l5_sfx_plastic: 'sfx_leaves', l5_sfx_canvas_flap: 'sfx_cloth_drop',
  mun_sfx_hiss_tiny: 'sua_sfx_chirp', l5_sfx_crow: 'l1_sfx_cuckoo', mun_sfx_meow: 'sua_sfx_meow', mun_sfx_meow_cute: 'sua_sfx_meow_cute',
  l5_sfx_pop: 'sfx_pop_can', l5_sfx_wind: 'sfx_cloth', l5_sfx_chime: 'sfx_sparkle', l5_sfx_flop: 'sfx_cushion_soft',
  l5_sfx_bike_bell: 'l3_sfx_doorbell', l5_sfx_splash: 'sfx_drop', l5_sfx_gecko: 'sua_sfx_blep', l5_sfx_can_clunk: 'l3_sfx_clack',
  // L6 (bản khối G6-1)
  l6_sfx_barrel_roll: 'l1_sfx_can_roll', l6_sfx_wood_clack: 'l4_sfx_books_land', l6_sfx_stool: 'l3_sfx_clack', l6_sfx_basket: 'sfx_lid',
  l6_sfx_sausage_drop: 'l4_sfx_teddy_flop', l6_sfx_glove_flop: 'l4_sfx_teddy_flop', l6_sfx_bird: 'sfx_sparkle', l6_sfx_water: 'sfx_drop',
};

// opt: tham số riêng cho tiếng tổng hợp (ví dụ { step } cho tiếng xoay ống cao dần).
export function playSfx(scene, key, gain = 1, opt) {
  if (scene && !scene.cache.audio.exists(key) && SFX_ALIAS[key]) key = SFX_ALIAS[key];
  if (scene && scene.cache.audio.exists(key)) {
    scene.sound.play(key, { volume: MASTER * gain });
    return;
  }
  const c = audioCtx(scene);
  const r = RECIPES[key];
  if (c && r) r(c, gain, opt);
}
