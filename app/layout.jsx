import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import GlobalModals from '@/components/GlobalModals';
import LanguageToggle from '@/components/LanguageToggle';
import { organizationSchema } from '@/lib/schema';
import { getCanonicalSiteUrl, serializeJsonLd } from '@/lib/security';

const SITE_URL = getCanonicalSiteUrl();

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rednorte Inmobiliaria | Propiedades en Monterrey y su Área Metropolitana',
    template: '%s | Rednorte Inmobiliaria',
  },
  description: 'Compra, vende, renta o valúa propiedades residenciales, comerciales e industriales con Rednorte Inmobiliaria en Monterrey y Nuevo León.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema()) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <GlobalModals />
        <LanguageToggle />
        <Analytics />
      </body>
    </html>
  );
}
