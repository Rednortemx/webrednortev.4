'use client';

import { useEffect, useRef } from 'react';
import { estimadorShellHtml } from './estimadorShell';
import { estimadorStyles } from './estimadorStyles';
import { estimadorScriptSrc } from './estimadorScript';
import { bindToolConversions } from '@/lib/toolConversions';

// Monta el Estimador de Valor.
//
// La herramienta se escribio como una pagina HTML independiente, con su
// propio CSS y su propio JS que trabaja con document.getElementById(). En vez
// de reescribirla en React, se inyecta tal cual: el HTML por
// dangerouslySetInnerHTML (asi queda en el HTML del servidor) y el script
// como <script> clasico, para que su logica corra igual que en el original.
//
// El CSS va en un <style> propio en lugar de en globals.css para que solo
// pese en esta ruta. Va scopeado bajo .ov-val (ver estimadorStyles.js).
export default function ValuacionTool() {
  const styleRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const unbind = bindToolConversions(document.querySelector('.ov-val'), 'estimador');
    const style = document.createElement('style');
    style.textContent = estimadorStyles;
    document.head.appendChild(style);
    styleRef.current = style;

    // El script debe correr DESPUES de que el HTML ya esta en el DOM, porque
    // busca sus elementos por id apenas arranca.
    const script = document.createElement('script');
    script.textContent = estimadorScriptSrc;
    document.body.appendChild(script);
    scriptRef.current = script;

    return () => {
      unbind();
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: estimadorShellHtml }} />;
}
