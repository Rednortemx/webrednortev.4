import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizePilotFilters, validatePilotFilters, filterPilotProperties, buildPilotSearchHref,
} from '../lib/pilotPropertySearch.mjs';

// Synthetic fixtures exercise rules only; they never enter the public inventory.
const house = (id, overrides = {}) => ({
  id, type: 'Casa', op: 'Venta', municipio: 'Monterrey', settlement: 'Colonia de prueba',
  rawPrice: 4000000, currency: 'MXN', rooms: 3, baths: 2, constructionSize: 160, lotSize: 400,
  ...overrides,
});

test('the landing always remains houses for sale in the exact municipality', () => {
  const filters = normalizePilotFilters({ tipo: 'Depto', operacion: 'Renta', zona: 'San Pedro', page: '-2' });
  assert.equal(filters.tipo, 'Casa');
  assert.equal(filters.operacion, 'Venta');
  assert.equal(filters.zona, 'Monterrey');
  assert.equal(filters.page, 1);
  assert.deepEqual(filterPilotProperties([
    house('a'), house('b', { type: 'Depto' }), house('c', { op: 'Renta' }),
    house('d', { municipio: 'Otro municipio', zone: 'Colonia Monterrey' }),
  ], filters).map((p) => p.id), ['a']);
});

test('numeric inputs accept grouped prices but reject malformed numbers and inverted ranges', () => {
  assert.equal(normalizePilotFilters({ precioMin: ' 3,000,000 ' }).precioMin, '3000000');
  assert.equal(validatePilotFilters({ precioMin: '3,000,000', precioMax: '4000000' }).valid, true);
  for (const precioMin of ['abc', '-1', '4,5', '1e6', 'Infinity']) {
    assert.ok(validatePilotFilters({ precioMin }).errors.precioMin);
  }
  assert.ok(validatePilotFilters({ precioMin: '5000000', precioMax: '4000000' }).errors.precioMax);
  assert.ok(validatePilotFilters({ m2Min: '200', m2Max: '100' }).errors.m2Max);
  assert.deepEqual(filterPilotProperties([house('a')], { precioMin: 'abc' }), []);
});

test('budget and bedroom boundaries are inclusive; unknown prices and other currencies do not qualify', () => {
  const properties = [
    house('a', { rawPrice: 3000000 }), house('b', { rawPrice: 5000000 }),
    house('c', { rawPrice: 0 }), house('d', { rawPrice: null }),
    house('e', { rooms: 2 }), house('f', { currency: 'USD' }),
  ];
  assert.deepEqual(filterPilotProperties(properties, { precioMin: '3000000', precioMax: '5000000', recamaras: '3' })
    .map((p) => p.id), ['a', 'b']);
  assert.equal(filterPilotProperties(properties).length, properties.length);
});

test('surface means construction only, and unknown data cannot satisfy an active range', () => {
  const properties = [house('a'), house('b', { constructionSize: 0 }), house('c', { constructionSize: 250 })];
  assert.deepEqual(filterPilotProperties(properties, { m2Min: '200', m2Max: '300' }).map((p) => p.id), ['c']);
  assert.deepEqual(filterPilotProperties(properties, { m2Max: '200' }).map((p) => p.id), ['a']);
});

test('colony matches the source field exactly with case and accent normalization', () => {
  const properties = [house('a', { settlement: 'México' }), house('b', { settlement: 'Nuevo México' })];
  assert.deepEqual(filterPilotProperties(properties, { colonia: '  MEXICO ' }).map((p) => p.id), ['a']);
});

test('price ordering leaves unknown and non-MXN amounts last and does not mutate source order', () => {
  const properties = [house('unknown', { rawPrice: 0 }), house('higher', { rawPrice: 6000000 }),
    house('lower', { rawPrice: 2000000 }), house('usd', { rawPrice: 300000, currency: 'USD' })];
  assert.deepEqual(filterPilotProperties(properties, { sort: 'precio-asc' }).map((p) => p.id), ['lower', 'higher', 'unknown', 'usd']);
  assert.deepEqual(filterPilotProperties(properties, { sort: 'precio-desc' }).map((p) => p.id), ['higher', 'lower', 'unknown', 'usd']);
  assert.equal(properties[0].id, 'unknown');
});

test('pagination URLs preserve every applied criterion and sorting, with only approved attribution parameters', () => {
  const filters = normalizePilotFilters({ colonia: 'Colonia de prueba', precioMin: '2000000', precioMax: '6000000',
    recamaras: '3', banos: '2', m2Min: '150', m2Max: '300', sort: 'precio-desc' });
  const href = buildPilotSearchHref({ filters, page: 2,
    searchParams: '?utm_source=google&utm_campaign=casas-monterrey&gclid=click123&email=private%40example.com&telefono=1234567890&tipo=Depto&extra=discard' });
  const params = new URL(href, 'https://www.rednorte.mx').searchParams;
  for (const key of ['colonia', 'precioMin', 'precioMax', 'recamaras', 'banos', 'm2Min', 'm2Max', 'sort']) {
    assert.equal(params.get(key), filters[key]);
  }
  assert.equal(params.get('page'), '2');
  assert.equal(params.get('utm_source'), 'google');
  assert.equal(params.get('gclid'), 'click123');
  for (const key of ['email', 'telefono', 'tipo', 'extra']) assert.equal(params.has(key), false);
  assert.equal(normalizePilotFilters(params).page, 2);
  assert.deepEqual(filterPilotProperties([house('a')], normalizePilotFilters(params)), filterPilotProperties([house('a')], filters));
});

test('reset URLs omit defaults and reject email-like attribution without retaining contact data', () => {
  assert.equal(buildPilotSearchHref(), '/propiedades/monterrey/casas-en-venta');
  const href = buildPilotSearchHref({ searchParams: { utm_term: 'person@example.com', name: 'Private', utm_medium: 'cpc' } });
  assert.equal(href, '/propiedades/monterrey/casas-en-venta?utm_medium=cpc');
});
