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

export default function SummaryDash() {
  const nav = useNavigate();
  function navService() {
    nav("/service");
  }
  function navAddVehicle() {
    nav("/addVehicle");
  }

  function navAddService() {
    nav("/addService");
  }

  return (
    <div className="flex flex-wrap gap-3 flex-shrink w-full">
      <Card className="flex-grow sm:max-h-[400px] h-auto">
        <CardHeader>
          <CardTitle className="text-5xl">Summary</CardTitle>
          <CardDescription className="pt-3">
            The following are the summary of your driving trend{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="md:flex-row sm:flex justify-evenly sm:justify-center gap-5 text-center w-full">
          <div className="w-full sm:w-1/3 h-32">
            <h1 className="text-2xl ml-[-5px]">🚘🏍️</h1>
            <h1>You own</h1>
            <h1 className="text-3xl font-semibold">3</h1>
            <p>vehicles</p>
          </div>
          <div className="w-full sm:w-1/3  h-32">
            <h1 className="text-2xl ml-[-5px]">🛣️</h1>
            <h1>You drove</h1>
            <h1 className="text-3xl font-semibold">500,000 km</h1>
            <p>in total</p>
          </div>
          <div className="w-full sm:w-1/3  h-32">
            <h1 className="text-2xl ml-[-5px]">💸</h1>
            <h1>You spent</h1>
            <h1 className="text-3xl font-semibold">RM 3000</h1>
            <p>on services</p>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card className=" flex-grow w-[400px] h-fit">
        <CardHeader>
          <CardTitle>Shortcut</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-4">
          <Button className="h-[100px] w-1/2" onClick={navAddVehicle}>
            Add Vehicle
          </Button>
          <Button className="h-[100px] w-1/2" onClick={navAddService}>
            Record a Service
          </Button>
        </CardContent>
      </Card>
      <Card className=" flex-grow overflow-auto">
        <CardHeader>
          <CardTitle className="text-5xl">Services</CardTitle>
          <CardDescription>Quick look at your recent services </CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceList></ServiceList>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={navService}>Go To Service</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
