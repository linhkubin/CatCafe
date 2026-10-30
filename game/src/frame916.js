// Xem trước khung 9:16 khi đang mở game ở khung rộng (3:4): hai dải đen mờ 45% phủ phần nằm ngoài khung giữa rộng 1024
// (phần màn 1080x1920 không thấy) và một viền mảnh ở mép khung 9:16. Trên mọi lớp, không nhận chạm, bám màn hình (đứng yên khi
// camera trượt). Bật bằng ?frame916=1 hoặc phím G khi đang chơi; mặc định tắt. Khung 9:16 hoặc dài hơn: dải rộng 0, không hiện.
// Trạng thái bật/tắt giữ chung cho mọi màn (window.__frame916).
const ON0 = typeof location !== 'undefined' && new URLSearchParams(location.search).get('frame916') === '1';
if (typeof window !== 'undefined' && window.__frame916 === undefined) window.__frame916 = ON0;

export function attachFrame916(scene) {
  const g = scene.add.graphics().setScrollFactor(0).setDepth(100000);
  const draw = () => {
    g.clear();
    const W = scene.scale.width, H = scene.scale.height, side = Math.max(0, (W - 1024) / 2);
    if (!window.__frame916 || side < 1) return;
    g.fillStyle(0x000000, 0.45).fillRect(0, 0, side, H).fillRect(W - side, 0, side, H);
    g.lineStyle(3, 0xffffff, 0.85).lineBetween(side, 0, side, H).lineBetween(W - side, 0, W - side, H);
  };
  const toggle = () => { window.__frame916 = !window.__frame916; draw(); };
  draw();
  scene.scale.on('resize', draw);
  if (scene.input.keyboard) scene.input.keyboard.on('keydown-G', toggle);
  scene.events.once('shutdown', () => {
    scene.scale.off('resize', draw);
    if (scene.input.keyboard) scene.input.keyboard.off('keydown-G', toggle);
  });
}
