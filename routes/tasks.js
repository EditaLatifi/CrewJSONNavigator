const jsonServer = require("json-server");
const router = jsonServer.router("db.json");
const { readLastUsedTaskId } = require("../utils");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

module.exports = function (server) {
  let taskIdCounter = readLastUsedTaskId();

  // Create or update a task for a specific employee in a department
  server.post("/api/tasks/:dep_id/:emp_id", (request, response) => {
    const departmentId = parseInt(request.params.dep_id);
    const employeeId = parseInt(request.params.emp_id);
    const departmentsData = router.db.get("departments").value();
    const department = departmentsData.find((dept) => dept.id === departmentId);
  
    if (!department) {
      response.status(404).json({ error: "Department not found" });
    } else {
      const employee = department.employee_list.find((emp) => emp.id === employeeId);
      if (!employee) {
        response.status(404).json({ error: "Employee not found in the department" });
      } else {
        const requestBody = request.body;
        // Always create a new task using POST
        createTask(employee, requestBody, response, departmentsData);
      }
    }
  });

  // Function to create a new task
  function createTask(employee, requestBody, response, departmentsData) {
    // Generate a new task
    const newTask = {
      id: taskIdCounter++,
      summary: requestBody.summary,
      acceptanceCriteria: requestBody.acceptanceCriteria,
      status: requestBody.status,
      priority: parseInt(requestBody.priority),
    };
    // Add the new task to the employee's task list
    employee.task_list.push(newTask);
    router.db.set("departments", departmentsData).write();
    const lastUsedId = router.db.get("lastUsedId").value();
    lastUsedId.taskId = taskIdCounter;
    router.db.set("lastUsedId", lastUsedId).write();
    response.json(newTask);
  }
  // Get tasks for a specific employee in a department
  server.get("/api/tasks/:dep_id/:emp_id/:id?", (request, response) => {
    const departmentId = parseInt(request.params.dep_id);
    const employeeId = parseInt(request.params.emp_id);
    const taskId = request.params.id ? parseInt(request.params.id) : null; // Task ID (if provided)
  
    const departmentsData = router.db.get("departments").value();
    const department = departmentsData.find((dept) => dept.id === departmentId);
  
    if (!department) {
      response.status(404).json({ error: "Department not found" });
    } else {
      const employee = department.employee_list.find((emp) => emp.id === employeeId);
  
      if (!employee) {
        response.status(404).json({ error: "Employee not found in the department" });
      } else {
        if (taskId) {
          // Handle the case where 'id' is provided to fetch a specific task
          const task = employee.task_list.find((t) => t.id === taskId);
  
          if (!task) {
            response.status(404).json({ error: "Task not found" });
          } else {
            response.json(task);
          }
        } else {
          // Handle the case where 'id' is not provided to fetch all tasks for the employee
          response.json(employee.task_list);
        }
      }
    }
  });  
  
  // Delete a task for a specific employee in a department
  server.delete("/api/tasks/:dep_id/:emp_id/:task_id", (request, response) => {
    const departmentId = parseInt(request.params.dep_id);
    const employeeId = parseInt(request.params.emp_id);
    const taskId = parseInt(request.params.task_id);
    const departmentsData = router.db.get("departments").value();
    const department = departmentsData.find((dept) => dept.id === departmentId);
    if (!department) {
      response.status(404).json({ error: "Department not found" });
    } else {
      const employee = department.employee_list.find((emp) => emp.id === employeeId);
      if (!employee) {
        response.status(404).json({ error: "Employee not found in the department" });
      } else {
        const task = employee.task_list.find((t) => t.id === taskId);
        employee.task_list.splice(taskId, 1);
        router.db.set("departments", departmentsData).write();
        response.json({ message: "Task deleted successfully" });
      }
    }
  });
  // Get a task by its ID
  server.get("/api/task/:task_id", (request, response) => {
    const taskId = parseInt(request.params.task_id);
    const departmentsData = router.db.get("departments").value();
    for (const department of departmentsData) {
      for (const employee of department.employee_list) {
        const task = employee.task_list.find((task) => task.id === taskId);
        if (task) {
          return response.json(task);
        }
      }
    }
    response.status(404).json({ error: "Task not found" });
  });

  // Update a task for a specific employee in a department
 // Update a task for a specific employee in a department
 server.put("/api/tasks/:dep_id/:emp_id/:task_id", (request, response) => {
  const departmentId = parseInt(request.params.dep_id);
  const employeeId = parseInt(request.params.emp_id);
  const taskId = parseInt(request.params.task_id);
  const requestBody = request.body; // Log the request body

  console.log("Received PUT request with the following parameters:");
  console.log("Department ID:", departmentId);
  console.log("Employee ID:", employeeId);
  console.log("Task ID:", taskId);
  console.log("Request Body:", requestBody);

  const departmentsData = router.db.get("departments").value();
  const department = departmentsData.find((dept) => dept.id === departmentId);

  if (!department) {
    response.status(404).json({ error: "Department not found" });
  } else {
    const employee = department.employee_list.find((emp) => emp.id === employeeId);
    if (!employee) {
      response.status(404).json({ error: "Employee not found in the department" });
    } else {
      // Call the updateTask function to handle the update of the task
      updateTask(taskId, employee, requestBody, response, departmentsData);
    }
  }
});
function updateTask(taskId, employee, updatedData, response, departmentsData) {
  const taskList = employee.task_list;
  const taskIndex = taskList.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    // If the task with the specified ID doesn't exist, send an error response
    response.status(404).json({ error: "Task not found" });
  } else {
    // Update the existing task with the provided data
    taskList[taskIndex] = { ...taskList[taskIndex], ...updatedData };

    // Use the departmentsData to update the data in your JSON server
    router.db.set("departments", departmentsData).write();
    response.json({ message: "Task updated successfully" });
  }
}
}