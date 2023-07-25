import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TodoPage from "./routes/Todos/TodoPage";
import Login from "./routes/Login/Login";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <TodoPage />,
		},
		{
			path: "/login",
			element: <Login />,
		},
	],
	{ basename: "/todo-react/" },
);

const Router = () => {
	return <RouterProvider router={router} />;
};

export default Router;
