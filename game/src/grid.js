// Lưới toạ độ để chỉnh vị trí bằng số (công cụ debug, ngoại lệ luật không chữ): chỉ bật khi URL có ?grid=1.
// Lớp canvas DOM phủ đúng khung game, trên mọi lớp, không nhận chạm. Vẽ theo toạ độ thế giới của màn đang chạy (như toạ độ trong
// code), cuộn theo camera. Màn nhiều phòng (RoomsLevel, L4–L7): số ngang tính trong phòng đang đứng (x − room × ROOM_W, 0–1024).
// Đỏ mờ mỗi 50 px, đậm hơn mỗi 100 px; số nhỏ ở mép trên (x) và mép trái (y) mỗi 100 px.
import { ROOM_W } from './rooms.js';

if (new URLSearchParams(location.search).get('grid') === '1') {
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:fixed;left:0;top:0;z-index:99998;pointer-events:none;';
  const mount = () => document.body.appendChild(cv);
  if (document.body) mount(); else addEventListener('DOMContentLoaded', mount);
  const ctx = cv.getContext('2d');
  let lastKey = '';

  // Màn đang chạy trên cùng có camera (bỏ Boot).
  const activeScene = (game) => {
    const list = game.scene.getScenes(true).filter((s) => s.cameras && s.cameras.main && s.scene.key !== 'Boot');
    return list[list.length - 1];
  };

  const draw = () => {
    requestAnimationFrame(draw);
    const game = window.__meoGame;
    if (!game || !game.canvas) return;
    const sc = activeScene(game);
    if (!sc) return;
    const cam = sc.cameras.main, rect = game.canvas.getBoundingClientRect();
    const k = rect.width / game.scale.width, dpr = window.devicePixelRatio || 1;
    const room = sc.roomCount ? (sc.room || 0) : 0, ox = room * ROOM_W;
    const key = [rect.left, rect.top, rect.width, rect.height, cam.scrollX, cam.scrollY, room, sc.scene.key].join(',');
    if (key === lastKey) return;
    lastKey = key;

    cv.style.left = rect.left + 'px'; cv.style.top = rect.top + 'px';
    cv.style.width = rect.width + 'px'; cv.style.height = rect.height + 'px';
    cv.width = Math.round(rect.width * dpr); cv.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const W = game.scale.width, H = game.scale.height;
    // Chủ dự án: dịch lưới cho cột 500 nằm trên đường vàng dọc, hàng 800 nằm trên đường vàng ngang (lưới theo giữa màn, không theo camera).
    const GX = 500, GY = 800;
    const sx = (wx) => (wx - ox - GX) * k + rect.width / 2, sy = (wy) => (wy - GY) * k + rect.height / 2;
    const x0 = Math.floor((GX - W / 2) / 50) * 50, x1 = GX + W / 2;
    const y0 = Math.floor((GY - H / 2) / 50) * 50, y1 = GY + H / 2;
    ctx.font = '10px monospace';
    for (let x = x0; x <= x1; x += 50) {
      const px = Math.round(sx(x + ox)) + 0.5, major = x % 100 === 0;
      ctx.strokeStyle = major ? 'rgba(255,0,0,0.55)' : 'rgba(255,0,0,0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, rect.height); ctx.stroke();
      if (major) { ctx.fillStyle = 'rgba(200,0,0,0.9)'; ctx.fillText(String(x), px + 2, 10); }
    }
    for (let y = y0; y <= y1; y += 50) {
      const py = Math.round(sy(y)) + 0.5, major = y % 100 === 0;
      ctx.strokeStyle = major ? 'rgba(255,0,0,0.55)' : 'rgba(255,0,0,0.22)';
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(rect.width, py); ctx.stroke();
      if (major) { ctx.fillStyle = 'rgba(200,0,0,0.9)'; ctx.fillText(String(y), 2, py - 2); }
    }
    // Đường vàng giữa màn hình (chủ dự án): một dọc, một ngang, chia đôi khung game đang thấy (không theo camera).
    const cx = Math.round(rect.width / 2) + 0.5, cy = Math.round(rect.height / 2) + 0.5;
    ctx.strokeStyle = 'rgba(255,200,0,0.95)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, rect.height); ctx.moveTo(0, cy); ctx.lineTo(rect.width, cy); ctx.stroke();
  };
  requestAnimationFrame(draw);
}
