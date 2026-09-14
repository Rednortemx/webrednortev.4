import Link from 'next/link';

function SectionBlock({ section }) {
  return (
    <section id={section.id} className={section.type === 'lead' ? 'insight-lead-answer' : 'insight-content-section'}>
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

      {section.bullets?.length > 0 && (
        <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
      )}

      {section.subsections?.map((subsection) => (
        <div className="insight-subsection" key={subsection.title}>
          <h3>{subsection.title}</h3>
          {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      ))}

      {section.table?.rows?.length > 0 && (
        <div className="insight-table-wrap insight-section-table">
          <table>
            <thead>
              <tr>
                {section.table.headers.map((header) => <th key={header}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.stats?.length > 0 && (
        <div className={`insight-stat-grid ${section.stats.length === 1 ? 'is-single' : ''}`}>
          {section.stats.map((stat) => (
            <div className="insight-stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {section.quote && (
        <blockquote className="insight-quote">
          “{section.quote.text}”
          <cite>— {section.quote.author}</cite>
        </blockquote>
      )}

      {section.note && <p className="insight-note">{section.note}</p>}

      {section.callout && (
        <div className="insight-callout">
          <div>
            <strong>{section.callout.title}</strong>
            <p>{section.callout.text}</p>
          </div>
          <Link href={section.callout.href}>{section.callout.cta} →</Link>
        </div>
      )}
    </section>
  );
}

export default function InsightArticle({ insight }) {
  const labels = insight.summaryColumnLabels || ['Etapa', 'Qué se hace', 'Objetivo'];

  return (
    <>
      <section className="insight-direct-answer">
        <p className="insight-small-label">RESPUESTA DIRECTA</p>
        <p>{insight.directAnswer}</p>
      </section>

      {insight.processTable?.length > 0 && (
        <section className="insight-process-summary">
          <p className="insight-small-label">RESUMEN ESTRUCTURADO</p>
          <h2>{insight.summaryTitle || 'Resumen del proceso'}</h2>
          <div className="insight-table-wrap">
            <table>
              <thead>
                <tr>{labels.map((label) => <th key={label}>{label}</th>)}</tr>
              </thead>
              <tbody>
                {insight.processTable.map((row, index) => (
                  <tr key={`${row.stage}-${index}`}>
                    <td>{row.stage}</td>
                    <td>{row.action}</td>
                    <td>{row.objective}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="insight-key-points">
        <p className="insight-small-label">PUNTOS CLAVE</p>
        <h2>Lo más importante</h2>
        <ul>{insight.keyTakeaways.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <div className="insight-article-body">
        {insight.sections.map((section) => <SectionBlock section={section} key={section.id} />)}
      </div>

      {insight.faqs?.length > 0 && (
        <section className="insight-faqs">
          <p className="insight-small-label">PREGUNTAS FRECUENTES</p>
          <h2>{insight.faqTitle || 'Preguntas frecuentes'}</h2>
          <div>
            {insight.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {insight.methodology && (
        <section className="insight-methodology">
          <p className="insight-small-label">METODOLOGÍA EDITORIAL</p>
          <h2>Cómo se preparó esta guía</h2>
          <p>{insight.methodology}</p>
        </section>
      )}
    </>
  );
}
