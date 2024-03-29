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
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import Spinner from "../../../components/spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { jwtDecode } from "jwt-decode";
import ReminderList from "./ReminderList";

export default function SummaryDash() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const token = localStorage.getItem("token");
  let fname = jwtDecode(token).fname;

  function navService() {
    nav("/services");
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const vehicleData = localStorage.getItem("vehicleData");
  const serviceData = localStorage.getItem("serviceData");

  async function checkData() {
    if (!vehicleData | !serviceData) {
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
      <div className="grid  xl:grid-cols-3 sm:grid-cols-1 gap-4">
        <Card className="flex flex-col flex-grow">
          <CardHeader className="flex">
            <CardTitle className="text-3xl">Summary</CardTitle>
            <CardDescription className="pt-3">
              The following is the summary of your driving trend{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid xl:grid-cols-3 gap-4">
            <div>
              <h1 className="text-2xl ml-[-5px]">🚘🏍️</h1>
              <h1>You own</h1>
              <h1 className="text-3xl font-semibold">{totalVehicle}</h1>
              <p>vehicles</p>
            </div>
            <div>
              <h1 className="text-2xl ml-[-5px]">🛣️</h1>
              <h1>You drove</h1>
              <h1 className="text-3xl font-semibold">{sumMileage} km</h1>
              <p>in total</p>
            </div>
            <div>
              <h1 className="text-2xl ml-[-5px]">💸</h1>
              <h1>You spent</h1>
              <h1 className="text-3xl font-semibold">RM {sumCost}</h1>
              <p>on services</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col flex-grow overflow-hidden xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-3xl">Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <ReminderList></ReminderList>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
