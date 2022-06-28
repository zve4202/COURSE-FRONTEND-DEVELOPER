import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.entities = null;
            state.error = null;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReucer, actions } = qualitiesSlice;
const { requested, resived, requestFailed } = actions;

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await qualityService.fetchAll();
        dispatch(resived(content));
    } catch (error) {
        requestFailed(error.message);
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQuality = (id) => (state) => {
    for (const item of state.qualities.entities) {
        if (item._id === id) {
            return item;
        }
    }
    return null;
};

export const getQualityByIdis = (ids) => (state) => {
    const items = [];
    if (state.qualities.entities) {
        for (const id of ids) {
            items.push(getQuality(id)(state));
        }
    }
    return items;
};

export const getQualitiesLoading = () => (state) => state.qualities.isLoading;

export default qualitiesReucer;
