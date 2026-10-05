import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const remainingServicePages = [
  'estimacion-de-valor',
  'inmobiliaria-comercial',
  'inmobiliaria-industrial',
  'clientes-extranjeros',
  'master-broker',
];

test('todas las fichas restantes usan el sistema editorial de Servicios', async () => {
  for (const slug of remainingServicePages) {
    const page = await readFile(
      new URL(`../app/servicios/${slug}/page.jsx`, import.meta.url),
      'utf8',
    );

    assert.match(page, /service-editorial service-editorial--/);
    assert.match(page, /<ServiceEditorialNav active="other" \/>/);
  }
});

test('las plantillas entregan estilos desde el servidor y conservan HTML balanceado', async () => {
  const servicePage = await readFile(
    new URL('../components/servicios/ServicePage.jsx', import.meta.url),
    'utf8',
  );
  assert.doesNotMatch(servicePage, /useEffect|document\.head\.appendChild/);
  assert.match(servicePage, /<style dangerouslySetInnerHTML=\{\{ __html: estilos \}\} \/>/);

  for (const name of ['Estimacion', 'Comercial', 'Industrial']) {
    const content = await readFile(
      new URL(`../components/servicios/contenido${name}.js`, import.meta.url),
      'utf8',
    );
    assert.doesNotMatch(content, /\\u003c\/main\\u003e/);
  }
});

test('Master Broker publica la comisión comercial vigente', async () => {
  const page = await readFile(
    new URL('../app/servicios/master-broker/page.jsx', import.meta.url),
    'utf8',
  );
  assert.match(page, /La comisión es del 5%/);
  assert.match(page, /<strong>5%<\/strong>/);
  assert.doesNotMatch(page, /4\.5%/);
});
