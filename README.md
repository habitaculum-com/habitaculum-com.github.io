# Habitaculum

Blog personal hecho con [Astro](https://astro.build): escritos (ficción y poesía) e investigaciones, con ilustraciones de aguará guazú, yaguareté y yacaré que cambian entre el modo día y el modo noche.

## Qué necesitás instalar (una sola vez)

1. **Node.js 20 o superior**: https://nodejs.org (versión "LTS").
2. **Git**: https://git-scm.com
3. Una cuenta de **GitHub** (gratis) para la publicación automática.
4. Recomendado: **Visual Studio Code** para editar los textos.

## Trabajar en tu computadora

```bash
npm install        # solo la primera vez
npm run dev        # abre el blog en http://localhost:4321
```

## Escribir un post

Cada escrito es un archivo `.md` en `src/content/posts/`. Podés copiar uno existente o usar:

```bash
npm run nuevo -- "Título del escrito" poesia   # o ficcion / investigaciones
```

Encabezado de cada archivo:

```yaml
---
titulo: "El silencio del estero"
fecha: 2026-11-18
categoria: investigaciones  # ficcion | poesia | investigaciones
extracto: "Resumen corto que aparece en las listas."
etiquetas: ["silencio", "Iberá"]
borrador: false             # true = no se publica
---
```

En **poesía**, cada salto de línea del archivo se respeta como verso.

## Publicación automática (GitHub Pages)

1. Creá un repositorio en GitHub y subí esta carpeta.
2. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
3. Listo. Cada vez que subas un cambio a `main` (por ejemplo, un post nuevo), el blog se vuelve a publicar solo en unos minutos.

> Alternativa: conectar el repositorio en Netlify o Vercel (detectan Astro solos).

## Dónde cambiar cosas

| Qué | Archivo |
|---|---|
| **Todos los textos** (ver `GUIA-TEXTOS.md`) | panel de Pages CMS o `src/textos.json` |
| Colores y tipografías | `src/styles/global.css` |
| Texto de "Sobre mí" | `src/textos/sobre-mi.md` |
| Ilustraciones | `src/components/animales/` |
