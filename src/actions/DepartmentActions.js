import axios from "axios";
import {
  GET_ERRORS,
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  DELETE_DEPARTMENT,
  CREATE_DEPARTMENT,
} from "./types";

//arrow function
export const createDepartment = (department) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8095/api/departments", department);
    window.location.href = `/`;
    dispatch({
      type: CREATE_DEPARTMENT,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getDepartments = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8095/api/departments/all");
  dispatch({
    type: GET_DEPARTMENTS,
    payload: res.data,
  });
};

export const getDepartment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8095/api/departments/id/${id}`
    );
    dispatch({
      type: GET_DEPARTMENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
    window.location.href = `/`;
    console.log(error.response.data);
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this department.")) {
    try {
      await axios.delete(`http://localhost:8095/api/departments/delete/${id}`);
      dispatch({
        type: DELETE_DEPARTMENT,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  }
};
