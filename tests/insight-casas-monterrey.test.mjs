import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getInsight, getPublishedInsights } from '../lib/insights.js';
import { findPropertyLandingPage } from '../lib/propertyLandingPages.js';

const slug = 'cuanto-cuesta-comprar-casa-monterrey';

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
  assert.equal(insight.title, '¿Cuánto cuesta comprar una casa en Monterrey en 2026?');
  assert.equal(insight.seoTitle, 'Cuánto cuesta una casa en Monterrey en 2026 | Rednorte');
  assert.equal(insight.seoTitleAbsolute, true);
  assert.equal(
    insight.description,
    'Precios de casas en venta en Monterrey en 2026: mercado debajo y arriba de $10 millones, medianas, recámaras, precio por m² y metodología Rednorte.',
  );
  assert.equal(insight.spatialCoverage, 'Monterrey, Nuevo León');
  assert.ok(getPublishedInsights().some((item) => item.slug === slug));
  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
  assert.match(page, /<h1>\{insight\.title\}<\/h1>/);
  assert.match(insight.sections.at(-1).subsections[0].paragraphs.join(' '), /20 de octubre de 2026/);
});

test('prioriza la segmentación y no presenta la mediana municipal como respuesta aislada', () => {
  const insight = getInsight(slug);

  assert.match(insight.directAnswer, /568 publicaciones.*\$6\.2 millones/);
  assert.match(insight.directAnswer, /465 publicaciones.*\$16\.7 millones/);
  assert.match(insight.directAnswer, /1,033 publicaciones en MXN.*\$9\.5 millones/);
  assert.match(insight.directAnswer, /precios publicados/);
  assert.doesNotMatch(insight.directAnswer, /^Una casa en Monterrey cuesta \$9\.5 millones\.?$/);
  assert.doesNotMatch(insight.directAnswer, /promedio|\$12\.60 MDP/);
  assert.deepEqual(insight.processTable.map(({ stage, action, objective }) => [stage, action, objective]), [
    ['Menos de $10 MDP', '568', '$6.20 MDP'],
    ['$10 MDP o más', '465', '$16.70 MDP'],
    ['Muestra municipal completa', '1,033', '$9.50 MDP'],
  ]);
});

test('conserva percentiles, recámaras, superficie y precio publicado por m²', () => {
  const sections = sectionsById(getInsight(slug));

  assert.deepEqual(sections.get('distribucion-municipal').table.rows, [
    ['Percentil 25', '$5.95 MDP'],
    ['Mediana', '$9.50 MDP'],
    ['Percentil 75', '$15.95 MDP'],
    ['Percentil 90', '$25.24 MDP'],
  ]);
  assert.deepEqual(sections.get('precio-recamaras').table.rows, [
    ['2', '52', '$3.79 MDP'],
    ['3', '498', '$8.55 MDP'],
    ['4', '243', '$12.80 MDP'],
    ['5', '108', '$13.85 MDP'],
    ['6', '29', '$9.50 MDP'],
  ]);
  assert.match(sections.get('precio-recamaras').paragraphs.join(' '), /no explica por sí solo el precio/);
  assert.match(sections.get('superficie').paragraphs.join(' '), /1,010 publicaciones/);
  assert.deepEqual(sections.get('superficie').table.rows.map((row) => row[1]), ['214 m²', '310 m²', '460 m²']);
  assert.match(sections.get('precio-metro-cuadrado').paragraphs.join(' '), /mediana de precio publicado por m² de construcción/);
  assert.match(sections.get('precio-metro-cuadrado').paragraphs.join(' '), /\$30,654 MXN\/m²/);
});

test('excluye íntegramente JamesEdition y USD de los cálculos principales', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const methodology = sections.get('metodologia').subsections;
  const james = methodology.find(({ title }) => title === 'Exclusión de JamesEdition');
  const mainTables = insight.sections
    .filter(({ id }) => id !== 'fuentes-publicaciones')
    .flatMap((section) => section.table?.rows || []);

  assert.ok(james);
  assert.match(james.paragraphs.join(' '), /59 publicaciones de JamesEdition denominadas en USD/);
  assert.match(james.paragraphs.join(' '), /excluyeron íntegramente de todos los cálculos principales en MXN/);
  assert.match(james.paragraphs.join(' '), /No se convirtieron a MXN/);
  assert.doesNotMatch(JSON.stringify(mainTables), /JamesEdition|USD/);
  assert.equal(sections.get('fuentes-publicaciones').table.rows.length, 7);
  assert.doesNotMatch(JSON.stringify(sections.get('fuentes-publicaciones').table.rows), /JamesEdition|USD/);
  assert.equal(
    sections.get('fuentes-publicaciones').note,
    'JamesEdition: 59 publicaciones en USD, excluidas de las estadísticas en MXN.',
  );
});

test('mantiene contraste Mudafy sin declarar una fuente superior', () => {
  const insight = getInsight(slug);
  const section = sectionsById(insight).get('comparacion-mudafy');
  const text = section.paragraphs.join(' ');

  assert.deepEqual(section.table.rows, [
    ['Rednorte Data', '1,033', '$9.50 MDP', '~$30,654', '$8.55 MDP', '$12.80 MDP'],
    ['Mudafy', '4,142', '~$12.046 MDP', '~$31,919', '~$10.527 MDP', '~$15.064 MDP'],
  ]);
  assert.match(text, /composición de cada universo/);
  assert.match(text, /contraste de orden de magnitud/);
  assert.match(text, /ninguna se presenta como más correcta/);
  assert.ok(insight.sources.some(({ url }) => url === 'https://mudafy.com.mx/venta/casas/nuevo-leon-monterrey'));
});

test('explica duplicados e inventario NocNok como universos separados', () => {
  const sections = sectionsById(getInsight(slug));
  const duplicates = sections.get('duplicados').paragraphs.join(' ');
  const inventory = sections.get('inventario-rednorte').paragraphs.join(' ');

  assert.match(duplicates, /1,033 publicaciones no significa que existan 1,033 casas únicas/);
  assert.match(duplicates, /220 vínculos confirmados/);
  assert.match(inventory, /52 casas/);
  assert.match(inventory, /\$1\.90 MDP a \$85 MDP/);
  assert.match(inventory, /\$11\.75 MDP/);
  assert.match(inventory, /únicamente el inventario vigente de Rednorte/);
  assert.match(sections.get('metodologia').subsections.find(({ title }) => title === 'Inventario vigente').paragraphs.join(' '), /forma independiente/);
});

test('mantiene internal linking y related aprobados', () => {
  const insight = getInsight(slug);
  const links = contextualLinks(insight).map(({ anchor, href }) => [anchor, href]);

  assert.deepEqual(links, [
    ['casas en venta en Monterrey', '/propiedades/monterrey/casas-en-venta'],
    ['cómo comprar una propiedad en Monterrey', '/insights/como-comprar-propiedad-monterrey'],
    ['cuánto vale mi casa en Monterrey', '/insights/cuanto-vale-mi-casa-monterrey'],
    ['cómo vender una propiedad en Monterrey', '/insights/como-vender-propiedad-monterrey'],
  ]);
  assert.deepEqual(insight.related, [
    'como-comprar-propiedad-monterrey',
    'cuanto-vale-mi-casa-monterrey',
    'como-vender-propiedad-monterrey',
  ]);
});

test('agrega el enlace recíproco sin copiar cifras fechadas a la landing', () => {
  const landing = findPropertyLandingPage('monterrey', 'casas-en-venta');
  const editorial = JSON.stringify(landing.editorial);

  assert.equal(landing.editorial.linkAnchor, 'cuánto cuesta comprar una casa en Monterrey');
  assert.equal(landing.editorial.linkHref, `/insights/${slug}`);
  assert.doesNotMatch(editorial, /6\.2|9\.5|16\.7|1,033|30,654/);
});

test('actualiza la FAQ principal y conserva Article, FAQPage y BreadcrumbList', async () => {
  const insight = getInsight(slug);
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');

  assert.equal(insight.faqs[0].question, '¿Cuánto cuesta una casa en Monterrey en 2026?');
  assert.match(insight.faqs[0].answer, /568 publicaciones.*\$6\.2 millones/);
  assert.match(insight.faqs[0].answer, /465 publicaciones.*\$16\.7 millones/);
  assert.match(insight.faqs[0].answer, /1,033 publicaciones combinadas.*\$9\.5 millones/);
  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(page, /'@type': 'BreadcrumbList'/);
  assert.doesNotMatch(page, /'@type': '(Dataset|Product|Offer|AggregateOffer)'/);
});
