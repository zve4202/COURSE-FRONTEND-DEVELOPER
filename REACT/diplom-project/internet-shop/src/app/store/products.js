import { createSlice } from "@reduxjs/toolkit";

import productService from "../services/product.service";

const initialSearch = {
    category: null,
    text: ""
};

const initialState = {
    search: { ...initialSearch },
    entities: [],
    filtred: null,
    sortBy: {
        path: "title.artist.name",
        order: "asc"
    },
    isLoading: true,
    error: null
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setSeacher(state, action) {
            if (!action.payload) {
                state.search = { ...initialSearch };
            } else {
                state.search = { ...state.search, ...action.payload };
            }
        },
        beginFilter(state) {
            state.isLoading = true;
        },
        setFiltred(state, action) {
            state.isLoading = false;
            state.filtred = action.payload;
        },
        filterFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: productsReducer } = productsSlice;
const {
    resived,
    requested,
    requestFailed,
    setSeacher
    // beginFilter,
    // setFiltred,
    // filterFailed
} = actions;

export const setSeachParams = (payload) => async (dispatch) => {
    dispatch(setSeacher(payload));
};

export const clearSeachParams = () => async (dispatch) => {
    dispatch(setSeacher(null));
};

export const loadProducts = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        let params = { page: 1, limit: 100 };
        const { products } = getState();
        const { category, text: search } = products.search;
        if (category) params = { ...params, category };
        if (search !== "") params = { ...params, search };

        const { content } = await productService.fetchAllEx(params);
        dispatch(resived(content.docs));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProduct = (id) => (state) =>
    state.products.entities.find((item) => item._id === id);
export const getProductLoading = () => (state) => state.products.isLoading;
export const getProductError = () => (state) => state.products.error;

export default productsReducer;
