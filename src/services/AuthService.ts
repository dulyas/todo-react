import { IAuthResponse } from "@/models/AuthResponse";
import $api from "@/http";
import { AxiosResponse } from "axios";

export default class AuthService {
	static async login(
		email: string,
		password: string,
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>("/user/login", { email, password });
	}

	static async registration(
		email: string,
		password: string,
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>("/user/registration", {
			email,
			password,
		});
	}

	static async logout(): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post("/user/logout");
	}
}
