// src/app/layout.tsx

import Analytics from '@/components/Analytics'; // Import Plausible Analytics component
import ErrorBoundary from '@/components/ErrorBoundary'; // Import Error Boundary component
// import GoogleAnalytics from '@/utils/analytics'; // Import Google Analytics component (commented out)
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* <GoogleAnalytics /> */} {/* Google Analytics Initialization (commented out) */}
          <Analytics /> {/* Plausible Analytics Initialization */}
          <ErrorBoundary>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {children}
          </ErrorBoundary> {/* Error Boundary */}
        </body>
      </html>
    </ClerkProvider>
  );
}
