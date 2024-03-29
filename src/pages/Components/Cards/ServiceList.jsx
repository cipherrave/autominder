import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Spinner from "../../../components/spinner";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import * as React from "react";
import { jwtDecode } from "jwt-decode";
import VehicleDetailsTag from "../Tags/VehicleDetailsTag";
import ConvertTimeTag from "../Tags/ConvertTimeTag";

const ServiceList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const { items, loading, error } = state;
  const [isLoading, setLoading] = useState(true);
  const serviceData = localStorage.getItem("serviceData");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getItems = async () => {
      if (!serviceData) {
        await delay(1000);
      }
      try {
        await delay(1000);
        let getAllService = await axios.get(
          "http://localhost:8989/user/service/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // save response data into localStorage as vehicleData for other local uses
        const serviceArray = getAllService.data;
        const serviceString = JSON.stringify(serviceArray);
        localStorage.setItem("serviceData", serviceString);
        // parse serviceData from localStorage
        const readService = JSON.parse(localStorage.getItem("serviceData"));
        dispatch({
          type: FETCH_ACTIONS.SUCCESS,
          data: readService.reverse(),
        });
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  async function handleVehicle(event) {
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const url = "/garage/vehicle/" + values.vehicle_id;
    nav(url);
  }

  async function handleService(event) {
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const url = "/services/service/" + values.service_id;
    nav(url);
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
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return isLoading ? (
    <div className=" flex justify-center align-middle h-screen w-full">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <div className="flex self-center h-screen pt-10">
          <Spinner></Spinner>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-wrap flex-grow overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Service Date</TableHead>
            <TableHead>Cost (RM)</TableHead>
            <TableHead>Next Mileage (km)</TableHead>
            <TableHead>Next Service Date</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Vehicle Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.service_id}>
              <TableCell className="font-semibold">
                {item.service_name}
              </TableCell>
              <TableCell>
                <ConvertTimeTag date={item.service_date}></ConvertTimeTag>
              </TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>{item.next_mileage}</TableCell>
              <TableCell>
                <ConvertTimeTag date={item.next_date}></ConvertTimeTag>
              </TableCell>
              <TableCell>{item.place}</TableCell>
              <TableHead>{item.progress}</TableHead>
              <TableCell>
                <VehicleDetailsTag id={item.vehicle_id}></VehicleDetailsTag>
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="text" size="icon">
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
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <form onSubmit={handleVehicle}>
                        <input
                          type="text"
                          id="vehicle_id"
                          name="vehicle_id"
                          defaultValue={item.vehicle_id}
                          className="hidden"
                        />
                        <Button
                          type="submit"
                          variant="text"
                          className="p-0 font-normal"
                        >
                          View Vehicle
                        </Button>
                      </form>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <form onSubmit={handleService}>
                        <input
                          type="text"
                          id="service_id"
                          name="service_id"
                          defaultValue={item.service_id}
                          className="hidden"
                        />
                        <Button
                          type="submit"
                          variant="text"
                          className="p-0 font-normal"
                        >
                          View Service
                        </Button>
                      </form>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="text"
                          className="font-normal bg-red-500 text-white w-full flex justify-start p-2"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete {item.service_name}?
                          </AlertDialogTitle>
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
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceList;
