import Header from "./Components/Menus/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "./Components/reducers/reducer";
import VehicleList from "./Components/Cards/VehicleList";
import AddVehicleCard from "./Components/Dialog/AddVehicleCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ShortcutsAdmin from "./Components/Menus/ShortcutsAdmin";
import Spinner from "../components/spinner";
import VehicleListAdmin from "./Components/Cards/VehicleListAdmin";

function GarageAdmin() {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

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

  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.put("http://localhost:8989/user/vehicle/update", values);
      alert("Vehicle updated successfully!");
      nav("/dashboard");
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
            <ShortcutsAdmin></ShortcutsAdmin>
          </div>
          <div className="flex flex-col flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-4">
            <div className="flex flex-col gap-4">
              <div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
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
              <VehicleListAdmin></VehicleListAdmin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GarageAdmin;
