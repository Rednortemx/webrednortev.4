import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getRelatedPropertyLandings,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/monterrey/departamentos-en-renta';
const title = 'Departamentos en renta en Monterrey, Nuevo León | Rednorte';
const description = 'Departamentos en renta en Monterrey, Nuevo León. Consulta opciones disponibles, precios, zonas, recámaras, amenidades y características con Rednorte.';
const heroCopy = 'Consulta departamentos actualmente disponibles en renta en Monterrey, Nuevo León. Compara zonas, precios, superficies, recámaras, estacionamiento, amenidades y características para encontrar una opción acorde con tus necesidades. El inventario cambia conforme las propiedades entran, se rentan o dejan de estar disponibles.';

test('define metadata, H1 y hero copy exclusivos para departamentos en renta en Monterrey', () => {
  const landing = findPropertyLandingPage('monterrey', 'departamentos-en-renta');

  assert.equal(landing.path, path);
  assert.equal(landing.heading, 'Departamentos en renta en Monterrey');
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heroCopy, heroCopy);
});

test('publica el bloque editorial aprobado sin conteos ni zonas hardcodeadas', () => {
  const landing = findPropertyLandingPage('monterrey', 'departamentos-en-renta');
  const text = JSON.stringify(landing.editorial);

  assert.equal(landing.editorial.title, 'Rentar un departamento en Monterrey');
  assert.match(landing.editorial.copy, /zona, superficie, número de recámaras, antigüedad, amenidades, estacionamiento y nivel de equipamiento/);
  assert.deepEqual(landing.editorial.paragraphs, [
    'Dentro del municipio existen alternativas en zonas centrales, corredores residenciales y sectores con distintos niveles de conectividad, servicios y equipamiento. El inventario de Rednorte permite revisar opciones vigentes y filtrar según las características que realmente necesitas.',
  ]);
  assert.doesNotMatch(text, /79 departamentos|Centro|San Jerónimo|Contry|Santa María|Obispado|Cumbres|Miravalle/i);
});

test('enlaza al servicio y a las dos landings canónicas relacionadas', () => {
  const landing = findPropertyLandingPage('monterrey', 'departamentos-en-renta');
  const related = getRelatedPropertyLandings(landing);

  assert.equal(landing.servicePath, '/servicios/rentar-propiedad');
  assert.equal(landing.serviceCta, 'Quiero rentar una propiedad');
  assert.deepEqual(
    landing.editorial.links.map(({ anchor, href }) => ({ anchor, href })),
    [
      { anchor: 'rentar una propiedad', href: '/servicios/rentar-propiedad' },
      { anchor: 'casas en renta en Monterrey', href: '/propiedades/monterrey/casas-en-renta' },
      { anchor: 'departamentos en venta en Monterrey', href: '/propiedades/monterrey/departamentos-en-venta' },
    ],
  );
  assert.deepEqual(
    related.slice(0, 2).map(({ path: relatedPath }) => relatedPath),
    [
      '/propiedades/monterrey/casas-en-renta',
      '/propiedades/monterrey/departamentos-en-venta',
    ],
  );
  assert.ok(related.every(({ path: relatedPath }) => !relatedPath.includes('?')));
});

test('conserva canonical, indexabilidad, filtros, paginación y schemas de catálogo', async () => {
  const page = await readFile(
    new URL('../app/propiedades/[slug]/[categoria]/page.jsx', import.meta.url),
    'utf8',
  );

  assert.match(page, /canonical = page > 1 \? `\$\{landing\.path\}\?page=\$\{page\}` : landing\.path/);
  assert.match(page, /page === 1 && landing\.seoTitle/);
  assert.match(page, /\{ absolute: landing\.seoTitle \}/);
  assert.match(page, /robots: hasActiveFilters \? \{ index: false, follow: true \} : undefined/);
  assert.match(page, /serializeJsonLd\(breadcrumbSchema/);
  assert.match(page, /serializeJsonLd\(buildItemList/);
  assert.doesNotMatch(page, /'@type': '(Article|FAQPage|Product|Offer|AggregateOffer|Dataset)'/);
});

test('no altera metadata editorial de las demás landings', () => {
  const casas = findPropertyLandingPage('monterrey', 'casas-en-venta');
  const oficinas = findPropertyLandingPage('monterrey', 'oficinas-en-renta');
  const sanPedro = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');
  const generic = PROPERTY_LANDING_PAGES.filter(
    (landing) => landing.kind === 'segment'
      && ![path, casas.path, oficinas.path, sanPedro.path, '/propiedades/apodaca/casas-en-venta', '/propiedades/monterrey/casas-en-renta'].includes(landing.path),
  );

  assert.equal(casas.seoTitle, 'Casas en venta en Monterrey, Nuevo León | Rednorte');
  assert.equal(oficinas.seoTitle, 'Oficinas en renta en Monterrey, Nuevo León | Rednorte');
  assert.equal(sanPedro.seoTitle, 'Departamentos en renta en San Pedro Garza García | Rednorte');
  assert.ok(generic.every((landing) => !landing.seoTitle && !landing.heroCopy && !landing.editorial));
});
