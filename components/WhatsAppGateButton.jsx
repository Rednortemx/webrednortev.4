'use client';

import { openModal } from '@/lib/modal';

const DEFAULT_PHONE = '528117783953';

// Drop-in replacement for a plain <a href="https://wa.me/..."> WhatsApp
// link. Instead of opening WhatsApp directly, it opens the shared
// whatsappGateModal (GlobalModals.jsx) so the visitor leaves their name and
// phone first — that data is logged to the leads sheet before WhatsApp
// opens. Renders as a <button> (not <a>) so a middle-click/right-click
// "open in new tab" can't skip the gate.
//
// The site-wide floating WhatsApp button (Header.jsx's .wa-float) is
// intentionally excluded from this gate and keeps linking straight to
// WhatsApp.
export default function WhatsAppGateButton({ phone = DEFAULT_PHONE, source, message, children, className, style, title }) {
  const handleClick = () => {
    openModal('whatsappGateModal', { phone, source, message });
  };

  return (
    <button type="button" className={`wa-gate-btn${className ? ` ${className}` : ''}`} style={style} title={title} onClick={handleClick}>
      {children}
    </button>
  );
}
