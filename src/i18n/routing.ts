import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fa', 'ps'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];