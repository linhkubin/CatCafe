import { discover, phUrl, KEYS } from './assets.js';
import { finalizeEntries } from './base.js';
import { Level1 } from './level1.js';
import { Level2 } from './level2.js';
import { Level3 } from './level3.js';
import { Level4 } from './level4.js';
import { Level5 } from './level5.js';
import { Level6 } from './level6.js';
import { Menu, LEVELS, startLevel } from './menu.js';

const W = 1024, STD_H = 1820, MAX_H = 2304, MAX_W = 1365;

// Cỡ khung theo tỉ lệ màn hình (G-SCREEN, chủ dự án chốt): chuẩn 9:16 (1024x1820, toạ độ đồ vật không đổi).
// Máy dài hơn 9:16: giữ ngang 1024, mở thêm trên dưới (tới 2304). Máy rộng hơn 9:16: giữ dọc 1820, mở thêm hai bên,
// tối đa 3:4 (rộng 1365); rộng hơn nữa thì FIT để viền màu nền hai bên.
export function gameSize() {
  // Đo khung chứa thật (#game), vì trang có thể nằm trong iframe có lề safe-area.
  const el = document.getElementById('game');
  const vw = (el && el.clientWidth) || window.innerWidth || W, vh = (el && el.clientHeight) || window.innerHeight || STD_H;
  const r = vw / vh;
  if (r <= W / STD_H) return [W, Math.round(Math.min(MAX_H, W / r))];
  return [Math.round(Math.min(MAX_W, STD_H * r)), STD_H];
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
    // Mở game vào menu chọn level; ?level=1 … ?level=5 để vào thẳng màn đó khi kiểm thử (thắng vẫn về menu).
    const lv = Number(new URLSearchParams(location.search).get('level'));
    if (LEVELS.includes(lv)) startLevel(this, lv); else this.scene.start('Menu');
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
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: gameSize()[0], height: gameSize()[1] },
    input: { activePointers: 2 },
    scene: [Boot, Menu, Level1, Level2, Level3, Level4, Level5, Level6],
    callbacks: { preBoot: (g) => { g.registry.set('assets', assets); } },
  });
  window.addEventListener('resize', () => {
    const [w, h] = gameSize();
    if (w !== game.scale.width || h !== game.scale.height) game.scale.setGameSize(w, h);
  });
  window.__meoGame = game; // để kiểm thử
}

start();
