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
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
import axios from "axios";
import { Button } from "@/components/ui/button";

import Spinner from "../../components/spinner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as React from "react";
import ServiceTable from "../../components/ui/TanStackTableJS/ServiceTable";

const ServiceList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const { items, loading, error } = state;
  const [isLoading, setLoading] = useState(true);
  const serviceData = localStorage.getItem("serviceData");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getItems = async () => {
      if (!serviceData) {
        await delay(2000);
      }
      try {
        // parse serviceData from localStorage
        const readService = JSON.parse(localStorage.getItem("serviceData"));
        dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readService });
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  async function deleteService(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.delete(deleteURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleLogout();
    } catch (error) {
      console.error(error);
    }
  }

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className="flex flex-wrap flex-grow overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Service Date</TableHead>
            <TableHead>Next Mileage</TableHead>
            <TableHead>Next Service Date</TableHead>
            <TableHead>Cost (RM)</TableHead>
            <TableHead>Vehicle ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.service_id}>
              <TableCell className="font-semibold">
                {item.service_name}
              </TableCell>
              <TableCell>{item.service_date}</TableCell>
              <TableCell>{item.next_mileage}</TableCell>
              <TableCell>{item.next_date}</TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>{item.vehicle_id}</TableCell>
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
                    <DropdownMenuItem>View Service</DropdownMenuItem>
                    <DropdownMenuItem>View Vehicle</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold text-red-700">
                      Delete
                    </DropdownMenuItem>
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
