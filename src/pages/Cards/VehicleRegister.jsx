import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Brand"
        {...register("Brand", { required: true })}
      />
      <input
        type="text"
        placeholder="Model"
        {...register("Model", { required: true })}
      />
      <input
        type="datetime"
        placeholder="Purchase Date"
        {...register("Purchase Date", { required: true })}
      />
      <input
        type="number"
        placeholder="Current Mileage"
        {...register("Current Mileage", { required: true })}
      />

      <input type="submit" />
    </form>
  );
}
