"use client";

import { type ReactNode, useEffect } from "react";
import { useBoutiqueStore } from "@/store/boutique-store";

type BoutiqueProvidersProps = {
	children: ReactNode;
};

/** Loads catalog and location data once on the client after hydration. */
export function BoutiqueProviders({ children }: BoutiqueProvidersProps) {
	const fetchFlowers = useBoutiqueStore((state) => state.fetchFlowers);
	const fetchLocationData = useBoutiqueStore(
		(state) => state.fetchLocationData,
	);

	useEffect(() => {
		void fetchFlowers();
		void fetchLocationData();
	}, [fetchFlowers, fetchLocationData]);

	return children;
}
