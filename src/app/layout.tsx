import './globals.css';
import {Inter} from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {SavedOpportunitiesProvider} from '@/context/SavedOpportunitiesContext';
import {ProfileProvider} from '@/context/ProfileContext';
import {ThemeProvider} from '@/context/ThemeContext';

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
          <SavedOpportunitiesProvider>
            <ProfileProvider>
              <Navbar />
              {children}
              <Footer />
            </ProfileProvider>
          </SavedOpportunitiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}