export const PRIVACY_CONSENT_KEY = 'rn:privacy-consent';
export const LEGACY_COOKIE_KEY = 'rn:cookies';
export const PRIVACY_CONSENT_EVENT = 'rn:consent-changed';

export function readPrivacyConsent() {
  if (typeof window === 'undefined') return null;

  try {
    const saved = window.localStorage.getItem(PRIVACY_CONSENT_KEY);
    if (saved) {
      const consent = JSON.parse(saved);
      if (consent?.version === 1 && typeof consent.optional === 'boolean') {
        return consent;
      }
    }

    // Conserva la decisión tomada con el banner anterior.
    const legacy = window.localStorage.getItem(LEGACY_COOKIE_KEY);
    if (legacy === 'todas' || legacy === 'necesarias') {
      const migrated = {
        version: 1,
        optional: legacy === 'todas',
        updatedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(PRIVACY_CONSENT_KEY, JSON.stringify(migrated));
      window.localStorage.removeItem(LEGACY_COOKIE_KEY);
      return migrated;
    }
  } catch {
    return null;
  }

  return null;
}

export function savePrivacyConsent(optional) {
  const consent = {
    version: 1,
    optional: Boolean(optional),
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(PRIVACY_CONSENT_KEY, JSON.stringify(consent));
    window.localStorage.removeItem(LEGACY_COOKIE_KEY);
  } catch {
    // La elección sigue vigente durante esta página aunque el navegador
    // impida guardar almacenamiento local.
  }

  window.dispatchEvent(new CustomEvent(PRIVACY_CONSENT_EVENT, { detail: consent }));
  return consent;
}
