import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getDepartment, createDepartment } from "../../actions/DepartmentActions";

const UpdateDepartment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const errors = useSelector((state) => state.errorsReducerContent);
  const department = useSelector((state) => state.departmentReducerContent.department);

  const [state, setState] = useState({
    id: id,
    name: "",
    errors: {},
  });

  useEffect(() => {
    dispatch(getDepartment(id));
  }, [dispatch, id]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      id: id,
      name: department.name || "",
      errors: errors,
    }));
  }, [department, id, errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updateProject = {
      id: state.id,
      name: state.name,
    };
    dispatch(createDepartment(updateProject));
  };

  return (
    <div className="container mx-auto mt-6">
    <div className="bg-white rounded-lg shadow-md p-8">
      <h4 className="text-2xl text-center mb-6">Update Department</h4>
      <hr className="my-4" />
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Department ID"
            name="id"
            value={state.id}
            onChange={onChange}
            disabled
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className={`w-full p-3 border border-gray-300 rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Department Name"
            name="name"
            value={state.name}
            onChange={onChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
        >
          Update Department
        </button>
      </form>
    </div>
  </div>
  );
};

export default UpdateDepartment;
