'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buildPropertySlug } from '@/lib/slug';

// The image and information areas are crawlable links to the listing. The
// carousel controls are sibling buttons, so they remain valid HTML and are
// available to keyboard and assistive-technology users.
export default function PropertyCard({ property }) {
  const [idx, setIdx] = useState(0);
  const p = property;
  const isRenta = p.op === 'Renta';
  const hasImgs = p.imgs && p.imgs.length > 0;

  const go = (dir) => {
    setIdx((i) => {
      const total = p.imgs.length;
      let next = i + dir;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      return next;
    });
  };

  const href = `/propiedades/${buildPropertySlug(p)}`;

  return (
    <article className="prop-card" style={{ overflow: 'hidden' }}>
      <div className="prop-img" style={{ padding: 0, height: 'auto', background: 'none', position: 'relative' }}>
        <Link href={href} className="prop-card-image-link" aria-label={`Ver ${p.title}`}>
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
              <div className="card-carousel-dots" aria-hidden="true">
                {p.imgs.map((_, i) => (
                  <span key={i} className={`card-dot${i === idx ? ' active' : ''}`}></span>
                ))}
              </div>
            </div>
          )}
          <span className={`prop-badge${isRenta ? ' renta' : ''}`}>{p.op}</span>
          <span className="prop-code">{p.id}</span>
        </Link>
        {hasImgs && p.imgs.length > 1 && (
          <>
            <button className="card-carousel-btn prev" onClick={() => go(-1)} type="button" aria-label={`Foto anterior de ${p.title}`}>‹</button>
            <button className="card-carousel-btn next" onClick={() => go(1)} type="button" aria-label={`Foto siguiente de ${p.title}`}>›</button>
          </>
        )}
      </div>
      <Link href={href} className="prop-card-body-link">
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
    </article>
  );
}
