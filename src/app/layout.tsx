import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import { SavedOpportunitiesProvider } from '@/context/SavedOpportunitiesContext';

const inter = Inter({
  subsets: ['latin']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SavedOpportunitiesProvider>
          <Navbar />
          {children}
        </SavedOpportunitiesProvider>
      </body>
    </html>
  );
}