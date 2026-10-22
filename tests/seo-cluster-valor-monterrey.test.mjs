import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getInsight } from '../lib/insights.js';

test('el Insight de valor conserva su intención informativa y enlaza temprano a la estimación', async () => {
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');
  const insight = getInsight('cuanto-vale-mi-casa-monterrey');
  const firstSection = insight.sections.find(({ id }) => id === 'respuesta-corta');

  assert.equal(insight.seoTitle, '¿Cuánto vale mi casa en Monterrey en 2026? | Rednorte');
  assert.equal(insight.seoTitleAbsolute, true);
  assert.equal(insight.description, 'Aprende cómo estimar cuánto vale tu casa en Monterrey en 2026 con comparables, ubicación, terreno, construcción, estado y condiciones del mercado.');
  assert.equal(insight.title, '¿Cuánto vale mi casa en Monterrey en 2026? Cómo estimar su valor');
  assert.match(insight.directAnswer, /^Para estimar cuánto vale una casa en Monterrey no basta con multiplicar sus metros por un precio promedio\./);
  assert.match(firstSection.paragraphs[0], /^Para estimar cuánto vale una casa en Monterrey no basta/);
  assert.deepEqual(firstSection.contextualLinks, [{
    before: 'Si quieres una primera referencia para tu propiedad, utiliza la herramienta gratuita de ',
    anchor: 'estimación de valor de Rednorte',
    after: '.',
    href: '/servicios/estimacion-de-valor',
  }]);
  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
  assert.match(page, /'@type': 'Article'|@type.*Article/);
  assert.match(page, /'@type': 'FAQPage'|@type.*FAQPage/);
  assert.match(page, /'@type': 'BreadcrumbList'|@type.*BreadcrumbList/);
});

test('el servicio de estimación conserva su herramienta, distingue avalúo y enlaza al Insight', async () => {
  const page = await readFile(new URL('../app/servicios/estimacion-de-valor/page.jsx', import.meta.url), 'utf8');
  const content = await readFile(new URL('../components/servicios/contenidoEstimacion.js', import.meta.url), 'utf8');

  assert.match(page, /title: \{ absolute: 'Estimación de valor de propiedad en Monterrey \| Rednorte' \}/);
  assert.match(page, /Obtén una estimación inicial del valor de tu propiedad en Monterrey\. Analizamos ubicación y características para darte una primera referencia comercial\./);
  assert.match(page, /alternates: \{ canonical: '\/servicios\/estimacion-de-valor' \}/);
  assert.match(page, /contenidoEstimacionSeo/);
  assert.match(page, /href="\/insights\/cuanto-vale-mi-casa-monterrey"/);
  assert.match(page, />cuánto vale una casa en Monterrey<\/a>/);
  assert.match(content, /estimate-service-hero-disclaimer/);
  assert.match(content, /no sustituye un avalúo/);
  assert.match(content, /estimate-service-lead-form/);
  assert.match(page, /'@type': 'Service'/);
  assert.match(page, /breadcrumbSchema/);
});
