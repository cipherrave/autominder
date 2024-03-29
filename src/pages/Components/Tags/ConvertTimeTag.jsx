import { useReducer, useEffect } from "react";
import { reducer, initialState } from "../reducers/reducer";

function ConvertTimeTag(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, loading, error } = state;

  const isoDate = props.date;
  const date = new Date(isoDate);
  const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

  return <p>{formattedDate}</p>;
}

export default ConvertTimeTag;
