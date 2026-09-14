import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('mantiene el header enfocado y deja WhatsApp como acción flotante', async () => {
  const [header, footer] = await Promise.all([
    readFile(new URL('../components/Header.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/Footer.jsx', import.meta.url), 'utf8'),
  ]);

  for (const href of ['/propiedades', '/servicios', '/insights', '/nosotros']) {
    assert.match(header, new RegExp(`href: '${href}'`));
  }

  for (const label of ['Inicio', 'Herramientas', 'Contacto']) {
    assert.doesNotMatch(header, new RegExp(`label: '${label}'`));
  }

  assert.doesNotMatch(header, /WhatsAppGateButton/);
  assert.match(header, /className="wa-float"/);

  assert.match(footer, /href="\/insights"/);
  assert.match(footer, /href="\/nosotros"/);
  assert.match(footer, /href="\/nosotros\/canaco-monterrey"/);
  assert.match(footer, /Contacto y ubicación/);
});
