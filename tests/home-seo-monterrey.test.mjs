import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const expectedTitle = 'Inmobiliaria en Monterrey | Compra, venta y renta | Rednorte';
const expectedH1 = 'Inmobiliaria en Monterrey para comprar, vender, rentar e invertir';

test('Home publica el title absoluto, H1 y hero copy aprobados', async () => {
  const [home, hero] = await Promise.all([
    readFile(new URL('../app/page.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/HomeHero.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(home, new RegExp(`title: \\{ absolute: '${expectedTitle.replaceAll('|', '\\|')}' \\}`));
  assert.match(hero, new RegExp(`<h1 id="home-hero-title">${expectedH1}</h1>`));
  assert.match(
    hero,
    /Rednorte es una inmobiliaria en Monterrey y Nuevo León especializada en compra, venta, renta e inversión de propiedades residenciales, comerciales e industriales\./,
  );
  assert.equal((`${home}\n${hero}`.match(/<h1\b/g) || []).length, 1);
});

test('Home conserva canonical y schemas y agrega la cobertura con enlaces autorizados', async () => {
  const home = await readFile(new URL('../app/page.jsx', import.meta.url), 'utf8');

  assert.match(home, /alternates: \{ canonical: '\/' \}/);
  assert.match(home, /serializeJsonLd\(faqSchema\(\)\)/);
  assert.match(
    home,
    /Trabajamos en Monterrey, San Pedro Garza García y los principales municipios del área metropolitana de Nuevo León, con experiencia en/,
  );

  for (const href of [
    '/propiedades',
    '/servicios',
    '/servicios/inmobiliaria-industrial',
    '/servicios/inmobiliaria-comercial',
  ]) {
    assert.match(home, new RegExp(`href="${href}"`));
  }
});
