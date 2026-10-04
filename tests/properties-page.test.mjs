import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PROPERTIES_PER_PAGE } from '../lib/propertyPagination.js';

test('propiedades omite la etiqueta positiva y conserva el aviso de contingencia', async () => {
  const page = await readFile(new URL('../app/propiedades/page.jsx', import.meta.url), 'utf8');

  assert.doesNotMatch(page, /Inventario actualizado/);
  assert.match(page, /source !== 'live'/);
  assert.match(page, /Inventario no disponible en este momento/);
});

test('el H1 de propiedades usa el contenedor centrado de la página', async () => {
  const page = await readFile(new URL('../app/propiedades/page.jsx', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(page, /className="propiedades-heading"/);
  assert.match(styles, /\.propiedades-heading\s*\{[^}]*max-width:\s*1200px[^}]*margin:\s*0 auto[^}]*text-align:\s*center/s);
  assert.doesNotMatch(page, /<h1 style=/);
});

test('la paginación tiene metadatos únicos y los filtros libres no se indexan', async () => {
  const page = await readFile(new URL('../app/propiedades/page.jsx', import.meta.url), 'utf8');
  const filters = await readFile(new URL('../components/PropertyFilters.jsx', import.meta.url), 'utf8');

  assert.match(page, /Explora la página \$\{page\} del inventario/);
  assert.match(page, /robots: hasActiveFilters \? \{ index: false, follow: true \} : undefined/);
  assert.match(page, /if \(source === 'live' && requestedPage > totalPages\) notFound\(\)/);
  assert.match(page, /'m2Min', 'm2Max'/);
  assert.match(page, /m2Min: sp\?\.m2Min \|\| ''/);
  assert.match(filters, /useState\(initialFilters\.m2Min \|\| ''\)/);
  assert.match(filters, /useState\(initialFilters\.m2Max \|\| ''\)/);
});

test('la navegación cliente sincroniza la página y los filtros con la URL', async () => {
  const filters = await readFile(new URL('../components/PropertyFilters.jsx', import.meta.url), 'utf8');

  assert.match(filters, /import \{ useEffect, useMemo, useState \} from 'react'/);
  assert.match(filters, /useEffect\(\(\) => \{/);
  assert.match(filters, /setAppliedFilters\(nextFilters\)/);
  assert.match(filters, /setPage\(Math\.max\(1, Number\(initialFilters\.page\) \|\| 1\)\)/);
  assert.match(filters, /initialFilters\.page,[\s\S]*\]\);/);
});

test('muestra 18 propiedades y permite cargar bloques adicionales sin perder enlaces paginados', async () => {
  const page = await readFile(new URL('../app/propiedades/page.jsx', import.meta.url), 'utf8');
  const filters = await readFile(new URL('../components/PropertyFilters.jsx', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.equal(PROPERTIES_PER_PAGE, 18);
  assert.match(page, /Math\.ceil\(properties\.length \/ PROPERTIES_PER_PAGE\)/);
  assert.match(filters, /const \[visiblePageCount, setVisiblePageCount\] = useState\(1\)/);
  assert.match(filters, /visiblePageCount \* PROPERTIES_PER_PAGE/);
  assert.match(filters, /Ver \{nextBatchSize\}/);
  assert.match(filters, /href=\{buildPageHref\(nextPage\)\}/);
  assert.match(filters, /event\.preventDefault\(\)/);
  assert.match(filters, /Mostrando <strong>\{start \+ 1\}–\{start \+ pageItems\.length\}<\/strong> de/);
  assert.match(filters, /aria-current=\{item === currentPage \? 'page' : undefined\}/);
  assert.match(styles, /\.btn-load-more-properties/);
});
