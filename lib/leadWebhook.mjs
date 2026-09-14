const ALLOWED_WEBHOOK_HOST = 'script.google.com';
const APPS_SCRIPT_EXEC_PATH = /^\/macros\/s\/[A-Za-z0-9_-]+\/exec\/?$/;

// Keep the server-side destination constrained to a deployed Google Apps Script.
// This prevents an accidentally or maliciously changed environment variable from
// turning the lead endpoint into a request proxy to an arbitrary host.
export function validLeadWebhookUrl(value) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== 'https:'
      || url.hostname !== ALLOWED_WEBHOOK_HOST
      || url.username
      || url.password
      || url.hash
      || !APPS_SCRIPT_EXEC_PATH.test(url.pathname)
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
