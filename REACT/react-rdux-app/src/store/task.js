import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const index = state.entities.findIndex(
                (item) => item.id === action.payload.id
            );
            state.entities[index] = {
                ...state.entities[index],
                ...action.payload
            };
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (item) => item.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = true;
        },
        taskRequestFailed(state, action) {
            state.isLoading = false;
        }
    }
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, resived, taskRequested, taskRequestFailed } = actions;

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested({ isLoading: true }));
    try {
        const data = await todosService.fetch();
        dispatch(resived(data));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
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

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
