# Cómo sacar Contatto de Magic Patterns con la inmersión funcionando

La animación del iris no es un dibujo: es **código React** (framer-motion lee el scroll y calcula el zoom en cada fotograma). Por eso:

- **Figma no puede replicarla.** Figma importa capas estáticas; no ejecuta código ni animaciones ligadas al scroll. Ahí solo llegará la composición, nunca el movimiento.
- **El ZIP falla** casi siempre porque le falta el "motor" que compila el proyecto: Vite, el plugin de Tailwind v4 y las versiones exactas de las librerías. Sin eso, las clases no se generan o framer-motion no carga.

La solución es montar un proyecto mínimo con exactamente las mismas piezas. Son 5 archivos.

## 1. Crear el proyecto

Necesitas Node.js 18 o superior. En una terminal:

```bash
npm create vite@latest contatto -- --template react-ts
cd contatto
npm install react@18.3.1 react-dom@18.3.1 framer-motion@11.18.2 lucide-react@0.577.0
npm install -D tailwindcss@4.3.1 @tailwindcss/vite@4.3.1 @types/react@18 @types/react-dom@18
```

Borra lo que trae Vite en `src/` (App.tsx, App.css, index.css, assets/).

## 2. `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 3. `src/index.css`

Copia **tal cual** el `index.css` del frame Contatto Landing copy (las fuentes de Google, `@import 'tailwindcss';` y el bloque `@theme`). Añade al final:

```css
html, body { margin: 0; background: #d9d9d9; }
```

## 4. `src/ContattoLanding.tsx`

Copia **entero** el `index.tsx` del frame (abre el frame → vista de código → copia todo). No necesita cambios: solo usa `react`, `framer-motion` y `lucide-react`, y las imágenes están en un CDN público.

## 5. `src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import ContattoLanding from './ContattoLanding'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContattoLanding />
  </React.StrictMode>
)
```

## Probar y publicar

```bash
npm run dev      # abre http://localhost:5173 y haz scroll
npm run build    # genera la carpeta dist/
```

La carpeta `dist/` es una web estática: súbela a **Vercel**, **Netlify** (arrastrar y soltar) o cualquier hosting y la inmersión funcionará igual que aquí.

## Si algo no va

| Síntoma | Causa |
| --- | --- |
| Se ve sin estilos, todo apilado | Falta `tailwindcss()` en `vite.config.ts` o `@import 'tailwindcss';` en el CSS |
| Tipografías genéricas | El `@import url(...)` de Google Fonts no está **encima** de `@import 'tailwindcss';` |
| El ojo no hace zoom al hacer scroll | La página no hace scroll en `window` (algún contenedor padre con `overflow: hidden` o `height: 100vh`). Deja `body` sin altura fija |
| Error de `motion` o `useScroll` | Versión distinta de framer-motion: instala exactamente `11.18.2` |

## ¿Y en Framer, Webflow o WordPress?

- **Framer**: crea un *Code Component* y pega el archivo; Framer ya incluye framer-motion. Las clases de Tailwind no funcionan ahí, así que habría que pasarlas a estilos en línea.
- **Webflow / WordPress**: no ejecutan React directamente. Publica el `dist/` en Vercel y enlázalo, o incrústalo con un iframe a pantalla completa.
