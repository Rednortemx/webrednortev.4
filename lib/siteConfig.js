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
  activeProperties: '520+',
  teamMembers: '+30',
  since: '2018',
});
