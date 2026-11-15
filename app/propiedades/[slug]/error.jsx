'use client';

import Link from 'next/link';

// An unavailable NocNok snapshot is not evidence that a property was removed.
// The detail route throws instead of returning a false 404, and this boundary
// gives the visitor a useful retry action while retaining an error HTTP status.
export default function PropertyLoadError({ reset }) {
  return (
    <main className="page-content">
      <section className="container" aria-live="polite" style={{ padding: '6rem 0' }}>
        <h1>No pudimos verificar la información de esta propiedad</h1>
        <p>El inventario está temporalmente no disponible. Preferimos no mostrar precios o características sin confirmar su vigencia en NocNok.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="btn-primary" type="button" onClick={() => reset()}>Reintentar</button>
          <Link className="btn-secondary" href="/propiedades">Volver al catálogo</Link>
        </div>
      </section>
    </main>
  );
}
