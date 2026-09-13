'use client';

// Enlace del footer que vuelve a abrir el banner de cookies para cambiar la
// elección guardada. Es un botón y no un <a> porque no navega a ningún lado;
// se le da el mismo aspecto que a los demás enlaces del pie.
export default function CookiePrefsLink({ className, style, appearance = 'link' }) {
  const resetStyle = appearance === 'button'
    ? {}
    : { background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' };

  return (
    <button
      type="button"
      className={className}
      style={{ ...resetStyle, ...style }}
      onClick={() => window.dispatchEvent(new CustomEvent('rn:abrir-cookies'))}
    >
      Preferencias de cookies
    </button>
  );
}
