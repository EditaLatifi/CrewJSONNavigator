import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../actions/TaskActions";

const AddTaskForm = () => {
  const { dep_id, emp_id } = useParams();
  const [taskData, setTaskData] = useState({
    summary: "",
    acceptanceCriteria: "",
    status: "INPUT QUEUE",
    priority: 3,
  });
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorsReducerContent);

  useEffect(() => {
    setTaskData((prevData) => ({ ...prevData, errors }));
  }, [errors]);

  const { summary, acceptanceCriteria, status, priority } = taskData;

  const onChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      summary,
      status,
      acceptanceCriteria,
      priority,
    };
    dispatch(createTask(newTask, dep_id, emp_id));
  };

  return (
<div className="container mx-auto">
  <div className="add-PBI">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
        <Link
  to={`/employeeBoard/${emp_id}`}
  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
>
  Back to Employee Board
</Link>

          <h4 className="text-2xl text-center text-gray-800 mb-4">Create New Task</h4>
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div className="form-group">
              <input
                type="text"
                className={`w-full p-3 border border-gray-300 rounded-lg text-gray-800 ${
                  errors.summary ? "border-red-500" : ""
                }`}
                name="summary"
                placeholder="Project Task summary"
                value={summary}
                onChange={onChange}
              />
              {errors.summary && (
                <div className="text-red-500 text-xs mt-1">{errors.summary}</div>
              )}
            </div>
            <div className="form-group">
              <textarea
                className={`w-full p-3 border border-gray-300 rounded-lg ${
                  errors.acceptanceCriteria ? "border-red-500" : ""
                }`}
                placeholder="Acceptance Criteria"
                name="acceptanceCriteria"
                value={acceptanceCriteria}
                onChange={onChange}
              ></textarea>
              {errors.acceptanceCriteria && (
                <div className="text-red-500 text-xs mt-1">{errors.acceptanceCriteria}</div>
              )}
            </div>
            <div className="form-group">
              <select
                className={`w-full p-3 border border-gray-300 rounded-lg ${
                  errors.priority ? "border-red-500" : ""
                }`}
                name="priority"
                value={priority}
                onChange={onChange}
              >
                <option value={0}>Select Priority</option>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </select>
              {errors.priority && (
                <div className="text-red-500 text-xs mt-1">{errors.priority}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default AddTaskForm;
