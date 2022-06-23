import { createSlice } from "@reduxjs/toolkit";

import categoryService from "../services/category.service";

const initialState = { entities: [], isLoading: true, error: null };

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        requested(state) {
            state = initialState;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: categoriesReducer } = categorySlice;
const { resived, requested, requestFailed } = actions;

export const loadCategories = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await categoryService.fetchAll();
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategory = (id) => (state) =>
    state.categories.entities.find((role) => role._id === id);
export const getCategoryLoading = () => (state) => state.categories.isLoading;
export const getCategoryError = () => (state) => state.categories.error;

export default categoriesReducer;
