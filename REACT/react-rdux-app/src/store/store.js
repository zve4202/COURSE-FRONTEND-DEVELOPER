import { legacy_createStore, compose, applyMiddleware } from "redux";

import taskReducer from "./task";
import logger from "./middleware/logger";

const middlewareEnhancer = applyMiddleware(logger);

function configureStore() {
  return legacy_createStore(
    taskReducer,
    compose(
      middlewareEnhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default configureStore;
