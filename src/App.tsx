import Router from "./router/Router";
import "./App.css";
import { Context } from "./main";
import { useContext, useEffect } from "react";
import ErrorMessage from "./components/ErrorMessage";
import { observer } from "mobx-react-lite";

const App = () => {
	const { userStore, errorStore } = useContext(Context);

	useEffect(() => {
		userStore.checkAuth();
	}, []);

	return (
		<>
			<ErrorMessage text={errorStore.errorMessage} />
			<Router />
		</>
	);
};

export default observer(App);
