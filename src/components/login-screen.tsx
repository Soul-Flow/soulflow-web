"use client";

import { Eye, EyeOff, Flower, Lock, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { soulFlowRoutes } from "@/lib/soulflow/routes";
import { authService } from "@/services/authService";
import { useSoulFlowStore } from "@/store/soulflow-store";

export function LoginScreen({
	onSuccessToast,
}: {
	onSuccessToast: (message: string) => void;
}) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const setUser = useSoulFlowStore((state) => state.setUser);
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		const toastId = toast.loading("Đang đăng nhập...");
		try {
			// Đưa username/password cho service đi xin token
			const userData = await authService.login({ username, password });
			const userName =
				userData.fullName?.slice(0, userData.fullName.indexOf(" ")) ||
				userData.username ||
				"User";

			// Lấy được data về thì quăng vào Store
			setUser(userData);

			toast.success("Đăng nhập thành công!", { id: toastId });
			onSuccessToast(`Chào mừng ${userName} đã trở lại với SoulFlow!`);
			router.push(soulFlowRoutes.home);
		} catch {
			toast.error("Sai tài khoản hoặc mật khẩu!", { id: toastId });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full min-h-[85vh] md:min-h-175 bg-white rounded-2xl overflow-hidden shadow-xl border border-amber-50 border-outline-variant/30 grid grid-cols-1 md:grid-cols-12">
			{/* Cột Trái: Trải nghiệm thương hiệu (Màn Hình 1) */}
			<section className="hidden md:flex md:col-span-6 relative overflow-hidden bg-[#e0d8cc]/30 min-h-137.5">
				{/* Lớp nền ảnh bông hoa mờ sương sang trọng */}
				<div className="absolute inset-0 z-0">
					<Image
						src="https://lh3.googleusercontent.com/aida/ADBb0uh3QWKnXCyccbmrPhVoBvd3615arm2G9rZOvSX1uXQIKMOf6lWqWqkC1o-4Q4E7Z9Wk41Nb5Pln6B8eX7k8urfMmexFmz7D6DzVvggBDuvkT0aNzBH30NvXnVzkDp3Ixj6zi7gc4Tcy8hdt1SMrtq5DTZOfKf6006B-vsy4HoY4G3QBrWQh7BwciMpG8VufOG6ARBFuhaK6uKkfjLFKEiEJ8AA5N-rVTrBBogJadovP7Rml4DHsC6X_d7o"
						alt="SoulFlow Botanical Artistry"
						className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-3000 ease-out"
						referrerPolicy="no-referrer"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						loading="eager"
					/>
					{/* Floral overlay gradient */}
					<div className="absolute inset-0 bg-gradient-to-hb from-[#fcfaf7]/20 to-[#e0d8cc]/60 z-10" />
				</div>

				{/* Nội dung thương hiệu */}
				<div className="relative z-20 flex flex-col justify-between p-12 w-full text-[#111c2d]">
					<div>
						<span className="text-xs uppercase tracking-[0.2em] text-primary/80 font-semibold mb-2 block">
							Flower Shop Portal
						</span>
						<h2 className="font-serif text-5xl font-light text-primary tracking-tight">
							SoulFlow
						</h2>
						<p className="font-sans text-md text-secondary max-w-sm mt-6 italic font-light leading-relaxed">
							&quot;Bất kỳ ai cũng có thể tìm thấy sự bình yên trong thiên
							nhiên.&quot;
						</p>
					</div>

					<div className="flex items-center gap-4">
						<span className="w-12 h-px bg-primary/40 block"></span>
						<span className="font-sans text-xs uppercase tracking-[0.3em] font-medium text-primary">
							SoulFlow - Where Nature Meets Elegance
						</span>
					</div>
				</div>
			</section>

			{/* Cột Phải: Form Đăng Nhập */}
			<section className="col-span-12 md:col-span-6 flex flex-col justify-center p-8 sm:p-12 md:p-16 relative bg-white overflow-hidden">
				{/* Logo trên thiết bị di động */}
				<div className="md:hidden mb-8">
					<h2 className="font-serif text-3xl text-primary tracking-tight">
						SoulFlow
					</h2>
				</div>

				<div className="w-full max-w-md space-y-8 relative z-10">
					<header className="space-y-2">
						<h3 className="font-serif text-3xl text-[#111c2d] font-light">
							Chào mừng trở lại!
						</h3>
						<p className="font-sans text-sm text-secondary/80 font-light">
							Vui lòng đăng nhập vào tài khoản của bạn để tiếp tục trải nghiệm
							những sản phẩm và dịch vụ tuyệt vời từ SoulFlow.
						</p>
					</header>

					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Trường Username */}
						<div className="space-y-2 group">
							<label
								className="block text-xs uppercase tracking-widest font-semibold text-secondary/90 transition-colors group-focus-within:text-primary"
								htmlFor="login-username"
							>
								Username
							</label>
							<div className="relative flex items-center border-b border-outline-variant py-2.5 transition-colors group-focus-within:border-primary">
								<User className="absolute left-0 w-4 h-4 text-secondary/40 group-focus-within:text-primary transition-colors" />
								<input
									id="login-username"
									type="text"
									placeholder="Enter your username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full bg-transparent pl-7 pr-4 text-sm text-[#111c2d] placeholder-secondary/30 focus:outline-none border-0"
									required
								/>
							</div>
						</div>

						{/* Trường Mật khẩu */}
						<div className="space-y-2 group">
							<div className="flex justify-between items-center text-xs uppercase tracking-widest font-semibold">
								<label
									className="text-secondary/90 transition-colors group-focus-within:text-primary"
									htmlFor="login-password"
								>
									Mật khẩu
								</label>
								<button
									type="button"
									className="lowercase text-[11px] font-sans tracking-normal hover:text-primary transition-colors text-primary/70"
									onClick={() =>
										console.log(
											"Tính năng đặt lại mật khẩu đã được gửi đến email đăng ký.",
										)
									}
								>
									Quên mật khẩu?
								</button>
							</div>
							<div className="relative flex items-center border-b border-outline-variant py-2.5 transition-colors group-focus-within:border-primary">
								<Lock className="absolute left-0 w-4 h-4 text-secondary/40 group-focus-within:text-primary transition-colors" />
								<input
									id="login-password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full bg-transparent pl-7 pr-10 text-sm text-[#111c2d] placeholder-secondary/30 focus:outline-none border-0"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-0 text-secondary/40 hover:text-primary transition-colors"
								>
									{showPassword ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							</div>
						</div>

						{/* Ghi nhớ đăng nhập */}
						<div className="flex items-center justify-between pt-1">
							<label className="flex items-center space-x-3 cursor-pointer group">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary"
								/>
								<span className="font-sans text-xs text-secondary/80 group-hover:text-[#111c2d] transition-colors font-medium">
									Ghi nhớ đăng nhập
								</span>
							</label>
						</div>

						{/* Nút Đăng Nhập */}
						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full py-3.5 bg-primary bg-[#C49B83] hover:bg-[#c57e55] text-sf-fg text-xs font-semibold uppercase tracking-[0.2em] rounded-lg shadow-login hover:shadow-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
							>
								{isLoading ? (
									<span className="flex items-center gap-2">
										<span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
										LOGGING IN...
									</span>
								) : (
									"ĐĂNG NHẬP"
								)}
							</button>
						</div>
					</form>

					{/* Footer liên kết sang Đăng ký */}
					<footer className="text-center pt-4 border-t border-outline-variant/40">
						<p className="font-sans text-xs text-secondary/80 font-light">
							Chưa có tài khoản?{" "}
							<button
								type="button"
								onClick={() => console.log("Chuyển đến trang đăng ký")}
								className="font-semibold text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all ml-1 text-xs"
							>
								Tạo Tài Khoản
							</button>
						</p>
					</footer>
				</div>

				{/* Trang trí thực vật cổ điển mờ ảo góc dưới bên phải */}
				<div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none select-none text-primary transform rotate-12">
					<Flower size={240} className="stroke-[1.5]" />
				</div>
			</section>
		</div>
	);
}
