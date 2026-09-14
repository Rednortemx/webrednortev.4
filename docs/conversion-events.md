# Conversion measurement

Uses the existing Vercel Web Analytics integration. Custom events require a
Vercel Pro or Enterprise plan. No billing settings or subscriptions are changed.
Reference: https://vercel.com/docs/analytics/custom-events

| Event | Meaning |
| --- | --- |
| formulario_enviado | The lead endpoint returned HTTP 2xx, not a confirmed sale or appointment. |
| whatsapp_clic | Validated action to open WhatsApp, not a message delivered. |
| busqueda_realizada | The home search was submitted. |
| filtros_aplicados | Inventory filters were applied, not every field edit. |
| herramienta_iniciada | First input/change in a tool, once per component mount. |
| herramienta_completada | Result rendering requested, once per component mount. |

Only the fixed `origen` label is sent as custom data. The SDK associates events
with their page URL, cleaned of query parameters and fragments in beforeSend.
This permits comparison of public property/service pages without sending lead
names, phone numbers, emails, messages, selected dates, budgets or valuations.

All eleven React lead callers and both classic-script tools use one measurement
boundary. Each successful request emits at most one form event. Network/HTTP
failures emit none. Distinct submissions are counted as distinct submissions;
the numbers do not represent unique people. WhatsApp and form events must not
be summed as unique leads, since a single action can produce both.

Consent is required both before a request starts and when its response arrives.
No earlier interactions are replayed when consent is granted. beforeSend checks
current consent again, including for an already-loaded Analytics script after
revocation. Storage-blocked browsers fail closed for measurement.

## Checks

Run `node --test tests/conversions.test.cjs` and `npm run build`.
The automated tests use mocked tracking and HTTP calls: they send no real leads.

Before judging production totals, manually verify events in Vercel Analytics
using a consenting test browser, then revoke consent and confirm no new events.
Use a preview/mocked lead endpoint for form QA to avoid creating real CRM leads.
Totals exclude nonconsenting visitors and may also miss blocked scripts. They
are not an exact CRM count. No live dashboard receipt has been verified by the
local tests.
