import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getRelatedPropertyLandings,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/monterrey/casas-en-renta';
const title = 'Casas en renta en Monterrey, Nuevo León | Rednorte';
const description = 'Casas en renta en Monterrey, Nuevo León. Consulta propiedades disponibles, precios, zonas, recámaras, superficies y características con Rednorte.';
const heroCopy = 'Consulta casas actualmente disponibles en renta en Monterrey, Nuevo León. Compara ubicación, precio, superficie, recámaras, estacionamiento y características para encontrar una opción acorde con tus necesidades. El inventario cambia conforme las propiedades entran, se rentan o dejan de estar disponibles.';

test('define metadata, H1 y hero copy exclusivos para casas en renta en Monterrey', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-renta');

  assert.equal(landing.path, path);
  assert.equal(landing.heading, 'Casas en renta en Monterrey');
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heroCopy, heroCopy);
});

test('publica el bloque editorial aprobado sin conteos, colonias ni claims de abundancia', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-renta');
  const text = JSON.stringify(landing.editorial);

  assert.equal(landing.editorial.title, 'Rentar una casa en Monterrey');
  assert.equal(
    landing.editorial.copy,
    'El precio y las características de una casa en renta en Monterrey pueden variar de forma importante según la zona, superficie de terreno y construcción, número de recámaras, estacionamiento, antigüedad, equipamiento y condiciones del inmueble.',
  );
  assert.deepEqual(landing.editorial.paragraphs, [
    'Antes de elegir conviene comparar propiedades similares y revisar no sólo la renta mensual, sino también ubicación, distribución, mantenimiento cuando aplique, requisitos de arrendamiento y condiciones del contrato.',
  ]);
  assert.doesNotMatch(text, /10 casas|El Uro|Centro|Cumbres|Carretera Nacional|San Jerónimo|gran variedad|muchas opciones/i);
});

test('usa el servicio de renta y enlaza de forma recíproca a departamentos y a casas en venta', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-renta');
  const related = getRelatedPropertyLandings(landing);

  assert.equal(landing.servicePath, '/servicios/rentar-propiedad');
  assert.equal(landing.serviceCta, 'Quiero rentar una propiedad');
  assert.deepEqual(
    landing.editorial.links.map(({ anchor, href }) => ({ anchor, href })),
    [
      { anchor: 'rentar una propiedad', href: '/servicios/rentar-propiedad' },
      { anchor: 'departamentos en renta en Monterrey', href: '/propiedades/monterrey/departamentos-en-renta' },
      { anchor: 'casas en venta en Monterrey', href: '/propiedades/monterrey/casas-en-venta' },
    ],
  );
  assert.deepEqual(
    related.slice(0, 2).map(({ path: relatedPath }) => relatedPath),
    [
      '/propiedades/monterrey/departamentos-en-renta',
      '/propiedades/monterrey/casas-en-venta',
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
  assert.match(page, /const servicePath = landing\.servicePath \|\|/);
  assert.match(page, /href=\{servicePath\}>\{landing\.serviceCta/);
  assert.doesNotMatch(page, /'@type': '(Article|FAQPage|Product|Offer|AggregateOffer|Dataset)'/);
});

test('mantiene metadata, CTA y copy de las demás landings sin regresiones', () => {
  const departamentosRenta = findPropertyLandingPage('monterrey', 'departamentos-en-renta');
  const casasVenta = findPropertyLandingPage('monterrey', 'casas-en-venta');
  const oficinas = findPropertyLandingPage('monterrey', 'oficinas-en-renta');
  const sanPedro = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');
  const apodaca = findPropertyLandingPage('apodaca', 'casas-en-venta');
  const generic = PROPERTY_LANDING_PAGES.filter(
    (landing) => landing.kind === 'segment'
      && ![path, departamentosRenta.path, casasVenta.path, oficinas.path, sanPedro.path, apodaca.path].includes(landing.path),
  );

  assert.equal(generic.length, 9);
  assert.ok(generic.every((landing) => !landing.seoTitle && !landing.heroCopy && !landing.editorial));
  assert.equal(departamentosRenta.seoTitle, 'Departamentos en renta en Monterrey, Nuevo León | Rednorte');
  assert.equal(casasVenta.seoTitle, 'Casas en venta en Monterrey, Nuevo León | Rednorte');
  assert.equal(oficinas.seoTitle, 'Oficinas en renta en Monterrey, Nuevo León | Rednorte');
  assert.equal(sanPedro.seoTitle, 'Departamentos en renta en San Pedro Garza García | Rednorte');
  assert.equal(apodaca.serviceCta, 'Quiero comprar una propiedad');
});
