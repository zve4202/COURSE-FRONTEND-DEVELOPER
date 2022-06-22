import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App, { store } from "./app";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
