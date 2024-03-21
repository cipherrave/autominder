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

const AddServiceCard = () => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle className="text-3xl">Create a Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-8">
          <div className="w-full">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Service Name</Label>
                <Input id="name" type="text" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Which Vehicle</Label>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Cost</Label>
                <Input id="name" type="number" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Service Date</Label>
                <Input id="name" placeholder="" type="text" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Next Service Mileage</Label>
                <Input id="name" placeholder="" type="text" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Next Service Date</Label>
                <Input id="name" placeholder="" type="text" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" type="number">
                  Place{" "}
                </Label>{" "}
                <Input id="name" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" type="number">
                  Notes{" "}
                </Label>
                <Textarea id="name" placeholder="" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  );
};

export default AddServiceCard;
