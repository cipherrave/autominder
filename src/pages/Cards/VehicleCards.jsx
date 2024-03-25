import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VehicleDetails from "./VehicleDetails";
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
import AddVehicleCard from "../Dialog/AddVehicleCard";

export default function VehicleCards() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  let fname = jwtDecode(token).fname;

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      // parse vehicleData from localStorage
      const readVehicle = JSON.parse(localStorage.getItem("vehicleData"));
      dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readVehicle });
    };
    getItems();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="gap-4 flex flex-col">
          <div>
            <div className="flex flex-col justify-between w-full">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Garage</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-semibold">{fname}'s Garage</h1>
                <AddVehicleCard></AddVehicleCard>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card
                className="flex flex-grow flex-col w-full"
                key={item.vehicle_id}
              >
                <CardTitle className="w-full h-[200px] bg-slate-600 rounded-t-xl flex justify-end pt-4"></CardTitle>
                <CardContent className="w-full pt-8 px-0">
                  <CardContent>
                    <div className="w-full">
                      <div className="flex flex-col w-full items-start gap-4 flex-wrap">
                        <div className="grid col-span-2 space-y-1.5">
                          <Label htmlFor="vname">Nickname</Label>
                          <p>{item.vname}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Mileage</Label>
                          <p>{item.mileage}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Registration Number</Label>
                          <p>{item.reg_num}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Brand</Label>
                          <p>{item.brand}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Model</Label>
                          <p>{item.model}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Purchase Year</Label>
                          <p>{item.purchase_year}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Notes</Label>
                          <p>{item.notes}</p>
                        </div>
                        <div className="hidden">
                          <Label htmlFor="user_id">User ID</Label>
                          <Input
                            id="user_id"
                            name="user_id"
                            type="text"
                            placeholder=""
                            defaultValue={user_id}
                            required
                          />
                          <Label htmlFor="vehicle_id">Vehicle ID</Label>
                          <Input
                            id="vehicle_id"
                            name="vehicle_id"
                            type="text"
                            placeholder=""
                            defaultValue={item.vehicle_id}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pb-0">
                    <Button>View Vehicle</Button>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
