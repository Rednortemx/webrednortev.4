# Recuperación técnica de Rednorte

## Alcance

El repositorio de GitHub es la fuente oficial del sitio. Vercel publica `main`; Nocnok mantiene el inventario vivo y Google Apps Script recibe los formularios. Los secretos de Vercel no se guardan en GitHub ni dentro de las copias automáticas.

## Copia automática

Cada lunes GitHub Actions genera un archivo `rednorte-source.bundle`, verifica su integridad y lo conserva durante 30 días como artefacto privado del flujo **Recovery snapshot**. También puede generarse manualmente desde la pestaña Actions.

Para restaurarlo en otro equipo:

```bash
git clone rednorte-source.bundle webrednorte-restaurado
cd webrednorte-restaurado
npm ci
npm test
npm run build
```

## Recuperación por tipo de falla

### Una publicación nueva falla

1. Consultar el despliegue y los registros en Vercel.
2. Identificar el último commit estable de `main`.
3. Crear un `revert` de la modificación defectuosa mediante pull request.
4. Esperar los controles `build-and-audit` y Vercel antes de integrarlo.
5. Confirmar `/api/leads`, `/sitemap.xml`, inicio, contacto y tres fichas mediante **Production smoke check**.

No se debe forzar `main` hacia atrás: el `revert` conserva el historial y permite auditar qué ocurrió.

### GitHub o el repositorio no están disponibles

1. Descargar el artefacto más reciente de **Recovery snapshot** si GitHub todavía permite acceder a Actions.
2. Verificar el commit guardado en `snapshot-commit.txt`.
3. Restaurar el bundle en un repositorio nuevo y conectar ese repositorio a Vercel.

### El inventario Nocnok falla

El sitio conserva temporalmente la última respuesta completa almacenada en caché. En arranque frío utiliza el inventario local reducido. Revisar `NOCNOK_API_KEY` en Vercel y el servicio de Nocnok; nunca sustituir la caché completa por una respuesta parcial.

### Los formularios fallan

1. Abrir `/api/leads`: debe responder `{"status":"ready"}`.
2. Buscar en los registros de Vercel `lead_webhook_failed`, `lead_webhook_rejected` o `lead_configuration_invalid`.
3. Usar `requestId` para correlacionar el error sin compartir nombre, teléfono o correo.
4. Revisar `LEADS_WEBHOOK_URL` en Vercel y el despliegue de Google Apps Script.

No activar reintentos hasta que Google Apps Script guarde y rechace identificadores duplicados.

## Elementos externos que requieren respaldo separado

- Variables de entorno de Vercel: conservar una copia segura fuera del repositorio y actualizarla cuando cambien `NOCNOK_API_KEY` o `LEADS_WEBHOOK_URL`.
- Código y hoja de cálculo de Google Apps Script: mantener una copia/versionado desde la cuenta propietaria de Google.
- Dominio y DNS de `rednorte.mx`: conservar acceso administrativo y segundo factor de autenticación.
- Cuenta de Nocnok: conservar acceso, documentación de la API y responsable de renovación.

Nunca colocar secretos, llaves o exportaciones con datos de prospectos dentro de GitHub Actions o del repositorio.
