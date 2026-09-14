import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import InsightArticle from '@/components/InsightArticle';
import InsightAuthor from '@/components/InsightAuthor';
import InsightSources from '@/components/InsightSources';
import InsightRelated from '@/components/InsightRelated';
import { getAuthor, getInsight, getPublishedInsights, getRelatedInsights } from '@/lib/insights';
import { serializeJsonLd } from '@/lib/security';

export function generateStaticParams() {
  return getPublishedInsights().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  return {
    title: insight.seoTitle || insight.title,
    description: insight.description,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      title: insight.title,
      description: insight.description,
      url: `/insights/${insight.slug}`,
      type: 'article',
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
      ...(insight.image ? { images: [{ url: insight.image, alt: insight.title }] } : {}),
    },
    twitter: {
      card: insight.image ? 'summary_large_image' : 'summary',
      title: insight.title,
      description: insight.description,
      ...(insight.image ? { images: [insight.image] } : {}),
    },
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}

export default async function InsightPage({ params }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const author = getAuthor(insight.author);
  const related = getRelatedInsights(insight);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://www.rednorte.mx/insights/${insight.slug}#article`,
        headline: insight.title,
        description: insight.description,
        inLanguage: 'es-MX',
        datePublished: insight.publishedAt,
        dateModified: insight.updatedAt,
        articleSection: insight.category,
        keywords: [insight.category, ...(insight.secondaryCategories || [])],
        mainEntityOfPage: { '@id': `https://www.rednorte.mx/insights/${insight.slug}#webpage` },
        author: {
          '@type': 'Person',
          '@id': `https://www.rednorte.mx/equipo/${author.slug}#person`,
          name: author.name,
          url: `https://www.rednorte.mx${author.profileHref}`,
        },
        publisher: { '@id': 'https://www.rednorte.mx/#organization' },
        about: (insight.schemaAbout || [insight.category]).map((name) => ({
          '@type': 'Thing',
          name,
        })),
        spatialCoverage: insight.spatialCoverage
          ? { '@type': 'Place', name: insight.spatialCoverage }
          : undefined,
        ...(insight.image ? { image: `https://www.rednorte.mx${insight.image}` } : {}),
      },
      {
        '@type': 'WebPage',
        '@id': `https://www.rednorte.mx/insights/${insight.slug}#webpage`,
        url: `https://www.rednorte.mx/insights/${insight.slug}`,
        name: insight.title,
        inLanguage: 'es-MX',
        isPartOf: { '@id': 'https://www.rednorte.mx/#website' },
        about: { '@id': `https://www.rednorte.mx/insights/${insight.slug}#article` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://www.rednorte.mx/insights' },
          { '@type': 'ListItem', position: 3, name: insight.title, item: `https://www.rednorte.mx/insights/${insight.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: insight.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="insight-detail-page">
      <Breadcrumb items={[{ label: 'Insights', href: '/insights' }, { label: insight.title }]} />

      <article>
        <header className="insight-article-header">
          <div className="insights-shell insight-article-header-inner">
            <div className="insight-article-meta-top">
              <span>{insight.category}</span>
              <span>{insight.readTime}</span>
            </div>
            <h1>{insight.title}</h1>
            <p className="insight-article-deck">{insight.description}</p>

            <div className="insight-byline">
              <div>
                <strong>Por {author.name}</strong>
                <span>{author.role}</span>
              </div>
              <div>
                <span>Publicado: {formatDate(insight.publishedAt)}</span>
                <span>Última actualización: {formatDate(insight.updatedAt)}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="insights-shell insight-main-grid">
          <div className="insight-main-column">
            <InsightArticle insight={insight} />
            <InsightSources sources={insight.sources} />
            <InsightAuthor author={author} />
            <InsightRelated insights={related} />
          </div>

          <aside className="insight-sticky-aside">
            <div>
              <p className="insight-small-label">EN ESTA GUÍA</p>
              <nav>
                {insight.sections.map((section) => (
                  <a href={`#${section.id}`} key={section.id}>{section.title}</a>
                ))}
              </nav>
            </div>
          </aside>
        </main>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    </div>
  );
}
