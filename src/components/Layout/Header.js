import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav className="bg-gradient-to-b from-blue-700 via-blue-500 to-blue-300 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-4xl font-extrabold hover:text-yellow-400">
            WorkforcePro
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/departments"
              className="text-white text-xl hover:text-yellow-400"
            >
              <span className="border-b-2 border-transparent hover:border-yellow-400">
                Departments
              </span>
            </Link>
            <Link
              to="/employees"
              className="text-white text-xl hover:text-yellow-400"
            >
              <span className="border-b-2 border-transparent hover:border-yellow-400">
                Employees
              </span>
            </Link>
            <Link
              to="/tasks"
              className="text-white text-xl hover:text-yellow-400"
            >
              <span className="border-b-2 border-transparent hover:border-yellow-400">
                Tasks
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
