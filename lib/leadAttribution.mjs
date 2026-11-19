// Attribution for campaign-linked same-origin lead submissions.
// Never persist visitor identifiers, arbitrary query strings, or external referrers.
const CAMPAIGN_FIELDS = [
  ['utm_source', 'fuente'],
  ['utm_medium', 'medio'],
  ['utm_campaign', 'campana'],
  ['utm_content', 'creativo'],
  ['utm_term', 'termino'],
];

function safeCampaignToken(value) {
  if (!value || typeof value !== 'string') return '';
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .slice(0, 80);
}

export function campaignReferrerLabel(referrer, expectedHost) {
  if (!referrer || !expectedHost) return null;

  let page;
  try {
    page = new URL(referrer);
  } catch {
    return null;
  }

  // A website on another host must never supply arbitrary source metadata.
  if (!['https:', 'http:'].includes(page.protocol)
      || page.host.toLowerCase() !== expectedHost.toLowerCase()
      || page.username || page.password) {
    return null;
  }

  const tags = CAMPAIGN_FIELDS.map(([key, label]) => {
    const value = safeCampaignToken(page.searchParams.get(key));
    return value ? `${label}=${value}` : null;
  }).filter(Boolean);

  if (tags.length === 0) return null;

  const pathname = page.pathname.replace(/[^a-zA-Z0-9/._-]/g, '').slice(0, 120) || '/';
  return `[Rednorte Impulsa] ${tags.join('; ')}; pagina=${pathname}`;
}
