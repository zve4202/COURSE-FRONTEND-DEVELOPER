import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReucer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReucer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
