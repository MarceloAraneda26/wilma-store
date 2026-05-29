// ══════════════════════════════════════════
// src/utils/whatsapp.js
// Helpers para generar URLs de WhatsApp y QR
// ══════════════════════════════════════════

import { WHATSAPP_NUMBER } from '../data/products'

/**
 * Genera la URL de WhatsApp con mensaje pre-cargado para un producto
 */
export function buildWaUrl(productName) {
  const msg = encodeURIComponent(
    `Hola Wilma! 👋 Vi el catálogo y me interesa: ${productName} 🧶`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

/**
 * Genera la URL del QR usando api.qrserver.com (sin costo, sin API key)
 * @param {string} productName
 * @param {number} size - tamaño en px (default 160)
 */
export function buildQrUrl(productName, size = 160) {
  const waUrl = buildWaUrl(productName)
  return [
    `https://api.qrserver.com/v1/create-qr-code/`,
    `?size=${size}x${size}`,
    `&data=${encodeURIComponent(waUrl)}`,
    `&color=2D1E1E`,
    `&bgcolor=FBF5EE`,
    `&margin=6`,
  ].join('')
}

/**
 * Genera URL de WA para pedido personalizado genérico
 */
export function buildCustomWaUrl() {
  const msg = encodeURIComponent(
    `Hola Wilma! 👋 Quisiera hacer un pedido personalizado 🎨`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}
