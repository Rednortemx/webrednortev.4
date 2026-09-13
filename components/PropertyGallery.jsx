'use client';

import { useState } from 'react';

// Ported from the legacy renderFichaGallery()/fichaNav()/fichaGoto().
export default function PropertyGallery({ imgs, icon, title }) {
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState(false);

  if (!imgs || imgs.length === 0) {
    return (
      <>
        <div className="gallery" id="ficha-gallery">
          <div className="gallery-placeholder">{icon}</div>
        </div>
        <div className="gallery-thumbs" id="ficha-thumbs"></div>
      </>
    );
  }

  const goto = (i) => {
    setIdx(i);
    setBroken(false);
  };
  const nav = (dir) => {
    const total = imgs.length;
    goto((idx + dir + total) % total);
  };
  const shown = imgs.slice(0, 8);

  return (
    <>
      <div className="gallery" id="ficha-gallery">
        {!broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            id="ficha-main-img"
            className="gallery-main-img"
            src={imgs[idx]}
            alt="Foto propiedad"
            onError={() => setBroken(true)}
          />
        ) : (
          <div id="ficha-fallback" className="gallery-placeholder" style={{ display: 'flex', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        )}
        {imgs.length > 1 && (
          <>
            <button className="gallery-nav prev" onClick={() => nav(-1)} type="button" aria-label="Anterior">‹</button>
            <button className="gallery-nav next" onClick={() => nav(1)} type="button" aria-label="Siguiente">›</button>
            <span className="gallery-counter" id="ficha-counter">{idx + 1} / {imgs.length}</span>
          </>
        )}
      </div>
      <div className="gallery-thumbs" id="ficha-thumbs">
        {shown.map((src, i) => (
          <button
            key={i}
            className={`gallery-thumb${i === idx ? ' active' : ''}`}
            onClick={() => goto(i)}
            id={`thumb-${i}`}
            type="button"
            aria-label={`Mostrar foto ${i + 1} de ${title}`}
            aria-current={i === idx ? 'true' : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Foto ${i + 1}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.hidden = true;
                e.currentTarget.parentElement?.classList.add('is-broken');
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}
