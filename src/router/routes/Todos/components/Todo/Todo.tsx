import { FC, useRef, useState } from "react";
import style from "./todo.module.scss";
import { EditIcon, DeleteIcon, SaveIcon, MiniLoader } from "./svgs";

interface TodoProps {
	deleteTodo: () => void;
	title: string;
	id: number;
	done: boolean;
}

const Todo: FC<TodoProps> = ({ title, id, done, deleteTodo }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [onEdit, setOnEdit] = useState<boolean>(false);

	const onClickDone = () => {
		console.log("onclickDone");
	};

	const onClickEdit = () => {
		console.log("onClickEdit");
	};

	const onClickDelete = () => {
		console.log("onClickDelete");
	};

	const inputTitleElement = useRef<HTMLInputElement | null>(null);

	return (
		<>
			<div className={style.todo}>
				<div className={style.left}>
					<input
						checked={done}
						onChange={onClickDone}
						type="checkbox"
					/>
					<input
						ref={inputTitleElement}
						value={title}
						class:on-edit={onEdit}
						className={style.title}
						type="text"
						placeholder={title}
					/>
				</div>
				{loading && (
					<div className={style["mini-loader"]}>
						<MiniLoader />
					</div>
				)}

				<div className="icons">
					<button onClick={onClickEdit} className={style.edit}>
						{onEdit ? <SaveIcon /> : <EditIcon />}
					</button>
					<button onClick={onClickDelete} className={style.delete}>
						<DeleteIcon />
					</button>
				</div>
			</div>
		</>
	);
};

export default Todo;
