import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "../reducers/reducer";
import { FETCH_ACTIONS } from "../../../actions";
import { Card } from "@/components/ui/card";

function UserDetailsTag(props) {
  const token = localStorage.getItem("token");
  const user_id = jwtDecode(token).user_id;
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
              key={item.user_id}
              className="p-2
            "
            >
              <div className="w-full">
                <p>
                  {item.fname} {item.lname}
                </p>
                <p>{item.company}</p>
                <p>{item.email}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDetailsTag;
