import { createSlice } from "@reduxjs/toolkit";
// import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: false }
];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        update(state, action) {
            const index = state.findIndex(
                (item) => item.id === action.payload.id
            );
            state[index] = { ...state[index], ...action.payload };
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload.id);
        }
    }
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove } = actions;

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }));
};

export const changeTitle = (id) => (dispatch, getState) => {
    dispatch(update({ id, title: `New Title for Task${id}` }));
};

export const removeTask = (id) => (dispatch, getState) => {
    dispatch(remove({ id }));
};

export default taskReducer;
