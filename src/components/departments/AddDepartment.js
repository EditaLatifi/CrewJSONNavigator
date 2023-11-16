import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment } from "../../actions/DepartmentActions";

const AddDepartment = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorsReducerContent);

  const [name, setName] = useState("");

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newDepartment = { name };
    dispatch(createDepartment(newDepartment));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow p-8 sm:p-10">
          <h5 className="text-center text-3xl">Create Department Form</h5>
          <hr className="my-4" />

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                className={`w-full p-3 border border-gray-300 rounded-md ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Department name"
                name="name"
                value={name}
                onChange={onChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
              >
                Create Department
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;

