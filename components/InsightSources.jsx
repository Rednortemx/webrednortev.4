function sourceTypeLabel(type) {
  if (type === 'official') return 'Fuente oficial';
  if (type === 'market') return 'Referencia de mercado / portal';
  if (type === 'internal') return 'Dato / criterio interno';
  return '';
}

export default function InsightSources({ sources }) {
  if (!sources?.length) return null;

  return (
    <section className="insight-sources" aria-labelledby="insight-sources-title">
      <p className="insight-small-label">FUENTES Y METODOLOGÍA</p>
      <h2 id="insight-sources-title">Fuentes utilizadas</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.label}>
            {source.url ? (
              <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
            ) : (
              source.label
            )}
            {(source.type || source.accessedAt) && (
              <span>
                {[sourceTypeLabel(source.type), source.accessedAt ? `Consultado: ${source.accessedAt}` : '']
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
