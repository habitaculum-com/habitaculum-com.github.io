import type { APIRoute } from 'astro';
import { SITIO, obtenerPosts, urlPost } from '../lib/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await obtenerPosts();
  const base = new URL(import.meta.env.BASE_URL, site);
  const items = posts.map((p) => `
    <item>
      <title>${esc(p.data.titulo)}</title>
      <link>${new URL(urlPost(p), site)}</link>
      <guid>${new URL(urlPost(p), site)}</guid>
      <pubDate>${p.data.fecha.toUTCString()}</pubDate>
      <description>${esc(p.data.extracto)}</description>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${esc(SITIO.titulo)}</title>
  <link>${base}</link>
  <description>${esc(SITIO.subtitulo)}</description>
  <language>es</language>${items}
</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
