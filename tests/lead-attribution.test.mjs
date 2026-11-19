import test from 'node:test';
import assert from 'node:assert/strict';
import { campaignReferrerLabel } from '../lib/leadAttribution.mjs';

test('preserves fixed UTM fields and page without retaining click IDs', () => {
  const label = campaignReferrerLabel(
    'https://www.rednorte.mx/comprar?utm_source=google&utm_medium=cpc&utm_campaign=casas_monterrey&utm_content=anuncio_a&gclid=private-token&email=private@example.com',
    'www.rednorte.mx',
  );
  assert.equal(label, '[Rednorte Impulsa] fuente=google; medio=cpc; campana=casas_monterrey; creativo=anuncio_a; pagina=/comprar');
  assert.equal(label.includes('gclid'), false);
  assert.equal(label.includes('email'), false);
});

test('does not invent an attribution for organic, missing or external referrers', () => {
  for (const referrer of [
    null,
    '',
    'https://www.rednorte.mx/propiedades',
    'https://other.test/comprar?utm_source=google',
    'not-a-url',
  ]) {
    assert.equal(campaignReferrerLabel(referrer, 'www.rednorte.mx'), null);
  }
});

test('sanitizes campaign labels and rejects host spoofing', () => {
  const label = campaignReferrerLabel(
    'https://www.rednorte.mx/rentar?utm_source=Meta%0A%3Cscript%3E&utm_campaign=Depas%20en%20Renta',
    'www.rednorte.mx',
  );
  assert.equal(label, '[Rednorte Impulsa] fuente=Metascript; campana=Depas_en_Renta; pagina=/rentar');
  assert.equal(campaignReferrerLabel(
    'https://www.rednorte.mx.evil.example/rentar?utm_source=meta',
    'www.rednorte.mx',
  ), null);
});

test('rejects unbounded values and drops unrelated URL query parameters', () => {
  const value = 'a'.repeat(150);
  const label = campaignReferrerLabel(
    `https://www.rednorte.mx/propiedades?utm_campaign=${value}&client_phone=8112345678`,
    'www.rednorte.mx',
  );
  assert.equal(label, `[Rednorte Impulsa] campana=${'a'.repeat(80)}; pagina=/propiedades`);
  assert.equal(label.includes('8112345678'), false);
});
