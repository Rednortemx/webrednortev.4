'use client';

import { useRef, useState } from 'react';
import { formatMxPhone, advisorInitials } from '@/lib/format';
import CitaSection from './CitaSection';

// Ported from the legacy ficha sidebar (advisor card + "Hacer una cita" +
// share). "Hacer una cita" used to call navTo('cita'), a whole separate
// page; per the migration plan that flow is now a Client Component embedded
// directly in this same property route instead of its own URL.
export default function PropertySidebar({ property, advisor }) {
  const [citaOpen, setCitaOpen] = useState(false);
  const [shareLabel, setShareLabel] = useState('↗ Compartir propiedad');
  // Ref y no estado: hay que marcarlo de forma síncrona para que un doble
  // clic rápido no alcance a mandar dos registros antes de que React re-renderice.
  const waLogged = useRef(false);
  const advisorNumber = String(advisor?.phone || '528117783953').replace(/\D/g, '');

  // El botón de WhatsApp manda a la persona directo al chat del asesor, así
  // que su teléfono solo le llega al asesor y nunca pasa por el sitio. Aquí
  // solo dejamos constancia de que hubo interés en ESTA propiedad, para poder
  // medir cuáles generan contactos. No se pide ni se envía ningún dato del
  // visitante, y no bloquea la apertura de WhatsApp.
  const logWhatsAppInterest = () => {
    if (waLogged.current) return;
    waLogged.current = true;
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'Interés por WhatsApp',
        detalle: `${property.title} (Ref: ${property.id})`,
        notas: 'Clic en "Escribir por WhatsApp" desde la ficha de la propiedad',
      }),
      keepalive: true,
    }).catch(() => {});
  };

  const openCita = () => {
    setCitaOpen(true);
    requestAnimationFrame(() => {
      document.getElementById('cita-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = { title: property.title, text: `${property.title} · ${property.price}`, url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // el usuario canceló o no hay soporte; seguimos al respaldo de portapapeles
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareLabel('Enlace copiado ✓');
      setTimeout(() => setShareLabel('↗ Compartir propiedad'), 2000);
    } catch {
      // sin soporte de portapapeles, no hacemos nada más
    }
  };

  return (
    <>
      <div className="prop-sidebar">
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gris-medio)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Asesor asignado</p>
        <div className="advisor-card">
          <div className="advisor-avatar">
            {advisor?.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={advisor.photo} alt={advisor.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              advisorInitials(advisor?.name)
            )}
          </div>
          <div>
            <div className="advisor-name">{advisor?.name || 'Rednorte Inmobiliaria'}</div>
            <div className="advisor-role">{advisor?.company || 'Equipo de asesores'}</div>
          </div>
        </div>
        <a className="advisor-phone" href={`tel:+${advisorNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--terracota)', fontWeight: 600, margin: '-0.5rem 0 1rem', textDecoration: 'none' }}> {formatMxPhone(advisor?.phone) || '+52 (811) 778-3953'}</a>
        <a className="btn-wa-big" href={`https://wa.me/${advisorNumber}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} onClick={logWhatsAppInterest}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          Escribir por WhatsApp
        </a>
        <button className="btn-wa-big" onClick={openCita} style={{ background: 'var(--vino)', marginBottom: '0.75rem' }} type="button">
          Hacer una cita
        </button>
        <button className="btn-share" type="button" onClick={share}>{shareLabel}</button>
        <div style={{ borderTop: '1px solid var(--gris-claro)', marginTop: '1.25rem', paddingTop: '1.25rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gris-medio)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Referencia</p>
          <p style={{ fontSize: '13px', color: 'var(--cafe)' }}>Código: <strong>{property.id}</strong></p>
          <p style={{ fontSize: '11px', color: 'var(--gris-medio)', marginTop: '4px' }}>Fuente: <span className="crm-tag" style={{ float: 'none', display: 'inline-flex', fontSize: '9px', padding: '2px 6px' }}><span className="crm-dot"></span> CRM oficial</span></p>
        </div>
      </div>
      {citaOpen && (
        <div style={{ gridColumn: '1 / -1' }}>
          <CitaSection property={property} advisor={advisor} />
        </div>
      )}
    </>
  );
}
