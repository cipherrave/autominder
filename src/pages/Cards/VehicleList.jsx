import { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { reducer, initialState } from "../../reducers/reducer";
import { FETCH_ACTIONS } from "../../actions";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddVehicleCard from "./AddVehicleCard";

const VehicleList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");
  const { items, loading, error } = state;
  const [isLoading, setLoading] = useState(true);

  const nav = useNavigate();

  function navAddVehicle() {
    nav("/addVehicle");
  }

  function navGarage() {
    nav("/garage");
  }

  useEffect(() => {
    dispatch({ type: FETCH_ACTIONS.PROGRESS });

    const getItems = async () => {
      try {
        let response = await axios.get(
          "http://localhost:8989/user/vehicle/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          // save response data into localStorage as vehicleData for other local uses
          const vehicleArray = response.data;
          const vehicleString = JSON.stringify(vehicleArray);
          localStorage.setItem("vehicleData", vehicleString);

          // parse vehicleData from localStorage
          const readVehicle = JSON.parse(localStorage.getItem("vehicleData"));
          dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readVehicle });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <Button className="w-full" onClick={navGarage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-car-front mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
            <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
          </svg>
          Go to garage
        </Button>
        <div className="flex flex-row justify-between">
          <h1 className="text-xs text-gray-400 tracking-wider self-center">
            VEHICLES
          </h1>
          <AddVehicleCard></AddVehicleCard>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="space-y-4 mt-3">
          {items.map((item) => (
            <div
              className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 border-2"
              key={item.vehicle_id}
            >
              <div className="flex xl:flex-col flex-col items-start justify-between font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                <div className="flex w-full justify-between">
                  <div
                    src=""
                    className="w-7 h-7 mr-2 rounded-full bg-orange-500"
                    alt="profile"
                  />
                </div>
                <h1 className="text-lg text-ellipsis">{item.vname}</h1>
              </div>
              <div className="flex xl:flex-row sm:flex-col gap-2 items-start w-full justify-around">
                <div className="flex-col text-xs sm:center py-1 dark:bg-gray-900 rounded-md w-full xl:text-start">
                  <p>{item.brand}</p>
                  <p> {item.model}</p>
                  <p>{item.reg_num}</p>
                </div>
                <div className="text-l text-end text-gray-500 w-3/5">
                  <b>{item.mileage} km</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <br></br>
    </div>
  );
};

export default VehicleList;
