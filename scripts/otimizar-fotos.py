#!/usr/bin/env python3
"""
Gera as versões responsivas das fotos do hotel (AVIF, WebP e JPEG).

Entrada:  photos-src/hotel/<nome>.(webp|jpg|jpeg|png)  — originais enviados pelo hotel
Saída:    public/photos/hotel/<nome>-<largura>.<formato>
          content/photos.hotel.json                     — lido por content/hotel.ts

Uso (precisa de Python 3 + Pillow com suporte a AVIF):
    pip install pillow
    python3 scripts/otimizar-fotos.py

- Nunca amplia: larguras maiores que o original são ignoradas (o original entra como maior).
- Remove metadados (EXIF/GPS) — a foto publicada não carrega localização nem dados da câmera.
"""
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "photos-src" / "hotel"
OUT = ROOT / "public" / "photos" / "hotel"
MANIFEST = ROOT / "content" / "photos.hotel.json"

WIDTHS = [480, 828, 1280, 1600, 2000]
QUALITY = {"avif": 55, "webp": 72, "jpg": 74}

OUT.mkdir(parents=True, exist_ok=True)
manifest = {}

for src in sorted(SRC.iterdir()):
    if src.suffix.lower() not in {".webp", ".jpg", ".jpeg", ".png"}:
        continue
    name = src.stem
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    widths = [w for w in WIDTHS if w < im.width] + [im.width]
    for w in widths:
        h = round(im.height * w / im.width)
        resized = im if w == im.width else im.resize((w, h), Image.LANCZOS)
        for fmt, q in QUALITY.items():
            opts = {"quality": q}
            if fmt == "jpg":
                opts.update(optimize=True, progressive=True)
            resized.save(OUT / f"{name}-{w}.{fmt}", **opts)
    manifest[name] = {"widths": widths, "formats": ["avif", "webp", "jpg"], "aspect": round(im.width / im.height, 4)}
    print(f"✓ {name}: {widths}")

MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
