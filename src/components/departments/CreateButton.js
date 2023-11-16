import React from "react";
import { Link } from "react-router-dom";

const CreateButton = () => {
  return (
    <div className="my-4 text-center">
      <div className="flex justify-end">
        <Link
          to="/addDepartment"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105 mr-auto"
        >
          Create a department
        </Link>
      </div>
    </div>
  );
};

export default CreateButton;
