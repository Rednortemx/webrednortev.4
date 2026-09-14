// lib/advisor.js
// Shared server-side logic for looking up the real advisor assigned to a
// property, ported from the legacy api/asesor.js. It is called directly by
// the property-detail Server Component, so advisor data never needs a public
// proxy endpoint in this application.
import asesoresData from './asesores-data.json';
import { SITE_CONTACT } from './siteConfig';

function extractField(html, key) {
  const match = html.match(new RegExp('"' + key + '":"([^"]*)"'));
  return match ? match[1] : '';
}

// El campo agentLogoUrl no trae el sufijo de tamaño ("l" = large) que sí usa
// NOCNOK al renderizar la imagen en su propio sitio; sin él, S3 responde 403.
function toDisplayableImageUrl(url) {
  if (!url) return '';
  const dot = url.lastIndexOf('.');
  if (dot === -1) return url;
  return url.slice(0, dot) + 'l' + url.slice(dot);
}

function fromStaticTable(code) {
  const agent = asesoresData[code];
  if (!agent || !agent.name) return null;
  return {
    name: agent.name.trim(),
    phone: agent.phone || '',
    email: '',
    photo: '',
    company: 'Rednorte Inmobiliaria',
  };
}

export async function getAdvisorForProperty(rawCode) {
  const code = String(rawCode || '').trim().toUpperCase();
  if (!code) return null;

  try {
    const pageRes = await fetch(`https://admin3.nocnok.com/propiedad/${code.toLowerCase()}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(6_000),
    });
    if (pageRes.ok) {
      const html = (await pageRes.text()).replace(/\\"/g, '"');
      const name = extractField(html, 'agentName');
      if (name) {
        return {
          name,
          phone: extractField(html, 'agentPhoneNumber'),
          email: extractField(html, 'agentEmail'),
          photo: toDisplayableImageUrl(extractField(html, 'agentLogoUrl')),
          company: extractField(html, 'companyName') || 'Rednorte Inmobiliaria',
        };
      }
    }
  } catch {
    // sigue al respaldo estático
  }

  return fromStaticTable(code);
}

export function defaultAdvisor() {
  return { name: 'Rednorte Inmobiliaria', company: 'Equipo de asesores', phone: SITE_CONTACT.phoneDigits, photo: '' };
}
