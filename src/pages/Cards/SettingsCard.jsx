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

const VehicleDetails = () => {
  return (
    <div className="flex flex-wrap gap-3 flex-shrink w-full">
      <Card className=" flex-grow w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-8 sm:flex-row ">
            <div className="w-full sm:w-1/4">
              <div className="grid w-full items-sel gap-4">
                <img
                  src=""
                  className="w-full h-[200px] mr-2 rounded-md bg-slate-950"
                  alt="profile"
                />{" "}
                <Input type="file"></Input>
              </div>
            </div>
            <div className="w-full sm:w-3/4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">First Name</Label>
                  <Input id="name" type="text" placeholder="" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Last Name</Label>
                  <Input id="name" type="text" placeholder="" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input id="name" placeholder="" type="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Change Password</Label>
                  <Input id="name" placeholder="" type="password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" placeholder="" type="text" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

export default VehicleDetails;
