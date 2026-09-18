import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InsightCard from '@/components/InsightCard';
import InsightFilters from '@/components/InsightFilters';
import PreferredSourceBadge from '@/components/PreferredSourceBadge';
import { getPublishedInsights, insightCategories } from '@/lib/insights';
import { serializeJsonLd } from '@/lib/security';

export const metadata = {
  title: 'Insights inmobiliarios de Monterrey y Nuevo León',
  description:
    'Análisis, guías, datos y perspectivas de Rednorte sobre compra, venta, renta, inversión y mercado inmobiliario en Monterrey y Nuevo León.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Insights inmobiliarios | Rednorte',
    description:
      'Guías, análisis y datos del mercado inmobiliario de Monterrey y Nuevo León.',
    url: '/insights',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.rednorte.mx/insights#webpage',
      url: 'https://www.rednorte.mx/insights',
      name: 'Insights inmobiliarios de Monterrey y Nuevo León',
      description: 'Análisis, guías y datos publicados por Rednorte Inmobiliaria.',
      about: { '@id': 'https://www.rednorte.mx/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://www.rednorte.mx/insights' },
      ],
    },
  ],
};

export default function InsightsPage() {
  const insights = getPublishedInsights();
  const featured = insights.find((item) => item.featured) || insights[0];
  const rest = insights.filter((item) => item.slug !== featured?.slug);

  return (
    <div className="insights-page">
      <Breadcrumb items={[{ label: 'Insights' }]} />

      <section className="insights-hero">
        <div className="insights-shell">
          <p className="insight-small-label">REDNORTE INSIGHTS</p>
          <h1>Insights inmobiliarios de Monterrey y Nuevo León</h1>
          <p>
            Análisis, guías, datos y perspectivas sobre compra, venta, renta, inversión y mercado
            inmobiliario.
          </p>
        </div>
      </section>

      {featured && (
        <section className="insights-featured">
          <div className="insights-shell">
            <p className="insight-small-label">DESTACADO</p>
            <InsightCard insight={featured} featured />
          </div>
        </section>
      )}

      <section className="insights-library">
        <div className="insights-shell">
          <div className="insights-section-heading">
            <p className="insight-small-label">BIBLIOTECA</p>
            <h2>Explora nuestros Insights</h2>
            <p>
              Filtra por tema y consulta contenido preparado para propietarios, compradores,
              inversionistas y profesionales del sector.
            </p>
          </div>
          <InsightFilters
            insights={rest.length ? rest : insights}
            categories={insightCategories}
          />
        </div>
      </section>

      <section className="insights-data-cta">
        <div className="insights-shell insights-data-cta-card">
          <div>
            <p className="insight-small-label">DATOS Y REPORTES</p>
            <h2>Consulta nuestros reportes propios de mercado</h2>
            <p>
              Además de guías y análisis, Rednorte publica información agregada basada en inventario,
              actividad observada y datos internos con metodología y fecha de corte.
            </p>
          </div>
          <Link href="/reportes">Ver reportes</Link>
        </div>
      </section>

      <section className="insights-preferred-source">
        <div className="insights-shell">
          <PreferredSourceBadge />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    </div>
  );
}
