import { getCollection, type CollectionEntry } from 'astro:content';

import { SITIO, CATEGORIAS } from '../textos';
export { SITIO, CATEGORIAS };

export type Categoria = keyof typeof CATEGORIAS;

/** Antepone la base del sitio (necesario si se publica en GitHub Pages bajo /repo). */
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export async function obtenerPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.borrador);
  return posts.sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
}

export function urlPost(post: CollectionEntry<'posts'>) {
  return url(`posts/${post.id}/`);
}

export function formatearFecha(fecha: Date) {
  return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function tiempoLectura(texto = '') {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}
