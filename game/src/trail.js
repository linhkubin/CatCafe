// Mèo đi theo chặng (L7, dùng chung): mèo tự đi qua một chuỗi chướng ngại; tới chướng ngại chưa dọn thì đứng chờ,
// người chơi dọn xong (màn gọi poke() sau mỗi lần đặt đồ) thì vượt qua rồi đi tiếp. Chướng ngại phía trước đã dọn sẵn thì đi thẳng.
// Mỗi chặng: { to: [x, y] | null (chỗ chờ trước chướng ngại; null = chờ tại chỗ đang đứng), open: () => bool (đã dọn chưa),
//   cross: (done) => void (diễn cảnh vượt qua, xong gọi done), wait: (leg) => void (tuỳ chọn: dáng chờ riêng, ví dụ bị gió đẩy),
//   leave: () => void (tuỳ chọn: dừng dáng chờ riêng khi bắt đầu vượt) }.
// hooks: walk(to, done) đi tới chỗ chờ; wait(leg) dáng chờ mặc định; done() hết chặng.
export class Trail {
  constructor(legs, hooks) {
    this.legs = legs;
    this.hooks = hooks;
    this.i = 0;
    this.state = 'idle'; // idle | walk | wait | cross | done
  }

  get leg() { return this.legs[this.i]; }
  // Đang đi / đang vượt: không nhận chạm mèo.
  get busy() { return this.state === 'walk' || this.state === 'cross'; }

  start() { this.next(); }

  next() {
    const leg = this.leg;
    if (!leg) { this.state = 'done'; if (this.hooks.done) this.hooks.done(); return; }
    this.state = 'walk';
    if (leg.to) this.hooks.walk(leg.to, () => this.arrive()); else this.arrive();
  }

  arrive() {
    const leg = this.leg;
    if (leg.open()) { this.cross(); return; }
    this.state = 'wait';
    (leg.wait || this.hooks.wait)(leg);
  }

  // Màn gọi sau khi dọn một chướng ngại: đang chờ đúng chỗ đó thì đi tiếp.
  poke() { if (this.state === 'wait' && this.leg.open()) this.cross(); }

  cross() {
    this.state = 'cross';
    if (this.leg.leave) this.leg.leave(); // dừng dáng chờ riêng
    this.leg.cross(() => { this.i++; this.next(); });
  }
}
