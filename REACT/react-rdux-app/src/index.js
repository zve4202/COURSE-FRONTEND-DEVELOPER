import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { compose, pipe } from "lodash/fp";

const App = () => {
  const x = 2;
  const double = (number) => number * 2;
  const square = (number) => number * number;
  const half = (number) => number / 2;
  const divide = (num2) => (num1) => num1 / num2;

  const mathCalc = pipe(double, square, half, divide(3));
  return <h1 className="btn btn-dark">App {mathCalc(x)}</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
