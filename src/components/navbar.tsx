"use client";

import {
	ChevronDown,
	Menu,
	Search,
	ShoppingBag,
	Sparkles,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { boutiqueRoutes } from "@/lib/boutique/routes";
import { useBoutiqueStore } from "@/store/boutique-store";

type NavbarProps = {
	onOpenCart: () => void;
};

export function Navbar({ onOpenCart }: NavbarProps) {
	const pathname = usePathname();
	const router = useRouter();
	const {
		cart,
		user,
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
	} = useBoutiqueStore();

	const isHome = pathname === boutiqueRoutes.home;
	const isCatalog = pathname.startsWith(boutiqueRoutes.catalog);
	const isBespoke = pathname === boutiqueRoutes.bespoke;
	const isContact = pathname === boutiqueRoutes.contact;
	const isAccount = pathname === boutiqueRoutes.account;
	const isAbout = pathname === boutiqueRoutes.about;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	const categories = [
		{ id: "All", label: "Tất cả sản phẩm" },
		{ id: "Roses", label: "Hoa Hồng Premium" },
		{ id: "Peonies", label: "Hoa Mẫu Đơn Quý Phái" },
		{ id: "Dried Botanicals", label: "Hoa Khô Nghệ Thuật" },
		{ id: "Exotics", label: "Mẫu Hoa Nhập Khẩu" },
	];

	const handleCategorySelect = (catId: string) => {
		setSelectedCategory(catId);
		router.push(boutiqueRoutes.catalog);
		setIsDropdownOpen(false);
	};

	const goToCatalogWithSearch = (query: string) => {
		setSearchQuery(query);
		if (!isCatalog) {
			router.push(boutiqueRoutes.catalog);
		}
	};

	return (
		<header className="sticky top-0 z-40 w-full border-b border-sf-border bg-sf-bg/90 backdrop-blur-md transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4">
					{/* Logo */}
					<div className="flex items-center shrink-0">
						<Link
							id="navbar-logo-btn"
							href={boutiqueRoutes.home}
							onClick={() => {
								setSelectedCategory("All");
								setSearchQuery("");
							}}
							className="group flex items-center gap-3 text-left cursor-pointer"
						>
							{/* Modern Luxury Logo */}
							<div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-sf-accent/20 bg-linear-to-br from-[#fdf8f6] via-[#f7ebe8] to-[#efe1dc] shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
								{/* Flower petals */}
								<div className="absolute h-4 w-4 rotate-45 rounded-full bg-sf-accent/80 blur-[1px]"></div>
								<div className="absolute top-2 h-3 w-3 rounded-full bg-[#d4a373]/70"></div>
								<div className="absolute bottom-2 h-3 w-3 rounded-full bg-[#e9c46a]/60"></div>

								{/* Center sparkle */}
								<div className="relative z-10 h-1.5 w-1.5 rounded-full bg-white shadow-sm"></div>

								{/* Decorative ring */}
								<div className="absolute inset-1 rounded-xl border border-white/40"></div>
							</div>

							{/* Brand text */}
							<div className="leading-tight">
								<span className="block font-serif text-lg font-semibold tracking-[0.28em] text-sf-fg">
									SOULFLOW
								</span>

								<p className="font-sans text-[10px] tracking-[0.45em] uppercase text-sf-accent/90">
									Boutique Florist
								</p>
							</div>
						</Link>
					</div>

					{/* Desktop Nav Links & Interactive Dropdown on Hover */}
					<nav
						className="hidden md:flex space-x-1 items-center"
						aria-label="Desktop navigation"
					>
						{/* Home Link */}
						<Link
							id="nav-link-home"
							href={boutiqueRoutes.home}
							className={`relative px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
								isHome ? "text-sf-accent" : "text-sf-fg-muted hover:text-sf-fg"
							}`}
						>
							Trang Chủ
							{isHome && (
								<motion.span
									layoutId="navUnderline"
									className="absolute bottom-0 left-3 right-3 h-0.5 bg-sf-accent"
									transition={{ type: "spring", stiffness: 380, damping: 30 }}
								/>
							)}
						</Link>

						{/* Botanical Shop with Dropdown Hover container */}
						<div
							className="relative"
							onMouseEnter={() => setIsDropdownOpen(true)}
							onMouseLeave={() => setIsDropdownOpen(false)}
							role="menu"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									setIsDropdownOpen(!isDropdownOpen);
								}
							}}
						>
							<Link
								id="nav-link-catalog"
								href={boutiqueRoutes.catalog}
								onFocus={() => setIsDropdownOpen(true)}
								onClick={() => setSelectedCategory("All")}
								className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
									isCatalog
										? "text-sf-accent"
										: "text-sf-fg-muted hover:text-sf-fg"
								}`}
							>
								Sản Phẩm
								<ChevronDown className="h-3 w-3 text-sf-accent" />
								{isCatalog && (
									<motion.span
										layoutId="navUnderline"
										className="absolute bottom-0 left-3 right-3 h-0.5 bg-sf-accent"
										transition={{ type: "spring", stiffness: 380, damping: 30 }}
									/>
								)}
							</Link>

							{/* Elegant Dropdown Menu */}
							<AnimatePresence>
								{isDropdownOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ duration: 0.15 }}
										className="absolute left-0 mt-0 w-56 rounded-xl border border-sf-border bg-sf-bg-elevated p-2 shadow-xl ring-1 ring-black/5 z-50 overflow-hidden"
									>
										<div className="px-3 py-2 border-b border-sf-border mb-1">
											<p className="text-xs uppercase tracking-widest font-bold text-sf-accent">
												Bộ Sưu Tập Hoa
											</p>
										</div>
										{categories.map((cat) => (
											<button
												type="button"
												key={cat.id}
												id={`header-dropdown-cat-${cat.id.toLowerCase()}`}
												onClick={() => handleCategorySelect(cat.id)}
												className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-medium cursor-pointer transition-colors ${
													selectedCategory === cat.id && isCatalog
														? "bg-sf-accent/10 text-sf-accent font-bold"
														: "text-sf-fg-muted hover:bg-sf-surface hover:text-sf-accent"
												}`}
											>
												<span>{cat.label}</span>
												{selectedCategory === cat.id && isCatalog && (
													<span className="h-1.5 w-1.5 rounded-full bg-sf-accent" />
												)}
											</button>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Bespoke consultation link */}
						<Link
							id="nav-link-bespoke"
							href={boutiqueRoutes.bespoke}
							className={`relative flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
								isBespoke
									? "text-sf-accent"
									: "text-sf-fg-muted hover:text-sf-fg"
							}`}
						>
							<Sparkles className="h-3 w-3 animate-pulse text-sf-accent" />
							Thiết Kế Riêng
							{isBespoke && (
								<motion.span
									layoutId="navUnderline"
									className="absolute bottom-0 left-3 right-3 h-0.5 bg-sf-accent"
									transition={{ type: "spring", stiffness: 380, damping: 30 }}
								/>
							)}
						</Link>

						{/* Contact link */}
						<Link
							id="nav-link-contact"
							href={boutiqueRoutes.contact}
							className={`relative px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
								isContact
									? "text-sf-accent"
									: "text-sf-fg-muted hover:text-sf-fg"
							}`}
						>
							Liên Hệ
							{isContact && (
								<motion.span
									layoutId="navUnderline"
									className="absolute bottom-0 left-3 right-3 h-0.5 bg-sf-accent"
									transition={{ type: "spring", stiffness: 380, damping: 30 }}
								/>
							)}
						</Link>

						<Link
							id="nav-link-about"
							href={boutiqueRoutes.about}
							className={`relative px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
								isAbout ? "text-sf-accent" : "text-sf-fg-muted hover:text-sf-fg"
							}`}
						>
							Về Chúng Tôi
							{isAbout && (
								<motion.span
									layoutId="navUnderline"
									className="absolute bottom-0 left-3 right-3 h-0.5 bg-sf-accent"
									transition={{ type: "spring", stiffness: 380, damping: 30 }}
								/>
							)}
						</Link>
					</nav>

					{/* Luxury Integrated Search Bar */}
					<div className="relative grow max-w-xs md:max-w-md hidden sm:block">
						<Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-sf-accent" />
						<input
							id="header-search-input"
							type="text"
							placeholder="Tìm hoa, ý nghĩa, loài mẫu đơn..."
							value={searchQuery}
							onChange={(e) => goToCatalogWithSearch(e.target.value)}
							className="w-full rounded-full border border-sf-border bg-sf-bg-elevated/70 pl-9 pr-8 py-2 text-[11px] text-sf-fg focus:border-sf-accent focus:bg-sf-bg-elevated focus:ring-1 focus:ring-sf-accent outline-none transition-all placeholder:text-sf-fg-muted shadow-inner"
						/>
						{searchQuery && (
							<button
								type="button"
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-2.5 h-3.5 w-3.5 flex items-center justify-center text-sf-fg-muted hover:text-sf-fg text-xs font-bold"
								title="Clear Search"
							>
								×
							</button>
						)}
					</div>

					{/* User Controls */}
					<div className="flex items-center space-x-1 md:space-x-2 shrink-0">
						<ThemeToggle />

						{/* Account Profile Link */}
						<Link
							id="account-nav-btn"
							href={boutiqueRoutes.account}
							className={`flex items-center gap-2 p-1.5 rounded-full hover:bg-sf-surface transition-colors cursor-pointer ${
								isAccount ? "ring-2 ring-sf-accent" : ""
							}`}
						>
							<Image
								src={user.avatar}
								alt={user.name}
								className="h-7 w-7 rounded-full object-cover grayscale brightness-105 border border-sf-border"
								referrerPolicy="no-referrer"
								width={25}
								height={25}
								priority
								placeholder="blur"
								blurDataURL="/images/avatar-placeholder.png"
								loading="eager"
							/>
							<span className="hidden lg:inline text-sm font-bold tracking-widest text-sf-fg uppercase">
								{user.name.split(" ")[0]}
							</span>
						</Link>

						{/* Shopping Bag Button */}
						<button
							type="button"
							id="cart-nav-btn"
							onClick={onOpenCart}
							className="relative p-2 rounded-lg text-sf-fg hover:bg-sf-surface transition-colors duration-200 cursor-pointer"
							aria-label="Open shopping bag"
						>
							<ShoppingBag className="h-4.5 w-4.5" />
							<AnimatePresence>
								{cartItemsCount > 0 && (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										exit={{ scale: 0 }}
										className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-sf-accent text-xs font-bold text-white shadow-sm"
									>
										{cartItemsCount}
									</motion.span>
								)}
							</AnimatePresence>
						</button>

						{/* Mobile Hamburger Menu Toggle */}
						<button
							type="button"
							id="mobile-menu-toggle-btn"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="p-2 rounded-lg text-sf-fg-muted md:hidden hover:bg-sf-surface transition-colors cursor-pointer"
							aria-label="Toggle menu"
						>
							{mobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Drawer Navigation with Search support included */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden border-t border-sf-border bg-sf-bg overflow-hidden"
					>
						<div className="space-y-2 px-4 py-3 pb-6">
							{/* Mobile Search input */}
							<div className="relative py-1">
								<Search className="absolute left-3 top-3 h-3.5 w-3.5 text-sf-accent" />
								<input
									type="text"
									placeholder="Tìm hoa, ý nghĩa..."
									value={searchQuery}
									onChange={(e) => goToCatalogWithSearch(e.target.value)}
									className="w-full rounded-lg border border-sf-border bg-sf-bg-elevated pl-9 pr-4 py-2 text-xs text-sf-fg focus:border-sf-accent outline-none"
								/>
							</div>

							{/* Home */}
							<Link
								id="mobile-nav-link-home"
								href={boutiqueRoutes.home}
								onClick={() => setMobileMenuOpen(false)}
								className={`flex w-full items-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest ${
									isHome
										? "bg-sf-accent/10 text-sf-accent"
										: "text-sf-fg-muted hover:bg-sf-surface"
								}`}
							>
								Trang Chủ
							</Link>

							{/* Catalog Categories Trigger */}
							<div className="border-t border-sf-border pt-2 mt-2">
								<p className="px-4 text-xs uppercase tracking-widest text-sf-accent font-bold mb-1">
									Cửa hàng danh mục
								</p>
								{categories.map((cat) => (
									<button
										type="button"
										key={cat.id}
										id={`mobile-dropdown-cat-${cat.id.toLowerCase()}`}
										onClick={() => {
											handleCategorySelect(cat.id);
											setMobileMenuOpen(false);
										}}
										className={`flex w-full items-center pl-8 pr-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
											selectedCategory === cat.id && isCatalog
												? "bg-sf-accent/10 text-sf-accent font-bold"
												: "text-sf-fg-muted hover:bg-sf-surface"
										}`}
									>
										{cat.label}
									</button>
								))}
							</div>

							{/* Bespoke design */}
							<Link
								id="mobile-nav-link-bespoke"
								href={boutiqueRoutes.bespoke}
								onClick={() => setMobileMenuOpen(false)}
								className={`flex w-full items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest ${
									isBespoke
										? "bg-sf-accent/10 text-sf-accent"
										: "text-sf-fg-muted"
								}`}
							>
								<Sparkles className="h-4 w-4 text-sf-accent" />
								Thiết Kế Riêng
							</Link>

							{/* Contact us */}
							<Link
								id="mobile-nav-link-contact"
								href={boutiqueRoutes.contact}
								onClick={() => setMobileMenuOpen(false)}
								className={`flex w-full items-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest ${
									isContact
										? "bg-sf-accent/10 text-sf-accent"
										: "text-sf-fg-muted"
								}`}
							>
								Contact Us
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
