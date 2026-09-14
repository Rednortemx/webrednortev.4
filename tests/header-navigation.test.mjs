import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('mantiene el header enfocado en navegación comercial y el footer en contenido secundario', async () => {
  const [header, footer] = await Promise.all([
    readFile(new URL('../components/Header.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/Footer.jsx', import.meta.url), 'utf8'),
  ]);

  for (const href of ['/propiedades', '/servicios', '/herramientas']) {
    assert.match(header, new RegExp(`href: '${href}'`));
  }

  for (const label of ['Inicio', 'Insights', 'Nosotros', 'Contacto']) {
    assert.doesNotMatch(header, new RegExp(`label: '${label}'`));
  }

  assert.match(footer, /href="\/insights"/);
  assert.match(footer, /href="\/nosotros"/);
  assert.match(footer, /href="\/nosotros\/canaco-monterrey"/);
  assert.match(footer, /Contacto y ubicación/);
});
