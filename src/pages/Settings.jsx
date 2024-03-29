import Header from "./Components/Menus/Header";
import axios from "axios";
import SettingsCard from "./Components/Cards/SettingsCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleList from "./Components/Cards/VehicleList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

function Settings() {
  // check token is valid
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      navigate("/login");
    }
    // validate token by calling the private API
    try {
      setLoading(true);
      const response = await axios.get(
        "https://autominder-backend.onrender.com/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div>Loading...</div>
  ) : (
    <div className=" h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className=" flex overflow-x-hidden">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <VehicleList></VehicleList>
          </div>
          <div className=" p-6 flex-grow overflow-auto">
            <div className="flex flex-col justify-between gap-4">
              <div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between">
                  <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
              </div>
              <SettingsCard></SettingsCard>
            </div>
            <br />
            <p className="text-end">Made with ❤️ by cipherrave</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
