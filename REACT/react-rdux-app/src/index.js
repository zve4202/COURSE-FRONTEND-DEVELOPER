import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  function someFn() {
    return function () {
      return "APP";
    };
  }
  const fn = someFn();
  return <h1 className="btn btn-dark">{fn()}</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
