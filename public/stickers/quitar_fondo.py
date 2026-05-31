"""
quitar_fondo.py
───────────────
Elimina el fondo blanco de todos los PNG en la carpeta de stickers.

USO:
  1. Guarda este archivo en tu Escritorio
  2. Abre PowerShell y ejecuta:
       pip install pillow numpy
       python C:\Users\marce\Desktop\quitar_fondo.py
"""

from PIL import Image
import os
import numpy as np

STICKERS_DIR = r"C:\Users\marce\Desktop\wilma-store\wilma-store\public\stickers"
TOLERANCIA   = 30   # 0=solo blanco puro · 50=más agresivo

def quitar_fondo_blanco(img, tolerancia=30):
    img  = img.convert("RGBA")
    data = np.array(img, dtype=np.float32)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    es_blanco = (
        (r > 255 - tolerancia) &
        (g > 255 - tolerancia) &
        (b > 255 - tolerancia) &
        (abs(r - g) < tolerancia) &
        (abs(r - b) < tolerancia) &
        (abs(g - b) < tolerancia)
    )
    data[:,:,3] = np.where(es_blanco, 0, a)
    return Image.fromarray(data.astype(np.uint8), "RGBA")

def procesar_carpeta(carpeta, tolerancia=30):
    archivos = [f for f in os.listdir(carpeta) if f.lower().endswith(".png")]
    if not archivos:
        print("No se encontraron PNG en:", carpeta)
        return
    print(f"Procesando {len(archivos)} stickers...\n")
    for nombre in archivos:
        ruta = os.path.join(carpeta, nombre)
        try:
            img = Image.open(ruta)
            resultado = quitar_fondo_blanco(img, tolerancia)
            resultado.save(ruta)
            print(f"  ✓ {nombre}")
        except Exception as e:
            print(f"  ✗ {nombre} — {e}")
    print("\n✅ Listo! Ahora sube los cambios:")
    print("   git add public/stickers/ && git commit -m 'Fix transparent stickers' && git push")

if __name__ == "__main__":
    procesar_carpeta(STICKERS_DIR, TOLERANCIA)