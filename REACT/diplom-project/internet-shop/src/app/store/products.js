import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import productService from "../services/product.service";
import { slugify } from "../utils";

const initialSearch = {
    category: null,
    text: "",
    timer: null
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
            state.search = { ...state.search, ...action.payload };
            const { category, text } = state.search;
            if (!category && text === "") {
                state.filtred = null;
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
    setSeacher,
    beginFilter,
    setFiltred,
    filterFailed
} = actions;

function matched(text, arr) {
    if (!text) return true;

    const alias = slugify(text);
    return arr.some((item) => item.indexOf(alias) !== -1);
}

async function orderBy(entities, sortBy) {
    return await _.orderBy(entities, [sortBy.path], [sortBy.order]);
}

async function getFiltered({ search, entities, sortBy }) {
    const { category, text } = search;
    const filtred = await entities.filter(
        (item) =>
            (category ? item.title.format.category === category : true) &&
            matched(text, [item.title.artist.alias, item.title.alias])
    );
    return await orderBy(filtred, sortBy);
}

export const filterProducts = () => async (dispatch, getState) => {
    dispatch(beginFilter());
    try {
        const { products } = getState();
        const filtred = await getFiltered(products);
        dispatch(setFiltred(filtred));
    } catch (error) {
        dispatch(filterFailed(error.message));
    }
};

export const setSeachParams = (payload) => async (dispatch) => {
    dispatch(setSeacher(payload));
};

export const loadProducts = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        const { content } = await productService.fetchAllEx();
        const sortBy = getState().products.sortBy;
        const entities = await orderBy(content, sortBy);
        dispatch(resived(entities));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getProducts = () => (state) =>
    state.products.filtred || state.products.entities;
export const getProduct = (id) => (state) =>
    state.products.entities.find((item) => item._id === id);
export const getProductLoading = () => (state) => state.products.isLoading;
export const getProductError = () => (state) => state.products.error;

export default productsReducer;
