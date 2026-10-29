// Tiến độ chọn màn, lưu cục bộ (localStorage). Màn 1 luôn mở; qua màn N thì mở màn N + 1.
// Trình duyệt chặn localStorage (chế độ riêng tư…): vẫn chơi được, tiến độ chỉ giữ trong phiên.
// Các màn có trong game, theo thứ tự. Thêm màn mới: thêm số vào đây, scene vào main.js, mèo vào cats.js.
export const LEVELS = [1, 2, 3, 4, 5];

const STORE = 'meo_progress_v1';
let mem = null;

function load() {
  if (mem) return mem;
  mem = { done: [] };
  try {
    const v = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (v && Array.isArray(v.done)) mem.done = v.done.filter((n) => Number.isInteger(n));
  } catch (e) { /* bỏ qua, dùng tiến độ trống */ }
  return mem;
}

export const Progress = {
  isDone: (n) => load().done.includes(n),
  isOpen: (n) => n === 1 || load().done.includes(n - 1),
  markDone(n) {
    const p = load();
    if (p.done.includes(n)) return;
    p.done.push(n);
    try { localStorage.setItem(STORE, JSON.stringify(p)); } catch (e) { /* chỉ giữ trong phiên */ }
  },
  reset() { mem = { done: [] }; try { localStorage.removeItem(STORE); } catch (e) { /* bỏ qua */ } },
};
