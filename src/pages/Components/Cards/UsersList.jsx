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
import Spinner from "../../../components/spinner";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

const UsersList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const { items, loading, error } = state;
  const [isLoading, setLoading] = useState(true);
  const userData = localStorage.getItem("serviceData");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getUser = async () => {
      if (!userData) {
        await delay(1000);
      }
      try {
        await delay(1000);
        let getAllUser = await axios.get(
          "https://autominder-backend.onrender.com/admin/user/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // save response data into localStorage as userData for other local uses
        const userArray = getAllUser.data;
        const userString = JSON.stringify(userArray);
        localStorage.setItem("userData", userString);
        // parse userData from localStorage
        const readUser = JSON.parse(localStorage.getItem("userData"));
        dispatch({
          type: FETCH_ACTIONS.SUCCESS,
          data: readUser.reverse(),
        });
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  async function handleUser(event) {
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const url = "/admin/users/" + values.user_id;
    nav(url);
  }

  async function handleDelete(event) {
    // Prevent the default form submission
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.delete(
        "https://autominder-backend.onrender.com/admin/deleteUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: values,
        }
      );
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
            <TableHead>User ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Admin ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.user_id}>
              <TableCell className="font-semibold">{item.user_id}</TableCell>
              <TableCell>{item.fname}</TableCell>
              <TableCell>{item.lname}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.company_name}</TableCell>
              <TableCell>{item.admin_id}</TableCell>
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
                      <form onSubmit={handleUser}>
                        <input
                          type="text"
                          id="user_id"
                          name="user_id"
                          defaultValue={item.user_id}
                          className="hidden"
                        />
                        <Button
                          type="submit"
                          variant="text"
                          className="p-0 font-normal"
                        >
                          View User Data
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
                            Delete {item.fname}?
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

export default UsersList;
