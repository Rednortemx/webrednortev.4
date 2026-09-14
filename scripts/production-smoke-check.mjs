const DEFAULT_BASE_URL = 'https://www.rednorte.mx';
const DEFAULT_MIN_PROPERTY_URLS = 350;

function fail(message) {
  throw new Error(message);
}

function canonicalFrom(html) {
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return canonical?.[1] || '';
}

function sameUrl(left, right) {
  const normalize = (value) => {
    const url = new URL(value);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';
    return `${url.origin}${pathname}${url.search}`;
  };
  return normalize(left) === normalize(right);
}

function metaFrom(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["']`, 'i'));
  return match?.[1] || '';
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function propertySamples(urls) {
  const indexes = [0, Math.floor(urls.length / 2), urls.length - 1];
  return [...new Set(indexes.map((index) => urls[index]))];
}

async function getText(fetchImpl, url, label) {
  const response = await fetchImpl(url, { redirect: 'follow' });
  if (!response.ok) fail(`${label}: respondió HTTP ${response.status}`);
  return { response, text: await response.text() };
}

async function assertImage(fetchImpl, url, label) {
  const response = await fetchImpl(url, { redirect: 'follow' });
  if (!response.ok) fail(`${label}: respondió HTTP ${response.status}`);
  if (!response.headers.get('content-type')?.startsWith('image/')) {
    fail(`${label}: no respondió una imagen`);
  }
}

export async function runProductionSmoke({
  baseUrl = process.env.BASE_URL || DEFAULT_BASE_URL,
  minPropertyUrls = Number(process.env.MIN_PROPERTY_URLS || DEFAULT_MIN_PROPERTY_URLS),
  fetchImpl = fetch,
  log = console.log,
} = {}) {
  const origin = new URL(baseUrl).origin;
  const rootUrl = `${origin}/`;
  const contactUrl = `${origin}/contacto`;
  const sitemapUrl = `${origin}/sitemap.xml`;
  const leadsHealthUrl = `${origin}/api/leads`;

  const [{ response: rootResponse, text: rootHtml }, { text: contactHtml }, { text: sitemapXml }, { text: leadsHealth }] = await Promise.all([
    getText(fetchImpl, rootUrl, 'Inicio'),
    getText(fetchImpl, contactUrl, 'Contacto'),
    getText(fetchImpl, sitemapUrl, 'Sitemap'),
    getText(fetchImpl, leadsHealthUrl, 'Recepción de formularios'),
  ]);

  let leadsStatus;
  try {
    leadsStatus = JSON.parse(leadsHealth)?.status;
  } catch {
    fail('Recepción de formularios: respuesta inválida');
  }
  if (leadsStatus !== 'ready') fail('Recepción de formularios: configuración no disponible');

  const requiredHeaders = {
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
  };
  for (const [header, expected] of Object.entries(requiredHeaders)) {
    if (rootResponse.headers.get(header) !== expected) fail(`Inicio: falta encabezado ${header}`);
  }
  if (!rootResponse.headers.get('content-security-policy')?.includes("object-src 'none'")) {
    fail('Inicio: falta la política de contenido esperada');
  }

  if (!sameUrl(canonicalFrom(rootHtml), rootUrl)) fail('Inicio: URL canónica incorrecta');
  if (!sameUrl(canonicalFrom(contactHtml), contactUrl)) fail('Contacto: URL canónica incorrecta');

  const openGraphImage = metaFrom(rootHtml, 'og:image');
  const twitterImage = metaFrom(rootHtml, 'twitter:image');
  if (!openGraphImage || !twitterImage) fail('Inicio: faltan imágenes para compartir');
  await Promise.all([
    assertImage(fetchImpl, openGraphImage, 'Imagen Open Graph'),
    assertImage(fetchImpl, twitterImage, 'Imagen Twitter'),
  ]);

  const urls = sitemapUrls(sitemapXml);
  if (urls.length === 0) fail('Sitemap: no contiene URLs');
  if (new Set(urls).size !== urls.length) fail('Sitemap: contiene URLs duplicadas');
  if (urls.some((url) => new URL(url).origin !== origin)) fail('Sitemap: contiene un dominio inesperado');

  const propertyUrls = urls.filter((url) => /^https:\/\/[^/]+\/propiedades\/[^/]+$/.test(url));
  if (propertyUrls.length < minPropertyUrls) {
    fail(`Sitemap: solo contiene ${propertyUrls.length} propiedades; mínimo esperado ${minPropertyUrls}`);
  }

  await Promise.all(propertySamples(propertyUrls).map(async (url) => {
    const { text } = await getText(fetchImpl, url, `Ficha ${url}`);
    if (!sameUrl(canonicalFrom(text), url)) fail(`Ficha ${url}: URL canónica incorrecta`);
  }));

  const result = { urls: urls.length, properties: propertyUrls.length, samples: propertySamples(propertyUrls).length };
  log(`Producción correcta: ${result.urls} URLs, ${result.properties} propiedades y ${result.samples} fichas revisadas.`);
  return result;
}

if (process.argv[1]?.endsWith('production-smoke-check.mjs')) {
  runProductionSmoke().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
