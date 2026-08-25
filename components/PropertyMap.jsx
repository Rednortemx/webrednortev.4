// Mapa de la ficha de propiedad.
//
// Antes esto era un recuadro verde fijo con el nombre de la zona escrito
// encima: no era un mapa, solo lo parecía. Ahora se incrusta Google Maps
// centrado en las coordenadas que NOCNOK guarda para cada propiedad
// (geolocation.lat/lon), y el visitante puede moverlo y hacer zoom.
//
// El embed de Google Maps no necesita API key — es el mismo método que ya
// usa la página de Contacto. Unas pocas propiedades no traen coordenadas en
// el CRM; en esas se cae a una búsqueda por texto de la zona, con menos
// zoom, para al menos ubicar el sector.

export default function PropertyMap({ property }) {
  const hasCoords = Number.isFinite(property.lat) && Number.isFinite(property.lng);
  const query = hasCoords ? `${property.lat},${property.lng}` : (property.zone || '');

  if (!query) return null;

  const zoom = hasCoords ? 16 : 13;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

  return (
    <>
      <p className="prop-section-title">{hasCoords ? 'Ubicación' : 'Ubicación aproximada'}</p>
      <div className="prop-map">
        <iframe
          src={embedSrc}
          title={`Mapa de ${property.title}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="prop-map-caption">{property.zone}</p>
    </>
  );
}
