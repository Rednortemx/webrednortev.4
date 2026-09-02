import Breadcrumb from '@/components/Breadcrumb';
import ValuacionTool from '@/components/valuacion/ValuacionTool';

export const metadata = {
  title: 'Estimación de valor de tu propiedad',
  description: 'Calcula gratis un rango de valor comercial para tu casa, departamento o terreno en Monterrey y Nuevo León, a partir de propiedades similares. Estimación orientativa, no sustituye un avalúo.',
  alternates: { canonical: '/herramientas/estimacion-de-valor' },
};

export default function EstimacionDeValorPage() {
  return (
    <div className="page-content">
      <Breadcrumb items={[{ label: 'Herramientas', href: '/herramientas' }, { label: 'Estimación de valor' }]} />
      {/* La herramienta trae su propio encabezado visual, así que aquí solo va
          el h1 real de la ruta: uno por página, como pide el análisis de SEO. */}
      <div className="estimador-intro">
        <h1>Estimación de valor de tu propiedad</h1>
      </div>
      <ValuacionTool />
    </div>
  );
}
