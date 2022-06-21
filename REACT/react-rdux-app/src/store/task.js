import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
// import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        set(state, action) {
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
const { update, remove, set } = actions;

export const getTasks = () => async (dispatch) => {
    try {
        const data = await todosService.fetch();
        dispatch(set(data));
    } catch (error) {}
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
