import * as React from "react";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
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
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const baseURL = "http://localhost:8989/service/create";

const AddServiceCard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [isLoading, setIsLoading] = useState(false);
  const { items, loading, error } = state;

  const nav = useNavigate();
  function navService() {
    nav("/service");
  }

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      const response = await axios.post(baseURL, values);
      alert("Service created successfully!");
      nav("/dashboard");
    } catch (error) {
      // api error handling
      alert("Create service failed. Something is wrong...");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getItems = async () => {
      try {
        let response = await axios.get(
          "http://localhost:8989/user/vehicle/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Card className="flex-grow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <CardHeader>
          <CardTitle className="text-3xl">Create a Service</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
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
                      <SelectItem key={item.vehicle_id} value={item.vehicle_id}>
                        {item.vname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cost">Cost (RM)</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                placeholder=""
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Service Date</Label>
              <Input
                id="service_date"
                name="service_date"
                placeholder=""
                type="date"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Next Service Mileage</Label>
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
              <Label htmlFor="name">Place </Label>{" "}
              <Input id="place" name="place" type="text" placeholder="" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Notes </Label>
              <Textarea id="notes" name="notes" type="text" placeholder="" />
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
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={navService}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddServiceCard;
