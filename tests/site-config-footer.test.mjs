import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('la promesa de respuesta y los datos públicos tienen una fuente compartida', async () => {
  const [config, contact, footer, modals, schema] = await Promise.all([
    read('lib/siteConfig.js'),
    read('app/contacto/page.jsx'),
    read('components/Footer.jsx'),
    read('components/GlobalModals.jsx'),
    read('lib/schema.js'),
  ]);

  assert.match(config, /menos de 2 horas en horario laboral/);
  assert.doesNotMatch(modals, /menos de 24 horas/);
  for (const consumer of [contact, footer, modals, schema]) {
    assert.match(consumer, /SITE_CONTACT/);
  }
});

test('el footer usa cuatro secciones desplegables sin JavaScript en móvil', async () => {
  const [footer, css] = await Promise.all([
    read('components/Footer.jsx'),
    read('app/globals.css'),
  ]);

  assert.equal((footer.match(/<section className="footer-col footer-section">/g) || []).length, 4);
  assert.equal((footer.match(/className="footer-section-control"/g) || []).length, 4);
  assert.match(css, /\.footer-section-control:not\(:checked\) ~ \.footer-section-content \{ display: none; \}/);
  assert.match(css, /@media \(max-width: 640px\)/);
});

test('los estilos globales están separados por responsabilidad y conservan el orden', async () => {
  const [layout, core, services, institutional] = await Promise.all([
    read('app/layout.jsx'),
    read('app/globals.css'),
    read('app/globals.services.css'),
    read('app/globals.institutional.css'),
  ]);

  const imports = [
    "import './globals.css';",
    "import './globals.services.css';",
    "import './globals.institutional.css';",
    "import './globals.insights.css';",
  ];
  assert.deepEqual(imports.map((item) => layout.indexOf(item)), [...imports.map((item) => layout.indexOf(item))].sort((a, b) => a - b));
  assert.doesNotMatch(core, /\.sell-property-page/);
  assert.match(services, /\.sell-property-page/);
  assert.match(institutional, /\.faq-hub-sr-only/);
});
