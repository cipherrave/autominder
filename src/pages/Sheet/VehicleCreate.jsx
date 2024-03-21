import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const baseURL = "http://localhost:8989/user/deleteUser";

export default function VehicleCreate() {
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    nav("/");
  }

  async function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.delete(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleLogout();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
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
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Vehicle</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Card className="ove overflow-y-auto">
          <CardContent>
            <form className="flex flex-col gap-8 ">
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
        </Card>
      </SheetContent>
    </Sheet>
  );
}
