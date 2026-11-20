import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const file = (p) => readFile(new URL(`../${p}`, import.meta.url), 'utf8');

test('preview es exclusivo de casas en venta en Monterrey', async () => {
  const s = await file('app/propiedades/[slug]/[categoria]/page.jsx');
  assert.match(s, /pilot = landing\.path === '\/propiedades\/monterrey\/casas-en-venta'/);
  assert.match(s, /<PilotLandingHero/);
  assert.match(s, /<PilotPropertyCatalog/);
  assert.match(s, /pilot \? matchingProperties : inventoryProperties/);
  assert.match(s, /filterPilotProperties\(matchingProperties, pilotFilters\)/);
  assert.match(s, /fetchAllProperties\(\)/);
  assert.match(s, /source === 'live'/);
});

test('la búsqueda asistida también está después de anuncios y en filtros vacíos', async () => {
  const s = await file('components/impulsa/PilotPropertyCatalog.jsx');
  assert.match(s, /<PropertyCard property=\{property\}/);
  assert.match(s, /variant="inline"/);
  assert.match(s, /variant="empty"/);
  assert.match(s, /variant="footer"/);
  assert.match(s, /previewOnly=\{previewOnly\}/);
});

test('el formulario reutiliza el endpoint y evita escrituras en previews', async () => {
  const s = await file('components/impulsa/PropertySearchAssistant.jsx');
  assert.match(s, /createLeadSubmitter\('comprar'\)/);
  assert.match(s, /isAssistedSearchPreview\(previewOnly, window\.location\.hostname\)/);
  const page = await file('app/propiedades/[slug]/[categoria]/page.jsx');
  assert.match(page, /previewOnly = process\.env\.VERCEL_ENV !== 'production'/);
  assert.match(s, /tipo: 'Comprar propiedad'/);
  assert.match(s, /\/api\/leads/);
  assert.match(s, /aria-modal="true"/);
  assert.match(s, /\/aviso-de-privacidad/);
});

test('el hero conserva h1 y no inventa total de propiedades', async () => {
  const s = await file('components/impulsa/PilotLandingHero.jsx');
  assert.match(s, /<h1>Casas en venta <span>en Monterrey\.<\/span><\/h1>/);
  assert.match(s, /propertyCount/);
  assert.match(s, /Inventario en actualización/);
});
