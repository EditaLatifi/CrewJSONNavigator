import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateTask, getTask } from "../../actions/TaskActions";

const UpdateTask = () => {
  const { dep_id, emp_id, id } = useParams();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorsReducerContent);
  const task = useSelector((state) => state.taskReducerContent.task);
  
  const [state, setState] = useState({
    summary: "",
    acceptanceCriteria: "",
    status: "INPUT QUEUE",
    priority: 3,
    errors: {},
  });

  useEffect(() => {
    dispatch(getTask(dep_id, emp_id, id));
  }, [dispatch, dep_id, emp_id, id]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      id: id,
      summary: task.summary || "",
      acceptanceCriteria: task.acceptanceCriteria || "",
      priority: task.priority || "",
      status: task.status || "",
      errors: errors,
    }));
  }, [task, id, errors]);

  const onChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      summary: state.summary,
      status: state.status,
      acceptanceCriteria: state.acceptanceCriteria,
      priority: state.priority,
    };
    dispatch(updateTask(updatedTask, dep_id, emp_id, id)); // Use updateTask here
  };

  return (
    <div className="container mx-auto mt-6">
  <div className="bg-white rounded-lg shadow-md p-8">
    <h4 className="text-2xl text-center mb-6">Update Task</h4>
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700" htmlFor="summary">
          Project Task Summary
        </label>
        <input
          type="text"
          id="summary"
          className={`w-full p-3 border border-gray-300 rounded-md ${errors.summary ? "border-red-500" : ""}`}
          name="summary"
          value={state.summary}
          onChange={onChange}
          placeholder="Enter project task summary"
        />
        {errors.summary && (
          <p className="text-red-500 text-xs mt-1">{errors.summary}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700" htmlFor="acceptanceCriteria">
          Acceptance Criteria
        </label>
        <textarea
          id="acceptanceCriteria"
          className={`w-full p-3 border border-gray-300 rounded-md ${errors.acceptanceCriteria ? "border-red-500" : ""}`}
          name="acceptanceCriteria"
          value={state.acceptanceCriteria}
          onChange={onChange}
          placeholder="Enter acceptance criteria"
        ></textarea>
        {errors.acceptanceCriteria && (
          <p className="text-red-500 text-xs mt-1">{errors.acceptanceCriteria}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700" htmlFor="priority">
          Priority
        </label>
        <select
          id="priority"
          className={`w-full p-3 border border-gray-300 rounded-md ${errors.priority ? "border-red-500" : ""}`}
          name="priority"
          value={state.priority}
          onChange={onChange}
        >
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-xs mt-1">{errors.priority}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          className={`w-full p-3 border border-gray-300 rounded-md ${errors.status ? "border-red-500" : ""}`}
          name="status"
          value={state.status}
          onChange={onChange}
        >
          <option value="INPUT QUEUE">INPUT QUEUE</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status}</p>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Update Task
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default UpdateTask;
