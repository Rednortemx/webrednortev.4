import assert from 'node:assert/strict';
import test from 'node:test';

import { propertyListingSchema } from '../lib/schema.js';

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
