import type { APIRoute } from 'astro';
import { CATEGORIAS, formatearFecha, obtenerPosts, urlPost } from '../lib/site';

/** Índice de búsqueda generado al compilar el sitio. */
export const GET: APIRoute = async () => {
  const posts = await obtenerPosts();
  const indice = posts.map((p) => ({
    titulo: p.data.titulo,
    url: urlPost(p),
    categoria: CATEGORIAS[p.data.categoria].nombre,
    fecha: formatearFecha(p.data.fecha),
    extracto: p.data.extracto,
    etiquetas: p.data.etiquetas,
    texto: (p.body ?? '').replace(/[#>*_`\[\]()-]/g, ' ').replace(/\s+/g, ' ').trim(),
  }));
  return new Response(JSON.stringify(indice), { headers: { 'Content-Type': 'application/json' } });
};
