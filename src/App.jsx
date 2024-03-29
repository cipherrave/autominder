import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin";
import UsersAdmin from "./pages/UsersAdmin";
import UserSingleAdmin from "./pages/UserSingleAdmin";
import Garage from "./pages/Garage";
import GarageAdmin from "./pages/GarageAdmin";
import Vehicle from "./pages/Vehicle";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Settings from "./pages/Settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import { ThemeProvider } from "./components/theme-provider";
import ServicesAdmin from "./pages/ServicesAdmin";
import UserDetailsCard from "./pages/Components/Cards/UserDetailsCard";

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
      path: "/admin/login",
      element: <LoginAdmin />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin/register",
      element: <RegisterAdmin />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin/dashboard",
      element: <DashboardAdmin />,
    },
    {
      path: "/admin/users",
      element: <UsersAdmin />,
    },
    {
      path: "/admin/users/:id",
      element: <UserSingleAdmin />,
    },
    {
      path: "/garage",
      element: <Garage />,
    },
    {
      path: "/admin/garage",
      element: <GarageAdmin />,
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
      path: "/admin/services",
      element: <ServicesAdmin />,
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
