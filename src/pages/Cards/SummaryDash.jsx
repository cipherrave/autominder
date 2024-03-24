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
import AddServiceCard from "./AddServiceCard";
import AddVehicleCard from "./AddVehicleCard";

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

  function navGarage() {
    nav("/garage");
  }

  return (
    <div className="flex flex-wrap gap-4 flex-shrink w-full">
      <Card className="flex-grow h-fit">
        <CardHeader>
          <CardTitle className="text-3xl">Summary</CardTitle>
          <CardDescription className="pt-3">
            The following are the summary of your driving trend{" "}
          </CardDescription>
        </CardHeader>
        <br />
        <CardContent className="md:flex-row sm:flex justify-evenly sm:justify-center gap-4 text-center w-full pb-12 ">
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
          <br></br>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col gap-1">
            <MileageDialog></MileageDialog>
            <div className="flex flex-row gap-2">
              <AddVehicleCard></AddVehicleCard>
              <AddServiceCard></AddServiceCard>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card className=" flex-grow overflow-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Services</CardTitle>
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
