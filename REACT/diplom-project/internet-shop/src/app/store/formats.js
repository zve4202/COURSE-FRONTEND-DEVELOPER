import { createSlice } from "@reduxjs/toolkit";

import formatService from "../services/format.service";
import isOutdated from "../utils/isOutdated";

const initialState = { entities: [], isLoading: true, error: null };

const formatsSlice = createSlice({
    name: "format",
    initialState,
    reducers: {
        requested(state) {
            state = initialState;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: formatsReducer } = formatsSlice;
const { resived, requested, requestFailed } = actions;

export const loadCategories = () => async (dispatch, getState) => {
    const { lastFetch } = getState().format;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await formatService.fetchAll();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const getFormats = () => (state) => state.format.entities;
export const getFormat = (id) => (state) =>
    state.format.entities.find((item) => item._id === id);
export const getFormatsLoading = () => (state) => state.format.isLoading;
export const getFormatsError = () => (state) => state.format.error;

export default formatsReducer;
