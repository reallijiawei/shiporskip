import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In to ShipOrSkip',
  description:
    'Log in or create a ShipOrSkip account to save product idea validation reports and run AI-powered build, skip, or validate-first analysis.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
