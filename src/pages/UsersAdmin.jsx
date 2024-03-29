import VehicleList from "./Components/Cards/VehicleList";
import Header from "./Components/Menus/Header";
import UsersList from "./Components/Cards/UsersList";
import AddServiceCard from "./Components/Dialog/AddServiceCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ShortcutsAdmin from "./Components/Menus/ShortcutsAdmin";
import Spinner from "../components/spinner";
import VehicleDetailsTag from "./Components/Tags/VehicleDetailsTag";

function UsersAdmin() {
  // check token is valid
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const nav = useNavigate();

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      navigate("/login");
    }
    // validate token by calling the private API
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8989/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // if token is invalid, redirect to login
      console.error(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  // invoke checkToken by calling the function in the useEffect hook
  useEffect(() => {
    checkToken();
  }, []);

  return isLoading ? (
    <div className=" flex justify-center align-middle h-screen w-full">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className="flex self-center h-screen pt-10">
          <Spinner></Spinner>
        </div>
      </div>
    </div>
  ) : (
    <div className=" h-screen flex overflow-hidden text-sm ">
      <div className="w-full overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className=" flex overflow-x-hidden">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <ShortcutsAdmin></ShortcutsAdmin>
          </div>
          <div className=" p-6 flex-grow overflow-auto">
            <div className="flex flex-col justify-between">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Admin</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Users</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Users</h1>
                <AddServiceCard></AddServiceCard>
              </div>
            </div>
            <br />
            <UsersList></UsersList>
            <VehicleDetailsTag></VehicleDetailsTag>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersAdmin;
