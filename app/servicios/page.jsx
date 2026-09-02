import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Servicios inmobiliarios en Monterrey y Nuevo León',
  description: 'Venta, renta, asesoría para inversionistas y propiedades comerciales e industriales con Rednorte Inmobiliaria en Monterrey y Nuevo León.',
  alternates: { canonical: '/servicios' },
};

const servicios = [
  {
    name: 'Venta de propiedades',
    desc: 'Comercializamos tu propiedad con una estrategia de marketing digital multicanal, valuación profesional y acceso a nuestra amplia red de compradores calificados. Nos encargamos desde la publicación hasta el cierre notarial.',
    href: '/servicios/vender-propiedad',
    cta: 'Ver detalles →',
  },
  {
    name: 'Compra de propiedades',
    desc: 'Te ayudamos a encontrar, comparar, negociar y coordinar la compra de casas, departamentos, terrenos y otros inmuebles en Nuevo León, sin comisión para el comprador.',
    href: '/servicios/comprar-propiedad',
    cta: 'Ver detalles →',
  },
  {
    name: 'Renta de propiedades',
    desc: 'Gestionamos la renta de tu inmueble: selección del arrendatario, investigación de referencias, elaboración de contrato, cobro de depósito y seguimiento mensual. Tu propiedad en las mejores manos.',
    href: '/servicios/rentar-propiedad',
    cta: 'Ver detalles →',
  },
  {
    name: 'Propiedades comerciales',
    desc: 'Locales en planta baja, pisos de oficinas, plazas y espacios mixtos en ubicaciones estratégicas de los principales municipios. Asesoría para negocios en crecimiento.',
    href: '/servicios/comercial-industrial',
    cta: 'Ver detalles →',
  },
  {
    name: 'Propiedades industriales',
    desc: 'Naves industriales, bodegas, parques logísticos y terrenos industriales en los principales corredores de Nuevo León, incluyendo Apodaca, Escobedo, Santa Catarina y Santiago.',
    href: '/servicios/comercial-industrial',
    cta: 'Ver detalles →',
  },
  {
    name: 'Valuación gratuita',
    desc: 'Conoce el valor real de mercado de tu inmueble sin costo. Nuestros asesores realizan un análisis comparativo de mercado y te entregan un reporte profesional en menos de 48 horas.',
    href: '/herramientas/estimacion-de-valor',
    cta: 'Solicitar ahora →',
  },
  {
    name: 'Asesoría para inversionistas',
    desc: 'Análisis de mercado, identificación de oportunidades con alto rendimiento, estrategias de diversificación de portafolio y acompañamiento en la toma de decisiones de inversión inmobiliaria.',
    href: '/servicios/inversion-inmobiliaria',
    cta: 'Ver detalles →',
  },
  {
    name: 'Clientes extranjeros',
    desc: 'Compra, renta o inversión en Monterrey con atención en español, inglés y mandarín, búsqueda inmobiliaria, contratos y apoyo en trámites ante la SRE.',
    href: '/servicios/clientes-extranjeros',
    cta: 'Ver detalles →',
  },
  {
    name: 'Master Broker',
    desc: 'Comercialización exclusiva de propiedades en venta, con una sola estrategia, coordinación central y una red inmobiliaria ampliada bajo la gestión de Rednorte.',
    href: '/servicios/master-broker',
    cta: 'Ver detalles →',
  },
];

export default function ServiciosPage() {
  return (
    <div className="page-content">
      <Breadcrumb items={[{ label: 'Servicios' }]} />
      <div className="servicios-page">
        <div className="section-header">
          <p className="section-label">Lo que hacemos</p>
          <h1 className="section-title">Nuestros servicios inmobiliarios</h1>
          <p className="section-sub">Soluciones profesionales para comprar, vender, rentar e invertir en bienes raíces en Nuevo León.</p>
        </div>
        <div className="servicios-grid">
          {servicios.map((s) => (
            <div className="servicio-card" key={s.name}>
              <div className="servicio-icon-big"></div>
              <div className="servicio-name">{s.name}</div>
              <div className="servicio-desc">{s.desc}</div>
              <Link className="btn-contactar" href={s.href}>{s.cta}</Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div className="cta-valuacion" style={{ margin: 0, borderRadius: '16px', padding: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>¿Listo para dar el siguiente paso?</h2>
            <p>Nuestros asesores están disponibles para atenderte de lunes a viernes de 9:00 a 18:00 h.</p>
            <div className="cta-actions">
              <Link className="btn-white" href="/contacto">Contactar ahora</Link>
              <a className="btn-wa-nav" href="https://wa.me/528117783953" target="_blank" rel="noopener noreferrer" style={{ borderRadius: '10px', padding: '0.85rem 1.5rem', fontSize: '14px' }}> WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
