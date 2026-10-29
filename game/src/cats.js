// Nhóm mèo theo level: mỗi con mèo có một chuỗi level và thanh ♥ riêng (số ô = số level của mèo đó).
// Level mới chỉ cần thêm số vào `levels` của mèo tương ứng (hoặc thêm mèo mới).
// Thanh ♥ góc trên trái: vào level thứ i của nhóm có i − 1 tim, thắng thì tô ô thứ i.
//   face: mặt mèo (bong bóng nhiệm vụ, màn thưởng); held: mèo trong cảnh bế; meow: tiếng kêu khi bế; tapSfx: chạm mèo đã lộ diện;
//   bar: vị trí ô đầu (x0), khoảng cách ô (step), bán kính vòng ô trống (r), bề rộng trái tim (heart); badge: icon nhỏ dưới tim (tuỳ chọn).
export const CATS = [
  { cat: 'sua', levels: [1, 2, 3, 4], face: 'sua_face_icon', held: 'sua_held', meow: 'sua_sfx_meow', tapSfx: 'sua_sfx_meow_cute',
    bar: { x0: 145, step: 62, r: 22, heart: 54 } },
  { cat: 'mun', levels: [5, 6, 7, 8, 9, 10], face: 'mun_face_icon', held: 'mun_held', meow: 'mun_sfx_meow', tapSfx: 'mun_sfx_meow_cute',
    bar: { x0: 135, step: 48, r: 18, heart: 44 }, badge: 'mun_face_icon' },
];

// Mèo của level n (không thuộc nhóm nào thì lấy mèo đầu).
export function catOf(n) { return CATS.find((c) => c.levels.includes(n)) || CATS[0]; }
