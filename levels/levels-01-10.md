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
| 4 | 🟡 Normal | 90 | Sữa | Vòi nước nhỏ giọt | Chê bát nước, chỉ uống nước vòi, nhưng ghét nước bắn | 3–4 | Chuyển phòng |
| 5 | 🔴 Hard | 150 | Mun | Đốm sáng | Thấy đốm sáng chạy là không nhịn được | 7 | Điều khiển đốm sáng, Bản đồ mini |
| 6 | 🟢 Easy | 60 | Mun | Túi giấy sột soạt | Túi giấy rỗng là của mèo | 3 | — |
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

**Khoảnh khắc lộ diện:** sau tiếng "TÁCH!", toàn màn hình **khựng nửa giây** (mọi chuyển động dừng, một nhịp im lặng). Khung hình tiếp theo: **Sữa đã ngồi sẵn** trên thảm trước sofa, hộp mở bay dần xuống đáp cạnh Sữa (bên phải), mắt tròn xoe, nhìn chằm chằm vào pate. Không có cảnh chạy tới, không có bụi bay, như thể Sữa vẫn luôn ngồi đó. Sữa "meo" một tiếng thật dài (như trách "sao giờ mới mở") rồi cúi đầu ăn. Nhân vật trồi lên ngạc nhiên một giây.

**Chạm Sữa → cảnh bế chung.** Bàn tay hướng dẫn chỉ vào Sữa (lần duy nhất trong game có hướng dẫn cho cảnh kết).

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Tiếng "TÁCH!" là âm thanh quan trọng nhất của màn: phải giòn, rõ, giống thật. Âm (`sfx_pop_can`) và hình nổ (`fx_pop`) là đồ dùng chung, sẽ dùng lại ở level 10.
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

**Đồ ngụy trang giống mèo:** cả căn phòng rải rác **những thứ màu trắng, tròn tròn, trông y như một con mèo trắng đang cuộn tròn** (gối trắng dưới chăn, mèo nhồi bông trắng, mũ len trắng có hai quả bông như tai mèo, cuộn tất trắng, áo len trắng cuộn tròn, dép bông tai mèo). Người chơi chạm vào từng thứ, thứ nào cũng **hóa ra không phải**, nên giỏ tất (nơi Sữa thật nằm) cũng bị lẫn vào giữa những thứ đó. Mỗi đồ ngụy trang có một phản ứng buồn cười riêng để việc chạm nhầm thành niềm vui chứ không phải bực bội.

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
| 1 | Rèm cửa sổ | Trên trái | ✨ | Vuốt | Rèm kéo ra, nắng chiếu đúng vào giỏ tất (gợi ý ngầm) | Sột soạt |
| 1a | Dây buộc rèm bông trắng thò xuống **như đuôi mèo** (G2-7) | Mép rèm | 🎭 | Chạm | Dây đung đưa, rèm khẽ lay | Sột soạt |
| 2 | Mèo nhồi bông **trắng** trên kệ | Giữa trái | 🎭 | Chạm | Rơi xuống, kêu "chít", nằm ngửa, hai mắt cúc áo nhìn bạn | "Chít" |
| 3 | Tủ quần áo | Phải | ✨ | Chạm | Cánh tủ mở: chỉ thấy **quần áo gấp ngăn nắp** từng ngăn; chạm lần nữa đóng lại | Bản lề "kẹt" |
| 3a | Hộp giày trên nóc tủ: nắp hé, **hai tai mèo** thò lên (G2-7) | Trên phải | 🎭 | Chạm | Hộp bật nắp: hoá ra **mũ len tai mèo màu hồng nhạt**, mũ nảy lên rồi rơi lại vào hộp | "Cộc" |
| 4 | Chăn trên giường (có một cục phồng rõ) | Dưới trái | 🎭 | Vuốt | Chăn lật ra: **không có gì** (chỉ gối trắng, nệm trống), nhân vật nhún vai | Sột soạt |
| 5 | Gầm giường: thò ra một **"bàn chân mèo" trắng** (thật ra là góc tấm thảm lông, 4 túm lông như đệm chân; G2-7) | Đáy trái | 🎭 | Chạm | Kéo ra **tấm thảm lông trắng nhỏ**, trượt ra sàn; nhân vật gãi đầu | "Xẹt" |
| 6 | Chao đèn trần | Trên giữa | ✨ | Chạm | Đèn đung đưa, bóng đổ lắc lư | "Kẽo kẹt" |
| 7 | Giỏ tất | Dưới phải | 🔑 | Chạm ×3 | Mỗi lần một chiếc tất bay ra (xem luồng giải) | "Vèo" mỗi lần |
| 8 | Mũ len trắng có hai quả bông (như hai tai mèo) trên móc | Trên trái | 🎭 | Chạm | Mũ rơi xuống, nhân vật đội thử lên đầu, hai quả bông ve vẩy như tai mèo | "Bụp" |
| 9 | Cuộn tất trắng to, tròn như mèo con cuộn ngủ | Dưới phải, cạnh giỏ | 🎭 | Chạm | Cuộn tất bung ra thành một chiếc tất dài, lăn lông lốc ra giữa phòng | "Tưng" |
| 10 | Đôi dép bông trắng có tai mèo | Dưới trái | 🎭 | Chạm | Dép kêu "chút chít", hai cái tai dép vểnh lên rồi cụp xuống | "Chút chít" |
| 11 | Áo len trắng cuộn tròn trên ghế | Giữa phải | 🎭 | Chạm | Áo bung ra, hai tay áo rơi thõng xuống như hai chân trước | Sột soạt |

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–4 | (xem) | Nhân vật bước vào gọi, bong bóng nhiệm vụ cạnh nhân vật. Sữa không xuất hiện (O2-4), chỉ nghe tiếng ngáy rất nhỏ |
| 3–25 | Chạm đủ mọi chỗ, đặc biệt là **những thứ trắng tròn trông giống mèo**: chăn có cục phồng, mèo nhồi bông, mũ len, cuộn tất, áo len, dép bông | Thứ nào cũng hóa ra không phải mèo, mỗi thứ một phản ứng buồn cười |
| 26–29 | Chạm **giỏ tất** lần 1 | Chiếc **tất kẻ sọc** bay vèo ra theo đường cong, rơi lên **đầu giường**. Giỏ khẽ nảy |
| 30–32 | Chạm lần 2 | Chiếc **tất chấm bi** bay ra, mắc lên **vành chao đèn** (đèn đung đưa). Ảnh giỏ vơi đi (`_2`) |
| 33–35 | Chạm lần 3 | Chiếc **tất trắng to** bay ra, vắt lên **núm tủ** |
| 36–38 | Chạm lần 4 | Chiếc **tất ngôi sao** bay ra, vắt lên **lưng ghế**. Ảnh giỏ vơi tiếp (`_3`) |
| 39–41 | Chạm lần 5 | Chiếc **tất em bé** bay ra, rơi lên **kệ cạnh mèo nhồi bông** |
| 42–45 | Chạm lần 6 | Chiếc **tất dài** bay ra, vắt lên **thanh rèm**. Ảnh giỏ `_reveal`: lộ Sữa (xem Khoảnh khắc lộ diện) |
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
- **Đồ ngụy trang (2, 4, 8, 9, 10, 11)** và **chỗ thò tai/chân/đuôi giả (1a, 3a, 5; G2-7)** vẽ cùng tông trắng, cùng độ tròn, cùng kích cỡ với Sữa khi cuộn tròn, để mắt người chơi không phân biệt được ngay. Giỏ tất và mọi đồ ngụy trang đều đứng yên (G2-8 bỏ nhịp thở); manh mối công bằng là tiếng ngáy to dần và việc chạm giỏ lần nào cũng có tất bay ra.
- Đồ ngụy trang đã chạm thì giữ trạng thái sau khi chạm (mũ rơi, áo bung…), để người chơi biết mình đã thử chỗ nào.
- 6 chiếc tất bay ra (G2-8) dừng lại ở 6 chỗ trong phòng (đầu giường, vành chao đèn, núm tủ, lưng ghế, kệ cạnh mèo nhồi bông, thanh rèm) và **ở nguyên đó** cho tới hết màn (căn phòng lộn xộn dần, vui mắt).
- Âm nền: tiếng ngáy rất nhỏ, dễ thương của Sữa (`sua_sfx_snore`, lặp), to dần theo 6 nấc, mỗi chiếc tất bay ra một nấc.

**Thưởng:** 15 Cá khô · Sữa ♥ 2/4.

---

### Level 3 — Quà xịn, hộp còn xịn hơn

| | |
|---|---|
| Độ khó | Dạy chơi · **60 giây** |
| Mèo | Sữa (♥ 3/4) |
| Phòng | 1: Phòng khách, buổi chiều |
| Dạy | **Nhặt, Đặt, Ghép** (túi đồ xuất hiện lần đầu) |
| Bước bắt buộc | 5 (nhặt kéo, đặt kéo lên hộp, ghép cột cào, đặt cột cào, chạm hộp úp) |

**Sự thật về mèo:** bạn mua cho mèo một **cột cào xịn**, mèo chơi được đúng vài giây rồi bỏ đó, chui vào **cái hộp đựng nó**.

**Trạng thái mèo (thay đổi trong màn):**

| Giai đoạn | Sữa ở đâu | Chạm vào thì sao |
|---|---|---|
| 1. Trước khi có cột cào | Sau rèm, chỉ thấy bóng (**Lẩn tránh**) | Sữa **chạy vụt** sang góc rèm bên kia, có lúc chui qua gầm sofa rồi lại về rèm |
| 2. Cột cào vừa dựng | Ra khỏi rèm, vồ quả bông trên đỉnh cột cào khoảng 3 giây (**Lẩn tránh**) | Sữa giật mình **chạy vụt ra sau cột cào và biến mất ngay** (chuyển luôn sang giai đoạn 3). Không thắng |
| 3. Chơi xong | Sữa chạy vòng ra sau cột cào rồi **biến mất**: thật ra đã chui vào gầm **cái hộp đang úp** (**Ẩn**) | Chạm hộp úp: **hộp lật ngửa lên**, Sữa nằm gọn bên trong |
| 4. Hộp đã lật ngửa | Trong hộp (**Lộ diện**) | **Thắng** |

**Cơ chế hộp úp:**
- Khi kéo cắt băng dính, hai mảnh cột cào bay vào túi, **cái hộp rỗng tự lộn nhào úp xuống sàn** ("bộp").
- Trong lúc người chơi ghép và đặt cột cào, hộp úp **không nhận chạm**: chạm vào không rung, không sáng, không có âm thanh. Hộp chỉ là một vật nằm im trong cảnh.
- Chỉ sau khi Sữa chơi xong và biến mất, hộp úp mới **nhận chạm**.

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
| 2 | Cây kéo trên bàn | Giữa trái | 🎒 | Chạm | Kéo bay xuống **túi đồ** | "Vút" + "tách" vào túi |
| 3 | Hộp quà dán băng dính chữ thập | Giữa | 🎯 | Chạm / Đặt kéo | **Chạm:** hộp rung, băng dính chắc quá. **Đặt kéo:** kéo tự cắt "xoẹt", nắp bung, **thân cột cào** và **đế cột cào** bay vào túi, **hộp rỗng lộn nhào úp xuống sàn** | "Xoẹt" + giấy xé + "bộp" |
| 3' | Hộp úp | Giữa | 🔑 | Chạm | **Trước khi Sữa biến mất:** không nhận chạm. **Sau khi Sữa biến mất:** hộp **lật ngửa lên**, Sữa nằm gọn bên trong | "Bộp" + "meo?" |
| 4 | Gối lông trắng | Phải | 🎭 | Chạm | Chỉ là gối | "Bụp" |
| 5 | Lọ hoa trên kệ | Trên phải | 🎁 | Chạm | Lọ nghiêng, 10 Cá khô rơi ra | Leng keng |
| 6 | Thảm trống cạnh hộp | Dưới phải | 🎯 | Đặt cột cào | Cột cào dựng lên, quả bông đung đưa trên đỉnh | "Cộp" |
| 6' | Cột cào (sau khi Sữa biến mất) | Dưới phải | ✨ | Chạm | Quả bông đung đưa, không có ai vồ | "Bông bông" |

**Ghép:** thân cột cào + đế cột cào = **cột cào mèo**.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–8 | (xem) | Shipper đặt hộp quà xuống rồi đi. Sữa chạy vụt ra sau rèm. Bong bóng nhân vật: hình cái kéo |
| 9–18 | Chạm **cây kéo (2)** | **Túi đồ trượt lên từ đáy màn hình** (lần đầu). Bàn tay hướng dẫn chỉ kéo. Kéo bay vào ô đầu tiên |
| 19–26 | Kéo **kéo** từ túi thả lên **hộp quà (3)** | Bàn tay hướng dẫn làm mẫu kéo-thả. "Xoẹt", hai mảnh cột cào vào túi, hộp rỗng lộn nhào **úp xuống sàn** |
| 27–36 | Kéo **thân** thả lên **đế** trong túi | Bàn tay hướng dẫn làm mẫu. Hai mảnh xoay vào nhau, lóe sáng, thành cột cào |
| 37–44 | Kéo **cột cào** thả lên **thảm (6)** | Cột cào dựng lên, quả bông đung đưa |
| 45–50 | (xem) | Sữa ló đầu khỏi rèm, chạy tới **vồ quả bông** hai ba cái… rồi chạy vòng ra sau cột cào và **biến mất** |
| 51–56 | Chạm **hộp úp (3')** | Hộp **lật ngửa lên**: Sữa nằm gọn bên trong (xem Khoảnh khắc lộ diện) |
| 57–60 | Chạm **Sữa** trong hộp | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Thả kéo vào chỗ khác (sàn, sofa): kéo lắc lắc rồi bay về túi.
- Ghép sai (thân lên kéo): hai món chạm nhau, nảy ra, về chỗ cũ.
- Đặt cột cào ở chỗ khác ngoài thảm (6): cột cào bay về túi, thảm (6) sáng lên.
- Chạm hộp úp trong lúc đang ghép, đặt cột cào: không có phản ứng gì (hộp chưa nhận chạm).
- Vuốt hoặc chạm rèm nhiều lần: Sữa chạy qua lại giữa hai góc rèm và gầm sofa, có lúc thò đầu ra lè lưỡi. Chạm vào lúc thò đầu thì Sữa lại chạy vụt đi (vẫn là Lẩn tránh).
- Chạm Sữa lúc đang vồ quả bông (giai đoạn 2): Sữa giật mình **chạy vụt ra sau cột cào và biến mất** ngay lập tức. Muốn thắng vẫn phải **lật hộp úp**. Đây là ngoại lệ có chủ ý: ở màn này, chỉ có cách tìm Sữa trong hộp.
- Sau khi Sữa biến mất, chạm cột cào hoặc rèm: không có ai, quả bông đung đưa vô ích.

**Thang gợi ý:**
1. *8 giây:* bước hiện tại rung nhẹ (kéo trên bàn, băng dính trên hộp, hai ô trong túi, hoặc thảm). Sau khi Sữa biến mất: **mép hộp úp khẽ nhấc lên**, một cái đuôi trắng thò ra rồi rụt vào.
2. *16 giây:* đồ cần chạm lấp lánh (hộp úp lấp lánh khi tới lượt nó).
3. *💡:* bàn chân mèo làm mẫu thao tác đúng (chạm vào hộp úp ở cuối màn).

**Khoảnh khắc lộ diện:**
1. Cột cào vừa dựng xong, quả bông đung đưa. Sữa ló đầu khỏi rèm, mắt sáng lên, chạy tới, **vồ quả bông** hai ba cái, cào thử thân cột cào một nhát.
2. Rồi Sữa **mất hứng**, chạy vòng ra sau cột cào… và không thấy đâu nữa. Quả bông vẫn đung đưa. Nhân vật nhìn quanh, gãi đầu.
3. Người chơi chạm vào hộp úp: hộp **lật ngửa lên** "bộp". Sữa **nằm gọn trong hộp**, chỉ thò đầu và hai tai, đuôi vắt qua mép hộp ve vẩy, nhìn lên bạn như thể nó vẫn luôn ở đó. Nhân vật đứng cạnh cột cào xịn, mặt buồn hiu.

**Chạm Sữa → cảnh bế chung.** Cái hộp ở lại cảnh nền, cạnh cột cào.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- **Túi đồ** xuất hiện lần đầu với hiệu ứng trượt lên từ đáy, kèm âm thanh "tưng".
- Cột cào vẽ thật **xịn**: nhiều tầng, có lông mềm, quả bông đỏ. Càng xịn thì trò đùa càng buồn cười.
- Hiệu ứng ghép (xoay vào nhau, lóe sáng) là hiệu ứng chuẩn, dùng chung cho mọi lần ghép trong game.
- Cảnh Sữa "biến mất" không cần hiệu ứng phép thuật: Sữa chỉ chạy khuất sau cột cào. Ngay lúc đó **mép hộp úp nhấc lên một chút rồi hạ xuống** rất nhẹ, người tinh mắt sẽ thấy.
- Hộp úp lúc chưa nhận chạm: vẽ bình thường, không viền sáng, không rung. Lúc đã nhận chạm: thỉnh thoảng nhích nhẹ như có gì bên trong.

**Thưởng:** 20 Cá khô · Sữa ♥ 3/4.

---

### Level 4 — Vòi nước nhỏ giọt

| | |
|---|---|
| Độ khó | 🟡 **Normal · 90 giây** |
| Mèo | Sữa (♥ 4/4 → **vào quán**) |
| Phòng | 2: Nhà tắm ⇄ Bếp |
| Dạy | **Chuyển phòng** (mũi tên ở mép màn hình) |
| Bước bắt buộc | 3–4 (mở tủ bếp, vặn van, vặn vòi; người vặn quá tay cần thêm một lần vặn nhỏ lại) |

**Sự thật về mèo:** nhiều con mèo chê bát nước, chỉ thích **uống nước chảy từ vòi**. Nhưng mèo cũng **ghét nước bắn tung tóe**. Vòi phải chảy **nhỏ giọt** thì mèo mới chịu xuống.

**Trạng thái mèo:** Sữa **Lẩn tránh** trên cao. Chạm vào đuôi Sữa trên nóc tủ gương: Sữa **nhảy vụt sang nóc giá khăn**; chạm lần nữa thì nhảy về nóc tủ gương. Sữa chỉ chịu xuống khi vòi chảy nhỏ giọt. Khi Sữa đã nhảy xuống bồn rửa, Sữa **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
NHÀ TẮM (bắt đầu)                    BẾP
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Sữa ●●●○  [Bản đồ]   ⏸ │  │ ♥Sữa ●●●○  [Bản đồ]   ⏸ │
│ ┌────────────┐ (3) GIÁ   │  │  (9) HŨ     ┌──────────┐ │
│ │(1) TỦ GƯƠNG│  KHĂN     │  │  BÁNH QUY   │ Cửa sổ   │ │
│ │ đuôi trắng │  trắng 🎭 │  │             └──────────┘ │
│ │ trên nóc ~ │           │  │ ┌──────────────────────┐ │
│ └────────────┘           │  │ │(6) BỒN RỬA BÁT       │ │
│ ┌────────────┐           │◄►│ ├──────────────────────┤ │
│ │(2) BỒN RỬA │           │  │ │(7) TỦ DƯỚI BỒN       │ │
│ │ (2a) VÒI   │           │  │ │   (7a) VAN ĐỎ        │ │
│ └────────────┘           │  │ └──────────────────────┘ │
│ ┌──────────────────────┐ │  │  (8) BÁT NƯỚC của Sữa    │
│ │(4) BỒN TẮM, vịt cao su│ │  │                          │
│ └──────────────────────┘ │  │                          │
└──────────────────────────┘  └──────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Phòng | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Đuôi Sữa trên nóc tủ gương | Nhà tắm | — | Chạm | Sữa **nhảy vụt sang nóc giá khăn** (Lẩn tránh); chạm lần nữa thì nhảy về nóc tủ gương | "Meo!" |
| 2a | Vòi rửa mặt | Nhà tắm | 🔑 | Vuốt xoay | 3 trạng thái, xem bảng dưới | Xem bảng dưới |
| 3 | Khăn tắm trắng cuộn tròn | Nhà tắm | 🎭 | Chạm | Trông như mèo trắng nằm cuộn, chạm thì khăn rơi xuống sàn | "Phịch" |
| 4 | Bồn tắm, vịt cao su | Nhà tắm | ✨ | Chạm | Vịt cao su kêu, xoay một vòng | "Chít chít" |
| 6 | Bồn rửa bát | Bếp | ✨ | Chạm | Vòi bếp nhỏ một giọt | "Tách" |
| 7 | Tủ dưới bồn rửa | Bếp | 🔑 | Chạm | Cánh tủ mở, lộ **van đỏ** | Bản lề "kẹt" |
| 7a | Van đỏ | Bếp | 🔑 | Vuốt xoay | Van xoay, nước chạy rì rầm trong ống | "Rì rầm" dọc ống |
| 8 | Bát nước của Sữa (đầy) | Bếp | ✨ | Chạm | Mặt nước gợn sóng. Sữa chưa từng uống bát này | "Bõm" |
| 9 | Hũ bánh quy | Bếp | 🎁 | Chạm | 10 Cá khô | Nắp hũ "cộp" |

**Ba trạng thái của vòi rửa mặt (2a):**

| Trạng thái | Cách vào | Hình | Sữa phản ứng |
|---|---|---|---|
| **Tắt / không có nước** | Lúc đầu, khi van chưa mở | Vòi khô | Không gì |
| **Xối mạnh** | Vuốt xoay vòi **dài** (cách vặn tự nhiên của hầu hết người chơi), khi van đã mở | Nước xối ào ào, bắn tung tóe ra ngoài bồn | **Giật mình rụt mất** sau nóc tủ, chỉ còn chóp tai |
| **Nhỏ giọt** | Vuốt xoay **ngắn, nhẹ** từ trạng thái tắt, hoặc vuốt ngược (vặn nhỏ lại) từ trạng thái xối | "Tách… tách…" đều đặn | Tai dựng lên, nhảy xuống uống |

Vuốt ngược thêm lần nữa khi đang nhỏ giọt: vòi tắt. Người chơi khéo tay vặn nhẹ ngay từ đầu thì ra nhỏ giọt luôn, bỏ qua được cảnh xối (không bị ép phải đi qua trạng thái xối).

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–8 | (xem) | Sữa chạy vụt vào nhà tắm, nhảy lên nóc tủ gương. Chỉ thấy đuôi trắng ve vẩy |
| 9–15 | Vuốt **vòi (2a)** | Vòi khô, "khục khục". Bong bóng nhân vật: hình cái van đỏ |
| 16–30 | Chạm **mũi tên ◄** | Mũi tên nhấp nháy, có bàn tay hướng dẫn (lần đầu chuyển phòng). Sang bếp. Bản đồ mini xuất hiện ở góc trên |
| 31–40 | Chạm **tủ dưới bồn (7)** | Cánh tủ mở, thấy van đỏ |
| 41–50 | Vuốt xoay **van (7a)** | Tiếng nước chạy rì rầm dọc đường ống, đi về phía nhà tắm |
| 51–60 | Về nhà tắm, vuốt **vòi (2a)** | **Nước xối ào ào**, bắn tung tóe. Sữa giật mình rụt mất. Bong bóng: hình giọt nước nhỏ |
| 61–80 | Vuốt **ngược** vòi | "Tách… tách…". Sữa xuất hiện (xem Khoảnh khắc lộ diện) |
| 80–85 | Chạm **Sữa** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Sang bếp trước khi chạm vòi: được, người chơi tự khám phá; bong bóng hình van hiện khi chạm vòi lúc sau.
- Chạm khăn tắm (đánh lừa) khi đang tìm: khăn rơi, nhân vật nhặt lên treo lại (lần 2 thì để nguyên dưới sàn).
- Để vòi xối lâu: nước bắn lên gương, gương mờ hơi nước, Sữa thò chân che mặt.
- Vặn vòi tắt hẳn khi Sữa đang uống: không xảy ra, vì Sữa xuất hiện là vòi khóa lại ở trạng thái nhỏ giọt.

**Thang gợi ý:**
1. *8 giây:* khi chưa mở van, ống nước dưới bồn rửa mặt rung nhẹ, có hình mũi tên chỉ về phía bếp; khi vòi đang xối, Sữa thò chân che mặt.
2. *16 giây:* đồ cần chạm lấp lánh (mũi tên, tủ bếp, van, hoặc vòi kèm mũi tên xoay ngược chiều).
3. *💡:* bàn chân mèo làm mẫu thao tác.

**Khoảnh khắc lộ diện:** nghe "tách… tách…", hai tai trắng dựng lên từ sau nóc tủ gương. Sữa thò đầu nhìn xuống, chờ vài giọt để chắc chắn nước không bắn nữa, rồi **nhảy xuống bồn rửa**. Nó nghiêng đầu, **thè lưỡi đớp từng giọt** theo kiểu mèo: có giọt rơi trúng mũi, Sữa lắc đầu, rồi lại uống tiếp. Uống xong, mặt ướt lấm tấm, Sữa ngồi trong bồn liếm mép, nhìn bạn như muốn nói "từ giờ cứ mở vòi như thế nhé".

**Chạm Sữa → cảnh bế chung.** Màn hình thưởng hiện sau cảnh Sữa vào quán.

**Sau khi bế (♥ 4/4, không tính giờ):**
1. Thanh ♥ của Sữa đầy, sáng lên, tiếng chuông nhỏ.
2. Mini game **Tắm** lần đầu (Sữa đang ướt sẵn, hợp lý): xoa xà phòng → xả vòi sen → lau khăn, tránh vùng mặt.
3. Căn phòng trống tầng một được dọn ra, treo **biển gỗ vẽ hình chén cafe và mặt mèo**.
4. Sữa nhảy lên bệ cửa sổ quán nằm phơi nắng.
5. Hướng dẫn quán: phục vụ 3 khách đầu tiên.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Nước xối cần hiệu ứng hạt nước bắn ra ngoài bồn và đọng trên gương.
- Tiếng "rì rầm" khi mở van nên chạy **từ bếp sang nhà tắm** (âm thanh định hướng) để gợi ý người chơi quay lại nhà tắm.
- Bản đồ mini xuất hiện lần đầu ở màn này, chỉ có 2 ô.

**Thưởng:** 30 Cá khô · mở khóa Quán Cafe.

---

### Level 5 — Đốm sáng

| | |
|---|---|
| Độ khó | 🔴 **Hard · 150 giây** |
| Mèo | **Mun** (♥ 1/6), lần đầu xuất hiện |
| Phòng | 2: Sân sau ⇄ Con hẻm, buổi chiều |
| Dạy | Điều khiển đốm sáng (vuốt giữ và kéo), Mèo nhút nhát |
| Bước bắt buộc | 7 |

**Sự thật về mèo:** mèo nào thấy **đốm sáng chạy trên tường** cũng không nhịn được, kể cả con nhút nhát nhất.

**Trạng thái mèo:** Mun **Lẩn tránh** (nhút nhát) dưới gầm xe, chỉ thấy đôi mắt vàng ở sâu trong bóng tối. Chạm vào: Mun lùi sâu, đôi mắt biến mất một lúc rồi hiện lại. Bàn chân thò ra vồ đốm sáng cũng vậy: chạm thì rụt lại. Khi Mun **đã ra khỏi gầm xe** (đang đuổi đốm sáng hoặc ngồi đè đốm sáng), Mun **Lộ diện**: chạm lúc nào cũng thắng.

**Bố cục màn hình:**

```
SÂN SAU (bắt đầu)                    CON HẺM
┌──────────────────────────┐  ┌──────────────────────────┐
│ ♥Mun ○○○○○○ [Bản đồ]  ⏸ │  │ ═(10) DÂY ĐIỆN, QUẠ 🎭═  │
│ ┌──────────┐             │  │ ▓▓(6) TẤM BẠT MÁI HIÊN▓▓ │
│ │(4) CỬA SỔ│  (2) BÀN    │  │ ┌──────────────────────┐ │
│ │QUÁN: Sữa │  TRANG ĐIỂM │  │ │(7) BỨC TƯỜNG đối diện│ │
│ │ nhìn ra  │  (2a) gương │  │ │  (đốm sáng hiện ở đây)│ │
│ └──────────┘             │◄►│ └──────────────────────┘ │
│                          │  │ (9) chỗ vệt nắng rơi     │
│ (3) TÚI RÁC ĐEN 🎭       │  │     (sau khi kéo bạt)    │
│                          │  │ ┌─────────────┐          │
│ (1) THÙNG GIẤY CŨ        │  │ │(8) XE BA GÁC│ (11) ỐNG │
│                          │  │ └──┬───────┬──┘  THOÁT   │
│                          │  │  (8a) GẦM XE      NƯỚC   │
└──────────────────────────┘  └──────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Phòng | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Thùng giấy cũ | Sân sau | 🔑 | Chạm | Bóng đen vụt chạy ra hẻm. Bong bóng nhiệm vụ nảy mạnh hơn bình thường (sắp gặp mèo mới) | Tiếng chân chạy lạch xạch |
| 2a | Gương nhỏ trên bàn trang điểm | Sân sau | 🎒 | Chạm | Gương vào túi đồ, lóe một tia sáng khi bay | "Kính coong" |
| 3 | Túi rác đen tròn | Sân sau | 🎭 | Chạm | Trông như mèo đen cuộn tròn, chỉ là túi rác. Nhân vật bịt mũi | "Sột soạt" |
| 4 | Cửa sổ quán | Sân sau | ✨ | Chạm | Sữa áp mặt vào kính, tò mò nhìn ra hẻm | "Meo?" (giọng Sữa) |
| 6 | Tấm bạt mái hiên | Hẻm | 🔑 | Vuốt lên | Bạt cuộn lên, **vệt nắng** chiếu xuống chỗ (9) | Bạt "phành phạch" |
| 7 | Bức tường đối diện | Hẻm | — | — | Nơi đốm sáng xuất hiện | — |
| 8a | Gầm xe ba gác | Hẻm | 🔑 | Chạm | Đôi mắt vàng, Mun rúc sâu hơn. Bong bóng nhân vật: hình đốm sáng | "Khè" rất nhỏ |
| 9 | Vệt nắng | Hẻm | 🎯 | Đặt gương | Gương lóe, **đốm sáng** hiện trên tường (7) | "Ting" |
| 9a | Đốm sáng | Hẻm | 🔑 | Vuốt giữ và kéo | Đốm sáng chạy theo ngón tay (xem cơ chế) | Tiếng "vù" nhỏ khi di chuyển |
| 10 | Con quạ trên dây điện | Hẻm | 🎭 | Chạm | Bóng đen hóa ra là quạ, bay đi rồi đậu lại | "Quạ!" |
| 11 | Ống thoát nước | Hẻm | 🎁 | Chạm | 10 Cá khô | Leng keng |

**Cơ chế đốm sáng:**
- Đốm sáng chỉ di chuyển trong vùng **bức tường (7) và mặt đất của hẻm**.
- Đốm sáng **ở xa gầm xe**: Mun không phản ứng.
- Đốm sáng **sát gầm xe, di chuyển chậm**: một **bàn chân đen thò ra vồ hụt**.
- Đốm sáng **ra giữa hẻm, lượn qua lại chậm ít nhất 2 giây**: **Mun phóng ra đuổi**, vồ trúng.
- Kéo **quá nhanh**: Mun chỉ đảo mắt theo, không động đậy. Đốm sáng nháy nhẹ hai lần (gợi ý kéo chậm lại).

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–10 | Chạm **thùng giấy (1)** | Bóng đen vụt chạy ra hẻm. Bong bóng nhiệm vụ nảy mạnh |
| 11–20 | Chạm **mũi tên ►** sang hẻm | Bản đồ mini nhấp nháy ô Hẻm |
| 21–35 | Chạm **gầm xe (8a)** | Đôi mắt vàng, Mun rúc sâu. Bong bóng: hình đốm sáng. Hẻm đang trong bóng râm |
| 36–60 | Về sân sau, chạm **gương (2a)** | Gương vào túi |
| 61–80 | Sang hẻm, vuốt **tấm bạt (6)** | Bạt cuộn lên, vệt nắng chiếu xuống |
| 81–90 | Đặt **gương** vào **vệt nắng (9)** | Đốm sáng hiện trên tường |
| 91–110 | Vuốt kéo **đốm sáng** xuống đất, sát gầm xe | Bàn chân đen thò ra vồ hụt |
| 111–135 | Kéo đốm sáng ra giữa hẻm, lượn chậm | **Mun phóng ra đuổi, vồ trúng.** Lộ diện |
| 135–140 | Chạm **Mun** | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Đặt gương khi chưa kéo bạt: chỗ (9) không có nắng, gương không lóe, bạt (6) lấp lánh.
- Chạm bàn chân Mun khi nó đang rình đốm sáng: Mun rụt lại (Lẩn tránh), chỉ cần kéo đốm sáng lại.
- Chạm Mun lúc đang đuổi đốm sáng giữa hẻm: **thắng ngay**, không cần đợi Mun vồ trúng.
- Lấy gương trước khi gặp Mun: được, bong bóng hình đốm sáng sẽ hiện khi chạm gầm xe.
- Chạm túi rác hoặc quạ: phản ứng vui, không ảnh hưởng.

**Thang gợi ý:**
1. *8 giây:* đôi mắt vàng chớp chớp dưới gầm xe; khi đã có đốm sáng, đốm sáng tự nhấp nháy.
2. *16 giây:* đồ cần chạm lấp lánh (thùng giấy, mũi tên, gương, bạt, vệt nắng); nếu đang kéo đốm sáng thì một đường chấm mờ hiện ra, chỉ từ đốm sáng tới gầm xe rồi ra giữa hẻm.
3. *💡:* bàn chân mèo làm mẫu: kéo đốm sáng chậm rãi theo đường chấm.

**Khoảnh khắc lộ diện:** Mun phóng vọt ra khỏi gầm xe, lần đầu người chơi thấy rõ cả con: **mèo đen tuyền, mắt vàng to**. Nó đuổi đốm sáng hai vòng, rồi **đè hai chân trước lên đốm sáng**. Nhấc chân lên xem: đốm sáng lại hiện ngay trên lưng chân nó. Mun ngơ ngác, nhìn chân, nhìn bạn.

**Chạm Mun → cảnh bế chung.** Lần đầu thấy cảnh bế với lông đen, mắt vàng.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Mun xuất hiện lần đầu: cần thiết kế nhân vật rõ ràng (mèo đen tuyền, mắt vàng, tai hơi to, đuôi dài).
- Sữa có một cameo ở cửa sổ quán (nhắc người chơi rằng Sữa đã ở quán).
- Đốm sáng: tròn, trắng vàng, có quầng sáng mờ, nhảy nhót nhẹ khi đứng yên.
- Nhạc nền: hơi bí ẩn ở đầu màn, chuyển sang vui nhộn khi Mun bắt đầu đuổi đốm sáng.

**Thưởng:** 50 Cá khô · Mun ♥ 1/6.

---

### Level 6 — Túi giấy sột soạt

| | |
|---|---|
| Độ khó | 🟢 **Easy · 60 giây** |
| Mèo | Mun (♥ 2/6) |
| Phòng | 1: Sân trước nhà, buổi sáng |
| Dạy | không có thao tác mới (màn nghỉ sau màn Hard) |
| Bước bắt buộc | 3 (chạm túi bánh mì, vuốt túi xuống sân, vuốt tạo tiếng sột soạt) |

**Sự thật về mèo:** túi giấy rỗng là **của mèo**. Đặt xuống sàn chưa được một giây là mèo đã chui vào, và tiếng sột soạt làm mèo mê mẩn.

**Trạng thái mèo:** Mun **Lẩn tránh** trong bụi hoa, chỉ thấy đôi mắt. Chạm vào: Mun lùi sâu, lá rung. Khi Mun đã chui vào túi giấy (kể cả lúc túi đang chạy lạch bạch), Mun **Lộ diện**: chạm là thắng.

**Bố cục màn hình:**

```
┌──────────────────────────────┐
│ ♥Mun ●○○○○○              ⏸  │
│  (4) CHUÔNG GIÓ   (6) Cổng   │
│                              │
│ ┌────────────┐               │
│ │(1) BỤI HOA │   ┌────────┐  │
│ │ đôi mắt    │   │(2) GHẾ │  │
│ │ vàng ẩn    │   │(2a) TÚI│  │
│ └────────────┘   │BÁNH MÌ │  │
│                  └────────┘  │
│ (3) ỦNG ĐEN 🎭               │
│ ░░░░(5) SÂN GẠCH░░░░░░░░░░░  │
├──────────────────────────────┤
│ [ ][ ][ ][ ][ ][ ]       💡  │
└──────────────────────────────┘
```

**Đồ vật:**

| Số | Đồ vật | Vị trí | Loại | Thao tác | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| 1 | Bụi hoa | Giữa trái | — | Chạm | Lá rung, đôi mắt vàng lùi sâu. Bong bóng nhân vật: hình túi giấy | Lá xào xạc |
| 2a | Túi bánh mì trên ghế | Giữa phải | 🔑 | Chạm | Ổ bánh mì bay vào túi đồ, **túi giấy rỗng** còn lại trên ghế | "Sột" |
| 2a' | Túi giấy rỗng | Trên ghế | 🔑 | Vuốt xuống | Túi rơi xuống sân, **tự nằm nghiêng**, miệng túi hướng về bụi hoa | "Bộp" giấy |
| 5 | Túi giấy trên sân | Sân | 🔑 | Vuốt qua lại | "Sột soạt, sột soạt". Lần 2 thì Mun lao ra | **"Sột soạt"** to rõ |
| 3 | Ủng đen | Dưới trái | 🎭 | Chạm | Trông như mèo đen ngồi, ủng đổ, ếch nhảy ra | "Ộp" |
| 4 | Chuông gió | Trên trái | ✨ | Chạm | Leng keng, Mun trong bụi hoa vẫy tai | Leng keng |
| 6 | Cổng | Trên phải | ✨ | Chạm | Cổng kẽo kẹt mở ra rồi đóng | Kẽo kẹt |

Ổ bánh mì trong túi đồ không dùng để giải đố. Nếu người chơi đặt bánh mì xuống sân, một chú chim sẻ sà xuống mổ (trang trí).

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–5 | (xem) | Mun chạy vụt vào bụi hoa |
| 6–15 | Chạm **bụi hoa (1)** | Đôi mắt vàng lùi sâu. Bong bóng: hình túi giấy |
| 16–28 | Chạm **túi bánh mì (2a)** | Bánh mì vào túi đồ, túi giấy rỗng còn trên ghế |
| 29–38 | Vuốt **túi giấy** xuống | Túi rơi xuống sân, nằm nghiêng |
| 39–50 | Vuốt qua lại trên **túi giấy** | "Sột soạt". Mun lao ra (xem Khoảnh khắc lộ diện) |
| 50–55 | Chạm **Mun** (đầu thò ra khỏi túi) | Cảnh bế chung |

**Chạm sai và làm khác thứ tự:**
- Chạm túi giấy trên sân (thay vì vuốt): túi kêu "sột" một tiếng nhỏ, đôi mắt vàng ló ra rồi lại thụt vào; vuốt qua lại mới đủ.
- Chạm bụi hoa nhiều lần: Mun rúc sâu hơn, lần 3 một bông hoa rơi lên đầu nhân vật.
- Đặt bánh mì xuống sân: chim sẻ sà xuống mổ, không ảnh hưởng.

**Thang gợi ý:**
1. *8 giây:* đôi mắt vàng trong bụi hoa liếc về phía túi bánh mì.
2. *16 giây:* túi bánh mì (hoặc túi giấy trên sân) lấp lánh.
3. *💡:* bàn chân mèo làm mẫu: vuốt qua lại trên túi giấy.

**Khoảnh khắc lộ diện:** sau tiếng "sột soạt" thứ hai, đôi mắt vàng mở to trong bụi hoa. Mun **phóng vụt** như mũi tên, chui tọt vào túi giấy. Túi giấy **tự chạy lạch bạch** quanh sân hai vòng: chỉ thấy bốn cái chân đen và cái đuôi thò ra, va nhẹ vào ghế, rồi dừng lại. Mun thò đầu ra khỏi miệng túi, đôi mắt vàng nhìn bạn, không thèm chui ra.

**Chạm Mun (đầu thò ra khỏi túi) → cảnh bế chung.** Túi giấy tuột khỏi người Mun, ở lại trên sân.

**Ghi chú vẽ, hoạt hình, âm thanh:**
- Hoạt hình túi giấy chạy lạch bạch là điểm nhấn: túi phồng xẹp theo bước chân, hơi nghiêng khi rẽ.
- Âm "sột soạt" phải rõ và có độ vang, vì đó là "mồi" chính của màn.
- Màn ngắn, sáng sủa, nhạc vui để người chơi thư giãn sau màn Hard.

**Thưởng:** 20 Cá khô · Mun ♥ 2/6.

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
| 1 | Kệ sách cao | Phòng đọc | 🔑 | Chạm | Mở **cận cảnh** (lần đầu, bàn tay hướng dẫn) | "Vù" phóng to |
| 1a | Hàng sách tầng trên | Cận cảnh | — | Chạm | Sách lung lay, không thấy gì phía sau | "Lạch cạch" |
| 1b | Chậu xương rồng nhỏ | Cận cảnh | ✨ | Chạm | Nhân vật rụt tay lại | "Á!" (âm thanh) |
| 1c | Mép kệ trống | Cận cảnh | 🎯 | Đặt cốc | Cốc đứng ngay mép kệ | "Cộp" |
| 2 | Cây bút dưới sàn | Phòng đọc | — | Chạm | Cây bút vẫn còn lăn lăn (vừa bị hất xuống) | Lăn lóc |
| 3 | Mũ len đen trên ghế | Phòng đọc | 🎭 | Chạm | Cuộn tròn như mèo, chỉ là mũ | "Bụp" |
| 4 | Đồng hồ quả lắc | Phòng đọc | ✨ | Chạm | Quả lắc đung đưa mạnh | "Boong" |
| 7 | Cốc nhựa đỏ trên bàn bếp | Bếp | 🎒 | Chạm | Cốc vào túi đồ | "Tưng" |
| 8 | Hộp trà | Bếp | 🎁 | Chạm | 10 Cá khô | Nắp "cạch" |
| 9 | Ấm trà | Bếp | ✨ | Chạm | Hơi nước bốc lên | Reo khẽ |

**Đồ rơi định kỳ:** cứ khoảng 10 giây, một món nhỏ lại rơi từ kệ xuống sàn phòng đọc (cục tẩy, kẹp giấy, cây bút chì). Đây vừa là trò vui vừa là gợi ý: có ai đó trên kệ đang hất đồ.

**Luồng giải:**

| Giây | Người chơi làm | Game phản hồi |
|---|---|---|
| 0–8 | (xem) | Mun chạy vụt vào phòng đọc, biến mất. Một cây bút rơi "cạch" từ kệ xuống |
| 9–15 | Chạm **cây bút (2)** | Bút vẫn còn lăn: có ai đó vừa hất |
| 16–30 | Chạm **kệ sách (1)** | Cận cảnh mở ra (bàn tay hướng dẫn). Chạm hàng sách: lung lay, không thấy gì. Bong bóng: hình cái cốc ở mép kệ |
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
| 3 | Bình tưới | Vườn trước | 🎁 | Chạm | 10 Cá khô | Nước "róc rách" |
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
| 5 | Hộp thư | Trên trái | 🎁 | Chạm | 10 Cá khô rơi ra cùng một tờ giấy quảng cáo (chỉ có hình) | Nắp "cạch" |
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
| 3 | Chậu hoa | Phòng khách | 🎁 | Chạm | 10 Cá khô | Leng keng |
| 4 | Sofa | Phòng khách | ✨ | Chạm | Đệm nảy | "Phịch" |
| 7 | Tủ quần áo | Phòng ngủ | 🔑 | Chạm (khi Sữa đã đi) | Ngăn dưới hé mở, đôi mắt vàng của Mun, Mun rúc sâu. Bong bóng nhân vật: hình cái hộp | "Meo" run run |
| 8 | Sữa canh trước tủ | Phòng ngủ | 🔑 | Chạm | Sữa gầm gừ, đuôi xù to gấp đôi. Bong bóng nhân vật: hình bát hạt | Gầm gừ |
| 9 | Khăn quàng lông đen trên ghế | Phòng ngủ | 🎭 | Chạm | Cuộn tròn như mèo, không phải | "Bụp" |
| 10 | Giường | Phòng ngủ | ✨ | Chạm | Nệm nảy | "Phịch" |
| 11 | Chỗ trống trước tủ | Phòng ngủ | 🎯 | Đặt hộp các-tông | Hộp đặt xuống, miệng hộp hướng về tủ | "Sạt" |
| 13 | Hộp hạt trên kệ | Bếp | 🔑 | Vuốt lắc / Đặt vào bát | **Vuốt lắc:** Sữa phóng sang bếp. **Đặt vào bát (14):** hạt đổ đầy bát | **"Lạo xạo lạo xạo!"** |
| 14 | Bát của Sữa | Bếp | 🎯 | Đặt hộp hạt | Hạt đổ đầy, Sữa cắm mặt ăn | Hạt rơi lách cách |
| 15 | Hũ bánh quy | Bếp | 🎁 | Chạm | 10 Cá khô | Nắp "cộp" |

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
