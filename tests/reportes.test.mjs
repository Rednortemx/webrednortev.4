import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { rednorteReport2026V2 as report } from '../lib/rednorteReport2026V2.js';

const reportPageUrl = new URL(
  '../app/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026/page.jsx',
  import.meta.url,
);

test('mantiene sincronizados el módulo público y la descarga JSON', async () => {
  const json = JSON.parse(
    await readFile(new URL('../public/data/reporte-rednorte-2026-v2.json', import.meta.url), 'utf8'),
  );

  assert.deepEqual(json, report);
});

test('conserva los totales y el índice de concentración de forma consistente', () => {
  const inventory = report.operationIndex.reduce((sum, row) => sum + row.inventory, 0);
  const interest = report.operationIndex.reduce((sum, row) => sum + row.interest, 0);

  assert.equal(inventory, report.universe.activeProperties);
  assert.equal(interest, report.universe.linkedInterestRecords);
  assert.equal(
    report.concentration.activeWithInterest + report.concentration.activeWithoutLinkedInterest,
    report.universe.activeProperties,
  );

  for (const row of [
    ...report.operationIndex,
    ...report.municipalityIndex,
    ...report.typeIndex,
  ]) {
    const exactIndex =
      (row.interest / report.universe.linkedInterestRecords)
      / (row.inventory / report.universe.activeProperties);
    assert.ok(Math.abs(exactIndex - row.index) < 0.006);
  }
});

test('publica solo datos agregados y fuentes HTTPS', async () => {
  const csv = await readFile(
    new URL('../public/data/reporte-rednorte-2026-v2.csv', import.meta.url),
    'utf8',
  );
  const header = csv.split(/\r?\n/, 1)[0].toLowerCase();

  for (const personalField of ['nombre', 'teléfono', 'telefono', 'correo', 'dirección', 'direccion']) {
    assert.equal(header.includes(personalField), false);
  }

  for (const source of report.external) {
    assert.match(source.url, /^https:\/\//);
  }
});

test('protege JSON-LD y ofrece tablas y navegación accesibles', async () => {
  const [page, hub] = await Promise.all([
    readFile(reportPageUrl, 'utf8'),
    readFile(new URL('../app/reportes/page.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /serializeJsonLd\(schema\)/);
  assert.match(page, /<caption className="report-sr-only">/);
  assert.match(page, /aria-label="Secciones del reporte"/);
  assert.match(page, /rel="noopener noreferrer"/);
  assert.match(
    page,
    /export const metadata = \{\n  title: 'Reporte inmobiliario Monterrey y Nuevo León 2026',/,
  );
  assert.match(hub, /export const metadata = \{\n  title: 'Reportes inmobiliarios',/);
});

test('aísla el diseño del reporte y evita tarjetas externas angostas', async () => {
  const styles = await readFile(
    new URL('../app/globals.reportes.css', import.meta.url),
    'utf8',
  );

  assert.match(styles, /:where\(\.report-page,\.report-hub\) section\{padding:0\}/);
  assert.match(styles, /padding-top:72px/);
  assert.match(styles, /\.report-external-grid\{display:grid;grid-template-columns:repeat\(3/);
  assert.doesNotMatch(styles, /grid-template-columns:repeat\(5/);
});
