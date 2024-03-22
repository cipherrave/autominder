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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = "http://localhost:8989/vehicle/create";

const AddVehicleCard = () => {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;

  const nav = useNavigate();
  function navGarage() {
    nav("/garage");
  }

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.post(baseURL, values);
      alert("Vehicle added successfully!");
      nav("/dashboard");
    } catch (error) {
      // api error handling
      alert("Vehicle not added. Something is wrong...");
      console.error(error);
    }
  }

  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle className="text-3xl">Add a Vehicle</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <CardContent className="w-full">
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
          <Button variant="outline" onClick={navGarage}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddVehicleCard;
