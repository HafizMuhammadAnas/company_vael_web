from PIL import Image

src = r"C:\Users\lenovo\.cursor\projects\d-vaelkode-website\assets\c__Users_lenovo_AppData_Roaming_Cursor_User_workspaceStorage_82e325cfb81f7a947a250e2be44fc6f5_images_WhatsApp_Image_2026-09-15_at_10.26.46_AM-dbb97cdd-7afc-4b02-8354-ee5541a9c7ff.png"
im = Image.open(src).convert("RGBA")
print("size", im.size, "mode", im.mode)

pixels = im.load()
w, h = im.size
THRESHOLD = 18


def is_content(x, y):
    r, g, b, a = pixels[x, y]
    return (r + g + b) > THRESHOLD * 3


minx, miny, maxx, maxy = w, h, 0, 0
for y in range(h):
    for x in range(w):
        if is_content(x, y):
            if x < minx:
                minx = x
            if y < miny:
                miny = y
            if x > maxx:
                maxx = x
            if y > maxy:
                maxy = y

print("content bounds", minx, miny, maxx, maxy)
print("content size", maxx - minx + 1, maxy - miny + 1)

row_density = []
for y in range(miny, maxy + 1):
    count = sum(1 for x in range(minx, maxx + 1) if is_content(x, y))
    row_density.append((y, count))

for y, c in row_density[::20]:
    print(f"y={y} density={c}")

mid_start = miny + (maxy - miny) // 3
mid_end = miny + 2 * (maxy - miny) // 3
gap_rows = [(y, c) for y, c in row_density if mid_start <= y <= mid_end]
gap_rows.sort(key=lambda t: t[1])
print("lowest density in mid:", gap_rows[:15])
