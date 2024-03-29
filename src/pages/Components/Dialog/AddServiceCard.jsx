import * as React from "react";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@material-tailwind/react";

const AddServiceCard = () => {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const [isLoading, setLoading] = useState(true);
  const serviceData = localStorage.getItem("serviceData");
  const nav = useNavigate();
  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      if (!serviceData) {
      }
      try {
        // parse vehicleData from localStorage
        const readVehicle = JSON.parse(localStorage.getItem("vehicleData"));
        dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readVehicle });
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  async function handleCreate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      const response = await axios.post(
        "https://autominder-backend.onrender.com/service/create",
        values
      );
      alert("Service created successfully!");
      window.location.reload();
      let getAllService = await axios.get(
        "https://autominder-backend.onrender.com/user/service/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      // api error handling
      alert("Create service failed. Something is wrong...");
      console.error(error);
    }
  }

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-row gap-2">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="hidden md:block">Add a service</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <ScrollArea className="h-[500px] pr-3">
          <form onSubmit={handleCreate} className="flex flex-col gap-8">
            <DialogHeader>
              <DialogTitle className="text-3xl">Create a Service</DialogTitle>
            </DialogHeader>
            <div className="grid w-full items-center gap-4 p-1">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="service_name"
                  name="service_name"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="vehicle_id">Which Vehicle</Label>
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
                        <SelectItem
                          value={item.vehicle_id}
                          key={item.vehicle_id}
                        >
                          {item.vname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cost">Cost (RM)</Label>
                <Input id="cost" name="cost" type="number" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Service Date</Label>
                <Input
                  id="service_date"
                  name="service_date"
                  placeholder=""
                  type="date"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Next Service Mileage (km)</Label>
                <Input
                  id="next_mileage"
                  name="next_mileage"
                  placeholder=""
                  type="number"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Next Service Date</Label>
                <Input
                  id="next_date"
                  name="next_date"
                  type="date"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Service Location </Label>{" "}
                <Input id="place" name="place" type="text" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Notes </Label>
                <Textarea id="notes" name="notes" type="text" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Progress</Label>
                <Select id="progress" name="progress">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select progress stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Completed">Not Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
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
            <DialogFooter className="flex justify-end gap-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceCard;
