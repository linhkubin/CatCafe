// Giao việc vẽ cho Codex (artist), trừ vào hạn mức gói ChatGPT, không cần API key.
// Quy tắc vẽ cho Codex nằm ở AGENTS.md. Đặc tả lấy từ art/style.md và art/design-art-level*.md.
// Cách chạy:
//   node tools/codex-draw.mjs sua_ref                   -> vẽ một asset theo key
//   node tools/codex-draw.mjs l1_box_closed l1_box_open_empty
//   node tools/codex-draw.mjs --level 1                 -> vẽ mọi asset level 1 chưa có file
//   node tools/codex-draw.mjs sua_ref --redo --note "nhẹ màu hơn"   -> vẽ lại, kèm góp ý
//   node tools/codex-draw.mjs --level 1 --dry           -> chỉ in danh sách và lời giao việc
// Vẽ theo tờ (bảng tờ: | Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét | trong design-art):
//   node tools/codex-draw.mjs --sheet l1_pate_sheet --ref art/out/demo/test_pate_can_sheet.png,art/out/_sheets/l1_cushion_sheet.png
//   -> Codex vẽ art/out/_sheets/l1_pate_sheet.png, xong thì tự chạy tools/sheet_cut.py cut để cắt ra từng key
//      (thêm --no-cut để không cắt). Dùng chung được --redo, --note, --dry.
//   --stroke-ref <ảnh>=<tỉ lệ>: thêm câu so nét "viền ngoài dày khoảng <tỉ lệ> lần viền trong <ảnh>"
//      (Y4: AI làm theo kiểu so sánh tốt hơn số px). Ảnh này nên có cả trong --ref.
// Nhật ký từng lần vẽ lưu ở art/out/_logs/<key hoặc tờ>.txt.

import { readFile, readdir, mkdir, access } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ART = path.join(ROOT, "art");
const OUT = path.join(ART, "out");
const LOGS = path.join(OUT, "_logs");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const dry = flag("--dry");
const redo = flag("--redo");
const note = option("--note");
const level = option("--level");
const sheet = option("--sheet");
const refs = (option("--ref") || "").split(",").filter(Boolean);
const noCut = flag("--no-cut");
const strokeRef = option("--stroke-ref"); // "<ảnh>=<tỉ lệ>", ví dụ art/out/cats/sua_ref.png=0.5
const VALUE_OPTS = ["--note", "--level", "--sheet", "--ref", "--stroke-ref"];
const keys = args.filter((a, i) => !a.startsWith("--") && !VALUE_OPTS.includes(args[i - 1]));

const exists = (p) => access(p).then(() => true, () => false);

// Đọc mọi dòng bảng có dạng | `thư_mục/key.png` | `key` | ... trong các file đặc tả.
async function loadAssets() {
  const files = (await readdir(ART)).filter((f) => f === "style.md" || /^design-art-level\d+\.md$/.test(f));
  const assets = new Map();
  for (const specFile of files) {
    const text = await readFile(path.join(ART, specFile), "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/\|\s*`([\w/]+\/(\w+)\.png)`\s*\|\s*`(\w+)`\s*\|/);
      if (m && m[2] === m[3] && !assets.has(m[3])) assets.set(m[3], { key: m[3], file: m[1], spec: specFile });
    }
  }
  return assets;
}

function brief(asset) {
  const where = asset.spec === "style.md" ? "art/style.md" : `art/style.md (phong cách, nhân vật) và art/${asset.spec}`;
  const lines = [
    `Vẽ asset \`${asset.key}\` cho game, theo đúng quy tắc trong AGENTS.md.`,
    `- Đặc tả: ${where} (tìm dòng có key \`${asset.key}\` và đoạn mô tả chi tiết của nó).`,
    `- Lưu vào: art/out/${asset.file}`,
  ];
  if (redo) lines.push("- Được phép ghi đè file đã có.");
  if (note) lines.push(`- Góp ý từ lần trước: ${note}`);
  return lines.join("\n");
}

// Đọc các "bảng tờ" (tiêu đề có cột Tờ, Ô, Key, Thư mục) trong style.md và design-art-level*.md.
async function loadSheetRows(name) {
  const files = (await readdir(ART)).filter((f) => f === "style.md" || /^design-art-level\d+\.md$/.test(f));
  const rows = [];
  for (const specFile of files) {
    const text = await readFile(path.join(ART, specFile), "utf8");
    let head = null;
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line.startsWith("|")) { head = null; continue; }
      const cells = line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim().replace(/`/g, ""));
      if (!head) { head = cells.map((c) => c.normalize("NFC").toLowerCase()); continue; }
      if (cells.every((c) => !c || /^:?-{2,}:?$/.test(c))) continue;
      if (!["tờ", "ô", "key", "thư mục"].every((h) => head.includes(h))) continue;
      const row = Object.fromEntries(head.map((h, i) => [h, cells[i] || ""]));
      if (row["tờ"] === name) rows.push({ ...row, spec: specFile });
    }
  }
  return rows;
}

function sheetBrief(name, rows) {
  const cells = rows.map((r) => r["ô"].split(",").map(Number));
  const w = Math.max(...cells.map(([x, , cw]) => x + cw));
  const h = Math.max(...cells.map(([, y, , ch]) => y + ch));
  const lines = [
    `Vẽ TỜ \`${name}\` (chế độ vẽ theo tờ), theo đúng quy tắc trong AGENTS.md.`,
    `- Đặc tả: art/style.md (phong cách, nhân vật) và art/${rows[0].spec} (bảng tờ \`${name}\` và mô tả chi tiết từng key trong tờ).`,
    `- Lưu vào: art/out/_sheets/${name}.png, cỡ ${w}x${h}, nền trong suốt. Gọi image_gen MỘT lần cho cả tờ, chép nguyên ảnh, không tự cắt hay xử lý.`,
    `- Các ô (x,y,w,h theo px trong tờ):`,
    ...rows.map((r) => `  - ô ${r["ô"]}: \`${r.key}\`${r["neo"] ? `, neo ${r["neo"]}` : ""}${r["nét"] ? `, viền ngoài chỗ đậm nhất ~${r["nét"]}px` : ""}`),
    `- Mỗi thứ nằm trọn trong ô của nó, cách mép ô ít nhất 40px, không chạm sang ô khác. Các trạng thái của cùng một đồ vật: phần không đổi giống hệt nhau, cùng cỡ, cùng góc nhìn.`,
    `- Nét (style.md mục 1): số px ở từng ô là độ dày **đường viền ngoài ở chỗ đậm nhất** (chỗ khuất, chỗ gập). Phần lớn đường viền mảnh hơn (khoảng 60% số đó), đầu nét nhọn dần; nét lông và chi tiết bên trong mảnh hơn nữa. Không vẽ một đường đều dày kiểu vector.`,
  ];
  if (strokeRef) {
    const [img, ratio] = strokeRef.split("=");
    lines.push(`- So nét với ảnh đính kèm ${img}: viền ngoài của tờ này dày khoảng ${ratio || "1"} lần viền ngoài trong ảnh đó (mở ảnh bằng view_image để so).`);
  }
  if (refs.length) lines.push(`- Ảnh tham chiếu, mở bằng view_image trước khi vẽ: ${refs.join(", ")}`);
  if (redo) lines.push("- Được phép ghi đè file đã có.");
  if (note) lines.push(`- Góp ý từ lần trước: ${note}`);
  return lines.join("\n");
}

function run(cmd, cmdArgs) {
  return new Promise((resolve) => {
    const child = spawn(cmd, cmdArgs, { cwd: ROOT, shell: true, stdio: "inherit" });
    child.on("close", resolve);
  });
}

async function drawSheet() {
  const rows = await loadSheetRows(sheet);
  if (!rows.length) {
    console.error(`Không thấy bảng tờ nào có Tờ = ${sheet} trong art/style.md hoặc art/design-art-level*.md.`);
    process.exit(1);
  }
  const target = path.join(OUT, "_sheets", `${sheet}.png`);
  const prompt = sheetBrief(sheet, rows);
  if (dry) { console.log(`\n== ${sheet}\n${prompt}`); return; }
  if (!redo && (await exists(target))) {
    console.log(`Đã có art/out/_sheets/${sheet}.png (thêm --redo để vẽ lại).`);
  } else {
    await mkdir(LOGS, { recursive: true });
    console.log(`\n=== Codex đang vẽ tờ ${sheet} -> art/out/_sheets/${sheet}.png`);
    const code = await runCodex(prompt, path.join(LOGS, `${sheet}.txt`));
    if (code !== 0 || !(await exists(target))) {
      console.log(`LỖI: chưa có tờ (mã thoát ${code}), xem art/out/_logs/${sheet}.txt`);
      process.exit(1);
    }
  }
  if (noCut) return;
  console.log(`\n=== Cắt tờ ${sheet}`);
  // Không dùng cờ -I: script cần import numpy/Pillow từ môi trường thường.
  const code = await run("python", ["tools/sheet_cut.py", "cut", `art/${rows[0].spec}`, "--sheet", sheet]);
  if (code !== 0) process.exit(code);
}

function runCodex(prompt, logFile) {
  const codexArgs = [
    "exec", "-C", ROOT, "--skip-git-repo-check",
    "--sandbox", "workspace-write", "--color", "never",
    "-o", logFile, "-",
  ];
  return new Promise((resolve) => {
    // shell: true vì trên Windows codex là codex.cmd; lời giao việc đi qua stdin nên không lo dấu ngoặc.
    const child = spawn("codex", codexArgs, { cwd: ROOT, shell: true, stdio: ["pipe", "inherit", "inherit"] });
    child.stdin.end(prompt);
    child.on("close", resolve);
  });
}

async function main() {
  if (sheet) return drawSheet();
  const assets = await loadAssets();

  let todo;
  if (level) {
    todo = [...assets.values()].filter((a) => a.spec === `design-art-level${level}.md`);
  } else {
    const unknown = keys.filter((k) => !assets.has(k));
    if (unknown.length) {
      console.error(`Không tìm thấy key trong đặc tả: ${unknown.join(", ")}`);
      process.exit(1);
    }
    todo = keys.map((k) => assets.get(k));
  }
  if (!todo.length) {
    console.error("Chưa có gì để vẽ. Truyền key hoặc --level <số>.");
    process.exit(1);
  }

  await mkdir(LOGS, { recursive: true });
  let done = 0, skipped = 0, failed = 0;
  for (const asset of todo) {
    const target = path.join(OUT, asset.file);
    if (!redo && (await exists(target))) { skipped++; continue; }

    const prompt = brief(asset);
    if (dry) { console.log(`\n== ${asset.key}\n${prompt}`); continue; }

    console.log(`\n=== Codex đang vẽ ${asset.key} -> art/out/${asset.file}`);
    const code = await runCodex(prompt, path.join(LOGS, `${asset.key}.txt`));
    if (code === 0 && (await exists(target))) {
      console.log(`xong -> art/out/${asset.file}`);
      done++;
    } else {
      console.log(`LỖI: ${asset.key} chưa có file (mã thoát ${code}), xem art/out/_logs/${asset.key}.txt`);
      failed++;
    }
  }

  if (!dry) console.log(`\nVẽ mới ${done}, bỏ qua ${skipped} (đã có), lỗi ${failed}.`);
}

main();
