# Rednorte Impulsa — atribución de campañas (emergencia)

Esta entrega **no crea anuncios, no aumenta presupuesto ni asigna leads al CRM**.
Aprovecha el flujo de `/api/leads` → Apps Script → hoja existente.

## Formato de enlaces de anuncios
Usar parámetros UTM fijos, sin datos personales ni identificadores del visitante.

- Google Search: `https://www.rednorte.mx/servicios/comprar-propiedad?utm_source=google&utm_medium=cpc&utm_campaign=impulsa_busqueda_compra_2026`
- Google renta (interesados en encontrar renta; solución provisional): `https://www.rednorte.mx/contacto?motivo=rentar&utm_source=google&utm_medium=cpc&utm_campaign=impulsa_renta_2026`
- Meta: `https://www.rednorte.mx/contacto?utm_source=meta&utm_medium=paid_social&utm_campaign=impulsa_propiedades_2026`

Cuando una persona envía un formulario desde **esa misma página** con parámetros UTM, el servidor antepone a las notas una leyenda como:

`[Rednorte Impulsa] fuente=google; medio=cpc; campana=impulsa_busqueda_compra_2026; pagina=/servicios/comprar-propiedad`

No cambia el esquema de Google Sheets: la leyenda viaja dentro de las notas existentes
(actualmente visibles en la columna `Herramienta`, junto al contenido del formulario).

**Nota:** `/servicios/rentar-propiedad` está dirigida a propietarios que quieren rentar **su inmueble**; no debe utilizarse como destino de campañas para buscar inquilinos. Hasta tener una landing específica de arrendatarios, usar `/contacto?motivo=rentar`.

## Limitaciones y protección de datos
- Si el visitante navega a otra página antes de enviar la solicitud, la atribución
  inicial puede perderse. No se usan cookies, almacenamiento de sesión ni seguimiento
  entre páginas en esta primera versión.
- La etiqueta indica *origen de solicitud*, no conversación efectivamente iniciada,
  visita, cierre ni retorno.
- Se descartan `gclid`, `fbclid`, correos, teléfonos y cualquier parámetro ajeno
  a `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` y `utm_term`.
- Sólo se acepta el `Referer` del mismo dominio que el POST; sin él no se atribuye.
- No se altera el consentimiento de analítica ni se envían eventos adicionales.
- Validar el origen real en Google Sheets y en un preview con un lead controlado,
  sin crear contactos ficticios en producción.

## Operación inicial
1. Preparar campañas con enlaces UTM a las rutas reales con formulario. No usar el catálogo general como destino si después hay navegación: se perdería esta atribución de emergencia.
2. Registrar diariamente campañas, leads calificados, visitas y gastos en un
   control interno de solo lectura hasta contar con integración CRM.
3. Verificar el seguimiento antes de escalar la inversión.
