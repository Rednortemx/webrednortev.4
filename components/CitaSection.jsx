'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatMxPhone, advisorInitials } from '@/lib/format';

// Ported from the legacy page-cita section (index.html lines ~4912-5013) and
// its enviarCitaWA(). Per the migration plan this is NOT its own route —
// "Hacer una cita" only makes sense in the context of a specific property,
// so it's rendered inline inside app/propiedades/[slug]/page.jsx instead.
export default function CitaSection({ property, advisor }) {
  const [nombre, setNombre] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [priv, setPriv] = useState(false);
  const modalidad = 'Visita presencial';

  const advisorNumber = String(advisor?.phone || '528117783953').replace(/\D/g, '');

  const enviar = () => {
    if (!nombre || !tel || !fecha || !hora) {
      alert('Por favor completa nombre, teléfono, fecha y hora para agendar tu cita.');
      return;
    }
    if (!priv) {
      alert('Debes aceptar el Aviso de Privacidad para continuar.');
      return;
    }

    const [y, m, d] = fecha.split('-');
    const fechaFmt = y && m && d ? `${d}/${m}/${y}` : fecha;

    const lines = ['Hola, quiero agendar una cita para conocer una propiedad.', ''];
    if (property) lines.push(`Propiedad: ${property.title} (Ref: ${property.id})`);
    lines.push(`Fecha: ${fechaFmt}`, `Hora: ${hora}`, `Modalidad: ${modalidad}`, '', `Nombre: ${nombre}`, `Teléfono: ${tel}`);
    if (email) lines.push(`Correo: ${email}`);
    if (comentarios) lines.push('', `Comentarios: ${comentarios}`);

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'Cita agendada',
        nombre,
        telefono: tel,
        email,
        detalle: property ? `${property.title} (Ref: ${property.id})` : '',
        notas: `${fechaFmt} ${hora} · ${modalidad}. ${comentarios || ''}`.trim(),
      }),
    }).catch(() => {});

    window.open(
      'https://wa.me/' + advisorNumber + '?text=' + encodeURIComponent(lines.join('\n')),
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div id="cita-section" style={{ maxWidth: '860px', margin: '3rem auto 0', padding: '0 0 2rem', borderTop: '1px solid var(--gris-claro)' }}>
      <div style={{ textAlign: 'center', margin: '2.5rem 0' }}>
        <p className="section-label">Sin costo · Sin compromiso</p>
        <h2 className="section-title">Agenda una cita con el asesor</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>Elige la fecha y hora que mejor te convenga. El asesor recibirá tu solicitud por WhatsApp y confirmará en breve.</p>
      </div>
      <div className="cita-grid-inner">
        <div className="form-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--negro)', marginBottom: '1.5rem' }}>Datos de contacto</h3>
          <div className="form-row">
            <div className="form-group"><label htmlFor="cita-nombre">Nombre completo *</label><input id="cita-nombre" type="text" autoComplete="name" required placeholder="Tu nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
            <div className="form-group"><label htmlFor="cita-telefono">Teléfono *</label><input id="cita-telefono" type="tel" autoComplete="tel" inputMode="tel" required placeholder="+52 (81) 0000-0000" value={tel} onChange={(e) => setTel(e.target.value)} /></div>
          </div>
          <div className="form-group"><label htmlFor="cita-email">Correo electrónico</label><input id="cita-email" type="email" autoComplete="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div style={{ borderTop: '1px solid var(--gris-claro)', margin: '1.25rem 0', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--negro)', marginBottom: '1.25rem' }}>Fecha y hora de la cita</h3>
            <div className="form-row">
              <div className="form-group"><label htmlFor="cita-fecha">Fecha *</label><input id="cita-fecha" type="date" required style={{ appearance: 'auto' }} value={fecha} onChange={(e) => setFecha(e.target.value)} /></div>
              <div className="form-group">
                <label htmlFor="cita-hora">Hora *</label>
                <select id="cita-hora" required value={hora} onChange={(e) => setHora(e.target.value)}>
                  <option value="">Seleccionar hora</option>
                  {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'].map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--gris-claro)', margin: '1.25rem 0', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--negro)', marginBottom: '1.25rem' }}>Modalidad de la cita</h3>
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button className="motivo-btn active" type="button">Visita presencial</button>
            </div>
          </div>
          <div className="form-group"><label htmlFor="cita-comentarios">Comentarios adicionales</label>
            <textarea id="cita-comentarios" rows="3" placeholder="Alguna pregunta específica, dirección, preferencias..." value={comentarios} onChange={(e) => setComentarios(e.target.value)}></textarea>
          </div>
          <div className="form-check">
            <input type="checkbox" id="cita-priv" checked={priv} onChange={(e) => setPriv(e.target.checked)} />
            <label htmlFor="cita-priv">Acepto el <Link href="/aviso-de-privacidad" style={{ color: 'var(--terracota)' }}>Aviso de Privacidad</Link>.</label>
          </div>
          <button className="btn-primary-full" type="button" onClick={enviar}>Confirmar cita por WhatsApp</button>
          <p style={{ fontSize: '11px', color: 'var(--gris-medio)', textAlign: 'center', marginTop: '.5rem' }}>Se abrirá WhatsApp con los datos de tu cita. El asesor confirmará disponibilidad.</p>
        </div>
        <div>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--gris-claro)', padding: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gris-medio)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '.75rem' }}>Asesor asignado</p>
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
            <a className="advisor-phone" href={`tel:+${advisorNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--terracota)', fontWeight: 600, margin: '-0.75rem 0 1rem', textDecoration: 'none' }}> {formatMxPhone(advisor?.phone) || '+52 (811) 778-3953'}</a>
            <div style={{ fontSize: '12px', color: 'var(--cafe)', lineHeight: 1.7, paddingTop: '.75rem', borderTop: '1px solid var(--gris-claro)' }}>
              <p><strong>Horario de atención:</strong></p>
              <p>Lun-Vie: 9:00 - 18:00 h</p>
              <p>Sab: 10:00 - 14:00 h</p>
            </div>
          </div>
          <div style={{ background: 'var(--crema-dark)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--gris-claro)' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--negro)', marginBottom: '.5rem' }}>Cómo funciona</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
              {[
                'Llena el formulario con tus datos y elige fecha y hora.',
                'Se abre WhatsApp con el mensaje de tu cita listo para enviar.',
                'El asesor confirma la cita en menos de 2 horas.',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--terracota)', color: 'white', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: '12px', color: 'var(--cafe)', lineHeight: 1.5 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
