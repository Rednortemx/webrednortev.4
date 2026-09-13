// app/robots.js
// Generates /robots.txt. The noindex sections already carry
// robots: { index: false } in their own page metadata (which handles
// per-page <meta name="robots"> tags), so they don't need to be Disallow'd
// here too — Disallow would actually prevent Google from crawling the page
// at all to see the noindex tag. We just point at the sitemap.
import { getCanonicalSiteUrl } from '@/lib/security';

const SITE_URL = getCanonicalSiteUrl();

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
