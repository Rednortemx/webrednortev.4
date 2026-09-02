'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CLAVE = 'rn:cookies';

// Banner de cookies.
//
// Antes se mostraba en TODAS las cargas de página: el botón solo lo ocultaba
// hasta el siguiente refresco, sin guardar nada. Ahora la decisión se guarda
// en localStorage, que es lo que además le da sentido al enlace
// "Preferencias de cookies" del footer: ese enlace dispara el evento
// 'rn:abrir-cookies' para volver a mostrarlo y poder cambiar la elección.
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let decidido = null;
    try {
      decidido = window.localStorage.getItem(CLAVE);
    } catch {
      // navegador con almacenamiento bloqueado: se muestra el banner igual
    }
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

  const decidir = (valor) => {
    try {
      window.localStorage.setItem(CLAVE, valor);
    } catch {
      // sin almacenamiento no se puede recordar; se cierra igual
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" id="cookieBanner">
      <p>
        Usamos cookies para mejorar tu experiencia. Al continuar navegando aceptas nuestra{' '}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>
      <div className="cookie-actions">
        <button className="btn-cookie-reject" onClick={() => decidir('necesarias')} type="button">Solo necesarias</button>
        <button className="btn-cookie-accept" onClick={() => decidir('todas')} type="button">Aceptar todas</button>
      </div>
    </div>
  );
}
