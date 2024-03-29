import Header from "./Components/Menus/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "./Components/reducers/reducer";
import { FETCH_ACTIONS } from "../actions";
import { Button } from "@/components/ui/button";
import VehicleList from "./Components/Cards/VehicleList";
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
import ShortcutsAdmin from "./Components/Menus/ShortcutsAdmin";
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
import AddServiceCard from "./Components/Dialog/AddServiceCard";
import ServiceDetailsCard from "./Components/Cards/ServiceDetailsCard";

function ServiceAdmin() {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const nav = useNavigate();
  function navAddVehicle() {
    nav("/addVehicle");
  }

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      // parse vehicleData from localStorage
      const serviceData = JSON.parse(localStorage.getItem("serviceData"));
      let filteredServiceData = serviceData.filter((element) => {
        if (element.service_id === id) {
          return element;
        }
      });

      dispatch({ type: FETCH_ACTIONS.SUCCESS, data: filteredServiceData });
    };
    getItems();
  }, []);

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      nav("/login");
    }
    // validate token by calling the private API
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8989/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      delay(1000);
    } catch (error) {
      // if token is invalid, redirect to login
      console.error(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  // invoke checkToken by calling the function in the useEffect hook
  useEffect(() => {
    checkToken();
  }, []);

  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.put("http://localhost:8989/user/service/update", values);
      alert("Service updated successfully!");
      nav("/services");
    } catch (error) {
      // api error handling
      alert("Service not updated. Something is wrong...");
      console.error(error);
    }
  }

  async function handleDelete(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.delete("http://localhost:8989/user/service/delete", {
        data: values,
      });
      alert("Service deleted.");
      nav("/services");
    } catch (error) {
      console.error(error);
    }
  }

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className="h-screen flex overflow-hidden text-sm">
      <div className="w-full h-full flex flex-col">
        <Header></Header>
        <div className="flex overflow-auto">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
            <ShortcutsAdmin></ShortcutsAdmin>
          </div>
          <div className="flex flex-col flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/services">Services</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Service</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-row justify-between">
                  <h1 className="text-3xl font-semibold">Service Details</h1>
                </div>
              </div>
              <ServiceDetailsCard id={id}></ServiceDetailsCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceAdmin;
