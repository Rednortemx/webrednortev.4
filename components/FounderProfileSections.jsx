import Link from 'next/link';

function CertificationCard({ item }) {
  const status =
    item.status === 'licensed'
      ? 'Licencia emitida'
      : item.status === 'completed'
        ? 'Certificación concluida'
        : 'En proceso';

  return (
    <article className="founder-credential-card">
      <span className={`founder-credential-status is-${item.status}`}>{status}</span>
      <h3>{item.code ? `${item.code} — ${item.name}` : item.name}</h3>
      {item.framework && <p>{item.framework}</p>}
      {item.licenseNumber && <strong>Licencia / folio: {item.licenseNumber}</strong>}
    </article>
  );
}

export default function FounderProfileSections({ member }) {
  if (member.profileType !== 'founder') return null;

  return (
    <>
      <section className="founder-philosophy">
        <div className="advisor-shell">
          <div className="advisor-section-heading">
            <p className="section-label">FORMA DE ENTENDER LA ASESORÍA</p>
            <h2>Responsabilidad, preparación y criterio antes que improvisación</h2>
          </div>
          <div className="founder-card-grid founder-card-grid-three">
            {member.philosophy?.map((item) => (
              <article className="founder-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-expertise">
        <div className="advisor-shell">
          <div className="advisor-section-heading">
            <p className="section-label">ÁREAS DE EXPERIENCIA</p>
            <h2>Una trayectoria enfocada en estrategia y desarrollo inmobiliario</h2>
          </div>
          <div className="founder-card-grid founder-card-grid-four">
            {member.expertise?.map((item) => (
              <article className="founder-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-tech">
        <div className="advisor-shell founder-tech-grid">
          <div>
            <p className="section-label team-label-light">TECNOLOGÍA E INTELIGENCIA ARTIFICIAL</p>
            <h2>{member.technologyPosition?.title}</h2>
          </div>
          <div className="founder-tech-copy">
            {member.technologyPosition?.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {member.technologyPosition?.quote && (
              <blockquote>“{member.technologyPosition.quote}”</blockquote>
            )}
          </div>
        </div>
      </section>

      <section className="founder-timeline">
        <div className="advisor-shell">
          <div className="advisor-section-heading">
            <p className="section-label">TRAYECTORIA</p>
            <h2>De servicios financieros a construir Rednorte</h2>
          </div>
          <div className="founder-timeline-grid">
            {member.timeline?.map((item) => (
              <article className="founder-timeline-item" key={`${item.year}-${item.title}`}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-credentials-unified">
        <div className="advisor-shell">
          <div className="advisor-section-heading">
            <p className="section-label">FORMACIÓN, CERTIFICACIONES Y VINCULACIÓN</p>
            <h2>Preparación profesional y participación empresarial</h2>
          </div>

          <div className="founder-credential-unified-grid">
            <article className="founder-credential-panel">
              <span>FORMACIÓN ACADÉMICA</span>
              <ul>
                {member.education?.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <div className="founder-certification-stack">
              {member.certifications?.map((item) => (
                <CertificationCard item={item} key={`${item.code || ''}-${item.name}`} />
              ))}
            </div>

            <article className="founder-credential-panel">
              <span>FORMACIÓN COMPLEMENTARIA</span>
              <ul>
                {member.additionalTraining?.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            {(member.affiliations || []).length > 0 && (
              <article className="founder-credential-panel founder-canaco-panel">
                <span>VINCULACIÓN EMPRESARIAL</span>
                <h3>CANACO SERVYTUR Monterrey</h3>
                {member.affiliations.map((item) => <p key={item}>{item}</p>)}
              </article>
            )}
          </div>
        </div>
      </section>

      {member.advisorTraining && (
        <section className="founder-training">
          <div className="advisor-shell founder-training-grid">
            <div>
              <p className="section-label">FORMACIÓN DE ASESORES</p>
              <h2>Profesionalizar empieza por preparar</h2>
              <p>{member.advisorTraining.text}</p>
            </div>
            <div className="founder-topic-grid">
              {member.advisorTraining.topics?.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {(member.ventures || []).length > 0 && (
        <section className="founder-ventures">
          <div className="advisor-shell">
            <div className="advisor-section-heading">
              <p className="section-label">PROYECTOS EMPRESARIALES</p>
              <h2>Proyectos construidos alrededor de necesidades del sector</h2>
            </div>
            <div className="founder-venture-strip">
              {member.ventures.map((venture) => (
                <article className="founder-venture-item" key={venture.name}>
                  <strong>{venture.name}</strong>
                  <span>{venture.text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {member.companyImpact && (
        <section className="founder-impact">
          <div className="advisor-shell">
            <div className="advisor-section-heading advisor-section-heading-centered">
              <p className="section-label">REDNORTE EN CIFRAS</p>
              <h2>Resultados de la empresa que Roque fundó y dirige</h2>
              <p>Resultados institucionales de Rednorte; no producción personal.</p>
            </div>
            <div className="founder-impact-grid">
              {member.companyImpact.stats?.map((stat) => (
                <div className="founder-impact-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="founder-method-note">{member.companyImpact.note}</p>
            <div className="founder-impact-cta">
              <Link className="team-btn team-btn-primary" href="/nosotros">
                Conoce la historia y resultados de Rednorte
              </Link>
            </div>
          </div>
        </section>
      )}

      {(member.articles?.length > 0 || member.insightsHref) && (
        <section className="founder-insights">
          <div className="advisor-shell founder-insights-card">
            <div>
              <p className="section-label">INSIGHTS</p>
              <h2>Ideas y análisis de Roque Ávila</h2>
              <p>
                Opiniones sobre comercialización, inversión, profesionalización inmobiliaria,
                tecnología, datos y procesos.
              </p>
            </div>
            <Link className="team-btn team-btn-primary" href={member.insightsHref || '/insights'}>
              Ver Insights
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
