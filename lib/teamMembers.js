export const TEAM_FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'comprar', label: 'Comprar' },
  { key: 'vender', label: 'Vender' },
  { key: 'rentar', label: 'Rentar' },
  { key: 'inversion', label: 'Inversión' },
  { key: 'comercial', label: 'Comercial' },
  { key: 'industrial', label: 'Industrial' },
];

// Fuente única de datos para /equipo y /equipo/[slug].
export const teamMembers = [
  {
    slug: 'roque-avila',
    profileType: 'founder',
    name: 'Roque Ávila',
    role: 'Fundador y Presidente',
    headline:
      'Empresario inmobiliario en Monterrey enfocado en estrategia de comercialización, inversión, negociación, profesionalización del asesor y tecnología aplicada a bienes raíces.',
    photo: '/equipo/roque-avila.jpg',
    portraitTone: 'terracota',
    whatsapp: '',
    email: '',
    linkedin: 'https://www.linkedin.com/in/roqueavila/',
    instagram: '',
    languages: ['Español', 'Inglés'],

    // Se mantienen para filtros y relaciones internas del directorio.
    operations: ['vender', 'inversion', 'comercial', 'rentar'],
    operationsLabels: [
      'Estrategia de comercialización',
      'Inversión inmobiliaria',
      'Negociación',
      'Tecnología y análisis',
    ],
    propertyTypes: [
      'Residencial',
      'Comercial',
      'Preventas',
      'Arrendamientos',
      'Propiedades de inversión',
    ],
    clientTypes: [
      'Propietarios',
      'Inversionistas',
      'Compradores',
      'Clientes extranjeros',
      'Empresas',
    ],
    zones: ['San Pedro Garza García', 'Valle Poniente', 'San Jerónimo'],

    bio: [
      'Roque Ávila es fundador y Presidente de Rednorte Inmobiliaria, firma regiomontana creada en enero de 2018 con el objetivo de contribuir a profesionalizar la asesoría inmobiliaria. Se dedica al sector de bienes raíces desde 2017 y actualmente concentra su trabajo en la dirección de Rednorte, el desarrollo de sus asesores, la estrategia comercial y la construcción de procesos y herramientas para mejorar la operación inmobiliaria.',
      'Antes de iniciar su trayectoria en bienes raíces estudió en Estados Unidos y tuvo su primera experiencia profesional en Primerica, dentro del sector de servicios financieros. Esa etapa le permitió conocer un entorno donde la comercialización de distintos productos requería preparación, regulación y licencias profesionales, experiencia que posteriormente influyó en su visión sobre la necesidad de elevar los estándares de capacitación y responsabilidad dentro del sector inmobiliario.',
      'Hoy su enfoque combina experiencia comercial, análisis de datos, tecnología, negociación y formación continua. Su objetivo no es sustituir la relación entre asesor y cliente mediante tecnología, sino utilizarla para que los profesionales inmobiliarios puedan analizar mejor, organizar mejor su operación y tomar decisiones con mayor información.',
    ],

    currentRole:
      'Como Presidente de Rednorte, Roque concentra actualmente la mayor parte de su actividad en dirigir la empresa, desarrollar asesores y construir procesos y herramientas. En determinadas consultas participa en la conversación inicial para comprender la necesidad del propietario, comprador o inversionista y posteriormente coordinar la atención con el integrante del equipo más adecuado.',

    philosophy: [
      {
        title: 'El cliente antes que la comisión',
        text:
          'Una buena asesoría comienza por entender lo que realmente necesita el cliente, incluso cuando todavía no tiene completamente claro qué está buscando. La recomendación debe construirse alrededor de esa necesidad y no alrededor de la propiedad que el asesor quiere colocar.',
      },
      {
        title: 'La antigüedad no sustituye la preparación',
        text:
          'La experiencia genera valor cuando se acompaña de capacitación, actualización, análisis, disciplina y capacidad para adaptarse a un mercado que cambia constantemente.',
      },
      {
        title: 'Los datos son el mapa',
        text:
          'Comparables, comportamiento del mercado, precios, inventario, demanda y desempeño comercial permiten construir estrategias con más fundamento y reducir decisiones basadas únicamente en intuición.',
      },
    ],

    technologyPosition: {
      title: 'Tecnología para potenciar personas, no para reemplazarlas',
      paragraphs: [
        'Roque considera que la inteligencia artificial y la tecnología deben utilizarse para mejorar procesos, análisis, administración, seguimiento, búsqueda de información, estimaciones, CRM y automatización.',
        'La relación con el cliente debe seguir siendo humana. Entender una necesidad también implica escuchar el tono de voz, observar comportamientos, generar confianza, interpretar dudas y hacer preguntas que muchas veces no caben dentro de un formulario.',
      ],
      quote:
        'La tecnología puede potencializar a un buen asesor. La relación con el cliente sigue siendo humana.',
    },

    expertise: [
      {
        title: 'Estrategia de comercialización',
        text:
          'Posicionamiento, precio, exposición, seguimiento y coordinación comercial de propiedades.',
      },
      {
        title: 'Inversión inmobiliaria',
        text:
          'Análisis de objetivos, escenarios y alternativas de inversión según la necesidad del cliente.',
      },
      {
        title: 'Negociación',
        text:
          'Estructuración de ofertas, condiciones comerciales y coordinación entre las partes de una operación.',
      },
      {
        title: 'Tecnología y análisis',
        text:
          'Uso de datos, automatización, inteligencia artificial y herramientas propias para mejorar procesos inmobiliarios.',
      },
    ],

    timeline: [
      {
        year: '2016',
        title: 'Regreso a México',
        text: 'Después de estudiar en Estados Unidos y trabajar en servicios financieros regulados.',
      },
      {
        year: '2017',
        title: 'Inicio en bienes raíces',
        text: 'Se incorpora profesionalmente al sector inmobiliario en Monterrey.',
      },
      {
        year: '2018',
        title: 'Fundación de Rednorte',
        text: 'Rednorte inicia en enero de 2018 con cinco personas y una oficina de 9 m² en Zari Business Center, sobre Calzada San Pedro.',
      },
      {
        year: 'Actualidad',
        title: 'Profesionalización y tecnología',
        text: 'Rednorte consolida capacitación semanal, herramientas propias, automatización y una operación inmobiliaria apoyada en datos.',
      },
    ],

    startYear: 2017,
    previousExperience:
      'Experiencia profesional en Primerica, dentro del sector de servicios financieros en Estados Unidos, comercializando seguros, servicios legales prepagados e inversiones bajo esquemas que requerían preparación y licencias profesionales.',
    education: [
      'Brigham Young University–Idaho',
      'Universidad del Valle de México',
    ],
    additionalTraining: [
      'El arte de negociar · University of California, Irvine',
      'IA: Ética en la Inteligencia Artificial Educativa · UNAM',
    ],
    certifications: [
      {
        code: 'EC0110.02',
        name: 'Asesoría en Comercialización de Bienes Inmuebles',
        framework: 'Sistema CONOCER / SEP',
        issuer: '',
        status: 'completed',
        verified: false,
        completedAt: '2026',
        licenseNumber: '',
        documentStatus: 'pending_issuance',
        note: '',
      },
    ],

    advisorTraining: {
      title: 'Formación dentro de Rednorte',
      text:
        'Desde la fundación de Rednorte en 2018, Roque participa directamente en la formación de sus asesores. Actualmente imparte una sesión de capacitación general cada miércoles y sesiones adicionales los viernes dirigidas a asesores nuevos.',
      topics: [
        'Comercialización',
        'Negociación',
        'Procesos',
        'Análisis de propiedades',
        'Tecnología',
        'Atención al cliente',
        'Desarrollo profesional',
      ],
    },

    ventures: [
      {
        name: 'Rednorte Inmobiliaria',
        text: 'Comercialización y asesoría inmobiliaria.',
      },
      {
        name: 'Ávalo',
        text: 'Garantías jurídicas, investigación de inquilinos y protección de rentas.',
      },
      {
        name: 'Legalbit',
        text: 'Proptech enfocada en perfilamiento y análisis de información para procesos inmobiliarios y jurídicos.',
      },
      {
        name: 'Vinkia',
        text: 'Empresa enfocada en tecnología y procesos para la operación y administración de desarrollos residenciales verticales.',
      },
    ],

    companyImpact: {
      title: 'Rednorte en cifras',
      stats: [
        { value: '310', label: 'Compraventas cerradas desde 2021' },
        { value: '+$1,500 MDP', label: 'En operaciones inmobiliarias cerradas desde 2021' },
      ],
      note:
        'Cifras correspondientes a registros internos de Rednorte. El monto incluye operaciones de compraventa y arrendamiento cerradas; no representa ingresos ni comisiones de Roque Ávila ni de Rednorte. Datos actualizados al 2 de septiembre de 2026.',
    },

    affiliations: [
      'Representa a Rednorte Inmobiliaria como socio de CANACO SERVYTUR Monterrey desde 2026.',
    ],

    reviews: [],
    articles: [],
    insightsHref: '/insights',
    propertiesHref: '',
    crmAdvisorCode: '',
    directContact: false,
  },

  {
    slug: 'thadeo-gomez',
    name: 'Thadeo Gómez',
    fullName: 'Thadeo Yasar Gómez Gámez',
    role: 'Asesor Inmobiliario',
    headline:
      'Asesor inmobiliario en Monterrey con enfoque en compra, venta, renta e inversión, con atención en español e inglés.',
    photo: '/equipo/thadeo-gomez.jpg',
    portraitTone: 'beige',
    whatsapp: '528341321381',
    email: '',
    linkedin: '',
    instagram: 'https://www.instagram.com/thadeo_realestate/',
    languages: ['Español', 'Inglés'],
    operations: ['comprar', 'vender', 'rentar', 'inversion', 'comercial', 'industrial'],
    operationsLabels: ['Compra', 'Venta', 'Renta', 'Inversión', 'Comercial', 'Industrial'],
    propertyTypes: [
      'Casas',
      'Departamentos',
      'Terrenos residenciales',
      'Terrenos comerciales',
      'Terrenos industriales',
      'Locales',
      'Oficinas',
      'Edificios',
      'Bodegas',
      'Naves industriales',
      'Patios industriales',
      'Preventa vertical',
    ],
    clientTypes: [
      'Propietarios',
      'Compradores',
      'Arrendadores y arrendatarios',
      'Familias y parejas',
      'Ejecutivos',
      'Primera vivienda',
      'Inversionistas',
      'Empresas',
      'Clientes extranjeros',
    ],
    zones: ['Valle Poniente', 'Valle Oriente', 'San Pedro Garza García', 'San Jerónimo'],
    bio: [
      'Thadeo Gómez es asesor inmobiliario de Rednorte con experiencia previa dentro de la operación inmobiliaria como asistente, lo que le permitió conocer el proceso antes de incorporarse formalmente como asesor. Atiende operaciones de compra, venta, renta e inversión, con especial familiaridad en Valle Poniente, Valle Oriente, San Pedro Garza García y San Jerónimo.',
      'Su forma de trabajar se basa en escuchar al cliente, mantener una comunicación ágil y utilizar herramientas tecnológicas para encontrar alternativas y dar seguimiento a cada operación. Tiene formación en Comercio Internacional por la Universidad Politécnica de Victoria y puede atender clientes tanto en español como en inglés.',
    ],
    approach:
      'Busca entender primero qué necesita el cliente, responder con agilidad y plantear alternativas realistas. Procura combinar comunicación, iniciativa y herramientas tecnológicas con una negociación clara y un acompañamiento cómodo para el cliente.',
    priorities: ['Comunicación', 'Escuchar al cliente', 'Negociación'],
    startYear: 2026,
    previousExperience:
      'Antes de incorporarse como asesor inmobiliario trabajó como asistente inmobiliario, experiencia que le permitió conocer procesos, seguimiento y operación antes de asumir la atención directa de clientes.',
    education: [
      'Licenciatura en Comercio Internacional, modalidad BIS · Universidad Politécnica de Victoria',
    ],
    certifications: [
      {
        code: 'EC0110.02',
        name: 'Asesoría en Comercialización de Bienes Inmuebles',
        framework: 'Sistema CONOCER / SEP',
        issuer: '',
        status: 'completed',
        verified: false,
        completedAt: '2026-07',
        licenseNumber: '',
        documentStatus: 'pending_issuance',
        note: 'Certificación concluida; constancia/licencia pendiente de emisión.',
      },
    ],
    reviews: [],
    articles: [],
    propertiesHref: '',
    crmAdvisorCode: '',
    directContact: true,
  },
];

export function getTeamMember(slug) {
  return teamMembers.find((member) => member.slug === slug);
}

export function getCertifiedCredential(member) {
  return (member.certifications || []).find((item) =>
    ['completed', 'licensed'].includes(item.status)
  );
}

export function getVerifiedCredentials(member) {
  return (member.certifications || []).filter(
    (item) => item.verified && ['completed', 'licensed'].includes(item.status)
  );
}
