//to combine our reducers
import { combineReducers } from "redux";
import departmentReducer from "./departmentReducer";
import ErrorReducer from "./ErrorReducer";
import EmployeeReducer from "./EmployeeReducer";
import TaskReducer from "./TaskReducer";

const roorReducer = combineReducers({
  errorsReducerContent: ErrorReducer,
  departmentReducerContent: departmentReducer,
  employeeReducerContent: EmployeeReducer,
  taskReducerContent: TaskReducer,
});
export default roorReducer;
