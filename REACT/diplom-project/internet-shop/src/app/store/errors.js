import { createSlice } from "@reduxjs/toolkit";

const initialState = { entities: [] };
const taskSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        set(state, action) {
            state.entities.push(action.payload);
        }
    }
});
const { actions, reducer: errorReducer } = taskSlice;
const { set } = actions;

export const setError = (message) => (dispatch) => {
    dispatch(set(message));
};

export const getErrors = () => (state) => {
    const last = state.errors.entities.length - 1;
    if (last < 0) return null;
    return state.errors.entities[last];
};

export default errorReducer;
