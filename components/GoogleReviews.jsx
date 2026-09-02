import TrustindexWidget from './TrustindexWidget';

// Sección de reseñas del home: encabezado + fondo + el widget.
// La mecánica del widget vive en TrustindexWidget porque la página de
// /servicios/vender-propiedad lo reutiliza con su propio encabezado.
export default function GoogleReviews() {
  return (
    <section style={{ background: 'var(--crema-dark)', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header center">
          <p className="section-label">Lo que dicen de nosotros</p>
          <h2 className="section-title">Reseñas en Google</h2>
          {/* Trustindex reporta 139 reseñas con 5.0 de calificación y sincroniza
              las nuevas de Google solo, así que "más de 130" se mantiene cierto
              conforme entren más. */}
          <p className="section-sub">Con más de 130 opiniones de clientes que confiaron en Rednorte.</p>
        </div>
        <TrustindexWidget />
      </div>
    </section>
  );
}
