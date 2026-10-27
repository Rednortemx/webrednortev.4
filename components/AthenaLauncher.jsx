'use client';

import { useCallback, useState } from 'react';

function openAthena() {
  if (window.Inmobot?.open) {
    window.Inmobot.open();
    return true;
  }

  document.addEventListener('inmobot:ready', () => {
    window.Inmobot?.open?.();
  }, { once: true });
  return false;
}

export default function AthenaLauncher({ variant = 'hero' }) {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    const opened = openAthena();
    if (!opened) {
      setLoading(true);
      window.setTimeout(() => setLoading(false), 4000);
    }
  }, []);

  if (variant === 'catalog') {
    return (
      <aside className="athena-catalog-prompt" aria-label="Búsqueda asistida con Athena">
        <div>
          <p className="athena-eyebrow">Athena · Búsqueda asistida</p>
          <h2>¿No encuentras lo que buscas?</h2>
          <p>Cuéntale a Athena la zona, presupuesto o tipo de propiedad que necesitas.</p>
        </div>
        <button className="athena-catalog-button" type="button" onClick={handleClick}>
          {loading ? 'Abriendo Athena…' : 'Buscar con Athena'}
          <span aria-hidden="true">↗</span>
        </button>
      </aside>
    );
  }

  return (
    <button className="athena-hero-button" type="button" onClick={handleClick}>
      <span className="athena-hero-button-label">Athena · búsqueda asistida</span>
      <span>{loading ? 'Abriendo Athena…' : 'Encontrar una propiedad conversando'}</span>
    </button>
  );
}
