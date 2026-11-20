import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { advisors, coordinator } from '../lib/teamDirectory.js';
import { getTeamMember, teamMembers } from '../lib/teamMembers.js';

test('el directorio contiene 30 asesores con contactos válidos y sin duplicados', () => {
  assert.equal(advisors.length, 30);
  assert.equal(new Set(advisors.map((advisor) => advisor.name)).size, advisors.length);
  assert.equal(new Set(advisors.map((advisor) => advisor.phone)).size, advisors.length);
  for (const advisor of advisors) {
    assert.match(advisor.phone, /^\d{10}$/);
    assert.match(advisor.role, /^Asesor(?:a)? inmobiliari[oa]$/);
    assert.equal(advisor.profileSlug === undefined || advisor.profileSlug === 'thadeo-gomez', true);
  }
  assert.deepEqual(coordinator, {
    name: 'Stephanie Lara',
    role: 'Coordinadora de Operaciones',
    phone: '8135806173',
  });
});

test('Thadeo reutiliza su fotografía, teléfono y perfil existente sin nuevas rutas', () => {
  const thadeo = advisors.find((advisor) => advisor.name === 'Thadeo Gómez');
  assert.ok(thadeo);
  assert.equal(`52${thadeo.phone}`, getTeamMember(thadeo.profileSlug).whatsapp);
  assert.equal(teamMembers.length, 2);
  assert.equal(getTeamMember('roque-avila').photo, '/equipo/roque-avila.jpg');
});

test('la página muestra directorio accesible y canaliza WhatsApp al asesor correspondiente', async () => {
  const page = await readFile(new URL('../app/equipo/page.jsx', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../app/globals.institutional.css', import.meta.url), 'utf8');

  assert.match(page, /<h2 id="team-people-title">Conoce a nuestro equipo<\/h2>/);
  assert.match(page, /advisors\.map\(\(advisor\) => <TeamPersonCard/);
  assert.match(page, /photo \? \([\s\S]*<Image src=\{photo\}/);
  assert.match(page, /<span aria-hidden="true">\{initials\(person\.name\)\}<\/span>/);
  assert.match(page, /href=\{`tel:\+52\$\{person\.phone\}`\}/);
  assert.match(page, /phone=\{`52\$\{person\.phone\}`\}/);
  assert.match(page, /source=\{`Equipo: \$\{person\.name\}`\}/);
  assert.match(page, /<WhatsAppGateButton/);
  assert.match(page, /<TeamPersonCard person=\{coordinator\} \/>/);
  assert.match(styles, /\.team-people-grid \{ display: grid;/);
  assert.match(styles, /@media \(max-width: 700px\)/);
});
