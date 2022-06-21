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

export const getErrors = () => (state) =>
    state.errors.entities[state.errors.entities.length - 1];

export default errorReducer;
