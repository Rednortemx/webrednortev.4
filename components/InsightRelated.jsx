import Link from 'next/link';

export default function InsightRelated({ insights }) {
  if (!insights?.length) return null;

  return (
    <section className="insight-related">
      <p className="insight-small-label">SIGUE EXPLORANDO</p>
      <h2>Insights relacionados</h2>
      <nav className="insight-related-list" aria-label="Insights relacionados">
        {insights.map((item) => (
          <Link className="insight-related-item" href={`/insights/${item.slug}`} key={item.slug}>
            <span>
              <span className="insight-related-meta">
                <span>{item.category}</span>
                <span>{item.readTime}</span>
              </span>
              <strong>{item.title}</strong>
            </span>
            <span className="insight-related-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
