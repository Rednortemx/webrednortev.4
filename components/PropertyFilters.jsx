'use client';

import { useMemo, useState } from 'react';
import PropertyCard from './PropertyCard';

const PROPS_PER_PAGE = 12;

function getPaginationItems(current, total, siblings = 4, boundaries = 1) {
  const range = (start, end) => {
    const r = [];
    for (let i = start; i <= end; i++) r.push(i);
    return r;
  };
  const totalNumbers = siblings * 2 + boundaries * 2 + 3;
  if (total <= totalNumbers) return range(1, total);

  const leftSibling = Math.max(current - siblings, boundaries + 2);
  const rightSibling = Math.min(current + siblings, total - boundaries - 1);
  const showLeftEllipsis = leftSibling > boundaries + 2;
  const showRightEllipsis = rightSibling < total - boundaries - 1;

  const items = range(1, boundaries);
  items.push(...(showLeftEllipsis ? ['...'] : range(boundaries + 1, leftSibling - 1)));
  items.push(...range(leftSibling, rightSibling));
  items.push(...(showRightEllipsis ? ['...'] : range(rightSibling + 1, total - boundaries)));
  items.push(...range(total - boundaries + 1, total));
  return items;
}

// Ported from the legacy applyPropFilters()/renderPropsPage()/clearPropFilters().
// Initial filter values can come from the URL (?operacion=&tipo=&categoria=&zona=...)
// so links from the footer/homepage categories land on a pre-filtered, shareable URL.
export default function PropertyFilters({ properties, initialFilters }) {
  const [operacion, setOperacion] = useState(initialFilters.operacion || '');
  const [tipo, setTipo] = useState(initialFilters.tipo || '');
  const [categoria, setCategoria] = useState(initialFilters.categoria || '');
  const [zona, setZona] = useState(initialFilters.zona || '');
  const [precioMin, setPrecioMin] = useState(initialFilters.precioMin || '');
  const [precioMax, setPrecioMax] = useState(initialFilters.precioMax || '');
  const [recamaras, setRecamaras] = useState(initialFilters.recamaras || '0');
  const [banos, setBanos] = useState(initialFilters.banos || '0');
  const [m2Min, setM2Min] = useState('');
  const [m2Max, setM2Max] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    operacion: operacion, tipo, categoria, zona, precioMin, precioMax, recamaras, banos, m2Min, m2Max,
  });
  const [sort, setSort] = useState('recientes');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const f = appliedFilters;
    const pMin = parseFloat(String(f.precioMin).replace(/,/g, '')) || 0;
    const pMax = parseFloat(String(f.precioMax).replace(/,/g, '')) || Infinity;
    const rec = parseInt(f.recamaras) || 0;
    const ban = parseInt(f.banos) || 0;
    const mMin = parseFloat(f.m2Min) || 0;
    const mMax = parseFloat(f.m2Max) || Infinity;

    let list = properties.filter((p) => {
      if (f.operacion && p.op !== f.operacion) return false;
      if (f.tipo && p.type !== f.tipo) return false;
      if (f.categoria && p.category !== f.categoria) return false;
      if (f.zona && !(p.zone || '').includes(f.zona)) return false;
      if (p.rawPrice && (p.rawPrice < pMin || p.rawPrice > pMax)) return false;
      if (p.rooms < rec) return false;
      if (p.baths < ban) return false;
      const surface = Math.max(p.constructionSize || 0, p.lotSize || 0);
      if (surface && (surface < mMin || surface > mMax)) return false;
      return true;
    });

    if (sort === 'precio-asc') list = [...list].sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sort === 'precio-desc') list = [...list].sort((a, b) => b.rawPrice - a.rawPrice);

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, appliedFilters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PROPS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PROPS_PER_PAGE;
  const pageItems = filtered.slice(start, start + PROPS_PER_PAGE);

  const applyFilters = () => {
    setAppliedFilters({ operacion, tipo, categoria, zona, precioMin, precioMax, recamaras, banos, m2Min, m2Max });
    setPage(1);
  };

  const clearFilters = () => {
    setOperacion(''); setTipo(''); setCategoria(''); setZona('');
    setPrecioMin(''); setPrecioMax(''); setRecamaras('0'); setBanos('0');
    setM2Min(''); setM2Max('');
    setAppliedFilters({ operacion: '', tipo: '', categoria: '', zona: '', precioMin: '', precioMax: '', recamaras: '0', banos: '0', m2Min: '', m2Max: '' });
    setPage(1);
  };

  return (
    <div className="propiedades-layout">
      <aside className="filters-panel">
        <h3> Filtrar propiedades</h3>
        <div className="filter-group">
          <label>Operación</label>
          <select value={operacion} onChange={(e) => setOperacion(e.target.value)}>
            <option value="">Venta y renta</option>
            <option value="Venta">Venta</option>
            <option value="Renta">Renta</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Tipo de propiedad</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="Casa">Casa</option>
            <option value="Depto">Departamento</option>
            <option value="Local">Local comercial</option>
            <option value="Bodega">Bodega industrial</option>
            <option value="Terreno">Terreno</option>
            <option value="Oficina">Oficina</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Categoría</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas</option>
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Municipio / Zona</label>
          <select value={zona} onChange={(e) => setZona(e.target.value)}>
            <option value="">Todos</option>
            <option value="Abasolo">Abasolo</option>
            <option value="Agualeguas">Agualeguas</option>
            <option value="Los Aldamas">Los Aldamas</option>
            <option value="Allende">Allende</option>
            <option value="Anáhuac">Anáhuac</option>
            <option value="Apodaca">Apodaca</option>
            <option value="Aramberri">Aramberri</option>
            <option value="Bustamante">Bustamante</option>
            <option value="Cadereyta Jiménez">Cadereyta Jiménez</option>
            <option value="El Carmen">El Carmen</option>
            <option value="Cerralvo">Cerralvo</option>
            <option value="Ciénega de Flores">Ciénega de Flores</option>
            <option value="China">China</option>
            <option value="Doctor Arroyo">Doctor Arroyo</option>
            <option value="Doctor Coss">Doctor Coss</option>
            <option value="Doctor González">Doctor González</option>
            <option value="Galeana">Galeana</option>
            <option value="García">García</option>
            <option value="San Pedro Garza García">San Pedro Garza García</option>
            <option value="General Bravo">General Bravo</option>
            <option value="General Escobedo">General Escobedo</option>
            <option value="General Terán">General Terán</option>
            <option value="General Treviño">General Treviño</option>
            <option value="General Zaragoza">General Zaragoza</option>
            <option value="General Zuazua">General Zuazua</option>
            <option value="Guadalupe">Guadalupe</option>
            <option value="Hidalgo">Hidalgo</option>
            <option value="Higueras">Higueras</option>
            <option value="Hualahuises">Hualahuises</option>
            <option value="Iturbide">Iturbide</option>
            <option value="Juárez">Juárez</option>
            <option value="Lampazos de Naranjo">Lampazos de Naranjo</option>
            <option value="Linares">Linares</option>
            <option value="Marín">Marín</option>
            <option value="Melchor Ocampo">Melchor Ocampo</option>
            <option value="Mier y Noriega">Mier y Noriega</option>
            <option value="Mina">Mina</option>
            <option value="Montemorelos">Montemorelos</option>
            <option value="Monterrey">Monterrey</option>
            <option value="Parás">Parás</option>
            <option value="Pesquería">Pesquería</option>
            <option value="Los Ramones">Los Ramones</option>
            <option value="Rayones">Rayones</option>
            <option value="Sabinas Hidalgo">Sabinas Hidalgo</option>
            <option value="Salinas Victoria">Salinas Victoria</option>
            <option value="San Nicolás de los Garza">San Nicolás de los Garza</option>
            <option value="Santa Catarina">Santa Catarina</option>
            <option value="Santiago">Santiago</option>
            <option value="Vallecillo">Vallecillo</option>
            <option value="Villaldama">Villaldama</option>
            <option value="Zaragoza">Zaragoza</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Precio</label>
          <div className="price-range">
            <input type="text" inputMode="numeric" placeholder="Mínimo" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} />
            <input type="text" inputMode="numeric" placeholder="Máximo" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} />
          </div>
        </div>
        <div className="filter-group">
          <label>Recámaras mínimas</label>
          <select value={recamaras} onChange={(e) => setRecamaras(e.target.value)}>
            <option value="0">Cualquiera</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Baños mínimos</label>
          <select value={banos} onChange={(e) => setBanos(e.target.value)}>
            <option value="0">Cualquiera</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Superficie (m²)</label>
          <div className="price-range">
            <input type="text" inputMode="numeric" placeholder="Mín m²" value={m2Min} onChange={(e) => setM2Min(e.target.value)} />
            <input type="text" inputMode="numeric" placeholder="Máx m²" value={m2Max} onChange={(e) => setM2Max(e.target.value)} />
          </div>
        </div>
        <button className="btn-search" style={{ marginTop: '0.5rem' }} type="button" onClick={applyFilters}>Aplicar filtros</button>
        <button className="btn-clear-filters" type="button" onClick={clearFilters}> Limpiar filtros</button>
      </aside>

      <div className="props-results" style={{ minWidth: 0 }}>
        <div className="props-header">
          <div className="props-count"><strong>{filtered.length} propiedades</strong> encontradas</div>
          <div className="props-sort">
            <label>Ordenar:</label>
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
              <option value="recientes">Más recientes</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
        <div className="props-grid">
          {pageItems.length > 0 ? (
            pageItems.map((p) => <PropertyCard key={p.id} property={p} />)
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--gris-medio)' }}>
              No encontramos propiedades con esos filtros. <br />
              <button className="btn-clear-filters" style={{ marginTop: '1rem' }} type="button" onClick={clearFilters}>Limpiar filtros</button>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button className="pag-btn" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 10)} title="Retroceder 10 páginas" type="button">«</button>
            <button className="pag-btn" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} type="button">‹</button>
            {getPaginationItems(currentPage, totalPages).map((item, i) =>
              item === '...' ? (
                <span key={`e${i}`} className="pag-ellipsis">…</span>
              ) : (
                <button key={item} className={`pag-btn${item === currentPage ? ' active' : ''}`} onClick={() => setPage(item)} type="button">{item}</button>
              )
            )}
            <button className="pag-btn" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} type="button">›</button>
            <button className="pag-btn" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 10)} title="Adelantar 10 páginas" type="button">»</button>
          </div>
        )}
      </div>
    </div>
  );
}
