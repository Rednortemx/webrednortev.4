'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Ported from the legacy setSearchTab()/searchHeroProperties(). On submit it
// now navigates to a real, filterable /propiedades?... URL instead of just
// toggling hidden filter <select>s and calling navTo('propiedades').
export default function HeroSearch() {
  const router = useRouter();
  const [op, setOp] = useState('Venta');
  const tipoRef = useRef(null);
  const zonaRef = useRef(null);
  const precioRef = useRef(null);
  const recamarasRef = useRef(null);

  const submit = () => {
    const params = new URLSearchParams();
    if (op) params.set('operacion', op);
    if (tipoRef.current?.value) params.set('tipo', tipoRef.current.value);
    if (zonaRef.current?.value) params.set('zona', zonaRef.current.value);
    if (precioRef.current?.value) params.set('precioMax', precioRef.current.value);
    if (recamarasRef.current?.value && recamarasRef.current.value !== '0') params.set('recamaras', recamarasRef.current.value);
    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="hero-search">
      <h3> Encuentra propiedades en Monterrey y Nuevo León</h3>
      <p style={{ fontSize: '13px', color: 'var(--gris-medio)', lineHeight: 1.5, margin: '0 0 1.5rem' }}>Consulta nuestro inventario residencial, comercial e industrial en venta y renta.</p>
      <div className="search-tabs">
        <button type="button" className={`search-tab${op === 'Venta' ? ' active' : ''}`} onClick={() => setOp('Venta')}>Comprar</button>
        <button type="button" className={`search-tab${op === 'Renta' ? ' active' : ''}`} onClick={() => setOp('Renta')}>Rentar</button>
      </div>
      <div className="search-grid">
        <div className="search-field">
          <label>Tipo de propiedad</label>
          <select ref={tipoRef} defaultValue="">
            <option value="">Todos</option>
            <option value="Casa">Casa</option>
            <option value="Depto">Departamento</option>
            <option value="Local">Local comercial</option>
            <option value="Bodega">Bodega industrial</option>
            <option value="Terreno">Terreno</option>
          </select>
        </div>
        <div className="search-field">
          <label>Municipio / Zona</label>
          <select ref={zonaRef} defaultValue="">
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
        <div className="search-field">
          <label>Precio máximo</label>
          <select ref={precioRef} defaultValue="">
            <option value="">Sin límite</option>
            <option value="2000000">Hasta $2M</option>
            <option value="5000000">Hasta $5M</option>
            <option value="10000000">Hasta $10M</option>
            <option value="20000000">Hasta $20M</option>
          </select>
        </div>
        <div className="search-field">
          <label>Recámaras</label>
          <select ref={recamarasRef} defaultValue="0">
            <option value="0">Cualquiera</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
      <button className="btn-search" type="button" onClick={submit}>Ver propiedades disponibles</button>
    </div>
  );
}
