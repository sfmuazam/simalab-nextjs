import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
// import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SIMALAB',
  description: 'Sistem Manajemen Laboratorium Informatika'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        {/* <Providers session={session}> */}
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
