import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Garage from "./pages/Garage";
import Service from "./pages/Service";
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
      path: "/service",
      element: <Service />,
    },

    {
      path: "*",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
