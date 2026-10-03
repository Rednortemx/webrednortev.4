import Image from 'next/image';
import Link from 'next/link';
import { buildPropertySlug } from '@/lib/slug';

function featureLine(property) {
  const parts = [];
  if (property.rooms > 0) parts.push(`${property.rooms} recámaras`);
  if (property.baths > 0) parts.push(`${property.baths} baños`);
  if (property.parking > 0) parts.push(`${property.parking} estacionamientos`);
  return parts.join(' · ');
}

export default function CuratedProperties({ properties }) {
  if (!properties || properties.length !== 3) return null;

  return (
    <div className="curated-property-grid">
      {properties.map((property, index) => {
        const href = `/propiedades/${buildPropertySlug(property)}`;
        return (
          <article className={`curated-property-card curated-property-card--${index + 1}`} key={property.id}>
            <Link className="curated-property-image" href={href} aria-label={`Ver ${property.title}`}>
              <Image
                src={property.imgs[0]}
                alt={property.title}
                fill
                sizes={index === 0 ? '(max-width: 900px) 100vw, 62vw' : '(max-width: 900px) 100vw, 38vw'}
              />
              <span className="curated-property-operation">{property.op}</span>
              <span className="curated-property-index">0{index + 1}</span>
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
  );
}
