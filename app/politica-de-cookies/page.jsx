import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import CookiePrefsLink from '@/components/CookiePrefsLink';

export const metadata = {
  title: 'Política de Cookies y Tecnologías',
  description: 'Tecnologías utilizadas en rednorte.mx, sus proveedores, finalidades y controles de privacidad.',
  alternates: { canonical: '/politica-de-cookies' },
};

export default function PoliticaCookiesPage() {
  return (
    <div className="page-content">
      <Breadcrumb items={[{ label: 'Política de cookies y tecnologías' }]} />
      <div className="legal-page">
        <h1>Política de Cookies y Tecnologías</h1>
        <p className="legal-date">Última actualización: 13 de septiembre de 2026</p>

        <div className="legal-section">
          <p>Esta Política explica las tecnologías que utiliza rednorte.mx, operado por Red de Administración y Compraventa, S.A. de C.V., bajo el nombre comercial Rednorte Inmobiliaria, y los controles disponibles para cada visitante.</p>
          <p>Complementa nuestro <Link href="/aviso-de-privacidad" style={{ color: 'var(--terracota)' }}>Aviso de Privacidad Integral</Link>.</p>
        </div>

        <div className="legal-section">
          <h2>I. Elección del visitante</h2>
          <p>En la primera visita se muestran dos opciones con el mismo nivel de acceso:</p>
          <ul>
            <li><strong>Solo necesarias:</strong> mantiene desactivados Vercel Web Analytics, Google Maps incrustado y las reseñas cargadas mediante Trustindex.</li>
            <li><strong>Permitir opcionales:</strong> permite la medición estadística y la carga de dichos contenidos externos.</li>
          </ul>
          <p>No se activan tecnologías opcionales por el simple hecho de continuar navegando. La elección puede modificarse en cualquier momento.</p>
          <CookiePrefsLink className="legal-preferences-button" appearance="button" />
        </div>

        <div className="legal-section">
          <h2>II. Inventario vigente</h2>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead><tr><th>Tecnología</th><th>Proveedor</th><th>Finalidad</th><th>Activación</th></tr></thead>
              <tbody>
                <tr>
                  <td>Almacenamiento local <code>rn:privacy-consent</code></td>
                  <td>Rednorte</td>
                  <td>Recordar la preferencia de privacidad. Conserva la opción, versión y fecha de actualización hasta que el visitante la cambie o elimine los datos del navegador.</td>
                  <td>Necesaria</td>
                </tr>
                <tr>
                  <td>Vercel Web Analytics</td>
                  <td>Vercel</td>
                  <td>Medir de forma agregada páginas visitadas, procedencia, zona geográfica aproximada y características técnicas del dispositivo. Rednorte elimina parámetros y fragmentos de la URL antes del envío.</td>
                  <td>Opcional</td>
                </tr>
                <tr>
                  <td>Mapa incrustado</td>
                  <td>Google Maps</td>
                  <td>Mostrar la oficina o la ubicación aproximada de una propiedad.</td>
                  <td>Opcional</td>
                </tr>
                <tr>
                  <td>Widget de reseñas</td>
                  <td>Trustindex / Google</td>
                  <td>Mostrar reseñas públicas de clientes.</td>
                  <td>Opcional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="legal-section">
          <h2>III. Analítica</h2>
          <p>Vercel Web Analytics no utiliza cookies de terceros. De acuerdo con la documentación del proveedor, genera estadísticas anónimas y agregadas; la identificación temporal del visitante se basa en un hash derivado de la solicitud y la sesión se descarta después de 24 horas.</p>
          <p>Puede procesar fecha y hora, ruta visitada, página de procedencia, ubicación geográfica aproximada, sistema operativo, navegador y tipo de dispositivo. Rednorte no envía datos de formularios como nombre, teléfono, correo electrónico o mensajes a esta herramienta.</p>
        </div>

        <div className="legal-section">
          <h2>IV. Contenido externo</h2>
          <p>Los mapas y las reseñas permanecen sustituidos por un aviso local hasta que el visitante permita los servicios opcionales. También es posible abrir Google Maps o consultar Google mediante un enlace externo; en ese caso aplican directamente las políticas del proveedor.</p>
          <p>Una vez permitido el contenido externo, Google o Trustindex pueden recibir información técnica de la conexión y utilizar sus propias tecnologías conforme a sus políticas.</p>
        </div>

        <div className="legal-section">
          <h2>V. Tecnologías no activas</h2>
          <p>Actualmente rednorte.mx no integra píxeles publicitarios, remarketing, Meta Pixel, Google Analytics, Microsoft Clarity ni cookies publicitarias propias. Si se incorpora alguna de estas herramientas, se actualizará este inventario y se solicitará la elección correspondiente antes de activarla.</p>
        </div>

        <div className="legal-section">
          <h2>VI. Cómo cambiar o eliminar la elección</h2>
          <p>El enlace “Preferencias de cookies” del pie del sitio vuelve a abrir el panel. El visitante también puede borrar el almacenamiento local desde la configuración de su navegador; en la siguiente visita se solicitará una nueva elección.</p>
          <p>Rechazar las tecnologías opcionales no impide consultar propiedades, utilizar herramientas, enviar formularios ni contactar a Rednorte. Únicamente mantiene bloqueados la analítica, los mapas incrustados y las reseñas externas.</p>
        </div>

        <div className="legal-section">
          <h2>VII. Cambios y contacto</h2>
          <p>Este inventario se actualizará cuando se incorporen, sustituyan o retiren proveedores o tecnologías.</p>
          <ul>
            <li><strong>Responsable:</strong> Red de Administración y Compraventa, S.A. de C.V.</li>
            <li><strong>Nombre comercial:</strong> Rednorte Inmobiliaria</li>
            <li><strong>Domicilio:</strong> Av. José Vasconcelos Ote. 215-7, Residencial San Agustín 1er Sector, C.P. 66260, San Pedro Garza García, Nuevo León.</li>
            <li><strong>Teléfono:</strong> +52 81 1778 3953</li>
            <li><strong>Correo electrónico:</strong> admin@rednorte.com.mx</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
