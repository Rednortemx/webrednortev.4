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
  assert.equal(advisors.filter((advisor) => advisor.photo).length, portraits.size);
  for (const [name, photo] of portraits) {
    const matches = advisors.filter((advisor) => advisor.name === name);
    assert.equal(matches.length, 1, `Coincidencia única para ${name}`);
    assert.equal(matches[0].photo, photo);
    assert.equal(matches[0].profileSlug, undefined);
    const data = await readFile(new URL(`../public${photo}`, import.meta.url));
    assert.deepEqual(jpegDimensions(data), { width: 1000, height: 1000 });
  }
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
