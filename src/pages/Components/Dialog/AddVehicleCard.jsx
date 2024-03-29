import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddVehicleCard = () => {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;

  const nav = useNavigate();

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.post(
        "https://autominder-backend.onrender.com/vehicle/create",
        values
      );
      let getAllVehicle = await axios.get(
        "https://autominder-backend.onrender.com/user/vehicle/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // save response data into localStorage as vehicleData for other local uses
      const vehicleArray = getAllVehicle.data;
      const vehicleString = JSON.stringify(vehicleArray);
      localStorage.setItem("vehicleData", vehicleString);
      window.location.reload();
    } catch (error) {
      // api error handling
      alert("Vehicle not added. Something is wrong...");
      console.error(error);
    }
  }

  return (
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
          <p className="hidden md:block">Add a vehicle</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <ScrollArea className="h-[500px] pr-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <DialogHeader>
              <DialogTitle className="text-3xl">Add a Vehicle</DialogTitle>
            </DialogHeader>
            <div className="grid w-full items-center gap-4 p-1">
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
            <br></br>
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

export default AddVehicleCard;
