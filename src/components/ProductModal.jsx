// src/components/ProductModal.jsx
import { buildWaUrl, buildQrUrl } from '../utils/whatsapp'
import styles from './ProductModal.module.css'

const WA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  const waUrl = buildWaUrl(product.name)
  const qrUrl = buildQrUrl(product.name)

  return (
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className={`${styles.modal} anim-scale-in`}>
        <button className={styles.close} onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Imagen lateral */}
        <div className={styles.imgSide} style={{ background: product.bg }}>
          <img
            src={`stickers/${product.sticker}`}
            alt={product.name}
            className={styles.stickerImg}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
          />
          <div className={styles.emojiFallback} style={{ display: 'none' }}>
            {product.emoji}
          </div>
        </div>

        {/* Contenido */}
        <div className={styles.content}>
          <p className={styles.cat}>{product.category}</p>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.desc}>{product.desc}</p>

          <div className={styles.meta}>
            <div>
              <p className={styles.metaLbl}>Material</p>
              <p className={styles.metaVal}>{product.material}</p>
            </div>
            <div>
              <p className={styles.metaLbl}>Talla</p>
              <p className={styles.metaVal}>{product.size}</p>
            </div>
          </div>

          <p className={styles.price}>{product.price}</p>

          {/* Acciones */}
          <div className={styles.actions}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
              {WA_ICON} Consultar por WhatsApp
            </a>
            <div className={styles.qrRow}>
              <img src={qrUrl} width={80} height={80} alt="QR WhatsApp" className={styles.qrImg} />
              <div>
                <p className={styles.metaLbl}>Escanea para escribirnos</p>
                <p className={styles.qrDesc}>
                  Apunta la cámara al código QR para abrir WhatsApp directamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
