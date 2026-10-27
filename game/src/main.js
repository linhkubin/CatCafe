import { discover, phUrl, KEYS } from './assets.js';
import { finalizeEntries } from './base.js';
import { Level1 } from './level1.js';
import { Level2 } from './level2.js';
import { Level3 } from './level3.js';
import { Level4 } from './level4.js';

const W = 1024, BASE_H = 1536, MAX_H = 2304;

// Chiều cao khung theo tỉ lệ màn hình: giữ đủ 1024 ngang, máy dài thì kéo dài nền trên/dưới (D7).
export function gameHeight() {
  // Đo khung chứa thật (#game), vì trang có thể nằm trong iframe có lề safe-area.
  const el = document.getElementById('game');
  const vw = (el && el.clientWidth) || window.innerWidth || W, vh = (el && el.clientHeight) || window.innerHeight || BASE_H;
  return Math.round(Math.min(MAX_H, Math.max(BASE_H, (W * vh) / vw)));
}

// Boot chỉ tải phần dùng chung (giao diện, cảnh bế, Sữa chạy, nhân vật); mỗi màn tự tải ảnh riêng khi vào màn.
class Boot extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    const A = this.registry.get('assets');
    for (const [key] of KEYS.common) {
      const e = A.entries[key];
      if (e) this.load.image(key, e.url);
    }
    for (const f of A.audio) {
      const m = f.match(/^([a-z0-9_]+)\.(mp3|ogg|wav)$/);
      if (m) this.load.audio(m[1], 'audio/' + f);
    }
    // Ảnh thật lỗi thì quay về ảnh tạm.
    this.load.on('loaderror', (file) => {
      const e = A.entries[file.key];
      if (file.type === 'image' && e && e.real && A.phMeta[file.key]) {
        Object.assign(e, { real: false, auto: false, ...A.phMeta[file.key] });
        this.load.image(file.key, phUrl(file.key));
      }
    });
  }

  create() {
    finalizeEntries(this, KEYS.common.map(([k]) => k));
    // ?level=2 … ?level=4 để vào thẳng màn đó khi kiểm thử.
    const lv = new URLSearchParams(location.search).get('level');
    this.scene.start(['2', '3', '4'].includes(lv) ? 'Level' + lv : 'Level1');
  }
}

async function start() {
  const assets = await discover();
  const real = Object.entries(assets.entries).filter(([, e]) => e.real).map(([k]) => k);
  console.info(`[Meo] ảnh thật: ${real.length}; còn lại dùng ảnh tạm.`);
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#2b2420',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W, height: gameHeight() },
    input: { activePointers: 2 },
    scene: [Boot, Level1, Level2, Level3, Level4],
    callbacks: { preBoot: (g) => { g.registry.set('assets', assets); g.registry.set('hearts', 0); } },
  });
  window.addEventListener('resize', () => {
    const h = gameHeight();
    if (h !== game.scale.height) game.scale.setGameSize(W, h);
  });
  window.__meoGame = game; // để kiểm thử
}

start();
