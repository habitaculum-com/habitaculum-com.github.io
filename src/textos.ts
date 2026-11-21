// Los textos del sitio viven en src/textos.json (se editan desde el panel de Pages CMS).
// Este archivo solo los ordena para el código; no hace falta tocarlo.
import t from './textos.json';

export const SITIO = t.sitio;
export const MENU = t.menu;
export const PORTADA = t.portada;
export const PAGINAS = t.paginas;

// Las rutas y claves de las secciones son fijas; nombre y descripción salen del JSON.
export const CATEGORIAS = {
  ficcion: { ...t.secciones.ficcion, singular: 'Relato', ruta: 'escritos/ficcion/' },
  poesia: { ...t.secciones.poesia, singular: 'Poema', ruta: 'escritos/poesia/' },
  investigaciones: { ...t.secciones.investigaciones, singular: 'Investigación', ruta: 'investigaciones/' },
} as const;
