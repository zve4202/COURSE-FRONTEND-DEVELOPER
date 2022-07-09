import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth";
import categoriesReducer from "./categories";
import formatsReducer from "./formats";
import logger from "./middleware/logger";
import productsReducer from "./products";
import rolesReducer from "./roles";
import settingSlice from "./setting";
import basketSlice from "./basket";
import usersReducer from "./users";

const rootReducer = combineReducers({
    auth: authReducer,
    roles: rolesReducer,
    users: usersReducer,
    categories: categoriesReducer,
    formats: formatsReducer,
    products: productsReducer,
    setting: settingSlice.reducer,
    basket: basketSlice.reducer
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
