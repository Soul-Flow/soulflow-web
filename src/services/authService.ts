// src/services/authService.ts

import {
	type AuthResponseDTO,
	type LoginRequestDTO,
	mapUserResponseToFE,
	type UserFE,
} from "@/types/auth";
import axiosClient from "./axiosClient";

export const authService = {
	login: async (credentials: LoginRequestDTO): Promise<UserFE> => {
		// 1. Gọi API gửi username/password lên BE
		const rawResponse: AuthResponseDTO = await axiosClient.post(
			"/auth/login",
			credentials,
		);

		// 2. BE trả về thành công -> Lưu Token vào trình duyệt để xài cho các API sau
		if (rawResponse.accessToken) {
			localStorage.setItem("accessToken", rawResponse.accessToken);
		}

		// 3. Nắn cục data user thô thành user sạch và ném về cho Component
		return mapUserResponseToFE(rawResponse.user);
	},

	logout: () => {
		// Hàm phụ trợ để xóa token khi đăng xuất
		localStorage.removeItem("accessToken");
	},
};
