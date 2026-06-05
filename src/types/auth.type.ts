// src/types/auth.ts

// 1. Dữ liệu gửi lên khi user điền form đăng nhập
export interface LoginRequestDTO {
	username: string;
	password: string;
}

// 2. Dữ liệu thô BE trả về (Giả sử BE trả về Token kèm Info User)
export interface AuthResponseDTO {
	accessToken: string;
	user: UserResponseDTO;
}

export interface UserResponseDTO {
	pk: number;
	username: string;
	fullName: string;
	email: string;
	photo: string | null;
	phone: string;
	address: string;
	activated: boolean;
	createDate: string;
	rolePk: number;
}

// 3. Dữ liệu sạch cho FE xài
export interface UserFE {
	id: number;
	username: string;
	fullName: string;
	email: string;
	avatar: string;
	phone: string;
	address: string;
	activated: boolean;
	createDate: string;
	roleId: number;
}

// 4. Hàm Mapper nắn dữ liệu
export const mapUserResponseToFE = (dto: UserResponseDTO): UserFE => {
	return {
		id: dto.pk,
		username: dto.username,
		fullName: dto.fullName,
		email: dto.email,
		avatar: dto.photo || "/images/avatar-placeholder.png", // Fallback ảnh mặc định
		phone: dto.phone,
		address: dto.address,
		activated: dto.activated,
		createDate: dto.createDate,
		roleId: dto.rolePk,
	};
};
