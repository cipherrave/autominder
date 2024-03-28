import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function MileageDialog() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const vehicleData = localStorage.getItem("vehicleData");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      if (!vehicleData) {
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

  const updateURL = "http://localhost:8989/user/vehicle/update";
  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    console.log(values);
    try {
      await axios.put(updateURL, values);
      alert("Mileage updated successfully!");
    } catch (error) {
      // api error handling
      alert("Mileage not updated. Something is wrong...");
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update Mileage</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Mileage</DialogTitle>
          <DialogDescription>
            Select a vehicle to update its mileage
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="gap-4">
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
                    <SelectItem value={item.vehicle_id} key={item.vehicle_id}>
                      {item.vname}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
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
          <div className="hidden">
            <input
              id="vname"
              name="vname"
              type="text"
              placeholder=""
              defaultValue={item.vname}
              required
            />
            <input
              id="user_id"
              name="user_id"
              type="text"
              placeholder=""
              defaultValue={user_id}
              required
            />{" "}
            <input
              id="user_id"
              name="user_id"
              type="text"
              placeholder=""
              defaultValue={user_id}
              required
            />{" "}
            <input
              id="user_id"
              name="user_id"
              type="text"
              placeholder=""
              defaultValue={user_id}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-green-600">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
