import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { insights } from '../lib/insights.js';

const CLUSTER = [
  'como-comprar-propiedad-monterrey',
  'donde-invertir-bienes-raices-monterrey',
  'como-rentar-propiedad-segura-nuevo-leon',
];

const METADATA = {
  'como-comprar-propiedad-monterrey': {
    title: 'Cómo comprar una propiedad en Monterrey: proceso, costos y errores que conviene evitar',
    seoTitle: 'Cómo comprar una propiedad en Monterrey | Guía Rednorte',
    description: 'Guía para comprar una casa, departamento o inmueble en Monterrey: presupuesto, crédito, búsqueda, oferta, revisión documental, notaría, impuesto sobre adquisición, avalúo, escrituración, entrega y errores comunes.',
  },
  'donde-invertir-bienes-raices-monterrey': {
    title: 'Dónde invertir en bienes raíces en Monterrey en 2026: zonas, estrategias y riesgos',
    seoTitle: 'Dónde invertir en bienes raíces en Monterrey en 2026 | Rednorte',
    seoTitleAbsolute: true,
    description: 'Guía para evaluar dónde invertir en bienes raíces en Monterrey en 2026 según objetivo: renta, plusvalía, preservación patrimonial, preventa, industrial o comercial. Incluye datos actuales, zonas, riesgos, métricas y metodología.',
  },
  'como-rentar-propiedad-segura-nuevo-leon': {
    title: 'Cómo rentar una propiedad de forma segura en Nuevo León: investigación, contrato y protección',
    seoTitle: 'Cómo rentar una propiedad de forma segura en Nuevo León | Rednorte',
    description: 'Guía práctica para propietarios sobre cómo rentar una propiedad de forma segura en Nuevo León: investigación del inquilino, capacidad de pago, contrato, depósito, garantías, inventario, recibos, seguimiento y protección ante incumplimientos.',
  },
};

function getInsight(slug) {
  return insights.find((insight) => insight.slug === slug);
}

function contextualLinks(insight) {
  return insight.sections.flatMap((section) => [
    ...(section.contextualLinks || []),
    ...(section.subsections || []).flatMap((subsection) => subsection.contextualLinks || []),
  ]);
}

test('Tier 1B conserva H1, SEO title, description y canonical de las tres rutas', async () => {
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');

  for (const slug of CLUSTER) {
    const insight = getInsight(slug);
    assert.equal(insight.title, METADATA[slug].title);
    assert.equal(insight.seoTitle, METADATA[slug].seoTitle);
    assert.equal(insight.description, METADATA[slug].description);
    assert.equal(insight.seoTitleAbsolute, METADATA[slug].seoTitleAbsolute);
    assert.equal(`/insights/${insight.slug}`, `/insights/${slug}`);
  }

  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
});

test('Comprar incluye los enlaces contextuales aprobados', () => {
  const links = contextualLinks(getInsight('como-comprar-propiedad-monterrey'));

  assert.deepEqual(links.map(({ anchor, href }) => [anchor, href]), [
    ['dónde invertir en bienes raíces en Monterrey', '/insights/donde-invertir-bienes-raices-monterrey'],
    ['cómo estimar el valor de una casa en Monterrey', '/insights/cuanto-vale-mi-casa-monterrey'],
    ['cuánto cuesta escriturar una casa en Monterrey', '/insights/cuanto-cuesta-escriturar-casa-monterrey'],
  ]);
});

test('Inversión incluye compra, renta segura y valoración en contextos naturales', () => {
  const links = contextualLinks(getInsight('donde-invertir-bienes-raices-monterrey'));

  assert.deepEqual(links.map(({ anchor, href }) => [anchor, href]), [
    ['proceso para comprar una propiedad en Monterrey', '/insights/como-comprar-propiedad-monterrey'],
    ['asesoría inmobiliaria industrial en Monterrey y Nuevo León', '/servicios/inmobiliaria-industrial'],
    ['cómo rentar una propiedad de forma segura en Nuevo León', '/insights/como-rentar-propiedad-segura-nuevo-leon'],
    ['cómo estimar el valor de una casa en Monterrey', '/insights/cuanto-vale-mi-casa-monterrey'],
  ]);
  assert.ok(links.every((link) => !/haz clic|aquí/i.test(link.anchor)));
});

test('Renta conserva el cuerpo sin enlaces forzados y agrega Inversión como relacionado', () => {
  const insight = getInsight('como-rentar-propiedad-segura-nuevo-leon');

  assert.deepEqual(contextualLinks(insight), []);
  assert.deepEqual(insight.related, [
    'como-vender-propiedad-monterrey',
    'cuanto-vale-mi-casa-monterrey',
    'donde-invertir-bienes-raices-monterrey',
  ]);
});

test('los relacionados preservan relaciones útiles y muestran el cluster requerido', async () => {
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');
  const buying = getInsight('como-comprar-propiedad-monterrey');
  const investing = getInsight('donde-invertir-bienes-raices-monterrey');

  assert.equal(buying.relatedTitle, 'También puede interesarte');
  assert.deepEqual(buying.related, [
    'donde-invertir-bienes-raices-monterrey',
    'cuanto-vale-mi-casa-monterrey',
    'como-vender-propiedad-monterrey',
  ]);

  assert.equal(investing.relatedTitle, 'También puede interesarte');
  assert.equal(investing.relatedLimit, 4);
  assert.deepEqual(investing.related, [
    'como-comprar-propiedad-monterrey',
    'cuanto-vale-mi-casa-monterrey',
    'como-rentar-propiedad-segura-nuevo-leon',
    'como-vender-propiedad-monterrey',
  ]);
  assert.match(page, /getRelatedInsights\(insight, insight\.relatedLimit \|\| 3\)/);
});

test('las tres piezas actualizan dateModified y preservan contenido y schema visibles', async () => {
  const [page, article] = await Promise.all([
    readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/InsightArticle.jsx', import.meta.url), 'utf8'),
  ]);

  for (const slug of CLUSTER) {
    const insight = getInsight(slug);
    assert.equal(insight.updatedAt, '2026-10-20');
    assert.ok(insight.directAnswer);
    assert.ok(insight.methodology);
    assert.ok(insight.sources.length > 0);
    assert.ok(insight.faqs.length > 0);
    assert.ok(insight.author);
    assert.ok(insight.spatialCoverage);
    assert.ok(insight.schemaAbout.length > 0);
  }

  assert.match(article, /<Link href=\{link\.href\}>\{link\.anchor\}<\/Link>/);
  assert.doesNotMatch(article, /dangerouslySetInnerHTML/);
  assert.match(page, /headline: insight\.title/);
  assert.match(page, /description: insight\.description/);
  assert.match(page, /dateModified: insight\.updatedAt/);
  assert.match(page, /about: \(insight\.schemaAbout/);
  assert.match(page, /name: insight\.spatialCoverage/);
  assert.match(page, /mainEntity: insight\.faqs\.map/);
  assert.match(page, /name: insight\.title/);
});
