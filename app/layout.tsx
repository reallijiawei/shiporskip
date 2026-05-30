import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ShipOrSkip - Brutally Validate Your Indie Product Idea',
  description:
    'Get a brutal Build / Skip / Validate First verdict with market signals, founder-inspired critiques, and failure pattern detection before you waste weeks building.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KCX8SSKHC6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KCX8SSKHC6');
          `}
        </Script>
      </head>
      <body className={`${dmSans.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
