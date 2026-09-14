import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { serializeJsonLd } from '@/lib/security';

export const metadata = {
  title: 'Reportes inmobiliarios | Rednorte Inmobiliaria',
  description: 'Reportes propios sobre inventario, señales de interés y mercado inmobiliario de Monterrey y Nuevo León.',
  alternates: { canonical: '/reportes' },
  openGraph: {
    title: 'Reportes inmobiliarios | Rednorte Inmobiliaria',
    description: 'Datos propios, metodología visible y contexto público sobre el mercado inmobiliario de Monterrey y Nuevo León.',
    url: '/reportes',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.rednorte.mx/reportes#webpage',
      url: 'https://www.rednorte.mx/reportes',
      name: 'Reportes inmobiliarios de Monterrey y Nuevo León',
      description: 'Reportes agregados con metodología visible publicados por Rednorte Inmobiliaria.',
      about: { '@id': 'https://www.rednorte.mx/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
        { '@type': 'ListItem', position: 2, name: 'Reportes', item: 'https://www.rednorte.mx/reportes' },
      ],
    },
  ],
};

export default function ReportesPage() {
  return (
    <div className="report-hub">
      <Breadcrumb items={[{ label: 'Reportes' }]} />
      <section className="report-hub-hero">
        <div className="report-shell">
          <p className="report-eyebrow">REDNORTE DATA</p>
          <h1>Reportes inmobiliarios de Monterrey y Nuevo León</h1>
          <p>Datos propios, metodología visible y fuentes públicas para entender mejor el mercado local.</p>
        </div>
      </section>
      <section className="report-hub-list">
        <div className="report-shell">
          <Link className="report-hub-card" href="/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026">
            <span>PRIMERA EDICIÓN · V2 ANALÍTICA · CORTE 9 SEP 2026</span>
            <h2>Reporte inmobiliario Rednorte — Monterrey y Nuevo León 2026</h2>
            <p>Inventario, concentración de interés, municipios, tipos de propiedad, canales, colaboración y contexto externo.</p>
            <strong>Ver reporte →</strong>
          </Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    </div>
  );
}
