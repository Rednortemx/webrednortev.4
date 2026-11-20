import PropertySearchAssistant from './PropertySearchAssistant';
import styles from './PilotLanding.module.css';

export default function PilotLandingHero({ live, propertyCount, filters, previewOnly = false }) {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.topline}>
          <p className={styles.eyebrow}>Monterrey · Nuevo León</p>
          {live && (
            <span className={styles.availability}>
              <span aria-hidden="true" />
              {propertyCount} {propertyCount === 1 ? 'casa en el catálogo' : 'casas en el catálogo'}
            </span>
          )}
        </div>
        <h1>Casas en venta <span>en Monterrey.</span></h1>
        <div className={styles.bottomline}>
          <p className={styles.description}>
            {live
              ? 'Compara zonas, precios y espacios. Encuentra una casa que se adapte a ti.'
              : 'Inventario en actualización. Un asesor puede ayudarte a continuar tu búsqueda.'}
          </p>
          <div className={styles.actions}>
            {live && propertyCount > 0 && (
              <a href="#impulsa-catalogo" className={styles.cta}>
                Ver casas
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 4v16m-6-6 6 6 6-6" />
                </svg>
              </a>
            )}
            <PropertySearchAssistant variant="hero" filters={filters} previewOnly={previewOnly} />
          </div>
        </div>
      </div>
    </header>
  );
}
