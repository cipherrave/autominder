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
import { useNavigate } from "react-router-dom";

export default function ServiceDetails() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      // parse serviceData from localStorage
      const readService = JSON.parse(localStorage.getItem("serviceData"));
      const readOneService = readService.length;
      console.log(readService);
      console.log(readOneService);
      dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readService.reverse() });
    };
    getItems();
  }, []);

  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.put("http://localhost:8989/user/service/update", values);
      alert("Service updated successfully!");
      nav("/services");
      let getAllService = await axios.get(
        "http://localhost:8989/user/service/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // save response data into localStorage as serviceData for other local uses
      const serviceArray = getAllService.data;
      const serviceString = JSON.stringify(serviceArray);
      localStorage.setItem("serviceData", serviceString);
    } catch (error) {
      // api error handling
      alert("Service not updated. Something is wrong...");
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
        <div className="gap-4 grid">
          {items.map((item) => (
            <Card
              className="flex flex-grow flex-col xl:flex-row w-full"
              key={item.service_id}
            >
              <CardContent className="w-full pt-8 px-0">
                <form onSubmit={handleUpdate}>
                  <CardContent>
                    <div className="w-full">
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="service_name">Service Name</Label>
                          <Input
                            id="service_name"
                            name="service_name"
                            type="text"
                            placeholder=""
                            defaultValue={item.service_name}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Vehicle</Label>
                          <Input
                            id="vehicle_id"
                            name="vehicle_id"
                            type="text"
                            placeholder=""
                            defaultValue={item.vehicle_id}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Cost (RM)</Label>
                          <Input
                            id="cost"
                            name="cost"
                            type="number"
                            placeholder=""
                            defaultValue={item.cost}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Service Date</Label>
                          <Input
                            id="service_date"
                            name="service_date"
                            type="date"
                            placeholder=""
                            defaultValue={item.service_date}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Next Service Mileage</Label>
                          <Input
                            id="next_mileage"
                            name="next_mileage"
                            type="number"
                            placeholder=""
                            defaultValue={item.next_mileage}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Next Service Date</Label>
                          <Input
                            id="service_date"
                            name="service_date"
                            type="date"
                            placeholder=""
                            defaultValue={item.next}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Service Location</Label>
                          <Input
                            id="place"
                            name="place"
                            type="text"
                            placeholder=""
                            defaultValue={item.place}
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
                          <Label htmlFor="name">Vehicle ID</Label>
                          <Input
                            id="vehicle_id"
                            name="vehicle_id"
                            type="text"
                            placeholder=""
                            defaultValue={item.vehicle_id}
                            required
                          />
                          <Label htmlFor="service_id">Service ID</Label>
                          <Input
                            id="service_id"
                            name="service_id"
                            type="text"
                            placeholder=""
                            defaultValue={item.service_id}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-4">
                    <Button type="submit">Update</Button>
                    <Button type="submit" variant="destructive">
                      Delete
                    </Button>
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
