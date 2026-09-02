import Link from 'next/link';
import FaqAccordion from './FaqAccordion';

// Sección de preguntas frecuentes del home. Sustituye a la antigua
// "Información útil / También puede interesarte", que solo eran dos tarjetas
// que mandaban a otras páginas; ahora el contenido está aquí mismo.
export default function FaqHome() {
  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header center">
          <p className="section-label">Preguntas frecuentes</p>
          <h2 className="section-title">Resolvemos tus dudas inmobiliarias</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Respuestas claras sobre compra, venta, renta, inversión y valor de propiedades en Monterrey.
          </p>
        </div>
        <FaqAccordion />
        <div style={{ textAlign: 'center' }}>
          <Link className="btn-faq-todas" href="/preguntas-frecuentes">
            Ver todas las preguntas frecuentes →
          </Link>
        </div>
      </div>
    </section>
  );
}
