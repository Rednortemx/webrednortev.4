'use client';

import { useEffect, useState } from 'react';

// Mounts the site-wide modals once in the root layout. Any client component
// can open/close them via lib/modal.js's openModal(id)/closeModal(id), which
// dispatch a 'rn:modal' CustomEvent this component listens for — same idea as
// the legacy openModal()/closeModal() globals, without needing React context
// everywhere.
export default function GlobalModals() {
  const [open, setOpen] = useState({ successModal: false });

  useEffect(() => {
    const handler = (e) => {
      const { id, open: isOpen } = e.detail || {};
      if (!id) return;
      setOpen((prev) => ({ ...prev, [id]: isOpen }));
    };
    window.addEventListener('rn:modal', handler);
    return () => window.removeEventListener('rn:modal', handler);
  }, []);

  const close = (id) => setOpen((prev) => ({ ...prev, [id]: false }));

  const onOverlayClick = (id) => (e) => {
    if (e.target === e.currentTarget) close(id);
  };

  return (
    <>
      <div className={`modal-overlay${open.successModal ? ' open' : ''}`} id="successModal" onClick={onOverlayClick('successModal')}>
        <div className="modal-box">
          <div className="modal-icon"></div>
          <h3>¡Mensaje enviado!</h3>
          <p>Recibimos tu solicitud. Uno de nuestros asesores se comunicará contigo en menos de 24 horas.</p>
          <button className="btn-modal-close" onClick={() => close('successModal')} type="button">Aceptar</button>
        </div>
      </div>
    </>
  );
}
