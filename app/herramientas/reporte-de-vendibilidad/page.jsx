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
      <VendibilidadTool />
    </div>
  );
}
