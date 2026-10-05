import Link from 'next/link';

const links = [
  { key: 'all', label: 'Todos los servicios', href: '/servicios' },
  { key: 'sell', label: 'Vender', href: '/servicios/vender-propiedad' },
  { key: 'rent', label: 'Rentar', href: '/servicios/rentar-propiedad' },
  { key: 'buy', label: 'Comprar', href: '/servicios/comprar-propiedad' },
  { key: 'invest', label: 'Invertir', href: '/servicios/inversion-inmobiliaria' },
];

export default function ServiceEditorialNav({ active = 'all' }) {
  return (
    <nav className="service-editorial-nav" aria-label="Servicios principales">
      <div className="service-editorial-nav-inner">
        <span className="service-editorial-nav-label">Servicios Rednorte</span>
        <div className="service-editorial-nav-links">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={active === link.key ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
