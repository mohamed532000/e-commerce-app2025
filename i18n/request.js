import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    getMessageFallback({key , namespace , error}) {
      if(process.env.NODE_ENV === "development") {
        console.warn(`[next-intl] Missing translation for key: "${key}"`);
      }
      // return `Now translate for the (${key}) ${namespace} ${error}`
      return ``
    }
  };
});