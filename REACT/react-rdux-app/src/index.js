import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

function taskReducer(state, action) {
  switch (action.type) {
    case "task/complited":
      const newArray = [...state];
      const index = newArray.findIndex((item) => item.id === action.payload.id);
      newArray[index].completed = true;
      return newArray;
    default:
      return state;
  }
}

function creatrStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function subscribe(listener) {
    listeners.push(listener);
  }
  return { getState, dispatch, subscribe };
}

const store = creatrStore(taskReducer, [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
  { id: 3, description: "Task 3", completed: false },
]);
const App = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);
  function handleClick(taskId) {
    store.dispatch({ type: "task/complited", payload: { id: taskId } });
  }

  return (
    <div className="container card card-body">
      <h1 className="btn btn-dark">App</h1>
      <ul className="card card-body">
        {state.map((el) => (
          <li className="row card" key={el.id}>
            <span className="col-2">{el.description}</span>
            <span className="col-2">
              {el.completed ? "Completed" : "not Completed"}
            </span>
            <span className="col-2">
              <button
                className="btn btn-danger"
                onClick={() => handleClick(el.id)}
              >
                Complete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
