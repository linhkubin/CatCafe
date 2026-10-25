import { discover, phUrl } from './assets.js';
import { Level1 } from './level1.js';

const W = 1024, BASE_H = 1536, MAX_H = 2304;

// Chiều cao khung theo tỉ lệ màn hình: giữ đủ 1024 ngang, máy dài thì kéo dài nền trên/dưới (D7).
export function gameHeight() {
  // Đo khung chứa thật (#game), vì trang có thể nằm trong iframe có lề safe-area.
  const el = document.getElementById('game');
  const vw = (el && el.clientWidth) || window.innerWidth || W, vh = (el && el.clientHeight) || window.innerHeight || BASE_H;
  return Math.round(Math.min(MAX_H, Math.max(BASE_H, (W * vh) / vw)));
}

class Boot extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    const A = this.registry.get('assets');
    for (const [key, e] of Object.entries(A.entries)) this.load.image(key, e.url);
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
    const A = this.registry.get('assets');
    // Ảnh thật chưa có điểm neo trong anchors.json: suy neo từ cột Neo, tỉ lệ từ cột Hiển thị của design-art.
    for (const [key, e] of Object.entries(A.entries)) {
      if (!e.auto || !this.textures.exists(key)) continue;
      const src = this.textures.get(key).getSourceImage();
      if (key === 'l1_bg_living_room') {
        Object.assign(e, { ax: 0, ay: 0, res: src.width / W });
        continue;
      }
      const info = A.info[key] || {};
      const neo = info.neo || 'đáy';
      // Neo "x,y ..." chưa ghi tay: Sữa bế lấy nách ở 42% chiều cao, còn lại lấy giữa đáy.
      const ox = 0.5, oy = neo.startsWith('đỉnh') ? 0 : neo.startsWith('tâm') ? 0.5 : key === 'sua_held' ? 0.42 : 1;
      const d = info.display;
      const res = d ? (d.dim === 'w' ? src.width / d.val : src.height / d.val) : 1.5;
      Object.assign(e, { ax: src.width * ox, ay: src.height * oy, res });
    }
    this.scene.start('Level1');
  }
}

async function start() {
  const assets = await discover();
  const real = Object.entries(assets.entries).filter(([, e]) => e.real).map(([k]) => k);
  console.info(`[Meo Level 1] ảnh thật: ${real.length ? real.join(', ') : '(chưa có)'}; còn lại dùng ảnh tạm.`);
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#2b2420',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W, height: gameHeight() },
    input: { activePointers: 2 },
    scene: [Boot, Level1],
    callbacks: { preBoot: (g) => g.registry.set('assets', assets) },
  });
  window.addEventListener('resize', () => {
    const h = gameHeight();
    if (h !== game.scale.height) game.scale.setGameSize(W, h);
  });
  window.__meoGame = game; // để kiểm thử
}

start();
