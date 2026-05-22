import { BoutiqueShell } from "@/components/boutique-shell";

export default function BoutiqueLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <BoutiqueShell>{children}</BoutiqueShell>;
}
