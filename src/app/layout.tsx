import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { BoutiqueProviders } from "@/providers/boutique-providers";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const inter = Inter({
	variable: "--font-geist-sans",
	subsets: ["latin", "vietnamese"],
});

const playfair = Playfair_Display({
	variable: "--font-serif",
	subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
	title: "SoulFlow Boutique Florist",
	description:
		"Bespoke botanical couture — luxury floral arrangements and AI-powered design consultations.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="vi"
			className={`${inter.variable} ${playfair.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			{/* QUAN TRỌNG: Thêm bg-sf-bg và text-sf-fg vào body */}
			<body className="min-h-full flex flex-col bg-sf-bg text-sf-fg transition-colors duration-300">
				<ThemeProvider>
					<BoutiqueProviders>{children}</BoutiqueProviders>
				</ThemeProvider>
			</body>
		</html>
	);
}
