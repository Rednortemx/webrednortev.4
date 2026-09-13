'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  PRIVACY_CONSENT_EVENT,
  readPrivacyConsent,
  savePrivacyConsent,
} from '@/lib/privacyConsent';

export default function usePrivacyConsent() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    setConsent(readPrivacyConsent());

    const update = (event) => setConsent(event.detail || readPrivacyConsent());
    window.addEventListener(PRIVACY_CONSENT_EVENT, update);
    return () => window.removeEventListener(PRIVACY_CONSENT_EVENT, update);
  }, []);

  const allowOptional = useCallback(() => {
    setConsent(savePrivacyConsent(true));
  }, []);

  return {
    decided: consent !== null,
    optional: consent?.optional === true,
    allowOptional,
  };
}
