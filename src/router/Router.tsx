import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./components/Todos";
import Login from "./components/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Todos />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

const Router = () => {
	return <RouterProvider router={router} />;
};

export default Router;
