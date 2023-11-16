import axios from "axios";
import {
  GET_TASKS,
  GET_ERRORS,
  CREATE_TASK,
  GET_TASK,
  DELETE_TASK,
  UPDATE_TASK, 
} from "./types";

export const getTasks = (dep_id, emp_id, id) => async (dispatch) => {
  try {
    let apiUrl = `http://localhost:8095/api/tasks/${dep_id}/${emp_id}`;
    
    if (id) {
      // If an 'id' is provided, add it to the URL to fetch data for a specific task
      apiUrl += `/${id}`;
    }

    const res = await axios.get(apiUrl);
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};


export const createTask = (task, dep_id, emp_id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8095/api/tasks/${dep_id}/${emp_id}`,
      task
    );
    // Dispatch an action to handle the successful creation
    dispatch({
      type: CREATE_TASK, // You should define this action type in your Redux actions
      payload: res.data,
      priority: parseInt(task.priority), // Use task.priority here
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};


export const getTask = (dep_id, emp_id, id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8095/api/tasks/${dep_id}/${emp_id}/${id}`);
    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};


export const deleteTask = (dep_id, emp_id, id) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this Task?")) {
    await axios.delete(`http://localhost:8095/api/tasks/${dep_id}/${emp_id}/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  }
};


export const updateTask = (updatedTask, dep_id, emp_id, id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:8095/api/tasks/${dep_id}/${emp_id}/${id}`,
      updatedTask,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Dispatch an action to handle the successful update
    dispatch({
      type: UPDATE_TASK, // Define the action type here
      payload: res.data, // You may update the payload based on your needs
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};


