import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Garage from "./pages/Garage";
import CreateVehicle from "./pages/CreateVehicle";
import Service from "./pages/Service";
import CreateService from "./pages/CreateService";
import Settings from "./pages/Settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Validation from "./pages/Validation";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/validate",
      element: <Validation />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    {
      path: "/garage",
      element: <Garage />,
    },

    {
      path: "/addVehicle",
      element: <CreateVehicle />,
    },

    {
      path: "/service",
      element: <Service />,
    },

    {
      path: "/addService",
      element: <CreateService />,
    },

    {
      path: "/settings",
      element: <Settings />,
    },

    {
      path: "*",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
