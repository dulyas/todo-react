import { useRef, useState, useContext } from "react";
import style from "./todos-controller.module.scss";
import { Context } from "@/main";
import { useSearchParams } from "react-router-dom";

type Tab = "Add" | "Filter";

type FilterType = "disabled" | "up" | "down";

interface Filters {
	title: FilterType;
	email: FilterType;
	username: FilterType;
}

const TodosController = () => {
	const newTodoTitleElem = useRef<HTMLInputElement | null>(null);
	const newTodoUsernameElem = useRef<HTMLInputElement | null>(null);
	const newTodoEmailElem = useRef<HTMLInputElement | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState<Filters>({
		title: (searchParams.get("title") as FilterType) ?? "disabled",
		email: (searchParams.get("email") as FilterType) ?? "disabled",
		username: (searchParams.get("username") as FilterType) ?? "disabled",
	});
	const [page, setPage] = useState<string | number>(
		searchParams.get("page") ?? 1,
	);

	const { todoStore, errorStore } = useContext(Context);

	const [activeTab, setActiveTab] = useState<Tab>("Filter");

	const onClickCreateTodo = () => {
		for (const input of inputs) {
			console.log(input);
			if (!input.ref.current?.value)
				return errorStore.setErrorMessage(
					`${input.title} cant be empty`,
				);
		}
	};

	const inputs = [
		{
			title: "Title",
			ref: newTodoTitleElem,
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

	const headersButtons = [
		{
			title: "Add",
		},
		{
			title: "Filter",
		},
	];

	const onClickFilter = (title: string, value: FilterType) => {
		const calcNextValue = (value: FilterType): FilterType => {
			if (value === "up") return "down";
			if (value === "down") return "disabled";
			return "up";
		};

		const nextValue = calcNextValue(value);

		setFilters((prev) => ({
			...prev,
			[title]: nextValue,
		}));

		setSearchParams({
			...filters,
			[title]: nextValue,
		});
	};

	return (
		<>
			<div className={style.header}>
				<div>Todos ({todoStore.todos.length})</div>
				<div className={style["header-btns"]}>
					{headersButtons.map(({ title }) => (
						<div
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
				{activeTab === "Filter" && (
					<>
						<div className={style.filter}>
							{Object.entries(filters).map(([title, value]) => (
								<div
									onClick={() =>
										onClickFilter(
											title,
											value as FilterType,
										)
									}
									className={`${style["filter-btn"]} ${style[value]}`}
								>
									{title}
								</div>
							))}
						</div>
						<button className={`blue-btn ${style.submit}`}>
							Filter!
						</button>
					</>
				)}
			</div>
		</>
	);
};

export default TodosController;
