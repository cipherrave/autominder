import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import Spinner from "../../../components/spinner";
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold">Welcome, {fname}!</h1>
        </div>
      </div>
      <div className="grid  xl:grid-cols-3 sm:grid-cols-1 gap-4">
        <Card className="flex flex-col col-span-2 flex-grow">
          <CardHeader className="flex">
            <CardTitle className="text-3xl">Summary</CardTitle>
            <CardDescription className="pt-3">
              The following is the summary of your driving trend{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid xl:grid-cols-3 gap-4">
            <div>
              <h1 className="text-2xl ml-[-5px]">🚘🏍️</h1>
              <h1>Total of</h1>
              <h1 className="text-3xl font-semibold">{totalVehicle}</h1>
              <p>vehicles registered</p>
            </div>
            <div>
              <h1 className="text-2xl ml-[-5px]">🛣️</h1>
              <h1>Total of</h1>
              <h1 className="text-3xl font-semibold">{sumMileage} km</h1>
              <p>mileage recorded</p>
            </div>
            <div>
              <h1 className="text-2xl ml-[-5px]">💸</h1>
              <h1>Total of</h1>
              <h1 className="text-3xl font-semibold">RM {sumCost}</h1>
              <p>transactions recorded</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
