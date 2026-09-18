import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('usa la integración avanzada oficial de Preferred Sources', async () => {
  const component = await readFile(new URL('../components/PreferredSourceBadge.jsx', import.meta.url), 'utf8');

  assert.match(component, /https:\/\/news\.google\.com\/swg\/js\/v1\/publisher\.js/);
  assert.match(component, /preferred-sources-control="manual"/);
  assert.match(component, /preferredSource\.init\(\{ theme: 'light', lang: 'es' \}\)/);
  assert.match(component, /clientRef\.current\?\.addPreferredSource\(\)/);
  assert.match(component, /min-height: 44px|className=\{styles\.button\}/);
});

test('el badge aparece solo en superficies editoriales de Insights y Reportes', async () => {
  const insightHub = await readFile(new URL('../app/insights/page.jsx', import.meta.url), 'utf8');
  const insight = await readFile(new URL('../app/insights/[slug]/page.jsx', import.meta.url), 'utf8');
  const reports = await readFile(new URL('../app/reportes/page.jsx', import.meta.url), 'utf8');
  const report = await readFile(new URL('../app/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026/page.jsx', import.meta.url), 'utf8');
  const footer = await readFile(new URL('../components/Footer.jsx', import.meta.url), 'utf8');

  for (const source of [insightHub, insight, reports, report]) {
    assert.match(source, /PreferredSourceBadge/);
  }
  assert.doesNotMatch(footer, /PreferredSourceBadge|preferred source/i);
});

test('el badge explica el alcance sin prometer un aumento general de ranking', async () => {
  const component = await readFile(new URL('../components/PreferredSourceBadge.jsx', import.meta.url), 'utf8');

  assert.match(component, /más\s+posibilidades de aparecerte/);
  assert.match(component, /AI Overviews y Modo IA/);
  assert.doesNotMatch(component, /mejora(r|rá).*ranking|garantiza/i);
});
