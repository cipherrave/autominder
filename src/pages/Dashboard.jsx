import Header from "./Menus/Header";
import SummaryDash from "./Cards/SummaryDash";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VehicleList from "./Cards/VehicleList";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  let fname = jwtDecode(token).fname;
  const nav = useNavigate();

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      nav("/login");
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
      nav("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className="flex-grow flex overflow-x-hidden w-full">
          <div className="w-[400px] p-5 overflow-y-auto hidden xl:block">
            <VehicleList></VehicleList>
          </div>
          <div className="flex-wrap border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto p-5 ">
            <h1 className="text-3xl font-semibold">Welcome, {fname}!</h1>
            <br />
            <SummaryDash></SummaryDash>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
