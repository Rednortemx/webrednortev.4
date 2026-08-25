'use client';

import { useEffect, useRef } from 'react';

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
// Ojo: Trustindex carga el widget de forma diferida, cuando el visitante
// interactúa con la página y la sección entra en pantalla. Que no aparezca
// de inmediato al abrir es su comportamiento normal, no una falla.
export default function TrustindexWidget() {
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

  return <div ref={contenedorRef} />;
}
