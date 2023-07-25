import style from "./todos.module.scss";
import { useContext } from "react";
import { Context } from "@/main";
import Todo from "../Todo/Todo";
import TodosController from "./components/TodosController/TodosController";
import { observer } from "mobx-react-lite";
import Loader from "@/components/Loader/Loader";

const Todos = () => {
	const { todoStore } = useContext(Context);

	return (
		<div className={style.todos}>
			{todoStore.isLoading && (
				<div className={style.loader}>
					<Loader />
				</div>
			)}
			<TodosController />
			<div className={style.content}>
				<div className={style.list}>
					{todoStore.todos.map(
						({ title, id, done, email, username, edited }) => (
							<Todo
								key={id}
								title={title}
								id={id}
								done={done}
								email={email}
								username={username}
								edited={edited}
							/>
						),
					)}
				</div>
			</div>
		</div>
	);
};

export default observer(Todos);
