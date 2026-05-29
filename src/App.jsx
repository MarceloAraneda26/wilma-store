// src/App.jsx
import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from './data/products'
import { buildCustomWaUrl } from './utils/whatsapp'
import { useModal } from './hooks/useModal'

import Navbar       from './components/Navbar'
import ProductCard  from './components/ProductCard'
import ProductModal from './components/ProductModal'

import './styles/global.css'
import './styles/animations.css'
import styles from './App.module.css'

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { selectedProduct, openModal, closeModal } = useModal()

  const filtered = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter)

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <header className={styles.hero} id="inicio">

        {/* Stickers flotantes */}
        <img src="stickers/gato-jugando.png"   className={`${styles.stickerHero} ${styles.tl} anim-float`}     alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/gato-saludando.png" className={`${styles.stickerHero} ${styles.tr} anim-float-alt`} alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/gato-durmiendo.png" className={`${styles.stickerHero} ${styles.bl} anim-float-slow`}alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/gato-caminando.png" className={`${styles.stickerHero} ${styles.br} anim-float`}     alt="" onError={e => e.currentTarget.remove()} />

        <div className={styles.heroContent}>
          <div className={styles.heroTag}>✦ Hecho a mano con amor</div>
          <h1 className={styles.heroTitle}>
            Crochet que te<br />pone <em>linda.</em>
          </h1>
          <p className={styles.heroSub}>
            Scrunchies, diademas y accesorios de crochet hechos a mano.
            Cada pieza es única. Escríbenos y elige la tuya.
          </p>
          <div className={styles.heroBtns}>
            <a href="#catalogo"      className={styles.btnMain}>Ver catálogo →</a>
            <a href="#personalizado" className={styles.btnSec}>🎨 Pide tu diseño</a>
          </div>
        </div>

        {/* Mascota */}
        <div className={styles.heroCat}>
          <div className={styles.catFrame}>
            <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
            <img
              src="stickers/gato-sentado.png"
              className={styles.stickerOnCat}
              alt=""
              onError={e => e.currentTarget.remove()}
            />
            <CatSVG />
          </div>
        </div>
      </header>

      {/* ── MARQUEE ── */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className={styles.marqueeInner}>
              {['HECHO A MANO', 'CROCHET ARTESANAL', 'ENVÍOS A TODO CHILE', 'PIEZAS ÚNICAS', 'DISEÑOS EXCLUSIVOS', 'PIDE EL TUYO', 'WILMA STORE'].map((txt, j) => (
                <span key={j} className={styles.marqueeItem}>
                  {txt}
                  <img src={`stickers/${['gato-acurrucado','gato-estirando','gato-parado','gato-acurrucado','gato-estirando','gato-parado','gato-acurrucado'][j]}.png`}
                    className={styles.marqueeMini} alt=""
                    onError={e => { e.currentTarget.style.display='none' }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CATÁLOGO ── */}
      <section id="catalogo" className={styles.catalogSection}>
        <img src="stickers/gato-comiendo.png" className={styles.sectionStickerRight} alt="" onError={e => e.currentTarget.remove()} />

        <div className={styles.container}>
          <p className={styles.sectionLabel}>Catálogo</p>
          <h2 className={styles.sectionTitle}>Nuestras <em>piezas.</em></h2>
          <p className={styles.sectionSub}>
            Haz clic en cualquier producto para ver detalles y contactarnos por WhatsApp.
          </p>

          {/* Filtros */}
          <div className={styles.filters}>
            <span className={styles.filterLbl}>Filtrar:</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.filterBtn} ${activeFilter === cat.id ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((product, i) => (
              <div key={product.id} className="anim-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <ProductCard product={product} onClick={openModal} />
              </div>
            ))}
            {filtered.length === 0 && (
              <p className={styles.empty}>No hay productos en esta categoría aún.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── PERSONALIZADO ── */}
      <section id="personalizado" className={styles.customSection}>
        <div className={styles.container}>
          <div className={styles.customBox}>
            <img src="stickers/gato-cola.png" className={styles.customSticker} alt="" onError={e => e.currentTarget.remove()} />

            <div className={styles.customText}>
              <p className={styles.sectionLabelLight}>Tu diseño</p>
              <h2 className={styles.customTitle}>¿Tienes una idea<br />en <em>mente?</em></h2>
              <p className={styles.customDesc}>
                Cuéntanos tu diseño y lo hacemos realidad.
                Elige colores, tamaños y materiales.
              </p>
              <a href={buildCustomWaUrl()} target="_blank" rel="noopener noreferrer" className={styles.btnForm}>
                🎨 Sugerir mi diseño →
              </a>
            </div>

            <div className={styles.customSteps}>
              {[
                { icon:'💬', title:'Cuéntanos',  desc:'Escríbenos por WhatsApp con tu idea, colores y referencia.' },
                { icon:'🧶', title:'Diseñamos',  desc:'Wilma crea tu pieza a mano con los materiales elegidos.' },
                { icon:'📦', title:'Enviamos',   desc:'Te avisamos cuando esté lista y coordinamos el despacho.' },
                { icon:'🌸', title:'¡La tuya!',  desc:'Una pieza 100% única, diseñada especialmente para ti.' },
              ].map(s => (
                <div key={s.title} className={styles.step}>
                  <div className={styles.stepIcon}>{s.icon}</div>
                  <h4 className={styles.stepTitle}>{s.title}</h4>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer} id="footer">
        <img src="stickers/gato-durmiendo.png" className={styles.footerSticker} alt="" onError={e => e.currentTarget.remove()} />
        <div className={styles.footerGrid}>
          <div>
            <p className={styles.footerBrand}>Wilma <span>Store</span></p>
            <p className={styles.footerTagline}>Crochet hecho a mano con amor desde Chile. Cada pieza es única, como tú.</p>
          </div>
          <div>
            <h6 className={styles.footerH}>Catálogo</h6>
            <ul className={styles.footerList}>
              <li><a href="#catalogo">Scrunchies</a></li>
              <li><a href="#catalogo">Diademas</a></li>
              <li><a href="#catalogo">Sets</a></li>
              <li><a href="#personalizado">Diseño personalizado</a></li>
            </ul>
          </div>
          <div>
            <h6 className={styles.footerH}>Contacto</h6>
            <ul className={styles.footerList}>
              <li><a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>Instagram · @wilmastore</li>
              <li>Envíos a todo Chile</li>
              <li>Lun–Vie · 10:00–19:00</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Wilma Store · Hecho con 🧶 en Chile</span>
          <span>Crochet artesanal · Piezas únicas</span>
        </div>
      </footer>

      {/* ── BOTÓN FLOTANTE WA ── */}
      <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className={styles.floatWa} aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  )
}

function CatSVG() {
  return (
    <svg width="220" height="240" viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="92" rx="30" ry="14" fill="#F0E6D8"/>
      <ellipse cx="50" cy="92" rx="27" ry="12" fill="#E8904A"/>
      <circle  cx="50" cy="48" r="30"           fill="#F0E6D8"/>
      <circle  cx="50" cy="48" r="27"           fill="#E8904A"/>
      <polygon points="24,28 14,8 36,24"         fill="#F0E6D8"/>
      <polygon points="25,27 16,10 35,24"        fill="#E8904A"/>
      <polygon points="27,25 19,12 34,24"        fill="#F5C090"/>
      <polygon points="76,28 86,8 64,24"         fill="#F0E6D8"/>
      <polygon points="75,27 84,10 65,24"        fill="#E8904A"/>
      <polygon points="73,25 81,12 66,24"        fill="#F5C090"/>
      <circle  cx="38" cy="45" r="6"             fill="#2D1A0A"/>
      <circle  cx="62" cy="45" r="6"             fill="#2D1A0A"/>
      <circle  cx="39" cy="44" r="2.5"           fill="white"/>
      <circle  cx="63" cy="44" r="2.5"           fill="white"/>
      <path d="M46,56 L54,56 L50,61 Z"           fill="#E87070"/>
      <path d="M44,61 Q50,67 56,61" fill="none" stroke="#8B4513" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="10" y1="52" x2="38" y2="54"     stroke="#C8A090" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="58" x2="38" y2="58"     stroke="#C8A090" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="90" y1="52" x2="62" y2="54"     stroke="#C8A090" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="90" y1="58" x2="62" y2="58"     stroke="#C8A090" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M30,78 Q50,73 70,78"   fill="none" stroke="#C8703A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28,88 Q50,83 72,88"   fill="none" stroke="#C8703A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M72,96 Q90,84 86,64 Q83,50 76,62" fill="none" stroke="#F0E6D8" strokeWidth="10" strokeLinecap="round"/>
      <path d="M72,96 Q90,84 86,64 Q83,50 76,62" fill="none" stroke="#E8904A" strokeWidth="7"  strokeLinecap="round"/>
      <ellipse cx="35" cy="102" rx="12" ry="7"   fill="#E8904A"/>
      <ellipse cx="65" cy="102" rx="12" ry="7"   fill="#E8904A"/>
      <ellipse cx="35" cy="99"  rx="8"  ry="4"   fill="none" stroke="#D4B8E8" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}
