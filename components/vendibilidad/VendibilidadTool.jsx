'use client';

import { useEffect, useRef } from 'react';
import './vendibilidad.css';
import { vendibilidadShellHtml } from './vendibilidadShell';
import { vendibilidadScriptSrc } from './vendibilidadScript';
import { bindToolConversions } from '@/lib/toolConversions';

// Client Component wrapper for the "Reporte de Vendibilidad" diagnostic
// tool (light version). Same approach as ValuacionTool: ported HTML shell
// via dangerouslySetInnerHTML + the ported script injected as a real
// classic <script> so it keeps driving the DOM via plain ids/listeners.
export default function VendibilidadTool() {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const unbind = bindToolConversions(containerRef.current, 'vendibilidad');
    const script = document.createElement('script');
    script.textContent = vendibilidadScriptSrc;
    document.body.appendChild(script);
    scriptRef.current = script;

    return () => {
      unbind();
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: vendibilidadShellHtml }} />;
}
