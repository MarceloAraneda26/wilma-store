// src/components/ProductCard.jsx
import styles from './ProductCard.module.css'

const BADGE = {
  new: { label: '✦ Nuevo',   cls: styles.badgeNew },
  hot: { label: '★ Popular', cls: styles.badgeHot },
  '':  null,
}

export default function ProductCard({ product, onClick }) {
  const badge = BADGE[product.badge]

  return (
    <article className={styles.card} onClick={() => onClick(product)}>
      {badge && (
        <span className={`${styles.badge} ${badge.cls}`}>{badge.label}</span>
      )}

      {/* Imagen / Sticker */}
      <div className={styles.imgWrap} style={{ background: product.bg }}>
        <img
          src={`stickers/${product.sticker}`}
          alt={product.name}
          className={styles.sticker}
          onError={(e) => {
            // Fallback: muestra emoji si el sticker no existe
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
        />
        <div className={styles.emojiFallback} style={{ display: 'none' }}>
          {product.emoji}
        </div>
        <div className={styles.overlay}>
          <span className={styles.overlayTxt}>Ver detalles →</span>
        </div>
      </div>

      {/* Info */}
      <div className={styles.body}>
        <p className={styles.cat}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.desc.slice(0, 70)}…</p>
        <p className={styles.price}>
          {product.price} <span>· consultar disponibilidad</span>
        </p>
      </div>
    </article>
  )
}
