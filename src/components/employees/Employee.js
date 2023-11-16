import React from "react";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../actions/EmployeeActions";
import { useDispatch } from "react-redux";

function Employee(props) {
  const dispatch = useDispatch();

  const onDeleteClick = (emp_id) => {
    dispatch(deleteEmployee(emp_id));
  };

  const { employee } = props;
  const dep_id = props.id;

  return (
    <div className="bg-blue-100 p-4 mb-4 rounded-lg shadow-lg">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold mb-2 text-center text-blue-900">
          {employee.name}
        </h3>
        <p className="text-gray-600 text-center">{employee.address}</p>
        <p className="text-gray-600 text-center">{employee.email}</p>
        <p className="text-gray-600 text-center">{employee.phone}</p>

        <div className="lg:block hidden">
          <ul className="space-y-4 mt-4">
            <li>
              <Link
                to={`/employeeBoard/${dep_id}/${employee.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
              >
                Employee board
              </Link>
            </li>
            <li>
              <Link
                to={`/updateEmployee/${dep_id}/${employee.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
              >
                Update employee
              </Link>
            </li>
            <li>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 block w-full text-center"
                onClick={() => onDeleteClick(employee.id)}
              >
                Delete employee
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Employee;
