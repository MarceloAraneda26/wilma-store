// quitar_fondo.mjs
// Elimina el fondo blanco de todos los stickers PNG
// USO: node quitar_fondo.mjs

import { readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const STICKERS_DIR = dirname(fileURLToPath(import.meta.url))
const TOLERANCIA = 30

// Instalar sharp si no está: npm install sharp
import sharp from 'sharp'

async function quitarFondo(inputPath) {
  const img   = sharp(inputPath)
  const meta  = await img.metadata()
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = new Uint8Array(data)
  const total  = info.width * info.height

  for (let i = 0; i < total; i++) {
    const idx = i * 4
    const r = pixels[idx]
    const g = pixels[idx + 1]
    const b = pixels[idx + 2]

    const esBlanco =
      r > 255 - TOLERANCIA &&
      g > 255 - TOLERANCIA &&
      b > 255 - TOLERANCIA &&
      Math.abs(r - g) < TOLERANCIA &&
      Math.abs(r - b) < TOLERANCIA &&
      Math.abs(g - b) < TOLERANCIA

    if (esBlanco) pixels[idx + 3] = 0  // transparente
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png()
    .toFile(inputPath + '.tmp.png')

  // Reemplazar original
  const { rename } = await import('fs/promises')
  await rename(inputPath + '.tmp.png', inputPath)
}

async function main() {
  const archivos = (await readdir(STICKERS_DIR)).filter(f => f.endsWith('.png'))
  console.log(`\nProcesando ${archivos.length} stickers...\n`)

  for (const archivo of archivos) {
    const ruta = join(STICKERS_DIR, archivo)
    try {
      await quitarFondo(ruta)
      console.log(`  ✓ ${archivo}`)
    } catch (e) {
      console.log(`  ✗ ${archivo} — ${e.message}`)
    }
  }
  console.log('\n✅ Listo! Ahora ejecuta:')
  console.log('   git add public/stickers/ && git commit -m "Fix transparent stickers" && git push')
}

main()
