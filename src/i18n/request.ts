import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async (params) => {
  const locale = params.locale as Locale;

  if (!routing.locales.includes(locale)) {
    throw new Error('Invalid locale');
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});