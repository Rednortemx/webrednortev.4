import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('muestra en verde el botón de confirmar cita por WhatsApp en todas las propiedades', async () => {
  const [component, styles] = await Promise.all([
    readFile(new URL('../components/CitaSection.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/globals.css', import.meta.url), 'utf8'),
  ]);

  assert.match(
    component,
    /className="btn-primary-full btn-appointment-whatsapp"[^>]*>Confirmar cita por WhatsApp<\/button>/,
  );
  assert.match(styles, /\.btn-primary-full\.btn-appointment-whatsapp \{ background: #128c4a; \}/);
  assert.match(styles, /\.btn-primary-full\.btn-appointment-whatsapp:hover \{ background: #0e703b; \}/);
});
