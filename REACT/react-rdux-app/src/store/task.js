import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
// import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = { entities: [], isLoading: true, error: null };

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
            state.error = action.payload;
        }
    }
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, resived, taskRequested, taskRequestFailed } = actions;

export const getTasks = () => async (dispatch) => {
    dispatch(taskRequested({ isLoading: true }));
    try {
        const data = await todosService.fetch();
        dispatch(resived(data));
    } catch (error) {
        dispatch(taskRequestFailed(error.message));
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
