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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConvertTimeTag from "../Tags/ConvertTimeTag";

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
      window.location.reload();
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
      alert("Service deleted.");
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
                            <ConvertTimeTag>{item.service_date}</ConvertTimeTag>
                            <Input
                              id="mileage"
                              name="mileage"
                              type="date"
                              placeholder=""
                              defaultValue={item.service_date}
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
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Next Service Date</Label>
                            <ConvertTimeTag>{item.next_date}</ConvertTimeTag>
                            <Input
                              id="next_date"
                              name="next_date"
                              type="date"
                              placeholder=""
                              defaultValue={item.next_date}
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">
                              Next Service Mileage (km)
                            </Label>
                            <Input
                              id="next_mileage"
                              name="next_mileage"
                              type="number"
                              placeholder=""
                              defaultValue={item.next_mileage}
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
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Progress</Label>
                            <p>Current: {item.progress}</p>
                            <Select id="progress" name="progress">
                              <SelectTrigger>
                                <SelectValue placeholder="Select your vehicle" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem
                                  value="In Progress"
                                  key="In Progress"
                                >
                                  In Progress{" "}
                                </SelectItem>{" "}
                                <SelectItem value="Completed" key="Completed">
                                  Completed{" "}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="user_id">User ID</Label>
                            <p>{user_id}</p>
                            <br />
                            <Label htmlFor="vehicle_id">Vehicle ID</Label>
                            <p>{item.vehicle_id}</p>
                            <br />
                            <Label htmlFor="service_id">Service ID</Label>
                            <p>{item.service_id}</p>
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
                            <Label htmlFor="service_id">Service ID</Label>
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            {" "}
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
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete {item.service_name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-bold">
                              This action cannot be undone. This will
                              permanently delete this service from our servers.
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
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceDetailsCard;
