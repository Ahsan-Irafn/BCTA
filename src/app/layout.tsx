import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { constructMetadata, getOrganizationStructuredData } from '@/lib/seo';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-red-hat',
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={redHatDisplay.variable} style={{ margin: 0, padding: 0, background: '#07111f' }}>
      <body style={{ margin: 0, padding: 0, background: '#07111f', minHeight: '100vh', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
