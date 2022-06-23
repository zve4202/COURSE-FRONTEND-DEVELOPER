import { createSlice } from "@reduxjs/toolkit";

import productService from "../services/product.service";

const initialState = { entities: [], isLoading: true, error: null };

const categorySlice = createSlice({
    name: "products",
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

const { actions, reducer: productsReducer } = categorySlice;
const { resived, requested, requestFailed } = actions;

export const loadProducts = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await productService.fetchAllEx();
        dispatch(resived(content));
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
