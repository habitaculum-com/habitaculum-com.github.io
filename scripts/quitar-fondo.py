"""Quita el fondo liso (beige) de las ilustraciones de Canva y las guarda como WebP transparente.

Uso:  python3 scripts/quitar-fondo.py entrada.jpg public/animales/salida.webp [ancho] [tolerancia]

Toma el color de las esquinas como fondo, rellena desde los bordes todo lo que
se le parezca y suaviza el contorno para que no quede un halo.
"""
import sys
from collections import deque
from PIL import Image, ImageFilter

entrada, salida = sys.argv[1], sys.argv[2]
ancho = int(sys.argv[3]) if len(sys.argv) > 3 else 1400
TOL = int(sys.argv[4]) if len(sys.argv) > 4 else 38  # distancia de color tolerada respecto del fondo

im = Image.open(entrada).convert('RGB')
W, H = im.size
px = im.load()
esq = [px[2, 2], px[W - 3, 2], px[2, H - 3], px[W - 3, H - 3]]
fondo = tuple(sum(c[i] for c in esq) // 4 for i in range(3))

def parecido(c):
    return sum((c[i] - fondo[i]) ** 2 for i in range(3)) <= TOL * TOL

mascara = Image.new('L', (W, H), 255)
m = mascara.load()
cola = deque()
for x in range(W):
    cola.append((x, 0)); cola.append((x, H - 1))
for y in range(H):
    cola.append((0, y)); cola.append((W - 1, y))
visto = bytearray(W * H)
while cola:
    x, y = cola.popleft()
    i = y * W + x
    if visto[i]:
        continue
    visto[i] = 1
    if not parecido(px[x, y]):
        continue
    m[x, y] = 0
    if x > 0: cola.append((x - 1, y))
    if x < W - 1: cola.append((x + 1, y))
    if y > 0: cola.append((x, y - 1))
    if y < H - 1: cola.append((x, y + 1))

# huecos de fondo encerrados (entre patas, bajo la cola): regiones grandes del color del fondo
minimo = W * H * 0.002
for y0 in range(0, H, 3):
    for x0 in range(0, W, 3):
        i0 = y0 * W + x0
        if visto[i0] or not parecido(px[x0, y0]):
            continue
        region, cola2 = [], deque([(x0, y0)])
        while cola2:
            x, y = cola2.popleft()
            i = y * W + x
            if visto[i]:
                continue
            visto[i] = 1
            if not parecido(px[x, y]):
                continue
            region.append((x, y))
            if x > 0: cola2.append((x - 1, y))
            if x < W - 1: cola2.append((x + 1, y))
            if y > 0: cola2.append((x, y - 1))
            if y < H - 1: cola2.append((x, y + 1))
        if len(region) >= minimo:
            for x, y in region:
                m[x, y] = 0

# contorno suave: erosiona 1 px y desenfoca levemente
mascara = mascara.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
out = im.convert('RGBA')
out.putalpha(mascara)
out = out.crop(out.getbbox())
if out.width > ancho:
    out = out.resize((ancho, round(out.height * ancho / out.width)), Image.LANCZOS)
out.save(salida, 'WEBP', quality=88, method=6)
print(f'{salida}: {out.size[0]}x{out.size[1]}, fondo detectado {fondo}')
