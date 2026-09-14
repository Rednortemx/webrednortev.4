import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import WhatsAppGateButton from '@/components/WhatsAppGateButton';
import ExternalContentGate from '@/components/ExternalContentGate';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { SITE_CONTACT } from '@/lib/siteConfig';

export const metadata = {
  title: 'Contacto',
  description: `Contáctanos: cuéntanos en qué podemos ayudarte. ${SITE_CONTACT.response.summary}`,
  alternates: { canonical: '/contacto' },
};

export default function ContactoPage() {
  return (
    <div className="page-content">
      <Breadcrumb items={[{ label: 'Contacto' }]} />
      <div className="contacto-page">
        <div className="section-header">
          <p className="section-label">Estamos para ayudarte</p>
          <h1 className="section-title">Contáctanos</h1>
          <p className="section-sub">Cuéntanos en qué podemos ayudarte. {SITE_CONTACT.response.summary}</p>
        </div>
        <div className="contacto-grid">
          <ContactForm />
          <div className="contacto-info">
            <div className="info-card">
              <h4>Información de contacto</h4>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">Teléfono</span><a href={SITE_CONTACT.phoneHref}>{SITE_CONTACT.phoneDisplay}</a></div></div>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">WhatsApp</span><WhatsAppGateButton style={{ color: 'var(--terracota)' }} source="Página de contacto">{SITE_CONTACT.phoneInternationalDisplay}</WhatsAppGateButton></div></div>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">Dirección</span>{SITE_CONTACT.address.full}</div></div>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">Horario</span>{SITE_CONTACT.hours.weekdays} h<br />{SITE_CONTACT.hours.saturday} h</div></div>
            </div>
            <div className="info-card">
              <h4>Ubicación</h4>
              <div className="map-embed-frame">
                <ExternalContentGate
                  provider="Google Maps"
                  description="El mapa se cargará únicamente si permites los servicios opcionales."
                  externalHref="https://maps.google.com/?q=Av.+Vasconcelos+215+San+Pedro+Garza+Garcia"
                  externalLabel="Abrir en Google Maps"
                >
                  <iframe src="https://maps.google.com/maps?q=Av.+Jos%C3%A9+Vasconcelos+Ote.+215+San+Pedro+Garza+Garcia&output=embed" title="Ubicación Rednorte Inmobiliaria" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </ExternalContentGate>
              </div>
              <a className="btn-como-llegar" href="https://maps.google.com/?q=Av.+Vasconcelos+215+San+Pedro+Garza+Garcia" target="_blank" rel="noopener noreferrer"> Cómo llegar</a>
            </div>
            <div className="info-card">
              <h4>Redes sociales</h4>
              <div className="redes-row">
                {SOCIAL_LINKS.map((network) => (
                  <a
                    className="red-btn"
                    href={network.href}
                    key={network.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar Rednorte en ${network.label}`}
                  >
                    {network.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
