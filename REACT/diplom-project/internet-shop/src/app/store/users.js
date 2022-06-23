import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/user.service";

const initialState = { entities: [], isLoading: true, error: null };

const usersSlice = createSlice({
    name: "users",
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
        requested(state) {
            state = initialState;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: usersReducer } = usersSlice;
const { update, resived, requested, requestFailed } = actions;

export const loadUsers = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await userService.fetchAll();
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await userService.update(user.id, user);
        dispatch(update(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUser = (id) => (state) =>
    state.users.entities.find((user) => user._id === id);
export const getUsersLoading = () => (state) => state.users.isLoading;
export const getUsersError = () => (state) => state.users.error;

export default usersReducer;
