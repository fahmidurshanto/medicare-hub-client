import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default Router;
