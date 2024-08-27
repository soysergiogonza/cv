import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
	title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
	description: RESUME_DATA.about,
	icons: {
		icon: "favicon.svg",
	},
};

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="es" className={inter.className}>
			<body>{children}</body>
		</html>
	);
}
