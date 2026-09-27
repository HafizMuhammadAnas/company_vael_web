"""Build VaelKode brand kit from the provided logo PNG."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC = Path(
    r"C:\Users\lenovo\.cursor\projects\d-vaelkode-website\assets"
    r"\c__Users_lenovo_AppData_Roaming_Cursor_User_workspaceStorage_82e325cfb81f7a947a250e2be44fc6f5"
    r"_images_WhatsApp_Image_2026-09-15_at_10.26.46_AM-dbb97cdd-7afc-4b02-8354-ee5541a9c7ff.png"
)
OUT = Path(r"d:\vaelkode\website\vaelkode\brand")
PNG = OUT / "png"
for d in (PNG / "dark", PNG / "light", PNG / "transparent", PNG / "app-icons"):
    d.mkdir(parents=True, exist_ok=True)

THRESHOLD = 18
CYAN = (0, 220, 230, 255)
CYAN_DARK = (0, 140, 160, 255)
INK = (18, 22, 30, 255)
WHITE = (255, 255, 255, 255)
BLACK = (0, 0, 0, 255)


def is_content(px, x, y, thr=THRESHOLD):
    r, g, b, a = px[x, y]
    return (r + g + b) > thr * 3


def content_bounds(im: Image.Image, thr=THRESHOLD):
    px = im.load()
    w, h = im.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if is_content(px, x, y, thr):
                found = True
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if not found:
        return (0, 0, w - 1, h - 1)
    return (minx, miny, maxx, maxy)


def make_transparent(im: Image.Image, thr=THRESHOLD) -> Image.Image:
    """Turn near-black background into alpha."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = (r + g + b) / 3
            if lum <= thr:
                px[x, y] = (r, g, b, 0)
            elif lum < thr * 2.5:
                # soft edge
                alpha = int(255 * (lum - thr) / (thr * 1.5))
                px[x, y] = (r, g, b, max(0, min(255, alpha)))
    return im


def pad_square(im: Image.Image, pad_ratio=0.12, bg=(0, 0, 0, 0)) -> Image.Image:
    w, h = im.size
    side = max(w, h)
    pad = int(side * pad_ratio)
    canvas = Image.new("RGBA", (side + pad * 2, side + pad * 2), bg)
    ox = (canvas.width - w) // 2
    oy = (canvas.height - h) // 2
    canvas.paste(im, (ox, oy), im if im.mode == "RGBA" else None)
    return canvas


def save_sizes(im: Image.Image, base: Path, sizes: list[int]):
    for s in sizes:
        out = im.resize((s, s), Image.Resampling.LANCZOS)
        out.save(base.parent / f"{base.stem}-{s}.png")


def try_font(size: int):
    candidates = [
        r"C:\Windows\Fonts\segoeuil.ttf",  # Segoe UI Light
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibri.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def measure_text(draw: ImageDraw.ImageDraw, text: str, font) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def render_wordmark(text: str, font, color, pad=24) -> Image.Image:
    # measure
    tmp = Image.new("RGBA", (10, 10))
    d = ImageDraw.Draw(tmp)
    tw, th = measure_text(d, text, font)
    im = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.text((pad, pad), text, font=font, fill=color)
    return im


print("Loading source…")
src = Image.open(SRC).convert("RGBA")
bx0, by0, bx1, by1 = content_bounds(src)
print("full content", bx0, by0, bx1, by1)

# Gap between icon and text is around y=600 (density 0)
ICON_Y_END = 590
TEXT_Y_START = 610

icon_region = src.crop((bx0, by0, bx1 + 1, ICON_Y_END + 1))
text_region = src.crop((bx0, TEXT_Y_START, bx1 + 1, by1 + 1))

# Tighten icon bounds
ix0, iy0, ix1, iy1 = content_bounds(icon_region)
icon_tight = icon_region.crop((ix0, iy0, ix1 + 1, iy1 + 1))
print("icon size", icon_tight.size)

tx0, ty0, tx1, ty1 = content_bounds(text_region)
word_tight = text_region.crop((tx0, ty0, tx1 + 1, ty1 + 1))
print("word size", word_tight.size)

# Transparent versions
icon_tr = make_transparent(icon_tight)
word_tr = make_transparent(word_tight)
full_tr = make_transparent(src.crop((bx0, by0, bx1 + 1, by1 + 1)))

# Save master transparent assets
icon_sq = pad_square(icon_tr, 0.10)
icon_sq.save(PNG / "transparent" / "mark.png")
word_tr.save(PNG / "transparent" / "wordmark.png")
full_tr.save(PNG / "transparent" / "lockup-stacked.png")

# Dark BG masters
def on_bg(im, color, pad=40):
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), color)
    canvas.paste(im, (pad, pad), im)
    return canvas.convert("RGB")


on_bg(icon_sq, BLACK).save(PNG / "dark" / "mark.png")
on_bg(full_tr, BLACK).save(PNG / "dark" / "lockup-stacked.png")

# Light BG — use same mark (glow works on light if we keep it), darker wordmark for readability
# For light backgrounds, create a darkened wordmark version by compositing
light_word = render_wordmark("VaelKode", try_font(72), (0, 120, 140, 255), pad=8)
on_bg(icon_sq, WHITE).save(PNG / "light" / "mark.png")

# Build lockup compositions
def compose_stacked(mark, word, gap=28, pad=48, bg=(0, 0, 0, 0)):
    # scale word to ~70% of mark width
    target_w = int(mark.width * 0.72)
    scale = target_w / word.width
    word_r = word.resize((target_w, max(1, int(word.height * scale))), Image.Resampling.LANCZOS)
    w = max(mark.width, word_r.width) + pad * 2
    h = mark.height + gap + word_r.height + pad * 2
    canvas = Image.new("RGBA", (w, h), bg)
    mx = (w - mark.width) // 2
    canvas.paste(mark, (mx, pad), mark)
    wx = (w - word_r.width) // 2
    canvas.paste(word_r, (wx, pad + mark.height + gap), word_r)
    return canvas


def compose_horizontal(mark, word, gap=36, pad=40, bg=(0, 0, 0, 0), word_scale=0.55):
    # mark height drives word size
    target_h = int(mark.height * word_scale)
    scale = target_h / word.height
    word_r = word.resize((max(1, int(word.width * scale)), target_h), Image.Resampling.LANCZOS)
    w = mark.width + gap + word_r.width + pad * 2
    h = max(mark.height, word_r.height) + pad * 2
    canvas = Image.new("RGBA", (w, h), bg)
    my = (h - mark.height) // 2
    canvas.paste(mark, (pad, my), mark)
    wy = (h - word_r.height) // 2
    canvas.paste(word_r, (pad + mark.width + gap, wy), word_r)
    return canvas


def compose_horizontal_tight(mark, word, gap=20, pad=32, bg=(0, 0, 0, 0)):
    return compose_horizontal(mark, word, gap=gap, pad=pad, bg=bg, word_scale=0.42)


# Prefer rendered clean wordmark for lockups (cleaner than cropped photo text)
font_lg = try_font(96)
word_cyan = render_wordmark("VaelKode", font_lg, CYAN, pad=4)
word_ink = render_wordmark("VaelKode", font_lg, INK, pad=4)
word_white = render_wordmark("VaelKode", font_lg, WHITE, pad=4)
word_cyan_dark = render_wordmark("VaelKode", font_lg, CYAN_DARK, pad=4)

# Also save cleaned wordmarks
word_cyan.save(PNG / "transparent" / "wordmark-cyan.png")
word_ink.save(PNG / "transparent" / "wordmark-ink.png")
word_cyan_dark.save(PNG / "transparent" / "wordmark-cyan-dark.png")

# Use photo wordmark for authentic look in stacked (from source), and clean for others
stacked = compose_stacked(icon_sq, word_tr if word_tr.width > 10 else word_cyan)
stacked.save(PNG / "transparent" / "lockup-stacked-clean.png")
# Prefer clean cyan word for consistency
stacked_clean = compose_stacked(icon_sq, word_cyan, gap=32)
stacked_clean.save(PNG / "transparent" / "lockup-stacked.png")
on_bg(stacked_clean, BLACK, 24).save(PNG / "dark" / "lockup-stacked.png")
on_bg(compose_stacked(icon_sq, word_cyan_dark, gap=32), WHITE, 24).save(PNG / "light" / "lockup-stacked.png")

horiz = compose_horizontal(icon_sq, word_cyan)
horiz.save(PNG / "transparent" / "lockup-horizontal.png")
on_bg(horiz, BLACK, 24).save(PNG / "dark" / "lockup-horizontal.png")
on_bg(compose_horizontal(icon_sq, word_cyan_dark), WHITE, 24).save(PNG / "light" / "lockup-horizontal.png")

horiz_tight = compose_horizontal_tight(icon_sq, word_cyan)
horiz_tight.save(PNG / "transparent" / "lockup-horizontal-compact.png")
on_bg(horiz_tight, BLACK, 20).save(PNG / "dark" / "lockup-horizontal-compact.png")

# Icon left + stacked name (two-line treatment with tagline space)
def compose_icon_left_name_stack(mark, name, tagline, gap=28, pad=40, bg=(0, 0, 0, 0)):
    # name ~0.38 of mark height, tagline smaller
    name_h = int(mark.height * 0.38)
    scale = name_h / name.height
    name_r = name.resize((max(1, int(name.width * scale)), name_h), Image.Resampling.LANCZOS)

    font_sm = try_font(max(18, name_h // 3))
    tag = render_wordmark(tagline, font_sm, (140, 160, 180, 255), pad=2)
    tag_w = int(name_r.width * 0.95)
    tag_r = tag.resize((tag_w, max(1, int(tag.height * tag_w / tag.width))), Image.Resampling.LANCZOS)

    text_h = name_r.height + 10 + tag_r.height
    w = mark.width + gap + max(name_r.width, tag_r.width) + pad * 2
    h = max(mark.height, text_h) + pad * 2
    canvas = Image.new("RGBA", (w, h), bg)
    my = (h - mark.height) // 2
    canvas.paste(mark, (pad, my), mark)
    ty = (h - text_h) // 2
    tx = pad + mark.width + gap
    canvas.paste(name_r, (tx, ty), name_r)
    canvas.paste(tag_r, (tx, ty + name_r.height + 10), tag_r)
    return canvas


with_tag = compose_icon_left_name_stack(icon_sq, word_cyan, "Software & Digital Solutions")
with_tag.save(PNG / "transparent" / "lockup-horizontal-tagline.png")
on_bg(with_tag, BLACK, 24).save(PNG / "dark" / "lockup-horizontal-tagline.png")

# Name only lockups on dark/light
on_bg(word_cyan, BLACK, 40).save(PNG / "dark" / "wordmark.png")
on_bg(word_cyan_dark, WHITE, 40).save(PNG / "light" / "wordmark.png")

# App icons
for size in (16, 32, 48, 64, 128, 180, 192, 256, 512, 1024):
    icon = icon_sq.resize((size, size), Image.Resampling.LANCZOS)
    # transparent
    icon.save(PNG / "app-icons" / f"icon-{size}.png")
    # dark rounded square for app
    if size >= 180:
        rounded = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        bg = Image.new("RGBA", (size, size), (8, 10, 14, 255))
        mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(mask)
        r = int(size * 0.22)
        draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=r, fill=255)
        rounded.paste(bg, (0, 0), mask)
        inset = int(size * 0.14)
        inner = icon_sq.resize((size - inset * 2, size - inset * 2), Image.Resampling.LANCZOS)
        rounded.paste(inner, (inset, inset), inner)
        rounded.save(PNG / "app-icons" / f"app-icon-{size}.png")

# Social / OG preview (1200x630)
og = Image.new("RGB", (1200, 630), (5, 6, 10))
mark_og = icon_sq.resize((280, 280), Image.Resampling.LANCZOS)
og.paste(mark_og, ((1200 - 280) // 2, 90), mark_og)
wm = word_cyan.resize((420, int(420 * word_cyan.height / word_cyan.width)), Image.Resampling.LANCZOS)
og.paste(wm, ((1200 - wm.width) // 2, 400), wm)
og.save(PNG / "dark" / "og-image.png")

# Favicon-friendly small mark on dark
fav = Image.new("RGBA", (32, 32), (13, 17, 23, 255))
small = icon_sq.resize((28, 28), Image.Resampling.LANCZOS)
fav.paste(small, (2, 2), small)
fav.save(PNG / "app-icons" / "favicon-32.png")

print("PNG kit written to", PNG)
print("Done.")
