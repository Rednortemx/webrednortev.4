import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { organizationSchema, propertyListingSchema, websiteSchema } from '../lib/schema.js';

test('el sitio y la inmobiliaria conservan identificadores estables y relacionados', () => {
  const organization = organizationSchema();
  const website = websiteSchema();

  assert.equal(organization['@id'], 'https://www.rednorte.mx/#organization');
  assert.equal(website['@type'], 'WebSite');
  assert.equal(website['@id'], 'https://www.rednorte.mx/#website');
  assert.equal(website.url, 'https://www.rednorte.mx/');
  assert.equal(website.publisher['@id'], organization['@id']);
});

test('el layout publica las dos entidades globales sin alterar el widget Athena', async () => {
  const layout = await readFile(new URL('../app/layout.jsx', import.meta.url), 'utf8');

  assert.match(layout, /organizationSchema, websiteSchema/);
  assert.match(layout, /serializeJsonLd\(organizationSchema\(\)\)/);
  assert.match(layout, /serializeJsonLd\(websiteSchema\(\)\)/);
  assert.match(layout, /data-launcher="false"/);
});

const canonical = 'https://www.rednorte.mx/propiedades/casa-en-venta-rn-1';

test('el schema identifica de forma única la ficha y enlaza a Rednorte', () => {
  const schema = propertyListingSchema({
    id: 'RN-1', type: 'Casa', op: 'Venta', municipio: 'Monterrey',
    zone: 'Cumbres, Monterrey, Nuevo León', rawPrice: 5_000_000,
    description: 'Casa disponible.', imgs: ['https://img.example/casa.jpg'],
  }, canonical);

  assert.equal(schema['@id'], `${canonical}#listing`);
  assert.equal(schema.identifier, 'RN-1');
  assert.match(schema.name, /Casa en venta en Cumbres, Monterrey \| RN-1/);
  assert.equal(schema.provider['@id'], 'https://www.rednorte.mx/#organization');
  assert.equal(schema.offers.price, 5_000_000);
});

test('omite Offer cuando el CRM no publica un precio numérico válido', () => {
  const schema = propertyListingSchema({
    id: 'RN-2', type: 'Local', op: 'Renta', municipio: 'Monterrey', rawPrice: 0,
  }, canonical);

  assert.equal(schema.offers, undefined);
});
