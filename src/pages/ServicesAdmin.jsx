import Header from "./Components/Menus/Header";
import ServiceListAdmin from "./Components/Cards/ServiceListAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ShortcutsAdmin from "./Components/Menus/ShortcutsAdmin";
import Spinner from "../components/spinner";

function ServicesAdmin() {
  // check token is valid
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const nav = useNavigate();

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      nav("/login");
    } else if (admin_id === "") {
      nav("/login");
    }
    // validate token by calling the private API
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8989/admin/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      // if token is invalid, redirect to login
      console.error(error);
      nav("/login");
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
                    <BreadcrumbLink>Admin</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Services</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Services</h1>
              </div>
            </div>
            <br />
            <ServiceListAdmin></ServiceListAdmin>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesAdmin;
