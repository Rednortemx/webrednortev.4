'use client';

import { Analytics } from '@vercel/analytics/next';
import usePrivacyConsent from './usePrivacyConsent';
import { beforeAnalyticsSend } from '@/lib/conversions';

export default function PrivacyAnalytics() {
  const { optional } = usePrivacyConsent();

  if (!optional) return null;

  return (
    <Analytics
      beforeSend={beforeAnalyticsSend}
    />
  );
}
