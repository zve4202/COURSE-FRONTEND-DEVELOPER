import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReucer from "./professions";
import qualitiesReucer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReucer,
    professions: professionsReucer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
