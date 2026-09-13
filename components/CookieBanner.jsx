'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readPrivacyConsent, savePrivacyConsent } from '@/lib/privacyConsent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const decidido = readPrivacyConsent();
    if (!decidido) setVisible(true);

    const abrir = () => setVisible(true);
    window.addEventListener('rn:abrir-cookies', abrir);
    return () => window.removeEventListener('rn:abrir-cookies', abrir);
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = '';
      return;
    }
    const banner = document.getElementById('cookieBanner');
    const adjust = () => {
      if (banner) document.body.style.paddingBottom = banner.offsetHeight + 'px';
    };
    adjust();
    window.addEventListener('resize', adjust);
    return () => window.removeEventListener('resize', adjust);
  }, [visible]);

  const decidir = (permitirOpcionales) => {
    savePrivacyConsent(permitirOpcionales);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" id="cookieBanner" role="dialog" aria-label="Preferencias de privacidad">
      <p>
        Usamos almacenamiento local necesario para recordar tu elección. Con tu permiso activamos
        analítica y contenido externo de Google Maps y Trustindex. Consulta nuestra{' '}
        <Link href="/politica-de-cookies">Política de Cookies y Tecnologías</Link>.
      </p>
      <div className="cookie-actions">
        <button className="btn-cookie-reject" onClick={() => decidir(false)} type="button">Solo necesarias</button>
        <button className="btn-cookie-accept" onClick={() => decidir(true)} type="button">Permitir opcionales</button>
      </div>
    </div>
  );
}
