// "use client";

// import {
// 	CheckCircle,
// 	DollarSign,
// 	Info,
// 	RefreshCw,
// 	Sparkles,
// } from "lucide-react";
// import { AnimatePresence, motion } from "motion/react";
// import Image from "next/image";
// import type React from "react";
// import { useState } from "react";
// import { useBoutiqueStore } from "@/store/boutique-store";

export function BespokeFlorist() {
	// const {
	// 	submitBespokeRequest,
	// 	bespokeConsultationResult,
	// 	loadingConsultation,
	// 	addToCart,
	// } = useBoutiqueStore();

	// const [budget, setBudget] = useState<number>(150);
	// const [tone, setTone] = useState<
	// 	"Pastel" | "Vibrant" | "White/Neutral" | "Moody"
	// >("Pastel");
	// const [occasion] = useState<string>("Wedding Anniversary");
	// const [floristMessage, setFloristMessage] = useState<string>("");
	// const [includeVase] = useState<boolean>(true);

	// // State mới cho Category / Loại hoa
	// const [category, setCategory] = useState<string>("All");

	// const colorTones = [
	// 	{
	// 		id: "Pastel" as const,
	// 		label: "Pastel Sorbet",
	// 		colors: ["#F7D6C8", "#FFF5EA", "#E1E9D5"],
	// 		labelVN: "Tone Pastel dịu ngọt",
	// 	},
	// 	{
	// 		id: "Vibrant" as const,
	// 		label: "Sunset Vibrant",
	// 		colors: ["#D9381E", "#F2A03D", "#AA4B6B"],
	// 		labelVN: "Tone Rực rỡ nổi bật",
	// 	},
	// 	{
	// 		id: "White/Neutral" as const,
	// 		label: "Chic Alabaster",
	// 		colors: ["#F4F1EA", "#D6D1C6", "#A2A997"],
	// 		labelVN: "Tone Trắng / Tự nhiên tao nhã",
	// 	},
	// 	{
	// 		id: "Moody" as const,
	// 		label: "Obsidian Velvet",
	// 		colors: ["#2A1A1F", "#4C3B3F", "#141E30"],
	// 		labelVN: "Tone Trầm tối quyến rũ",
	// 	},
	// ];

	// // Danh mục hoa (Mốt bạn map cái này với API GET /categories từ bảng Categories)
	// const flowerCategories = [
	// 	{ id: "All", name: "Tùy ý Designer (Mix)" },
	// 	{ id: "Roses", name: "Hoa Hồng (Roses)" },
	// 	{ id: "Peonies", name: "Mẫu Đơn (Peonies)" },
	// 	{ id: "Tulips", name: "Tulip Hiện Đại" },
	// 	{ id: "Orchids", name: "Hoa Lan Sang Trọng" },
	// ];

	// const handleConsult = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	// Mốt khi có Backend, bạn sẽ gọi API ở đây:
	// 	// fetch(`/api/products/suggest?budget=${budget}&tone=${tone}&category=${category === 'All' ? '' : category}`)

	// 	await submitBespokeRequest({
	// 		budget,
	// 		tone,
	// 		occasion,
	// 		floristMessage: `${floristMessage}·(Preferred·Category:·${category})`,
	// 		includeArrangementVase: includeVase,
	// 	});
	// };

	//return (
	// <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-sf-bg-elevated transition-colors duration-300">
	// 	{/* Title Header */}
	// 	<div className="text-center space-y-2 mb-12">
	// 		<div className="inline-flex items-center gap-1.5 rounded-full bg-[#C49B83]/10 border border-[#C49B83]/30 px-3 py-1 text-sm uppercase tracking-widest font-bold text-[#C49B83]">
	// 			<Sparkles className="h-3 w-3 animate-spin" />
	// 			Gợi Ý Thông Minh
	// 		</div>
	// 		<h1 className="font-serif text-3xl sm:text-4xl font-light text-sf-fg">
	// 			Tìm Kiếm Hoa Hoàn Hảo
	// 		</h1>
	// 		<p className="max-w-md mx-auto text-xs text-[#666666] dark:text-[#A0A0A0] font-light">
	// 			Nhập ngân sách, chọn tone màu và loài hoa yêu thích. Hệ thống của
	// 			SoulFlow sẽ tự động quét kho và gợi ý thiết kế phù hợp nhất cho bạn.
	// 		</p>
	// 	</div>

	// 	<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
	// 		{/* Left Column Questionnaire Form */}
	// 		<div className="lg:col-span-6 bg-sf-bg-elevated rounded-2xl border border-[#EBE5DA] dark:border-[#222222] p-6 shadow-sm">
	// 			<form onSubmit={handleConsult} className="space-y-6">
	// 				{/* Slider section */}
	// 				<div className="space-y-2">
	// 					<div className="flex justify-between items-center">
	// 						<h3 className="text-xs font-bold uppercase tracking-widest text-sf-fg block">
	// 							Ngân Sách Của Bạn
	// 						</h3>
	// 						<div className="flex items-center text-sm font-semibold text-[#C49B83]">
	// 							<DollarSign className="h-4.5 w-4.5" />
	// 							<span className="text-lg font-bold">{budget}</span>
	// 						</div>
	// 					</div>
	// 					<input
	// 						id="bespoke-budget-slider"
	// 						type="range"
	// 						min="50"
	// 						max="500"
	// 						step="10"
	// 						value={budget}
	// 						onChange={(e) => setBudget(Number(e.target.value))}
	// 						className="w-full h-1.5 bg-[#EBE5DA] dark:bg-[#2C2C2C] rounded-lg appearance-none cursor-pointer accent-[#C49B83]"
	// 					/>
	// 					<div className="flex justify-between text-xs text-[#A0A0A0]">
	// 						<span>Bó nhỏ ($50)</span>
	// 						<span>Thiết kế cao cấp ($500)</span>
	// 					</div>
	// 				</div>

	// 				{/* Swatch color tones */}
	// 				<div className="space-y-3">
	// 					<h3 className="text-xs font-bold uppercase tracking-widest text-sf-fg block">
	// 						Tone Màu Yêu Thích
	// 					</h3>
	// 					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
	// 						{colorTones.map((t) => {
	// 							const isSelected = tone === t.id;
	// 							return (
	// 								<button
	// 									id={`tone-select-btn-${t.id}`}
	// 									key={t.id}
	// 									type="button"
	// 									onClick={() => setTone(t.id)}
	// 									className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
	// 										isSelected
	// 											? "border-[#C49B83] bg-[#C49B83]/5 ring-1 ring-[#C49B83]"
	// 											: "border-sf-border hover:border-[#C49B83]"
	// 									}`}
	// 								>
	// 									<div className="space-y-1">
	// 										<span className="block text-xs font-semibold text-sf-fg">
	// 											{t.label}
	// 										</span>
	// 										<span className="block text-[10px] text-[#888888] font-light uppercase tracking-wider">
	// 											{t.labelVN}
	// 										</span>

	// 										{/* Swatches dots */}
	// 										<div className="flex gap-1 pt-1.5">
	// 											{t.colors.map((c) => (
	// 												<span
	// 													key={c}
	// 													className="h-3.5 w-3.5 rounded-full border border-white dark:border-[#161616] shadow-xs"
	// 													style={{ backgroundColor: c }}
	// 												/>
	// 											))}
	// 										</div>
	// 									</div>

	// 									{isSelected && (
	// 										<CheckCircle className="h-4.5 w-4.5 text-[#C49B83] shrink-0" />
	// 									)}
	// 								</button>
	// 							);
	// 						})}
	// 					</div>
	// 				</div>

	// 				{/* Category Filters */}
	// 				<div className="space-y-3">
	// 					<h3 className="text-xs font-bold uppercase tracking-widest text-sf-fg block">
	// 						Danh Mục / Loài Hoa Chủ Đạo
	// 					</h3>
	// 					<div className="flex gap-2 flex-wrap">
	// 						{flowerCategories.map((cat) => {
	// 							const isSelected = category === cat.id;
	// 							return (
	// 								<button
	// 									key={cat.id}
	// 									type="button"
	// 									onClick={() => setCategory(cat.id)}
	// 									className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-lg border text-left transition-all ${
	// 										isSelected
	// 											? "border-[#C49B83] bg-[#C49B83]/5 text-[#C49B83]"
	// 											: "border-sf-border text-[#666666] dark:text-[#A0A0A0] hover:border-[#C49B83]"
	// 									}`}
	// 								>
	// 									{cat.name}
	// 								</button>
	// 							);
	// 						})}
	// 					</div>
	// 				</div>

	// 				{/* Written guidelines message */}
	// 				<div className="space-y-1.5">
	// 					<label
	// 						htmlFor="bespoke-message-input"
	// 						className="text-xs font-bold uppercase tracking-widest text-sf-fg block"
	// 					>
	// 						Ghi Chú Thêm Hoặc Dịp Tặng
	// 					</label>
	// 					<textarea
	// 						id="bespoke-message-input"
	// 						rows={2}
	// 						value={floristMessage}
	// 						onChange={(e) => setFloristMessage(e.target.value)}
	// 						placeholder="VD: Kỷ niệm ngày cưới, hoa tặng mẹ, không dùng hoa baby..."
	// 						className="w-full text-xs rounded-xl border border-sf-border bg-transparent text-sf-fg placeholder:text-gray-500 p-3 outline-none focus:border-[#C49B83] transition-colors resize-none"
	// 					/>
	// 				</div>

	// 				{/* Consult Action */}
	// 				<button
	// 					id="bespoke-consult-btn"
	// 					type="submit"
	// 					disabled={loadingConsultation}
	// 					className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] dark:bg-[#FCFAF7] py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-[#1F1A16] hover:bg-[#C49B83] dark:hover:bg-[#C49B83] hover:text-white dark:hover:text-white disabled:opacity-50 transition-all duration-300 shadow-md"
	// 				>
	// 					{loadingConsultation ? (
	// 						<>
	// 							<RefreshCw className="h-4 w-4 animate-spin text-[#C49B83]" />
	// 							Đang tìm kiếm sản phẩm...
	// 						</>
	// 					) : (
	// 						<>
	// 							<Sparkles className="h-4 w-4 text-[#C49B83]" />
	// 							Gợi Ý Sản Phẩm Cho Tôi
	// 						</>
	// 					)}
	// 				</button>
	// 			</form>
	// 		</div>

	// 		{/* Right Column Consultation Output Display with Framer Motion transitions */}
	// 		<div className="lg:col-span-6 min-h-100">
	// 			<AnimatePresence mode="wait">
	// 				{/* Loading state placeholders */}
	// 				{loadingConsultation && (
	// 					<motion.div
	// 						key="loading"
	// 						initial={{ opacity: 0 }}
	// 						animate={{ opacity: 1 }}
	// 						exit={{ opacity: 0 }}
	// 						className="bg-sf-bg-elevated rounded-2xl border border-[#EBE5DA] dark:border-[#222222] p-8 text-center space-y-6"
	// 					>
	// 						<div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C49B83]/10">
	// 							<div className="absolute inset-0 rounded-full border-2 border-t-transparent border-[#C49B83] animate-spin" />
	// 							<Sparkles className="h-6 w-6 text-[#C49B83] animate-pulse" />
	// 						</div>
	// 						<div className="space-y-2">
	// 							<h3 className="font-serif text-lg text-sf-fg">
	// 								Đang quét kho sản phẩm...
	// 							</h3>
	// 							<p className="text-xs text-[#888888] max-w-sm mx-auto font-light leading-relaxed">
	// 								Hệ thống đang tìm kiếm các mẫu hoa mang tone màu {tone},
	// 								thuộc danh mục {category === "All" ? "Mix" : category} với
	// 								mức giá lý tưởng nhất sát với ${budget}.
	// 							</p>
	// 						</div>

	// 						{/* Simulated progress indicators */}
	// 						<div className="flex justify-center gap-1.5 text-[8px] text-[#A0A0A0] uppercase tracking-widest">
	// 							<span className="dot animate-ping">●</span>
	// 							<span className="delay-100 animate-ping">●</span>
	// 							<span className="delay-200 animate-ping">●</span>
	// 						</div>
	// 					</motion.div>
	// 				)}

	// 				{/* Active Output State */}
	// 				{!loadingConsultation && bespokeConsultationResult && (
	// 					<motion.div
	// 						key="results"
	// 						initial={{ opacity: 0, y: 15 }}
	// 						animate={{ opacity: 1, y: 0 }}
	// 						transition={{ duration: 0.5 }}
	// 						className="bg-sf-bg-elevated overflow-hidden rounded-2xl border border-[#C49B83]/40 text-sf-fg shadow-xl flex flex-col"
	// 					>
	// 						{/* Chỗ này mốt sẽ render ảnh thật của Product từ DB lên */}
	// 						<div className="h-48 w-full relative overflow-hidden bg-white/5">
	// 							<Image
	// 								src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800"
	// 								alt="Suggested Product"
	// 								fill
	// 								className="w-full h-full object-cover opacity-80"
	// 							/>
	// 							<div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#C49B83] border border-[#C49B83]/30">
	// 								Độ phù hợp: 98%
	// 							</div>
	// 						</div>

	// 						<div className="p-6 sm:p-8 space-y-6">
	// 							<div className="border-b border-[#C49B83]/30 pb-4">
	// 								<h2 className="font-serif text-2xl font-light tracking-tight text-sf-fg">
	// 									{bespokeConsultationResult.bouquetName}
	// 								</h2>
	// 								<p className="text-xs text-[#A0A0A0] mt-1 italic">
	// 									Mã SP: PRD-AI-01 (Lấy từ DB)
	// 								</p>
	// 							</div>

	// 							{/* Narrative description */}
	// 							<div className="space-y-1.5 text-xs font-light text-sf-fg">
	// 								<p className="leading-relaxed font-sans text-sm">
	// 									{bespokeConsultationResult.aestheticDescription}
	// 								</p>
	// 							</div>

	// 							{/* Order trigger */}
	// 							<div className="pt-4 flex items-center justify-between border-t border-white/5">
	// 								<div>
	// 									<span className="text-xs text-[#888888] uppercase block">
	// 										Giá Bán
	// 									</span>
	// 									<span className="text-xl font-bold font-sans text-[#C49B83]">
	// 										${budget}
	// 									</span>
	// 								</div>
	// 								<button
	// 									type="button"
	// 									id="bespoke-order-btn"
	// 									onClick={() => {
	// 										// Mốt thay vì mockFlower, bạn bỏ nguyên cái Object Product từ DB vào addToCart
	// 										const dbProduct = {
	// 											id: "product-id-from-db",
	// 											name: bespokeConsultationResult.bouquetName,
	// 											scientificName: "Sản phẩm gợi ý",
	// 											priceSmall: budget,
	// 											priceMedium: budget,
	// 											priceLarge: budget,
	// 											description:
	// 												bespokeConsultationResult.aestheticDescription,
	// 											category: category,
	// 											symbolism: "",
	// 											careGuide: "",
	// 											image:
	// 												"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600",
	// 											popular: false,
	// 										};
	// 										addToCart(dbProduct, "M");
	// 									}}
	// 									className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C49B83] hover:bg-[#A37B65] text-sf-fg text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
	// 								>
	// 									<Sparkles className="h-4 w-4" />
	// 									Thêm Vào Giỏ
	// 								</button>
	// 							</div>
	// 						</div>
	// 					</motion.div>
	// 				)}

	// 				{/* Empty / Intro state */}
	// 				{!loadingConsultation && !bespokeConsultationResult && (
	// 					<motion.div
	// 						key="empty"
	// 						initial={{ opacity: 0 }}
	// 						animate={{ opacity: 1 }}
	// 						className="h-full flex flex-col justify-center items-center text-center p-8 bg-sf-bg-elevated border border-dashed border-sf-border rounded-2xl"
	// 					>
	// 						<Sparkles className="h-10 w-10 text-[#C49B83] opacity-65 mb-4 animate-bounce" />
	// 						<h3 className="font-serif text-lg text-sf-fg">
	// 							Hệ Thống Phân Tích Dữ Liệu
	// 						</h3>
	// 						<p className="max-w-xs text-xs text-[#666666] dark:text-[#A0A0A0] font-light leading-relaxed mt-1.5">
	// 							Thiết lập các tiêu chí của bạn ở cột bên trái. Công cụ sẽ đối
	// 							chiếu với cơ sở dữ liệu hàng trăm mẫu hoa đang có tại Boutique
	// 							để đưa ra kết quả hoàn hảo nhất.
	// 						</p>
	// 						<div className="mt-4 flex items-center justify-center gap-1.5 p-3 rounded-lg border border-sf-border max-w-70 w-full bg-[#C49B83]/5">
	// 							<Info className="h-3.5 w-3.5 text-[#C49B83] shrink-0" />
	// 							<span className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-normal font-medium block">
	// 								Kết quả tìm kiếm theo thời gian thực.
	// 							</span>
	// 						</div>
	// 					</motion.div>
	// 				)}
	// 			</AnimatePresence>
	// 		</div>
	// 	</div>
	// </div>
	//);
	return null;
}
