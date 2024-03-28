import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
import Spinner from "../../../components/spinner";
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

function ServiceDetailsCard(props) {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getService = async () => {
      // parse vehicleData from localStorage
      const serviceData = JSON.parse(localStorage.getItem("serviceData"));
      let filteredServiceData = serviceData.filter((element) => {
        if (element.service_id === props.id) {
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

  async function handleUpdate(event) {
    // Prevent the default form submission
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.put("http://localhost:8989/user/service/update", values);
      nav("/services");
    } catch (error) {
      // api error handling
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
      nav("/services");
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
        <div className="flex overflow-auto">
          {items.map((item) => (
            <div key={item.service_id} className="flex flex-col w-full gap-4">
              <Card className="flex flex-grow flex-col xl:flex-row w-full">
                <CardContent className="w-full pt-8 px-0">
                  <form onSubmit={handleUpdate}>
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
                            <Label htmlFor="name">Service Date</Label>
                            <Input
                              id="mileage"
                              name="mileage"
                              type="date"
                              placeholder=""
                              defaultValue={item.service_date}
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Cost</Label>
                            <Input
                              id="reg_num"
                              name="cost"
                              type="number"
                              placeholder=""
                              defaultValue={item.cost}
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Place</Label>
                            <Input
                              id="place"
                              name="place"
                              type="text"
                              placeholder=""
                              defaultValue={item.place}
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
                            <Label htmlFor="name">Next Service Mileage</Label>
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
                            <Label htmlFor="name">Notes</Label>
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
                      <Button type="submit">Update</Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete {item.service_name}?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-bold">
                      This action cannot be undone. This will permanently delete
                      this service from our servers.
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
                        id="vehicle_id"
                        name="vehicle_id"
                        defaultValue={item.vehicle_id}
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
      )}
    </div>
  );
}

export default ServiceDetailsCard;
