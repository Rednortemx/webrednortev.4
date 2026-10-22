import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { teamMembers } from '../lib/teamMembers.js';

test('ProfilePage conserva Person y BreadcrumbList sin dateModified no editorial', async () => {
  const page = await readFile(new URL('../app/equipo/[slug]/page.jsx', import.meta.url), 'utf8');

  assert.match(page, /'@type': 'ProfilePage'/);
  assert.match(page, /'@type': 'Person'/);
  assert.match(page, /'@type': 'BreadcrumbList'/);
  assert.match(page, /mainEntity: personSchema/);
  assert.doesNotMatch(page, /dateModified/);
  assert.doesNotMatch(page, /new Date\(/);
});

test('los perfiles de Roque y Thadeo conservan canonical e indexabilidad', async () => {
  const page = await readFile(new URL('../app/equipo/[slug]/page.jsx', import.meta.url), 'utf8');
  const slugs = teamMembers
    .filter(({ slug }) => ['roque-avila', 'thadeo-gomez'].includes(slug))
    .map(({ slug }) => slug);

  assert.deepEqual(slugs, ['roque-avila', 'thadeo-gomez']);
  assert.match(page, /alternates: \{ canonical: `\/equipo\/\$\{member\.slug\}` \}/);
  assert.doesNotMatch(page, /robots:\s*\{\s*index:\s*false/);
});

test('los formatos legacy largo y corto siguen extrayendo el código esperado', async () => {
  const { extractLegacyCode } = await import('../lib/legacy.js');

  assert.equal(
    extractLegacyCode('casa-en-renta/nuevo-leon/monterrey/centro-id-nn-abc123'),
    'NN-ABC123',
  );
  assert.equal(extractLegacyCode('NN-ABC123'), 'NN-ABC123');
  assert.equal(extractLegacyCode('ruta/desconocida'), '');
});
