import test from 'node:test';
import assert from 'node:assert/strict';
import { runProductionSmoke } from '../scripts/production-smoke-check.mjs';

const origin = 'https://example.test';
const properties = ['uno', 'dos', 'tres'].map((slug) => `${origin}/propiedades/${slug}`);

function html({ canonical, social = false }) {
  return [
    `<link rel="canonical" href="${canonical}">`,
    social ? `<meta property="og:image" content="${origin}/opengraph-image"><meta name="twitter:image" content="${origin}/twitter-image">` : '',
  ].join('');
}

function fetchFor({ brokenCanonical = false } = {}) {
  return async (url) => {
    if (url === `${origin}/`) {
      return new Response(html({ canonical: `${origin}/`, social: true }), {
        headers: {
          'x-content-type-options': 'nosniff',
          'referrer-policy': 'strict-origin-when-cross-origin',
          'content-security-policy': "base-uri 'self'; object-src 'none'",
        },
      });
    }
    if (url === `${origin}/contacto`) return new Response(html({ canonical: url }));
    if (url === `${origin}/sitemap.xml`) {
      return new Response(`<urlset>${properties.map((item) => `<url><loc>${item}</loc></url>`).join('')}</urlset>`);
    }
    if (url === `${origin}/opengraph-image` || url === `${origin}/twitter-image`) {
      return new Response('png', { headers: { 'content-type': 'image/png' } });
    }
    if (properties.includes(url)) return new Response(html({ canonical: brokenCanonical ? `${origin}/propiedades/otra` : url }));
    return new Response('', { status: 404 });
  };
}

test('confirma las rutas públicas, metadatos e inventario esperado', async () => {
  const result = await runProductionSmoke({ baseUrl: origin, minPropertyUrls: 3, fetchImpl: fetchFor(), log: () => {} });
  assert.deepEqual(result, { urls: 3, properties: 3, samples: 3 });
});

test('falla cuando una ficha publicada deja de tener su canonical correcta', async () => {
  await assert.rejects(
    runProductionSmoke({ baseUrl: origin, minPropertyUrls: 3, fetchImpl: fetchFor({ brokenCanonical: true }), log: () => {} }),
    /URL canónica incorrecta/,
  );
});
