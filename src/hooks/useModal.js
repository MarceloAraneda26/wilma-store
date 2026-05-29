// ══════════════════════════════════════════
// src/hooks/useModal.js
// Hook para controlar el modal de producto
// ══════════════════════════════════════════

import { useState, useEffect } from 'react'

export function useModal() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openModal  = (product) => setSelectedProduct(product)
  const closeModal = ()        => setSelectedProduct(null)

  // Cerrar con Escape + bloquear scroll del body
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    } else {
      document.body.style.overflow = ''
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProduct])

  return { selectedProduct, openModal, closeModal }
}
