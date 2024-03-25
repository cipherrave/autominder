import Header from "./Menus/Header";
import VehicleCards from "./Cards/VehicleCards";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VehicleList from "./Cards/VehicleList";
import AddVehicleCard from "./Dialog/AddVehicleCard";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Garage() {
  // check token is valid
  const token = localStorage.getItem("token");
  let fname = jwtDecode(token).fname;

  const navigate = useNavigate();
  function navAddVehicle() {
    navigate("/addVehicle");
  }

  const [isLoading, setLoading] = useState(true);

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
    <div>Loading...</div>
  ) : (
    <div className=" h-screen flex overflow-hidden text-sm">
      <div className="w-full h-full flex flex-col">
        <Header></Header>
        <div className="flex overflow-auto">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <VehicleList></VehicleList>
          </div>
          <div className=" flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-8">
            <VehicleCards></VehicleCards>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Garage;
