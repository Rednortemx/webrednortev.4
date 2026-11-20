import PropertySearchAssistant from './PropertySearchAssistant';
import styles from './PilotLanding.module.css';

export default function PilotLandingHero({ live, propertyCount }) {
  return (
    <header className={styles.hero}>
      <div className={styles.orbit} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span /> MONTERREY · NUEVO LEÓN</p>
          <h1>Casas en venta <span>en Monterrey.</span></h1>
          <p className={styles.description}>
            Una forma más clara de encontrar tu próximo hogar. Explora las casas publicadas,
            compara precios y zonas, y descubre opciones que se adapten a lo que necesitas.
          </p>
          <div className={styles.actions}>
            <a href="#impulsa-catalogo" className={styles.cta}>Explorar casas <span>↗</span></a>
            <span className={styles.available}>
              <i aria-hidden="true" />
              {live
                ? `${propertyCount} ${propertyCount === 1 ? 'casa publicada' : 'casas publicadas'} en este filtro`
                : 'Inventario en actualización: no mostramos propiedades sin verificar'}
            </span>
          </div>
          <p className={styles.note}>Tu búsqueda es importante. Si no encuentras la casa correcta, te ayudamos a explorar otras opciones.</p>
        </div>
        <div className={styles.panel}>
          <div className={styles.label}><span>REDNORTE · BÚSQUEDA ASISTIDA</span><b>✳</b></div>
          <h2>No solo busques casas. <em>Encuentra la indicada.</em></h2>
          <div className={styles.steps}>
            <div><span>01</span> Explora el catálogo</div>
            <div><span>02</span> Define tus prioridades</div>
            <div><span>03</span> Recibe orientación real</div>
          </div>
          <PropertySearchAssistant variant="hero" />
        </div>
      </div>
      <div className={styles.bottom}><span>REDNORTE INMOBILIARIA</span><span>EXPLORA · COMPARA · DECIDE</span></div>
    </header>
  );
}
