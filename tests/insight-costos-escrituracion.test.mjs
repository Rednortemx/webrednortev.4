import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getInsight } from '../lib/insights.js';

const slug = 'cuanto-cuesta-escriturar-casa-monterrey';
const title = '¿Cuánto cuesta escriturar una casa en Monterrey en 2026?';
const seoTitle = 'Cuánto cuesta escriturar una casa en Monterrey en 2026 | Rednorte';
const description = 'Gastos de escrituración en Monterrey y Nuevo León en 2026: ISAI, notaría, avalúo, Registro Público, certificados y cómo calcularlos.';

function allContextualLinks(insight) {
  return insight.sections.flatMap((section) => [
    ...(section.contextualLinks || []),
    ...(section.subsections || []).flatMap((subsection) => subsection.contextualLinks || []),
  ]);
}

test('publica slug, metadata, canonical y H1 aprobados', async () => {
  const insight = getInsight(slug);
  const page = await readFile(
    new URL('../app/insights/[slug]/page.jsx', import.meta.url),
    'utf8',
  );

  assert.ok(insight);
  assert.equal(insight.slug, slug);
  assert.equal(insight.title, title);
  assert.equal(insight.seoTitle, seoTitle);
  assert.equal(insight.seoTitleAbsolute, true);
  assert.equal(insight.description, description);
  assert.equal(insight.spatialCoverage, 'Monterrey y Nuevo León');
  assert.match(insight.directAnswer, /Fecha de corte: 20 de octubre de 2026/);
  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
  assert.match(page, /<h1>\{insight\.title\}<\/h1>/);
});

test('conserva la tasa, base legal, ejemplos y disclaimer del ISAI', () => {
  const insight = getInsight(slug);
  const sections = new Map(insight.sections.map((section) => [section.id, section]));
  const fullText = JSON.stringify(insight);

  assert.match(fullText, /3%/);
  assert.match(fullText, /valor de operación/);
  assert.match(fullText, /valor catastral/);
  assert.deepEqual(sections.get('ejemplos-isai').table.rows, [
    ['$1,000,000', '$30,000'],
    ['$2,000,000', '$60,000'],
    ['$3,000,000', '$90,000'],
    ['$5,000,000', '$150,000'],
    ['$10,000,000', '$300,000'],
  ]);
  assert.equal(
    sections.get('ejemplos-isai').note,
    'Estos ejemplos muestran únicamente el ISAI bajo la tasa general. No representan el costo total de escrituración.',
  );
  assert.ok(
    sections.get('que-no-significa').bullets.includes(
      'No convierte el 3% de ISAI en el costo total de escrituración.',
    ),
  );
});

test('presenta 5% como referencia operativa y no como tasa legal', () => {
  const insight = getInsight(slug);
  const sections = new Map(insight.sections.map((section) => [section.id, section]));
  const fullText = JSON.stringify(insight);

  assert.match(insight.directAnswer, /alrededor de 5%/);
  assert.match(insight.directAnswer, /4\.1% y 4\.7%/);
  assert.match(insight.directAnswer, /4\.9% y 5\.3%/);
  assert.match(fullText, /no una tasa legal ni una cotización/i);
  assert.match(fullText, /alrededor de 1%/);
  assert.match(fullText, /alerta catastral/);
  assert.match(fullText, /derechos de registro sobre compraventa/);
  assert.deepEqual(sections.get('ejemplo-practico').paragraphs, [
    'En una de las cotizaciones de compraventa de contado revisadas por Rednorte, para una operación de $3,000,000 el ISAI fue de $90,000.',
    'Los impuestos y derechos, incluyendo el ISAI, sumaron $109,394; los honorarios notariales más IVA fueron $27,492; y el total cotizado fue $136,886.',
    'Ese total equivale aproximadamente a 4.56% del valor de la operación. Es un ejemplo real de referencia, no una tarifa aplicable a todas las compraventas ni una cotización vigente para otro inmueble.',
  ]);
  assert.match(
    insight.faqs.find(({ question }) => question === '¿Cuánto cuesta escriturar una casa en Monterrey?').answer,
    /alrededor de 5%/,
  );
});

test('incluye metodología, fuentes oficiales y todos los enlaces autorizados', () => {
  const insight = getInsight(slug);
  const buying = getInsight('como-comprar-propiedad-monterrey');
  const links = allContextualLinks(insight);
  const buyingLinks = allContextualLinks(buying);

  assert.equal(insight.sections.find(({ id }) => id === 'metodologia').bullets.length, 5);
  assert.equal(insight.sources[0].type, 'official');
  assert.ok(insight.sources.some(({ type, label }) => (
    type === 'internal' && /cinco cotizaciones notariales/.test(label)
  )));
  assert.match(insight.sources[0].label, /artículo 28 Bis/);
  assert.ok(links.some(({ anchor, href }) => (
    anchor === 'cómo comprar una propiedad en Monterrey'
      && href === '/insights/como-comprar-propiedad-monterrey'
  )));
  assert.ok(links.some(({ anchor, href }) => (
    anchor === 'Comprar una propiedad con acompañamiento'
      && href === '/servicios/comprar-propiedad'
  )));
  assert.ok(buyingLinks.some(({ anchor, href }) => (
    anchor === 'cuánto cuesta escriturar una casa en Monterrey'
      && href === `/insights/${slug}`
  )));
  assert.deepEqual(insight.related, [
    'como-comprar-propiedad-monterrey',
    'cuanto-vale-mi-casa-monterrey',
    'donde-invertir-bienes-raices-monterrey',
  ]);
});

test('mantiene FAQs visibles y schemas Article, FAQPage y BreadcrumbList', async () => {
  const [insightArticle, page] = await Promise.all([
    readFile(new URL('../components/InsightArticle.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8'),
  ]);
  const insight = getInsight(slug);

  assert.equal(insight.faqs.length, 8);
  assert.match(insightArticle, /insight\.faqs\.map/);
  assert.match(insightArticle, /section\.ordered/);
  assert.match(insightArticle, /subsection\.bullets/);
  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(page, /'@type': 'BreadcrumbList'/);
  assert.doesNotMatch(page, /'@type': '(FinancialProduct|HowTo)'/);
});
