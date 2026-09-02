// Preguntas frecuentes del sitio.
//
// Viven aquí y no dentro de un componente porque se usan en dos lugares: la
// sección del home y la página /preguntas-frecuentes. Así no se desincronizan
// ni hay que escribirlas dos veces.
//
// Cada respuesta lleva un enlace a una página real del sitio, para que la
// sección no sea solo texto muerto.

export const FAQS = [
  {
    pregunta: '¿Cuánto cobra una inmobiliaria por vender una propiedad en Monterrey?',
    respuesta:
      'La comisión inmobiliaria depende del tipo de propiedad, operación y alcance del servicio. Normalmente incluye análisis de mercado, estrategia de precio, promoción, atención de prospectos, coordinación de visitas, negociación y acompañamiento hasta el cierre. Antes de iniciar, las condiciones y honorarios deben quedar claramente establecidos con el propietario.',
    enlace: { texto: 'Conocer el servicio de venta', href: '/servicios/vender-propiedad' },
  },
  {
    pregunta: '¿Cómo puedo saber cuánto vale mi propiedad?',
    respuesta:
      'El valor de una propiedad depende de su ubicación, superficie, características, estado de conservación y de los precios de inmuebles comparables en el mercado. Rednorte cuenta con una herramienta gratuita que permite obtener una estimación inicial y, cuando se requiere mayor precisión, nuestro equipo puede realizar un análisis personalizado.',
    enlace: { texto: 'Estimar el valor de mi propiedad', href: '/herramientas/estimacion-de-valor' },
  },
  {
    pregunta: '¿Qué necesito para vender una casa o departamento en Nuevo León?',
    respuesta:
      'Generalmente se debe comprobar la propiedad del inmueble y revisar documentación como escritura, identificación de los propietarios, predial, servicios, régimen de condominio cuando corresponda y situación de gravámenes o adeudos. Los documentos específicos pueden variar según la propiedad y la forma en que se realizará la operación.',
    enlace: { texto: 'Hablar con un asesor', href: '/contacto' },
  },
  {
    pregunta: '¿Cómo ayuda Rednorte a rentar mi propiedad?',
    respuesta:
      'Rednorte ayuda al propietario a definir una estrategia de renta, posicionar el inmueble en el mercado, promocionarlo, atender y filtrar prospectos, coordinar visitas, negociar condiciones y acompañar la documentación necesaria para formalizar la operación. El objetivo es reducir tiempos y facilitar un proceso más ordenado para el propietario.',
    enlace: { texto: 'Conocer el servicio de renta', href: '/servicios/rentar-propiedad' },
  },
  {
    pregunta: '¿Qué debo revisar antes de comprar una propiedad en Monterrey?',
    respuesta:
      'Antes de comprar conviene revisar que el precio sea congruente con el mercado, las condiciones físicas del inmueble, su situación jurídica, posibles gravámenes o adeudos, gastos asociados y características de la zona. Si la compra es para inversión, también deben analizarse demanda de renta, rendimiento esperado, mantenimiento y potencial de apreciación.',
    enlace: { texto: 'Ver propiedades disponibles', href: '/propiedades' },
  },
];
