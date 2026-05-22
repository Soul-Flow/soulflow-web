"use client";

import {
	CheckCircle,
	DollarSign,
	Info,
	RefreshCw,
	Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { useBoutiqueStore } from "@/store/boutique-store";

export function BespokeFlorist() {
	const {
		submitBespokeRequest,
		bespokeConsultationResult,
		loadingConsultation,
		addToCart,
	} = useBoutiqueStore();

	const [budget, setBudget] = useState<number>(150);
	const [tone, setTone] = useState<
		"Pastel" | "Vibrant" | "White/Neutral" | "Moody"
	>("Pastel");
	const [occasion] = useState<string>("Wedding Anniversary");
	const [floristMessage, setFloristMessage] = useState<string>("");
	const [includeVase, setIncludeVase] = useState<boolean>(true);
	const [referenceStyle, setReferenceStyle] =
		useState<string>("French Atelier");

	const colorTones = [
		{
			id: "Pastel" as const,
			label: "Pastel Sorbet",
			colors: ["#F7D6C8", "#FFF5EA", "#E1E9D5"],
			labelVN: "Tone Pastel dịu ngọt",
		},
		{
			id: "Vibrant" as const,
			label: "Sunset Vibrant",
			colors: ["#D9381E", "#F2A03D", "#AA4B6B"],
			labelVN: "Tone Rực rỡ nổi bật",
		},
		{
			id: "White/Neutral" as const,
			label: "Chic Alabaster",
			colors: ["#F4F1EA", "#D6D1C6", "#A2A997"],
			labelVN: "Tone Trắng / Tự nhiên tao nhã",
		},
		{
			id: "Moody" as const,
			label: "Obsidian Velvet",
			colors: ["#2A1A1F", "#4C3B3F", "#141E30"],
			labelVN: "Tone Trầm tối quyến rũ",
		},
	];

	const styleGuides = [
		{
			id: "French Atelier",
			name: "Claude Monet Meadow",
			desc: "Loose, organic, wildflower aesthetics.",
		},
		{
			id: "Minimalist Tokyo",
			name: "Sogetsu Ikebana",
			desc: "Sculptural lines and ample negative space.",
		},
		{
			id: "Classic Paris",
			name: "Maison Opulence",
			desc: "Tight, dense imperial spiral dome roses.",
		},
	];

	const handleConsult = async (e: React.FormEvent) => {
		e.preventDefault();
		await submitBespokeRequest({
			budget,
			tone,
			occasion,
			floristMessage: floristMessage + ` (Reference Style: ${referenceStyle})`,
			includeArrangementVase: includeVase,
		});
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-sf-bg-elevated transition-colors duration-300">
			{/* Title Header */}
			<div className="text-center space-y-2 mb-12">
				<div className="inline-flex items-center gap-1.5 rounded-full bg-[#C49B83]/10 border border-[#C49B83]/30 px-3 py-1 text-sm uppercase tracking-widest font-bold text-[#C49B83]">
					<Sparkles className="h-3 w-3 animate-spin" />
					AI FLORAL COUTURE
				</div>
				<h1 className="font-serif text-3xl sm:text-4xl font-light text-sf-fg">
					Bespoke Floral Design
				</h1>
				<p className="max-w-md mx-auto text-xs text-[#666666] dark:text-[#A0A0A0] font-light">
					Co-create a masterfully tailored centerpiece with SoulFlow’s
					Gemini-powered design atelier. Input your specifications, budget and
					layout mood below.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
				{/* Left Column Questionnaire Form */}
				<div className="lg:col-span-6 bg-sf-bg-elevated rounded-2xl border border-[#EBE5DA] dark:border-[#222222] p-6 shadow-sm">
					<form onSubmit={handleConsult} className="space-y-6">
						{/* Slider section */}
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<h3 className="text-xs font-bold uppercase tracking-widest text-sf-fg block">
									Design Budget
								</h3>
								<div className="flex items-center text-sm font-semibold text-[#C49B83]">
									<DollarSign className="h-4.5 w-4.5" />
									<span className="text-lg font-bold">{budget}</span>
								</div>
							</div>
							<input
								id="bespoke-budget-slider"
								type="range"
								min="50"
								max="500"
								step="10"
								value={budget}
								onChange={(e) => setBudget(Number(e.target.value))}
								className="w-full h-1.5 bg-[#EBE5DA] dark:bg-[#2C2C2C] rounded-lg appearance-none cursor-pointer accent-[#C49B83]"
							/>
							<div className="flex justify-between text-sm text-[#A0A0A0]">
								<span>Petite Garden ($50)</span>
								<span>Lavish Opulence ($500)</span>
							</div>
						</div>

						{/* Swatch color tones */}
						<div className="space-y-3">
							<h3 className="text-xs font-bold uppercase tracking-widest text-sf-fg block">
								Color Tone Archetype
							</h3>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
								{colorTones.map((t) => {
									const isSelected = tone === t.id;
									return (
										<button
											id={`tone-select-btn-${t.id}`}
											key={t.id}
											type="button"
											onClick={() => setTone(t.id)}
											className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
												isSelected
													? "border-[#C49B83] bg-[#C49B83]/5 ring-1 ring-[#C49B83]"
													: "border-sf-border hover:border-[#C49B83]"
											}`}
										>
											<div className="space-y-1">
												<span className="block text-xs font-semibold text-sf-fg">
													{t.label}
												</span>
												<span className="block text-xs text-[#888888] font-light">
													{t.labelVN}
												</span>

												{/* Swatches dots */}
												<div className="flex gap-1 pt-1.5">
													{t.colors.map((c) => (
														<span
															key={c}
															className="h-3.5 w-3.5 rounded-full border border-white dark:border-[#161616] shadow-xs"
															style={{ backgroundColor: c }}
														/>
													))}
												</div>
											</div>

											{isSelected && (
												<CheckCircle className="h-4.5 w-4.5 text-[#C49B83] shrink-0" />
											)}
										</button>
									);
								})}
							</div>
						</div>

						{/* Design reference styles */}
						<div className="space-y-3">
							<h3 className="text-xs font-bold uppercase tracking-widest text-sf-fg block">
								Reference Motif Style
							</h3>
							<div className="flex gap-2 flex-wrap">
								{styleGuides.map((style) => {
									const isSelected = referenceStyle === style.id;
									return (
										<button
											id={`style-btn-${style.id.toLowerCase().replace(/\s+/g, "-")}`}
											key={style.id}
											type="button"
											onClick={() => setReferenceStyle(style.id)}
											className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-lg border text-left transition-all ${
												isSelected
													? "border-[#C49B83] bg-[#C49B83]/5 text-[#C49B83]"
													: "border-sf-border text-[#666666] dark:text-[#A0A0A0] hover:border-[#C49B83]"
											}`}
										>
											{style.name}
										</button>
									);
								})}
							</div>
						</div>

						{/* Written guidelines message */}
						<div className="space-y-1.5">
							<label
								htmlFor="bespoke-message-input"
								className="text-xs font-bold uppercase tracking-widest text-sf-fg block"
							>
								Occasion and Florist Notes
							</label>
							<textarea
								id="bespoke-message-input"
								rows={3}
								value={floristMessage}
								onChange={(e) => setFloristMessage(e.target.value)}
								placeholder="Declare an occasion (e.g. Wedding, Velvet Anniversary) or list desired flowers (e.g. Include some white hydrangeas, no baby breath...)"
								className="w-full text-xs rounded-xl border border-sf-border bg-sf-bg-elevated text-sf-fg placeholder:text-sf-fg-muted p-3 outline-none focus:border-sf-accent focus:ring-1 focus:ring-sf-accent transition-all duration-200"
							/>
						</div>

						{/* Vase switch */}
						<div className="flex items-center justify-between p-3.5 rounded-xl border border-sf-border">
							<div className="space-y-0.5">
								<span className="text-xs font-semibold text-sf-fg block">
									Include Crystal Vase
								</span>
								<span className="text-sm text-[#888888] font-light leading-none block">
									Comes condition-prepped in French organic plant food.
								</span>
							</div>
							<input
								id="bespoke-vase-checkbox"
								type="checkbox"
								checked={includeVase}
								onChange={(e) => setIncludeVase(e.target.checked)}
								className="h-4.5 w-4.5 rounded border-[#C49B83] dark:border-[#222222] text-[#C49B83] focus:ring-[#C49B83] cursor-pointer"
							/>
						</div>

						{/* Consult Action */}
						<button
							id="bespoke-consult-btn"
							type="submit"
							disabled={loadingConsultation}
							className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] dark:bg-[#FCFAF7] py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-[#1F1A16] hover:bg-[#C49B83] dark:hover:bg-[#C49B83] hover:text-white dark:hover:text-white disabled:opacity-50 transition-all duration-300 shadow-md"
						>
							{loadingConsultation ? (
								<>
									<RefreshCw className="h-4 w-4 animate-spin text-[#C49B83]" />
									Styling Botanical Formula...
								</>
							) : (
								<>
									<Sparkles className="h-4 w-4 text-[#C49B83]" />
									Design Bouquet with Gemini Florist
								</>
							)}
						</button>
					</form>
				</div>

				{/* Right Column Consultation Output Display with Framer Motion transitions */}
				<div className="lg:col-span-6 min-h-100">
					<AnimatePresence mode="wait">
						{/* Loading state placeholders */}
						{loadingConsultation && (
							<motion.div
								key="loading"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="bg-sf-bg-elevated rounded-2xl border border-[#EBE5DA] dark:border-[#222222] p-8 text-center space-y-6"
							>
								<div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C49B83]/10">
									<div className="absolute inset-0 rounded-full border-2 border-t-transparent border-[#C49B83] animate-spin" />
									<Sparkles className="h-6 w-6 text-[#C49B83] animate-pulse" />
								</div>
								<div className="space-y-2">
									<h3 className="font-serif text-lg text-sf-fg">
										Curating Harmonious Specimens...
									</h3>
									<p className="text-[11px] text-[#888888] max-w-sm mx-auto font-light leading-relaxed">
										Analyzing matching seasonal flower species, calculating
										aesthetic geometry for a budget of{" "}
										<span className="font-bold text-[#1A1A1A] dark:text-white">
											${budget}
										</span>
										, and coordinating color chromatics under the Victorian
										flower code.
									</p>
								</div>

								{/* Simulated progress indicators */}
								<div className="flex justify-center gap-1.5 text-[8px] text-[#A0A0A0] uppercase tracking-widest">
									<span className="dot animate-ping">●</span>
									<span className="delay-100 animate-ping">●</span>
									<span className="delay-200 animate-ping">●</span>
								</div>
							</motion.div>
						)}

						{/* Active Output State */}
						{!loadingConsultation && bespokeConsultationResult && (
							<motion.div
								key="results"
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="bg-[#1A1A1A] dark:bg-[#161616] p-6 sm:p-8 rounded-2xl border border-[#C49B83]/40 text-white shadow-xl space-y-6"
							>
								{/* Header Output block */}
								<div className="border-b border-[#C49B83]/30 pb-4">
									<div className="flex items-center gap-2 text-sm text-[#C49B83] font-bold tracking-widest uppercase mb-1">
										<Sparkles className="h-3.5 w-3.5 text-[#C49B83]" />
										Atelier Formula Decoded
									</div>
									<h2 className="font-serif text-2xl font-light tracking-tight text-[#EAE8E4]">
										{bespokeConsultationResult.bouquetName}
									</h2>

									{/* Chroma Palette Display */}
									<div className="flex items-center gap-1.5 mt-2.5">
										<span className="text-xs uppercase font-bold text-[#A0A0A0] tracking-wider mr-1">
											Chroma Palette:
										</span>
										{bespokeConsultationResult.moodPalette.map((col) => (
											<span
												key={col}
												className="h-4.5 w-4.5 rounded-full border border-black/30 shadow-xs"
												style={{ backgroundColor: col }}
												title={col}
											/>
										))}
									</div>
								</div>

								{/* Narrative description */}
								<div className="space-y-1.5 text-xs font-light text-[#CCCCCC]">
									<span className="text-xs uppercase tracking-widest text-[#C49B83] font-bold">
										Aesthetic Expression
									</span>
									<p className="leading-relaxed italic font-serif">
										&quot;{bespokeConsultationResult.aestheticDescription}&quot;
									</p>
								</div>

								{/* Specific recommended blooms list */}
								<div className="space-y-3.5">
									<span className="text-xs uppercase tracking-widest text-[#C49B83] font-bold block">
										Specimen Breakdown
									</span>
									<div className="space-y-3">
										{bespokeConsultationResult.suggestedBlooms.map((bloom) => (
											<div
												key={`${bloom.name}-${bloom.symbolism}`}
												className="bg-black/30 rounded-xl p-3 border border-white/5 space-y-1"
											>
												<div className="flex items-center justify-between">
													<h4 className="font-serif text-sm font-semibold text-[#EAE8E4]">
														{bloom.name}
													</h4>
													<span className="text-[8px] tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded-full text-[#C49B83]">
														Meaningful Pick
													</span>
												</div>
												<p className="text-[11px] text-[#A0A0A0] font-light leading-relaxed">
													<strong className="text-white">Design Role:</strong>{" "}
													{bloom.reasoning}
												</p>
												<p className="text-[11px] text-[#C49B83] italic">
													&quot;{bloom.symbolism}&quot;
												</p>
											</div>
										))}
									</div>
								</div>

								{/* Care Guide / floristry assemble instructions */}
								<div className="bg-black/20 rounded-xl p-4 border border-white/5 space-y-1">
									<span className="text-xs uppercase tracking-widest text-[#C49B83] font-bold block">
										Master Florist Placement Note
									</span>
									<p className="text-[11px] text-[#CCCCCC] font-mono leading-relaxed">
										{bespokeConsultationResult.floristGuideText}
									</p>
								</div>

								{/* Order trigger */}
								<div className="pt-4 flex items-center justify-between border-t border-white/5">
									<div>
										<span className="text-xs text-[#888888] uppercase block">
											Bespoke Price
										</span>
										<span className="text-xl font-bold font-sans text-[#EAE8E4]">
											${budget}
										</span>
									</div>
									<button
										type="button"
										id="bespoke-order-btn"
										onClick={() => {
											const mockFlower = {
												id: "custom-bespoke-item",
												name: bespokeConsultationResult.bouquetName,
												scientificName: "Flora Artisana custom-built",
												priceSmall: budget,
												priceMedium: budget,
												priceLarge: budget,
												description:
													bespokeConsultationResult.aestheticDescription,
												category: "Bespoke Curation",
												symbolism: "Custom design",
												careGuide: bespokeConsultationResult.floristGuideText,
												image:
													"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600",
												popular: false,
											};
											addToCart(mockFlower, "M");
										}}
										className="flex items-center gap-1 px-5 py-3 rounded-xl bg-[#C49B83] hover:bg-[#C49B83]/90 text-white text-xs font-bold uppercase tracking-widest transition-colors"
									>
										Add This Custom Design to Shopping Bag
									</button>
								</div>
							</motion.div>
						)}

						{/* Empty / Intro state */}
						{!loadingConsultation && !bespokeConsultationResult && (
							<motion.div
								key="empty"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="h-full flex flex-col justify-center items-center text-center p-8 bg-sf-bg-elevated border border-dashed border-sf-border rounded-2xl"
							>
								<Sparkles className="h-10 w-10 text-[#C49B83] opacity-65 mb-4 animate-bounce" />
								<h3 className="font-serif text-lg text-sf-fg">
									Atelier Formula Workspace
								</h3>
								<p className="max-w-xs text-xs text-[#666666] dark:text-[#A0A0A0] font-light leading-relaxed mt-1.5">
									Configure your bespoke budget, color chromatics, and written
									wishes, then trigger our AI design system to co-create a
									breathtaking arrangement recipe tailored uniquely for you.
								</p>
								<div className="mt-4 flex items-center gap-1.5 p-3 rounded-lg border border-sf-border max-w-70">
									<Info className="h-3.5 w-3.5 text-[#C49B83] shrink-0" />
									<span className="text-sm text-[#A0A0A0] text-left leading-normal font-light block">
										Secure AI Consultation uses high-grade models directly
										proxying credentials safely on Cloud.
									</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
