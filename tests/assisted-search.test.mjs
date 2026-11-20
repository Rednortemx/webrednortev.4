import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assistedSearchNotes,
  assistedSearchPrefill,
  createAssistedSearchForm,
  isAssistedSearchPreview,
  mergeAssistedSearchPrefill,
  validateAssistedSearch,
} from '../lib/assistedSearch.mjs';

const validForm = () => ({ ...createAssistedSearchForm(), name: 'Cliente de prueba', phone: '+52 (81) 1234-5678', privacy: true });

test('validación acepta teléfono internacional formateado y rechaza puntuación sin dígitos suficientes', () => {
  assert.deepEqual(validateAssistedSearch(validForm()), {});
  for (const phone of ['-------', '123456', '1234567890123456', '+52 81 ABC 12345678']) {
    assert.ok(validateAssistedSearch({ ...validForm(), phone }).phone);
  }
  assert.equal(validateAssistedSearch({ ...validForm(), phone: '1234567' }).phone, undefined);
  assert.equal(validateAssistedSearch({ ...validForm(), phone: '+123456789012345' }).phone, undefined);
});

test('nombre se valida después de trim y consentimiento nunca es implícito', () => {
  const errors = validateAssistedSearch({ ...validForm(), name: '  ', privacy: false });
  assert.ok(errors.name);
  assert.ok(errors.privacy);
  assert.ok(validateAssistedSearch({ ...validForm(), privacy: 'true' }).privacy);
  assert.ok(validateAssistedSearch({ ...validForm(), email: 'nombre@dominio' }).email);
  assert.equal(validateAssistedSearch({ ...validForm(), email: '  persona@dominio.mx  ' }).email, undefined);
});

test('prefill conserva ambos extremos de presupuesto, colonia y una recámara', () => {
  assert.deepEqual(assistedSearchPrefill({ precioMin: '4,000,000', precioMax: '6000000', recamaras: '1', colonia: '  Cumbres  ' }), {
    zone: 'Cumbres', budget: 'De $4,000,000 a $6,000,000', bedrooms: '1',
  });
  assert.equal(assistedSearchPrefill({ precioMin: '2500000' }).budget, 'Desde $2,500,000');
  assert.equal(assistedSearchPrefill({ precioMax: '3500000' }).budget, 'Hasta $3,500,000');
  assert.equal(assistedSearchPrefill({ recamaras: '5' }).bedrooms, '5');
  assert.deepEqual(assistedSearchPrefill({ precioMin: 'no es un número', precioMax: '-1', recamaras: '0' }), { zone: '', budget: '', bedrooms: '' });
});

test('reabrir actualiza filtros no editados sin perder contacto ni preferencias del visitante', () => {
  const current = { ...validForm(), zone: '', budget: 'Hasta cinco millones', bedrooms: '3' };
  const next = mergeAssistedSearchPrefill(current, { colonia: 'Obispado', precioMax: '9000000', recamaras: '4' }, new Set(['zone', 'budget']));
  assert.equal(next.zone, '');
  assert.equal(next.budget, 'Hasta cinco millones');
  assert.equal(next.bedrooms, '4');
  assert.equal(next.name, current.name);
  assert.equal(next.phone, current.phone);
  assert.equal(next.privacy, true);
  assert.equal(current.bedrooms, '3');
});

test('guard protege previews en dominios propios, Vercel y localhost', () => {
  assert.equal(isAssistedSearchPreview(true, 'preview.rednorte.mx'), true);
  for (const host of ['site.vercel.app', 'localhost', 'app.localhost', '127.0.0.1', '[::1]', '::1']) {
    assert.equal(isAssistedSearchPreview(false, host), true);
  }
  assert.equal(isAssistedSearchPreview(false, 'www.rednorte.mx'), false);
  assert.equal(isAssistedSearchPreview(false, 'vercel.app.example.com'), false);
});

test('solicitud incluye preferencias adicionales del catálogo sin inventar propiedades', () => {
  const notes = assistedSearchNotes({ ...validForm(), zone: 'Cumbres', budget: 'Hasta $5,000,000', bedrooms: '1', detail: 'Jardín' }, { banos: '2', m2Min: '120', m2Max: '250' });
  assert.match(notes, /Zona o colonia preferida: Cumbres/);
  assert.match(notes, /Recámaras mínimas: 1/);
  assert.match(notes, /Baños mínimos: 2/);
  assert.match(notes, /Superficie buscada: 120 a 250 m²/);
  assert.match(notes, /Requisitos: Jardín/);
  assert.match(notes, /Landing: \/propiedades\/monterrey\/casas-en-venta/);
});
