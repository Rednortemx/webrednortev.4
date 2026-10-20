import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { insights } from '../lib/insights.js';

const CLUSTER = [
  'cuanto-vale-mi-casa-monterrey',
  'como-vender-propiedad-monterrey',
  'que-tan-vendible-es-una-propiedad',
];

function getInsight(slug) {
  return insights.find((insight) => insight.slug === slug);
}

function contextualLinks(insight) {
  return insight.sections.flatMap((section) => [
    ...(section.contextualLinks || []),
    ...(section.subsections || []).flatMap((subsection) => subsection.contextualLinks || []),
  ]);
}

test('el cluster de propietarios conserva sus tres URLs canónicas', async () => {
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');

  assert.deepEqual(CLUSTER.map((slug) => `/insights/${slug}`), [
    '/insights/cuanto-vale-mi-casa-monterrey',
    '/insights/como-vender-propiedad-monterrey',
    '/insights/que-tan-vendible-es-una-propiedad',
  ]);
  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
});

test('cada pieza enlaza contextualmente a las otras dos con anchors descriptivos', () => {
  const expected = {
    'cuanto-vale-mi-casa-monterrey': [
      ['evaluar qué tan vendible es una propiedad', '/insights/que-tan-vendible-es-una-propiedad'],
      ['cómo vender una propiedad en Monterrey', '/insights/como-vender-propiedad-monterrey'],
    ],
    'como-vender-propiedad-monterrey': [
      ['cómo estimar cuánto vale una casa en Monterrey', '/insights/cuanto-vale-mi-casa-monterrey'],
      ['evaluar qué tan vendible es una propiedad', '/insights/que-tan-vendible-es-una-propiedad'],
    ],
    'que-tan-vendible-es-una-propiedad': [
      ['cómo estimar el valor de una casa en Monterrey', '/insights/cuanto-vale-mi-casa-monterrey'],
      ['proceso completo para vender una propiedad en Monterrey', '/insights/como-vender-propiedad-monterrey'],
    ],
  };

  for (const slug of CLUSTER) {
    const links = contextualLinks(getInsight(slug));
    assert.equal(links.length, 2);
    assert.deepEqual(links.map(({ anchor, href }) => [anchor, href]), expected[slug]);
    assert.ok(links.every((link) => !/haz clic|aquí/i.test(link.anchor)));
  }
});

test('el bloque También puede interesarte contiene exactamente las otras dos piezas', () => {
  for (const slug of CLUSTER) {
    const insight = getInsight(slug);
    assert.equal(insight.relatedTitle, 'También puede interesarte');
    assert.deepEqual(new Set(insight.related), new Set(CLUSTER.filter((item) => item !== slug)));
    assert.equal(insight.related.length, 2);
  }
});

test('Cómo vender cambia sólo metadata y mantiene su H1 editorial', () => {
  const insight = getInsight('como-vender-propiedad-monterrey');

  assert.equal(insight.title, 'Cómo vender una propiedad en Monterrey: proceso, costos y tiempos');
  assert.equal(insight.seoTitle, 'Cómo vender una casa o propiedad en Monterrey en 2026 | Rednorte');
  assert.equal(insight.description, 'Pasos para vender una casa o propiedad en Monterrey: documentos, estimación de valor, precio, comisión, costos, tiempos, negociación y cierre.');
  assert.equal(insight.seoTitleAbsolute, true);
  assert.equal(insight.seoTitle.length, 64);
  assert.equal(insight.description.length, 142);
});

test('los otros dos H1 y SEO titles permanecen sin cambios', () => {
  const value = getInsight('cuanto-vale-mi-casa-monterrey');
  const sellability = getInsight('que-tan-vendible-es-una-propiedad');

  assert.equal(value.title, '¿Cuánto vale mi casa en Monterrey en 2026? Cómo estimar su valor');
  assert.equal(value.seoTitle, '¿Cuánto vale mi casa en Monterrey en 2026? | Rednorte');
  assert.equal(sellability.title, 'Qué tan vendible es una propiedad y cómo mejorarla: precio, presentación y estrategia');
  assert.equal(sellability.seoTitle, 'Qué tan vendible es una propiedad y cómo mejorarlo | Rednorte');
});

test('los enlaces se renderizan como Next Link crawlable y el schema reutiliza contenido visible', async () => {
  const [article, page, related] = await Promise.all([
    readFile(new URL('../components/InsightArticle.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/InsightRelated.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(article, /<Link href=\{link\.href\}>\{link\.anchor\}<\/Link>/);
  assert.doesNotMatch(article, /dangerouslySetInnerHTML/);
  assert.match(related, /<Link className="insight-related-item"/);
  assert.match(page, /headline: insight\.title/);
  assert.match(page, /mainEntity: insight\.faqs\.map/);
  assert.match(page, /name: insight\.title/);
});
