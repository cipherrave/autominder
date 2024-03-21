import { useNavigate } from "react-router-dom";

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
import { DeleteAccountDialog } from "../Dialog/DeleteAccountDialog";

const baseURL = "http://localhost:8989/login";

const SettingsCard = () => {
  const nav = useNavigate();

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());

    try {
      const response = await axios.post(baseURL, values);
      const token = response.data.token;
      // Save the token to local storage to call private APIs
      localStorage.setItem("token", token);
      nav("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-wrap gap-3 flex-shrink w-full">
      <Card className=" flex-grow">
        <CardHeader>
          <CardTitle className="text-3xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-colsm:flex-row ">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">First Name</Label>
                <Input id="fname" name="fname" type="text" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Last Name</Label>
                <Input id="lname" name="lname" type="text" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="email" name="email" placeholder="" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Change Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder=""
                  type="password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Do you own a workshop?</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" placeholder="" type="text" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="secondary">Cancel</Button>
          <Button>Update</Button>
        </CardFooter>
      </Card>
      <Card className=" flex-grow w-full">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>Click here to delete your account.</CardDescription>
          <CardDescription>
            Deletion is permanent and your data is not recoverable. Proceed with
            caution.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end gap-4">
          <DeleteAccountDialog></DeleteAccountDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsCard;
