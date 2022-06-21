import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
// import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        resived(state, action) {
            return action.payload;
        },
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
const { update, remove, resived } = actions;

const taskRequested = createAction("task/requested");
const taskRequestFailed = createAction("task/requestFailed");

export const getTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(resived(data));
    } catch (error) {
        dispatch(taskRequestFailed(error));
    }
};

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
