'use client';

import { useEffect } from 'react';

const WIDGET_SELECTOR = '[data-inmobot="rednorte"]';
const OVERRIDE_ID = 'rednorte-athena-layout';

// Athena lives in an open Shadow DOM so its UI cannot leak styles into the
// site. This small host-side adapter only reserves room for the existing
// WhatsApp action; it does not alter Athena's behavior or conversation UI.
const ATHENA_LAYOUT_CSS = `
  .burbuja { bottom: 92px; }
  .panel { bottom: 164px; max-height: calc(100vh - 202px); }
  @media (max-width: 640px) {
    .burbuja { right: 12px; bottom: 76px; }
    .panel { right: 12px; bottom: 148px; max-width: calc(100vw - 24px); max-height: calc(100vh - 180px); }
  }
`;

function applyAthenaLayout() {
  const host = document.querySelector(WIDGET_SELECTOR);
  const shadowRoot = host?.shadowRoot;

  if (!shadowRoot) return false;
  if (shadowRoot.getElementById(OVERRIDE_ID)) return true;

  const styles = document.createElement('style');
  styles.id = OVERRIDE_ID;
  styles.textContent = ATHENA_LAYOUT_CSS;
  shadowRoot.append(styles);
  return true;
}

export default function AthenaWidgetLayout() {
  useEffect(() => {
    if (applyAthenaLayout()) return undefined;

    const observer = new MutationObserver(() => {
      if (applyAthenaLayout()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
