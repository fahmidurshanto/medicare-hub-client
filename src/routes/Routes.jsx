import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Register from "../pages/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default Router;
