import React, { useEffect } from "react";
import Restaurant from "./restaurants/Department";
import CreateButton from "./restaurants/CreateButton";
import { getDepartments } from "../actions/DepartmentActions";
import { useSelector, useDispatch } from "react-redux";

function Restaurants() {
  const dispatch = useDispatch();
  const restaurant = {
    id: 101,
    name: "name",
    address: "address",
  };
  const restaurant2 = {
    id: 102,
    name: "name2",
    address: "address2",
  };

  useEffect(() => {
    console.log("get restaurant function/action");
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <CreateButton />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Restaurant key={restaurant.id} restaurant={restaurant} />
        <Restaurant key={restaurant2.id} restaurant={restaurant2} />
      </div>
    </div>
  );
}

export default Restaurants;
