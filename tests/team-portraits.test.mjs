import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { advisors } from '../lib/teamDirectory.js';

const portraits = new Map([
  ['Diana Avila', '/equipo/diana-avila.jpg'],
  ['Helyana Villagran', '/equipo/helyana-villagran.jpg'],
  ['Humberto Frias', '/equipo/humberto-frias.jpg'],
  ['Jessica Rodriguez', '/equipo/jessica-rodriguez.jpg'],
  ['Judith Rodriguez', '/equipo/judith-rodriguez.jpg'],
  ['Maribel Peralta', '/equipo/maribel-peralta.jpg'],
]);

function jpegDimensions(data) {
  assert.equal(data.readUInt16BE(0), 0xffd8);
  for (let offset = 2; offset < data.length - 9;) {
    if (data[offset] !== 0xff) throw new Error('Segmento JPEG inválido');
    const marker = data[offset + 1];
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
    }
    offset += 2 + data.readUInt16BE(offset + 2);
  }
  throw new Error('Faltan dimensiones JPEG');
}

test('asocia los seis retratos a una sola tarjeta cada uno sin crear perfiles', async () => {
  assert.equal(advisors.length, 30);
  assert.equal(advisors.filter((advisor) => portraits.has(advisor.name) && advisor.photo).length, portraits.size);
  for (const [name, photo] of portraits) {
    const matches = advisors.filter((advisor) => advisor.name === name);
    assert.equal(matches.length, 1, `Coincidencia única para ${name}`);
    assert.equal(matches[0].photo, photo);
    assert.equal(matches[0].profileSlug, undefined);
    const data = await readFile(new URL(`../public${photo}`, import.meta.url));
    assert.deepEqual(jpegDimensions(data), { width: 1000, height: 1000 });
  }
});

test('asocia el retrato de Chris a la única tarjeta Christian de la Fuente', async () => {
  const matches = advisors.filter((advisor) => advisor.name === 'Christian de la Fuente');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].photo, '/equipo/christian-de-la-fuente.jpg');
  assert.equal(matches[0].profileSlug, undefined);
  const data = await readFile(new URL('../public/equipo/christian-de-la-fuente.jpg', import.meta.url));
  assert.deepEqual(jpegDimensions(data), { width: 1000, height: 1000 });
});

test('asocia el retrato de Maru a la única tarjeta de María Eugenia Santoyo', async () => {
  const matches = advisors.filter((advisor) => advisor.name === 'Maria Eugenia Santoyo');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].photo, '/equipo/maria-eugenia-santoyo.jpg');
  assert.equal(matches[0].profileSlug, undefined);
  const data = await readFile(new URL('../public/equipo/maria-eugenia-santoyo.jpg', import.meta.url));
  assert.deepEqual(jpegDimensions(data), { width: 1000, height: 1000 });
});

test('sustituye el retrato de Thadeo en la tarjeta y en su perfil sin recortarlo', async () => {
  const thadeo = advisors.filter((advisor) => advisor.name === 'Thadeo Gómez');
  assert.equal(thadeo.length, 1);
  assert.equal(thadeo[0].photo, '/equipo/thadeo-gomez.jpg');
  assert.equal(thadeo[0].profileSlug, 'thadeo-gomez');
  const data = await readFile(new URL('../public/equipo/thadeo-gomez.jpg', import.meta.url));
  assert.deepEqual(jpegDimensions(data), { width: 1000, height: 1000 });
  const page = await readFile(new URL('../app/equipo/[slug]/page.jsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../app/globals.institutional.css', import.meta.url), 'utf8');
  assert.match(page, /member\.slug === 'thadeo-gomez' \? ' has-square-photo'/);
  assert.match(css, /\.advisor-portrait\.has-square-photo \{ aspect-ratio:1\/1; \}/);
  assert.match(css, /\.advisor-portrait\.has-square-photo img \{ object-fit:contain; object-position:center; \}/);
});

test('preserva el cuadrado completo en escritorio y móvil sin recorte', async () => {
  const page = await readFile(new URL('../app/equipo/page.jsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../app/globals.institutional.css', import.meta.url), 'utf8');
  assert.match(page, /const photo = person\.photo \|\| profile\?\.photo/);
  assert.match(page, /person\.photo \? ' has-square-photo' : ''/);
  assert.match(css, /\.team-person-portrait\.has-square-photo \{ aspect-ratio: 1 \/ 1; \}/);
  assert.match(css, /\.team-person-portrait\.has-square-photo img \{ object-fit: contain; object-position: center; \}/);
  assert.match(css, /@media \(max-width: 390px\) \{[\s\S]*?\.team-person-portrait\.has-square-photo \{ aspect-ratio: 1 \/ 1; \}/);
});
