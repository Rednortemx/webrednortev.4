import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
} from '../lib/propertyLandingPages.js';

const path = '/propiedades/san-pedro-garza-garcia/departamentos-en-renta';
const title = 'Departamentos en renta en San Pedro Garza García | Rednorte';
const description = 'Departamentos en renta en San Pedro Garza García, Nuevo León. Consulta inventario actualizado, precios, zonas, superficies y características con Rednorte.';
const heroCopy = 'Consulta departamentos en renta actualmente disponibles en San Pedro Garza García. Compara precios, zonas, superficies, recámaras y características. El inventario de Rednorte se actualiza conforme las propiedades entran o salen del mercado.';

test('define metadata, H1 y copy exclusivos para departamentos en renta en San Pedro', () => {
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');

  assert.equal(landing.path, path);
  assert.equal(landing.heading, 'Departamentos en renta en San Pedro Garza García');
  assert.equal(landing.seoTitle, title);
  assert.equal(landing.description, description);
  assert.equal(landing.heroCopy, heroCopy);
});

test('agrega el bloque editorial y el enlace contextual sin cifras del Insight', () => {
  const landing = findPropertyLandingPage('san-pedro-garza-garcia', 'departamentos-en-renta');
  const text = JSON.stringify(landing);

  assert.equal(landing.editorial.title, 'Renta de departamentos en San Pedro Garza García');
  assert.equal(
    landing.editorial.linkAnchor,
    'cuánto cuesta rentar un departamento en San Pedro Garza García',
  );
  assert.equal(landing.editorial.linkHref, '/insights/cuanto-cuesta-rentar-departamento-san-pedro');
  assert.equal(
    landing.editorial.linkAfter,
    'En ese análisis Rednorte compara publicaciones observadas por recámaras, zonas y precio por metro cuadrado.',
  );
  assert.doesNotMatch(text, /48,750|455\/m²|338 publicaciones|27,400|55,000|85,000/);
});

test('la plantilla conserva canonical, paginación, noindex de filtros y schemas autorizados', async () => {
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
  assert.doesNotMatch(page, /'@type': '(Article|FAQPage|Product|AggregateOffer)'/);
});

test('las demás landings mantienen su metadata y copy genéricos', () => {
  const others = PROPERTY_LANDING_PAGES.filter((landing) => landing.path !== path);
  const monterrey = findPropertyLandingPage('monterrey', 'departamentos-en-renta');

  assert.equal(others.length, 14);
  assert.ok(others.every((landing) => !landing.seoTitle && !landing.heroCopy && !landing.editorial));
  assert.equal(monterrey.heading, 'Departamentos en renta en Monterrey');
  assert.equal(
    monterrey.description,
    'Explora departamentos en renta en Monterrey, Nuevo León. Compara ubicación, precio, superficie y características en el inventario inmobiliario de Rednorte.',
  );
});
