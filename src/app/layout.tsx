import '@/global.scss';
import '@/styles/themes.scss';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@components/ThemeProvider';
import { ModalProvider } from '@components/page/ModalContext';
import RootLayoutContent from './RootLayoutContent';
import DynamicFavicon from '@components/DynamicFavicon';

// Football-themed images for rotating favicon
const FAVICON_IMAGES = [
  { src: '/images/hero/henry.jpeg', alt: 'Henry' },
  { src: '/images/hero/messi.jpeg', alt: 'Messi' },
  { src: '/images/hero/brazil.jpg', alt: 'Brazil' },
  { src: '/images/hero/nl.jpeg', alt: 'Netherlands' },
];

// Using a soccer ball character for the app icon: ⚽
const APP_ICON = '⚽';

export const metadata: Metadata = {
  title: 'Voet',
  description: 'A modern football data platform',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Voet',
  },
  icons: {
    icon: [
      { url: '/app-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/app-icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/app-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/app-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'msapplication-TileColor': '#1a1a1a',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1a1a1a" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1a1a1a" />
      </head>
      <body>
        <ThemeProvider>
          <ModalProvider>
            <DynamicFavicon images={FAVICON_IMAGES} />
            <RootLayoutContent>{children}</RootLayoutContent>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
