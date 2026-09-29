import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';

import { buildVendibilidadScript, buildVendibilidadShell } from '../components/vendibilidad/vendibilidadIntegration.js';
import { vendibilidadScriptSrc } from '../components/vendibilidad/vendibilidadScript.js';
import { vendibilidadShellHtml } from '../components/vendibilidad/vendibilidadShell.js';

test('integra la herramienta sin duplicar encabezado, pie ni título principal', () => {
  const shell = buildVendibilidadShell(vendibilidadShellHtml);

  assert.doesNotMatch(shell, /<header class="site-header">/);
  assert.doesNotMatch(shell, /<footer class="footer">/);
  assert.doesNotMatch(shell, /<main class="main"/);
  assert.equal((shell.match(/<h1>/g) || []).length, 1);
  assert.match(shell, /id="diagnostico" hidden/);
});

test('expone progreso, campos y opciones con semántica accesible', () => {
  const shell = buildVendibilidadShell(vendibilidadShellHtml);

  assert.match(shell, /role="progressbar"[^>]+aria-valuenow="25"/);
  assert.match(shell, /for="zone"/);
  assert.match(shell, /for="leadPhone"/);
  assert.match(shell, /type="tel" inputmode="tel"/);
  assert.match(shell, /aria-pressed="false" class="choice/);
  assert.match(shell, /role="alert" aria-live="assertive"/);
  assert.match(shell, /id="leadError" role="alert"/);
});

test('inicia y reinicia el diagnóstico sin recargar toda la página', () => {
  const script = buildVendibilidadScript(vendibilidadScriptSrc);

  assert.doesNotThrow(() => new vm.Script(script));
  assert.match(script, /diagnostic\.hidden=false/);
  assert.match(script, /aria-expanded','true'/);
  assert.match(script, /function resetDiagnostic\(\)/);
  assert.doesNotMatch(script, /location\.reload\(\)/);
  assert.match(script, /aria-valuenow/);
  assert.match(script, /toolRoot\.dataset\.vendibilidadBound/);
});
