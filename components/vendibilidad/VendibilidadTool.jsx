'use client';

import { useEffect, useRef } from 'react';
import './vendibilidad.css';
import { vendibilidadShellHtml } from './vendibilidadShell';
import { vendibilidadScriptSrc } from './vendibilidadScript';
import { buildVendibilidadScript, buildVendibilidadShell } from './vendibilidadIntegration';
import { bindToolConversions } from '@/lib/toolConversions';

const integratedShellHtml = buildVendibilidadShell(vendibilidadShellHtml);
const integratedScriptSrc = buildVendibilidadScript(vendibilidadScriptSrc);

export default function VendibilidadTool() {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const unbind = bindToolConversions(containerRef.current, 'vendibilidad');
    const script = document.createElement('script');
    script.textContent = integratedScriptSrc;
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

  return (
    <div
      ref={containerRef}
      data-vendibilidad-root
      dangerouslySetInnerHTML={{ __html: integratedShellHtml }}
    />
  );
}
