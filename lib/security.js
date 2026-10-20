import { CANONICAL_ORIGIN } from './canonical.js';

export function getCanonicalSiteUrl() {
  // Canonicals, sitemap and robots must never inherit a preview URL or an
  // accidentally changed environment variable. Rednorte has one public
  // canonical origin and it is intentionally immutable here.
  return CANONICAL_ORIGIN;
}

// JSON-LD is inserted inside a <script> element. Escaping HTML-significant
// characters prevents external content (for example, a CRM title containing
// </script>) from ending the element and injecting markup.
export function serializeJsonLd(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
