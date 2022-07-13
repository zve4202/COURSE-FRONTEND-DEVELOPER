import { createSlice } from "@reduxjs/toolkit";

import { getValue, setValue } from "../services/localStorage.service";

const pagenation = {
    pageSize: 50,
    currentPage: 1
};

const query = {
    search: ""
};

const sort = {
    sort: "name",
    order: 1
};

const settingConfig = {
    product: {
        query: { ...query },
        pagenation: { ...pagenation },
        sort: { ...sort }
    },
    users: {
        query: { ...query },
        pagenation: { ...pagenation },
        sort: { ...sort },
        selectedMenu: "orders"
    },
    orders: {
        query: { ...query },
        pagenation: { ...pagenation },
        sort: { ...sort },
        selectedTab: "current"
    },

    basket: {
        sort: { ...sort }
    }
};
const initialState = {
    config: { ...settingConfig },
    isLoading: true,
    error: null
};

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        requested(state) {
            state = { ...initialState };
        },
        resived(state, action) {
            state.config = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const { name, data } = action.payload;
            const config = { ...state.config[name], ...data };
            console.log("config", config);
            state.config[name] = config;
            const key = String().concat(settingSlice.name, "-", name);

            setValue(key, JSON.stringify(config));
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { resived, requested, update, requestFailed } = settingSlice.actions;

export const loadSetting = () => async (dispatch) => {
    dispatch(requested());
    try {
        const content = {};
        Object.keys(settingConfig).forEach((name) => {
            const key = String().concat(settingSlice.name, "-", name);
            let config = JSON.parse(getValue(key));
            if (!config) {
                config = settingConfig[name];
                setValue(key, JSON.stringify(config));
            }
            content[name] = config;
        });
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const updateSetting = (name, data) => async (dispatch) => {
    console.log("updateSetting", { name, data });
    dispatch(update({ name, data }));
};

export const getConfig = () => (state) => state.setting.config;
export const getConfigByName = (name) => (state) => state.setting.config[name];
export const getRolesLoading = () => (state) => state.setting.isLoading;
export const getRolesError = () => (state) => state.setting.error;

export default settingSlice;
