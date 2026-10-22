import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getRelatedPropertyLandings,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/monterrey/oficinas-en-renta';
const title = 'Oficinas en renta en Monterrey, Nuevo León | Rednorte';
const description = 'Oficinas en renta en Monterrey, Nuevo León. Consulta espacios corporativos, ubicaciones, superficies, precios y características con Rednorte.';
const heroCopy = 'Consulta oficinas en renta actualmente disponibles en Monterrey, Nuevo León. Compara ubicaciones, superficies, precios, estacionamiento, equipamiento y características de espacios corporativos. El inventario de Rednorte se actualiza conforme las propiedades entran o salen del mercado.';

test('define metadata, H1 y hero copy exclusivos para oficinas en renta en Monterrey', () => {
  const landing = findPropertyLandingPage('monterrey', 'oficinas-en-renta');

  assert.equal(landing.path, path);
  assert.equal(landing.heading, 'Oficinas en renta en Monterrey');
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heroCopy, heroCopy);
});

test('publica el bloque editorial comercial sin cifras de mercado fechadas', () => {
  const landing = findPropertyLandingPage('monterrey', 'oficinas-en-renta');
  const text = JSON.stringify(landing.editorial);

  assert.equal(landing.editorial.title, 'Renta de oficinas en Monterrey');
  assert.equal(
    landing.editorial.copy,
    'El mercado de oficinas en Monterrey incluye espacios con perfiles muy distintos: desde oficinas pequeñas hasta pisos completos dentro de edificios corporativos. La renta puede variar de forma importante según ubicación, superficie, estado de entrega, estacionamiento, mantenimiento, equipamiento y características del edificio.',
  );
  assert.deepEqual(landing.editorial.paragraphs, [
    'Antes de comparar dos oficinas conviene revisar si el precio publicado corresponde a una renta total o a una tarifa por metro cuadrado, y si conceptos como mantenimiento, IVA, estacionamiento o adecuaciones se cobran por separado.',
  ]);
  assert.equal(landing.editorial.links[0].anchor, 'asesoría inmobiliaria comercial en Monterrey');
  assert.equal(landing.editorial.links[0].href, '/servicios/inmobiliaria-comercial');
  assert.doesNotMatch(text, /470 publicaciones|38 oficinas|mediana|precio por m²/i);
});

test('prioriza el servicio comercial y la landing limpia de locales en renta', () => {
  const landing = findPropertyLandingPage('monterrey', 'oficinas-en-renta');
  const related = getRelatedPropertyLandings(landing);

  assert.equal(landing.servicePath, '/servicios/inmobiliaria-comercial');
  assert.equal(landing.serviceCta, 'Quiero encontrar una oficina');
  assert.equal(related[0].path, '/propiedades/monterrey/locales-en-renta');
  assert.ok(related.every(({ path: relatedPath }) => !relatedPath.includes('?')));
});

test('conserva canonical, indexabilidad, filtros, paginación y schemas de catálogo', async () => {
  const page = await readFile(
    new URL('../app/propiedades/[slug]/[categoria]/page.jsx', import.meta.url),
    'utf8',
  );
  const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(page, /canonical = page > 1 \? `\$\{landing\.path\}\?page=\$\{page\}` : landing\.path/);
  assert.match(page, /page === 1 && landing\.seoTitle/);
  assert.match(page, /\{ absolute: landing\.seoTitle \}/);
  assert.match(page, /robots: hasActiveFilters \? \{ index: false, follow: true \} : undefined/);
  assert.match(page, /serializeJsonLd\(breadcrumbSchema/);
  assert.match(page, /serializeJsonLd\(buildItemList/);
  assert.match(page, /const servicePath = landing\.servicePath \|\|/);
  assert.match(page, /href=\{servicePath\}>\{landing\.serviceCta/);
  assert.match(page, /landing\.editorial\.paragraphs\?\.map/);
  assert.doesNotMatch(page, /'@type': '(Article|FAQPage|Product|Offer|AggregateOffer|LocalBusiness|Service)'/);
  assert.match(
    styles,
    /\.property-landing-page \.prop-card-footer\s*\{[^}]*display:\s*flex[^}]*justify-content:\s*space-between/s,
  );
  assert.match(styles, /\.property-landing-page \.prop-card-footer strong\s*\{[^}]*white-space:\s*nowrap/s);
});

test('mantiene intactas las demás landings configuradas', () => {
  const apodaca = findPropertyLandingPage('apodaca', 'casas-en-venta');
  const casasMonterrey = findPropertyLandingPage('monterrey', 'casas-en-venta');
  const sanPedro = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');
  const valleOriente = findPropertyLandingPage('san-pedro-garza-garcia', 'valle-oriente');
  const generic = PROPERTY_LANDING_PAGES.filter(
    (landing) => landing.kind === 'segment'
      && ![path, apodaca.path, casasMonterrey.path, sanPedro.path].includes(landing.path),
  );

  assert.equal(generic.length, 11);
  assert.ok(generic.every((landing) => !landing.seoTitle && !landing.heroCopy && !landing.editorial));
  assert.equal(casasMonterrey.seoTitle, undefined);
  assert.equal(casasMonterrey.heroCopy, undefined);
  assert.equal(casasMonterrey.editorial.linkHref, '/insights/cuanto-cuesta-comprar-casa-monterrey');
  assert.equal(apodaca.servicePath, undefined);
  assert.equal(apodaca.serviceCta, 'Quiero comprar una propiedad');
  assert.equal(sanPedro.servicePath, undefined);
  assert.equal(valleOriente.servicePath, '/servicios');
});
