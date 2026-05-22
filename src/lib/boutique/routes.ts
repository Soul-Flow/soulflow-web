export const boutiqueRoutes = {
	home: "/",
	catalog: "/catalog",
	product: (id: string) => `/catalog/${id}`,
	bespoke: "/bespoke",
	checkout: "/checkout",
	account: "/account",
	contact: "/contact",
} as const;

export type BoutiqueRouteKey = keyof typeof boutiqueRoutes;
