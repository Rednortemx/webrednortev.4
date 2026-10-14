// Editorial layer for the valuation tool. Keeping it separate makes the
// redesign easy to audit without touching the calculation script or its DOM.
export const estimadorEditorialStyles = String.raw`
.ov-val {
  --brand:#bf542f;
  --brand-dark:#211914;
  --ink:#1d1916;
  --brown:#342821;
  --stone:#6f665f;
  --sand:#cfc2b5;
  --mist:#ded6ce;
  --canvas:#f3eee7;
  --butter:#f2d9a6;
  --shadow:none;
  --shadow-soft:none;
  background:var(--canvas);
}

.ov-val .topbar { display:none; }
.ov-val .hero { background:#17130f; border-bottom:1px solid #302821; }
.ov-val .hero-inner {
  max-width:1360px;
  min-height:390px;
  padding:76px 36px 68px;
  grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);
  gap:72px;
}
.ov-val .eyebrow {
  padding:0 0 12px;
  border:0;
  border-radius:0;
  border-bottom:1px solid rgba(255,255,255,.22);
  background:transparent;
  color:#d9a688;
  font-size:11px;
  font-weight:700;
  letter-spacing:.16em;
  text-transform:uppercase;
}
.ov-val .hero h1 {
  max-width:840px;
  margin:0 0 22px;
  color:#fffaf4;
  font-family:var(--font-poppins),sans-serif;
  font-size:clamp(50px,6.4vw,92px);
  font-weight:700;
  line-height:.92;
  letter-spacing:-.045em;
}
.ov-val .hero p {
  max-width:690px;
  color:#c9bfb7;
  font-size:15px;
  line-height:1.75;
}
.ov-val .hero-metrics { gap:0; border-top:1px solid rgba(255,255,255,.18); }
.ov-val .metric-card {
  padding:20px 0;
  border:0;
  border-bottom:1px solid rgba(255,255,255,.18);
  border-radius:0;
  background:transparent;
  backdrop-filter:none;
}
.ov-val .metric-card strong {
  margin-bottom:5px;
  color:#fffaf4;
  font-family:var(--font-poppins),sans-serif;
  font-size:30px;
  font-weight:600;
}
.ov-val .metric-card span { color:#a99d94; font-size:12px; }

.ov-val .main { max-width:1360px; margin:0 auto; padding:0 36px 84px; }
.ov-val .wizard-shell { overflow:visible; border:0; border-radius:0; background:transparent; box-shadow:none; }
.ov-val .stepper {
  position:sticky;
  z-index:20;
  top:72px;
  gap:0;
  margin:0 -36px 52px;
  padding:0 36px;
  border-bottom:1px solid #d3c8bd;
  background:rgba(243,238,231,.96);
  box-shadow:none;
  backdrop-filter:blur(12px);
}
.ov-val .step-chip {
  min-width:0;
  flex:1;
  gap:12px;
  padding:17px 20px 16px 0;
  border:0;
  border-bottom:2px solid transparent;
  border-radius:0;
  color:#8d837a;
}
.ov-val .step-chip + .step-chip { padding-left:22px; border-left:1px solid #d3c8bd; }
.ov-val .step-chip.active { border-color:var(--brand); background:transparent; box-shadow:none; color:var(--ink); }
.ov-val .step-chip.completed { color:#3f5e4d; }
.ov-val .step-num {
  width:25px;
  height:25px;
  border:1px solid #bcb1a7;
  border-radius:50%;
  background:transparent;
  color:inherit;
}
.ov-val .step-chip.active .step-num { border-color:var(--brand); background:var(--brand); }
.ov-val .step-chip.completed .step-num { border-color:#3f5e4d; background:#3f5e4d; }
.ov-val .step-chip b { font-size:13px; letter-spacing:.01em; }
.ov-val .step-chip small { font-size:10px; }

.ov-val .step-panel { padding:0; }
.ov-val .section-head { align-items:flex-end; margin-bottom:32px; padding-bottom:24px; border-bottom:1px solid #cfc4b8; }
.ov-val .section-head h2 {
  max-width:850px;
  margin:0 0 8px;
  color:var(--ink);
  font-family:var(--font-poppins),sans-serif;
  font-size:clamp(36px,4vw,58px);
  font-weight:700;
  line-height:1;
  letter-spacing:-.03em;
}
.ov-val .section-head p { color:var(--stone); font-size:14px; line-height:1.7; }
.ov-val .kicker { color:var(--brand); font-size:10px; letter-spacing:.18em; }

.ov-val .card,
.ov-val .result-card,
.ov-val .cta-panel,
.ov-val .disclaimer {
  border:1px solid #d7cdc4;
  border-radius:0;
  background:#faf7f2;
  box-shadow:none;
}
.ov-val .card { padding:24px; }
.ov-val .grid { gap:16px; }
.ov-val label.label { color:#655c54; font-size:10px; letter-spacing:.11em; }
.ov-val .input,.ov-val .select,.ov-val .textarea {
  min-height:50px;
  padding:13px 14px;
  border:1px solid #cfc5bc;
  border-radius:0;
  background:#fffdf9;
  color:var(--ink);
  font-size:14px;
}
.ov-val .input:focus,.ov-val .select:focus,.ov-val .textarea:focus {
  border-color:var(--brand);
  box-shadow:0 0 0 3px rgba(191,84,47,.11);
}
.ov-val .help { color:#82786f; font-size:11px; }

.ov-val .property-type-grid,.ov-val .condition-grid { gap:0; border:1px solid #d2c7bd; }
.ov-val .type-card,.ov-val .condition-card,.ov-val .reason-card {
  position:relative;
  min-height:116px;
  padding:22px 18px 18px 50px;
  border:0;
  border-right:1px solid #d2c7bd;
  border-radius:0;
  background:#fffdf9;
}
.ov-val .type-card:last-child,.ov-val .condition-card:last-child { border-right:0; }
.ov-val .type-card:hover,.ov-val .condition-card:hover,.ov-val .reason-card:hover { border-color:#d2c7bd; background:#f8f0e9; transform:none; }
.ov-val .type-card.active,.ov-val .condition-card.active,.ov-val .reason-card.active {
  border-color:#d2c7bd;
  background:#f5e8df;
  box-shadow:inset 0 -3px 0 var(--brand);
}
.ov-val .type-card .emoji,.ov-val .condition-card .emoji { display:none; }
.ov-val .type-card::before,.ov-val .condition-card::before {
  position:absolute;
  top:22px;
  left:18px;
  color:var(--brand);
  font:700 11px/1 var(--font-poppins),sans-serif;
}
.ov-val .type-card:nth-child(1)::before,.ov-val .condition-card:nth-child(1)::before { content:'01'; }
.ov-val .type-card:nth-child(2)::before,.ov-val .condition-card:nth-child(2)::before { content:'02'; }
.ov-val .type-card:nth-child(3)::before,.ov-val .condition-card:nth-child(3)::before { content:'03'; }
.ov-val .condition-card:nth-child(4)::before { content:'04'; }
.ov-val .type-card strong,.ov-val .condition-card strong,.ov-val .reason-card strong { color:var(--ink); font-size:15px; }
.ov-val .type-card span,.ov-val .condition-card span,.ov-val .reason-card span { color:#736960; font-size:12px; }

.ov-val .pill-note,.ov-val .inline-chip,.ov-val .source-tag {
  border:1px solid #d5c9bf;
  border-radius:0;
  background:transparent;
  color:#655c54;
  font-size:10px;
  letter-spacing:.06em;
  text-transform:uppercase;
}
.ov-val .pill-note { font-size:0; }
.ov-val .pill-note::after { content:'Más similares = mejor estimación'; font-size:10px; }
.ov-val .tip-banner {
  grid-template-columns:1.25fr .75fr;
  gap:0;
  margin-bottom:22px;
  padding:0;
  border:1px solid #d3c7bc;
  border-radius:0;
  background:#faf7f2;
}
.ov-val .tip-banner > div { padding:26px; }
.ov-val .tip-banner > div + div { border-left:1px solid #d3c7bc; }
.ov-val .tip-banner h3 { color:var(--ink); font-family:var(--font-poppins),sans-serif; font-size:30px; font-weight:700; }
.ov-val .tip-banner p,.ov-val .tip-banner li { color:#6e655d; font-size:13px; }
.ov-val .muted-box { border:1px solid #d4c9bf; border-radius:0; background:#f7f1ea; color:#70665e; }
.ov-val .muted-box strong { color:var(--ink); }

.ov-val .progress-shell {
  position:sticky;
  z-index:15;
  top:155px;
  margin-bottom:20px;
  padding:16px 20px;
  border:1px solid #cfc3b8;
  border-radius:0;
  background:rgba(250,247,242,.97);
  box-shadow:0 12px 28px rgba(38,29,22,.07);
  backdrop-filter:blur(10px);
}
.ov-val .progress-meta strong { color:var(--ink); font-size:16px; }
.ov-val .progress-meta span { color:#766c64; font-size:12px; }
.ov-val .progress-track { height:4px; border-radius:0; background:#ddd4cc; }
.ov-val .progress-fill { border-radius:0; background:var(--brand); }
.ov-val .comp-card { padding:20px; border:1px solid #d2c7bd; border-radius:0; background:#faf7f2; box-shadow:none; }
.ov-val .comp-index { width:30px; height:30px; border-radius:0; background:var(--brand); }
.ov-val .comp-title strong { color:var(--ink); }
.ov-val .comp-complete { border-radius:0; }
.ov-val .comp-warning { border-radius:0; }
.ov-val .add-btn { border:1px dashed #cbbcaf; border-radius:0; background:#f8f1ea; color:var(--brand); }

.ov-val .button-row { align-items:center; margin-top:28px; padding-top:22px; border-top:1px solid #d3c8bd; }
.ov-val .button-row .muted-box { max-width:760px; }
.ov-val .btn { min-height:48px; padding:13px 20px; border-radius:0; font-size:13px; letter-spacing:.01em; }
.ov-val .btn-primary { background:var(--brand); box-shadow:none; }
.ov-val .btn-primary:hover { background:#a84525; transform:none; }
.ov-val .btn-secondary { background:var(--ink); }
.ov-val .btn-ghost { border-color:#cfc3b8; background:transparent; color:var(--ink); }
.ov-val .btn-danger { background:transparent; }

.ov-val .result-hero {
  gap:0;
  margin-bottom:20px;
  padding:0;
  border:0;
  border-radius:0;
  background:#17130f;
}
.ov-val .result-hero > div { padding:36px; }
.ov-val .result-hero > div + div { border-left:1px solid rgba(255,255,255,.16); }
.ov-val .result-hero h3 { max-width:620px; color:#fdf8f2; font-family:var(--font-poppins),sans-serif; font-size:37px; font-weight:700; }
.ov-val .result-kicker { color:#d9a688; font-size:10px; letter-spacing:.16em; }
.ov-val .recommended-main { color:#fff; font-family:var(--font-poppins),sans-serif; font-size:clamp(48px,6vw,78px); font-weight:700; letter-spacing:-.035em; }
.ov-val .recommended-sub { color:#c1b6ae; font-size:13px; }
.ov-val .summary-stack { gap:0; }
.ov-val .range-card,.ov-val .mini-result-card { border:0; border-radius:0; background:transparent; }
.ov-val .range-card { padding:0 0 24px; border-bottom:1px solid rgba(255,255,255,.16); }
.ov-val .summary-big { font-family:var(--font-poppins),sans-serif; font-size:36px; font-weight:700; }
.ov-val .summary-grid { gap:0; }
.ov-val .mini-result-card { padding:22px 18px 0 0; }
.ov-val .mini-result-card + .mini-result-card { padding-left:18px; border-left:1px solid rgba(255,255,255,.16); }
.ov-val .confidence-pill { border-radius:0; }
.ov-val .result-grid { gap:20px; }
.ov-val .result-card { padding:24px; }
.ov-val .result-card h4,.ov-val .cta-panel h4 { color:var(--ink); font-family:var(--font-poppins),sans-serif; font-size:27px; font-weight:700; }
.ov-val .stat-box { border:0; border-left:2px solid var(--brand); border-radius:0; background:#f2ebe3; }
.ov-val .stat-box strong { color:var(--ink); }
.ov-val .table-wrap { border:1px solid #d2c7bd; border-radius:0; box-shadow:none; }
.ov-val th { background:#211914; }
.ov-val td { border-color:#e2dad2; }
.ov-val tr:nth-child(even) td { background:#f7f2ec; }
.ov-val .cta-panel { padding:26px; background:#f5eae2; }
.ov-val .footer-note { color:#81776f; }

@media (max-width:1050px) {
  .ov-val .hero-inner { grid-template-columns:1fr; gap:42px; min-height:0; }
  .ov-val .hero-metrics { grid-template-columns:repeat(3,1fr); }
  .ov-val .metric-card { padding:18px 16px; border-right:1px solid rgba(255,255,255,.18); }
  .ov-val .metric-card:last-child { border-right:0; }
  .ov-val .result-hero { grid-template-columns:1fr; }
  .ov-val .result-hero > div + div { border-top:1px solid rgba(255,255,255,.16); border-left:0; }
}

@media (max-width:760px) {
  .ov-val .hero-inner { padding:54px 20px 44px; }
  .ov-val .hero h1 { font-size:clamp(45px,14vw,68px); }
  .ov-val .hero-metrics { grid-template-columns:1fr; }
  .ov-val .metric-card { padding:15px 0; border-right:0; }
  .ov-val .main { padding:0 16px 56px; }
  .ov-val .stepper { top:64px; margin:0 -16px 36px; padding:0 16px; }
  .ov-val .step-chip { flex:0 0 74%; padding:14px 16px 13px 0; }
  .ov-val .step-chip + .step-chip { padding-left:16px; }
  .ov-val .section-head { align-items:flex-start; }
  .ov-val .section-head h2 { font-size:39px; }
  .ov-val .card { padding:18px; }
  .ov-val .property-type-grid,.ov-val .condition-grid { grid-template-columns:1fr; }
  .ov-val .type-card,.ov-val .condition-card { min-height:92px; border-right:0; border-bottom:1px solid #d2c7bd; }
  .ov-val .type-card:last-child,.ov-val .condition-card:last-child { border-bottom:0; }
  .ov-val .tip-banner > div { padding:20px; }
  .ov-val .tip-banner > div + div { border-top:1px solid #d3c7bc; border-left:0; }
  .ov-val .progress-shell { top:139px; }
  .ov-val .result-hero > div { padding:26px 22px; }
  .ov-val .recommended-main { font-size:48px; }
  .ov-val .summary-grid { grid-template-columns:1fr; }
  .ov-val .mini-result-card { padding:18px 0; }
  .ov-val .mini-result-card + .mini-result-card { padding-left:0; border-top:1px solid rgba(255,255,255,.16); border-left:0; }
  .ov-val .button-row { align-items:stretch; }
  .ov-val table { min-width:720px; }
}

@media print {
  .ov-val .result-hero { background:#fff8f4; border:1px solid #dccbc1; }
  .ov-val .result-hero > div + div { border-color:#dccbc1; }
  .ov-val .recommended-main,.ov-val .result-hero h3,.ov-val .summary-big,.ov-val .mini-result-card strong { color:var(--brand-dark) !important; }
}
`;
