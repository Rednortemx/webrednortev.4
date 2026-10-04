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

test('Inicio conserva la marca, JSON-LD seguro y acceso semántico al inventario', async () => {
  const [home, hero] = await Promise.all([
    readFile(new URL('../app/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/HomeHero.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(home, /title: 'Rednorte Inmobiliaria \| Propiedades en Monterrey y su Área Metropolitana'/);
  assert.match(home, /serializeJsonLd\(faqSchema\(\)\)/);
  assert.match(hero, /href="\/propiedades"/);
  assert.match(hero, /Explorar todas las propiedades/);
});

test('Inicio alinea servicios y evita datos visuales desactualizados', async () => {
  const [home, reviews, trustindex, styles] = await Promise.all([
    readFile(new URL('../app/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/GoogleReviews.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/TrustindexWidget.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/globals.css', import.meta.url), 'utf8'),
  ]);

  assert.doesNotMatch(home, /equipo\.jpg/);
  assert.match(home, /nosotros-brand-panel/);
  assert.match(reviews, /<strong>4\.6<\/strong>/);
  assert.match(reviews, /148 opiniones en Google/);
  assert.match(trustindex, /new IntersectionObserver/);
  assert.match(trustindex, /rootMargin: '320px 0px'/);
  assert.match(styles, /grid-template-columns: minmax\(0,\.72fr\) minmax\(0,1\.2fr\) minmax\(250px,\.62fr\)/);
});
