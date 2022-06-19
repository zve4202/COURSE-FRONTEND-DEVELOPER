import "./main.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";

import createRootReduser from "reducers";
import routes from "./modules/routes";

const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)];
const store = legacy_createStore(
    createRootReduser(history),
    composeWithDevTools(applyMiddleware(...middlewares))
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);
