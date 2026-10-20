export const CANONICAL_ORIGIN = 'https://www.rednorte.mx';
export const CANONICAL_HOST = 'www.rednorte.mx';

function firstForwardedValue(value) {
  return String(value || '').split(',')[0].trim().toLowerCase();
}

export function canonicalOriginRedirect({ host, protocol, pathname = '/', search = '' }) {
  const requestHost = firstForwardedValue(host).replace(/:\d+$/, '');
  const requestProtocol = firstForwardedValue(protocol).replace(/:$/, '');

  // Preview, development and third-party hosts must keep serving normally.
  // Only Rednorte's two public hosts participate in this normalization.
  if (requestHost !== 'rednorte.mx' && requestHost !== CANONICAL_HOST) return '';
  if (requestHost === CANONICAL_HOST && requestProtocol === 'https') return '';

  const safePath = String(pathname || '/').startsWith('/') ? pathname : `/${pathname}`;
  const safeSearch = search && String(search).startsWith('?') ? search : search ? `?${search}` : '';
  return `${CANONICAL_ORIGIN}${safePath}${safeSearch}`;
}
