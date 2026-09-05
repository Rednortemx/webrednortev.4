import Breadcrumb from '@/components/Breadcrumb';
import VendibilidadTool from '@/components/vendibilidad/VendibilidadTool';

export const metadata = {
  title: 'Reporte de Vendibilidad',
  description: 'Responde 10 preguntas sencillas sobre cómo se ha comportado tu propiedad en el mercado y recibe en menos de 2 minutos un diagnóstico claro de qué está frenando la venta en Nuevo León.',
  alternates: { canonical: '/herramientas/reporte-de-vendibilidad' },
};

export default function ReporteDeVendibilidadPage() {
  return (
    <div className="page-content">
      <Breadcrumb items={[{ label: 'Herramientas', href: '/herramientas' }, { label: 'Reporte de vendibilidad' }]} />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.25rem 0' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--negro)', marginBottom: '0.5rem' }}>Reporte de Vendibilidad</h1>
        <p style={{ color: 'var(--gris-medio)', fontSize: '14px' }}>
          Diagnóstico gratuito y confidencial: responde 10 preguntas sencillas sobre contexto, presentación, respuesta del mercado y preparación para obtener tu índice de vendibilidad y el plan de corrección con mayor impacto para tu propiedad.
        </p>
      </div>
      <VendibilidadTool />
    </div>
  );
}
