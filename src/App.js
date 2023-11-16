import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Layout/Header";
import Departments from "./components/Departments";
import AddDepartment from "./components/departments/AddDepartment";
import UpdateDepartment from "./components/departments/UpdateDepartment";
import DepartmentBoard from "./components/DepartmentBoard";
import AddEmployee from "./components/employees/AddEmployees";
import UpdateEmployee from "./components/employees/UpdateEmployees";
import EmployeeBoard from "./components/EmployeeBoard";
import AddTaskForm from "./components/tasks/AddTaskForm";
import UpdateTask from "./components/tasks/UpdateTask";
import EmployeePage from "./components/EmployeePage";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/* Render the Header for all routes except Landing, Login, and Register */}
          <Routes>
            <Route path="/" element={<EmployeePage />} />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/departments" element={<Departments />} />
                    <Route
                      exact
                      path="/addDepartment"
                      element={<AddDepartment />}
                    />
                    <Route
                      exact
                      path="/updateDepartment/:id"
                      element={<UpdateDepartment />}
                    />
                    <Route
                      exact
                      path="/employees/:id"
                      element={<DepartmentBoard />}
                    />
                    <Route
                      exact
                      path="/addEmployee/:id"
                      element={<AddEmployee />}
                    />
                    <Route
                      exact
                      path="/updateEmployee/:dep_id/:id"
                      element={<UpdateEmployee />}
                    />
                    <Route
                      exact
                      path="/employeeBoard/:dep_id/:emp_id"
                      element={<EmployeeBoard />}
                    />
                    <Route
                      exact
                      path="/addTask/:dep_id/:emp_id"
                      element={<AddTaskForm />}
                    />
                    <Route
                      exact
                      path="/updateTask/:dep_id/:emp_id/:id"
                      element={<UpdateTask />}
                    />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
export default App;