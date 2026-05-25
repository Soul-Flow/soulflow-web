"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowLeft,
	CheckCircle2,
	ChevronLeft, // Thêm icon này
	ChevronRight, // Thêm icon này
	CornerDownRight,
	Heart,
	MessageSquare,
	Send,
	ShieldAlert,
	ShoppingBag,
	UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { boutiqueRoutes } from "@/lib/boutique/routes";
import { useBoutiqueStore } from "@/store/boutique-store";
import type { FlowerSize } from "@/types/boutique";

type FlowerDetailsProps = {
	productId: string;
};

// --- Định nghĩa Types cho hệ thống Comment ---
type ReplyType = {
	id: string;
	author: string;
	content: string;
	timestamp: string;
};

type CommentType = {
	id: string;
	author: string;
	content: string;
	timestamp: string;
	replies: ReplyType[];
};

const MOCK_COMMENTS: CommentType[] = [
	{
		id: "c1",
		author: "Eleanor Vance",
		content:
			"These flowers are absolutely stunning! The scent is incredible and they lasted for almost two weeks.",
		timestamp: "2 days ago",
		replies: [
			{
				id: "r1",
				author: "Boutique Florist",
				content:
					"Thank you, Eleanor! We are so glad you loved them. Remember to change the water every 2 days to keep them fresh longer.",
				timestamp: "1 day ago",
			},
		],
	},
];

export function FlowerDetails({ productId }: FlowerDetailsProps) {
	const router = useRouter();
	const { flowers, addToCart } = useBoutiqueStore();
	const [selectedSize, setSelectedSize] = useState<FlowerSize>("M");

	const currentFlower =
		flowers.find((flower) => flower.id === productId) ?? flowers[0];

	// --- State cho hệ thống Gallery Ảnh ---
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHoveringImage, setIsHoveringImage] = useState(false); // Để dừng auto-play khi rê chuột
	const [prevProductId, setPrevProductId] = useState(productId);

	// FIX LỖI ESLINT: Reset index khi chuyển sang sản phẩm khác (không dùng useEffect)
	if (productId !== prevProductId) {
		setPrevProductId(productId);
		setCurrentIndex(0);
		setSelectedSize("M");
	}

	// Mảng ảnh (Mốt bạn thay bằng data get từ bảng ProductImages)
	const galleryImages = [
		{
			id: "main",
			image: currentFlower.image,
		},
		{
			id: "gallery-1",
			image:
				"https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=500&auto=format&fit=crop",
		},
		{
			id: "gallery-2",
			image:
				"https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=500&auto=format&fit=crop",
		},
		{
			id: "gallery-3",
			image:
				"https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=500&auto=format&fit=crop",
		},
	];

	// Hàm chuyển ảnh
	const handleNextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
	};

	const handlePrevImage = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? galleryImages.length - 1 : prev - 1,
		);
	};

	// Auto-play Slider (Tự chuyển ảnh mỗi 4 giây nếu không rê chuột vào)
	useEffect(() => {
		if (isHoveringImage) return; // Nếu đang trỏ chuột vào thì không tự chuyển
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
		}, 4000);
		return () => clearInterval(timer);
	}, [isHoveringImage, galleryImages.length]);

	// --- State cho hệ thống Comment ---
	const [comments, setComments] = useState<CommentType[]>(MOCK_COMMENTS);
	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState<string | null>(null);
	const [replyContent, setReplyContent] = useState("");

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

	const relatedFlowers = flowers
		.filter((f) => f.id !== currentFlower.id)
		.slice(0, 3);

	const handleAddComment = () => {
		if (!newComment.trim()) return;
		const newCmt: CommentType = {
			id: crypto.randomUUID(),
			author: "Guest User",
			content: newComment,
			timestamp: "Just now",
			replies: [],
		};
		setComments([newCmt, ...comments]);
		setNewComment("");
	};

	const handleAddReply = (commentId: string) => {
		if (!replyContent.trim()) return;
		const newReply: ReplyType = {
			id: crypto.randomUUID(),
			author: "Guest User",
			content: replyContent,
			timestamp: "Just now",
		};

		setComments(
			comments.map((cmt) => {
				if (cmt.id === commentId) {
					return { ...cmt, replies: [...cmt.replies, newReply] };
				}
				return cmt;
			}),
		);
		setReplyContent("");
		setReplyingTo(null);
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-sf-bg-elevated transition-colors duration-300">
			{/* Return Page Trigger */}
			<Link
				id="detail-back-btn"
				href={boutiqueRoutes.catalog}
				className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#666666] dark:text-[#A0A0A0] hover:text-[#C49B83] transition-colors duration-200 mb-8"
			>
				<ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
				Quay lại sản phẩm
			</Link>

			{/* Main Showcase Layout */}
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20">
				{/* Left Column Image Frame & Gallery */}
				<div className="lg:col-span-6 flex flex-col gap-5">
					{/* Main Active Image Slider */}
					<section
						className="relative overflow-hidden rounded-2xl border border-[#EBE5DA] dark:border-[#C49B83]/30 bg-sf-bg-elevated p-3 shadow-lg max-w-md mx-auto w-full group"
						aria-roledescription="carousel"
						aria-label="Product image gallery"
						onMouseEnter={() => setIsHoveringImage(true)}
						onMouseLeave={() => setIsHoveringImage(false)}
					>
						<div className="relative w-full aspect-4/5 sm:aspect-square overflow-hidden rounded-xl bg-[#EBE5DA]/50 dark:bg-[#2C2C2C]/50">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentIndex}
									initial={{ opacity: 0, scale: 0.96, x: 20 }}
									animate={{ opacity: 1, scale: 1, x: 0 }}
									exit={{ opacity: 0, scale: 1.02, x: -20 }}
									transition={{ duration: 0.45, ease: "easeOut" }}
									className="absolute inset-0 w-full h-full"
								>
									<Image
										src={galleryImages[currentIndex].image}
										alt={`${currentFlower.name} view`}
										fill
										sizes="(max-width: 768px) 100vw, 400px"
										className="object-cover"
										referrerPolicy="no-referrer"
									/>
								</motion.div>
							</AnimatePresence>
						</div>
						<div className="absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-black/60 shadow-md backdrop-blur-xs text-[#C49B83] cursor-pointer z-10">
							<Heart className="h-4 w-4 hover:fill-current transition-colors" />
						</div>

						{/* Prev Button */}
						<button
							type="button"
							onClick={handlePrevImage}
							className="absolute left-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-black/60 shadow-md text-[#C49B83] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black hover:scale-110 z-10"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>

						{/* Next Button */}
						<button
							type="button"
							onClick={handleNextImage}
							className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-black/60 shadow-md text-[#C49B83] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black hover:scale-110 z-10"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</section>

					{/* Thumbnail Gallery */}
					<div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
						{galleryImages.map((imgUrl) => {
							const isSelected =
								currentIndex ===
								galleryImages.findIndex((img) => img.id === imgUrl.id);
							return (
								<button
									type="button"
									key={imgUrl.id}
									onClick={() =>
										setCurrentIndex(
											galleryImages.findIndex((img) => img.id === imgUrl.id),
										)
									}
									className={`relative aspect-square w-16 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
										isSelected
											? "border-[#C49B83] opacity-100 ring-2 ring-[#C49B83]/30 ring-offset-1 ring-offset-sf-bg-elevated"
											: "border-transparent opacity-60 hover:opacity-100 hover:border-[#C49B83]/50"
									}`}
								>
									<Image
										src={imgUrl.image}
										alt={`${currentFlower.name} thumbnail ${galleryImages.findIndex((img) => img.id === imgUrl.id) + 1}`}
										className="h-full w-full object-cover"
										referrerPolicy="no-referrer"
										fill
										sizes=" (max-width: 640px) 80px, 64px"
									/>
								</button>
							);
						})}
					</div>
				</div>

				{/* Right Info and Custom Picker Column */}
				<div className="lg:col-span-6 flex flex-col justify-between">
					<div className="space-y-6">
						<div>
							<span className="text-sm uppercase tracking-widest text-[#C49B83] font-bold block mb-1">
								{currentFlower.category}
							</span>
							<h1 className="font-serif text-3xl sm:text-4xl font-light text-sf-fg">
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
							<p className="font-serif italic text-sf-fg text-sm">
								&quot;{currentFlower.symbolism}&quot;
							</p>
						</div>

						{/* Size interactive Picker */}
						<div className="space-y-3">
							<span className="text-sm font-bold uppercase tracking-widest text-sf-fg block">
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
												<span className="font-bold text-sm text-sf-fg">
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
												<p className="text-xs font-bold text-sf-fg mt-1">
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
							Thêm vào giỏ hàng
						</button>
					</div>
				</div>
			</div>

			{/* Flower Care Guide and Accordion Panels */}
			<section className="mb-20">
				<h2 className="font-serif text-2xl font-light text-sf-fg mb-4">
					Hướng dẫn bảo quản thực vật
				</h2>
				<div className="rounded-2xl border border-[#C49B83]/30 bg-sf-bg-elevated p-6 text-xs sm:text-sm text-[#666666] dark:text-[#A0A0A0] leading-relaxed max-w-4xl font-light space-y-2">
					<p>{currentFlower.careGuide}</p>
					<div className="pt-2 border-t border-[#C49B83]/30 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
						<ShieldAlert className="h-4 w-4" />
						Ghi chú về bình: Sử dụng nước sạch mềm. Cắt tỉa lá để giữ cho cuống
						hoa luôn sạch.
					</div>
				</div>
			</section>

			{/* Community Reviews & Comments Section */}
			<section className="mb-20">
				<div className="flex items-center gap-2 mb-8 pb-4 border-b border-[#C49B83]/30">
					<MessageSquare className="h-5 w-5 text-[#C49B83]" />
					<h2 className="font-serif text-2xl font-light text-sf-fg">
						Trải nghiệm & Thắc mắc về hoa
					</h2>
				</div>

				<div className="max-w-4xl space-y-8">
					{/* Add New Comment */}
					<div className="flex gap-4 items-start">
						<div className="p-2 rounded-full bg-[#C49B83]/10 text-[#C49B83]">
							<UserCircle2 className="h-6 w-6" />
						</div>
						<div className="flex-1 space-y-3">
							<textarea
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Share your experience or ask a question about this arrangement..."
								className="w-full min-h-25 p-4 rounded-xl border border-[#C49B83]/30 bg-transparent text-sm text-sf-fg focus:outline-none focus:border-[#C49B83] focus:ring-1 focus:ring-[#C49B83] transition-all resize-y"
							/>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={handleAddComment}
									disabled={!newComment.trim()}
									className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C49B83] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#A37B65] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<Send className="h-3 w-3" />
									Đăng bình luận
								</button>
							</div>
						</div>
					</div>

					{/* Comments List */}
					<div className="space-y-6 pt-4">
						{comments.map((comment) => (
							<div key={comment.id} className="space-y-4">
								{/* Main Comment */}
								<div className="p-5 rounded-2xl border border-[#C49B83]/20 bg-[#C49B83]/5">
									<div className="flex justify-between items-start mb-2">
										<div className="flex items-center gap-2">
											<span className="font-bold text-sm text-sf-fg">
												{comment.author}
											</span>
											<span className="text-xs text-[#A0A0A0]">
												• {comment.timestamp}
											</span>
										</div>
									</div>
									<p className="text-sm text-[#666666] dark:text-[#D0D0D0] leading-relaxed">
										{comment.content}
									</p>
									<div className="mt-3">
										<button
											type="button"
											onClick={() =>
												setReplyingTo(
													replyingTo === comment.id ? null : comment.id,
												)
											}
											className="text-xs font-bold text-[#C49B83] hover:underline flex items-center gap-1.5"
										>
											<CornerDownRight className="h-3 w-3" />
											Trả lời
										</button>
									</div>
								</div>

								{/* Reply Input Form */}
								{replyingTo === comment.id && (
									<div className="pl-10 flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
										<div className="flex-1 flex gap-2">
											<input
												type="text"
												value={replyContent}
												onChange={(e) => setReplyContent(e.target.value)}
												placeholder={`Reply to ${comment.author}...`}
												className="w-full px-4 py-2.5 rounded-lg border border-[#C49B83]/30 bg-transparent text-sm text-sf-fg focus:outline-none focus:border-[#C49B83] transition-all"
											/>
											<button
												type="button"
												onClick={() => handleAddReply(comment.id)}
												disabled={!replyContent.trim()}
												className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] dark:bg-[#FCFAF7] text-white dark:text-[#1F1A16] text-xs font-bold uppercase tracking-wider hover:bg-[#C49B83] dark:hover:bg-[#C49B83] hover:text-white transition-colors disabled:opacity-50"
											>
												Send
											</button>
										</div>
									</div>
								)}

								{/* Replies List */}
								{comment.replies.length > 0 && (
									<div className="pl-10 space-y-4 border-l-2 border-[#C49B83]/10 ml-5">
										{comment.replies.map((reply) => (
											<div
												key={reply.id}
												className="p-4 rounded-xl border border-[#C49B83]/10 bg-transparent"
											>
												<div className="flex justify-between items-start mb-1.5">
													<div className="flex items-center gap-2">
														<span className="font-bold text-sm text-sf-fg">
															{reply.author}
														</span>
														<span className="text-xs text-[#A0A0A0]">
															• {reply.timestamp}
														</span>
													</div>
												</div>
												<p className="text-sm text-[#666666] dark:text-[#D0D0D0] leading-relaxed">
													{reply.content}
												</p>
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Related items ("You May Also Like") */}
			<section>
				<div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C49B83]/30">
					<h2 className="font-serif text-2xl font-light text-sf-fg">
						Có thể bạn cũng thích
					</h2>
					<Link
						id="detail-view-all-similar-btn"
						href={boutiqueRoutes.catalog}
						className="text-xs font-bold text-[#C49B83] uppercase tracking-wider hover:underline"
					>
						Khám phá bộ sưu tập hoàn chỉnh
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
							}}
							className="group cursor-pointer overflow-hidden rounded-xl border border-[#C49B83]/30 bg-sf-bg-elevated p-3 shadow-xs hover:shadow-sm hover:-translate-y-1 transition-all"
						>
							<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#EBE5DA] dark:bg-[#2C2C2C] grayscale-1/10 group-hover:grayscale-0">
								<Image
									src={item.image}
									alt={item.name}
									className="h-full w-full object-cover group-hover:scale-103 transition-transform"
									referrerPolicy="no-referrer"
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
								/>
							</div>
							<div className="mt-3 text-left">
								<span className="text-[8px] tracking-widest uppercase font-bold text-[#C49B83] block">
									{item.category}
								</span>
								<h4 className="font-serif text-sm font-semibold text-sf-fg mt-0.5 group-hover:text-[#C49B83] line-clamp-1">
									{item.name}
								</h4>
								<p className="font-sans text-xs font-bold text-sf-fg mt-1">
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
