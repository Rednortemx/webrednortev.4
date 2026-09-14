import Link from 'next/link';
import Image from 'next/image';
import CookiePrefsLink from './CookiePrefsLink';
import WhatsAppGateButton from './WhatsAppGateButton';

function propsFilterHref(operacion, tipo, categoria) {
  const params = new URLSearchParams();
  if (operacion) params.set('operacion', operacion);
  if (tipo) params.set('tipo', tipo);
  if (categoria) params.set('categoria', categoria);
  const qs = params.toString();
  return qs ? `/propiedades?${qs}` : '/propiedades';
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-mark">
              <Image src="/logo.png" alt="Rednorte" width={44} height={44} />
            </div>
            <div className="logo-text">
              <span className="logo-name">Rednorte</span>
              <span className="logo-sub">Inmobiliaria</span>
            </div>
          </div>
          <p className="footer-desc">Especialistas en venta, renta e inversión inmobiliaria en Monterrey y Nuevo León. Conectamos propiedades con decisiones inteligentes.</p>
          <p className="footer-address"> Av. José Vasconcelos Ote. 215-7<br />Residencial San Agustín 1er Sector<br />San Pedro Garza García, N.L. 66260</p>
          <div className="footer-social">
            <a className="social-btn" href="https://www.facebook.com/rednorteinmobiliaria/" target="_blank" rel="noopener noreferrer" title="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" /></svg>
            </a>
            <a className="social-btn" href="https://www.instagram.com/rednortemx/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a className="social-btn" href="https://www.linkedin.com/company/rednortemx/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-.001-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a className="social-btn" href="https://x.com/rednortemx" target="_blank" rel="noopener noreferrer" title="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a className="social-btn" href="https://www.tiktok.com/@rednortemx" target="_blank" rel="noopener noreferrer" title="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82a4.278 4.278 0 01-1.06-2.82h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z" /></svg>
            </a>
            <a className="social-btn" href="https://www.youtube.com/@rednorteinmobiliaria" target="_blank" rel="noopener noreferrer" title="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a2.994 2.994 0 00-2.107-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.524A2.994 2.994 0 00.502 6.186 31.36 31.36 0 000 12a31.36 31.36 0 00.502 5.814 2.994 2.994 0 002.107 2.117c1.886.524 9.391.524 9.391.524s7.505 0 9.391-.524a2.994 2.994 0 002.107-2.117A31.36 31.36 0 0024 12a31.36 31.36 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z" /></svg>
            </a>
            <a className="social-btn" href="https://share.google/UFbLTlYjmYeX6h6zy" target="_blank" rel="noopener noreferrer" title="Google">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" /></svg>
            </a>
            <WhatsAppGateButton className="social-btn" title="WhatsApp" source="Footer (redes)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </WhatsAppGateButton>
          </div>
        </div>
        <div className="footer-col">
          <h4>Propiedades</h4>
          <ul className="footer-links">
            <li><Link href={propsFilterHref('Venta', '', '')}>Comprar</Link></li>
            <li><Link href={propsFilterHref('Renta', '', '')}>Rentar</Link></li>
            <li><Link href={propsFilterHref('', '', 'Residencial')}>Residencial</Link></li>
            <li><Link href={propsFilterHref('', '', 'Comercial')}>Comercial</Link></li>
            <li><Link href={propsFilterHref('', '', 'Industrial')}>Industrial</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Servicios</h4>
          <ul className="footer-links">
            <li><Link href="/servicios/vender-propiedad">Vender propiedad</Link></li>
            <li><Link href="/servicios/comprar-propiedad">Comprar propiedad</Link></li>
            <li><Link href="/servicios/rentar-propiedad">Rentar propiedad</Link></li>
            <li><Link href="/servicios/inversion-inmobiliaria">Inversión inmobiliaria</Link></li>
            <li><Link href="/servicios/inmobiliaria-comercial">Inmobiliaria comercial</Link></li>
            <li><Link href="/servicios/inmobiliaria-industrial">Inmobiliaria industrial</Link></li>
            <li><Link href="/servicios/estimacion-de-valor">Estimación de valor</Link></li>
            <li><Link href="/servicios/clientes-extranjeros">Clientes extranjeros</Link></li>
            <li><Link href="/servicios/master-broker">Master Broker</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Rednorte</h4>
          <ul className="footer-links">
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/equipo">Equipo</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/reportes">Reportes</Link></li>
            <li><Link href="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
            <li><Link href="/trabaja-con-nosotros">Trabaja con nosotros</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <ul className="footer-links">
            <li><a href="tel:+528117783953">(81) 1778-3953</a></li>
            <li><WhatsAppGateButton source="Footer (contacto)">WhatsApp</WhatsAppGateButton></li>
            <li><a href="mailto:admin@rednorte.com.mx">admin@rednorte.com.mx</a></li>
            <li><Link href="/contacto">Ubicación</Link></li>
          </ul>
          <h4 style={{ marginTop: '1.5rem' }}>Horario</h4>
          <ul className="footer-links">
            <li><span>Lun–Vie: 9:00 – 18:00</span></li>
            <li><span>Sáb: 10:00 – 14:00</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: '1200px', margin: '0 auto', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Rednorte Inmobiliaria. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <Link style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }} href="/aviso-de-privacidad">Aviso de privacidad</Link>
          <Link style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }} href="/terminos-y-condiciones">Términos y condiciones</Link>
          <Link style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }} href="/politica-de-cookies">Política de cookies</Link>
          <CookiePrefsLink style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }} />
        </div>
      </div>
    </footer>
  );
}
