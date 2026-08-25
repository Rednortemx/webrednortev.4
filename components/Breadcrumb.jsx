import { Fragment } from 'react';
import Link from 'next/link';

// items: [{ label, href? }] — el último item no lleva href (página actual).
//
// El separador y la página actual llevan clases propias a propósito: antes
// ambos eran <span> sueltos y la hoja de estilos los pintaba igual, con el
// gris clarísimo pensado para el "›". El resultado era que el título de la
// página quedaba casi del mismo color que el fondo y no se leía.
export default function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb-inner">
        <Link href="/">Inicio</Link>
        {items.map((item, i) => (
          <Fragment key={i}>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span className="breadcrumb-current" aria-current="page">{item.label}</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
