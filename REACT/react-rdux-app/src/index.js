import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

function creatrStore(initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  return { getState };
}

const store = creatrStore({ id: 1, description: "Task 1", completed: false });
const App = () => {
  store.getState();
  return <h1 className="btn btn-dark">App</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
