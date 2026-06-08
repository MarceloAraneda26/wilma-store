// src/App.jsx
import { useState } from 'react'
import { PRODUCTS, CATEGORIES, CATALOG_IMAGES, WHATSAPP_NUMBER } from './data/products'
import { buildCustomWaUrl } from './utils/whatsapp'
import { useModal } from './hooks/useModal'

import Navbar       from './components/Navbar'
import ProductCard  from './components/ProductCard'
import ProductModal from './components/ProductModal'

import './styles/global.css'
import './styles/animations.css'
import styles from './App.module.css'

const MARQUEE_STICKERS = [
  '02_perfil_sentado_colmillo',
  '06_estirandose_colmillo',
  '09_parado_colmillo',
  '02_perfil_sentado_colmillo',
  '06_estirandose_colmillo',
  '09_parado_colmillo',
  '02_perfil_sentado_colmillo',
]

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { selectedProduct, openModal, closeModal } = useModal()

  const filtered = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter)

  return (
    <>
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <header className={styles.hero} id="inicio">

        <img src="stickers/13_ovillo_colmillo.png"          className={`${styles.stickerHero} ${styles.tl} anim-float`}     alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/08_saludando_colmillo.png"       className={`${styles.stickerHero} ${styles.tr} anim-float-alt`} alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/05_durmiendo_colmillo.png"       className={`${styles.stickerHero} ${styles.bl} anim-float-slow`}alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/03_caminando_lateral_colmillo.png" className={`${styles.stickerHero} ${styles.br} anim-float`}   alt="" onError={e => e.currentTarget.remove()} />

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

        {/* Mascota principal */}
        <div className={styles.heroCat}>
          <div className={styles.catFrame}>
            <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
            <img src="stickers/08_saludando_colmillo.png" className={styles.stickerOnCat} alt="" onError={e => e.currentTarget.remove()} />
            <img src="stickers/01_frente_sentado_colmillo.png" alt="Wilma Store mascota" className={styles.catMainImg} />
          </div>
        </div>
      </header>

      {/* ══════════ MARQUEE ══════════ */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className={styles.marqueeInner}>
              {['HECHO A MANO', 'CROCHET ARTESANAL', 'ENVÍOS A TODO CHILE', 'PIEZAS ÚNICAS', 'DISEÑOS EXCLUSIVOS', 'PIDE EL TUYO', 'WILMA STORE'].map((txt, j) => (
                <span key={j} className={styles.marqueeItem}>
                  {txt}
                  <img src={`stickers/${MARQUEE_STICKERS[j]}.png`} className={styles.marqueeMini} alt="" onError={e => { e.currentTarget.style.display = 'none' }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ SEPARADOR GATITOS ══════════ */}
      <div className={styles.catDivider}>
        <img src="stickers/12_caminando_colmillo.png"        className={`${styles.dividerCat} ${styles.dc1} anim-float-slow`} alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/06_estirandose_colmillo.png"      className={`${styles.dividerCat} ${styles.dc2} anim-float`}      alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/14_cajita_colmillo.png"           className={`${styles.dividerCat} ${styles.dc3} anim-float-alt`}  alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/09_parado_colmillo.png"           className={`${styles.dividerCat} ${styles.dc4} anim-float-slow`} alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/11_espalda_colmillo.png"          className={`${styles.dividerCat} ${styles.dc5} anim-float`}      alt="" onError={e => e.currentTarget.remove()} />
      </div>

      <section className={styles.lookbookSection} aria-labelledby="catalogo-aurora">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Catálogo Aurora</p>
          <h2 id="catalogo-aurora" className={styles.sectionTitle}>Colores que ya están <em>listos.</em></h2>
          <p className={styles.sectionSub}>
            Estas son las fichas reales del catálogo. Revisa el color, textura y cuidados antes de elegir tu favorito.
          </p>
          <div className={styles.lookbookGrid}>
            {CATALOG_IMAGES.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={styles.lookbookItem}
                onClick={() => openModal(PRODUCTS[i])}
                aria-label={`Ver detalles de ${PRODUCTS[i]?.name || item.alt}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CATÁLOGO ══════════ */}
      <section id="catalogo" className={styles.catalogSection}>
        <img src="stickers/04_comiendo_colmillo.png"   className={styles.sectionStickerRight} alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/10_mirando_atras_colmillo.png" className={styles.sectionStickerLeft}  alt="" onError={e => e.currentTarget.remove()} />

        <div className={styles.container}>
          <p className={styles.sectionLabel}>Catálogo</p>
          <div className={styles.titleRow}>
            <h2 className={styles.sectionTitle}>Nuestras <em>piezas.</em></h2>
            <img src="stickers/02_perfil_sentado_colmillo.png" className={styles.titleSticker} alt="" onError={e => e.currentTarget.remove()} />
          </div>
          <p className={styles.sectionSub}>
            Haz clic en cualquier producto para ver detalles y contactarnos por WhatsApp.
          </p>

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

      {/* ══════════ PERSONALIZADO ══════════ */}
      <section id="personalizado" className={styles.customSection}>
        <div className={styles.container}>
          <div className={styles.customBox}>
            <img src="stickers/07_posicion_pan_colmillo.png" className={styles.customSticker}       alt="" onError={e => e.currentTarget.remove()} />
            <img src="stickers/05_durmiendo_colmillo.png"    className={styles.customStickerTopLeft} alt="" onError={e => e.currentTarget.remove()} />

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

      {/* ══════════ FOOTER ══════════ */}
      <footer className={styles.footer} id="footer">
        <img src="stickers/05_durmiendo_colmillo.png" className={styles.footerSticker}     alt="" onError={e => e.currentTarget.remove()} />
        <img src="stickers/14_cajita_colmillo.png"    className={styles.footerStickerLeft}  alt="" onError={e => e.currentTarget.remove()} />

        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerLogoRow}>
              <img src="stickers/01_frente_sentado_colmillo.png" className={styles.footerCatImg} alt="Wilma Store" onError={e => e.currentTarget.remove()} />
              <p className={styles.footerBrand}>Wilma <span>Store</span></p>
            </div>
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
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
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

      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className={styles.floatWa} aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  )
}
