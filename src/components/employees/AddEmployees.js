import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../actions/EmployeeActions";
import { useParams } from "react-router-dom";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorsReducerContent);

  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      name: employee.name,
      address: employee.address,
      email: employee.email,
      phone: employee.phone,
    };
    dispatch(createEmployee(newEmployee, id));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h5 className="text-4xl text-center text-blue-600 mb-6">Create Employee Form</h5>
        <hr className="border-gray-300 mb-6" />
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <input
              type="text"
              className={`w-full p-3 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Employee Name"
              name="name"
              value={employee.name}
              onChange={onChange}
            />
            {errors.name && <div className="text-red-500 mt-2">{errors.name}</div>}
          </div>
          <div className="mb-6">
            <input
              type="text"
              className={`w-full p-3 border rounded-lg ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Employee Address"
              name="address"
              value={employee.address}
              onChange={onChange}
            />
            {errors.address && <div className="text-red-500 mt-2">{errors.address}</div>}
          </div>
          <div className="mb-6">
            <input
              type="text"
              className={`w-full p-3 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Employee Email"
              name="email"
              value={employee.email}
              onChange={onChange}
            />
            {errors.email && <div className="text-red-500 mt-2">{errors.email}</div>}
          </div>
          <div className="mb-6">
            <input
              type="text"
              className={`w-full p-3 border rounded-lg ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Phone Number"
              name="phone"
              value={employee.phone}
              onChange={onChange}
            />
            {errors.phone && <div className="text-red-500 mt-2">{errors.phone}</div>}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105 w-full">
  Create Employee
</button>

        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
