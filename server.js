const jsonServer = require("json-server");
const jsonServerPort = 8095;
// Start the JSON server
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(jsonServer.bodyParser);
server.use(middlewares);
// Import your route handlers for departments, employees, tasks
const departmentsRoutes = require("./routes/departments");
const employeesRoutes = require("./routes/employees");
const tasksRoutes = require("./routes/tasks");
// Use route handlers for JSON data
departmentsRoutes(server);
employeesRoutes(server);
tasksRoutes(server);
// Start JSON server on port 8095
server.listen(jsonServerPort, () => {
  console.log(`JSON server is running on port ${jsonServerPort}`);
});