import Breadcrumb from '@/components/Breadcrumb';
import FaqAccordion from '@/components/FaqAccordion';
import { faqSchema } from '@/lib/schema';

// Antes esta ruta existía pero estaba vacía ("Estamos preparando esta
// sección") y por eso iba en noindex. Ahora que el home manda aquí con un
// botón, se llena con las mismas preguntas del acordeón del home y pasa a
// ser indexable.
export const metadata = {
  title: 'Preguntas frecuentes sobre compra, venta y renta de propiedades',
  description:
    'Respuestas claras sobre comisiones, valor de una propiedad, documentación para vender, renta e inversión inmobiliaria en Monterrey y Nuevo León.',
  alternates: { canonical: '/preguntas-frecuentes' },
};

export default function PreguntasFrecuentesPage() {
  return (
    <div className="page-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <Breadcrumb items={[{ label: 'Preguntas frecuentes' }]} />
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div className="section-header center">
          <p className="section-label">Resolvemos tus dudas</p>
          <h1 className="section-title">Preguntas frecuentes</h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Respuestas claras sobre compra, venta, renta, inversión y valor de propiedades en Monterrey.
          </p>
        </div>
        <FaqAccordion />
        <div style={{ background: 'linear-gradient(135deg,var(--vino),var(--vino-dark))', borderRadius: '14px', padding: '2.5rem', textAlign: 'center', marginTop: '3rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>¿No encontraste tu respuesta?</h2>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '14px', marginBottom: '1.25rem' }}>Escríbenos directamente y con gusto te ayudamos.</p>
          <a className="btn-white" href="https://wa.me/528117783953" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>Preguntar por WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
