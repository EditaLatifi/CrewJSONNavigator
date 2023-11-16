import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../../actions/TaskActions";

function Task(props) {
  const { dep_id } = props;
  const { emp_id } = props;
  const { task } = props;
  const dispatch = useDispatch();

  const onDeleteClick = (id, dep_id, emp_id) => {
    dispatch(deleteTask(dep_id, emp_id, id));
  };


  let priorityClassName;
  let priorityString;

  if (task.priority === 1) {
    priorityClassName = "bg-red-500 text-black";
    priorityString = "HIGH";
  } else if (task.priority === 2) {
    priorityClassName = "bg-yellow-500 text-black";
    priorityString = "MEDIUM";
  } else if (task.priority === 3) {
    priorityClassName = "bg-blue-500 text-black";
    priorityString = "LOW";
  }

  return (
    <div className="bg-blue-100 mb-4 p-4 rounded-lg shadow-md">
    <div className={`text-primary ${priorityClassName} p-4 rounded-t-lg`}>
      <h3 className="text-lg font-semibold text-gray-800">
        ID: {task.id} -- Priority: {priorityString}
      </h3>
    </div>
    <div className="bg-blue-100 p-4 rounded-b-lg">
      <h5 className="text-xl font-semibold text-gray-800">{task.summary}</h5>
      <p className="text-gray-700 line-clamp-3">{task.acceptanceCriteria}</p>
        
      <div className="flex flex-col items-center mt-4 space-y-2">
        <Link
          to={`/updateTask/${dep_id}/${emp_id}/${task.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          View / Update
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => onDeleteClick(task.id, dep_id, emp_id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  );
}


export default Task;
