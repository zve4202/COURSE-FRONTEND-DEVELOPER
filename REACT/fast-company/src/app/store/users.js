import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { setTokens } from "../services/localStorage.service";
import userService from "../services/user.service";
import history from "../utils/hidtory";
import randomInt from "../utils/randomInt";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        auth: null,
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
        isLoggedIn: false
    },
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.error = null;
        },

        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        requestedAuth(state) {
            state.error = null;
        },
        resivedAuth(state, action) {
            state.auth = { ...action.payload };
        },
        requestAuthFailed(state, action) {
            state.error = action.payload;
        },
        requestedUserCreate(state) {
            state.error = null;
        },
        userCreated(state, action) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userCreatFailed(state, action) {
            state.error = action.payload;
        }
    }
});

const { reducer: usersReucer, actions } = usersSlice;
const {
    requestedAuth,
    resivedAuth,
    requestAuthFailed,
    requested,
    resived,
    requestFailed,
    requestedUserCreate,
    userCreated,
    userCreatFailed
} = actions;

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

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

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
    for (const item of state.users.entities) {
        if (item._id === id) {
            return item;
        }
    }
    return null;
};

export const getUsersLoading = () => (state) => state.users.isLoading;

export default usersReucer;
