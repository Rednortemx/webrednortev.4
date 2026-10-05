export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rednorte.mx';

export const SITE_CONTACT = Object.freeze({
  phoneDigits: '528117783953',
  phoneHref: 'tel:+528117783953',
  phoneDisplay: '(81) 1778-3953',
  phoneInternationalDisplay: '+52 (81) 1778-3953',
  email: 'admin@rednorte.com.mx',
  address: Object.freeze({
    streetAddress: 'Av. José Vasconcelos Ote. 215-7',
    neighborhood: 'Residencial San Agustín 1er Sector',
    locality: 'San Pedro Garza García',
    region: 'Nuevo León',
    regionShort: 'N.L.',
    postalCode: '66260',
    full: 'Av. José Vasconcelos Ote. 215-7, Residencial San Agustín 1er Sector, San Pedro Garza García, N.L. 66260',
  }),
  hours: Object.freeze({
    weekdays: 'Lun–Vie: 9:00 – 18:00',
    saturday: 'Sáb: 10:00 – 14:00',
  }),
  response: Object.freeze({
    summary: 'Respondemos en menos de 2 horas en horario laboral.',
    success: 'Recibimos tu solicitud. Uno de nuestros asesores se comunicará contigo en menos de 2 horas en horario laboral.',
  }),
});

export const SITE_METRICS = Object.freeze({
  // Respaldo conservador para un arranque sin acceso a NOCNOK. En operación
  // normal el Home sustituye este valor por el total exacto del inventario.
  activeProperties: '600',
  teamMembers: '+30',
  since: '2018',
});

// Selección editorial del Home. Sólo incluye propiedades revisadas manualmente
// por calidad visual, información y relevancia. Si menos de tres siguen activas
// en NOCNOK, la sección completa se oculta: nunca se rellena automáticamente.
export const HOME_CURATED_PROPERTY_IDS = Object.freeze([
  'NN-HFS180', // Valle de San Ángel · San Pedro Garza García
  'NN-HEB798', // Torre Milena · Garza Sada
  'NN-GWG099', // Las Huastecas · Santa Catarina
  'NN-HEQ254', // Sierra Alta · Carretera Nacional
  'NN-LT1000639', // Los Cristales · Carretera Nacional
  'NN-GWG164', // Club de Golf La Herradura · Carretera Nacional
  'NN-HAW311', // Penthouse Cova 2 · Colinas del Valle
  'NN-HDG781', // Amorada Privada Residencial · Santiago
]);
