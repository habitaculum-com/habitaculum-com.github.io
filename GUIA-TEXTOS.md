# Cómo cargar textos en Habitaculum

La idea: **vos escribís en un panel web y el sitio se actualiza solo.**
No hace falta tocar código ni instalar nada en tu computadora.

## La herramienta: Pages CMS (gratis)

Pages CMS es un panel web conectado a tu repositorio de GitHub.
Al guardar un texto, se sube a GitHub y el blog se vuelve a publicar solo en 2 o 3 minutos.
El orden (portada, secciones, fechas, buscador) lo resuelve el sitio automáticamente.

## Puesta en marcha (una sola vez)

1. Crear una cuenta en https://github.com (gratis).
2. Crear un repositorio llamado `habitaculum` y subir el proyecto
   (o pasármelo y lo subo yo).
3. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
4. Entrar a https://app.pagescms.org → **Sign in with GitHub** → dar acceso al repositorio `habitaculum`.

## Uso diario

En el panel vas a ver tres secciones:

| Sección | Para qué |
|---|---|
| **Escritos e investigaciones** | Crear, editar o borrar textos. Botón **Add an entry** para uno nuevo. |
| **Sobre mí** | El texto de tu página personal. |
| **Textos del sitio** | Título, menú y frases fijas de cada página. |

Al crear un escrito completás:

- **Título**
- **Sección**: Ficción, Poesía o Investigaciones
- **Fecha**: la portada muestra siempre el más reciente
- **Extracto**: una o dos frases para la portada y las listas
- **Etiquetas** (opcional)
- **Borrador**: si está marcado, no se publica todavía
- **Texto**: el escrito completo, con negrita, cursiva y subtítulos

En **poesía**: Enter separa estrofas; **Mayúscula + Enter** pasa al verso siguiente.

Para las investigaciones hay un modelo en `plantillas/investigacion.md` con la estructura sugerida
(pregunta, qué dice la investigación, qué significa en la práctica, pregunta abierta, referencias).
