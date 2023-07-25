import { useRef, useState, useContext, useEffect, ChangeEvent } from "react";
import style from "./todos-controller.module.scss";
import { Context } from "@/main";
import { useSearchParams } from "react-router-dom";
import { ISortFilterType } from "@/models/ISortFilters";
import { observer } from "mobx-react-lite";
import { Pagination } from "@mui/material";

type Tab = "Add" | "Sort";

const headersButtons = [
	{
		title: "Add",
	},
	{
		title: "Sort",
	},
];

const TodosController = () => {
	const newTodoStatusElem = useRef<HTMLInputElement | null>(null);
	const newTodoUsernameElem = useRef<HTMLInputElement | null>(null);
	const newTodoEmailElem = useRef<HTMLInputElement | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const { todoStore, errorStore, messageStore } = useContext(Context);

	const [activeTab, setActiveTab] = useState<Tab>("Add");

	const onClickCreateTodo = async () => {
		if (
			newTodoEmailElem.current?.value &&
			!newTodoEmailElem.current?.value.match(/.+@.+\..+/i)
		) {
			return errorStore.setErrorMessage("Not Valid Email");
		}

		for (const input of inputs) {
			if (!input.ref.current?.value)
				return errorStore.setErrorMessage(
					`${input.title} cant be empty`,
				);
		}

		try {
			await todoStore.createTodo(
				newTodoStatusElem.current!.value,
				newTodoEmailElem.current!.value,
				newTodoUsernameElem.current!.value,
			);
			messageStore.setMessage("Todo added!");
		} catch (e: any) {
			errorStore.setErrorMessage(
				e?.response?.data?.message || e?.message,
			);
		}
	};

	const inputs = [
		{
			title: "Text",
			ref: newTodoStatusElem,
		},
		{
			title: "Username",
			ref: newTodoUsernameElem,
		},
		{
			title: "Email",
			ref: newTodoEmailElem,
		},
	];

	const onClickFilter = (title: string, value: ISortFilterType) => {
		const calcNextValue = (value: ISortFilterType): ISortFilterType => {
			if (value === "up") return "down";
			if (value === "down") return "disabled";
			return "up";
		};

		const nextValue = calcNextValue(value);

		todoStore.setSortFilters({ [title]: nextValue });

		setSearchParams({
			...todoStore.sortFilters,
			[title]: nextValue,
			page: String(todoStore.page),
		});
		todoStore.getTodos();
	};

	const handleChangePage = (e: ChangeEvent<unknown>, value: number) => {
		setSearchParams({
			...todoStore.sortFilters,
			page: String(value),
		});
		todoStore.setPage(value);
		todoStore.getTodos();
	};

	useEffect(() => {
		try {
			const querySortParams = {
				status:
					(searchParams.get("status") as ISortFilterType) ||
					"disabled",
				username:
					(searchParams.get("username") as ISortFilterType) ||
					"disabled",
				email:
					(searchParams.get("email") as ISortFilterType) ||
					"disabled",
			};

			todoStore.setPage(searchParams.get("page") || 1);

			todoStore.setSortFilters(querySortParams);

			setSearchParams({
				...todoStore.sortFilters,
				page: String(todoStore.page),
			});
			todoStore.getTodos();
		} catch (e: any) {
			errorStore.setErrorMessage(e?.message);
		}
	}, []);

	return (
		<>
			<div className={style.pagination}>
				<Pagination
					count={todoStore.pages}
					page={+todoStore.page}
					onChange={handleChangePage}
				/>
			</div>
			<div className={style.header}>
				<div>Todos ({todoStore.todos.length})</div>
				<div className={style["header-btns"]}>
					{headersButtons.map(({ title }) => (
						<div
							key={title}
							onClick={() => setActiveTab(title as Tab)}
							className={`${style["btn"]} ${
								title === activeTab ? style.active : ""
							}`}
						>
							{title}
						</div>
					))}
				</div>
			</div>
			<div className={style.tab}>
				{activeTab === "Add" && (
					<>
						{inputs.map((input) => (
							<label key={input.title}>
								<div className={style["label-text"]}>
									{input.title}
								</div>
								<input ref={input.ref} type="text" />
							</label>
						))}

						<button
							onClick={onClickCreateTodo}
							className={`blue-btn ${style.submit}`}
						>
							Submit
						</button>
					</>
				)}
				{activeTab === "Sort" && (
					<>
						<div className={style.filter}>
							{Object.entries(todoStore.sortFilters).map(
								([title, value]) => (
									<div
										key={title}
										onClick={() =>
											onClickFilter(
												title,
												value as ISortFilterType,
											)
										}
										className={`${style["filter-btn"]} ${style[value]}`}
									>
										{title}
									</div>
								),
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default observer(TodosController);
