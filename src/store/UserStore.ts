import { makeAutoObservable } from "mobx";
import { IUser } from "@/models/IUser";
import AuthService from "@/services/AuthService";

export default class UserStore {
	user: IUser | null = null;
	isLoading = true;

	constructor() {
		makeAutoObservable(this);
	}

	setLoading(status: boolean) {
		this.isLoading = status;
	}

	setUser(user: IUser | null) {
		this.user = user;
	}

	async login(login: string, password: string, keepMeCheckBoxValue: boolean) {
		try {
			this.setLoading(true);
			const response = await AuthService.login(
				login,
				password,
				keepMeCheckBoxValue,
			);

			localStorage.setItem("token", response.data.accessToken);

			this.setUser(response.data.user);
		} finally {
			this.setLoading(false);
		}
	}

	async logout() {
		try {
			await AuthService.logout();
			localStorage.removeItem("token");

			this.setUser(null);
		} catch (error: any) {
			console.log(error.response?.data?.message || error);
		}
	}

	async checkAuth() {
		try {
			this.setLoading(true);
			const response = await AuthService.refresh();
			localStorage.setItem("token", response.data.accessToken);
			this.setUser(response.data.user);
		} catch (error: any) {
			console.log(error.response?.data?.message || error);
		} finally {
			this.setLoading(false);
		}
	}
}
