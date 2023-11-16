import {
    GET_DEPARTMENT,
    GET_DEPARTMENTS,
    DELETE_DEPARTMENT,
  } from "../actions/types";
  
  const initialState = {
    departments: [],
    department: {},
  };
  
  export default function DepartmentReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DEPARTMENTS:
        return {
          ...state,
          departments: action.payload,
        };
  
      case GET_DEPARTMENT:
        return {
          ...state,
          department: action.payload,
        };
  
      case DELETE_DEPARTMENT:
        return {
          ...state,
          departments: state.departments.filter(
            (department) => department.id !== action.payload
          ),
        };
  
      default:
        return state;
    }
  }
  