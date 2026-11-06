# Level 1–10 · Chương 1: Sữa và Mun

[← Luật chung và cách đọc](../leveldesign.md) · [Trạng thái đồ vật và animation level 1–10 →](states-01-10.md)

> Mô tả chi tiết cụm level 1–10. Luật thời lượng, độ khó, mở màn và kết màn chung, ký hiệu và thang gợi ý nằm trong [leveldesign.md](../leveldesign.md).

---

## Mèo trong cụm này

- **Level 1–4: Sữa** (mèo trắng nhà bạn, tham ăn, ngủ nhiều). Tìm đủ 4 lần → **Sữa vào quán cafe**.
- **Level 5–10: Mun** (mèo đen hàng xóm, mắt vàng, nhút nhát). Tìm đủ 6 lần → **Mun vào quán cafe**.

**Mun khác Sữa:** chạm thẳng vào chỗ Mun trốn thì nó rúc sâu hơn, luôn phải dụ ra.

---

## 1. Tổng quan 10 level

| Level | Độ khó | Giây | Mèo | Tên | Sự thật về mèo | Bước | Dạy |
|---|---|---|---|---|---|---|---|
| 1 | Dạy | 30 | Sữa | Hộp pate thần kỳ | Gọi không ra, mở hộp pate là có mặt | 2 | Chạm, Vuốt |
| 2 | Dạy | 50 | Sữa | Giỏ tất | Mèo trắng ngủ lẫn vào đống tất trắng | 6 | Chạm nhiều lần, nhìn kỹ |
| 3 | Dạy | 60 | Sữa | Quà xịn, hộp còn xịn hơn | Mua đồ chơi xịn, mèo chơi vài giây rồi chui vào cái hộp | 5 | Nhặt, Ghép, Đặt |
| 4 | 🟡 Normal | 90 | Sữa | Quả chuối trên rèm | Leo rèm giỏi nhưng không biết xuống; rơi luôn tiếp đất bằng bốn chân | 4 món + xếp tháp | Chuyển phòng, Xếp theo hình dáng |
| 5 | 🔴 Hard | 150 | Mun | Đốm sáng | Thấy đốm sáng chạy là không nhịn được | 7 | Điều khiển đốm sáng, Bản đồ mini |
| 6 | 🟡 Normal* | 90 | Mun | Xuống đây nào, Mun! (G6-1) | Hoảng thì leo lên cao, xuống thì sợ; đồ ăn dụ được | 8 | Kéo đồ trong cảnh, xếp đường |
| 7 | 🔴 Hard nhẹ* | 120 | Mun | Về nhà thôi, Mun! | Đêm mưa bão vẫn tự tìm đường về nhà người cứu nó; tới nơi vẫn rụt rè | 10 | Dọn đường cho mèo đi |
| 8 | 🟡 Normal* | 150 | Mun | Tắm cho Mun | Tắm xong việc đầu tiên là tự liếm lại toàn thân | 10 | Kéo dụng cụ lên mèo |
| 9 | 🟡 Normal* | 150 | Mun (+ Sữa cuối màn) | Súp thưởng | Mèo ít khát; súp thưởng giúp uống thêm nước mà không biết | 16 | Chuỗi cử chỉ nấu ăn |
| 10 | 🔴 Hard | 150 | Mun | Đại chiến quái thú | Cho hai mèo lạ ăn chung súp thưởng thì chúng làm quen, liếm lông cho nhau | 7 | Máy bay lấy đồ, dùng phản xạ của mèo làm dụng cụ |

**Tổng chương 1:** khoảng 16 phút giải đố.

\* Ngoại lệ luật số đuôi (chủ dự án chốt 2026-10-31): L7 Hard nhẹ (đuôi 7 vốn là Normal), L8 Normal 150 giây, 10 bước (màn chăm sóc, chủ dự án cho phép dài hơn); L9 giữ Normal (đuôi 9 vốn là Easy). "Đồ rơi khỏi kệ" (L8 cũ) dời sang **L12** (chương 2), mục mô tả để cuối file. "Ô vuông băng dính" dời sang **L11** (chương 2); mục mô tả vẫn để tạm cuối file này, chờ chốt mèo của L11 vì Mun đã vào quán ở L10.

---

## 2. Chi tiết từng level

### Level 1 — Hộp pate thần kỳ

| | |
|---|---|
| Độ khó | Dạy chơi · **30 giây** |
| Mèo | Sữa (♥ 1/4) |
| Phòng | 1: Phòng khách, buổi sáng |
| Dạy | Chạm, Vuốt |
| Bước bắt buộc | 2 (vuốt mở rèm, chạm hộp pate) |

**Sự thật về mèo:** gọi khản cổ, đuổi theo thì mèo vụt chạy trốn hết chỗ này sang chỗ khác; nhưng vừa mở hộp pate là mèo **đã ngồi sẵn cạnh hộp**. Màn đầu tiên dạy luật quan trọng nhất của game: **mèo không bị bắt, mèo tự đến**.

**Trạng thái mèo:** ở level 1 Sữa là **mèo né tránh có chủ ý** (G10). Mở màn, Sữa trốn sau gối trái, thò đuôi ra. Chạm vào chỗ Sữa trốn (đuôi hoặc gối) thì Sữa hiện ra một thoáng rồi vụt chạy trốn chỗ khác: gối trái → gối phải → sau rèm → biến mất. Đuổi không bao giờ bắt được. Sau tiếng "TÁCH!", Sữa **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
┌──────────────────────────────┐
│ ♥Sữa ○○○○                ⏸  │
│ ┌─────────┐          (2)     │
│ │(1) RÈM  │        ĐỒNG HỒ   │
│ │ cửa sổ  │        quả lắc   │
│ └(3a)bệ───┘                  │
│ ┌──────────────────────────┐ │
│ │ (4) GỐI~đuôi   (4b) GỐI  │ │
│ │ TRÁI    SOFA   PHẢI  (3) │ │
│ └──────────────────────────┘ │
│ ░░░░░░░░░(7) THẢM░░░░░░(6)░░ │
│ ░(5) HỘP░░░ hộp pate     Chậu│
│ ░CÁC-TÔNG░░ rơi xuống ░  cây │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                          💡  │
└──────────────────────────────┘
```

Level 1 chưa có túi đồ (chưa cần nhặt).

**Đồ vật:**

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Rèm cửa sổ | Trên trái | 🔑 | Vuốt ngang (chạm cũng được) | Rèm kéo sang, nắng chiếu vào, lộ **hộp pate trên bệ cửa sổ**. Nếu Sữa đang nấp sau rèm (rèm phồng nhẹ, đuôi thò dưới mép): Sữa vụt chạy ra khỏi màn hình, biến mất | Sột soạt vải |
| 2 | Đồng hồ tường | Trên phải | ✨ | Chạm | Quả lắc đung đưa mạnh, cửa nhỏ mở, chim gỗ thò ra gật mỏ rồi thụt vào | "Cúc cu" |
| 3 | Đệm sofa bên phải | Giữa phải | — | — | Đệm ngồi bình thường, tĩnh, không tương tác | — |
| 3a | Hộp pate (sau khi mở rèm) | Bệ cửa sổ | 🔑 | Chạm 2 lần | Lần 1: hộp bay ra giữa màn hình, phóng to, lơ lửng. Lần 2: nắp bật, Sữa xuất hiện, hộp bay xuống cạnh Sữa (xem Khoảnh khắc lộ diện) | **"TÁCH!"** |
| 4 | Gối trái (Sữa trốn sau, đuôi thò ra) | Giữa trái | 🎭 | Chạm gối hoặc đuôi | Gối lật; Sữa bật ra 0,2 giây (giật mình) rồi vụt chạy trốn sau gối phải | "Bụp" + meo ngắn |
| 4b | Gối phải (cùng gối trắng, lật ngang) | Giữa phải, trên đệm phải | 🎭 | Chạm gối hoặc đuôi | Gối lật; Sữa bật ra rồi vụt chạy trốn sau rèm. Không có Sữa: chỉ là gối, nhân vật gãi đầu | "Bụp" |
| 5 | Hộp các-tông | Trên thảm, bên trái | 🎭 | Chạm | Nắp mở: **trống trơn**, nhân vật nhún vai | Nắp giấy "sạt" |
| 6 | Chậu cây | Dưới phải | ✨ | Chạm | Lá rung, con bướm đang đậu trên lá bay một vòng rồi đậu lại | Lá xào xạc |
| 7 | Thảm | Đáy | ✨ | Vuốt | Góc trước bên trái của thảm cuộn lên rồi phẳng lại | Sột soạt |

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–4 | (xem) | Nhân vật bước vào, khum tay gọi. Đuôi Sữa thò ra sau gối trái, ve vẩy. **Bong bóng nhiệm vụ** (đầu mèo tối, dấu ?) bật ra giữa màn hình, rồi thu về góc |
| 5–10 | Chạm **đuôi / gối trái (4)** | Sữa bật ra, vụt chạy trốn sau gối phải |
| 11–15 | Chạm **đuôi / gối phải (4b)** | Sữa bật ra, vụt chạy trốn sau rèm (rèm phồng, đuôi thò dưới mép) |
| 16–20 | Vuốt mở **rèm (1)** | Sữa vụt chạy ra khỏi màn hình, biến mất. Lộ hộp pate trên bệ cửa sổ, bàn tay hướng dẫn chỉ vào hộp |
| 21–28 | Chạm **hộp pate (3a)**, rồi chạm lần nữa | Hộp bay ra giữa màn hình, phóng to, lơ lửng; chạm lần nữa: "TÁCH!" |
| 29–30 | Chạm **Sữa** | Bong bóng nhiệm vụ tô màu thành mặt Sữa. Bàn tay hướng dẫn chỉ vào Sữa. Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Chỗ trốn kế tiếp đã bị mở sẵn (gối phải đã lật trước, hoặc rèm đã mở trước): Sữa vụt chạy ra khỏi màn hình và **biến mất luôn**, không trốn nữa.
- Mở rèm lúc nào cũng lộ hộp pate. Chạm hộp lúc nào cũng thắng, kể cả khi Sữa còn đang trốn: Sữa biến mất rồi xuất hiện cạnh hộp như thường.
- Rèm đóng mở thoải mái; khi hộp còn trên bệ, đóng rèm thì hộp bị che (không chạm được), mở lại thì hộp lộ ra.
- Chạm gối không có Sữa: gối lật, chỉ là gối, nhân vật gãi đầu.
- Chạm hộp các-tông nhiều lần: lần 2 hộp tự lật úp lắc lắc, lần 3 nhân vật đội hộp lên đầu (tùy chọn; vui, không phạt).

**Thang gợi ý:**
Trước khi lộ hộp pate **không có gợi ý tự động** (G10).
1. *💡 (người chơi bấm):* bàn chân mèo chỉ vào đuôi chỗ Sữa đang trốn; nếu Sữa đã ở sau rèm hoặc đã biến mất thì vẽ đường vuốt ngang trên rèm.
2. Sau khi lộ hộp pate: bàn tay hướng dẫn chỉ vào hộp; *8 giây:* hộp nảy nhẹ; *16 giây:* hộp lấp lánh; 💡 chỉ vào hộp.

**Khoảnh khắc lộ diện (G1-30, chủ dự án đổi):** ngay khi nắp bật "TÁCH!", **một cái bóng mèo trắng vụt tới cực nhanh** (khoảng 0,3 giây) từ mép màn hình (phía chỗ Sữa vừa trốn) tới chỗ ngồi trên thảm trước sofa: thân kéo dài thành vệt, có vệt gió phía sau, tiếng "vút", tới nơi thì **phanh gấp** (vài vệt bụi nhỏ). Bóng đáp xuống là **Sữa đã ngồi ngay ngắn chờ sẵn**, rồi toàn màn hình **khựng nửa giây** (mọi chuyển động dừng, một nhịp im lặng). Hộp mở bay dần xuống đáp cạnh Sữa (bên phải), mắt tròn xoe, nhìn chằm chằm vào pate, như thể Sữa đã ngồi đó từ lâu. Chỗ buồn cười: gọi mãi không ra, nhưng nghe tiếng mở pate thì nhanh hơn chớp. Sữa "meo" một tiếng thật dài (như trách "sao giờ mới mở") rồi cúi đầu ăn. Nhân vật trồi lên ngạc nhiên một giây.

**Chạm Sữa → cảnh bế chung.** Bàn tay hướng dẫn chỉ vào Sữa (lần duy nhất trong game có hướng dẫn cho cảnh kết).

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Tiếng "TÁCH!" là âm thanh quan trọng nhất của màn: phải giòn, rõ, giống thật, như **mở lon nước ngọt**: tách khoen kim loại + xì hơi ngắn (O2-21). Âm (`sfx_pop_can`) và hình nổ (`fx_pop`) là đồ dùng chung, sẽ dùng lại ở level 10.
- Sữa cần: đuôi thò ra (`sua_tail_peek`), vụt chạy (`sua_run`), ngồi nhìn chằm chằm, ngẩng lên kêu meo, cúi đầu ăn (2 khung nhai). Cảnh bế dùng bộ hoạt hình chung.
- Nhân vật: khum tay gọi (mở màn), gãi đầu (gối), nhún vai (hộp trống), ngạc nhiên (Sữa lộ diện). Mỗi lần phản ứng nhân vật trồi lên từ mép dưới khoảng 1 giây.
- Key ảnh, trạng thái, toạ độ: `levels/states-01-10.md` mục Level 1 và `art/design-art-level1.md`.
- Nhạc nền: nhẹ, buổi sáng. Khi khựng nửa giây, nhạc tắt theo.

**Thưởng:** 10 Cá khô · Sữa ♥ 1/4.

---

### Level 2 — Giỏ tất

| | |
|---|---|
| Độ khó | Dạy chơi · **50 giây** (G2-8) |
| Mèo | Sữa (♥ 2/4) |
| Phòng | 1: Phòng ngủ, buổi trưa |
| Dạy | Chạm nhiều lần vào cùng một chỗ, nhìn kỹ (mèo lẫn vào đồ vật) |
| Bước bắt buộc | 6 (chạm giỏ tất 6 lần; G2-8) |

**Sự thật về mèo:** mèo ngủ ở những chỗ không ai ngờ, và mèo trắng **lẫn vào mọi thứ màu trắng**. Sữa ngủ trong **giỏ tất trắng**, nhìn qua chỉ là một đống tất.

**Trạng thái mèo:** Sữa **Ẩn** (ngụy trang giữa đống tất trắng) cho tới khi chiếc tất thứ 6 bay ra. Mỗi lần chạm vào giỏ tất chỉ làm một chiếc tất bay ra. Sau chiếc thứ 6, Sữa **Lộ diện**: chạm là thắng.

**Đồ ngụy trang giống mèo:** cả căn phòng rải rác **những thứ màu trắng, tròn tròn, trông y như một con mèo trắng đang cuộn tròn** (gối trắng dưới chăn, mèo nhồi bông trắng, mũ len trắng có hai quả bông như tai mèo, áo len trắng cuộn tròn, dép bông tai mèo). Người chơi chạm vào từng thứ, thứ nào cũng **hóa ra không phải**, nên giỏ tất (nơi Sữa thật nằm) cũng bị lẫn vào giữa những thứ đó. Mỗi đồ ngụy trang có một phản ứng buồn cười riêng để việc chạm nhầm thành niềm vui chứ không phải bực bội.

**Bố cục màn hình:**

```
┌──────────────────────────────┐
│ ♥Sữa ●○○○                ⏸  │
│ (8) MŨ LEN  (6) CHAO ĐÈN     │
│ trắng 2 quả bông 🎭          │
│ ┌────────┐      ┌──────────┐ │
│ │(1) RÈM │      │(3a) HỘP  │ │
│ │cửa sổ  │      │ GIÀY nóc │ │
│ └────────┘      │(3) TỦ    │ │
│ (2) KỆ: mèo     │QUẦN ÁO   │ │
│ nhồi bông 🎭    │          │ │
│ ┌────────────┐  └──────────┘ │
│ │(4) GIƯỜNG  │  (11) GHẾ: áo │
│ │ chăn ◠ 🎭  │  len trắng 🎭 │
│ └────────────┘               │
│ (10) DÉP BÔNG  (7) GIỎ TẤT   │
│ tai mèo 🎭     đầy tất trắng │
│ (5) gầm giường (9) CUỘN TẤT  │
│                trắng 🎭  💡  │
└──────────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Rèm cửa sổ | Trên trái | ✨ | Vuốt | Rèm kéo ra, nắng chiếu đúng vào giỏ tất (gợi ý ngầm). **Lần đầu mở (G2-30):** cửa sổ hé, gió lùa vào, lộ **bình bông lau trắng (1b)** trên bậu cửa sổ: bông lau cong vút **quất một cái như đuôi mèo** đúng lúc lộ ra (người chơi tưởng mèo), rồi đung đưa chậm | Sột soạt + gió vù nhẹ |
| 1b | **Bình bông lau trắng** trên bậu cửa sổ, sau rèm (G2-30): một chùm bông lau (cỏ lau, pampas) trắng kem, bông to, cong, xù như **đuôi mèo trắng dựng lên** | Bậu cửa sổ | 🎭 | Chạm (khi rèm mở) | Bông lau **quất qua quất lại 2 nhịp như đuôi mèo ve vẩy**, vài sợi bông bay lơ lửng; nhân vật **hắt xì** một cái. Rèm đóng thì bình bị che, không nhận chạm | Sột soạt + "hắt xì" |
| 1a | Dây buộc rèm bông trắng thò xuống **như đuôi mèo** (G2-7) | Mép rèm | 🎭 | Chạm | Dây đung đưa, rèm khẽ lay. **Chỉ có khi rèm đóng:** mở rèm thì dây ẩn đi (G2-31), đóng lại thì hiện lại | Sột soạt |
| 2 | Mèo nhồi bông **trắng** trên kệ | Giữa trái | 🎭 | Chạm | Rơi xuống, kêu "chít", nằm ngửa, hai mắt cúc áo nhìn bạn | "Chít" |
| 3 | Tủ quần áo | Phải | ✨ | Chạm | Cánh tủ mở: chỉ thấy **quần áo gấp ngăn nắp** từng ngăn; chạm lần nữa đóng lại | Bản lề "kẹt" |
| 3a | Hộp giày trên nóc tủ: nắp hé, **hai tai mèo** thò lên (G2-7) | Trên phải | 🎭 | Chạm | Hộp bật nắp: hoá ra **mũ len tai mèo màu hồng nhạt**, mũ nảy lên rồi rơi lại vào hộp | "Cộc" |
| 4 | Chăn trên giường (có một cục phồng rõ) | Dưới trái | 🎭 | Vuốt | Chăn lật ra: **không có gì** (chỉ gối trắng, nệm trống), nhân vật nhún vai | Sột soạt |
| 5 | Gầm giường: thò ra một **túm lông trắng cong như đuôi mèo**, thỉnh thoảng ve vẩy nhẹ (G2-9). Phần thò ra **ngắn hơn bản cũ khoảng 1/3** (G2-30): chỉ cỡ một cái đuôi mèo thật, không dài quá | Đáy trái | 🎭 | Chạm | Kéo ra hoá ra là **cây chổi lông quét bụi** (cán gỗ, lông trắng bông), nằm trên sàn cạnh giường; nhân vật gãi đầu | "Xẹt" |
| 6 | Chao đèn trần | Trên giữa | ✨ | Chạm | Đèn đung đưa, bóng đổ lắc lư | "Kẽo kẹt" |
| 7 | Giỏ tất | Dưới phải | 🔑 | Chạm ×3 | Mỗi lần một chiếc tất bay ra (xem luồng giải) | "Vèo" mỗi lần |
| 8 | Mũ len trắng có hai quả bông (như hai tai mèo) trên móc | Trên trái | 🎭 | Chạm | Mũ rơi xuống, nhân vật đội thử lên đầu, hai quả bông ve vẩy như tai mèo | "Bụp" |
| 10 | Đôi dép bông trắng có tai mèo | Dưới trái | 🎭 | Chạm | Dép kêu "chút chít", hai cái tai dép vểnh lên rồi cụp xuống | "Chút chít" |
| 11 | Áo len trắng cuộn tròn trên ghế | Giữa phải | 🎭 | Chạm | Áo bung ra, hai tay áo rơi thõng xuống như hai chân trước | Sột soạt |

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–4 | (xem) | Nhân vật bước vào gọi, bong bóng nhiệm vụ cạnh nhân vật. Sữa không xuất hiện (O2-4), chỉ nghe tiếng ngáy rất nhỏ |
| 3–25 | Chạm đủ mọi chỗ, đặc biệt là **những thứ trắng tròn trông giống mèo**: chăn có cục phồng, mèo nhồi bông, mũ len, áo len, dép bông | Thứ nào cũng hóa ra không phải mèo, mỗi thứ một phản ứng buồn cười |
| 26–29 | Chạm **giỏ tất** lần 1 | Chiếc **tất kẻ sọc** bay vèo ra theo đường cong, rơi đáp nằm trên **mặt giường**, nảy nhẹ. Giỏ khẽ nảy |
| 30–32 | Chạm lần 2 | Chiếc **tất chấm bi** bay ra, rơi xuống **sàn cạnh chân giường**. Ảnh giỏ vơi đi (`_2`) |
| 33–35 | Chạm lần 3 | Chiếc **tất trắng to** bay ra, rơi xuống **thảm cạnh đôi dép** |
| 36–38 | Chạm lần 4 | Chiếc **tất ngôi sao** bay ra, rơi lên **kệ** (bên trái, cạnh sách). Ảnh giỏ vơi tiếp (`_3`) |
| 39–41 | Chạm lần 5 | Chiếc **tất em bé** bay ra, rơi lên **mặt ghế**, cạnh áo len |
| 42–45 | Chạm lần 6 | Chiếc **tất dài** bay ra, rơi lên **kệ cạnh chậu cây**. Ảnh giỏ `_reveal`: lộ Sữa (xem Khoảnh khắc lộ diện) |
| 46–50 | Chạm **Sữa** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Chạm giỏ tất ngay từ đầu: hoàn toàn được, màn chỉ còn khoảng 20 giây (người tinh mắt được thưởng).
- Chạm giỏ tất liên tục rất nhanh: mỗi lần chạm cách nhau tối thiểu 0,4 giây để từng chiếc tất bay ra rõ ràng.

**Thang gợi ý (G2-2, sửa theo G2-8):** không có gợi ý tự động theo giờ.
1. *Manh mối công bằng luôn có:* tiếng ngáy rất nhỏ của Sữa, to dần qua 6 nấc theo số tất đã bay ra. Giỏ **đứng yên hoàn toàn** (G2-8 bỏ nhịp thở của G2-2).
2. *💡:* bàn chân mèo chạm vào giỏ tất (sau khi lộ: chỉ vào Sữa).

**Khoảnh khắc lộ diện:** khi chiếc tất thứ 6 bay ra, đống tất còn lại **từ từ hiện rõ thành hình một con mèo trắng cuộn tròn**: đầu tiên là đường viền tai, rồi cái đuôi quấn quanh người, rồi cái mũi hồng. Sữa **không tỉnh dậy**: chỉ giật tai, duỗi một chân trước, hé một mắt nhìn bạn, ngáp, rồi rúc mặt vào chiếc tất ngủ tiếp.

**Chạm Sữa → cảnh bế chung.** Giỏ tất ở lại cảnh nền.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- **Quan trọng nhất:** trước khi lộ ra, Sữa phải vẽ **cùng màu, cùng nét, cùng bóng đổ** với đống tất trắng. Người tinh mắt nhìn kỹ có thể thấy một hình tròn hơi khác, nhưng người lướt qua thì không.
- **Đồ ngụy trang (2, 4, 8, 9, 10, 11)** và **chỗ thò tai/chân/đuôi giả (1a, 1b, 3a, 5; G2-7, G2-30)** vẽ cùng tông trắng, cùng độ tròn, cùng kích cỡ với Sữa khi cuộn tròn, để mắt người chơi không phân biệt được ngay. Giỏ tất và mọi đồ ngụy trang đều đứng yên (G2-8 bỏ nhịp thở); manh mối công bằng là tiếng ngáy to dần và việc chạm giỏ lần nào cũng có tất bay ra.
- Đồ ngụy trang đã chạm thì giữ trạng thái sau khi chạm (mũ rơi, áo bung…), để người chơi biết mình đã thử chỗ nào.
- 6 chiếc tất bay ra (G2-8, O2-19: nhỏ cỡ thật, bay theo đường cong rồi rơi đáp, nảy nhẹ) nằm ở 6 chỗ đỡ được (mặt giường, sàn cạnh chân giường, thảm cạnh dép, kệ trái, mặt ghế, kệ cạnh chậu cây; không treo lên cánh tủ, chao đèn, lưng ghế) và **ở nguyên đó** cho tới hết màn (căn phòng lộn xộn dần, vui mắt).
- Âm nền: tiếng ngáy rất nhỏ, dễ thương của Sữa (`sua_sfx_snore`, lặp), to dần theo 6 nấc, mỗi chiếc tất bay ra một nấc.

**Thưởng:** 15 Cá khô · Sữa ♥ 2/4.

---

### Level 3 — Quà xịn, hộp còn xịn hơn

| | |
|---|---|
| Độ khó | Dạy chơi · **65 giây** |
| Mèo | Sữa (♥ 3/4) |
| Phòng | 1: Phòng khách, buổi chiều |
| Dạy | **Nhặt, Đặt, Lắp theo hình** (túi đồ xuất hiện lần đầu) |
| Bước bắt buộc | 7 (nhặt kéo, đặt kéo lên hộp, lắp 4 mảnh cột cào trên thảm, chạm hộp úp) |

**Sự thật về mèo:** bạn mua cho mèo một **cột cào xịn**, mèo chơi được đúng vài giây rồi bỏ đó, chui vào **cái hộp đựng nó**.

**Trạng thái mèo (thay đổi trong màn):**

| Giai đoạn | Sữa ở đâu | Chạm vào thì sao |
|---|---|---|
| 1. Trước khi có cột cào | Sau rèm, chỉ thấy bóng (**Lẩn tránh**) | Sữa **chạy vụt** sang góc rèm bên kia |
| 2. Cột cào vừa lắp xong | Ra khỏi rèm, vồ quả bông trên đỉnh cột cào khoảng 3 giây (**Lẩn tránh**) | Sữa giật mình **chạy vụt ra sau cột cào và biến mất ngay** (chuyển luôn sang giai đoạn 3). Không thắng |
| 3. Chơi xong | Sữa chạy vòng ra sau cột cào rồi **biến mất**: thật ra đã chui vào gầm **cái hộp đang úp** (**Ẩn**) | Chạm hộp úp: **hộp lật ngửa lên**, Sữa nằm gọn bên trong |
| 4. Hộp đã lật ngửa | Trong hộp (**Lộ diện**) | **Thắng** |

**Cơ chế hộp úp:**
- Khi kéo cắt băng dính, **4 mảnh cột cào** bay vào túi, **cái hộp rỗng tự lộn nhào úp xuống sàn** ("bộp").
- Trong lúc người chơi lắp cột cào, hộp úp **không nhận chạm**: chạm vào không rung, không sáng, không có âm thanh. Hộp chỉ là một vật nằm im trong cảnh.
- Chỉ sau khi Sữa chơi xong và biến mất, hộp úp mới **nhận chạm**. Kể cả lúc đó hộp cũng **nằm im hoàn toàn** (không rung, không nhích, không lấp lánh tự động): người chơi phải tự nghĩ ra.

**Cơ chế lắp cột cào (4 mảnh, lắp theo hình):**
- 4 mảnh: (1) **bục xanh + cột** (đế vuông xanh bạc hà kèm trụ thừng dưới), (2) **bục hồng + cột** (tầng tròn hồng kèm trụ thừng trên), (3) **bục trắng** (ổ lông kem trên đỉnh, có móc treo), (4) **quả cầu lông** đỏ (treo vào móc ổ đỉnh bằng sợi dây).
- Khi 4 mảnh vào túi, trên thảm (6) hiện **hình mờ chỉ của mảnh 1** (bục xanh + cột) để dạy chỗ đặt. Lắp xong mảnh 1 thì **không còn hình mờ** nào nữa: người chơi tự nhìn hình dạng mà chồng tiếp lên trên.
- Người chơi kéo từng mảnh từ túi thả lên đúng vùng của nó, **theo thứ tự từ dưới lên**: bục xanh + cột → bục hồng + cột → bục trắng → quả cầu lông (treo vào móc). Mảnh khớp: "cạch", lóe sáng nhẹ.
- Thả mảnh vào vùng chưa tới lượt (vùng trên khi vùng dưới còn trống) hoặc ra ngoài thảm: mảnh lắc lắc rồi bay về túi, vùng **đang tới lượt** nhấp nháy.
- Quả cầu lông treo vào móc: cả cột cào lóe sáng, quả cầu bắt đầu đung đưa.

**Bố cục màn hình:**

```
┌──────────────────────────────┐
│ (●?) ♥Sữa ●●○○           ⏸  │
│ ┌──────────┐                 │
│ │(1) RÈM   │   (5) LỌ HOA    │
│ │ bóng mèo │   trên kệ       │
│ │ sau rèm  │                 │
│ └──────────┘                 │
│ ┌────────────┐  ┌──────────┐ │
│ │(2) BÀN:    │  │ SOFA (4) │ │
│ │ CÂY KÉO    │  │GỐI TRẮNG │ │
│ └────────────┘  └──────────┘ │
│     ┌────────────┐           │
│     │(3) HỘP QUÀ │  (6) THẢM │
│     │ băng dính ✕│  trống    │
│     └────────────┘           │
│  (sau khi cắt: hộp úp ▀▀▀▀)  │
├──────────────────────────────┤
│ [ ][ ][ ][ ][ ][ ]       💡  │ ← Túi đồ (hiện lần đầu)
└──────────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Rèm (bóng Sữa phía sau) | Trên trái | — | Chạm / Vuốt | Sữa **chạy vụt** sang góc rèm bên kia (Lẩn tránh) | "Meo" tinh nghịch |
| 2 | Cây kéo trên bàn | Giữa trái | 🎒 | Chạm | Kéo bay xuống **túi đồ**. Kéo vẽ **to, dễ thấy, dễ chạm** | "Vút" + "tách" vào túi |
| 3 | Hộp quà dán băng dính chữ thập | Giữa | 🎯 | Chạm / Đặt kéo | **Chạm:** hộp rung, băng dính chắc quá. **Đặt kéo:** kéo tự cắt "xoẹt", nắp bung, **4 mảnh cột cào** bay vào túi, **hộp rỗng lộn nhào úp xuống sàn** | "Xoẹt" + giấy xé + "bộp" |
| 3' | Hộp úp | Giữa | 🔑 | Chạm | **Trước khi Sữa biến mất:** không nhận chạm. **Sau khi Sữa biến mất:** vẫn nằm im, chạm vào thì hộp **lật ngửa lên**, Sữa nằm gọn bên trong | "Bộp" + "meo?" |
| 4 | Gối lông trắng trên sofa | Phải | 🎁 | Chạm | Gối nảy lên lật mặt, **5 Cá khô** bay ra. Chỉ thưởng lần đầu, lần sau chỉ nảy | "Bụp" + leng keng |
| 5 | Lọ hoa trên kệ | Trên phải | 🎁 | Chạm | Lọ nghiêng, **5 Cá khô** rơi ra. Chỉ thưởng lần đầu | Leng keng |
| 6 | Thảm trống cạnh hộp | Dưới phải | 🎯 | Đặt 4 mảnh | Hình mờ mảnh 1 trên thảm; lắp từng mảnh từ dưới lên (xem "Cơ chế lắp cột cào") | "Cạch" mỗi mảnh |
| 6' | Cột cào (sau khi Sữa biến mất) | Dưới phải | ✨ | Chạm | Quả bông đung đưa, không có ai vồ | "Bông bông" |

**Lắp:** bục xanh + cột → bục hồng + cột → bục trắng → quả cầu lông = **cột cào mèo** (lắp trên thảm, không ghép trong túi).

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–8 | (xem) | Shipper đặt hộp quà xuống rồi đi. Sữa chạy vụt ra sau rèm. Bong bóng nhân vật: hình cái kéo |
| 9–18 | Chạm **cây kéo (2)** | **Túi đồ trượt lên từ đáy màn hình** (lần đầu). Bàn tay hướng dẫn chỉ kéo. Kéo bay vào ô đầu tiên |
| 19–26 | Kéo **kéo** từ túi thả lên **hộp quà (3)** | Bàn tay hướng dẫn làm mẫu kéo-thả. "Xoẹt", 4 mảnh cột cào vào túi, hộp rỗng lộn nhào **úp xuống sàn**. Hình mờ mảnh 1 hiện trên thảm |
| 27–46 | Kéo lần lượt **4 mảnh** từ túi thả lên **thảm (6)**, chồng từ dưới lên | Bàn tay hướng dẫn làm mẫu **mảnh đầu (bục xanh + cột)**, các mảnh sau người chơi tự làm. Mỗi mảnh "cạch", lóe sáng. Treo quả cầu lông xong: cả cột cào lóe sáng, quả cầu đung đưa |
| 47–54 | (xem) | Sữa ló đầu khỏi rèm, chạy tới **vồ quả bông** hai ba cái, cào thử… rồi chạy vòng ra sau cột cào và **biến mất**. Ngay sau đó **bong bóng nhiệm vụ** (đầu mèo tối) bật ra giữa màn hình nhắc "tìm mèo", rồi thu về góc |
| 55–62 | Người chơi tự tìm, chạm **hộp úp (3')** | Hộp **lật ngửa lên**: Sữa nằm gọn bên trong (xem Khoảnh khắc lộ diện) |
| 63–66 | Chạm **Sữa** trong hộp (không có bàn tay chỉ; 💡 vẫn chỉ được) | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Thả kéo vào chỗ khác (sàn, sofa): kéo lắc lắc rồi bay về túi.
- Thả mảnh cột cào vào vùng chưa tới lượt, hoặc ra ngoài thảm (6): mảnh lắc lắc rồi bay về túi (không hiện hình mờ).
- Thả mảnh này lên mảnh khác trong túi: hai món chạm nhau, nảy ra, về chỗ cũ (màn này không ghép trong túi).
- Chạm hộp úp trong lúc đang ghép, đặt cột cào: không có phản ứng gì (hộp chưa nhận chạm).
- Vuốt hoặc chạm rèm nhiều lần: Sữa chạy qua lại giữa hai góc rèm, có lúc thò đầu ra lè lưỡi. Chạm vào lúc thò đầu thì Sữa lại chạy vụt đi (vẫn là Lẩn tránh).
- Chạm Sữa lúc đang vồ quả bông (giai đoạn 2): Sữa giật mình **chạy vụt ra sau cột cào và biến mất** ngay lập tức. Muốn thắng vẫn phải **lật hộp úp**. Đây là ngoại lệ có chủ ý: ở màn này, chỉ có cách tìm Sữa trong hộp.
- Sau khi Sữa biến mất, chạm cột cào hoặc rèm: không có ai, quả bông đung đưa vô ích.

**Thang gợi ý:**
1. *8 giây:* bước hiện tại rung nhẹ (kéo trên bàn, băng dính trên hộp, icon mảnh tới lượt trong túi nảy lên).
2. *16 giây:* đồ cần chạm lấp lánh.
3. **Sau khi Sữa biến mất: tắt gợi ý tự động** (không rung, không lấp lánh, không đuôi thò ra). Người chơi tự tìm; thỉnh thoảng nghe một tiếng "meo" rất nhỏ là đủ.
4. *💡:* bàn chân mèo làm mẫu thao tác đúng (cuối màn: chỉ vào hộp úp). Đây là cách duy nhất để được chỉ hộp.

**Khoảnh khắc lộ diện:**
1. Cột cào vừa dựng xong, quả bông đung đưa. Sữa ló đầu khỏi rèm, mắt sáng lên, chạy tới, **vồ quả bông** hai ba cái, cào thử thân cột cào một nhát.
2. Rồi Sữa **mất hứng**, chạy vòng ra sau cột cào… và không thấy đâu nữa. Quả bông vẫn đung đưa. Bong bóng nhiệm vụ (đầu mèo tối) bật ra giữa màn hình nhắc tìm mèo, rồi thu về góc.
3. Người chơi chạm vào hộp úp: hộp **lật ngửa lên** "bộp". Sữa **nằm gọn trong hộp**, chỉ thò đầu và hai tai, đuôi vắt qua mép hộp ve vẩy, nhìn lên bạn như thể nó vẫn luôn ở đó.
4. **Nhân vật ngốc nghếch cố giành lại sự chú ý (G3-30, chủ dự án đổi, thay cho mặt buồn hiu, không dùng bong bóng biểu cảm):**
   - Nhân vật chạy tới cột cào, **cầm quả bông đỏ lắc lắc** ngay trước mặt Sữa, mắt sáng rỡ, nhún nhảy mời mọc.
   - Sữa liếc quả bông đúng một cái… rồi **ngáp**, **rụt sâu vào hộp**, chỉ còn hai cái tai thò lên.
   - Nhân vật nhìn quả bông, nhìn cái hộp, ngẫm một giây… rồi **tự leo lên tầng trên cùng của cột cào, cuộn tròn nằm như mèo**: người to quá, chân tay thò ra ngoài, cột cào lắc lư cót két. Nhân vật **cười ngốc**, tự vờn quả bông bằng tay như mèo.
   - Sữa ló mắt khỏi hộp nhìn nhân vật một cái (vẻ "đồ ngốc"), rồi rúc vào lại.
   - Thông điệp đọc được không cần chữ: **đồ chơi xịn cho người, cái hộp cho mèo**.

**Chạm Sữa → cảnh bế chung.** Cái hộp ở lại cảnh nền, cạnh cột cào. Sữa nhận chạm ngay khi hộp lật ngửa (không phải chờ hết đoạn nhân vật diễn); chạm sớm thì cắt sang cảnh bế. Thời lượng đoạn 4 khoảng 4–5 giây.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- **Túi đồ** xuất hiện lần đầu với hiệu ứng trượt lên từ đáy, kèm âm thanh "tưng".
- Cột cào vẽ thật **xịn**: nhiều tầng, có lông mềm, quả bông đỏ. Càng xịn thì trò đùa càng buồn cười.
- Hiệu ứng ghép (xoay vào nhau, lóe sáng) là hiệu ứng chuẩn, dùng chung cho mọi lần ghép trong game.
- Cảnh Sữa "biến mất" không cần hiệu ứng phép thuật: Sữa chỉ chạy khuất sau cột cào. Hộp úp **không nhúc nhích**.
- Hộp úp lúc nào cũng vẽ bình thường, không viền sáng, không rung.
- Rèm và cửa sổ nhỏ hơn bản demo một chút và nằm **sau** sofa (sofa che một phần chân rèm).

**Thưởng:** 20 Cá khô (+5 mỗi bí mật: gối, lọ hoa) · Sữa ♥ 3/4.

---

**Chốt theo chủ dự án (G3-31, 2026-10-31):** đoạn cuối, nhân vật **không cầm quả cầu lông đỏ** trong tay (xoá quả cầu và dây khỏi tay `player_dangle_pompom`); dáng và chuyển động giữ nguyên.

### Level 4 — Quả chuối trên rèm

| | |
|---|---|
| Độ khó | 🟡 **Normal · 90 giây** |
| Mèo | Sữa (♥ 4/4) |
| Phòng | 3: Phòng ngủ ◄ **Phòng khách** (bắt đầu) ► Phòng làm việc |
| Dạy | **Chuyển phòng** (mũi tên ở mép màn hình), **xếp chồng theo hình dáng** (không có hình mờ, không ép thứ tự) |
| Bước bắt buộc | 4 món (đệm, gối, chồng sách, vali) + 2 trở ngại nhỏ (kéo sách, mở vali) + xếp 4 món. Thao tác ngắn nên vẫn khoảng 90 giây |

**Sự thật về mèo:** mèo **leo rèm** rất giỏi nhưng **không biết đường xuống**. Rơi từ đâu cũng **tiếp đất bằng bốn chân**, rồi tỉnh bơ như chưa có chuyện gì.

**Trạng thái mèo:**

| Giai đoạn | Sữa ở đâu | Chạm vào thì sao |
|---|---|---|
| 1. Treo trên rèm (từ đầu màn) | Trên đỉnh rèm, **thấy rõ ngay từ đầu** nhưng **không với tới** (**Lẩn tránh**). Người chơi nhìn là biết Sữa ở đâu và cần giải cứu | Sữa vung chân cào không khí, rèm xoay nửa vòng, Sữa quay mặt vào tường giận dỗi 2 giây rồi quay lại. Không thắng |
| 2. Tháp xếp xong | Nhân vật đứng trên đỉnh tháp với tay | Không nhận chạm (cảnh tự chạy, khoảng 3 giây) |
| 3. Tiếp đất | Ngồi trên sàn cạnh tháp, liếm chân (**Lộ diện**) | **Thắng** |

**Gag xuyên màn: mỗi lần chạm rèm, một tư thế mới (G4-29).** Mỗi lần người chơi chạm vào rèm hoặc Sữa, Sữa đổi sang tư thế treo kế tiếp (lặp lại từ đầu sau tư thế 4):
1. Treo bằng hai chân trước, thân duỗi dài như sợi mì, bốn chân dang kiểu **quả chuối**.
2. Trượt xuống một nấc, **một chân bám**, mặt cam chịu.
3. **Treo ngược**, đuôi chĩa lên trời.
4. **Ngủ gật** ngay trên rèm, bong bóng ngủ bay lên.

Lúc đang ở phòng khách, Sữa kêu "meo" theo nhịp rèm đung đưa.

**Bố cục màn hình:**

```
PHÒNG NGỦ                     PHÒNG KHÁCH (bắt đầu)          PHÒNG LÀM VIỆC
┌────────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
│ ♥Sữa ●●●○           ⏸ │   │ ♥Sữa ●●●○           ⏸ │   │ ♥Sữa ●●●○           ⏸ │
│  (5) ĐÈN NGỦ           │   │ ┌─────────────(1) RÈM─┐│   │ ┌──────────────┐       │
│  (tất dính sau khi     │   │ │ Sữa treo trên đỉnh  ││   │ │(9) KỆ SÁCH   │       │
│   đệm đổ)              │   │ │                     ││   │ │ cao, kín sách│       │
│ ┌──────┐               │   │ │   cửa sổ            ││   │ └──────────────┘       │
│ │(2)   │  ┌──────────┐ │   │ │                     ││   │                        │
│ │ĐỆM   │  │(3) GIƯỜNG│ │   │ └─────────────────────┘│   │  (10) VALI  (11) BÓNG  │
│ │dựng  │  │  + GỐI   │ │ ◄►│  (12) CHỖ XẾP THÁP     │◄► │   căng phồng   YOGA 🎭 │
│ │đứng  │  └──────────┘ │   │   ngay dưới rèm        │   │                        │
│ └──────┘ (4) GẤU BÔNG🎭│   │        (13) SOFA       │   │   (14) BÀN LÀM VIỆC    │
├────────────────────────┤   ├────────────────────────┤   ├────────────────────────┤
│ [ ][ ][ ][ ]       💡  │   │ [ ][ ][ ][ ]       💡  │   │ [ ][ ][ ][ ]       💡  │
└────────────────────────┘   └────────────────────────┘   └────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Phòng | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Rèm (Sữa treo trên đỉnh) | Khách | — | Chạm | Rèm **không đóng mở**, chỉ đung đưa nhẹ. **Mỗi lần chạm** Sữa hoặc rèm: Sữa đổi sang **tư thế treo kế tiếp** (Lẩn tránh, G4-29) | "Meo" tủi thân |
| 2 | Đệm dựng tựa tường | Ngủ | 🔑 | Chạm | Đệm đổ "phịch" xuống sàn (**không rung, không bụi**, G4-21), **một chiếc tất văng lên vắt trên chao đèn ngủ (5)**. Lúc dựng, đệm ở **sau** tủ đầu giường; khi đã nằm xuống, đệm ở **trước** (layer cao hơn) tủ đầu giường (G4-35) | "Phịch" |
| 2' | Đệm nằm trên sàn | Ngủ | 🎒 | Chạm | Đệm bay vào túi | "Vút" |
| 3 | Gối trên giường | Ngủ | 🎒 | Chạm | Gối bay vào túi (món dễ, giữ nhịp) | "Bụp" |
| 4 | Gấu bông trắng ngồi | Ngủ | 🎭 | Chạm | Trông như mèo trắng ngồi. Chạm: gấu **bật nhún nhẹ lên** rồi ngồi lại như cũ. **Không nhặt được** | "Bụp" nhẹ |
| 5 | Tất dính trên đèn ngủ | Ngủ | 🎁 | Chạm | Chỉ có sau khi đệm đổ. Tất **nhún bật lên, nhảy theo đường cong đáp xuống nằm trên mặt giường** (nảy nhẹ, nằm lại đó tới hết màn), 5 Cá khô (G4-36) | "Tạch" + "bụp" nhẹ |
| 9 | Kệ sách cao | Làm việc | 🔑 | Chạm kệ | **Chỉ làm được sau khi vali đã vào túi** (G4-34). Trước đó: kệ chỉ lung lay khẽ, sách không rơi, bong bóng nhỏ hình vali. Sau khi có vali: **3 cuốn ở hàng trên cùng** lần lượt bật ra, **vừa rơi vừa xoay từ dựng đứng sang nằm ngang**, đáp chồng khít lên nhau thành **đúng chồng sách** (cùng 3 cuốn, cùng màu, cùng thứ tự như chồng sách và sách trên tháp; cuốn sau đáp đúng lên mặt cuốn trước, không lệch). Các hàng khác vẫn đầy (G4-30, G4-37) | "Rầm" nối tiếp + "cộp" |
| 9' | Chồng sách dưới sàn | Làm việc | 🎒 | Chạm | Chồng sách bay vào túi | "Vút" |
| 10 | Vali căng phồng | Làm việc | 🔑 | Chạm lần 1 | Vali **bung nắp kèm một cụm khói bụi pastel mềm phụt ra** (G4-44; riêng vali, đệm vẫn không bụi), **cả đống đồ bay ra** (phao bơi hình vịt, kính lặn, dép lẻ, quần áo) rơi rải khắp phòng; vali rỗng **tự gấp lại** gọn | "Bụp" + đồ rơi lộp bộp |
| 10' | Vali đã gấp | Làm việc | 🎒 | Chạm lần 2 | Vali bay vào túi | "Vút" |
| 10a | Phao vịt (rơi từ vali) | Làm việc | 🎁 | Chạm | Phao kêu "chít", 5 Cá khô | "Chít" |
| 11 | Bóng tập yoga | Làm việc | 🎭 (dụ sai) | Chạm | Bóng nảy "boing", lăn một vòng quanh phòng rồi về chỗ cũ, **xoay quanh đúng tâm quả bóng** khi lăn. **Không nhặt được** | "Boing" |
| 12 | Chỗ xếp tháp dưới rèm | Khách | 🎯 | Kéo-thả đồ từ túi | Xem "Cơ chế xếp tháp" | Xem dưới |
| 13 | Sofa | Khách | ✨ | Chạm | `squash` | "Bụp" |
| 14 | Bàn làm việc | Làm việc | ✨ | Chạm | Bàn rung nhẹ, **không có hạt hay chấm bay ra** (G4-21) | "Cộc" nhẹ |

**Đồ đánh lừa (2 món, Normal):** gấu bông trắng (giống Sữa ngồi) và bóng tập yoga (đồ "có vẻ dùng được"). Cả hai **chạm được, có phản ứng vui, nhưng không vào túi**.

**Cơ chế xếp tháp (12):**
- Kéo đồ từ túi thả vào vùng ngay dưới rèm. **Không có hình mờ**, không ép thứ tự bằng khóa: người chơi tự nhìn hình dáng để suy ra.
- Thứ tự đúng theo lẽ thường **rộng ở dưới, hẹp ở trên, mềm trên cùng**: **đệm → vali → chồng sách → gối**.
- Thả đúng món kế tiếp: món rơi vào đỉnh tháp, nảy nhẹ (`drop_in`), "cộp".
- Thả **sai thứ tự**: món **bay thẳng về túi** (`return_to_bag`), không chao nghiêng trên tháp; về tới ô trong túi thì **lắc lắc** một nhịp (G4-43). Sữa trên rèm nghiêng đầu theo.
- Thả ra ngoài vùng tháp: món bay về túi.
- Xếp xong gối: cả tháp lóe sáng, chuyển sang cảnh cao trào.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–6 | (xem) | Phòng khách. Sữa **đã treo sẵn** trên đỉnh rèm kiểu quả chuối, rèm đung đưa, "meo" thảm thiết. **Nhân vật đã đứng sẵn trên ghế sofa (13)** cạnh rèm (không che chỗ xếp tháp 12) (G4-40, chủ dự án đổi, thay cho mở màn bước vào gọi): kiễng chân, hai tay vươn hết cỡ lên phía Sữa, nhảy lên một hai cái vẫn **hụt một khúc**, chới với. Bong bóng nhiệm vụ hiện cạnh nhân vật rồi thu về góc. Nhân vật **ở lại trên sofa suốt màn** (thỉnh thoảng lại kiễng chân với hụt một cái), cho tới khi tháp xếp xong |
| 7–16 | Chạm **mũi tên ◄** | Mũi tên nhấp nháy (lần đầu chuyển phòng; **không có bàn tay hướng dẫn** từ level 4). Sang phòng ngủ |
| 17–26 | Chạm **đệm (2)**, chạm **đệm (2')**, chạm **gối (3)** | Đệm đổ, tất dính lên đèn; đệm và gối vào túi |
| 27–36 | Về phòng khách (Sữa đổi tư thế), sang **phòng làm việc ►** | Sữa trượt xuống một chân bám |
| 37–46 | Chạm **vali (10)** hai lần | Lần 1 bung đồ, vali gấp lại; lần 2 vào túi |
| 47–56 | Chạm **kệ sách (9)**, chạm **chồng sách (9')** | 3 cuốn hàng trên cùng vừa rơi vừa xoay nằm ngang, xếp khít thành chồng, vào túi; kệ vẫn còn nhiều sách |
| 57–62 | Về phòng khách | Sữa treo ngược |
| 63–82 | Kéo 4 món lên **chỗ xếp (12)** | Có thể sai thứ tự một hai lần, món bay về túi. Xếp xong: tháp lóe sáng |
| 82–85 | (xem) | Cảnh cao trào (xem Khoảnh khắc lộ diện) |
| 85–88 | Chạm **Sữa** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Lấy đồ theo thứ tự nào cũng được, phòng nào trước cũng được, **trừ chồng sách: phải có vali trong túi rồi mới làm rơi sách được** (G4-34). Chạm kệ trước khi có vali: kệ lung lay khẽ, bong bóng hình vali, không mất gì.
- Xếp đồ ngay khi có món nào trong túi cũng được: thả đệm trước là đúng; thả món khác lên chỗ trống thì món bay về túi.
- Chạm gấu bông, bóng yoga: phản ứng vui, không vào túi.
- Chạm Sữa trên rèm bao nhiêu lần cũng được: Sữa giận dỗi quay mặt vào tường, không chạy mất.
- Chạm vali đã vào túi rồi trong cảnh: không còn vali, chỉ còn đống đồ rơi (chạm phao vịt là bí mật).

**Thang gợi ý:**
1. *8 giây:* Sữa kêu "meo" dài, ngón chân duỗi về phía phòng còn đồ chưa lấy; ở phòng có đồ, món cần chạm rung nhẹ.
2. *16 giây:* món cần lấy lấp lánh; khi đã đủ đồ trong túi, **icon món cần xếp kế tiếp** trong túi nảy lên.
3. *💡:* bàn chân mèo chỉ món đúng, hoặc làm mẫu kéo món kế tiếp từ túi lên tháp.

**Khoảnh khắc lộ diện:**
1. Tháp xếp xong lóe sáng. **Nhân vật nhảy từ sofa sang đỉnh tháp**, đứng trên gối, kiễng chân, hai tay vươn lên với lấy Sữa (lần này với tới).
2. Tay vừa chạm tới, Sữa **giật mình**, nhả rèm "pực", **bật lên lộn vài vòng** trên không (vệt xoáy, quay nhanh), rồi **tiếp đất bằng bốn chân** "tạch" ngay cạnh tháp, nhẹ như không.
3. Sữa ngồi xuống, **liếm chân** thản nhiên như chưa có chuyện gì.
4. Nhân vật vẫn đứng trên đỉnh tháp, hai tay còn giơ trống không, quay xuống nhìn Sữa và **cười ngốc nghếch**, gãi đầu.

**Chạm Sữa → cảnh bế chung.** Tháp và nhân vật ở lại cảnh nền.

**Sau khi bế:** màn hình thưởng chung. Đoạn Sữa vào quán (♥ 4/4) **làm sau**, chưa nằm trong màn này.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Rèm dài từ thanh treo gần trần xuống sàn, vải dày màu ấm, **không đóng mở**; Sữa trắng treo trên đỉnh nổi rõ trên nền vải. Thanh rèm và đỉnh rèm cao hơn tầm với của tháp một chút: nhân vật phải vươn tay.
- Các tư thế Sữa trên rèm **cùng điểm bám** trên đỉnh rèm (đổi ảnh không nhảy chỗ).
- Đồ đã xếp vẽ thành bản "trên tháp" khớp nhau: đệm rộng nhất, vali hẹp hơn, chồng sách hẹp hơn nữa, gối trên cùng; tổng chiều cao tháp đưa đỉnh gối tới khoảng ngang vai nhân vật đứng tới đỉnh rèm.
- Cú lộn vòng của Sữa: code xoay một ảnh tư thế cuộn tròn (2–3 vòng, 0,6 giây) theo đường cong, kèm vệt xoáy; tiếp đất bằng `squash`.
- Âm "tạch" tiếp đất phải thật nhẹ và gọn, đối lập với tiếng đổ "rầm rầm" của kệ sách: chỗ buồn cười là sự bình thản.

**Thưởng:** 30 Cá khô (+5 mỗi bí mật: tất trên đèn, phao vịt) · Sữa ♥ 4/4.

---

**Chốt theo chủ dự án (G4-27, 2026-10-31):** ô đặt **gối** (tầng trên cùng của chồng đồ cuối màn) dịch **sang phải một chút** (khoảng 40 px).

**G4-28 (chủ dự án, 2026-10-31):** gối bớt lệch: chỉ lệch phải 15 px so với tầng sách (G4-27 là 40 px, nhìn kênh).

### Level 5 — Đốm sáng

| | |
|---|---|
| Độ khó | 🔴 **Hard · 150 giây** |
| Mèo | **Mun** (♥ 1/6), lần đầu xuất hiện |
| Phòng | 2: Sân sau ⇄ Con hẻm, buổi chiều |
| Dạy | Nối tia nắng bằng đồ sáng bóng (kéo-thả từ túi), Mèo nhút nhát |
| Bước bắt buộc | 7 (thùng giấy, 3 đồ sáng, đặt 3 điểm nối tia; G5-26 bỏ kéo bạt) |

**Sự thật về mèo:** mèo nào thấy **đốm sáng chạy trên tường** cũng không nhịn được, kể cả con nhút nhát nhất.

**Trạng thái mèo:** Mun **Lẩn tránh** (nhút nhát) dưới gầm xe, chỉ thấy đôi mắt vàng ở sâu trong bóng tối. Chạm vào: Mun lùi sâu, đôi mắt biến mất một lúc rồi hiện lại. Bàn chân thò ra vồ đốm sáng cũng vậy: chạm thì rụt lại. Khi Mun **đã ra khỏi gầm xe** (đang đuổi đốm sáng hoặc ngồi đè đốm sáng), Mun **Lộ diện**: chạm lúc nào cũng thắng.

**Bố cục màn hình:**

```
SÂN SAU (bắt đầu)                    CON HẺM
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Mun ○○○○○○ [Bản đồ]  ⏸ │  │ ▓(6) TẤM BẠT CHE KÍN ĐẦU │
│ ┌──────────┐             │  │ ▓▓ HẺM, 1 LỖ THỦNG ▓▓▓▓▓ │
│ │(4) CỬA SỔ│  (2) BÀN    │  │ ┌──────────────────────┐ │
│ │QUÁN: Sữa │  TRANG ĐIỂM │  │ │(7) BỨC TƯỜNG đối diện│ │
│ │ nhìn ra  │  (2a) gương │  │ │  (đốm sáng hiện ở đây)│ │
│ └──────────┘             │◄►│ └──────────────────────┘ │
│                          │  │ (9) tia nắng qua lỗ thủng│
│ (3) TÚI RÁC ĐEN 🎭       │  │     rơi xuống điểm A     │
│                          │  │ ┌─────────────┐          │
│ (1) THÙNG GIẤY CŨ        │  │ │(8) XE BA GÁC│ (11) ỐNG │
│                          │  │ └──┬───────┬──┘  THOÁT   │
│                          │  │  (8a) GẦM XE      NƯỚC   │
└──────────────────────────┘  └──────────────────────────┘
```

**Đồ vật** (G5-5, chủ dự án đổi cơ chế: bỏ giữ-kéo đốm sáng, thay bằng 3 đồ sáng bóng nối tia nắng tới gần Mun):

| Số | Đồ vật | Phòng | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Thùng giấy cũ | Sân sau | 🔑 | Chạm | Bóng đen vụt chạy ra hẻm. Bong bóng nhiệm vụ nảy mạnh hơn bình thường (sắp gặp mèo mới) | Tiếng chân chạy lạch xạch |
| 2a | Gương nhỏ trên bàn trang điểm | Sân sau | 🎒 | Chạm | Gương vào túi, lóe một tia sáng khi bay | "Kính coong" |
| 2b | Nắp hộp bánh quy thiếc (tròn, bóng) dựa cạnh thùng giấy | Sân sau | 🎒 | Chạm | Nắp vào túi, lóe sáng | "Keng" |
| 2c | Đĩa CD cũ treo lủng lẳng trên móc tường **bên trái hẻm**, xa xe ba gác (G5-7) | Hẻm | 🎒 | Chạm | Đĩa vào túi, lóe sáng | "Tinh" |
| 3 | Túi rác đen tròn | Sân sau | 🎭 | Chạm | Trông như mèo đen cuộn tròn, chỉ là túi rác. Nhân vật bịt mũi | "Sột soạt" |
| 4 | Cửa sổ quán | Sân sau | ✨ | Chạm | Sữa áp mặt vào kính, tò mò nhìn ra hẻm | "Meo?" (giọng Sữa) |
| 6 | Tấm bạt **to che kín cả đầu hẻm** (hết bề ngang màn hình), có **một lỗ thủng nhỏ** (G5-26) | Hẻm | ✨ | Chạm | Bạt phồng gió nhẹ, tia nắng qua lỗ rung rinh | Bạt "phành phạch" |
| 7 | 3 điểm nối tia A → B → C | Hẻm | 🎯 | Kéo đồ sáng từ túi thả vào **đốm sáng đang hiện** | Xem "Cơ chế nối tia" | "Ting" mỗi lần nối |
| 8a | Gầm xe ba gác | Hẻm | 🔑 | Chạm | Đôi mắt vàng, Mun rúc sâu hơn. Bong bóng nhân vật: hình đốm sáng | "Khè" rất nhỏ |
| 10 | Con quạ trên dây điện | Hẻm | 🎭 | Chạm | Bóng đen hóa ra là quạ, bay đi rồi đậu lại | "Quạ!" |
| 11 | Ống thoát nước | Hẻm | 🎁 | Chạm | 5 Cá khô | Leng keng |
| 12 | Chậu cây xương rồng cạnh bậc cửa | Sân sau | ✨ | Chạm | Chậu lắc lư, một bông hoa nhỏ bật nở rồi khép lại | "Póc" |
| 13 | Dây phơi áo | Sân sau | ✨ | Chạm | Chiếc áo phồng gió bay phấp phới, cái kẹp bật ra rồi nhân vật kẹp lại | Gió "phù" |
| 14 | Chuông gió treo cửa quán | Sân sau | ✨ | Chạm | Chuông đung đưa, Sữa trong cửa sổ ngóc đầu nhìn theo | "Leng keng" |
| 15 | Đôi dép tổ ong cũ cạnh thùng giấy | Sân sau | 🎁 | Chạm | Dép lật lên, bên dưới có túi cá khô: 5 Cá khô | "Bẹp" |
| 16 | Xe đạp cũ dựng tường | Hẻm | ✨ | Chạm | Chuông xe kêu, bánh xe quay vài vòng | "Kính coong" |
| 17 | Vũng nước | Hẻm | ✨ | Chạm | Gợn sóng tròn, bắn vài giọt | "Tõm" |
| 18 | Thạch sùng trên tường | Hẻm | 🎭 | Chạm | Bóng nhỏ trông như đuôi mèo, hóa ra thạch sùng chạy vụt lên cao | "Tặc tặc" |
| 19 | Ống bơ sữa trên bậu cửa sổ hẻm | Hẻm | 🎁 | Chạm | Ống bơ nghiêng, cá khô rơi ra: 5 Cá khô | "Lốc cốc" |

**Vì sao hẻm tối (G5-25, G5-26, chủ dự án):** một tấm bạt to căng ngang trên đầu hẻm, che kín cả bề ngang màn hình, nên cả hẻm nằm trong **bóng râm của bạt** (nâu xám ấm, không phải trời tối). Bạt có **một lỗ thủng nhỏ**: ngay khi vào hẻm đã thấy **một tia nắng mảnh** lọt qua lỗ, chiếu thẳng xuống **điểm A**. Không có dây kéo, không cuộn bạt. Con quạ đậu trên mép bạt.

**Cơ chế nối tia (G5-5):**
- Từ lúc vào hẻm: **một tia nắng mảnh** (đường thẳng nhỏ, cùng độ dày với các tia phản chiếu, G5-25) từ lỗ thủng trên bạt chiếu xuống **điểm A** (đất hẻm, xa xe ba gác nhất), thấy rõ một **đốm sáng nhảy nhót** ở đó.
- **Đốm sáng luôn là chỗ đặt kế tiếp** (gợi ý tự nhiên, không cần ô mờ). Đồ phải lắp **đúng thứ tự: nắp thiếc ở A → gương ở B → đĩa CD ở C** (G5-10, sửa ở G5-12). Thả đúng đồ vào đốm sáng: đồ dựng nghiêng ở đó, **tia sáng bật ra** và đốm sáng chạy tới điểm kế tiếp, gần Mun hơn. **Thả sai đồ**: đồ bay thẳng về ô của nó trong túi rồi lắc lắc một nhịp (như level 4, G4-43), đốm sáng nháy:
  - Đặt ở **A** → tia lên tường, đốm sáng tới **điểm B** (bậu tường giữa hẻm). Mun: đôi mắt mở to, nhìn theo đốm sáng.
  - Đặt ở **B** → tia chiếu tới **điểm C: giỏ (hoặc yên) xe đạp cũ dựng tường** (G5-15, thay G5-14). Mun: **bàn chân đen thò ra vồ hụt**, rồi ló cả mặt.
  - Đặt đĩa CD gác nghiêng trên **xe đạp (C)** → tia hắt xuống ngay trước gầm xe, đốm sáng **nhảy nhót lượn qua lại** → **Mun phóng ra đuổi** (Lộ diện).
  - Từ lúc này tới hết cảnh lộ diện, **tia từ đồ ở C luôn bám theo đốm sáng** (đầu tia di chuyển cùng đốm sáng khi lượn, khi Mun đuổi và khi Mun đè), không để đốm sáng chạy rời khỏi tia (G5-8).
- Thả đồ không trúng đốm sáng: đồ bay về túi, đốm sáng nháy hai lần.
- Đồ đã đặt không nhặt lại được. Chỉ 3 đồ, đủ đúng 3 điểm.
- Gợi ý 16 giây: icon **đồ đúng kế tiếp** trong túi nảy lên.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–10 | Chạm **thùng giấy (1)** | Bóng đen vụt chạy ra hẻm. Bong bóng nhiệm vụ nảy mạnh |
| 10–30 | Chạm **gương (2a)**, **nắp thiếc (2b)** | Hai đồ vào túi |
| 30–45 | Sang hẻm, chạm **gầm xe (8a)** | Đôi mắt vàng, Mun rúc sâu. Bong bóng: hình đốm sáng. Hẻm trong bóng râm của bạt, tia nắng qua lỗ thủng đã chiếu xuống A |
| 45–55 | Chạm **đĩa CD (2c)** | Đĩa vào túi, đôi mắt giật mình |
| 55–110 | Thả **nắp thiếc → A, gương → B, đĩa CD → C** | Tia nắng nối dần tới gầm xe; Mun mở to mắt → thò chân vồ → ló mặt |
| 110–130 | (xem) | **Mun phóng ra đuổi đốm sáng.** Lộ diện |
| 130–140 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Lấy 3 đồ sáng theo thứ tự nào cũng được; chưa gặp Mun cũng lấy được.
- Thả đồ ra ngoài đốm sáng: đồ bay về túi, đốm sáng nháy hai lần.
- Chạm bàn chân Mun lúc đang vồ: Mun rụt lại (Lẩn tránh), không mất gì.
- Chạm Mun lúc đang đuổi đốm sáng: **thắng ngay**.
- Thả sai đồ vào đốm sáng (ví dụ đĩa CD vào A): đồ bay về túi, lắc lắc.
- Chạm túi rác, quạ, thạch sùng và các đồ ✨: phản ứng vui, không ảnh hưởng.

**Thang gợi ý:**
1. *8 giây:* đôi mắt vàng chớp chớp dưới gầm xe; hẻm còn tối thì dây kéo đung đưa mạnh hơn; đã có nắng thì đốm sáng kế tiếp nhảy nhót mạnh hơn.
2. *16 giây:* đồ cần chạm lấp lánh (thùng giấy, đồ sáng chưa lấy, dây kéo); đã có nắng và có đồ trong túi thì icon đồ sáng trong túi nảy lên.
3. *💡:* bàn chân mèo làm mẫu: chỉ đồ cần lấy, kéo dây, hoặc kéo một đồ sáng từ túi thả vào đốm sáng.

**Khoảnh khắc lộ diện:** Mun phóng vọt ra khỏi gầm xe, lần đầu người chơi thấy rõ cả con: **mèo đen tuyền, mắt vàng to**. Đốm sáng tự lượn **đúng hai vòng** giữa hẻm (nhanh, gọn), Mun đuổi sát theo, hết vòng thứ hai là **bắt được: đè hai chân trước lên đốm sáng** (G5-13). Nhấc chân lên xem: đốm sáng lại hiện ngay trên lưng chân nó. Mun ngơ ngác, nhìn chân, nhìn bạn.

**Chạm Mun → cảnh bế chung.** Lần đầu thấy cảnh bế với lông đen, mắt vàng.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Mun xuất hiện lần đầu: cần thiết kế nhân vật rõ ràng (mèo đen tuyền, mắt vàng, tai hơi to, đuôi dài).
- Sữa có một cameo ở cửa sổ quán (nhắc người chơi rằng Sữa đã ở quán).
- Đốm sáng, tia nắng, tia phản chiếu: ảnh phẳng có vân chì, quầng sáng và độ chói do code làm (G5-3); đốm sáng nhảy nhót nhẹ khi đứng yên.
- Nhạc nền: hơi bí ẩn ở đầu màn, chuyển sang vui nhộn khi Mun bắt đầu đuổi đốm sáng.

**Thưởng:** 50 Cá khô (+5 mỗi bí mật: ống thoát nước, dép tổ ong, ống bơ; G5-11) · Mun ♥ 1/6.

---

**Chốt theo chủ dự án (G5-36, 2026-10-31):** đặt đồ **dễ hơn**: các chỗ đặt nhận đồ **theo thứ tự nào cũng được**, nhưng mỗi chỗ chỉ nhận **đúng món** của nó (thả nhầm món thì món trượt về túi); vùng thả rộng hơn.

### Level 6 — Xuống đây nào, Mun!

> **G6-1 (chủ dự án chốt 2026-10-30):** thay màn "Túi giấy sột soạt" cũ. Chủ đề **làm thân**, bối cảnh **ngoài nhà**: Mun bị chó dọa, kẹt trên mái nhà kho; cho chó xương, xếp 4 bậc đường xuống, đặt cá nướng lên bàn dụ Mun xuống ăn (G6-5: đổi từ ghế sang bàn).

| | |
|---|---|
| Độ khó | 🟡 **Normal · 90 giây** (ngoại lệ: luật chung đặt level 6 là Easy 60 giây, màn này có 8 bước; chủ dự án chốt lại sau khi chơi bản khối) |
| Mèo | Mun (♥ 2/6) |
| Phòng | 1: Sân sau nhà hàng xóm, buổi chiều. Nền riêng `l6_bg_backyard` 1366x2304 (trời, hàng rào, sân, đủ rộng cho khung 3:4; A6-12), mọi đồ là sprite riêng |
| Dạy | Kéo đồ có sẵn trong cảnh tới đúng chỗ để xếp đường (không qua túi đồ) |
| Bước bắt buộc | 8 (lấy xương, cho Lu, lấy cá nướng, 4 bậc đường xuống, đặt cá nướng lên bàn) |

**Sự thật về mèo:** mèo hoảng là leo vọt lên chỗ cao, nhưng tới lúc xuống thì run, đứng ở mép kêu meo meo mãi không dám bước. Chỉ có đồ ăn ngon mới dụ được nó xuống.

**Nhân vật phụ:** **Lu**, chó vàng to của nhà hàng xóm. Không dữ, chỉ muốn chơi: ngồi dưới mái kho vẫy đuôi sủa lên.

**Trạng thái mèo:** Mun **Lẩn tránh** trên mái kho (thấy rõ nhưng ngoài tầm tay). Chạm Mun: Mun lùi lại khoảng 40px về phía sau mái rồi tiến về chỗ cũ, meo nhỏ (G6-22). Mun cùng một cỡ suốt màn: trên mái, lúc xuống, lúc chạy, lúc ăn (G6-21). Khi Lu còn sủa, Mun nằm rạp, tai cụp, không ra mép mái. Khi Mun **đã nhảy lên bàn** (đang ăn cá nướng), Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
┌──────────────────────────────┐
│ ♥Mun ●○○○○○              ⏸  │
│              ┌─────────────┐ │
│ (9)CHUÔNG GIÓ│(1) MÁI KHO  │ │
│              │ Mun + ống   │ │
│ (8)CÂY+ổ chim│   khói      │ │
│              │ NHÀ KHO GỖ  │ │
│ (7)GĂNG TAY  │ [A]  [B]    │ │
│  đen 🎭      │        [C]  │ │
│ (3)BÀN+GIỎ   └─────────────┘ │
│  picnic   (2)LU   (5)BỤI RAU │
│ (4a)PHUY (4b)HỘP (4c)THÙNG   │
│ (4d)GHẾ ĐẨU  (6)CHUỒNG LU    │
├──────────────────────────────┤
│ [ ][ ][ ][ ][ ][ ]       💡  │
└──────────────────────────────┘
```

A, B, C: 3 chỗ đặt, thấp dần từ mép mái xuống đất. A sát tường kho, cao nhất: thùng phuy rồi hộp dụng cụ nhỏ đậy lên (2 bước). B: thùng gỗ. C: ghế đẩu, thấp nhất, **sát cạnh bàn** để từ ghế Mun nhảy lên bàn. Tổng 4 bước xếp đường. Bàn đặt gần chân đường xuống (dời bàn nếu cần), giỏ picnic lúc đầu nằm **trên nắp thùng gỗ** (G6-22); lấy cá nướng xong giỏ bay nhẹ lên và mờ dần biến mất. Cá nướng đặt **giữa mặt bàn**, cỡ bằng cá nướng đang cầm.

**Đồ vật:**

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Mun trên mái kho | Trên phải | — | Chạm | Mun lùi lại một chút rồi tiến về chỗ cũ (G6-22) | "Meo" run run |
| 2 | Lu | Giữa, dưới mái | — | Chạm | Lu vẫy đuôi sủa to hơn, Mun nằm rạp. Bong bóng nhân vật: hình khúc xương | "Gâu gâu" |
| 5 | Bụi rau (có khúc xương) | Dưới phải | 🔑 | Chạm | Lá rau rẽ ra, **khúc xương** bay vào túi đồ. Lu cứ ngoái nhìn bụi rau (gợi ý tự nhiên) | Lá xào xạc |
| 2' | Lu (nhận xương) | — | 🎯 | Kéo xương từ túi thả vào Lu | Lu ngậm xương, đi **một đường cong liền, mềm, tốc độ đều**, vòng sát mép chuồng ra **trước cửa** rồi chui vào (không đi xuyên chuồng; G6-21, G6-22). Lu thò đầu ra **giữa cửa chuồng** gặm xương vui vẻ, **thôi sủa**. Mun ngóc đầu dậy | "Gâu!" vui, rồi tiếng gặm |
| 3 | Giỏ picnic **trên nắp thùng gỗ** (G6-22) | Giữa trái | 🔑 | Chạm | Nắp giỏ bật, **cá nướng** bay vào túi đồ; giỏ bay nhẹ lên ~60px, mờ dần trong 0,6 giây rồi biến mất. Kéo thùng gỗ trước thì giỏ đi theo thùng, vẫn chạm được | "Tách" |
| 4a | Thùng phuy nước | Dưới trái | 🔑 | Kéo tới chỗ **A** | Phuy lăn tới sát tường kho, dựng đứng. Mun ra mép nhìn xuống, thấy nước sóng sánh, lùi lại | "Lộc cộc" |
| 4b | Hộp dụng cụ nhỏ | Dưới, giữa | 🔑 | Kéo đậy lên **miệng phuy ở A** (chỉ được khi phuy đã ở A) | Hộp dụng cụ đặt khít, đậy kín miệng phuy, thành bậc đầu tiên | "Cộp" |
| 4c | Thùng gỗ | Dưới, giữa phải | 🔑 | Kéo tới chỗ **B** (bậc giữa) | Thùng đặt vào, thành bậc giữa | "Cộp" |
| 4d | Ghế đẩu | Dưới trái | 🔑 | Kéo tới chỗ **C** (bậc thấp nhất, gần đất) | Ghế đặt vào, thành bậc cuối | "Cạch" |
| 4' | Mặt bàn | Cạnh chỗ C | 🎯 | Kéo **cá nướng** từ túi thả lên bàn (vùng thả gồm cả mặt bàn và ghế C chồng lên) | Cá nướng nằm **giữa mặt bàn**, cỡ bằng lúc đang cầm. Xem Khoảnh khắc lộ diện | "Pặc" |
| 6 | Chuồng Lu | Dưới phải | ✨ | Chạm (khi Lu đang gặm) | Lu lăn ra khoe bụng rồi gặm tiếp | "Ư ử" |
| 7 | Găng tay làm vườn đen trên hàng rào | Giữa trái | 🎭 | Chạm | Trông như mèo đen ngồi, hoá ra găng tay: găng **rơi thẳng xuống, nhanh dần, không nảy** (G6-22), chạm đất có chút bụi, nằm yên dưới hàng rào. Lu (nếu rảnh) **chạy tới chỗ găng, cúi ngửi ngửi** (mũi khịt khịt, đuôi vẫy) rồi chạy về chỗ cũ; không ngậm, không vờn (G6-21). Lu đang gặm trong chuồng thì chỉ ngẩng đầu nhìn | "Phịch" |
| 8 | Cây + ổ chim | Trên trái | 🎁 | Chạm | Ổ chim lắc, 5 Cá khô rơi ra | Chim ríu rít |
| 9 | Chuông gió | Trên trái | ✨ | Chạm | Leng keng, Mun trên mái vểnh tai | Leng keng |
| 10 | Bình tưới | Cạnh bụi rau | 🎁 | Chạm | Bình nghiêng, nước chảy ra cùng 5 Cá khô | "Ồ ồ" |

**Luật xếp đường xuống (4 bậc):**
- Kéo đồ có sẵn trong cảnh (không qua túi đồ). Khi đang kéo một món, chỗ đặt hợp lệ hiện **viền mờ**; thả gần viền là đồ tự khớp vào, thả chỗ khác thì đồ trượt về chỗ cũ.
- Mỗi chỗ chỉ nhận đúng món hợp chiều cao: A nhận phuy (rồi hộp dụng cụ), B nhận thùng gỗ, C nhận ghế đẩu. Thả nhầm món: món trượt về chỗ cũ, lắc một nhịp.
- Thứ tự tự do, trừ hộp dụng cụ nhỏ phải đặt sau thùng phuy.
- Mỗi lần thêm một bậc, Mun bò ra mép mái nhìn xuống, run, rồi lùi vào: **Mun vẫn sợ, không tự xuống**, kể cả khi đủ 4 bậc. Chỉ cá nướng trên bàn mới dụ được.

**Luật Lu (logic chặn):**
- Khi Lu còn rảnh (chưa có xương): kéo cá nướng thả lên bàn thì Lu chồm tới hít, sủa đòi, cá nướng bay về túi. Bong bóng nhân vật: hình khúc xương. Đặt đồ xếp đường vẫn được.
- Lu đang gặm xương thì không quan tâm gì nữa.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–8 | (xem) | Lu đuổi Mun: chạy ngang **dải trước** (trước mọi đồ) từ phải sang trái, ra ngoài mép trái, vòng lên **dải sau** chạy sang phải; không xuyên qua đồ nào (G6-21). Mun **vồ lên thùng gỗ** rồi **phóng theo đường cong lên mép mái** (bỏ dáng bám cột, G6-21). Lu dừng ở chân bàn lúc Mun bắt đầu nhảy, Mun lên mái rồi Lu mới chạy tới chỗ ngồi sủa (G6-14). Mọi tương tác khoá tới khi bong bóng nhiệm vụ thu về góc |
| 5–15 | Chạm **Mun**, **Lu** | Mun lùi lại một chút rồi tiến về chỗ cũ (G6-22). Bong bóng: khúc xương |
| 15–25 | Chạm **bụi rau (5)** | Có khúc xương |
| 25–32 | Thả **xương vào Lu** | Lu về chuồng gặm, thôi sủa |
| 32–40 | Chạm **giỏ picnic (3)** trên nắp thùng gỗ | Có cá nướng; giỏ bay nhẹ lên, mờ dần, biến mất (G6-22) |
| 40–75 | Kéo **phuy → A, hộp dụng cụ → A, thùng gỗ → B, ghế → C** | Đường xuống thành hình; mỗi bậc Mun ra mép nhìn rồi lùi |
| 75–85 | Thả **cá nướng lên bàn** | Mun xuống từng bậc, từ ghế nhảy lên bàn ăn (Lộ diện) |
| 85–90 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Đặt cá nướng lên bàn khi Lu còn rảnh: Lu chồm tới, cá nướng về túi.
- Đặt cá nướng lên bàn khi đường chưa đủ 4 bậc: Mun ra mép, kêu, không xuống được; cá nướng ở lại trên bàn, đặt nốt bậc thì Mun xuống ngay.
- Thả cá nướng chỗ khác (đất, thùng gỗ): cá nướng bay về túi, bàn lấp lánh.
- Đặt hộp dụng cụ khi phuy chưa ở A: hộp trượt về.
- Chạm Mun trên mái: Mun lùi lại một chút rồi tiến về chỗ cũ (Lẩn tránh, G6-22).

**Thang gợi ý:**
1. *8 giây:* Lu ngoái nhìn bụi rau (khi chưa có xương); Mun nhìn xuống chỗ còn thiếu bậc (khi đã cho xương).
2. *16 giây:* đồ cần làm tiếp lấp lánh (bụi rau → giỏ picnic → món xếp đường còn thiếu → bàn).
3. *💡:* bàn chân mèo làm mẫu bước kế tiếp.

**Khoảnh khắc lộ diện:** cá nướng vừa đặt lên bàn, mũi Mun khịt khịt. Mun bò ra mép mái, ngập ngừng… rồi xuống từng bậc hộp dụng cụ → thùng gỗ → ghế, **ngoái lại nhìn bạn** ở bậc đầu. **Nhịp mỗi bậc (G6-23):** ra mép cúi nghiêng nhìn xuống một nhịp (`mun_roof_edge` trên mái, `mun_step_down` ở các bậc) → bật nhảy, dáng bay `mun_hop_down` suốt đường cong vồng mềm → chạm bậc bằng `mun_land`, nhún 0,15 giây, "tạch" → bậc kế. Mun quay mặt theo hướng đi. Từ ghế, Mun **vồ lên bàn** (bàn cao hơn ghế rõ, dáng vồ `mun_pounce`), đáp `mun_land`, rồi ngấu nghiến cá nướng giữa bàn. Ăn xong Mun liếm mép, ngẩng lên nhìn bạn. Lu thò đầu ra khỏi chuồng, Mun xù lông một giây rồi **nép sát vào chân bạn**: lần đầu Mun coi bạn là chỗ an toàn.

**Chạm Mun → cảnh bế chung.**

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Nền riêng `l6_bg_backyard` (thay cho nền L5 dùng lại, vì nền L5 có cửa quán và bậc thềm lộ ra ở khung 3:4); nhà kho gỗ mái tôn, ống khói là sprite riêng to, đặt bên phải.
- Bàn cao, mặt bàn cao hơn mặt ghế C rõ rệt, đặt lệch trái gần chân đường xuống (G6-24); cây gốc chạm nền sân; hộp dụng cụ và thùng gỗ ở chỗ ban đầu không bị túi đồ che ở khung 3:4 (G6-21, G6-22).
- Lu: nhân vật mới, cùng phong cách bút chì pastel, tròn trịa dễ thương, không đáng sợ. Tư thế: ngồi sủa, ngậm xương chạy, nằm gặm, lăn khoe bụng, thò đầu khỏi chuồng.
- Mun cần thêm dáng: nằm rạp tai cụp trên mái, nhìn xuống mép mái run run, cúi nhìn mép bậc (`mun_step_down`), đang bay xuống (`mun_hop_down`), vừa đáp (`mun_land`), vồ lên bàn (`mun_pounce` dùng lại L5), ăn trên bàn.
- Âm Lu sủa vui, không gắt. Nhạc: căng nhẹ khi Lu sủa, chuyển ấm áp khi Mun xuống ăn.

**Thưởng:** 30 Cá khô (+5 mỗi bí mật: ổ chim, bình tưới) · Mun ♥ 2/6.

---

**Chốt theo chủ dự án (G6-28, 2026-10-31):** đổi **xúc xích thành cá nướng** (cả con, nằm ngang). Trên bàn đặt sẵn **một cái đĩa** đúng chỗ đặt cá: đĩa là gợi ý chỗ đặt, cá thả vào thì nằm trên đĩa.

**G6-29 (chủ dự án, 2026-10-31):** đĩa hạ xuống 38 px cho nằm hẳn trên mặt bàn; cá trên đĩa nhỏ lại, rộng khoảng 70% đĩa.

**G6-30 (chủ dự án, 2026-10-31):** cá trên đĩa lệch lên 6 px, sang phải 5 px so với tâm đĩa (chỉnh lại từ 8 px).

### Level 7 — Về nhà thôi, Mun!

> **Chủ dự án chốt 2026-10-31** (nháp 2026-10-30; G7-5 hợp lý hoá; G7-7 cửa sổ + chuông gió, sấm sét; G7-9 cảnh 2 mới, bậc thấp dần, chạy 2 khung; G7-11 dựng xe tại chỗ, khăn to; **G7-12 sửa tỉ lệ cảnh 2–3, kết màn chạm Mun; G7-14 cảnh 1 trả về bản cũ; G7-15 bong bóng chỉ hình nhân vật, ô dễ cắm, thùng lật nghiêng, khăn chỉ ở cảnh bế; G7-16 cành chạc chống tôn, thêm vũng nước/cành gãy/lá, chuông trên hộp, nhân vật to và gần cửa sổ**). Đổi góc nhìn: không tìm mèo, Mun **tự tìm đường về nhà người đã cứu nó** giữa đêm mưa bão, người chơi dọn đường cho Mun. Hard đầu tiên: **dễ hiểu, không đố mẹo, nặng về dẫn truyện**. Trạng thái đồ vật, khoá ảnh: xem `states-01-10.md`.

| | |
|---|---|
| Độ khó | 🔴 **Hard nhẹ · 120 giây** (ngoại lệ: đuôi 7 vốn là Normal; 10 bước, vượt khung 6–8 của Hard, chủ dự án chấp nhận) |
| Mèo | Mun (♥ 3/6) |
| Mục tiêu | **Đưa Mun về tới nhà** (không phải tìm mèo). Game có nhiều kiểu mục tiêu nên **bong bóng mở màn phải nói rõ** |
| Phòng | 3 cảnh nối nhau, đêm mưa bão: **Góc hẻm** (dùng lại nền `l5_bg_alley`) → **Trước quán nước** (nền mới) → **Trước nhà nhân vật** (nền mới). Mun đi **từ phải sang trái** suốt màn |
| Dạy | **Dọn đường cho mèo đi**: kéo đồ có sẵn trong cảnh vào **ô sáng** |
| Bước bắt buộc | 10 (cảnh 1: cành chạc chống tôn, ván, cành cây to · cảnh 2: ô che, thùng các-tông cho chó, dựng xe đạp · cảnh 3: hộp bé, thùng gỗ, mở cửa sổ, treo chuông) |
| Đồ đánh lừa, bí mật 🎁 | Không có (chủ dự án: độ khó nhẹ, dẫn truyện) |

**Sự thật về mèo:** mèo hoang đã có người thương thì dù mưa bão vẫn tìm đường về chỗ người đó. Tới nơi rồi, mèo chưa từng vào nhà người vẫn rụt rè ở bậu cửa.

**Trạng thái mèo:** Mun luôn nhìn thấy. **Dọc đường chạm Mun không thắng**: Mun đang ngồi chờ thì meo nhỏ, ngoái nhìn người chơi rồi ngóng về bên trái (phía nhà). **Cuối màn (G7-12):** sau khi Mun rung chuông và nhân vật ra cửa sổ giang tay, Mun **Lộ diện** (viền sáng): **chạm Mun là thắng**, sang cảnh bế chung, đúng luật chung của game. Mun **ướt suốt màn** (lông bết, nhỏ giọt, thỉnh thoảng run).

**Tỉ lệ (G7-12):** Mun giữ đúng cỡ như L6 ở mọi cảnh; **đồ vật và nhà vẽ theo tỉ lệ thật so với Mun**:
- Con chó lạ **to hơn Mun rõ** (cao khoảng 1,6 lần Mun ngồi); thùng các-tông **to hơn con chó** (chó chui lọt cả người).
- Xe đạp **không quá to**: cao khoảng 2 lần Mun ngồi, dài khoảng 2,5 lần thân Mun.
- Cửa chính cao khoảng 4 lần Mun ngồi; cửa sổ **to** (rộng khoảng 3 lần, cao khoảng 2,5 lần Mun ngồi). Mun ngồi trên bậu chỉ chiếm khoảng một phần ba bề ngang cửa sổ.

**Hướng mặt và dáng chạy Mun (G7-7, G7-9):**
- Mun **luôn quay mặt theo hướng đi** (sang trái) khi di chuyển. **Không quay mặt lại giữa đường.** Chỉ ngoái lại khi **đang ngồi chờ** bị chạm, hoặc lúc gợi ý 8 giây.
- **Chạy 2 khung:** xen kẽ `mun_run` và `mun_run_b` (khoảng 0,12 giây một khung), nhún nhẹ theo bước.
- **Chỗ ngồi chờ luôn ở chỗ khô**, dừng **trước** chướng ngại khoảng 40px.

**Vì sao Mun không tự nhảy lên (G7-5):** đêm nay Mun **ướt, lạnh, kiệt sức**, tường thì **trơn**. Lần đầu tới dưới cửa sổ (cảnh 3), Mun **nhảy thử, tuột xuống, giũ nước**, rồi ngồi nhìn người chơi.

**Chướng ngại chắn kín lối (G7-5):** mọi chướng ngại đặt ở **chỗ lối hẹp** hoặc **chắn từ tường này sang tường kia**, để Mun không thể đi vòng.

**Thời tiết (G7-7):** mưa to suốt màn; **sấm sét**: chớp sáng cả cảnh 0,2 giây, có tia sét xa trên trời, sấm rền sau chớp; **lá cây bay ngang** theo gió và **cành nhỏ rơi lác đác** (trang trí, rơi xa chỗ Mun, không chặn đường). **G7-16: cả 3 cảnh thêm nhiều vũng nước** trên nền (gợn vòng khi mưa rơi, không chặn đường), **cành cây gãy nằm rải rác** (trang trí, không kéo được), và **lá bay dày hơn** (khoảng gấp đôi). Trời đêm xanh tím nhạt, vẫn theo bảng màu pastel, không tối đen, không đáng sợ.

**Luật chung của màn (cách chơi):**
- Đồ nằm sẵn trong cảnh, **kéo thẳng trong cảnh** (không qua túi đồ), như L6. Ngoại lệ: **chuông gió** nằm trong hộp bé.
- Mỗi chướng ngại có một **ô sáng**: viền sáng mờ đúng hình dáng món ở tư thế đặt, **hiện sẵn từ đầu cảnh**, nhịp sáng chậm. Đang kéo đúng món thì ô của món đó sáng rõ hơn.
- Thả gần ô (khoảng 110px) là khớp. Thả sai chỗ hoặc sai món: đồ **nảy về chỗ cũ**, lắc một nhịp.
- **Thứ tự tự do trong một cảnh.** Mun đi tới chướng ngại kế tiếp **khi chướng ngại trước mặt đã dọn**, gặp chướng ngại chưa dọn thì ngồi chờ. Đã dọn sẵn thì Mun đi thẳng qua.
- Mun ra **mép trái** cảnh thì chuyển cảnh: khung trượt sang trái 0,8 giây, Mun vào từ mép phải cảnh mới. Không quay lại cảnh cũ. Không có bản đồ mini.

**Mở màn (0–6 giây, khoá tương tác; G7-14: trả về bản G7-9/G7-11):**
1. Hẻm L5, mưa bão, chớp sáng, sấm rền. Gió quật, **tấm tôn mái hiên** đầu hẻm bật một mép khỏi khung, sụp xuống tựa lên thành xe ba gác. Mun đang chạy giật mình, phóng vào **khe hẹp giữa xe ba gác và tường** (bên phải). Mép tôn sụp **che kín miệng khe**; Mun ngồi run trong khe, chỉ thấy đôi mắt.
2. Cùng lúc, một tia sét, **cành cây to gãy rơi xuống** chắn ngang lối hẹp cuối hẻm (bên trái), lá văng nước.
3. **Bong bóng nhớ** từ chỗ Mun: **chỉ hình nhân vật** (người đã cứu Mun, mặt cười hiền), **không có hình nhà, không dấu chân** (G7-15). Bong bóng thu về góc như các màn khác, chạm vào xem lại được.

#### Cảnh 1 — Góc hẻm (G7-14: trả về bản G7-9/G7-11)

```
┌──────────────────────────────┐
│ ♥Mun ●●○○○○              ⏸  │
│ ╱╱ mưa ⚡ lá bay ╱╱╱╱╱╱╱╱╱╱  │
│ [ô cành:      (1a)CÀNH CHẠC  │
│  bãi trống]    dựa tường     │
│ (3)CÀNH CÂY  ┌─TÔN SỤP─┐     │
│  GÃY TO      │[ô chạc] │XE BA│
│  chắn lối    │ khe  👀 │ GÁC │
│ (2a)TẤM VÁN  └─────────┘     │
│  dựa tường [ô ván] Mun chờ   │
│  ≈≈≈(2) ĐOẠN NGẬP≈≈≈ ▲khô    │
│ ← ra mép trái  (tường→tường) │
├──────────────────────────────┤
│ [ ][ ][ ][ ][ ][ ]       💡  │
└──────────────────────────────┘
```

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Tấm tôn sụp: **tôn mỏng, lượn sóng, nhẹ**; mép trên còn mắc trên khung hiên, mép dưới sụp tựa lên thành xe, **che kín miệng khe** | Phải | — | Chạm | Tôn rung "loảng xoảng", mắt Mun trong khe chớp | Tôn rung |
| 1a | **Cành cây chạc** (cành gãy chắc, đầu trên chẻ hình chữ Y, dài ~1,5 lần Mun ngồi) nằm cạnh tường, gần xe (G7-16, thay thùng xốp) | Trên phải | 🔑 | Kéo vào **ô chạc** (sát miệng khe, ngay dưới mép tôn sụp; chân cành cắm trên nền, chạc chữ Y đỡ mép tôn) | Chạc đẩy mép tôn nâng lên (0,4 giây), tôn **mắc vững trong chạc** thành một **mái che nhỏ** trước miệng khe. Mun bò ra dưới mái che, giũ nước, chạy sang trái, **dừng ngồi ngay mép đoạn ngập** (trên nền khô, chân trước sát mép nước, không đứng trong nước, G7-15) | "Kẹt" tôn |
| 2 | Đoạn hẻm trũng ngập, **từ tường này sang tường kia** | Dưới giữa | — | Chạm | Nước toé, gợn vòng. Mun (ngồi trên nền khô) thò một chân chạm nước, rụt lại | "Tõm" |
| 2a | **Tấm ván** (400 dài): dài hơn đoạn ngập vừa đủ để **hai đầu gác lên chỗ khô**, bản rộng gần gấp đôi thân Mun | Giữa trái | 🔑 | Kéo vào **ô ván** (bắc ngang đoạn ngập) | Ván nằm ngang qua nước, nhún nhẹ. Mun đi trên ván sang trái, mặt luôn hướng trái | "Cộp" gỗ ướt |
| 3 | **Cành cây gãy rất to** (cao ~2 lần Mun ngồi, nhiều nhánh lá rậm), rơi lúc mở màn, chắn kín lối hẹp cuối hẻm | Dưới trái, sát mép | 🔑 | Kéo **ra khỏi lối**, thả vào **ô cành** (bãi trống bên lề) | Cành lết nặng (theo tay chậm hơn đồ khác), lá xào xạc rơi nước, nằm gọn bên lề. Lối mở; Mun chạy qua, ra mép trái → chuyển cảnh 2 | Lá xào xạc |
| — | Mun đang ngồi chờ | — | — | Chạm | Meo nhỏ, ngoái nhìn, ngóng sang trái | "Meo" run |

Bố cục cảnh 1 giữ đúng như bản khối G7-11 (xe ba gác, tôn, đoạn ngập x 360–520, ván 400, cành như trước khi dời); cành chạc nằm chỗ cây chổi cũ, ô chạc đúng chỗ ô chổi cũ (G7-16).

#### Cảnh 2 — Trước quán nước (G7-9; G7-12 sửa tỉ lệ)

**Ý cảnh:** quán nước ven đường đã dọn hàng vì bão. Mun **sợ mưa xối** phải có chỗ che mới dám chạy qua sân quán; tới hiên thì gặp **con chó lạ đang sợ sấm** co ro chắn lối; cuối hiên **chiếc xe đạp bị gió quật đổ** chắn lối ra.

```
┌──────────────────────────────┐
│ ♥Mun ●●○○○○              ⏸  │
│ ╱╱ mưa ⚡╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱  │
│ MÁI HIÊN QUÁN    │ SÂN QUÁN  │
│ ═CỬA CUỐN ĐÓNG═  │ không mái │
│ (6a)THÙNG        │ (4a)Ô TO  │
│  CÁC-TÔNG TO     │  gập, nằm │
│  dựa tường (5a)  │  lăn lóc  │
│ (6)CHÓ LẠ  XE    │ [ô ô: lỗ  │
│  to, run   ĐẠP   │  giữa bàn]│
│ [ô thùng]  ĐỔ    │ (4)BÀN    │
│ ← lối hiên hẹp   │ Mun dưới  │
│                  │ gốc cây ← │
├──────────────────────────────┤
│ [ ][ ][ ][ ][ ][ ]       💡  │
└──────────────────────────────┘
```

Mun vào từ phải, chạy tới **gốc cây** đầu sân quán (có tán lá che) thì dừng. Trước mặt là **sân quán không mái che**, mưa xối trắng xoá; Mun thò chân ra, bị mưa quất, rụt lại, ngồi dưới gốc cây run.

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 4 | **Bàn nhựa của quán**, giữa mặt bàn có **lỗ cắm ô** (trống) | Giữa sân, dưới phải | — | Chạm | Bàn rung, nước đọng trên mặt bàn toé | "Cạch" |
| 4a | **Cây ô to của quán** (ô che bàn), bị gió quật **gập lại, nằm lăn lóc** dưới đất | Giữa phải | 🔑 | Kéo vào **ô sáng ở lỗ cắm giữa bàn** (ô hiện hình ô đã bung). **Dễ cắm (G7-15):** thả ô ở đâu trên mặt bàn hay quanh bàn (vùng khớp rộng, cỡ cả cái bàn và phần trên bàn) cũng tự hút vào lỗ | Cán ô cắm vào lỗ, **ô bung tròn ra** che kín một vùng tới tận mép hiên. Dưới ô hết mưa xối. Mun chạy dưới ô vào hiên quán | "Phựt" ô bung |
| 5 | **Con chó lạ to** (cao ~1,6 lần Mun ngồi) trú dưới hiên, nằm co ro **chắn lối hiên hẹp**; mỗi lần sấm, chó **run bần bật, ư ử, rúc đầu** | Giữa trái, dưới hiên | — | Chạm | Chó ngẩng lên nhìn, ư ử, rúc đầu lại. Mun (nếu đang chờ) dựng lông lùi lại | Ư ử |
| 5a | **Thùng các-tông rất to** (to hơn con chó) của quán; **lúc đầu là hộp mở nắp, đặt ngửa** (miệng hướng lên, như hộp các-tông của mèo ở L3) (G7-15) | Trên trái, dưới hiên | 🔑 | Kéo vào **ô thùng**: **cao hơn và sát tường hơn** trước (góc trong của hiên, sát chân tường, cạnh chỗ chó) | Thả vào ô, thùng **lật nghiêng** (0,3 giây) thành **hộp nằm ngang, miệng quay ra phía chó**, có nắp trên che như mái, làm "hang" trú mưa. Chó ngó vào, **chui tọt vào thùng trốn sấm**, chỉ thò mũi ra, thôi run. Lối hiên thông; Mun **rón rén** đi qua trước miệng thùng | "Bộp" giấy, chó thở phào |
| 6 | **Xe đạp** (cao ~2 lần Mun ngồi, dài ~2,5 lần thân Mun) bị gió quật **đổ nằm ngang**, chắn kín lối ra cuối hiên | Dưới trái, trong khung | 🔑 | **Dựng xe tại chỗ** (G7-11): chạm giữ bất cứ đâu trên xe rồi **kéo lên** là xe đứng dậy; ô sáng hình xe đứng ngay trên chỗ xe đổ, bán kính khớp ~180px | Xe đứng dậy, chân chống "cạch". Lối mở; Mun chạy ra mép trái → chuyển cảnh 3 | "Cạch" chân chống, chuông xe "kring" nhỏ |
| — | Cửa cuốn quán | Trên | ✨ | Chạm | Cửa cuốn rung "rầm rầm" nhẹ, chó giật mình | Rầm rầm |

#### Cảnh 3 — Trước nhà nhân vật (G7-9; G7-12 cửa sổ và nhà to hơn)

```
┌──────────────────────────────┐
│ ♥Mun ●●○○○○              ⏸  │
│ ╱╱ mưa ⚡╱╱╱ MÁI HIÊN ╱╱╱╱╱  │
│ ▄▄▄▄▄▄ô văng▄▄▄▄▄  ┌───────┐ │
│ ┌────CỬA SỔ TO────┐│       │ │
│ │   (9)móc giữa    ││ CỬA   │ │
│ │📺 TV   nhân vật  ││ CHÍNH │ │
│ │     quay lưng    ││ cao   │ │
│ └─────bậu──────────┘│ đóng  │ │
│ [ô thùng] [ô hộp]   │       │ │
│  cao hơn   thấp     └───────┘ │
│ (7)THÙNG GỖ  (8)HỘP BÉ   Mun← │
├──────────────────────────────┤
│ [ ][ ][ ][ ][ ][ ]       💡  │
└──────────────────────────────┘
```

**Cửa sổ to, nhà to theo tỉ lệ (G7-12):** cửa sổ rộng khoảng 3 lần, cao khoảng 2,5 lần Mun ngồi; cửa chính cao khoảng 4 lần Mun ngồi. **Bậu cửa sổ giữ độ cao cũ** (cao vừa hơn thùng gỗ một bước nhảy), cửa sổ to thêm **lên phía trên**. Bậc xếp cạnh nhau, thấp dần về phía Mun: **hộp bé** (bậc 1) → **thùng gỗ** (bậc 2, sát tường) → nhảy lên bậu.

Mun vào từ phải, đi tới dưới cửa sổ ngồi, ngước nhìn bậu. Mun nhảy thử, tuột xuống, giũ nước, meo; không ai nghe vì ti vi và mưa. **Cửa sổ kính đóng**, phía trên có **ô văng** nên hốc cửa sổ khuất gió. Qua kính thấy ánh ti vi nhấp nháy và nhân vật ngồi sofa **quay lưng**.

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 8a | **Chuông gió** đặt sẵn **trên nắp hộp bé** (G7-16) | Trên hộp bé | 🔑 | Kéo thẳng từ trên hộp, thả vào **móc giữa cửa sổ** (không qua túi đồ) | Xem dòng 9 | Leng keng nhỏ khi nhấc |
| 8 | **Hộp bé** (`l6_toolbox` dùng lại) | Dưới phải, gần Mun | 🔑 | Kéo được **ngay từ đầu** (G7-16, bỏ chạm lấy chuông): kéo vào **ô hộp** (bậc 1, thấp, phía Mun). Chuông còn trên nắp thì **đi theo hộp** (như giỏ trên thùng gỗ ở L6), vẫn kéo riêng được | Thành bậc 1 | "Cộp" |
| 7 | **Thùng gỗ** (`l6_crate` dùng lại) | Dưới trái | 🔑 | Kéo vào **ô thùng** (bậc 2, sát tường dưới cửa sổ) | Thành bậc 2. Đủ 2 bậc: Mun nhảy hộp → thùng → **bậu cửa sổ** | "Cộp" |
| 9' | **Cửa sổ** (kính đóng) | Trên trái | 🔑 | **Chạm** | **Cửa sổ mở** ra (2 cánh mở vào trong). Tiếng ti vi vọng ra; nhân vật vẫn quay lưng, mải xem | "Két" bản lề |
| 9 | **Móc ở giữa khung trên cửa sổ** (dưới ô văng) | Giữa cửa sổ | 🎯 | Kéo **chuông gió** (từ nắp hộp hay chỗ hộp đang đứng) thả vào móc | Chuông treo **giữa cửa sổ**, trong hốc khuất gió nên **chỉ đung đưa rất khẽ**, gần như không kêu | Leng keng rất khẽ |
| 10 | Cửa chính (đóng) | Phải | ✨ | Chạm | Cửa rung nhẹ, khoá; ánh đèn khe cửa | "Cộc cộc" |
| — | Ti vi / nhân vật qua kính | — | ✨ | Chạm | Ánh ti vi chớp đổi màu, nhân vật cười khúc khích (vẫn quay lưng) | Tiếng ti vi xa |

**Trên bậu:**
- Cửa sổ còn đóng: Mun khều kính, meo, ngồi rụt rè; cửa sổ nhấp nháy (gợi ý).
- Cửa sổ đã mở: **Mun rụt rè** (mèo hoang chưa từng vào nhà người): ngồi thu chân trên bậu, nhìn vào trong rồi nhìn xuống người ướt, nhấc một chân trước rồi rụt lại. **Không tự nhảy vào nhà.**

**Luật cảnh 3 (logic chặn):**
- Hộp bé và thùng gỗ đặt theo thứ tự nào cũng được (hai bậc nằm cạnh nhau, không chồng). Đủ cả hai Mun mới trèo.
- Chuông và hộp đều kéo được từ đầu, theo thứ tự nào cũng được; kéo hộp lúc chuông còn trên nắp thì chuông đi theo (G7-16). Hộp ở bậc 1 mà chuông còn trên nắp thì Mun **không trèo**: ngồi dưới ngước nhìn chuông, khều nhẹ, chuông lấp lánh; nắp trống (chuông đã treo) Mun mới trèo.
- Chuông có thể treo trước hay sau khi mở cửa sổ, trước hay sau khi Mun lên bậu.
- **Đủ 3 điều kiện: chuông đã treo, cửa sổ đã mở, Mun ở bậu → Kịch bản về nhà.**

**Kịch bản về nhà (G7-12):**
1. Mun ngước nhìn chuông giữa cửa sổ, rướn người **khều mạnh**: chuông rung to, leng keng vọng thẳng vào nhà.
2. Nhân vật giật mình, **quay lại**, thấy Mun ướt sũng trên bậu. Bong bóng nhân vật: trái tim.
3. Nhân vật tới cửa sổ, **giang tay** đón (tay không, chưa cầm khăn, G7-15). **G7-16:** lúc này vẽ nhân vật **to hơn và thấp xuống một chút**, sát ngay sau khung cửa sổ, để thấy rõ nhân vật **ở gần cửa sổ**, gần Mun. Mun thôi rụt rè, ngẩng lên nhìn nhân vật, **viền sáng: Mun Lộ diện**.
4. **Người chơi chạm Mun → cảnh bế chung.** **Khăn chỉ xuất hiện ở cảnh bế, trong đôi bàn tay nhân vật** (G7-15): khăn to lót dưới Mun và vòng lên che sau lưng Mun (như ổ khăn); thêm **Mun ướt** (lông bết, giọt nước); còn lại như cảnh bế bình thường.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–6 | (xem) | Sấm sét, tôn sụp, Mun nấp khe xe, cành cây rơi chắn cuối hẻm. Bong bóng nhớ: chỉ hình nhân vật |
| 6–15 | Kéo **cành chạc** chống dưới mép tôn | Tôn mắc trong chạc thành mái che, Mun bò ra, chạy tới mép đoạn ngập, ngồi trên nền khô |
| 15–24 | Kéo **tấm ván** qua đoạn ngập | Mun đi qua ván, tới cành cây |
| 24–32 | Kéo **cành cây** ra bãi trống | Lối mở, Mun chạy ra mép trái, chuyển cảnh |
| 32–42 | Kéo **ô to** cắm vào bàn | Ô bung, Mun chạy dưới ô vào hiên |
| 42–52 | Kéo **thùng các-tông** cho chó | Chó chui vào thùng trốn sấm, Mun rón rén qua |
| 52–60 | **Dựng xe đạp** | Lối mở, Mun chạy ra, chuyển cảnh |
| 60–70 | (Mun nhảy thử bậu, tuột) Chạm **hộp bé** | Chuông vào túi |
| 70–84 | Kéo **hộp bé**, kéo **thùng gỗ** vào 2 ô bậc | Mun trèo lên bậu |
| 84–92 | Chạm **cửa sổ** | Cửa sổ mở, Mun rụt rè |
| 92–108 | Thả **chuông gió** vào móc giữa cửa sổ | Mun khều chuông, nhân vật quay lại, giang tay; Mun Lộ diện |
| 108–120 | Chạm **Mun** | Cảnh bế chung, khăn to trong đôi tay, lót dưới và sau lưng Mun |

**Chạm sai và làm khác thứ tự:**
- Kéo món vào ô không phải của nó: món nảy về chỗ cũ, lắc một nhịp.
- Dọn chướng ngại phía trước trước chướng ngại gần Mun: được, ô đó đã xong; Mun đi thẳng qua khi tới.
- Thả chuông chỗ khác ngoài móc: chuông bay về chỗ cũ trên nắp hộp (hộp đã dời thì về nắp hộp ở chỗ mới).
- Chạm Mun đang ngồi chờ: meo nhỏ, ngóng sang trái (không thắng, không lùi). Mun đang chạy thì không nhận chạm. Chỉ khi Mun Lộ diện ở cuối màn thì chạm Mun mới thắng.
- Chạm con chó: chó ư ử, rúc đầu; khi đã trong thùng thì thò mũi ra hít hít.

**Thang gợi ý:**
1. *8 giây:* Mun nhìn về món cần làm tiếp theo, meo nhỏ.
2. *16 giây:* món cần làm lấp lánh, ô sáng của nó sáng rõ hơn (cửa sổ nhấp nháy nếu chưa mở; Mun nhấp viền sáng khi đã Lộ diện).
3. *💡:* bàn chân mèo làm mẫu (kéo món vào ô, chạm hộp, chạm cửa sổ, kéo chuông vào móc, hoặc chạm Mun).

**Ghi chú vẽ, hoạt hình, âm thanh:**
- **Dùng lại:** nền `l5_bg_alley` (thêm lớp đêm và mưa), `l5_cart`, xe đạp `l5_bike` (nếu đúng tỉ lệ, vẽ thêm dáng đổ), `l6_crate`, `l6_toolbox`, `l5_wind_chime`, nhân vật và cảnh bế chung, các dáng Mun đã có.
- **Vẽ mới:** tấm tôn sụp / mắc trong cành chạc, cành chạc chữ Y, tấm ván, đoạn ngập, cành cây gãy rất to; nền trước quán nước (sân không mái bên phải có gốc cây, hiên quán có cửa cuốn bên trái, lối hiên hẹp), bàn nhựa có lỗ cắm ô, ô to (gập / bung), con chó lạ to (co ro run / trong thùng thò mũi), thùng các-tông rất to (ngửa mở nắp / nằm ngang), xe đạp đổ; nền trước nhà nhân vật (cửa sổ to có ô văng, móc giữa khung trên; thấy bên trong: ti vi, sofa, nhân vật quay lưng; cửa chính cao), cửa sổ đóng / mở, móc treo, lá bay và cành nhỏ rơi, vũng nước và cành gãy trang trí cho cả 3 cảnh; dáng Mun ướt, Mun chạy khung 2 (`mun_run_b`), Mun tuột tường, Mun bị mưa quất rụt chân, Mun rón rén, Mun trên bậu khều kính, Mun khều chuông, Mun rụt rè trên bậu, Mun trong khăn (cảnh bế); hình nhân vật cho bong bóng nhớ; dáng nhân vật quay lưng xem ti vi, quay lại, giang tay (không cầm khăn; khăn chỉ có trong cảnh bế).
- Con chó lạ khác hẳn Lu (L6): màu lông, dáng khác; **dễ thương, đáng thương** (sợ sấm), không đáng sợ.
- Sấm sét: chớp sáng nhẹ, tia sét xa, không chớp gắt liên tục; sấm rền xa. Mỗi lần sấm, chó (nếu chưa vào thùng) run bần bật.
- Nhạc: mưa và gió suốt màn, nhạc nền buồn nhẹ, ấm dần ở cảnh 3; cao trào ấm áp khi nhân vật quay lại.

**Thưởng:** 50 Cá khô · Mun ♥ 3/6.

---

**G7-17 (chủ dự án góp ý 2026-10-31), ghi đè các dòng liên quan phía trên:**
1. Cảnh 1: chỗ Mun nấp và chỗ Mun ngồi chờ **dời xa rãnh nước**: cả thân Mun nằm rõ trên nền khô, cách mép nước ít nhất ~60 px (trước đây nhìn như đứng giữa rãnh nước).
2. Cảnh 1: **cành chạc chữ Y đổi thành thang gỗ nhỏ 3 bậc, kiểu thang chữ A hai bên** (`l7_step_ladder` thay `l7_branch_prop`; cao ~1,5 lần Mun ngồi). Lúc đầu thang gập dựa tường; kéo vào ô cũ thì thang **bung chữ A đứng dưới mép tôn**, tôn gác lên đỉnh thang thành mái che.
3. Cảnh 1: thêm **2 cành cây gãy nhỏ** (`l7_branch_small`) cùng cành to chắn lối cuối hẻm. Kéo **cả 3 cành** ra **bãi trống** (ô cành, chứa được cả 3) thì lối mới mở. Bước bắt buộc thành **12**.
4. Cảnh 2: xe đạp **dùng ảnh xe đạp L5** (`l5_bike`): lúc đổ là ảnh đó xoay nằm ngang, dựng lên là ảnh đứng; giữ cách dựng xe tại chỗ.
5. Cảnh 2: mưa xối ở sân quán **tự nhiên hơn**: hạt mảnh, dài ngắn và đậm nhạt khác nhau, nghiêng theo gió, có hạt bắn tung toé và gợn nước trên nền; không phải các vạch trắng đều nhau.
6. Cảnh 3: chuông gió **nằm ngang trên nắp hộp** (đặt nằm, không đứng); nhấc lên hoặc treo vào móc thì về dáng treo bình thường.
7. Mở màn: **bong bóng nhớ chỉ có khuôn mặt nhân vật** (`player_face_icon`, không cả người), **nhỏ hơn một chút** (~70% cỡ cũ), hiện ở **góc trên bên phải của Mun**, đuôi bong bóng chỉ về Mun.

**G7-18 (chủ dự án góp ý 2026-10-31), ghi đè các dòng liên quan phía trên:**
1. Cảnh 1: thang chữ A **thấp hơn, chỉ 2 bậc**, cao ~2/3 thang G7-17 (~1 lần Mun ngồi); vẫn đỡ được mép tôn (mép tôn sụp thấp tương ứng).
2. Cảnh 1: chắn lối cuối hẻm là **nhiều cành cây gãy to, nằm sát nhau, chồng lên nhau** thành một đống chắn kín lối (3 cành to, thay 1 to + 2 nhỏ). Kéo cả 3 ra bãi trống mới mở lối; vẫn 12 bước.
3. Cảnh 1: **tấm ván ngắn lại** (vẫn đủ gác hai đầu lên chỗ khô) và **dễ chọn hơn** (vùng chạm rộng hơn hình ván).
4. Cảnh 2: xe đạp L5 gồm thân `l5_bike` + **bánh trước** `l5_bike_wheel`: ghép đủ bánh trước như ở L5, cả lúc đổ lẫn lúc dựng.
5. Cảnh 3: **cửa chính thấp xuống ~2/3** chiều cao hiện tại và **rộng ngang hơn một chút**; **cửa sổ nhỏ lại ~4/5** (bậu vẫn ở tầm Mun trèo từ 2 bậc).

**G7-19 (chủ dự án góp ý 2026-10-31):**
1. Cảnh 1: thang **lúc đầu đã ở dáng bung chữ A** (dáng khi lắp), không có dáng gập; kéo vào ô là đặt luôn.
2. Cả màn: **bóng mờ ô sáng chỉ hiện cho món đang cầm**: chưa cầm gì thì không hiện bóng mờ nào; nhấc món nào thì chỉ hiện bóng mờ ô của món đó.
3. Cảnh 1: **3 cành to đặt vào ô nào trong 3 ô cũng được** (không ghép cặp cành–ô).
4. Cả màn: **kéo đồ theo tay nhanh hơn**: món bám sát ngón tay, bỏ độ trễ "lết nặng" của cành.

**G7-20 (chủ dự án góp ý 2026-10-31, qua GD 2 sau khi xem ảnh mở màn 3 cảnh):** ghi đè các dòng trước nếu khác.
1. Cảnh 1: **mái tôn dùng đúng loại mái như L5** (ảnh `l5_awning_down`), thay mái tôn vẽ tạm `l7_tin_fallen` / `l7_tin_propped`; đổ = mái sụp lệch, đã kê thang = mái dựng lại như L5.
2. Cảnh 2: **xe đạp đổ đổi sang dựng dọc** (xe nghiêng/đứng chéo dựa tường thay cho nằm dẹt, bỏ ép dẹt 0,32), sửa lại tỉ lệ cho cân (không méo); dựng lại = xe đứng như L5.
3. Cảnh 3: **chuông lúc đầu treo ở góc cửa chính của nhà** (góc trên cạnh khung cửa chính, trong khung 9:16; chủ dự án đổi từ góc trên trái nhà), không còn nằm trên nắp hộp; **điểm đặt vẫn là móc ở cửa sổ** như cũ. Người chơi kéo chuông từ góc nhà vào móc cửa sổ. (Chủ dự án sửa lại cách hiểu ban đầu "dời móc".)

**G7-21 (chủ dự án góp ý 2026-10-31):** cảnh 1 mái che lúc đầu trông to nhưng rơi xuống trông bé tẹo, không hợp logic. Mái che **một cỡ duy nhất** ở cả lúc dựng, lúc sụp và lúc kê thang (không thu nhỏ khi rơi); mái đủ to để che chỗ trú (bắc từ tường ra, như bạt L5), sụp = một đầu tuột khỏi tường chúc xuống, vẫn đủ dài để che miệng chỗ trú.

**G7-22 (chủ dự án góp ý 2026-10-31):** cảnh 1 mái che **lúc đầu ở trên cao, gắn tường như bối cảnh L5** (bạt che phía trên, sát mép trên tường), không nằm thấp trên thành xe. Mở màn mái tuột khỏi tường, rơi xuống đất nằm chéo che miệng chỗ trú (cùng cỡ). Kê thang: mép mái gác lên đỉnh thang thành mái chéo che lối đi, **không bay về chỗ cao**.

**A7 (chủ dự án duyệt demo 2026-10-31):** demo `art/out/demo/l7_demo_s1..s3.png` đã duyệt, chuyển sang tách asset, tách sao cho giống demo. Riêng **con chó cảnh 2: so với chó L6 (`l6_dog_*`) và vẽ theo đúng con chó L6** (cùng giống, màu, nét), trong dáng như ở demo.

**G7-23 (chủ dự án góp ý 2026-11-01, sau ảnh GD chơi thử bản đã ráp asset):** ghi đè các dòng trước nếu khác.
Cảnh 1:
1. Mở màn: Mun chạy tới, **đứng lại lâu hơn một chút**, **sét chớp một cái**, rồi mới chạy vào trú dưới gầm xe ba gác.
2. Chỗ Mun nấp dời sâu vào trong gầm xe. Mái sụp dịch **sang phải 25 px, lên 4 px**.
3. Vùng đất phía dưới **nhiều vũng ngập hơn**, để cảm giác chỉ còn một lối đi ngang.
4. Bóng mờ ô sáng: **không hiện trước**; chạm (nhấc) món nào thì mới hiện bóng mờ của món đó. Nhấc một cành thì **chỉ sáng một ô cành** (không sáng cả 3).
5. Thêm **hoạt ảnh chạy cho Mun** (2 khung chạy luân phiên).
Cảnh 2:
6. **Vẽ lại cây** cho tự nhiên hơn.
7. **Mun nằm lớp trên cây** (không bị thân cây che).
8. Chỗ cắm ô trên bàn có **lỗ to hơn**, nhìn rõ.
9. **Vẽ lại con chó đẹp hơn** (vẫn là Lu L6).
10. Đoạn **chó chui vào thùng** diễn đẹp hơn.
11. Sàn phía dưới **nhiều vũng ngập hơn**.

**G7-24 (ĐÃ HUỶ: chủ dự án thấy đường chạy cũ ổn, trả lại như trước):** cảnh 2, Mun chạy ra trái qua chỗ xe đạp đã dựng thì đi phía trước, thấp hơn xe, không đè lên thân xe (trước đó nhìn như Mun ngồi trên xe).

**G7-25 (chủ dự án góp ý 2026-11-01, sau khi tự test):** ghi đè các dòng trước nếu khác.
Cảnh 1:
1. **Bỏ cái thang.** Bước mái: người chơi **kéo tấm mái sụp đặt lên xe ba gác** (ô sáng trên xe), thành mái che. Không còn món thang.
2. Mun qua tấm ván: **không nhảy, chạy thẳng qua**. Đường Mun đi **khớp với tấm ván** (hiện đường đi và ván lệch xa nhau).
3. Mun **đi ngang tới điểm tiếp theo** như demo chuyển tiếp cảnh 1→2 cũ (chạy ngang, không vòng lên xuống).
Cảnh 2:
4. **Ô dài thêm một chút**, cán ô **cắm xuyên qua lỗ** trên bàn.
5. **Xe đạp to hơn.**
6. **Chó vẽ lại theo style và độ cute của chó L6** (Lu).
7. Chó vào thùng: **mặt chó hiện bên trong thùng** (trong lòng thùng lật), **đầu to hơn** (hiện quá bé).
8. Mun **chạy qua tự nhiên như ở cảnh 1**.

**G7-26 (chủ dự án góp ý 2026-11-01):** cảnh 1: chỗ đặt mái dịch **sang trái 20 px** và mái **nằm ngang** trên thùng xe (góc 0, không nghiêng). Mun bò ra khỏi gầm xe thì **lớp Mun cao hơn xe** (không bị xe che). Chỗ đặt tấm ván **cao thêm 6 px**.

**G7-27 (chủ dự án góp ý 2026-11-01):** ghi đè các dòng trước nếu khác.
1. Cảnh 2: **vẽ lại cán ô dài** cho chỗ nối tự nhiên, nhìn giống gậy ô (bỏ cán nối vẽ bằng code).
2. Cảnh 2: **vẽ lại chó trong thùng** cho tự nhiên (không chỉ có cái đầu): nằm trong lòng thùng, thấy đầu và hai chân trước gác mép thùng.
3. Cảnh 3: Mun tới chỗ chờ thì **đứng lại, không nhảy**.
4. Cảnh 3: **toàn cảnh dịch lên 4 px**; thùng gỗ và hộp đồ nghề **to lên**, **dịch xuống 2 px**.
5. Cảnh 3: **đặt xong thùng và hộp là Mun nhảy lên bậu cửa sổ được** (không cần chờ treo chuông).
6. Cảnh 3: **khung cửa sổ to thêm 5 %**; thanh che (ô văng) trên cửa sổ **cao lên 3 px**.

**G7-28 (chủ dự án góp ý 2026-11-01):** cảnh 1: chỗ đặt mái trên xe dịch **sang phải 40 px** (so với G7-26); tấm ván **cao thêm 3 px**; Mun ra khỏi gầm xe thì **lớp Mun cao hơn cả các bụi cành cây**.

**G7-29 (chủ dự án góp ý 2026-11-01):** ghi đè các dòng trước nếu khác (kể cả G7-28 điểm 3).
Cảnh 1:
1. Mun **vẫn bị xe che**: Mun phải nằm trên lớp xe ba gác (và mái) khi bò ra và chạy đi.
2. Mái đặt trên xe dịch **sang phải thêm 20 px**.
3. Mun ra khỏi xe **dịch xuống 4 px**, **chỉ chạy ngang** sang (không lên xuống).
4. Mun nằm **lớp thấp hơn 3 bụi cành** (cành che Mun khi Mun chạy sau cành).
Cảnh 2:
5. Thùng carton **cao lên 10 px**.
6. **Vẽ lại chó trong thùng**: thấy **cả người** chó nằm trong thùng, **to hơn** (hiện quá bé, xấu).
Cảnh 3:
7. Thùng gỗ và hộp đồ nghề **dịch xuống 10 px**.
8. Cửa sổ **về lại cỡ cũ** (bỏ ×1,05 của G7-27).
9. **Art vẽ lại khung cửa sổ**: hiện ti vi, nội thất lộ ra ngoài mép khung cửa sổ.

**G7-30 (chủ dự án góp ý 2026-11-01):** cảnh 2: ô **lớp cao hơn cây**; lúc cắm **hạ thấp xuống**, cán **cắm xuyên lỗ** bàn (nhìn rõ cán đi vào lỗ: trên lỗ thấy cán, dưới mặt bàn cán bị mặt bàn che, mũi cán lộ dưới gầm).

**G7-31 (chủ dự án góp ý 2026-11-01):**
1. Cảnh 1: chỗ đặt mái dịch **sang phải thêm 7 px**.
2. Cảnh 1: chỗ đặt tấm ván **cao lên 4 px** (đường Mun theo mặt ván).
3. Cảnh 1: 3 cành **đã đặt** (dựng tường) nằm **lớp thấp hơn Mun**.
4. Cảnh 2: chó trong thùng **to hơn**.
5. Cảnh 3: chỗ Mun dừng trước cửa **thấp xuống 6 px**.
6. Cảnh 3: chỗ đặt thùng gỗ và hộp đồ nghề **thấp xuống 6 px**.
7. Cảnh 3: Mun trên bậu cửa sổ sau khi khều chuông **đứng thẳng lại** (đang hơi nghiêng).
8. Cảnh 3: Mun nghịch chuông được 1 giây thì **hiện mũi tên chỉ dẫn** như các level khác.

**G7-32 (chủ dự án góp ý 2026-11-01):** cảnh 3: chỗ chuông xuất hiện (treo cạnh cửa chính) dịch **sang trái 6 px**. Cảnh cuối, nhân vật quay lại (mở cửa sổ, dang tay) **×0,7** so với hiện tại và **thấp xuống 40 px**.

**G7-33 (chủ dự án góp ý 2026-11-01, "một chút" = cùng mức lần trước):** cảnh 1 chỗ đặt mái sang phải thêm 7 px; chỗ đặt ván cao thêm 4 px. Cảnh 3 chỗ chuông xuất hiện sang trái thêm 6 px; chỗ Mun chờ trước cửa thấp thêm 6 px; chỗ đặt thùng gỗ và hộp đồ nghề thấp thêm 6 px.

**G7-34 (chủ dự án góp ý 2026-11-01):** cảnh 1 chỗ đặt mái sang phải thêm 10 px; chỗ đặt ván cao thêm 4 px (đường Mun theo). Cảnh 3 chỗ chuông xuất hiện sang trái thêm 10 px; chỗ Mun chờ trước cửa thấp thêm 6 px; chỗ đặt thùng gỗ và hộp đồ nghề thấp thêm 14 px; dáng nhân vật giơ tay (player_arms_open) thấp thêm 40 px.

**G7-35 (chủ dự án góp ý 2026-11-01, đo bằng lưới grid=1, đơn vị px game):**
Cảnh 1:
1. Mái rơi (dáng sụp), xe ba gác, mắt Mun trong gầm và chỗ đặt mái trên xe **cùng cao lên 50 px**.
2. Mun khi ra khỏi xe **thấp xuống 10 px**.
Cảnh 2:
3. Mun tới chỗ chờ thì **ngồi nhìn một lúc** rồi mới giơ chân khều mưa, không giơ ngay.
4. **Vẽ lại dáng giơ chân** (mun_paw_rain): giơ **chân trước**, không phải chân sau.
5. Chỗ đặt thùng carton **cao lên 100 px**.
Cảnh 3:
6. Chỗ Mun ngồi đợi trước cửa **thấp xuống 25 px**.
7. Chỗ chuông xuất hiện **sang trái 18 px**.
8. Chỗ đặt thùng gỗ và hộp đồ nghề **thấp xuống 40 px**.

**G7-36 (chủ dự án góp ý 2026-11-01, px game):** cảnh 2 chỗ đặt thùng chó thấp xuống 35 px. Cảnh 3 chỗ đặt thùng gỗ và hộp đồ nghề cao lên 17 px; nhân vật giơ tay cuối màn (player_arms_open) sang trái 50 px, xuống 100 px.

**G7-37 (chủ dự án góp ý 2026-11-01, px game):** cảnh 3 điểm nhảy cuối của Mun sang phải 25 px. Cảnh 1 mặt Mun ló ra **đúng chỗ đôi mắt dưới gầm xe**, rồi Mun đi **hơi chéo xuống** tới điểm tiếp theo (đoạn sau vẫn chạy ngang). Cảnh 2 chỗ đặt thùng giấy thấp xuống 40 px.

**G7-38 (chủ dự án góp ý 2026-11-01):** cả 3 dáng giơ chân (mun_paw_rain, mun_paw_glass, mun_paw_chime) chưa đạt. Làm demo trên mun_paw_rain trước: từ ảnh cũ, chỉ xoá chân trước thừa, thay bằng chân sau đúng vị trí ảnh cũ, cong vừa phải, tự nhiên; giữ nguyên màu và style. Duyệt xong mới sửa 2 ảnh kia.

### Level 8 — Tắm cho Mun

> **Chủ dự án chốt hướng 2026-10-31.** Màn chăm sóc, không tìm mèo: Mun ngồi trên **ghế nhựa** giữa phòng tắm; **vòi sen treo sẵn** trên tường phải, **khăn bông treo sẵn** trên thanh tường trái, đồ cầm tay nằm trong khay dưới đáy (khay **đổi theo chặng**, mỗi lượt 1–3 món, G8-3), người chơi **kéo thả dụng cụ lên đúng chỗ trên người Mun**. Kéo thả tự do nhưng **ép thứ tự**. Màn được phép dài hơn khung Normal. "Đồ rơi khỏi kệ" (L8 cũ) dời sang chương 2, xem cuối file. Trạng thái đồ vật, khoá ảnh: xem `states-01-10.md`.

| | |
|---|---|
| Độ khó | 🟡 **Normal\* · 150 giây** (ngoại lệ: 10 bước, dài hơn khung Normal 4–5 bước / 90 giây; chủ dự án cho phép màn này lâu hơn) |
| Mèo | Mun (♥ 4/6) |
| Mục tiêu | **Tắm sạch cho Mun** (không phải tìm mèo). Bong bóng mở màn phải nói rõ |
| Phòng | 1: Phòng tắm nhà nhân vật, buổi sáng sau đêm bão L7. Mun ngồi trên **ghế nhựa thấp giữa phòng** suốt màn (G8-3: bỏ chậu tắm). Vòi sen treo móc tường phải, khăn bông vắt thanh treo tường trái |
| Dạy | **Kéo dụng cụ lên mèo** (chăm sóc theo thứ tự), giữ và vuốt qua lại |
| Bước bắt buộc | 10 (nhặt lá và cành, gỡ 2 chùm ké, xả bùn, bôi dầu tắm, chà bọt, lau mặt, xả bọt, lau khô, sấy, chải lông) |
| Đồ đánh lừa | Không có (mọi dụng cụ đều dùng, chỉ sai thứ tự) |
| Bí mật 🎁 | 1: vịt cao su nằm dưới sàn |

> **Góp ý chủ dự án G8-11 (2026-11-01, sau khi chơi bản ghép):**
> 1. **Chạm vào Mun** (bí mật b và mọi cú lắc khi chạm): lắc phải **mượt, tự nhiên** (có nhịp vào/ra êm, không giật); **nước bắn ra từ chính người Mun** (hạt nước văng ra từ thân), không phải hiện trên màn hình.
> 2. **Vòng gợi ý** (vòng tròn sáng ở chỗ cần làm): đổi sang **màu nổi bật hơn**, nhìn ra ngay trên lông đen và nền phòng tắm.
> 3. **Mun cần thêm ảnh chớp mắt**: dáng nào đang mở mắt mà chưa chớp được thì phải có mí mắt chớp.
> 4. **Vết dầu**: đổi từ hàng 5 vết thành **2 hàng: 3 vết trên, 2 vết dưới** (2 vết dưới nằm so le giữa 3 vết trên).
> 5. **Xong mỗi bước**: chớp sáng **nhiều nhịp** (không chỉ một), và **cả vùng vừa làm xong cũng nhấp nháy** theo.
> 6. **Vòng tiến độ (fillbar)**: **to gấp đôi**, **màu nổi bật hơn**.
> 7. **Dáng `mun_bath_lick`**: vẽ lại thành **liếm chân sau, chân sau giơ thẳng lên** (dáng mèo liếm kinh điển), thay dáng cúi liếm hông hiện tại. Lick nhắm mắt khi liếm. GD 2 chốt kéo theo: `mun_bath_tongue` vẽ lại thành "bị bắt quả tang giữa lúc liếm" (chân sau vẫn giơ thẳng, lè lưỡi, mắt tròn nhìn người chơi) để lúc chuyển lick → tongue không giật; tongue có mí chớp riêng.

> **Góp ý chủ dự án G8-12 (2026-11-01):**
> 1. **Khay đồ**: vẽ **riêng khay 2 ô và khay 1 ô** (không co giãn từ khay to; khay 1 ô co giãn hiện rất xấu).
> 2. **Vẽ lại ảnh đuôi Mun** (`mun_bath_tail_*`), hiện hơi xấu.
> 3. **Vòi sen**: điểm tương tác và vùng tương tác là **chỗ nước xả ra** (tia nước chạm Mun), không phải tay cầm.
> 4. **Thứ tự hiện vòng gợi ý**: vùng vừa làm xong chạy hết hiệu ứng nhấp nháy rồi tắt, **sau đó** vòng gợi ý của bước mới mới hiện.
> 5. **Vòng tiến độ** dịch sang trái 7 px.
> 6. **Lược chải lông (bước cuối)**: thêm ảnh **dạng úp** (mặt lông chải úp xuống). Nằm trong khay thì **dạng mở** (ảnh hiện tại), chọn/kéo lên thì đổi sang **dạng úp**, thả tay ra thì lại **mở**.

> **Góp ý chủ dự án G8-13 (2026-11-02):** **đuôi Mun ở cảnh cuối** (dáng sleek, đuôi `mun_bath_tail_sleek`) chưa đúng style và hơi xấu: đuôi mảnh như sợi dây, màu phẳng, không có chất lông chì như thân. Vẽ lại cho đúng style (lông chì, dày vừa, liền mạch với thân).

> **Góp ý chủ dự án G8-14 (2026-11-02):** đuôi sleek vẽ lại ở G8-13 **vẫn chưa đẹp, chưa khớp style**. Lỗi nhìn thấy: đuôi như **khúc xúc xích** to đều từ gốc tới ngọn, gốc phình tròn, ngọn tròn như quả bóng; **viền nâu mờ, gần như không có** (thân Mun viền nâu ấm rõ); màu **xám nâu nhạt, lệch** so với nâu sô-cô-la của thân; lông **mờ mịn như phun sơn**, không thấy nét chì. Yêu cầu: đuôi **thon dần** từ gốc tới ngọn, mảnh hơn đuôi bông xù, cong chữ S nhẹ; **màu và viền giống hệt thân `mun_bath_sleek`**; lông **nằm xuôi theo chiều đuôi** bằng nét chì ngắn, mép đuôi gọn, chỉ vài chỏm lông nhỏ; một vệt sáng chì dọc đuôi cho cảm giác mượt bóng. Giữ cỡ khung, điểm neo gốc đuôi và cách ghép vào thân như cũ. **Đã làm (Art 2D 2, tờ `l8src_mun_bath_tail_sleek_v4`, cùng nhóm cỡ với đuôi fluffy); chủ dự án duyệt L8 ngày 2026-11-02, giữ cỡ đuôi như vậy.**

**Sự thật về mèo:** tắm xong, việc đầu tiên mèo làm là **tự liếm lại toàn thân thật kỹ**, như thể người tắm chưa đủ sạch.

**Trạng thái mèo:** Mun luôn nhìn thấy, ngồi yên trên ghế nhựa, **không thắng bằng chạm Mun giữa chừng**. Mỗi bước xong, dáng Mun đổi theo (bẩn → bết nước → đầy bọt → quấn khăn → bông xù → mượt bóng). Xong bước 10 và hết khoảnh khắc kết, Mun **Lộ diện**: chạm là thắng.

**Mở màn (0–5 giây, khoá tương tác):** sáng hôm sau. Cảnh hiện dần (fade), Mun **đã ngồi sẵn trên ghế nhựa** (G8-1: không có cảnh nhân vật bế vào), co ro, lông bết bùn khô, lá khô và quả ké dính khắp người, lắc mình một cái làm rơi vụn bùn. **Bong bóng nhiệm vụ** từ đầu Mun: chỉ có **mặt Mun lúc sạch, lấp lánh** (G8-7), quanh có vài bọt xà phòng. Bong bóng thu về góc như các màn khác, chạm vào xem lại được.

**Bố cục màn hình:**

```
┌──────────────────────────────┐
│ ♥Mun ●●●○○○              ⏸  │
│ KHĂN BÔNG    PHÒNG TẮM   🚿  │
│ vắt thanh    (nền)    VÒI SEN│
│ treo         🍂(1)    trên móc│
│ ║      ┌──────────────┐  │   │
│ ║      │  MUN bẩn ướt │🍂 │ống│
│        │ ▒bùn(3) ▒bùn │  │mềm│
│        │      ✳ké(2) đuôi  │  │
│        └──GHẾ NHỰA────┘  VAN │
│   ░░ vũng nước sàn ░░ 🦆  ⊙ cống│
├──────────────────────────────┤
│          [🪮]            💡  │ ← khay chặng 1 (đổi theo chặng)
└──────────────────────────────┘
```

**Dụng cụ treo sẵn trong cảnh (G8-3):** **vòi sen** treo trên móc tường phải, ống mềm nối xuống van trộn; **khăn bông to** vắt trên thanh treo tường trái. Hai món này kéo thẳng từ chỗ treo, có suốt màn. Thả vòi sen ra thì vòi bay về móc và đung đưa; khăn dùng xong thì bay về vắt lại trên thanh.

Khay dụng cụ chỉ chứa **đồ cầm tay**, **đổi theo chặng**, mỗi lượt 1–3 món, vẽ to, dễ nhận ra. Trong một chặng, các món **xếp lộn xộn, không theo thứ tự tắm**:

| Chặng | Bước | Khay hiện |
|---|---|---|
| 1. Dọn dẹp | 1–3 | **Lược thưa** (lá khô ở bước 1 kéo thẳng bằng tay; bước 3 dùng vòi sen treo) |
| 2. Bọt bóng | 4–7 | **Khăn mặt ẩm**, **bông tắm**, **chai dầu tắm** (bước 7 dùng vòi sen treo) |
| 3. Làm đẹp | 8–10 | **Máy sấy**, **lược chải lông** (bước 8 dùng khăn bông treo) |

**Chuyển chặng:** xong bước cuối của chặng, khay cũ trượt xuống khỏi màn hình, khay mới trượt lên (0,5 giây), cùng lúc nhạc thêm một lớp. Không quay lại chặng cũ.

**Luật chung của màn (cách chơi):**
- Kéo **tự do**: lúc nào cũng nhấc được bất kỳ dụng cụ nào đang có trong khay, cùng vòi sen và khăn bông treo trong cảnh.
- **Ép thứ tự**: chỉ dụng cụ của bước hiện tại có tác dụng. Mỗi bước có **chỗ cần làm** trên người Mun (lá, ké, mảng bùn, bọt, mặt…), đánh dấu bằng **vòng tròn sáng** nhấp nháy nhẹ (G8-5: mọi chỗ gợi ý đều là hình tròn); xong bước này thì chỗ của bước sau mới sáng.
- Thả **dụng cụ sai bước** lên Mun: Mun lắc đầu, hiện **bong bóng mặt Mun không vui**, dụng cụ bay về khay. Thả ra ngoài Mun: dụng cụ bay về khay, không phạt.
- Dụng cụ dạng **vuốt** (lược, vòi sen, dầu tắm, bông tắm, khăn mặt, máy sấy): giữ dụng cụ trên chỗ cần làm và di qua lại; chỗ cần làm nhạt dần.
- **Vòng tiến độ (G8-4, G8-5):** mỗi bước có **một vòng tròn chung** ở chỗ cố định cạnh trên bên phải Mun, tô đầy dần theo **tổng tiến độ của bước** (bước 1 có 6 thứ: gỡ mỗi thứ đầy thêm 1/6; bước có nhiều chỗ vuốt thì cộng dồn). Vòng chỉ để biết **bao giờ xong bước**: đầy thì "ting", vòng nảy to rồi tắt; bước mới bắt đầu vòng mới từ 0. **Vòng chỉ hiện khi dụng cụ (hoặc tay, ở bước 1) chạm vào người Mun**, không hiện sẵn; rời người Mun quá 1 giây thì vòng mờ đi, chạm lại thì hiện lại (G8-6).
- **Bong bóng mặt Mun (G8-4):** trên đầu Mun hiện bong bóng mặt mèo đen 0,8 giây: **vui** khi xong một phần hoặc xong bước; **không vui** khi dùng sai dụng cụ (kể cả xịt vòi sen vào Mun sai bước). Không chữ. Thả tay giữa chừng: dụng cụ về khay (vòi sen về móc), phần đã làm giữ nguyên.
- Dụng cụ dạng **thả + chờ** (chỉ khăn bông): thả lên Mun, Mun quấn khăn, vòng chung tự đầy dần trong ~2,5 giây; đầy thì khăn **tự tuột ra**, bay về vắt lại trên thanh.
- Dùng xong bước cuối của một đồ trong khay thì đồ đó **mờ đi** trong khay. Vòi sen và khăn bông treo trong cảnh **không mờ** (G8-9).
- **Vòi sen lúc nào kéo ra cũng xịt nước**, kể cả khi chưa tới bước dùng nó. Nước (trong, nâu bùn, trắng bọt tuỳ lúc) chảy xuống sàn thành **vũng loang dần** quanh chân ghế, rút dần về lỗ thoát nước trên sàn.

**Các bước:**

| Bước | Việc | Dụng cụ | Chỗ cần làm | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Nhặt **lá khô và cành cây** (4 lá: đầu, lưng, hông, chân sau · 2 cành nhỏ: lưng, đuôi) | (tay) | 4 lá + 2 cành trên người Mun | Kéo từng thứ ra khỏi Mun, thả ra ngoài Mun. Cành nặng hơn: theo tay chậm hơn, phải kéo xa hơn mới rời | Lá bay xoay rơi khỏi màn hình; cành rơi "cạch" xuống sàn. Tai Mun giật một cái mỗi lần | Lá sột soạt, cành "cạch" |
| 2 | Gỡ **2 chùm ké** (đuôi, đầu) | Lược thưa | 2 chỗ: chùm ké ở đuôi, chùm ké trên đầu giữa hai tai, cùng một loại, cùng cỡ như demo (làm chỗ nào trước cũng được; G8-10) | Vuốt qua từng chỗ | Ké bật ra từng quả, nảy lách tách trên sàn; xong chùm đuôi thì đuôi vẫy, xong chùm đầu thì tai giật | "Tách tách" |
| 3 | **Xả nước trôi bùn** (3 mảng: lưng, chân trước, chân sau) | Vòi sen (treo) | Từng mảng bùn | Giữ vòi trên từng mảng | Nước bùn nâu chảy xuống sàn thành vũng, mảng bùn nhạt dần. Xong 3 mảng: lông bết sát người, **Mun gầy hẳn đi một nửa**, nhìn buồn cười | Nước xối |
| 4 | **Bôi dầu tắm** | Chai dầu tắm | Lưng và hông Mun | Vuốt chai qua lại trên lưng | Mỗi đoạn di chai nhỏ xuống **một vết dầu nhỏ**, đủ **5 vết** vào **5 chỗ xếp đều dọc sống lưng** là xong (G8-8, G8-9); Mun rùng mình | "Phọt" |
| 5 | **Chà nổi bọt** khắp người | Bông tắm | Lưng, hông, chân (vùng lớn) | Vuốt nhiều lần | Bọt phồng to dần, bong bóng bay lên; Mun híp mắt dễ chịu | Bọt lục bục |
| 6 | **Lau mặt** (không dội nước lên đầu) | Khăn mặt ẩm | Mặt Mun | Vuốt quanh mặt | Mun nhắm tịt mắt, nhăn mũi, **hắt xì** ra một bong bóng | "Hắt xì" mèo |
| 7 | **Xả sạch bọt** | Vòi sen (treo) | Cả người Mun | Giữ vòi, di qua lại | Bọt trôi hết, lộ lông đen bóng ướt | Nước xối |
| 8 | **Lau khô** | Khăn bông to (treo) | Cả người Mun | Thả lên Mun, chờ ~2,5 giây | Khăn quấn kín Mun, chỉ thò mỗi mặt ra; Mun dụi mặt, lim dim trong lúc vòng đầy. Đầy thì khăn tự tuột ra, bay về thanh | "Phạch" vải |
| 9 | **Sấy nhẹ** | Máy sấy | Cả người Mun | Giữ, di qua lại | Lông phồng dần, Mun nheo mắt trong gió. Xong: **Mun thành một cục bông đen tròn xoe** | Máy sấy ù ù nhỏ |
| 10 | **Chải lông** | Lược chải lông | Lưng Mun | Vuốt dọc lưng | Lông xẹp xuống mượt bóng, lấp lánh; Mun rừ rừ | Rừ rừ |

**Ý tưởng chi tiết:**

*Mạch cảm xúc.* Đây là lần đầu Mun được tắm trong nhà người. Màn kể chuyện Mun **từ co ro sợ sệt → tin tưởng → khoan khoái → tự hào**, không cần thanh đo: chỉ nhìn tai, đuôi và mắt Mun là biết.

| Chặng | Bước | Mun | Nhạc | Điểm cười cuối chặng |
|---|---|---|---|---|
| 1. Dọn dẹp | 1–3 | Tai hơi cụp, đuôi quặp, mắt tròn dè chừng, thỉnh thoảng run | Một cây đàn nhẹ, nhịp chậm | Xả xong bùn: **Mun gầy nhẳng** vì lông bết sát người, mắt to tròn, nhìn người chơi ngơ ngác |
| 2. Bọt bóng | 4–7 | Tai dựng lại, mắt híp, đuôi thả lỏng trong bọt | Thêm tiếng bọt lục bục làm nhịp, giai điệu vui hơn | Lau mặt: **Mun hắt xì** ra một bong bóng to, bong bóng bay lên rồi vỡ "póc" |
| 3. Làm đẹp | 8–10 | Ngồi thẳng, ngực ưỡn, rừ rừ | Đủ dàn nhạc nhẹ, ấm | Sấy xong: **Mun thành cục bông đen tròn xoe**, chỉ thấy hai mắt vàng |

*Cảm giác tay.* Mỗi lần làm phải đã tay, kiểu dọn dẹp cho sướng mắt:
- **Thấy ngay kết quả:** chỗ vừa làm sạch đổi màu tức thì dưới dụng cụ (bùn nhạt theo đường vòi sen đi qua, bọt nở theo đường bông tắm), không đợi xong cả bước mới đổi.
- **Tiếng "ting" nhỏ + lông lấp lánh** khi xong từng phần (từng lá, từng mảng bùn); tiếng "ting" to hơn và Mun đổi dáng khi xong cả bước.
- **Dụng cụ có chuyển động riêng khi đang dùng:** lược rung nhẹ khi vướng ké, vòi sen phun tia và rung theo, bông tắm bóp xẹp phồng theo nhịp vuốt, máy sấy thổi lông bay phần phật, lược chải để lại vệt bóng.
- **Điện thoại rung nhẹ** khi ké bật ra và khi xong mỗi bước (nếu thiết bị hỗ trợ).

*Khay dụng cụ là câu đố nhỏ.* Mỗi chặng chỉ 2–4 món nên không rối mắt, nhưng các món **xếp lộn xộn**: người chơi vẫn phải tự nghĩ "bôi dầu trước hay xả nước trước", "sấy trước hay chải trước". Thứ tự ngoài đời ai cũng đoán được, nên sai cũng không bực: Mun chỉ lắc đầu rồi **liếc về dụng cụ đúng**. Khay đổi theo chặng còn cho người chơi thấy rõ mình đang tiến lên.

*Từng bước nhìn thấy gì:*
1. **Nhặt lá và cành:** 4 lá dính ở chỗ dễ thấy (đỉnh đầu giữa hai tai, lưng, hông, chân sau) và 2 cành khô nhỏ vướng trong lông (lưng, đuôi). Kéo lá thì lá dính theo tay một chút như bị tóc níu rồi mới rời ra; cành vướng chặt hơn, phải kéo xa hơn. Mỗi lần gỡ, Mun **lắc người nhẹ** và giật tai (G8-6: không co nhỏ lại). Lá trên đầu nhặt ra: tai Mun bật dựng lên.
2. **Gỡ ké:** hai chùm ké tròn gai cùng một loại, một chùm bám ở đuôi, một chùm trên đỉnh đầu giữa hai tai, cùng cỡ như demo. Vuốt lược dọc đuôi, ké bật ra **từng quả một** "tách tách" và nảy xuống sàn. Chùm trên đầu cũng bật ra từng quả như vậy. Gỡ hết: đuôi Mun vẫy một cái nhẹ nhõm.
3. **Xả bùn:** 3 mảng bùn khô nứt nẻ (lưng, chân trước, chân sau). Tia nước chạm vào: bùn chảy thành dòng nâu xuống sàn, vũng nước quanh chân ghế ngả nâu và loang rộng dần. Mun nhắm mắt rụt cổ khi nước gần mặt.
4. **Bôi dầu tắm:** di chai qua lại trên lưng, cứ một đoạn lại nhỏ xuống một vết dầu tròn nhỏ trong veo, lấp lánh, rơi vào 5 chỗ đặt sẵn, **dáng giọt dầu đầu nhọn hướng lên** (G8-10), **xếp gọn đều thành một hàng hơi cong dọc sống lưng** (G8-9: không rơi lộn xộn). Đủ 5 vết: Mun rùng mình một cái (lạnh), quay đầu ngửi. Bước 5, bọt nở ra từ chỗ các vết dầu rồi lan dần.
5. **Chà bọt:** bông tắm đi tới đâu **nở thêm nhiều bọt nhỏ** tới đó (G8-5: không phải một cục bọt to phóng dần), bọt nhỏ chồng lên nhau phủ dần cả người, chỉ còn mặt và đuôi thò ra. Bọt nhỏ thỉnh thoảng bay lên lơ lửng khắp phòng.
6. **Lau mặt:** khăn nhỏ lau quanh mặt, mặt Mun nhăn lại theo khăn. Lau xong: Mun hắt xì ra bong bóng.
7. **Xả bọt:** vòi sen đi tới đâu từng bọt nhỏ vỡ "póc" hoặc trôi theo tia nước tới đó, lộ lông đen bóng ướt. Nước dưới sàn chuyển từ trắng bọt sang trong. Mun lại gầy nhẳng nhưng lần này sạch bóng.
8. **Quấn khăn:** kéo khăn bông từ thanh treo, thả xuống tự mở ra trùm lên Mun rồi quấn tròn, chỉ thò mỗi mặt. Mun dụi má vào khăn, mắt lim dim trong lúc vòng đầy dần; đầy thì khăn tự tuột ra, bay vòng về vắt lại trên thanh.
9. **Sấy:** gió máy sấy làm lông phồng lên theo hướng thổi; sấy đủ thì cả người phồng tròn xoe.
10. **Chải lông:** lược đi qua tới đâu lông cục bông xẹp xuống mượt tới đó, để lại vệt bóng. Chải xong: Mun ngồi thẳng, lông bóng lấp lánh, rừ rừ to.

*Hiệu ứng cho sinh động (G8-6).* Làm bằng code và hạt, màu pastel, không chữ; không khoá thao tác, không làm chậm việc tiếp theo (trừ cái lắc mình cuối chặng, tối đa 0,8 giây):
- **Lá và cành:** lá bay xoay theo đường cong, rơi lắc lư như lá thật, kèm vài vụn bụi. Cành rơi xuống nảy 2 lần trên sàn, lăn một chút.
- **Ké:** ké bật ra như bị bắn, nảy lách tách trên sàn rồi lăn.
- **Nước:** tia vòi sen có giọt bắn tung quanh chỗ xịt; lông vừa xịt sẫm bóng lên; thỉnh thoảng giọt bắn lên màn hình đọng 1 giây rồi chảy xuống; hơi nước ấm bốc mờ nhè nhẹ. Bùn tan thành vệt nâu chảy dọc người Mun xuống ghế rồi xuống sàn. Vũng nước gợn vòng tròn nơi giọt rơi, vịt nhún theo gợn.
- **Dầu tắm:** giọt dầu lấp lánh; vài gợn hương (đường cong mờ, hình hoa nhỏ) bay lên khỏi lưng Mun.
- **Bọt:** bọt nhỏ nảy nhẹ khi mới nở, thoáng ánh cầu vồng pastel trên bọt to nhất; chà nhanh thì bọt nở nhiều hơn. Hắt xì làm chùm bọt quanh mặt bắn tung ra.
- **Khăn:** rơi xuống phồng như cái dù rồi quấn lại quanh Mun; lúc tuột ra thì bay vòng như được hất lên.
- **Máy sấy:** lông Mun và khăn trên thanh rung phần phật theo gió; vài sợi lông nhỏ và giọt nước cuối cùng bay theo gió; bọt còn lơ lửng trong phòng bị thổi bay đi.
- **Chải lông:** vệt sáng chạy theo lược, vài ngôi sao nhỏ lấp lánh trên lông.
- **Xong mỗi chặng:** Mun **lắc mình cả người** thật đã, **chỉ là animation lắc chính dáng đang có, không đổi ảnh** (G8-7; chặng 1, 2: nước bắn tung toé; chặng 3: lông phồng lên rồi xẹp mượt), lắc xong thì Mun **chớp mắt** một cái, rồi khay mới trượt lên.
- **Làm liên tục không sai trong một chặng:** lấp lánh khi xong mỗi phần to và nhiều hơn một chút.
- **Mun sống động:** đuôi vẫy chậm theo nhịp thở, thỉnh thoảng chớp mắt, tai xoay về phía dụng cụ đang tới gần.

*Mun phản ứng khi người chơi chọn sai.* Code lắc dáng Mun đang có (không vẽ dáng lắc đầu riêng, G8-1), cộng thêm **ánh mắt Mun liếc về dụng cụ đúng** trong khay. Riêng hai trường hợp buồn cười dùng lại ảnh có sẵn: xịt **vòi sen** vào Mun ở bước 4–6 (chưa chà bọt xong) thì Mun rụt cổ, lắc nhẹ hai bên, nước bắn ra (code, không đổi ảnh, G8-9); thả **máy sấy** ở bước 8 (chưa lau khô) thì gió làm nước trên lông bắn tung toé, Mun nheo mắt nhìn người chơi như muốn nói "ướt thế này mà sấy à" (code lắc dáng Mun hiện tại + hạt nước).

*Nhịp màn.* Không có lúc nào phải chờ lâu: mỗi bước 6–15 giây, chuyển bước liền mạch (Mun đổi dáng là chỗ cần làm của bước sau sáng ngay). Người chơi nhanh tay xong trong khoảng 2 phút; 150 giây là đủ thoải mái cho người chậm.

**Đồ thêm cho vui:**

| Số | Đồ vật | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|
| a | Vịt cao su dưới sàn | 🎁 | Chạm | Vịt kêu, nảy lên, 5 Cá khô (lần đầu) | "Chít" |
| a' | Vịt khi vũng nước loang tới | ✨ | (tự động) | Vịt nổi bập bềnh trên vũng | — |
| a'' | Xịt vòi sen gần vịt | ✨ | Kéo vòi sen tới gần | Vịt nhảy nhảy 3 nhịp, kêu chít (không xoay) | "Chít chít" |
| d | Vòi sen xịt lung tung (chưa tới bước dùng) | ✨ | Kéo vòi sen | Xịt nước, vũng sàn loang; xịt lên Mun thì Mun lắc mình | Nước xối |
| b | Mun lúc còn ướt (bước 1–7) | ✨ | Chạm | Mun **lắc nhẹ sang hai bên** (chỉ animation, không đổi ảnh, G8-9), nước bắn ra màn hình (giọt nước đọng trên màn hình 1 giây) | Nước rảy |
| c | Mun lúc khô (bước 8–10) | ✨ | Chạm | Mun dụi đầu vào phía tay, rừ rừ | Rừ rừ |

**Khoảnh khắc kết:** chải xong, Mun sạch bóng, lông lấp lánh, ngồi thẳng nhìn người chơi một giây… rồi **cúi xuống liếm lại toàn thân thật kỹ**. Liếm trúng chỗ còn mùi dầu tắm, Mun khựng lại, **lè lưỡi**, rồi liếm tiếp như không có gì. Mun có viền sáng (Lộ diện).

**Chạm Mun → cảnh bế chung.** Mun lông mượt, hơi bông, có vài bong bóng nhỏ bay quanh.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–5 | (xem) | Cảnh hiện dần, Mun ngồi sẵn trên ghế nhựa, lắc mình rơi vụn bùn. Bong bóng: Mun bẩn → Mun sạch. Khoá tương tác tới khi bong bóng thu về |
| 5–20 | Kéo **4 lá khô và 2 cành** ra khỏi Mun | Lá bay đi, lược thưa trong khay sáng nhẹ (gợi ý bước sau) |
| 20–32 | **Lược thưa** chải đuôi và đầu | Ké bật ra |
| 28–45 | Kéo **vòi sen** từ móc, xả 3 mảng bùn | Mun bết nước, gầy hẳn |
| 45–52 | Vuốt **dầu tắm** trên lưng | Vệt dầu, Mun rùng mình |
| 52–68 | **Bông tắm** chà khắp người | Bọt phồng, bong bóng bay |
| 68–78 | **Khăn mặt** lau mặt | Mun hắt xì |
| 78–92 | **Vòi sen** xả sạch bọt | Lông đen bóng ướt |
| 92–100 | Kéo **khăn bông** từ thanh treo, thả lên Mun | Mun cuộn trong khăn, khăn tự tuột ra khi vòng đầy |
| 98–112 | **Máy sấy** | Mun thành cục bông |
| 112–124 | **Lược chải lông** | Mun mượt bóng, rừ rừ |
| 124–132 | (xem) | Mun liếm lại toàn thân, lè lưỡi |
| 132–137 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Thả dụng cụ của bước khác lên Mun: Mun lắc đầu, dụng cụ bay về khay; vòng tròn sáng ở chỗ cần làm của bước hiện tại nhấp nháy mạnh một nhịp.
- Thả dụng cụ ra ngoài Mun: dụng cụ bay về khay (vòi sen về móc, khăn về thanh).
- Thả tay giữa chừng khi đang vuốt: phần đã làm giữ nguyên, kéo lại làm tiếp.
- Kéo dụng cụ đã dùng xong (đang mờ trong khay): nhấc lên được, thả lên Mun thì Mun lắc đầu như dụng cụ sai bước.
- Đồ cầm tay của chặng khác không có trong khay nên không thể dùng sai sang chặng khác. Vòi sen và khăn bông có suốt màn nên dùng sai bước được (Mun lắc đầu như thường).
- Chạm Mun trước khi xong bước 10: chỉ là trò vui (lắc mình bắn nước hoặc dụi đầu), không thắng, không lùi bước.

**Thang gợi ý:**
1. *8 giây:* Mun nhìn về dụng cụ cần dùng (trong khay, hoặc vòi sen/khăn treo), meo nhỏ.
2. *16 giây:* dụng cụ đó lấp lánh, vòng tròn sáng ở chỗ cần làm trên người Mun sáng rõ hơn.
3. *💡:* bàn chân mèo làm mẫu kéo dụng cụ lên đúng chỗ (dụng cụ vuốt: làm mẫu một đường vuốt).

**Ghi chú vẽ, hoạt hình, âm thanh:**
- **Mun là trọng tâm:** vẽ to, chiếm phần lớn giữa màn hình, một dáng ngồi cố định trên ghế nhựa cho cả màn. Các trạng thái (bẩn, bết nước, bọt, khăn, bông, mượt) **cùng dáng, cùng cỡ, cùng đường đáy**, chỉ đổi phần lông. Bùn, lá, ké, bọt là **lớp phủ riêng** đặt lên Mun để nhạt dần bằng code.
- Nền phòng tắm đơn giản, sáng, gạch men pastel (phòng trống). Ghế nhựa, móc + vòi sen (**đầu vòi quay sang trái**, về phía Mun, cả lúc treo và lúc cầm) + van trộn, thanh treo khăn, lỗ thoát nước, vịt là sprite riêng. Ống mềm vòi sen vẽ bằng code, võng xuống theo tay.
- Dụng cụ trong khay vẽ to (khay chỉ 1–3 ô), rõ hình; lược thưa và lược chải, khăn mặt và khăn bông nằm ở chặng khác nhau nên không bị nhầm, không chữ trên chai dầu tắm (chỉ hình bọt và giọt nước).
- Cảnh Mun bết nước gầy hẳn và Mun sấy xong thành cục bông là hai điểm cười chính, cần đổi dáng rõ.
- Nhạc vui nhẹ, nhịp nước và bọt; cao trào nhỏ khi Mun mượt bóng; ngắt một nhịp lúc Mun lè lưỡi.

**Thưởng:** 30 Cá khô · Mun ♥ 4/6.

---

### Level 9 — Súp thưởng

> **Chủ dự án chốt hướng 2026-11-02.** Màn **nấu ăn**, không tìm mèo, không chạm mèo: người chơi nấu súp thưởng cho mèo theo **13 bước** trên **một góc bếp cố định**, rồi chia ra **2 bát**. Cảnh kết: **Mun và Sữa lần đầu gặp nhau**, ngạc nhiên nhìn nhau rồi cúi đầu ăn bát của mình. "Gối cỏ mèo" (L9 cũ) dời sang chương 2 (L13, cuối file). Trạng thái đồ vật trong `states-01-10.md` mục Level 9 là bản cũ, viết lại sau khi chủ dự án duyệt bản chơi thử.

| | |
|---|---|
| Độ khó | 🟡 **Normal\* · 150 giây** (ngoại lệ như L8: màn nấu ăn 13 bước, dài hơn khung Normal) |
| Mèo | Mun (♥ 5/6). Sữa xuất hiện ở cảnh kết |
| Phòng | 1: **Góc bếp sau quầy quán cafe**, máy quay **đứng yên** suốt màn, **góc nhìn top-down hơn** (G9-1). Mặt bàn bếp ở giữa, gần màn hình; bếp ga phía sau |
| Mục tiêu | **Nấu 2 bát súp thưởng** cho 2 mèo. Bong bóng mở màn phải nói rõ |
| Dạy | **Chuỗi cử chỉ nấu ăn**: vuốt (cắt, gọt, hớt), kéo thả, nghiêng (rót, gạt), xoay (núm bếp, khuấy), giữ (xay), chạm liên tục (thổi) |
| Bước bắt buộc | 13 (xem bảng) |
| Đồ đánh lừa | Không (đồ của bước nào bay vào đúng bước đó) |
| Bí mật 🎁 | Chưa chốt (đề xuất sau bản chơi thử) |

> **Góp ý chủ dự án G9-1 (2026-11-02, sau bản khối):**
> 1. **Góc nhìn top-down hơn**: nhìn mặt bàn bếp từ trên xuống nhiều hơn (gần như nhìn thẳng xuống mặt bàn), đồ trên bàn thấy rõ mặt trên. Ngoại lệ so với góc nhìn chung của game (style.md mục 2b), chỉ áp cho L9.
> 2. **Bong bóng nhiệm vụ chỉ có hình 1 bát súp đã hoàn thiện** (bốc khói thơm), bỏ 2 bát và 2 chân mèo.

**Sự thật về mèo:** mèo ít khi thấy khát nên dễ thiếu nước. Súp thưởng nhiều nước giúp mèo **uống thêm mà không biết**.

**Mở màn (khoá tương tác ~2 giây):** bếp hiện dần, mặt bàn đã bày sẵn đồ sơ chế (ức gà trên đĩa, chậu nước). **Bong bóng nhiệm vụ** nảy giữa màn hình: **1 bát súp đã hoàn thiện, bốc khói thơm hình cá** (G9-1). Không chữ. Bong bóng thu về góc như các màn khác, chạm vào xem lại được. Bong bóng ở góc **tô màu dần theo chặng** (xong mỗi chặng tô thêm 1/4); đầy màu lúc 2 bát bay xuống sàn rồi tắt.

**Luật chung của màn:**
- **Một góc bếp cố định.** Mặt bàn chỉ chứa **đồ của bước hiện tại** và món đang làm dở. **Không có khay đồ** ở đáy.
- **Chuyển bước:** xong bước → chớp sáng 3 nhịp + "ting" (như L8, G8-11) → **đồ không dùng nữa bay ra** khỏi màn hình → **món đang làm dở ở lại** đúng chỗ → **đồ của bước sau bay vào**, đáp đúng chỗ, nảy nhẹ → vòng gợi ý cam hiện ở đồ cần dùng.
- Mỗi bước có **vòng gợi ý cam** ở chỗ cần làm và **vòng tiến độ** đầy dần (dùng lại của L8). Vòng gợi ý của bước mới chỉ hiện sau khi hiệu ứng xong bước cũ tắt (G8-12).
- **Không thua, không sai dụng cụ.** Làm chưa đủ thì vòng tiến độ chưa đầy, làm tiếp là được.
- Không có mèo trong bếp lúc nấu, trừ **chân mèo thò lên** (dưới đây).

**13 bước nấu:**

| Chặng | Bước | Đồ trên bàn | Cử chỉ | Món thay đổi | Xong khi | Âm thanh |
|---|---|---|---|---|---|---|
| **1. Sơ chế** | 1. Rửa gà | Ức gà trên đĩa, chậu nước | Kéo gà vào chậu, chà qua lại | Gà bóng nước, nước gợn, bọt nhỏ | Vòng đầy | Nước "xoẹt xoẹt" |
| | 2. Gỡ da gà | Gà (trên thớt) | Kéo miếng da ra (dính theo tay rồi mới rời, như gỡ lá L8) | Da tách khỏi gà | Hết da | "Tực" |
| | 3. Cắt gà | Gà, dao | Vuốt dao **4 đường** | Mỗi đường tách ra một miếng | Gà thành miếng nhỏ | "Cộp" |
| | 4. Gọt bí | Quả bí đỏ, dao gọt | Vuốt dọc quả bí | Vỏ cong thành dải rơi xuống | Hết vỏ | "Xoẹt" |
| | 5. Cắt bí | Bí đã gọt, dao | Vuốt dao **3 đường** | Bí thành hạt lựu | Hết bí | "Cộp" |
| **2. Nấu** | 6. Cho vào nồi | Thớt (gà + bí), nồi nước trên bếp | **Nghiêng thớt** gạt vào nồi | Gà, bí rơi tõm, nước bắn nhẹ | Thớt trống | "Tõm" |
| | 7. Bật bếp | Núm bếp | **Xoay núm** theo vòng | Lửa xanh bùng; bong bóng lên dần tới sôi lục bục, hơi bốc | Nồi sôi | "Tách", lục bục |
| | 8. Hớt bọt | Muôi | Vuốt muôi qua mặt nồi | Bọt xám dồn vào muôi | Hết bọt | "Sột" |
| **3. Xay** | 9. Đổ vào máy xay | Nồi, máy xay | **Nghiêng nồi** | Súp chảy thành dòng vào cối | Cối đầy | Nước chảy |
| | 10. Xay mịn | Máy xay | **Giữ nút** | Lợn cợn → sánh → mịn (3 nấc); thả tay thì dừng, giữ lại xay tiếp | Mịn | Máy "rè rè" |
| | 11. Lọc qua rây | Rây đặt trên tô | **Khuấy vòng** trên rây | Súp mịn chảy xuống tô | Rây trống | "Sột sột" |
| **4. Chia bát** | 12. Thổi nguội | Tô súp | **Chạm liên tục** vào tô | Hơi nóng nhỏ dần, tắt | Hết hơi | "Phù phù" |
| | 13. Múc ra 2 bát | Tô, muôi, 2 bát nông rộng | Kéo muôi từ tô vào từng bát | Mỗi bát đầy dần tới **vạch hình chân mèo** trong lòng bát | Hai bát đầy bằng nhau | "Óc ách" |

**Bay ra / ở lại / bay vào (tiêu biểu):**

| Xong bước | Bay ra | Ở lại | Bay vào |
|---|---|---|---|
| 1 | Chậu nước, đĩa | Gà | Thớt (gà nhảy lên thớt) |
| 2 | Da gà | Gà trên thớt | Dao |
| 3 | Dao | Thớt gà đã cắt (dồn sang một bên) | Quả bí, dao gọt |
| 4 | Dao gọt, vỏ bí | Thớt, bí | Dao |
| 5 | Dao | Thớt gà + bí | Nồi nước trên bếp |
| 7 | — | Nồi sôi | Muôi |
| 8 | Muôi, bọt | Nồi | Máy xay |
| 10 | — | Máy xay | Rây trên tô |
| 11 | Máy xay, rây, nồi | Tô súp | — |
| 12 | — | Tô súp | 2 bát, muôi |

**Chân mèo thò lên nghịch đồ (3 lần cố định):** một bàn chân mèo thò lên từ mép bàn phía dưới màn hình, lúc **chân đen (Mun)**, lúc **chân trắng (Sữa)**, báo trước có hai con đang rình.
- Sau bước 3: chân khều **một miếng gà** trượt dần ra mép bàn.
- Trong bước 7 (chờ sôi): chân vỗ vỗ **cái muôi** (vừa bay vào).
- Trong bước 12 (thổi nguội): chân thò về phía **tô súp**.
- **Chạm vào chân**: chân rụt lại thật nhanh, tiếng "meo" nhỏ dưới gầm bàn.
- **Để mặc** khoảng 3 giây: chân lấy mất miếng gà (hoặc muôi lăn lóc rồi tự về chỗ, hoặc chân chấm một chút súp rồi rụt), tiếng nhai chóp chép dưới gầm bàn. **Không thua, không mất bước**, chỉ để cười.

**Cảnh kết (không chạm mèo, tự thắng):**
1. Múc xong 2 bát: chớp sáng, "ting".
2. **Cả mặt bàn và mọi đồ trên bàn mờ đi rồi ẩn hẳn**, lộ sàn bếp.
3. **2 bát bay từ trên xuống**, đáp nhẹ xuống sàn, cách nhau một chút. Khói thơm hình cá bay lên.
4. **Mun đi vào từ mép trái, Sữa đi vào từ mép phải** cùng lúc, mỗi con đi thẳng tới một bát.
5. Tới bát, hai con cùng ngẩng lên **nhìn nhau ngạc nhiên**: mắt tròn, tai dựng, đuôi phồng nhẹ, khựng ~1 giây. **Lần đầu Mun và Sữa gặp nhau.**
6. Liếc xuống bát rồi **cúi đầu ăn trong hạnh phúc**: mắt híp, đuôi vẫy chậm, vài trái tim nhỏ bay lên, tiếng liếm chóp chép.
7. Ăn **1,5 giây** → **thắng**, sang thẳng màn hình thưởng.

**Ngoại lệ kết màn chung (chủ dự án chốt):** màn này **không có mũi tên trên đầu mèo, không chạm mèo, không cảnh bế**. Mun vẫn tính ♥ 5/6.

**Thang gợi ý:**
1. *8 giây:* đồ cần dùng lắc nhẹ, vòng gợi ý cam nhấp nháy mạnh một nhịp.
2. *16 giây:* bàn chân mèo làm mẫu cử chỉ của bước (vuốt, nghiêng, xoay, giữ, chạm liên tục).

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Nền: một ảnh góc bếp (mặt bàn gỗ, bếp ga phía sau, tường gạch men). Khi bàn ẩn đi phải còn **sàn bếp** cho cảnh kết (bàn là lớp riêng, hoặc sàn nằm dưới khung bàn).
- Mèo chỉ cần: Mun và Sữa mỗi con **đi vào, ngạc nhiên, cúi ăn**; chân đen, chân trắng thò lên.
- Trạng thái món ăn: gà (nguyên, rửa xong, gỡ da, miếng), da gà, bí (nguyên, gọt, hạt lựu), vỏ bí, nồi (nước, có đồ, sôi có bọt, súp), máy xay (lợn cợn, sánh, mịn), rây, tô súp (nóng, nguội), 2 bát (rỗng, đầy).
- Dụng cụ: đĩa, chậu nước, thớt, dao, dao gọt, nồi, núm bếp + lửa, muôi, máy xay, rây, tô, 2 bát.
- Bay ra / bay vào, rơi tõm, nước bắn, hơi nước, khói hình cá, trái tim do code.
- Âm thanh mượn tiếng tổng hợp có sẵn ở bản chơi thử.

> **Góp ý chủ dự án G9-2 (2026-11-02):** đổi góc nhìn **đồ trong bếp** từ top-down thẳng sang **top-down 3/4**: nhìn chéo từ trên xuống, thấy cả **mặt trên** (lòng nồi, lòng bát, mặt thớt, mặt bếp ga) lẫn **mặt trước** của đồ (thành nồi, thân máy xay, cạnh bàn có độ dày). Mặt bàn là mặt phẳng lùi xa, đồ phía sau nhỏ hơn và cao hơn trên màn hình một chút. **Cảnh kết giữ góc nhìn cũ** như các màn khác (nhìn ngang hơi trực diện, như sofa L1): sàn bếp, 2 bát, Mun và Sữa đi vào, ngạc nhiên, cúi ăn.

> **Góp ý chủ dự án G9-3 (2026-11-02):** đổi cử chỉ một số bước, màn thành **14 bước**. Bảng 13 bước ở trên là bản cũ; khi khác nhau thì theo danh sách này:
> 1. Rửa gà (giữ nguyên).
> 2. Gỡ da gà (giữ nguyên).
> 3. **Cắt gà:** kéo dao **đặt lên thớt** cạnh miếng gà; sau đó **mỗi lần chạm = một nhát cắt** (4 nhát), dao nhấc lên chặt xuống, mỗi nhát tách một miếng. Không vuốt nữa.
> 4. **Gọt bí:** kéo dao gọt **di chuyển trên quả bí**; vỏ bí chia thành nhiều miếng, **đầu dao chạm miếng vỏ nào thì miếng đó bong ra rơi xuống**. Hết vỏ là xong.
> 5. **Cắt bí:** giống cắt gà (đặt dao lên thớt, chạm mỗi lần một nhát, 3 nhát).
> 6. **Cho vào nồi:** chỉ cần **kéo thớt tới nồi**; thả vào vùng nồi thì **thớt tự diễn nghiêng**, gà và bí **lần lượt nhảy từng miếng** vào nồi (tõm, nước bắn nhẹ), rồi thớt tự về/bay ra.
> 7. Bật bếp, chờ sôi (giữ nguyên).
> 8. **Khuấy nồi bằng muôi** (thay bước hớt bọt, **bỏ hớt bọt**): kéo muôi vòng tròn trong nồi; nước súp xoáy theo, các miếng gà và bí trôi vòng theo muôi, chìm nổi; vòng tiến độ đầy dần theo số vòng khuấy (khoảng 3 vòng); muôi gõ nhẹ thành nồi có tiếng.
> 9. Đổ nồi vào máy xay: kéo nồi tới máy xay, nghiêng đổ (giữ nguyên).
> 10. Xay mịn: giữ nút (giữ nguyên).
> 11. **Đổ máy xay vào rây (mới):** người chơi **kéo cối máy xay tới rây và nghiêng đổ**, giống hệt cách đổ nồi vào máy xay ở bước 9. Máy xay không tự nghiêng nữa.
> 12. Khuấy rây (bước 11 cũ).
> 13. Thổi nguội (bước 12 cũ). Chân mèo lần 3 chuyển sang bước này.
> 14. Múc ra 2 bát (bước 13 cũ).
>
> **Cảnh kết:** 2 bát đặt **xa nhau hơn**, thêm khoảng cách bằng **1 bề rộng bát** so với hiện tại. Hai mèo phải **thấy rõ đầu** (đầu, tai, mặt) lúc đi vào, lúc nhìn nhau ngạc nhiên và lúc cúi đầu ăn. *(Chủ dự án duyệt khoảng cách 2 bát; Mun và Sữa **giữ kích thước cũ**, không thu nhỏ để vừa khung.)*
>
> **G9-4 (2026-11-02), dao cắt (bước 3, 5):** dao đặt ở **bên phải thớt**, lưỡi nằm ngang (cán bên phải, lưỡi chĩa sang trái, mép lưỡi quay xuống). Mỗi chạm là một nhát **cả lưỡi chặt thẳng từ trên xuống** theo đường ngang, ép qua món rồi nhấc lên; không phải mũi dao chọc thẳng xuống như bản G9-3. Món thành các dải ngang xếp trước sau (gà 4 nhát, bí 3 nhát), các nhát đi lần từ trên xuống dưới màn hình.
>
> **G9-5 (2026-11-02):** nhát chặt đang gượng. Đổi sang **chặt bập bênh**: dao **xoay quanh điểm cố định ở khoảng 1/3 chiều dài dao tính từ cán** (chủ dự án chốt), mỗi chạm là phần lưỡi phía mũi nâng lên rồi hạ xuống ép qua món; nhịp nhanh, gọn. Bước 6: các miếng gà, bí nhảy từ thớt vào nồi phải **nằm lớp trên thớt** (không bị thớt che), và **nhảy nối nhau nhanh hơn**.
>
> **G9-6 (2026-11-03):** gà lúc bắt đầu cắt là **một tảng nguyên**, không chia sẵn dải. Mỗi nhát chỉ để lại **một vết cắt**; **cắt đủ nhát rồi mới tách ra thành miếng** (các miếng hé ra, nảy nhẹ). Bí cũng vậy và cắt **2 lượt**: lượt 1 cắt ngang 3 nhát, rồi **quả bí xoay 90° trên thớt** (dao giữ nguyên bên phải), lượt 2 cắt thêm 3 nhát; xong mới tách thành hạt lựu.
>
> **G9-7 (2026-11-03):** dòng súp đổ từ nồi vào máy xay (bước 9) nhìn chưa tự nhiên. Dòng phải chảy ra từ **điểm thấp nhất của miệng nồi**, rơi **cong theo trọng lực** xuống đúng miệng cối; to ở chỗ ra, thon dần khi rơi, mép hơi gợn, có vệt sáng dọc dòng; chỗ rơi vào cối có bọt bắn nhỏ và mặt súp gợn. Dòng bắt đầu khi nồi nghiêng đủ, nhỏ dần rồi đứt thành vài giọt khi gần hết. Áp dụng cho cả bước 11 (cối đổ vào rây).
>
> **G9-8 (2026-11-03):** thêm **bước múc ra khay** trước bước múc 2 bát, màn thành **15 bước**. Bước 14 mới: một **khay (hộp đựng) rỗng** bay vào; người chơi kéo muôi từ tô sang khay, múc đầy tới vạch như bát. Đầy rồi thì **tự diễn**: nắp đậy xuống thành hộp kín, **ruy băng quấn quanh và thắt nơ**, hộp nảy nhẹ một cái rồi **bay đi** khỏi màn hình. Sau đó 2 bát bay vào, bước 15 múc ra 2 bát như hiện tại.
>
> **G9-9 (2026-11-03):** (1) **Bước 8 khuấy nồi:** máy quay **zoom vào và dời cho nồi vào giữa màn**, muôi bay vào **đặt gần bếp/nồi** (không ở xa); khuấy xong thì máy quay **zoom ra, dời về** vị trí cũ, nồi và bếp về đúng chỗ. (2) **Chuyển sang cảnh kết:** múc xong 2 bát thì 2 bát **nhẹ nhàng bay lên trên** ra khỏi màn; chuyển cảnh sang sàn bếp; 2 bát **bay nhẹ từ trên xuống**, đáp êm đúng vị trí bát của 2 mèo (không rơi rớt mạnh). Phần mèo giữ nguyên.
>
> **G9-10 (2026-11-03):** (1) Bí xoay 90° thì **cuống xoay theo**. (2) **Zoom vào nồi ngay khi vặn núm bếp xong** (đầu bước 7), giữ zoom suốt lúc chờ sôi và khuấy (bước 8), khuấy xong mới zoom ra. (3) Muôi bay vào **gần nồi hơn nữa** (sát cạnh nồi). (4) Cảnh kết: **Mun dịch sang trái, Sữa dịch sang phải một chút**, vẫn trọn khung. (5) Zoom vào nồi **hơi sâu, giảm bớt một chút** (từ 1,7 xuống khoảng 1,4 lần). (6) Khung zoom **hạ thấp xuống một chút** (thấy thêm mặt bàn phía dưới bếp); **muôi và tay Sữa dịch xuống mặt bàn** dưới bếp, không nằm trên mặt bếp.
>
> **G9-11 (2026-11-03):** (1) Lúc nồi và rây bay ra (sau bước khuấy rây), **bếp ga cũng bay ra** luôn. (2) Từ đó tới hết phần múc (thổi nguội, múc khay, múc 2 bát), **máy quay tập trung vào tô súp và các đồ mới bay vào** (khay, 2 bát, muôi): zoom/dời cho cụm này vào giữa màn. (3) Lúc múc, **vùng chạm nằm ở đầu muôi (lòng muôi)**, to rộng cho dễ múc: kéo đầu muôi chạm tô là múc, chạm khay/bát là đổ.
>
> **G9-12 (2026-11-03):** (1) **Màn hình thưởng hiện đầu 2 mèo**: xong cảnh 2 mèo ăn, màn hình thưởng hiện **2 icon đầu mèo (Mun và Sữa)** thay vì 1, giống icon đầu mèo ở các màn khác. Cảnh kết giữ nguyên (mèo đi vào bằng thân).
>
> **Demo duyệt (2026-11-04):** chủ dự án duyệt 4 demo L9 (`art/out/demo/l9_demo_prep/cook/blend/end.png`). Khi tách: **tay (chân) Mun và Sữa thò lên vẽ thẳng lại**, không cong gập.
>
> **G9-13 (2026-11-04):** cảnh kết, **mặt (đầu) Mun và Sữa nằm lớp trên bát**, không bị bát che; lúc cúi ăn mõm chạm mép bát, mặt vẫn thấy rõ.
>
> **G9-14 (2026-11-04), sau khi ghép ảnh thật — nét vẽ còn hơi xấu:**
> 1. **Bếp ga** lệch style: vẽ lại nét dễ thương hơn (tròn, mềm, chất chì như L1), không tô mảng phẳng.
> 2. **Gọt bí và vỏ bí** đang xấu, vỏ không khớp quả: vẽ lại quả bí và các miếng vỏ **khớp đúng hình quả** (vỏ phủ kín quả, bong ra để lộ ruột đúng chỗ).
> 3. **Mũi tên gợi ý cử chỉ** đang thô: thay bằng mũi tên vẽ tay mềm, dễ thương đúng style.
> 4. **Lửa** đang thô: vẽ lại lửa xanh nhạt mềm, dễ thương.
> 5. **Nước trong chậu** phải **xanh rõ hơn** (vẫn trong bảng màu, xanh da trời).
> 6. **Xoá hết chữ** (nhãn tên đồ) trong màn.
> 7. **Thêm thao tác tắt núm bếp**: khuấy xong, người chơi **xoay núm về tắt**, lửa tắt, rồi mới sang đổ vào máy xay. Màn thành **16 bước**.
> 8. **Máy xay có nắp:** đổ súp vào xong thì diễn **đóng nắp**; xay xong diễn **mở nắp** rồi mới đổ sang rây.
> 9. **Súp trên rây** phải khớp đúng mặt lưới rây (nằm trong lòng rây, không tràn hay lệch).
> 10. **Nắp khay hộp** dịch cao lên một chút.
> 11. **Múc vào bát/khay:** mặt súp to lên hay nhỏ đi phải **đổi cỡ mượt** (tween), không nhảy.
> 12. **Cảnh kết:** mỗi mèo thêm **một ảnh đầu riêng**: thân và chân đứng **sau bát** (lớp dưới bát), **đầu nằm lớp trên bát**, cúi ăn trong bát.
>
> **G9-15 (2026-11-05):** (1) Chân Sữa vỗ muôi: tay vừa rụt là **người chơi cầm muôi được ngay**, không chờ muôi về chỗ. (2) **Trả lại mũi tên vòng tròn do code vẽ** cho hướng dẫn khuấy như trước. (3) Hai mèo cảnh kết vẫn lỗi, Dev kiểm và sửa.
>
> **G9-16 (2026-11-05):** anim **mèo đi vào** ở cảnh kết còn xấu: 4 khung hiện tại gần như giống nhau, chân không theo nhịp đi (không có cặp chân chéo), thân không nhún, đuôi đứng yên. Vẽ lại **chu kỳ đi 4 khung đúng nhịp** cho Mun và Sữa (chung một tờ mỗi con), Dev khớp tốc độ trượt với bước chân. (2) Bước 11 (đổ máy xay vào rây): **súp dâng trong rây và tô đang quá mờ**, phải tô màu súp đặc, đậm rõ như súp trong cối.
>
> **G9-17 (2026-11-06):** thử làm anim **mèo đi vào** bằng **video**: Art viết mô tả, gửi ảnh mèo cho Codex làm **video 4 giây mèo đi bộ tại chỗ** (không trượt ngang, Dev lo phần di chuyển), chu kỳ bước **loop liền** (khung cuối nối khung đầu). **Làm Mun trước**, chủ dự án duyệt rồi mới làm Sữa.

**Thưởng:** 30 Cá khô.

---

### Level 10 — Đại chiến quái thú

> Chủ dự án chốt 2026-11-02 (bản 5, G10-5, thay các bản trước): hai mèo **mặc sẵn đồ hóa trang**, **đứng yên một chỗ đánh nhau** suốt màn. Người chơi dùng **máy bay đồ chơi** lấy cây kéo trên kệ cao, rồi dùng **chính đòn đánh của hai con** làm dụng cụ: Sữa khè bóng sang Mun, Mun đấm bóng làm rơi hộp súp. Cắt ruy băng, hộp súp mở, hai con hóa dễ thương cùng ăn. Bố cục theo phác thảo G10-4 (`art/review/l10_layout_g10-4.png`), hộp khăn giấy đổi thành hộp đồ chơi thứ hai. Mục trạng thái trong `states-01-10.md` viết lại sau khi chủ dự án duyệt gameplay.

| | |
|---|---|
| Độ khó | 🔴 **Hard · 150 giây** |
| Mèo | Mun (♥ 6/6 → **vào quán**), Sữa tham gia |
| Phòng | 1 cảnh: **Phòng khách nhìn từ sát sàn**, đồ đạc đóng vai **một thành phố** |
| Dạy | Tổng hợp: ghép, đồ tự bay đi lấy đồ, **dùng phản xạ của mèo làm dụng cụ**, kéo thả đồ lên mèo |
| Bước bắt buộc | 10 (G10-21: lấy lọ hoa, lấy xe cứu hỏa, ghép dập lửa, lấy pin, lấy máy bay, ghép pin, lấy kéo khi máy bay về, lấy bóng, thả bóng lên Mun, thả kéo cắt ruy băng hộp súp) |

**Sự thật về mèo:** hai mèo **mới gặp nhau một lần** (L9) vẫn chưa thân, gặp lại là xù lông gầm gừ. Muốn chúng làm quen, cho **cùng ăn món khoái khẩu** (súp thưởng) để chúng gắn việc gặp nhau với điều vui. Ăn chung xong, hai con **liếm lông cho nhau**.

**Bối cảnh:** trò nhại phim quái vật khổng lồ (chung chung, không theo phim cụ thể nào). Máy quay đặt sát sàn nên đồ đạc to như **một thành phố**; người chơi (đôi tay, góc nhìn thứ nhất) bé tí dưới chân hai mèo khổng lồ. Hai mèo **đã mặc sẵn đồ hóa trang** khi vào màn:
- **Sữa** (đứng bên **phải**) mặc bộ **thằn lằn gai lưng**: đồ vải xanh nhạt, gai nỉ dọc lưng, đuôi dài, mặt Sữa lộ trong mũ trùm. Đòn: **khè lửa xanh nhạt**, quất đuôi.
- **Mun** (đứng bên **trái**) mặc bộ **khỉ đột**: đồ lông nâu sẫm, mặt Mun lộ trong mũ trùm. Đòn: **đánh tay**, đấm ngực.
- Không logo, không chữ. **Hai con không bao giờ rời chỗ đứng**, chỉ quay đầu, cúi đầu, vung tay về phía thứ làm chúng chú ý.

**Vòng đánh nhau (lặp khoảng 4 giây):**

| Nhịp | Sữa | Mun | Hiệu ứng |
|---|---|---|---|
| 1 (1,2 giây) | **Khè luồng lửa xanh** ngang tầm cao về phía Mun | **Giơ hai tay chéo đỡ** | Ánh xanh rọi cảnh |
| 2 (0,8 giây) | — | **Vung tay đấm** về phía Sữa | Màn hình rung nhẹ |
| 3 (0,8 giây) | **Lắc mình né, quất đuôi gạt** | — | Gió "vù" |
| 4 (1,2 giây) | Gầm | Đấm ngực gầm | Nhạc kèn đồng nhấn |

**Mở màn:** vào thẳng cảnh, hai mèo đang đánh nhau. Nhạc kèn đồng phim quái vật. Bong bóng nhiệm vụ: mặt Mun.

**Trạng thái mèo:** còn mặc đồ thì hai con ở trạng thái **Lẩn tránh**: chạm con nào thì con đó quay sang gầm, luồng gió (Sữa) hoặc cú vung tay (Mun) thổi **đôi tay người chơi bật ra khỏi khung** một thoáng rồi đưa trở lại, con đó đánh tiếp. Sau khi thu nhỏ thành mèo thật, Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình (dọc, vùng chơi 1024x1536; G10-4, G10-5):**

```
┌──────────────────────────────────────┐
│ ♥Mun ●●●●●○                       ⏸ │
│  (2) KÉO     ▌▐▌▌ sách   (1) HỘP SÚP●│
│  ═ KỆ TRÁI ═  ═ KỆ GIỮA ═ ═ KỆ PHẢI ═│ ← ba kệ cùng độ cao
│ ╭────────────── SOFA ─────────────╮🌿│ ← chậu cây (rừng)
│ │ (8)gối                          │  │
│ ╰─┬──────────┬───────┬──────────┬─╯  │
│   │ 🦍 MUN   │       │ 🦎 SỮA   │    │
│   │(đứng yên)│ ~lửa~>│(đứng yên)│    │
│   │   ┌──────┴───────┴──┐(3)đk │    │
│   └───│▦bánh BÀN TRÀ 🌷│──────┘    │
│       │ = ĐẤU TRƯỜNG (5)│           │
│       └─────────────────┘           │
│ ┌─────┐  ▣╭─THẢM 🚗🛡🚒─╮▣ ┌─────┐ │
│  ⚽(6)    │ ═tàu hỏa═ 💡│   ✈(7)    │
│ │ĐC TRÁI│ ╰──────────────╯  │ĐC PHẢI│ │
│ [túi đồ: ___ ___ ___ ___]        💡 │
└──────────────────────────────────────┘
```

- **Hàng trên:** ba kệ treo tường, tay không với tới; **kệ phải cao nhất, kệ trái thấp hơn một bậc, kệ giữa thấp hơn hai bậc** (G10-7; một bậc khoảng 80px). **Kệ trái** có **cây kéo (2)**. **Kệ giữa** có **chồng sách** (tòa nhà). **Kệ phải** có **hộp súp thưởng (1)** buộc ruy băng.
- **Giữa:** sofa to phía sau, **trên sofa chỉ có gối**. Mun trước nửa trái, Sữa trước nửa phải. **Bàn trà (đấu trường, 5)** trước chân hai con; trên bàn: **hộp bánh** (mép trái), **lọ hoa ở giữa bàn, phía sau** (G10-7), **điều khiển TV (3)** (mép phải). Hộp súp rơi xuống **ngay trước lọ hoa**.
- **Hàng dưới (G10-9: bỏ hai hộp đồ chơi):** **quả bóng (6)** nằm thẳng trên sàn bên trái (chạm lấy; bay xong lăn về chỗ cũ), **máy bay (7)** đậu thẳng trên sàn bên phải (chạm lấy; bay xong hạ cánh về chỗ cũ). Thảm to hơn, đồ chơi đặt ngoài đường ray. Trước đây: thảm giữa là **quảng trường thành phố** (đường ray tàu hỏa, khối xếp hình, cột đèn, ô tô, xe tăng, xe cứu hỏa); **hộp đồ chơi phải (7)** (thay chỗ hộp khăn giấy cũ) có máy bay, cũng là **sân bay** nơi máy bay cất cánh và hạ cánh.
- Đồ phụ "thành phố": xem bảng **Đồ phụ thành phố** bên dưới.

> **G10-21 (2026-11-05, chủ dự án chốt, thay bảng đồ vật, đồ phụ, luồng giải và gợi ý cũ):** mọi đồ có tác dụng trong đường giải thì giữ, đồ chỉ để làm nhiễu thì bỏ. **Mở màn Sữa khè một quả cầu lửa**, Mun giơ tay đỡ, quả cầu dội ngược, tách làm 3, gây **3 đám cháy nhỏ: hai góc thảm và cái điều khiển TV**. Người chơi lấy **lọ hoa** và **xe cứu hỏa**, ghép lại: xe cứu hỏa chạy ra xịt tắt hết đám cháy, hết cháy mới lấy được pin trong điều khiển. Phần máy bay, bóng, cắt ruy băng và cảnh kết giữ như cũ. **Bỏ:** ô tô, xe tăng, tàu hỏa, cột đèn, hộp bánh. **Giữ làm cảnh, chạm không có gì:** sofa, hai gối, chậu cây, chồng sách, khối xếp hình, thảm.

**Mở màn quả cầu lửa (G10-21, chạy một lần):** vào màn, bong bóng nhiệm vụ hiện xong (~2 giây) thì:
1. Sữa hít hơi rồi **khè ra một quả cầu lửa xanh nhạt** bay về phía Mun (~0,6 giây).
2. Mun **giơ hai tay đỡ** (dáng đỡ), quả cầu **dội ngược** lên cao.
3. Quả cầu **tách làm 3 quả nhỏ** bay vòng cung, rơi xuống: **góc trái thảm**, **góc phải thảm**, và **cái điều khiển TV trên mép phải bàn**. Mỗi chỗ bùng một **đám lửa nhỏ xanh nhạt** cháy lập lòe mãi (~1,5 giây cho cả đoạn).
4. Hai con đánh nhau tiếp như vòng thường. Không còn quả cầu nào nữa.

**Đồ vật chính (G10-21):**

| Số | Đồ vật | Loại | Thao tác | Điều kiện | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 3 | Điều khiển TV (mép phải bàn trà) **đang cháy** | — | Chạm | Còn cháy | Tay giật lại "nóng". Bong bóng: hình xe cứu hỏa | "Xèo" |
| 4 | Lọ hoa (giữa bàn, phía sau) | 🔑 | Chạm | — | Lọ hoa (có nước) vào túi | Leng keng |
| 5 | Xe cứu hỏa đồ chơi (sàn trái, cạnh thảm) | 🔑 | Chạm | — | Xe vào túi | Nhựa "lộp cộp" |
| — | Lọ hoa + xe cứu hỏa | 🔑 | **Ghép** trong túi | — | Xe cứu hỏa (chở lọ hoa làm bồn nước) hiện ra trên sàn, hú còi, **chạy lần lượt tới từng đám cháy và xịt tắt**: góc trái thảm → góc phải thảm → dưới mép bàn xịt ngược lên điều khiển. ~5 giây, tự chạy. Xong xe đỗ lại góc phải thảm (chạm: hú còi) | Còi "ò e", nước "xèo" |
| 3 | Điều khiển TV (đã hết cháy, hơi ám khói) | 🔑 | Chạm | Hết cháy | Nắp pin bật, **pin** vào túi | "Tách" |
| 7 | Máy bay đồ chơi (sàn phải) | 🔑 | Chạm | — | Máy bay vào túi | "Lộp cộp" |
| — | Pin + máy bay | 🔑 | **Ghép** trong túi | — | Như cũ (G10-13): máy bay bay đường cong liền qua hai mèo (Sữa khè trượt, Mun vồ trượt), móc **cây kéo** ở kệ trái, hạ cánh về chỗ đậu, kéo trên lưng | Động cơ, "vụt", "phù", "cạch" |
| — | Cây kéo (trên lưng máy bay) | 🔑 | Chạm | Máy bay đã về | Kéo vào túi | "Tách" |
| 2 | Cây kéo trên kệ trái | — | Chạm | Còn trên kệ | Tay với không tới, kệ rung. Bong bóng: hình máy bay | "Hụt" |
| 6 | Quả bóng (sàn trái) | 🔑 | Chạm | — | Bóng vào túi | "Lộp cộp" |
| — | Quả bóng → **Mun** | 🔑 | Kéo thả lên Mun | — | Như cũ (G10-14): Mun đấm sang Sữa → Sữa khè bóng về Mun → Mun đấm lên kệ phải trúng hộp súp → hộp rơi giữa bàn trà, trước lọ hoa (nếu lọ hoa đã lấy thì rơi vào chỗ trống). Bóng nảy về sàn trái | "Bốp", "phù", "bốp", "bịch" |
| — | Quả bóng → **Sữa** | — | Kéo thả lên Sữa | — | Sữa quất đuôi gạt bóng về sàn trái. Bong bóng: mặt Mun | "Bộp" |
| 1 | Hộp súp trên kệ phải | — | Chạm | Còn trên kệ | Tay với không tới. Bong bóng: hình quả bóng | "Hụt" |
| — | Hộp súp trên bàn trà | — | Chạm | — | Hộp rung. Bong bóng: hình cây kéo | "Sột" |
| — | Cây kéo → hộp súp trên bàn | 🔑 | Kéo thả | Hộp đã rơi | Như cũ (G10-14): cắt ruy băng, hộp bay nhẹ rồi hạ xuống sàn, bàn và đồ trên bàn mờ dần → **Khoảnh khắc lộ diện** | "Xoẹt", nhạc tắt |
| — | Mun / Sữa (còn mặc đồ) | — | Chạm | — | Quay sang gầm, tay người chơi bị thổi bật ra rồi trở lại | Gầm + gió "vù" |
| — | Sofa, hai gối, chậu cây, chồng sách, khối xếp hình, thảm | — | Chạm | — | **Không có gì** (chỉ là cảnh) | — |

**Luồng giải (một cách tiêu biểu, G10-21):**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–5 | (xem) | Bong bóng mặt Mun. Sữa khè quả cầu lửa, Mun đỡ, quả cầu tách 3, cháy hai góc thảm và điều khiển |
| 6–15 | Chạm điều khiển, chạm hai mèo, chạm kéo/hộp súp trên kệ | Điều khiển nóng (bong bóng xe cứu hỏa); tay bị thổi bật; tay với không tới kệ |
| 16–30 | Chạm **lọ hoa**, chạm **xe cứu hỏa**, ghép | Xe cứu hỏa chạy xịt tắt ba đám cháy |
| 31–40 | Chạm **điều khiển** lấy pin, chạm **máy bay**, ghép | Máy bay bay vòng, móc kéo, hạ cánh |
| 41–45 | Chạm **cây kéo** trên máy bay | Kéo vào túi |
| 46–60 | Chạm **bóng**, thả lên **Mun** | Chuỗi đấm, khè, đấm, hộp súp rơi xuống bàn |
| 61–70 | Thả **kéo** lên hộp súp | Hộp mở, bay nhẹ rồi hạ xuống sàn, bàn mờ dần |
| 71–88 | (xem) | Thu nhỏ, ăn chung, liếm lông 1,5 giây, tự vào màn thưởng (G10-15 → G10-17) |

**Thứ tự tự do:** nhánh **dập lửa → pin → máy bay → kéo** và nhánh **bóng → hộp súp rơi** độc lập. Chỉ bước cắt ruy băng cần cả hai.

**Chạm sai (để cười, không mất gì):**
- Thả **lọ hoa** lên một đám cháy → nước tóe ra, lửa xẹp rồi bùng lại. Bong bóng: hình xe cứu hỏa.
- Thả **xe cứu hỏa** (chưa ghép) lên đám cháy → xe phun ra vài giọt rồi hết. Bong bóng: hình lọ hoa.
- Thả bóng lên **Sữa** → Sữa quất đuôi gạt bóng về. Bong bóng: mặt Mun.
- Thả **kéo lên mèo** → con đó gầm, kéo bị thổi về túi.
- Chạm **máy bay đang bay** → máy bay lắc cánh chào, bay tiếp.

**Thang gợi ý (G10-21):**
1. *8 giây:* còn cháy: các đám lửa bùng to một nhịp, lọ hoa và xe cứu hỏa nảy nhẹ. Hết cháy, chưa có kéo: điều khiển nháy, máy bay lắc cánh. Đã có kéo, hộp súp chưa rơi: hộp súp lóe sáng mỗi lần Mun đấm, bóng nảy nhẹ. Hộp đã rơi: ruy băng lấp lánh.
2. *16 giây:* đồ cần chạm của bước đang thiếu lấp lánh.
3. *💡:* bàn chân mèo làm mẫu bước đang thiếu (ghép lọ hoa với xe cứu hỏa; ghép pin vào máy bay; thả bóng lên Mun; thả kéo lên hộp súp).

**Ghi chú cho Dev (bản khối G10-21):**
- Xóa khỏi cảnh: ô tô, xe tăng, tàu hỏa, cột đèn, hộp bánh (và mọi phản ứng của chúng). Sofa, gối, cây, chồng sách, khối xếp hình, thảm: tắt chạm hoàn toàn (không flip, không Cá khô, không rung theo nhịp).
- Quả cầu lửa: vẽ bằng code hoặc dùng tạm `l10_fire` thu tròn; quả cầu tách 3 bay vòng cung. Đám lửa nhỏ: dùng tạm `l10_fire` thu nhỏ đặt đứng, lập lòe bằng scale/alpha.
- Xe cứu hỏa ghép: dùng `l10_toy_firetruck` + lọ hoa đặt trên nóc; chạy theo đường cố định trên sàn, tia nước bằng code.
- Điều khiển: trạng thái cháy chặn chạm lấy pin; hết cháy thì như cũ.
- Máy bay, bóng, cắt ruy băng, cảnh kết: giữ code hiện tại.

**Khoảnh khắc lộ diện** | "Xoẹt", nhạc tắt |
| 8 | Gối trái trên sofa (góc trên trái, phía trên Mun) | 🎁 | Chạm | — | 5 Cá khô | "Phụp" |
| 8b | Gối phải trên sofa (góc trên phải, phía trên Sữa) | ✨ | Chạm | — | Nảy, lật mặt | "Phụp" |
| — | Sofa | ✨ | Chạm | — | Đệm lún "squash" | "Phụp" |
| — | Mun / Sữa (còn mặc đồ) | — | Chạm | — | Quay sang gầm, đôi tay bị thổi bật ra rồi trở lại | Gầm + gió "vù" |

**Đồ phụ thành phố (G10-6; không thuộc đường giải):**

> G10-6 (2026-11-02): bỏ dây sạc, bỏ bát nước + vịt. Sofa chỉ có gối. Chồng sách lên **kệ giữa** (kệ mới). Hộp bánh và **lọ hoa** đặt trên bàn trà. Thêm **đồ chơi kéo thả lên mèo** và đồ gợi thành phố trên thảm.

*Đồ đứng yên (chạm để vui, tự phản ứng theo trận đánh):*

| Đồ vật | Đóng vai | Chỗ | Loại | Chạm vào | Tự phản ứng theo trận đánh | Âm thanh |
|---|---|---|---|---|---|---|
| **Chồng sách cao** | Tòa nhà chọc trời | Trên **kệ giữa** (giữa kệ trái và kệ phải, cùng độ cao) | 🎁 | Tháp sách lắc lư, cuốn trên cùng trượt ra rồi tự đẩy về. Lần đầu: 5 Cá khô | Lắc lư mỗi lần Mun đấm | "Lạch cạch" |
| **Hộp bánh xếp tầng**, có lỗ tròn như cửa sổ | Khu chung cư | Trên bàn trà, **mép trái** (phía Mun) | ✨ | Đèn trong các "cửa sổ" bật tắt lần lượt | "Cửa sổ" nháy sáng mỗi lần Sữa khè lửa | "Tách tách" |
| **Lọ hoa** | Công viên giữa phố | Trên bàn trà, **giữa bàn, phía sau** (G10-7) | 🎁 | Hoa rung, vài cánh hoa rơi, lần đầu 5 Cá khô rơi ra từ lọ | Hoa rạp theo gió khi Sữa quất đuôi | Leng keng |
| **Chậu cây lá to** | Rừng rậm | Mép phải, sau vai Sữa, lộ một phần | ✨ | Lá rung, một con bướm bay ra lượn như trực thăng rồi đậu lại | Lá rung khi Sữa quất đuôi | Lá xào xạc |
| **Đường ray tàu hỏa đồ chơi** vòng trên thảm, có **tàu hỏa nhỏ** chạy vòng | Đường tàu thành phố | Thảm | ✨ | Tàu hú còi, chạy nhanh một vòng rồi chậm lại | Tàu khựng lại, rung nhẹ mỗi cú đấm làm rung màn hình | "Tu tu", "xình xịch" |
| **Khối xếp hình** xếp thành 2–3 tòa nhà nhỏ | Khu phố thấp tầng | Mép thảm, hai bên đường ray | ✨ | Khối trên cùng nảy lên rồi rơi về chỗ | Rung khi hai con gầm | "Cộp" |
| **Cột đèn đồ chơi** | Đèn đường | Cạnh đường ray | ✨ | Đèn bật tắt | Nháy khi Sữa khè lửa | "Tách" |

*Đồ chơi kéo thả lên mèo (chỉ để cười):*

| Đồ chơi | Đóng vai | Chỗ ban đầu | Thả lên **Mun** | Thả lên **Sữa** | Âm thanh |
|---|---|---|---|---|---|
| **Ô tô đồ chơi** | Xe cộ chạy loạn | Trên thảm | Mun đấm "bốp", ô tô bay vòng cung, rơi xuống thảm **lật ngửa**, bánh quay tít | Sữa khè "phù", ô tô bị thổi lộn mấy vòng, rơi xuống thảm **lật ngửa** | Đấm "bốp" / lửa "phù", "cạch" lúc rơi |
| **Xe tăng đồ chơi** | Xe tăng quân đội | Trên thảm | Như ô tô | Như ô tô | Như trên + "pằng" nhỏ |
| **Xe cứu hỏa đồ chơi** | Xe cứu hỏa | Trên thảm | Như ô tô | Xe cứu hỏa phun một tia nước nhỏ vào lửa Sữa trước khi bị thổi lật, Sữa hắt xì | Như trên + "xèo" |

- Đồ chơi vẽ **to hơn bản đầu khoảng 1,4 lần** cho dễ thấy, dễ kéo (G10-7). Kéo thẳng đồ chơi trong cảnh (không vào túi), vùng nhận rộng cả thân mèo. Thả trượt ra ngoài thì đồ chơi trượt về chỗ cũ.
- Đồ chơi đang **lật ngửa**: chạm thì lật lại đứng như cũ (kêu "cạch"), lại kéo được.
- Mèo đang ở nhịp nào thì chờ xong nhịp đó mới đánh đồ chơi (như bóng).
- Lúc máy bay đang bay, thả đồ chơi lên mèo thì đồ chơi trượt về chỗ cũ.
- Đồ phụ vẽ **đúng là đồ trong phòng / đồ chơi**, chỉ gợi thành phố bằng **cách đặt và tỉ lệ**, không vẽ cửa sổ nhà thật hay bảng hiệu.
- Thưởng phụ: gối, chồng sách, lọ hoa, mỗi chỗ 5 Cá khô.

**Luồng giải (một cách tiêu biểu):**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–10 | (xem) | Vòng đánh nhau, thành phố rung theo từng đòn. Bong bóng: mặt Mun |
| 11–20 | Chạm hai mèo, chạm kéo và hộp súp trên kệ | Tay bị thổi bật ra; tay với không tới kệ |
| 21–35 | Chạm **máy bay (7)** trên sàn phải, chạm **điều khiển (3)** lấy pin, ghép | Máy bay cất cánh, vòng qua đầu hai mèo (Mun vồ trượt, Sữa khè trượt), móc kéo trên kệ trái, hạ cánh về hộp đồ chơi phải |
| 36–42 | Chạm **cây kéo** trên máy bay | Kéo vào túi |
| 43–50 | Chạm **quả bóng (6)** trên sàn trái | Bóng vào túi |
| 51–60 | **Thả bóng lên Mun** | Mun đấm bóng sang Sữa, Sữa khè bóng về Mun, Mun đấm bóng lên kệ phải trúng hộp súp, hộp rơi xuống bàn trà |
| 61–70 | **Thả kéo lên hộp súp** | Cắt ruy băng, hộp mở, hộp bay nhẹ rồi hạ xuống sàn, bàn và đồ trên bàn mờ dần, hai con cúi xuống |
| 71–85 | (xem) | Hai con cùng ăn, nhỏ dần đều và xích lại gần hộp (G10-15) |
| 86–88 | (xem) | Hai mèo thật liếm lông cho nhau 1,5 giây, tự vào màn thưởng (G10-16, G10-17) |

**Thứ tự tự do:** nhánh **máy bay → kéo** và nhánh **bóng → hộp súp rơi** độc lập, làm nhánh nào trước cũng được. Chỉ bước cắt ruy băng cần cả hai.

**Chạm sai (để cười, không mất gì):**
- Thả bóng lên **Sữa** → Sữa quất đuôi gạt bóng về sàn trái. Bong bóng: mặt Mun (G10-14).
- Thả **kéo lên mèo** → con đó gầm, kéo bị thổi bay về túi.
- Thả **kéo lên hộp súp khi hộp còn trên kệ** (thả vào vùng kệ) → kéo rơi về túi, tay với không tới.
- Chạm **máy bay đang bay** → máy bay lắc cánh chào, bay tiếp.

**Thang gợi ý:**
1. *8 giây:* chưa có kéo: máy bay trên sàn phải lắc cánh, điều khiển nháy nhẹ. Đã có kéo, hộp súp chưa rơi: hộp súp trên kệ lóe sáng mỗi lần Mun đấm, hộp đồ chơi trái có quả bóng nảy nhẹ. Hộp súp đã rơi: ruy băng lấp lánh.
2. *16 giây:* đồ cần chạm của bước đang thiếu lấp lánh.
3. *💡:* bàn chân mèo làm mẫu bước đang thiếu (ghép pin vào máy bay; kéo bóng thả lên Mun, mũi tên vòng cung Mun → Sữa → Mun → hộp súp; kéo kéo thả lên hộp súp).

**Khoảnh khắc lộ diện (thu nhỏ, đã duyệt):** hai con cúi xuống hộp súp đã mở **cùng ăn**; hai con **nhỏ dần đều, liền một mạch**, khoảng 10 giây, không chia nấc, không giật (G10-15), vừa nhỏ vừa **xích lại gần hộp súp** một chút. Không cần người chơi giữ ngón tay (G10-5). Ở mỗi nấc, **mèo mặc đồ khổng lồ và mèo thật cùng thu nhỏ theo một tỉ lệ**, chồng lên nhau tại cùng điểm neo chân: **mèo mặc đồ mờ dần đi, mèo thật hiện dần lên** (chồng mờ chéo). Đồ đạc đứng yên; sau nấc cuối hai con mèo chỉ còn bằng cỡ con mèo trước cái bàn trà. Cảnh kết: **Mun và Sữa nằm sát nhau, nhắm mắt, thay nhau liếm tai và cổ cho nhau**, nhạc chuyển sang hộp nhạc dịu dàng. Mũi tên chỉ xuống trên đầu Mun.

**Kết màn (G10-16): không cần chạm mèo.** Cảnh hai mèo liếm lông cho nhau chạy **1,5 giây** rồi màn **tự kết thúc** (thắng). Bỏ mũi tên chỉ Mun và bước chạm Mun. **Bỏ cảnh bế** (G10-17): hai mèo vẫn nằm trong cảnh cho tới khi màn thưởng phủ lên. Màn kết quả hiện **cả hai đầu mèo** (Mun và Sữa) thay vì chỉ một đầu.

**Ghi chú vẽ (cho Art sau khi duyệt gameplay):**
- Nền phòng khách góc sát sàn, hai kệ treo tường; đồ to như thành phố chỉ bằng **góc nhìn và tỉ lệ**.
- Bộ đồ hóa trang vẽ **rõ là đồ vải** (đường may, mũ trùm hở mặt mèo, gai nỉ, lông áo), mèo bên trong vẫn là Sữa và Mun.
- Dáng mỗi con: Sữa (khè lửa ngang, khè bóng, ngửa cổ khè máy bay, né quất đuôi, gầm, cúi ăn); Mun (đỡ chéo tay, đấm, đấm bóng, với tay vồ máy bay, đấm ngực, cúi ăn). Thêm một dáng **liếm lông chung** của hai mèo thật.
- Máy bay đồ chơi nhựa có càng móc; cây kéo; hộp súp thưởng buộc ruy băng (đóng, mở) và ruy băng đứt.
- Lửa xanh nhạt pastel, không đỏ, không khói đen.

**Sau khi bế:** lần đầu mở mini game **Cho ăn** (Mun thích pate) và **Vuốt ve** (điểm ngọt sau tai, tránh bụng). Ảnh lưu Sổ Mèo: cảnh hai con liếm lông cho nhau. Bản đồ mở đường sang chương 2.

---

### Level 11 — Ô vuông băng dính (dời sang chương 2)

| | |
|---|---|
| Độ khó | 🟢 **Easy · 60 giây** |
| Mèo | Mun (chờ chốt: L11 thuộc chương 2, Mun đã vào quán ở L10) |
| Phòng | 1: Hiên nhà, buổi sáng |
| Dạy | không có thao tác mới |
| Bước bắt buộc | 3 (chạm gầm tủ giày, lấy băng dính, đặt băng dính) |

**Sự thật về mèo:** **dán một ô vuông bằng băng dính trên sàn, mèo sẽ tự đi tới và ngồi vào giữa**, như bị "phép thuật" hút vào. Không cần đồ ăn, không cần đồ chơi.

**Trạng thái mèo:** Mun **Lẩn tránh** dưới gầm tủ giày, chỉ thấy đôi mắt. Chạm vào: Mun lùi sâu. Khi Mun đã bò ra khỏi gầm tủ (đang đi tới ô vuông hoặc đã ngồi trong ô), Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
┌──────────────────────────────┐
│ ♥Mun ●●●●○○              ⏸  │
│  (5) HỘP THƯ   (4) CHẬU CÂY  │
│                              │
│ ┌──────────┐   ┌──────────┐  │
│ │(1) TỦ    │   │(3) GHẾ:  │  │
│ │GIÀY      │   │GĂNG TAY  │  │
│ │(1a) gầm  │   │LEN ĐEN 🎭│  │
│ └──────────┘   └──────────┘  │
│       ┌ ─ ─ ─ ─ ┐            │
│       (6) SÀN TRỐNG          │
│       └ ─ ─ ─ ─ ┘            │
│ ▬▬(2) BẬC THỀM: HỘP ĐỒ NGHỀ▬ │
├──────────────────────────────┤
│ [ ][ ][ ][ ][ ][ ]       💡  │
└──────────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1a | Gầm tủ giày | Trái | — | Chạm | Đôi mắt vàng trong bóng tối, Mun rúc sâu. Bong bóng nhân vật: hình ô vuông | "Meo" nhỏ |
| 2 | Hộp đồ nghề trên bậc thềm | Đáy | 🎒 | Chạm | Nắp mở, lấy **cuộn băng dính** | "Cạch" kim loại |
| 3 | Đôi găng tay len đen trên ghế | Phải | 🎭 | Chạm | Cuộn tròn trông như mèo, chỉ là găng tay | "Bụp" |
| 4 | Chậu cây | Trên phải | ✨ | Chạm | Bướm bay ra | — |
| 5 | Hộp thư | Trên trái | 🎁 | Chạm | 5 Cá khô rơi ra cùng một tờ giấy quảng cáo (chỉ có hình) | Nắp "cạch" |
| 6 | Sàn trống giữa hiên | Giữa | 🎯 | Đặt băng dính | Băng dính tự lăn một vòng, dán thành **ô vuông** | **"Xoẹt xoẹt"** |

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–5 | (xem) | Mun chạy vụt vào gầm tủ giày |
| 6–15 | Chạm **gầm tủ (1a)** | Đôi mắt vàng, Mun rúc sâu. Bong bóng: hình ô vuông |
| 16–30 | Chạm **hộp đồ nghề (2)** | Có cuộn băng dính |
| 31–42 | Đặt **băng dính** lên **sàn trống (6)** | Băng dính lăn, "xoẹt xoẹt", thành ô vuông |
| 43–53 | (chờ) | Mun bò ra, ngồi vào ô (xem Khoảnh khắc lộ diện) |
| 53–58 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Đặt băng dính ở chỗ khác (sát tủ giày, trên bậc thềm): băng dính bay về túi, sàn trống (6) hiện khung vuông mờ.
- Chạm Mun khi nó đang đi tới ô vuông: **thắng ngay** (Mun đã ra khỏi gầm tủ, Lộ diện).
- Chạm gầm tủ nhiều lần: Mun rúc sâu, một chiếc dép rơi ra.

**Thang gợi ý:**
1. *8 giây:* đôi mắt vàng liếc về phía bậc thềm.
2. *16 giây:* hộp đồ nghề lấp lánh; khi đã có băng dính thì sàn trống hiện **khung vuông mờ**.
3. *💡:* bàn chân mèo kéo băng dính tới sàn trống.

**Khoảnh khắc lộ diện:** ô vuông vừa dán xong, im lặng một nhịp. Đôi mắt vàng nhìn ra từ gầm tủ. Mun bò ra, đi chầm chậm tới ô vuông, **nhấc từng chân bước qua vạch băng dính** thật cẩn thận (như sợ giẫm phải), rồi **ngồi thẳng lưng ngay chính giữa ô**, đuôi cuộn gọn vào bên trong vạch. Mun ngẩng lên nhìn bạn như muốn nói "đây là chỗ của tôi".

**Chạm Mun → cảnh bế chung.** Ô vuông băng dính ở lại trên sàn.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Ô vuông băng dính màu vàng tươi, nổi rõ trên sàn gạch.
- Hoạt hình Mun bước qua vạch băng dính là điểm nhấn: chậm, cẩn trọng, từng chân một.
- Màn nghỉ, nhạc nhẹ nhàng buổi sáng.

**Thưởng:** 20 Cá khô · (♥ chờ chốt theo chương 2).

---

### Level 12 — Đồ rơi khỏi kệ (dời sang chương 2)

| | |
|---|---|
| Độ khó | 🟡 **Normal · 90 giây** |
| Mèo | Mun (chờ chốt: L12 thuộc chương 2, Mun đã vào quán ở L10) |
| Phòng | 2: Phòng đọc sách ⇄ Bếp (nhà cô Lan hàng xóm) |
| Dạy | **Cận cảnh** (chạm vào kệ để phóng to) |
| Bước bắt buộc | 5 (chạm kệ, đóng cận cảnh, nhặt cốc, mở lại cận cảnh, đặt cốc) |

**Sự thật về mèo:** thấy đồ nằm **ở mép bàn** là mèo phải **lấy chân hất xuống**, vừa hất vừa nhìn bạn.

**Trạng thái mèo:** Mun **Ẩn** sau hàng sách trên kệ. Chạm trúng chỗ Mun nấp (trong cận cảnh): sách nghiêng ra, thấy Mun một giây, rồi Mun **lủi sang sau hàng sách khác** (Lẩn tránh, thấy rõ cái bóng đen chạy dọc kệ). Mun chỉ chịu ló hẳn ra khi có đồ ở mép kệ để hất. Khi Mun đã thò cả mặt ra, Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
PHÒNG ĐỌC (bắt đầu)                  BẾP
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Mun ●●●●○○ [Bản đồ]  ⏸ │  │ ♥Mun ●●●●○○ [Bản đồ]  ⏸ │
│ ┌────────────┐ (4) ĐỒNG  │  │  (9) ẤM TRÀ   (8) HỘP    │
│ │(1) KỆ SÁCH │  HỒ QUẢ   │  │                  TRÀ     │
│ │ CAO sát    │  LẮC      │  │ ┌──────────────────────┐ │
│ │ trần       │           │  │ │(7) BÀN BẾP           │ │
│ │ ▤▤▤▤▤▤     │           │◄►│ │  CỐC NHỰA đỏ         │ │
│ │ ▤▤▤▤▤▤     │ (5) Cửa sổ│  │ └──────────────────────┘ │
│ └────────────┘           │  │                          │
│ (3) GHẾ: MŨ LEN ĐEN 🎭   │  │                          │
│   (2) CÂY BÚT dưới sàn   │  │                          │
└──────────────────────────┘  └──────────────────────────┘

CẬN CẢNH KỆ SÁCH (chạm số 1)
┌──────────────────────────┐
│                     [✕]  │ ← nút đóng, luôn ở góc này
│ ▤▤▤▤▤▤▤▤ (1a) HÀNG SÁCH  │
│ tầng trên (Mun nấp sau)  │
│ (1b) Chậu xương rồng nhỏ │
│ ──────────── (1c) MÉP KỆ │
│              TRỐNG       │
└──────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Phòng | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Kệ sách cao | Phòng đọc | 🔑 | Chạm | Mở **cận cảnh** (lần đầu: kệ nhấp nháy, không có bàn tay hướng dẫn) | "Vù" phóng to |
| 1a | Hàng sách tầng trên | Cận cảnh | — | Chạm | Sách lung lay, không thấy gì phía sau | "Lạch cạch" |
| 1b | Chậu xương rồng nhỏ | Cận cảnh | ✨ | Chạm | Nhân vật rụt tay lại | "Á!" (âm thanh) |
| 1c | Mép kệ trống | Cận cảnh | 🎯 | Đặt cốc | Cốc đứng ngay mép kệ | "Cộp" |
| 2 | Cây bút dưới sàn | Phòng đọc | — | Chạm | Cây bút vẫn còn lăn lăn (vừa bị hất xuống) | Lăn lóc |
| 3 | Mũ len đen trên ghế | Phòng đọc | 🎭 | Chạm | Cuộn tròn như mèo, chỉ là mũ | "Bụp" |
| 4 | Đồng hồ quả lắc | Phòng đọc | ✨ | Chạm | Quả lắc đung đưa mạnh | "Boong" |
| 7 | Cốc nhựa đỏ trên bàn bếp | Bếp | 🎒 | Chạm | Cốc vào túi đồ | "Tưng" |
| 8 | Hộp trà | Bếp | 🎁 | Chạm | 5 Cá khô | Nắp "cạch" |
| 9 | Ấm trà | Bếp | ✨ | Chạm | Hơi nước bốc lên | Reo khẽ |

**Đồ rơi định kỳ:** cứ khoảng 10 giây, một món nhỏ lại rơi từ kệ xuống sàn phòng đọc (cục tẩy, kẹp giấy, cây bút chì). Đây vừa là trò vui vừa là gợi ý: có ai đó trên kệ đang hất đồ.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–8 | (xem) | Mun chạy vụt vào phòng đọc, biến mất. Một cây bút rơi "cạch" từ kệ xuống |
| 9–15 | Chạm **cây bút (2)** | Bút vẫn còn lăn: có ai đó vừa hất |
| 16–30 | Chạm **kệ sách (1)** | Cận cảnh mở ra. Chạm hàng sách: lung lay, không thấy gì. Bong bóng: hình cái cốc ở mép kệ |
| 31–35 | Chạm **✕** đóng cận cảnh | Về phòng đọc |
| 36–50 | Sang bếp, chạm **cốc nhựa (7)** | Cốc vào túi |
| 51–65 | Về phòng đọc, chạm **kệ (1)**, kéo **cốc** thả lên **mép kệ (1c)** | Cốc đứng ngay mép |
| 66–80 | (chờ) | Mun ra tay (xem Khoảnh khắc lộ diện) |
| 80–85 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Đặt cốc ở chỗ khác ngoài mép kệ (giữa kệ, sàn): cốc bay về túi, mép kệ (1c) sáng lên.
- Chạm trúng chỗ Mun nấp sau hàng sách: sách nghiêng, thấy Mun một giây rồi Mun lủi sang sau hàng sách khác (Lẩn tránh). Chạm chỗ không có Mun: sách chỉ lung lay.
- Chạm Mun lúc đã thò cả mặt ra (kể cả trước khi cốc rơi): **thắng ngay**.
- Lấy cốc trước khi mở cận cảnh: được, bong bóng hình mép kệ hiện khi mở kệ.

**Thang gợi ý:**
1. *8 giây:* một món đồ nhỏ rơi từ kệ (nếu chưa tới chu kỳ rơi).
2. *16 giây:* đồ cần chạm lấp lánh (kệ, cốc trong bếp, mép kệ).
3. *💡:* bàn chân mèo làm mẫu.

**Khoảnh khắc lộ diện:** cốc vừa đặt ở mép kệ, cả phòng im lặng một nhịp. Từ khe giữa hàng sách, **một bàn chân đen thò ra**, chạm khẽ vào cốc… rụt lại… chạm lần nữa. Rồi **Mun ló cả mặt ra**, **nhìn thẳng vào người chơi một giây** (như xin phép)… và vẫn **đẩy cốc rơi**. Cốc nhựa nảy "tưng tưng" trên sàn, không vỡ. Mun thò đầu nhìn theo cái cốc, rồi nhìn bạn, rất hài lòng.

**Chạm Mun → cảnh bế chung.** Mun được nhấc từ kệ ra giữa màn hình.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- **Không có chữ:** gáy sách vẽ bằng sọc màu, không có chữ.
- Khoảnh khắc Mun nhìn người chơi trước khi đẩy cốc cần máy quay zoom nhẹ vào mặt Mun, nhạc dừng một nhịp.
- Cốc nhựa phải nhìn rõ là đồ nhựa (màu đỏ tươi, nhẹ) để người chơi không lo nó vỡ.

**Thưởng:** 30 Cá khô · (♥ chờ chốt theo chương 2).

---

### Level 13 — Gối cỏ mèo (dời sang chương 2)

| | |
|---|---|
| Độ khó | 🟡 **Normal* · 90 giây** (ngoại lệ: đuôi 9 vốn là Easy, giữ Normal vì nội dung màn) |
| Mèo | Mun (chờ chốt theo chương 2; chủ dự án dời khỏi L9 ngày 2026-11-02) |
| Phòng | 2: Vườn trước ⇄ Giàn hoa |
| Dạy | **Mèo tự chạy** (Mun tự đổi khung, không cần chạm) |
| Bước bắt buộc | 5 (vuốt lưới, lấy cỏ mèo, lấy tất, ghép, đặt gối) |

**Sự thật về mèo:** ngửi **cỏ mèo** là mèo phê, lăn lộn, nằm ngửa bụng, quên hết mọi thứ.

**Trạng thái mèo:** Mun **Lẩn tránh** (chạy khắp vườn). Chạm vào Mun đang chạy: Mun chạy ngay sang khung kia. Khi Mun đã nằm ôm gối cỏ mèo, Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
VƯỜN TRƯỚC (bắt đầu)                 GIÀN HOA
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Mun ●●●●○○ [Bản đồ🐾] ⏸│  │ ✿✿✿(9) GIÀN HOA GIẤY✿✿✿ │
│ ═(2) DÂY PHƠI: tất cũ═══ │  │      bướm bay ✨         │
│                          │  │                          │
│ (1) TƯỢNG MÈO   (5) XÍCH │  │ (7) CHẬU CỎ MÈO          │
│ ĐÁ ĐEN 🎭       ĐU       │◄►│   (7a) LƯỚI che          │
│                          │  │                          │
│ (3) BÌNH TƯỚI            │  │      ┌──────────┐        │
│                          │  │      │(8) GHẾ ĐÁ│        │
│ ░░░(4) BÃI CỎ░░░░░░░░░░  │  │      └──────────┘        │
│  ← đường chạy của Mun →  │  │  ← đường chạy của Mun →  │
└──────────────────────────┘  └──────────────────────────┘
```

**Cơ chế mèo tự chạy:**
- Mun chạy **qua lại giữa 2 khung**, cứ **5 giây** đổi khung một lần.
- Trong mỗi khung, Mun chạy vào từ một mép, dừng ở một chỗ (giữa bãi cỏ hoặc cạnh ghế đá) khoảng 2 giây, rồi chạy ra mép bên kia.
- Bản đồ mini hiện **dấu chân 🐾** ở khung Mun đang có mặt.
- **Chạm vào Mun:** Mun chạy ngay sang khung kia (không chờ đủ 5 giây).
- **Khi đã đặt gối cỏ mèo:** Mun chạy tới khung có gối thì phanh gấp và dừng hẳn.

**Đồ vật:**

| Số | Đồ vật | Phòng | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Tượng mèo đá đen | Vườn trước | 🎭 | Chạm | Y hệt Mun đang ngồi, nhưng là đá. Nhân vật gõ thử | "Cốc cốc" |
| 2 | Dây phơi | Vườn trước | 🎒 | Chạm | Lấy **chiếc tất cũ** (gợi nhớ level 2) | Kẹp phơi "tách" |
| 3 | Bình tưới | Vườn trước | 🎁 | Chạm | 5 Cá khô | Nước "róc rách" |
| 4 | Bãi cỏ | Vườn trước | 🎯 | Đặt gối cỏ mèo | Gối nằm trên cỏ, khói xanh nhạt bốc lên | "Phụp" |
| 5 | Xích đu | Vườn trước | ✨ | Chạm | Đung đưa | Kẽo kẹt |
| 7a | Lưới che chậu | Giàn hoa | 🔑 | Vuốt | Lưới gỡ ra | Sột soạt |
| 7 | Chậu cỏ mèo | Giàn hoa | 🔑 | Chạm (sau khi gỡ lưới) | Lấy **nắm cỏ mèo** | Lá xào xạc |
| 8 | Ghế đá | Giàn hoa | 🎯 | Đặt gối cỏ mèo | Như bãi cỏ | "Phụp" |
| 9 | Bướm | Giàn hoa | ✨ | Chạm | Bướm bay; nếu Mun đang ở đây, nó vồ theo | — |
| — | Mun | Cả hai | — | Chạm | Chạy ngay sang khung kia | Tiếng chân chạy |

**Ghép:** chiếc tất cũ + cỏ mèo = **gối cỏ mèo** (hình chiếc tất phồng tròn, buộc nút).

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–10 | (xem) | Mun chạy vụt qua Vườn trước sang Giàn hoa. Bản đồ mini hiện 🐾 nhảy qua lại |
| 11–25 | Có thể chạm thử Mun | Mun chạy mất. Bong bóng nhân vật: hình cỏ mèo |
| 26–45 | Sang Giàn hoa, vuốt **lưới (7a)**, chạm **chậu (7)** | Có cỏ mèo |
| 46–60 | Về Vườn trước, chạm **dây phơi (2)** | Có chiếc tất |
| 61–70 | Ghép **tất + cỏ mèo** | Gối cỏ mèo |
| 71–80 | Đặt **gối** ở **bãi cỏ (4)** (hoặc ghế đá) | Khói xanh bốc lên. Tối đa 5 giây sau Mun tới (xem Khoảnh khắc lộ diện) |
| 80–85 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Đặt cỏ mèo không ghép (cỏ rời): cỏ bị gió thổi bay về túi. Bong bóng: hình chiếc tất.
- Đuổi Mun mãi: không có gì xấu, Mun chạy qua lại vui vẻ.
- Đặt gối ở khung Mun vừa rời đi: phải chờ tối đa 5 giây, Mun quay lại.

**Thang gợi ý:**
1. *8 giây:* chậu cỏ mèo lắc lư, có mùi bốc lên (khói xanh mờ); Mun mỗi lần chạy qua giàn hoa đều quay đầu ngửi chậu.
2. *16 giây:* đồ cần chạm lấp lánh.
3. *💡:* bàn chân mèo làm mẫu.

**Khoảnh khắc lộ diện:** Mun đang chạy ngang qua thì **phanh gấp**, trượt một đoạn trên cỏ, quay lại ngửi gối cỏ mèo… mắt lim dim… rồi **lăn ra ôm gối**, lăn mấy vòng, cọ má vào gối, cuối cùng **nằm ngửa bụng**, bốn chân giơ lên trời, mắt nhắm nghiền.

**Chạm Mun → cảnh bế chung.** Gối cỏ mèo ở lại trên bãi cỏ.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Hai khung vườn cần một "đường chạy" rõ ràng cho Mun (lối mòn trên cỏ).
- Hiệu ứng "phê cỏ mèo": mắt Mun lim dim, vài ngôi sao nhỏ bay quanh đầu.
- Hiệu ứng phê cỏ mèo dùng lại được ở các màn sau có cỏ mèo.

**Thưởng:** 30 Cá khô · Mun ♥ 5/6.
