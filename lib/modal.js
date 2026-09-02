// Tiny global modal bus, ported from the legacy site's window-level
// openModal(id)/closeModal(id) helpers (index.html previously had
// `document.getElementById(id).classList.add('open')`). Kept as simple
// CustomEvents instead of React context so any client component (contact
// form, bolsa form, etc.) can trigger a modal that actually lives once in
// the root layout, without prop drilling.

export function openModal(id, data) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('rn:modal', { detail: { id, open: true, data } }));
}

export function closeModal(id) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('rn:modal', { detail: { id, open: false } }));
}
