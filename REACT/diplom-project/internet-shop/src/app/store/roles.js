import { createSlice } from "@reduxjs/toolkit";

import roleService from "../services/role.service";

const initialState = { entities: [], isLoading: true, error: null };

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
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

const { actions, reducer: rolesReducer } = rolesSlice;
const { resived, requested, requestFailed } = actions;

export const loadRoles = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await roleService.fetchAll();
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getRoles = () => (state) => state.roles.entities;
export const getRole = (id) => (state) =>
    state.roles.entities.find((role) => role._id === id);
export const getRolesLoading = () => (state) => state.roles.isLoading;
export const getRolesError = () => (state) => state.roles.error;

export default rolesReducer;
