import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Athena carga sin launcher flotante y sus CTAs usan la API pública', async () => {
  const [layout, launcher, hero, catalog] = await Promise.all([
    readFile(new URL('../app/layout.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/AthenaLauncher.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/HomeHero.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/propiedades/page.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(layout, /src="https:\/\/athena-v00x\.onrender\.com\/widget\/inmobot\.js"/);
  assert.match(layout, /data-inquilino="rednorte"/);
  assert.match(layout, /data-launcher="false"/);
  assert.match(layout, /strategy="lazyOnload"/);
  assert.match(launcher, /window\.Inmobot\?\.open/);
  assert.match(launcher, /inmobot:ready/);
  assert.match(hero, /<AthenaLauncher\s*\/>/);
  assert.match(catalog, /<AthenaLauncher variant="catalog"\s*\/>/);
});

test('el canal de Athena conserva acceso protegido y fichas canónicas', async () => {
  const [access, inventory, properties] = await Promise.all([
    readFile(new URL('../lib/athena.js', import.meta.url), 'utf8'),
    readFile(new URL('../app/api/athena/inventario/route.js', import.meta.url), 'utf8'),
    readFile(new URL('../lib/properties.js', import.meta.url), 'utf8'),
  ]);

  assert.match(access, /process\.env\.ATHENA_TOKEN/);
  assert.match(access, /\}, 401\)/);
  assert.match(access, /\}, 503\)/);
  assert.match(access, /60/);
  assert.match(inventory, /buildPropertySlug/);
  assert.match(inventory, /https:\/\/www\.rednorte\.mx\/propiedades\//);
  assert.doesNotMatch(inventory, /\/propiedad\/\$\{p\.id/);
  assert.match(properties, /settlement: p\.settlement \|\| ''/);
  assert.match(properties, /colonia: p\.settlement \|\| ''/);
});
