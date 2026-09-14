import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const pageUrl = new URL('../app/nosotros/canaco-monterrey/page.jsx', import.meta.url);
const stylesUrl = new URL('../app/globals.canaco.css', import.meta.url);

test('publica CANACO con evidencia directa y datos estructurados protegidos', async () => {
  const page = await readFile(pageUrl, 'utf8');

  assert.match(page, /title: 'Socio de CANACO Monterrey'/);
  assert.match(page, /serializeJsonLd\(schema\)/);
  assert.match(page, /activity-7496287677856768001-SoWw/);
  assert.match(page, /rel="noopener noreferrer"/);
  assert.doesNotMatch(page, /rel="noreferrer"/);
  assert.doesNotMatch(page, /número de socio/i);
});

test('aísla el diseño, respeta el header y evita cuadrículas angostas', async () => {
  const styles = await readFile(stylesUrl, 'utf8');

  assert.match(styles, /padding-top: 72px/);
  assert.match(styles, /:where\(\.canaco-page\) section \{\n  padding: 0;/);
  assert.match(styles, /\.canaco-value-grid \{[\s\S]*grid-template-columns: repeat\(2,/);
  assert.doesNotMatch(styles, /repeat\(4, minmax\(0, 1fr\)\)/);
});

test('incluye la ruta en navegación y sitemap', async () => {
  const [aboutPage, sitemap] = await Promise.all([
    readFile(new URL('../app/nosotros/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/sitemap.js', import.meta.url), 'utf8'),
  ]);

  assert.match(aboutPage, /href: '\/nosotros\/canaco-monterrey'/);
  assert.match(sitemap, /'\/nosotros\/canaco-monterrey'/);
});

test('sirve fotografías optimizadas para web', async () => {
  const names = [
    'compromiso-canaco.webp',
    'roque-canaco-evento-01.webp',
    'roque-canaco-evento-02.webp',
  ];

  for (const name of names) {
    const image = await stat(new URL(`../public/images/canaco/${name}`, import.meta.url));
    assert.ok(image.size < 300_000, `${name} excede 300 KB`);
  }
});
