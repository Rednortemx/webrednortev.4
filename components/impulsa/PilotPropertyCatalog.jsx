'use client';

import { Fragment, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchAssistant from './PropertySearchAssistant';
import { PROPERTIES_PER_PAGE } from '@/lib/propertyPagination';
import { trackConversion } from '@/lib/conversions';
import {
  normalizePilotFilters, validatePilotFilters, filterPilotProperties, buildPilotSearchHref,
} from '@/lib/pilotPropertySearch.mjs';
import styles from './PilotPropertyCatalog.module.css';

const money = (value) => Number.isFinite(Number(value)) ? `$${Number(value).toLocaleString('es-MX')}` : value;
const extraKeys = ['colonia', 'precioMin', 'precioMax', 'recamaras', 'banos', 'm2Min', 'm2Max'];

function ArrowIcon({ previous = false }) {
  return <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={previous ? { transform: 'rotate(180deg)' } : undefined}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function filterChips(filters) {
  const chips = [];
  if (filters.colonia) chips.push({ key: 'colonia', label: filters.colonia });
  if (filters.precioMin) chips.push({ key: 'precioMin', label: `Desde ${money(filters.precioMin)}` });
  if (filters.precioMax) chips.push({ key: 'precioMax', label: `Hasta ${money(filters.precioMax)}` });
  if (filters.recamaras !== '0') chips.push({ key: 'recamaras', label: `${filters.recamaras}+ recámaras` });
  if (filters.banos !== '0') chips.push({ key: 'banos', label: `${filters.banos}+ baños` });
  if (filters.m2Min) chips.push({ key: 'm2Min', label: `Desde ${filters.m2Min} m² construidos` });
  if (filters.m2Max) chips.push({ key: 'm2Max', label: `Hasta ${filters.m2Max} m² construidos` });
  return chips;
}

function paginationItems(page, total) {
  const pages = [...new Set([1, page - 1, page, page + 1, total])]
    .filter((number) => number > 0 && number <= total).sort((a, b) => a - b);
  return pages.flatMap((number, index) => (
    index > 0 && number - pages[index - 1] > 1 ? [`gap-${number}`, number] : [number]
  ));
}

export default function PilotPropertyCatalog({
  properties,
  initialFilters = {},
  basePath = '/propiedades/monterrey/casas-en-venta',
  previewOnly = false,
}) {
  const initial = useMemo(() => normalizePilotFilters(initialFilters), [initialFilters]);
  const [draft, setDraft] = useState(initial);
  const [applied, setApplied] = useState(initial);
  const [errors, setErrors] = useState(() => validatePilotFilters(initial).errors);
  const [advancedOpen, setAdvancedOpen] = useState(Boolean(initial.m2Min || initial.m2Max || initial.banos !== '0'));
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultsHeadingRef = useRef(null);
  const filterFormRef = useRef(null);

  // Server props follow the address bar, including browser Back/Forward. The
  // local update makes applying a filter immediate while Next loads the URL.
  useEffect(() => {
    setDraft(initial);
    setApplied(initial);
    setErrors(validatePilotFilters(initial).errors);
    if (initial.m2Min || initial.m2Max || initial.banos !== '0') setAdvancedOpen(true);
  }, [initial]);

  const colonies = useMemo(() => [...new Set(properties.map((property) => String(property.settlement || '').trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })), [properties]);
  const filtered = useMemo(() => filterPilotProperties(properties, applied), [properties, applied]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PROPERTIES_PER_PAGE));
  const currentPage = Math.min(applied.page, totalPages);
  const firstIndex = (currentPage - 1) * PROPERTIES_PER_PAGE;
  const pageItems = filtered.slice(firstIndex, firstIndex + PROPERTIES_PER_PAGE);
  const chips = filterChips(applied);
  const advancedCount = [applied.banos !== '0', Boolean(applied.m2Min), Boolean(applied.m2Max)].filter(Boolean).length;
  const hasDraftChanges = extraKeys.some((key) => draft[key] !== applied[key]);

  const hrefFor = (page, filters = applied) => buildPilotSearchHref({
    basePath, filters, page, searchParams: searchParams.toString(),
  });

  const scrollToResults = () => {
    requestAnimationFrame(() => {
      resultsHeadingRef.current?.focus({ preventScroll: true });
      resultsHeadingRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };

  const navigate = (nextFilters, page = 1) => {
    const next = normalizePilotFilters({ ...nextFilters, page });
    const validation = validatePilotFilters(next);
    setErrors(validation.errors);
    if (!validation.valid) {
      if (validation.errors.m2Min || validation.errors.m2Max || validation.errors.banos) setAdvancedOpen(true);
      requestAnimationFrame(() => filterFormRef.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    setDraft(next);
    setApplied(next);
    startTransition(() => router.push(hrefFor(page, next), { scroll: false }));
    scrollToResults();
  };

  const apply = (event) => {
    event.preventDefault();
    if (validatePilotFilters(draft).valid) trackConversion('filtros_aplicados', 'inventario');
    navigate(draft);
  };

  const change = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const reset = () => navigate(normalizePilotFilters({ sort: applied.sort }));
  const removeChip = (key) => navigate({ ...applied, [key]: ['recamaras', 'banos'].includes(key) ? '0' : '' });
  const handlePage = (event, page) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(applied, page);
  };

  return (
    <section className={styles.root} aria-label="Casas en venta en Monterrey">
      <form ref={filterFormRef} className={styles.filters} onSubmit={apply} noValidate>
        <div className={styles.filterHeading}>
          <div>
            <p className={styles.context}>Casas <span aria-hidden="true">/</span> Venta <span aria-hidden="true">/</span> Monterrey</p>
            <h2>Filtrar casas</h2>
          </div>
          <Link className={styles.changeSearch} href="/propiedades">Cambiar búsqueda <ArrowIcon /></Link>
        </div>
        <div className={styles.primary}>
          <label className={`${styles.field} ${styles.colony}`} htmlFor="pilot-colonia">
            <span>Colonia</span>
            <select id="pilot-colonia" name="colonia" value={draft.colonia} onChange={change}>
              <option value="">Todas las colonias</option>
              {draft.colonia && !colonies.includes(draft.colonia) && <option value={draft.colonia}>{draft.colonia}</option>}
              {colonies.map((colony) => <option value={colony} key={colony}>{colony}</option>)}
            </select>
          </label>
          <fieldset className={`${styles.rangeGroup} ${styles.budget}`}>
            <legend>Presupuesto (MXN)</legend>
            <div className={styles.range}>
              <label className={styles.rangeField} htmlFor="pilot-precioMin">
                <span className={styles.srOnly}>Presupuesto mínimo en pesos</span>
                <input id="pilot-precioMin" name="precioMin" inputMode="decimal" placeholder="Desde" value={draft.precioMin} onChange={change}
                  aria-invalid={Boolean(errors.precioMin)} aria-describedby={errors.precioMin ? 'pilot-error-precioMin' : undefined} />
              </label>
              <label className={styles.rangeField} htmlFor="pilot-precioMax">
                <span className={styles.srOnly}>Presupuesto máximo en pesos</span>
                <input id="pilot-precioMax" name="precioMax" inputMode="decimal" placeholder="Hasta" value={draft.precioMax} onChange={change}
                  aria-invalid={Boolean(errors.precioMax)} aria-describedby={errors.precioMax ? 'pilot-error-precioMax' : undefined} />
              </label>
            </div>
            {['precioMin', 'precioMax'].map((key) => errors[key] && <p className={styles.error} role="alert" id={`pilot-error-${key}`} key={key}>{errors[key]}</p>)}
          </fieldset>
          <label className={styles.field} htmlFor="pilot-recamaras">
            <span>Recámaras</span>
            <select id="pilot-recamaras" name="recamaras" value={draft.recamaras} onChange={change}
              aria-invalid={Boolean(errors.recamaras)} aria-describedby={errors.recamaras ? 'pilot-error-recamaras' : undefined}>
              <option value="0">Cualquiera</option>
              {[1, 2, 3, 4, 5].map((number) => <option value={number} key={number}>{number} o más</option>)}
              {Number(draft.recamaras) > 5 && !errors.recamaras && <option value={draft.recamaras}>{draft.recamaras} o más</option>}
            </select>
            {errors.recamaras && <span className={styles.error} role="alert" id="pilot-error-recamaras">{errors.recamaras}</span>}
          </label>
          <button className={styles.apply} type="submit" disabled={pending}>{pending ? 'Buscando…' : 'Ver casas'} <ArrowIcon /></button>
        </div>

        <details className={styles.advanced} open={advancedOpen} onToggle={(event) => setAdvancedOpen(event.currentTarget.open)}>
          <summary>Más filtros{advancedCount > 0 && <span className={styles.extraCount}>{advancedCount}</span>}<span className={styles.plus} aria-hidden="true">+</span></summary>
          <div className={styles.advancedGrid}>
            <label className={styles.field} htmlFor="pilot-banos">
              <span>Baños</span>
              <select id="pilot-banos" name="banos" value={draft.banos} onChange={change}
                aria-invalid={Boolean(errors.banos)} aria-describedby={errors.banos ? 'pilot-error-banos' : undefined}>
                <option value="0">Cualquiera</option>
                {[1, 2, 3, 4].map((number) => <option value={number} key={number}>{number} o más</option>)}
                {Number(draft.banos) > 4 && !errors.banos && <option value={draft.banos}>{draft.banos} o más</option>}
              </select>
              {errors.banos && <span className={styles.error} role="alert" id="pilot-error-banos">{errors.banos}</span>}
            </label>
            <fieldset className={styles.rangeGroup}>
              <legend>Construcción (m²)</legend>
              <div className={styles.range}>
                <label className={styles.rangeField} htmlFor="pilot-m2Min">
                  <span className={styles.srOnly}>Construcción mínima en metros cuadrados</span>
                  <input id="pilot-m2Min" name="m2Min" inputMode="decimal" placeholder="Desde" value={draft.m2Min} onChange={change}
                    aria-invalid={Boolean(errors.m2Min)} aria-describedby={errors.m2Min ? 'pilot-error-m2Min' : undefined} />
                </label>
                <label className={styles.rangeField} htmlFor="pilot-m2Max">
                  <span className={styles.srOnly}>Construcción máxima en metros cuadrados</span>
                  <input id="pilot-m2Max" name="m2Max" inputMode="decimal" placeholder="Hasta" value={draft.m2Max} onChange={change}
                    aria-invalid={Boolean(errors.m2Max)} aria-describedby={errors.m2Max ? 'pilot-error-m2Max' : undefined} />
                </label>
              </div>
              {['m2Min', 'm2Max'].map((key) => errors[key] && <p className={styles.error} role="alert" id={`pilot-error-${key}`} key={key}>{errors[key]}</p>)}
            </fieldset>
            <button className={styles.secondaryApply} type="submit" disabled={pending}>Aplicar filtros</button>
          </div>
        </details>
        {hasDraftChanges && <p className={styles.pendingHint}>Tienes cambios por aplicar.</p>}
      </form>

      {chips.length > 0 && <div className={styles.chips} aria-label="Filtros aplicados">
        {chips.map((chip) => <button type="button" key={chip.key} onClick={() => removeChip(chip.key)} aria-label={`Quitar filtro: ${chip.label}`}>{chip.label}<span aria-hidden="true">×</span></button>)}
        <button type="button" className={styles.clear} onClick={reset}>Limpiar filtros</button>
      </div>}

      <div className={styles.resultsHeader}>
        <div role="status" aria-live="polite" aria-atomic="true">
          <h2 ref={resultsHeadingRef} tabIndex={-1} className={styles.resultTitle}>{filtered.length} {filtered.length === 1 ? 'casa' : 'casas'} en este catálogo</h2>
          <p>{chips.length ? 'Resultados para los filtros aplicados.' : 'Compara ubicación, precio y características.'}</p>
        </div>
        <label className={styles.sort} htmlFor="pilot-orden"><span>Ordenar por</span>
          <select id="pilot-orden" value={applied.sort} onChange={(event) => navigate({ ...applied, sort: event.target.value })}>
            <option value="recientes">Orden del catálogo</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
          </select>
        </label>
      </div>

      <div className={styles.grid} aria-busy={pending}>
        {pageItems.map((property, index) => <Fragment key={property.id}>
          <div className={styles.cardWrap}>
            <PropertyCard property={property} />
            {property.currency && property.currency.toUpperCase() !== 'MXN' && <p className={styles.currency}>Precio publicado en {property.currency.toUpperCase()}</p>}
          </div>
          {pageItems.length > 9 && index === 5 && <div className={styles.inlineAssistant}>
            <PropertySearchAssistant variant="inline" filters={applied} previewOnly={previewOnly} />
          </div>}
        </Fragment>)}
      </div>

      {pageItems.length === 0 ? <div className={styles.empty}>
        <div className={styles.emptyIntro}>
          <h3>{chips.length ? 'No hay casas con todos estos filtros' : 'Por ahora no hay casas en este catálogo'}</h3>
          <p>{chips.length ? 'Amplía el presupuesto o elimina un criterio para explorar más opciones en Monterrey.' : 'Cuéntanos qué necesitas para que un asesor te oriente con tu búsqueda.'}</p>
          {chips.length > 0 && <button type="button" className={styles.reset} onClick={reset}>Ver todas las casas en Monterrey</button>}
        </div>
        <PropertySearchAssistant variant="empty" filters={applied} previewOnly={previewOnly} />
      </div> : <>
        <p className={styles.showing}>Mostrando {firstIndex + 1}–{firstIndex + pageItems.length} de {filtered.length} {filtered.length === 1 ? 'casa' : 'casas'}</p>
        {totalPages > 1 && <nav className={styles.pagination} aria-label="Páginas de casas en venta en Monterrey">
          {currentPage > 1 ? <Link href={hrefFor(currentPage - 1)} scroll={false} onClick={(event) => handlePage(event, currentPage - 1)} className={styles.pageDirection}><ArrowIcon previous /> Anterior</Link>
            : <span className={styles.pageDirection} aria-disabled="true"><ArrowIcon previous /> Anterior</span>}
          <div className={styles.pageNumbers}>
            {paginationItems(currentPage, totalPages).map((item) => typeof item === 'string'
              ? <span key={item} className={styles.ellipsis} aria-hidden="true">…</span>
              : <Link key={item} href={hrefFor(item)} scroll={false} onClick={(event) => handlePage(event, item)} aria-label={`Página ${item}`} aria-current={item === currentPage ? 'page' : undefined}>{item}</Link>)}
          </div>
          {currentPage < totalPages ? <Link href={hrefFor(currentPage + 1)} scroll={false} onClick={(event) => handlePage(event, currentPage + 1)} className={styles.pageDirection}>Siguiente <ArrowIcon /></Link>
            : <span className={styles.pageDirection} aria-disabled="true">Siguiente <ArrowIcon /></span>}
        </nav>}
        <div className={styles.footerAssistant}><PropertySearchAssistant variant="footer" filters={applied} previewOnly={previewOnly} /></div>
      </>}
    </section>
  );
}
