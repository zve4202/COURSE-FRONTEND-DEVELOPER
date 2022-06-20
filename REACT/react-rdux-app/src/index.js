import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

function creatrStore(initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  function dispatch({ type, payload }) {
    switch (type) {
      case "task/complited":
        const newArray = [...state];
        const index = newArray.findIndex((item) => item.id == payload.id);
        newArray[index].completed = true;
        state = newArray;
        console.log(state);
        return state;

      default:
        return payload;
    }
  }
  return { getState, dispatch };
}

const store = creatrStore([{ id: 1, description: "Task 1", completed: false }]);
const App = () => {
  console.log(store.getState());

  // console.log(store.getState());
  return (
    <>
      <h1 className="btn btn-dark">
        App
        <button
          className="btn btn-danger"
          onClick={() =>
            store.dispatch({ type: "task/complited", payload: { id: 1 } })
          }
        >
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
