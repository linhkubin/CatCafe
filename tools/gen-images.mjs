// Sinh ảnh từ art/assets.json bằng OpenAI Images API.
// Cách chạy:
//   node tools/gen-images.mjs              -> vẽ các asset chưa có file
//   node tools/gen-images.mjs --dry        -> chỉ in prompt, không gọi API (miễn phí)
//   node tools/gen-images.mjs --only cat_sua_ref,item_pate_can
//   node tools/gen-images.mjs --force      -> vẽ lại cả asset đã có
// Cần biến môi trường OPENAI_API_KEY. Đổi model bằng OPENAI_IMAGE_MODEL (mặc định gpt-image-1).

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SPEC = path.join(ROOT, "art", "assets.json");
const OUT = path.join(ROOT, "art", "out");
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
const API = "https://api.openai.com/v1/images";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const force = args.includes("--force");
const onlyIdx = args.indexOf("--only");
const only = onlyIdx >= 0 ? args[onlyIdx + 1].split(",") : null;

const exists = (p) => access(p).then(() => true, () => false);

async function generate(asset, prompt, opts, key) {
  const headers = { Authorization: `Bearer ${key}` };
  let res;

  if (asset.ref) {
    // Có ảnh tham chiếu: dùng endpoint edits để giữ nhân vật giống nhau.
    const refPath = path.join(OUT, asset.ref);
    if (!(await exists(refPath))) throw new Error(`thiếu ảnh tham chiếu ${asset.ref}, hãy vẽ nó trước`);
    const form = new FormData();
    form.append("model", MODEL);
    form.append("prompt", prompt);
    form.append("size", opts.size);
    form.append("quality", opts.quality);
    form.append("background", opts.background);
    form.append("image[]", new Blob([await readFile(refPath)], { type: "image/png" }), path.basename(refPath));
    res = await fetch(`${API}/edits`, { method: "POST", headers, body: form });
  } else {
    res = await fetch(`${API}/generations`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, prompt, n: 1, ...opts }),
    });
  }

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || `HTTP ${res.status}`);
  return Buffer.from(json.data[0].b64_json, "base64");
}

async function main() {
  const spec = JSON.parse(await readFile(SPEC, "utf8"));
  const key = process.env.OPENAI_API_KEY;
  if (!dry && !key) {
    console.error("Chưa có OPENAI_API_KEY. Xem art/HUONG-DAN.md bước 2.");
    process.exit(1);
  }

  let done = 0, skipped = 0, failed = 0;
  for (const asset of spec.assets) {
    if (only && !only.includes(asset.name)) continue;

    const file = path.join(OUT, asset.folder || "", `${asset.name}.png`);
    if (!force && (await exists(file))) { skipped++; continue; }

    const prompt = `${asset.prompt}\n\nArt style: ${spec.style}`;
    const opts = {
      size: asset.size || spec.defaults.size,
      quality: asset.quality || spec.defaults.quality,
      background: asset.background || spec.defaults.background,
    };

    if (dry) {
      console.log(`\n== ${asset.name} (${opts.size}, ${opts.quality}, ${opts.background}${asset.ref ? ", ref " + asset.ref : ""})\n${prompt}`);
      continue;
    }

    process.stdout.write(`Đang vẽ ${asset.name}... `);
    try {
      const png = await generate(asset, prompt, opts, key);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, png);
      console.log(`xong -> ${path.relative(ROOT, file)}`);
      done++;
    } catch (err) {
      console.log(`LỖI: ${err.message}`);
      failed++;
    }
  }

  if (!dry) console.log(`\nVẽ mới ${done}, bỏ qua ${skipped} (đã có), lỗi ${failed}.`);
}

main();
