import axios from "axios";
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_ERRORS,
  CREATE_EMPLOYEE,
} from "./types";
//create getEmployeeList function that uses Axios to make a GET request to a REST API endpoint at http://localhost:8095/api/employees/list/${id} where id is a parameter passed to the function
//fetches a list of employees from a REST API and dispatches the result to the Redux store.
// id = department id
export const getEmployeeList = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8095/api/employees/list/${id}`);
  dispatch({
    type: GET_EMPLOYEES,
    payload: res.data,
  });
};
export const createEmployee = (employee, department) => async (dispatch) => {
  try {
    await axios.post(
      `http://localhost:8095/api/employees/${department}`,
      employee
    );
    window.location.href = `/employees/${department}`;
    dispatch({
      type: CREATE_EMPLOYEE,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
export const getEmployee = (dep_id, id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8095/api/employees/${dep_id}/${id}`
    );
    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data,
    });
  } catch (error) {
    window.location.href = "/employee";
  }
};
export const deleteEmployee = (id) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this employee?")) {
    await axios.delete(`http://localhost:8095/api/employees/delete/${id}`);
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: id,
    });
  }
};