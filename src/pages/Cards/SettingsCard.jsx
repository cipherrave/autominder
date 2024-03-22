import { useNavigate } from "react-router-dom";
import * as React from "react";
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
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const baseURL = "http://localhost:8989/user/updateUser";

const SettingsCard = () => {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const fname = jwtDecode(token).fname;
  const lname = jwtDecode(token).lname;
  const email = jwtDecode(token).email;
  const company_name = jwtDecode(token).company_name;
  const nav = useNavigate();

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      const response = await axios.put(baseURL, values);
      localStorage.removeItem("token");
      alert("Profile updated successfully! Re-login using new credentials.");
      nav("/login");
    } catch (error) {
      console.error(error);
      alert("Update failed :(");
    }
  }
  return (
    <div className="flex flex-wrap gap-3 flex-shrink w-full">
      <Card className=" flex-grow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <CardHeader>
            <CardTitle className="text-3xl">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="fname"
                  name="fname"
                  type="text"
                  defaultValue={fname}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lname"
                  name="lname"
                  type="text"
                  defaultValue={lname}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={email}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Change Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Do you own a workshop?</Label>
                <Select id="company" name="company">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  type="text"
                  defaultValue={company_name}
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
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="submit" className="bg-green-600">
              Update
            </Button>
          </CardFooter>
        </form>
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
