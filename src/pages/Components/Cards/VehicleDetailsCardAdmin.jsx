import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
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

function VehicleDetailsCardAdmin(props) {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getVehicle = async () => {
      // parse vehicleData from localStorage
      const vehicleData = JSON.parse(localStorage.getItem("vehicleData"));
      let filteredVehicleData = vehicleData.filter((element) => {
        if (element.vehicle_id === props.id) {
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

  async function handleUpdate(event) {
    // Prevent the default form submission
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.put("http://localhost:8989/admin/vehicle/update", values);
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
      await axios.delete("http://localhost:8989/admin/vehicle/delete", {
        data: values,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full ">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.vehicle_id}>
              <Card className="flex flex-grow flex-col">
                <CardTitle className="h-[200px] rounded-xl flex justify-end p-4">
                  <form
                    action="/user/photo"
                    encType="multipart/form-data"
                    method="POST"
                  >
                    <div className="form-group">
                      {" "}
                      <input
                        type="file"
                        className="form-control-file"
                        name={item.vname}
                      />
                      <input type="submit" value="Upload Photo" />
                    </div>
                  </form>
                </CardTitle>
                <CardContent className="w-full pt-8 px-0">
                  <form onSubmit={handleUpdate}>
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
                            <Label htmlFor="name">Registration Number</Label>
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
                              defaultValue={item.user_id}
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
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
                              Delete {item.vname}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-bold">
                              This action cannot be undone. This will
                              permanently delete this vehicle from our servers.
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

export default VehicleDetailsCardAdmin;
