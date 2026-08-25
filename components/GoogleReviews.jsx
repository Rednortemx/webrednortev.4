'use client';

import { useEffect, useRef } from 'react';

const WIDGET_ID = '2febd0b79c3a9262701634a905e';

// Reseñas de Google servidas por Trustindex.
//
// Dos detalles de su loader que importan aquí:
//
// 1. Inserta el widget EN EL LUGAR donde está su propia etiqueta <script>
//    (por eso el código que entrega Trustindex es solo el script, sin div).
//    Next.js y React 19 sacan los <script src> escritos en JSX y los cargan
//    por su cuenta, así que el loader se quedaba sin punto de anclaje. Por
//    eso el script se crea a mano y se cuelga dentro del contenedor.
//
// 2. El widget que arma vive en el DOM pero React no lo conoce. Si este
//    componente se vuelve a renderizar, React reconcilia ese contenedor y
//    se lleva el widget por delante — pasó tal cual con una versión previa
//    que cambiaba de estado al detectar las reseñas: el widget aparecía y
//    se quedaba en un div vacío. Por eso el componente no tiene estado y no
//    se vuelve a renderizar nunca después de montarse.
export default function GoogleReviews() {
  const contenedorRef = useRef(null);

  useEffect(() => {
    const cont = contenedorRef.current;
    if (!cont || cont.dataset.iniciado) return;
    cont.dataset.iniciado = '1';

    const script = document.createElement('script');
    script.src = `https://cdn.trustindex.io/loader.js?${WIDGET_ID}`;
    script.async = true;
    cont.appendChild(script);
  }, []);

  return (
    <section style={{ background: 'var(--crema-dark)', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header center">
          <p className="section-label">Lo que dicen de nosotros</p>
          <h2 className="section-title">Reseñas en Google</h2>
          <p className="section-sub">Opiniones de clientes que confiaron en Rednorte.</p>
        </div>
        <div ref={contenedorRef} />
      </div>
    </section>
  );
}
