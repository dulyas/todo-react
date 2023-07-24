import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createContext } from "react";
import UserStore from "./store/user.ts";
import TodoStore from "./store/todo.ts";
import ErrorStore from "./store/error.ts";

const userStore = new UserStore();
const todoStore = new TodoStore();
const errorStore = new ErrorStore();

interface IState {
	userStore: UserStore;
	todoStore: TodoStore;
	errorStore: ErrorStore;
}

export const Context = createContext<IState>({
	userStore,
	todoStore,
	errorStore,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Context.Provider
		value={{
			userStore,
			errorStore,
			todoStore,
		}}
	>
		<App />
	</Context.Provider>,
);
