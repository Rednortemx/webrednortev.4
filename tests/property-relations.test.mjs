import assert from 'node:assert/strict';
import test from 'node:test';

import { getRelatedProperties } from '../lib/propertyRelations.js';

const current = {
  id: 'RN-1', type: 'Casa', op: 'Venta', category: 'Residencial',
  municipio: 'Monterrey', rawPrice: 5_000_000,
};

test('prioriza propiedades realmente similares y nunca incluye la ficha actual', () => {
  const properties = [
    current,
    { id: 'RN-2', type: 'Casa', op: 'Venta', category: 'Residencial', municipio: 'Monterrey', rawPrice: 5_200_000 },
    { id: 'RN-3', type: 'Casa', op: 'Renta', category: 'Residencial', municipio: 'Monterrey', rawPrice: 30_000 },
    { id: 'RN-4', type: 'Local', op: 'Venta', category: 'Comercial', municipio: 'Apodaca', rawPrice: 4_900_000 },
  ];

  const related = getRelatedProperties(current, properties, 2);

  assert.deepEqual(related.map((property) => property.id), ['RN-2', 'RN-3']);
  assert.ok(related.every((property) => property.id !== current.id));
});

test('respeta el límite y tolera entradas vacías', () => {
  assert.deepEqual(getRelatedProperties(null, [], 6), []);
  assert.equal(getRelatedProperties(current, [current], 0).length, 0);
});
