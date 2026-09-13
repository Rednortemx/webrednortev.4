'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { closeModal } from '@/lib/modal';

const DEFAULT_PHONE = '528117783953';

// Mounts the site-wide modals once in the root layout. Any client component
// can open/close them via lib/modal.js's openModal(id, data)/closeModal(id),
// which dispatch a 'rn:modal' CustomEvent this component listens for — same
// idea as the legacy openModal()/closeModal() globals, without needing React
// context everywhere.
export default function GlobalModals() {
  const [open, setOpen] = useState({ successModal: false, whatsappGateModal: false });
  const [gateData, setGateData] = useState({});
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const successButtonRef = useRef(null);
  const gateInputRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const { id, open: isOpen, data } = e.detail || {};
      if (!id) return;
      setOpen((prev) => ({ ...prev, [id]: isOpen }));
      if (id === 'whatsappGateModal') {
        if (isOpen) setGateData(data || {});
        else {
          setNombre('');
          setTelefono('');
          setError('');
        }
      }
    };
    window.addEventListener('rn:modal', handler);
    return () => window.removeEventListener('rn:modal', handler);
  }, []);

  useEffect(() => {
    const activeId = open.whatsappGateModal
      ? 'whatsappGateModal'
      : open.successModal
        ? 'successModal'
        : null;
    if (!activeId) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const frame = requestAnimationFrame(() => {
      if (activeId === 'whatsappGateModal') gateInputRef.current?.focus();
      else successButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal(activeId);
        return;
      }
      if (event.key !== 'Tab') return;

      const modal = document.getElementById(activeId);
      const focusable = modal
        ? [...modal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])')]
        : [];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open.successModal, open.whatsappGateModal]);

  const close = (id) => closeModal(id);

  const onOverlayClick = (id) => (e) => {
    if (e.target === e.currentTarget) close(id);
  };

  const continuarWhatsApp = () => {
    if (!nombre.trim() || !telefono.trim()) {
      setError('Por favor completa tu nombre y teléfono para continuar.');
      return;
    }

    const phone = gateData.phone || DEFAULT_PHONE;
    const contexto = gateData.message ? `${gateData.message}\n\n` : '';
    const texto = `${contexto}Hola, soy ${nombre.trim()}. Mi teléfono es ${telefono.trim()}.`;

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'Contacto por WhatsApp',
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        email: '',
        detalle: gateData.source || '',
        notas: gateData.message || '',
      }),
    }).catch(() => {});

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
    close('whatsappGateModal');
  };

  return (
    <>
      <div className={`modal-overlay${open.successModal ? ' open' : ''}`} id="successModal" onClick={onOverlayClick('successModal')} aria-hidden={!open.successModal}>
        <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="success-modal-title" aria-describedby="success-modal-description">
          <div className="modal-icon"></div>
          <h3 id="success-modal-title">¡Mensaje enviado!</h3>
          <p id="success-modal-description">Recibimos tu solicitud. Uno de nuestros asesores se comunicará contigo en menos de 24 horas.</p>
          <button ref={successButtonRef} className="btn-modal-close" onClick={() => close('successModal')} type="button">Aceptar</button>
        </div>
      </div>

      <div className={`modal-overlay${open.whatsappGateModal ? ' open' : ''}`} id="whatsappGateModal" onClick={onOverlayClick('whatsappGateModal')} aria-hidden={!open.whatsappGateModal}>
        <div className="modal-box" style={{ textAlign: 'left', position: 'relative' }} role="dialog" aria-modal="true" aria-labelledby="whatsapp-modal-title" aria-describedby="whatsapp-modal-description">
          <button className="modal-close-x" type="button" onClick={() => close('whatsappGateModal')} aria-label="Cerrar">×</button>
          <h3 id="whatsapp-modal-title" style={{ textAlign: 'center' }}>Antes de continuar a WhatsApp</h3>
          <p id="whatsapp-modal-description" style={{ textAlign: 'center' }}>Déjanos tu nombre y teléfono para que el asesor sepa quién escribe.</p>
          <div className="form-group">
            <label htmlFor="whatsapp-nombre">Nombre completo *</label>
            <input ref={gateInputRef} id="whatsapp-nombre" type="text" autoComplete="name" required placeholder="Tu nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp-telefono">Teléfono *</label>
            <input id="whatsapp-telefono" type="tel" autoComplete="tel" inputMode="tel" required placeholder="+52 (81)" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>
          {error && <p style={{ color: '#9e342d', fontSize: '13px', marginBottom: '1rem' }}>{error}</p>}
          <p style={{ fontSize: '11px', color: 'var(--gris-medio)', marginBottom: '1rem' }}>
            Al continuar aceptas nuestro <Link href="/aviso-de-privacidad" style={{ color: 'var(--terracota)' }}>Aviso de Privacidad</Link>.
          </p>
          <button className="btn-primary-full" type="button" onClick={continuarWhatsApp}>Continuar a WhatsApp</button>
        </div>
      </div>
    </>
  );
}
