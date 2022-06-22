import { createSlice } from "@reduxjs/toolkit";

import authService from "../services/auth.service";
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken
} from "../services/localStorage.service";
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
const { update, resived, requested, requestFailed } = actions;

export const loadAuthUser = () => async (dispatch) => {
    const onBoard = getAccessToken();
    if (onBoard) {
        dispatch(requested());
        try {
            const { content } = await authService.getAuthUser(onBoard);
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
            dispatch(requestFailed());
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                    case "INVALID_PASSWORD":
                        dispatch(
                            setError("Email или пароль введены некорректно")
                        );
                        break;
                    default:
                        dispatch(
                            setError(
                                "Слишком много попыток входа. Попробуйте позже"
                            )
                        );
                        break;
                }
            }
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
            dispatch(requestFailed());
            const { code, message } = error.response.data.error;
            dispatch(setError(message));
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
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

export default authReducer;
