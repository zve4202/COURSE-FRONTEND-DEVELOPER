import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { getUserId, setTokens } from "../services/localStorage.service";
import userService from "../services/user.service";
import history from "../utils/hidtory";
import { isOutdated } from "../utils/isOutdated";
import randomInt from "../utils/randomInt";

const userId = getUserId();
const initialState = userId
    ? {
          auth: { userId },
          isLoggedIn: true,
          entities: null,
          isLoading: true,
          error: null,
          lastFetch: null,
          dataLoaded: false
      }
    : {
          auth: null,
          isLoggedIn: false,
          entities: null,
          isLoading: false,
          error: null,
          lastFetch: null,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.dataLoaded = false;
            state.error = null;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        requestFailed(state, action) {
            state.error = action.payload;
        },
        requestedAuth(state) {
            state.error = null;
        },
        resivedAuth(state, action) {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        requestAuthFailed(state, action) {
            state.error = action.payload;
        },
        userCreated(state, action) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        }
    }
});

const { reducer: usersReucer, actions } = usersSlice;
const {
    resivedAuth,
    requestAuthFailed,
    requested,
    resived,
    requestFailed,
    userCreated
} = actions;

const requestedAuth = createAction("users/requestedAuth");
const requestedUserCreate = createAction("users/requestedUserCreate");
const userCreatFailed = createAction("users/userCreatFailed");

function createUser(data) {
    return async function (dispatch) {
        dispatch(requestedUserCreate());
        try {
            const { content } = await userService.create(data);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(userCreatFailed(error.message));
        }
    };
}
export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch, getState) => {
        dispatch(requestedAuth());
        try {
            const data = await authService.register({ email, password });
            setTokens(data);
            dispatch(resivedAuth({ userId: data.localId }));

            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            requestAuthFailed(error.message);
        }
    };

export const logIn =
    ({ email, password, redirect }) =>
    async (dispatch, getState) => {
        dispatch(requestedAuth());
        try {
            const data = await authService.login({ email, password });
            setTokens(data);
            dispatch(resivedAuth({ userId: data.localId }));
            history.push(redirect);
        } catch (error) {
            requestAuthFailed(error.message);
        }
    };

export const loadUsersList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().users;
    if (isOutdated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await userService.get();
            dispatch(resived(content));
        } catch (error) {
            requestFailed(error.message);
        }
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUser = (id) => (state) => {
    if (Array.isArray(state.users.entities)) {
        for (const item of state.users.entities) {
            if (item._id === id) {
                return item;
            }
        }
    }
    return null;
};

export const getUsersLoading = () => (state) => state.users.isLoading;
export const getLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataLoaded = () => (state) => state.users.dataLoaded;

export const getCurrentUserId = () => (state) => state.users.auth.userId;

export default usersReucer;
