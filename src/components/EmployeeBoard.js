import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../actions/TaskActions";
import { Link, useParams } from "react-router-dom";
import Task from "../components/tasks/Task";

const EmployeeBoard = () => {
  const { dep_id, emp_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(dep_id, emp_id));
  }, [dep_id, emp_id, dispatch]);

  const taskList = useSelector((state) => state.taskReducerContent.tasks);

  let inputQueue = [];
  let inProgress = [];
  let done = [];

  for (const task of taskList) {
    if (task.status === "INPUT QUEUE") {
      inputQueue.push(task);
    } else if (task.status === "IN_PROGRESS") {
      inProgress.push(task);
    } else if (task.status === "DONE") {
      done.push(task);
    }
  }

  return (
    <div>
      <div className="container mx-auto">
        <Link
          to={`/addTask/${dep_id}/${emp_id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md text-lg inline-block mb-4"
        >
          <i className="fas fa-plus-circle"> Create Employee Task</i>
        </Link>
        <br />
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card text-center mb-2 bg-secondary text-white">
            <div className="card-header">
              <h3>Input Queue</h3>
            </div>
            <div className="card-body">
              {inputQueue.map((task) => (
                <Task
                  key={task.id}
                  dep_id={dep_id}
                  emp_id={emp_id}
                  task={task}
                />
              ))}
            </div>
          </div>
          <div className="card text-center mb-2 bg-primary text-white">
            <div className="card-header">
              <h3>In Progress</h3>
            </div>
            <div className="card-body">
              {inProgress.map((task) => (
                <Task
                  key={task.id}
                  dep_id={dep_id}
                  emp_id={emp_id}
                  task={task}
                />
              ))}
            </div>
          </div>
          <div className="card text-center mb-2 bg-success text-white">
            <div className="card-header">
              <h3>Done</h3>
            </div>
            <div className="card-body">
              {done.map((task) => (
                <Task
                  key={task.id}
                  dep_id={dep_id}
                  emp_id={emp_id}
                  task={task}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBoard;
