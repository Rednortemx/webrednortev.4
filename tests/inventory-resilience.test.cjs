const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup({ apiKey = 'test-key', responses = [] } = {}) {
  let cachedCallback;
  const requests = [];
  const errors = [];
  const warnings = [];
  const context = vm.createContext({
    URLSearchParams,
    AbortSignal,
    process: { env: { NOCNOK_API_KEY: apiKey } },
    console: {
      error: (message) => errors.push(JSON.parse(message)),
      warn: (message) => warnings.push(JSON.parse(message)),
    },
    unstable_cache: (callback) => {
      cachedCallback = callback;
      return callback;
    },
    fetch: async (_url, options) => {
      requests.push(options);
      const next = responses.shift();
      if (next instanceof Error) throw next;
      return next;
    },
  });

  const source = fs.readFileSync(path.join(__dirname, '../lib/properties.js'), 'utf8')
    .replace(/^import .*;\n/gm, '')
    .replaceAll('export ', '');
  vm.runInContext(source, context);
  return { context, requests, errors, warnings, cached: () => cachedCallback };
}

function response(data, ok = true, status = 200) {
  return { ok, status, json: async () => ({ data }) };
}

function item(code) {
  return {
    code,
    title: `Propiedad ${code}`,
    type: 'House',
    category: 'Habitational',
    isSale: true,
    salePrice: 1_000_000,
  };
}

test('a rejected refresh throws instead of replacing the cached snapshot', async () => {
  const s = setup({ responses: [response(null, false, 503)] });
  await assert.rejects(s.cached()(), /503/);
  assert.equal(s.errors[0].event, 'nocnok_inventory_refresh_failed');
});

test('a complete successful refresh returns the live inventory', async () => {
  const first = Array.from({ length: 100 }, (_, index) => item(`RN-${index}`));
  const second = [item('RN-100')];
  const s = setup({
    responses: [
      response({ items: first, totalItems: 101 }),
      response({ items: second, totalItems: 101 }),
    ],
  });
  const result = await s.cached()();
  assert.equal(result.source, 'live');
  assert.equal(result.properties.length, 101);
  assert.equal(s.requests.length, 2);
  assert.ok(s.requests.every((request) => request.cache === 'no-store'));
});

test('a failed later page rejects the whole refresh instead of caching partial data', async () => {
  const first = Array.from({ length: 100 }, (_, index) => item(`RN-${index}`));
  const s = setup({
    responses: [response({ items: first, totalItems: 101 }), new Error('timeout')],
  });
  await assert.rejects(s.cached()(), /timeout/);
  assert.equal(s.errors[0].event, 'nocnok_inventory_refresh_failed');
});

test('a cold cache failure uses the small local fallback', async () => {
  const s = setup({ apiKey: '' });
  const result = await s.context.fetchAllProperties();
  assert.equal(result.source, 'fallback');
  assert.equal(result.properties.length, 6);
  assert.equal(s.warnings[0].event, 'nocnok_inventory_fallback');
});
