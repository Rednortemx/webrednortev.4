'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { translations, inlineRules } from '@/lib/translations';

// ES/EN translator ported nearly as-is from the legacy index.html inline
// script. It walks the rendered DOM text nodes and swaps Spanish copy for
// English using the manual dictionary in lib/translations.js. Kept as a
// direct DOM approach (instead of rewriting every page with an i18n
// library) because this is a plumbing migration, not a redesign, and the
// toggle must keep working exactly as it did before across every route.
function translateNode(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);
  nodes.forEach((n) => {
    const parentTag = n.parentElement ? n.parentElement.tagName : '';
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE') return;
    const trimmed = n.nodeValue.trim();
    if (!trimmed) return;
    if (n._origText === undefined) n._origText = n.nodeValue;
    if (translations[trimmed]) {
      n.nodeValue = n.nodeValue.replace(trimmed, translations[trimmed]);
      return;
    }
    for (const rule of inlineRules) {
      const match = trimmed.match(rule.re);
      if (match) {
        n.nodeValue = n.nodeValue.replace(trimmed, rule.en(match));
        return;
      }
    }
  });

  // Placeholders live in an attribute, not a text node, so the walker above
  // never sees them — translate them separately using the same dictionary.
  root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((el) => {
    const trimmed = el.placeholder.trim();
    if (!trimmed) return;
    if (el.dataset.origPlaceholder === undefined) el.dataset.origPlaceholder = el.placeholder;
    if (translations[trimmed]) el.placeholder = translations[trimmed];
  });
}

function revertNode(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  let node;
  while ((node = walker.nextNode())) {
    if (node._origText !== undefined) node.nodeValue = node._origText;
  }
  root.querySelectorAll('input[data-orig-placeholder], textarea[data-orig-placeholder]').forEach((el) => {
    el.placeholder = el.dataset.origPlaceholder;
  });
}

export default function LanguageToggle() {
  const langRef = useRef('es');
  const btnRef = useRef(null);
  const pathname = usePathname();

  const applySiteLang = () => {
    if (langRef.current === 'en') translateNode(document.body);
    else revertNode(document.body);
  };

  // Re-apply translation after client-side navigations if EN is active,
  // since each route swaps in fresh Spanish text nodes.
  useEffect(() => {
    if (langRef.current === 'en') {
      // Wait a tick for the new route's DOM to be committed.
      const id = requestAnimationFrame(() => translateNode(document.body));
      return () => cancelAnimationFrame(id);
    }
  }, [pathname]);

  const toggleTranslate = () => {
    langRef.current = langRef.current === 'es' ? 'en' : 'es';
    applySiteLang();
    if (btnRef.current) btnRef.current.classList.toggle('active', langRef.current === 'en');
  };

  return (
    <button
      ref={btnRef}
      className="translate-float"
      onClick={toggleTranslate}
      title="Translate to English"
      id="translateFloatBtn"
      type="button"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </button>
  );
}
