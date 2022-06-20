import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const arr = ["some", "new", "data"];
  function formatElem(el) {
    return el + " ку";
  }
  return <h1 className="btn btn-dark">{arr.map(formatElem)}</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
