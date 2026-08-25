'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const WIDGET_ID = 'db141467684f733ab946e322bd8';

// Las reseñas las sirve Trustindex desde su CDN, no nosotros. Si esa cuenta
// se desconecta de Google, su loader responde con un widget vacío y la
// sección quedaba en pantalla como un encabezado prometiendo "más de 130
// opiniones" sin una sola reseña debajo.
//
// Aquí el contenedor del widget SIEMPRE se renderiza en el flujo normal
// (nunca display:none, para no impedir que Trustindex lo llene), pero el
// encabezado y el espaciado solo aparecen cuando el widget realmente trae
// contenido. Si Trustindex no responde, la sección ocupa cero y no se nota;
// cuando se reconecte, aparece sola sin tocar el código.
export default function GoogleReviews() {
  const widgetRef = useRef(null);
  const [tieneResenas, setTieneResenas] = useState(false);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el) return;

    const tieneContenido = () => el.childElementCount > 0;
    if (tieneContenido()) {
      setTieneResenas(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (tieneContenido()) {
        setTieneResenas(true);
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: 'var(--crema-dark)', padding: tieneResenas ? '4rem 0' : 0 }}>
      <div className="container">
        {tieneResenas && (
          <div className="section-header center">
            <p className="section-label">Lo que dicen de nosotros</p>
            <h2 className="section-title">Reseñas en Google</h2>
            <p className="section-sub">Con más de 130 opiniones de clientes que confiaron en Rednorte.</p>
          </div>
        )}
        <Script src={`https://cdn.trustindex.io/loader.js?${WIDGET_ID}`} strategy="afterInteractive" />
        <div className="trustindex-widget" data-widget-id={WIDGET_ID} ref={widgetRef}></div>
      </div>
    </section>
  );
}
