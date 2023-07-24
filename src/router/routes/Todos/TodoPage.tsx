import style from "./todos.module.scss";
import "./todos.scss";
import { useContext } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react-lite";
import Todos from "./components/Todos/Todos";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
	const { userStore } = useContext(Context);
	const navigate = useNavigate();

	const onClickAuth = async () => {
		if (!userStore.user) {
			navigate("/login");
		} else {
			await userStore.logout();
		}
	};

	return (
		<div className={style.todo}>
			<header>
				<div className={style.user}>{userStore.user?.email}</div>
				<button
					onClick={onClickAuth}
					className={`blue-btn ${style.logout}`}
				>
					{userStore.user ? "Logout" : "Login"}
				</button>
			</header>
			<div className={style.todos}>
				<Todos />
			</div>
		</div>
	);
};

export default observer(TodoPage);
