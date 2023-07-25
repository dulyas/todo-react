import { IUser } from "@/models/IUser";
export interface IAuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}
