import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getRelatedPropertyLandings,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/monterrey/locales-en-renta';
const title = 'Locales comerciales en renta en Monterrey | Rednorte';
const description = 'Locales comerciales en renta en Monterrey, Nuevo León. Consulta opciones disponibles, ubicaciones, precios, superficies y características con Rednorte.';
const heroCopy = 'Consulta locales comerciales actualmente disponibles en renta en Monterrey, Nuevo León. Compara ubicaciones, precios, superficies y características para identificar opciones acordes con las necesidades de tu negocio. El inventario cambia conforme los inmuebles entran, se rentan o dejan de estar disponibles.';

test('define metadata, H1 y hero copy exclusivos para locales en renta en Monterrey', () => {
  const landing = findPropertyLandingPage('monterrey', 'locales-en-renta');

  assert.equal(landing.path, path);
  assert.equal(landing.heading, 'Locales en renta en Monterrey');
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heroCopy, heroCopy);
});

test('publica el bloque editorial aprobado sin conteos, zonas ni garantías comerciales', () => {
  const landing = findPropertyLandingPage('monterrey', 'locales-en-renta');
  const text = JSON.stringify(landing.editorial);

  assert.equal(landing.editorial.title, 'Rentar un local comercial en Monterrey');
  assert.equal(
    landing.editorial.copy,
    'Elegir un local comercial en Monterrey implica evaluar más que la renta mensual. La ubicación, superficie, distribución, accesibilidad, visibilidad, estacionamiento y características del inmueble pueden influir en su conveniencia para cada actividad comercial.',
  );
  assert.deepEqual(landing.editorial.paragraphs, [
    'Antes de tomar una decisión conviene revisar los requisitos de arrendamiento, condiciones del contrato, mantenimiento cuando aplique y compatibilidad del inmueble con la operación que se pretende realizar. El uso de suelo y los permisos correspondientes deben verificarse para cada caso.',
  ]);
  assert.doesNotMatch(text, /29 locales|Centro|Obispado|Santa María|Cumbres|plaza comercial|corredor|garantiz|rentabilidad|afluencia|tránsito peatonal/i);
});

test('prioriza el servicio comercial y enlaza únicamente rutas canónicas existentes', () => {
  const landing = findPropertyLandingPage('monterrey', 'locales-en-renta');
  const related = getRelatedPropertyLandings(landing);

  assert.equal(landing.servicePath, '/servicios/inmobiliaria-comercial');
  assert.equal(landing.serviceCta, 'Quiero encontrar un local comercial');
  assert.deepEqual(
    landing.editorial.links.map(({ anchor, href }) => ({ anchor, href })),
    [
      { anchor: 'asesoría inmobiliaria comercial', href: '/servicios/inmobiliaria-comercial' },
      { anchor: 'oficinas en renta en Monterrey', href: '/propiedades/monterrey/oficinas-en-renta' },
    ],
  );
  assert.equal(related[0].path, '/propiedades/monterrey/oficinas-en-renta');
  assert.ok(related.every(({ path: relatedPath }) => !relatedPath.includes('?')));
  assert.ok(!PROPERTY_LANDING_PAGES.some((item) => item.path === '/propiedades/monterrey/bodegas-en-renta'));
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
  const casasRenta = findPropertyLandingPage('monterrey', 'casas-en-renta');
  const casasVenta = findPropertyLandingPage('monterrey', 'casas-en-venta');
  const oficinas = findPropertyLandingPage('monterrey', 'oficinas-en-renta');
  const sanPedro = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');
  const apodaca = findPropertyLandingPage('apodaca', 'casas-en-venta');
  const generic = PROPERTY_LANDING_PAGES.filter(
    (landing) => landing.kind === 'segment'
      && ![path, departamentosRenta.path, casasRenta.path, casasVenta.path, oficinas.path, sanPedro.path, apodaca.path].includes(landing.path),
  );

  assert.equal(generic.length, 8);
  assert.ok(generic.every((landing) => !landing.seoTitle && !landing.heroCopy && !landing.editorial));
  assert.equal(oficinas.seoTitle, 'Oficinas en renta en Monterrey, Nuevo León | Rednorte');
  assert.equal(casasRenta.serviceCta, 'Quiero rentar una propiedad');
  assert.equal(departamentosRenta.servicePath, '/servicios/rentar-propiedad');
  assert.equal(casasVenta.servicePath, '/servicios/comprar-propiedad');
  assert.equal(sanPedro.seoTitle, 'Departamentos en renta en San Pedro Garza García | Rednorte');
  assert.equal(apodaca.serviceCta, 'Quiero comprar una propiedad');
});
