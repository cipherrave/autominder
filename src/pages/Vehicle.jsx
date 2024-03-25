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
import VehicleDetails from "./Cards/VehicleDetails";

function Vehicle() {
  // check token is valid
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const navigate = useNavigate();
  function navAddVehicle() {
    navigate("/addVehicle");
  }

  const [isLoading, setLoading] = useState(true);

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
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  // invoke checkToken by calling the function in the useEffect hook
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getItems = async () => {
      // parse vehicleData from localStorage
      const readVehicle = JSON.parse(localStorage.getItem("vehicleData"));
      dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readVehicle });
    };
    getItems();
  }, []);

  async function handleUpdate(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      const response = await axios.put(baseURL, values);
      localStorage.removeItem("token");
      alert("Profile updated successfully! Re-login using new credentials.");
      nav("/login");
    } catch (error) {
      console.error(error);
      alert("Update failed :(");
    }
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-screen flex overflow-hidden text-sm">
      <div className="w-full h-full flex flex-col">
        <Header></Header>
        <div className="flex overflow-auto">
          <div className="min-w-[300px] p-5 overflow-y-auto hidden xl:block">
            <VehicleList></VehicleList>
          </div>
          <div className="flex flex-col flex-wrap border-r  h-full overflow-y-auto p-5 w-full gap-4">
            <div className="flex flex-col justify-between gap-4">
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
                  <h1 className="text-3xl font-semibold">Vehicle Details</h1>
                  <AddVehicleCard></AddVehicleCard>
                </div>
              </div>

              <VehicleDetails></VehicleDetails>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
