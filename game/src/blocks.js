// Khối tạm có nhãn cho bản chơi thử bằng khối (QUY-TRINH bước 2): hình phẳng tô màu + nhãn chữ ngắn ghi tên đồ.
// Vẽ bằng canvas 2D, dùng với màn khai báo `get fallbackCanvas() { return true; }`. Dùng chung mọi màn bản khối.
// Mỗi khối trả về mảng ảnh tạm cho makeFallback: [rộng, cao, neo, draw(ctx, w, h)] (cỡ = cỡ hiển thị trong game).

export const PAL = {
  brown: '#6b4a3a', cream: '#fdf6e8', wood: '#d6a472', woodDark: '#b9875a', black: '#2a2626', gold: '#f7d23e',
  sky: '#b8daf2', pink: '#f8c6cc', mint: '#b9ddbe', gray: '#b8b2aa', tin: '#c9d3dc', red: '#e98a7a', yellow: '#f3d58a',
  green: '#8cc48a', dog: '#e8b86a', white: '#ffffff',
};

export function rr(c, x, y, w, h, fill, r = 12, stroke = PAL.brown, lw = 4) {
  c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = fill; c.fill();
  if (stroke) { c.lineWidth = lw; c.strokeStyle = stroke; c.stroke(); }
}

export function el(c, cx, cy, rx, ry, fill, stroke = PAL.brown, lw = 4) {
  c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = fill; c.fill();
  if (stroke) { c.lineWidth = lw; c.strokeStyle = stroke; c.stroke(); }
}

// Cờ ?nolabel=1 (hoặc &nolabel=1): khối không chữ, để chụp ảnh khối sạch bàn giao Art.
const NOLABEL = typeof location !== 'undefined' && new URLSearchParams(location.search).get('nolabel') === '1';

// Nhãn chữ ngắn (nhiều dòng tách bằng \n): chữ nâu viền trắng, chữ trắng (trên khối tối) viền đen, dễ đọc trên mọi nền.
export function label(c, text, x, y, size = 22, color = PAL.brown) {
  if (NOLABEL) return;
  if (c.__mirrorW) { // bản vẽ ngược (face, G6-15): chữ vẫn xuôi, đặt ở vị trí đối xứng
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); x = c.__mirrorW - x;
  }
  c.font = `bold ${size}px Arial, sans-serif`;
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  const lines = String(text).split('\n'), edge = color === PAL.white ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.9)';
  lines.forEach((t, i) => {
    const ly = y + (i - (lines.length - 1) / 2) * size * 1.1;
    c.lineWidth = 5; c.strokeStyle = edge; c.strokeText(t, x, ly);
    c.fillStyle = color; c.fillText(t, x, ly);
  });
  if (c.__mirrorW) c.restore();
}

// Khối có nhãn: hình chữ nhật bo góc (mặc định) hoặc elip, nhãn ở giữa.
// o: { neo ('đáy' | 'đỉnh' | 'tâm' | [ax, ay]), shape: 'rect' | 'ellipse', r (bo góc), size (cỡ chữ), color (màu chữ),
//      ly (tâm nhãn theo tỉ lệ chiều cao, mặc định 0,5), draw(c, w, h) vẽ thêm chi tiết trước nhãn }.
export function block(w, h, fill, text, o = {}) {
  return [w, h, o.neo || 'đáy', (c) => {
    if (o.shape === 'ellipse') el(c, w / 2, h / 2, w / 2 - 3, h / 2 - 3, fill);
    else if (fill) rr(c, 3, 3, w - 6, h - 6, fill, o.r ?? 12);
    if (o.draw) o.draw(c, w, h);
    if (text) label(c, text, w / 2, h * (o.ly ?? 0.5), o.size || 22, o.color);
  }];
}
