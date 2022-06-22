import { createSlice } from "@reduxjs/toolkit";

import authService from "../services/auth.service";
import { getAccessToken } from "../services/localStorage.service";
import { setError } from "./errors";

const initialState = { currentUser: null, isLoading: true };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resived(state, action) {
            state.currentUser = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            state.currentUser = action.payload;
        },
        remove(state) {
            state.currentUser = null;
        },
        requested(state) {
            state.isLoading = true;
            state.currentUser = null;
        },
        requestFailed(state, action) {
            state.isLoading = false;
        }
    }
});

const { actions, reducer: authReducer } = authSlice;
const { update, remove, resived, requested, requestFailed } = actions;

export const loadAuthUser = () => async (dispatch) => {
    const onBoard = getAccessToken();
    if (onBoard) {
        dispatch(requested());
        try {
            const { content } = await authService.getUser(onBoard);
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed());
            dispatch(setError(error.message));
        }
    } else {
        dispatch(
            setError(
                "Нет зарегистрированного пользовательзователя в системе!!!"
            )
        );
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

export const getAuthUser = () => (state) => state.auth.currentUser;
export const getAuthLoading = () => (state) => state.auth.isLoading;
export const getAuthIsAdmin = () => (state) => {
    const currentUser = state.auth.currentUser;
    return currentUser && currentUser.role === "admin";
};

export default authReducer;
