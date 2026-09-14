import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('contacto comparte todas las redes declaradas para el sitio', async () => {
  const [contacto, footer, socialLinks] = await Promise.all([
    readFile(new URL('../app/contacto/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/Footer.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../lib/socialLinks.js', import.meta.url), 'utf8'),
  ]);

  for (const key of ['facebook', 'instagram', 'linkedin', 'x', 'tiktok', 'youtube', 'google']) {
    assert.match(socialLinks, new RegExp(`${key}:`));
    assert.match(footer, new RegExp(`SOCIAL_URLS\\.${key}`));
  }
  assert.match(contacto, /SOCIAL_LINKS\.map/);
});

test('Inicio conserva la marca en metadata, JSON-LD seguro y buscador semántico', async () => {
  const [home, search] = await Promise.all([
    readFile(new URL('../app/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/HeroSearch.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(home, /title: 'Rednorte Inmobiliaria \| Propiedades en Monterrey y su Área Metropolitana'/);
  assert.match(home, /serializeJsonLd\(faqSchema\(\)\)/);
  assert.match(search, /<form className="hero-search" onSubmit=\{submit\}>/);
  assert.match(search, /type="submit"/);
});
