// Bộ đếm FPS để đo máy (công cụ debug, ngoại lệ luật không chữ): chỉ bật khi URL có ?fps=1.
// Ô nhỏ góc trên trái, không nhận chạm. Đếm khung bằng requestAnimationFrame, cập nhật 2 lần/giây:
// số đầu là FPS hiện tại, "min" là FPS thấp nhất trong 5 giây gần nhất.
if (new URLSearchParams(location.search).get('fps') === '1') {
  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;left:4px;top:4px;z-index:99999;pointer-events:none;' +
    'font:11px/1.3 monospace;color:#fff;background:rgba(0,0,0,0.55);padding:2px 5px;border-radius:3px;';
  const mount = () => document.body.appendChild(box);
  if (document.body) mount(); else addEventListener('DOMContentLoaded', mount);

  const STEP = 500, SPAN = 5000;
  let frames = 0, last = performance.now();
  const hist = []; // [thời điểm, fps]
  const tick = (now) => {
    frames++;
    if (now - last >= STEP) {
      const fps = frames * 1000 / (now - last);
      frames = 0; last = now;
      hist.push([now, fps]);
      while (hist.length && now - hist[0][0] > SPAN) hist.shift();
      const min = Math.min(...hist.map((h) => h[1]));
      box.textContent = `${Math.round(fps)} fps · min ${Math.round(min)}`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
