import { FC, useState, useContext, ChangeEvent, useRef } from "react";
import style from "./todo.module.scss";
import { EditIcon, DeleteIcon, SaveIcon, MiniLoader } from "./svgs";
import { Context } from "@/main";
import { observer } from "mobx-react-lite";

interface TodoProps {
	title: string;
	id: number;
	username: string;
	email: string;
	done: boolean;
	edited: boolean;
}

const Todo: FC<TodoProps> = ({ title, username, email, id, done, edited }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [onEdit, setOnEdit] = useState<boolean>(false);
	const [titleValue, setTitleValue] = useState<string>(title);
	const textInput = useRef<HTMLInputElement | null>(null);

	const { userStore, errorStore, todoStore } = useContext(Context);

	const errorHandler = (e: any) => {
		if (e?.response?.status === 401) {
			userStore.user = null;
			return errorStore.setErrorMessage(
				"Unathorizited error, please login again",
			);
		}
		errorStore.setErrorMessage(
			e.response?.data?.message || e?.message || "Unexpected Error",
		);
	};

	const onClickDone = async () => {
		if (!userStore.user)
			return errorStore.setErrorMessage("Only for admin");
		try {
			setLoading(true);
			await todoStore.updateTodoDone(id, !done);
		} catch (e: any) {
			errorHandler(e);
		} finally {
			setLoading(false);
		}
	};

	const onClickEdit = async () => {
		if (!onEdit) {
			setOnEdit(true);
			textInput.current!.focus();
		} else {
			if (!titleValue)
				return errorStore.setErrorMessage("Todo title cant be empty");
			try {
				setLoading(true);
				await todoStore.updateTodoTitle(id, titleValue);
				setOnEdit(false);
			} catch (e: any) {
				errorHandler(e);
			} finally {
				setLoading(false);
			}
		}
	};

	const onClickDelete = async () => {
		if (!userStore.user)
			return errorStore.setErrorMessage("Only for admin");
		try {
			await todoStore.deleteTodo(id);
		} catch (e: any) {
			errorHandler(e);
		}
	};

	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleValue(e.target.value!);
	};

	return (
		<>
			<div className={`${style.todo} ${done ? style.done : ""}`}>
				<div className={style.info}>
					<div className={style["info-item"]}>
						<div>Username: {username},&nbsp;</div>
						<div>Email: {email}</div>
					</div>
					{!!edited && <div>Edited by admin</div>}
				</div>
				<div className={style.wrap}>
					<div className={style.left}>
						<input
							className={`${
								!userStore.user ? style.disabled : ""
							}`}
							checked={done}
							onChange={onClickDone}
							type="checkbox"
						/>

						<input
							onChange={onChangeTitle}
							ref={textInput}
							value={titleValue}
							className={`${style.title} ${
								onEdit ? style["on-edit"] : ""
							}`}
							type="text"
							placeholder={titleValue}
						/>
					</div>
					{loading && (
						<div className={style["mini-loader"]}>
							<MiniLoader />
						</div>
					)}

					{userStore.user && (
						<div className={style.icons}>
							<button
								onClick={onClickEdit}
								className={style.edit}
							>
								{onEdit ? <SaveIcon /> : <EditIcon />}
							</button>
							<button
								onClick={onClickDelete}
								className={style.delete}
							>
								<DeleteIcon />
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default observer(Todo);
