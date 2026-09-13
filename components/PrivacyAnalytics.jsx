'use client';

import { Analytics } from '@vercel/analytics/next';
import usePrivacyConsent from './usePrivacyConsent';

export default function PrivacyAnalytics() {
  const { optional } = usePrivacyConsent();

  if (!optional) return null;

  return (
    <Analytics
      beforeSend={(event) => {
        try {
          const url = new URL(event.url);
          url.search = '';
          url.hash = '';
          return { ...event, url: url.toString() };
        } catch {
          return event;
        }
      }}
    />
  );
}
