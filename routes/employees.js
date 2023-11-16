module.exports = function (server) {
  // Import necessary functions and data
  const { readLastUsedEmployeeId } = require("../utils");
  const jsonServer = require("json-server");
  const router = jsonServer.router("db.json");
  let employeeIdCounter = readLastUsedEmployeeId();
  server.post("/api/employees/:id", (request, response) => {
    const departmentId = parseInt(request.params.id);
    const requestBody = request.body;
    const departmentsData = router.db.get("departments").value();
    const index = departmentsData.findIndex((dept) => dept.id === departmentId);
    if (index === -1) {
      response.status(404).json({ error: "Department not found" });
    } else {
      // Get the department's employee list
      const department = departmentsData[index];
      const employeeList = department.employee_list;
      if (requestBody.id === undefined) {
        let employeeId;
        employeeId = employeeIdCounter++;
        const newEmployee = {
          id: employeeId,
          name: requestBody.name,
          address: requestBody.address,
          email: requestBody.email,
          phone: requestBody.phone,
          task_list: [],
        };
        // Add the new employee to the list
        employeeList.push(newEmployee);
        // Update the department's data
        department.employee_list = employeeList;
        // Save the updated data
        router.db.set("departments", departmentsData).write();
        const lastUsedId = router.db.get("lastUsedId").value();
        lastUsedId.employeeId = employeeIdCounter;
        router.db.set("lastUsedId", lastUsedId).write();
        response.json(departmentsData[index]);
      } else {
        // Find the index of the employee within the department's employee_list
        const employeeIndex = department.employee_list.findIndex(
          (employee) => employee.id === parseInt(requestBody.id)
        );
        if (employeeIndex === -1) {
          response
            .status(404)
            .json({ error: "Employee not found in the department" });
        } else {
          // Update the existing employee with the new data
          requestBody.id = parseInt(requestBody.id);
          const updatedEmployee = {
            id: requestBody.id,
            name: requestBody.name,
            address: requestBody.address,
            email: requestBody.email,
            phone: requestBody.phone,
            task_list: [],
          };
          department.employee_list[employeeIndex] = {
            ...department.employee_list[employeeIndex],
            ...updatedEmployee,
          };
          // Save the updated data
          router.db.set("departments", departmentsData).write();
          response.json(department);
        }
      }
    }
  });
  server.get("/api/employees/list/:id", (request, response) => {
    const departmentId = parseInt(request.params.id);
    const departmentsData = router.db.get("departments").value();
    const department = departmentsData.find((dept) => dept.id === departmentId);
    if (!department) {
      response.status(404).json({ error: "Department not found" });
    } else {
      const employeeList = department.employee_list;
      response.json(employeeList);
    }
  });
  // Add a new GET route to retrieve an employee with a specific ID from a department
  server.get("/api/employees/:dep_id/:id", (request, response) => {
    const departmentId = parseInt(request.params.dep_id);
    const employeeId = parseInt(request.params.id);
    const departmentsData = router.db.get("departments").value();
    const department = departmentsData.find((dept) => dept.id === departmentId);
    if (!department) {
      response.status(404).json({ error: "Department not found" });
    } else {
      const employee = department.employee_list.find(
        (emp) => emp.id === employeeId
      );
      if (!employee) {
        response
          .status(404)
          .json({ error: "Employee not found in the department" });
      } else {
        response.json(employee);
      }
    }
  });
  server.delete("/api/employees/delete/:id", (request, response) => {
    const employeeId = parseInt(request.params.id);
    const departmentsData = router.db.get("departments").value();
    // Flag to track if the employee was found and deleted
    let employeeDeleted = false;
    departmentsData.forEach((department) => {
      const employeeIndex = department.employee_list.findIndex(
        (employee) => employee.id === employeeId
      );
      if (employeeIndex !== -1) {
        // Remove the employee from the department's employee list
        department.employee_list.splice(employeeIndex, 1);
        employeeDeleted = true;
      }
    });
    if (employeeDeleted) {
      // Save the updated data
      router.db.set("departments", departmentsData).write();
      response.json({ message: "Employee deleted successfully" });
    } else {
      response
        .status(404)
        .json({ error: "Employee not found in any department" });
    }
  });
};
