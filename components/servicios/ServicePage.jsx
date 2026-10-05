// Envoltura comun de las tres paginas de servicio nuevas (estimacion de
// valor, inmobiliaria comercial e inmobiliaria industrial).
//
// El contenido llega como HTML y se inserta con dangerouslySetInnerHTML, asi
// que queda en el HTML que sirve el servidor: Google lo lee completo y los
// enlaces internos se rastrean igual que si fueran JSX.
//
// Los estilos se entregan con el HTML del servidor. Así la página llega
// diseñada desde el primer render y no depende de un efecto posterior a la
// hidratación para evitar destellos sin formato.
export default function ServicePage({ contenido, estilos, className }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: estilos }} />
      <div className={className} dangerouslySetInnerHTML={{ __html: contenido }} />
    </>
  );
}
