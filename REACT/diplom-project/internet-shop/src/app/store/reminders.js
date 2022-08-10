import { createSlice } from "@reduxjs/toolkit";

import Service from "../services/reminder.service";
import { getAuth } from "./auth";

// docs = ["1","2" ...]
const initialState = {
    docs: [],
    isLoading: true,
    error: null
};

const basketSlice = createSlice({
    name: "reminder",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.error = null;
        },
        resived(state, action) {
            const { docs } = action.payload;
            state = { ...state, docs };
            state.isLoading = false;
        },
        update(state, action) {
            const { titleId } = action.payload;
            const { docs } = state;
            const index = docs.findIndex((doc) => doc.titleId === titleId);
            if (index < 0) {
                docs.push(action.payload);
            } else {
                docs[index] = action.payload;
            }
            state = { ...state, docs, isLoading: false };
        },
        remove(state, action) {
            console.log("remove action.payload ", action.payload);
            const docs = state.docs.filter(
                (item) => item.titleId !== action.payload
            );
            console.log("remove docs ", docs);
            state = { ...state, docs };
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: remindersReducer } = basketSlice;
const { update, remove, resived, requested, requestFailed } = actions;

export const loadReminders = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { currentUser } = getAuth();
        if (currentUser) {
            const { content } = await Service.fetchAll();
            dispatch(resived(content));
        } else {
            dispatch(resived({ docs: [] }));
        }
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const updateReminder = (payload) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await Service.update(payload.titleId, payload);
        dispatch(update(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const addReminder = (payload) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await Service.create(payload);
        dispatch(update(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const removeReminder = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        await Service.delete(id);
        dispatch(remove(id));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const clearReminders = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        await Service.deleteAll();
        dispatch(resived({ docs: [] }));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getReminders = () => (state) => state.reminder.docs;
export const getReminder = (id) => (state) => {
    const doc = state.reminder.docs.find((item) => item.titleId === id);
    if (doc) {
        return doc.reminder;
    }
    return null;
};

export const getReminderLoading = () => (state) => state.reminder.isLoading;
export const getReminderError = () => (state) => state.reminder.error;

export default remindersReducer;
