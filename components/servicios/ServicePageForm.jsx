'use client';

import { createLeadSubmitter, trackConversion } from '@/lib/conversions';
const submitLeadRequest = createLeadSubmitter('servicio');

import { useEffect, useRef } from 'react';

// Conecta el formulario de las paginas de servicio con /api/leads.
//
// El contenido de esas paginas se inserta como HTML (ver los modulos
// contenido*.js), asi que el formulario no es un componente React: es markup
// suelto. Este componente lo localiza por su clase y le engancha el envio,
// en vez de reescribir los ~15 campos de cada pagina en JSX.
//
// Al enviar hace dos cosas: registra el lead en la hoja de seguimiento y
// abre WhatsApp con el resumen, igual que el formulario de vender-propiedad.
export default function ServicePageForm({ formClass, tipo, telefono = '528117783953' }) {
  const listoRef = useRef(false);

  useEffect(() => {
    if (listoRef.current) return;
    const form = document.querySelector('.' + formClass);
    if (!form) return;
    listoRef.current = true;

    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden';
    form.appendChild(honeypot);

    const valor = (etiqueta) => {
      const labels = [...form.querySelectorAll('label')];
      const l = labels.find((el) => {
        const s = el.querySelector('span');
        return s && s.textContent.toLowerCase().includes(etiqueta.toLowerCase());
      });
      if (!l) return '';
      const campo = l.querySelector('input, select, textarea');
      const v = campo ? String(campo.value || '').trim() : '';
      // Los <select> sin elegir devuelven su texto de placeholder; se descarta
      // para que no acabe en la hoja de leads como si fuera un dato real.
      return /^selecciona/i.test(v) ? '' : v;
    };

    const estado = (texto, ok) => {
      let p = form.querySelector('.service-form-status');
      if (!p) {
        p = document.createElement('p');
        p.className = 'service-form-status';
        form.appendChild(p);
      }
      p.textContent = texto;
      p.style.cssText =
        'margin:.9rem 0 0;font-size:.83rem;line-height:1.5;color:' + (ok ? '#2e7d32' : '#a33024');
    };

    const enviar = async (e) => {
      e.preventDefault();

      const nombre = valor('nombre');
      const tel = valor('teléfono') || valor('telefono');
      if (!nombre || !tel) {
        estado('Necesitamos tu nombre y un teléfono para poder responderte.', false);
        return;
      }
      const privacidad = form.querySelector('input[type="checkbox"]');
      if (privacidad && !privacidad.checked) {
        estado('Debes aceptar el Aviso de Privacidad para enviar la solicitud.', false);
        return;
      }

      const email = valor('correo');
      const detalle = [valor('tipo de'), valor('municipio'), valor('superficie'), valor('giro')]
        .filter(Boolean)
        .join(' · ');
      const notas = [
        valor('qué necesitas') ? 'Necesita: ' + valor('qué necesitas') : '',
        valor('empresa') ? 'Empresa: ' + valor('empresa') : '',
        valor('operación') ? 'Operación: ' + valor('operación') : '',
        valor('presupuesto') ? 'Presupuesto: ' + valor('presupuesto') : '',
        valor('cuéntanos'),
      ]
        .filter(Boolean)
        .join(' · ');

      const lineas = [
        'Hola, escribo desde ' + tipo + '.',
        '',
        'Nombre: ' + nombre,
        'Teléfono: ' + tel,
        email ? 'Correo: ' + email : '',
        detalle ? 'Propiedad: ' + detalle : '',
        notas ? 'Detalle: ' + notas : '',
      ].filter(Boolean);
      const wa = 'https://wa.me/' + telefono + '?text=' + encodeURIComponent(lineas.join('\n'));
      trackConversion('whatsapp_clic', 'servicio');
      const ventana = window.open(wa, '_blank');
      if (ventana) ventana.opener = null;

      estado('Enviando…', true);
      try {
        const response = await submitLeadRequest('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tipo, nombre, telefono: tel, email, detalle, notas, website: honeypot.value }),
          keepalive: true,
        });
        if (!response.ok) throw new Error(`Lead API respondió ${response.status}`);
        estado(
          'Recibimos tu solicitud. Un integrante de Rednorte se comunicará contigo para definir el siguiente paso.',
          true
        );
        form.reset();
      } catch {
        estado(
          'No pudimos registrar la solicitud, pero abrimos WhatsApp como canal alternativo.',
          false
        );
      }
      if (!ventana) window.location.href = wa;
    };

    form.addEventListener('submit', enviar);
    // El boton del markup original es type="button", asi que no dispara submit solo.
    const boton = form.querySelector('button');
    if (boton) boton.addEventListener('click', enviar);

    return () => {
      form.removeEventListener('submit', enviar);
      if (boton) boton.removeEventListener('click', enviar);
      honeypot.remove();
    };
  }, [formClass, tipo, telefono]);

  return null;
}
