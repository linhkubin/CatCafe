"""Ảnh khối vị trí L10 (vùng chơi 1024x1536) từ bảng Dev trong art/review/level10-thread.md, để Codex vẽ demo đúng chỗ, đúng cỡ.
Mỗi món một khối màu (không chữ). Chạy: python tools/l10_block_guide.py -> art/ref/l10_demo/khoi_main.png, khoi_end.png"""
from PIL import Image, ImageDraw

OUT = "D:/WebGames/Cat3D/art/ref/l10_demo/"
# key: (x, y, w, h, neo, màu)  neo 'đáy' = (x,y) giữa mép dưới; 'tâm' = tâm
ITEMS = {
    "shelf_left": (170, 310, 240, 30, "đáy", (150, 110, 70)),
    "scissors": (170, 280, 110, 60, "đáy", (230, 60, 60)),
    "shelf_mid": (470, 390, 200, 30, "đáy", (150, 110, 70)),
    "book_stack": (470, 360, 100, 150, "đáy", (60, 120, 220)),
    "shelf_right": (770, 230, 240, 30, "đáy", (150, 110, 70)),
    "soup_box": (770, 200, 130, 90, "đáy", (240, 140, 200)),
    "sofa": (490, 860, 880, 400, "đáy", (190, 160, 230)),
    "pillow_l": (165, 610, 220, 150, "đáy", (250, 200, 120)),
    "pillow_r": (815, 610, 220, 150, "đáy", (250, 200, 120)),
    "plant": (975, 880, 170, 400, "đáy", (80, 180, 90)),
    "mun": (220, 1010, 300, 470, "đáy", (90, 60, 40)),
    "sua": (740, 1020, 290, 450, "đáy", (150, 220, 190)),
    "table": (490, 1060, 510, 230, "đáy", (210, 170, 120)),
    "cake_box": (300, 920, 120, 120, "đáy", (250, 230, 150)),
    "vase": (490, 900, 70, 130, "đáy", (240, 120, 150)),
    "remote": (660, 920, 154, 48, "đáy", (70, 70, 70)),
    "rug": (500, 1212, 598, 275, "tâm", (230, 215, 190)),
    "toy_car": (500, 1167, 158, 78, "tâm", (240, 90, 90)),
    "toy_tank": (370, 1301, 168, 88, "tâm", (110, 140, 80)),
    "toy_firetruck": (630, 1303, 183, 84, "tâm", (230, 70, 50)),
    "blocks_a": (160, 1170, 60, 90, "đáy", (100, 170, 240)),
    "blocks_b": (800, 1175, 60, 110, "đáy", (250, 190, 60)),
    "lamp_post": (215, 1235, 30, 110, "đáy", (60, 60, 60)),
    "ball": (95, 1300, 78, 78, "tâm", (250, 120, 120)),
    "plane": (900, 1300, 210, 98, "tâm", (120, 170, 240)),
}
TRAIN = (640, 1232, 98, 50)  # tàu trên ray, đoạn trước bên phải elip


def rect(x, y, w, h, neo):
    return (x - w / 2, y - h, x + w / 2, y) if neo == "đáy" else (x - w / 2, y - h / 2, x + w / 2, y + h / 2)


def draw(end=False):
    im = Image.new("RGB", (1024, 1536), (250, 244, 232))
    d = ImageDraw.Draw(im)
    d.rectangle((0, 880, 1024, 1536), fill=(232, 214, 190))          # sàn từ chân tường y 880
    order = ["shelf_left", "shelf_mid", "shelf_right", "scissors", "book_stack", "soup_box", "rug", "toy_car",
             "blocks_a", "blocks_b", "toy_tank", "toy_firetruck", "sofa", "pillow_l", "pillow_r", "plant",
             "mun", "sua", "table", "cake_box", "vase", "remote", "lamp_post", "ball", "plane"]
    for k in order:
        x, y, w, h, neo, col = ITEMS[k]
        if end and k in ("table", "cake_box", "vase", "remote", "mun", "sua", "soup_box"):
            continue
        if k == "rug":
            d.ellipse(rect(x, y, w, h, neo), fill=col, outline=(120, 100, 80), width=3)
            d.ellipse((500 - 230, 1167 - 74, 500 + 230, 1167 + 74), outline=(120, 80, 60), width=6)  # ray
            tx, ty, tw, th = TRAIN
            d.rectangle((tx - tw / 2, ty - th / 2, tx + tw / 2, ty + th / 2), fill=(80, 140, 200), outline=(0, 0, 0), width=2)
            continue
        d.rectangle(rect(x, y, w, h, neo), fill=col, outline=(0, 0, 0), width=2)
    if not end:
        d.polygon([(635, 620), (345, 630), (345, 680), (635, 680)], fill=(170, 225, 245), outline=(0, 0, 0))  # lửa
    else:
        d.rectangle(rect(482, 1020, 130, 90, "đáy"), fill=(240, 140, 200), outline=(0, 0, 0), width=2)   # hộp súp mở trên sàn
        d.rectangle(rect(305, 1010, 190, 170, "đáy"), fill=(90, 60, 40), outline=(0, 0, 0), width=2)    # Mun thật
        d.rectangle(rect(655, 1020, 190, 170, "đáy"), fill=(245, 245, 240), outline=(0, 0, 0), width=2)  # Sữa thật
    im.save(OUT + ("khoi_end.png" if end else "khoi_main.png"))


draw(False)
draw(True)
print("ok")
