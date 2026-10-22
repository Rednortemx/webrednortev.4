import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getInsight } from '../lib/insights.js';

test('el Insight de venta conserva metadata, canonical y enlaces del cluster', async () => {
  const page = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');
  const insight = getInsight('como-vender-propiedad-monterrey');
  const firstSection = insight.sections.find(({ id }) => id === 'respuesta-corta');
  const links = insight.sections.flatMap(({ contextualLinks = [] }) => contextualLinks);

  assert.equal(insight.seoTitle, 'Cómo vender una propiedad en Monterrey en 2026 | Rednorte');
  assert.equal(insight.description, 'Guía para vender una propiedad en Monterrey en 2026: precio, documentos, comisión inmobiliaria, tiempos, promoción, negociación y cierre.');
  assert.equal(insight.title, 'Cómo vender una propiedad en Monterrey: proceso, costos y tiempos');
  assert.match(insight.directAnswer, /^Para vender una propiedad en Monterrey conviene/);
  assert.ok(firstSection.contextualLinks.some(({ anchor, href }) => anchor === 'servicio para vender una propiedad en Monterrey' && href === '/servicios/vender-propiedad'));
  assert.ok(links.some(({ href }) => href === '/insights/cuanto-vale-mi-casa-monterrey'));
  assert.ok(links.some(({ href }) => href === '/insights/que-tan-vendible-es-una-propiedad'));
  assert.match(page, /alternates: \{ canonical: `\/insights\/\$\{insight\.slug\}` \}/);
});

test('el servicio diferencia su intención comercial y enlaza de regreso al Insight', async () => {
  const page = await readFile(new URL('../app/servicios/vender-propiedad/page.jsx', import.meta.url), 'utf8');

  assert.match(page, /title: 'Inmobiliaria para vender tu propiedad en Monterrey \| Rednorte'/);
  assert.match(page, /Vende tu casa, departamento, terreno o inmueble en Monterrey con Rednorte\. Estrategia de precio, promoción, prospectos, negociación y acompañamiento al cierre\./);
  assert.match(page, /alternates:\s*\{\s*canonical: '\/servicios\/vender-propiedad'/);
  assert.match(page, /<h1[^>]*>Vende tu propiedad en Monterrey con una estrategia diseñada para su mercado<\/h1>/);
  assert.match(page, /href="\/insights\/como-vender-propiedad-monterrey"/);
  assert.match(page, />cómo vender una propiedad en Monterrey<\/Link>/);
  assert.match(page, /href="\/herramientas\/estimacion-de-valor"/);
  assert.match(page, /id="sell-property-form"|id="solicitar-diagnostico"/);
  assert.match(page, /'@type': 'Service'/);
  assert.match(page, /'@type': 'FAQPage'/);
});
