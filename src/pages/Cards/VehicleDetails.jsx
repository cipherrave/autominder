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
import { useNavigate } from "react-router-dom";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function VehicleDetails() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const nav = useNavigate();

  function navAddVehicle() {
    nav("/addVehicle");
  }

  const getURL = "http://localhost:8989/user/vehicle/all";

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      try {
        let response = await axios.get(getURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          dispatch({ type: FETCH_ACTIONS.SUCCESS, data: response.data });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      }
    };
    getItems();
  }, []);

  function handleSearch(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const vehicle_id = values.vehicle_id;
    try {
      const vehicleIdURL =
        "http://localhost:8989/user/vehicle/id/" + vehicle_id;

      const response = axios.get(vehicleIdURL);
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("Search failed :(");
    }
  }

  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.post(baseURL, values);
      alert("Vehicle updated successfully!");
    } catch (error) {
      // api error handling
      alert("Vehicle not updated. Something is wrong...");
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Card className="flex flex-col h-fit">
        <form onSubmit={handleSearch}>
          <CardHeader>
            <CardTitle className="text-3xl flex ">Search</CardTitle>
            <CardDescription>
              Select a vehicle to view their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select id="vehicle_id" name="vehicle_id">
              <SelectTrigger>
                <SelectValue placeholder="Select your vehicle" />
              </SelectTrigger>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <SelectContent position="popper">
                  {items.map((item) => (
                    <SelectItem key={item.vehicle_id} value={item.vehicle_id}>
                      {item.vname}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Search
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="flex-grow flex-row">
        <CardContent className="w-full pt-8">
          <form onSubmit={handleUpdate} className="flex flex-col gap-8">
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
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Registration Number</Label>
                    <Input
                      id="reg_num"
                      name="reg_num"
                      placeholder=""
                      type="text"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Brand</Label>
                    <Input
                      id="brand"
                      name="brand"
                      placeholder=""
                      type="text"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder=""
                      type="text"
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
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Notes </Label>
                    <Textarea id="note" name="note" placeholder="" />
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
    </div>
  );
}
