# Cierre técnico integral

Fecha de revisión: 14 de septiembre de 2026.

## Resultado

La base técnica de Rednorte queda preparada para continuar con contenido e Insights. La revisión cubre el código, el despliegue público, dependencias, seguridad, privacidad, formularios, inventario, SEO técnico, accesibilidad, automatizaciones y recuperación.

## Controles activos

### Plataforma y calidad

- Node.js 24 LTS en Vercel y GitHub Actions; Node.js 20 fue retirado por haber terminado su soporte.
- Next.js 15 se conserva sin salto automático a una versión mayor.
- ESLint ejecuta las reglas recomendadas de Next.js, Core Web Vitals y accesibilidad JSX.
- Cero advertencias permitidas en lint.
- Cada pull request ejecuta auditoría de dependencias, pruebas, lint y compilación.
- Dependabot propone semanalmente actualizaciones menores y parches agrupados.

### Seguridad y privacidad

- Encabezados de seguridad globales y HTTPS activo.
- Archivos de entorno y patrones comunes de credenciales bloqueados en el control de calidad.
- Formularios limitados por origen, tamaño, tipo de contenido, campos permitidos, honeypot y frecuencia.
- El webhook de prospectos solo acepta un despliegue HTTPS válido de Google Apps Script.
- Analytics, mapas y Trustindex dependen del consentimiento opcional.
- Los eventos analíticos no incluyen valores capturados en formularios.

### Disponibilidad y recuperación

- Inventario Nocnok con caché de última respuesta completa y respaldo local para arranque en frío.
- Monitoreo diario de producción sin enviar prospectos de prueba.
- Copia semanal verificable del historial completo del repositorio, conservada 30 días.
- Procedimiento de recuperación documentado en `docs/recovery-runbook.md`.

### SEO técnico y accesibilidad

- Dominio canónico único, redirecciones permanentes del sitio anterior, sitemap y robots.
- Metadatos sociales, favicon, datos estructurados y archivo `llms.txt`.
- El monitoreo comprueba todas las páginas indexables del sitemap, cinco fichas distribuidas dentro del inventario, títulos, H1, canonicals, imágenes sociales, robots y disponibilidad de formularios.
- Formularios y componentes pasan las reglas recomendadas de accesibilidad para JSX.

## Validación de cierre

- Auditoría npm completa: cero vulnerabilidades conocidas.
- 17 pruebas automatizadas aprobadas.
- Lint: cero errores y cero advertencias.
- Compilación optimizada de Next.js aprobada.
- Producción: 584 URLs, 24 páginas indexables, 560 propiedades y cinco fichas distribuidas verificadas.
- Redirecciones HTTP, dominio sin `www` y rutas principales del sitio anterior verificadas.

## Dependencias externas y límites aceptados

- Nocnok sigue siendo la fuente externa del inventario; una interrupción prolongada puede dejar datos temporalmente desactualizados.
- Google Apps Script sigue siendo el receptor externo de prospectos. No deben añadirse reintentos automáticos hasta que el receptor implemente idempotencia para evitar duplicados.
- El código de Google Apps Script, su hoja de cálculo y las variables de Vercel requieren respaldo seguro fuera del repositorio.
- Trustindex y Google Maps pueden fallar por causas externas, pero permanecen bloqueados hasta obtener consentimiento.
- ESLint 9 se conserva porque es la versión compatible con Next.js 15; su actualización mayor se realizará junto con una migración planificada de Next.js.

## Operación a partir del cierre

1. Atender únicamente los avisos que fallen en GitHub Actions o Vercel.
2. Integrar actualizaciones agrupadas después de que pasen los controles.
3. Revisar trimestralmente si conviene migrar Next.js, React o ESLint a una versión mayor.
4. Mantener el monitoreo y las copias automáticas mientras el sitio continúe en producción.

No se requiere intervención diaria ni consumo de tokens de ChatGPT para estos controles.
