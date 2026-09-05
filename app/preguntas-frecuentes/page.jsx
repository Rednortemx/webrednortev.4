import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FaqExplorer from '@/components/FaqExplorer';
import WhatsAppGateButton from '@/components/WhatsAppGateButton';
import {
  FAQ_CATEGORIES,
  FAQ_LAST_UPDATED,
  REDNORTE_FAQS,
} from '@/lib/rednorteFaqs';

export const metadata = {
  title: 'Preguntas frecuentes sobre bienes raíces en Monterrey',
  description:
    'Respuestas de Rednorte sobre compra, venta, renta, inversión, valuación, inmuebles comerciales e industriales, clientes extranjeros y Master Broker en Nuevo León.',
  alternates: {
    canonical: '/preguntas-frecuentes',
  },
  openGraph: {
    title: 'Preguntas frecuentes inmobiliarias | Rednorte',
    description:
      'Consulta respuestas claras sobre compra, venta, renta, inversión y propiedades en Monterrey y Nuevo León.',
    url: '/preguntas-frecuentes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas frecuentes inmobiliarias | Rednorte',
    description:
      'Respuestas sobre bienes raíces, servicios inmobiliarios y operaciones en Monterrey y Nuevo León.',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.rednorte.mx/preguntas-frecuentes#webpage',
      url: 'https://www.rednorte.mx/preguntas-frecuentes',
      name: 'Preguntas frecuentes sobre bienes raíces en Monterrey',
      description:
        'Centro de respuestas de Rednorte Inmobiliaria sobre compra, venta, renta, inversión, estimación de valor y servicios especializados.',
      isPartOf: {
        '@id': 'https://www.rednorte.mx/#website',
      },
      about: {
        '@type': 'RealEstateAgent',
        name: 'Rednorte Inmobiliaria',
        url: 'https://www.rednorte.mx/',
      },
      dateModified: '2026-08-30',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.rednorte.mx/preguntas-frecuentes#faq',
      url: 'https://www.rednorte.mx/preguntas-frecuentes',
      mainEntity: REDNORTE_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://www.rednorte.mx/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Preguntas frecuentes',
          item: 'https://www.rednorte.mx/preguntas-frecuentes',
        },
      ],
    },
  ],
};

export default function PreguntasFrecuentesPage() {
  return (
    <div className="page-content faq-hub-page">
      <Breadcrumb items={[{ label: 'Preguntas frecuentes' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="faq-hub-hero">
        <div className="faq-hub-shell faq-hub-hero-grid">
          <div>
            <p className="section-label faq-hub-label-light">CENTRO DE RESPUESTAS</p>
            <h1>Preguntas frecuentes sobre bienes raíces en Monterrey</h1>
            <p className="faq-hub-hero-lead">
              Respuestas claras sobre vender, rentar, comprar, invertir y conocer el valor de
              una propiedad en Monterrey y Nuevo León.
            </p>
            <p className="faq-hub-hero-support">
              Busca una pregunta o explora por tema. Cuando una respuesta depende del inmueble,
              contrato o perfil del cliente, nuestro equipo puede revisar el caso contigo.
            </p>
            <div className="faq-hub-actions">
              <a className="faq-hub-btn faq-hub-btn-primary" href="#explorar-preguntas">
                Buscar una respuesta
              </a>
              <Link className="faq-hub-btn faq-hub-btn-secondary" href="/servicios">
                Ver servicios
              </Link>
            </div>
          </div>

          <aside className="faq-hub-hero-panel" aria-label="Resumen del centro de respuestas">
            <span>INFORMACIÓN ORGANIZADA</span>
            <div className="faq-hub-stat-grid">
              <div>
                <strong>{REDNORTE_FAQS.length}</strong>
                <small>preguntas respondidas</small>
              </div>
              <div>
                <strong>{FAQ_CATEGORIES.length}</strong>
                <small>temas inmobiliarios</small>
              </div>
            </div>
            <ul>
              <li>Respuestas conectadas con cada servicio de Rednorte.</li>
              <li>Información general, sin sustituir revisiones profesionales específicas.</li>
              <li>Contenido preparado para ampliarse conforme cambien servicios y procesos.</li>
            </ul>
            <time dateTime="2026-08-30">Última actualización: {FAQ_LAST_UPDATED}</time>
          </aside>
        </div>
      </section>

      <FaqExplorer categories={FAQ_CATEGORIES} faqs={REDNORTE_FAQS} />

      <section className="faq-hub-scope">
        <div className="faq-hub-shell faq-hub-scope-card">
          <div>
            <p className="section-label">ALCANCE DE LAS RESPUESTAS</p>
            <h2>La operación concreta puede requerir una revisión personalizada</h2>
          </div>
          <p>
            Las respuestas de esta página son informativas y describen procesos generales de
            Rednorte. Los requisitos, honorarios, documentos, tiempos, coberturas y condiciones
            definitivas dependen del inmueble, las partes y los acuerdos por escrito. La
            información no sustituye asesoría jurídica, fiscal, financiera, técnica, valuatoria o
            notarial cuando ésta resulte necesaria.
          </p>
        </div>
      </section>

      <section className="faq-hub-final-cta">
        <div className="faq-hub-shell faq-hub-final-card">
          <p className="section-label faq-hub-label-light">ATENCIÓN PERSONALIZADA</p>
          <h2>¿No encontraste la respuesta que necesitabas?</h2>
          <p>
            Cuéntanos brevemente qué quieres hacer y un integrante de Rednorte te ayudará a
            identificar el servicio o siguiente paso adecuado.
          </p>
          <div className="faq-hub-actions faq-hub-actions-centered">
            <Link className="faq-hub-btn faq-hub-btn-primary" href="/contacto">
              Hablar con Rednorte
            </Link>
            <WhatsAppGateButton className="faq-hub-btn faq-hub-btn-secondary" source="Preguntas frecuentes">
              WhatsApp
            </WhatsAppGateButton>
          </div>
        </div>
      </section>
    </div>
  );
}
