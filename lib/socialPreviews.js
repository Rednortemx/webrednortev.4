export const SOCIAL_PREVIEW_VERSION = '20261017';

export const SOCIAL_PREVIEWS = {
  home: {
    eyebrow: 'REDNORTE INMOBILIARIA',
    title: 'Compra, vende, renta e invierte en Monterrey',
    description: 'Asesoría inmobiliaria residencial, comercial e industrial en Nuevo León.',
    accent: '#a04e22',
    panel: '#6b2737',
    mark: 'RN',
    visualLabel: 'MONTERREY · NUEVO LEÓN',
  },
  propiedades: {
    eyebrow: 'COLECCIÓN REDNORTE',
    title: 'Propiedades en venta y renta',
    description: 'Casas, departamentos y espacios comerciales e industriales en Monterrey y Nuevo León.',
    accent: '#b45f32',
    panel: '#442a1d',
    mark: '600',
    visualLabel: 'INVENTARIO ACTIVO',
  },
  luxury: {
    eyebrow: 'SELECCIÓN EDITORIAL',
    title: 'Luxury Properties',
    description: 'Casas, departamentos y quintas desde $10 M, seleccionadas por Rednorte.',
    accent: '#c9a467',
    panel: '#171411',
    mark: 'LUX',
    visualLabel: 'DESDE $10 M',
  },
  estimacion: {
    eyebrow: 'HERRAMIENTA GRATUITA',
    title: 'Estima el valor de tu propiedad',
    description: 'Obtén un rango comercial orientativo con referencias comparables del mercado.',
    accent: '#c4622d',
    panel: '#4f2730',
    mark: '$',
    visualLabel: 'RESULTADO INMEDIATO',
  },
  vendibilidad: {
    eyebrow: 'DIAGNÓSTICO INMOBILIARIO',
    title: 'Descubre qué está frenando tu venta',
    description: 'Evalúa precio, presentación, exposición y preparación en menos de 2 minutos.',
    accent: '#9b5d3c',
    panel: '#263d36',
    mark: '10',
    visualLabel: 'PREGUNTAS CLAVE',
  },
  insights: {
    eyebrow: 'REDNORTE INSIGHTS',
    title: 'Inteligencia inmobiliaria local',
    description: 'Análisis, guías y datos para tomar mejores decisiones en Monterrey y Nuevo León.',
    accent: '#b45f32',
    panel: '#27374a',
    mark: 'IN',
    visualLabel: 'ANÁLISIS · GUÍAS · DATOS',
  },
  contacto: {
    eyebrow: 'HABLEMOS DE TU OPERACIÓN',
    title: 'Una conversación clara es el mejor primer paso',
    description: 'Cuéntanos qué necesitas y te orientaremos con el siguiente paso adecuado.',
    accent: '#c4622d',
    panel: '#5b2a36',
    mark: '↗',
    visualLabel: 'RESPUESTA EN MENOS DE 2 H',
  },
  reportes: {
    eyebrow: 'REDNORTE DATA',
    title: 'Reportes inmobiliarios con contexto',
    description: 'Datos propios y metodología visible sobre el mercado de Monterrey y Nuevo León.',
    accent: '#b45f32',
    panel: '#243643',
    mark: 'DATA',
    visualLabel: 'INVESTIGACIÓN LOCAL',
  },
};

export function getSocialPreview(key) {
  return SOCIAL_PREVIEWS[key] || SOCIAL_PREVIEWS.home;
}

export function socialPreviewImage(key) {
  return `/api/social-image/${key}?v=${SOCIAL_PREVIEW_VERSION}`;
}

export function socialMetadata(key, url, type = 'website') {
  const preview = getSocialPreview(key);
  const image = socialPreviewImage(key);

  return {
    openGraph: {
      title: preview.title,
      description: preview.description,
      url,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: preview.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: preview.title,
      description: preview.description,
      images: [image],
    },
  };
}
