import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('el horario público y las citas parten de las 10:00', async () => {
  const [config, cita, translations] = await Promise.all([
    readFile(new URL('../lib/siteConfig.js', import.meta.url), 'utf8'),
    readFile(new URL('../components/CitaSection.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../lib/translations.js', import.meta.url), 'utf8'),
  ]);

  assert.match(config, /weekdays: 'Lun–Vie: 10:00 – 18:00'/);
  assert.match(config, /saturday: 'Sáb: 10:00 – 14:00'/);
  assert.match(config, /appointmentHours: Object\.freeze/);
  assert.match(config, /'10:00 AM'/);
  assert.doesNotMatch(config, /'9:00 AM'/);
  assert.match(cita, /SITE_CONTACT\.appointmentHours\.map/);
  assert.doesNotMatch(cita, /'9:00 AM'/);
  assert.match(translations, /Lun–Vie: 10:00 – 18:00/);
  assert.doesNotMatch(translations, /lunes a viernes de 9:00 a 18:00/);
});
