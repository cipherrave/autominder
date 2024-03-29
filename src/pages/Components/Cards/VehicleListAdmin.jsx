import { useReducer, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
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

const VehicleListAdmin = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const { items, loading, error } = state;
  const [isLoading, setLoading] = useState(true);
  const vehicleData = localStorage.getItem("vehicleData");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const nav = useNavigate();

  async function handleVehicle(event) {
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const url = "/garage/vehicle/" + values.vehicle_id;
    nav(url);
  }

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getVehicle = async () => {
      if (!vehicleData) {
      }
      try {
        await delay(1000);
        let getAllVehicle = await axios.get(
          "http://localhost:8989/admin/vehicle/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // save response data into localStorage as vehicleData for other local uses
        const vehicleArray = getAllVehicle.data;
        const vehicleString = JSON.stringify(vehicleArray);
        localStorage.setItem("vehicleData", vehicleString);
        // parse vehicleData from localStorage
        const readVehicle = JSON.parse(localStorage.getItem("vehicleData"));
        dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readVehicle.reverse() });
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      } finally {
        setLoading(false);
      }
    };

    getVehicle();
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
    <div className="flex flex-wrap flex-grow overflow-auto">
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
            <TableHead>Vehicle Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.vehicle_id}>
              <TableCell className="font-semibold">{item.vname}</TableCell>
              <TableCell>{item.service_date}</TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>{item.next_date}</TableCell>
              <TableCell>{item.next_mileage}</TableCell>
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
                              defaultValue={item.user_id}
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

export default VehicleListAdmin;
