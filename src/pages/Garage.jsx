import Header from "./Components/Menus/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReducer, useEffect, useState } from "react";
import VehicleList from "./Components/Cards/VehicleList";
import AddVehicleCard from "./Components/Dialog/AddVehicleCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Shortcuts from "./Components/Menus/Shortcuts";
import Spinner from "../components/spinner";

function Garage() {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.put(
        "https://autominder-backend.onrender.com/user/vehicle/update",
        values
      );
      alert("Vehicle updated successfully!");
    } catch (error) {
      // api error handling
      alert("Vehicle not updated. Something is wrong...");
      console.error(error);
    }
  }

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className="h-screen flex overflow-hidden text-sm">
      <div className="w-full h-full flex flex-col">
        <Header></Header>
        <div className="flex overflow-auto">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <Shortcuts></Shortcuts>
            <VehicleList></VehicleList>
          </div>
          <div className="flex flex-col flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-4">
            <div className="flex flex-col gap-4">
              <div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Garage</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-row justify-between">
                  <h1 className="text-3xl font-semibold">Garage</h1>
                  <AddVehicleCard></AddVehicleCard>
                </div>
              </div>
              <Card className="h-[300px]">
                <CardHeader>
                  <CardContent>
                    <h1 className="flex justify-center">
                      Select vehicle from the sidebar to view its details
                    </h1>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Garage;
