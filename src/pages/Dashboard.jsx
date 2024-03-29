import Header from "./Components/Menus/Header";
import SummaryDash from "./Components/Cards/SummaryDash";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleList from "./Components/Cards/VehicleList";
import Shortcuts from "./Components/Menus/Shortcuts";
import Spinner from "../components/spinner";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const nav = useNavigate();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      nav("/login");
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
      await delay(1000);
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
        <Header></Header>
        <div className="flex self-center h-screen pt-10">
          <Spinner></Spinner>
        </div>
      </div>
    </div>
  ) : (
    <div className=" h-screen flex overflow-hidden text-sm">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className="flex-grow flex overflow-x-hidden w-full">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <Shortcuts></Shortcuts>
            <VehicleList></VehicleList>
          </div>
          <div className=" flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-8">
            <SummaryDash></SummaryDash>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
