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

export default qualitiesReucer;
