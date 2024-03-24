import VehicleList from "./Cards/VehicleList";
import Header from "./Menus/Header";
import ServiceList from "./Cards/ServiceList";
import AddServiceCard from "./Cards/AddServiceCard";
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
        <div className=" flex overflow-x-hidden">
          <div className="w-[300px] p-5 overflow-y-auto hidden xl:block">
            <VehicleList></VehicleList>
          </div>
          <div className=" p-6 flex-grow overflow-auto">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold">Service List</h1>
              <AddServiceCard></AddServiceCard>
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
