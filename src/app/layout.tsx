import './globals.css';
import {Inter} from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {SavedOpportunitiesProvider} from '@/context/SavedOpportunitiesContext';
import {ProfileProvider} from '@/context/ProfileContext';

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
          <ProfileProvider>
            <Navbar />
            {children}
            <Footer />
          </ProfileProvider>
        </SavedOpportunitiesProvider>
      </body>
    </html>
  );
}