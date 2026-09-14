import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('propiedades omite la etiqueta positiva y conserva el aviso de contingencia', async () => {
  const page = await readFile(new URL('../app/propiedades/page.jsx', import.meta.url), 'utf8');

  assert.doesNotMatch(page, /Inventario actualizado/);
  assert.match(page, /source !== 'live'/);
  assert.match(page, /Inventario no disponible en este momento/);
});
