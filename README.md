# Plantilla web para notaría

Sitio estático (HTML + CSS + JavaScript). No necesita instalar nada.

## Estructura

```
notaria/
├── index.html          ← textos, datos de contacto y secciones
├── css/styles.css      ← colores, tipografías y diseño (variables al inicio)
├── js/main.js          ← carrusel, riel de imágenes, menú y formulario
└── assets/img/         ← tus imágenes (hay ejemplos .svg para reemplazar)
```

## Cómo personalizar
1. Abre `index.html` y busca los comentarios `✏️`: te indican qué cambiar.
2. **Imágenes:** pon tus fotos en `assets/img/` y cambia el nombre en el `src` (ej. `hero-1.jpg`).
   - Carrusel principal: 1920×1080 px (.jpg o .webp, máx. ~300 KB cada una).
   - Riel de galería: 900×600 px. Equipo: 600×720 px.
3. **Agregar diapositiva:** copia un bloque `<article class="slide">` completo. Los puntos de navegación se generan solos.
4. **Agregar imagen al riel:** copia una línea `<figure>…</figure>`. La duplicación infinita es automática.
5. **Colores:** cambia las variables al inicio de `css/styles.css` (`--ink`, `--brass`).
6. **Formulario:** lee el comentario en `js/main.js` para conectarlo a Formspree o a tu servidor.
7. **Mapa:** pega el `<iframe>` de Google Maps dentro de `<div class="map">`.
8. Reemplaza `+520000000000` por tu número de WhatsApp/teléfono con lada del país.

## Publicar
Sube la carpeta completa a Netlify, Vercel, GitHub Pages o tu hosting (cPanel).
Para verla local: abre `index.html` o usa la extensión *Live Server* de VS Code.
