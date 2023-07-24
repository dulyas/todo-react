import { makeAutoObservable } from "mobx";
import { API_URL } from "@/http/index";
import { IAuthResponse } from "@/models/AuthResponse";
import { IUser } from "@/models/IUser";
import AuthService from "@/services/AuthService";
import axios from 'axios'

export default class Store {
	user = {};
	isAuth = false;
	isLoading = true;

	constructor() {
		makeAutoObservable(this);
	}

	setLoading(status: boolean) {
		this.isLoading = status;
	}

	setAuth(status: boolean) {
		this.isAuth = status;
	}

	async setUser(user: IUser) {
		this.user = user;
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			await this.setUser(response.data.user);
		} catch (error: any) {
			console.log(error.response?.data?.message || error);
		}
	}

	async registration(email: string, password: string) {
		try {
			const response = await AuthService.registration(email, password);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			await this.setUser(response.data.user);
		} catch (error: any) {
			console.log(error.response?.data?.message || error);
		}
	}

	async logout() {
		try {
			await AuthService.logout();
			localStorage.removeItem("token");
			this.setAuth(false);
			this.setUser({} as IUser);
		} catch (error: any) {
			console.log(error.response?.data?.message || error);
		}
	}

	async checkAuth() {
		try {
			// this.setLoading(true)
			const response = await axios.get<IAuthResponse>(
				`${API_URL}/user/refresh`,
				{ withCredentials: true },
			);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);

			await this.setUser(response.data.user);
		} catch (error: any) {
			console.log(error.response?.data?.message || error);
		} finally {
			this.setLoading(false);
		}
	}
}
