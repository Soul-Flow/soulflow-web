"use client";

import {
	AlertCircle,
	Bell,
	CheckCircle,
	RefreshCcw,
	Shield,
	ShoppingBag,
	User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useBoutiqueStore } from "@/store/boutique-store";

export function MyAccount() {
	const { user, updateUser, orders } = useBoutiqueStore();
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMounted(true);
		}, 0);

		return () => clearTimeout(timer);
	}, []);

	// Personal Info Form State
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [phone, setPhone] = useState(user.phone);
	const [allowNotifications, setAllowNotifications] = useState(
		user.allowNotifications,
	);

	// Security Password State
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [updateFeedback, setUpdateFeedback] = useState(false);
	const [passwordFeedback, setPasswordFeedback] = useState(false);

	const handleUpdateProfile = (e: React.FormEvent) => {
		e.preventDefault();
		updateUser({ name, email, phone, allowNotifications });
		setUpdateFeedback(true);
		setTimeout(() => setUpdateFeedback(false), 3000);
	};

	const handleChangePassword = (e: React.FormEvent) => {
		e.preventDefault();
		setOldPassword("");
		setNewPassword("");
		setPasswordFeedback(true);
		setTimeout(() => setPasswordFeedback(false), 3000);
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-sf-bg-elevated transition-colors duration-300">
			{/* Header Profile Summary cards */}
			<div className="flex flex-col md:flex-row items-center gap-6 mb-12 p-6 rounded-2xl bg-sf-bg-elevated border border-sf-border shadow-sm">
				<img
					src={user.avatar}
					alt={user.name}
					className="h-20 w-20 rounded-full object-cover grayscale brightness-105 border border-sf-border"
					referrerPolicy="no-referrer"
				/>
				<div className="text-center md:text-left space-y-1.5 flex-1">
					<div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
						<h1 className="font-serif text-2xl sm:text-3xl font-light text-sf-fg uppercase tracking-wide">
							{user.name}
						</h1>
						<span className="rounded-full bg-amber-50 dark:bg-amber-950/80 px-2.5 py-1 text-[8px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-widest shadow-xs">
							{user.membershipLevel} MEMBER
						</span>
					</div>
					<p className="text-xs text-[#666666] dark:text-[#A0A0A0] font-light">
						Customer Profile registered since{" "}
						<strong className="font-semibold text-black dark:text-white">
							{user.joinedDate}
						</strong>
						.
					</p>
				</div>

				{/* Global Dark Mode settings button */}
				<div className="flex flex-col items-center md:items-end gap-1 border-t md:border-t-0 md:border-l border-sf-border pt-4 md:pt-0 md:pl-6">
					<span className="text-sm text-[#888888] uppercase tracking-widest block font-bold">
						Preferences
					</span>
					<button
						id="account-mode-switcher-btn"
						type="button"
						onClick={() =>
							setTheme(resolvedTheme === "dark" ? "light" : "dark")
						}
						disabled={!mounted}
						className="flex items-center gap-2 rounded-full border border-sf-border bg-[#FCFAF7] dark:bg-[#814f0e] px-4 py-2 text-xs font-semibold text-sf-fg hover:border-[#C49B83] disabled:opacity-50"
					>
						Switch to{" "}
						{mounted && resolvedTheme === "dark"
							? "Light Theme"
							: "Imperial Dark Mode"}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
				{/* Left Side Content Forms */}
				<div className="lg:col-span-7 space-y-6">
					{/* Profile Form */}
					<div className="bg-sf-bg-elevated p-6 rounded-2xl border border-sf-border shadow-xs space-y-4">
						<h2 className="font-serif text-lg font-semibold text-sf-fg flex items-center gap-2 border-b border-sf-border pb-3">
							<User className="h-4.5 w-4.5 text-[#C49B83]" />
							Personal Credentials Information
						</h2>

						<form onSubmit={handleUpdateProfile} className="space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-1">
									<label
										htmlFor="user-profile-name"
										className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
									>
										Full Name
									</label>
									<input
										id="user-profile-name"
										type="text"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="w-full text-xs rounded-lg border border-sf-border text-sf-fg p-3 outline-none focus:border-[#C49B83]"
									/>
								</div>

								<div className="space-y-1">
									<label
										htmlFor="user-profile-phone"
										className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
									>
										Phone Number
									</label>
									<input
										id="user-profile-phone"
										type="tel"
										required
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className="w-full text-xs rounded-lg border border-sf-border text-sf-fg p-3 outline-none focus:border-[#C49B83]"
									/>
								</div>
							</div>

							<div className="space-y-1">
								<label
									htmlFor="user-profile-email"
									className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
								>
									Primary Contact Email
								</label>
								<input
									id="user-profile-email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full text-xs rounded-lg border border-sf-border text-sf-fg p-3 outline-none focus:border-[#C49B83]"
								/>
							</div>

							{/* Notification toggle switch */}
							<div className="flex items-center justify-between p-3.5 rounded-xl border border-sf-border">
								<div className="space-y-0.5">
									<span className="text-xs font-semibold text-sf-fg block flex items-center gap-1">
										<Bell className="h-3.5 w-3.5 text-[#C49B83]" />
										Email Care Instructions
									</span>
									<span className="text-sm text-[#888888] font-light leading-none block">
										Weekly preservation guidelines, flower symbolism stories
									</span>
								</div>
								<input
									id="user-profile-notify"
									type="checkbox"
									checked={allowNotifications}
									onChange={(e) => setAllowNotifications(e.target.checked)}
									className="h-4.5 w-4.5 rounded border-[#C49B83] dark:border-[#222222] text-[#C49B83] focus:ring-[#C49B83] cursor-pointer"
								/>
							</div>

							<div className="flex items-center justify-between pt-2">
								<button
									id="profile-update-submit"
									type="submit"
									className="rounded-lg bg-[#C49B83] hover:bg-[#C49B83]/90 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 transition-colors shadow-sm"
								>
									Save Profile Settings
								</button>
								{updateFeedback && (
									<span className="text-sm text-green-500 font-bold uppercase flex items-center gap-1">
										<CheckCircle className="h-4 w-4" /> Credentials Updated!
									</span>
								)}
							</div>
						</form>
					</div>

					{/* Security Form card */}
					<div className="bg-sf-bg-elevated p-6 rounded-2xl border border-sf-border shadow-xs space-y-4">
						<h2 className="font-serif text-lg font-semibold text-sf-fg flex items-center gap-2 border-b border-sf-border pb-3">
							<Shield className="h-4.5 w-4.5 text-[#C49B83]" />
							Atelier Security Password
						</h2>

						<form onSubmit={handleChangePassword} className="space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-1">
									<label
										htmlFor="old-pw"
										className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
									>
										Current Password
									</label>
									<input
										id="old-pw"
										type="password"
										required
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
										placeholder="••••••••"
										className="w-full text-xs rounded-lg border border-sf-border border-sf-border text-sf-fg p-3 outline-none focus:border-[#C49B83]"
									/>
								</div>

								<div className="space-y-1">
									<label
										htmlFor="new-pw"
										className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
									>
										New Password
									</label>
									<input
										id="new-pw"
										type="password"
										required
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										placeholder="Minimum 8 characters"
										className="w-full text-xs rounded-lg border border-sf-border border-sf-border text-sf-fg p-3 outline-none focus:border-[#C49B83]"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between pt-2">
								<button
									id="security-pw-submit"
									type="submit"
									className="rounded-lg bg-[#C49B83] hover:bg-[#C49B83]/90 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 transition-colors shadow-sm"
								>
									Change Password
								</button>
								{passwordFeedback && (
									<span className="text-sm text-green-500 font-bold uppercase flex items-center gap-1">
										<CheckCircle className="h-4 w-4" /> Password Reset
										Successful!
									</span>
								)}
							</div>
						</form>
					</div>
				</div>

				{/* Right Side Content - History log cards and flower Subscriptions */}
				<div className="lg:col-span-5 space-y-6">
					{/* Order history logs */}
					<div className="bg-sf-bg-elevated p-6 rounded-2xl border border-sf-border shadow-xs space-y-4">
						<h2 className="font-serif text-lg font-semibold text-sf-fg pb-3 border-b border-sf-border flex items-center gap-2">
							<ShoppingBag className="h-4.5 w-4.5 text-[#C49B83]" />
							Historic Activity Logs
						</h2>

						<div className="space-y-4">
							{orders.map((order) => (
								<div
									id={`history-${order.id}`}
									key={order.id}
									className="p-4 border border-sf-border rounded-xl space-y-3.5 hover:shadow-xs transition-shadow bg-sf-bg-elevated"
								>
									<div className="flex justify-between items-center">
										<span className="font-serif font-semibold text-xs text-sf-fg uppercase">
											{order.id}
										</span>
										<span
											className={`text-[8px] font-bold tracking-widest uppercase rounded-full px-2.5 py-0.5 shadow-2xs ${
												order.status === "Delivered"
													? "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200"
													: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 animate-pulse"
											}`}
										>
											{order.status}
										</span>
									</div>

									<div className="space-y-1 text-xs">
										{order.items.map(
											(it: {
												flowerName: string;
												size: string;
												quantity: number;
												price: number;
											}) => (
												<div
													key={`${it.flowerName}-${it.size}`}
													className="flex justify-between text-sf-fg-muted"
												>
													<span>
														{it.flowerName} ({it.size}) × {it.quantity}
													</span>

													<span className="font-bold text-sf-fg">
														${it.price * it.quantity}
													</span>
												</div>
											),
										)}
									</div>

									<div className="flex justify-between items-center text-xs border-t border-[#EBE5DA]/50 dark:border-[#2C2C2C]/50 pt-2.5">
										<span className="text-[#A0A0A0]">{order.date}</span>
										<span className="font-sans font-bold text-sm text-[#C49B83]">
											Total: ${order.totalAmount}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Care Subscriptions scheduled care guides block */}
					<div className="bg-sf-bg-elevated p-6 rounded-2xl border border-sf-border shadow-xs space-y-4">
						<h2 className="font-serif text-lg font-semibold text-sf-fg pb-3 border-b border-sf-border flex items-center gap-2">
							<RefreshCcw className="h-4 w-4 text-[#C49B83]" />
							Preservation & Care Log
						</h2>

						<div className="p-4 bg-sf-surface border border-sf-border rounded-xl space-y-3">
							<div className="flex items-center gap-2">
								<AlertCircle className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400 shrink-0" />
								<span className="text-xs font-bold text-[#1A1A1A] dark:text-white uppercase">
									Weekly Flora Checkup Reminder
								</span>
							</div>
							<p className="text-[11px] text-[#666666] dark:text-[#A0A0A0] leading-relaxed font-light">
								An active subscription requires dynamic water conditioning.
								Every 48 hours: trim stems in 45-degree angles, clean flower
								pots completely, and sprinkle cool mist to prevent humidity
								collapses.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
