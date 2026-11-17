// Mensajes comerciales aprobados para la experiencia de captación.
// Las causas son posibilidades, no diagnósticos individuales ni promesas de venta.
export const escenariosVenta = [
  {
    id: 'sin-consultas',
    opcion: 'Mi propiedad no recibe consultas',
    breve: 'Recibo mensajes de asesores, pero casi ninguno de compradores.',
    titulo: 'Tu propiedad está publicada, pero los compradores no aparecen.',
    intro: 'Esperabas recibir interesados después de subir el anuncio. En cambio, tal vez recibes principalmente mensajes de asesores que desean captar la propiedad. Esas propuestas no equivalen a consultas de compradores. No significa que tu inmueble no tenga potencial; hay factores que conviene revisar.',
    aspectos: [
      {
        titulo: 'Compite con muchas alternativas',
        explicacion: 'Quien busca en tu zona compara opciones con presupuestos similares. Una oferta abundante, un precio poco competitivo o diferencias de características pueden hacer que el comprador siga explorando.',
        rednorte: 'Comparamos tu propiedad con anuncios relevantes de la zona, sus precios solicitados, características y condiciones para revisar su posicionamiento comercial.'
      },
      {
        titulo: 'Las fotografías quizá no muestran su potencial',
        explicacion: 'Muchas decisiones de abrir un anuncio se toman en segundos. Fotografías oscuras, desordenadas o que no explican los espacios pueden impedir que alguien quiera conocer la propiedad.',
        rednorte: 'Revisamos fotografías, portada, descripción y materiales; proponemos mejoras para comunicar mejor los atributos reales de tu inmueble.'
      },
      {
        titulo: 'Estar en un portal no es una estrategia completa',
        explicacion: 'Estar publicado no garantiza llegar a todos los compradores adecuados. Diferentes personas descubren oportunidades en distintos canales.',
        rednorte: 'Evaluamos su exposición. Según el inmueble, podemos recomendar portales, aliados inmobiliarios, redes, material físico o campañas específicas cuando la estrategia y el presupuesto lo justifiquen.'
      }
    ],
    revision: 'Revisaríamos precio y competencia, presentación del anuncio y canales donde se está difundiendo.'
  },
  {
    id: 'sin-visitas',
    opcion: 'Recibo consultas, pero no visitas',
    breve: 'Me preguntan por la propiedad, pero nunca se concreta una cita.',
    titulo: 'Hay preguntas por tu propiedad, pero las conversaciones no avanzan.',
    intro: 'Llegan mensajes para saber si sigue disponible, cuánto cuesta o dónde está. Respondes y esperas una visita; a veces dejan de contestar o siguen buscando. Recibir preguntas no siempre significa contar con compradores listos para avanzar.',
    aspectos: [
      {
        titulo: 'El anuncio despierta dudas, no decisiones',
        explicacion: 'Si faltan datos importantes sobre ubicación, distribución, mantenimiento o condiciones, algunas personas preguntan y después descubren que la propiedad no responde a sus necesidades.',
        rednorte: 'Revisamos qué información falta y cómo presentar la propiedad con claridad para atraer interesados más compatibles.'
      },
      {
        titulo: 'No todos los interesados están listos para comprar',
        explicacion: 'Algunos apenas comparan opciones; otros todavía no tienen definido su presupuesto, financiamiento o plazo de compra.',
        rednorte: 'Buscamos identificar necesidades, presupuesto, forma de pago y tiempos de los interesados para enfocar esfuerzos en oportunidades reales.'
      },
      {
        titulo: 'La atención puede estar frenando las visitas',
        explicacion: 'Respuestas tardías, dudas sin resolver, horarios difíciles o falta de seguimiento pueden enfriar una conversación.',
        rednorte: 'Revisamos el seguimiento y la coordinación de visitas para facilitar que las consultas calificadas avancen.'
      }
    ],
    revision: 'Revisaríamos la claridad del anuncio, el perfil de los interesados y el proceso entre el primer mensaje y la cita.'
  },
  {
    id: 'sin-ofertas',
    opcion: 'Tengo visitas, pero ninguna oferta',
    breve: 'La conocen en persona, pero nadie da el siguiente paso.',
    titulo: 'Los compradores visitan tu propiedad, pero nadie presenta una oferta.',
    intro: 'Preparas la propiedad, coordinas horarios y escuchas “lo vamos a pensar”. Después, no llega una propuesta. Haber conseguido visitas es una señal de interés; necesitamos entender qué sucede cuando las personas conocen el inmueble.',
    aspectos: [
      {
        titulo: 'Las expectativas no coinciden con la visita',
        explicacion: 'Las fotografías pueden generar interés, pero al recorrer la propiedad quizá aparecen diferencias en distribución, iluminación, conservación u otros detalles que el comprador no esperaba.',
        rednorte: 'Revisamos que el anuncio comunique los atributos y condiciones reales para atraer visitas mejor informadas.'
      },
      {
        titulo: 'El comprador compara lo que recibe por su presupuesto',
        explicacion: 'Aunque una casa guste, otra opción de precio similar puede ofrecer una distribución, condición o atributo que al interesado le resulte más conveniente.',
        rednorte: 'Analizamos alternativas competidoras y argumentos comerciales antes de recomendar cualquier cambio de precio.'
      },
      {
        titulo: 'Las verdaderas objeciones no siempre llegan al dueño',
        explicacion: 'Por consideración, algunos compradores evitan decir directamente al propietario que no les convenció el precio, un espacio o algún detalle. Respuestas como “luego te avisamos” revelan poco.',
        rednorte: 'Como intermediarios, nuestros asesores hacen preguntas específicas después de la visita. Los interesados pueden expresarse con mayor libertad y sus respuestas nos ayudan a identificar objeciones repetidas y oportunidades de mejora.'
      }
    ],
    revision: 'Revisaríamos expectativas, alternativas del mercado y —cuando existan— comentarios y objeciones de las visitas.'
  },
  {
    id: 'ofertas-bajas',
    opcion: 'Recibo ofertas muy bajas',
    breve: 'Sí me hacen propuestas, pero están lejos de lo que espero.',
    titulo: 'Las ofertas llegan, pero están lejos del precio que esperas.',
    intro: 'Recibir una oferta puede ser emocionante hasta que conoces el monto. Quizá el comprador busca margen para negociar o quizá el mercado está enviando señales. Una oferta baja no prueba por sí sola que una propiedad esté sobrevaluada.',
    aspectos: [
      {
        titulo: 'La primera propuesta puede ser un punto de partida',
        explicacion: 'Algunos compradores proponen menos de su presupuesto real para abrir una negociación. También importan las condiciones, los plazos y la forma de pago.',
        rednorte: 'Analizamos la oferta completa y su viabilidad, no solamente el importe, para identificar oportunidades de negociación.'
      },
      {
        titulo: 'La expectativa del propietario y la del comprador pueden diferir',
        explicacion: 'El propietario conoce sus inversiones y mejoras; el comprador compara otras opciones disponibles en ese momento.',
        rednorte: 'Revisamos comparables y atributos que pueden respaldar el posicionamiento de la propiedad, sin confundir precios anunciados con precios de cierre.'
      },
      {
        titulo: 'El comprador considera gastos adicionales',
        explicacion: 'Reparaciones, mantenimiento, adecuaciones o condiciones de la operación pueden afectar cuánto está dispuesto a ofrecer.',
        rednorte: 'Buscamos entender los argumentos detrás de la oferta y analizar alternativas que respeten los intereses del propietario.'
      }
    ],
    revision: 'Revisaríamos importes y condiciones de las ofertas, posición de mercado y opciones de negociación.'
  },
  {
    id: 'operaciones-caidas',
    opcion: 'Una o varias operaciones se cayeron',
    breve: 'Parecía que la venta avanzaba, pero no se concretó.',
    titulo: 'Ya había un comprador, pero la operación no se concretó.',
    intro: 'Tras visitas y negociaciones parecía que la venta estaba por cerrarse. Después surgió un problema y todo se detuvo. Si ya sucedió una o más veces, conviene conocer la causa antes de volver a pasar por lo mismo.',
    aspectos: [
      {
        titulo: 'El financiamiento aún no estaba resuelto',
        explicacion: 'Tener intención de comprar no equivale a contar con crédito aprobado o recursos disponibles. Durante el proceso pueden aparecer restricciones bancarias o de capacidad de pago.',
        rednorte: 'Buscamos conocer desde temprano la forma de pago y la preparación financiera del interesado, sin prometer aprobación de crédito.'
      },
      {
        titulo: 'Aparecieron pendientes documentales o condiciones inesperadas',
        explicacion: 'Gravámenes, documentación, plazos de entrega, reparaciones o acuerdos poco claros pueden detener una operación avanzada.',
        rednorte: 'Identificamos aspectos comerciales y documentales que requieren atención, y coordinamos las gestiones con los especialistas correspondientes.'
      },
      {
        titulo: 'Faltó claridad o seguimiento a los acuerdos',
        explicacion: 'Una oferta aceptada todavía requiere coordinación. Si las partes tienen expectativas diferentes o no se atienden pendientes, la operación puede perder impulso.',
        rednorte: 'Ayudamos a ordenar condiciones, comunicación y seguimiento durante el proceso comercial, dentro de nuestro ámbito de actuación.'
      }
    ],
    revision: 'Revisaríamos la etapa y la causa de la caída, los pendientes a resolver y la preparación para una nueva negociación.'
  }
];

export function escenarioPorId(id) {
  return escenariosVenta.find((item) => item.id === id) || null;
}
