"use client";

import {
	ArrowLeft,
	CheckCircle2,
	Heart,
	ShieldAlert,
	ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { boutiqueRoutes } from "@/lib/boutique/routes";
import { useBoutiqueStore } from "@/store/boutique-store";
import type { FlowerSize } from "@/types/boutique";

type FlowerDetailsProps = {
	productId: string;
};

export function FlowerDetails({ productId }: FlowerDetailsProps) {
	const router = useRouter();
	const { flowers, addToCart } = useBoutiqueStore();
	const [selectedSize, setSelectedSize] = useState<FlowerSize>("M");

	const currentFlower =
		flowers.find((flower) => flower.id === productId) ?? flowers[0];

	// Derive current price
	const price =
		selectedSize === "S"
			? currentFlower.priceSmall
			: selectedSize === "M"
				? currentFlower.priceMedium
				: currentFlower.priceLarge;

	const sizeLabels = [
		{
			code: "S" as FlowerSize,
			label: "Petite",
			desc: "Perfect size for nightstands and personal workspaces.",
			price: currentFlower.priceSmall,
		},
		{
			code: "M" as FlowerSize,
			label: "Signature",
			desc: "The classic floristry standard size. Abundant & refined.",
			price: currentFlower.priceMedium,
		},
		{
			code: "L" as FlowerSize,
			label: "Grand Lux",
			desc: "Extra stems and high-volume foliage for stunning centerpieces.",
			price: currentFlower.priceLarge,
		},
	];

	// Related products carousel selection
	const relatedFlowers = flowers
		.filter((f) => f.id !== currentFlower.id)
		.slice(0, 3);

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-sf-bg-elevated transition-colors duration-300">
			{/* Return Page Trigger */}
			<Link
				id="detail-back-btn"
				href={boutiqueRoutes.catalog}
				className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#666666] dark:text-[#A0A0A0] hover:text-[#C49B83] transition-colors duration-200 mb-8"
			>
				<ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
				Back to Botanical Collection
			</Link>

			{/* Main Showcase Layout */}
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20">
				{/* Left Column Image Frame */}
				<div className="lg:col-span-6 relative">
					<div className="overflow-hidden rounded-2xl border border-[#EBE5DA] dark:border-[#C49B83]/30 bg-sf-bg-elevated p-3 shadow-lg">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={currentFlower.image}
							alt={currentFlower.name}
							className="aspect-square w-full object-cover rounded-xl grayscale-1/10 hover:grayscale-0 transition-all duration-300"
							referrerPolicy="no-referrer"
						/>
					</div>

					<div className="absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-black/60 shadow-md backdrop-blur-xs text-[#C49B83] cursor-pointer">
						<Heart className="h-4 w-4 hover:fill-current transition-colors" />
					</div>
				</div>

				{/* Right Info and Custom Picker Column */}
				<div className="lg:col-span-6 flex flex-col justify-between">
					<div className="space-y-6">
						<div>
							<span className="text-sm uppercase tracking-widest text-[#C49B83] font-bold block mb-1">
								{currentFlower.category}
							</span>
							<h1 className="font-serif text-3xl sm:text-4xl font-light  text-sf-fg">
								{currentFlower.name}
							</h1>
							<p className="font-mono text-xs text-[#A0A0A0] italic mt-0.5">
								{currentFlower.scientificName}
							</p>
						</div>

						{/* Simulated Live Pricing Display */}
						<div className="flex items-center gap-4">
							<span className="font-sans text-3xl font-bold text-sf-fg">
								${price}
							</span>
							<span className="rounded-full bg-[#C49B83]/10 px-3 py-1 text-xs font-bold text-[#C49B83] uppercase tracking-widest">
								Local Delivery Ready
							</span>
						</div>

						<p className="text-sm text-[#666666] dark:text-[#A0A0A0] leading-relaxed font-light">
							{currentFlower.description}
						</p>

						{/* Botanical Magic and Meaning section */}
						<div className="rounded-xl border border-dashed border-[#C49B83]/40 bg-[#C49B83]/5 p-4 space-y-1.5">
							<span className="text-sm font-bold uppercase tracking-widest text-[#C49B83] block">
								Secret Symbolism (*Le Langage*)
							</span>
							<p className="font-serif italic  text-sf-fg text-sm">
								&quot;{currentFlower.symbolism}&quot;
							</p>
						</div>

						{/* Size interactive Picker */}
						<div className="space-y-3">
							<span className="text-sm font-bold uppercase tracking-widest  text-sf-fg block">
								Select Display Size
							</span>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
								{sizeLabels.map((s) => {
									const isSelected = selectedSize === s.code;
									return (
										<button
											type="button"
											id={`detail-size-btn-${s.code}`}
											key={s.code}
											onClick={() => setSelectedSize(s.code)}
											className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between h-24 ${
												isSelected
													? "border-[#C49B83] bg-[#C49B83]/5 ring-2 ring-[#C49B83]"
													: "border-sf-border hover:border-[#C49B83]"
											}`}
										>
											<div className="flex items-center justify-between w-full">
												<span className="font-bold text-sm  text-sf-fg">
													{s.label} ({s.code})
												</span>
												{isSelected && (
													<CheckCircle2 className="h-4 w-4 text-[#C49B83]" />
												)}
											</div>
											<div>
												<p className="text-xs text-[#A0A0A0] dark:text-[#888888] line-clamp-1 leading-tight">
													{s.desc}
												</p>
												<p className="text-xs font-bold  text-sf-fg mt-1">
													${s.price}
												</p>
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</div>

					{/* Checkout/Add to Cart Actions */}
					<div className="flex flex-col sm:flex-row items-stretch gap-4 border-t border-[#EBE5DA] dark:border-[#C49B83]/30 mt-8 pt-6">
						<button
							type="button"
							id="detail-add-cart-btn"
							onClick={() => addToCart(currentFlower, selectedSize)}
							className="group grow flex items-center justify-center gap-2.5 rounded-xl bg-[#1A1A1A] dark:bg-[#FCFAF7] py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-[#1F1A16] hover:bg-[#C49B83] dark:hover:bg-[#C49B83] hover:text-white dark:hover:text-white transition-all duration-300 shadow-md"
						>
							<ShoppingBag className="h-4 w-4" />
							Add Arrangement to Shopping Bag
						</button>
					</div>
				</div>
			</div>

			{/* Flower Care Guide and Accordion Panels */}
			<section className="mb-20">
				<h2 className="font-serif text-2xl font-light  text-sf-fg mb-4">
					Botanical Preservation Guidelines
				</h2>
				<div className="rounded-2xl border border-[#C49B83]/30 bg-sf-bg-elevated p-6 text-xs sm:text-sm text-[#666666] dark:text-[#A0A0A0] leading-relaxed max-w-4xl font-light space-y-2">
					<p>{currentFlower.careGuide}</p>
					<div className="pt-2 border-t border-[#C49B83]/30 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
						<ShieldAlert className="h-4 w-4" />
						Vase note: Use soft clean water. Trim foliage submersions to keep
						clean stems.
					</div>
				</div>
			</section>

			{/* Related items ("You May Also Like") */}
			<section>
				<div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C49B83]/30">
					<h2 className="font-serif text-2xl font-light  text-sf-fg">
						You May Also Like
					</h2>
					<Link
						id="detail-view-all-similar-btn"
						href={boutiqueRoutes.catalog}
						className="text-xs font-bold text-[#C49B83] uppercase tracking-wider hover:underline"
					>
						Explore Complete Collection
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
					{relatedFlowers.map((item) => (
						<button
							type="button"
							id={`detail-related-${item.id}`}
							key={item.id}
							onClick={() => {
								router.push(boutiqueRoutes.product(item.id));
								setSelectedSize("M");
							}}
							className="group cursor-pointer overflow-hidden rounded-xl border border-[#C49B83]/30 bg-sf-bg-elevated p-3 shadow-xs hover:shadow-sm hover:-translate-y-1 transition-all"
						>
							<div className="aspect-square w-full overflow-hidden rounded-lg bg-[#EBE5DA] dark:bg-[#2C2C2C] grayscale-1/10 group-hover:grayscale-0">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.image}
									alt={item.name}
									className="h-full w-full object-cover group-hover:scale-103 transition-transform"
									referrerPolicy="no-referrer"
								/>
							</div>
							<div className="mt-3">
								<span className="text-[8px] tracking-widest uppercase font-bold text-[#C49B83] block">
									{item.category}
								</span>
								<h4 className="font-serif text-sm font-semibold  text-sf-fg mt-0.5 group-hover:text-[#C49B83] line-clamp-1">
									{item.name}
								</h4>
								<p className="font-sans text-xs font-bold  text-sf-fg mt-1">
									${item.priceMedium}
								</p>
							</div>
						</button>
					))}
				</div>
			</section>
		</div>
	);
}
