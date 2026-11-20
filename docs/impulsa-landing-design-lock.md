# Rednorte | Patrón aprobado de landings de inventario habitacional

**Estado:** Diseño de referencia aprobado por Dirección, 20 de noviembre de 2026.  
**Referencia visual y funcional:** PR #120, commit `6f295a2ffb60a693fe6b2b91ac621bebb376668f`, ruta piloto `/propiedades/monterrey/casas-en-venta`.

## Decisión: congelar diseño, no inmovilizar contenido

Este documento es la **base obligatoria de diseño para futuras landings de búsqueda habitacional** de Rednorte Impulsa. No implica fusionar el PR #120, publicarlo ni modificar páginas existentes. Toda extensión futura debe aprobarse en su PR y preview independientes.

### Elementos que se conservan

1. **Identidad vigente de la web pública:** Poppins, carbón, marfil y terracota. No sustituir el branding global ni introducir un tema visual distinto por landing.
2. **Jerarquía de búsqueda:** breadcrumb discreto, encabezado compacto con un único H1 que corresponda a la intención de Google, texto explicativo breve, acceso al catálogo y asesoría secundaria. Las propiedades deben aparecer pronto, especialmente en móvil.
3. **Inventario auténtico:** exclusivamente registros vigentes de NocNok; no inventar inmuebles, fotos, precios, cantidades, disponibilidad o asesores. Falla de origen = estado de inventario no disponible, nunca fichas de ejemplo.
4. **Filtros coherentes con el URL:** el tipo, operación y municipio de la landing son fijos; el visitante puede precisar colonia, presupuesto, recámaras y otros atributos. Para cambiar de segmento, enlace a una búsqueda general. No mezclar renta, venta o municipios distintos bajo un título engañoso.
5. **Resultados pensados para convertir:** tarjetas consistentes, precio legible, fotos, datos clave y navegación/paginación compartible mediante URL. Filtros aplicados visibles, recuperación clara sin coincidencias y accesibilidad para teclado.
6. **Asesoría contextual sin presión:** llamada a la acción sobria dentro del recorrido y al final, y especialmente cuando no hay coincidencias. Evitar prometer inventario, alianzas o disponibilidad no verificados.
7. **Formulario breve:** nombre, WhatsApp, aceptación del aviso de privacidad; zona y presupuesto prellenables, más preferencias opcionales. El borrador del usuario persiste al abrir/cerrar dentro de la página y nunca se envían datos de prueba desde un preview.
8. **Experiencia móvil:** campos cómodos, botones accesibles, diálogo por encima del contenido y sin elementos flotantes que oculten los controles.
9. **Separación de responsabilidades:** solicitudes por propiedad al asesor responsable; solicitudes de búsqueda general sin propiedad identificada al flujo de coordinación de Steph, una vez implementado. El PR #120 todavía no implementa esa distribución.
10. **SEO + Google Ads:** ruta amigable, H1 y contenido relevantes a la búsqueda; canonical y paginación correctos; parámetros publicitarios medibles, sin exponer datos privados ni crear contenido engañoso.

### Aspectos variables por landing

- Municipio, tipo de vivienda y operación (venta/renta).
- Título, microcopy, filtros que realmente aplican, precios y atributos del inventario.
- Palabras clave, argumentos publicitarios y campañas, definidos con demanda y disponibilidad comprobadas.
- Estados vacíos y requisitos comerciales según renta o venta.

### Reglas de modificación

- **No rediseñar la plantilla durante la expansión** por preferencias de cada landing; reutilizar componentes y tokens. Mantener una sola fuente de estilos compartidos cuando se generalice el piloto.
- Los cambios sustanciales en jerarquía, colores, composición, comportamiento del formulario, lógica de inventario o accesibilidad **requieren revisión explícita de Dirección** con preview comparativo.
- Se permiten correcciones de errores, accesibilidad, seguridad, responsividad y cumplimiento legal siempre que no se pierdan las decisiones aprobadas; con pruebas y PR.
- Antes de implementar nuevas landings, revisar el estado actual de `main`, del PR #120 y de cualquier PR que modifique componentes comunes. No modificar otros módulos ni sobrescribir cambios concurrentes.

### Checklist de aceptación de cada nueva landing

- [ ] Diseño coincide con PR #120 en escritorio y móvil.
- [ ] El H1, filtros, inventario y mensaje del formulario corresponden al mismo tipo/operación/municipio.
- [ ] No hay cifras ni inmuebles inventados; el origen de propiedades es NocNok.
- [ ] Filtros, paginación, URLs, estado vacío y teclado funcionan.
- [ ] CTA y formulario captan búsqueda general sin confundirla con una propiedad específica.
- [ ] Los previews no generan leads reales; medición y privacidad revisadas.
- [ ] Tests + lint + build + Vercel Preview aprobados.
- [ ] PR independiente y autorización antes de publicar en producción.

## Alcance de este lock

**Bloqueo de patrón de diseño aprobado**, no congelamiento técnico de cada píxel ni una plantilla universal ya desplegada. La generalización a otras landings es trabajo posterior: se desarrollará en código de GitHub, con revisión de PR, pruebas y previews antes de aplicarse.
