function replaceRequired(source, search, replacement, label) {
  if (!source.includes(search)) {
    throw new Error(`No se encontró el fragmento requerido de vendibilidad: ${label}`);
  }
  return source.replace(search, replacement);
}

export function buildVendibilidadShell(source) {
  let html = source;

  const withoutToolHeader = html.replace(/<header class="site-header">[\s\S]*?<\/header>\n\n/, '');
  if (withoutToolHeader === html) {
    throw new Error('No se encontró el encabezado duplicado de vendibilidad');
  }
  html = withoutToolHeader;

  html = replaceRequired(
    html,
    '<h2>Descubre qué está frenando la venta de tu propiedad.</h2>',
    '<h1>Descubre qué está frenando la venta de tu propiedad.</h1>',
    'título principal',
  );
  html = replaceRequired(
    html,
    '<button class="btn btn-primary btn-wide" id="startBtn">',
    '<button class="btn btn-primary btn-wide" id="startBtn" aria-controls="diagnostico" aria-expanded="false">',
    'botón de inicio',
  );
  html = replaceRequired(
    html,
    '<main class="main" id="diagnostico">',
    '<div class="main" id="diagnostico" hidden>',
    'contenedor del diagnóstico',
  );
  html = replaceRequired(
    html,
    '<div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>',
    '<div class="progress-track" id="progressTrack" role="progressbar" aria-label="Avance del diagnóstico" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25"><div class="progress-fill" id="progressFill"></div></div>',
    'barra de progreso',
  );
  html = replaceRequired(
    html,
    '<section class="result-screen" id="resultScreen">',
    '<section class="result-screen" id="resultScreen" aria-live="polite">',
    'pantalla de resultado',
  );

  html = html
    .replaceAll('<button ', '<button type="button" ')
    .replaceAll('class="choice', 'aria-pressed="false" class="choice')
    .replaceAll('<div class="error-box" ', '<div class="error-box" role="alert" aria-live="assertive" tabindex="-1" ')
    .replace('<label>Colonia o zona ', '<label for="zone">Colonia o zona ')
    .replace('<label>Precio publicado (opcional)</label>', '<label for="askingPrice">Precio publicado (opcional)</label>')
    .replace('<label>Nombre</label><input class="input" id="leadName"', '<label for="leadName">Nombre</label><input class="input" id="leadName" autocomplete="name"')
    .replace('<label>WhatsApp</label><input class="input" id="leadPhone"', '<label for="leadPhone">WhatsApp</label><input type="tel" inputmode="tel" class="input" id="leadPhone" autocomplete="tel"')
    .replace('<label>Correo (opcional)</label><input class="input" id="leadEmail"', '<label for="leadEmail">Correo (opcional)</label><input type="email" class="input" id="leadEmail" autocomplete="email"')
    .replace('<label>Zona</label><input class="input" id="leadZone"', '<label for="leadZone">Zona</label><input class="input" id="leadZone"')
    .replace(
      '<div class="cta-actions">\n            <button type="button" class="btn btn-primary" id="whatsappBtn">',
      '<div class="lead-error" id="leadError" role="alert" aria-live="assertive" tabindex="-1"></div>\n          <div class="cta-actions">\n            <button type="button" class="btn btn-primary" id="whatsappBtn">',
    );

  const withoutToolFooter = html.replace(
    /<\/main>\n<footer class="footer">Rednorte · Diagnóstico de Vendibilidad · Herramienta pública y orientativa<\/footer>/,
    '</div>',
  );
  if (withoutToolFooter === html) {
    throw new Error('No se encontró el pie duplicado de vendibilidad');
  }

  return withoutToolFooter;
}

export function buildVendibilidadScript(source) {
  let script = source;

  script = replaceRequired(
    script,
    "\nconst CONFIG=",
    "\nconst toolRoot=document.querySelector('[data-vendibilidad-root]');\nif(!toolRoot||toolRoot.dataset.vendibilidadBound==='true')return;\ntoolRoot.dataset.vendibilidadBound='true';\nconst CONFIG=",
    'inicio del script',
  );
  script = replaceRequired(script, 'function q(sel,root=document)', 'function q(sel,root=toolRoot)', 'selector único');
  script = replaceRequired(script, 'function qa(sel,root=document)', 'function qa(sel,root=toolRoot)', 'selector múltiple');
  script = replaceRequired(
    script,
    "qa('.choice',groupEl).forEach(x=>x.classList.remove('selected'));\n    btn.classList.add('selected');",
    "qa('.choice',groupEl).forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});\n    btn.classList.add('selected');\n    btn.setAttribute('aria-pressed','true');",
    'estado accesible de opciones',
  );
  script = replaceRequired(
    script,
    "q('#startBtn').addEventListener('click',()=>q('#diagnostico').scrollIntoView({behavior:'smooth',block:'start'}));",
    "q('#startBtn').addEventListener('click',()=>{const diagnostic=q('#diagnostico');diagnostic.hidden=false;q('#startBtn').setAttribute('aria-expanded','true');requestAnimationFrame(()=>scrollToTool(diagnostic))});",
    'acción de inicio',
  );
  script = replaceRequired(
    script,
    "q('#restartBtn').addEventListener('click',()=>location.reload());",
    "q('#restartBtn').addEventListener('click',resetDiagnostic);",
    'acción de reinicio',
  );
  script = replaceRequired(
    script,
    'function showPanel(index){',
    `function scrollToTool(element=q('.app-shell')){element?.scrollIntoView({behavior:'smooth',block:'start'})}
function resetDiagnostic(){
  state.panel=0;state.answers={};state.result=null;
  qa('.choice').forEach(choice=>{choice.classList.remove('selected');choice.setAttribute('aria-pressed','false')});
  qa('input').forEach(input=>{input.value=''});
  qa('.error-box').forEach(error=>error.classList.remove('show'));
  q('#leadError').classList.remove('show');q('#leadError').textContent='';
  q('#failureCard').classList.remove('show');
  qa('.panel').forEach((panel,index)=>panel.classList.toggle('active',index===0));
  q('#resultScreen').classList.remove('active');q('#progressArea').classList.remove('hidden');
  q('#progressLabel').textContent='1. '+panelNames[0];q('#progressCount').textContent='Paso 1 de 4';
  q('#progressFill').style.width='25%';q('#progressTrack').setAttribute('aria-valuenow','25');
  qa('.step-tab').forEach((tab,index)=>{tab.classList.toggle('active',index===0);tab.classList.remove('done')});
  q('#copyBtn').textContent='Copiar diagnóstico';q('#diagnostico').hidden=true;
  q('#startBtn').setAttribute('aria-expanded','false');scrollToTool(q('#top'));
}
function showPanel(index){`,
    'reinicio del diagnóstico',
  );
  script = replaceRequired(
    script,
    "q('#progressFill').style.width=((index+1)*25)+'%';",
    "q('#progressFill').style.width=((index+1)*25)+'%';\n  q('#progressTrack').setAttribute('aria-valuenow',String((index+1)*25));",
    'actualización del progreso',
  );
  script = script.replaceAll("q('.app-shell').scrollIntoView({behavior:'smooth',block:'start'});", 'scrollToTool();');
  script = replaceRequired(
    script,
    "q('#error-'+i).classList.toggle('show',!ok);\n  return ok;",
    "const error=q('#error-'+i);error.classList.toggle('show',!ok);\n  if(!ok)error.focus();\n  return ok;",
    'mensaje de validación',
  );
  script = replaceRequired(
    script,
    "function copyDiagnostic(){\n  navigator.clipboard.writeText(diagnosticText()).then(()=>{q('#copyBtn').textContent='✓ Diagnóstico copiado';setTimeout(()=>q('#copyBtn').textContent='Copiar diagnóstico',1800)});\n}",
    "function copyDiagnostic(){\n  const button=q('#copyBtn');\n  navigator.clipboard.writeText(diagnosticText()).then(()=>{button.textContent='✓ Diagnóstico copiado';setTimeout(()=>button.textContent='Copiar diagnóstico',1800)}).catch(()=>{button.textContent='No se pudo copiar';setTimeout(()=>button.textContent='Copiar diagnóstico',1800)});\n}",
    'copia del diagnóstico',
  );
  script = replaceRequired(
    script,
    "if(!name||!phone){alert('Escribe tu nombre y tu WhatsApp para solicitar la revisión.');return;}\n  const msg=",
    "if(!name||!phone){const error=q('#leadError');error.textContent='Escribe tu nombre y tu WhatsApp para solicitar la revisión.';error.classList.add('show');error.focus();q(name?'#leadPhone':'#leadName').focus();return;}\n  q('#leadError').classList.remove('show');q('#leadError').textContent='';\n  const msg=",
    'validación del contacto',
  );

  return `(()=>{${script}\n})();`;
}
