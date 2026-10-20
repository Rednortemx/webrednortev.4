import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  CANONICAL_ORIGIN,
  canonicalOriginRedirect,
} from '../lib/canonical.js';
import { getCanonicalSiteUrl } from '../lib/security.js';
import { extractLegacyCode, legacyCategoryTarget, REDIRECTS_ESTATICOS } from '../lib/legacy.js';
import { buildPropertySlug, extractCodeFromSlug } from '../lib/slug.js';

test('el origen canónico es HTTPS con www y no depende del entorno', () => {
  assert.equal(CANONICAL_ORIGIN, 'https://www.rednorte.mx');
  assert.equal(getCanonicalSiteUrl(), CANONICAL_ORIGIN);
});

test('normaliza HTTP, apex y conserva path y query', () => {
  const cases = [
    ['rednorte.mx', 'http', 'https://www.rednorte.mx/propiedades?operacion=Venta'],
    ['www.rednorte.mx', 'http', 'https://www.rednorte.mx/propiedades?operacion=Venta'],
    ['rednorte.mx', 'https', 'https://www.rednorte.mx/propiedades?operacion=Venta'],
  ];

  for (const [host, protocol, expected] of cases) {
    assert.equal(canonicalOriginRedirect({
      host,
      protocol,
      pathname: '/propiedades',
      search: '?operacion=Venta',
    }), expected);
  }

  assert.equal(canonicalOriginRedirect({
    host: 'www.rednorte.mx',
    protocol: 'https',
    pathname: '/propiedades',
    search: '?operacion=Venta',
  }), '');
  assert.equal(canonicalOriginRedirect({
    host: 'preview.vercel.app',
    protocol: 'https',
    pathname: '/propiedades',
  }), '');
});

test('las fichas legacy se identifican sólo por código y las categorías conservan su intención', () => {
  assert.equal(
    extractLegacyCode('departamento-en-renta/nuevo-leon/monterrey/centro-id-nn-gzg650'),
    'NN-GZG650',
  );
  assert.equal(extractLegacyCode('NN-HDU152'), 'NN-HDU152');
  assert.equal(extractLegacyCode('casa-en-renta/nuevo-leon/el-carmen'), '');
  assert.equal(
    legacyCategoryTarget('bodega-en-renta/nuevo-leon/santa-catarina'),
    '/propiedades?operacion=Renta&tipo=Bodega&zona=Santa+Catarina',
  );
  assert.equal(REDIRECTS_ESTATICOS['/properties'], '/propiedades');
});

test('cada código produce una sola ficha canónica aunque cambien las palabras del slug', () => {
  const property = {
    id: 'NN-HFS565',
    type: 'Depto',
    op: 'Renta',
    municipio: 'Monterrey',
  };
  const canonicalSlug = buildPropertySlug(property);
  assert.equal(canonicalSlug, 'Departamento-en-renta-en-monterrey-NN-HFS565');
  assert.equal(extractCodeFromSlug(canonicalSlug), 'NN-HFS565');
  assert.equal(extractCodeFromSlug('texto-anterior-NN-HFS565'), 'NN-HFS565');
});

test('la ficha fuerza redirect permanente cuando el slug descriptivo no es el canónico', async () => {
  const page = await readFile(new URL('../app/propiedades/[slug]/page.jsx', import.meta.url), 'utf8');
  assert.match(page, /if \(slug !== canonicalSlug\)/);
  assert.match(page, /permanentRedirect\(`\/propiedades\/\$\{canonicalSlug\}`\)/);
});

test('middleware cubre documentos públicos y deja previews fuera de la normalización', async () => {
  const middleware = await readFile(new URL('../middleware.js', import.meta.url), 'utf8');
  assert.match(middleware, /canonicalOriginRedirect/);
  assert.match(middleware, /_next\/static/);
  assert.match(middleware, /NextResponse\.redirect\(canonicalOrigin, 308\)/);
});

test('sitemap sólo usa el origen canónico y elimina URLs duplicadas', async () => {
  const sitemap = await readFile(new URL('../app/sitemap.js', import.meta.url), 'utf8');
  assert.match(sitemap, /getCanonicalSiteUrl\(\)/);
  assert.match(sitemap, /new Map\(entries\.map/);
  assert.doesNotMatch(sitemap, /http:\/\//);
  assert.doesNotMatch(sitemap, /`\/propiedad\//);
});

test('robots apunta al sitemap canónico y no impide rastrear páginas indexables', async () => {
  const robots = await readFile(new URL('../app/robots.js', import.meta.url), 'utf8');
  assert.match(robots, /sitemap: `\$\{SITE_URL\}\/sitemap\.xml`/);
  assert.match(robots, /allow: '\/'/);
  assert.match(robots, /disallow: '\/api\/'/);
});

test('Luxury usa canonical propio en cada página y no indexa filtros libres', async () => {
  const luxury = await readFile(new URL('../app/propiedades/luxury/page.jsx', import.meta.url), 'utf8');
  assert.match(luxury, /\/propiedades\/luxury\?page=\$\{page\}/);
  assert.match(luxury, /robots: hasActiveFilters \? \{ index: false, follow: true \}/);
});
