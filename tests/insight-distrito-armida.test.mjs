import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getInsight, getPublishedInsights } from '../lib/insights.js';

const slug = 'cuanto-cuesta-rentar-cerca-distrito-armida';

function sectionsById(insight) {
  return new Map(insight.sections.map((section) => [section.id, section]));
}

test('publica el Insight con slug, metadata, canonical editorial y H1 aprobados', () => {
  const insight = getInsight(slug);

  assert.ok(insight);
  assert.equal(insight.slug, slug);
  assert.equal(
    insight.title,
    '¿Cuánto cuesta rentar un departamento cerca de Distrito Armida y Valle Oriente en 2026?',
  );
  assert.equal(
    insight.seoTitle,
    'Rentas cerca de Distrito Armida y Valle Oriente en 2026 | Rednorte',
  );
  assert.equal(insight.seoTitleAbsolute, true);
  assert.equal(
    insight.description,
    'Precios de renta cerca de Distrito Armida, Haciendas de la Sierra y Valle Oriente: medianas, rangos, recámaras, precio por m² y metodología Rednorte.',
  );
  assert.equal(insight.updatedAt, '2026-10-20');
  assert.equal(insight.schemaSpatialCoverage, false);
  assert.equal(
    insight.spatialCoverage,
    'Distrito Armida, Haciendas de la Sierra y Valle Oriente, San Pedro Garza García, Nuevo León',
  );
  assert.equal(
    `/insights/${insight.slug}`,
    '/insights/cuanto-cuesta-rentar-cerca-distrito-armida',
  );
  assert.ok(getPublishedInsights().some((item) => item.slug === slug));
});

test('conserva cifras, rangos, recámaras y precio por m² de ambos mercados', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const directAnswer = insight.directAnswer;
  const haciendas = sections.get('renta-haciendas');
  const bedrooms = sections.get('renta-por-recamaras');
  const comparison = sections.get('comparacion-valle-oriente');

  assert.match(directAnswer, /19 publicaciones/);
  assert.match(directAnswer, /\$45,000/);
  assert.match(directAnswer, /95 publicaciones/);
  assert.match(directAnswer, /\$55,000/);
  assert.deepEqual(haciendas.table.rows.slice(1, 4), [
    ['Mediana', '$45,000'],
    ['25%', '$40,000'],
    ['75%', '$49,750'],
  ]);
  assert.deepEqual(bedrooms.table.rows, [
    ['1', '12', '$44,000'],
    ['2', '5', '$55,000'],
    ['3', '1', '$68,700 observado'],
  ]);
  assert.match(sections.get('precio-metro-cuadrado').paragraphs.join(' '), /18 publicaciones/);
  assert.match(sections.get('precio-metro-cuadrado').paragraphs.join(' '), /\$630 MXN/);
  assert.match(comparison.paragraphs.join(' '), /72 publicaciones/);
  assert.match(comparison.paragraphs.join(' '), /\$464 MXN/);
  assert.deepEqual(comparison.table.rows, [
    ['Haciendas de la Sierra', '19', '$45,000', '$40,000–$49,750'],
    ['Valle Oriente ampliado', '95', '$55,000', '$40,500–$60,000'],
  ]);
});

test('distingue Haciendas, Valle Oriente y Distrito Armida sin atribuciones incorrectas', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const aliases = sections.get('valle-oriente-ampliado').paragraphs.join(' ');
  const limitations = sections.get('que-no-significan').bullets.join(' ');
  const faq = Object.fromEntries(insight.faqs.map((item) => [item.question, item.answer]));

  assert.match(aliases, /Haciendas de la Sierra se mantiene separada/);
  assert.match(aliases, /propiedades de Monterrey/);
  assert.match(limitations, /No significan que Vitant o Magma Towers formen parte de Distrito Armida/);
  assert.match(faq['¿Vitant pertenece a Distrito Armida?'], /no forma parte de Distrito Armida/i);
  assert.match(faq['¿Magma Towers pertenece a Distrito Armida?'], /no se presenta.*como parte de Distrito Armida/i);
});

test('separa publicaciones, propiedades únicas e inventario vigente de NocNok', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const duplicates = sections.get('duplicados').paragraphs.join(' ');
  const inventory = sections.get('inventario-rednorte').paragraphs.join(' ');

  assert.match(duplicates, /23 vínculos confirmados/);
  assert.match(duplicates, /no permite afirmar que las 114 publicaciones equivalgan a 114 propiedades únicas/i);
  assert.match(inventory, /no tenía departamentos en renta clasificados exactamente en Haciendas/);
  assert.match(inventory, /dos departamentos.*Zona Valle Oriente y uno en Del Valle Oriente/);
  assert.match(inventory, /no se utiliza para calcular las medianas generales/);
});

test('incluye enlaces internos, relacionados y enlace recíproco desde San Pedro', () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const inventoryLinks = sections.get('inventario-rednorte').contextualLinks;
  const sanPedro = getInsight('cuanto-cuesta-rentar-departamento-san-pedro');
  const sanPedroZones = sectionsById(sanPedro).get('zonas');

  assert.deepEqual(
    inventoryLinks.map((link) => [link.anchor, link.href]),
    [
      [
        'propiedades en Valle Oriente, San Pedro Garza García',
        '/propiedades/san-pedro-garza-garcia/valle-oriente',
      ],
      [
        'departamentos en renta en San Pedro Garza García',
        '/propiedades/san-pedro-garza-garcia/departamentos-en-renta',
      ],
    ],
  );
  assert.equal(
    sections.get('comparacion-valle-oriente').contextualLinks[0].href,
    '/insights/cuanto-cuesta-rentar-departamento-san-pedro',
  );
  assert.deepEqual(insight.related, [
    'cuanto-cuesta-rentar-departamento-san-pedro',
    'donde-invertir-bienes-raices-monterrey',
    'como-rentar-propiedad-segura-nuevo-leon',
  ]);
  assert.ok(
    sanPedroZones.contextualLinks.some(
      ({ anchor, href }) => anchor === 'rentas alrededor de Distrito Armida y Valle Oriente'
        && href === '/insights/cuanto-cuesta-rentar-cerca-distrito-armida',
    ),
  );
});

test('mantiene metodología visible, fuentes oficiales y schemas vigentes', async () => {
  const insight = getInsight(slug);
  const sections = sectionsById(insight);
  const methodology = sections.get('metodologia');
  const sourceUrls = insight.sources.map((source) => source.url).filter(Boolean);
  const page = await readFile(
    new URL('../app/insights/[slug]/page.jsx', import.meta.url),
    'utf8',
  );

  assert.match(methodology.paragraphs.join(' '), /20 de octubre de 2026/);
  assert.match(methodology.subsections[0].paragraphs.join(' '), /Rednorte Data/);
  assert.ok(sourceUrls.includes('https://distritoarmida.com/'));
  assert.ok(sourceUrls.includes('https://distritoarmida.com/proyecto/'));
  assert.ok(sourceUrls.includes('https://distritoarmida.com/acacia/'));
  assert.ok(sourceUrls.includes('https://distritoarmida.com/salud/'));
  assert.ok(sourceUrls.includes('https://hospitalangeles.com/valleoriente'));
  assert.ok(sourceUrls.includes('https://www.begrand.mx/desarrollos-inmobiliarios/vitant-san-pedro-garza-garcia'));
  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(page, /'@type': 'BreadcrumbList'/);
  assert.match(page, /insight\.schemaSpatialCoverage !== false/);
  assert.doesNotMatch(page, /'@type': '(Dataset|StatisticalPopulation|Product|Residence|AggregateOffer)'/);
});
