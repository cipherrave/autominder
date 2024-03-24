import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Garage from "./pages/Garage";
import Vehicle from "./pages/Vehicle";
import Service from "./pages/Service";
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
      path: "/vehicle",
      element: <Vehicle />,
    },

    {
      path: "/service",
      element: <Service />,
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
