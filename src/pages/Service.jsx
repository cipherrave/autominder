import Header from "./Menus/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../actions";
import { Button } from "@/components/ui/button";
import VehicleList from "./Cards/VehicleList";
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
import Shortcuts from "./Menus/Shortcuts";
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
import AddServiceCard from "./Dialog/AddServiceCard";

function Service() {
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
    <div className=" flex justify-center align-middle h-screen w-full">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <Header></Header>
        <div className="flex self-center h-screen pt-10">
          <Spinner></Spinner>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex overflow-hidden text-sm">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="w-full h-full flex flex-col">
          <Header></Header>
          <div className="flex overflow-auto">
            <div className="min-w-[300px] p-5 overflow-y-auto hidden md:block">
              <Shortcuts></Shortcuts>
              <VehicleList></VehicleList>
            </div>
            {items.map((item) => (
              <div
                className="flex flex-col flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-4"
                key={item.vehicle_id}
              >
                <div className="flex flex-col gap-4">
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
                          <BreadcrumbLink href="/services">
                            Services
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Service</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-row justify-between">
                      <h1 className="text-3xl font-semibold">
                        Service Details
                      </h1>
                      <AddServiceCard></AddServiceCard>
                    </div>
                  </div>
                  <Card className="flex flex-grow flex-col xl:flex-row w-full">
                    <CardContent className="w-full pt-8 px-0">
                      <form onSubmit={handleUpdate} key={item.vehicle_id}>
                        <CardContent>
                          <div className="w-full">
                            <div className="grid w-full items-center gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="vname">Service Name</Label>
                                <Input
                                  id="service_name"
                                  name="service_name"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.service_name}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Vehicle ID</Label>
                                <Input
                                  id="vehicle_id"
                                  name="vehicle_id"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.vehicle_id}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Service Date </Label>
                                <Input
                                  id="service_date"
                                  name="service_date"
                                  type="date"
                                  placeholder=""
                                  defaultValue={item.service_date}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Cost</Label>
                                <Input
                                  id="cost"
                                  name="cost"
                                  type="number"
                                  placeholder=""
                                  defaultValue={item.cost}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Next Service Date</Label>
                                <Input
                                  id="next_date"
                                  name="next_date"
                                  type="date"
                                  placeholder=""
                                  defaultValue={item.next_date}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Next Mileage</Label>
                                <Input
                                  id="next_mileage"
                                  name="next_mileage"
                                  type="number"
                                  placeholder=""
                                  defaultValue={item.next_mileage}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Notes </Label>
                                <Textarea
                                  id="note"
                                  name="note"
                                  placeholder=""
                                  defaultValue={item.notes}
                                />
                              </div>
                              <div className="hidden">
                                <Input
                                  id="user_id"
                                  name="user_id"
                                  type="text"
                                  placeholder=""
                                  defaultValue={user_id}
                                  required
                                />
                                <Input
                                  id="vehicle_id"
                                  name="vehicle_id"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.vehicle_id}
                                  required
                                />
                                <Input
                                  id="service_id"
                                  name="service_id"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.service_id}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                          <Button type="submit">Update</Button>
                        </CardFooter>
                      </form>
                    </CardContent>
                  </Card>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete {item.vname}?</AlertDialogTitle>
                      <AlertDialogDescription className="font-bold">
                        This action cannot be undone. This will permanently
                        delete this vehicle from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form onSubmit={handleDelete}>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <input
                          type="text"
                          id="user_id"
                          name="user_id"
                          defaultValue={user_id}
                          className="hidden"
                        />
                        <input
                          type="text"
                          id="service_id"
                          name="service_id"
                          defaultValue={item.service_id}
                          className="hidden"
                        />
                        <Button variant="destructive" type="submit">
                          Yes, I am really sure
                        </Button>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
