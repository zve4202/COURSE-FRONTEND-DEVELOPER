import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

function taskReducer(state, action) {
  switch (action.type) {
    case "task/complited":
      const newArray = [...state];
      const index = newArray.findIndex((item) => item.id == action.payload.id);
      newArray[index].completed = true;
      return newArray;
    default:
      return state;
  }
}

function creatrStore(reducer, initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
  }
  return { getState, dispatch };
}

const store = creatrStore(taskReducer, [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
  { id: 3, description: "Task 3", completed: false },
]);
const App = () => {
  const state = store.getState();
  function handleClick(taskId) {
    store.dispatch({ type: "task/complited", payload: { id: taskId } });
    console.log(store.getState());
  }

  return (
    <>
      <h1 className="btn btn-dark">App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <span>{el.description}</span>
            <span> {`Completed ${el.completed}`}</span>
            <button
              className="btn btn-danger"
              onClick={() => handleClick(el.id)}
            >
              Complete
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
