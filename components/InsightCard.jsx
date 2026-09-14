import Link from 'next/link';

export default function InsightCard({ insight, featured = false }) {
  return (
    <article className={`insight-card ${featured ? 'is-featured' : ''}`}>
      <div className="insight-card-meta">
        <span>{insight.category}</span>
        <span>{insight.readTime}</span>
      </div>
      <h2><Link href={`/insights/${insight.slug}`}>{insight.title}</Link></h2>
      <p>{insight.excerpt}</p>
      <div className="insight-card-footer">
        <time dateTime={insight.publishedAt}>
          {new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(
            new Date(`${insight.publishedAt}T12:00:00`)
          )}
        </time>
        <Link href={`/insights/${insight.slug}`}>Leer Insight →</Link>
      </div>
    </article>
  );
}
