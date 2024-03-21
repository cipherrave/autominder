import VehicleList from "./Cards/VehicleList";
import Header from "./Menus/Header";
import Sidebar from "./Menus/Sidebar";
import SummaryDash from "./Cards/SummaryDash";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // check token is valid
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const [fname, setFname] = useState(null);

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
      setFname(response.data.fname);
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
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className="flex-grow flex overflow-x-hidden w-full">
          <div className=" flex-wrap border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto p-5 ">
            <SummaryDash></SummaryDash>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
