// src/components/Navbar.jsx
import { useState } from 'react'
import { WHATSAPP_NUMBER } from '../data/products'
import styles from './Navbar.module.css'

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      {/* Brand */}
      <div className={styles.brand}>
        <CatLogo />
        <div className={styles.logoText}>
          Wilma <span>Store</span>
        </div>
      </div>

      {/* Links desktop */}
      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li><a href="#catalogo"      onClick={() => setMenuOpen(false)}>Catálogo</a></li>
        <li><a href="#personalizado" onClick={() => setMenuOpen(false)}>Tu diseño</a></li>
        <li><a href="#footer"        onClick={() => setMenuOpen(false)}>Contacto</a></li>
      </ul>

      {/* CTA WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.waBtn}
      >
        {WA_ICON} WhatsApp
      </a>

      {/* Hamburguesa mobile */}
      <button
        className={styles.toggle}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Abrir menú"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
    </nav>
  )
}

function CatLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 80 88" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="72" rx="23" ry="12" fill="#E8904A"/>
      <circle  cx="40" cy="40" r="23"           fill="#E8904A"/>
      <polygon points="25,21 18,8 31,20"         fill="#E8904A"/>
      <polygon points="27,19 21,10 30,19"        fill="#F5C090"/>
      <polygon points="55,21 62,8 49,20"         fill="#E8904A"/>
      <polygon points="53,19 59,10 50,19"        fill="#F5C090"/>
      <circle  cx="33" cy="38" r="5"             fill="#2D1A0A"/>
      <circle  cx="47" cy="38" r="5"             fill="#2D1A0A"/>
      <circle  cx="34" cy="37" r="2"             fill="white"/>
      <circle  cx="48" cy="37" r="2"             fill="white"/>
      <path d="M37,47 L43,47 L40,51 Z"           fill="#E87070"/>
      <path d="M36,51 Q40,55 44,51" fill="none" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M62,78 Q78,68 74,52 Q71,40 66,50" fill="none" stroke="#E8904A" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  )
}
