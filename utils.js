const jsonServer = require("json-server");
const router = jsonServer.router("db.json");
// Function to read the last used Department ID from a JSON file
function readLastUsedDepartmentId() {
  try {
    const data = router.db.get("lastUsedId").value();
    return data.departmentId;
  } catch (error) {
    return 1; // Default to 1 if the file doesn't exist
  }
}
// Function to write the last used Department ID to a JSON file
function writeLastUsedDepartmentId(value) {
  const lastUsedId = router.db.get("lastUsedId").value();
  lastUsedId.departmentId = value;
  router.db.set("lastUsedId", lastUsedId).write();
}
// Function to read the last used Employee ID from a JSON file
function readLastUsedEmployeeId() {
  try {
    const data = router.db.get("lastUsedId").value();
    return data.employeeId;
  } catch (error) {
    return 1; // Default to 1 if the file doesn't exist
  }
}
// Function to write the last used Employee ID to a JSON file
function writeLastUsedEmployeeId(value) {
  const lastUsedId = router.db.get("lastUsedId").value();
  lastUsedId.employeeId = value;
  router.db.set("lastUsedId", lastUsedId).write();
}

function readLastUsedTaskId() {
    try {
      const data = router.db.get("lastUsedId").value();
      return data.taskId;
    } catch (error) {
      return 1; // Default to 1 if the file doesn't exist
    }
  }
  // Function to write the last used Department ID to a JSON file
  function writeLastUsedTaskId(value) {
    const lastUsedId = router.db.get("lastUsedId").value();
    lastUsedId.taskId = value;
    router.db.set("lastUsedId", lastUsedId).write();
  }
module.exports = {
  readLastUsedDepartmentId,
  writeLastUsedDepartmentId,
  readLastUsedEmployeeId,
  writeLastUsedEmployeeId,
  readLastUsedTaskId,
  writeLastUsedTaskId
};

