import InsightCard from '@/components/InsightCard';

export default function InsightRelated({ insights }) {
  if (!insights?.length) return null;

  return (
    <section className="insight-related">
      <p className="insight-small-label">SIGUE EXPLORANDO</p>
      <h2>Insights relacionados</h2>
      <div className="insight-grid">
        {insights.map((item) => <InsightCard insight={item} key={item.slug} />)}
      </div>
    </section>
  );
}
