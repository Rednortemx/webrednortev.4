const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup({ apiKey = 'test-key', responses = [], simulateStaleCache = false } = {}) {
  let cachedCallback;
  let lastSuccessfulSnapshot = null;
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
      if (!simulateStaleCache) return callback;
      // Models Next.js keeping the last successful snapshot after a rejected revalidation.
      return async () => {
        try {
          const result = await callback();
          lastSuccessfulSnapshot = result;
          return result;
        } catch (error) {
          if (lastSuccessfulSnapshot) return lastSuccessfulSnapshot;
          throw error;
        }
      };
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
  const first = Array.from({ length: 100 }, (_, index) => item(`NN-${index}`));
  const second = [item('NN-100')];
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
  const first = Array.from({ length: 100 }, (_, index) => item(`NN-${index}`));
  const s = setup({
    responses: [response({ items: first, totalItems: 101 }), new Error('timeout')],
  });
  await assert.rejects(s.cached()(), /timeout/);
  assert.equal(s.errors[0].event, 'nocnok_inventory_refresh_failed');
});

test('a cold cache without NocNok yields no listings, prices or fictitious IDs', async () => {
  const s = setup({ apiKey: '' });
  const result = await s.context.fetchAllProperties();
  assert.equal(result.source, 'unavailable');
  assert.equal(result.properties.length, 0);
  assert.equal(s.warnings[0].event, 'nocnok_inventory_unavailable');
  assert.equal(s.requests.length, 0);
});

test('a successful live snapshot remains usable when a later refresh fails', async () => {
  const s = setup({
    simulateStaleCache: true,
    responses: [response({ items: [item('NN-REAL1')], totalItems: 1 }), new Error('timeout')],
  });
  const first = await s.context.fetchAllProperties();
  const retained = await s.context.fetchAllProperties();
  assert.equal(first.source, 'live');
  assert.equal(retained.source, 'live');
  assert.equal(retained.properties[0].id, 'NN-REAL1');
  assert.equal(s.errors[0].event, 'nocnok_inventory_refresh_failed');
  assert.equal(s.warnings.length, 0);
});

test('a first-request API failure never exposes incomplete or invented inventory', async () => {
  const s = setup({ responses: [response(null, false, 503)] });
  const result = await s.context.fetchAllProperties();
  assert.equal(result.source, 'unavailable');
  assert.deepEqual(Array.from(result.properties), []);
  assert.equal(s.errors[0].event, 'nocnok_inventory_refresh_failed');
});
