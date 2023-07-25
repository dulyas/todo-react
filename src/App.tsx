import Router from "./router/Router";
import "./App.css";
import { Context } from "./main";
import { useContext, useEffect } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Message from "./components/Message/Message";
import { observer } from "mobx-react-lite";

const App = () => {
	const { userStore, errorStore, messageStore } = useContext(Context);

	useEffect(() => {
		userStore.checkAuth();
	}, []);

	return (
		<>
			<ErrorMessage text={errorStore.errorMessage} />
			<Message text={messageStore.message} />
			<Router />
		</>
	);
};

export default observer(App);
