'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PreferredSourceBadge.module.css';

const PUBLISHER_SCRIPT = 'https://news.google.com/swg/js/v1/publisher.js';

export default function PreferredSourceBadge() {
  const clientRef = useRef(null);
  const queuedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const initialize = useCallback(() => {
    if (queuedRef.current || typeof window === 'undefined') return;

    window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || [];
    if (typeof window.PREFERRED_SOURCE.push !== 'function') return;

    queuedRef.current = true;
    window.PREFERRED_SOURCE.push((preferredSource) => {
      preferredSource.init({ theme: 'light', lang: 'es' });
      clientRef.current = preferredSource;
      setReady(true);
    });
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const addPreferredSource = () => {
    clientRef.current?.addPreferredSource();
  };

  return (
    <aside className={styles.card} aria-labelledby="preferred-source-title">
      <Script
        id="google-preferred-source"
        src={PUBLISHER_SCRIPT}
        strategy="afterInteractive"
        preferred-sources-control="manual"
        onReady={initialize}
      />
      <div className={styles.icon} aria-hidden="true">★</div>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>FUENTE PREFERIDA EN GOOGLE</p>
        <h2 id="preferred-source-title">Encuentra primero los análisis de Rednorte</h2>
        <p>
          Agrega Rednorte como fuente preferida para que nuestros Insights y reportes tengan más
          posibilidades de aparecerte en Noticias destacadas, AI Overviews y Modo IA.
        </p>
      </div>
      <button className={styles.button} type="button" onClick={addPreferredSource} disabled={!ready}>
        {ready ? 'Agregar como fuente preferida' : 'Preparando acceso a Google…'}
      </button>
    </aside>
  );
}
