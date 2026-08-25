'use client';

import { useEffect, useRef, useState } from 'react';

const WIDGET_ID = '2febd0b79c3a9262701634a905e';

// Reseñas de Google servidas por Trustindex.
//
// Detalle importante de cómo funciona su loader: inserta el widget EN EL
// LUGAR donde está su propia etiqueta <script> (por eso el código que da
// Trustindex es solo el script, sin ningún div). Eso choca con Next.js y
// React 19, que sacan los <script src> del JSX y los cargan por su cuenta:
// el loader se ejecutaba y bajaba las reseñas, pero al no encontrar su
// etiqueta en el DOM no tenía dónde pintarlas y el hueco quedaba vacío.
//
// Por eso aquí el script se crea a mano y se cuelga dentro del contenedor
// de abajo: así el loader tiene un punto de anclaje real y pinta ahí.
//
// El contenedor siempre se renderiza; el encabezado y el espaciado solo
// aparecen cuando el widget trae contenido, para que la sección no quede
// como un título prometiendo reseñas que no llegan (que fue justo lo que
// pasó cuando el widget anterior se quedó sirviendo un archivo vacío).
export default function GoogleReviews() {
  const contenedorRef = useRef(null);
  const [tieneResenas, setTieneResenas] = useState(false);

  useEffect(() => {
    const cont = contenedorRef.current;
    if (!cont || cont.dataset.iniciado) return;
    cont.dataset.iniciado = '1';

    const yaPinto = () => !!cont.querySelector(':scope > *:not(script)');

    const observer = new MutationObserver(() => {
      if (yaPinto()) {
        setTieneResenas(true);
        observer.disconnect();
      }
    });
    observer.observe(cont, { childList: true, subtree: true });

    const script = document.createElement('script');
    script.src = `https://cdn.trustindex.io/loader.js?${WIDGET_ID}`;
    script.async = true;
    script.defer = true;
    cont.appendChild(script);

    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: 'var(--crema-dark)', padding: tieneResenas ? '4rem 0' : 0 }}>
      <div className="container">
        {tieneResenas && (
          <div className="section-header center">
            <p className="section-label">Lo que dicen de nosotros</p>
            <h2 className="section-title">Reseñas en Google</h2>
            <p className="section-sub">Opiniones de clientes que confiaron en Rednorte.</p>
          </div>
        )}
        <div ref={contenedorRef} />
      </div>
    </section>
  );
}
