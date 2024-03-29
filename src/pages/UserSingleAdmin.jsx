import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "./Components/reducers/reducer";
import { FETCH_ACTIONS } from "../actions";
import Header from "./Components/Menus/Header";
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
import UserDetailsCard from "./Components/Cards/UserDetailsCard";
import ServiceListSingleAdmin from "./Components/Cards/ServiceListSingleAdmin";
import ShortcutsAdmin from "./Components/Menus/ShortcutsAdmin";
import VehicleListSingleAdmin from "./Components/Cards/VehicleListSingleAdmin";

function UserSingleAdmin(props) {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });
    const getUser = async () => {
      // parse vehicleData from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      let filteredUserData = userData.filter((element) => {
        if (element.user_id === id) {
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

  async function checkToken() {
    // if token is not present, redirect to login
    if (!token) {
      nav("/login");
    } else if (admin_id === "") {
      nav("/login");
    }
    // validate token by calling the private API
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8989/admin/protected",
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
            <ShortcutsAdmin></ShortcutsAdmin>
          </div>
          <div className=" flex-wrap border-r flex h-full overflow-auto p-5 w-full gap-4">
            <div className="flex flex-row justify-between">
              <div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink>Admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>User</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-row flex-wrap justify-between">
                  <h1 className="text-3xl font-semibold">User Details</h1>
                </div>
              </div>
            </div>
            <div className="grid xl:grid-cols-3 w-full gap-8">
              <div className="xl:col-span-1">
                <UserDetailsCard id={id}></UserDetailsCard>
              </div>
              <div className="xl:col-span-2">
                <VehicleListSingleAdmin id={id}></VehicleListSingleAdmin>
              </div>
              <div className="xl:col-span-3 overflow-auto">
                <ServiceListSingleAdmin id={id}></ServiceListSingleAdmin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSingleAdmin;
