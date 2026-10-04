import TrustindexWidget from './TrustindexWidget';

// Sección de reseñas del home: encabezado + fondo + el widget.
// La mecánica del widget vive en TrustindexWidget porque la página de
// /servicios/vender-propiedad lo reutiliza con su propio encabezado.
export default function GoogleReviews() {
  return (
    <section className="home-reviews" aria-labelledby="home-reviews-title">
      <div className="container">
        <div className="home-section-intro">
          <div>
            <p className="section-label">Lo que dicen de nosotros</p>
            <h2 className="section-title" id="home-reviews-title">Confianza construida operación por operación</h2>
          </div>
          {/* Trustindex reporta 139 reseñas con 5.0 de calificación y sincroniza
              las nuevas de Google solo, así que "más de 130" se mantiene cierto
              conforme entren más. */}
          <div className="home-review-summary" aria-label="Calificación de Rednorte en Google">
            <strong>5.0</strong>
            <span aria-hidden="true">★★★★★</span>
            <p>Más de 130 opiniones en Google</p>
          </div>
        </div>
        <TrustindexWidget variant="home" />
      </div>
    </section>
  );
}
