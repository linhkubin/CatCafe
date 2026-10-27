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
//   Mọi lời giao việc tự kèm art/ref/owner_l1_style_ref.png (màu, chất chì) + khối COLOR và art/ref/l1_depth_angle_ref.png (góc, sofa L1) + khối CAMERA; ảnh lẻ vẽ xong tự đo màu bằng tools/color_check.py; tờ trong suốt kiểm màu bằng ảnh ghép lên nền (G4-20).
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

// Model vẽ: mặc định sol-medium (đổi bằng biến môi trường CODEX_MODEL / CODEX_EFFORT).
const MODEL = process.env.CODEX_MODEL || "gpt-6.1-sol";
const EFFORT = process.env.CODEX_EFFORT || "medium";
// Đường dẫn codex.exe (không có trong PATH trên máy này).
const CODEX_BIN = process.env.CODEX_BIN || "codex";

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
// Ảnh mẫu màu level 1 luôn là tham chiếu số 1 (quy tắc giữ màu O6, QUY-TRINH.md bước 3).
const STYLE_REF = "art/ref/owner_l1_style_ref.png";
// Mẫu góc (sofa cắt từ ảnh mẫu L1, style.md 2b): luôn là tham chiếu số 2.
const ANGLE_REF = "art/ref/l1_depth_angle_ref.png";
const refs = [STYLE_REF, ANGLE_REF, ...(option("--ref") || "").split(",").filter((r) => r && r !== STYLE_REF && r !== ANGLE_REF)];
const noCut = flag("--no-cut");
const strokeRef = option("--stroke-ref"); // "<ảnh>=<tỉ lệ>", ví dụ art/out/cats/sua_ref.png=0.5
const VALUE_OPTS = ["--note", "--level", "--sheet", "--ref", "--stroke-ref"];
const keys = args.filter((a, i) => !a.startsWith("--") && !VALUE_OPTS.includes(args[i - 1]));

const exists = (p) => access(p).then(() => true, () => false);

// Khối phong cách art/style.md mục 1 (gồm STYLE, COLOR, SIMPLICITY…), dán nguyên vào mọi lời giao việc (O2-11, O6).
async function colorLines() {
  const style = await readFile(path.join(ART, "style.md"), "utf8");
  const block = style.match(/## 1\.[^\n]*\n[\s\S]*?```\n([\s\S]*?)```/);
  if (!block) throw new Error("Không thấy khối phong cách trong art/style.md mục 1.");
  return [
    `- Phong cách và màu (O2-11, O6): mở ${STYLE_REF} bằng view_image làm mẫu màu và chất chì, đính kèm nó cho image_gen. Khối phong cách (art/style.md mục 1, có khối COLOR), dán nguyên:`,
    "```", block[1].trimEnd(), "```",
    `- "Nhắc lại quy tắc" phải nhắc lại khối màu; "Tự kiểm" chấm đạt / không đạt về màu.`,
  ];
}

// Khối CAMERA trong art/style.md mục 2b (nhìn như sofa level 1), dán nguyên vào mọi lời giao việc.
async function cameraLines() {
  const style = await readFile(path.join(ART, "style.md"), "utf8");
  const block = style.match(/^CAMERA [^\n]*\n(?:.+\n)+?(?=```)/m);
  if (!block) throw new Error("Không thấy khối CAMERA trong art/style.md mục 2b.");
  return [
    `- Góc nhìn: mở ${ANGLE_REF} (sofa level 1) bằng view_image; nhìn mọi thứ như cái sofa đó, đồ có chiều sâu rõ hơn chút. Khối CAMERA (art/style.md mục 2b), dán nguyên:`,
    "```", block[0].trimEnd(), "```",
    `- "Nhắc lại quy tắc" phải nhắc lại góc nhìn; "Tự kiểm" chấm đạt / không đạt góc nhìn cho từng đồ.`,
  ];
}

// Đo bão hoà theo O6 (tools/color_check.py). Trả về true nếu đạt.
async function colorOk(file) {
  const code = await run("python", ["tools/color_check.py", path.relative(ROOT, file)]);
  if (code !== 0) console.log(`Màu VƯỢT ngưỡng O6: không cắt, vẽ lại với --redo --note "<món bị đậm>".`);
  return code === 0;
}

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

// Ảnh demo gốc đã duyệt của phòng chứa tờ / ảnh lẻ (G4-26), đọc từ bảng "Tờ hoặc key | Demo gốc | Vị trí trong demo"
// trong design-art-level<N>.md. Level đã có demo (art/out/demo/l<N>_demo_*.png) mà thiếu dòng thì dừng.
async function demoFor(name, specFile) {
  const m = specFile.match(/level(\d+)/);
  if (!m) return null;
  const text = await readFile(path.join(ART, specFile), "utf8");
  for (const raw of text.split("\n")) {
    const c = raw.trim().replace(/^\||\|$/g, "").split("|").map((x) => x.trim().replace(/`/g, ""));
    if (c.length >= 3 && c[0] === name && /^art\/out\/demo\/.+\.png$/.test(c[1])) return { file: c[1], where: c[2] };
  }
  const demos = (await readdir(path.join(OUT, "demo")).catch(() => [])).filter((f) => f.startsWith(`l${m[1]}_demo_`));
  if (demos.length) {
    console.error(`Thiếu ảnh demo gốc cho ${name} (G4-26): thêm dòng vào bảng "Demo gốc" trong art/${specFile}.`);
    process.exit(1);
  }
  return null;
}

function demoLines(demo) {
  return demo ? [`- **Ảnh demo gốc (G4-26): ${demo.file}**, món cần vẽ nằm ở ${demo.where}. Mở bằng view_image, vẽ món đồ giống hệt trong demo (hình dáng, tỉ lệ, màu, nét).`] : [];
}

function refList(demo) {
  return (demo ? [STYLE_REF, ANGLE_REF, demo.file, ...refs.slice(2).filter((r) => r !== demo.file)] : refs).join(", ");
}

function brief(asset, color, demo) {
  const where = asset.spec === "style.md" ? "art/style.md" : `art/style.md (phong cách, nhân vật) và art/${asset.spec}`;
  const lines = [
    `Vẽ asset \`${asset.key}\` cho game, theo đúng quy tắc trong AGENTS.md.`,
    `- Đặc tả: ${where} (tìm dòng có key \`${asset.key}\` và đoạn mô tả chi tiết của nó).`,
    `- Lưu vào: art/out/${asset.file}`,
    ...demoLines(demo),
    ...color,
    `- Ảnh tham chiếu, mở bằng view_image trước khi vẽ: ${refList(demo)}`,
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

function sheetBrief(name, rows, color, demo) {
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
    ...demoLines(demo),
    ...color,
    `- Nét (style.md mục 1): số px ở từng ô là độ dày **đường viền ngoài ở chỗ đậm nhất** (chỗ khuất, chỗ gập). Phần lớn đường viền mảnh hơn (khoảng 60% số đó), đầu nét nhọn dần; nét lông và chi tiết bên trong mảnh hơn nữa. Không vẽ một đường đều dày kiểu vector.`,
  ];
  if (strokeRef) {
    const [img, ratio] = strokeRef.split("=");
    lines.push(`- So nét với ảnh đính kèm ${img}: viền ngoài của tờ này dày khoảng ${ratio || "1"} lần viền ngoài trong ảnh đó (mở ảnh bằng view_image để so).`);
  }
  lines.push(`- Ảnh tham chiếu, mở bằng view_image trước khi vẽ: ${refList(demo)}`);
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
  const prompt = sheetBrief(sheet, rows, [...(await colorLines()), ...(await cameraLines())], await demoFor(sheet, rows[0].spec));
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
  // Tờ trong suốt không chặn theo số màu riêng (G4-20): kiểm màu bằng cảnh ghép key lên nền
  // (sheet_cut.py compose, ngưỡng O6) và nhìn cạnh demo sau khi cắt.
  console.log("Tờ trong suốt: không chặn theo màu; sau khi cắt, kiểm bằng ảnh ghép lên nền (sheet_cut.py compose) so với demo.");
  if (noCut) return;
  console.log(`\n=== Cắt tờ ${sheet}`);
  // Không dùng cờ -I: script cần import numpy/Pillow từ môi trường thường.
  const code = await run("python", ["tools/sheet_cut.py", "cut", `art/${rows[0].spec}`, "--sheet", sheet]);
  if (code !== 0) process.exit(code);
}

function runCodex(prompt, logFile) {
  const codexArgs = [
    "exec", "-C", ROOT, "--skip-git-repo-check",
    "-m", MODEL, "-c", `model_reasoning_effort="${EFFORT}"`,
    "--sandbox", "workspace-write", "--color", "never",
    "-o", logFile, "-",
  ];
  return new Promise((resolve) => {
    // shell: true vì trên Windows codex là codex.cmd; lời giao việc đi qua stdin nên không lo dấu ngoặc.
    const child = spawn(`"${CODEX_BIN}"`, codexArgs, { cwd: ROOT, shell: true, stdio: ["pipe", "inherit", "inherit"] });
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
  const color = await colorLines();
  let done = 0, skipped = 0, failed = 0;
  for (const asset of todo) {
    const target = path.join(OUT, asset.file);
    if (!redo && (await exists(target))) { skipped++; continue; }

    const prompt = brief(asset, [...color, ...(await cameraLines())], await demoFor(asset.key, asset.spec));
    if (dry) { console.log(`\n== ${asset.key}\n${prompt}`); continue; }

    console.log(`\n=== Codex đang vẽ ${asset.key} -> art/out/${asset.file}`);
    const code = await runCodex(prompt, path.join(LOGS, `${asset.key}.txt`));
    if (code === 0 && (await exists(target))) {
      console.log(`xong -> art/out/${asset.file}`);
      await colorOk(target);
      done++;
    } else {
      console.log(`LỖI: ${asset.key} chưa có file (mã thoát ${code}), xem art/out/_logs/${asset.key}.txt`);
      failed++;
    }
  }

  if (!dry) console.log(`\nVẽ mới ${done}, bỏ qua ${skipped} (đã có), lỗi ${failed}.`);
}

main();
