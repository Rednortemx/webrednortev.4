'use client';

import { useEffect, useRef } from 'react';

// Envoltura comun de las tres paginas de servicio nuevas (estimacion de
// valor, inmobiliaria comercial e inmobiliaria industrial).
//
// El contenido llega como HTML y se inserta con dangerouslySetInnerHTML, asi
// que queda en el HTML que sirve el servidor: Google lo lee completo y los
// enlaces internos se rastrean igual que si fueran JSX.
//
// Los estilos se inyectan en un <style> propio en lugar de en globals.css,
// para que solo pesen en su ruta y no en todo el sitio.
export default function ServicePage({ contenido, estilos, className }) {
  const styleRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = estilos;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, [estilos]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: contenido }} />;
}
