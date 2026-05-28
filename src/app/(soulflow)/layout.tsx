import { SoulFlowShell } from "@/components/boutique-shell";

export default function SoulFlowLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <SoulFlowShell>{children}</SoulFlowShell>;
}
