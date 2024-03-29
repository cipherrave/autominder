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
import VehicleAdmin from "./pages/VehicleAdmin";
import Services from "./pages/Services";
import ServicesAdmin from "./pages/ServicesAdmin";
import Service from "./pages/Service";
import ServiceAdmin from "./pages/ServiceAdmin";
import Settings from "./pages/Settings";
import SettingsAdmin from "./pages/SettingsAdmin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
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
      path: "/admin/garage/vehicle/:id",
      element: <VehicleAdmin />,
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
      path: "/admin/services/service/:id",
      element: <ServiceAdmin />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/admin/settings",
      element: <SettingsAdmin />,
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
