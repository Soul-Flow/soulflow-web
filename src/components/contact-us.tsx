"use client";

import {
	CheckCircle2,
	Clock,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	Send,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export function ContactUs() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [tel, setTel] = useState("");
	const [msg, setMsg] = useState("");
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	// Studio feedbacks feedback state logs
	const [feedbacks, setFeedbacks] = useState([
		{
			name: "Isabelle Laurent",
			date: "May 14, 2026",
			comment:
				"The Sarah Bernhardt blush peonies survived beautifully for 8 days! Incredible grade.",
			rating: 5,
		},
		{
			name: "Viet Nguyen",
			date: "Apr 28, 2026",
			comment:
				"Phục vụ tận tâm, thiết kế bó hoa bespoke màu Pastel rực rỡ và có chiều sâu.",
			rating: 5,
		},
	]);
	const [fbName, setFbName] = useState("");
	const [fbComment, setFbComment] = useState("");
	const [fbSuccess, setFbSuccess] = useState(false);

	const handleSubmitInquiry = (e: React.FormEvent) => {
		e.preventDefault();
		setSending(true);
		setTimeout(() => {
			setSending(false);
			setSent(true);
			setName("");
			setEmail("");
			setTel("");
			setMsg("");
			setTimeout(() => setSent(false), 4000);
		}, 1500);
	};

	const handlePostFeedback = (e: React.FormEvent) => {
		e.preventDefault();
		if (!fbName || !fbComment) return;

		const newFeedback = {
			name: fbName,
			date: "Today",
			comment: fbComment,
			rating: 5,
		};

		setFeedbacks([newFeedback, ...feedbacks]);
		setFbName("");
		setFbComment("");
		setFbSuccess(true);
		setTimeout(() => setFbSuccess(false), 3000);
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-sf-bg-elevated transition-colors duration-300">
			{/* Page Title */}
			<div className="text-center space-y-2 mb-12">
				<span className="text-sm font-bold tracking-widest text-[#C49B83] uppercase block">
					Connect With Us
				</span>
				<h1 className="font-serif text-3xl sm:text-4xl font-light text-sf-fg">
					Get in Touch
				</h1>
				<p className="max-w-md mx-auto text-xs text-[#666666] dark:text-[#A0A0A0] font-light">
					Drop by our botanical sanctuary, phone our design concierge, or submit
					an inquiry to co-create bespoke interior styling arrangements.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start mb-20">
				{/* Left Column - Contact Form */}
				<div className="lg:col-span-7 bg-sf-bg-elevated p-6 rounded-2xl border border-[#C49B83]/30 shadow-sm space-y-6">
					<h2 className="font-serif text-lg font-semibold text-sf-fg flex items-center gap-2 border-b border-[#EBE5DA] dark:border-[#C49B83]/30 pb-3">
						<Send className="h-4.5 w-4.5 text-[#C49B83]" />
						Submit Styling Inquiry / Gửi Yêu Cầu
					</h2>

					<form onSubmit={handleSubmitInquiry} className="space-y-4">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-1">
								<label
									htmlFor="contact-name"
									className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
								>
									Your Name
								</label>
								<input
									id="contact-name"
									type="text"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full text-xs rounded-lg border border-sf-border bg-sf-bg-elevated text-sf-fg p-3 outline-none focus:border-[#C49B83]"
								/>
							</div>

							<div className="space-y-1">
								<label
									htmlFor="contact-email"
									className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
								>
									Email Address
								</label>
								<input
									id="contact-email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full text-xs rounded-lg border border-sf-border bg-sf-bg-elevated text-sf-fg p-3 outline-none focus:border-[#C49B83]"
								/>
							</div>
						</div>

						<div className="space-y-1">
							<label
								htmlFor="contact-phone"
								className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
							>
								Phone Number
							</label>
							<input
								id="contact-phone"
								type="tel"
								value={tel}
								onChange={(e) => setTel(e.target.value)}
								className="w-full text-xs rounded-lg border border-sf-border bg-sf-bg-elevated text-sf-fg p-3 outline-none focus:border-[#C49B83]"
							/>
						</div>

						<div className="space-y-1">
							<label
								htmlFor="contact-message"
								className="text-sm uppercase tracking-wider font-bold text-[#666666] dark:text-[#A0A0A0]"
							>
								How can our florists assist you?
							</label>
							<textarea
								id="contact-message"
								rows={4}
								required
								value={msg}
								onChange={(e) => setMsg(e.target.value)}
								placeholder="Describe your design space, wedding theme, or core flower palette requirements..."
								className="w-full text-xs rounded-xl border border-sf-border bg-sf-bg-elevated text-sf-fg p-3 outline-none focus:border-[#C49B83]"
							/>
						</div>

						<div className="flex items-center justify-between pt-2">
							<button
								id="contact-submit-btn"
								type="submit"
								disabled={sending}
								className="rounded-lg bg-[#1A1A1A] dark:bg-white  text-sf-fg dark:text-[#1F1A16] hover:bg-[#C49B83] dark:hover:bg-[#C49B83] hover: dark:hover: disabled:opacity-50 text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors shadow-sm"
							>
								{sending ? "Transmitting Inquiries..." : "Send Styling Inquiry"}
							</button>

							{sent && (
								<span className="text-xs text-green-500 font-bold uppercase flex items-center gap-1">
									<CheckCircle2 className="h-4.5 w-4.5" /> Inquiry transmitted
									successfully!
								</span>
							)}
						</div>
					</form>
				</div>

				{/* Right Column - Studio Info coordinates */}
				<div className="lg:col-span-5 space-y-6">
					<div className="bg-sf-bg-elevated p-6 rounded-2xl border border-[#C49B83]/30  text-sf-fg space-y-6 shadow-md">
						<h3 className="font-serif text-lg font-light text-sf-fg">
							Studio Coordinates
						</h3>

						<div className="space-y-4 text-xs font-light">
							<div className="flex items-start gap-3">
								<MapPin className="h-4.5 w-4.5 text-[#C49B83] shrink-0 mt-0.5" />
								<div>
									<p className="font-semibold  text-sf-fg uppercase tracking-wider">
										SoulFlow Sanctuary
									</p>
									<p className=" text-sf-fg leading-relaxed mt-0.5">
										88 Đồng Khởi, Bến Nghé Ward, District 1, Ho Chi Minh City,
										Vietnam
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<Phone className="h-4.5 w-4.5 text-[#C49B83] shrink-0 mt-0.5" />
								<div>
									<p className="font-semibold  text-sf-fg uppercase tracking-wider">
										Atelier Concierge
									</p>
									<p className=" text-sf-fg mt-0.5">+84 28 3824 5678</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<Mail className="h-4.5 w-4.5 text-[#C49B83] shrink-0 mt-0.5" />
								<div>
									<p className="font-semibold  text-sf-fg uppercase tracking-wider">
										Inquiries Response Room
									</p>
									<p className=" text-sf-fg mt-0.5">
										atelier-vietnam@soulflowboutique.com
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<Clock className="h-4.5 w-4.5 text-[#C49B83] shrink-0 mt-0.5" />
								<div>
									<p className="font-semibold  text-sf-fg uppercase tracking-wider">
										Preserving Hours
									</p>
									<p className=" text-sf-fg leading-relaxed mt-0.5">
										Mon – Sat: 08:00 AM – 08:30 PM
									</p>
									<p className="text-[#888888]">
										Sundays: Closed for organic garden condition restorations
									</p>
								</div>
							</div>
						</div>

						{/* Visual Mini Map display placeholder styled beautifully */}
						<div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#C49B83]/30">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400"
								alt="SoulFlow map coordinates landscape"
								className="h-full w-full object-cover opacity-40 grayscale"
								referrerPolicy="no-referrer"
							/>
							<div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-center p-3  text-sf-fg">
								<p className="font-bold text-sm uppercase tracking-widest text-[#C49B83]">
									Atelier Interactive Map
								</p>
								<p className="text-xs text-gray-300 mt-1">
									Open in main tab to trigger geo-sensors
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Guest Feedbacks & Ratings */}
			<section className="border-t border-[#EBE5DA] dark:border-[#C49B83]/30 pt-12">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
					{/* Post Feedback form */}
					<div className="lg:col-span-5 space-y-4 bg-sf-bg-elevated p-5 rounded-2xl border border-sf-border">
						<h3 className="font-serif text-lg font-medium text-sf-fg flex items-center gap-1.5 pb-2 border-b border-sf-border">
							<MessageSquare className="h-4.5 w-4.5 text-[#C49B83]" />
							Leave Guest Feedback
						</h3>

						<form onSubmit={handlePostFeedback} className="space-y-3">
							<div className="space-y-1">
								<label
									htmlFor="fb-name"
									className="text-sm font-bold uppercase text-gray-500"
								>
									Your Name
								</label>
								<input
									id="fb-name"
									type="text"
									required
									value={fbName}
									onChange={(e) => setFbName(e.target.value)}
									placeholder="e.g. Eleanor Vance"
									className="w-full text-xs rounded-lg border border-sf-border bg-sf-bg-elevated p-2.5 outline-none text-sf-fg"
								/>
							</div>

							<div className="space-y-1">
								<label
									htmlFor="fb-comment"
									className="text-sm font-bold uppercase text-gray-500"
								>
									Your Opinion / Trải Nghiệm
								</label>
								<textarea
									id="fb-comment"
									rows={2}
									required
									value={fbComment}
									onChange={(e) => setFbComment(e.target.value)}
									placeholder="Did you enjoy the fragrance and arrangement volumes?"
									className="w-full text-xs rounded-lg border border-sf-border bg-sf-bg-elevated p-2.5 outline-none text-sf-fg"
								/>
							</div>

							<button
								id="contact-post-fb-btn"
								type="submit"
								className="rounded-lg bg-[#C49B83] hover:bg-[#C49B83]/90  text-sf-fg text-sm font-bold tracking-widest uppercase px-4 py-2 transition-colors"
							>
								Post Review
							</button>
							{fbSuccess && (
								<span className="text-xs text-green-500 font-bold uppercase ml-2">
									Arrived!
								</span>
							)}
						</form>
					</div>

					{/* List feedbacks log */}
					<div className="lg:col-span-7 space-y-4">
						<h3 className="font-serif text-lg font-light text-sf-fg">
							Atelier Testimonials
						</h3>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{feedbacks.map((f) => (
								<div
									key={`${f.name}-${f.date}`}
									className="bg-sf-bg-elevated p-4 rounded-xl border border-sf-border space-y-2"
								>
									<div className="flex justify-between items-center">
										<span className="text-xs font-semibold text-sf-fg uppercase">
											{f.name}
										</span>

										<span className="text-xs text-[#A0A0A0]">{f.date}</span>
									</div>

									<p className="text-xs text-[#666666] dark:text-[#A0A0A0] font-light leading-relaxed">
										&quot;{f.comment}&quot;
									</p>

									<div className="flex text-amber-500 text-sm">★★★★★</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
