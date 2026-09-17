import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildPropertyMetaDescription,
  buildPropertySeoTitle,
  getPropertySeoLocation,
} from '../lib/propertySeo.js';

const monterreyCentro = {
  id: 'NN-HEL244',
  type: 'Depto',
  op: 'Renta',
  zone: 'Monterrey Centro, Monterrey, Nuevo León',
  municipio: 'Monterrey',
  price: '$23,000/mes',
};

test('combina tipo, operación, colonia, municipio y código CRM sin repeticiones', () => {
  assert.equal(
    buildPropertySeoTitle(monterreyCentro),
    'Departamento en renta en Monterrey Centro, Monterrey | NN-HEL244',
  );
  assert.equal(getPropertySeoLocation(monterreyCentro), 'Monterrey Centro, Monterrey');
});

test('el código hace únicos títulos de propiedades en la misma colonia', () => {
  const secondProperty = { ...monterreyCentro, id: 'NN-HEM089' };

  assert.notEqual(
    buildPropertySeoTitle(monterreyCentro),
    buildPropertySeoTitle(secondProperty),
  );
  assert.match(buildPropertySeoTitle(secondProperty), /NN-HEM089$/);
});

test('no confunde el municipio con una colonia cuando settlement está vacío', () => {
  const property = {
    id: 'NN-HDU100',
    type: 'Casa',
    op: 'Venta',
    zone: 'Monterrey, Nuevo León',
    municipio: 'Monterrey',
  };

  assert.equal(getPropertySeoLocation(property), 'Monterrey');
  assert.equal(buildPropertySeoTitle(property), 'Casa en venta en Monterrey | NN-HDU100');
});

test('tolera el municipio compuesto de los datos locales de respaldo', () => {
  const property = {
    id: 'RN-2034',
    type: 'Depto',
    op: 'Renta',
    zone: 'Valle Oriente, Monterrey',
    municipio: 'Valle Oriente, Monterrey',
  };

  assert.equal(getPropertySeoLocation(property), 'Valle Oriente, Monterrey');
});

test('la descripción conserva precio y referencia única', () => {
  const description = buildPropertyMetaDescription(monterreyCentro);

  assert.match(description, /\$23,000\/mes/);
  assert.match(description, /Referencia NN-HEL244\.$/);
  assert.ok(description.length <= 160);
});

test('limita descripciones largas sin perder la referencia CRM', () => {
  const description = buildPropertyMetaDescription({
    ...monterreyCentro,
    id: 'NN-CODIGOEXTENSO123',
    zone: 'Una colonia con un nombre extraordinariamente largo para comprobar el límite, San Pedro Garza García, Nuevo León',
    municipio: 'San Pedro Garza García',
    price: '$123,456,789.00/mes más mantenimiento',
  });

  assert.ok(description.length <= 160);
  assert.match(description, /Referencia NN-CODIGOEXTENSO123\.$/);
});
