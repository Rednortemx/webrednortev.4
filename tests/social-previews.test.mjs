import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  SOCIAL_PREVIEWS,
  socialMetadata,
  socialPreviewImage,
} from '../lib/socialPreviews.js';

test('declara previews editoriales para las rutas prioritarias', () => {
  const expected = [
    'home',
    'propiedades',
    'luxury',
    'estimacion',
    'vendibilidad',
    'insights',
    'contacto',
    'reportes',
  ];

  assert.deepEqual(Object.keys(SOCIAL_PREVIEWS), expected);
  for (const key of expected) {
    const preview = SOCIAL_PREVIEWS[key];
    assert.ok(preview.title.length >= 17);
    assert.ok(preview.description.length >= 45);
    assert.match(socialPreviewImage(key), new RegExp(`/api/social-image/${key}\\?v=\\d+`));
  }
});

test('entrega Open Graph y Twitter con imagen grande y URL canónica de la ruta', () => {
  const metadata = socialMetadata('luxury', '/propiedades/luxury');

  assert.equal(metadata.openGraph.url, '/propiedades/luxury');
  assert.equal(metadata.openGraph.images[0].width, 1200);
  assert.equal(metadata.openGraph.images[0].height, 630);
  assert.equal(metadata.twitter.card, 'summary_large_image');
  assert.equal(metadata.twitter.images[0], metadata.openGraph.images[0].url);
});

test('las fichas dinámicas conservan su fotografía principal', async () => {
  const propertyPage = await readFile(
    new URL('../app/propiedades/[slug]/page.jsx', import.meta.url),
    'utf8',
  );

  assert.match(propertyPage, /images: ogImage \? \[\{ url: ogImage, alt: title \}\]/);
  assert.match(propertyPage, /card: ogImage \? 'summary_large_image' : 'summary'/);
});
