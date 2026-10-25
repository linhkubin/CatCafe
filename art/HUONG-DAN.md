# Hướng dẫn sinh ảnh bằng OpenAI

## Cách chính: Codex làm artist (dùng gói ChatGPT, không cần API key)

Codex CLI đã cài và đăng nhập bằng tài khoản ChatGPT. Mỗi ảnh trừ vào hạn mức Codex của gói, không tốn tiền API.

- Quy tắc vẽ cho Codex: `AGENTS.md` ở gốc dự án.
- Đặc tả: `art/style.md` và `art/design-art-level<N>.md` (tên file, key, kích thước, nền, mô tả).
- Giao việc:

```powershell
node tools/codex-draw.mjs sua_ref                         # vẽ một ảnh theo key
node tools/codex-draw.mjs --level 1                       # vẽ mọi ảnh level 1 chưa có
node tools/codex-draw.mjs sua_ref --redo --note "nhẹ màu hơn"   # vẽ lại kèm góp ý
node tools/codex-draw.mjs --level 1 --dry                 # xem trước, không vẽ
```

Ảnh lưu vào `art/out/...`, nhật ký ở `art/out/_logs/<key>.txt`. Vẽ ảnh tham chiếu (`sua_ref`, `mun_ref`, `player_ref`) trước, vì các tư thế nhân vật dùng chúng để giữ nhân vật giống nhau.

Lưu ý: không đặt biến `OPENAI_API_KEY` khi dùng cách này nếu không muốn bị tính tiền API.

---

## Cách dự phòng: script gọi API (tốn tiền API)

Các file liên quan:
- `art/assets.json`: đặc tả. Bạn viết mô tả từng asset ở đây.
- `tools/gen-images.mjs`: script đọc đặc tả, gọi OpenAI, lưu PNG.
- `art/out/`: ảnh được lưu ở đây, chia theo thư mục `cats/`, `items/`, `backgrounds/`.

## Bước 1. Tạo API key

1. Vào https://platform.openai.com và đăng nhập (dùng được tài khoản ChatGPT).
2. Vào **Settings → Billing**, nạp tiền (ví dụ 5 USD). API tính phí riêng, gói ChatGPT Plus không dùng được cho API.
3. Nếu bị yêu cầu, vào **Settings → Organization → General** để xác minh tổ chức (Verify Organization). Model ảnh `gpt-image-1` cần bước này.
4. Vào **API keys → Create new secret key**, copy key (bắt đầu bằng `sk-...`). Key chỉ hiện một lần.

Không gửi key cho ai và không dán key vào file trong project.

## Bước 2. Lưu key vào máy

Mở PowerShell và chạy (thay bằng key của bạn):

```powershell
setx OPENAI_API_KEY "sk-..."
```

Sau đó **đóng và mở lại** terminal (hoặc khởi động lại Claude app) để biến mới có hiệu lực.

## Bước 3. Chạy thử không tốn tiền

```powershell
node tools/gen-images.mjs --dry
```

Lệnh này chỉ in ra prompt sẽ gửi đi, để bạn đọc và sửa đặc tả trước.

## Bước 4. Vẽ ảnh đầu tiên

Nên vẽ ảnh tham chiếu nhân vật trước:

```powershell
node tools/gen-images.mjs --only cat_sua_ref
```

Mở `art/out/cats/cat_sua_ref.png` để xem. Nếu chưa ưng, sửa `prompt` hoặc `style` trong `assets.json` rồi vẽ lại:

```powershell
node tools/gen-images.mjs --only cat_sua_ref --force
```

## Bước 5. Vẽ phần còn lại

```powershell
node tools/gen-images.mjs
```

Script bỏ qua ảnh đã có, chỉ vẽ ảnh mới. Asset nào có `ref` sẽ dùng ảnh tham chiếu đó để giữ nhân vật giống nhau (ví dụ `cat_sua_sit` dùng `cat_sua_ref.png`).

## Cách viết đặc tả trong `assets.json`

```json
{
  "name": "item_yarn_ball",          // tên file, không dấu, không khoảng trắng
  "folder": "items",                 // thư mục con trong art/out
  "prompt": "A pink ball of yarn...", // mô tả, viết tiếng Anh cho kết quả tốt hơn
  "size": "1024x1024",               // 1024x1024 | 1536x1024 (ngang) | 1024x1536 (dọc)
  "quality": "medium",               // low | medium | high (cao hơn thì đắt hơn)
  "background": "transparent",       // transparent cho sprite, opaque cho nền
  "ref": "cats/cat_sua_ref.png"      // tùy chọn: ảnh tham chiếu để giữ nhân vật
}
```

Chỉ cần `name` và `prompt`, các trường khác lấy từ `defaults`. File JSON không cho phép ghi chú `//`, ví dụ trên chỉ để giải thích.

Mẹo:
- `style` ở đầu file được nối vào mọi prompt, sửa một chỗ là đổi phong cách cả bộ.
- Game không có chữ, nên style đã ghi "no text". Nhãn, biển hiệu thì mô tả bằng hình (ví dụ "picture of a fish on the label").
- Thử bằng `quality: "low"` cho rẻ, ưng rồi mới vẽ lại bằng `medium` hoặc `high`.
- Giá mỗi ảnh xem tại https://openai.com/api/pricing (mục Image generation).

## Lỗi thường gặp

| Thông báo | Cách xử lý |
|---|---|
| `Chưa có OPENAI_API_KEY` | Làm lại bước 2, nhớ mở lại terminal |
| `Incorrect API key` | Key sai hoặc đã bị xóa, tạo key mới |
| `must be verified` | Làm bước 1.3 (Verify Organization) |
| `billing` / `quota` | Nạp thêm tiền ở Billing |
| `thiếu ảnh tham chiếu` | Vẽ asset `..._ref` trước |
| Bị từ chối do nội dung | Viết lại prompt nhẹ nhàng hơn |
