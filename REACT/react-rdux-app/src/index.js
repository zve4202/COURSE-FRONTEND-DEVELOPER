import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [state, setState] = useState({});
  const obj1 = { id: 2, name: "Name", author: { name: "A Name" } };
  const obj2 = { ...obj1, author: { ...obj1.author } };
  console.log(obj1.author === obj2.author);
  return <h1 className="btn btn-dark">App</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
