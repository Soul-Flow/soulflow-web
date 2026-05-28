"use client";

import {
	ChevronLeft,
	ChevronRight,
	Filter,
	Plus,
	SlidersHorizontal,
	Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { soulFlowRoutes } from "@/lib/soulflow/routes";
import { useSoulFlowStore } from "@/store/soulflow-store";

export function FlowerCatalog() {
	const {
		flowers,
		addToCart,
		selectedCategory,
		setSelectedCategory,
		searchQuery,
		setSearchQuery,
	} = useSoulFlowStore();

	const [sortBy, setSortBy] = useState<string>("featured");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 20;

	const categories = [
		{ id: "All", label: "Tất cả" },
		{ id: "Roses", label: "Hoa Hồng" },
		{ id: "Peonies", label: "Hoa Mẫu Đơn" },
		{ id: "Dried Botanicals", label: "Hoa Khô" },
		{ id: "Exotics", label: "Hoa Nhập Khẩu" },
	];

	const isMounted = useRef(false);

	/* biome-ignore lint/correctness/useExhaustiveDependencies: dependencies used for triggering reset */
	useEffect(() => {
		if (isMounted.current) {
			setCurrentPage(1);
		} else {
			isMounted.current = true;
		}
	}, [selectedCategory, searchQuery]);

	const filteredFlowers = useMemo(() => {
		let result = [...flowers];

		if (selectedCategory && selectedCategory !== "All") {
			result = result.filter((f) => f.category === selectedCategory);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase().trim();
			result = result.filter(
				(f) =>
					f.name.toLowerCase().includes(q) ||
					f.scientificName.toLowerCase().includes(q) ||
					f.description.toLowerCase().includes(q) ||
					f.symbolism.toLowerCase().includes(q) ||
					f.category.toLowerCase().includes(q),
			);
		}

		if (sortBy === "price-low") {
			result.sort((a, b) => a.priceSmall - b.priceSmall);
		} else if (sortBy === "price-high") {
			result.sort((a, b) => b.priceMedium - a.priceMedium);
		} else if (sortBy === "popular") {
			result = result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
		}

		return result;
	}, [flowers, selectedCategory, searchQuery, sortBy]);

	const paginatedFlowers = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredFlowers.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredFlowers, currentPage]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredFlowers.length / itemsPerPage),
	);

	const getCategoryLabel = (catId: string) => {
		const match = categories.find((c) => c.id === catId);
		return match ? match.label : catId;
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-sf-bg transition-colors duration-300">
			{/* Header and Sorting */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-sf-border">
				<div className="space-y-1.5 text-center md:text-left">
					<span className="text-sm font-bold tracking-widest text-sf-accent uppercase block">
						Bộ Sưu Tập
					</span>
					<h1 className="font-serif text-3xl sm:text-4xl font-light text-sf-fg">
						Danh Mục Sản Phẩm
					</h1>
					<p className="max-w-md text-xs text-sf-fg-muted font-light">
						Sản phẩm được tuyển chọn tỉ mỉ, kết tinh nghệ thuật thủ công từ các
						thợ cắm hoa chuẩn Âu hàng đầu.
					</p>
				</div>

				{/* Filter and utilities */}
				<div className="flex flex-col sm:flex-row items-center gap-4">
					{searchQuery && (
						<span className="text-xs text-sf-fg-muted bg-sf-surface px-3 py-1 rounded-md">
							Tìm kiếm:{" "}
							<strong className="text-sf-accent">
								&quot;{searchQuery}&quot;
							</strong>
							<button
								type="button"
								onClick={() => setSearchQuery("")}
								className="ml-2 hover:text-red-500 font-bold"
							>
								×
							</button>
						</span>
					)}

					<div className="flex items-center gap-2">
						<SlidersHorizontal className="h-4 w-4 text-sf-accent" />
						<select
							id="catalog-sort-select"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="rounded-lg border border-sf-border bg-sf-bg-elevated py-1.5 px-3 text-xs text-sf-fg focus:border-sf-accent outline-none cursor-pointer"
						>
							<option value="featured">Sắp xếp: Khuyên dùng</option>
							<option value="price-low">Giá: Thấp đến Cao</option>
							<option value="price-high">Giá: Cao đến Thấp</option>
							<option value="popular">Yêu thích nhất</option>
						</select>
					</div>
				</div>
			</div>

			{/* Category selector */}
			<div className="flex flex-wrap gap-2 justify-start md:justify-center mb-10">
				{categories.map((cat) => {
					const isSelected = selectedCategory === cat.id;
					return (
						<button
							type="button"
							id={`category-btn-${cat.id.toLowerCase()}`}
							key={cat.id}
							onClick={() => setSelectedCategory(cat.id)}
							className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
								isSelected
									? "bg-sf-fg text-sf-bg shadow-md"
									: "bg-sf-bg-elevated text-sf-fg-muted border border-sf-border hover:border-sf-accent hover:text-sf-accent"
							}`}
						>
							{cat.label}
						</button>
					);
				})}
			</div>

			{/* Main Grid View */}
			<motion.div
				layout
				className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			>
				<AnimatePresence mode="popLayout" initial={false}>
					{paginatedFlowers.map((flower) => (
						<motion.div
							id={`flower-card-${flower.id}`}
							key={flower.id}
							layout
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.4 }}
							className="group relative cursor-pointer flex flex-col h-full bg-sf-bg-elevated border border-sf-border rounded-xl p-3 overflow-hidden shadow-sm hover:shadow-lg hover:border-sf-accent transition-all duration-300"
						>
							{/* Product Card Image Frame */}
							<Link
								className="relative aspect-square w-full filter brightness-100 group-hover:brightness-105 overflow-hidden rounded-lg bg-sf-surface"
								href={soulFlowRoutes.product(flower.id)}
							>
								<Image
									src={flower.image}
									alt={flower.name}
									className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
									referrerPolicy="no-referrer"
									fill
									loading="lazy"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
								/>

								{flower.popular && (
									<span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-amber-500 text-white px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase shadow-md">
										<Star className="h-2.5 w-2.5 fill-current" />
										BEST SELLER
									</span>
								)}

								<div className="absolute inset-x-0 bottom-0 bg-black/75 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-xs p-3 text-white text-center">
									<p className="text-sm uppercase tracking-widest text-sf-accent font-bold mb-0.5">
										Biểu tượng
									</p>
									<p className="text-xs font-serif italic line-clamp-1">
										&quot;{flower.symbolism}&quot;
									</p>
								</div>
							</Link>

							{/* Text metadata */}
							<div className="flex flex-col justify-between grow mt-4">
								<Link href={soulFlowRoutes.product(flower.id)}>
									<span className="text-xs uppercase tracking-widest text-sf-accent font-bold">
										{getCategoryLabel(flower.category)}
									</span>

									<h3 className="font-serif text-base font-medium text-sf-fg mt-1 group-hover:text-sf-accent transition-colors line-clamp-1">
										{flower.name}
									</h3>

									<p className="font-mono text-xs text-sf-fg-muted italic mt-0.5 line-clamp-1">
										{flower.scientificName}
									</p>

									<p className="text-xs text-sf-fg-muted font-light mt-2 line-clamp-2 leading-relaxed h-10">
										{flower.description}
									</p>
								</Link>

								<div className="flex items-center justify-between border-t border-sf-border mt-4 pt-3">
									<div>
										<span className="text-xs text-sf-fg-muted uppercase tracking-wider block">
											Giá tuyển chọn
										</span>
										<span className="font-sans font-bold text-sf-fg text-base">
											{flower.priceMedium} VND
										</span>
									</div>

									<button
										type="button"
										id={`add-to-cart-btn-${flower.id}`}
										onClick={(e) => {
											e.stopPropagation();
											addToCart(flower, "M");
										}}
										className="flex h-8 w-8 items-center justify-center rounded-full bg-sf-fg text-sf-bg hover:bg-sf-accent hover:text-white transition-all duration-300 shadow-sm"
										title="Thêm hoa vào giỏ"
									>
										<Plus className="h-4 w-4" />
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Empty Result State */}
			{filteredFlowers.length === 0 && (
				<div className="text-center py-20 bg-sf-bg-elevated rounded-2xl border border-dashed border-sf-border">
					<Filter className="h-8 w-8 mx-auto text-sf-accent opacity-60 mb-3" />
					<h3 className="font-serif text-lg text-sf-fg">
						Không tìm thấy mẫu hoa nào
					</h3>
					<p className="text-xs text-sf-fg-muted font-light mt-1 max-w-xs mx-auto">
						Hôm nay không tìm thấy mẫu hoa phù hợp với từ khóa này. Vui lòng
						chọn một bộ sưu tập khác hoặc thử lại.
					</p>
				</div>
			)}

			{/* Paginating System */}
			{totalPages > 1 && (
				<div className="mt-12 flex items-center justify-center gap-2 border-t border-sf-border pt-6">
					<button
						type="button"
						id="paginator-prev-btn"
						onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
						disabled={currentPage === 1}
						className="flex h-9 w-9 items-center justify-center rounded-lg border border-sf-border bg-sf-bg-elevated text-sf-fg-muted hover:border-sf-accent hover:text-sf-accent disabled:opacity-40 transition-all"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>

					{Array.from({ length: totalPages }, (_, idx) => {
						const pageNum = idx + 1;
						const isPageActive = currentPage === pageNum;
						return (
							<button
								type="button"
								id={`paginator-page-${pageNum}-btn`}
								key={pageNum}
								onClick={() => setCurrentPage(pageNum)}
								className={`h-9 min-w-9 px-3 rounded-lg text-xs font-bold transition-all ${
									isPageActive
										? "bg-sf-fg text-sf-bg shadow-md"
										: "bg-sf-bg-elevated text-sf-fg-muted border border-sf-border hover:border-sf-accent hover:text-sf-accent"
								}`}
							>
								{pageNum}
							</button>
						);
					})}

					<button
						type="button"
						id="paginator-next-btn"
						onClick={() =>
							setCurrentPage((prev) => Math.min(totalPages, prev + 1))
						}
						disabled={currentPage === totalPages}
						className="flex h-9 w-9 items-center justify-center rounded-lg border border-sf-border bg-sf-bg-elevated text-sf-fg-muted hover:border-sf-accent hover:text-sf-accent disabled:opacity-40 transition-all"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			)}
		</div>
	);
}
