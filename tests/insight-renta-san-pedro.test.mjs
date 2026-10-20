import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getInsight } from '../lib/insights.js';

const slug = 'cuanto-cuesta-rentar-departamento-san-pedro';

test('publica el Insight de renta en San Pedro con metadatos y corte editorial aprobados', () => {
  const insight = getInsight(slug);

  assert.ok(insight);
  assert.equal(insight.seoTitle, 'Cuánto cuesta rentar un departamento en San Pedro en 2026 | Rednorte');
  assert.equal(insight.spatialCoverage, 'San Pedro Garza García, Nuevo León');
  assert.match(insight.directAnswer, /338 publicaciones/);
  assert.match(insight.directAnswer, /\$48,750/);
  assert.match(insight.directAnswer, /19 de octubre de 2026/);
});

test('conserva tablas, metodología, limitaciones y distinción entre publicaciones y propiedades', () => {
  const insight = getInsight(slug);
  const sections = new Map(insight.sections.map((section) => [section.id, section]));

  assert.equal(insight.processTable.length, 3);
  assert.equal(sections.get('zonas').table.rows.length, 6);
  assert.equal(sections.get('portales').table.rows.length, 3);
  assert.ok(sections.has('metodologia'));
  assert.ok(sections.has('limitaciones'));
  assert.match(
    sections.get('tratamiento-duplicados').paragraphs.join(' '),
    /propiedades únicas/,
  );
});

test('incluye los enlaces internos y relacionados autorizados', () => {
  const insight = getInsight(slug);
  const sections = new Map(insight.sections.map((section) => [section.id, section]));

  assert.equal(
    sections.get('inventario-rednorte').contextualLinks[0].href,
    '/propiedades/san-pedro-garza-garcia/departamentos-en-renta',
  );
  assert.equal(
    sections.get('para-propietarios').contextualLinks[0].href,
    '/insights/como-rentar-propiedad-segura-nuevo-leon',
  );
  assert.deepEqual(insight.related, [
    'donde-invertir-bienes-raices-monterrey',
    'cuanto-vale-mi-casa-monterrey',
    'como-rentar-propiedad-segura-nuevo-leon',
  ]);
});

test('la plantilla mantiene Article, FAQPage y BreadcrumbList en JSON-LD', async () => {
  const page = await readFile(
    new URL('../app/insights/[slug]/page.jsx', import.meta.url),
    'utf8',
  );

  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(page, /'@type': 'BreadcrumbList'/);
  assert.doesNotMatch(page, /'@type': '(Product|Dataset|StatisticalPopulation)'/);
});
