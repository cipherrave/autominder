import { useReducer, useEffect } from "react";
import { vehicleReducer, initialState } from "../../reducers/vehicleReducer";
import { FETCH_ACTIONS } from "../../actions";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const VehicleList = () => {
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  const token = localStorage.getItem("token");
  const { items, loading, error } = state;

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
          dispatch({ type: FETCH_ACTIONS.SUCCESS, data: response.data });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_ACTIONS.ERROR, error: err.message });
      }
    };

    getItems();
  }, []);

  return (
    <div>
      <div className="flex justify-between h-9">
        <h1 className="text-xs text-gray-400 tracking-wider self-center">
          VEHICLES
        </h1>
        <Button className="self-center p-1">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </div>
      <div className="relative mt-2">
        <input
          type="text"
          className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
          placeholder="Search"
        />
        <svg
          viewBox="0 0 24 24"
          className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="space-y-4 mt-3">
          {items.map((item) => (
            <button
              className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow"
              key={item.vehicle_id}
            >
              <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                <img
                  src=""
                  className="w-7 h-7 mr-2 rounded-full"
                  alt="profile"
                />
                <h1 className="text-lg ">{item.vname}</h1>
              </div>
              <div className="flex xl:flex-row sm:flex-col gap-2 items-start w-full justify-around">
                <div className="flex-col text-xs sm:center py-1 px-2 dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md w-full xl:text-start">
                  <p>{item.brand}</p>
                  <p> {item.model}</p>
                  <p>{item.reg_num}</p>
                </div>
                <div className="self-center text-l text-gray-500 w-3/5">
                  <b>{item.mileage} km</b>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
