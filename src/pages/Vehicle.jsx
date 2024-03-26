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
import AddVehicleCard from "./Dialog/AddVehicleCard";
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

function Vehicle() {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const navigate = useNavigate();
  function navAddVehicle() {
    navigate("/addVehicle");
  }

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      // parse vehicleData from localStorage
      const vehicleData = JSON.parse(localStorage.getItem("vehicleData"));
      let filteredVehicleData = vehicleData.filter((element) => {
        if (element.vehicle_id === id) {
          return element;
        }
      });

      dispatch({ type: FETCH_ACTIONS.SUCCESS, data: filteredVehicleData });
    };
    getItems();
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
      await axios.put("http://localhost:8989/user/vehicle/update", values);
      alert("Vehicle updated successfully!");
    } catch (error) {
      // api error handling
      alert("Vehicle not updated. Something is wrong...");
      console.error(error);
    }
  }

  return isLoading ? (
    <Spinner></Spinner>
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
            <div className="min-w-[300px] p-5 overflow-y-auto hidden xl:block">
              <Shortcuts></Shortcuts>
              <VehicleList></VehicleList>
            </div>
            <div className="flex flex-col flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-4">
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
                        <BreadcrumbLink href="/garage">Garage</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Vehicle</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-semibold">
                      Vehicle Details {id}
                    </h1>
                    <AddVehicleCard></AddVehicleCard>
                  </div>
                </div>

                <Card className="flex flex-grow flex-col xl:flex-row w-full">
                  <CardTitle className="w-full h-[200px] bg-slate-600 rounded-xl flex justify-end pt-4"></CardTitle>
                  <CardContent className="w-full pt-8 px-0">
                    {items.map((item) => (
                      <form onSubmit={handleUpdate} key={item.vehicle_id}>
                        <CardContent>
                          <div className="w-full">
                            <div className="grid w-full items-center gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="vname">Nickname</Label>
                                <Input
                                  id="vname"
                                  name="vname"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.vname}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Mileage</Label>
                                <Input
                                  id="mileage"
                                  name="mileage"
                                  type="number"
                                  placeholder=""
                                  defaultValue={item.mileage}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">
                                  Registration Number
                                </Label>
                                <Input
                                  id="reg_num"
                                  name="reg_num"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.reg_num}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Brand</Label>
                                <Input
                                  id="brand"
                                  name="brand"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.brand}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Model</Label>
                                <Input
                                  id="model"
                                  name="model"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.model}
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Purchase Year</Label>
                                <Input
                                  id="purchase_year"
                                  name="purchase_year"
                                  type="number"
                                  min="1901"
                                  max="2099"
                                  step="1"
                                  placeholder=""
                                  defaultValue={item.purchase_year}
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
                                <Label htmlFor="user_id">User ID</Label>
                                <Input
                                  id="user_id"
                                  name="user_id"
                                  type="text"
                                  placeholder=""
                                  defaultValue={user_id}
                                  required
                                />
                                <Label htmlFor="vehicle_id">Vehicle ID</Label>
                                <Input
                                  id="vehicle_id"
                                  name="vehicle_id"
                                  type="text"
                                  placeholder=""
                                  defaultValue={item.vehicle_id}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                          <Button
                            type="submit"
                            onClick={() => window.location.reload(false)}
                          >
                            Update
                          </Button>
                        </CardFooter>
                      </form>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicle;
