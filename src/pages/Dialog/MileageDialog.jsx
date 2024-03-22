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
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const baseURL = "http://localhost:8989/vehicle/create";

export default function MileageDialog() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [isLoading, setIsLoading] = useState(false);
  const { items, loading, error } = state;

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      const response = await axios.post(baseURL, values);
      alert("Vehicle added successfully!");
      nav("/dashboard");
    } catch (error) {
      // api error handling
      alert("Vehicle not added. Something is wrong...");
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Update Mileage</Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Mileage</DialogTitle>
            <DialogDescription>
              Select a registration number to update its mileage
            </DialogDescription>
          </DialogHeader>
          <div className="items-center gap-4">
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
                    <SelectItem value={item.vehicle_id}>
                      {item.vname}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="mileage" className="text-right">
              Mileage
            </Label>
            <Input
              id="mileage"
              name="mileage"
              type="number"
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
