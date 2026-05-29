# 🧶 Wilma Store

Catálogo web de accesorios de crochet hechos a mano.  
**Stack:** React 18 · Vite 5 · CSS Modules · GitHub Pages

---

## 📁 Estructura del proyecto

```
wilma-store/
├── public/
│   └── stickers/           ← PNGs de los gatos (12 archivos)
│       ├── gato-sentado.png
│       ├── gato-jugando.png
│       └── ...
├── src/
│   ├── components/         ← Navbar, ProductCard, ProductModal
│   ├── data/
│   │   └── products.js     ← ✏️ EDITA AQUÍ los productos y WA
│   ├── hooks/
│   │   └── useModal.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── animations.css
│   ├── utils/
│   │   └── whatsapp.js
│   ├── App.jsx
│   ├── App.module.css
│   └── main.jsx
├── index.html
├── vite.config.js          ← Cambia `base` al nombre de tu repo
└── package.json
```

---

## 🚀 Inicio rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/wilma-store.git
cd wilma-store

# 2. Instalar dependencias
npm install

# 3. Desarrollo local (http://localhost:5173)
npm run dev

# 4. Build para producción
npm run build

# 5. Previsualizar build
npm run preview
```

---

## ✏️ Cómo agregar o editar productos

Abre **`src/data/products.js`** y edita el array `PRODUCTS`:

```js
{
  id: 10,                        // número único
  name:     'Mi Nuevo Producto',
  category: 'scrunchie',         // scrunchie | diadema | set | otro
  emoji:    '🌺',               // fallback si no hay sticker
  bg:       '#FFE8F0',           // color de fondo de la tarjeta
  sticker:  'gato-comiendo.png', // archivo en /public/stickers/
  badge:    'new',               // 'new' | 'hot' | ''
  price:    '$5.500',
  material: 'Lana merino',
  size:     'Única',
  desc:     'Descripción del producto...',
},
```

También cambia el número de WhatsApp:
```js
export const WHATSAPP_NUMBER = '56912345678'  // ← número real de Wilma
```

---

## 🖼️ Agregar stickers o fotos de productos

1. Guarda la imagen en **`/public/stickers/`**
2. Referencia el nombre del archivo en `src/data/products.js` → campo `sticker`
3. La web carga la imagen automáticamente. Si no existe, muestra el emoji de respaldo.

> **Tip:** Para usar fotos reales de los productos en lugar de stickers, simplemente pon las fotos en esa carpeta y actualiza el campo `sticker` con el nombre del archivo.

---

## 🌐 Deploy en GitHub Pages

```bash
# 1. Asegúrate de que vite.config.js tenga el nombre correcto de tu repo:
#    base: '/wilma-store/'

# 2. Instalar gh-pages (ya está en devDependencies)
npm install

# 3. Deploy con un solo comando
npm run deploy
```

La web queda disponible en:  
`https://TU_USUARIO.github.io/wilma-store/`

---

## 🎨 Personalizar colores

Edita **`src/styles/variables.css`** para cambiar la paleta completa:

```css
:root {
  --lilac-d: #9B72C8;  /* Color principal (botones, acentos) */
  --cream:   #FBF5EE;  /* Fondo general */
  --text:    #2D1E1E;  /* Color de texto */
}
```

---

## 📦 Dependencias

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 18.x | UI |
| react-dom | 18.x | Render |
| vite | 5.x | Build & Dev server |
| @vitejs/plugin-react | 4.x | JSX transform |
| gh-pages | 6.x | Deploy a GitHub Pages |

---

*Hecho con 🧶 y mucho amor — Wilma Store 2026*
