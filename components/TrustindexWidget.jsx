'use client';

import { useEffect, useRef } from 'react';
import usePrivacyConsent from './usePrivacyConsent';

const WIDGET_ID = '2febd0b79c3a9262701634a905e';

// Solo el widget de reseñas de Trustindex, sin encabezado ni fondo, para
// poder colocarlo en cualquier página que ya traiga los suyos.
//
// Dos detalles de su loader que importan aquí:
//
// 1. Inserta el widget EN EL LUGAR donde está su propia etiqueta <script>
//    (por eso el código que entrega Trustindex es solo el script, sin div).
//    Next.js y React 19 sacan los <script src> escritos en JSX y los cargan
//    por su cuenta, así que el loader se quedaba sin punto de anclaje. Por
//    eso el script se crea a mano y se cuelga dentro del contenedor.
//
// 2. El widget que arma vive en el DOM pero React no lo conoce. Si el
//    componente se vuelve a renderizar, React reconcilia ese contenedor y se
//    lleva el widget por delante. Por eso no tiene estado.
//
// Ojo: el loader debe insertarse cuando su contenedor está cerca del viewport.
// Si se ejecuta al montar la página —algo que ocurre cuando el consentimiento
// ya existía de una visita anterior— Trustindex puede terminar antes de que su
// ancla esté lista y dejar un div vacío.
export default function TrustindexWidget({ variant = 'default' }) {
  const contenedorRef = useRef(null);
  const { optional, allowOptional } = usePrivacyConsent();

  useEffect(() => {
    if (!optional) return;
    const cont = contenedorRef.current;
    if (!cont || cont.dataset.iniciado) return;

    const cargar = () => {
      if (cont.dataset.iniciado) return;
      cont.dataset.iniciado = '1';

      const script = document.createElement('script');
      script.src = `https://cdn.trustindex.io/loader.js?${WIDGET_ID}`;
      script.async = true;
      cont.appendChild(script);
    };

    if (!('IntersectionObserver' in window)) {
      cargar();
      return;
    }

    const observador = new IntersectionObserver((entradas) => {
      if (!entradas.some((entrada) => entrada.isIntersecting)) return;
      observador.disconnect();
      cargar();
    }, { rootMargin: '320px 0px' });

    observador.observe(cont);
    return () => observador.disconnect();
  }, [optional]);

  if (!optional) {
    return (
      <div className={`external-content-placeholder external-content-placeholder--reviews${variant === 'home' ? ' home-review-consent' : ''}`} role="region" aria-label="Reseñas externas de Trustindex">
        <span className="review-consent-kicker">Opiniones verificadas</span>
        <strong>Consulta las experiencias de nuestros clientes</strong>
        <p>Para mostrar las reseñas aquí necesitamos tu permiso para cargar el servicio externo de Trustindex.</p>
        <div className="external-content-actions">
          <button type="button" onClick={allowOptional}>Permitir y cargar reseñas</button>
          <a href="https://www.google.com/search?q=Rednorte+Inmobiliaria+rese%C3%B1as" target="_blank" rel="noopener noreferrer">Ver en Google</a>
        </div>
      </div>
    );
  }

  return <div ref={contenedorRef} />;
}
