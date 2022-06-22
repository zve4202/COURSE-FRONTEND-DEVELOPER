import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth";
import logger from "./middleware/logger";

const rootReducer = combineReducers({
    auth: authReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    });
}

export default createStore;
