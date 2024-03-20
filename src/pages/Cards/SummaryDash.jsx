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

export default function SummaryDash() {
  return (
    <div className="flex flex-wrap gap-3 flex-shrink w-full">
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle className="text-5xl">Summary</CardTitle>
          <CardDescription className="pt-3">
            The following are the summary of your driving trend{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="md:flex-row sm:flex justify-evenly sm:justify-center gap-5 text-center w-full">
          <div className="w-1/3">
            <h1 className="text-2xl ml-[-5px]">🚘🏍️</h1>
            <h1>You own</h1>
            <h1 className="text-3xl font-semibold">3</h1>
            <p>vehicles</p>
          </div>
          <div className="w-1/3">
            <h1 className="text-2xl ml-[-5px]">🛣️</h1>
            <h1>You drove</h1>
            <h1 className="text-3xl font-semibold">500,000 km</h1>
            <p>in total</p>
          </div>
          <div className="w-1/3">
            <h1 className="text-2xl ml-[-5px]">💸</h1>
            <h1>You spent</h1>
            <h1 className="text-3xl font-semibold">RM 3000</h1>
            <p>on services</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <Card className=" flex-grow w-[400px] pt-6 pb-5 ">
        <CardContent className="h-full w-full flex flex-wrap gap-5 justify-evenly">
          <Button className="w-full h-1/2">+ New Vehicle</Button>
          <Button className="w-full h-1/2">+ New Service</Button>
        </CardContent>
      </Card>
      <Card className=" flex-grow w-[400px]">
        <CardHeader>
          <CardTitle>Attention</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
