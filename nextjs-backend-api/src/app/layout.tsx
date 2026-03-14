import type { Metadata } from 'next';
import '@/app/globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'LearnHub',
  description: 'Mini learning platform assignment project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="container page-content">{children}</main>
      </body>
    </html>
  );
}
