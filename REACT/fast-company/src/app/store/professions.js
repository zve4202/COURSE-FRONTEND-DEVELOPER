import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import { isOutdated } from "../utils/isOutdated";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.error = null;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReucer, actions } = professionsSlice;
const { requested, resived, requestFailed } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await professionService.get();
            dispatch(resived(content));
        } catch (error) {
            requestFailed(error.message);
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfession = (id) => (state) => {
    if (state.professions.entities) {
        for (const item of state.professions.entities) {
            if (item._id === id) {
                return item;
            }
        }
    }
    return null;
};

export const getProfessionsLoading = () => (state) =>
    state.professions.isLoading;

export default professionsReucer;
