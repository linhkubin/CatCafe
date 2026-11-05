"""Ghép demo L10 đúng bố cục bản khối (A10-2) từ asset đã tách: nền + từng món đặt đúng neo, cỡ hiển thị, lớp theo bảng Dev
(art/review/level10-thread.md). Ảnh asset ×1,5 nên co 1/1,5. Kệ: mặt kệ (đỉnh ảnh) đặt ở y mặt trên của bảng.
Nền 1366x2304 (art/out/level10/l10_bg_living_kitchen.png), vùng chơi ở (171, 384) như L7.
Chạy: python tools/l10_demo_compose.py -> art/out/demo/l10_demo2_{fight,end}_{play,frame,916}.png
(play = vùng chơi 1024x1536; frame = vùng chơi + 142px trên/dưới lấy từ nền thật; 916 = frame + lớp giao diện L5, 1080x1920)"""
import json
from PIL import Image

R = "D:/WebGames/Cat3D/"
A = json.load(open(R + "art/out/anchors.json", encoding="utf8"))
RES = 1.5
OX, OY = 171, 384
HUD = Image.open(R + "art/review/l5_dev_check/layout/l5_hud_yard.png").convert("RGBA")
for b in [(540, 20, 740, 100), (890, 840, 1024, 960), (30, 82, 110, 122)]:   # bỏ bản đồ mini, mũi tên, chữ
    HUD.paste((0, 0, 0, 0), b)


def asset(key):
    m = A[key]
    im = Image.open(R + "art/out/" + m["file"]).convert("RGBA")
    return im.resize((round(im.width / RES), round(im.height / RES)), Image.LANCZOS), m["ax"] / RES, m["ay"] / RES


def put(c, key, x, y, flip=False):
    im, ax, ay = asset(key)
    if flip:
        im, ax = im.transpose(Image.FLIP_LEFT_RIGHT), im.width - ax
    c.alpha_composite(im, (round(x - ax) + OX, round(y - ay) + OY))


def put_top(c, key, x, top):
    im, _, _ = asset(key)
    c.alpha_composite(im, (round(x - im.width / 2) + OX, round(top - 8 / RES) + OY))   # lề 8px của sheet_cut


def put_box(c, path, box, flip=False):
    im = Image.open(path).convert("RGBA")
    if flip:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    x0, y0, x1, y1 = box
    c.alpha_composite(im.resize((round(x1 - x0), round(y1 - y0)), Image.LANCZOS), (round(x0), round(y0)))


def scene(name):
    c = Image.open(R + "art/out/level10/l10_bg_living_kitchen.png").convert("RGBA")
    put_top(c, "l10_shelf_left", 170, 280)
    put_top(c, "l10_shelf_mid", 470, 360)
    put_top(c, "l10_shelf_right", 770, 200)
    put(c, "l10_book_stack", 470, 360)
    if name == "fight":
        put(c, "l10_scissors", 170, 280)
        put(c, "l10_soup_box", 770, 200)
    put(c, "l10_rug_loop", 500, 1212)
    toys = [("l10_train", 611, 1232), ("l10_toy_car", 500, 1167), ("l10_toy_tank", 370, 1301),
            ("l10_toy_firetruck", 630, 1303), ("l10_blocks_a", 160, 1170), ("l10_blocks_b", 800, 1175)]
    for k, x, y in sorted(toys, key=lambda t: t[2]):
        put(c, k, x, y)
    put(c, "l10_sofa", 490, 860)
    put(c, "l10_pillow", 165, 610)
    put(c, "l10_pillow", 815, 610)
    put(c, "l10_plant", 975, 880)
    if name == "fight":
        put(c, "mun_gorilla_block", 220, 1010)                                      # Mun che mặt đỡ lửa
        put(c, "sua_lizard_fire", 740, 1020)
        put(c, "l10_table_arena", 490, 1060)
        put(c, "l10_cake_box", 300, 920)
        put(c, "l10_vase", 490, 900)
        put(c, "l10_remote", 660, 920)
    else:
        put(c, "mun_l10_groom", 305, 1010)
        put(c, "sua_l10_groom", 655, 1020)
        put(c, "l10_soup_box_open", 482, 1020)
        put(c, "l10_fish_smoke", 482, 930)
    put(c, "l10_lamp_post_on" if name == "fight" else "l10_lamp_post", 215, 1235)
    put(c, "l10_ball", 95, 1300)
    put(c, "l10_plane", 900, 1300)
    if name == "fight":
        im, ax, ay = asset("l10_fire")                      # gốc giữa mép trái; lật để phun sang trái từ miệng Sữa
        im = im.transpose(Image.FLIP_LEFT_RIGHT).resize((290, 60), Image.LANCZOS)
        c.alpha_composite(im, (345 + OX, 650 - 30 + OY))
    c = c.convert("RGB")
    c.crop((OX, OY, OX + 1024, OY + 1536)).save(R + f"art/out/demo/l10_demo2_{name}_play.png")
    fr = c.crop((OX, OY - 142, OX + 1024, OY + 1536 + 142))
    fr.save(R + f"art/out/demo/l10_demo2_{name}_frame.png")
    ui = fr.convert("RGBA")
    ui.alpha_composite(HUD)
    ui.convert("RGB").resize((1080, 1920), Image.LANCZOS).save(R + f"art/out/demo/l10_demo2_{name}_916.png")


if __name__ == "__main__":
    for n in ("fight", "end"):
        scene(n)
    print("ok")
