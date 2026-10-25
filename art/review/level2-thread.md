# Thảo luận Level 2 – Giỏ tất

Đội: **Art 2D** (đặc tả ảnh, chỉ đạo Codex vẽ), **Dev** (code, animation), **Claude** (Game Design + PM). Codex chỉ vẽ.
Nguồn: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 2, `art/design-art-level2.md`, `art/style.md`, `leveldesign.md`.
Áp dụng mọi quy tắc đã chốt ở Level 1 (`art/review/level1-thread.md`): vẽ theo tờ, quy tắc đặt tên V23, công thức nét, vùng chạm ≥115px, màu tươi O3, nét mảnh O5, Sữa theo `sua_ref`, nhân vật tóc xoăn, mèo chạy quay mặt theo hướng chạy, bong bóng nhiệm vụ cạnh nhân vật.
Quy trình gọn (theo chủ dự án): Art 2D cập nhật đặc tả + vẽ 2 tranh demo → chủ dự án duyệt → Art 2D tách asset, Dev làm level → build, đăng online, commit.

---

## GD chốt trước khi vẽ – G2-1…G2-6

**G2-1.** Luồng chơi giữ như `levels-01-10.md` Level 2 (giỏ tất chạm 3 lần, 6 đồ ngụy trang trắng tròn, rèm, tủ, hộp giày, gầm giường, chao đèn).
**G2-2. Gợi ý:** theo cảm nhận của chủ dự án ở level 1, bỏ gợi ý tự động theo giờ (tai giật, lấp lánh ở giây 8/16). Thay bằng **manh mối công bằng luôn có**: giỏ tất phập phồng rất nhẹ theo nhịp thở ngay từ đầu, các đồ ngụy trang đứng yên tuyệt đối. Nút 💡 vẫn chỉ vào giỏ tất.
**G2-3. Mở màn:** nhân vật bước vào gọi, bong bóng nhiệm vụ cạnh nhân vật như level 1; Sữa (`sua_run`) chạy vụt qua phòng, quay mặt theo hướng chạy, biến mất sau giường rồi vào giỏ.
**G2-4. Lộ diện:** giỏ lộ Sữa cuộn tròn ngủ (cùng màu, cùng nét với tất); Sữa giật tai, hé một mắt, ngáp, rúc ngủ tiếp. Chạm Sữa → cảnh bế chung (dùng lại của level 1).
**G2-5.** Dùng lại tối đa asset chung đã có (`sua_run`, `sua_tail_peek` nếu cần, `fx_*`, `ui_*`, tư thế nhân vật). Đồ đánh lừa đã chạm thì giữ trạng thái sau khi chạm.
**G2-6. Chuyển màn:** màn thưởng level 1 chạm để sang level 2 (♥ 2/4, 15 cá khô). Màn thưởng level 2 chạm để chơi lại từ level 1 (chưa có level 3).

---

## Vòng 1 – Art 2D

**A2-1. Đã viết lại `art/design-art-level2.md`** theo mọi quy tắc level 1:
- Bảng key (32 key) và 8 bảng tờ đúng định dạng V14. `codex-draw --dry` ra cỡ hợp lệ cho cả 8 tờ.
- Cột Nét theo công thức cuối, cỡ hiển thị theo tỉ lệ level 1, bố cục theo `levels-01-10.md`, bảng vị trí, mô tả từng ảnh.
- Màu O3, nét O5, Sữa theo `sua_ref`, nhân vật tóc xoăn.
- Dùng lại, không vẽ: `sua_run`, `sua_face_icon`, `sua_held`, `player_hands_lift`, 4 tư thế nhân vật, mọi `ui_*`, `fx_pop`.

**A2-2. Tờ và số lượt.** 9 lượt Codex cho cả level, dự phòng thêm 2:

| Lượt | Tờ / ảnh | Key |
|---|---|---|
| 1 | Nền `l2_bg_bedroom` (sửa từ `l2_demo_start`) | 1 |
| 2 | `l2_basket_sheet` | giỏ `_full`, `_2`, `_3`, `_reveal`, `_one_eye`, `_yawn` |
| 3 | `l2_socks_sheet` | `l2_sock_striped`, `_dotted`, `_white_big`, `l2_sock_ball`, `l2_sock_unrolled` |
| 4 | `l2_decoy_sheet` | `l2_plush_cat`, `_fallen`, `l2_coat_hook`, `l2_beanie_white_idle`, `_floor` |
| 5 | `l2_chair_sheet` | `l2_chair`, `l2_sweater_rolled`, `_unrolled`, `l2_slippers_cat_idle`, `_after` |
| 6 | `l2_bed_sheet` | `l2_bed_blanket_flat`, `_flipped`, `l2_slipper` |
| 7 | `l2_wardrobe_sheet` | `l2_wardrobe_closed`, `_open`, `l2_shoebox`, `l2_ceiling_lamp` |
| 8 | `l2_curtain_sheet` | `l2_curtain_closed`, `_open` |
| 9 | `player_beanie_sheet` | `player_wear_beanie` |

**A2-3. Demo đã vẽ, chờ chủ dự án duyệt.** 2 lượt Codex, không phải vẽ lại.
- `art/out/demo/l2_demo_start.png`: phòng ngủ hồng buổi trưa, mọi đồ ở trạng thái đầu. Sáu đồ trắng tròn cùng tông với Sữa: mũ len 2 quả bông, mèo bông mắt cúc, cục phồng chăn, áo len cuộn trên ghế, dép tai mèo, cuộn tất. Nhân vật khum tay gọi, bong bóng cạnh đầu. Sữa cuộn trong giỏ cùng màu với tất.
- `art/out/demo/l2_demo_reveal.png`: tất kẻ sọc ở đầu giường, chấm bi trên vành chao đèn, tất trắng to trên núm tủ. Sữa cuộn trong giỏ hé một mắt, có bong bóng ngủ. Bong bóng góc trên trái là mặt Sữa.
- Tự nhận xét:
  - Trong `l2_demo_start`, tai và mặt Sữa trong giỏ hơi dễ thấy. Khi vẽ tờ giỏ sẽ dặn lẫn hơn.
  - Nhân vật đi dép có tai mèo, dễ lẫn với dép ngụy trang. Khi vẽ `player_wear_beanie` sẽ dùng dép bông trơn như `player_ref`.
  - Kệ có thêm chậu cây leo, chỉ để trang trí trong nền.

**A2-4. Dev lưu ý:**
- **Đổi key:** `sua_one_eye_open` → `l2_sock_basket_one_eye`, `sua_yawn` → `l2_sock_basket_yawn`. Sữa cuộn trong giỏ vẽ liền với giỏ, cùng khung với `_reveal`, đổi ảnh không giật. Dev sửa states Level 2 theo bảng key mục 1.
- **Bảng vị trí mục 6 là tạm.** Tranh demo đặt đồ hơi khác, ví dụ móc mũ len cao sát dải giao diện y≈130, giỏ ở khoảng (760,1300). Sau khi chủ dự án duyệt, Dev đo lại theo tranh như Z5 level 1. Mũ len nên hạ xuống để vùng chạm không đè dải giao diện.
- **Vùng chạm:** đồ ngụy trang rộng ~180–220 nên đủ 115. Tất bay và hộp giày nhỏ, code nới vùng chạm.
- **Manh mối G2-2:** chỉ giỏ `breathe` rất nhẹ từ đầu; đồ ngụy trang đứng yên tuyệt đối.
- **Vệt nắng khi mở rèm:** code vẽ, như level 1.
- **Mũ len:** `l2_coat_hook` là sprite riêng, nền không có móc.

---

## Vòng 1 – Dev

**Đã có trong `game/`.**
- Cấu trúc nhiều màn: `src/base.js` là phần chung (giao diện ♥, bong bóng nhiệm vụ, nút 💡, tay hướng dẫn, nhân vật phản ứng, mở màn, cảnh bế, màn thưởng, nạp ảnh theo màn). `src/level1.js` và `src/level2.js` chỉ chứa phần riêng.
- Ảnh tải theo từng màn: phần chung tải lúc khởi động, ảnh riêng của mỗi màn tải khi vào màn.
- Màn thưởng level 1 chạm để sang level 2 (♥ 2/4, 15 cá); màn thưởng level 2 chạm để về level 1 (G2-6). Vào thẳng level 2 khi thử: `?level=2`.
- Khung level 2 chạy hết luồng bằng ảnh tạm vẽ khối:
  - giỏ chạm 3 lần, mỗi lần cách ≥ 0,4 giây, 3 chiếc tất bay tới đầu giường, vành chao đèn, núm tủ;
  - 6 đồ ngụy trang giữ trạng thái sau khi chạm, cùng tủ, hộp giày, gầm giường, chao đèn, rèm;
  - lộ diện theo G2-4, cảnh bế, thưởng.
- Có ảnh thật trong `art/out/level2/` thì game tự dùng. Vị trí đọc từ bảng vị trí mục 6 của design-art.
- Đã đổi theo A2-4: dùng `l2_sock_basket_one_eye` và `l2_sock_basket_yawn` (đổi ảnh giỏ, cùng khung với `_reveal`).

**Yêu cầu cho Art 2D (theo kinh nghiệm level 1):**
- **DL2-1. Giỏ:**
  - `_full`, `_2`, `_3`, `_reveal`, `_one_eye`, `_yawn` cùng một nhóm, cùng khung, neo đáy. Thân giỏ trùng khít giữa các ảnh, chỉ phần tất/Sữa thay đổi.
  - Code cho cả giỏ phập phồng (scaleY 1→1,025), nên không vẽ gì nằm ngoài giỏ (bóng sàn, tất rơi bên cạnh).
- **DL2-2. Ba chiếc tất bay:** neo tâm, ảnh nằm phẳng. Code tự xoay khi bay và khi vắt.
  - Nếu muốn trông như đang vắt thì thêm `l2_sock_dotted_hung` (gập đôi trên vành đèn) và `l2_sock_white_big_hung` (vắt trên núm tủ); chưa có thì dùng ảnh phẳng.
- **DL2-3. Chao đèn:** neo **đỉnh ở điểm treo trên trần** (code đung đưa quanh điểm này). Dây vẽ dài lên tới mép trên ảnh, để màn dài (nền kéo dài lên trên) vẫn thấy dây nối lên trần. Tất chấm bi đáp ở vành dưới chao đèn.
- **DL2-4. Tủ:** `_closed` và `_open` cùng khung, neo đáy. Núm tủ ở đúng giữa hai cánh, khoảng 50% chiều cao tủ, vì code đặt tất trắng to vào đó. Ghi toạ độ núm vào bảng vị trí nếu khác.
- **DL2-5. Giường:**
  - `_flat` và `_flipped` cùng khung. Gầm giường tối nằm trong ảnh giường, để `l2_slipper` (lớp sau giường) trượt ra từ gầm.
  - Đầu giường bên trái: tất kẻ sọc đáp vào đó.
- **DL2-6. Mũ len:** `_idle` treo trên móc thì neo **đỉnh** (chỗ móc); `_floor` neo đáy. Nên hạ móc xuống dưới y≈250, tránh dải giao diện (A2-4).
- **DL2-7. Đồ ngụy trang:** mỗi cặp idle/after cùng khung, neo đáy; rộng ~180–220 như A2-4. Riêng `l2_sock_ball` → `l2_sock_unrolled` thì code cho lăn sang trái 200px rồi mới đổi ảnh, nên `_unrolled` neo đáy giữa và không cần cùng khung.
- **DL2-8. Kệ:** kệ nằm trong nền (đồng ý A2-3). Ghi vị trí đáy mèo bông trên kệ vào bảng vị trí.
- **DL2-9. Nhân vật đội mũ:** `player_wear_beanie` cùng nhóm, cùng cỡ đầu, chân trên cùng đường đáy với các tư thế nhân vật level 1. Chưa có thì code dùng `player_surprised`.

**Điểm vướng trong `levels/` Level 2, cần GD chốt rồi Dev sửa levels/states:**
- **VL2-1.** Thang gợi ý trong `levels-01-10.md` (giây 8/16: tai giật, lấp lánh) trái với G2-2. Game đang làm theo G2-2: giỏ thở từ đầu, không gợi ý theo giờ, 💡 chỉ vào giỏ.
- **VL2-2.** Mở màn: states ghi Sữa chạy "từ phải sang trái, khuất sau giường"; G2-3 ghi "biến mất sau giường rồi vào giỏ". Giường bên trái, giỏ bên phải, nên chạy phải→trái khuất sau giường thì không vào được giỏ.
  - Đề xuất: Sữa chạy từ trái sang phải, nhảy vào giỏ, giỏ nhún một cái và vài chiếc tất bay lên rơi xuống.
  - Hiện game làm theo states (chạy sang trái, khuất sau giường).
- **VL2-3.** "Chạm Sữa khi mới lộ một phần (sau lần 2): Sữa giật tai, rúc sâu hơn": trước lần 3 không có vùng chạm Sữa riêng (chạm giỏ = thêm một chiếc tất). Đề xuất bỏ dòng này.
- **VL2-4.** Âm nền "tiếng ngáy to dần mỗi lần một chiếc tất bay ra" cần key mới `sua_sfx_snore` (vòng lặp). Hiện chưa làm.
- **VL2-5.** States còn ghi `l2_shelf` (sprite kệ) và `sua_one_eye_open` / `sua_yawn`. Theo design-art mới: kệ nằm trong nền; hai tư thế Sữa đổi thành `l2_sock_basket_one_eye` / `_yawn`.

---

## GD chốt các điểm vướng (VL2-1…VL2-5)

- **VL2-1:** theo G2-2 (giỏ thở từ đầu, không gợi ý theo giờ, 💡 chỉ giỏ). Dev sửa thang gợi ý trong levels.
- **VL2-2 (mở màn):** không cho người chơi thấy Sữa vào giỏ (sẽ lộ đáp án). Sữa chạy vụt **từ trái sang phải** dọc phía sau phòng (quay mặt sang phải), **khuất sau ghế** (ghế đứng ngay trên giỏ), không hiện ra nữa. Giỏ khẽ nhún một cái lúc Sữa khuất, rất nhẹ.
- **VL2-3:** bỏ dòng "chạm Sữa khi mới lộ một phần".
- **VL2-4:** làm tiếng ngáy tổng hợp `sua_sfx_snore` (lặp, rất nhỏ, dễ thương), to dần sau mỗi chiếc tất bay ra.
- **VL2-5:** Dev sửa states theo design-art mới (kệ trong nền, `l2_sock_basket_one_eye` / `_yawn`).
- **Thêm (PM thấy ở demo):** cục phồng dưới chăn phải rõ; nhân vật không đi dép tai mèo (tránh nhầm với dép ngụy trang); Sữa trong giỏ lúc đầu phải lẫn hẳn vào tất.

---

**A2-5. Vẽ lại 2 tranh demo** (2 lượt Codex, ghi đè; bản trước lưu ở `art/out/_refs/l2_demo_*_v1.png`):
- **`l2_demo_start` đạt 4/5 điểm:**
  - Sữa trong giỏ lẫn hẳn vào tất: không thấy mặt, mắt, chỉ là một khối tròn trắng to hơn các cuộn tất.
  - Gò tròn dưới chăn rõ hơn.
  - Nhân vật đi dép bông vàng trơn.
  - Thêm Sữa vụt chạy sang phải, sắp khuất sau ghế, có vệt gió; nhỏ, không rối.
- **Chưa đạt: móc mũ len chỉ hạ được ~20px** (thanh móc y≈145–180, mũ tới y≈275). AI không hạ thêm vì ngay dưới là thanh rèm và cửa sổ (x 55–520). Muốn hạ thật thì cả cửa sổ phải dịch xuống. Trong game Dev đặt móc bằng bảng vị trí (sprite riêng), nên đề nghị hạ móc tới y≈270 và dịch cửa sổ, rèm xuống khi làm nền. Không dùng lượt dự phòng.
- **`l2_demo_reveal`:** cùng bố cục với bản start mới, gò chăn rõ, 3 chiếc tất ở đầu giường, vành chao, núm tủ; Sữa trong giỏ hé một mắt. Gần như giống bản trước, móc mũ cũng còn cao.

## Chủ dự án thêm điểm đánh lừa – GD chốt G2-7

Thêm những chỗ **nhìn qua thấy tai, chân hay đuôi mèo** nhưng chạm vào thì không phải. Mỗi chỗ một phản ứng vui, đã chạm thì giữ trạng thái sau.
1. **Gầm giường:** thò ra một **"bàn chân mèo" trắng** (thật ra là góc tấm thảm lông trắng tròn, có 4 túm lông như đệm chân). Chạm → kéo ra **tấm thảm lông trắng nhỏ**, trượt ra sàn. Thay cho chiếc dép trượt ra cũ.
2. **Hộp giày trên nóc tủ:** nắp hộp hé, **hai cái tai mèo nhọn** thò lên. Chạm → hộp bật nắp, hóa ra là **chiếc mũ len có tai mèo** (màu hồng nhạt, khác mũ len trắng trên móc), mũ nảy lên rồi rơi lại vào hộp.
3. **Chăn có gò và gối:** lật ra **không có gì** (chỉ gối trắng / nệm trống), nhân vật nhún vai.
4. **Tủ quần áo:** mở cánh chỉ thấy **quần áo gấp ngăn nắp** từng ngăn (không treo), đóng lại.
5. **Dây buộc rèm:** một dây buộc rèm bông trắng thò xuống như **đuôi mèo**. Chạm → dây đung đưa, rèm khẽ lay.
Các đồ ngụy trang cũ (mèo nhồi bông, mũ len trắng, cuộn tất, áo len, dép tai mèo) giữ nguyên. Chỉ giỏ tất thở (G2-2).

---

## Chủ dự án đổi – GD chốt G2-8 (thay G2-2 và luồng 3 lần chạm)

- **Chạm giỏ tất 6 lần** mới lộ Sữa. Mỗi lần một chiếc tất bay ra (cách nhau tối thiểu 0,4 giây), đáp ở 6 chỗ và nằm yên tới hết màn: đầu giường, vành chao đèn, núm tủ, lưng ghế, kệ cạnh mèo nhồi bông, thanh rèm.
- **6 chiếc tất khác nhau:** sọc hồng, chấm bi xanh, trắng to (đã có) + 3 chiếc mới: tất vàng có hình ngôi sao, tất em bé xanh bạc hà nhỏ xíu, tất dài sọc tím oải hương. Key mới: `l2_sock_star`, `l2_sock_baby`, `l2_sock_long`.
- **Giỏ tĩnh hoàn toàn**, bỏ phập phồng. Ảnh giỏ đổi ở lần chạm 2 (`_2`) và 4 (`_3`), lần 6 sang `_reveal`; các lần lẻ chỉ có tất bay ra, giỏ khẽ nảy một nhịp như mọi đồ khi chạm.
- Không có gợi ý tự động; nút 💡 chỉ vào giỏ. Tiếng ngáy to dần theo số tất đã bay ra (6 nấc).

---

## Vòng 2 – Art 2D

Đã tách toàn bộ asset level 2 theo `design-art-level2.md` (đã cập nhật G2-7, G2-8 và key Dev dùng). **10 lượt Codex**, không vẽ lại lượt nào, không gặp hết hạn mức. Mỗi tờ cắt ngay bằng `sheet_cut.py`; `anchors.json` có đủ 38 key sprite level 2. Nền không cần neo.

**Bảng key** (tất cả **đã xuất**, ở `art/out/level2/` trừ khi ghi khác):

| Tờ | Key |
|---|---|
| ảnh lẻ | `l2_bg_bedroom` |
| `l2_basket_sheet` | `l2_sock_basket_full`, `_2`, `_3`, `_reveal`, `_one_eye`, `_yawn` |
| `l2_socks_sheet` | `l2_sock_striped`, `_dotted`, `_white_big`, `_star`, `_baby`, `_long` (G2-8), `l2_sock_ball`, `l2_sock_unrolled` |
| `l2_decoy_sheet` | `l2_plush_cat`, `_fallen`, `l2_coat_hook`, `l2_beanie_white_idle`, `_floor` |
| `l2_chair_sheet` | `l2_chair`, `l2_sweater_rolled`, `_unrolled`, `l2_slippers_cat_idle`, `_after` |
| `l2_bed_sheet` | `l2_bed_blanket_flat`, `_flipped`, `l2_fur_rug`, `l2_fur_rug_peek` |
| `l2_wardrobe_sheet` | `l2_wardrobe_closed`, `_open` (quần áo gấp), `l2_ceiling_lamp` |
| `l2_props_sheet` | `l2_shoebox_ears`, `l2_shoebox_open`, `l2_beanie_pink_cat`, `l2_curtain_tie` |
| `l2_curtain_sheet` | `l2_curtain_closed`, `_open` |
| `player_beanie_sheet` | `player_wear_beanie` (`player/`) |

Còn thiếu: không. Đã bỏ `l2_slipper` và `l2_shoebox` cũ.

**Dev lưu ý:**
- **Key G2-7 theo tên Dev:** `l2_fur_rug`, `l2_shoebox_ears`, `l2_shoebox_open`, `l2_beanie_pink_cat`, `l2_curtain_tie`.
  - Có thêm ảnh riêng **`l2_fur_rug_peek`**: một góc thảm lông, mép trên phẳng để khuất dưới mép giường, mép dưới có 4 túm như đệm ngón chân mèo. Ảnh neo đáy, hiển thị rộng 120.
  - Cả tấm `l2_fur_rug` cũng có 4 túm ở một mép.
- **Nền:** cửa sổ đã dời xuống. Thanh rèm thực tế ở y≈360 (x 52–571, tâm x≈312); cửa sổ khung ~x 90–525, y 380–720. Tường trên cửa sổ trống, đủ chỗ cho móc mũ len ở y≈215–270.
  - Bảng vị trí đã sửa: móc (300, 215), mũ (300, 240), rèm (312, 362), rèm rộng 470.
  - Các vị trí khác vẫn là ước lượng, Dev đo lại theo tranh demo.
- **Giỏ:** 6 ảnh cùng khung, neo đáy. Ở `_full`, `_2`, `_3` Sữa lẫn hẳn vào tất, không thấy mặt. `_full` có 4 tất màu nằm trên cùng, `_2` mất sọc hồng và chấm bi, `_3` mất ngôi sao và sọc tím.
- **Tờ tất:** AI vẽ chiếc sọc hồng và chiếc chấm bi dính nhau. Tôi tách bằng script, dời 2 chiếc sang trái 12px; bản gốc ở `art/out/_refs/l2_socks_sheet_raw.png`. Ô đã sửa theo ảnh.
- **Đèn chao:** dây treo khá ngắn (neo ở đầu dây, hiển thị cao 330). Nếu cần dây dài tới trần thì code vẽ thêm dây.
- **`player_wear_beanie`:** cao 700 tính cả mũ và quai, người tương đương các tư thế cao 580. Đi dép bông trơn.
- **Ô tờ:** đã sửa theo chỗ AI thực vẽ (như level 1), nên cắt lại từ design-art ra đúng.

---

## Chủ dự án góp ý sau khi chơi level 2 online (PM ghi lại) – O2-1…O2-9

**Art 2D:**
- **O2-1. Màu và style level 2 đang lệch level 1.** Vẽ lại các asset level 2 (và nền) **đúng nét chì màu, độ tươi, chất giấy như level 1**: mỗi lượt Codex đính kèm ảnh level 1 làm mẫu (`art/out/demo/l1_demo_reveal.png`, `art/out/level1/l1_bg_living_room.png`, vài sprite level 1 như `l1_box_closed.png`, `l1_pillow_white_idle.png`) và ghi rõ "vẽ đúng nét chì màu và màu như ảnh mẫu".
- **O2-2. Hộp trên nóc tủ** lệch góc nhìn và style với tủ: vẽ cùng góc nhìn chính diện hơi từ trên xuống như tủ, cùng nét.
- **O2-3. Quần áo trong tủ** lệch style: vẽ lại cùng nét chì, màu pastel như phần còn lại.

**Dev:**
- **O2-4.** Bỏ cảnh Sữa chạy lướt qua lúc mở màn level 2.
- **O2-5.** Tấm thảm lông dưới giường đang nằm dưới cả bóng gầm giường: đưa lên lớp trên bóng giường (vẫn trông như thò ra từ gầm).
- **O2-6.** Dây buộc rèm (đuôi mèo ở cửa sổ) phải nằm **sau rèm**.
- **O2-7.** Áo len đặt **giữa mặt ghế**.
- **O2-8.** Tủ hơi cao so với nền: hạ/thu cho chân tủ đứng đúng sàn, tỉ lệ hợp phòng. Đèn **hơi to**: thu nhỏ. Giường **hơi thấp**: nâng lên.

---

## Vòng 3 – Art 2D (O2-1…O2-3: vẽ lại theo chất liệu level 1)

**11 lượt Codex**, không gặp hết hạn mức. Bản cũ (tờ và nền) giữ ở `art/out/_refs/l2_v1/`.
- **Nền: 2 lượt.**
  - Lượt 1 sửa từ nền cũ: gần như không đổi (tường hồng vẫn đậm, vân ngoằn ngoèo), coi là hỏng.
  - Lượt 2 vẽ mới theo chất liệu `l1_bg_living_room` (tường hồng rất nhạt gần kem, mịn, sàn và khung cửa gỗ mật ong như level 1), giữ bố cục cũ. Thanh rèm giờ ở y≈340 (x 43–568).
- **Tờ thử trước:** `l2_wardrobe_sheet`, đặt cạnh nền level 1. Tủ gỗ mật ong, quần áo gấp cùng nét chì pastel (O2-3). Đạt, nên vẽ tiếp.
- **8 tờ còn lại, mỗi tờ 1 lượt:** props, basket, socks, decoy, chair, bed, curtain, player_beanie.
  - Mỗi lượt đính kèm tờ level 2 cũ (giữ hình dạng, bố cục), `l1_demo_reveal` và 1 sprite level 1 cùng loại (gối trắng, rèm, hộp, tư thế nhân vật). Ghi rõ "giữ hình dạng level 2, vẽ đúng nét chì màu và màu như mẫu level 1".
  - Hộp giày (O2-2) giờ nhìn chính diện như tủ.
- **Giữ nguyên** key, nhóm, neo, cỡ hiển thị. Chỉ sửa ô cho khớp chỗ AI vẽ ở `l2_props_sheet`, `l2_socks_sheet`, `l2_chair_sheet`.
- **Tất và ghế:** AI vẽ sát nhau, nên sau khi cắt tôi xoá mảnh lạc của vật bên cạnh (giữ thành phần lớn nhất). `anchors.json` đã cập nhật.
- **Ảnh so sánh** (level 1, nền level 2 cũ, level 2 mới ghép tạm): `C:\Users\ADMIN\AppData\Local\Temp\claude\D--WebGames-Cat3D\74bbc2ec-a62f-4e91-a629-50f0963f00d3\scratchpad\l2_style_compare.jpg`.
  - Vị trí trong ảnh ghép lấy theo bảng vị trí tạm, chưa đúng game.
  - Còn lại: chao đèn vàng hơi đậm hơn level 1.

---
