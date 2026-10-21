import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getInsight, getPublishedInsights } from '../lib/insights.js';
import { findPropertyLandingPage } from '../lib/propertyLandingPages.js';

const slug = 'cuanto-cuesta-comprar-casa-apodaca';

function sectionsById(insight) {
  return new Map(insight.sections.map((section) => [section.id, section]));
}

function contextualLinks(insight) {
  return insight.sections.flatMap((section) => section.contextualLinks || []);
}

test('publica slug, metadata, canonical, H1 y corte editorial aprobados', async () => {
  const insight = getInsight(slug);
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');

  assert.ok(insight);
  assert.equal(insight.slug, slug);
  assert.equal(insight.title, '¿Cuánto cuesta comprar una casa en Apodaca en 2026?');
  assert.equal(insight.seoTitle, 'Cuánto cuesta una casa en Apodaca en 2026 | Rednorte');
  assert.equal(insight.seoTitleAbsolute, true);
  assert.equal(
    insight.description,
    'Precios de casas en venta en Apodaca en 2026: mediana, rangos, precio por m², recámaras, zonas e inventario con metodología Rednorte.',
  );
  assert.equal(insight.spatialCoverage, 'Apodaca, Nuevo León');
  assert.equal(insight.schemaSpatialCoverage, false);
  assert.match(insight.directAnswer, /20 de octubre de 2026/);
  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
  assert.match(page, /<h1>\{insight\.title\}<\/h1>/);
  assert.ok(getPublishedInsights().some((item) => item.slug === slug));
});

test('conserva universo, mediana, percentiles, recámaras, superficie y precio por m²', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);

  assert.match(insight.directAnswer, /271 publicaciones/);
  assert.match(insight.directAnswer, /\$3\.4 millones/);
  assert.match(insight.directAnswer, /\$2\.45 y \$4\.27 millones/);
  assert.deepEqual(sections.get('precio-casa-apodaca').table.rows.slice(1, 4), [
    ['Percentil 25', '$2.445 MDP'],
    ['Mediana', '$3.40 MDP'],
    ['Percentil 75', '$4.27 MDP'],
  ]);
  assert.deepEqual(sections.get('precio-recamaras').table.rows.map((row) => row.slice(0, 3)), [
    ['2', '40', '$2.18 MDP'],
    ['3', '172', '$3.57 MDP'],
    ['4', '39', '$3.90 MDP'],
  ]);
  assert.match(sections.get('precio-recamaras').paragraphs.join(' '), /grupo más numeroso.*172 publicaciones/);
  assert.match(sections.get('superficie').paragraphs.join(' '), /259 publicaciones/);
  assert.match(sections.get('superficie').paragraphs.join(' '), /160 m²/);
  assert.match(sections.get('precio-metro-cuadrado').paragraphs.join(' '), /257 publicaciones/);
  assert.match(sections.get('precio-metro-cuadrado').paragraphs.join(' '), /\$21,333 MXN/);
});

test('explica filtro, duplicados, inventario separado y limitaciones', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const outliers = sections.get('precios-atipicos').paragraphs.join(' ');
  const duplicates = sections.get('duplicados').paragraphs.join(' ');
  const inventory = sections.get('inventario-rednorte').paragraphs.join(' ');
  const limitations = sections.get('que-no-significan').bullets.join(' ');

  assert.match(outliers, /276 publicaciones/);
  assert.match(outliers, /\$500,000 y \$20,000,000/);
  assert.match(duplicates, /40 vínculos confirmados/);
  assert.match(duplicates, /no afirma que existan 271 propiedades únicas/);
  assert.match(inventory, /14 casas/);
  assert.match(inventory, /\$1,833,500 a \$5,300,000/);
  assert.match(inventory, /mediana de \$3\.64 millones/);
  assert.match(inventory, /únicamente el inventario vigente de Rednorte/);
  assert.match(sections.get('contexto-renta').paragraphs.join(' '), /19 casas/);
  assert.match(limitations, /No son precios de cierre/);
  assert.match(limitations, /No permiten declarar cuál colonia es la más barata o la más cara/);
});

test('mantiene tablas, fuentes e internal linking aprobado', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const links = contextualLinks(insight).map(({ anchor, href }) => [anchor, href]);

  assert.equal(sections.get('comparacion-mercado').table.rows[1][1], '334');
  assert.equal(sections.get('fuentes-publicaciones').table.rows.length, 7);
  assert.equal(sections.get('zonas').table.rows.length, 5);
  assert.ok(insight.sources.some(({ url }) => url === 'https://mudafy.com.mx/venta/casas/nuevo-leon-apodaca'));
  assert.deepEqual(links, [
    ['casas en venta en Apodaca', '/propiedades/apodaca/casas-en-venta'],
    ['casas en renta en Apodaca', '/propiedades/apodaca/casas-en-renta'],
    ['cómo comprar una propiedad en Monterrey', '/insights/como-comprar-propiedad-monterrey'],
    ['cómo estimar cuánto vale una casa en Monterrey', '/insights/cuanto-vale-mi-casa-monterrey'],
    ['cómo vender una propiedad en Monterrey', '/insights/como-vender-propiedad-monterrey'],
  ]);
  assert.deepEqual(insight.related, [
    'como-comprar-propiedad-monterrey',
    'cuanto-vale-mi-casa-monterrey',
    'como-vender-propiedad-monterrey',
  ]);
});

test('agrega enlace recíproco sólo a la landing de casas en venta de Apodaca', () => {
  const landing = findPropertyLandingPage('apodaca', 'casas-en-venta');
  const rent = findPropertyLandingPage('apodaca', 'casas-en-renta');

  assert.equal(landing.editorial.linkAnchor, 'cuánto cuesta comprar una casa en Apodaca');
  assert.equal(landing.editorial.linkHref, `/insights/${slug}`);
  assert.doesNotMatch(JSON.stringify(landing.editorial), /3\.4|271|21,333|2\.45|4\.27/);
  assert.equal(rent.editorial, undefined);
});

test('conserva Article, FAQPage y BreadcrumbList sin schemas no autorizados', async () => {
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');

  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(page, /'@type': 'BreadcrumbList'/);
  assert.doesNotMatch(page, /'@type': '(Dataset|StatisticalPopulation|Product|Offer|AggregateOffer)'/);
});
