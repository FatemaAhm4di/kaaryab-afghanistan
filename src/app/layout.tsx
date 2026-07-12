import './globals.css';
import {Inter} from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {SavedOpportunitiesProvider} from '@/context/SavedOpportunitiesContext';
import {ProfileProvider} from '@/context/ProfileContext';
import {ThemeProvider} from '@/context/ThemeContext';
import {OpportunitiesProvider} from '@/context/OpportunitiesContext';

const inter = Inter({
  subsets: ['latin']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <OpportunitiesProvider>
            <SavedOpportunitiesProvider>
              <ProfileProvider>
                <Navbar />
                {children}
                <Footer />
              </ProfileProvider>
            </SavedOpportunitiesProvider>
          </OpportunitiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}