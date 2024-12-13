import { GeistSans } from 'geist/font/sans';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import './globals.css';

export default async function LocaleLayout({
 children,
 params: { locale },
}: {
 children: ReactNode;
 params: { locale: string };
}) {
 const messages = await getMessages();

 return (
  <html lang={locale} className={GeistSans.variable}>
   <body className='font-sans'>
    <NextIntlClientProvider messages={messages}>
     {children}
    </NextIntlClientProvider>
   </body>
  </html>
 );
}
