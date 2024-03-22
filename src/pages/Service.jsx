import VehicleList from "./Cards/VehicleList";
import Header from "./Menus/Header";
import ServiceList from "./Cards/ServiceList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Service() {
  // check token is valid
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const nav = useNavigate();
  function navAddService() {
    nav("/addService");
  }
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
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm ">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className="flex-grow flex overflow-x-hidden gap-2">
          <div className=" p-6 flex-grow w-[500px] overflow-auto">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Service List</h1>{" "}
              <Button onClick={navAddService}>
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
                Add Service
              </Button>{" "}
            </div>

            <br />
            <ServiceList></ServiceList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
