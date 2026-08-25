'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FAQS } from '@/lib/faq';

// Acordeón de preguntas frecuentes.
//
// Las cinco respuestas se renderizan SIEMPRE en el HTML aunque estén
// contraídas: se ocultan con CSS, no quitándolas del DOM. Es a propósito —
// así Google y los motores de respuesta leen el texto completo aunque el
// visitante solo vea una abierta.
//
// Solo una respuesta puede estar abierta a la vez, y la primera arranca
// abierta.
export default function FaqAccordion({ abiertaPorDefecto = 0 }) {
  const [abierta, setAbierta] = useState(abiertaPorDefecto);

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => {
        const estaAbierta = abierta === i;
        return (
          <div className={`faq-item${estaAbierta ? ' open' : ''}`} key={item.pregunta}>
            <h3 className="faq-question-wrap">
              <button
                type="button"
                className="faq-question"
                aria-expanded={estaAbierta}
                aria-controls={`faq-panel-${i}`}
                id={`faq-boton-${i}`}
                onClick={() => setAbierta(estaAbierta ? -1 : i)}
              >
                <span className="faq-num">{i + 1}</span>
                <span className="faq-text">{item.pregunta}</span>
                <span className="faq-toggle" aria-hidden="true">{estaAbierta ? '−' : '+'}</span>
              </button>
            </h3>
            <div className="faq-panel" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-boton-${i}`}>
              <div className="faq-panel-inner">
                <p>{item.respuesta}</p>
                {item.enlace && (
                  <Link className="faq-link" href={item.enlace.href}>
                    {item.enlace.texto} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
