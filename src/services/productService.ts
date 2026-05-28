// src/services/productService.ts

import { defaultFlowers } from "@/lib/data/default-flowers"; // Import dữ liệu mẫu
import type { Flower } from "@/types/soulflow"; // Import Type của bạn
import axiosClient from "./axiosClient";

export const productService = {
	getAllFlowers: async (): Promise<Flower[]> => {
		try {
			// Cố gắng gọi API thật từ Spring Boot
			const data = await axiosClient.get("/products");

			// Giả sử API trả về mảng trực tiếp, nếu nó bọc trong { data: [...] } thì lấy data.data
			return data as unknown as Flower[];
		} catch {
			// Nếu gọi API thất bại (Network Error, 404, 500...)
			console.warn(
				"⚠️ API '/products' lỗi hoặc BE chưa chạy. Đang sử dụng dữ liệu mẫu (Mock Data).",
			);

			// Trả về dữ liệu giả để FE không bị sập
			return defaultFlowers;
		}
	},
};
