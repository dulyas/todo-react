import { makeAutoObservable } from "mobx";

export default class MessageStore {
	message: string = "";

	constructor() {
		makeAutoObservable(this);
	}

	setMessage(value: string) {
		this.message = value;

		setTimeout(() => {
			this.message = "";
		}, 3000);
	}

	getMessage() {
		return this.message;
	}
}
