import { makeAutoObservable } from "mobx";

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
