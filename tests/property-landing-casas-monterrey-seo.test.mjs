import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getRelatedPropertyLandings,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/monterrey/casas-en-venta';
const title = 'Casas en venta en Monterrey, Nuevo León | Rednorte';
const description = 'Casas en venta en Monterrey, Nuevo León. Consulta inventario actualizado, precios, zonas, superficies, recámaras y características con Rednorte.';
const heroCopy = 'Consulta casas en venta actualmente disponibles en Monterrey, Nuevo León. Compara precios, zonas, superficies, recámaras, terreno y características. El inventario de Rednorte se actualiza conforme las propiedades entran o salen del mercado.';

test('define metadata, H1 y hero copy exclusivos para casas en venta en Monterrey', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-venta');

  assert.equal(landing.path, path);
  assert.equal(landing.heading, 'Casas en venta en Monterrey');
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heroCopy, heroCopy);
});

test('publica el bloque editorial y enlace recíproco sin cifras fechadas del Insight', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-venta');
  const text = JSON.stringify(landing.editorial);

  assert.equal(landing.editorial.title, 'Precios de casas en venta en Monterrey');
  assert.equal(
    landing.editorial.copy,
    'El mercado de casas en Monterrey incluye propiedades de segmentos, tamaños y ubicaciones muy diferentes. El precio puede variar de forma importante según zona, superficie construida, terreno, número de recámaras, antigüedad, condición, equipamiento y características del inmueble.',
  );
  assert.deepEqual(landing.editorial.paragraphs, [
    'Para entender el mercado más allá del inventario vigente, Rednorte analiza por separado las publicaciones de menor y mayor valor dentro del municipio.',
  ]);
  assert.equal(landing.editorial.linkAnchor, 'cuánto cuesta comprar una casa en Monterrey');
  assert.equal(landing.editorial.linkHref, '/insights/cuanto-cuesta-comprar-casa-monterrey');
  assert.equal(
    landing.editorial.linkAfter,
    'Consulta la metodología, rangos, recámaras y precio por metro cuadrado del estudio antes de comparar una propiedad específica.',
  );
  assert.doesNotMatch(text, /6\.2|9\.5|16\.7|1,033|30,654/);
});

test('usa el servicio de compra y prioriza landings limpias relacionadas de Monterrey', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-venta');
  const related = getRelatedPropertyLandings(landing);

  assert.equal(landing.operation, 'Venta');
  assert.equal(landing.servicePath, '/servicios/comprar-propiedad');
  assert.equal(landing.serviceCta, 'Quiero comprar una propiedad');
  assert.deepEqual(related.slice(0, 2).map(({ path: relatedPath }) => relatedPath), [
    '/propiedades/monterrey/departamentos-en-venta',
    '/propiedades/monterrey/casas-en-renta',
  ]);
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
  assert.match(page, /const servicePath = landing\.servicePath \|\|/);
  assert.match(page, /href=\{servicePath\}>\{landing\.serviceCta/);
  assert.doesNotMatch(page, /'@type': '(Article|FAQPage|Product|Offer|AggregateOffer)'/);
});

test('mantiene metadata y copy de las demás landings sin regresiones', () => {
  const apodaca = findPropertyLandingPage('apodaca', 'casas-en-venta');
  const departamentosRenta = findPropertyLandingPage('monterrey', 'departamentos-en-renta');
  const offices = findPropertyLandingPage('monterrey', 'oficinas-en-renta');
  const sanPedro = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');
  const generic = PROPERTY_LANDING_PAGES.filter(
    (landing) => landing.kind === 'segment'
      && ![path, apodaca.path, departamentosRenta.path, offices.path, sanPedro.path, '/propiedades/monterrey/casas-en-renta', '/propiedades/monterrey/locales-en-renta'].includes(landing.path),
  );

  assert.equal(generic.length, 8);
  assert.ok(generic.every((landing) => !landing.seoTitle && !landing.heroCopy && !landing.editorial));
  assert.equal(apodaca.seoTitle, 'Casas en venta en Apodaca, Nuevo León | Rednorte');
  assert.equal(offices.seoTitle, 'Oficinas en renta en Monterrey, Nuevo León | Rednorte');
  assert.equal(sanPedro.seoTitle, 'Departamentos en renta en San Pedro Garza García | Rednorte');
});
