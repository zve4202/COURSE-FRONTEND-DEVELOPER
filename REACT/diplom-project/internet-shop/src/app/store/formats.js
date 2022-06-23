import { createSlice } from "@reduxjs/toolkit";

import formatService from "../services/format.service";

const initialState = { entities: [], isLoading: true, error: null };

const formatsSlice = createSlice({
    name: "format",
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

const { actions, reducer: formatsReducer } = formatsSlice;
const { resived, requested, requestFailed } = actions;

export const loadCategories = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await formatService.fetchAll();
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getFormats = () => (state) => state.format.entities;
export const getFormat = (id) => (state) =>
    state.format.entities.find((item) => item._id === id);
export const getFormatsLoading = () => (state) => state.format.isLoading;
export const getFormatsError = () => (state) => state.format.error;

export default formatsReducer;
