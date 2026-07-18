import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing, Locale } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const titles: Record<Locale, string> = {
    fa: 'KaarYab افغانستان',
    en: 'KaarYab Afghanistan',
    ps: 'KaarYab افغانستان',
  };

  const descriptions: Record<Locale, string> = {
    fa: 'پلتفرم پیدا کردن فرصت‌های شغلی، بورسیه، کارآموزی و دوره‌های آنلاین برای جوانان افغانستان',
    en: 'Opportunity finder platform for Afghan youth to discover jobs, internships, scholarships, and online courses',
    ps: 'د افغانستان ځوانانو لپاره د کار، بورس، کارآموزي او آنلاین کورسونو د موندلو پلیټ فورم',
  };

  return {
    metadataBase: new URL('https://kaaryab-afghanistan.vercel.app'),
    title: {
      template: `%s | ${titles[locale as Locale]}`,
      default: titles[locale as Locale],
    },
    description: descriptions[locale as Locale],
    authors: [{ name: 'Fatema Ahmadi' }],
    creator: 'KaarYab Afghanistan',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}