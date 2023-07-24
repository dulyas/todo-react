import { IAuthResponse } from "@/models/AuthResponse";
import $api from "@/http";
import { AxiosResponse } from "axios";

export default class AuthService {
	static async login(
		name: string,
		password: string,
		keepLogin: boolean,
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>("/user/login", {
			name,
			password,
			keepLogin,
		});
	}

	static async logout(): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post("/user/logout");
	}

	static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
		return $api.get<IAuthResponse>(`/user/refresh`, {
			withCredentials: true,
		});
	}
}
