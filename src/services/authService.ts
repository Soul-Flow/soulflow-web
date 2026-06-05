// src/services/authService.ts

import {
	type AuthResponseDTO,
	type LoginRequestDTO,
	mapUserResponseToFE,
	type UserFE,
} from "@/types/auth.type";

import type { RegisterFormData } from "@/validations/auth.validator";
import axiosClient from "./axiosClient";

export const authService = {
	login: async (credentials: LoginRequestDTO): Promise<UserFE> => {
		// 1. Gọi API gửi username/password lên BE
		const rawResponse: AuthResponseDTO = await axiosClient.post(
			"/auth/login",
			credentials,
		);

		// 2. BE trả về thành công -> Lưu Token vào trình duyệt để xài cho các API sau
		if (rawResponse.accessToken && typeof window !== "undefined") {
			localStorage.setItem("accessToken", rawResponse.accessToken);
		}

		// 3. Nắn cục data user thô thành user sạch và ném về cho Component
		return mapUserResponseToFE(rawResponse.user);
	},
	register: async (data: RegisterFormData): Promise<void> => {
		// Gọi API đăng ký, BE sẽ tự xử lý logic tạo user mới
		await axiosClient.post("/auth/register", data);
	},
	logout: () => {
		// Hàm phụ trợ để xóa token khi đăng xuất (hoặc khi token hết hạn)
		if (typeof window !== "undefined") {
			localStorage.removeItem("accessToken");
		}
	},
};
