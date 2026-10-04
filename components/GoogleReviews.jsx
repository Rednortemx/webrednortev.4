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
          {/* Trustindex carga las reseñas debajo. Este resumen refleja el perfil
              público de Google al 3 de octubre de 2026. */}
          <div className="home-review-summary" aria-label="Calificación de Rednorte en Google: 4.6 de 5, basada en 148 opiniones">
            <strong>4.6</strong>
            <span className="home-review-stars" aria-hidden="true">★★★★★</span>
            <p>148 opiniones en Google</p>
          </div>
        </div>
        <TrustindexWidget variant="home" />
      </div>
    </section>
  );
}
