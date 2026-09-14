const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function setup() {
  let consent = null;
  const events = [];
  const context = vm.createContext({
    window: {}, URL, Set,
    readPrivacyConsent: () => consent,
    track: (...args) => events.push(args),
    fetch: async () => ({ ok: true }),
  });
  const source = fs.readFileSync(path.join(__dirname, '../lib/conversions.js'), 'utf8')
    .replace(/^import .*;\n/gm, '').replaceAll('export ', '');
  vm.runInContext(source, context);
  return { context, events, allow: (optional) => { consent = { optional }; } };
}

test('no events without consent, including successful submissions', async () => {
  const s = setup();
  s.context.trackConversion('whatsapp_clic', 'contacto');
  await s.context.submitTrackedLead({}, 'contacto');
  assert.equal(s.events.length, 0);
});

test('only fixed event/source labels; payload never includes form values', async () => {
  const s = setup(); s.allow(true);
  s.context.trackConversion('unknown', 'contacto');
  s.context.trackConversion('whatsapp_clic', 'private@example.test');
  await s.context.submitTrackedLead({ body: 'private@example.test' }, 'contacto');
  assert.equal(s.events.length, 1);
  assert.equal(JSON.stringify(s.events), '[["formulario_enviado",{"origen":"contacto"}]]');
});

test('HTTP and network failures never count as successful submissions', async () => {
  const s = setup(); s.allow(true);
  s.context.fetch = async () => ({ ok: false });
  const response = await s.context.submitTrackedLead({}, 'contacto');
  assert.equal(response.ok, false);
  s.context.fetch = async () => { throw Error('offline'); };
  await assert.rejects(s.context.submitTrackedLead({}, 'contacto'));
  assert.equal(s.events.length, 0);
});

test('revocation during a request suppresses its event', async () => {
  const s = setup(); s.allow(true);
  s.context.fetch = async () => { s.allow(false); return { ok: true }; };
  await s.context.submitTrackedLead({}, 'contacto');
  assert.equal(s.events.length, 0);
});

test('grant during a request does not retroactively track it', async () => {
  const s = setup();
  s.context.fetch = async () => { s.allow(true); return { ok: true }; };
  await s.context.submitTrackedLead({}, 'contacto');
  assert.equal(s.events.length, 0);
});

test('beforeSend rejects after revocation and sanitizes every event URL', () => {
  const s = setup(); s.allow(true);
  const event = { type: 'event', url: 'https://www.rednorte.mx/contacto?email=private#token' };
  assert.equal(s.context.beforeAnalyticsSend(event).url, 'https://www.rednorte.mx/contacto');
  assert.equal(s.context.beforeAnalyticsSend({ url: 'invalid' }), null);
  s.allow(false);
  assert.equal(s.context.beforeAnalyticsSend(event), null);
});

test('tool lifecycle counts once and removes listeners on unmount', () => {
  const events = [];
  const window = new EventTarget();
  const container = new EventTarget();
  const context = vm.createContext({ window, trackConversion: (...args) => events.push(args), submitTrackedLead: () => {} });
  const source = fs.readFileSync(path.join(__dirname, '../lib/toolConversions.js'), 'utf8')
    .replace(/^import .*;\n/gm, '').replaceAll('export ', '');
  vm.runInContext(source, context);
  const cleanup = context.bindToolConversions(container, 'estimador');
  container.dispatchEvent(new Event('input'));
  container.dispatchEvent(new Event('change'));
  window.dispatchEvent(new Event('rn:estimador:complete'));
  window.dispatchEvent(new Event('rn:estimador:complete'));
  assert.equal(events.length, 2);
  cleanup();
  window.dispatchEvent(new Event('rn:estimador:whatsapp'));
  assert.equal(events.length, 2);
  assert.equal(window.rnToolLeads.estimador, undefined);
});

test('both classic scripts remain valid JavaScript with completion and lead hooks', () => {
  for (const file of ['valuacion/estimadorScript.js', 'vendibilidad/vendibilidadScript.js']) {
    const text = fs.readFileSync(path.join(__dirname, '../components', file), 'utf8');
    const script = JSON.parse(text.match(/export const \w+ = (".*");/s)[1]);
    assert.doesNotThrow(() => new vm.Script(script));
    assert.ok(script.includes(':complete'));
    assert.ok(script.includes('window.rnToolLeads.'));
    assert.ok(!script.includes("fetch('/api/leads'"));
  }
});
