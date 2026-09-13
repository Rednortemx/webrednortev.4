import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import FounderProfileSections from '@/components/FounderProfileSections';
import WhatsAppGateButton from '@/components/WhatsAppGateButton';
import {
  getTeamMember,
  teamMembers,
  getCertifiedCredential,
  getVerifiedCredentials,
} from '@/lib/teamMembers';

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};

  const isFounder = member.profileType === 'founder';

  return {
    title: isFounder
      ? `${member.name} | Fundador y Presidente de Rednorte Inmobiliaria`
      : `${member.name} | ${member.role} en Monterrey`,
    description: isFounder
      ? `${member.name}, fundador y Presidente de Rednorte Inmobiliaria. Trayectoria, visión sobre profesionalización inmobiliaria, inversión, negociación, tecnología y datos aplicados a bienes raíces en Monterrey.`
      : `${member.name}, ${member.role} en Rednorte Inmobiliaria. Conoce sus especialidades, zonas, idiomas, certificaciones y forma de trabajo.`,
    alternates: { canonical: `/equipo/${member.slug}` },
    openGraph: {
      title: `${member.name} | Rednorte Inmobiliaria`,
      description: member.headline,
      url: `/equipo/${member.slug}`,
      type: 'profile',
      images: [{ url: member.photo, alt: `Retrato profesional de ${member.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${member.name} | Rednorte Inmobiliaria`,
      description: member.headline,
      images: [member.photo],
    },
  };
}

// Every WhatsApp entry point on the site except the floating button
// (Header.jsx) must collect name + phone before opening WhatsApp — see
// components/WhatsAppGateButton.jsx. The uploaded template's WhatsAppLink()
// built a raw wa.me href with zero validation, so it's used here only to
// build the per-advisor message; the gate button handles opening WhatsApp.
function advisorWhatsAppMessage(member) {
  return `Vi el perfil de ${member.name} en rednorte.mx y me gustaría recibir asesoría inmobiliaria.`;
}

const serviceLinks = {
  comprar: ['/servicios/comprar-propiedad', 'Comprar una propiedad'],
  vender: ['/servicios/vender-propiedad', 'Vender una propiedad'],
  rentar: ['/servicios/rentar-propiedad', 'Rentar una propiedad'],
  inversion: ['/servicios/inversion-inmobiliaria', 'Inversión inmobiliaria'],
  comercial: ['/servicios/inmobiliaria-comercial', 'Inmobiliaria comercial'],
  industrial: ['/servicios/inmobiliaria-industrial', 'Inmobiliaria industrial'],
};

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const isFounder = member.profileType === 'founder';
  const credential = getCertifiedCredential(member);
  const verifiedCredentials = getVerifiedCredentials(member);
  const sameAs = [member.linkedin, member.instagram].filter(Boolean);

  const personSchema = {
    '@type': 'Person',
    '@id': `https://www.rednorte.mx/equipo/${member.slug}#person`,
    name: member.name,
    jobTitle: member.role,
    image: `https://www.rednorte.mx${member.photo}`,
    worksFor: { '@id': 'https://www.rednorte.mx/#organization' },
    sameAs: sameAs.length ? sameAs : undefined,
    knowsLanguage: member.languages,
    knowsAbout: [
      ...(member.operationsLabels || []),
      ...(member.propertyTypes || []),
      ...(member.expertise?.map((item) => item.title) || []),
    ],
    alumniOf: member.education?.map((name) => ({
      '@type': 'EducationalOrganization',
      name,
    })),
    hasCredential: verifiedCredentials.length
      ? verifiedCredentials.map((item) => ({
          '@type': 'EducationalOccupationalCredential',
          name: item.code ? `${item.code} — ${item.name}` : item.name,
          credentialCategory: 'Professional certification',
        }))
      : undefined,
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `https://www.rednorte.mx/equipo/${member.slug}#profile`,
        url: `https://www.rednorte.mx/equipo/${member.slug}`,
        name: `${member.name} | Rednorte Inmobiliaria`,
        dateModified: '2026-09-04',
        mainEntity: personSchema,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
          { '@type': 'ListItem', position: 2, name: 'Equipo', item: 'https://www.rednorte.mx/equipo' },
          { '@type': 'ListItem', position: 3, name: member.name, item: `https://www.rednorte.mx/equipo/${member.slug}` },
        ],
      },
    ],
  };

  return (
    <div className={`page-content advisor-page ${isFounder ? 'founder-page' : ''}`}>
      <Breadcrumb items={[{ label: 'Equipo', href: '/equipo' }, { label: member.name }]} />

      <section className="advisor-hero">
        <div className="advisor-shell advisor-hero-grid">
          <div className={`advisor-portrait team-tone-${member.portraitTone || 'terracota'}`}>
            <Image
              src={member.photo}
              alt={`Retrato profesional de ${member.name}, ${member.role} en Rednorte Inmobiliaria`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </div>

          <div className="advisor-hero-copy">
            <p className="section-label team-label-light">EQUIPO REDNORTE</p>
            <h1>{member.name}</h1>
            <p className="advisor-hero-role">{member.role} · Rednorte Inmobiliaria</p>
            <p className="advisor-headline">{member.headline}</p>

            {credential && (
              <div className="advisor-cert-highlight">
                <span>✓</span>
                <div>
                  <strong>
                    {credential.code ? `${credential.code} — ${credential.name}` : credential.name}
                  </strong>
                  <p>
                    {credential.status === 'licensed' && credential.licenseNumber
                      ? `Licencia ${credential.licenseNumber}`
                      : credential.verified
                        ? 'Certificación concluida y verificada por Rednorte'
                        : credential.note || 'Certificación concluida'}
                  </p>
                </div>
              </div>
            )}

            <div className="advisor-meta-grid">
              <div>
                <span>{isFounder ? 'Áreas de experiencia' : 'Especialidades'}</span>
                <strong>{member.operationsLabels?.slice(0, 4).join(' · ')}</strong>
              </div>
              <div>
                <span>Zonas</span>
                <strong>{member.zones?.slice(0, 3).join(' · ')}</strong>
              </div>
              <div>
                <span>Idiomas</span>
                <strong>{member.languages?.join(' · ')}</strong>
              </div>
            </div>

            <div className="advisor-actions">
              {isFounder ? (
                <>
                  <Link className="team-btn team-btn-primary" href={member.insightsHref || '/insights'}>
                    Leer Insights de Roque
                  </Link>
                  <Link className="team-btn team-btn-secondary" href="/contacto">
                    Hablar con Rednorte
                  </Link>
                </>
              ) : (
                <>
                  <WhatsAppGateButton
                    className="team-btn team-btn-primary"
                    phone={member.whatsapp || undefined}
                    message={advisorWhatsAppMessage(member)}
                    source={`Perfil de equipo: ${member.name}`}
                  >
                    Hablar con {member.name.split(' ')[0]}
                  </WhatsAppGateButton>
                  <Link className="team-btn team-btn-secondary" href={member.propertiesHref || '/propiedades'}>
                    Ver propiedades
                  </Link>
                </>
              )}
            </div>

            {member.linkedin && (
              <div className="advisor-social-links" aria-label={`Redes profesionales de ${member.name}`}>
                <a href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="advisor-about">
        <div className="advisor-shell advisor-two-col">
          <div>
            <p className="section-label">PERFIL</p>
            <h2>Conoce a {member.name}</h2>
          </div>
          <div className="advisor-rich-copy">
            {member.bio?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {isFounder && member.currentRole && (
              <div className="founder-current-role">
                <strong>Su función actualmente</strong>
                <p>{member.currentRole}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {isFounder ? (
        <FounderProfileSections member={member} />
      ) : (
        <>
          <section className="advisor-services">
            <div className="advisor-shell">
              <div className="advisor-section-heading">
                <p className="section-label">¿EN QUÉ PUEDE AYUDARTE?</p>
                <h2>Servicios relacionados con su especialidad</h2>
              </div>
              <div className="advisor-service-grid">
                {(member.operations || []).filter((op) => serviceLinks[op]).map((op) => (
                  <Link key={op} href={serviceLinks[op][0]} className="advisor-service-card">
                    <h3>{serviceLinks[op][1]}</h3>
                    <span>Conocer servicio →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="advisor-specialties">
            <div className="advisor-shell advisor-specialty-grid">
              <div className="advisor-specialty-card">
                <span>TIPOS DE PROPIEDAD</span>
                <ul>{member.propertyTypes?.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="advisor-specialty-card">
                <span>TIPOS DE CLIENTE</span>
                <ul>{member.clientTypes?.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="advisor-specialty-card">
                <span>ZONAS</span>
                <ul>{member.zones?.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </section>

          <section className="advisor-approach">
            <div className="advisor-shell advisor-two-col">
              <div>
                <p className="section-label">FORMA DE TRABAJO</p>
                <h2>Cómo trabaja {member.name.split(' ')[0]} contigo</h2>
              </div>
              <div>
                <p className="advisor-approach-lead">{member.approach}</p>
                <div className="advisor-process-mini">
                  <div><strong>01</strong><span>Entiende tu necesidad</span></div>
                  <div><strong>02</strong><span>Analiza información y alternativas</span></div>
                  <div><strong>03</strong><span>Define contigo el siguiente paso</span></div>
                  <div><strong>04</strong><span>Da seguimiento hasta concluir</span></div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {!isFounder && (
        <section className="advisor-rednorte-support">
        <div className="advisor-shell">
          <div className="advisor-section-heading advisor-section-heading-centered">
            <p className="section-label">RESPALDO REDNORTE</p>
            <h2>{isFounder ? 'Una empresa construida alrededor de preparación, procesos y tecnología' : 'Un profesional respaldado por procesos, capacitación y tecnología'}</h2>
            <p>
              {isFounder
                ? 'Roque dirige Rednorte con la idea de que una mejor asesoría inmobiliaria comienza con personas mejor preparadas y sistemas que les permitan trabajar con más información y responsabilidad.'
                : `${member.name} forma parte de Rednorte Inmobiliaria y trabaja con el respaldo de una estructura común para todos los integrantes del equipo.`}
            </p>
          </div>
          <div className="advisor-support-grid">
            {['Capacitación continua','CRM e inventario','Análisis de mercado','Herramientas Rednorte','Red de colaboración','Acompañamiento operativo'].map((item) => (
              <div className="advisor-support-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>
      )}

      {!isFounder && (member.certifications || []).length > 0 && (
        <section className="advisor-credentials">
          <div className="advisor-shell">
            <div className="advisor-section-heading">
              <p className="section-label">CERTIFICACIÓN Y PREPARACIÓN</p>
              <h2>Formación profesional</h2>
            </div>
            <div className="advisor-credential-grid">
              {member.certifications.map((item) => (
                <article key={`${item.code || ''}-${item.name}`} className="advisor-credential-card">
                  <span className={`advisor-credential-status is-${item.status}`}>
                    {item.status === 'licensed'
                      ? 'Licencia emitida'
                      : item.status === 'completed'
                        ? 'Certificación concluida'
                        : 'En proceso'}
                  </span>
                  <h3>{item.code ? `${item.code} — ${item.name}` : item.name}</h3>
                  {item.framework && <p>{item.framework}</p>}
                  {item.completedAt && <p>Concluido: {item.completedAt}</p>}
                  {!item.verified && item.note && <p className="advisor-credential-note">{item.note}</p>}
                  {item.licenseNumber && <strong>Licencia / folio: {item.licenseNumber}</strong>}
                </article>
              ))}
              {member.additionalTraining?.map((item) => (
                <article className="advisor-credential-card" key={item}>
                  <span className="advisor-credential-status is-completed">Formación complementaria</span>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {!isFounder && (member.reviews || []).length > 0 && (
        <section className="advisor-reviews">
          <div className="advisor-shell">
            <div className="advisor-section-heading">
              <p className="section-label">RESEÑAS VERIFICADAS</p>
              <h2>Lo que dicen clientes que han trabajado con {member.name.split(' ')[0]}</h2>
            </div>
            <div className="advisor-review-grid">
              {member.reviews.slice(0, 3).map((review) => (
                <article className="advisor-review-card" key={`${review.author}-${review.date}`}>
                  <div className="advisor-review-stars">★★★★★</div>
                  <blockquote>“{review.text}”</blockquote>
                  <p><strong>{review.author}</strong>{review.date ? ` · ${review.date}` : ''}</p>
                  {review.sourceUrl && <a href={review.sourceUrl} target="_blank" rel="noreferrer">Ver en Google →</a>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {!isFounder && (member.education?.length > 0 || member.previousExperience || member.startYear || member.affiliations?.length > 0) && (
        <section className="advisor-background">
          <div className="advisor-shell advisor-two-col">
            <div>
              <p className="section-label">FORMACIÓN Y EXPERIENCIA</p>
              <h2>Trayectoria profesional</h2>
            </div>
            <div className="advisor-background-list">
              {member.startYear && <p><strong>Bienes raíces desde:</strong> {member.startYear}</p>}
              {member.education?.length > 0 && <p><strong>Formación:</strong> {member.education.join(' · ')}</p>}
              {member.previousExperience && <p><strong>Experiencia previa:</strong> {member.previousExperience}</p>}
              {member.affiliations?.map((item) => <p key={item}><strong>Vinculación empresarial:</strong> {item}</p>)}
            </div>
          </div>
        </section>
      )}

      <section className="advisor-final">
        <div className="advisor-shell advisor-final-card">
          <div>
            <p className="section-label team-label-light">{isFounder ? 'REDNORTE' : 'CONTACTO'}</p>
            <h2>{isFounder ? '¿Necesitas orientación inmobiliaria?' : `¿Quieres hablar con ${member.name.split(' ')[0]}?`}</h2>
            <p>
              {isFounder
                ? 'Cuéntanos qué necesitas. Rednorte puede ayudarte a identificar el servicio o integrante del equipo adecuado para tu operación.'
                : 'Cuéntale qué necesitas y recibe orientación para comprar, vender, rentar o invertir en Nuevo León.'}
            </p>
          </div>
          <div className="advisor-actions">
            {isFounder ? (
              <>
                <Link className="team-btn team-btn-primary" href="/contacto">Hablar con Rednorte</Link>
                <Link className="team-btn team-btn-secondary" href="/equipo">Conocer al equipo</Link>
              </>
            ) : (
              <>
                <WhatsAppGateButton
                  className="team-btn team-btn-primary"
                  phone={member.whatsapp || undefined}
                  message={advisorWhatsAppMessage(member)}
                  source={`Perfil de equipo: ${member.name}`}
                >
                  WhatsApp
                </WhatsAppGateButton>
                <Link className="team-btn team-btn-secondary" href="/contacto">Enviar mensaje</Link>
              </>
            )}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
