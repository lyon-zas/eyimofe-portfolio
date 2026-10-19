"""Turn an app screenshot (any crop) into a full iPhone-shaped screen.

The phone mockups expect 1179x2556 images (iPhone 15 screen). Cropped
screenshots get a status bar on top, are scaled to the screen width, and the
leftover space is filled with the screenshot's own background colour, so
nothing is stretched or cut off at the sides.

    python3 scripts/frame_screenshot.py raw-screenshots/<slug>/in.jpg public/apps/<slug>/screens/name.jpg

It also writes a 600px-wide copy to screens/sm/ that the CSS phones use;
browsers render small images inside 3D transforms much more cleanly.

Full-device screenshots that are already 1179x2556 can be used as-is.
"""
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1179, 2556
STATUS = 150
FONT = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"


def edge_colour(im, y):
    w = im.width
    px = [im.getpixel((x, y)) for x in range(w // 10, w - w // 10, max(1, w // 40))]
    return max(set(px), key=px.count)


def is_light(c):
    return 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] > 150


def save(out, dst):
    import os
    out.save(dst, quality=90, optimize=True)
    sm_dir = os.path.join(os.path.dirname(dst), "sm")
    os.makedirs(sm_dir, exist_ok=True)
    out.resize((600, round(600 * H / W)), Image.LANCZOS).save(os.path.join(sm_dir, os.path.basename(dst)), quality=88, optimize=True)


def frame(src, dst):
    im = Image.open(src).convert("RGB")
    if im.size == (W, H):
        save(im, dst)
        return
    top, bottom = edge_colour(im, 2), edge_colour(im, im.height - 3)
    scaled = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
    out = Image.new("RGB", (W, H), bottom)
    d = ImageDraw.Draw(out)
    d.rectangle([0, 0, W, STATUS], fill=top)
    out.paste(scaled.crop((0, 0, W, min(scaled.height, H - STATUS))), (0, STATUS))

    ink = (17, 17, 17) if is_light(top) else (255, 255, 255)
    try:
        font = ImageFont.truetype(FONT, 50)
    except OSError:
        font = ImageFont.load_default()
    d.text((150, 52), "9:41", font=font, fill=ink)
    # signal bars, wifi-ish dot, battery
    x = W - 300
    for i, h in enumerate((14, 20, 26, 32)):
        d.rounded_rectangle([x + i * 16, 88 - h, x + i * 16 + 10, 88], 3, fill=ink)
    d.rounded_rectangle([W - 210, 56, W - 140, 90], 9, outline=ink, width=4)
    d.rounded_rectangle([W - 203, 63, W - 160, 83], 5, fill=ink)
    d.rounded_rectangle([W - 136, 67, W - 130, 79], 2, fill=ink)

    if scaled.height + STATUS < H - 60:
        hb = (17, 17, 17) if is_light(bottom) else (255, 255, 255)
        d.rounded_rectangle([W // 2 - 210, H - 40, W // 2 + 210, H - 26], 7, fill=hb)
    save(out, dst)


if __name__ == "__main__":
    frame(sys.argv[1], sys.argv[2])
