import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { GeistSans } from 'geist/font/sans';

import "./globals.css";

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
			<body className="font-sans   bg-gradient-to-b from-gray-50 to-gray-100">
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
