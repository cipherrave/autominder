import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "./Components/reducers/reducer";
import { FETCH_ACTIONS } from "../actions";
import Header from "./Components/Menus/Header";
import VehicleList from "./Components/Cards/VehicleList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";
import VehicleDetailsCard from "./Components/Cards/VehicleDetailsCard";
import ServiceListSingle from "./Components/Cards/ServiceListSingle";
import Shortcuts from "./Components/Menus/Shortcuts";
import ServiceList from "./Components/Cards/ServiceList";

function Vehicle() {
  const token = localStorage.getItem("token");
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
      const response = await axios.get(
        "https://autominder-backend.onrender.com/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div className=" flex justify-center align-middle h-screen w-full">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <div className="flex self-center h-screen pt-10">
          <Spinner></Spinner>
        </div>
      </div>
    </div>
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
            <div className="grid xl:grid-cols-3 w-full gap-8">
              <div className="xl:col-span-1">
                <VehicleDetailsCard id={id}></VehicleDetailsCard>
              </div>
              <div className="xl:col-span-2 overflow-auto">
                <ServiceListSingle id={id}></ServiceListSingle>
                <div className="hidden">
                  <ServiceList className="hidden"></ServiceList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
