"use client";

import { useMemo, useState } from 'react';
import InsightCard from '@/components/InsightCard';

export default function InsightFilters({ insights, categories }) {
  const [active, setActive] = useState('Todos');

  const visible = useMemo(() => {
    if (active === 'Todos') return insights;
    return insights.filter(
      (item) => item.category === active || item.secondaryCategories?.includes(active)
    );
  }, [active, insights]);

  return (
    <>
      <div className="insight-filter-bar" aria-label="Filtrar Insights por categoría">
        {['Todos', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            className={active === category ? 'is-active' : ''}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="insight-grid">
        {visible.length ? (
          visible.map((insight) => <InsightCard insight={insight} key={insight.slug} />)
        ) : (
          <div className="insight-empty">
            <strong>Estamos preparando nuevos Insights en esta categoría.</strong>
            <p>Mientras tanto puedes consultar los análisis ya publicados.</p>
          </div>
        )}
      </div>
    </>
  );
}
