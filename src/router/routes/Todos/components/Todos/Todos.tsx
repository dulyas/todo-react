import style from "./todos.module.scss";
import { useContext, useCallback, useRef, useState } from "react";
import { Context } from "@/main";
import Todo from "../Todo/Todo";
import TodosController from "./components/TodosController/TodosController";

const Todos = () => {
	const { todoStore, errorStore } = useContext(Context);

	const deleteTodo = useCallback(() => {
		console.log("onDeleteTodo");
	}, []);

	const onClickLoadMore = () => {
		console.log("onClickLoadMore");
	};

	return (
		<>
			<TodosController />
			<div className={style.content}>
				<div className={style.list}>
					{todoStore.todos.map(({ title, id, done }) => (
						<Todo
							deleteTodo={deleteTodo}
							title={title}
							id={id}
							done={done}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Todos;
