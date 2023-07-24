import { makeAutoObservable } from "mobx";
// import { API_URL } from "@/http/index";
// import { IAuthResponse } from "@/models/AuthResponse";
// import { IUser } from "@/models/IUser";
// import AuthService from "@/services/AuthService";
// import axios from "axios";
// import { ITodo } from "@/models/ITodo";

export default class ErrorStore {
	errorMessage: string = "";

	constructor() {
		makeAutoObservable(this);
	}

	setErrorMessage(value: string) {
		this.errorMessage = value;

		setTimeout(() => {
			this.errorMessage = "";
		}, 3000);
	}

	getErrorMessage() {
		return this.errorMessage;
	}
}
