import { createSlice } from "@reduxjs/toolkit";

import authService from "../services/auth.service";
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken
} from "../services/localStorage.service";

const initialState = { currentUser: null, error: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resived(state, action) {
            state.currentUser = action.payload;
        },
        update(state, action) {
            state.currentUser = action.payload;
        },
        requested(state) {
            state.error = null;
            state.currentUser = null;
        },
        requestFailed(state, action) {
            state.error = action.payload;
        }
    }
});

const { actions, reducer: authReducer } = authSlice;
const { update, resived, requested, requestFailed } = actions;

export const loadAuthUser = () => async (dispatch) => {
    const onBoard = getAccessToken();
    if (onBoard) {
        dispatch(requested());
        try {
            const { content } = await authService.getAuthUser(onBoard);
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    }
};

export const signIn =
    ({ email, password }) =>
    async (dispatch, getState) => {
        dispatch(requested());
        try {
            const data = await authService.signIn({
                email,
                password
            });
            setAccessToken(data);
            dispatch(resived(data.content));
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                    case "INVALID_PASSWORD":
                        dispatch(
                            requestFailed(
                                "Email или пароль введены некорректно"
                            )
                        );
                        break;
                    default:
                        dispatch(
                            requestFailed(
                                "Слишком много попыток входа. Попробуйте позже"
                            )
                        );
                        break;
                }
            } else dispatch(requestFailed(message));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch, getState) => {
        dispatch(requested());
        try {
            const data = await authService.signUp({
                email,
                password,
                ...rest
            });
            setAccessToken(data);
            dispatch(resived(data.content));
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    dispatch(
                        requestFailed(
                            "Пользователь с таким Email уже существует"
                        )
                    );
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            } else dispatch(requestFailed(message));
        }
    };

export const signOut = () => (dispatch, getState) => {
    removeAccessToken();
    dispatch(update(null));
};

export const getAuth = () => (state) => state.auth.currentUser;
export const getAuthLoading = () => (state) => state.auth.isLoading;
export const getAdmin = () => (state) =>
    state.auth.currentUser && state.auth.currentUser.role === "admin";
export const getAuthError = () => (state) => state.auth.error;

export default authReducer;
