import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Employee from "./employees/Employee";
import { getEmployeeList } from "../actions/EmployeeActions";
import { Link, useParams } from "react-router-dom";

const DepartmentBoard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const employeeList = useSelector(
    (state) => state.employeeReducerContent.employees
  );

  useEffect(() => {
    dispatch(getEmployeeList(id));
  }, [dispatch, id]);

  return (
    <div className="container mx-auto">
    <React.Fragment>
      <Link to={`/addEmployee/${id}`} className="py-2 px-4 bg-blue-500 text-white rounded-lg inline-block mb-4">
        Create Employee
      </Link>
      <hr className="my-4" />
    </React.Fragment>
    <h1 className="text-2xl font-bold mb-4">Employees</h1>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {employeeList.map((employee) => (
        <div key={employee.id} className="shadow-md rounded-lg p-4">
          <Employee id={id} employee={employee} />
        </div>
      ))}
    </div>
  </div>  
  );
};

export default DepartmentBoard;
