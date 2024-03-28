import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "./Components/reducers/reducer";
import { FETCH_ACTIONS } from "../actions";
import Header from "./Components/Menus/Header";
import { Button } from "@/components/ui/button";
import VehicleList from "./Components/Cards/VehicleList";
import AddVehicleCard from "./Components/Dialog/AddVehicleCard";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Spinner from "../components/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VehicleDetailsCard from "./Components/Cards/VehicleDetailsCard";
import AddServiceCard from "./Components/Dialog/AddServiceCard";
import ServiceListSingle from "./Components/Cards/ServiceListSingle";
import Shortcuts from "./Components/Menus/Shortcuts";

function Vehicle() {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getVehicle = async () => {
      // parse vehicleData from localStorage
      const vehicleData = JSON.parse(localStorage.getItem("vehicleData"));
      let filteredVehicleData = vehicleData.filter((element) => {
        if (element.vehicle_id === id) {
          return element;
        }
      });
      dispatch({
        type: FETCH_ACTIONS.SUCCESS,
        data: filteredVehicleData,
      });
    };

    getVehicle();
  }, []);

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      navigate("/login");
    }
    // validate token by calling the private API
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8989/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // if token is invalid, redirect to login
      console.error(error);
      nav("/login");
    } finally {
      setLoading(false);
    }
  }

  // invoke checkToken by calling the function in the useEffect hook
  useEffect(() => {
    checkToken();
  }, []);

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className="h-screen flex overflow-hidden text-sm">
      <div className="w-full h-full flex flex-col">
        <Header></Header>
        <div className="flex overflow-auto">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <Shortcuts></Shortcuts>
            <VehicleList></VehicleList>
          </div>
          <div className=" flex-wrap border-r flex h-full overflow-auto p-5 w-full gap-4">
            <div className="flex flex-row justify-between">
              <div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/garage">Garage</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Vehicle</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-row flex-wrap justify-between">
                  <h1 className="text-3xl font-semibold">Vehicle Details</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap h-full w-full gap-8">
              <VehicleDetailsCard id={id}></VehicleDetailsCard>
              <div className="flex flex-col flex-grow overflow-hidden gap-4">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold">Services</h1>
                    <p>Services related to this vehicle</p>
                  </div>
                  <AddServiceCard></AddServiceCard>
                </div>

                <ServiceListSingle id={id}></ServiceListSingle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
