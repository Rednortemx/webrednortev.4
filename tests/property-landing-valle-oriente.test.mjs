import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getLandingsForProperty,
  getRelatedPropertyLandings,
  propertyMatchesLanding,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/san-pedro-garza-garcia/valle-oriente';
const title = 'Propiedades en Valle Oriente, San Pedro Garza García | Rednorte';
const description = 'Propiedades en venta y renta en Valle Oriente, San Pedro Garza García. Consulta departamentos, oficinas, casas y otros inmuebles disponibles con Rednorte.';
const heading = 'Propiedades en Valle Oriente, San Pedro Garza García';

test('define una sola landing area canónica para Valle Oriente', () => {
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');

  assert.equal(landing.kind, 'area');
  assert.equal(landing.path, path);
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heading, heading);
  assert.deepEqual(landing.settlements, ['Zona Valle Oriente', 'Del Valle Oriente']);
  assert.equal(PROPERTY_LANDING_PAGES.filter((item) => item.path === path).length, 1);
  assert.equal(PROPERTY_LANDING_PAGES.some((item) => /zona-valle-oriente|del-valle-oriente/.test(item.path)), false);
});

test('incluye sólo settlements exactos normalizados dentro de San Pedro', () => {
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');

  assert.equal(propertyMatchesLanding({
    municipio: 'San Pedro Garza García', settlement: 'Zona Valle Oriente', type: 'Oficina', op: 'Renta',
  }, landing), true);
  assert.equal(propertyMatchesLanding({
    municipio: 'SAN PEDRO GARZA GARCIA', settlement: '  del valle oriente  ', type: 'Casa', op: 'Venta',
  }, landing), true);
  assert.equal(propertyMatchesLanding({
    municipio: 'Monterrey', settlement: 'Zona Valle Oriente', type: 'Depto', op: 'Renta',
  }, landing), false);
  assert.equal(propertyMatchesLanding({
    municipio: 'San Pedro Garza García', settlement: 'Valle Oriente', type: 'Depto', op: 'Renta',
  }, landing), false);
  assert.equal(propertyMatchesLanding({
    municipio: 'Monterrey', settlement: 'Valle del Mirador', zone: 'Valle Oriente', title: 'Oficina Valle Oriente',
  }, landing), false);
});

test('acepta venta, renta y múltiples tipos sin ampliar el alcance territorial', () => {
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');
  const variants = [
    { type: 'Depto', op: 'Renta', settlement: 'Zona Valle Oriente' },
    { type: 'Oficina', op: 'Venta', settlement: 'Del Valle Oriente' },
    { type: 'Casa', op: 'Renta', settlement: 'Del Valle Oriente' },
    { type: 'Local', op: 'Venta', settlement: 'Zona Valle Oriente' },
  ];

  for (const variant of variants) {
    assert.equal(propertyMatchesLanding({
      municipio: 'San Pedro Garza García', ...variant,
    }, landing), true);
  }
});

test('prioriza landings limpias de San Pedro y conserva segmento más área en fichas', () => {
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');
  const related = getRelatedPropertyLandings(landing);
  assert.deepEqual(related.slice(0, 2).map((item) => item.path), [
    '/propiedades/san-pedro-garza-garcia/departamentos-en-renta',
    '/propiedades/san-pedro-garza-garcia/locales-en-renta',
  ]);

  const links = getLandingsForProperty({
    municipio: 'San Pedro Garza García', settlement: 'Zona Valle Oriente', type: 'Depto', op: 'Renta',
  });
  assert.deepEqual(links.map((item) => item.path), [
    '/propiedades/san-pedro-garza-garcia/departamentos-en-renta',
    path,
  ]);
});

test('preserva settlement y lo entrega al catálogo sin modificar zone', async () => {
  const properties = await readFile(new URL('../lib/properties.js', import.meta.url), 'utf8');

  assert.match(properties, /zone: zoneParts\.join\(', '\) \|\| 'Nuevo León',\s+settlement: p\.settlement \|\| ''/);
  assert.match(properties, /zone: property\.zone,\s+settlement: property\.settlement/);
});

test('fija el territorio, mantiene filtros comerciales y evita fugas del fallback', async () => {
  const page = await readFile(
    new URL('../app/propiedades/[slug]/[categoria]/page.jsx', import.meta.url),
    'utf8',
  );
  const filters = await readFile(new URL('../components/PropertyFilters.jsx', import.meta.url), 'utf8');
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');

  assert.match(page, /inventoryProperties = landing\.kind === 'area' \? matchingProperties : properties/);
  assert.match(page, /zona: landing\.kind === 'area' \? ''/);
  assert.match(page, /fixedLocationLabel=\{landing\.fixedLocationLabel\}/);
  assert.match(filters, /value=\{fixedLocationLabel\}/);
  assert.match(filters, /readOnly/);
  assert.match(filters, /filtro-operacion/);
  assert.match(filters, /filtro-tipo/);
  assert.match(filters, /filtro-categoria/);
  assert.match(filters, /precioMin/);
  assert.match(filters, /recamaras/);
  assert.match(filters, /banos/);
  assert.match(filters, /m2Min/);
  assert.equal(propertyMatchesLanding({
    municipio: 'Valle Oriente, Monterrey', settlement: '', zone: 'Valle Oriente, Monterrey',
  }, landing), false);
});

test('conserva canonical, robots, paginación y schemas permitidos', async () => {
  const page = await readFile(
    new URL('../app/propiedades/[slug]/[categoria]/page.jsx', import.meta.url),
    'utf8',
  );

  assert.match(page, /canonical = page > 1 \? `\$\{landing\.path\}\?page=\$\{page\}` : landing\.path/);
  assert.match(page, /robots: hasActiveFilters \? \{ index: false, follow: true \} : undefined/);
  assert.match(page, /serializeJsonLd\(breadcrumbSchema\(breadcrumbItems\)\)/);
  assert.match(page, /serializeJsonLd\(buildItemList\(matchingProperties, page\)\)/);
  assert.match(page, /if \(source === 'live' && page > totalPages\) notFound\(\)/);
  assert.doesNotMatch(page, /'@type': '(Article|FAQPage|Product|AggregateOffer)'/);
});

test('publica copy editorial, enlaces, directorio, fichas y sitemap sin filtros', async () => {
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');
  const directory = await readFile(new URL('../components/PropertyLandingDirectory.jsx', import.meta.url), 'utf8');
  const detail = await readFile(new URL('../app/propiedades/[slug]/page.jsx', import.meta.url), 'utf8');
  const sitemap = await readFile(new URL('../app/sitemap.js', import.meta.url), 'utf8');

  assert.equal(landing.editorial.title, 'Bienes raíces en Valle Oriente');
  assert.equal(landing.editorial.links[0].href, '/insights/cuanto-cuesta-rentar-departamento-san-pedro');
  assert.equal(landing.editorial.links[1].href, '/propiedades/san-pedro-garza-garcia/departamentos-en-renta');
  assert.match(directory, /PROPERTY_LANDING_PAGES\.map/);
  assert.match(detail, /getLandingsForProperty/);
  assert.match(detail, /inventoryLandings\.map/);
  assert.match(sitemap, /PROPERTY_LANDING_PAGES\.map/);
  assert.doesNotMatch(sitemap, /precioMin|precioMax|recamaras|banos|m2Min|m2Max/);
});
