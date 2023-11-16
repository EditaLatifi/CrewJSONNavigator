import { GET_EMPLOYEES, GET_EMPLOYEE, DELETE_EMPLOYEE } from "../actions/types";

const initialState = {
  employees: [],
  employee: {},
};

export default function EmployeeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
