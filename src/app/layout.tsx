import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { AuthProvider, ThemeProvider } from '@/components';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finovate',
  description: 'Finovate is a financial application for managing your money.'
};

export default function RootLayout({ children }: Children) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${font.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
