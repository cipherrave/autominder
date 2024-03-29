import { useNavigate } from "react-router-dom";
import { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import { Card } from "@/components/ui/card";

function VehicleDetailsTag(props) {
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

  return (
    <div className="w-full xl:max-w-[400px] ">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {items.map((item) => (
            <Card
              key={item.vehicle_id}
              className="p-2
            "
            >
              <div className="w-full">
                <p>{item.vname}</p>
                <p>{item.reg_num}</p>
                <p>
                  {item.brand}, {item.model}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleDetailsTag;
