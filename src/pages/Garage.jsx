import Header from "./Menus/Header";
import VehicleDetails from "./Cards/VehicleDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";

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
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className="flex-grow overflow-x-hidden w-full">
          <div className=" flex-wrap border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto p-5 w-full gap-8">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold">{fname}'s Garage</h1>
              <Button onClick={navAddVehicle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                {"  "}
                <p> Add Vehicle</p>
              </Button>
            </div>
            <br />
            <VehicleDetails></VehicleDetails>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Garage;
