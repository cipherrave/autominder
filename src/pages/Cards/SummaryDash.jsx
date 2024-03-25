import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ServiceList from "./ServiceList";
import MileageDialog from "../Dialog/MileageDialog";
import AddServiceCard from "../Dialog/AddServiceCard";
import AddVehicleCard from "../Dialog/AddVehicleCard";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../../reducers/reducer";
import Spinner from "../../components/spinner";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { jwtDecode } from "jwt-decode";

export default function SummaryDash() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const token = localStorage.getItem("token");
  let fname = jwtDecode(token).fname;

  function navService() {
    nav("/service");
  }
  function navAddVehicle() {
    nav("/addVehicle");
  }

  function navAddService() {
    nav("/addService");
  }

  function navGarage() {
    nav("/garage");
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const vehicleData = localStorage.getItem("vehicleData");
  const serviceData = localStorage.getItem("serviceData");

  async function checkData() {
    if (!vehicleData | !serviceData) {
      nav("/login");
    }
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const readVehicle = JSON.parse(vehicleData);
  const totalVehicle = readVehicle.length;

  const sumMileage = readVehicle.reduce((acc, obj) => acc + obj.mileage, 0);

  const readService = JSON.parse(serviceData);
  const sumCost = readService.reduce((acc, obj) => acc + obj.cost, 0);

  useEffect(() => {
    checkData();
  }, []);

  return isLoading ? (
    <Spinner></Spinner>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div>
          {" "}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold">Welcome, {fname}!</h1>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <Card className="h-fit flex flex-col flex-grow">
          <CardHeader className="flex">
            <CardTitle className="text-3xl">Summary</CardTitle>
            <CardDescription className="pt-3">
              The following is the summary of your driving trend{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="md:flex-row sm:flex justify-evenly sm:justify-center gap-4 text-center">
            <div className="w-full sm:w-1/3 h-32">
              <h1 className="text-2xl ml-[-5px]">🚘🏍️</h1>
              <h1>You own</h1>
              <h1 className="text-3xl font-semibold">{totalVehicle}</h1>
              <p>vehicles</p>
            </div>
            <div className="w-full sm:w-1/3  h-32">
              <h1 className="text-2xl ml-[-5px]">🛣️</h1>
              <h1>You drove</h1>
              <h1 className="text-3xl font-semibold">{sumMileage} km</h1>
              <p>in total</p>
            </div>
            <div className="w-full sm:w-1/3  h-32">
              <h1 className="text-2xl ml-[-5px]">💸</h1>
              <h1>You spent</h1>
              <h1 className="text-3xl font-semibold">RM {sumCost}</h1>
              <p>on services</p>
            </div>
          </CardContent>
          <CardFooter>
            {" "}
            <div className="flex flex-row gap-2">
              <AddVehicleCard></AddVehicleCard>
              <AddServiceCard></AddServiceCard>
              <MileageDialog></MileageDialog>
            </div>
          </CardFooter>
        </Card>
        <Card className="flex flex-col w-full pb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Reminders</CardTitle>
            <CardDescription>Meow</CardDescription>
          </CardHeader>
          <div className="flex flex-row px-6 gap-4">
            <Card className="w-full h-[150px]">Meow</Card>
            <Card className="w-full h-[150px]">Meow</Card>
            <Card className="w-full h-[150px]">Meow</Card>
            <Card className="w-full h-[150px]">Meow</Card>
            <Card className="w-full h-[150px]">Meow</Card>
          </div>
        </Card>
        <Card className="flex flex-col flex-grow overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl">Services</CardTitle>
            <CardDescription>
              Quick look at your recent services{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceList></ServiceList>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={navService}>Go To Service</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
