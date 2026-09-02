import Link from 'next/link';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import GoogleReviews from '@/components/GoogleReviews';
import FaqHome from '@/components/FaqHome';
import { faqSchema } from '@/lib/schema';
import { fetchAllProperties } from '@/lib/properties';

export const metadata = {
  title: 'Rednorte Inmobiliaria | Propiedades en Monterrey y su Área Metropolitana',
  description: 'Compra, vende, renta o valúa propiedades residenciales, comerciales e industriales con Rednorte Inmobiliaria en Monterrey y Nuevo León.',
  alternates: { canonical: '/' },
};

function propsFilterHref(operacion, tipo, categoria) {
  const params = new URLSearchParams();
  if (operacion) params.set('operacion', operacion);
  if (tipo) params.set('tipo', tipo);
  if (categoria) params.set('categoria', categoria);
  const qs = params.toString();
  return qs ? `/propiedades?${qs}` : '/propiedades';
}

export default async function HomePage() {
  const { properties } = await fetchAllProperties();
  const featured = properties.slice(0, 10);

  return (
    <div className="page-content">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge"> Especialistas inmobiliarios en Monterrey</div>
            <h1>Compra, vende, renta e invierte en Monterrey</h1>
            <p className="hero-highlight" style={{ color: '#f0a882', fontWeight: 600, marginTop: '0.25rem' }}>Residencial, comercial e industrial en Nuevo León.</p>
            <p>Rednorte Inmobiliaria combina asesoría, datos y marketing para ayudarte a tomar mejores decisiones inmobiliarias.</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">520+</div>
                <div className="hero-stat-label">Propiedades activas</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">35</div>
                <div className="hero-stat-label">Integrantes en el equipo</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">Desde 2018</div>
                <div className="hero-stat-label">Operando en Nuevo León</div>
              </div>
            </div>
          </div>
          <HeroSearch />
        </div>
      </section>

      {/* PROPIEDADES DESTACADAS */}
      <section>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Propiedades destacadas</h2>
            </div>
            <Link style={{ fontSize: '14px', fontWeight: 600, color: 'var(--terracota)', textDecoration: 'none' }} href="/propiedades">Ver todo el inventario →</Link>
          </div>
          <FeaturedCarousel properties={featured} />
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section style={{ background: 'var(--crema-dark)', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Nuestro inventario</p>
            <h2 className="section-title">¿Qué tipo de propiedad buscas?</h2>
          </div>
          <div className="cats-grid">
            <Link className="cat-card" href={propsFilterHref('', '', 'Residencial')}>
              <div className="cat-icon"></div>
              <div className="cat-title">Residencial</div>
              <div className="cat-desc">Casas y departamentos en las mejores zonas de Nuevo León</div>
              <div className="cat-count">Ver propiedades</div>
            </Link>
            <Link className="cat-card" href={propsFilterHref('', '', 'Comercial')}>
              <div className="cat-icon"></div>
              <div className="cat-title">Comercial</div>
              <div className="cat-desc">Locales, oficinas y espacios comerciales estratégicos</div>
              <div className="cat-count">Ver propiedades</div>
            </Link>
            <Link className="cat-card" href={propsFilterHref('', '', 'Industrial')}>
              <div className="cat-icon"></div>
              <div className="cat-title">Industrial</div>
              <div className="cat-desc">Bodegas, naves y parques industriales en Nuevo León</div>
              <div className="cat-count">Ver propiedades</div>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services-mini">
        <div className="container">
          <div className="section-header center">
            <p className="section-label" style={{ color: '#e07a4a' }}>Servicios inmobiliarios</p>
            <h2 className="section-title">¿Cómo podemos ayudarte?</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Soluciones para comprar, vender, rentar e invertir en bienes raíces en Monterrey y Nuevo León.</p>
          </div>
          {/* Seis tarjetas. Comercial e industrial todavía no tienen página
              propia: mientras llegan apuntan a una página real y relacionada,
              para no dejar el enlace en 404. */}
          <div className="services-grid">
            <div className="service-block">
              <div className="service-name">Vender una propiedad</div>
              <div className="service-desc">Analizamos el valor, la competencia y las condiciones del inmueble para definir una estrategia de posicionamiento, promoción y negociación hasta el cierre.</div>
              <Link className="service-link" href="/servicios/vender-propiedad">Quiero vender mi propiedad →</Link>
            </div>
            <div className="service-block">
              <div className="service-name">Rentar una propiedad</div>
              <div className="service-desc">Estimamos la renta, promovemos el inmueble, perfilamos e investigamos prospectos y coordinamos contrato, negociación y entrega.</div>
              <Link className="service-link" href="/servicios/rentar-propiedad">Quiero rentar mi propiedad →</Link>
            </div>
            <div className="service-block">
              <div className="service-name">Comprar una propiedad</div>
              <div className="service-desc">Buscamos en nuestro inventario y en la red inmobiliaria para comparar opciones, negociar condiciones y acompañarte hasta la entrega.</div>
              <Link className="service-link" href="/servicios/comprar-propiedad">Quiero comprar una propiedad →</Link>
            </div>
            <div className="service-block">
              <div className="service-name">Inversión inmobiliaria y preventas</div>
              <div className="service-desc">Primero entendemos qué quieres lograr con tu inversión y después analizamos alternativas según flujo, plusvalía, patrimonio, preventa u otras estrategias.</div>
              <Link className="service-link" href="/servicios/inversion-inmobiliaria">Quiero analizar una inversión →</Link>
            </div>
            <div className="service-block">
              <div className="service-name">Inmobiliaria comercial</div>
              <div className="service-desc">Asesoría para comprar, vender o rentar locales, oficinas, consultorios, edificios y otros espacios comerciales en Nuevo León.</div>
              <Link className="service-link" href="/servicios/comercial-industrial">Ver servicio comercial →</Link>
            </div>
            <div className="service-block">
              <div className="service-name">Inmobiliaria industrial</div>
              <div className="service-desc">Búsqueda y comercialización de naves, bodegas, terrenos, patios, parques industriales y proyectos build-to-suit.</div>
              <Link className="service-link" href="/servicios/comercial-industrial">Ver servicio industrial →</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link className="btn-ver-servicios" href="/servicios">Ver todos los servicios →</Link>
          </div>
        </div>
      </section>

      {/* NOSOTROS MINI */}
      <section className="nosotros-mini">
        <div className="container">
          <div className="nosotros-grid">
            <div className="nosotros-img">
              <Image src="/equipo.jpg" alt="Equipo Rednorte Inmobiliaria" width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="nosotros-text">
              <p className="section-label">Quiénes somos</p>
              <h2 className="section-title">Desde el 2018 conectando personas con propiedades</h2>
              <p style={{ fontSize: '14.5px', color: 'var(--cafe)', lineHeight: 1.7, marginBottom: '1rem' }}>En Rednorte Inmobiliaria somos un equipo de asesores profesionales con profundo conocimiento del mercado de Nuevo León. Trabajamos con integridad, transparencia y resultados.</p>
              <ul className="nosotros-list">
                <li>Especialistas en residencial, comercial e industrial</li>
                <li>Cobertura en los 12 municipios principales de NL</li>
                <li>Red de más de 500 propiedades en inventario activo</li>
                <li>Proceso ágil y acompañamiento hasta el cierre</li>
              </ul>
              <Link className="btn-primary" href="/nosotros" style={{ marginTop: '0.5rem', display: 'inline-block', textDecoration: 'none' }}>Conoce al equipo →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESENAS GOOGLE */}
      <GoogleReviews />

      {/* PREGUNTAS FRECUENTES */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <FaqHome />
    </div>
  );
}
