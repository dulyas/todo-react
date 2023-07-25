import style from "./login.module.scss";
import usePreventDefault from "@/hooks/usePreventDefault";
import { ChangeEvent, MouseEvent, useState, useContext } from "react";
import { Context } from "@/main";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import { observer } from "mobx-react-lite";

const Login = () => {
	const { errorStore, userStore } = useContext(Context);

	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	const [keepMeCheckBoxValue, setKeepMeCheckBoxValue] =
		useState<boolean>(true);

	const toggleCheckBoxValue = (e: MouseEvent) => {
		e.preventDefault();
		setKeepMeCheckBoxValue((prev) => !prev);
	};

	const sendForm = async (e: MouseEvent) => {
		e.preventDefault();
		try {
			await userStore.login(name, password, keepMeCheckBoxValue);
			navigate("/");
		} catch (e: any) {
			errorStore.setErrorMessage(
				e.response?.data?.message || e?.message || "Unexpected Error",
			);
		}
	};

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const backToTodo = () => navigate("/");

	return (
		<div className={style.lay}>
			{userStore.isLoading && (
				<div className={style.loader}>
					<Loader />
				</div>
			)}
			<div className={style.login}>
				<div className={style["tabs"] + " " + style["selected-login"]}>
					<button className="tab">SIGN IN</button>
				</div>

				<form onSubmit={usePreventDefault}>
					<label>
						<div>Name</div>
						<input
							value={name}
							onChange={onChangeName}
							type="text"
						/>
					</label>
					<label>
						<div>Password</div>
						<input
							value={password}
							onChange={onChangePassword}
							type="password"
						/>
					</label>
					<div className={style["checkbox-wrap"]}>
						<button
							onClick={toggleCheckBoxValue}
							className={`${style["fake-checkbox"]} ${
								keepMeCheckBoxValue ? style.active : ""
							}`}
						/>
						<span> Keep Me Signed In </span>
					</div>
					<button
						onClick={sendForm}
						className={`${style.btn} ${
							!name || !password ? style.disabled : ""
						}`}
					>
						SIGN IN
					</button>
				</form>
				<div className={style.line} />
				<button className={style.btn} onClick={backToTodo}>
					BACK TO TODO
				</button>
			</div>
		</div>
	);
};

export default observer(Login);
