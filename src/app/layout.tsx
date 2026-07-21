import './globals.css';
import { Inter } from 'next/font/google';
import { Vazirmatn } from 'next/font/google';
import { SavedOpportunitiesProvider } from '@/context/SavedOpportunitiesContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { OpportunitiesProvider } from '@/context/OpportunitiesContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${vazirmatn.variable} bg-[var(--color-background)] antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <OpportunitiesProvider>
            <SavedOpportunitiesProvider>
              <ProfileProvider>{children}</ProfileProvider>
            </SavedOpportunitiesProvider>
          </OpportunitiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}