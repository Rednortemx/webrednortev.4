'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { buildPropertySlug } from '@/lib/slug';

function featureLine(property) {
  const parts = [];
  if (property.rooms > 0) parts.push(`${property.rooms} recámaras`);
  if (property.baths > 0) parts.push(`${property.baths} baños`);
  if (property.parking > 0) parts.push(`${property.parking} estacionamientos`);
  return parts.join(' · ');
}

export default function CuratedProperties({ properties }) {
  const trackRef = useRef(null);

  if (!properties || properties.length < 3) return null;

  function move(direction) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: 'smooth' });
  }

  return (
    <div className="curated-carousel" role="region" aria-roledescription="carrusel" aria-label="Selección Rednorte">
      <div className="curated-carousel-controls">
        <p>{String(properties.length).padStart(2, '0')} propiedades seleccionadas</p>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Ver propiedad anterior">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Ver propiedad siguiente">→</button>
        </div>
      </div>
      <div className="curated-property-track" ref={trackRef} tabIndex="0">
        {properties.map((property, index) => {
          const href = `/propiedades/${buildPropertySlug(property)}`;
          return (
            <article className="curated-property-card" key={property.id}>
              <Link className="curated-property-image" href={href} aria-label={`Ver ${property.title}`}>
                <Image
                  src={property.imgs[0]}
                  alt={property.title}
                  fill
                  sizes="(max-width: 700px) 88vw, (max-width: 1100px) 72vw, 820px"
                />
                <span className="curated-property-operation">{property.op}</span>
                <span className="curated-property-index">
                  {String(index + 1).padStart(2, '0')} / {String(properties.length).padStart(2, '0')}
                </span>
              </Link>
              <div className="curated-property-copy">
                <div>
                  <p>{property.zone}</p>
                  <h3><Link href={href}>{property.title}</Link></h3>
                  {featureLine(property) && <span>{featureLine(property)}</span>}
                </div>
                <div className="curated-property-price">
                  <strong>{property.price}</strong>
                  <Link href={href} aria-label={`Ver detalles de ${property.title}`}>Ver propiedad ↗</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
