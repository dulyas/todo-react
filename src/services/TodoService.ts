import $api from "@/http";
import { AxiosResponse } from "axios";
import { ITodo } from "@/models/ITodo";
import { ISearchQuery } from "@/models/ISortFilters";

export default class TodoService {
	static async getTodos(queryObject: ISearchQuery): Promise<
		AxiosResponse<{
			pageInfo: {
				results: ITodo[];
				total: number;
			};
		}>
	> {
		const generateQuery = (queryObject: {
			[string: string]: string | number;
		}) => {
			let result: string = "";
			for (const [key, value] of Object.entries(queryObject)) {
				result = result + (result ? "&" : "?") + key + "=" + value;
			}
			return result;
		};

		const query = generateQuery(queryObject);

		return $api.get("/todo/get-todos" + query);
	}

	static async createTodo(
		title: string,
		email: string,
		username: string,
	): Promise<AxiosResponse<{ todo: ITodo }>> {
		return $api.post("/todo/create-todo", {
			title,
			email,
			username,
		});
	}

	static async updateTodoDone(
		id: number,
		done: boolean,
	): Promise<AxiosResponse<{ todo: ITodo }>> {
		return $api.put("/todo/update-todo-done", {
			id,
			done,
		});
	}

	static async updateTodoTitle(
		id: number,
		title: string,
	): Promise<AxiosResponse<{ todo: ITodo }>> {
		return $api.put("/todo/update-todo-text", {
			id,
			title,
		});
	}

	static async deleteTodo(
		id: number,
	): Promise<AxiosResponse<{ deleted: number }>> {
		return $api.delete(`/todo/delete-todo/${id}`);
	}
}
