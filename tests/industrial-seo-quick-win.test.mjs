import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { contenidoIndustrial } from '../components/servicios/contenidoIndustrial.js';
import { insights } from '../lib/insights.js';

const SERVICE_PATH = '/servicios/inmobiliaria-industrial';
const TITLE = 'Inmobiliaria industrial en Monterrey y Nuevo León | Rednorte';
const DESCRIPTION = 'Asesoría inmobiliaria industrial en Monterrey y Nuevo León para comprar, rentar, vender o comercializar naves, bodegas, terrenos, patios y parques industriales.';
const H1 = 'Inmobiliaria industrial en Monterrey para empresas y propietarios';
const COPY = 'Rednorte trabaja como asesor inmobiliario industrial para empresas y propietarios que necesitan localizar, comprar, rentar, vender o comercializar inmuebles industriales en Monterrey y Nuevo León.';

test('la página industrial publica metadata absoluta y conserva canonical y H1', async () => {
  const page = await readFile(
    new URL('../app/servicios/inmobiliaria-industrial/page.jsx', import.meta.url),
    'utf8',
  );
  const h1s = [...contenidoIndustrial.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/g)].map((match) => match[1]);

  assert.match(page, new RegExp(`title: \\{ absolute: '${TITLE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}' \\}`));
  assert.match(page, new RegExp(DESCRIPTION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal(DESCRIPTION.length, 160);
  assert.match(page, /alternates: \{ canonical: '\/servicios\/inmobiliaria-industrial' \}/);
  assert.deepEqual(h1s, [H1]);
  assert.match(page, new RegExp(COPY.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('Service y BreadcrumbList permanecen y areaServed distingue ciudad y estado', async () => {
  const page = await readFile(
    new URL('../app/servicios/inmobiliaria-industrial/page.jsx', import.meta.url),
    'utf8',
  );

  assert.match(page, /'@type': 'Service'/);
  assert.match(page, /\{ '@type': 'City', name: 'Monterrey' \}/);
  assert.match(page, /\{ '@type': 'AdministrativeArea', name: 'Nuevo León' \}/);
  assert.match(page, /breadcrumbSchema\(/);
  assert.match(page, /<ServicePageForm formClass="industrial-lead-form" tipo="Inmobiliaria industrial" \/>/);
  assert.match(contenidoIndustrial, /<form class="industrial-lead-form">/);
});

test('el Insight enlaza contextualmente al servicio sin alterar sus cifras industriales', () => {
  const insight = insights.find(({ slug }) => slug === 'donde-invertir-bienes-raices-monterrey');
  const section = insight.sections.find(({ id }) => id === 'industrial');

  assert.deepEqual(section.contextualLinks, [{
    before: 'Para evaluar una operación o activo específico, consulta la ',
    anchor: 'asesoría inmobiliaria industrial en Monterrey y Nuevo León',
    after: ' de Rednorte.',
    href: SERVICE_PATH,
  }]);
  assert.match(section.paragraphs.join(' '), /25\.8 millones de m²/);
  assert.match(section.paragraphs.join(' '), /877 mil m²/);
  assert.match(section.paragraphs.join(' '), /7\.3%/);
});

test('no se agrega un CTA hacia filtros de inventario no indexables', async () => {
  const page = await readFile(
    new URL('../app/servicios/inmobiliaria-industrial/page.jsx', import.meta.url),
    'utf8',
  );

  assert.doesNotMatch(page, /\/propiedades\?/);
  assert.doesNotMatch(contenidoIndustrial, /\/propiedades\?/);
});
