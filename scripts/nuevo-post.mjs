// Crea un escrito nuevo:  npm run nuevo -- "Título del escrito" poesia
import { writeFileSync, existsSync } from 'node:fs';

const [titulo, categoria = 'ficcion'] = process.argv.slice(2);
const validas = ['ficcion', 'poesia', 'investigaciones'];
if (!titulo || !validas.includes(categoria)) {
  console.log('Uso: npm run nuevo -- "Título del escrito" [' + validas.join('|') + ']');
  process.exit(1);
}
const slug = titulo.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const ruta = `src/content/posts/${slug}.md`;
if (existsSync(ruta)) { console.log('Ya existe:', ruta); process.exit(1); }
const hoy = new Date().toISOString().slice(0, 10);
writeFileSync(ruta, `---
titulo: "${titulo.replace(/"/g, '\\"')}"
fecha: ${hoy}
categoria: ${categoria}
extracto: "Una o dos frases que resuman el escrito."
etiquetas: []
borrador: true
---

Empezá a escribir acá.
`);
console.log('Creado:', ruta, '\n(Está como borrador: cambiá "borrador: true" a false para publicarlo.)');
