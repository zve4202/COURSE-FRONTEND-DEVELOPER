import { createSlice } from "@reduxjs/toolkit";

import basketService from "../services/basket.service";
import { getValue, setValue } from "../services/localStorage.service";

const BASKET_KEY = "basket-id";
// docs = ["1","2" ...]
const initialState = {
    basket: {
        userId: null,
        docs: [],
        totalQty: 0,
        totalPrice: 0
    },
    isLoading: true,
    error: null
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.error = null;
        },
        resived(state, action) {
            state.basket = action.payload;
            state.isLoading = false;
        },
        apdate(state, action) {
            const { docs } = state.basket;
            const index = docs.findIndex((doc) => doc.id === action.payload.id);
            if (index < 0) {
                docs.push(action.payload);
            } else {
                docs[index] = action.payload;
            }
            const totals = { totalQty: 0, totalPrice: 0 };
            docs.forEach((item) => {
                const { qty, price } = item;
                totals.totalQty += qty;
                totals.totalPrice += qty * price;
            });
            state.basket = { ...state.basket, docs, ...totals };
        },
        remove(state, action) {
            const { docs } = state.basket;
            const newdocs = docs.filter((item) => item.id !== action.payload);
            const totals = { totalQty: 0, totalPrice: 0 };
            newdocs.forEach((item) => {
                const { qty, price } = item;
                totals.totalQty += qty;
                totals.totalPrice += qty * price;
            });
            state.basket = { ...state.basket, docs: newdocs, ...totals };
        },
        clear(state, action) {
            const docs = [];
            const totals = { totalQty: 0, totalPrice: 0 };
            state.basket = { ...state.basket, docs, ...totals };
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { apdate, remove, clear, resived, requested, requestFailed } =
    basketSlice.actions;

export const loadBasket = () => async (dispatch) => {
    dispatch(requested());
    try {
        const basketId = getValue(BASKET_KEY);
        if (basketId) {
            const { content } = await basketService.get(basketId);
            dispatch(resived(content));
        } else {
            const { content } = await basketService.create({
                ...initialState.basket
            });
            setValue(BASKET_KEY, content._id);
            dispatch(resived(content));
        }
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const loadBasketEx = () => async (dispatch) => {
    dispatch(requested());
    try {
        const basketId = getValue(BASKET_KEY);
        if (basketId) {
            const { content } = await basketService.getEx(basketId);
            dispatch(resived(content));
        } else {
            const { content } = await basketService.create({
                ...initialState.basket
            });
            setValue(BASKET_KEY, content._id);
            content.products = [];
            dispatch(resived(content));
        }
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const addBasket = (payload) => async (dispatch, getState) => {
    try {
        dispatch(apdate(payload));
        const { basket } = getState().basket;
        dispatch(requested());
        const { content } = await basketService.update(basket._id, basket);
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const basketUpdateBasket = (payload) => async (dispatch, getState) => {
    try {
        dispatch(apdate(payload));
        const { basket } = getState().basket;
        await basketService.update(basket._id, basket);
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const removeBasket = (id) => async (dispatch, getState) => {
    try {
        dispatch(remove(id));
        const { basket } = getState().basket;
        dispatch(requested());
        const { content } = await basketService.update(basket._id, basket);
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const basketRemoveBasket = (id) => async (dispatch, getState) => {
    try {
        dispatch(remove(id));
        const { basket } = getState().basket;
        await basketService.update(basket._id, basket);
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const clearBasket = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        dispatch(clear());
        const { basket } = getState().basket;
        dispatch(requested());
        const { content } = await basketService.update(basket._id, basket);
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getBasket = () => (state) => state.basket.basket;
export const getBasketCountById = (id) => (state) => {
    const { basket } = state.basket;
    const doc = basket.docs.find((item) => item.id === id);
    if (!doc) return null;

    return doc.qty;
};

export const getBasketLoading = () => (state) => state.basket.isLoading;
export const getBasketError = () => (state) => state.basket.error;

export default basketSlice;
