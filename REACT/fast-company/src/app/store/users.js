import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
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
        }
    }
});

const { reducer: usersReucer, actions } = usersSlice;
const { requested, resived, requestFailed } = actions;

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
