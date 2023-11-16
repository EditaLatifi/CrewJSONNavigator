import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployee, createEmployee } from "../../actions/EmployeeActions";

const UpdateEmployee = () => {
  const { dep_id } = useParams();
  const { id } = useParams();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorsReducerContent);
  const employee = useSelector((state) => state.employeeReducerContent.employee);

  const [state, setState] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    departmentBacklog: "",
    errors: {},
  });

  useEffect(() => {
    dispatch(getEmployee(dep_id, id));
  }, [dispatch, dep_id, id]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      id: id,
      name: employee.name || "",
      address: employee.address || "",
      email: employee.email || "",
      phone: employee.phone || "",
      errors: errors,
    }));
  }, [employee, id, errors]);

  const onChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updateEmployee = {
      id: state.id,
      name: state.name,
      address: state.address,
      email: state.email,
      phone: state.phone,
    };
    dispatch(createEmployee(updateEmployee, dep_id));
  };

  return (
    <div className="container mx-auto mt-6">
    <div className="bg-white rounded-lg shadow-md p-8">
      <h4 className="text-2xl text-center mb-6">Update Employee</h4>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="name">
            Employee Name
          </label>
          <input
            type="text"
            id="name"
            className={`w-full p-3 border border-gray-300 rounded-md ${errors.name ? "border-red-500" : ""}`}
            name="name"
            value={state.name}
            onChange={onChange}
            placeholder="Enter employee name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="address">
            Employee Address
          </label>
          <input
            type="text"
            id="address"
            className={`w-full p-3 border border-gray-300 rounded-md ${errors.address ? "border-red-500" : ""}`}
            name="address"
            value={state.address}
            onChange={onChange}
            placeholder="Enter employee address"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="email">
            Employee Email
          </label>
          <input
            type="text"
            id="email"
            className={`w-full p-3 border border-gray-300 rounded-md ${errors.email ? "border-red-500" : ""}`}
            name="email"
            value={state.email}
            onChange={onChange}
            placeholder="Enter employee email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            className={`w-full p-3 border border-gray-300 rounded-md ${errors.phone ? "border-red-500" : ""}`}
            name="phone"
            value={state.phone}
            onChange={onChange}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default UpdateEmployee;
