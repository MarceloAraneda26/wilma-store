// src/components/ProductCard.jsx
import styles from './ProductCard.module.css'

const BADGE = {
  new: { label: '✦ Nuevo',   cls: styles.badgeNew },
  hot: { label: '★ Popular', cls: styles.badgeHot },
  '':  null,
}

export default function ProductCard({ product, onClick }) {
  const badge = BADGE[product.badge]
  const imageSrc = product.image || `stickers/${product.sticker}`
  const imageClass = product.image ? styles.photo : styles.sticker

  return (
    <button type="button" className={styles.card} onClick={() => onClick(product)}>
      {badge && (
        <span className={`${styles.badge} ${badge.cls}`}>{badge.label}</span>
      )}

      <div className={styles.imgWrap} style={{ background: product.bg }}>
        <img
          src={imageSrc}
          alt={product.name}
          className={imageClass}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'flex'
          }}
        />
        <div className={styles.emojiFallback} style={{ display: 'none' }}>
          {product.emoji}
        </div>
        <div className={styles.overlay}>
          <span className={styles.overlayTxt}>Ver detalles →</span>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.cat}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.desc.slice(0, 70)}…</p>
        <p className={styles.price}>
          {product.price} <span>· consultar disponibilidad</span>
        </p>
      </div>
    </button>
  )
}
