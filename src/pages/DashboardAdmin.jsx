import HeaderAdmin from "./Components/Menus/HeaderAdmin";
import SummaryDashAdmin from "./Components/Cards/SummaryDashAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import ShortcutsAdmin from "./Components/Menus/ShortcutsAdmin";
import { jwtDecode } from "jwt-decode";

function DashboardAdmin() {
  const token = localStorage.getItem("token");
  const admin_id = jwtDecode(token).admin_id;
  const [isLoading, setLoading] = useState(true);
  const nav = useNavigate();

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      nav("/login");
    } else if (!admin_id) {
      nav("/login");
    }
    // validate token by calling the private API
    try {
      setLoading(true);
      const response = await axios.get(
        "https://autominder-backend.onrender.com/admin/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let getAllVehicle = await axios.get(
        "https://autominder-backend.onrender.com/admin/vehicle/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // save response data into localStorage as vehicleData for other local uses
      const vehicleArray = getAllVehicle.data;
      const vehicleString = JSON.stringify(vehicleArray);
      localStorage.setItem("vehicleData", vehicleString);

      let getAllService = await axios.get(
        "https://autominder-backend.onrender.com/admin/service/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // save response data into localStorage as serviceData for other local uses
      const serviceArray = getAllService.data;
      const serviceString = JSON.stringify(serviceArray);
      localStorage.setItem("serviceData", serviceString);
    } catch (error) {
      // if token is invalid, redirect to login
      console.error(error);
      nav("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return isLoading ? (
    <div className=" flex justify-center align-middle h-screen w-full">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <div className="flex self-center h-screen pt-10">
          <Spinner></Spinner>
        </div>
      </div>
    </div>
  ) : (
    <div className=" h-screen flex overflow-hidden text-sm">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <HeaderAdmin></HeaderAdmin>
        <div className="flex-grow flex overflow-x-hidden w-full">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <ShortcutsAdmin></ShortcutsAdmin>
          </div>
          <div className=" flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-8">
            <SummaryDashAdmin></SummaryDashAdmin>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
