import React from "react";
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
]);
const App = () => {
  console.log(store.getState());
  function handleClick() {
    store.dispatch({ type: "task/complited", payload: { id: 1 } });
    console.log(store.getState());
  }
  return (
    <>
      <h1 className="btn btn-dark">
        App
        <button className="btn btn-danger" onClick={handleClick}>
          Complete
        </button>
      </h1>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
