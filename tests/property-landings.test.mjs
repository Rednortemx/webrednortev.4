import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getRelatedPropertyLandings,
  propertyMatchesLanding,
} from '../lib/propertyLandingPages.js';

test('publica solo las 15 búsquedas de inventario aprobadas y sin rutas duplicadas', () => {
  assert.equal(PROPERTY_LANDING_PAGES.length, 15);
  assert.equal(new Set(PROPERTY_LANDING_PAGES.map((landing) => landing.path)).size, 15);
  assert.ok(PROPERTY_LANDING_PAGES.every((landing) => landing.path.startsWith('/propiedades/')));
});

test('incluye las combinaciones prioritarias de Monterrey y municipios', () => {
  assert.equal(
    findPropertyLandingPage('monterrey', 'departamentos-en-renta')?.heading,
    'Departamentos en renta en Monterrey',
  );
  assert.equal(
    findPropertyLandingPage('san-pedro-garza-garcia', 'locales-en-renta')?.municipality,
    'San Pedro Garza García',
  );
  assert.equal(findPropertyLandingPage('monterrey', 'bodegas-en-venta'), undefined);
});

test('el inventario de una landing exige tipo, operación y municipio exactos', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-venta');
  assert.equal(propertyMatchesLanding({ type: 'Casa', op: 'Venta', municipio: 'Monterrey' }, landing), true);
  assert.equal(propertyMatchesLanding({ type: 'Casa', op: 'Renta', municipio: 'Monterrey' }, landing), false);
  assert.equal(propertyMatchesLanding({ type: 'Casa', op: 'Venta', municipio: 'San Pedro Garza García' }, landing), false);
});

test('las páginas relacionadas priorizan el mismo municipio', () => {
  const landing = findPropertyLandingPage('monterrey', 'departamentos-en-renta');
  const related = getRelatedPropertyLandings(landing);

  assert.equal(related.length, 6);
  assert.ok(related.slice(0, 4).every((item) => item.municipality === 'Monterrey'));
});

test('la plantilla usa canonical paginado, JSON-LD e inventario dinámico sin cifras editoriales', async () => {
  const page = await readFile(new URL('../app/propiedades/[slug]/[categoria]/page.jsx', import.meta.url), 'utf8');

  assert.match(page, /generateStaticParams/);
  assert.match(page, /alternates: \{ canonical \}/);
  assert.match(page, /serializeJsonLd\(buildItemList/);
  assert.match(page, /El inventario se actualiza/);
  assert.match(page, /basePath=\{landing\.path\}/);
  assert.match(page, /baseFilters=\{baseFilters\}/);
  assert.doesNotMatch(page, /\b(75|52|39|31|22) propiedades\b/);
});

test('el sitemap y la página general enlazan todas las landings permitidas', async () => {
  const sitemap = await readFile(new URL('../app/sitemap.js', import.meta.url), 'utf8');
  const propertiesPage = await readFile(new URL('../app/propiedades/page.jsx', import.meta.url), 'utf8');
  const directory = await readFile(new URL('../components/PropertyLandingDirectory.jsx', import.meta.url), 'utf8');

  assert.match(sitemap, /PROPERTY_LANDING_PAGES/);
  assert.match(sitemap, /propertyLandingEntries/);
  assert.match(propertiesPage, /<PropertyLandingDirectory \/>/);
  assert.match(directory, /PROPERTY_LANDING_PAGES\.map/);
});

test('la paginación admite una ruta base y conserva los filtros editoriales', async () => {
  const filters = await readFile(new URL('../components/PropertyFilters.jsx', import.meta.url), 'utf8');

  assert.match(filters, /basePath = '\/propiedades'/);
  assert.match(filters, /baseFilters = \{\}/);
  assert.match(filters, /return qs \? `\$\{basePath\}\?\$\{qs\}` : basePath/);
  assert.match(filters, /setAppliedFilters\(defaults\)/);
});
