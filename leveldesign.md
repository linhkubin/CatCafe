# Level Design – Meo Đâu Rồi?

> Mỗi level = **một lần tìm thấy mèo**, kiểu "Where is my cat". Mèo trốn, người chơi chạm/vuốt/nhặt/ghép/đặt đồ để tìm ra. Tìm thấy là qua màn.
>
> Mỗi màn xây quanh **một "sự thật về mèo"**: một thói quen thật mà người nuôi mèo nào cũng gật gù "đúng rồi, mèo nhà mình y hệt".
>
> **File này chứa luật chung** (thời lượng, độ khó, mở màn, kết màn, gợi ý, phần thưởng). Mô tả chi tiết từng level nằm trong thư mục [`levels/`](levels/), **mỗi file một cụm 10 level** (xem mục 4).

---

## 1. Luật thời lượng và độ khó

### Ba level đầu (dạy chơi)

| Level | Thời lượng | Bước bắt buộc |
|---|---|---|
| 1 | **30 giây** | 2 |
| 2 | **45 giây** | 3 |
| 3 | **65 giây** | 7 |

### Từ level 4 trở đi: độ khó theo **số đuôi** của level

| Độ khó | Số đuôi | Thời lượng | Bước bắt buộc | Phòng | Đồ đánh lừa |
|---|---|---|---|---|---|
| 🟢 **Easy** | **1, 2, 6, 9** | **60 giây** | 3–4 | 1 | 1 |
| 🟡 **Normal** | **3, 4, 7, 8** | **90 giây** | 4–5 | 1–2 | 1–2 |
| 🔴 **Hard** | **0, 5** | **120–150 giây** | 6–8 | 2–3 | 2–3 |

**Ví dụ:** level 4 Normal, level 5 Hard, level 6 Easy, level 10 Hard, level 11 Easy, level 15 Hard, level 23 Normal…

**Nhịp một chục level (từ level 4):**

```
Đuôi:    1    2    3    4    5    6    7    8    9    0
Độ khó:  🟢   🟢   🟡   🟡   🔴   🟢   🟡   🟡   🟢   🔴
Giây:    60   60   90   90  150   60   90   90   60  150
```

Cứ sau một màn Hard (đuôi 5, 0) là một màn Easy để người chơi thở. Mỗi chục level có 4 Easy, 4 Normal, 2 Hard.

**Thời lượng tính gì:** chỉ tính lúc người chơi đang giải đố, đo với người chơi lần đầu, không dùng gợi ý. Không tính cảnh mở màn (2 giây), cảnh tìm thấy mèo, và mini game chăm sóc khi mèo vào quán.

### Luật thắng và tự do của người chơi

**Luật thắng duy nhất: chạm vào đúng con mèo là thắng.**

- **Chạm tự do:** người chơi chạm, vuốt vào bất cứ đâu, theo bất cứ thứ tự nào. Không có bước nào bị khóa chỉ vì "chưa tới lượt".
- **Chỉ có logic, không có thứ tự ép buộc:** thứ duy nhất ràng buộc là logic của đồ vật (phải có kéo mới cắt được băng dính, phải mở van thì vòi mới có nước). Bảng "Luồng giải" trong mỗi level chỉ là **một cách giải tiêu biểu** để đo thời lượng, không phải thứ tự bắt buộc.
- **Mèo lộ ra là chạm được:** hễ con mèo **nhìn thấy được và với tới được** (thấy cả con, thấy mặt, thấy thân) thì chạm vào là **thắng ngay**, dù người chơi đã làm bao nhiêu bước. Người tinh mắt tìm ra mèo sớm thì được thưởng bằng một màn ngắn hơn.
- **Không bao giờ có cảnh "thấy mèo, chạm vào mà không thắng".** Ví dụ cấm: mèo sau rèm, kéo rèm ra thấy mèo, chạm vào nhưng không có gì xảy ra.

**Ba trạng thái của con mèo trong màn:**

| Trạng thái | Nhìn thấy gì | Chạm vào thì sao |
|---|---|---|
| **Ẩn** | Không thấy mèo, mèo nằm sau hoặc dưới một đồ vật | Chạm vào **đồ vật che mèo**: đồ vật phản ứng (lật, mở, xê ra) và có thể làm lộ mèo |
| **Lộ diện** | Thấy mèo rõ ràng, trong tầm tay | **Thắng.** Sang cảnh bế mèo |
| **Lẩn tránh** (có chủ ý, chỉ ở màn được thiết kế như vậy) | Thấy mèo nhưng mèo đang chơi trốn tìm, hoặc nhút nhát | Mèo **chạy vụt sang chỗ khác** hoặc **lùi sâu ra khỏi tầm với**, có hoạt hình rõ ràng. Màn đó **phải có cách dụ** mèo ra (đồ ăn, đồ chơi, hộp…), và khi đã bị dụ ra thì mèo chuyển sang Lộ diện |

**Quy tắc cho trạng thái Lẩn tránh:**
- Phản ứng luôn là **mèo di chuyển** (chạy sang chỗ khác, lùi vào trong), không bao giờ là "đứng yên mà không thắng".
- Người chơi phải **nhìn thấy mèo đi đâu**: hoạt hình chạy rõ, bản đồ mini hiện vị trí mới nếu sang phòng khác.
- Mỗi màn có Lẩn tránh phải nói rõ trong mô tả: chạm thì mèo đi đâu, và dụ bằng gì.

### Đồ ngụy trang giống mèo

Mỗi màn có vài đồ vật **trông giống con mèo của màn đó** (đồ đánh lừa 🎭). Người chơi chạm vào thì hóa ra không phải, làm việc tìm mèo thật lẫn hơn và vui hơn.

| Màn | Số đồ ngụy trang |
|---|---|
| Level 2 "Giỏ tất" (màn chủ đề ngụy trang) | 6, rải khắp phòng |
| 🟢 Easy và ba level dạy chơi còn lại | 1 |
| 🟡 Normal | 1–2 |
| 🔴 Hard | 2–3 |

**Cách thiết kế:**
- **Cùng màu lông** với mèo của màn (trắng cho Sữa, đen cho Mun), **dáng tròn, cùng cỡ** với con mèo khi cuộn tròn hoặc ngồi.
- Mỗi món có **một phản ứng buồn cười riêng** khi bị chạm (mũ rơi, dép kêu chút chít, quạ bay đi…), để chạm nhầm là vui chứ không bực.
- **Chỉ con mèo thật có dấu hiệu sống** (nhịp thở, tai giật, đuôi ve vẩy). Đồ ngụy trang đứng yên tuyệt đối. Đây là manh mối công bằng cho người tinh mắt.
- Đồ ngụy trang đã chạm thì **giữ trạng thái sau khi chạm**, để người chơi biết mình đã thử chỗ nào.

### Quy ước chung

- **Một "sự thật về mèo" mỗi màn.** Lời giải luôn đến từ thói quen thật của mèo, nên người chơi đoán được.
- **Mèo lộ diện là chạm được, chạm là thắng** (xem "Luật thắng" ở trên và "Kết màn chung" bên dưới).
- **Không thua, không đếm giờ.** Chạm sai chỉ có phản ứng vui.
- **Game không có chữ.** Mọi thứ truyền đạt bằng hình, biểu tượng, hoạt hình và âm thanh: bong bóng suy nghĩ vẽ hình đồ vật, bàn tay hướng dẫn, biển hiệu vẽ hình, tiếng kêu. Các từ trong ngoặc kép ở tài liệu này ("meo", "tách", "chít"…) là **âm thanh**, không hiện thành chữ trên màn hình.
- **Gợi ý tự nhiên** bật sau 8 giây không làm gì (đuôi thò ra, tiếng "meo", đồ lấp lánh). Gợi ý mạnh (nút 💡): bàn chân mèo chỉ vào đúng chỗ.
- **Bí mật 🎁:** mỗi level 1–2 bí mật (Easy 1, Normal 1–2, Hard 2), là đồ trong cảnh chạm vào thì thưởng thêm **5 Cá khô**, chỉ thưởng lần đầu. Không gợi ý, không lấp lánh: để người chơi tò mò tự chạm.
- **Dải banner quảng cáo ở đáy:** game có banner dưới đáy màn hình. Chừa **150px dưới cùng** (y 1386–1536 trên khung 1024x1536): không đặt túi đồ, nút 💡 hay bất kỳ đồ chạm được nào trong dải này. Túi đồ và nút 💡 đặt ngay trên dải banner.

### Mở màn chung: bong bóng nhiệm vụ "tìm mèo"

Mọi màn **mở đầu bằng cùng một tín hiệu**, để người chơi luôn rõ nhiệm vụ: **tìm con mèo**.

```
┌──────────────────────────────┐
│                              │
│         ╭──────────╮         │
│         │  ▄▀▀▀▄   │         │ ← Bong bóng nhiệm vụ
│         │ █  ?  █  │         │   đầu mèo màu tối,
│         │  ▀▄▄▄▀   │         │   dấu "?" trắng ở giữa
│         ╰────┬─────╯         │
│              ╲               │
│        (cảnh căn phòng)      │
└──────────────────────────────┘
        ↓ sau 1,5 giây
┌──────────────────────────────┐
│ (●?) ♥○○○○               ⏸  │ ← bong bóng thu nhỏ về góc trên trái
│                              │
│        (cảnh căn phòng)      │
└──────────────────────────────┘
```

1. **Vào màn:** cảnh mở màn 2 giây (mèo chạy vụt qua và biến mất, hoặc không thấy mèo đâu như level 1).
2. **Bong bóng nhiệm vụ bật ra giữa màn hình**, hiệu ứng nảy nhẹ: một **bong bóng lời thoại nhỏ**, bên trong là **hình đầu mèo màu tối** (bóng đen, chỉ thấy hai tai và đường viền đầu), **dấu "?" màu trắng ở giữa**. Kèm tiếng "meo?" ngắn.
3. **Sau 1,5 giây**, bong bóng thu nhỏ và bay về **góc trên bên trái**, nằm cạnh thanh ♥, **ở đó suốt màn chơi** như biểu tượng nhiệm vụ. Dấu "?" thỉnh thoảng nhún nhẹ.
4. **Khi tìm thấy mèo** (lúc mèo lộ diện): bong bóng ở góc bay trở lại giữa màn hình, **đầu mèo tối "tô màu" thành mặt con mèo vừa tìm được** (trắng cho Sữa, đen mắt vàng cho Mun), dấu "?" đổi thành trái tim. Bong bóng vỡ thành mấy trái tim nhỏ, rồi tới bước chạm mèo.

**Quy tắc:**
- Bong bóng nhiệm vụ luôn là **đầu mèo tối chung**, giống nhau ở mọi màn, kể cả khi người chơi đã biết sẽ tìm Sữa hay Mun. Chỉ khi tìm thấy mới lộ mặt.
- Ở **level 5** (lần đầu gặp Mun), khi đầu mèo tối tô màu thành mặt Mun có thêm **viền sao lấp lánh** (báo mèo mới).
- Bong bóng nhiệm vụ khác **bong bóng suy nghĩ của nhân vật** (dùng để gợi ý, vẽ hình đồ vật như cái kéo, cái van). Bong bóng nhiệm vụ là bong bóng **lời thoại** (đuôi nhọn), bong bóng gợi ý là bong bóng **suy nghĩ** (đuôi là các chấm tròn nhỏ).
- Chạm vào bong bóng ở góc: nó bay ra giữa màn hình nhắc lại nhiệm vụ trong 1 giây rồi thu về.

### Kết màn chung: chạm mèo, hai tay bế lên

Mọi màn kết thúc theo **cùng một cảnh**, dùng **một dáng mèo và một dáng bế duy nhất** cho mọi level và mọi con mèo (chỉ đổi màu lông: Sữa trắng, Mun đen):

1. **Mèo lộ diện** (khoảnh khắc riêng của từng màn), bong bóng nhiệm vụ tô màu thành mặt mèo.
2. Con mèo **viền sáng nhẹ, nhấp nháy chậm**. Ở level 1 có thêm bàn tay hướng dẫn chỉ vào mèo; từ level 2 người chơi tự chạm.
3. **Người chơi chạm vào con mèo.**
4. **Cảnh bế chung** (khoảng 2 giây, chạm để bỏ qua).
5. **Màn hình thưởng** bằng biểu tượng (cá khô bay vào túi, thanh ♥ tăng). **Chạm bất kỳ đâu** để sang level tiếp theo (game không có chữ, nên không có nút "Next").

#### Dáng bế chung (dùng lại y nguyên ở mọi level)

```
              /\_/\
             ( ^ ^ )  ← mắt híp cười, má hồng
          ✋─(  ω  )─✋  ← hai bàn tay luồn dưới nách
              |   |
              |   |     ← người duỗi dài như sợi mì
              |   |
             (  ~  )    ← bụng tròn
             /|   |\    ← hai chân sau lủng lẳng
               \_/      ← đuôi thả cong
          ═══════════   mép dưới màn hình
```

- **Hai bàn tay** (tay người chơi, góc nhìn thứ nhất) đưa lên từ mép dưới màn hình, luồn dưới nách mèo, nhấc lên giữa màn hình.
- **Dáng mèo:** người duỗi dài, hai chân trước giơ hơi chĩa ra hai bên, hai chân sau lủng lẳng, đuôi thả cong xuống. Mắt **híp cười**, má hồng, miệng hình chữ ω.
- **Chuyển động:** mèo đung đưa nhẹ trái phải hai nhịp, kêu "meo" một tiếng ngắn, 3 trái tim nhỏ bay lên. Thanh ♥ của mèo tăng 1.
- Các đồ vật trong màn (hộp, túi giấy, tất…) **không đi theo** mèo trong cảnh bế: mèo được nhấc ra khỏi chúng, đồ vật ở lại cảnh nền.
- **Một bộ hoạt hình duy nhất** cho cả game: chỉ thay màu lông và màu mắt theo từng con mèo.

**Quy tắc:**
- Mèo **lộ diện lúc nào thì chạm được lúc đó**, kể cả khi người chơi chưa làm hết các bước trong "Luồng giải". Viền sáng chỉ để nhắc, không phải điều kiện.
- Mèo ở trạng thái **Lẩn tránh** thì chạm vào sẽ làm nó chạy hoặc lùi đi (xem "Luật thắng").
- Bước chạm mèo **không tính vào số bước bắt buộc** của màn, nhưng có tính vào thời lượng (khoảng 2–3 giây).

### Tạm dừng chung (mọi level)

- Nút **⏸** ở góc trên phải (tròn kem, viền nâu, hai vạch đứng), trong dải giao diện, không đè bong bóng nhiệm vụ ở góc trái.
- Bấm ⏸: **dừng cả màn** (chuyển động, đồng hồ gợi ý 8/16 giây, âm thanh), phủ một lớp tối mờ, giữa màn hình có **2 nút hình, không chữ**:
  - **▶ Chơi tiếp:** tắt lớp phủ, mọi thứ chạy tiếp đúng chỗ đang dừng (đồng hồ gợi ý chạy tiếp, không đếm lại từ đầu).
  - **↻ Chơi lại màn:** bắt đầu lại level từ đầu, túi đồ trống, không mất phần thưởng đã có.
- Chạm ra ngoài hai nút: không làm gì (tránh trẻ bấm nhầm thoát mất).
- Game web tự tạm dừng khi người chơi chuyển tab hoặc khoá màn hình, quay lại thì thấy lớp phủ tạm dừng.
- Ảnh dùng chung: `ui_pause_button`, `ui_play_button`, `ui_restart_button`.

---

## 2. Phần thưởng theo độ khó

Mèo của từng cụm level và mèo nào vào quán khi nào được ghi trong file của cụm đó (mục 4).

| Độ khó | Cá khô qua màn |
|---|---|
| Ba level đầu | 10 · 15 · 20 |
| 🟢 Easy | 20 |
| 🟡 Normal | 30 |
| 🔴 Hard | 50 |

---

## 3. Cách đọc file mô tả level

Mỗi level trong các file `levels/` có các mục theo thứ tự:

1. **Thông tin nhanh**
2. **Sự thật về mèo:** ý tưởng của màn
3. **Trạng thái mèo:** mèo đang Ẩn, Lộ diện hay Lẩn tránh; chạm vào thì mèo đi đâu, và từ lúc nào chạm là thắng (theo "Luật thắng" ở mục 1)
4. **Bố cục màn hình:** phác thảo màn hình dọc, đồ vật đánh số theo vị trí
5. **Đồ vật:** vị trí, loại, thao tác, phản hồi, âm thanh
6. **Luồng giải:** **một cách giải tiêu biểu** theo mốc giây, dùng để đo thời lượng. Người chơi được làm theo bất kỳ thứ tự nào hợp logic
7. **Chạm sai và làm khác thứ tự:** game phản ứng thế nào
8. **Thang gợi ý:** sau 8 giây, sau 16 giây, và khi bấm 💡
9. **Khoảnh khắc lộ diện:** hoạt hình chi tiết lúc mèo xuất hiện
10. **Chạm mèo → cảnh bế chung** (cùng một cảnh cho mọi level, ghi chú thêm nếu có điểm riêng)
11. **Ghi chú vẽ, hoạt hình, âm thanh**

**Ký hiệu loại đồ vật:** 🔑 cần thiết · 🎒 nhặt được · 🎯 chỗ đặt đồ · 🎭 đánh lừa (trông giống mèo) · 🎁 bí mật · ✨ trang trí

**Thang gợi ý chuẩn (áp dụng cho mọi level):**

| Mức | Khi nào | Hình thức |
|---|---|---|
| 1. Gợi ý tự nhiên | 8 giây không làm gì | Một dấu hiệu nhỏ trong cảnh: đuôi thò ra, đồ vật rung, tiếng "meo" từ hướng đúng |
| 2. Gợi ý rõ hơn | 16 giây không làm gì | Đồ vật cần chạm **lấp lánh** |
| 3. Gợi ý mạnh | Bấm nút 💡 | **Bàn chân mèo** hiện ra, chỉ vào đúng đồ vật và làm mẫu thao tác (vuốt, kéo) |

---

## 4. Danh sách file mô tả level

Mỗi cụm 10 level có **hai file**: file **mô tả level** (cách chơi, luồng giải, gợi ý) và file **trạng thái** (ảnh từng trạng thái, phản hồi, animation, âm thanh, dành cho art và dev).

| Cụm | Mô tả level | Trạng thái đồ vật và animation | Mèo | Ghi chú |
|---|---|---|---|---|
| Level 1–10 | [levels/levels-01-10.md](levels/levels-01-10.md) | [levels/states-01-10.md](levels/states-01-10.md) | Sữa (1–4), Mun (5–10) | Chương 1. Level 1–3 dạy chơi; Sữa vào quán sau level 4, Mun vào quán sau level 10 |
| Level 11–20 | *(chưa viết)* `levels/levels-11-20.md` | *(chưa viết)* `levels/states-11-20.md` | — | — |

**Quy ước đặt tên:** `levels/levels-XX-YY.md`, mỗi file đúng 10 level (01–10, 11–20, 21–30…), để độ khó theo số đuôi lặp lại đúng một chu kỳ trong mỗi file.

---

## 5. Đặc tả trạng thái và phản hồi (cho art và dev)

Mục này là **luật chung** để mọi file `levels/states-XX-YY.md` dùng chung một ngôn ngữ. Art đọc để biết phải vẽ những ảnh nào; dev đọc để biết đổi ảnh nào, chạy hiệu ứng nào, phát âm thanh nào.

### 5.1 Ba cách tạo chuyển động

Art của game là **ảnh tĩnh vẽ tay** (vẽ từng ảnh một bằng ChatGPT, xem `art/style.md`). Vì vậy mọi chuyển động chỉ được tạo bằng 3 cách:

| Cách | Ai làm | Khi nào dùng | Ví dụ |
|---|---|---|---|
| **Đổi ảnh trạng thái** | Art vẽ mỗi trạng thái một ảnh, dev đổi ảnh | Hình dạng đồ vật thay đổi hẳn | Tủ đóng → tủ mở, đệm phẳng → đệm lật |
| **Hiệu ứng code (tween)** | Dev, không cần vẽ thêm | Đồ vật chỉ rung, nảy, xoay, bay, phóng to | Bụi cây rung rung, gối nảy, tất bay theo đường cong |
| **Tư thế mèo / nhân vật** | Art vẽ mỗi tư thế một ảnh, dev đổi ảnh + tween | Mèo đổi hành động | Sữa ngồi → Sữa ngáp → Sữa ăn |

**Luật cho art:** các ảnh trạng thái của cùng một đồ vật phải **cùng kích thước khung, cùng vị trí đồ vật trong khung** (theo `art/style.md` mục 4), để dev đổi ảnh không bị giật.

**Luật cho dev:** **đồ nào có phản ứng khi chạm thì phải là ảnh riêng** (sprite), không vẽ chung vào nền. Đồ chỉ để nhìn thì vẽ vào nền.

### 5.2 Thư viện phản hồi chuẩn (hiệu ứng code)

Dev làm một lần, dùng cho mọi level. Trong file trạng thái, phản hồi được ghi bằng **tên hiệu ứng** dưới đây.

| Tên | Mô tả chuyển động | Thông số gợi ý | Dùng cho |
|---|---|---|---|
| `wiggle` | **Rung rung** tại chỗ: xoay qua lại quanh chân đồ vật | ±4°, 3 nhịp, 0,3 giây | Bụi cây, chậu cây, đồ trang trí, đồ "chạm rồi nhưng không có gì" |
| `wiggle_strong` | Rung mạnh hơn, kèm vài lá/bụi bay ra (hạt) | ±8°, 4 nhịp, 0,4 giây | Bụi hoa có mèo bên trong, hộp có mèo |
| `squash` | **Nhún**: dẹt xuống rồi nảy lên | scaleY 1 → 0,88 → 1,06 → 1, 0,25 giây | Gối, đệm, nệm, đồ mềm |
| `hop` | **Nảy lên** rồi rơi xuống chỗ cũ | lên 24px, 0,35 giây | Đồ nhỏ, đồ chơi, hộp nhẹ |
| `tilt_back` | **Nghiêng rồi về** | 15°, 0,4 giây | Lọ hoa, chai, đồ đứng |
| `swing` | **Đung đưa** như con lắc, tắt dần | ±10° → 0, 1,2 giây | Chao đèn, chuông gió, quả bông, đồ treo |
| `shake_no` | **Lắc ngang từ chối** | dịch x ±6px, 3 nhịp, 0,3 giây | Đặt sai chỗ, ghép sai, đồ đang bị khóa logic |
| `breathe` | **Phập phồng theo nhịp thở**, lặp liên tục | scale 1 → 1,03 → 1, 1,6 giây/nhịp | Chỗ mèo đang ngủ/ẩn (gợi ý mức 1) |
| `nudge` | **Nhích nhẹ** một cái như có gì bên trong | dịch 4px + xoay 2°, 0,2 giây | Hộp có mèo, đệm có hộp pate bên dưới (gợi ý mức 1) |
| `sparkle` | **Lấp lánh**: 2–3 ngôi sao `ui_sparkle` nở ra quanh đồ vật rồi tắt | 0,8 giây, lặp mỗi 2 giây | Gợi ý mức 2 |
| `glow_outline` | **Viền sáng** vàng bơ quanh đồ vật hoặc mèo, nhấp nháy chậm | độ sáng 40% → 100%, 1 giây/nhịp | Mèo lộ diện có thể chạm |
| `swap` | **Đổi ảnh trạng thái** kèm nhún nhỏ để mượt | squash 0,15 giây ở giữa lúc đổi | Mọi lần đổi trạng thái |
| `fly_to_bag` | Đồ **thu nhỏ bay theo đường cong** vào ô trống đầu tiên của túi đồ | 0,5 giây, kết thúc bằng `hop` nhỏ trong ô | Nhặt đồ |
| `fly_arc` | Đồ **bay theo đường cong** từ điểm A tới điểm B, xoay nhẹ khi bay | 0,6 giây | Tất bay ra, đồ bị hất rơi |
| `return_to_bag` | Đồ đang kéo **bay về ô túi** kèm `shake_no` | 0,3 giây | Thả đồ sai chỗ |
| `merge` | Hai món trong túi **xoay vào nhau, lóe sáng**, món mới bật ra | 0,4 giây + lóe 0,2 giây | Ghép đồ |
| `drop_in` | Đồ từ túi **rơi vào chỗ đặt**, nảy nhẹ một cái | 0,3 giây | Đặt đồ đúng chỗ |
| `puff` | Một cụm **bụi tròn** nhỏ bung ra rồi tan | 0,4 giây | Đồ rơi xuống sàn, mèo chạy vụt |
| `hearts` | 3 trái tim `ui_heart` bay lên tỏa ra | 0,8 giây | Tìm thấy mèo, bế mèo |
| `zzz` | Ký hiệu ngủ là 3 bong bóng tròn nhỏ bay lên (không dùng chữ Z) | lặp 2 giây | Mèo đang ngủ |
| `tap_ring` | **Vòng tròn mờ** nhỏ nở ra tại điểm chạm | 0,25 giây | Mọi lần chạm vào chỗ trống, để người chơi biết máy đã nhận chạm |
| `disabled` | **Không có phản ứng gì**: không hiệu ứng, không âm thanh, không `tap_ring` | — | Đồ chưa được phép chạm (ví dụ hộp úp ở level 3) |

### 5.3 Kiểu đồ vật chuẩn

Đồ vật cùng kiểu dùng chung một cách vẽ trạng thái và phản hồi. File trạng thái chỉ ghi kiểu, trừ khi có điểm khác.

| Kiểu | Ảnh trạng thái cần vẽ | Thao tác | Chuyển trạng thái và phản hồi |
|---|---|---|---|
| **Cửa, tủ, ngăn kéo, nắp** | `_closed`, `_open` | Chạm | `closed` → `open` (`swap` + âm bản lề). Chạm lần nữa: `open` → `closed`. Không giới hạn số lần |
| **Rèm** | `_closed`, `_open` | Vuốt ngang (chạm cũng được) | Đổi qua lại giữa hai trạng thái (`swap` + âm vải) |
| **Đệm, chăn, gối có thứ bên dưới** | `_flat` (hoặc `_bulge`), `_lifted` (hoặc `_flipped`) | Vuốt lên (chạm thì chỉ `squash` + nhắc vuốt) | `flat` → `lifted`, lộ thứ bên dưới. **Không trở lại** `flat` (để người chơi biết đã xem chỗ này) |
| **Đồ mềm trang trí** (gối, gấu bông) | 1 ảnh | Chạm | `squash` + âm "bụp" |
| **Cây, bụi, lá** | 1 ảnh | Chạm | `wiggle` + 2–3 chiếc lá bay ra (hạt) + âm xào xạc |
| **Đồ treo** (đèn, chuông gió) | 1 ảnh | Chạm | `swing` + âm riêng |
| **Đồ đứng nhỏ** (lọ, chai, đồng hồ) | 1 ảnh (thêm `_after` nếu có thay đổi) | Chạm | `tilt_back` hoặc `hop` + âm riêng |
| **Đồ đánh lừa 🎭** | `_idle`, `_after` | Chạm | `idle` → `after` (hóa ra không phải mèo), **giữ nguyên** `after` tới hết màn. Chạm lại ở `after`: `wiggle` nhỏ, không âm |
| **Đồ nhặt 🎒** | Ảnh trong cảnh (dùng thu nhỏ làm icon túi) | Chạm | `fly_to_bag`, ảnh trong cảnh biến mất |
| **Chỗ đặt 🎯** | Thường nằm trong ảnh nền hoặc đồ khác. Thêm `_filled` nếu đặt đồ vào thì hình đổi | Kéo đồ từ túi thả vào | Đúng: `drop_in` + đổi trạng thái. Sai chỗ: `return_to_bag` |
| **Bí mật 🎁** | Ảnh đồ vật bình thường | Chạm | Phản ứng như kiểu đồ của nó, rồi `ui_dried_fish` bay vào góc điểm thưởng. Chỉ thưởng một lần |

### 5.4 Quy ước âm thanh

- Key âm thanh: `sfx_<tên>` (chữ thường không dấu, gạch dưới), ví dụ `sfx_pop_can`, `sfx_meow_short`, `sfx_cloth`.
- Âm dùng chung cả game không có số level: `sfx_tap`, `sfx_pickup`, `sfx_drop`, `sfx_merge`, `sfx_wrong`, `sfx_sparkle`, `sfx_win`, `sfx_heart`, `sfx_pop_can` (tiếng "TÁCH!" mở hộp pate, level 1 và 10).
- Âm riêng của level có tiền tố `l<số>_`, ví dụ `l2_sfx_sock_whoosh`.
- Tiếng mèo theo từng con: `sua_sfx_meow`, `sua_sfx_purr`, `mun_sfx_meow_shy`…

### 5.5 Cách đọc file trạng thái

Mỗi level trong `levels/states-XX-YY.md` có:

1. **Lớp hiển thị:** thứ tự vẽ từ dưới lên trên (nền → đồ vật → mèo → tiền cảnh → giao diện).
2. **Bảng đồ vật:** key ảnh từng trạng thái, trạng thái bắt đầu, thao tác, điều kiện, chuyển sang trạng thái nào, phản hồi (tên hiệu ứng mục 5.2), âm thanh.
3. **Trạng thái mèo:** các tư thế mèo dùng trong màn, khi nào đổi tư thế, chuyển động code đi kèm.
4. **Kịch bản cảnh:** mở màn và khoảnh khắc lộ diện, chia theo từng nhịp với thời lượng.
5. **Danh sách ảnh:** ảnh đã có trong `art/design-art-levelN.md` và **ảnh còn thiếu** cần bổ sung.

---

## 6. Bộ animation dùng chung: mèo, đôi tay, bong bóng

### 6.1 Tư thế mèo

Mỗi tư thế là **một ảnh vẽ riêng** (thư mục `art/out/cats/`), dev đổi ảnh và thêm tween. Hai con mèo dùng **cùng danh sách tư thế cơ bản** (chỉ khác màu lông, dáng người), cộng thêm vài tư thế riêng theo level.

**Tư thế cơ bản (con nào cũng có):**

| Tư thế | Key Sữa | Key Mun | Mô tả | Tween đi kèm |
|---|---|---|---|---|
| Chạy vụt | `sua_run` | `mun_run` | Nhìn nghiêng, 4 chân duỗi, tai cụp sau, vệt gió | Bay ngang qua màn hình 0,5 giây + `puff` ở chân |
| Ngồi nhìn | `sua_sit_stare` | `mun_sit_look` | Ngồi thẳng, nhìn ba phần tư, đuôi quấn chân | `breathe` nhẹ, thỉnh thoảng nháy mắt (đổi ảnh `_blink` nếu có) |
| Kêu meo | `sua_meow_up` | `mun_meow_shy` | Ngẩng lên, miệng mở | `hop` nhỏ + `sfx_meow` |
| Ngủ cuộn tròn | `sua_sleep_curl` | `mun_sleep_curl` | Cuộn tròn, mắt nhắm, đuôi quấn mũi | `breathe` + `zzz` |
| Đuôi thò ra | `sua_tail_peek` | `mun_tail_peek` | Chỉ một cái đuôi thò ra từ mép đồ vật | Ve vẩy: xoay ±12°, 0,6 giây/nhịp |
| Đôi mắt trong bóng tối | — | `mun_eyes_dark` | Chỉ hai mắt vàng trên nền tối | Nháy mắt: scaleY → 0,1 → 1, 0,15 giây; "lùi sâu": thu nhỏ 70% và mờ dần 0,4 giây |
| Vồ | `sua_pounce` | `mun_pounce` | Hai chân trước giơ cao, mông chổng, mắt tròn | Nhảy cong tới mục tiêu 0,4 giây |
| Ăn | `sua_eat`, `sua_eat_f2` | `mun_eat`, `mun_eat_f2` | Cúi đầu vào bát/hộp, mắt nhắm. Không vẽ kèm bát/hộp, dev đặt đồ ăn đè lên trước mõm. Khung `_f2`: đầu nhích lên, má phồng như đang nhai | Đổi qua lại 2 khung 0,25 giây/khung, kèm gật đầu nhẹ |
| Nằm trong hộp | `sua_in_box` | `mun_in_box` | Thò đầu và hai tai khỏi mép hộp, đuôi vắt qua mép (vẽ kèm hộp) | Đuôi ve vẩy, `breathe` |
| **Dáng bế chung** | `sua_held` | `mun_held` | Dáng bế chung (mục "Kết màn chung"), không vẽ tay | Đung đưa ±5°, 2 nhịp |
| Mặt cho bong bóng | `sua_face_icon` | `mun_face_icon` | Chỉ cái đầu, nhìn thẳng, mắt híp cười | Dùng khi bong bóng nhiệm vụ tô màu |

**Tư thế riêng theo level** được liệt kê trong từng level của file trạng thái.

**Mèo lộ diện:** khi mèo chuyển sang trạng thái Lộ diện, dev bật `glow_outline` quanh ảnh mèo hiện tại. Vùng chạm của mèo **to hơn ảnh khoảng 20%** để dễ chạm.

### 6.2 Đôi tay bế mèo

| Key | Mô tả |
|---|---|
| `player_hands_lift` | Hai bàn tay trẻ con mũm mĩm, ống tay áo len vàng bơ, nhìn từ góc người chơi, **lòng bàn tay hướng vào nhau**, đặt ở mép dưới khung. Nền trong suốt. Vẽ **riêng**, không vẽ kèm mèo |

**Cảnh bế (dev ghép):**

| Nhịp | Thời gian | Chuyển động |
|---|---|---|
| 1 | 0–0,3 giây | Cảnh nền mờ đi 40%. `player_hands_lift` trượt lên từ mép dưới tới vị trí con mèo |
| 2 | 0,3–0,5 giây | Ảnh mèo đổi sang `<mèo>_held`, đặt giữa hai bàn tay (tay nằm **trên** lớp mèo ở phần nách) |
| 3 | 0,5–1,1 giây | Tay và mèo cùng trượt lên giữa màn hình, mèo kéo dài: scaleY 1 → 1,15 → 1,08 (người duỗi như sợi mì) |
| 4 | 1,1–1,9 giây | Đung đưa ±5° hai nhịp, `hearts`, âm `<mèo>_sfx_meow` + `sfx_heart` |
| 5 | 1,9–2,2 giây | Phóng to nhẹ 110% như ôm vào lòng, rồi chuyển sang màn hình thưởng |

Chạm bất kỳ đâu trong cảnh bế: nhảy thẳng tới nhịp 5.

### 6.3 Bong bóng nhiệm vụ

| Key | Mô tả |
|---|---|
| `ui_speech_bubble` | Bong bóng lời thoại tròn, trắng kem, viền nâu run tay, **đuôi nhọn** chỉ xuống dưới. Bên trong để trống |
| `ui_cat_head_dark` | Bóng đầu mèo màu tím than nhạt, chỉ thấy hai tai và đường viền đầu, không mặt |
| `ui_question_mark_white` | Dấu hỏi ruột trắng kem, viền nâu, dùng trong bong bóng nhiệm vụ. Vẽ riêng vì tô màu bằng code không ra trắng mà vẫn giữ vân chì (`ui_question_mark` hồng đào vẫn dùng ở chỗ khác) |

**Ghép và chuyển động (dev):**

| Nhịp | Thời gian | Chuyển động |
|---|---|---|
| Hiện | sau mở màn | Bong bóng bật ra giữa màn hình: scale 0 → 1,15 → 1 (0,35 giây), âm `sfx_meow_question` |
| Giữ | 1,5 giây | Dấu hỏi `hop` nhỏ mỗi 0,7 giây |
| Thu về | 0,4 giây | Thu nhỏ còn 35%, bay về góc trên trái cạnh thanh ♥ |
| Trong màn | liên tục | Mỗi 4 giây dấu hỏi `hop` nhỏ một cái. Chạm vào bong bóng: bay ra giữa 1 giây rồi thu về |
| Tìm thấy | 0,8 giây | Bay ra giữa, `ui_cat_head_dark` mờ dần, `<mèo>_face_icon` hiện lên thay thế; dấu hỏi đổi thành `ui_heart`; bong bóng vỡ thành `hearts` |

### 6.4 Bàn tay hướng dẫn và bàn chân gợi ý

| Key | Dùng khi | Chuyển động |
|---|---|---|
| `ui_hand_pointer` (đã có) | Hướng dẫn lần đầu một thao tác | **Chạm:** nhấn xuống (scale 0,9) rồi nhả, lặp 1 giây/nhịp. **Vuốt:** trượt theo đường vuốt 0,6 giây, mờ đi, lặp. **Kéo thả:** đi từ ô túi tới chỗ đặt 0,8 giây, lặp |
| `ui_hint_paw` (đã có) | Gợi ý mạnh (nút 💡) | Giống bàn tay hướng dẫn, chỉ khác hình |

---

## 7. Checklist khi playtest

- [ ] Người chơi mới hoàn thành trong khoảng thời lượng mục tiêu của độ khó (không dùng gợi ý)?
- [ ] Người nuôi mèo xem màn chơi có gật gù "đúng rồi, mèo y hệt"?
- [ ] Level Easy không có bước nào phải nghĩ lâu quá 10 giây?
- [ ] Level Hard có cảm giác "à ha" ít nhất một lần?
- [ ] Đồ đánh lừa gây buồn cười chứ không gây bực?
- [ ] Không có chữ nào trên màn hình?
