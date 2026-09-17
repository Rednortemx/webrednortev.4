import Link from 'next/link';
import { PROPERTY_LANDING_PAGES } from '@/lib/propertyLandingPages';

export default function PropertyLandingDirectory({ compact = false }) {
  return (
    <nav className={`property-landing-directory${compact ? ' compact' : ''}`} aria-label="Búsquedas populares de propiedades">
      <h2>{compact ? 'También puedes explorar' : 'Búsquedas populares'}</h2>
      {!compact && (
        <p>Encuentra inventario por tipo de propiedad, operación y municipio.</p>
      )}
      <div className="property-landing-links">
        {PROPERTY_LANDING_PAGES.map((landing) => (
          <Link key={landing.path} href={landing.path}>{landing.heading}</Link>
        ))}
      </div>
    </nav>
  );
}
