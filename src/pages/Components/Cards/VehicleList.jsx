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

const VehicleList = () => {
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

    const getItems = async () => {
      if (!vehicleData) {
        await delay(1000);
      }
      try {
        let getAllVehicle = await axios.get(
          "https://autominder-backend.onrender.com/user/vehicle/all",
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
        dispatch({ type: FETCH_ACTIONS.SUCCESS, data: readVehicle });
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
    <div className=" flex justify-center align-middle h-screen w-full">
      <div className=" w-full overflow-hidden h-full flex flex-col">
        <div className="flex self-center h-screen pt-10">
          <Spinner></Spinner>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-w-[225px]">
      <br></br>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <Card key={item.vehicle_id}>
              <CardContent className="flex flex-col px-3 mt-2">
                <div className="flex justify-between py-1">
                  <div>
                    <CardTitle> {item.vname}</CardTitle>
                    <CardDescription>{item.reg_num}</CardDescription>
                  </div>
                  <div>
                    <form onSubmit={handleVehicle}>
                      <input
                        type="text"
                        id="vehicle_id"
                        name="vehicle_id"
                        defaultValue={item.vehicle_id}
                        className="hidden"
                      />
                      <Button type="submit" variant="text" size="icon">
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
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                          />
                        </svg>
                      </Button>
                    </form>
                  </div>
                </div>
                <hr />
                <div className="flex flex-row">
                  <div className="flex flex-col text-xs sm:center py-1 rounded-md w-2/5 text-start">
                    <p>{item.brand}</p>
                    <p> {item.model}</p>
                  </div>
                  <p className="text-md text-end w-3/5 self-center font-semibold">
                    {item.mileage} km
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
