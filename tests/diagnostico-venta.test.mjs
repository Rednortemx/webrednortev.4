import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const load = (relative) => readFile(new URL(relative, import.meta.url), 'utf8');

test('la landing comercial nueva es independiente del Reporte de Vendibilidad', async () => {
  const [page, component, tools, sitemap] = await Promise.all([
    load('../app/herramientas/por-que-no-se-vende/page.jsx'),
    load('../components/diagnostico-venta/DiagnosticoVenta.jsx'),
    load('../app/herramientas/page.jsx'),
    load('../app/sitemap.js'),
  ]);
  assert.match(page, /canonical: '\/herramientas\/por-que-no-se-vende'/);
  assert.match(page, /DiagnosticoVenta/);
  assert.match(sitemap, /'\/herramientas\/por-que-no-se-vende'/);
  assert.match(tools, /href: '\/herramientas\/por-que-no-se-vende'/);
  assert.match(component, /href="\/herramientas\/reporte-de-vendibilidad"/);
  assert.match(component, /¿Qué está pasando/);
  assert.match(component, /sale-diagnosis-first-grid/);
  assert.match(component, /sale-diagnosis-selector/);
  assert.match(component, /sale-diagnosis-mobile-cta/);
  assert.match(component, /defaultOpen=\{index === 0\}/);
  assert.match(component, /sd-journey/);
  assert.match(component, /sd-stage/);
  assert.match(component, /sd-method-steps/);
  assert.match(component, /GraficoFactor/);
  assert.doesNotMatch(component, /sale-diagnosis-hero-photo/);
});

test('los cinco escenarios incluyen causas, acciones concretas y el feedback al asesor', async () => {
  const content = await load('../components/diagnostico-venta/escenarios.js');
  const ids = [...content.matchAll(/\bid: '([a-z-]+)'/g)].map((match) => match[1]);
  assert.deepEqual(ids, [
    'sin-consultas',
    'sin-visitas',
    'sin-ofertas',
    'ofertas-bajas',
    'operaciones-caidas',
  ]);
  assert.match(content, /propuestas no equivalen a consultas de compradores/);
  assert.match(content, /Por consideración, algunos compradores evitan decir directamente al propietario/);
  assert.match(content, /Como intermediarios, nuestros asesores hacen preguntas específicas/);
  assert.match(content, /no diagnósticos individuales ni promesas de venta/);
});

test('contacto: validación, consentimiento, recepción confirmada y WhatsApp con situación', async () => {
  const [component, tracking] = await Promise.all([
    load('../components/diagnostico-venta/DiagnosticoVenta.jsx'),
    load('../lib/conversions.js'),
  ]);
  assert.match(component, /submitTrackedLead/);
  assert.match(component, /if \(!response\.ok\) throw/);
  assert.match(component, /tipo: 'Vender propiedad'/);
  assert.match(component, /Situación: /);
  assert.match(component, /function mensajeWhatsApp/);
  assert.match(component, /window\.location\.assign\(link\)/);
  assert.match(component, /'Revisión general sin selección'/);
  assert.doesNotMatch(component, /if \(!scenario \|\| !validateForm/);
  assert.match(component, /<section className="sale-diagnosis-review"/);
  assert.match(component, /setPanelOpen\(true\)/);
  assert.match(component, /aria-modal=\{panelOpen \? 'true' : undefined\}/);
  assert.match(component, /ref=\{formRef\}/);
  assert.match(component, /Aviso de Privacidad/);
  assert.match(component, /name="privacidad" type="checkbox"/);
  assert.match(tracking, /'diagnostico_venta'/);
  assert.doesNotMatch(component, /window\.rnToolLeads/);
});

test('la captura es libre de selección obligatoria y la promesa de revisión es visible desde el inicio', async () => {
  const component = await load('../components/diagnostico-venta/DiagnosticoVenta.jsx');
  const beforeResults = component.slice(component.indexOf('  return ('), component.indexOf('{scenario && ('));
  assert.match(beforeResults, /Quiero una revisión gratuita/);
  assert.match(beforeResults, /Desde 2018/);
  assert.match(beforeResults, /Revisión gratis de mi anuncio/);
  assert.match(component, /Es una revisión inicial y orientativa/);
});


test('V4 conserva cinco etapas interactivas con diagramas ilustrativos sin datos inventados', async () => {
  const [component, css] = await Promise.all([
    load('../components/diagnostico-venta/DiagnosticoVenta.jsx'),
    load('../components/diagnostico-venta/diagnosticoVenta.css'),
  ]);
  const stages = [...component.matchAll(/\{ id: '([^']+)', titulo:/g)].map((m) => m[1]);
  assert.deepEqual(stages, [
    'sin-consultas', 'sin-visitas', 'sin-ofertas', 'ofertas-bajas', 'operaciones-caidas',
  ]);
  assert.match(component, /aria-pressed=\{selected === etapa\.id\}/);
  assert.match(component, /scrollIntoView/);
  assert.match(component, /Los elementos gráficos son ilustrativos/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /sd-journey-line/);
  assert.match(css, /sd-drawer-in/);
});

test('V4 ofrece un solo formulario, accesible también sin escenario y en panel contextual', async () => {
  const component = await load('../components/diagnostico-venta/DiagnosticoVenta.jsx');
  assert.equal((component.match(/<form\b/g) || []).length, 1);
  assert.match(component, /'Revisión general sin selección'/);
  assert.match(component, /goContact\(\) \{[\s\S]*setPanelOpen\(true\)/);
  assert.match(component, /if \(!panelOpen\) return undefined/);
  assert.match(component, /event\.key === 'Escape'/);
  assert.match(component, /event\.key !== 'Tab'/);
  assert.match(component, /aria-modal=\{panelOpen \? 'true' : undefined\}/);
  assert.match(component, /role=\{panelOpen \? 'dialog' : undefined\}/);
  assert.match(component, /'hidden'/);
  assert.match(component, /sd-drawer-backdrop/);
  assert.match(component, /setStatus\(\{ type: 'success'/); // no real network calls
});


test('V4.1 usa olivo Rednorte y conserva terracota para las acciones sin modificar la lógica', async () => {
  const [css, component, scenarios] = await Promise.all([
    load('../components/diagnostico-venta/diagnosticoVenta.css'),
    load('../components/diagnostico-venta/DiagnosticoVenta.jsx'),
    load('../components/diagnostico-venta/escenarios.js'),
  ]);
  assert.match(css, /V4\.1 — Variación cromática OLIVO/);
  assert.match(css, /--sd-olive: #7c7b67/);
  assert.match(css, /--sd-olive-hero: #626a54/);
  assert.match(css, /\.sale-diagnosis-first \{[\s\S]*?linear-gradient\(125deg,#737966/);
  assert.match(css, /\.sale-diagnosis-review \{[\s\S]*?linear-gradient\(135deg,#526049/);
  assert.match(css, /background:#bc4b31/);
  assert.match(css, /body:has\(\.sale-diagnosis\) footer/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.equal((component.match(/<form\b/g) || []).length, 1);
  assert.equal((scenarios.match(/\bid: '[a-z-]+',/g) || []).length, 5);
});


test('V4.2 aplica olivo al encabezado y navegación sólo donde existe la landing', async () => {
  const [css, header] = await Promise.all([
    load('../components/diagnostico-venta/diagnosticoVenta.css'),
    load('../components/Header.jsx'),
  ]);
  assert.match(css, /V4\.2 — Header y breadcrumb olivo/);
  assert.match(css, /body:has\(\.sale-diagnosis\) \.site-header \{/);
  assert.match(css, /body:has\(\.sale-diagnosis\) \.site-header nav a/);
  assert.match(css, /body:has\(\.sale-diagnosis\) \.site-header \.hamburger span/);
  assert.match(css, /body:has\(\.sale-diagnosis\) \.mobile-menu/);
  assert.match(css, /body:has\(\.sale-diagnosis\) \.breadcrumb \{/);
  assert.match(css, /background: #454f40/);
  assert.doesNotMatch(header, /sale-diagnosis|diagnostico-comercializacion/);
});
