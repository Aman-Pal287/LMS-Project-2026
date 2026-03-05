/**
 * Root Layout
 * 
 * This is the root layout component for the Next.js App Router.
 * Wraps all page and API routes.
 * For a backend-only API, this is minimal.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js Backend API',
  description: 'RESTful API server built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
