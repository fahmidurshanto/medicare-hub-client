import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserDashboard from "../pages/UserDashboard";
import Profile from "../components/Profile";
import Appointments from "../components/Appointments";
import TestResults from "../components/TestResults";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/AdminDashboard";
import UserDetails from "../components/UserDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/userDashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/appointments",
        element: <Appointments></Appointments>,
      },
      {
        path: "/results",
        element: <TestResults></TestResults>,
      },
      {
        path: "/allUsers/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
        element: <UserDetails></UserDetails>,
      },
    ],
  },
]);

export default Router;
