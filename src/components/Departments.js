import React, { useEffect } from "react";
import Department from "./departments/Department";
import CreateButton from "./departments/CreateButton";
import { getDepartments } from "../actions/DepartmentActions";
import { useSelector, useDispatch } from "react-redux";

function Departments() {
  const dispatch = useDispatch();
  const departmentList = useSelector(
    (state) => state.departmentReducerContent.departments
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <CreateButton />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departmentList.map((department) => (
          <Department key={department.id} department={department} />
        ))}
      </div>
    </div>
  );
}

export default Departments;
