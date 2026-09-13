'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buildPropertySlug } from '@/lib/slug';

// Ported from the legacy cardCarousel()/propCard() functions. The whole
// card is now a real <a href="/propiedades/{slug-descriptivo}-CODE"> (via
// next/link) instead of a div with an onclick handler, so every listing is
// a crawlable URL from /propiedades. The per-card image carousel controls
// are plain <span>s (not <button>s) so they can legally nest inside the
// <a>; they still stopPropagation + preventDefault so clicking them
// doesn't navigate.
export default function PropertyCard({ property }) {
  const [idx, setIdx] = useState(0);
  const p = property;
  const isRenta = p.op === 'Renta';
  const hasImgs = p.imgs && p.imgs.length > 0;

  const go = (e, dir) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => {
      const total = p.imgs.length;
      let next = i + dir;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      return next;
    });
  };

  return (
    <Link href={`/propiedades/${buildPropertySlug(p)}`} className="prop-card" style={{ overflow: 'hidden' }}>
      <div className="prop-img" style={{ padding: 0, height: 'auto', background: 'none', position: 'relative' }}>
        {!hasImgs ? (
          <div className="card-carousel">
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', color: 'var(--gris-medio)' }}>{p.icon}</div>
          </div>
        ) : (
          <div className="card-carousel" data-idx={idx} data-total={p.imgs.length}>
            <div className="card-carousel-track">
              <div className="card-carousel-slide">
                <Image
                  key={p.imgs[idx]}
                  src={p.imgs[idx]}
                  alt={p.title}
                  fill
                  sizes="(max-width: 720px) 88vw, (max-width: 1100px) 44vw, 320px"
                />
              </div>
            </div>
            {p.imgs.length > 1 && (
              <div className="card-carousel-dots">
                {p.imgs.map((_, i) => (
                  <div key={i} className={`card-dot${i === idx ? ' active' : ''}`} data-i={i}></div>
                ))}
              </div>
            )}
            {p.imgs.length > 1 && (
              <>
                <span className="card-carousel-btn prev" onClick={(e) => go(e, -1)} role="button" aria-label="Anterior">‹</span>
                <span className="card-carousel-btn next" onClick={(e) => go(e, 1)} role="button" aria-label="Siguiente">›</span>
              </>
            )}
          </div>
        )}
        <span className={`prop-badge${isRenta ? ' renta' : ''}`} style={{ position: 'absolute', top: '12px', left: '12px' }}>{p.op}</span>
        <span className="prop-code" style={{ position: 'absolute', bottom: '12px', right: '12px' }}>{p.id}</span>
      </div>
      <div className="prop-body">
        <div className="prop-price">{p.price}</div>
        <div className="prop-price-label">{isRenta ? 'Precio mensual' : 'Precio de venta'} · {p.type}</div>
        <div className="prop-title">{p.title}</div>
        <div className="prop-location"> {p.zone}</div>
        <div className="prop-features">
          {p.rooms > 0 ? (
            <>
              <div className="prop-feat"><span></span>{p.rooms} rec</div>
              <div className="prop-feat"><span></span>{p.baths} baños</div>
              <div className="prop-feat"><span></span>{p.parking} est</div>
            </>
          ) : (
            <div className="prop-feat"><span></span>{p.parking} cajones</div>
          )}
        </div>
      </div>
    </Link>
  );
}
