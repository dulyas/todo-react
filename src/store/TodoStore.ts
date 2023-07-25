import { makeAutoObservable } from "mobx";

import { ITodo } from "@/models/ITodo";
import { ISortFilters, ISearchQuery } from "@/models/ISortFilters";
import TodoService from "@/services/TodoService";

export default class TodoStore {
	public todos: ITodo[] = [];
	public isLoading: boolean = false;
	public sortFilters: ISortFilters = {
		status: "disabled",
		username: "disabled",
		email: "disabled",
	};
	public page: string | number = 1;
	private _pages?: number;
	private pageSize: number = 3;

	constructor() {
		makeAutoObservable(this);
	}

	private setTodos(todos: ITodo[]) {
		this.todos = todos;
	}

	private set pages(value: number) {
		this._pages = Math.trunc(value / this.pageSize) + 1;
	}

	public get pages() {
		return this._pages!;
	}

	public setLoading(value: boolean) {
		this.isLoading = value;
	}

	private get queryObject(): ISearchQuery {
		return {
			...this.sortFilters,
			page: +this.page - 1,
		};
	}

	private replaceTodo(id: number, newTodo: ITodo) {
		const todoIndex = this.todos.findIndex((todo) => todo.id === id);
		if (todoIndex === -1) return this.getTodos();
		this.todos[todoIndex] = newTodo;
	}

	public setSortFilters(
		newFilters: Partial<ISortFilters & { page: string | number }>,
	) {
		this.sortFilters = {
			...this.sortFilters,
			...newFilters,
		};
	}

	public setPage(value: string | number) {
		this.page = value;
	}

	public async getTodos() {
		this.setLoading(true);
		try {
			const { results: todos, total: count } = (
				await TodoService.getTodos(this.queryObject)
			).data.pageInfo;
			this.pages = count;
			this.setTodos(todos);
		} finally {
			this.setLoading(false);
		}
	}

	public async createTodo(title: string, email: string, username: string) {
		this.setLoading(true);
		try {
			await TodoService.createTodo(title, email, username);
			this.getTodos();
		} finally {
			this.setLoading(false);
		}
	}

	public async updateTodoTitle(id: number, title: string) {
		const updatedTodo = (await TodoService.updateTodoTitle(id, title)).data
			.todo;
		if (updatedTodo) this.replaceTodo(updatedTodo.id, updatedTodo);
	}

	public async updateTodoDone(id: number, done: boolean) {
		const updatedTodo = (await TodoService.updateTodoDone(id, done)).data
			.todo;
		if (updatedTodo) this.replaceTodo(updatedTodo.id, updatedTodo);
	}

	public async deleteTodo(id: number) {
		const deletedCount = (await TodoService.deleteTodo(id)).data.deleted;
		if (deletedCount) this.getTodos();
	}
}
