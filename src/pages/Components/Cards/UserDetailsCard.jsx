import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

function UserDetailsCard(props) {
  const token = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getUser = async () => {
      // parse vehicleData from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      let filteredUserData = userData.filter((element) => {
        if (element.user_id === props.id) {
          return element;
        }
      });
      dispatch({
        type: FETCH_ACTIONS.SUCCESS,
        data: filteredUserData,
      });
    };

    getUser();
  }, []);

  async function handleUpdate(event) {
    // Prevent the default form submission
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.put(
        "https://autominder-backend.onrender.com/admin/updateUser",
        values
      );
      alert("Account details have been updated!");
      nav("/admin/users");
    } catch (error) {
      // api error handling
      console.error(error);
    }
  }

  async function handleDelete(event) {
    // Prevent the default form submission
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    try {
      await axios.delete(
        "https://autominder-backend.onrender.com/user/vehicle/delete",
        {
          data: values,
        }
      );
      nav("/admin/users");
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
            <div key={item.user_id}>
              <Card className="flex flex-grow flex-col">
                <CardContent className="w-full pt-8 px-0">
                  <form onSubmit={handleUpdate}>
                    <CardContent>
                      <div className="w-full">
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="fname">First Name</Label>
                            <Input
                              id="fname"
                              name="fname"
                              type="text"
                              defaultValue={item.fname}
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="lname">Last Name</Label>
                            <Input
                              id="lname"
                              name="lname"
                              type="text"
                              defaultValue={item.lname}
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              defaultValue={item.email}
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Change Password</Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Password"
                              defaultValue={item.password}
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input
                              id="company_name"
                              name="company_name"
                              type="text"
                              defaultValue={item.company_name}
                            />
                          </div>
                          <div>
                            <Label htmlFor="user_id">User ID</Label>
                            <Input
                              id="user_id"
                              name="user_id"
                              type="text"
                              placeholder=""
                              defaultValue={item.user_id}
                              required
                              className="hidden"
                            />
                            <p>{item.user_id}</p>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="admin_id">Admin ID</Label>
                            <h1>{item.admin_id}</h1>
                          </div>
                          <div>
                            <Label htmlFor="user_id">Created On</Label>
                            <h1>{item.creation_date}</h1>
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
                              Delete {item.fname}?
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

export default UserDetailsCard;
