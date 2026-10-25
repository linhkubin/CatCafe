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

// Meo dễ thương: cao, ngắn, triangle, lên rồi xuống, vibrato nhẹ.
const meow = (c, len, base, at = 0) => note(c, { type: 'triangle', f: base, t: len, vol: 0.13, at, attack: 0.04, vib: 7, vibDepth: 0.02,
  glide: [[base * 1.45, len * 0.35], [base * 1.2, len * 0.75], [base * 0.95, len]] });

const RECIPES = {
  sfx_tap: (c) => note(c, { f: 1568, t: 0.06, vol: 0.05, vib: 0, attack: 0.004 }),
  sfx_cloth: (c) => { rustle(c, { t: 0.22, vol: 0.035 }); note(c, { f: 988, t: 0.12, vol: 0.05, glide: [[1318, 0.1]] }); },
  l1_sfx_cuckoo: (c) => { note(c, { f: 1175, t: 0.2, vol: 0.13, attack: 0.02 }); note(c, { f: 932, t: 0.26, vol: 0.13, at: 0.22, attack: 0.02 }); },
  l1_sfx_cushion_flip: (c) => note(c, { f: 330, t: 0.18, vol: 0.14, glide: [[660, 0.15]], vib: 0 }),
  l1_sfx_can_roll: (c) => { [1047, 1175, 1319, 1175, 1047].forEach((f, i) => bell(c, f, i * 0.09, 0.06, 0.12)); note(c, { f: 523, t: 0.14, vol: 0.1, at: 0.55, glide: [[392, 0.12]], vib: 0 }); },
  sfx_cushion_soft: (c) => note(c, { f: 392, t: 0.14, vol: 0.12, glide: [[294, 0.12]], vib: 0, attack: 0.01 }),
  // TÁCH: giòn nhưng nhỏ, kiểu "pốp" tròn (sine bật xuống nhanh) + tiếng chuông nhỏ.
  sfx_pop_can: (c) => { note(c, { f: 1400, t: 0.07, vol: 0.18, glide: [[420, 0.06]], vib: 0, attack: 0.002 }); rustle(c, { t: 0.03, vol: 0.05, f: 3500 }); bell(c, 1568, 0.06, 0.07, 0.3); },
  l1_sfx_box_flaps: (c) => { note(c, { f: 587, t: 0.1, vol: 0.09, vib: 0 }); note(c, { f: 784, t: 0.12, vol: 0.09, at: 0.08, vib: 0 }); rustle(c, { t: 0.12, vol: 0.025, f: 1500 }); },
  l1_sfx_box_shake: (c) => { for (let i = 0; i < 3; i++) note(c, { f: 659 + (i % 2) * 120, t: 0.08, vol: 0.08, at: i * 0.13, vib: 0 }); },
  sfx_leaves: (c) => { rustle(c, { t: 0.25, vol: 0.03, f: 3000 }); [1319, 1568, 1760].forEach((f, i) => bell(c, f, i * 0.06, 0.04, 0.15)); },
  l1_sfx_player_call: (c) => { note(c, { type: 'triangle', f: 784, t: 0.22, vol: 0.11, glide: [[880, 0.2]] }); note(c, { type: 'triangle', f: 880, t: 0.3, vol: 0.11, at: 0.28, glide: [[740, 0.28]] }); },
  sfx_meow_question: (c) => meow(c, 0.28, 880),
  sua_sfx_meow_long: (c) => meow(c, 0.55, 800),
  sua_sfx_meow: (c) => meow(c, 0.25, 940),
  sfx_heart: (c) => { bell(c, 1319, 0, 0.09); bell(c, 1760, 0.09, 0.08); },
  sfx_sparkle: (c) => { bell(c, 2093, 0, 0.04, 0.2); bell(c, 2637, 0.07, 0.035, 0.2); },
  sfx_win: (c) => [1047, 1319, 1568, 2093].forEach((f, i) => bell(c, f, i * 0.11, 0.09, 0.4)),
  sfx_pickup: (c) => note(c, { f: 1319, t: 0.08, vol: 0.06, glide: [[1760, 0.07]], vib: 0 }),
};

export const SOUND_KEYS = Object.keys(RECIPES);

export function playSfx(scene, key) {
  if (scene && scene.cache.audio.exists(key)) {
    scene.sound.play(key, { volume: MASTER });
    return;
  }
  const c = audioCtx(scene);
  const r = RECIPES[key];
  if (c && r) r(c);
}
