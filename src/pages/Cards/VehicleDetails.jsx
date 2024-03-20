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

const VehicleDetails = () => {
  return (
    <div className="flex flex-wrap gap-3 flex-shrink w-full">
      <Card className=" flex-grow w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Vehicle Name</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
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
                  <Label htmlFor="name">Nickname</Label>
                  <Input id="name" type="text" placeholder="" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Mileage</Label>
                  <Input id="name" type="number" placeholder="" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Registration Number</Label>
                  <Input id="name" placeholder="" type="text" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Brand</Label>
                  <Input id="name" placeholder="" type="text" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Model</Label>
                  <Input id="name" placeholder="" type="text" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" type="number">
                    Purchase Year
                  </Label>
                  <Input id="name" placeholder="" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" type="number">
                    Notes{" "}
                  </Label>
                  <Textarea id="name" placeholder="" />
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
          <Button variant="outline">Cancel</Button>
          <Button>Update</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VehicleDetails;
