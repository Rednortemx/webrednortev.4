import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const layoutPath = new URL('../app/layout.jsx', import.meta.url);

test('Athena se carga una sola vez con el inquilino y API de producción de Rednorte', async () => {
  const layout = await readFile(layoutPath, 'utf8');

  assert.equal(
    (layout.match(/https:\/\/athena-v00x\.onrender\.com\/widget\/inmobot\.js/g) || []).length,
    1,
  );
  assert.match(layout, /data-inquilino="rednorte"/);
  assert.match(layout, /data-api="https:\/\/athena-v00x\.onrender\.com"/);
});

test('Athena se inserta al final del body sin sustituir WhatsApp ni el contenido de las páginas', async () => {
  const layout = await readFile(layoutPath, 'utf8');
  const header = await readFile(new URL('../components/Header.jsx', import.meta.url), 'utf8');

  assert.ok(layout.indexOf('https://athena-v00x.onrender.com/widget/inmobot.js') > layout.indexOf('<PrivacyAnalytics />'));
  assert.ok(layout.indexOf('https://athena-v00x.onrender.com/widget/inmobot.js') < layout.indexOf('</body>'));
  assert.match(header, /className="wa-float"/);
});

test('Athena reserva espacio para WhatsApp y no desplaza la interfaz de conversación sobre la acción flotante', async () => {
  const [adapter, styles] = await Promise.all([
    readFile(new URL('../components/AthenaWidgetLayout.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/globals.css', import.meta.url), 'utf8'),
  ]);

  assert.match(adapter, /const WIDGET_SELECTOR = '\[data-inmobot="rednorte"\]'/);
  assert.match(adapter, /\.burbuja \{ bottom: 92px; \}/);
  assert.match(adapter, /\.panel \{ bottom: 164px;/);
  assert.match(adapter, /shadowRoot\.append\(styles\)/);
  assert.match(styles, /body:has\(\[data-inmobot="rednorte"\]\) \.translate-float/);
  assert.match(styles, /left: 1\.25rem;/);
});
