import React, { useEffect, useState } from "react";
import { taskReducer } from "../store/taskReducer";
import { TASK_UPDATED } from "../store/actionTypes";
import { initiateStore } from "../store/store";

const store = initiateStore();
const App = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  function completeTask(taskId) {
    store.dispatch({
      type: TASK_UPDATED,
      payload: { id: taskId, completed: true },
    });
  }
  function changeTitle(taskId) {
    store.dispatch({
      type: TASK_UPDATED,
      payload: { id: taskId, title: `New Title for Task${taskId}` },
    });
  }

  return (
    <div className="container">
      <h1 className="bg-primary text-white text-center">App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{el.completed ? "Completed" : "not Completed"}</p>
            <button className="me-1" onClick={() => completeTask(el.id)}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
