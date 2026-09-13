const DEFAULT_SITE_URL = 'https://www.rednorte.mx';

export function getCanonicalSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  try {
    return new URL(configured).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
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
