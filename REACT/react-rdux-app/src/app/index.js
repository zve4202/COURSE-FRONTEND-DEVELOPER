import React, { useEffect, useState } from "react";
import { TASK_UPDATED } from "../store/actionTypes";
import { initiateStore } from "../store/store";
import * as actions from "../store/actions";

const store = initiateStore();
const App = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  function completeTask(taskId) {
    store.dispatch(actions.taskCompleted(taskId));
  }
  function changeTitle(taskId) {
    store.dispatch(actions.titleChanged(taskId));
  }
  function deleteTask(taskId) {
    store.dispatch(actions.taskDeleted(taskId));
  }
  return (
    <div className="container">
      <h1 className="bg-primary text-white text-center">App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{el.completed ? "Completed" : "not Completed"}</p>
            <button
              className="btn btn-outline-primary me-1"
              onClick={() => completeTask(el.id)}
            >
              Complete
            </button>
            <button
              className="btn btn-outline-dark me-1"
              onClick={() => changeTitle(el.id)}
            >
              Change title
            </button>
            <button
              className="btn btn-warning"
              onClick={() => deleteTask(el.id)}
            >
              Delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
