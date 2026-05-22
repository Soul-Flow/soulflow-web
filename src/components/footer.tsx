"use client";

import { ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { boutiqueRoutes } from "@/lib/boutique/routes";

export function Footer() {
	return (
		<footer className="bg-sf-bg border-t border-sf-border transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<div className="space-y-3">
						<span className="font-sans font-bold text-sm tracking-[0.25em] text-sf-fg">
							SOULFLOW
						</span>
						<p className="text-xs text-sf-fg-muted font-light leading-relaxed">
							An elegant botanical sanctuary and luxury flower preservation
							atelier. We design using the secret language of 19th-century
							Victorian floristry.
						</p>
					</div>

					<div className="space-y-3">
						<h4 className="text-sm font-bold tracking-widest uppercase text-sf-accent">
							Atelier Links
						</h4>
						<ul className="space-y-1 text-xs font-light text-sf-fg-muted">
							<li>
								<Link
									id="footer-btn-home"
									href={boutiqueRoutes.home}
									className="hover:text-sf-accent transition-colors"
								>
									Home Atelier
								</Link>
							</li>
							<li>
								<Link
									id="footer-btn-catalog"
									href={boutiqueRoutes.catalog}
									className="hover:text-sf-accent transition-colors"
								>
									Botanical Catalog
								</Link>
							</li>
							<li>
								<Link
									id="footer-btn-bespoke"
									href={boutiqueRoutes.bespoke}
									className="hover:text-sf-accent transition-colors"
								>
									Bespoke Floral Design
								</Link>
							</li>
							<li>
								<Link
									id="footer-btn-contact"
									href={boutiqueRoutes.contact}
									className="hover:text-sf-accent transition-colors font-medium"
								>
									Get in Touch
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-3">
						<h4 className="text-sm font-bold tracking-widest uppercase text-sf-accent">
							Accreditation
						</h4>
						<div className="space-y-2 text-xs font-light text-sf-fg-muted leading-relaxed">
							<div className="flex items-center gap-1.5 text-sm uppercase font-bold text-sf-fg">
								<Sparkles className="h-3.5 w-3.5 text-sf-accent" />
								Eco-Certified Grower
							</div>
							<p className="text-[11px]">
								Every stem is organically groomed by family boutique fields,
								minimizing nitrogenous impacts.
							</p>
						</div>
					</div>

					<div className="space-y-3">
						<h4 className="text-sm font-bold tracking-widest uppercase text-sf-accent">
							Head Office
						</h4>
						<p className="text-xs text-sf-fg-muted leading-relaxed font-light">
							88 Đồng Khởi, Bến Nghé Ward, District 1, Ho Chi Minh City, Vietnam
						</p>
						<div className="flex items-center gap-1 text-sm text-sf-fg-muted font-semibold uppercase">
							<ShieldCheck className="h-4 w-4 text-green-500" />
							Secure SSL Checkout Gateway
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-sf-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-sf-fg-muted">
					<p>© 2026 SoulFlow Flower Boutique Vietnam. All rights reserved.</p>
					<div className="flex gap-4">
						<span className="hover:underline cursor-pointer">
							Privacy Policy
						</span>
						<span className="hover:underline cursor-pointer">
							Terms of Preservations
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
