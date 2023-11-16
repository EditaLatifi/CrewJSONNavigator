import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/departments');
  };

  return (
    <div className="bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-6xl font-extrabold mb-4">Welcome to WorkforcePro Management</div>
      <p className="text-2xl mb-8">Your Trusted Partner in Employee Management</p>
      <button
        onClick={handleGetStarted}
        className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105"
      >
        Get Started
      </button>
      <div className="mt-12 text-center">
        <p className="text-lg">Discover what we offer:</p>
        <div className="flex space-x-8 mt-4">
          <div className="p-4 border rounded-lg hover:bg-blue-700 hover:border-yellow-400 hover:text-yellow-400 transition duration-300 transform hover:scale-105">
            <i className="fas fa-users fa-4x mb-4 text-5xl"></i>
            <p className="text-xl font-semibold">Employee Management</p>
            <p className="mt-2">Efficiently manage your workforce with ease.</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-blue-700 hover:border-yellow-400 hover:text-yellow-400 transition duration-300 transform hover:scale-105">
            <i className="fas fa-chart-line fa-4x mb-4 text-5xl"></i>
            <p className="text-xl font-semibold">Performance Tracking</p>
            <p className="mt-2">Monitor performance and track progress effortlessly.</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-blue-700 hover:border-yellow-400 hover:text-yellow-400 transition duration-300 transform hover:scale-105">
            <i className="fas fa-tasks fa-4x mb-4 text-5xl"></i>
            <p className="text-xl font-semibold">Task Assignment</p>
            <p className="mt-2">Efficiently assign and manage tasks for your team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
