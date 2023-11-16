import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteDepartment } from "../../actions/DepartmentActions";

function Department(props) {
  const dispatch = useDispatch();
  const { department } = props;

  if (!department) {
    // Handle the case where department is undefined
    return (
      <div className="bg-red-100 p-4 rounded-md shadow-md text-red-600 font-bold">
        Department not found
      </div>
    );
  }

  const onDeleteClick = (id) => {
    dispatch(deleteDepartment(id));
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
      <div className="container mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-4">Department</h2>
        <div className="p-4 bg-blue-100 shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-center text-blue-900">
                {department.name}
              </h3>
            </div>
            <div className="lg:block hidden">
              <ul className="space-y-4">
                <li>
                  <Link
                    to={`/employees/${department.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 block w-full text-center"
                  >
                    Explore Department
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/updateDepartment/${department.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 block w-full text-center"
                  >
                    Update Department
                  </Link>
                </li>
                <li>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 block w-full text-center"
                    onClick={() => onDeleteClick(department.id)}
                  >
                    Delete Department
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Department.propTypes = {
  department: PropTypes.object,
};

export default Department;