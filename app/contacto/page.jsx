import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import WhatsAppGateButton from '@/components/WhatsAppGateButton';

export const metadata = {
  title: 'Contacto',
  description: 'Contáctanos: cuéntanos en qué podemos ayudarte y un asesor de Rednorte Inmobiliaria te responderá en menos de 2 horas en horario de oficina.',
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
          <p className="section-sub">Cuéntanos en qué podemos ayudarte. Respondemos en menos de 2 horas en horario de oficina.</p>
        </div>
        <div className="contacto-grid">
          <ContactForm />
          <div className="contacto-info">
            <div className="info-card">
              <h4>Información de contacto</h4>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">Teléfono</span>(811) 778-3953</div></div>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">WhatsApp</span><WhatsAppGateButton style={{ color: 'var(--terracota)' }} source="Página de contacto">+52 (811) 778-3953</WhatsAppGateButton></div></div>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">Dirección</span>Av. José Vasconcelos Ote. 215-7, Residencial San Agustín 1er Sector, San Pedro Garza García, N.L. 66260</div></div>
              <div className="info-item"><div className="info-icon"></div><div className="info-text"><span className="info-label">Horario</span>Lun–Vie: 9:00 – 18:00 h<br />Sáb: 10:00 – 14:00 h</div></div>
            </div>
            <div className="info-card">
              <h4>Ubicación</h4>
              <div className="map-embed-frame">
                <iframe src="https://maps.google.com/maps?q=Av.+Jos%C3%A9+Vasconcelos+Ote.+215+San+Pedro+Garza+Garcia&output=embed" title="Ubicación Rednorte Inmobiliaria" loading="lazy" allowFullScreen></iframe>
              </div>
              <a className="btn-como-llegar" href="https://maps.google.com/?q=Av.+Vasconcelos+215+San+Pedro+Garza+Garcia" target="_blank" rel="noopener noreferrer"> Cómo llegar</a>
            </div>
            <div className="info-card">
              <h4>Redes sociales</h4>
              <div className="redes-row">
                <a className="red-btn" href="https://www.facebook.com/rednorteinmobiliaria/" target="_blank" rel="noopener noreferrer" style={{ borderColor: '#3b5998', color: '#3b5998', background: '#f0f4ff', textDecoration: 'none' }}>Facebook</a>
                <a className="red-btn" href="https://www.instagram.com/rednortemx/" target="_blank" rel="noopener noreferrer" style={{ borderColor: '#e1306c', color: '#e1306c', background: '#fff0f5', textDecoration: 'none' }}>Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
