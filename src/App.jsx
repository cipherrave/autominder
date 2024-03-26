import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Garage from "./pages/Garage";
import Vehicle from "./pages/Vehicle";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Settings from "./pages/Settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { ThemeProvider } from "./components/theme-provider";

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
      path: "/dashboard",
      element: <Dashboard />,
    },

    {
      path: "/garage",
      element: <Garage />,
    },

    {
      path: "/garage/vehicle/:id",
      element: <Vehicle />,
    },

    {
      path: "/services",
      element: <Services />,
    },

    {
      path: "/services",
      element: <Service />,
    },

    {
      path: "/services/service/:id",
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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
