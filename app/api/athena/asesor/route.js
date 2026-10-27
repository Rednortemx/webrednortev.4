// Asesor asignado a una propiedad, para Athena.
//
// Reusa la misma búsqueda que la ficha pública (lib/advisor.js), de modo que
// el asistente avisa exactamente al asesor que el sitio muestra, sin una
// segunda tabla que se desincronice.

import { getAdvisorForProperty, defaultAdvisor } from '@/lib/advisor';
import { json, revisarAcceso } from '@/lib/athena';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const cortar = revisarAcceso(req);
  if (cortar) return cortar;

  const codigo = (req.nextUrl.searchParams.get('code') || '').trim().slice(0, 40);
  if (!codigo) {
    return json({ error: 'Falta el parámetro code.' }, 400);
  }

  // Una sola búsqueda: getAdvisorForProperty puede salir a la red cuando el
  // código no está en la tabla estática.
  const encontrado = await getAdvisorForProperty(codigo);
  const asesor = encontrado || defaultAdvisor();

  return json({
    codigo,
    // 'propio' distingue al asesor de esa propiedad del contacto general de
    // la oficina: Athena no debería decir "tu asesor es X" cuando en realidad
    // está cayendo al buzón de siempre.
    propio: Boolean(encontrado),
    asesor: {
      nombre: asesor.name || '',
      telefono: asesor.phone || '',
      correo: asesor.email || '',
      foto: asesor.photo || '',
    },
  }, 200);
}
