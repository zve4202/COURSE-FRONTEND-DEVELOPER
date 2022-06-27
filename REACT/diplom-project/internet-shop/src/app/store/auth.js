import { createSlice } from "@reduxjs/toolkit";

import authService from "../services/auth.service";
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken
} from "../services/localStorage.service";

const initialState = { currentUser: null, isLoading: true, error: null };

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
        requested(state) {
            state = initialState;
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: authReducer } = authSlice;
const { update, resived, requested, requestFailed } = actions;

export const loadAuthUser = () => async (dispatch) => {
    dispatch(requested());
    const token = getAccessToken();
    if (token) {
        try {
            const { content } = await authService.getAuthUser();
            dispatch(resived(content));
        } catch (error) {
            dispatch(requestFailed(error.message));
        }
    } else {
        dispatch(requestFailed("Нет пользователя в системе"));
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
                }
            } else dispatch(requestFailed(message));
        }
    };

export const signOut = () => (dispatch, getState) => {
    removeAccessToken();
    dispatch(update(null));
};

export const getAuth = () => (state) => state.auth.currentUser;
export const getAdmin = () => (state) =>
    state.auth.currentUser && state.auth.currentUser.role === "admin";
export const getAuthLoading = () => (state) => state.auth.isLoading;
export const getAuthError = () => (state) => state.auth.error;

export default authReducer;
