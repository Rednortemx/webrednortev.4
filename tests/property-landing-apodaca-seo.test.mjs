import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getRelatedPropertyLandings,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/apodaca/casas-en-venta';
const title = 'Casas en venta en Apodaca, Nuevo León | Rednorte';
const description = 'Casas en venta en Apodaca, Nuevo León. Consulta inventario actualizado, precios, fraccionamientos, superficies y características con Rednorte.';
const heroCopy = 'Consulta casas en venta actualmente disponibles en Apodaca, Nuevo León. Compara precios, fraccionamientos, superficies, recámaras y características. El inventario de Rednorte se actualiza conforme las propiedades entran o salen del mercado.';

test('define metadata, H1 y hero copy exclusivos para casas en venta en Apodaca', () => {
  const landing = findPropertyLandingPage('apodaca', 'casas-en-venta');

  assert.equal(landing.path, path);
  assert.equal(landing.heading, 'Casas en venta en Apodaca');
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heroCopy, heroCopy);
});

test('conserva el bloque editorial y enlace recíproco sin duplicar cifras fechadas', () => {
  const landing = findPropertyLandingPage('apodaca', 'casas-en-venta');
  const text = JSON.stringify(landing.editorial);

  assert.equal(landing.editorial.title, 'Precios de casas en venta en Apodaca');
  assert.equal(
    landing.editorial.copy,
    'El inventario vigente permite comparar propiedades actualmente disponibles. Para entender el mercado completo, Rednorte analiza por separado precios publicados, rangos, recámaras, superficies y precio por metro cuadrado en Apodaca.',
  );
  assert.equal(landing.editorial.linkAnchor, 'cuánto cuesta comprar una casa en Apodaca');
  assert.equal(landing.editorial.linkHref, '/insights/cuanto-cuesta-comprar-casa-apodaca');
  assert.equal(
    landing.editorial.linkAfter,
    'Consulta la metodología, fuentes y limitaciones del estudio antes de comparar una propiedad específica.',
  );
  assert.doesNotMatch(text, /3\.4|21,333|271 publicaciones|2\.45|4\.27/);
});

test('mantiene servicio de compra y prioriza la landing limpia de renta en Apodaca', () => {
  const landing = findPropertyLandingPage('apodaca', 'casas-en-venta');
  const related = getRelatedPropertyLandings(landing);

  assert.equal(landing.operation, 'Venta');
  assert.equal(landing.serviceCta, 'Quiero comprar una propiedad');
  assert.equal(related[0].path, '/propiedades/apodaca/casas-en-renta');
  assert.ok(related.every(({ path: relatedPath }) => !relatedPath.includes('?')));
});

test('conserva canonical, indexabilidad, filtros, paginación y schemas autorizados', async () => {
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
  assert.match(page, /landing\.operation === 'Venta'[\s\S]*'\/servicios\/comprar-propiedad'/);
  assert.match(page, /href=\{servicePath\}>\{landing\.serviceCta/);
  assert.doesNotMatch(page, /'@type': '(Article|FAQPage|Product|Offer|AggregateOffer)'/);
});

test('no cambia metadata, hero ni CTA de las otras landings', () => {
  const others = PROPERTY_LANDING_PAGES.filter(
    (landing) => landing.kind === 'segment'
      && landing.path !== path
      && landing.path !== '/propiedades/san-pedro-garza-garcia/departamentos-en-renta',
  );
  const sanPedro = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');
  const valleOriente = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');

  assert.equal(others.length, 13);
  assert.ok(others.every((landing) => !landing.seoTitle && !landing.heroCopy && !landing.serviceCta));
  assert.equal(sanPedro.seoTitle, 'Departamentos en renta en San Pedro Garza García | Rednorte');
  assert.equal(sanPedro.serviceCta, undefined);
  assert.equal(valleOriente.heading, 'Propiedades en Valle Oriente, San Pedro Garza García');
});
