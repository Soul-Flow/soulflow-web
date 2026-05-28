"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import router from "next/router";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { soulFlowRoutes } from "@/lib/soulflow/routes";

export function RegisterScreen() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [username, setUsername] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		const showToast = (message: string, type: "success" | "error") => {
			if (type === "success") {
				toast.success(message);
			} else {
				toast.error(message);
			}
		};
		e.preventDefault();
		if (
			!fullName ||
			!email ||
			!username ||
			!address ||
			!password ||
			!confirmPassword
		)
			return;

		if (password !== confirmPassword) {
			showToast("❌ Mật khẩu xác nhận không trùng khớp!", "error");
			return;
		}

		setIsLoading(true);
		// Simulate API registration
		setTimeout(() => {
			setIsLoading(false);
			showToast(`🎉 Đăng ký thành công tài khoản: ${fullName}!`, "success");
		}, 1200);
	};

	return (
		<div className="w-full min-h-[85vh] md:min-h-175 bg-transparent grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
			{/* Cột Trái: Nội dung Editorial (Màn Hình 2) */}
			<section className="lg:col-span-6 space-y-8 text-center lg:text-left">
				<div className="space-y-4">
					<span className="text-primary font-semibold text-xs uppercase tracking-[0.3em] block">
						Bắt đầu hành trình của bạn với SoulFlow
					</span>
					<h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#111c2d] leading-tight select-none">
						Nơi những loài <br />
						<span className="font-light italic text-primary">Petal</span> Kể
						Chuyện.
					</h1>
					<p className="font-sans text-sm sm:text-base text-secondary/80 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
						Tại SoulFlow, chúng tôi tin rằng mỗi bông hoa đều có một câu chuyện
						để kể. Hãy cùng chúng tôi khám phá vẻ đẹp của thiên nhiên và tạo nên
						những kỷ niệm đáng nhớ qua từng cánh hoa.
					</p>
				</div>

				{/* Khung ảnh Nghệ thuật Ranunculus nổi bật */}
				<div className="relative group mt-8 hidden lg:block max-w-md mx-auto lg:mx-0">
					<div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-outline-variant/40 transform transition-transform duration-700 hover:scale-[1.01]">
						<Image
							className="w-full h-full object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUK1rJbW57ivCn2wCMegx4ARfHnlnkHwTxn-12frM1om7aGCo-GY3b2ywQPdXzthr6fyBy8sok0EQxj9-es8eZXAjD5ygVyoYJPycLOYPuvSCLR8oEyAvYDeX6CME5pBE365qatvOQJC_m5AfslWGHFW04iyQzc5b6QYdp7lQD4r0oRDiAfKADkiN2LW0m5JJWG6xg26yG-pLLtLeKJIsdRy0AsvySlmMLPf7qIlZZIr-CMnD9FZVIc68t3m6e76000MaVcGacEkU"
							alt="High-end Ranunculus Close-up"
							referrerPolicy="no-referrer"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>

					{/* Huy hiệu thành viên (Glassmorphism Float) */}
					<div className="absolute -bottom-6 -right-6 glass-panel p-5 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3 animate-bounce-slow">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
							<Sparkles className="w-5 h-5 fill-primary/10" />
						</div>
						<div>
							<p className="font-sans text-xs font-semibold text-[#111c2d]">
								Member Perks
							</p>
							<p className="text-[10px] uppercase tracking-widest text-primary font-bold">
								Botanical Curation
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Cột Phải: Form Đăng ký */}
			<section className="lg:col-span-6 xl:col-start-8 xl:col-span-5">
				<div className="glass-panel p-8 sm:p-12 rounded-2xl border border-outline-variant/30 shadow-xl relative overflow-hidden bg-white/95">
					<div className="mb-8">
						<h2 className="font-serif text-3xl font-light text-[#111c2d] mb-2">
							Create Account
						</h2>
						<p className="font-sans text-sm text-secondary/80 font-light">
							Chúng tôi rất vui được chào đón bạn đến với cộng đồng SoulFlow!
							Hãy điền thông tin bên dưới để bắt đầu hành trình khám phá vẻ đẹp
							của thiên nhiên cùng chúng tôi.
						</p>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-5">
							{/* fullname */}
							<div className="space-y-1.5">
								<label
									className="text-[10px] uppercase tracking-widest font-bold text-secondary"
									htmlFor="reg-name"
								>
									Họ và Tên
								</label>
								<input
									id="reg-name"
									type="text"
									placeholder="Evelyn Rose"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className="w-full bg-transparent border-0 border-b border-outline-variant/60 py-2.5 px-0 text-sm focus:border-primary transition-all focus:outline-none placeholder-secondary/30 text-[#111c2d]"
									required
								/>
							</div>

							{/* Địa chỉ Email */}
							<div className="space-y-1.5">
								<label
									className="text-[10px] uppercase tracking-widest font-bold text-secondary"
									htmlFor="reg-email"
								>
									Địa chỉ Email
								</label>
								<input
									id="reg-email"
									type="email"
									placeholder="evelyn@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full bg-transparent border-0 border-b border-outline-variant/60 py-2.5 px-0 text-sm focus:border-primary transition-all focus:outline-none placeholder-secondary/30 text-[#111c2d]"
									required
								/>
							</div>

							{/* Số Điện Thoại */}
							<div className="space-y-1.5">
								<label
									className="text-[10px] uppercase tracking-widest font-bold text-secondary"
									htmlFor="reg-phone"
								>
									Số Điện Thoại
								</label>
								<input
									id="reg-phone"
									type="tel"
									placeholder="090 123 4567"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="w-full bg-transparent border-0 border-b border-outline-variant/60 py-2.5 px-0 text-sm focus:border-primary transition-all focus:outline-none placeholder-secondary/30 text-[#111c2d]"
									required
								/>
							</div>

							{/* username */}
							<div className="space-y-1.5">
								<label
									className="text-[10px] uppercase tracking-widest font-bold text-secondary"
									htmlFor="reg-username"
								>
									Tên Người Dùng
								</label>
								<input
									id="reg-username"
									type="text"
									placeholder="evelyn_rose"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full bg-transparent border-0 border-b border-outline-variant/60 py-2.5 px-0 text-sm focus:border-primary transition-all focus:outline-none placeholder-secondary/30 text-[#111c2d]"
									required
								/>
							</div>

							{/* Address */}
							<div className="space-y-1.5">
								<label
									className="text-[10px] uppercase tracking-widest font-bold text-secondary"
									htmlFor="reg-address"
								>
									Địa chỉ giao hàng
								</label>
								<input
									id="reg-address"
									type="text"
									placeholder="123 Flower St, District 1"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className="w-full bg-transparent border-0 border-b border-outline-variant/60 py-2.5 px-0 text-sm focus:border-primary transition-all focus:outline-none placeholder-secondary/30 text-[#111c2d]"
									required
								/>
							</div>

							{/* Password Fields */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div className="space-y-1.5">
									<label
										className="text-[10px] uppercase tracking-widest font-bold text-secondary"
										htmlFor="reg-password"
									>
										Mật khẩu
									</label>
									<input
										id="reg-password"
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full bg-transparent border-0 border-b border-outline-variant/60 py-2.5 px-0 text-sm focus:border-primary transition-all focus:outline-none placeholder-secondary/30 text-[#111c2d]"
										required
									/>
								</div>
								<div className="space-y-1.5">
									<label
										className="text-[10px] uppercase tracking-widest font-bold text-secondary"
										htmlFor="reg-confirm"
									>
										Xác nhận Mật khẩu
									</label>
									<input
										id="reg-confirm"
										type="password"
										placeholder="••••••••"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full bg-transparent border-0 border-b border-outline-variant/60 py-2.5 px-0 text-sm focus:border-primary transition-all focus:outline-none placeholder-secondary/30 text-[#111c2d]"
										required
									/>
								</div>
							</div>
						</div>

						{/* Điều hướng nhận thư Bản tin */}
						<div className="flex items-start gap-3 pt-2">
							<div className="flex h-5 items-center">
								<input
									id="newsletter"
									name="newsletter"
									type="checkbox"
									checked={subscribeNewsletter}
									onChange={(e) => setSubscribeNewsletter(e.target.checked)}
									className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary cursor-pointer"
								/>
							</div>
							<div className="text-xs">
								<label
									className="text-secondary font-medium cursor-pointer"
									htmlFor="newsletter"
								>
									Đăng ký nhận bản tin để nhận cảm hứng từ hoa
								</label>
								<p className="text-secondary/60 text-[11px] font-light mt-0.5">
									Nhận những mẹo về thực vật và quyền truy cập sớm vào các bộ
									sưu tập mới.
								</p>
							</div>
						</div>

						{/* Nút Đăng ký */}
						<div className="pt-2">
							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
							>
								{isLoading ? (
									<span>ĐANG ĐĂNG KÝ...</span>
								) : (
									<>
										<span>Tạo Tài Khoản</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</>
								)}
							</button>
						</div>
					</form>

					{/* Quay lại Đăng nhập */}
					<div className="mt-8 pt-6 border-t border-outline-variant/40 text-center">
						<p className="font-sans text-xs text-secondary/80 font-light">
							Đã là một phần của thế giới của chúng tôi?{" "}
							<button
								type="button"
								onClick={() => router.push(soulFlowRoutes.login)}
								className="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 transition-all"
							>
								Đăng nhập tại đây
							</button>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
