import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createContext } from "react";
import UserStore from "./store/UserStore.ts";
import TodoStore from "./store/TodoStore.ts";
import ErrorStore from "./store/ErrorStore.ts";
import MessageStore from "./store/MessageStore.ts";

const userStore = new UserStore();
const todoStore = new TodoStore();
const errorStore = new ErrorStore();
const messageStore = new MessageStore();

interface IState {
	userStore: UserStore;
	todoStore: TodoStore;
	errorStore: ErrorStore;
	messageStore: MessageStore;
}

export const Context = createContext<IState>({
	userStore,
	todoStore,
	errorStore,
	messageStore,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Context.Provider
		value={{
			userStore,
			errorStore,
			todoStore,
			messageStore,
		}}
	>
		<App />
	</Context.Provider>,
);
