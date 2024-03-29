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
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
import AddServiceCard from "../Dialog/AddServiceCard";

export default function ServiceListSingle(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const { items, loading, error } = state;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getService = async () => {
      delay(2000);
      // parse vehicleData from localStorage
      const serviceData = JSON.parse(localStorage.getItem("serviceData"));
      let filteredServiceData = serviceData.filter((element) => {
        if (element.vehicle_id === props.id) {
          return element;
        }
      });
      dispatch({
        type: FETCH_ACTIONS.SUCCESS,
        data: filteredServiceData,
      });
    };

    getService();
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
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold">Services</h1>
              <p>Services related to this user</p>
            </div>
            <AddServiceCard></AddServiceCard>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Cost (RM)</TableHead>
                <TableHead>Next Mileage</TableHead>
                <TableHead>Next Service Date</TableHead>
                <TableHead>Place</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.service_id}>
                  <TableCell className="font-semibold">
                    {item.service_name}
                  </TableCell>
                  <TableCell>{item.service_date}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.next_date}</TableCell>
                  <TableCell>{item.next_mileage}</TableCell>
                  <TableCell>{item.place}</TableCell>
                  <TableHead>{item.progress}</TableHead>
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
                                This action cannot be undone. This will
                                permanently delete this vehicle from our
                                servers.
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
      )}
    </div>
  );
}
