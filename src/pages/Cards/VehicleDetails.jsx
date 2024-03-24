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

export default function VehicleDetails() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      // parse vehicleData from localStorage
      const readVehicle = JSON.parse(localStorage.getItem("vehicleData"));
      dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readVehicle });
    };
    getItems();
  }, []);

  const updateURL = "localhost:8989/user/vehicle/update";
  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.post(updateURL, values);
      alert("Vehicle updated successfully!");
    } catch (error) {
      // api error handling
      alert("Vehicle not updated. Something is wrong...");
      console.error(error);
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className=" gap-4 grid sm:grid-cols-2 md:grid-cols-3 ">
          {items.map((item, i) => (
            <Card className="flex-grow flex-row w-full" key={item.vehicle_id}>
              <CardTitle className="w-full h-[200px] bg-slate-600 rounded-t-sm flex justify-end pt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="transparent" className="text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Services</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold text-red-700">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
              <CardContent className="w-full pt-8">
                <form onSubmit={handleUpdate}>
                  <CardContent>
                    <div className="w-full">
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="vname">Nickname</Label>
                          <Input
                            id="vname"
                            name="vname"
                            type="text"
                            placeholder=""
                            defaultValue={item.vname}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Mileage</Label>
                          <Input
                            id="mileage"
                            name="mileage"
                            type="number"
                            placeholder=""
                            defaultValue={item.mileage}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Registration Number</Label>
                          <Input
                            id="reg_num"
                            name="reg_num"
                            type="text"
                            placeholder=""
                            defaultValue={item.reg_num}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Brand</Label>
                          <Input
                            id="brand"
                            name="brand"
                            type="text"
                            placeholder=""
                            defaultValue={item.brand}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Model</Label>
                          <Input
                            id="model"
                            name="model"
                            type="text"
                            placeholder=""
                            defaultValue={item.model}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Purchase Year</Label>
                          <Input
                            id="purchase_year"
                            name="purchase_year"
                            type="number"
                            min="1901"
                            max="2099"
                            step="1"
                            placeholder=""
                            defaultValue={item.purchase_year}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Notes </Label>
                          <Textarea
                            id="note"
                            name="note"
                            placeholder=""
                            defaultValue={item.notes}
                          />
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
                  <CardFooter className="flex justify-end gap-4">
                    <Button type="submit">Update</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
