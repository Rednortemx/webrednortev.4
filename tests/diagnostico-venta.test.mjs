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
  assert.match(component, /Sin datos personales para consultar la orientación/);
  assert.match(component, /sale-diagnosis-hero-photo/);
  assert.match(component, /sale-diagnosis-mobile-cta/);
  assert.match(component, /defaultOpen=\{index === 0\}/);
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
  assert.match(component, /Aviso de Privacidad/);
  assert.match(component, /type="checkbox" name="privacidad"/);
  assert.match(tracking, /'diagnostico_venta'/);
  assert.doesNotMatch(component, /window\.rnToolLeads/);
});
