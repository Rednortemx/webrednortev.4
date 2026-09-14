import './globals.css';
import './globals.insights.css';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import GlobalModals from '@/components/GlobalModals';
import LanguageToggle from '@/components/LanguageToggle';
import PrivacyAnalytics from '@/components/PrivacyAnalytics';
import { organizationSchema } from '@/lib/schema';
import { getCanonicalSiteUrl, serializeJsonLd } from '@/lib/security';

const SITE_URL = getCanonicalSiteUrl();

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rednorte Inmobiliaria | Propiedades en Monterrey y su Área Metropolitana',
    template: '%s | Rednorte Inmobiliaria',
  },
  description: 'Compra, vende, renta o valúa propiedades residenciales, comerciales e industriales con Rednorte Inmobiliaria en Monterrey y Nuevo León.',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: 'Rednorte Inmobiliaria',
    title: 'Rednorte Inmobiliaria | Propiedades en Monterrey y su Área Metropolitana',
    description: 'Compra, vende, renta o valúa propiedades residenciales, comerciales e industriales con Rednorte Inmobiliaria en Monterrey y Nuevo León.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rednorte Inmobiliaria | Propiedades en Monterrey',
    description: 'Compra, vende, renta o valúa propiedades con Rednorte Inmobiliaria en Monterrey y Nuevo León.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
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
        <PrivacyAnalytics />
      </body>
    </html>
  );
}
