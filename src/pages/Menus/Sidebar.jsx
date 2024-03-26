import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddVehicleCard from "../Dialog/AddVehicleCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import VehicleList from "../Cards/VehicleList";
import Shortcuts from "./Shortcuts";

export default function Sidebar() {
  const nav = useNavigate();
  function navDash() {
    nav("/dashboard");
  }
  function navGarage() {
    nav("/garage");
  }
  function navService() {
    nav("/service");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="text" size="icon" className=" flex md:hidden">
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="pt-12 w-11/12 max-w-[350px] flex flex-col justify-end gap-0"
        side="left"
      >
        <Shortcuts></Shortcuts>
        <ScrollArea className="h-[800px] pr-4">
          <VehicleList></VehicleList>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
