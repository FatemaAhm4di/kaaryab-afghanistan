import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale: locale as Locale,
    messages
  };
});