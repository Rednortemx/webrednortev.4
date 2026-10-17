import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('la colección Luxury falla cerrada y cruza solo referencias aprobadas con Nocnok', async () => {
  const source = await readFile(new URL('../lib/luxuryProperties.js', import.meta.url), 'utf8');

  assert.match(source, /payload\?\.available/);
  assert.match(source, /Array\.isArray\(payload\.propertyIds\)/);
  assert.match(source, /source !== 'live'/);
  assert.match(source, /properties: \[\], source: 'unavailable'/);
  assert.match(source, /selectLuxuryProperties\(properties, propertyIds\)/);
  assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY|NOCNOK_API_KEY/);
});

test('la página pública incluye metadatos, filtros acotados y estado de contingencia', async () => {
  const page = await readFile(
    new URL('../app/propiedades/luxury/page.jsx', import.meta.url),
    'utf8',
  );

  assert.match(page, /canonical: '\/propiedades\/luxury'/);
  assert.match(page, /basePath="\/propiedades\/luxury"/);
  assert.match(page, /operacion: 'Venta'/);
  assert.match(page, /categoria: 'Residencial'/);
  assert.match(page, /Colección temporalmente no disponible/);
});

test('home y sitemap enlazan la colección Luxury aprobada', async () => {
  const [home, sitemap] = await Promise.all([
    readFile(new URL('../app/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/sitemap.js', import.meta.url), 'utf8'),
  ]);

  assert.match(home, /fetchLuxuryProperties/);
  assert.match(home, /href="\/propiedades\/luxury"/);
  assert.match(sitemap, /'\/propiedades\/luxury'/);
});
