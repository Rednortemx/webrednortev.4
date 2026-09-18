import Link from 'next/link';
import PreferredSourceBadge from '@/components/PreferredSourceBadge';
import Breadcrumb from '@/components/Breadcrumb';
import { rednorteReport2026V2 as report } from '@/lib/rednorteReport2026V2';
import { serializeJsonLd } from '@/lib/security';

export const metadata = {
  title: 'Reporte inmobiliario Monterrey y Nuevo León 2026',
  description:
    'Reporte Rednorte 2026 con inventario activo, señales de interés, índice de concentración, municipios, tipos de propiedad, canales y patrones operativos en Monterrey y Nuevo León.',
  alternates: { canonical: '/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026' },
  openGraph: {
    title: 'Reporte inmobiliario Rednorte — Monterrey y Nuevo León 2026',
    description:
      '553 propiedades activas, 11,317 registros de interés y un análisis propio de concentración por operación, municipio y tipo de propiedad.',
    url: '/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026',
    type: 'article',
  },
};

function Money({ value }) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency', currency: 'MXN', maximumFractionDigits: 0,
  }).format(value);
}

function IndexBadge({ value }) {
  const cls = value >= 1.15 ? 'report-index-high' : value <= .85 ? 'report-index-low' : 'report-index-neutral';
  return <span className={`report-index-badge ${cls}`}>{value.toFixed(2)}x</span>;
}

function IndexTable({ rows, label }) {
  return (
    <div className="report-table-wrap">
      <table className="report-data-table">
        <caption className="report-sr-only">
          Índice de concentración de interés por {label.toLowerCase()}
        </caption>
        <thead>
          <tr>
            <th>{label}</th>
            <th>Inventario</th>
            <th>% inventario</th>
            <th>Interés vinculado</th>
            <th>% interés</th>
            <th>Índice</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.segment}>
              <td><strong>{row.segment}</strong></td>
              <td>{row.inventory.toLocaleString('es-MX')}</td>
              <td>{row.inventoryPct.toFixed(1)}%</td>
              <td>{row.interest.toLocaleString('es-MX')}</td>
              <td>{row.interestPct.toFixed(1)}%</td>
              <td><IndexBadge value={row.index} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Report',
      '@id': 'https://www.rednorte.mx/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026#report',
      url: 'https://www.rednorte.mx/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026',
      headline: report.title,
      description:
        'Análisis agregado del inventario activo, registros de interés y actividad operativa observada por Rednorte, complementado con fuentes públicas.',
      inLanguage: 'es-MX',
      datePublished: '2026-09-14',
      dateModified: '2026-09-14',
      temporalCoverage: '2026-01-01/2026-09-09',
      spatialCoverage: { '@type': 'Place', name: 'Monterrey y Nuevo León' },
      author: { '@type': 'Organization', '@id': 'https://www.rednorte.mx/#organization', name: 'Rednorte Inmobiliaria' },
      publisher: { '@id': 'https://www.rednorte.mx/#organization' },
      keywords: [
        'mercado inmobiliario Monterrey 2026',
        'inventario inmobiliario Monterrey',
        'demanda inmobiliaria Monterrey',
        'renta Monterrey',
        'venta de propiedades Monterrey',
        'Nuevo León bienes raíces',
      ],
    },
    {
      '@type': 'Dataset',
      '@id': 'https://www.rednorte.mx/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026#dataset',
      name: 'Resumen agregado Rednorte 2026 — V2 analítica',
      description:
        'Dataset agregado utilizado para analizar inventario activo, registros de interés vinculados, concentración por municipio y tipo, y patrones operativos.',
      version: '2026.1',
      creator: { '@id': 'https://www.rednorte.mx/#organization' },
      temporalCoverage: '2026-01-01/2026-09-09',
      spatialCoverage: 'Nuevo León, México',
      measurementTechnique:
        'Cruce agregado de exportes de inventario, interesados activos, interesados perdidos y transacciones de Rednorte mediante Código Nocnok y campos operativos.',
      variableMeasured: [
        { '@type': 'PropertyValue', name: 'Propiedades activas', value: 553 },
        { '@type': 'PropertyValue', name: 'Registros de interés 2026', value: 11317 },
        { '@type': 'PropertyValue', name: 'Registros de interés vinculados a inventario activo', value: 2965 },
        { '@type': 'PropertyValue', name: 'Propiedades activas con al menos un registro de interés', value: 390 },
        { '@type': 'PropertyValue', name: 'Índice de concentración de renta', value: 1.18 },
        { '@type': 'PropertyValue', name: 'Índice de concentración de casas', value: 1.47 },
      ],
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'text/csv',
          contentUrl: 'https://www.rednorte.mx/data/reporte-rednorte-2026-v2.csv',
        },
        {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: 'https://www.rednorte.mx/data/reporte-rednorte-2026-v2.json',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
        { '@type': 'ListItem', position: 2, name: 'Reportes', item: 'https://www.rednorte.mx/reportes' },
        { '@type': 'ListItem', position: 3, name: 'Reporte inmobiliario 2026', item: 'https://www.rednorte.mx/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026' },
      ],
    },
  ],
};

export default function ReporteRednorte2026V2() {
  const u = report.universe;
  const c = report.concentration;

  return (
    <div className="report-page">
      <Breadcrumb items={[{ label: 'Reportes', href: '/reportes' }, { label: 'Reporte inmobiliario 2026' }]} />

      <section className="report-hero">
        <div className="report-shell">
          <div className="report-edition">{report.edition}</div>
          <p className="report-eyebrow report-eyebrow-light">REDNORTE DATA · CORTE {report.cutoff.toUpperCase()}</p>
          <h1>{report.title}</h1>
          <p className="report-lead">
            Una radiografía del inventario, señales de interés y actividad observada por Rednorte.
            Esta versión cruza inventario e interacciones para identificar dónde se concentra el
            interés relativo, sin presentarlo como un censo del mercado.
          </p>

          <div className="report-hero-kpis">
            <div><strong>{u.activeProperties}</strong><span>propiedades activas</span></div>
            <div><strong>{u.interestRecords2026.toLocaleString('es-MX')}</strong><span>registros de interés en 2026</span></div>
            <div><strong>{u.linkedInterestRecords.toLocaleString('es-MX')}</strong><span>registros vinculados a inventario aún activo</span></div>
            <div><strong>{c.activeWithInterestPct}%</strong><span>del inventario activo con al menos una interacción 2026</span></div>
          </div>
        </div>
      </section>

      <nav className="report-index" aria-label="Secciones del reporte">
        <div className="report-shell">
          <span>En este reporte</span>
          <div>
            <a href="#hallazgos">Hallazgos</a>
            <a href="#indice">Índice</a>
            <a href="#municipios">Municipios</a>
            <a href="#tipos">Tipos</a>
            <a href="#concentracion">Concentración</a>
            <a href="#transacciones">Transacciones</a>
            <a href="#metodologia">Metodología</a>
            <a href="#fuentes">Fuentes</a>
          </div>
        </div>
      </nav>

      <section className="report-section" id="hallazgos">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">RESUMEN EJECUTIVO</p>
            <h2>Seis hallazgos propios que ya podemos medir</h2>
          </div>
          <div className="report-findings">
            {report.headlineFindings.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="report-method-summary" id="indice">
        <div className="report-shell report-method-card">
          <div>
            <p className="report-eyebrow report-eyebrow-light">NUEVA MÉTRICA</p>
            <h2>Índice de concentración de interés Rednorte</h2>
          </div>
          <div>
            <p>
              Compara la participación de cada segmento dentro del interés vinculado con su
              participación dentro del inventario activo.
            </p>
            <div className="report-formula">
              Índice = % de interés vinculado ÷ % de inventario activo
            </div>
            <p className="report-small-light">
              1.00x = proporcional. Más de 1.00x = el interés está relativamente más concentrado.
              Menos de 1.00x = está relativamente menos concentrado. No es una tasa de conversión,
              plusvalía ni “demanda de mercado”.
            </p>
          </div>
        </div>
      </section>

      <section className="report-section report-soft" id="operacion">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">RENTA VS. VENTA</p>
            <h2>La renta sobre-indexa en interés dentro del inventario que sigue activo</h2>
            <p>
              Para esta comparación usamos solamente los 2,965 registros de interés 2026 que
              pueden cruzarse por Código Nocnok con una propiedad que continúa activa al corte.
            </p>
          </div>
          <IndexTable rows={report.operationIndex} label="Operación" />
          <div className="report-insight-callout">
            <strong>Lectura:</strong> renta representa 51.4% del inventario actual, pero 60.4% del
            interés vinculado. Su índice es 1.18x. Venta queda en 0.81x.
          </div>
        </div>
      </section>

      <section className="report-section" id="municipios">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">POR MUNICIPIO</p>
            <h2>San Pedro, San Nicolás y Escobedo concentran más interés relativo</h2>
            <p>
              Para reducir distorsiones, la tabla muestra únicamente municipios con al menos 10
              propiedades activas. En municipios con bases pequeñas, el índice puede moverse con
              pocas propiedades particularmente populares.
            </p>
          </div>
          <IndexTable rows={report.municipalityIndex} label="Municipio" />
          <div className="report-caution">
            <b>Importante:</b> Escobedo (10 propiedades) y San Nicolás (14) tienen bases pequeñas.
            Sus índices altos son una señal para investigar, no una conclusión sobre todo el
            mercado municipal.
          </div>
        </div>
      </section>

      <section className="report-section report-soft" id="tipos">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">POR TIPO DE PROPIEDAD</p>
            <h2>Casas y departamentos concentran más interés relativo que su peso en inventario</h2>
            <p>Se muestran tipos con al menos 20 propiedades activas.</p>
          </div>
          <IndexTable rows={report.typeIndex} label="Tipo" />
        </div>
      </section>

      <section className="report-section report-dark" id="concentracion">
        <div className="report-shell">
          <div className="report-heading report-heading-light">
            <p className="report-eyebrow report-eyebrow-light">CONCENTRACIÓN DE INTERÉS</p>
            <h2>El interés no se distribuye de forma uniforme entre las propiedades</h2>
          </div>

          <div className="report-concentration-grid">
            <article>
              <strong>{c.activeWithInterestPct}%</strong>
              <span>{c.activeWithInterest} de {u.activeProperties} propiedades activas tuvieron al menos un registro de interés 2026</span>
            </article>
            <article>
              <strong>{c.top10InterestShare}%</strong>
              <span>del interés vinculado se concentra en el 10% superior del inventario ({c.top10PctInventoryCount} propiedades)</span>
            </article>
            <article>
              <strong>{c.top20InterestShare}%</strong>
              <span>del interés vinculado se concentra en el 20% superior del inventario ({c.top20PctInventoryCount} propiedades)</span>
            </article>
          </div>

          <p className="report-dark-note">
            Las {c.activeWithoutLinkedInterest} propiedades sin un registro vinculado no deben interpretarse como “sin demanda”:
            no contamos todavía con fecha de alta comparable, por lo que algunas pueden ser
            publicaciones recientes.
          </p>
        </div>
      </section>

      <section className="report-section" id="universo">
        <div className="report-shell report-grid-2">
          <div>
            <p className="report-eyebrow">UNIVERSO DE INTERÉS</p>
            <h2>{u.interestRecords2026.toLocaleString('es-MX')} interacciones en 2026, pero solo {u.linkedInterestRecords.toLocaleString('es-MX')} pertenecen al inventario que sigue activo</h2>
            <p className="report-copy">
              Los otros {u.unlinkedOrInactiveInterestRecords.toLocaleString('es-MX')} registros están asociados a propiedades que ya no aparecen en el
              snapshot activo o que no pudieron cruzarse con ese inventario. No asumimos que esas
              propiedades se vendieron o rentaron.
            </p>
          </div>
          <div className="report-card">
            <div className="report-big-split">
              <div><strong>26.2%</strong><span>interés 2026 vinculado al inventario activo actual</span></div>
              <div><strong>73.8%</strong><span>interés histórico 2026 fuera del snapshot activo actual</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="report-section report-soft" id="canales">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">CANALES</p>
            <h2>Inmuebles24 concentra 66.3% de los registros de interés 2026</h2>
            <p>
              La atribución corresponde al origen registrado por el CRM. Sirve para entender el
              ecosistema de captación digital de Rednorte, no para comparar tráfico total de los portales.
            </p>
          </div>
          <div className="report-channel-grid">
            {report.demand.sources.map((s) => (
              <article key={s.source}><strong>{s.pct}%</strong><span>{s.source}</span></article>
            ))}
          </div>
        </div>
      </section>

      <section className="report-section" id="renta-publicada">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">RENTA PUBLICADA</p>
            <h2>Mediana mensual dentro del inventario activo</h2>
            <p>Precios publicados por Rednorte; no son rentas de cierre ni medianas del mercado completo.</p>
          </div>
          <div className="report-rent-grid">
            {report.rentMedians.map((item) => (
              <article key={item.type}>
                <span>{item.type}</span>
                <strong><Money value={item.value} /></strong>
                <small>mediana mensual publicada</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="report-section report-soft" id="transacciones">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">PATRONES DEL EXPORT DE TRANSACCIONES</p>
            <h2>Limpiamos duplicados antes de interpretar colaboración y mezcla de cierres</h2>
            <p>
              El archivo contiene 281 filas con fecha de cierre 2026. Identificamos seis pares que
              describen el mismo cierre compartido desde ambos lados; al agrupar por fecha,
              municipio, colonia, operación, valor y tipo quedan 275 grupos identificables.
            </p>
          </div>
          <div className="report-transaction-grid">
            <article><strong>60.0%</strong><span>de los grupos identificables están marcados como compartidos</span></article>
            <article><strong>89.5%</strong><span>de los grupos corresponden a casas o departamentos</span></article>
            <article><strong>46.5%</strong><span>de los grupos están registrados en Monterrey</span></article>
          </div>
          <p className="report-note">
            No usamos 275 como total corporativo de cierres porque el export disponible no concilia
            por completo con el consolidado corporativo. Aquí lo usamos únicamente para describir patrones.
          </p>
        </div>
      </section>

      <section className="report-section report-dark" id="contexto">
        <div className="report-shell">
          <div className="report-heading report-heading-light">
            <p className="report-eyebrow report-eyebrow-light">CONTEXTO EXTERNO 2026</p>
            <h2>Lo que ocurre fuera del universo Rednorte</h2>
          </div>
          <div className="report-external-grid">
            {report.external.map((item) => (
              <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>{item.source} ↗</small>
              </a>
            ))}
          </div>
          <p className="report-dark-note">
            Los indicadores externos describen mercados agregados. No se mezclan con el universo
            Rednorte para calcular el índice de concentración.
          </p>
        </div>
      </section>

      <section className="report-section" id="calidad">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">CALIDAD Y USO DEL DATO</p>
            <h2>Qué métricas pueden citarse y cuáles requieren cautela</h2>
          </div>
          <div className="report-table-wrap">
            <table className="report-data-table report-quality-table">
              <caption className="report-sr-only">Calidad y uso recomendado de las métricas del reporte</caption>
              <thead><tr><th>Métrica</th><th>Uso recomendado</th><th>Nota</th></tr></thead>
              <tbody>
                {report.dataUse.map((row) => (
                  <tr key={row.metric}>
                    <td><strong>{row.metric}</strong></td>
                    <td><span className="report-status">{row.status}</span></td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="report-methodology report-soft" id="metodologia">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">METODOLOGÍA</p>
            <h2>Cómo construimos la V2</h2>
          </div>
          <div className="report-method-grid">
            <article>
              <h3>1. Inventario activo</h3>
              <p>Se utilizaron 553 códigos Nocnok únicos del snapshot disponible al 9 de septiembre de 2026.</p>
            </article>
            <article>
              <h3>2. Interacciones 2026</h3>
              <p>Se combinaron interesados activos y perdidos con fecha 2026: 11,317 registros.</p>
            </article>
            <article>
              <h3>3. Cruce por propiedad</h3>
              <p>2,965 registros pudieron vincularse por Código Nocnok con 390 propiedades que siguen activas.</p>
            </article>
            <article>
              <h3>4. Índice</h3>
              <p>Se divide la participación del interés vinculado entre la participación del inventario activo.</p>
            </article>
            <article>
              <h3>5. Concentración</h3>
              <p>Se ordenaron las 553 propiedades por número de registros vinculados para calcular participación del top 10% y top 20%.</p>
            </article>
            <article>
              <h3>6. Transacciones</h3>
              <p>Se agruparon duplicados evidentes por fecha, municipio, colonia, operación, valor y tipo. El export se usa para patrones, no para el total corporativo.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="report-section" id="descargas">
        <div className="report-shell report-grid-2">
          <div>
            <p className="report-eyebrow">CÓMO CITAR ESTE REPORTE</p>
            <h2>Una referencia clara para terceros y motores de respuesta</h2>
            <div className="report-citation-box">
              Rednorte Inmobiliaria. <i>Reporte inmobiliario Rednorte — Monterrey y Nuevo León 2026.</i>
              Primera edición, corte al 9 de septiembre de 2026.
            </div>
          </div>
          <div className="report-card">
            <p className="report-eyebrow">DATOS DESCARGABLES</p>
            <p className="report-copy">
              Publicamos únicamente métricas agregadas; no se incluyen nombres, teléfonos,
              correos, direcciones exactas ni datos personales de clientes o prospectos.
            </p>
            <div className="report-downloads">
              <a href="/data/reporte-rednorte-2026-v2.csv">Descargar CSV</a>
              <a href="/data/reporte-rednorte-2026-v2.json">Ver JSON</a>
            </div>
          </div>
        </div>
      </section>

      <section className="report-section report-soft" id="preguntas">
        <div className="report-shell">
          <div className="report-heading">
            <p className="report-eyebrow">PREGUNTAS SOBRE LA METODOLOGÍA</p>
            <h2>Cómo interpretar correctamente los resultados</h2>
          </div>
          <div className="report-faqs">
            <details><summary>¿Este reporte representa todo el mercado de Monterrey?</summary><p>No. Describe el universo observado por Rednorte y lo contextualiza con fuentes externas.</p></details>
            <details><summary>¿Un registro de interés equivale a una persona?</summary><p>No necesariamente. Una persona puede preguntar por varias propiedades o aparecer varias veces. Por eso hablamos de interacciones.</p></details>
            <details><summary>¿Qué significa un índice de 1.47x?</summary><p>Que ese segmento concentra 47% más participación en el interés vinculado que la participación que tiene dentro del inventario activo. No significa que tenga 47% más demanda de mercado ni que vaya a venderse más rápido.</p></details>
            <details><summary>¿Por qué no se publican precios de venta activos?</summary><p>Porque el campo requiere normalización adicional. Preferimos omitir una métrica antes que publicar una comparación inconsistente.</p></details>
            <details><summary>¿Las 1,264 propiedades no publicadas se consideran cierres?</summary><p>No. Se excluyen hasta reconciliar si salieron por venta, renta, retiro, vencimiento, duplicado u otra causa.</p></details>
          </div>
        </div>
      </section>

      <section className="report-sources" id="fuentes">
        <div className="report-shell">
          <p className="report-eyebrow">FUENTES</p>
          <h2>Datos propios y contexto público</h2>
          <ul>
            <li>Rednorte Inmobiliaria — inventario activo, corte 9 de septiembre de 2026.</li>
            <li>Rednorte CRM — interesados activos y perdidos de 2026.</li>
            <li>Rednorte Inmobiliaria — export de transacciones y consolidado corporativo.</li>
            <li><a href="https://www.gob.mx/shf/prensa/indice-shf-de-precios-de-la-vivienda-en-mexico-segundo-trimestre-de-2026-432219" target="_blank" rel="noopener noreferrer">Sociedad Hipotecaria Federal — Índice SHF 2T 2026.</a></li>
            <li><a href="https://www.nl.gob.mx/es/boletines/nuevo-leon-es-primer-lugar-nacional-en-inversion-anunciada" target="_blank" rel="noopener noreferrer">Gobierno de Nuevo León — inversión anunciada enero-julio 2026.</a></li>
            <li><a href="https://www.colliers.com/es-mx/investigacion/monterrey/overview-mercado-industrial-monterrey-2t-2026" target="_blank" rel="noopener noreferrer">Colliers — mercado industrial Monterrey 2T 2026.</a></li>
          </ul>
        </div>
      </section>

      <section className="report-final-cta">
        <div className="report-shell report-final-card">
          <div>
            <p className="report-eyebrow report-eyebrow-light">SIGUIENTE EDICIÓN</p>
            <h2>La V3 puede incorporar velocidad y precio</h2>
            <p>
              Cuando tengamos fecha de alta, historial de precios y causa de salida de las 1,264
              propiedades no publicadas podremos medir días en mercado, ajustes de precio y
              lifecycle del inventario.
            </p>
          </div>
          <div className="report-final-actions">
            <Link href="/insights">Explorar Insights</Link>
            <Link href="/contacto">Hablar con Rednorte</Link>
          </div>
        </div>
      </section>

      <section className="report-preferred-source">
        <div className="report-shell">
          <PreferredSourceBadge />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    </div>
  );
}
