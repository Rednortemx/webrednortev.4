import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function source(path) {
  return readFile(new URL('../' + path, import.meta.url), 'utf8');
}

test('NocNok es la única fuente de fichas públicas, sin registros RN de demostración', async () => {
  const properties = await source('lib/properties.js');
  assert.doesNotMatch(properties, /fallbackProperties|RN-1482|RN-2034|RN-3310|RN-1755|RN-2298|RN-0891/);
  assert.match(properties, /return \{ properties: \[\], source: 'unavailable' \}/);
  assert.match(properties, /unstable_cache/);
  assert.match(properties, /revalidate: 120/);
  assert.match(properties, /throw err;/);
});

test('Home, catálogo y landings muestran estado de indisponibilidad sin anuncios falsos', async () => {
  const [home, catalog, landing, luxury] = await Promise.all([
    source('app/page.jsx'),
    source('app/propiedades/page.jsx'),
    source('app/propiedades/[slug]/[categoria]/page.jsx'),
    source('app/propiedades/luxury/page.jsx'),
  ]);
  assert.doesNotMatch(home, /activeProperties:/);
  assert.match(catalog, /source === 'live' \? \(/);
  assert.match(catalog, /Inventario temporalmente no disponible/);
  assert.match(catalog, /Consulta temporalmente no disponible/);
  assert.match(landing, /source === 'live' \? \(/);
  assert.match(landing, /Inventario temporalmente no disponible/);
  assert.match(landing, /source === 'live' && \(/);
  assert.match(luxury, /source === 'live' && propertyCards\.length > 0/);
});

test('fichas y URLs legacy preservan errores temporales sin falsear un 404', async () => {
  const [detail, error, legacy] = await Promise.all([
    source('app/propiedades/[slug]/page.jsx'),
    source('app/propiedades/[slug]/error.jsx'),
    source('app/propiedad/[...slug]/page.jsx'),
  ]);
  assert.equal((detail.match(/if \(source !== 'live'\)/g) || []).length, 2);
  assert.match(detail, /throw new Error\('Inventario NocNok temporalmente no disponible'\)/);
  assert.match(error, /No pudimos verificar la información de esta propiedad/);
  assert.match(legacy, /if \(status === 'unavailable'\)/);
  assert.match(legacy, /throw new Error/);
});

test('sitemap no enumera fichas sin un inventario vivo validado', async () => {
  const sitemap = await source('app/sitemap.js');
  assert.match(sitemap, /if \(source === 'live'\)/);
  assert.match(sitemap, /fetchAllProperties\(\)/);
  assert.match(sitemap, /buildPropertySlug/);
});
