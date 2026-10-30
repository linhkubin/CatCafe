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
| 7 | 🟡 Normal | 90 | Mun | Đồ rơi khỏi kệ | Thấy đồ ở mép bàn là phải hất xuống | 5 | Cận cảnh |
| 8 | 🟡 Normal | 90 | Mun | Gối cỏ mèo | Ngửi cỏ mèo là phê, nằm ngửa bụng | 5 | Mèo tự chạy |
| 9 | 🟢 Easy | 60 | Mun | Ô vuông băng dính | Thấy ô vuông trên sàn là phải vào ngồi | 3 | — |
| 10 | 🔴 Hard | 150 | Mun | Hai mèo một hộp | Hai mèo lạ xù lông, cuối cùng chen chung một hộp | 6 | Tổng hợp |

**Tổng chương 1:** khoảng 14 phút giải đố.

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

### Level 6 — Xuống đây nào, Mun!

> **G6-1 (chủ dự án chốt 2026-10-30):** thay màn "Túi giấy sột soạt" cũ. Chủ đề **làm thân**, bối cảnh **ngoài nhà**: Mun bị chó dọa, kẹt trên mái nhà kho; cho chó xương, xếp 4 bậc đường xuống, đặt xúc xích lên bàn dụ Mun xuống ăn (G6-5: đổi từ ghế sang bàn).

| | |
|---|---|
| Độ khó | 🟡 **Normal · 90 giây** (ngoại lệ: luật chung đặt level 6 là Easy 60 giây, màn này có 8 bước; chủ dự án chốt lại sau khi chơi bản khối) |
| Mèo | Mun (♥ 2/6) |
| Phòng | 1: Sân sau nhà hàng xóm, buổi chiều. **Dùng lại nền sân sau L5** (trời, hàng rào, sân), chỉ thay đồ đạc; nhà kho là sprite riêng |
| Dạy | Kéo đồ có sẵn trong cảnh tới đúng chỗ để xếp đường (không qua túi đồ) |
| Bước bắt buộc | 8 (lấy xương, cho Lu, lấy xúc xích, 4 bậc đường xuống, đặt xúc xích lên bàn) |

**Sự thật về mèo:** mèo hoảng là leo vọt lên chỗ cao, nhưng tới lúc xuống thì run, đứng ở mép kêu meo meo mãi không dám bước. Chỉ có đồ ăn ngon mới dụ được nó xuống.

**Nhân vật phụ:** **Lu**, chó vàng to của nhà hàng xóm. Không dữ, chỉ muốn chơi: ngồi dưới mái kho vẫy đuôi sủa lên.

**Trạng thái mèo:** Mun **Lẩn tránh** trên mái kho (thấy rõ nhưng ngoài tầm tay). Chạm Mun: Mun lùi ra sau ống khói, ló lại sau 2 giây. Khi Lu còn sủa, Mun nằm rạp, tai cụp, không ra mép mái. Khi Mun **đã nhảy lên bàn** (đang ăn xúc xích), Mun **Lộ diện**: chạm là thắng.

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

A, B, C: 3 chỗ đặt, thấp dần từ mép mái xuống đất. A sát tường kho, cao nhất: thùng phuy rồi hộp dụng cụ nhỏ đậy lên (2 bước). B: thùng gỗ. C: ghế đẩu, thấp nhất, **sát cạnh bàn** để từ ghế Mun nhảy lên bàn. Tổng 4 bước xếp đường. Bàn đặt gần chân đường xuống (dời bàn nếu cần), giỏ picnic nằm **mép trái mặt bàn**, chừa chỗ trống bên phải cho xúc xích (G6-5).

**Đồ vật:**

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Mun trên mái kho | Trên phải | — | Chạm | Mun lùi ra sau ống khói, ló lại sau 2 giây | "Meo" run run |
| 2 | Lu | Giữa, dưới mái | — | Chạm | Lu vẫy đuôi sủa to hơn, Mun nằm rạp. Bong bóng nhân vật: hình khúc xương | "Gâu gâu" |
| 5 | Bụi rau (có khúc xương) | Dưới phải | 🔑 | Chạm | Lá rau rẽ ra, **khúc xương** bay vào túi đồ. Lu cứ ngoái nhìn bụi rau (gợi ý tự nhiên) | Lá xào xạc |
| 2' | Lu (nhận xương) | — | 🎯 | Kéo xương từ túi thả vào Lu | Lu ngậm xương, chạy về chuồng (6), chui hẳn vào trong, chỉ thò đầu ra cửa chuồng gặm xương vui vẻ, **thôi sủa**. Mun ngóc đầu dậy | "Gâu!" vui, rồi tiếng gặm |
| 3 | Giỏ picnic trên bàn | Giữa trái | 🔑 | Chạm | Nắp giỏ bật, **xúc xích** bay vào túi đồ | "Tách" |
| 4a | Thùng phuy nước | Dưới trái | 🔑 | Kéo tới chỗ **A** | Phuy lăn tới sát tường kho, dựng đứng. Mun ra mép nhìn xuống, thấy nước sóng sánh, lùi lại | "Lộc cộc" |
| 4b | Hộp dụng cụ nhỏ | Dưới, giữa | 🔑 | Kéo đậy lên **miệng phuy ở A** (chỉ được khi phuy đã ở A) | Hộp dụng cụ đặt khít, đậy kín miệng phuy, thành bậc đầu tiên | "Cộp" |
| 4c | Thùng gỗ | Dưới, giữa phải | 🔑 | Kéo tới chỗ **B** (bậc giữa) | Thùng đặt vào, thành bậc giữa | "Cộp" |
| 4d | Ghế đẩu | Dưới trái | 🔑 | Kéo tới chỗ **C** (bậc thấp nhất, gần đất) | Ghế đặt vào, thành bậc cuối | "Cạch" |
| 4' | Mặt bàn (chỗ trống bên phải giỏ) | Cạnh chỗ C | 🎯 | Kéo **xúc xích** từ túi thả lên bàn | Xem Khoảnh khắc lộ diện | "Pặc" |
| 6 | Chuồng Lu | Dưới phải | ✨ | Chạm (khi Lu đang gặm) | Lu lăn ra khoe bụng rồi gặm tiếp | "Ư ử" |
| 7 | Găng tay làm vườn đen trên hàng rào | Giữa trái | 🎭 | Chạm | Trông như mèo đen ngồi, hoá ra găng tay: găng rơi xuống đất dưới hàng rào và nằm yên ở đó. Lu (nếu rảnh) **chạy tới chỗ găng**, ngậm lắc lắc, vờn một lúc rồi bỏ găng tại chỗ, chạy về chỗ cũ. Lu đang gặm trong chuồng thì chỉ ngẩng đầu nhìn | "Phịch" |
| 8 | Cây + ổ chim | Trên trái | 🎁 | Chạm | Ổ chim lắc, 5 Cá khô rơi ra | Chim ríu rít |
| 9 | Chuông gió | Trên trái | ✨ | Chạm | Leng keng, Mun trên mái vểnh tai | Leng keng |
| 10 | Bình tưới | Cạnh bụi rau | 🎁 | Chạm | Bình nghiêng, nước chảy ra cùng 5 Cá khô | "Ồ ồ" |

**Luật xếp đường xuống (4 bậc):**
- Kéo đồ có sẵn trong cảnh (không qua túi đồ). Khi đang kéo một món, chỗ đặt hợp lệ hiện **viền mờ**; thả gần viền là đồ tự khớp vào, thả chỗ khác thì đồ trượt về chỗ cũ.
- Mỗi chỗ chỉ nhận đúng món hợp chiều cao: A nhận phuy (rồi hộp dụng cụ), B nhận thùng gỗ, C nhận ghế đẩu. Thả nhầm món: món trượt về chỗ cũ, lắc một nhịp.
- Thứ tự tự do, trừ hộp dụng cụ nhỏ phải đặt sau thùng phuy.
- Mỗi lần thêm một bậc, Mun bò ra mép mái nhìn xuống, run, rồi lùi vào: **Mun vẫn sợ, không tự xuống**, kể cả khi đủ 4 bậc. Chỉ xúc xích trên bàn mới dụ được.

**Luật Lu (logic chặn):**
- Khi Lu còn rảnh (chưa có xương): kéo xúc xích thả lên bàn thì Lu chồm tới hít, sủa đòi, xúc xích bay về túi. Bong bóng nhân vật: hình khúc xương. Đặt đồ xếp đường vẫn được.
- Lu đang gặm xương thì không quan tâm gì nữa.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–8 | (xem) | Lu đuổi Mun chạy **một vòng quanh sân**; hết vòng Mun nhảy lên **bàn → thùng gỗ → cột điện → mái kho** (G6-6). Lu ngồi dưới mái sủa |
| 5–15 | Chạm **Mun**, **Lu** | Mun lùi sau ống khói. Bong bóng: khúc xương |
| 15–25 | Chạm **bụi rau (5)** | Có khúc xương |
| 25–32 | Thả **xương vào Lu** | Lu về chuồng gặm, thôi sủa |
| 32–40 | Chạm **giỏ picnic (3)** | Có xúc xích |
| 40–75 | Kéo **phuy → A, hộp dụng cụ → A, thùng gỗ → B, ghế → C** | Đường xuống thành hình; mỗi bậc Mun ra mép nhìn rồi lùi |
| 75–85 | Thả **xúc xích lên bàn** | Mun xuống từng bậc, từ ghế nhảy lên bàn ăn (Lộ diện) |
| 85–90 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Đặt xúc xích lên bàn khi Lu còn rảnh: Lu chồm tới, xúc xích về túi.
- Đặt xúc xích lên bàn khi đường chưa đủ 4 bậc: Mun ra mép, kêu, không xuống được; xúc xích ở lại trên bàn, đặt nốt bậc thì Mun xuống ngay.
- Thả xúc xích chỗ khác (đất, thùng gỗ): xúc xích bay về túi, bàn lấp lánh.
- Đặt hộp dụng cụ khi phuy chưa ở A: hộp trượt về.
- Chạm Mun trên mái: Mun lùi sau ống khói (Lẩn tránh).

**Thang gợi ý:**
1. *8 giây:* Lu ngoái nhìn bụi rau (khi chưa có xương); Mun nhìn xuống chỗ còn thiếu bậc (khi đã cho xương).
2. *16 giây:* đồ cần làm tiếp lấp lánh (bụi rau → giỏ picnic → món xếp đường còn thiếu → bàn).
3. *💡:* bàn chân mèo làm mẫu bước kế tiếp.

**Khoảnh khắc lộ diện:** xúc xích vừa đặt lên bàn, mũi Mun khịt khịt. Mun bò ra mép mái, ngập ngừng… bước xuống hộp dụng cụ, **ngoái lại nhìn bạn**, xuống thùng gỗ, xuống ghế, rồi **nhún người nhảy phốc lên bàn**, ngấu nghiến xúc xích cạnh giỏ picnic. Ăn xong Mun liếm mép, ngẩng lên nhìn bạn. Lu thò đầu ra khỏi chuồng, Mun xù lông một giây rồi **nép sát vào chân bạn**: lần đầu Mun coi bạn là chỗ an toàn.

**Chạm Mun → cảnh bế chung.**

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Dùng lại nền sân sau L5 (QUY-TRINH mục 6); nhà kho gỗ mái tôn, ống khói là sprite riêng to, đặt bên phải.
- Lu: nhân vật mới, cùng phong cách bút chì pastel, tròn trịa dễ thương, không đáng sợ. Tư thế: ngồi sủa, ngậm xương chạy, nằm gặm, lăn khoe bụng, thò đầu khỏi chuồng.
- Mun cần thêm dáng: nằm rạp tai cụp trên mái, nhìn xuống mép mái run run, bước xuống bậc, nhảy lên bàn, ăn trên bàn.
- Âm Lu sủa vui, không gắt. Nhạc: căng nhẹ khi Lu sủa, chuyển ấm áp khi Mun xuống ăn.

**Thưởng:** 30 Cá khô (+5 mỗi bí mật: ổ chim, bình tưới) · Mun ♥ 2/6.

---

### Level 7 — Đồ rơi khỏi kệ

| | |
|---|---|
| Độ khó | 🟡 **Normal · 90 giây** |
| Mèo | Mun (♥ 3/6) |
| Phòng | 2: Phòng đọc sách ⇄ Bếp (nhà cô Lan hàng xóm) |
| Dạy | **Cận cảnh** (chạm vào kệ để phóng to) |
| Bước bắt buộc | 5 (chạm kệ, đóng cận cảnh, nhặt cốc, mở lại cận cảnh, đặt cốc) |

**Sự thật về mèo:** thấy đồ nằm **ở mép bàn** là mèo phải **lấy chân hất xuống**, vừa hất vừa nhìn bạn.

**Trạng thái mèo:** Mun **Ẩn** sau hàng sách trên kệ. Chạm trúng chỗ Mun nấp (trong cận cảnh): sách nghiêng ra, thấy Mun một giây, rồi Mun **lủi sang sau hàng sách khác** (Lẩn tránh, thấy rõ cái bóng đen chạy dọc kệ). Mun chỉ chịu ló hẳn ra khi có đồ ở mép kệ để hất. Khi Mun đã thò cả mặt ra, Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
PHÒNG ĐỌC (bắt đầu)                  BẾP
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Mun ●●○○○○ [Bản đồ]  ⏸ │  │ ♥Mun ●●○○○○ [Bản đồ]  ⏸ │
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

**Thưởng:** 30 Cá khô · Mun ♥ 3/6.

---

### Level 8 — Gối cỏ mèo

| | |
|---|---|
| Độ khó | 🟡 **Normal · 90 giây** |
| Mèo | Mun (♥ 4/6) |
| Phòng | 2: Vườn trước ⇄ Giàn hoa |
| Dạy | **Mèo tự chạy** (Mun tự đổi khung, không cần chạm) |
| Bước bắt buộc | 5 (vuốt lưới, lấy cỏ mèo, lấy tất, ghép, đặt gối) |

**Sự thật về mèo:** ngửi **cỏ mèo** là mèo phê, lăn lộn, nằm ngửa bụng, quên hết mọi thứ.

**Trạng thái mèo:** Mun **Lẩn tránh** (chạy khắp vườn). Chạm vào Mun đang chạy: Mun chạy ngay sang khung kia. Khi Mun đã nằm ôm gối cỏ mèo, Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
VƯỜN TRƯỚC (bắt đầu)                 GIÀN HOA
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Mun ●●●○○○ [Bản đồ🐾] ⏸│  │ ✿✿✿(9) GIÀN HOA GIẤY✿✿✿ │
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

**Thưởng:** 30 Cá khô · Mun ♥ 4/6.

---

### Level 9 — Ô vuông băng dính

| | |
|---|---|
| Độ khó | 🟢 **Easy · 60 giây** |
| Mèo | Mun (♥ 5/6) |
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

**Thưởng:** 20 Cá khô · Mun ♥ 5/6.

---

### Level 10 — Hai mèo một hộp

| | |
|---|---|
| Độ khó | 🔴 **Hard · 150 giây** |
| Mèo | Mun (♥ 6/6 → **vào quán**), có Sữa tham gia |
| Phòng | 3: Phòng khách ⇄ Phòng ngủ, Phòng khách ⇄ Bếp |
| Dạy | Tổng hợp |
| Bước bắt buộc | 6 (chạm Sữa, lắc hộp hạt, đặt hạt vào bát, chạm tủ, lấy hộp các-tông, đặt hộp) |

**Sự thật về mèo:** hai con mèo lạ gặp nhau thì **xù lông, khè nhau**. Nhưng có một thứ làm chúng quên hết: **cái hộp**, kể cả khi hộp chỉ vừa cho một con.

**Trạng thái mèo:** mèo cần tìm là **Mun**. Mun **Lẩn tránh** trong ngăn dưới tủ quần áo, chỉ thấy đôi mắt; chạm vào thì Mun lùi sâu. Sữa canh trước tủ là **chướng ngại theo logic**: khi Sữa còn canh, chạm tủ thì Sữa gầm gừ chắn lại. Chạm vào Sữa không thắng vì Sữa không phải con mèo cần tìm (bong bóng nhiệm vụ là đầu mèo tối của Mun). Khi Mun đã bò ra khỏi ngăn tủ (đang đi tới hộp hoặc đã nằm trong hộp), Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
PHÒNG KHÁCH (bắt đầu)                PHÒNG NGỦ
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Mun ●●●●●○ [Bản đồ]  ⏸ │  │ (9) GHẾ: KHĂN QUÀNG      │
│  (3) CHẬU HOA            │  │ LÔNG ĐEN 🎭              │
│ ┌────────────────────┐   │  │ ┌────────┐ ┌───────────┐ │
│ │(4) SOFA            │  ►│◄ │ │(10)    │ │(7) TỦ QUẦN│ │
│ └────────────────────┘   │  │ │GIƯỜNG  │ │ÁO, (7a)   │ │
│ (1) HỘP CÁC-TÔNG hàng    │  │ └────────┘ │ngăn dưới  │ │
│ mới giao                 │  │            └───────────┘ │
│ (2) ĐÔI BỐT ĐEN 🎭       │  │  (8) SỮA ngồi canh,      │
│          ▼ (xuống bếp)   │  │  (11) chỗ trống trước tủ │
└──────────────────────────┘  └──────────────────────────┘

BẾP
┌──────────────────────────┐
│ ┌────────────┐ (15) HŨ   │
│ │(13) KỆ:    │ BÁNH QUY  │
│ │ HỘP HẠT    │           │
│ └────────────┘           │
│     (14) BÁT CỦA SỮA     │
│          ▲ (lên phòng    │
│            khách)        │
└──────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Phòng | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Hộp các-tông hàng mới giao | Phòng khách | 🎒 | Chạm | Hộp vào túi đồ | "Sạt" |
| 2 | Đôi bốt đen | Phòng khách | 🎭 | Chạm | Chỉ là bốt, đổ "bộp" | "Bộp" |
| 3 | Chậu hoa | Phòng khách | 🎁 | Chạm | 5 Cá khô | Leng keng |
| 4 | Sofa | Phòng khách | ✨ | Chạm | Đệm nảy | "Phịch" |
| 7 | Tủ quần áo | Phòng ngủ | 🔑 | Chạm (khi Sữa đã đi) | Ngăn dưới hé mở, đôi mắt vàng của Mun, Mun rúc sâu. Bong bóng nhân vật: hình cái hộp | "Meo" run run |
| 8 | Sữa canh trước tủ | Phòng ngủ | 🔑 | Chạm | Sữa gầm gừ, đuôi xù to gấp đôi. Bong bóng nhân vật: hình bát hạt | Gầm gừ |
| 9 | Khăn quàng lông đen trên ghế | Phòng ngủ | 🎭 | Chạm | Cuộn tròn như mèo, không phải | "Bụp" |
| 10 | Giường | Phòng ngủ | ✨ | Chạm | Nệm nảy | "Phịch" |
| 11 | Chỗ trống trước tủ | Phòng ngủ | 🎯 | Đặt hộp các-tông | Hộp đặt xuống, miệng hộp hướng về tủ | "Sạt" |
| 13 | Hộp hạt trên kệ | Bếp | 🔑 | Vuốt lắc / Đặt vào bát | **Vuốt lắc:** Sữa phóng sang bếp. **Đặt vào bát (14):** hạt đổ đầy bát | **"Lạo xạo lạo xạo!"** |
| 14 | Bát của Sữa | Bếp | 🎯 | Đặt hộp hạt | Hạt đổ đầy, Sữa cắm mặt ăn | Hạt rơi lách cách |
| 15 | Hũ bánh quy | Bếp | 🎁 | Chạm | 5 Cá khô | Nắp "cộp" |

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–10 | (xem) | Mun theo nhân vật vào nhà lần đầu. Sữa phóng ra, **xù lông "khè"**! Mun hoảng sợ chạy biến vào phòng ngủ |
| 11–25 | Sang phòng ngủ, chạm **Sữa (8)** | Sữa ngồi chắn trước tủ, gầm gừ. Bong bóng: hình bát hạt |
| 26–45 | Xuống bếp, vuốt lắc **hộp hạt (13)** | "Lạo xạo!". Sữa từ phòng ngủ phóng sang bếp ngay lập tức (y như level 1), ngồi chờ bên bát |
| 46–60 | Kéo **hộp hạt** thả vào **bát (14)** | Hạt đổ đầy bát, Sữa cắm mặt ăn |
| 61–80 | Sang phòng ngủ, chạm **tủ (7)** | Ngăn dưới hé mở: đôi mắt vàng, Mun rúc sâu. Bong bóng: hình cái hộp |
| 81–100 | Về phòng khách, chạm **hộp các-tông (1)** | Hộp vào túi |
| 101–115 | Sang phòng ngủ, đặt **hộp** vào **chỗ trống trước tủ (11)** | Mun ló đầu… chui ra nằm vào hộp (xem Khoảnh khắc lộ diện) |
| 116–130 | (xem) | Sữa ăn xong quay về… chen vào hộp |
| 130–135 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- **Chỉ lắc hộp hạt mà không đổ vào bát:** Sữa chạy sang bếp, ngửi bát trống, nhìn bạn trách móc, rồi **quay lại canh tủ** sau 5 giây.
- Chạm tủ khi Sữa còn canh: Sữa gầm gừ to hơn, tủ không mở được (Mun đóng sập ngăn kéo từ bên trong).
- Lấy hộp các-tông từ đầu: được, giữ trong túi tới khi cần.
- Đặt hộp trước tủ khi Sữa còn canh: Sữa nhảy vào hộp trước (trò đùa), Mun càng không dám ra. Chạm Sữa trong hộp thì Sữa nhảy ra, quay lại canh. Cần dụ Sữa đi trước.

**Thang gợi ý:**
1. *8 giây:* Sữa liếc về phía bếp, liếm mép; khi đã dụ được Sữa, tiếng "meo" run run vọng từ tủ.
2. *16 giây:* đồ cần chạm lấp lánh; mũi tên phòng cần đến nhấp nháy.
3. *💡:* bàn chân mèo làm mẫu.

**Khoảnh khắc lộ diện (2 nhịp):**
1. **Mun ra:** hộp vừa đặt xuống, Mun ló đầu khỏi ngăn tủ, nhìn quanh không thấy Sữa, nhìn cái hộp… rồi bò ra, chui vào hộp, nằm gọn.
2. **Sữa về:** Sữa ăn xong, liếm mép đi vào phòng ngủ. Hai con nhìn nhau. Im lặng một nhịp… Sữa **không khè nữa**: nó đi tới, ngửi mũi Mun, rồi **chen vào hộp**. Hộp quá nhỏ cho hai con: chúng vặn vẹo, đè lên nhau, một con thò đầu, một con thò đuôi, hộp phình ra hai bên. Cuối cùng cả hai nằm im, thở đều. Hai cái đầu mèo, một trắng một đen, thò ra khỏi cùng một cái hộp, cùng nhìn bạn.

**Chạm Mun → cảnh bế chung.** Chỉ Mun có viền sáng. Sữa ở lại trong hộp, ngóc đầu nhìn theo. Màn hình thưởng hiện sau cảnh Mun vào quán.

**Sau khi bế (♥ 6/6, không tính giờ):**
1. Thanh ♥ của Mun đầy, sáng lên.
2. Mini game **Cho ăn** lần đầu: chọn 1 trong 3 món. Mun thích **pate**; chọn sai thì Mun ngửi rồi quay đi.
3. Mini game **Vuốt ve** lần đầu: tìm điểm ngọt **sau tai** của Mun, tránh vuốt bụng.
4. Mun và Sữa nằm chung trên bệ cửa sổ quán, khách quay lại mỉm cười.
5. Máy ảnh "tách", ảnh hai con mèo lưu vào Sổ Mèo.
6. Bản đồ mở đường sang Chương 2.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Hai con mèo cùng màn hình: cần chuyển động Sữa xù lông/khè, gầm gừ canh cửa, phóng đi khi nghe hạt, cắm mặt ăn, ngửi mũi, chen vào hộp.
- Tiếng "lạo xạo" hộp hạt là lời gọi lại tiếng "TÁCH!" của level 1: cùng một sự thật về mèo, khép vòng chương 1.
- Hộp các-tông ở cảnh cuối nên **nhỏ hơn rõ rệt** so với hai con mèo, để cảnh chen chúc buồn cười.
- Nhạc: căng thẳng nhẹ ở đầu (Sữa khè), ấm áp dần, cao trào nhẹ nhàng ở cảnh hai mèo một hộp.

**Thưởng:** 50 Cá khô · Mun vào quán.

---

## 3. Ý tưởng nháp (chưa xếp số level)

### Nháp — Về nhà thôi, Mun!

> **Nháp 2026-10-30, đang bàn, chưa chốt.** Chưa có số level, chưa giao Dev/Art. Ý từ chủ dự án: đổi góc nhìn, Mun **tự tìm đường về nhà nhân vật** giữa đêm mưa bão, người chơi dọn đường cho Mun.

| | |
|---|---|
| Mèo | Mun |
| Bối cảnh | Đêm mưa bão. 3 cảnh nối nhau: **góc hẻm** (dùng lại nền hẻm L5, thêm mưa) → **trước quán** → **nhà nhân vật** |
| Cách chơi | Đồ nằm sẵn trong cảnh; người chơi kéo đồ vào **ô sáng** (vị trí giải đố). Đặt đúng: Mun đi tiếp tới chướng ngại sau rồi ngồi chờ. Đặt sai: đồ nảy về chỗ cũ |
| Bước bắt buộc | 9 (3 mỗi cảnh) |

**Mở màn:** hẻm L5, mưa bão. Gió quật **gãy tấm bạt**, bạt sụp xuống. Mun giật mình chui **nấp dưới xe ba gác**, run. Bong bóng nghĩ: căn nhà sáng đèn của nhân vật → Mun muốn về đó.

**Cảnh 1 — Góc hẻm**
1. Bạt gãy đè sát gầm xe, Mun không ra được → **cây chổi** chống bạt lên, mở khe hở.
2. Vũng nước lớn giữa hẻm → **nắp thùng sơn** làm cầu.
3. Máng xối xả nước như thác ở đầu hẻm → **ô hỏng** che dòng nước, Mun chạy qua dưới ô.

**Cảnh 2 — Trước quán** (quán nước ven đường đã đóng cửa)
1. Biển quảng cáo đổ chắn lối, quá cao → **két nhựa** làm bậc.
2. Gió ngang thổi Mun lùi lại → dựng **bảng thực đơn gập** làm vách chắn gió.
3. Nước cống trào ngập mặt đường → chồng **2 ghế nhựa** sát tường; Mun nhảy lên ghế, lên bậu cửa sổ, đi qua.

**Cảnh 3 — Nhà nhân vật**
1. Cổng sắt đóng, khe hẹp → **thùng xốp** sát tường, Mun leo lên bờ tường.
2. Chậu cây đổ chắn bờ tường → **tấm ván** bắc từ bờ tường sang mái hiên.
3. Tới cửa sổ nhưng trong nhà không ai nghe → treo **chuông gió** vào móc. Mun khều chuông, đèn bật, nhân vật mở cửa, ôm Mun vào, quấn khăn. Hết màn.

**Còn phải chốt:**
- "Quán" là quán nước ven đường hay quán cafe mèo (quán cafe nên để dành cho L10)?
- Nhân vật chỉ xuất hiện ở cảnh cuối?
- Giữ 3 bước mỗi cảnh, hay cảnh 1 chỉ 2 bước cho mở đầu nhẹ?
- Xếp vào level mấy (L7 đang tính dùng "Gối cỏ mèo"), độ khó, số giây.
